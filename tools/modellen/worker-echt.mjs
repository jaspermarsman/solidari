// Rooktest van tools/worker/solidari-worker.js tegen de echte API (PLAN 8 fase 3/4).
//
// Draaien:  node tools/modellen/worker-echt.mjs [aantal=2] [talen]
//           met 'talen': de budgethulp-prompt in UK, PL, TR en TI, en /api/digi met een vraag
//           in het Pools en Oekraïens; controleert of het antwoord in de doeltaal is.
// PLAN 12 (taaldrift):
//   node tools/modellen/worker-echt.mjs --variant V0,V1,V2,V3 --model claude-haiku-5-5 \
//        --route digi|analyse --talen pl,tr,uk,ti,ar --herhaal 3 --uit <map> [--droog] [--plafond 15]
//   De prompts komen letterlijk uit rechten.html en budgethulp.html (alleen gelezen); alleen de
//   taalinstructie verschilt per variant. --droog schrijft alleen de prompts weg. Elke aanroep
//   telt mee in kosten.json naast de uitvoermap (zelfde bestand als meet.py); bij het plafond stopt
//   de meting. Taalcontrole volgens taalregels.json (T-3).
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
const vlag = (naam, std) => { const i = process.argv.indexOf('--' + naam); return i < 0 ? std : (process.argv[i + 1] ?? true); };
const variantModus = process.argv.includes('--variant');
// --model zet ook effort en plafond volgens PLAN 12, T-1 (4.5 zonder effort, 5.5-modellen low en 4096).
if (variantModus && vlag('model')) {
  process.env.WORKER_MODEL = vlag('model');
  if (!vlag('model').startsWith('claude-haiku-4-5')) { process.env.WORKER_EFFORT ??= 'low'; process.env.WORKER_MAX ??= '4096'; }
}
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


if (variantModus) { await variantMeting(); process.exit(0); }

