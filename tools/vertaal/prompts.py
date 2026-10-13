"""De prompts van PLAN-7 §7. Prompt A en B voor Tigrinya staan er letterlijk; voor de andere
talen (nieuwe tekst, fase 2b) is prompt A dezelfde tekst met taalnaam en taalregel ingevuld."""

TAALNAAM = {
    "ti": "Tigrinya (ti, Ge'ez-schrift)",
    "ro": "Roemeens (ro)",
    "pl": "Pools (pl)",
    "en": "Engels (en)",
    "ar": "Arabisch (ar, Modern Standaard Arabisch)",
    "tr": "Turks (tr)",
    "uk": "Oekraïens (uk)",
    "fa": "Dari (fa, Perzisch zoals in Afghanistan, Arabisch schrift)",
}

TAALREGEL = {
    "ti": "1. Vertaal naar Tigrinya, niet naar Amhaars. Gebruik Tigrinya-woordvormen en\n   -grammatica.",
    "fa": "1. Vertaal naar Dari zoals in Afghanistan gesproken, niet naar Iraans Perzisch.\n   Kies woorden die ook Iraanse lezers begrijpen.",
    "ar": "1. Vertaal naar eenvoudig Modern Standaard Arabisch, zonder dialect.",
    "uk": "1. Vertaal naar Oekraïens, niet naar Russisch.",
}

PROMPT_A = """Je vertaalt tekst van een Nederlandse publieke-informatiewebsite naar {taalnaam}. De lezers zijn statushouders en nieuwkomers in Nederland;
velen hebben weinig opleiding.

Regels:
{taalregel}
2. Niveau A2: korte zinnen, gewone woorden, een gedachte per zin.
3. Volwassen toon. Niet kinderlijk, niet troostend, niet neerbuigend.
4. Laat deze Nederlandse systeemtermen ONVERTAALD in Latijns schrift staan:
   huisarts, BSN, DigiD, gemeente, bijstand, klantmanager, toeslag, inburgering,
   IND, Belastingdienst, UWV, SVB, VluchtelingenWerk, Juridisch Loket.
5. Neem placeholders exact over: {{n}}, {{x}}, {{bedrag}} en alles tussen accolades.
6. Neem HTML-tags en attributen exact over, href-waarden inbegrepen. Vertaal
   alleen de tekst ertussen.
7. Neem getallen, bedragen (bijvoorbeeld EUR 1.139), datums en e-mailadressen
   exact over.
8. Geen uitleg, geen alternatieven, geen toelichting. Alleen de vertaling.

Antwoord met JSON, niets erbuiten:
[{{"id": "<id uit de invoer>", "{code}": "<vertaling>"}}]
Even veel objecten als de invoer, dezelfde id's, dezelfde volgorde.

Invoer:
{invoer}"""

# Prompt A voor TI, letterlijk zoals in het plan (de eerste regel loopt daar door naar "(ti, Ge'ez-schrift).")
PROMPT_A_TI = """Je vertaalt tekst van een Nederlandse publieke-informatiewebsite naar Tigrinya
(ti, Ge'ez-schrift). De lezers zijn statushouders en nieuwkomers in Nederland;
velen hebben weinig opleiding.

Regels:
1. Vertaal naar Tigrinya, niet naar Amhaars. Gebruik Tigrinya-woordvormen en
   -grammatica.
2. Niveau A2: korte zinnen, gewone woorden, een gedachte per zin.
3. Volwassen toon. Niet kinderlijk, niet troostend, niet neerbuigend.
4. Laat deze Nederlandse systeemtermen ONVERTAALD in Latijns schrift staan:
   huisarts, BSN, DigiD, gemeente, bijstand, klantmanager, toeslag, inburgering,
   IND, Belastingdienst, UWV, SVB, VluchtelingenWerk, Juridisch Loket.
5. Neem placeholders exact over: {n}, {x}, {bedrag} en alles tussen accolades.
6. Neem HTML-tags en attributen exact over, href-waarden inbegrepen. Vertaal
   alleen de tekst ertussen.
7. Neem getallen, bedragen (bijvoorbeeld EUR 1.139), datums en e-mailadressen
   exact over.
8. Geen uitleg, geen alternatieven, geen toelichting. Alleen de vertaling.

Antwoord met JSON, niets erbuiten:
[{"id": "<id uit de invoer>", "ti": "<vertaling>"}]
Even veel objecten als de invoer, dezelfde id's, dezelfde volgorde.

Invoer:
"""

