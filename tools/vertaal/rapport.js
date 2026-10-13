#!/usr/bin/env node
// Solidari — stap 5 van de vertaalronde (PLAN-7 fase 2): het leesbare rapport.
//
//   node tools/vertaal/rapport.js --taal ti
//
// Drie stapels (B-3):
//   A — Gemini wint, ernst "verwarrend" of "fout", machinecontroles groen   → toepassen (na W-D)
//   B — gelijkwaardig, of Gemini wint alleen cosmetisch                     → niets doen
//   C — huidige wint, twijfel (omgeklapt in de herhaalsteekproef), gezakt op een
//       machinecontrole, of niet te koppelen aan NL                         → native-reviewlijst
// Plus: nieuwe tekst (geen A/B; terugvertaling als controle).
// Bovenaan: tellingen, model, datum, herhaalsteekproef en de afbreekcriteria uit §10.
// Schrijft RAPPORT-<taal>-gemini.md en <taal>-stapels.json (invoer voor pas-toe.js).
'use strict';
const fs = require('fs');
const path = require('path');

function arg(naam, standaard) { const i = process.argv.indexOf('--' + naam); return i > 0 ? process.argv[i + 1] : standaard; }
const taal = arg('taal');
const map = arg('map', process.env.SOL_VERTAAL_MAP || path.resolve(__dirname, '..', '..', '..', 'Solidari', '_werkdocumenten', 'vertaal'));
const lees = (n, leeg) => (fs.existsSync(path.join(map, n)) ? JSON.parse(fs.readFileSync(path.join(map, n), 'utf8')) : leeg);

const paren = lees(`${taal}-paren.json`, []);
const nieuw = lees(`${taal}-nieuw.json`, []);
const structuur = lees(`${taal}-structuur.json`, []);
const gemini = lees(`${taal}-gemini.json`, { items: [] });
const oordeel = lees(`${taal}-oordeel.json`, { items: [], steekproef: {} });
const controle = new Map(lees(`${taal}-controle.json`, []).map((x) => [x.id, x]));
const terug = new Map(lees(`${taal}-terug.json`, { items: [] }).items.map((x) => [x.id, x]));
const gem = new Map(gemini.items.map((x) => [x.id, x[taal]]));
const oord = new Map(oordeel.items.map((x) => [x.id, x]));

const stapels = { A: [], B: [], C: [], nieuw: [] };
for (const p of paren) {
  const o = oord.get(p.id);
  const c = controle.get(p.id) || { geslaagd: false, gezakt_op: ['niet gecontroleerd'] };
  const rec = Object.assign({}, p, { voorstel: gem.get(p.id), oordeel: o || null, controle: c });
  if (!o) { rec.soort = 'geen oordeel'; stapels.C.push(rec); continue; }
  if (!c.geslaagd) { rec.soort = 'machinecontrole: ' + c.gezakt_op.join(', '); stapels.C.push(rec); continue; }
  if (o.omgeklapt) { rec.soort = 'twijfel: keuze klapte om in de herhaalsteekproef'; stapels.C.push(rec); continue; }
  if (o.winnaar === 'huidig') { rec.soort = `huidige wint (${o.ernst})`; stapels.C.push(rec); continue; }
  if (o.winnaar === 'gemini' && (o.ernst === 'verwarrend' || o.ernst === 'fout')) { rec.soort = `Gemini wint (${o.ernst})`; stapels.A.push(rec); continue; }
  if (o.winnaar === 'gelijk' || (o.winnaar === 'gemini' && o.ernst === 'cosmetisch')) { rec.soort = o.winnaar === 'gelijk' ? 'gelijkwaardig' : 'Gemini wint (cosmetisch)'; stapels.B.push(rec); continue; }
  rec.soort = `onduidelijk oordeel (${o.keuze}/${o.ernst})`; stapels.C.push(rec);
}
for (const s of structuur) stapels.C.push(Object.assign({}, s, { voorstel: gem.get(s.id), soort: 'niet te koppelen: ' + s.reden }));
for (const n of nieuw) {
  const c = controle.get(n.id) || { geslaagd: false, gezakt_op: ['niet gecontroleerd'] };
  const t = terug.get(n.id);
  const ok = c.geslaagd && t && t.oordeel === 'gelijk';
  stapels.nieuw.push(Object.assign({}, n, { voorstel: gem.get(n.id), controle: c, terug: t || null, bruikbaar: ok }));
}

