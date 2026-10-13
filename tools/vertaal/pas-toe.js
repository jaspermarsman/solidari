#!/usr/bin/env node
// Solidari — stap 6 van de vertaalronde (PLAN-7 fase 2): stapel A toepassen. PAS NA W-D.
//
//   node tools/vertaal/pas-toe.js --taal ti --stapel a [--bestand naturalisatie-data.js] [--droog]
//   node tools/vertaal/pas-toe.js --taal ti --stapel m [--bestand …] [--droog]   (na a; besluit m/v 13-10)
//   node tools/vertaal/pas-toe.js --taal ti --stapel r [--bestand …] [--droog]   (AMENDEMENT beleefdheidsvorm)
//
// Stapel r = de registeromzetting uit <taal>-register.json (tools/vertaal/register.py): elke tekst
// die gewijzigd is en door de controles kwam, op elke plek waar precies die tekst nog staat —
// gewone strings, sjablonen (de ${…}-expressies worden teruggezet) en spiegelrijen. Een spiegelrij
// gaat mee met het eerste bronbestand dat dezelfde tekst heeft; staat de tekst alleen in de spiegel,
// dan hoort hij bij vertaalhulp.html. Weigert als meer dan 10% van de gewijzigde teksten zakte (§6.1).
//
// Stapel m = besluit "alleen de mannelijke aanspreekvorm" (W-D, 13-10-2026): eerst de B-strings met
// een m/v-streep naar hun Gemini-voorstel (B-wissel), daarna de minimale bewerkingen uit
// <taal>-mannelijk.json op wat er dan nog een streep heeft — in bron én spiegel. Draai m pas als a
// voor hetzelfde bestand is toegepast; m vervangt alleen teksten die precies de verwachte stand hebben.
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

const { stop, stapels: alleStapels } = JSON.parse(fs.readFileSync(path.join(map, `${taal}-stapels.json`), 'utf8'));
if (stop && !process.argv.includes('--ondanks-afbreekcriterium')) {
  console.error('Een afbreekcriterium uit §10 staat op rood (zie het rapport). Niets toegepast.');
  process.exit(1);
}

function sjabloonTerug(sj, tekst) {
  const body = tekst.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${').replace(/\n/g, '\\n')
    .replace(/\{x(\d+)\}/g, (_, n) => '${' + sj.exprs[+n - 1] + '}');
  return sj.kop + '`' + body + '`';
}

let stapels = alleStapels;
let mannelijk = null;
let register = null;
if (stapel === 'R') {
  register = JSON.parse(fs.readFileSync(path.join(map, `${taal}-register.json`), 'utf8'));
  if (register.gezakt_pct > 10 && !process.argv.includes('--ondanks-afbreekcriterium')) {
    console.error(`Afbreekcriterium §6.1: ${register.gezakt_pct}% van de gewijzigde teksten zakte. Niets toegepast.`);
    process.exit(1);
  }
  stapels = { R: [] };
}
if (stapel === 'M') {
  mannelijk = JSON.parse(fs.readFileSync(path.join(map, `${taal}-mannelijk.json`), 'utf8'));
  const wissel = new Set(mannelijk.b_wissel.map((x) => x.bron + '\u0000' + x.pad));
  stapels = { M: alleStapels.B.filter((r) => wissel.has(r.bron + '\u0000' + r.pad)) };
}
const bronnen = new Map(B.laadAlles().map((b) => [b.naam, b]));
const spiegel = B.laadSpiegel()[TAAL] || new Map();
const bw = new Bewerkingen();
const verslag = { toegepast: [], overgeslagen: [], spiegel: 0, spiegelNiet: [] };
const spiegelGedaan = new Set();   // twee rapportregels met dezelfde oude waarde: de spiegelrij maar één keer
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
      if (s.waarde !== r.huidig) continue;
      gevonden = true;
      if (spiegelGedaan.has(sleutel)) continue;
      spiegelGedaan.add(sleutel); bw.vervang(s, r.voorstel); verslag.spiegel++;
    }
    if (!gevonden) verslag.spiegelNiet.push(`${r.bron} ${r.pad}`);
  }
  verslag.toegepast.push(`${blad.bestand} ${r.pad}`);
}

