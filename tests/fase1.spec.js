// Fase 1 — acceptatietest voor spraak.js (gelaagde motor).
const { test, expect } = require('@playwright/test');
const { PAGES, TALEN, metTaal } = require('./helpers');

// Injecteert stubs vóór het laden: speechSynthesis + fetch(manifest).
const STUB = () => {
  window.__spoken = [];
  window.__cancelled = 0;
  window.__voices = [];
  window.__manifest = null;
  function Utter(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  // speechSynthesis en SpeechSynthesisUtterance zijn read-only accessors op Window;
  // overschrijven kan alleen via defineProperty (gewone toewijzing faalt stil).
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: Utter });
  const stubSynth = {
    getVoices: () => window.__voices || [],
    speak: (u) => { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => { window.__cancelled++; },
    pause: () => {}, resume: () => {},
    get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => stubSynth });
  const echt = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = (url, ...rest) => {
    if (String(url).includes('manifest-')) {
      return Promise.resolve({ ok: window.__manifest != null, json: () => Promise.resolve(window.__manifest) });
    }
    return echt ? echt(url, ...rest) : Promise.reject(new Error('geen fetch'));
  };
};

async function laad(page, pagina) {
  await page.addInitScript(STUB);
  await page.goto('/' + pagina, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
}

test('Solidari.spraak bestaat op alle 11 paginas + 0 console-errors op 11×9', async ({ page }) => {
  const fouten = [];
  page.on('pageerror', e => fouten.push(String(e.message)));
  page.on('console', m => { if (m.type() === 'error') fouten.push(`${m.text()}`); });
  for (const pagina of PAGES) {
    for (const taal of TALEN) {
      await metTaal(page, taal);
      await laad(page, pagina);
      const heeft = await page.evaluate(() => !!(window.Solidari && window.Solidari.spraak && typeof Solidari.spraak.zeg === 'function'));
      expect(heeft, `${pagina} [${taal}] mist Solidari.spraak`).toBe(true);
    }
  }
  // filter bekende lokaal-serveren-artefacten (backend-fetch, 404s uit nulmeting)
  const echt = fouten.filter(f => !/api\.solidari\.nl|Failed to load resource|status of 404|CORS|Access to fetch/.test(f));
  expect(echt, 'onverwachte console-errors: ' + echt.join(' | ')).toEqual([]);
});

test('D-19 laagkeuze: mms→stem-eerst, gemini→bestand-eerst, TI→bestand-eerst', async ({ page }) => {
  await laad(page, 'index.html');

  // A. NL, mms + bestand aanwezig + nl-stem → 'stem'
  let laag = await page.evaluate(async () => {
    window.__voices = [{ lang: 'nl-NL', name: 'NL', localService: true }];
    const s = Solidari.spraak, txt = 'Hallo wereld.';
    const h = await s._hashVan(s._normaliseer(txt));
    window.__manifest = { bron: 'mms', items: { [h]: { d: 1 } } };
    return s._kiesLaag(txt, 'NL');
  });
  expect(laag).toBe('stem');

  // B. EN, gemini + bestand aanwezig + en-stem → 'bestand' (verse taal, één aanroep)
  laag = await page.evaluate(async () => {
    window.__voices = [{ lang: 'en-GB', name: 'EN', localService: true }];
    const s = Solidari.spraak, txt = 'Text two.';
    const h = await s._hashVan(s._normaliseer(txt));
    window.__manifest = { bron: 'gemini', items: { [h]: { d: 1 } } };
    return s._kiesLaag(txt, 'EN');
  });
  expect(laag).toBe('bestand');

  // C. TI, mms + bestand aanwezig, geen stem → 'bestand' (altijd bestand-eerst)
  laag = await page.evaluate(async () => {
    window.__voices = [];
    const s = Solidari.spraak, txt = 'ሰላም ዓለም።';
    const h = await s._hashVan(s._normaliseer(txt));
    window.__manifest = { bron: 'mms', items: { [h]: { d: 1 } } };
    return s._kiesLaag(txt, 'TI');
  });
  expect(laag).toBe('bestand');
});

test('stemVoor(UK) is null bij alleen ru-RU (nooit terugval op Russisch)', async ({ page }) => {
  await laad(page, 'index.html');
  const stem = await page.evaluate(() => {
    window.__voices = [{ lang: 'ru-RU', name: 'RU', localService: true }];
    return Solidari.spraak.stemVoor('UK');
  });
  expect(stem).toBeNull();
});

test('splitsZinnen kent ؟ en ።', async ({ page }) => {
  await laad(page, 'index.html');
  const res = await page.evaluate(() => ({
    ar: Solidari.spraak.splitsZinnen('مرحبا؟ كيف حالك؟').length,
    ti: Solidari.spraak.splitsZinnen('ሰላም። ከመይ ኣለኻ።').length,
  }));
  expect(res.ar).toBe(2);
  expect(res.ti).toBe(2);
});

test('zeg() splitst en speelt sequentieel; tweede zeg() annuleert', async ({ page }) => {
  await laad(page, 'index.html');
  const res = await page.evaluate(async () => {
    window.__voices = [{ lang: 'nl-NL', name: 'NL', localService: true }];
    window.__manifest = { bron: 'mms', items: {} }; // geen bestand → laag 2 (stem)
    const s = Solidari.spraak;
    await s.zeg('Een. Twee. Drie.', { taal: 'NL' });
    await new Promise(r => setTimeout(r, 120));
    const naEerste = window.__spoken.length;
    const cancelVoor = window.__cancelled;
    await s.zeg('Vier. Vijf.', { taal: 'NL' });
    await new Promise(r => setTimeout(r, 120));
    return { naEerste, cancelNaTweede: window.__cancelled - cancelVoor };
  });
  expect(res.naEerste).toBe(3);        // drie zinnen sequentieel
  expect(res.cancelNaTweede).toBeGreaterThanOrEqual(1); // tweede zeg riep stop→cancel
});
