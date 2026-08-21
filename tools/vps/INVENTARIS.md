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

## B. Draaiende installatie op jasper-pc — INVULLEN (PLAN-1 fase 0.3/0.4)

```
systemctl cat solidari            → ExecStart/WorkingDirectory/Environment:
/opt/solidari-backend/venv/bin/python --version →
venv pip freeze → requirements.lock.txt (aanmaken!)
sudo nginx -T | sed -n '/api.solidari.nl/,/}/p' →
dpkg -l | grep -i 'tesseract\|poppler' →
tesseract --list-langs →
sudo ls -la /etc/solidari/ →
sudo diff -rq /opt/solidari-backend solidari-backend --exclude venv --exclude __pycache__ →
sudo grep -c 'OCR-tekst' /opt/solidari-backend/solidari.log →   (daarna shred -u)
nulmeting: curl … /api/analyseer -d '{}' → code + tijd:
```

## C. Nieuwe situatie (VPS) — INVULLEN in fase 6

```
server.json:
uname -m / os-release:
espeak.conf:
tesseract --list-langs:
certbot certificates:
```
