// Fase 0 — nulmeting: 11 pagina's × 9 talen.
// Meet console-errors, kleine raakvlakken, elementen zonder toegankelijke naam,
// tekstblokken zonder data-lees. Schrijft een JSON-artefact + screenshots.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { PAGES, TALEN, metTaal, METING_IN_PAGE } = require('./helpers');

const OUT = path.join(__dirname, 'nulmeting-resultaat.json');
const SHOTS = path.join(__dirname, 'nulmeting-screenshots');
const resultaat = [];

test.beforeAll(() => { if (!fs.existsSync(SHOTS)) fs.mkdirSync(SHOTS, { recursive: true }); });

for (const pagina of PAGES) {
  for (const taal of TALEN) {
    test(`nulmeting ${pagina} [${taal}]`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', e => errors.push(String(e.message || e)));
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

      await metTaal(page, taal);
      await page.goto('/' + pagina, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      const m = await page.evaluate(METING_IN_PAGE);
      resultaat.push({ pagina, taal, consoleErrors: errors.length, foutteksten: errors.slice(0, 3), ...m });

      // Screenshots alleen voor de gevraagde combinaties
      const wilShot = ['index.html', 'goedvoorbereid.html', 'brief.html'].includes(pagina) && ['NL', 'AR'].includes(taal);
      if (wilShot) {
        await page.screenshot({ path: path.join(SHOTS, `${pagina.replace('.html', '')}-${taal}.png`), fullPage: false });
      }
    });
  }
}

test.afterAll(() => {
  fs.writeFileSync(OUT, JSON.stringify(resultaat, null, 2));
  // Console-samenvatting
  const totErr = resultaat.reduce((a, r) => a + r.consoleErrors, 0);
  console.log(`\nNULMETING: ${resultaat.length} combinaties, ${totErr} console-errors totaal.`);
});
