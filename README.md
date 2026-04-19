# Solidari

**Gratis digitale tools voor iedereen die moeite heeft met officiële communicatie.**

Solidari helpt nieuwkomers, statushouders en laaggeletterden navigeren door brieven, toeslagen, rechten en digitale overheidsdiensten — in 9 talen, zonder account, zonder advertenties.

🌐 **[solidari.nl](https://solidari.nl)**

---

## Tools

| Tool | Beschikbaarheid | Talen |
|---|---|---|
| 📬 Brief Begrijper | ☀️ Bij zon (lokale AI) | NL EN AR TR TI UK FA |
| 💬 Budgethulp | ☀️ Bij zon (Claude API) | NL EN AR TR TI UK FA RO PL |
| 💶 Loont Werken? | ✓ Altijd | NL EN AR TR TI UK FA RO PL |
| 🇳🇱 Naturalisatie Checker | ✓ Altijd | NL |
| 🎂 18 Jaar Worden | ✓ Altijd | NL EN AR TR TI UK FA RO PL |
| ⚖️ Rechten & Plichten | ✓ Altijd (Claude API) | NL EN AR TR TI UK FA RO PL |
| 💻 Digi Hulp | ✓ Altijd (Claude API) | NL EN AR TR TI UK FA RO PL |

---

## Architectuur

```
Gebruiker → GitHub Pages (statisch, altijd aan)
                ↓ API-verzoek bij AI-tools
        Cloudflare Worker (proxy, rate limiting)
                ↓ bij zonne-overschot
         Lenovo PC thuis (Flask + Gunicorn)
         ├── Ollama — Gemma 3 4B (GPU, CUDA)
         └── Claude API (Haiku, via Flask-proxy)
```

**Frontend:** Statische HTML/CSS/JS — geen buildstap, geen framework. Gedeelde architectuur via `components.js`, `components.css` en `i18n.js`.

**Backend:** Flask op Ubuntu (Linux Mint 22.3), nginx reverse proxy, Let's Encrypt HTTPS. Draait als `solidari` systeemgebruiker zonder root-rechten.

**AI-routing:**
- Lokaal (Ollama / Gemma 3 4B): NL, EN, AR, TR, UK, RO, PL
- Claude API verplicht: TI (Tigrinya), FA (Dari) — onvoldoende trainingsdata in lokale modellen
- Brief Begrijper: **nooit** cloud-fallback — privacygevoelig

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
digihulp.html           Digi Hulp
feedback.html           Feedbackformulier
feedback-analyse.html   Privétool: feedback exporteren en analyseren

components.css          Gedeelde stijlen + CSS-variabelen
components.js           Nav/footer injectie, taalwisseling, dropdown
i18n.js                 Centraal vertaalsysteem (9 talen)
lw-i18n.js              Vertalingen specifiek voor loont-werken.html
18jaar-data-1.js        18-jaar data: NL, EN, AR, TR
18jaar-data-2.js        18-jaar data: TI, UK, FA
18jaar-data-3.js        18-jaar data: RO, PL

solidari-worker.js      Cloudflare Worker (Claude API proxy)
```

---

## Talen

| Code | Taal | RTL | AI-backend |
|---|---|---|---|
| NL | Nederlands | — | Ollama |
| EN | Engels | — | Ollama |
| AR | Arabisch | ✓ | Ollama |
| TR | Turks | — | Ollama |
| TI | Tigrinya | — | Claude API |
| UK | Oekraïens | — | Ollama |
| FA | Dari/Farsi | ✓ | Claude API |
| RO | Roemeens | — | Ollama |
| PL | Pools | — | Ollama |

---

## Privacyprincipes

- Geen opslag van persoonsgegevens — alles in RAM, direct vernietigd na verwerking
- Geen cookies, geen tracking, geen analytics
- Brief Begrijper verwerkt lokaal via Ollama — nooit naar externe servers
- Geen cloud-fallback voor Brief Begrijper, ook niet bij offline backend
- AVG-compliant; verwerkersovereenkomst met Anthropic voor Claude API-gebruik

---

## Lokaal draaien

```bash
# Frontend
# Open index.html direct in de browser, of gebruik een eenvoudige HTTP-server:
python3 -m http.server 8080

# Backend (vereist Linux, Python 3.11+, Ollama)
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