PROMPT_B_TI = """Je beoordeelt twee Tigrinya-vertalingen van dezelfde Nederlandse zin. Ze komen
van twee verschillende vertalers. Je weet niet wie welke maakte en dat doet niet
ter zake.

De lezer spreekt Tigrinya als moedertaal, is statushouder of nieuwkomer in
Nederland en heeft vaak weinig opleiding. De tekst staat op een gratis
hulpwebsite over Nederlandse regels, brieven en formulieren.

Beoordeel per paar, in deze volgorde van gewicht:
1. Juistheid — zegt de vertaling hetzelfde als het Nederlands? Ontbreekt of
   verschuift er iets?
2. Taal — is het Tigrinya en niet Amhaars, en is het grammaticaal?
3. Begrijpelijkheid voor een lezer met weinig opleiding.
4. Toon — volwassen en zakelijk, niet neerbuigend.

Antwoord met JSON, niets erbuiten:
[{"id":"...","keuze":"A"|"B"|"gelijkwaardig",
  "ernst":"cosmetisch"|"verwarrend"|"fout",
  "reden":"<een regel, in het Nederlands>"}]

"ernst" beschrijft wat er mis is met de versie die je NIET koos. Bij
"gelijkwaardig" is ernst altijd "cosmetisch". Kies "gelijkwaardig" als het
verschil een lezer niet raakt; dat is een geldig antwoord en geen gebrek.

Paren:
"""

# Terugvertaling (fase 2b en nieuwe tekst): controle, geen kwaliteitsoordeel.
PROMPT_TERUG = """Vertaal de volgende teksten uit het {taalnaam} letterlijk terug naar het Nederlands.
Vertaal precies wat er staat: voeg niets toe, verbeter niets, laat niets weg. Laat
placeholders tussen accolades, HTML-tags, getallen en Nederlandse systeemtermen staan zoals ze zijn.

Antwoord met JSON, niets erbuiten:
[{{"id": "<id uit de invoer>", "nl": "<terugvertaling>"}}]
Even veel objecten als de invoer, dezelfde id's, dezelfde volgorde.

Invoer:
{invoer}"""

# Inhoudelijke vergelijking origineel ↔ terugvertaling (fase 2b): wijkt de betekenis af?
PROMPT_VERGELIJK = """Hieronder staan paren Nederlandse zinnen: het origineel en een terugvertaling
(origineel → {taalnaam} → Nederlands). Woordkeus en zinsbouw mogen verschillen. Beoordeel alleen
of de BETEKENIS hetzelfde is gebleven: ontbreekt er informatie, is er iets bijgekomen, of is een
feit, getal, voorwaarde of ontkenning veranderd?

Antwoord met JSON, niets erbuiten:
[{{"id":"...","oordeel":"gelijk"|"afwijkend","reden":"<een regel, in het Nederlands; leeg bij gelijk>"}}]

Paren:
{invoer}"""


def prompt_a(code, invoer_json):
    if code == "ti":
        return PROMPT_A_TI + invoer_json
    return PROMPT_A.format(
        taalnaam=TAALNAAM[code],
        taalregel=TAALREGEL.get(code, f"1. Vertaal naar {TAALNAAM[code].split(' (')[0]}."),
        code=code,
        invoer=invoer_json,
    )
