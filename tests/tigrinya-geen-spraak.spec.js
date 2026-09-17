// Besluit S-7 (17-09-2026, W-B beantwoord met NEE) — Tigrinya krijgt geen spraak.
//
// Een moedertaalspreker beoordeelde de eSpeak-stem en het antwoord was nee. Die stem zat
// in álle drie de lagen — de voorgegenereerde clips kwamen eruit, /api/tts draait hem, en
// op Linux levert de browser hem óók — dus is de taal in spraak.js hard uitgezet.
//
// Wat deze test bewaakt, en waarom juist dit:
//   1. TI krijgt geen voorleesknop, ook niet als het toestel wél een ti-stem meldt.
//   2. De acht andere talen krijgen hem wél — dit besluit mag niet naar hen uitlekken.
//   3. Het verdwijnen is stil: geen dode knop, geen foutmelding, geen trilling.
//   4. Tekst, vertaling en RTL blijven voor TI volledig intact.
//   5. Geen enkele pagina roept /api/tts nog aan. De route blijft op de VPS staan
//      (besluit S-7), maar de frontend raakt hem niet meer aan.
//   6. Er staan geen voorgegenereerde TI-clips meer in de repo.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { metTaal } = require('./helpers');

const ROOT = path.resolve(__dirname, '..');
const ANDERE_TALEN = ['NL', 'EN', 'AR', 'TR', 'UK', 'FA', 'RO', 'PL'];

// Een toestel dat alle negen talen meldt, Tigrinya inbegrepen. Juist dát is de scherpe
// test: de knop moet ook wegblijven als er een stem beschikbaar ís. Op een Linux-toestel
// is die ti-stem namelijk dezelfde eSpeak die is afgewezen.
const STUB_ALLE_STEMMEN = () => {
  const V = [['nl-NL'], ['en-GB'], ['ar-SA'], ['tr-TR'], ['ti-ET'], ['uk-UA'], ['fa-IR'], ['ro-RO'], ['pl-PL']]
    .map(([lang]) => ({ lang, name: lang, localService: true, default: false }));
  window.__spoken = [];
  function Utter(t) { this.text = t; this.onend = null; this.onerror = null; this.voice = null; }
  Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: Utter });
  const synth = {
    getVoices: () => V,
    speak: (u) => { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
    cancel: () => {}, pause: () => {}, resume: () => {}, get speaking() { return false; },
  };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, get: () => synth });
};

