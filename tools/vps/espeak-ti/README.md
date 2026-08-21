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
