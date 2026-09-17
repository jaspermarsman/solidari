# Solidari

**Gratis digitale tools voor iedereen die moeite heeft met officiële communicatie.**

Solidari helpt nieuwkomers, statushouders en laaggeletterden navigeren door brieven, toeslagen, rechten en digitale overheidsdiensten — in 9 talen, zonder account, zonder advertenties.

🌐 **[solidari.nl](https://solidari.nl)**

---

## Tools

Alle tools zijn 24 uur per dag beschikbaar.

| Tool | AI | Talen |
|---|---|---|
| 📬 Brief Begrijper | Claude API + PII-redactie op eigen server | NL EN AR TR TI UK FA RO PL |
| 💬 Budgethulp | Claude API | NL EN AR TR TI UK FA RO PL |
| 💶 Loont Werken? | — | NL EN AR TR TI UK FA RO PL |
| 🇳🇱 Naturalisatie Checker | — | NL |
| 🎂 18 Jaar Worden | — | NL EN AR TR TI UK FA RO PL |
| ⚖️ Rechten & Plichten | Claude API | NL EN AR TR TI UK FA RO PL |
| 📋 Goed Voorbereid | — | NL EN AR TR TI UK FA RO PL |

---

## Architectuur

```
Gebruiker → GitHub Pages (statisch, altijd aan)
                ↓
    ┌───────────┴────────────────────────────┐
    │                                        │
Cloudflare Worker                    api.solidari.nl
(Budgethulp, Rechten,                Hetzner VPS, 24/7
 Vertaalhulp, Feedback)              (Flask + Gunicorn achter nginx)
    ↓                                ├── OCR + PII-redactie (op de server zelf)
Claude API                           └── Claude API (Haiku) — geanonimiseerde brieftekst
```

**Frontend:** Statische HTML/CSS/JS — geen buildstap, geen framework. Gedeelde architectuur via `components.js`, `components.css` en `i18n.js`.

**Backend:** Flask op Debian 13, nginx reverse proxy, Let's Encrypt HTTPS, op een eigen server bij Hetzner (Neurenberg, EU). Draait als `solidari` systeemgebruiker zonder root-rechten, met `ProtectSystem=strict`, ufw en fail2ban. De server is 24/7 bereikbaar; er is geen thuis-pc en geen zonne-afhankelijkheid meer in de keten. Naast `api.solidari.nl` luistert dezelfde server op `api-test.solidari.nl`, de staging-ingang waar wijzigingen eerst getest worden.

**AI-routing:**
- Brief Begrijper: OCR en PII-redactie lokaal → geanonimiseerde tekst naar Claude API (Haiku)
- Overige tools (Budgethulp, Rechten & Plichten): Claude API direct — geen privacygevoelige documenten
- *(Digi Hulp is verwijderd, besluit 2026-07-06.)*

**Beschikbaarheid:** een health-controle draait elke vijf minuten en herstart de dienst na drie mislukte pogingen (maximaal drie keer per uur). Beveiligingsupdates worden automatisch geïnstalleerd, met een herstartvenster om 05:00. Dagelijkse backups bij Hetzner.

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
audio/manifest-<taal>.json  hash → {duur} + generatorbron per taal (nu alle negen leeg)
tools/audio/            Pijplijn (extract.js, genereer_espeak.py, genereer_gemini.py, valideer.js)
tests/                  Playwright-acceptatietests (buiten de site)

solidari-worker.js      Cloudflare Worker (Claude API proxy)
```

---

## Toegankelijkheid (spraak voor wie niet leest)

De site is bruikbaar met **spraak-in en spraak-uit**, zodat ook wie niet kan lezen
elke tool kan gebruiken. Eén gedeeld component (`spraak.js`, `spraak.css`) op elke pagina.

**Voorlezen — gelaagd, per taal gekozen:**
1. **Voorgegenereerd audiobestand** (`audio/<TAAL>/<hash>.mp3`) — instant, overal gelijk, ook offline. Op dit moment staan er geen clips; de laag blijft in `spraak.js` zitten.
2. **Browser-`speechSynthesis`** — waar het toestel een stem heeft. Dit is nu de enige laag die daadwerkelijk klinkt.
3. **Externe route** (`registreerRoute`) — voorbereid, niets geregistreerd.

**Tigrinya wordt niet voorgelezen** (besluit S-7, 17-09-2026). Er is voor die taal maar
één beschikbare stem — eSpeak NG met de Tigrinya-uitbreiding van TigrinyaNLP — en een
moedertaalspreker beoordeelde die als niet goed genoeg om aan te bieden. De voorgegenereerde
clips zijn verwijderd en de frontend roept `/api/tts` niet meer aan; die route blijft wél op
de server staan voor als er ooit een betere stem is. Tekst, vertaling en weergave in het
Tigrinya werken onveranderd — alleen de 🔊-knop blijft weg, zonder foutmelding. Vervolg in
`_werkdocumenten/bouwplannen/BACKLOG-tigrinya-stem.md`.

**Spreken:** microfoonknop bij tekstvelden (browser-`SpeechRecognition`); `brief.html`
opent op mobiel direct de camera. Een `/api/stt`-route (Gemini) is voorbereid.

**Verder:** runtime-taalkiezer met gesproken eigennaam, welkomstscherm bij eerste bezoek,
luistermodus (tik-om-te-lezen), `noindex`/testbalk buiten `solidari.nl`, AA-contrast,
raakvlakken ≥ 44 px. De audiopijplijn in `tools/audio/` blijft bruikbaar
(`node tools/audio/extract.js && node tools/audio/valideer.js`), maar genereert op dit
moment niets: `valideer.js` bewaakt juist dat er géén TI-clips terugkomen.

`brief.html` praat rechtstreeks met `https://api.solidari.nl` — de eigen server, niet de Worker,
omdat OCR en PII-redactie dáár draaien.

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
- Brief Begrijper heeft geen cloud-fallback: gaat de eigen server plat, dan is de tool tijdelijk niet bereikbaar — de onbewerkte brief gaat nooit alsnog naar een AI-leverancier
- Gebruiker geeft expliciete toestemming vóór upload (akkoordcheckbox)
- AVG-compliant; DPA met Anthropic van toepassing via Commercial Terms of Service (effectief 24 feb 2025)
- Anthropic bewaart API-data maximaal 30 dagen; feedbackdeling uitgeschakeld

---

## Lokaal draaien

```bash
# Frontend
# Open index.html direct in de browser, of gebruik een eenvoudige HTTP-server:
python3 -m http.server 8080

# Backend (vereist Linux, Python 3.11+). Op de server: /opt/solidari-backend
cd solidari-backend
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

Solidari begon als het project van één persoon en wordt onderhouden vanuit Marsman Sociale Innovatie. Geen subsidie, geen advertenties, geen verdienmodel. Gebouwd op de overtuiging dat goede informatie voor iedereen toegankelijk moet zijn.

---

## Licentie

De **code** staat onder de [MIT-licentie](LICENSE). De **inhoud** — teksten, uitleg en vertalingen —
staat onder [CC BY 4.0](CONTENT-LICENSE.md): vrij te delen en te bewerken, mits met naamsvermelding.

De naam **Solidari** en het logo vallen niet onder deze licenties.
