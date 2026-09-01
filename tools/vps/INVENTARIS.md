# INVENTARIS — de werkelijkheid van de backend (PLAN-1 fase 0)

**Deel A (repo-kopie `solidari-backend/`, 21-08-2026, nachtsessie):** vastgesteld.
**Deel B (draaiende installatie op jasper-pc):** morgen invullen met de commando's uit PLAN-1 fase 0.3 — `sudo` nodig.

## A. Uit de code

| Vraag | Antwoord | Bron |
|---|---|---|
| Naam env-variabele | `ANTHROPIC_API_KEY` | `config.py` (`load_dotenv('/etc/solidari/.env')`) |
| Routes | `POST /api/analyseer` (brief, multipart `brief`+`taal`+`context`) · `POST /api/analyse` (budget/rechten, `{systeem, bericht}`?) · `POST /api/cursusblad` (reportlab; Digi Hulp — vervallen) · `GET /api/status` (zonstatus — vervalt) · `POST /api/inhibit/start|stop` (vervalt) · `GET /api/ping` · **nieuw** `GET /api/health` · **nieuw** `POST /api/tts` | `app.py`, `routes/*.py` |
| Responscontract brief | `{urgentie:{niveau,titel,tekst}|null, secties:[{icoon,titel,achtergrond,inhoud}], actiepunten:[str]}` — **niet aanraken** | `routes/brief.py` docstring, `services/ai.py` |
| Model | `claude-haiku-4-5-20251001`, `anthropic>=0.34` (droogtest installeerde 1.0.0) | `config.py` |
| CORS | Flask (`flask_cors`), origins: solidari.nl, www, localhost, 127.0.0.1, homeassistant.local:8123, 192.168.178.189. **Staging-origin ontbreekt** → toevoegen | `config.py` |
| Rate limit | Flask-Limiter 10/min per IP, `memory://` (per worker!). Achter nginx: ProxyFix nodig (toegevoegd). nginx-limiet 6/min komt erbovenop | `app.py` |
| Upload | max 10 MB (`MAX_CONTENT_LENGTH`), types jpeg/png/heic/webp/pdf. HEIC: Pillow zonder pillow-heif kan dat niet — frontend-compressie maakt er jpeg van, dus in de praktijk niet relevant | `config.py`, `ocr.py` |
| Tesseract-talen | `nld` altijd + `eng ara tur ukr fas` afhankelijk van `taal` (`ti`→eng; ro/pl → default nld) | `services/ocr.py` |
| PDF | `pdf2image` → poppler nodig | `services/ocr.py` |
| Logging | `solidari.log` in de werkmap + stdout; **logde de ruwe OCR-tekst (gefixt)** | `app.py`, `routes/brief.py` |
| Redactie | BSN (9 cijfers), IBAN, kenmerknummers 6–9 cijfers, `[ONTVANGERADRES]`-blok uit preprocessor; **nu ook naam (adresblok + aanhef) en OCR-tolerante IBAN** | `services/redacteer.py` |
| Ollama | nog in `config.py` (`AI_VOLGORDE`), niet meer in `ai.py` (alleen Claude) — dode config, laten staan | `config.py`, `ai.py` |
| Zon/HA | `services/zonstatus.py`, `routes/status.py`, `routes/inhibit.py`, `sleep-fix/`, `inhibit-start.sh` — allemaal vervallen in fase 7 | — |
| requirements | flask, flask-cors, flask-limiter, python-dotenv, pytesseract, Pillow, pdf2image, anthropic, requests, gunicorn + **reportlab (ontbrak)** | `requirements.txt` |
| Python thuis | 3.12.3 | `LOG-analfabeten.md` fase 0 |
| Frontend-aanroepen naar api.solidari.nl | alleen `brief.html` (`/api/analyseer`); budgethulp → Worker; digihulp bestaat niet meer | grep 21-08 |
| a11y-plan gedraaid? | **ja**, volledig (fase 0–8), op staging; MMS-audio (358 bestanden) in git, niet op origin/main | `LOG-analfabeten.md`, `git` |

## B. Draaiende installatie op jasper-pc — 01-09-2026 (deels; `sudo` niet beschikbaar)

**AFWIJKING B-1:** `sudo` op jasper-pc vraagt een wachtwoord dat de agent niet heeft. Alles wat `sudo` nodig heeft
(`ls /opt/solidari-backend`, `diff -rq` tegen de repo-kopie, `shred` van `solidari.log`, `nginx -T`, `pip freeze`
uit de venv) kon niet. `/opt/solidari-backend` is `drwxr-x--- solidari:solidari` — ook lezen lukt niet.
Wat wél kon staat hieronder; de rest staat bij "Wat Jasper moet doen" in `LOG-vps.md`.

