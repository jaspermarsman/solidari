# Feedback-bewaartermijn: 12 maanden (besluit W-A, 02-09-2026)

De feedbackdatabase (Cloudflare D1 `solidari-feedback`, tabel `feedback`) had **geen enkele
bewaartermijn**. Stand bij de inventarisatie: 39 rijen, oudste `2026-04-14`, nieuwste `2026-07-07`;
2 rijen met een e-mailadres, 39 met een user-agent. Geen IP-kolom.

Besluit: **rijen ouder dan 12 maanden worden automatisch verwijderd**, via een cron-trigger op de
bestaande Worker. De privacyverklaring op `over.html` zegt dit nu ook met zoveel woorden.

## Waarom dit niet door de agent is uitgevoerd

`solidari-worker.js` staat **niet in deze repo** — de Worker wordt buiten de werkmap beheerd
(bevestigd bij de inventarisatie op 22-08 en opnieuw op 02-09). De agent kan de broncode dus niet
wijzigen zonder te gokken naar de rest van het bestand. Hieronder staat wat erbij moet; het is
één handler en één regel configuratie.

## Wat erbij moet in `solidari-worker.js`

```js
// Bewaartermijn feedback: 12 maanden (besluit W-A, 02-09-2026).
// Draait als cron-trigger; verwijdert wat ouder is dan 365 dagen.
export default {
  // ... bestaande fetch(request, env, ctx) blijft ongewijzigd ...

  async scheduled(event, env, ctx) {
    const grens = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
    const r = await env.DB.prepare(
      'DELETE FROM feedback WHERE timestamp < ?'
    ).bind(grens).run();
    console.log(`[feedback-opschoning] ${r.meta.changes} rijen ouder dan ${grens} verwijderd`);
  },
};
```

`env.DB` is de bestaande D1-binding van de Worker; als die anders heet, die naam gebruiken.

## Wat erbij moet in `wrangler.toml`

```toml
[triggers]
crons = ["17 4 * * *"]   # elke nacht 04:17 UTC — buiten de spits, geen exact uur
```

## Verifiëren na het uitrollen

```bash
# 1. cron-trigger staat geregistreerd
npx wrangler deployments list

# 2. handmatig uitvoeren zonder te wachten op de nacht
npx wrangler dev --test-scheduled
curl "http://localhost:8787/__scheduled?cron=17+4+*+*+*"

# 3. tellen in het D1-console (dash.cloudflare.com → D1 → solidari-feedback → Console)
SELECT COUNT(*) AS rijen, MIN(timestamp) AS oudste FROM feedback;
```

Op 02-09-2026 is de oudste rij `2026-04-14`, dus de eerste run verwijdert **nul** rijen.
De eerste rij die eruit gaat is die van 14-04-2026, op **14-04-2027**. Er gaat dus niets
onverwacht verloren op het moment van uitrollen.
