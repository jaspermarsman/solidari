// PLAN 15 — kleine ronde 3: hint bij twee tikken (T-1), cursief en leesrichting (T-2, T-3).
const { test, expect, devices } = require('@playwright/test');
const { metTaal, stubApi } = require('./helpers');

// ── T-1: hint in de voorleesstand (B-1, B-2, B-3) ──────────────────────────────────────────
// Nagebootste stem, zoals in a11y-v5-fase1. Geen telefoon bij de sessie.
const STUB = () => {
  const V = ['nl-NL', 'en-GB', 'ar-SA', 'pl-PL', 'uk-UA'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
  window.__spoken = [];
  function U(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; this.lang = ''; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: U });
  const s = {
    getVoices: () => V,
    speak: (u) => { if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 30); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
};

async function laad(page, pagina, { taal = 'NL', stand = 'aan' } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((st) => { try { localStorage.setItem('solidari-voorlezen', st); } catch (e) {} }, stand);
  await page.addInitScript(STUB);
  await stubApi(page, { tekst: 'Testantwoord.', bronnen: [] });
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak && window.Solidari.i18n);
  await page.waitForTimeout(800);   // chatpagina's lezen hun eerste ballon vanzelf
  await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
}
const gezegd = (page) => page.evaluate(() => window.__spoken.join(' | '));
const hintTekst = (page, taal) => page.evaluate((t) => {
  const i = window.Solidari.i18n; const oud = i.getTaal(); i.passToe(t); const h = i.t('a11y-tik-nog-eens'); i.passToe(oud); return h;
}, taal);

// W-G: het label staat met position:absolute op de bovenrand van de knop, in één regel. De knop
// verandert niet van maat of plaats. Het label bedekt geen tekst (niet de eigen knoptekst, ook niet die
// van een buurknop), staat in beeld en wordt niet afgeknipt. Een tik op dezelfde plek raakt dezelfde knop.
async function labelKlopt(page, knop, voor) {
  const r = await page.evaluate((v) => {
    const h = document.querySelector('.sol-a11y-tik-hint');
    const knop = h.parentElement;
    const hr = h.getBoundingClientRect(), kr = knop.getBoundingClientRect();
    const s = getComputedStyle(h);
    // Alle zichtbare tekst op de pagina, behalve die van het label zelf.
    const tekstOnder = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) {
      if (!n.textContent.trim() || h.contains(n)) continue;
      const ou = n.parentElement; const os = getComputedStyle(ou);
      if (os.visibility === 'hidden' || os.display === 'none' || +os.opacity === 0) continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const t of rg.getClientRects()) {
        const x = Math.min(hr.right, t.right) - Math.max(hr.left, t.left);
        const y = Math.min(hr.bottom, t.bottom) - Math.max(hr.top, t.top);
        if (x > 0.5 && y > 0.5 && document.elementFromPoint(t.left + t.width / 2, t.top + t.height / 2) === ou)
          tekstOnder.push((knop.contains(n) ? 'knoptekst: ' : '') + n.textContent.trim().slice(0, 30));
      }
    }
    // Staat het label echt bovenop (niet afgeknipt, niet onder iets anders)? Even aanklikbaar maken.
    h.style.pointerEvents = 'auto';
    const punten = [[0.5, 0.5], [0.15, 0.5], [0.85, 0.5]].map(([fx, fy]) => document.elementFromPoint(hr.left + hr.width * fx, hr.top + hr.height * fy));
    h.style.pointerEvents = '';
    const tik = document.elementFromPoint((v.left + v.right) / 2, (v.top + v.bottom) / 2);
    return {
      tekstOnder, zichtbaar: punten.every((p) => !!p && h.contains(p)),   // het pictogram zit in een eigen <span class="sol-emoji">
      eenRegel: hr.height <= parseFloat(s.lineHeight) + parseFloat(s.paddingTop) + parseFloat(s.paddingBottom) + 1,
      opRand: hr.top < kr.top && hr.bottom > kr.top,
      maat: { left: kr.left, right: kr.right, top: kr.top, bottom: kr.bottom },
      inBeeld: hr.left >= 0 && hr.right <= document.documentElement.clientWidth,
      zelfdeKnop: !!tik && (tik === knop || knop.contains(tik)),
    };
  }, voor);
  expect(r.maat, 'de knop houdt zijn maat en plaats').toEqual({ left: voor.left, right: voor.right, top: voor.top, bottom: voor.bottom });
  expect(r.eenRegel, 'het label is één regel').toBe(true);
  expect(r.opRand, 'het label staat op de bovenrand').toBe(true);
  expect(r.tekstOnder, 'het label bedekt geen tekst').toEqual([]);
  expect(r.zichtbaar, 'het label staat bovenop en is niet afgeknipt').toBe(true);
  expect(r.inBeeld, 'het label staat binnen het scherm').toBe(true);
  expect(r.zelfdeKnop, 'een tweede tik op dezelfde plek raakt dezelfde knop').toBe(true);
}
const rect = (loc) => loc.evaluate((el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; });
const labelTekst = (page, taal) => page.evaluate((t) => {
  const i = window.Solidari.i18n; const oud = i.getTaal(); i.passToe(t); const h = i.t('a11y-nog-eens'); i.passToe(oud); return h;
}, taal);

