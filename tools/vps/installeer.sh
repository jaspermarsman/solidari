#!/usr/bin/env bash
# Solidari — VPS inrichten: van kale Debian 13 naar werkende backend (PLAN-1 fase 1)
#
# Draait als root OP DE VPS. Idempotent: twee keer draaien geeft hetzelfde resultaat.
# Verwacht de backend-code in /opt/solidari-backend (rsync vanaf jasper-pc, fase 3.2),
# of — bij --alleen-systeem — alleen het systeem (pakketten, gebruiker, nginx, firewall).
#
# Gebruik:
#   installeer.sh                 # alles
#   installeer.sh --alleen-systeem
#   installeer.sh --dry-run       # toont systemd/ufw/certbot-stappen i.p.v. ze uit te voeren (droogtest in container)
#
# Bronnen van waarheid: tools/vps/INVENTARIS.md (sleutelnaam, Python-versie, Tesseract-talen).
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

DRY=0; ALLEEN_SYSTEEM=0
for a in "$@"; do case "$a" in --dry-run) DRY=1;; --alleen-systeem) ALLEEN_SYSTEEM=1;; esac; done

APP=/opt/solidari-backend
ENVDIR=/etc/solidari
LOGDIR=/var/log/solidari
GEBRUIKER=solidari
HIER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"   # tools/vps binnen de gekopieerde backend, of losse map
ESPEAK_TI_URL="https://github.com/TigrinyaNLP/espeak-ng/releases/download/espeak-ng-data-plus-ti_1.0/espeak-ng-data.zip"
ESPEAK_TI_SHA="$(cut -d' ' -f1 "$HIER/espeak-ti/espeak-ng-data.zip.sha256" 2>/dev/null || echo "")"

log() { printf '[installeer] %s\n' "$*"; }
sys() { if (( DRY )); then printf '[dry-run]'; printf ' %q' "$@"; echo; else "$@"; fi; }

[[ $EUID -eq 0 ]] || { log "draai als root"; exit 1; }
grep -q 'VERSION_CODENAME=trixie' /etc/os-release || log "WAARSCHUWING: geen Debian 13 (trixie) — ga door, maar log dit als AFWIJKING"

# ── 1.1 Pakketten ─────────────────────────────────────────────────────────────
log "pakketten"
apt-get update -qq
apt-get install -y -qq --no-install-recommends \
  python3 python3-venv python3-pip python3-dev build-essential \
  tesseract-ocr tesseract-ocr-nld tesseract-ocr-eng tesseract-ocr-ara tesseract-ocr-tur tesseract-ocr-ukr tesseract-ocr-fas \
  poppler-utils \
  espeak-ng espeak-ng-data ffmpeg unzip \
  nginx certbot python3-certbot-nginx \
  ufw fail2ban unattended-upgrades \
  git curl ca-certificates rsync jq logrotate >/dev/null
# Tesseract-talen: precies wat services/ocr.py (TAAL_NAAR_TESSERACT) kan aanvragen. Niet meer.

# ── 1.1b eSpeak NG + Tigrinya (TigrinyaNLP-fork, naast de Debian-data) ───────
log "espeak-ti"
install -d /opt/espeak-ti
if [[ ! -f /opt/espeak-ti/espeak-ng-data/ti_dict ]]; then
  TMPZ="$(mktemp)"
  curl -fsSL -o "$TMPZ" "$ESPEAK_TI_URL"
  if [[ -n "$ESPEAK_TI_SHA" ]]; then echo "$ESPEAK_TI_SHA  $TMPZ" | sha256sum -c - >/dev/null; else log "WAARSCHUWING: geen checksum voor espeak-ti zip"; fi
  unzip -qo "$TMPZ" -d /opt/espeak-ti && rm -f "$TMPZ"
fi
ESPEAK_BIN=/usr/bin/espeak-ng; ESPEAK_DATA=/opt/espeak-ti
if "$ESPEAK_BIN" --path="$ESPEAK_DATA" -v ti -w /tmp/ti-test.wav "ሰላም ከመይ ኣለኻ" 2>/dev/null \
   && awk -v d="$(ffprobe -v error -show_entries format=duration -of csv=p=0 /tmp/ti-test.wav 2>/dev/null || echo 0)" 'BEGIN{exit !(d>0.5)}'; then
  log "espeak-ti OK (route a, Debian-binary + fork-data)"
else
  log "AFWIJKING: fork-data werkt niet met de Debian-binary — route b: fork bouwen in /opt/espeak-ti/src"
  apt-get install -y -qq --no-install-recommends autoconf automake libtool pkg-config libsonic-dev ronn kramdown >/dev/null || true
  if [[ ! -x /opt/espeak-ti/bin/espeak-ng ]]; then
    rm -rf /opt/espeak-ti/src && git clone -q --depth 1 https://github.com/TigrinyaNLP/espeak-ng /opt/espeak-ti/src
    (cd /opt/espeak-ti/src && ./autogen.sh >/dev/null && ./configure --prefix=/opt/espeak-ti --with-extdict-ti >/dev/null && make -j2 >/dev/null && make install >/dev/null)
  fi
  ESPEAK_BIN=/opt/espeak-ti/bin/espeak-ng; ESPEAK_DATA=/opt/espeak-ti/share
  "$ESPEAK_BIN" --path="$ESPEAK_DATA" -v ti -w /tmp/ti-test.wav "ሰላም ከመይ ኣለኻ"
fi
rm -f /tmp/ti-test.wav
install -d "$ENVDIR"
printf 'ESPEAK_BIN=%s\nESPEAK_DATA=%s\n' "$ESPEAK_BIN" "$ESPEAK_DATA" > "$ENVDIR/espeak.conf"

