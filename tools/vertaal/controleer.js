#!/usr/bin/env node
// Solidari — stap 4 van de vertaalronde (PLAN-7 fase 2): machinecontroles, los van het model.
//
//   node tools/vertaal/controleer.js --taal ti
//
// Over álle Gemini-voorstellen (<taal>-gemini.json) tegen de NL-bron en, waar die er is, de
// huidige vertaling. Een voorstel dat hier zakt, gaat naar stapel C, wat het model ook vond.
// Dezelfde controles draaien ter informatie ook over de huidige vertaling (huidig_gezakt_op).
//
// Controles: placeholders · html (tags + attributen) · systeemtermen (Latijns schrift) ·
// schrift (eigen schrift aanwezig) · lengte (factor 2 t.o.v. huidig, vanaf 12 tekens) ·
// getallen (en bedragen) · regels (aantal regelafbrekingen).
// Schrijft <taal>-controle.json [{id, geslaagd, gezakt_op, huidig_gezakt_op}].
'use strict';
const fs = require('fs');
const path = require('path');

const TERMEN = ['huisarts', 'BSN', 'DigiD', 'gemeente', 'bijstand', 'klantmanager', 'toeslag', 'inburgering',
  'IND', 'Belastingdienst', 'UWV', 'SVB', 'VluchtelingenWerk', 'Juridisch Loket'];
const SCHRIFT = { ti: /[ሀ-፿]/, ar: /[؀-ۿ]/, fa: /[؀-ۿ]/, uk: /[Ѐ-ӿ]/ };

function arg(naam, standaard) { const i = process.argv.indexOf('--' + naam); return i > 0 ? process.argv[i + 1] : standaard; }
const multiset = (xs) => xs.slice().sort().join('\u0001');
const placeholders = (s) => s.match(/\{[^{}\s]+\}/g) || [];
const tags = (s) => (s.match(/<[^>]+>/g) || []).map((t) => t.replace(/\s+/g, ' '));
const getallen = (s) => (s.replace(/<[^>]+>/g, ' ').replace(/\{[^{}\s]+\}/g, ' ').match(/\d+(?:[.,]\d+)*/g) || []);
const isAcroniem = (t) => /^[A-Z][A-Za-z]*[A-Z]/.test(t);
// Woordgrens = geen Latijnse letter. Een Ge'ez-achtervoegsel aan de Latijnse term ("gemeenteኻ",
// "jouw gemeente") is grammatica, geen vertaling: de term zelf staat dan nog in Latijns schrift.
function termRe(t) { return new RegExp('(^|[^A-Za-zÀ-ÿ])' + t.replace(/ /g, '\\s+') + '($|[^A-Za-zÀ-ÿ])', isAcroniem(t) ? 'u' : 'iu'); }
function termenIn(s) { return TERMEN.filter((t) => termRe(t).test(s)); }
function heeftTekst(nl) {
  let s = nl.replace(/<[^>]+>/g, ' ').replace(/\{[^{}\s]+\}/g, ' ').replace(/https?:\/\/\S+|\S+@\S+/g, ' ');
  for (const t of TERMEN) s = s.replace(termRe(t), ' ');
  return /[A-Za-z]{3,}/.test(s);
}

function controleer(taal, nl, voorstel, huidig) {
  const gezakt = [];
  if (multiset(placeholders(nl)) !== multiset(placeholders(voorstel))) gezakt.push('placeholders');
  if (multiset(tags(nl)) !== multiset(tags(voorstel))) gezakt.push('html');
  const ontbrekend = termenIn(nl).filter((t) => !termRe(t).test(voorstel));
  if (ontbrekend.length) gezakt.push('systeemtermen:' + ontbrekend.join('/'));
  if (heeftTekst(nl)) {
    if (SCHRIFT[taal] && !SCHRIFT[taal].test(voorstel)) gezakt.push('schrift');
    if (!SCHRIFT[taal] && voorstel.trim() === nl.trim()) gezakt.push('schrift');   // RO/PL/…: niet stil Nederlands
  }
  if (huidig && huidig.length >= 12) {
    const r = voorstel.length / huidig.length;
    if (r < 0.5 || r > 2) gezakt.push(`lengte:${r.toFixed(2)}`);
  }
  if (multiset(getallen(nl)) !== multiset(getallen(voorstel))) gezakt.push('getallen');
  if ((nl.match(/\n/g) || []).length !== (voorstel.match(/\n/g) || []).length) gezakt.push('regels');
  return gezakt;
}

if (require.main === module) {
  const taal = arg('taal');
  const map = arg('map', process.env.SOL_VERTAAL_MAP || path.resolve(__dirname, '..', '..', '..', 'Solidari', '_werkdocumenten', 'vertaal'));
  const lees = (n) => (fs.existsSync(path.join(map, n)) ? JSON.parse(fs.readFileSync(path.join(map, n), 'utf8')) : []);
  const bron = process.argv.includes('--alleen-nieuw') ? lees(`${taal}-nieuw.json`)
    : [].concat(lees(`${taal}-paren.json`), lees(`${taal}-nieuw.json`), lees(`${taal}-structuur.json`));
  const gem = new Map(lees(`${taal}-gemini.json`).items.map((x) => [x.id, x[taal]]));
  const uit = [];
  const telling = {};
  for (const p of bron) {
    const v = gem.get(p.id);
    if (v === undefined) { uit.push({ id: p.id, geslaagd: false, gezakt_op: ['geen voorstel'] }); continue; }
    const gezakt = controleer(taal, p.nl, v, p.huidig);
    const huidigGezakt = p.huidig ? controleer(taal, p.nl, p.huidig, null) : null;
    uit.push({ id: p.id, geslaagd: !gezakt.length, gezakt_op: gezakt, huidig_gezakt_op: huidigGezakt });
    for (const g of gezakt) { const k = g.split(':')[0]; telling[k] = (telling[k] || 0) + 1; }
  }
  fs.writeFileSync(path.join(map, `${taal}-controle.json`), JSON.stringify(uit, null, 1));
  const gezakt = uit.filter((x) => !x.geslaagd).length;
  console.log(`${taal}: ${uit.length} voorstellen, ${gezakt} gezakt (${(100 * gezakt / uit.length).toFixed(1)}%)`, telling);
}

module.exports = { controleer, TERMEN };
