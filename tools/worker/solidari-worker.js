/**
 * Solidari — Centrale Worker (vervangt alle losse workers)
 *
 * Routes:
 *   POST /api/analyse     → enkelvoudig bericht naar Claude (budgethulp, rechten)
 *   POST /api/digi        → multi-turn gesprek naar Claude (digihulp)
 *   POST /api/feedback    → sla feedback op in D1
 *   GET  /api/feedback/export?secret=XXX → exporteer feedback als JSON
 *
 * Instellen in Cloudflare Dashboard:
 *   1. solidari-analyse-budget → Edit code → vervang alles door deze code → Deploy
 *   2. Settings → Variables:
 *        ANTHROPIC_API_KEY  = sk-ant-...
 *        EXPORT_SECRET      = zelf gekozen wachtwoord
 *   3. Settings → Bindings → D1 Database → variabelenaam: DB → solidari-feedback
 *   4. In digihulp.html: WORKER_URL aanpassen naar URL van solidari-analyse-budget
 *   5. solidari-digi-hulp-worker verwijderen
 */
 
// ── Model (PLAN 8, M-3) ──────────────────────────────────────────────────
// Eén plek voor het model-ID en de plafonds; nergens anders een model-ID.
// Register met status en besluit: tools/modellen/MODELLEN.md
//
// Sonnet 5.5, effort low (PLAN 13, S-1). Haiku 5.5 antwoordde in PLAN 8/12 te vaak in het
// Nederlands op vragen in een andere taal; Sonnet 5.5 + V3 niet. Het denken telt mee in
// max_tokens, dus 4096 (een plafond, geen doel). Terug zonder code: Rollback in het
// dashboard (S-7). Terug naar Haiku 4.5 in code: MODEL 'claude-haiku-4-5-20251001',
// EFFORT '', MAX_ANALYSE 1500, MAX_DIGI 800.
const MODEL = 'claude-sonnet-5-5';
const MAX_ANALYSE = 4096;   // max_tokens voor /api/analyse (plafond, geen doel)
const MAX_DIGI = 4096;      // max_tokens voor /api/digi
const EFFORT = 'low';       // output_config.effort; leeg = niet meesturen (Haiku 4.5 kent geen effort)
// web_search_20250305 werkt op Haiku 5.5 en zoekt in de meting elke keer; de nieuwere versies
// (dynamic filtering) zochten maar 1 van de 6 keer en geven geneste resultaatblokken.
const ZOEKTOOL = { type: 'web_search_20250305', name: 'web_search' };
 
// Lees de tekst op bloktype: Haiku 5.5 begint vaak met een thinking-blok. Een weigering
// (stop_reason 'refusal') of een antwoord zonder tekst (plafond op aan denken) is een fout,
// geen leeg antwoord (M-6). Er wordt niets van de inhoud gelogd.
function leesAntwoord(data) {
  const tekst = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
  if (data.stop_reason === 'refusal') {
    return { fout: { error: 'De AI kon deze vraag niet beantwoorden.', type: 'refusal' } };
  }
  if (!tekst) {
    return { fout: { error: 'Geen antwoord ontvangen van de AI. Probeer het opnieuw.', type: data.stop_reason || 'leeg' } };
  }
  return { tekst };
}
 
