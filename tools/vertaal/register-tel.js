#!/usr/bin/env node
// Solidari — tellingen voor de registeromzetting Tigrinya (AMENDEMENT beleefdheidsvorm, R1.1/R1.4).
//
//   node tools/vertaal/register-tel.js [--json]
//
// Per bron (en de spiegel): TI-teksten met Ge'ez, teksten met een tweede-persoon-enkelvoud-
// achtervoegsel (ካ/ኻ/ኪ/ኺ aan het eind van een woord, eventueel met ን/ውን/ዶ erachter) en teksten
// met de beleefde meervoudsvorm (ኹም/ኩም, idem). Gewone strings én sjablonen; `zeg` niet.
// Dit zijn SIGNALEN, geen bewijs (A-6): ካ aan een woordeinde is niet altijd een achtervoegsel
// (ፖለቲካ, ኣመሪካ) en vervoegingen zonder achtervoegsel (ትኽእል) tellen niet mee.
'use strict';
const B = require('./bronnen.js');

const GEEZ = /[ሀ-፿]/;
const ENKELVOUD = /(ካ|ኻ|ኪ|ኺ)(ን|ውን|ዶ)?(?![ሀ-ፚ])/;
const MEERVOUD = /(ኹም|ኩም)(ን|ውን|ዶ)?(?![ሀ-ፚ])/;
const isZeg = (pad) => /(^|\.)zeg$/.test(pad);

function teksten() {
  const uit = [];
  for (const b of B.laadAlles()) {
    const t = b.talen.TI;
    if (!t) continue;
    for (const [pad, l] of t.bladeren) {
      if ((l.soort !== 'str' && l.soort !== 'expr') || isZeg(pad) || !GEEZ.test(l.waarde)) continue;
      uit.push({ bron: b.naam, pad, waarde: l.waarde });
    }
  }
  for (const [sleutel, l] of B.laadSpiegel().TI) if (GEEZ.test(l.waarde)) uit.push({ bron: 'spiegel (vertaalhulp.html)', pad: sleutel, waarde: l.waarde });
  return uit;
}

function tel() {
  const per = {};
  for (const x of teksten()) {
    const r = per[x.bron] || (per[x.bron] = { teksten: 0, enkelvoud: 0, meervoud: 0 });
    r.teksten++;
    if (ENKELVOUD.test(x.waarde)) r.enkelvoud++;
    if (MEERVOUD.test(x.waarde)) r.meervoud++;
  }
  const totaal = { teksten: 0, enkelvoud: 0, meervoud: 0 };
  for (const r of Object.values(per)) for (const k in totaal) totaal[k] += r[k];
  return { per, totaal };
}

if (require.main === module) {
  const { per, totaal } = tel();
  if (process.argv.includes('--json')) { console.log(JSON.stringify({ per, totaal })); process.exit(0); }
  console.log('| bron | TI-teksten | met ካ/ኻ/ኪ/ኺ | met ኹም/ኩም |\n|---|---|---|---|');
  for (const [b, r] of Object.entries(per)) console.log(`| ${b} | ${r.teksten} | ${r.enkelvoud} | ${r.meervoud} |`);
  console.log(`| **totaal** | **${totaal.teksten}** | **${totaal.enkelvoud}** (${(100 * totaal.enkelvoud / totaal.teksten).toFixed(0)}%) | **${totaal.meervoud}** |`);
}

module.exports = { tel, teksten, ENKELVOUD, MEERVOUD, isZeg };
