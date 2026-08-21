#!/usr/bin/env bash
# Solidari — health check (PLAN-1 fase 5.1). Elke 5 min via solidari-health.timer.
# Drie fouten achter elkaar → herstart; max 3 herstarts per uur, daarna alleen loggen.
# Wekelijks (zondag 04:xx): schijfruimte en espeak-ti-test.
set -u
LOG=/var/log/solidari/health.log
STATE=/var/lib/solidari-health; mkdir -p "$STATE"
nu() { date '+%Y-%m-%d %H:%M:%S'; }
if curl -fsS -m 10 http://127.0.0.1:5000/api/health >/dev/null 2>&1; then
  echo 0 > "$STATE/fouten"
else
  n=$(( $(cat "$STATE/fouten" 2>/dev/null || echo 0) + 1 )); echo "$n" > "$STATE/fouten"
  echo "$(nu) FOUT health ($n op rij)" >> "$LOG"
  if (( n >= 3 )); then
    uur=$(date +%Y%m%d%H); h=$(cat "$STATE/herstarts-$uur" 2>/dev/null || echo 0)
    if (( h < 3 )); then
      echo $((h+1)) > "$STATE/herstarts-$uur"; systemctl restart solidari
      echo "$(nu) HERSTART solidari ($((h+1))/3 dit uur)" >> "$LOG"
    else
      echo "$(nu) WAARSCHUWING: herstartlimiet bereikt, geen herstart meer dit uur" >> "$LOG"
    fi
    echo 0 > "$STATE/fouten"
  fi
fi
find "$STATE" -name 'herstarts-*' -mmin +120 -delete 2>/dev/null
# Wekelijks
if [[ "$(date +%u%H)" == "704" ]] && [[ ! -f "$STATE/week-$(date +%Y%W)" ]]; then
  touch "$STATE/week-$(date +%Y%W)"
  gebruik=$(df --output=pcent / | tail -1 | tr -dc '0-9')
  (( gebruik > 80 )) && echo "$(nu) WAARSCHUWING: schijf ${gebruik}% vol" >> "$LOG"
  # shellcheck disable=SC1091
  [[ -f /etc/solidari/espeak.conf ]] && source /etc/solidari/espeak.conf
  if ! "${ESPEAK_BIN:-espeak-ng}" --path="${ESPEAK_DATA:-/opt/espeak-ti}" -v ti -w /tmp/ti-hc.wav "ሰላም" 2>/dev/null; then
    echo "$(nu) WAARSCHUWING: espeak-ti faalt na update" >> "$LOG"
  fi; rm -f /tmp/ti-hc.wav
fi
exit 0
