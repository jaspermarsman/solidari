// PLAN-5 fase 2 — zegReeks en vanzelf voorlezen in de voorleesstand (B-2), mobiel.
// Nagebootste stem als in voorlezen-mobiel.spec.js en a11y-v5-fase1.spec.js, maar met een
// snel (120 ms) tempo per zin en een logboek van wat er wanneer werd gezegd en wat oplichtte.
const { test, expect, devices } = require('@playwright/test');
const { metTaal } = require('./helpers');

test.use({ ...devices['Pixel 5'] });

const STUB = () => {
  const V = ['nl-NL', 'en-GB', 'ti-ET'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
  window.__log = [];      // {tekst, lit:[teksten van oplichtende knoppen]} of {marker:'tap'}
  const timers = new Set();
  function U(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: U });
  const s = {
    getVoices: () => V,
    speak: (u) => {
      const stil = !u.text.trim();
      if (!stil) {
        const lit = [...document.querySelectorAll('.sol-a11y-keuze-opgenoemd')].map((e) => e.textContent.replace(/\s+/g, ' ').trim());
        window.__log.push({ tekst: u.text, lit });
      }
      const id = setTimeout(() => { timers.delete(id); u.onend && u.onend(); }, stil ? 0 : 120);
      timers.add(id);
    },
    cancel: () => { timers.forEach(clearTimeout); timers.clear(); },
    pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
  document.addEventListener('pointerdown', () => window.__log.push({ marker: 'tap' }), true);
};

const PAGINAS = ['budgethulp.html', 'rechten.html', 'loont-werken.html', 'goedvoorbereid.html'];

async function laad(page, pagina, { taal = 'NL', stand = 'aan' } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((s) => { try { if (s) localStorage.setItem('solidari-voorlezen', s); else localStorage.removeItem('solidari-voorlezen'); } catch (e) {} }, stand);
  await page.addInitScript(STUB);
  await page.route(/workers\.dev|solidari\.nl/, (r) => r.fulfill({
    status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify({ tekst: 'Testantwoord.', bronnen: [] }),
  }));
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
}

// Zichtbare keuzeknoppen in DOM-volgorde, met hun voorleestekst.
const KNOPPEN = () => {
  const S = window.Solidari.spraak;
  return [...document.querySelectorAll(S.keuzeSelector)]
    .filter((el) => el.closest('#berichten, #invoer-zone, #keuze-zone') && S.isKeuzeknop(el) && !el.disabled && el.getClientRects().length > 0)
    .map((el) => ({ tekst: S.keuzeTekst(el), naam: el.textContent.replace(/\s+/g, ' ').trim() }));
};
const log = (page) => page.evaluate(() => window.__log.slice());
const spraakTeksten = (l) => l.filter((x) => x.tekst).map((x) => x.tekst.replace(/\s+/g, ' ').trim());
const schoon = (t) => t.replace(/\p{Extended_Pictographic}|\p{Regional_Indicator}|️|‍/gu, ' ').replace(/\s+/g, ' ').trim();

// Wacht tot de laatste keuzeknop is opgenoemd en de reeks klaar is.
async function wachtOpReeks(page) {
  try {
    await page.waitForFunction(KNOPPEN_WACHT, null, { timeout: 25000 });
  } catch (e) {
    throw new Error('reeks niet afgelopen; logboek: ' + JSON.stringify(await page.evaluate(() => window.__log.map((x) => [x.tekst || x.marker, x.lit]))));
  }
}
const KNOPPEN_WACHT = () => {
  const S = window.Solidari.spraak;
  const kn = [...document.querySelectorAll(S.keuzeSelector)].filter((el) => el.closest('#berichten, #invoer-zone, #keuze-zone') && S.isKeuzeknop(el) && !el.disabled && el.getClientRects().length > 0);
  if (kn.length < 2) return false;
  const laatste = S.keuzeTekst(kn[kn.length - 1]).replace(/\s+/g, ' ');
  return window.__log.some((x) => x.tekst && x.tekst.replace(/\s+/g, ' ').includes(laatste.slice(0, 15)) && x.lit && x.lit.length);
};

for (const pagina of PAGINAS) {
  test.describe(pagina, () => {
    test('volgorde: eerst de ballon, dan de keuzes in DOM-volgorde, knop licht op', async ({ page }) => {
      await laad(page, pagina);
      await wachtOpReeks(page);
      await page.waitForTimeout(500);
      const knoppen = await page.evaluate(KNOPPEN);
      const l = await log(page);
      const teksten = spraakTeksten(l);
      const alles = teksten.join(' ');
      // de laatste ballon vóór de knoppen
      const ballon = await page.evaluate(() => {
        const b = [...document.querySelectorAll('.bel-sol')].pop();
        return b ? b.textContent : '';
      });
      const ballonTekst = schoon(ballon).slice(0, 25);
      expect(ballonTekst.length).toBeGreaterThan(0);
      let cursor = alles.indexOf(ballonTekst);
      expect(cursor, 'ballon wordt voorgelezen: ' + ballonTekst).toBeGreaterThanOrEqual(0);
      for (const k of knoppen) {
        const p = alles.indexOf(k.tekst.slice(0, 20), cursor);
        expect(p, 'keuze na de ballon en in volgorde: ' + k.tekst).toBeGreaterThan(cursor - 1);
        cursor = p + 1;
      }
      // oplichten: de lit-reeks (ontdubbeld) is precies de knoppenreeks
      const lit = [];
      for (const x of l) for (const t of x.lit || []) if (lit[lit.length - 1] !== t) lit.push(t);
      expect(lit).toEqual(knoppen.map((k) => k.naam));
      // en na afloop licht niets meer op
      await expect(page.locator('.sol-a11y-keuze-opgenoemd')).toHaveCount(0);
    });
  });
}

test('een tik breekt de reeks af en leest de getikte knop voor (en de tweede tik kiest)', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  // wacht tot het opnoemen loopt: de eerste knop licht op
  await page.waitForFunction(() => window.__log.some((x) => x.lit && x.lit.length), null, { timeout: 25000 });
  const knoppen = await page.evaluate(KNOPPEN);
  expect(knoppen.length).toBeGreaterThan(3);
  const doel = page.locator(await page.evaluate(() => window.Solidari.spraak.keuzeSelector)).filter({ hasText: knoppen[knoppen.length - 1].naam.slice(0, 12) }).first();
  await page.evaluate(() => { const S = window.Solidari.spraak; S.keuzeTijd(6000); });
  await page.evaluate((sel) => {
    const el = [...document.querySelectorAll(sel)].filter((e) => window.Solidari.spraak.isKeuzeknop(e)).pop();
    el.__geklikt = 0; el.addEventListener('click', () => { el.__geklikt++; });
    window.__kn = el;
  }, await page.evaluate(() => window.Solidari.spraak.keuzeSelector));
  await doel.click();
  await page.waitForTimeout(2500);
  const l = await log(page);
  const i = l.map((x) => x.marker).lastIndexOf('tap');
  const erna = spraakTeksten(l.slice(i + 1));
  expect(erna.length, 'alleen de getikte knop wordt nog gezegd').toBe(1);
  expect(erna[0]).toContain(knoppen[knoppen.length - 1].tekst.slice(0, 15));
  expect(await page.evaluate(() => window.__kn.__geklikt), 'eerste tik kiest nog niet').toBe(0);
  await expect(page.locator('.sol-a11y-keuze-opgenoemd')).toHaveCount(0);
  await doel.click();
  expect(await page.evaluate(() => window.__kn.__geklikt), 'tweede tik kiest').toBe(1);
});

