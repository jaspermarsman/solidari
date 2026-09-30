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

  // ── Omgevingsdetectie (productie vs. staging) ──────────────────────────
  // Alles buiten solidari.nl geldt als testomgeving: geen indexering,
  // een zichtbare balk, en Solidari.omgeving zodat tools zich anders
  // kunnen gedragen (bv. feedback met [staging]-prefix).
  function detecteerOmgeving() {
    const host = window.location.hostname;
    const isProductie = host === 'solidari.nl' || host === 'www.solidari.nl';

    window.Solidari = window.Solidari || {};
    Solidari.omgeving = isProductie ? 'productie' : 'staging';

    if (isProductie) return;

    // 1. noindex — houd de testomgeving uit zoekmachines
    if (!document.querySelector('meta[name="robots"]')) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex';
      document.head.appendChild(meta);
    }

    // 2. Zichtbare testbalk bovenaan
    if (!document.getElementById('sol-env-balk')) {
      const balk = document.createElement('div');
      balk.id = 'sol-env-balk';
      balk.className = 'sol-env-balk';
      balk.setAttribute('role', 'status');
      balk.textContent = '⚠️ TESTOMGEVING — dit is niet de echte site (' + host + ')';
      document.body.insertBefore(balk, document.body.firstChild);
      document.documentElement.classList.add('sol-env-staging');
    }
  }

  // ── Tools lijst ────────────────────────────────────────────────────────
  const TOOLS = [
    { naam: 'Brief Begrijper', url: 'brief.html', i18n: 'tool-brief-naam', emoji: '📬' },
    { naam: 'Budgethulp', url: 'budgethulp.html', i18n: 'tool-budget-naam', emoji: '💶' },
    { naam: 'Loont Werken?', url: 'loont-werken.html', i18n: 'tool-loont-naam', emoji: '💼' },
    { naam: 'Naturalisatie', url: 'naturalisatie.html', i18n: 'tool-naturalisatie-naam', emoji: '🌍' },
    { naam: '18 Jaar', url: '18jaar.html', i18n: 'tool-18jaar-naam', emoji: '🎂' },
    { naam: 'Rechten & Plichten', url: 'rechten.html', i18n: 'tool-rechten-naam', emoji: '⚖️' },
    { naam: 'Goed Voorbereid', url: 'goedvoorbereid.html', i18n: 'tool-gv-naam', emoji: '📋' },
  ];

  // ── Talen ── (naam = eigennaam in eigen schrift, §5) ────────────────────
  const TALEN = [
    { code: 'NL', vlag: '🇳🇱', label: 'NL', naam: 'Nederlands' },
    { code: 'EN', vlag: '🇬🇧', label: 'EN', naam: 'English' },
    { code: 'AR', vlag: '🇸🇦', label: 'AR', naam: 'العربية' },
    { code: 'TR', vlag: '🇹🇷', label: 'TR', naam: 'Türkçe' },
    { code: 'TI', vlag: '🇪🇷', label: 'TI', naam: 'ትግርኛ' },
    { code: 'UK', vlag: '🇺🇦', label: 'UK', naam: 'Українська' },
    { code: 'FA', vlag: '🇦🇫', label: 'FA', naam: 'دری' },
    { code: 'RO', vlag: '🇷🇴', label: 'RO', naam: 'Română' },
    { code: 'PL', vlag: '🇵🇱', label: 'PL', naam: 'Polski' },
  ];

  // ── NAV HTML ───────────────────────────────────────────────────────────
  function maakNav() {
    const pagina = window.location.pathname.split('/').pop() || 'index.html';

    const toolsItems = TOOLS.map(t => {
      if (t.url) {
        const actief = pagina === t.url ? ' class="actief"' : '';
        return `<li><a href="${ROOT}${t.url}"${actief}><span class="tool-emoji-nav" aria-hidden="true">${t.emoji}</span> <span data-i18n="${t.i18n}">${t.naam}</span></a></li>`;
      } else {
        return `<li><span class="tool-binnenkort" data-i18n="${t.i18n}">${t.naam}<span class="binnenkort-label">binnenkort</span></span></li>`;
      }
    }).join('');

    const taalItems = TALEN.map(t =>
      `<button class="taal-dd-btn taal-btn" data-taal="${t.code}" data-naam="${t.naam}" lang="${t.code.toLowerCase()}">${t.vlag} ${t.naam}</button>`
    ).join('');

    // Mobiel menu: tools uitgeschreven + taalwisseling
    const mobieleToolsItems = TOOLS.map(t => {
      if (t.url) {
        const actief = pagina === t.url ? ' class="actief"' : '';
        return `<a href="${ROOT}${t.url}"${actief}><span class="tool-emoji-nav" aria-hidden="true">${t.emoji}</span> <span data-i18n="${t.i18n}">${t.naam}</span></a>`;
      } else {
        return `<span class="tool-binnenkort" data-i18n="${t.i18n}">${t.naam}<span class="binnenkort-label">binnenkort</span></span>`;
      }
    }).join('');

    const mobileTaalItems = TALEN.map(t =>
      `<button class="taal-btn mob-taal-btn" data-taal="${t.code}" data-naam="${t.naam}" lang="${t.code.toLowerCase()}">${t.vlag} ${t.naam}</button>`
    ).join('');

    return `<nav id="solidari-nav-bar">
  <a href="${ROOT}index.html" class="nav-logo" aria-label="Solidari — home">
    ${LOGO_SVG}
    ${LOGO_NAAM}
  </a>

  <ul class="nav-links">
    <li class="nav-dropdown">
      <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
        <span data-i18n="nav-tools">Tools</span> <svg class="chevron" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <ul class="dropdown-menu" role="menu">
        ${toolsItems}
      </ul>
    </li>
    <li><a href="${ROOT}over.html" data-i18n="nav-over"${pagina === 'over.html' ? ' class="actief"' : ''}>Over dit project</a></li>
    <li><a href="${ROOT}feedback.html" data-i18n="nav-feedback"${pagina === 'feedback.html' ? ' class="actief"' : ''}>Feedback</a></li>
    <li><a href="${ROOT}over.html#privacy" data-i18n="nav-privacy">Privacy</a></li>
  </ul>

  <div class="nav-rechts">
    <button class="sol-a11y-luister-toggle" aria-label="Voorlezen aan of uit" aria-pressed="false" title="Voorlezen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path class="sol-a11y-golf" d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>
    </button>
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
    <div class="mob-menu-label" data-i18n="nav-tools">Tools</div>
    <div class="mob-tools">
      ${mobieleToolsItems}
    </div>
  </div>
  <div class="mob-menu-sectie">
    <a href="${ROOT}over.html" class="mob-link" data-i18n="nav-over"${pagina === 'over.html' ? ' data-actief' : ''}>Over dit project</a>
    <a href="${ROOT}feedback.html" class="mob-link" data-i18n="nav-feedback"${pagina === 'feedback.html' ? ' data-actief' : ''}>Feedback</a>
    <a href="${ROOT}over.html#privacy" class="mob-link" data-i18n="nav-privacy">Privacy</a>
  </div>
  <div class="mob-menu-sectie mob-talen">
    <div class="mob-menu-label" data-i18n="nav-taal">Taal</div>
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
    <a href="${ROOT}index.html" class="footer-logo" aria-label="Solidari — home">
      ${LOGO_SVG}
      <span class="footer-naam">Solid<span>a</span>r<span>i</span></span>
    </a>
    <div class="footer-midden">
      <a href="${ROOT}over.html" data-i18n="nav-over">Over dit project</a> ·
      <a href="${ROOT}over.html#privacy" data-i18n="nav-privacy">Privacy</a> ·
      <a href="${ROOT}feedback.html" data-i18n="footer-contact">Contact</a> ·
      <a href="${ROOT}vertaalhulp.html" data-i18n="footer-vertaalhulp">Help mee vertalen</a><br>
      <span class="footer-cookies" data-i18n="footer-cookies">Geen cookies · Geen opslag · Geen advertenties</span>
    </div>
    <a href="${ROOT}feedback.html" class="footer-feedback" data-i18n="nav-feedback">💬 Feedback</a>
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
      verversLuisterToggle();   // taal zonder voorlezen → schakelaar weg (S-7)
      try { a11yVerwerk(document.body); } catch (e) {}   // knopnamen/labels in de nieuwe taal
    }

    document.querySelectorAll('.taal-btn[data-taal]').forEach(btn => {
      btn.addEventListener('click', () => {
        passTaalToe(btn.dataset.taal);
        // Gesproken bevestiging: de taalnaam in díe taal (uit de clips)
        const naam = btn.dataset.naam;
        if (window.Solidari && Solidari.spraak && naam) {
          Solidari.spraak.ontgrendel();
          Solidari.spraak.zeg(naam, { taal: btn.dataset.taal });
        }
        // Sluit taal-dropdown na keuze
        document.querySelector('.taal-dropdown-menu')?.classList.remove('open');
      });
    });

    passTaalToe(actiefeTaal);
  }

  // ── Voorlezen-schakelaar (luistermodus) ────────────────────────────────
  // Voor een taal die niet voorgelezen wordt (Tigrinya, besluit S-7) hoort ook deze
  // schakelaar weg te blijven: hij zou de luistermodus aanzetten waarna er niets
  // klinkt — precies de dode knop die principe 6 verbiedt. Verbergen, niet
  // verwijderen: bij een wissel terug naar een taal mét stem moet hij er weer staan.
  function verversLuisterToggle() {
    const btn = document.querySelector('.sol-a11y-luister-toggle');
    if (!btn) return;
    const spraak = window.Solidari && Solidari.spraak;
    if (!spraak || typeof spraak.geenSpraak !== 'function') return;
    let taal = 'NL';
    try { taal = localStorage.getItem('solidari-taal') || 'NL'; } catch (e) {}
    const uit = spraak.geenSpraak(taal);
    if (uit && spraak.luistermodus.staat()) spraak.luistermodus.uit();
    btn.hidden = uit;
  }

  function koppelLuisterToggle() {
    const btn = document.querySelector('.sol-a11y-luister-toggle');
    if (!btn) return;
    const spraak = window.Solidari && Solidari.spraak;
    if (!spraak) { btn.remove(); return; }   // geen spraak → geen knop (principe 6)

    function verversLabel() {
      const aan = spraak.luistermodus.staat();
      btn.setAttribute('aria-pressed', aan ? 'true' : 'false');
      btn.classList.toggle('actief', aan);
      const sleutel = aan ? 'a11y-voorlezen-aan' : 'a11y-voorlezen-uit';
      let label = aan ? 'Voorlezen aan' : 'Voorlezen uit';
      try { if (Solidari.i18n && Solidari.i18n.t) label = Solidari.i18n.t(sleutel); } catch (e) {}
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }

    // Vroeger zette de knop alleen stil de tik-om-te-lezen-modus aan: hij werd groen en
    // verder gebeurde er niets, dus leek hij kapot. Nu zegt hij hardop (en in beeld) wat
    // hij doet — of meldt eerlijk dat dit toestel geen stem voor deze taal heeft.
    function t(sleutel, terugval) {
      try { if (Solidari.i18n && Solidari.i18n.t) { const v = Solidari.i18n.t(sleutel); if (v && v !== sleutel) return v; } } catch (e) {}
      return terugval;
    }
    function melding(tekst) {
      let m = document.querySelector('.sol-a11y-melding');
      if (!m) {
        m = document.createElement('div');
        m.className = 'sol-a11y-melding';
        m.setAttribute('role', 'status');
        m.setAttribute('aria-live', 'polite');
        m.setAttribute('data-geen-lees', '');
        document.body.appendChild(m);
      }
      m.textContent = tekst;
      m.classList.add('zichtbaar');
      clearTimeout(melding._t);
      melding._t = setTimeout(() => m.classList.remove('zichtbaar'), 5000);
    }

    btn.addEventListener('click', () => {
      if (spraak.luistermodus.staat()) {
        spraak.luistermodus.uit();
        melding(t('a11y-voorlezen-uit', 'Voorlezen uit'));
      } else {
        spraak.ontgrendel();
        if (spraak.beschikbaar()) {
          spraak.luistermodus.aan();
          const uitleg = t('a11y-voorlezen-uitleg', 'Voorlezen staat aan. Tik op een tekst om hem te horen.');
          melding(uitleg);
          spraak.zeg(uitleg, {
            opFout: () => melding(t('a11y-geen-stem-taal', 'Dit toestel heeft geen voorleesstem voor deze taal.')),
          });
        } else {
          // Niet aanzetten: een groene schakelaar waar niets uit komt is een dode knop.
          melding(t('a11y-geen-stem-taal', 'Dit toestel heeft geen voorleesstem voor deze taal.'));
        }
      }
      verversLabel();
    });
    verversLabel();
    verversLuisterToggle();
  }

  // ── Welkomstscherm (eerste bezoek): kies je taal, met stem ─────────────
  function maakWelkom() {
    let gezien = false;
    try { gezien = localStorage.getItem('solidari-welkom-gezien') === '1'; } catch (e) {}
    if (gezien) return;

    const overlay = document.createElement('div');
    overlay.className = 'sol-a11y-welkom';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Kies je taal — Choose your language');

    const kaarten = TALEN.map(t =>
      `<button class="sol-a11y-welkom-kaart taal-btn" data-taal="${t.code}" data-naam="${t.naam}" lang="${t.code.toLowerCase()}">
         <span class="sol-a11y-welkom-vlag" aria-hidden="true">${t.vlag}</span>
         <span class="sol-a11y-welkom-naam">${t.naam}</span>
       </button>`).join('');

    overlay.innerHTML = `
      <div class="sol-a11y-welkom-doos">
        <button class="sol-a11y-welkom-sluit" aria-label="Sluiten / Close">✕</button>
        <div class="sol-a11y-welkom-titel">🌍 Kies je taal<br><span>Choose your language</span></div>
        <div class="sol-a11y-welkom-raster">${kaarten}</div>
      </div>`;

    function sluit() {
      try { localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {}
      overlay.remove();
    }

    overlay.querySelector('.sol-a11y-welkom-sluit').addEventListener('click', sluit);
    overlay.querySelectorAll('.sol-a11y-welkom-kaart').forEach(kaart => {
      kaart.addEventListener('click', () => {
        const code = kaart.dataset.taal;
        sluit(); // eerst sluiten: het scherm gaat altijd weg, wat er daarna ook gebeurt
        if (window.Solidari && Solidari.spraak) Solidari.spraak.ontgrendel();
        // hergebruik de bestaande taalknop-logica (schakelt + spreekt de naam)
        const echt = document.querySelector(`#solidari-nav-bar .taal-btn[data-taal="${code}"]`);
        if (echt) echt.click();
        else if (window.Solidari && Solidari.i18n) Solidari.i18n.passToe(code);
      });
    });

    document.body.appendChild(overlay);
  }

  // ── Schermlezer-basis (PLAN-5 fase 3: I-3, I-4, I-7, B-3, B-4) ─────────
  // Centraal, zodat de pagina's zelf (bijna) niet veranderen:
  //   - maakOpbouw(): <main> om de inhoud, een skip-link "Naar inhoud", een verborgen h1 als de
  //     pagina er geen heeft (de 4 chats), en #berichten als live-regio (role="log").
  //   - a11yVerwerk(root): emoji verborgen voor de schermlezer maar zichtbaar (B-4, verbergEmoji),
  //     de typ-indicator en avatars stil, een naam voor knoppen met alleen een pijl of emoji,
  //     een unieke naam voor "✏️ Wijzig", labels voor de vrije invoervelden, en rol/tabindex/
  //     toetsenbord voor klikbare div's. Draait bij het laden en via een eigen MutationObserver.
  //     Idempotent; raakt alleen tekstnodes en attributen, geen listeners of innerHTML.
  // (De 🔊-knoppen zelf krijgen aria-hidden + tabindex=-1 waar ze gemaakt worden: spraak.js, B-3.)
  function tr(sleutel, terugval) {
    try {
      if (window.Solidari && Solidari.i18n && Solidari.i18n.t) {
        const v = Solidari.i18n.t(sleutel);
        if (v && v !== sleutel) return v;
      }
    } catch (e) {}
    return terugval;
  }

  // Dezelfde emoji-tekenklasse als spraak.js (zonderEmoji/keuzeTekst), zodat "wat de voorleesstem
  // overslaat" en "wat de schermlezer overslaat" hetzelfde is.
  const SP = window.Solidari && Solidari.spraak;
  const EMOJI_KLASSE = (SP && SP.emojiRe) ? SP.emojiRe.source
    : '[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\p{Emoji_Modifier}\\uFE0E\\uFE0F\\u200D\\u20E3]';
  // Pijlen en vinkjes zijn geen emoji, maar schermlezers zeggen ze wel ("pijl naar rechts", "vinkje").
  // Op knoppen, links en koppen zijn ze versiering; in lopende chattekst laten we ze staan.
  const SYMBOOL_KLASSE = '[←↑→↓↩↪↺↻▼▲▾▸◂✓✗✕]';
  const EMOJI_RUN = new RegExp('(?:' + EMOJI_KLASSE + ')+', 'gu');
  const EMOJI_SYM_RUN = new RegExp('(?:' + EMOJI_KLASSE + '|' + SYMBOOL_KLASSE + ')+', 'gu');

  const BEDIENING_SEL = 'button, a[href], [role="button"], [role="checkbox"], [role="link"], [role="tab"], [role="menuitem"], summary, label, legend, h1, h2, h3, h4, h5, h6';
  const BERICHT_SEL = '#berichten, .bel-sol, .bel-user';        // alles in de chat (ook "🔍 Bronnen")
  const EMOJI_DOEL_SEL = BEDIENING_SEL + ', ' + BERICHT_SEL;
  const DECOR_SEL = '.sol-avatar, .typing';                        // puur versiering: geheel stil
  const NIET_SEL = 'script, style, textarea, select, option, [contenteditable="true"], [data-geen-emoji]';
  const NAAM_SEL = 'button, a[href], [role="button"], [role="link"], [role="tab"], [role="menuitem"]';

  function alleIn(root, sel) {
    const r = root.matches(sel) ? [root] : [];
    return r.concat([...root.querySelectorAll(sel)]);
  }

  // Pakt emoji (en in bedieningen ook pijlen) in een <span aria-hidden="true" class="sol-emoji">.
  // Alleen tekstnodes worden vervangen; wat al verborgen is, wordt overgeslagen (idempotent).
  function wikkelEmoji(el) {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    for (const n of nodes) {
      const p = n.parentElement;
      const s = n.nodeValue;
      if (!p || !s || p.closest(NIET_SEL)) continue;
      // Al verborgen binnen dit blok (onze eigen span, een avatar): overslaan. Een verborgen
      // voorouder búíten het blok telt niet: het mobiele menu is aria-hidden zolang het dicht is.
      const verborgen = p.closest('[aria-hidden="true"]');
      if (verborgen && el.contains(verborgen)) continue;
      const re = p.closest(BEDIENING_SEL) ? EMOJI_SYM_RUN : (p.closest(BERICHT_SEL) ? EMOJI_RUN : null);
      if (!re) continue;
      re.lastIndex = 0;
      if (!re.test(s)) continue;
      re.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let vorige = 0, m;
      while ((m = re.exec(s))) {
        if (m.index > vorige) frag.appendChild(document.createTextNode(s.slice(vorige, m.index)));
        const sp = document.createElement('span');
        sp.setAttribute('aria-hidden', 'true');
        sp.className = 'sol-emoji';
        sp.textContent = m[0];
        frag.appendChild(sp);
        vorige = m.index + m[0].length;
      }
      if (vorige < s.length) frag.appendChild(document.createTextNode(s.slice(vorige)));
      p.replaceChild(frag, n);
    }
  }

  function verbergEmoji(root) {
    root = root || document.body;
    if (!root || root.nodeType !== 1) return;
    alleIn(root, DECOR_SEL).forEach(el => { if (el.getAttribute('aria-hidden') !== 'true') el.setAttribute('aria-hidden', 'true'); });
    if (root.closest(EMOJI_DOEL_SEL)) wikkelEmoji(root);
    else root.querySelectorAll(EMOJI_DOEL_SEL).forEach(wikkelEmoji);
  }

  // Wat een schermlezer als naam zou horen (tekst zonder aria-hidden-delen).
  function hoorbareTekst(el) {
    let t = '';
    (function loop(n) {
      if (n.nodeType === 3) t += n.nodeValue;
      else if (n.nodeType === 1 && n.getAttribute('aria-hidden') !== 'true' && !/^(SCRIPT|STYLE)$/.test(n.tagName)) {
        if (n.tagName === 'IMG') t += ' ' + (n.getAttribute('alt') || '') + ' ';
        n.childNodes.forEach(loop);
      }
    })(el);
    return t.replace(/\s+/g, ' ').trim();
  }

  // Naam voor een knop, of null als de zichtbare tekst al een goede naam is.
  function naamVoor(el) {
    // "✏️ Wijzig" op het controlescherm van budgethulp: 14× dezelfde naam → "Wijzig huur".
    if (el.matches('.controle-edit')) {
      const post = el.closest('.controle-rij');
      const naam = post && post.querySelector('.controle-naam') ? hoorbareTekst(post.querySelector('.controle-naam')) : '';
      return naam ? tr('a11y-wijzig-x', 'Wijzig {x}').replace('{x}', naam) : null;
    }
    if (/[\p{L}\p{N}]/u.test(hoorbareTekst(el))) return null;   // er blijft een echte naam over
    // Alleen een pijl ("→", "←", "↑") of "+": de verstuurknoppen van de chats.
    if (el.matches('.stuur-btn')) {
      return el.textContent.trim() === '+' ? tr('a11y-toevoegen', 'Voeg toe') : tr('a11y-verstuur', 'Verstuur');
    }
    const title = (el.getAttribute('title') || '').trim();
    return title || null;
  }
  // data-sol-naam markeert een aria-label dat wij zetten; dat mag bij een taalwissel opnieuw.
  function geefNaam(el) {
    if (el.hasAttribute('aria-labelledby')) return;
    const vanOns = el.hasAttribute('data-sol-naam');
    if (el.hasAttribute('aria-label') && !vanOns) return;       // de pagina gaf zelf een naam
    const naam = naamVoor(el);
    if (naam) {
      if (el.getAttribute('aria-label') !== naam) el.setAttribute('aria-label', naam);
      if (!vanOns) el.setAttribute('data-sol-naam', '');
    } else if (vanOns) {
      el.removeAttribute('aria-label');
      el.removeAttribute('data-sol-naam');
    }
  }

  // Vrije invoervelden die alleen een placeholder hadden (rechten, goedvoorbereid).
  // brief #extra-context verwijst in de HTML zelf naar zijn zichtbare vraag (aria-labelledby).
  const VELD_LABELS = { invoer: ['a11y-label-vraag', 'Je vraag'], 'ai-invoer': ['a11y-label-vraag', 'Je vraag'] };
  function geefVeldLabel(el) {
    const k = VELD_LABELS[el.id];
    if (!k) return;
    if ((el.labels && el.labels.length) || el.hasAttribute('aria-labelledby')) return;
    if (el.hasAttribute('aria-label') && !el.hasAttribute('data-sol-naam')) return;
    const v = tr(k[0], k[1]);
    if (el.getAttribute('aria-label') !== v) el.setAttribute('aria-label', v);
    el.setAttribute('data-sol-naam', '');
  }

  // Klikbare div's (18jaar, brief): rol, tabindex, staat en Enter/Spatie. Staat komt uit de klassen
  // die de pagina al zet, dus de pagina-code blijft ongewijzigd.
  const KLIKBAAR = [
    { sel: '.categorie-header', rol: 'button', attr: 'aria-expanded', aan: (el) => !!(el.closest('.categorie-kaart') || el).classList.contains('open') },
    { sel: '.rk-header', rol: 'button', attr: 'aria-expanded', aan: (el) => el.classList.contains('open') },
    { sel: '.check-box', rol: 'checkbox', attr: 'aria-checked', aan: (el) => el.classList.contains('gedaan'),
      label: (el) => { const i = el.closest('.checklist-item'); return i && i.querySelector('.checklist-tekst'); } },
    { sel: '.ap-vinkje', rol: 'checkbox', attr: 'aria-checked', aan: (el) => el.classList.contains('gedaan'),
      label: (el) => el.parentElement && el.parentElement.querySelector('.ap-tekst') },
  ];
  const KLIK_SEL = KLIKBAAR.map(k => k.sel).join(', ');
  let labelTeller = 0;
  function klikSoort(el) { return KLIKBAAR.find(k => el.matches(k.sel)); }
  function zetKlikStaat(el) {
    const k = klikSoort(el);
    if (!k) return;
    const v = k.aan(el) ? 'true' : 'false';
    if (el.getAttribute(k.attr) !== v) el.setAttribute(k.attr, v);
  }
  function maakKlikbaar(el) {
    if (el.matches('button, a, input, select, textarea')) return;
    const k = klikSoort(el);
    if (!k) return;
    if (!el.hasAttribute('role')) el.setAttribute('role', k.rol);
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
    if (!el.hasAttribute('data-sol-klik')) el.setAttribute('data-sol-klik', '');
    if (k.label && !el.hasAttribute('aria-labelledby') && !el.hasAttribute('aria-label')) {
      const l = k.label(el);
      if (l) { if (!l.id) l.id = 'sol-label-' + (++labelTeller); el.setAttribute('aria-labelledby', l.id); }
    }
    zetKlikStaat(el);
  }
  function verversKlikStaat() { document.querySelectorAll('[data-sol-klik]').forEach(zetKlikStaat); }

  function a11yVerwerk(root) {
    root = root || document.body;
    if (!root || root.nodeType !== 1) return;
    alleIn(root, KLIK_SEL).forEach(maakKlikbaar);
    verbergEmoji(root);
    const knop = root.parentElement && root.parentElement.closest(NAAM_SEL);
    if (knop) geefNaam(knop);                  // tekst ín een knop veranderd
    alleIn(root, NAAM_SEL).forEach(geefNaam);
    alleIn(root, 'textarea, input').forEach(geefVeldLabel);
  }

  let a11yObserver = null;
  function startA11yObserver() {
    if (a11yObserver || !document.body) return;
    // Synchroon genoeg: de callback draait als microtaak, vóórdat de browser de
    // toegankelijkheidsboom bijwerkt. Een nieuw chatbericht wordt dus al zonder emoji gemeld.
    a11yObserver = new MutationObserver((muts) => {
      const roots = new Set();
      for (const m of muts) {
        if (m.type === 'characterData') { if (m.target.parentElement) roots.add(m.target.parentElement); continue; }
        for (const n of m.addedNodes) {
          if (n.nodeType === 1) { if (!n.classList.contains('sol-emoji')) roots.add(n); }
          else if (n.nodeType === 3 && n.parentElement) roots.add(n.parentElement);
        }
      }
      roots.forEach(r => { if (r.isConnected) { try { a11yVerwerk(r); } catch (e) {} } });
    });
    a11yObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    // Enter/Spatie op een klikbare div = klik; na elke klik de staat (open/afgevinkt) bijwerken.
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      const el = e.target;
      if (!el || !el.hasAttribute || !el.hasAttribute('data-sol-klik')) return;
      e.preventDefault();
      el.click();
    });
    document.addEventListener('click', () => setTimeout(verversKlikStaat, 0));
  }

  // <main>, skip-link, verborgen h1 en de live-regio. Draait al als dit script wordt uitgevoerd
  // (onderaan de body), dus vóór DOMContentLoaded: dan staat de live-regio er voordat de chats hun
  // eerste berichten plaatsen, en verplaatsen we de inhoud voordat spraak.js zijn observer start
  // (anders zou die het verplaatsen zien als "ballonnen weg" en het voorlezen afbreken).
  function maakOpbouw() {
    if (!document.body) return;
    let main = document.querySelector('main, [role="main"]');
    if (!main) {
      const nav = document.getElementById('solidari-nav') || document.getElementById('solidari-nav-bar');
      const footer = document.getElementById('solidari-footer') || document.getElementById('solidari-footer-bar');
      if (nav && nav.parentElement) {
        const ouder = nav.parentElement;
        const NIET = '#solidari-nav, #solidari-nav-bar, #mob-menu, #mob-overlay, #solidari-footer, #solidari-footer-bar, ' +
          '#sol-env-balk, .sol-skip, .sol-a11y-welkom, .sol-a11y-melding, [role="dialog"], script, style, link, noscript, template';
        const kinderen = [];
        let na = false;
        for (const k of [...ouder.children]) {
          if (k === nav) { na = true; continue; }
          if (!na) continue;
          if (k === footer) break;
          if (!k.matches(NIET)) kinderen.push(k);
        }
        if (kinderen.length) {
          main = document.createElement('main');
          // 18jaar gebruikt #inhoud al voor zijn eigen inhoudsblok.
          main.id = document.getElementById('inhoud') ? 'hoofdinhoud' : 'inhoud';
          main.className = 'sol-main';
          main.tabIndex = -1;
          ouder.insertBefore(main, kinderen[0]);
          kinderen.forEach(k => main.appendChild(k));   // verplaatsen: listeners blijven
          // Chatpagina's: body is een flex-kolom; main neemt die rol over.
          try { if (/flex/.test(getComputedStyle(ouder).display)) main.classList.add('sol-main-flex'); } catch (e) {}
        }
      }
    }
    if (main) {
      if (!main.id) main.id = document.getElementById('inhoud') ? 'hoofdinhoud' : 'inhoud';
      // Verborgen h1 voor pagina's zonder kop (de 4 chats): de toolnaam, vertaald via data-i18n.
      if (!document.querySelector('h1')) {
        const pagina = window.location.pathname.split('/').pop() || 'index.html';
        const tool = TOOLS.find(t => t.url === pagina);
        const h1 = document.createElement('h1');
        h1.className = 'sol-sr-only';
        h1.setAttribute('data-geen-lees', '');
        if (tool) { h1.setAttribute('data-i18n', tool.i18n); h1.textContent = tool.naam; }
        else h1.textContent = document.title || 'Solidari';
        main.insertBefore(h1, main.firstChild);
      }
      if (!document.querySelector('.sol-skip')) {
        const skip = document.createElement('a');
        skip.className = 'sol-skip';
        skip.href = '#' + main.id;
        skip.setAttribute('data-i18n', 'a11y-naar-inhoud');
        skip.textContent = tr('a11y-naar-inhoud', 'Naar inhoud');
        skip.addEventListener('click', (e) => {
          e.preventDefault();                       // geen hash-wissel (sommige pagina's luisteren daarop)
          const doel = document.querySelector('main');
          if (doel) { doel.focus(); try { doel.scrollIntoView({ block: 'start' }); } catch (x) {} }
        });
        document.body.insertBefore(skip, document.body.firstChild);
      }
    }
    // Chatberichten melden (I-3). De keuzeknoppen staan op alle vier de chats buiten #berichten
    // (rechten: #keuze-zone), dus die worden niet mee aangekondigd maar blijven gewoon bereikbaar.
    const log = document.getElementById('berichten');
    if (log) {
      if (!log.hasAttribute('role')) log.setAttribute('role', 'log');
      if (!log.hasAttribute('aria-live')) log.setAttribute('aria-live', 'polite');
      // De lijst scrollt zelf (overflow-y:auto): met het toetsenbord moet hij te bereiken zijn.
      if (!log.hasAttribute('tabindex')) log.tabIndex = 0;
    }
  }

  window.Solidari = window.Solidari || {};
  Solidari.a11y = { verbergEmoji, verwerk: a11yVerwerk, opbouw: maakOpbouw };

  // ── Init ───────────────────────────────────────────────────────────────
  function init() {
    detecteerOmgeving();
    inject();
    koppelToolsDropdown();
    koppelTaalDropdown();
    koppelHamburger();
    koppelTaalKnoppen();
    koppelLuisterToggle();
    maakWelkom();
    try { maakOpbouw(); a11yVerwerk(document.body); startA11yObserver(); } catch (e) {}
  }

  // Schermlezer-basis meteen (zie maakOpbouw); de rest wacht op DOMContentLoaded.
  try { maakOpbouw(); a11yVerwerk(document.body); startA11yObserver(); } catch (e) {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
