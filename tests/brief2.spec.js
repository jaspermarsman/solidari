// PLAN 20, fase 5 — Brief Begrijper v2: het resultaat in vaste blokken (B-10), meer pagina's (B-5),
// foutcodes (B-9), de privacytekst (B-11) en de nieuwe sleutels in negen talen (B-12).
// Alle antwoorden van de backend zijn nagebootst (page.route op **/api/analyseer): er gaat niets naar een echte API.
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');

// Een geldig PNG'tje van 1×1 als "brief".
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
const foto = (n) => ({ name: `brief-${n}.png`, mimeType: 'image/png', buffer: PNG });
const PDF = { name: 'brief.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n%%EOF\n') };

// Nagebootste stem, zoals in overal.spec.js. Alles wat gezegd wordt komt in window.__spoken.
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

const ALLE = {
  urgentie: { niveau: 'hoog', titel: 'Betaal voor 17 november 2026', tekst: 'Je moet **snel** betalen, anders krijg je een boete.' },
  wat_staat_er: 'Dit is een brief van het CJIB over een boete van € 150.',
  wat_doen: ['Betaal € 150 voor 17 november 2026', 'Bewaar de brief', 'Bel bij vragen'],
  deadline: { datum: '17 november 2026', citaat: 'U moet het bedrag vóór 17 november 2026 betalen.' },
  als_je_niets_doet: 'Dan krijg je een extra boete.',
  bezwaar: 'Je kunt binnen 6 weken bezwaar maken.',
  contact: 'Bel 058 123 45 67 of ga naar www.cjib.nl.',
  twijfel: 'Het bedrag was moeilijk te lezen.',
  twijfel_code: null,
  afgekapt: false,
};
const MIN = { urgentie: null, wat_staat_er: 'Een korte brief.', wat_doen: [], deadline: null, als_je_niets_doet: null, bezwaar: null, contact: null, twijfel: null, twijfel_code: null, afgekapt: false };

