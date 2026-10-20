// PLAN-5 fase 3 — schermlezer-basis (I-3, I-4, I-7, B-3, B-4), mobiel (Pixel 5).
//   - axe-core op alle 11 pagina's (NL) en op een chatpagina in AR: geen serious/critical.
//   - tellingen: 0 knoppen/tegels met emoji in de naam, 0 🔊 in de toegankelijkheidsboom,
//     4/4 chats met role="log" + h1, 11/11 pagina's met <main>, 0 velden zonder label (beginscherm).
//   - werking: skip-link, live-regio zonder typ-indicator en keuzekaartjes, knopnamen ("Verstuur",
//     "Wijzig huur"), klikbare div's met rol + toetsenbord, één microfoon, verbergEmoji idempotent,
//     de voorleesmodus (analfabeten) werkt nog, TI zonder spraak.
// Paden in goto zijn relatief (werkt ook tegen staging met SOL_BASE_URL).
const { test, expect, devices } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { PAGES, metTaal, stubApi } = require('./helpers');
const B = require('../tools/vertaal/bronnen.js');
// TI-teksten uit de bron: de aanspreekvorm veranderde in het amendement beleefdheidsvorm (ኪድ → ኪዱ).
const TI = (k) => B.laadBron(B.BRONNEN.find((b) => b.naam === 'i18n.js')).talen.TI.bladeren.get(k).waarde;

test.use({ ...devices['Pixel 5'] });

// axe draait met alle regels, ook color-contrast (sinds fase 6).
const AXE_UIT = [];

// Nagebootste stemmen (zodat de 🔊-knoppen er staan) + browserherkenning (zodat de mic er staat).
const STUB = () => {
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
  if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
    window.webkitSpeechRecognition = function () { this.start = () => {}; this.stop = () => {}; };
  }
};

const CHAT = {
  'budgethulp.html': '.keuze-btn', 'loont-werken.html': '.keuze-btn',
  'rechten.html': '.situatie-btn', 'goedvoorbereid.html': '.keuze-btn',
};

async function laad(page, pagina, { taal = 'NL', stand = null } = {}) {
  await metTaal(page, taal);
  await page.addInitScript((s) => { try { if (s) localStorage.setItem('solidari-voorlezen', s); else localStorage.removeItem('solidari-voorlezen'); } catch (e) {} }, stand);
  await page.addInitScript(STUB);
  await stubApi(page, { tekst: 'Testantwoord.', bronnen: [] });
  await page.goto(pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak && window.Solidari.a11y);
  await page.waitForTimeout(900);
  if (CHAT[pagina]) {
    await page.locator(CHAT[pagina]).first().waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(400);
  }
}

async function axe(page) {
  const r = await new AxeBuilder({ page }).disableRules(AXE_UIT).analyze();
  return r.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 4).map((n) => n.target.join(' ')).join(' | ')}`);
}

const EMOJI = /\p{Extended_Pictographic}|\p{Regional_Indicator}/u;
// Namen uit de echte toegankelijkheidsboom (Chromium), per rol.
function namen(snap, rollen) {
  const re = new RegExp(`- (${rollen}) "((?:[^"\\\\]|\\\\.)*)"`, 'g');
  const uit = [];
  let m;
  while ((m = re.exec(snap))) uit.push({ rol: m[1], naam: m[2] });
  return uit;
}

// ── 1. axe ──────────────────────────────────────────────────────────────────
for (const pagina of PAGES) {
  test(`axe: geen serious/critical op ${pagina} (NL)`, async ({ page }) => {
    await laad(page, pagina);
    expect(await axe(page)).toEqual([]);
  });
}
test('axe: geen serious/critical op rechten.html in het Arabisch (RTL)', async ({ page }) => {
  await laad(page, 'rechten.html', { taal: 'AR' });
  expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
  expect(await axe(page)).toEqual([]);
});

