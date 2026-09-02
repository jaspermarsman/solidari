# tools/vps — Solidari-backend op een Hetzner VPS

Alles wat nodig is om `api.solidari.nl` vanaf nul op te bouwen, te beheren en terug te draaien.
Context en volgorde: `_werkdocumenten/bouwplannen/UITVOERING-autonoom.md` en `PLAN-1-vps-migratie.md`.

## De server zoals hij nu draait (02-09-2026)

| | |
|---|---|
| Naam / id | `solidari-api` · 164242449 · Hetzner project **Solidari** |
| Type | **cx23** (x86, 2 vCPU / 4 GB / 40 GB) — **niet** cax11: ARM was bij het aanmaken in geen enkele locatie te bestellen (`available: false` in fsn1, nbg1 én hel1) |
| Locatie | `nbg1` (Neurenberg, DE) |
| Besturingssysteem | Debian 13 (trixie), Python 3.13.5 |
| IPv4 / IPv6 | 94.130.226.240 · 2a01:4f8:c0c:ea61::1 |
| Hostnamen | `api.solidari.nl` (productie) én `api-test.solidari.nl` (staging-ingang, besluit S-3) — **één server, één certificaat, één rate-limit-zone** |
| SSH | `ssh solidari-vps` (key `id_ed25519`, "lenovo"); host key `SHA256:vTV29oB0XGvsJn1rMGzmOM6Y5/jcSYAw9E3aGaGonPo` |
| Backups | **uit** (besluit A6 herzien bij W-A, 02-09-2026) — de server is stateless; zie "Snapshot en herstel" |
| Kosten | server **€6,64/mnd bruto** — verder niets |

`api-test` is een staging-**ingang**, geen aparte omgeving: zelfde code, zelfde sleutel, zelfde limieten.
`brief.html` kiest op hostname — draait de pagina op `github.io`, dan `api-test`, anders `api`.

| Bestand | Draait op | Doet |
|---|---|---|
| `aanmaak.sh` | jasper-pc | Server, cloud-firewall en SSH-key aanmaken via de Hetzner-API (`HCLOUD_TOKEN` uit `~/.config/solidari/geheimen.env`). Schrijft `server.json` en host `solidari-vps` in `~/.ssh/config`. Idempotent. `--dry-run` toont alleen de commando's. |
| `installeer.sh` | VPS (root) | Pakketten, eSpeak-Tigrinya, gebruiker `solidari`, venv, systemd, nginx, ufw, fail2ban, unattended-upgrades. Idempotent. `--alleen-systeem` zonder venv/app; `--dry-run` zonder systemctl/ufw. |
| `systemd/` | VPS | `solidari.service` (gunicorn, gehard), `solidari-health.timer/.service` (elke 5 min) |
| `nginx/` | VPS | `solidari-limits.conf` (rate-zones), `api.solidari.nl.conf` (proxy, headers, limieten; certbot voegt TLS toe) |
| `health-check.sh` | VPS | health-cron met herstartlimiet (3/uur), wekelijkse schijf- en espeak-test → `/var/log/solidari/health.log` |
| `logrotate.conf`, `fail2ban-solidari.local` | VPS | 14 dagen logs; sshd- en nginx-limit-req-jails |
| `espeak-ti/` | repo | checksum + README van de Tigrinya-datamap |
| `INVENTARIS.md` | repo | de werkelijkheid van de oude én nieuwe installatie (PLAN-1 fase 0/6) |
| `server.json` | repo | IP's en id van de VPS (geen geheimen) — ontstaat in fase 3.0 |

## Van nul naar live (PLAN-1 fase 3–4, samengevat)

