// PLAN 19 — de Worker dicht: de pagina's sturen geen systeemprompt meer (fase 2), de uitleg van de
// Brief Begrijper wordt gefilterd (fase 3), lettertypen en scripts staan op eigen plek (fase 4).
// De Worker zelf wordt getest in tools/modellen/worker-stubtest.mjs.
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');

const WORKER = /^https:\/\/solidari-digi-hulp-worker\.jaspermarsman\.workers\.dev\//;

// Vangt elk verzoek naar de Worker op en geeft een vast antwoord. Geeft de lijst met verzoeken terug.
async function vangWorker(page, antwoord = { tekst: 'Testantwoord.', bronnen: [] }) {
  const verzoeken = [];
  await page.route(WORKER, (r) => {
    verzoeken.push({ pad: new URL(r.request().url()).pathname, body: r.request().postDataJSON() });
    r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(antwoord) });
  });
  return verzoeken;
}

// ── Fase 2: het nieuwe contract (B-1) ────────────────────────────────────────────────────────
test.describe('fase 2: de pagina stuurt tool en taal, geen systeemprompt', () => {
  test('rechten: /api/ai met tool, taal en het gesprek', async ({ page }) => {
    await metTaal(page, 'PL');
    const verzoeken = await vangWorker(page);
    await page.goto('rechten.html');
    await page.fill('#invoer', 'Czy mogę pracować?');
    await page.click('#stuur-btn');
    await expect.poll(() => verzoeken.length).toBe(1);
    expect(verzoeken[0].pad).toBe('/api/ai');
    expect(verzoeken[0].body).toEqual({ tool: 'rechten', taal: 'PL', berichten: [{ role: 'user', content: 'Czy mogę pracować?' }] });
    // De taalregel plakt de Worker erachter; de pagina toont en bewaart de vraag zoals hij getypt is.
    await expect(page.locator('.bel-sol').filter({ hasText: 'Testantwoord.' })).toBeVisible();
    await page.fill('#invoer', 'A potem?');
    await page.click('#stuur-btn');
    await expect.poll(() => verzoeken.length).toBe(2);
    expect(verzoeken[1].body.berichten).toEqual([
      { role: 'user', content: 'Czy mogę pracować?' },
      { role: 'assistant', content: 'Testantwoord.' },
      { role: 'user', content: 'A potem?' },
    ]);
  });

  test('goedvoorbereid: /api/ai met tool, taal, categorie, situatie en het gesprek', async ({ page }) => {
    await metTaal(page, 'EN');
    const verzoeken = await vangWorker(page);
    await page.goto('goedvoorbereid.html');
    await page.waitForFunction(() => window.Solidari && window.Solidari.i18n && typeof kiesCategorie === 'function');
    const namen = await page.evaluate(() => {
      kiesCategorie('dokter'); kiesSituatie('dokter-klacht'); toonAIInvoer();
      return { categorie: huidigeCategorie.naam, situatie: huidigeSituatie.titel };
    });
    expect(namen.categorie.length).toBeGreaterThan(2);
    await page.fill('#ai-invoer', 'What do I say to the doctor?');
    await page.click('#ai-stuur');
    await expect.poll(() => verzoeken.length).toBe(1);
    expect(verzoeken[0].pad).toBe('/api/ai');
    expect(verzoeken[0].body).toEqual({
      tool: 'gv', taal: 'EN', categorie: namen.categorie, situatie: namen.situatie,
      berichten: [{ role: 'user', content: 'What do I say to the doctor?' }],
    });
    await expect(page.locator('.bel-sol').filter({ hasText: 'Testantwoord.' })).toBeVisible();
  });

  test('budgethulp: /api/ai met tool, taal, gemeente en het budgetoverzicht', async ({ page }) => {
    await metTaal(page, 'TR');
    const verzoeken = await vangWorker(page, { tekst: 'Testantwoord.' });
    await page.goto('budgethulp.html');
    await page.waitForFunction(() => window.Solidari && typeof window.Solidari.opmaak === 'function' && typeof roepAiAan === 'function');
    // Een klein verzonnen budget: zonder window._pdf is het overzicht leeg (de AI-stap komt in
    // het echt altijd na het overzicht).
    await page.evaluate(() => {
      window._pdf = { saldo: -95, ink: 1380, totUit: 1475, huurB: 780, nettoW: 780, energie: 190, tel: 35, zorgv: 150,
                      verv: 40, bood: 280, schuld: 0, sit: 'eenouder', huurtoesl: 0, zorgtoesl: 123 };
      return roepAiAan('Utrecht');
    });
    await expect.poll(() => verzoeken.length).toBe(1);
    expect(verzoeken[0].pad).toBe('/api/ai');
    const b = verzoeken[0].body;
    expect(Object.keys(b).sort()).toEqual(['bericht', 'gemeente', 'taal', 'tool']);
    expect(b.tool).toBe('budget');
    expect(b.taal.toUpperCase()).toBe('TR');
    expect(b.gemeente).toBe('Utrecht');
    expect(b.bericht).toContain('BUDGETOVERZICHT VOOR AI-ANALYSE');
    expect(b.bericht).not.toContain('Türkçe cevap ver.');   // de taalregel plakt de Worker erachter
    await expect(page.locator('.bel-sol.ai-analyse').filter({ hasText: 'Testantwoord.' })).toBeVisible();
  });

  for (const pagina of ['rechten.html', 'goedvoorbereid.html', 'budgethulp.html']) {
    test(`${pagina}: geen prompt en geen oude route meer in de bron`, async ({ page }) => {
      const bron = await (await page.request.get(pagina)).text();
      for (const weg of ['SYSTEM_PROMPT', 'bouwAiVerzoek', 'bouwAiPrompt', 'bouwSystemPrompt', 'bouwAiBerichten', 'AI_TAAL',
                         '/api/digi', '/api/analyse\'', 'UITSLUITEND', 'HARDE GRENZEN', 'systeem:']) {
        expect(bron.includes(weg), `"${weg}" staat nog in ${pagina}`).toBe(false);
      }
      expect(bron).toContain('/api/ai');
    });
  }
});

