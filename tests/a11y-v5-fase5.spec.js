// PLAN-5 fase 5 — spraakinvoer voor bedragen (I-6), mobiel.
// - tekstNaarGetal: de voorbeelden uit het plan + ongeldige invoer.
// - Elk bedragveld in de doorgeklikte flows van budgethulp en loont-werken heeft een mic en een label.
// - Nagebootste SpeechRecognition: "vijfhonderd euro" → het veld krijgt 500 en de flow gaat verder
//   zoals na typen (niet vanzelf verstuurd); onherkenbaar → veld leeg + role=status-melding.
// - TI: de mic is er wél (herkenning ti-ET, zoals bij tekstvelden); de melding is alleen zichtbaar,
//   nooit voorgelezen, en er komen geen 🔊-knoppen (S-7).
const { test, expect, devices } = require('@playwright/test');
const { metTaal } = require('./helpers');

test.use({ ...devices['Pixel 5'] });

// Herkenning nagebootst: geeft window.__srTekst terug (per start één resultaat) en logt de taal.
const STUB_SR = () => {
  window.__srTekst = '500';
  window.__srLangs = [];
  class SR {
    constructor() { this.onresult = null; this.onend = null; this.onerror = null; this.lang = ''; }
    start() {
      window.__srLangs.push(this.lang);
      setTimeout(() => {
        const tekst = window.__srTekst;
        if (tekst) {
          const results = [{ 0: { transcript: tekst }, isFinal: true }];
          results.length = 1;
          if (this.onresult) this.onresult({ results });
        } else if (this.onerror) this.onerror({ error: 'no-speech' });
        if (this.onend) this.onend();
      }, 30);
    }
    stop() {}
    abort() {}
  }
  Object.defineProperty(window, 'SpeechRecognition', { configurable: true, writable: true, value: SR });
  Object.defineProperty(window, 'webkitSpeechRecognition', { configurable: true, writable: true, value: SR });
};
// Nagebootste stemmen (NL, EN, AR en ook ti-ET: TI mag toch niets zeggen).
const STUB_STEM = () => {
  const V = ['nl-NL', 'en-GB', 'ar-SA', 'ti-ET'].map((lang) => ({ lang, name: lang, localService: true, default: false }));
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

async function laad(page, pagina, { taal = 'NL', stand = null } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((s) => { try { if (s) localStorage.setItem('solidari-voorlezen', s); else localStorage.removeItem('solidari-voorlezen'); } catch (e) {} }, stand);
  await page.addInitScript(STUB_STEM);
  await page.addInitScript(STUB_SR);
  await page.route(/workers\.dev|solidari\.nl/, (r) => r.fulfill({
    status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify({ tekst: 'Testantwoord.', bronnen: [] }),
  }));
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak && window.Solidari.spraak.tekstNaarGetal);
}

const ZONE = { 'budgethulp.html': '#invoer-inner', 'loont-werken.html': '#invoer-zone' };

// Klik keuzes (steeds de eerste) tot er een getalveld in de invoerzone staat.
async function naarEersteBedrag(page, pagina) {
  const zone = ZONE[pagina];
  const veld = page.locator(`${zone} input[type=number]:visible`);
  for (let i = 0; i < 30; i++) {
    if (await veld.count()) return veld.first();
    const k = page.locator(`${zone} .keuze-btn:visible, ${zone} .scenario-btn:visible, ${zone} .ja-btn:visible, ${zone} .verder-btn:visible`);
    if (await k.count()) { await k.first().click(); }
    await page.waitForTimeout(400);
  }
  throw new Error('geen bedragveld bereikt in ' + pagina);
}

// Stabiele beschrijving van het huidige invoerscherm: wacht tot de zone twee metingen lang gelijk is.
async function wachtOpZone(page, zone) {
  let vorige = null;
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(250);
    const nu = await page.evaluate((z) => {
      const el = document.querySelector(z);
      if (!el) return '';
      const vis = [...el.querySelectorAll('button, input')].filter((b) => b.getClientRects().length && !/sol-a11y/.test(b.className));
      return vis.map((b) => b.tagName + '#' + b.id + '.' + b.className).join('|');
    }, zone);
    if (nu && nu === vorige) return nu;
    vorige = nu;
  }
  return vorige;
}

