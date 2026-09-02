// Regressietest voor de dubbele 🔊-knop (W-A, 02-09-2026).
//
// Oorzaak: scan() in spraak.js is async. Tussen de controle `if (el.dataset.solA11yKlaar)`
// en het toevoegen van de knop zat een `await kanLeveren(...)`. init() start één scan en het
// voiceschanged-event start er direct daarna nóg een zodra de browserstemmen geladen zijn —
// die twee kwamen allebei door de controle heen en zetten allebei een knop neer. Op elke
// alinea stonden er dus twee.
//
// Deze test bewaakt drie dingen: de gewone pagina-lading, twee expliciet gelijktijdige scans,
// en dynamisch bijgerenderde inhoud (MutationObserver-pad).
//
// Draaien: cd tests && npx playwright test voorleesknop-uniek.spec.js
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');

// Headless Chromium heeft geen browserstemmen, dus zonder stub verschijnt er geen enkele
// knop en toetst de test niets. Deze stub is die van fase3.spec.js plus één ding: hij vuurt
// `voiceschanged` kort ná het laden, precies zoals een echte browser. Dat is de trigger die
// de tweede scan startte terwijl de eerste nog liep — de oorzaak van de dubbele knop.
const STUB_STEMMEN = () => {
  const VOICES = [
    ['nl-NL', 'NL'], ['en-GB', 'EN'], ['ar-SA', 'AR'], ['tr-TR', 'TR'],
    ['uk-UA', 'UK'], ['fa-IR', 'FA'], ['ro-RO', 'RO'], ['pl-PL', 'PL'],
  ].map(([lang, name]) => ({ lang, name, localService: true, default: false }));
  function Utter(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: Utter });
  const luisteraars = [];
  let beschikbaar = [];
  const synth = {
    getVoices: () => beschikbaar,
    speak: (u) => { setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
    addEventListener: (naam, fn) => { if (naam === 'voiceschanged') luisteraars.push(fn); },
    removeEventListener: () => {},
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => synth });
  // Stemmen komen ná de start van de eerste scan binnen — net als in een echte browser.
  // Twee keer vuren dekt beide kanten van het tijdvenster af.
  setTimeout(() => { beschikbaar = VOICES; luisteraars.forEach(fn => fn()); }, 0);
  setTimeout(() => { luisteraars.forEach(fn => fn()); }, 150);
};

// NL: er is een Nederlandse browserstem, dus elk voorleesbaar blok hoort een knop te krijgen.
const PAGINAS = ['over.html', 'brief.html', 'index.html', 'rechten.html'];

// De manifest-fetch is de await waarin een tweede scan naar binnen kon glippen. Lokaal
// duurt die 0 ms, op het echte web niet. Zonder deze vertraging is het tijdvenster te
// klein en toetst de paginatest de regressie niet.
async function vertraagManifest(page) {
  await page.route('**/audio/manifest-*.json', async (route) => {
    await new Promise(r => setTimeout(r, 250));
    await route.continue();
  });
}

async function knoppenPerElement(page) {
  return page.evaluate(() => {
    const uit = { max: 0, elementen: 0, metKnop: 0, dubbel: [] };
    for (const el of document.querySelectorAll('[data-lees]')) {
      const n = el.querySelectorAll(':scope > .sol-a11y-knop').length;
      uit.elementen++;
      if (n > 0) uit.metKnop++;
      if (n > uit.max) uit.max = n;
      if (n > 1) uit.dubbel.push({ n, tekst: (el.textContent || '').trim().slice(0, 60) });
    }
    return uit;
  });
}