async function laad(page, pagina, taal) {
  await metTaal(page, taal);
  await page.addInitScript(STUB_ALLE_STEMMEN);
  await page.goto('/' + pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(600); // auto-markering + scan
}

test('TI: geen enkele voorleesknop op de pagina, ook niet met een ti-stem op het toestel', async ({ page }) => {
  const fouten = [];
  page.on('pageerror', e => fouten.push(String(e.message)));
  for (const pagina of ['index.html', 'over.html', 'brief.html']) {
    await laad(page, pagina, 'TI');
    const m = await page.evaluate(() => ({
      knoppen: document.querySelectorAll('.sol-a11y-knop').length,
      leesblokken: document.querySelectorAll('[data-lees]').length,
      toggleZichtbaar: [...document.querySelectorAll('.sol-a11y-luister-toggle')]
        .filter(b => b.offsetParent !== null).length,
    }));
    expect(m.knoppen, `${pagina} [TI] hoort 0 voorleesknoppen te hebben`).toBe(0);
    // De tekst zelf blijft gewoon staan en gemarkeerd — alleen de knop verdwijnt.
    expect(m.leesblokken, `${pagina} [TI] hoort zijn tekstblokken te houden`).toBeGreaterThan(0);
    expect(m.toggleZichtbaar, `${pagina} [TI] hoort geen zichtbare luisterschakelaar te hebben`).toBe(0);
  }
  expect(fouten, 'console-fouten: ' + fouten.join(' | ')).toEqual([]);
});

test('de acht andere talen houden hun voorleesknop', async ({ page }) => {
  for (const taal of ANDERE_TALEN) {
    await laad(page, 'over.html', taal);
    const m = await page.evaluate(() => ({
      knoppen: document.querySelectorAll('.sol-a11y-knop').length,
      toggleZichtbaar: [...document.querySelectorAll('.sol-a11y-luister-toggle')]
        .filter(b => b.offsetParent !== null).length,
    }));
    expect(m.knoppen, `${taal} hoort voorleesknoppen te houden`).toBeGreaterThan(0);
    expect(m.toggleZichtbaar, `${taal} hoort zijn luisterschakelaar te houden`).toBeGreaterThan(0);
  }
});

test('taalwissel NL → TI → NL: de knoppen verdwijnen en komen terug', async ({ page }) => {
  // Gevonden in de Chrome-test van 17-09-2026, niet door de tests hierboven: die laden de
  // pagina vers in TI. Wie de pagina in het Nederlands opende en dán naar Tigrinya wisselde,
  // hield alle 🔊-knoppen — scan() zag "er staat al een knop" en velde geen nieuw oordeel.
  // Klikken deed vervolgens niets: precies de dode knop die het besluit wilde vermijden.
  for (const pagina of ['over.html', 'brief.html']) {
    await laad(page, pagina, 'NL');
    const wissel = async (code) => {
      await page.evaluate((c) => {
        const b = document.querySelector(`#solidari-nav-bar .taal-btn[data-taal="${c}"]`);
        if (b) b.click();
      }, code);
      await page.waitForTimeout(1200);
      return page.evaluate(() => {
        const t = document.querySelector('.sol-a11y-luister-toggle');
        return {
          knoppen: document.querySelectorAll('.sol-a11y-knop').length,
          blokken: document.querySelectorAll('[data-lees]').length,
          toggle: t ? t.offsetParent !== null : null,
        };
      });
    };
    const nl1 = await page.evaluate(() => document.querySelectorAll('.sol-a11y-knop').length);
    expect(nl1, `${pagina}: geen beginknoppen in NL`).toBeGreaterThan(0);

    const ti = await wissel('TI');
    expect(ti.knoppen, `${pagina}: knoppen blijven staan na wissel naar TI`).toBe(0);
    expect(ti.toggle, `${pagina}: luisterschakelaar blijft staan in TI`).toBe(false);
    expect(ti.blokken, `${pagina}: de tekstblokken horen te blijven`).toBeGreaterThan(0);

    const nl2 = await wissel('NL');
    expect(nl2.knoppen, `${pagina}: knoppen komen niet terug in NL`).toBe(nl1);
    expect(nl2.toggle, `${pagina}: luisterschakelaar komt niet terug in NL`).toBe(true);
  }
});

test('laagkeuze: TI levert niets, de andere acht leveren de browserstem', async ({ page }) => {
  await laad(page, 'index.html', 'NL');
  const uit = await page.evaluate(async () => {
    const s = Solidari.spraak;
    return {
      ti: await s._kiesLaag('ናይ ኤአይ መልሲ ብዛዕባ ደብዳቤኻ፣ ኣብ መዝገብ ዘየሎ ሓድሽ ጽሑፍ እዩ።', 'TI'),
      tiBeschikbaar: s.beschikbaar('TI'),
      tiVlag: s.geenSpraak('TI'),
      nl: await s._kiesLaag('Een nieuwe zin die nergens is voorgegenereerd.', 'NL'),
      ar: await s._kiesLaag('نص جديد لم يسبق توليده.', 'AR'),
      nlVlag: s.geenSpraak('NL'),
    };
  });
  expect(uit.ti, 'TI hoort geen laag te kiezen').toBeNull();
  expect(uit.tiBeschikbaar, 'beschikbaar(TI) hoort false te zijn').toBe(false);
  expect(uit.tiVlag).toBe(true);
  expect(uit.nl).toBe('stem');
  expect(uit.ar).toBe('stem');
  expect(uit.nlVlag).toBe(false);
});

test('stil: zeg() in TI speelt niets af en meldt geen fout', async ({ page }) => {
  await laad(page, 'index.html', 'TI');
  const uit = await page.evaluate(async () => {
    const s = Solidari.spraak;
    let fout = 0, start = 0;
    window.__spoken = [];
    let trillingen = 0;
    try { navigator.vibrate = () => { trillingen++; return true; }; } catch (e) {}
    await s.zeg('ትግርኛ', { taal: 'TI', opStart: () => start++, opFout: () => fout++ });
    await new Promise(r => setTimeout(r, 300));
    return { fout, start, gesproken: window.__spoken.length, trillingen, bezig: s.bezig() };
  });
  expect(uit.gesproken, 'er mag in TI niets uitgesproken worden').toBe(0);
  expect(uit.fout, 'zeg() in TI mag geen foutmelding geven').toBe(0);
  expect(uit.start, 'zeg() in TI mag niet aan iets beginnen').toBe(0);
  expect(uit.trillingen, 'zeg() in TI mag niet trillen').toBe(0);
  expect(uit.bezig).toBe(false);
});

test('TI houdt tekst en vertaling; de RTL-afhandeling blijft ongemoeid', async ({ page }) => {
  await laad(page, 'index.html', 'TI');
  const ti = await page.evaluate(() => {
    // components.js vervangt #solidari-nav door #solidari-nav-bar (outerHTML).
    const nav = document.querySelector('#solidari-nav-bar [data-i18n="nav-over"]');
    return {
      dir: document.documentElement.dir,
      navTekst: nav ? nav.textContent.trim() : '',
      geez: /[\u1200-\u137F]/.test(document.body.textContent),
    };
  });
  expect(ti.geez, 'er hoort Ge\'ez-schrift op de pagina te staan').toBe(true);
  expect(ti.navTekst.length, 'de navigatie hoort vertaald te zijn').toBeGreaterThan(0);
  expect(ti.dir, 'Tigrinya schrijft van links naar rechts').toBe('ltr');

  // Dat het besluit de richtingafhandeling niet geraakt heeft, blijkt bij een RTL-taal.
  await laad(page, 'index.html', 'AR');
  expect(await page.evaluate(() => document.documentElement.dir), 'AR hoort rtl te blijven').toBe('rtl');
});

test('geen enkele pagina roept /api/tts nog aan', async ({ page }) => {
  const aanroepen = [];
  await page.route('**/api/tts', route => { aanroepen.push(route.request().url()); route.abort(); });
  for (const pagina of ['index.html', 'over.html', 'brief.html']) {
    await laad(page, pagina, 'TI');
    // ook een verse, dynamische TI-alinea mag de route niet wakker maken
    await page.evaluate(async () => {
      const el = document.createElement('p');
      el.setAttribute('data-lees', '');
      el.setAttribute('data-lees-taal', 'TI');
      el.textContent = 'ናይ ኤአይ መልሲ ብዛዕባ ደብዳቤኻ፣ ኣብ መዝገብ ዘየሎ ሓድሽ ጽሑፍ እዩ።';
      document.body.appendChild(el);
      await Solidari.spraak.verwerk(el.parentElement);
      await Solidari.spraak.zeg(el.textContent, { taal: 'TI' });
    });
    await page.waitForTimeout(300);
  }
  expect(aanroepen, '/api/tts werd toch aangeroepen: ' + aanroepen.join(', ')).toEqual([]);
  // en de aanroepcode staat niet meer in het bestand
  const bron = fs.readFileSync(path.join(ROOT, 'spraak.js'), 'utf8');
  expect(bron.includes("fetch(ttsBasis()"), 'de /api/tts-aanroep staat nog in spraak.js').toBe(false);
});

test('er staan geen voorgegenereerde TI-clips meer in de repo', async () => {
  expect(fs.existsSync(path.join(ROOT, 'audio', 'TI')), 'audio/TI/ bestaat nog').toBe(false);
  const man = JSON.parse(fs.readFileSync(path.join(ROOT, 'audio', 'manifest-ti.json'), 'utf8'));
  expect(Object.keys(man.items || {}).length, 'manifest-ti.json heeft nog regels').toBe(0);
  expect(man.bron, 'manifest-ti.json noemt nog een generatorbron').toBeFalsy();
});

test('de eSpeak/TigrinyaNLP-attributie staat nergens meer op de site', async () => {
  const bestanden = fs.readdirSync(ROOT).filter(f => /\.(html|js)$/.test(f));
  const treffers = [];
  for (const f of bestanden) {
    const inhoud = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (/TigrinyaNLP/.test(inhoud)) treffers.push(f);
  }
  expect(treffers, 'attributie staat nog in: ' + treffers.join(', ')).toEqual([]);
});
