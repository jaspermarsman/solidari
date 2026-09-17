// Fase 2 — acceptatietest audiopijplijn.
//
// Bijgewerkt 17-09-2026 (besluit S-7): ook Tigrinya heeft geen voorgegenereerde clips meer.
// De eSpeak-stem is na de review door een moedertaalspreker (W-B) afgewezen, dus zijn de
// 37 clips verwijderd en is manifest-ti.json leeggemaakt. Alle negen manifesten zijn nu leeg:
// de acht talen mét browserstem gebruiken die, en Tigrinya wordt niet voorgelezen.
// Eerder (02-09-2026, AMENDEMENT-a11y-tts.md) was MMS al uitgefaseerd ten gunste van eSpeak.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { TALEN, metTaal } = require('./helpers');

const AUDIO = path.resolve(__dirname, '..', 'audio');

function teksten(taal) {
  const p = path.resolve(__dirname, '..', 'tools', 'audio', `teksten-${taal.toLowerCase()}.json`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

test('elke taal heeft een manifest en alle negen zijn bewust leeg', async () => {
  for (const taal of TALEN) {
    const man = path.join(AUDIO, `manifest-${taal.toLowerCase()}.json`);
    expect(fs.existsSync(man), `manifest ${taal} ontbreekt`).toBe(true);
    const m = JSON.parse(fs.readFileSync(man, 'utf8'));
    const n = Object.keys(m.items || {}).length;
    expect(m.bron, `${taal} hoort geen generatorbron te hebben`).toBeFalsy();
    expect(n, `${taal} hoort geen clips te hebben`).toBe(0);
    // Geen manifestregel zonder bestand, en ook geen taalmap zonder manifestregels.
    expect(fs.existsSync(path.join(AUDIO, taal)), `audio/${taal}/ hoort niet te bestaan`).toBe(false);
  }
});

test('de TI-clips zijn echt weg: geen laag, geen bestand (S-7)', async ({ page }) => {
  // Was: "spraak.js speelt een echte TI-clip via laag 1". De keerzijde van hetzelfde
  // mechanisme, want dit is de test die moest omslaan toen W-B nee werd. De teksten
  // blijven bestaan (ze staan in de vertaalbestanden), alleen de audio niet.
  const ti = teksten('TI')[0];
  await metTaal(page, 'TI');
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);

  const res = await page.evaluate(async ({ tekst, hash }) => {
    const s = Solidari.spraak;
    const laag = await s._kiesLaag(tekst, 'TI');
    const r = await fetch('audio/TI/' + hash + '.mp3');
    return { laag, status: r.status };
  }, ti);

  expect(res.laag, 'TI hoort geen laag meer te kiezen').toBeNull();
  expect(res.status, 'de TI-clip hoort er niet meer te zijn').toBe(404);
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
