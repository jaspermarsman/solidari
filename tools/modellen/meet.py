"""Meting Haiku 4.5 ↔ Haiku 5.5 (PLAN 8 fase 3) en promptvarianten tegen taaldrift (PLAN 12).

Draaien (met de venv van de backend, die heeft de anthropic-SDK):
    solidari-backend/venv/bin/python -I tools/modellen/meet.py \
        --backend solidari-backend --uit _werkdocumenten/modellen [--herhaal 2] [--alleen smoke|matrix]

De sleutel komt uit ANTHROPIC_API_KEY in de omgeving, anders uit ~/.config/solidari/geheimen.env.
Hij wordt nooit geprint of weggeschreven. Alleen de nepbrief (tools/test/nepbrief.jpg),
nooit een echte brief.

1. smoke: de Worker-aanroep (/api/analyse) op Haiku 5.5 zonder tools en met elke versie van
   de zoektool, plus Haiku 4.5 met de huidige zoektool als vergelijking. Beslist M-7.
2. matrix: de nepbrief zoals _via_claude hem krijgt (OCR → preprocessor → redactie →
   _maak_prompt), × 9 talen × {4.5, 5.5} × herhalingen. Per antwoord de machinecontroles.
3. varianten (PLAN 12): dezelfde nepbrief met de taalinstructie op een andere plek (V0–V3, zie
   VARIANTEN), per --model en --variant, met de strengere taalcontrole uit taalregels.json.
       --alleen varianten --model claude-haiku-5-5 --variant V0,V1,V2,V3 [--talen ...] [--droog]
   --droog schrijft alleen de prompts per variant weg, zonder API.
4. prod (PLAN 13): de nepbrief door de échte backendcode, ai._via_claude() met
   ai._systeem_prompt() en ai._maak_prompt(), dus met claude_tekst(), effort en plafond uit
   Config. Er wordt geen prompt nagebouwd. Model via --model (zet Config.CLAUDE_MODEL).
       --alleen prod --model claude-sonnet-5-5 [--talen alle] [--herhaal 2]
   Elke aanroep telt mee in
   kosten/ naast de uitvoermap; bij --plafond (standaard $15) stopt de meting.
   Sinds PLAN 20 bestaat ai._maak_prompt niet meer: smoke, matrix, varianten en prod horen bij de
   backend van vóór PLAN 20 (PLAN 8, 12 en 13) en draaien alleen nog tegen een kopie daarvan.
5. brief2 (PLAN 20 fase 6): de achttien verzonnen brieven uit tools/test/nepbrieven door de échte
   keten van de backend: preprocessor → ai.analyseer_brief() (redactie, prompt, structured
   outputs, de drie controles). Per antwoord: citaat, deadline, actie, bezwaar en urgentie tegen
   verwacht.json, de taalcontrole T-3, de duur, en of er iets uit mag_niet naar het model ging.
       --alleen brief2 --nepbrieven tools/test/nepbrieven --plafond 10 [--droog] [--proef]
   18 brieven × nl, ar, ti, pl, plus 6 brieven × en, tr, uk, fa, ro (102 aanroepen).
   --herbereken haalt de bewaarde antwoorden opnieuw door de controles in code (geen API).
"""

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

GEHEIMEN = Path.home() / ".config" / "solidari" / "geheimen.env"

MODEL_OUD = "claude-haiku-4-5-20251001"
MODEL_NIEUW = "claude-haiku-5-5"
MODEL_SONNET = "claude-sonnet-5-5"   # alleen als bovengrens (PLAN 12, T-1)
TALEN = ["nl", "en", "ar", "ti", "tr", "uk", "fa", "ro", "pl"]

# Tarieven per miljoen tokens (prompt < 100k), bron: prijzenpagina, 26-10-2026.
TARIEF = {MODEL_OUD: (1.00, 5.00), MODEL_NIEUW: (0.10, 0.50), MODEL_SONNET: (2.00, 10.00)}
ZOEKPRIJS = 10.00 / 1000   # per zoekopdracht

# Instellingen volgens M-4 en M-5: effort alleen bij de 5.5-modellen (T-1).
INSTELLING = {
    MODEL_OUD: {"max_tokens": 2500, "effort": None},
    MODEL_NIEUW: {"max_tokens": 4096, "effort": "low"},
    MODEL_SONNET: {"max_tokens": 4096, "effort": "low"},
}

TAALREGELS = json.loads((Path(__file__).resolve().parent / "taalregels.json").read_text(encoding="utf-8"))

SCHRIFT = {
    "ti": r"[ሀ-᎟ⶀ-⷟꬀-꬯]",
    "ar": r"[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]",
    "fa": r"[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]",
    "uk": r"[Ѐ-ӿ]",
}
# Nederlandse functiewoorden: een hoog aandeel in een niet-NL antwoord betekent dat de uitleg
# (deels) in het Nederlands is blijven staan. Drempel 0,2: Roemeens haalt door "de" ±0,1.
NL_WOORDEN = set("de het een van en uw je u niet voor binnen dagen dit deze moet moeten heeft hebt "
                 "wordt kunt kan naar met op als bij of is zijn er wat".split())
NL_DREMPEL = 0.2
PLACEHOLDERS = re.compile(r"\[(BSN|REKENINGNUMMER|KENMERK|ONTVANGERADRES[^\]]*|NAAM[^\]]*)\]")


class GeenSleutel(Exception):
    pass


def _sleutel():
    k = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not k and GEHEIMEN.exists():
        for regel in GEHEIMEN.read_text(encoding="utf-8").splitlines():
            m = re.match(r"\s*(?:export\s+)?ANTHROPIC_API_KEY\s*=\s*(.*)$", regel)
            if m:
                k = m.group(1).strip().strip("'\"")
    if not k:
        raise GeenSleutel("ANTHROPIC_API_KEY niet gevonden (omgeving of ~/.config/solidari/geheimen.env)")
    return k


def _schoon(tekst):
    return re.sub(r"sk-ant-[0-9A-Za-z_-]{8,}", "[sleutel]", str(tekst))


def _tekst(bericht):
    """Alle tekstblokken samen, op type gelezen (zoals claude_util.claude_tekst gaat doen)."""
    return "\n".join(b.text for b in bericht.content if b.type == "text").strip()


def _kosten(model, usage, zoekopdrachten=0):
    t_in, t_uit = TARIEF[model]
    return usage.input_tokens / 1e6 * t_in + usage.output_tokens / 1e6 * t_uit + zoekopdrachten * ZOEKPRIJS


