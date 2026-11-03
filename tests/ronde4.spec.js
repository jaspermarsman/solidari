// PLAN 18 — kleine ronde 4: uploadknoppen boven het bestandsveld (K-1), het uploadvlak in alle talen (K-2).
const { test, expect } = require('@playwright/test');
const { metTaal, stubApi } = require('./helpers');

// Nagebootste stem, zoals in overal.spec.js. Alles wat gezegd wordt komt in window.__spoken.
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

async function laad(page, pagina, { taal = 'NL', stand = 'uit' } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((st) => { try { localStorage.setItem('solidari-voorlezen', st); } catch (e) {} }, stand);
  await page.addInitScript(STUB);
  await stubApi(page, { tekst: 'Testantwoord.', bronnen: [] });
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak && window.Solidari.i18n);
  await page.waitForTimeout(800);   // knoppen geplaatst
  await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
}
const gezegdSamen = (page) => page.evaluate(() => window.__spoken.join(' '));
const KNOPPEN = { camera: '#camera-knop', bestand: '#dropzone .upload-knop:not(#camera-knop)' };

// ── Fase 1: de uploadknoppen liggen boven het onzichtbare bestandsveld (K-1, B-2) ─────────────
test.describe('K-1 uploadknoppen boven het bestandsveld', () => {
  for (const breedte of [375, 1280]) {
    for (const taal of ['NL', 'AR']) {
      test(`${breedte} px, ${taal}: een tik op het midden van elke knop raakt de knop zelf`, async ({ page }) => {
        await page.setViewportSize({ width: breedte, height: 800 });
        await laad(page, 'brief.html', { taal });
        const r = await page.evaluate((knoppen) => Object.fromEntries(Object.entries(knoppen).map(([naam, sel]) => {
          const knop = document.querySelector(sel);
          knop.scrollIntoView({ block: 'center', behavior: 'instant' });
          const b = knop.getBoundingClientRect();
          const raak = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2);
          return [naam, raak && raak.closest(sel) === knop ? 'knop' : (raak ? raak.id || raak.className : 'niets')];
        })), KNOPPEN);
        expect(r).toEqual({ camera: 'knop', bestand: 'knop' });
      });
    }
  }

  test('stand uit: "Maak een foto" opent de camera, "Kies bestand" de bestanden', async ({ page }) => {
    await laad(page, 'brief.html');
    for (const [naam, id] of [['camera', 'camera-input'], ['bestand', 'bestand-input']]) {
      const [kiezer] = await Promise.all([page.waitForEvent('filechooser'), page.locator(KNOPPEN[naam]).click()]);
      expect(await kiezer.element().evaluate((el) => el.id), naam).toBe(id);
    }
    // De camera-invoer vraagt om de camera aan de achterkant.
    expect(await page.locator('#camera-input').getAttribute('capture')).toBe('environment');
  });

  test('stand aan: "Kies bestand" leest eerst en opent niets, de tweede tik opent de bestanden', async ({ page }) => {
    await laad(page, 'brief.html', { stand: 'aan' });
    let kiezers = 0;
    page.on('filechooser', () => { kiezers++; });
    const knop = page.locator(KNOPPEN.bestand);
    await knop.click();
    await expect.poll(() => gezegdSamen(page)).toContain('Kies bestand');
    await page.waitForTimeout(300);
    expect(kiezers).toBe(0);
    const [kiezer] = await Promise.all([page.waitForEvent('filechooser'), knop.click()]);
    expect(await kiezer.element().evaluate((el) => el.id)).toBe('bestand-input');
  });

  test('een tik op een lege plek van het vlak opent nog steeds de bestanden', async ({ page }) => {
    await laad(page, 'brief.html');
    const [kiezer] = await Promise.all([page.waitForEvent('filechooser'), page.locator('#dropzone').click({ position: { x: 20, y: 20 } })]);
    expect(await kiezer.element().evaluate((el) => el.id)).toBe('bestand-input');
  });

  test('slepen op het vlak werkt nog', async ({ page }) => {
    await laad(page, 'brief.html');
    const naam = await page.evaluate(() => {
      const vlak = document.getElementById('dropzone');
      const b = vlak.getBoundingClientRect();
      vlak.scrollIntoView({ block: 'center', behavior: 'instant' });
      const doel = document.elementFromPoint(b.x + 20, vlak.getBoundingClientRect().y + 20);
      const dt = new DataTransfer();
      dt.items.add(new File(['test'], 'testbrief.png', { type: 'image/png' }));
      doel.dispatchEvent(new DragEvent('dragover', { dataTransfer: dt, bubbles: true, cancelable: true }));
      doel.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true, cancelable: true }));
      return document.getElementById('bestandsnaam').textContent;
    });
    expect(naam).toBe('testbrief.png');
    await expect(page.locator('#bestand-preview')).toHaveClass(/zichtbaar/);
  });
});

