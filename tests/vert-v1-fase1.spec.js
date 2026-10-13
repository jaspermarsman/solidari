// PLAN-7 fase 1 — de budgethulp liep in TI en TR vast op de inkomensvraag.
//
// Oorzaak: `inkomen_v` ontbrak in T.ti en T.tr, dus sol(undefined) en geen vraag boven het
// bedragveld. Overgenomen uit de spiegel (vertaalhulp.html), niet opnieuw vertaald.
// Deze test loopt per taal door tot het inkomensveld, controleert dat de vraag erboven in de
// eigen taal staat, vult een bedrag in en verwacht de volgende vraag (huur).
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');

const VRAAG = {
  TI: 'ኣብ ወርሒ ክንደይ ገንዘብ ትቕበል/ትቕበሊ?',
  TR: 'Aylık ne kadar para alıyorsun?',
  NL: 'Hoeveel geld ontvang je per maand?',
};

for (const taal of Object.keys(VRAAG)) {
  test(`budgethulp ${taal}: inkomensvraag staat er en de flow loopt door naar huur`, async ({ page }) => {
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await metTaal(page, taal);
    await page.route(/workers\.dev|solidari\.nl/, (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{}' }));
    await page.goto('budgethulp.html', { waitUntil: 'networkidle' });
    const zone = '#invoer-inner';
    const veld = page.locator(`${zone} input[type=number]:visible`);
    for (let i = 0; i < 30 && !(await veld.count()); i++) {
      const k = page.locator(`${zone} .keuze-btn:visible, ${zone} .ja-btn:visible, ${zone} .verder-btn:visible`);
      if (await k.count()) await k.first().click();
      await page.waitForTimeout(400);
    }
    await expect(veld.first()).toHaveId('inp-inkomen');
    await expect(page.locator('.bel-sol', { hasText: VRAAG[taal] })).toHaveCount(1);
    await expect(page.locator('.bel-sol', { hasText: /undefined/ })).toHaveCount(0);
    await veld.first().fill('1200');
    await veld.first().press('Enter');
    await expect(page.locator('#inp-huur')).toBeVisible({ timeout: 15000 });
    expect(fouten).toEqual([]);
  });
}