// ── Fase 3: de uitleg van de Brief Begrijper wordt gefilterd (B-7) ───────────────────────────
// Een nagebootst antwoord van de backend met HTML die er niet hoort. window.__xss mag nooit gezet worden.
const AANVAL = '<img src=x onerror="window.__xss=1"><script>window.__xss=1</script>';
const KWAAD = {
  urgentie: { niveau: 'hoog" onmouseover="window.__xss=1', titel: `Reageer snel ${AANVAL}<b>vet</b>`, tekst: `Binnen 6 weken ${AANVAL}` },
  secties: [
    {
      icoon: `📋${AANVAL}`, titel: `Wat is dit? ${AANVAL}`, achtergrond: 'red;background:url(https://evil.example/x.png)',
      inhoud: `<p onclick="window.__xss=1">Een brief van de <strong style="color:red">gemeente</strong> en <em>meer</em>.</p>
               ${AANVAL}
               <ul><li>eerst <strong>bellen</strong></li><li>dan mailen</li></ul>
               <ol><li>stap één</li></ol>
               <div class="tip">💡 Een tip<br>op twee regels</div>
               <div class="deadline" id="x" style="position:fixed">Een vak zonder tip</div>
               <p>Hulp bij <a href="https://evil.example/phish" target="_blank">het Juridisch Loket</a>.</p>
               <iframe src="https://evil.example"></iframe><svg onload="window.__xss=1"><circle r="1"/></svg>
               <style>body{display:none}</style><h3>Een kop</h3><span class="tip">geen div</span>`,
    },
    { icoon: '❓', titel: 'Gewone kaart', achtergrond: '#FDF3E0', inhoud: '<p>Gewone <strong>uitleg</strong>.</p>' },
  ],
  actiepunten: [`Bel de gemeente ${AANVAL}`, 'Stuur een <a href="https://evil.example">kopie</a> op'],
};
// Een geldig PNG'tje van 1×1 als "brief".
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