// ── PLAN 12: varianten ────────────────────────────────────────────────────
async function variantMeting() {
  const { writeFileSync, appendFileSync, mkdirSync } = await import('node:fs');
  const R = JSON.parse(readFileSync(join(hier, 'taalregels.json'), 'utf-8'));
  const route = vlag('route', 'digi');
  const varianten = String(vlag('variant', 'V0')).split(',');
  const talen = String(vlag('talen', 'pl,tr,uk,ti,ar')).split(',');
  const herhaal = Number(vlag('herhaal', 3));
  const uit = vlag('uit', null);
  const droog = process.argv.includes('--droog');
  const plafond = Number(vlag('plafond', 15));
  if (!uit) { console.log('--uit ontbreekt'); process.exit(2); }
  mkdirSync(uit, { recursive: true });
  const kostenPad = join(uit, '..', 'kosten.json');
  const model = process.env.WORKER_MODEL || bron.match(/^const MODEL = '(.*?)'/m)[1];
  const TARIEF = { 'claude-haiku-4-5-20251001': [1, 5], 'claude-haiku-5-5': [0.10, 0.50], 'claude-sonnet-5-5': [2, 10] };
  if (!TARIEF[model]) { console.log('onbekend tarief voor ' + model); process.exit(2); }

  // Budgethulp: systeemprompt en taalnamen letterlijk uit de pagina.
  const bh = readFileSync(join(root, 'budgethulp.html'), 'utf-8');
  const sjabloon = bh.match(/const systeemprompt = `([\s\S]*?)`\n/)[1];
  const paginaNamen = Function('return ' + bh.match(/const taalNamen = (\{[^}]*\});/)[1])();
  const GEMEENTE = 'Utrecht';
  const ENGELS = { pl: 'Polish', tr: 'Turkish', uk: 'Ukrainian', ti: 'Tigrinya', ar: 'Arabic', ro: 'Romanian', fa: 'Dari (Farsi)', en: 'English', nl: 'Nederlands' };
  const budgetSysteem = (antwoordTaal) => sjabloon.replaceAll('${antwoordTaal}', antwoordTaal)
    .replaceAll('${gemeente.toUpperCase()}', GEMEENTE.toUpperCase()).replaceAll('${gemeente}', GEMEENTE);
  const BERICHT = `BUDGETOVERZICHT VOOR AI-ANALYSE
Situatie: eenoudergezin
Gemeente: Utrecht

INKOMSTEN (per maand):
- Netto loon/uitkering: €1380
- Geen huurtoeslag ontvangen
- Zorgtoeslag: €123

UITGAVEN (per maand):
- Huur/hypotheek (bruto): €780 | netto woonlast: €780 | woonquote: 52%
- Energie: €190
- Telefoon & internet: €35
- Zorgverzekering: €150
- Vervoer: €40
- Boodschappen: €280
- TOTAAL UITGAVEN: €1475

SALDO: €-95 per maand (TEKORT)

GESIGNALEERDE KNELPUNTEN:
- Woonquote hoog: 52% (advies max 40%)
- Geen huurtoeslag (mogelijk gemist)
- Maandelijks tekort: €95

Nibud-referentie voor deze situatie:
- Huur richtlijn: €700 | Voeding richtlijn: €350 | Energie richtlijn: €150`;
  // Verzonnen vragen (zorgtoeslag, zoals PLAN 8). TI en AR zelf geschreven, niet nagelezen.
  const VRAAG = {
    pl: 'Mieszkam w Holandii od 3 miesięcy z zezwoleniem na pobyt. Czy mam prawo do zasiłku na ubezpieczenie zdrowotne (zorgtoeslag) i jak go złożyć?',
    uk: 'Я живу в Нідерландах 3 місяці з посвідкою на проживання. Чи маю я право на zorgtoeslag і як його отримати?',
    tr: '3 aydır oturma izniyle Hollanda\'da yaşıyorum. Sağlık sigortası yardımı (zorgtoeslag) almaya hakkım var mı ve nasıl başvururum?',
    ar: 'أعيش في هولندا منذ 3 أشهر بتصريح إقامة. هل يحق لي الحصول على بدل التأمين الصحي (zorgtoeslag) وكيف أقدّم الطلب؟',
    ti: 'ምስ ፍቓድ መንበሪ ንሰለስተ ኣዋርሕ ኣብ ሆላንድ እየ ዝነብር። ናይ ጥዕና ውሕስነት ሓገዝ (zorgtoeslag) ክረክብ መሰል ኣለኒ ድዩ? ከመይ ገይረ ክሓትት እኽእል?',
  };

  function prompts(v, taal) {
    const r = R[taal];
    const slot = v === 'V1' ? `(Antwoord in het ${r.naam_nl}.)` : (v === 'V2' || v === 'V3') ? r.kort : '';
    const keuze = `\n\n## Gekozen taal\n\nDe gebruiker heeft gekozen voor: ${r.naam_nl}. Schrijf je hele antwoord in het ${r.naam_nl}, ook al zijn deze instructies in het Nederlands. Alleen als de gebruiker zelf duidelijk in een andere taal schrijft, wissel je mee naar die taal.`;
    if (route === 'digi') {
      const systeem = v === 'V3' ? RECHTEN_SYSTEEM + keuze : RECHTEN_SYSTEEM;
      const vraag = slot ? `${VRAAG[taal]}\n\n${slot}` : VRAAG[taal];
      return ['/api/digi', { systeem, berichten: [{ role: 'user', content: vraag }] }];
    }
    // V0 = de pagina nu, inclusief de taalnaam uit taalNamen (PL en RO ontbreken daar → 'Nederlands').
    // V1–V3 vullen dat gat (Engelse naam, zoals de rest van de lijst); anders spreken de regels elkaar tegen.
    const naam = v === 'V0' ? (paginaNamen[taal] || 'Nederlands') : (paginaNamen[taal] || ENGELS[taal]);
    const systeem = budgetSysteem(naam) + (v === 'V3' ? keuze.replace('## Gekozen taal\n\n', 'GEKOZEN TAAL: ').replace('deze instructies', 'deze instructies en het budgetoverzicht').replace(/ Alleen als de gebruiker .*$/, '') : '');
    const bericht = slot ? `${BERICHT}\n\n${slot}` : BERICHT;
    return ['/api/analyse', { systeem, bericht }];
  }

  if (droog) {
    const pmap = join(uit, '..', 'prompts');
    mkdirSync(pmap, { recursive: true });
    for (const v of varianten) for (const taal of talen) {
      const [, data] = prompts(v, taal);
      const gebruiker = data.bericht ?? data.berichten.at(-1).content;
      writeFileSync(join(pmap, `${route}-${v}-${taal}.txt`), `=== SYSTEEM ===\n${data.systeem}\n\n=== GEBRUIKER ===\n${gebruiker}\n`, 'utf-8');
    }
    console.log(`droog: ${varianten.length * talen.length} prompts in ${pmap}`);
    return;
  }

  // Gebruik per aanroep: de Anthropic-respons wordt onderschept (alleen usage, geen inhoud).
  const echteFetch = globalThis.fetch;
  let usage = null;
  globalThis.fetch = async (...args) => {
    const res = await echteFetch(...args);
    try { usage = (await res.clone().json()).usage || null; } catch { usage = null; }
    return res;
  };
  const leesKosten = () => existsSync(kostenPad) ? JSON.parse(readFileSync(kostenPad, 'utf-8')) : { totaal_usd: 0, aanroepen: 0, per_bron: {} };

  for (const v of varianten) for (const taal of talen) {
    const [pad, data] = prompts(v, taal);
    for (let n = 1; n <= herhaal; n++) {
      const k0 = leesKosten();
      if (k0.totaal_usd >= plafond) { console.log(`PLAFOND: geschatte kosten $${k0.totaal_usd.toFixed(2)} ≥ $${plafond}`); process.exit(3); }
      usage = null;
      let r;
      try { r = await post(pad, data); }
      catch (e) { r = { status: 'uitzondering', data: { error: schoon(e.message) }, duur: 0 }; }
      const zoek = usage?.server_tool_use?.web_search_requests || 0;
      const [ti, to] = TARIEF[model];
      const usd = usage ? usage.input_tokens / 1e6 * ti + usage.output_tokens / 1e6 * to + zoek * 0.01 : 0;
      const k = leesKosten();
      k.totaal_usd = +(k.totaal_usd + usd).toFixed(5); k.aanroepen += 1;
      k.per_bron[route] = +((k.per_bron[route] || 0) + usd).toFixed(5);
      writeFileSync(kostenPad, JSON.stringify(k, null, 1));
      const tekst = r.data.tekst || '';
      const t = taalcontrole12(tekst, taal, R);
      const regel = {
        model, route, variant: v, taal, n, status: r.status, duur_s: r.duur, tekst_tekens: tekst.length,
        bronnen: Array.isArray(r.data.bronnen) ? r.data.bronnen.length : undefined,
        zoekopdrachten: zoek, input_tokens: usage?.input_tokens, output_tokens: usage?.output_tokens,
        kosten_usd: +usd.toFixed(5), fout: r.data.error ? schoon(r.data.error) : undefined, type: r.data.type,
        ...t,
      };
      regel.overig_ok = r.status === 200 && tekst.length > 200 && r.duur < 45;
      regel.geslaagd = regel.overig_ok && t.in_doeltaal;
      writeFileSync(join(uit, `${model}-${route.replace(/\W/g, '')}-${v}-${taal}-${n}.txt`), tekst || JSON.stringify(r.data), 'utf-8');
      appendFileSync(join(uit, 'varianten.jsonl'), JSON.stringify(regel) + '\n');
      const { nl_zin_voorbeeld, ...kort } = regel;
      console.log(JSON.stringify(kort));
    }
  }
}