const { defaultBrowserType, ...PIXEL5 } = devices['Pixel 5'];
test.describe('T-1 hint bij twee tikken', () => {
  test.use(PIXEL5);

  test('budgethulp NL: hint na de eerste tik, weg na de tweede; gesproken na de knoptekst', async ({ page }) => {
    await laad(page, 'budgethulp.html');
    const knop = page.locator('.keuze-btn').first();
    await knop.waitFor({ state: 'visible', timeout: 15000 });
    await page.evaluate(() => window.Solidari.spraak.keuzeTijd(6000));
    const voor = await rect(knop);
    await knop.click();
    const hint = knop.locator('.sol-a11y-tik-hint');
    await expect(hint).toHaveText('👆 Nog een keer');
    await expect(hint).toHaveAttribute('role', 'status');
    await labelKlopt(page, knop, voor);
    await expect.poll(() => gezegd(page)).toMatch(/\| Tik nog een keer om te kiezen$/);
    expect((await page.evaluate(() => window.__spoken))[0]).not.toContain('Tik nog');
    await knop.click();
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(0);
  });

  test('de hint verdwijnt na 6 s', async ({ page }) => {
    await laad(page, 'budgethulp.html');
    const knop = page.locator('.keuze-btn').first();
    await knop.waitFor({ state: 'visible', timeout: 15000 });
    await knop.click();
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(1);
    await page.waitForTimeout(5500);
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(1);
    await page.waitForTimeout(800);
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(0);
    await expect(knop).not.toHaveClass(/sol-a11y-keuze-gehoord/);
  });

  test('nooit meer dan één hint; de gesproken hint maar één keer per sessie', async ({ page }) => {
    await laad(page, 'budgethulp.html');
    const knoppen = page.locator('.keuze-btn');
    await knoppen.first().waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForFunction(() => !_bezig, null, { timeout: 20000 });
    await page.waitForTimeout(1500);   // opnoemen van de keuzes laten aflopen
    expect(await knoppen.count()).toBeGreaterThan(1);
    await knoppen.nth(0).click();
    await expect.poll(() => gezegd(page)).toContain('Tik nog een keer');
    await page.evaluate(() => { window.__spoken = []; });
    await knoppen.nth(1).click();
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(1);
    await expect(knoppen.nth(1).locator('.sol-a11y-tik-hint')).toHaveCount(1);
    await page.waitForTimeout(600);
    const tweede = await gezegd(page);
    expect(tweede.length).toBeGreaterThan(0);
    expect(tweede, 'tweede keer: alleen de knoptekst').not.toContain('Tik nog');
    // Ook na herladen in dezelfde sessie niet meer gesproken; de zichtbare hint blijft.
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
    await page.waitForTimeout(800);
    await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    await page.locator('.keuze-btn').first().click();
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(1);
    await page.waitForTimeout(600);
    expect(await gezegd(page)).not.toContain('Tik nog');
  });

  test('tik tijdens het opnoemen: de hint klinkt toch, en het opnoemen gaat niet verder', async ({ page }) => {
    await laad(page, 'budgethulp.html');
    // Wachten tot de keuzes opgenoemd worden, dan meteen tikken.
    await page.waitForFunction(() => document.querySelector('.sol-a11y-keuze-opgenoemd'), null, { timeout: 25000 });
    await page.evaluate(() => { window.__spoken = []; });
    const knop = page.locator('.keuze-btn').last();
    const naam = (await knop.innerText()).replace(/\p{Extended_Pictographic}/gu, '').trim();
    await knop.click();
    await expect.poll(() => gezegd(page), { timeout: 5000 }).toContain('Tik nog een keer om te kiezen');
    await page.waitForTimeout(1500);
    // Een stuk dat al klonk toen we tikten, kan nog in de lijst staan; vanaf de getikte knop telt het.
    const l = await page.evaluate(() => window.__spoken);
    expect(l.slice(l.lastIndexOf(naam)), 'na de tik: alleen de knop en de hint').toEqual([naam, 'Tik nog een keer om te kiezen']);
    expect(await page.evaluate(() => sessionStorage.getItem('solidari-tik-hint-gezegd'))).toBe('1');
  });

  test('een onderbroken hint telt niet als gezegd', async ({ page }) => {
    await laad(page, 'budgethulp.html');
    await page.waitForFunction(() => !_bezig, null, { timeout: 20000 });
    await page.waitForTimeout(1500);
    await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    // Een trage stem: de knoptekst duurt 2 s, dus de tweede tik komt vóór de hint.
    await page.evaluate(() => {
      const s = window.speechSynthesis; const oud = s.speak;
      s.speak = (u) => { if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 2000); };
    });
    const knop = page.locator('.keuze-btn').first();
    await knop.click();
    await page.waitForTimeout(300);
    await knop.click();
    await page.waitForTimeout(2500);
    expect(await gezegd(page)).not.toContain('Tik nog');
    expect(await page.evaluate(() => sessionStorage.getItem('solidari-tik-hint-gezegd'))).toBeNull();
  });

  test('zonder sessionStorage: geen fout, de hint werkt', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'sessionStorage', { configurable: true, get() { throw new Error('geblokkeerd'); } });
    });
    await laad(page, 'budgethulp.html');
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await page.locator('.keuze-btn').first().click();
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(1);
    expect(fouten).toEqual([]);
  });

  test('voorleesstand uit: geen hint, één tik kiest', async ({ page }) => {
    await laad(page, 'budgethulp.html', { stand: 'uit' });
    const knop = page.locator('.keuze-btn').first();
    await knop.waitFor({ state: 'visible', timeout: 15000 });
    await knop.click();
    await page.waitForTimeout(300);
    await expect(page.locator('.sol-a11y-tik-hint, .sol-a11y-keuze-gehoord')).toHaveCount(0);
  });

  test('budgethulp AR (RTL): label in het Arabisch, knop houdt zijn maat', async ({ page }) => {
    await laad(page, 'budgethulp.html', { taal: 'AR' });
    expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
    const knop = page.locator('.keuze-btn').first();
    await knop.waitFor({ state: 'visible', timeout: 15000 });
    const voor = await rect(knop);
    await knop.click();
    await expect(knop.locator('.sol-a11y-tik-hint')).toHaveText('👆 ' + await labelTekst(page, 'AR'));
    await labelKlopt(page, knop, voor);
    await expect.poll(() => gezegd(page)).toContain(await hintTekst(page, 'AR'));
  });

  test('TI: één tik kiest, geen hint (geen stem, S-7); TI-tekst is alleen 👆👆 (B-3)', async ({ page }) => {
    await laad(page, 'budgethulp.html', { taal: 'TI' });
    expect(await hintTekst(page, 'TI')).toBe('👆👆');
    expect(await labelTekst(page, 'TI')).toBe('👆👆');
    const knop = page.locator('.keuze-btn').first();
    await knop.waitFor({ state: 'visible', timeout: 15000 });
    await knop.click();
    await page.waitForTimeout(300);
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(0);
  });

  for (const taal of ['NL', 'EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL']) {
    test(`i18n ${taal}: a11y-tik-nog-eens en a11y-nog-eens bestaan`, async ({ page }) => {
      await metTaal(page, taal);
      await page.goto('over.html');
      await page.waitForFunction(() => window.Solidari && window.Solidari.i18n);
      const h = await hintTekst(page, taal);
      expect(h).not.toBe('a11y-tik-nog-eens');
      expect(h.length).toBeGreaterThan(1);
      if (taal !== 'NL' && taal !== 'TI') expect(h).not.toBe('Tik nog een keer om te kiezen');
      const k = await labelTekst(page, taal);
      expect(k).not.toBe('a11y-nog-eens');
      if (taal !== 'TI') expect(k.length, 'het label is korter dan de gesproken zin').toBeLessThan(h.length);
      if (taal !== 'NL' && taal !== 'TI') expect(k).not.toBe('Nog een keer');
    });
  }
});