// ── 2. Tellingen (beginschermen) ────────────────────────────────────────────
test.describe('tellingen', () => {
  test.describe.configure({ mode: 'serial' });
  const tel = {};
  for (const pagina of PAGES) {
    test(`meten ${pagina}`, async ({ page }) => {
      await laad(page, pagina);
      const snap = await page.locator('body').ariaSnapshot();
      const bediening = namen(snap, 'button|link|tab|checkbox|menuitem');
      const koppen = namen(snap, 'heading');
      const dom = await page.evaluate(() => {
        const zichtbaar = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
        const velden = [...document.querySelectorAll('input, select, textarea')].filter(zichtbaar)
          .filter((el) => !['hidden', 'submit', 'button'].includes(el.type));
        const zonderLabel = velden.filter((el) => !(el.labels && el.labels.length) && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby'));
        const lui = [...document.querySelectorAll('.sol-a11y-knop')];
        const log = document.getElementById('berichten');
        return {
          main: document.querySelectorAll('main').length,
          h1: document.querySelectorAll('h1').length,
          log: log ? { role: log.getAttribute('role'), live: log.getAttribute('aria-live') } : null,
          veldenZonderLabel: zonderLabel.map((el) => el.id || el.name || el.tagName),
          luidsprekers: lui.length,
          luidsprekersOnverborgen: lui.filter((el) => el.getAttribute('aria-hidden') !== 'true' || el.getAttribute('tabindex') !== '-1').length,
        };
      });
      tel[pagina] = {
        ...dom,
        emojiInNaam: bediening.filter((b) => EMOJI.test(b.naam)).map((b) => `${b.rol} "${b.naam}"`),
        emojiInKop: koppen.filter((k) => EMOJI.test(k.naam)).map((k) => k.naam),
        luidsprekersInBoom: (snap.match(/button "Luister"/g) || []).length,
        mainInBoom: /- main\b/.test(snap),
        h1InBoom: /- heading "[^"]+" \[level=1\]/.test(snap),
      };
      expect(tel[pagina]).toBeTruthy();
    });
  }
  test('totalen kloppen', async () => {
    const p = Object.keys(tel);
    expect(p.length).toBe(PAGES.length);
    const som = (f) => p.reduce((a, k) => a + f(tel[k]), 0);
    const chats = Object.keys(CHAT);
    const totaal = {
      emojiInNaam: som((t) => t.emojiInNaam.length),
      emojiInKop: som((t) => t.emojiInKop.length),
      luidsprekersInBoom: som((t) => t.luidsprekersInBoom),
      luidsprekersOnverborgen: som((t) => t.luidsprekersOnverborgen),
      luidsprekersInDom: som((t) => t.luidsprekers),
      paginasMetMain: p.filter((k) => tel[k].main === 1 && tel[k].mainInBoom).length,
      chatsMetLog: chats.filter((k) => tel[k].log && tel[k].log.role === 'log' && tel[k].log.live === 'polite').length,
      chatsMetH1: chats.filter((k) => tel[k].h1 >= 1 && tel[k].h1InBoom).length,
      veldenZonderLabel: som((t) => t.veldenZonderLabel.length),
    };
    console.log('\nA11Y-V5 FASE 3:', JSON.stringify(totaal));
    const details = JSON.stringify(Object.fromEntries(p.map((k) => [k, { emoji: tel[k].emojiInNaam, kop: tel[k].emojiInKop, velden: tel[k].veldenZonderLabel }])));
    expect(totaal.emojiInNaam, details).toBe(0);
    expect(totaal.emojiInKop, details).toBe(0);
    expect(totaal.luidsprekersInBoom).toBe(0);
    expect(totaal.luidsprekersOnverborgen).toBe(0);
    expect(totaal.luidsprekersInDom, 'de 🔊-knoppen zelf zijn er nog wel').toBeGreaterThan(20);
    expect(totaal.paginasMetMain).toBe(11);
    expect(totaal.chatsMetLog).toBe(4);
    expect(totaal.chatsMetH1).toBe(4);
    expect(totaal.veldenZonderLabel, details).toBe(0);
  });
});

