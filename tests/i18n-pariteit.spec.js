// PLAN-7 fase 0 — sleutelpariteit over álle taalbronnen.
//
// De oude controle keek alleen naar GEDEELD in i18n.js en zag daardoor niet dat de budgethulp
// in TI en TR vastliep op de inkomensvraag, of dat loont-werken.html geen Roemeens en Pools
// had. Deze test draait dezelfde meting als `node tools/test/i18n-pariteit.js --alles`, één
// test per bron, zodat een rode test meteen zegt wélk bestand een gat heeft.
//
// Geen browser nodig: de bronnen worden gelezen, niet uitgevoerd (tools/vertaal/bronnen.js).
// Bewuste uitzonderingen (B-9 categorieen[4], de getallenlijst in spraak.js) staan in die
// bronnenlijst met hun reden en tellen hier niet als gat.
const { test, expect } = require('@playwright/test');
const { meet } = require('../tools/vertaal/pariteit.js');

const meting = meet();
const ANDERE = ['EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL'];

for (const rij of meting.rijen.concat([meting.spiegel])) {
  test(`pariteit: ${rij.naam} — geen ontbrekende sleutelpaden t.o.v. NL`, () => {
    expect(rij.fout, rij.fout).toBeFalsy();
    const gaten = {};
    for (const t of ANDERE) if (rij.ontbrekend[t] && rij.ontbrekend[t].length) gaten[t] = rij.ontbrekend[t];
    expect(gaten).toEqual({});
  });
}
