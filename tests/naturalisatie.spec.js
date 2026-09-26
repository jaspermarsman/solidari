// Fase 5 — Playwright-tests voor de naturalisatie-checker
// (PLAN-naturalisatie-migratiepact.md §7 fase 5, scenario's uit §8).
//
// De scenariopaden ([vraagId, antwoordIndex] per stap) komen uit
// tools/naturalisatie/check.js (SCENARIOS) — niet opnieuw uitgeschreven en
// niet op tekst gezocht, zoals de overdracht vraagt.
//
// Correctie 1, C6: `page.goto('naturalisatie.html', …)` heeft GEEN beginnende
// "/" meer. Met een beginnende "/" resolvet Playwright/de browser altijd
// relatief aan de ORIGIN van baseURL, niet aan het pad erin — dat gaat goed
// bij de lokale server (`http://127.0.0.1:8099`, geen subpad) maar niet tegen
// de GitHub Pages-staging, waarvan de site in een submap staat
// (`https://jaspermarsman.github.io/solidari-staging/`). Met een beginnende
// "/" zou dat `https://jaspermarsman.github.io/naturalisatie.html` worden
// (404). Zonder beginnende "/" resolvet het pad relatief aan `baseURL` mét
// submap, mits `SOL_BASE_URL` zelf met een `/` eindigt. Zie LOG-naturalisatie.md
// (C6) voor de ontdekking; `fase4.spec.js`/`fase7.spec.js` gebruiken nog wel
// een beginnende "/" en vallen daardoor tegen de staging-submap uit — die
// bestanden vallen buiten het bestandenbereik van dit plan (§0.6).
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { metTaal } = require('./helpers');
const { SCENARIOS, laadData, PAD_VERBODEN } = require('../tools/naturalisatie/check.js');

const NAT = laadData()._NAT;
const TALEN9 = ['NL', 'EN', 'AR', 'TR', 'UK', 'FA', 'TI', 'RO', 'PL'];
const RTL_TALEN = ['AR', 'FA'];

// Console-ruis die ook in fase7.spec.js wordt genegeerd (bekende, niet-fatale
// netwerkfouten van externe diensten die in deze testomgeving niet bereikbaar zijn).
const RUIS = /api\.solidari\.nl|Failed to load resource|status of 404|CORS|Access to fetch/;

// Zelfde stemmen-stub als tests/fase7.spec.js: een toestel dat stemmen heeft,
// zodat spraak.js daadwerkelijk .sol-a11y-knop-elementen toevoegt.
const STUB_STEMMEN = () => {
  const V = [['nl-NL'], ['en-GB'], ['ar-SA'], ['tr-TR'], ['uk-UA'], ['fa-IR'], ['ro-RO'], ['pl-PL']]
    .map(([lang]) => ({ lang, name: lang, localService: true }));
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true, get: () => ({ getVoices: () => V, speak() {}, cancel() {}, pause() {}, resume() {}, speaking: false }),
  });
};

// NL-UI-labels (F-7) die in een andere taal nergens zichtbaar mogen zijn.
// "Vraag " zonder cijfer, zodat ook "Vraag 1", "Vraag 2", … gevangen worden.
const NL_UI_LABELS = [
  NAT.NL.ui.volgendeStappen, NAT.NL.ui.watKunJeDoen, NAT.NL.ui.watKunJeNuDoen,
  'Opnieuw beginnen', NAT.NL.ui.laatChecken, 'Vraag ', NAT.NL.ui.driePaden,
];