def _aanroep(client, model, effort, **kwargs):
    extra = {"output_config": {"effort": effort}} if effort else {}
    t0 = time.monotonic()
    try:
        bericht = client.messages.create(model=model, **kwargs, **extra)
    except Exception as e:  # noqa: BLE001 — de fout wordt letterlijk gerapporteerd
        status = getattr(e, "status_code", None)
        return None, time.monotonic() - t0, f"{type(e).__name__} {status}: {_schoon(getattr(e, 'message', e))}"
    return bericht, time.monotonic() - t0, None


def _blokken(bericht):
    return [b.type for b in bericht.content]


def _zoekaantal(bericht):
    stu = getattr(bericht.usage, "server_tool_use", None)
    return getattr(stu, "web_search_requests", 0) or 0 if stu else 0


# ── 1. Smoke ──────────────────────────────────────────────────────────────
BUDGET_SYSTEEM = """Je bent een vriendelijke budgetcoach voor Solidari.
TAAL: Antwoord UITSLUITEND in het Nederlands. Geen uitzonderingen.

Geef advies in 3 delen:

1. BUDGETANALYSE (max 3 zinnen): Bespreek de financiele situatie eerlijk maar respectvol. Benoem het belangrijkste knelpunt.

2. HULP IN UTRECHT: Geef voor elke relevante categorie specifieke informatie voor gemeente Utrecht:
- Bijzondere bijstand: hoe aanvragen
- Kwijtschelding gemeentebelastingen: hoe aanvragen
- Voedselbank: locatie als je die kent
- Schuldhulpverlening gemeente Utrecht: contactgegevens
Als je iets niet zeker weet, zeg dat eerlijk en verwijs naar de gemeente-website of het Sociaal Wijkteam.

3. TOP 3 ACTIES: Drie concrete stappen die nu gezet kunnen worden.

Sluit af met: Neem de Excel of PDF mee naar je begeleider.
Maximaal 400 woorden."""

BUDGET_BERICHT = """BUDGETOVERZICHT
Huishouden: alleenstaande, 1 kind (8 jaar), gemeente Utrecht
INKOMSTEN: bijstand €1.380, kinderbijslag €120, kindgebonden budget €260
UITGAVEN: huur €780, energie €190, zorgverzekering €150, boodschappen €280, telefoon €35, vervoer €40
SALDO: €285 per maand (overschot)

GESIGNALEERDE KNELPUNTEN:
- voedselbank

Nibud-referentie voor deze situatie:
- Huur richtlijn: €700 | Voeding richtlijn: €350 | Energie richtlijn: €150"""

ZOEKVERSIES = ["web_search_20250305", "web_search_20260209", "web_search_20260318"]


# (model, zoektool, max_tokens): de Worker-aanroep van /api/analyse.
SMOKE_VARIANTEN = (
    [(MODEL_NIEUW, None, 2500)]
    + [(MODEL_NIEUW, v, 2500) for v in ZOEKVERSIES]
    + [(MODEL_NIEUW, "web_search_20250305", 4096), (MODEL_OUD, "web_search_20250305", 1500)]
)


def smoke(client, uit, herhaal=1):
    regels = []
    for model, zoek, max_tokens in SMOKE_VARIANTEN:
        for n in range(1, herhaal + 1):
            effort = "low" if model == MODEL_NIEUW else None
            kwargs = dict(max_tokens=max_tokens, system=BUDGET_SYSTEEM,
                          messages=[{"role": "user", "content": BUDGET_BERICHT}])
            if zoek:
                kwargs["tools"] = [{"type": zoek, "name": "web_search"}]
            bericht, duur, fout = _aanroep(client, model, effort, **kwargs)
            r = {"model": model, "zoektool": zoek or "(geen)", "max_tokens": max_tokens, "n": n,
                 "effort": effort, "duur_s": round(duur, 1)}
            if fout:
                r["fout"] = fout
            else:
                tekst = _tekst(bericht)
                r.update(stop_reason=bericht.stop_reason, blokken=_blokken(bericht),
                         tekst_tekens=len(tekst), zoekopdrachten=_zoekaantal(bericht),
                         input_tokens=bericht.usage.input_tokens, output_tokens=bericht.usage.output_tokens,
                         kosten_usd=round(_kosten(model, bericht.usage, _zoekaantal(bericht)), 5))
                (uit / f"smoke-{model}-{zoek or 'geen'}-{max_tokens}-{n}.txt").write_text(tekst, encoding="utf-8")
            regels.append(r)
            print("smoke", json.dumps(r, ensure_ascii=False))
    (uit / "smoke.json").write_text(json.dumps(regels, ensure_ascii=False, indent=1), encoding="utf-8")
    return regels


# ── 2. Matrix Brief Begrijper ─────────────────────────────────────────────
def briefprompt(backend, uit):
    """De nepbrief door dezelfde stappen als routes/brief.py → services/ai.analyseer_brief."""
    from services.ocr import lees_tekst_uit_bestand
    from services.preprocessor import verwerk_ocr_tekst
    from services.redacteer import redacteer_pii

    nep = Path(__file__).resolve().parents[1] / "test" / "nepbrief.jpg"
    tekst = lees_tekst_uit_bestand(nep.read_bytes(), "image/jpeg", "nl")
    tekst = verwerk_ocr_tekst(tekst)
    geredacteerd = redacteer_pii(tekst)
    (uit / "nepbrief-geredacteerd.txt").write_text(geredacteerd, encoding="utf-8")
    return geredacteerd


def _platte_tekst(resultaat):
    delen = []
    u = resultaat.get("urgentie") or {}
    delen += [str(u.get("titel", "")), str(u.get("tekst", ""))]
    for s in resultaat.get("secties", []):
        delen += [str(s.get("titel", "")), re.sub(r"<[^>]+>", " ", str(s.get("inhoud", "")))]
    delen += [str(a) for a in resultaat.get("actiepunten", [])]
    return " ".join(delen)


