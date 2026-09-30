// PLAN-5 (blind en analfabeet) — fase 0: nulmeting, 30-09-2026.
//
// Deze spec legt de HUIDIGE getallen vast als BOVENGRENS (expect(n).toBeLessThanOrEqual(NU.x)).
// Latere fasen verlagen de grens in NU zodra hun werk staat; de streefwaarde staat in DOEL.
// Alle getallen komen uit een echte meting (Pixel 5, NL, browserstemmen nagebootst) en worden
// weggeschreven naar tests/a11y-v5-nulmeting.json. Dit bestand wijzigt geen sitecode.
//
// ── Huidige getallen (30-09-2026) ───────────────────────────────────────────────────────────
//  Beginschermen, 11 pagina's:
//    keuzeknoppen (volgens de centrale selectorlijst)        : 35  (30 zonder budgethulp, zoals plan §5)
//    daarvan zonder voorleesmogelijkheid                     : 35
//    knoppen/tegels/links met hoorbare emoji in de naam       : 35  (29 volgens plan-definitie: excl. vlag-emoji van de index-tegel en excl. de 5 budgethulp-chips; 30 + 5)
//    invoervelden zonder label                                : 2   (brief-textarea, rechten-textarea)
//    🔊-knoppen in de toegankelijkheidsboom                   : 67  (over.html 29 zichtbaar, 31 in de DOM; 18jaar 8 van 18 want ingeklapte kaarten zijn verborgen)
//    pagina's zonder <main>                                   : 11
//  Chatpagina's (budgethulp, loont-werken, rechten, goedvoorbereid):
//    zonder role="log"/aria-live op de berichtenlijst        : 4 van 4
//    zonder h1                                                : 4 van 4
//  Doorgeklikte flows (eerste keuze telkens):
//    bedragvelden (type=number) zonder spraakinvoer           : 21 (budgethulp 16 verschillende, loont-werken 5 invulstappen)
//    invoervelden zonder label in de flows                    : budgethulp 18 (16 bedrag + 2 tekst), loont-werken 1 (g-inp), goedvoorbereid 1 (ai-invoer); zie JSON
//  Voorlezen van keuzeknoppen (voorleesstand aan, één tik):
//    pagina's waar de tik het antwoord kiest zonder de knop voor te lezen: 7 van 7
//  Overig: rechten.html toont op 393px de nav-rechts (schakelaar/taal/menu) buiten beeld (x=574).
// (De exacte waarden staan in a11y-v5-nulmeting.json en worden hieronder bewaakt.)
// ────────────────────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { PAGES, metTaal } = require('./helpers');

const OUT = path.join(__dirname, 'a11y-v5-nulmeting.json');

// Bovengrenzen = de gemeten stand van 30-09-2026. Verlaag ze per fase.
const NU = {
  keuzeknoppenBegin: 35,
  keuzeknoppenBeginZonderVoorlees: 35,
  emojiNaamBegin: 35,
  invoerZonderLabelBegin: 2,
  luidsprekerKnoppenInBoom: 67,
  paginasZonderMain: 11,
  chatZonderLog: 4,
  chatZonderH1: 4,
  bedragveldenZonderMicFlow: 21,
  keuzeknoppenNietVoorleesbaarPerTik: 7,
};
// Streefwaarden uit plan §5 (alleen ter documentatie; geen assertie in fase 0).
const DOEL = {
  keuzeknoppenBeginZonderVoorlees: 0, emojiNaamBegin: 0, invoerZonderLabelBegin: 0,
  luidsprekerKnoppenInBoom: 0, chatZonderLog: 0, chatZonderH1: 0, bedragveldenZonderMicFlow: 0,
};

// Centrale selectorlijst voor keuzeknoppen (bron: fase-0-inventaris, INVENTARIS-a11y-v5.md).
const KEUZE_SEL = [
  '.keuze-btn', '.situatie-btn', '.scenario-btn', '.antwoord-knop', '.leeftijd-knop', '.fase-tab',
  '.type-knop', '.ja-btn', '.nee-btn', '.verder-btn', '.upload-knop', '.analyseer-knop',
].join(', ');
const CHAT_PAGINAS = ['budgethulp.html', 'loont-werken.html', 'rechten.html', 'goedvoorbereid.html'];

