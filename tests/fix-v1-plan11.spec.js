// PLAN 11 — kleine ronde na de livegang.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const B = require('../tools/vertaal/bronnen.js');
const { IS_PRODUCTIE, stubApi } = require('./helpers');

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

// ── K-3: zorgtoeslag in Loont Werken ───────────────────────────────────────────────────────
// Rekenwaarde en disclaimers noemden €128/€244; de Belastingdienst noemt voor 2026 €129/€246 per
// maand (tabel zorgtoeslag per maand 2026). De disclaimers moeten dezelfde bedragen noemen als N.zt.
test('K-3: de zorgtoeslag-maxima in de rekenregels en in elke disclaimer zijn gelijk (€129 / €246)', () => {
  const lw = fs.readFileSync(path.join(B.ROOT, 'loont-werken.html'), 'utf8');
  const zt = /zt: \{ dr_s:\d+, dr_p:\d+, mx_s:(\d+), mx_p:(\d+) \}/.exec(lw);
  expect(zt && [zt[1], zt[2]]).toEqual(['129', '246']);
  const fout = [];
  for (const naam of ['loont-werken.html', 'lw-i18n.js']) {
    const b = B.laadBron(B.BRONNEN.find((x) => x.naam === naam));
    for (const [taal, t] of Object.entries(b.talen)) {
      for (const [pad, l] of t.bladeren) {
        if (!/disc/.test(pad)) continue;
        const bedragen = (l.waarde.match(/€\d+(?=\/)/g) || []);
        if (bedragen.length && bedragen.join(' ') !== `€${zt[1]} €${zt[2]}`) fout.push(`${naam} ${taal} ${pad}: ${bedragen.join(' ')}`);
      }
    }
  }
  expect(fout).toEqual([]);
});

// ── Blok 3c: inkomensgrens zorgtoeslag met partner ─────────────────────────────────────────
// dr_p stond ruim €250 te hoog; de Belastingdienst noemt voor 2026 €51.142 (samen). Een stel net onder de
// grens krijgt nog iets, een stel net erboven niets. Met de oude grens kreeg €51.300 nog €1.
test('3c: zorgtoeslag met partner stopt bij €51.142 (net onder: wel, net boven: niet)', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {} });
  await page.goto('loont-werken.html', { waitUntil: 'networkidle' });
  const zt = await page.evaluate(() => {
    const was = S.partner;
    S.partner = true;
    const uit = { grens: N.zt.dr_p, onder: berekenZt(51000), op: berekenZt(51142), boven: berekenZt(51300) };
    S.partner = false;
    uit.alleenBoven = berekenZt(40900);
    S.partner = was;
    return uit;
  });
  expect(zt).toEqual({ grens: 51142, onder: 1, op: 0, boven: 0, alleenBoven: 0 });
});

// ── K-4: de eerste chatballon van Loont Werken staat in de gekozen taal ─────────────────────
// In het RO stond `welkom` letterlijk in het Nederlands. De test vergelijkt de getoonde ballon met
// de NL-ballon, dus hij vangt elke taal waarin de tekst (of een terugval) Nederlands is.
async function eersteBallon(page, taal) {
  await page.addInitScript((t) => { try { localStorage.setItem('solidari-taal', t); localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {} }, taal);
  await page.goto('loont-werken.html', { waitUntil: 'networkidle' });
  const ballon = page.locator('#berichten .bericht-sol .bel-sol').first();
  await expect(ballon).toBeVisible({ timeout: 10000 });
  return (await ballon.textContent()).trim();
}

test.describe('K-4: eerste ballon Loont Werken', () => {
  let nl;
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    nl = await eersteBallon(page, 'NL');
    await page.close();
  });
  for (const taal of B.TALEN.filter((t) => t !== 'NL')) {
    test(`${taal}: de eerste ballon is niet de Nederlandse tekst`, async ({ page }) => {
      expect(nl).toMatch(/^Hallo! 👋 Ik help je uitrekenen/);
      const tekst = await eersteBallon(page, taal);
      expect(tekst.length).toBeGreaterThan(10);
      expect(tekst).not.toBe(nl);
    });
  }
});

// ── K-6: de rooktest kan tegen productie zonder echte API-verzoeken ─────────────────────────
// playwright.config.js laat de API-hosts tegen productie naar niets oplossen; stubApi onderschept
// vóór de DNS en blijft dus werken. De proef gebruikt about:blank en de staging-ingang api-test:
// met een kapotte rem kost hij hooguit één GET naar een niet-bestaand pad, zonder bijwerkingen.
test('K-6: tegen productie bereikt de browser de API niet, en een stub werkt nog wel', async ({ page }) => {
  test.skip(!IS_PRODUCTIE, 'de rem staat alleen aan als SOL_BASE_URL productie is');
  const mislukt = [];
  page.on('requestfailed', (r) => mislukt.push(`${new URL(r.url()).host} ${r.failure().errorText}`));
  await page.goto('about:blank');
  const haal = (url) => page.evaluate((u) => fetch(u).then((r) => r.text(), () => 'fout'), url);
  expect(await haal('https://api-test.solidari.nl/k6-rem')).toBe('fout');
  expect(mislukt).toEqual(['api-test.solidari.nl net::ERR_NAME_NOT_RESOLVED']);
  await stubApi(page, { rem: 'gestubd' });
  expect(await haal('https://api-test.solidari.nl/k6-rem')).toBe('{"rem":"gestubd"}');
  expect(mislukt).toHaveLength(1);
});
