// AMENDEMENT beleefdheidsvorm TI, fase R2 — de spiegel (vertaalhulp.html) gelijk aan de bron.
//
// vertaalhulp.html is de plek waar moedertaalsprekers verbeteringen insturen. De tekst die ze daar
// zien moet de tekst zijn die op de site staat; anders verbeteren ze een versie die niemand leest.
// tools/vertaal/spiegel.js koppelt elke spiegelrij aan één bronpad (op sleutel, of via de waarde
// die in de meeste talen gelijk is) en vergelijkt per taal.
//   1. Elke gekoppelde rij is in elke taal letterlijk gelijk aan de bron. Herstel: altijd vanuit de bron,
//      `node tools/vertaal/spiegel.js --herstel --taal XX --sleutels a,b`.
//   2. Rijen zonder koppeling staan hieronder met reden. Komt er een bij, dan faalt de test: dan is
//      een brontekst herschreven of verwijderd zonder dat de spiegel meeging.
const { test, expect } = require('@playwright/test');
const S = require('../tools/vertaal/spiegel.js');

// Stand 13-10-2026. Deze rijen tonen tekst die nergens op de site meer staat. Weghalen of opnieuw
// koppelen is een inhoudelijk besluit (reviewlijst NATIVE-REVIEW-ti.md), niet iets voor een script.
const ONGEKOPPELD = {
  'digi-welkom': 'geen bron: de digi-tool bestaat niet meer, alleen nog in de spiegel',
  'digi-disclaimer': 'geen bron: idem (lijkt op de disclaimer van rechten.html, maar is een andere tekst)',
  'digi-cursus-vraag': 'geen bron: idem', 'digi-cursus-knop': 'geen bron: idem', 'digi-hulplijn': 'geen bron: idem',
  'digi-voorbeeld-1': 'geen bron: idem', 'digi-voorbeeld-2': 'geen bron: idem', 'digi-voorbeeld-3': 'geen bron: idem',
  'digi-voorbeeld-4': 'geen bron: idem', 'digi-voorbeeld-5': 'geen bron: idem',
  'nat-r_te_kort-verblijfsgat': 'brontekst herschreven (juni 2026, tweestatusstelsel); geen taal heeft nog dezelfde tekst',
  'nat-r_te_kort-eu-alt': 'idem', 'nat-r_eu_langdurig-inkomen': 'idem', 'nat-v2-tweestatus': 'idem',
  '18-kind-na-zorgtoeslag': 'categorie bestaat niet meer in kind.na van 18jaar-data',
  'rechten-kaartje-werken': 'kaartje herschreven in rechten.html; geen taal heeft nog dezelfde tekst',
};

test('spiegel: elke gekoppelde rij is gelijk aan de bron, in elke taal', () => {
  const { drift } = S.meet();
  const over = [];
  for (const [taal, d] of Object.entries(drift)) for (const x of d) over.push(`${taal} ${x.sleutel} (${x.bron} ${x.pad})${x.reden ? ' — ' + x.reden : ''}`);
  expect(over).toEqual([]);
});

test('spiegel: alleen de bekende rijen zonder koppeling', () => {
  const { ongekoppeld } = S.meet();
  expect(ongekoppeld.map((o) => o.sleutel).sort()).toEqual(Object.keys(ONGEKOPPELD).sort());
});
