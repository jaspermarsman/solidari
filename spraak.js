/**
 * Solidari — spraak.js (v2)
 * Gelaagde voorlees- en spraakinvoermotor. Eén gedeeld component, geen kopieën.
 *
 * Lagen bij voorlezen (per taal gekozen volgens D-19):
 *   1. voorgegenereerd audiobestand  audio/<TAAL>/<hash>.mp3  (via manifest)
 *   2. browser speechSynthesis
 *   3. externe route (registreerRoute) — bv. Worker-TTS voor dynamische tekst
 *
 * Talen in GEEN_SPRAAK slaan alle drie de lagen over: geen knop, geen geluid, geen fout
 * (besluit S-7, 17-09-2026 — Tigrinya).
 *
 * Insluiten ná i18n.js, vóór components.js:
 *   <script src="i18n.js"></script>
 *   <script src="spraak.js"></script>
 *   <script src="components.js"></script>
 */
(function () {
  'use strict';
  window.Solidari = window.Solidari || {};
  if (window.Solidari.spraak) return; // idempotent

  // ── Taalcodes en stemketen (§4.4) ──────────────────────────────────────
  const STEMKETEN = {
    NL: ['nl-NL', 'nl'],
    EN: ['en-GB', 'en-US', 'en'],
    AR: ['ar-SA', 'ar-EG', 'ar'],
    TR: ['tr-TR', 'tr'],
    TI: ['ti-ET', 'ti-ER'],          // alleen nog voor spraak-ín (zie GEEN_SPRAAK)
    UK: ['uk-UA', 'uk'],             // NOOIT ru
    FA: ['fa-IR', 'fa-AF', 'fa'],
    RO: ['ro-RO', 'ro'],
    PL: ['pl-PL', 'pl'],
  };
  // Talen die altijd bestand-eerst spelen, ongeacht manifestbron (D-19).
  const BESTAND_EERST = { FA: true };

  // ── Talen zonder voorlezen (besluit S-7, 17-09-2026) ───────────────────
  // Tigrinya krijgt geen voorleesknop meer. Een moedertaalspreker beoordeelde de
  // eSpeak-stem (W-B) en het antwoord was nee — dat oordeel geldt voor alle drie de
  // lagen, want ze klonken alle drie hetzelfde: de voorgegenereerde clips kwamen uit
  // eSpeak, /api/tts draait eSpeak, en de "browserstem" voor ti- op Linux is óók
  // eSpeak via speech-dispatcher. Daarom staat de taal hier hard uit in plaats van
  // dat we op een lege laag vertrouwen.
  //
  // Dit gaat alleen over voorlezen. Tekst, vertaling, RTL en spraakinvoer blijven
  // ongemoeid, en het verdwijnen gebeurt stil: geen dode knop en geen foutmelding
  // (principe 6). Komt er ooit een stem die wél deugt, dan is deze regel de knop om
  // hem weer aan te zetten — zie BACKLOG-tigrinya-stem.md.
  const GEEN_SPRAAK = { TI: true };
  function geenSpraak(taal) {
    return !!GEEN_SPRAAK[String(taal || '').toUpperCase()];
  }

  // ── Interne staat ──────────────────────────────────────────────────────
  const manifestCache = {};   // taal → manifest-object | null
  const manifestBezig = {};   // taal → Promise
  let audioEl = null;
  let externeRoute = null;   // uitvoer: tekst → audio (bv. /api/tts)
  let routeTalen = null;     // null = alle talen; anders alleen deze
  let invoerRoute = null;    // invoer: audio → tekst (bv. /api/stt) — nog niet in gebruik
  let bezigVlag = false;
  let gestopt = false;
  let heartbeat = null;
  let audioToken = 0;   // invalideert callbacks van onderbroken bestand-afspelen

  // ── Hulpjes ────────────────────────────────────────────────────────────
  function t(sleutel, terugval) {
    try { if (window.Solidari.i18n && Solidari.i18n.t) return Solidari.i18n.t(sleutel); } catch (e) {}
    return terugval;
  }
  function actieveTaal() {
    try { const v = localStorage.getItem('solidari-taal'); if (v) return v.toUpperCase(); } catch (e) {}
    const l = (document.documentElement.lang || '').slice(0, 2).toUpperCase();
    return STEMKETEN[l] ? l : 'NL';
  }
  // Mobiel (Android/iOS): andere spraakmotor, andere eigenaardigheden (zie heartbeat en ontgrendel).
  const MOBIEL = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);   // iPadOS doet zich voor als Mac
  const ANDROID = /Android/i.test(navigator.userAgent || '');
  // Android en sommige mobiele browsers melden 'nl_NL' (underscore) of 'NL-nl'; vergelijk genormaliseerd.
  function langNorm(l) { return String(l || '').replace(/_/g, '-').toLowerCase(); }
  function primaireBcp(taal) { return (STEMKETEN[taal] || ['nl'])[0]; }
  function normaliseer(tekst) {
    return String(tekst == null ? '' : tekst).normalize('NFC').replace(/\s+/g, ' ').trim();
  }
  async function hashVan(genormaliseerd) {
    const data = new TextEncoder().encode(genormaliseerd);
    const buf = await crypto.subtle.digest('SHA-1', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
  }
  function audio() {
    if (!audioEl) { audioEl = new Audio(); audioEl.preload = 'none'; }
    return audioEl;
  }

  // ── Manifest (laag 1) ──────────────────────────────────────────────────
  function ensureManifest(taal) {
    if (taal in manifestCache) return Promise.resolve(manifestCache[taal]);
    if (manifestBezig[taal]) return manifestBezig[taal];
    manifestBezig[taal] = fetch('audio/manifest-' + taal.toLowerCase() + '.json')
      .then(r => (r.ok ? r.json() : null))
      .catch(() => null)
      .then(m => { manifestCache[taal] = m || null; return manifestCache[taal]; });
    return manifestBezig[taal];
  }
  function manifest(taal) { return manifestCache[taal] || null; }
  function heeftBestand(taal, hash) {
    const m = manifestCache[taal];
    return !!(m && m.items && Object.prototype.hasOwnProperty.call(m.items, hash));
  }
  function heeftBestanden(taal) {
    const m = manifestCache[taal];
    return !!(m && m.items && Object.keys(m.items).length > 0);
  }

  // ── Stemkeuze (laag 2) ─────────────────────────────────────────────────
  function stemmen() {
    try { return (window.speechSynthesis && speechSynthesis.getVoices()) || []; } catch (e) { return []; }
  }
  function stemVoor(taal) {
    const voices = stemmen();
    const keten = STEMKETEN[taal] || [];
    for (const code of keten) {
      const treffers = voices.filter(v => v.lang && langNorm(v.lang) === code.toLowerCase());
      if (treffers.length) return treffers.find(v => v.localService) || treffers[0];
    }
    const prim = (keten[0] || '').split('-')[0].toLowerCase();
    if (prim) {
      const treffers = voices.filter(v => v.lang && langNorm(v.lang).split('-')[0] === prim);
      if (treffers.length) return treffers.find(v => v.localService) || treffers[0];
    }
    return null;
  }

  // ── Laagkeuze (D-19) ───────────────────────────────────────────────────
  function kiesLaag(taal, hash) {
    if (geenSpraak(taal)) return null;      // besluit S-7: geen laag, dus geen knop
    const m = manifestCache[taal];
    const bestandBeschikbaar = heeftBestand(taal, hash);
    const bestandEerst = !!BESTAND_EERST[taal] || (m && m.bron === 'gemini');
    if (bestandBeschikbaar && bestandEerst) return 'bestand';
    if (stemVoor(taal)) return 'stem';
    if (bestandBeschikbaar) return 'bestand';
    if (externeRoute && routeKan(taal)) return 'route';
    return null;
  }
  // Testhaak: welke laag zou gekozen worden voor deze tekst/taal?
  async function _kiesLaag(tekst, taal) {
    taal = taal || actieveTaal();
    await ensureManifest(taal);
    return kiesLaag(taal, await hashVan(normaliseer(tekst)));
  }

  // ── Zinnen splitsen ────────────────────────────────────────────────────
  function splitsZinnen(tekst) {
    const ruw = normaliseer(tekst);
    if (!ruw) return [];
    const stukken = ruw.split(/(?<=[.!?؟።])\s+|\n+/).map(s => s.trim()).filter(Boolean);
    const uit = [];
    for (let s of stukken) {
      while (s.length > 200) {
        let knip = s.lastIndexOf(' ', 200);
        if (knip <= 0) knip = 200;
        uit.push(s.slice(0, knip).trim());
        s = s.slice(knip).trim();
      }
      if (s) uit.push(s);
    }
    return uit;
  }

  // ── Heartbeat tegen Chrome-afkapbug ────────────────────────────────────
  // Alleen desktop-Chrome heeft de afkapbug. Op Android is pause() in de praktijk een
  // cancel(): de heartbeat brak daar elke voorlezing na 10 s af zonder onend.
  function startHeartbeat() {
    stopHeartbeat();
    if (MOBIEL) return;
    heartbeat = setInterval(() => {
      try { if (window.speechSynthesis && speechSynthesis.speaking) { speechSynthesis.pause(); speechSynthesis.resume(); } } catch (e) {}
    }, 10000);
  }
  function stopHeartbeat() { if (heartbeat) { clearInterval(heartbeat); heartbeat = null; } }

  // ── Afspelen ───────────────────────────────────────────────────────────
  function bezig() {
    try {
      if (bezigVlag) return true;
      if (window.speechSynthesis && speechSynthesis.speaking) return true;
      if (audioEl && !audioEl.paused && !audioEl.ended) return true;
    } catch (e) {}
    return false;
  }
  // stopRaw breekt alleen het gesproken geluid af; stop() breekt ook een lopende reeks af.
  function stopRaw() {
    gestopt = true;
    audioToken++;                 // lopende bestand-callbacks worden ongeldig
    stopHeartbeat();
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
    try {
      if (audioEl) {
        audioEl.onended = null; audioEl.onerror = null;
        audioEl.pause();   // alleen pauzeren; src NIET verwijderen (dat aborteert een load)
      }
    } catch (e) {}
    bezigVlag = false;
  }
  function stop() { reeksStop(); stopRaw(); }

  function speelBestand(tekst, taal, hash, opties) {
    const el = audio();
    const mij = ++audioToken;
    el.muted = false;
    el.src = 'audio/' + taal + '/' + hash + '.mp3';
    bezigVlag = true;
    if (opties.opStart) opties.opStart();
    el.onended = () => { if (mij !== audioToken) return; bezigVlag = false; if (opties.opEinde) opties.opEinde(); };
    el.onerror = () => {
      if (mij !== audioToken) return;
      bezigVlag = false;
      if (!gestopt && stemVoor(taal)) { speelStem(tekst, taal, opties); }
      else { fout(opties); }
    };
    // Onderbroken door stop()/nieuwe zeg of geblokkeerde autoplay → stil negeren.
    Promise.resolve(el.play && el.play()).catch((err) => {
      if (mij !== audioToken || (err && err.name === 'AbortError')) return;
      if (el.onerror) el.onerror();
    });
  }

  function speelStem(tekst, taal, opties) {
    const zinnen = splitsZinnen(tekst);
    if (!zinnen.length) { if (opties.opEinde) opties.opEinde(); return; }
    const voice = stemVoor(taal);
    let i = 0;
    gestopt = false;
    bezigVlag = true;
    if (opties.opStart) opties.opStart();
    startHeartbeat();
    function volgende() {
      if (gestopt) { return; }
      if (i >= zinnen.length) { stopHeartbeat(); bezigVlag = false; if (opties.opEinde) opties.opEinde(); return; }
      const u = new SpeechSynthesisUtterance(zinnen[i++]);
      if (voice) u.voice = voice;
      u.lang = (voice && voice.lang) || primaireBcp(taal);
      u.rate = 0.9; u.pitch = 1;
      u.onend = volgende;
      u.onerror = () => { stopHeartbeat(); bezigVlag = false; fout(opties); };
      try { speechSynthesis.speak(u); } catch (e) { u.onerror(); }
    }
    // Android-Chrome gooit een speak() die vlak na cancel() komt stilletjes weg.
    if (ANDROID) setTimeout(volgende, 60); else volgende();
  }

  function speelRoute(tekst, taal, opties) {
    bezigVlag = true;
    if (opties.opStart) opties.opStart();
    Promise.resolve(externeRoute(tekst, taal)).then(url => {
      if (gestopt || !url) throw new Error('geen route-audio');
      const el = audio(); el.muted = false; el.src = url;
      el.onended = () => { bezigVlag = false; if (opties.opEinde) opties.opEinde(); };
      el.onerror = () => { bezigVlag = false; fout(opties); };
      return el.play && el.play();
    }).catch(() => { bezigVlag = false; fout(opties); });
  }

  function fout(opties) {
    try { navigator.vibrate && navigator.vibrate(80); } catch (e) {}
    if (opties && opties.opFout) opties.opFout();
  }

  // zeg() breekt altijd af, ook een lopende reeks. zegRaw() doet alleen het spreken zelf
  // (de reeks gebruikt die, anders zou elk stuk zijn eigen reeks afbreken).
  function zeg(tekst, opties) { reeksStop(); return zegRaw(tekst, opties); }
  async function zegRaw(tekst, opties) {
    opties = opties || {};
    const taal = (opties.taal || actieveTaal());
    // Stil terug, zonder fout(): er hoort voor deze taal geen knop te staan, en wie
    // hier tóch komt (luistermodus, gesproken taalbevestiging) mag geen trilling of
    // foutmelding krijgen voor iets wat we bewust niet aanbieden.
    if (geenSpraak(taal)) return;
    stopRaw();
    gestopt = false;
    const genorm = normaliseer(tekst);
    if (!genorm) return;
    await ensureManifest(taal);
    let hash = '';
    try { hash = await hashVan(genorm); } catch (e) { hash = ''; }
    if (gestopt) return;
    const laag = kiesLaag(taal, hash);
    if (!laag) { fout(opties); return; }
    if (laag === 'bestand') return speelBestand(tekst, taal, hash, opties);
    if (laag === 'stem') return speelStem(tekst, taal, opties);
    if (laag === 'route') return speelRoute(tekst, taal, opties);
  }

  // ── Reeks: meerdere stukken achter elkaar (PLAN-5 fase 2, B-2) ─────────
  // zegReeks(items, {taal, pauze, opStart(item, i), opEinde}) leest de stukken na elkaar voor.
  // Een item is een string of {tekst, el}; `el` licht op (.sol-a11y-keuze-opgenoemd) zolang zijn
  // tekst klinkt. Er loopt maximaal één reeks. Hij stopt bij stop(), bij een nieuwe zeg()/zegReeks(),
  // bij elke aanraking (pointerdown/touchstart/keydown), bij een taalwissel en als de spraak faalt.
  // Retourneert {stop(), voegToe(items), actief}; voegToe() geeft false als de reeks klaar/gestopt is.
  let reeks = null;
  function reeksItems(items) {
    return (items || []).map(i => (typeof i === 'string' ? { tekst: i, el: null } : i))
      .filter(i => i && normaliseer(i.tekst));
  }
  function reeksLichtUit(r) {
    if (r.licht) { r.licht.classList.remove('sol-a11y-keuze-opgenoemd'); r.licht = null; }
  }
  function reeksAanraking() { stop(); }
  function reeksOpruim(r) {
    clearTimeout(r.timer); r.timer = null;
    reeksLichtUit(r);
    document.removeEventListener('pointerdown', reeksAanraking, true);
    document.removeEventListener('touchstart', reeksAanraking, true);
    document.removeEventListener('keydown', reeksAanraking, true);
  }
  function reeksStop() {
    const r = reeks;
    if (!r) return;
    reeks = null; r.gestopt = true;
    reeksOpruim(r);
  }
  function reeksKlaar(r) {
    if (reeks !== r) return;
    reeks = null; r.klaar = true;
    reeksOpruim(r);
    if (r.opties.opEinde) { try { r.opties.opEinde(); } catch (e) {} }
  }
  function reeksVolgende(r) {
    if (reeks !== r) return;
    if (r.i >= r.wachtrij.length) { reeksKlaar(r); return; }
    if (actieveTaal() !== r.taal) { reeksStop(); return; }   // taalwissel
    reeksLichtUit(r);
    const item = r.wachtrij[r.i], idx = r.i++;
    let gestart = false, klaar = false;
    const verder = () => {
      if (klaar || reeks !== r) return;
      klaar = true;
      r.timer = setTimeout(() => reeksVolgende(r), r.pauze);
    };
    zegRaw(item.tekst, {
      taal: r.taal,
      opStart: () => {
        if (gestart || reeks !== r) return;
        gestart = true;
        if (item.el) { item.el.classList.add('sol-a11y-keuze-opgenoemd'); r.licht = item.el; }
        if (r.opties.opStart) { try { r.opties.opStart(item, idx); } catch (e) {} }
      },
      opEinde: verder,
      opFout: () => { if (reeks === r) reeksStop(); },   // spraak geblokkeerd/mislukt: niet doorpraten
    });
  }
  function zegReeks(items, opties) {
    opties = opties || {};
    reeksStop();
    const taal = opties.taal || actieveTaal();
    const r = { taal, opties, wachtrij: reeksItems(items), i: 0, licht: null, timer: null, gestopt: false, klaar: false,
      pauze: typeof opties.pauze === 'number' ? opties.pauze : 300 };
    const handle = {
      stop() { if (reeks === r) stop(); },
      voegToe(nieuw) {
        if (reeks !== r) return false;
        r.wachtrij.push(...reeksItems(nieuw));
        return true;
      },
      get actief() { return reeks === r; },
    };
    if (geenSpraak(taal) || !r.wachtrij.length) { r.klaar = true; return handle; }
    reeks = r;
    document.addEventListener('pointerdown', reeksAanraking, true);
    document.addEventListener('touchstart', reeksAanraking, true);
    document.addEventListener('keydown', reeksAanraking, true);
    reeksVolgende(r);
    return handle;
  }

  function beschikbaar(taal) {
    taal = taal || actieveTaal();
    if (geenSpraak(taal)) return false;
    return !!stemVoor(taal) || heeftBestanden(taal) || routeKan(taal);
  }

  function ontgrendel() {
    // iOS negeert een lege utterance; een spatie op volume 0 ontgrendelt wel. Niet meteen
    // cancel() erachteraan: dat breekt op iOS het ontgrendelen en op Android de volgende speak().
    try {
      if (window.speechSynthesis && !speechSynthesis.speaking) {
        const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u);
      }
    } catch (e) {}
    try {
      const el = audio(); el.muted = true;
      const p = el.play && el.play();
      if (p && p.then) p.then(() => { el.pause(); el.muted = false; }).catch(() => { el.muted = false; });
    } catch (e) {}
  }

  // ── Knop en scan ───────────────────────────────────────────────────────
  function knop(tekst, taal) {
    taal = taal || actieveTaal();
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sol-a11y-knop';
    b.setAttribute('aria-label', t('a11y-luister', 'Luister'));
    // PLAN-5 B-3: de 🔊-knop is er voor wie niet leest. Een schermlezer leest de tekst zelf al
    // voor; voor hem is "Luister, knop" na elke alinea ruis. Dus verborgen voor de schermlezer en
    // uit de tabvolgorde. Tikken/klikken werkt gewoon (de voorleesschakelaar in de nav blijft wél
    // bereikbaar voor toetsenbord en schermlezer).
    b.setAttribute('aria-hidden', 'true');
    b.tabIndex = -1;
    b.innerHTML = '<span aria-hidden="true">🔊</span>';
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      if (b.classList.contains('sol-a11y-leest')) { stop(); b.classList.remove('sol-a11y-leest'); return; }
      document.querySelectorAll('.sol-a11y-knop.sol-a11y-leest').forEach(k => k.classList.remove('sol-a11y-leest'));
      zeg(tekst, {
        taal,
        opStart: () => b.classList.add('sol-a11y-leest'),
        opEinde: () => b.classList.remove('sol-a11y-leest'),
        opFout: () => b.classList.remove('sol-a11y-leest'),
      });
    });
    return b;
  }

  // Per-element beschikbaarheid: kan JUIST deze tekst geleverd worden?
  // (principe 6: geen knop = geen kapotte staat, i.p.v. een dode knop.)
  async function kanLeveren(tekst, taal) {
    if (geenSpraak(taal)) return false;
    await ensureManifest(taal);
    const hash = await hashVan(normaliseer(tekst));
    return heeftBestand(taal, hash) || !!stemVoor(taal) || routeKan(taal);
  }

  // scan() is async: tussen de controle op solA11yKlaar en het toevoegen van de knop
  // zit een await. Twee scans die elkaar overlappen — init() doet er een, en het
  // voiceschanged-event doet er direct daarna nog een zodra de browserstemmen laden —
  // kwamen dan allebei door de controle heen en zetten allebei een knop neer.
  // Vandaar drie sloten: de scans staan in de rij, een element wordt vóór de eerste
  // await geclaimd, en er komt sowieso geen tweede knop bij een element dat er al een heeft.
  let scanKetting = Promise.resolve();

  function scan(root) {
    scanKetting = scanKetting.then(() => scanEen(root)).catch(() => {});
    return scanKetting;
  }

  async function scanEen(root) {
    root = root || document;
    const els = [...root.querySelectorAll('[data-lees]')];
    if (!els.length) return;
    const talen = new Set(els.map(el => (el.getAttribute('data-lees-taal') || actieveTaal()).toUpperCase()));
    await Promise.all([...talen].map(ensureManifest));
    for (const el of els) {
      const taal = (el.getAttribute('data-lees-taal') || actieveTaal()).toUpperCase();
      // Twee dingen maken een eerder oordeel ongeldig bij een taalwissel:
      //   1. de inhoud is vervangen (i18n.passToe zet innerHTML, brief.html zet textContent)
      //      en heeft de knop meegenomen, terwijl de vlag op '1' bleef staan;
      //   2. 'leeg' betekende "voor díé taal is er niets" — Tigrinya heeft geen browserstem,
      //      dus daar valt het oordeel anders uit dan voor Nederlands. Wie van TI terugging
      //      naar NL hield het oude 'leeg' en kreeg zijn knop pas na een harde herlaad terug.
      if (el.dataset.solA11yKlaar === '1' && !el.querySelector(':scope > .sol-a11y-knop')) {
        delete el.dataset.solA11yKlaar;
      }
      if (el.dataset.solA11yKlaar && el.dataset.solA11yTaal && el.dataset.solA11yTaal !== taal) {
        delete el.dataset.solA11yKlaar;
      }
      if (el.dataset.solA11yKlaar) continue;
      const bestaande = el.querySelector(':scope > .sol-a11y-knop');
      if (bestaande) {
        // Staat er al een knop voor déze taal, dan is het oordeel al geveld — klaar.
        if (el.dataset.solA11yTaal === taal) { el.dataset.solA11yKlaar = '1'; continue; }
        // Anders is er van taal gewisseld zonder dat de inhoud verving (de knop
        // overleefde dus), en moet het oordeel opnieuw. Zonder dit bleven bij een wissel
        // naar een taal zonder voorlezen (Tigrinya, S-7) alle knoppen staan — precies de
        // dode knop die principe 6 verbiedt. Weg ermee; hieronder komt er alleen een
        // nieuwe voor terug als die taal wél geleverd kan worden.
        if (bestaande.classList.contains('sol-a11y-leest')) stop();
        bestaande.remove();
      }
      const tekst = el.getAttribute('data-lees') || el.textContent;
      if (!normaliseer(tekst)) continue;
      // Claim het element vóór de await, anders glipt een gelijktijdige scan erlangs.
      el.dataset.solA11yKlaar = 'bezig';
      el.dataset.solA11yTaal = taal;
      let leverbaar = false;
      try {
        leverbaar = await kanLeveren(tekst, taal);
      } catch (e) {
        delete el.dataset.solA11yKlaar;   // mislukt: laat een volgende scan het opnieuw proberen
        continue;
      }
      if (!leverbaar) { el.dataset.solA11yKlaar = 'leeg'; el.dataset.solA11yTaal = taal; continue; }
      if (!el.querySelector(':scope > .sol-a11y-knop')) el.appendChild(knop(tekst, taal));
      el.dataset.solA11yKlaar = '1';
      el.dataset.solA11yTaal = taal;
    }
  }

  // ── Auto-markering: zet data-lees op inhoudsblokken ────────────────────
  const BLOK_SEL = 'p, h1, h2, h3, h4, li, blockquote, dt, dd, figcaption, .regel-zeg, .regel-intro, .regel-eigen, .regel-na, .bel-sol';
  const UITSLUIT_SEL = 'nav, footer, #solidari-nav, #solidari-footer, script, style, button, a, select, textarea, input, label, [data-lees], [data-geen-lees], [contenteditable="true"], .sol-a11y-knop, #sol-env-balk';
  function autoMarkeer(root) {
    root = root || document;
    root.querySelectorAll(BLOK_SEL).forEach(el => {
      if (el.closest(UITSLUIT_SEL)) return;
      // alleen bladeren: geen container die zelf blokken bevat (voorkomt dubbel lezen)
      if (el.querySelector(BLOK_SEL)) return;
      const txt = normaliseer(el.textContent);
      // Chatbubbels (.bel-sol) en zeg-zinnen zijn altijd voorleesbaar, ook kort:
      // in een chat is elke vraag/knop-uitleg betekenisvol voor een niet-lezer.
      const altijdLezen = el.classList.contains('regel-zeg') || el.classList.contains('bel-sol');
      if (txt.length <= 40 && !altijdLezen) return;
      // de zeg-zinnen zijn Nederlands (D-07)
      if (el.classList.contains('regel-zeg')) el.setAttribute('data-lees-taal', 'NL');
      el.setAttribute('data-lees', '');
    });
  }

  // ── Spraakinvoer: microfoonknop bij tekstvelden ───────────────────────
  function heeftHerkenning() { return !!(window.SpeechRecognition || window.webkitSpeechRecognition); }

  function micKnop(input, opties) {
    opties = opties || {};
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sol-a11y-mic';
    b.setAttribute('aria-label', t('a11y-spreek', 'Spreek in plaats van typen'));
    b.innerHTML = '<span aria-hidden="true">🎤</span>';
    let herkenner = null;
    function stopLuisteren() {
      if (herkenner) { try { herkenner.stop(); } catch (e) {} herkenner = null; }
      b.classList.remove('sol-a11y-mic-luistert');
    }
    b.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (herkenner) { stopLuisteren(); return; }
      const taal = opties.taal || (input.getAttribute('lang') || '').toUpperCase() || actieveTaal();
      b.classList.add('sol-a11y-mic-luistert');
      if (input.type === 'number') {
        // Bedragveld: tussentijdse tekst niet in het veld zetten (een getalveld slikt geen woorden);
        // pas aan het eind omzetten. Geen getal → veld ongemoeid + melding. Niet vanzelf versturen.
        let fout = null, klaar = false;
        wisMelding(input);
        herkenner = luister({
          taal,
          opTekst: () => {},
          opEinde: (laatste) => {
            if (klaar) return; klaar = true;
            const handmatig = !herkenner;
            stopLuisteren();
            if (fout && fout !== 'no-speech') return;          // geen toegang e.d.: geen bedragmelding
            if (handmatig && !String(laatste || '').trim()) return;   // zelf gestopt zonder iets te zeggen
            bedragUitSpraak(input, laatste, taal);
          },
          opFout: (f) => { fout = f; if (f === 'start-mislukt' || f === 'geen-herkenning') klaar = true; },
        });
        if (!herkenner || klaar) stopLuisteren();
        return;
      }
      herkenner = luister({
        taal,
        opTekst: (tekst) => { input.value = tekst; input.dispatchEvent(new Event('input', { bubbles: true })); },
        opEinde: () => { stopLuisteren(); input.dispatchEvent(new Event('change', { bubbles: true })); },
        opFout: () => stopLuisteren(),
      });
      if (!herkenner) stopLuisteren();
    });
    return b;
  }

  // ── Bedragen inspreken (PLAN-5 fase 5, I-6) ────────────────────────────
  // tekstNaarGetal: herkende tekst → getal, of null als er niet precies één getal in staat.
  // Nooit gokken: twee getallen ("500 of 600"), een onbekende woordvolgorde ("vijf vijf") of
  // een dubbelzinnig cijferformaat ("1250,500") geven null. Negatief blijft negatief; de
  // aanroeper beslist of dat mag. De browserherkenning geeft meestal al cijfers; voor NL en
  // EN is er een woordenlijst als terugval, voor de andere talen alleen cijfers (ook
  // Arabisch-Indische ٠-٩ en Perzische ۰-۹).
  const GETAL_WOORDEN = {
    NL: {
      klein: {
        nul: 0, een: 1, twee: 2, drie: 3, vier: 4, vijf: 5, zes: 6, zeven: 7, acht: 8, negen: 9,
        tien: 10, elf: 11, twaalf: 12, dertien: 13, veertien: 14, vijftien: 15, zestien: 16,
        zeventien: 17, achttien: 18, negentien: 19, twintig: 20, dertig: 30, veertig: 40,
        vijftig: 50, zestig: 60, zeventig: 70, tachtig: 80, negentig: 90,
      },
      groot: { honderd: 100, duizend: 1000, miljoen: 1000000 },
      en: 'en', lidwoord: ['een'], valuta: ['euro', 'euros', 'eur'], cent: ['cent', 'centen'],
      min: ['min', 'minus', 'negatief'],
    },
    EN: {
      klein: {
        zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
        ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
        seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
        sixty: 60, seventy: 70, eighty: 80, ninety: 90,
      },
      groot: { hundred: 100, thousand: 1000, million: 1000000 },
      en: 'and', lidwoord: ['a', 'an'], valuta: ['euro', 'euros', 'eur'], cent: ['cent', 'cents'],
      min: ['minus', 'negative'],
    },
  };
  // Talen die duizendtallen met een spatie schrijven ("1 250").
  const SPATIE_GROEP = { PL: true, UK: true, RO: true, FA: true };
  const VALUTA_ALLE = ['euro', 'euros', 'eur', 'евро', 'євро', 'یورو', 'يورو', 'avro', 'ዩሮ'];

  // Een woord ontleden in getaldelen ("tweeëndertig" → twee, en, dertig). Terugzoekend, dus
  // "achttien" wordt niet "acht"+"tien" als dat niet past. null = geen getalwoord.
  function ontleedWoord(w, lex) {
    const delen = Object.keys(lex.klein).concat(Object.keys(lex.groot), lex.en === 'en' ? ['en'] : [])
      .sort((a, b) => b.length - a.length);
    function stap(rest) {
      if (!rest) return [];
      for (const d of delen) {
        if (rest.startsWith(d)) { const na = stap(rest.slice(d.length)); if (na) return [d].concat(na); }
      }
      return null;
    }
    const r = stap(w);
    // "en" alleen of voorop/achteraan in één woord is geen getal
    if (!r || !r.length || (r.length > 1 && (r[0] === lex.en || r[r.length - 1] === lex.en))) return null;
    return r;
  }

  // Cijfers met scheidingstekens → getal (NaN = dubbelzinnig).
  function cijfersNaarGetal(s) {
    s = s.replace(/[\u00a0\u202f\u066c' ]/g, '');
    if (s.indexOf('\u066b') !== -1) {   // Arabisch decimaalteken is ondubbelzinnig
      const [a, b] = s.split('\u066b');
      return parseFloat(a.replace(/[.,]/g, '') + '.' + String(b || '0').replace(/\D/g, ''));
    }
    const punt = (s.match(/\./g) || []).length, komma = (s.match(/,/g) || []).length;
    if (punt && komma) {
      const dec = s.lastIndexOf('.') > s.lastIndexOf(',') ? '.' : ',';
      const duiz = dec === '.' ? ',' : '.';
      const [heel, frac] = [s.slice(0, s.lastIndexOf(dec)), s.slice(s.lastIndexOf(dec) + 1)];
      if (heel.indexOf(dec) !== -1 || !/^\d{1,3}(\.\d{3}|,\d{3})*$/.test(heel) || frac.indexOf(duiz) !== -1) return NaN;
      return parseFloat(heel.split(duiz).join('') + '.' + frac);
    }
    if (!punt && !komma) return parseFloat(s);
    const sep = punt ? '.' : ',';
    const delen = s.split(sep);
    if (delen.length > 2) {
      return delen.slice(1).every((d) => d.length === 3) && delen[0].length <= 3 ? parseFloat(delen.join('')) : NaN;
    }
    const [voor, na] = delen;
    if (na.length === 3) {
      // "1.250" / "1,250" = duizendtal; "0,500" = decimaal; "1250,500" = dubbelzinnig
      if (voor === '0') return parseFloat('0.' + na);
      return voor.length <= 3 ? parseFloat(voor + na) : NaN;
    }
    return parseFloat(voor + '.' + na);
  }

  // Een reeks getaldelen uitrekenen. NaN bij een volgorde die geen getal is.
  function rekenReeks(reeks, taal) {
    let totaal = 0, huidig = 0, vorige = null, vorigeWaarde = 0, laatsteGroot = Infinity, honderdGehad = false;
    let enNaEenheid = false;
    for (const d of reeks) {
      if (d.soort === 'en') {
        if (vorige === 'klein' && vorigeWaarde >= 1 && vorigeWaarde <= 9 && taal === 'NL') enNaEenheid = true;
        else if (vorige === 'honderd' || vorige === 'groot') enNaEenheid = false;
        else return NaN;
        vorige = 'en'; continue;
      }
      if (d.soort === 'klein' || d.soort === 'cijfer') {
        const v = d.waarde;
        if (d.soort === 'cijfer' && !(vorige === null || vorige === 'honderd' || vorige === 'groot')) return NaN;
        if (vorige === 'en') {
          if (enNaEenheid && !(v >= 20 && v <= 90 && v % 10 === 0)) return NaN;
        } else if (vorige === 'klein') {
          // EN: "twenty five"; NL kent dat niet ("vierendertig" gaat via "en")
          if (!(taal === 'EN' && vorigeWaarde >= 20 && vorigeWaarde % 10 === 0 && v >= 1 && v <= 9)) return NaN;
        } else if (vorige === 'cijfer') return NaN;
        if (v === 0 && reeks.length > 1) return NaN;
        huidig += v; vorige = d.soort; vorigeWaarde = v; continue;
      }
      if (d.soort === 'honderd') {
        if (vorige === 'en' || honderdGehad) return NaN;
        const basis = huidig === 0 ? 1 : huidig;
        if (basis >= 100) return NaN;
        huidig = basis * 100; honderdGehad = true; vorige = 'honderd'; continue;
      }
      if (d.soort === 'groot') {
        if (vorige === 'en' || d.waarde >= laatsteGroot) return NaN;
        const basis = huidig === 0 ? 1 : huidig;
        if (basis >= 1000) return NaN;
        totaal += basis * d.waarde; huidig = 0; honderdGehad = false; laatsteGroot = d.waarde; vorige = 'groot'; continue;
      }
    }
    if (vorige === 'en') return NaN;
    return totaal + huidig;
  }

  function tekstNaarGetal(tekst, taal) {
    if (tekst == null) return null;
    taal = String(taal || actieveTaal()).toUpperCase();
    const lex = GETAL_WOORDEN[taal] || null;
    let s = String(tekst).normalize('NFC')
      .replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660))
      .replace(/[\u06f0-\u06f9]/g, (c) => String(c.charCodeAt(0) - 0x06f0))
      .replace(/\u2212/g, '-')
      .toLowerCase();
    // Tokens: cijfergroepen, woorden, €-teken, minteken vóór een cijfer
    const cijfer = SPATIE_GROEP[taal]
      ? '\\d{1,3}(?:[ \\u00a0\\u202f]\\d{3})+(?!\\d)|\\d+(?:[.,\'\\u00a0\\u202f\\u066b\\u066c]\\d+)*'
      : '\\d+(?:[.,\'\\u00a0\\u202f\\u066b\\u066c]\\d+)*';
    const re = new RegExp('(-\\s*)?(' + cijfer + ')|([\\p{L}\\p{M}]+)|(€)', 'gu');
    const items = [];
    let m, negatief = false;
    while ((m = re.exec(s))) {
      if (m[2]) {
        const v = cijfersNaarGetal(m[2]);
        if (!isFinite(v)) return null;
        if (m[1]) negatief = true;
        items.push({ soort: 'cijfer', waarde: v });
      } else if (m[4]) {
        items.push({ soort: 'valuta' });
      } else if (m[3]) {
        const ruw = m[3];
        if (VALUTA_ALLE.indexOf(ruw) !== -1 || (lex && lex.valuta.indexOf(ruw) !== -1)) { items.push({ soort: 'valuta' }); continue; }
        if (!lex) { items.push({ soort: 'anders' }); continue; }
        if (lex.cent.indexOf(ruw) !== -1) { items.push({ soort: 'cent' }); continue; }
        if (lex.min.indexOf(ruw) !== -1) { negatief = true; continue; }
        // "één" (met accenten) is altijd een getal; "een"/"a" los is een lidwoord
        const w = ruw.normalize('NFD').replace(/\p{M}/gu, '');
        const expliciet = taal === 'NL' && w === 'een' && ruw !== 'een';
        if (!expliciet && lex.lidwoord.indexOf(w) !== -1) { items.push({ soort: 'lidwoord' }); continue; }
        if (w === lex.en) { items.push({ soort: 'en' }); continue; }
        const delen = ontleedWoord(w, lex);
        if (!delen) { items.push({ soort: 'anders' }); continue; }
        delen.forEach((d) => {
          if (d === lex.en) items.push({ soort: 'en' });
          else if (lex.groot[d] === 100) items.push({ soort: 'honderd', waarde: 100 });
          else if (lex.groot[d]) items.push({ soort: 'groot', waarde: lex.groot[d] });
          else items.push({ soort: 'klein', waarde: lex.klein[d] });
        });
      }
    }
    // Aaneengesloten getaldelen vormen één reeks; al het andere scheidt reeksen.
    // Een lidwoord vlak vóór "honderd/duizend" ("a thousand") telt als 1 en valt dus weg.
    const reeksen = [];   // {delen:[], na: soort van het scheidingsitem erna}
    let huidige = null;
    items.forEach((it, i) => {
      const getal = ['cijfer', 'klein', 'honderd', 'groot', 'en'].indexOf(it.soort) !== -1;
      if (it.soort === 'lidwoord') {
        const volgend = items[i + 1];
        if (volgend && (volgend.soort === 'honderd' || volgend.soort === 'groot')) return;
      }
      if (getal) {
        if (!huidige) { huidige = { delen: [], scheider: [] }; reeksen.push(huidige); }
        huidige.delen.push(it);
      } else {
        if (huidige) huidige = null;
        if (reeksen.length) (reeksen[reeksen.length - 1].scheider).push(it.soort);
      }
    });
    // Een losse "en"/"and" voorop of achteraan hoort er niet bij ("huur en 500")
    reeksen.forEach((r) => {
      while (r.delen.length && r.delen[0].soort === 'en') r.delen.shift();
      while (r.delen.length && r.delen[r.delen.length - 1].soort === 'en') r.delen.pop();
    });
    const echte = reeksen.filter((r) => r.delen.length);
    if (!echte.length) return null;
    const waarden = echte.map((r) => rekenReeks(r.delen, taal));
    if (waarden.some((v) => !isFinite(v))) return null;
    let uitkomst;
    if (echte.length === 1) {
      uitkomst = waarden[0];
    } else if (echte.length === 2 && echte[0].scheider.length && echte[0].scheider.every((x) => x === 'valuta')
      && Number.isInteger(waarden[0]) && Number.isInteger(waarden[1]) && waarden[1] >= 0 && waarden[1] <= 99
      && (echte[1].scheider || []).every((x) => x === 'cent' || x === 'valuta')) {
      // "twaalf euro vijftig" / "12 euro 50" → 12,50
      uitkomst = waarden[0] + waarden[1] / 100;
    } else {
      return null;   // meer dan één getal: niet gokken
    }
    uitkomst = Math.round(uitkomst * 100) / 100;
    return negatief ? -uitkomst : uitkomst;
  }

  // Bovengrens voor een ingesproken bedrag als het veld zelf geen max heeft (per maand).
  const BEDRAG_GRENS = 100000;

  // Zichtbare melding bij het veld (role=status), plus voorlezen als de voorleesstand aan
  // staat en de taal een stem heeft (TI nooit, S-7).
  function meldingVan(input, maak) {
    const id = input.dataset.solMelding;
    let el = id ? document.getElementById(id) : null;
    if (!el && maak) {
      el = document.createElement('div');
      el.id = 'sol-melding-' + Math.random().toString(36).slice(2, 9);
      el.className = 'sol-a11y-bedrag-melding';
      el.setAttribute('role', 'status');
      el.setAttribute('data-geen-lees', '');
      const anker = input.closest('.bedrag-rij') || input.parentElement;
      anker.insertAdjacentElement('afterend', el);
      input.dataset.solMelding = el.id;
      input.addEventListener('input', () => wisMelding(input));
    }
    return el;
  }
  function wisMelding(input) {
    const el = meldingVan(input, false);
    if (el && el.textContent) el.textContent = '';
  }
  function meldBedrag(input, sleutel, terugval, taal) {
    const el = meldingVan(input, true);
    const tekst = t(sleutel, terugval);
    el.textContent = '';
    // eerst leeg in de boom, dan de tekst: zo meldt een schermlezer hem ook bij herhaling
    setTimeout(() => { el.textContent = tekst; }, 60);
    if (luisterActief && beschikbaar(taal)) zeg(tekst, { taal });
  }
  function bedragUitSpraak(input, tekst, taal) {
    wisMelding(input);
    const n = tekstNaarGetal(tekst, taal);
    if (n === null) { meldBedrag(input, 'a11y-geen-getal', 'Ik heb geen getal gehoord. Probeer het nog eens.', taal); return false; }
    const max = parseFloat(input.getAttribute('max'));
    const grens = isFinite(max) && max > 0 ? max : BEDRAG_GRENS;
    if (n < 0 || n > grens) { meldBedrag(input, 'a11y-getal-klopt-niet', 'Dat getal kan niet kloppen. Probeer het nog eens.', taal); return false; }
    input.value = String(n);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function autoMic(root) {
    root = root || document;
    // Geen browserherkenning én geen actieve /api/stt-route → geen knop (principe 6).
    // De MediaRecorder→/api/stt-route (§4.6) is voorbereid maar inactief tot de Worker
    // hem beantwoordt; zolang dat niet zo is verschijnt de mic alleen bij browserherkenning.
    // LET OP: dit gaat over spraak-ín. De uitvoerroute (/api/tts) zegt daar niets over —
    // die twee door elkaar halen levert een microfoonknop op die niets doet.
    // Ook bedragvelden (type=number, fase 5): de mic zet de herkende tekst om met tekstNaarGetal.
    // TI: de mic verschijnt net als bij tekstvelden (herkenning ti-ET; S-7 gaat alleen over voorlezen).
    if (!heeftHerkenning() && !invoerRoute) return;
    root.querySelectorAll('textarea, input[type="text"], input:not([type]), input[type="number"]').forEach(inp => {
      if (inp.dataset.solMicKlaar) return;
      if (inp.closest('#solidari-nav, nav, footer, [data-geen-mic]')) return;
      inp.dataset.solMicKlaar = '1';
      inp.insertAdjacentElement('afterend', micKnop(inp, {}));
    });
  }

  // autoMarkeer + autoMic + scan in één; veilig herhaalbaar (idempotent via *Klaar-vlaggen)
  async function verwerk(root) {
    autoMarkeer(root || document);
    autoMic(root || document);
    await scan(root || document);
  }

  // ── Keuzeknoppen in de voorleesstand: twee tikken (PLAN-5, B-1) ────────
  // Wie niet kan lezen, moet een antwoord eerst kunnen horen vóór het gekozen wordt.
  // Voorleesstand AAN: eerste tik leest de knop voor en laat hem oplichten; een tweede tik
  // op dezelfde knop binnen KEUZE_TIJD kiest. Voorleesstand UIT, een taal zonder spraak
  // (TI, S-7) of een toestel zonder stem: precies als vroeger, één tik kiest.
  //
  // Conventie: een keuzeknop krijgt `data-keuze`. Tot alle pagina's zijn omgezet vangt
  // KEUZE_SELECTOREN de bestaande klassen op. Nieuwe klasse nodig? Voeg hem HIER toe.
  const KEUZE_SELECTOREN = [
    // keuzeknoppen
    '.keuze-btn', '.situatie-btn', '.scenario-btn', '.antwoord-knop', '.leeftijd-knop',
    '.type-knop', '.fase-tab', '.ja-btn', '.nee-btn', '.verder-btn',
    // actieknoppen met zichtbare tekst
    '.upload-knop', '.analyseer-knop', '.actie-knop', '.nieuwe-brief-knop', '.volgende-knop',
    '.knop-primair', '.knop-secundair', '.controle-ok-btn', '.res-opnieuw-btn',
    '.ai-ja-btn', '.ai-nee-btn', '.nieuw-btn',
  ];
  // Nooit: verstuurknoppen voor getypte tekst, de 🔊/🎤-knoppen, de voorleesschakelaar, de navigatie.
  const KEUZE_UITGESLOTEN = '.stuur-btn, .verstuur-knop, .sol-a11y-knop, .sol-a11y-mic, .sol-a11y-luister-toggle, nav, #solidari-nav, #solidari-nav-bar, footer, #solidari-footer, [data-keuze="nee"]';
  const KEUZE_SEL = ['[data-keuze]'].concat(KEUZE_SELECTOREN).join(', ');
  let keuzeTijd = 6000;                 // ms tussen eerste en tweede tik
  let keuzeGehoord = null;              // de knop die net is voorgelezen
  let keuzeGehoordTot = 0;
  let keuzeTimer = null;
  let keuzeGekoppeld = false;

  function keuzeKnopVan(doel) {
    const el = doel && doel.closest && doel.closest(KEUZE_SEL);
    if (!el || el.closest(KEUZE_UITGESLOTEN)) return null;
    return el;
  }
  const EMOJI_RE = /[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}︎️‍⃣]/gu;
  function zonderEmoji(tekst) {
    return String(tekst == null ? '' : tekst).replace(EMOJI_RE, ' ').replace(/\s+/g, ' ').trim();
  }
  // Wat wordt er bij de eerste tik gezegd? data-lees als dat er is, anders de zichtbare tekst zonder emoji.
  function keuzeTekst(el) {
    const lees = (el.getAttribute('data-lees') || '').trim();
    if (lees) return zonderEmoji(lees);
    return zonderEmoji(el.innerText || el.textContent) || zonderEmoji(el.getAttribute('aria-label') || el.getAttribute('title'));
  }
  function keuzeWis() {
    clearTimeout(keuzeTimer); keuzeTimer = null;
    if (keuzeGehoord) keuzeGehoord.classList.remove('sol-a11y-keuze-gehoord');
    keuzeGehoord = null; keuzeGehoordTot = 0;
  }
  function keuzeKlik(e) {
    if (!luisterActief) return;
    const el = keuzeKnopVan(e.target);
    if (!el) return;
    const taal = actieveTaal();
    if (geenSpraak(taal) || !beschikbaar(taal)) return;      // geen stem: één tik kiest
    if (el === keuzeGehoord && Date.now() <= keuzeGehoordTot) { keuzeWis(); return; }   // tweede tik: doorlaten
    const tekst = keuzeTekst(el);
    if (!tekst) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    keuzeWis();
    keuzeGehoord = el;
    keuzeGehoordTot = Date.now() + keuzeTijd;
    el.classList.add('sol-a11y-keuze-gehoord');
    keuzeTimer = setTimeout(keuzeWis, keuzeTijd);
    zeg(tekst, { taal });
  }
  // Eén keer, in de capture-fase op document: gaat vóór onclick-attributen en listeners op de knop zelf.
  function koppelKeuze() {
    if (keuzeGekoppeld) return;
    keuzeGekoppeld = true;
    document.addEventListener('click', keuzeKlik, true);
    // Taalwissel: een lopende reeks stopt en het oplichten verdwijnt.
    document.addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('.taal-btn')) { reeksStop(); autoWis(); keuzeWis(); }
    }, true);
  }

  // ── Vanzelf voorlezen in de voorleesstand (B-2) ────────────────────────
  // Een nieuwe chatballon (.bel-sol) wordt voorgelezen. Verschijnen er binnen AUTO_KEUZEVENSTER ms
  // keuzeknoppen, dan worden die daarna opgenoemd en lichten ze op. Ballonnen kort na elkaar komen
  // in dezelfde reeks, dus in volgorde. Een typ-indicator (.typing) wordt nooit voorgelezen: alleen
  // .bel-sol telt. Niet-chatpagina's hebben geen .bel-sol en blijven ongemoeid (naturalisatie leest
  // zijn keuzes al mee via data-lees).
  const AUTO_KEUZEVENSTER = 800;
  let autoReeks = null;
  let autoTimer = null;
  let autoSinds = 0;
  const autoGezien = new WeakSet();   // ballonnen die al in de wachtrij zijn gezet
  let autoKnoppen = [];      // {el, t}: keuzeknoppen die net in de pagina kwamen
  function autoKan() {
    if (!luisterActief) return false;
    const taal = actieveTaal();
    return !geenSpraak(taal) && beschikbaar(taal);
  }
  function autoPlaats(items) {
    if (autoReeks && autoReeks.voegToe(items)) return;
    autoReeks = zegReeks(items);
  }
  function zichtbaarEl(el) {
    return el.isConnected && !el.disabled && el.getAttribute('aria-disabled') !== 'true' &&
      (el.offsetParent !== null || el.getClientRects().length > 0) && getComputedStyle(el).visibility !== 'hidden';
  }
  function autoKeuzes() {
    autoTimer = null;
    const sinds = autoSinds; autoSinds = 0;
    if (!autoKan()) return;
    const els = [];
    autoKnoppen.forEach(k => { if (k.t >= sinds && !els.includes(k.el) && zichtbaarEl(k.el)) els.push(k.el); });
    autoKnoppen = [];
    els.sort((a, b) => (a.compareDocumentPosition(b) & 4 ? -1 : 1));
    const items = els.map(el => ({ tekst: keuzeTekst(el), el })).filter(i => i.tekst);
    if (items.length) autoPlaats(items);
  }
  function autoBallon(bel, poging) {
    if (!autoKan() || !bel.isConnected || autoGezien.has(bel)) return;
    const tekst = zonderEmoji(bel.textContent);
    if (!tekst) { if (!poging) setTimeout(() => autoBallon(bel, 1), 200); return; }   // tekst wordt nog gevuld
    autoGezien.add(bel);
    if (!autoSinds) autoSinds = Date.now() - 50;
    autoPlaats([{ tekst, el: null }]);
    clearTimeout(autoTimer);
    autoTimer = setTimeout(autoKeuzes, AUTO_KEUZEVENSTER);
  }
  function autoWis() {
    clearTimeout(autoTimer); autoTimer = null; autoSinds = 0; autoKnoppen = []; autoReeks = null;
  }
  // Pagina laadt met de voorleesstand al aan: chatpagina's zetten hun eerste ballonnen soms neer
  // vóórdat de observer er is. Neem wat er staat alsnog mee (keuzeknoppen alleen uit de chatzones).
  function autoBegin() {
    if (!luisterActief) return;
    const nu = Date.now();
    const ballonnen = [...document.querySelectorAll('.bel-sol')].filter(b => !b.closest('.typing') && !autoGezien.has(b));
    if (!ballonnen.length) return;
    document.querySelectorAll(KEUZE_SEL).forEach(k => {
      if (k.closest('#berichten, #invoer-zone, #keuze-zone') && keuzeKnopVan(k)) autoKnoppen.push({ el: k, t: nu });
    });
    ballonnen.forEach(b => autoBallon(b));
  }
  function autoMutaties(muts) {
    const nu = Date.now();
    // Een chat die opnieuw begint (start(), taalwissel) gooit zijn ballonnen weg: wat nog op de
    // rol stond is verouderd en komt niet meer aan bod.
    for (const m of muts) {
      for (const n of m.removedNodes) {
        if (n.nodeType === 1 && (n.matches('.bel-sol') || n.querySelector('.bel-sol'))) {
          if (autoReeks) autoReeks.stop();
          autoWis();
        }
      }
    }
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.nodeType !== 1 || n.closest('.typing, .sol-a11y-knop')) continue;
        if (n.matches('.bel-sol')) autoBallon(n);
        else n.querySelectorAll('.bel-sol').forEach(b => autoBallon(b));
        if (luisterActief) {
          const kn = n.matches(KEUZE_SEL) ? [n] : [...n.querySelectorAll(KEUZE_SEL)];
          kn.forEach(k => { if (keuzeKnopVan(k)) autoKnoppen.push({ el: k, t: nu }); });
        }
      }
    }
    autoKnoppen = autoKnoppen.filter(k => nu - k.t < 5000).slice(-200);
  }

  // ── Luistermodus (tik-om-te-lezen) ─────────────────────────────────────
  let luisterActief = false;
  function luisterKlik(e) {
    const el = e.target.closest && e.target.closest('[data-lees]');
    if (!el) return;
    if (e.target.closest('.sol-a11y-knop')) return; // knop doet z'n eigen ding
    if (keuzeKnopVan(e.target)) return;             // keuzeknop: zie keuzeKlik (twee tikken)
    const taal = (el.getAttribute('data-lees-taal') || actieveTaal()).toUpperCase();
    // Geen oplichtend blok voor een taal die toch niet gelezen wordt (S-7).
    if (geenSpraak(taal)) return;
    const tekst = el.getAttribute('data-lees') || el.textContent;
    document.querySelectorAll('.sol-a11y-leest-blok').forEach(x => x.classList.remove('sol-a11y-leest-blok'));
    el.classList.add('sol-a11y-leest-blok');
    zeg(tekst, { taal, opEinde: () => el.classList.remove('sol-a11y-leest-blok'), opFout: () => el.classList.remove('sol-a11y-leest-blok') });
  }
  const luistermodus = {
    aan() {
      if (luisterActief) return;
      luisterActief = true;
      document.body.classList.add('sol-a11y-luistermodus');
      document.addEventListener('click', luisterKlik, true);
      try { localStorage.setItem('solidari-voorlezen', 'aan'); } catch (e) {}
    },
    uit() {
      luisterActief = false;
      keuzeWis();
      autoWis();
      document.body.classList.remove('sol-a11y-luistermodus');
      document.removeEventListener('click', luisterKlik, true);
      stop();
      try { localStorage.setItem('solidari-voorlezen', 'uit'); } catch (e) {}
    },
    staat() { return luisterActief; },
  };

  // ── Spraakinvoer (laag 1) ──────────────────────────────────────────────
  function luister(opties) {
    opties = opties || {};
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { if (opties.opFout) opties.opFout('geen-herkenning'); return null; }
    const taal = (opties.taal || actieveTaal());
    const r = new SR();
    r.lang = primaireBcp(taal);
    r.interimResults = true;
    r.continuous = false;
    let laatste = '';
    r.onresult = (ev) => {
      let tekst = '';
      for (let i = 0; i < ev.results.length; i++) tekst += ev.results[i][0].transcript;
      laatste = tekst;
      if (opties.opTekst) opties.opTekst(tekst, ev.results[ev.results.length - 1].isFinal);
    };
    r.onerror = (ev) => { if (opties.opFout) opties.opFout(ev.error); };
    r.onend = () => { if (opties.opEinde) opties.opEinde(laatste); };
    try { r.start(); } catch (e) { if (opties.opFout) opties.opFout('start-mislukt'); }
    return r;
  }

  // Een externe route bedient niet per se alle talen: zonder deze filter zou de knop
  // ook verschijnen bij talen waar de route een 400 teruggeeft — een dode knop, en dat
  // is precies wat principe 6 verbiedt. Er is op dit moment geen route geregistreerd
  // (S-7), dus routeKan() geeft altijd false.
  function routeKan(taal) {
    if (!externeRoute) return false;
    if (!routeTalen) return true;
    return routeTalen.indexOf(String(taal).toUpperCase()) !== -1;
  }
  function registreerInvoerRoute(fn) { invoerRoute = (typeof fn === 'function') ? fn : null; }
  function registreerRoute(fn, talen) {
    externeRoute = (typeof fn === 'function') ? fn : null;
    routeTalen = Array.isArray(talen) ? talen.map(t => String(t).toUpperCase()) : null;
  }

  // ── Publieke API (§4.3) ────────────────────────────────────────────────
  window.Solidari.spraak = {
    beschikbaar, zeg, zegReeks, stop, bezig, ontgrendel, stemVoor, splitsZinnen,
    knop, scan, autoMarkeer, verwerk, micKnop, autoMic, manifest, luistermodus, luister, registreerRoute, registreerInvoerRoute,
    geenSpraak, mobiel: MOBIEL,
    tekstNaarGetal, bedragUitSpraak,   // fase 5: bedragen inspreken
    keuzeSelector: KEUZE_SEL, isKeuzeknop: (el) => !!keuzeKnopVan(el), keuzeTekst,
    zonderEmoji, emojiRe: EMOJI_RE,   // gedeeld met components.js (verbergEmoji, PLAN-5 fase 3)
    keuzeTijd: (ms) => { if (typeof ms === 'number' && ms > 0) keuzeTijd = ms; return keuzeTijd; },
    // testhaken (niet-openbaar bedoeld, wel handig in acceptatietests)
    _kiesLaag, _normaliseer: normaliseer, _hashVan: hashVan, _actieveTaal: actieveTaal,
  };

  // ── Zelf-initialisatie ─────────────────────────────────────────────────
  function eersteGebaarOntgrendel() {
    ontgrendel();
    document.removeEventListener('pointerdown', eersteGebaarOntgrendel, true);
    document.removeEventListener('keydown', eersteGebaarOntgrendel, true);
  }

  let verwerkGepland = false;
  function planVerwerk() {
    if (verwerkGepland) return;
    verwerkGepland = true;
    setTimeout(() => { verwerkGepland = false; verwerk(document); }, 200);
  }

  // ── /api/tts is uit de frontend gehaald (besluit S-7, 17-09-2026) ──────
  // Hier stond de aanroep van onze eigen TTS-route voor dynamische Tigrinya-tekst.
  // Na de native review (W-B: nee) roept geen enkele pagina hem nog aan. De route
  // zelf blijft draaien op de VPS en in nginx — zie INSTRUCTIES.md — zodat hij er nog
  // is als er ooit een stem komt die wél deugt. Terugzetten is dan: deze aanroep
  // opnieuw registreren via registreerRoute(fn, ['TI']) en TI uit GEEN_SPRAAK halen.

  function init() {
    // Onderdruk de bekende, onschadelijke AbortError die Chromium logt wanneer
    // audio-playback wordt onderbroken (snel taalwisselen/opnieuw voorlezen).
    // Alleen déze fout; al het andere propageert normaal.
    window.addEventListener('unhandledrejection', (e) => {
      if (e.reason && e.reason.name === 'AbortError') e.preventDefault();
    });

    // iOS-ontgrendeling bij het eerste gebaar
    document.addEventListener('pointerdown', eersteGebaarOntgrendel, true);
    document.addEventListener('keydown', eersteGebaarOntgrendel, true);

    // Er wordt geen uitvoerroute meer geregistreerd (S-7). registreerRoute() blijft
    // bestaan als haak; zonder aanroep staat laag 3 eenvoudigweg uit.

    // Twee tikken op keuzeknoppen in de voorleesstand (vóór luisterKlik geregistreerd)
    koppelKeuze();

    // Eerste markering + knoppen
    verwerk(document);

    // Browserstemmen laden asynchroon. Komen ze pas ná de eerste scan beschikbaar
    // (voiceschanged), dan zijn blokken zonder audiobestand onterecht als 'leeg'
    // gemarkeerd en verschijnt er geen 🔊-knop. Wis die markering en scan opnieuw
    // zodra de stemmen er zijn, zodat de voorleesknoppen alsnog verschijnen.
    //
    // Mobiel: iOS-Safari vuurt voiceschanged vaak nooit, en Android levert de lijst soms pas
    // na seconden. Zonder terugval bleef getVoices() daar leeg bij de enige scan en kwam er
    // op de hele site geen enkele knop. Daarom óók pollen tot er stemmen zijn (max ~8 s).
    function stemmenErBij() {
      document.querySelectorAll('[data-lees]').forEach(el => {
        const v = el.dataset.solA11yKlaar;
        if (v === 'leeg' || v === 'bezig') delete el.dataset.solA11yKlaar;
      });
      scan(document);
    }
    try {
      if (window.speechSynthesis) {
        if (typeof speechSynthesis.addEventListener === 'function') {
          speechSynthesis.addEventListener('voiceschanged', stemmenErBij);
        } else if ('onvoiceschanged' in speechSynthesis) {
          speechSynthesis.onvoiceschanged = stemmenErBij;
        }
        let pogingen = 0;
        let vorige = stemmen().length;
        const poll = setInterval(() => {
          pogingen++;
          const n = stemmen().length;
          if (n !== vorige) { vorige = n; stemmenErBij(); }
          if ((n > 0 && pogingen >= 4) || pogingen >= 32) clearInterval(poll);
        }, 250);
      }
    } catch (e) {}

    // Dynamisch bijgerenderde inhoud (chat, resultaten) automatisch meenemen.
    try {
      const obs = new MutationObserver((muts) => {
        try { autoMutaties(muts); } catch (e) {}
        // Nieuwe invoervelden (budgethulp en loont-werken bouwen ze per stap) krijgen hun mic
        // meteen, niet pas na de 200 ms van planVerwerk: dan staat hij er al als het veld verschijnt.
        try {
          for (const m of muts) {
            if ([...m.addedNodes].some((n) => n.nodeType === 1 && (n.matches('input, textarea') || n.querySelector('input, textarea')))) autoMic(m.target);
          }
        } catch (e) {}
        for (const m of muts) {
          // Een taalwissel vervangt tekst, geen elementen: i18n.passToe() zet innerHTML
          // opnieuw en brief.html zet textContent van zijn eigen sleutels. Beide leveren
          // een tekstnode of een characterData-mutatie op, geen element — daarom keek de
          // observer daar vroeger overheen en kwam de voorleesknop niet terug.
          if (m.type === 'characterData') { planVerwerk(); return; }
          for (const n of m.removedNodes) {
            // onze eigen knop is weggegooid door zo'n vervanging → opnieuw plaatsen
            if (n.nodeType === 1 && n.classList && n.classList.contains('sol-a11y-knop')) { planVerwerk(); return; }
          }
          for (const n of m.addedNodes) {
            if (n.nodeType === 1 && !n.classList.contains('sol-a11y-knop')) { planVerwerk(); return; }
            if (n.nodeType === 3 && n.textContent && n.textContent.trim()) { planVerwerk(); return; }
          }
        }
      });
      obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    } catch (e) {}

    // Luistermodus herstellen
    try { if (localStorage.getItem('solidari-voorlezen') === 'aan') { luistermodus.aan(); setTimeout(autoBegin, 400); } } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
