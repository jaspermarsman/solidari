// PLAN 16 — voorlezen, rustiger en vollediger (V-1 t/m V-5).
const { test, expect } = require('@playwright/test');
const { PAGES, metTaal, stubApi } = require('./helpers');

// Nagebootste stem, zoals in ronde3.spec.js. Alles wat gezegd wordt komt in window.__spoken.
const STUB = () => {
  const V = ['nl-NL', 'en-GB', 'ar-SA', 'pl-PL', 'uk-UA', 'tr-TR', 'fa-IR', 'ro-RO'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
  window.__spoken = [];
  function U(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; this.lang = ''; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: U });
  const s = {
    getVoices: () => V,
    speak: (u) => { if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 30); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
};

async function laad(page, pagina, { taal = 'NL', stand = 'aan' } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((st) => { try { localStorage.setItem('solidari-voorlezen', st); } catch (e) {} }, stand);
  await page.addInitScript(STUB);
  await stubApi(page, { tekst: 'Testantwoord.', bronnen: [] });
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak && window.Solidari.i18n);
  await page.waitForTimeout(800);   // knoppen geplaatst; chatpagina's lezen hun eerste ballon vanzelf
  await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
}
const gezegd = (page) => page.evaluate(() => window.__spoken.join(' | '));
// De stem krijgt zin voor zin (splitsZinnen); samen is dat de tekst die voorgelezen werd.
const gezegdSamen = (page) => page.evaluate(() => window.__spoken.join(' '));
const EMOJI = /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u;

// ── Fase 1: geen "luidspreker" meer (V-2, B-7) ─────────────────────────────────────────────
test.describe('V-2 tekst zonder knopjes en emoji', () => {
  for (const pagina of PAGES) {
    test(`${pagina}: geen voorgelezen tekst bevat een emoji of een knopje`, async ({ page }) => {
      await laad(page, pagina);
      const r = await page.evaluate(() => {
        const S = window.Solidari.spraak;
        const blokken = [...document.querySelectorAll('[data-lees]')];
        const fout = blokken.map((el) => S.leesTekst(el)).filter((t) => /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u.test(t));
        return { aantal: blokken.length, knoppen: document.querySelectorAll('.sol-a11y-knop').length, fout };
      });
      expect(r.fout).toEqual([]);
      // Echt tikken: de eerste paar 🔊-knopjes en blokken lezen geen emoji voor.
      const knoppen = page.locator('.sol-a11y-knop:visible');
      const n = Math.min(await knoppen.count(), 4);
      for (let i = 0; i < n; i++) {
        await knoppen.nth(i).evaluate((b) => b.click());   // een vaste balk kan ervoor liggen
        await page.waitForTimeout(120);
      }
      const tekst = await gezegd(page);
      if (n) expect(tekst.length).toBeGreaterThan(0);
      expect(tekst).not.toMatch(EMOJI);
      expect(tekst.toLowerCase()).not.toContain('luidspreker');
    });
  }

  test('een tik op een blok in de voorleesstand leest de tekst zonder 🔊', async ({ page }) => {
    await laad(page, 'index.html');
    const blok = page.locator('p[data-lees]:has(> .sol-a11y-knop)').first();
    await blok.click({ position: { x: 5, y: 5 } });
    await page.waitForTimeout(200);
    const tekst = await gezegd(page);
    expect(tekst.length).toBeGreaterThan(20);
    expect(tekst).not.toMatch(EMOJI);
  });

  test('leesTekst slaat knopjes, microfoon en aria-hidden over', async ({ page }) => {
    await laad(page, 'index.html');
    const t = await page.evaluate(() => {
      const p = document.createElement('p');
      p.innerHTML = 'Hallo <span aria-hidden="true">👋</span>wereld<button class="sol-a11y-knop">🔊</button><button class="sol-a11y-mic">🎤 Spreek</button> ✅ klaar';
      return window.Solidari.spraak.leesTekst(p);
    });
    expect(t).toBe('Hallo wereld klaar');
  });
});

