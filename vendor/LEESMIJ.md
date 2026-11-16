# Scripts van anderen, op eigen plek

De Budgethulp gebruikt twee bibliotheken voor het downloaden van Excel en PDF. Ze staan hier
in plaats van op een CDN (PLAN 19, B-9): de pagina laadt niets van een andere partij, en een
bestand kan niet ongemerkt veranderen.

| Bestand | Bibliotheek | Versie | Licentie | Bron |
|---|---|---|---|---|
| `xlsx.full.min.js` | SheetJS (xlsx) | 0.18.5 | Apache-2.0 | `https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js` |
| `jspdf.umd.min.js` | jsPDF | 2.5.1 | MIT | `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js` |

De bestanden zijn ongewijzigd. Opgehaald op 16-11-2026; de SHA-512 was gelijk aan de
`integrity`-waarde die cdnjs voor deze versies opgeeft.

## SHA-256

```
c9506197caf809a075b6dee1da0d36fb19da7158ffe8a88e7b0c96c5d8623c99  xlsx.full.min.js
98ccf17aa10c20bb1301762618fcc9b6ab3a4e7f26b6071d64d0b41154df3875  jspdf.umd.min.js
```

Controleren: `cd vendor && sha256sum -c <(sed -n '/^```$/,/^```$/p' LEESMIJ.md | grep js)`
of gewoon `sha256sum vendor/*.js` en vergelijken.

## Bijwerken

Een nieuwe versie: het bestand vervangen, de versie en de SHA-256 hier aanpassen, en de
Excel- en PDF-tests van de Budgethulp draaien. `jspdf.umd.min.js` verwijst onderaan naar een
`.map`-bestand; dat staat hier niet en is alleen voor ontwikkelaars (de browser vraagt het
alleen op met de ontwikkelhulp open).
