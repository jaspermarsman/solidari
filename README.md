# Solidari

**Gratis digitale tools voor iedereen die moeite heeft met officiële communicatie.**

Solidari helpt nieuwkomers, statushouders en laaggeletterden navigeren door brieven, toeslagen, rechten en digitale overheidsdiensten — in 9 talen, zonder account, zonder advertenties.

🌐 **[solidari.nl](https://solidari.nl)**

---

## Tools

| Tool | Beschikbaarheid | Talen |
|---|---|---|
| 📬 Brief Begrijper | ☀️ Bij zon (Claude API + lokale PII-redactie) | NL EN AR TR TI UK FA RO PL |
| 💬 Budgethulp | ☀️ Bij zon (Claude API) | NL EN AR TR TI UK FA RO PL |
| 💶 Loont Werken? | ✓ Altijd | NL EN AR TR TI UK FA RO PL |
| 🇳🇱 Naturalisatie Checker | ✓ Altijd | NL |
| 🎂 18 Jaar Worden | ✓ Altijd | NL EN AR TR TI UK FA RO PL |
| ⚖️ Rechten & Plichten | ✓ Altijd (Claude API) | NL EN AR TR TI UK FA RO PL |
| 📋 Goed Voorbereid | ✓ Altijd | NL EN AR TR TI UK FA RO PL |

---

## Architectuur

```
Gebruiker → GitHub Pages (statisch, altijd aan)
                ↓ API-verzoek bij AI-tools
        Cloudflare Worker (proxy, rate limiting)
                ↓ bij zonne-overschot
         Lenovo PC thuis (Flask + Gunicorn)
         ├── OCR + PII-redactie (lokaal)
         └── Claude API (Haiku) — geanonimiseerde brieftekst
```

**Frontend:** Statische HTML/CSS/JS — geen buildstap, geen framework. Gedeelde architectuur via `components.js`, `components.css` en `i18n.js`.

**Backend:** Flask op Ubuntu (Linux Mint 22.3), nginx reverse proxy, Let's Encrypt HTTPS. Draait als `solidari` systeemgebruiker zonder root-rechten.

**AI-routing:**
- Brief Begrijper: OCR en PII-redactie lokaal → geanonimiseerde tekst naar Claude API (Haiku)
- Overige tools (Budgethulp, Rechten & Plichten): Claude API direct — geen privacygevoelige documenten
- *(Digi Hulp is verwijderd, besluit 2026-07-06.)*

**Sleep-automatisering:** Home Assistant monitort zonneopbrengst (`sensor.electricity_meter_power_production`). Bij >400W wekt het de PC en blokkeert slaapstand via Flask-endpoint + systemd inhibit lock.

---

## Bestanden

```
index.html              Homepage
over.html               Over dit project + privacysectie (#privacy)
brief.html              Brief Begrijper
budgethulp.html         Budgethulp
loont-werken.html       Loont Werken?
naturalisatie.html      Naturalisatie Checker
18jaar.html             18 Jaar Worden
rechten.html            Rechten & Plichten
goedvoorbereid.html     Goed Voorbereid
vertaalhulp.html        Vertaalhulp (correctietool voor de 9 talen)
feedback.html           Feedbackformulier
feedback-analyse.html   Privétool: feedback exporteren en analyseren

components.css          Gedeelde stijlen + CSS-variabelen
components.js           Nav/footer injectie, taalwisseling, dropdown
i18n.js                 Centraal vertaalsysteem (9 talen)
lw-i18n.js              Vertalingen specifiek voor loont-werken.html
18jaar-data-1.js        18-jaar data: NL, EN, AR, TR
18jaar-data-2.js        18-jaar data: TI, UK, FA
18jaar-data-3.js        18-jaar data: RO, PL

spraak.js               Voorlees- en spraakinvoermotor (gelaagd, §Toegankelijkheid)
spraak.css              Stijlen voor 🔊-knoppen, mic, luistermodus, welkomstscherm
audio/<TAAL>/*.mp3       Voorgegenereerde spraakclips per taal (349 stuks)
audio/manifest-<taal>.json  hash → {duur} + generatorbron per taal
tools/audio/            Pijplijn (extract.js, genereer_mms.py, genereer_gemini.py, valideer.js)
tests/                  Playwright-acceptatietests (buiten de site)

solidari-worker.js      Cloudflare Worker (Claude API proxy)
```

---

## Toegankelijkheid (spraak voor wie niet leest)

De site is bruikbaar met **spraak-in en spraak-uit**, zodat ook wie niet kan lezen
elke tool kan gebruiken. Eén gedeeld component (`spraak.js`, `spraak.css`) op elke pagina.

**Voorlezen — gelaagd, per taal gekozen:**
1. **Voorgegenereerd audiobestand** (`audio/<TAAL>/<hash>.mp3`) — instant, overal gelijk, ook offline. Standaardteksten (UI, toolnamen, taalnamen, `zeg`-zinnen) staan vooraf klaar in alle 9 talen.
2. **Browser-`speechSynthesis`** — waar het toestel een stem heeft.
3. **Worker-TTS (Gemini)** — voorbereid voor dynamische AI-antwoorden; activeert zodra er een sleutel staat (zie `bouwplannen/WORKER-UPGRADE.md`).

Tigrinya heeft géén browserstem en geen cloud-TTS-dekking; daarom draait de audio via
laag 1, vooraf gegenereerd met **Meta's MMS-model** (`facebook/mms-tts-*`, VITS + uroman).

**Spreken:** microfoonknop bij tekstvelden (browser-`SpeechRecognition`); `brief.html`
opent op mobiel direct de camera. Een `/api/stt`-route (Gemini) is voorbereid.

**Verder:** runtime-taalkiezer met gesproken eigennaam, welkomstscherm bij eerste bezoek,
luistermodus (tik-om-te-lezen), `noindex`/testbalk buiten `solidari.nl`, AA-contrast,
raakvlakken ≥ 44 px. Audio-generatie: `python tools/audio/genereer_mms.py && node tools/audio/valideer.js`.

> **Bevinding (buiten scope):** `brief.html` verwijst naar de backend `https://api.solidari.nl`
> (Worker/Flask). Dat is de bestaande AI-backend en valt buiten dit toegankelijkheidswerk.

---

## Talen

| Code | Taal | RTL | AI-backend |
|---|---|---|---|
| NL | Nederlands | — | Claude API (Haiku) |
| EN | Engels | — | Claude API (Haiku) |
| AR | Arabisch | ✓ | Claude API (Haiku) |
| TR | Turks | — | Claude API (Haiku) |
| TI | Tigrinya | — | Claude API (Haiku) |
| UK | Oekraïens | — | Claude API (Haiku) |
| FA | Dari/Farsi | ✓ | Claude API (Haiku) |
| RO | Roemeens | — | Claude API (Haiku) |
| PL | Pools | — | Claude API (Haiku) |

---

## Privacyprincipes

- Geen opslag van persoonsgegevens — alles in RAM, direct vernietigd na verwerking
- Geen cookies, geen tracking, geen analytics
- Brief Begrijper: OCR en PII-redactie (BSN, IBAN, adres, kenmerknummers) lokaal — alleen geanonimiseerde brieftekst naar Claude API
- Geen cloud-fallback voor Brief Begrijper bij offline backend
- Gebruiker geeft expliciete toestemming vóór upload (akkoordcheckbox)
- AVG-compliant; DPA met Anthropic van toepassing via Commercial Terms of Service (effectief 24 feb 2025)
- Anthropic bewaart API-data maximaal 30 dagen; feedbackdeling uitgeschakeld

---

## Lokaal draaien

```bash
# Frontend
# Open index.html direct in de browser, of gebruik een eenvoudige HTTP-server:
python3 -m http.server 8080

# Backend (vereist Linux, Python 3.11+)
cd /opt/solidari-backend
pip install -r requirements.txt
gunicorn --bind 0.0.0.0:5000 app:app
```

Omgevingsvariabelen in `/etc/solidari/.env`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Ontwikkeld door

[Jasper Marsman](https://www.linkedin.com/in/jaspermarsman/) — civic tech, AI in de publieke sector.

Solidari is een onafhankelijk project. Geen bedrijf, geen subsidie. Gebouwd op de overtuiging dat goede informatie voor iedereen toegankelijk moet zijn.

---

*Geen rechten voorbehouden — vrij te delen en te hergebruiken.*