// Nagebootste Nederlandse stem, zodat de 🔊-knoppen verschijnen en spraak vastgelegd wordt.
const STUB = () => {
  const V = [{ lang: 'nl-NL', name: 'NL', localService: true, default: false }];
  window.__spoken = [];
  function U(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: U });
  const s = {
    getVoices: () => V,
    speak: (u) => { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => s });
};

async function laad(page, pagina) {
  await metTaal(page, 'NL');
  await page.addInitScript(() => { try { localStorage.removeItem('solidari-voorlezen'); } catch (e) {} });
  await page.addInitScript(STUB);
  // Geen verzoeken naar de echte Worker of API (fase 0 is alleen meten).
  await page.route(/workers\.dev|solidari\.nl/, (r) => r.fulfill({
    status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify({ tekst: 'Testantwoord.', bronnen: [] }),
  }));
  await page.goto('/' + pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(900);
  // Chats bouwen hun eerste keuzeknoppen na een korte typ-vertraging: wacht daarop (beginscherm = eerste keuze zichtbaar).
  if (CHAT_PAGINAS.includes(pagina)) {
    await page.locator(KEUZE_SEL).first().waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(300);
  }
}

// In-page meting van het huidige scherm.
const METING = (sel) => {
  const zichtbaar = (el) => {
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  const EMOJI = /\p{Extended_Pictographic}|\p{Regional_Indicator}/u;
  const EMOJI_PLAN = /\p{Extended_Pictographic}/u;
  const naamTekst = (el) => {
    const al = el.getAttribute('aria-label');
    if (al && al.trim()) return al.trim();
    // tekst zonder aria-hidden-delen
    let t = '';
    const loop = (n) => {
      if (n.nodeType === 3) t += n.nodeValue;
      else if (n.nodeType === 1 && n.getAttribute('aria-hidden') !== 'true') n.childNodes.forEach(loop);
    };
    el.childNodes.forEach(loop);
    return t.trim();
  };
  const alle = [...document.querySelectorAll('a[href], button, [role="button"], summary, input, select, textarea')].filter(zichtbaar);
  const keuze = [...document.querySelectorAll(sel)].filter(zichtbaar);
  const heeftVoorlees = (el) => !!(el.closest('[data-lees]') || el.querySelector('.sol-a11y-knop') ||
    (el.nextElementSibling && el.nextElementSibling.classList.contains('sol-a11y-knop')) ||
    (el.previousElementSibling && el.previousElementSibling.classList.contains('sol-a11y-knop')));
  const emojiEls = alle.filter((el) => !el.matches('input, select, textarea') && EMOJI.test(naamTekst(el)));
  const emojiPlan = alle.filter((el) => !el.matches('input, select, textarea') && EMOJI_PLAN.test(naamTekst(el)));
  const velden = alle.filter((el) => el.matches('input, select, textarea') && !['hidden', 'submit', 'button'].includes(el.type));
  const zonderLabel = velden.filter((el) => !(el.labels && el.labels.length) && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby'));
  const getal = velden.filter((el) => el.type === 'number');
  // spraakinvoer hoort direct naast het veld zelf te staan (een microfoon bij een ander veld in dezelfde rij telt niet)
  const isMic = (n) => !!n && n.matches && n.matches('.sol-a11y-mic, .spreek-btn');
  const getalZonderMic = getal.filter((el) => !(isMic(el.nextElementSibling) || isMic(el.previousElementSibling)));
  const luidsprekers = [...document.querySelectorAll('.sol-a11y-knop')];
  const zichtbaarInBoom = luidsprekers.filter((el) => zichtbaar(el) && !el.closest('[aria-hidden="true"]') && el.getAttribute('tabindex') !== '-1');
  const berichten = document.getElementById('berichten');
  const logOk = berichten ? !!(berichten.closest('[role="log"], [aria-live]')) : null;
  const rect = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.x), w: Math.round(r.width) }; };
  return {
    bubbels: document.querySelectorAll('#berichten .bel-sol, #berichten .bel-user, #hoofd > *').length,
    keuzeknoppen: keuze.length,
    keuzeZonderVoorlees: keuze.filter((el) => !heeftVoorlees(el)).length,
    keuzeKlassen: [...new Set(keuze.map((el) => '.' + [...el.classList].filter((c) => !/^(actief|open|ja|nee|anders|info)$/.test(c)).join('.')))],
    emojiNaam: emojiEls.length,
    emojiNaamPlanDef: emojiPlan.length,
    velden: velden.length,
    veldenZonderLabel: zonderLabel.length,
    veldenZonderLabelIds: zonderLabel.map((el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.type && el.type !== 'text' ? '[' + el.type + ']' : '')),
    bedragvelden: getal.length,
    bedragveldenZonderMic: getalZonderMic.length,
    bedragveldIds: getalZonderMic.map((el) => el.id || '(zonder id)'),
    luidsprekersInBoom: zichtbaarInBoom.length,
    luidsprekersTotaal: luidsprekers.length,
    heeftMain: document.querySelectorAll('main, [role="main"]').length > 0,
    h1: document.querySelectorAll('h1').length,
    berichtenlijst: berichten ? { log: logOk, role: berichten.getAttribute('role'), live: berichten.getAttribute('aria-live') } : null,
    toggle: rect('.sol-a11y-luister-toggle'),
    vw: window.innerWidth,
  };
};

