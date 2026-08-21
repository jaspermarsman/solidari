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