| Vraag | Antwoord | Hoe vastgesteld |
|---|---|---|
| systemd-unit | `/etc/systemd/system/solidari.service`; `User=solidari`, `WorkingDirectory=/opt/solidari-backend`, `ExecStart=/opt/solidari-backend/venv/bin/gunicorn -w 2 -b 0.0.0.0:5000 --timeout 120 app:app`, `Restart=always`, `PrivateTmp=true`, `ProtectSystem=strict`, `ReadWritePaths=/opt/solidari-backend`, `After=network.target ollama.service` | `systemctl cat solidari` (geen sudo nodig) |
| Service actief | `active` | `systemctl is-active solidari` |
| Luisterpoorten | 5000 (gunicorn, 0.0.0.0), 80 + 443 (nginx, v4+v6) | `ss -ltn` |
| nginx-config | `/etc/nginx/sites-available/solidari` (wereldleesbaar): één `server` 443 voor `api.solidari.nl` met `location /api/` → `proxy_pass http://127.0.0.1:5000`, `client_max_body_size 10M`, `proxy_read_timeout 180s`, LE-certificaat; plus 80 → 301 https. **Geen CORS-headers in nginx** (bevestigt deel A: CORS zit in Flask) | `cat` |
| TLS productie | `CN=api.solidari.nl`, geldig 11-07-2026 t/m 09-10-2026 (Let's Encrypt) | `openssl s_client` |
| Tesseract | 5.3.4 (leptonica 1.82.0); talen: `ara eng fas nld osd tur ukr` — precies de zes uit `ocr.py` + `osd` | `tesseract --list-langs` |
| poppler | `poppler-utils 24.02.0` aanwezig | `dpkg -l` |
| Besturingssysteem thuis-pc | Ubuntu 24.04 (pakketversies `…ubuntu9.9`, `t64`-libs) — **niet** Debian; de VPS wordt Debian 13 | `dpkg -l` |
| Python in de venv | **niet vast te stellen** (venv niet leesbaar); deel A houdt 3.12.3 aan uit `LOG-analfabeten` | — |
| `/etc/solidari/.env` | bestaat, `-rw------- solidari:solidari`, 1094 bytes, ongewijzigd sinds 18-05-2026. Inhoud niet gelezen (geen sudo, en niet nodig) | `ls -la /etc/solidari/` |
| Naam env-variabele | `ANTHROPIC_API_KEY` — bevestigd in `config.py` r.35. **Let op:** het oude `solidari-backend/.env.oud` gebruikt nog `ANTHROPIC_KEY`; dat is de bron van de fout in `INSTRUCTIES.md`. Voor de VPS geldt `ANTHROPIC_API_KEY` | `grep config.py` |
| Patches op de repo-kopie | **alle zeven toegepast** — geverifieerd met `patch --dry-run -R` (alle zes `.patch` reverse-toepasbaar) en `routes/tts.py` aanwezig; `grep -c OCR-tekst routes/brief.py` = 0, `ProxyFix` in `app.py`, `SOLIDARI_DEBUG_REDACTIE` in `ai.py` | `patch`, `grep` |
| `/opt` vs. repo-kopie | **niet te vergelijken** (geen sudo). Indirect bewijs dat de draaiende code dezelfde tak is: `POST /api/analyseer` met leeg lichaam geeft live exact `{"fout":"Geen bestand meegestuurd."}`, de string uit `routes/brief.py` r.33 | `curl` + `grep` |
| Oude `solidari.log` | **niet vernietigd** — geen sudo. Bevat volgens afwijking A-1 maandenlang ruwe OCR-brieftekst | — |

### Nulmeting productie (01-09-2026, thuis-pc aan)

| Aanroep | Status | Tijd | Antwoord |
|---|---|---|---|
| `POST https://api.solidari.nl/api/analyseer` met `{}` | **400** | 0,052 s | `{"fout":"Geen bestand meegestuurd."}` |
| `POST /api/health` | 404 | 0,053 s | Flask-404 — bevestigt: route bestaat nog niet, komt van de patch |
| `POST /api/ping` | 405 | 0,041 s | route bestaat, alleen GET |

DNS bij aanvang (terugvalpad fase 4.4): `api.solidari.nl` **A = 185.117.111.55**, **geen AAAA-record**, `api-test.solidari.nl` bestaat niet.

## C. Nieuwe situatie (VPS) — INVULLEN in fase 6

```
server.json:
uname -m / os-release:
espeak.conf:
tesseract --list-langs:
certbot certificates:
```
