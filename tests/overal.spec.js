// PLAN 17 — voorlezen overal: div-koppen en -tekst (P-1), links en kaarten (P-2, B-3), labels (P-3).
const { test, expect } = require('@playwright/test');
const { metTaal, stubApi } = require('./helpers');

// Nagebootste stem, zoals in voorlezen.spec.js. Alles wat gezegd wordt komt in window.__spoken.
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
  await page.waitForTimeout(800);   // knoppen geplaatst
  await page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
}
// De stem krijgt zin voor zin (splitsZinnen); samen is dat de tekst die voorgelezen werd.
const gezegdSamen = (page) => page.evaluate(() => window.__spoken.join(' '));
const wis = (page) => page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });
const EMOJI = /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u;

// ── Fase 2: koppen en tekst als div (P-1) ───────────────────────────────────────────────────
// Per pagina de elementen uit §1 (P-1). Elk element moet in de voorleesstand een knopje hebben.
const P1 = {
  'index.html': ['.zon-cloud-titel', '.zon-cloud-sub', '.over-kenmerk'],
  'brief.html': ['.upload-titel', '.upload-sub', '.upload-formaten', '.context-titel', '.context-sub',
    '.tips-titel', '.tip-item', '#privacy-titel', '#privacy-tekst'],
  'naturalisatie.html': ['.header-badge', '.vraag-stap'],
  '18jaar.html': ['.header-badge', '.leeftijd-label', '.fase-intro-tekst', '.categorie-header', '.disclaimer'],
  'over.html': ['.hero-label', '.sectie-label', '.principe-titel', '.arch-laag-naam', '.arch-laag-detail',
    '.arch-uitleg-titel', '.privacy-kaart-titel'],
  'feedback.html': ['.privacynoot'],
  'vertaalhulp.html': ['.uitleg'],
};

test.describe('P-1 div-koppen en -tekst', () => {
  for (const [pagina, sels] of Object.entries(P1)) {
    test(`${pagina}: elk element heeft een knopje en wordt gelezen, zonder emoji`, async ({ page }) => {
      await laad(page, pagina);
      const r = await page.evaluate((sels) => {
        const S = window.Solidari.spraak;
        return sels.map((sel) => {
          const els = [...document.querySelectorAll(sel)].filter((el) => el.getClientRects().length > 0);
          return {
            sel, aantal: els.length,
            zonder: els.filter((el) => !el.matches('[data-lees]') || !el.querySelector(':scope > .sol-a11y-knop')).map((el) => el.textContent.trim().slice(0, 30)),
            teksten: els.map((el) => S.leesTekst(el)),
          };
        });
      }, sels);
      for (const x of r) {
        expect(x.aantal, x.sel).toBeGreaterThan(0);
        expect(x.zonder, x.sel).toEqual([]);
        for (const t of x.teksten) {
          expect(t.length, x.sel).toBeGreaterThan(2);
          expect(t, x.sel).not.toMatch(EMOJI);
        }
      }
      // Echt tikken: het knopje van het eerste element van elke soort leest zijn tekst voor.
      for (const x of r) {
        await wis(page);
        await page.locator(`${x.sel} > .sol-a11y-knop`).first().evaluate((b) => b.click());
        await expect.poll(() => gezegdSamen(page), { message: x.sel }).toBe(x.teksten[0]);
      }
      expect(page.url()).toContain(pagina);   // een knopje navigeert nooit
    });
  }

  test('koppen in hoofdletters klinken normaal', async ({ page }) => {
    await laad(page, 'over.html');
    const r = await page.evaluate(() => [...document.querySelectorAll('.hero-label, .sectie-label')]
      .filter((el) => getComputedStyle(el).textTransform === 'uppercase')
      .map((el) => ({ zien: window.Solidari.spraak.zonderEmoji(el.innerText), lees: window.Solidari.spraak.leesTekst(el) })));
    expect(r.length).toBeGreaterThan(0);
    for (const { zien, lees } of r) {
      expect(zien).toBe(zien.toUpperCase());
      expect(lees).not.toBe(lees.toUpperCase());
      expect(lees.toUpperCase()).toBe(zien);
    }
    expect(r.map((x) => x.lees)).toContain('Achtergrond');
  });

  for (const pagina of Object.keys(P1)) {
    test(`${pagina}: geen dubbel lezen (geen knopje in een blok dat zelf een knopje heeft)`, async ({ page }) => {
      await laad(page, pagina);
      const dubbel = await page.evaluate(() => [...document.querySelectorAll('[data-lees]')]
        .filter((el) => el.querySelector(':scope > .sol-a11y-knop'))
        .filter((el) => { const p = el.parentElement.closest('[data-lees]'); return p && p.querySelector(':scope > .sol-a11y-knop'); })
        .map((el) => el.className + ': ' + el.textContent.trim().slice(0, 30)));
      expect(dubbel).toEqual([]);
    });
  }

  test('stand uit: de nieuwe blokken hebben geen zichtbaar knopje en lezen niets', async ({ page }) => {
    await laad(page, 'over.html', { stand: 'uit' });
    expect(await page.locator('.sectie-label > .sol-a11y-knop').count()).toBeGreaterThan(0);
    expect(await page.locator('.sol-a11y-knop:visible').count()).toBe(0);
    await page.locator('.sectie-label').first().click();
    await page.waitForTimeout(150);
    expect(await gezegdSamen(page)).toBe('');
  });
});

