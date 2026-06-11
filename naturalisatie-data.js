// naturalisatie-data.js — vragen + resultaten per taal
// Meertalig. NL + vertalingen bijgewerkt naar juni 2026 (tweestatusstelsel,
// leges 2026, EU-langdurig ingezetene). Zie _NAT_CONFIG voor de actuele leges.

window._NAT_CONFIG = {
  "jaar": 2026,
  "leges": {
    "enkel": "€1.139",
    "metPartner": "€1.454",
    "verlaagdAsiel": "€847",
    "verlaagdAsielPartner": "€1.163",
    "kind": "€168"
  }
};

window._NAT = {
  "NL": {
    "header": {
      "badge": "🇳🇱 Naturalisatie Checker",
      "titel": "Kom ik in aanmerking voor een Nederlands paspoort?",
      "sub": "Beantwoord een paar vragen en zie direct of je naturalisatie kunt aanvragen — op basis van de IND-voorwaarden van 2026, inclusief de nieuwe asielregels."
    },
    "vragen": {
      "v1": {
        "stap": "Stap 1 van 9",
        "tekst": "Ben je 18 jaar of ouder?",
        "uitleg": "Naturalisatie kan alleen worden aangevraagd door meerderjarigen. Voor minderjarige kinderen gelden aparte regels via de ouders.",
        "antwoorden": [
          {
            "tekst": "Ja, ik ben 18 jaar of ouder",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Nee, ik ben jonger dan 18",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "Stap 2 van 9",
        "tekst": "Wat is je huidige verblijfsstatus in Nederland?",
        "uitleg": "De manier waarop je in Nederland verblijft, bepaalt welke route van toepassing is. EU-burgers verblijven op basis van EU-recht — niet via een Nederlandse verblijfsvergunning.",
        "antwoorden": [
          {
            "tekst": "Ik heb een Nederlandse verblijfsvergunning",
            "sub": "Of een asielstatus (IND type III, IV of V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Ik ben EU-burger (bijv. Roemeens of Pools paspoort)",
            "sub": "Of burger van EER/Zwitserland",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Ik weet het niet zeker",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "Stap 3 van 9",
        "tekst": "Heb je een geldige verblijfsvergunning?",
        "uitleg": "Je hebt een geldige verblijfsvergunning nodig. Een asielstatus (verblijfsvergunning asiel bepaalde of onbepaalde duur) telt ook mee.<br><br>📌 <strong>Sinds 12 juni 2026 (tweestatusstelsel):</strong> nieuwe asielvergunningen gelden nog maximaal 3 jaar in plaats van 5, en de asielvergunning voor onbepaalde tijd wordt niet meer afgegeven. <em>Overgangsrecht:</em> had je op 12 juni 2026 al een asielvergunning (5 jaar of onbepaalde tijd)? Dan behoud je die rechten zolang het document geldig is. Voor naturalisatie blijft het belangrijkste dat je verblijf <strong>ononderbroken</strong> is — verleng je 3-jarige vergunning dus altijd op tijd.",
        "antwoorden": [
          {
            "tekst": "Ja, ik heb een geldige verblijfsvergunning",
            "sub": "Of een asielstatus (IND type III, IV of V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "Nee, ik heb geen geldige verblijfsvergunning",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "Stap 4 van 9",
        "tekst": "Hoe lang woon je ononderbroken in Nederland?",
        "uitleg": "Je moet op dit moment minimaal 5 jaar aaneengesloten in Nederland wonen. Korte reizen naar het buitenland breken dit niet.<br><br>⚠️ <strong>Let op — mogelijke wijziging:</strong> het kabinet wil deze termijn verlengen van 5 naar 10 jaar (en voor partners van Nederlanders van 3 naar 5 jaar). Dit voorstel is nog niet aangenomen, dus juridisch geldt nu nog 5 jaar — maar houd er rekening mee dat de eis kan veranderen. Houd je verblijf hoe dan ook ononderbroken.",
        "antwoorden": [
          {
            "tekst": "Minder dan 5 jaar",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "5 jaar of langer",
            "sub": "Ononderbroken in Nederland gewoond",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "Stap 5 van 9 — Inburgering",
        "tekst": "Hoe staat het met jouw inburgering?",
        "uitleg": "Voor naturalisatie moet je aantonen dat je bent ingeburgerd. Er zijn meerdere manieren.",
        "antwoorden": [
          {
            "tekst": "Ik heb het inburgeringsexamen gehaald (B1- of onderwijsroute)",
            "sub": "DUO-diploma inburgering aanwezig",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Ik heb een Nederlandstalig mbo 2, 3 of 4 diploma — of hbo / wo diploma",
            "sub": "Dit geeft blijvende vrijstelling van de inburgeringsplicht",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Ik ben vrijgesteld of ontheven van inburgering",
            "sub": "Bijv. op medische gronden of via een DUO-ontheffing wegens aantoonbare inspanning (de gemeente bepaalt of dit voor naturalisatie geldt)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Ik heb de Z-route afgerond (eindgesprek + certificaat)",
            "sub": "Let op: dit geeft niet automatisch recht op naturalisatie — bekijk je opties",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Ik ben nog bezig met inburgering",
            "sub": "Ik heb nog geen diploma of vrijstelling",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "Stap 5 van 9 — Z-route",
        "tekst": "Je hebt de Z-route afgerond — er is nog één extra stap nodig voor naturalisatie",
        "uitleg": "De Z-route sluit af met een eindgesprek en certificaat, maar voor naturalisatie gelden aanvullende taaleisen vanuit de IND. Er zijn drie paden om toch te kunnen naturaliseren:<br><br><strong>Pad A — Alsnog examen halen op A2-niveau</strong><br>Haal alle taalexamens op A2 (lezen, luisteren, schrijven, spreken) én het KNM-examen. Let op: nu de Z-route is afgerond zijn examenpogingen niet langer kosteloos.<br><br><strong>Pad B — 600 uur taalles + minimaal 3 pogingen per onderdeel</strong><br>Minstens 600 uur taalles op A2-niveau bij een Blik op Werk instelling én 3 pogingen per onderdeel? Dan kan DUO een ontheffingsadvies geven.<br><br><strong>Pad C — 600 uur alfabetisering + DUO-toets (€150)</strong><br>Minstens 600 uur alfabetisering en blijkt A2 niet haalbaar? Dan volgt een ontheffing via DUO-toets (€150).<br><br><em>Mogelijk in de toekomst:</em> het kabinet wil de taaleis voor naturalisatie verhogen van A2 naar B1. Dit is nog niet aangenomen — op dit moment geldt nog A2.<br><br>💡 Overleg met jouw gemeente of VluchtelingenWerk welk pad het beste past.",
        "antwoorden": [
          {
            "tekst": "Ik begrijp dit — ga verder met de overige voorwaarden",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "Stap 5 van 9 — Leerroute",
        "tekst": "Welke inburgeringsroute volg je?",
        "uitleg": "De gemeente bepaalt jouw leerroute op basis van je leerbaarheid. Er zijn drie routes: B1, Onderwijsroute en Z-route.",
        "antwoorden": [
          {
            "tekst": "B1-route",
            "sub": "Taalexamen op niveau B1 + KNM-examen",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "Onderwijsroute",
            "sub": "Taalschakeltraject 1,5–2 jaar — voorbereiding op mbo/hbo/wo instroom",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "Z-route (Zelfredzaamheidsroute)",
            "sub": "Voor mensen voor wie B1 niet haalbaar is",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "Ik weet het niet / ik heb nog geen route",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "Stap 5 van 9 — Z-route",
        "tekst": "Hoe ver ben je in de Z-route?",
        "uitleg": "De Z-route sluit af met een eindgesprek bij de gemeente en een positief DUO-advies. Dit is vereist voor naturalisatie.",
        "antwoorden": [
          {
            "tekst": "Ik ben klaar met de Z-route (DUO-positief advies ontvangen)",
            "sub": "Eindgesprek met gemeente afgerond",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Ik ben nog bezig met de Z-route",
            "sub": "Nog niet klaar met de 800 uur taalles / participatie",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "Stap 6 van 9",
        "tekst": "Ben je in de afgelopen 5 jaar veroordeeld voor een misdrijf?",
        "uitleg": "Een strafrechtelijke veroordeling kan naturalisatie blokkeren. Verkeersboetes en kleine overtredingen tellen meestal niet mee.",
        "antwoorden": [
          {
            "tekst": "Nee, ik heb geen strafblad",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "Ja, ik ben veroordeeld voor een misdrijf",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "Ik weet het niet zeker",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "Stap 7 van 9",
        "tekst": "Heb je op dit moment je hoofdverblijf in Nederland?",
        "uitleg": "Je moet je hoofdverblijf in Nederland hebben. Af en toe op reis gaan is geen probleem.",
        "antwoorden": [
          {
            "tekst": "Ja, ik woon vast in Nederland",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "Nee, ik woon grotendeels in het buitenland",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "Stap 8 van 9",
        "tekst": "Ben je bereid afstand te doen van je huidige nationaliteit?",
        "uitleg": "Nederland staat in principe geen dubbele nationaliteit toe. Uitzondering: erkende vluchtelingen (statushouders) mogen beide nationaliteiten houden.",
        "antwoorden": [
          {
            "tekst": "Ja, ik doe afstand van mijn nationaliteit",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Ik ben erkend vluchteling (statushouder)",
            "sub": "Statushouders mogen dubbele nationaliteit houden",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Nee, ik wil mijn nationaliteit houden",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "Stap 9 van 9",
        "tekst": "Ben je op de hoogte van de kosten van naturalisatie?",
        "uitleg": "De aanvraag kost €1.139 voor één persoon en €1.454 met partner (tarieven 2026). Voor asielstatushouders en staatlozen geldt een verlaagd tarief van €847 (alleen) of €1.163 (met partner). De procedure duurt gemiddeld 6–12 maanden.",
        "antwoorden": [
          {
            "tekst": "Ja, ik weet dit en wil doorgaan",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "Dat is te duur — zijn er vergoedingen?",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "Je komt waarschijnlijk in aanmerking!",
        "sub": "Op basis van jouw antwoorden voldoe je aan de belangrijkste voorwaarden voor naturalisatie. De volgende stap is een officiële aanvraag bij jouw gemeente.",
        "info": "💡 Statushouders (erkende vluchtelingen) hoeven in de meeste gevallen geen afstand te doen van hun oorspronkelijke nationaliteit.",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Maak een afspraak bij jouw gemeente</strong> — afdeling burgerzaken. Zeg dat je naturalisatie wilt aanvragen."
          },
          {
            "nr": 2,
            "tekst": "<strong>Verzamel documenten:</strong> geldig paspoort, verblijfsvergunning, bewijs van inburgering, geboorteakte (zo nodig gelegaliseerd)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Betaal de leges:</strong> €1.139 (één persoon) of €1.454 (met partner) bij indiening — tarieven 2026. Ben je asielstatushouder of staatloos? Dan geldt een verlaagd tarief van €847 (alleen) of €1.163 (met partner). Vraag bij de gemeente of er een bijdrageregeling is."
          },
          {
            "nr": 4,
            "tekst": "<strong>Wacht op de beslissing</strong> van de IND. Dit duurt gemiddeld 6–12 maanden."
          },
          {
            "nr": 5,
            "tekst": "<strong>Naturalisatieceremonie:</strong> na goedkeuring ontvang je een uitnodiging voor de ceremonie bij de gemeente."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Meer informatie op ind.nl"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Als EU-burger heb je andere rechten",
        "sub": "Naturalisatie tot Nederlander is mogelijk, maar je hoeft het Nederlanderschap niet te hebben om hier te wonen en werken. Als EU-burger heb je al vergaande rechten in Nederland.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>EU-burgerrecht:</strong> Als Roemeens of Pools staatsburger heb je het recht om in Nederland te wonen, werken en studeren — zonder verblijfsvergunning. Je registreert je bij de gemeente (BRP), maar een IND-vergunning is niet nodig."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Let op dubbele nationaliteit:</strong> De hoofdregel is dat je bij naturalisatie afstand doet van je Roemeense of Poolse nationaliteit. Máár: staat jouw land afstand doen niet toe, of is het niet mogelijk, dan val je onder een wettelijke uitzondering en mag je beide nationaliteiten houden. Vraag bij de ambassade na of afstand doen in jouw geval verplicht én mogelijk is."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Wil je toch naturaliseren?</strong> De standaardvoorwaarden gelden ook voor EU-burgers: 5 jaar ononderbroken verblijf, inburgering, geen strafblad, afstand van nationaliteit."
          },
          {
            "nr": 2,
            "tekst": "<strong>Dubbele nationaliteit:</strong> Vraag bij de Roemeense of Poolse ambassade na of je afstand moet én kunt doen. Kan het niet, dan houd je via de wettelijke uitzondering je nationaliteit. De regels per land verschillen."
          },
          {
            "nr": 3,
            "tekst": "<strong>Wil je verder?</strong> Doorloop de checker opnieuw en kies bij de verblijfsstatus voor \"verblijfsvergunning\" — de overige voorwaarden gelden ook voor EU-burgers."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Naturalisatie-informatie op ind.nl"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "Naturalisatie voor kinderen gaat via de ouders",
        "sub": "Minderjarige kinderen kunnen meenaturaliseren als een ouder de Nederlandse nationaliteit aanvraagt of al heeft.",
        "alternatieven": [
          {
            "naam": "Meenaturaliseren",
            "tekst": "Als jouw ouder naturaliseert, kun jij automatisch meenaturaliseren."
          },
          {
            "naam": "Via de rechter",
            "tekst": "In sommige gevallen is aparte naturalisatie voor minderjarigen mogelijk."
          },
          {
            "naam": "Wachten op 18",
            "tekst": "Op je 18e kun je zelfstandig een aanvraag indienen."
          },
          {
            "naam": "Optie",
            "tekst": "Als je in Nederland geboren bent, kun je soms via \"optie\" Nederlander worden."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ Meer informatie op ind.nl"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "Je hebt eerst een verblijfsvergunning nodig",
        "sub": "Naturalisatie is alleen mogelijk als je legaal in Nederland verblijft. Zorg eerst voor een geldige verblijfsvergunning.",
        "alternatieven": [
          {
            "naam": "Asielaanvraag",
            "tekst": "Als je bescherming nodig hebt, kun je een asielaanvraag indienen bij de IND."
          },
          {
            "naam": "Reguliere vergunning",
            "tekst": "Voor werk, studie of gezinshereniging zijn er reguliere vergunningen."
          },
          {
            "naam": "Juridische hulp",
            "tekst": "Neem contact op met een vluchtelingenorganisatie of advocaat."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Gratis juridische ondersteuning voor asielzoekers en statushouders."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Neem contact op met VluchtelingenWerk"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Nog niet lang genoeg in Nederland",
        "sub": "Je moet nu minimaal 5 jaar aaneengesloten in Nederland wonen. Sinds de nieuwe asielregels van 2026 zijn er een paar dingen waar je tijdens het wachten op moet letten. Je kunt de wachttijd goed benutten.",
        "alternatieven": [
          {
            "naam": "Verleng je vergunning op tijd",
            "tekst": "Nieuwe asielvergunningen gelden nog maximaal 3 jaar; verleng dus op tijd. Komt er een \"verblijfsgat\" — een periode tussen twee vergunningen waarin je geen geldige vergunning hebt — dan telt die tijd niet als rechtmatig verblijf, en kan de 5-jaarstelling voor naturalisatie opnieuw gaan lopen. Vraag verlenging daarom uiterlijk binnen 4 weken na afloop aan: dan ziet de IND het niet als verblijfsgat."
          },
          {
            "naam": "Geen onbepaalde tijd meer",
            "tekst": "De asielvergunning voor onbepaalde tijd wordt niet meer afgegeven. Geen probleem voor naturalisatie: je kunt straks naturaliseren vanuit een geldige tijdelijke vergunning."
          },
          {
            "naam": "Naturalisatietermijn: mogelijk 10 jaar",
            "tekst": "Let op: dit gaat over de wachttijd vóórdat je kunt naturaliseren, niet over je verblijfsvergunning. Het kabinet wil deze naturalisatietermijn verlengen van 5 naar 10 jaar. Nog niet aangenomen, maar houd er rekening mee. Met een Nederlandse partner kan de termijn juist korter zijn — vraag dit na bij de gemeente."
          },
          {
            "naam": "Alternatief: EU-langdurig ingezetene",
            "tekst": "Nu de asiel-onbepaalde-tijd vervalt, is \"EU-langdurig ingezetene\" na 5 jaar een belangrijk alternatief: je houdt je eigen nationaliteit en krijgt sterke verblijfsrechten. <strong>Belangrijk: hiervoor geldt wél een inkomenseis</strong> — werk en een stabiel, voldoende eigen inkomen wegen hier zwaar mee. Bekijk de blauwe knop hieronder."
          },
          {
            "naam": "Inburgering afronden",
            "tekst": "Gebruik de wachttijd om je inburgeringsexamen te halen — een harde eis voor naturalisatie."
          },
          {
            "naam": "Documenten verzamelen",
            "tekst": "Vraag alvast officiële documenten op uit je land van herkomst en werk aan je Nederlands, bijvoorbeeld via een taalcursus bij een instelling met het Blik op Werk keurmerk."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Bekijk: EU-langdurig ingezetene (permanent verblijf na 5 jaar)"
        },
        "link": "https://ind.nl/nl/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/nieuwe-wetten-en-regels-asiel-en-nareis",
        "linkTekst": "→ Bekijk de nieuwe asielregels 2026 op ind.nl"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "Je kunt je naturalisatie alvast voorbereiden",
        "sub": "Je volgt de B1-route maar hebt het examen nog niet afgerond. Je kunt de naturalisatieprocedure al opstarten — het diploma moet klaar zijn vóór de IND een beslissing neemt.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>Tip:</strong> Vraag bij jouw gemeente of je de naturalisatieaanvraag alvast kunt indienen terwijl je de B1-route nog afrondt."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Ga door met de B1-route:</strong> haal het taalexamen (B1, of A2 na aantoonbare inspanning) én het KNM-examen."
          },
          {
            "nr": 2,
            "tekst": "<strong>Vraag alvast documenten op:</strong> paspoort, geboorteakte, verblijfsvergunning."
          },
          {
            "nr": 3,
            "tekst": "<strong>Informeer bij jouw gemeente</strong> of je de aanvraag al kunt indienen terwijl je nog bezig bent."
          },
          {
            "nr": 4,
            "tekst": "<strong>Na behalen diploma:</strong> stuur het bewijs door naar de gemeente/IND — dan kan de beslissing worden genomen."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Meer informatie op ind.nl"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "Je kunt je naturalisatie alvast voorbereiden",
        "sub": "Je volgt de Onderwijsroute — een intensief taalschakeltraject van 1,5 tot 2 jaar gericht op instroom in mbo, hbo of wo.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Let op:</strong> geen enkele inburgeringsroute geeft op zichzelf een \"vrijstelling\". Je voldoet aan je inburgeringsplicht zódra je de Onderwijsroute met succes afrondt — dus de vereiste taalexamens (B1: lezen, luisteren, schrijven, spreken) én het KNM-examen haalt. Daarmee voldoe je ook aan de inburgeringseis voor naturalisatie. De Onderwijsroute zelf is dus een taaltraject, geen mbo- of hbo-diploma."
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>Tip:</strong> Je kunt de naturalisatieprocedure alvast opstarten. Het inburgeringsdiploma moet klaar zijn vóór de IND een beslissing neemt."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Rond de Onderwijsroute af:</strong> haal het taalexamen (B1 op lezen, luisteren, schrijven en spreken) én het KNM-examen."
          },
          {
            "nr": 2,
            "tekst": "<strong>Vraag alvast documenten op:</strong> paspoort, geboorteakte, verblijfsvergunning."
          },
          {
            "nr": 3,
            "tekst": "<strong>Informeer bij jouw gemeente</strong> of je de aanvraag al kunt indienen terwijl je nog bezig bent."
          },
          {
            "nr": 4,
            "tekst": "<strong>Na behalen diploma:</strong> stuur het bewijs door naar de gemeente/IND."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Meer informatie op ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Naturaliseren vanuit de Z-route — belangrijk verschil",
        "sub": "Afronden van de Z-route betekent niet automatisch dat je aan het inburgeringsvereiste voor naturalisatie voldoet. Er zijn drie paden via DUO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Belangrijk:</strong> De Z-route heeft geen examenverplichting maar een inspanningsverplichting (800 uur taalles + eindgesprek). Afronden geeft dus <em>geen</em> automatisch recht op naturalisatie. Je hebt aanvullend een DUO-ontheffingsadvies of een geslaagd A2-examen nodig.<br><br><em>Mogelijk in de toekomst:</em> het kabinet wil de taaleis voor naturalisatie verhogen van A2 naar B1. Dit is nog niet aangenomen — op dit moment geldt nog A2."
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "Alsnog het inburgeringsexamen halen op A2-niveau",
            "tekst": "Haal alle taalexamens op A2-niveau (lezen, luisteren, schrijven, spreken) én het KNM-examen. Na een geslaagd examen heb je een DUO-diploma en voldoe je aan het inburgeringsvereiste voor naturalisatie."
          },
          {
            "nr": "B",
            "titel": "600 uur taalles (A2) + minimaal 3 pogingen per examenonderdeel",
            "tekst": "Minstens 600 uur taalles op A2-niveau bij een Blik op Werk instelling én minimaal 3 pogingen per onderdeel (waarvan minstens 1 A2-examen)? Dan kan DUO een ontheffingsadvies afgeven — ook zonder geslaagd examen."
          },
          {
            "nr": "C",
            "titel": "600 uur alfabetisering of taalles + DUO-toets (geen leervermogen) — €150",
            "tekst": "Minstens 600 uur alfabetisering gevolgd bij een Blik op Werk instelling en blijkt uit een DUO-toets dat A2 niet haalbaar is? Dan volgt een ontheffing. De DUO-toets kost €150."
          }
        ],
        "info": "📞 <strong>Advies:</strong> Overleg met jouw gemeente of VluchtelingenWerk welk pad het beste bij jouw situatie past.",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Hulp via VluchtelingenWerk"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "Je hebt inburgering nodig voor naturalisatie",
        "sub": "Zonder inburgeringsdiploma of vrijstelling kun je geen naturalisatie aanvragen. Begin nu — dan ben je over 1 tot 3 jaar klaar.",
        "alternatieven": [
          {
            "naam": "Vraag je leerroute op",
            "tekst": "Ga naar je gemeente om te weten welke route bij jou past (B1, Onderwijsroute of Z-route)."
          },
          {
            "naam": "Start met taalles",
            "tekst": "Volg taalles bij een instelling met het Blik op Werk keurmerk. Vraag je gemeente naar de mogelijkheden en een eventuele vergoeding."
          },
          {
            "naam": "Examen aanvragen",
            "tekst": "Als je al voldoende Nederlands spreekt, kun je direct het examen aanvragen via DUO."
          },
          {
            "naam": "Vrijstelling of ontheffing?",
            "tekst": "Vrijstelling kan als je al een Nederlandstalig diploma hebt (mbo-2 of hoger, hbo of wo). Kun je door ziekte of een beperking echt niet inburgeren? Dan kan DUO een (gedeeltelijke) ontheffing op medische gronden geven. De gemeente/IND beoordeelt of dit ook voor naturalisatie meetelt."
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ Meer over inburgering op inburgeren.nl"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "Een strafblad kan naturalisatie blokkeren",
        "sub": "Afhankelijk van het type veroordeling en hoe lang geleden, kan dit een belemmering zijn. Laat dit beoordelen door een specialist.",
        "alternatieven": [
          {
            "naam": "Juridisch advies",
            "tekst": "Vraag een juridisch adviseur of jouw situatie een bezwaar vormt voor naturalisatie."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Gratis juridische hulp voor statushouders."
          },
          {
            "naam": "Wachttijd",
            "tekst": "Na een bepaalde wachttijd (afhankelijk van het vonnis) kun je opnieuw aanvragen."
          },
          {
            "naam": "Kleine boetes",
            "tekst": "Verkeersboetes en kleine overtredingen tellen in de meeste gevallen NIET mee."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Neem contact op met VluchtelingenWerk"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Controleer of je een strafblad hebt",
        "sub": "Je kunt een Verklaring Omtrent Gedrag (VOG) aanvragen om te zien wat er geregistreerd staat.",
        "alternatieven": [
          {
            "naam": "VOG aanvragen",
            "tekst": "Vraag een Verklaring Omtrent Gedrag aan via justis.nl."
          },
          {
            "naam": "Gratis voor bijstandsgerechtigden",
            "tekst": "Als je een uitkering hebt, kan de VOG gratis zijn."
          },
          {
            "naam": "Kleine boetes tellen niet",
            "tekst": "Verkeersboetes en kleine overtredingen tellen meestal NIET mee."
          },
          {
            "naam": "Juridisch advies",
            "tekst": "Bij twijfel: raadpleeg een juridisch adviseur of VluchtelingenWerk."
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ VOG aanvragen op justis.nl"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "Je hoofdverblijf moet in Nederland zijn",
        "sub": "Als je grotendeels in het buitenland woont, voldoe je niet aan de wooneis voor naturalisatie.",
        "alternatieven": [
          {
            "naam": "Hoofdverblijf verplaatsen",
            "tekst": "Verplaats je officiële hoofdverblijf naar Nederland."
          },
          {
            "naam": "BRP-inschrijving",
            "tekst": "Zorg dat je ingeschreven staat in de BRP bij je gemeente."
          },
          {
            "naam": "Reizen is OK",
            "tekst": "Af en toe naar het buitenland reizen is geen probleem, als je Nederland als basis hebt."
          },
          {
            "naam": "Meer informatie",
            "tekst": "Vraag bij je gemeente naar de exacte eisen voor de woonplaats."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Meer informatie op ind.nl"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "Afstand doen van nationaliteit is een grote stap",
        "sub": "Nederland staat meestal geen dubbele nationaliteit toe. Er zijn wel uitzonderingen — en als je echt geen afstand wilt doen, is er een sterk alternatief. Lees dit goed door voordat je beslist.",
        "alternatieven": [
          {
            "naam": "Uitzondering statushouders",
            "tekst": "Als erkend vluchteling hoef je GEEN afstand te doen van je nationaliteit."
          },
          {
            "naam": "Uitzondering: onmogelijk",
            "tekst": "Als afstand doen onmogelijk of gevaarlijk is, kan er een uitzondering zijn."
          },
          {
            "naam": "Uitzondering: NL partner",
            "tekst": "Ben je getrouwd met een Nederlander? Dan gelden speciale regels."
          },
          {
            "naam": "Alternatief: EU-langdurig ingezetene",
            "tekst": "Wil je je nationaliteit echt houden? Dan is \"EU-langdurig ingezetene\" vaak het sterkste alternatief. Bekijk de blauwe knop hieronder."
          },
          {
            "naam": "Juridisch advies",
            "tekst": "Laat jouw situatie beoordelen — soms is er meer mogelijk dan je denkt."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Bekijk: EU-langdurig ingezetene (nationaliteit behouden)"
        },
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Alle uitzonderingen op ind.nl"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "EU-langdurig ingezetene — permanent blijven zonder je nationaliteit op te geven",
        "sub": "Een permanente verblijfsstatus na 5 jaar legaal verblijf. Je houdt je eigen nationaliteit en krijgt sterke, blijvende verblijfsrechten. Nu de asielvergunning voor onbepaalde tijd is afgeschaft, is dit vaak het belangrijkste alternatief voor naturalisatie.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Wat het is:</strong> je mag onbepaald in Nederland wonen en vrij werken, en je verhuist en werkt makkelijker in andere EU-landen. Je asieljaren tellen mee voor de 5 jaar; studiejaren tellen voor 50% mee."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Belangrijk verschil met naturalisatie:</strong> voor deze status geldt wél een <strong>inkomenseis</strong> (zelfstandig, duurzaam en voldoende inkomen). Leef je van een uitkering, dan haal je die eis vaak niet — en dan is juist naturalisatie toegankelijker, want daarvoor geldt géén inkomenseis."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Wanneer voor jou interessant?</strong> Als je je oorspronkelijke nationaliteit niet wilt of kunt opgeven — bij naturalisatie moet dat in principe wel, hier niet."
          },
          {
            "nr": 2,
            "tekst": "<strong>Of:</strong> nu de asielvergunning voor onbepaalde tijd verdwijnt, is dit de route van een tijdelijke (3-jaars) vergunning naar een blijvend verblijfsrecht."
          },
          {
            "nr": 3,
            "tekst": "<strong>Voorwaarden:</strong> 5 jaar onafgebroken legaal verblijf (asieljaren tellen mee), geslaagde inburgering (minimaal A2), een geldig paspoort én voldoende eigen, duurzaam inkomen."
          },
          {
            "nr": 4,
            "tekst": "<strong>Aanvragen:</strong> bij de IND. Vraag je een vergunning voor onbepaalde tijd aan, dan kijkt de IND automatisch of je ook EU-langdurig ingezetene kunt krijgen."
          }
        ],
        "link": "https://ind.nl/nl/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ Lees meer over EU-langdurig ingezetene op ind.nl"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Er zijn mogelijkheden om de kosten te verlagen",
        "sub": "De naturalisatiekosten zijn €1.139 voor één persoon en €1.454 met partner (tarieven 2026) — maar er zijn manieren om dit betaalbaar te maken.",
        "alternatieven": [
          {
            "naam": "Verlaagd tarief asiel/staatloos",
            "tekst": "Ben je asielstatushouder of staatloos? Dan betaal je een verlaagd tarief: €847 (alleen) of €1.163 (met partner). De gemeente past dit toe op basis van je status."
          },
          {
            "naam": "Gemeentelijk fonds",
            "tekst": "Sommige gemeenten vergoeden de kosten (deels) voor statushouders."
          },
          {
            "naam": "Bijzondere bijstand",
            "tekst": "Vraag bijzondere bijstand aan bij je gemeente voor de legeskosten."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Zij weten welke fondsen beschikbaar zijn in jouw gemeente."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Hulp bij kosten via VluchtelingenWerk"
      }
    }
  },
  "EN": {
    "header": {
      "badge": "🇳🇱 Naturalisation Checker",
      "titel": "Am I eligible for a Dutch passport?",
      "sub": "Answer a few questions and see right away whether you can apply for naturalisation — based on the IND requirements for 2026, including the new asylum rules."
    },
    "vragen": {
      "v1": {
        "stap": "Step 1 of 9",
        "tekst": "Are you 18 years of age or older?",
        "uitleg": "Naturalisation can only be applied for by adults. Separate rules apply for minor children via their parents.",
        "antwoorden": [
          {
            "tekst": "Yes, I am 18 or older",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "No, I am younger than 18",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "Step 2 of 9",
        "tekst": "What is your current residence status in the Netherlands?",
        "uitleg": "The way you reside in the Netherlands determines which route applies. EU citizens reside under EU law — not through a Dutch residence permit.",
        "antwoorden": [
          {
            "tekst": "I have a Dutch residence permit",
            "sub": "Or an asylum status (IND type III, IV or V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "I am an EU citizen (e.g. Romanian or Polish passport)",
            "sub": "Or a citizen of the EEA/Switzerland",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "I am not sure",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "Step 3 of 9",
        "tekst": "Do you have a valid residence permit?",
        "uitleg": "You need a valid residence permit. An asylum status (temporary or permanent asylum residence permit) also counts.<br><br>📌 <strong>Since 12 June 2026 (two-status system):</strong> new asylum permits are now valid for a maximum of 3 years instead of 5, and the permanent (indefinite) asylum permit is no longer issued. <em>Transitional rule:</em> did you already hold an asylum permit (5-year or indefinite) on 12 June 2026? Then you keep those rights for as long as the document is valid. For naturalisation the most important thing is that your residence is <strong>uninterrupted</strong> — so always renew your 3-year permit on time.",
        "antwoorden": [
          {
            "tekst": "Yes, I have a valid residence permit",
            "sub": "Or an asylum status (IND type III, IV or V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "No, I do not have a valid residence permit",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "Step 4 of 9",
        "tekst": "How long have you lived continuously in the Netherlands?",
        "uitleg": "Right now you must have lived in the Netherlands for at least 5 consecutive years. Short trips abroad do not break this.<br><br>⚠️ <strong>Note — possible change:</strong> the government wants to extend this term from 5 to 10 years (and for partners of Dutch nationals from 3 to 5 years). This proposal has not yet been adopted, so legally 5 years still applies — but bear in mind the requirement may change. Keep your residence uninterrupted in any case.",
        "antwoorden": [
          {
            "tekst": "Less than 5 years",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "5 years or longer",
            "sub": "Continuous residence in the Netherlands",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "Step 5 of 9 — Civic integration",
        "tekst": "What is the status of your civic integration (inburgering)?",
        "uitleg": "For naturalisation you must prove that you have integrated. There are several ways to do this.",
        "antwoorden": [
          {
            "tekst": "I have passed the civic integration exam (B1 or education route)",
            "sub": "DUO integration diploma obtained",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "I have a Dutch-language MBO 2, 3 or 4 diploma — or an HBO / WO degree",
            "sub": "This gives a permanent exemption from the integration obligation",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "I am exempt or released from integration",
            "sub": "E.g. on medical grounds or via a DUO dispensation (ontheffing) for demonstrable effort (your municipality decides whether this counts for naturalisation)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "I have completed the Z-route (final interview + certificate)",
            "sub": "Note: this does not automatically entitle you to naturalisation — check your options",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "I am still working on civic integration",
            "sub": "I do not yet have a diploma or exemption",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "Step 5 of 9 — Z-route",
        "tekst": "You have completed the Z-route — one extra step is needed for naturalisation",
        "uitleg": "The Z-route ends with a final interview and a certificate, but for naturalisation the IND applies additional language requirements. There are three paths to still be able to naturalise:<br><br><strong>Path A — Still pass the exam at A2 level</strong><br>Pass all language exams at A2 (reading, listening, writing, speaking) and the KNM exam. Note: now that the Z-route is finished, exam attempts are no longer free.<br><br><strong>Path B — 600 hours of language lessons + at least 3 attempts per component</strong><br>At least 600 hours of A2-level lessons at a Blik op Werk certified provider and 3 attempts per component? Then DUO can issue a dispensation recommendation.<br><br><strong>Path C — 600 hours of literacy + DUO test (€150)</strong><br>At least 600 hours of literacy training and it turns out A2 is not achievable? Then a dispensation follows via a DUO test (€150).<br><br><em>Possible in the future:</em> the government wants to raise the language requirement for naturalisation from A2 to B1. This has not yet been adopted — at the moment A2 still applies.<br><br>💡 Discuss with your municipality or VluchtelingenWerk which path suits you best.",
        "antwoorden": [
          {
            "tekst": "I understand — continue to the remaining requirements",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "Step 5 of 9 — Learning route",
        "tekst": "Which integration route are you following?",
        "uitleg": "The municipality determines your learning route based on your learning ability. There are three routes: B1, Education route and Z-route.",
        "antwoorden": [
          {
            "tekst": "B1 route",
            "sub": "Language exam at B1 level + KNM exam",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "Education route",
            "sub": "Language transition programme 1.5–2 years — preparation for MBO/HBO/WO",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "Z-route (Self-sufficiency route)",
            "sub": "For people for whom B1 is not achievable",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "I do not know / I do not have a route yet",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "Step 5 of 9 — Z-route",
        "tekst": "How far along are you in the Z-route?",
        "uitleg": "The Z-route ends with a final interview at the municipality and a positive DUO recommendation. Both are required for naturalisation.",
        "antwoorden": [
          {
            "tekst": "I have completed the Z-route (received positive DUO recommendation)",
            "sub": "Final interview with municipality completed",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "I am still working on the Z-route",
            "sub": "Have not yet completed the 800 hours of language lessons / participation",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "Step 6 of 9",
        "tekst": "Have you been convicted of a criminal offence in the past 5 years?",
        "uitleg": "A criminal conviction can block naturalisation. Traffic fines and minor offences generally do not count.",
        "antwoorden": [
          {
            "tekst": "No, I have no criminal record",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "Yes, I have been convicted of a criminal offence",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "I am not sure",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "Step 7 of 9",
        "tekst": "Is your main place of residence currently in the Netherlands?",
        "uitleg": "You must have your main residence in the Netherlands. Occasional travel abroad is not a problem.",
        "antwoorden": [
          {
            "tekst": "Yes, I live permanently in the Netherlands",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "No, I mainly live abroad",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "Step 8 of 9",
        "tekst": "Are you willing to renounce your current nationality?",
        "uitleg": "The Netherlands generally does not allow dual nationality. Exception: recognised refugees (status holders) may keep both nationalities.",
        "antwoorden": [
          {
            "tekst": "Yes, I will renounce my nationality",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "I am a recognised refugee (status holder)",
            "sub": "Status holders may keep dual nationality",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "No, I want to keep my nationality",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "Step 9 of 9",
        "tekst": "Are you aware of the costs of naturalisation?",
        "uitleg": "The application costs €1,139 for one person and €1,454 with a partner (2026 rates). For asylum status holders and stateless persons a reduced rate applies: €847 (single) or €1,163 (with partner). The procedure takes 6–12 months on average.",
        "antwoorden": [
          {
            "tekst": "Yes, I am aware and want to proceed",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "That is too expensive — are there subsidies?",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "You are likely eligible!",
        "sub": "Based on your answers you meet the main requirements for naturalisation. The next step is an official application at your municipality.",
        "info": "💡 Status holders (recognised refugees) generally do not have to renounce their original nationality.",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Make an appointment at your municipality</strong> — civil affairs department. Say that you want to apply for naturalisation."
          },
          {
            "nr": 2,
            "tekst": "<strong>Gather documents:</strong> valid passport, residence permit, proof of integration, birth certificate (legalised if necessary)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Pay the fee:</strong> €1,139 (single) or €1,454 (with partner) on submission — 2026 rates. Are you an asylum status holder or stateless? Then a reduced rate applies: €847 (single) or €1,163 (with partner). Ask your municipality whether a contribution scheme is available."
          },
          {
            "nr": 4,
            "tekst": "<strong>Wait for the decision</strong> from the IND. This takes an average of 6–12 months."
          },
          {
            "nr": 5,
            "tekst": "<strong>Naturalisation ceremony:</strong> after approval you will receive an invitation to the ceremony at your municipality."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ More information at ind.nl"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "As an EU citizen you have different rights",
        "sub": "Naturalisation as a Dutch citizen is possible, but you do not need Dutch citizenship to live and work here. As an EU citizen you already have extensive rights in the Netherlands.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>EU citizenship rights:</strong> As a Romanian or Polish citizen you have the right to live, work and study in the Netherlands — without a residence permit. You register with the municipality (BRP), but an IND permit is not required."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Note on dual nationality:</strong> The main rule is that you renounce your Romanian or Polish nationality when you naturalise. However: if your country does not allow renunciation, or it is not possible, you fall under a legal exception and may keep both nationalities. Ask your embassy whether renouncing is required and possible in your case."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Still want to naturalise?</strong> Standard requirements also apply to EU citizens: 5 years' continuous residence, integration, no criminal record, renunciation of nationality."
          },
          {
            "nr": 2,
            "tekst": "<strong>Dual nationality:</strong> Ask the Romanian or Polish embassy whether you must and can renounce. If you cannot, you keep your nationality via the legal exception. Rules differ per country."
          },
          {
            "nr": 3,
            "tekst": "<strong>Want to continue?</strong> Go through the checker again and choose \"residence permit\" for the residence status question — the other requirements also apply to EU citizens."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Naturalisation information at ind.nl"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "Naturalisation for children goes through the parents",
        "sub": "Minor children can naturalise together with a parent who applies for or already has Dutch nationality.",
        "alternatieven": [
          {
            "naam": "Naturalise together",
            "tekst": "If your parent naturalises, you can automatically naturalise with them."
          },
          {
            "naam": "Via the court",
            "tekst": "In some cases separate naturalisation for minors is possible."
          },
          {
            "naam": "Wait until 18",
            "tekst": "At 18 you can apply independently."
          },
          {
            "naam": "Option procedure",
            "tekst": "If you were born in the Netherlands, you can sometimes become Dutch via the \"option\" procedure."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ More information at ind.nl"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "You first need a residence permit",
        "sub": "Naturalisation is only possible if you reside legally in the Netherlands. First obtain a valid residence permit.",
        "alternatieven": [
          {
            "naam": "Asylum application",
            "tekst": "If you need protection, you can submit an asylum application to the IND."
          },
          {
            "naam": "Regular permit",
            "tekst": "For work, study or family reunification, regular permits are available."
          },
          {
            "naam": "Legal help",
            "tekst": "Contact a refugee organisation or lawyer."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Free legal support for asylum seekers and status holders."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Contact VluchtelingenWerk"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Not long enough in the Netherlands yet",
        "sub": "Right now you must have lived in the Netherlands for at least 5 consecutive years with valid residence. Since the new 2026 asylum rules there are a few things to watch during the wait. You can put the waiting time to good use.",
        "alternatieven": [
          {
            "naam": "Renew your permit on time",
            "tekst": "New asylum permits are valid for a maximum of 3 years; so renew on time. If a \"residence gap\" (verblijfsgat) arises — a period between two permits in which you have no valid permit — that time does not count as lawful residence, and the 5-year count for naturalisation may restart. So apply for renewal within 4 weeks of expiry at the latest: then the IND does not treat it as a residence gap."
          },
          {
            "naam": "No more indefinite permit",
            "tekst": "The permanent (indefinite) asylum permit is no longer issued. No problem for naturalisation: you can naturalise from a valid temporary permit."
          },
          {
            "naam": "Naturalisation term: possibly 10 years",
            "tekst": "Note: this is about the waiting time before you can naturalise, not about your residence permit. The government wants to extend this naturalisation term from 5 to 10 years. Not yet adopted, but bear it in mind. With a Dutch partner the term may actually be shorter — ask your municipality."
          },
          {
            "naam": "Alternative: EU long-term resident",
            "tekst": "Now that the indefinite asylum permit is being phased out, \"EU long-term resident\" after 5 years is an important alternative: you keep your own nationality and gain strong residence rights. <strong>Important: this does have an income requirement</strong> — work and a stable, sufficient income of your own weigh heavily here. See the blue button below."
          },
          {
            "naam": "Complete civic integration",
            "tekst": "Use the waiting time to pass your civic integration exam — a hard requirement for naturalisation."
          },
          {
            "naam": "Collect documents",
            "tekst": "Request official documents from your country of origin in advance and work on your Dutch, for example via a language course at a Blik op Werk certified provider."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 View: EU long-term resident (permanent residence after 5 years)"
        },
        "link": "https://ind.nl/en/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/new-laws-and-regulations-on-asylum-and-family-reunification",
        "linkTekst": "→ See the new 2026 asylum rules on ind.nl"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "You can already start preparing your naturalisation",
        "sub": "You are following the B1 route but have not yet completed the exam. You can start the naturalisation procedure already — the diploma must be ready before the IND makes a decision.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>Tip:</strong> Ask your municipality whether you can already submit the naturalisation application while you are still completing the B1 route."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Continue with the B1 route:</strong> pass the language exam (B1, or A2 with demonstrable effort) and the KNM exam."
          },
          {
            "nr": 2,
            "tekst": "<strong>Request documents in advance:</strong> passport, birth certificate, residence permit."
          },
          {
            "nr": 3,
            "tekst": "<strong>Ask your municipality</strong> whether you can already submit the application while still completing the route."
          },
          {
            "nr": 4,
            "tekst": "<strong>After obtaining the diploma:</strong> send the proof to the municipality/IND — then the decision can be made."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ More information at ind.nl"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "You can already start preparing your naturalisation",
        "sub": "You are following the Education route — an intensive language transition programme of 1.5 to 2 years aimed at entry into MBO, HBO or WO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Note:</strong> no civic integration route gives an \"exemption\" in itself. You meet your integration obligation as soon as you successfully complete the Education route — that is, pass the required language exams (B1: reading, listening, writing, speaking) and the KNM exam. That also meets the integration requirement for naturalisation. The Education route itself is therefore a language programme, not an MBO or HBO diploma."
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>Tip:</strong> You can start the naturalisation procedure already. The integration diploma must be ready before the IND makes a decision."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Complete the Education route:</strong> pass the language exam (B1 in reading, listening, writing and speaking) and the KNM exam."
          },
          {
            "nr": 2,
            "tekst": "<strong>Request documents in advance:</strong> passport, birth certificate, residence permit."
          },
          {
            "nr": 3,
            "tekst": "<strong>Ask your municipality</strong> whether you can already submit the application while still completing the route."
          },
          {
            "nr": 4,
            "tekst": "<strong>After obtaining the diploma:</strong> send the proof to the municipality/IND."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ More information at ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Naturalising via the Z-route — an important difference",
        "sub": "Completing the Z-route does not automatically mean you meet the integration requirement for naturalisation. There are three paths via DUO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Important:</strong> the Z-route has no exam obligation but an effort obligation (800 hours of language lessons + final interview). Completing it therefore does <em>not</em> automatically give a right to naturalisation. You additionally need a DUO dispensation recommendation or a passed A2 exam.<br><br><em>Possible in the future:</em> the government wants to raise the language requirement for naturalisation from A2 to B1. This has not yet been adopted — at the moment A2 still applies."
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "Still pass the integration exam at A2 level",
            "tekst": "Pass all language exams at A2 level (reading, listening, writing, speaking) plus the KNM exam. After passing you have a DUO diploma and meet the integration requirement for naturalisation."
          },
          {
            "nr": "B",
            "titel": "600 hours of language lessons (A2) + at least 3 attempts per exam component",
            "tekst": "At least 600 hours of A2-level language lessons at a Blik op Werk certified institution and at least 3 attempts per component (including at least 1 A2 exam)? DUO can issue an exemption recommendation — even without a passed exam."
          },
          {
            "nr": "C",
            "titel": "600 hours of literacy/language lessons + DUO test (no learning capacity) — €150",
            "tekst": "At least 600 hours of literacy training at a Blik op Werk certified institution and a DUO test showing A2 is not achievable? An exemption follows. The DUO test costs €150."
          }
        ],
        "info": "📞 <strong>Advice:</strong> Consult your municipality or VluchtelingenWerk about which path best suits your situation.",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Help via VluchtelingenWerk"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "You need civic integration for naturalisation",
        "sub": "Without an integration diploma or exemption you cannot apply for naturalisation. Start now — in 1 to 3 years you will be ready.",
        "alternatieven": [
          {
            "naam": "Request your learning route",
            "tekst": "Go to your municipality to find out which route suits you (B1, Education route or Z-route)."
          },
          {
            "naam": "Start language lessons",
            "tekst": "Take language lessons at a Blik op Werk certified provider. Ask your municipality about the options and any reimbursement."
          },
          {
            "naam": "Apply for the exam",
            "tekst": "If you already speak enough Dutch, you can apply for the exam directly via DUO."
          },
          {
            "naam": "Exemption or dispensation?",
            "tekst": "An exemption (vrijstelling) is possible if you already hold a Dutch-language diploma (MBO-2 or higher, HBO or WO). If illness or a disability genuinely prevents you from integrating, DUO can grant a (partial) dispensation (ontheffing) on medical grounds. The municipality/IND decides whether this also counts for naturalisation."
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ More about integration at inburgeren.nl"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "A criminal record can block naturalisation",
        "sub": "Depending on the type of conviction and how long ago, this may be an obstacle. Have a specialist assess your situation.",
        "alternatieven": [
          {
            "naam": "Legal advice",
            "tekst": "Ask a legal adviser whether your situation forms an obstacle to naturalisation."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Free legal help for status holders."
          },
          {
            "naam": "Waiting period",
            "tekst": "After a certain waiting period (depending on the conviction) you can reapply."
          },
          {
            "naam": "Minor fines",
            "tekst": "Traffic fines and minor offences generally do NOT count."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Contact VluchtelingenWerk"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Check whether you have a criminal record",
        "sub": "You can request a Certificate of Conduct (VOG) to see what is registered.",
        "alternatieven": [
          {
            "naam": "Request a VOG",
            "tekst": "Request a Certificate of Conduct (VOG) via justis.nl."
          },
          {
            "naam": "Free for benefit recipients",
            "tekst": "If you receive a benefit, the VOG may be free."
          },
          {
            "naam": "Minor fines do not count",
            "tekst": "Traffic fines and minor offences generally do NOT count."
          },
          {
            "naam": "Legal advice",
            "tekst": "If in doubt: consult a legal adviser or VluchtelingenWerk."
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ Request a VOG at justis.nl"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "Your main residence must be in the Netherlands",
        "sub": "If you mainly live abroad, you do not meet the residence requirement for naturalisation.",
        "alternatieven": [
          {
            "naam": "Move your main residence",
            "tekst": "Move your official main residence to the Netherlands."
          },
          {
            "naam": "BRP registration",
            "tekst": "Make sure you are registered in the BRP at your municipality."
          },
          {
            "naam": "Travel is OK",
            "tekst": "Occasional travel abroad is not a problem, as long as the Netherlands is your base."
          },
          {
            "naam": "More information",
            "tekst": "Ask your municipality about the exact residence requirements."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ More information at ind.nl"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "Renouncing nationality is a major step",
        "sub": "The Netherlands usually does not allow dual nationality. There are exceptions — and if you really do not want to give up your nationality, there is a strong alternative. Read this carefully before you decide.",
        "alternatieven": [
          {
            "naam": "Exception for status holders",
            "tekst": "As a recognised refugee you do NOT have to renounce your nationality."
          },
          {
            "naam": "Exception: impossible",
            "tekst": "If renouncing is impossible or dangerous, there may be an exception."
          },
          {
            "naam": "Exception: Dutch partner",
            "tekst": "Are you married to a Dutch national? Then special rules apply."
          },
          {
            "naam": "Alternative: EU long-term resident",
            "tekst": "Do you really want to keep your nationality? Then \"EU long-term resident\" is often the strongest alternative. See the blue button below."
          },
          {
            "naam": "Legal advice",
            "tekst": "Have your situation assessed — sometimes more is possible than you think."
          }
        ],
        "link": "https://ind.nl/en/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ Read more about EU long-term resident on ind.nl",
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 View: EU long-term resident (keep your nationality)"
        }
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "There are ways to reduce the costs",
        "sub": "Naturalisation costs €1,139 (single) or €1,454 (with partner) — 2026 rates; reduced rate €847/€1,163 for asylum status holders/stateless persons. There are ways to make it affordable.",
        "alternatieven": [
          {
            "naam": "Reduced rate asylum/stateless",
            "tekst": "Are you an asylum status holder or stateless? Then you pay a reduced rate: €847 (single) or €1,163 (with partner). The municipality applies this based on your status."
          },
          {
            "naam": "Municipal fund",
            "tekst": "Some municipalities (partly) reimburse the costs for status holders."
          },
          {
            "naam": "Special assistance",
            "tekst": "Apply for special assistance (bijzondere bijstand) at your municipality for the fee."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "They know which funds are available in your municipality."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Help with costs via VluchtelingenWerk"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "EU long-term resident — stay permanently without giving up your nationality",
        "sub": "A permanent residence status after 5 years of lawful residence. You keep your own nationality and gain strong, lasting residence rights. Now that the indefinite asylum permit is being abolished, this is often the most important alternative to naturalisation.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>What it is:</strong> you may live in the Netherlands indefinitely and work freely, and you can move and work more easily in other EU countries. Your asylum years count towards the 5 years; study years count for 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Important difference from naturalisation:</strong> this status does have an <strong>income requirement</strong> (independent, sustainable and sufficient income). If you live on benefits you often will not meet it — and then naturalisation is actually more accessible, because it has no income requirement."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>When is it interesting for you?</strong> If you do not want to or cannot give up your original nationality — for naturalisation you in principle must, here you do not."
          },
          {
            "nr": 2,
            "tekst": "<strong>Or:</strong> now that the indefinite asylum permit is disappearing, this is the route from a temporary (3-year) permit to a lasting residence right."
          },
          {
            "nr": 3,
            "tekst": "<strong>Requirements:</strong> 5 years of uninterrupted lawful residence (asylum years count), passed civic integration (at least A2), a valid passport and sufficient independent, sustainable income."
          },
          {
            "nr": 4,
            "tekst": "<strong>Applying:</strong> at the IND. If you apply for an indefinite permit, the IND automatically checks whether you can also get EU long-term resident status."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Read more about EU long-term resident on ind.nl"
      }
    }
  },
  "AR": {
    "header": {
      "badge": "🇳🇱 فاحص التجنيس",
      "titel": "هل أنا مؤهل للحصول على جواز سفر هولندي؟",
      "sub": "أجب عن بعض الأسئلة واعرف فوراً ما إذا كان بإمكانك تقديم طلب التجنيس — بناءً على شروط دائرة الهجرة (IND) لعام 2026، بما في ذلك قواعد اللجوء الجديدة."
    },
    "vragen": {
      "v1": {
        "stap": "الخطوة 1 من 9",
        "tekst": "هل عمرك 18 سنة أو أكثر؟",
        "uitleg": "لا يمكن تقديم طلب التجنيس إلا للبالغين. تنطبق على الأطفال القاصرين قواعد خاصة عبر الوالدين.",
        "antwoorden": [
          {
            "tekst": "نعم، عمري 18 سنة أو أكثر",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "لا، عمري أقل من 18 سنة",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "الخطوة 2 من 9",
        "tekst": "ما هي وضعية إقامتك الحالية في هولندا؟",
        "uitleg": "طريقة إقامتك في هولندا تحدد المسار المناسب لك. المواطنون الأوروبيون يقيمون بموجب قانون الاتحاد الأوروبي — لا بموجب تصريح إقامة هولندي.",
        "antwoorden": [
          {
            "tekst": "لديّ تصريح إقامة هولندي",
            "sub": "أو وضع لجوء (IND نوع III أو IV أو V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "أنا مواطن في الاتحاد الأوروبي (مثلاً جواز سفر روماني أو بولندي)",
            "sub": "أو مواطن في المنطقة الاقتصادية الأوروبية / سويسرا",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "لست متأكداً",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "الخطوة 3 من 9",
        "tekst": "هل لديك تصريح إقامة سارٍ؟",
        "uitleg": "تحتاج إلى تصريح إقامة ساري المفعول. يُحتسب أيضاً وضع اللجوء (تصريح إقامة لجوء محدّد أو غير محدّد المدة).<br><br>📌 <strong>اعتباراً من 12 يونيو 2026 (نظام الوضعين):</strong> أصبحت تصاريح اللجوء الجديدة سارية لمدة 3 سنوات كحدّ أقصى بدلاً من 5، ولم يعد يُمنح تصريح اللجوء غير المحدّد المدة. <em>قاعدة انتقالية:</em> هل كان لديك بالفعل في 12 يونيو 2026 تصريح لجوء (لمدة 5 سنوات أو غير محدّد المدة)؟ إذاً تحتفظ بتلك الحقوق ما دامت الوثيقة سارية. بالنسبة للتجنيس، الأهم أن تكون إقامتك <strong>متواصلة</strong> — لذا جدّد دائماً تصريحك ذا الثلاث سنوات في الوقت المناسب.",
        "antwoorden": [
          {
            "tekst": "نعم، لديّ تصريح إقامة سارٍ",
            "sub": "أو وضع لجوء (IND نوع III أو IV أو V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "لا، ليس لديّ تصريح إقامة سارٍ",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "الخطوة 4 من 9",
        "tekst": "منذ متى تقيم باستمرار في هولندا؟",
        "uitleg": "يجب حالياً أن تكون قد أقمت في هولندا 5 سنوات متتالية على الأقل. الرحلات القصيرة إلى الخارج لا تقطع ذلك.<br><br>⚠️ <strong>انتبه — تغيير محتمل:</strong> تريد الحكومة تمديد هذه المدة من 5 إلى 10 سنوات (ولأزواج المواطنين الهولنديين من 3 إلى 5 سنوات). لم يُعتمد هذا المقترح بعد، لذا تنطبق قانونياً 5 سنوات حتى الآن — لكن ضع في اعتبارك أن الشرط قد يتغير. حافظ على إقامتك متواصلة في كل الأحوال.",
        "antwoorden": [
          {
            "tekst": "أقل من 5 سنوات",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "5 سنوات أو أكثر",
            "sub": "إقامة متواصلة في هولندا",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "الخطوة 5 من 9 — الاندماج",
        "tekst": "ما هو وضع اندماجك (inburgering)؟",
        "uitleg": "للتجنيس يجب إثبات اندماجك. هناك عدة طرق لذلك.",
        "antwoorden": [
          {
            "tekst": "اجتزت امتحان الاندماج (مسار B1 أو مسار التعليم)",
            "sub": "حاصل على دبلوم اندماج من DUO",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "لديّ دبلوم MBO مستوى 2 أو 3 أو 4 باللغة الهولندية — أو شهادة HBO / WO",
            "sub": "هذا يمنح إعفاءً دائماً من التزام الاندماج",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "أنا معفى من الاندماج",
            "sub": "مثلاً لأسباب طبية أو عبر إعفاء من دائرة DUO (ontheffing) بسبب جهد مُثبَت (تقرّر البلدية ما إذا كان ذلك يُحتسب للتجنيس)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "أتممت مسار Z (المقابلة النهائية + الشهادة)",
            "sub": "تنبيه: هذا لا يمنح حق التجنيس تلقائياً — راجع خياراتك",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "أنا لا أزال في مرحلة الاندماج",
            "sub": "لم أحصل بعد على دبلوم أو إعفاء",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "الخطوة 5 من 9 — مسار Z",
        "tekst": "أتممت مسار Z — هناك خطوة إضافية مطلوبة للتجنيس",
        "uitleg": "ينتهي مسار Z بمقابلة ختامية وشهادة، لكن للتجنيس تطبّق دائرة الهجرة شروطاً لغوية إضافية. هناك ثلاثة مسارات لتتمكّن مع ذلك من التجنيس:<br><br><strong>المسار A — اجتياز الامتحان مع ذلك بمستوى A2</strong><br>اجتز جميع الامتحانات اللغوية بمستوى A2 (قراءة، استماع، كتابة، محادثة) وامتحان KNM. انتبه: بعد إنهاء مسار Z لم تعد محاولات الامتحان مجانية.<br><br><strong>المسار B — 600 ساعة دروس لغة + 3 محاولات على الأقل لكل جزء</strong><br>600 ساعة على الأقل من دروس مستوى A2 في مؤسسة معتمدة من Blik op Werk و3 محاولات لكل جزء؟ عندئذٍ يمكن لدائرة DUO إصدار توصية بالإعفاء.<br><br><strong>المسار C — 600 ساعة محو أمية + اختبار DUO (€150)</strong><br>600 ساعة على الأقل من محو الأمية وتبيّن أن A2 غير قابل للتحقيق؟ عندئذٍ يُمنح إعفاء عبر اختبار DUO (€150).<br><br><em>محتمل في المستقبل:</em> تريد الحكومة رفع شرط اللغة للتجنيس من A2 إلى B1. لم يُعتمد هذا بعد — حالياً لا يزال A2 سارياً.<br><br>💡 ناقش مع بلديتك أو مع VluchtelingenWerk أيُّ مسار يناسبك أكثر.",
        "antwoorden": [
          {
            "tekst": "فهمت — المضي قدماً في الشروط الأخرى",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "الخطوة 5 من 9 — مسار التعلم",
        "tekst": "أي مسار اندماج تتبع؟",
        "uitleg": "البلدية تحدد مسار تعلمك بناءً على قدرتك. هناك ثلاثة مسارات: B1، مسار التعليم، ومسار Z.",
        "antwoorden": [
          {
            "tekst": "مسار B1",
            "sub": "امتحان لغوي على مستوى B1 + امتحان KNM",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "مسار التعليم",
            "sub": "برنامج لغوي انتقالي 1.5–2 سنة — تحضير لـ MBO/HBO/WO",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "مسار Z (مسار الاعتماد على النفس)",
            "sub": "للأشخاص الذين لا يستطيعون بلوغ مستوى B1",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "لا أعرف / لا يوجد لديّ مسار بعد",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "الخطوة 5 من 9 — مسار Z",
        "tekst": "أين أنت في مسار Z؟",
        "uitleg": "مسار Z يختتم بمقابلة نهائية مع البلدية وتوصية إيجابية من DUO. كلاهما مطلوب للتجنيس.",
        "antwoorden": [
          {
            "tekst": "أتممت مسار Z (تلقيت توصية إيجابية من DUO)",
            "sub": "اكتملت المقابلة النهائية مع البلدية",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "لا أزال في مسار Z",
            "sub": "لم أُنهِ بعد 800 ساعة تعليم لغوي / مشاركة",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "الخطوة 6 من 9",
        "tekst": "هل صدر بحقك حكم جنائي خلال السنوات الخمس الماضية؟",
        "uitleg": "الإدانة الجنائية قد تحول دون التجنيس. المخالفات المرورية والمخالفات البسيطة لا تُحتسب عادةً.",
        "antwoorden": [
          {
            "tekst": "لا، ليس لديّ سجل جنائي",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "نعم، صدر بحقي حكم جنائي",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "لست متأكداً",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "الخطوة 7 من 9",
        "tekst": "هل إقامتك الرئيسية حالياً في هولندا؟",
        "uitleg": "يجب أن تكون إقامتك الرئيسية في هولندا. السفر إلى الخارج أحياناً لا يمثل مشكلة.",
        "antwoorden": [
          {
            "tekst": "نعم، أقيم بشكل دائم في هولندا",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "لا، أقيم بصورة رئيسية في الخارج",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "الخطوة 8 من 9",
        "tekst": "هل أنت مستعد للتنازل عن جنسيتك الحالية؟",
        "uitleg": "لا تسمح هولندا في الغالب بازدواجية الجنسية. استثناء: اللاجئون المعترف بهم (أصحاب وضع اللاجئ) يمكنهم الاحتفاظ بكلتا الجنسيتين.",
        "antwoorden": [
          {
            "tekst": "نعم، سأتنازل عن جنسيتي",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "أنا لاجئ معترف به (صاحب وضع لجوء)",
            "sub": "أصحاب وضع اللجوء يمكنهم الاحتفاظ بازدواجية الجنسية",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "لا، أريد الاحتفاظ بجنسيتي",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "الخطوة 9 من 9",
        "tekst": "هل أنت على علم بتكاليف التجنيس؟",
        "uitleg": "تبلغ تكلفة الطلب €1.139 لشخص واحد و€1.454 مع شريك (تعرفة 2026). لحاملي وضع اللجوء وعديمي الجنسية تنطبق تعرفة مخفّضة: €847 (فردي) أو €1.163 (مع شريك). تستغرق الإجراءات في المتوسط 6–12 شهراً.",
        "antwoorden": [
          {
            "tekst": "نعم، أعلم وأريد المتابعة",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "هذا غالٍ جداً — هل هناك دعم مالي؟",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "على الأرجح أنت مؤهل!",
        "sub": "بناءً على إجاباتك تستوفي الشروط الرئيسية للتجنيس. الخطوة التالية هي تقديم طلب رسمي في بلديتك.",
        "info": "💡 أصحاب وضع اللجوء (اللاجئون المعترف بهم) في معظم الحالات لا يحتاجون للتنازل عن جنسيتهم الأصلية.",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>احجز موعداً في بلديتك</strong> — قسم الشؤون المدنية. أخبرهم أنك تريد تقديم طلب التجنيس."
          },
          {
            "nr": 2,
            "tekst": "<strong>اجمع الوثائق:</strong> جواز سفر ساري، تصريح إقامة، إثبات الاندماج، شهادة الميلاد (مصدقة إذا لزم)."
          },
          {
            "nr": 3,
            "tekst": "<strong>ادفع الرسوم:</strong> €1.139 (فردي) أو €1.454 (مع شريك) عند التقديم — تعرفة 2026. هل أنت حامل وضع لجوء أو عديم الجنسية؟ عندئذٍ تنطبق تعرفة مخفّضة: €847 (فردي) أو €1.163 (مع شريك). اسأل بلديتك عمّا إذا كان هناك ترتيب مساهمة."
          },
          {
            "nr": 4,
            "tekst": "<strong>انتظر قرار</strong> IND. يستغرق ذلك في المتوسط 6–12 شهراً."
          },
          {
            "nr": 5,
            "tekst": "<strong>حفل التجنيس:</strong> بعد الموافقة ستتلقى دعوة لحضور حفل التجنيس في البلدية."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ مزيد من المعلومات على ind.nl"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "بصفتك مواطناً في الاتحاد الأوروبي لديك حقوق مختلفة",
        "sub": "التجنيس كهولندي ممكن، لكنك لست بحاجة إلى الجنسية الهولندية للعيش والعمل هنا. بصفتك مواطناً أوروبياً لديك بالفعل حقوق واسعة في هولندا.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>حقوق المواطنة الأوروبية:</strong> بصفتك مواطناً رومانياً أو بولندياً لديك الحق في الإقامة والعمل والدراسة في هولندا — بدون تصريح إقامة. تسجل نفسك في البلدية (BRP)، لكن لا تحتاج إلى تصريح IND."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>انتبه إلى ازدواج الجنسية:</strong> القاعدة الأساسية أنك تتخلّى عن جنسيتك الرومانية أو البولندية عند التجنيس. لكن: إذا كان بلدك لا يسمح بالتخلّي أو كان ذلك غير ممكن، فإنك تندرج ضمن استثناء قانوني ويمكنك الاحتفاظ بالجنسيتين معاً. اسأل في السفارة عمّا إذا كان التخلّي إلزامياً وممكناً في حالتك."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>تريد التجنيس رغم ذلك؟</strong> الشروط الأساسية تنطبق أيضاً على مواطني الاتحاد الأوروبي: 5 سنوات إقامة متواصلة، اندماج، لا سجل جنائي، التنازل عن الجنسية."
          },
          {
            "nr": 2,
            "tekst": "<strong>ازدواج الجنسية:</strong> اسأل السفارة الرومانية أو البولندية عمّا إذا كان يجب وما إذا كان بإمكانك التخلّي. إذا لم تستطع، فإنك تحتفظ بجنسيتك عبر الاستثناء القانوني. تختلف القواعد من بلد لآخر."
          },
          {
            "nr": 3,
            "tekst": "<strong>تريد المتابعة؟</strong> أعد استخدام الأداة واختر \"تصريح إقامة\" — الشروط الأخرى تنطبق أيضاً على مواطني الاتحاد الأوروبي."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ معلومات التجنيس على ind.nl"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "تجنيس الأطفال يتم عبر الوالدين",
        "sub": "يمكن للأطفال القاصرين الانضمام إلى تجنيس أحد الوالدين الذي يتقدم بالطلب أو يملك الجنسية الهولندية بالفعل.",
        "alternatieven": [
          {
            "naam": "التجنيس المشترك",
            "tekst": "إذا تجنس والدك/والدتك، يمكنك التجنيس معهم تلقائياً."
          },
          {
            "naam": "عبر المحكمة",
            "tekst": "في بعض الحالات يمكن تجنيس القاصرين بشكل منفصل."
          },
          {
            "naam": "الانتظار حتى 18",
            "tekst": "عند بلوغك 18 يمكنك التقديم بشكل مستقل."
          },
          {
            "naam": "خيار التجنيس",
            "tekst": "إذا وُلدت في هولندا يمكنك أحياناً التجنيس عبر \"خيار\" (optie)."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ مزيد من المعلومات على ind.nl"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "تحتاج أولاً إلى تصريح إقامة",
        "sub": "التجنيس ممكن فقط إذا كنت تقيم قانونياً في هولندا. احصل أولاً على تصريح إقامة سارٍ.",
        "alternatieven": [
          {
            "naam": "طلب اللجوء",
            "tekst": "إذا كنت بحاجة إلى حماية يمكنك تقديم طلب لجوء إلى IND."
          },
          {
            "naam": "تصريح منتظم",
            "tekst": "للعمل أو الدراسة أو لم الشمل العائلي هناك تصاريح منتظمة."
          },
          {
            "naam": "مساعدة قانونية",
            "tekst": "تواصل مع منظمة لاجئين أو محامٍ."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "دعم قانوني مجاني لطالبي اللجوء وأصحاب وضع اللجوء."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ تواصل مع VluchtelingenWerk"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "لم تُقم في هولندا مدة كافية بعد",
        "sub": "يجب حالياً أن تكون قد أقمت في هولندا 5 سنوات متتالية على الأقل بإقامة سارية. منذ قواعد اللجوء الجديدة لعام 2026 هناك بضعة أمور ينبغي الانتباه إليها أثناء الانتظار. يمكنك استثمار فترة الانتظار جيداً.",
        "alternatieven": [
          {
            "naam": "جدّد تصريحك في الوقت المناسب",
            "tekst": "تصاريح اللجوء الجديدة سارية لمدة 3 سنوات كحدّ أقصى؛ لذا جدّد في الوقت المناسب. إذا نشأت \"فجوة إقامة\" (verblijfsgat) — فترة بين تصريحين لا يكون لديك فيها تصريح ساري — فلا تُحتسب تلك الفترة كإقامة قانونية، وقد يبدأ عدّ السنوات الخمس للتجنيس من جديد. لذا قدّم طلب التجديد خلال 4 أسابيع كحدّ أقصى من انتهاء الصلاحية: عندئذٍ لا تعتبرها دائرة الهجرة فجوة إقامة."
          },
          {
            "naam": "لا وجود لغير محدّد المدة بعد الآن",
            "tekst": "لم يعد يُمنح تصريح اللجوء غير المحدّد المدة. لا مشكلة في ذلك للتجنيس: يمكنك التجنيس انطلاقاً من تصريح مؤقت ساري المفعول."
          },
          {
            "naam": "مدة التجنيس: ربما 10 سنوات",
            "tekst": "انتبه: يتعلق هذا بمدة الانتظار قبل أن تتمكن من التجنيس، وليس بتصريح إقامتك. تريد الحكومة تمديد مدة التجنيس هذه من 5 إلى 10 سنوات. لم تُعتمد بعد، لكن ضعها في اعتبارك. مع شريك هولندي قد تكون المدة أقصر — اسأل البلدية."
          },
          {
            "naam": "بديل: مقيم طويل الأمد في الاتحاد الأوروبي",
            "tekst": "بما أن تصريح اللجوء غير المحدّد المدة يُلغى، فإن وضع \"مقيم طويل الأمد في الاتحاد الأوروبي\" بعد 5 سنوات بديل مهم: تحتفظ بجنسيتك وتحصل على حقوق إقامة قوية. <strong>مهم: ينطبق هنا شرط دخل</strong> — العمل والدخل الذاتي المستقر والكافي لهما وزن كبير هنا. انظر الزر الأزرق أدناه."
          },
          {
            "naam": "أكمل الاندماج",
            "tekst": "استخدم فترة الانتظار لاجتياز امتحان الاندماج — وهو شرط صارم للتجنيس."
          },
          {
            "naam": "اجمع الوثائق",
            "tekst": "اطلب مسبقاً الوثائق الرسمية من بلد المنشأ واعمل على لغتك الهولندية، مثلاً عبر دورة لغة في مؤسسة معتمدة من Blik op Werk."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 اطّلع: مقيم طويل الأمد في الاتحاد الأوروبي (إقامة دائمة بعد 5 سنوات)"
        },
        "link": "https://ind.nl/en/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/new-laws-and-regulations-on-asylum-and-family-reunification",
        "linkTekst": "→ اطّلع على قواعد اللجوء الجديدة 2026 على ind.nl"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "يمكنك البدء في التحضير لتجنيسك",
        "sub": "أنت تتبع مسار B1 لكنك لم تُنهِ الامتحان بعد. يمكنك بدء إجراءات التجنيس مسبقاً — يجب أن يكون الدبلوم جاهزاً قبل اتخاذ IND قراراً.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>نصيحة:</strong> استفسر من بلديتك إذا كان بإمكانك تقديم طلب التجنيس مسبقاً بينما لا تزال تُتم مسار B1."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>تابع مسار B1:</strong> اجتاز الامتحان اللغوي (B1 أو A2 مع جهد موثق) وامتحان KNM."
          },
          {
            "nr": 2,
            "tekst": "<strong>اطلب الوثائق مسبقاً:</strong> جواز سفر، شهادة ميلاد، تصريح إقامة."
          },
          {
            "nr": 3,
            "tekst": "<strong>استفسر من بلديتك</strong> إذا كان بإمكانك تقديم الطلب بينما لا تزال في مرحلة التعلم."
          },
          {
            "nr": 4,
            "tekst": "<strong>بعد الحصول على الدبلوم:</strong> أرسل الإثبات إلى البلدية / IND — عندها يمكن اتخاذ القرار."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ مزيد من المعلومات على ind.nl"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "يمكنك البدء في التحضير لتجنيسك",
        "sub": "أنت تتبع مسار التعليم — برنامج لغوي انتقالي مكثف لمدة 1.5 إلى 2 سنة بهدف الالتحاق بـ MBO أو HBO أو WO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>انتبه:</strong> لا يمنح أيُّ مسار اندماج بحدّ ذاته \"إعفاءً\". تستوفي التزام الاندماج بمجرد أن تُكمل بنجاح مسار التعليم — أي أن تجتاز الامتحانات اللغوية المطلوبة (B1: قراءة، استماع، كتابة، محادثة) وامتحان KNM. وهذا يستوفي أيضاً شرط الاندماج للتجنيس. فمسار التعليم نفسه برنامج لغوي، وليس شهادة MBO أو HBO."
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>نصيحة:</strong> يمكنك بدء إجراءات التجنيس مسبقاً. يجب أن يكون دبلوم الاندماج جاهزاً قبل اتخاذ IND قراراً."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>أتم مسار التعليم:</strong> اجتاز الامتحان اللغوي (B1 في القراءة والاستماع والكتابة والكلام) وامتحان KNM."
          },
          {
            "nr": 2,
            "tekst": "<strong>اطلب الوثائق مسبقاً:</strong> جواز سفر، شهادة ميلاد، تصريح إقامة."
          },
          {
            "nr": 3,
            "tekst": "<strong>استفسر من بلديتك</strong> إذا كان بإمكانك تقديم الطلب بينما لا تزال تُتم المسار."
          },
          {
            "nr": 4,
            "tekst": "<strong>بعد الحصول على الدبلوم:</strong> أرسل الإثبات إلى البلدية / IND."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ مزيد من المعلومات على ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "التجنيس عبر مسار Z — فرق مهم",
        "sub": "إتمام مسار Z لا يعني تلقائياً استيفاء شرط الاندماج للتجنيس. هناك ثلاثة مسارات عبر DUO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>مهم:</strong> مسار Z ليس فيه التزام امتحان بل التزام جهد (800 ساعة دروس لغة + مقابلة ختامية). لذا فإن إكماله <em>لا</em> يمنح تلقائياً حق التجنيس. تحتاج إضافةً إلى توصية إعفاء من DUO أو امتحان A2 مجتاز.<br><br><em>محتمل في المستقبل:</em> تريد الحكومة رفع شرط اللغة للتجنيس من A2 إلى B1. لم يُعتمد هذا بعد — حالياً لا يزال A2 سارياً."
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "اجتياز امتحان الاندماج على مستوى A2",
            "tekst": "اجتاز جميع اختبارات اللغة على مستوى A2 (قراءة، استماع، كتابة، كلام) وامتحان KNM. بعد النجاح ستحصل على دبلوم DUO وتستوفي شرط الاندماج للتجنيس."
          },
          {
            "nr": "B",
            "titel": "600 ساعة تعليم لغوي (A2) + 3 محاولات على الأقل لكل مكون",
            "tekst": "600 ساعة على الأقل من التعليم اللغوي على مستوى A2 في مؤسسة معتمدة من Blik op Werk و3 محاولات على الأقل لكل مكون (منها محاولة A2 واحدة على الأقل)؟ يمكن لـ DUO إصدار توصية إعفاء دون اجتياز الامتحان."
          },
          {
            "nr": "C",
            "titel": "600 ساعة محو أمية أو تعليم لغوي + اختبار DUO (لا قدرة تعلم) — 150 يورو",
            "tekst": "600 ساعة على الأقل من محو الأمية في مؤسسة معتمدة من Blik op Werk ويُثبت اختبار DUO عدم إمكانية تحقيق A2؟ يتبع الإعفاء. يكلف اختبار DUO 150 يورو."
          }
        ],
        "info": "📞 <strong>استشارة:</strong> تشاور مع بلديتك أو VluchtelingenWerk لمعرفة أنسب مسار لوضعك.",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ مساعدة عبر VluchtelingenWerk"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "تحتاج إلى الاندماج للتجنيس",
        "sub": "بدون دبلوم اندماج أو إعفاء لا يمكنك التقدم بطلب التجنيس. ابدأ الآن — خلال 1 إلى 3 سنوات ستكون مستعداً.",
        "alternatieven": [
          {
            "naam": "اسأل عن مسار تعلّمك",
            "tekst": "توجّه إلى بلديتك لمعرفة المسار الذي يناسبك (B1 أو مسار التعليم أو مسار Z)."
          },
          {
            "naam": "ابدأ دروس اللغة",
            "tekst": "احضر دروس لغة في مؤسسة معتمدة من Blik op Werk. اسأل بلديتك عن الإمكانيات وعن تعويض محتمل."
          },
          {
            "naam": "تقدّم للامتحان",
            "tekst": "إذا كنت تتحدث الهولندية بما يكفي، يمكنك التقدّم للامتحان مباشرةً عبر DUO."
          },
          {
            "naam": "إعفاء (vrijstelling) أم استثناء (ontheffing)؟",
            "tekst": "الإعفاء (vrijstelling) ممكن إذا كان لديك بالفعل شهادة باللغة الهولندية (MBO-2 أو أعلى، HBO أو WO). إذا كان مرض أو إعاقة يمنعك فعلاً من الاندماج، يمكن لدائرة DUO منح استثناء (ontheffing) (جزئي) لأسباب طبية. تقرّر البلدية/دائرة الهجرة ما إذا كان ذلك يُحتسب أيضاً للتجنيس."
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ مزيد عن الاندماج على inburgeren.nl"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "السجل الجنائي قد يعيق التجنيس",
        "sub": "حسب نوع الإدانة ومتى حدثت قد تشكل عائقاً. اطلب من متخصص تقييم وضعك.",
        "alternatieven": [
          {
            "naam": "استشارة قانونية",
            "tekst": "استفسر من مستشار قانوني إذا كان وضعك يشكل عائقاً للتجنيس."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "مساعدة قانونية مجانية لأصحاب وضع اللجوء."
          },
          {
            "naam": "مدة الانتظار",
            "tekst": "بعد مدة انتظار محددة (تعتمد على الحكم) يمكنك التقديم من جديد."
          },
          {
            "naam": "الغرامات الصغيرة",
            "tekst": "المخالفات المرورية والمخالفات الصغيرة لا تُحتسب في الغالب."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ تواصل مع VluchtelingenWerk"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "تحقق مما إذا كان لديك سجل جنائي",
        "sub": "يمكنك طلب شهادة حسن سيرة وسلوك (VOG) لمعرفة ما هو مسجل.",
        "alternatieven": [
          {
            "naam": "طلب VOG",
            "tekst": "اطلب شهادة حسن سيرة وسلوك عبر justis.nl."
          },
          {
            "naam": "مجانية لمتلقي الإعانات",
            "tekst": "إذا كنت تتلقى إعانة قد تكون الشهادة مجانية."
          },
          {
            "naam": "الغرامات الصغيرة لا تُحتسب",
            "tekst": "المخالفات المرورية والمخالفات الصغيرة لا تُحتسب في الغالب."
          },
          {
            "naam": "استشارة قانونية",
            "tekst": "عند الشك: استشر مستشاراً قانونياً أو VluchtelingenWerk."
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ طلب VOG على justis.nl"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "يجب أن تكون إقامتك الرئيسية في هولندا",
        "sub": "إذا كنت تقيم بصورة رئيسية في الخارج فلا تستوفي شرط الإقامة للتجنيس.",
        "alternatieven": [
          {
            "naam": "نقل إقامتك الرئيسية",
            "tekst": "انقل إقامتك الرسمية الرئيسية إلى هولندا."
          },
          {
            "naam": "التسجيل في BRP",
            "tekst": "تأكد من تسجيلك في BRP لدى بلديتك."
          },
          {
            "naam": "السفر مقبول",
            "tekst": "السفر إلى الخارج أحياناً مقبول ما دامت هولندا قاعدتك الأساسية."
          },
          {
            "naam": "مزيد من المعلومات",
            "tekst": "استفسر من بلديتك عن الشروط الدقيقة للإقامة."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ مزيد من المعلومات على ind.nl"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "التنازل عن الجنسية خطوة كبيرة",
        "sub": "لا تسمح هولندا عادةً بازدواج الجنسية. هناك استثناءات — وإذا كنت لا تريد فعلاً التخلّي عن جنسيتك، فهناك بديل قوي. اقرأ هذا بعناية قبل أن تقرّر.",
        "alternatieven": [
          {
            "naam": "استثناء لحاملي وضع اللجوء",
            "tekst": "بصفتك لاجئاً معترفاً به، لست مُلزماً بالتخلّي عن جنسيتك."
          },
          {
            "naam": "استثناء: غير ممكن",
            "tekst": "إذا كان التخلّي غير ممكن أو خطيراً، فقد يكون هناك استثناء."
          },
          {
            "naam": "استثناء: شريك هولندي",
            "tekst": "هل أنت متزوج من مواطن هولندي؟ عندئذٍ تنطبق قواعد خاصة."
          },
          {
            "naam": "بديل: مقيم طويل الأمد في الاتحاد الأوروبي",
            "tekst": "هل تريد فعلاً الاحتفاظ بجنسيتك؟ عندئذٍ يكون \"المقيم طويل الأمد في الاتحاد الأوروبي\" غالباً أقوى بديل. انظر الزر الأزرق أدناه."
          },
          {
            "naam": "استشارة قانونية",
            "tekst": "اعرض حالتك للتقييم — أحياناً يكون الممكن أكثر مما تظن."
          }
        ],
        "link": "https://ind.nl/en/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ اقرأ المزيد عن المقيم طويل الأمد في الاتحاد الأوروبي على ind.nl",
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 اطّلع: مقيم طويل الأمد في الاتحاد الأوروبي (الاحتفاظ بالجنسية)"
        }
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "هناك طرق لتخفيض التكاليف",
        "sub": "يبلغ التجنيس €1.139 (فردي) أو €1.454 (مع شريك) — تعرفة 2026؛ تعرفة مخفّضة €847/€1.163 لحاملي وضع اللجوء/عديمي الجنسية. هناك طرق لجعله ميسوراً.",
        "alternatieven": [
          {
            "naam": "تعرفة مخفّضة لجوء/عديم جنسية",
            "tekst": "هل أنت حامل وضع لجوء أو عديم الجنسية؟ عندئذٍ تدفع تعرفة مخفّضة: €847 (فردي) أو €1.163 (مع شريك). تطبّقها البلدية بناءً على وضعك."
          },
          {
            "naam": "صندوق بلدي",
            "tekst": "بعض البلديات تعوّض التكاليف (جزئياً) لحاملي وضع اللجوء."
          },
          {
            "naam": "مساعدة خاصة",
            "tekst": "تقدّم بطلب مساعدة خاصة (bijzondere bijstand) لدى بلديتك لتغطية الرسوم."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "يعرفون ما هي الصناديق المتاحة في بلديتك."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ مساعدة في التكاليف عبر VluchtelingenWerk"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "مقيم طويل الأمد في الاتحاد الأوروبي — البقاء بشكل دائم دون التخلّي عن جنسيتك",
        "sub": "وضع إقامة دائم بعد 5 سنوات من الإقامة القانونية. تحتفظ بجنسيتك وتحصل على حقوق إقامة قوية ودائمة. بما أن تصريح اللجوء غير المحدّد المدة يُلغى، يكون هذا غالباً أهم بديل للتجنيس.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>ما هو:</strong> يمكنك الإقامة في هولندا لأجل غير مسمى والعمل بحرية، كما يمكنك الانتقال والعمل بسهولة أكبر في دول الاتحاد الأوروبي الأخرى. تُحتسب سنوات لجوئك ضمن السنوات الخمس؛ وتُحتسب سنوات الدراسة بنسبة 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>فرق مهم عن التجنيس:</strong> لهذا الوضع <strong>شرط دخل</strong> (دخل مستقل ومستدام وكافٍ). إذا كنت تعيش على إعانة فغالباً لن تستوفيه — وعندئذٍ يكون التجنيس في الواقع أيسر منالاً، لأنه لا يتضمّن شرط دخل."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>متى يكون مهماً لك؟</strong> إذا كنت لا تريد أو لا تستطيع التخلّي عن جنسيتك الأولى — فللتجنيس يجب ذلك من حيث المبدأ، أما هنا فلا."
          },
          {
            "nr": 2,
            "tekst": "<strong>أو:</strong> بما أن تصريح اللجوء غير المحدّد المدة يختفي، فهذا هو المسار من تصريح مؤقت (3 سنوات) إلى حق إقامة دائم."
          },
          {
            "nr": 3,
            "tekst": "<strong>الشروط:</strong> 5 سنوات من الإقامة القانونية المتواصلة (سنوات اللجوء تُحتسب)، اجتياز الاندماج (A2 على الأقل)، جواز سفر ساري ودخل ذاتي مستدام كافٍ."
          },
          {
            "nr": 4,
            "tekst": "<strong>التقديم:</strong> لدى دائرة الهجرة. إذا قدّمت طلباً لتصريح غير محدّد المدة، تتحقق دائرة الهجرة تلقائياً مما إذا كان بإمكانك أيضاً الحصول على وضع المقيم طويل الأمد في الاتحاد الأوروبي."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ اقرأ المزيد عن المقيم طويل الأمد في الاتحاد الأوروبي على ind.nl"
      }
    }
  },
  "TR": {
    "header": {
      "badge": "🇳🇱 Vatandaşlık Denetleyicisi",
      "titel": "Hollanda pasaportu için uygun muyum?",
      "sub": "Birkaç soruyu yanıtlayın ve vatandaşlık başvurusu yapıp yapamayacağınızı hemen görün — 2026 IND koşullarına ve yeni iltica kurallarına göre."
    },
    "vragen": {
      "v1": {
        "stap": "Adım 1 / 9",
        "tekst": "18 yaşında veya daha büyük müsünüz?",
        "uitleg": "Vatandaşlık başvurusu yalnızca yetişkinler tarafından yapılabilir. Reşit olmayan çocuklar için ebeveynler aracılığıyla ayrı kurallar geçerlidir.",
        "antwoorden": [
          {
            "tekst": "Evet, 18 yaşında veya daha büyüğüm",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Hayır, 18 yaşından küçüğüm",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "Adım 2 / 9",
        "tekst": "Hollanda'daki mevcut ikamet statünüz nedir?",
        "uitleg": "Hollanda'da ikamet biçiminiz hangi yolun geçerli olduğunu belirler. AB vatandaşları AB hukuku kapsamında ikamet eder — Hollanda ikamet izniyle değil.",
        "antwoorden": [
          {
            "tekst": "Hollanda ikamet iznim var",
            "sub": "Ya da sığınmacı statüsü (IND tip III, IV veya V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "AB vatandaşıyım (örn. Romanya veya Polonya pasaportu)",
            "sub": "Ya da AEA / İsviçre vatandaşı",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Emin değilim",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "Adım 3 / 9",
        "tekst": "Geçerli bir ikamet izniniz var mı?",
        "uitleg": "Geçerli bir oturma izniniz olmalıdır. İltica statüsü (belirli veya belirsiz süreli iltica oturma izni) de sayılır.<br><br>📌 <strong>12 Haziran 2026'dan itibaren (iki statülü sistem):</strong> yeni iltica izinleri artık 5 yıl yerine en fazla 3 yıl geçerlidir ve belirsiz süreli iltica izni artık verilmemektedir. <em>Geçiş hükmü:</em> 12 Haziran 2026'da zaten bir iltica izniniz (5 yıllık veya belirsiz süreli) var mıydı? O hâlde belge geçerli olduğu sürece bu hakları korursunuz. Vatandaşlık için en önemlisi ikametinizin <strong>kesintisiz</strong> olmasıdır — bu yüzden 3 yıllık izninizi her zaman zamanında yenileyin.",
        "antwoorden": [
          {
            "tekst": "Evet, geçerli bir ikamet iznim var",
            "sub": "Ya da sığınmacı statüsü (IND tip III, IV veya V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "Hayır, geçerli ikamet iznim yok",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "Adım 4 / 9",
        "tekst": "Hollanda'da kesintisiz ne kadar süredir ikamet ediyorsunuz?",
        "uitleg": "Şu anda Hollanda'da en az 5 yıl aralıksız yaşamış olmanız gerekir. Yurt dışına kısa seyahatler bunu bozmaz.<br><br>⚠️ <strong>Dikkat — olası değişiklik:</strong> hükümet bu süreyi 5 yıldan 10 yıla çıkarmak istiyor (Hollandalı eşler için 3 yıldan 5 yıla). Bu teklif henüz kabul edilmedi, dolayısıyla yasal olarak hâlâ 5 yıl geçerli — ancak koşulun değişebileceğini göz önünde bulundurun. Her durumda ikametinizi kesintisiz tutun.",
        "antwoorden": [
          {
            "tekst": "5 yıldan az",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "5 yıl veya daha fazla",
            "sub": "Hollanda'da kesintisiz ikamet",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "Adım 5 / 9 — Entegrasyon",
        "tekst": "Entegrasyon (inburgering) durumunuz nedir?",
        "uitleg": "Vatandaşlık için entegre olduğunuzu kanıtlamanız gerekir. Bunun birden fazla yolu vardır.",
        "antwoorden": [
          {
            "tekst": "Entegrasyon sınavını geçtim (B1 veya eğitim rotası)",
            "sub": "DUO entegrasyon diploması mevcut",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Hollandaca MBO 2, 3 veya 4 diplomam var — ya da HBO / WO diploması",
            "sub": "Bu, entegrasyon yükümlülüğünden kalıcı muafiyet sağlar",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Entegrasyondan muafım ya da istisna tanındı",
            "sub": "Örneğin tıbbi gerekçeyle ya da gösterilen çaba nedeniyle DUO muafiyeti (ontheffing) ile (bunun vatandaşlık için geçerli olup olmadığına belediye karar verir)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Z-rotasını tamamladım (son görüşme + sertifika)",
            "sub": "Dikkat: bu otomatik olarak vatandaşlık hakkı vermez — seçeneklerinize bakın",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Hâlâ entegrasyon sürecindeyim",
            "sub": "Henüz diploma veya muafiyetim yok",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "Adım 5 / 9 — Z-rotası",
        "tekst": "Z-rotasını tamamladınız — vatandaşlık için bir ek adım gerekiyor",
        "uitleg": "Z-rotası bir kapanış görüşmesi ve sertifika ile sona erer, ancak vatandaşlık için IND ek dil koşulları uygular. Yine de vatandaşlık alabilmek için üç yol vardır:<br><br><strong>Yol A — A2 seviyesinde sınavı yine de geçmek</strong><br>Tüm dil sınavlarını A2 seviyesinde (okuma, dinleme, yazma, konuşma) ve KNM sınavını geçin. Dikkat: Z-rotası tamamlandığı için sınav denemeleri artık ücretsiz değildir.<br><br><strong>Yol B — 600 saat dil dersi + her bölümde en az 3 deneme</strong><br>Blik op Werk belgeli bir kurumda en az 600 saat A2 seviyesinde dil dersi ve her bölümde 3 deneme? O zaman DUO bir muafiyet tavsiyesi verebilir.<br><br><strong>Yol C — 600 saat okuma-yazma + DUO testi (€150)</strong><br>En az 600 saat okuma-yazma eğitimi ve A2'nin ulaşılamaz olduğu anlaşılırsa? O zaman DUO testi (€150) ile muafiyet verilir.<br><br><em>Gelecekte mümkün:</em> hükümet vatandaşlık için dil koşulunu A2'den B1'e yükseltmek istiyor. Bu henüz kabul edilmedi — şu anda hâlâ A2 geçerli.<br><br>💡 Hangi yolun size en uygun olduğunu belediyenizle veya VluchtelingenWerk ile görüşün.",
        "antwoorden": [
          {
            "tekst": "Anladım — diğer koşullara devam et",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "Adım 5 / 9 — Öğrenme rotası",
        "tekst": "Hangi entegrasyon rotasını izliyorsunuz?",
        "uitleg": "Belediye, öğrenme kapasitenize göre rotanızı belirler. Üç rota vardır: B1, Eğitim rotası ve Z-rotası.",
        "antwoorden": [
          {
            "tekst": "B1 rotası",
            "sub": "B1 düzeyinde dil sınavı + KNM sınavı",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "Eğitim rotası",
            "sub": "MBO/HBO/WO'ya hazırlık için 1,5–2 yıllık dil geçiş programı",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "Z-rotası (Öz-yeterlilik rotası)",
            "sub": "B1'e ulaşamayacak kişiler için",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "Bilmiyorum / henüz bir rotam yok",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "Adım 5 / 9 — Z-rotası",
        "tekst": "Z-rotasında ne kadar ilerlettiniz?",
        "uitleg": "Z-rotası, belediyede yapılan son görüşme ve DUO'nun olumlu tavsiyesiyle tamamlanır. İkisi de vatandaşlık için gereklidir.",
        "antwoorden": [
          {
            "tekst": "Z-rotasını tamamladım (DUO olumlu tavsiyesini aldım)",
            "sub": "Belediyeyle son görüşme tamamlandı",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Hâlâ Z-rotasındayım",
            "sub": "800 saatlik dil dersi / katılımı henüz tamamlamadım",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "Adım 6 / 9",
        "tekst": "Son 5 yılda suçtan mahkûm oldunuz mu?",
        "uitleg": "Cezai mahkûmiyet vatandaşlığı engelleyebilir. Trafik para cezaları ve küçük ihlaller genellikle sayılmaz.",
        "antwoorden": [
          {
            "tekst": "Hayır, adli sicilik yok",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "Evet, suçtan mahkûm oldum",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "Emin değilim",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "Adım 7 / 9",
        "tekst": "Şu anda ana ikamet yeriniz Hollanda mı?",
        "uitleg": "Ana ikametinizin Hollanda'da olması gerekir. Ara sıra yurt dışına çıkmak sorun değil.",
        "antwoorden": [
          {
            "tekst": "Evet, kalıcı olarak Hollanda'da yaşıyorum",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "Hayır, büyük ölçüde yurt dışında yaşıyorum",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "Adım 8 / 9",
        "tekst": "Mevcut vatandaşlığınızdan vazgeçmeye hazır mısınız?",
        "uitleg": "Hollanda kural olarak çifte vatandaşlığa izin vermez. İstisna: tanınmış mülteciler (statü sahipleri) her iki vatandaşlığı koruyabilir.",
        "antwoorden": [
          {
            "tekst": "Evet, vatandaşlığımdan vazgeçeceğim",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Tanınmış mülteciim (statü sahibi)",
            "sub": "Statü sahipleri çifte vatandaşlığı koruyabilir",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Hayır, vatandaşlığımı korumak istiyorum",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "Adım 9 / 9",
        "tekst": "Vatandaşlık masraflarından haberdar mısınız?",
        "uitleg": "Başvuru bir kişi için €1.139, eşle birlikte €1.454 tutar (2026 tarifeleri). İltica statüsü sahipleri ve vatansızlar için indirimli tarife geçerlidir: €847 (tek) veya €1.163 (eşle). İşlem ortalama 6–12 ay sürer.",
        "antwoorden": [
          {
            "tekst": "Evet, biliyorum ve devam etmek istiyorum",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "Bu çok pahalı — sübvansiyon var mı?",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "Muhtemelen uygunsunuz!",
        "sub": "Yanıtlarınıza göre vatandaşlık için temel koşulları karşılıyorsunuz. Sonraki adım, belediyenize resmi başvuru yapmak!",
        "info": "💡 Statü sahipleri (tanınmış mülteciler) çoğu durumda orijinal vatandaşlıklarından vazgeçmek zorunda değildir.",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Belediyenizden randevu alın</strong> — nüfus işleri birimi. Vatandaşlık başvurusu yapmak istediğinizi söyleyin."
          },
          {
            "nr": 2,
            "tekst": "<strong>Belgelerinizi toplayın:</strong> geçerli pasaport, ikamet izni, entegrasyon belgesi, doğum belgesi (gerekirse onaylı)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Harçları ödeyin:</strong> başvuruda €1.139 (tek kişi) veya €1.454 (eşle) — 2026 tarifeleri. İltica statüsü sahibi veya vatansız mısınız? O zaman indirimli tarife geçerlidir: €847 (tek) veya €1.163 (eşle). Belediyenize bir katkı düzenlemesi olup olmadığını sorun."
          },
          {
            "nr": 4,
            "tekst": "<strong>IND kararını bekleyin.</strong> Bu ortalama 6–12 ay sürer."
          },
          {
            "nr": 5,
            "tekst": "<strong>Vatandaşlık töreni:</strong> onaydan sonra belediyede düzenlenen törence davet alacaksınız."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ind.nl'de daha fazla bilgi"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "AB vatandaşı olduğunuz için farklı haklarınız bulunmakta.",
        "sub": "Hollanda vatandaşlığına geçiş yapabilirsiniz, ancak burada yaşamak ve çalışmak için buna ihtiyacınız yok. AB vatandaşı olarak halihazırda birçok hakkınız var.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>AB vatandaşlık hakları:</strong> Rumen veya Polonyalı vatandaş olarak ikamet izni olmadan Hollanda'da yaşama, çalışma ve okuma hakkına sahipsiniz. Belediyeye kayıt olursunuz (BRP), ancak IND izni gerekmez."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Çifte vatandaşlığa dikkat:</strong> Ana kural, vatandaşlığa geçerken Romanya veya Polonya vatandaşlığınızdan vazgeçmenizdir. Ancak: ülkeniz vazgeçmeye izin vermiyorsa veya bu mümkün değilse, yasal bir istisnaya girersiniz ve her iki vatandaşlığı da koruyabilirsiniz. Sizin durumunuzda vazgeçmenin zorunlu ve mümkün olup olmadığını büyükelçiliğe sorun."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Yine de vatandaşlığa geçmek istiyor musunuz?</strong> Standart şartlar AB vatandaşları için de geçerlidir: 5 yıl kesintisiz ikamet, entegrasyon, adli sicil yok, vatandaşlıktan vazgeçme."
          },
          {
            "nr": 2,
            "tekst": "<strong>Çifte vatandaşlık:</strong> Romanya veya Polonya büyükelçiliğine vazgeçmeniz gerekip gerekmediğini ve vazgeçebilip vazgeçemeyeceğinizi sorun. Vazgeçemiyorsanız, yasal istisna yoluyla vatandaşlığınızı korursunuz. Kurallar ülkeye göre değişir."
          },
          {
            "nr": 3,
            "tekst": "<strong>Devam etmek ister misiniz?</strong> Denetleyiciyi yeniden çalıştırın ve ikamet statüsünde \"ikamet izni\" seçeneğini seçin — diğer şartlar AB vatandaşları için de geçerlidir."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ind.nl'de vatandaşlık bilgisi"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "Çocuklar için vatandaşlık ebeveynler aracılığıyla alınır",
        "sub": "Reşit olmayan çocuklar, bir ebeveyn Hollanda vatandaşlığı başvurusu yaparsa ya da zaten sahipse birlikte vatandaşlığa alınabilir.",
        "alternatieven": [
          {
            "naam": "Birlikte vatandaşlık",
            "tekst": "Ebeveyniniz vatandaşlığa geçerse siz de otomatik olarak geçebilirsiniz."
          },
          {
            "naam": "Mahkeme aracılığıyla",
            "tekst": "Bazı durumlarda küçükler için ayrı vatandaşlık mümkündür."
          },
          {
            "naam": "18'i bekleyin",
            "tekst": "18 yaşında bağımsız başvuru yapabilirsiniz."
          },
          {
            "naam": "Opsiyon prosedürü",
            "tekst": "Hollanda'da doğduysanız bazen \"opsiyon\" yoluyla Hollandalı olabilirsiniz."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ ind.nl'de daha fazla bilgi"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "Önce ikamet iznine ihtiyacınız var",
        "sub": "Vatandaşlık yalnızca Hollanda'da yasal olarak ikamet ediyorsanız mümkündür. Önce geçerli bir oturma izni almalısınız.",
        "alternatieven": [
          {
            "naam": "Sığınma başvurusu",
            "tekst": "Korumaya ihtiyaç duyuyorsanız IND'ye sığınma başvurusu yapabilirsiniz."
          },
          {
            "naam": "Normal izin",
            "tekst": "İş, öğrenim veya aile birleşimi için düzenli izinler mevcuttur."
          },
          {
            "naam": "Hukuki yardım",
            "tekst": "Bir mülteci kuruluşu veya avukatla iletişime geçin."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Sığınmacılar ve statü sahipleri için ücretsiz hukuki destek."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ VluchtelingenWerk ile iletişime geçin"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Hollanda'da henüz yeterince uzun değil",
        "sub": "Şu anda Hollanda'da geçerli ikametle en az 5 yıl aralıksız yaşamış olmanız gerekir. 2026 yeni iltica kurallarından bu yana beklerken dikkat etmeniz gereken birkaç şey var. Bekleme süresini iyi değerlendirebilirsiniz.",
        "alternatieven": [
          {
            "naam": "İzninizi zamanında yenileyin",
            "tekst": "Yeni iltica izinleri en fazla 3 yıl geçerlidir; bu yüzden zamanında yenileyin. İki izin arasında geçerli izniniz olmayan bir \"ikamet boşluğu\" (verblijfsgat) oluşursa, o süre yasal ikamet sayılmaz ve vatandaşlık için 5 yıl sayacı yeniden başlayabilir. Bu yüzden yenilemeyi en geç bitiş tarihinden sonraki 4 hafta içinde yapın: o zaman IND bunu ikamet boşluğu saymaz."
          },
          {
            "naam": "Artık belirsiz süre yok",
            "tekst": "Belirsiz süreli iltica izni artık verilmiyor. Vatandaşlık için sorun değil: geçerli geçici bir izinle vatandaşlığa başvurabilirsiniz."
          },
          {
            "naam": "Vatandaşlık süresi: muhtemelen 10 yıl",
            "tekst": "Dikkat: bu, oturma izniniz değil, vatandaşlığa başvurabilmeden önceki bekleme süresidir. Hükümet bu vatandaşlık süresini 5 yıldan 10 yıla çıkarmak istiyor. Henüz kabul edilmedi, ama göz önünde bulundurun. Hollandalı bir eşle süre daha kısa olabilir — belediyenize sorun."
          },
          {
            "naam": "Alternatif: AB uzun süreli mukimi",
            "tekst": "Belirsiz süreli iltica izni kaldırıldığı için, 5 yıldan sonra \"AB uzun süreli mukimi\" önemli bir alternatiftir: kendi vatandaşlığınızı korur ve güçlü ikamet hakları kazanırsınız. <strong>Önemli: bunun için bir gelir koşulu vardır</strong> — iş ve istikrarlı, yeterli kendi geliriniz burada önemli rol oynar. Aşağıdaki mavi düğmeye bakın."
          },
          {
            "naam": "Entegrasyonu tamamlayın",
            "tekst": "Bekleme süresini entegrasyon sınavınızı geçmek için kullanın — vatandaşlık için zorunlu bir koşul."
          },
          {
            "naam": "Belge toplayın",
            "tekst": "Menşe ülkenizden resmi belgeleri önceden talep edin ve Hollandacanızı geliştirin, örneğin Blik op Werk belgeli bir kurumda dil kursuyla."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 İncele: AB uzun süreli mukimi (5 yıldan sonra kalıcı ikamet)"
        },
        "link": "https://ind.nl/en/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/new-laws-and-regulations-on-asylum-and-family-reunification",
        "linkTekst": "→ 2026 yeni iltica kurallarını ind.nl üzerinde görün"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "Vatandaşlığınızı şimdiden hazırlamaya başlayabilirsiniz",
        "sub": "B1 rotasını izliyorsunuz ancak sınavı henüz tamamlamadınız. Vatandaşlık prosedürünü şimdiden başlatabilirsiniz — IND karar vermeden önce diploma hazır olmalıdır.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>İpucu:</strong> Belediyenize, B1 rotasını tamamlarken vatandaşlık başvurusunu önceden yapıp yapamayacağınızı sorun."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>B1 rotasına devam edin:</strong> dil sınavını (B1 veya kanıtlanmış çabayla A2) ve KNM sınavını geçin."
          },
          {
            "nr": 2,
            "tekst": "<strong>Önceden belgelerinizi talep edin:</strong> pasaport, doğum belgesi, ikamet izni."
          },
          {
            "nr": 3,
            "tekst": "<strong>Belediyenize danışın:</strong> rotayı tamamlarken başvuru yapıp yapamayacağınızı öğrenin."
          },
          {
            "nr": 4,
            "tekst": "<strong>Diploma alındıktan sonra:</strong> kanıtı belediyeye / IND'ye gönderin — ardından karar alınabilir."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ind.nl'de daha fazla bilgi"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "Vatandaşlığınızı şimdiden hazırlamaya başlayabilirsiniz",
        "sub": "Eğitim rotasını izliyorsunuz — MBO, HBO veya WO'ya giriş için tasarlanmış 1,5–2 yıllık yoğun bir dil geçiş programı.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Dikkat:</strong> hiçbir entegrasyon rotası tek başına bir \"muafiyet\" vermez. Eğitim rotasını başarıyla tamamladığınızda — yani gerekli dil sınavlarını (B1: okuma, dinleme, yazma, konuşma) ve KNM sınavını geçtiğinizde — entegrasyon yükümlülüğünüzü yerine getirmiş olursunuz. Bu, vatandaşlık için entegrasyon koşulunu da karşılar. Eğitim rotasının kendisi bir dil programıdır, MBO veya HBO diploması değildir."
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>İpucu:</strong> Vatandaşlık prosedürünü şimdiden başlatabilirsiniz. IND karar vermeden önce entegrasyon diploması hazır olmalıdır."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Eğitim rotasını tamamlayın:</strong> dil sınavını (okuma, dinleme, yazma, konuşmada B1) ve KNM sınavını geçin."
          },
          {
            "nr": 2,
            "tekst": "<strong>Önceden belgelerinizi talep edin:</strong> pasaport, doğum belgesi, ikamet izni."
          },
          {
            "nr": 3,
            "tekst": "<strong>Belediyenize danışın:</strong> rotayı tamamlarken başvuru yapıp yapamayacağınızı öğrenin."
          },
          {
            "nr": 4,
            "tekst": "<strong>Diploma alındıktan sonra:</strong> kanıtı belediyeye / IND'ye gönderin."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ind.nl'de daha fazla bilgi"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Z-rotasından vatandaşlığa — önemli bir fark",
        "sub": "Z-rotasını tamamlamak, vatandaşlık için entegrasyon şartını otomatik olarak karşıladığınız anlamına gelmez. DUO aracılığıyla üç yol vardır.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Önemli:</strong> Z-rotasının sınav yükümlülüğü yoktur, çaba yükümlülüğü vardır (800 saat dil dersi + kapanış görüşmesi). Bu yüzden tamamlamak <em>otomatik olarak</em> vatandaşlık hakkı vermez. Ek olarak bir DUO muafiyet tavsiyesine veya geçilmiş bir A2 sınavına ihtiyacınız vardır.<br><br><em>Gelecekte mümkün:</em> hükümet vatandaşlık için dil koşulunu A2'den B1'e yükseltmek istiyor. Bu henüz kabul edilmedi — şu anda hâlâ A2 geçerli."
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "A2 düzeyinde sınava girerek entegrasyon sınavını geçmek",
            "tekst": "Tüm dil sınavlarından A2 düzeyinde geçin (okuma, dinleme, yazma, konuşma) ve KNM sınavını geçin. Geçtikten sonra DUO diplomasına sahip olursunuz ve vatandaşlık için entegrasyon şartını karşılarsınız."
          },
          {
            "nr": "B",
            "titel": "600 saat dil dersi (A2) + her sınav bileşeni için en az 3 deneme",
            "tekst": "Blik op Werk onaylı bir kurumda en az 600 saatlik A2 düzeyinde dil dersi ve bileşen başına en az 3 deneme (en az 1 A2 sınavı dahil)? DUO, sınavı geçmeden muafiyet tavsiyesi verebilir."
          },
          {
            "nr": "C",
            "titel": "600 saat okuryazarlık veya dil dersi + DUO testi (öğrenme kapasitesi yok) — 150 €",
            "tekst": "Blik op Werk onaylı bir kurumda en az 600 saatlik okuryazarlık eğitimi ve DUO testinin A2'nin ulaşılamaz olduğunu göstermesi? Muafiyet verilir. DUO testi 150 € tutar."
          }
        ],
        "info": "📞 <strong>Tavsiye:</strong> Durumunuza en uygun yolu belirlemek için belediyenize veya VluchtelingenWerk'e danışın.",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ VluchtelingenWerk aracılığıyla yardım"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "Vatandaşlık için entegrasyona ihtiyacınız var",
        "sub": "Entegrasyon diploması veya muafiyet olmadan vatandaşlık başvurusu yapamazsınız. Şimdi başlayın — 1 ila 3 yıl içinde hazır olursunuz.",
        "alternatieven": [
          {
            "naam": "Öğrenim rotanızı sorun",
            "tekst": "Hangi rotanın size uyduğunu öğrenmek için belediyenize gidin (B1, Eğitim rotası veya Z-rotası)."
          },
          {
            "naam": "Dil derslerine başlayın",
            "tekst": "Blik op Werk belgeli bir kurumda dil dersi alın. Belediyenize olanakları ve olası bir geri ödemeyi sorun."
          },
          {
            "naam": "Sınava başvurun",
            "tekst": "Yeterince Hollandaca konuşuyorsanız, doğrudan DUO üzerinden sınava başvurabilirsiniz."
          },
          {
            "naam": "Muafiyet mi, ontheffing mi?",
            "tekst": "Hollandaca bir diplomanız (MBO-2 veya üzeri, HBO ya da WO) varsa muafiyet (vrijstelling) mümkündür. Bir hastalık veya engel nedeniyle gerçekten entegre olamıyorsanız, DUO tıbbi gerekçeyle (kısmi) bir muafiyet (ontheffing) verebilir. Bunun vatandaşlık için de geçerli olup olmadığına belediye/IND karar verir."
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ inburgeren.nl'de entegrasyon hakkında daha fazla bilgi"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "Sabıka kaydına sahip olmanız bir engel teşkil ediyor.",
        "sub": "Yakın dönemdeki bir mahkûmiyet genellikle birkaç yıl vatandaşlığı engeller. Bir avukata danışın.",
        "alternatieven": [
          {
            "naam": "Hukuki tavsiye",
            "tekst": "Durumunuzun vatandaşlık için engel oluşturup oluşturmadığını bir hukuk danışmanına sorun."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Statü sahipleri için ücretsiz hukuki yardım."
          },
          {
            "naam": "Bekleme süresi",
            "tekst": "Belirli bir bekleme süresinden sonra (mahkûmiyete bağlı) yeniden başvurabilirsiniz."
          },
          {
            "naam": "Küçük cezalar",
            "tekst": "Trafik cezaları ve küçük ihlaller çoğunlukla SAYILMAZ."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ VluchtelingenWerk ile iletişime geçin"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Adli sicil kaydınızı kontrol edin",
        "sub": "Kayıtlı olanları görmek için justis.nl aracılığıyla İyi Hal Belgesi (VOG) talep edebilirsiniz.",
        "alternatieven": [
          {
            "naam": "VOG talep edin",
            "tekst": "justis.nl aracılığıyla İyi Hal Belgesi (VOG) talep edin."
          },
          {
            "naam": "Yardım alıcıları için ücretsiz",
            "tekst": "Sosyal yardım alıyorsanız VOG ücretsiz olabilir."
          },
          {
            "naam": "Küçük cezalar sayılmaz",
            "tekst": "Trafik cezaları ve küçük ihlaller genellikle SAYILMAZ."
          },
          {
            "naam": "Hukuki tavsiye",
            "tekst": "Şüphe durumunda: bir hukuk danışmanına veya VluchtelingenWerk'e başvurun."
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ justis.nl'de VOG talep edin"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "Ana ikamet yeriniz Hollanda'da olmalı",
        "sub": "Vatandaşlık alabilmeniz için, fiilen Hollanda'da ikamet etmenizi gerekiyor. Yurt dışında yaşamak bir engel oluşturur.",
        "alternatieven": [
          {
            "naam": "Ana ikameti taşıyın",
            "tekst": "Resmi ana ikamet yerinizi Hollanda'ya taşıyın."
          },
          {
            "naam": "BRP kaydı",
            "tekst": "Belediyenizde BRP'ye kayıtlı olduğunuzdan emin olun."
          },
          {
            "naam": "Seyahat edilebilir",
            "tekst": "Ara sıra yurt dışına çıkmak, Hollanda'yı üs olarak kullandığınız sürece sorun değildir."
          },
          {
            "naam": "Daha fazla bilgi",
            "tekst": "İkamet şartlarının ayrıntıları için belediyenize danışın."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ind.nl'de daha fazla bilgi"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "Çifte vatandaşlık genellikle mümkün değil.",
        "sub": "Hollanda genellikle çifte vatandaşlığa izin vermez. İstisnalar vardır — ve vatandaşlığınızdan gerçekten vazgeçmek istemiyorsanız, güçlü bir alternatif vardır. Karar vermeden önce bunu dikkatlice okuyun.",
        "alternatieven": [
          {
            "naam": "Statü sahipleri için istisna",
            "tekst": "Tanınmış bir mülteci olarak vatandaşlığınızdan vazgeçmek ZORUNDA DEĞİLSİNİZ."
          },
          {
            "naam": "İstisna: imkânsız",
            "tekst": "Vazgeçmek imkânsız veya tehlikeliyse, bir istisna olabilir."
          },
          {
            "naam": "İstisna: Hollandalı eş",
            "tekst": "Bir Hollandalı ile evli misiniz? O zaman özel kurallar geçerlidir."
          },
          {
            "naam": "Alternatif: AB uzun süreli mukimi",
            "tekst": "Vatandaşlığınızı gerçekten korumak mı istiyorsunuz? O zaman \"AB uzun süreli mukimi\" genellikle en güçlü alternatiftir. Aşağıdaki mavi düğmeye bakın."
          },
          {
            "naam": "Hukuki danışmanlık",
            "tekst": "Durumunuzu değerlendirtin — bazen düşündüğünüzden fazlası mümkündür."
          }
        ],
        "link": "https://ind.nl/en/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ AB uzun süreli mukimi hakkında ind.nl üzerinde daha fazla bilgi",
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 İncele: AB uzun süreli mukimi (vatandaşlığı koruma)"
        }
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Maliyetleri düşürmek için bazı yöntemler mevcut.",
        "sub": "Vatandaşlık bir kişi için €1.139, eşle €1.454 tutar — 2026 tarifeleri; iltica statüsü sahipleri/vatansızlar için indirimli tarife €847/€1.163. Bunu uygun fiyatlı hâle getirmenin yolları var.",
        "alternatieven": [
          {
            "naam": "İndirimli tarife iltica/vatansız",
            "tekst": "İltica statüsü sahibi veya vatansız mısınız? O zaman indirimli tarife ödersiniz: €847 (tek) veya €1.163 (eşle). Belediye bunu statünüze göre uygular."
          },
          {
            "naam": "Belediye fonu",
            "tekst": "Bazı belediyeler statü sahipleri için masrafları (kısmen) karşılar."
          },
          {
            "naam": "Özel yardım",
            "tekst": "Harç için belediyenizden özel yardım (bijzondere bijstand) talep edin."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Belediyenizde hangi fonların mevcut olduğunu bilirler."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ VluchtelingenWerk aracılığıyla maliyet yardımı"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "AB uzun süreli mukimi — vatandaşlığınızdan vazgeçmeden kalıcı kalma",
        "sub": "5 yıllık yasal ikametten sonra kalıcı bir ikamet statüsü. Kendi vatandaşlığınızı korur ve güçlü, kalıcı ikamet hakları kazanırsınız. Belirsiz süreli iltica izni kaldırıldığı için bu genellikle vatandaşlığa en önemli alternatiftir.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Nedir:</strong> Hollanda'da süresiz oturabilir ve serbestçe çalışabilirsiniz, ayrıca diğer AB ülkelerinde daha kolay taşınıp çalışabilirsiniz. İltica yıllarınız 5 yıla sayılır; öğrenim yılları %50 sayılır."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Vatandaşlıktan önemli fark:</strong> bu statü için bir <strong>gelir koşulu</strong> vardır (bağımsız, sürdürülebilir ve yeterli gelir). Sosyal yardımla geçiniyorsanız bunu çoğu zaman karşılayamazsınız — o zaman vatandaşlık aslında daha erişilebilirdir, çünkü onun gelir koşulu yoktur."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Sizin için ne zaman ilginç?</strong> İlk vatandaşlığınızdan vazgeçmek istemiyor veya vazgeçemiyorsanız — vatandaşlık için ilke olarak gerekir, burada gerekmez."
          },
          {
            "nr": 2,
            "tekst": "<strong>Veya:</strong> belirsiz süreli iltica izni kalktığı için bu, geçici (3 yıllık) bir izinden kalıcı ikamet hakkına giden yoldur."
          },
          {
            "nr": 3,
            "tekst": "<strong>Koşullar:</strong> 5 yıl kesintisiz yasal ikamet (iltica yılları sayılır), geçilmiş entegrasyon (en az A2), geçerli bir pasaport ve yeterli bağımsız, sürdürülebilir gelir."
          },
          {
            "nr": 4,
            "tekst": "<strong>Başvuru:</strong> IND'ye. Belirsiz süreli bir izin için başvurursanız, IND otomatik olarak AB uzun süreli mukimi statüsü alıp alamayacağınızı kontrol eder."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ AB uzun süreli mukimi hakkında ind.nl üzerinde daha fazla bilgi"
      }
    }
  },
  "UK": {
    "header": {
      "badge": "🇳🇱 Перевірка натуралізації",
      "titel": "Чи маю я право на нідерландський паспорт?",
      "sub": "Дайте відповідь на кілька запитань і одразу дізнайтеся, чи можете ви подати заяву на натуралізацію — на основі умов IND 2026 року, включно з новими правилами щодо притулку."
    },
    "vragen": {
      "v1": {
        "stap": "Крок 1 з 9",
        "tekst": "Вам 18 років або більше?",
        "uitleg": "Заяву на натуралізацію можуть подавати тільки повнолітні. Для неповнолітніх дітей діють окремі правила через батьків.",
        "antwoorden": [
          {
            "tekst": "Так, мені 18 або більше",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Ні, мені менше 18 років",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "Крок 2 з 9",
        "tekst": "Який ваш поточний статус проживання в Нідерландах?",
        "uitleg": "Спосіб вашого проживання в Нідерландах визначає, який шлях застосовується. Громадяни ЄС проживають на підставі права ЄС — не на підставі нідерландського дозволу на проживання.",
        "antwoorden": [
          {
            "tekst": "Я маю нідерландський дозвіл на проживання",
            "sub": "Або статус притулку (IND тип III, IV або V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Я громадянин ЄС (наприклад, румунський або польський паспорт)",
            "sub": "Або громадянин ЄЕЗ/Швейцарії",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Я не впевнений(-а)",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "Крок 3 з 9",
        "tekst": "Чи маєте ви дійсний дозвіл на проживання?",
        "uitleg": "Вам потрібна дійсна посвідка на проживання. Статус притулку (тимчасова або безстрокова посвідка у зв'язку з притулком) також зараховується.<br><br>📌 <strong>З 12 червня 2026 року (система двох статусів):</strong> нові дозволи на притулок тепер дійсні максимум 3 роки замість 5, а безстрокова посвідка на притулок більше не видається. <em>Перехідне правило:</em> чи мали ви станом на 12 червня 2026 року вже посвідку на притулок (на 5 років або безстрокову)? Тоді ви зберігаєте ці права, доки документ дійсний. Для натуралізації найважливіше, щоб ваше проживання було <strong>безперервним</strong> — тому завжди вчасно подовжуйте свою 3-річну посвідку.",
        "antwoorden": [
          {
            "tekst": "Так, я маю дійсний дозвіл на проживання",
            "sub": "Або статус притулку (IND тип III, IV або V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "Ні, у мене немає дійсного дозволу на проживання",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "Крок 4 з 9",
        "tekst": "Як довго ви безперервно проживаєте в Нідерландах?",
        "uitleg": "Наразі ви повинні прожити в Нідерландах щонайменше 5 років поспіль. Короткі поїздки за кордон цього не порушують.<br><br>⚠️ <strong>Увага — можлива зміна:</strong> уряд хоче подовжити цей строк з 5 до 10 років (а для партнерів громадян Нідерландів — з 3 до 5 років). Ця пропозиція ще не прийнята, тож юридично діє ще 5 років — але враховуйте, що вимога може змінитися. У будь-якому разі зберігайте безперервність проживання.",
        "antwoorden": [
          {
            "tekst": "Менше 5 років",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "5 років або більше",
            "sub": "Безперервне проживання в Нідерландах",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "Крок 5 з 9 — Інтеграція",
        "tekst": "Який статус вашої громадянської інтеграції (inburgering)?",
        "uitleg": "Для натуралізації необхідно довести, що ви пройшли інтеграцію. Є кілька способів це зробити.",
        "antwoorden": [
          {
            "tekst": "Я склав(-ла) іспит з громадянської інтеграції (маршрут B1 або освітній)",
            "sub": "Диплом DUO про інтеграцію отримано",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Маю нідерландськомовний диплом MBO 2, 3 або 4 — або HBO / WO",
            "sub": "Це дає постійне звільнення від зобов'язання щодо інтеграції",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Я звільнений(-а) від інтеграції",
            "sub": "Наприклад, з медичних підстав або через звільнення DUO (ontheffing) за доведені зусилля (муніципалітет вирішує, чи зараховується це для натуралізації)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Я завершив(-ла) Z-маршрут (фінальне інтерв'ю + сертифікат)",
            "sub": "Увага: це не дає автоматичного права на натуралізацію — перевірте свої варіанти",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Я ще проходжу громадянську інтеграцію",
            "sub": "У мене ще немає диплома або звільнення",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "Крок 5 з 9 — Z-маршрут",
        "tekst": "Ви завершили Z-маршрут — для натуралізації потрібен ще один крок",
        "uitleg": "Z-маршрут завершується підсумковою співбесідою та сертифікатом, але для натуралізації IND застосовує додаткові мовні вимоги. Є три шляхи, щоб усе ж натуралізуватися:<br><br><strong>Шлях A — Усе ж скласти іспит на рівні A2</strong><br>Складіть усі мовні іспити на рівні A2 (читання, аудіювання, письмо, говоріння) та іспит KNM. Увага: оскільки Z-маршрут завершено, спроби іспиту більше не безкоштовні.<br><br><strong>Шлях B — 600 годин мовних занять + щонайменше 3 спроби на компонент</strong><br>Щонайменше 600 годин занять рівня A2 в установі із сертифікатом Blik op Werk і 3 спроби на компонент? Тоді DUO може надати рекомендацію про звільнення.<br><br><strong>Шлях C — 600 годин грамотності + тест DUO (€150)</strong><br>Щонайменше 600 годин навчання грамотності, і виявляється, що A2 недосяжний? Тоді звільнення надається через тест DUO (€150).<br><br><em>Можливо в майбутньому:</em> уряд хоче підвищити мовну вимогу для натуралізації з A2 до B1. Це ще не прийнято — наразі діє ще A2.<br><br>💡 Обговоріть зі своїм муніципалітетом або VluchtelingenWerk, який шлях вам найкраще підходить.",
        "antwoorden": [
          {
            "tekst": "Зрозуміло — перейти до решти вимог",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "Крок 5 з 9 — Маршрут навчання",
        "tekst": "Який маршрут інтеграції ви проходите?",
        "uitleg": "Муніципалітет визначає ваш навчальний маршрут на основі ваших здібностей до навчання. Є три маршрути: B1, освітній і Z-маршрут.",
        "antwoorden": [
          {
            "tekst": "Маршрут B1",
            "sub": "Мовний іспит на рівні B1 + іспит KNM",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "Освітній маршрут",
            "sub": "Мовна перехідна програма 1,5–2 роки — підготовка до MBO/HBO/WO",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "Z-маршрут (Маршрут самодостатності)",
            "sub": "Для тих, хто не може досягти B1",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "Не знаю / у мене ще немає маршруту",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "Крок 5 з 9 — Z-маршрут",
        "tekst": "На якому етапі Z-маршруту ви перебуваєте?",
        "uitleg": "Z-маршрут завершується фінальним інтерв'ю у муніципалітеті та позитивною рекомендацією DUO. Обидва є обов'язковими для натуралізації.",
        "antwoorden": [
          {
            "tekst": "Я завершив(-ла) Z-маршрут (отримав(-ла) позитивну рекомендацію DUO)",
            "sub": "Фінальне інтерв'ю з муніципалітетом завершено",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Я ще проходжу Z-маршрут",
            "sub": "Ще не завершив(-ла) 800 годин мовних занять / участі",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "Крок 6 з 9",
        "tekst": "Чи були ви засуджені за кримінальний злочин за останні 5 років?",
        "uitleg": "Кримінальний вирок може заблокувати натуралізацію. Штрафи за порушення ПДР та незначні правопорушення зазвичай не зараховуються.",
        "antwoorden": [
          {
            "tekst": "Ні, у мене немає судимості",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "Так, мене засуджено за кримінальний злочин",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "Я не впевнений(-а)",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "Крок 7 з 9",
        "tekst": "Чи є ваше основне місце проживання зараз у Нідерландах?",
        "uitleg": "Ваше основне місце проживання має бути в Нідерландах. Час від часу виїжджати за кордон — не проблема.",
        "antwoorden": [
          {
            "tekst": "Так, я постійно проживаю в Нідерландах",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "Ні, я переважно проживаю за кордоном",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "Крок 8 з 9",
        "tekst": "Чи готові ви відмовитися від вашого поточного громадянства?",
        "uitleg": "Нідерланди, як правило, не дозволяють подвійне громадянство. Виняток: визнані біженці (власники статусу) можуть зберігати обидва громадянства.",
        "antwoorden": [
          {
            "tekst": "Так, я відмовлюся від свого громадянства",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Я визнаний(-а) біженець (власник статусу)",
            "sub": "Власники статусу можуть зберігати подвійне громадянство",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Ні, я хочу зберегти своє громадянство",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "Крок 9 з 9",
        "tekst": "Чи обізнані ви про вартість натуралізації?",
        "uitleg": "Заява коштує €1.139 для однієї особи та €1.454 з партнером (тарифи 2026). Для власників статусу притулку та осіб без громадянства діє знижений тариф: €847 (одна особа) або €1.163 (з партнером). Процедура триває в середньому 6–12 місяців.",
        "antwoorden": [
          {
            "tekst": "Так, я знаю і хочу продовжити",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "Це занадто дорого — чи є субсидії?",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "Ймовірно, ви маєте право!",
        "sub": "Виходячи з ваших відповідей, ви відповідаєте основним вимогам для натуралізації. Наступний крок — офіційна заява у вашому муніципалітеті.",
        "info": "💡 Власники статусу (визнані біженці) в більшості випадків не зобов'язані відмовлятися від початкового громадянства.",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Запишіться на прийом у вашому муніципалітеті</strong> — відділ цивільних справ. Скажіть, що хочете подати заяву на натуралізацію."
          },
          {
            "nr": 2,
            "tekst": "<strong>Зберіть документи:</strong> дійсний паспорт, дозвіл на проживання, підтвердження інтеграції, свідоцтво про народження (легалізоване за потреби)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Сплатіть збір:</strong> €1.139 (одна особа) або €1.454 (з партнером) під час подання — тарифи 2026. Ви власник статусу притулку або особа без громадянства? Тоді діє знижений тариф: €847 (одна особа) або €1.163 (з партнером). Запитайте в муніципалітеті, чи є програма відшкодування."
          },
          {
            "nr": 4,
            "tekst": "<strong>Зачекайте рішення</strong> IND. Це займає в середньому 6–12 місяців."
          },
          {
            "nr": 5,
            "tekst": "<strong>Церемонія натуралізації:</strong> після схвалення ви отримаєте запрошення на церемонію у муніципалітеті."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Більше інформації на ind.nl"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Як громадянин ЄС ви маєте інші права",
        "sub": "Натуралізація як нідерландський громадянин можлива, але для проживання та роботи тут нідерландське громадянство не є обов'язковим. Як громадянин ЄС ви вже маєте широкі права в Нідерландах.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Права громадянина ЄС:</strong> Як румунський або польський громадянин ви маєте право жити, працювати та навчатися в Нідерландах — без дозволу на проживання. Ви реєструєтесь у муніципалітеті (BRP), але дозвіл IND не потрібен."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Увага щодо подвійного громадянства:</strong> Основне правило — при натуралізації ви відмовляєтеся від румунського чи польського громадянства. Але: якщо ваша країна не дозволяє відмову або це неможливо, ви підпадаєте під законний виняток і можете зберегти обидва громадянства. Запитайте в посольстві, чи є відмова обов'язковою та можливою у вашому випадку."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Все одно хочете натуралізуватись?</strong> Стандартні вимоги також застосовуються до громадян ЄС: 5 років безперервного проживання, інтеграція, відсутність судимості, відмова від громадянства."
          },
          {
            "nr": 2,
            "tekst": "<strong>Подвійне громадянство:</strong> Запитайте в румунському чи польському посольстві, чи мусите і чи можете ви відмовитися. Якщо не можете, ви зберігаєте громадянство через законний виняток. Правила залежать від країни."
          },
          {
            "nr": 3,
            "tekst": "<strong>Хочете продовжити?</strong> Пройдіть перевірку знову і виберіть \"дозвіл на проживання\" — решта вимог також застосовується до громадян ЄС."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Інформація про натуралізацію на ind.nl"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "Натуралізація дітей відбувається через батьків",
        "sub": "Неповнолітні діти можуть натуралізуватись разом із батьком або матір'ю, які подають заяву або вже мають нідерландське громадянство.",
        "alternatieven": [
          {
            "naam": "Натуралізація разом",
            "tekst": "Якщо ваш батько/мати натуралізується, ви можете автоматично натуралізуватись разом."
          },
          {
            "naam": "Через суд",
            "tekst": "У деяких випадках можлива окрема натуралізація неповнолітніх."
          },
          {
            "naam": "Зачекати до 18",
            "tekst": "У 18 років ви можете подати заяву самостійно."
          },
          {
            "naam": "Процедура опції",
            "tekst": "Якщо ви народились у Нідерландах, ви іноді можете стати нідерландцем через процедуру \"опції\"."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ Більше інформації на ind.nl"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "Спочатку вам потрібен дозвіл на проживання",
        "sub": "Натуралізація можлива лише якщо ви законно проживаєте в Нідерландах. Спочатку отримайте дійсний дозвіл на проживання.",
        "alternatieven": [
          {
            "naam": "Заява про притулок",
            "tekst": "Якщо вам потрібен захист, ви можете подати заяву про притулок до IND."
          },
          {
            "naam": "Звичайний дозвіл",
            "tekst": "Для роботи, навчання або возз'єднання сім'ї є звичайні дозволи."
          },
          {
            "naam": "Юридична допомога",
            "tekst": "Зверніться до організації у справах біженців або адвоката."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Безкоштовна юридична підтримка для шукачів притулку та власників статусу."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Зв'яжіться з VluchtelingenWerk"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Ви ще недостатньо довго в Нідерландах",
        "sub": "Наразі ви повинні прожити в Нідерландах щонайменше 5 років поспіль із дійсним проживанням. Після нових правил щодо притулку 2026 року є кілька речей, на які варто звернути увагу під час очікування. Час очікування можна використати з користю.",
        "alternatieven": [
          {
            "naam": "Вчасно подовжуйте посвідку",
            "tekst": "Нові дозволи на притулок дійсні максимум 3 роки; тому подовжуйте вчасно. Якщо виникне \"пробіл у проживанні\" (verblijfsgat) — період між двома дозволами, коли у вас немає дійсного дозволу — цей час не зараховується як законне проживання, і відлік 5 років для натуралізації може початися заново. Тому подавайте на подовження щонайпізніше протягом 4 тижнів після закінчення: тоді IND не вважатиме це пробілом."
          },
          {
            "naam": "Більше немає безстрокового дозволу",
            "tekst": "Безстрокова посвідка на притулок більше не видається. Для натуралізації це не проблема: ви можете натуралізуватися з дійсної тимчасової посвідки."
          },
          {
            "naam": "Строк натуралізації: можливо 10 років",
            "tekst": "Увага: це стосується часу очікування перед натуралізацією, а не вашої посвідки на проживання. Уряд хоче подовжити цей строк натуралізації з 5 до 10 років. Ще не прийнято, але враховуйте. З партнером-нідерландцем строк може бути коротшим — запитайте в муніципалітеті."
          },
          {
            "naam": "Альтернатива: довгостроковий резидент ЄС",
            "tekst": "Оскільки безстрокову посвідку на притулок скасовують, статус \"довгостроковий резидент ЄС\" після 5 років є важливою альтернативою: ви зберігаєте власне громадянство та отримуєте сильні права на проживання. <strong>Важливо: для цього діє вимога щодо доходу</strong> — робота та стабільний, достатній власний дохід тут мають велике значення. Дивіться синю кнопку нижче."
          },
          {
            "naam": "Завершіть інтеграцію",
            "tekst": "Використайте час очікування, щоб скласти іспит з інтеграції — обов'язкова вимога для натуралізації."
          },
          {
            "naam": "Зберіть документи",
            "tekst": "Заздалегідь замовте офіційні документи з країни походження та працюйте над нідерландською, наприклад через мовний курс в установі із сертифікатом Blik op Werk."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Переглянути: довгостроковий резидент ЄС (постійне проживання після 5 років)"
        },
        "link": "https://ind.nl/en/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/new-laws-and-regulations-on-asylum-and-family-reunification",
        "linkTekst": "→ Переглянути нові правила щодо притулку 2026 на ind.nl"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "Ви вже можете починати готуватися до натуралізації",
        "sub": "Ви проходите маршрут B1, але ще не завершили іспит. Ви можете вже розпочати процедуру натуралізації — диплом має бути готовий до того, як IND прийме рішення.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>Порада:</strong> Запитайте у вашому муніципалітеті, чи можете ви вже подати заяву на натуралізацію, доки ще завершуєте маршрут B1."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Продовжуйте маршрут B1:</strong> складіть мовний іспит (B1 або A2 з доведеними зусиллями) та іспит KNM."
          },
          {
            "nr": 2,
            "tekst": "<strong>Заздалегідь замовте документи:</strong> паспорт, свідоцтво про народження, дозвіл на проживання."
          },
          {
            "nr": 3,
            "tekst": "<strong>Запитайте у вашому муніципалітеті,</strong> чи можна вже подати заяву під час навчання."
          },
          {
            "nr": 4,
            "tekst": "<strong>Після отримання диплома:</strong> надішліть підтвердження до муніципалітету/IND — тоді може бути прийнято рішення."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Більше інформації на ind.nl"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "Ви вже можете починати готуватися до натуралізації",
        "sub": "Ви проходите освітній маршрут — інтенсивну мовну перехідну програму тривалістю 1,5–2 роки для вступу до MBO, HBO або WO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Увага:</strong> жоден інтеграційний маршрут сам по собі не дає \"звільнення\". Ви виконуєте свій обов'язок з інтеграції, щойно успішно завершите Освітній маршрут — тобто складете потрібні мовні іспити (B1: читання, аудіювання, письмо, говоріння) та іспит KNM. Це також виконує вимогу з інтеграції для натуралізації. Сам Освітній маршрут — це мовна програма, а не диплом MBO чи HBO."
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>Порада:</strong> Ви вже можете розпочати процедуру натуралізації. Диплом про інтеграцію має бути готовий до того, як IND прийме рішення."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Завершіть освітній маршрут:</strong> складіть мовний іспит (B1 з читання, аудіювання, письма та мовлення) та іспит KNM."
          },
          {
            "nr": 2,
            "tekst": "<strong>Заздалегідь замовте документи:</strong> паспорт, свідоцтво про народження, дозвіл на проживання."
          },
          {
            "nr": 3,
            "tekst": "<strong>Запитайте у вашому муніципалітеті,</strong> чи можна вже подати заяву під час навчання."
          },
          {
            "nr": 4,
            "tekst": "<strong>Після отримання диплома:</strong> надішліть підтвердження до муніципалітету/IND."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Більше інформації на ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Натуралізація через Z-маршрут — важлива відмінність",
        "sub": "Завершення Z-маршруту не означає автоматично, що ви відповідаєте вимозі інтеграції для натуралізації. Є три шляхи через DUO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Важливо:</strong> Z-маршрут не має обов'язку складати іспит, а має обов'язок докладати зусиль (800 годин мовних занять + підсумкова співбесіда). Тому його завершення <em>не</em> дає автоматичного права на натуралізацію. Додатково потрібна рекомендація DUO про звільнення або складений іспит A2.<br><br><em>Можливо в майбутньому:</em> уряд хоче підвищити мовну вимогу для натуралізації з A2 до B1. Це ще не прийнято — наразі діє ще A2."
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "Скласти іспит з інтеграції на рівні A2",
            "tekst": "Складіть усі мовні іспити на рівні A2 (читання, аудіювання, письмо, мовлення) та іспит KNM. Після складання ви маєте диплом DUO і відповідаєте вимозі інтеграції для натуралізації."
          },
          {
            "nr": "B",
            "titel": "600 годин мовних занять (A2) + щонайменше 3 спроби на кожен компонент іспиту",
            "tekst": "Щонайменше 600 годин мовних занять рівня A2 у сертифікованому закладі Blik op Werk і мінімум 3 спроби на компонент (включно з щонайменше 1 іспитом A2)? DUO може видати рекомендацію про звільнення навіть без складеного іспиту."
          },
          {
            "nr": "C",
            "titel": "600 годин навчання грамоти або мовних занять + тест DUO (немає здатності до навчання) — €150",
            "tekst": "Щонайменше 600 годин навчання грамоти у сертифікованому закладі Blik op Werk і тест DUO показує, що A2 недосяжний? Надається звільнення. Тест DUO коштує €150."
          }
        ],
        "info": "📞 <strong>Порада:</strong> Проконсультуйтеся з вашим муніципалітетом або VluchtelingenWerk щодо найкращого шляху для вашої ситуації.",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Допомога через VluchtelingenWerk"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "Для натуралізації потрібна громадянська інтеграція",
        "sub": "Без диплома про інтеграцію або звільнення ви не можете подати заяву на натуралізацію. Починайте зараз — через 1–3 роки ви будете готові.",
        "alternatieven": [
          {
            "naam": "Запитайте свій навчальний маршрут",
            "tekst": "Зверніться до муніципалітету, щоб дізнатися, який маршрут вам підходить (B1, Освітній маршрут або Z-маршрут)."
          },
          {
            "naam": "Почніть мовні заняття",
            "tekst": "Відвідуйте мовні заняття в установі із сертифікатом Blik op Werk. Запитайте муніципалітет про можливості та можливе відшкодування."
          },
          {
            "naam": "Подайте на іспит",
            "tekst": "Якщо ви вже достатньо розмовляєте нідерландською, ви можете подати на іспит безпосередньо через DUO."
          },
          {
            "naam": "Звільнення чи виняток?",
            "tekst": "Звільнення (vrijstelling) можливе, якщо у вас вже є диплом нідерландською мовою (MBO-2 чи вище, HBO або WO). Якщо через хворобу чи інвалідність ви справді не можете інтегруватися, DUO може надати (часткове) звільнення (ontheffing) з медичних підстав. Муніципалітет/IND вирішує, чи зараховується це також для натуралізації."
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ Більше про інтеграцію на inburgeren.nl"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "Судимість може заблокувати натуралізацію",
        "sub": "Залежно від типу засудження та того, як давно це сталося, це може бути перешкодою. Зверніться до спеціаліста для оцінки вашої ситуації.",
        "alternatieven": [
          {
            "naam": "Юридична консультація",
            "tekst": "Запитайте у юридичного консультанта, чи є ваша ситуація перешкодою для натуралізації."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Безкоштовна юридична допомога для власників статусу."
          },
          {
            "naam": "Термін очікування",
            "tekst": "Після певного терміну очікування (залежно від вироку) ви можете подати заяву знову."
          },
          {
            "naam": "Незначні штрафи",
            "tekst": "Штрафи за порушення ПДР та незначні правопорушення, як правило, НЕ зараховуються."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Зв'яжіться з VluchtelingenWerk"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Перевірте наявність судимості",
        "sub": "Ви можете замовити Довідку про відсутність судимості (VOG) на justis.nl, щоб побачити, що зареєстровано.",
        "alternatieven": [
          {
            "naam": "Замовте VOG",
            "tekst": "Замовте Довідку про відсутність судимості (VOG) через justis.nl."
          },
          {
            "naam": "Безкоштовно для отримувачів допомоги",
            "tekst": "Якщо ви отримуєте допомогу, VOG може бути безкоштовним."
          },
          {
            "naam": "Незначні штрафи не зараховуються",
            "tekst": "Штрафи за порушення ПДР та незначні правопорушення, як правило, НЕ зараховуються."
          },
          {
            "naam": "Юридична консультація",
            "tekst": "У разі сумніву: зверніться до юридичного консультанта або VluchtelingenWerk."
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ Замовте VOG на justis.nl"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "Ваше основне місце проживання має бути в Нідерландах",
        "sub": "Якщо ви переважно проживаєте за кордоном, ви не відповідаєте вимозі щодо місця проживання для натуралізації.",
        "alternatieven": [
          {
            "naam": "Перенесіть основне місце проживання",
            "tekst": "Перенесіть ваше офіційне основне місце проживання до Нідерландів."
          },
          {
            "naam": "Реєстрація BRP",
            "tekst": "Переконайтесь, що ви зареєстровані в BRP у вашому муніципалітеті."
          },
          {
            "naam": "Подорожі дозволені",
            "tekst": "Час від часу виїжджати за кордон — не проблема, доки Нідерланди є вашою базою."
          },
          {
            "naam": "Більше інформації",
            "tekst": "Запитайте у вашого муніципалітету про точні вимоги до місця проживання."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Більше інформації на ind.nl"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "Відмова від громадянства — серйозний крок",
        "sub": "Нідерланди зазвичай не дозволяють подвійне громадянство. Є винятки — і якщо ви справді не хочете відмовлятися від свого громадянства, є сильна альтернатива. Уважно прочитайте це, перш ніж вирішувати.",
        "alternatieven": [
          {
            "naam": "Виняток для власників статусу",
            "tekst": "Як визнаний біженець ви НЕ зобов'язані відмовлятися від свого громадянства."
          },
          {
            "naam": "Виняток: неможливо",
            "tekst": "Якщо відмова неможлива або небезпечна, може бути виняток."
          },
          {
            "naam": "Виняток: нідерландський партнер",
            "tekst": "Ви одружені з громадянином Нідерландів? Тоді діють особливі правила."
          },
          {
            "naam": "Альтернатива: довгостроковий резидент ЄС",
            "tekst": "Справді хочете зберегти громадянство? Тоді \"довгостроковий резидент ЄС\" часто є найсильнішою альтернативою. Дивіться синю кнопку нижче."
          },
          {
            "naam": "Юридична консультація",
            "tekst": "Дайте оцінити вашу ситуацію — іноді можливо більше, ніж ви думаєте."
          }
        ],
        "link": "https://ind.nl/en/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ Докладніше про довгострокового резидента ЄС на ind.nl",
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Переглянути: довгостроковий резидент ЄС (зберегти громадянство)"
        }
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Є способи знизити витрати",
        "sub": "Натуралізація коштує €1.139 (одна особа) або €1.454 (з партнером) — тарифи 2026; знижений тариф €847/€1.163 для власників статусу притулку/осіб без громадянства. Є способи зробити це доступнішим.",
        "alternatieven": [
          {
            "naam": "Знижений тариф притулок/без громадянства",
            "tekst": "Ви власник статусу притулку або без громадянства? Тоді ви платите знижений тариф: €847 (одна особа) або €1.163 (з партнером). Муніципалітет застосовує це на основі вашого статусу."
          },
          {
            "naam": "Муніципальний фонд",
            "tekst": "Деякі муніципалітети (частково) відшкодовують витрати для власників статусу."
          },
          {
            "naam": "Спеціальна допомога",
            "tekst": "Подайте на спеціальну допомогу (bijzondere bijstand) у вашому муніципалітеті для оплати збору."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Вони знають, які фонди доступні у вашому муніципалітеті."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Допомога з витратами через VluchtelingenWerk"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Довгостроковий резидент ЄС — постійне проживання без відмови від громадянства",
        "sub": "Постійний статус проживання після 5 років законного проживання. Ви зберігаєте власне громадянство та отримуєте сильні, тривалі права на проживання. Оскільки безстрокову посвідку на притулок скасовують, це часто найважливіша альтернатива натуралізації.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Що це таке:</strong> ви можете проживати в Нідерландах безстроково та вільно працювати, а також легше переїжджати й працювати в інших країнах ЄС. Ваші роки притулку зараховуються до 5 років; роки навчання — на 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Важлива відмінність від натуралізації:</strong> для цього статусу діє <strong>вимога щодо доходу</strong> (самостійний, стабільний і достатній дохід). Якщо ви живете на допомогу, ви часто її не виконаєте — і тоді натуралізація насправді доступніша, бо для неї немає вимоги щодо доходу."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Коли це цікаво для вас?</strong> Якщо ви не хочете або не можете відмовитися від свого першого громадянства — для натуралізації це в принципі потрібно, а тут ні."
          },
          {
            "nr": 2,
            "tekst": "<strong>Або:</strong> оскільки безстрокова посвідка на притулок зникає, це шлях від тимчасової (3-річної) посвідки до тривалого права на проживання."
          },
          {
            "nr": 3,
            "tekst": "<strong>Вимоги:</strong> 5 років безперервного законного проживання (роки притулку зараховуються), складена інтеграція (щонайменше A2), дійсний паспорт і достатній самостійний, стабільний дохід."
          },
          {
            "nr": 4,
            "tekst": "<strong>Подання:</strong> до IND. Якщо ви подаєте на безстрокову посвідку, IND автоматично перевіряє, чи можете ви також отримати статус довгострокового резидента ЄС."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Докладніше про довгострокового резидента ЄС на ind.nl"
      }
    }
  },
  "FA": {
    "header": {
      "badge": "🇳🇱 بررسی تابعیت",
      "titel": "آیا واجد شرایط پاسپورت هلندی هستم؟",
      "sub": "به چند پرسش پاسخ دهید و بلافاصله ببینید آیا می‌توانید درخواست تابعیت بدهید — بر اساس شرایط IND سال 2026، از جمله قوانین جدید پناهندگی."
    },
    "vragen": {
      "v1": {
        "stap": "مرحله ۱ از ۹",
        "tekst": "آیا ۱۸ سال یا بیشتر دارید؟",
        "uitleg": "درخواست تابعیت فقط توسط بزرگسالان قابل ارائه است. برای فرزندان زیر سن، قوانین جداگانه‌ای از طریق والدین وجود دارد.",
        "antwoorden": [
          {
            "tekst": "بله، ۱۸ سال یا بیشتر دارم",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "خیر، کمتر از ۱۸ سال دارم",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "مرحله ۲ از ۹",
        "tekst": "وضعیت اقامت فعلی شما در هلند چیست؟",
        "uitleg": "نحوه اقامت شما در هلند تعیین می‌کند کدام مسیر برای شما صدق می‌کند. شهروندان اتحادیه اروپا بر اساس حقوق اتحادیه اروپا اقامت دارند — نه از طریق مجوز اقامت هلند.",
        "antwoorden": [
          {
            "tekst": "مجوز اقامت هلندی دارم",
            "sub": "یا وضعیت پناهندگی (IND نوع III، IV یا V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "شهروند اتحادیه اروپا هستم (مثلاً پاسپورت رومانیایی یا لهستانی)",
            "sub": "یا شهروند منطقه اقتصادی اروپا / سوئیس",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "مطمئن نیستم",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "مرحله ۳ از ۹",
        "tekst": "آیا مجوز اقامت معتبر دارید؟",
        "uitleg": "شما به یک اجازه اقامت معتبر نیاز دارید. وضعیت پناهندگی (اجازه اقامت پناهندگی با مدت معین یا نامعین) نیز محسوب می‌شود.<br><br>📌 <strong>از 12 ژوئن 2026 (نظام دو وضعیتی):</strong> اجازه‌های پناهندگی جدید اکنون حداکثر 3 سال به‌جای 5 سال معتبرند و اجازه پناهندگی با مدت نامعین دیگر صادر نمی‌شود. <em>قاعده انتقالی:</em> آیا در 12 ژوئن 2026 از قبل اجازه پناهندگی (5 ساله یا نامعین) داشتید؟ در این صورت این حقوق را تا زمانی که سند معتبر است حفظ می‌کنید. برای تابعیت، مهم‌ترین چیز این است که اقامت شما <strong>بدون وقفه</strong> باشد — بنابراین همیشه اجازه 3 ساله خود را به‌موقع تمدید کنید.",
        "antwoorden": [
          {
            "tekst": "بله، مجوز اقامت معتبر دارم",
            "sub": "یا وضعیت پناهندگی (IND نوع III، IV یا V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "خیر، مجوز اقامت معتبر ندارم",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "مرحله ۴ از ۹",
        "tekst": "چه مدت است که به‌طور مداوم در هلند زندگی می‌کنید؟",
        "uitleg": "در حال حاضر باید دست‌کم 5 سال متوالی در هلند زندگی کرده باشید. سفرهای کوتاه به خارج این را قطع نمی‌کند.<br><br>⚠️ <strong>توجه — تغییر احتمالی:</strong> دولت می‌خواهد این مدت را از 5 به 10 سال افزایش دهد (و برای همسران شهروندان هلندی از 3 به 5 سال). این پیشنهاد هنوز تصویب نشده است، بنابراین از نظر قانونی هنوز 5 سال اعمال می‌شود — اما در نظر داشته باشید که این شرط ممکن است تغییر کند. در هر صورت اقامت خود را بدون وقفه نگه دارید.",
        "antwoorden": [
          {
            "tekst": "کمتر از ۵ سال",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "۵ سال یا بیشتر",
            "sub": "اقامت مداوم در هلند",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "مرحله ۵ از ۹ — ادغام",
        "tekst": "وضعیت ادغام اجتماعی (inburgering) شما چیست؟",
        "uitleg": "برای تابعیت باید ثابت کنید که ادغام شده‌اید. روش‌های مختلفی برای این کار وجود دارد.",
        "antwoorden": [
          {
            "tekst": "آزمون ادغام اجتماعی را گذرانده‌ام (مسیر B1 یا آموزشی)",
            "sub": "گواهینامه ادغام DUO دریافت شده",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "مدرک MBO سطح ۲، ۳ یا ۴ به زبان هلندی دارم — یا مدرک HBO / WO",
            "sub": "این معافیت دائمی از تکلیف ادغام را می‌دهد",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "از ادغام معاف هستم",
            "sub": "مثلاً به دلایل پزشکی یا از طریق معافیت DUO (ontheffing) به‌خاطر تلاش قابل‌اثبات (شهرداری تصمیم می‌گیرد که آیا این برای تابعیت محسوب می‌شود)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "مسیر Z را تکمیل کرده‌ام (مصاحبه نهایی + گواهینامه)",
            "sub": "توجه: این به‌طور خودکار حق تابعیت نمی‌دهد — گزینه‌هایتان را بررسی کنید",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "هنوز در حال ادغام اجتماعی هستم",
            "sub": "هنوز مدرک یا معافیت ندارم",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "مرحله ۵ از ۹ — مسیر Z",
        "tekst": "مسیر Z را تکمیل کرده‌اید — یک قدم اضافی برای تابعیت لازم است",
        "uitleg": "مسیر Z با یک مصاحبه پایانی و یک گواهی به پایان می‌رسد، اما برای تابعیت، IND شرایط زبانی اضافی اعمال می‌کند. سه راه وجود دارد تا با این حال بتوانید تابعیت بگیرید:<br><br><strong>راه A — با این حال قبولی در آزمون در سطح A2</strong><br>همه آزمون‌های زبان را در سطح A2 (خواندن، شنیدن، نوشتن، صحبت‌کردن) و آزمون KNM را قبول شوید. توجه: اکنون که مسیر Z به پایان رسیده، تلاش‌های آزمون دیگر رایگان نیستند.<br><br><strong>راه B — 600 ساعت کلاس زبان + دست‌کم 3 بار تلاش برای هر بخش</strong><br>دست‌کم 600 ساعت کلاس سطح A2 در یک مؤسسه دارای گواهی Blik op Werk و 3 بار تلاش برای هر بخش؟ در این صورت DUO می‌تواند توصیه معافیت صادر کند.<br><br><strong>راه C — 600 ساعت سوادآموزی + آزمون DUO (€150)</strong><br>دست‌کم 600 ساعت سوادآموزی و مشخص شود که A2 دست‌یافتنی نیست؟ در این صورت معافیت از طریق آزمون DUO (€150) داده می‌شود.<br><br><em>احتمالاً در آینده:</em> دولت می‌خواهد شرط زبان برای تابعیت را از A2 به B1 افزایش دهد. این هنوز تصویب نشده است — در حال حاضر هنوز A2 اعمال می‌شود.<br><br>💡 با شهرداری خود یا VluchtelingenWerk مشورت کنید که کدام راه بهتر مناسب شماست.",
        "antwoorden": [
          {
            "tekst": "متوجه شدم — ادامه به شرایط بقیه",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "مرحله ۵ از ۹ — مسیر یادگیری",
        "tekst": "کدام مسیر ادغام را دنبال می‌کنید؟",
        "uitleg": "شهرداری مسیر یادگیری شما را بر اساس توانایی یادگیری‌تان تعیین می‌کند. سه مسیر وجود دارد: B1، مسیر آموزشی و مسیر Z.",
        "antwoorden": [
          {
            "tekst": "مسیر B1",
            "sub": "آزمون زبانی در سطح B1 + آزمون KNM",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "مسیر آموزشی",
            "sub": "برنامه انتقالی زبانی ۱.۵–۲ ساله — آمادگی برای MBO/HBO/WO",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "مسیر Z (مسیر خودکفایی)",
            "sub": "برای کسانی که B1 برایشان دست‌نیافتنی است",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "نمی‌دانم / هنوز مسیری ندارم",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "مرحله ۵ از ۹ — مسیر Z",
        "tekst": "تا کجا در مسیر Z پیشرفت کرده‌اید؟",
        "uitleg": "مسیر Z با مصاحبه نهایی در شهرداری و توصیه مثبت DUO پایان می‌یابد. هر دو برای تابعیت لازم است.",
        "antwoorden": [
          {
            "tekst": "مسیر Z را تکمیل کرده‌ام (توصیه مثبت DUO را دریافت کرده‌ام)",
            "sub": "مصاحبه نهایی با شهرداری انجام شده",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "هنوز در مسیر Z هستم",
            "sub": "هنوز ۸۰۰ ساعت آموزش زبانی / مشارکت را کامل نکرده‌ام",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "مرحله ۶ از ۹",
        "tekst": "آیا در ۵ سال گذشته به جرمی محکوم شده‌اید؟",
        "uitleg": "محکومیت جنایی می‌تواند مانع تابعیت شود. جریمه‌های ترافیکی و تخلفات کوچک معمولاً محاسبه نمی‌شوند.",
        "antwoorden": [
          {
            "tekst": "خیر، سابقه جنایی ندارم",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "بله، به جرمی محکوم شده‌ام",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "مطمئن نیستم",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "مرحله ۷ از ۹",
        "tekst": "آیا محل سکونت اصلی شما در حال حاضر در هلند است؟",
        "uitleg": "محل سکونت اصلی شما باید در هلند باشد. سفرهای گاه‌گاهی به خارج مشکلی ایجاد نمی‌کند.",
        "antwoorden": [
          {
            "tekst": "بله، به‌طور دائمی در هلند زندگی می‌کنم",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "خیر، عمدتاً در خارج از کشور زندگی می‌کنم",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "مرحله ۸ از ۹",
        "tekst": "آیا حاضرید از تابعیت فعلی خود صرف‌نظر کنید؟",
        "uitleg": "هلند معمولاً تابعیت مضاعف را اجازه نمی‌دهد. استثنا: پناهندگان شناخته‌شده (دارندگان وضعیت) می‌توانند هر دو تابعیت را نگه دارند.",
        "antwoorden": [
          {
            "tekst": "بله، از تابعیتم صرف‌نظر می‌کنم",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "من پناهنده شناخته‌شده هستم (دارنده وضعیت)",
            "sub": "دارندگان وضعیت می‌توانند تابعیت مضاعف نگه دارند",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "خیر، می‌خواهم تابعیتم را نگه دارم",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "مرحله ۹ از ۹",
        "tekst": "آیا از هزینه‌های تابعیت آگاه هستید؟",
        "uitleg": "هزینه درخواست برای یک نفر €1.139 و با همسر €1.454 است (تعرفه 2026). برای دارندگان وضعیت پناهندگی و افراد بدون تابعیت تعرفه کاهش‌یافته اعمال می‌شود: €847 (انفرادی) یا €1.163 (با همسر). این روند به‌طور متوسط 6 تا 12 ماه طول می‌کشد.",
        "antwoorden": [
          {
            "tekst": "بله، می‌دانم و می‌خواهم ادامه دهم",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "خیلی گران است — آیا کمک مالی وجود دارد؟",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "احتمالاً واجد شرایط هستید!",
        "sub": "بر اساس پاسخ‌های شما، شرایط اصلی تابعیت را دارید. قدم بعدی ارائه درخواست رسمی در شهرداری شماست.",
        "info": "💡 دارندگان وضعیت (پناهندگان شناخته‌شده) در اکثر موارد مجبور نیستند از تابعیت اصلی خود صرف‌نظر کنند.",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>وقت بگیرید از شهرداری‌تان</strong> — بخش امور شهروندی. بگویید می‌خواهید درخواست تابعیت بدهید."
          },
          {
            "nr": 2,
            "tekst": "<strong>مدارک را جمع‌آوری کنید:</strong> پاسپورت معتبر، مجوز اقامت، مدرک ادغام، شناسنامه (در صورت لزوم تأییدشده)."
          },
          {
            "nr": 3,
            "tekst": "<strong>هزینه را بپردازید:</strong> هنگام ارائه درخواست €1.139 (انفرادی) یا €1.454 (با همسر) — تعرفه 2026. آیا دارنده وضعیت پناهندگی یا بدون تابعیت هستید؟ در این صورت تعرفه کاهش‌یافته اعمال می‌شود: €847 (انفرادی) یا €1.163 (با همسر). از شهرداری بپرسید که آیا طرح کمک‌هزینه‌ای وجود دارد."
          },
          {
            "nr": 4,
            "tekst": "<strong>منتظر تصمیم</strong> IND باشید. این به‌طور متوسط ۶–۱۲ ماه طول می‌کشد."
          },
          {
            "nr": 5,
            "tekst": "<strong>مراسم تابعیت:</strong> پس از تأیید، دعوتنامه مراسم در شهرداری دریافت خواهید کرد."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ اطلاعات بیشتر در ind.nl"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "به عنوان شهروند اتحادیه اروپا حقوق متفاوتی دارید",
        "sub": "تابعیت هلندی ممکن است، اما برای زندگی و کار در اینجا نیازی به تابعیت هلندی ندارید. به عنوان شهروند اروپایی از قبل حقوق گسترده‌ای در هلند دارید.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>حقوق شهروندی اروپایی:</strong> به عنوان شهروند رومانیایی یا لهستانی حق دارید در هلند زندگی، کار و تحصیل کنید — بدون مجوز اقامت. در شهرداری (BRP) ثبت‌نام می‌کنید، اما مجوز IND لازم نیست."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>توجه به تابعیت مضاعف:</strong> قاعده اصلی این است که هنگام تابعیت از تابعیت رومانیایی یا لهستانی خود چشم‌پوشی می‌کنید. اما: اگر کشور شما اجازه چشم‌پوشی نمی‌دهد یا این کار ممکن نیست، مشمول یک استثنای قانونی می‌شوید و می‌توانید هر دو تابعیت را حفظ کنید. در سفارت بپرسید که آیا چشم‌پوشی در مورد شما الزامی و ممکن است."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>باز هم می‌خواهید تابعیت بگیرید؟</strong> شرایط استاندارد برای شهروندان اروپایی هم صدق می‌کند: ۵ سال اقامت مداوم، ادغام، بدون سابقه جنایی، صرف‌نظر از تابعیت."
          },
          {
            "nr": 2,
            "tekst": "<strong>تابعیت مضاعف:</strong> در سفارت رومانی یا لهستان بپرسید که آیا باید و آیا می‌توانید چشم‌پوشی کنید. اگر نمی‌توانید، تابعیت خود را از طریق استثنای قانونی حفظ می‌کنید. قوانین از کشوری به کشور دیگر متفاوت است."
          },
          {
            "nr": 3,
            "tekst": "<strong>می‌خواهید ادامه دهید؟</strong> دوباره چک‌لیست را طی کنید و در قسمت وضعیت اقامت \"مجوز اقامت\" را انتخاب کنید — سایر شرایط برای شهروندان اروپایی هم صدق می‌کند."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ اطلاعات تابعیت در ind.nl"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "تابعیت فرزندان از طریق والدین انجام می‌شود",
        "sub": "فرزندان صغیر می‌توانند همراه با والدینی که درخواست تابعیت هلندی می‌دهند یا قبلاً دارند، تابعیت بگیرند.",
        "alternatieven": [
          {
            "naam": "تابعیت مشترک",
            "tekst": "اگر والدینتان تابعیت بگیرند، شما هم می‌توانید به‌طور خودکار تابعیت بگیرید."
          },
          {
            "naam": "از طریق دادگاه",
            "tekst": "در برخی موارد تابعیت جداگانه برای صغار ممکن است."
          },
          {
            "naam": "انتظار تا ۱۸ سالگی",
            "tekst": "در ۱۸ سالگی می‌توانید به‌طور مستقل درخواست بدهید."
          },
          {
            "naam": "روش گزینه",
            "tekst": "اگر در هلند متولد شده‌اید گاهی می‌توانید از طریق \"گزینه\" هلندی شوید."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ اطلاعات بیشتر در ind.nl"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "ابتدا به مجوز اقامت نیاز دارید",
        "sub": "تابعیت فقط در صورتی ممکن است که به‌طور قانونی در هلند اقامت داشته باشید. ابتدا مجوز اقامت معتبر دریافت کنید.",
        "alternatieven": [
          {
            "naam": "درخواست پناهندگی",
            "tekst": "اگر به حمایت نیاز دارید می‌توانید به IND درخواست پناهندگی بدهید."
          },
          {
            "naam": "مجوز معمولی",
            "tekst": "برای کار، تحصیل یا بازیابی خانواده مجوزهای معمولی وجود دارد."
          },
          {
            "naam": "کمک حقوقی",
            "tekst": "با سازمان پناهندگان یا وکیل تماس بگیرید."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "پشتیبانی حقوقی رایگان برای پناهجویان و دارندگان وضعیت."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ با VluchtelingenWerk تماس بگیرید"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "هنوز به‌اندازه کافی در هلند زندگی نکرده‌اید",
        "sub": "در حال حاضر باید دست‌کم 5 سال متوالی با اقامت معتبر در هلند زندگی کرده باشید. از زمان قوانین جدید پناهندگی 2026 چند نکته وجود دارد که باید در دوران انتظار به آن‌ها توجه کنید. می‌توانید از دوران انتظار به‌خوبی استفاده کنید.",
        "alternatieven": [
          {
            "naam": "اجازه خود را به‌موقع تمدید کنید",
            "tekst": "اجازه‌های پناهندگی جدید حداکثر 3 سال معتبرند؛ بنابراین به‌موقع تمدید کنید. اگر یک \"شکاف اقامت\" (verblijfsgat) ایجاد شود — دوره‌ای بین دو اجازه که در آن اجازه معتبری ندارید — آن زمان به‌عنوان اقامت قانونی محسوب نمی‌شود و شمارش 5 ساله برای تابعیت ممکن است از نو آغاز شود. بنابراین درخواست تمدید را حداکثر تا 4 هفته پس از انقضا ارائه دهید: در این صورت IND آن را شکاف اقامت تلقی نمی‌کند."
          },
          {
            "naam": "دیگر مدت نامعین وجود ندارد",
            "tekst": "اجازه پناهندگی با مدت نامعین دیگر صادر نمی‌شود. برای تابعیت مشکلی نیست: می‌توانید از یک اجازه موقت معتبر تابعیت بگیرید."
          },
          {
            "naam": "مدت تابعیت: احتمالاً 10 سال",
            "tekst": "توجه: این مربوط به دوران انتظار پیش از تابعیت‌گرفتن است، نه به اجازه اقامت شما. دولت می‌خواهد این مدت تابعیت را از 5 به 10 سال افزایش دهد. هنوز تصویب نشده، اما در نظر داشته باشید. با همسر هلندی ممکن است مدت کوتاه‌تر باشد — از شهرداری بپرسید."
          },
          {
            "naam": "جایگزین: مقیم بلندمدت اتحادیه اروپا",
            "tekst": "اکنون که اجازه پناهندگی نامعین حذف می‌شود، وضعیت \"مقیم بلندمدت اتحادیه اروپا\" پس از 5 سال یک جایگزین مهم است: تابعیت خود را حفظ می‌کنید و حقوق اقامت قوی به دست می‌آورید. <strong>مهم: برای این مورد یک شرط درآمد وجود دارد</strong> — کار و درآمد شخصیِ پایدار و کافی در اینجا وزن زیادی دارند. دکمه آبی زیر را ببینید."
          },
          {
            "naam": "ادغام را کامل کنید",
            "tekst": "از دوران انتظار برای قبولی در آزمون ادغام استفاده کنید — یک شرط سختگیرانه برای تابعیت."
          },
          {
            "naam": "مدارک را جمع‌آوری کنید",
            "tekst": "از پیش مدارک رسمی را از کشور مبدأ درخواست کنید و روی زبان هلندی خود کار کنید، مثلاً از طریق یک دوره زبان در مؤسسه‌ای دارای گواهی Blik op Werk."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ببینید: مقیم بلندمدت اتحادیه اروپا (اقامت دائم پس از 5 سال)"
        },
        "link": "https://ind.nl/en/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/new-laws-and-regulations-on-asylum-and-family-reunification",
        "linkTekst": "→ قوانین جدید پناهندگی 2026 را در ind.nl ببینید"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "می‌توانید همین الان تابعیت‌تان را آماده کنید",
        "sub": "مسیر B1 را دنبال می‌کنید اما آزمون را هنوز کامل نکرده‌اید. می‌توانید از قبل روند تابعیت را شروع کنید — مدرک باید قبل از تصمیم‌گیری IND آماده باشد.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>نکته:</strong> از شهرداری‌تان بپرسید آیا می‌توانید در حین تکمیل مسیر B1 درخواست تابعیت بدهید."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>مسیر B1 را ادامه دهید:</strong> آزمون زبانی (B1 یا A2 با تلاش قابل اثبات) و آزمون KNM را قبول شوید."
          },
          {
            "nr": 2,
            "tekst": "<strong>از پیش مدارک درخواست کنید:</strong> پاسپورت، شناسنامه، مجوز اقامت."
          },
          {
            "nr": 3,
            "tekst": "<strong>از شهرداری‌تان بپرسید</strong> آیا می‌توانید در حین یادگیری درخواست بدهید."
          },
          {
            "nr": 4,
            "tekst": "<strong>پس از دریافت مدرک:</strong> تأییدیه را به شهرداری/IND بفرستید — سپس تصمیم گرفته می‌شود."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ اطلاعات بیشتر در ind.nl"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "می‌توانید همین الان تابعیت‌تان را آماده کنید",
        "sub": "مسیر آموزشی را دنبال می‌کنید — برنامه انتقالی زبانی فشرده ۱.۵ تا ۲ ساله برای ورود به MBO، HBO یا WO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>توجه:</strong> هیچ مسیر ادغامی به‌خودی‌خود \"معافیت\" نمی‌دهد. به‌محض اینکه مسیر آموزشی را با موفقیت کامل کنید — یعنی آزمون‌های زبان لازم (B1: خواندن، شنیدن، نوشتن، صحبت‌کردن) و آزمون KNM را قبول شوید — تعهد ادغام خود را برآورده می‌کنید. این شرط ادغام برای تابعیت را نیز برآورده می‌کند. بنابراین خودِ مسیر آموزشی یک برنامه زبانی است، نه مدرک MBO یا HBO."
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>نکته:</strong> می‌توانید از قبل روند تابعیت را شروع کنید. مدرک ادغام باید قبل از تصمیم‌گیری IND آماده باشد."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>مسیر آموزشی را کامل کنید:</strong> آزمون زبانی (B1 در خواندن، شنیدن، نوشتن و صحبت کردن) و آزمون KNM را قبول شوید."
          },
          {
            "nr": 2,
            "tekst": "<strong>از پیش مدارک درخواست کنید:</strong> پاسپورت، شناسنامه، مجوز اقامت."
          },
          {
            "nr": 3,
            "tekst": "<strong>از شهرداری‌تان بپرسید</strong> آیا می‌توانید در حین تکمیل مسیر درخواست بدهید."
          },
          {
            "nr": 4,
            "tekst": "<strong>پس از دریافت مدرک:</strong> تأییدیه را به شهرداری/IND بفرستید."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ اطلاعات بیشتر در ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "تابعیت از طریق مسیر Z — تفاوت مهم",
        "sub": "تکمیل مسیر Z به این معنا نیست که شرط ادغام برای تابعیت را به‌طور خودکار برآورده کرده‌اید. سه مسیر از طریق DUO وجود دارد.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>مهم:</strong> مسیر Z تعهد آزمون ندارد بلکه تعهد تلاش دارد (800 ساعت کلاس زبان + مصاحبه پایانی). بنابراین کامل‌کردن آن <em>به‌طور خودکار</em> حق تابعیت نمی‌دهد. علاوه بر این به توصیه معافیت DUO یا یک آزمون A2 قبول‌شده نیاز دارید.<br><br><em>احتمالاً در آینده:</em> دولت می‌خواهد شرط زبان برای تابعیت را از A2 به B1 افزایش دهد. این هنوز تصویب نشده است — در حال حاضر هنوز A2 اعمال می‌شود."
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "قبولی در آزمون ادغام در سطح A2",
            "tekst": "تمام آزمون‌های زبانی در سطح A2 (خواندن، شنیدن، نوشتن، صحبت کردن) و آزمون KNM را قبول شوید. پس از قبولی مدرک DUO دارید و شرط ادغام برای تابعیت را برآورده می‌کنید."
          },
          {
            "nr": "B",
            "titel": "۶۰۰ ساعت آموزش زبانی (A2) + حداقل ۳ تلاش برای هر بخش آزمون",
            "tekst": "حداقل ۶۰۰ ساعت آموزش زبانی سطح A2 در مؤسسه‌ای با گواهی Blik op Werk و حداقل ۳ تلاش برای هر بخش (از جمله حداقل یک آزمون A2)؟ DUO می‌تواند بدون قبولی در آزمون توصیه معافیت صادر کند."
          },
          {
            "nr": "C",
            "titel": "۶۰۰ ساعت سوادآموزی یا آموزش زبانی + آزمون DUO (بدون ظرفیت یادگیری) — ۱۵۰ یورو",
            "tekst": "حداقل ۶۰۰ ساعت سوادآموزی در مؤسسه‌ای با گواهی Blik op Werk و آزمون DUO نشان می‌دهد A2 قابل دستیابی نیست؟ معافیت داده می‌شود. آزمون DUO ۱۵۰ یورو هزینه دارد."
          }
        ],
        "info": "📞 <strong>مشاوره:</strong> با شهرداری یا VluchtelingenWerk در مورد بهترین مسیر برای وضعیت‌تان مشورت کنید.",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ کمک از طریق VluchtelingenWerk"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "برای تابعیت به ادغام اجتماعی نیاز دارید",
        "sub": "بدون مدرک ادغام یا معافیت نمی‌توانید درخواست تابعیت بدهید. همین الان شروع کنید — در ۱ تا ۳ سال آماده خواهید بود.",
        "alternatieven": [
          {
            "naam": "مسیر یادگیری خود را بپرسید",
            "tekst": "به شهرداری خود مراجعه کنید تا بدانید کدام مسیر مناسب شماست (B1، مسیر آموزشی یا مسیر Z)."
          },
          {
            "naam": "کلاس زبان را شروع کنید",
            "tekst": "در یک مؤسسه دارای گواهی Blik op Werk کلاس زبان بگیرید. از شهرداری درباره امکانات و بازپرداخت احتمالی بپرسید."
          },
          {
            "naam": "برای آزمون درخواست دهید",
            "tekst": "اگر به‌اندازه کافی هلندی صحبت می‌کنید، می‌توانید مستقیماً از طریق DUO برای آزمون درخواست دهید."
          },
          {
            "naam": "معافیت (vrijstelling) یا رفع تعهد (ontheffing)؟",
            "tekst": "معافیت (vrijstelling) در صورتی ممکن است که از قبل مدرک به زبان هلندی داشته باشید (MBO-2 یا بالاتر، HBO یا WO). اگر بیماری یا معلولیت واقعاً مانع ادغام شما می‌شود، DUO می‌تواند به دلایل پزشکی رفع تعهد (ontheffing) (جزئی) اعطا کند. شهرداری/IND تصمیم می‌گیرد که آیا این برای تابعیت هم محسوب می‌شود."
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ اطلاعات بیشتر درباره ادغام در inburgeren.nl"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "سابقه جنایی می‌تواند تابعیت را مسدود کند",
        "sub": "بسته به نوع محکومیت و اینکه چه مدت پیش بوده، ممکن است مانعی باشد. از یک متخصص بخواهید وضعیت‌تان را ارزیابی کند.",
        "alternatieven": [
          {
            "naam": "مشاوره حقوقی",
            "tekst": "از یک مشاور حقوقی بپرسید آیا وضعیت‌تان مانعی برای تابعیت است."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "کمک حقوقی رایگان برای دارندگان وضعیت."
          },
          {
            "naam": "دوره انتظار",
            "tekst": "پس از یک دوره انتظار مشخص (بسته به حکم) می‌توانید دوباره درخواست بدهید."
          },
          {
            "naam": "جریمه‌های کوچک",
            "tekst": "جریمه‌های ترافیکی و تخلفات کوچک معمولاً محاسبه نمی‌شوند."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ با VluchtelingenWerk تماس بگیرید"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "بررسی کنید آیا سابقه جنایی دارید",
        "sub": "می‌توانید گواهی حسن سلوک (VOG) از justis.nl درخواست کنید تا ببینید چه چیزی ثبت شده است.",
        "alternatieven": [
          {
            "naam": "VOG درخواست کنید",
            "tekst": "از طریق justis.nl گواهی حسن سلوک (VOG) درخواست کنید."
          },
          {
            "naam": "رایگان برای دریافت‌کنندگان کمک مالی",
            "tekst": "اگر کمک مالی دریافت می‌کنید، VOG ممکن است رایگان باشد."
          },
          {
            "naam": "جریمه‌های کوچک محاسبه نمی‌شوند",
            "tekst": "جریمه‌های ترافیکی و تخلفات کوچک معمولاً محاسبه نمی‌شوند."
          },
          {
            "naam": "مشاوره حقوقی",
            "tekst": "در صورت شک: با یک مشاور حقوقی یا VluchtelingenWerk مشورت کنید."
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ VOG را در justis.nl درخواست کنید"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "محل سکونت اصلی‌تان باید در هلند باشد",
        "sub": "اگر عمدتاً در خارج زندگی می‌کنید، شرط اقامت برای تابعیت را برآورده نمی‌کنید.",
        "alternatieven": [
          {
            "naam": "محل سکونت اصلی را منتقل کنید",
            "tekst": "محل سکونت رسمی اصلی‌تان را به هلند منتقل کنید."
          },
          {
            "naam": "ثبت‌نام BRP",
            "tekst": "مطمئن شوید که در BRP شهرداری‌تان ثبت‌نام کرده‌اید."
          },
          {
            "naam": "سفر مجاز است",
            "tekst": "سفر گاه‌گاهی به خارج مشکلی نیست، تا زمانی که هلند پایگاه شما باشد."
          },
          {
            "naam": "اطلاعات بیشتر",
            "tekst": "از شهرداری‌تان درباره شرایط دقیق اقامت بپرسید."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ اطلاعات بیشتر در ind.nl"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "صرف‌نظر از تابعیت گام بزرگی است",
        "sub": "هلند معمولاً تابعیت مضاعف را مجاز نمی‌داند. استثناهایی وجود دارد — و اگر واقعاً نمی‌خواهید از تابعیت خود چشم‌پوشی کنید، یک جایگزین قوی وجود دارد. پیش از تصمیم‌گیری این را با دقت بخوانید.",
        "alternatieven": [
          {
            "naam": "استثنا برای دارندگان وضعیت",
            "tekst": "به‌عنوان پناهنده شناخته‌شده، مجبور به چشم‌پوشی از تابعیت خود نیستید."
          },
          {
            "naam": "استثنا: ناممکن",
            "tekst": "اگر چشم‌پوشی ناممکن یا خطرناک باشد، ممکن است استثنایی وجود داشته باشد."
          },
          {
            "naam": "استثنا: همسر هلندی",
            "tekst": "آیا با یک شهروند هلندی ازدواج کرده‌اید؟ در این صورت قوانین ویژه اعمال می‌شود."
          },
          {
            "naam": "جایگزین: مقیم بلندمدت اتحادیه اروپا",
            "tekst": "واقعاً می‌خواهید تابعیت خود را حفظ کنید؟ در این صورت \"مقیم بلندمدت اتحادیه اروپا\" اغلب قوی‌ترین جایگزین است. دکمه آبی زیر را ببینید."
          },
          {
            "naam": "مشاوره حقوقی",
            "tekst": "وضعیت خود را ارزیابی کنید — گاهی بیش از آنچه فکر می‌کنید ممکن است."
          }
        ],
        "link": "https://ind.nl/en/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ درباره مقیم بلندمدت اتحادیه اروپا در ind.nl بیشتر بخوانید",
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ببینید: مقیم بلندمدت اتحادیه اروپا (حفظ تابعیت)"
        }
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "راه‌هایی برای کاهش هزینه‌ها وجود دارد",
        "sub": "تابعیت €1.139 (انفرادی) یا €1.454 (با همسر) هزینه دارد — تعرفه 2026؛ تعرفه کاهش‌یافته €847/€1.163 برای دارندگان وضعیت پناهندگی/افراد بدون تابعیت. راه‌هایی برای مقرون‌به‌صرفه‌کردن آن وجود دارد.",
        "alternatieven": [
          {
            "naam": "تعرفه کاهش‌یافته پناهندگی/بدون تابعیت",
            "tekst": "آیا دارنده وضعیت پناهندگی یا بدون تابعیت هستید؟ در این صورت تعرفه کاهش‌یافته می‌پردازید: €847 (انفرادی) یا €1.163 (با همسر). شهرداری آن را بر اساس وضعیت شما اعمال می‌کند."
          },
          {
            "naam": "صندوق شهرداری",
            "tekst": "برخی شهرداری‌ها هزینه‌ها را (تا حدی) برای دارندگان وضعیت بازپرداخت می‌کنند."
          },
          {
            "naam": "کمک ویژه",
            "tekst": "برای هزینه، از شهرداری خود درخواست کمک ویژه (bijzondere bijstand) کنید."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "آن‌ها می‌دانند چه صندوق‌هایی در شهرداری شما موجود است."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ کمک هزینه از طریق VluchtelingenWerk"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "مقیم بلندمدت اتحادیه اروپا — اقامت دائم بدون چشم‌پوشی از تابعیت",
        "sub": "یک وضعیت اقامت دائم پس از 5 سال اقامت قانونی. تابعیت خود را حفظ می‌کنید و حقوق اقامت قوی و پایدار به دست می‌آورید. اکنون که اجازه پناهندگی نامعین لغو می‌شود، این اغلب مهم‌ترین جایگزین برای تابعیت است.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>چیست:</strong> می‌توانید به‌طور نامحدود در هلند زندگی و آزادانه کار کنید، و آسان‌تر به کشورهای دیگر اتحادیه اروپا نقل‌مکان کرده و کار کنید. سال‌های پناهندگی شما برای 5 سال محسوب می‌شوند؛ سال‌های تحصیل 50% محسوب می‌شوند."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>تفاوت مهم با تابعیت:</strong> برای این وضعیت یک <strong>شرط درآمد</strong> وجود دارد (درآمد مستقل، پایدار و کافی). اگر با کمک‌هزینه زندگی می‌کنید، اغلب آن را برآورده نمی‌کنید — و آنگاه تابعیت در واقع دسترس‌پذیرتر است، زیرا شرط درآمد ندارد."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>چه زمانی برای شما جالب است؟</strong> اگر نمی‌خواهید یا نمی‌توانید از تابعیت اول خود چشم‌پوشی کنید — برای تابعیت اصولاً باید این کار را کرد، اما اینجا خیر."
          },
          {
            "nr": 2,
            "tekst": "<strong>یا:</strong> اکنون که اجازه پناهندگی نامعین از بین می‌رود، این مسیری است از یک اجازه موقت (3 ساله) به یک حق اقامت پایدار."
          },
          {
            "nr": 3,
            "tekst": "<strong>شرایط:</strong> 5 سال اقامت قانونی بدون وقفه (سال‌های پناهندگی محسوب می‌شوند)، ادغام قبول‌شده (دست‌کم A2)، گذرنامه معتبر و درآمد مستقلِ پایدار و کافی."
          },
          {
            "nr": 4,
            "tekst": "<strong>درخواست:</strong> در IND. اگر برای یک اجازه نامعین درخواست دهید، IND به‌طور خودکار بررسی می‌کند که آیا می‌توانید وضعیت مقیم بلندمدت اتحادیه اروپا را هم بگیرید."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ درباره مقیم بلندمدت اتحادیه اروپا در ind.nl بیشتر بخوانید"
      }
    }
  },
  "TI": {
    "header": {
      "badge": "🇳🇱 መርመራ ዜጋነት",
      "titel": "ንናይ ሆላንድ ፓስፖርት ዝምልከት መሰል ኣለኒ ድዩ?",
      "sub": "ቅሩብ ሕቶታት መልሱ፡ ብመሰረት ናይ IND ኩነታት 2026 (ምስ ሓደስቲ ሕግታት ዑቕባ ሓዊሱ) ሕጂ ናይ ዜግነት ምልክታ ከተእቱ ትኽእል ምዃንካ ብቐጥታ ርአ።"
    },
    "vragen": {
      "v1": {
        "stap": "ስጉምቲ 1 ካብ 9",
        "tekst": "18 ዓመት ወይ ካብኡ ዝዓቢ ዕድሜ ኣለካ/ኺ ድዩ?",
        "uitleg": "ናይ ዜጋነት ምልክታ ዝቕርቡ ዓቢ/ዓባይ ዝኾኑ ሰባት ጥራይ እዮም። ቆልዑ ኣብ ትሕቲ ዕድሜ ናይ ወለዶም ኢዮም ዘካልዱ።",
        "antwoorden": [
          {
            "tekst": "እወ፡ 18 ዓመት ወይ ዝዓቢ ኣለኒ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "ኣይኮንኩን፡ ካብ 18 ዓመት ኣሕሽሽ እዩ ዕድሜይ",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "ስጉምቲ 2 ካብ 9",
        "tekst": "ናይ ሕጂ ናይ ምቕማጥ ሃለዋትካ/ኺ ኣብ ሆላንድ እንታይ ኣዩ?",
        "uitleg": "ኣብ ሆላንድ ዘለካ/ኺ ናይ ምቕማጥ ዓይነት ዝምልከት መንገዲ ይውስን። ናይ ኤሮጳ ሕብረት ዜጋታት ብሕጊ ኤሮጳ ሕብረት እዮም ዝቕመጡ — ብሆላንዳዊ ፍቓደ-ምቕማጥ ኣይኮነን።",
        "antwoorden": [
          {
            "tekst": "ናይ ሆላንድ ፍቓደ-ምቕማጥ ኣለኒ",
            "sub": "ወይ ናይ ዑቕባ ሃለዋት (IND ዓይነት III፡ IV ወይ V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "ናይ ኤሮጳ ሕብረት ዜጋ እየ (ለምሳሌ ሮማኒያዊ ወይ ፖለናዊ ፓስፖርት)",
            "sub": "ወይ ናይ EER / ሽዊዝ ዜጋ",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "ርግጸኛ ኣይኮንኩን/ኩኒን",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "ስጉምቲ 3 ካብ 9",
        "tekst": "ሕጋዊ ፍቓደ-ምቕማጥ ኣለካ/ኺ ድዩ?",
        "uitleg": "ቅቡል ናይ መንበሪ ፍቓድ የድልየካ። ናይ ዑቕባ ኩነታት (ናይ ዑቕባ መንበሪ ፍቓድ፡ ውሱን ወይ ዘይውሱን ግዜ) እውን ይቑጸር።<br><br>📌 <strong>ካብ 12 ሰነ 2026 ጀሚሩ (ናይ ክልተ ኩነታት ስርዓት):</strong> ሓደስቲ ናይ ዑቕባ ፍቓዳት ሕጂ ኣብ ክንዲ 5 ዓመት ዝለዓለ 3 ዓመት ይጸንሑ፡ ናይ ዘይውሱን ግዜ ናይ ዑቕባ ፍቓድ ድማ ኣይውሃብን እዩ። <em>መሰጋገሪ ሕጊ:</em> ኣብ 12 ሰነ 2026 ናይ ዑቕባ ፍቓድ (5 ዓመት ወይ ዘይውሱን) ነይሩካ ዶ? እምበኣር እቲ ሰነድ ቅቡል ክሳዕ ዝኾነ እዞም መሰላት ትሕዝ። ንዜግነት እቲ ዝያዳ ኣገዳሲ ነገር መንበሪኻ <strong>ዘይተቛረጸ</strong> ምዃኑ እዩ — ስለዚ ናይ 3 ዓመት ፍቓድካ ኩሉ ግዜ ብግዜኡ ኣሕድስ።",
        "antwoorden": [
          {
            "tekst": "እወ፡ ሕጋዊ ፍቓደ-ምቕማጥ ኣለኒ",
            "sub": "ወይ ናይ ዑቕባ ሃለዋት (IND ዓይነት III፡ IV ወይ V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "ኣይፋሉን፡ ሕጋዊ ፍቓደ-ምቕማጥ የብለይን",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "ስጉምቲ 4 ካብ 9",
        "tekst": "ካብ ክንደይ እዋን ኣቢሉ ብዘይምቁራጽ ኣብ ሆላንድ ትቕመጥ/ትቕመጢ ኣለኻ/ኺ?",
        "uitleg": "ኣብዚ እዋን ኣብ ሆላንድ እንተወሓደ 5 ዓመት ተኸታታሊ ክትነብር ኣለካ። ሓጸርቲ ናብ ወጻኢ ዝግበሩ ጉዕዞታት ነዚ ኣይቋርጹን።<br><br>⚠️ <strong>ኣቓልቦ — ክኽሰት ዝኽእል ለውጢ:</strong> መንግስቲ ነዚ ግዜ ካብ 5 ናብ 10 ዓመት (ንመጻምድቲ ሆላንዳውያን ድማ ካብ 3 ናብ 5 ዓመት) ከናውሖ ይደሊ። እዚ እማመ ገና ኣይጸደቐን፡ ስለዚ ብሕጊ ገና 5 ዓመት እዩ ዝሰርሕ — ግን እቲ ቅድመ-ኩነት ክቕየር ከም ዝኽእል ኣብ ግምት ኣእቱ። ብዝኾነ መንበሪኻ ዘይተቛረጸ ሓዞ።",
        "antwoorden": [
          {
            "tekst": "ካብ 5 ዓመት ኣሕሽሽ",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "5 ዓመት ወይ ካብኡ ንላዕሊ",
            "sub": "ብዘይምቁራጽ ኣብ ሆላንድ ምቕማጥ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "ስጉምቲ 5 ካብ 9 — ምውህሃድ",
        "tekst": "ናይ ምውህሃድ (inburgering) ሃለዋትካ/ኺ እንታይ ኣዩ?",
        "uitleg": "ንዜጋነት ምውህሃድካ/ኺ ከተረጋግጽ/ጺ ኣለካ/ኺ። ክልተ ወይ ዝዛይድ ኣገባባት ኣለዉ።",
        "antwoorden": [
          {
            "tekst": "ናይ ምውህሃድ ፈተና ሓሊፈ (B1 ወይ ናይ ትምህርቲ መስርሕ)",
            "sub": "DUO ዲፕሎማ ምውህሃድ ኣሎ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "ናይ ሆላንዳዊ ቋንቋ MBO 2፡ 3 ወይ 4 ዲፕሎማ ኣሎኒ — ወይ HBO / WO",
            "sub": "እዚ ካብ ናይ ምውህሃድ ግዴታ ዘለዓለማዊ ናጻነት ይህብ",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "ካብ ምውህሃድ ናጻ ዝኾንኩ/ኩኒ",
            "sub": "ንኣብነት ብሕክምናዊ ምኽንያት ወይ ብናይ DUO ናጻ-ምግባር (ontheffing) ብሰንኪ ዝረአ ጻዕሪ (እዚ ንዜግነት ይቑጸር ድዩ ኣይቁጸርን ምምሕዳር ይውስን)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Z-መስርሕ ወዳእኩ/ዊ (ናይ መወዳእታ ዕላልን ምስክር ወረቐትን)",
            "sub": "ኣስተብህሉ፡ እዚ ናይ ዜጋነት መሰል ብኣውቶማቲክ ኣይህብን — ምርጫታትካ/ኺ ርኣ/ርኣዪ",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "ሕጂ ድማ ኣብ ናይ ምውህሃድ ሂወት ኣለኹ/ኺ",
            "sub": "ዲፕሎማ ወይ ናጻነት ገና የብለይን",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "ስጉምቲ 5 ካብ 9 — Z-መስርሕ",
        "tekst": "Z-መስርሕ ወዲእካ/ኢኺ — ንዜጋነት ሓደ ተወሳኺ ስጉምቲ ዘድሊ ኣዩ",
        "uitleg": "መገዲ Z ብናይ መወዳእታ ቃለ-መሕትትን ምስክር ወረቐትን ይዛዘም፡ ግን ንዜግነት IND ተወሳኺ ናይ ቋንቋ ቅድመ-ኩነታት የተግብር። ኮይኑ ግን ንዜግነት ክትበቅዕ ሰለስተ መንገድታት ኣለዉ:<br><br><strong>መንገዲ A — ኮይኑ ግን ፈተና ኣብ A2 ደረጃ ምሕላፍ</strong><br>ኩሎም ናይ ቋንቋ ፈተናታት ኣብ A2 ደረጃ (ምንባብ፡ ምስማዕ፡ ምጽሓፍ፡ ምዝራብ)ን ናይ KNM ፈተናን ሕለፍ። ኣቓልቦ: መገዲ Z ምስ ተወድአ ናይ ፈተና ፈተነታት ብናጻ ኣይኮናን።<br><br><strong>መንገዲ B — 600 ሰዓት ናይ ቋንቋ ትምህርቲ + ኣብ ነፍሲ ወከፍ ክፋል እንተወሓደ 3 ፈተነ</strong><br>ኣብ Blik op Werk ምስክርነት ዘለዎ ትካል እንተወሓደ 600 ሰዓት ናይ A2 ደረጃ ትምህርትን ኣብ ነፍሲ ወከፍ ክፋል 3 ፈተነን? እምበኣር DUO ናይ ናጻ-ምግባር ለበዋ ክህብ ይኽእል።<br><br><strong>መንገዲ C — 600 ሰዓት ፊደል-ምልላይ + ናይ DUO ፈተና (€150)</strong><br>እንተወሓደ 600 ሰዓት ፊደል-ምልላይ ጌርካ A2 ክብጻሕ ዘይከኣል ኮይኑ እንተተረኺቡ? እምበኣር ብናይ DUO ፈተና (€150) ናጻ-ምግባር ይስዕብ።<br><br><em>ኣብ መጻኢ ክኽሰት ዝኽእል:</em> መንግስቲ ናይ ቋንቋ ቅድመ-ኩነት ንዜግነት ካብ A2 ናብ B1 ክብ ከብሎ ይደሊ። እዚ ገና ኣይጸደቐን — ኣብዚ እዋን ገና A2 እዩ ዝሰርሕ።<br><br>💡 ምስ ምምሕዳርካ ወይ ምስ VluchtelingenWerk ኣየናይ መንገዲ ዝበለጸ ከም ዝሰማማዓካ ተዘራረብ።",
        "antwoorden": [
          {
            "tekst": "ተረዲኤ/ኤ — ናብ ዝተረፉ ኩነታት ቀጽሉ",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "ስጉምቲ 5 ካብ 9 — ናይ ትምህርቲ መስርሕ",
        "tekst": "ኣየናይ ናይ ምውህሃድ መስርሕ ትኽተሎ/ሊ ኣለኻ/ኺ?",
        "uitleg": "ምምሕዳር ከቲ ናይ ትምህርቲ ዓቅምኻ/ኺ ብምርኣይ ናይ ትምህርቲ መስርሕካ/ኺ ይወስን። ሰለስተ መስርሓት ኣለዉ፡ B1፡ ናይ ትምህርቲ መስርሕን Z-መስርሕን።",
        "antwoorden": [
          {
            "tekst": "B1-መስርሕ",
            "sub": "ናይ ቋንቋ ፈተና ኣብ B1 ደርጃ + KNM ፈተና",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "ናይ ትምህርቲ መስርሕ",
            "sub": "ናይ ቋንቋ ምስግጋር ፕሮግራም 1.5–2 ዓመት — ናይ MBO/HBO/WO ምስልሳል",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "Z-መስርሕ (ናይ ርእሰ-ምምርሓ መስርሕ)",
            "sub": "ንደቀ ሰባት B1 ዘይክስሕ ዝኾኖ",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "ኣይፈልጥን / ገና ናይ ትምህርቲ መስርሕ የብለይን",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "ስጉምቲ 5 ካብ 9 — Z-መስርሕ",
        "tekst": "ኣብ Z-መስርሕ ክሳብ ኣበይ ወሲድካ/ኢኺ?",
        "uitleg": "Z-መስርሕ ኣብ ምምሕዳር ከቲ ናይ መወዳእታ ዕላልን ናይ DUO ኣወንታዊ ምኽሪን ምስ ወዳእካ ይዛዘም። ክልቲኡ ንዜጋነት ዘድሊ ኣዩ።",
        "antwoorden": [
          {
            "tekst": "Z-መስርሕ ወዲኤ (DUO ኣወንታዊ ምኽሪ ተቐቢለ)",
            "sub": "ምስ ምምሕዳር ከቲ ናይ መወዳእታ ዕላል ተወዲኡ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "ሕጂ ድማ ኣብ Z-መስርሕ ኣለኹ/ኺ",
            "sub": "ናይ 800 ሰዓት ናይ ቋንቋ ትምህርቲ / ምክፋል ገና ኣይወዳእኩን/ን",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "ስጉምቲ 6 ካብ 9",
        "tekst": "ኣብ ዝሓለፉ 5 ዓመታት ብዝኾነ ወንጀል ተፈሪድካ/ኢኺ ዶ?",
        "uitleg": "ናይ ወንጀል ፍርዲ ናይ ዜጋነት ምልክታ ክዓጹ ይኽእል። ናይ ትራፊክ ቅጻዓትን ንኣሽቱ ምጥሓሳትን ብዙሕ ኣይሕሰቡን።",
        "antwoorden": [
          {
            "tekst": "ኣይፋሉን፡ ናይ ወንጀል ዝርዝር የብለይን",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "እወ፡ ብወንጀል ተፈሪደ",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "ርግጸኛ ኣይኮንኩን/ኩኒን",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "ስጉምቲ 7 ካብ 9",
        "tekst": "ናይ ሕጂ ቀንዲ ቤትካ/ኺ ኣብ ሆላንድ ዶ ኣዩ?",
        "uitleg": "ቀንዲ ቤትካ/ኺ ኣብ ሆላንድ ክኸውን ኣለዎ። ሓደ ሓደ ግዜ ናብ ደገ ምኻድ ጸገም ኣይፈጥርን።",
        "antwoorden": [
          {
            "tekst": "እወ፡ ብቐጻሊ ኣብ ሆላንድ እቕመጥ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "ኣይፋሉን፡ ብዛዕባ ኣብ ካልእ ሃገር ዝቕመጥ",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "ስጉምቲ 8 ካብ 9",
        "tekst": "ናይ ሕጂ ዜግነትካ/ኺ ንምውጻእ ድሉው/ዊ ዲኻ/ዲኺ?",
        "uitleg": "ሆላንድ ብዙሕ ዜግነት ዝፈቕድ ኣይኮነን። ናጻ ምፍቓድ፡ ፍሉይ ሃለዋት ዘለዎም ዑቕበኛታት ክልተ ዜግነት ክሕዙ ይኽእሉ።",
        "antwoorden": [
          {
            "tekst": "እወ፡ ዜግነተይ ኣወጽእ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "ዕዉት ዑቕበኛ እየ (ናይ ሃለዋት ዋናታት)",
            "sub": "ናይ ሃለዋት ዋናታት ክልተ ዜግነት ክሕዙ ይኽእሉ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "ኣይፋሉን፡ ዜግነተይ ክሕዞ/ዞ እደሊ",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "ስጉምቲ 9 ካብ 9",
        "tekst": "ናይ ዜጋነት ዋጋ ትፈልጦ/ሊ ዲኻ/ዲኺ?",
        "uitleg": "እቲ ምልክታ ንሓደ ሰብ €1.139፡ ምስ መጻምድቲ ድማ €1.454 ይውድእ (ናይ 2026 ዋጋ)። ንዓይነት ዑቕባ ዘለዎምን ዜግነት ዘይብሎምን ዝተሓተ ዋጋ ይትግበር: €847 (ብውልቂ) ወይ €1.163 (ምስ መጻምድቲ)። እቲ መስርሕ ብማእከላይ 6–12 ወርሒ ይወስድ።",
        "antwoorden": [
          {
            "tekst": "እወ፡ ፈሊጠ ቀጺለ ክኸይድ እደሊ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "ዋጋ ኣዝዩ ብዙሕ ኣዩ — ሓገዝ ኣሎ ዶ?",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "ምናልባሽ መሰል ኣለካ/ኺ!",
        "sub": "ናብ ሕቶታትካ/ኺ መሰረት ናይ ዜጋነት ቀንዲ ኩነታት ዘማልእ/እ ትኸውን ዘለካ/ኺ። ዝቕጽል ስጉምቲ ናብ ምምሕዳር ከቲ ናይ ወግዓዊ ምልክታ ምቕራብ ኣዩ።",
        "info": "💡 ናይ ሃለዋት ዋናታት (ዕዉት ዑቕበኛታት) ብዙሕ ኣብ ብዙሕ ሃለዋት ናይ ኦሪጂናሎም ዜጋነት ንምውጻእ ኣይጸናሕዎምን።",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>ናብ ምምሕዳር ከቲ ቆጸራ ሓዝ/ሒዚ</strong> — ናይ ዜጋ ጉዳይ ክፍሊ። ናይ ዜጋነት ምልክታ ክቕርብ/ቕርቢ ምዃንካ/ኺ ሓብሮ/ሪ።"
          },
          {
            "nr": 2,
            "tekst": "<strong>ሰነዳት ኣዳልዋ፡</strong> ሕጋዊ ፓስፖርት፡ ፍቓደ-ምቕማጥ፡ ምስክር ምውህሃድ፡ ናይ ልደት ምስክር (ምስ ዘድሊ ተፈቒዱ)።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ክፍሊት ክፈል:</strong> ኣብ ምቕራብ €1.139 (ውልቂ) ወይ €1.454 (ምስ መጻምድቲ) — ናይ 2026 ዋጋ። ዓይነት ዑቕባ ዘለካ ወይ ዜግነት ዘይብልካ ዲኻ? እምበኣር ዝተሓተ ዋጋ ይትግበር: €847 (ውልቂ) ወይ €1.163 (ምስ መጻምድቲ)። ምምሕዳርካ ናይ ሓገዝ መደብ እንተሃልዩ ሕተት።"
          },
          {
            "nr": 4,
            "tekst": "<strong>ናይ IND ውሳኔ ጸናሕ፡</strong> ብሓሙሽ ናብ 6–12 ወርሒ ዝወስድ ኣዩ።"
          },
          {
            "nr": 5,
            "tekst": "<strong>ናይ ዜጋነት ሓፈሻ፡</strong> ምስ ተቐበለ ናይ ሓፈሻ ዕድመ ካብ ምምሕዳር ከቲ ትቕበሎ/ሊ።"
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ኣብ ind.nl ዝያዳ ሓበሬታ"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "ናይ ኤሮጳ ሕብረት ዜጋ ከም ዝኾንካ/ኩኒ ፍሉይ መሰላት ኣለካ/ኺ",
        "sub": "ናይ ሆላንድ ዜጋነት ምስምሳ ይከኣል፡ ግን ኣብዚ ምቕማጥን ምስራሕን ናይ ሆላንድ ዜጋነት ኣይጠልብን። ናይ ኤሮጳ ዜጋ ከምዝኾንካ/ኩኒ ሕጂ ኣብ ሆላንድ ዓቢ መሰላት ኣለካ/ኺ።",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>ናይ ኤሮጳ ዜጋ መሰላት፡</strong> ናይ ሮማኒያ ወይ ፖለናዊ ዜጋ ከምዝኾንካ/ኩኒ ብዘይ ፍቓደ-ምቕማጥ ኣብ ሆላንድ ናይ ምቕማጥ፡ ምስራሕን ምምሃርን መሰል ኣለካ/ኺ። ኣብ ምምሕዳር ከቲ (BRP) ትምዝገቡ፡ ግን ናይ IND ፍቓደ-ምቕማጥ ኣየድሊን።"
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>ብዛዕባ ድርብ ዜግነት ኣቓልቦ:</strong> እቲ ቀንዲ ሕጊ፡ ኣብ ዜግነት ካብ ሮማንያዊ ወይ ፖላንዳዊ ዜግነትካ ከም ትሓድግ እዩ። ኮይኑ ግን: ሃገርካ ምሕዳግ ዘይትፈቅድ እንተኾይና ወይ ዘይከኣል እንተኾይኑ፡ ኣብ ሕጋዊ ኣግላልነት ትኣቱ ክልቲኡ ዜግነት ድማ ክትሕዝ ትኽእል። ኣብ ኤምባሲ ምሕዳግ ኣብ ኩነታትካ ግዴታን ዝከኣልን እንተኾይኑ ሕተት።"
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>ዜጋነት ምምስርሕ ትደሊ/ሊ?</strong> ሓፈሻዊ ኩነታት ናይ ኤሮጳ ዜጋ ድማ ይምልከቶም፡ 5 ዓመት ምቕማጥ፡ ምውህሃድ፡ ናይ ወንጀል ዝርዝር ዘይምህላው፡ ዜጋነት ምውጻእ።"
          },
          {
            "nr": 2,
            "tekst": "<strong>ድርብ ዜግነት:</strong> ኣብ ሮማንያ ወይ ፖላንድ ኤምባሲ ክትሓድግ ግድን ድዩን ክትሓድግ ትኽእል ድዩን ሕተት። ክትሓድግ እንተዘይክኢልካ፡ ብሕጋዊ ኣግላልነት ዜግነትካ ትሕዝ። ሕግታት ካብ ሃገር ናብ ሃገር ይፈላለ።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ቀጺልካ ምምስርሕ ትደሊ/ሊ?</strong> ናይ ምምርማር ኣሳሒ ብምጥቃም ናይ ምቕማጥ ሃለዋት ኣብ \"ፍቓደ-ምቕማጥ\" ምምራጽ — ዝተረፉ ኩነታት ናይ ኤሮጳ ዜጋ ድማ ይምልከቶም።"
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ናይ ዜጋነት ሓበሬታ ኣብ ind.nl"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "ናይ ቆልዑ ዜጋነት ብወለዶም ኣቢሉ ኣዩ ዝምስርሕ",
        "sub": "ትሕቲ ዕድሜ ዝኾኑ ቆልዑ ምስ ወለዶም ናይ ሆላንድ ዜጋነት ምልክታ ምስ ዝቐርቡ ወይ ናይ ሆላንድ ዜጋ ምስ ዝኾኑ ሓቢሮም ዜጋ ክኾኑ ይኽእሉ።",
        "alternatieven": [
          {
            "naam": "ምስ ወለዶም ዜጋ ምዃን",
            "tekst": "ወለዲ ምስ ዜጋ ዝኾኑ ደቆም ብኣውቶማቲክ ዜጋ ክኾኑ ይኽእሉ።"
          },
          {
            "naam": "ብፍርዳዊ ቤት",
            "tekst": "ሓደ ሓደ ሃለዋት ናይ ቆልዑ ፍሉይ ዜጋነት ይከኣሎ።"
          },
          {
            "naam": "ሳብ 18 ምጽባይ",
            "tekst": "ኣብ 18 ዕድሜ ብናጻ ምልክታ ምቕራብ ይከኣሎ።"
          },
          {
            "naam": "ናይ ምምራጽ ስጉምቲ",
            "tekst": "ኣብ ሆላንድ ምስ ትወለድ/ዲ ሓደ ሓደ ግዜ \"ምምራጽ\" ብምጥቃም ናይ ሆላንዳዊ ምዃን ይከኣሎ።"
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ ኣብ ind.nl ዝያዳ ሓበሬታ"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "ቅድሚ ዝኾነ ፍቓደ-ምቕማጥ ዘድሊካ/ኺ",
        "sub": "ዜጋነት ሕጋዊ ኣብ ሆላንድ ምቕማጥ ጥራይ ኣዩ ዝከኣሎ። ቅድሚ ሕጋዊ ፍቓደ-ምቕማጥ ምርካብ ዘድሊ።",
        "alternatieven": [
          {
            "naam": "ናይ ዑቕባ ምልክታ",
            "tekst": "ሓለዋ ምስ ዘድልየካ/ኺ ናብ IND ናይ ዑቕባ ምልክታ ምቕራብ ይከኣሎ።"
          },
          {
            "naam": "ናይ ሰርሓ ፍቓደ-ምቕማጥ",
            "tekst": "ንስራሕ፡ ትምህርቲ ወይ ናይ ስድራቤት ምምጻእ ፍቓዳት ኣለዉ።"
          },
          {
            "naam": "ሕጋዊ ሓገዝ",
            "tekst": "ናይ ዑቕበኛ ትካልን ወይ ጠበቓን ርኸቦ/ቢ።"
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "ናይ ዑቕባ ሰሪሖምን ናይ ሃለዋት ዋናታትን ናጻ ሕጋዊ ሓገዝ።"
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ ምስ VluchtelingenWerk ርኸቦ/ቢ"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "ገና እኹል ግዜ ኣብ ሆላንድ ኣይተቐመጥካን",
        "sub": "ኣብዚ እዋን ኣብ ሆላንድ ብቕቡል መንበሪ እንተወሓደ 5 ዓመት ተኸታታሊ ክትነብር ኣለካ። ካብ ናይ 2026 ሓደስቲ ሕግታት ዑቕባ ጀሚሩ፡ ኣብ እዋን ምጽባይ ከተቕልበሎም ዘለካ ቅሩብ ነገራት ኣለዉ። ነቲ ናይ ምጽባይ ግዜ ጽቡቕ ጌርካ ክትጥቀመሉ ትኽእል።",
        "alternatieven": [
          {
            "naam": "ፍቓድካ ብግዜኡ ኣሕድስ",
            "tekst": "ሓደስቲ ናይ ዑቕባ ፍቓዳት ዝለዓለ 3 ዓመት ይጸንሑ፤ ስለዚ ብግዜኡ ኣሕድስ። ኣብ መንጎ ክልተ ፍቓዳት ቅቡል ፍቓድ ዘይብልካ \"ናይ መንበሪ ጋግ\" (verblijfsgat) እንተተፈጢሩ — እቲ ግዜ ከም ሕጋዊ መንበሪ ኣይቑጸርን፡ እቲ ናይ 5 ዓመት ቆጸራ ንዜግነት ድማ ካብ ብሓድሽ ክጅምር ይኽእል። ስለዚ ናይ ምሕዳስ ምልክታ ድሕሪ ምውዳቕ ኣብ ውሽጢ 4 ሰሙን ኣብጽሕ: ሽዑ IND ከም ናይ መንበሪ ጋግ ኣይርእዮን።"
          },
          {
            "naam": "ደጊም ናይ ዘይውሱን ግዜ የለን",
            "tekst": "ናይ ዘይውሱን ግዜ ናይ ዑቕባ ፍቓድ ደጊም ኣይውሃብን። ንዜግነት ጸገም የለን: ካብ ቅቡል ግዝያዊ ፍቓድ ተበጊስካ ዜግነት ክትረክብ ትኽእል።"
          },
          {
            "naam": "ናይ ዜግነት ግዜ: ምናልባት 10 ዓመት",
            "tekst": "ኣቓልቦ: እዚ ቅድሚ ዜግነት ምርካብ ዘሎ ናይ ምጽባይ ግዜ እዩ ዝምልከት፡ ናይ መንበሪ ፍቓድካ ኣይኮነን። መንግስቲ ነዚ ናይ ዜግነት ግዜ ካብ 5 ናብ 10 ዓመት ከናውሖ ይደሊ። ገና ኣይጸደቐን፡ ግን ኣብ ግምት ኣእቱ። ምስ ሆላንዳዊ መጻምድቲ እቲ ግዜ ክሓጽር ይኽእል — ንምምሕዳር ሕተት።"
          },
          {
            "naam": "ኣማራጺ: ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ",
            "tekst": "ሕጂ ናይ ዘይውሱን ግዜ ዑቕባ ፍቓድ ስለ ዝስረዝ፡ ድሕሪ 5 ዓመት \"ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ\" ኩነታት ኣገዳሲ ኣማራጺ እዩ: ናይ ገዛእ ርእስኻ ዜግነት ትሕዝ ብርቱዕ ናይ መንበሪ መሰላት ድማ ትረክብ። <strong>ኣገዳሲ: ኣብዚ ናይ እቶት ቅድመ-ኩነት ኣሎ</strong> — ስራሕን ቀዋምን እኹልን ናይ ገዛእ ርእስኻ እቶትን ኣብዚ ብዙሕ ክብደት ኣለዎም። ነቲ ኣብ ታሕቲ ዘሎ ሰማያዊ መልጎም ርአ።"
          },
          {
            "naam": "ምውህሃድ ወድእ",
            "tekst": "ነቲ ናይ ምጽባይ ግዜ ናይ ምውህሃድ ፈተናኻ ንምሕላፍ ተጠቐመሉ — ንዜግነት ጽኑዕ ቅድመ-ኩነት እዩ።"
          },
          {
            "naam": "ሰነዳት ኣክብ",
            "tekst": "ካብ ሃገር መበቆልካ ወግዓዊ ሰነዳት ኣቐዲምካ ሕተት፡ ሆላንድኛኻ ድማ ኣመሓይሽ፡ ንኣብነት ኣብ Blik op Werk ምስክርነት ዘለዎ ትካል ብናይ ቋንቋ ኮርስ።"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ርአ: ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (ድሕሪ 5 ዓመት ቀዋሚ መንበሪ)"
        },
        "link": "https://ind.nl/en/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/new-laws-and-regulations-on-asylum-and-family-reunification",
        "linkTekst": "→ ናይ 2026 ሓደስቲ ሕግታት ዑቕባ ኣብ ind.nl ርአ"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "ናይ ዜጋነት ምስምሳ ቅድሚ ምጅማር ክትዳሎ/ሊ ትኽእሎ/ሊ",
        "sub": "B1-መስርሕ ትኽተሎ/ሊ ኣለካ/ኺ ግን ፈተናካ/ኺ ገና ኣይወዳእካን/ዊ። ናይ ዜጋነት ምስምሳ ቅድሚ ምጅማር ይከኣሎ — ናይ IND ዉሳኔ ምምጻኡ ዲፕሎማ ድሮ ክቀርብ ኣለዎ።",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>ምኽሪ፡</strong> ምምሕዳር ከቲ B1-መስርሕ ትዛዝም ዘለካ/ኺ ምስ ዝሆን ናይ ዜጋነት ምልክታ ቅድሚ ምቕራብ ምጽናሕ ትኽእሎ/ሊ ዲኻ/ዲኺ ሕቱ/ቲ።"
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>B1-መስርሕ ቀጽሎ/ሊ፡</strong> ናይ ቋንቋ ፈተና (B1 ወይ ዝተረጋገጸ ጻዕሪ ምስ ዝህሉ A2) ምስ KNM ፈተና ሓሊፎ/ፊ።"
          },
          {
            "nr": 2,
            "tekst": "<strong>ሰነዳት ቅድሚ ምሕታት፡</strong> ፓስፖርት፡ ናይ ልደት ምስክር፡ ፍቓደ-ምቕማጥ።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ምምሕዳር ከቲ ሕቱ/ቲ</strong> ኣብ ናይ ትምህርቲ ዝለካ/ኺ ምስ ዝሆን ምልክታ ምቕራብ ዝከኣሎ ምዃኑ።"
          },
          {
            "nr": 4,
            "tekst": "<strong>ዲፕሎማ ምስ ተቐበልካ/ዊ፡</strong> ምስክር ናብ ምምሕዳር ከቲ / IND ለዓዮ/ዪ — ዉሳኔ ምስ ዝምጻእ ክወሃብ ይኽእሎ።"
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ኣብ ind.nl ዝያዳ ሓበሬታ"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "ናይ ዜጋነት ምስምሳ ቅድሚ ምጅማር ክትዳሎ/ሊ ትኽእሎ/ሊ",
        "sub": "ናይ ትምህርቲ መስርሕ ትኽተሎ/ሊ ኣለካ/ኺ — ናብ MBO፡ HBO ወይ WO ምስልሳል ዝብህ 1.5–2 ዓመት ናይ ቋንቋ ምስግጋር ፕሮግራም።",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>ኣቓልቦ:</strong> ዝኾነ ናይ ምውህሃድ መገዲ ብባዕሉ \"ናጻ-ምግባር\" ኣይህብን። ነቲ ናይ ትምህርቲ መገዲ ብዓወት ምስ ወዳእካ — ማለት ነቶም ዘድልዩ ናይ ቋንቋ ፈተናታት (B1: ምንባብ፡ ምስማዕ፡ ምጽሓፍ፡ ምዝራብ)ን ናይ KNM ፈተናን ምስ ሓለፍካ — ናይ ምውህሃድ ግዴታኻ ተማልእ። እዚ ድማ ነቲ ናይ ዜግነት ቅድመ-ኩነት ምውህሃድ የማልእ። ስለዚ እቲ ናይ ትምህርቲ መገዲ ባዕሉ ናይ ቋንቋ መደብ እዩ፡ ናይ MBO ወይ HBO ዲፕሎማ ኣይኮነን።"
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>ምኽሪ፡</strong> ናይ ዜጋነት ምስምሳ ቅድሚ ምጅማር ይከኣሎ። ናይ IND ዉሳኔ ምምጻኡ ናይ ምውህሃድ ዲፕሎማ ድሮ ክቀርብ ኣለዎ።"
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>ናይ ትምህርቲ መስርሕ ዛዝሞ/ሚ፡</strong> ናይ ቋንቋ ፈተና (ምንባብ፡ ምስማዕ፡ ምጽሓፍ፡ ምዝራብ ኣብ B1) ምስ KNM ፈተና ሓሊፎ/ፊ።"
          },
          {
            "nr": 2,
            "tekst": "<strong>ሰነዳት ቅድሚ ምሕታት፡</strong> ፓስፖርት፡ ናይ ልደት ምስክር፡ ፍቓደ-ምቕማጥ።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ምምሕዳር ከቲ ሕቱ/ቲ</strong> መስርሕ ዝለካ/ኺ ምስ ዝሆን ምልክታ ምቕራብ ዝከኣሎ ምዃኑ።"
          },
          {
            "nr": 4,
            "tekst": "<strong>ዲፕሎማ ምስ ተቐበልካ/ዊ፡</strong> ምስክር ናብ ምምሕዳር ከቲ / IND ለዓዮ/ዪ።"
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ኣብ ind.nl ዝያዳ ሓበሬታ"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "ካብ Z-መስርሕ ዜጋነት — ኣዚዩ ዘገምደ ፍልልይ",
        "sub": "Z-መስርሕ ምዝዛም ናይ ዜጋነት ናይ ምውህሃድ ጠለብ ብኣውቶማቲክ ዘሟልእ ኣይኮነን። ብ DUO ሰለስተ መንገድታት ኣለዉ።",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>ኣገዳሲ:</strong> መገዲ Z ናይ ፈተና ግዴታ የብሉን፡ ናይ ጻዕሪ ግዴታ እዩ ዘለዎ (800 ሰዓት ናይ ቋንቋ ትምህርቲ + ናይ መወዳእታ ቃለ-መሕትት)። ስለዚ ምውዳኡ <em>ብኣውቶማቲክ</em> ናይ ዜግነት መሰል ኣይህብን። ብተወሳኺ ናይ DUO ናጻ-ምግባር ለበዋ ወይ ዝሓለፈ ናይ A2 ፈተና የድልየካ።<br><br><em>ኣብ መጻኢ ክኽሰት ዝኽእል:</em> መንግስቲ ናይ ቋንቋ ቅድመ-ኩነት ንዜግነት ካብ A2 ናብ B1 ክብ ከብሎ ይደሊ። እዚ ገና ኣይጸደቐን — ኣብዚ እዋን ገና A2 እዩ ዝሰርሕ።"
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "ናይ ምውህሃድ ፈተና ኣብ A2 ደርጃ ምሕላፍ",
            "tekst": "ኩሎም ናይ ቋንቋ ፈተናታት ኣብ A2 (ምንባብ፡ ምስማዕ፡ ምጽሓፍ፡ ምዝራብ) ምስ KNM ፈተና ሓሊፎ/ፊ። ምስ ሓለፍካ/ዊ DUO ዲፕሎማ ኣለካ/ኺ ናይ ዜጋነት ናይ ምውህሃድ ጠለብ ትማልእ/እ።"
          },
          {
            "nr": "B",
            "titel": "600 ሰዓት ናይ ቋንቋ ትምህርቲ (A2) + ነናብ ፈተና ክፍሊ 3 ፈቲናታት",
            "tekst": "ቅናት 600 ሰዓት A2 ናይ ቋንቋ ትምህርቲ ኣብ Blik op Werk ምስ ዝተቐበለ ትካልን ነናብ ክፍሊ 3 ፈቲናታት (ናይ A2 ፈተና ሓደ ምስ ዝህሉ)? DUO ናጻነት ምኽሪ ክህብ ይኽእሎ — ፈተና ዘይሓለፍካ/ዊ ምስ ትኸውን/ኢ እውን።"
          },
          {
            "nr": "C",
            "titel": "600 ሰዓት ምምሃር / ናይ ቋንቋ ትምህርቲ + DUO ፈተና (150 ዩሮ)",
            "tekst": "ቅናት 600 ሰዓት ምምሃር ኣብ Blik op Werk ምስ ዝተቐበለ ትካል ምስ DUO ፈተና A2 ዘይክስሕ ምዃኑ ምስ ዘርኢ — ናጻነት ይወሃብ። DUO ፈተና €150 ዋጋ ኣለዎ።"
          }
        ],
        "info": "📞 <strong>ምኽሪ፡</strong> ምስ ምምሕዳር ከቲ ወይ VluchtelingenWerk ናብ ናትካ/ኺ ሃለዋት ዝምጥን መስርሕ ምምርሓ ዘቤ ዛተ/ዪ።",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ ብ VluchtelingenWerk ሓገዝ"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "ንዜጋነት ምውህሃድ ዘድሊካ/ኺ",
        "sub": "ብዘይ ናይ ምውህሃድ ዲፕሎማ ወይ ናጻነት ናይ ዜጋነት ምልክታ ምቕራብ ኣይከኣልን። ሕጂ ጀምሮ/ሪ — ኣብ 1 ክሳብ 3 ዓመት ክትዳሎ/ሊ ትኽእሎ/ሊ።",
        "alternatieven": [
          {
            "naam": "ናይ ትምህርቲ መገድኻ ሕተት",
            "tekst": "ኣየናይ መገዲ ከም ዝሰማማዓካ ንምፍላጥ ናብ ምምሕዳርካ ኪድ (B1፡ ናይ ትምህርቲ መገዲ ወይ መገዲ Z)።"
          },
          {
            "naam": "ናይ ቋንቋ ትምህርቲ ጀምር",
            "tekst": "ኣብ Blik op Werk ምስክርነት ዘለዎ ትካል ናይ ቋንቋ ትምህርቲ ውሰድ። ንምምሕዳርካ ብዛዕባ እቶም ተኽእሎታትን ክፍሊት ምምላስን ሕተት።"
          },
          {
            "naam": "ንፈተና ምልክታ ኣእቱ",
            "tekst": "እኹል ሆላንድኛ ትዛረብ እንተኾንካ፡ ብቐጥታ ብ DUO ኣቢልካ ንፈተና ምልክታ ከተእቱ ትኽእል።"
          },
          {
            "naam": "ናጻ-ምግባር (vrijstelling) ወይ ናጻ-ምውጻእ (ontheffing)?",
            "tekst": "ናጻ-ምግባር (vrijstelling) ብሆላንድኛ ዲፕሎማ (MBO-2 ወይ ላዕሊ፡ HBO ወይ WO) እንተሃልዩካ ይከኣል። ብሕማም ወይ ስንክልና ብሓቂ ክትወሃሃድ ዘይትኽእል እንተኾንካ፡ DUO ብሕክምናዊ ምኽንያት (ከፊላዊ) ናጻ-ምውጻእ (ontheffing) ክህብ ይኽእል። እዚ ንዜግነት እውን ይቑጸር ድዩ ኣይቁጸርን ምምሕዳር/IND ይውስን።"
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ ናብ inburgeren.nl ምውህሃድ ዝምልከት ዝያዳ"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "ናይ ወንጀል ዝርዝር ናይ ዜጋነት ምስምሳ ክዕጹ ይኽእሎ",
        "sub": "ናይ ፍርዲ ዓይነትን ምስ ክንደይ ዓመት ዝሓለፈን ጋሽቲ ክኸውን ይኽእሎ። ናይ ሙያ ሰብ ናትካ/ኺ ሃለዋት ክፍርዶ/ዲ ሕቶ/ቲ።",
        "alternatieven": [
          {
            "naam": "ሕጋዊ ምኽሪ",
            "tekst": "ናትካ/ኺ ሃለዋት ናይ ዜጋነት ዕንቅፋት ምዃኑ ናብ ሕጋዊ ሙያ ሰብ ሕቱ/ቲ።"
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "ናይ ሃለዋት ዋናታት ናጻ ሕጋዊ ሓገዝ።"
          },
          {
            "naam": "ናይ ምጽባይ ዓቐን",
            "tekst": "ናይ ምጽባይ ዓቐን ምስ ሓለፈ (ብፍርዲ ዝምለስ) ዳግም ምምልካት ይከኣሎ።"
          },
          {
            "naam": "ንኣሽቱ ቅጻዓት",
            "tekst": "ናይ ትራፊክ ቅጻዓትን ንኣሽቱ ምጥሓሳትን ብዙሕ ኣይሕሰቡን።"
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ ምስ VluchtelingenWerk ርኸቦ/ቢ"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "ናይ ወንጀል ዝርዝር ኣለካ/ኺ ዶ ምርኣይ",
        "sub": "ዝምዝገበ ዘሎ ንምርኣይ ናይ ጽቡቕ ምሕደራ ምስክር (VOG) ካብ justis.nl ምሕታት ይከኣሎ።",
        "alternatieven": [
          {
            "naam": "VOG ምሕታት",
            "tekst": "ናይ ጽቡቕ ምሕደራ ምስክር (VOG) ብ justis.nl ሕቱ/ቲ።"
          },
          {
            "naam": "ናይ ሓገዝ ዉናታት ናጻ",
            "tekst": "ሓገዝ ምስ ትቕበሎ/ሊ VOG ናጻ ክኸውን ይኽእሎ።"
          },
          {
            "naam": "ንኣሽቱ ቅጻዓት ኣይሕሰቡን",
            "tekst": "ናይ ትራፊክ ቅጻዓትን ንኣሽቱ ምጥሓሳትን ብዙሕ ኣይሕሰቡን።"
          },
          {
            "naam": "ሕጋዊ ምኽሪ",
            "tekst": "ርግጸኛ ምስ ዘይኮንካ/ኩኒ፡ ሕጋዊ ሙያ ሰብ ወይ VluchtelingenWerk ምርካብ።"
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ ኣብ justis.nl VOG ምሕታት"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "ቀንዲ ቤትካ/ኺ ኣብ ሆላንድ ክኸውን ኣለዎ",
        "sub": "ብዛዕባ ኣብ ካልእ ሃገር ምቕማጥ ናይ ዜጋነት ናይ ምቕማጥ ጠለብ ኣይማልእን።",
        "alternatieven": [
          {
            "naam": "ቀንዲ ቤት ምስግጋር",
            "tekst": "ወግዓዊ ቀንዲ ቤትካ/ኺ ናብ ሆላንድ ምስጋር።"
          },
          {
            "naam": "BRP ምምዝጋብ",
            "tekst": "ኣብ ምምሕዳር ከቲ BRP ምዝጋብካ/ኺ ምርጋጽ።"
          },
          {
            "naam": "ምኻድ ይፈቀድ",
            "tekst": "ሓደ ሓደ ናብ ደገ ምኻድ ሆላንድ ቀንዲ ቦታካ/ኺ ምስ ዝኸውን ጸገም ኣይፈጥርን።"
          },
          {
            "naam": "ዝያዳ ሓበሬታ",
            "tekst": "ናይ ምቕማጥ ኩነታት ብዝምልከት ምምሕዳር ከቲ ሕቱ/ቲ።"
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ ኣብ ind.nl ዝያዳ ሓበሬታ"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "ዜጋነት ምውጻእ ዓቢ ስጉምቲ ኣዩ",
        "sub": "ሆላንድ መብዛሕትኡ ግዜ ድርብ ዜግነት ኣይትፈቅድን። ኣግላልነታት ኣለዉ — ብሓቂ ካብ ዜግነትካ ክትሓድግ እንተዘይደሊኻ ድማ ብርቱዕ ኣማራጺ ኣሎ። ቅድሚ ምውሳንካ ነዚ ብጥንቃቐ ኣንብቦ።",
        "alternatieven": [
          {
            "naam": "ንዓይነት ዘለዎም ኣግላልነት",
            "tekst": "ከም ዝተፈልጠ ስደተኛ ካብ ዜግነትካ ክትሓድግ ኣይትግደድን።"
          },
          {
            "naam": "ኣግላልነት: ዘይከኣል",
            "tekst": "ምሕዳግ ዘይከኣል ወይ ሓደገኛ እንተኾይኑ፡ ኣግላልነት ክህሉ ይኽእል።"
          },
          {
            "naam": "ኣግላልነት: ሆላንዳዊ መጻምድቲ",
            "tekst": "ምስ ሆላንዳዊ ዜጋ ተመርዕኻ ዲኻ? እምበኣር ፍሉያት ሕግታት ይትግበሩ።"
          },
          {
            "naam": "ኣማራጺ: ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ",
            "tekst": "ብሓቂ ዜግነትካ ክትሕዝ ትደሊ ዲኻ? እምበኣር \"ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ\" መብዛሕትኡ ግዜ እቲ ዝበረተዐ ኣማራጺ እዩ። ነቲ ኣብ ታሕቲ ዘሎ ሰማያዊ መልጎም ርአ።"
          },
          {
            "naam": "ሕጋዊ ምኽሪ",
            "tekst": "ኩነታትካ ክግምገም ግበር — ሓሓሊፉ ካብ ትሓስቦ ንላዕሊ ይከኣል እዩ።"
          }
        ],
        "link": "https://ind.nl/en/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ ብዛዕባ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኣብ ind.nl ዝያዳ ኣንብብ",
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ርአ: ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (ዜግነት ምሓዝ)"
        }
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "ዋጋ ናብ ምቕናሱ ዝምልከት ኣፍደጊ ኣለዉ",
        "sub": "ዜግነት €1.139 (ውልቂ) ወይ €1.454 (ምስ መጻምድቲ) ይውድእ — ናይ 2026 ዋጋ፤ ዝተሓተ ዋጋ €847/€1.163 ንዓይነት ዑቕባ ዘለዎም/ዜግነት ዘይብሎም። ነዚ ተመጣጣኒ ንምግባር መንገድታት ኣለዉ።",
        "alternatieven": [
          {
            "naam": "ዝተሓተ ዋጋ ዑቕባ/ዜግነት ዘይብሉ",
            "tekst": "ዓይነት ዑቕባ ዘለካ ወይ ዜግነት ዘይብልካ ዲኻ? እምበኣር ዝተሓተ ዋጋ ትኸፍል: €847 (ውልቂ) ወይ €1.163 (ምስ መጻምድቲ)። ምምሕዳር ብመሰረት ኩነታትካ የተግብሮ።"
          },
          {
            "naam": "ናይ ምምሕዳር ፈንድ",
            "tekst": "ገለ ምምሕዳራት ንዓይነት ዘለዎም ነቲ ወጻኢ (ብኸፊል) ይምልሱ።"
          },
          {
            "naam": "ፍሉይ ሓገዝ",
            "tekst": "ንክፍሊት ካብ ምምሕዳርካ ፍሉይ ሓገዝ (bijzondere bijstand) ሕተት።"
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "ኣብ ምምሕዳርካ እንታይ ፈንድታት ከም ዘለዉ ይፈልጡ።"
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ ብ VluchtelingenWerk ናይ ዋጋ ሓገዝ"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ — ዜግነትካ ከይሓደግካ ብቐዋምነት ምንባር",
        "sub": "ድሕሪ 5 ዓመት ሕጋዊ መንበሪ ቀዋሚ ናይ መንበሪ ኩነታት። ናይ ገዛእ ርእስኻ ዜግነት ትሕዝ፡ ብርቱዕን ነባርን ናይ መንበሪ መሰላት ድማ ትረክብ። ሕጂ ናይ ዘይውሱን ግዜ ዑቕባ ፍቓድ ስለ ዝስረዝ፡ እዚ መብዛሕትኡ ግዜ እቲ ዝያዳ ኣገዳሲ ኣማራጺ ንዜግነት እዩ።",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>እንታይ እዩ:</strong> ኣብ ሆላንድ ብዘይ ገደብ ክትነብርን ብናጻ ክትሰርሕን ትኽእል፡ ናብ ካልኦት ናይ ኤውሮጳ ሕብረት ሃገራት ድማ ብቐሊሉ ክትግዕዝን ክትሰርሕን ትኽእል። ናይ ዑቕባ ዓመታትካ ነቶም 5 ዓመት ይቑጸሩ፤ ናይ ትምህርቲ ዓመታት 50% ይቑጸሩ።"
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>ካብ ዜግነት ዘፈላሊ ኣገዳሲ ነገር:</strong> ነዚ ኩነታት <strong>ናይ እቶት ቅድመ-ኩነት</strong> ኣሎ (ናጻ፡ ቀዋምን እኹልን እቶት)። ብሓገዝ ትነብር እንተኾንካ መብዛሕትኡ ግዜ ኣይተማልኦን — ሽዑ ዜግነት ብሓቂ ዝያዳ ቀሊል እዩ፡ ምኽንያቱ ናይ እቶት ቅድመ-ኩነት የብሉን።"
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>መዓስ ንዓኻ ኣገዳሲ እዩ?</strong> ካብ ቀዳማይ ዜግነትካ ክትሓድግ እንተዘይደሊኻ ወይ ዘይከኣልካ — ንዜግነት ብመትከል የድሊ፡ ኣብዚ ግን ኣየድልን።"
          },
          {
            "nr": 2,
            "tekst": "<strong>ወይ:</strong> ሕጂ ናይ ዘይውሱን ግዜ ዑቕባ ፍቓድ ስለ ዝጠፍእ፡ እዚ ካብ ግዝያዊ (3 ዓመት) ፍቓድ ናብ ነባሪ ናይ መንበሪ መሰል ዝመርሕ መንገዲ እዩ።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ቅድመ-ኩነታት:</strong> 5 ዓመት ዘይተቛረጸ ሕጋዊ መንበሪ (ናይ ዑቕባ ዓመታት ይቑጸሩ)፡ ዝሓለፈ ምውህሃድ (እንተወሓደ A2)፡ ቅቡል ፓስፖርትን እኹል ናጻ ቀዋሚ እቶትን።"
          },
          {
            "nr": 4,
            "tekst": "<strong>ምልክታ:</strong> ኣብ IND። ንዘይውሱን ግዜ ፍቓድ ምልክታ እንተኣእቲኻ፡ IND ብኣውቶማቲክ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኩነታት ክትረክብ ትኽእል ምዃንካ ይምርምር።"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ ብዛዕባ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኣብ ind.nl ዝያዳ ኣንብብ"
      }
    }
  },
  "RO": {
    "header": {
      "badge": "🇳🇱 Verificator Naturalizare",
      "titel": "Am dreptul la un pașaport olandez?",
      "sub": "Răspunde la câteva întrebări și află imediat dacă poți depune cerere de naturalizare — pe baza condițiilor IND din 2026, inclusiv noile reguli privind azilul."
    },
    "vragen": {
      "v1": {
        "stap": "Pasul 1 din 9",
        "tekst": "Ai 18 ani sau mai mult?",
        "uitleg": "Cererea de naturalizare poate fi depusă doar de adulți. Pentru copiii minori se aplică reguli separate prin intermediul părinților.",
        "antwoorden": [
          {
            "tekst": "Da, am 18 ani sau mai mult",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Nu, am mai puțin de 18 ani",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "Pasul 2 din 9",
        "tekst": "Care este statutul tău actual de reședință în Olanda?",
        "uitleg": "Modul în care locuiești în Olanda determină ce cale ți se aplică. Cetățenii UE locuiesc în baza dreptului UE — nu printr-un permis de ședere olandez.",
        "antwoorden": [
          {
            "tekst": "Am permis de ședere olandez",
            "sub": "Sau statut de azil (IND tip III, IV sau V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Sunt cetățean UE (ex. pașaport românesc sau polonez)",
            "sub": "Sau cetățean SEE/Elveția",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Nu sunt sigur/ă",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "Pasul 3 din 9",
        "tekst": "Ai permis de ședere valabil?",
        "uitleg": "Ai nevoie de un permis de ședere valabil. Un statut de azil (permis de ședere pentru azil pe durată determinată sau nedeterminată) se ia de asemenea în calcul.<br><br>📌 <strong>De la 12 iunie 2026 (sistemul cu două statuturi):</strong> noile permise de azil sunt acum valabile maximum 3 ani în loc de 5, iar permisul de azil pe durată nedeterminată nu mai este emis. <em>Regulă tranzitorie:</em> aveai deja la 12 iunie 2026 un permis de azil (de 5 ani sau pe durată nedeterminată)? Atunci păstrezi acele drepturi cât timp documentul este valabil. Pentru naturalizare, cel mai important este ca șederea ta să fie <strong>neîntreruptă</strong> — așa că reînnoiește-ți întotdeauna permisul de 3 ani la timp.",
        "antwoorden": [
          {
            "tekst": "Da, am permis de ședere valabil",
            "sub": "Sau statut de azil (IND tip III, IV sau V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "Nu, nu am permis de ședere valabil",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "Pasul 4 din 9",
        "tekst": "De cât timp locuiești neîntrerupt în Olanda?",
        "uitleg": "În prezent trebuie să fi locuit în Olanda cel puțin 5 ani consecutivi. Călătoriile scurte în străinătate nu întrerup acest lucru.<br><br>⚠️ <strong>Atenție — posibilă schimbare:</strong> guvernul vrea să prelungească acest termen de la 5 la 10 ani (iar pentru partenerii cetățenilor olandezi de la 3 la 5 ani). Această propunere nu a fost încă adoptată, deci legal se aplică încă 5 ani — dar ține cont că cerința se poate schimba. Păstrează-ți oricum șederea neîntreruptă.",
        "antwoorden": [
          {
            "tekst": "Mai puțin de 5 ani",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "5 ani sau mai mult",
            "sub": "Reședință neîntreruptă în Olanda",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "Pasul 5 din 9 — Integrare",
        "tekst": "Care este situația ta cu integrarea civică (inburgering)?",
        "uitleg": "Pentru naturalizare trebuie să dovedești că ești integrat/ă. Există mai multe modalități.",
        "antwoorden": [
          {
            "tekst": "Am promovat examenul de integrare civică (ruta B1 sau educațională)",
            "sub": "Diplomă de integrare DUO obținută",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Am diplomă MBO 2, 3 sau 4 în limba olandeză — sau HBO / WO",
            "sub": "Aceasta oferă scutire permanentă de la obligația de integrare",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Sunt scutit/ă de integrare",
            "sub": "De ex. din motive medicale sau printr-o exceptare DUO (ontheffing) pentru efort demonstrabil (primăria decide dacă aceasta contează pentru naturalizare)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Am finalizat ruta Z (interviu final + certificat)",
            "sub": "Atenție: aceasta nu dă automat dreptul la naturalizare — verifică opțiunile",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Sunt încă în procesul de integrare civică",
            "sub": "Nu am încă diplomă sau scutire",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "Pasul 5 din 9 — Ruta Z",
        "tekst": "Ai finalizat ruta Z — mai este nevoie de un pas suplimentar pentru naturalizare",
        "uitleg": "Ruta Z se încheie cu un interviu final și un certificat, dar pentru naturalizare IND aplică cerințe lingvistice suplimentare. Există trei căi pentru a te putea totuși naturaliza:<br><br><strong>Calea A — Promovează totuși examenul la nivel A2</strong><br>Promovează toate examenele de limbă la nivel A2 (citit, ascultat, scris, vorbit) și examenul KNM. Atenție: acum că ruta Z s-a încheiat, încercările de examen nu mai sunt gratuite.<br><br><strong>Calea B — 600 de ore de cursuri de limbă + cel puțin 3 încercări per componentă</strong><br>Cel puțin 600 de ore de cursuri de nivel A2 la o instituție certificată Blik op Werk și 3 încercări per componentă? Atunci DUO poate emite o recomandare de exceptare.<br><br><strong>Calea C — 600 de ore de alfabetizare + test DUO (€150)</strong><br>Cel puțin 600 de ore de alfabetizare și se dovedește că A2 nu este realizabil? Atunci urmează o exceptare prin testul DUO (€150).<br><br><em>Posibil în viitor:</em> guvernul vrea să ridice cerința de limbă pentru naturalizare de la A2 la B1. Acest lucru nu a fost încă adoptat — în prezent se aplică încă A2.<br><br>💡 Discută cu primăria ta sau cu VluchtelingenWerk care cale ți se potrivește cel mai bine.",
        "antwoorden": [
          {
            "tekst": "Am înțeles — continuă cu celelalte condiții",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "Pasul 5 din 9 — Ruta de învățare",
        "tekst": "Ce rută de integrare urmezi?",
        "uitleg": "Primăria determină ruta ta de învățare în funcție de capacitatea de învățare. Există trei rute: B1, ruta educațională și ruta Z.",
        "antwoorden": [
          {
            "tekst": "Ruta B1",
            "sub": "Examen lingvistic la nivel B1 + examen KNM",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "Ruta educațională",
            "sub": "Program de tranziție lingvistică 1,5–2 ani — pregătire pentru MBO/HBO/WO",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "Ruta Z (Ruta de autosuficiență)",
            "sub": "Pentru persoanele pentru care B1 nu este realizabil",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "Nu știu / nu am încă o rută",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "Pasul 5 din 9 — Ruta Z",
        "tekst": "Cât de avansat/ă ești în ruta Z?",
        "uitleg": "Ruta Z se încheie cu un interviu final la primărie și o recomandare pozitivă DUO. Ambele sunt necesare pentru naturalizare.",
        "antwoorden": [
          {
            "tekst": "Am finalizat ruta Z (am primit recomandare pozitivă DUO)",
            "sub": "Interviul final cu primăria finalizat",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Sunt încă în ruta Z",
            "sub": "Nu am finalizat încă cele 800 de ore de cursuri / participare",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "Pasul 6 din 9",
        "tekst": "Ai fost condamnat/ă penal în ultimii 5 ani?",
        "uitleg": "O condamnare penală poate bloca naturalizarea. Amenzile de trafic și contravențiile minore de obicei nu se iau în calcul.",
        "antwoorden": [
          {
            "tekst": "Nu, nu am cazier judiciar",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "Da, am fost condamnat/ă penal",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "Nu sunt sigur/ă",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "Pasul 7 din 9",
        "tekst": "Reședința ta principală este în prezent în Olanda?",
        "uitleg": "Trebuie să ai reședința principală în Olanda. Călătoriile ocazionale în străinătate nu reprezintă o problemă.",
        "antwoorden": [
          {
            "tekst": "Da, locuiesc permanent în Olanda",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "Nu, locuiesc în principal în străinătate",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "Pasul 8 din 9",
        "tekst": "Ești dispus/ă să renunți la cetățenia actuală?",
        "uitleg": "Olanda nu permite în general dubla cetățenie. Excepție: refugiații recunoscuți pot păstra ambele cetățenii.",
        "antwoorden": [
          {
            "tekst": "Da, voi renunța la cetățenia mea",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Sunt refugiat/ă recunoscut/ă (deținător/oare de statut)",
            "sub": "Deținătorii de statut pot păstra dubla cetățenie",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Nu, vreau să-mi păstrez cetățenia",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "Pasul 9 din 9",
        "tekst": "Ești conștient/ă de costurile naturalizării?",
        "uitleg": "Cererea costă €1.139 pentru o persoană și €1.454 cu partener (tarife 2026). Pentru deținătorii de statut de azil și apatrizi se aplică un tarif redus: €847 (singur) sau €1.163 (cu partener). Procedura durează în medie 6–12 luni.",
        "antwoorden": [
          {
            "tekst": "Da, știu și vreau să continui",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "Este prea scump — există subvenții?",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "Probabil ești eligibil/ă!",
        "sub": "Pe baza răspunsurilor tale îndeplinești condițiile principale pentru naturalizare. Următorul pas este o cerere oficială la primăria ta.",
        "info": "💡 Deținătorii de statut (refugiații recunoscuți) în general nu trebuie să renunțe la cetățenia originală.",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Programează o întâlnire la primăria ta</strong> — departamentul de afaceri civile. Spune că vrei să depui cerere de naturalizare."
          },
          {
            "nr": 2,
            "tekst": "<strong>Adună documentele:</strong> pașaport valabil, permis de ședere, dovadă de integrare, certificat de naștere (legalizat dacă este necesar)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Plătește taxa:</strong> €1.139 (o persoană) sau €1.454 (cu partener) la depunere — tarife 2026. Ești deținător de statut de azil sau apatrid? Atunci se aplică un tarif redus: €847 (singur) sau €1.163 (cu partener). Întreabă primăria dacă există un program de contribuție."
          },
          {
            "nr": 4,
            "tekst": "<strong>Așteaptă decizia</strong> IND. Aceasta durează în medie 6–12 luni."
          },
          {
            "nr": 5,
            "tekst": "<strong>Ceremonia de naturalizare:</strong> după aprobare vei primi o invitație la ceremonie la primărie."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Mai multe informații pe ind.nl"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Ca cetățean UE ai drepturi diferite",
        "sub": "Naturalizarea ca cetățean olandez este posibilă, dar nu ai nevoie de cetățenia olandeză pentru a locui și munci aici.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Drepturi cetățean UE:</strong> Ca cetățean român sau polonez ai dreptul să locuiești, să muncești și să studiezi în Olanda fără permis de ședere. Te înregistrezi la primărie (BRP)."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Atenție la dubla cetățenie:</strong> Regula principală este că renunți la cetățenia română sau poloneză când te naturalizezi. Însă: dacă țara ta nu permite renunțarea sau aceasta nu este posibilă, intri sub o excepție legală și poți păstra ambele cetățenii. Întreabă la ambasadă dacă renunțarea este obligatorie și posibilă în cazul tău."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Vrei totuși să te naturalizezi?</strong> Condițiile standard se aplică și cetățenilor UE: 5 ani, integrare, fără cazier, renunțare la cetățenie."
          },
          {
            "nr": 2,
            "tekst": "<strong>Dublă cetățenie:</strong> Întreabă la ambasada română sau poloneză dacă trebuie și dacă poți să renunți. Dacă nu poți, îți păstrezi cetățenia prin excepția legală. Regulile diferă de la o țară la alta."
          },
          {
            "nr": 3,
            "tekst": "<strong>Vrei să continui?</strong> Parcurge din nou verificatorul și alege \"permis de ședere\"."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Informații pe ind.nl"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "Naturalizarea copiilor se face prin părinți",
        "sub": "Copiii minori pot fi naturalizați împreună cu un părinte care depune cerere sau are deja cetățenia olandeză.",
        "alternatieven": [
          {
            "naam": "Naturalizare împreună",
            "tekst": "Dacă părintele tău se naturalizează, te poți naturaliza automat."
          },
          {
            "naam": "Prin tribunal",
            "tekst": "În unele cazuri este posibilă naturalizarea separată a minorilor."
          },
          {
            "naam": "Așteaptă până la 18 ani",
            "tekst": "La 18 ani poți depune cerere independent."
          },
          {
            "naam": "Procedura de opțiune",
            "tekst": "Dacă te-ai născut în Olanda, uneori poți deveni olandez/ă prin procedura \"opțiunii\"."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ Mai multe informații pe ind.nl"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "Mai întâi ai nevoie de permis de ședere",
        "sub": "Naturalizarea este posibilă doar dacă locuiești legal în Olanda. Obține mai întâi un permis de ședere valabil.",
        "alternatieven": [
          {
            "naam": "Cerere de azil",
            "tekst": "Dacă ai nevoie de protecție, poți depune o cerere de azil la IND."
          },
          {
            "naam": "Permis obișnuit",
            "tekst": "Pentru muncă, studii sau reîntregirea familiei există permise obișnuite."
          },
          {
            "naam": "Ajutor juridic",
            "tekst": "Contactează o organizație pentru refugiați sau un avocat."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Sprijin juridic gratuit pentru solicitanții de azil și deținătorii de statut."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Contactează VluchtelingenWerk"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Încă nu ai locuit suficient de mult în Olanda",
        "sub": "În prezent trebuie să fi locuit în Olanda cel puțin 5 ani consecutivi cu ședere valabilă. De la noile reguli de azil din 2026 sunt câteva lucruri de care să ții cont în timpul așteptării. Poți folosi bine perioada de așteptare.",
        "alternatieven": [
          {
            "naam": "Reînnoiește permisul la timp",
            "tekst": "Noile permise de azil sunt valabile maximum 3 ani; așa că reînnoiește la timp. Dacă apare un \"gol de ședere\" (verblijfsgat) — o perioadă între două permise în care nu ai un permis valabil — acel timp nu contează ca ședere legală, iar numărătoarea de 5 ani pentru naturalizare poate reîncepe. Așa că depune cererea de reînnoire cel târziu în 4 săptămâni de la expirare: atunci IND nu o consideră gol de ședere."
          },
          {
            "naam": "Nu mai există durată nedeterminată",
            "tekst": "Permisul de azil pe durată nedeterminată nu mai este emis. Nicio problemă pentru naturalizare: te poți naturaliza dintr-un permis temporar valabil."
          },
          {
            "naam": "Termen de naturalizare: posibil 10 ani",
            "tekst": "Atenție: acest lucru se referă la perioada de așteptare înainte de a te putea naturaliza, nu la permisul tău de ședere. Guvernul vrea să prelungească acest termen de naturalizare de la 5 la 10 ani. Încă neadoptat, dar ține cont. Cu un partener olandez termenul poate fi mai scurt — întreabă primăria."
          },
          {
            "naam": "Alternativă: rezident UE pe termen lung",
            "tekst": "Acum că permisul de azil pe durată nedeterminată este eliminat, \"rezident UE pe termen lung\" după 5 ani este o alternativă importantă: îți păstrezi propria cetățenie și obții drepturi de ședere puternice. <strong>Important: pentru aceasta se aplică o cerință de venit</strong> — munca și un venit propriu stabil, suficient contează mult aici. Vezi butonul albastru de mai jos."
          },
          {
            "naam": "Finalizează integrarea",
            "tekst": "Folosește perioada de așteptare pentru a promova examenul de integrare — o cerință obligatorie pentru naturalizare."
          },
          {
            "naam": "Adună documente",
            "tekst": "Solicită din timp documente oficiale din țara de origine și lucrează la olandeza ta, de exemplu printr-un curs de limbă la o instituție certificată Blik op Werk."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Vezi: rezident UE pe termen lung (ședere permanentă după 5 ani)"
        },
        "link": "https://ind.nl/en/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/new-laws-and-regulations-on-asylum-and-family-reunification",
        "linkTekst": "→ Vezi noile reguli de azil 2026 pe ind.nl"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "Poți începe deja să te pregătești pentru naturalizare",
        "sub": "Urmezi ruta B1 dar nu ai finalizat încă examenul. Poți deja porni procedura de naturalizare — diploma trebuie să fie gata înainte ca IND să ia o decizie.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>Sfat:</strong> Întreabă la primărie dacă poți depune cererea de naturalizare în timp ce finalizezi ruta B1."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Continuă cu ruta B1:</strong> promovează examenul lingvistic și examenul KNM."
          },
          {
            "nr": 2,
            "tekst": "<strong>Solicită documente în avans:</strong> pașaport, certificat de naștere, permis de ședere."
          },
          {
            "nr": 3,
            "tekst": "<strong>Întreabă la primăria ta</strong> dacă poți depune cererea în timp ce finalizezi ruta."
          },
          {
            "nr": 4,
            "tekst": "<strong>După obținerea diplomei:</strong> trimite dovada la primărie/IND."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Mai multe informații pe ind.nl"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "Poți începe deja să te pregătești pentru naturalizare",
        "sub": "Urmezi ruta educațională — un program intensiv de tranziție lingvistică de 1,5–2 ani.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Atenție:</strong> nicio rută de integrare nu oferă în sine o \"scutire\". Îți îndeplinești obligația de integrare imediat ce finalizezi cu succes Ruta de educație — adică promovezi examenele de limbă necesare (B1: citit, ascultat, scris, vorbit) și examenul KNM. Aceasta îndeplinește și cerința de integrare pentru naturalizare. Ruta de educație în sine este deci un program de limbă, nu o diplomă MBO sau HBO."
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>Sfat:</strong> Poți porni procedura de naturalizare deja. Diploma trebuie gata înainte de decizia IND."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Finalizează ruta educațională:</strong> promovează examenul lingvistic (B1) și examenul KNM."
          },
          {
            "nr": 2,
            "tekst": "<strong>Solicită documente în avans:</strong> pașaport, certificat de naștere, permis de ședere."
          },
          {
            "nr": 3,
            "tekst": "<strong>Întreabă la primăria ta</strong> dacă poți depune cererea în timp ce finalizezi ruta."
          },
          {
            "nr": 4,
            "tekst": "<strong>După obținerea diplomei:</strong> trimite dovada la primărie/IND."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Mai multe informații pe ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Naturalizare prin ruta Z — o diferență importantă",
        "sub": "Finalizarea rutei Z nu înseamnă automat că îndeplinești cerința de integrare pentru naturalizare. Există trei căi prin DUO.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Important:</strong> Ruta Z nu are o obligație de examen, ci o obligație de efort (800 de ore de cursuri de limbă + interviu final). Prin urmare, finalizarea ei <em>nu</em> dă automat dreptul la naturalizare. Ai nevoie suplimentar de o recomandare de exceptare DUO sau de un examen A2 promovat.<br><br><em>Posibil în viitor:</em> guvernul vrea să ridice cerința de limbă pentru naturalizare de la A2 la B1. Acest lucru nu a fost încă adoptat — în prezent se aplică încă A2."
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "Promovarea examenului de integrare la nivel A2",
            "tekst": "Promovează toate examenele lingvistice la nivel A2 și examenul KNM."
          },
          {
            "nr": "B",
            "titel": "600 ore cursuri de limbă (A2) + cel puțin 3 încercări per componentă",
            "tekst": "600 ore la o instituție Blik op Werk și 3 încercări per componentă. DUO poate emite o recomandare de scutire."
          },
          {
            "nr": "C",
            "titel": "600 ore de alfabetizare + test DUO — 150 €",
            "tekst": "600 ore de alfabetizare și testul DUO arată că A2 nu este realizabil. Se acordă scutire. Testul costă 150 €."
          }
        ],
        "info": "📞 <strong>Sfat:</strong> Consultați primăria sau VluchtelingenWerk.",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Ajutor prin VluchtelingenWerk"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "Ai nevoie de integrare civică pentru naturalizare",
        "sub": "Fără diplomă de integrare sau scutire nu poți depune cerere de naturalizare. Începe acum — în 1–3 ani vei fi gata.",
        "alternatieven": [
          {
            "naam": "Solicită ruta ta de învățare",
            "tekst": "Mergi la primărie pentru a afla ce rută ți se potrivește (B1, Ruta de educație sau Ruta Z)."
          },
          {
            "naam": "Începe cursuri de limbă",
            "tekst": "Urmează cursuri de limbă la o instituție certificată Blik op Werk. Întreabă primăria despre opțiuni și o eventuală rambursare."
          },
          {
            "naam": "Solicită examenul",
            "tekst": "Dacă vorbești deja suficientă olandeză, poți solicita examenul direct prin DUO."
          },
          {
            "naam": "Scutire sau exceptare?",
            "tekst": "O scutire (vrijstelling) este posibilă dacă ai deja o diplomă în limba olandeză (MBO-2 sau mai mare, HBO sau WO). Dacă o boală sau un handicap te împiedică cu adevărat să te integrezi, DUO poate acorda o exceptare (ontheffing) (parțială) din motive medicale. Primăria/IND decide dacă aceasta contează și pentru naturalizare."
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ Mai multe despre integrare pe inburgeren.nl"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "Cazierul judiciar poate bloca naturalizarea",
        "sub": "În funcție de tipul condamnării și de cât timp a trecut, aceasta poate fi un obstacol. Solicită unui specialist să evalueze situația ta.",
        "alternatieven": [
          {
            "naam": "Consiliere juridică",
            "tekst": "Întreabă un consilier juridic dacă situația ta reprezintă un obstacol pentru naturalizare."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Ajutor juridic gratuit pentru deținătorii de statut."
          },
          {
            "naam": "Perioadă de așteptare",
            "tekst": "După o anumită perioadă de așteptare poți redepune cererea."
          },
          {
            "naam": "Amenzi minore",
            "tekst": "Amenzile de trafic și contravențiile minore de obicei NU se iau în calcul."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Contactează VluchtelingenWerk"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Verifică dacă ai cazier judiciar",
        "sub": "Poți solicita un Certificat de Bună Conduită (VOG) pe justis.nl pentru a vedea ce este înregistrat.",
        "alternatieven": [
          {
            "naam": "Solicită VOG",
            "tekst": "Solicită un Certificat de Bună Conduită (VOG) prin justis.nl."
          },
          {
            "naam": "Gratuit pentru beneficiari",
            "tekst": "Dacă primești ajutor social, VOG poate fi gratuit."
          },
          {
            "naam": "Amenzile minore nu contează",
            "tekst": "Amenzile de trafic și contravențiile minore de obicei NU se iau în calcul."
          },
          {
            "naam": "Consiliere juridică",
            "tekst": "În caz de îndoială consultați un consilier juridic sau VluchtelingenWerk."
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ Solicită VOG pe justis.nl"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "Reședința ta principală trebuie să fie în Olanda",
        "sub": "Dacă locuiești în principal în străinătate, nu îndeplinești cerința de reședință pentru naturalizare.",
        "alternatieven": [
          {
            "naam": "Mută reședința principală",
            "tekst": "Mută-ți reședința oficială principală în Olanda."
          },
          {
            "naam": "Înregistrare BRP",
            "tekst": "Asigură-te că ești înregistrat/ă în BRP la primăria ta."
          },
          {
            "naam": "Călătoriile sunt permise",
            "tekst": "Deplasările ocazionale nu sunt o problemă atât timp cât Olanda este baza ta."
          },
          {
            "naam": "Mai multe informații",
            "tekst": "Întreabă la primăria ta despre cerințele exacte de reședință."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Mai multe informații pe ind.nl"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "Renunțarea la cetățenie este un pas important",
        "sub": "Olanda de obicei nu permite dubla cetățenie. Există excepții — și dacă chiar nu vrei să renunți la cetățenia ta, există o alternativă puternică. Citește cu atenție înainte de a decide.",
        "alternatieven": [
          {
            "naam": "Excepție pentru deținătorii de statut",
            "tekst": "Ca refugiat recunoscut NU trebuie să renunți la cetățenia ta."
          },
          {
            "naam": "Excepție: imposibil",
            "tekst": "Dacă renunțarea este imposibilă sau periculoasă, poate exista o excepție."
          },
          {
            "naam": "Excepție: partener olandez",
            "tekst": "Ești căsătorit cu un cetățean olandez? Atunci se aplică reguli speciale."
          },
          {
            "naam": "Alternativă: rezident UE pe termen lung",
            "tekst": "Chiar vrei să-ți păstrezi cetățenia? Atunci \"rezident UE pe termen lung\" este deseori cea mai puternică alternativă. Vezi butonul albastru de mai jos."
          },
          {
            "naam": "Consiliere juridică",
            "tekst": "Pune-ți situația să fie evaluată — uneori este posibil mai mult decât crezi."
          }
        ],
        "link": "https://ind.nl/en/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ Citește mai mult despre rezident UE pe termen lung pe ind.nl",
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Vezi: rezident UE pe termen lung (păstrează-ți cetățenia)"
        }
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Există modalități de a reduce costurile",
        "sub": "Naturalizarea costă €1.139 (o persoană) sau €1.454 (cu partener) — tarife 2026; tarif redus €847/€1.163 pentru deținătorii de statut de azil/apatrizi. Există modalități de a o face accesibilă.",
        "alternatieven": [
          {
            "naam": "Tarif redus azil/apatrid",
            "tekst": "Ești deținător de statut de azil sau apatrid? Atunci plătești un tarif redus: €847 (singur) sau €1.163 (cu partener). Primăria îl aplică pe baza statutului tău."
          },
          {
            "naam": "Fond municipal",
            "tekst": "Unele primării rambursează (parțial) costurile pentru deținătorii de statut."
          },
          {
            "naam": "Asistență specială",
            "tekst": "Solicită asistență specială (bijzondere bijstand) la primăria ta pentru taxă."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Ei știu ce fonduri sunt disponibile în primăria ta."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Ajutor cu costurile prin VluchtelingenWerk"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Rezident UE pe termen lung — rămâi permanent fără a renunța la cetățenie",
        "sub": "Un statut de ședere permanentă după 5 ani de ședere legală. Îți păstrezi propria cetățenie și obții drepturi de ședere puternice și durabile. Acum că permisul de azil pe durată nedeterminată este abrogat, aceasta este deseori cea mai importantă alternativă la naturalizare.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Ce este:</strong> poți locui în Olanda pe durată nedeterminată și poți munci liber, și te poți muta și munci mai ușor în alte țări UE. Anii de azil contează pentru cei 5 ani; anii de studiu contează 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Diferență importantă față de naturalizare:</strong> pentru acest statut se aplică o <strong>cerință de venit</strong> (venit propriu, durabil și suficient). Dacă trăiești dintr-un ajutor social, deseori nu o îndeplinești — iar atunci naturalizarea este de fapt mai accesibilă, pentru că nu are cerință de venit."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Când este interesant pentru tine?</strong> Dacă nu vrei sau nu poți renunța la prima ta cetățenie — pentru naturalizare în principiu trebuie, aici nu."
          },
          {
            "nr": 2,
            "tekst": "<strong>Sau:</strong> acum că permisul de azil pe durată nedeterminată dispare, aceasta este calea de la un permis temporar (de 3 ani) la un drept de ședere durabil."
          },
          {
            "nr": 3,
            "tekst": "<strong>Cerințe:</strong> 5 ani de ședere legală neîntreruptă (anii de azil contează), integrare promovată (cel puțin A2), un pașaport valabil și venit propriu, durabil și suficient."
          },
          {
            "nr": 4,
            "tekst": "<strong>Depunere:</strong> la IND. Dacă depui cerere pentru un permis pe durată nedeterminată, IND verifică automat dacă poți obține și statutul de rezident UE pe termen lung."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Citește mai mult despre rezident UE pe termen lung pe ind.nl"
      }
    }
  },
  "PL": {
    "header": {
      "badge": "🇳🇱 Sprawdzanie Naturalizacji",
      "titel": "Czy mam prawo do holenderskiego paszportu?",
      "sub": "Odpowiedz na kilka pytań i od razu dowiedz się, czy możesz złożyć wniosek o naturalizację — na podstawie warunków IND z 2026 roku, w tym nowych przepisów azylowych."
    },
    "vragen": {
      "v1": {
        "stap": "Krok 1 z 9",
        "tekst": "Czy masz 18 lat lub więcej?",
        "uitleg": "Wniosek o naturalizację mogą składać tylko osoby pełnoletnie. Dla małoletnich dzieci obowiązują odrębne przepisy przez rodziców.",
        "antwoorden": [
          {
            "tekst": "Tak, mam 18 lat lub więcej",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Nie, mam mniej niż 18 lat",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_minderjarig"
          }
        ]
      },
      "v1b": {
        "stap": "Krok 2 z 9",
        "tekst": "Jaki jest Twój aktualny status pobytowy w Holandii?",
        "uitleg": "Sposób zamieszkania w Holandii określa, która ścieżka ma zastosowanie. Obywatele UE zamieszkują na podstawie prawa UE — nie zezwolenia na pobyt holenderski.",
        "antwoorden": [
          {
            "tekst": "Posiadam holenderskie zezwolenie na pobyt",
            "sub": "Lub status azylanta (IND typ III, IV lub V)",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Jestem obywatelem/ką UE (np. paszport rumuński lub polski)",
            "sub": "Lub obywatel/ka EOG/Szwajcarii",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Nie jestem pewny/a",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v2"
          }
        ]
      },
      "v2": {
        "stap": "Krok 3 z 9",
        "tekst": "Czy posiadasz ważne zezwolenie na pobyt?",
        "uitleg": "Potrzebujesz ważnego zezwolenia na pobyt. Status azylowy (zezwolenie na pobyt azylowy na czas określony lub nieokreślony) również się liczy.<br><br>📌 <strong>Od 12 czerwca 2026 (system dwóch statusów):</strong> nowe zezwolenia azylowe są teraz ważne maksymalnie 3 lata zamiast 5, a bezterminowe zezwolenie azylowe nie jest już wydawane. <em>Przepis przejściowy:</em> czy 12 czerwca 2026 miałeś już zezwolenie azylowe (5-letnie lub bezterminowe)? Wtedy zachowujesz te prawa tak długo, jak dokument jest ważny. Dla naturalizacji najważniejsze jest, aby Twój pobyt był <strong>nieprzerwany</strong> — dlatego zawsze przedłużaj swoje 3-letnie zezwolenie na czas.",
        "antwoorden": [
          {
            "tekst": "Tak, posiadam ważne zezwolenie na pobyt",
            "sub": "Lub status azylanta (IND typ III, IV lub V)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "Nie, nie posiadam ważnego zezwolenia na pobyt",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
        "stap": "Krok 4 z 9",
        "tekst": "Jak długo nieprzerwanie mieszkasz w Holandii?",
        "uitleg": "Obecnie musisz mieszkać w Holandii nieprzerwanie co najmniej 5 lat. Krótkie wyjazdy za granicę tego nie przerywają.<br><br>⚠️ <strong>Uwaga — możliwa zmiana:</strong> rząd chce wydłużyć ten okres z 5 do 10 lat (a dla partnerów obywateli holenderskich z 3 do 5 lat). Ta propozycja nie została jeszcze przyjęta, więc prawnie nadal obowiązuje 5 lat — ale weź pod uwagę, że wymóg może się zmienić. W każdym razie zachowaj nieprzerwany pobyt.",
        "antwoorden": [
          {
            "tekst": "Mniej niż 5 lat",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort"
          },
          {
            "tekst": "5 lat lub więcej",
            "sub": "Nieprzerwany pobyt w Holandii",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a"
          }
        ]
      },
      "v4a": {
        "stap": "Krok 5 z 9 — Integracja",
        "tekst": "Jaki jest status Twojej integracji obywatelskiej (inburgering)?",
        "uitleg": "Do naturalizacji musisz udowodnić, że jesteś zintegrowny/a. Istnieje kilka sposobów.",
        "antwoorden": [
          {
            "tekst": "Zdałem/am egzamin z integracji obywatelskiej (trasa B1 lub edukacyjna)",
            "sub": "Dyplom integracji DUO uzyskany",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Posiadam dyplom MBO 2, 3 lub 4 w języku niderlandzkim — lub HBO / WO",
            "sub": "Daje to stałe zwolnienie z obowiązku integracji",
            "icoon": "🎓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Jestem zwolniony/a z integracji",
            "sub": "Np. ze względów medycznych lub poprzez wyłączenie DUO (ontheffing) za wykazany wysiłek (gmina decyduje, czy liczy się to do naturalizacji)",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v5"
          },
          {
            "tekst": "Ukończyłem/am trasę Z (wywiad końcowy + certyfikat)",
            "sub": "Uwaga: nie daje to automatycznie prawa do naturalizacji — sprawdź swoje opcje",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Nadal jestem w trakcie integracji obywatelskiej",
            "sub": "Nie mam jeszcze dyplomu ani zwolnienia",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "v4b"
          }
        ]
      },
      "v4a_z": {
        "stap": "Krok 5 z 9 — Trasa Z",
        "tekst": "Ukończyłeś/aś trasę Z — potrzebny jest jeszcze jeden dodatkowy krok do naturalizacji",
        "uitleg": "Ścieżka Z kończy się rozmową końcową i certyfikatem, ale do naturalizacji IND stosuje dodatkowe wymogi językowe. Istnieją trzy drogi, aby mimo to się naturalizować:<br><br><strong>Droga A — Mimo to zdać egzamin na poziomie A2</strong><br>Zdaj wszystkie egzaminy językowe na poziomie A2 (czytanie, słuchanie, pisanie, mówienie) oraz egzamin KNM. Uwaga: teraz, gdy ścieżka Z została ukończona, podejścia do egzaminu nie są już bezpłatne.<br><br><strong>Droga B — 600 godzin lekcji języka + co najmniej 3 podejścia na część</strong><br>Co najmniej 600 godzin lekcji na poziomie A2 w placówce z certyfikatem Blik op Werk i 3 podejścia na część? Wtedy DUO może wydać rekomendację wyłączenia.<br><br><strong>Droga C — 600 godzin alfabetyzacji + test DUO (€150)</strong><br>Co najmniej 600 godzin alfabetyzacji i okazuje się, że A2 jest nieosiągalny? Wtedy następuje wyłączenie poprzez test DUO (€150).<br><br><em>Możliwe w przyszłości:</em> rząd chce podnieść wymóg językowy do naturalizacji z A2 do B1. Nie zostało to jeszcze przyjęte — obecnie nadal obowiązuje A2.<br><br>💡 Omów ze swoją gminą lub VluchtelingenWerk, która droga najlepiej Ci odpowiada.",
        "antwoorden": [
          {
            "tekst": "Rozumiem — kontynuuj do pozostałych warunków",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v5"
          }
        ]
      },
      "v4b": {
        "stap": "Krok 5 z 9 — Trasa nauki",
        "tekst": "Jaką trasę integracji realizujesz?",
        "uitleg": "Gmina określa Twoją trasę nauki na podstawie zdolności uczenia się. Istnieją trzy trasy: B1, trasa edukacyjna i trasa Z.",
        "antwoorden": [
          {
            "tekst": "Trasa B1",
            "sub": "Egzamin językowy na poziomie B1 + egzamin KNM",
            "icoon": "📖",
            "klasse": "info",
            "volgende": "r_bezig_b1"
          },
          {
            "tekst": "Trasa edukacyjna",
            "sub": "Program przejściowy językowy 1,5–2 lata — przygotowanie do MBO/HBO/WO",
            "icoon": "🏫",
            "klasse": "info",
            "volgende": "r_bezig_onderwijs"
          },
          {
            "tekst": "Trasa Z (Trasa samodzielności)",
            "sub": "Dla osób, dla których B1 jest nieosiągalne",
            "icoon": "🌱",
            "klasse": "anders",
            "volgende": "v4b_z"
          },
          {
            "tekst": "Nie wiem / nie mam jeszcze trasy",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_geen_inburgering"
          }
        ]
      },
      "v4b_z": {
        "stap": "Krok 5 z 9 — Trasa Z",
        "tekst": "Jak zaawansowany/a jesteś w trasie Z?",
        "uitleg": "Trasa Z kończy się wywiadem końcowym w gminie i pozytywną rekomendacją DUO. Oba są wymagane do naturalizacji.",
        "antwoorden": [
          {
            "tekst": "Ukończyłem/am trasę Z (otrzymałem/am pozytywną rekomendację DUO)",
            "sub": "Wywiad końcowy z gminą zakończony",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v4a_z"
          },
          {
            "tekst": "Nadal jestem w trakcie trasy Z",
            "sub": "Nie ukończyłem/am jeszcze 800 godzin kursów / uczestnictwa",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_bezig_z"
          }
        ]
      },
      "v5": {
        "stap": "Krok 6 z 9",
        "tekst": "Czy zostałeś/aś skazany/a za przestępstwo karne w ciągu ostatnich 5 lat?",
        "uitleg": "Skazanie karne może zablokować naturalizację. Mandaty drogowe i drobne wykroczenia zazwyczaj się nie liczą.",
        "antwoorden": [
          {
            "tekst": "Nie, nie mam kartoteki kryminalnej",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v6"
          },
          {
            "tekst": "Tak, zostałem/am skazany/a za przestępstwo karne",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_strafblad"
          },
          {
            "tekst": "Nie jestem pewny/a",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_strafblad_check"
          }
        ]
      },
      "v6": {
        "stap": "Krok 7 z 9",
        "tekst": "Czy Twoje główne miejsce zamieszkania jest obecnie w Holandii?",
        "uitleg": "Musisz mieć główne miejsce zamieszkania w Holandii. Okazjonalne wyjazdy za granicę nie stanowią problemu.",
        "antwoorden": [
          {
            "tekst": "Tak, mieszkam na stałe w Holandii",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v7"
          },
          {
            "tekst": "Nie, mieszkam głównie za granicą",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_verblijf"
          }
        ]
      },
      "v7": {
        "stap": "Krok 8 z 9",
        "tekst": "Czy jesteś gotowy/a do zrzeczenia się obecnego obywatelstwa?",
        "uitleg": "Holandia zasadniczo nie zezwala na podwójne obywatelstwo. Wyjątek: uznani uchodźcy mogą zachować oba obywatelstwa.",
        "antwoorden": [
          {
            "tekst": "Tak, zrzeknę się obywatelstwa",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Jestem uznanym/ą uchodźcą/uciekinierką (posiadacz/ka statusu)",
            "sub": "Posiadacze statusu mogą zachować podwójne obywatelstwo",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v8"
          },
          {
            "tekst": "Nie, chcę zachować moje obywatelstwo",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_nationaliteit"
          }
        ]
      },
      "v8": {
        "stap": "Krok 9 z 9",
        "tekst": "Czy jesteś świadomy/a kosztów naturalizacji?",
        "uitleg": "Wniosek kosztuje €1.139 dla jednej osoby i €1.454 z partnerem (taryfy 2026). Dla posiadaczy statusu azylowego i bezpaństwowców obowiązuje obniżona taryfa: €847 (pojedynczo) lub €1.163 (z partnerem). Procedura trwa średnio 6–12 miesięcy.",
        "antwoorden": [
          {
            "tekst": "Tak, wiem i chcę kontynuować",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_positief"
          },
          {
            "tekst": "To zbyt drogie — czy są dofinansowania?",
            "icoon": "💡",
            "klasse": "anders",
            "volgende": "r_kosten"
          }
        ]
      }
    },
    "resultaten": {
      "r_positief": {
        "type": "positief",
        "icoon": "🎉",
        "titel": "Prawdopodobnie spełniasz warunki!",
        "sub": "Na podstawie Twoich odpowiedzi spełniasz główne wymagania naturalizacji. Następnym krokiem jest oficjalny wniosek w Twojej gminie.",
        "info": "💡 Posiadacze statusu (uznani uchodźcy) zazwyczaj nie muszą zrzekać się pierwotnego obywatelstwa.",
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Umów wizytę w swojej gminie</strong> — wydział spraw obywatelskich. Powiedz, że chcesz złożyć wniosek o naturalizację."
          },
          {
            "nr": 2,
            "tekst": "<strong>Zbierz dokumenty:</strong> ważny paszport, zezwolenie na pobyt, dowód integracji, akt urodzenia (zalegalizowany jeśli konieczne)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Zapłać opłatę:</strong> €1.139 (jedna osoba) lub €1.454 (z partnerem) przy składaniu — taryfy 2026. Jesteś posiadaczem statusu azylowego lub bezpaństwowcem? Wtedy obowiązuje obniżona taryfa: €847 (pojedynczo) lub €1.163 (z partnerem). Zapytaj gminę, czy dostępny jest program wsparcia."
          },
          {
            "nr": 4,
            "tekst": "<strong>Czekaj na decyzję</strong> IND. Trwa to średnio 6–12 miesięcy."
          },
          {
            "nr": 5,
            "tekst": "<strong>Ceremonia naturalizacji:</strong> po zatwierdzeniu otrzymasz zaproszenie na ceremonię w gminie."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Więcej informacji na ind.nl"
      },
      "r_eu_burger": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Jako obywatel/ka UE masz inne prawa",
        "sub": "Naturalizacja jako obywatel/ka Holandii jest możliwa, ale nie potrzebujesz holenderskiego obywatelstwa, aby tu mieszkać i pracować.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Prawa obywatela UE:</strong> Jako obywatel/ka rumuński/a lub polski/a masz prawo mieszkać, pracować i studiować w Holandii bez zezwolenia na pobyt. Rejestrujesz się w gminie (BRP)."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Uwaga na podwójne obywatelstwo:</strong> Zasadą główną jest, że przy naturalizacji rezygnujesz z obywatelstwa rumuńskiego lub polskiego. Jednak: jeśli Twój kraj nie pozwala na rezygnację lub jest to niemożliwe, podlegasz wyjątkowi prawnemu i możesz zachować oba obywatelstwa. Zapytaj w ambasadzie, czy rezygnacja jest w Twoim przypadku obowiązkowa i możliwa."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Mimo to chcesz się naturalizować?</strong> Standardowe warunki dotyczą również obywateli UE: 5 lat, integracja, brak kartoteki, zrzeczenie się obywatelstwa."
          },
          {
            "nr": 2,
            "tekst": "<strong>Podwójne obywatelstwo:</strong> Zapytaj w ambasadzie rumuńskiej lub polskiej, czy musisz i czy możesz zrezygnować. Jeśli nie możesz, zachowujesz obywatelstwo dzięki wyjątkowi prawnemu. Zasady różnią się w zależności od kraju."
          },
          {
            "nr": 3,
            "tekst": "<strong>Chcesz kontynuować?</strong> Przejdź przez weryfikator ponownie i wybierz \"zezwolenie na pobyt\"."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Informacje na ind.nl"
      },
      "r_minderjarig": {
        "type": "wacht",
        "icoon": "🎂",
        "titel": "Naturalizacja dzieci odbywa się przez rodziców",
        "sub": "Małoletnie dzieci mogą zostać naturalizowane razem z rodzicem, który składa wniosek lub już ma holenderskie obywatelstwo.",
        "alternatieven": [
          {
            "naam": "Naturalizacja razem",
            "tekst": "Jeśli Twój rodzic zostanie naturalizowany, Ty możesz automatycznie zostać naturalizowany/a."
          },
          {
            "naam": "Przez sąd",
            "tekst": "W niektórych przypadkach możliwa jest osobna naturalizacja małoletnich."
          },
          {
            "naam": "Poczekaj do 18 lat",
            "tekst": "W wieku 18 lat możesz samodzielnie złożyć wniosek."
          },
          {
            "naam": "Procedura opcji",
            "tekst": "Jeśli urodziłeś/aś się w Holandii, czasem możesz zostać Holendrem/Holenderką przez procedurę \"opcji\"."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden",
        "linkTekst": "→ Więcej informacji na ind.nl"
      },
      "r_geen_vergunning": {
        "type": "negatief",
        "icoon": "📋",
        "titel": "Najpierw potrzebujesz zezwolenia na pobyt",
        "sub": "Naturalizacja jest możliwa tylko jeśli legalnie przebywasz w Holandii. Najpierw uzyskaj ważne zezwolenie na pobyt.",
        "alternatieven": [
          {
            "naam": "Wniosek o azyl",
            "tekst": "Jeśli potrzebujesz ochrony, możesz złożyć wniosek o azyl do IND."
          },
          {
            "naam": "Zwykłe zezwolenie",
            "tekst": "Do pracy, nauki lub łączenia rodzin dostępne są zwykłe zezwolenia."
          },
          {
            "naam": "Pomoc prawna",
            "tekst": "Skontaktuj się z organizacją ds. uchodźców lub adwokatem."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Bezpłatne wsparcie prawne dla wnioskodawców azylowych i posiadaczy statusu."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Skontaktuj się z VluchtelingenWerk"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Jeszcze nie mieszkasz wystarczająco długo w Holandii",
        "sub": "Obecnie musisz mieszkać w Holandii nieprzerwanie co najmniej 5 lat z ważnym pobytem. Od nowych przepisów azylowych z 2026 roku jest kilka rzeczy, na które warto zwrócić uwagę podczas oczekiwania. Czas oczekiwania możesz dobrze wykorzystać.",
        "alternatieven": [
          {
            "naam": "Przedłuż zezwolenie na czas",
            "tekst": "Nowe zezwolenia azylowe są ważne maksymalnie 3 lata; dlatego przedłużaj na czas. Jeśli powstanie \"luka pobytowa\" (verblijfsgat) — okres między dwoma zezwoleniami, w którym nie masz ważnego zezwolenia — ten czas nie liczy się jako legalny pobyt, a odliczanie 5 lat do naturalizacji może zacząć się od nowa. Dlatego złóż wniosek o przedłużenie najpóźniej w ciągu 4 tygodni po wygaśnięciu: wtedy IND nie uzna tego za lukę pobytową."
          },
          {
            "naam": "Nie ma już czasu nieokreślonego",
            "tekst": "Bezterminowe zezwolenie azylowe nie jest już wydawane. Dla naturalizacji to nie problem: możesz się naturalizować z ważnego zezwolenia tymczasowego."
          },
          {
            "naam": "Okres naturalizacji: możliwe 10 lat",
            "tekst": "Uwaga: dotyczy to czasu oczekiwania przed naturalizacją, a nie Twojego zezwolenia na pobyt. Rząd chce wydłużyć ten okres naturalizacji z 5 do 10 lat. Jeszcze nieprzyjęte, ale weź pod uwagę. Z holenderskim partnerem okres może być krótszy — zapytaj gminę."
          },
          {
            "naam": "Alternatywa: rezydent długoterminowy UE",
            "tekst": "Teraz, gdy bezterminowe zezwolenie azylowe jest wycofywane, status \"rezydenta długoterminowego UE\" po 5 latach jest ważną alternatywą: zachowujesz własne obywatelstwo i uzyskujesz silne prawa pobytowe. <strong>Ważne: obowiązuje tu wymóg dochodowy</strong> — praca i stabilny, wystarczający własny dochód mają tu duże znaczenie. Zobacz niebieski przycisk poniżej."
          },
          {
            "naam": "Ukończ integrację",
            "tekst": "Wykorzystaj czas oczekiwania na zdanie egzaminu z integracji — twardy wymóg do naturalizacji."
          },
          {
            "naam": "Zbierz dokumenty",
            "tekst": "Z wyprzedzeniem zamów oficjalne dokumenty z kraju pochodzenia i pracuj nad holenderskim, na przykład poprzez kurs językowy w placówce z certyfikatem Blik op Werk."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Zobacz: rezydent długoterminowy UE (stały pobyt po 5 latach)"
        },
        "link": "https://ind.nl/en/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/new-laws-and-regulations-on-asylum-and-family-reunification",
        "linkTekst": "→ Zobacz nowe przepisy azylowe 2026 na ind.nl"
      },
      "r_bezig_b1": {
        "type": "route",
        "icoon": "📖",
        "titel": "Możesz już zacząć przygotowywać naturalizację",
        "sub": "Realizujesz trasę B1 ale nie ukończyłeś/aś jeszcze egzaminu. Możesz już rozpocząć procedurę — dyplom musi być gotowy przed decyzją IND.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 <strong>Wskazówka:</strong> Zapytaj w gminie, czy możesz złożyć wniosek podczas kończenia trasy B1."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Kontynuuj trasę B1:</strong> zdaj egzamin językowy i egzamin KNM."
          },
          {
            "nr": 2,
            "tekst": "<strong>Zamów dokumenty z wyprzedzeniem:</strong> paszport, akt urodzenia, zezwolenie na pobyt."
          },
          {
            "nr": 3,
            "tekst": "<strong>Zapytaj w gminie,</strong> czy możesz złożyć wniosek podczas realizacji trasy."
          },
          {
            "nr": 4,
            "tekst": "<strong>Po uzyskaniu dyplomu:</strong> wyślij dowód do gminy/IND."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Więcej informacji na ind.nl"
      },
      "r_bezig_onderwijs": {
        "type": "route",
        "icoon": "🏫",
        "titel": "Możesz już zacząć przygotowywać naturalizację",
        "sub": "Realizujesz trasę edukacyjną — intensywny program przejściowy językowy trwający 1,5–2 lata.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Uwaga:</strong> żadna ścieżka integracji sama w sobie nie daje \"zwolnienia\". Spełniasz obowiązek integracji, gdy tylko pomyślnie ukończysz Ścieżkę edukacyjną — czyli zdasz wymagane egzaminy językowe (B1: czytanie, słuchanie, pisanie, mówienie) oraz egzamin KNM. To spełnia również wymóg integracji do naturalizacji. Sama Ścieżka edukacyjna jest więc programem językowym, a nie dyplomem MBO lub HBO."
          },
          {
            "type": "blauw",
            "tekst": "💡 <strong>Wskazówka:</strong> Możesz już rozpocząć procedurę naturalizacji. Dyplom musi być gotowy przed decyzją IND."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Zakończ trasę edukacyjną:</strong> zdaj egzamin językowy (B1) i egzamin KNM."
          },
          {
            "nr": 2,
            "tekst": "<strong>Zamów dokumenty z wyprzedzeniem:</strong> paszport, akt urodzenia, zezwolenie na pobyt."
          },
          {
            "nr": 3,
            "tekst": "<strong>Zapytaj w gminie,</strong> czy możesz złożyć wniosek podczas realizacji trasy."
          },
          {
            "nr": 4,
            "tekst": "<strong>Po uzyskaniu dyplomu:</strong> wyślij dowód do gminy/IND."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Więcej informacji na ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Naturalizacja przez trasę Z — ważna różnica",
        "sub": "Ukończenie trasy Z nie oznacza automatycznie spełnienia wymogu integracji do naturalizacji. Przez DUO istnieją trzy ścieżki.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Ważne:</strong> Ścieżka Z nie ma obowiązku egzaminacyjnego, lecz obowiązek starań (800 godzin lekcji języka + rozmowa końcowa). Dlatego jej ukończenie <em>nie</em> daje automatycznie prawa do naturalizacji. Dodatkowo potrzebujesz rekomendacji wyłączenia DUO lub zdanego egzaminu A2.<br><br><em>Możliwe w przyszłości:</em> rząd chce podnieść wymóg językowy do naturalizacji z A2 do B1. Nie zostało to jeszcze przyjęte — obecnie nadal obowiązuje A2."
          }
        ],
        "paden": [
          {
            "nr": "A",
            "titel": "Zdanie egzaminu integracyjnego na poziomie A2",
            "tekst": "Zdaj wszystkie egzaminy językowe na poziomie A2 i egzamin KNM. Po zdaniu masz dyplom DUO i spełniasz wymóg integracji."
          },
          {
            "nr": "B",
            "titel": "600 godzin kursów językowych (A2) + co najmniej 3 próby na komponent egzaminu",
            "tekst": "600 godzin kursów na poziomie A2 w instytucji Blik op Werk i 3 próby na komponent. DUO może wydać rekomendację zwolnienia bez zdanego egzaminu."
          },
          {
            "nr": "C",
            "titel": "600 godzin alfabetyzacji + test DUO — 150 €",
            "tekst": "600 godzin alfabetyzacji w instytucji Blik op Werk i test DUO pokazuje, że A2 jest nieosiągalne. Przyznawane jest zwolnienie. Test kosztuje 150 €."
          }
        ],
        "info": "📞 <strong>Porada:</strong> Skonsultuj się z gminą lub VluchtelingenWerk.",
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Pomoc przez VluchtelingenWerk"
      },
      "r_geen_inburgering": {
        "type": "wacht",
        "icoon": "📚",
        "titel": "Potrzebujesz integracji obywatelskiej do naturalizacji",
        "sub": "Bez dyplomu integracji lub zwolnienia nie możesz złożyć wniosku o naturalizację. Zacznij teraz — za 1–3 lata będziesz gotowy/a.",
        "alternatieven": [
          {
            "naam": "Zapytaj o swoją ścieżkę nauki",
            "tekst": "Udaj się do gminy, aby dowiedzieć się, która ścieżka Ci odpowiada (B1, Ścieżka edukacyjna lub Ścieżka Z)."
          },
          {
            "naam": "Zacznij lekcje języka",
            "tekst": "Bierz lekcje języka w placówce z certyfikatem Blik op Werk. Zapytaj gminę o możliwości i ewentualny zwrot kosztów."
          },
          {
            "naam": "Złóż wniosek o egzamin",
            "tekst": "Jeśli mówisz już wystarczająco po holendersku, możesz złożyć wniosek o egzamin bezpośrednio przez DUO."
          },
          {
            "naam": "Zwolnienie czy wyłączenie?",
            "tekst": "Zwolnienie (vrijstelling) jest możliwe, jeśli masz już dyplom w języku holenderskim (MBO-2 lub wyższy, HBO lub WO). Jeśli choroba lub niepełnosprawność naprawdę uniemożliwia Ci integrację, DUO może przyznać (częściowe) wyłączenie (ontheffing) ze względów medycznych. Gmina/IND decyduje, czy liczy się to także do naturalizacji."
          }
        ],
        "link": "https://www.inburgeren.nl",
        "linkTekst": "→ Więcej o integracji na inburgeren.nl"
      },
      "r_strafblad": {
        "type": "negatief",
        "icoon": "⚖️",
        "titel": "Kartoteka kryminalna może zablokować naturalizację",
        "sub": "W zależności od rodzaju skazania i jak dawno temu, może to stanowić przeszkodę. Poproś specjalistę o ocenę Twojej sytuacji.",
        "alternatieven": [
          {
            "naam": "Porady prawne",
            "tekst": "Zapytaj doradcę prawnego, czy Twoja sytuacja stanowi przeszkodę dla naturalizacji."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Bezpłatna pomoc prawna dla posiadaczy statusu."
          },
          {
            "naam": "Okres oczekiwania",
            "tekst": "Po określonym czasie oczekiwania możesz ponownie złożyć wniosek."
          },
          {
            "naam": "Drobne mandaty",
            "tekst": "Mandaty drogowe i drobne wykroczenia zazwyczaj NIE są brane pod uwagę."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Skontaktuj się z VluchtelingenWerk"
      },
      "r_strafblad_check": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Sprawdź, czy masz kartotekę kryminalną",
        "sub": "Możesz złożyć wniosek o Zaświadczenie o Niekaralności (VOG) na justis.nl, aby zobaczyć co jest zarejestrowane.",
        "alternatieven": [
          {
            "naam": "Złóż wniosek o VOG",
            "tekst": "Złóż wniosek o Zaświadczenie o Niekaralności (VOG) przez justis.nl."
          },
          {
            "naam": "Bezpłatne dla beneficjentów",
            "tekst": "Jeśli otrzymujesz zasiłek, VOG może być bezpłatne."
          },
          {
            "naam": "Drobne mandaty się nie liczą",
            "tekst": "Mandaty drogowe i drobne wykroczenia zazwyczaj NIE są brane pod uwagę."
          },
          {
            "naam": "Porady prawne",
            "tekst": "W razie wątpliwości skonsultuj się z doradcą prawnym lub VluchtelingenWerk."
          }
        ],
        "link": "https://www.justis.nl/producten/vog",
        "linkTekst": "→ Złóż wniosek o VOG na justis.nl"
      },
      "r_geen_verblijf": {
        "type": "negatief",
        "icoon": "🏠",
        "titel": "Twoje główne miejsce zamieszkania musi być w Holandii",
        "sub": "Jeśli mieszkasz głównie za granicą, nie spełniasz wymogu zamieszkania do naturalizacji.",
        "alternatieven": [
          {
            "naam": "Przenieś główne miejsce zamieszkania",
            "tekst": "Przenieś swoje oficjalne główne miejsce zamieszkania do Holandii."
          },
          {
            "naam": "Rejestracja BRP",
            "tekst": "Upewnij się, że jesteś zarejestrowany/a w BRP w swojej gminie."
          },
          {
            "naam": "Podróże są dozwolone",
            "tekst": "Okazjonalne wyjazdy za granicę nie są problemem, o ile Holandia jest Twoją bazą."
          },
          {
            "naam": "Więcej informacji",
            "tekst": "Zapytaj w gminie o dokładne wymagania dotyczące zamieszkania."
          }
        ],
        "link": "https://ind.nl/nl/nederlander-worden/naturalisatie",
        "linkTekst": "→ Więcej informacji na ind.nl"
      },
      "r_nationaliteit": {
        "type": "wacht",
        "icoon": "🌍",
        "titel": "Zrzeczenie się obywatelstwa to poważny krok",
        "sub": "Holandia zwykle nie zezwala na podwójne obywatelstwo. Są wyjątki — a jeśli naprawdę nie chcesz rezygnować ze swojego obywatelstwa, istnieje silna alternatywa. Przeczytaj to uważnie przed podjęciem decyzji.",
        "alternatieven": [
          {
            "naam": "Wyjątek dla posiadaczy statusu",
            "tekst": "Jako uznany uchodźca NIE musisz rezygnować ze swojego obywatelstwa."
          },
          {
            "naam": "Wyjątek: niemożliwe",
            "tekst": "Jeśli rezygnacja jest niemożliwa lub niebezpieczna, może istnieć wyjątek."
          },
          {
            "naam": "Wyjątek: holenderski partner",
            "tekst": "Jesteś w związku małżeńskim z obywatelem Holandii? Wtedy obowiązują specjalne zasady."
          },
          {
            "naam": "Alternatywa: rezydent długoterminowy UE",
            "tekst": "Naprawdę chcesz zachować obywatelstwo? Wtedy \"rezydent długoterminowy UE\" jest często najsilniejszą alternatywą. Zobacz niebieski przycisk poniżej."
          },
          {
            "naam": "Porada prawna",
            "tekst": "Zleć ocenę swojej sytuacji — czasem możliwe jest więcej, niż myślisz."
          }
        ],
        "link": "https://ind.nl/en/permanent-wonen/eu-langdurig-ingezetene",
        "linkTekst": "→ Przeczytaj więcej o rezydencie długoterminowym UE na ind.nl",
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Zobacz: rezydent długoterminowy UE (zachowaj obywatelstwo)"
        }
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Istnieją sposoby na obniżenie kosztów",
        "sub": "Naturalizacja kosztuje €1.139 (jedna osoba) lub €1.454 (z partnerem) — taryfy 2026; obniżona taryfa €847/€1.163 dla posiadaczy statusu azylowego/bezpaństwowców. Istnieją sposoby, aby uczynić to przystępnym.",
        "alternatieven": [
          {
            "naam": "Obniżona taryfa azyl/bezpaństwowiec",
            "tekst": "Jesteś posiadaczem statusu azylowego lub bezpaństwowcem? Wtedy płacisz obniżoną taryfę: €847 (pojedynczo) lub €1.163 (z partnerem). Gmina stosuje to na podstawie Twojego statusu."
          },
          {
            "naam": "Fundusz gminny",
            "tekst": "Niektóre gminy (częściowo) refundują koszty dla posiadaczy statusu."
          },
          {
            "naam": "Pomoc specjalna",
            "tekst": "Złóż wniosek o pomoc specjalną (bijzondere bijstand) w gminie na opłatę."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Wiedzą, jakie fundusze są dostępne w Twojej gminie."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl",
        "linkTekst": "→ Pomoc z kosztami przez VluchtelingenWerk"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Rezydent długoterminowy UE — zostań na stałe bez rezygnacji z obywatelstwa",
        "sub": "Stały status pobytu po 5 latach legalnego pobytu. Zachowujesz własne obywatelstwo i uzyskujesz silne, trwałe prawa pobytowe. Teraz, gdy bezterminowe zezwolenie azylowe jest znoszone, jest to często najważniejsza alternatywa dla naturalizacji.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Co to jest:</strong> możesz mieszkać w Holandii bezterminowo i swobodnie pracować, a także łatwiej przeprowadzać się i pracować w innych krajach UE. Twoje lata azylowe liczą się do 5 lat; lata studiów liczą się w 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Ważna różnica względem naturalizacji:</strong> dla tego statusu obowiązuje <strong>wymóg dochodowy</strong> (samodzielny, trwały i wystarczający dochód). Jeśli utrzymujesz się z zasiłku, często go nie spełnisz — a wtedy naturalizacja jest właściwie bardziej dostępna, bo nie ma wymogu dochodowego."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Kiedy jest to dla Ciebie interesujące?</strong> Jeśli nie chcesz lub nie możesz zrezygnować z pierwszego obywatelstwa — do naturalizacji co do zasady musisz, tutaj nie."
          },
          {
            "nr": 2,
            "tekst": "<strong>Albo:</strong> teraz, gdy bezterminowe zezwolenie azylowe znika, jest to droga od tymczasowego (3-letniego) zezwolenia do trwałego prawa pobytu."
          },
          {
            "nr": 3,
            "tekst": "<strong>Wymogi:</strong> 5 lat nieprzerwanego legalnego pobytu (lata azylowe się liczą), zdana integracja (co najmniej A2), ważny paszport i wystarczający samodzielny, trwały dochód."
          },
          {
            "nr": 4,
            "tekst": "<strong>Składanie wniosku:</strong> w IND. Jeśli składasz wniosek o zezwolenie bezterminowe, IND automatycznie sprawdza, czy możesz też uzyskać status rezydenta długoterminowego UE."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Przeczytaj więcej o rezydencie długoterminowym UE na ind.nl"
      }
    }
  }
};
