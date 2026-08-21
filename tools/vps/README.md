# tools/vps — Solidari-backend op een Hetzner VPS

Alles wat nodig is om `api.solidari.nl` vanaf nul op te bouwen, te beheren en terug te draaien.
Context en volgorde: `_werkdocumenten/bouwplannen/UITVOERING-autonoom.md` en `PLAN-1-vps-migratie.md`.

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
ssh solidari-vps 'cat /etc/os-release; uname -m'       # 3.1  trixie / aarch64
sudo rsync -a --exclude venv --exclude __pycache__ --exclude '*.pyc' --exclude '.env' \
      --exclude 'sleep-fix' --exclude '*.save*' --exclude 'ai.oud' \
      /opt/solidari-backend/ solidari-vps:/opt/solidari-backend/    # 3.2  code (vanaf jasper-pc) — mét de patches uit PLAN-1 fase 0.8
rsync -a tools/ solidari-vps:/opt/solidari-backend/tools/           #      scripts + tests mee
ssh solidari-vps 'bash /opt/solidari-backend/tools/vps/installeer.sh'        # 3.3
ssh solidari-vps 'bash /opt/solidari-backend/tools/vps/installeer.sh'        # 3.4  idempotentie
# 3.5 sleutel — zie PLAN-1 fase 3.5 (heredoc via ssh, nooit als argument)
ssh solidari-vps 'cd /opt/solidari-backend && ./venv/bin/python tools/test/redactie_test.py'   # 3.6 HARDE POORT
curl -s -H 'Host: api.solidari.nl' http://<IPv4>/api/health                                    # 3.6
# 4.0 DNS via Chrome (Antagonist) → 4.1 dig pollen → 4.2:
ssh solidari-vps 'certbot --nginx -d api.solidari.nl --staging --dry-run && certbot --nginx -d api.solidari.nl --non-interactive --agree-tos -m <e-mail> --redirect'
```

## Beheer

```bash
ssh solidari-vps systemctl status solidari            # draait hij
ssh solidari-vps journalctl -u solidari -n 50         # laatste logregels
ssh solidari-vps tail -n 20 /var/log/solidari/health.log
ssh solidari-vps 'systemctl restart solidari'
ssh solidari-vps 'apt-get update && apt-get -y dist-upgrade'   # handmatig; security-updates gaan automatisch, reboot 05:00
hcloud server enable-backup solidari-api              # dagelijkse backups (≈ €0,90/mnd)
```

## Herstel en terugvallen

- **VPS onbereikbaar:** `hcloud server reboot solidari-api`; daarna health. Blijft hij stuk: herbouw uit backup (`hcloud server rebuild`), of vanaf nul met de stappen hierboven (≈ 15 min) — de code staat op jasper-pc (`solidari-backend/` in de werkmap, gitignored), de sleutel in het geheimenbestand of in Anthropic Console.
- **Terug naar de thuis-pc (alleen vóór PLAN-1 fase 7):** DNS `api` A/AAAA terug naar het oude IP (staat in `LOG-vps.md` fase 4.0), FRITZ!Box-vrijgave 443 weer aan, `sudo systemctl start solidari` thuis.
- **Server weg:** `hcloud server delete solidari-api` (firewall en ssh-key mogen blijven). Kost daarna niets meer.

## Bekende eigenaardigheden (uit de droogtest van 21-08-2026)

- `requirements.txt` mist `reportlab` (gebruikt door `routes/cursusblad.py`); `installeer.sh` gebruikt `requirements.lock.txt` als die bestaat — maak die in PLAN-1 fase 0 met `pip freeze` van de draaiende venv. Tot die tijd staat reportlab expliciet in `requirements.txt`.
- Tesseract-talen volgen `services/ocr.py` (`nld eng ara tur ukr fas`), niet de aanname "alleen nld+eng" uit PLAN-1 v1.0.
- OCR van een A4-scan kost ≈ 8–10 s op x86; compressie naar 1568 px scheelt vooral upload, niet OCR-tijd. Op arm64 meten (fase 3.6).
- De backend-map in de repo (`solidari-backend/`) is een kopie; de draaiende versie staat in `/opt/solidari-backend` op jasper-pc. PLAN-1 fase 0 stelt vast of ze gelijk zijn (`diff -r`) vóór de patches worden overgezet.
