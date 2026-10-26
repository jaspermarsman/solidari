// Rooktest van tools/worker/solidari-worker.js tegen de echte API (PLAN 8 fase 3/4).
//
// Draaien:  node tools/modellen/worker-echt.mjs [aantal=2] [talen]
//           met 'talen': de budgethulp-prompt in UK, PL, TR en TI, en /api/digi met een vraag
//           in het Pools en Oekraïens; controleert of het antwoord in de doeltaal is.
// Draait de Worker-code lokaal in Node met de echte fetch. Er wordt niets gedeployd.
// Sleutel: ANTHROPIC_API_KEY uit de omgeving, anders uit ~/.config/solidari/geheimen.env;
// hij wordt nooit geprint. Alleen verzonnen invoer.

import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const hier = dirname(fileURLToPath(import.meta.url));
const root = join(hier, '..', '..');
let bron = readFileSync(join(root, 'tools', 'worker', 'solidari-worker.js'), 'utf-8');
// Vergelijken met een ander model zonder het bestand te wijzigen: WORKER_MODEL, WORKER_EFFORT
// ('' = geen effort) en WORKER_MAX vervangen de constanten alleen in het geheugen van deze test.
const vervang = (naam, waarde) => { bron = bron.replace(new RegExp(`^const ${naam} = .*?;`, 'm'), `const ${naam} = ${waarde};`); };
if (process.env.WORKER_MODEL) vervang('MODEL', JSON.stringify(process.env.WORKER_MODEL));
if (process.env.WORKER_EFFORT !== undefined) vervang('EFFORT', JSON.stringify(process.env.WORKER_EFFORT));
if (process.env.WORKER_MAX) { vervang('MAX_ANALYSE', Number(process.env.WORKER_MAX)); vervang('MAX_DIGI', Number(process.env.WORKER_MAX)); }
console.log('Worker-constanten:', bron.match(/^const (MODEL|MAX_ANALYSE|MAX_DIGI|EFFORT) = .*$/gm).join(' | '));
const { default: worker } = await import('data:text/javascript,' + encodeURIComponent(bron));

