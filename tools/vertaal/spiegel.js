#!/usr/bin/env node
// Solidari — de spiegel (vertaalhulp.html, VERTALINGEN) tegen de bron (AMENDEMENT beleefdheidsvorm, R2).
//
//   node tools/vertaal/spiegel.js [--detail] [--taal TI]
//   node tools/vertaal/spiegel.js --herstel --taal TI --sleutels bud-welkom,bud-overschot [--droog]
//
// vertaalhulp.html is waar moedertaalsprekers verbeteringen insturen; de tekst die ze daar zien moet
// de tekst zijn die op de site staat. Elke spiegelrij wordt gekoppeld aan één bronpad:
//   1. rechtstreeks: de sleutel (zonder groepsvoorvoegsel) bestaat als pad in de bron
//      (i18n, lw, bud-, brief-; bud-sit-<id> → sit_opties[i].l met die id; nat-r_x-titel → resultaten.r_x.titel);
//   2. anders via stemming (18-ouder-voor-x alleen onder ouder.voor.): het bronpad waarvan de waarde in de meeste talen letterlijk gelijk is aan
//      de spiegelrij (minstens twee talen, en eenduidig).
// Daarna per taal: spiegel ≠ bronwaarde = drift. Rijen zonder koppeling worden met reden genoemd.
// --herstel zet de spiegel gelijk aan de bron (nooit andersom), gericht per rij (§5.7).
'use strict';
const B = require('./bronnen.js');
const { Bewerkingen } = require('./bewerk.js');

function arg(naam, standaard) { const i = process.argv.indexOf('--' + naam); return i > 0 ? process.argv[i + 1] : standaard; }

const VOORVOEGSEL = [['bud-', 'budgethulp.html'], ['brief-', 'brief.html'], ['rechten-', 'rechten.html']];

function koppel() {
  const alle = B.laadAlles();
  const spiegel = B.laadSpiegel();
  const talen = Object.keys(spiegel);
  const sleutels = new Set();
  for (const m of Object.values(spiegel)) for (const k of m.keys()) sleutels.add(k);
  const nlPad = (bron, pad) => bron.talen.NL && bron.talen.NL.bladeren.get(pad) && bron.talen.NL.bladeren.get(pad).soort === 'str';
  // index per taal: waarde → [[bron, pad]]
  const index = {};
  for (const t of talen) {
    index[t] = new Map();
    for (const b of alle) {
      if (!b.talen[t]) continue;
      for (const [p, l] of b.talen[t].bladeren) {
        if (l.soort !== 'str') continue;
        if (!index[t].has(l.waarde)) index[t].set(l.waarde, []);
        index[t].get(l.waarde).push([b, p]);
      }
    }
  }
  const koppeling = new Map();
  for (const k of sleutels) {
    let gevonden = null;
    for (const b of alle) if (!gevonden && nlPad(b, k)) gevonden = { bron: b, pad: k, hoe: 'sleutel' };
    for (const [vv, naam] of VOORVOEGSEL) {
      if (gevonden || !k.startsWith(vv)) continue;
      const b = alle.find((x) => x.naam === naam);
      const rest = k.slice(vv.length);
      if (nlPad(b, rest)) gevonden = { bron: b, pad: rest, hoe: 'sleutel' };
      const sit = /^sit-(.+)$/.exec(rest);
      if (!gevonden && sit && naam === 'budgethulp.html') {
        for (const [p, l] of b.talen.NL.bladeren) {
          const m = /^sit_opties\[(\d+)\]\.id$/.exec(p);
          if (m && l.waarde === sit[1]) gevonden = { bron: b, pad: `sit_opties[${m[1]}].l`, hoe: 'sleutel' };
        }
      }
    }
    const nat = /^nat-(r_[a-z_]+)-(titel|sub)$/.exec(k);
    if (!gevonden && nat) {
      const b = alle.find((x) => x.naam === 'naturalisatie-data.js');
      const p = `resultaten.${nat[1]}.${nat[2]}`;
      if (nlPad(b, p)) gevonden = { bron: b, pad: p, hoe: 'sleutel' };
    }
    // 18-ouder-voor-x → alleen paden onder ouder.voor. (ouder- en kindtekst zijn soms gelijk)
    const hint = /^18-(ouder|kind)-(voor|op|na)-/.exec(k);
    const past = (b, p) => !hint || (b.naam.startsWith('18jaar-data') && p.startsWith(`${hint[1]}.${hint[2]}.`));
    // …of het laatste sleuteldeel staat in precies één NL-categorienaam in die tak
    if (!gevonden && hint) {
      const b = alle.find((x) => x.naam.startsWith('18jaar-data'));
      const woord = k.slice(hint[0].length).toLowerCase();
      const kand = [...b.talen.NL.bladeren].filter(([p, l]) => past(b, p) && /^[a-z]+\.[a-z]+\.categorieen\[\d+\]\.naam$/.test(p) && l.waarde.toLowerCase().includes(woord));
      if (kand.length === 1) gevonden = { bron: b, pad: kand[0][0], hoe: 'naam NL' };
    }
    if (!gevonden) {
      const stemmen = new Map();
      for (const t of talen) {
        const rij = spiegel[t].get(k);
        if (!rij) continue;
        for (const [b, p] of index[t].get(rij.waarde) || []) {
          if (!past(b, p)) continue;
          const id = b.naam + '\u0000' + p;
          if (!stemmen.has(id)) stemmen.set(id, { bron: b, pad: p, n: 0 });
          stemmen.get(id).n++;
        }
      }
      const rij = [...stemmen.values()].sort((a, b) => b.n - a.n);
      if (rij.length && rij[0].n >= (hint ? 1 : 2) && (rij.length === 1 || rij[1].n < rij[0].n)) gevonden = { bron: rij[0].bron, pad: rij[0].pad, hoe: `stemming ${rij[0].n}/${talen.length}` };
      else gevonden = { reden: rij.length ? `stemming niet eenduidig (${rij.slice(0, 3).map((x) => x.bron.naam + ' ' + x.pad + ':' + x.n).join(', ')})` : 'geen bronwaarde gelijk in welke taal dan ook' };
    }
    koppeling.set(k, gevonden);
  }
  return { koppeling, spiegel, talen };
}

