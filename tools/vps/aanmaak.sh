#!/usr/bin/env bash
# Solidari — VPS aanmaken bij Hetzner via de API (PLAN-1 fase 1.0 / 3.0)
#
# Draait op jasper-pc. Idempotent: bestaat iets al, dan wordt het overgeslagen.
# Leest HCLOUD_TOKEN uit ~/.config/solidari/geheimen.env (nooit als argument).
#
# Gebruik:
#   tools/vps/aanmaak.sh            # aanmaken (of alleen IP's uitlezen als de server al bestaat)
#   tools/vps/aanmaak.sh --dry-run  # alleen tonen wat er zou gebeuren (geen token nodig)
#
# Invoer (uit bouwplannen/BESLUITEN-inputronde.md, via omgevingsvariabelen of defaults):
#   SOLIDARI_SERVER_TYPE  (cax11 | cx23)   default cax11
#   SOLIDARI_LOCATIE      (nbg1 | fsn1)    default nbg1
#   SOLIDARI_SERVERNAAM                    default solidari-api
#   SOLIDARI_SSH_PUBKEY   pad naar .pub    default: eerste key uit ssh-add -L, anders ~/.ssh/id_ed25519.pub
#   THUIS_IPV4 / THUIS_IPV6 (optioneel)    beperken SSH tot deze adressen (PLAN-0 A4)
#
# Uitvoer: tools/vps/server.json (geen geheimen) en host 'solidari-vps' in ~/.ssh/config.
set -euo pipefail

GEHEIMEN="${SOLIDARI_GEHEIMEN:-$HOME/.config/solidari/geheimen.env}"
TYPE="${SOLIDARI_SERVER_TYPE:-cax11}"
LOCATIE="${SOLIDARI_LOCATIE:-nbg1}"
NAAM="${SOLIDARI_SERVERNAAM:-solidari-api}"
IMAGE="${SOLIDARI_IMAGE:-debian-13}"
FW="solidari-fw"
KEYNAAM="jasper-pc"
DRY=0
[[ "${1:-}" == "--dry-run" ]] && DRY=1

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
UIT="$REPO_ROOT/tools/vps/server.json"

log() { printf '[aanmaak] %s\n' "$*" >&2; }
run() { if (( DRY )); then printf '[dry-run] %q ' "$@"; echo; else "$@"; fi; }