// De taalknoppen in het mobiele menu: het geval waar R-1 (PLAN 14) mee begon.
for (const [taal, breedte] of [['NL', 375], ['AR', 375], ['NL', 1280], ['AR', 1280]]) {
  test(`brief ${taal} ${breedte}px: taalknop in de voorleesstand toont het label, knop houdt zijn maat`, async ({ page }) => {
    await page.setViewportSize({ width: breedte, height: breedte < 600 ? 667 : 800 });
    await laad(page, 'brief.html', { taal });
    if (breedte < 600) {
      await page.locator('.hamburger').click();
      await page.waitForTimeout(400);
      await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    } else {
      await page.locator('#solidari-nav-bar .taal-trigger').click();
      await page.waitForTimeout(400);
      await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    }
    const sel = breedte < 600 ? '#mob-menu .taal-btn[data-taal="PL"]' : '#solidari-nav-bar .taal-dd-btn[data-taal="PL"]';
    const knop = page.locator(sel);
    await expect(knop).toBeVisible();
    await knop.scrollIntoViewIfNeeded();
    const voor = await rect(knop);
    await knop.click();
    await expect(knop.locator('.sol-a11y-tik-hint')).toHaveCount(1);
    await labelKlopt(page, knop, voor);
    expect(await page.evaluate(() => localStorage.getItem('solidari-taal'))).toBe(taal);
    await knop.click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('solidari-taal'))).toBe('PL');
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(0);
  });
}

