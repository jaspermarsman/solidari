// Fase 7 — volledige regressie: eindmeting vs. nulmeting, niet-lezerspad per tool,
// reduced-motion + trage CPU, en een rooktest tegen de live staging-URL.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { PAGES, TALEN, metTaal, METING_IN_PAGE } = require('./helpers');

const STAGING = 'https://jaspermarsman.github.io/solidari-staging';
const TOOLPAGINAS = ['brief.html', 'budgethulp.html', 'loont-werken.html',
  'naturalisatie.html', '18jaar.html', 'rechten.html', 'goedvoorbereid.html'];

// Toestel mét stemmen (zoals een echte telefoon), zodat de voorleesfunctie meetbaar is.
const STUB_STEMMEN = () => {
  const V = [['nl-NL'], ['en-GB'], ['ar-SA'], ['tr-TR'], ['uk-UA'], ['fa-IR'], ['ro-RO'], ['pl-PL']]
    .map(([lang]) => ({ lang, name: lang, localService: true }));
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true, get: () => ({ getVoices: () => V, speak() {}, cancel() {}, pause() {}, resume() {}, speaking: false }),
  });
};

test('eindmeting: voorleesfunctie op 11 paginas, data-lees-dekking, 0 nieuwe console-errors', async ({ page }) => {
  test.setTimeout(240000);
  const resultaat = [];
  for (const pagina of PAGES) {
    const errors = [];
    page.on('pageerror', e => errors.push(String(e.message)));
    await metTaal(page, 'NL');
    await page.addInitScript(STUB_STEMMEN);
    await page.goto('/' + pagina, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
    await page.waitForTimeout(500);
    const m = await page.evaluate(() => ({
      toggle: document.querySelectorAll('.sol-a11y-luister-toggle').length,
      dataLees: document.querySelectorAll('[data-lees]').length,
      knoppen: document.querySelectorAll('.sol-a11y-knop').length,
      mics: document.querySelectorAll('.sol-a11y-mic').length,
    }));
    const echteErrors = errors.filter(e => !/api\.solidari\.nl|Failed to load resource|status of 404|CORS|Access to fetch/.test(e));
    resultaat.push({ pagina, ...m, echteErrors: echteErrors.length });
    page.removeAllListeners('pageerror');
  }
  fs.writeFileSync(path.join(__dirname, 'eindmeting-resultaat.json'), JSON.stringify(resultaat, null, 2));

  // Meetlat: elke pagina heeft de voorleesfunctie (was 0), geen nieuwe errors.
  for (const r of resultaat) {
    expect(r.toggle, `${r.pagina} geen voorlees-schakelaar`).toBeGreaterThan(0);
    expect(r.echteErrors, `${r.pagina} nieuwe console-errors`).toBe(0);
  }
  const metVoorlezen = resultaat.filter(r => r.toggle > 0).length;
  const prosePaginas = resultaat.filter(r => r.dataLees > 0).length;
  console.log(`EINDMETING: voorleesfunctie ${metVoorlezen}/11; paginas met data-lees ${prosePaginas}`);
  expect(metVoorlezen).toBe(11); // nulmeting: 0
});

test('niet-lezerspad: elke tool is bereikbaar en laadt (vanaf index)', async ({ page }) => {
  test.setTimeout(180000);
  await metTaal(page, 'NL');
  await page.addInitScript(STUB_STEMMEN);
  for (const tool of TOOLPAGINAS) {
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
    // via de nav-dropdown-link (icoon + naam)
    const link = page.locator(`.dropdown-menu a[href$="${tool}"]`).first();
    expect(await link.count(), `link naar ${tool} ontbreekt`).toBeGreaterThan(0);
    const href = await link.getAttribute('href');
    await page.goto('/' + href, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
    expect(page.url()).toContain(tool);
  }
});

test('reduced-motion én trage CPU: geen errors, voorleesfunctie blijft', async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  let cdpOk = false;
  try {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 3 });
    cdpOk = true;
  } catch (e) { /* niet-chromium: overslaan */ }
  const errors = [];
  page.on('pageerror', e => errors.push(String(e.message)));
  await metTaal(page, 'AR');
  await page.addInitScript(STUB_STEMMEN);
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(800);
  expect(await page.locator('.sol-a11y-luister-toggle').count()).toBeGreaterThan(0);
  const echt = errors.filter(e => !/api\.solidari\.nl|Failed to load resource|status of 404|CORS|Access to fetch/.test(e));
  expect(echt, echt.join(' | ')).toEqual([]);
});

test('live staging rooktest: audio laadt, testbalk + noindex, geen productielinks', async ({ page }) => {
  test.setTimeout(120000);
  await page.addInitScript(() => { try { localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {} });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e.message)));
  await page.goto(STAGING + '/index.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(500);

  const r = await page.evaluate(async () => {
    const robots = document.querySelector('meta[name="robots"]');
    const balk = document.getElementById('sol-env-balk');
    const badLinks = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'))
      .filter(h => /solidari\.nl/i.test(h) && !/^mailto:/i.test(h) && !/api\.solidari\.nl/i.test(h));
    // audio echt bereikbaar?
    const man = await fetch('audio/manifest-ti.json').then(x => x.ok ? x.json() : null).catch(() => null);
    const eersteHash = man && Object.keys(man.items || {})[0];
    const clip = eersteHash ? (await fetch('audio/TI/' + eersteHash + '.mp3')).status : 0;
    return {
      noindex: robots && robots.content, testbalk: !!balk,
      omgeving: window.Solidari.omgeving, badLinks: badLinks.length,
      manifestItems: man ? Object.keys(man.items || {}).length : 0, clipStatus: clip,
    };
  });
  expect(r.noindex).toBe('noindex');
  expect(r.testbalk).toBe(true);
  expect(r.omgeving).toBe('staging');
  expect(r.badLinks).toBe(0);
  expect(r.manifestItems).toBeGreaterThan(0);
  expect(r.clipStatus).toBe(200);
  expect(errors, errors.join(' | ')).toEqual([]);
});