// ── Fase 3: links, kaarten en labels (P-2, B-3, P-3) ────────────────────────────────────────
const KAART = 'a.tool-compact[href="brief.html"]';

test.describe('P-2 links en toolkaarten', () => {
  test('stand uit: een toolkaart en een gewone link werken met één tik', async ({ page }) => {
    await laad(page, 'index.html', { stand: 'uit' });
    await page.locator(KAART).click();
    await page.waitForURL(/brief\.html/);
    await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
    await page.locator('a.terug-link').click();
    await page.waitForURL(/index\.html/);
    expect(await gezegdSamen(page)).toBe('');
  });

  test('stand aan: de eerste tik op een toolkaart leest naam en omschrijving, de tweede gaat erheen', async ({ page }) => {
    await laad(page, 'index.html');
    const kaart = page.locator(KAART);
    await kaart.click();
    await page.waitForTimeout(300);
    expect(page.url()).toMatch(/index\.html/);
    expect(await gezegdSamen(page)).toMatch(/^Brief Begrijper\. Maak een foto van je brief\. Wij leggen uit wat er staat, wat je moet doen en wanneer\.?/);
    await expect(kaart.locator('.sol-a11y-tik-hint')).toBeVisible();
    await expect(kaart).toHaveClass(/sol-a11y-keuze-gehoord/);
    // Opgelicht is het vlak licht: de witte kaarttekst moet dan meekleuren (gevonden in Chrome).
    const kleur = await kaart.evaluate((a) => [getComputedStyle(a).color, getComputedStyle(a.querySelector('.tool-compact-naam')).color, getComputedStyle(a.querySelector('.tool-compact-omschrijving')).color]);
    expect(kleur[1]).toBe(kleur[0]);
    expect(kleur[2]).toBe(kleur[0]);
    await kaart.click();
    await page.waitForURL(/brief\.html/);
  });

  test('een toolkaart heeft één knopje; dat leest de kaart en navigeert niet', async ({ page }) => {
    await laad(page, 'index.html');
    const r = await page.evaluate(() => [...document.querySelectorAll('a.tool-compact')].map((a) => a.querySelectorAll('.sol-a11y-knop').length));
    expect(r.length).toBe(7);
    expect(r.every((n) => n === 1)).toBe(true);
    await page.locator(`${KAART} > .sol-a11y-knop`).click();
    await page.waitForTimeout(300);
    expect(page.url()).toMatch(/index\.html/);
    expect(await gezegdSamen(page)).toMatch(/^Brief Begrijper\. Maak een foto/);
    expect(await page.locator('.sol-a11y-tik-hint').count()).toBe(0);
  });

  test('stand aan: links in de inhoud lezen eerst (terug-link zonder pijl, privacylink, logo)', async ({ page }) => {
    await laad(page, 'brief.html');
    let popups = 0;
    page.on('popup', () => { popups++; });
    // Terug-link: zonder "←".
    await page.locator('a.terug-link').click();
    await page.waitForTimeout(250);
    expect(page.url()).toMatch(/brief\.html/);
    expect(await gezegdSamen(page)).toMatch(/^Terug naar alle tools/);
    // Link in het privacyblok (target=_blank): eerst horen, geen nieuw tabblad.
    await wis(page);
    await page.locator('#privacy-tekst a').click();
    await page.waitForTimeout(250);
    expect(popups).toBe(0);
    expect(await gezegdSamen(page)).toMatch(/^Anthropic \(Claude API\)/);
    // Logo in de menubalk (R-25).
    await wis(page);
    await page.locator('#solidari-nav-bar .nav-logo').click();
    await page.waitForTimeout(250);
    expect(page.url()).toMatch(/brief\.html/);
    expect(await gezegdSamen(page)).toMatch(/^Solidari/);
    await page.locator('#solidari-nav-bar .nav-logo').click();
    await page.waitForURL(/index\.html/);
  });

  test('stand aan: de LinkedIn-link op over.html leest eerst', async ({ page }) => {
    await laad(page, 'over.html');
    let popups = 0;
    page.on('popup', () => { popups++; });
    await page.locator('a.linkedin-knop').click();
    await page.waitForTimeout(250);
    expect(popups).toBe(0);
    expect(await gezegdSamen(page)).toMatch(/^LinkedIn/);
  });

  test('TI (geen stem): een toolkaart werkt met één tik, ook in de voorleesstand', async ({ page }) => {
    await laad(page, 'index.html', { taal: 'TI' });
    await page.locator(KAART).click();
    await page.waitForURL(/brief\.html/);
  });

  test('RTL (AR): de toolkaart leest Arabisch, het label "nog een keer" staat in beeld', async ({ page }) => {
    await laad(page, 'index.html', { taal: 'AR' });
    expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
    const kaart = page.locator(KAART);
    await kaart.scrollIntoViewIfNeeded();
    await kaart.click();
    await page.waitForTimeout(300);
    expect(page.url()).toMatch(/index\.html/);
    const t = await gezegdSamen(page);
    expect(t).toMatch(/[؀-ۿ]/);
    expect(t).not.toMatch(EMOJI);
    const r = await page.evaluate((sel) => {
      const h = document.querySelector(sel + ' .sol-a11y-tik-hint').getBoundingClientRect();
      const k = document.querySelector(sel + ' > .sol-a11y-knop').getBoundingClientRect();
      const c = document.querySelector(sel).getBoundingClientRect();
      return { h, k, c, vw: document.documentElement.clientWidth };
    }, KAART);
    expect(r.h.left).toBeGreaterThanOrEqual(0);
    expect(r.h.right).toBeLessThanOrEqual(r.vw);
    expect(r.k.left).toBeGreaterThanOrEqual(r.c.left - 1);
    expect(r.k.right).toBeLessThanOrEqual(r.c.right + 1);
  });
});

