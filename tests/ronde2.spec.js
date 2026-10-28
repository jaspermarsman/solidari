// PLAN 14 — kleine ronde 2, na de overstap naar Sonnet.
const { test, expect } = require('@playwright/test');
const { metTaal, stubApi } = require('./helpers');

// ── R-2: Solidari.opmaak (B-2) ─────────────────────────────────────────────────────────────
// Eerst escapen, dan alleen **vet**, "- "/"• "-lijsten en alinea's. Geen links, geen HTML uit het model.
async function opmaak(page, tekst) {
  return page.evaluate((t) => window.Solidari.opmaak(t), tekst);
}

test.describe('Solidari.opmaak', () => {
  test.beforeEach(async ({ page }) => {
    await metTaal(page, 'NL');
    await page.goto('over.html');
    await page.waitForFunction(() => window.Solidari && typeof window.Solidari.opmaak === 'function');
  });

  test('**vet** wordt <strong>', async ({ page }) => {
    expect(await opmaak(page, 'Dit is **belangrijk** nu.')).toBe('<p>Dit is <strong>belangrijk</strong> nu.</p>');
  });

  test('regels met "- " of "• " worden een lijst', async ({ page }) => {
    const h = await opmaak(page, 'Doe dit:\n- **eerst** bellen\n• dan mailen\nKlaar.');
    expect(h).toBe('<p>Doe dit:</p><ul style="padding-inline-start:1.3em"><li><strong>eerst</strong> bellen</li><li>dan mailen</li></ul><p>Klaar.</p>');
  });

  test('een lege regel begint een nieuwe alinea; een enkele regelovergang wordt <br>', async ({ page }) => {
    const h = await opmaak(page, 'Een\ntwee\n\nDrie');
    expect(h).toBe('<p>Een<br>twee</p><span style="display:block;height:.6em" aria-hidden="true"></span><p>Drie</p>');
    expect(h).not.toContain('\n');
  });

  test('<script> en andere HTML blijven geëscaped', async ({ page }) => {
    const h = await opmaak(page, '<script>alert(1)</script> **<img src=x onerror=alert(1)>** "a" \'b\' & c');
    expect(h).not.toMatch(/<script|<img/);
    expect(h).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(h).toContain('<strong>&lt;img src=x onerror=alert(1)&gt;</strong>');
    expect(h).toContain('&quot;a&quot; &#39;b&#39; &amp; c');
    // In de DOM: geen element dat het model maakte.
    const n = await page.evaluate((html) => { const d = document.createElement('div'); d.innerHTML = html; return d.querySelectorAll('script, img').length; }, h);
    expect(n).toBe(0);
  });

  test('** zonder afsluiting blijft staan', async ({ page }) => {
    expect(await opmaak(page, 'Let op **dit')).toBe('<p>Let op **dit</p>');
    expect(await opmaak(page, '**a\nb**')).toBe('<p>**a<br>b**</p>');
  });

  test('geen links en geen koppen', async ({ page }) => {
    const h = await opmaak(page, '## Kop\nZie https://example.org of [x](https://example.org)');
    expect(h).not.toMatch(/<a |<h\d/);
    expect(h).toContain('## Kop');
  });

  test('RTL-tekst (AR en FA) blijft ongeschonden', async ({ page }) => {
    const ar = 'هذا **مهم جداً** للبلدية.\n- اتصل بـ Sociaal Wijkteam';
    const fa = 'این **خیلی مهم** است، لطفاً بپرسید؟';
    const h1 = await opmaak(page, ar);
    expect(h1).toBe('<p>هذا <strong>مهم جداً</strong> للبلدية.</p><ul style="padding-inline-start:1.3em"><li>اتصل بـ Sociaal Wijkteam</li></ul>');
    const tekst = (h) => page.evaluate((html) => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; }, h);
    expect(await tekst(await opmaak(page, fa))).toBe(fa.replace(/\*\*/g, ''));
  });
});

// ── R-2 in de pagina's: het AI-antwoord komt opgemaakt in de chat ─────────────────────────
const ANTWOORD = 'Kort: **ja**.\n\n- eerst bellen\n- <b>dan</b> mailen';

test('rechten: AI-antwoord met opmaak; de geschiedenis blijft platte tekst', async ({ page }) => {
  await metTaal(page, 'NL');
  let verzoek = null;
  await page.route(/\/api\/digi/, (r) => { verzoek = r.request().postDataJSON(); r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ tekst: ANTWOORD, bronnen: [] }) }); });
  await page.goto('rechten.html');
  await page.fill('#invoer', 'Mag ik werken naast mijn uitkering?');
  await page.click('#stuur-btn');
  const bel = page.locator('.bel-sol').filter({ hasText: 'eerst bellen' });
  await expect(bel.locator('strong')).toHaveText('ja');
  await expect(bel.locator('li')).toHaveCount(2);
  await expect(bel.locator('b')).toHaveCount(0);
  await expect(bel).toContainText('<b>dan</b> mailen');
  // Tweede vraag: de vorige AI-beurt gaat als de oorspronkelijke tekst mee, niet als HTML.
  await page.fill('#invoer', 'En dan?');
  await page.click('#stuur-btn');
  await expect.poll(() => verzoek && verzoek.berichten && verzoek.berichten.length).toBe(3);
  expect(verzoek.berichten[1]).toEqual({ role: 'assistant', content: ANTWOORD });
});

test('goedvoorbereid: AI-antwoord met opmaak', async ({ page }) => {
  await metTaal(page, 'NL');
  await stubApi(page, { tekst: ANTWOORD });
  await page.goto('goedvoorbereid.html');
  await page.evaluate(() => toonAIInvoer());
  await page.fill('#ai-invoer', 'Wat zeg ik tegen de huisarts?');
  await page.click('#ai-stuur');
  const bel = page.locator('.bel-sol').filter({ hasText: 'eerst bellen' });
  await expect(bel.locator('strong')).toHaveText('ja');
  await expect(bel.locator('li')).toHaveCount(2);
  await expect(bel.locator('b')).toHaveCount(0);
});

test('budgethulp: AI-analyse met opmaak, links blijven werken, geen HTML uit het model', async ({ page }) => {
  await metTaal(page, 'NL');
  const tekst = '**Bijzondere bijstand** via https://www.utrecht.nl/x?a=1&b=2 en <img src=x onerror="window.__xss=1">\n- **Voedselbank**\n- Kledingbank';
  await page.route(/\/api\/analyse/, (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ tekst }) }));
  await page.goto('budgethulp.html');
  await page.waitForFunction(() => typeof window.Solidari.opmaak === 'function');
  // Rechtstreeks de analyse aanroepen, met een klein verzonnen budget.
  await page.evaluate(() => roepAiAan('Utrecht'));
  const bel = page.locator('.bel-sol.ai-analyse').first();
  await expect(bel).toBeVisible();
  await expect(page.locator('.bel-sol.ai-analyse strong').first()).toHaveText('Bijzondere bijstand');
  await expect(page.locator('.bel-sol.ai-analyse li')).toHaveCount(2);
  await expect(page.locator('.bel-sol.ai-analyse a')).toHaveAttribute('href', 'https://www.utrecht.nl/x?a=1&b=2');
  await expect(page.locator('.bel-sol.ai-analyse img')).toHaveCount(0);
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
});
