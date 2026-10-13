// PLAN-7 fase 2b — loont-werken.html in het Roemeens en het Pools.
//
// Het T-object had geen ro- en pl-blok; de terugval (T[taal]||T.nl) gaf die gebruikers stil de
// hele tool in het Nederlands. Deze test bewaakt:
//   1. T.ro en T.pl bestaan en hebben elk NL-sleutelpad (de pariteitscontrole ziet dit ook).
//   2. Geen tekstwaarde is letterlijk gelijk aan NL, behalve waar NL zelf alleen uit
//      systeemtermen, getallen of leestekens bestaat, of de vertaling als niet bruikbaar is
//      teruggezet (lijst NIET_BRUIKBAAR hieronder, bijgehouden vanuit het rapport).
//   3. In de browser staat de eerste vraag in de eigen taal (en het welkomstbericht ook, tenzij
//      dat op de lijst NIET_BRUIKBAAR staat). Vóór deze fase kwam het welkomstbericht in élke
//      taal in het Nederlands: de pagina las de opgeslagen taal pas ná de start.
const { test, expect } = require('@playwright/test');
const B = require('../tools/vertaal/bronnen.js');
const { metTaal } = require('./helpers');

const bron = B.laadBron(B.BRONNEN.find((b) => b.naam === 'loont-werken.html'));
const NL = bron.talen.NL.bladeren;
const TERMEN = /\b(huisarts|BSN|DigiD|gemeente|bijstand|klantmanager|toeslag|inburgering|IND|Belastingdienst|UWV|SVB|WW|Nibud|WML)\b/gi;
const alleenVast = (s) => !/[A-Za-z]{3,}/.test(s.replace(/<[^>]+>/g, ' ').replace(/\{[^}]+\}/g, ' ').replace(TERMEN, ' '));
// Paden waarvan de vertaling de terugvertaalcontrole niet haalde en die daarom Nederlands bleven.
// Stand 13-10-2026 (zie RAPPORT-nieuw-gemini.md): vijf regelingnamen liet Gemini onvertaald (zakt op
// 'schrift'), de rest week af in de terugvertaling. Zodra een mens ze vertaalt: hier weghalen.
const NIET_BRUIKBAAR = {
  RO: ['welkom', 'zt_lbl', 'ht_lbl', 'kgb_lbl', 'kot_go', 'kot_lbl'],
  PL: ['zt_lbl', 'ht_lbl', 'kgb_lbl', 'akw_lbl', 'kot_go', 'kot_lbl'],
};

for (const taal of ['RO', 'PL']) {
  test(`loont-werken ${taal}: blok aanwezig, geen stil Nederlands`, () => {
    const t = bron.talen[taal];
    expect(t, `T.${taal.toLowerCase()} ontbreekt`).toBeTruthy();
    const mist = [...NL.keys()].filter((p) => !t.bladeren.has(p));
    expect(mist).toEqual([]);
    const nederlands = [];
    for (const [pad, b] of NL) {
      if (b.soort !== 'str' || alleenVast(b.waarde) || NIET_BRUIKBAAR[taal].includes(pad)) continue;
      if (/(^|\.)(id|type|klasse)$/.test(pad)) continue;
      if (t.bladeren.get(pad).waarde === b.waarde) nederlands.push(pad);
    }
    expect(nederlands).toEqual([]);
  });

  test(`loont-werken ${taal}: chat start in de eigen taal`, async ({ page }) => {
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await metTaal(page, taal);
    await page.goto('loont-werken.html', { waitUntil: 'networkidle' });
    const vraag = bron.talen[taal].bladeren.get('q_situatie').waarde;
    await expect(page.locator('.bel-sol', { hasText: vraag })).toHaveCount(1, { timeout: 10000 });
    if (!NIET_BRUIKBAAR[taal].includes('welkom')) {
      await expect(page.locator('.bel-sol').first()).not.toContainText('Ik help je uitrekenen');
    }
    expect(fouten).toEqual([]);
  });
}