def controles(ai, taal, ruwe_tekst):
    """Machinecontroles uit PLAN 8 fase 3.3. Geeft (dict met uitslagen, resultaat of None)."""
    c = {}
    try:
        resultaat = json.loads(ruwe_tekst.strip())
        c["json_zonder_fallback"] = True
    except json.JSONDecodeError:
        c["json_zonder_fallback"] = False
        resultaat = ai._parseer_json(ruwe_tekst) if ruwe_tekst else None
    c["json_parseert"] = isinstance(resultaat, dict)
    if not c["json_parseert"]:
        for k in ("velden", "valideert", "titels_doeltaal", "schrift", "geen_placeholders", "geen_nl_lek"):
            c[k] = False
        return c, None

    resultaat = ai._saniteer_resultaat(resultaat)
    c["velden"] = all(k in resultaat for k in ("urgentie", "secties", "actiepunten"))
    c["valideert"] = ai._valideer_resultaat(resultaat)
    resultaat = ai._vervang_sectietitels(resultaat, taal)

    titels = [str(s.get("titel", "")) for s in resultaat.get("secties", [])]
    nl = set(ai.SECTIE_TITELS["nl"].values()) | {"Wat staat er?", "Wat moet ik doen?", "Waarom?", "Bezwaar maken?"}
    if taal == "nl":
        c["titels_doeltaal"] = bool(titels)
    else:
        nl_over = [t for t in titels if t in nl and t != "Contact"]
        ok = bool(titels) and not nl_over
        if taal in SCHRIFT:
            ok = ok and all(re.search(SCHRIFT[taal], t) for t in titels)
        c["titels_doeltaal"] = ok

    plat = _platte_tekst(resultaat)
    letters = [ch for ch in plat if ch.isalpha()]
    if taal in SCHRIFT and letters:
        aandeel = sum(1 for ch in letters if re.match(SCHRIFT[taal], ch)) / len(letters)
        c["schrift_aandeel"] = round(aandeel, 2)
        c["schrift"] = aandeel >= 0.6
    else:
        c["schrift"] = True
    c["geen_placeholders"] = not PLACEHOLDERS.search(plat)
    woorden = re.findall(r"[^\W\d_]+", plat.lower())
    c["nl_aandeel"] = round(sum(w in NL_WOORDEN for w in woorden) / max(1, len(woorden)), 2)
    c["geen_nl_lek"] = taal == "nl" or c["nl_aandeel"] < NL_DREMPEL
    return c, resultaat


def matrix(client, ai, prompt_basis, uit, herhaal, modellen=(MODEL_OUD, MODEL_NIEUW), talen=TALEN,
           effort=None, label="matrix"):
    regels = []
    for model in modellen:
        inst = dict(INSTELLING[model])
        if effort and model == MODEL_NIEUW:
            inst["effort"] = effort
        for taal in talen:
            prompt = ai._maak_prompt(prompt_basis, taal, "")
            for n in range(1, herhaal + 1):
                bericht, duur, fout = _aanroep(
                    client, model, inst["effort"], max_tokens=inst["max_tokens"],
                    system=ai.SYSTEEM_PROMPT, messages=[{"role": "user", "content": prompt}])
                r = {"model": model, "effort": inst["effort"], "taal": taal, "n": n, "duur_s": round(duur, 1)}
                if fout:
                    r.update(fout=fout, geslaagd=False)
                else:
                    ruw = _tekst(bericht)
                    c, resultaat = controles(ai, taal, ruw)
                    r.update(stop_reason=bericht.stop_reason, blokken=_blokken(bericht),
                             input_tokens=bericht.usage.input_tokens, output_tokens=bericht.usage.output_tokens,
                             kosten_usd=round(_kosten(model, bericht.usage), 5), **c)
                    r["geslaagd"] = (bericht.stop_reason == "end_turn" and
                                     all(c[k] for k in ("json_parseert", "velden", "valideert",
                                                        "titels_doeltaal", "schrift", "geen_placeholders",
                                                        "geen_nl_lek")))
                    naam = f"{label}-{model}-{taal}-{n}" if label != "matrix" else f"{model}-{taal}-{n}"
                    (uit / f"{naam}.ruw.txt").write_text(ruw, encoding="utf-8")
                    if resultaat is not None:
                        (uit / f"{naam}.json").write_text(json.dumps(resultaat, ensure_ascii=False, indent=1),
                                                         encoding="utf-8")
                regels.append(r)
                print(label, json.dumps({k: v for k, v in r.items() if k != "blokken"}, ensure_ascii=False))
    (uit / f"{label}.json").write_text(json.dumps(regels, ensure_ascii=False, indent=1), encoding="utf-8")
    return regels


# ── 3. Varianten tegen taaldrift (PLAN 12) ───────────────────────────────
DREMPEL = TAALREGELS["_drempels"]
NL_WOORDEN_12 = set(TAALREGELS["_nl_woorden"])
_URL = re.compile(r"https?://\S+|www\.\S+|\b[\w.-]+\.(?:nl|com|org|eu|gov)\b\S*")


def _woorden(t):
    return re.findall(r"[^\W\d_]+", t.lower())


def _doel_ok(t, taal):
    """Kenmerken van de doeltaal in tekst t (T-3). Geeft (ok, details)."""
    k = TAALREGELS.get(taal, {}).get("kenmerken", {})
    letters = [ch for ch in t if ch.isalpha()]
    d = {}
    if not k:
        return True, d
    ok = True
    if "schrift" in k:
        pat = re.compile(k["schrift"])
        eigen_schrift = [ch for ch in letters if pat.match(ch)]
        d["schrift_aandeel"] = round(len(eigen_schrift) / max(1, len(letters)), 2)
        ok = d["schrift_aandeel"] >= DREMPEL["schrift_aandeel"]
        n = max(1, len(eigen_schrift))
        if "eigen" in k:
            d["eigen_per_letter"] = round(sum(ch in k["eigen"] for ch in eigen_schrift) / n, 3)
            ok = ok and d["eigen_per_letter"] >= DREMPEL["eigen_per_letter"]
        if "vreemd" in k:
            d["vreemd_per_letter"] = round(sum(ch in k["vreemd"] for ch in eigen_schrift) / n, 3)
            ok = ok and d["vreemd_per_letter"] < DREMPEL["vreemd_per_letter"]
    else:
        w = _woorden(t)
        if "tekens" in k:
            d["tekens_per_letter"] = round(sum(ch in k["tekens"] for ch in letters) / max(1, len(letters)), 3)
            ok = d["tekens_per_letter"] >= DREMPEL["tekens_per_letter"]
        if "woorden" in k:
            d["woorden_aandeel"] = round(sum(x in k["woorden"] for x in w) / max(1, len(w)), 2)
            ok = ok and d["woorden_aandeel"] >= k.get("woorden_drempel", DREMPEL["woorden_aandeel"])
    return ok, d


def taalcontrole(tekst, taal):
    """Strengere taalcontrole (PLAN 12, T-3): aandeel NL-woorden, kenmerken van de doeltaal en
    het aantal Nederlandse zinnen. 'in_doeltaal' alleen als alle drie in orde zijn."""
    t = _URL.sub(" ", re.sub(r"<[^>]+>", " ", str(tekst)))
    # Woorden die ook functiewoord van de doeltaal zijn (Roemeens 'de') tellen niet als Nederlands.
    nlw = NL_WOORDEN_12 - set(TAALREGELS.get(taal, {}).get("kenmerken", {}).get("woorden", []))
    w = _woorden(t)
    r = {"nl_aandeel": round(sum(x in nlw for x in w) / max(1, len(w)), 2)}
    ok, d = _doel_ok(t, taal)
    r.update(d, doeltaal_kenmerken=ok)
    nl_zinnen = []
    if taal != "nl":
        for zin in re.split(r"[.!?؟።\n]+", t):
            zw = _woorden(zin)
            if len(zw) < DREMPEL["min_woorden_zin"]:
                continue
            nl = sum(x in nlw for x in zw) / len(zw)
            if nl >= DREMPEL["nl_aandeel_zin"] and not _doel_ok(zin, taal)[0]:
                nl_zinnen.append(zin.strip()[:100])
    r["nl_zinnen"] = len(nl_zinnen)
    if nl_zinnen:
        r["nl_zin_voorbeeld"] = nl_zinnen[0]
    r["in_doeltaal"] = taal == "nl" or (r["nl_aandeel"] < DREMPEL["nl_aandeel_antwoord"] and ok and not nl_zinnen)
    return r


