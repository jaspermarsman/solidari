#!/usr/bin/env python3
"""
Solidari — redactietest (PLAN-1 fase 2 / 3.6). De belangrijkste test van de migratie.

Haalt tools/test/nepbrief.jpg en .pdf door de echte keten OCR → preprocessor → PII-redactie
(zonder AI-aanroep) en controleert dat geen enkel verzonnen persoonsgegeven overblijft,
terwijl de inhoud (Wmo, bezwaartermijn, afzender) wél overblijft.

Gebruik (vanuit de backend-map, met de venv):
  cd /opt/solidari-backend && ./venv/bin/python tools/test/redactie_test.py
Exit 0 = GROEN, 1 = FOUT (met de gevonden fragmenten — uit de nepbrief, dus niet gevoelig).
"""
import sys, re, time
from pathlib import Path

HIER = Path(__file__).resolve().parent
BACKEND = next((p for p in [HIER.parent.parent, Path('/opt/solidari-backend')] if (p / 'app.py').exists()), None)
if BACKEND is None:
    print("FOUT: app.py niet gevonden (draai vanuit de backend-map)"); sys.exit(2)
sys.path.insert(0, str(BACKEND))

from services.ocr import lees_tekst_uit_bestand          # noqa: E402
from services.preprocessor import verwerk_ocr_tekst      # noqa: E402
from services.redacteer import redacteer_pii             # noqa: E402

PII = {
    'BSN': r'123456782',
    'IBAN (ook OCR-variant met O)': r'NL0?O?2\s?ABNA',
    'straat': r'Voorbeeldstraat',
    'naam': r'Testpersoon',
}
INHOUD = {
    'Wmo': r'Wmo', 'bezwaar': r'bezwaar', 'afzender': r'de Vries', 'termijn': r'zes weken',
}

fout = 0
for bestand, ctype, taal in [(HIER / 'nepbrief.jpg', 'image/jpeg', 'nl'), (HIER / 'nepbrief.pdf', 'application/pdf', 'ar')]:
    t0 = time.time()
    ruw = lees_tekst_uit_bestand(bestand.read_bytes(), ctype, taal)
    t_ocr = time.time() - t0
    bewerkt = verwerk_ocr_tekst(ruw)
    schoon = redacteer_pii(bewerkt)
    print(f'\n== {bestand.name} (taal={taal}): OCR {len(ruw)} tekens in {t_ocr:.1f}s → geredigeerd {len(schoon)} tekens')
    for naam, pat in PII.items():
        tref = re.findall(pat, schoon, flags=re.IGNORECASE)
        if tref:
            fout += 1; print(f'  FOUT  {naam}: {len(tref)}x aanwezig na redactie: {tref[:3]}')
        else:
            print(f'  ok    {naam} weg')
    for naam, pat in INHOUD.items():
        if re.search(pat, schoon, flags=re.IGNORECASE):
            print(f'  ok    inhoud "{naam}" behouden')
        else:
            fout += 1; print(f'  FOUT  inhoud "{naam}" verdwenen (te agressief of OCR mislukt)')
    for label in ('[BSN]', '[REKENINGNUMMER]', '[NAAM]', '[ONTVANGERADRES VERWIJDERD]'):
        print(f'  {"ok   " if label in schoon else "let op"} {label} {"aanwezig" if label in schoon else "ONTBREEKT"}')

print('\nRESULTAAT:', 'GROEN' if fout == 0 else f'FOUT ({fout})')
sys.exit(0 if fout == 0 else 1)
