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
//   telt mee in kosten/ naast de uitvoermap (zelfde map als meet.py); bij het plafond stopt
//   de meting. Taalcontrole volgens taalregels.json (T-3).
// PLAN 13 (hermeting): --variant PAGINA --route digi|analyse|gv --talen alle
//   De prompt-functies komen letterlijk uit de branchversie van de pagina's en worden uitgevoerd:
//   bouwAiPrompt() uit budgethulp.html, bouwAiVerzoek() uit rechten.html, bouwSystemPrompt() en
//   bouwAiBerichten() uit goedvoorbereid.html. Extra controle: geen Nederlandse slotzin in een
//   niet-NL antwoord. Bij gv (Goed voorbereid) tellen Nederlandse zinnen tussen aanhalingstekens
//   apart (nl_citaten): de pagina geeft bewust Nederlandse zinnen om tegen de dokter te zeggen.
//   Met --live <worker-url> gaat het verzoek naar de gedeployde Worker (rooktest na deploy).
// PLAN 14 (B-4): --route gv --zeg  meet de zin om te zeggen. Herhaling 1 en 3 is de vraag aan de
//   klantmanager, herhaling 2 een afspraak bij de huisarts. Drie controles per antwoord:
//   (a) zeg_nl: een zin tussen aanhalingstekens in het Nederlands (NL-woordaandeel ≥ 0,4);
//   (b) in_doeltaal: de rest (zonder de citaten) slaagt voor T-3;
//   (c) geen_nl_alinea: buiten de citaten geen alinea die Nederlands is.
//   geslaagd = (a) en (b) en (c) en de gewone eisen (status 200, > 200 tekens, < 45 s).
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
// --live <url>: rooktest tegen de gedeployde Worker in plaats van de lokale code (PLAN 13 fase 5.3).
// Dan is er geen sleutel nodig, en geen kostenregistratie (de Worker geeft geen usage terug).
const LIVE = vlag('live', null);
const env = LIVE ? {} : { ANTHROPIC_API_KEY: sleutel() };
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
  if (LIVE) {
    const t0 = Date.now();
    const res = await fetch(LIVE.replace(/\/$/, '') + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://solidari.nl' },
      body: JSON.stringify(data),
    });
    return { status: res.status, data: await res.json(), duur: (Date.now() - t0) / 1000 };
  }
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
  const { writeFileSync, appendFileSync, mkdirSync, readdirSync } = await import('node:fs');
  const R = JSON.parse(readFileSync(join(hier, 'taalregels.json'), 'utf-8'));
  const route = vlag('route', 'digi');
  const varianten = String(vlag('variant', 'V0')).split(',');
  const talen = vlag('talen', 'pl,tr,uk,ti,ar') === 'alle' ? ['ar', 'ti', 'tr', 'uk', 'pl', 'ro', 'fa', 'en', 'nl']
    : String(vlag('talen', 'pl,tr,uk,ti,ar')).split(',');
  const herhaal = Number(vlag('herhaal', 3));
  const uit = vlag('uit', null);
  const droog = process.argv.includes('--droog');
  const plafond = Number(vlag('plafond', 15));
  if (!uit) { console.log('--uit ontbreekt'); process.exit(2); }
  mkdirSync(uit, { recursive: true });
  // Live: het model is dat van de gedeployde Worker en niet uit het antwoord af te lezen.
  const model = LIVE ? 'live' : (process.env.WORKER_MODEL || bron.match(/^const MODEL = ['"](.*?)['"]/m)[1]);
  const kostenMap = join(uit, '..', 'kosten');
  mkdirSync(kostenMap, { recursive: true });
  const kostenPad = join(kostenMap, `${route}-${model}-${process.pid}.json`);
  const eigen = { usd: 0, aanroepen: 0 };
  const totaal = () => readdirSync(kostenMap).filter(f => f.endsWith('.json'))
    .reduce((som, f) => { try { return som + JSON.parse(readFileSync(join(kostenMap, f), 'utf-8')).usd; } catch { return som; } }, 0);
  const TARIEF = { 'claude-haiku-4-5-20251001': [1, 5], 'claude-haiku-5-5': [0.10, 0.50], 'claude-sonnet-5-5': [2, 10] };
  if (!LIVE && !TARIEF[model]) { console.log('onbekend tarief voor ' + model); process.exit(2); }

  // Budgethulp: systeemprompt en taalnamen letterlijk uit de pagina.
  const bh = readFileSync(join(root, 'budgethulp.html'), 'utf-8');
  // V0–V3 bouwen op de oude prompt (vóór PLAN 13); op een branch zonder die prompt alleen PAGINA.
  const sjabloon = (bh.match(/const systeemprompt = `([\s\S]*?)`\n/) || [])[1];
  const taalNamenBron = (bh.match(/const taalNamen = (\{[^}]*\});/) || [])[1];
  const paginaNamen = taalNamenBron ? Function('return ' + taalNamenBron)() : {};
  if (!sjabloon && varianten.some(v => v !== 'PAGINA') && route === 'analyse') {
    console.log('V0–V3 voor budgethulp vragen de oude prompt; deze pagina heeft bouwAiPrompt(): gebruik --variant PAGINA');
    process.exit(2);
  }
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

  // ── PAGINA: de prompt-functies letterlijk uit de branchversie van de HTML ──
  function knip(bron, begin) {
    const i = bron.indexOf(begin);
    if (i < 0) throw new Error('niet gevonden in pagina: ' + begin);
    const eind = bron.indexOf('\n}', i);
    return bron.slice(i, bron.indexOf('\n', eind + 2) + 1);
  }
  const PAGINA = {};
  if (varianten.includes('PAGINA')) {
    const bh2 = readFileSync(join(root, 'budgethulp.html'), 'utf-8');
    PAGINA.analyse = Function(knip(bh2, 'const AI_TAAL = {') + knip(bh2, 'function bouwAiPrompt(') +
                              'return bouwAiPrompt;')();
    const rh = readFileSync(join(root, 'rechten.html'), 'utf-8');
    PAGINA.digi = Function('const SYSTEM_PROMPT = ' + JSON.stringify(RECHTEN_SYSTEEM) + ';\n' +
                           knip(rh, 'const AI_TAAL = {') + knip(rh, 'function bouwAiVerzoek(') +
                           'return bouwAiVerzoek;')();
    const gv = readFileSync(join(root, 'goedvoorbereid.html'), 'utf-8');
    PAGINA.gv = Function('huidigeCategorie', 'huidigeSituatie', 'taal', 'geschiedenis',
      knip(gv, 'function bouwSystemPrompt(') + knip(gv, 'const AI_TAALREGEL = {') +
      knip(gv, 'function bouwAiBerichten(') +
      'return { systeem: bouwSystemPrompt(), berichten: bouwAiBerichten(geschiedenis, taal) };');
    globalThis.window = globalThis;
    const gvData = readFileSync(join(root, 'goedvoorbereid-data.js'), 'utf-8');
    Function(gvData)();
    PAGINA.gvData = Object.values(globalThis).find(x => x && x.NL && x.NL.categorieen);
  }
  // Verzonnen vragen voor de talen die PLAN 12 nog niet had (NL, EN, RO, FA) en voor Goed voorbereid.
  // Zelf geschreven, niet nagelezen.
  Object.assign(VRAAG, {
    nl: 'Ik woon sinds 3 maanden in Nederland met een verblijfsvergunning. Heb ik recht op zorgtoeslag en hoe vraag ik die aan?',
    en: 'I have been living in the Netherlands for 3 months with a residence permit. Am I entitled to healthcare allowance (zorgtoeslag), and how do I apply?',
    ro: 'Locuiesc în Olanda de 3 luni cu permis de ședere. Am dreptul la alocația pentru asigurarea de sănătate (zorgtoeslag) și cum o solicit?',
    fa: 'من سه ماه است با اجازه اقامت در هالند زندگی می‌کنم. آیا حق دریافت کمک‌هزینه بیمه صحی (zorgtoeslag) را دارم و چگونه درخواست کنم؟',
  });
  const GV_VRAAG = {
    nl: 'Volgende week heb ik een gesprek met mijn klantmanager over mijn bijstand. Ik ben bang dat ik het niet goed begrijp. Wat kan ik zeggen?',
    en: "Next week I have a meeting with my client manager about my benefits. I'm afraid I won't understand everything. What can I say?",
    pl: 'W przyszłym tygodniu mam rozmowę z moim opiekunem w sprawie zasiłku. Boję się, że nie wszystko zrozumiem. Co mogę powiedzieć?',
    tr: 'Gelecek hafta sosyal yardımım hakkında müşteri temsilcimle bir görüşmem var. Her şeyi anlamamaktan korkuyorum. Ne söyleyebilirim?',
    uk: 'Наступного тижня в мене розмова з моїм клієнтським менеджером про мою допомогу. Боюся, що не все зрозумію. Що я можу сказати?',
    ro: 'Săptămâna viitoare am o discuție cu consilierul meu despre ajutorul social. Mi-e teamă că nu voi înțelege tot. Ce pot să spun?',
    ar: 'الأسبوع القادم لدي موعد مع مسؤول ملفي بخصوص المساعدة الاجتماعية. أخشى ألا أفهم كل شيء. ماذا يمكنني أن أقول؟',
    fa: 'هفته آینده با مسئول پرونده‌ام درباره کمک اجتماعی‌ام صحبت دارم. می‌ترسم همه چیز را نفهمم. چه می‌توانم بگویم؟',
    ti: 'ኣብ ዝመጽእ ሰሙን ብዛዕባ ማሕበራዊ ሓገዘይ ምስ ሓላፊ መዝገበይ ርክብ ኣለኒ። ኩሉ ዘይርድኣኒ ኢዩ ዝብል ፍርሒ ኣለኒ። እንታይ ክብል እኽእል?',
  };

  // Zelf geschreven, niet nagelezen (PLAN 14): een afspraak bij de huisarts.
  const GV_ARTS = {
    nl: 'Morgen ga ik naar de huisarts. Ik heb al twee weken last van mijn rug. Ik weet niet goed wat ik moet zeggen. Kun je me helpen?',
    en: "Tomorrow I'm going to the GP. My back has been hurting for two weeks. I don't really know what to say. Can you help me?",
    pl: 'Jutro idę do lekarza rodzinnego. Od dwóch tygodni boli mnie plecy. Nie wiem dobrze, co mam powiedzieć. Możesz mi pomóc?',
    tr: 'Yarın aile hekimine gidiyorum. İki haftadır sırtım ağrıyor. Ne söyleyeceğimi tam bilmiyorum. Bana yardım eder misin?',
    uk: 'Завтра я йду до сімейного лікаря. Вже два тижні в мене болить спина. Я не знаю, що саме сказати. Можеш допомогти?',
    ro: 'Mâine merg la medicul de familie. Mă doare spatele de două săptămâni. Nu știu bine ce să spun. Mă poți ajuta?',
    ar: 'غداً سأذهب إلى طبيب العائلة. ظهري يؤلمني منذ أسبوعين. لا أعرف جيداً ماذا أقول. هل يمكنك مساعدتي؟',
    fa: 'فردا پیش داکتر خانوادگی می‌روم. دو هفته است که کمرم درد می‌کند. نمی‌دانم دقیقاً چه بگویم. می‌توانی کمکم کنی؟',
    ti: 'ጽባሕ ናብ ሓኪም ስድራቤት ክኸይድ እየ። ንኽልተ ሰሙን ሕቖይ የሕመኒ ኣሎ። እንታይ ከም ዝብል ኣጸቢቐ ኣይፈልጥን። ክትሕግዘኒ ትኽእል ዶ?',
  };
  const ZEG = process.argv.includes('--zeg');

  function prompts(v, taal, n = 1) {
    if (v === 'PAGINA') {
      if (route === 'analyse') return ['/api/analyse', PAGINA.analyse(GEMEENTE, taal, BERICHT)];
      if (route === 'digi') return ['/api/digi', PAGINA.digi([{ role: 'user', content: VRAAG[taal] }], taal.toUpperCase())];
      const d = PAGINA.gvData[taal.toUpperCase()] || PAGINA.gvData.NL;
      const arts = ZEG && n % 2 === 0;
      const cat = d.categorieen.find(c => c.id === (arts ? 'dokter' : 'gemeente'));
      const sit = cat.situaties.find(x => x.id === (arts ? 'dokter-klacht' : 'gemeente-bijstand'));
      return ['/api/digi', PAGINA.gv(cat, sit, taal.toUpperCase(), [{ role: 'user', content: (arts ? GV_ARTS : GV_VRAAG)[taal] }])];
    }
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

  for (const v of varianten) for (const taal of talen) {
    for (let n = 1; n <= herhaal; n++) {
      const [pad, data] = prompts(v, taal, n);
      const t0 = totaal();
      if (t0 >= plafond) { console.log(`PLAFOND: geschatte kosten $${t0.toFixed(2)} ≥ $${plafond}`); process.exit(3); }
      usage = null;
      let r;
      try { r = await post(pad, data); }
      catch (e) { r = { status: 'uitzondering', data: { error: schoon(e.message) }, duur: 0 }; }
      const zoek = usage?.server_tool_use?.web_search_requests || 0;
      const [ti, to] = TARIEF[model] || [0, 0];
      const usd = usage ? usage.input_tokens / 1e6 * ti + usage.output_tokens / 1e6 * to + zoek * 0.01 : 0;
      eigen.usd = +(eigen.usd + usd).toFixed(5); eigen.aanroepen += 1;
      writeFileSync(kostenPad, JSON.stringify(eigen));
      const tekst = r.data.tekst || '';
      const t = taalcontrole12(tekst, taal, R, route === 'gv');
      // Geen Nederlandse slotzin in een niet-NL antwoord (PLAN 13 fase 4.2).
      if (taal !== 'nl') {
        t.nl_slotzin = /Neem de Excel|naar je begeleider/i.test(tekst);
        if (t.nl_slotzin) t.in_doeltaal = false;
      }
      const regel = {
        model, route, variant: v, taal, n, status: r.status, duur_s: r.duur, tekst_tekens: tekst.length,
        bronnen: Array.isArray(r.data.bronnen) ? r.data.bronnen.length : undefined,
        zoekopdrachten: zoek, input_tokens: usage?.input_tokens, output_tokens: usage?.output_tokens,
        kosten_usd: +usd.toFixed(5), fout: r.data.error ? schoon(r.data.error) : undefined, type: r.data.type,
        ...t,
      };
      regel.overig_ok = r.status === 200 && tekst.length > 200 && r.duur < 45;
      regel.geslaagd = regel.overig_ok && t.in_doeltaal;
      if (ZEG) {
        Object.assign(regel, { vraag: n % 2 === 0 ? 'huisarts' : 'klantmanager' }, zegControle(tekst, taal, R));
        regel.geslaagd = regel.overig_ok && regel.zeg_nl && t.in_doeltaal && regel.geen_nl_alinea;
      }
      writeFileSync(join(uit, `${model}-${route.replace(/\W/g, '')}-${v}-${taal}-${n}.txt`), tekst || JSON.stringify(r.data), 'utf-8');
      appendFileSync(join(uit, 'varianten.jsonl'), JSON.stringify(regel) + '\n');
      const { nl_zin_voorbeeld, ...kort } = regel;
      console.log(JSON.stringify(kort));
    }
  }
}

// PLAN 14, B-4 (a) en (c): de zin om te zeggen staat in het Nederlands tussen aanhalingstekens,
// en buiten de citaten staat geen Nederlandse alinea. (b) is in_doeltaal uit taalcontrole12.
function zegControle(tekst, taal, R) {
  const CITAAT = /["“„«»”‹›]([^"“„«»”‹›\n]{8,300})["”»«“‹›]/g;
  const eigenW = new Set(R[taal]?.kenmerken?.woorden || []);
  const D = R._drempels, NLW = new Set(R._nl_woorden.filter(x => !eigenW.has(x)));
  const woorden = (x) => x.toLowerCase().match(/[\p{L}\p{M}]+/gu) || [];
  const aandeel = (x) => { const w = woorden(x); return w.length ? w.filter(y => NLW.has(y)).length / w.length : 0; };
  const schoon = String(tekst).replace(/<[^>]+>/g, ' ').replace(/https?:\/\/\S+|www\.\S+/g, ' ');
  const citaten = [...schoon.matchAll(CITAAT)].map(m => m[1]);
  const nlCitaten = citaten.filter(c => woorden(c).length >= 3 && aandeel(c) >= 0.4);
  const r = { citaten: citaten.length, zeg_nl: nlCitaten.length > 0 };
  if (nlCitaten.length) r.zeg_voorbeeld = nlCitaten[0].slice(0, 120);
  const buiten = schoon.replace(CITAAT, ' ');
  const nlAlineas = taal === 'nl' ? [] : buiten.split(/\n\s*\n/)
    .filter(a => woorden(a).length >= D.min_woorden_zin && aandeel(a) >= D.nl_aandeel_zin);
  r.nl_alineas = nlAlineas.length;
  r.geen_nl_alinea = nlAlineas.length === 0;
  if (nlAlineas.length) r.nl_alinea_voorbeeld = nlAlineas[0].trim().slice(0, 120);
  return r;
}

// Strengere taalcontrole (T-3), dezelfde regels als taalcontrole() in meet.py.
function taalcontrole12(tekst, taal, R, citatenApart = false) {
  // Woorden die ook functiewoord van de doeltaal zijn (Roemeens 'de') tellen niet als Nederlands.
  const eigenW = new Set(R[taal]?.kenmerken?.woorden || []);
  const D = R._drempels, NLW = new Set(R._nl_woorden.filter(x => !eigenW.has(x)));
  let t = String(tekst).replace(/<[^>]+>/g, ' ').replace(/https?:\/\/\S+|www\.\S+|\b[\w.-]+\.(?:nl|com|org|eu|gov)\b\S*/g, ' ');
  // Goed voorbereid: zinnen tussen aanhalingstekens zijn vaak bewust Nederlands (om te zeggen).
  const citaten = [];
  if (citatenApart && taal !== 'nl') {
    t = t.replace(/["“„«»”]([^"“„«»”\n]{8,300})["”»«“]/g, (_, c) => { citaten.push(c); return ' '; });
  }
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
  if (citatenApart) r.nl_citaten = citaten.filter(c => {
    const zw = woorden(c); return zw.length >= 3 && zw.filter(x => NLW.has(x)).length / zw.length >= D.nl_aandeel_zin;
  }).length;
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
