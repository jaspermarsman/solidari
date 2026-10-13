#!/usr/bin/env node
// Solidari — stap 6 van de vertaalronde (PLAN-7 fase 2): stapel A toepassen. PAS NA W-D.
//
//   node tools/vertaal/pas-toe.js --taal ti --stapel a [--bestand naturalisatie-data.js] [--droog]
//
// Gerichte vervanging per sleutelpad (§5.7) in het bronbestand, en dezelfde vervanging in de
// spiegel vertaalhulp.html waar de oude waarde daar letterlijk staat (§5.2). Een string die in de
// bron niet meer de waarde uit het rapport heeft, wordt overgeslagen (de bron is intussen veranderd).
// --bestand beperkt tot één bronbestand, zodat er per bestand gecommit en zo nodig teruggerold kan
// worden. --droog schrijft niets en toont alleen wat er zou gebeuren.
'use strict';
const fs = require('fs');
const path = require('path');
const B = require('./bronnen.js');
const { Bewerkingen } = require('./bewerk.js');

function arg(naam, standaard) { const i = process.argv.indexOf('--' + naam); return i > 0 ? process.argv[i + 1] : standaard; }
const taal = arg('taal');
const stapel = (arg('stapel', 'a') || 'a').toUpperCase();
const alleenBestand = arg('bestand');
const droog = process.argv.includes('--droog');
const map = arg('map', process.env.SOL_VERTAAL_MAP || path.resolve(__dirname, '..', '..', '..', 'Solidari', '_werkdocumenten', 'vertaal'));
const TAAL = taal.toUpperCase();

const { stop, stapels } = JSON.parse(fs.readFileSync(path.join(map, `${taal}-stapels.json`), 'utf8'));
if (stop && !process.argv.includes('--ondanks-afbreekcriterium')) {
  console.error('Een afbreekcriterium uit §10 staat op rood (zie het rapport). Niets toegepast.');
  process.exit(1);
}

function sjabloonTerug(sj, tekst) {
  const body = tekst.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${').replace(/\n/g, '\\n')
    .replace(/\{x(\d+)\}/g, (_, n) => '${' + sj.exprs[+n - 1] + '}');
  return sj.kop + '`' + body + '`';
}

const bronnen = new Map(B.laadAlles().map((b) => [b.naam, b]));
const spiegel = B.laadSpiegel()[TAAL] || new Map();
const bw = new Bewerkingen();
const verslag = { toegepast: [], overgeslagen: [], spiegel: 0, spiegelNiet: [] };
for (const r of stapels[stapel]) {
  const bron = bronnen.get(r.bron);
  const blad = bron && bron.talen[TAAL] && bron.talen[TAAL].bladeren.get(r.pad);
  if (!blad) { verslag.overgeslagen.push([r.bron, r.pad, 'pad niet gevonden']); continue; }
  if (alleenBestand && blad.bestand !== alleenBestand) continue;
  if (r.sjabloon) {
    if (blad.soort !== 'expr') { verslag.overgeslagen.push([r.bron, r.pad, 'geen sjabloon meer']); continue; }
    bw.ruw(blad.bestand, blad.start, blad.eind, sjabloonTerug(r.sjabloon, r.voorstel));
  } else {
    if (blad.waarde !== r.huidig) { verslag.overgeslagen.push([r.bron, r.pad, 'bron veranderd sinds het rapport']); continue; }
    bw.vervang(blad, r.voorstel);
    // spiegel: elke rij met precies de oude waarde
    let gevonden = false;
    for (const [sleutel, s] of spiegel) {
      if (s.waarde === r.huidig) { bw.vervang(s, r.voorstel); verslag.spiegel++; gevonden = true; void sleutel; }
    }
    if (!gevonden) verslag.spiegelNiet.push(`${r.bron} ${r.pad}`);
  }
  verslag.toegepast.push(`${blad.bestand} ${r.pad}`);
}

const perBestand = {};
for (const t of verslag.toegepast) { const b = t.split(' ')[0]; perBestand[b] = (perBestand[b] || 0) + 1; }
console.log(`${droog ? '[droog] ' : ''}stapel ${stapel} ${TAAL}: ${verslag.toegepast.length} vervangingen`, perBestand);
console.log(`  spiegel meegewijzigd: ${verslag.spiegel} rij(en); ${verslag.spiegelNiet.length} toegepaste strings staan niet (letterlijk) in de spiegel`);
for (const o of verslag.overgeslagen) console.log('  overgeslagen:', o.join(' · '));
if (!droog) console.log('  geschreven:', bw.pasToe().join(', '));