const resultaat = { datum: '2026-09-30', apparaat: 'Pixel 5', taal: 'NL', begin: {}, flows: {}, tik: {}, totalen: {} };

test.describe.configure({ mode: 'serial' });

for (const pagina of PAGES) {
  test(`nulmeting beginscherm ${pagina}`, async ({ page }) => {
    await laad(page, pagina);
    const m = await page.evaluate(METING, KEUZE_SEL);
    // 🔊 in de toegankelijkheidsboom, gemeten via de echte aria-snapshot.
    const snap = await page.locator('body').ariaSnapshot();
    m.luidsprekersInAriaSnapshot = (snap.match(/button "Luister"/g) || []).length;
    resultaat.begin[pagina] = m;
    expect(m).toBeTruthy();
  });
}

// Doorgeklikte flows: eerste keuze telkens, bedragvelden invullen. Legt per stap de bedragvelden vast.
async function loopFlow(page, { zone, max = 40 }) {
  const gezien = new Set();
  const stappen = [];
  let vorige = '', zelfde = 0;
  for (let i = 0; i < max; i++) {
    let m = null;
    for (let k = 0; k < 25; k++) {
      await page.waitForTimeout(350);
      m = await page.evaluate(METING, KEUZE_SEL);
      const actief = await page.evaluate((z) => {
        const el = document.querySelector(z);
        return el ? [...el.querySelectorAll('button, input')].some((b) => { const r = b.getBoundingClientRect(); return r.width > 0 && !/sol-a11y/.test(b.className); }) : false;
      }, zone);
      if (actief) break;
    }
    const handtekening = JSON.stringify([m.keuzeklassen, m.bedragveldIds, m.velden, m.keuzeknoppen, m.bubbels]);
    zelfde = handtekening === vorige ? zelfde + 1 : 0; vorige = handtekening;
    if (zelfde >= 2) break;
    m.bedragveldIds.forEach((id) => gezien.add(id));
    stappen.push({ keuze: m.keuzeknoppen, keuzeKlassen: m.keuzeKlassen, bedrag: m.bedragvelden, bedragZonderMic: m.bedragveldenZonderMic, ids: m.bedragveldIds, zonderLabel: m.veldenZonderLabelIds });
    // volgende actie
    const kies = async () => {
      if (await page.locator('#abn-naam:visible').count()) { await page.locator('.overslaan-link:visible').first().click(); return true; }
      for (const s of ['.controle-ok-btn', '.keuze-btn', '.ja-btn', '.verder-btn']) {
        const l = page.locator(`${zone} ${s}:visible, #berichten ${s}:visible`);
        if (await l.count()) { await l.first().click(); return true; }
      }
      const num = page.locator(`${zone} input[type=number]:visible`);
      if (await num.count()) {
        const ph = (await num.first().getAttribute('placeholder')) || '';
        const g = (ph.match(/bijv\.\s*(\d+)/) || [0, '300'])[1];
        await num.first().fill(g);
        if (await num.count() > 1) await num.nth(1).fill('50');
        const st = page.locator(`${zone} .stuur-btn:visible`);
        if (await st.count()) await st.first().click(); else await num.first().press('Enter');
        return true;
      }
      return false;
    };
    if (!(await kies())) break;
  }
  return stappen;
}

