// PLAN-2 fase 1.6 — stubtest brief.html na het loskoppelen van het zonneserver-model.
// Bewaakt: (1) geen statusping/offline-banner/zonnebadge meer, (2) het responscontract
// {urgentie, secties, actiepunten} rendert nog alle drie de blokken, (3) beeldcompressie vóór
// verzending, (4) het foutpad toont de neutrale melding met opnieuw-knop.
// Draaien: cd tests && npx playwright test migratie-frontend.spec.js  (serve.sh serveert de werkmap)
const { test, expect } = require('@playwright/test');
const path = require('path');
const { metTaal } = require('./helpers');

const DEMO = {
  urgentie: { niveau: 'hoog', titel: 'Reageer binnen 6 weken', tekst: 'Je kunt tot 25 september bezwaar maken.' },
  secties: [
    { icoon: '📄', titel: 'Wat is dit?', achtergrond: '#EBF3EE', inhoud: '<p>Een besluit van de gemeente over een Wmo-voorziening.</p>' },
    { icoon: '✅', titel: 'Wat moet je doen?', achtergrond: '#FDF3E0', inhoud: '<p>Stuur een kopie van je ID op.</p>' },
  ],
  actiepunten: ['Kopie identiteitsbewijs opsturen (binnen 14 dagen)', 'Rekeningnummer controleren'],
};
const NEPBRIEF = path.resolve(__dirname, '..', 'tools', 'test', 'nepbrief.jpg');
const API = '**/api/analyseer';

async function kiesNepbriefEnAkkoord(page) {
  await page.setInputFiles('#bestand-input', NEPBRIEF);
  await page.check('#privacy-checkbox');
  await expect(page.locator('#analyseer-knop')).toBeEnabled();
}

test.describe('PLAN-2 brief.html', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('geen zonneserver-restanten en geen statusping', async ({ page }) => {
    const verzoeken = [];
    page.on('request', (r) => verzoeken.push(r.url()));
    await metTaal(page, 'NL');
    await page.goto('/brief.html');
    await page.waitForTimeout(1500);
    await expect(page.locator('#offline-banner')).toHaveCount(0);
    await expect(page.locator('#zon-badge')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('Tool actief');
    expect(verzoeken.filter((u) => u.includes('/api/status'))).toHaveLength(0);
    expect(verzoeken.filter((u) => u.includes('api.solidari.nl'))).toHaveLength(0); // niets bij paginalaad
  });

  test('responscontract rendert urgentie, kaarten en actiepunten (gestubde fetch)', async ({ page }) => {
    await metTaal(page, 'NL');
    let body = null;
    await page.route(API, async (route) => {
      body = route.request().postDataBuffer();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(DEMO) });
    });
    await page.goto('/brief.html');
    await kiesNepbriefEnAkkoord(page);
    await page.click('#analyseer-knop');
    await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
    await expect(page.locator('#urgentie-banner .urgentie-banner.hoog')).toBeVisible();
    await expect(page.locator('#urgentie-banner')).toContainText('Reageer binnen 6 weken');
    await expect(page.locator('#resultaat-kaarten')).toContainText('Wat is dit?');
    await expect(page.locator('#resultaat-kaarten')).toContainText('Wat moet je doen?');
    await expect(page.locator('body')).toContainText('Kopie identiteitsbewijs opsturen');
    expect(body).not.toBeNull();
    // Multipart-body is kleiner dan 3 MB en bevat het veld 'brief' als jpg
    expect(body.length).toBeLessThan(3 * 1024 * 1024);
    expect(body.toString('latin1')).toContain('name="brief"');
    expect(body.toString('latin1')).toContain('filename="nepbrief.jpg"');
  });

  test('beeldcompressie: grote foto wordt verkleind en gelogd', async ({ page }) => {
    await metTaal(page, 'NL');
    const logs = [];
    page.on('console', (m) => logs.push(m.text()));
    let grootte = 0;
    await page.route(API, async (route) => {
      grootte = route.request().postDataBuffer().length;
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(DEMO) });
    });
    await page.goto('/brief.html');
    // Maak in de browser een 4000×3000-foto van de nepbrief (ruis erbij zodat hij groot is)
    const groot = await page.evaluate(async () => {
      const c = document.createElement('canvas'); c.width = 4000; c.height = 3000;
      const ctx = c.getContext('2d');
      const img = new Image(); img.src = 'tools/test/nepbrief.jpg'; await img.decode();
      ctx.drawImage(img, 0, 0, 4000, 3000);
      const d = ctx.getImageData(0, 0, 4000, 3000);
      for (let i = 0; i < d.data.length; i += 16) d.data[i] = (d.data[i] + Math.random() * 60) | 0;
      ctx.putImageData(d, 0, 0);
      const blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.98));
      const f = new File([blob], 'grote-foto.jpg', { type: 'image/jpeg' });
      const dt = new DataTransfer(); dt.items.add(f);
      const inp = document.getElementById('bestand-input'); inp.files = dt.files;
      inp.dispatchEvent(new Event('change', { bubbles: true }));
      return blob.size;
    });
    expect(groot).toBeGreaterThan(1024 * 1024);
    await page.check('#privacy-checkbox');
    await page.click('#analyseer-knop');
    await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 30000 });
    expect(grootte).toBeGreaterThan(0);
    expect(grootte).toBeLessThan(3 * 1024 * 1024);
    expect(grootte).toBeLessThan(groot);
    expect(logs.some((l) => l.includes('[brief] compressie'))).toBeTruthy();
    const regel = logs.find((l) => l.includes('[brief] compressie'));
    expect(regel).toMatch(/1568×1176|1568 ?×/);
  });

  test('PDF gaat ongecomprimeerd mee', async ({ page }) => {
    await metTaal(page, 'NL');
    let ct = '';
    await page.route(API, async (route) => {
      ct = route.request().postDataBuffer().toString('latin1');
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(DEMO) });
    });
    await page.goto('/brief.html');
    await page.setInputFiles('#bestand-input', NEPBRIEF.replace('.jpg', '.pdf'));
    await page.check('#privacy-checkbox');
    await page.click('#analyseer-knop');
    await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
    expect(ct).toContain('filename="nepbrief.pdf"');
    expect(ct).toContain('application/pdf');
  });

  test('foutpad: server onbereikbaar → neutrale melding + opnieuw-knop', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.route(API, (route) => route.abort('connectionrefused'));
    await page.goto('/brief.html');
    await kiesNepbriefEnAkkoord(page);
    await page.click('#analyseer-knop');
    await expect(page.locator('#stap-fout')).toBeVisible({ timeout: 20000 });
    await expect(page.locator('#fout-bericht')).toHaveText('De tool is nu niet bereikbaar. Probeer het over een paar minuten opnieuw.');
    await expect(page.locator('#stap-fout button')).toContainText('Opnieuw');
  });

  test('foutpad: nette serverfout (422) wordt letterlijk getoond', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.route(API, (route) => route.fulfill({ status: 422, contentType: 'application/json', body: JSON.stringify({ fout: 'Er kon geen tekst worden gevonden in de brief.' }) }));
    await page.goto('/brief.html');
    await kiesNepbriefEnAkkoord(page);
    await page.click('#analyseer-knop');
    await expect(page.locator('#fout-bericht')).toContainText('geen tekst worden gevonden', { timeout: 20000 });
  });
});
