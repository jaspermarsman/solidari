# Backend-patches (nachtsessie 21-08-2026)

Toegepast op de repo-kopie `solidari-backend/`. Moeten ook op de draaiende `/opt/solidari-backend` (jasper-pc)
vóór de rsync naar de VPS (PLAN-1 fase 3.2). Eerst `diff -rq` om te zien of /opt gelijk is aan de repo-kopie.

```bash
cd /opt/solidari-backend
for p in /pad/naar/repo/tools/vps/patches/*.patch; do sudo patch -p0 --dry-run < "$p" && sudo patch -p0 < "$p"; done
sudo cp /pad/naar/repo/tools/vps/patches/routes_tts.py.nieuw routes/tts.py
sudo chown -R solidari:solidari . 2>/dev/null || true
```

| Patch | Wat | Waarom |
|---|---|---|
| `app.py` | ProxyFix; `/api/health` (limiter.exempt); logpad via `SOLIDARI_LOG_DIR`; tts-blueprint | rate limiter achter nginx; health-timer; ProtectSystem=strict |
| `routes_brief.py` | logregel met ruwe OCR-tekst weg | **privacy** — brieftekst stond in solidari.log |
| `services_ai.py` | `SOLIDARI_DEBUG_REDACTIE=1` → geredigeerde tekst naar /tmp | redactietest (alleen handmatig, nooit in de unit) |
| `services_preprocessor.py` | adresblok neemt niet-lege regels boven de postcode; datums niet letterlijk loggen | naam bleef buiten het blok; geboortedatum in log |
| `services_redacteer.py` | IBAN OCR-tolerant (O/0); naam uit adresblok + aanhef → `[NAAM]` | IBAN en naam lekten in de droogtest |
| `requirements.txt` | reportlab | cursusblad.py importeert het; gunicorn startte niet |
| `routes_tts.py.nieuw` | nieuwe route `/api/tts` (PLAN-4 fase 3) | Tigrinya-voorlezen op de eigen server |
| `app.py.fase7` | blueprints `cursusblad` en `inhibit` niet meer registreren | PLAN-1 fase 7.2 — Digi Hulp bestaat niet meer, de thuis-pc is uit de keten; beide routes hadden nul aanroepen in twaalf dagen |

**Volgorde:** `app.py.patch` eerst, `app.py.fase7.patch` daarna (de tweede bouwt voort op de eerste).
Sinds 14-09-2026 draait de VPS-code al mét `app.py.fase7`; de patch staat hier voor herbouw vanaf nul.

## PLAN 13 (26-10-2026): beveiligingsronde van 18-09 + Sonnet 5.5 + V3

Ten opzichte van de VPS-stand van 26-10-2026 (= de code van 14-09). Toegepast geeft dit precies de
lokale `solidari-backend/` (gecontroleerd met `diff -rq`). Uitrol gaat met de rsync uit
`tools/vps/README.md`; deze patches zijn voor de diff-review en voor herbouw.

```bash
cd /opt/solidari-backend
for p in /pad/naar/repo/tools/vps/patches/*.plan13.patch; do patch -p0 --dry-run < "$p" && patch -p0 < "$p"; done
cp /pad/naar/repo/tools/vps/patches/services_claude_util.py.plan13.nieuw services/claude_util.py
mkdir -p tests && cp /pad/naar/repo/tools/vps/patches/tests_test_*.plan13.nieuw tests/   # daarna hernoemen naar test_*.py
rm routes/analyse.py                                                                   # S-5
```

| Patch | Wat | Waarom |
|---|---|---|
| `app.py.plan13` | `/api/analyse` niet meer registreren; brief-blueprint 60/dag + 5/min per IP | audit 18-09: open LLM-proxy; misbruik per IP afremmen |
| `routes_brief.py.plan13` | `DagplafondBereikt` → 429 met eerlijke melding | audit 18-09 |
| `services_teller.py.plan13` | teller wordt dagplafond (500, `SOLIDARI_AI_DAGPLAFOND`), fcntl-vergrendeling, noodrem in geheugen | audit 18-09: niets begrensde de kosten |
| `services_ai.py.plan13` | SDK-timeout 60 s en `max_retries=1`; reserveren vóór de aanroep (audit 18-09). Model en effort uit `Config`, `max_tokens` 4096, `claude_tekst()`, V3-taalregels (`_systeem_prompt`, `TAALREGEL_JSON`, geen TI-slotregel), parsefout logt geen AI-uitvoer (PLAN 13) | Sonnet 5.5 begint met een thinking-blok; taaldrift (PLAN 12); privacy |
| `config.py.plan13` | `CLAUDE_MODEL`/`CLAUDE_EFFORT` uit `SOLIDARI_CLAUDE_MODEL`/`SOLIDARI_CLAUDE_EFFORT` (standaard `claude-sonnet-5-5`/`low`); dode Ollama-config weg | S-1, S-7 (terug zonder code), M-8 |
| `routes_cursusblad.py.plan13` | model via `Config`, tekst via `claude_tekst()`; route blijft ongeregistreerd | M-8 |
| `services_claude_util.py.plan13.nieuw` | `claude_tekst()`, `ClaudeWeigering`, `ClaudeTeKort` | M-6 |
| `tests_test_claude_util.py.plan13.nieuw`, `tests_test_dagplafond.py.plan13.nieuw` | testscripts zonder netwerk (`python tests/…`) | acceptatie fase 1 |

**Terugdraaien:** `SOLIDARI_CLAUDE_MODEL=claude-haiku-4-5-20251001` en `SOLIDARI_CLAUDE_EFFORT=` in
`/etc/solidari/.env`, dan `systemctl restart solidari` (S-7). Volledig terug: de tar-backup uit fase 5.2.
