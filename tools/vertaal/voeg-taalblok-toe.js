#!/usr/bin/env node
// Solidari — een hele ontbrekende taal toevoegen aan een bron (PLAN-7 fase 2b).
//
//   node tools/vertaal/voeg-taalblok-toe.js --bron loont-werken.html --taal ro [--na fa] [--droog]
//
// Kopieert het NL-blok letterlijk (structuur, volgorde, niet-tekstvelden) en vervangt alleen de
// string-literals waarvoor een bruikbare vertaling is: voorstel aanwezig, machinecontroles groen
// én terugvertaling inhoudelijk gelijk (B-7). Wat niet bruikbaar is, blijft Nederlands (de pagina
// valt daar per sleutel toch al op NL terug) en staat in de uitvoer, voor de reviewlijst.
// Het blok komt direct na het blok van --na (standaard: het laatste taalblok).
'use strict';
const fs = require('fs');
const path = require('path');
const B = require('./bronnen.js');
const { literal } = require('./bewerk.js');
const { hashId } = require('./extract.js');

function arg(naam, standaard) { const i = process.argv.indexOf('--' + naam); return i > 0 ? process.argv[i + 1] : standaard; }
const bronNaam = arg('bron');
const taal = arg('taal');
const map = arg('map', process.env.SOL_VERTAAL_MAP || path.resolve(__dirname, '..', '..', '..', 'Solidari', '_werkdocumenten', 'vertaal'));
const lees = (n) => JSON.parse(fs.readFileSync(path.join(map, n), 'utf8'));

const bronDef = B.BRONNEN.find((b) => b.naam === bronNaam);
const bron = B.laadBron(bronDef);
const nlKey = bron.talen.NL.sleutel;
const kast = nlKey === 'nl' ? (s) => s.toLowerCase() : (s) => s.toUpperCase();
if (bron.talen[taal.toUpperCase()]) { console.error(`${bronNaam} heeft al een ${taal}-blok`); process.exit(1); }

const src = B.lees(bronDef.bestand);
function blok(sleutel) {
  const re = new RegExp(`(^|[\\n,{])[ \\t]*${sleutel}[ \\t]*:[ \\t]*\\{`, 'g');
  re.lastIndex = bron.open;
  const m = re.exec(src);
  if (!m || m.index > bron.eind) throw new Error(`blok ${sleutel} niet gevonden`);
  const open = src.indexOf('{', m.index + m[1].length);
  const eind = B.scan(src, open, '', []);
  return { regelBegin: m.index + m[1].length, open, eind };
}

const gem = new Map(lees(`${taal}-gemini.json`).items.map((x) => [x.id, x[taal]]));
const controle = new Map(lees(`${taal}-controle.json`).map((x) => [x.id, x]));
const terug = new Map(lees(`${taal}-terug.json`).items.map((x) => [x.id, x]));

const nl = blok(nlKey);
const vervangingen = [];
const nietBruikbaar = [];
let vertaald = 0;
for (const [pad, b] of bron.talen.NL.bladeren) {
  if (b.soort !== 'str') continue;
  const id = hashId(bron.naam, pad);
  const v = gem.get(id);
  if (v === undefined) continue;   // niet geëxtraheerd: structuurveld, getal, URL → blijft gelijk
  const c = controle.get(id);
  const t = terug.get(id);
  if (!c || !c.geslaagd || !t || t.oordeel !== 'gelijk') {
    nietBruikbaar.push({ pad, nl: b.waarde, voorstel: v, controle: c ? c.gezakt_op : ['geen'], terug: t ? `${t.oordeel}: ${t.reden}` : 'geen' });
    continue;
  }
  vervangingen.push({ start: b.start - nl.open, eind: b.eind - nl.open, tekst: literal(v, b.quote) });
  vertaald++;
}
let tekst = src.slice(nl.open, nl.eind);
for (const r of vervangingen.sort((a, b) => b.start - a.start)) tekst = tekst.slice(0, r.start) + r.tekst + tekst.slice(r.eind);

const naKey = arg('na', Object.values(bron.talen).map((t) => t.sleutel).filter((k) => k !== kast(taal)).pop());
const na = blok(naKey);
const inspring = /^[ \t]*/.exec(src.slice(na.regelBegin))[0];
let i = na.eind;
while (/[ \t]/.test(src[i])) i++;
const invoeg = `\n${inspring}${kast(taal)}: ${tekst}` + (src[i] === ',' ? ',' : '');
const nieuw = src[i] === ',' ? src.slice(0, i + 1) + invoeg + src.slice(i + 1) : src.slice(0, na.eind) + ',' + invoeg + src.slice(na.eind);

console.log(`${bronNaam} ${taal}: ${vertaald} strings vertaald, ${nietBruikbaar.length} blijven Nederlands (niet bruikbaar)`);
for (const n of nietBruikbaar) console.log(`  - ${n.pad}: controle ${n.controle.join(',') || 'ok'} · terug ${n.terug}`);
if (!process.argv.includes('--droog')) {
  fs.writeFileSync(path.join(B.ROOT, bronDef.bestand), nieuw);
  fs.writeFileSync(path.join(map, `${taal}-${bronNaam}-niet-bruikbaar.json`), JSON.stringify(nietBruikbaar, null, 1));
}