// §10 afbreekcriteria
const st = oordeel.steekproef || {};
const voorstellen = [...controle.values()];
const gezaktAandeel = voorstellen.length ? voorstellen.filter((x) => !x.geslaagd).length / voorstellen.length : 0;
const aAandeel = paren.length ? stapels.A.length / paren.length : 0;
const criteria = [
  { nr: 1, wat: 'herhaalsteekproef klapt om bij > 30%', waarde: st.aandeel, rood: st.aandeel > 0.30 },
  { nr: 2, wat: 'stapel A > 40% van alle paren', waarde: aAandeel, rood: aAandeel > 0.40 },
  { nr: 3, wat: 'machinecontrole faalt op > 10% van de voorstellen', waarde: gezaktAandeel, rood: gezaktAandeel > 0.10 },
];
const stop = criteria.some((c) => c.rood);

// Diagnose lengte (§10.3 duiden): is het voorstel de uitschieter, of de huidige vertaling?
// Typische verhouding vertaling/NL = mediaan over alle paren. Een lengtefout waarbij het voorstel
// dicht bij die mediaan zit en de huidige ver eronder, wijst op een ingekorte huidige vertaling.
const mediaan = (xs) => { const a = xs.slice().sort((x, y) => x - y); return a.length ? a[Math.floor(a.length / 2)] : 1; };
const typisch = mediaan(paren.filter((p) => p.nl.length >= 20).map((p) => p.huidig.length / p.nl.length));
const lengteFouten = paren.filter((p) => (controle.get(p.id) || { gezakt_op: [] }).gezakt_op.some((g) => g.startsWith('lengte')));
const diag = { huidigKort: [], voorstelLang: [], anders: [] };
for (const p of lengteFouten) {
  const v = gem.get(p.id) || '';
  const rv = v.length / p.nl.length / typisch, rh = p.huidig.length / p.nl.length / typisch;
  const rec = { p, rv, rh };
  if (rh < 0.6 && rv >= 0.6 && rv <= 1.6) diag.huidigKort.push(rec);
  else if (rv > 1.6 && rh >= 0.6) diag.voorstelLang.push(rec);
  else diag.anders.push(rec);
}
const pct = (x) => (x == null ? '—' : (100 * x).toFixed(1) + '%');
const esc = (s) => String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\n/g, '⏎ ');
function blok(r, metOordeel = true) {
  const regels = [`**${r.bron} · \`${r.pad}\`** — ${r.soort || ''}`, '', `- NL: ${esc(r.nl)}`];
  if (r.huidig !== undefined) regels.push(`- huidig: ${esc(r.huidig)}`);
  regels.push(`- voorstel: ${esc(r.voorstel)}`);
  if (metOordeel && r.oordeel) regels.push(`- oordeel: ${r.oordeel.winnaar} · ${r.oordeel.ernst} — ${esc(r.oordeel.reden)}`);
  if (r.controle && !r.controle.geslaagd) regels.push(`- machinecontrole voorstel: ${r.controle.gezakt_op.join(', ')}`);
  if (r.controle && r.controle.huidig_gezakt_op && r.controle.huidig_gezakt_op.length) regels.push(`- machinecontrole huidig: ${r.controle.huidig_gezakt_op.join(', ')}`);
  if (r.terug) regels.push(`- terugvertaling: ${esc(r.terug.terug)} — **${r.terug.oordeel}**${r.terug.reden ? ' (' + esc(r.terug.reden) + ')' : ''}`);
  return regels.join('\n') + '\n';
}
function perBron(lijst) { const t = {}; for (const r of lijst) t[r.bron] = (t[r.bron] || 0) + 1; return Object.entries(t).map(([b, n]) => `${b} ${n}`).join(' · '); }
function telSoort(lijst) { const t = {}; for (const r of lijst) { const k = r.soort.split(':')[0].replace(/ \(.*/, ''); t[k] = (t[k] || 0) + 1; } return Object.entries(t).map(([k, n]) => `${k} ${n}`).join(' · '); }

const gebruik = [gemini.gebruik, oordeel.gebruik, lees(`${taal}-terug.json`, {}).gebruik].filter(Boolean)
  .reduce((a, g) => ({ in: a.in + (g.in || 0), uit: a.uit + (g.uit || 0) }), { in: 0, uit: 0 });

const md = [];
md.push(`# RAPPORT — tweede-modelronde ${taal.toUpperCase()} (PLAN-7 fase 2)`, '');
md.push(`- **Model:** \`${gemini.model}\` (hervertalen, temperature ${gemini.temperature}) · \`${oordeel.model}\` (oordeel, temperature 0) · datum ${gemini.datum}`);
md.push(`- **Seed A/B-volgorde:** ${oordeel.seed}`);
md.push(`- **Paren beoordeeld:** ${paren.length} (uniek naar het model: ${gemini.uniek} NL-teksten vertaald) · nieuw: ${nieuw.length} · niet te koppelen: ${structuur.length}`);
md.push(`- **Herhaalsteekproef:** ${st.n} paren met A/B omgewisseld, ${st.omgeklapt} omgeklapt (${pct(st.aandeel)}), waarvan ${st.hard_omgeklapt} van Gemini↔huidig`);
md.push(`- **Tokens:** in ${gebruik.in}, uit ${gebruik.uit}`);
md.push('', '| stapel | aantal | betekenis |', '|---|---|---|');
md.push(`| **A** | **${stapels.A.length}** (${pct(aAandeel)}) | toepassen na akkoord (W-D) |`);
md.push(`| B | ${stapels.B.length} | niets doen |`);
md.push(`| C | ${stapels.C.length} | native-reviewlijst |`);
md.push(`| nieuw | ${stapels.nieuw.length} (${stapels.nieuw.filter((x) => x.bruikbaar).length} bruikbaar) | bestond nog niet in deze taal |`);
md.push('', '**Afbreekcriteria §10**', '', '| # | criterium | gemeten | |', '|---|---|---|---|');
for (const c of criteria) md.push(`| ${c.nr} | ${c.wat} | ${pct(c.waarde)} | ${c.rood ? '🔴 STOP' : 'groen'} |`);
md.push('', stop ? '> **Een afbreekcriterium is rood. Stapel A wordt NIET toegepast; eerst twintig gevallen met de hand bekijken (§10).**' : '> Geen afbreekcriterium rood.', '');
// Aandachtspunten die geen afbreekcriterium zijn maar wel een besluit vragen
const echt = oordeel.items.filter((x) => !x.dubbel_van && x.a_is);
const winst = (w) => echt.filter((x) => x.winnaar === w).length;
const alsA = echt.filter((x) => x.a_is === 'gemini'), alsB = echt.filter((x) => x.a_is === 'huidig');
const wintPct = (l) => pct(l.length ? l.filter((x) => x.winnaar === 'gemini').length / l.length : null);
const MV = /[\u1200-\u137F]\/[\u1200-\u137F]/;
const mvWeg = (l) => l.filter((x) => MV.test(x.huidig || '') && !MV.test(x.voorstel || '')).length;
md.push('## Voor jou om te beslissen vóór stapel A', '');
md.push(`1. **Zelfvoorkeur niet uit te sluiten.** Vertaler en beoordelaar zijn hetzelfde model (B-1). Van de ${echt.length} paren die naar het model gingen won Gemini er ${winst('gemini')}, de huidige ${winst('huidig')}, gelijk ${winst('gelijk')}. Positie speelt geen rol (Gemini wint ${wintPct(alsA)} als A, ${wintPct(alsB)} als B), maar of het model zijn eigen stijl voortrekt, meet deze opzet niet. Een kleine controle met een ander model of een mens op twintig A-gevallen zou dat uitsluiten.`);
md.push(`2. **Mannelijke en vrouwelijke aanspreekvorm.** De huidige TI schrijft vaak beide vormen (ትቕበል/ትቕበሊ). Gemini laat de vrouwelijke vorm weg. Stapel A zou dat in **${mvWeg(stapels.A)}** strings doen; in stapel B (${mvWeg(stapels.B)}) en C (${mvWeg(stapels.C)}) blijft de schuine streep staan. Toepassen zonder besluit maakt de site dus ongelijk. Kies: (a) alleen mannelijk overal — dan ook B nalopen; (b) m/v houden — dan deze ${mvWeg(stapels.A)} voorstellen eerst opnieuw laten maken met die eis in prompt A; (c) zo toepassen en accepteren dat het gemengd is.`);
md.push(`3. **Regelingnamen in het Nederlands.** Gemini laat namen als Huurtoeslag, Zorgtoeslag en Kinderopvangtoeslag onvertaald (regel 4 noemt alleen "toeslag"). Die zakken op de schriftcontrole en staan in C.`, '');
md.push('**Diagnose lengtefouten** (factor 2 t.o.v. de huidige vertaling)', '');
md.push(`Typische lengte ${taal.toUpperCase()}/NL (mediaan over de paren): ${typisch.toFixed(2)}. Van de ${lengteFouten.length} lengtefouten:`);
md.push(`- ${diag.huidigKort.length} — voorstel normaal lang, **huidige vertaling veel korter dan normaal** (wijst op weggelaten tekst in de huidige)`);
md.push(`- ${diag.voorstelLang.length} — voorstel veel langer dan normaal (wijst op toevoegingen in het voorstel)`);
md.push(`- ${diag.anders.length} — overig (korte strings, of beide afwijkend)`, '');
md.push(`Stapel A per bron: ${perBron(stapels.A) || '—'}`, '', `Stapel C naar soort: ${telSoort(stapels.C) || '—'}`, '');
md.push('---', '', `## Stapel A — toepassen (${stapels.A.length})`, '');
for (const r of stapels.A) md.push(blok(r));
md.push('---', '', `## Nieuwe tekst (${stapels.nieuw.length})`, '', 'Geen A/B mogelijk. Bruikbaar = machinecontroles groen én terugvertaling inhoudelijk gelijk.', '');
for (const r of stapels.nieuw) md.push(blok(Object.assign({}, r, { soort: r.bruikbaar ? 'bruikbaar' : 'NIET bruikbaar → reviewlijst' }), false));
md.push('---', '', `## Stapel C — naar de native-reviewlijst (${stapels.C.length})`, '');
for (const r of stapels.C) md.push(blok(r));
md.push('---', '', `## Stapel B — niets doen (${stapels.B.length})`, '', '<details><summary>Toon stapel B</summary>', '');
for (const r of stapels.B) md.push(blok(r));
md.push('</details>', '');

fs.writeFileSync(path.join(map, `RAPPORT-${taal}-gemini.md`), md.join('\n'));
fs.writeFileSync(path.join(map, `${taal}-stapels.json`), JSON.stringify({ stop, criteria, stapels }, null, 1));
console.log(`A ${stapels.A.length} · B ${stapels.B.length} · C ${stapels.C.length} · nieuw ${stapels.nieuw.length} · ${stop ? 'AFBREEKCRITERIUM ROOD' : 'criteria groen'}`);
for (const c of criteria) console.log(`  §10.${c.nr} ${c.wat}: ${pct(c.waarde)}${c.rood ? '  ROOD' : ''}`);
