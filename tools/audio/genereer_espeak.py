#!/usr/bin/env python3
"""Tigrinya-audio genereren met eSpeak NG (PLAN-4 fase 2).

Vervangt het vervallen `genereer_mms.py`. Draait **op de VPS**, want daar staat
de TigrinyaNLP-datamap (`/etc/solidari/espeak.conf` wijst naar binary en data).

    tekst → espeak-ng --path=<data> -v ti -s 130 --stdin -w tmp.wav
          → ffmpeg -ar 16000 -ac 1 -b:a 48k  audio/TI/<hash>.mp3

Idempotent: een hash die al een mp3 heeft wordt overgeslagen. eSpeak is
deterministisch, dus hergenereren levert hetzelfde bestand op — er is geen seed
nodig (D-23 speelt hier niet).

Nooit `shell=True`: Tigrinya-tekst met aanhalingstekens mag geen commando worden.
De tekst gaat via stdin, niet als argument.

Gebruik (op de VPS):
    python3 tools/audio/genereer_espeak.py --teksten teksten-ti.json --uit audio/TI
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

TEMPO = os.getenv('SOLIDARI_ESPEAK_TEMPO', '130')   # PLAN-0 F2
STEM = 'ti'


def lees_espeak_conf(pad='/etc/solidari/espeak.conf'):
    """binary en datamap uit espeak.conf; met de gebruikelijke terugval."""
    conf = {'ESPEAK_BIN': '/usr/bin/espeak-ng', 'ESPEAK_DATA': '/opt/espeak-ti'}
    try:
        with open(pad, encoding='utf-8') as f:
            for regel in f:
                regel = regel.strip()
                if '=' in regel and not regel.startswith('#'):
                    k, _, v = regel.partition('=')
                    conf[k.strip()] = v.strip()
    except FileNotFoundError:
        pass
    return conf['ESPEAK_BIN'], conf['ESPEAK_DATA']


def duur(pad):
    uit = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
         '-of', 'csv=p=0', str(pad)],
        capture_output=True, text=True, check=True)
    return round(float(uit.stdout.strip()), 2)


def genereer(tekst, doel_mp3, espeak_bin, espeak_data):
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / 'clip.wav'
        subprocess.run(
            [espeak_bin, '--path=' + espeak_data, '-v', STEM, '-s', TEMPO,
             '--stdin', '-w', str(wav)],
            input=tekst.encode('utf-8'), check=True,
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if not wav.exists() or wav.stat().st_size < 1000:
            raise RuntimeError('eSpeak leverde geen bruikbare wav')
        subprocess.run(
            ['ffmpeg', '-y', '-loglevel', 'error', '-i', str(wav),
             '-ar', '16000', '-ac', '1', '-b:a', '48k', str(doel_mp3)],
            check=True)
        return duur(wav)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--teksten', required=True, help='teksten-ti.json')
    p.add_argument('--uit', required=True, help='doelmap voor de mp3s')
    p.add_argument('--manifest', help='pad voor manifest-ti.json')
    p.add_argument('--opnieuw', action='store_true', help='ook bestaande hashes hergenereren')
    a = p.parse_args()

    espeak_bin, espeak_data = lees_espeak_conf()
    uitmap = Path(a.uit); uitmap.mkdir(parents=True, exist_ok=True)
    items = json.loads(Path(a.teksten).read_text(encoding='utf-8'))

    manifest = {'bron': 'espeak', 'items': {}}
    nieuw = overgeslagen = mislukt = 0
    for item in items:
        h, tekst = item['hash'], item['tekst']
        mp3 = uitmap / (h + '.mp3')
        if mp3.exists() and not a.opnieuw:
            overgeslagen += 1
            manifest['items'][h] = {'d': item.get('duur', 0)}
            continue
        try:
            d = genereer(tekst, mp3, espeak_bin, espeak_data)
            manifest['items'][h] = {'d': d}
            nieuw += 1
        except Exception as fout:                    # noqa: BLE001
            print(f'  MISLUKT {h} ({item.get("bron","?")}): {fout}', file=sys.stderr)
            mislukt += 1

    manifestpad = Path(a.manifest) if a.manifest else uitmap.parent / 'manifest-ti.json'
    manifestpad.write_text(json.dumps(manifest, ensure_ascii=False), encoding='utf-8')

    print(f'eSpeak-TI klaar: {nieuw} nieuw, {overgeslagen} overgeslagen, {mislukt} mislukt')
    print(f'manifest: {manifestpad} ({len(manifest["items"])} items)')
    return 1 if mislukt else 0


if __name__ == '__main__':
    sys.exit(main())
