// PLAN 17 — voorlezen overal: div-koppen en -tekst (P-1), links en kaarten (P-2, B-3), labels (P-3).
const { test, expect } = require('@playwright/test');
const { metTaal, stubApi } = require('./helpers');

// Nagebootste stem, zoals in voorlezen.spec.js. Alles wat gezegd wordt komt in window.__spoken.
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
  await page.waitForTimeout(800);   // knoppen geplaatst
  await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
}
// De stem krijgt zin voor zin (splitsZinnen); samen is dat de tekst die voorgelezen werd.
const gezegdSamen = (page) => page.evaluate(() => window.__spoken.join(' '));
const wis = (page) => page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
const EMOJI = /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u;

// ── Fase 2: koppen en tekst als div (P-1) ───────────────────────────────────────────────────
// Per pagina de elementen uit §1 (P-1). Elk element moet in de voorleesstand een knopje hebben.
const P1 = {
  'index.html': ['.zon-cloud-titel', '.zon-cloud-sub', '.over-kenmerk'],
  'brief.html': ['.upload-titel', '.upload-sub', '.upload-formaten', '.context-titel', '.context-sub',
    '.tips-titel', '.tip-item', '#privacy-titel', '#privacy-tekst'],
  'naturalisatie.html': ['.header-badge', '.vraag-stap'],
  '18jaar.html': ['.header-badge', '.leeftijd-label', '.fase-intro-tekst', '.disclaimer'],
  'over.html': ['.hero-label', '.sectie-label', '.principe-titel', '.arch-laag-naam', '.arch-laag-detail',
    '.arch-uitleg-titel', '.privacy-kaart-titel'],
  'feedback.html': ['.privacynoot'],
  'vertaalhulp.html': ['.uitleg'],
};

test.describe('P-1 div-koppen en -tekst', () => {
  for (const [pagina, sels] of Object.entries(P1)) {
    test(`${pagina}: elk element heeft een knopje en wordt gelezen, zonder emoji`, async ({ page }) => {
      await laad(page, pagina);
      const r = await page.evaluate((sels) => {
        const S = window.Solidari.spraak;
        return sels.map((sel) => {
          const els = [...document.querySelectorAll(sel)].filter((el) => el.getClientRects().length > 0);
          return {
            sel, aantal: els.length,
            zonder: els.filter((el) => !el.matches('[data-lees]') || !el.querySelector(':scope > .sol-a11y-knop')).map((el) => el.textContent.trim().slice(0, 30)),
            teksten: els.map((el) => S.leesTekst(el)),
          };
        });
      }, sels);
      for (const x of r) {
        expect(x.aantal, x.sel).toBeGreaterThan(0);
        expect(x.zonder, x.sel).toEqual([]);
        for (const t of x.teksten) {
          expect(t.length, x.sel).toBeGreaterThan(2);
          expect(t, x.sel).not.toMatch(EMOJI);
        }
      }
      // Echt tikken: het knopje van het eerste element van elke soort leest zijn tekst voor.
      for (const x of r) {
        await wis(page);
        await page.locator(`${x.sel} > .sol-a11y-knop`).first().evaluate((b) => b.click());
        await expect.poll(() => gezegdSamen(page), { message: x.sel }).toBe(x.teksten[0]);
      }
      expect(page.url()).toContain(pagina);   // een knopje navigeert nooit
    });
  }

  test('koppen in hoofdletters klinken normaal', async ({ page }) => {
    await laad(page, 'over.html');
    const r = await page.evaluate(() => [...document.querySelectorAll('.hero-label, .sectie-label')]
      .filter((el) => getComputedStyle(el).textTransform === 'uppercase')
      .map((el) => ({ zien: window.Solidari.spraak.zonderEmoji(el.innerText), lees: window.Solidari.spraak.leesTekst(el) })));
    expect(r.length).toBeGreaterThan(0);
    for (const { zien, lees } of r) {
      expect(zien).toBe(zien.toUpperCase());
      expect(lees).not.toBe(lees.toUpperCase());
      expect(lees.toUpperCase()).toBe(zien);
    }
    expect(r.map((x) => x.lees)).toContain('Achtergrond');
  });

  for (const pagina of Object.keys(P1)) {
    test(`${pagina}: geen dubbel lezen (geen knopje in een blok dat zelf een knopje heeft)`, async ({ page }) => {
      await laad(page, pagina);
      const dubbel = await page.evaluate(() => [...document.querySelectorAll('[data-lees]')]
        .filter((el) => el.querySelector(':scope > .sol-a11y-knop'))
        .filter((el) => { const p = el.parentElement.closest('[data-lees]'); return p && p.querySelector(':scope > .sol-a11y-knop'); })
        .map((el) => el.className + ': ' + el.textContent.trim().slice(0, 30)));
      expect(dubbel).toEqual([]);
    });
  }

  test('stand uit: de nieuwe blokken hebben geen zichtbaar knopje en lezen niets', async ({ page }) => {
    await laad(page, 'over.html', { stand: 'uit' });
    expect(await page.locator('.sectie-label > .sol-a11y-knop').count()).toBeGreaterThan(0);
    expect(await page.locator('.sol-a11y-knop:visible').count()).toBe(0);
    await page.locator('.sectie-label').first().click();
    await page.waitForTimeout(150);
    expect(await gezegdSamen(page)).toBe('');
  });
});