test('een toets breekt de reeks ook af', async ({ page }) => {
  await laad(page, 'rechten.html');
  await page.waitForFunction(() => window.__log.some((x) => x.lit && x.lit.length), null, { timeout: 25000 });
  await page.keyboard.press('Shift');
  const n = (await log(page)).length;
  await page.waitForTimeout(1500);
  expect((await log(page)).length, 'na de toets wordt niets meer opgenoemd').toBeLessThanOrEqual(n + 1);
  await expect(page.locator('.sol-a11y-keuze-opgenoemd')).toHaveCount(0);
});

test('typ-indicator wordt niet voorgelezen, een echte ballon wel; twee ballonnen komen in volgorde', async ({ page }) => {
  await laad(page, 'rechten.html');
  await wachtOpReeks(page);
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    window.__log.length = 0;
    const b = document.getElementById('berichten');
    const ty = document.createElement('div');
    ty.className = 'typing';
    ty.innerHTML = '<div class="typing-dots">Typindicator zichtbaar</div>';
    b.appendChild(ty);
  });
  await page.waitForTimeout(1200);
  expect(await page.evaluate(() => window.__log.length), 'typ-indicator: niets gezegd').toBe(0);
  await page.evaluate(() => {
    const b = document.getElementById('berichten');
    document.querySelector('.typing').remove();
    for (const t of ['Eerste testballon.', 'Tweede testballon.', 'Derde testballon.']) {
      const d = document.createElement('div'); d.className = 'bel-sol'; d.textContent = t; b.appendChild(d);
    }
  });
  await page.waitForTimeout(2000);
  const teksten = spraakTeksten(await log(page));
  expect(teksten).toEqual(['Eerste testballon.', 'Tweede testballon.', 'Derde testballon.']);
});

test('voorleesstand uit: niets wordt vanzelf voorgelezen', async ({ page }) => {
  await laad(page, 'budgethulp.html', { stand: null });
  await page.waitForTimeout(3500);
  await page.evaluate(() => {
    const d = document.createElement('div'); d.className = 'bel-sol'; d.textContent = 'Nog een ballon.';
    document.getElementById('berichten').appendChild(d);
  });
  await page.waitForTimeout(1500);
  expect(spraakTeksten(await log(page))).toEqual([]);
  await expect(page.locator('.sol-a11y-keuze-opgenoemd')).toHaveCount(0);
});

