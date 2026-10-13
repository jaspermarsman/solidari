#!/usr/bin/env python3
"""AMENDEMENT beleefdheidsvorm TI, fase R1.2: de aanspreekvorm naar het beleefde meervoud (ኹም).

    python3 -I tools/vertaal/register.py [--model gemini-3.8-flash]

Neemt elke TI-tekst met Ge'ez (gewone strings, sjablonen met {xN}, spiegelrijen; `zeg` niet),
groepeert op tekst (id = hash van de tekst, A-2 — geen volgnummers) en laat Gemini met de prompt uit
§5 van het amendement, letterlijk, bij temperature 0 alleen de aanspreekvorm bijstellen.
Controles (A-4), met de huidige TI-tekst als referentie: placeholders, HTML-tags, getallen,
regelafbrekingen, systeemtermen in Latijns schrift, Ge'ez-schrift, lengte (controleer.js), plus
difflib-ratio ≥ 0,75 en geen m/v-streep in het resultaat. Ongewijzigd = overslaan (A-3).
Toegevoegd na de eerste run (13-10): 'vreemd teken' — geen teken buiten Ge'ez dat niet al in de
tekst stond (Gemini zette twee keer katakana ホ in ሆላንድ, en de schriftcontrole zag dat niet omdat er
nog Ge'ez in stond) — en 'woordaantal' gelijk (regel 3: niets toevoegen of weglaten).
Schrijft ti-register.json.
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

model = ronde.arg("model", ronde.STANDAARD_MODEL)
STREEP = re.compile(r"[ሀ-፿]/[ሀ-፿]")
GEEN_MV = ["ዓ/ዓ", "ሰዓት/ሰሙን", "ሰዓታት/ሰሙን", "ሰዓት/ወርሒ", "ግብሪ/ወርሒ", "ኤውሮጳ/ስዊዘርላንድ", "መጋቢት/ሚያዝያ",
          "ሓላዊ/መዓጀቢ", "ሓጋዚ/መራሒ", "ዘለዎም/ዜግነት"]   # zelfde lijst als mannelijk.py

# Letterlijk uit §5 van AMENDEMENT-beleefdheidsvorm-ti.md
PROMPT = """Je past de aanspreekvorm aan in bestaande Tigrinya-teksten van een Nederlandse
hulpwebsite. Besluit van de redactie: de site spreekt de lezer aan in de
BELEEFDE MEERVOUDSVORM (de ኹም-vorm), die geen geslacht aanduidt.

Regels:
1. Staat de tekst in de tweede persoon enkelvoud (mannelijk of vrouwelijk) —
   werkwoordsvervoegingen, bezits- en voorwerpsachtervoegsels — zet die dan om
   naar de beleefde meervoudsvorm. Consequent in de hele tekst.
2. Spreekt de tekst de lezer NIET direct aan (een kop, een label, een zin over
   derden), geef hem dan ONGEWIJZIGD terug.
3. Verander verder NIETS: geen andere woorden, geen verbeteringen, geen
   hertaling, geen andere volgorde. Alleen de aanspreekvorm.
4. Placeholders tussen accolades, HTML-tags, getallen, bedragen, Latijnse
   woorden (DigiD, gemeente, BSN, huurtoeslag …) en regelafbrekingen blijven
   exact gelijk.
5. Er komt geen schuine streep tussen een mannelijke en een vrouwelijke vorm
   terug.

Antwoord met JSON, niets erbuiten:
[{"id": "<id uit de invoer>", "ti": "<tekst>"}]
Even veel objecten als de invoer, dezelfde id's, dezelfde volgorde.

Invoer:
"""


def mv_streep(s):
    for g in GEEN_MV:
        s = s.replace(g, "")
    return bool(STREEP.search(s))


# Alle TI-teksten via node (bronnen.js weet waar alles staat; offsets in UTF-16)
dump = json.loads(subprocess.check_output(["node", "-e", r"""
const B=require('./tools/vertaal/bronnen.js'); const {sjabloon}=require('./tools/vertaal/extract.js');
const GEEZ=/[ሀ-፿]/; const uit=[];
for(const b of B.laadAlles()){const t=b.talen.TI; if(!t) continue; const nl=b.talen.NL?b.talen.NL.bladeren:new Map();
  for(const [p,l] of t.bladeren){ if(/(^|\.)zeg$/.test(p)||!GEEZ.test(l.waarde)) continue;
    const n=nl.get(p);
    if(l.soort==='str') uit.push({soort:'bron',bron:b.naam,bestand:l.bestand,pad:p,tekst:l.waarde,nl:n&&n.soort==='str'?n.waarde:''});
    else if(l.soort==='expr'){const sj=sjabloon(l.waarde); if(!sj) continue; const sn=n&&n.soort==='expr'?sjabloon(n.waarde):null;
      uit.push({soort:'bron',bron:b.naam,bestand:l.bestand,pad:p,tekst:sj.tekst,sjabloon:sj,nl:sn?sn.tekst:''});}}}