```bash
tools/vps/aanmaak.sh                                   # 3.0  server
ssh solidari-vps 'cat /etc/os-release; uname -m'       # 3.1  trixie / x86_64
# 3.2  code. Bron is de repo-kopie solidari-backend/ (die heeft de zeven patches uit
#      tools/vps/patches/ en is met redactie_test.py geverifieerd). Sluit .env, .oud
#      en .save* expliciet uit — .env.oud bevat de oude sleutel en een HA-token.
rsync -a --delete --exclude venv --exclude __pycache__ --exclude '*.pyc' \
      --exclude '.env' --exclude '.env.*' --exclude '*.env' \
      --exclude '*.save' --exclude '*.save.1' --exclude '*.oud' \
      solidari-backend/ solidari-vps:/opt/solidari-backend/
rsync -a tools/vps/ solidari-vps:/opt/solidari-backend/tools/vps/    #      scripts mee
rsync -a tools/test/nepbrief.jpg tools/test/nepbrief.pdf tools/test/redactie_test.py \
      solidari-vps:/opt/solidari-backend/tools/test/                 #      testmateriaal mee
ssh solidari-vps 'bash /opt/solidari-backend/tools/vps/installeer.sh'        # 3.3
ssh solidari-vps 'bash /opt/solidari-backend/tools/vps/installeer.sh'        # 3.4  idempotentie
# 3.5 sleutel — zie PLAN-1 fase 3.5 (heredoc via ssh, nooit als argument)
ssh solidari-vps 'cd /opt/solidari-backend && ./venv/bin/python tools/test/redactie_test.py'   # 3.6 HARDE POORT
curl -s -H 'Host: api.solidari.nl' http://<IPv4>/api/health                                    # 3.6
# 3.7 api-test: DNS A+AAAA via Chrome (oneHome), dan
ssh solidari-vps 'certbot --nginx -d api-test.solidari.nl --non-interactive --agree-tos -m <e-mail> --redirect'
# 4.0 DNS api via Chrome (oneHome) → 4.1 dig pollen → 4.2 certificaat uitbreiden:
ssh solidari-vps 'certbot certonly --nginx -d api.solidari.nl -d api-test.solidari.nl --expand --staging --dry-run'
ssh solidari-vps 'certbot --nginx -d api.solidari.nl -d api-test.solidari.nl --expand --non-interactive --agree-tos -m <e-mail> --redirect'
# Let op: --dry-run werkt alleen met certonly/renew, niet met de `run`-vorm.
```

## Beheer

```bash
ssh solidari-vps systemctl status solidari            # draait hij
ssh solidari-vps journalctl -u solidari -n 50         # laatste logregels
ssh solidari-vps tail -n 20 /var/log/solidari/health.log
ssh solidari-vps cat /var/log/solidari/ai-teller.json  # AI-aanroepen per dag (fase 5.2; drempel 300)
ssh solidari-vps 'systemctl restart solidari'
ssh solidari-vps 'apt-get update && apt-get -y dist-upgrade'   # handmatig; security-updates gaan automatisch, reboot 05:00
hcloud server create-image --type snapshot --description "solidari-api na fase 8" solidari-api
```

## Snapshot en herstel

**Er staan geen dagelijkse backups aan** (besluit A6, herzien bij W-A op 02-09-2026). Reden: deze
server is stateless. Alles erop is reproduceerbaar uit deze repo — `aanmaak.sh` + `rsync` +
`installeer.sh` zetten hem in ongeveer een kwartier opnieuw neer. Het enige dat níét in de repo
staat is `/etc/solidari/.env`, en dat is één regel met de Anthropic-sleutel; die staat ook in de
Anthropic Console. Zeven dagelijkse kopieën betalen van iets wat je in vijftien minuten opnieuw
bouwt, is weggegooid geld.

Wat er wél is: **één snapshot als vast terugvalpunt**, gemaakt ná PLAN-1 fase 8 (dus als de server
compleet en stabiel is).