// ── 3. Opbouw ───────────────────────────────────────────────────────────────
test('skip-link: eerste Tab toont "Naar inhoud", Enter zet de focus op <main>', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  await page.keyboard.press('Tab');
  const skip = page.locator('.sol-skip');
  await expect(skip).toBeFocused();
  await expect(skip).toHaveText('Naar inhoud');
  const box = await skip.boundingBox();
  expect(box.y).toBeGreaterThanOrEqual(0);
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => document.activeElement.tagName)).toBe('MAIN');
});

test('18jaar: #inhoud van de pagina blijft, main krijgt een eigen id', async ({ page }) => {
  await laad(page, '18jaar.html');
  const r = await page.evaluate(() => ({
    mainId: document.querySelector('main').id,
    inhoudInMain: !!document.querySelector('main #inhoud'),
    href: document.querySelector('.sol-skip').getAttribute('href'),
    kaarten: document.querySelectorAll('#inhoud .categorie-kaart').length,
  }));
  expect(r.mainId).toBe('hoofdinhoud');
  expect(r.inhoudInMain).toBe(true);
  expect(r.href).toBe('#hoofdinhoud');
  expect(r.kaarten).toBeGreaterThan(2);
});

test('verborgen h1 op de chatpagina’s draagt de toolnaam en vertaalt mee', async ({ page }) => {
  await laad(page, 'goedvoorbereid.html');
  await expect(page.getByRole('heading', { level: 1, name: 'Goed Voorbereid' })).toHaveCount(1);
  await laad(page, 'rechten.html', { taal: 'EN' });
  const h1 = await page.locator('h1').first().textContent();
  expect(h1.trim().length).toBeGreaterThan(3);
  await expect(page.locator('.sol-skip')).toHaveText('Skip to content');
});

// ── 4. Chat: live-regio ─────────────────────────────────────────────────────
test('rechten: keuzekaartjes buiten de live-regio, wél bereikbaar; typ-indicator en avatar stil', async ({ page }) => {
  await laad(page, 'rechten.html');
  const r = await page.evaluate(async () => {
    const log = document.getElementById('berichten');
    toonTyping();   // de eigen typ-indicator van rechten.html
    await Promise.resolve();   // de observer draait als microtaak, vóór de boom wordt bijgewerkt
    const ty = document.getElementById('typing-indicator');
    return {
      kaartjesInLog: !!log.querySelector('.situatie-btn'),
      kaartjesInZone: document.querySelectorAll('#keuze-zone .situatie-btn').length,
      typingInLog: log.contains(ty),
      typingVerborgen: ty.getAttribute('aria-hidden'),
      avatarsOnverborgen: [...log.querySelectorAll('.sol-avatar')].filter((a) => a.getAttribute('aria-hidden') !== 'true').length,
    };
  });
  expect(r.kaartjesInLog).toBe(false);
  expect(r.kaartjesInZone).toBe(7);
  expect(r.typingInLog).toBe(true);
  expect(r.typingVerborgen).toBe('true');
  expect(r.avatarsOnverborgen).toBe(0);
  await page.evaluate(() => verwijderTyping());
  // bereikbaar en zonder emoji in de naam
  await expect(page.getByRole('button', { name: 'Ik krijg bijstand', exact: true })).toBeVisible();
  // een keuze werkt nog en het antwoord komt in de log (zonder emoji-naam in de boom)
  await page.getByRole('button', { name: 'Ik krijg bijstand', exact: true }).click();
  await expect(page.locator('#berichten .bel-user')).toHaveText(/Ik krijg bijstand/);
  await expect(page.locator('#keuze-zone .situatie-btn')).toHaveCount(0);
  await expect(page.locator('#berichten .bel-sol').last()).toHaveText(/Testantwoord/, { timeout: 10000 });
  const snap = await page.locator('#berichten').ariaSnapshot();
  expect(snap).not.toMatch(/\p{Extended_Pictographic}/u);
  // "Nieuw gesprek" zet de kaartjes weer in de zone, niet in de log
  await page.locator('.nieuw-btn').click();   // voorleesstand uit: één klik
  await expect(page.locator('#keuze-zone .situatie-btn')).toHaveCount(7);
  expect(await page.locator('#berichten .situatie-btn').count()).toBe(0);
});

