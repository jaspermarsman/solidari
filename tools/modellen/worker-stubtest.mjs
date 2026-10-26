// Stubtest voor tools/worker/solidari-worker.js (PLAN 8 fase 2 en 4).
//
// Draaien:  node tools/modellen/worker-stubtest.mjs [pad-naar-worker.js]
// Geen netwerk: globalThis.fetch is vervangen door een stub die het verzoek bewaart
// en een vooraf gekozen antwoord teruggeeft. Er gaat geen sleutel mee.
//
// Wat de test controleert:
//   - de payload naar Anthropic: model, max_tokens, tools en effort komen uit de
//     constanten bovenin de Worker (één plek, M-3);
//   - output_config gaat alleen mee als er een effort is ingesteld (M-4);
//   - de tekst wordt op bloktype gelezen, ook met een thinking-blok vóór de tekst;
//   - bronnen uit web_search_tool_result komen mee bij /api/digi;
//   - de scheduled-handler is ongemoeid.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const hier = dirname(fileURLToPath(import.meta.url));
const pad = process.argv[2] || join(hier, '..', 'worker', 'solidari-worker.js');
const bron = readFileSync(pad, 'utf-8');
// Als data-URL laden: de Worker is ESM, maar zonder package.json met "type": "module"
// leest Node een .js-bestand als CommonJS.
const { default: worker } = await import('data:text/javascript,' + encodeURIComponent(bron));

let fouten = 0;
function check(naam, ok, extra = '') {
  console.log((ok ? '  OK   ' : '  FOUT ') + naam + (ok || !extra ? '' : '  — ' + extra));
  if (!ok) fouten++;
}

// Constanten uit de bron lezen, zodat de test na fase 4 niet hoeft te veranderen.
function constante(naam) {
  const m = bron.match(new RegExp(`^const ${naam} = (.+?);`, 'm'));
  if (!m) return undefined;
  return Function(`return (${m[1]})`)();
}
const MODEL = constante('MODEL');
const MAX_ANALYSE = constante('MAX_ANALYSE');
const MAX_DIGI = constante('MAX_DIGI');
const ZOEKTOOL = constante('ZOEKTOOL');
const EFFORT = constante('EFFORT');   // bestaat pas vanaf fase 4

console.log(`Worker: MODEL=${MODEL} MAX_ANALYSE=${MAX_ANALYSE} MAX_DIGI=${MAX_DIGI} ` +
            `ZOEKTOOL=${ZOEKTOOL && ZOEKTOOL.type} EFFORT=${EFFORT ?? '(geen)'}`);

console.log('0. Eén plek voor het model-ID');
// Alleen code telt; een opmerking mag het ID noemen waarnaar je kunt omzetten.
const code = bron.split('\n').filter(r => !/^\s*(\/\/|\*|\/\*)/.test(r)).join('\n');
const ids = code.match(/claude-[a-z]+-\d[\w-]*/g) || [];
check('precies één model-ID in de Worker-code', ids.length === 1, ids.join(', '));
check('Haiku 4.5 krijgt geen effort (die geeft daar een fout)',
      !(String(MODEL).startsWith('claude-haiku-4-5') && EFFORT));

