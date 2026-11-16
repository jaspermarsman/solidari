// PLAN 19 — de Worker dicht: de pagina's sturen geen systeemprompt meer (fase 2), de uitleg van de
// Brief Begrijper wordt gefilterd (fase 3), lettertypen en scripts staan op eigen plek (fase 4).
// De Worker zelf wordt getest in tools/modellen/worker-stubtest.mjs.
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');

const WORKER = /^https:\/\/solidari-digi-hulp-worker\.jaspermarsman\.workers\.dev\//;

// Vangt elk verzoek naar de Worker op en geeft een vast antwoord. Geeft de lijst met verzoeken terug.
async function vangWorker(page, antwoord = { tekst: 'Testantwoord.', bronnen: [] }) {
  const verzoeken = [];
  await page.route(WORKER, (r) => {
    verzoeken.push({ pad: new URL(r.request().url()).pathname, body: r.request().postDataJSON() });
    r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(antwoord) });
  });
  return verzoeken;
}

// ── Fase 2: het nieuwe contract (B-1) ────────────────────────────────────────────────────────
test.describe('fase 2: de pagina stuurt tool en taal, geen systeemprompt', () => {
  test('rechten: /api/ai met tool, taal en het gesprek', async ({ page }) => {
    await metTaal(page, 'PL');
    const verzoeken = await vangWorker(page);
    await page.goto('rechten.html');
    await page.fill('#invoer', 'Czy mogę pracować?');
    await page.click('#stuur-btn');
    await expect.poll(() => verzoeken.length).toBe(1);
    expect(verzoeken[0].pad).toBe('/api/ai');
    expect(verzoeken[0].body).toEqual({ tool: 'rechten', taal: 'PL', berichten: [{ role: 'user', content: 'Czy mogę pracować?' }] });
    // De taalregel plakt de Worker erachter; de pagina toont en bewaart de vraag zoals hij getypt is.
    await expect(page.locator('.bel-sol').filter({ hasText: 'Testantwoord.' })).toBeVisible();
    await page.fill('#invoer', 'A potem?');
    await page.click('#stuur-btn');
    await expect.poll(() => verzoeken.length).toBe(2);
    expect(verzoeken[1].body.berichten).toEqual([
      { role: 'user', content: 'Czy mogę pracować?' },
      { role: 'assistant', content: 'Testantwoord.' },
      { role: 'user', content: 'A potem?' },
    ]);
  });

  test('goedvoorbereid: /api/ai met tool, taal, categorie, situatie en het gesprek', async ({ page }) => {
    await metTaal(page, 'EN');
    const verzoeken = await vangWorker(page);
    await page.goto('goedvoorbereid.html');
    await page.waitForFunction(() => window.Solidari && window.Solidari.i18n && typeof kiesCategorie === 'function');
    const namen = await page.evaluate(() => {
      kiesCategorie('dokter'); kiesSituatie('dokter-klacht'); toonAIInvoer();
      return { categorie: huidigeCategorie.naam, situatie: huidigeSituatie.titel };
    });
    expect(namen.categorie.length).toBeGreaterThan(2);
    await page.fill('#ai-invoer', 'What do I say to the doctor?');
    await page.click('#ai-stuur');
    await expect.poll(() => verzoeken.length).toBe(1);
    expect(verzoeken[0].pad).toBe('/api/ai');
    expect(verzoeken[0].body).toEqual({
      tool: 'gv', taal: 'EN', categorie: namen.categorie, situatie: namen.situatie,
      berichten: [{ role: 'user', content: 'What do I say to the doctor?' }],
    });
    await expect(page.locator('.bel-sol').filter({ hasText: 'Testantwoord.' })).toBeVisible();
  });

  test('budgethulp: /api/ai met tool, taal, gemeente en het budgetoverzicht', async ({ page }) => {
    await metTaal(page, 'TR');
    const verzoeken = await vangWorker(page, { tekst: 'Testantwoord.' });
    await page.goto('budgethulp.html');
    await page.waitForFunction(() => window.Solidari && typeof window.Solidari.opmaak === 'function' && typeof roepAiAan === 'function');
    // Een klein verzonnen budget: zonder window._pdf is het overzicht leeg (de AI-stap komt in
    // het echt altijd na het overzicht).
    await page.evaluate(() => {
      window._pdf = { saldo: -95, ink: 1380, totUit: 1475, huurB: 780, nettoW: 780, energie: 190, tel: 35, zorgv: 150,
                      verv: 40, bood: 280, schuld: 0, sit: 'eenouder', huurtoesl: 0, zorgtoesl: 123 };
      return roepAiAan('Utrecht');
    });
    await expect.poll(() => verzoeken.length).toBe(1);
    expect(verzoeken[0].pad).toBe('/api/ai');
    const b = verzoeken[0].body;
    expect(Object.keys(b).sort()).toEqual(['bericht', 'gemeente', 'taal', 'tool']);
    expect(b.tool).toBe('budget');
    expect(b.taal.toUpperCase()).toBe('TR');
    expect(b.gemeente).toBe('Utrecht');
    expect(b.bericht).toContain('BUDGETOVERZICHT VOOR AI-ANALYSE');
    expect(b.bericht).not.toContain('Türkçe cevap ver.');   // de taalregel plakt de Worker erachter
    await expect(page.locator('.bel-sol.ai-analyse').filter({ hasText: 'Testantwoord.' })).toBeVisible();
  });

  for (const pagina of ['rechten.html', 'goedvoorbereid.html', 'budgethulp.html']) {
    test(`${pagina}: geen prompt en geen oude route meer in de bron`, async ({ page }) => {
      const bron = await (await page.request.get(pagina)).text();
      for (const weg of ['SYSTEM_PROMPT', 'bouwAiVerzoek', 'bouwAiPrompt', 'bouwSystemPrompt', 'bouwAiBerichten', 'AI_TAAL',
                         '/api/digi', '/api/analyse\'', 'UITSLUITEND', 'HARDE GRENZEN', 'systeem:']) {
        expect(bron.includes(weg), `"${weg}" staat nog in ${pagina}`).toBe(false);
      }
      expect(bron).toContain('/api/ai');
    });
  }
});