async function toonAntwoord(page, antwoord) {
  await metTaal(page, 'NL');
  await page.route('**/api/analyseer', (r) => r.fulfill({
    status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(antwoord),
  }));
  await page.goto('brief.html');
  await page.setInputFiles('#bestand-input', { name: 'brief.png', mimeType: 'image/png', buffer: PNG });
  await page.check('#privacy-checkbox');
  await page.click('#analyseer-knop');
  await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
  await page.waitForTimeout(500);
}

test.describe('fase 3: de uitleg van de Brief Begrijper wordt gefilterd', () => {
  test('geen img, script, iframe, svg, style, link of on…-attribuut in het resultaat', async ({ page }) => {
    const buiten = [];
    page.on('request', (r) => { if (/evil\.example/.test(r.url())) buiten.push(r.url()); });
    await toonAntwoord(page, KWAAD);
    const r = await page.evaluate(() => {
      const vak = document.getElementById('stap-resultaat');
      const delen = ['#urgentie-banner', '#resultaat-kaarten', '#actiepunten-lijst'].map((s) => document.querySelector(s));
      const alle = delen.flatMap((d) => [...d.querySelectorAll('*')]);
      return {
        xss: window.__xss,
        verboden: alle.filter((el) => ['IMG', 'SCRIPT', 'IFRAME', 'SVG', 'STYLE', 'A', 'B', 'H3'].includes(el.tagName.toUpperCase())).map((el) => el.tagName),
        // De eigen klikhandlers van de pagina (kaart open/dicht, afvinken) mogen blijven; verder geen on…-attribuut.
        handlers: alle.flatMap((el) => [...el.attributes].filter((a) => /^on/i.test(a.name)).map((a) => a.value))
          .filter((v) => !/^(toggleKaart\(this\)|vinkAf\(\d+\))$/.test(v)),
        stijl: [...document.querySelectorAll('.rk-body *')].filter((el) => el.hasAttribute('style') || el.hasAttribute('id')).length,
        zichtbaar: getComputedStyle(document.body).display !== 'none' && vak.offsetHeight > 0,
      };
    });
    expect(r.xss).toBeUndefined();
    expect(r.verboden).toEqual([]);
    expect(r.handlers).toEqual([]);
    expect(r.stijl).toBe(0);
    expect(r.zichtbaar).toBe(true);
    expect(buiten).toEqual([]);
  });

  test('titel, urgentie, pictogram en actiepunten zijn platte tekst', async ({ page }) => {
    await toonAntwoord(page, KWAAD);
    // De HTML staat er letterlijk als tekst; er is niets van uitgevoerd.
    await expect(page.locator('.urgentie-tekst strong')).toHaveText(`Reageer snel ${AANVAL}<b>vet</b>`);
    await expect(page.locator('.urgentie-tekst')).toContainText(`Binnen 6 weken ${AANVAL}`);
    await expect(page.locator('.rk-naam').first()).toHaveText(`Wat is dit? ${AANVAL}`);
    await expect(page.locator('.rk-icoon').first()).toHaveText(`📋${AANVAL}`);
    await expect(page.locator('.ap-tekst').nth(0)).toHaveText(`Bel de gemeente ${AANVAL}`);
    await expect(page.locator('.ap-tekst').nth(1)).toHaveText('Stuur een <a href="https://evil.example">kopie</a> op');
    // Een onbekend urgentieniveau wordt 'laag'; er komt geen attribuut bij.
    await expect(page.locator('#urgentie-banner > div')).toHaveAttribute('class', 'urgentie-banner laag');
    expect(await page.locator('#urgentie-banner > div').evaluate((el) => el.getAttributeNames())).toEqual(['class']);
  });

  test('een link wordt platte tekst; p, strong, em, ul, ol, li, br en div.tip blijven', async ({ page }) => {
    await toonAntwoord(page, KWAAD);
    const body = page.locator('.rk-body').first();
    await expect(body.locator('a')).toHaveCount(0);
    await expect(body).toContainText('Hulp bij het Juridisch Loket.');
    await expect(body.locator('p').first()).toHaveText('Een brief van de gemeente en meer.');
    await expect(body.locator('p strong')).toHaveText('gemeente');
    await expect(body.locator('p em')).toHaveText('meer');
    await expect(body.locator('ul li')).toHaveCount(2);
    await expect(body.locator('ul li strong')).toHaveText('bellen');
    await expect(body.locator('ol li')).toHaveText('stap één');
    await expect(body.locator('div.tip')).toHaveCount(1);
    await expect(body.locator('div.tip br')).toHaveCount(1);
    await expect(body.locator('div.tip')).toContainText('Een tip');
    // Een div met een andere class blijft een kale div; een span.tip wordt tekst.
    await expect(body.locator('.deadline')).toHaveCount(0);
    await expect(body.locator('div:not(.tip)')).toHaveText('Een vak zonder tip');
    await expect(body.locator('span')).toHaveCount(0);
    await expect(body).toContainText('Een kop');
    await expect(body).toContainText('geen div');
    // Van script en style blijft ook geen tekst over.
    await expect(body).not.toContainText('__xss');
    await expect(body).not.toContainText('display:none');
    // Alleen de toegestane elementen, en alleen class="tip" als attribuut.
    const over = await body.evaluate((el) => ({
      tags: [...new Set([...el.querySelectorAll('*')].map((x) => x.tagName))].sort(),
      attributen: [...el.querySelectorAll('*')].flatMap((x) => x.getAttributeNames().map((a) => `${a}=${x.getAttribute(a)}`)),
    }));
    expect(over.tags).toEqual(['BR', 'DIV', 'EM', 'LI', 'OL', 'P', 'STRONG', 'UL']);
    expect(over.attributen).toEqual(['class=tip']);
  });

  test('achtergrond: alleen een kleur als #rrggbb, anders de standaardkleur', async ({ page }) => {
    await toonAntwoord(page, KWAAD);
    const stijl = (n) => page.locator('.rk-icoon').nth(n).evaluate((el) => ({ attr: el.getAttribute('style'), kleur: getComputedStyle(el).backgroundColor, beeld: getComputedStyle(el).backgroundImage }));
    expect(await stijl(0)).toEqual({ attr: 'background: rgb(245, 242, 236);', kleur: 'rgb(245, 242, 236)', beeld: 'none' });   // #F5F2EC
    expect((await stijl(1)).kleur).toBe('rgb(253, 243, 224)');   // #FDF3E0 uit het antwoord
  });

  test('een antwoord met ontbrekende velden geeft geen "undefined" en geen fout', async ({ page }) => {
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await toonAntwoord(page, { urgentie: { niveau: 'midden' }, secties: [{ inhoud: null }, { titel: 'Alleen een titel' }], actiepunten: [null, 42] });
    await expect(page.locator('#urgentie-banner .urgentie-banner.midden')).toBeVisible();
    await expect(page.locator('#stap-resultaat')).not.toContainText('undefined');
    await expect(page.locator('#stap-resultaat')).not.toContainText('null');
    await expect(page.locator('.ap-tekst').nth(1)).toHaveText('42');
    expect(fouten).toEqual([]);
  });

  test('het voorbeeld op de pagina houdt zijn opmaak: deadline-regel, tip en link', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.goto('brief.html');
    await page.evaluate(() => toonResultaat(DEMO_RESULTAAT));
    await expect(page.locator('.rk-body .deadline')).toHaveText('⏰ Deadline bezwaar: uiterlijk 14 april 2026');
    await expect(page.locator('.rk-body .tip').first()).toContainText('Dit is normaal');
    await expect(page.locator('.rk-body a[href="https://www.juridischloket.nl"]')).toHaveText('Juridisch Loket');
    await expect(page.locator('.urgentie-tekst strong')).toHaveText('📅 Reageer vóór 28 maart 2026');
    await expect(page.locator('.rk-naam')).toHaveCount(4);
    await expect(page.locator('.rk-icoon').first()).toHaveAttribute('style', 'background: rgb(235, 243, 238);');   // #EBF3EE
    // Dezelfde tekst via het antwoord van de backend wordt wél gefilterd.
    const kopie = await page.evaluate(() => { toonResultaat(JSON.parse(JSON.stringify(DEMO_RESULTAAT))); return document.querySelectorAll('.rk-body a, .rk-body .deadline').length; });
    expect(kopie).toBe(0);
  });
});
