#!/usr/bin/env python3
"""Terugvertaling als controle voor nieuwe tekst (PLAN-7 B-7, fase 2b; ook TI-tekst die nog
niet bestond). Er is niets om A/B tegen te vergelijken, dus: Gemini vertaalt het resultaat
terug naar het Nederlands, en een tweede aanroep oordeelt alleen of de betekenis gelijk bleef.

    python3 -I tools/vertaal/terugvertaal.py --taal ro

Leest <taal>-nieuw.json en <taal>-gemini.json; schrijft <taal>-terug.json
{model, datum, items: [{id, terug, oordeel, reden}]}. "afwijkend" gaat niet mee maar naar de
reviewlijst.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import prompts  # noqa: E402
import ronde  # noqa: E402

taal = ronde.arg("taal")
model = ronde.arg("model", ronde.STANDAARD_MODEL)
nieuw = ronde.lees(f"{taal}-nieuw.json")
gem = {x["id"]: x[taal] for x in ronde.lees(f"{taal}-gemini.json")["items"]}
items = [{"id": x["id"], "nl": x["nl"], "vert": gem[x["id"]]} for x in nieuw if x["id"] in gem]
naam = prompts.TAALNAAM[taal]


def maak_terug(batch):
    return prompts.PROMPT_TERUG.format(taalnaam=naam, invoer=json.dumps(
        [{"id": x["id"], "tekst": x["vert"]} for x in batch], ensure_ascii=False, indent=0))


terug, log1, g1 = ronde.draai(items, maak_terug, "nl", 0.0, model, f"{taal}-terug.deel.json", f"terugvertaling {taal}")
paren = [{"id": x["id"], "origineel": x["nl"], "terugvertaling": terug[x["id"]]["nl"]} for x in items if x["id"] in terug]


def maak_vergelijk(batch):
    return prompts.PROMPT_VERGELIJK.format(taalnaam=naam, invoer=json.dumps(batch, ensure_ascii=False, indent=0))


oordeel, log2, g2 = ronde.draai(paren, maak_vergelijk, "oordeel", 0.0, model, f"{taal}-terug-oordeel.deel.json", f"betekenis {taal}")
uit = []
for p in paren:
    o = oordeel.get(p["id"], {})
    uit.append({"id": p["id"], "terug": p["terugvertaling"], "oordeel": o.get("oordeel", "ontbreekt"), "reden": o.get("reden", "")})
ronde.schrijf(f"{taal}-terug.json", {
    "model": model, "datum": ronde.vandaag(), "items": uit, "log": log1 + log2,
    "gebruik": {"in": g1["in"] + g2["in"], "uit": g1["uit"] + g2["uit"]},
})
af = sum(1 for x in uit if x["oordeel"] != "gelijk")
print(f"{len(uit)} teruggelezen, {af} afwijkend of zonder oordeel")
