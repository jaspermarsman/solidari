#!/usr/bin/env node
// Solidari — stap 1 van de vertaalronde (PLAN-7 fase 2): paren NL ↔ huidige vertaling.
//
//   node tools/vertaal/extract.js --taal ti [--uit <map>]
//
// Schrijft naar <uit> (standaard ../Solidari/_werkdocumenten/vertaal, of SOL_VERTAAL_MAP):
//   <taal>-paren.json      [{id, bestand, pad, nl, huidig, sjabloon?}]   → hervertalen + A/B
//   <taal>-nieuw.json      [{id, bestand, pad, nl}]                      → bestaat nog niet in deze taal
//   <taal>-structuur.json  [{id, bestand, pad, nl, huidig, reden}]       → niet te koppelen, naar stapel C
//
// Uitgesloten (regel §5.1 en B-9): alle `zeg`-velden, structuurvelden (id, type, emoji, icoon,
// kleur, link, …), bewuste uitzonderingen uit bronnen.js, lege waarden, alleen-getal/URL, en
// waarden die in deze taal letterlijk gelijk zijn aan NL zonder eigen schrift (namen als
// VluchtelingenWerk). `id` = stabiele hash van bron + pad.
//
// Sjabloonfuncties (budgethulp: (n)=>`… ${n} …`) gaan mee als tekst met {x1}, {x2}; de
// expressies zelf blijven buiten de prompt en worden bij toepassen teruggezet.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const B = require('./bronnen.js');

const STRUCTUUR = new Set(['zeg', 'id', 'type', 'emoji', 'icoon', 'kleur', 'badgeKleur', 'klasse', 'volgende',
  'link', 'url', 'alleenPad', 'infoAlleenPad', 'nr', 'naar', 'pad', 'href']);
// Niet in de vertaalronde: geen tekst (GETAL_WOORDEN, zie LOG fase 0)
const OVERSLAAN = new Set(['spraak.js (GETAL_WOORDEN)']);

// Tekst die nog nergens staat maar in dit plan nodig is (§6 fase 2 stap 1): de nav-labels voor
// fase 3 en de transparantieregel voor over.html (B-6). Gaat als nieuwe tekst mee in elke taal.
const EXTRA_NIEUW = [
  { bron: 'components.js (fase 3)', bestand: 'i18n.js', pad: 'a11y-taal-kiezen', nl: 'Taal kiezen' },
  { bron: 'components.js (fase 3)', bestand: 'i18n.js', pad: 'a11y-menu-openen', nl: 'Menu openen' },
  { bron: 'over.html (B-6)', bestand: 'over.html', pad: 'transparantie',
    nl: 'De vertalingen op Solidari zijn met AI gemaakt en door een tweede AI nagekeken. Een moedertaalspreker heeft ze nog niet beoordeeld. Zie je een fout? Help ons op de vertaalhulp-pagina.' },
];

function arg(naam, standaard) { const i = process.argv.indexOf('--' + naam); return i > 0 ? process.argv[i + 1] : standaard; }
const SCHRIFT = { TI: /[ሀ-፿]/, AR: /[؀-ۿ]/, FA: /[؀-ۿ]/, UK: /[Ѐ-ӿ]/ };