// Laadt brief.html; elk verzoek naar /api/analyseer gaat langs `antwoord(verzoek)` en wordt onthouden.
async function laad(page, antwoord, { taal = 'NL', stand = 'uit' } = {}) {
  const verzoeken = [];
  const dialogen = [];
  page.on('dialog', (d) => { dialogen.push(d.message()); d.dismiss(); });
  await metTaal(page, taal);
  await page.addInitScript((st) => { try { localStorage.setItem('solidari-voorlezen', st); } catch (e) {} }, stand);
  await page.addInitScript(STUB);
  await page.route('**/api/analyseer', async (r) => {
    const req = r.request();
    const buf = req.postDataBuffer() || Buffer.alloc(0);
    const tekst = buf.toString('latin1');
    verzoeken.push({
      delen: (tekst.match(/name="brief"/g) || []).length,
      v: (/name="v"\r\n\r\n([^\r]*)\r\n/.exec(tekst) || [])[1],
      taal: (/name="taal"\r\n\r\n([^\r]*)\r\n/.exec(tekst) || [])[1],
      namen: [...tekst.matchAll(/name="brief"; filename="([^"]*)"/g)].map((m) => m[1]),
      types: [...tekst.matchAll(/name="brief"; filename="[^"]*"\r\nContent-Type: ([^\r]*)/g)].map((m) => m[1]),
      bytes: buf.length,
    });
    const a = typeof antwoord === 'function' ? antwoord(req) : antwoord;
    if (a === 'afbreken') return r.abort();
    const { status = 200, body, tekst: ruw, wacht } = a.status || a.tekst !== undefined || a.wacht ? a : { body: a };
    if (wacht) await new Promise((res) => setTimeout(res, wacht));
    return r.fulfill({
      status, contentType: ruw !== undefined ? 'text/plain' : 'application/json', headers: { 'access-control-allow-origin': '*' },
      body: ruw !== undefined ? ruw : JSON.stringify(body),
    });
  });
  await page.goto('brief.html');
  await page.waitForFunction(() => window.Solidari && window.Solidari.i18n && window.Solidari.opmaak);
  await page.waitForTimeout(400);
  return { verzoeken, dialogen };
}
async function kies(page, bestanden) {
  await page.setInputFiles('#bestand-input', bestanden);
}
async function analyseer(page, bestanden = foto(1)) {
  await kies(page, bestanden);
  await page.check('#privacy-checkbox');
  // In de voorleesstand is de eerste tik op een knop voorlezen, de tweede doen (PLAN 15/17)
  if (await page.evaluate(() => document.body.classList.contains('sol-a11y-luistermodus'))) {
    await page.click('#analyseer-knop');
    await page.waitForTimeout(300);
  }
  await page.click('#analyseer-knop');
}
async function toonAntwoord(page, antwoord, opties) {
  const r = await laad(page, antwoord, opties);
  await analyseer(page);
  await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
  await page.waitForTimeout(300);
  return r;
}
// De tekst van een element zonder het 🔊-knopje van de voorleesstand (dat staat ook bij stand uit in de DOM).
const schoon = (loc) => loc.evaluate((el) => { const c = el.cloneNode(true); c.querySelectorAll('.sol-a11y-knop').forEach((x) => x.remove()); return c.textContent.trim(); });
const sleutel = (page, k, taal) => page.evaluate(([k, t]) => window.Solidari.i18n.t(k, t), [k, taal]);
const blokken = (page) => page.locator('#resultaat-kaarten > [data-blok]').evaluateAll((els) => els.map((e) => e.dataset.blok));

// ── B-10: de blokken ─────────────────────────────────────────────────────────────────────────
test.describe('resultaat in vaste blokken', () => {
  test('alles gevuld: vaste volgorde, banner bovenaan, elk blok met pictogram en kop uit i18n', async ({ page }) => {
    await toonAntwoord(page, ALLE);
    expect(await blokken(page)).toEqual(['wat', 'doen', 'niets', 'bezwaar', 'contact', 'twijfel']);
    await expect(page.locator('#urgentie-banner .urgentie-banner.hoog')).toBeVisible();
    await expect(page.locator('.urgentie-tekst > strong')).toHaveText('Betaal voor 17 november 2026');
    await expect(page.locator('.urgentie-tekst p strong')).toHaveText('snel');   // opmaak: vet
    const koppen = await page.locator('#resultaat-kaarten > [data-blok] > .rb-kop > span[data-i18n]').allTextContents();
    expect(koppen).toEqual(['Wat staat er in deze brief?', 'Wat moet je doen?', 'Als je niets doet', 'Niet mee eens?', 'Contact', 'Niet goed te lezen']);
    for (const b of await page.locator('#resultaat-kaarten > [data-blok]').all()) {
      await expect(b.locator('.rb-icoon')).toHaveAttribute('aria-hidden', 'true');
    }
    await expect(page.locator('[data-blok=wat] .rb-body')).toContainText('CJIB');
    expect(await schoon(page.locator('[data-blok=niets] .rb-body'))).toBe('Dan krijg je een extra boete.');
    await expect(page.locator('[data-blok=bezwaar] .rb-body')).toContainText('binnen 6 weken');
    await expect(page.locator('[data-blok=contact] .rb-body')).toContainText('058 123 45 67');
    await expect(page.locator('[data-blok=twijfel] .rb-body')).toContainText('Het bedrag was moeilijk te lezen.');
    expect(await schoon(page.locator('.rb-deadline'))).toBe('⏰17 november 2026');
    // De drie acties
    await expect(page.locator('#actiepunten-lijst .actiepunt')).toHaveCount(3);
    // Elk blok heeft een eigen kleur: de achtergronden zijn niet allemaal gelijk
    const kleuren = await page.locator('#resultaat-kaarten > [data-blok]').evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundColor));
    expect(new Set(kleuren).size).toBeGreaterThanOrEqual(3);
  });

  test('een blok verschijnt alleen als zijn veld gevuld is', async ({ page }) => {
    await toonAntwoord(page, MIN);
    // Alleen "Wat staat er" en "Wat moet je doen" (met de zin dat er niets hoeft)
    expect(await blokken(page)).toEqual(['wat', 'doen']);
    await expect(page.locator('#urgentie-banner > *')).toHaveCount(0);
    await expect(page.locator('.rb-deadline, .rb-citaat')).toHaveCount(0);
  });

  test('lege velden, lege tekst of alleen spaties tellen als leeg; elk blok apart', async ({ page }) => {
    // wat_staat_er moet gevuld zijn: zonder uitleg toont de pagina een foutmelding (zie onderaan dit bestand).
    await toonAntwoord(page, { ...MIN, bezwaar: 'Maak bezwaar.', contact: '', als_je_niets_doet: '\n', twijfel: ' ' });
    expect(await blokken(page)).toEqual(['wat', 'doen', 'bezwaar']);
  });

  test('lege wat_doen: "Je hoeft niets te doen. Bewaar de brief." en geen afvinklijst', async ({ page }) => {
    await toonAntwoord(page, MIN);
    expect(await schoon(page.locator('[data-blok=doen] .rb-body'))).toBe('Je hoeft niets te doen. Bewaar de brief.');
    await expect(page.locator('.actiepunt')).toHaveCount(0);
  });

  test('wat_doen met acties: afvinklijst, de zin "niets te doen" verdwijnt, afvinken werkt', async ({ page }) => {
    await toonAntwoord(page, ALLE);
    await expect(page.locator('[data-blok=doen]')).not.toContainText('Je hoeft niets te doen');
    const eerste = page.locator('#ap-0');
    await expect(eerste).not.toHaveClass(/gedaan/);
    await eerste.locator('.ap-vinkje').click();
    await expect(eerste).toHaveClass(/gedaan/);
    await expect(eerste.locator('.ap-vinkje')).toHaveAttribute('aria-checked', 'true');
    await eerste.locator('.ap-tekst').click();   // ook een tik op de tekst zelf zet het vinkje terug
    await expect(eerste).not.toHaveClass(/gedaan/);
  });

  test('de banner "verlopen": eigen titel en tekst van de pagina, niet die van het model', async ({ page }) => {
    await toonAntwoord(page, { ...ALLE, urgentie: { niveau: 'verlopen', titel: 'MODELTITEL', tekst: 'MODELTEKST' } });
    const banner = page.locator('#urgentie-banner .urgentie-banner.verlopen');
    await expect(banner).toBeVisible();
    await expect(banner.locator('strong')).toHaveText('De datum in de brief is voorbij');
    await expect(banner).toContainText('Bel vandaag nog met de afzender. Vraag wat je nu nog kunt doen.');
    await expect(banner).not.toContainText('MODEL');
  });

  test('de banner "verlopen" in PL: de Poolse vaste tekst, en hij wisselt mee bij een taalwissel', async ({ page }) => {
    await toonAntwoord(page, { ...ALLE, urgentie: { niveau: 'verlopen', titel: 'x', tekst: 'y' } }, { taal: 'PL' });
    await expect(page.locator('.urgentie-banner.verlopen strong')).toHaveText(await sleutel(page, 'brief-verlopen-titel', 'pl'));
    await page.click('.taal-item[data-taal="en"]');
    await expect(page.locator('.urgentie-banner.verlopen strong')).toHaveText(await sleutel(page, 'brief-verlopen-titel', 'en'));
  });

  test('het citaat staat in <bdi lang="nl">, onder "Wat moet je doen?" met de datum', async ({ page }) => {
    await toonAntwoord(page, ALLE);
    const bdi = page.locator('[data-blok=doen] .rb-citaat bdi[lang="nl"]');
    await expect(bdi).toHaveCount(1);
    await expect(bdi).toContainText('U moet het bedrag vóór 17 november 2026 betalen.');
    await expect(page.locator('[data-blok=doen] .rb-citaat')).toContainText('In de brief staat:');
    await expect(page.locator('[data-blok=doen] .rb-deadline')).toContainText('17 november 2026');
  });

  test('het citaat in AR: pagina rtl, label in het Arabisch, citaat blijft Nederlands in <bdi lang="nl">', async ({ page }) => {
    await toonAntwoord(page, ALLE, { taal: 'AR' });
    expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
    expect(await page.evaluate(() => document.body.dir)).toBe('rtl');
    const label = await sleutel(page, 'brief-in-de-brief', 'ar');
    expect(label).not.toBe('In de brief staat:');
    await expect(page.locator('.rb-citaat')).toContainText(label);
    const bdi = page.locator('.rb-citaat bdi[lang="nl"]');
    await expect(bdi).toHaveCount(1);
    await expect(bdi).toContainText('U moet het bedrag vóór 17 november 2026 betalen.');
    // De AI-tekst zelf staat in een element met de richting van de taal van de uitleg
    expect(await page.locator('[data-blok=wat] .rb-body').evaluate((el) => [el.lang, el.dir])).toEqual(['ar', 'rtl']);
  });

  test('deadline zonder datum: alleen het citaat; zonder deadline geen citaat', async ({ page }) => {
    await toonAntwoord(page, { ...MIN, wat_doen: ['Reageer'], deadline: { datum: null, citaat: 'Binnen zes weken na dagtekening.' } });
    await expect(page.locator('.rb-deadline')).toHaveCount(0);
    expect(await schoon(page.locator('.rb-citaat bdi[lang="nl"]'))).toBe('“Binnen zes weken na dagtekening.”');
  });

  test('twijfel_code deadline_onzeker: de vaste melding in "Niet goed te lezen", ook zonder twijfeltekst', async ({ page }) => {
    await toonAntwoord(page, { ...MIN, deadline: null, twijfel: null, twijfel_code: 'deadline_onzeker' });
    expect(await blokken(page)).toEqual(['wat', 'doen', 'twijfel']);
    expect(await schoon(page.locator('[data-blok=twijfel] .rb-melding'))).toBe('We konden de datum niet goed terugvinden in de brief. Kijk zelf in de brief welke datum er staat.');
  });

  test('deadline_onzeker samen met twijfel: de melding en de tekst, de melding eerst', async ({ page }) => {
    await toonAntwoord(page, { ...MIN, twijfel: 'Het bedrag was onduidelijk.', twijfel_code: 'deadline_onzeker' });
    const t = await page.locator('[data-blok=twijfel] .rb-body').innerText();
    expect(t.indexOf('We konden de datum niet goed terugvinden')).toBeGreaterThanOrEqual(0);
    expect(t.indexOf('Het bedrag was onduidelijk.')).toBeGreaterThan(t.indexOf('We konden de datum'));
  });

  test('afgekapt: de melding dat alleen het eerste deel is uitgelegd; anders niet', async ({ page }) => {
    await toonAntwoord(page, { ...MIN, afgekapt: true });
    await expect(page.locator('#resultaat-kaarten')).toContainText('De brief is lang. Alleen het eerste deel is uitgelegd.');
    await page.evaluate(() => toonResultaat({ wat_staat_er: 'Kort.', wat_doen: [], afgekapt: false }));
    await expect(page.locator('#resultaat-kaarten')).not.toContainText('De brief is lang');
  });

  test('AI-tekst met HTML komt als tekst in beeld en nooit als element in de DOM', async ({ page }) => {
    const AANVAL = '<img src=x onerror="window.__xss=1"><script>window.__xss=1</script><b>vet</b>';
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await toonAntwoord(page, {
      urgentie: { niveau: 'hoog" onmouseover="window.__xss=1', titel: AANVAL, tekst: AANVAL },
      wat_staat_er: AANVAL, wat_doen: [AANVAL], deadline: { datum: AANVAL, citaat: AANVAL },
      als_je_niets_doet: AANVAL, bezwaar: AANVAL, contact: AANVAL, twijfel: AANVAL, twijfel_code: 'deadline_onzeker', afgekapt: true,
    });
    const r = await page.evaluate(() => {
      const vak = document.getElementById('stap-resultaat');
      const alle = [...vak.querySelectorAll('*')].filter((el) => !el.closest('#brief-disclaimer') && !el.closest('.sol-a11y-knop') && !el.closest('button, .resultaat-header, .nieuwe-brief-wrap'));   // de links van de disclaimer zijn van ons
      return {
        xss: window.__xss,
        verboden: alle.filter((el) => ['IMG', 'SCRIPT', 'IFRAME', 'SVG', 'STYLE', 'B', 'A'].includes(el.tagName.toUpperCase())).map((el) => el.tagName),
        handlers: alle.flatMap((el) => [...el.attributes].filter((a) => /^on/i.test(a.name)).map((a) => a.name)),
        tekst: vak.innerText,
        klasse: document.querySelector('#urgentie-banner > div').className,
      };
    });
    expect(r.xss).toBeUndefined();
    expect(r.verboden).toEqual([]);
    expect(r.handlers).toEqual([]);
    expect(r.klasse).toBe('urgentie-banner laag');   // onbekend niveau wordt 'laag', geen attribuut erbij
    expect(r.tekst).toContain('<img src=x onerror="window.__xss=1">');
    expect(r.tekst).toContain('<script>window.__xss=1</script>');
    // Elk veld een keer: banner (titel en tekst, 2), wat, actie, datum, citaat, niets, bezwaar, contact, twijfel
    expect((r.tekst.match(/<img src=x/g) || []).length).toBe(10);
    expect(fouten).toEqual([]);
  });

  test('een antwoord met ontbrekende of rare velden geeft geen "undefined" en geen fout', async ({ page }) => {
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await toonAntwoord(page, { urgentie: { niveau: 'midden' }, wat_staat_er: 42, wat_doen: [null, 7, ''], deadline: {} });
    await expect(page.locator('#stap-resultaat')).not.toContainText('undefined');
    await expect(page.locator('#stap-resultaat')).not.toContainText('null');
    await expect(page.locator('#actiepunten-lijst .actiepunt')).toHaveCount(1);   // alleen de 7
    await expect(page.locator('.urgentie-banner')).toHaveCount(0);                 // geen titel en tekst: geen banner
    expect(fouten).toEqual([]);
  });

  test('het voorbeeld (DEMO_RESULTAAT) heeft het nieuwe formaat en toont alle blokken', async ({ page }) => {
    await laad(page, MIN);
    await page.evaluate(() => toonResultaat(DEMO_RESULTAAT));
    expect(await blokken(page)).toEqual(['wat', 'doen', 'niets', 'bezwaar', 'contact']);
    await expect(page.locator('.rb-citaat bdi[lang="nl"]')).toHaveCount(1);
    await expect(page.locator('[data-blok=wat] .rb-body strong')).toHaveText('gemeente');
  });

  test('de oude secties-weergave bestaat niet meer: veiligeHtml en toggleKaart zijn weg', async ({ page }) => {
    await laad(page, MIN);
    expect(await page.evaluate(() => [typeof veiligeHtml, typeof toggleKaart])).toEqual(['undefined', 'undefined']);
  });

  test('wachten: één vaste regel, geen wisselende fasen', async ({ page }) => {
    await laad(page, { wacht: 2600, body: MIN });
    await analyseer(page);
    const regel = page.locator('#verwerken-fase');
    await expect(regel).toBeVisible();
    await expect(regel).toHaveText('We lezen je brief en schrijven de uitleg…');
    await page.waitForTimeout(2300);
    await expect(regel).toHaveText('We lezen je brief en schrijven de uitleg…');
    await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 10000 });
  });
});