// ── Fase 2: koppen, cijfervakjes en checklist (V-3, V-4, V-5) ──────────────────────────────
const lees = (loc) => loc.evaluate((el) => window.Solidari.spraak.leesTekst(el));

test.describe('V-3 koppen', () => {
  test('index.html: de koppen hebben een knopje in de voorleesstand, ook als ze kort zijn', async ({ page }) => {
    await laad(page, 'index.html');
    const zonder = await page.evaluate(() => [...document.querySelectorAll('h1, h2, h3, h4, [data-lees-rol]')]
      .filter((el) => !el.closest('nav, footer, a, button, [data-geen-lees]') && el.textContent.trim())
      .filter((el) => !el.querySelector(':scope > .sol-a11y-knop'))
      .map((el) => el.textContent.trim().slice(0, 40)));
    expect(zonder).toEqual([]);
    const titel = page.locator('h2.missie-titel');
    await expect(titel.locator('.sol-a11y-knop')).toHaveCount(1);
    expect(await lees(titel)).toBe('Duidelijke informatie in gewone taal.');
  });

  test('"ONZE AANPAK" wordt gelezen als "Onze aanpak", ook via het knopje', async ({ page }) => {
    await laad(page, 'index.html');
    const label = page.locator('.sectie-label[data-i18n="missie-label"]');
    expect(await label.evaluate((el) => el.innerText.replace('🔊', '').trim())).toBe('ONZE AANPAK');   // CSS-hoofdletters
    expect(await lees(label)).toBe('Onze aanpak');
    await label.locator('.sol-a11y-knop').evaluate((b) => b.click());
    await page.waitForTimeout(150);
    expect(await gezegd(page)).toBe('Onze aanpak');
  });
});

test.describe('V-4 cijfervakjes', () => {
  const VERWACHT = {
    NL: ['7 Gratis tools', '9 Ondersteunde talen', '0 Opgeslagen gegevens', 'Energiebron'],
    EN: ['7 Free tools', '9 Supported languages', '0 Stored data', 'Energy source'],
    AR: ['7 أدوات مجانية', '9 لغات مدعومة', '0 بيانات مخزنة', 'مصدر الطاقة'],
  };
  for (const [taal, verwacht] of Object.entries(VERWACHT)) {
    test(`index.html ${taal}: elk vakje is één blok met getal en label`, async ({ page }) => {
      await laad(page, 'index.html', { taal });
      const vakjes = page.locator('.stat-item');
      await expect(vakjes).toHaveCount(4);
      for (let i = 0; i < 4; i++) {
        await expect(vakjes.nth(i).locator(':scope > .sol-a11y-knop')).toHaveCount(1);
        expect(await lees(vakjes.nth(i))).toBe(verwacht[i]);
      }
      await vakjes.first().locator('.sol-a11y-knop').evaluate((b) => b.click());
      await page.waitForTimeout(150);
      expect(await gezegd(page)).toBe(verwacht[0]);
    });
  }

  test('na een taalwissel leest het vakje in de nieuwe taal', async ({ page }) => {
    await laad(page, 'index.html');
    // In de voorleesstand kiest een taalknop met twee tikken.
    await page.evaluate(() => { const b = document.querySelector('#solidari-nav-bar .taal-btn[data-taal="EN"]'); b.click(); b.click(); });
    await page.waitForTimeout(600);
    await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    const vak = page.locator('.stat-item').first();
    await vak.locator(':scope > .sol-a11y-knop').evaluate((b) => b.click());
    await page.waitForTimeout(150);
    expect(await gezegd(page)).toBe('7 Free tools');
  });
});

