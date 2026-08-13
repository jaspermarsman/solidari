/**
 * Solidari — spraak.js (v2)
 * Gelaagde voorlees- en spraakinvoermotor. Eén gedeeld component, geen kopieën.
 *
 * Lagen bij voorlezen (per taal gekozen volgens D-19):
 *   1. voorgegenereerd audiobestand  audio/<TAAL>/<hash>.mp3  (via manifest)
 *   2. browser speechSynthesis
 *   3. externe route (registreerRoute) — bv. Worker-TTS voor dynamische tekst
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
    TI: ['ti-ET', 'ti-ER'],          // daarna niets (browser)
    UK: ['uk-UA', 'uk'],             // NOOIT ru
    FA: ['fa-IR', 'fa-AF', 'fa'],
    RO: ['ro-RO', 'ro'],
    PL: ['pl-PL', 'pl'],
  };
  // Talen die altijd bestand-eerst spelen, ongeacht manifestbron (D-19).
  const BESTAND_EERST = { TI: true, FA: true };

  // ── Interne staat ──────────────────────────────────────────────────────
  const manifestCache = {};   // taal → manifest-object | null
  const manifestBezig = {};   // taal → Promise
  let audioEl = null;
  let externeRoute = null;
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
      const treffers = voices.filter(v => v.lang && v.lang.toLowerCase() === code.toLowerCase());
      if (treffers.length) return treffers.find(v => v.localService) || treffers[0];
    }
    const prim = (keten[0] || '').split('-')[0].toLowerCase();
    if (prim) {
      const treffers = voices.filter(v => v.lang && v.lang.toLowerCase().split('-')[0] === prim);
      if (treffers.length) return treffers.find(v => v.localService) || treffers[0];
    }
    return null;
  }

  // ── Laagkeuze (D-19) ───────────────────────────────────────────────────
  function kiesLaag(taal, hash) {
    const m = manifestCache[taal];
    const bestandBeschikbaar = heeftBestand(taal, hash);
    const bestandEerst = !!BESTAND_EERST[taal] || (m && m.bron === 'gemini');
    if (bestandBeschikbaar && bestandEerst) return 'bestand';
    if (stemVoor(taal)) return 'stem';
    if (bestandBeschikbaar) return 'bestand';
    if (externeRoute) return 'route';
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
  function startHeartbeat() {
    stopHeartbeat();
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
  function stop() {
    gestopt = true;
    audioToken++;                 // lopende bestand-callbacks worden ongeldig
    stopHeartbeat();
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
    try {
      if (audioEl) {
        audioEl.onended = null; audioEl.onerror = null;  // geen spurieuze error bij src verwijderen
        audioEl.pause(); audioEl.removeAttribute('src');
      }
    } catch (e) {}
    bezigVlag = false;
  }

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
    volgende();
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

  async function zeg(tekst, opties) {
    opties = opties || {};
    const taal = (opties.taal || actieveTaal());
    stop();
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

  function beschikbaar(taal) {
    taal = taal || actieveTaal();
    return !!stemVoor(taal) || heeftBestanden(taal) || !!externeRoute;
  }

  function ontgrendel() {
    try { const u = new SpeechSynthesisUtterance(''); u.volume = 0; speechSynthesis.speak(u); speechSynthesis.cancel(); } catch (e) {}
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
    await ensureManifest(taal);
    const hash = await hashVan(normaliseer(tekst));
    return heeftBestand(taal, hash) || !!stemVoor(taal) || !!externeRoute;
  }

  async function scan(root) {
    root = root || document;
    const els = [...root.querySelectorAll('[data-lees]')];
    if (!els.length) return;
    const talen = new Set(els.map(el => (el.getAttribute('data-lees-taal') || actieveTaal()).toUpperCase()));
    await Promise.all([...talen].map(ensureManifest));
    for (const el of els) {
      if (el.dataset.solA11yKlaar) continue;
      const taal = (el.getAttribute('data-lees-taal') || actieveTaal()).toUpperCase();
      const tekst = el.getAttribute('data-lees') || el.textContent;
      if (!normaliseer(tekst)) continue;
      if (!(await kanLeveren(tekst, taal))) { el.dataset.solA11yKlaar = 'leeg'; continue; }
      el.appendChild(knop(tekst, taal));
      el.dataset.solA11yKlaar = '1';
    }
  }

  // ── Auto-markering: zet data-lees op inhoudsblokken ────────────────────
  const BLOK_SEL = 'p, h1, h2, h3, h4, li, blockquote, dt, dd, figcaption, .regel-zeg, .regel-intro, .regel-eigen, .regel-na';
  const UITSLUIT_SEL = 'nav, footer, #solidari-nav, #solidari-footer, script, style, button, a, select, textarea, input, label, [data-lees], [data-geen-lees], [contenteditable="true"], .sol-a11y-knop, #sol-env-balk';
  function autoMarkeer(root) {
    root = root || document;
    root.querySelectorAll(BLOK_SEL).forEach(el => {
      if (el.closest(UITSLUIT_SEL)) return;
      // alleen bladeren: geen container die zelf blokken bevat (voorkomt dubbel lezen)
      if (el.querySelector(BLOK_SEL)) return;
      const txt = normaliseer(el.textContent);
      if (txt.length <= 40 && !el.classList.contains('regel-zeg')) return;
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

  function autoMic(root) {
    root = root || document;
    // Geen browserherkenning én geen actieve /api/stt-route → geen knop (principe 6).
    // De MediaRecorder→/api/stt-route (§4.6) is voorbereid maar inactief tot de Worker
    // hem beantwoordt; zolang dat niet zo is verschijnt de mic alleen bij browserherkenning.
    if (!heeftHerkenning() && !externeRoute) return;
    root.querySelectorAll('textarea, input[type="text"], input:not([type])').forEach(inp => {
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

  // ── Luistermodus (tik-om-te-lezen) ─────────────────────────────────────
  let luisterActief = false;
  function luisterKlik(e) {
    const el = e.target.closest && e.target.closest('[data-lees]');
    if (!el) return;
    if (e.target.closest('.sol-a11y-knop')) return; // knop doet z'n eigen ding
    const taal = (el.getAttribute('data-lees-taal') || actieveTaal()).toUpperCase();
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

  function registreerRoute(fn) { externeRoute = (typeof fn === 'function') ? fn : null; }

  // ── Publieke API (§4.3) ────────────────────────────────────────────────
  window.Solidari.spraak = {
    beschikbaar, zeg, stop, bezig, ontgrendel, stemVoor, splitsZinnen,
    knop, scan, autoMarkeer, verwerk, micKnop, autoMic, manifest, luistermodus, luister, registreerRoute,
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

  function init() {
    // iOS-ontgrendeling bij het eerste gebaar
    document.addEventListener('pointerdown', eersteGebaarOntgrendel, true);
    document.addEventListener('keydown', eersteGebaarOntgrendel, true);

    // Eerste markering + knoppen
    verwerk(document);

    // Dynamisch bijgerenderde inhoud (chat, resultaten) automatisch meenemen.
    try {
      const obs = new MutationObserver((muts) => {
        for (const m of muts) {
          for (const n of m.addedNodes) {
            if (n.nodeType === 1 && !n.classList.contains('sol-a11y-knop')) { planVerwerk(); return; }
          }
        }
      });
      obs.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}

    // Luistermodus herstellen
    try { if (localStorage.getItem('solidari-voorlezen') === 'aan') luistermodus.aan(); } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