// Strengere taalcontrole (T-3), dezelfde regels als taalcontrole() in meet.py.
function taalcontrole12(tekst, taal, R) {
  const D = R._drempels, NLW = new Set(R._nl_woorden);
  const t = String(tekst).replace(/<[^>]+>/g, ' ').replace(/https?:\/\/\S+|www\.\S+|\b[\w.-]+\.(?:nl|com|org|eu|gov)\b\S*/g, ' ');
  const woorden = (x) => x.toLowerCase().match(/[\p{L}\p{M}]+/gu) || [];
  const doelOk = (x) => {
    const k = R[taal]?.kenmerken || {}; const d = {};
    const letters = [...x].filter(ch => /\p{L}/u.test(ch));
    if (!Object.keys(k).length) return [true, d];
    let ok = true;
    if (k.schrift) {
      const pat = new RegExp(k.schrift, 'u');
      const eig = letters.filter(ch => pat.test(ch)); const n = Math.max(1, eig.length);
      d.schrift_aandeel = +(eig.length / Math.max(1, letters.length)).toFixed(2);
      ok = d.schrift_aandeel >= D.schrift_aandeel;
      if (k.eigen) { d.eigen_per_letter = +(eig.filter(ch => k.eigen.includes(ch)).length / n).toFixed(3); ok = ok && d.eigen_per_letter >= D.eigen_per_letter; }
      if (k.vreemd) { d.vreemd_per_letter = +(eig.filter(ch => k.vreemd.includes(ch)).length / n).toFixed(3); ok = ok && d.vreemd_per_letter < D.vreemd_per_letter; }
    } else {
      const w = woorden(x);
      if (k.tekens) { d.tekens_per_letter = +(letters.filter(ch => k.tekens.includes(ch)).length / Math.max(1, letters.length)).toFixed(3); ok = d.tekens_per_letter >= D.tekens_per_letter; }
      if (k.woorden) { d.woorden_aandeel = +(w.filter(y => k.woorden.includes(y)).length / Math.max(1, w.length)).toFixed(2); ok = ok && d.woorden_aandeel >= (k.woorden_drempel ?? D.woorden_aandeel); }
    }
    return [ok, d];
  };
  const w = woorden(t);
  const r = { nl_aandeel: +(w.filter(x => NLW.has(x)).length / Math.max(1, w.length)).toFixed(2) };
  const [ok, d] = doelOk(t);
  Object.assign(r, d, { doeltaal_kenmerken: ok });
  const nlZinnen = [];
  if (taal !== 'nl') for (const zin of t.split(/[.!?؟።\n]+/)) {
    const zw = woorden(zin);
    if (zw.length < D.min_woorden_zin) continue;
    const nl = zw.filter(x => NLW.has(x)).length / zw.length;
    if (nl >= D.nl_aandeel_zin && !doelOk(zin)[0]) nlZinnen.push(zin.trim().slice(0, 100));
  }
  r.nl_zinnen = nlZinnen.length;
  if (nlZinnen.length) r.nl_zin_voorbeeld = nlZinnen[0];
  r.in_doeltaal = taal === 'nl' || (r.nl_aandeel < D.nl_aandeel_antwoord && ok && nlZinnen.length === 0);
  return r;
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
