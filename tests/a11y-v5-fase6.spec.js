// PLAN-5 fase 6 — leesbaarheid (I-8), contrast en keuzeknoppen in feedback (I-9), mobiel (Pixel 5).
//   - geen zichtbaar tekstelement onder 14px (geen uitzonderingen nodig), op alle 11 pagina's;
//   - budgethulp-ballonvarianten >= 0,95rem;
//   - feedback: tool-keuzeknoppen (één tik, twee tikken in de voorleesstand, juiste waarde, verplicht);
//   - axe met color-contrast: 0 serious/critical.
// Paden in goto zijn relatief (werkt ook tegen staging met SOL_BASE_URL).
const { test, expect, devices } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { PAGES, metTaal } = require('./helpers');

test.use({ ...devices['Pixel 5'] });

const STUB = () => {
  const V = ['nl-NL', 'en-GB', 'ar-SA'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
  window.__spoken = [];
  function U(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: U });
  const s = {
    getVoices: () => V,
    speak: (u) => { if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
};

async function laad(page, pagina, { taal = 'NL', stand = null, stub = true } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((s) => { try { if (s) localStorage.setItem('solidari-voorlezen', s); else localStorage.removeItem('solidari-voorlezen'); } catch (e) {} }, stand);
  if (stub) await page.addInitScript(STUB);
  await page.route(/workers\.dev|solidari\.nl/, (r) => r.fulfill({
    status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify({ ok: true, tekst: 'Testantwoord.', bronnen: [] }),
  }));
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak && window.Solidari.a11y);
  await page.waitForTimeout(900);
}

// Uitzonderingen op de 14px-regel: geen (zie LOG-a11y-v5.md, fase 6).
const UITZONDERINGEN = [];

// ── 1. Tekstgrootte ─────────────────────────────────────────────────────────
for (const pagina of PAGES) {
  test(`tekstgrootte: niets onder 14px op ${pagina}`, async ({ page }) => {
    await laad(page, pagina);
    const klein = await page.evaluate((uit) => {
      const res = [];
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) {
        if (!n.nodeValue.trim()) continue;
        const el = n.parentElement;
        if (el.closest('script,style,noscript')) continue;
        if (uit.some((u) => el.matches(u))) continue;
        const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
        if (r.width <= 0 || r.height <= 0 || s.visibility === 'hidden' || s.display === 'none') continue;
        const fs = parseFloat(s.fontSize);
        if (fs < 13.99) res.push(`${el.tagName}.${el.className} ${fs}px "${n.nodeValue.trim().slice(0, 20)}"`);
      }
      return res;
    }, UITZONDERINGEN);
    expect(klein).toEqual([]);
  });
}

test('budgethulp: ballonvarianten zijn minstens 0,95rem', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  const groottes = await page.evaluate(() => {
    const uit = {};
    for (const k of ['reactie', 'nibud', 'toeslag', 'waarschuwing']) {
      const el = document.createElement('div');
      el.className = 'bel-sol ' + k; el.textContent = 'x';
      document.body.appendChild(el);
      uit[k] = parseFloat(getComputedStyle(el).fontSize);
      el.remove();
    }
    return uit;
  });
  for (const [k, px] of Object.entries(groottes)) expect(px, k).toBeGreaterThanOrEqual(15.2 - 0.01);
});

// ── 2. Feedback: keuzeknoppen ───────────────────────────────────────────────
async function opVerstuurd(page) {
  const verstuurd = [];
  await page.unroute(/workers\.dev|solidari\.nl/);
  await page.route(/workers\.dev|solidari\.nl/, async (r) => {
    const req = r.request();
    if (req.method() === 'POST' && /\/api\/feedback/.test(req.url())) verstuurd.push(JSON.parse(req.postData()));
    await r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: true }) });
  });
  return verstuurd;
}
const knop = (page, waarde) => page.locator(`.tool-knop[data-waarde="${waarde}"]`);

test('feedback: geen select meer, zeven tool-knoppen met vertaalde namen', async ({ page }) => {
  await laad(page, 'feedback.html');
  await expect(page.locator('select')).toHaveCount(0);
  await expect(page.locator('.tool-knop')).toHaveCount(7);
  await expect(page.locator('#tool')).toHaveAttribute('type', 'hidden');
  await expect(knop(page, 'budgethulp')).toHaveText('Budgethulp');
  await expect(page.locator('[role=group][aria-labelledby=tool-label]')).toHaveCount(1);
  for (const k of await page.locator('.tool-knop').all()) await expect(k).toHaveAttribute('aria-pressed', 'false');
});

