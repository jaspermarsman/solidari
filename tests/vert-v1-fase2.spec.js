// PLAN-7 fase 2 — besluit W-D 13-10-2026: Tigrinya spreekt de lezer alleen in de mannelijke vorm aan.
//
// Vóór stap 6 stond er vaak een m/v-keuze met een schuine streep (ትቕበል/ትቕበሊ). Deze test bewaakt
// dat er in geen enkele TI-bron en in de spiegel (vertaalhulp.html) zo'n streep terugkomt. Strepen
// die geen m/v-keuze zijn (afkorting ዓ/ዓ, uur/week, maart/april, EU/Zwitserland, …) tellen niet;
// dezelfde lijst als GEEN_MV in tools/vertaal/mannelijk.py. Ook sjablonen ((n)=>`…`): daar bleven er
// na stap 6 drie over (budgethulp adv_pos/adv_neg/adv_spaar), gevonden bij de nulmeting van het
// amendement beleefdheidsvorm.
const { test, expect } = require('@playwright/test');
const B = require('../tools/vertaal/bronnen.js');

const GEEN_MV = ['ዓ/ዓ', 'ሰዓት/ሰሙን', 'ሰዓታት/ሰሙን', 'ሰዓት/ወርሒ', 'ግብሪ/ወርሒ', 'ኤውሮጳ/ስዊዘርላንድ', 'መጋቢት/ሚያዝያ',
  'ሓላዊ/መዓጀቢ', 'ሓጋዚ/መራሒ', 'ዘለዎም/ዜግነት'];
const mvStreep = (s) => /[ሀ-፿]\/[ሀ-፿]/.test(GEEN_MV.reduce((t, g) => t.split(g).join(''), s));

test('TI: geen m/v-streep in de bronnen en de spiegel', () => {
  const over = [];
  for (const b of B.laadAlles()) {
    const t = b.talen.TI;
    if (!t) continue;
    for (const [pad, l] of t.bladeren) if ((l.soort === 'str' || l.soort === 'expr') && mvStreep(l.waarde)) over.push(`${b.naam} ${pad}`);
  }
  for (const [sleutel, l] of B.laadSpiegel().TI) if (mvStreep(l.waarde)) over.push(`spiegel ${sleutel}`);
  expect(over).toEqual([]);
});
