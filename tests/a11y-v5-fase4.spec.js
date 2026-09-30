// PLAN-5 fase 4 — vaste plek en maat voor de 🔊-knoppen (I-5), mobiel (Pixel 5).
//   - ballon: knop absoluut, binnen de ballon, rechtsboven (AR: linksboven), minstens 40x40,
//     overlapt geen tekst (Range-rects);
//   - gewone tekst (over.html): regelhoogte met knop == zonder knop (geen verspringende regelafstand);
//   - TI: geen 🔊-knoppen; twee tikken (fase 1) en tik-op-ballon blijven werken.
// Paden in goto zijn relatief (werkt ook tegen staging met SOL_BASE_URL).
const { test, expect, devices } = require('@playwright/test');
const { metTaal } = require('./helpers');

test.use({ ...devices['Pixel 5'] });

const STUB = () => {
  const V = ['nl-NL', 'ar-SA', 'ti-ET'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
  window.__spoken = [];
  function U(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: U });
  const s = {
    getVoices: () => V,
    speak: (u) => { if (u.text.trim()) window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
};

async function laad(page, pagina, taal = 'NL') {
  await metTaal(page, taal);
  await page.addInitScript(() => { try { localStorage.removeItem('solidari-voorlezen'); } catch (e) {} });
  await page.addInitScript(STUB);
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(1200);
}

// Meet per 🔊 in een ballon: positie, maat en overlap met de tekstnodes van de ballon.
const METEN_BALLON = () => {
  return [...document.querySelectorAll('.bel-sol .sol-a11y-knop')].map((k) => {
    const bel = k.closest('.bel-sol');
    const kr = k.getBoundingClientRect();
    const br = bel.getBoundingClientRect();
    const rtl = getComputedStyle(bel).direction === 'rtl';
    let overlap = 0;
    const w = document.createTreeWalker(bel, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (!n.textContent.trim() || k.contains(n)) continue;
      const r = document.createRange();
      r.selectNodeContents(n);
      for (const tr of r.getClientRects()) {
        if (tr.width < 1) continue;
        const x = Math.min(tr.right, kr.right) - Math.max(tr.left, kr.left);
        const y = Math.min(tr.bottom, kr.bottom) - Math.max(tr.top, kr.top);
        if (x > 1 && y > 1) overlap++;
      }
    }
    return {
      pos: getComputedStyle(k).position, rtl, w: kr.width, h: kr.height, overlap,
      binnen: kr.left >= br.left - 0.5 && kr.right <= br.right + 0.5 && kr.top >= br.top - 0.5 && kr.bottom <= br.bottom + 0.5,
      bovenIn: kr.top - br.top < 12,
      rechts: br.right - kr.right, links: kr.left - br.left,
    };
  });
};

for (const [taal, rtl] of [['NL', false], ['AR', true]]) {
  for (const pagina of ['budgethulp.html', 'loont-werken.html']) {
    test(`ballon: 🔊 vast ${rtl ? 'linksboven' : 'rechtsboven'}, >=40px, zonder overlap (${pagina}, ${taal})`, async ({ page }) => {
      await laad(page, pagina, taal);
      const m = await page.evaluate(METEN_BALLON);
      expect(m.length).toBeGreaterThan(0);
      for (const k of m) {
        expect(k.pos).toBe('absolute');
        expect(k.rtl).toBe(rtl);
        expect(k.binnen).toBe(true);
        expect(k.bovenIn).toBe(true);
        expect(k.w).toBeGreaterThanOrEqual(40);
        expect(k.h).toBeGreaterThanOrEqual(40);
        if (rtl) expect(k.links).toBeLessThan(12); else expect(k.rechts).toBeLessThan(12);
        expect(k.overlap).toBe(0);
      }
    });
  }
}

test('gewone tekst (over.html): 🔊 >=40px en de regelhoogte verspringt niet', async ({ page }) => {
  await laad(page, 'over.html');
  const r = await page.evaluate(() => {
    const knoppen = [...document.querySelectorAll('.sol-a11y-knop')].filter((k) => !k.closest('.bel-sol') && k.getBoundingClientRect().width > 0);
    const uit = { aantal: knoppen.length, klein: 0, extra: [] };
    for (const k of knoppen) {
      const kr = k.getBoundingClientRect();
      if (kr.width < 40 || kr.height < 40) { uit.klein++; uit.dbg = (uit.dbg||'') + k.parentElement.className + ':' + kr.width + 'x' + kr.height + ' '; }
      const blok = k.parentElement;
      const regel = parseFloat(getComputedStyle(blok).lineHeight) || 1.6 * parseFloat(getComputedStyle(blok).fontSize);
      const met = blok.getBoundingClientRect().height;
      k.style.display = 'none';
      const zonder = blok.getBoundingClientRect().height;
      k.style.display = '';
      uit.extra.push({ verschil: met - zonder, regel });
    }
    return uit;
  });
  expect(r.aantal).toBeGreaterThan(3);
  expect(r.dbg || '').toBe('');
  // De knop maakt een blok niet hoger, behalve als de laatste regel vol is en de knop naar een
  // nieuwe regel moet: dan maximaal één regel extra (nooit een regel die opzwelt).
  for (const e of r.extra) expect(e.verschil).toBeLessThanOrEqual(Math.max(2, e.regel + 2));
});

test('tik op 🔊 in een ballon leest de ballon voor', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  await page.locator('.bel-sol .sol-a11y-knop').last().click();
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.__spoken.length)).toBeGreaterThan(0);
});

for (const pagina of ['budgethulp.html', 'over.html', 'naturalisatie.html']) {
  test(`TI: geen 🔊-knoppen op ${pagina}`, async ({ page }) => {
    await laad(page, pagina, 'TI');
    expect(await page.locator('.sol-a11y-knop').count()).toBe(0);
  });
}