test('nieuw chatbericht met 🤖 heeft de emoji al verborgen op het moment van invoegen', async ({ page }) => {
  await laad(page, 'rechten.html');
  const r = await page.evaluate(async () => {
    voegSolBericht('🤖 Nieuw bericht voor de test');
    await Promise.resolve();   // de observer draait als microtaak
    const b = [...document.querySelectorAll('#berichten .bel-sol')].pop();
    return { verborgen: !!b.querySelector('span.sol-emoji[aria-hidden="true"]'), tekst: b.textContent };
  });
  expect(r.verborgen).toBe(true);
  expect(r.tekst).toContain('🤖 Nieuw bericht');   // zichtbaar blijft hij
});

// ── 5. Knopnamen ────────────────────────────────────────────────────────────
test('verstuurknoppen hebben een echte naam (rechten "↑", budgethulp "→"), ook in het Arabisch', async ({ page }) => {
  await laad(page, 'rechten.html');
  await expect(page.getByRole('button', { name: 'Verstuur', exact: true })).toHaveCount(1);
  await expect(page.getByRole('textbox', { name: 'Je vraag' })).toHaveCount(1);
  await laad(page, 'budgethulp.html');
  await page.getByRole('button', { name: 'Ik alleen', exact: true }).click();
  await expect(page.locator('#invoer-inner .stuur-btn')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#invoer-inner .stuur-btn')).toHaveAttribute('aria-label', 'Verstuur');
  await laad(page, 'rechten.html', { taal: 'AR' });
  await expect(page.getByRole('button', { name: 'إرسال', exact: true })).toHaveCount(1);
  await expect(page.getByRole('textbox', { name: 'سؤالك' })).toHaveCount(1);
});

test('budgethulp controlescherm: elke "Wijzig"-knop heeft een eigen naam', async ({ page }) => {
  await laad(page, 'budgethulp.html');
  await page.evaluate(() => {
    Object.assign(A, { sit: 'alleen', inkomen: 1500, huur: 600, energie: 120, telefoon: 40, zorgverzek: 150, vervoer: 50, boodschappen: 300 });
    toonControlescherm();
  });
  await expect(page.locator('.controle-edit').first()).toBeVisible({ timeout: 10000 });
  const labels = await page.locator('.controle-edit').evaluateAll((els) => els.map((e) => e.getAttribute('aria-label')));
  expect(labels.length).toBeGreaterThanOrEqual(5);
  expect(new Set(labels).size).toBe(labels.length);
  labels.forEach((l) => expect(l).toMatch(/^Wijzig \S/));
  await expect(page.getByRole('button', { name: /^Wijzig Huur/ })).toHaveCount(1);
  await expect(page.locator('.controle-ok-btn')).toHaveAccessibleName(/^Ziet er goed uit/);
});

test('taalkiezer: de vlag hoort niet bij de naam, de taalnaam wel', async ({ page }) => {
  await laad(page, 'index.html');
  await page.locator('.hamburger').click();
  await expect(page.locator('#mob-menu')).toHaveAttribute('aria-hidden', 'false');
  for (const naam of ['Nederlands', 'العربية', 'ትግርኛ', 'دری']) {
    await expect(page.locator('#mob-menu').getByRole('button', { name: naam, exact: true })).toHaveCount(1);
  }
});

// ── 6. Klikbare div's ───────────────────────────────────────────────────────
test('18jaar: categoriekop is een knop (Enter klapt uit), checklist-vakje een checkbox (Spatie vinkt af)', async ({ page }) => {
  await laad(page, '18jaar.html');
  const kop = page.locator('.categorie-header').nth(1);
  await expect(kop).toHaveAttribute('role', 'button');
  await expect(kop).toHaveAttribute('tabindex', '0');
  await expect(kop).toHaveAttribute('aria-expanded', 'false');
  await kop.focus();
  await page.keyboard.press('Enter');
  await expect(kop).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.categorie-kaart').nth(1)).toHaveClass(/open/);
  const vak = page.locator('.check-box').first();
  await expect(vak).toHaveAttribute('role', 'checkbox');
  await expect(vak).toHaveAttribute('aria-checked', 'false');
  const tekst = (await page.locator('.checklist-tekst').first().textContent()).trim();
  await expect(vak).toHaveAccessibleName(tekst);
  await vak.focus();
  await page.keyboard.press(' ');
  await expect(vak).toHaveAttribute('aria-checked', 'true');
  // gewone tik werkt ook nog en de staat volgt
  await vak.click();
  await expect(vak).toHaveAttribute('aria-checked', 'false');
});

test('brief: resultaatkaart-kop is een knop, actiepunt-vinkje een checkbox met naam', async ({ page }) => {
  await laad(page, 'brief.html');
  await page.evaluate(() => toonResultaat({
    secties: [{ titel: 'Wat is dit voor brief?', icoon: '📄', inhoud: '<p>Uitleg.</p>' }, { titel: 'Wat moet je doen?', icoon: '✅', inhoud: '<p>Bellen.</p>' }],
    actiepunten: ['Bel de gemeente'],
  }));
  const kop = page.locator('.rk-header').first();
  await expect(kop).toHaveAttribute('role', 'button');
  await expect(kop).toHaveAttribute('aria-expanded', 'true');
  await expect(kop).toHaveAccessibleName('Wat is dit voor brief?');
  await kop.focus();
  await page.keyboard.press('Enter');
  await expect(kop).toHaveAttribute('aria-expanded', 'false');
  const vink = page.locator('.ap-vinkje').first();
  await expect(vink).toHaveAttribute('role', 'checkbox');
  await expect(vink).toHaveAccessibleName('Bel de gemeente');
  await vink.focus();
  await page.keyboard.press(' ');
  await expect(vink).toHaveAttribute('aria-checked', 'true');
  await page.waitForTimeout(1500);   // fase 6: color-contrast meet tijdens de fade-in te licht; wacht tot de animatie klaar is
  expect(await axe(page)).toEqual([]);
});

// ── 7. goedvoorbereid: één microfoon ────────────────────────────────────────
test('goedvoorbereid: bij het AI-veld staat één microfoon, veld en verstuurknop hebben een naam', async ({ page }) => {
  await laad(page, 'goedvoorbereid.html');
  await page.evaluate(() => toonAIInvoer());
  await expect(page.locator('#ai-invoer')).toBeVisible();
  await expect(page.locator('.sol-a11y-mic')).toHaveCount(1, { timeout: 5000 });
  await expect(page.locator('#spreek-btn')).toHaveCount(0);
  await expect(page.getByRole('textbox', { name: 'Je vraag' })).toHaveCount(1);
  await expect(page.locator('#ai-stuur')).toHaveAccessibleName('Verstuur');
  await expect(page.getByRole('button', { name: 'Spreek in plaats van typen' })).toHaveCount(1);
});

// ── 8. verbergEmoji: idempotent, breekt niets ───────────────────────────────
test('verbergEmoji is idempotent, laat tekst en listeners heel en breekt keuzeTekst niet', async ({ page }) => {
  await laad(page, 'goedvoorbereid.html');
  const r = await page.evaluate(() => {
    const zone = document.getElementById('invoer-zone');
    const voor = zone.innerHTML;
    const tekstVoor = document.body.textContent;
    window.Solidari.a11y.verbergEmoji(document.body);
    window.Solidari.a11y.verbergEmoji(document.body);
    window.Solidari.a11y.verwerk(document.body);
    const knop = zone.querySelector('.keuze-btn');
    return {
      zelfde: zone.innerHTML === voor,
      tekstZelfde: document.body.textContent === tekstVoor,
      geneste: document.querySelectorAll('.sol-emoji .sol-emoji').length,
      keuzeTekst: window.Solidari.spraak.keuzeTekst(knop),
      emojiZichtbaar: knop.innerText.includes('🩺'),
    };
  });
  expect(r.zelfde).toBe(true);
  expect(r.tekstZelfde).toBe(true);
  expect(r.geneste).toBe(0);
  expect(r.keuzeTekst).toBe('De dokter');
  expect(r.emojiZichtbaar).toBe(true);
  await page.locator('.keuze-btn').first().click();
  await expect(page.locator('#berichten .bel-user').last()).toContainText('De dokter');
  const userEmoji = await page.locator('#berichten .bel-user').last().evaluate((el) => !!el.querySelector('.sol-emoji[aria-hidden="true"]'));
  expect(userEmoji).toBe(true);
});

// ── 9. Voorleesmodus (analfabeten) blijft werken ────────────────────────────
test('🔊-knop: verborgen voor de schermlezer, maar een tik leest nog steeds voor', async ({ page }) => {
  await laad(page, 'over.html');
  const knop = page.locator('.sol-a11y-knop').first();
  await expect(knop).toHaveAttribute('aria-hidden', 'true');
  await expect(knop).toHaveAttribute('tabindex', '-1');
  await page.evaluate(() => { window.__spoken = []; });
  await knop.click();
  await page.waitForTimeout(300);
  expect((await page.evaluate(() => window.__spoken)).length).toBeGreaterThan(0);
  // de voorleesschakelaar in de nav blijft een gewone, bereikbare knop
  const toggle = page.locator('.sol-a11y-luister-toggle');
  expect(await toggle.getAttribute('aria-hidden')).toBeNull();
  await expect(page.getByRole('button', { name: 'Voorlezen uit' })).toHaveCount(1);
});

test('voorleesstand: eerste tik op een chip met emoji leest de tekst zonder emoji, tweede tik kiest', async ({ page }) => {
  await laad(page, 'budgethulp.html', { stand: 'aan' });
  await page.waitForTimeout(1500);
  const chip = page.locator('.keuze-btn').first();
  await page.evaluate(() => { window.__spoken = []; });
  await chip.click();
  await page.waitForTimeout(300);
  const gezegd = await page.evaluate(() => window.__spoken.join(' | '));
  expect(gezegd).toContain('Ik alleen');
  expect(gezegd).not.toMatch(/\p{Extended_Pictographic}/u);
  await expect(page.locator('#berichten .bel-user')).toHaveCount(0);
  await chip.click();
  await expect(page.locator('#berichten .bel-user')).toHaveCount(1);
});

// ── 10. Tigrinya: tekst ja, spraak nooit (S-7) ──────────────────────────────
test('TI: skip-link en knopnamen vertaald, geen 🔊 en geen voorleesschakelaar', async ({ page }) => {
  await laad(page, 'rechten.html', { taal: 'TI' });
  await expect(page.locator('.sol-skip')).toHaveText(TI('a11y-naar-inhoud'));
  await expect(page.getByRole('button', { name: TI('a11y-verstuur'), exact: true })).toHaveCount(1);
  await expect(page.locator('.sol-a11y-knop')).toHaveCount(0);
  await expect(page.locator('.sol-a11y-luister-toggle')).toBeHidden();
});