// ── B-9: foutcodes ───────────────────────────────────────────────────────────────────────────
const CODES = ['geen_bestand', 'geen_tekst', 'onleesbaar', 'te_groot', 'type', 'te_veel', 'dagplafond', 'storing'];
const NL_FOUT = {
  geen_bestand: 'Kies eerst een foto of een PDF van je brief.',
  geen_tekst: 'We vonden geen tekst op de foto. Leg de brief plat, zorg voor licht en maak een nieuwe foto.',
  onleesbaar: 'De foto is niet scherp genoeg. Maak een nieuwe foto, recht boven de brief.',
  te_groot: 'Het bestand is te groot. Maximaal 10 MB.',
  type: 'Dit soort bestand kunnen we niet lezen. Gebruik een foto of een PDF.',
  te_veel: 'Even wachten. Probeer het over een minuut opnieuw.',
  dagplafond: 'Solidari heeft vandaag het maximale aantal brieven uitgelegd. Probeer het morgen opnieuw. Het ligt niet aan je brief.',
  storing: 'De tool is nu niet bereikbaar. Probeer het over een paar minuten opnieuw.',
};
const STATUS = { geen_bestand: 400, geen_tekst: 422, onleesbaar: 422, te_groot: 413, type: 415, te_veel: 429, dagplafond: 429, storing: 500 };

