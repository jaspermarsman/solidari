"""Gedeelde batchloop voor de vertaalronde (PLAN-7 fase 2).

Batches van 40, een seconde pauze. Een antwoord moet precies dezelfde id's in dezelfde
aantallen hebben; anders wordt de batch één keer opnieuw aangeboden en daarna overgeslagen,
met een regel in het log. Tussenstanden gaan naar <uitbestand>.deel.json zodat een afgebroken
run kan hervatten zonder opnieuw te betalen.
"""
import datetime
import json
import os
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import gemini  # noqa: E402

STANDAARD_MODEL = "gemini-3.8-flash"
BATCH = 40
ROOT = Path(__file__).resolve().parents[2]
WERKMAP = Path(os.environ.get("SOL_VERTAAL_MAP", ROOT.parent / "Solidari" / "_werkdocumenten" / "vertaal"))


def arg(naam, standaard=None):
    if f"--{naam}" in sys.argv:
        return sys.argv[sys.argv.index(f"--{naam}") + 1]
    return standaard


def vandaag():
    return datetime.date.today().isoformat()


def lees(naam):
    return json.loads((WERKMAP / naam).read_text())


def schrijf(naam, data):
    (WERKMAP / naam).write_text(json.dumps(data, ensure_ascii=False, indent=1))


def draai(items, maak_prompt, veld, temperature, model, deelnaam, label):
    """items: [{id, ...}] → {id: antwoord-object}. veld: het verplichte veld in elk antwoord."""
    deel_pad = WERKMAP / deelnaam
    klaar = json.loads(deel_pad.read_text()) if deel_pad.exists() else {}
    log, gebruik = [], {"in": 0, "uit": 0}
    open_items = [x for x in items if x["id"] not in klaar]
    batches = [open_items[i:i + BATCH] for i in range(0, len(open_items), BATCH)]
    print(f"{label}: {len(items)} items, {len(items) - len(open_items)} al klaar, {len(batches)} batches", flush=True)
    for n, batch in enumerate(batches, 1):
        ids = [x["id"] for x in batch]
        for poging in (1, 2):
            try:
                data, u = gemini.genereer_json(model, maak_prompt(batch), temperature)
                gebruik["in"] += u.get("promptTokenCount", 0)
                gebruik["uit"] += u.get("candidatesTokenCount", 0) + u.get("thoughtsTokenCount", 0)
                if isinstance(data, dict):
                    data = next((v for v in data.values() if isinstance(v, list)), data)
                ok = (isinstance(data, list) and len(data) == len(batch)
                      and sorted(str(d.get("id")) for d in data) == sorted(ids)
                      and all(isinstance(d.get(veld), str) and d.get(veld).strip() for d in data))
                if ok:
                    for d in data:
                        klaar[d["id"]] = d
                    break
                log.append(f"batch {n} poging {poging}: antwoord klopt niet (aantal/id's/veld '{veld}')")
            except Exception as e:  # noqa: BLE001
                log.append(f"batch {n} poging {poging}: {e}")
        else:
            log.append(f"batch {n} OVERGESLAGEN ({len(batch)} items: {ids[0]}…)")
        deel_pad.write_text(json.dumps(klaar, ensure_ascii=False))
        print(f"  batch {n}/{len(batches)} {'ok' if all(i in klaar for i in ids) else 'OVERGESLAGEN'}", flush=True)
        time.sleep(1)
    for regel in log:
        print("  LOG " + regel, flush=True)
    return klaar, log, gebruik