// Loop de hele flow door; noteer per getalveld of het een mic direct ernaast en een label heeft.
async function loopFlow(page, pagina, max) {
  const zone = ZONE[pagina];
  const velden = [];
  for (let i = 0; i < max; i++) {
    const scherm = await wachtOpZone(page, zone);
    if (!scherm) break;
    const info = await page.evaluate((z) => [...document.querySelectorAll(`${z} input[type=number]`)].filter((el) => el.getClientRects().length).map((el) => {
      const isMic = (n) => !!n && n.classList && n.classList.contains('sol-a11y-mic');
      return { id: el.id, mic: isMic(el.nextElementSibling), label: el.getAttribute('aria-label') || '' };
    }), zone);
    velden.push(...info.map((v) => ({ ...v, stap: i })));
    // volgende actie
    if (await page.locator('#abn-naam:visible').count()) { await page.locator(`${zone} .overslaan-link:visible`).first().click(); continue; }
    let gedaan = false;
    for (const s of ['.controle-ok-btn', '.keuze-btn', '.scenario-btn', '.ja-btn', '.verder-btn']) {
      const l = page.locator(`${zone} ${s}:visible`);
      if (await l.count()) { await l.first().click(); gedaan = true; break; }
    }
    if (gedaan) continue;
    const num = page.locator(`${zone} input[type=number]:visible`);
    if (await num.count()) {
      const ph = (await num.first().getAttribute('placeholder')) || '';
      await num.first().fill((ph.match(/bijv\.\s*(\d+)/) || [0, '300'])[1]);
      if (await num.count() > 1) await num.nth(1).fill('50');
      const st = page.locator(`${zone} .stuur-btn:visible`);
      if (await st.count()) await st.first().click(); else await num.first().press('Enter');
      continue;
    }
    break;
  }
  return velden;
}

// ── tekstNaarGetal ─────────────────────────────────────────────────────────────────────────────
const GOED = [
  ['500', 'NL', 500], ['500 euro', 'NL', 500], ['€ 1.250', 'NL', 1250], ['1250,50', 'NL', 1250.5],
  ['1,250.50', 'EN', 1250.5], ['vijfhonderd', 'NL', 500], ['twaalfhonderdvijftig', 'NL', 1250],
  ['duizend tweehonderd', 'NL', 1200], ['five hundred', 'EN', 500], ['one thousand two hundred fifty', 'EN', 1250],
  ['vijfhonderd euro', 'NL', 500], ['vierendertig', 'NL', 34], ['tweeëndertig', 'NL', 32], ['twaalf euro vijftig', 'NL', 12.5],
  ['a thousand', 'EN', 1000], ['twenty five', 'EN', 25], ['hundred and fifty', 'EN', 150],
  ['٥٠٠', 'AR', 500], ['۱۲۵۰', 'FA', 1250], ['1 250', 'PL', 1250], ['300 ዩሮ', 'TI', 300], ['1.250.000', 'NL', 1250000],
  ['min vijftig', 'NL', -50], ['-50', 'NL', -50],
];
const FOUT = [
  ['hallo', 'NL'], ['', 'NL'], ['500 of 600', 'NL'], ['vijf vijf', 'NL'], ['1250,500', 'NL'], ['een', 'NL'],
  ['vijfhonderd', 'AR'], ['five hundred', 'TR'], ['duizend duizend', 'NL'], ['hello', 'EN'],
];

test('tekstNaarGetal: voorbeelden uit het plan en meer', async ({ page }) => {
  await laad(page, 'index.html');
  const uit = await page.evaluate(([g, f]) => ({
    goed: g.map(([t, l]) => window.Solidari.spraak.tekstNaarGetal(t, l)),
    fout: f.map(([t, l]) => window.Solidari.spraak.tekstNaarGetal(t, l)),
  }), [GOED, FOUT]);
  GOED.forEach(([t, l, v], i) => expect(uit.goed[i], `${l} "${t}"`).toBe(v));
  FOUT.forEach(([t, l], i) => expect(uit.fout[i], `${l} "${t}"`).toBeNull());
});