// W-G: vóór en na de eerste tik dezelfde maat, op 375 px, in LTR en RTL, op elke knop van de keuzezone.
for (const pagina of ['budgethulp.html', 'goedvoorbereid.html']) {
  for (const taal of ['NL', 'AR']) {
    test(`${pagina} ${taal} 375px: elke keuzeknop houdt zijn maat, het label bedekt geen tekst`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await laad(page, pagina, { taal });
      const knoppen = page.locator('.keuze-btn');
      await knoppen.first().waitFor({ state: 'visible', timeout: 15000 });
      await page.waitForFunction(() => typeof _bezig === 'undefined' || !_bezig, null, { timeout: 20000 });
      await page.waitForTimeout(1500);
      await page.evaluate(() => { window.Solidari.spraak.stop(); window.Solidari.spraak.keuzeTijd(6000); });
      const n = await knoppen.count();
      expect(n).toBeGreaterThan(1);
      for (let i = 0; i < n; i++) {
        const knop = knoppen.nth(i);
        await knop.scrollIntoViewIfNeeded();
        const voor = await rect(knop);
        await knop.click();
        await expect(knop.locator('.sol-a11y-tik-hint')).toHaveText('👆 ' + await labelTekst(page, taal));
        await labelKlopt(page, knop, voor);
        await page.evaluate(() => window.Solidari.spraak.stop());
      }
    });
  }
}

