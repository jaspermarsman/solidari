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
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 800,
            system: systeem,
            tools: [{ type: 'web_search_20250305', name: 'web_search' }],
            messages: berichtenBeperkt
          })
        });
        const data = await res.json();
        if (!res.ok) return json({ error: data.error?.message || 'API-fout', type: data.error?.type }, res.status);
        const tekst = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
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
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1500,
            tools: [{ type: 'web_search_20250305', name: 'web_search' }],
            system: systeem,
            messages: [{ role: 'user', content: bericht.slice(0, 4000) }]
          })
        });
        const data = await res.json();
        if (!res.ok) return json({ error: data.error?.message || 'API-fout', type: data.error?.type }, res.status);
        const tekst = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
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