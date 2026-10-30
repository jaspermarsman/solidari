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
// De stem krijgt zin voor zin (splitsZinnen); samen is dat de tekst die voorgelezen werd.
const gezegdSamen = (page) => page.evaluate(() => window.__spoken.join(' '));
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

// ── Fase 2: koppen, cijfervakjes en checklist (V-3, V-4, V-5) ──────────────────────────────
const lees = (loc) => loc.evaluate((el) => window.Solidari.spraak.leesTekst(el));

test.describe('V-3 koppen', () => {
  test('index.html: de koppen hebben een knopje in de voorleesstand, ook als ze kort zijn', async ({ page }) => {
    await laad(page, 'index.html');
    const zonder = await page.evaluate(() => [...document.querySelectorAll('h1, h2, h3, h4, [data-lees-rol]')]
      .filter((el) => !el.closest('nav, footer, a, button, [data-geen-lees]') && el.textContent.trim())
      .filter((el) => !el.querySelector(':scope > .sol-a11y-knop'))
      .map((el) => el.textContent.trim().slice(0, 40)));
    expect(zonder).toEqual([]);
    const titel = page.locator('h2.missie-titel');
    await expect(titel.locator('.sol-a11y-knop')).toHaveCount(1);
    expect(await lees(titel)).toBe('Duidelijke informatie in gewone taal.');
  });

  test('"ONZE AANPAK" wordt gelezen als "Onze aanpak", ook via het knopje', async ({ page }) => {
    await laad(page, 'index.html');
    const label = page.locator('.sectie-label[data-i18n="missie-label"]');
    expect(await label.evaluate((el) => el.innerText.replace('🔊', '').trim())).toBe('ONZE AANPAK');   // CSS-hoofdletters
    expect(await lees(label)).toBe('Onze aanpak');
    await label.locator('.sol-a11y-knop').evaluate((b) => b.click());
    await page.waitForTimeout(150);
    expect(await gezegd(page)).toBe('Onze aanpak');
  });
});

test.describe('V-4 cijfervakjes', () => {
  const VERWACHT = {
    NL: ['7 Gratis tools', '9 Ondersteunde talen', '0 Opgeslagen gegevens', 'Energiebron'],
    EN: ['7 Free tools', '9 Supported languages', '0 Stored data', 'Energy source'],
    AR: ['7 أدوات مجانية', '9 لغات مدعومة', '0 بيانات مخزنة', 'مصدر الطاقة'],
  };
  for (const [taal, verwacht] of Object.entries(VERWACHT)) {
    test(`index.html ${taal}: elk vakje is één blok met getal en label`, async ({ page }) => {
      await laad(page, 'index.html', { taal });
      const vakjes = page.locator('.stat-item');
      await expect(vakjes).toHaveCount(4);
      for (let i = 0; i < 4; i++) {
        await expect(vakjes.nth(i).locator(':scope > .sol-a11y-knop')).toHaveCount(1);
        expect(await lees(vakjes.nth(i))).toBe(verwacht[i]);
      }
      await vakjes.first().locator('.sol-a11y-knop').evaluate((b) => b.click());
      await page.waitForTimeout(150);
      expect(await gezegd(page)).toBe(verwacht[0]);
    });
  }

  test('na een taalwissel leest het vakje in de nieuwe taal', async ({ page }) => {
    await laad(page, 'index.html');
    // In de voorleesstand kiest een taalknop met twee tikken.
    await page.evaluate(() => { const b = document.querySelector('#solidari-nav-bar .taal-btn[data-taal="EN"]'); b.click(); b.click(); });
    await page.waitForTimeout(600);
    await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    const vak = page.locator('.stat-item').first();
    await vak.locator(':scope > .sol-a11y-knop').evaluate((b) => b.click());
    await page.waitForTimeout(150);
    expect(await gezegd(page)).toBe('7 Free tools');
  });
});

test.describe('V-5 checklist', () => {
  test('18jaar.html: de titel zegt "Checklist: …", elke regel zegt zijn stand, en die verandert na aanvinken', async ({ page }) => {
    await laad(page, '18jaar.html');
    const titel = page.locator('.checklist-titel');
    await expect(titel.locator('.sol-a11y-knop')).toHaveCount(1);
    expect(await lees(titel)).toBe('Checklist: klik aan wat je hebt geregeld');

    const regel = page.locator('.checklist-item').first();
    await expect(regel.locator(':scope > .sol-a11y-knop')).toHaveCount(1);
    const tekst = (await regel.locator('.checklist-tekst').textContent()).trim();
    const sub = (await regel.locator('.checklist-sub').textContent()).trim();
    const voor = await lees(regel);
    expect(voor.startsWith(tekst.replace(/\.$/, ''))).toBe(true);
    expect(voor).toContain(sub.replace(/[.\s]+$/, ''));
    expect(voor).toMatch(/\. Nog niet gedaan$/);
    expect(voor).not.toMatch(/\.\./);

    // Het 🔊-knopje leest de stand van nu.
    await regel.locator('.check-box').evaluate((b) => b.click());   // aanvinken (één tik, geen twee tikken)
    await expect(regel).toHaveClass(/gedaan/);
    await page.waitForTimeout(150);
    await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    await regel.locator(':scope > .sol-a11y-knop').evaluate((b) => b.click());
    await page.waitForTimeout(250);
    expect(await gezegdSamen(page)).toBe(await lees(regel));
    expect(await gezegdSamen(page)).toMatch(/\. Afgevinkt$/);
  });

  test('18jaar.html: één tik op de regel vinkt aan en zegt meteen de nieuwe stand', async ({ page }) => {
    await laad(page, '18jaar.html');
    const regel = page.locator('.checklist-item').nth(1);
    await regel.locator('.checklist-tekst').scrollIntoViewIfNeeded();
    await regel.locator('.checklist-tekst').click();
    await expect(regel).toHaveClass(/gedaan/);
    await page.waitForTimeout(250);
    expect(await gezegdSamen(page)).toMatch(/\. Afgevinkt$/);
    await page.evaluate(() => { window.__spoken = []; });
    await regel.locator('.checklist-tekst').click();
    await expect(regel).not.toHaveClass(/gedaan/);
    await page.waitForTimeout(250);
    expect(await gezegdSamen(page)).toMatch(/\. Nog niet gedaan$/);
  });

  test('18jaar.html EN: de checklist in het Engels', async ({ page }) => {
    await laad(page, '18jaar.html', { taal: 'EN' });
    expect(await lees(page.locator('.checklist-titel'))).toBe('Checklist: tick off what you have arranged');
    expect(await lees(page.locator('.checklist-item').first())).toMatch(/\. Not done yet$/);
  });
});
