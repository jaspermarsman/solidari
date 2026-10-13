#!/usr/bin/env python3
"""Besluit 13-10-2026 (W-D, punt 2): Tigrinya spreekt de lezer alleen in de mannelijke vorm aan.

    python3 -I tools/vertaal/mannelijk.py --taal ti

Simuleert de eindstand na stapel A (voorstel) en de B-wissel (B met m/v-streep → Gemini-voorstel),
neemt alle teksten die dán nog een schuine streep tussen Ge'ez-tekens hebben (bron én spiegel), en
laat Gemini daar een minimale bewerking op doen: alleen de m/v-keuze weghalen, niets hertalen.
Controle per tekst: placeholders, HTML, getallen en regelafbrekingen gelijk aan de invoer; geen
m/v-streep meer over (afkortingen als ዓ/ዓ mogen blijven); en de tekst moet grotendeels gelijk
blijven (difflib-ratio ≥ 0,75). Schrijft <taal>-mannelijk.json.
"""
import difflib
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import ronde  # noqa: E402

taal = ronde.arg("taal", "ti")
model = ronde.arg("model", ronde.STANDAARD_MODEL)
STREEP = re.compile(r"[ሀ-፿]/[ሀ-፿]")
# Strepen die geen m/v-keuze zijn
GEEN_MV = ["ዓ/ዓ", "ሰዓት/ሰሙን", "ሰዓታት/ሰሙን", "ሰዓት/ወርሒ", "ግብሪ/ወርሒ", "ኤውሮጳ/ስዊዘርላንድ", "መጋቢት/ሚያዝያ",
          "ሓላዊ/መዓጀቢ", "ሓጋዚ/መራሒ", "ዘለዎም/ዜግነት"]   # uur/week, EU/Zwitserland, maart/april, … — geen m/v

PROMPT = """Je bewerkt bestaande Tigrinya-teksten van een Nederlandse hulpwebsite. Besluit van de
redactie: de site spreekt de lezer alleen in de MANNELIJKE vorm aan (enkelvoud).

Regels:
1. Waar nu twee vormen met een schuine streep staan voor de lezer (bijvoorbeeld ትቕበል/ትቕበሊ,
   ኣሎካ/ኪ, ዲኻ/ዲኺ), houd alleen de mannelijke vorm en haal de streep weg.
2. Waar de streep over een derde persoon gaat die zoon of dochter kan zijn (ወዲ/ጓልኩም, ናቱ/ናታ,
   ዓቢ/ዓባይ over het kind), gebruik een neutrale vorm: ውላድ ("kind") met de passende uitgang,
   en daarna consequent één vorm.
3. Schuine strepen die geen keuze tussen man en vrouw zijn (zoals ዓ/ዓ of ሰዓት/ሰሙን) blijven staan.
4. Verander verder NIETS: geen andere woorden, geen verbeteringen, geen hertaling. Placeholders
   tussen accolades, HTML-tags, getallen, Latijnse woorden en regelafbrekingen blijven exact gelijk.

Antwoord met JSON, niets erbuiten:
[{"id": "<id uit de invoer>", "ti": "<bewerkte tekst>"}]
Even veel objecten als de invoer, dezelfde id's, dezelfde volgorde.

Invoer:
"""


def mv_streep(s):
    t = s
    for g in GEEN_MV:
        t = t.replace(g, "")
    return bool(STREEP.search(t))


def kenmerken(s):
    return (sorted(re.findall(r"\{[^{}\s]+\}", s)), sorted(re.findall(r"<[^>]+>", s)),
            sorted(re.findall(r"\d+(?:[.,]\d+)*", re.sub(r"<[^>]+>", " ", s))), s.count("\n"))


# Eindstand na A + B-wissel, via node (bronnen.js weet waar alles staat)
st = ronde.lees(f"{taal}-stapels.json")["stapels"]
vervangen = {(r["bron"], r["pad"]): r["voorstel"] for r in st["A"]}
b_wissel = [r for r in st["B"] if mv_streep(r["huidig"]) and r["controle"]["geslaagd"]]
for r in b_wissel:
    vervangen[(r["bron"], r["pad"])] = r["voorstel"]
huidig = json.loads(subprocess.check_output(["node", "-e", """
const B=require('./tools/vertaal/bronnen.js'); const uit={bron:[],spiegel:[]};
for(const b of B.laadAlles()){const t=b.talen.TI; if(!t) continue; for(const [p,l] of t.bladeren) if(l.soort==='str') uit.bron.push([b.naam,p,l.waarde]);}
for(const [k,l] of B.laadSpiegel().TI) uit.spiegel.push([k,l.waarde]);
process.stdout.write(JSON.stringify(uit));"""], cwd=ronde.ROOT))

oud_naar_nieuw = {}
for r in st["A"] + b_wissel:
    oud_naar_nieuw.setdefault(r["huidig"], r["voorstel"])
items, per_tekst = [], {}
for bron, pad, waarde in huidig["bron"]:
    eind = vervangen.get((bron, pad), waarde)
    if mv_streep(eind):
        per_tekst.setdefault(eind, []).append({"soort": "bron", "bron": bron, "pad": pad, "huidig": waarde})
for sleutel, waarde in huidig["spiegel"]:
    eind = oud_naar_nieuw.get(waarde, waarde)
    if mv_streep(eind):
        per_tekst.setdefault(eind, []).append({"soort": "spiegel", "sleutel": sleutel, "huidig": waarde})
for tekst, plekken in per_tekst.items():   # id = hash van de tekst, zodat de cache niet verschuift
    items.append({"id": "m" + hashlib.sha1(tekst.encode()).hexdigest()[:10], "tekst": tekst, "plekken": plekken})


def maak(batch):
    return PROMPT + json.dumps([{"id": x["id"], "ti": x["tekst"]} for x in batch], ensure_ascii=False, indent=0)


klaar, log, gebruik = ronde.draai(items, maak, taal, 0.0, model, f"{taal}-mannelijk.deel.json", "mannelijk")
uit = []
for x in items:
    if x["id"] not in klaar:
        uit.append(dict(x, nieuw=None, geslaagd=False, gezakt_op=["geen antwoord"]))
        continue
    nieuw = klaar[x["id"]][taal]
    gezakt = []
    if kenmerken(nieuw) != kenmerken(x["tekst"]):
        gezakt.append("opmaak/getallen")
    if mv_streep(nieuw):
        gezakt.append("streep over")
    ratio = difflib.SequenceMatcher(None, x["tekst"], nieuw).ratio()
    if ratio < 0.75:
        gezakt.append(f"te veel veranderd ({ratio:.2f})")
    uit.append(dict(x, nieuw=nieuw, ratio=round(ratio, 3), geslaagd=not gezakt, gezakt_op=gezakt))
ronde.schrijf(f"{taal}-mannelijk.json", {
    "model": model, "datum": ronde.vandaag(), "b_wissel": [{"bron": r["bron"], "pad": r["pad"]} for r in b_wissel],
    "items": uit, "log": log, "gebruik": gebruik})
ok = sum(1 for x in uit if x["geslaagd"])
print(f"B-wissel {len(b_wissel)} · nog met streep {len(items)} teksten ({sum(len(x['plekken']) for x in items)} plekken) · bewerkt ok {ok}, gezakt {len(uit) - ok}")