function meet() {
  const { koppeling, spiegel, talen } = koppel();
  const drift = {}; const ongekoppeld = [];
  for (const [k, g] of koppeling) if (!g.bron) ongekoppeld.push({ sleutel: k, reden: g.reden });
  for (const t of talen) {
    drift[t] = [];
    for (const [k, rij] of spiegel[t]) {
      const g = koppeling.get(k);
      if (!g.bron) continue;
      const bt = g.bron.talen[t];
      const blad = bt && bt.bladeren.get(g.pad);
      if (!blad) { drift[t].push({ sleutel: k, bron: g.bron.naam, pad: g.pad, hoe: g.hoe, reden: 'bron heeft dit pad niet in deze taal', spiegel: rij.waarde, bronwaarde: null }); continue; }
      if (blad.waarde !== rij.waarde) drift[t].push({ sleutel: k, bron: g.bron.naam, pad: g.pad, hoe: g.hoe, spiegel: rij.waarde, bronwaarde: blad.waarde });
    }
  }
  return { koppeling, drift, ongekoppeld, talen };
}

if (require.main === module) {
  if (process.argv.includes('--herstel')) {
    const taal = arg('taal').toUpperCase();
    const welke = new Set(arg('sleutels').split(','));
    const { drift } = meet();
    const spiegel = B.laadSpiegel()[taal];
    const bw = new Bewerkingen();
    for (const d of drift[taal]) {
      if (!welke.has(d.sleutel) || d.bronwaarde == null) continue;
      bw.vervang(spiegel.get(d.sleutel), d.bronwaarde);
      console.log(`${taal} ${d.sleutel} ← ${d.bron} ${d.pad}`);
      welke.delete(d.sleutel);
    }
    if (welke.size) console.log('niet hersteld (geen drift of geen bronwaarde):', [...welke].join(', '));
    if (!process.argv.includes('--droog')) console.log('geschreven:', bw.pasToe().join(', '));
    process.exit(0);
  }
  const { koppeling, drift, ongekoppeld, talen } = meet();
  const alleen = arg('taal') ? [arg('taal').toUpperCase()] : talen;
  const hoe = {};
  for (const g of koppeling.values()) { const h = g.bron ? g.hoe.split(' ')[0] : 'geen'; hoe[h] = (hoe[h] || 0) + 1; }
  console.log(`spiegelsleutels: ${koppeling.size} · koppeling`, hoe);
  console.log('drift per taal: ' + alleen.map((t) => `${t} ${drift[t].length}`).join(' · '));
  if (process.argv.includes('--detail')) {
    for (const t of alleen) for (const d of drift[t]) console.log(`  ${t} ${d.sleutel} → ${d.bron} ${d.pad} (${d.hoe})${d.reden ? ' — ' + d.reden : ''}\n     spiegel: ${d.spiegel.slice(0, 110)}\n     bron:    ${(d.bronwaarde || '—').slice(0, 110)}`);
    for (const o of ongekoppeld) console.log(`  ongekoppeld ${o.sleutel}: ${o.reden}`);
  }
}

module.exports = { koppel, meet };
