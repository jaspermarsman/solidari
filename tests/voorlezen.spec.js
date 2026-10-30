// PLAN 16 — voorlezen, rustiger en vollediger (V-1 t/m V-5).
const { test, expect } = require('@playwright/test');
const { PAGES, metTaal, stubApi } = require('./helpers');

// Nagebootste stem, zoals in ronde3.spec.js. Alles wat gezegd wordt komt in window.__spoken.
const STUB = () => {
  const V = ['nl-NL', 'en-GB', 'ar-SA', 'pl-PL', 'uk-UA', 'tr-TR', 'fa-IR', 'ro-RO'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
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
  await page.waitForTimeout(800);   // knoppen geplaatst; chatpagina's lezen hun eerste ballon vanzelf
  await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
}
const gezegd = (page) => page.evaluate(() => window.__spoken.join(' | '));
const EMOJI = /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u;

// ── Fase 1: geen "luidspreker" meer (V-2, B-7) ─────────────────────────────────────────────
test.describe('V-2 tekst zonder knopjes en emoji', () => {
  for (const pagina of PAGES) {
    test(`${pagina}: geen voorgelezen tekst bevat een emoji of een knopje`, async ({ page }) => {
      await laad(page, pagina);
      const r = await page.evaluate(() => {
        const S = window.Solidari.spraak;
        const blokken = [...document.querySelectorAll('[data-lees]')];
        const fout = blokken.map((el) => S.leesTekst(el)).filter((t) => /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u.test(t));
        return { aantal: blokken.length, knoppen: document.querySelectorAll('.sol-a11y-knop').length, fout };
      });
      expect(r.fout).toEqual([]);
      // Echt tikken: de eerste paar 🔊-knopjes en blokken lezen geen emoji voor.
      const knoppen = page.locator('.sol-a11y-knop:visible');
      const n = Math.min(await knoppen.count(), 4);
      for (let i = 0; i < n; i++) {
        await knoppen.nth(i).evaluate((b) => b.click());   // een vaste balk kan ervoor liggen
        await page.waitForTimeout(120);
      }
      const tekst = await gezegd(page);
      if (n) expect(tekst.length).toBeGreaterThan(0);
      expect(tekst).not.toMatch(EMOJI);
      expect(tekst.toLowerCase()).not.toContain('luidspreker');
    });
  }

  test('een tik op een blok in de voorleesstand leest de tekst zonder 🔊', async ({ page }) => {
    await laad(page, 'index.html');
    const blok = page.locator('p[data-lees]:has(> .sol-a11y-knop)').first();
    await blok.click({ position: { x: 5, y: 5 } });
    await page.waitForTimeout(200);
    const tekst = await gezegd(page);
    expect(tekst.length).toBeGreaterThan(20);
    expect(tekst).not.toMatch(EMOJI);
  });

  test('leesTekst slaat knopjes, microfoon en aria-hidden over', async ({ page }) => {
    await laad(page, 'index.html');
    const t = await page.evaluate(() => {
      const p = document.createElement('p');
      p.innerHTML = 'Hallo <span aria-hidden="true">👋</span>wereld<button class="sol-a11y-knop">🔊</button><button class="sol-a11y-mic">🎤 Spreek</button> ✅ klaar';
      return window.Solidari.spraak.leesTekst(p);
    });
    expect(t).toBe('Hallo wereld klaar');
  });
});
