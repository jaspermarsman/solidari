#!/usr/bin/env python3
"""Fase 2 — Gemini-generatie (voorbereid, §4.6). Zelfde interface en manifest-output
als genereer_mms.py, maar bron="gemini", alleen de acht niet-Tigrinya-talen.

Zonder GEMINI_API_KEY draait dit in --stub-modus: het leest de tekstenlijsten,
bouwt de requests op en valideert de flow zonder echt te genereren. Zodra de
sleutel bestaat (WORKER-UPGRADE.md) levert dezelfde aanroep echte mp3's.

Gebruik:
  python tools/audio/genereer_gemini.py --talen nl,en,ar,tr,uk,fa,ro,pl [--stub]
"""
import argparse
import base64
import json
import os
import struct
import sys
import wave
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
AUDIO = ROOT / "audio"
TOOLS = Path(__file__).resolve().parent

# Gemini dekt 8 van de 9 talen; Tigrinya niet (§1). BCP-47 naar Gemini-taalhint.
GEMINI_TALEN = {
    "nl": "nl-NL", "en": "en-US", "ar": "ar-XA", "tr": "tr-TR",
    "uk": "uk-UA", "fa": "fa-IR", "ro": "ro-RO", "pl": "pl-PL",
}
MODEL = "gemini-2.5-flash-preview-tts"
ENDPOINT = ("https://generativelanguage.googleapis.com/v1beta/models/"
            + MODEL + ":generateContent")


def pcm_naar_wav(pcm_bytes, wav_path, rate=24000):
    """Gemini TTS levert raw PCM 24 kHz; in een WAV-header wikkelen (§1)."""
    with wave.open(str(wav_path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(pcm_bytes)


def bouw_request(tekst, taalhint):
    """De payload die naar Gemini gaat — identiek in stub en echt."""
    return {
        "contents": [{"parts": [{"text": tekst}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"languageCode": taalhint},
        },
    }


def genereer_echt(tekst, taalhint, sleutel):
    import urllib.request
    req = urllib.request.Request(
        ENDPOINT + "?key=" + sleutel,
        data=json.dumps(bouw_request(tekst, taalhint)).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST")
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.load(r)
    b64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
    return base64.b64decode(b64)


def naar_mp3(wav_path, mp3_path):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path),
                    "-ar", "16000", "-ac", "1", "-b:a", "48k", str(mp3_path)], check=True)


def gen_taal(code, stub, sleutel):
    taalhint = GEMINI_TALEN[code]
    lijst = json.load(open(TOOLS / f"teksten-{code}.json", encoding="utf-8"))
    outdir = AUDIO / code.upper()
    items = {}
    for it in lijst:
        h, tekst = it["hash"], it["tekst"]
        # valideer dat de request goed opbouwt (stub én echt)
        payload = bouw_request(tekst, taalhint)
        assert payload["contents"][0]["parts"][0]["text"] == tekst
        if stub:
            continue
        outdir.mkdir(parents=True, exist_ok=True)
        mp3 = outdir / f"{h}.mp3"
        if mp3.exists():
            continue
        pcm = genereer_echt(tekst, taalhint, sleutel)
        wavp = outdir / f"{h}.wav"
        pcm_naar_wav(pcm, wavp)
        naar_mp3(wavp, mp3)
        wavp.unlink(missing_ok=True)
        items[h] = {"d": 0.0}
    if not stub:
        json.dump({"bron": "gemini", "items": items},
                  open(AUDIO / f"manifest-{code}.json", "w", encoding="utf-8"),
                  ensure_ascii=False)
    return len(lijst)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--talen", default=",".join(GEMINI_TALEN.keys()))
    ap.add_argument("--stub", action="store_true")
    args = ap.parse_args()
    sleutel = os.environ.get("GEMINI_API_KEY")
    stub = args.stub or not sleutel
    if stub and not args.stub:
        print("Geen GEMINI_API_KEY — val terug op --stub (niets gegenereerd).", file=sys.stderr)
    talen = [t.strip().lower() for t in args.talen.split(",") if t.strip()]
    for code in talen:
        if code not in GEMINI_TALEN:
            print(f"Gemini dekt {code} niet (Tigrinya via MMS).", file=sys.stderr)
            continue
        n = gen_taal(code, stub, sleutel)
        print(f"[{code}] {'stub' if stub else 'echt'}: {n} teksten verwerkt.")


if __name__ == "__main__":
    main()