# ── 1.2 Gebruiker en mappen ──────────────────────────────────────────────────
log "gebruiker en mappen"
id -u "$GEBRUIKER" >/dev/null 2>&1 || useradd --system --home "$APP" --shell /usr/sbin/nologin "$GEBRUIKER"
install -d -o "$GEBRUIKER" -g "$GEBRUIKER" -m 750 "$APP" "$LOGDIR"
install -d -m 755 "$ENVDIR"
if [[ ! -f "$ENVDIR/.env" ]]; then
  (umask 077; printf '# Solidari backend — gevuld door PLAN-1 fase 3.5\nANTHROPIC_API_KEY=\n' > "$ENVDIR/.env")
fi
chown "$GEBRUIKER:$GEBRUIKER" "$ENVDIR/.env"; chmod 600 "$ENVDIR/.env"
chmod 644 "$ENVDIR/espeak.conf"

if (( ALLEEN_SYSTEEM == 0 )); then
  # ── 1.3 Venv en dependencies ───────────────────────────────────────────────
  [[ -f "$APP/app.py" ]] || { log "geen app.py in $APP — eerst rsync (fase 3.2)"; exit 4; }
  log "venv"
  [[ -x "$APP/venv/bin/python" ]] || sudo -u "$GEBRUIKER" python3 -m venv "$APP/venv"
  REQ="$APP/requirements.lock.txt"; [[ -f "$REQ" ]] || REQ="$APP/requirements.txt"
  sudo -u "$GEBRUIKER" "$APP/venv/bin/pip" install -q --upgrade pip wheel >/dev/null
  if ! sudo -u "$GEBRUIKER" "$APP/venv/bin/pip" install -q --only-binary=:all: -r "$REQ" 2>/tmp/pip-binary.log; then
    log "AFWIJKING: niet alle wheels beschikbaar voor $(uname -m) — bouwen vanaf bron (zie /tmp/pip-binary.log)"
    sudo -u "$GEBRUIKER" "$APP/venv/bin/pip" install -q -r "$REQ"
  fi
  chown -R "$GEBRUIKER:$GEBRUIKER" "$APP"
  find "$APP" -name '*.pyc' -delete; find "$APP" -name __pycache__ -type d -prune -exec rm -rf {} + 2>/dev/null || true
fi

# ── 1.4 systemd + logrotate ──────────────────────────────────────────────────
log "systemd"
install -m 644 "$HIER/systemd/solidari.service" /etc/systemd/system/solidari.service
install -m 644 "$HIER/systemd/solidari-health.service" /etc/systemd/system/solidari-health.service
install -m 644 "$HIER/systemd/solidari-health.timer" /etc/systemd/system/solidari-health.timer
install -m 755 "$HIER/health-check.sh" /usr/local/sbin/solidari-health-check
install -m 644 "$HIER/logrotate.conf" /etc/logrotate.d/solidari
sys systemctl daemon-reload
if (( ALLEEN_SYSTEEM == 0 )); then sys systemctl enable --now solidari; sys systemctl restart solidari; fi
sys systemctl enable --now solidari-health.timer

# ── 1.5 nginx ────────────────────────────────────────────────────────────────
log "nginx"
install -m 644 "$HIER/nginx/solidari-limits.conf" /etc/nginx/conf.d/solidari-limits.conf
install -m 644 "$HIER/nginx/api.solidari.nl.conf" /etc/nginx/sites-available/api.solidari.nl
ln -sf /etc/nginx/sites-available/api.solidari.nl /etc/nginx/sites-enabled/api.solidari.nl
rm -f /etc/nginx/sites-enabled/default
grep -q 'server_tokens off' /etc/nginx/nginx.conf || sed -i 's/^\(\s*\)# server_tokens off;/\1server_tokens off;/' /etc/nginx/nginx.conf
if ! nginx -t 2>/tmp/nginx-t.log; then
  if (( DRY )) && grep -q 'Address family not supported' /tmp/nginx-t.log; then log "dry-run: geen IPv6 in container — nginx -t verder OK"; else cat /tmp/nginx-t.log; exit 5; fi
fi
sys systemctl enable --now nginx; sys systemctl reload nginx

# ── 1.6 Firewall, SSH, fail2ban, updates ─────────────────────────────────────
log "hardening"
sys ufw default deny incoming; sys ufw default allow outgoing
sys ufw allow 22/tcp; sys ufw allow 80/tcp; sys ufw allow 443/tcp
sys ufw --force enable
install -d /etc/ssh/sshd_config.d
SSHD=/etc/ssh/sshd_config.d/90-solidari.conf
printf 'PasswordAuthentication no\nPermitRootLogin prohibit-password\nKbdInteractiveAuthentication no\nX11Forwarding no\n' > "$SSHD"
sys systemctl reload ssh || sys systemctl reload sshd || true
install -m 644 "$HIER/fail2ban-solidari.local" /etc/fail2ban/jail.d/solidari.local
sys systemctl enable --now fail2ban; sys systemctl restart fail2ban || true
cat > /etc/apt/apt.conf.d/51solidari-unattended <<'EOF'
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "05:00";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
EOF
printf 'APT::Periodic::Update-Package-Lists "1";\nAPT::Periodic::Unattended-Upgrade "1";\n' > /etc/apt/apt.conf.d/20auto-upgrades
timedatectl set-timezone Europe/Amsterdam 2>/dev/null || true

# ── 1.7 Controle ─────────────────────────────────────────────────────────────
log "controle"
if ! nginx -t 2>/dev/null; then (( DRY )) || exit 5; fi
if (( ALLEEN_SYSTEEM == 0 && DRY == 0 )); then
  sleep 2
  curl -fsS http://127.0.0.1:5000/api/health && echo
fi
log "klaar"
