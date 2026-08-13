// Fase 3 — data-lees, auto-markering, luistermodus.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { PAGES, metTaal } = require('./helpers');

// Stub: een toestel mét browserstemmen voor 8 talen (NIET Tigrinya — die leunt op laag 1).
const STUB_STEMMEN = () => {
  const VOICES = [
    ['nl-NL', 'NL'], ['en-GB', 'EN'], ['ar-SA', 'AR'], ['tr-TR', 'TR'],
    ['uk-UA', 'UK'], ['fa-IR', 'FA'], ['ro-RO', 'RO'], ['pl-PL', 'PL'],
  ].map(([lang, n]) => ({ lang, name: n, localService: true, default: false }));
  window.__spoken = [];
  function Utter(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: Utter });
  const synth = {
    getVoices: () => VOICES,
    speak: (u) => { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => synth });
};

async function laad(page, pagina, taal) {
  await metTaal(page, taal);
  await page.addInitScript(STUB_STEMMEN);
  await page.goto('/' + pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(500); // auto-markering + scan
}

test('voorleesfunctie op alle 11 paginas; inhoudsknoppen waar prose staat (NL)', async ({ page }) => {
  const fouten = [];
  page.on('pageerror', e => fouten.push(String(e.message)));
  for (const pagina of PAGES) {
    await laad(page, pagina, 'NL');
    const toggle = await page.locator('.sol-a11y-luister-toggle').count();
    expect(toggle, `${pagina} mist de voorlees-schakelaar`).toBeGreaterThan(0);
    // Waar data-lees-blokken staan, moet er ook een leverbare knop zijn (NL heeft stem).
    const counts = await page.evaluate(() => ({
      lees: document.querySelectorAll('[data-lees]').length,
      knop: document.querySelectorAll('.sol-a11y-knop').length,
    }));
    if (counts.lees > 0) expect(counts.knop, `${pagina}: ${counts.lees} data-lees maar 0 knoppen`).toBeGreaterThan(0);
  }
  expect(fouten, 'console-fouten: ' + fouten.join(' | ')).toEqual([]);
});

test('mechanisme werkt: index.html en over.html tonen inhoudsknoppen (NL)', async ({ page }) => {
  for (const pagina of ['index.html', 'over.html']) {
    await laad(page, pagina, 'NL');
    expect(await page.locator('.sol-a11y-knop').count(), `${pagina}`).toBeGreaterThan(0);
  }
});

test('auto-markering dekt ≥90% van de tekstblokken (over.html)', async ({ page }) => {
  await laad(page, 'over.html', 'NL');
  const dekking = await page.evaluate(() => {
    const zichtbaar = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const blok = [...document.querySelectorAll('p,h1,h2,h3,h4,li,blockquote,dt,dd')]
      .filter(zichtbaar)
      .filter(el => !el.closest('nav,footer,#solidari-nav,#solidari-footer'))
      .filter(el => (el.textContent || '').trim().length > 40)
      .filter(el => !el.querySelector('p,h1,h2,h3,h4,li,blockquote,dt,dd')); // bladeren
    const gemarkeerd = blok.filter(el => el.hasAttribute('data-lees') || el.closest('[data-lees]'));
    return { totaal: blok.length, gemarkeerd: gemarkeerd.length };
  });
  expect(dekking.totaal).toBeGreaterThan(5);
  expect(dekking.gemarkeerd / dekking.totaal).toBeGreaterThanOrEqual(0.9);
});

test('TI prio-1 tekst speelt uit bestand (laag 1), ook zonder TI-stem', async ({ page }) => {
  await laad(page, 'index.html', 'TI');
  const res = await page.evaluate(async () => {
    const s = Solidari.spraak;
    const el = document.createElement('p');
    el.setAttribute('data-lees', '');
    el.setAttribute('data-lees-taal', 'TI');
    el.textContent = 'መሳርሒታት';
    document.querySelector('main, body').appendChild(el);
    await s.verwerk(el.parentElement);
    const laag = await s._kiesLaag('መሳርሒታት', 'TI');
    return { laag, heeftKnop: !!el.querySelector('.sol-a11y-knop') };
  });
  expect(res.laag).toBe('bestand');
  expect(res.heeftKnop).toBe(true);
});

test('principe 6: geen bestand én geen stem → geen knop, geen fout', async ({ page }) => {
  // TI zonder stem, tekst die niet in het manifest staat
  await page.addInitScript(() => {
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => ({ getVoices: () => [], speak() {}, cancel() {}, pause() {}, resume() {}, speaking: false }) });
  });
  await metTaal(page, 'TI');
  const fouten = [];
  page.on('pageerror', e => fouten.push(String(e.message)));
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  const heeftKnop = await page.evaluate(async () => {
    const s = Solidari.spraak;
    const el = document.createElement('p');
    el.setAttribute('data-lees', '');
    el.setAttribute('data-lees-taal', 'TI');
    el.textContent = 'Dit is een lange zin die zeker niet in het Tigrinya-manifest voorkomt en geen stem heeft.';
    document.body.appendChild(el);
    await s.verwerk(el.parentElement);
    return !!el.querySelector('.sol-a11y-knop');
  });
  expect(heeftKnop).toBe(false);
  expect(fouten).toEqual([]);
});

test('luistermodus: schakelt, leest bij tik, en overleeft paginawissel', async ({ page }) => {
  await laad(page, 'index.html', 'NL');
  // schakel aan via nav-knop
  await page.click('.sol-a11y-luister-toggle');
  const aan = await page.evaluate(() => Solidari.spraak.luistermodus.staat() && localStorage.getItem('solidari-voorlezen') === 'aan');
  expect(aan).toBe(true);
  // tik op een gemarkeerd blok → zeg() spreekt
  const gesproken = await page.evaluate(async () => {
    const el = document.querySelector('[data-lees]');
    window.__spoken = [];
    el.click();
    await new Promise(r => setTimeout(r, 120));
    return window.__spoken.length;
  });
  expect(gesproken).toBeGreaterThan(0);
  // paginawissel: modus hersteld
  await page.goto('/over.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(300);
  const hersteld = await page.evaluate(() => document.body.classList.contains('sol-a11y-luistermodus'));
  expect(hersteld).toBe(true);
});

test('zeg-zin (regel-zeg) blijft NL, ook onder AR-interface', async ({ page }) => {
  await laad(page, 'goedvoorbereid.html', 'AR');
  const res = await page.evaluate(async () => {
    const s = Solidari.spraak;
    const span = document.createElement('span');
    span.className = 'regel-zeg';
    span.textContent = 'Kunt u het langzamer zeggen?';
    document.body.appendChild(span);
    s.autoMarkeer(span.parentElement);
    return { taal: span.getAttribute('data-lees-taal') };
  });
  expect(res.taal).toBe('NL');
});
