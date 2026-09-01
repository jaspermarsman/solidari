# eSpeak NG — Tigrinya-uitbreiding (TigrinyaNLP)

Tigrinya (`-v ti`) zit **niet** in het Debian-pakket `espeak-ng`. Het komt uit de fork van
TigrinyaNLP, uitgebracht als losse datamap die naast de systeemdata wordt gezet:

- Bron: https://github.com/TigrinyaNLP/espeak-ng/releases/tag/espeak-ng-data-plus-ti_1.0
- Bestand: `espeak-ng-data.zip` (≈ 9,1 MB), sha256 in `espeak-ng-data.zip.sha256`
- Licentie: GPL-3.0 (de fork erft de licentie van espeak-ng; zie JURIDISCH.md §6 — de gegenereerde audio valt er niet onder)
- Maintainer van de stem (uit `lang/sem/ti`): Biniam Gebremichael
- Installatie: `tools/vps/installeer.sh` → `/opt/espeak-ti/espeak-ng-data/`, aanroep `espeak-ng --path=/opt/espeak-ti -v ti`
- Paden staan in `/etc/solidari/espeak.conf` (`ESPEAK_BIN`, `ESPEAK_DATA`); `/api/tts` leest die via de systemd-unit

Een `apt upgrade` van espeak-ng raakt `/opt/espeak-ti` niet. De wekelijkse health-check draait de
acceptatietest opnieuw en logt een waarschuwing als de stem stukgaat (dan: route b in installeer.sh).

## Droogtest 21-08-2026 (sandbox, espeak-ng 1.51 / Ubuntu 24.04)
- `--voices=ti` → `5  ti  --/M  Tigrinya  sem/ti`
- "ሰላም ከመይ ኣለኻ" → wav 2,41 s, mean_volume −19,8 dB (hoorbaar)
- 1400 tekens via `/api/tts` → mp3 in 1,3 s (x86); verwacht op CAX11 (arm64): 2–3 s
- Debian 13 levert espeak-ng 1.52 — de dictionary werkte met 1.51; PLAN-1 fase 3.3 herhaalt de test op de echte machine.

## Acceptatie op de echte VPS, 02-09-2026 (PLAN-4 fase 1) — GROEN

- **eSpeak NG 1.52.0** op Debian 13 (systeemdata in `/usr/lib/x86_64-linux-gnu/espeak-ng-data`,
  fork-data in `/opt/espeak-ti`). De 1.51-dictionary werkt ongewijzigd met 1.52.
- Stem zichtbaar: `5  ti  --/M  Tigrinya  sem/ti`
- Release `espeak-ng-data-plus-ti_1.0`, sha256 `ed09324e…7557a` — gecontroleerd bij de installatie
  (`installeer.sh` breekt af als de checksum niet klopt). **Route a** volstond; de bronbouw (route b)
  was niet nodig.

| Testzin | Duur | Gemiddelde luidheid |
|---|---|---|
| `ሰላም ከመይ ኣለኻ` | 2,41 s | −19,8 dB |
| `ናይ BSN ቁጽርኻ 123456782 እዩ።` | 12,53 s | −18,9 dB |
| `ናብ DigiD እቶ።` | 3,30 s | −18,2 dB |
| `ምምሕዳር ከተማ ደብዳቤ ሰዲዱልካ ኣሎ።` | 4,53 s | −18,8 dB |

Alle vier ruim boven de drempel (> 0,5 s, > −50 dB). **Voor de native review (W-B):** een BSN-nummer
duurt 12,5 s omdat eSpeak de cijfers los uitspreekt. Waarschijnlijk juist goed voor deze doelgroep,
maar een spreker moet dat bevestigen — net als het tempo `-s 130`.

**`/api/tts` live gemeten (02-09-2026):** 200 in **0,26 s**, `Content-Type: audio/mpeg`,
`Cache-Control: no-store`, mp3 mono 16 kHz 48 kbps. Foutpaden: andere taal → 400, leeg → 400,
boven 2000 tekens → 413. Logtest met marker `ZEBRA-7731-KOEKOEK`: **0 treffers** in access-, error-,
app-, nginx- en journal-logs; geen temp-restanten in `PrivateTmp`.

**Voorgegenereerde clips:** `tools/audio/genereer_espeak.py` op de VPS → 37 clips, 0,69 MB,
`manifest-ti.json` met `"bron": "espeak"`, nul mislukt.
