// PLAN 11 — kleine ronde na de livegang.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const B = require('../tools/vertaal/bronnen.js');

// ── K-1/K-2: de 18jaar-kaart "Zorgverzekering regelen" ─────────────────────────────────────
// Vóór PLAN 11 stond er in elke taal "3 maanden na de 18e verjaardag, zonder boete". De kaarten
// worden gevonden via het NL-anker (de NL-naam noemt de zorgverzekering), de talen via hetzelfde
// sleutelpad: zo hangt de test niet af van een vertaalde zoekterm.
const D18 = B.laadBron(B.BRONNEN.find((b) => b.naam === '18jaar-data-*.js'));
const NL = D18.talen.NL.bladeren;
// Een losse 3 in elk cijferschrift (Latijns, Perzisch, Arabisch); €385 telt niet.
const LOSSE_DRIE = /(^|[^0-9۰-۹٠-٩])[3۳٣]($|[^0-9۰-۹٠-٩])/;

const kaarten = [...NL].filter(([pad, l]) => /^(ouder|kind)\.voor\.categorieen\[\d+\]\.naam$/.test(pad) && /zorgverzekering/i.test(l.waarde))
  .map(([pad]) => pad.replace(/\.naam$/, ''));

test('K-1: het NL-anker vindt beide zorgverzekeringskaarten (ouder en jongere)', () => {
  expect(kaarten.sort()).toEqual(['kind.voor.categorieen[1]', 'ouder.voor.categorieen[3]']);
});

for (const taal of B.TALEN) {
  test(`K-1 ${taal}: geen "3 maanden" meer op de zorgverzekeringskaarten, wel de nieuwe tekst met CAK`, () => {
    const t = D18.talen[taal].bladeren;
    const fout = [];
    for (const kaart of kaarten) {
      for (const [pad, l] of t) {
        if (!pad.startsWith(kaart + '.') || !/\.(tekst|samenvatting)$/.test(pad)) continue;
        if (LOSSE_DRIE.test(l.waarde.replace(/<[^>]+>/g, ' '))) fout.push(`${pad}: ${l.waarde.slice(0, 90)}`);
      }
      // het punt dat in NL "binnen een maand … CAK" zegt, zegt dat in elke taal (CAK blijft Latijns)
      const nieuw = [...NL].find(([pad, l]) => pad.startsWith(kaart + '.punten[') && /binnen <strong>een maand<\/strong>/.test(l.waarde));
      expect(nieuw, `${kaart}: NL-punt met "een maand"`).toBeTruthy();
      const waarde = t.get(nieuw[0]) && t.get(nieuw[0]).waarde;
      if (!waarde || !/CAK/.test(waarde)) fout.push(`${nieuw[0]}: geen CAK — ${String(waarde).slice(0, 90)}`);
      if (taal !== 'NL' && waarde === nieuw[1].waarde) fout.push(`${nieuw[0]}: staat nog in het Nederlands`);
    }
    expect(fout).toEqual([]);
  });
}

test('K-1: de NL-samenvatting dreigt niet meer met een boete, ook niet in de terugval van 18jaar.html', () => {
  expect(NL.get('ouder.voor.categorieen[3].samenvatting').waarde).toBe('Rond de 18e verjaardag regelen');
  const html = fs.readFileSync(path.join(B.ROOT, '18jaar.html'), 'utf8');
  expect(html).not.toMatch(/3 maanden|anders boete/);
  expect(html).toContain("samenvatting: 'Rond de 18e verjaardag regelen'");
});
