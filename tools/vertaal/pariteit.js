// Solidari — pariteit over alle taalbronnen (PLAN-7 fase 0).
// Per bron en per taal: welke diepe sleutelpaden uit NL ontbreken (of leeg zijn), en welke
// paden er extra zijn. Daarnaast de spiegel in vertaalhulp.html: ontbrekende sleutels per taal
// en of elke getoonde "huidige vertaling" nog letterlijk in een bronbestand staat.
// Aanroepen via: node tools/test/i18n-pariteit.js --alles [--detail]
'use strict';
const B = require('./bronnen.js');

const ANDERE = B.TALEN.filter((t) => t !== 'NL');
const NL_WOORDEN = /[\s(](de|het|een|van|voor|je|niet|naar|wordt|zijn|op)[\s,.:)]/i;

function leeg(b) { return b.soort === 'str' && String(b.waarde).trim() === ''; }

// Pad ingekort tot `diepte` segmenten (voor lexicons waar de diepere sleutels zelf taal zijn).
function kort(pad, diepte) { return diepte ? pad.split(/[.[]/).slice(0, diepte).join('.') : pad; }
function inkorten(map, diepte) {
  if (!diepte) return map;
  const uit = new Map();
  for (const [pad, b] of map) if (!uit.has(kort(pad, diepte))) uit.set(kort(pad, diepte), b);
  return uit;
}

function meet() {
  const bronnen = B.laadAlles();
  const rijen = [];
  const uitzonderingen = [];
  for (const bron of bronnen) {
    const nl = bron.talen.NL && { bladeren: inkorten(bron.talen.NL.bladeren, bron.diepte) };
    const rij = { naam: bron.naam, nl: 0, ontbrekend: {}, extra: {} };
    if (!nl) { rij.fout = 'geen NL-blok gevonden'; rijen.push(rij); continue; }
    const nlPaden = [];
    let uitgezonderd = 0;
    for (const [pad, b] of nl.bladeren) {
      const u = B.isUitzondering(bron, pad);
      if (u) { uitgezonderd++; continue; }
      nlPaden.push([pad, b]);
    }
    if (uitgezonderd) {
      for (const u of bron.uitzonderingen) uitzonderingen.push({ bron: bron.naam, wat: String(u.re), reden: u.reden, paden: uitgezonderd });
    }
    rij.nl = nlPaden.length;
    if (bron.extraToegestaan) uitzonderingen.push({ bron: bron.naam, wat: 'extra ' + bron.extraToegestaan.re, reden: bron.extraToegestaan.reden, paden: '—' });
    if (bron.leegToegestaan) uitzonderingen.push({ bron: bron.naam, wat: 'leeg mag: ' + bron.leegToegestaan.re, reden: bron.leegToegestaan.reden, paden: '—' });
    const talen = bron.alleenTalen ? bron.alleenTalen.filter((t) => t !== 'NL') : ANDERE;
    if (bron.alleenTalen) {
      uitzonderingen.push({ bron: bron.naam, wat: 'alleen ' + bron.alleenTalen.join(', '), reden: bron.redenAlleenTalen, paden: nlPaden.length * (ANDERE.length - talen.length) });
    }
    for (const taal of ANDERE) {
      if (!talen.includes(taal)) { rij.ontbrekend[taal] = null; continue; }
      const t = bron.talen[taal] && { bladeren: inkorten(bron.talen[taal].bladeren, bron.diepte) };
      const mist = [];
      const extra = [];
      for (const [pad, b] of nlPaden) {
        const v = t && t.bladeren.get(pad);
        const leegMag = bron.leegToegestaan && bron.leegToegestaan.re.test(pad);
        if (!v || (leeg(v) && !leeg(b) && !leegMag)) mist.push(pad);
      }
      if (t) for (const pad of t.bladeren.keys()) if (!nl.bladeren.has(pad) && !B.isUitzondering(bron, pad)
        && !(bron.extraToegestaan && bron.extraToegestaan.re.test(pad))) extra.push(pad);
      rij.ontbrekend[taal] = mist;
      rij.extra[taal] = extra;
      // Stil Nederlands: een lange waarde die letterlijk gelijk is aan NL en Nederlandse
      // functiewoorden bevat. Geen gat (de sleutel is er), wel een signaal.
      rij.nlIdentiek = rij.nlIdentiek || {};
      rij.nlIdentiek[taal] = [];
      if (t && taal !== 'NL') for (const [pad, b] of nlPaden) {
        const v = t.bladeren.get(pad);
        if (v && b.soort === 'str' && v.waarde === b.waarde && !/\.zeg$/.test(pad)
          && b.waarde.length > 20 && NL_WOORDEN.test(' ' + b.waarde.replace(/<[^>]+>/g, ' ') + ' ')) rij.nlIdentiek[taal].push(pad);
      }
    }
    rijen.push(rij);
  }

  // Spiegel
  const spiegel = B.laadSpiegel();
  const alleSleutels = new Set();
  for (const m of Object.values(spiegel)) for (const k of m.keys()) alleSleutels.add(k);
  const bronWaarden = {};
  for (const bron of bronnen) for (const [taal, t] of Object.entries(bron.talen)) {
    bronWaarden[taal] = bronWaarden[taal] || new Set();
    for (const b of t.bladeren.values()) if (b.soort === 'str') bronWaarden[taal].add(b.waarde);
  }
  const spiegelRij = { naam: B.SPIEGEL.naam, nl: alleSleutels.size, ontbrekend: { }, extra: {}, afwijkend: {} };
  for (const taal of ANDERE) {
    const m = spiegel[taal] || new Map();
    spiegelRij.ontbrekend[taal] = [...alleSleutels].filter((k) => !m.has(k));
    spiegelRij.extra[taal] = [];
    spiegelRij.afwijkend[taal] = [...m.entries()].filter(([, b]) => !(bronWaarden[taal] || new Set()).has(b.waarde)).map(([k]) => k);
  }
  return { rijen, spiegel: spiegelRij, uitzonderingen };
}

function cli(args) {
  const detail = args.includes('--detail');
  const { rijen, spiegel, uitzonderingen } = meet();
  const cel = (x) => (x === null ? '—' : x.length ? String(x.length) : '·').padStart(5);
  console.log('Ontbrekende sleutelpaden t.o.v. NL (· = geen, — = bewust niet aanwezig, zie onderaan)\n');
  console.log('bron'.padEnd(30) + 'NL'.padStart(6) + ANDERE.map((t) => t.padStart(5)).join(''));
  let gaten = 0;
  for (const r of rijen.concat([spiegel])) {
    if (r.fout) { console.log(r.naam.padEnd(30) + '  FOUT: ' + r.fout); gaten++; continue; }
    console.log(r.naam.padEnd(30) + String(r.nl).padStart(6) + ANDERE.map((t) => cel(r.ontbrekend[t])).join(''));
    for (const t of ANDERE) gaten += (r.ontbrekend[t] || []).length;
  }
  console.log('\n(spiegel: NL-kolom = aantal sleutels over alle talen samen; de spiegel heeft zelf geen NL)');

  const metExtra = rijen.concat([spiegel]).filter((r) => ANDERE.some((t) => (r.extra[t] || []).length));
  if (metExtra.length) {
    console.log('\nWAARSCHUWING — paden die wél in een taal staan maar niet in NL (verouderd of NL ingekort):');
    for (const r of metExtra) for (const t of ANDERE) if ((r.extra[t] || []).length) {
      console.log(`  ${r.naam} ${t}: ${r.extra[t].length}` + (detail ? '\n    ' + r.extra[t].join('\n    ') : ` (${r.extra[t].slice(0, 3).join(', ')}${r.extra[t].length > 3 ? ', …' : ''})`));
    }
  }
  const stil = rijen.filter((r) => r.nlIdentiek && ANDERE.some((t) => (r.nlIdentiek[t] || []).length));
  if (stil.length) {
    console.log('\nWAARSCHUWING — waarde letterlijk gelijk aan NL (stil Nederlands in een andere taal):');
    for (const r of stil) for (const t of ANDERE) if ((r.nlIdentiek[t] || []).length) {
      const g = r.nlIdentiek[t];
      console.log(`  ${r.naam} ${t}: ${g.length}` + (detail ? '\n    ' + g.join('\n    ') : ` (${g.slice(0, 3).join(', ')}${g.length > 3 ? ', …' : ''})`));
    }
  }
  const afw = ANDERE.map((t) => [t, spiegel.afwijkend[t].length]);
  console.log('\nSpiegel gelijk aan de bron (waarde staat letterlijk in een bronbestand van die taal):');
  console.log('  ' + afw.map(([t, n]) => `${t} ${n ? n + ' afwijkend' : 'gelijk'}`).join(' · '));
  if (detail) for (const t of ANDERE) if (spiegel.afwijkend[t].length) console.log(`  ${t}: ${spiegel.afwijkend[t].join(', ')}`);

  if (gaten) {
    console.log('\nOntbrekend in detail:');
    for (const r of rijen.concat([spiegel])) for (const t of ANDERE) {
      const g = r.ontbrekend[t];
      if (!g || !g.length) continue;
      const toon = detail ? g : g.slice(0, 8);
      console.log(`  ${r.naam} ${t} (${g.length}): ${toon.join(', ')}${g.length > toon.length ? ', …' : ''}`);
    }
  }
  console.log('\nUitzonderingen (tellen niet als gat):');
  for (const u of uitzonderingen) console.log(`  ${u.bron} — ${u.wat} (${u.paden} paden): ${u.reden}`);
  console.log(`\nRESULTAAT: ${gaten ? 'FOUT (' + gaten + ' ontbrekende paden)' : 'GROEN'}`);
  return gaten ? 1 : 0;
}

module.exports = { meet, cli };
