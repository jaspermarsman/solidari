#!/usr/bin/env bash
# Serveert de werkmap (de site) op poort 8099 voor Playwright.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${1:-8099}"
exec python3 -m http.server "$PORT" --directory "$ROOT"
