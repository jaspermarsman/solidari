# Modelregister Solidari

Elk AI-model in de keten, met status en besluit. Eerste versie: PLAN 8 fase 0, 26-10-2026.
Een nieuw model of een nieuwe afnemer van een sleutel komt **eerst hier** (PLAN 8 fase 6.3).

Status: `actief` · `preview` · `uitgefaseerd` · `vervallen` (niet meer in gebruik bij ons).
Besluit: `blijven` · `upgraden` · `verwijderen` · `open` (wacht op een besluit van Jasper).

## 1. Productie

| Laag | Plek | Model-ID | Status (bron, datum) | Besluit |
|---|---|---|---|---|
| Worker `solidari-digi-hulp-worker` | `/api/analyse` (budgethulp), `tools/worker/solidari-worker.js`, constante `MODEL` | live: `claude-haiku-4-5-20251001`. Branch `sonnet-v1`: `claude-sonnet-5-5`, effort `low`, `MAX_ANALYSE` 4096, zoektool `web_search_20250305` | 4.5 actief, niet eerder dan 15-10-2026; Sonnet 5.5 niet eerder dan 28-09-2027 [D] | **upgraden naar Sonnet 5.5 (PLAN 13, S-1), wacht op W-E.** Hermeting met de pagina-prompt (V3): 26/27 in 9 talen |
| Worker | `/api/digi` (rechten, goedvoorbereid) | idem, `MAX_DIGI` 4096 | idem | **upgraden naar Sonnet 5.5 (S-1), wacht op W-E.** Hermeting V3: rechten 27/27, Goed voorbereid 27/27 in 9 talen |
| Backend VPS `api.solidari.nl` | Brief Begrijper, `config.py` `CLAUDE_MODEL` (`SOLIDARI_CLAUDE_MODEL`) → `services/ai.py` `_via_claude` | VPS: `claude-haiku-4-5-20251001`, `max_tokens` 2500. Lokaal/patches: `claude-sonnet-5-5`, effort `low`, `max_tokens` 4096, V3 | idem | **upgraden naar Sonnet 5.5 (S-1), samen met de beveiligingsronde (S-4), wacht op W-E.** Echte `ai.py`: 18/18 |
| Backend VPS | een oudere route, **alleen op de VPS** | `claude-haiku-4-5-20251001` hardcoded | idem | lokaal vervallen, op de VPS nog aanwezig. Zie §4 |
| Backend VPS | `routes/cursusblad.py` r. 94 (niet geregistreerd) | `claude-haiku-4-5-20251001` hardcoded | idem | dode code: helper en `Config.CLAUDE_MODEL` (M-8), wacht op §4 |
| Backend VPS | `/api/tts` (Tigrinya) | eSpeak NG + TigrinyaNLP-data (geen AI-model) | — | blijven |

## 2. Gereedschap (lokaal, niet in productie)

| Laag | Plek | Model-ID | Status (bron, datum) | Besluit |
|---|---|---|---|---|
| Vertalen en beoordelen (PLAN 7, B-1) | `tools/vertaal/ronde.py` r. 18, `beoordeel.py`, `hervertaal.py`, `register.py` | `gemini-3.8-flash` | in de modellenlijst, geen preview-ID [G] | blijven. Gekozen op 13-10-2026 als nieuwste tekstmodel (`LOG-vertaalkwaliteit.md`, fase 2) |
| Audio (PLAN 5 §6, S-7) | `tools/audio/genereer_gemini.py` r. 31 | `gemini-2.5-flash-preview-tts` | preview, bestaat nog [G] | open: wijzigen pas bij het audiobesluit. Nieuwste TTS in de lijst: `gemini-3.8-flash-tts` en `gemini-3.8-flash-lite-tts` [G] |
| Proefproject Tigrinya-stem | `00_Bedrijfsbrein/tts-test-tigrinya/maak-mp3.py` r. 29–30 | `gemini-3.8-flash-tts`, `gemini-3.8-flash-lite-tts` | in de modellenlijst [G] | blijven (buiten de repo, niet in productie) |
| Claude Code-uitvoerders | bouwplannen ("Sonnet" / "Opus" per fase) | sessie van 26-10-2026: Claude Code 2.1.310, `claude-opus-5-5` | actief, niet eerder dan 22-09-2027 [D] | per sessie vastleggen (M-11) |