// ── Fase 2: het uploadvlak in alle talen (K-2, B-3) ──────────────────────────────────────────
// TI krijgt bewust de Nederlandse tekst naast het pictogram, tot een TI-spreker meekijkt (B-3, S-9).
const K2 = {
  NL: ['Kies bestand', 'JPG, PNG, HEIC of PDF · Maximaal 10 MB'],
  EN: ['Choose file', 'JPG, PNG, HEIC or PDF · Maximum 10 MB'],
  AR: ['اختر ملفًا', 'JPG أو PNG أو HEIC أو PDF · الحد الأقصى 10 ميغابايت'],
  TR: ['Dosya seç', 'JPG, PNG, HEIC veya PDF · En fazla 10 MB'],
  TI: ['Kies bestand', 'JPG, PNG, HEIC of PDF · Maximaal 10 MB'],
  UK: ['Виберіть файл', 'JPG, PNG, HEIC або PDF · Максимум 10 МБ'],
  FA: ['فایل را انتخاب کنید', 'JPG، PNG، HEIC یا PDF · حداکثر 10 مگابایت'],
  RO: ['Alege un fișier', 'JPG, PNG, HEIC sau PDF · Maximum 10 MB'],
  PL: ['Wybierz plik', 'JPG, PNG, HEIC lub PDF · Maksymalnie 10 MB'],
};
const zichtbaar = (page, sel) => page.locator(sel).evaluate((el) => window.Solidari.spraak.leesTekst(el));

test.describe('K-2 uploadvlak in alle talen', () => {
  for (const [taal, [kies, formaten]] of Object.entries(K2)) {
    test(`${taal}: "Kies bestand" en de formaten staan in de taal, met het pictogram`, async ({ page }) => {
      await laad(page, 'brief.html', { taal });
      const r = await page.evaluate(() => ({
        knop: document.querySelector('#dropzone .upload-knop:not(#camera-knop)').textContent.replace(/\s+/g, ' ').trim(),
        formaten: document.querySelector('[data-i18n="upload-formaten"]').textContent.trim(),
      }));
      expect(r.knop).toBe('📂 ' + kies);
      expect(r.formaten).toBe(formaten);
    });
  }

  test('stand aan, EN: de knop en het knopje bij de formaten lezen de Engelse tekst', async ({ page }) => {
    await laad(page, 'brief.html', { taal: 'EN', stand: 'aan' });
    await page.locator(KNOPPEN.bestand).click();
    await expect.poll(() => gezegdSamen(page)).toContain('Choose file');
    await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    expect(await zichtbaar(page, '.upload-formaten')).toBe(K2.EN[1]);
    await page.locator('.upload-formaten > .sol-a11y-knop').click();
    await expect.poll(() => gezegdSamen(page)).toBe(K2.EN[1]);
  });

  test('taalwissel EN → TI → AR: de teksten volgen; het knopje bij de formaten komt terug (TI heeft geen stem, S-7)', async ({ page }) => {
    await laad(page, 'brief.html', { taal: 'EN', stand: 'aan' });
    for (const taal of ['TI', 'AR']) {
      await page.evaluate((t) => window.Solidari.i18n.passToe(t), taal);
      await page.waitForTimeout(300);
      const r = await page.evaluate(() => ({
        kies: document.querySelector('[data-i18n="upload-kies-bestand"]').textContent,
        formaten: document.querySelector('[data-i18n="upload-formaten"]').textContent,
        knopjes: document.querySelectorAll('.upload-formaten > .sol-a11y-knop').length,
      }));
      expect(r, taal).toEqual({ kies: K2[taal][0], formaten: K2[taal][1], knopjes: taal === 'TI' ? 0 : 1 });
    }
  });
});