class PlafondBereikt(Exception):
    pass


class Kosten:
    """Gedeeld kostenregister: elk proces schrijft zijn eigen bestand in de map kosten/ (ook
    worker-echt.mjs), het totaal is de som van alle bestanden. Zo kunnen metingen parallel
    lopen zonder telfouten. Een aanroep start niet meer als het totaal het plafond haalt (§2.6)."""

    def __init__(self, map_, plafond, naam):
        self.map, self.plafond = map_, plafond
        self.map.mkdir(parents=True, exist_ok=True)
        self.pad = self.map / f"{naam}-{os.getpid()}.json"
        self.eigen = {"usd": 0.0, "aanroepen": 0}

    def totaal(self):
        som = 0.0
        for f in self.map.glob("*.json"):
            try:
                som += json.loads(f.read_text(encoding="utf-8"))["usd"]
            except (ValueError, KeyError):
                pass
        return som

    def check(self):
        t = self.totaal()
        if t >= self.plafond:
            raise PlafondBereikt(f"geschatte kosten ${t:.2f} ≥ plafond ${self.plafond:.2f}")

    def tel(self, bron, usd):
        self.eigen["usd"] = round(self.eigen["usd"] + usd, 5)
        self.eigen["aanroepen"] += 1
        self.pad.write_text(json.dumps(self.eigen), encoding="utf-8")


VARIANTEN = ("V0", "V1", "V2", "V3")


def variant_prompts(ai, basis, taal, variant):
    """(systeemprompt, gebruikersbericht) voor een variant. Alleen de taalinstructie verschilt;
    V0 is letterlijk SYSTEEM_PROMPT en _maak_prompt uit de backend (alleen gelezen)."""
    systeem = ai.SYSTEEM_PROMPT
    prompt = ai._maak_prompt(basis, taal, "")
    regel = TAALREGELS[taal]
    taal_naam = ai.TAAL_NAMEN.get(taal, "Nederlands")
    if variant == "V1":
        prompt += f"\nSchrijf alle tekst in de JSON in het {taal_naam}."
    elif variant in ("V2", "V3"):
        prompt += "\n" + regel["json"]
    if variant == "V3":
        titels = ai.SECTIE_TITELS.get(taal, ai.SECTIE_TITELS["nl"])
        oud = "TAAL: Schrijf altijd in de taal die de gebruiker heeft gekozen. Volg dit strikt op."
        assert oud in systeem, "TAAL-regel in SYSTEEM_PROMPT gewijzigd; variant V3 moet opnieuw"
        systeem = systeem.replace(oud, (
            f"TAAL: De gebruiker heeft gekozen voor: {taal_naam}. Schrijf alle tekst in de JSON in het "
            f"{taal_naam}, ook al zijn deze instructies en de brief in het Nederlands. Volg dit strikt op."))
        oud_fmt = '"secties": [ { "icoon": "emoji", "titel": "naam", "achtergrond": "#EBF3EE", "inhoud": "HTML" } ],'
        assert oud_fmt in systeem, "JSON-formaat in SYSTEEM_PROMPT gewijzigd; variant V3 moet opnieuw"
        systeem = systeem.replace(oud_fmt, (
            f'"secties": [ {{ "icoon": "emoji", "titel": "{titels["wat_staat_er"]}", "achtergrond": "#EBF3EE", '
            f'"inhoud": "HTML" }}, {{ "icoon": "emoji", "titel": "{titels["wat_doen"]}", "achtergrond": "#EBF3EE", '
            f'"inhoud": "HTML" }} ],'))
    return systeem, prompt


def varianten(client, ai, basis, uit, herhaal, modellen, varianten_, talen, kosten, droog=False):
    regels = []
    if droog:
        pmap = (uit.parent if uit.name == "brief" else uit) / "prompts"
        pmap.mkdir(parents=True, exist_ok=True)
        for v in varianten_:
            for taal in talen:
                systeem, prompt = variant_prompts(ai, basis, taal, v)
                (pmap / f"brief-{v}-{taal}.txt").write_text(
                    f"=== SYSTEEM ===\n{systeem}\n\n=== GEBRUIKER ===\n{prompt}\n", encoding="utf-8")
        print(f"droog: {len(varianten_) * len(talen)} prompts in {pmap}")
        return regels
    for model in modellen:
        inst = INSTELLING[model]
        for v in varianten_:
            for taal in talen:
                systeem, prompt = variant_prompts(ai, basis, taal, v)
                for n in range(1, herhaal + 1):
                    kosten.check()
                    bericht, duur, fout = _aanroep(
                        client, model, inst["effort"], max_tokens=inst["max_tokens"],
                        system=systeem, messages=[{"role": "user", "content": prompt}])
                    r = {"model": model, "effort": inst["effort"], "variant": v, "taal": taal, "n": n,
                         "duur_s": round(duur, 1)}
                    if fout:
                        r.update(fout=fout, geslaagd=False, in_doeltaal=False)
                    else:
                        ruw = _tekst(bericht)
                        c, resultaat = controles(ai, taal, ruw)
                        c.pop("nl_aandeel", None)
                        c["schrift_oud"] = c.pop("schrift", None)
                        c.pop("schrift_aandeel", None)
                        # Ontbreken de velden (bijv. vertaalde JSON-sleutels), dan de taal van de ruwe tekst.
                        t = taalcontrole(_platte_tekst(resultaat) if resultaat and c["velden"] else ruw, taal)
                        usd = _kosten(model, bericht.usage)
                        kosten.tel("brief", usd)
                        r.update(stop_reason=bericht.stop_reason,
                                 input_tokens=bericht.usage.input_tokens, output_tokens=bericht.usage.output_tokens,
                                 kosten_usd=round(usd, 5), **c, **t)
                        r["overig_ok"] = (bericht.stop_reason == "end_turn" and
                                          all(c[k] for k in ("json_parseert", "velden", "valideert",
                                                             "titels_doeltaal", "geen_placeholders")))
                        r["geslaagd"] = r["overig_ok"] and t["in_doeltaal"]
                        naam = f"{model}-{v}-{taal}-{n}"
                        (uit / f"{naam}.ruw.txt").write_text(ruw, encoding="utf-8")
                    regels.append(r)
                    print("variant", json.dumps({k: r.get(k) for k in (
                        "model", "variant", "taal", "n", "duur_s", "geslaagd", "in_doeltaal", "overig_ok",
                        "nl_aandeel", "nl_zinnen", "doeltaal_kenmerken", "kosten_usd", "fout")}, ensure_ascii=False))
                    with open(uit / "varianten.jsonl", "a", encoding="utf-8") as f:
                        f.write(json.dumps(r, ensure_ascii=False) + "\n")
    return regels



