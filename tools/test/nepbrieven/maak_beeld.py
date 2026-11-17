#!/usr/bin/env python3
"""
Solidari — maak van een nepbrief (tekst) een A4-afbeelding of een tekst-PDF (PLAN 20, B-4).

Voor de OCR-meting: de tekst wordt in een vaste letter op een A4 gezet (de kolommen blijven
staan) en daarna een beetje "telefoonfoto" gemaakt: licht gedraaid, iets onscherp, grijze
achtergrond, JPEG-kwaliteit 60. Alleen verzonnen brieven; er gaat niets naar buiten.

Gebruik:
  python3 maak_beeld.py 01-ind-verlenging.txt uit.jpg            # foto (één pagina)
  python3 maak_beeld.py 01-ind-verlenging.txt uit.jpg --schoon   # zonder vervorming
  python3 maak_beeld.py 01-ind-verlenging.txt uit.pdf            # PDF mét tekstlaag
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 2480, 3508  # A4 op 300 dpi
MONO = ['/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf']


def _font(maat):
    for pad in MONO:
        if Path(pad).exists():
            return ImageFont.truetype(pad, maat)
    return ImageFont.load_default()


def naar_beeld(tekst: str, schoon: bool = False) -> Image.Image:
    regels = tekst.split('\n')
    breedste = max(len(r) for r in regels) or 1
    maat = min(40, int((W - 400) / (breedste * 0.602)))
    stap = int(maat * 1.45)
    if 300 + len(regels) * stap > H - 200:           # lange brief: kleiner zetten
        stap = (H - 500) // len(regels)
        maat = min(maat, int(stap / 1.3))
    img = Image.new('RGB', (W, H), 'white' if schoon else '#F4F2EE')
    d = ImageDraw.Draw(img)
    f = _font(maat)
    y = 260
    for regel in regels:
        d.text((200, y), regel, font=f, fill='#1A1A18')
        y += stap
    if not schoon:
        img = img.rotate(1.2, resample=Image.BICUBIC, fillcolor='#E9E6E0')
        img = img.filter(ImageFilter.GaussianBlur(1.1))
    return img


def naar_pdf(tekst: str, pad: Path) -> None:
    """Schrijf een eenvoudige PDF met een echte tekstlaag (Courier), zonder extra pakketten."""
    maat, stap, per_pagina = 8, 10.8, 68
    regels = tekst.split('\n')
    paginas = [regels[i:i + per_pagina] for i in range(0, len(regels), per_pagina)] or [[]]

    def esc(r):
        r = r.encode('cp1252', 'replace').decode('latin-1')
        return r.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

    objecten = ['<< /Type /Catalog /Pages 2 0 R >>', None,
                '<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>']
    kids = []
    for pagina in paginas:
        inhoud = 'BT /F1 %d Tf 45 780 Td %.1f TL\n' % (maat, stap) + '\n'.join(f'({esc(r)}) Tj T*' for r in pagina) + '\nET'
        objecten.append(f'<< /Length {len(inhoud.encode("latin-1"))} >>\nstream\n{inhoud}\nendstream')
        objecten.append(f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] '
                        f'/Resources << /Font << /F1 3 0 R >> >> /Contents {len(objecten)} 0 R >>')
        kids.append(f'{len(objecten)} 0 R')
    objecten[1] = f'<< /Type /Pages /Kids [{" ".join(kids)}] /Count {len(kids)} >>'
    uit = b'%PDF-1.4\n'
    posities = []
    for nr, obj in enumerate(objecten, 1):
        posities.append(len(uit))
        uit += f'{nr} 0 obj\n{obj}\nendobj\n'.encode('latin-1')
    xref = len(uit)
    uit += f'xref\n0 {len(objecten) + 1}\n0000000000 65535 f \n'.encode()
    uit += b''.join(f'{p:010d} 00000 n \n'.encode() for p in posities)
    uit += f'trailer\n<< /Size {len(objecten) + 1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n'.encode()
    pad.write_bytes(uit)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(2)
    bron, doel = Path(sys.argv[1]), Path(sys.argv[2])
    tekst = bron.read_text(encoding='utf-8')
    if doel.suffix.lower() == '.pdf':
        naar_pdf(tekst, doel)
    else:
        naar_beeld(tekst, '--schoon' in sys.argv).save(doel, 'JPEG', quality=95 if '--schoon' in sys.argv else 60, dpi=(300, 300))
    print(f'geschreven: {doel} ({doel.stat().st_size // 1024} kB)')
