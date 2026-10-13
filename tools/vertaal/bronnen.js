// Solidari — alle taalbronnen op één plek (PLAN-7, vert-v1).
// Leest de vertaalobjecten uit de bronbestanden zónder ze uit te voeren: een kleine
// scanner loopt door de object-literal en geeft per tekst het diepe sleutelpad, de waarde
// en de exacte plek in het bestand (begin/eind van de string, aanhalingstekens inbegrepen).
// Die plek is wat pas-toe.js nodig heeft voor een gerichte vervanging (regel §5.7: nooit
// een heel bestand herschrijven).
//
// Gebruikt door: tools/test/i18n-pariteit.js --alles, tools/vertaal/extract.js,
// tools/vertaal/pas-toe.js.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const TALEN = ['NL', 'EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL'];

// Per bron: waar het object begint en of de taalsleutels hoofd- of kleine letters zijn
// (regel §5.3). `uitzonderingen` zijn paden die bewust alleen in NL bestaan.
const BRONNEN = [
  { naam: 'i18n.js', bestand: 'i18n.js', anker: 'const GEDEELD = {' },
  { naam: 'index.html', bestand: 'index.html', anker: 'Solidari.i18n.extend({' },
  { naam: 'feedback.html', bestand: 'feedback.html', anker: 'Solidari.i18n.extend({' },
  { naam: '18jaar.html', bestand: '18jaar.html', anker: 'Solidari.i18n.extend({' },
  { naam: 'rechten.html', bestand: 'rechten.html', anker: 'const T = {' },
  { naam: 'brief.html', bestand: 'brief.html', anker: 'const TALEN = {' },
  { naam: 'budgethulp.html', bestand: 'budgethulp.html', anker: 'const T = {' },
  { naam: 'loont-werken.html', bestand: 'loont-werken.html', anker: 'const T = {' },
  { naam: 'lw-i18n.js', bestand: 'lw-i18n.js', anker: 'window.LW_T = {' },
  {
    naam: 'goedvoorbereid-data.js', bestand: 'goedvoorbereid-data.js', anker: 'window.GoedVoorbereidData = {',
    uitzonderingen: [{ re: /^categorieen\[4\]/, reden: 'B-9: de vijfde categorie is bewust alleen Nederlands' }],
    // `zeg` is in elke taal Nederlands (regel §5.1); `eigen` is de vertaling ernaast en bestaat in NL niet.
    extraToegestaan: { re: /\.eigen$/, reden: '`eigen` is de vertaling naast het Nederlandse `zeg`; NL heeft geen `eigen`' },
  },
  { naam: 'naturalisatie-data.js', bestand: 'naturalisatie-data.js', anker: 'window._NAT = {' },
  {
    naam: '18jaar-data-*.js', bestanden: ['18jaar-data-1.js', '18jaar-data-2.js', '18jaar-data-3.js'],
    ankerPerTaal: /^d\.([A-Z]{2}) = \{/gm,
  },
  {
    naam: 'spraak.js (GETAL_WOORDEN)', bestand: 'spraak.js', anker: 'const GETAL_WOORDEN = {',
    alleenTalen: ['NL', 'EN'],
    diepte: 1,   // de sleutels zijn woorden in de taal zelf; vergelijk alleen de velden (klein, groot, en, …)
    redenAlleenTalen: 'PLAN-5 fase 5 (I-6): woordenlijst voor ingesproken bedragen bestaat bewust alleen voor NL en EN; '
      + 'andere talen herkennen alleen cijfers. Dit is een lexicon met taalgebonden ontleding, geen vertaalbare tekst.',
  },
  // UI van de vertaalhulp-pagina zelf (niet de spiegel; die staat in SPIEGEL hieronder)
  {
    naam: 'vertaalhulp.html (UI)', bestand: 'vertaalhulp.html', anker: 'Solidari.i18n.extend({',
    leegToegestaan: { re: /^vt-succes-(mv|ev)$/, reden: 'meervoudsuitgang achter "suggestie"; talen buiten NL/EN vangen dat in vt-succes zelf op' },
  },
];

// De spiegel: wat vertaalhulp.html per taal als "huidige vertaling" toont. Geen NL.
const SPIEGEL = { naam: 'vertaalhulp.html (spiegel)', bestand: 'vertaalhulp.html', anker: 'const VERTALINGEN = {' };

// ── Scanner ──────────────────────────────────────────────────────────────
// Leest één object-literal vanaf `{`. Geeft bladeren: { pad, soort, waarde, start, eind }.
// soort: 'str' (letterlijke string, vervangbaar), 'lit' (getal/true/false/null),
// 'expr' (alles wat geen enkele letterlijke waarde is: functies, optellingen, verwijzingen).
function scan(src, open, padPrefix, bladeren) {
  let i = open;
  const n = src.length;

  function ws() {
    for (;;) {
      while (i < n && /\s/.test(src[i])) i++;
      if (src[i] === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
      if (src[i] === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 2; continue; }
      return;
    }
  }
  function sluitString(q, j) {   // j staat op de openende quote; geeft index na de sluitende
    j++;
    while (j < n) {
      const c = src[j];
      if (c === '\\') { j += 2; continue; }
      if (q === '`' && c === '$' && src[j + 1] === '{') { j = sluitHaak(j + 1); continue; }
      if (c === q) return j + 1;
      j++;
    }
    throw new Error('open string');
  }
  function sluitHaak(j) {        // j staat op ( [ of {; geeft index na de bijbehorende sluiter
    let d = 0;
    while (j < n) {
      const c = src[j];
      if (c === '"' || c === "'" || c === '`') { j = sluitString(c, j); continue; }
      if (c === '/' && src[j + 1] === '/') { while (j < n && src[j] !== '\n') j++; continue; }
      if (c === '/' && src[j + 1] === '*') { j = src.indexOf('*/', j + 2) + 2; continue; }
      if (c === '(' || c === '[' || c === '{') d++;
      else if (c === ')' || c === ']' || c === '}') { d--; if (!d) return j + 1; }
      j++;
    }
    throw new Error('open haak');
  }
  function slaExprOver() {       // tot de volgende , } of ] op diepte 0
    while (i < n) {
      const c = src[i];
      if (c === ',' || c === '}' || c === ']') return;
      if (c === '"' || c === "'" || c === '`') { i = sluitString(c, i); continue; }
      if (c === '(' || c === '[' || c === '{') { i = sluitHaak(i); continue; }
      if (c === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) { ws(); continue; }
      i++;
    }
  }
  function sleutelPad(pad, k) {
    return /^[A-Za-z0-9_$\-]+$/.test(k) ? (pad ? pad + '.' + k : k) : pad + '[' + JSON.stringify(k) + ']';
  }
  function waarde(pad) {
    ws();
    const c = src[i];
    const begin = i;
    if (c === '{') return object(pad);
    if (c === '[') return array(pad);
    if (c === '"' || c === "'" || (c === '`')) {
      const eind = sluitString(c, i);
      const raw = src.slice(begin, eind);
      i = eind; ws();
      if (src[i] === ',' || src[i] === '}' || src[i] === ']') {
        if (c === '`' && raw.includes('${')) { bladeren.push({ pad, soort: 'expr', waarde: raw, start: begin, eind }); return; }
        bladeren.push({ pad, soort: 'str', waarde: vm.runInNewContext(raw), start: begin, eind, quote: c });
        return;
      }
      slaExprOver();
      bladeren.push({ pad, soort: 'expr', waarde: src.slice(begin, i).trim(), start: begin, eind: i });
      return;
    }
    slaExprOver();
    const raw = src.slice(begin, i).trim();
    const soort = /^(-?[\d.]+(e-?\d+)?|true|false|null|undefined)$/.test(raw) ? 'lit' : 'expr';
    bladeren.push({ pad, soort, waarde: raw, start: begin, eind: begin + raw.length });
  }
  function object(pad) {
    i++; // {
    for (;;) {
      ws();
      if (src[i] === '}') { i++; return; }
      if (src[i] === ',') { i++; continue; }
      if (src.startsWith('...', i)) { slaExprOver(); continue; }
      let k;
      if (src[i] === '"' || src[i] === "'") { const e = sluitString(src[i], i); k = vm.runInNewContext(src.slice(i, e)); i = e; }
      else if (src[i] === '[') { const e = sluitHaak(i); k = src.slice(i, e); i = e; }
      else { const m = /^[A-Za-z0-9_$]+/.exec(src.slice(i, i + 200)); if (!m) throw new Error('sleutel verwacht op ' + i + ': ' + src.slice(i, i + 40)); k = m[0]; i += k.length; }
      ws();
      if (src[i] === '(') {        // methode-kortschrift: naam(...) { ... }
        i = sluitHaak(i); ws(); i = sluitHaak(i);
        bladeren.push({ pad: sleutelPad(pad, k), soort: 'expr', waarde: 'methode' });
        continue;
      }
      if (src[i] === ',' || src[i] === '}') { bladeren.push({ pad: sleutelPad(pad, k), soort: 'expr', waarde: k }); continue; }
      if (src[i] !== ':') throw new Error('dubbele punt verwacht op ' + i + ': ' + src.slice(i - 20, i + 20));
      i++;
      waarde(sleutelPad(pad, k));
    }
  }
  function array(pad) {
    i++; // [
    let idx = 0;
    for (;;) {
      ws();
      if (src[i] === ']') { i++; return; }
      if (src[i] === ',') { i++; continue; }
      waarde(pad + '[' + idx + ']');
      idx++;
      ws();
      if (src[i] === ',') i++;
    }
  }
  waarde(padPrefix);
  return i;
}

function leesObject(src, ankerOffset) {
  const open = src.indexOf('{', ankerOffset);
  const bladeren = [];
  const eind = scan(src, open, '', bladeren);
  return { open, eind, bladeren };
}

// Splits bladeren van een object { NL: {...}, EN: {...} } naar taal.
// Geeft { CODE: { sleutel: 'nl'|'NL', bladeren: Map(pad → blad) } }.
function perTaal(bladeren, bestand) {
  const uit = {};
  for (const b of bladeren) {
    const m = /^([A-Za-z]{2})(?:[.[]|$)/.exec(b.pad);
    if (!m || !TALEN.includes(m[1].toUpperCase())) continue;
    const code = m[1].toUpperCase();
    if (!uit[code]) uit[code] = { sleutel: m[1], bladeren: new Map() };
    const rest = b.pad.slice(m[1].length).replace(/^\./, '');
    uit[code].bladeren.set(rest, Object.assign({}, b, { pad: rest, bestand }));
  }
  return uit;
}

function lees(bestand) { return fs.readFileSync(path.join(ROOT, bestand), 'utf8'); }

// Laadt één bron. Geeft { naam, talen: {CODE: {sleutel, bladeren}}, ... }.
function laadBron(bron) {
  if (bron.ankerPerTaal) {
    const talen = {};
    for (const bestand of bron.bestanden) {
      const src = lees(bestand);
      const re = new RegExp(bron.ankerPerTaal.source, bron.ankerPerTaal.flags);
      let m;
      while ((m = re.exec(src))) {
        const { bladeren } = leesObject(src, m.index);
        const t = perTaal(bladeren.map((b) => Object.assign({}, b, { pad: m[1] + (b.pad ? '.' + b.pad : '') })), bestand);
        Object.assign(talen, t);
      }
    }
    return Object.assign({}, bron, { talen });
  }
  const src = lees(bron.bestand);
  const off = src.indexOf(bron.anker);
  if (off < 0) throw new Error(`${bron.bestand}: anker '${bron.anker}' niet gevonden`);
  const { open, eind, bladeren } = leesObject(src, off);
  return Object.assign({}, bron, { open, eind, talen: perTaal(bladeren, bron.bestand) });
}

function laadAlles() { return BRONNEN.map(laadBron); }

// De spiegel: { CODE: Map(sleutel → { groep, waarde, start, eind, quote }) }
function laadSpiegel() {
  const src = lees(SPIEGEL.bestand);
  const { bladeren } = leesObject(src, src.indexOf(SPIEGEL.anker));
  const uit = {};
  const sleutels = {};
  for (const b of bladeren) {
    const m = /^([A-Z]{2})\.([^[]+|\["[^"]+"\])\[(\d+)\]\[(\d)\]$/.exec(b.pad);
    if (!m) continue;
    const [, code, groep, rij, kol] = m;
    const id = code + '|' + groep + '|' + rij;
    if (kol === '0') sleutels[id] = b.waarde;
    else {
      uit[code] = uit[code] || new Map();
      uit[code].set(sleutels[id], Object.assign({}, b, { groep, bestand: SPIEGEL.bestand }));
    }
  }
  return uit;
}

function isUitzondering(bron, pad) {
  return (bron.uitzonderingen || []).find((u) => u.re.test(pad)) || null;
}

module.exports = { ROOT, TALEN, BRONNEN, SPIEGEL, scan, leesObject, laadBron, laadAlles, laadSpiegel, isUitzondering, lees };
