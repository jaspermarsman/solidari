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
    // 3. prioriteit 1–2 volledig aanwezig
    const prio12 = teksten.filter(t => t.prioriteit <= 2);
    const ontbrekend = prio12.filter(t => !(t.hash in items));
    if (ontbrekend.length) fouten.push(`${taal}: ${ontbrekend.length} prio1-2 teksten zonder audio (bv. "${ontbrekend[0].tekst.slice(0, 30)}")`);

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

  // 5. TI-romanisatielog aanwezig
  const uromanLog = path.join(TOOLS, 'uroman-ti.log');
  if (!fs.existsSync(uromanLog) || !fs.readFileSync(uromanLog, 'utf8').trim()) {
    fouten.push('TI: romanisatie-log (uroman-ti.log) ontbreekt of leeg');
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
