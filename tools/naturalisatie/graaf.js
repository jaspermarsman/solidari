#!/usr/bin/env node
// graaf.js — laadt naturalisatie-data.js in Node en print per taal de graaf:
// vraag → antwoorden → volgende. Gebruik: node tools/naturalisatie/graaf.js [--taal NL]
//
// Bewaar de NL-uitvoer als tools/naturalisatie/graaf-voor.txt (fase 0, nulmeting)
// en tools/naturalisatie/graaf-na.txt (fase 3, na de inhoudswijziging).

const fs = require('fs');
const path = require('path');

const DATA_PAD = path.join(__dirname, '..', '..', 'naturalisatie-data.js');

function laadData() {
  global.window = global.window || {};
  const bron = fs.readFileSync(DATA_PAD, 'utf8');
  // eslint-disable-next-line no-new-func
  const fn = new Function('window', bron + '\nreturn { _NAT: window._NAT, _NAT_CONFIG: window._NAT_CONFIG };');
  return fn(global.window);
}

function printGraafVoorTaal(taalCode, taalData, out) {
  out.push(`=== ${taalCode} ===`);
  const vragen = taalData.vragen || {};
  const resultaten = taalData.resultaten || {};
  const vraagIds = Object.keys(vragen).sort();
  for (const id of vraagIds) {
    const v = vragen[id];
    out.push(`[V] ${id}: ${(v.tekst || '').replace(/\s+/g, ' ').slice(0, 90)}`);
    (v.antwoorden || []).forEach((a, i) => {
      const doel = a.volgende;
      const soort = resultaten[doel] ? 'R' : vragen[doel] ? 'V' : '???';
      out.push(`   [${i}] (${a.klasse || '-'}) → ${soort}:${doel}   "${(a.tekst || '').replace(/\s+/g, ' ').slice(0, 60)}"`);
    });
  }
  out.push('');
  const resIds = Object.keys(resultaten).sort();
  for (const id of resIds) {
    const r = resultaten[id];
    const interneLink = r.interneLink ? ` interneLink→${r.interneLink.naar}` : '';
    out.push(`[R] ${id}: type=${r.type} icoon=${r.icoon} titel="${(r.titel || '').slice(0, 70)}"${interneLink}`);
  }
  out.push('');
  return out;
}

function main() {
  const args = process.argv.slice(2);
  let taalFilter = null;
  const idx = args.indexOf('--taal');
  if (idx !== -1 && args[idx + 1]) taalFilter = args[idx + 1].toUpperCase();

  const data = laadData();
  const NAT = data._NAT;
  if (!NAT) {
    console.error('Kan window._NAT niet vinden in naturalisatie-data.js');
    process.exit(1);
  }
  const talen = taalFilter ? [taalFilter] : Object.keys(NAT);
  const out = [];
  for (const taal of talen) {
    if (!NAT[taal]) {
      console.error(`Taal ${taal} bestaat niet in _NAT`);
      process.exit(1);
    }
    printGraafVoorTaal(taal, NAT[taal], out);
  }
  console.log(out.join('\n'));
}

main();