## 3. Vervallen of dode configuratie

| Plek | Model-ID | Status | Besluit |
|---|---|---|---|
| `config.py` r. 39–45 (`OLLAMA_URL`, `OLLAMA_MODEL`, `AI_VOLGORDE`) | `phi4-mini` (Ollama, oude thuis-pc) | nergens in de code gebruikt | verwijderen (M-8), wacht op §4 |
| `facebook/mms-tts-*` | MMS | uitgefaseerd door PLAN 3 (CC-BY-NC) | verwijderd; eSpeak NG voor TI |
| `_backup-plafond-2026-09-18/` | `claude-haiku-4-5-20251001` | oude kopie | negeren |
| `~/solidari-worker.js` en het projectbestand in Claude | kopie van de Worker van 12-05-2026 | verouderd: mist `scheduled`, `/api/digi` had toen `max_tokens` 600 | vervangen door `tools/worker/solidari-worker.js` |
| `claude-opus-4-1` (mail 13-10-2026) | — | uitgefaseerd 05-08-2026 [D] | kwam niet van Solidari; dat project heeft de sleutel niet meer |

## 4. Afwijking VPS ↔ repo-kopie (fase 0.2, 26-10-2026)

De VPS draait een oudere versie van de backend dan de lokale kopie `solidari-backend/`: een eerdere herziening is nog niet uitgerold. Daardoor staat er op de VPS nog een model-ID op een plek die lokaal al weg is. Volgens PLAN 8 §5.1 is de backend niet omgezet tot Jasper de basis kiest. Details staan in het lokale log (`_werkdocumenten/bouwplannen/LOG-modellen.md`), niet in deze publieke repo.

## 5. Sleutels (M-9)

| Sleutel | Gebruikt door | Stand 26-10-2026 |
|---|---|---|
| Anthropic "Solidari (…jgAA)" | Worker-secret `ANTHROPIC_API_KEY`, VPS `/etc/solidari/.env` | één sleutel voor twee afnemers. Jasper maakt `solidari-worker` en `solidari-vps` aan in de Console (fase 0.7) |
| Google `solidari-lokaal` | `tools/vertaal/`, `tools/audio/` via `~/.config/solidari/geheimen.env` | eigen project (§0b) |
| Google `solidari-worker` | — | eigen project (§0b), nu niet in de Worker-code |

## 6. Taaldrift (PLAN 12)

Meting van promptvarianten tegen taaldrift (Haiku 4.5, Haiku 5.5, Sonnet 5.5), 26-10-2026: zie `_werkdocumenten/RAPPORT-taaldrift.md` (lokaal, buiten git). Gereedschap: `meet.py --alleen varianten`, `worker-echt.mjs --variant`, `taalregels.json`. Advies W-D; daarna PLAN 13 (`_werkdocumenten/RAPPORT-sonnet.md`, lokaal).

## Bronnen

- [D] [Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations), gelezen 26-10-2026: `claude-haiku-4-5-20251001` actief, niet eerder dan 15-10-2026; `claude-haiku-5-5` actief, niet eerder dan 07-10-2027; `claude-opus-5-5` niet eerder dan 22-09-2027; `claude-opus-4-1-20250805` uitgefaseerd 05-08-2026. Aankondiging minstens 60 dagen vooraf.
- [P] [Prijzen](https://platform.claude.com/docs/en/about-claude/pricing) en de migratiegids voor Haiku 5.5 (26-10-2026): Haiku 4.5 $1 / $5; Haiku 5.5 $0,10 / $0,50 per miljoen tokens bij een prompt tot 100k, daarboven $0,50 / $2,50. Ca. 30% meer tokens voor dezelfde tekst. `effort` geeft een fout op Haiku 4.5.
- [W] [Web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) (26-10-2026): versies `web_search_20250305`, `web_search_20260209` en `web_search_20260318`. Ondersteuning per model staat in de Models API (`capabilities.server_tools.web_search`).
- [G] `GET /v1beta/models` (Gemini API, sleutel `solidari-lokaal`), 26-10-2026: 60 modellen.
