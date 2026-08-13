// Fase 4 — navigeren zonder lezen: BP-01, gesproken taalkiezer, welkomstscherm, tool-raster.
const { test, expect } = require('@playwright/test');
const { PAGES, metTaal } = require('./helpers');

const TOOLPAGINAS = ['brief.html', 'budgethulp.html', 'loont-werken.html',
  'naturalisatie.html', '18jaar.html', 'rechten.html', 'goedvoorbereid.html'];

async function laad(page, pagina, taal) {
  await page.addInitScript((t) => {
    try { localStorage.setItem('solidari-taal', t); localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {}
  }, taal);
  await page.goto('/' + pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(300);
}

test('BP-01: nav-toolnamen + footer vertalen naar AR, chevron blijft', async ({ page }) => {
  await laad(page, 'index.html', 'AR');
  const r = await page.evaluate(() => {
    const brief = document.querySelector('.dropdown-menu [data-i18n="tool-brief-naam"]');
    const contact = document.querySelector('#solidari-footer-bar a[data-i18n="footer-contact"]');
    const chevron = document.querySelector('.nav-dropdown-trigger svg.chevron');
    const toolsLabel = document.querySelector('.nav-dropdown-trigger span[data-i18n="nav-tools"]');
    const arabisch = s => /[؀-ۿ]/.test(s || '');
    return {
      briefVertaald: brief && brief.textContent.trim() !== 'Brief Begrijper' && arabisch(brief.textContent),
      contactVertaald: contact && contact.textContent.trim() !== 'Contact' && arabisch(contact.textContent),
      toolsVertaald: toolsLabel && toolsLabel.textContent.trim() !== 'Tools' && arabisch(toolsLabel.textContent),
      chevron: !!chevron,
    };
  });
  expect(r.briefVertaald, 'toolnaam niet naar AR vertaald').toBe(true);
  expect(r.contactVertaald, 'footer-contact niet naar AR vertaald').toBe(true);
  expect(r.toolsVertaald, 'Tools-label niet naar AR vertaald').toBe(true);
  expect(r.chevron, 'chevron-SVG verdwenen').toBe(true);
});

test('BP-01: EN-toolnamen; NL blijft Nederlands', async ({ page }) => {
  await laad(page, 'index.html', 'EN');
  const en = await page.textContent('.dropdown-menu [data-i18n="tool-loont-naam"]');
  expect(en.trim()).toBe('Does Work Pay?');
  await laad(page, 'index.html', 'NL');
  const nl = await page.textContent('.dropdown-menu [data-i18n="tool-loont-naam"]');
  expect(nl.trim()).toBe('Loont Werken?');
});

test('nav-logo heeft aria-label op alle 11 paginas; footer-logo waar footer bestaat', async ({ page }) => {
  test.setTimeout(180000);
  for (const pagina of PAGES) {
    await page.addInitScript(() => { try { localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {} });
    await page.goto('/' + pagina, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.nav-logo', { timeout: 15000 });
    expect(await page.getAttribute('.nav-logo', 'aria-label'), `${pagina} nav-logo`).toBeTruthy();
    const heeftFooter = await page.locator('.footer-logo').count();
    if (heeftFooter) {
      expect(await page.getAttribute('.footer-logo', 'aria-label'), `${pagina} footer-logo`).toBeTruthy();
    }
  }
});

test('gesproken taalkiezer: 9 talen met eigen naam; TI-naam speelt uit bestand', async ({ page }) => {
  await laad(page, 'index.html', 'NL');
  const namen = await page.evaluate(() =>
    [...document.querySelectorAll('.taal-dropdown-menu .taal-dd-btn')].map(b => b.dataset.naam));
  expect(namen).toContain('ትግርኛ');
  expect(namen).toContain('العربية');
  expect(namen.filter(Boolean).length).toBe(9);
  const laag = await page.evaluate(() => Solidari.spraak._kiesLaag('ትግርኛ', 'TI'));
  expect(await laag).toBe('bestand');
});

test('welkomstscherm: verschijnt bij eerste bezoek, 9 kaarten, en blijft weg na keuze', async ({ page }) => {
  // Verse context = lege localStorage → overlay hoort te verschijnen (niet clearen
  // via addInitScript: dat zou ook bij de reload opnieuw wissen).
  await page.goto('/index.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(300);
  const kaarten = await page.locator('.sol-a11y-welkom-kaart').count();
  expect(kaarten).toBe(9);

  // kies AR
  await page.locator('.sol-a11y-welkom-kaart[data-taal="AR"]').click();
  await page.waitForTimeout(200);
  const wegNaKeuze = await page.locator('.sol-a11y-welkom').count();
  expect(wegNaKeuze).toBe(0);
  const vlag = await page.evaluate(() => localStorage.getItem('solidari-welkom-gezien'));
  expect(vlag).toBe('1');

  // herladen: overlay blijft weg
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  expect(await page.locator('.sol-a11y-welkom').count()).toBe(0);
});

test('niet-lezerspad: alle 7 tools bereikbaar vanaf index (nav-dropdown), raakvlak ≥ 56px', async ({ page }) => {
  await laad(page, 'index.html', 'NL');
  const res = await page.evaluate((tools) => {
    const links = [...document.querySelectorAll('.dropdown-menu a[href]')];
    const hrefs = links.map(a => a.getAttribute('href'));
    const dekt = tools.every(t => hrefs.some(h => h.endsWith(t)));
    // raakvlakken van de tool-kaarten op index
    const kaarten = [...document.querySelectorAll('.tool-kaart, a.tool-kaart, .tool-compact')];
    const teKlein = kaarten.filter(el => { const r = el.getBoundingClientRect(); return r.height < 56; }).length;
    return { dekt, aantalLinks: links.length, kaarten: kaarten.length, teKlein };
  }, TOOLPAGINAS);
  expect(res.dekt, 'niet alle 7 tools in de nav-dropdown').toBe(true);
  expect(res.teKlein, 'te kleine tool-kaarten').toBe(0);
});