# ── 0. hcloud aanwezig? ─────────────────────────────────────────────────────
if ! command -v hcloud >/dev/null 2>&1; then
  log "hcloud ontbreekt — installeren in ~/bin"
  ARCH="$(uname -m)"; case "$ARCH" in x86_64) A=amd64;; aarch64) A=arm64;; *) log "onbekende arch $ARCH"; exit 1;; esac
  VERSIE="$(curl -fsSL https://api.github.com/repos/hetznercloud/cli/releases/latest | sed -n 's/.*"tag_name": *"v\([^"]*\)".*/\1/p')"
  TMP="$(mktemp -d)"
  curl -fsSL -o "$TMP/hcloud.tgz" "https://github.com/hetznercloud/cli/releases/download/v${VERSIE}/hcloud-linux-${A}.tar.gz"
  curl -fsSL -o "$TMP/checksums.txt" "https://github.com/hetznercloud/cli/releases/download/v${VERSIE}/checksums.txt"
  (cd "$TMP" && grep "hcloud-linux-${A}.tar.gz" checksums.txt | sed 's/  .*/  hcloud.tgz/' | sha256sum -c -)
  mkdir -p "$HOME/bin" && tar -xzf "$TMP/hcloud.tgz" -C "$TMP" hcloud && install -m 755 "$TMP/hcloud" "$HOME/bin/hcloud"
  rm -rf "$TMP"; export PATH="$HOME/bin:$PATH"
fi

# ── 1. Token laden (nooit tonen) ────────────────────────────────────────────
if (( ! DRY )); then
  [[ -f "$GEHEIMEN" ]] || { log "geheimenbestand ontbreekt: $GEHEIMEN"; exit 2; }
  [[ "$(stat -c '%a' "$GEHEIMEN")" == "600" ]] || { log "geheimenbestand moet chmod 600 zijn"; exit 2; }
  HCLOUD_TOKEN="$(grep -E '^HCLOUD_TOKEN=' "$GEHEIMEN" | head -1 | cut -d= -f2- | tr -d '"'"'"' ')"
  [[ -n "$HCLOUD_TOKEN" ]] || { log "HCLOUD_TOKEN is leeg in $GEHEIMEN"; exit 2; }
  export HCLOUD_TOKEN
  THUIS_IPV4="${THUIS_IPV4:-$(grep -E '^THUIS_IPV4=' "$GEHEIMEN" | cut -d= -f2- || true)}"
  THUIS_IPV6="${THUIS_IPV6:-$(grep -E '^THUIS_IPV6=' "$GEHEIMEN" | cut -d= -f2- || true)}"
fi

# ── 2. SSH-key ──────────────────────────────────────────────────────────────
PUB="${SOLIDARI_SSH_PUBKEY:-}"
if [[ -z "$PUB" ]]; then
  if ssh-add -L >/dev/null 2>&1; then
    PUB="$(mktemp)"; ssh-add -L | head -1 > "$PUB"
  elif [[ -f "$HOME/.ssh/id_ed25519.pub" ]]; then PUB="$HOME/.ssh/id_ed25519.pub"
  elif [[ -f "$HOME/.ssh/id_rsa.pub" ]]; then PUB="$HOME/.ssh/id_rsa.pub"
  else log "geen SSH public key gevonden"; exit 3; fi
fi
log "SSH-key: $(cut -d' ' -f3- "$PUB" 2>/dev/null || echo '(zonder commentaar)')"
if (( DRY )) || ! hcloud ssh-key describe "$KEYNAAM" >/dev/null 2>&1; then
  run hcloud ssh-key create --name "$KEYNAAM" --public-key-from-file "$PUB"
else log "ssh-key $KEYNAAM bestaat al"; fi

# ── 3. Firewall ─────────────────────────────────────────────────────────────
if (( DRY )) || ! hcloud firewall describe "$FW" >/dev/null 2>&1; then
  run hcloud firewall create --name "$FW" --label project=solidari
  SSH_SRC=(--source-ips 0.0.0.0/0 --source-ips ::/0)
  if [[ -n "${THUIS_IPV4:-}" || -n "${THUIS_IPV6:-}" ]]; then
    SSH_SRC=()
    [[ -n "${THUIS_IPV4:-}" ]] && SSH_SRC+=(--source-ips "${THUIS_IPV4}/32")
    [[ -n "${THUIS_IPV6:-}" ]] && SSH_SRC+=(--source-ips "${THUIS_IPV6}/128")
    log "SSH beperkt tot thuis-IP(s)"
  fi
  run hcloud firewall add-rule "$FW" --direction in --protocol tcp --port 22  "${SSH_SRC[@]}" --description ssh
  run hcloud firewall add-rule "$FW" --direction in --protocol tcp --port 80  --source-ips 0.0.0.0/0 --source-ips ::/0 --description http
  run hcloud firewall add-rule "$FW" --direction in --protocol tcp --port 443 --source-ips 0.0.0.0/0 --source-ips ::/0 --description https
  run hcloud firewall add-rule "$FW" --direction in --protocol icmp        --source-ips 0.0.0.0/0 --source-ips ::/0 --description ping
else log "firewall $FW bestaat al"; fi

# ── 4. Image-naam controleren ───────────────────────────────────────────────
if (( ! DRY )); then
  if ! hcloud image list --type system -o noheader -o columns=name | grep -qx "$IMAGE"; then
    NIEUW="$(hcloud image list --type system -o noheader -o columns=name | grep -E '^debian-[0-9]+$' | sort -V | tail -1)"
    log "AFWIJKING: image $IMAGE bestaat niet; gebruik $NIEUW"
    IMAGE="$NIEUW"
  fi
fi

# ── 5. Server ───────────────────────────────────────────────────────────────
if (( DRY )) || ! hcloud server describe "$NAAM" >/dev/null 2>&1; then
  run hcloud server create --name "$NAAM" --type "$TYPE" --image "$IMAGE" --location "$LOCATIE" \
      --ssh-key "$KEYNAAM" --firewall "$FW" --label project=solidari
else log "server $NAAM bestaat al — alleen gegevens uitlezen"; fi

(( DRY )) && { log "dry-run klaar"; exit 0; }

# ── 6. Gegevens vastleggen ──────────────────────────────────────────────────
JSON="$(hcloud server describe "$NAAM" -o json)"
IPV4="$(printf '%s' "$JSON" | python3 -c 'import json,sys; print(json.load(sys.stdin)["public_net"]["ipv4"]["ip"])')"
IPV6NET="$(printf '%s' "$JSON" | python3 -c 'import json,sys; print(json.load(sys.stdin)["public_net"]["ipv6"]["ip"])')"
IPV6="${IPV6NET%%/*}"; IPV6="${IPV6%::}::1"
ID="$(printf '%s' "$JSON" | python3 -c 'import json,sys; print(json.load(sys.stdin)["id"])')"
python3 - "$UIT" "$NAAM" "$TYPE" "$LOCATIE" "$IMAGE" "$IPV4" "$IPV6" "$ID" <<'PY'
import json, sys, datetime
p, naam, typ, loc, img, v4, v6, sid = sys.argv[1:]
json.dump({"naam": naam, "type": typ, "locatie": loc, "image": img, "ipv4": v4, "ipv6": v6,
           "id": int(sid), "aangemaakt": datetime.date.today().isoformat()}, open(p, "w"), indent=2)
PY
log "server.json geschreven: IPv4 $IPV4, IPv6 $IPV6"

# ── 7. ~/.ssh/config ────────────────────────────────────────────────────────
mkdir -p "$HOME/.ssh"; touch "$HOME/.ssh/config"; chmod 600 "$HOME/.ssh/config"
if grep -q '^Host solidari-vps$' "$HOME/.ssh/config"; then
  sed -i "/^Host solidari-vps$/,/^$/ s/^\( *HostName \).*/\1$IPV4/" "$HOME/.ssh/config"
else
  printf '\nHost solidari-vps\n  HostName %s\n  User root\n  IdentitiesOnly yes\n  ServerAliveInterval 30\n\n' "$IPV4" >> "$HOME/.ssh/config"
fi
log "klaar. Test: ssh -o StrictHostKeyChecking=accept-new solidari-vps 'cat /etc/os-release; uname -m'"
