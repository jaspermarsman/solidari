// Voorlezen op mobiel + de voorlezen-schakelaar in de nav (30-09-2026).
// Bug: op mobiel verscheen geen enkele voorleesknop, en de schakelaar in de nav
// leek niets te doen (hij zette stil de tik-om-te-lezen-modus aan).
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');

// Stub met instelbaar gedrag: stemmen pas laat beschikbaar, zonder voiceschanged-event
// (zoals iOS-Safari), en eventueel met Android-notatie 'nl_NL'.
const STUB = (opt) => {
  const VOICES = opt.geen ? [] : [{ lang: opt.lang || 'nl-NL', name: 'NL', localService: true, default: false }];
  const start = Date.now();
  window.__spoken = [];
  function Utter(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: Utter });
  const synth = {
    getVoices: () => (Date.now() - start < (opt.laat || 0) ? [] : VOICES),
    speak: (u) => { if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
    // géén addEventListener en géén voiceschanged: het event komt op iOS vaak nooit
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => synth });
};

async function laad(page, opt) {
  await metTaal(page, 'NL');
  await page.addInitScript((o) => { try { localStorage.removeItem('solidari-voorlezen'); } catch (e) {} }, {});
  await page.addInitScript(STUB, opt);
  await page.goto('/over.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
}

test('stemmen die pas laat komen (zonder voiceschanged) leveren alsnog knoppen op', async ({ page }) => {
  await laad(page, { laat: 1500 });
  await page.waitForTimeout(400);
  expect(await page.locator('.sol-a11y-knop').count()).toBe(0);
  await page.waitForTimeout(2500);
  expect(await page.locator('.sol-a11y-knop').count()).toBeGreaterThan(0);
});

test("Android-notatie 'nl_NL' wordt herkend als Nederlandse stem", async ({ page }) => {
  await laad(page, { lang: 'nl_NL' });
  await page.waitForTimeout(800);
  expect(await page.locator('.sol-a11y-knop').count()).toBeGreaterThan(0);
});

test('schakelaar aan: zegt hardop en in beeld wat hij doet', async ({ page }) => {
  await laad(page, {});
  await page.waitForTimeout(600);
  await page.locator('.sol-a11y-luister-toggle').click();
  const melding = page.locator('.sol-a11y-melding');
  await expect(melding).toBeVisible();
  await expect(melding).toContainText('Tik op een tekst');
  await page.waitForTimeout(300);
  const gezegd = await page.evaluate(() => window.__spoken.join(' '));
  expect(gezegd).toContain('Voorlezen staat aan');
  expect(await page.locator('.sol-a11y-luister-toggle').getAttribute('aria-pressed')).toBe('true');
  // en tikken op een tekstblok leest dat blok voor
  await page.evaluate(() => { window.__spoken = []; });
  await page.locator('[data-lees]').first().click();
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.__spoken.length)).toBeGreaterThan(0);
});

test('schakelaar op een toestel zonder stem: eerlijke melding, geen stilte', async ({ page }) => {
  await laad(page, { geen: true });
  await page.waitForTimeout(600);
  await page.locator('.sol-a11y-luister-toggle').click();
  await expect(page.locator('.sol-a11y-melding')).toContainText('geen voorleesstem');
  // en de schakelaar gaat dan níét aan (geen groene knop waar niets uit komt)
  expect(await page.locator('.sol-a11y-luister-toggle').getAttribute('aria-pressed')).toBe('false');
});