def prod(ai, basis, uit, herhaal, model, talen, kosten, sleutel):
    """Fase 1-acceptatie PLAN 13: de echte _via_claude, het antwoord opgevangen voor de controles."""
    import anthropic
    from config import Config
    from services.claude_util import claude_tekst

    Config.ANTHROPIC_API_KEY = sleutel
    Config.CLAUDE_MODEL = model
    Config.CLAUDE_EFFORT = INSTELLING[model]["effort"] or ""
    opname = {}
    echt = anthropic.Anthropic

    def opnemende_client(**kw):
        c = echt(**kw)
        create = c.messages.create

        def neem_op(**k):
            opname["verzoek"] = {x: k[x] for x in ("model", "max_tokens") if x in k} | (
                {"effort": k["output_config"]["effort"]} if "output_config" in k else {})
            opname["bericht"] = create(**k)
            return opname["bericht"]
        c.messages.create = neem_op
        return c

    ai.anthropic.Anthropic = opnemende_client
    regels = []
    try:
        for taal in talen:
            for n in range(1, herhaal + 1):
                kosten.check()
                opname.clear()
                t0 = time.monotonic()
                r = {"model": model, "variant": "PROD", "taal": taal, "n": n}
                try:
                    ai._via_claude(ai._maak_prompt(basis, taal, ""), ai._systeem_prompt(taal))
                    fout = None
                except Exception as e:  # noqa: BLE001 — de fout wordt gerapporteerd
                    fout = f"{type(e).__name__}: {_schoon(e)}"
                r["duur_s"] = round(time.monotonic() - t0, 1)
                bericht = opname.get("bericht")
                r["verzoek"] = opname.get("verzoek")
                if bericht is not None:
                    usd = _kosten(model, bericht.usage)
                    kosten.tel("brief-prod", usd)
                    r.update(stop_reason=bericht.stop_reason, input_tokens=bericht.usage.input_tokens,
                             output_tokens=bericht.usage.output_tokens, kosten_usd=round(usd, 5))
                if fout or bericht is None:
                    r.update(fout=fout or "geen antwoord", geslaagd=False, in_doeltaal=False)
                else:
                    ruw = claude_tekst(bericht)
                    c, resultaat = controles(ai, taal, ruw)
                    c.pop("nl_aandeel", None)
                    c["schrift_oud"] = c.pop("schrift", None)
                    c.pop("schrift_aandeel", None)
                    t = taalcontrole(_platte_tekst(resultaat) if resultaat and c["velden"] else ruw, taal)
                    r.update(**c, **t)
                    r["overig_ok"] = (bericht.stop_reason == "end_turn" and
                                      all(c[k] for k in ("json_parseert", "velden", "valideert",
                                                         "titels_doeltaal", "geen_placeholders")))
                    r["geslaagd"] = r["overig_ok"] and t["in_doeltaal"]
                    (uit / f"prod-{model}-{taal}-{n}.ruw.txt").write_text(ruw, encoding="utf-8")
                regels.append(r)
                print("prod", json.dumps({k: r.get(k) for k in (
                    "taal", "n", "duur_s", "geslaagd", "in_doeltaal", "overig_ok", "nl_zinnen",
                    "stop_reason", "verzoek", "kosten_usd", "fout")}, ensure_ascii=False))
                with open(uit / "prod.jsonl", "a", encoding="utf-8") as f:
                    f.write(json.dumps(r, ensure_ascii=False) + "\n")
    finally:
        ai.anthropic.Anthropic = echt
    return regels


# ── 5. Brief Begrijper v2 (PLAN 20 fase 6) ───────────────────────────────
BRIEF2_VOL = ["nl", "ar", "ti", "pl"]                       # alle 18 brieven
BRIEF2_DEEL = ["en", "tr", "uk", "fa", "ro"]                # 6 brieven
BRIEF2_ZES = ["01-ind-verlenging", "06-gemeente-bijstand", "08-gemeente-wmo", "12-uwv-formulier",
              "16-cjib-boete", "17-incasso-vordering"]
MAX_DUUR_S = 45


def _brief2_tekst(res):
    """De uitleg als platte tekst, zonder het citaat (dat hoort Nederlands te zijn)."""
    delen = [res["urgentie"]["titel"], res["urgentie"]["tekst"], res["wat_staat_er"], *res["wat_doen"]]
    delen += [res.get(k) or "" for k in ("als_je_niets_doet", "bezwaar", "twijfel")]
    return "\n".join(d for d in delen if d)


def _brief2_controles(res, ruw, verwacht, taal, datum_van):
    """Vergelijk één antwoord met verwacht.json. `ruw` is wat het model gaf, vóór de controles in code."""
    c = {}
    d = res["deadline"]
    datum = datum_van(d["datum"]) if d and d["datum"] else None
    # Citaat: greep de controle in code in, dan gaf het model een citaat dat niet in de brief staat.
    c["model_gaf_deadline"] = isinstance((ruw or {}).get("deadline"), dict)
    c["citaat_ok"] = res["twijfel_code"] != "deadline_onzeker"
    v = verwacht["deadline"]
    if v:
        goed = datum == datum_van(v)
        c["deadline_ok"] = goed or (bool(verwacht.get("deadline_mag_null")) and datum is None)
        c["deadline_onterecht"] = False
    elif verwacht.get("termijn"):
        c["deadline_ok"] = datum is None           # alleen een termijn: geen datum
        c["deadline_onterecht"] = datum is not None
    else:
        c["deadline_ok"] = d is None or datum is None
        c["deadline_onterecht"] = datum is not None            # hard: een datum bij een brief zonder
        c["termijn_bij_brief_zonder"] = d is not None and datum is None   # zacht: alleen een termijn als citaat
    c["actie_ok"] = bool(res["wat_doen"]) == verwacht["heeft_actie"]
    c["bezwaar_ok"] = bool(res["bezwaar"]) == verwacht["bezwaar"]
    c["urgentie_ok"] = res["urgentie"]["niveau"] == verwacht["urgentie"]
    c["urgentie"] = res["urgentie"]["niveau"]
    t = taalcontrole(_brief2_tekst(res), taal)
    c["in_doeltaal"] = t["in_doeltaal"]
    c["taaldetails"] = {k: t[k] for k in t if k != "in_doeltaal"}
    c["citaat_nederlands"] = True
    if d and taal != "nl":
        c["citaat_nederlands"] = taalcontrole(d["citaat"], "nl") is not None and not re.search(
            TAALREGELS.get(taal, {}).get("kenmerken", {}).get("schrift", r"$^"), d["citaat"])
    uit = json.dumps(res, ensure_ascii=False)
    c["geen_placeholders"] = not re.search(r"\[(NAAM|ADRES|BSN|KENMERK|V-NUMMER|REKENINGNUMMER|E-MAIL|TELEFOON|"
                                           r"GEBOORTEDATUM|KENTEKEN)\]", _brief2_tekst(res))
    c["geen_html"] = not re.search(r"<[a-z/][^>]*>", uit)
    return c