test.describe('B-3 categoriekop op 18jaar.html', () => {
  test('stand aan: de eerste tik leest naam, samenvatting en chip; pas de tweede klapt open', async ({ page }) => {
    await laad(page, '18jaar.html');
    const kaart = page.locator('.categorie-kaart').nth(1);
    const kop = kaart.locator('.categorie-header');
    await expect(kaart).not.toHaveClass(/\bopen\b/);
    const verwacht = await kop.evaluate((el) => {
      const d = [...el.querySelectorAll('[data-lees-deel]')].map((x) => x.textContent.trim());
      return d;
    });
    expect(verwacht.length).toBe(3);
    await kop.click();
    await page.waitForTimeout(300);
    await expect(kaart).not.toHaveClass(/\bopen\b/);
    // Het label "Nog een keer" staat binnen de kaart (die knipt af, gevonden in Chrome).
    const r = await kaart.evaluate((k) => ({ k: k.getBoundingClientRect().toJSON(), h: k.querySelector('.sol-a11y-tik-hint').getBoundingClientRect().toJSON() }));
    expect(r.h.top).toBeGreaterThanOrEqual(r.k.top);
    expect(r.h.bottom).toBeLessThanOrEqual(r.k.bottom);
    const t = await gezegdSamen(page);
    // "Kindgebonden budget. Stopt op je verjaardag. Stopt." — de chip niet in hoofdletters.
    expect(t.startsWith(verwacht[0] + '. ')).toBe(true);
    expect(t).toContain(verwacht[1].replace(/[.\s]+$/, ''));
    const chip = verwacht[2].charAt(0) + verwacht[2].slice(1).toLowerCase();
    expect(t).toMatch(new RegExp('\\. ' + chip + '\\.?'));
    if (verwacht[2] !== chip) expect(t).not.toContain(verwacht[2]);
    await kop.click();
    await expect(kaart).toHaveClass(/\bopen\b/);
  });

  test('stand uit: één tik klapt open', async ({ page }) => {
    await laad(page, '18jaar.html', { stand: 'uit' });
    const kaart = page.locator('.categorie-kaart').nth(1);
    await kaart.locator('.categorie-header').click();
    await expect(kaart).toHaveClass(/\bopen\b/);
  });

  test('het knopje van de kop leest dezelfde tekst en klapt niet open', async ({ page }) => {
    await laad(page, '18jaar.html');
    const kaart = page.locator('.categorie-kaart').nth(1);
    const kop = kaart.locator('.categorie-header');
    expect(await kop.locator('.sol-a11y-knop').count()).toBe(1);
    const lees = await kop.evaluate((el) => window.Solidari.spraak.leesTekst(el));
    await kop.locator('> .sol-a11y-knop').click();
    await page.waitForTimeout(250);
    await expect(kaart).not.toHaveClass(/\bopen\b/);
    expect(await gezegdSamen(page)).toBe(lees);
  });
});

