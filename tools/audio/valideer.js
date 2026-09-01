#!/usr/bin/env node
/**
 * Fase 2 — validatie. Controleert dat manifest ↔ bestanden ↔ tekstenlijsten
 * sluitend zijn, dat prioriteit 1–2 volledig aanwezig is, en houdt het
 * audiobudget (D-24) in de gaten.
 *
 * Exit 0 = groen, exit 1 = een taal faalt.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const AUDIO = path.join(ROOT, 'audio');
const TOOLS = __dirname;
const TALEN = ['NL', 'EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL'];
const BUDGET_TOTAAL_MB = 250;
const BUDGET_TAAL_MB = 30;

function mb(bytes) { return bytes / (1024 * 1024); }

function main() {
  let fouten = [];
  let totaalBytes = 0;
  const rijen = [];

  for (const taal of TALEN) {
    const code = taal.toLowerCase();
    const manifestPad = path.join(AUDIO, `manifest-${code}.json`);
    const tekstenPad = path.join(TOOLS, `teksten-${code}.json`);
    const dir = path.join(AUDIO, taal);

    if (!fs.existsSync(manifestPad)) { fouten.push(`${taal}: manifest ontbreekt`); continue; }
    if (!fs.existsSync(tekstenPad)) { fouten.push(`${taal}: tekstenlijst ontbreekt`); continue; }

    const manifest = JSON.parse(fs.readFileSync(manifestPad, 'utf8'));
    const teksten = JSON.parse(fs.readFileSync(tekstenPad, 'utf8'));
    const items = manifest.items || {};
    const bestanden = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.mp3')) : [];
    const bestandSet = new Set(bestanden.map(f => f.replace('.mp3', '')));

    // 1. elk manifest-item heeft een bestand
    for (const h of Object.keys(items)) if (!bestandSet.has(h)) fouten.push(`${taal}: manifest-hash ${h} zonder mp3`);
    // 2. elk bestand staat in het manifest
    for (const h of bestandSet) if (!(h in items)) fouten.push(`${taal}: mp3 ${h} niet in manifest`);
    // 3. prioriteit 1–2 volledig aanwezig — alleen voor talen die audio hóren te hebben.
    //    Na de MMS-uitfasering (PLAN-3 fase 3) heeft alleen TI voorgegenereerde clips:
    //    de andere acht talen hebben een browserstem en vallen daarop terug (besluit D-19/F1).
    //    Een leeg manifest ("bron": null) is dus geen fout maar de bedoelde toestand.
    if (manifest.bron) {
      const prio12 = teksten.filter(t => t.prioriteit <= 2);
      const ontbrekend = prio12.filter(t => !(t.hash in items));
      if (ontbrekend.length) fouten.push(`${taal}: ${ontbrekend.length} prio1-2 teksten zonder audio (bv. "${ontbrekend[0].tekst.slice(0, 30)}")`);
    } else if (Object.keys(items).length) {
      fouten.push(`${taal}: manifest zonder bron, maar wel ${Object.keys(items).length} items`);
    }

    // 4. steekproef 5 clips: duur > 0,5 s
    const hashes = Object.keys(items);
    const steekproef = hashes.slice(0, 5);
    for (const h of steekproef) {
      const d = items[h] && items[h].d;
      if (!(d > 0.5)) fouten.push(`${taal}: clip ${h} duur ${d}s ≤ 0,5s`);
    }

    // grootte
    let bytes = 0;
    for (const f of bestanden) bytes += fs.statSync(path.join(dir, f)).size;
    totaalBytes += bytes;
    if (mb(bytes) > BUDGET_TAAL_MB) fouten.push(`${taal}: ${mb(bytes).toFixed(1)} MB > ${BUDGET_TAAL_MB} MB`);

    rijen.push(`  ${taal}: ${bestanden.length} clips, ${mb(bytes).toFixed(2)} MB, bron=${manifest.bron}`);
  }

  // 5. TI moet audio hebben — dat is de taal zonder browserstem, dus zonder terugval.
  //    (uroman is vervallen met MMS: eSpeak NG heeft eigen Ge'ez-regels, PLAN-4 fase 2.)
  const tiManifest = path.join(AUDIO, 'manifest-ti.json');
  if (fs.existsSync(tiManifest)) {
    const ti = JSON.parse(fs.readFileSync(tiManifest, 'utf8'));
    if (ti.bron !== 'espeak') fouten.push(`TI: manifest-bron is "${ti.bron}", verwacht "espeak"`);
    if (!Object.keys(ti.items || {}).length) fouten.push('TI: geen clips — Tigrinya heeft geen browserstem als terugval');
  } else {
    fouten.push('TI: manifest-ti.json ontbreekt');
  }

  console.log('Validatie audiopijplijn:');
  rijen.forEach(r => console.log(r));
  console.log(`  TOTAAL: ${mb(totaalBytes).toFixed(2)} MB (budget ≤ ${BUDGET_TOTAAL_MB} MB)`);
  if (mb(totaalBytes) > BUDGET_TOTAAL_MB) fouten.push(`Totaal ${mb(totaalBytes).toFixed(1)} MB > ${BUDGET_TOTAAL_MB} MB`);

  if (fouten.length) {
    console.error('\nFOUTEN:');
    fouten.forEach(f => console.error('  ✗ ' + f));
    process.exit(1);
  }
  console.log('\n✓ Alles sluitend, binnen budget.');
}

main();
