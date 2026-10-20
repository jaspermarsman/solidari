// PLAN 10 (B-4, B-6) — welkomstscherm bij ?taal= en het kopje "TOOLS" onder de testbalk.
//
// - B-4: wie een link met een geldige ?taal= krijgt, heeft al gekozen: geen welkomstscherm. Een
//   ongeldige code geldt als afwezig. Het vlaggetje solidari-welkom-gezien wordt dan níet gezet,
//   zodat een later bezoek zonder parameter het scherm alsnog krijgt.
// - B-6: met de testbalk viel het eerste kopje van het mobiele menu half onder de navigatiebalk.
//   Het menu schuift nu alleen op als de balk er staat; op productie verandert niets. Productie
//   wordt nagebootst door http://solidari.nl/ via page.route naar de geteste server te sturen,
//   zodat components.js echt "productie" ziet (geen testbalk).
const { test, expect, devices } = require('@playwright/test');
const B = require('../tools/vertaal/bronnen.js');

test.use({ ...devices['Pixel 5'] });

// top van #mob-menu zonder testbalk, gemeten op vert-v1@1066131 (vóór B-6) met dezelfde stappen
const MENU_TOP_PRODUCTIE = 64;

async function geladen(page) {
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(300);
}

// ── B-4 ──────────────────────────────────────────────────────────────────
test('?taal=ti: geen welkomstscherm, pagina in het Tigrinya, vlaggetje niet gezet', async ({ page }) => {
  await page.goto('index.html?taal=ti', { waitUntil: 'networkidle' });
  await geladen(page);
  await expect(page.locator('.sol-a11y-welkom')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ti');
  const ti = B.laadAlles().find((b) => b.naam === 'index.html').talen.TI.bladeren.get('tool-lw-omschrijving').waarde;
  await expect(page.locator('[data-i18n="tool-lw-omschrijving"]').first()).toHaveText(ti);
  expect(await page.evaluate(() => localStorage.getItem('solidari-welkom-gezien'))).toBeNull();
  // later zonder parameter terug: dan komt het scherm alsnog, zoals bij ieder nieuw bezoek
  await page.goto('index.html', { waitUntil: 'networkidle' });
  await geladen(page);
  await expect(page.locator('.sol-a11y-welkom-kaart')).toHaveCount(9);
});

test('?taal=TI in hoofdletters en op een andere pagina: ook geen welkomstscherm', async ({ page }) => {
  await page.goto('rechten.html?taal=TI', { waitUntil: 'networkidle' });
  await geladen(page);
  await expect(page.locator('.sol-a11y-welkom')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ti');
});

test('?taal=xx (ongeldig): welkomstscherm zoals zonder parameter', async ({ page }) => {
  await page.goto('index.html?taal=xx', { waitUntil: 'networkidle' });
  await geladen(page);
  await expect(page.locator('.sol-a11y-welkom-kaart')).toHaveCount(9);
});

test('zonder ?taal=: welkomstscherm zoals altijd', async ({ page }) => {
  await page.goto('index.html', { waitUntil: 'networkidle' });
  await geladen(page);
  await expect(page.locator('.sol-a11y-welkom-kaart')).toHaveCount(9);
});

// ── B-6 ──────────────────────────────────────────────────────────────────
async function openMenu(page) {
  await page.locator('.hamburger').click();
  await expect(page.locator('#mob-menu')).toHaveClass(/open/);
  await page.waitForTimeout(400);   // de transitie (0,2 s) moet klaar zijn
  return page.evaluate(() => {
    const menu = document.getElementById('mob-menu');
    const kop = menu.querySelector('.mob-menu-label');
    const r = kop.getBoundingClientRect();
    const raak = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    const rand = document.elementFromPoint(r.left + r.width / 2, r.top + 1);   // ook de bovenrand
    return {
      omgeving: window.Solidari.omgeving,
      balk: !!document.getElementById('sol-env-balk'),
      menuTop: menu.getBoundingClientRect().top,
      kopTekst: kop.textContent.trim(),
      raakIsKop: (raak === kop || kop.contains(raak)) && (rand === kop || kop.contains(rand)),
      raak: [raak, rand].map((x) => (x ? (x.id || x.className || x.tagName) : null)).join(' / '),
    };
  });
}

// vóór B-6 viel het midden van het kopje op rechten.html onder de nav, op index.html alleen de bovenrand
for (const pagina of ['index.html', 'rechten.html']) {
  test(`met testbalk (${pagina}): het kopje "TOOLS" staat vrij (elementFromPoint geeft het kopje)`, async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {} });
    await page.goto(pagina, { waitUntil: 'networkidle' });
    await geladen(page);
    const m = await openMenu(page);
    expect(m.balk).toBe(true);
    expect(m.kopTekst).toBe('Tools');
    expect(m.raakIsKop, `elementFromPoint gaf ${m.raak}`).toBe(true);
  });
}

test('zonder testbalk (productie): het menu staat op dezelfde plek als vóór B-6', async ({ page, baseURL }) => {
  await page.route(/^https?:\/\/(www\.)?solidari\.nl\//, async (route) => {
    const u = new URL(route.request().url());
    const response = await route.fetch({ url: new URL(u.pathname.replace(/^\//, '') + u.search, baseURL).href });
    await route.fulfill({ response });
  });
  await page.addInitScript(() => { try { localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {} });
  await page.goto('http://solidari.nl/index.html', { waitUntil: 'networkidle' });
  await geladen(page);
  const m = await openMenu(page);
  expect(m.omgeving).toBe('productie');
  expect(m.balk).toBe(false);
  expect(m.menuTop).toBe(MENU_TOP_PRODUCTIE);
  expect(m.raakIsKop, `elementFromPoint gaf ${m.raak}`).toBe(true);
});