test('nulmeting flow budgethulp (doorgeklikt)', async ({ page }) => {
  test.setTimeout(150000);
  await laad(page, 'budgethulp.html');
  const stappen = await loopFlow(page, { zone: '#invoer-inner', max: 40 });
  const ids = new Set(stappen.flatMap((s) => s.ids));
  const klassen = new Set(stappen.flatMap((s) => s.keuzeKlassen));
  const zonderLabel = new Set(stappen.flatMap((s) => s.zonderLabel));
  resultaat.flows.budgethulp = { stappen: stappen.length, bedragveldenZonderMic: [...ids], keuzeKlassen: [...klassen], veldenZonderLabel: [...zonderLabel] };
  expect(stappen.length).toBeGreaterThan(5);
});

test('nulmeting flow loont-werken (doorgeklikt)', async ({ page }) => {
  test.setTimeout(120000);
  await laad(page, 'loont-werken.html');
  const stappen = await loopFlow(page, { zone: '#invoer-zone', max: 20 });
  const ids = new Set(stappen.flatMap((s) => s.ids.map((i) => i + '@' + stappen.indexOf(s))));
  const klassen = new Set(stappen.flatMap((s) => s.keuzeKlassen));
  const zonderLabel = new Set(stappen.flatMap((s) => s.zonderLabel));
  // g-inp wordt hergebruikt per stap: tel per stap
  const perStap = stappen.reduce((a, s) => a + s.bedragZonderMic, 0);
  resultaat.flows['loont-werken'] = { stappen: stappen.length, bedragveldenZonderMic: perStap, keuzeKlassen: [...klassen], veldenZonderLabel: [...zonderLabel] };
  expect(stappen.length).toBeGreaterThan(3);
});

test('nulmeting flow goedvoorbereid (doorgeklikt tot het AI-invoerveld)', async ({ page }) => {
  test.setTimeout(120000);
  await laad(page, 'goedvoorbereid.html');
  const stappen = await loopFlow(page, { zone: '#invoer-inner', max: 20 });
  const klassen = new Set(stappen.flatMap((s) => s.keuzeKlassen));
  resultaat.flows.goedvoorbereid = { stappen: stappen.length, keuzeKlassen: [...klassen], veldenZonderLabel: [...new Set(stappen.flatMap((s) => s.zonderLabel))] };
  // op het eind staat het AI-invoerveld
  const eind = await page.evaluate(METING, KEUZE_SEL);
  resultaat.flows.goedvoorbereid.eind = { velden: eind.velden, veldenZonderLabelIds: eind.veldenZonderLabelIds, mics: await page.locator('#spreek-btn, .sol-a11y-mic').count() };
  expect(stappen.length).toBeGreaterThan(3);
});

// Voorleesstand aan + één tik op de eerste keuzeknop: wordt de knop voorgelezen?
const TIK = {
  'budgethulp.html': '.keuze-btn', 'loont-werken.html': '.keuze-btn', 'naturalisatie.html': '.antwoord-knop',
  'rechten.html': '.situatie-btn', 'goedvoorbereid.html': '.keuze-btn', '18jaar.html': '.leeftijd-knop:not(.actief)',
  'feedback.html': '.type-knop',
};
for (const [pagina, sel] of Object.entries(TIK)) {
  test(`nulmeting tik op keuzeknop in voorleesstand ${pagina}`, async ({ page }) => {
    await laad(page, pagina);
    // wacht tot de keuzeknop er is (chats bouwen hem na een korte typ-vertraging)
    await page.locator(sel).first().waitFor({ state: 'visible', timeout: 15000 });
    // JS-klik: op rechten.html staat de schakelaar op 393px buiten beeld (zie INVENTARIS), een echte tik kan er niet bij.
    await page.evaluate(() => document.querySelector('.sol-a11y-luister-toggle').click());
    await page.waitForTimeout(500);
    await page.evaluate(() => { window.__spoken = []; });
    const tekst = ((await page.locator(sel).first().innerText()) || '').replace(/\p{Extended_Pictographic}|\p{Regional_Indicator}|\uFE0F/gu, '').replace(/\s+/g, ' ').trim();
    await page.locator(sel).first().click();
    await page.waitForTimeout(600);
    const gezegd = (await page.evaluate(() => window.__spoken.join(' | '))).replace(/\s+/g, ' ');
    const voorgelezen = tekst.length > 0 && gezegd.includes(tekst.slice(0, 20));
    resultaat.tik[pagina] = { knoptekst: tekst.slice(0, 40), knopVoorgelezen: voorgelezen };
    expect(resultaat.tik[pagina]).toBeTruthy();
  });
}