def brief2(ai, nepbrieven, uit, model, kosten, sleutel, droog=False, proef=False):
    """PLAN 20 fase 6: de echte analyseer_brief op de achttien verzonnen brieven."""
    import anthropic
    from datetime import date
    from config import Config
    from services.preprocessor import verwerk_ocr_tekst, _extraheer_datums
    from services.redacteer import redacteer_pii

    verwacht = json.loads((nepbrieven / "verwacht.json").read_text(encoding="utf-8"))
    vandaag = date.fromisoformat(verwacht["_peildatum"])
    namen = sorted(k for k in verwacht if not k.startswith("_"))

    def datum_van(tekst):
        g = _extraheer_datums(tekst)
        return g[0]["datum"].date() if g else None

    werk = [(n, t) for n in namen for t in BRIEF2_VOL] + [(n, t) for n in BRIEF2_ZES for t in BRIEF2_DEEL]
    if proef:
        werk = [("06-gemeente-bijstand", "nl"), ("08-gemeente-wmo", "pl"), ("17-incasso-vordering", "ar")]
    if droog:
        pmap = uit / "prompts"
        pmap.mkdir(parents=True, exist_ok=True)
        for n in namen:
            tekst = redacteer_pii(verwerk_ocr_tekst((nepbrieven / f"{n}.txt").read_text(encoding="utf-8")))
            bericht, _ = ai._maak_bericht(tekst, "pl", "")
            (pmap / f"brief2-{n}-pl.txt").write_text(
                f"=== SYSTEEM ===\n{ai._systeem_prompt('pl', vandaag)}\n\n=== GEBRUIKER ===\n{bericht}\n", encoding="utf-8")
        print(f"droog: {len(namen)} prompts in {pmap}; {len(werk)} aanroepen gepland")
        return []

    Config.ANTHROPIC_API_KEY = sleutel
    Config.CLAUDE_MODEL = model
    Config.CLAUDE_EFFORT = INSTELLING[model]["effort"] or ""
    opname = []
    echt = anthropic.Anthropic

    def opnemende_client(**kw):
        c = echt(**kw)
        create = c.messages.create

        def neem_op(**k):
            bericht = create(**k)
            opname.append((k, bericht))
            return bericht
        c.messages.create = neem_op
        return c

    ai.anthropic.Anthropic = opnemende_client
    echte_parser = ai._parseer_json
    ruw_antwoord = {}

    def parser(tekst, stop_reason=None):
        ruw_antwoord["laatste"] = echte_parser(tekst, stop_reason)
        return ruw_antwoord["laatste"]
    ai._parseer_json = parser

    klaar = set()
    if (uit / "brief2.jsonl").exists() and not proef:
        for regel in (uit / "brief2.jsonl").read_text(encoding="utf-8").splitlines():
            r = json.loads(regel)
            if not r.get("fout"):
                klaar.add((r["brief"], r["taal"]))
    doel = uit / ("brief2-proef.jsonl" if proef else "brief2.jsonl")
    regels = []
    try:
        for naam, taal in werk:
            if (naam, taal) in klaar:
                continue
            kosten.check()
            opname.clear()
            ruw_antwoord.clear()
            tekst = verwerk_ocr_tekst((nepbrieven / f"{naam}.txt").read_text(encoding="utf-8"))
            r = {"brief": naam, "taal": taal, "model": model}
            t0 = time.monotonic()
            try:
                res, fout = ai.analyseer_brief(tekst, taal, "", vandaag=vandaag), None
            except Exception as e:  # noqa: BLE001 — de fout wordt gerapporteerd
                res, fout = None, f"{type(e).__name__}: {_schoon(e)}"
            r["duur_s"] = round(time.monotonic() - t0, 1)
            r["aanroepen"] = len(opname)
            usd = sum(_kosten(model, b.usage) for _, b in opname)
            for _ in opname:
                kosten.tel("brief2", usd / len(opname))
            r["kosten_usd"] = round(usd, 5)
            if opname:
                k, b = opname[-1]
                r.update(stop_reason=b.stop_reason, input_tokens=b.usage.input_tokens, output_tokens=b.usage.output_tokens,
                         schema="format" in k.get("output_config", {}), effort=k.get("output_config", {}).get("effort"))
                verstuurd = k["system"] + "\n" + k["messages"][0]["content"]
                r["lek_naar_model"] = [p for p in verwacht[naam]["mag_niet"] if re.search(p, verstuurd, re.IGNORECASE)]
            if fout or res is None:
                r.update(fout=fout or "geen antwoord", geslaagd=False)
            else:
                r["antwoord"] = res
                r["ruw_deadline"] = (ruw_antwoord.get("laatste") or {}).get("deadline")
                r.update(_brief2_controles(res, ruw_antwoord.get("laatste"), verwacht[naam], taal, datum_van))
                r["op_tijd"] = r["duur_s"] <= MAX_DUUR_S
                r["geslaagd"] = all(r[k] for k in ("citaat_ok", "deadline_ok", "actie_ok", "bezwaar_ok", "in_doeltaal",
                                                   "op_tijd", "geen_html")) and not r["deadline_onterecht"] \
                    and not r.get("lek_naar_model")
            regels.append(r)
            print("brief2", json.dumps({k: r.get(k) for k in (
                "brief", "taal", "duur_s", "aanroepen", "geslaagd", "citaat_ok", "deadline_ok", "deadline_onterecht",
                "actie_ok", "bezwaar_ok", "urgentie", "urgentie_ok", "in_doeltaal", "kosten_usd", "fout")},
                ensure_ascii=False), flush=True)
            with open(doel, "a", encoding="utf-8") as f:
                f.write(json.dumps(r, ensure_ascii=False) + "\n")
    finally:
        ai.anthropic.Anthropic = echt
        ai._parseer_json = echte_parser
    return regels