test.describe('V-5 checklist', () => {
  test('18jaar.html: de titel zegt "Checklist: …", elke regel zegt zijn stand, en die verandert na aanvinken', async ({ page }) => {
    await laad(page, '18jaar.html');
    const titel = page.locator('.checklist-titel');
    await expect(titel.locator('.sol-a11y-knop')).toHaveCount(1);
    expect(await lees(titel)).toBe('Checklist: klik aan wat je hebt geregeld');

    const regel = page.locator('.checklist-item').first();
    await expect(regel.locator(':scope > .sol-a11y-knop')).toHaveCount(1);
    const tekst = (await regel.locator('.checklist-tekst').textContent()).trim();
    const sub = (await regel.locator('.checklist-sub').textContent()).trim();
    const voor = await lees(regel);
    expect(voor.startsWith(tekst.replace(/\.$/, ''))).toBe(true);
    expect(voor).toContain(sub.replace(/[.\s]+$/, ''));
    expect(voor).toMatch(/\. Nog niet gedaan$/);
    expect(voor).not.toMatch(/\.\./);

    // Het 🔊-knopje leest de stand van nu.
    await regel.locator('.check-box').evaluate((b) => b.click());   // aanvinken (één tik, geen twee tikken)
    await expect(regel).toHaveClass(/gedaan/);
    await page.waitForTimeout(150);
    await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
    await regel.locator(':scope > .sol-a11y-knop').evaluate((b) => b.click());
    await page.waitForTimeout(250);
    expect(await gezegdSamen(page)).toBe(await lees(regel));
    expect(await gezegdSamen(page)).toMatch(/\. Afgevinkt$/);
  });

  test('18jaar.html: één tik op de regel vinkt aan en zegt meteen de nieuwe stand', async ({ page }) => {
    await laad(page, '18jaar.html');
    const regel = page.locator('.checklist-item').nth(1);
    await regel.locator('.checklist-tekst').scrollIntoViewIfNeeded();
    await regel.locator('.checklist-tekst').click();
    await expect(regel).toHaveClass(/gedaan/);
    await page.waitForTimeout(250);
    expect(await gezegdSamen(page)).toMatch(/\. Afgevinkt$/);
    await page.evaluate(() => { window.__spoken = []; });
    await regel.locator('.checklist-tekst').click();
    await expect(regel).not.toHaveClass(/gedaan/);
    await page.waitForTimeout(250);
    expect(await gezegdSamen(page)).toMatch(/\. Nog niet gedaan$/);
  });

  test('18jaar.html EN: de checklist in het Engels', async ({ page }) => {
    await laad(page, '18jaar.html', { taal: 'EN' });
    expect(await lees(page.locator('.checklist-titel'))).toBe('Checklist: tick off what you have arranged');
    expect(await lees(page.locator('.checklist-item').first())).toMatch(/\. Not done yet$/);
  });
});

// ── Fase 3: knopjes alleen in de voorleesstand, en de vraag (V-1, B-1 t/m B-5) ─────────────
const zichtbareKnoppen = (page) => page.evaluate(() => [...document.querySelectorAll('.sol-a11y-knop')]
  .filter((b) => b.getClientRects().length > 0 && getComputedStyle(b).display !== 'none').length);
const staat = (page) => page.evaluate(() => ({
  aan: window.Solidari.spraak.luistermodus.staat(),
  voorlezen: localStorage.getItem('solidari-voorlezen'),
  gevraagd: localStorage.getItem('solidari-voorlees-gevraagd'),
}));
// Een vers toestel: alleen de stem (of geen stem), verder niets in de opslag.
async function vers(page, { stem = true, opslag = {} } = {}) {
  await page.addInitScript((o) => {
    if (sessionStorage.getItem('__vers')) return;   // alleen bij het eerste laden; daarna geldt wat de pagina bewaarde
    sessionStorage.setItem('__vers', '1');
    try { localStorage.clear(); Object.entries(o).forEach(([k, v]) => localStorage.setItem(k, v)); } catch (e) {}
  }, opslag);
  if (stem) await page.addInitScript(STUB);
  else await page.addInitScript(() => { window.__spoken = []; });
}
const VRAAG = '.sol-a11y-vraag-scherm';