test.describe('P-3 labels', () => {
  test('feedback.html: een label leest voor en geeft het veld de focus; geen knopje bij labels', async ({ page }) => {
    await laad(page, 'feedback.html');
    expect(await page.locator('label .sol-a11y-knop, .veld-label .sol-a11y-knop').count()).toBe(0);
    await page.locator('label[for="omschrijving"]').click();
    await page.waitForTimeout(200);
    expect(await gezegdSamen(page)).toBe('Omschrijving, 0 / 2000');
    expect(await page.evaluate(() => document.activeElement && document.activeElement.id)).toBe('omschrijving');
    await wis(page);
    await page.locator('label[for="email"]').click();
    await page.waitForTimeout(200);
    expect(await gezegdSamen(page)).toBe('E-mailadres (optioneel)');
    expect(await page.evaluate(() => document.activeElement && document.activeElement.id)).toBe('email');
    await wis(page);
    await page.locator('#tool-label').click();
    await page.waitForTimeout(200);
    expect(await gezegdSamen(page)).toBe('Welke tool?');
  });

  test('feedback.html: de teller leest de stand van nu', async ({ page }) => {
    await laad(page, 'feedback.html');
    await page.locator('#omschrijving').fill('Hallo');
    await page.locator('#omschrijving').dispatchEvent('input');
    await wis(page);
    await page.locator('label[for="omschrijving"]').click();
    await page.waitForTimeout(200);
    expect(await gezegdSamen(page)).toBe('Omschrijving, 5 / 2000');
  });

  test('vertaalhulp.html: label en uitleg', async ({ page }) => {
    await laad(page, 'vertaalhulp.html');
    await page.locator('label[for="taal-keuze"]').click();
    await page.waitForTimeout(200);
    expect(await gezegdSamen(page)).toBe('Wat is jouw moedertaal?');
    expect(await page.evaluate(() => document.activeElement && document.activeElement.id)).toBe('taal-keuze');
    await wis(page);
    await page.locator('label[for="naam"]').click();
    await page.waitForTimeout(200);
    expect(await gezegdSamen(page)).toBe('Jouw naam (optioneel)');
  });

  test('stand uit: een label leest niets en geeft wel de focus', async ({ page }) => {
    await laad(page, 'feedback.html', { stand: 'uit' });
    await page.locator('label[for="omschrijving"]').click();
    await page.waitForTimeout(200);
    expect(await gezegdSamen(page)).toBe('');
    expect(await page.evaluate(() => document.activeElement && document.activeElement.id)).toBe('omschrijving');
  });

  test('RTL (AR): het label leest Arabisch', async ({ page }) => {
    await laad(page, 'feedback.html', { taal: 'AR' });
    expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
    await page.locator('label[for="email"]').click();
    await page.waitForTimeout(200);
    expect(await gezegdSamen(page)).toMatch(/[؀-ۿ]/);
  });
});

test.describe('375 px', () => {
  test.use({ viewport: { width: 375, height: 740 } });
  for (const [pagina, sel] of [['index.html', 'a.tool-compact'], ['18jaar.html', '.categorie-header'], ['brief.html', '.tip-item'], ['over.html', '.arch-laag-naam']]) {
    test(`${pagina}: de knopjes staan binnen hun blok, geen horizontaal scrollen`, async ({ page }) => {
      await laad(page, pagina);
      const r = await page.evaluate((sel) => ({
        breed: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        buiten: [...document.querySelectorAll(sel)].filter((el) => el.getClientRects().length).map((el) => {
          const b = el.getBoundingClientRect(), k = el.querySelector(':scope > .sol-a11y-knop').getBoundingClientRect();
          return k.left < b.left - 1 || k.right > b.right + 1 || k.width < 40 ? el.textContent.trim().slice(0, 20) : null;
        }).filter(Boolean),
      }), sel);
      expect(r.breed).toBeLessThanOrEqual(0);
      expect(r.buiten).toEqual([]);
    });
  }
});
