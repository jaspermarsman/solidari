#!/usr/bin/env node
// Solidari — rapport van de nieuwe tekst in de andere talen (PLAN-7 fase 2b en B-7).
//
//   node tools/vertaal/rapport-nieuw.js [--talen en,ar,tr,uk,fa,ro,pl]
//
// Per taal: wat nog niet bestond, het voorstel, de machinecontroles en de terugvertaling.
// Bruikbaar = controles groen én terugvertaling inhoudelijk gelijk. Schrijft RAPPORT-nieuw-gemini.md.
'use strict';
const fs = require('fs');
const path = require('path');

function arg(naam, standaard) { const i = process.argv.indexOf('--' + naam); return i > 0 ? process.argv[i + 1] : standaard; }
const talen = arg('talen', 'en,ar,tr,uk,fa,ro,pl').split(',');
const map = arg('map', process.env.SOL_VERTAAL_MAP || path.resolve(__dirname, '..', '..', '..', 'Solidari', '_werkdocumenten', 'vertaal'));
const lees = (n) => JSON.parse(fs.readFileSync(path.join(map, n), 'utf8'));
const esc = (s) => String(s == null ? '' : s).replace(/\n/g, '⏎ ');

const md = ['# RAPPORT — nieuwe tekst in de andere talen (PLAN-7 fase 2b, B-7)', ''];
const samen = ['| taal | nieuw | bruikbaar | niet bruikbaar |', '|---|---|---|---|'];
const delen = [];
for (const t of talen) {
  const nieuw = lees(`${t}-nieuw.json`);
  const g = lees(`${t}-gemini.json`);
  const gem = new Map(g.items.map((x) => [x.id, x[t]]));
  const c = new Map(lees(`${t}-controle.json`).map((x) => [x.id, x]));
  const r = new Map(lees(`${t}-terug.json`).items.map((x) => [x.id, x]));
  const niet = [];
  let ok = 0;
  for (const x of nieuw) {
    const cc = c.get(x.id), rr = r.get(x.id);
    if (cc && cc.geslaagd && rr && rr.oordeel === 'gelijk') { ok++; continue; }
    niet.push({ x, cc, rr });
  }
  samen.push(`| ${t.toUpperCase()} | ${nieuw.length} | ${ok} | ${niet.length} |`);
  delen.push(`## ${t.toUpperCase()} — model \`${g.model}\`, ${g.datum}`, '');
  for (const { x, cc, rr } of niet) {
    delen.push(`**${x.bron} · \`${x.pad}\`** — niet bruikbaar`, '', `- NL: ${esc(x.nl)}`, `- voorstel: ${esc(gem.get(x.id))}`,
      `- machinecontrole: ${cc && cc.gezakt_op.length ? cc.gezakt_op.join(', ') : 'groen'}`,
      `- terugvertaling: ${rr ? esc(rr.terug) + ' — **' + rr.oordeel + '**' + (rr.reden ? ' (' + esc(rr.reden) + ')' : '') : '—'}`, '');
  }
  const extra = nieuw.filter((x) => x.extra);
  if (extra.length) {
    delen.push('Voor fase 3 en 6 (nog niet toegepast):', '');
    for (const x of extra) delen.push(`- \`${x.pad}\`: ${esc(gem.get(x.id))}`);
    delen.push('');
  }
}
md.push(...samen, '', ...delen);
fs.writeFileSync(path.join(map, 'RAPPORT-nieuw-gemini.md'), md.join('\n'));
console.log(samen.join('\n'));