test.describe('voorleesknop: precies één per blok', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  for (const pagina of PAGINAS) {
    test(`${pagina} — geen enkel blok krijgt twee knoppen`, async ({ page }) => {
      await metTaal(page, 'NL');
      await page.addInitScript(STUB_STEMMEN);
      await page.addInitScript(() => {
        try { localStorage.setItem('solidari-voorlezen', 'aan'); } catch (e) {}
      });
      await vertraagManifest(page);
      await page.goto('/' + pagina);
      await page.waitForFunction(
        () => document.querySelectorAll('.sol-a11y-knop').length > 0,
        null, { timeout: 15000 },
      );
      // de voiceschanged-rescan en de MutationObserver (200 ms) hun gang laten gaan
      await page.waitForTimeout(1500);

      const r = await knoppenPerElement(page);
      expect(r.metKnop, `${pagina}: geen enkel blok kreeg een voorleesknop`).toBeGreaterThan(0);
      expect(r.dubbel, `${pagina}: blokken met meer dan één knop`).toEqual([]);
      expect(r.max).toBe(1);
    });
  }

  test('twee gelijktijdige scans leveren samen één knop op', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.addInitScript(STUB_STEMMEN);
    await page.addInitScript(() => {
      try { localStorage.setItem('solidari-voorlezen', 'aan'); } catch (e) {}
    });
    await page.goto('/over.html');
    await page.waitForFunction(() => window.Solidari && window.Solidari.spraak, null, { timeout: 15000 });
    await page.waitForTimeout(1200);

    const n = await page.evaluate(async () => {
      const el = document.querySelector('[data-lees]');
      el.querySelectorAll(':scope > .sol-a11y-knop').forEach(b => b.remove());
      delete el.dataset.solA11yKlaar;
      // precies wat init() en het voiceschanged-event samen deden
      await Promise.all([Solidari.spraak.scan(document), Solidari.spraak.scan(document)]);
      return el.querySelectorAll(':scope > .sol-a11y-knop').length;
    });
    expect(n).toBe(1);
  });

  test('na een taalwissel staat er nog steeds precies één knop', async ({ page }) => {
    // i18n.passToe() zet de innerHTML van [data-i18n]-elementen opnieuw en gooit daarmee
    // de voorleesknop weg. Stond de klaar-vlag nog op '1', dan kwam die knop pas terug na
    // een harde herlaad — precies de gebruiker die vaak van taal wisselt, raakte hem kwijt.
    await metTaal(page, 'NL');
    await page.addInitScript(STUB_STEMMEN);
    await page.addInitScript(() => {
      try { localStorage.setItem('solidari-voorlezen', 'aan'); } catch (e) {}
    });
    await vertraagManifest(page);
    await page.goto('/brief.html');
    await page.waitForFunction(() => document.querySelectorAll('.sol-a11y-knop').length > 0, null, { timeout: 15000 });
    await page.waitForTimeout(1200);

    const voor = await knoppenPerElement(page);
    expect(voor.metKnop).toBeGreaterThan(0);

    // drie keer wisselen, inclusief een RTL-taal en Tigrinya
    for (const taal of ['ar', 'ti', 'nl']) {
      await page.evaluate((t) => {
        const knop = document.querySelector(`.talen-inhoud .taal-item[data-taal="${t}"]`);
        if (knop) knop.click();
      }, taal);
      await page.waitForTimeout(600);
    }
    await page.waitForTimeout(1200);

    const na = await knoppenPerElement(page);
    expect(na.dubbel, 'blokken met meer dan één knop na taalwissel').toEqual([]);
    expect(na.metKnop, 'na een taalwissel is de voorleesknop verdwenen').toBe(voor.metKnop);
  });

  test('dynamisch toegevoegde alinea krijgt één knop', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.addInitScript(STUB_STEMMEN);
    await page.addInitScript(() => {
      try { localStorage.setItem('solidari-voorlezen', 'aan'); } catch (e) {}
    });
    await page.goto('/over.html');
    await page.waitForFunction(() => window.Solidari && window.Solidari.spraak, null, { timeout: 15000 });
    await page.waitForTimeout(1200);

    const n = await page.evaluate(async () => {
      const p = document.createElement('p');
      p.id = 'test-dynamisch';
      p.textContent = 'Dit is een dynamisch toegevoegde alinea die lang genoeg is om voorgelezen te worden.';
      document.querySelector('main, body').appendChild(p);
      // de MutationObserver plant verwerk() met 200 ms vertraging; twee keer scannen erbovenop
      await new Promise(r => setTimeout(r, 600));
      await Promise.all([Solidari.spraak.verwerk(document), Solidari.spraak.verwerk(document)]);
      await new Promise(r => setTimeout(r, 300));
      return document.getElementById('test-dynamisch').querySelectorAll(':scope > .sol-a11y-knop').length;
    });
    expect(n).toBe(1);
  });
});
