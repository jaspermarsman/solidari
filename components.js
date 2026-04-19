/**
 * Solidari — Gedeelde componenten
 * Nav en footer worden door dit bestand in elke pagina gezet.
 *
 * Gebruik in elke HTML-pagina:
 *   <head>
 *     <link rel="stylesheet" href="components.css">
 *   </head>
 *   <body>
 *     <div id="solidari-nav"></div>
 *     ... pagina-inhoud ...
 *     <div id="solidari-footer"></div>
 *     <script src="i18n.js"></script>
 *     <script src="components.js"></script>
 *   </body>
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

  const ROOT = '';

  // ── Tools lijst ────────────────────────────────────────────────────────
  const TOOLS = [
    { naam: 'Brief Begrijper', url: 'brief.html' },
    { naam: 'Budgethulp', url: 'budgethulp.html' },
    { naam: 'Loont Werken?', url: 'loont-werken.html' },
    { naam: 'Naturalisatie', url: 'naturalisatie.html' },
    { naam: '18 Jaar', url: '18jaar.html' },
    { naam: 'Rechten & Plichten', url: null },   // binnenkort
    { naam: 'Digi Hulp', url: null },            // binnenkort
  ];

  // ── Talen ──────────────────────────────────────────────────────────────
  const TALEN = [
    { code: 'NL', vlag: '🇳🇱', label: 'NL' },
    { code: 'EN', vlag: '🇬🇧', label: 'EN' },
    { code: 'AR', vlag: '🇸🇦', label: 'AR' },
    { code: 'TR', vlag: '🇹🇷', label: 'TR' },
    { code: 'TI', vlag: '🇪🇷', label: 'TI' },
    { code: 'UK', vlag: '🇺🇦', label: 'UK' },
    { code: 'FA', vlag: '🇦🇫', label: 'FA' },
    { code: 'RO', vlag: '🇷🇴', label: 'RO' },
    { code: 'PL', vlag: '🇵🇱', label: 'PL' },
  ];

  // ── NAV HTML ───────────────────────────────────────────────────────────
  function maakNav() {
    const pagina = window.location.pathname.split('/').pop() || 'index.html';

    const toolsItems = TOOLS.map(t => {
      if (t.url) {
        const actief = pagina === t.url ? ' class="actief"' : '';
        return `<li><a href="${ROOT}${t.url}"${actief}>${t.naam}</a></li>`;
      } else {
        return `<li><span class="tool-binnenkort">${t.naam}<span class="binnenkort-label">binnenkort</span></span></li>`;
      }
    }).join('');

    const taalItems = TALEN.map(t =>
      `<button class="taal-dd-btn taal-btn" data-taal="${t.code}">${t.vlag} ${t.label}</button>`
    ).join('');

    // Mobiel menu: tools uitgeschreven + taalwisseling
    const mobieleToolsItems = TOOLS.map(t => {
      if (t.url) {
        const actief = pagina === t.url ? ' class="actief"' : '';
        return `<a href="${ROOT}${t.url}"${actief}>${t.naam}</a>`;
      } else {
        return `<span class="tool-binnenkort">${t.naam}<span class="binnenkort-label">binnenkort</span></span>`;
      }
    }).join('');

    const mobileTaalItems = TALEN.map(t =>
      `<button class="taal-btn mob-taal-btn" data-taal="${t.code}">${t.vlag} ${t.label}</button>`
    ).join('');

    return `<nav id="solidari-nav-bar">
  <a href="${ROOT}index.html" class="nav-logo">
    ${LOGO_SVG}
    ${LOGO_NAAM}
  </a>

  <ul class="nav-links">
    <li class="nav-dropdown">
      <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
        Tools <svg class="chevron" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <ul class="dropdown-menu" role="menu">
        ${toolsItems}
      </ul>
    </li>
    <li><a href="${ROOT}over.html" data-i18n="nav-over"${pagina === 'over.html' ? ' class="actief"' : ''}>Over dit project</a></li>
    <li><a href="${ROOT}over.html#privacy" data-i18n="nav-privacy">Privacy</a></li>
  </ul>

  <div class="nav-rechts">
    <div class="nav-taal-dropdown">
      <button class="taal-trigger" aria-label="Taal kiezen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span class="taal-huidig">🇳🇱 NL</span>
        <svg class="chevron" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="taal-dropdown-menu">
        ${taalItems}
      </div>
    </div>

    <button class="hamburger" aria-label="Menu openen" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mob-menu" id="mob-menu" aria-hidden="true">
  <div class="mob-menu-sectie">
    <div class="mob-menu-label">Tools</div>
    <div class="mob-tools">
      ${mobieleToolsItems}
    </div>
  </div>
  <div class="mob-menu-sectie">
    <a href="${ROOT}over.html" class="mob-link"${pagina === 'over.html' ? ' data-actief' : ''}>Over dit project</a>
    <a href="${ROOT}over.html#privacy" class="mob-link">Privacy</a>
  </div>
  <div class="mob-menu-sectie mob-talen">
    <div class="mob-menu-label">Taal</div>
    <div class="mob-taal-grid">
      ${mobileTaalItems}
    </div>
  </div>
</div>
<div class="mob-overlay" id="mob-overlay"></div>`;
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
      <a href="${ROOT}over.html">Over dit project</a> ·
      <a href="${ROOT}over.html#privacy">Privacy</a> ·
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

  // ── Tools dropdown (desktop) ───────────────────────────────────────────
  function koppelToolsDropdown() {
    const trigger = document.querySelector('.nav-dropdown-trigger');
    const menu = document.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;

    function open() {
      trigger.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
    }
    function sluit() {
      trigger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    }

    // Hover op desktop
    const li = trigger.closest('.nav-dropdown');
    li.addEventListener('mouseenter', open);
    li.addEventListener('mouseleave', sluit);

    // Klik ook (voor touch-laptop)
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.contains('open') ? sluit() : open();
    });

    document.addEventListener('click', sluit);
  }

  // ── Taal dropdown ──────────────────────────────────────────────────────
  function koppelTaalDropdown() {
    const trigger = document.querySelector('.taal-trigger');
    const menu = document.querySelector('.taal-dropdown-menu');
    if (!trigger || !menu) return;

    function sluitTaal() {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      isOpen ? sluitTaal() : (menu.classList.add('open'), trigger.setAttribute('aria-expanded', 'true'));
    });

    document.addEventListener('click', sluitTaal);
    menu.addEventListener('click', (e) => e.stopPropagation());
  }

  // ── Hamburger menu (mobiel) ────────────────────────────────────────────
  function koppelHamburger() {
    const btn = document.querySelector('.hamburger');
    const mobMenu = document.getElementById('mob-menu');
    const overlay = document.getElementById('mob-overlay');
    if (!btn || !mobMenu) return;

    function open() {
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      mobMenu.classList.add('open');
      mobMenu.setAttribute('aria-hidden', 'false');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function sluit() {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      mobMenu.classList.remove('open');
      mobMenu.setAttribute('aria-hidden', 'true');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
      btn.classList.contains('open') ? sluit() : open();
    });
    if (overlay) overlay.addEventListener('click', sluit);

    // Sluit bij nav-klik
    mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', sluit));
  }

  // ── Taalknopen koppelen ────────────────────────────────────────────────
  function koppelTaalKnoppen() {
    let actiefeTaal = 'NL';
    try { actiefeTaal = localStorage.getItem('solidari-taal') || 'NL'; } catch(e) {}

    function passTaalToe(taal) {
      // Actief-state op alle taalknopen (nav + mobiel)
      document.querySelectorAll('.taal-btn[data-taal]').forEach(b => {
        b.classList.toggle('actief', b.dataset.taal === taal);
      });

      // Update het zichtbare label in de trigger
      const taalObj = TALEN.find(t => t.code === taal);
      const huidig = document.querySelector('.taal-huidig');
      if (huidig && taalObj) huidig.textContent = taalObj.vlag + ' ' + taalObj.label;

      if (window.Solidari && Solidari.i18n) Solidari.i18n.passToe(taal);
      if (typeof window.setTaal === 'function') {
        const btn = document.querySelector(`.taal-btn[data-taal="${taal}"]`);
        window.setTaal(taal.toLowerCase(), btn);
      }
      try { localStorage.setItem('solidari-taal', taal); } catch(e) {}
    }

    document.querySelectorAll('.taal-btn[data-taal]').forEach(btn => {
      btn.addEventListener('click', () => {
        passTaalToe(btn.dataset.taal);
        // Sluit taal-dropdown na keuze
        document.querySelector('.taal-dropdown-menu')?.classList.remove('open');
      });
    });

    passTaalToe(actiefeTaal);
  }

  // ── Init ───────────────────────────────────────────────────────────────
  function init() {
    inject();
    koppelToolsDropdown();
    koppelTaalDropdown();
    koppelHamburger();
    koppelTaalKnoppen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
