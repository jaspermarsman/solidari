// Kleine ronde fix-v2 — na PLAN 11.
const { test, expect } = require('@playwright/test');
const B = require('../tools/vertaal/bronnen.js');

// ── Welkomsttekst Loont Werken: evenveel zinnen als het NL ─────────────────────────────────
// In AR, TR, TI, UK en FA ontbrak "Denk aan toeslagen, uitkering, en wat je netto overhoudt."
// Een zin eindigt op . ! ? ؟ of ። (Tigrinya), gevolgd door een spatie of het einde van de tekst.
const LW = B.laadBron(B.BRONNEN.find((b) => b.naam === 'loont-werken.html'));
const zinnen = (s) => (s.replace(/<[^>]+>/g, '').match(/[.!?؟።](?=\s|$)/g) || []).length;
const NL_ZINNEN = zinnen(LW.talen.NL.bladeren.get('welkom').waarde);

// TI: de terugvertaling werd na twee pogingen niet goedgekeurd ("netto" viel weg), dus de zin
// ontbreekt daar nog (K-2: stoppen en melden). test.fail houdt de suite groen zolang het gat er
// is, en wordt rood zodra TI wél klopt: haal TI dan uit deze lijst.
const BEKEND_KORTER = ['TI'];

test('welkom: het NL telt vier zinnen', () => {
  expect(NL_ZINNEN).toBe(4);
});

for (const taal of B.TALEN.filter((t) => t !== 'NL')) {
  test(`welkom ${taal}: evenveel zinnen als het NL`, () => {
    test.fail(BEKEND_KORTER.includes(taal), 'TI-zin wacht op een goedgekeurde vertaling (zie RAPPORT-fix2.md)');
    const w = LW.talen[taal].bladeren.get('welkom').waarde;
    expect(zinnen(w), w).toBe(NL_ZINNEN);
  });
}

// ── UK ai_laden: dezelfde aanspreekvorm als de rest van de UK-site (ви) ────────────────────
const BH = B.laadBron(B.BRONNEN.find((b) => b.naam === 'budgethulp.html'));
const TI_VORM = /(^|[^а-яіїєґ'ʼ])(ти|тебе|тобі|твій|твоя|твоє|твої|твого|твоєї|твоєму|твоїй|твоїм|твою)(?=$|[^а-яіїєґ'ʼ])/i;
const VI_VORM = /(^|[^а-яіїєґ'ʼ])(ви|вас|вам|ваш|ваша|ваше|ваші|вашому|вашій|вашим|вашу)(?=$|[^а-яіїєґ'ʼ])/i;

test('UK ai_laden: spreekt aan met ви, niet met ти', () => {
  const w = BH.talen.UK.bladeren.get('ai_laden').waarde;
  expect(w).toMatch(VI_VORM);
  expect(w).not.toMatch(TI_VORM);
});