for(const [k,l] of B.laadSpiegel().TI) if(GEEZ.test(l.waarde)) uit.push({soort:'spiegel',bestand:l.bestand,sleutel:k,tekst:l.waarde,nl:''});
process.stdout.write(JSON.stringify(uit));"""], cwd=ronde.ROOT))

per_tekst = {}
for p in dump:
    per_tekst.setdefault(p["tekst"], []).append(p)
items = []
for tekst, plekken in per_tekst.items():
    nl = next((p["nl"] for p in plekken if p["nl"]), "")
    items.append({"id": "r" + hashlib.sha1(tekst.encode()).hexdigest()[:10], "tekst": tekst, "nl": nl, "plekken": plekken})


def maak(batch):
    return PROMPT + json.dumps([{"id": x["id"], "nl": x["nl"], "ti": x["tekst"]} for x in batch], ensure_ascii=False, indent=0)


klaar, log, gebruik = ronde.draai(items, maak, "ti", 0.0, model, "ti-register.deel.json", "register")

# Machinecontroles via controleer.js, referentie = huidige TI-tekst
paren = [{"id": x["id"], "ref": x["tekst"], "nieuw": klaar[x["id"]]["ti"]} for x in items if x["id"] in klaar]
ctrl = json.loads(subprocess.run(["node", "-e", r"""
const {controleer}=require('./tools/vertaal/controleer.js'); let s=''; process.stdin.on('data',d=>s+=d).on('end',()=>{
const uit={}; for(const p of JSON.parse(s)) uit[p.id]=controleer('ti',p.ref,p.nieuw,p.ref); process.stdout.write(JSON.stringify(uit));});"""],
    input=json.dumps(paren), capture_output=True, text=True, cwd=ronde.ROOT, check=True).stdout)

uit, telling = [], {"ongewijzigd": 0, "gewijzigd_ok": 0, "gezakt": 0, "geen_antwoord": 0}
for x in items:
    if x["id"] not in klaar:
        telling["geen_antwoord"] += 1
        uit.append(dict(x, nieuw=None, geslaagd=False, gezakt_op=["geen antwoord"]))
        continue
    nieuw = klaar[x["id"]]["ti"]
    if nieuw == x["tekst"]:
        telling["ongewijzigd"] += 1
        uit.append(dict(x, nieuw=nieuw, ratio=1.0, geslaagd=True, gezakt_op=[]))
        continue
    gezakt = list(ctrl.get(x["id"], []))
    ratio = difflib.SequenceMatcher(None, x["tekst"], nieuw).ratio()
    if ratio < 0.75:
        gezakt.append(f"ratio:{ratio:.2f}")
    if mv_streep(nieuw):
        gezakt.append("m/v-streep")
    vreemd = sorted({c for c in nieuw if not ("\u1200" <= c <= "\u137f") and c not in x["tekst"]})
    if vreemd:
        gezakt.append("vreemd teken:" + "".join(vreemd))
    if len(nieuw.split()) != len(x["tekst"].split()):
        gezakt.append("woordaantal")
    telling["gezakt" if gezakt else "gewijzigd_ok"] += 1
    uit.append(dict(x, nieuw=nieuw, ratio=round(ratio, 3), geslaagd=not gezakt, gezakt_op=gezakt))

gewijzigd = telling["gewijzigd_ok"] + telling["gezakt"]
pct = 100 * telling["gezakt"] / gewijzigd if gewijzigd else 0
ratios = sorted(x["ratio"] for x in uit if x.get("nieuw") and x["nieuw"] != x["tekst"])
ronde.schrijf("ti-register.json", {"model": model, "datum": ronde.vandaag(), "telling": telling,
                                    "gezakt_pct": round(pct, 1), "items": uit, "log": log, "gebruik": gebruik})
print(f"teksten {len(items)} ({len(dump)} plekken) · {telling} · gezakt {pct:.1f}% van de gewijzigde"
      f" · ratio mediaan {ratios[len(ratios)//2] if ratios else '-'} · tokens {gebruik}")
print("AFBREEKCRITERIUM 1 ROOD" if pct > 10 else "afbreekcriterium 1 groen")