function sleutel() {
  let k = (process.env.ANTHROPIC_API_KEY || '').trim();
  const pad = join(homedir(), '.config', 'solidari', 'geheimen.env');
  if (!k && existsSync(pad)) {
    for (const regel of readFileSync(pad, 'utf-8').split('\n')) {
      const m = regel.match(/^\s*(?:export\s+)?ANTHROPIC_API_KEY\s*=\s*(.*)$/);
      if (m) k = m[1].trim().replace(/^['"]|['"]$/g, '');
    }
  }
  if (!k) { console.log('GEEN SLEUTEL'); process.exit(2); }
  return k;
}
const env = { ANTHROPIC_API_KEY: sleutel() };
const schoon = (t) => String(t).replace(/sk-ant-[0-9A-Za-z_-]{8,}/g, '[sleutel]');

// Het systeemprompt van rechten.html, letterlijk uit de pagina (alleen gelezen).
const rechten = readFileSync(join(root, 'rechten.html'), 'utf-8');
const m = rechten.match(/const SYSTEM_PROMPT = `([\s\S]*?)`;/);
const RECHTEN_SYSTEEM = m ? m[1] : null;

const BUDGET_SYSTEEM = `Je bent een vriendelijke budgetcoach voor Solidari.
TAAL: Antwoord UITSLUITEND in het Nederlands. Geen uitzonderingen.

Geef advies in 3 delen:

1. BUDGETANALYSE (max 3 zinnen): Bespreek de financiele situatie eerlijk maar respectvol. Benoem het belangrijkste knelpunt.

2. HULP IN UTRECHT: Geef voor elke relevante categorie specifieke informatie voor gemeente Utrecht:
- Bijzondere bijstand: hoe aanvragen
- Kwijtschelding gemeentebelastingen: hoe aanvragen
- Voedselbank: locatie als je die kent
- Schuldhulpverlening gemeente Utrecht: contactgegevens
Als je iets niet zeker weet, zeg dat eerlijk en verwijs naar de gemeente-website of het Sociaal Wijkteam.

3. TOP 3 ACTIES: Drie concrete stappen die nu gezet kunnen worden.

Sluit af met: Neem de Excel of PDF mee naar je begeleider.
Maximaal 400 woorden.`;
const BUDGET_BERICHT = `BUDGETOVERZICHT
Huishouden: alleenstaande, 1 kind (8 jaar), gemeente Utrecht
INKOMSTEN: bijstand €1.380, kinderbijslag €120, kindgebonden budget €260
UITGAVEN: huur €780, energie €190, zorgverzekering €150, boodschappen €280, telefoon €35, vervoer €40
SALDO: €285 per maand (overschot)`;

async function post(route, data) {
  const req = new Request('https://worker.test' + route, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://solidari.nl' },
    body: JSON.stringify(data),
  });
  const t0 = Date.now();
  const res = await worker.fetch(req, env);
  return { status: res.status, data: await res.json(), duur: (Date.now() - t0) / 1000 };
}

const aantal = Number(process.argv[2] || 2);
const talenModus = process.argv[3] === 'talen';
const uitslag = [];
const NL = new Set('de het een van en uw je u niet voor binnen dagen dit deze moet moeten heeft hebt wordt kunt kan naar met op als bij of is zijn er wat'.split(' '));
const SCHRIFT = { uk: /[\u0400-\u04FF]/, ti: /[\u1200-\u139F\u2D80-\u2DDF\uAB00-\uAB2F]/ };
function taalCheck(tekst, taal) {
  if (!taal) return {};
  const woorden = tekst.toLowerCase().match(/\p{L}+/gu) || [];
  const nl = woorden.filter(w => NL.has(w)).length / Math.max(1, woorden.length);
  const letters = [...tekst].filter(ch => /\p{L}/u.test(ch));
  const schrift = SCHRIFT[taal] ? letters.filter(ch => SCHRIFT[taal].test(ch)).length / Math.max(1, letters.length) : null;
  return { taal, nl_aandeel: +nl.toFixed(2), schrift_aandeel: schrift === null ? undefined : +schrift.toFixed(2),
           in_doeltaal: nl < 0.2 && (schrift === null || schrift >= 0.6) };
}
const TAALNAAM = { uk: 'Ukrainian', pl: 'Polish', tr: 'Turkish', ti: 'Tigrinya' };
const alleenRoute = process.argv[4] ? '/api/' + process.argv[4] : null;
const gevallen = talenModus ? [
  ...['uk', 'pl', 'tr', 'ti'].map(t => ['/api/analyse',
    { systeem: BUDGET_SYSTEEM.replace('in het Nederlands', 'in het ' + TAALNAAM[t]), bericht: BUDGET_BERICHT }, t]),
  ['/api/digi', { systeem: RECHTEN_SYSTEEM, berichten: [{ role: 'user', content:
    'Mieszkam w Holandii od 3 miesięcy z zezwoleniem na pobyt. Czy mam prawo do zasiłku na ubezpieczenie zdrowotne (zorgtoeslag) i jak go złożyć?' }] }, 'pl'],
  ['/api/digi', { systeem: RECHTEN_SYSTEEM, berichten: [{ role: 'user', content:
    'Я живу в Нідерландах 3 місяці з посвідкою на проживання. Чи маю я право на zorgtoeslag і як його отримати?' }] }, 'uk'],
].filter(g => !alleenRoute || g[0] === alleenRoute) : [
  ['/api/analyse', { systeem: BUDGET_SYSTEEM, bericht: BUDGET_BERICHT }],
  ['/api/digi', { systeem: RECHTEN_SYSTEEM, berichten: [
    { role: 'user', content: 'Ik woon sinds 3 maanden in Nederland met een verblijfsvergunning. Heb ik recht op zorgtoeslag en hoe vraag ik die aan?' }] }],
];
if (!RECHTEN_SYSTEEM) console.log('LET OP: SYSTEM_PROMPT niet gevonden in rechten.html');
for (const [route, data, taal] of gevallen) {
  for (let n = 1; n <= aantal; n++) {
    let r;
    try { r = await post(route, data); }
    catch (e) { r = { status: 'uitzondering', data: { error: schoon(e.message) }, duur: 0 }; }
    const regel = {
      route, n, status: r.status, duur_s: r.duur,
      tekst_tekens: (r.data.tekst || '').length,
      bronnen: Array.isArray(r.data.bronnen) ? r.data.bronnen.length : undefined,
      fout: r.data.error ? schoon(r.data.error) : undefined, type: r.data.type,
      begin: (r.data.tekst || '').slice(0, 80).replace(/\s+/g, ' '),
      ...taalCheck(r.data.tekst || '', taal),
    };
    uitslag.push(regel);
    if (process.env.WORKER_UIT) {
      const { writeFileSync } = await import('node:fs');
      writeFileSync(join(process.env.WORKER_UIT, `worker-${process.env.WORKER_MODEL || 'branch'}-${route.replace(/\W/g, '')}-${taal || 'nl'}-${n}.txt`),
                    r.data.tekst || JSON.stringify(r.data), 'utf-8');
    }
    console.log(JSON.stringify(regel));
  }
}
const goed = uitslag.filter(u => u.status === 200 && u.tekst_tekens > 200 && u.duur_s < 45 &&
                                 u.in_doeltaal !== false).length;
console.log(`\n${goed}/${uitslag.length} geslaagd (200, >200 tekens, < 45 s zoals de budgethulp-timeout` +
            (talenModus ? ', in de doeltaal)' : ')'));
process.exit(goed === uitslag.length ? 0 : 1);
