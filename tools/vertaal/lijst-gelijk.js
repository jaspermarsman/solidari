#!/usr/bin/env node
// Solidari — lijsten in goedvoorbereid-data.js gelijktrekken met NL (AMENDEMENT beleefdheidsvorm, R2.2).
//
//   node tools/vertaal/lijst-gelijk.js --taal TI --besluiten <pad/naar/gv-lijsten.json> [--droog]
//
// Bij de B1-herschrijving van 9 juli 2026 (3d2104e) verdween uit elf NL-lijsten precies één punt; de
// vertalingen kregen die schrapping niet mee. Invoer: [{lijst, index, en}] — welk punt er in NL weg is,
// vastgesteld uit de git-geschiedenis (NL vóór en na 3d2104e). Per lijst wordt eerst gecontroleerd dat
// de taal precies één punt meer heeft dan NL en dat het Engels op die plek nog het verwachte punt is
// (zelfde volgorde als de oude NL-lijst); anders wordt de lijst overgeslagen. Dan gaat het element er
// gericht uit (§5.7): van de komma ervóór tot het einde van het element.
'use strict';
const fs = require('fs');
const B = require('./bronnen.js');
const { Bewerkingen } = require('./bewerk.js');

function arg(naam, standaard) { const i = process.argv.indexOf('--' + naam); return i > 0 ? process.argv[i + 1] : standaard; }
const TAAL = arg('taal').toUpperCase();
const besluiten = JSON.parse(fs.readFileSync(arg('besluiten'), 'utf8'));
const bron = B.laadAlles().find((b) => b.naam === 'goedvoorbereid-data.js');
const lengte = (m, l) => { let n = 0; while ([...m.keys()].some((p) => p === `${l}[${n}]` || p.startsWith(`${l}[${n}].`))) n++; return n; };
const tekstVan = (m, l, i) => { const b = m.get(`${l}[${i}]`) || m.get(`${l}[${i}].tekst`) || m.get(`${l}[${i}].zeg`); return b && b.waarde; };

const bw = new Bewerkingen();
let n = 0;
for (const x of besluiten) {
  const t = bron.talen[TAAL].bladeren, nl = bron.talen.NL.bladeren, en = bron.talen.EN.bladeren;
  if (lengte(t, x.lijst) !== lengte(nl, x.lijst) + 1) { console.log('overgeslagen (lengte klopt niet meer):', x.lijst); continue; }
  if (tekstVan(en, x.lijst, x.index) !== x.en) { console.log('overgeslagen (EN-punt wijkt af):', x.lijst); continue; }
  const bladen = [...t.values()].filter((b) => b.pad === `${x.lijst}[${x.index}]` || b.pad.startsWith(`${x.lijst}[${x.index}].`));
  const src = B.lees(bladen[0].bestand);
  let begin = Math.min(...bladen.map((b) => b.start));
  let eind = Math.max(...bladen.map((b) => b.eind));
  if (bladen[0].pad !== `${x.lijst}[${x.index}]`) {   // object: tot de accolades
    begin = src.lastIndexOf('{', begin);
    eind = src.indexOf('}', eind) + 1;
  }
  let k = begin - 1;
  while (/\s/.test(src[k])) k--;
  if (src[k] !== ',') { console.log('overgeslagen (geen komma vóór het element):', x.lijst); continue; }
  console.log(`${TAAL} ${x.lijst}[${x.index}] weg: ${src.slice(begin, eind).replace(/\s+/g, ' ').slice(0, 120)}`);
  bw.ruw(bladen[0].bestand, k, eind, '');
  n++;
}
console.log(`${n} van ${besluiten.length} lijsten`);
if (!process.argv.includes('--droog')) console.log('geschreven:', bw.pasToe().join(', '));