function hashId(bron, pad) { return crypto.createHash('sha1').update(bron + '\u0000' + pad).digest('hex').slice(0, 12); }
function laatsteSleutel(pad) { return pad.split(/[.[]/).pop().replace(/\]$/, '').replace(/^"|"$/g, ''); }
function geenTekst(s) { return /^\s*(-?[\d.,\s€%]+|https?:\/\/\S+|[\w.-]+\.html(#\S*)?)\s*$/.test(s); }

// (p)=>`tekst ${expr} tekst` → { kop: '(p)=>', tekst: 'tekst {x1} tekst', exprs: ['expr'] }
function sjabloon(raw) {
  const m = /^(\([^)]*\)\s*=>\s*|[A-Za-z_$][\w$]*\s*=>\s*)`([\s\S]*)`$/.exec(raw.trim());
  if (!m) return null;
  const exprs = [];
  const tekst = m[2].replace(/\$\{([^}]*)\}/g, (_, e) => { exprs.push(e.trim()); return `{x${exprs.length}}`; });
  if (/`|\$\{/.test(tekst)) return null;
  return { kop: m[1], tekst: tekst.replace(/\\n/g, '\n'), exprs };
}

// Lijsten waarvan de lengte in deze taal anders is dan in NL: posities daarbinnen horen niet bij elkaar.
function afwijkendeLijsten(nl, t) {
  const lengte = (m) => { const l = {}; for (const p of m.keys()) { const r = /^(.*)\[(\d+)\]/; let q = p; let mm; while ((mm = r.exec(q))) { l[mm[1]] = Math.max(l[mm[1]] || 0, +mm[2] + 1); q = mm[1]; } } return l; };
  const a = lengte(nl), b = lengte(t);
  return Object.keys(a).filter((k) => b[k] !== undefined && a[k] !== b[k]);
}

function extract(taal) {
  const TAAL = taal.toUpperCase();
  const paren = [], nieuw = [], structuur = [];
  for (const bron of B.laadAlles()) {
    if (OVERSLAAN.has(bron.naam) || !bron.talen.NL) continue;
    const nl = bron.talen.NL.bladeren;
    const t = bron.talen[TAAL] ? bron.talen[TAAL].bladeren : new Map();
    const zonderUitz = (m) => new Map([...m].filter(([p]) => !B.isUitzondering(bron, p)));
    const afwijkend = afwijkendeLijsten(zonderUitz(nl), zonderUitz(t));
    for (const [pad, b] of nl) {
      if (B.isUitzondering(bron, pad)) continue;
      if (STRUCTUUR.has(laatsteSleutel(pad))) continue;
      const v = t.get(pad);
      const id = hashId(bron.naam, pad);
      const bestand = (v || b).bestand;
      if (b.soort === 'expr') {
        const s = sjabloon(b.waarde);
        if (!s) continue;
        const sv = v && v.soort === 'expr' ? sjabloon(v.waarde) : null;
        if (!sv) { if (!v) nieuw.push({ id, bestand, bron: bron.naam, pad, nl: s.tekst, sjabloon: { kop: s.kop, exprs: s.exprs } }); continue; }
        if (JSON.stringify(sv.exprs.slice().sort()) !== JSON.stringify(s.exprs.slice().sort())) {
          structuur.push({ id, bestand, bron: bron.naam, pad, nl: s.tekst, huidig: sv.tekst, reden: 'sjabloon-expressies wijken af van NL' });
          continue;
        }
        // nummering van de vertaling gelijk aan NL zetten
        const huidig = v.waarde.trim().replace(/^[^`]*`|`$/g, '').replace(/\$\{([^}]*)\}/g, (_, e) => `{x${s.exprs.indexOf(e.trim()) + 1}}`).replace(/\\n/g, '\n');
        paren.push({ id, bestand, bron: bron.naam, pad, nl: s.tekst, huidig, sjabloon: { kop: sv.kop, exprs: s.exprs } });
        continue;
      }
      if (b.soort !== 'str' || !String(b.waarde).trim() || geenTekst(b.waarde)) continue;
      const lijst = afwijkend.find((l) => pad.startsWith(l + '['));
      if (bron.leegToegestaan && bron.leegToegestaan.re.test(pad)) continue;
      if (!v || (v.soort === 'str' && !String(v.waarde).trim())) {
        if (!lijst) nieuw.push({ id, bestand, bron: bron.naam, pad, nl: b.waarde });
        continue;
      }
      if (v.soort !== 'str') continue;
      if (v.waarde === b.waarde && !(SCHRIFT[TAAL] && SCHRIFT[TAAL].test(v.waarde))) continue;
      if (lijst) {
        structuur.push({ id, bestand, bron: bron.naam, pad, nl: b.waarde, huidig: v.waarde, reden: `lijst ${lijst} heeft in NL een andere lengte; positie ${pad.slice(lijst.length)} hoort niet bij dezelfde NL-zin` });
        continue;
      }
      paren.push({ id, bestand, bron: bron.naam, pad, nl: b.waarde, huidig: v.waarde });
    }
  }
  for (const e of EXTRA_NIEUW) nieuw.push(Object.assign({ id: hashId(e.bron, e.pad), extra: true }, e));
  return { paren, nieuw, structuur };
}

if (require.main === module) {
  const taal = arg('taal');
  if (!taal) { console.error('gebruik: extract.js --taal ti'); process.exit(2); }
  const uit = arg('uit', process.env.SOL_VERTAAL_MAP || path.resolve(B.ROOT, '..', 'Solidari', '_werkdocumenten', 'vertaal'));
  const { paren, nieuw, structuur } = extract(taal);
  const ids = new Set();
  for (const p of paren.concat(nieuw, structuur)) { if (ids.has(p.id)) throw new Error('dubbele id ' + p.id); ids.add(p.id); }
  fs.mkdirSync(uit, { recursive: true });
  const t = taal.toLowerCase();
  fs.writeFileSync(path.join(uit, `${t}-paren.json`), JSON.stringify(paren, null, 1));
  fs.writeFileSync(path.join(uit, `${t}-nieuw.json`), JSON.stringify(nieuw, null, 1));
  fs.writeFileSync(path.join(uit, `${t}-structuur.json`), JSON.stringify(structuur, null, 1));
  const perBron = {};
  for (const p of paren) perBron[p.bron] = (perBron[p.bron] || 0) + 1;
  console.log(`${taal.toUpperCase()}: ${paren.length} paren, ${nieuw.length} nieuw, ${structuur.length} niet te koppelen → ${uit}`);
  for (const [b, n] of Object.entries(perBron)) console.log(`  ${b.padEnd(28)} ${n}`);
}

module.exports = { extract, sjabloon, hashId };