function platTekst(html) {
  return String(html == null ? '' : html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Klikt het scenario-pad door. Vóór elke klik wordt gecontroleerd dat de knop
// echt bij de verwachte vraag hoort (via het `kiesAntwoord('<id>', …)`-onclick-
// attribuut), zodat een stille afwijking tussen taal en NL-structuur opvalt
// als een falende test, niet als een verkeerd resultaat.
async function loopPad(page, pad) {
  for (const [vraagId, idx] of pad) {
    const knoppen = page.locator('.antwoord-knop');
    await expect(knoppen.first()).toBeVisible();
    const onclick0 = await knoppen.first().getAttribute('onclick');
    expect(onclick0, `verwachtte vraag "${vraagId}", knop wijst naar iets anders (${onclick0})`)
      .toContain(`kiesAntwoord('${vraagId}',`);
    await knoppen.nth(idx).click();
  }
}

test.describe('5.1 — Scenario\'s (Correctie 1, §4) in NL', () => {
  for (const [id, scenario] of Object.entries(SCENARIOS)) {
    // Correctie 1: S-14/S-15 eindigen bij een VRAAG (v7), niet bij een
    // resultaat — hun acceptatie is "v7 toont N zichtbare antwoorden", dus
    // die twee krijgen hier een ander testlichaam dan de resultaat-scenario's.
    const naam = scenario.eindVraag
      ? `${id} → vraag ${scenario.eindVraag} toont ${scenario.verwachtAntwoorden} antwoorden`
      : `${id} → ${scenario.verwacht}`;
    test(naam, async ({ page }) => {
      await metTaal(page, 'NL');
      await page.addInitScript(STUB_STEMMEN);
      await page.goto('naturalisatie.html');
      await loopPad(page, scenario.pad);
      if (scenario.eindVraag) {
        const knoppen = page.locator('.antwoord-knop');
        await expect(knoppen).toHaveCount(scenario.verwachtAntwoorden);
        const onclick0 = await knoppen.first().getAttribute('onclick');
        expect(onclick0, `verwachtte vraag "${scenario.eindVraag}"`).toContain(`kiesAntwoord('${scenario.eindVraag}',`);
      } else {
        const titel = await page.locator('.resultaat-titel').textContent();
        expect(titel).toBe(NAT.NL.resultaten[scenario.verwacht].titel);
        if (scenario.verbiedt) {
          const lichaam = await page.locator('.resultaat-kaart').innerText();
          scenario.verbiedt.forEach(zin => {
            expect(lichaam.toLowerCase()).not.toContain(zin.toLowerCase());
          });
        }
        // Correctie 1, §3.1.6/S-1/S-16: op pad "regulier" linkt het hulpblok
        // naar het Juridisch Loket, nooit naar vluchtelingenwerk.nl. Let op:
        // `header.disclaimer` zelf noemt "VluchtelingenWerk" als vaste,
        // padonafhankelijke slotzin (zie LOG-naturalisatie.md, C3: die
        // afwijking is bewust — de disclaimer telt niet mee als "hulpblok"),
        // dus deze check test het hulpblok-linkdoel, niet het woord zelf.
        if (scenario.verwachtPad === 'regulier') {
          const html = await page.locator('.resultaat-kaart').innerHTML();
          expect(html.toLowerCase()).not.toContain('vluchtelingenwerk.nl');
        }
      }
    });
  }
});

test.describe('5.2 — S-1, S-5 en S-13 in alle negen talen (Correctie 1, §4)', () => {
  for (const taal of TALEN9) {
    for (const id of ['S-1', 'S-5', 'S-13']) {
      test(`${id} in ${taal}`, async ({ page }) => {
        const scenario = SCENARIOS[id];
        const errors = [];
        page.on('pageerror', e => errors.push(String(e.message)));

        await metTaal(page, taal);
        await page.addInitScript(STUB_STEMMEN);
        await page.goto('naturalisatie.html', { waitUntil: 'networkidle' });

        // Vraag 1 al zichtbaar → check hier ook meteen op een NL-UI-label,
        // want de vraag-stap ("Vraag {n}") staat al op het scherm.
        if (taal === 'EN' || taal === 'AR' || taal === 'TI') {
          const tekstVoor = await page.locator('body').innerText();
          NL_UI_LABELS.forEach(label => {
            expect(tekstVoor, `NL-label "${label}" zichtbaar in ${taal} vóór het pad`).not.toContain(label);
          });
        }

        await loopPad(page, scenario.pad);

        const titel = await page.locator('.resultaat-titel').textContent();
        expect(titel).toBe(NAT[taal].resultaten[scenario.verwacht].titel);

        if (RTL_TALEN.includes(taal)) {
          const dir = await page.evaluate(() => document.documentElement.getAttribute('dir'));
          expect(dir).toBe('rtl');
        } else {
          const dir = await page.evaluate(() => document.documentElement.getAttribute('dir'));
          expect(dir).toBe('ltr');
        }

        if (taal === 'EN' || taal === 'AR' || taal === 'TI') {
          const tekstNa = await page.locator('body').innerText();
          NL_UI_LABELS.forEach(label => {
            expect(tekstNa, `NL-label "${label}" zichtbaar in ${taal} op het resultaat`).not.toContain(label);
          });
        }

        const echt = errors.filter(e => !RUIS.test(e));
        expect(echt, echt.join(' | ')).toEqual([]);
      });
    }
  }
});

test.describe('5.3 — Voorlezen (N-6, met stemmen-stub)', () => {
  for (const taal of ['NL', 'EN', 'AR']) {
    test(`vraag 1 heeft .sol-a11y-knop en data-lees met alle antwoorden — ${taal}`, async ({ page }) => {
      await metTaal(page, taal);
      await page.addInitScript(STUB_STEMMEN);
      await page.goto('naturalisatie.html', { waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
      await page.waitForTimeout(500);

      const vraagTekst = page.locator('.vraag-tekst').first();
      await expect(vraagTekst.locator('.sol-a11y-knop')).toHaveCount(1);

      const leesAttr = await vraagTekst.getAttribute('data-lees');
      const v1 = NAT[taal].vragen.v1;
      expect(platTekst(leesAttr)).toContain(platTekst(v1.tekst));
      v1.antwoorden.forEach(a => {
        expect(platTekst(leesAttr), `data-lees mist antwoord "${a.tekst}"`).toContain(platTekst(a.tekst));
      });

      // Geen data-lees op of in een knop (§7 fase 2.6).
      const knopMetLees = await page.locator('button[data-lees], button [data-lees]').count();
      expect(knopMetLees).toBe(0);
    });
  }

  test('TI: nergens een .sol-a11y-knop', async ({ page }) => {
    await metTaal(page, 'TI');
    await page.addInitScript(STUB_STEMMEN);
    await page.goto('naturalisatie.html', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
    await page.waitForTimeout(500);
    expect(await page.locator('.sol-a11y-knop').count()).toBe(0);
  });
});

test('5.4 — Linkcheck (alleen lokaal, niet in CI): elke unieke externe link geeft 200 of 3xx', async ({ request }) => {
  test.skip(!!process.env.CI, 'linkcheck draait alleen lokaal, niet in CI');
  test.setTimeout(60000);

  const links = new Set();
  TALEN9.forEach(taal => {
    Object.values(NAT[taal].resultaten).forEach(r => {
      if (r.link && /^https?:\/\//i.test(r.link)) links.add(r.link);
    });
  });

  const fouten = [];
  const uitkomsten = [];
  for (const link of links) {
    try {
      const resp = await request.get(link, { timeout: 15000 });
      const status = resp.status();
      uitkomsten.push(`${status} ${link}`);
      if (!(status === 200 || (status >= 300 && status < 400))) fouten.push(`${link} → HTTP ${status}`);
    } catch (e) {
      fouten.push(`${link} → ${e.message}`);
    }
  }
  fs.writeFileSync(path.join(__dirname, 'naturalisatie-linkcheck.json'), JSON.stringify(uitkomsten, null, 2));
  expect(fouten, fouten.join('\n')).toEqual([]);
});

// Correctie 1, §3.1.3/§4: `kiesAntwoord` moet de OORSPRONKELIJKE antwoordindex
// gebruiken, niet de positie in de gefilterde (getoonde) lijst. S-14 (v7 op
// pad "regulier") toont maar 2 van de 3 antwoorden ("erkend vluchteling" is
// alleenPad: "asiel"), dus het tweede zichtbare antwoord is het DERDE
// antwoord in de data ("Nee, ik wil mijn nationaliteit houden"). Deze test
// klikt dat tweede zichtbare antwoord en controleert dat de geschiedenis het
// juiste antwoord toont — niet het antwoord op de gefilterde positie 1.
test.describe('5.5 — S-14: indexfix bij v7 op pad regulier (Correctie 1, §3.1.3)', () => {
  test('tweede zichtbare antwoord bij v7 → geschiedenis toont "Nee, ik wil …"', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.addInitScript(STUB_STEMMEN);
    await page.goto('naturalisatie.html');
    await loopPad(page, SCENARIOS['S-14'].pad);

    // Zichtbaar op pad "regulier" (mirroring padOk() in naturalisatie.html /
    // checkPadzuiverheid in check.js): alleen antwoorden zonder alleenPad, of
    // met alleenPad === "regulier".
    const v7 = NAT.NL.vragen.v7;
    const zichtbaar = v7.antwoorden.filter(a => !a.alleenPad || a.alleenPad === 'regulier');
    expect(zichtbaar.length).toBe(2);
    expect(zichtbaar[1].tekst).toContain('Nee, ik wil');

    const knoppen = page.locator('.antwoord-knop');
    await expect(knoppen).toHaveCount(2);
    const onclick1 = await knoppen.nth(1).getAttribute('onclick');
    expect(onclick1, 'nog steeds op vraag v7').toContain("kiesAntwoord('v7',");

    await knoppen.nth(1).click();

    const laatsteAntwoord = await page.locator('.geschiedenis-antwoord').last().textContent();
    expect(laatsteAntwoord).toBe(zichtbaar[1].tekst);
    expect(laatsteAntwoord).toContain('Nee, ik wil');
  });
});

// Correctie 1, §4: op pad "regulier" mag `data-lees` van v7 geen
// vluchteling-woord bevatten (de "erkend vluchteling"-antwoordtekst is daar
// gefilterd, en v7.uitleg zelf zit niet in data-lees — zie bouwVraagLees()).
// Gebruikt dezelfde PAD_VERBODEN-woordenlijst per taal als check.js
// (padzuiverheid, §4 punt 2), zodat er geen tweede woordenlijst ontstaat.
test.describe('5.6 — Voorleestest padzuiverheid (Correctie 1, §4): data-lees van v7 op pad regulier', () => {
  for (const taal of ['NL', 'EN', 'AR']) {
    test(`v7 op pad regulier bevat geen asiel/vluchteling-woord — ${taal}`, async ({ page }) => {
      await metTaal(page, taal);
      await page.addInitScript(STUB_STEMMEN);
      await page.goto('naturalisatie.html', { waitUntil: 'networkidle' });
      await loopPad(page, SCENARIOS['S-14'].pad);

      const leesAttr = await page.locator('.vraag-tekst').first().getAttribute('data-lees');
      expect(leesAttr, `geen data-lees gevonden bij v7 (${taal})`).toBeTruthy();
      expect(PAD_VERBODEN[taal].test(leesAttr), `data-lees van v7 (${taal}) bevat verboden taal: "${leesAttr}"`).toBe(false);
    });
  }
});
