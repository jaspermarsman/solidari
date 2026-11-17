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
// Sinds PLAN 20 is het antwoord platte tekst in vaste velden (v=2); de pagina zet elk veld via
// Solidari.opmaak of textContent. Het filter veiligeHtml() en de secties bestaan niet meer.
const AANVAL = '<img src=x onerror="window.__xss=1"><script>window.__xss=1</script>';
const KWAAD = {
  urgentie: { niveau: 'hoog" onmouseover="window.__xss=1', titel: `Reageer snel ${AANVAL}<b>vet</b>`, tekst: `Binnen 6 weken ${AANVAL}` },
  wat_staat_er: `Een brief van de gemeente ${AANVAL} <a href="https://evil.example/phish" target="_blank">het Juridisch Loket</a>
    <iframe src="https://evil.example"></iframe><svg onload="window.__xss=1"><circle r="1"/></svg><style>body{display:none}</style><h3>Een kop</h3>`,
  wat_doen: [`Bel de gemeente ${AANVAL}`, 'Stuur een <a href="https://evil.example">kopie</a> op'],
  deadline: { datum: `1 mei 2027 ${AANVAL}`, citaat: `Reageer vóór 1 mei 2027. ${AANVAL}` },
  als_je_niets_doet: `Dan stopt het ${AANVAL}`,
  bezwaar: `Binnen zes weken ${AANVAL}`,
  contact: `Bel 14 0570 ${AANVAL}`,
  twijfel: `Onleesbaar ${AANVAL}`,
  twijfel_code: null,
  afgekapt: false,
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

// PLAN 20 (17-11-2026, akkoord Jasper): deze tests zijn omgezet naar het nieuwe antwoord. Vervallen zijn de
// tests over het filter zelf (welke elementen veiligeHtml doorliet, de achtergrondkleur van een sectie, de
// opmaak van het voorbeeld): dat filter en die secties bestaan niet meer. De blokken, het citaat en de
// foutcodes staan in brief2.spec.js.
test.describe('fase 3: de uitleg van de Brief Begrijper komt als tekst op de pagina', () => {
  test('geen img, script, iframe, svg, style, link of on…-attribuut in het resultaat', async ({ page }) => {
    const buiten = [];
    page.on('request', (r) => { if (/evil\.example/.test(r.url())) buiten.push(r.url()); });
    await toonAntwoord(page, KWAAD);
    const r = await page.evaluate(() => {
      const vak = document.getElementById('stap-resultaat');
      const delen = ['#urgentie-banner', '#resultaat-kaarten'].map((s) => document.querySelector(s));
      const alle = delen.flatMap((d) => [...d.querySelectorAll('*')]);
      return {
        xss: window.__xss,
        verboden: alle.filter((el) => ['IMG', 'SCRIPT', 'IFRAME', 'SVG', 'STYLE', 'A', 'B', 'H3'].includes(el.tagName.toUpperCase())).map((el) => el.tagName),
        handlers: alle.flatMap((el) => [...el.attributes].filter((a) => /^on/i.test(a.name)).map((a) => a.value)),
        zichtbaar: getComputedStyle(document.body).display !== 'none' && vak.offsetHeight > 0,
      };
    });
    expect(r.xss).toBeUndefined();
    expect(r.verboden).toEqual([]);
    expect(r.handlers).toEqual([]);
    expect(r.zichtbaar).toBe(true);
    expect(buiten).toEqual([]);
  });

  test('titel, urgentie, uitleg en actiepunten zijn platte tekst', async ({ page }) => {
    await toonAntwoord(page, KWAAD);
    // De HTML staat er letterlijk als tekst; er is niets van uitgevoerd.
    await expect(page.locator('.urgentie-tekst strong')).toHaveText(`Reageer snel ${AANVAL}<b>vet</b>`);
    await expect(page.locator('.urgentie-tekst')).toContainText(`Binnen 6 weken ${AANVAL}`);
    await expect(page.locator('[data-blok="wat"] .rb-body')).toContainText('<a href="https://evil.example/phish" target="_blank">het Juridisch Loket</a>');
    await expect(page.locator('.ap-tekst').nth(0)).toHaveText(`Bel de gemeente ${AANVAL}`);
    await expect(page.locator('.ap-tekst').nth(1)).toHaveText('Stuur een <a href="https://evil.example">kopie</a> op');
    await expect(page.locator('.rb-citaat bdi')).toContainText(`Reageer vóór 1 mei 2027. ${AANVAL}`);
    // Een onbekend urgentieniveau wordt 'laag'; er komt geen attribuut bij.
    await expect(page.locator('#urgentie-banner > div')).toHaveAttribute('class', 'urgentie-banner laag');
    expect(await page.locator('#urgentie-banner > div').evaluate((el) => el.getAttributeNames())).toEqual(['class']);
  });

  test('een antwoord met ontbrekende velden geeft geen "undefined" en geen fout', async ({ page }) => {
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await toonAntwoord(page, { urgentie: { niveau: 'midden', titel: 'Alleen een titel' }, wat_staat_er: 'Uitleg.', wat_doen: [null, 42], deadline: { datum: null }, bezwaar: null });
    await expect(page.locator('#urgentie-banner .urgentie-banner.midden')).toBeVisible();
    await expect(page.locator('#stap-resultaat')).not.toContainText('undefined');
    await expect(page.locator('#stap-resultaat')).not.toContainText('null');
    await expect(page.locator('.ap-tekst')).toHaveText(['42']);
    expect(fouten).toEqual([]);
  });
});

// ── Fase 4: lettertypen en scripts op eigen plek (B-8, B-9) ──────────────────────────────────
const ALLE_PAGINAS = [
  'index.html', 'brief.html', 'budgethulp.html', 'loont-werken.html', 'naturalisatie.html', '18jaar.html',
  'rechten.html', 'goedvoorbereid.html', 'over.html', 'feedback.html', 'vertaalhulp.html', 'stemmen.html',
];
const DERDEN = /^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/;

test.describe('fase 4: lettertypen en scripts op eigen plek', () => {
  for (const pagina of ALLE_PAGINAS) {
    test(`${pagina}: geen verzoek naar Google Fonts of cdnjs, lettertypen van de eigen site`, async ({ page }) => {
      const verzoeken = [];
      const antwoorden = new Map();
      page.on('request', (r) => verzoeken.push(r.url()));
      page.on('response', (r) => antwoorden.set(r.url(), r.status()));
      await metTaal(page, 'NL');
      await page.goto(pagina, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const eigen = new URL(page.url()).host;
      const hosts = [...new Set(verzoeken.filter((u) => /^https?:/.test(u)).map((u) => new URL(u).host))];
      expect(hosts.filter((h) => DERDEN.test(h))).toEqual([]);
      // Bij het laden gaat er helemaal niets naar een andere partij.
      expect(hosts.filter((h) => h !== eigen)).toEqual([]);
      // De stylesheet en minstens één lettertypebestand komen van de eigen site en zijn gevonden.
      const css = verzoeken.find((u) => /\/fonts\/fonts\.css$/.test(u));
      expect(css, 'fonts/fonts.css is niet opgevraagd').toBeTruthy();
      expect(antwoorden.get(css)).toBe(200);
      const woff = verzoeken.filter((u) => /\/fonts\/[a-z0-9-]+\.woff2$/.test(u));
      expect(woff.length).toBeGreaterThan(0);
      for (const u of woff) expect(antwoorden.get(u), u).toBe(200);
      // document.fonts.check is ook waar voor een lettertype dat nergens gedefinieerd is; daarom
      // ook: het lettertype is echt geladen.
      const f = await page.evaluate(() => ({
        check: document.fonts.check('1em "Source Sans 3"'),
        geladen: [...document.fonts].filter((x) => x.status === 'loaded').map((x) => x.family.replace(/["']/g, '')),
      }));
      expect(f.check).toBe(true);
      expect(f.geladen).toContain('Source Sans 3');
    });
  }

  test('fonts.css: alle bestanden bestaan, font-display: swap, geen adres van buiten', async ({ page }) => {
    const css = await (await page.request.get('fonts/fonts.css')).text();
    expect(css).not.toMatch(/https?:\/\//);
    const blokken = css.match(/@font-face \{[^}]*\}/g);
    expect(blokken.length).toBe(44);
    for (const b of blokken) expect(b).toContain('font-display: swap');
    const bestanden = [...new Set([...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1]))];
    expect(bestanden.length).toBe(15);
    for (const b of bestanden) {
      const r = await page.request.get('fonts/' + b);
      expect(r.status(), b).toBe(200);
      expect((await r.body()).subarray(0, 4).toString('latin1'), b).toBe('wOF2');
    }
    // De gewichten en de cursieve Playfair uit B-8.
    for (const [fam, stijl, gewicht] of [['Playfair Display', 'normal', 400], ['Playfair Display', 'normal', 600], ['Playfair Display', 'normal', 700],
      ['Playfair Display', 'italic', 400], ['Source Sans 3', 'normal', 300], ['Source Sans 3', 'normal', 400], ['Source Sans 3', 'normal', 500], ['Source Sans 3', 'normal', 600]]) {
      expect(blokken.some((b) => b.includes(`font-family: '${fam}'`) && b.includes(`font-style: ${stijl}`) && b.includes(`font-weight: ${gewicht}`)), `${fam} ${stijl} ${gewicht}`).toBe(true);
    }
  });

  test('over.html: de cursieve Playfair Display is beschikbaar', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.goto('over.html');
    const ok = await page.evaluate(async () => {
      const f = await document.fonts.load('italic 400 1em "Playfair Display"', 'Solidari');
      return f.length > 0 && f.every((x) => x.status === 'loaded' && x.style === 'italic');
    });
    expect(ok).toBe(true);
  });

  test('cyrillisch en uitgebreid latijn komen uit de eigen lettertypen (UK, PL)', async ({ page }) => {
    await metTaal(page, 'UK');
    const woff = [];
    page.on('request', (r) => { if (/\.woff2$/.test(r.url())) woff.push(r.url().split('/').pop()); });
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    expect(woff).toContain('source-sans-3-cyrillic.woff2');
    const ok = await page.evaluate(async () => (await document.fonts.load('1em "Source Sans 3"', 'żółć ąę')).length > 0);
    expect(ok).toBe(true);
  });

  test('budgethulp: xlsx en jspdf komen uit vendor/, ongewijzigd, en werken', async ({ page }) => {
    const crypto = require('crypto');
    await metTaal(page, 'NL');
    await page.goto('budgethulp.html', { waitUntil: 'networkidle' });
    const src = await page.evaluate(() => [...document.scripts].map((s) => s.getAttribute('src')).filter(Boolean));
    expect(src).toContain('vendor/xlsx.full.min.js');
    expect(src).toContain('vendor/jspdf.umd.min.js');
    expect(src.filter((s) => /^(https?:)?\/\//.test(s))).toEqual([]);
    // Dezelfde SHA-256 als in vendor/LEESMIJ.md.
    for (const [bestand, sha] of [['xlsx.full.min.js', 'c9506197caf809a075b6dee1da0d36fb19da7158ffe8a88e7b0c96c5d8623c99'],
      ['jspdf.umd.min.js', '98ccf17aa10c20bb1301762618fcc9b6ab3a4e7f26b6071d64d0b41154df3875']]) {
      const body = await (await page.request.get('vendor/' + bestand)).body();
      expect(crypto.createHash('sha256').update(body).digest('hex'), bestand).toBe(sha);
    }
    const r = await page.evaluate(() => {
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Huur', 780], ['Energie', 190]]), 'Budget');
      const xlsx = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
      const doc = new window.jspdf.jsPDF();
      doc.text('Budgetoverzicht', 10, 10);
      const pdf = doc.output('arraybuffer');
      return { versie: XLSX.version, xlsx: xlsx.byteLength, pdf: pdf.byteLength, kop: String.fromCharCode(...new Uint8Array(pdf).slice(0, 5)) };
    });
    expect(r.versie).toBe('0.18.5');
    expect(r.xlsx).toBeGreaterThan(1000);
    expect(r.pdf).toBeGreaterThan(1000);
    expect(r.kop).toBe('%PDF-');
  });
});

// ── Fase 5: over.html klopt weer (B-10, §3) ──────────────────────────────────────────────────
test.describe('fase 5: over.html klopt weer', () => {
  test('de drie zinnen uit §3, geen modelnaam, en de vier partijen', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.goto('over.html');
    const tekst = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
    expect(tekst).toContain('Een Cloudflare Worker staat tussen de browser en de AI-dienst. De Worker bewaart de instructies voor de AI, en begrenst het aantal vragen per dag.');
    expect(tekst).toContain('Brief Begrijper gebruikt een taalmodel van Anthropic (Claude) via de Anthropic API.');
    expect(tekst).toContain("Solidari gebruikt geen cookies, geen analytics en geen trackingpixels. De pagina's laden niets van andere partijen; ook de lettertypen staan bij ons zelf.");
    expect(tekst).not.toMatch(/Haiku/i);
    expect(tekst).not.toContain('rate limiting');
    expect(tekst).not.toContain('derde partijen');
    const kaart = page.locator('.privacy-kaart').filter({ has: page.locator('.privacy-kaart-titel', { hasText: 'Waar je gegevens langskomen' }) });
    for (const partij of ['GitHub Pages', 'Hetzner', 'Anthropic', 'Cloudflare']) await expect(kaart).toContainText(partij);
  });
});