test('nulmeting: totalen en bovengrenzen', async () => {
  const b = resultaat.begin;
  const som = (f) => PAGES.reduce((a, p) => a + (b[p] ? f(b[p]) : 0), 0);
  const chat = CHAT_PAGINAS.filter((p) => b[p]);
  const flows = resultaat.flows;
  const bedragFlow = ((flows.budgethulp || {}).bedragveldenZonderMic || []).length + ((flows['loont-werken'] || {}).bedragveldenZonderMic || 0);
  const tikNiet = Object.values(resultaat.tik).filter((t) => !t.knopVoorgelezen).length;
  const t = {
    keuzeknoppenBegin: som((m) => m.keuzeknoppen),
    keuzeknoppenBeginPlanDef: som((m) => m.keuzeknoppen) - (b['budgethulp.html'] ? b['budgethulp.html'].keuzeknoppen : 0),
    keuzeknoppenBeginZonderVoorlees: som((m) => m.keuzeZonderVoorlees),
    emojiNaamBegin: som((m) => m.emojiNaam),
    emojiNaamBeginPlanDef: som((m) => m.emojiNaamPlanDef) - (b['budgethulp.html'] ? b['budgethulp.html'].emojiNaamPlanDef : 0),
    invoerZonderLabelBegin: som((m) => m.veldenZonderLabel),
    luidsprekerKnoppenInBoom: som((m) => m.luidsprekersInAriaSnapshot),
    luidsprekerKnoppenInDom: som((m) => m.luidsprekersInBoom),
    paginasZonderMain: PAGES.filter((p) => b[p] && !b[p].heeftMain).length,
    chatPaginas: chat.length,
    chatZonderLog: chat.filter((p) => !(b[p].berichtenlijst && b[p].berichtenlijst.log)).length,
    chatZonderH1: chat.filter((p) => b[p].h1 === 0).length,
    bedragveldenZonderMicFlow: bedragFlow,
    keuzeknoppenNietVoorleesbaarPerTik: tikNiet,
    schakelaarBuitenBeeld: PAGES.filter((p) => b[p] && b[p].toggle && b[p].toggle.x + b[p].toggle.w > b[p].vw),
  };
  resultaat.totalen = t;
  resultaat.grenzen = NU;
  resultaat.doel = DOEL;
  fs.writeFileSync(OUT, JSON.stringify(resultaat, null, 2));
  console.log('\nA11Y-V5 NULMETING:', JSON.stringify(t));

  // Bovengrenzen: latere fasen mogen alleen omlaag.
  expect(t.keuzeknoppenBegin).toBeLessThanOrEqual(NU.keuzeknoppenBegin);
  expect(t.keuzeknoppenBeginZonderVoorlees).toBeLessThanOrEqual(NU.keuzeknoppenBeginZonderVoorlees);
  expect(t.emojiNaamBegin).toBeLessThanOrEqual(NU.emojiNaamBegin);
  expect(t.invoerZonderLabelBegin).toBeLessThanOrEqual(NU.invoerZonderLabelBegin);
  expect(t.luidsprekerKnoppenInBoom).toBeLessThanOrEqual(NU.luidsprekerKnoppenInBoom);
  expect(t.paginasZonderMain).toBeLessThanOrEqual(NU.paginasZonderMain);
  expect(t.chatZonderLog).toBeLessThanOrEqual(NU.chatZonderLog);
  expect(t.chatZonderH1).toBeLessThanOrEqual(NU.chatZonderH1);
  expect(t.bedragveldenZonderMicFlow).toBeLessThanOrEqual(NU.bedragveldenZonderMicFlow);
  expect(t.keuzeknoppenNietVoorleesbaarPerTik).toBeLessThanOrEqual(NU.keuzeknoppenNietVoorleesbaarPerTik);
});
