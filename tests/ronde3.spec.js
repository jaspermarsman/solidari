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

// De hint mag niets bedekken: geen zichtbaar element buiten de eigen knop overlapt hem (B-1). De knop
// wordt niet breder en de zijkanten blijven staan; hij wordt alleen hoger. In een zone die onderaan
// vastzit (budgethulp) groeit hij naar boven. Wat telt: het vlak van de eerste tik ligt nog in
// dezelfde knop, dus een tweede tik op dezelfde plek kiest.
async function bedektNiets(page, knop, voor) {
  const r = await page.evaluate((v) => {
    const h = document.querySelector('.sol-a11y-tik-hint');
    const knop = h.parentElement;
    const hr = h.getBoundingClientRect(), kr = knop.getBoundingClientRect();
    const raakt = [];
    for (const el of document.querySelectorAll('button, a, input, textarea, select, p, h1, h2, h3, li, label, .bel-sol, .bel-gebruiker')) {
      if (el === knop || el.contains(knop) || knop.contains(el)) continue;
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const x = Math.min(hr.right, r.right) - Math.max(hr.left, r.left);
      const y = Math.min(hr.bottom, r.bottom) - Math.max(hr.top, r.top);
      // Alleen wat er bovenop of eronder echt in beeld staat (geen dichtgeklapte menu's buiten beeld).
      if (x > 1 && y > 1) {
        const midden = document.elementFromPoint(Math.max(hr.left, r.left) + x / 2, Math.max(hr.top, r.top) + y / 2);
        if (midden && !knop.contains(midden)) raakt.push((el.className || el.tagName) + ': ' + (el.textContent || '').trim().slice(0, 30));
      }
    }
    const tik = document.elementFromPoint((v.left + v.right) / 2, (v.top + v.bottom) / 2);
    return { raakt, binnen: hr.left >= kr.left - 1 && hr.right <= kr.right + 1 && hr.bottom <= kr.bottom + 1,
      oudBinnen: kr.top <= v.top + 1 && kr.bottom >= v.bottom - 1,
      zelfdeKnop: !!tik && (tik === knop || knop.contains(tik)),
      links: kr.left, rechts: kr.right, vw: document.documentElement.clientWidth };
  }, voor);
  expect(r.raakt, 'de hint bedekt niets').toEqual([]);
  expect(r.binnen, 'de hint staat binnen de knop').toBe(true);
  expect(Math.abs(r.links - voor.left), 'knop schuift niet opzij (links)').toBeLessThanOrEqual(1);
  expect(Math.abs(r.rechts - voor.right), 'knop schuift niet opzij (rechts)').toBeLessThanOrEqual(1);
  expect(r.oudBinnen, 'het oude knopvlak ligt binnen de knop').toBe(true);
  expect(r.zelfdeKnop, 'een tweede tik op dezelfde plek raakt dezelfde knop').toBe(true);
  expect(r.rechts, 'binnen het scherm').toBeLessThanOrEqual(r.vw + 1);
}
const rect = (loc) => loc.evaluate((el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; });

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
    await expect(hint).toHaveText('👆 Tik nog een keer om te kiezen');
    await expect(hint).toHaveAttribute('role', 'status');
    await bedektNiets(page, knop, voor);
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

  test('budgethulp AR (RTL): hint in het Arabisch, bedekt niets', async ({ page }) => {
    await laad(page, 'budgethulp.html', { taal: 'AR' });
    expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
    const knop = page.locator('.keuze-btn').first();
    await knop.waitFor({ state: 'visible', timeout: 15000 });
    const voor = await rect(knop);
    await knop.click();
    await expect(knop.locator('.sol-a11y-tik-hint')).toHaveText('👆 ' + await hintTekst(page, 'AR'));
    await bedektNiets(page, knop, voor);
    await expect.poll(() => gezegd(page)).toContain(await hintTekst(page, 'AR'));
  });

  test('TI: één tik kiest, geen hint (geen stem, S-7); TI-tekst is alleen 👆👆 (B-3)', async ({ page }) => {
    await laad(page, 'budgethulp.html', { taal: 'TI' });
    expect(await hintTekst(page, 'TI')).toBe('👆👆');
    const knop = page.locator('.keuze-btn').first();
    await knop.waitFor({ state: 'visible', timeout: 15000 });
    await knop.click();
    await page.waitForTimeout(300);
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(0);
  });

  for (const taal of ['NL', 'EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL']) {
    test(`i18n ${taal}: a11y-tik-nog-eens bestaat`, async ({ page }) => {
      await metTaal(page, taal);
      await page.goto('over.html');
      await page.waitForFunction(() => window.Solidari && window.Solidari.i18n);
      const h = await hintTekst(page, taal);
      expect(h).not.toBe('a11y-tik-nog-eens');
      expect(h.length).toBeGreaterThan(1);
      if (taal !== 'NL' && taal !== 'TI') expect(h).not.toBe('Tik nog een keer om te kiezen');
    });
  }
});

// De taalknoppen in het mobiele menu: het geval waar R-1 (PLAN 14) mee begon.
for (const [taal, breedte] of [['NL', 375], ['AR', 375], ['NL', 1280], ['AR', 1280]]) {
  test(`brief ${taal} ${breedte}px: taalknop in de voorleesstand toont de hint, bedekt niets`, async ({ page }) => {
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
    await bedektNiets(page, knop, voor);
    expect(await page.evaluate(() => localStorage.getItem('solidari-taal'))).toBe(taal);
    await knop.click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('solidari-taal'))).toBe('PL');
    await expect(page.locator('.sol-a11y-tik-hint')).toHaveCount(0);
  });
}
