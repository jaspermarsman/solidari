#!/usr/bin/env node
// Solidari — nieuwe gedeelde sleutels toevoegen aan i18n.js (GEDEELD) én de spiegel (PLAN 9, blok 2).
//
//   SOL_VERTAAL_MAP=…/vertaal/p9 node tools/vertaal/nieuwe-sleutels.js [--droog]
//
// Leest per taal <taal>-nieuw.json, <taal>-gemini.json, <taal>-controle.json en <taal>-terug.json.
// Een vertaling gaat alleen mee als de machinecontroles groen zijn én de terugvertaling "gelijk" is;
// anders krijgt die taal de NL-tekst als terugval (en staat hij in de uitvoer, voor de reviewlijst).
// Alleen items met bestand "i18n.js". NL komt uit het nieuw-bestand zelf.
// Plek: in GEDEELD na 'ai-gegenereerd'; in de spiegel na de rij van NA_SPIEGEL[sleutel].
'use strict';
const fs = require('fs');
const path = require('path');
const B = require('./bronnen.js');
const { Bewerkingen } = require('./bewerk.js');

const map = process.env.SOL_VERTAAL_MAP;
const droog = process.argv.includes('--droog');
const TALEN = ['en', 'ar', 'tr', 'ti', 'uk', 'fa', 'ro', 'pl'];
const NA_SPIEGEL = { 'a11y-taal-kiezen': 'footer-contact', 'a11y-menu-openen': 'a11y-taal-kiezen', 'over-transparantie': 'ai-gegenereerd' };
const lees = (n) => JSON.parse(fs.readFileSync(path.join(map, n), 'utf8'));

const i18n = B.laadAlles().find((b) => b.naam === 'i18n.js');
const spiegel = B.laadSpiegel();
const bw = new Bewerkingen();
const terugval = [];
let nlGedaan = false;
for (const taal of TALEN) {
  const T = taal.toUpperCase();
  const nieuw = lees(`${taal}-nieuw.json`).filter((x) => x.bestand === 'i18n.js');
  const gem = new Map(lees(`${taal}-gemini.json`).items.map((x) => [x.id, x[taal]]));
  const ctl = new Map(lees(`${taal}-controle.json`).map((x) => [x.id, x]));
  const terug = new Map(lees(`${taal}-terug.json`).items.map((x) => [x.id, x]));
  // Volgorde in GEDEELD: allemaal direct na ai-gegenereerd, in de volgorde van het nieuw-bestand
  // (bewerk.js voegt op dezelfde plek in volgorde van aanroep toe).
  if (!nlGedaan) {
    for (const x of nieuw) bw.voegToeNa(i18n.talen.NL.bladeren.get('ai-gegenereerd'), x.pad, x.nl);
    nlGedaan = true;
  }
  for (const x of nieuw) {
    if (i18n.talen[T].bladeren.has(x.pad)) throw new Error(`${T} ${x.pad} bestaat al`);
    const ok = ctl.get(x.id) && ctl.get(x.id).geslaagd && terug.get(x.id) && terug.get(x.id).oordeel === 'gelijk';
    const waarde = ok ? gem.get(x.id) : x.nl;
    if (!ok) terugval.push(`${T} ${x.pad}`);
    bw.voegToeNa(i18n.talen[T].bladeren.get('ai-gegenereerd'), x.pad, waarde);
    if (spiegel[T].has(x.pad)) throw new Error(`spiegel ${T} ${x.pad} bestaat al`);
    if (ok) {
      // a11y-menu-openen komt na a11y-taal-kiezen; die rij bestaat nog niet, dus achter dezelfde rij
      // als a11y-taal-kiezen (volgorde van aanroep blijft behouden).
      let na = NA_SPIEGEL[x.pad];
      if (!spiegel[T].has(na)) na = NA_SPIEGEL[na];
      bw.voegSpiegelRijToeNa(spiegel[T].get(na), x.pad, waarde);
    }
  }
}
console.log(`${droog ? '[droog] ' : ''}nieuwe sleutels: terugval NL bij ${terugval.length}`, terugval);
if (!droog) console.log('geschreven:', bw.pasToe().join(', '));