test.describe('V-1 knopjes alleen in de voorleesstand (B-1)', () => {
  test('stand uit: geen zichtbare knopjes, en er wordt niets voorgelezen', async ({ page }) => {
    await laad(page, 'index.html', { stand: 'uit' });
    expect(await page.locator('.sol-a11y-knop').count()).toBeGreaterThan(5);   // wel geplaatst
    expect(await zichtbareKnoppen(page)).toBe(0);
    await page.locator('.sol-a11y-knop').first().evaluate((b) => b.click());
    await page.locator('p[data-lees]').first().click({ position: { x: 5, y: 5 } });
    await page.waitForTimeout(200);
    expect(await gezegd(page)).toBe('');
  });

  test('stand aan: knopjes zichtbaar; schakelaar uit en weer aan werkt meteen, zonder herladen', async ({ page }) => {
    await laad(page, 'index.html', { stand: 'aan' });
    const n = await zichtbareKnoppen(page);
    expect(n).toBeGreaterThan(5);
    const schakelaar = page.locator('.sol-a11y-luister-toggle');
    await schakelaar.click();
    expect(await zichtbareKnoppen(page)).toBe(0);
    await schakelaar.click();
    expect(await zichtbareKnoppen(page)).toBe(n);
  });

  test('budgethulp, stand uit: de chatballon houdt geen ruimte vrij voor een knopje', async ({ page }) => {
    await laad(page, 'budgethulp.html', { stand: 'uit' });
    const pad = await page.locator('.bel-sol').first().evaluate((b) => getComputedStyle(b).paddingInlineEnd);
    expect(parseFloat(pad)).toBeLessThan(30);
    expect(await zichtbareKnoppen(page)).toBe(0);
  });
});

test.describe('V-1 de vraag in het welkomstscherm (B-2)', () => {
  test('taal NL → de vraag, uitgesproken; Ja zet de stand aan', async ({ page }) => {
    await vers(page);
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await page.locator('.sol-a11y-welkom-kaart[data-taal="NL"]').click();
    await expect(page.locator('.sol-a11y-welkom')).toHaveCount(0);
    const vraag = page.locator(VRAAG);
    await expect(vraag).toBeVisible();
    await expect(vraag.locator('.sol-a11y-vraag-tekst')).toHaveText('Wil je dat we voorlezen?');
    await expect(vraag.locator('.sol-a11y-vraag-ja')).toContainText('Ja');
    await expect(vraag.locator('.sol-a11y-vraag-nee')).toContainText('Nee');
    await expect.poll(() => gezegd(page)).toContain('Wil je dat we voorlezen?');
    expect(await gezegd(page)).toBe('Nederlands | Wil je dat we voorlezen?');   // de naam één keer, dan de vraag
    expect(await zichtbareKnoppen(page)).toBe(0);
    await vraag.locator('.sol-a11y-vraag-ja').click();
    await expect(vraag).toHaveCount(0);
    expect(await staat(page)).toEqual({ aan: true, voorlezen: 'aan', gevraagd: '1' });
    await expect(page.locator('.sol-a11y-luister-toggle')).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => zichtbareKnoppen(page)).toBeGreaterThan(5);
    await expect.poll(() => gezegd(page)).toContain('Voorlezen staat aan');
    // Volgend bezoek: geen vraag meer, de stand blijft aan.
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await expect(page.locator(VRAAG)).toHaveCount(0);
    expect((await staat(page)).aan).toBe(true);
  });

  test('Nee laat de stand uit, en de vraag komt niet terug', async ({ page }) => {
    await vers(page);
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await page.locator('.sol-a11y-welkom-kaart[data-taal="NL"]').click();
    await page.locator(`${VRAAG} .sol-a11y-vraag-nee`).click();
    await expect(page.locator(VRAAG)).toHaveCount(0);
    expect(await staat(page)).toEqual({ aan: false, voorlezen: null, gevraagd: '1' });
    expect(await zichtbareKnoppen(page)).toBe(0);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await expect(page.locator(VRAAG)).toHaveCount(0);
  });

  test('een tik op het pictogram herhaalt de vraag', async ({ page }) => {
    await vers(page);
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await page.locator('.sol-a11y-welkom-kaart[data-taal="EN"]').click();
    await expect(page.locator(`${VRAAG} .sol-a11y-vraag-tekst`)).toHaveText('Do you want us to read aloud?');
    await expect.poll(() => gezegd(page)).toBe('English | Do you want us to read aloud?');
    await page.evaluate(() => { window.__spoken = []; });
    await page.locator(`${VRAAG} .sol-a11y-vraag-luister`).click();
    await expect.poll(() => gezegd(page)).toBe('Do you want us to read aloud?');
  });

  test('wie op het pictogram tikt voordat de vraag klonk, hoort hem één keer', async ({ page }) => {
    await vers(page);
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await page.locator('.sol-a11y-welkom-kaart[data-taal="NL"]').click();
    await page.locator(`${VRAAG} .sol-a11y-vraag-luister`).click();
    await page.waitForTimeout(1500);
    expect((await gezegd(page)).match(/Wil je dat we voorlezen\?/g)).toHaveLength(1);
  });

  test('TI: geen vraag, en het vlaggetje blijft leeg', async ({ page }) => {
    await vers(page);
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await page.locator('.sol-a11y-welkom-kaart[data-taal="TI"]').click();
    await page.waitForTimeout(500);
    await expect(page.locator(VRAAG)).toHaveCount(0);
    expect(await staat(page)).toEqual({ aan: false, voorlezen: null, gevraagd: null });
  });

  test('toestel zonder stem: geen vraag', async ({ page }) => {
    await vers(page, { stem: false });
    await page.addInitScript(() => {
      const s = { getVoices: () => [], speak: () => {}, cancel: () => {}, pause: () => {}, resume: () => {}, speaking: false, addEventListener() {} };
      Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
    });
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await page.locator('.sol-a11y-welkom-kaart[data-taal="NL"]').click();
    await page.waitForTimeout(500);
    await expect(page.locator(VRAAG)).toHaveCount(0);
  });
});