// ── Elk bedragveld heeft een mic en een label ─────────────────────────────────────────────────
test('budgethulp: elk bedragveld in de flow heeft een mic en een label', async ({ page }) => {
  test.setTimeout(150000);
  await laad(page, 'budgethulp.html');
  await page.locator('#invoer-inner .keuze-btn').first().waitFor({ state: 'visible', timeout: 15000 });
  const velden = await loopFlow(page, 'budgethulp.html', 45);
  const ids = [...new Set(velden.map((v) => v.id))];
  // alle 16 bedragvelden uit de nulmeting worden bereikt
  expect(ids.slice().sort(), JSON.stringify(ids)).toEqual([
    'inp-inkomen', 'inp-huur', 'inp-huurtoeslag', 'inp-energie', 'inp-telefoon', 'inp-zorgverzek', 'inp-zorgtoeslag',
    'inp-autoverzek', 'inp-inboedel', 'inp-begrafenis', 'inp-vervoer', 'inp-schulden', 'abn-bedrag', 'inp-boodschappen',
    'bedrag-overig', 'inp-sparen',
  ].sort());
  expect(velden.filter((v) => !v.mic), JSON.stringify(velden)).toEqual([]);
  expect(velden.filter((v) => v.label !== 'Bedrag in euro')).toEqual([]);
});

test('loont-werken: elk invulveld in de flow heeft een mic en een label', async ({ page }) => {
  test.setTimeout(120000);
  await laad(page, 'loont-werken.html');
  await page.locator('#invoer-zone .keuze-btn').first().waitFor({ state: 'visible', timeout: 15000 });
  const velden = await loopFlow(page, 'loont-werken.html', 20);
  expect(velden.length).toBeGreaterThanOrEqual(5);
  expect(velden.filter((v) => !v.mic)).toEqual([]);
  expect(velden.filter((v) => v.label !== 'Je antwoord in cijfers')).toEqual([]);
});

test('budgethulp: tekstvelden van abonnementen en overige kosten hebben een label', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  // bouw de twee schermen rechtstreeks op met de functies van de pagina
  const labels = await page.evaluate(async () => {
    const uit = {};
    toonNaamBedrag('overig', true, () => {});
    await new Promise((r) => setTimeout(r, 50));
    uit.naamOverig = document.getElementById('naam-overig').getAttribute('aria-label');
    uit.bedragOverig = document.getElementById('bedrag-overig').getAttribute('aria-label');
    uit.micBijBedrag = !!document.getElementById('bedrag-overig').nextElementSibling?.classList.contains('sol-a11y-mic');
    return uit;
  });
  expect(labels).toEqual({ naamOverig: 'Soort kosten', bedragOverig: 'Bedrag in euro', micBijBedrag: true });
});

// ── Inspreken ─────────────────────────────────────────────────────────────────────────────────
test('budgethulp: "vijfhonderd euro" inspreken → 500, verstuurt niet vanzelf, daarna gaat de flow door als bij typen', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  const veld = await naarEersteBedrag(page, 'budgethulp.html');
  const id = await veld.getAttribute('id');
  expect(id).toBe('inp-inkomen');
  await page.evaluate(() => {
    window.__events = [];
    const el = document.getElementById('inp-inkomen');
    ['input', 'change'].forEach((t) => el.addEventListener(t, () => window.__events.push(t)));
    window.__srTekst = 'vijfhonderd euro';
  });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  await expect(page.locator('#inp-inkomen')).toHaveValue('500');
  expect(await page.evaluate(() => window.__events)).toEqual(['input', 'change']);
  expect(await page.evaluate(() => window.__srLangs)).toEqual(['nl-NL']);
  // niet vanzelf verstuurd: het veld staat er nog en er is geen gebruikersballon met het bedrag
  await page.waitForTimeout(600);
  await expect(page.locator('#inp-inkomen')).toBeVisible();
  const ballonnenVoor = await page.locator('.bel-user').count();
  // geen melding
  expect(await page.locator('.sol-a11y-bedrag-melding:not(:empty)').count()).toBe(0);
  // verder zoals na typen: Enter verstuurt, het bedrag verschijnt als antwoord en de volgende vraag (huur) komt
  await page.locator('#inp-inkomen').press('Enter');
  await expect(page.locator('.bel-user')).toHaveCount(ballonnenVoor + 1);
  await expect(page.locator('.bel-user').last()).toContainText('500');
  await expect(page.locator('#inp-huur')).toBeVisible({ timeout: 15000 });
});

