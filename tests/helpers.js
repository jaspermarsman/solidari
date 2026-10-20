// Gedeelde constanten en meetfuncties voor de acceptatietests.
const PAGES = [
  'index.html', 'brief.html', 'budgethulp.html', 'loont-werken.html',
  'naturalisatie.html', '18jaar.html', 'rechten.html', 'goedvoorbereid.html',
  'over.html', 'feedback.html', 'vertaalhulp.html',
];

const TALEN = ['NL', 'EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL'];

// Zet de taal vóór het laden via localStorage, zodat components.js hem toepast.
// Zet ook het welkom-gezien-vlaggetje: het welkomstscherm mag de tests niet blokkeren
// (de welkomstscherm-test zelf gebruikt metTaal niet).
async function metTaal(page, taal) {
  await page.addInitScript((t) => {
    try { localStorage.setItem('solidari-taal', t); localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {}
  }, taal);
}

// In-page meting: raakvlakken, toegankelijke namen, tekstblokken zonder data-lees.
const METING_IN_PAGE = () => {
  const zichtbaar = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  const naam = (el) => {
    const al = el.getAttribute('aria-label');
    if (al && al.trim()) return al.trim();
    const t = (el.textContent || '').trim();
    if (t) return t;
    const title = el.getAttribute('title');
    if (title && title.trim()) return title.trim();
    const img = el.querySelector('img[alt]');
    if (img && img.getAttribute('alt').trim()) return img.getAttribute('alt').trim();
    const svgTitle = el.querySelector('svg title');
    if (svgTitle && svgTitle.textContent.trim()) return svgTitle.textContent.trim();
    return '';
  };
  const interactief = [...document.querySelectorAll('a[href], button, input, select, textarea, [role="button"]')].filter(zichtbaar);
  let kleineRaakvlakken = 0, zonderNaam = 0;
  for (const el of interactief) {
    const r = el.getBoundingClientRect();
    if (r.width < 56 || r.height < 56) kleineRaakvlakken++;
    // inputs/select/textarea hebben een label elders; tel alleen knop/link zonder naam
    if ((el.matches('a[href], button, [role="button"]')) && !naam(el)) zonderNaam++;
  }
  const blokken = [...document.querySelectorAll('p, h1, h2, h3, h4, li, dt, dd, blockquote')]
    .filter(zichtbaar)
    .filter(el => (el.textContent || '').trim().length > 40);
  const zonderLees = blokken.filter(el => !el.closest('[data-lees]') && !el.hasAttribute('data-lees')).length;
  return {
    interactief: interactief.length,
    kleineRaakvlakken,
    zonderNaam,
    tekstblokken: blokken.length,
    tekstblokkenZonderLees: zonderLees,
  };
};

// De API-hosts van de site (PLAN 11, K-6). Tests onderscheppen alleen deze, nooit de site zelf:
// het oude patroon /workers\.dev|solidari\.nl/ ving met SOL_BASE_URL=https://solidari.nl ook de pagina.
const API_HOSTS = /^https:\/\/(api\.solidari\.nl|api-test\.solidari\.nl|solidari-digi-hulp-worker\.jaspermarsman\.workers\.dev)\//;
const IS_PRODUCTIE = /^https?:\/\/(www\.)?solidari\.nl\/?$/.test(process.env.SOL_BASE_URL || '');

// Elk verzoek naar de API krijgt een vast JSON-antwoord; body is een object of een kant-en-klare string.
function stubApi(page, body) {
  return page.route(API_HOSTS, (r) => r.fulfill({
    status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  }));
}

module.exports = { PAGES, TALEN, metTaal, METING_IN_PAGE, API_HOSTS, IS_PRODUCTIE, stubApi };
