/**
 * Solidari — Gedeelde componenten
 * Nav en footer worden door dit bestand in elke pagina gezet.
 *
 * Gebruik in elke HTML-pagina:
 *   <head>
 *     ...
 *     <link rel="stylesheet" href="components.css">
 *   </head>
 *   <body>
 *     <div id="solidari-nav"></div>
 *     ... pagina-inhoud ...
 *     <div id="solidari-footer"></div>
 *     <script src="i18n.js"></script>
 *     <script src="components.js"></script>
 *   </body>
 *
 * De actieve pagina wordt automatisch herkend via window.location.
 */

(function() {

  // ── Logo SVG (gedeeld) ─────────────────────────────────────────────────
  const LOGO_SVG = `<svg class="logo-icon" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="8" fill="#E8A020"/>
    <line x1="18" y1="2" x2="18" y2="7" stroke="#E8A020" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="18" y1="29" x2="18" y2="34" stroke="#E8A020" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="2" y1="18" x2="7" y2="18" stroke="#E8A020" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="29" y1="18" x2="34" y2="18" stroke="#E8A020" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="6.1" y1="6.1" x2="9.6" y2="9.6" stroke="#E8A020" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="26.4" y1="26.4" x2="29.9" y2="29.9" stroke="#E8A020" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="29.9" y1="6.1" x2="26.4" y2="9.6" stroke="#E8A020" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="9.6" y1="26.4" x2="6.1" y2="29.9" stroke="#E8A020" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;

  const LOGO_NAAM = `<span class="logo-naam">Solid<span>a</span>r<span>i</span></span>`;

  // ── Bepaal root-pad (voor subpagina's in subdirectory) ─────────────────
  // Voor nu altijd '' omdat alles in de root staat
  const ROOT = '';

  // ── NAV HTML ───────────────────────────────────────────────────────────
  function maakNav() {
    const pagina = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = pagina === '' || pagina === 'index.html';

    return `<nav id="solidari-nav-bar">
  <a href="${ROOT}index.html" class="nav-logo">
    ${LOGO_SVG}
    ${LOGO_NAAM}
  </a>
  <ul class="nav-links">
    <li><a href="${ROOT}tools.html" data-i18n="nav-tools"${pagina === 'tools.html' ? ' class="actief"' : ''}>Tools</a></li>
    <li><a href="${ROOT}index.html#missie" data-i18n="nav-over">Over ons</a></li>
    <li><a href="${ROOT}index.html#missie" data-i18n="nav-privacy">Privacy</a></li>
    <li><a href="${ROOT}index.html#doneer" data-i18n="nav-doneer" class="nav-doneer">💛 Doneer</a></li>
  </ul>
  <div class="nav-taal">
    <button class="taal-btn" data-taal="NL">NL</button>
    <button class="taal-btn" data-taal="EN">EN</button>
    <button class="taal-btn" data-taal="AR">AR</button>
    <button class="taal-btn" data-taal="TR">TR</button>
    <button class="taal-btn" data-taal="TI">TI</button>
    <button class="taal-btn" data-taal="UK">UK</button>
    <button class="taal-btn" data-taal="FA">FA</button>
  </div>
</nav>`;
  }

  // ── FOOTER HTML ────────────────────────────────────────────────────────
  function maakFooter() {
    return `<footer id="solidari-footer-bar">
  <div class="footer-inhoud">
    <a href="${ROOT}index.html" class="footer-logo">
      ${LOGO_SVG}
      <span class="footer-naam">Solid<span>a</span>r<span>i</span></span>
    </a>
    <div class="footer-midden">
      <a href="${ROOT}index.html#missie">Privacy</a> ·
      <a href="#">Disclaimer</a> ·
      <a href="#">Contact</a><br>
      <span class="footer-cookies" data-i18n="footer-cookies">Geen cookies · Geen opslag · Geen advertenties</span>
    </div>
    <a href="${ROOT}index.html#doneer" class="footer-doneer" data-i18n="nav-doneer">💛 Doneer</a>
  </div>
</footer>`;
  }

  // ── Injecteer componenten ──────────────────────────────────────────────
  function inject() {
    const navEl = document.getElementById('solidari-nav');
    if (navEl) navEl.outerHTML = maakNav();

    const footerEl = document.getElementById('solidari-footer');
    if (footerEl) footerEl.outerHTML = maakFooter();
  }

  // ── Taalknopen koppelen (werkt samen met i18n.js) ─────────────────────
  function koppelTaalKnoppen() {
    // Herstel opgeslagen taal
    let actiefeTaal = 'NL';
    try {
      actiefeTaal = localStorage.getItem('solidari-taal') || 'NL';
    } catch(e) {}

    document.querySelectorAll('.taal-btn[data-taal]').forEach(btn => {
      const taal = btn.dataset.taal;
      if (taal === actiefeTaal) btn.classList.add('actief');

      btn.addEventListener('click', () => {
        document.querySelectorAll('.taal-btn').forEach(b => b.classList.remove('actief'));
        btn.classList.add('actief');

        // i18n.js toepassen als beschikbaar
        if (window.Solidari && Solidari.i18n) {
          Solidari.i18n.passToe(taal);
        }

        // Pagina-eigen taalwisseling (voor budgethulp en andere tools)
        if (typeof window.setTaal === 'function') {
          window.setTaal(taal.toLowerCase(), btn);
        }

        try { localStorage.setItem('solidari-taal', taal); } catch(e) {}
      });
    });

    // Pas opgeslagen taal direct toe
    if (window.Solidari && Solidari.i18n) {
      Solidari.i18n.passToe(actiefeTaal);
    }
  }

  // ── Init ───────────────────────────────────────────────────────────────
  function init() {
    inject();
    koppelTaalKnoppen();
  }

  // Draai na DOM-load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
