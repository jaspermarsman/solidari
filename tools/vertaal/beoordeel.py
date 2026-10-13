#!/usr/bin/env python3
"""Stap 3 (PLAN-7 fase 2): blind A/B-oordeel huidige vertaling ↔ Gemini-vertaling.

    python3 -I tools/vertaal/beoordeel.py --taal ti [--model gemini-3.8-flash] [--seed 20261013]

Per paar bepaalt een vaste seed of A de huidige of de Gemini-versie is (staat in het bestand,
dus de ronde is herhaalbaar). temperature 0, prompt B uit §7. Daarna de herhaalsteekproef:
10% van de paren nog eens, met A en B omgewisseld. Klapt de winnaar bij meer dan 30% om, dan
meet het oordeel positie en niet kwaliteit (§10.1) — rapport.js weigert dan stapel A.

Schrijft <taal>-oordeel.json {model, datum, seed, steekproef: {n, omgeklapt, ...}, items: [...]}.
Paren waarin Gemini letterlijk hetzelfde teruggeeft als de huidige vertaling gaan niet naar het
model: die zijn per definitie gelijkwaardig.
"""
import json
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import prompts  # noqa: E402
import ronde  # noqa: E402

taal = ronde.arg("taal")
model = ronde.arg("model", ronde.STANDAARD_MODEL)
seed = int(ronde.arg("seed", "20261013"))
if taal != "ti":
    sys.exit("prompt B bestaat alleen voor Tigrinya (B-4)")

paren = ronde.lees(f"{taal}-paren.json")
gem = {x["id"]: x[taal] for x in ronde.lees(f"{taal}-gemini.json")["items"]}
rng = random.Random(seed)

items, identiek, zonder = [], [], []
uniek = {}   # (nl, huidig, gemini) → vertegenwoordiger
for p in paren:
    g = gem.get(p["id"])
    if g is None:
        zonder.append(p["id"])
        continue
    if g.strip() == p["huidig"].strip():
        identiek.append(p["id"])
        continue
    sleutel = (p["nl"], p["huidig"], g)
    if sleutel in uniek:
        uniek[sleutel]["ook"].append(p["id"])
        continue
    a_is = "gemini" if rng.random() < 0.5 else "huidig"
    rec = {"id": p["id"], "nl": p["nl"], "a_is": a_is,
           "A": g if a_is == "gemini" else p["huidig"], "B": p["huidig"] if a_is == "gemini" else g, "ook": []}
    uniek[sleutel] = rec
    items.append(rec)


def maak(batch):
    return prompts.PROMPT_B_TI + json.dumps([{"id": x["id"], "nl": x["nl"], "A": x["A"], "B": x["B"]} for x in batch],
                                            ensure_ascii=False, indent=0)


def winnaar(keuze, a_is):
    if keuze == "gelijkwaardig":
        return "gelijk"
    if keuze not in ("A", "B"):
        return "ongeldig"
    return a_is if keuze == "A" else ("huidig" if a_is == "gemini" else "gemini")


klaar, log, gebruik = ronde.draai(items, maak, "keuze", 0.0, model, f"{taal}-oordeel.deel.json", f"beoordeel {taal}")

# herhaalsteekproef: 10% van de beoordeelde paren, A en B omgewisseld
beoordeeld = [x for x in items if x["id"] in klaar]
steek = rng.sample(beoordeeld, max(1, round(len(beoordeeld) * 0.10))) if beoordeeld else []
gewisseld = [{"id": x["id"], "nl": x["nl"], "A": x["B"], "B": x["A"],
              "a_is": "huidig" if x["a_is"] == "gemini" else "gemini"} for x in steek]
klaar2, log2, gebruik2 = ronde.draai(gewisseld, maak, "keuze", 0.0, model, f"{taal}-oordeel-herhaal.deel.json", f"herhaalsteekproef {taal}")

omgeklapt, hard = [], []
for x in gewisseld:
    if x["id"] not in klaar2:
        continue
    w1 = winnaar(klaar[x["id"]]["keuze"], next(i["a_is"] for i in items if i["id"] == x["id"]))
    w2 = winnaar(klaar2[x["id"]]["keuze"], x["a_is"])
    if w1 != w2:
        omgeklapt.append(x["id"])
        if {w1, w2} == {"gemini", "huidig"}:
            hard.append(x["id"])
n_steek = sum(1 for x in gewisseld if x["id"] in klaar2)

uit = []
for x in items:
    if x["id"] not in klaar:
        continue
    o = klaar[x["id"]]
    rec = {"id": x["id"], "keuze": o["keuze"], "ernst": o.get("ernst"), "reden": o.get("reden", ""),
           "a_is": x["a_is"], "winnaar": winnaar(o["keuze"], x["a_is"]),
           "omgeklapt": x["id"] in omgeklapt}
    uit.append(rec)
    for ander in x["ook"]:
        uit.append(dict(rec, id=ander, dubbel_van=x["id"]))
for i in identiek:
    uit.append({"id": i, "keuze": "gelijkwaardig", "ernst": "cosmetisch", "reden": "Gemini gaf letterlijk dezelfde tekst",
                "a_is": None, "winnaar": "gelijk", "omgeklapt": False})

ronde.schrijf(f"{taal}-oordeel.json", {
    "model": model, "datum": ronde.vandaag(), "seed": seed, "temperature": 0, "prompt": "PLAN-7 §7 prompt B",
    "steekproef": {"n": n_steek, "omgeklapt": len(omgeklapt), "hard_omgeklapt": len(hard),
                   "aandeel": round(len(omgeklapt) / n_steek, 3) if n_steek else None, "ids": omgeklapt,
                   "herhaal_oordelen": {k: v for k, v in klaar2.items()}},
    "items": uit, "zonder_gemini": zonder, "log": log + log2,
    "gebruik": {"in": gebruik["in"] + gebruik2["in"], "uit": gebruik["uit"] + gebruik2["uit"]},
})
print(f"{len(uit)} oordelen ({len(items)} uniek naar het model, {len(identiek)} identiek); "
      f"steekproef {n_steek}, omgeklapt {len(omgeklapt)} (hard {len(hard)})")