test('feedback: buiten de voorleesstand kiest één tik; de waarde wordt verstuurd', async ({ page }) => {
  await laad(page, 'feedback.html');
  const verstuurd = await opVerstuurd(page);
  await knop(page, 'loont-werken').click();
  await expect(knop(page, 'loont-werken')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.tool-knop[aria-pressed=true]')).toHaveCount(1);
  expect(await page.locator('#tool').inputValue()).toBe('loont-werken');
  await knop(page, 'rechten').click();                         // omkiezen
  await expect(knop(page, 'loont-werken')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('.type-knop[data-waarde="suggestie"]').click();
  await page.fill('#omschrijving', 'Testbericht');
  await page.click('#verstuur-knop');
  await expect(page.locator('#melding.succes')).toBeVisible();
  expect(verstuurd.length).toBe(1);
  expect(verstuurd[0]).toMatchObject({ tool: expect.stringMatching(/^(\[staging\] )?rechten$/), type: 'suggestie', omschrijving: 'Testbericht' });
  // na het versturen is de keuze gewist
  expect(await page.locator('#tool').inputValue()).toBe('');
  await expect(page.locator('.tool-knop[aria-pressed=true]')).toHaveCount(0);
});

test('feedback: in de voorleesstand is de eerste tik voorlezen, de tweede kiest', async ({ page }) => {
  await laad(page, 'feedback.html', { stand: 'aan' });
  await page.evaluate(() => { window.__spoken = []; });
  await knop(page, 'budgethulp').click();
  expect(await page.locator('#tool').inputValue()).toBe('');
  await expect(knop(page, 'budgethulp')).toHaveAttribute('aria-pressed', 'false');
  await expect(knop(page, 'budgethulp')).toHaveClass(/sol-a11y-keuze-gehoord/);
  await expect.poll(() => page.evaluate(() => window.__spoken.join(' '))).toContain('Budgethulp');
  await knop(page, 'budgethulp').click();
  await expect(knop(page, 'budgethulp')).toHaveAttribute('aria-pressed', 'true');
  expect(await page.locator('#tool').inputValue()).toBe('budgethulp');
});

test('feedback: voorleesstand, waarde komt in het verstuurde formulier', async ({ page }) => {
  await laad(page, 'feedback.html', { stand: 'aan' });
  const verstuurd = await opVerstuurd(page);
  await knop(page, '18jaar').click(); await knop(page, '18jaar').click();
  await page.locator('.type-knop[data-waarde="compliment"]').click();
  await page.locator('.type-knop[data-waarde="compliment"]').click();
  await page.fill('#omschrijving', 'Mooi');
  await page.click('#verstuur-knop');
  await expect(page.locator('#melding.succes')).toBeVisible();
  expect(verstuurd[0].tool).toMatch(/18jaar$/);
});

test('feedback: zonder tool-keuze wordt niets verstuurd en staat er een foutmelding', async ({ page }) => {
  await laad(page, 'feedback.html');
  const verstuurd = await opVerstuurd(page);
  await page.locator('.type-knop[data-waarde="fout"]').click();
  await page.fill('#omschrijving', 'Iets');
  await page.click('#verstuur-knop');
  await expect(page.locator('#melding.fout')).toBeVisible();
  await expect(page.locator('#melding')).toContainText('verplichte velden');
  expect(verstuurd.length).toBe(0);
});

test('feedback: Arabisch toont de vertaalde knopnamen en kiest met één tik', async ({ page }) => {
  await laad(page, 'feedback.html', { taal: 'AR' });
  await expect(knop(page, 'budgethulp')).toHaveText('مساعدة الميزانية');
  await knop(page, 'budgethulp').click();
  expect(await page.locator('#tool').inputValue()).toBe('budgethulp');
});

// ── 3. axe mét color-contrast ───────────────────────────────────────────────
for (const pagina of PAGES) {
  test(`axe (met color-contrast): geen serious/critical op ${pagina}`, async ({ page }) => {
    await laad(page, pagina);
    const r = await new AxeBuilder({ page }).analyze();
    const ernstig = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      .map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
    expect(ernstig).toEqual([]);
  });
}
