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
    stopHeartbeat();
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
    try { if (audioEl) { audioEl.pause(); audioEl.removeAttribute('src'); } } catch (e) {}
    bezigVlag = false;
  }

  function speelBestand(tekst, taal, hash, opties) {
    const el = audio();
    el.muted = false;
    el.src = 'audio/' + taal + '/' + hash + '.mp3';
    bezigVlag = true;
    if (opties.opStart) opties.opStart();
    el.onended = () => { bezigVlag = false; if (opties.opEinde) opties.opEinde(); };
    el.onerror = () => {
      bezigVlag = false;
      if (!gestopt && stemVoor(taal)) { speelStem(tekst, taal, opties); }
      else { fout(opties); }
    };
    Promise.resolve(el.play && el.play()).catch(() => { if (el.onerror) el.onerror(); });
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

  async function scan(root) {
    root = root || document;
    const els = [...root.querySelectorAll('[data-lees]')];
    if (!els.length) return;
    const talen = new Set(els.map(el => (el.getAttribute('data-lees-taal') || actieveTaal()).toUpperCase()));
    await Promise.all([...talen].map(ensureManifest));
    for (const el of els) {
      if (el.dataset.solA11yKlaar) continue;
      const taal = (el.getAttribute('data-lees-taal') || actieveTaal()).toUpperCase();
      if (!beschikbaar(taal)) continue;
      const tekst = el.getAttribute('data-lees') || el.textContent;
      if (!normaliseer(tekst)) continue;
      el.appendChild(knop(tekst, taal));
      el.dataset.solA11yKlaar = '1';
    }
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
    knop, scan, manifest, luistermodus, luister, registreerRoute,
    // testhaken (niet-openbaar bedoeld, wel handig in acceptatietests)
    _kiesLaag, _normaliseer: normaliseer, _hashVan: hashVan, _actieveTaal: actieveTaal,
  };
})();
