// PLAN-5 fase 1 — gedeeld keuzecomponent: twee tikken in de voorleesstand (B-1), mobiel.
// Bouwt op voorlezen-mobiel.spec.js (nagebootste stem) en a11y-v5-nulmeting.spec.js.
const { test, expect, devices } = require('@playwright/test');
const { metTaal } = require('./helpers');

test.use({ ...devices['Pixel 5'] });

const STUB = () => {
  const V = ['nl-NL', 'en-GB', 'ti-ET'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
  window.__spoken = [];
  function U(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: U });
  const s = {
    getVoices: () => V,
    speak: (u) => { if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
  // telt hoeveel click-listeners in de capture-fase op document worden geregistreerd
  window.__clickCapture = 0;
  const orig = document.addEventListener.bind(document);
  document.addEventListener = function (type, fn, opt) {
    if (type === 'click' && (opt === true || (opt && opt.capture))) window.__clickCapture++;
    return orig(type, fn, opt);
  };
};

const PAGINAS = {
  'budgethulp.html': '.keuze-btn',
  'rechten.html': '.situatie-btn',
  'naturalisatie.html': '.antwoord-knop',
  '18jaar.html': '.leeftijd-knop:not(.actief)',
};

async function laad(page, pagina, { taal = 'NL', stand } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((s) => { try { if (s) localStorage.setItem('solidari-voorlezen', s); else localStorage.removeItem('solidari-voorlezen'); } catch (e) {} }, stand || null);
  await page.addInitScript(STUB);
  await page.route(/workers\.dev|solidari\.nl/, (r) => r.fulfill({
    status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify({ tekst: 'Testantwoord.', bronnen: [] }),
  }));
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(800);
  await page.locator(PAGINAS[pagina]).first().waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(300);
}

// Telt echte kliks die de knop zélf bereiken (dus na de capture-fase van document).
async function teller(page, sel) {
  await page.evaluate((s) => {
    const el = document.querySelector(s);
    el.__geklikt = 0;
    el.addEventListener('click', () => { el.__geklikt++; });
    window.__kn = el;
  }, sel);
}
const geklikt = (page) => page.evaluate(() => window.__kn.__geklikt);
const gezegd = (page) => page.evaluate(() => window.__spoken.join(' | ').replace(/\s+/g, ' '));
const schoon = (t) => t.replace(/\p{Extended_Pictographic}|\p{Regional_Indicator}|️|‍/gu, '').replace(/\s+/g, ' ').trim();
async function zetVoorlezenAan(page) {
  await page.locator('.sol-a11y-luister-toggle').click();
  await page.waitForFunction(() => window.Solidari.spraak.luistermodus.staat());
  await page.waitForTimeout(400);
  await page.evaluate(() => { window.__spoken = []; });
}

for (const [pagina, sel] of Object.entries(PAGINAS)) {
  test.describe(pagina, () => {
    test('voorleesstand aan: twee tikken kiezen, één tik niet', async ({ page }) => {
      await laad(page, pagina);
      await zetVoorlezenAan(page);
      const knop = page.locator(sel).first();
      const tekst = schoon(await knop.innerText());
      expect(tekst.length).toBeGreaterThan(0);
      await teller(page, sel);
      await page.evaluate(() => window.Solidari.spraak.keuzeTijd(6000));

      await knop.click();
      await page.waitForTimeout(400);
      expect(await geklikt(page), 'eerste tik mag niet kiezen').toBe(0);
      expect(await gezegd(page)).toContain(tekst.slice(0, 20));
      await expect(knop).toHaveClass(/sol-a11y-keuze-gehoord/);

      await knop.click();
      expect(await geklikt(page), 'tweede tik kiest').toBe(1);
      expect(await page.evaluate(() => window.__kn.classList.contains('sol-a11y-keuze-gehoord'))).toBe(false);
    });

    test('een tik op een andere knop leest die voor; kiezen vraagt dan weer twee tikken', async ({ page }) => {
      await laad(page, pagina);
      await zetVoorlezenAan(page);
      const lijst = page.locator(sel);
      if (await lijst.count() < 2) test.skip(true, 'maar één keuzeknop zichtbaar op het beginscherm');
      const a = lijst.nth(0), b = lijst.nth(1);
      const tb = schoon(await b.innerText());
      await a.click(); await page.waitForTimeout(300);
      await page.evaluate(() => { window.__spoken = []; });
      await teller(page, sel);   // teller op eerste knop
      await b.click(); await page.waitForTimeout(400);
      expect(await gezegd(page)).toContain(tb.slice(0, 20));
      await expect(b).toHaveClass(/sol-a11y-keuze-gehoord/);
      await expect(a).not.toHaveClass(/sol-a11y-keuze-gehoord/);
      expect(await geklikt(page), 'a is niet gekozen').toBe(0);
    });

    test('na de tijdslimiet telt de tweede tik weer als eerste tik', async ({ page }) => {
      await laad(page, pagina);
      await zetVoorlezenAan(page);
      await page.evaluate(() => window.Solidari.spraak.keuzeTijd(700));
      const knop = page.locator(sel).first();
      await teller(page, sel);
      await knop.click();
      await page.waitForTimeout(1000);
      await expect(knop).not.toHaveClass(/sol-a11y-keuze-gehoord/);
      await page.evaluate(() => { window.__spoken = []; });
      await knop.click();
      await page.waitForTimeout(300);
      expect(await geklikt(page)).toBe(0);
      expect((await gezegd(page)).length).toBeGreaterThan(0);
    });

    test('voorleesstand uit: één tik kiest, geen markering', async ({ page }) => {
      await laad(page, pagina);
      await teller(page, sel);
      await page.locator(sel).first().click();
      expect(await geklikt(page)).toBe(1);
      expect(await page.evaluate(() => window.__kn.classList.contains('sol-a11y-keuze-gehoord'))).toBe(false);
    });

    test('TI: één tik kiest altijd, ook als de voorleesstand bewaard stond', async ({ page }) => {
      await laad(page, pagina, { taal: 'TI', stand: 'aan' });
      await teller(page, sel);
      await page.locator(sel).first().click();
      await page.waitForTimeout(300);
      expect(await geklikt(page)).toBe(1);
      expect(await page.evaluate(() => window.__spoken.length)).toBe(0);
      expect(await page.locator('.sol-a11y-knop, .sol-a11y-keuze-gehoord').count()).toBe(0);
    });
  });
}

test('geen dubbele listeners na een taalwissel: één tik = één keer voorlezen', async ({ page }) => {
  await laad(page, 'naturalisatie.html');
  await zetVoorlezenAan(page);
  const voor = await page.evaluate(() => window.__clickCapture);
  await page.locator('.taal-trigger').click();
  await page.locator('.taal-dd-btn[data-taal="EN"]').click();
  await page.waitForTimeout(1200);
  expect(await page.evaluate(() => window.__clickCapture)).toBe(voor);
  await page.evaluate(() => { window.__spoken = []; window.Solidari.spraak.keuzeTijd(6000); });
  const sel = '.antwoord-knop';
  await teller(page, sel);
  await page.locator(sel).first().click();
  await page.waitForTimeout(500);
  expect(await geklikt(page)).toBe(0);
  const n = await page.evaluate(() => window.__spoken.length);
  expect(n).toBeGreaterThan(0);
  const eerste = await gezegd(page);
  // één keer voorgelezen: dezelfde tekst komt niet dubbel voor
  await page.locator(sel).first().click();
  expect(await geklikt(page)).toBe(1);
  expect(eerste.split(' | ').length).toBe(new Set(eerste.split(' | ')).size);
});

test('emoji worden uit de voorleestekst gehaald; data-lees gaat voor', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  const uit = await page.evaluate(() => {
    const s = window.Solidari.spraak;
    const a = document.createElement('button'); a.className = 'keuze-btn'; a.textContent = '👩‍👧 Ik en  mijn 🇳🇱 kind️';
    const b = document.createElement('button'); b.className = 'keuze-btn'; b.setAttribute('data-lees', 'Andere tekst'); b.textContent = 'Zichtbaar';
    const c = document.createElement('button'); c.className = 'stuur-btn'; c.textContent = '→';
    document.body.append(a, b, c);
    const r = { a: s.keuzeTekst(a), b: s.keuzeTekst(b), stuur: s.isKeuzeknop(c), keuze: s.isKeuzeknop(a) };
    a.remove(); b.remove(); c.remove();
    return r;
  });
  expect(uit).toEqual({ a: 'Ik en mijn kind', b: 'Andere tekst', stuur: false, keuze: true });
});

test('nav van rechten ligt binnen het scherm (360 en 393 px) en de schakelaar is echt aan te tikken', async ({ page }) => {
  for (const breedte of [360, 393]) {
    await page.setViewportSize({ width: breedte, height: 727 });
    await laad(page, 'rechten.html');
    for (const sel of ['.sol-a11y-luister-toggle', '.taal-trigger', '.hamburger']) {
      const r = await page.locator(sel).first().boundingBox();
      expect(r, sel).toBeTruthy();
      expect(r.x, `${sel} @${breedte}`).toBeGreaterThanOrEqual(0);
      expect(r.x + r.width, `${sel} @${breedte}`).toBeLessThanOrEqual(breedte);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.locator('.sol-a11y-luister-toggle').click();
  await page.waitForFunction(() => window.Solidari.spraak.luistermodus.staat());
});

for (const pagina of ['budgethulp.html', 'naturalisatie.html', '18jaar.html']) {
  test(`nav ${pagina} ligt binnen het scherm op mobiel`, async ({ page }) => {
    await laad(page, pagina);
    for (const sel of ['.sol-a11y-luister-toggle', '.taal-trigger', '.hamburger']) {
      const r = await page.locator(sel).first().boundingBox();
      expect(r.x).toBeGreaterThanOrEqual(0);
      expect(r.x + r.width).toBeLessThanOrEqual(393);
    }
  });
}