```bash
# maken (eenmalig, na fase 8)
hcloud server create-image --type snapshot \
    --description "solidari-api na fase 8" --label project=solidari solidari-api
hcloud image list --type snapshot            # id noteren

# terugzetten — LET OP: overschrijft de schijf van de draaiende server
hcloud server rebuild solidari-api --image <snapshot-id>
# daarna de sleutel opnieuw plaatsen (PLAN-1 fase 3.5) en health controleren
```

Kosten van een snapshot: €0,0119 per GB per maand over het *gebruikte* deel van de schijf —
bij ±3 GB is dat ongeveer **€0,04 per maand**. Verwijder een oude snapshot voordat je een
nieuwe maakt (`hcloud image delete <id>`), anders stapelen ze op.

## Herstel en terugvallen

- **VPS onbereikbaar:** `hcloud server reboot solidari-api`; daarna health. Blijft hij stuk: herbouw uit de snapshot (`hcloud server rebuild`), of vanaf nul met de stappen hierboven (≈ 15 min) — de code staat op jasper-pc (`solidari-backend/` in de werkmap, gitignored), de sleutel in het geheimenbestand of in Anthropic Console.
- **Terug naar de thuis-pc (alleen vóór PLAN-1 fase 7):** DNS `api` A/AAAA terug naar het oude IP (staat in `LOG-vps.md` fase 4.0), FRITZ!Box-vrijgave 443 weer aan, `sudo systemctl start solidari` thuis.
- **Server weg:** `hcloud server delete solidari-api` (firewall en ssh-key mogen blijven). Kost daarna niets meer.

## Bekende eigenaardigheden (uit de droogtest van 21-08-2026)

- `requirements.txt` mist `reportlab` (gebruikt door `routes/cursusblad.py`); `installeer.sh` gebruikt `requirements.lock.txt` als die bestaat — maak die in PLAN-1 fase 0 met `pip freeze` van de draaiende venv. Tot die tijd staat reportlab expliciet in `requirements.txt`.
- Tesseract-talen volgen `services/ocr.py` (`nld eng ara tur ukr fas`), niet de aanname "alleen nld+eng" uit PLAN-1 v1.0.
- OCR van een A4-scan kost ≈ 8–10 s op x86; compressie naar 1568 px scheelt vooral upload, niet OCR-tijd. Op arm64 meten (fase 3.6).
- De backend-map in de repo (`solidari-backend/`) is de **bron** geworden voor de VPS. Op 02-09-2026 kon `/opt/solidari-backend` op jasper-pc niet gelezen worden (`sudo` vraagt een wachtwoord dat de agent niet heeft), dus is de vergelijking `diff -r` nooit gemaakt. De repo-kopie is wél aantoonbaar de geteste tak: alle zeven patches uit `patches/` zijn reverse-toepasbaar, en de redactietest op de VPS is groen.

## Eigenaardigheden die tijdens de uitrol boven kwamen (02-09-2026)

- **`installeer.sh` deed de `chown` te laat.** De rsync zet root-eigendom (en soms mode 600) op de code; `sudo -u solidari pip install -r requirements.txt` kon dat niet eens lezen. De chown/chmod staat nu vóór de venv. De chmod slaat `venv/` over — een blanket `chmod 640` neemt `venv/bin/pip` zijn x-bit af en de installatie loopt daarna vast op "command not found".
- **gunicorn 26 opent een control-socket in de werkmap.** Met `ProtectSystem=strict` geeft dat bij elke start `[ERROR] Control server error: Read-only file system: '.gunicorn'`. Opgelost met `--no-control-socket` in de unit.
- **Een halve venv is erger dan geen venv.** Breekt een run af, dan bestaat `venv/bin/python` wel en `venv/bin/pip` niet; de guard controleert nu beide en gooit de map anders weg.
- **oneHome (Antagonist):** het formulier wist Naam en Doel-IP zodra je het recordtype wisselt — kies eerst het type, vul daarna de velden. En de recordlijst toont een nieuw record pas na een herlaad, ook al meldt het paneel "succesvol opgeslagen".