// Stapel M, deel 2: minimale m/v-bewerkingen. Verwachte stand = de tekst ná a en de B-wissel; in
// --droog telt ook de stand ervóór mee (dan zou a/de wissel hem eerst zetten).
if (mannelijk) {
  for (const x of mannelijk.items) {
    if (!x.nieuw || x.nieuw === x.tekst || !x.gezakt_op.every((g) => g === 'streep over')) {
      if (x.nieuw && x.nieuw !== x.tekst && x.gezakt_op.length) verslag.overgeslagen.push(['mannelijk', x.id, x.gezakt_op.join(',')]);
      continue;
    }
    for (const p of x.plekken) {
      const blad = p.soort === 'bron'
        ? (bronnen.get(p.bron).talen[TAAL].bladeren.get(p.pad))
        : spiegel.get(p.sleutel);
      if (!blad) { verslag.overgeslagen.push(['mannelijk', p.pad || p.sleutel, 'niet gevonden']); continue; }
      if (alleenBestand && blad.bestand !== alleenBestand) continue;
      if (blad.waarde === x.tekst) { bw.vervang(blad, x.nieuw); verslag.toegepast.push(`${blad.bestand} ${p.pad || p.sleutel} (m/v)`); }
      else if (droog && blad.waarde === p.huidig) verslag.toegepast.push(`${blad.bestand} ${p.pad || p.sleutel} (m/v, na a)`);
      else verslag.overgeslagen.push(['mannelijk', p.pad || p.sleutel, 'stand wijkt af (eerst stapel a toepassen?)']);
    }
  }
}

// Stapel R: registeromzetting
if (register) {
  const { sjabloon } = require('./extract.js');
  for (const x of register.items) {
    if (!x.geslaagd || !x.nieuw || x.nieuw === x.tekst) {
      if (x.nieuw && x.nieuw !== x.tekst) verslag.overgeslagen.push(['register', x.id, x.gezakt_op.join(',')]);
      continue;
    }
    const eigenaar = (x.plekken.find((p) => p.soort === 'bron') || { bestand: 'vertaalhulp.html' }).bestand;
    for (const p of x.plekken) {
      const plekBestand = p.soort === 'spiegel' ? eigenaar : p.bestand;
      if (alleenBestand && plekBestand !== alleenBestand) continue;
      const blad = p.soort === 'bron' ? bronnen.get(p.bron).talen[TAAL].bladeren.get(p.pad) : spiegel.get(p.sleutel);
      const naam = p.pad || 'spiegel ' + p.sleutel;
      if (!blad) { verslag.overgeslagen.push(['register', naam, 'niet gevonden']); continue; }
      if (p.sjabloon) {
        const sj = blad.soort === 'expr' && sjabloon(blad.waarde);
        if (!sj || sj.tekst !== x.tekst) { verslag.overgeslagen.push(['register', naam, 'sjabloon veranderd']); continue; }
        bw.ruw(blad.bestand, blad.start, blad.eind, sjabloonTerug(sj, x.nieuw));
      } else {
        if (blad.waarde !== x.tekst) { verslag.overgeslagen.push(['register', naam, 'stand wijkt af']); continue; }
        bw.vervang(blad, x.nieuw);
      }
      if (p.soort === 'spiegel') verslag.spiegel++;
      verslag.toegepast.push(`${plekBestand} ${naam}`);
    }
  }
}

const perBestand = {};
for (const t of verslag.toegepast) { const b = t.split(' ')[0]; perBestand[b] = (perBestand[b] || 0) + 1; }
console.log(`${droog ? '[droog] ' : ''}stapel ${stapel} ${TAAL}: ${verslag.toegepast.length} vervangingen`, perBestand);
console.log(`  spiegel meegewijzigd: ${verslag.spiegel} rij(en); ${verslag.spiegelNiet.length} toegepaste strings staan niet (letterlijk) in de spiegel`);
for (const o of verslag.overgeslagen) console.log('  overgeslagen:', o.join(' · '));
if (!droog) console.log('  geschreven:', bw.pasToe().join(', '));