def brief2_herbereken(ai, nepbrieven, uit):
    """Draai de controles in code opnieuw op de bewaarde antwoorden (geen API). Het ruwe antwoord
    van het model (ruw_deadline) gaat opnieuw door ai._controleer_deadline; de uitkomst komt in
    brief2-herberekend.jsonl. Was de urgentie door de oude controle 'verlopen' geworden, dan is
    het niveau van het model niet bewaard; de herberekening begint dan bij 'hoog'."""
    import copy
    from datetime import date
    from services.preprocessor import verwerk_ocr_tekst, _extraheer_datums
    from services.redacteer import redacteer_pii

    verwacht = json.loads((nepbrieven / "verwacht.json").read_text(encoding="utf-8"))
    vandaag = date.fromisoformat(verwacht["_peildatum"])

    def datum_van(tekst):
        g = _extraheer_datums(tekst)
        return g[0]["datum"].date() if g else None

    teksten = {}
    doel = uit / "brief2-herberekend.jsonl"
    doel.write_text("", encoding="utf-8")
    for regel in (uit / "brief2.jsonl").read_text(encoding="utf-8").splitlines():
        r = json.loads(regel)
        if not r.get("fout"):
            naam = r["brief"]
            if naam not in teksten:
                teksten[naam] = redacteer_pii(verwerk_ocr_tekst((nepbrieven / f"{naam}.txt").read_text(encoding="utf-8")))
            res = copy.deepcopy(r["antwoord"])
            ruw = r.get("ruw_deadline")
            res["deadline"] = ({"datum": ai._tekst(ruw.get("datum")), "citaat": ai._tekst(ruw.get("citaat"))}
                               if isinstance(ruw, dict) and ai._tekst(ruw.get("citaat")) else None)
            res["twijfel_code"] = None
            if res["urgentie"]["niveau"] == "verlopen":
                res["urgentie"]["niveau"] = "hoog"
            res = ai._controleer_deadline(res, teksten[naam][:ai.MAX_BRIEF_TEKENS], vandaag)
            r["antwoord"] = res
            r.update(_brief2_controles(res, {"deadline": ruw}, verwacht[naam], r["taal"], datum_van))
            r["geslaagd"] = all(r[k] for k in ("citaat_ok", "deadline_ok", "actie_ok", "bezwaar_ok", "in_doeltaal",
                                               "op_tijd", "geen_html")) and not r["deadline_onterecht"] \
                and not r.get("lek_naar_model")
        with open(doel, "a", encoding="utf-8") as f:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"herberekend: {doel}")
    brief2_uitslag(uit, nepbrieven, "brief2-herberekend.jsonl")