test.describe('foutcodes', () => {
  for (const taal of ['NL', 'AR', 'PL']) {
    test(`elke code in ${taal}: de vertaalde zin, nooit de Nederlandse zin van de server`, async ({ page }) => {
      let code = 'storing';
      await laad(page, () => ({ status: STATUS[code], body: { fout: 'DIT NEDERLANDSE ZIN MAG NIET IN BEELD', code } }), { taal });
      for (const c of CODES) {
        code = c;
        await analyseer(page);
        await expect(page.locator('#stap-fout')).toBeVisible({ timeout: 20000 });
        const verwacht = await sleutel(page, 'brief-fout-' + c, taal.toLowerCase());
        await expect(page.locator('#fout-bericht')).toHaveText(verwacht);
        await expect(page.locator('#stap-fout')).not.toContainText('DIT NEDERLANDSE ZIN');
        await expect(page.locator('#fout-titel')).toHaveText(await sleutel(page, 'brief-fout-titel', taal.toLowerCase()));
        if (taal === 'NL') { await expect(page.locator('#fout-bericht')).toHaveText(NL_FOUT[c]); await expect(page.locator('#fout-titel')).toHaveText('Er ging iets mis'); }
        else expect(verwacht).not.toBe(NL_FOUT[c]);
        await page.click('#stap-fout .analyseer-knop');   // "Opnieuw proberen"
        await expect(page.locator('#stap-upload')).toBeVisible();
      }
    });
  }

  test('zonder code: terugval op de status (413, 415, 429, al het andere = storing)', async ({ page }) => {
    let status = 500, body = { fout: 'Nederlandse zin' };
    await laad(page, () => ({ status, body }));
    for (const [s, b, verwacht] of [[413, { fout: 'x' }, 'te_groot'], [415, { fout: 'x' }, 'type'], [429, { fout: 'x' }, 'te_veel'],
      [500, { fout: 'x' }, 'storing'], [502, {}, 'storing'], [422, { fout: 'x', code: 'onbekende_code' }, 'storing'], [429, { code: 'raar' }, 'te_veel']]) {
      status = s; body = b;
      await analyseer(page);
      await expect(page.locator('#stap-fout')).toBeVisible({ timeout: 20000 });
      await expect(page.locator('#fout-bericht')).toHaveText(NL_FOUT[verwacht]);
      await page.click('#stap-fout .analyseer-knop');
    }
  });

  test('geen JSON in het antwoord (nginx-foutpagina) en een netwerkfout: storing', async ({ page }) => {
    let modus = 'tekst';
    await laad(page, () => modus === 'tekst' ? { status: 502, tekst: '<html>Bad Gateway</html>' } : 'afbreken');
    await analyseer(page);
    await expect(page.locator('#fout-bericht')).toHaveText(NL_FOUT.storing, { timeout: 20000 });
    await expect(page.locator('#stap-fout')).not.toContainText('Bad Gateway');
    await page.click('#stap-fout .analyseer-knop');
    modus = 'afbreken';
    await analyseer(page);
    await expect(page.locator('#fout-bericht')).toHaveText(NL_FOUT.storing, { timeout: 20000 });
  });

  test('een 200 zonder object (bijv. een string) is een storing, geen kapot scherm', async ({ page }) => {
    await laad(page, { tekst: '"hoi"' });
    await analyseer(page);
    await expect(page.locator('#fout-bericht')).toHaveText(NL_FOUT.storing, { timeout: 20000 });
  });

  test('het foutscherm wisselt mee bij een taalwissel', async ({ page }) => {
    await laad(page, { status: 429, body: { fout: 'x', code: 'dagplafond' } });
    await analyseer(page);
    await expect(page.locator('#fout-bericht')).toHaveText(NL_FOUT.dagplafond, { timeout: 20000 });
    await page.click('.taal-item[data-taal="pl"]');
    await expect(page.locator('#fout-bericht')).toHaveText(await sleutel(page, 'brief-fout-dagplafond', 'pl'));
    await expect(page.locator('#fout-titel')).toHaveText(await sleutel(page, 'brief-fout-titel', 'pl'));
    await expect(page.locator('#fout-bericht')).not.toHaveText(NL_FOUT.dagplafond);
  });
});