// ── T-2 en T-3: Solidari.opmaak, cursief en leesrichting (B-4, B-5) ────────────────────────
async function opmaak(page, tekst, opties) {
  return page.evaluate(([t, o]) => window.Solidari.opmaak(t, o), [tekst, opties]);
}
test.describe('Solidari.opmaak, ronde 3', () => {
  test.beforeEach(async ({ page }) => {
    await metTaal(page, 'NL');
    await page.goto('over.html');
    await page.waitForFunction(() => window.Solidari && typeof window.Solidari.opmaak === 'function');
  });

  test('*cursief* wordt <em>', async ({ page }) => {
    expect(await opmaak(page, 'Dit is *belangrijk* nu.')).toBe('<p>Dit is <em>belangrijk</em> nu.</p>');
    expect(await opmaak(page, 'Een *boete* of *x*.')).toBe('<p>Een <em>boete</em> of <em>x</em>.</p>');
  });

  test('regels met "* " worden een lijst', async ({ page }) => {
    expect(await opmaak(page, 'Zo:\n* eerst bellen\n* dan *mailen*')).toBe(
      '<p>Zo:</p><ul style="padding-inline-start:1.3em"><li>eerst bellen</li><li>dan <em>mailen</em></li></ul>');
  });

  test('losse sterretjes blijven staan', async ({ page }) => {
    expect(await opmaak(page, '5 * 3 = 15')).toBe('<p>5 * 3 = 15</p>');
    expect(await opmaak(page, 'Let op * dit is een opmerking')).toBe('<p>Let op * dit is een opmerking</p>');
    expect(await opmaak(page, 'Prijs* (zie onder)')).toBe('<p>Prijs* (zie onder)</p>');
    expect(await opmaak(page, 'Let op **dit')).toBe('<p>Let op **dit</p>');
  });

  test('**vet** en *cursief* in één regel', async ({ page }) => {
    expect(await opmaak(page, '**Bijstand** is *soms* mogelijk, **echt**.')).toBe(
      '<p><strong>Bijstand</strong> is <em>soms</em> mogelijk, <strong>echt</strong>.</p>');
  });

  test('<script> blijft geëscaped, ook in cursief en in een citaat', async ({ page }) => {
    const h = await opmaak(page, '*<script>alert(1)</script>* "<img src=x onerror=alert(1)>."', { dir: 'rtl' });
    expect(h).not.toMatch(/<script|<img/);
    expect(h).toContain('<em>&lt;script&gt;alert(1)&lt;/script&gt;</em>');
    const n = await page.evaluate((html) => { const d = document.createElement('div'); d.innerHTML = html; return d.querySelectorAll('script, img').length; }, h);
    expect(n).toBe(0);
  });

  test('RTL: een Nederlands citaat in een Arabische zin komt in <bdi>, met de punt erna', async ({ page }) => {
    expect(await opmaak(page, 'قل: "Ik heb al twee weken pijn in mijn rug". المعنى', { dir: 'rtl' })).toBe(
      '<p>قل: <bdi>&quot;Ik heb al twee weken pijn in mijn rug&quot;.</bdi> المعنى</p>');
    expect(await opmaak(page, 'قل „Ik heb pijn.” و «Wat betekent dat?»', { dir: 'rtl' })).toBe(
      '<p>قل <bdi>„Ik heb pijn.”</bdi> و <bdi>«Wat betekent dat?»</bdi></p>');
    expect(await opmaak(page, 'بگویید: “Kunt u dat herhalen?”', { dir: 'rtl' })).toBe(
      '<p>بگویید: <bdi>“Kunt u dat herhalen?”</bdi></p>');
  });

  test('RTL zonder parameter: de richting van de pagina telt', async ({ page }) => {
    const h = await page.evaluate(() => { document.documentElement.dir = 'rtl'; const h = window.Solidari.opmaak('قل "Ik heb pijn."'); document.documentElement.dir = 'ltr'; return h; });
    expect(h).toBe('<p>قل <bdi>&quot;Ik heb pijn.&quot;</bdi></p>');
  });

  test('LTR: geen <bdi>', async ({ page }) => {
    expect(await opmaak(page, 'Zeg: "Ik heb pijn." en „dit”.')).toBe('<p>Zeg: &quot;Ik heb pijn.&quot; en „dit”.</p>');
    expect(await opmaak(page, 'Zeg: "Ik heb pijn."', { dir: 'ltr' })).not.toContain('<bdi>');
  });

  test('citaat half in vet: geen kapotte HTML', async ({ page }) => {
    const h = await opmaak(page, '**"half** in"', { dir: 'rtl' });
    expect(h).toBe('<p><strong>&quot;half</strong> in&quot;</p>');
  });
});

// De opgeslagen antwoorden uit de meting van PLAN 14 (ronde 4), zonder API: in AR en FA staat elk
// Nederlands citaat in <bdi>, en de tekst zelf verandert niet.
const fs = require('fs');
const path = require('path');
const RONDE4 = path.join(__dirname, '..', '..', 'Solidari', '_werkdocumenten', 'modellen', 'ronde4', 'gv');
for (const bestand of ['ar-2', 'fa-2']) {
  test(`opmaak met het opgeslagen antwoord ${bestand} (RTL)`, async ({ page }) => {
    const pad = path.join(RONDE4, `claude-sonnet-5-5-gv-PAGINA-${bestand}.txt`);
    test.skip(!fs.existsSync(pad), 'opgeslagen meting niet aanwezig (alleen lokaal)');
    const tekst = fs.readFileSync(pad, 'utf-8');
    await metTaal(page, bestand.slice(0, 2).toUpperCase());
    await page.goto('goedvoorbereid.html');
    await page.waitForFunction(() => window.Solidari && typeof window.Solidari.opmaak === 'function');
    const r = await page.evaluate((t) => {
      const d = document.createElement('div'); d.innerHTML = window.Solidari.opmaak(t);
      return { bdi: [...d.querySelectorAll('bdi')].map((b) => b.textContent), tekst: d.textContent, sterren: (d.textContent.match(/\*\*/g) || []).length };
    }, tekst);
    expect(r.bdi.length).toBeGreaterThan(0);
    expect(r.bdi.some((b) => /\b(ik|u|de|het|een|mijn|heb)\b/i.test(b)), 'een Nederlands citaat in <bdi>').toBe(true);
    expect(r.sterren).toBe(0);
    // Op de opmaak na dezelfde tekst: alleen ** en lijsttekens en lege regels zijn weg.
    const plat = (s) => s.replace(/\*\*/g, '').replace(/^[-•*]\s+/gm, '').replace(/\s+/g, '');
    expect(plat(r.tekst)).toBe(plat(tekst.replace(/(^|[^*\S])\*([^\s*](?:[^*\n]*?[^\s*])?)\*/g, '$1$2')));
  });
}