test('Tigrinya: niets wordt voorgelezen (S-7)', async ({ page }) => {
  await laad(page, 'budgethulp.html', { taal: 'TI' });
  await page.waitForTimeout(3500);
  await page.evaluate(() => {
    const d = document.createElement('div'); d.className = 'bel-sol'; d.textContent = 'Nog een ballon.';
    document.getElementById('berichten').appendChild(d);
  });
  await page.waitForTimeout(1500);
  expect(spraakTeksten(await log(page))).toEqual([]);
  await expect(page.locator('.sol-a11y-keuze-opgenoemd')).toHaveCount(0);
});

test.describe('zegReeks (API)', () => {
  test('opStart per stuk in volgorde, opEinde aan het eind, oplichten volgt het stuk', async ({ page }) => {
    await laad(page, 'over.html', { stand: null });
    const r = await page.evaluate(async () => {
      const mk = (t) => { const b = document.createElement('button'); b.textContent = t; document.body.appendChild(b); return b; };
      const a = mk('Knop A'), b = mk('Knop B');
      const start = []; let einde = 0;
      window.Solidari.spraak.zegReeks(['Voor de knoppen.', { tekst: 'Zeg A.', el: a }, { tekst: 'Zeg B.', el: b }],
        { pauze: 20, opStart: (item, i) => start.push([i, item.tekst]), opEinde: () => { einde++; } });
      await new Promise((res) => setTimeout(res, 1500));
      return { start, einde, licht: document.querySelectorAll('.sol-a11y-keuze-opgenoemd').length };
    });
    expect(r.start).toEqual([[0, 'Voor de knoppen.'], [1, 'Zeg A.'], [2, 'Zeg B.']]);
    expect(r.einde).toBe(1);
    expect(r.licht).toBe(0);
    const l = await log(page);
    expect(spraakTeksten(l)).toEqual(['Voor de knoppen.', 'Zeg A.', 'Zeg B.']);
    expect(l[1].lit).toEqual(['Knop A']);
    expect(l[2].lit).toEqual(['Knop B']);
  });

  test('stop(), een nieuwe zeg() en een nieuwe reeks breken de oude reeks af', async ({ page }) => {
    await laad(page, 'over.html', { stand: null });
    const r = await page.evaluate(async () => {
      const S = window.Solidari.spraak;
      const wacht = (ms) => new Promise((res) => setTimeout(res, ms));
      // wacht tot er n zinnen zijn gezegd (het spreken start asynchroon; op Android met 60 ms vertraging)
      const tot = async (n) => { for (let i = 0; i < 100 && window.__log.length < n; i++) await wacht(10); };
      const uit = {};
      let eindes = 0;
      const h1 = S.zegReeks(['s1a', 's1b', 's1c'], { pauze: 20, opEinde: () => eindes++ });
      await tot(1); h1.stop(); await wacht(700);
      uit.naStop = window.__log.map((x) => x.tekst);
      window.__log.length = 0;
      const h2 = S.zegReeks(['s2a', 's2b', 's2c'], { pauze: 20, opEinde: () => eindes++ });
      await tot(1); S.zeg('zeg-los'); await wacht(700);
      uit.naZeg = window.__log.map((x) => x.tekst); uit.h2actief = h2.actief;
      window.__log.length = 0;
      S.zegReeks(['s3a', 's3b'], { pauze: 20, opEinde: () => eindes++ });
      await tot(1);
      S.zegReeks(['s4a', 's4b'], { pauze: 20, opEinde: () => eindes++ });
      await wacht(1200);
      uit.naNieuw = window.__log.map((x) => x.tekst); uit.eindes = eindes;
      return uit;
    });
    expect(r.naStop).toEqual(['s1a']);
    expect(r.naZeg).toEqual(['s2a', 'zeg-los']);
    expect(r.h2actief).toBe(false);
    expect(r.naNieuw).toEqual(['s3a', 's4a', 's4b']);
    expect(r.eindes, 'alleen de laatste reeks loopt af').toBe(1);
  });

  test('voorleesstand uitzetten stopt de reeks en haalt het oplichten weg', async ({ page }) => {
    await laad(page, 'rechten.html');
    await page.waitForFunction(() => window.__log.some((x) => x.lit && x.lit.length), null, { timeout: 25000 });
    await page.evaluate(() => window.Solidari.spraak.luistermodus.uit());
    const n = (await log(page)).length;
    await page.waitForTimeout(1500);
    expect((await log(page)).length).toBe(n);
    await expect(page.locator('.sol-a11y-keuze-opgenoemd')).toHaveCount(0);
  });
});
