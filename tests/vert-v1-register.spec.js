// AMENDEMENT beleefdheidsvorm TI, fase R1.5 — de aanspreekvorm blijft het beleefde meervoud (ኹም).
//
// Na de omzetting (13-10-2026) dragen nog 30 van de 1542 TI-teksten een achtervoegsel dat op de tweede
// persoon enkelvoud lijkt (ካ/ኻ/ኪ/ኺ aan een woordeinde; tools/vertaal/register-tel.js). Die 30 zijn
// grotendeels vals-positief (ተወሳኺ "extra", ብሰንኪ "vanwege") of terecht (een vraag aan het kind), plus
// enkele teksten die op de reviewlijst staan. Deze test faalt als het aantal boven de drempel komt,
// zodat een latere vertaalronde de enkelvoudsvorm niet stil terugbrengt. Een signaal, geen bewijs:
// vervoegingen zonder achtervoegsel (ትኽእል) ziet hij niet.
const { test, expect } = require('@playwright/test');
const R = require('../tools/vertaal/register-tel.js');

const DREMPEL = 35;   // eindmeting 30; zakt de reviewlijst, verlaag dan mee

test(`TI: hoogstens ${DREMPEL} teksten met een enkelvoud-achtervoegsel`, () => {
  const { totaal } = R.tel();
  expect(totaal.enkelvoud).toBeLessThanOrEqual(DREMPEL);
  expect(totaal.meervoud).toBeGreaterThanOrEqual(500);
});