// ── Stub voor fetch ────────────────────────────────────────────────────────
let verzoeken = [];
let antwoord = null;
globalThis.fetch = async (url, init) => {
  verzoeken.push({ url, init, body: JSON.parse(init.body) });
  return new Response(JSON.stringify(antwoord.body), {
    status: antwoord.status ?? 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

const env = { ANTHROPIC_API_KEY: 'stub-geen-echte-sleutel' };

async function post(route, data) {
  verzoeken = [];
  const req = new Request('https://worker.test' + route, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://solidari.nl' },
    body: JSON.stringify(data),
  });
  const res = await worker.fetch(req, env);
  return { status: res.status, data: await res.json() };
}

function checkPayload(label, body, maxTokens) {
  check(`${label}: model = MODEL`, body.model === MODEL, body.model);
  check(`${label}: max_tokens = ${maxTokens}`, body.max_tokens === maxTokens, String(body.max_tokens));
  check(`${label}: zoektool = ZOEKTOOL`,
        JSON.stringify(body.tools) === JSON.stringify([ZOEKTOOL]), JSON.stringify(body.tools));
  if (EFFORT) {
    check(`${label}: output_config.effort = ${EFFORT}`,
          body.output_config && body.output_config.effort === EFFORT, JSON.stringify(body.output_config));
  } else {
    check(`${label}: geen output_config`, !('output_config' in body), JSON.stringify(body.output_config));
  }
  for (const veld of ['temperature', 'top_p', 'top_k', 'thinking']) {
    check(`${label}: geen ${veld}`, !(veld in body));
  }
}

const tekstBlok = (t) => ({ type: 'text', text: t });
const denkBlok = { type: 'thinking', thinking: '', signature: 'stub' };

console.log('1. /api/analyse — gewoon tekstblok');
antwoord = { body: { content: [tekstBlok('Uitleg A')], stop_reason: 'end_turn' } };
let r = await post('/api/analyse', { systeem: 'S', bericht: 'B'.repeat(5000) });
check('status 200', r.status === 200, String(r.status));
check('tekst = "Uitleg A"', r.data.tekst === 'Uitleg A', JSON.stringify(r.data));
check('één verzoek naar Anthropic', verzoeken.length === 1);
check('naar api.anthropic.com/v1/messages', verzoeken[0].url === 'https://api.anthropic.com/v1/messages');
checkPayload('analyse', verzoeken[0].body, MAX_ANALYSE);
check('analyse: system = systeem', verzoeken[0].body.system === 'S');
check('analyse: bericht ingekort tot 4000', verzoeken[0].body.messages[0].content.length === 4000);

console.log('2. /api/analyse — denkblok vóór de tekst');
antwoord = { body: { content: [denkBlok, tekstBlok('Uitleg B')], stop_reason: 'end_turn' } };
r = await post('/api/analyse', { systeem: 'S', bericht: 'B' });
check('tekst = "Uitleg B" (denkblok overgeslagen)', r.data.tekst === 'Uitleg B', JSON.stringify(r.data));

console.log('3. /api/analyse — zoekresultaat en meerdere tekstblokken');
antwoord = { body: { content: [
  tekstBlok('Deel 1'),
  { type: 'server_tool_use', id: 'srv', name: 'web_search', input: { query: 'q' } },
  { type: 'web_search_tool_result', tool_use_id: 'srv', content: [
    { type: 'web_search_result', url: 'https://example.org', title: 'Bron' }] },
  denkBlok,
  tekstBlok('Deel 2'),
], stop_reason: 'end_turn' } };
r = await post('/api/analyse', { systeem: 'S', bericht: 'B' });
check('tekst = "Deel 1\\nDeel 2"', r.data.tekst === 'Deel 1\nDeel 2', JSON.stringify(r.data));

console.log('4. /api/digi — payload, denkblok en bronnen');
antwoord = { body: { content: [
  denkBlok,
  { type: 'web_search_tool_result', tool_use_id: 'srv', content: [
    { type: 'web_search_result', url: 'https://example.org/a', title: 'A' }] },
  tekstBlok('Antwoord'),
], stop_reason: 'end_turn' } };
r = await post('/api/digi', { systeem: 'S', berichten: [{ role: 'user', content: 'Vraag' }] });
check('status 200', r.status === 200, String(r.status));
check('tekst = "Antwoord"', r.data.tekst === 'Antwoord', JSON.stringify(r.data));
check('bronnen = [A]', JSON.stringify(r.data.bronnen) === JSON.stringify([{ titel: 'A', url: 'https://example.org/a' }]),
      JSON.stringify(r.data.bronnen));
checkPayload('digi', verzoeken[0].body, MAX_DIGI);

console.log('5. API-fout wordt doorgegeven');
antwoord = { status: 400, body: { type: 'error', error: { type: 'invalid_request_error', message: 'stubfout' } } };
r = await post('/api/analyse', { systeem: 'S', bericht: 'B' });
check('status 400', r.status === 400, String(r.status));
check('foutmelding doorgegeven', r.data.error === 'stubfout', JSON.stringify(r.data));

// Vanaf fase 4: weigering en "leeg door max_tokens" zijn fouten (M-6).
if (/stop_reason === 'refusal'/.test(bron)) {
  console.log('6. Weigering en lege tekst (M-6)');
  for (const route of ['/api/analyse', '/api/digi']) {
    const data = route === '/api/digi'
      ? { systeem: 'S', berichten: [{ role: 'user', content: 'V' }] }
      : { systeem: 'S', bericht: 'B' };
    antwoord = { body: { content: [], stop_reason: 'refusal' } };
    r = await post(route, data);
    check(`${route}: refusal → 502 met type refusal`, r.status === 502 && r.data.type === 'refusal', JSON.stringify(r));
    antwoord = { body: { content: [denkBlok], stop_reason: 'max_tokens' } };
    r = await post(route, data);
    check(`${route}: alleen denken, max_tokens → 502 met type max_tokens`,
          r.status === 502 && r.data.type === 'max_tokens', JSON.stringify(r));
  }
}

console.log('7. scheduled-handler ongemoeid');
let sql = null, grens = null;
const dbEnv = { DB: { prepare(q) { sql = q; return { bind(g) { grens = g; return { async run() { return { meta: { changes: 0 } }; } }; } }; } } };
const log = console.log; console.log = () => {};
await worker.scheduled({}, dbEnv, {});
console.log = log;
check('verwijdert feedback ouder dan de grens', sql === 'DELETE FROM feedback WHERE timestamp < ?');
const dagen = (Date.now() - Date.parse(grens)) / 86400000;
check('grens ligt 365 dagen terug', Math.abs(dagen - 365) < 0.01, String(dagen));

console.log(fouten ? `\n${fouten} FOUT` : '\nALLES GROEN');
process.exit(fouten ? 1 : 0);