// ── B-5: meer pagina's ───────────────────────────────────────────────────────────────────────
test.describe('meer pagina\'s', () => {
  for (const n of [1, 2, 4]) {
    test(`${n} afbeelding(en): het verzoek heeft ${n} brief-deel(en), v=2 en de taal`, async ({ page }) => {
      const { verzoeken } = await laad(page, MIN, { taal: 'PL' });
      await analyseer(page, Array.from({ length: n }, (_, i) => foto(i + 1)));
      await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
      expect(verzoeken).toHaveLength(1);
      expect(verzoeken[0].delen).toBe(n);
      expect(verzoeken[0].v).toBe('2');
      expect(verzoeken[0].taal).toBe('pl');
      expect(verzoeken[0].types.every((t) => t === 'image/jpeg' || t === 'image/png')).toBe(true);
    });
  }

  test('de gekozen pagina\'s staan genummerd in beeld, "Nog een pagina" voegt er een toe (camera)', async ({ page }) => {
    await laad(page, MIN);
    await expect(page.locator('#bestand-preview')).not.toHaveClass(/zichtbaar/);
    await kies(page, foto(1));
    await expect(page.locator('#bestand-preview')).toHaveClass(/zichtbaar/);
    await expect(page.locator('#paginas-lijst li')).toHaveCount(1);
    await expect(page.locator('#pagina-erbij-knop')).toBeVisible();
    await expect(page.locator('#pagina-erbij-knop')).toHaveText(/Nog een pagina/);
    const [kiezer] = await Promise.all([page.waitForEvent('filechooser'), page.click('#pagina-erbij-knop')]);
    expect(await kiezer.element().evaluate((el) => el.id)).toBe('camera-input');
    await kiezer.setFiles(foto(2));
    await expect(page.locator('#paginas-lijst li')).toHaveCount(2);
    expect(await page.locator('#paginas-lijst .pagina-nr').allTextContents()).toEqual(['1.', '2.']);
    // Een tweede keer kiezen via het bestandsveld voegt toe, vervangt niet
    await kies(page, foto(3));
    await expect(page.locator('#paginas-lijst li')).toHaveCount(3);
    await expect(page.locator('#bestandsnaam')).toHaveText('brief-1.png, brief-2.png, brief-3.png');
  });

  test('de knop "Nog een pagina" verdwijnt bij vier pagina\'s; "Opnieuw" maakt de keuze leeg', async ({ page }) => {
    await laad(page, MIN);
    await kies(page, [foto(1), foto(2), foto(3), foto(4)]);
    await expect(page.locator('#paginas-lijst li')).toHaveCount(4);
    await expect(page.locator('#pagina-erbij-knop')).toBeHidden();
    await expect(page.locator('#upload-melding')).toBeHidden();
    await page.click('#paginas-wis-knop');
    await expect(page.locator('#paginas-lijst li')).toHaveCount(0);
    await expect(page.locator('#bestand-preview')).not.toHaveClass(/zichtbaar/);
    await expect(page.locator('#analyseer-knop')).toBeDisabled();
  });

  test('een vijfde wordt geweigerd met de melding in de pagina, zonder alert', async ({ page }) => {
    const { dialogen, verzoeken } = await laad(page, MIN);
    await kies(page, [foto(1), foto(2), foto(3), foto(4)]);
    await kies(page, foto(5));
    await expect(page.locator('#upload-melding')).toBeVisible();
    await expect(page.locator('#upload-melding')).toHaveText("Je kunt maximaal 4 foto's kiezen.");
    await expect(page.locator('#upload-melding')).toHaveAttribute('role', 'alert');
    await expect(page.locator('#paginas-lijst li')).toHaveCount(4);
    // Vijf tegelijk: de eerste vier blijven
    await page.click('#paginas-wis-knop');
    await kies(page, [foto(1), foto(2), foto(3), foto(4), foto(5)]);
    await expect(page.locator('#paginas-lijst li')).toHaveCount(4);
    await expect(page.locator('#upload-melding')).toBeVisible();
    // Verstuurd worden er vier
    await page.check('#privacy-checkbox');
    await page.click('#analyseer-knop');
    await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
    expect(verzoeken[0].delen).toBe(4);
    expect(dialogen).toEqual([]);
  });

  test('de melding over te veel pagina\'s staat in de taal van de pagina en wisselt mee', async ({ page }) => {
    await laad(page, MIN, { taal: 'AR' });
    await kies(page, [foto(1), foto(2), foto(3), foto(4), foto(5)]);
    await expect(page.locator('#upload-melding')).toHaveText(await sleutel(page, 'brief-te-veel-paginas', 'ar'));
    await page.click('.taal-item[data-taal="pl"]');
    await expect(page.locator('#upload-melding')).toHaveText(await sleutel(page, 'brief-te-veel-paginas', 'pl'));
  });

  test('een te groot bestand: de vertaalde melding in de pagina, geen alert, geen pagina erbij', async ({ page }) => {
    const { dialogen } = await laad(page, MIN, { taal: 'PL' });
    await kies(page, { name: 'groot.png', mimeType: 'image/png', buffer: Buffer.alloc(10 * 1024 * 1024 + 1) });
    await expect(page.locator('#upload-melding')).toBeVisible();
    await expect(page.locator('#upload-melding')).toHaveText(await sleutel(page, 'brief-fout-te_groot', 'pl'));
    await expect(page.locator('#paginas-lijst li')).toHaveCount(0);
    expect(dialogen).toEqual([]);
    // Een goed bestand daarna haalt de melding weg
    await kies(page, foto(1));
    await expect(page.locator('#upload-melding')).toBeHidden();
  });

  test('een PDF gaat ongewijzigd mee; een PDF vervangt de gekozen foto\'s (en andersom)', async ({ page }) => {
    const { verzoeken } = await laad(page, MIN);
    await kies(page, [foto(1), foto(2)]);
    await expect(page.locator('#paginas-lijst li')).toHaveCount(2);
    await kies(page, PDF);
    await expect(page.locator('#paginas-lijst li')).toHaveCount(1);
    await expect(page.locator('#bestandsnaam')).toHaveText('brief.pdf');
    await expect(page.locator('#pagina-erbij-knop')).toBeHidden();   // bij een PDF geen "Nog een pagina"
    await kies(page, foto(3));
    await expect(page.locator('#bestandsnaam')).toHaveText('brief-3.png');
    await kies(page, PDF);
    await page.check('#privacy-checkbox');
    await page.click('#analyseer-knop');
    await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
    expect(verzoeken[0].delen).toBe(1);
    expect(verzoeken[0].types).toEqual(['application/pdf']);
    expect(verzoeken[0].namen).toEqual(['brief.pdf']);
  });

  test('het budget per afbeelding: min(3 MB, 5,5 MB / aantal)', async ({ page }) => {
    await laad(page, MIN);
    const MB = 1024 * 1024;
    const b = await page.evaluate(() => [1, 2, 3, 4].map((n) => budgetPerAfbeelding(n)));
    expect(b[0]).toBe(3 * MB);
    expect(b[1]).toBe(Math.floor(5.5 * MB / 2));
    expect(b[2]).toBe(Math.floor(5.5 * MB / 3));
    expect(b[3]).toBe(Math.floor(5.5 * MB / 4));
    expect(b.reduce((s, x, i) => s + x * (i + 1), 0)).toBeLessThanOrEqual(10 * 5.5 * MB);   // elk aantal blijft ≤ 5,5 MB samen
  });

  test('een PDF boven wat de server doorlaat (9,5 MB) wordt niet verstuurd: te_groot', async ({ page }) => {
    const { verzoeken } = await laad(page, MIN);
    await kies(page, { name: 'groot.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(Math.round(9.7 * 1024 * 1024)) });
    await page.check('#privacy-checkbox');
    await page.click('#analyseer-knop');
    await expect(page.locator('#fout-bericht')).toHaveText(NL_FOUT.te_groot, { timeout: 20000 });
    expect(verzoeken).toHaveLength(0);
  });

  test('een PDF van 7 MB wordt wel verstuurd (nginx laat sinds W-L 10 MB door)', async ({ page }) => {
    const { verzoeken } = await laad(page, MIN);
    await kies(page, { name: 'zeven.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(7 * 1024 * 1024) });
    await page.check('#privacy-checkbox');
    await page.click('#analyseer-knop');
    await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
    expect(verzoeken).toHaveLength(1);
  });

  test('"Nieuwe brief" ruimt de pagina\'s op', async ({ page }) => {
    await toonAntwoord(page, MIN);
    await page.click('.nieuwe-brief-knop');
    await expect(page.locator('#stap-upload')).toBeVisible();
    await expect(page.locator('#paginas-lijst li')).toHaveCount(0);
    await expect(page.locator('#analyseer-knop')).toBeDisabled();
  });
});

// ── Voorleesstand (PLAN 17) ──────────────────────────────────────────────────────────────────
const gezegd = (page) => page.evaluate(() => window.__spoken.join(' '));
const wis = (page) => page.evaluate(() => { window.Solidari.spraak.stop(); window.__spoken = []; });

test.describe('voorleesstand', () => {
  test('elk blok van het resultaat wordt voorgelezen met een tik', async ({ page }) => {
    await toonAntwoord(page, { ...ALLE, twijfel_code: 'deadline_onzeker' }, { stand: 'aan' });
    await page.waitForTimeout(600);   // knoppen geplaatst
    const blokken = [
      ['.urgentie-tekst', 'Betaal voor 17 november 2026'],
      ['[data-blok=wat] > .rb-kop', 'Wat staat er in deze brief?'],
      ['[data-blok=wat] > .rb-body', 'Dit is een brief van het CJIB'],
      ['[data-blok=doen] > .rb-kop', 'Wat moet je doen?'],
      ['#ap-1', 'Bewaar de brief'],
      ['.rb-deadline', '17 november 2026'],
      ['.rb-citaat > span', 'In de brief staat:'],
      ['.rb-citaat bdi', 'U moet het bedrag vóór 17 november 2026 betalen.'],
      ['[data-blok=niets] > .rb-kop', 'Als je niets doet'],
      ['[data-blok=niets] > .rb-body', 'Dan krijg je een extra boete.'],
      ['[data-blok=bezwaar] > .rb-body', 'Je kunt binnen 6 weken bezwaar maken.'],
      ['[data-blok=contact] > .rb-body', 'Bel 058 123 45 67'],
      ['[data-blok=twijfel] > .rb-kop', 'Niet goed te lezen'],
      ['[data-blok=twijfel] .rb-melding', 'We konden de datum niet goed terugvinden'],
      ['[data-blok=twijfel] .rb-body > div:not(.rb-melding)', 'Het bedrag was moeilijk te lezen.'],
    ];
    for (const [sel, tekst] of blokken) {
      await wis(page);
      // De koppen zijn koppen (h2), de rest tekstblokken: een tik leest het blok, zonder tweede tik
      await page.locator(sel).first().evaluate((el) => el.click());   // een tik; de testbalk bovenaan kan een echte klik onderscheppen
      await expect.poll(() => gezegd(page), { message: sel }).toContain(tekst);
    }
  });

  test('de banner "verlopen" en de melding "afgekapt" worden ook voorgelezen', async ({ page }) => {
    await toonAntwoord(page, { ...MIN, afgekapt: true, urgentie: { niveau: 'verlopen', titel: 'x', tekst: 'y' } }, { stand: 'aan' });
    await page.waitForTimeout(600);
    await wis(page);
    await page.locator('.urgentie-banner.verlopen .urgentie-tekst').click({ position: { x: 8, y: 8 } });
    await expect.poll(() => gezegd(page)).toContain('De datum in de brief is voorbij');
    await wis(page);
    await page.locator('#resultaat-kaarten > .rb-melding').click({ position: { x: 8, y: 8 } });
    await expect.poll(() => gezegd(page)).toContain('Alleen het eerste deel is uitgelegd');
  });

  test('de knop "Nog een pagina" volgt twee tikken: eerst voorlezen, dan pas openen', async ({ page }) => {
    await laad(page, MIN, { stand: 'aan' });
    await kies(page, foto(1));
    await page.waitForTimeout(500);
    await wis(page);
    let n = 0;
    page.on('filechooser', () => { n++; });
    const knop = page.locator('#pagina-erbij-knop');
    await knop.click();
    await expect.poll(() => gezegd(page)).toContain('Nog een pagina');
    await page.waitForTimeout(300);
    expect(n).toBe(0);
    await knop.click();
    await expect.poll(() => n).toBe(1);
  });

  test('de privacytekst en de disclaimer worden voorgelezen, met links erin', async ({ page }) => {
    await toonAntwoord(page, ALLE, { stand: 'aan' });
    await page.waitForTimeout(600);
    await wis(page);
    await page.locator('#brief-disclaimer').click({ position: { x: 8, y: 8 } });
    await expect.poll(() => gezegd(page)).toContain('Neem contact op met het Juridisch Loket, VluchtelingenWerk of je Sociaal Wijkteam');
  });
});

// ── B-11 / B-12: privacytekst, disclaimer en taal ────────────────────────────────────────────
const TALEN = ['NL', 'EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL'];
test.describe('privacytekst en vertalingen', () => {
  test('NL: "zoveel mogelijk", en nergens meer de oude belofte', async ({ page }) => {
    await laad(page, MIN);
    const t = await page.locator('#privacy-tekst').innerText();
    expect(t).toContain('zoveel mogelijk weg');
    expect(t).toContain('lukt niet altijd helemaal');
    expect(t).toContain('Alleen de overgebleven tekst gaat naar de AI-dienst Anthropic (Claude API).');
    expect(t).not.toMatch(/worden .*verwijderd|op onze eigen server verwijderd/);
    expect(await page.locator('#privacy-tekst strong').count()).toBe(0);
    // Ook na wisselen naar een andere taal en terug (de tekst wordt dan opnieuw opgebouwd uit de sleutel)
    await page.click('.taal-item[data-taal="en"]');
    await page.click('.taal-item[data-taal="nl"]');
    expect(await page.locator('#privacy-tekst').innerText()).toBe(t);
  });

  for (const taal of TALEN) {
    test(`${taal}: privacytekst niet leeg, met de Anthropic-link en zonder plaatshouder; disclaimer met twee links`, async ({ page }) => {
      await laad(page, MIN, { taal });
      await page.waitForTimeout(300);
      const p = page.locator('#privacy-tekst');
      const tekst = await p.innerText();
      expect(tekst.length).toBeGreaterThan(80);
      expect(tekst).not.toMatch(/[{}]/);
      expect(tekst).not.toMatch(/undefined|brief-privacy/);
      const link = p.locator('a');
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', 'https://www.anthropic.com/privacy');
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener');
      await expect(link).toHaveText('Anthropic (Claude API)');
      if (taal !== 'NL') expect(tekst).not.toContain('Een brief kan gevoelige informatie');
      const d = page.locator('#brief-disclaimer');
      const dt = await d.innerText();
      expect(dt.length).toBeGreaterThan(40);
      expect(dt).not.toMatch(/[{}]/);
      await expect(d.locator('a')).toHaveCount(2);
      await expect(d.locator('a').nth(0)).toHaveAttribute('href', 'https://www.juridischloket.nl');
      await expect(d.locator('a').nth(1)).toHaveAttribute('href', 'https://www.vluchtelingenwerk.nl');
    });
  }

  test('alle nieuwe sleutels zijn er in alle negen talen en niet gelijk aan de sleutel', async ({ page }) => {
    await laad(page, MIN);
    const sleutels = ['brief-wat-staat-er', 'brief-wat-doen', 'brief-bezwaar', 'brief-contact', 'brief-niets-doen', 'brief-verlopen-titel',
      'brief-verlopen-tekst', 'brief-in-de-brief', 'brief-als-niets', 'brief-twijfel', 'brief-deadline-onzeker', 'brief-afgekapt',
      'brief-pagina-erbij', 'brief-te-veel-paginas', 'brief-bezig', 'brief-fout-titel', ...CODES.map((c) => 'brief-fout-' + c),
      'brief-disclaimer', 'brief-privacy-tekst'];
    const r = await page.evaluate(([s, t]) => t.flatMap((taal) => s.filter((k) => {
      const v = window.Solidari.i18n.t(k, taal);
      return !v || v === k || v.length < 3;
    }).map((k) => taal + ':' + k)), [sleutels, TALEN]);
    expect(r).toEqual([]);
  });

  test('een taalwissel met het resultaat al op het scherm: de vaste titels wisselen, de AI-tekst blijft', async ({ page }) => {
    await toonAntwoord(page, { ...ALLE, twijfel_code: 'deadline_onzeker', afgekapt: true });
    await page.click('.taal-item[data-taal="pl"]');
    await page.waitForTimeout(200);
    for (const [blok, k] of [['wat', 'brief-wat-staat-er'], ['doen', 'brief-wat-doen'], ['niets', 'brief-als-niets'], ['bezwaar', 'brief-bezwaar'], ['contact', 'brief-contact'], ['twijfel', 'brief-twijfel']]) {
      await expect(page.locator(`[data-blok=${blok}] > .rb-kop`)).toContainText(await sleutel(page, k, 'pl'));
    }
    await expect(page.locator('.rb-citaat')).toContainText(await sleutel(page, 'brief-in-de-brief', 'pl'));
    expect(await schoon(page.locator('.rb-melding').first())).toBe(await sleutel(page, 'brief-afgekapt', 'pl'));
    await expect(page.locator('[data-blok=wat] .rb-body')).toContainText('CJIB');   // de uitleg zelf blijft zoals hij was
    await expect(page.locator('#privacy-tekst')).toContainText('Anthropic (Claude API)');
    // En naar het Arabisch: de pagina wordt rtl, het citaat blijft Nederlands
    await page.click('.taal-item[data-taal="ar"]');
    expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
    await expect(page.locator('.rb-citaat bdi[lang="nl"]')).toContainText('U moet het bedrag');
  });

  test('de taal van het verzoek is de taal van de pagina bij het versturen (kleine letters)', async ({ page }) => {
    const { verzoeken } = await laad(page, MIN);
    await page.click('.taal-item[data-taal="uk"]');
    await analyseer(page);
    await expect(page.locator('#stap-resultaat')).toBeVisible({ timeout: 20000 });
    expect(verzoeken[0].taal).toBe('uk');
  });
});

// ── over.html ────────────────────────────────────────────────────────────────────────────────
test.describe('over.html: wat er weggehaald wordt', () => {
  test('geen belofte meer dat alles weg is; de twee nieuwe alinea\'s staan bij "Waar je gegevens langskomen"', async ({ page }) => {
    await metTaal(page, 'NL');
    await page.goto('over.html');
    const t = await page.locator('body').innerText();
    expect(t).not.toMatch(/geanonimiseerd/i);
    expect(t).not.toContain('gaan nooit naar de AI');
    expect(t).toContain('Naam, adres, BSN en rekeningnummer halen we op onze eigen server zoveel mogelijk weg. Dat gaat automatisch en lukt niet altijd helemaal. Alleen de overgebleven tekst wordt naar de Claude API gestuurd.');
    expect(t).toContain('Brief Begrijper — persoonsgegevens weggehaald');
    const kaart = page.locator('.privacy-kaart').filter({ has: page.locator('.privacy-kaart-titel', { hasText: 'Waar je gegevens langskomen' }) });
    await expect(kaart).toContainText('De overgebleven tekst wordt verwerkt door Anthropic');
    await expect(kaart).toContainText('Vragen aan Rechten & Plichten, Budgethulp en Goed Voorbereid lopen via Cloudflare naar de AI-dienst. Cloudflare bewaart de vragen niet.');
    await expect(kaart).toContainText('Om misbruik te voorkomen tellen we het aantal vragen per dag. Daarvoor bewaren we een code die van je IP-adres is afgeleid. Het IP-adres zelf bewaren we niet. De code is elke dag anders en wordt na twee dagen gewist.');
  });
});

// Staging praat tot de uitrol met de oude backend: die kent v=2 niet en stuurt het oude formaat terug.
test.describe('antwoord dat de pagina niet kent', () => {
  for (const [naam, antwoord] of [
    ['het oude formaat (secties en actiepunten)', { urgentie: { niveau: 'hoog', titel: 't', tekst: 't' }, secties: [{ icoon: '📋', titel: 'Wat staat er?', achtergrond: '#EBF3EE', inhoud: '<p>x</p>' }], actiepunten: ['Bel'] }],
    ['een leeg object', {}],
    ['zonder actielijst', { urgentie: { niveau: 'laag', titel: 't', tekst: 't' }, wat_staat_er: 'Uitleg.' }],
  ]) {
    test(`${naam}: foutmelding, en nooit "Je hoeft niets te doen"`, async ({ page }) => {
      await page.addInitScript(() => { try { localStorage.setItem('solidari-taal', 'NL'); localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {} });
      await page.route('**/api/analyseer', (r) => r.fulfill({
        status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(antwoord),
      }));
      await page.goto('brief.html');
      await page.setInputFiles('#bestand-input', { name: 'brief.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64') });
      await page.check('#privacy-checkbox');
      await page.click('#analyseer-knop');
      await expect(page.locator('#stap-fout')).toBeVisible({ timeout: 20000 });
      await expect(page.locator('#fout-bericht')).toHaveText('De tool is nu niet bereikbaar. Probeer het over een paar minuten opnieuw.');
      await expect(page.locator('#stap-resultaat')).toBeHidden();
    });
  }
});
