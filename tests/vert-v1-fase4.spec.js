// PLAN 7 fase 4 (PLAN 9 blok 3) — het menu voorlezen in de voorleesstand.
//
// Gat uit de staging-test van 06-10: de navigatie werd niet voorgelezen. Nu, met de voorleesstand aan:
// - het mobiele menu (hamburger) en de taalkiezer noemen hun items op, in volgorde, met oplichten;
// - een menu-item, taalknop of footerlink kiest pas bij de tweede tik (de eerste leest voor);
// - aanraken stopt het opnoemen; emoji zijn niet hoorbaar;
// - na een taalwissel staat de voorleesknop er nog, aan.
// Er is geen telefoon bij de sessie: de stem is nagebootst (als a11y-v5-fase2). Met SOL_BEWIJS=<map>
// worden screenshots bewaard (bewijs/vert-v1-fase4/).
const { test, expect, devices } = require('@playwright/test');
const path = require('path');
const { metTaal } = require('./helpers');

test.use({ ...devices['Pixel 5'] });

const STUB = () => {
  const V = ['nl-NL', 'en-GB', 'pl-PL', 'ar-SA'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
  window.__log = [];
  const timers = new Set();
  function U(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; this.lang = ''; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: U });
  const s = {
    getVoices: () => V,
    speak: (u) => {
      const stil = !u.text.trim();
      if (!stil) {
        const lit = [...document.querySelectorAll('.sol-a11y-keuze-opgenoemd, .sol-a11y-keuze-gehoord')].map((e) => e.textContent.replace(/\s+/g, ' ').trim());
        window.__log.push({ tekst: u.text, stem: (u.voice && u.voice.lang) || u.lang, lit });
      }
      const id = setTimeout(() => { timers.delete(id); u.onend && u.onend(); }, stil ? 0 : 120);
      timers.add(id);
    },
    cancel: () => { timers.forEach(clearTimeout); timers.clear(); },
    pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
};

async function laad(page, pagina = 'rechten.html', { taal = 'NL', stand = 'aan' } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((st) => { try { localStorage.setItem('solidari-voorlezen', st); } catch (e) {} }, stand);
  await page.addInitScript(STUB);
  await page.route(/workers\.dev|solidari\.nl/, (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{}' }));
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak && window.Solidari.spraak.menuVoorlezen);
  await page.waitForTimeout(600);   // chatpagina's lezen hun eerste ballon vanzelf; die reeks eerst laten aflopen
  await page.evaluate(() => { window.Solidari.spraak.stop(); window.__log = []; });
}
const teksten = (page) => page.evaluate(() => window.__log.map((x) => x.tekst.replace(/\s+/g, ' ').trim()));
// zeg() is asynchroon: wachten tot de laatst gezegde tekst er is
const laatste = (page, tekst) => expect.poll(async () => (await teksten(page)).at(-1), { timeout: 5000 }).toBe(tekst);
const EMOJI = /\p{Extended_Pictographic}|\p{Regional_Indicator}/u;
async function bewijs(page, naam) {
  if (process.env.SOL_BEWIJS) await page.screenshot({ path: path.join(process.env.SOL_BEWIJS, naam + '.png') });
}

// Wat er volgens de pagina zelf voorgelezen hoort te worden: zichtbare kopjes en items in DOM-volgorde.
const VERWACHT = (sel) => {
  const S = window.Solidari.spraak;
  const root = document.querySelector(sel);
  return [...root.querySelectorAll('.mob-menu-label, ' + S.navKeuzeSelector)]
    .filter((el) => el.getClientRects().length > 0)
    .map((el) => S.menuTekst(el)).filter(Boolean);
};

test('hamburger: het hele menu wordt opgenoemd, in volgorde, met oplichten en zonder emoji', async ({ page }) => {
  await laad(page);
  await page.locator('.hamburger').tap();
  const verwacht = await page.evaluate(VERWACHT, '#mob-menu');
  expect(verwacht.length).toBeGreaterThan(15);   // 2 kopjes + tools + 3 links + 9 talen
  expect(verwacht).toContain('Feedback');
  expect(verwacht).toContain('Tools');   // het kopje, niet 'TOOLS' (CSS-hoofdletters)
  expect(verwacht).toContain('English');
  await page.waitForFunction((n) => window.__log.length >= n, verwacht.length, { timeout: 20000 });
  await bewijs(page, '1-menu-opgenoemd');
  const log = await page.evaluate(() => window.__log);
  expect(log.map((x) => x.tekst.replace(/\s+/g, ' ').trim())).toEqual(verwacht);
  for (const x of log) {
    expect(EMOJI.test(x.tekst), x.tekst).toBe(false);
    expect(x.lit.length, `licht op bij "${x.tekst}"`).toBe(1);
  }
  // taalnamen in hun eigen stem waar het toestel die heeft
  expect(log.find((x) => x.tekst === 'English').stem).toMatch(/^en/);
  expect(log.find((x) => x.tekst === 'Polski').stem).toMatch(/^pl/);
  expect(log.find((x) => x.tekst === 'Feedback').stem).toMatch(/^nl/);
});

test('aanraken stopt het opnoemen', async ({ page }) => {
  await laad(page);
  await page.locator('.hamburger').tap();
  await page.waitForFunction(() => window.__log.length >= 3);
  await page.locator('.mob-menu-label').last().tap();
  const n = (await teksten(page)).length;
  await page.waitForTimeout(1200);
  expect((await teksten(page)).length).toBe(n);
  await expect(page.locator('.sol-a11y-keuze-opgenoemd')).toHaveCount(0);
});

test('menu-item: eerste tik leest voor, tweede tik kiest', async ({ page }) => {
  await laad(page);
  await page.locator('.hamburger').tap();
  await page.waitForTimeout(300);
  const link = page.locator('#mob-menu a.mob-link[href$="feedback.html"]');
  await link.tap();
  await expect(link).toHaveClass(/sol-a11y-keuze-gehoord/);
  await bewijs(page, '2-eerste-tik-feedback');
  await laatste(page, 'Feedback');
  await page.waitForTimeout(300);
  expect(page.url()).toMatch(/rechten\.html$/);
  await link.tap();
  await page.waitForURL(/feedback\.html$/);
});

test('taalkiezer (globe): de talen worden opgenoemd; twee tikken wisselt; de voorleesknop blijft aan', async ({ page }) => {
  await laad(page);
  await page.locator('.taal-trigger').tap();
  const verwacht = await page.evaluate(VERWACHT, '.taal-dropdown-menu');
  expect(verwacht).toHaveLength(9);
  await page.waitForFunction((n) => window.__log.length >= n, verwacht.length, { timeout: 20000 });
  expect(await teksten(page)).toEqual(verwacht);
  await bewijs(page, '3-talen-opgenoemd');
  const en = page.locator('.taal-dropdown-menu .taal-btn[data-taal="EN"]');
  await en.tap();
  await expect(page.locator('html')).toHaveAttribute('lang', 'nl');   // eerste tik: alleen voorlezen
  await laatste(page, 'English');
  await en.tap();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const knop = page.locator('.sol-a11y-luister-toggle');
  await expect(knop).toBeVisible();
  await expect(knop).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('body')).toHaveClass(/sol-a11y-luistermodus/);
  await bewijs(page, '4-na-taalwissel-engels');
  // en in de nieuwe taal leest het menu ook voor, met de Engelse namen
  await page.evaluate(() => { window.__log = []; });
  await page.locator('.hamburger').tap();
  await page.waitForFunction(() => window.__log.length >= 3);
  expect(await teksten(page)).toContain('Tools');
});

test('footerlink: twee tikken', async ({ page }) => {
  await laad(page, 'index.html');   // de chatpagina's hebben geen footer
  const link = page.locator('#solidari-footer-bar .footer-midden a[href$="vertaalhulp.html"]');
  await link.scrollIntoViewIfNeeded();
  await link.tap();
  await laatste(page, await link.innerText());
  expect(page.url()).toMatch(/index\.html$/);
  await link.tap();
  await page.waitForURL(/vertaalhulp\.html$/);
});

test('voorleesstand uit: menu blijft stil en één tik kiest', async ({ page }) => {
  await laad(page, 'rechten.html', { stand: 'uit' });
  await page.locator('.hamburger').tap();
  await page.waitForTimeout(800);
  expect(await teksten(page)).toEqual([]);
  await page.locator('#mob-menu a.mob-link[href$="feedback.html"]').tap();
  await page.waitForURL(/feedback\.html$/);
});

test('Tigrinya (geen stem, S-7): menu stil, één tik kiest, geen voorleesknop', async ({ page }) => {
  await laad(page, 'rechten.html', { taal: 'TI' });
  await expect(page.locator('.sol-a11y-luister-toggle')).toBeHidden();
  await page.locator('.hamburger').tap();
  await page.waitForTimeout(800);
  expect(await teksten(page)).toEqual([]);
  await page.locator('#mob-menu a.mob-link[href$="feedback.html"]').tap();
  await page.waitForURL(/feedback\.html$/);
});

test('geen 🔊-knoppen in het menu', async ({ page }) => {
  await laad(page);
  await page.locator('.hamburger').tap();
  await expect(page.locator('#mob-menu .sol-a11y-knop, #solidari-nav-bar .sol-a11y-knop, #solidari-footer-bar .sol-a11y-knop')).toHaveCount(0);
});