test.describe('V-1 de losse vraag, één keer (B-3, B-4, B-5)', () => {
  test('terugkerende bezoeker: de vraag één keer, los; een tik op het pictogram spreekt hem uit', async ({ page }) => {
    await vers(page, { opslag: { 'solidari-welkom-gezien': '1', 'solidari-taal': 'NL' } });
    await page.goto('index.html', { waitUntil: 'networkidle' });
    const vraag = page.locator(`${VRAAG}.sol-a11y-vraag-los`);
    await expect(vraag).toBeVisible();
    await expect(page.locator('.sol-a11y-welkom')).toHaveCount(0);
    // Geen gebaar gehad: de browser zou het geluid blokkeren, dus de vraag wacht op een tik.
    await vraag.locator('.sol-a11y-vraag-luister').click();
    await expect.poll(() => gezegd(page)).toContain('Wil je dat we voorlezen?');
    await vraag.locator('.sol-a11y-vraag-ja').click();
    expect(await staat(page)).toEqual({ aan: true, voorlezen: 'aan', gevraagd: '1' });
    await page.goto('18jaar.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await expect(page.locator(VRAAG)).toHaveCount(0);
  });

  test('terugkerende bezoeker die de pagina verlaat zonder te kiezen: toch maar één keer', async ({ page }) => {
    await vers(page, { opslag: { 'solidari-welkom-gezien': '1', 'solidari-taal': 'NL' } });
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await expect(page.locator(VRAAG)).toBeVisible();
    await page.goto('over.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await expect(page.locator(VRAAG)).toHaveCount(0);
  });

  test('wie de stand al aan heeft, krijgt de vraag niet', async ({ page }) => {
    await vers(page, { opslag: { 'solidari-welkom-gezien': '1', 'solidari-voorlezen': 'aan' } });
    await page.goto('index.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await expect(page.locator(VRAAG)).toHaveCount(0);
  });

  test('?taal=pl: geen welkomstscherm, wel één keer de vraag in het Pools', async ({ page }) => {
    await vers(page);
    await page.goto('index.html?taal=pl', { waitUntil: 'networkidle' });
    await expect(page.locator('.sol-a11y-welkom')).toHaveCount(0);
    const vraag = page.locator(`${VRAAG}.sol-a11y-vraag-los`);
    await expect(vraag).toBeVisible();
    await expect(vraag.locator('.sol-a11y-vraag-tekst')).toHaveText('Czy chcesz, żebyśmy czytali na głos?');
    await expect(vraag.locator('.sol-a11y-vraag-ja')).toContainText('Tak');
    await vraag.locator('.sol-a11y-vraag-nee').click();
    expect((await staat(page)).aan).toBe(false);
    await page.goto('budgethulp.html?taal=pl', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await expect(page.locator(VRAAG)).toHaveCount(0);
  });

  test('?taal=ti: geen vraag', async ({ page }) => {
    await vers(page);
    await page.goto('index.html?taal=ti', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await expect(page.locator(VRAAG)).toHaveCount(0);
    await expect(page.locator('.sol-a11y-luister-toggle')).toBeHidden();
    expect(await zichtbareKnoppen(page)).toBe(0);
  });

  test('?taal=ar: de vraag in het Arabisch, van rechts naar links, alles in beeld', async ({ page }) => {
    await vers(page);
    await page.goto('index.html?taal=ar', { waitUntil: 'networkidle' });
    const vraag = page.locator(VRAAG);
    await expect(vraag).toBeVisible();
    await expect(vraag.locator('.sol-a11y-vraag-tekst')).toHaveText('هل تريد أن نقرأ لك بصوت عالٍ؟');
    await expect(vraag.locator('.sol-a11y-vraag-ja')).toContainText('نعم');
    expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
    const r = await page.evaluate(() => {
      const ja = document.querySelector('.sol-a11y-vraag-ja').getBoundingClientRect();
      const nee = document.querySelector('.sol-a11y-vraag-nee').getBoundingClientRect();
      return { jaRechts: ja.left > nee.left, inBeeld: ja.left >= 0 && nee.left >= 0 && ja.right <= innerWidth && nee.right <= innerWidth };
    });
    expect(r).toEqual({ jaRechts: true, inBeeld: true });   // RTL: Ja staat rechts, eerst in leesrichting
  });
});

test.describe('V-1 de vraag op 375 px', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  for (const [soort, opslag, url] of [['welkomstscherm', {}, 'index.html'], ['los', { 'solidari-welkom-gezien': '1', 'solidari-taal': 'NL' }, 'index.html'], ['los AR', {}, 'brief.html?taal=ar']]) {
    test(`${soort}: past op 375 px, grote knoppen, niets valt buiten beeld`, async ({ page }) => {
      await vers(page, { opslag });
      await page.goto(url, { waitUntil: 'networkidle' });
      if (soort === 'welkomstscherm') await page.locator('.sol-a11y-welkom-kaart[data-taal="NL"]').click();
      await expect(page.locator(VRAAG)).toBeVisible();
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const delen = ['.sol-a11y-vraag-doos', '.sol-a11y-vraag-luister', '.sol-a11y-vraag-tekst', '.sol-a11y-vraag-ja', '.sol-a11y-vraag-nee']
          .map((s) => document.querySelector(s).getBoundingClientRect());
        const ja = delen[3], nee = delen[4];
        return {
          inBeeld: delen.every((d) => d.left >= 0 && d.right <= vw && d.top >= 0 && d.bottom <= innerHeight),
          groot: ja.height >= 56 && nee.height >= 56 && ja.width >= 120 && nee.width >= 120,
          geenScroll: document.documentElement.scrollWidth <= vw,
        };
      });
      expect(r).toEqual({ inBeeld: true, groot: true, geenScroll: true });
    });
  }
});
