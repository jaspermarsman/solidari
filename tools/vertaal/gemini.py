"""Solidari — kleine Gemini-client voor de vertaalronde (PLAN-7 fase 2).

De sleutel komt uit GEMINI_API_KEY in de omgeving, anders uit ~/.config/solidari/geheimen.env
(B-10: de Solidari-sleutel `solidari-lokaal`, nooit de Solivia-sleutel). Hij gaat alleen in de
request-header (x-goog-api-key), nooit in een URL, en wordt nergens geprint of weggeschreven.
Foutmeldingen worden geschoond voordat ze getoond worden.
"""
import json
import os
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

API = "https://generativelanguage.googleapis.com/v1beta"
GEHEIMEN = Path.home() / ".config" / "solidari" / "geheimen.env"


class GeenSleutel(RuntimeError):
    pass


def _sleutel():
    k = os.environ.get("GEMINI_API_KEY", "").strip()
    if not k and GEHEIMEN.exists():
        for regel in GEHEIMEN.read_text().splitlines():
            m = re.match(r"\s*(?:export\s+)?GEMINI_API_KEY\s*=\s*(.*)$", regel)
            if m:
                k = m.group(1).strip().strip('"').strip("'")
    if not k:
        raise GeenSleutel("GEMINI_API_KEY niet gevonden (omgeving of ~/.config/solidari/geheimen.env)")
    return k


def _schoon(tekst):
    return re.sub(r"AIza[0-9A-Za-z_-]{20,}", "[sleutel]", str(tekst))


def _verzoek(methode, pad, body=None, timeout=180):
    req = urllib.request.Request(
        API + pad,
        method=methode,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"x-goog-api-key": _sleutel(), "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"HTTP {e.code}: {_schoon(e.read().decode(errors='replace'))[:500]}") from None
    except urllib.error.URLError as e:
        raise RuntimeError(f"netwerkfout: {_schoon(e.reason)}") from None


def modellen():
    uit, token = [], None
    while True:
        r = _verzoek("GET", "/models?pageSize=1000" + (f"&pageToken={token}" if token else ""))
        uit += r.get("models", [])
        token = r.get("nextPageToken")
        if not token:
            return uit


def genereer_json(model, prompt, temperature, pogingen=3):
    """Eén prompt, antwoord als JSON (response_mime_type). Geeft (data, gebruik)."""
    body = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": temperature, "responseMimeType": "application/json"},
    }
    laatste = None
    for poging in range(pogingen):
        try:
            r = _verzoek("POST", f"/models/{model}:generateContent", body)
            kand = (r.get("candidates") or [{}])[0]
            delen = (kand.get("content") or {}).get("parts") or []
            tekst = "".join(p.get("text", "") for p in delen if not p.get("thought"))
            if not tekst:
                raise RuntimeError(f"leeg antwoord (finishReason={kand.get('finishReason')})")
            return json.loads(tekst), r.get("usageMetadata", {})
        except (RuntimeError, json.JSONDecodeError) as e:
            laatste = e
            if "HTTP 4" in str(e) and "HTTP 429" not in str(e):
                raise
            time.sleep(5 * (poging + 1))
    raise RuntimeError(f"na {pogingen} pogingen: {_schoon(laatste)}")