export default {
  async fetch(request, env) {
 
    const ALLOWED_ORIGIN = 'https://solidari.nl';
    const origin = request.headers.get('Origin') || '';
    const isAllowed = origin === ALLOWED_ORIGIN ||
                      origin.endsWith('.github.io') ||
                      origin === 'http://localhost:8080';
 
    const corsHeaders = {
      'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };
 
    const json = (data, status = 200) => new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
 
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
 
    const url = new URL(request.url);
    const pad = url.pathname;
 
    // ── GET /api/feedback/export ──────────────────────────────────────────
    if (request.method === 'GET' && pad === '/api/feedback/export') {
      const secret = url.searchParams.get('secret');
      if (!secret || secret !== env.EXPORT_SECRET) {
        return json({ error: 'Niet geautoriseerd' }, 401);
      }
      try {
        const { results } = await env.DB.prepare(
          'SELECT * FROM feedback ORDER BY timestamp DESC'
        ).all();
        return json({ feedback: results, totaal: results.length });
      } catch (err) {
        return json({ error: 'Database fout: ' + err.message }, 500);
      }
    }
 
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }
 
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Ongeldige JSON' }, 400);
    }
 
    // ── POST /api/feedback ────────────────────────────────────────────────
    if (pad === '/api/feedback') {
      const { tool, type, omschrijving, email, taal } = body;
      if (!tool || !type || !omschrijving) {
        return json({ error: 'Velden tool, type en omschrijving zijn verplicht' }, 400);
      }
      const timestamp = new Date().toISOString();
      const user_agent = (request.headers.get('User-Agent') || '').slice(0, 200);
      try {
        await env.DB.prepare(
          `INSERT INTO feedback (timestamp, tool, type, omschrijving, email, taal, user_agent)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(timestamp, tool, type, omschrijving.slice(0, 2000), email || null, taal || null, user_agent).run();
        return json({ ok: true, bericht: 'Feedback ontvangen, dank je wel!' });
      } catch (err) {
        return json({ error: 'Opslaan mislukt: ' + err.message }, 500);
      }
    }
 
    // ── POST /api/digi — multi-turn (digihulp) ────────────────────────────
    if (pad === '/api/digi') {
      const { systeem, berichten } = body;
      if (!systeem || !berichten || !Array.isArray(berichten) || berichten.length === 0) {
        return json({ error: 'Velden systeem en berichten zijn verplicht' }, 400);
      }
      const berichtenBeperkt = berichten.slice(-30).map(m => ({
        role: m.role,
        content: String(m.content).slice(0, 2000)
      }));
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: MODEL,
            max_tokens: MAX_DIGI,
            ...(EFFORT ? { output_config: { effort: EFFORT } } : {}),
            system: systeem,
            tools: [ZOEKTOOL],
            messages: berichtenBeperkt
          })
        });
        const data = await res.json();
        if (!res.ok) return json({ error: data.error?.message || 'API-fout', type: data.error?.type }, res.status);
        const { tekst, fout } = leesAntwoord(data);
        if (fout) return json(fout, 502);
        // Extraheer bronnen uit web search resultaten
        const bronnen = [];
        for (const blok of (data.content || [])) {
          const items = blok.type === 'web_search_tool_result' ? (blok.content || [])
                      : blok.type === 'tool_result' ? (blok.content || [])
                      : [];
          for (const item of items) {
            if (item.type === 'web_search_result' && item.url && item.title) {
              bronnen.push({ titel: item.title, url: item.url });
            }
          }
        }
        return json({ tekst, bronnen });
      } catch (err) {
        return json({ error: 'Verbinding met AI mislukt: ' + err.message }, 502);
      }
    }
 
    // ── POST /api/analyse — enkelvoudig (budgethulp, rechten, brief) ──────
    if (pad === '/api/analyse' || pad === '/') {
      const { systeem, bericht } = body;
      if (!systeem || !bericht) {
        return json({ error: 'Velden systeem en bericht zijn verplicht' }, 400);
      }
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: MODEL,
            max_tokens: MAX_ANALYSE,
            ...(EFFORT ? { output_config: { effort: EFFORT } } : {}),
            tools: [ZOEKTOOL],
            system: systeem,
            messages: [{ role: 'user', content: bericht.slice(0, 4000) }]
          })
        });
        const data = await res.json();
        if (!res.ok) return json({ error: data.error?.message || 'API-fout', type: data.error?.type }, res.status);
        const { tekst, fout } = leesAntwoord(data);
        if (fout) return json(fout, 502);
        return json({ tekst });
      } catch (err) {
        return json({ error: 'Verbinding met AI mislukt: ' + err.message }, 502);
      }
    }
 
    return json({ error: 'Onbekende route' }, 404);
  }
  ,

  // Bewaartermijn feedback: 12 maanden (besluit W-A, 02-09-2026).
  // Draait als cron-trigger; verwijdert rijen ouder dan 365 dagen.
  async scheduled(event, env, ctx) {
    const grens = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
    const r = await env.DB.prepare('DELETE FROM feedback WHERE timestamp < ?').bind(grens).run();
    console.log(`[feedback-opschoning] ${r.meta.changes} rijen ouder dan ${grens} verwijderd`);
  }
};