#!/usr/bin/env python3
"""Fase 2 — MMS-generatie. tekst → wav (facebook/mms-tts-*, uroman waar nodig) → mp3.

Idempotent: bestaat audio/<TAAL>/<hash>.mp3 al, dan overslaan.
Vaste seed (D-23). Audioformaat mp3 mono 16 kHz 48 kbps (D-17).
Draai onder systemd-inhibit voor langlopende batches.

Gebruik:  python tools/audio/genereer_mms.py --talen nl,en,ar,tr,ti,uk,fa,ro,pl
"""
import argparse
import json
import subprocess
import sys
import time
import unicodedata
import re
from pathlib import Path

import numpy as np
import torch
from transformers import VitsModel, AutoTokenizer, set_seed
from scipy.io.wavfile import write as wav_write

ROOT = Path(__file__).resolve().parents[2]
AUDIO = ROOT / "audio"
TOOLS = Path(__file__).resolve().parent

MODEL_CODE = {
    "nl": "nld", "en": "eng", "ar": "ara", "tr": "tur", "ti": "tir",
    "uk": "ukr", "fa": "fas", "ro": "ron", "pl": "pol",
}

_uroman = None


def get_uroman():
    global _uroman
    if _uroman is None:
        import uroman as ur
        _uroman = ur.Uroman()
    return _uroman


def romanize(text):
    return get_uroman().romanize_string(text)


def ffprobe_duur(mp3):
    try:
        out = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "csv=p=0", str(mp3)],
            capture_output=True, text=True, check=True)
        return round(float(out.stdout.strip()), 2)
    except Exception:
        return 0.0


def naar_mp3(wav_path, mp3_path):
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path),
         "-ar", "16000", "-ac", "1", "-b:a", "48k", str(mp3_path)],
        check=True)


def laad_model(code, pogingen=3):
    model_id = "facebook/mms-tts-" + MODEL_CODE[code]
    laatste = None
    for p in range(pogingen):
        try:
            tok = AutoTokenizer.from_pretrained(model_id)
            model = VitsModel.from_pretrained(model_id)
            model.eval()
            return tok, model
        except Exception as e:            # netwerk/HF-hik: retry met backoff
            laatste = e
            time.sleep(3 * (p + 1))
    raise laatste


def gen_taal(code, cijferlog, uroman_log):
    tok, model = laad_model(code)
    is_uro = bool(getattr(tok, "is_uroman", False)) or code == "ti"
    sr = model.config.sampling_rate
    lijst = json.load(open(TOOLS / f"teksten-{code}.json", encoding="utf-8"))
    outdir = AUDIO / code.upper()
    outdir.mkdir(parents=True, exist_ok=True)
    items = {}
    nieuw = 0
    for it in lijst:
        h, tekst = it["hash"], it["tekst"]
        if it.get("cijfer"):
            cijferlog.append(f"{code.upper()} {h} {tekst[:60]}")
        mp3 = outdir / f"{h}.mp3"
        if mp3.exists():
            items[h] = {"d": ffprobe_duur(mp3)}
            continue
        invoer = tekst
        if is_uro:
            invoer = romanize(tekst)
            if code == "ti":
                uroman_log.append(f"{h}  {tekst[:30]} -> {invoer[:40]}")
        set_seed(42)
        inputs = tok(invoer, return_tensors="pt")
        with torch.no_grad():
            wav = model(**inputs).waveform[0].cpu().numpy()
        wav = np.clip(wav, -1.0, 1.0)
        pcm = (wav * 32767.0).astype(np.int16)
        wavp = outdir / f"{h}.wav"
        wav_write(str(wavp), sr, pcm)
        naar_mp3(wavp, mp3)
        wavp.unlink(missing_ok=True)
        items[h] = {"d": round(len(wav) / sr, 2)}
        nieuw += 1
    manifest = {"bron": "mms", "items": items}
    json.dump(manifest, open(AUDIO / f"manifest-{code}.json", "w", encoding="utf-8"),
              ensure_ascii=False)
    return len(items), nieuw


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--talen", default=",".join(MODEL_CODE.keys()))
    args = ap.parse_args()
    talen = [t.strip().lower() for t in args.talen.split(",") if t.strip()]

    cijferlog, uroman_log, mislukt = [], [], []
    for code in talen:
        if code not in MODEL_CODE:
            print(f"onbekende taal: {code}", file=sys.stderr)
            continue
        t0 = time.time()
        try:
            totaal, nieuw = gen_taal(code, cijferlog, uroman_log)
            print(f"[{code}] {totaal} clips ({nieuw} nieuw) in {round(time.time()-t0)}s")
        except Exception as e:            # één taal faalt: log en ga door
            mislukt.append(f"{code}: {e}")
            print(f"[{code}] MISLUKT: {e}", file=sys.stderr)

    (TOOLS / "cijfer-clips.log").write_text("\n".join(cijferlog), encoding="utf-8")
    (TOOLS / "uroman-ti.log").write_text("\n".join(uroman_log), encoding="utf-8")
    if mislukt:
        (TOOLS / "mislukt.log").write_text("\n".join(mislukt), encoding="utf-8")
        print("MISLUKTE TALEN:\n  " + "\n  ".join(mislukt), file=sys.stderr)
    print(f"cijfer-clips: {len(cijferlog)} | ti-romanisaties: {len(uroman_log)}")


if __name__ == "__main__":
    main()