test('loont-werken: "vierendertig" inspreken bij de leeftijd → 34, knop verstuurt, flow gaat door', async ({ page }) => {
  await laad(page, 'loont-werken.html');
  await naarEersteBedrag(page, 'loont-werken.html');
  await page.evaluate(() => { window.__srTekst = 'vierendertig'; });
  await page.locator('#g-inp + .sol-a11y-mic').click();
  await expect(page.locator('#g-inp')).toHaveValue('34');
  const ballonnen = await page.locator('#berichten .bel-user, #berichten .bericht-user').count();
  await page.locator('#g-stuur').click();
  await expect(page.locator('#berichten .bel-user, #berichten .bericht-user')).not.toHaveCount(ballonnen);
  await expect(page.locator('#berichten')).toContainText('34');
});

test('EN: "five hundred" → 500', async ({ page }) => {
  await laad(page, 'budgethulp.html', { taal: 'EN' });
  await naarEersteBedrag(page, 'budgethulp.html');
  await page.evaluate(() => { window.__srTekst = 'five hundred'; });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  await expect(page.locator('#inp-inkomen')).toHaveValue('500');
  expect(await page.evaluate(() => window.__srLangs)).toEqual(['en-GB']);
  expect(await page.locator('#inp-inkomen').getAttribute('aria-label')).toBe('Amount in euros');
});

test('onherkenbaar: veld blijft leeg, role=status-melding, voorgelezen in de voorleesstand', async ({ page }) => {
  await laad(page, 'budgethulp.html', { stand: 'aan' });
  await naarEersteBedrag(page, 'budgethulp.html');
  await page.evaluate(() => { window.__srTekst = 'hallo daar'; window.__spoken = []; });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  const melding = page.locator('.sol-a11y-bedrag-melding[role="status"]');
  await expect(melding).toHaveText('Ik heb geen getal gehoord. Probeer het nog eens.');
  await expect(page.locator('#inp-inkomen')).toHaveValue('');
  // zichtbaar, binnen beeld en onder het veld
  await expect(melding).toBeInViewport();
  const [mb, vb] = [await melding.boundingBox(), await page.locator('#inp-inkomen').boundingBox()];
  expect(mb.y).toBeGreaterThanOrEqual(vb.y + vb.height);
  await expect.poll(() => page.evaluate(() => window.__spoken.join(' | '))).toContain('Ik heb geen getal gehoord');
  // niets gezegd (no-speech) → zelfde melding
  await page.evaluate(() => { window.__srTekst = ''; });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  await expect(melding).toHaveText('Ik heb geen getal gehoord. Probeer het nog eens.');
  // een eerder getypt bedrag wordt niet overschreven
  await page.locator('#inp-inkomen').fill('1200');
  await expect(melding).toHaveText('');   // typen wist de melding
  await page.evaluate(() => { window.__srTekst = 'vijf vijf'; });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  await expect(melding).toHaveText(/Ik heb geen getal gehoord/);
  await expect(page.locator('#inp-inkomen')).toHaveValue('1200');
  // de melding staat in de invoerzone en verdwijnt met de stap
  expect(await page.locator('#invoer-inner .sol-a11y-bedrag-melding').count()).toBe(1);
});

test('te groot of negatief: melden, niet invullen; voorleesstand uit → niets gezegd', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  await naarEersteBedrag(page, 'budgethulp.html');
  await page.evaluate(() => { window.__srTekst = 'twee miljoen'; window.__spoken = []; });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  const melding = page.locator('.sol-a11y-bedrag-melding[role="status"]');
  await expect(melding).toHaveText('Dat getal kan niet kloppen. Probeer het nog eens.');
  await expect(page.locator('#inp-inkomen')).toHaveValue('');
  await page.evaluate(() => { window.__srTekst = 'min vijftig'; });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  await expect(melding).toHaveText('Dat getal kan niet kloppen. Probeer het nog eens.');
  await expect(page.locator('#inp-inkomen')).toHaveValue('');
  // voorleesstand staat uit: de melding is alleen zichtbaar
  expect(await page.evaluate(() => window.__spoken)).toEqual([]);
});