def brief2_uitslag(uit, nepbrieven, bestand="brief2.jsonl"):
    """Lees brief2.jsonl en zet de uitslag naast de lat van PLAN 20 fase 6."""
    verwacht = json.loads((nepbrieven / "verwacht.json").read_text(encoding="utf-8"))
    regels = {}
    for regel in (uit / bestand).read_text(encoding="utf-8").splitlines():
        r = json.loads(regel)
        regels[(r["brief"], r["taal"])] = r          # een latere regel (herkansing na een fout) telt
    rs = list(regels.values())
    goed = [r for r in rs if not r.get("fout")]
    print(f"\n{len(rs)} aanroepen, {len(rs) - len(goed)} met een fout, kosten ${sum(r.get('kosten_usd', 0) for r in rs):.2f}")
    for r in rs:
        if r.get("fout"):
            print(f"  FOUT {r['brief']} {r['taal']}: {r['fout'][:120]}")

    def lijst(test):
        return [f"{r['brief'][:2]}/{r['taal']}" for r in goed if test(r)]
    met_deadline = [r for r in goed if r.get("model_gaf_deadline")]
    print(f"1. citaat letterlijk in de brief: {sum(r['citaat_ok'] for r in met_deadline)}/{len(met_deadline)}"
          f" antwoorden met een deadline   mis: {lijst(lambda r: not r['citaat_ok'])}")
    print("2. deadline klopt met verwacht.json, per taal (lat: ≥ 17 van de 18 brieven):")
    for taal in BRIEF2_VOL + BRIEF2_DEEL:
        t = [r for r in goed if r["taal"] == taal]
        print(f"     {taal}: {sum(r['deadline_ok'] for r in t)}/{len(t)}   mis: {[r['brief'][:2] for r in t if not r['deadline_ok']]}")
    print(f"   een datum als deadline bij een brief zonder (lat: nooit): {lijst(lambda r: r['deadline_onterecht'])}")
    print(f"   alleen een termijn als citaat bij een brief zonder deadline (ter info): {lijst(lambda r: r.get('termijn_bij_brief_zonder'))}")
    zonder = [r for r in goed if not verwacht[r["brief"]]["heeft_actie"]]
    print(f"3. geen actie bij brieven zonder actie: {sum(r['actie_ok'] for r in zonder)}/{len(zonder)}"
          f"   mis: {lijst(lambda r: not r['actie_ok'] and not verwacht[r['brief']]['heeft_actie'])}")
    print(f"   wel een actie bij brieven met actie: mis: {lijst(lambda r: not r['actie_ok'] and verwacht[r['brief']]['heeft_actie'])}")
    print(f"4. bezwaar alleen waar verwacht: {sum(r['bezwaar_ok'] for r in goed)}/{len(goed)}"
          f"   onterecht genoemd: {lijst(lambda r: not r['bezwaar_ok'] and not verwacht[r['brief']]['bezwaar'])}"
          f"   ontbreekt: {lijst(lambda r: not r['bezwaar_ok'] and verwacht[r['brief']]['bezwaar'])}")
    print("5. taalcontrole T-3 per taal (lat: alles op één na):")
    for taal in BRIEF2_VOL + BRIEF2_DEEL:
        t = [r for r in rs if r["taal"] == taal]
        print(f"     {taal}: {sum(bool(r.get('in_doeltaal')) for r in t)}/{len(t)}   mis: {[r['brief'][:2] for r in t if not r.get('in_doeltaal')]}")
    duur = sorted(r["duur_s"] for r in rs)
    print(f"6. duur: mediaan {duur[len(duur) // 2]} s, langste {duur[-1]} s (lat: niets boven {MAX_DUUR_S} s)"
          f"   te lang: {lijst(lambda r: not r['op_tijd'])}")
    print(f"   urgentie zoals verwacht (ter info): {sum(r['urgentie_ok'] for r in goed)}/{len(goed)}"
          f"   anders: {[x + ':' + r['urgentie'] for x, r in zip(lijst(lambda r: True), goed) if not r['urgentie_ok']]}")
    print(f"   herkansingen (meer dan één aanroep): {lijst(lambda r: r['aanroepen'] > 1)}")
    print(f"   citaat niet Nederlands: {lijst(lambda r: not r['citaat_nederlands'])};"
          f" placeholder in de uitleg: {lijst(lambda r: not r['geen_placeholders'])};"
          f" HTML: {lijst(lambda r: not r['geen_html'])}; lek naar het model: {[r['brief'][:2] for r in rs if r.get('lek_naar_model')]}")
    print(f"   structured outputs gebruikt: {sum(bool(r.get('schema')) for r in rs)}/{len(rs)}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--backend", required=True, help="map solidari-backend (alleen gelezen)")
    ap.add_argument("--uit", required=True, help="uitvoermap, buiten git")
    ap.add_argument("--herhaal", type=int, default=2)
    ap.add_argument("--herhaal-smoke", type=int, default=3)
    ap.add_argument("--alleen", choices=["smoke", "matrix", "effort", "varianten", "prod", "brief2"])
    ap.add_argument("--nepbrieven", default=str(Path(__file__).resolve().parents[1] / "test" / "nepbrieven"),
                    help="voor --alleen brief2: map met de verzonnen brieven en verwacht.json")
    ap.add_argument("--proef", action="store_true", help="voor --alleen brief2: drie aanroepen, als proef")
    ap.add_argument("--herbereken", action="store_true", help="voor --alleen brief2: alleen de uitslag, geen API")
    ap.add_argument("--talen", default="pl,tr,uk", help="voor --alleen effort; 'alle' = 9 talen")
    ap.add_argument("--effort", default="medium", help="voor --alleen effort")
    ap.add_argument("--model", default=f"{MODEL_OUD},{MODEL_NIEUW}", help="voor --alleen varianten")
    ap.add_argument("--variant", default="V0,V1,V2,V3", help="voor --alleen varianten")
    ap.add_argument("--droog", action="store_true", help="alleen prompts wegschrijven, geen API")
    ap.add_argument("--plafond", type=float, default=15.0, help="stop bij deze geschatte kosten (USD)")
    a = ap.parse_args()
    talen = TALEN if a.talen == "alle" else a.talen.split(",")

    uit = Path(a.uit).resolve()
    uit.mkdir(parents=True, exist_ok=True)
    sys.path.insert(0, str(Path(a.backend).resolve()))
    # config.py laadt /etc/solidari/.env; dat bestand is voor productie en hoort niet in een meting.
    import dotenv
    dotenv.load_dotenv = lambda *args, **kwargs: False
    # De dagteller van de backend schrijft naar SOLIDARI_LOG_DIR; nooit naar /var/log/solidari.
    import tempfile
    os.environ.setdefault("SOLIDARI_LOG_DIR", tempfile.mkdtemp(prefix="solidari-meet-"))
    import anthropic
    from services import ai

    if a.alleen == "brief2":
        nep = Path(a.nepbrieven).resolve()
        if a.herbereken:
            brief2_herbereken(ai, nep, uit)
            return
        model = a.model if a.model in INSTELLING else MODEL_SONNET
        kosten = Kosten(uit / "kosten", a.plafond, f"brief2-{model}")
        try:
            brief2(ai, nep, uit, model, kosten, None if a.droog else _sleutel(), droog=a.droog, proef=a.proef)
        except PlafondBereikt as e:
            print(f"PLAFOND: {e}")
            sys.exit(3)
        if not a.droog and not a.proef:
            brief2_uitslag(uit, nep)
        return

    if a.alleen == "prod":
        assert a.model in INSTELLING, a.model
        basis = (uit / "nepbrief-geredacteerd.txt").read_text(encoding="utf-8") \
            if (uit / "nepbrief-geredacteerd.txt").exists() else briefprompt(a.backend, uit)
        kosten = Kosten((uit.parent if uit.name == "brief" else uit) / "kosten", a.plafond, f"prod-{a.model}")
        try:
            regels = prod(ai, basis, uit, a.herhaal, a.model, talen, kosten, _sleutel())
        except PlafondBereikt as e:
            print(f"PLAFOND: {e}")
            sys.exit(3)
        goed = sum(r["geslaagd"] for r in regels)
        print(f"\n{goed}/{len(regels)} geslaagd")
        sys.exit(0 if goed == len(regels) else 1)

    if a.alleen == "varianten":
        modellen = a.model.split(",")
        vs = a.variant.split(",")
        assert all(m in INSTELLING for m in modellen) and all(v in VARIANTEN for v in vs)
        basis = (uit / "nepbrief-geredacteerd.txt").read_text(encoding="utf-8") \
            if (uit / "nepbrief-geredacteerd.txt").exists() else briefprompt(a.backend, uit)
        client = None if a.droog else anthropic.Anthropic(api_key=_sleutel(), timeout=120.0, max_retries=1)
        kosten = Kosten((uit.parent if uit.name == "brief" else uit) / "kosten", a.plafond,
                        f"brief-{'+'.join(modellen)}")
        try:
            varianten(client, ai, basis, uit, a.herhaal, modellen, vs, talen, kosten, droog=a.droog)
        except PlafondBereikt as e:
            print(f"PLAFOND: {e}")
            sys.exit(3)
        return

    client = anthropic.Anthropic(api_key=_sleutel(), timeout=120.0, max_retries=1)

    try:
        m = client.models.retrieve(MODEL_NIEUW)
        cap = getattr(m, "capabilities", None)
        info = {"id": m.id, "max_input_tokens": getattr(m, "max_input_tokens", None),
                "max_tokens": getattr(m, "max_tokens", None),
                "capabilities": cap.model_dump() if hasattr(cap, "model_dump") else cap}
    except Exception as e:  # noqa: BLE001
        info = {"fout": _schoon(e)}
    (uit / "model-haiku-5-5.json").write_text(json.dumps(info, ensure_ascii=False, indent=1, default=str),
                                              encoding="utf-8")
    print("models-api", _schoon(json.dumps(info, default=str))[:600])

    if a.alleen in (None, "smoke"):
        smoke(client, uit, a.herhaal_smoke)
    if a.alleen in (None, "matrix"):
        basis = briefprompt(a.backend, uit)
        print(f"nepbrief: {len(basis)} tekens na OCR, preprocessor en redactie")
        matrix(client, ai, basis, uit, a.herhaal)
    if a.alleen == "effort":
        basis = briefprompt(a.backend, uit)
        matrix(client, ai, basis, uit, a.herhaal, modellen=(MODEL_NIEUW,), talen=talen,
               effort=a.effort, label=f"effort-{a.effort}")


if __name__ == "__main__":
    try:
        main()
    except GeenSleutel as e:
        print(f"GEEN SLEUTEL: {e}")
        sys.exit(2)
