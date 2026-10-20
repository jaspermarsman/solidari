#!/usr/bin/env python3
"""Stap 2 (PLAN-7 fase 2): Gemini vertaalt de NL-bron zelfstandig opnieuw.

    python3 -I tools/vertaal/hervertaal.py --taal ti [--model gemini-3.8-flash]

Leest <taal>-paren.json, <taal>-nieuw.json en <taal>-structuur.json; schrijft <taal>-gemini.json
{model, datum, prompt, items: [{id, <taal>}], log, gebruik}. De bestaande vertaling zit NIET
in de prompt (B-2). Gelijke NL-teksten worden één keer vertaald en daarna op alle id's gezet.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import prompts  # noqa: E402
import ronde  # noqa: E402

taal = ronde.arg("taal")
model = ronde.arg("model", ronde.STANDAARD_MODEL)
if not taal:
    sys.exit("gebruik: hervertaal.py --taal ti")

# --alleen-nieuw: alleen tekst die in deze taal nog niet bestaat (fase 2b en de andere talen)
bestanden = ((f"{taal}-nieuw.json",) if "--alleen-nieuw" in sys.argv
             else (f"{taal}-paren.json", f"{taal}-nieuw.json", f"{taal}-structuur.json"))
alle = []
for naam in bestanden:
    if (ronde.WERKMAP / naam).exists():
        alle += ronde.lees(naam)

# één vertaling per unieke NL-tekst; de vertegenwoordiger is het eerste id
per_nl = {}
for x in alle:
    per_nl.setdefault(x["nl"], []).append(x["id"])
uniek = [{"id": ids[0], "nl": nl} for nl, ids in per_nl.items()]
# PLAN 10 B-1: een kale prompt gaf bij een korte kop een verkeerde lezing; een item mag "context" meegeven
context = {x["id"]: x["context"] for x in alle if x.get("context")}
CONTEXTREGEL = ('Het veld "context" zegt waar de tekst op de site staat en wat hij moet doen. '
                'Vertaal het niet en neem het niet op in je antwoord; het is alleen uitleg.\n')


def maak(batch):
    invoer = [dict({"id": x["id"], "nl": x["nl"]}, **({"context": context[x["id"]]} if x["id"] in context else {}))
              for x in batch]
    tekst = json.dumps(invoer, ensure_ascii=False, indent=0)
    return prompts.prompt_a(taal, (CONTEXTREGEL if any("context" in x for x in invoer) else "") + tekst)


klaar, log, gebruik = ronde.draai(uniek, maak, taal, 0.2, model, f"{taal}-gemini.deel.json", f"hervertaal {taal}")
items = []
for nl, ids in per_nl.items():
    if ids[0] in klaar:
        for i in ids:
            items.append({"id": i, taal: klaar[ids[0]][taal]})
ronde.schrijf(f"{taal}-gemini.json", {
    "model": model, "datum": ronde.vandaag(), "temperature": 0.2, "prompt": "PLAN-7 §7 prompt A",
    "uniek": len(uniek), "items": items, "log": log, "gebruik": gebruik,
})
print(f"{len(items)} van {len(alle)} id's vertaald ({len(uniek)} unieke NL-teksten); tokens in {gebruik['in']}, uit {gebruik['uit']}")