test('loont-werken: het veld heeft max 9999, daarboven wordt gemeld', async ({ page }) => {
  await laad(page, 'loont-werken.html');
  await naarEersteBedrag(page, 'loont-werken.html');
  await page.evaluate(() => { window.__srTekst = '12000'; });
  await page.locator('#g-inp + .sol-a11y-mic').click();
  await expect(page.locator('.sol-a11y-bedrag-melding[role="status"]')).toHaveText('Dat getal kan niet kloppen. Probeer het nog eens.');
  await expect(page.locator('#g-inp')).toHaveValue('');
});

test('AR (RTL): Arabisch-Indische cijfers → 500; onherkenbaar → Arabische melding', async ({ page }) => {
  await laad(page, 'budgethulp.html', { taal: 'AR' });
  await naarEersteBedrag(page, 'budgethulp.html');
  expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
  await page.evaluate(() => { window.__srTekst = '٥٠٠ يورو'; });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  await expect(page.locator('#inp-inkomen')).toHaveValue('500');
  await page.locator('#inp-inkomen').fill('');
  await page.evaluate(() => { window.__srTekst = 'مرحبا'; });
  await page.locator('#inp-inkomen + .sol-a11y-mic').click();
  await expect(page.locator('.sol-a11y-bedrag-melding[role="status"]')).toHaveText('لم أسمع رقمًا. حاول مرة أخرى.');
  expect(await page.locator('#inp-inkomen').getAttribute('aria-label')).toBe('المبلغ باليورو');
});

// ── Tigrinya (S-7): mic wel, voorlezen nooit ─────────────────────────────────────────────────
// Vastgelegd gedrag (ongewijzigd t.o.v. tekstvelden): autoMic kijkt niet naar GEEN_SPRAAK, dus TI krijgt
// een mic zodra de browser herkenning heeft, met lang = ti-ET. Omzetten: alleen cijfers (geen woordenlijst).
// De melding is zichtbaar in het Tigrinya, maar wordt nooit voorgelezen; er komen geen 🔊 of schakelaar.
// (budgethulp loopt in TI vast bij de inkomensvraag — T.ti.inkomen_v ontbreekt, bestaand — daarom loont-werken.)
test('TI: bedragveld heeft een mic (herkenning ti-ET), cijfers werken, melding alleen zichtbaar, geen 🔊', async ({ page }) => {
  await laad(page, 'loont-werken.html', { taal: 'TI', stand: 'aan' });
  await naarEersteBedrag(page, 'loont-werken.html');
  await expect(page.locator('#g-inp + .sol-a11y-mic')).toHaveCount(1);
  expect(await page.locator('#g-inp').getAttribute('aria-label')).toBe('መልስኻ ብቑጽሪ');
  await page.evaluate(() => { window.__srTekst = '34'; window.__spoken = []; });
  await page.locator('#g-inp + .sol-a11y-mic').click();
  await expect(page.locator('#g-inp')).toHaveValue('34');
  expect(await page.evaluate(() => window.__srLangs)).toEqual(['ti-ET']);
  await page.locator('#g-inp').fill('');
  await page.evaluate(() => { window.__srTekst = 'ሰላሳን ኣርባዕተን'; });   // woorden: in TI geen woordenlijst
  await page.locator('#g-inp + .sol-a11y-mic').click();
  await expect(page.locator('.sol-a11y-bedrag-melding[role="status"]')).toHaveText('ቁጽሪ ኣይሰማዕኩን። በጃኻ ደጊምካ ፈትን።');
  await expect(page.locator('#g-inp')).toHaveValue('');
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.__spoken)).toEqual([]);
  expect(await page.locator('.sol-a11y-knop').count()).toBe(0);
  await expect(page.locator('.sol-a11y-luister-toggle')).toBeHidden();
});

test('TI: ook een budgethulp-bedragveld krijgt mic en Tigrinya-label', async ({ page }) => {
  await laad(page, 'budgethulp.html', { taal: 'TI' });
  await page.evaluate(() => { toonBedrag('huur', false, () => {}); });
  await expect(page.locator('#inp-huur + .sol-a11y-mic')).toHaveCount(1);
  await expect(page.locator('#inp-huur')).toHaveAttribute('aria-label', 'መጠን ገንዘብ ብዩሮ');
});
