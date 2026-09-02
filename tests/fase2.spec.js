// Fase 2 — acceptatietest audiopijplijn.
//
// Bijgewerkt 02-09-2026 (AMENDEMENT-a11y-tts.md): MMS is uitgefaseerd. Alleen Tigrinya heeft
// nog voorgegenereerde clips — met eSpeak NG op de eigen server, omdat er voor die taal geen
// browserstem bestaat. De andere acht talen vallen terug op de browserstem en hebben bewust
// een leeg manifest ("bron": null). Een leeg manifest is daar dus de bedoelde toestand.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { TALEN, metTaal } = require('./helpers');

const AUDIO = path.resolve(__dirname, '..', 'audio');

function teksten(taal) {
  const p = path.resolve(__dirname, '..', 'tools', 'audio', `teksten-${taal.toLowerCase()}.json`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

test('elke taal heeft een manifest; TI heeft clips, de rest is bewust leeg', async () => {
  for (const taal of TALEN) {
    const man = path.join(AUDIO, `manifest-${taal.toLowerCase()}.json`);
    expect(fs.existsSync(man), `manifest ${taal} ontbreekt`).toBe(true);
    const m = JSON.parse(fs.readFileSync(man, 'utf8'));
    const n = Object.keys(m.items || {}).length;
    if (taal === 'TI') {
      expect(m.bron, 'TI moet op eSpeak draaien').toBe('espeak');
      expect(n, 'TI manifest leeg — die taal heeft geen browserstem als terugval').toBeGreaterThan(0);
      // elk manifest-item heeft ook echt een bestand
      for (const hash of Object.keys(m.items)) {
        expect(fs.existsSync(path.join(AUDIO, 'TI', `${hash}.mp3`)), `TI mp3 ${hash} ontbreekt`).toBe(true);
      }
    } else {
      expect(m.bron, `${taal} hoort geen generatorbron te hebben`).toBeFalsy();
      expect(n, `${taal} hoort geen clips te hebben (browserstem)`).toBe(0);
    }
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

test('een NL zeg-zin valt terug op de browserstem (geen bestand meer)', async ({ page }) => {
  // Was: "heeft audio". Sinds de MMS-uitfasering heeft NL geen clips meer; de zeg-zinnen
  // worden door de browserstem gelezen. Deze test bewaakt dat die terugval echt werkt —
  // dat is wat de gebruiker merkt, niet of er een mp3 op de schijf staat.
  const zeg = teksten('NL').find(t => t.prioriteit === 2);
  expect(zeg, 'geen zeg-zin in NL-teksten').toBeTruthy();
  await metTaal(page, 'NL');
  await page.addInitScript(() => {
    const V = [{ lang: 'nl-NL', name: 'NL', localService: true, default: true }];
    function Utter(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: Utter });
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      get: () => ({ getVoices: () => V, speak(u) { setTimeout(() => u.onend && u.onend(), 0); },
                    cancel() {}, pause() {}, resume() {}, speaking: false }),
    });
  });
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  const laag = await page.evaluate((tekst) => Solidari.spraak._kiesLaag(tekst, 'NL'), zeg.tekst);
  expect(laag, 'NL hoort nu via de browserstem te gaan').toBe('stem');
});
