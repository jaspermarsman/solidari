#!/usr/bin/env python3
"""
Solidari — nepbrief voor tests (PLAN-1 fase 0.6).

Rendert een A4-beeld dat lijkt op een gemeentebrief, met uitsluitend VERZONNEN gegevens:
  - BSN 123456782  (voldoet aan de elfproef, geen echt persoon)
  - IBAN NL02ABNA0123456789 (testnummer)
  - adres Voorbeeldstraat 12, 1234 AB Voorbeeldstad
  - een Wmo-zin (gezondheidsgegeven) en een bezwaartermijn
Output: tools/test/nepbrief.jpg (2480x3508, JPEG q85) en tools/test/nepbrief.pdf

Gebruik: python3 tools/test/maak_nepbrief.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

HIER = Path(__file__).resolve().parent
W, H = 2480, 3508  # A4 @ 300 dpi

# Verzonnen gegevens — bewust zo gekozen dat grep erop in logs eenduidig is
BSN = "123456782"
IBAN = "NL02ABNA0123456789"
NAAM = "T. Testpersoon"
ADRES = ["Voorbeeldstraat 12", "1234 AB  VOORBEELDSTAD"]
KENMERK = "ZK-2026-0001"

REGELS = [
    ("kop", "Gemeente Voorbeeldstad"),
    ("sub", "Afdeling Werk, Inkomen en Zorg"),
    ("", ""),
    ("", NAAM),
    ("", ADRES[0]),
    ("", ADRES[1]),
    ("", ""),
    ("", "Datum: 14 augustus 2026"),
    ("", f"Ons kenmerk: {KENMERK}"),
    ("", f"Uw BSN: {BSN}"),
    ("", "Onderwerp: Besluit op uw aanvraag Wmo-voorziening"),
    ("", ""),
    ("", "Geachte heer/mevrouw Testpersoon,"),
    ("", ""),
    ("", "Op 2 juli 2026 heeft u een aanvraag gedaan voor een vervoersvoorziening op grond van de"),
    ("", "Wet maatschappelijke ondersteuning (Wmo) vanwege uw beperkte mobiliteit na uw operatie."),
    ("", "Wij hebben uw aanvraag beoordeeld. In deze brief leest u ons besluit."),
    ("", ""),
    ("kop2", "Besluit"),
    ("", "Wij kennen u een vervoersvoorziening toe voor de periode van 1 september 2026 tot en met"),
    ("", "31 augustus 2027. U betaalt hiervoor een eigen bijdrage van EUR 20,60 per maand via het CAK."),
    ("", ""),
    ("kop2", "Wat moet u doen"),
    ("", "1. Stuur binnen 14 dagen een kopie van uw geldige identiteitsbewijs naar ons terug."),
    ("", f"2. Controleer of uw rekeningnummer {IBAN} nog juist is voor de terugbetaling"),
    ("", "   van de reiskosten die u al heeft gemaakt."),
    ("", ""),
    ("kop2", "Niet eens met dit besluit?"),
    ("", "Dan kunt u binnen zes weken na de datum van deze brief bezwaar maken. Stuur uw bezwaarschrift"),
    ("", "naar: Gemeente Voorbeeldstad, Postbus 100, 1234 ZZ Voorbeeldstad. Vermeld daarbij ons kenmerk."),
    ("", ""),
    ("", "Heeft u vragen? Bel ons op 014 - 123 45 67 (werkdagen 9.00 - 17.00 uur) of kijk op"),
    ("", "www.voorbeeldstad.nl/wmo."),
    ("", ""),
    ("", "Met vriendelijke groet,"),
    ("", ""),
    ("", "J. de Vries"),
    ("", "Medewerker Wmo, Gemeente Voorbeeldstad"),
]


def font(maat: int, vet: bool = False):
    kandidaten = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if vet else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if vet else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for k in kandidaten:
        if Path(k).exists():
            return ImageFont.truetype(k, maat)
    return ImageFont.load_default()


def maak() -> tuple[Path, Path]:
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)
    # logo-achtig blok rechtsboven
    d.rectangle([W - 520, 180, W - 200, 300], outline="#2D5A3D", width=6)
    d.text((W - 500, 205), "VOORBEELD", font=font(48, True), fill="#2D5A3D")
    y = 220
    for stijl, tekst in REGELS:
        if stijl == "kop":
            d.text((220, y), tekst, font=font(72, True), fill="#1A1A18"); y += 100
        elif stijl == "sub":
            d.text((220, y), tekst, font=font(40), fill="#5C5C58"); y += 90
        elif stijl == "kop2":
            y += 10; d.text((220, y), tekst, font=font(46, True), fill="#1A1A18"); y += 70
        else:
            d.text((220, y), tekst, font=font(40), fill="#1A1A18"); y += 62
    jpg = HIER / "nepbrief.jpg"
    pdf = HIER / "nepbrief.pdf"
    img.save(jpg, "JPEG", quality=85, dpi=(300, 300))
    img.convert("RGB").save(pdf, "PDF", resolution=300.0)
    return jpg, pdf


if __name__ == "__main__":
    j, p = maak()
    print(f"geschreven: {j} ({j.stat().st_size // 1024} kB), {p} ({p.stat().st_size // 1024} kB)")
