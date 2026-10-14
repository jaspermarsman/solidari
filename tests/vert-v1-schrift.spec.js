// PLAN 9, S-9 — geen tekens uit een schrift dat niet bij de taal hoort.
//
// Gemini zette in de registerronde (R1) een Japans teken in ሆላንድ en een Hindi-danda (।) in de
// tekst; de machinecontroles vingen dat toen pas na een extra controle. Twee zulke fouten stonden er
// al vóór die ronde (TI `tool-lw-omschrijving` met Cyrillische en Arabische letters, TI `huidig_hint`
// met ।) en geen enkele test zag ze. Deze test loopt over elke vertaalde waarde in alle bronnen en in
// de spiegel. Latijns schrift mag overal (systeemtermen als DigiD, gemeente, BSN).
const { test, expect } = require('@playwright/test');
const B = require('../tools/vertaal/bronnen.js');
const { vreemdSchrift } = require('../tools/vertaal/controleer.js');

// De tabel per taal staat in controleer.js (vreemdSchrift), zodat de vertaalronde hetzelfde toetst.
function overtreders() {
  const uit = [];
  const kijk = (taal, waar, waarde) => {
    for (const s of vreemdSchrift(taal, waarde)) uit.push(`${taal} ${s}: ${waar} — ${waarde.slice(0, 80)}`);
  };
  for (const b of B.laadAlles()) {
    for (const [taal, t] of Object.entries(b.talen)) for (const [pad, l] of t.bladeren) kijk(taal, `${b.naam} ${pad}`, l.waarde);
  }
  for (const [taal, rijen] of Object.entries(B.laadSpiegel())) for (const [sleutel, l] of rijen) kijk(taal, `vertaalhulp.html ${sleutel}`, l.waarde);
  return uit;
}

test('elke vertaalde waarde staat in het schrift van de eigen taal (plus Latijns)', () => {
  expect(overtreders()).toEqual([]);
});
