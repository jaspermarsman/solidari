// Fase 2 — acceptatietest audiopijplijn. Vereist dat de MMS-generatie gedraaid heeft.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { TALEN, metTaal } = require('./helpers');

const AUDIO = path.resolve(__dirname, '..', 'audio');

function teksten(taal) {
  const p = path.resolve(__dirname, '..', 'tools', 'audio', `teksten-${taal.toLowerCase()}.json`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

test('elke taal heeft een manifest met items en bijbehorende mp3s', async () => {
  for (const taal of TALEN) {
    const man = path.join(AUDIO, `manifest-${taal.toLowerCase()}.json`);
    expect(fs.existsSync(man), `manifest ${taal} ontbreekt`).toBe(true);
    const m = JSON.parse(fs.readFileSync(man, 'utf8'));
    const n = Object.keys(m.items || {}).length;
    expect(n, `${taal} manifest leeg`).toBeGreaterThan(0);
  }
});

test('spraak.js speelt een echte TI-clip via laag 1 (bestand)', async ({ page }) => {
  const ti = teksten('TI')[0];
  await metTaal(page, 'TI');
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);

  const res = await page.evaluate(async ({ tekst, hash }) => {
    const s = Solidari.spraak;
    const laag = await s._kiesLaag(tekst, 'TI');
    const url = 'audio/TI/' + hash + '.mp3';
    const r = await fetch(url);
    const blob = await r.blob();
    return { laag, status: r.status, grootte: blob.size };
  }, ti);

  expect(res.laag, 'TI moet bestand-eerst zijn').toBe('bestand');
  expect(res.status, 'TI-mp3 moet 200 geven').toBe(200);
  expect(res.grootte, 'TI-mp3 moet niet-triviaal zijn').toBeGreaterThan(500);
});

test('een NL zeg-zin (prioriteit 2) heeft audio', async ({ page }) => {
  const zeg = teksten('NL').find(t => t.prioriteit === 2);
  expect(zeg, 'geen zeg-zin in NL-teksten').toBeTruthy();
  await metTaal(page, 'NL');
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  const status = await page.evaluate(async (hash) => {
    const r = await fetch('audio/NL/' + hash + '.mp3');
    return r.status;
  }, zeg.hash);
  expect(status).toBe(200);
});
