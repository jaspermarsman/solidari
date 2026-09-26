// naturalisatie-data.js — vragen + resultaten per taal
// Meertalig. NL + vertalingen bijgewerkt naar juni 2026 (tweestatusstelsel,
// leges 2026, EU-langdurig ingezetene). Zie _NAT_CONFIG voor de actuele leges.

window._NAT_CONFIG = {
  "jaar": 2026,
  "gecontroleerd": "2026-09",
  "leges": {
    "enkel": "€1.139",
    "metPartner": "€1.454",
    "verlaagdAsiel": "€847",
    "verlaagdAsielPartner": "€1.163",
    "kind": "€168",
    "euLangdurig": "€254"
  }
};

window._NAT = {
  "NL": {
    "header": {
      "badge": "🇳🇱 Naturalisatie Checker",
      "titel": "Kom ik in aanmerking voor een Nederlands paspoort?",
      "sub": "Beantwoord een paar vragen en zie of je Nederlander kunt worden. Op basis van de regels van 2026, ook de nieuwe asielregels sinds 12 juni 2026.",
      "disclaimer": "⚠️ Deze checker geeft een indicatie, geen besluit. Gecontroleerd in september 2026 (IND, Stimulansz). Sinds 12 juni 2026 is er geen asielvergunning voor onbepaalde tijd meer. Statushouders met een asielvergunning voor bepaalde tijd moeten daarom eerst EU-langdurig ingezetene worden voordat ze kunnen naturaliseren. Aangekondigde plannen van het kabinet zijn nog geen wet. Vraag altijd advies aan de gemeente of VluchtelingenWerk.",
      "vwnLabel": "Twijfel je over jouw situatie?",
      "vwnTekst": "Naturalisatieregels veranderen snel en jouw situatie kan anders liggen dan de checker aangeeft. VluchtelingenWerk heeft spreekuren en begeleiding bij naturalisatie — kijk op <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a> voor een locatie bij jou in de buurt.",
      "hulpRegulierLabel": "Twijfel je over jouw situatie?",
      "hulpRegulierTekst": "Het Juridisch Loket geeft gratis advies over je verblijfsvergunning en naturalisatie. Kijk op <a href=\"https://www.juridischloket.nl\" target=\"_blank\" style=\"color:inherit;\">juridischloket.nl</a> of vraag het bij je gemeente."
    },
    "ui": {
      "volgendeStappen": "Volgende stappen",
      "watKunJeDoen": "Wat kun je doen?",
      "watKunJeNuDoen": "Wat kun je nu doen?",
      "opnieuw": "↺ Opnieuw beginnen",
      "laatChecken": "Laat je situatie checken",
      "vraagLabel": "Vraag {n}",
      "jeKuntKiezen": "Je kunt kiezen:",
      "ladenMislukt": "Er ging iets mis bij het laden van deze pagina. Vernieuw de pagina of probeer het later opnieuw.",
      "driePaden": "De drie paden voor naturalisatie vanuit de Z-route"
    },
    "vragen": {
      "v1": {
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
        "tekst": "Wat voor verblijf heb je in Nederland?",
        "uitleg": "Het soort vergunning bepaalt je route naar het Nederlanderschap. EU-burgers wonen hier op basis van EU-recht.",
        "antwoorden": [
          {
            "tekst": "Ik heb een asielvergunning (statushouder)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel",
            "pad": "asiel"
          },
          {
            "tekst": "Ik heb een andere verblijfsvergunning",
            "sub": "Bijvoorbeeld voor gezin, werk of studie",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v_regulier",
            "pad": "regulier"
          },
          {
            "tekst": "Ik ben EU-burger",
            "sub": "Of burger van EER/Zwitserland",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Ik weet het niet zeker",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "Welke asielvergunning heb je nu?",
        "uitleg": "Kijk op je verblijfspas: staat er 'onbepaalde tijd', of een einddatum?",
        "antwoorden": [
          {
            "tekst": "Asiel voor onbepaalde tijd",
            "sub": "Op je pas staat geen einddatum voor je verblijfsrecht",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Asiel voor bepaalde tijd",
            "sub": "3 of 5 jaar geldig, ook als je hem vóór 12 juni 2026 kreeg",
            "icoon": "📅",
            "klasse": "anders",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "Ik ben al EU-langdurig ingezetene",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Ik weet het niet",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "Je vergunning blijft geldig — maar Nederlander worden gaat via een tussenstap",
        "uitleg": "Je asielvergunning blijft geldig tot de datum op je pas. Maar met een asielvergunning voor bepaalde tijd kun je geen naturalisatie aanvragen. Dat geldt ook als je de vergunning vóór 12 juni 2026 kreeg. Sinds 12 juni 2026 bestaat de asielvergunning voor onbepaalde tijd niet meer.<br><br>Daarom moet je eerst <strong>EU-langdurig ingezetene</strong> worden. Daarna kun je naturalisatie aanvragen. De volgende vragen laten zien of dat voor jou al kan.",
        "antwoorden": [
          {
            "tekst": "Ik begrijp het — ga verder",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "e1"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "Zo zie je welke vergunning je hebt",
        "uitleg": "Kijk op je verblijfspas, bij 'Type document en bijzonderheden' (het typenummer en de tekst ernaast), of in de brief van de IND. Let op twee dingen:<br><br>1. Staat er <strong>asiel</strong> of een ander doel (zoals gezin of werk)?<br>2. Staat er '<strong>onbepaalde tijd</strong>', of staat er een <strong>einddatum</strong>?<br><br>Kom je er niet uit? Vraag het je begeleider bij de gemeente of VluchtelingenWerk.",
        "antwoorden": [
          {
            "tekst": "Ik heb het gevonden — terug naar de vraag",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Ik kan het niet nagaan",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "v_regulier": {
        "tekst": "Wat voor verblijfsvergunning heb je?",
        "uitleg": "Voor naturalisatie heb je een vergunning nodig voor onbepaalde tijd, of voor een doel dat niet tijdelijk is, zoals wonen bij je partner of werk. Op je verblijfspas staat het doel en of er een einddatum is.",
        "antwoorden": [
          {
            "tekst": "Voor onbepaalde tijd",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Voor bepaalde tijd — voor gezin, partner of werk",
            "icoon": "👨‍👩‍👧",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Voor bepaalde tijd — voor studie of ander tijdelijk verblijf",
            "sub": "Bijvoorbeeld seizoenarbeid, medische behandeling, uitwisseling of het zoekjaar voor hoogopgeleiden",
            "icoon": "🎓",
            "klasse": "nee",
            "volgende": "r_regulier_tijdelijk"
          },
          {
            "tekst": "Ik weet het niet",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "e1": {
        "tekst": "Woon je al 5 jaar of langer achter elkaar in Nederland met een geldige vergunning?",
        "uitleg": "Met een asielvergunning voor bepaalde tijd kun je pas Nederlander worden als je eerst EU-langdurig ingezetene bent. Daarvoor moet je minstens 5 jaar achter elkaar in Nederland wonen met een geldige vergunning. De jaren met een asielvergunning tellen mee. Of de tijd in de asielprocedure meetelt, bepaalt de IND.",
        "antwoorden": [
          {
            "tekst": "Ja, 5 jaar of langer",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "Nee, korter dan 5 jaar",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "Ben je in die 5 jaar lang in het buitenland geweest?",
        "uitleg": "Voor EU-langdurig ingezetene mag je niet langer dan 6 maanden achter elkaar buiten Nederland zijn geweest. In totaal mag het niet meer dan 10 maanden zijn.",
        "antwoorden": [
          {
            "tekst": "Nee, nooit zo lang",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "Ja, langer dan 6 maanden achter elkaar, of meer dan 10 maanden in totaal",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "Dat weet ik niet precies",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "Heb je genoeg eigen inkomen om van te leven?",
        "uitleg": "Voor EU-langdurig ingezetene moet je genoeg eigen inkomen hebben. Dat moet zelfstandig zijn (niet van een uitkering) en duurzaam (het blijft). Je hebt ook een zorgverzekering nodig.",
        "antwoorden": [
          {
            "tekst": "Ja, uit werk of een eigen bedrijf",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "Ja, maar pas kort of met een tijdelijk contract",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "Nee, ik heb een uitkering of geen eigen inkomen",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "Hoe staat het met je inburgering?",
        "uitleg": "Voor EU-langdurig ingezetene moet je voldoen aan de inburgeringseis. Dat kan via de B1-route, de onderwijsroute of de Z-route.",
        "antwoorden": [
          {
            "tekst": "Klaar via de B1-route of onderwijsroute, of ik heb vrijstelling",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "Klaar via de Z-route",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "Ik ben nog bezig",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "Is je verblijfsvergunning nu geldig?",
        "uitleg": "Je vergunning moet geldig zijn als je naturalisatie aanvraagt, en blijven gelden tot de beslissing. Verleng hem altijd op tijd, zodat je verblijf ononderbroken blijft.",
        "antwoorden": [
          {
            "tekst": "Ja, mijn vergunning is geldig",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "Nee, mijn vergunning is verlopen of ik heb er geen",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
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
        "tekst": "Je hebt de Z-route afgerond — er is nog één extra stap nodig voor naturalisatie",
        "uitleg": "De Z-route sluit af met een eindgesprek en certificaat, maar voor naturalisatie gelden aanvullende taaleisen vanuit de IND. Er zijn drie paden om toch te kunnen naturaliseren:<br><br><strong>Pad A — Alsnog examen halen op A2-niveau</strong><br>Haal alle taalexamens op A2 (lezen, luisteren, schrijven, spreken) én het KNM-examen. Let op: nu de Z-route is afgerond zijn examenpogingen niet langer kosteloos.<br><br><strong>Pad B — 600 uur taalles + minimaal 3 pogingen per onderdeel</strong><br>Minstens 600 uur taalles op A2-niveau bij een Blik op Werk instelling én 3 pogingen per onderdeel? Dan kan DUO een ontheffingsadvies geven.<br><br><strong>Pad C — 600 uur alfabetisering + DUO-toets (€150)</strong><br>Minstens 600 uur alfabetisering en blijkt A2 niet haalbaar? Dan volgt een ontheffing via DUO-toets (€150).<br><br><em>Mogelijk in de toekomst:</em> het kabinet wil de taaleis voor naturalisatie verhogen van A2 naar B1. Dit is nog niet aangenomen — op dit moment geldt nog A2.<br><br>💡 Overleg met jouw gemeente welk pad het beste past.",
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
        "tekst": "Ben je bereid afstand te doen van je huidige nationaliteit?",
        "uitleg": "Nederland staat in principe geen dubbele nationaliteit toe. Er zijn uitzonderingen, bijvoorbeeld voor erkende vluchtelingen.",
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
            "volgende": "v8",
            "alleenPad": "asiel"
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
        "info": "💡 Ben je erkend vluchteling? Dan hoef je meestal geen afstand te doen van je oorspronkelijke nationaliteit.",
        "infoAlleenPad": "asiel",
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
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
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
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
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
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
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
            "tekst": "Als je bescherming nodig hebt, kun je een asielaanvraag indienen bij de IND.",
            "alleenPad": "asiel"
          },
          {
            "naam": "Reguliere vergunning",
            "tekst": "Voor werk, studie of gezinshereniging zijn er reguliere vergunningen."
          },
          {
            "naam": "Juridische hulp",
            "tekst": "Neem contact op met een advocaat of het Juridisch Loket."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Gratis juridische ondersteuning voor asielzoekers en statushouders.",
            "alleenPad": "asiel"
          }
        ],
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Hulp via het Juridisch Loket"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Nog niet lang genoeg in Nederland",
        "sub": "Je moet minimaal 5 jaar aaneengesloten in Nederland wonen. Je kunt de wachttijd goed benutten.",
        "alternatieven": [
          {
            "naam": "Verleng je vergunning op tijd",
            "tekst": "Komt er een periode zonder geldige vergunning (een \"verblijfsgat\"), dan telt die tijd niet mee. De 5 jaar kunnen dan opnieuw gaan tellen. Vraag verlenging daarom op tijd aan. Vraag verlenging daarom uiterlijk binnen 4 weken na afloop aan: dan ziet de IND het niet als verblijfsgat."
          },
          {
            "naam": "Naturalisatietermijn: mogelijk 10 jaar",
            "tekst": "Let op: dit gaat over de wachttijd vóórdat je kunt naturaliseren, niet over je verblijfsvergunning. Het kabinet wil deze naturalisatietermijn verlengen van 5 naar 10 jaar. Nog niet aangenomen, maar houd er rekening mee. Met een Nederlandse partner kan de termijn juist korter zijn — vraag dit na bij de gemeente."
          },
          {
            "naam": "Alternatief: EU-langdurig ingezetene",
            "tekst": "EU-langdurig ingezetene geeft na 5 jaar een blijvend verblijfsrecht, en je houdt je eigen nationaliteit. <strong>Hiervoor geldt wél een inkomenseis.</strong>"
          },
          {
            "naam": "Inburgering afronden",
            "tekst": "Gebruik de wachttijd om je inburgeringsexamen te halen — een harde eis voor naturalisatie."
          },
          {
            "naam": "Documenten verzamelen",
            "tekst": "Vraag alvast officiële documenten op uit je land van herkomst en werk aan je Nederlands, bijvoorbeeld via een taalcursus bij een instelling met het Blik op Werk keurmerk."
          },
          {
            "naam": "Plan van het kabinet (nog geen wet)",
            "tekst": "statushouders die twee keer een tijdelijke asielvergunning hebben gekregen en Nederlands op niveau B1 halen, zouden na 6 jaar Nederlander kunnen worden, ook zonder EU-langdurig ingezetene. Voor wie B1 niet kan halen komt een uitzondering. Er is nog geen wetsvoorstel. Tot die wet er is, gelden de regels hierboven.",
            "alleenPad": "asiel"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Bekijk: EU-langdurig ingezetene (permanent verblijf na 5 jaar)"
        },
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
        "linkTekst": "→ Meer informatie op ind.nl"
      },
      "r_regulier_tijdelijk": {
        "type": "wacht",
        "icoon": "🎓",
        "titel": "Met deze vergunning kun je nog geen Nederlander worden",
        "sub": "Voor naturalisatie heb je een vergunning nodig voor onbepaalde tijd, of voor een doel dat niet tijdelijk is. Een vergunning voor studie of ander tijdelijk verblijf telt niet.",
        "alternatieven": [
          {
            "naam": "Verandert je situatie?",
            "tekst": "Ga je bijvoorbeeld werken, of wonen bij je partner? Dan kun je een andere vergunning aanvragen. Doe daarna deze check opnieuw."
          },
          {
            "naam": "Hoe telt je verblijf mee?",
            "tekst": "Of de jaren met je huidige vergunning meetellen voor de 5 jaar, hangt af van je situatie. Laat dit checken."
          },
          {
            "naam": "Werk alvast aan je Nederlands",
            "tekst": "Voor naturalisatie moet je later ingeburgerd zijn. Een taalcursus helpt nu al."
          }
        ],
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
        "linkTekst": "→ Meer informatie op ind.nl"
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
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
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
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
        "linkTekst": "→ Meer informatie op ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Naturaliseren vanuit de Z-route — belangrijk verschil",
        "padenTitel": "De drie paden voor naturalisatie vanuit de Z-route",
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
        "info": "📞 <strong>Advies:</strong> Overleg met jouw gemeente welk pad het beste bij jouw situatie past.",
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Hulp via het Juridisch Loket"
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
            "tekst": "Gratis juridische hulp voor statushouders.",
            "alleenPad": "asiel"
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
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Hulp via het Juridisch Loket"
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
            "tekst": "Bij twijfel: raadpleeg een juridisch adviseur of het Juridisch Loket."
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
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
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
            "tekst": "Als erkend vluchteling hoef je GEEN afstand te doen van je nationaliteit.",
            "alleenPad": "asiel"
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
        "link": "https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie",
        "linkTekst": "→ Alle uitzonderingen op ind.nl"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "EU-langdurig ingezetene — permanent blijven zonder je nationaliteit op te geven",
        "sub": "Een blijvende verblijfsvergunning na 5 jaar. Je houdt je eigen nationaliteit. Voor nieuwe statushouders is dit sinds 12 juni 2026 ook de verplichte tussenstap op weg naar naturalisatie.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Wat het is:</strong> je mag onbepaald in Nederland wonen en vrij werken, en je verhuist en werkt makkelijker in andere EU-landen. Je asieljaren tellen mee voor de 5 jaar; studiejaren tellen voor 50% mee."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Inkomenseis:</strong> je moet genoeg eigen, duurzaam inkomen hebben en een zorgverzekering. Met een uitkering lukt dat meestal niet. Heb je een asielvergunning voor bepaalde tijd, dan heb je EU-langdurig ingezetene nodig om later te kunnen naturaliseren. De inkomenseis geldt dan dus ook voor jouw weg naar het Nederlanderschap."
          },
          {
            "type": "info",
            "tekst": "✈️ Je mag in de 5 jaar niet langer dan 6 maanden achter elkaar, en niet meer dan 10 maanden in totaal, buiten Nederland zijn."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Wanneer voor jou interessant?</strong> Als je je oorspronkelijke nationaliteit niet wilt of kunt opgeven — bij naturalisatie moet dat in principe wel, hier niet."
          },
          {
            "nr": 2,
            "tekst": "<strong>Asielvergunning voor bepaalde tijd?</strong> Dan is dit de enige weg naar een blijvende vergunning, en daarna naar naturalisatie."
          },
          {
            "nr": 3,
            "tekst": "<strong>Voorwaarden:</strong> 5 jaar achter elkaar legaal in Nederland, niet te lang in het buitenland, genoeg eigen en duurzaam inkomen, een zorgverzekering, en je inburgering afgerond (B1-route, onderwijsroute of Z-route)."
          },
          {
            "nr": 4,
            "tekst": "<strong>Aanvragen:</strong> bij de IND. Vraag je een vergunning voor onbepaalde tijd aan, dan kijkt de IND automatisch of je ook EU-langdurig ingezetene kunt krijgen. Met een asielvergunning kun je alleen op papier aanvragen, niet online."
          }
        ],
        "link": "https://ind.nl/nl/verblijfsvergunningen/langdurig-ingezetene-eu/verblijfsvergunning-eu-langdurig-ingezetene",
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
      },
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Je kunt Nederlander worden — in twee stappen",
        "sub": "Met een asielvergunning voor bepaalde tijd moet je eerst EU-langdurig ingezetene worden. Daarna kun je naturalisatie aanvragen.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Inkomen:</strong> de IND kijkt of je inkomen genoeg is en of het blijft (bij een contract in loondienst moet dat nog minstens 12 maanden geldig zijn). Heb je pas kort werk of een tijdelijk contract? Laat dan eerst checken of je aanvraag kans maakt."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Plan van het kabinet — nog geen wet:</strong> statushouders die twee keer een tijdelijke asielvergunning hebben gekregen en Nederlands op niveau B1 halen, zouden na 6 jaar Nederlander kunnen worden, ook zonder EU-langdurig ingezetene. Voor wie B1 niet kan halen komt een uitzondering. Er is nog geen wetsvoorstel. Tot die wet er is, gelden de regels hierboven."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Vraag EU-langdurig ingezetene aan bij de IND.</strong> Met een asielvergunning kan dat alleen op papier, niet online. De aanvraag kost € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Verzamel bewijs:</strong> je arbeidscontract en loonstroken, je zorgverzekering, en je inburgeringsdiploma of -besluit. Het formulier van de IND zegt precies wat nodig is."
          },
          {
            "nr": 3,
            "tekst": "<strong>Verleng intussen je asielvergunning op tijd.</strong> Zo blijft je verblijf ononderbroken."
          },
          {
            "nr": 4,
            "tekst": "<strong>Ben je EU-langdurig ingezetene? Vraag dan naturalisatie aan bij je gemeente.</strong> Dan gelden de gewone voorwaarden: inburgering voor naturalisatie, geen strafblad en je woont vast in Nederland. Als erkend vluchteling hoef je meestal geen afstand te doen van je nationaliteit."
          }
        ],
        "link": "https://ind.nl/nl/verblijfsvergunningen/langdurig-ingezetene-eu/verblijfsvergunning-eu-langdurig-ingezetene",
        "linkTekst": "→ Lees meer over EU-langdurig ingezetene op ind.nl"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Je kunt EU-langdurig ingezetene worden — voor naturalisatie is daarna een extra stap nodig",
        "sub": "Met de Z-route voldoe je aan de inburgeringseis voor EU-langdurig ingezetene. Voor naturalisatie is dat niet genoeg: daarvoor gelden extra taaleisen.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Inkomen:</strong> de IND kijkt of je inkomen genoeg is en of het blijft (bij een contract in loondienst moet dat nog minstens 12 maanden geldig zijn). Heb je pas kort werk of een tijdelijk contract? Laat dan eerst checken of je aanvraag kans maakt."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Plan van het kabinet — nog geen wet:</strong> statushouders die twee keer een tijdelijke asielvergunning hebben gekregen en Nederlands op niveau B1 halen, zouden na 6 jaar Nederlander kunnen worden, ook zonder EU-langdurig ingezetene. Voor wie B1 niet kan halen komt een uitzondering. Er is nog geen wetsvoorstel. Tot die wet er is, gelden de regels hierboven."
          }
        ],
        "padenTitel": "Na EU-langdurig ingezetene: drie paden naar naturalisatie vanuit de Z-route",
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
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Vraag EU-langdurig ingezetene aan bij de IND.</strong> Met een asielvergunning kan dat alleen op papier, niet online. De aanvraag kost € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Verzamel bewijs:</strong> je arbeidscontract en loonstroken, je zorgverzekering, en je inburgeringsdiploma of -besluit. Het formulier van de IND zegt precies wat nodig is."
          },
          {
            "nr": 3,
            "tekst": "<strong>Verleng intussen je asielvergunning op tijd.</strong> Zo blijft je verblijf ononderbroken."
          },
          {
            "nr": 4,
            "tekst": "<strong>Ben je EU-langdurig ingezetene? Kies dan een van de paden hierboven en vraag daarna naturalisatie aan bij je gemeente.</strong>"
          }
        ],
        "link": "https://ind.nl/nl/verblijfsvergunningen/langdurig-ingezetene-eu/verblijfsvergunning-eu-langdurig-ingezetene",
        "linkTekst": "→ Lees meer over EU-langdurig ingezetene op ind.nl"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "Maak eerst je inburgering af",
        "sub": "Je woont lang genoeg in Nederland en hebt inkomen. Wat nog ontbreekt, is je inburgering. Daarna kun je EU-langdurig ingezetene aanvragen, en later naturalisatie.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 De B1-route, de onderwijsroute en de Z-route tellen alle drie voor EU-langdurig ingezetene. Voor naturalisatie is de Z-route alleen niet genoeg."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Plan van het kabinet — nog geen wet:</strong> statushouders die twee keer een tijdelijke asielvergunning hebben gekregen en Nederlands op niveau B1 halen, zouden na 6 jaar Nederlander kunnen worden, ook zonder EU-langdurig ingezetene. Voor wie B1 niet kan halen komt een uitzondering. Er is nog geen wetsvoorstel. Tot die wet er is, gelden de regels hierboven."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Rond je inburgeringsroute af.</strong> Vraag je gemeente hoe lang je nog nodig hebt."
          },
          {
            "nr": 2,
            "tekst": "<strong>Houd je werk en je zorgverzekering aan.</strong> Die heb je nodig voor de aanvraag."
          },
          {
            "nr": 3,
            "tekst": "<strong>Verleng je asielvergunning op tijd.</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>Doe deze check opnieuw</strong> als je inburgering klaar is."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Wat is EU-langdurig ingezetene?"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "Je inkomen is nu de drempel",
        "sub": "Met een asielvergunning voor bepaalde tijd kun je alleen Nederlander worden als je eerst EU-langdurig ingezetene bent. Daarvoor heb je genoeg eigen inkomen nodig. Met een uitkering lukt dat nu nog niet. Dit is eerlijk gezegd een grote verandering.",
        "alternatieven": [
          {
            "naam": "Werk of meer uren",
            "tekst": "Een baan, of meer uren werken, kan de weg openen. Bekijk met de tool Loont werken wat werken jou oplevert."
          },
          {
            "naam": "Je mag blijven",
            "tekst": "Je asielvergunning blijft gewoon geldig. Verleng hem altijd op tijd."
          },
          {
            "naam": "Maak je inburgering af",
            "tekst": "Die heb je nodig voor EU-langdurig ingezetene en voor naturalisatie."
          },
          {
            "naam": "Partner of uitzondering?",
            "tekst": "Het inkomen van je partner kan meetellen, als jullie samenwonen en je partner Nederlander is of een verblijfsvergunning heeft. Een uitzondering geldt als je de AOW-leeftijd hebt bereikt, of als je blijvend en volledig arbeidsongeschikt bent en dat kunt bewijzen."
          },
          {
            "naam": "Plan van het kabinet (nog geen wet)",
            "tekst": "statushouders die twee keer een tijdelijke asielvergunning hebben gekregen en Nederlands op niveau B1 halen, zouden na 6 jaar Nederlander kunnen worden, ook zonder EU-langdurig ingezetene. Voor wie B1 niet kan halen komt een uitzondering. Er is nog geen wetsvoorstel. Tot die wet er is, gelden de regels hierboven."
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ Bereken wat werken jou oplevert"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "Je bent misschien te lang in het buitenland geweest",
        "sub": "Voor EU-langdurig ingezetene mag je niet langer dan 6 maanden achter elkaar en niet meer dan 10 maanden in totaal buiten Nederland zijn geweest. De 5 jaar kunnen daardoor opnieuw gaan tellen.",
        "alternatieven": [
          {
            "naam": "Tel je reizen na",
            "tekst": "Zoek de data op van je reizen: stempels, tickets of je aanvraag voor een reisdocument."
          },
          {
            "naam": "Laat het checken",
            "tekst": "VluchtelingenWerk of je gemeente kan met je uitrekenen vanaf wanneer je weer 5 jaar hebt."
          },
          {
            "naam": "Blijf voortaan korter weg",
            "tekst": "Plan lange reizen zo dat je onder de grens blijft."
          },
          {
            "naam": "Plan van het kabinet (nog geen wet)",
            "tekst": "statushouders die twee keer een tijdelijke asielvergunning hebben gekregen en Nederlands op niveau B1 halen, zouden na 6 jaar Nederlander kunnen worden, ook zonder EU-langdurig ingezetene. Voor wie B1 niet kan halen komt een uitzondering. Er is nog geen wetsvoorstel. Tot die wet er is, gelden de regels hierboven."
          }
        ],
        "link": "https://ind.nl/nl/verblijfsvergunningen/langdurig-ingezetene-eu/verblijfsvergunning-eu-langdurig-ingezetene",
        "linkTekst": "→ Lees meer over EU-langdurig ingezetene op ind.nl"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Nog niet lang genoeg in Nederland",
        "sub": "Met een asielvergunning voor bepaalde tijd moet je eerst 5 jaar in Nederland wonen. Daarna kun je EU-langdurig ingezetene worden, en dan pas Nederlander. Je kunt de tijd tot dan goed gebruiken.",
        "alternatieven": [
          {
            "naam": "Verleng op tijd",
            "tekst": "Asielvergunningen voor bepaalde tijd gelden nog maximaal 3 jaar; verleng dus op tijd. Komt er een \"verblijfsgat\" — een periode tussen twee vergunningen waarin je geen geldige vergunning hebt — dan telt die tijd niet als rechtmatig verblijf, en kan de 5-jaarstelling voor naturalisatie opnieuw gaan lopen. Vraag verlenging daarom uiterlijk binnen 4 weken na afloop aan: dan ziet de IND het niet als verblijfsgat."
          },
          {
            "naam": "Werk aan je inkomen",
            "tekst": "Voor EU-langdurig ingezetene heb je later genoeg eigen inkomen nodig. Werk nu al aan een baan of aan meer uren."
          },
          {
            "naam": "Rond je inburgering af",
            "tekst": "De B1-route, de onderwijsroute en de Z-route tellen voor EU-langdurig ingezetene."
          },
          {
            "naam": "Blijf niet te lang weg",
            "tekst": "Ga niet langer dan 6 maanden achter elkaar naar het buitenland, en niet meer dan 10 maanden in totaal."
          },
          {
            "naam": "Plan van het kabinet (nog geen wet)",
            "tekst": "statushouders die twee keer een tijdelijke asielvergunning hebben gekregen en Nederlands op niveau B1 halen, zouden na 6 jaar Nederlander kunnen worden, ook zonder EU-langdurig ingezetene. Voor wie B1 niet kan halen komt een uitzondering. Er is nog geen wetsvoorstel. Tot die wet er is, gelden de regels hierboven."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Wat is EU-langdurig ingezetene?"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Laat eerst checken welke vergunning je hebt",
        "sub": "Je route naar het Nederlanderschap hangt af van je vergunning.",
        "alternatieven": [
          {
            "naam": "Asiel voor onbepaalde tijd",
            "tekst": "Je kunt naturaliseren als je aan de andere voorwaarden voldoet."
          },
          {
            "naam": "Asiel voor bepaalde tijd (3 of 5 jaar)",
            "tekst": "Eerst EU-langdurig ingezetene (met inkomenseis), daarna naturalisatie. Ook als je de vergunning vóór 12 juni 2026 kreeg."
          },
          {
            "naam": "Andere vergunning",
            "tekst": "Voor gezin, partner of werk: naturaliseren kan meestal na 5 jaar. Voor studie of ander tijdelijk verblijf nog niet."
          },
          {
            "naam": "Wie kan helpen?",
            "tekst": "Je begeleider bij de gemeente of VluchtelingenWerk kan samen met jou je pas bekijken."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ Vind een VluchtelingenWerk-locatie bij jou"
      }
    }
  },
  "EN": {
    "header": {
      "badge": "🇳🇱 Naturalisation Checker",
      "titel": "Am I eligible for a Dutch passport?",
      "sub": "Answer a few questions and see whether you can become Dutch. Based on the 2026 rules, including the new asylum rules since 12 June 2026.",
      "disclaimer": "⚠️ This checker gives an indication, not a decision. Checked in September 2026 (IND, Stimulansz). Since 12 June 2026 there is no longer an asylum permit for an indefinite period. Status holders with an asylum residence permit (verblijfsvergunning asiel) for a fixed period must therefore first become an EU long-term resident (EU-langdurig ingezetene) before they can naturalise (naturalisatie). Announced government plans are not yet law. Always ask the municipality or VluchtelingenWerk for advice.",
      "vwnLabel": "Not sure about your situation?",
      "vwnTekst": "Naturalisation rules change quickly and your situation may differ from what the checker indicates. VluchtelingenWerk offers drop-in sessions and guidance on naturalisation — find a location near you at <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a>.",
      "hulpRegulierLabel": "Not sure about your situation?",
      "hulpRegulierTekst": "The Legal Services Counter (Juridisch Loket) gives free advice about your residence permit and naturalisation (naturalisatie). Go to <a href=\"https://www.juridischloket.nl\" target=\"_blank\" style=\"color:inherit;\">juridischloket.nl</a> or ask your municipality."
    },
    "ui": {
      "volgendeStappen": "Next steps",
      "watKunJeDoen": "What can you do?",
      "watKunJeNuDoen": "What can you do now?",
      "opnieuw": "↺ Start over",
      "laatChecken": "Have your situation checked",
      "vraagLabel": "Question {n}",
      "jeKuntKiezen": "You can choose:",
      "ladenMislukt": "Something went wrong loading this page. Refresh the page or try again later.",
      "driePaden": "The three paths to naturalisation from the Z-route"
    },
    "vragen": {
      "v1": {
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
        "tekst": "What kind of residence do you have in the Netherlands?",
        "uitleg": "The type of permit determines your route to Dutch citizenship. EU citizens live here on the basis of EU law.",
        "antwoorden": [
          {
            "tekst": "I have an asylum residence permit (status holder)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel",
            "pad": "asiel"
          },
          {
            "tekst": "I have another residence permit",
            "sub": "For example for family, work or study",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v_regulier",
            "pad": "regulier"
          },
          {
            "tekst": "I am an EU citizen",
            "sub": "Or a citizen of the EEA/Switzerland",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "I am not sure",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "Which asylum permit do you have now?",
        "uitleg": "Look at your residence card: does it say 'indefinite period' (onbepaalde tijd), or is there an end date?",
        "antwoorden": [
          {
            "tekst": "Asylum for an indefinite period",
            "sub": "Your card shows no end date for your right of residence",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Asylum for a fixed period",
            "sub": "Valid for 3 or 5 years, also if you got it before 12 June 2026",
            "icoon": "📅",
            "klasse": "anders",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "I am already an EU long-term resident",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "I don't know",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "Your permit stays valid — but becoming Dutch involves an extra step",
        "uitleg": "Your asylum permit stays valid until the date on your card. But with an asylum residence permit (verblijfsvergunning asiel) for a fixed period you cannot apply for naturalisation (naturalisatie). This also applies if you got the permit before 12 June 2026. Since 12 June 2026 the asylum permit for an indefinite period no longer exists.<br><br>That is why you must first become an <strong>EU long-term resident</strong> (EU-langdurig ingezetene). After that you can apply for naturalisation. The next questions show whether that is already possible for you.",
        "antwoorden": [
          {
            "tekst": "I understand — continue",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "e1"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "How to see which permit you have",
        "uitleg": "Look on your residence card, under 'Type document en bijzonderheden' (type of document and remarks: the type number and the text next to it), or in the letter from the IND. Check two things:<br><br>1. Does it say <strong>asylum</strong> (asiel) or another purpose (such as family or work)?<br>2. Does it say '<strong>indefinite period</strong>' (onbepaalde tijd), or is there an <strong>end date</strong>?<br><br>Can't work it out? Ask your support worker at the municipality or VluchtelingenWerk.",
        "antwoorden": [
          {
            "tekst": "I found it — back to the question",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "I can't find out",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "v_regulier": {
        "tekst": "What kind of residence permit do you have?",
        "uitleg": "For naturalisation (naturalisatie) you need a permit for an indefinite period, or for a purpose that is not temporary, such as living with your partner or work. Your residence card shows the purpose and whether there is an end date.",
        "antwoorden": [
          {
            "tekst": "For an indefinite period",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "For a fixed period — for family, partner or work",
            "icoon": "👨‍👩‍👧",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "For a fixed period — for study or another temporary stay",
            "sub": "For example seasonal work, medical treatment, exchange or the orientation year for highly educated persons",
            "icoon": "🎓",
            "klasse": "nee",
            "volgende": "r_regulier_tijdelijk"
          },
          {
            "tekst": "I don't know",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "e1": {
        "tekst": "Have you lived in the Netherlands for 5 years or longer in a row with a valid permit?",
        "uitleg": "With an asylum residence permit (verblijfsvergunning asiel) for a fixed period you can only become Dutch after you have first become an EU long-term resident (EU-langdurig ingezetene). For that you must have lived in the Netherlands for at least 5 years in a row with a valid permit. The years with an asylum permit count. Whether the time in the asylum procedure counts is decided by the IND.",
        "antwoorden": [
          {
            "tekst": "Yes, 5 years or longer",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "No, less than 5 years",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "Have you been abroad for a long time during those 5 years?",
        "uitleg": "For EU long-term residence (EU-langdurig ingezetene) you may not have been outside the Netherlands for longer than 6 months in a row. In total it may not be more than 10 months.",
        "antwoorden": [
          {
            "tekst": "No, never that long",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "Yes, longer than 6 months in a row, or more than 10 months in total",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "I don't know exactly",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "Do you have enough income of your own to live on?",
        "uitleg": "For EU long-term residence (EU-langdurig ingezetene) you must have enough income of your own. It must be independent (not from benefits) and lasting (it continues). You also need health insurance.",
        "antwoorden": [
          {
            "tekst": "Yes, from work or my own business",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "Yes, but only recently or with a temporary contract",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "No, I receive benefits or have no income of my own",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "How is your civic integration going?",
        "uitleg": "For EU long-term residence (EU-langdurig ingezetene) you must meet the civic integration requirement (inburgering). You can do this via the B1 route (B1-route), the education route (onderwijsroute) or the Z-route.",
        "antwoorden": [
          {
            "tekst": "Completed via the B1 route or education route, or I have an exemption",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "Completed via the Z-route",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "I am still working on it",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "Is your residence permit valid now?",
        "uitleg": "Your permit must be valid when you apply for naturalisation (naturalisatie), and stay valid until the decision. Always renew it on time, so that your residence stays uninterrupted.",
        "antwoorden": [
          {
            "tekst": "Yes, my permit is valid",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "No, my permit has expired or I don't have one",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
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
        "tekst": "You have completed the Z-route — one extra step is needed for naturalisation",
        "uitleg": "The Z-route ends with a final interview and a certificate, but for naturalisation the IND applies additional language requirements. There are three paths to still be able to naturalise:<br><br><strong>Path A — Still pass the exam at A2 level</strong><br>Pass all language exams at A2 (reading, listening, writing, speaking) and the KNM exam. Note: now that the Z-route is finished, exam attempts are no longer free.<br><br><strong>Path B — 600 hours of language lessons + at least 3 attempts per component</strong><br>At least 600 hours of A2-level lessons at a Blik op Werk certified provider and 3 attempts per component? Then DUO can issue a dispensation recommendation.<br><br><strong>Path C — 600 hours of literacy + DUO test (€150)</strong><br>At least 600 hours of literacy training and it turns out A2 is not achievable? Then a dispensation follows via a DUO test (€150).<br><br><em>Possible in the future:</em> the government wants to raise the language requirement for naturalisation from A2 to B1. This has not yet been adopted — at the moment A2 still applies.<br><br>💡 Discuss with your municipality which path suits you best.",
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
        "tekst": "Are you willing to renounce your current nationality?",
        "uitleg": "The Netherlands generally does not allow dual nationality. There are exceptions, for example for recognised refugees.",
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
            "volgende": "v8",
            "alleenPad": "asiel"
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
        "info": "💡 Are you a recognised refugee? Then you usually do not have to give up your original nationality.",
        "infoAlleenPad": "asiel",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "If you need protection, you can submit an asylum application to the IND.",
            "alleenPad": "asiel"
          },
          {
            "naam": "Regular permit",
            "tekst": "For work, study or family reunification, regular permits are available."
          },
          {
            "naam": "Legal help",
            "tekst": "Contact a lawyer or the Legal Services Counter (Juridisch Loket)."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Free legal support for asylum seekers and status holders.",
            "alleenPad": "asiel"
          }
        ],
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Help from the Juridisch Loket"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Not long enough in the Netherlands yet",
        "sub": "You must live in the Netherlands for at least 5 consecutive years. You can put the waiting time to good use.",
        "alternatieven": [
          {
            "naam": "Renew your permit on time",
            "tekst": "If there is a period without a valid permit — a \"residence gap\" (verblijfsgat) — that time does not count. The 5 years may then start counting again. So apply for renewal on time, at the latest within 4 weeks of expiry: then the IND does not treat it as a residence gap."
          },
          {
            "naam": "Naturalisation term: possibly 10 years",
            "tekst": "Note: this is about the waiting time before you can naturalise, not about your residence permit. The government wants to extend this naturalisation term from 5 to 10 years. Not yet adopted, but bear it in mind. With a Dutch partner the term may actually be shorter — ask your municipality."
          },
          {
            "naam": "Alternative: EU long-term resident",
            "tekst": "EU long-term residence (EU-langdurig ingezetene) gives you a permanent right of residence after 5 years, and you keep your own nationality. <strong>But it does have an income requirement.</strong>"
          },
          {
            "naam": "Complete civic integration",
            "tekst": "Use the waiting time to pass your civic integration exam — a hard requirement for naturalisation."
          },
          {
            "naam": "Collect documents",
            "tekst": "Request official documents from your country of origin in advance and work on your Dutch, for example via a language course at a Blik op Werk certified provider."
          },
          {
            "naam": "Government plan (not yet law)",
            "tekst": "Status holders who have been granted a temporary asylum permit twice and reach Dutch at level B1 could become Dutch after 6 years, even without EU long-term residence (EU-langdurig ingezetene). There will be an exception for people who cannot reach B1. There is no bill yet. Until that law exists, the rules above apply.",
            "alleenPad": "asiel"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 View: EU long-term resident (permanent residence after 5 years)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ More information at ind.nl"
      },
      "r_regulier_tijdelijk": {
        "type": "wacht",
        "icoon": "🎓",
        "titel": "With this permit you cannot become Dutch yet",
        "sub": "For naturalisation (naturalisatie) you need a permit for an indefinite period, or for a purpose that is not temporary. A permit for study or another temporary stay does not count.",
        "alternatieven": [
          {
            "naam": "Is your situation changing?",
            "tekst": "Are you going to work, for example, or live with your partner? Then you can apply for a different permit. After that, do this check again."
          },
          {
            "naam": "How does your stay count?",
            "tekst": "Whether the years with your current permit count towards the 5 years depends on your situation. Have this checked."
          },
          {
            "naam": "Start working on your Dutch now",
            "tekst": "For naturalisation (naturalisatie) you will later need to have completed civic integration (inburgering). A language course already helps now."
          }
        ],
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ More information at ind.nl"
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ More information at ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Naturalising via the Z-route — an important difference",
        "padenTitel": "The three paths to naturalisation from the Z-route",
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
        "info": "📞 <strong>Advice:</strong> Consult your municipality about which path best suits your situation.",
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Help from the Juridisch Loket"
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
            "tekst": "Free legal help for status holders.",
            "alleenPad": "asiel"
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
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Help from the Juridisch Loket"
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
            "tekst": "If in doubt: consult a legal adviser or the Legal Services Counter (Juridisch Loket)."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "As a recognised refugee you do NOT have to renounce your nationality.",
            "alleenPad": "asiel"
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
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 View: EU long-term resident (keep your nationality)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Read more about EU long-term resident on ind.nl"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "EU long-term resident — stay permanently without giving up your nationality",
        "sub": "A permanent residence permit after 5 years. You keep your own nationality. Since 12 June 2026 this is also the required intermediate step towards naturalisation (naturalisatie) for new status holders.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>What it is:</strong> you may live in the Netherlands indefinitely and work freely, and you can move and work more easily in other EU countries. Your asylum years count towards the 5 years; study years count for 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Income requirement:</strong> you must have enough lasting income of your own, plus health insurance. With benefits this is usually not possible. If you have an asylum residence permit (verblijfsvergunning asiel) for a fixed period, you need EU long-term residence (EU-langdurig ingezetene) to be able to naturalise later. So the income requirement then also applies to your path to Dutch citizenship."
          },
          {
            "type": "info",
            "tekst": "✈️ During the 5 years you may not be outside the Netherlands for longer than 6 months in a row, and not more than 10 months in total."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>When is it interesting for you?</strong> If you do not want to or cannot give up your original nationality — for naturalisation you in principle must, here you do not."
          },
          {
            "nr": 2,
            "tekst": "<strong>Asylum permit for a fixed period?</strong> Then this is the only way to a permanent permit, and after that to naturalisation (naturalisatie)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Conditions:</strong> 5 years in a row of legal residence in the Netherlands, not too long abroad, enough lasting income of your own, health insurance, and your civic integration (inburgering) completed via the B1 route, the education route or the Z-route."
          },
          {
            "nr": 4,
            "tekst": "<strong>Applying:</strong> at the IND. If you apply for a permit for an indefinite period, the IND automatically checks whether you can also get EU long-term resident status. With an asylum permit you can only apply on paper, not online."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Read more about EU long-term resident on ind.nl"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "There are ways to reduce the costs",
        "sub": "Naturalisation costs €1,139 for one person and €1,454 with a partner (2026 rates) — but there are ways to make this affordable.",
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
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "You can become Dutch — in two steps",
        "sub": "With an asylum residence permit (verblijfsvergunning asiel) for a fixed period you must first become an EU long-term resident (EU-langdurig ingezetene). After that you can apply for naturalisation (naturalisatie).",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Income:</strong> the IND checks whether your income is enough and whether it will continue (with an employment contract, it must still be valid for at least 12 months). Have you only just started working, or do you have a temporary contract? Then first have someone check whether your application stands a chance."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Government plan — not yet law:</strong> status holders who have been granted a temporary asylum permit twice and reach Dutch at level B1 could become Dutch after 6 years, even without EU long-term residence (EU-langdurig ingezetene). There will be an exception for people who cannot reach B1. There is no bill yet. Until that law exists, the rules above apply."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Apply for EU long-term residence (EU-langdurig ingezetene) at the IND.</strong> With an asylum permit this is only possible on paper, not online. The application costs € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Collect proof:</strong> your employment contract and payslips, your health insurance, and your civic integration diploma or decision. The IND form says exactly what is needed."
          },
          {
            "nr": 3,
            "tekst": "<strong>Meanwhile, renew your asylum permit on time.</strong> That way your residence stays uninterrupted."
          },
          {
            "nr": 4,
            "tekst": "<strong>Are you an EU long-term resident? Then apply for naturalisation (naturalisatie) at your municipality.</strong> The usual conditions then apply: civic integration (inburgering) for naturalisation, no criminal record, and you live permanently in the Netherlands. As a recognised refugee you usually do not have to give up your nationality."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Read more about EU long-term resident on ind.nl"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "You can become an EU long-term resident — for naturalisation an extra step is needed after that",
        "sub": "With the Z-route you meet the civic integration requirement (inburgering) for EU long-term residence (EU-langdurig ingezetene). For naturalisation (naturalisatie) that is not enough: extra language requirements apply.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Income:</strong> the IND checks whether your income is enough and whether it will continue (with an employment contract, it must still be valid for at least 12 months). Have you only just started working, or do you have a temporary contract? Then first have someone check whether your application stands a chance."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Government plan — not yet law:</strong> status holders who have been granted a temporary asylum permit twice and reach Dutch at level B1 could become Dutch after 6 years, even without EU long-term residence (EU-langdurig ingezetene). There will be an exception for people who cannot reach B1. There is no bill yet. Until that law exists, the rules above apply."
          }
        ],
        "padenTitel": "After EU long-term residence: three paths to naturalisation from the Z-route",
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
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Apply for EU long-term residence (EU-langdurig ingezetene) at the IND.</strong> With an asylum permit this is only possible on paper, not online. The application costs € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Collect proof:</strong> your employment contract and payslips, your health insurance, and your civic integration diploma or decision. The IND form says exactly what is needed."
          },
          {
            "nr": 3,
            "tekst": "<strong>Meanwhile, renew your asylum permit on time.</strong> That way your residence stays uninterrupted."
          },
          {
            "nr": 4,
            "tekst": "<strong>Are you an EU long-term resident? Then choose one of the paths above, and after that apply for naturalisation (naturalisatie) at your municipality.</strong>"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Read more about EU long-term resident on ind.nl"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "First complete your civic integration",
        "sub": "You have lived in the Netherlands long enough and you have income. What is still missing is your civic integration (inburgering). After that you can apply for EU long-term residence (EU-langdurig ingezetene), and later for naturalisation (naturalisatie).",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 The B1 route (B1-route), the education route (onderwijsroute) and the Z-route all three count for EU long-term residence (EU-langdurig ingezetene). For naturalisation (naturalisatie), the Z-route alone is not enough."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Government plan — not yet law:</strong> status holders who have been granted a temporary asylum permit twice and reach Dutch at level B1 could become Dutch after 6 years, even without EU long-term residence (EU-langdurig ingezetene). There will be an exception for people who cannot reach B1. There is no bill yet. Until that law exists, the rules above apply."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Complete your civic integration route.</strong> Ask your municipality how long you still need."
          },
          {
            "nr": 2,
            "tekst": "<strong>Keep your job and your health insurance.</strong> You need them for the application."
          },
          {
            "nr": 3,
            "tekst": "<strong>Renew your asylum permit on time.</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>Do this check again</strong> when your civic integration is complete."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 What is EU long-term residence?"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "Your income is now the obstacle",
        "sub": "With an asylum residence permit (verblijfsvergunning asiel) for a fixed period you can only become Dutch if you first become an EU long-term resident (EU-langdurig ingezetene). For that you need enough income of your own. With benefits that is not possible yet. To be honest, this is a big change.",
        "alternatieven": [
          {
            "naam": "Work or more hours",
            "tekst": "A job, or working more hours, can open the way. Use the Loont werken tool to see what working would mean for you."
          },
          {
            "naam": "You can stay",
            "tekst": "Your asylum permit simply remains valid. Always renew it on time."
          },
          {
            "naam": "Complete your civic integration",
            "tekst": "You need it (inburgering) for EU long-term residence (EU-langdurig ingezetene) and for naturalisation (naturalisatie)."
          },
          {
            "naam": "Partner or exception?",
            "tekst": "Your partner's income can count, if you live together and your partner is Dutch or has a residence permit. An exception applies if you have reached the state pension age (AOW-leeftijd), or if you are permanently and fully unable to work and can prove it."
          },
          {
            "naam": "Government plan (not yet law)",
            "tekst": "Status holders who have been granted a temporary asylum permit twice and reach Dutch at level B1 could become Dutch after 6 years, even without EU long-term residence (EU-langdurig ingezetene). There will be an exception for people who cannot reach B1. There is no bill yet. Until that law exists, the rules above apply."
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ Calculate what working would give you"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "You may have been abroad for too long",
        "sub": "For EU long-term residence (EU-langdurig ingezetene) you may not have been outside the Netherlands for longer than 6 months in a row and not more than 10 months in total. Because of this, the 5 years may start counting again.",
        "alternatieven": [
          {
            "naam": "Count your trips",
            "tekst": "Look up the dates of your trips: stamps, tickets or your application for a travel document."
          },
          {
            "naam": "Have it checked",
            "tekst": "VluchtelingenWerk or your municipality can work out with you from when you will have 5 years again."
          },
          {
            "naam": "Stay away for shorter periods from now on",
            "tekst": "Plan long trips so that you stay below the limit."
          },
          {
            "naam": "Government plan (not yet law)",
            "tekst": "Status holders who have been granted a temporary asylum permit twice and reach Dutch at level B1 could become Dutch after 6 years, even without EU long-term residence (EU-langdurig ingezetene). There will be an exception for people who cannot reach B1. There is no bill yet. Until that law exists, the rules above apply."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Read more about EU long-term resident on ind.nl"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Not long enough in the Netherlands yet",
        "sub": "With an asylum residence permit (verblijfsvergunning asiel) for a fixed period you must first live in the Netherlands for 5 years. After that you can become an EU long-term resident (EU-langdurig ingezetene), and only then Dutch. You can make good use of the time until then.",
        "alternatieven": [
          {
            "naam": "Renew on time",
            "tekst": "Asylum permits for a fixed period are valid for a maximum of 3 years; so renew on time. If a \"residence gap\" (verblijfsgat) arises — a period between two permits in which you have no valid permit — that time does not count as lawful residence, and the 5-year count for naturalisation may restart. So apply for renewal within 4 weeks of expiry at the latest: then the IND does not treat it as a residence gap."
          },
          {
            "naam": "Work on your income",
            "tekst": "For EU long-term residence (EU-langdurig ingezetene) you will later need enough income of your own. Start working now on getting a job or more hours."
          },
          {
            "naam": "Complete your civic integration",
            "tekst": "The B1 route (B1-route), the education route (onderwijsroute) and the Z-route count for EU long-term residence (EU-langdurig ingezetene)."
          },
          {
            "naam": "Don't stay away too long",
            "tekst": "Do not go abroad for longer than 6 months in a row, and not more than 10 months in total."
          },
          {
            "naam": "Government plan (not yet law)",
            "tekst": "Status holders who have been granted a temporary asylum permit twice and reach Dutch at level B1 could become Dutch after 6 years, even without EU long-term residence (EU-langdurig ingezetene). There will be an exception for people who cannot reach B1. There is no bill yet. Until that law exists, the rules above apply."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 What is EU long-term residence?"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "First have your permit type checked",
        "sub": "Your route to Dutch citizenship depends on your permit.",
        "alternatieven": [
          {
            "naam": "Asylum for an indefinite period",
            "tekst": "You can naturalise (naturalisatie) if you meet the other conditions."
          },
          {
            "naam": "Asylum for a fixed period (3 or 5 years)",
            "tekst": "First EU long-term resident (EU-langdurig ingezetene), with an income requirement, then naturalisation (naturalisatie). Also if you got the permit before 12 June 2026."
          },
          {
            "naam": "Another permit",
            "tekst": "For family, partner or work: naturalisation is usually possible after 5 years. For study or another temporary stay, not yet."
          },
          {
            "naam": "Who can help?",
            "tekst": "Your support worker at the municipality or VluchtelingenWerk can look at your card together with you."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ Find a VluchtelingenWerk location near you"
      }
    }
  },
  "AR": {
    "header": {
      "badge": "🇳🇱 فاحص التجنيس",
      "titel": "هل أنا مؤهل للحصول على جواز سفر هولندي؟",
      "sub": "أجب عن بعض الأسئلة واعرف ما إذا كان بإمكانك أن تصبح هولندياً. استناداً إلى قواعد عام 2026، بما فيها قواعد اللجوء الجديدة منذ 12 يونيو 2026.",
      "disclaimer": "⚠️ هذه الأداة تعطي مؤشراً، وليست قراراً. تم التحقق في سبتمبر 2026 (IND، Stimulansz). منذ 12 يونيو 2026 لم يعد هناك تصريح لجوء لأجل غير محدّد. لذلك يجب على حاملي تصريح إقامة اللجوء لمدة محدّدة (verblijfsvergunning asiel) أن يصبحوا أولاً مقيمين طويلي الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) قبل أن يتمكنوا من التجنيس (naturalisatie). الخطط التي أعلنتها الحكومة ليست قانوناً بعد. اطلب دائماً المشورة من البلدية أو من VluchtelingenWerk.",
      "vwnLabel": "هل تتردد في أمر وضعك؟",
      "vwnTekst": "قواعد التجنيس تتغير بسرعة وقد تختلف حالتك عما تُظهره الأداة. تُقدّم منظمة VluchtelingenWerk Nederland جلسات إرشادية ومساعدة مجانية في التجنيس — ابحث عن موقع قريب منك على <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a>.",
      "hulpRegulierLabel": "هل تتردد في أمر وضعك؟",
      "hulpRegulierTekst": "يقدّم مكتب الاستشارات القانونية (Juridisch Loket) مشورة مجانية حول تصريح إقامتك والتجنيس (naturalisatie). انظر في <a href=\"https://www.juridischloket.nl\" target=\"_blank\" style=\"color:inherit;\">juridischloket.nl</a> أو اسأل بلديتك."
    },
    "ui": {
      "volgendeStappen": "الخطوات التالية",
      "watKunJeDoen": "ما الذي يمكنك فعله؟",
      "watKunJeNuDoen": "ما الذي يمكنك فعله الآن؟",
      "opnieuw": "↺ البدء من جديد",
      "laatChecken": "اطلب التحقق من وضعك",
      "vraagLabel": "السؤال {n}",
      "jeKuntKiezen": "يمكنك الاختيار:",
      "ladenMislukt": "حدث خطأ أثناء تحميل هذه الصفحة. حدّث الصفحة أو حاول مرة أخرى لاحقاً.",
      "driePaden": "الطرق الثلاثة للتجنيس عبر مسار Z"
    },
    "vragen": {
      "v1": {
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
        "tekst": "ما نوع إقامتك في هولندا؟",
        "uitleg": "نوع التصريح يحدّد طريقك إلى الجنسية الهولندية. مواطنو الاتحاد الأوروبي يقيمون هنا بموجب قانون الاتحاد الأوروبي.",
        "antwoorden": [
          {
            "tekst": "لديّ تصريح إقامة لجوء (حامل تصريح لجوء)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel",
            "pad": "asiel"
          },
          {
            "tekst": "لديّ تصريح إقامة آخر",
            "sub": "مثلاً للعائلة أو العمل أو الدراسة",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v_regulier",
            "pad": "regulier"
          },
          {
            "tekst": "أنا مواطن في الاتحاد الأوروبي",
            "sub": "أو مواطن في المنطقة الاقتصادية الأوروبية/سويسرا",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "لست متأكداً",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "ما هو تصريح اللجوء الذي لديك الآن؟",
        "uitleg": "انظر إلى بطاقة إقامتك: هل مكتوب عليها 'لأجل غير محدّد' (onbepaalde tijd)، أم يوجد تاريخ انتهاء؟",
        "antwoorden": [
          {
            "tekst": "لجوء لأجل غير محدّد",
            "sub": "لا يوجد على بطاقتك تاريخ انتهاء لحق إقامتك",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "لجوء لمدة محدّدة",
            "sub": "صالح لمدة 3 أو 5 سنوات، حتى لو حصلت عليه قبل 12 يونيو 2026",
            "icoon": "📅",
            "klasse": "anders",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "أنا بالفعل مقيم طويل الأمد في الاتحاد الأوروبي",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "لا أعرف",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "تصريحك يبقى سارياً — لكن الحصول على الجنسية الهولندية يمرّ بخطوة وسيطة",
        "uitleg": "يبقى تصريح اللجوء الخاص بك سارياً حتى التاريخ المكتوب على بطاقتك. لكن مع تصريح إقامة لجوء لمدة محدّدة (verblijfsvergunning asiel) لا يمكنك تقديم طلب التجنيس (naturalisatie). وهذا ينطبق أيضاً إذا حصلت على التصريح قبل 12 يونيو 2026. منذ 12 يونيو 2026 لم يعد تصريح اللجوء لأجل غير محدّد موجوداً.<br><br>لذلك يجب أن تصبح أولاً <strong>مقيماً طويل الأمد في الاتحاد الأوروبي</strong> (EU-langdurig ingezetene). بعد ذلك يمكنك تقديم طلب التجنيس. الأسئلة التالية تبيّن ما إذا كان ذلك ممكناً لك الآن.",
        "antwoorden": [
          {
            "tekst": "فهمت — تابع",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "e1"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "هكذا تعرف أي تصريح لديك",
        "uitleg": "انظر إلى بطاقة إقامتك، في خانة 'Type document en bijzonderheden' (نوع الوثيقة والملاحظات: رقم النوع والنص المجاور له)، أو في رسالة دائرة الهجرة (IND). انتبه إلى أمرين:<br><br>1. هل مكتوب <strong>لجوء</strong> (asiel) أم غرض آخر (مثل العائلة أو العمل)؟<br>2. هل مكتوب '<strong>لأجل غير محدّد</strong>' (onbepaalde tijd)، أم يوجد <strong>تاريخ انتهاء</strong>؟<br><br>لم تستطع معرفة ذلك؟ اسأل مرشدك في البلدية أو VluchtelingenWerk.",
        "antwoorden": [
          {
            "tekst": "وجدته — العودة إلى السؤال",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "لا أستطيع التحقق من ذلك",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "v_regulier": {
        "tekst": "ما نوع تصريح الإقامة الذي لديك؟",
        "uitleg": "للتجنيس (naturalisatie) تحتاج إلى تصريح لأجل غير محدّد، أو لغرض غير مؤقت، مثل العيش مع شريكك أو العمل. على بطاقة إقامتك مكتوب الغرض وما إذا كان هناك تاريخ انتهاء.",
        "antwoorden": [
          {
            "tekst": "لأجل غير محدّد",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "لمدة محدّدة — للعائلة أو الشريك أو العمل",
            "icoon": "👨‍👩‍👧",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "لمدة محدّدة — للدراسة أو إقامة مؤقتة أخرى",
            "sub": "مثلاً العمل الموسمي، أو العلاج الطبي، أو التبادل، أو سنة البحث عن عمل لذوي التعليم العالي",
            "icoon": "🎓",
            "klasse": "nee",
            "volgende": "r_regulier_tijdelijk"
          },
          {
            "tekst": "لا أعرف",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "e1": {
        "tekst": "هل تقيم في هولندا منذ 5 سنوات أو أكثر بشكل متواصل بتصريح سارٍ؟",
        "uitleg": "مع تصريح إقامة لجوء لمدة محدّدة (verblijfsvergunning asiel) لا يمكنك أن تصبح هولندياً إلا بعد أن تصبح أولاً مقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). لذلك يجب أن تكون قد أقمت في هولندا 5 سنوات متواصلة على الأقل بتصريح سارٍ. سنوات تصريح اللجوء تُحتسب. أما هل تُحتسب مدة إجراءات اللجوء، فهذا تقرّره دائرة الهجرة (IND).",
        "antwoorden": [
          {
            "tekst": "نعم، 5 سنوات أو أكثر",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "لا، أقل من 5 سنوات",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "هل كنت خارج هولندا لفترة طويلة خلال هذه السنوات الـ 5؟",
        "uitleg": "للحصول على صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) يجب ألا تكون قد غبت عن هولندا أكثر من 6 أشهر متواصلة. وفي المجموع يجب ألا يزيد ذلك عن 10 أشهر.",
        "antwoorden": [
          {
            "tekst": "لا، لم أغب كل هذه المدة أبداً",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "نعم، أكثر من 6 أشهر متواصلة، أو أكثر من 10 أشهر في المجموع",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "لا أعرف بالضبط",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "هل لديك دخل خاص كافٍ للعيش منه؟",
        "uitleg": "للحصول على صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) يجب أن يكون لديك دخل خاص كافٍ. يجب أن يكون مستقلاً (ليس من إعانة اجتماعية) ودائماً (يستمر). وتحتاج أيضاً إلى تأمين صحي.",
        "antwoorden": [
          {
            "tekst": "نعم، من العمل أو من مشروعي الخاص",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "نعم، لكن منذ فترة قصيرة أو بعقد مؤقت",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "لا، أتلقى إعانة أو ليس لديّ دخل خاص",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "كيف يسير اندماجك؟",
        "uitleg": "للحصول على صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) يجب أن تستوفي شرط الاندماج (inburgering). يمكن ذلك عبر مسار B1 (B1-route) أو مسار التعليم (onderwijsroute) أو مسار Z (Z-route).",
        "antwoorden": [
          {
            "tekst": "أنهيته عبر مسار B1 أو مسار التعليم، أو لديّ إعفاء",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "أنهيته عبر مسار Z",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "لا أزال في مرحلة الاندماج",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "هل تصريح إقامتك ساري المفعول الآن؟",
        "uitleg": "يجب أن يكون تصريحك سارياً عندما تقدّم طلب التجنيس (naturalisatie)، وأن يبقى سارياً حتى صدور القرار. جدّده دائماً في الوقت المناسب، حتى تبقى إقامتك متواصلة.",
        "antwoorden": [
          {
            "tekst": "نعم، تصريحي ساري المفعول",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "لا، انتهت صلاحية تصريحي أو ليس لديّ تصريح",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
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
        "tekst": "أتممت مسار Z — هناك خطوة إضافية مطلوبة للتجنيس",
        "uitleg": "ينتهي مسار Z بمقابلة ختامية وشهادة، لكن للتجنيس تطبّق دائرة الهجرة شروطاً لغوية إضافية. هناك ثلاثة مسارات لتتمكّن مع ذلك من التجنيس:<br><br><strong>المسار A — اجتياز الامتحان مع ذلك بمستوى A2</strong><br>اجتز جميع الامتحانات اللغوية بمستوى A2 (قراءة، استماع، كتابة، محادثة) وامتحان KNM. انتبه: بعد إنهاء مسار Z لم تعد محاولات الامتحان مجانية.<br><br><strong>المسار B — 600 ساعة دروس لغة + 3 محاولات على الأقل لكل جزء</strong><br>600 ساعة على الأقل من دروس مستوى A2 في مؤسسة معتمدة من Blik op Werk و3 محاولات لكل جزء؟ عندئذٍ يمكن لدائرة DUO إصدار توصية بالإعفاء.<br><br><strong>المسار C — 600 ساعة محو أمية + اختبار DUO (€150)</strong><br>600 ساعة على الأقل من محو الأمية وتبيّن أن A2 غير قابل للتحقيق؟ عندئذٍ يُمنح إعفاء عبر اختبار DUO (€150).<br><br><em>محتمل في المستقبل:</em> تريد الحكومة رفع شرط اللغة للتجنيس من A2 إلى B1. لم يُعتمد هذا بعد — حالياً لا يزال A2 سارياً.<br><br>💡 ناقش مع بلديتك أيُّ مسار يناسبك أكثر.",
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
        "tekst": "هل صدر بحقك حكم جنائي خلال الـ 5 سنوات الماضية؟",
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
        "tekst": "هل أنت مستعد للتنازل عن جنسيتك الحالية؟",
        "uitleg": "لا تسمح هولندا في الغالب بازدواجية الجنسية. هناك استثناءات، مثلاً للاجئين المعترف بهم.",
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
            "volgende": "v8",
            "alleenPad": "asiel"
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
        "info": "💡 هل أنت لاجئ معترف به؟ إذاً في الغالب لا تحتاج إلى التنازل عن جنسيتك الأصلية.",
        "infoAlleenPad": "asiel",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "إذا كنت بحاجة إلى حماية يمكنك تقديم طلب لجوء إلى IND.",
            "alleenPad": "asiel"
          },
          {
            "naam": "تصريح منتظم",
            "tekst": "للعمل أو الدراسة أو لم الشمل العائلي هناك تصاريح منتظمة."
          },
          {
            "naam": "مساعدة قانونية",
            "tekst": "تواصل مع محامٍ أو مع مكتب الاستشارات القانونية (Juridisch Loket)."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "دعم قانوني مجاني لطالبي اللجوء وأصحاب وضع اللجوء.",
            "alleenPad": "asiel"
          }
        ],
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ مساعدة عبر Juridisch Loket"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "لم تُقم في هولندا مدة كافية بعد",
        "sub": "يجب أن تكون قد أقمت في هولندا 5 سنوات متتالية على الأقل. يمكنك استثمار فترة الانتظار جيداً.",
        "alternatieven": [
          {
            "naam": "جدّد تصريحك في الوقت المناسب",
            "tekst": "إذا مرّت فترة بدون تصريح ساري — \"فجوة إقامة\" (verblijfsgat) — فلا تُحتسب تلك الفترة. وقد يبدأ عدّ الـ 5 سنوات عندها من جديد. لذا قدّم طلب التجديد في الوقت المناسب، وخلال 4 أسابيع كحدّ أقصى من انتهاء الصلاحية: عندئذٍ لا تعتبرها دائرة الهجرة (IND) فجوة إقامة."
          },
          {
            "naam": "مدة التجنيس: ربما 10 سنوات",
            "tekst": "انتبه: يتعلق هذا بمدة الانتظار قبل أن تتمكن من التجنيس، وليس بتصريح إقامتك. تريد الحكومة تمديد مدة التجنيس هذه من 5 إلى 10 سنوات. لم تُعتمد بعد، لكن ضعها في اعتبارك. مع شريك هولندي قد تكون المدة أقصر — اسأل البلدية."
          },
          {
            "naam": "بديل: مقيم طويل الأمد في الاتحاد الأوروبي",
            "tekst": "صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) تمنحك بعد 5 سنوات حق إقامة دائماً، وتحتفظ بجنسيتك. <strong>لكن لها شرط دخل.</strong>"
          },
          {
            "naam": "أكمل الاندماج",
            "tekst": "استخدم فترة الانتظار لاجتياز امتحان الاندماج — وهو شرط صارم للتجنيس."
          },
          {
            "naam": "اجمع الوثائق",
            "tekst": "اطلب مسبقاً الوثائق الرسمية من بلد المنشأ واعمل على لغتك الهولندية، مثلاً عبر دورة لغة في مؤسسة معتمدة من Blik op Werk."
          },
          {
            "naam": "خطة الحكومة (ليست قانوناً بعد)",
            "tekst": "حاملو تصريح اللجوء الذين حصلوا مرتين على تصريح لجوء مؤقت ووصلوا في اللغة الهولندية إلى المستوى B1، قد يصبحون هولنديين بعد 6 سنوات، حتى بدون صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). وسيكون هناك استثناء لمن لا يستطيع الوصول إلى المستوى B1. لا يوجد بعد مشروع قانون. وإلى أن يصدر هذا القانون، تسري القواعد المذكورة أعلاه.",
            "alleenPad": "asiel"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 اطّلع: مقيم طويل الأمد في الاتحاد الأوروبي (إقامة دائمة بعد 5 سنوات)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ مزيد من المعلومات على ind.nl"
      },
      "r_regulier_tijdelijk": {
        "type": "wacht",
        "icoon": "🎓",
        "titel": "بهذا التصريح لا يمكنك أن تصبح هولندياً بعد",
        "sub": "للتجنيس (naturalisatie) تحتاج إلى تصريح لأجل غير محدّد، أو لغرض غير مؤقت. تصريح الدراسة أو الإقامة المؤقتة الأخرى لا يُحتسب.",
        "alternatieven": [
          {
            "naam": "هل يتغيّر وضعك؟",
            "tekst": "هل ستبدأ العمل مثلاً، أو ستعيش مع شريكك؟ عندها يمكنك تقديم طلب لتصريح آخر. بعد ذلك أعد هذا الفحص."
          },
          {
            "naam": "كيف تُحتسب إقامتك؟",
            "tekst": "هل تُحتسب السنوات مع تصريحك الحالي ضمن الـ 5 سنوات؟ هذا يعتمد على وضعك. اطلب التحقق من ذلك."
          },
          {
            "naam": "ابدأ من الآن بتعلّم الهولندية",
            "tekst": "للتجنيس (naturalisatie) يجب لاحقاً أن تكون قد أتممت الاندماج (inburgering). دورة لغة تساعدك من الآن."
          }
        ],
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ مزيد من المعلومات على ind.nl"
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ مزيد من المعلومات على ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "التجنيس عبر مسار Z — فرق مهم",
        "padenTitel": "الطرق الثلاثة للتجنيس عبر مسار Z",
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
            "tekst": "600 ساعة على الأقل من التعليم اللغوي على مستوى A2 في مؤسسة معتمدة من Blik op Werk و3 محاولات على الأقل لكل مكون (منها على الأقل 1 امتحان A2)؟ يمكن لـ DUO إصدار توصية إعفاء دون اجتياز الامتحان."
          },
          {
            "nr": "C",
            "titel": "600 ساعة محو أمية أو تعليم لغوي + اختبار DUO (لا قدرة تعلم) — 150 يورو",
            "tekst": "600 ساعة على الأقل من محو الأمية في مؤسسة معتمدة من Blik op Werk ويُثبت اختبار DUO عدم إمكانية تحقيق A2؟ يتبع الإعفاء. يكلف اختبار DUO 150 يورو."
          }
        ],
        "info": "📞 <strong>استشارة:</strong> تشاور مع بلديتك لمعرفة أنسب مسار لوضعك.",
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ مساعدة عبر Juridisch Loket"
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
            "tekst": "مساعدة قانونية مجانية لأصحاب وضع اللجوء.",
            "alleenPad": "asiel"
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
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ مساعدة عبر Juridisch Loket"
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
            "tekst": "عند الشك: استشر مستشاراً قانونياً أو مكتب الاستشارات القانونية (Juridisch Loket)."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "بصفتك لاجئاً معترفاً به، لست مُلزماً بالتخلّي عن جنسيتك.",
            "alleenPad": "asiel"
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
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 اطّلع: مقيم طويل الأمد في الاتحاد الأوروبي (الاحتفاظ بالجنسية)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ اقرأ المزيد عن المقيم طويل الأمد في الاتحاد الأوروبي على ind.nl"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "مقيم طويل الأمد في الاتحاد الأوروبي — البقاء بشكل دائم دون التخلّي عن جنسيتك",
        "sub": "تصريح إقامة دائم بعد 5 سنوات. تحتفظ بجنسيتك. ومنذ 12 يونيو 2026 أصبح هذا أيضاً الخطوة الوسيطة الإلزامية نحو التجنيس (naturalisatie) لحاملي تصريح اللجوء الجدد.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>ما هو:</strong> يمكنك الإقامة في هولندا لأجل غير مسمى والعمل بحرية، كما يمكنك الانتقال والعمل بسهولة أكبر في دول الاتحاد الأوروبي الأخرى. تُحتسب سنوات لجوئك ضمن الـ 5 سنوات؛ وتُحتسب سنوات الدراسة بنسبة 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>شرط الدخل:</strong> يجب أن يكون لديك دخل خاص كافٍ ودائم، وتأمين صحي. مع الإعانة لا ينجح ذلك غالباً. إذا كان لديك تصريح إقامة لجوء لمدة محدّدة (verblijfsvergunning asiel)، فأنت تحتاج إلى صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) لكي تتمكن لاحقاً من التجنيس. إذاً شرط الدخل ينطبق أيضاً على طريقك إلى الجنسية الهولندية."
          },
          {
            "type": "info",
            "tekst": "✈️ خلال السنوات الـ 5 يجب ألا تكون خارج هولندا أكثر من 6 أشهر متواصلة، ولا أكثر من 10 أشهر في المجموع."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>متى يكون مهماً لك؟</strong> إذا كنت لا تريد أو لا تستطيع التخلّي عن جنسيتك الأولى — فللتجنيس يجب ذلك من حيث المبدأ، أما هنا فلا."
          },
          {
            "nr": 2,
            "tekst": "<strong>تصريح لجوء لمدة محدّدة؟</strong> إذاً هذا هو الطريق الوحيد إلى تصريح دائم، ثم إلى التجنيس (naturalisatie)."
          },
          {
            "nr": 3,
            "tekst": "<strong>الشروط:</strong> 5 سنوات متواصلة من الإقامة القانونية في هولندا، وعدم الغياب طويلاً في الخارج، ودخل خاص كافٍ ودائم، وتأمين صحي، وإتمام الاندماج (inburgering) عبر مسار B1 أو مسار التعليم أو مسار Z."
          },
          {
            "nr": 4,
            "tekst": "<strong>التقديم:</strong> لدى دائرة الهجرة. إذا قدّمت طلباً لتصريح غير محدّد المدة، تتحقق دائرة الهجرة تلقائياً مما إذا كان بإمكانك أيضاً الحصول على وضع المقيم طويل الأمد في الاتحاد الأوروبي. مع تصريح لجوء يمكنك التقديم ورقياً فقط، وليس عبر الإنترنت."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ اقرأ المزيد عن المقيم طويل الأمد في الاتحاد الأوروبي على ind.nl"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "هناك طرق لتخفيض التكاليف",
        "sub": "تبلغ تكاليف التجنيس €1.139 لشخص واحد و€1.454 مع شريك (رسوم 2026) — لكن هناك طرق لجعلها في متناولك.",
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
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "يمكنك أن تصبح هولندياً — على خطوتين",
        "sub": "مع تصريح إقامة لجوء لمدة محدّدة (verblijfsvergunning asiel) يجب أن تصبح أولاً مقيماً طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). بعد ذلك يمكنك تقديم طلب التجنيس (naturalisatie).",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>الدخل:</strong> تتحقق دائرة الهجرة (IND) مما إذا كان دخلك كافياً وما إذا كان سيستمر (مع عقد عمل يجب أن يبقى سارياً 12 شهراً على الأقل). هل بدأت العمل منذ فترة قصيرة أو لديك عقد مؤقت؟ إذاً اطلب أولاً التحقق مما إذا كان لطلبك فرصة."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>خطة الحكومة — ليست قانوناً بعد:</strong> حاملو تصريح اللجوء الذين حصلوا مرتين على تصريح لجوء مؤقت ووصلوا في اللغة الهولندية إلى المستوى B1، قد يصبحون هولنديين بعد 6 سنوات، حتى بدون صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). وسيكون هناك استثناء لمن لا يستطيع الوصول إلى المستوى B1. لا يوجد بعد مشروع قانون. وإلى أن يصدر هذا القانون، تسري القواعد المذكورة أعلاه."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>قدّم طلب صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) لدى دائرة الهجرة (IND).</strong> مع تصريح لجوء يمكن ذلك ورقياً فقط، وليس عبر الإنترنت. يكلّف الطلب 254 €."
          },
          {
            "nr": 2,
            "tekst": "<strong>اجمع الإثباتات:</strong> عقد عملك وقسائم راتبك، وتأمينك الصحي، ودبلوم الاندماج أو قرار الاندماج. استمارة دائرة الهجرة تحدّد بالضبط ما هو مطلوب."
          },
          {
            "nr": 3,
            "tekst": "<strong>جدّد في الأثناء تصريح لجوئك في الوقت المناسب.</strong> هكذا تبقى إقامتك متواصلة."
          },
          {
            "nr": 4,
            "tekst": "<strong>هل أصبحت مقيم طويل الأمد في الاتحاد الأوروبي؟ إذاً قدّم طلب التجنيس (naturalisatie) لدى بلديتك.</strong> عندها تسري الشروط العادية: الاندماج (inburgering) للتجنيس، وعدم وجود سجل جنائي، وأن تكون مقيماً بشكل دائم في هولندا. بصفتك لاجئاً معترفاً به، لا يتعيّن عليك عادةً التخلّي عن جنسيتك."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ اقرأ المزيد عن المقيم طويل الأمد في الاتحاد الأوروبي على ind.nl"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "يمكنك أن تصبح مقيم طويل الأمد في الاتحاد الأوروبي — وللتجنيس تلزم بعد ذلك خطوة إضافية",
        "sub": "بمسار Z (Z-route) تستوفي شرط الاندماج (inburgering) لـصفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). لكن هذا لا يكفي للتجنيس (naturalisatie): فهناك شروط لغوية إضافية.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>الدخل:</strong> تتحقق دائرة الهجرة (IND) مما إذا كان دخلك كافياً وما إذا كان سيستمر (مع عقد عمل يجب أن يبقى سارياً 12 شهراً على الأقل). هل بدأت العمل منذ فترة قصيرة أو لديك عقد مؤقت؟ إذاً اطلب أولاً التحقق مما إذا كان لطلبك فرصة."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>خطة الحكومة — ليست قانوناً بعد:</strong> حاملو تصريح اللجوء الذين حصلوا مرتين على تصريح لجوء مؤقت ووصلوا في اللغة الهولندية إلى المستوى B1، قد يصبحون هولنديين بعد 6 سنوات، حتى بدون صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). وسيكون هناك استثناء لمن لا يستطيع الوصول إلى المستوى B1. لا يوجد بعد مشروع قانون. وإلى أن يصدر هذا القانون، تسري القواعد المذكورة أعلاه."
          }
        ],
        "padenTitel": "بعد صفة المقيم طويل الأمد في الاتحاد الأوروبي: ثلاثة طرق إلى التجنيس عبر مسار Z",
        "paden": [
          {
            "nr": "A",
            "titel": "اجتياز امتحان الاندماج على مستوى A2",
            "tekst": "اجتاز جميع اختبارات اللغة على مستوى A2 (قراءة، استماع، كتابة، كلام) وامتحان KNM. بعد النجاح ستحصل على دبلوم DUO وتستوفي شرط الاندماج للتجنيس."
          },
          {
            "nr": "B",
            "titel": "600 ساعة تعليم لغوي (A2) + 3 محاولات على الأقل لكل مكون",
            "tekst": "600 ساعة على الأقل من التعليم اللغوي على مستوى A2 في مؤسسة معتمدة من Blik op Werk و3 محاولات على الأقل لكل مكون (منها على الأقل 1 امتحان A2)؟ يمكن لـ DUO إصدار توصية إعفاء دون اجتياز الامتحان."
          },
          {
            "nr": "C",
            "titel": "600 ساعة محو أمية أو تعليم لغوي + اختبار DUO (لا قدرة تعلم) — 150 يورو",
            "tekst": "600 ساعة على الأقل من محو الأمية في مؤسسة معتمدة من Blik op Werk ويُثبت اختبار DUO عدم إمكانية تحقيق A2؟ يتبع الإعفاء. يكلف اختبار DUO 150 يورو."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>قدّم طلب صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) لدى دائرة الهجرة (IND).</strong> مع تصريح لجوء يمكن ذلك ورقياً فقط، وليس عبر الإنترنت. يكلّف الطلب 254 €."
          },
          {
            "nr": 2,
            "tekst": "<strong>اجمع الإثباتات:</strong> عقد عملك وقسائم راتبك، وتأمينك الصحي، ودبلوم الاندماج أو قرار الاندماج. استمارة دائرة الهجرة تحدّد بالضبط ما هو مطلوب."
          },
          {
            "nr": 3,
            "tekst": "<strong>جدّد في الأثناء تصريح لجوئك في الوقت المناسب.</strong> هكذا تبقى إقامتك متواصلة."
          },
          {
            "nr": 4,
            "tekst": "<strong>هل أصبحت مقيم طويل الأمد في الاتحاد الأوروبي؟ إذاً اختر أحد الطرق أعلاه، ثم قدّم طلب التجنيس (naturalisatie) لدى بلديتك.</strong>"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ اقرأ المزيد عن المقيم طويل الأمد في الاتحاد الأوروبي على ind.nl"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "أنهِ اندماجك أولاً",
        "sub": "أنت تقيم في هولندا منذ مدة كافية ولديك دخل. ما ينقصك هو الاندماج (inburgering). بعد ذلك يمكنك تقديم طلب صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene)، ولاحقاً طلب التجنيس (naturalisatie).",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 مسار B1 (B1-route) ومسار التعليم (onderwijsroute) ومسار Z (Z-route) تُحتسب كلها لـصفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). أما للتجنيس (naturalisatie) فمسار Z وحده لا يكفي."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>خطة الحكومة — ليست قانوناً بعد:</strong> حاملو تصريح اللجوء الذين حصلوا مرتين على تصريح لجوء مؤقت ووصلوا في اللغة الهولندية إلى المستوى B1، قد يصبحون هولنديين بعد 6 سنوات، حتى بدون صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). وسيكون هناك استثناء لمن لا يستطيع الوصول إلى المستوى B1. لا يوجد بعد مشروع قانون. وإلى أن يصدر هذا القانون، تسري القواعد المذكورة أعلاه."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>أكمل مسار اندماجك.</strong> اسأل بلديتك كم من الوقت لا تزال تحتاج."
          },
          {
            "nr": 2,
            "tekst": "<strong>حافظ على عملك وتأمينك الصحي.</strong> ستحتاج إليهما للطلب."
          },
          {
            "nr": 3,
            "tekst": "<strong>جدّد تصريح لجوئك في الوقت المناسب.</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>أعد هذا الفحص</strong> عندما ينتهي اندماجك."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ما هي صفة المقيم طويل الأمد في الاتحاد الأوروبي؟"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "دخلك هو العائق الآن",
        "sub": "مع تصريح إقامة لجوء لمدة محدّدة (verblijfsvergunning asiel) لا يمكنك أن تصبح هولندياً إلا إذا أصبحت أولاً مقيماً طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). ولهذا تحتاج إلى دخل خاص كافٍ. مع الإعانة لا ينجح ذلك بعد في الوقت الحالي. بصراحة، هذا تغيير كبير.",
        "alternatieven": [
          {
            "naam": "العمل أو ساعات أكثر",
            "tekst": "وظيفة، أو العمل لساعات أكثر، قد يفتح الطريق. استخدم أداة Loont werken لترى ما يعود عليك من العمل."
          },
          {
            "naam": "يمكنك البقاء",
            "tekst": "تصريح لجوئك يبقى سارياً ببساطة. جدّده دائماً في الوقت المناسب."
          },
          {
            "naam": "أنهِ اندماجك",
            "tekst": "تحتاج إلى الاندماج (inburgering) لـصفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) وللتجنيس (naturalisatie)."
          },
          {
            "naam": "شريك أو استثناء؟",
            "tekst": "يمكن أن يُحتسب دخل شريكك، إذا كنتما تعيشان معاً وكان شريكك هولندياً أو لديه تصريح إقامة. ويسري استثناء إذا بلغت سن التقاعد الحكومي (AOW-leeftijd)، أو إذا كنت عاجزاً عن العمل بشكل دائم وكامل وتستطيع إثبات ذلك."
          },
          {
            "naam": "خطة الحكومة (ليست قانوناً بعد)",
            "tekst": "حاملو تصريح اللجوء الذين حصلوا مرتين على تصريح لجوء مؤقت ووصلوا في اللغة الهولندية إلى المستوى B1، قد يصبحون هولنديين بعد 6 سنوات، حتى بدون صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). وسيكون هناك استثناء لمن لا يستطيع الوصول إلى المستوى B1. لا يوجد بعد مشروع قانون. وإلى أن يصدر هذا القانون، تسري القواعد المذكورة أعلاه."
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ احسب ما يعود عليك من العمل"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "ربما بقيت في الخارج مدة طويلة جداً",
        "sub": "للحصول على صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) يجب ألا تكون قد غبت عن هولندا أكثر من 6 أشهر متواصلة ولا أكثر من 10 أشهر في المجموع. لذلك قد يبدأ عدّ السنوات الـ 5 من جديد.",
        "alternatieven": [
          {
            "naam": "احسب رحلاتك",
            "tekst": "ابحث عن تواريخ رحلاتك: الأختام أو التذاكر أو طلبك للحصول على وثيقة سفر."
          },
          {
            "naam": "اطلب التحقق",
            "tekst": "يمكن لـ VluchtelingenWerk أو لبلديتك أن تحسب معك متى ستكمل 5 سنوات من جديد."
          },
          {
            "naam": "اجعل غيابك أقصر من الآن فصاعداً",
            "tekst": "خطّط لرحلاتك الطويلة بحيث تبقى تحت الحدّ المسموح."
          },
          {
            "naam": "خطة الحكومة (ليست قانوناً بعد)",
            "tekst": "حاملو تصريح اللجوء الذين حصلوا مرتين على تصريح لجوء مؤقت ووصلوا في اللغة الهولندية إلى المستوى B1، قد يصبحون هولنديين بعد 6 سنوات، حتى بدون صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). وسيكون هناك استثناء لمن لا يستطيع الوصول إلى المستوى B1. لا يوجد بعد مشروع قانون. وإلى أن يصدر هذا القانون، تسري القواعد المذكورة أعلاه."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ اقرأ المزيد عن المقيم طويل الأمد في الاتحاد الأوروبي على ind.nl"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "لم تُقم في هولندا مدة كافية بعد",
        "sub": "مع تصريح إقامة لجوء لمدة محدّدة (verblijfsvergunning asiel) يجب أن تقيم أولاً 5 سنوات في هولندا. بعد ذلك يمكنك أن تصبح مقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene)، وعندها فقط هولندياً. يمكنك استثمار الوقت حتى ذلك الحين جيداً.",
        "alternatieven": [
          {
            "naam": "جدّد في الوقت المناسب",
            "tekst": "تصاريح اللجوء لمدة محدّدة سارية لمدة 3 سنوات كحدّ أقصى؛ لذا جدّد في الوقت المناسب. إذا نشأت \"فجوة إقامة\" (verblijfsgat) — فترة بين تصريحين لا يكون لديك فيها تصريح ساري — فلا تُحتسب تلك الفترة كإقامة قانونية، وقد يبدأ عدّ الـ 5 سنوات للتجنيس من جديد. لذا قدّم طلب التجديد خلال 4 أسابيع كحدّ أقصى من انتهاء الصلاحية: عندئذٍ لا تعتبرها دائرة الهجرة فجوة إقامة."
          },
          {
            "naam": "اعمل على دخلك",
            "tekst": "لـصفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene) ستحتاج لاحقاً إلى دخل خاص كافٍ. ابدأ من الآن بالعمل على إيجاد وظيفة أو ساعات أكثر."
          },
          {
            "naam": "أنهِ اندماجك",
            "tekst": "مسار B1 (B1-route) ومسار التعليم (onderwijsroute) ومسار Z (Z-route) تُحتسب لـصفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene)."
          },
          {
            "naam": "لا تغب طويلاً",
            "tekst": "لا تسافر إلى الخارج أكثر من 6 أشهر متواصلة، ولا أكثر من 10 أشهر في المجموع."
          },
          {
            "naam": "خطة الحكومة (ليست قانوناً بعد)",
            "tekst": "حاملو تصريح اللجوء الذين حصلوا مرتين على تصريح لجوء مؤقت ووصلوا في اللغة الهولندية إلى المستوى B1، قد يصبحون هولنديين بعد 6 سنوات، حتى بدون صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene). وسيكون هناك استثناء لمن لا يستطيع الوصول إلى المستوى B1. لا يوجد بعد مشروع قانون. وإلى أن يصدر هذا القانون، تسري القواعد المذكورة أعلاه."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ما هي صفة المقيم طويل الأمد في الاتحاد الأوروبي؟"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "اطلب أولاً التحقق من نوع تصريحك",
        "sub": "طريقك إلى الجنسية الهولندية يعتمد على تصريحك.",
        "alternatieven": [
          {
            "naam": "لجوء لأجل غير محدّد",
            "tekst": "يمكنك التجنيس (naturalisatie) إذا استوفيت الشروط الأخرى."
          },
          {
            "naam": "لجوء لمدة محدّدة (3 أو 5 سنوات)",
            "tekst": "أولاً صفة المقيم طويل الأمد في الاتحاد الأوروبي (EU-langdurig ingezetene)، مع شرط الدخل، ثم التجنيس (naturalisatie). حتى لو حصلت على التصريح قبل 12 يونيو 2026."
          },
          {
            "naam": "تصريح آخر",
            "tekst": "للعائلة أو الشريك أو العمل: التجنيس ممكن عادةً بعد 5 سنوات. للدراسة أو إقامة مؤقتة أخرى: ليس بعد."
          },
          {
            "naam": "من يمكنه المساعدة؟",
            "tekst": "مرشدك في البلدية أو VluchtelingenWerk يمكنه أن يفحص بطاقتك معك."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ ابحث عن موقع لـ VluchtelingenWerk قريب منك"
      }
    }
  },
  "TR": {
    "header": {
      "badge": "🇳🇱 Vatandaşlık Denetleyicisi",
      "titel": "Hollanda pasaportu için uygun muyum?",
      "sub": "Birkaç soruyu yanıtlayın ve Hollanda vatandaşı olup olamayacağınızı görün. 2026 kurallarına dayanır; 12 Haziran 2026'dan bu yana geçerli yeni iltica kuralları da dahildir.",
      "disclaimer": "⚠️ Bu araç bir fikir verir, karar değildir. Eylül 2026'da kontrol edildi (IND, Stimulansz). 12 Haziran 2026'dan bu yana süresiz iltica oturma izni artık yok. Bu nedenle süreli iltica oturma iznine (verblijfsvergunning asiel) sahip statü sahipleri, vatandaşlığa geçebilmek (naturalisatie) için önce AB uzun süreli mukimi (EU-langdurig ingezetene) olmalıdır. Hükümetin açıkladığı planlar henüz yasa değil. Her zaman belediyeden veya VluchtelingenWerk'ten tavsiye isteyin.",
      "vwnLabel": "Durumunuzdan emin değil misiniz?",
      "vwnTekst": "Vatandaşlık kuralları hızla değişmektedir ve durumunuz aracın gösterdiğinden farklı olabilir. VluchtelingenWerk Nederland, vatandaşlık konusunda ücretsiz danışma saatleri ve rehberlik sunmaktadır — <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a> adresinden size yakın bir merkezi bulun.",
      "hulpRegulierLabel": "Durumunuzdan emin değil misiniz?",
      "hulpRegulierTekst": "Hukuki Danışma Bürosu (Juridisch Loket), oturma izniniz ve vatandaşlığa geçiş (naturalisatie) hakkında ücretsiz tavsiye verir. <a href=\"https://www.juridischloket.nl\" target=\"_blank\" style=\"color:inherit;\">juridischloket.nl</a> adresine bakın veya belediyenize sorun."
    },
    "ui": {
      "volgendeStappen": "Sonraki adımlar",
      "watKunJeDoen": "Ne yapabilirsiniz?",
      "watKunJeNuDoen": "Şimdi ne yapabilirsiniz?",
      "opnieuw": "↺ Baştan başla",
      "laatChecken": "Durumunuzu kontrol ettirin",
      "vraagLabel": "Soru {n}",
      "jeKuntKiezen": "Seçebilirsiniz:",
      "ladenMislukt": "Bu sayfa yüklenirken bir hata oluştu. Sayfayı yenileyin veya daha sonra tekrar deneyin.",
      "driePaden": "Z-rotasından vatandaşlığa üç yol"
    },
    "vragen": {
      "v1": {
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
        "tekst": "Hollanda'da ne tür bir ikametiniz var?",
        "uitleg": "İzninizin türü, Hollanda vatandaşlığına giden yolunuzu belirler. AB vatandaşları burada AB hukukuna göre yaşar.",
        "antwoorden": [
          {
            "tekst": "İltica oturma iznim var (statü sahibi)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel",
            "pad": "asiel"
          },
          {
            "tekst": "Başka bir oturma iznim var",
            "sub": "Örneğin aile, iş veya öğrenim için",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v_regulier",
            "pad": "regulier"
          },
          {
            "tekst": "AB vatandaşıyım",
            "sub": "Ya da AEA/İsviçre vatandaşıyım",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Emin değilim",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "Şu anda hangi iltica izniniz var?",
        "uitleg": "Oturma kartınıza bakın: 'süresiz' (onbepaalde tijd) mi yazıyor, yoksa bir bitiş tarihi mi var?",
        "antwoorden": [
          {
            "tekst": "Süresiz iltica",
            "sub": "Kartınızda oturma hakkınız için bir bitiş tarihi yok",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Süreli iltica",
            "sub": "3 veya 5 yıl geçerli, 12 Haziran 2026'dan önce almış olsanız bile",
            "icoon": "📅",
            "klasse": "anders",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "Zaten AB uzun süreli mukimiyim",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Bilmiyorum",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "İzniniz geçerli kalır — ama Hollanda vatandaşı olmak bir ara adımdan geçer",
        "uitleg": "İltica izniniz kartınızdaki tarihe kadar geçerli kalır. Ancak süreli bir iltica oturma izniyle (verblijfsvergunning asiel) vatandaşlığa geçiş (naturalisatie) başvurusu yapamazsınız. Bu, izni 12 Haziran 2026'dan önce almış olsanız da geçerlidir. 12 Haziran 2026'dan bu yana süresiz iltica izni artık yok.<br><br>Bu yüzden önce <strong>AB uzun süreli mukimi</strong> (EU-langdurig ingezetene) olmanız gerekir. Ardından vatandaşlığa geçiş başvurusu yapabilirsiniz. Sonraki sorular bunun sizin için şimdiden mümkün olup olmadığını gösterir.",
        "antwoorden": [
          {
            "tekst": "Anladım — devam et",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "e1"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "Hangi izne sahip olduğunuzu böyle görürsünüz",
        "uitleg": "Oturma kartınızda 'Type document en bijzonderheden' (belge türü ve özel notlar: tip numarası ve yanındaki metin) alanına veya IND'nin mektubuna bakın. İki şeye dikkat edin:<br><br>1. Orada <strong>iltica</strong> (asiel) mı yazıyor, yoksa başka bir amaç mı (aile veya iş gibi)?<br>2. '<strong>Süresiz</strong>' (onbepaalde tijd) mi yazıyor, yoksa bir <strong>bitiş tarihi</strong> mi var?<br><br>Anlayamadınız mı? Belediyedeki danışmanınıza veya VluchtelingenWerk'e sorun.",
        "antwoorden": [
          {
            "tekst": "Buldum — soruya geri dön",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Bunu kontrol edemiyorum",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "v_regulier": {
        "tekst": "Ne tür bir oturma izniniz var?",
        "uitleg": "Vatandaşlığa geçiş (naturalisatie) için süresiz bir izne veya geçici olmayan bir amaç için verilmiş bir izne ihtiyacınız var; örneğin partnerinizle birlikte yaşamak veya çalışmak. Oturma kartınızda amaç ve bir bitiş tarihi olup olmadığı yazar.",
        "antwoorden": [
          {
            "tekst": "Süresiz",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Süreli — aile, partner veya iş için",
            "icoon": "👨‍👩‍👧",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Süreli — öğrenim veya başka bir geçici kalış için",
            "sub": "Örneğin mevsimlik iş, tıbbi tedavi, değişim programı veya yüksek eğitimliler için iş arama yılı",
            "icoon": "🎓",
            "klasse": "nee",
            "volgende": "r_regulier_tijdelijk"
          },
          {
            "tekst": "Bilmiyorum",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "e1": {
        "tekst": "Hollanda'da geçerli bir izinle 5 yıl veya daha uzun süredir aralıksız mı yaşıyorsunuz?",
        "uitleg": "Süreli bir iltica oturma izniyle (verblijfsvergunning asiel) ancak önce AB uzun süreli mukimi (EU-langdurig ingezetene) olursanız Hollanda vatandaşı olabilirsiniz. Bunun için Hollanda'da geçerli bir izinle en az 5 yıl aralıksız yaşamış olmanız gerekir. İltica izniyle geçen yıllar sayılır. İltica sürecinde geçen sürenin sayılıp sayılmadığına IND karar verir.",
        "antwoorden": [
          {
            "tekst": "Evet, 5 yıl veya daha uzun",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "Hayır, 5 yıldan kısa",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "Bu 5 yıl içinde uzun süre yurt dışında bulundunuz mu?",
        "uitleg": "AB uzun süreli mukimi (EU-langdurig ingezetene) olmak için art arda 6 aydan uzun süre Hollanda dışında bulunmamış olmanız gerekir. Toplamda da 10 ayı geçmemelidir.",
        "antwoorden": [
          {
            "tekst": "Hayır, hiç bu kadar uzun değil",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "Evet, art arda 6 aydan uzun veya toplamda 10 aydan fazla",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "Tam olarak bilmiyorum",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "Geçinmeye yetecek kendi geliriniz var mı?",
        "uitleg": "AB uzun süreli mukimi (EU-langdurig ingezetene) olmak için yeterli kendi gelirinizin olması gerekir. Bu gelir bağımsız (sosyal yardımdan değil) ve sürekli (devam eden) olmalıdır. Ayrıca sağlık sigortanız olmalıdır.",
        "antwoorden": [
          {
            "tekst": "Evet, işten veya kendi işletmemden",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "Evet, ama yeni başladım veya geçici sözleşmem var",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "Hayır, sosyal yardım alıyorum veya kendi gelirim yok",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "Entegrasyonunuz ne durumda?",
        "uitleg": "AB uzun süreli mukimi (EU-langdurig ingezetene) olmak için entegrasyon şartını (inburgering) karşılamanız gerekir. Bu, B1 rotası (B1-route), eğitim rotası (onderwijsroute) veya Z-rotası (Z-route) ile olabilir.",
        "antwoorden": [
          {
            "tekst": "B1 rotası veya eğitim rotası ile tamamladım ya da muafiyetim var",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "Z-rotası ile tamamladım",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "Hâlâ devam ediyorum",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "Oturma izniniz şu anda geçerli mi?",
        "uitleg": "Vatandaşlığa geçiş (naturalisatie) başvurusu yaptığınızda izniniz geçerli olmalı ve karar verilene kadar geçerli kalmalıdır. Oturmanızın kesintisiz kalması için izninizi her zaman zamanında uzatın.",
        "antwoorden": [
          {
            "tekst": "Evet, iznim geçerli",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "Hayır, iznimin süresi doldu veya iznim yok",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
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
        "tekst": "Z-rotasını tamamladınız — vatandaşlık için bir ek adım gerekiyor",
        "uitleg": "Z-rotası bir kapanış görüşmesi ve sertifika ile sona erer, ancak vatandaşlık için IND ek dil koşulları uygular. Yine de vatandaşlık alabilmek için üç yol vardır:<br><br><strong>Yol A — A2 seviyesinde sınavı yine de geçmek</strong><br>Tüm dil sınavlarını A2 seviyesinde (okuma, dinleme, yazma, konuşma) ve KNM sınavını geçin. Dikkat: Z-rotası tamamlandığı için sınav denemeleri artık ücretsiz değildir.<br><br><strong>Yol B — 600 saat dil dersi + her bölümde en az 3 deneme</strong><br>Blik op Werk belgeli bir kurumda en az 600 saat A2 seviyesinde dil dersi ve her bölümde 3 deneme? O zaman DUO bir muafiyet tavsiyesi verebilir.<br><br><strong>Yol C — 600 saat okuma-yazma + DUO testi (€150)</strong><br>En az 600 saat okuma-yazma eğitimi ve A2'nin ulaşılamaz olduğu anlaşılırsa? O zaman DUO testi (€150) ile muafiyet verilir.<br><br><em>Gelecekte mümkün:</em> hükümet vatandaşlık için dil koşulunu A2'den B1'e yükseltmek istiyor. Bu henüz kabul edilmedi — şu anda hâlâ A2 geçerli.<br><br>💡 Hangi yolun size en uygun olduğunu belediyenizle görüşün.",
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
        "tekst": "Mevcut vatandaşlığınızdan vazgeçmeye hazır mısınız?",
        "uitleg": "Hollanda kural olarak çifte vatandaşlığa izin vermez. İstisnalar vardır, örneğin tanınmış mülteciler için.",
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
            "volgende": "v8",
            "alleenPad": "asiel"
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
        "info": "💡 Tanınmış bir mülteci misiniz? O hâlde genellikle orijinal vatandaşlığınızdan vazgeçmeniz gerekmez.",
        "infoAlleenPad": "asiel",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "Korumaya ihtiyaç duyuyorsanız IND'ye sığınma başvurusu yapabilirsiniz.",
            "alleenPad": "asiel"
          },
          {
            "naam": "Normal izin",
            "tekst": "İş, öğrenim veya aile birleşimi için düzenli izinler mevcuttur."
          },
          {
            "naam": "Hukuki yardım",
            "tekst": "Bir avukatla veya Hukuki Danışma Bürosu (Juridisch Loket) ile iletişime geçin."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Sığınmacılar ve statü sahipleri için ücretsiz hukuki destek.",
            "alleenPad": "asiel"
          }
        ],
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Juridisch Loket üzerinden yardım"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Hollanda'da henüz yeterince uzun değil",
        "sub": "Hollanda'da en az 5 yıl aralıksız yaşamanız gerekir. Bekleme süresini iyi değerlendirebilirsiniz.",
        "alternatieven": [
          {
            "naam": "İzninizi zamanında yenileyin",
            "tekst": "Geçerli izniniz olmayan bir dönem olursa — bir \"ikamet boşluğu\" (verblijfsgat) — o süre sayılmaz. 5 yıl o zaman yeniden saymaya başlayabilir. Bu yüzden uzatmayı zamanında, en geç bitiş tarihinden sonraki 4 hafta içinde isteyin: o zaman IND bunu ikamet boşluğu saymaz."
          },
          {
            "naam": "Vatandaşlık süresi: muhtemelen 10 yıl",
            "tekst": "Dikkat: bu, oturma izniniz değil, vatandaşlığa başvurabilmeden önceki bekleme süresidir. Hükümet bu vatandaşlık süresini 5 yıldan 10 yıla çıkarmak istiyor. Henüz kabul edilmedi, ama göz önünde bulundurun. Hollandalı bir eşle süre daha kısa olabilir — belediyenize sorun."
          },
          {
            "naam": "Alternatif: AB uzun süreli mukimi",
            "tekst": "AB uzun süreli mukimi (EU-langdurig ingezetene) statüsü 5 yıl sonra kalıcı oturma hakkı verir ve kendi vatandaşlığınızı korursunuz. <strong>Ancak bunun için gelir şartı vardır.</strong>"
          },
          {
            "naam": "Entegrasyonu tamamlayın",
            "tekst": "Bekleme süresini entegrasyon sınavınızı geçmek için kullanın — vatandaşlık için zorunlu bir koşul."
          },
          {
            "naam": "Belge toplayın",
            "tekst": "Menşe ülkenizden resmi belgeleri önceden talep edin ve Hollandacanızı geliştirin, örneğin Blik op Werk belgeli bir kurumda dil kursuyla."
          },
          {
            "naam": "Hükümet planı (henüz yasa değil)",
            "tekst": "İki kez geçici iltica izni almış ve Hollandacada B1 seviyesine ulaşmış statü sahipleri, AB uzun süreli mukimi (EU-langdurig ingezetene) olmadan da 6 yıl sonra Hollanda vatandaşı olabilecek. B1'e ulaşamayanlar için bir istisna gelecek. Henüz bir yasa tasarısı yok. Bu yasa çıkana kadar yukarıdaki kurallar geçerlidir.",
            "alleenPad": "asiel"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 İncele: AB uzun süreli mukimi (5 yıldan sonra kalıcı ikamet)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ ind.nl'de daha fazla bilgi"
      },
      "r_regulier_tijdelijk": {
        "type": "wacht",
        "icoon": "🎓",
        "titel": "Bu izinle henüz Hollanda vatandaşı olamazsınız",
        "sub": "Vatandaşlığa geçiş (naturalisatie) için süresiz bir izne veya geçici olmayan bir amaç için verilmiş bir izne ihtiyacınız var. Öğrenim veya başka bir geçici kalış için verilen izin sayılmaz.",
        "alternatieven": [
          {
            "naam": "Durumunuz değişiyor mu?",
            "tekst": "Örneğin çalışmaya mı başlayacaksınız, yoksa partnerinizle birlikte mi yaşayacaksınız? O zaman başka bir izin için başvurabilirsiniz. Ardından bu kontrolü yeniden yapın."
          },
          {
            "naam": "Kalışınız nasıl sayılır?",
            "tekst": "Mevcut izninizle geçen yılların 5 yıla sayılıp sayılmadığı durumunuza bağlıdır. Bunu kontrol ettirin."
          },
          {
            "naam": "Hollandacanız üzerinde şimdiden çalışın",
            "tekst": "Vatandaşlığa geçiş (naturalisatie) için ileride uyum sürecini (inburgering) tamamlamış olmanız gerekir. Bir dil kursu şimdiden yardımcı olur."
          }
        ],
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ ind.nl'de daha fazla bilgi"
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ ind.nl'de daha fazla bilgi"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Z-rotasından vatandaşlığa — önemli bir fark",
        "padenTitel": "Z-rotasından vatandaşlığa üç yol",
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
        "info": "📞 <strong>Tavsiye:</strong> Durumunuza en uygun yolu belirlemek için belediyenize danışın.",
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Juridisch Loket üzerinden yardım"
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
            "tekst": "Statü sahipleri için ücretsiz hukuki yardım.",
            "alleenPad": "asiel"
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
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Juridisch Loket üzerinden yardım"
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
            "tekst": "Şüphe durumunda: bir hukuk danışmanına veya Hukuki Danışma Bürosu'na (Juridisch Loket) başvurun."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "Tanınmış bir mülteci olarak vatandaşlığınızdan vazgeçmek ZORUNDA DEĞİLSİNİZ.",
            "alleenPad": "asiel"
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
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 İncele: AB uzun süreli mukimi (vatandaşlığı koruma)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ AB uzun süreli mukimi hakkında ind.nl üzerinde daha fazla bilgi"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "AB uzun süreli mukimi — vatandaşlığınızdan vazgeçmeden kalıcı kalma",
        "sub": "5 yıl sonra kalıcı bir oturma izni. Kendi vatandaşlığınızı korursunuz. 12 Haziran 2026'dan bu yana bu, yeni statü sahipleri için vatandaşlığa geçişte (naturalisatie) zorunlu ara adımdır.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Nedir:</strong> Hollanda'da süresiz oturabilir ve serbestçe çalışabilirsiniz, ayrıca diğer AB ülkelerinde daha kolay taşınıp çalışabilirsiniz. İltica yıllarınız 5 yıla sayılır; öğrenim yılları %50 sayılır."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Gelir şartı:</strong> yeterli ve sürekli kendi gelirinizin ve sağlık sigortanızın olması gerekir. Sosyal yardımla bu genellikle mümkün olmaz. Süreli bir iltica oturma izniniz (verblijfsvergunning asiel) varsa, ileride vatandaşlığa geçebilmek için AB uzun süreli mukimi (EU-langdurig ingezetene) statüsüne ihtiyacınız var. Yani gelir şartı Hollanda vatandaşlığına giden yolunuz için de geçerlidir."
          },
          {
            "type": "info",
            "tekst": "✈️ 5 yıl boyunca art arda 6 aydan uzun ve toplamda 10 aydan fazla Hollanda dışında bulunamazsınız."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Sizin için ne zaman ilginç?</strong> İlk vatandaşlığınızdan vazgeçmek istemiyor veya vazgeçemiyorsanız — vatandaşlık için ilke olarak gerekir, burada gerekmez."
          },
          {
            "nr": 2,
            "tekst": "<strong>Süreli iltica izni mi?</strong> O hâlde kalıcı bir izne ve ardından vatandaşlığa (naturalisatie) giden tek yol budur."
          },
          {
            "nr": 3,
            "tekst": "<strong>Şartlar:</strong> Hollanda'da 5 yıl aralıksız yasal ikamet, yurt dışında çok uzun kalmamak, yeterli ve sürekli kendi gelir, sağlık sigortası ve B1 rotası, eğitim rotası veya Z-rotası ile tamamlanmış entegrasyon (inburgering)."
          },
          {
            "nr": 4,
            "tekst": "<strong>Başvuru:</strong> IND'ye. Belirsiz süreli bir izin için başvurursanız, IND otomatik olarak AB uzun süreli mukimi statüsü alıp alamayacağınızı kontrol eder. İltica izniyle yalnızca kâğıt üzerinde başvurabilirsiniz, internet üzerinden değil."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ AB uzun süreli mukimi hakkında ind.nl üzerinde daha fazla bilgi"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Maliyetleri düşürmek için bazı yöntemler mevcut.",
        "sub": "Vatandaşlığa geçiş bir kişi için €1.139, partnerle €1.454 tutar (2026 tarifeleri) — ancak bunu karşılanabilir hâle getirmenin yolları var.",
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
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Hollanda vatandaşı olabilirsiniz — iki adımda",
        "sub": "Süreli bir iltica oturma izniyle (verblijfsvergunning asiel) önce AB uzun süreli mukimi (EU-langdurig ingezetene) olmanız gerekir. Ardından vatandaşlığa geçiş (naturalisatie) başvurusu yapabilirsiniz.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Gelir:</strong> IND gelirinizin yeterli olup olmadığına ve devam edip etmeyeceğine bakar (iş sözleşmesi en az 12 ay daha geçerli olmalıdır). Yeni mi işe başladınız veya geçici sözleşmeniz mi var? O zaman önce başvurunuzun şansı olup olmadığını kontrol ettirin."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Hükümet planı — henüz yasa değil:</strong> iki kez geçici iltica izni almış ve Hollandacada B1 seviyesine ulaşmış statü sahipleri, AB uzun süreli mukimi (EU-langdurig ingezetene) olmadan da 6 yıl sonra Hollanda vatandaşı olabilecek. B1'e ulaşamayanlar için bir istisna gelecek. Henüz bir yasa tasarısı yok. Bu yasa çıkana kadar yukarıdaki kurallar geçerlidir."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>IND'ye AB uzun süreli mukimi (EU-langdurig ingezetene) başvurusu yapın.</strong> İltica izniyle bu yalnızca kâğıt üzerinde mümkündür, internet üzerinden değil. Başvuru € 254 tutar."
          },
          {
            "nr": 2,
            "tekst": "<strong>Kanıt toplayın:</strong> iş sözleşmeniz ve maaş bordrolarınız, sağlık sigortanız ve entegrasyon diplomanız veya kararınız. IND formu tam olarak neyin gerektiğini söyler."
          },
          {
            "nr": 3,
            "tekst": "<strong>Bu arada iltica izninizi zamanında uzatın.</strong> Böylece ikametiniz kesintisiz kalır."
          },
          {
            "nr": 4,
            "tekst": "<strong>AB uzun süreli mukimi oldunuz mu? O zaman belediyenizde vatandaşlığa geçiş (naturalisatie) başvurusu yapın.</strong> O zaman olağan şartlar geçerlidir: vatandaşlık için entegrasyon (inburgering), sabıka kaydının olmaması ve Hollanda'da kalıcı olarak yaşamanız. Tanınmış mülteci olarak genellikle vatandaşlığınızdan vazgeçmeniz gerekmez."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ AB uzun süreli mukimi hakkında ind.nl üzerinde daha fazla bilgi"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "AB uzun süreli mukimi olabilirsiniz — vatandaşlık için ardından ek bir adım gerekir",
        "sub": "Z-rotası (Z-route) ile AB uzun süreli mukimi (EU-langdurig ingezetene) için entegrasyon şartını (inburgering) karşılarsınız. Vatandaşlığa geçiş (naturalisatie) için bu yeterli değildir: bunun için ek dil şartları vardır.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Gelir:</strong> IND gelirinizin yeterli olup olmadığına ve devam edip etmeyeceğine bakar (iş sözleşmesi en az 12 ay daha geçerli olmalıdır). Yeni mi işe başladınız veya geçici sözleşmeniz mi var? O zaman önce başvurunuzun şansı olup olmadığını kontrol ettirin."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Hükümet planı — henüz yasa değil:</strong> iki kez geçici iltica izni almış ve Hollandacada B1 seviyesine ulaşmış statü sahipleri, AB uzun süreli mukimi (EU-langdurig ingezetene) olmadan da 6 yıl sonra Hollanda vatandaşı olabilecek. B1'e ulaşamayanlar için bir istisna gelecek. Henüz bir yasa tasarısı yok. Bu yasa çıkana kadar yukarıdaki kurallar geçerlidir."
          }
        ],
        "padenTitel": "AB uzun süreli mukimi olduktan sonra: Z-rotasından vatandaşlığa üç yol",
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
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>IND'ye AB uzun süreli mukimi (EU-langdurig ingezetene) başvurusu yapın.</strong> İltica izniyle bu yalnızca kâğıt üzerinde mümkündür, internet üzerinden değil. Başvuru € 254 tutar."
          },
          {
            "nr": 2,
            "tekst": "<strong>Kanıt toplayın:</strong> iş sözleşmeniz ve maaş bordrolarınız, sağlık sigortanız ve entegrasyon diplomanız veya kararınız. IND formu tam olarak neyin gerektiğini söyler."
          },
          {
            "nr": 3,
            "tekst": "<strong>Bu arada iltica izninizi zamanında uzatın.</strong> Böylece ikametiniz kesintisiz kalır."
          },
          {
            "nr": 4,
            "tekst": "<strong>AB uzun süreli mukimi oldunuz mu? O zaman yukarıdaki yollardan birini seçin ve ardından belediyenizde vatandaşlığa geçiş (naturalisatie) başvurusu yapın.</strong>"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ AB uzun süreli mukimi hakkında ind.nl üzerinde daha fazla bilgi"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "Önce entegrasyonunuzu tamamlayın",
        "sub": "Hollanda'da yeterince uzun süredir yaşıyorsunuz ve geliriniz var. Eksik olan, entegrasyonunuz (inburgering). Ardından AB uzun süreli mukimi (EU-langdurig ingezetene) başvurusu, daha sonra da vatandaşlığa geçiş (naturalisatie) başvurusu yapabilirsiniz.",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 B1 rotası (B1-route), eğitim rotası (onderwijsroute) ve Z-rotası (Z-route) üçü de AB uzun süreli mukimi (EU-langdurig ingezetene) için sayılır. Vatandaşlığa geçiş (naturalisatie) için ise yalnızca Z-rotası yeterli değildir."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Hükümet planı — henüz yasa değil:</strong> iki kez geçici iltica izni almış ve Hollandacada B1 seviyesine ulaşmış statü sahipleri, AB uzun süreli mukimi (EU-langdurig ingezetene) olmadan da 6 yıl sonra Hollanda vatandaşı olabilecek. B1'e ulaşamayanlar için bir istisna gelecek. Henüz bir yasa tasarısı yok. Bu yasa çıkana kadar yukarıdaki kurallar geçerlidir."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Entegrasyon rotanızı tamamlayın.</strong> Belediyenize daha ne kadar süreye ihtiyacınız olduğunu sorun."
          },
          {
            "nr": 2,
            "tekst": "<strong>İşinizi ve sağlık sigortanızı sürdürün.</strong> Başvuru için bunlara ihtiyacınız var."
          },
          {
            "nr": 3,
            "tekst": "<strong>İltica izninizi zamanında uzatın.</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>Bu kontrolü yeniden yapın</strong>, entegrasyonunuz bittiğinde."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 AB uzun süreli mukimi nedir?"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "Şu anda engel geliriniz",
        "sub": "Süreli bir iltica oturma izniyle (verblijfsvergunning asiel) ancak önce AB uzun süreli mukimi (EU-langdurig ingezetene) olursanız Hollanda vatandaşı olabilirsiniz. Bunun için yeterli kendi gelirinizin olması gerekir. Sosyal yardımla bu şu anda henüz mümkün değil. Açıkçası bu büyük bir değişiklik.",
        "alternatieven": [
          {
            "naam": "İş veya daha fazla saat",
            "tekst": "Bir iş veya daha fazla saat çalışmak yolu açabilir. Loont werken aracıyla çalışmanın size ne kazandıracağına bakın."
          },
          {
            "naam": "Kalabilirsiniz",
            "tekst": "İltica izniniz geçerli kalır. Her zaman zamanında uzatın."
          },
          {
            "naam": "Entegrasyonunuzu tamamlayın",
            "tekst": "Entegrasyona (inburgering) hem AB uzun süreli mukimi (EU-langdurig ingezetene) hem de vatandaşlığa geçiş (naturalisatie) için ihtiyacınız var."
          },
          {
            "naam": "Partner mi, istisna mı?",
            "tekst": "Birlikte yaşıyorsanız ve partneriniz Hollanda vatandaşıysa veya oturma izni varsa, partnerinizin geliri sayılabilir. AOW yaşına (AOW-leeftijd) ulaştıysanız veya kalıcı ve tamamen çalışamaz durumdaysanız ve bunu kanıtlayabiliyorsanız bir istisna geçerlidir."
          },
          {
            "naam": "Hükümet planı (henüz yasa değil)",
            "tekst": "İki kez geçici iltica izni almış ve Hollandacada B1 seviyesine ulaşmış statü sahipleri, AB uzun süreli mukimi (EU-langdurig ingezetene) olmadan da 6 yıl sonra Hollanda vatandaşı olabilecek. B1'e ulaşamayanlar için bir istisna gelecek. Henüz bir yasa tasarısı yok. Bu yasa çıkana kadar yukarıdaki kurallar geçerlidir."
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ Çalışmanın size ne kazandıracağını hesaplayın"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "Belki çok uzun süre yurt dışında kaldınız",
        "sub": "AB uzun süreli mukimi (EU-langdurig ingezetene) olmak için art arda 6 aydan uzun ve toplamda 10 aydan fazla Hollanda dışında bulunmamış olmanız gerekir. Bu nedenle 5 yıl yeniden saymaya başlayabilir.",
        "alternatieven": [
          {
            "naam": "Seyahatlerinizi sayın",
            "tekst": "Seyahatlerinizin tarihlerini bulun: damgalar, biletler veya seyahat belgesi başvurunuz."
          },
          {
            "naam": "Kontrol ettirin",
            "tekst": "VluchtelingenWerk veya belediyeniz, ne zamandan itibaren yeniden 5 yılınızın dolacağını sizinle birlikte hesaplayabilir."
          },
          {
            "naam": "Bundan sonra daha kısa süre uzak kalın",
            "tekst": "Uzun seyahatleri sınırın altında kalacak şekilde planlayın."
          },
          {
            "naam": "Hükümet planı (henüz yasa değil)",
            "tekst": "İki kez geçici iltica izni almış ve Hollandacada B1 seviyesine ulaşmış statü sahipleri, AB uzun süreli mukimi (EU-langdurig ingezetene) olmadan da 6 yıl sonra Hollanda vatandaşı olabilecek. B1'e ulaşamayanlar için bir istisna gelecek. Henüz bir yasa tasarısı yok. Bu yasa çıkana kadar yukarıdaki kurallar geçerlidir."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ AB uzun süreli mukimi hakkında ind.nl üzerinde daha fazla bilgi"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Hollanda'da henüz yeterince uzun değil",
        "sub": "Süreli bir iltica oturma izniyle (verblijfsvergunning asiel) önce Hollanda'da 5 yıl yaşamanız gerekir. Ardından AB uzun süreli mukimi (EU-langdurig ingezetene) olabilirsiniz ve ancak o zaman Hollanda vatandaşı. O zamana kadarki süreyi iyi değerlendirebilirsiniz.",
        "alternatieven": [
          {
            "naam": "Zamanında uzatın",
            "tekst": "Süreli iltica izinleri en fazla 3 yıl geçerlidir; bu yüzden zamanında yenileyin. İki izin arasında geçerli izniniz olmayan bir \"ikamet boşluğu\" (verblijfsgat) oluşursa, o süre yasal ikamet sayılmaz ve vatandaşlık için 5 yıl sayacı yeniden başlayabilir. Bu yüzden yenilemeyi en geç bitiş tarihinden sonraki 4 hafta içinde yapın: o zaman IND bunu ikamet boşluğu saymaz."
          },
          {
            "naam": "Gelirinizi geliştirin",
            "tekst": "AB uzun süreli mukimi (EU-langdurig ingezetene) olmak için ileride yeterli kendi gelirinize ihtiyacınız olacak. Şimdiden bir iş veya daha fazla çalışma saati için uğraşın."
          },
          {
            "naam": "Entegrasyonunuzu tamamlayın",
            "tekst": "B1 rotası (B1-route), eğitim rotası (onderwijsroute) ve Z-rotası (Z-route), AB uzun süreli mukimi (EU-langdurig ingezetene) için sayılır."
          },
          {
            "naam": "Çok uzun süre uzak kalmayın",
            "tekst": "Art arda 6 aydan uzun ve toplamda 10 aydan fazla yurt dışına gitmeyin."
          },
          {
            "naam": "Hükümet planı (henüz yasa değil)",
            "tekst": "İki kez geçici iltica izni almış ve Hollandacada B1 seviyesine ulaşmış statü sahipleri, AB uzun süreli mukimi (EU-langdurig ingezetene) olmadan da 6 yıl sonra Hollanda vatandaşı olabilecek. B1'e ulaşamayanlar için bir istisna gelecek. Henüz bir yasa tasarısı yok. Bu yasa çıkana kadar yukarıdaki kurallar geçerlidir."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 AB uzun süreli mukimi nedir?"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Önce hangi izne sahip olduğunuzu kontrol ettirin",
        "sub": "Hollanda vatandaşlığına giden yolunuz izninize bağlıdır.",
        "alternatieven": [
          {
            "naam": "Süresiz iltica",
            "tekst": "Diğer şartları karşılıyorsanız vatandaşlığa geçebilirsiniz (naturalisatie)."
          },
          {
            "naam": "Süreli iltica (3 veya 5 yıl)",
            "tekst": "Önce AB uzun süreli mukimi (EU-langdurig ingezetene), gelir şartıyla, ardından vatandaşlığa geçiş (naturalisatie). İzni 12 Haziran 2026'dan önce almış olsanız da."
          },
          {
            "naam": "Başka bir izin",
            "tekst": "Aile, partner veya iş için: vatandaşlığa geçiş genellikle 5 yıl sonra mümkündür. Öğrenim veya başka bir geçici kalış için henüz değil."
          },
          {
            "naam": "Kim yardım edebilir?",
            "tekst": "Belediyedeki danışmanınız veya VluchtelingenWerk kartınıza sizinle birlikte bakabilir."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ Size yakın bir VluchtelingenWerk merkezi bulun"
      }
    }
  },
  "UK": {
    "header": {
      "badge": "🇳🇱 Перевірка натуралізації",
      "titel": "Чи маю я право на нідерландський паспорт?",
      "sub": "Дайте відповідь на кілька запитань і дізнайтеся, чи можете ви стати громадянином Нідерландів. На основі правил 2026 року, зокрема нових правил щодо притулку з 12 червня 2026 року.",
      "disclaimer": "⚠️ Цей інструмент дає орієнтир, а не рішення. Перевірено у вересні 2026 року (IND, Stimulansz). З 12 червня 2026 року безстрокового дозволу на притулок більше немає. Тому власники статусу з дозволом на проживання у зв'язку з притулком на певний строк (verblijfsvergunning asiel) спершу мають стати довгостроковими резидентами ЄС (EU-langdurig ingezetene), перш ніж зможуть пройти натуралізацію (naturalisatie). Оголошені плани уряду — ще не закон. Завжди звертайтеся по пораду до муніципалітету або VluchtelingenWerk.",
      "vwnLabel": "Не впевнені у своїй ситуації?",
      "vwnTekst": "Правила натуралізації швидко змінюються, і ваша ситуація може відрізнятися від того, що показує інструмент. VluchtelingenWerk Nederland пропонує безкоштовні консультації та підтримку щодо натуралізації — знайдіть найближче місце на <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a>.",
      "hulpRegulierLabel": "Не впевнені у своїй ситуації?",
      "hulpRegulierTekst": "Юридична консультація (Juridisch Loket) безкоштовно консультує щодо вашого дозволу на проживання та натуралізації (naturalisatie). Дивіться <a href=\"https://www.juridischloket.nl\" target=\"_blank\" style=\"color:inherit;\">juridischloket.nl</a> або запитайте у своєму муніципалітеті."
    },
    "ui": {
      "volgendeStappen": "Наступні кроки",
      "watKunJeDoen": "Що ви можете зробити?",
      "watKunJeNuDoen": "Що ви можете зробити зараз?",
      "opnieuw": "↺ Почати знову",
      "laatChecken": "Попросіть перевірити вашу ситуацію",
      "vraagLabel": "Питання {n}",
      "jeKuntKiezen": "Ви можете вибрати:",
      "ladenMislukt": "Під час завантаження цієї сторінки щось пішло не так. Оновіть сторінку або спробуйте пізніше.",
      "driePaden": "Три шляхи до натуралізації через Z-маршрут"
    },
    "vragen": {
      "v1": {
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
        "tekst": "Яке у вас право на проживання в Нідерландах?",
        "uitleg": "Вид дозволу визначає ваш шлях до нідерландського громадянства. Громадяни ЄС живуть тут на підставі права ЄС.",
        "antwoorden": [
          {
            "tekst": "Я маю дозвіл на проживання у зв'язку з притулком (власник статусу)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel",
            "pad": "asiel"
          },
          {
            "tekst": "Я маю інший дозвіл на проживання",
            "sub": "Наприклад, для сім'ї, роботи або навчання",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v_regulier",
            "pad": "regulier"
          },
          {
            "tekst": "Я громадянин(-ка) ЄС",
            "sub": "Або громадянин(-ка) ЄЕП/Швейцарії",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Я не впевнений(-а)",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "Який дозвіл на притулок у вас зараз?",
        "uitleg": "Подивіться на свою картку на проживання: там написано 'безстроково' (onbepaalde tijd) чи вказано дату закінчення?",
        "antwoorden": [
          {
            "tekst": "Безстроковий притулок",
            "sub": "На вашій картці немає дати закінчення права на проживання",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Притулок на певний строк",
            "sub": "Дійсний 3 або 5 років, навіть якщо ви отримали його до 12 червня 2026 року",
            "icoon": "📅",
            "klasse": "anders",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "Я вже довгостроковий резидент ЄС",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Я не знаю",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "Ваш дозвіл залишається дійсним — але шлях до громадянства Нідерландів іде через проміжний крок",
        "uitleg": "Ваш дозвіл на притулок залишається дійсним до дати, вказаної на картці. Але з дозволом на проживання у зв'язку з притулком на певний строк (verblijfsvergunning asiel) ви не можете подати заяву на натуралізацію (naturalisatie). Це стосується і тих, хто отримав дозвіл до 12 червня 2026 року. З 12 червня 2026 року безстрокового дозволу на притулок більше не існує.<br><br>Тому спершу вам потрібно стати <strong>довгостроковим резидентом ЄС</strong> (EU-langdurig ingezetene). Після цього ви можете подати заяву на натуралізацію. Наступні запитання покажуть, чи це вже можливо для вас.",
        "antwoorden": [
          {
            "tekst": "Зрозуміло — далі",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "e1"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "Як дізнатися, який у вас дозвіл",
        "uitleg": "Подивіться на свою картку на проживання, у поле 'Type document en bijzonderheden' (тип документа й особливості: номер типу та текст поруч), або в лист від IND. Зверніть увагу на дві речі:<br><br>1. Там написано <strong>притулок</strong> (asiel) чи інша мета (наприклад, сім'я або робота)?<br>2. Там написано '<strong>безстроково</strong>' (onbepaalde tijd) чи вказано <strong>дату закінчення</strong>?<br><br>Не можете розібратися? Запитайте свого консультанта в муніципалітеті або VluchtelingenWerk.",
        "antwoorden": [
          {
            "tekst": "Я знайшов(-ла) — назад до запитання",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Я не можу це перевірити",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "v_regulier": {
        "tekst": "Який у вас дозвіл на проживання?",
        "uitleg": "Для натуралізації (naturalisatie) потрібен безстроковий дозвіл або дозвіл з метою, яка не є тимчасовою, наприклад проживання з партнером або робота. На вашій картці на проживання вказано мету і чи є дата закінчення.",
        "antwoorden": [
          {
            "tekst": "Безстроковий",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "На певний строк — для сім'ї, партнера або роботи",
            "icoon": "👨‍👩‍👧",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "На певний строк — для навчання або іншого тимчасового перебування",
            "sub": "Наприклад, сезонна робота, лікування, обмін або рік пошуку роботи для високоосвічених осіб",
            "icoon": "🎓",
            "klasse": "nee",
            "volgende": "r_regulier_tijdelijk"
          },
          {
            "tekst": "Я не знаю",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "e1": {
        "tekst": "Чи живете ви в Нідерландах 5 років або довше без перерви з дійсним дозволом?",
        "uitleg": "З дозволом на проживання у зв'язку з притулком на певний строк (verblijfsvergunning asiel) ви можете стати громадянином Нідерландів, лише якщо спершу станете довгостроковим резидентом ЄС (EU-langdurig ingezetene). Для цього потрібно щонайменше 5 років поспіль жити в Нідерландах із дійсним дозволом. Роки з дозволом на притулок зараховуються. Чи зараховується час процедури притулку, вирішує IND.",
        "antwoorden": [
          {
            "tekst": "Так, 5 років або довше",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "Ні, менше ніж 5 років",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "Чи були ви за ці 5 років довго за кордоном?",
        "uitleg": "Для статусу довгострокового резидента ЄС (EU-langdurig ingezetene) ви не повинні були перебувати за межами Нідерландів довше ніж 6 місяців поспіль. Загалом — не більше ніж 10 місяців.",
        "antwoorden": [
          {
            "tekst": "Ні, ніколи так довго",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "Так, довше ніж 6 місяців поспіль або більше ніж 10 місяців загалом",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "Я точно не знаю",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "Чи маєте ви достатньо власного доходу, щоб на нього жити?",
        "uitleg": "Для статусу довгострокового резидента ЄС (EU-langdurig ingezetene) вам потрібен достатній власний дохід. Він має бути самостійним (не з допомоги) і стабільним (він зберігається). Також вам потрібне медичне страхування.",
        "antwoorden": [
          {
            "tekst": "Так, з роботи або власної справи",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "Так, але лише недавно або за тимчасовим договором",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "Ні, я отримую допомогу або не маю власного доходу",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "Як просувається ваша громадянська інтеграція?",
        "uitleg": "Для статусу довгострокового резидента ЄС (EU-langdurig ingezetene) ви маєте виконати вимогу громадянської інтеграції (inburgering). Це можна зробити через маршрут B1 (B1-route), освітній маршрут (onderwijsroute) або Z-маршрут (Z-route).",
        "antwoorden": [
          {
            "tekst": "Завершено через маршрут B1 або освітній маршрут, або я маю звільнення",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "Завершено через Z-маршрут",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "Я ще в процесі",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "Чи дійсний ваш дозвіл на проживання зараз?",
        "uitleg": "Ваш дозвіл має бути дійсним, коли ви подаєте заяву на натуралізацію (naturalisatie), і залишатися дійсним до ухвалення рішення. Завжди вчасно подовжуйте його, щоб ваше проживання залишалося безперервним.",
        "antwoorden": [
          {
            "tekst": "Так, мій дозвіл дійсний",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "Ні, строк дії мого дозволу закінчився або в мене його немає",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
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
        "tekst": "Ви завершили Z-маршрут — для натуралізації потрібен ще один крок",
        "uitleg": "Z-маршрут завершується підсумковою співбесідою та сертифікатом, але для натуралізації IND застосовує додаткові мовні вимоги. Є три шляхи, щоб усе ж натуралізуватися:<br><br><strong>Шлях A — Усе ж скласти іспит на рівні A2</strong><br>Складіть усі мовні іспити на рівні A2 (читання, аудіювання, письмо, говоріння) та іспит KNM. Увага: оскільки Z-маршрут завершено, спроби іспиту більше не безкоштовні.<br><br><strong>Шлях B — 600 годин мовних занять + щонайменше 3 спроби на компонент</strong><br>Щонайменше 600 годин занять рівня A2 в установі із сертифікатом Blik op Werk і 3 спроби на компонент? Тоді DUO може надати рекомендацію про звільнення.<br><br><strong>Шлях C — 600 годин грамотності + тест DUO (€150)</strong><br>Щонайменше 600 годин навчання грамотності, і виявляється, що A2 недосяжний? Тоді звільнення надається через тест DUO (€150).<br><br><em>Можливо в майбутньому:</em> уряд хоче підвищити мовну вимогу для натуралізації з A2 до B1. Це ще не прийнято — наразі діє ще A2.<br><br>💡 Обговоріть зі своїм муніципалітетом, який шлях вам найкраще підходить.",
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
        "tekst": "Чи готові ви відмовитися від вашого поточного громадянства?",
        "uitleg": "Нідерланди, як правило, не дозволяють подвійне громадянство. Є винятки, наприклад для визнаних біженців.",
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
            "volgende": "v8",
            "alleenPad": "asiel"
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
        "info": "💡 Ви визнаний(-а) біженець? Тоді вам зазвичай не потрібно відмовлятися від свого початкового громадянства.",
        "infoAlleenPad": "asiel",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "Якщо вам потрібен захист, ви можете подати заяву про притулок до IND.",
            "alleenPad": "asiel"
          },
          {
            "naam": "Звичайний дозвіл",
            "tekst": "Для роботи, навчання або возз'єднання сім'ї є звичайні дозволи."
          },
          {
            "naam": "Юридична допомога",
            "tekst": "Зверніться до адвоката або до Юридичної консультації (Juridisch Loket)."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "Безкоштовна юридична підтримка для шукачів притулку та власників статусу.",
            "alleenPad": "asiel"
          }
        ],
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Допомога через Juridisch Loket"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Ви ще недостатньо довго в Нідерландах",
        "sub": "Ви повинні прожити в Нідерландах щонайменше 5 років поспіль. Час очікування можна використати з користю.",
        "alternatieven": [
          {
            "naam": "Вчасно подовжуйте посвідку",
            "tekst": "Якщо буде період без дійсного дозволу — \"пробіл у проживанні\" (verblijfsgat) — цей час не зараховується. Тоді відлік 5 років може початися заново. Тому подавайте на подовження вчасно, щонайпізніше протягом 4 тижнів після закінчення: тоді IND не вважатиме це пробілом."
          },
          {
            "naam": "Строк натуралізації: можливо 10 років",
            "tekst": "Увага: це стосується часу очікування перед натуралізацією, а не вашої посвідки на проживання. Уряд хоче подовжити цей строк натуралізації з 5 до 10 років. Ще не прийнято, але враховуйте. З партнером-нідерландцем строк може бути коротшим — запитайте в муніципалітеті."
          },
          {
            "naam": "Альтернатива: довгостроковий резидент ЄС",
            "tekst": "Статус довгострокового резидента ЄС (EU-langdurig ingezetene) дає постійне право на проживання через 5 років, і ви зберігаєте своє громадянство. <strong>Але для нього діє вимога щодо доходу.</strong>"
          },
          {
            "naam": "Завершіть інтеграцію",
            "tekst": "Використайте час очікування, щоб скласти іспит з інтеграції — обов'язкова вимога для натуралізації."
          },
          {
            "naam": "Зберіть документи",
            "tekst": "Заздалегідь замовте офіційні документи з країни походження та працюйте над нідерландською, наприклад через мовний курс в установі із сертифікатом Blik op Werk."
          },
          {
            "naam": "План уряду (ще не закон)",
            "tekst": "Власники статусу, які двічі отримали тимчасовий дозвіл на притулок і складуть нідерландську на рівні B1, могли б стати громадянами Нідерландів через 6 років, навіть без статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для тих, хто не може досягти B1, буде виняток. Законопроєкту ще немає. Доки такого закону немає, діють наведені вище правила.",
            "alleenPad": "asiel"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Переглянути: довгостроковий резидент ЄС (постійне проживання після 5 років)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Більше інформації на ind.nl"
      },
      "r_regulier_tijdelijk": {
        "type": "wacht",
        "icoon": "🎓",
        "titel": "З цим дозволом ви поки що не можете стати громадянином Нідерландів",
        "sub": "Для натуралізації (naturalisatie) потрібен безстроковий дозвіл або дозвіл з метою, яка не є тимчасовою. Дозвіл для навчання або іншого тимчасового перебування не зараховується.",
        "alternatieven": [
          {
            "naam": "Ваша ситуація змінюється?",
            "tekst": "Наприклад, ви почнете працювати або житимете з партнером? Тоді ви можете подати заяву на інший дозвіл. Після цього пройдіть цю перевірку ще раз."
          },
          {
            "naam": "Як зараховується ваше перебування?",
            "tekst": "Чи зараховуються роки з вашим теперішнім дозволом до 5 років, залежить від вашої ситуації. Попросіть це перевірити."
          },
          {
            "naam": "Уже зараз працюйте над нідерландською",
            "tekst": "Для натуралізації (naturalisatie) згодом потрібно буде завершити інтеграцію (inburgering). Мовний курс допоможе вже зараз."
          }
        ],
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Більше інформації на ind.nl"
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Більше інформації на ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Натуралізація через Z-маршрут — важлива відмінність",
        "padenTitel": "Три шляхи до натуралізації через Z-маршрут",
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
        "info": "📞 <strong>Порада:</strong> Проконсультуйтеся з вашим муніципалітетом щодо найкращого шляху для вашої ситуації.",
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Допомога через Juridisch Loket"
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
            "tekst": "Безкоштовна юридична допомога для власників статусу.",
            "alleenPad": "asiel"
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
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ Допомога через Juridisch Loket"
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
            "tekst": "У разі сумніву: зверніться до юридичного радника або до Юридичної консультації (Juridisch Loket)."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "Як визнаний біженець ви НЕ зобов'язані відмовлятися від свого громадянства.",
            "alleenPad": "asiel"
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
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Переглянути: довгостроковий резидент ЄС (зберегти громадянство)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Докладніше про довгострокового резидента ЄС на ind.nl"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Довгостроковий резидент ЄС — постійне проживання без відмови від громадянства",
        "sub": "Постійна посвідка на проживання через 5 років. Ви зберігаєте своє громадянство. З 12 червня 2026 року для нових власників статусу це також обов'язковий проміжний крок на шляху до натуралізації (naturalisatie).",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Що це таке:</strong> ви можете проживати в Нідерландах безстроково та вільно працювати, а також легше переїжджати й працювати в інших країнах ЄС. Ваші роки притулку зараховуються до 5 років; роки навчання — на 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Вимога щодо доходу:</strong> вам потрібен достатній, стабільний власний дохід і медичне страхування. З допомогою це зазвичай не вдається. Якщо у вас дозвіл на проживання у зв'язку з притулком на певний строк (verblijfsvergunning asiel), вам потрібен статус довгострокового резидента ЄС (EU-langdurig ingezetene), щоб згодом пройти натуралізацію. Отже, вимога щодо доходу діє і для вашого шляху до нідерландського громадянства."
          },
          {
            "type": "info",
            "tekst": "✈️ Протягом 5 років ви не можете перебувати за межами Нідерландів довше ніж 6 місяців поспіль і не більше ніж 10 місяців загалом."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Коли це цікаво для вас?</strong> Якщо ви не хочете або не можете відмовитися від свого першого громадянства — для натуралізації це в принципі потрібно, а тут ні."
          },
          {
            "nr": 2,
            "tekst": "<strong>Дозвіл на притулок на певний строк?</strong> Тоді це єдиний шлях до постійної посвідки, а після неї — до натуралізації (naturalisatie)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Умови:</strong> 5 років поспіль законного проживання в Нідерландах, не надто довго за кордоном, достатній і стабільний власний дохід, медичне страхування та завершена громадянська інтеграція (inburgering) через маршрут B1, освітній маршрут або Z-маршрут."
          },
          {
            "nr": 4,
            "tekst": "<strong>Подання:</strong> до IND. Якщо ви подаєте на безстрокову посвідку, IND автоматично перевіряє, чи можете ви також отримати статус довгострокового резидента ЄС. З дозволом на притулок подати заяву можна лише на папері, не онлайн."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Докладніше про довгострокового резидента ЄС на ind.nl"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Є способи знизити витрати",
        "sub": "Натуралізація коштує €1.139 для однієї особи та €1.454 з партнером (тарифи 2026 року) — але є способи зробити це доступнішим.",
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
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Ви можете стати громадянином Нідерландів — у два кроки",
        "sub": "З дозволом на проживання у зв'язку з притулком на певний строк (verblijfsvergunning asiel) ви спершу маєте стати довгостроковим резидентом ЄС (EU-langdurig ingezetene). Після цього ви можете подати заяву на натуралізацію (naturalisatie).",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Дохід:</strong> IND перевіряє, чи достатній ваш дохід і чи він збережеться (трудовий договір має бути дійсним ще щонайменше 12 місяців). Ви лише недавно почали працювати або маєте тимчасовий договір? Тоді спершу попросіть перевірити, чи має ваша заява шанси."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>План уряду — ще не закон:</strong> власники статусу, які двічі отримали тимчасовий дозвіл на притулок і складуть нідерландську на рівні B1, могли б стати громадянами Нідерландів через 6 років, навіть без статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для тих, хто не може досягти B1, буде виняток. Законопроєкту ще немає. Доки такого закону немає, діють наведені вище правила."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Подайте до IND заяву на статус довгострокового резидента ЄС (EU-langdurig ingezetene).</strong> З дозволом на притулок це можливо лише на папері, не онлайн. Заява коштує € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Зберіть докази:</strong> трудовий договір і розрахункові листи, медичне страхування та диплом або рішення щодо інтеграції. У формі IND точно зазначено, що потрібно."
          },
          {
            "nr": 3,
            "tekst": "<strong>Тим часом вчасно подовжуйте свій дозвіл на притулок.</strong> Так ваше проживання залишиться безперервним."
          },
          {
            "nr": 4,
            "tekst": "<strong>Ви довгостроковий резидент ЄС? Тоді подайте заяву на натуралізацію (naturalisatie) у своєму муніципалітеті.</strong> Тоді діють звичайні умови: громадянська інтеграція (inburgering) для натуралізації, відсутність судимості та постійне проживання в Нідерландах. Як визнаний біженець ви зазвичай не мусите відмовлятися від свого громадянства."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Докладніше про довгострокового резидента ЄС на ind.nl"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Ви можете стати довгостроковим резидентом ЄС — для натуралізації потім потрібен ще один крок",
        "sub": "Із Z-маршрутом (Z-route) ви виконуєте вимогу громадянської інтеграції (inburgering) для статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для натуралізації (naturalisatie) цього недостатньо: для неї діють додаткові мовні вимоги.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Дохід:</strong> IND перевіряє, чи достатній ваш дохід і чи він збережеться (трудовий договір має бути дійсним ще щонайменше 12 місяців). Ви лише недавно почали працювати або маєте тимчасовий договір? Тоді спершу попросіть перевірити, чи має ваша заява шанси."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>План уряду — ще не закон:</strong> власники статусу, які двічі отримали тимчасовий дозвіл на притулок і складуть нідерландську на рівні B1, могли б стати громадянами Нідерландів через 6 років, навіть без статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для тих, хто не може досягти B1, буде виняток. Законопроєкту ще немає. Доки такого закону немає, діють наведені вище правила."
          }
        ],
        "padenTitel": "Після статусу довгострокового резидента ЄС: три шляхи до натуралізації через Z-маршрут",
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
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Подайте до IND заяву на статус довгострокового резидента ЄС (EU-langdurig ingezetene).</strong> З дозволом на притулок це можливо лише на папері, не онлайн. Заява коштує € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Зберіть докази:</strong> трудовий договір і розрахункові листи, медичне страхування та диплом або рішення щодо інтеграції. У формі IND точно зазначено, що потрібно."
          },
          {
            "nr": 3,
            "tekst": "<strong>Тим часом вчасно подовжуйте свій дозвіл на притулок.</strong> Так ваше проживання залишиться безперервним."
          },
          {
            "nr": 4,
            "tekst": "<strong>Ви довгостроковий резидент ЄС? Тоді оберіть один зі шляхів вище, а потім подайте заяву на натуралізацію (naturalisatie) у своєму муніципалітеті.</strong>"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Докладніше про довгострокового резидента ЄС на ind.nl"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "Спершу завершіть громадянську інтеграцію",
        "sub": "Ви живете в Нідерландах достатньо довго й маєте дохід. Бракує ще громадянської інтеграції (inburgering). Після цього ви можете подати заяву на статус довгострокового резидента ЄС (EU-langdurig ingezetene), а згодом — на натуралізацію (naturalisatie).",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 Маршрут B1 (B1-route), освітній маршрут (onderwijsroute) і Z-маршрут (Z-route) — усі три зараховуються для статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для натуралізації (naturalisatie) одного Z-маршруту недостатньо."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>План уряду — ще не закон:</strong> власники статусу, які двічі отримали тимчасовий дозвіл на притулок і складуть нідерландську на рівні B1, могли б стати громадянами Нідерландів через 6 років, навіть без статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для тих, хто не може досягти B1, буде виняток. Законопроєкту ще немає. Доки такого закону немає, діють наведені вище правила."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Завершіть свій маршрут інтеграції.</strong> Запитайте в муніципалітеті, скільки часу вам ще потрібно."
          },
          {
            "nr": 2,
            "tekst": "<strong>Зберігайте роботу й медичне страхування.</strong> Вони потрібні для заяви."
          },
          {
            "nr": 3,
            "tekst": "<strong>Вчасно подовжуйте дозвіл на притулок.</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>Пройдіть цю перевірку знову</strong>, коли завершите інтеграцію."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Що таке довгостроковий резидент ЄС?"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "Зараз перешкода — ваш дохід",
        "sub": "З дозволом на проживання у зв'язку з притулком на певний строк (verblijfsvergunning asiel) ви можете стати громадянином Нідерландів, лише якщо спершу станете довгостроковим резидентом ЄС (EU-langdurig ingezetene). Для цього потрібен достатній власний дохід. З допомогою це поки що не вдається. Чесно кажучи, це велика зміна.",
        "alternatieven": [
          {
            "naam": "Робота або більше годин",
            "tekst": "Робота або більше робочих годин можуть відкрити шлях. Подивіться в інструменті Loont werken, що вам дасть робота."
          },
          {
            "naam": "Ви можете залишитися",
            "tekst": "Ваш дозвіл на притулок залишається дійсним. Завжди вчасно подовжуйте його."
          },
          {
            "naam": "Завершіть інтеграцію",
            "tekst": "Громадянська інтеграція (inburgering) потрібна вам для статусу довгострокового резидента ЄС (EU-langdurig ingezetene) і для натуралізації (naturalisatie)."
          },
          {
            "naam": "Партнер або виняток?",
            "tekst": "Дохід вашого партнера може зараховуватися, якщо ви живете разом і ваш партнер — громадянин Нідерландів або має дозвіл на проживання. Виняток діє, якщо ви досягли пенсійного віку AOW (AOW-leeftijd) або якщо ви постійно й повністю непрацездатні та можете це довести."
          },
          {
            "naam": "План уряду (ще не закон)",
            "tekst": "Власники статусу, які двічі отримали тимчасовий дозвіл на притулок і складуть нідерландську на рівні B1, могли б стати громадянами Нідерландів через 6 років, навіть без статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для тих, хто не може досягти B1, буде виняток. Законопроєкту ще немає. Доки такого закону немає, діють наведені вище правила."
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ Порахуйте, що вам дасть робота"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "Можливо, ви були за кордоном занадто довго",
        "sub": "Для статусу довгострокового резидента ЄС (EU-langdurig ingezetene) ви не повинні були перебувати за межами Нідерландів довше ніж 6 місяців поспіль і більше ніж 10 місяців загалом. Через це відлік 5 років може початися заново.",
        "alternatieven": [
          {
            "naam": "Перерахуйте свої поїздки",
            "tekst": "Знайдіть дати своїх поїздок: штампи, квитки або вашу заяву на проїзний документ."
          },
          {
            "naam": "Попросіть перевірити",
            "tekst": "VluchtelingenWerk або ваш муніципалітет можуть разом із вами розрахувати, з якого моменту у вас знову буде 5 років."
          },
          {
            "naam": "Відтепер виїжджайте на коротший час",
            "tekst": "Плануйте довгі поїздки так, щоб не перевищувати ліміт."
          },
          {
            "naam": "План уряду (ще не закон)",
            "tekst": "Власники статусу, які двічі отримали тимчасовий дозвіл на притулок і складуть нідерландську на рівні B1, могли б стати громадянами Нідерландів через 6 років, навіть без статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для тих, хто не може досягти B1, буде виняток. Законопроєкту ще немає. Доки такого закону немає, діють наведені вище правила."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Докладніше про довгострокового резидента ЄС на ind.nl"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Ви ще недостатньо довго в Нідерландах",
        "sub": "З дозволом на проживання у зв'язку з притулком на певний строк (verblijfsvergunning asiel) ви спершу маєте прожити в Нідерландах 5 років. Після цього ви можете стати довгостроковим резидентом ЄС (EU-langdurig ingezetene), і лише тоді — громадянином Нідерландів. Час до того можна використати з користю.",
        "alternatieven": [
          {
            "naam": "Вчасно подовжуйте",
            "tekst": "Дозволи на притулок на певний строк дійсні максимум 3 роки; тому подовжуйте вчасно. Якщо виникне \"пробіл у проживанні\" (verblijfsgat) — період між двома дозволами, коли у вас немає дійсного дозволу — цей час не зараховується як законне проживання, і відлік 5 років для натуралізації може початися заново. Тому подавайте на подовження щонайпізніше протягом 4 тижнів після закінчення: тоді IND не вважатиме це пробілом."
          },
          {
            "naam": "Працюйте над доходом",
            "tekst": "Для статусу довгострокового резидента ЄС (EU-langdurig ingezetene) згодом вам знадобиться достатній власний дохід. Уже зараз шукайте роботу або більше годин."
          },
          {
            "naam": "Завершіть інтеграцію",
            "tekst": "Маршрут B1 (B1-route), освітній маршрут (onderwijsroute) і Z-маршрут (Z-route) зараховуються для статусу довгострокового резидента ЄС (EU-langdurig ingezetene)."
          },
          {
            "naam": "Не виїжджайте надовго",
            "tekst": "Не виїжджайте за кордон довше ніж на 6 місяців поспіль і не більше ніж на 10 місяців загалом."
          },
          {
            "naam": "План уряду (ще не закон)",
            "tekst": "Власники статусу, які двічі отримали тимчасовий дозвіл на притулок і складуть нідерландську на рівні B1, могли б стати громадянами Нідерландів через 6 років, навіть без статусу довгострокового резидента ЄС (EU-langdurig ingezetene). Для тих, хто не може досягти B1, буде виняток. Законопроєкту ще немає. Доки такого закону немає, діють наведені вище правила."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Що таке довгостроковий резидент ЄС?"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Спершу попросіть перевірити, який у вас дозвіл",
        "sub": "Ваш шлях до нідерландського громадянства залежить від вашого дозволу.",
        "alternatieven": [
          {
            "naam": "Безстроковий притулок",
            "tekst": "Ви можете пройти натуралізацію (naturalisatie), якщо відповідаєте іншим умовам."
          },
          {
            "naam": "Притулок на певний строк (3 або 5 років)",
            "tekst": "Спершу статус довгострокового резидента ЄС (EU-langdurig ingezetene), з вимогою щодо доходу, потім натуралізація (naturalisatie). Навіть якщо ви отримали дозвіл до 12 червня 2026 року."
          },
          {
            "naam": "Інший дозвіл",
            "tekst": "Для сім'ї, партнера або роботи: натуралізація зазвичай можлива після 5 років. Для навчання або іншого тимчасового перебування — поки що ні."
          },
          {
            "naam": "Хто може допомогти?",
            "tekst": "Ваш консультант у муніципалітеті або VluchtelingenWerk може разом із вами подивитися на вашу картку."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ Знайдіть відділення VluchtelingenWerk поблизу"
      }
    }
  },
  "FA": {
    "header": {
      "badge": "🇳🇱 بررسی تابعیت",
      "titel": "آیا واجد شرایط پاسپورت هلندی هستم؟",
      "sub": "به چند سؤال پاسخ دهید و ببینید آیا می‌توانید تابعیت هلند را بگیرید. بر اساس قوانین سال 2026، از جمله قوانین جدید پناهندگی از 12 جون 2026.",
      "disclaimer": "⚠️ این ابزار یک برآورد می‌دهد، نه یک تصمیم. بررسی‌شده در سپتمبر 2026 (IND، Stimulansz). از 12 جون 2026 دیگر اجازه اقامت پناهندگی با مدت نامعین وجود ندارد. به همین دلیل دارندگان اجازه اقامت پناهندگی با مدت معین (verblijfsvergunning asiel) باید اول مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) شوند، پیش از آنکه بتوانند تابعیت (naturalisatie) بگیرند. برنامه‌های اعلام‌شده دولت هنوز قانون نیست. همیشه از شهرداری یا VluchtelingenWerk مشوره بخواهید.",
      "vwnLabel": "در مورد وضعیت خود مطمئن نیستید؟",
      "vwnTekst": "قوانین تابعیت به سرعت تغییر می‌کنند و وضعیت شما ممکن است با آنچه این ابزار نشان می‌دهد متفاوت باشد. VluchtelingenWerk Nederland ساعات مشاوره رایگان و راهنمایی در زمینه تابعیت ارائه می‌دهد — محلی نزدیک به خود را در <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a> پیدا کنید.",
      "hulpRegulierLabel": "در مورد وضعیت خود مطمئن نیستید؟",
      "hulpRegulierTekst": "دفتر مشوره حقوقی (Juridisch Loket) در مورد اجازه اقامت شما و تابعیت (naturalisatie) مشوره رایگان می‌دهد. به <a href=\"https://www.juridischloket.nl\" target=\"_blank\" style=\"color:inherit;\">juridischloket.nl</a> سر بزنید یا از شهرداری خود بپرسید."
    },
    "ui": {
      "volgendeStappen": "مراحل بعدی",
      "watKunJeDoen": "چه کاری می‌توانید انجام دهید؟",
      "watKunJeNuDoen": "حالا چه کاری می‌توانید انجام دهید؟",
      "opnieuw": "↺ شروع دوباره",
      "laatChecken": "بخواهید وضعیت شما بررسی شود",
      "vraagLabel": "سؤال {n}",
      "jeKuntKiezen": "می‌توانید انتخاب کنید:",
      "ladenMislukt": "در بارگذاری این صفحه مشکلی پیش آمد. صفحه را تازه کنید یا بعداً دوباره تلاش کنید.",
      "driePaden": "سه مسیر به‌سوی تابعیت از طریق مسیر Z"
    },
    "vragen": {
      "v1": {
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
        "tekst": "چه نوع اقامتی در هلند دارید؟",
        "uitleg": "نوع اجازه اقامت، مسیر شما به‌سوی تابعیت هلند را تعیین می‌کند. شهروندان اتحادیه اروپا بر اساس قوانین اتحادیه اروپا در اینجا زندگی می‌کنند.",
        "antwoorden": [
          {
            "tekst": "اجازه اقامت پناهندگی دارم (دارنده وضعیت پناهندگی)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel",
            "pad": "asiel"
          },
          {
            "tekst": "اجازه اقامت دیگری دارم",
            "sub": "مثلاً برای خانواده، کار یا تحصیل",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v_regulier",
            "pad": "regulier"
          },
          {
            "tekst": "شهروند اتحادیه اروپا هستم",
            "sub": "یا شهروند منطقه اقتصادی اروپا/سوئیس",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "مطمئن نیستم",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "اکنون کدام اجازه اقامت پناهندگی را دارید؟",
        "uitleg": "به کارت اقامت خود نگاه کنید: آیا نوشته شده 'مدت نامعین' (onbepaalde tijd)، یا تاریخ پایان دارد؟",
        "antwoorden": [
          {
            "tekst": "پناهندگی با مدت نامعین",
            "sub": "روی کارت شما تاریخ پایانی برای حق اقامت‌تان نیست",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "پناهندگی با مدت معین",
            "sub": "3 یا 5 سال معتبر، حتی اگر آن را پیش از 12 جون 2026 گرفته باشید",
            "icoon": "📅",
            "klasse": "anders",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "من از قبل مقیم بلندمدت اتحادیه اروپا هستم",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "نمی‌دانم",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "اجازه اقامت شما معتبر می‌ماند — اما گرفتن تابعیت هلند از یک مرحله میانی می‌گذرد",
        "uitleg": "اجازه اقامت پناهندگی شما تا تاریخی که روی کارت‌تان نوشته شده معتبر می‌ماند. اما با اجازه اقامت پناهندگی با مدت معین (verblijfsvergunning asiel) نمی‌توانید درخواست تابعیت (naturalisatie) بدهید. این حتی اگر اجازه را پیش از 12 جون 2026 گرفته باشید هم صدق می‌کند. از 12 جون 2026 اجازه اقامت پناهندگی با مدت نامعین دیگر وجود ندارد.<br><br>به همین دلیل باید اول <strong>مقیم بلندمدت اتحادیه اروپا</strong> (EU-langdurig ingezetene) شوید. پس از آن می‌توانید درخواست تابعیت بدهید. سؤال‌های بعدی نشان می‌دهند که آیا این برای شما همین حالا ممکن است یا نه.",
        "antwoorden": [
          {
            "tekst": "فهمیدم — ادامه",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "e1"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "این‌طور می‌بینید که کدام اجازه اقامت را دارید",
        "uitleg": "به کارت اقامت خود، در قسمت 'Type document en bijzonderheden' (نوع سند و جزئیات: شماره نوع و متن کنار آن)، یا به نامه IND نگاه کنید. به دو چیز توجه کنید:<br><br>1. آیا نوشته شده <strong>پناهندگی</strong> (asiel) یا هدف دیگری (مانند خانواده یا کار)؟<br>2. آیا نوشته شده '<strong>مدت نامعین</strong>' (onbepaalde tijd)، یا <strong>تاریخ پایان</strong> دارد؟<br><br>نمی‌توانید بفهمید؟ از راهنمای خود در شهرداری یا از VluchtelingenWerk بپرسید.",
        "antwoorden": [
          {
            "tekst": "پیدا کردم — بازگشت به سؤال",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "نمی‌توانم این را بررسی کنم",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "v_regulier": {
        "tekst": "چه نوع اجازه اقامتی دارید؟",
        "uitleg": "برای تابعیت (naturalisatie) به اجازه اقامت با مدت نامعین نیاز دارید، یا به اجازه‌ای برای هدفی که موقت نیست، مانند زندگی با همسر یا کار. روی کارت اقامت شما هدف نوشته شده و اینکه تاریخ پایان دارد یا نه.",
        "antwoorden": [
          {
            "tekst": "با مدت نامعین",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "با مدت معین — برای خانواده، همسر یا کار",
            "icoon": "👨‍👩‍👧",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "با مدت معین — برای تحصیل یا اقامت موقت دیگر",
            "sub": "مثلاً کار فصلی، تداوی، برنامه تبادله یا سال جست‌وجوی کار برای افراد دارای تحصیلات عالی",
            "icoon": "🎓",
            "klasse": "nee",
            "volgende": "r_regulier_tijdelijk"
          },
          {
            "tekst": "نمی‌دانم",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "e1": {
        "tekst": "آیا 5 سال یا بیشتر به‌طور پیوسته با اجازه اقامت معتبر در هلند زندگی می‌کنید؟",
        "uitleg": "با یک اجازه اقامت پناهندگی با مدت معین (verblijfsvergunning asiel) فقط وقتی می‌توانید تابعیت هلند را بگیرید که اول مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) شده باشید. برای این کار باید دست‌کم 5 سال پیوسته با اجازه اقامت معتبر در هلند زندگی کرده باشید. سال‌های اجازه اقامت پناهندگی حساب می‌شوند. اینکه مدت روند پناهندگی حساب می‌شود یا نه، را IND تعیین می‌کند.",
        "antwoorden": [
          {
            "tekst": "بله، 5 سال یا بیشتر",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "نه، کمتر از 5 سال",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "آیا در این 5 سال مدت طولانی در خارج بوده‌اید؟",
        "uitleg": "برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) نباید بیش از 6 ماه پیاپی بیرون از هلند بوده باشید. در مجموع هم نباید بیش از 10 ماه باشد.",
        "antwoorden": [
          {
            "tekst": "نه، هرگز این‌قدر طولانی نبوده",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "بله، بیش از 6 ماه پیاپی، یا بیش از 10 ماه در مجموع",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "دقیق نمی‌دانم",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "آیا درآمد شخصی کافی برای زندگی دارید؟",
        "uitleg": "برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) باید درآمد شخصی کافی داشته باشید. این درآمد باید مستقل (نه از کمک‌هزینه دولتی) و پایدار (ادامه‌دار) باشد. به بیمه صحی هم نیاز دارید.",
        "antwoorden": [
          {
            "tekst": "بله، از کار یا کسب‌وکار خودم",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "بله، اما تازه شروع شده یا با قرارداد موقت",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "نه، کمک‌هزینه دولتی می‌گیرم یا درآمد شخصی ندارم",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "ادغام اجتماعی شما در چه وضعی است؟",
        "uitleg": "برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) باید شرط ادغام اجتماعی (inburgering) را برآورده کنید. این کار از طریق مسیر B1 (B1-route)، مسیر آموزشی (onderwijsroute) یا مسیر Z (Z-route) ممکن است.",
        "antwoorden": [
          {
            "tekst": "از طریق مسیر B1 یا مسیر آموزشی تمام کرده‌ام، یا معافیت دارم",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "از طریق مسیر Z تمام کرده‌ام",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "هنوز در حال انجام آن هستم",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "آیا اجازه اقامت شما اکنون معتبر است؟",
        "uitleg": "اجازه اقامت شما باید هنگام درخواست تابعیت (naturalisatie) معتبر باشد و تا زمان تصمیم معتبر بماند. همیشه آن را به‌موقع تمدید کنید تا اقامت شما بدون وقفه بماند.",
        "antwoorden": [
          {
            "tekst": "بله، اجازه اقامت من معتبر است",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v3"
          },
          {
            "tekst": "خیر، اجازه اقامت من منقضی شده یا اجازه اقامت ندارم",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_geen_vergunning"
          }
        ]
      },
      "v3": {
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
        "tekst": "مسیر Z را تکمیل کرده‌اید — یک قدم اضافی برای تابعیت لازم است",
        "uitleg": "مسیر Z با یک مصاحبه پایانی و یک گواهی به پایان می‌رسد، اما برای تابعیت، IND شرایط زبانی اضافی اعمال می‌کند. سه راه وجود دارد تا با این حال بتوانید تابعیت بگیرید:<br><br><strong>راه A — با این حال قبولی در آزمون در سطح A2</strong><br>همه آزمون‌های زبان را در سطح A2 (خواندن، شنیدن، نوشتن، صحبت‌کردن) و آزمون KNM را قبول شوید. توجه: اکنون که مسیر Z به پایان رسیده، تلاش‌های آزمون دیگر رایگان نیستند.<br><br><strong>راه B — 600 ساعت کلاس زبان + دست‌کم 3 بار تلاش برای هر بخش</strong><br>دست‌کم 600 ساعت کلاس سطح A2 در یک مؤسسه دارای گواهی Blik op Werk و 3 بار تلاش برای هر بخش؟ در این صورت DUO می‌تواند توصیه معافیت صادر کند.<br><br><strong>راه C — 600 ساعت سوادآموزی + آزمون DUO (€150)</strong><br>دست‌کم 600 ساعت سوادآموزی و مشخص شود که A2 دست‌یافتنی نیست؟ در این صورت معافیت از طریق آزمون DUO (€150) داده می‌شود.<br><br><em>احتمالاً در آینده:</em> دولت می‌خواهد شرط زبان برای تابعیت را از A2 به B1 افزایش دهد. این هنوز تصویب نشده است — در حال حاضر هنوز A2 اعمال می‌شود.<br><br>💡 با شهرداری خود مشورت کنید که کدام راه بهتر مناسب شماست.",
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
        "tekst": "آیا حاضرید از تابعیت فعلی خود صرف‌نظر کنید؟",
        "uitleg": "هلند معمولاً تابعیت مضاعف را اجازه نمی‌دهد. استثناهایی وجود دارد، مثلاً برای پناهندگان شناخته‌شده.",
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
            "volgende": "v8",
            "alleenPad": "asiel"
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
        "info": "💡 آیا پناهنده شناخته‌شده هستید؟ پس معمولاً لازم نیست از تابعیت اصلی خود صرف‌نظر کنید.",
        "infoAlleenPad": "asiel",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "اگر به حمایت نیاز دارید می‌توانید به IND درخواست پناهندگی بدهید.",
            "alleenPad": "asiel"
          },
          {
            "naam": "مجوز معمولی",
            "tekst": "برای کار، تحصیل یا بازیابی خانواده مجوزهای معمولی وجود دارد."
          },
          {
            "naam": "کمک حقوقی",
            "tekst": "با یک وکیل یا دفتر مشوره حقوقی (Juridisch Loket) تماس بگیرید."
          },
          {
            "naam": "VluchtelingenWerk",
            "tekst": "پشتیبانی حقوقی رایگان برای پناهجویان و دارندگان وضعیت.",
            "alleenPad": "asiel"
          }
        ],
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ کمک از طریق Juridisch Loket"
      },
      "r_te_kort": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "هنوز به‌اندازه کافی در هلند زندگی نکرده‌اید",
        "sub": "باید دست‌کم 5 سال پیوسته در هلند زندگی کنید. می‌توانید از دوران انتظار به‌خوبی استفاده کنید.",
        "alternatieven": [
          {
            "naam": "اجازه خود را به‌موقع تمدید کنید",
            "tekst": "اگر دوره‌ای بدون اجازه اقامت معتبر پیش بیاید — یک \"شکاف اقامت\" (verblijfsgat) — آن زمان حساب نمی‌شود. در این صورت شمارش 5 سال ممکن است از نو آغاز شود. بنابراین درخواست تمدید را به‌موقع ارائه دهید، حداکثر تا 4 هفته پس از انقضا: در این صورت IND آن را شکاف اقامت تلقی نمی‌کند."
          },
          {
            "naam": "مدت تابعیت: احتمالاً 10 سال",
            "tekst": "توجه: این مربوط به دوران انتظار پیش از تابعیت‌گرفتن است، نه به اجازه اقامت شما. دولت می‌خواهد این مدت تابعیت را از 5 به 10 سال افزایش دهد. هنوز تصویب نشده، اما در نظر داشته باشید. با همسر هلندی ممکن است مدت کوتاه‌تر باشد — از شهرداری بپرسید."
          },
          {
            "naam": "جایگزین: مقیم بلندمدت اتحادیه اروپا",
            "tekst": "مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) پس از 5 سال حق اقامت دائمی می‌دهد و تابعیت خود را حفظ می‌کنید. <strong>اما برای آن شرط درآمد وجود دارد.</strong>"
          },
          {
            "naam": "ادغام را کامل کنید",
            "tekst": "از دوران انتظار برای قبولی در آزمون ادغام استفاده کنید — یک شرط سختگیرانه برای تابعیت."
          },
          {
            "naam": "مدارک را جمع‌آوری کنید",
            "tekst": "از پیش مدارک رسمی را از کشور مبدأ درخواست کنید و روی زبان هلندی خود کار کنید، مثلاً از طریق یک دوره زبان در مؤسسه‌ای دارای گواهی Blik op Werk."
          },
          {
            "naam": "برنامه دولت (هنوز قانون نیست)",
            "tekst": "دارندگان وضعیت پناهندگی که دو بار اجازه اقامت پناهندگی موقت گرفته‌اند و زبان هلندی را در سطح B1 قبول شوند، ممکن است پس از 6 سال تابعیت هلند را بگیرند، حتی بدون مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene). برای کسانی که نمی‌توانند به B1 برسند یک استثنا در نظر گرفته می‌شود. هنوز هیچ لایحه قانونی وجود ندارد. تا زمانی که آن قانون تصویب نشده، قوانین بالا اعتبار دارند.",
            "alleenPad": "asiel"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ببینید: مقیم بلندمدت اتحادیه اروپا (اقامت دائم پس از 5 سال)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ اطلاعات بیشتر در ind.nl"
      },
      "r_regulier_tijdelijk": {
        "type": "wacht",
        "icoon": "🎓",
        "titel": "با این اجازه اقامت هنوز نمی‌توانید تابعیت هلند را بگیرید",
        "sub": "برای تابعیت (naturalisatie) به اجازه اقامت با مدت نامعین نیاز دارید، یا به اجازه‌ای برای هدفی که موقت نیست. اجازه اقامت برای تحصیل یا اقامت موقت دیگر حساب نمی‌شود.",
        "alternatieven": [
          {
            "naam": "وضعیت شما تغییر می‌کند؟",
            "tekst": "مثلاً می‌خواهید کار کنید، یا با همسر خود زندگی کنید؟ در این صورت می‌توانید اجازه اقامت دیگری درخواست کنید. پس از آن این بررسی را دوباره انجام دهید."
          },
          {
            "naam": "اقامت شما چگونه حساب می‌شود؟",
            "tekst": "اینکه سال‌ها با اجازه اقامت فعلی شما برای آن 5 سال حساب می‌شوند یا نه، به وضعیت شما بستگی دارد. بگذارید این را بررسی کنند."
          },
          {
            "naam": "از همین حالا روی زبان هلندی کار کنید",
            "tekst": "برای تابعیت (naturalisatie) باید بعداً دوره ادغام (inburgering) را تمام کرده باشید. یک دوره زبان همین حالا کمک می‌کند."
          }
        ],
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ اطلاعات بیشتر در ind.nl"
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ اطلاعات بیشتر در ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "تابعیت از طریق مسیر Z — تفاوت مهم",
        "padenTitel": "سه مسیر به‌سوی تابعیت از طریق مسیر Z",
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
            "tekst": "حداقل ۶۰۰ ساعت آموزش زبانی سطح A2 در مؤسسه‌ای با گواهی Blik op Werk و حداقل ۳ تلاش برای هر بخش (از جمله حداقل 1 آزمون A2)؟ DUO می‌تواند بدون قبولی در آزمون توصیه معافیت صادر کند."
          },
          {
            "nr": "C",
            "titel": "۶۰۰ ساعت سوادآموزی یا آموزش زبانی + آزمون DUO (بدون ظرفیت یادگیری) — ۱۵۰ یورو",
            "tekst": "حداقل ۶۰۰ ساعت سوادآموزی در مؤسسه‌ای با گواهی Blik op Werk و آزمون DUO نشان می‌دهد A2 قابل دستیابی نیست؟ معافیت داده می‌شود. آزمون DUO ۱۵۰ یورو هزینه دارد."
          }
        ],
        "info": "📞 <strong>مشاوره:</strong> با شهرداری در مورد بهترین مسیر برای وضعیت‌تان مشورت کنید.",
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ کمک از طریق Juridisch Loket"
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
            "tekst": "کمک حقوقی رایگان برای دارندگان وضعیت.",
            "alleenPad": "asiel"
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
        "link": "https://www.juridischloket.nl",
        "linkTekst": "→ کمک از طریق Juridisch Loket"
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
            "tekst": "در صورت شک: با یک مشاور حقوقی یا دفتر مشوره حقوقی (Juridisch Loket) مشورت کنید."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "tekst": "به‌عنوان پناهنده شناخته‌شده، مجبور به چشم‌پوشی از تابعیت خود نیستید.",
            "alleenPad": "asiel"
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
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ببینید: مقیم بلندمدت اتحادیه اروپا (حفظ تابعیت)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ درباره مقیم بلندمدت اتحادیه اروپا در ind.nl بیشتر بخوانید"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "مقیم بلندمدت اتحادیه اروپا — اقامت دائم بدون چشم‌پوشی از تابعیت",
        "sub": "یک اجازه اقامت دائمی پس از 5 سال. تابعیت خود را حفظ می‌کنید. از 12 جون 2026 این برای دارندگان جدید وضعیت پناهندگی گام میانی اجباری در راه تابعیت (naturalisatie) نیز هست.",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>چیست:</strong> می‌توانید به‌طور نامحدود در هلند زندگی و آزادانه کار کنید، و آسان‌تر به کشورهای دیگر اتحادیه اروپا نقل‌مکان کرده و کار کنید. سال‌های پناهندگی شما برای 5 سال محسوب می‌شوند؛ سال‌های تحصیل 50% محسوب می‌شوند."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>شرط درآمد:</strong> باید درآمد شخصی کافی و پایدار و بیمه صحی داشته باشید. با کمک‌هزینه دولتی معمولاً ممکن نیست. اگر یک اجازه اقامت پناهندگی با مدت معین (verblijfsvergunning asiel) دارید، برای اینکه بعداً بتوانید تابعیت بگیرید به مقیم بلندمدت اتحادیه اروپا نیاز دارید. پس شرط درآمد برای راه شما به‌سوی تابعیت هلند هم اعتبار دارد."
          },
          {
            "type": "info",
            "tekst": "✈️ در این 5 سال نباید بیش از 6 ماه پیاپی و بیش از 10 ماه در مجموع بیرون از هلند باشید."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>چه زمانی برای شما جالب است؟</strong> اگر نمی‌خواهید یا نمی‌توانید از تابعیت اول خود چشم‌پوشی کنید — برای تابعیت اصولاً باید این کار را کرد، اما اینجا خیر."
          },
          {
            "nr": 2,
            "tekst": "<strong>اجازه اقامت پناهندگی با مدت معین؟</strong> پس این تنها راه به‌سوی اجازه اقامت دائمی و پس از آن به‌سوی تابعیت (naturalisatie) است."
          },
          {
            "nr": 3,
            "tekst": "<strong>شرایط:</strong> 5 سال اقامت قانونی پیوسته در هلند، اقامت نه‌چندان طولانی در خارج، درآمد شخصی کافی و پایدار، بیمه صحی، و ادغام اجتماعی (inburgering) تکمیل‌شده از طریق مسیر B1، مسیر آموزشی یا مسیر Z."
          },
          {
            "nr": 4,
            "tekst": "<strong>درخواست:</strong> در IND. اگر برای یک اجازه نامعین درخواست دهید، IND به‌طور خودکار بررسی می‌کند که آیا می‌توانید وضعیت مقیم بلندمدت اتحادیه اروپا را هم بگیرید. با اجازه اقامت پناهندگی فقط به‌صورت کاغذی می‌توانید درخواست دهید، نه آنلاین."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ درباره مقیم بلندمدت اتحادیه اروپا در ind.nl بیشتر بخوانید"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "راه‌هایی برای کاهش هزینه‌ها وجود دارد",
        "sub": "هزینه تابعیت €1.139 برای یک نفر و €1.454 با همسر است (تعرفه 2026) — اما راه‌هایی برای مقرون‌به‌صرفه‌کردن آن وجود دارد.",
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
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "می‌توانید تابعیت هلند را بگیرید — در دو گام",
        "sub": "با یک اجازه اقامت پناهندگی با مدت معین (verblijfsvergunning asiel) باید اول مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) شوید. پس از آن می‌توانید درخواست تابعیت (naturalisatie) بدهید.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>درآمد:</strong> IND بررسی می‌کند که آیا درآمد شما کافی است و آیا ادامه دارد (قرارداد کار باید دست‌کم 12 ماه دیگر معتبر باشد). تازه کار پیدا کرده‌اید یا قرارداد موقت دارید؟ پس اول بخواهید بررسی شود که آیا درخواست شما شانس دارد."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>برنامه دولت — هنوز قانون نیست:</strong> دارندگان وضعیت پناهندگی که دو بار اجازه اقامت پناهندگی موقت گرفته‌اند و زبان هلندی را در سطح B1 قبول شوند، ممکن است پس از 6 سال تابعیت هلند را بگیرند، حتی بدون مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene). برای کسانی که نمی‌توانند به B1 برسند یک استثنا در نظر گرفته می‌شود. هنوز هیچ لایحه قانونی وجود ندارد. تا زمانی که آن قانون تصویب نشده، قوانین بالا اعتبار دارند."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>درخواست مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) را به IND بدهید.</strong> با اجازه اقامت پناهندگی این کار فقط به‌صورت کاغذی ممکن است، نه آنلاین. هزینه درخواست € 254 است."
          },
          {
            "nr": 2,
            "tekst": "<strong>مدارک جمع کنید:</strong> قرارداد کار و فیش‌های معاش، بیمه صحی، و دیپلم یا تصمیم ادغام اجتماعی. فورم IND دقیقاً می‌گوید چه چیزی لازم است."
          },
          {
            "nr": 3,
            "tekst": "<strong>در این فاصله اجازه اقامت پناهندگی خود را به‌موقع تمدید کنید.</strong> این‌طور اقامت شما بدون وقفه می‌ماند."
          },
          {
            "nr": 4,
            "tekst": "<strong>مقیم بلندمدت اتحادیه اروپا شده‌اید؟ پس درخواست تابعیت (naturalisatie) را در شهرداری خود بدهید.</strong> آنگاه شرایط معمول اعتبار دارند: ادغام اجتماعی (inburgering) برای تابعیت، نداشتن سابقه کیفری، و زندگی دائمی در هلند. به‌عنوان پناهنده به‌رسمیت‌شناخته‌شده معمولاً لازم نیست از تابعیت خود صرف‌نظر کنید."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ درباره مقیم بلندمدت اتحادیه اروپا در ind.nl بیشتر بخوانید"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "می‌توانید مقیم بلندمدت اتحادیه اروپا شوید — برای تابعیت پس از آن یک گام اضافی لازم است",
        "sub": "با مسیر Z (Z-route) شرط ادغام اجتماعی (inburgering) را برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) برآورده می‌کنید. برای تابعیت (naturalisatie) این کافی نیست: برای آن شرایط زبانی اضافی وجود دارد.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>درآمد:</strong> IND بررسی می‌کند که آیا درآمد شما کافی است و آیا ادامه دارد (قرارداد کار باید دست‌کم 12 ماه دیگر معتبر باشد). تازه کار پیدا کرده‌اید یا قرارداد موقت دارید؟ پس اول بخواهید بررسی شود که آیا درخواست شما شانس دارد."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>برنامه دولت — هنوز قانون نیست:</strong> دارندگان وضعیت پناهندگی که دو بار اجازه اقامت پناهندگی موقت گرفته‌اند و زبان هلندی را در سطح B1 قبول شوند، ممکن است پس از 6 سال تابعیت هلند را بگیرند، حتی بدون مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene). برای کسانی که نمی‌توانند به B1 برسند یک استثنا در نظر گرفته می‌شود. هنوز هیچ لایحه قانونی وجود ندارد. تا زمانی که آن قانون تصویب نشده، قوانین بالا اعتبار دارند."
          }
        ],
        "padenTitel": "پس از مقیم بلندمدت اتحادیه اروپا: سه مسیر به‌سوی تابعیت از طریق مسیر Z",
        "paden": [
          {
            "nr": "A",
            "titel": "قبولی در آزمون ادغام در سطح A2",
            "tekst": "تمام آزمون‌های زبانی در سطح A2 (خواندن، شنیدن، نوشتن، صحبت کردن) و آزمون KNM را قبول شوید. پس از قبولی مدرک DUO دارید و شرط ادغام برای تابعیت را برآورده می‌کنید."
          },
          {
            "nr": "B",
            "titel": "۶۰۰ ساعت آموزش زبانی (A2) + حداقل ۳ تلاش برای هر بخش آزمون",
            "tekst": "حداقل ۶۰۰ ساعت آموزش زبانی سطح A2 در مؤسسه‌ای با گواهی Blik op Werk و حداقل ۳ تلاش برای هر بخش (از جمله حداقل 1 آزمون A2)؟ DUO می‌تواند بدون قبولی در آزمون توصیه معافیت صادر کند."
          },
          {
            "nr": "C",
            "titel": "۶۰۰ ساعت سوادآموزی یا آموزش زبانی + آزمون DUO (بدون ظرفیت یادگیری) — ۱۵۰ یورو",
            "tekst": "حداقل ۶۰۰ ساعت سوادآموزی در مؤسسه‌ای با گواهی Blik op Werk و آزمون DUO نشان می‌دهد A2 قابل دستیابی نیست؟ معافیت داده می‌شود. آزمون DUO ۱۵۰ یورو هزینه دارد."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>درخواست مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) را به IND بدهید.</strong> با اجازه اقامت پناهندگی این کار فقط به‌صورت کاغذی ممکن است، نه آنلاین. هزینه درخواست € 254 است."
          },
          {
            "nr": 2,
            "tekst": "<strong>مدارک جمع کنید:</strong> قرارداد کار و فیش‌های معاش، بیمه صحی، و دیپلم یا تصمیم ادغام اجتماعی. فورم IND دقیقاً می‌گوید چه چیزی لازم است."
          },
          {
            "nr": 3,
            "tekst": "<strong>در این فاصله اجازه اقامت پناهندگی خود را به‌موقع تمدید کنید.</strong> این‌طور اقامت شما بدون وقفه می‌ماند."
          },
          {
            "nr": 4,
            "tekst": "<strong>مقیم بلندمدت اتحادیه اروپا شده‌اید؟ پس یکی از مسیرهای بالا را انتخاب کنید و پس از آن درخواست تابعیت (naturalisatie) را در شهرداری خود بدهید.</strong>"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ درباره مقیم بلندمدت اتحادیه اروپا در ind.nl بیشتر بخوانید"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "اول ادغام اجتماعی خود را تمام کنید",
        "sub": "شما به اندازه کافی در هلند زندگی کرده‌اید و درآمد دارید. چیزی که هنوز کم است، ادغام اجتماعی (inburgering) شماست. پس از آن می‌توانید درخواست مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) بدهید، و بعداً درخواست تابعیت (naturalisatie).",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 مسیر B1 (B1-route)، مسیر آموزشی (onderwijsroute) و مسیر Z (Z-route) هر سه برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) حساب می‌شوند. برای تابعیت (naturalisatie) مسیر Z به‌تنهایی کافی نیست."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>برنامه دولت — هنوز قانون نیست:</strong> دارندگان وضعیت پناهندگی که دو بار اجازه اقامت پناهندگی موقت گرفته‌اند و زبان هلندی را در سطح B1 قبول شوند، ممکن است پس از 6 سال تابعیت هلند را بگیرند، حتی بدون مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene). برای کسانی که نمی‌توانند به B1 برسند یک استثنا در نظر گرفته می‌شود. هنوز هیچ لایحه قانونی وجود ندارد. تا زمانی که آن قانون تصویب نشده، قوانین بالا اعتبار دارند."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>مسیر ادغام اجتماعی خود را تمام کنید.</strong> از شهرداری بپرسید هنوز چقدر وقت لازم دارید."
          },
          {
            "nr": 2,
            "tekst": "<strong>کار و بیمه صحی خود را حفظ کنید.</strong> برای درخواست به آن‌ها نیاز دارید."
          },
          {
            "nr": 3,
            "tekst": "<strong>اجازه اقامت پناهندگی خود را به‌موقع تمدید کنید.</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>این بررسی را دوباره انجام دهید</strong>، وقتی ادغام اجتماعی شما تمام شد."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 مقیم بلندمدت اتحادیه اروپا چیست؟"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "اکنون درآمد شما مانع است",
        "sub": "با اجازه اقامت پناهندگی با مدت معین (verblijfsvergunning asiel) فقط وقتی می‌توانید تابعیت هلند را بگیرید که اول مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) شوید. برای این کار به درآمد شخصی کافی نیاز دارید. با کمک‌هزینه دولتی این فعلاً هنوز ممکن نیست. صادقانه بگوییم، این یک تغییر بزرگ است.",
        "alternatieven": [
          {
            "naam": "کار یا ساعت‌های بیشتر",
            "tekst": "یک شغل، یا کار کردن در ساعت‌های بیشتر، می‌تواند راه را باز کند. با ابزار Loont werken ببینید کار کردن برای شما چه سودی دارد."
          },
          {
            "naam": "می‌توانید بمانید",
            "tekst": "اجازه اقامت پناهندگی شما همچنان معتبر می‌ماند. همیشه آن را به‌موقع تمدید کنید."
          },
          {
            "naam": "ادغام اجتماعی را تمام کنید",
            "tekst": "ادغام اجتماعی (inburgering) را برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) و برای تابعیت (naturalisatie) لازم دارید."
          },
          {
            "naam": "همسر یا استثنا؟",
            "tekst": "درآمد همسر شما می‌تواند حساب شود، اگر با هم زندگی می‌کنید و همسرتان تابعیت هلند یا اجازه اقامت دارد. استثنا وقتی اعتبار دارد که به سن تقاعد دولتی (AOW-leeftijd) رسیده باشید، یا به‌طور دائمی و کامل از کار افتاده باشید و بتوانید آن را ثابت کنید."
          },
          {
            "naam": "برنامه دولت (هنوز قانون نیست)",
            "tekst": "دارندگان وضعیت پناهندگی که دو بار اجازه اقامت پناهندگی موقت گرفته‌اند و زبان هلندی را در سطح B1 قبول شوند، ممکن است پس از 6 سال تابعیت هلند را بگیرند، حتی بدون مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene). برای کسانی که نمی‌توانند به B1 برسند یک استثنا در نظر گرفته می‌شود. هنوز هیچ لایحه قانونی وجود ندارد. تا زمانی که آن قانون تصویب نشده، قوانین بالا اعتبار دارند."
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ حساب کنید کار کردن برای شما چه سودی دارد"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "شاید مدت خیلی طولانی در خارج بوده‌اید",
        "sub": "برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) نباید بیش از 6 ماه پیاپی و بیش از 10 ماه در مجموع بیرون از هلند بوده باشید. به همین دلیل ممکن است شمارش 5 سال از نو آغاز شود.",
        "alternatieven": [
          {
            "naam": "سفرهای خود را بشمارید",
            "tekst": "تاریخ‌های سفرهای خود را پیدا کنید: مهرها، تکت‌ها یا درخواست سند سفر خود."
          },
          {
            "naam": "بخواهید بررسی شود",
            "tekst": "VluchtelingenWerk یا شهرداری شما می‌تواند با شما حساب کند که از چه زمانی دوباره 5 سال خواهید داشت."
          },
          {
            "naam": "از این به بعد کوتاه‌تر بیرون بمانید",
            "tekst": "سفرهای طولانی را طوری برنامه‌ریزی کنید که زیر حد مجاز بمانید."
          },
          {
            "naam": "برنامه دولت (هنوز قانون نیست)",
            "tekst": "دارندگان وضعیت پناهندگی که دو بار اجازه اقامت پناهندگی موقت گرفته‌اند و زبان هلندی را در سطح B1 قبول شوند، ممکن است پس از 6 سال تابعیت هلند را بگیرند، حتی بدون مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene). برای کسانی که نمی‌توانند به B1 برسند یک استثنا در نظر گرفته می‌شود. هنوز هیچ لایحه قانونی وجود ندارد. تا زمانی که آن قانون تصویب نشده، قوانین بالا اعتبار دارند."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ درباره مقیم بلندمدت اتحادیه اروپا در ind.nl بیشتر بخوانید"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "هنوز به‌اندازه کافی در هلند زندگی نکرده‌اید",
        "sub": "با یک اجازه اقامت پناهندگی با مدت معین (verblijfsvergunning asiel) باید اول 5 سال در هلند زندگی کنید. پس از آن می‌توانید مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) شوید، و فقط آن وقت تابعیت هلند را بگیرید. می‌توانید از زمان تا آن موقع به‌خوبی استفاده کنید.",
        "alternatieven": [
          {
            "naam": "به‌موقع تمدید کنید",
            "tekst": "اجازه‌های پناهندگی با مدت معین حداکثر 3 سال معتبرند؛ بنابراین به‌موقع تمدید کنید. اگر یک \"شکاف اقامت\" (verblijfsgat) ایجاد شود — دوره‌ای بین دو اجازه که در آن اجازه معتبری ندارید — آن زمان به‌عنوان اقامت قانونی محسوب نمی‌شود و شمارش 5 ساله برای تابعیت ممکن است از نو آغاز شود. بنابراین درخواست تمدید را حداکثر تا 4 هفته پس از انقضا ارائه دهید: در این صورت IND آن را شکاف اقامت تلقی نمی‌کند."
          },
          {
            "naam": "روی درآمد خود کار کنید",
            "tekst": "برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) بعداً به درآمد شخصی کافی نیاز دارید. از همین حالا برای یک شغل یا ساعت‌های بیشتر تلاش کنید."
          },
          {
            "naam": "ادغام اجتماعی را تمام کنید",
            "tekst": "مسیر B1 (B1-route)، مسیر آموزشی (onderwijsroute) و مسیر Z (Z-route) برای مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene) حساب می‌شوند."
          },
          {
            "naam": "زیاد بیرون نمانید",
            "tekst": "بیش از 6 ماه پیاپی و بیش از 10 ماه در مجموع به خارج نروید."
          },
          {
            "naam": "برنامه دولت (هنوز قانون نیست)",
            "tekst": "دارندگان وضعیت پناهندگی که دو بار اجازه اقامت پناهندگی موقت گرفته‌اند و زبان هلندی را در سطح B1 قبول شوند، ممکن است پس از 6 سال تابعیت هلند را بگیرند، حتی بدون مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene). برای کسانی که نمی‌توانند به B1 برسند یک استثنا در نظر گرفته می‌شود. هنوز هیچ لایحه قانونی وجود ندارد. تا زمانی که آن قانون تصویب نشده، قوانین بالا اعتبار دارند."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 مقیم بلندمدت اتحادیه اروپا چیست؟"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "اول بخواهید بررسی شود که کدام اجازه اقامت را دارید",
        "sub": "مسیر شما به‌سوی تابعیت هلند به اجازه اقامت شما بستگی دارد.",
        "alternatieven": [
          {
            "naam": "پناهندگی با مدت نامعین",
            "tekst": "اگر شرایط دیگر را داشته باشید، می‌توانید تابعیت (naturalisatie) بگیرید."
          },
          {
            "naam": "پناهندگی با مدت معین (3 یا 5 سال)",
            "tekst": "اول مقیم بلندمدت اتحادیه اروپا (EU-langdurig ingezetene)، با شرط درآمد، سپس تابعیت (naturalisatie). حتی اگر اجازه را پیش از 12 جون 2026 گرفته باشید."
          },
          {
            "naam": "اجازه اقامت دیگر",
            "tekst": "برای خانواده، همسر یا کار: تابعیت معمولاً پس از 5 سال ممکن است. برای تحصیل یا اقامت موقت دیگر هنوز نه."
          },
          {
            "naam": "چه کسی می‌تواند کمک کند؟",
            "tekst": "راهنمای شما در شهرداری یا VluchtelingenWerk می‌تواند همراه شما کارت اقامت‌تان را بررسی کند."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ یک دفتر VluchtelingenWerk نزدیک خود پیدا کنید"
      }
    }
  },
  "TI": {
    "header": {
      "badge": "🇳🇱 መርመራ ዜጋነት",
      "titel": "ንናይ ሆላንድ ፓስፖርት ዝምልከት መሰል ኣለኒ ድዩ?",
      "sub": "ንቕሩብ ሕቶታት መልሲ ሃብ፡ ሆላንዳዊ ዜጋ ክትከውን ትኽእል እንተኾንካ ድማ ርአ። ኣብ ሕግታት 2026 ተመርኲሱ፡ ካብ 12 ሰነ 2026 ጀሚሮም ዘለዉ ሓደስቲ ሕግታት ዑቕባ እውን ሓዊሱ።",
      "disclaimer": "⚠️ እዚ መርመራ ኣንፈት ጥራይ ይህብ፡ ውሳነ ኣይኮነን። ኣብ መስከረም 2026 ተመርሚሩ (IND፡ Stimulansz)። ካብ 12 ሰነ 2026 ጀሚሩ ናይ ዘይውሱን ግዜ ናይ ዑቕባ ፍቓድ የለን። ስለዚ ሓደስቲ ዋናታት ዑቕባ ዜግነት (naturalisatie) ቅድሚ ምሕታቶም ፈለማ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ክኾኑ ኣለዎም። መንግስቲ ዝኣወጆም ውጥናት ገና ሕጊ ኣይኮነን። ኩሉ ግዜ ካብ ምምሕዳር ወይ VluchtelingenWerk ምኽሪ ሕተት።",
      "vwnLabel": "ብዛዕባ ኩነታትካ/ኪ ርግጽ ዘይኮንካ/ኪ?",
      "vwnTekst": "ናይ ዜግነት ሕግታት ቀልጢፈን ይቕየራ፡ ኩነታትካ/ኪ ካብ ዘርኢ ዘሎ ፍልይ ክብል ይኽእል። VluchtelingenWerk Nederland ብናጻ ናይ ምኽሪ ሰዓታትን ናብ ዜግነት ምቕራብ ሓገዝን ይህብ — ኣብ <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a> ቀረባ ቦታ ድለዩ።"
    },
    "ui": {
      "volgendeStappen": "ዝቕጽል ስጉምትታት",
      "watKunJeDoen": "እንታይ ክትገብር ትኽእል?",
      "watKunJeNuDoen": "ሕጂ እንታይ ክትገብር ትኽእል?",
      "opnieuw": "↺ ብሓድሽ ጀምር",
      "laatChecken": "ኩነታትካ ከም ዝምርመር ግበር",
      "vraagLabel": "ሕቶ {n}",
      "jeKuntKiezen": "ክትመርጽ ትኽእል፦",
      "ladenMislukt": "እዚ ገጽ ክጽዓን ከሎ ጸገም ኣጋጢሙ። እቲ ገጽ ኣሐድሶ ወይ ደሓር ደጊምካ ፈትን።",
      "driePaden": "ካብ Z-መስርሕ ናብ ዜግነት ዝወስዱ ሰለስተ መንገድታት"
    },
    "vragen": {
      "v1": {
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
        "tekst": "ኣብ ሆላንድ እንታይ ዓይነት መንበሪ ኣለካ?",
        "uitleg": "ዓይነት ፍቓድካ ናብ ሆላንዳዊ ዜግነት ዘሎ መንገድካ ይውስን። ዜጋታት ኤውሮጳ ሕብረት ኣብዚ ብሕጊ ኤውሮጳ ሕብረት ይነብሩ።",
        "antwoorden": [
          {
            "tekst": "ናይ ዑቕባ መንበሪ ፍቓድ ኣለኒ (ዋና ዑቕባ)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel"
          },
          {
            "tekst": "ካልእ መንበሪ ፍቓድ ኣለኒ",
            "sub": "ንኣብነት ንስድራ፡ ንስራሕ ወይ ንትምህርቲ",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "ዜጋ ኤውሮጳ ሕብረት እየ",
            "sub": "ወይ ዜጋ ቁጠባዊ ዞባ ኤውሮጳ/ስዊዘርላንድ",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "ርግጸኛ ኣይኮንኩን",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "ሕጂ ኣየናይ ናይ ዑቕባ ፍቓድ ኣለካ?",
        "uitleg": "ካብ 12 ሰነ 2026 ጀሚሩ ሕግታት ተቐይሮም። ንዜግነት (naturalisatie) ነቲ ናይ ሕጂ ፍቓድካ መዓስ ከም ዝረኸብካዮ ኣገዳሲ እዩ።",
        "antwoorden": [
          {
            "tekst": "ናይ ዘይውሱን ግዜ ዑቕባ",
            "sub": "ቅድሚ 12 ሰነ 2026 ዝተረኽበ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "ናይ 5 ዓመት ዑቕባ፡ ቅድሚ 12 ሰነ 2026 ዝተረኽበ",
            "icoon": "📅",
            "klasse": "ja",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "ኣብ 12 ሰነ 2026 ወይ ድሕሪኡ ዝተረኽበ ወይ ዝተሓደሰ ዑቕባ",
            "sub": "መብዛሕትኡ ግዜ ን3 ዓመት ዝጸንሕ",
            "icoon": "🆕",
            "klasse": "anders",
            "volgende": "e1"
          },
          {
            "tekst": "ድሮ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ እየ",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "ኣይፈልጥን",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "ጽቡቕ ዜና፡ ፍቓድካ ኣብ ትሕቲ ናይ ቀደም ሕግታት እዩ",
        "uitleg": "ናይ 5 ዓመት ናይ ዑቕባ ፍቓድካ ቅድሚ 12 ሰነ 2026 ረኺብካዮ። በዚ ገና ብናይ ቀደም መንገዲ ዜግነት (naturalisatie) ክትሓትት ትኽእል።<br><br>⚠️ <strong>ኣስተውዕል፡</strong> IND ፍቓድካ ድሕሪ 12 ሰነ 2026 እንተሓዲሱዎ፡ ብሓደስቲ ሕግታት ዝተዋህበ ፍቓድ ክትረክብ ኢኻ። ሽዑ ፈለማ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ክትከውን ኣለካ። <strong>ነቲ ቅድመ-ኩነታት ተማልእ ዶ? እምበኣር እታ ናይ ሕጂ ካርድካ ገና ቅብልቲ ከላ ዜግነት ሕተት።</strong>",
        "antwoorden": [
          {
            "tekst": "ተረዲኡኒ — ቀጽል",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v2"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "ኣየናይ ፍቓድ ከም ዘለካ ከምዚ ትፈልጦ",
        "uitleg": "ኣብ ካርድ መንበሪኻ፡ ኣብቲ 'Type document en bijzonderheden' ዝብል ቦታ (ዓይነት ሰነድን ፍሉይ ሓበሬታን፦ ቁጽሪ ዓይነትን ኣብ ጎኑ ዘሎ ጽሑፍን)፡ ወይ ኣብ ደብዳበ IND ርአ። ንኽልተ ነገራት ኣስተውዕል፦<br><br>1. <strong>ዑቕባ</strong> (asiel) ድዩ ተጻሒፉ ወይስ ካልእ ዕላማ (ከም ስድራ ወይ ስራሕ)?<br>2. ነዛ ካርድ መዓስ ረኺብካያ፦ <strong>ቅድሚ 12 ሰነ 2026 ድዩ ወይስ ድሕሪኡ</strong>? ክሳዕ መዓስከ ቅብልቲ እያ?<br><br>ክትፈልጦ ኣይከኣልካን? ንሓጋዚኻ ኣብ ምምሕዳር ወይ ን VluchtelingenWerk ሕተት።",
        "antwoorden": [
          {
            "tekst": "ረኺበዮ — ናብቲ ሕቶ ተመለስ",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "ክፈልጦ ኣይክእልን",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "e1": {
        "tekst": "ኣብ ሆላንድ ብቕቡል ፍቓድ 5 ዓመት ወይ ልዕሊኡ ከይተቛረጽካ ትነብር ዶ?",
        "uitleg": "ብሓድሽ ናይ ዑቕባ መንበሪ ፍቓድ (verblijfsvergunning asiel) ሆላንዳዊ ዜጋ ክትከውን ትኽእል ፈለማ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ምስ ኮንካ ጥራይ እዩ። ንዑ ድማ እንተወሓደ 5 ዓመት ከይተቛረጽካ ብቕቡል ፍቓድ ኣብ ሆላንድ ክትነብር ኣለካ። ምስ ናይ ዑቕባ ፍቓድ ዝሓለፉ ዓመታት ይቑጸሩ። እቲ ኣብ መስርሕ ዑቕባ ዝሓለፈ ግዜ ይቑጸር ድዩ ኣይቑጸርን፡ IND ይውስኖ።",
        "antwoorden": [
          {
            "tekst": "እወ፡ 5 ዓመት ወይ ልዕሊኡ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "ኣይፋል፡ ካብ 5 ዓመት ዝሓጸረ",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "ኣብዘን 5 ዓመታት ንነዊሕ ግዜ ኣብ ወጻኢ ሃገር ነይርካ ዶ?",
        "uitleg": "ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ካብ 6 ኣዋርሕ ንላዕሊ ብተኸታታሊ ካብ ሆላንድ ወጻኢ ክትኸውን የብልካን። ብድምር ድማ ካብ 10 ኣዋርሕ ክበዝሕ የብሉን።",
        "antwoorden": [
          {
            "tekst": "ኣይፋል፡ ፈጺመ ክንድኡ ኣይነውሐን",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "እወ፡ ካብ 6 ኣዋርሕ ንላዕሊ ብተኸታታሊ፡ ወይ ብድምር ካብ 10 ኣዋርሕ ንላዕሊ",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "ብልክዕ ኣይፈልጦን",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "ንምንባር ዝኣክል ናይ ገዛእ ርእስኻ እቶት ኣለካ ዶ?",
        "uitleg": "ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ዝኣክል ናይ ገዛእ ርእስኻ እቶት ክህልወካ ኣለዎ። እዚ እቶት ናጻ (ካብ ማሕበራዊ ሓገዝ ዘይኮነ) ከምኡ እውን ቀጻሊ (ዝቕጽል) ክኸውን ኣለዎ። ናይ ጥዕና ውሕስነት እውን የድልየካ።",
        "antwoorden": [
          {
            "tekst": "እወ፡ ካብ ስራሕ ወይ ካብ ናይ ገዛእ ርእሰይ ንግዲ",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "እወ፡ ግን ሕጂ ጀሚረ ወይ ብግዝያዊ ውዕል",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "ኣይፋል፡ ማሕበራዊ ሓገዝ እወስድ ወይ ናይ ገዛእ ርእሰይ እቶት የብለይን",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "ምውህሃድካ ኣበየናይ ደረጃ በጺሑ?",
        "uitleg": "ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ነቲ ናይ ምውህሃድ ጠለብ (inburgering) ከተማልእ ኣለካ። እዚ ብB1 መስርሕ (B1-route)፡ ብናይ ትምህርቲ መስርሕ (onderwijsroute) ወይ ብZ-መስርሕ (Z-route) ይከኣል።",
        "antwoorden": [
          {
            "tekst": "ብB1 መስርሕ ወይ ብናይ ትምህርቲ መስርሕ ወዲአ፡ ወይ ናጻ ተገይረ",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "ብZ-መስርሕ ወዲአ",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "ገና ኣብ መስርሕ እየ",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "ሕጋዊ ፍቓደ-ምቕማጥ ኣለካ/ኺ ድዩ?",
        "uitleg": "ግዝያዊ ዘይኮነ ቅቡል መንበሪ ፍቓድ የድልየካ። ንኣብነት ናይ ዘይውሱን ግዜ ፍቓድ፡ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene)፡ ወይ ቅድሚ 12 ሰነ 2026 ዝተዋህበ ናይ ዑቕባ ፍቓድ። መንበሪኻ ከይተቛረጸ ምእንቲ ክቕጽል፡ ፍቓድካ ኩሉ ግዜ ብግዜኡ ኣሕድስ።",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "naam": "ናይ ዑቕባ ፍቓድካ ቀልጢፉ ድዩ ዝውዳእ?",
            "tekst": "ቅድሚ 12 ሰነ 2026 ዝተዋህበ ናይ 5 ዓመት ናይ ዑቕባ መንበሪ ፍቓድ (verblijfsvergunning asiel) ኣለካ ዶ፡ ኣብ ሆላንድ 5 ዓመት ቅድሚ ምምላእካ ድማ ይውዳእ ዶ? ሽዑ ኣብ ምሕዳስ ብሓደስቲ ሕግታት ዝተዋህበ ፍቓድ ክትረክብ ኢኻ። ሽዑ መንገድካ ብናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ይሓልፍ፡ ንዑ ድማ ናይ እቶት ጠለብ ኣሎ።"
          },
          {
            "naam": "ናይ ዜግነት ግዜ: ምናልባት 10 ዓመት",
            "tekst": "ኣቓልቦ: እዚ ቅድሚ ዜግነት ምርካብ ዘሎ ናይ ምጽባይ ግዜ እዩ ዝምልከት፡ ናይ መንበሪ ፍቓድካ ኣይኮነን። መንግስቲ ነዚ ናይ ዜግነት ግዜ ካብ 5 ናብ 10 ዓመት ከናውሖ ይደሊ። ገና ኣይጸደቐን፡ ግን ኣብ ግምት ኣእቱ። ምስ ሆላንዳዊ መጻምድቲ እቲ ግዜ ክሓጽር ይኽእል — ንምምሕዳር ሕተት።"
          },
          {
            "naam": "ኣማራጺ: ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ",
            "tekst": "ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ድሕሪ 5 ዓመት ቀዋሚ መሰል መንበሪ ይህበካ፡ ዜግነትካ ድማ ትሕዞ። <strong>ግን ንዑ ናይ እቶት ጠለብ ኣሎ።</strong>"
          },
          {
            "naam": "ምውህሃድ ወድእ",
            "tekst": "ነቲ ናይ ምጽባይ ግዜ ናይ ምውህሃድ ፈተናኻ ንምሕላፍ ተጠቐመሉ — ንዜግነት ጽኑዕ ቅድመ-ኩነት እዩ።"
          },
          {
            "naam": "ሰነዳት ኣክብ",
            "tekst": "ካብ ሃገር መበቆልካ ወግዓዊ ሰነዳት ኣቐዲምካ ሕተት፡ ሆላንድኛኻ ድማ ኣመሓይሽ፡ ንኣብነት ኣብ Blik op Werk ምስክርነት ዘለዎ ትካል ብናይ ቋንቋ ኮርስ።"
          },
          {
            "naam": "ውጥን መንግስቲ (ገና ሕጊ ኣይኮነን)",
            "tekst": "ክልተ ግዜ ግዝያዊ ናይ ዑቕባ ፍቓድ ዝረኸቡን ሆላንድኛ ብደረጃ B1 ዝሓለፉን ዋናታት ዑቕባ፡ ብዘይ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) እውን ድሕሪ 6 ዓመት ሆላንዳውያን ዜጋታት ክኾኑ ምኽኣሉ። ን B1 ክበጽሑ ዘይክእሉ ፍሉይ ኩነታት ክህሉ እዩ። ገና ረቂቕ ሕጊ የለን። እቲ ሕጊ ክሳዕ ዝወጽእ፡ እቶም ኣብ ላዕሊ ዘለዉ ሕግታት ይሰርሑ።"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ርአ: ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (ድሕሪ 5 ዓመት ቀዋሚ መንበሪ)"
        },
        "link": "https://ind.nl/en/asylum-and-family-reunification-the-migration-pact-and-other-developments/new-laws-and-regulations-for-asylum-and-family-reunification",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ ኣብ ind.nl ዝያዳ ሓበሬታ"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "ካብ Z-መስርሕ ዜጋነት — ኣዚዩ ዘገምደ ፍልልይ",
        "padenTitel": "ካብ Z-መስመር ናብ ዜግነት ዝወስዱ ሰለስተ መንገድታት",
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
            "tekst": "ቅናት 600 ሰዓት A2 ናይ ቋንቋ ትምህርቲ ኣብ Blik op Werk ምስ ዝተቐበለ ትካልን ነናብ ክፍሊ 3 ፈቲናታት (እንተወሓደ 1 ናይ A2 ፈተና ሓዊሱ)? DUO ናጻነት ምኽሪ ክህብ ይኽእሎ — ፈተና ዘይሓለፍካ/ዊ ምስ ትኸውን/ኢ እውን።"
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ርአ: ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (ዜግነት ምሓዝ)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ ብዛዕባ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኣብ ind.nl ዝያዳ ኣንብብ"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ — ዜግነትካ ከይሓደግካ ብቐዋምነት ምንባር",
        "sub": "ድሕሪ 5 ዓመት ቀዋሚ መንበሪ ፍቓድ። ዜግነትካ ትሕዞ። ካብ 12 ሰነ 2026 ጀሚሩ ንሓደስቲ ዋናታት ዑቕባ ናብ ዜግነት (naturalisatie) ዝወስድ ግዴታዊ ማእከላይ ስጉምቲ እውን እዩ።",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>እንታይ እዩ:</strong> ኣብ ሆላንድ ብዘይ ገደብ ክትነብርን ብናጻ ክትሰርሕን ትኽእል፡ ናብ ካልኦት ናይ ኤውሮጳ ሕብረት ሃገራት ድማ ብቐሊሉ ክትግዕዝን ክትሰርሕን ትኽእል። ናይ ዑቕባ ዓመታትካ ነቶም 5 ዓመት ይቑጸሩ፤ ናይ ትምህርቲ ዓመታት 50% ይቑጸሩ።"
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>ናይ እቶት ጠለብ፦</strong> ዝኣክልን ቀጻልን ናይ ገዛእ ርእስኻ እቶትን ናይ ጥዕና ውሕስነትን ክህልወካ ኣለዎ። ብማሕበራዊ ሓገዝ መብዛሕትኡ ግዜ ኣይከኣልን። ኣስተውዕል፦ ድሕሪ 12 ሰነ 2026 ዝተዋህበ ሓድሽ ናይ ዑቕባ መንበሪ ፍቓድ (verblijfsvergunning asiel) እንተሃልዩካ፡ ደሓር ዜግነት ክትሓትት ምእንቲ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) የድልየካ። ስለዚ ናይ እቶት ጠለብ ነቲ ናብ ሆላንዳዊ ዜግነት ዘሎ መንገድካ እውን ይምልከት።"
          },
          {
            "type": "info",
            "tekst": "✈️ ኣብተን 5 ዓመታት ካብ 6 ኣዋርሕ ንላዕሊ ብተኸታታሊ፡ ብድምር ድማ ካብ 10 ኣዋርሕ ንላዕሊ ካብ ሆላንድ ወጻኢ ክትኸውን የብልካን።"
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>መዓስ ንዓኻ ኣገዳሲ እዩ?</strong> ካብ ቀዳማይ ዜግነትካ ክትሓድግ እንተዘይደሊኻ ወይ ዘይከኣልካ — ንዜግነት ብመትከል የድሊ፡ ኣብዚ ግን ኣየድልን።"
          },
          {
            "nr": 2,
            "tekst": "<strong>ሓድሽ ናይ ዑቕባ ፍቓድ?</strong> እምበኣር እዚ ናብ ቀዋሚ ፍቓድ፡ ድሕሪኡ ድማ ናብ ዜግነት (naturalisatie) ዝወስድ እንኮ መንገዲ እዩ።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ቅድመ-ኩነታት፦</strong> 5 ዓመት ከይተቛረጸ ሕጋዊ መንበሪ ኣብ ሆላንድ፡ ንነዊሕ ግዜ ኣብ ወጻኢ ዘይምጽናሕ፡ ዝኣክልን ቀጻልን ናይ ገዛእ ርእስኻ እቶት፡ ናይ ጥዕና ውሕስነት፡ ከምኡ እውን ብB1 መስርሕ፡ ብናይ ትምህርቲ መስርሕ ወይ ብZ-መስርሕ ዝተዛዘመ ምውህሃድ (inburgering)።"
          },
          {
            "nr": 4,
            "tekst": "<strong>ምልክታ:</strong> ኣብ IND። ንዘይውሱን ግዜ ፍቓድ ምልክታ እንተኣእቲኻ፡ IND ብኣውቶማቲክ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኩነታት ክትረክብ ትኽእል ምዃንካ ይምርምር። ብናይ ዑቕባ ፍቓድ ብወረቐት ጥራይ ክትሓትት ትኽእል፡ ብኦንላይን ኣይኮነን።"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ ብዛዕባ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኣብ ind.nl ዝያዳ ኣንብብ"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "ዋጋ ናብ ምቕናሱ ዝምልከት ኣፍደጊ ኣለዉ",
        "sub": "ዜግነት ንሓደ ሰብ €1.139፡ ምስ መጻምድቲ ድማ €1.454 ይኽፈሎ (ዋጋ 2026) — ግን ነዚ ተኽእሎ ዘለዎ ንምግባር መንገድታት ኣለዉ።",
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
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "ሆላንዳዊ ዜጋ ክትከውን ትኽእል — ብኽልተ ስጉምትታት",
        "sub": "ብሓድሽ ናይ ዑቕባ መንበሪ ፍቓድ (verblijfsvergunning asiel) ፈለማ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ክትከውን ኣለካ። ድሕሪኡ ዜግነት (naturalisatie) ክትሓትት ትኽእል።",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>እቶት፦</strong> IND እቶትካ ዝኣክል ምዃኑን ዝቕጽል ምዃኑን ይምርምር (ናይ ስራሕ ውዕል እንተወሓደ ን12 ወርሒ ገና ቅቡል ክኸውን ኣለዎ)። ሕጂ ጥራይ ስራሕ ጀሚርካ ድዩ ወይስ ግዝያዊ ውዕል ኣለካ? ሽዑ ፈለማ ሕቶኻ ዕድል ከም ዘለዎ ከም ዝምርመር ግበር።"
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>ውጥን መንግስቲ — ገና ሕጊ ኣይኮነን፦</strong> ክልተ ግዜ ግዝያዊ ናይ ዑቕባ ፍቓድ ዝረኸቡን ሆላንድኛ ብደረጃ B1 ዝሓለፉን ዋናታት ዑቕባ፡ ብዘይ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) እውን ድሕሪ 6 ዓመት ሆላንዳውያን ዜጋታት ክኾኑ ምኽኣሉ። ን B1 ክበጽሑ ዘይክእሉ ፍሉይ ኩነታት ክህሉ እዩ። ገና ረቂቕ ሕጊ የለን። እቲ ሕጊ ክሳዕ ዝወጽእ፡ እቶም ኣብ ላዕሊ ዘለዉ ሕግታት ይሰርሑ።"
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ኣብ IND ሕተት።</strong> ብናይ ዑቕባ ፍቓድ እዚ ብወረቐት ጥራይ ይከኣል፡ ብኦንላይን ኣይኮነን። እቲ ሕቶ € 254 ይኽፈሎ።"
          },
          {
            "nr": 2,
            "tekst": "<strong>መረጋገጺ ኣኪብ፦</strong> ናይ ስራሕ ውዕልካን ናይ ደሞዝ ወረቐታትካን፡ ናይ ጥዕና ውሕስነትካ፡ ከምኡ እውን ዲፕሎማ ወይ ውሳነ ምውህሃድካ። እቲ ፎርም IND እንታይ ከም ዘድሊ ብልክዕ ይነግረካ።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ኣብዚ እዋን ናይ ዑቕባ ፍቓድካ ብግዜኡ ኣሕድስ።</strong> ከምዚ ጌርካ መንበሪኻ ከይተቛረጸ ይቕጽል።"
          },
          {
            "nr": 4,
            "tekst": "<strong>ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኮይንካ ዶ? እምበኣር ኣብ ምምሕዳርካ ዜግነት (naturalisatie) ሕተት።</strong> ሽዑ እቶም ልሙዳት ቅድመ-ኩነታት ይሰርሑ፦ ንዜግነት ዝኸውን ምውህሃድ (inburgering)፡ ገበናዊ መዝገብ ዘይምህላው፡ ከምኡ እውን ብቐዋምነት ኣብ ሆላንድ ምንባር። ከም ኣፍልጦ ዝተዋህቦ ስደተኛ መብዛሕትኡ ግዜ ዜግነትካ ክትሓድግ ኣየድልየካን።"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ ብዛዕባ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኣብ ind.nl ዝያዳ ኣንብብ"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ክትከውን ትኽእል — ንዜግነት ድሕሪኡ ተወሳኺ ስጉምቲ የድሊ",
        "sub": "ብZ-መስርሕ (Z-route) ነቲ ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ዘድሊ ናይ ምውህሃድ ጠለብ (inburgering) ተማልእ። ንዜግነት (naturalisatie) እዚ እኹል ኣይኮነን፦ ንዑ ተወሰኽቲ ናይ ቋንቋ ጠለባት ኣለዉ።",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>እቶት፦</strong> IND እቶትካ ዝኣክል ምዃኑን ዝቕጽል ምዃኑን ይምርምር (ናይ ስራሕ ውዕል እንተወሓደ ን12 ወርሒ ገና ቅቡል ክኸውን ኣለዎ)። ሕጂ ጥራይ ስራሕ ጀሚርካ ድዩ ወይስ ግዝያዊ ውዕል ኣለካ? ሽዑ ፈለማ ሕቶኻ ዕድል ከም ዘለዎ ከም ዝምርመር ግበር።"
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>ውጥን መንግስቲ — ገና ሕጊ ኣይኮነን፦</strong> ክልተ ግዜ ግዝያዊ ናይ ዑቕባ ፍቓድ ዝረኸቡን ሆላንድኛ ብደረጃ B1 ዝሓለፉን ዋናታት ዑቕባ፡ ብዘይ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) እውን ድሕሪ 6 ዓመት ሆላንዳውያን ዜጋታት ክኾኑ ምኽኣሉ። ን B1 ክበጽሑ ዘይክእሉ ፍሉይ ኩነታት ክህሉ እዩ። ገና ረቂቕ ሕጊ የለን። እቲ ሕጊ ክሳዕ ዝወጽእ፡ እቶም ኣብ ላዕሊ ዘለዉ ሕግታት ይሰርሑ።"
          }
        ],
        "padenTitel": "ድሕሪ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ፦ ካብ Z-መስርሕ ናብ ዜግነት ዝወስዱ ሰለስተ መንገድታት",
        "paden": [
          {
            "nr": "A",
            "titel": "ናይ ምውህሃድ ፈተና ኣብ A2 ደርጃ ምሕላፍ",
            "tekst": "ኩሎም ናይ ቋንቋ ፈተናታት ኣብ A2 (ምንባብ፡ ምስማዕ፡ ምጽሓፍ፡ ምዝራብ) ምስ KNM ፈተና ሓሊፎ/ፊ። ምስ ሓለፍካ/ዊ DUO ዲፕሎማ ኣለካ/ኺ ናይ ዜጋነት ናይ ምውህሃድ ጠለብ ትማልእ/እ።"
          },
          {
            "nr": "B",
            "titel": "600 ሰዓት ናይ ቋንቋ ትምህርቲ (A2) + ነናብ ፈተና ክፍሊ 3 ፈቲናታት",
            "tekst": "ቅናት 600 ሰዓት A2 ናይ ቋንቋ ትምህርቲ ኣብ Blik op Werk ምስ ዝተቐበለ ትካልን ነናብ ክፍሊ 3 ፈቲናታት (እንተወሓደ 1 ናይ A2 ፈተና ሓዊሱ)? DUO ናጻነት ምኽሪ ክህብ ይኽእሎ — ፈተና ዘይሓለፍካ/ዊ ምስ ትኸውን/ኢ እውን።"
          },
          {
            "nr": "C",
            "titel": "600 ሰዓት ምምሃር / ናይ ቋንቋ ትምህርቲ + DUO ፈተና (150 ዩሮ)",
            "tekst": "ቅናት 600 ሰዓት ምምሃር ኣብ Blik op Werk ምስ ዝተቐበለ ትካል ምስ DUO ፈተና A2 ዘይክስሕ ምዃኑ ምስ ዘርኢ — ናጻነት ይወሃብ። DUO ፈተና €150 ዋጋ ኣለዎ።"
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ኣብ IND ሕተት።</strong> ብናይ ዑቕባ ፍቓድ እዚ ብወረቐት ጥራይ ይከኣል፡ ብኦንላይን ኣይኮነን። እቲ ሕቶ € 254 ይኽፈሎ።"
          },
          {
            "nr": 2,
            "tekst": "<strong>መረጋገጺ ኣኪብ፦</strong> ናይ ስራሕ ውዕልካን ናይ ደሞዝ ወረቐታትካን፡ ናይ ጥዕና ውሕስነትካ፡ ከምኡ እውን ዲፕሎማ ወይ ውሳነ ምውህሃድካ። እቲ ፎርም IND እንታይ ከም ዘድሊ ብልክዕ ይነግረካ።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ኣብዚ እዋን ናይ ዑቕባ ፍቓድካ ብግዜኡ ኣሕድስ።</strong> ከምዚ ጌርካ መንበሪኻ ከይተቛረጸ ይቕጽል።"
          },
          {
            "nr": 4,
            "tekst": "<strong>ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኮይንካ ዶ? እምበኣር ሓደ ካብቶም ኣብ ላዕሊ ዘለዉ መንገድታት ምረጽ፡ ድሕሪኡ ኣብ ምምሕዳርካ ዜግነት (naturalisatie) ሕተት።</strong>"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ ብዛዕባ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኣብ ind.nl ዝያዳ ኣንብብ"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "ፈለማ ምውህሃድካ ወድእ",
        "sub": "ኣብ ሆላንድ እኹል ግዜ ነቢርካ፡ እቶት እውን ኣለካ። ገና ዝጎደለ ምውህሃድካ (inburgering) እዩ። ድሕሪኡ ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ክትሓትት ትኽእል፡ ደሓር ድማ ዜግነት (naturalisatie)።",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 B1 መስርሕ (B1-route)፡ ናይ ትምህርቲ መስርሕ (onderwijsroute) ከምኡ እውን Z-መስርሕ (Z-route) ሰለስቲኦም ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ይቑጸሩ። ንዜግነት (naturalisatie) ግን Z-መስርሕ ጥራይ እኹል ኣይኮነን።"
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>ውጥን መንግስቲ — ገና ሕጊ ኣይኮነን፦</strong> ክልተ ግዜ ግዝያዊ ናይ ዑቕባ ፍቓድ ዝረኸቡን ሆላንድኛ ብደረጃ B1 ዝሓለፉን ዋናታት ዑቕባ፡ ብዘይ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) እውን ድሕሪ 6 ዓመት ሆላንዳውያን ዜጋታት ክኾኑ ምኽኣሉ። ን B1 ክበጽሑ ዘይክእሉ ፍሉይ ኩነታት ክህሉ እዩ። ገና ረቂቕ ሕጊ የለን። እቲ ሕጊ ክሳዕ ዝወጽእ፡ እቶም ኣብ ላዕሊ ዘለዉ ሕግታት ይሰርሑ።"
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>መስርሕ ምውህሃድካ ወድእ።</strong> ክንደይ ግዜ ገና ከም ዘድልየካ ንምምሕዳርካ ሕተት።"
          },
          {
            "nr": 2,
            "tekst": "<strong>ስራሕካን ናይ ጥዕና ውሕስነትካን ሓሉ።</strong> ንሕቶኻ የድልዩኻ እዮም።"
          },
          {
            "nr": 3,
            "tekst": "<strong>ናይ ዑቕባ ፍቓድካ ብግዜኡ ኣሕድስ።</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>ነዚ መርመራ ደጊምካ ግበሮ</strong>፡ ምውህሃድካ ምስ ተዛዘመ።"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ እንታይ እዩ?"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "ሕጂ እቲ ዕንቅፋት እቶትካ እዩ",
        "sub": "ድሕሪ 12 ሰነ 2026 ብዝተዋህበ ናይ ዑቕባ መንበሪ ፍቓድ (verblijfsvergunning asiel) ሆላንዳዊ ዜጋ ክትከውን ትኽእል ፈለማ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) እንተኮንካ ጥራይ እዩ። ንዑ ዝኣክል ናይ ገዛእ ርእስኻ እቶት የድልየካ። ብማሕበራዊ ሓገዝ ሕጂ እዚ ኣይከኣልን። ብቕንዕና፡ እዚ ዓቢ ለውጢ እዩ።",
        "alternatieven": [
          {
            "naam": "ስራሕ ወይ ዝያዳ ሰዓታት",
            "tekst": "ስራሕ፡ ወይ ዝያዳ ሰዓታት ምስራሕ፡ ነቲ መንገዲ ክኸፍቶ ይኽእል። ብመሳርሒ Loont werken ስራሕ እንታይ ከም ዘምጽኣልካ ርአ።"
          },
          {
            "naam": "ክትጸንሕ ትኽእል",
            "tekst": "ናይ ዑቕባ ፍቓድካ ቅቡል ኮይኑ ይቕጽል። ኩሉ ግዜ ብግዜኡ ኣሕድሶ።"
          },
          {
            "naam": "ምውህሃድካ ወድእ",
            "tekst": "ምውህሃድ (inburgering) ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ከምኡ እውን ንዜግነት (naturalisatie) የድልየካ።"
          },
          {
            "naam": "መጻምድቲ ወይ ፍሉይ ኩነታት?",
            "tekst": "ሓቢርኩም እንተነበርኩም፡ መጻምድትኻ ድማ ሆላንዳዊ ዜጋ እንተኾይኑ ወይ መንበሪ ፍቓድ እንተሃልይዎ፡ እቶት መጻምድትኻ ክቑጸር ይኽእል። ዕድመ ጡረታ AOW (AOW-leeftijd) እንተበጺሕካ፡ ወይ ብቐዋምን ምሉእን ክትሰርሕ ዘይትኽእል እንተኾንካን ከተረጋግጾ እንተኽኢልካን ፍሉይ ኩነታት ኣሎ።"
          },
          {
            "naam": "ውጥን መንግስቲ (ገና ሕጊ ኣይኮነን)",
            "tekst": "ክልተ ግዜ ግዝያዊ ናይ ዑቕባ ፍቓድ ዝረኸቡን ሆላንድኛ ብደረጃ B1 ዝሓለፉን ዋናታት ዑቕባ፡ ብዘይ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) እውን ድሕሪ 6 ዓመት ሆላንዳውያን ዜጋታት ክኾኑ ምኽኣሉ። ን B1 ክበጽሑ ዘይክእሉ ፍሉይ ኩነታት ክህሉ እዩ። ገና ረቂቕ ሕጊ የለን። እቲ ሕጊ ክሳዕ ዝወጽእ፡ እቶም ኣብ ላዕሊ ዘለዉ ሕግታት ይሰርሑ።"
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ ስራሕ እንታይ ከም ዘምጽኣልካ ሕሰብ"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "ምናልባት ንነዊሕ ግዜ ኣብ ወጻኢ ሃገር ጸኒሕካ ትኸውን",
        "sub": "ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ካብ 6 ኣዋርሕ ንላዕሊ ብተኸታታሊ ከምኡ እውን ብድምር ካብ 10 ኣዋርሕ ንላዕሊ ካብ ሆላንድ ወጻኢ ክትኸውን የብልካን። ስለዚ እተን 5 ዓመታት ካብ ብሓድሽ ክቑጸራ ይኽእላ እየን።",
        "alternatieven": [
          {
            "naam": "ጉዕዞታትካ ቍጸር",
            "tekst": "ዕለታት ጉዕዞታትካ ድለ፦ ማሕተማት፡ ቲኬታት ወይ ናይ ጉዕዞ ሰነድ ሕቶኻ።"
          },
          {
            "naam": "ከም ዝምርመር ግበር",
            "tekst": "VluchtelingenWerk ወይ ምምሕዳርካ ካብ መዓስ ጀሚርካ ደጊምካ 5 ዓመት ከም ዝህልወካ ምሳኻ ክሓስቡ ይኽእሉ።"
          },
          {
            "naam": "ካብ ሕጂ ንደሓር ንሓጺር ግዜ ጥራይ ውጻእ",
            "tekst": "ነዊሕ ጉዕዞታት ካብቲ ደረት ከይሓለፍካ ክትተርፍ ጌርካ ኣዳልዎም።"
          },
          {
            "naam": "ውጥን መንግስቲ (ገና ሕጊ ኣይኮነን)",
            "tekst": "ክልተ ግዜ ግዝያዊ ናይ ዑቕባ ፍቓድ ዝረኸቡን ሆላንድኛ ብደረጃ B1 ዝሓለፉን ዋናታት ዑቕባ፡ ብዘይ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) እውን ድሕሪ 6 ዓመት ሆላንዳውያን ዜጋታት ክኾኑ ምኽኣሉ። ን B1 ክበጽሑ ዘይክእሉ ፍሉይ ኩነታት ክህሉ እዩ። ገና ረቂቕ ሕጊ የለን። እቲ ሕጊ ክሳዕ ዝወጽእ፡ እቶም ኣብ ላዕሊ ዘለዉ ሕግታት ይሰርሑ።"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ ብዛዕባ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ ኣብ ind.nl ዝያዳ ኣንብብ"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "ገና እኹል ግዜ ኣብ ሆላንድ ኣይተቐመጥካን",
        "sub": "ብሓድሽ ናይ ዑቕባ መንበሪ ፍቓድ (verblijfsvergunning asiel) ፈለማ 5 ዓመት ኣብ ሆላንድ ክትነብር ኣለካ። ድሕሪኡ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ክትከውን ትኽእል፡ ሽዑ ጥራይ ድማ ሆላንዳዊ ዜጋ። ነቲ ክሳብ ሽዑ ዘሎ ግዜ ጽቡቕ ጌርካ ክትጥቀመሉ ትኽእል።",
        "alternatieven": [
          {
            "naam": "ብግዜኡ ኣሕድስ",
            "tekst": "ሓደስቲ ናይ ዑቕባ ፍቓዳት ዝለዓለ 3 ዓመት ይጸንሑ፤ ስለዚ ብግዜኡ ኣሕድስ። ኣብ መንጎ ክልተ ፍቓዳት ቅቡል ፍቓድ ዘይብልካ \"ናይ መንበሪ ጋግ\" (verblijfsgat) እንተተፈጢሩ — እቲ ግዜ ከም ሕጋዊ መንበሪ ኣይቑጸርን፡ እቲ ናይ 5 ዓመት ቆጸራ ንዜግነት ድማ ካብ ብሓድሽ ክጅምር ይኽእል። ስለዚ ናይ ምሕዳስ ምልክታ ድሕሪ ምውዳቕ ኣብ ውሽጢ 4 ሰሙን ኣብጽሕ: ሽዑ IND ከም ናይ መንበሪ ጋግ ኣይርእዮን።"
          },
          {
            "naam": "ኣብ እቶትካ ስራሕ",
            "tekst": "ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ደሓር ዝኣክል ናይ ገዛእ ርእስኻ እቶት ከድልየካ እዩ። ካብ ሕጂ ጀሚርካ ንስራሕ ወይ ንዝያዳ ሰዓታት ጽዓር።"
          },
          {
            "naam": "ምውህሃድካ ወድእ",
            "tekst": "B1 መስርሕ (B1-route)፡ ናይ ትምህርቲ መስርሕ (onderwijsroute) ከምኡ እውን Z-መስርሕ (Z-route) ንናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) ይቑጸሩ።"
          },
          {
            "naam": "ንነዊሕ ግዜ ኣይትጽናሕ",
            "tekst": "ካብ 6 ኣዋርሕ ንላዕሊ ብተኸታታሊ፡ ብድምር ድማ ካብ 10 ኣዋርሕ ንላዕሊ ናብ ወጻኢ ሃገር ኣይትኺድ።"
          },
          {
            "naam": "ውጥን መንግስቲ (ገና ሕጊ ኣይኮነን)",
            "tekst": "ክልተ ግዜ ግዝያዊ ናይ ዑቕባ ፍቓድ ዝረኸቡን ሆላንድኛ ብደረጃ B1 ዝሓለፉን ዋናታት ዑቕባ፡ ብዘይ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene) እውን ድሕሪ 6 ዓመት ሆላንዳውያን ዜጋታት ክኾኑ ምኽኣሉ። ን B1 ክበጽሑ ዘይክእሉ ፍሉይ ኩነታት ክህሉ እዩ። ገና ረቂቕ ሕጊ የለን። እቲ ሕጊ ክሳዕ ዝወጽእ፡ እቶም ኣብ ላዕሊ ዘለዉ ሕግታት ይሰርሑ።"
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ እንታይ እዩ?"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "ፈለማ ኣየናይ ፍቓድ ከም ዘለካ ከም ዝምርመር ግበር",
        "sub": "ናብ ሆላንዳዊ ዜግነት ዘሎ መንገድካ ኣብ ፍቓድካ ይምርኮስ። ቅድሚ 12 ሰነ 2026 ብዝተዋህበ ናይ ዑቕባ ፍቓድ እቲ መንገዲ ካብ ሓድሽ ፍቓድ ይሓጽር።",
        "alternatieven": [
          {
            "naam": "ናይ ቀደም ናይ ዑቕባ ፍቓድ",
            "tekst": "ናይ ዘይውሱን ግዜ፡ ወይ ቅድሚ 12 ሰነ 2026 ዝተረኽበ ናይ 5 ዓመት፦ ብናይ ቀደም መንገዲ ዜግነት (naturalisatie) ክትሓትት ትኽእል።"
          },
          {
            "naam": "ሓድሽ ናይ ዑቕባ ፍቓድ",
            "tekst": "ኣብ 12 ሰነ 2026 ወይ ድሕሪኡ ዝተረኽበ ወይ ዝተሓደሰ፦ ፈለማ ናይ ኤውሮጳ ሕብረት ነዊሕ-ግዜ ነባሪ (EU-langdurig ingezetene)፡ ምስ ናይ እቶት ጠለብ፡ ድሕሪኡ ዜግነት (naturalisatie)።"
          },
          {
            "naam": "ካልእ ፍቓድ",
            "tekst": "ንስድራ፡ ንስራሕ ወይ ንትምህርቲ፦ ናይ ቀደም ሕግታት ገና ይሰርሑ።"
          },
          {
            "naam": "መን ክሕግዝ ይኽእል?",
            "tekst": "ሓጋዚኻ ኣብ ምምሕዳር ወይ VluchtelingenWerk ምሳኻ ሓቢሮም ካርድካ ክርእዩ ይኽእሉ።"
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ ኣብ ቀረባኻ ዘሎ ቤት ጽሕፈት VluchtelingenWerk ድለ"
      }
    }
  },
  "RO": {
    "header": {
      "badge": "🇳🇱 Verificator Naturalizare",
      "titel": "Am dreptul la un pașaport olandez?",
      "sub": "Răspunde la câteva întrebări și vezi dacă poți deveni cetățean olandez. Pe baza regulilor din 2026, inclusiv noile reguli de azil de la 12 iunie 2026.",
      "disclaimer": "⚠️ Acest instrument oferă o indicație, nu o decizie. Verificat în septembrie 2026 (IND, Stimulansz). De la 12 iunie 2026 nu mai există permis de azil pe durată nedeterminată. De aceea, noii beneficiari de protecție trebuie să devină mai întâi rezident UE pe termen lung (EU-langdurig ingezetene) înainte de a se putea naturaliza (naturalisatie). Planurile anunțate de guvern încă nu sunt lege. Cere întotdeauna sfatul primăriei sau al VluchtelingenWerk.",
      "vwnLabel": "Nu ești sigur/ă de situația ta?",
      "vwnTekst": "Regulile de naturalizare se schimbă rapid și situația ta poate fi diferită de ce arată instrumentul. VluchtelingenWerk Nederland oferă consultații gratuite și îndrumare pentru naturalizare — găsește o locație apropiată pe <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a>."
    },
    "ui": {
      "volgendeStappen": "Pașii următori",
      "watKunJeDoen": "Ce poți face?",
      "watKunJeNuDoen": "Ce poți face acum?",
      "opnieuw": "↺ Începe din nou",
      "laatChecken": "Cere să ți se verifice situația",
      "vraagLabel": "Întrebarea {n}",
      "jeKuntKiezen": "Poți alege:",
      "ladenMislukt": "A apărut o problemă la încărcarea acestei pagini. Reîncarcă pagina sau încearcă din nou mai târziu.",
      "driePaden": "Cele trei căi spre naturalizare din ruta Z"
    },
    "vragen": {
      "v1": {
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
        "tekst": "Ce fel de drept de ședere ai în Olanda?",
        "uitleg": "Tipul permisului stabilește drumul tău spre cetățenia olandeză. Cetățenii UE locuiesc aici în baza dreptului UE.",
        "antwoorden": [
          {
            "tekst": "Am un permis de ședere pentru azil (beneficiar de protecție)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel"
          },
          {
            "tekst": "Am un alt permis de ședere",
            "sub": "De exemplu pentru familie, muncă sau studii",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Sunt cetățean UE",
            "sub": "Sau cetățean SEE/Elveția",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Nu sunt sigur/ă",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "Ce permis de azil ai acum?",
        "uitleg": "De la 12 iunie 2026 regulile s-au schimbat. Pentru naturalizare (naturalisatie) contează când ai primit permisul actual.",
        "antwoorden": [
          {
            "tekst": "Azil pe durată nedeterminată",
            "sub": "Primit înainte de 12 iunie 2026",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Azil pe 5 ani, primit înainte de 12 iunie 2026",
            "icoon": "📅",
            "klasse": "ja",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "Azil primit sau reînnoit la 12 iunie 2026 sau după",
            "sub": "De obicei valabil 3 ani",
            "icoon": "🆕",
            "klasse": "anders",
            "volgende": "e1"
          },
          {
            "tekst": "Sunt deja rezident UE pe termen lung",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Nu știu",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "Vești bune: permisul tău intră sub regulile vechi",
        "uitleg": "Ai primit permisul de azil pe 5 ani înainte de 12 iunie 2026. Cu el te poți naturaliza (naturalisatie) încă pe calea veche.<br><br>⚠️ <strong>Atenție:</strong> dacă IND îți reînnoiește permisul după 12 iunie 2026, primești un permis după regulile noi. Atunci trebuie să devii mai întâi rezident UE pe termen lung (EU-langdurig ingezetene). <strong>Îndeplinești condițiile? Atunci cere naturalizarea cât timp cardul tău actual este încă valabil.</strong>",
        "antwoorden": [
          {
            "tekst": "Am înțeles — continuă",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v2"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "Așa vezi ce permis ai",
        "uitleg": "Uită-te pe cardul de ședere, la rubrica 'Type document en bijzonderheden' (tipul documentului și mențiuni: numărul tipului și textul de lângă el), sau în scrisoarea de la IND. Fii atent/ă la două lucruri:<br><br>1. Scrie <strong>azil</strong> (asiel) sau alt scop (cum ar fi familie sau muncă)?<br>2. Când ai primit acest card: <strong>înainte sau după 12 iunie 2026</strong>? Și cât timp este valabil?<br><br>Nu te descurci? Întreabă-ți îndrumătorul de la primărie sau VluchtelingenWerk.",
        "antwoorden": [
          {
            "tekst": "L-am găsit — înapoi la întrebare",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Nu pot verifica asta",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "e1": {
        "tekst": "Locuiești de 5 ani sau mai mult fără întrerupere în Olanda, cu un permis valabil?",
        "uitleg": "Cu un nou permis de ședere pentru azil (verblijfsvergunning asiel) poți deveni cetățean olandez doar după ce devii mai întâi rezident UE pe termen lung (EU-langdurig ingezetene). Pentru asta trebuie să fi locuit cel puțin 5 ani fără întrerupere în Olanda, cu un permis valabil. Anii cu permis de azil se socotesc. Dacă se socotește și timpul din procedura de azil decide IND.",
        "antwoorden": [
          {
            "tekst": "Da, 5 ani sau mai mult",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "Nu, mai puțin de 5 ani",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "Ai stat mult timp în străinătate în acești 5 ani?",
        "uitleg": "Pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene) nu ai voie să fi fost în afara Olandei mai mult de 6 luni la rând. În total nu pot fi mai mult de 10 luni.",
        "antwoorden": [
          {
            "tekst": "Nu, niciodată atât de mult",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "Da, mai mult de 6 luni la rând sau mai mult de 10 luni în total",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "Nu știu exact",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "Ai destul venit propriu ca să trăiești din el?",
        "uitleg": "Pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene) trebuie să ai destul venit propriu. Venitul trebuie să fie independent (nu din ajutoare sociale) și durabil (să continue). Ai nevoie și de o asigurare de sănătate.",
        "antwoorden": [
          {
            "tekst": "Da, din muncă sau din propria afacere",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "Da, dar de puțin timp sau cu un contract temporar",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "Nu, primesc ajutor social sau nu am venit propriu",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "Cum stai cu integrarea civică?",
        "uitleg": "Pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene) trebuie să îndeplinești cerința de integrare civică (inburgering). Poți face asta prin ruta B1 (B1-route), ruta educațională (onderwijsroute) sau ruta Z (Z-route).",
        "antwoorden": [
          {
            "tekst": "Am terminat prin ruta B1 sau ruta educațională, sau am scutire",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "Am terminat prin ruta Z",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "Sunt încă în curs",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "Ai permis de ședere valabil?",
        "uitleg": "Ai nevoie de un permis de ședere valabil care să nu fie temporar. De exemplu un permis pe durată nedeterminată, statutul de rezident UE pe termen lung (EU-langdurig ingezetene) sau un permis de azil primit înainte de 12 iunie 2026. Reînnoiește-ți întotdeauna permisul la timp, ca șederea ta să rămână neîntreruptă.",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "naam": "Îți expiră permisul de azil mai devreme?",
            "tekst": "Ai un permis de ședere pentru azil (verblijfsvergunning asiel) pe 5 ani de dinainte de 12 iunie 2026 care expiră înainte să ai 5 ani în Olanda? Atunci la reînnoire primești un permis după regulile noi. Drumul tău trece atunci prin statutul de rezident UE pe termen lung (EU-langdurig ingezetene), iar pentru acesta există o cerință de venit."
          },
          {
            "naam": "Termen de naturalizare: posibil 10 ani",
            "tekst": "Atenție: acest lucru se referă la perioada de așteptare înainte de a te putea naturaliza, nu la permisul tău de ședere. Guvernul vrea să prelungească acest termen de naturalizare de la 5 la 10 ani. Încă neadoptat, dar ține cont. Cu un partener olandez termenul poate fi mai scurt — întreabă primăria."
          },
          {
            "naam": "Alternativă: rezident UE pe termen lung",
            "tekst": "Statutul de rezident UE pe termen lung (EU-langdurig ingezetene) îți dă după 5 ani un drept de ședere permanent și îți păstrezi cetățenia. <strong>Dar pentru el există o cerință de venit.</strong>"
          },
          {
            "naam": "Finalizează integrarea",
            "tekst": "Folosește perioada de așteptare pentru a promova examenul de integrare — o cerință obligatorie pentru naturalizare."
          },
          {
            "naam": "Adună documente",
            "tekst": "Solicită din timp documente oficiale din țara de origine și lucrează la olandeza ta, de exemplu printr-un curs de limbă la o instituție certificată Blik op Werk."
          },
          {
            "naam": "Planul guvernului (încă nu este lege)",
            "tekst": "Beneficiarii de protecție care au primit de două ori un permis de azil temporar și ating nivelul B1 la limba olandeză ar putea deveni cetățeni olandezi după 6 ani, chiar și fără statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru cei care nu pot atinge B1 va exista o excepție. Nu există încă un proiect de lege. Până când legea există, se aplică regulile de mai sus."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Vezi: rezident UE pe termen lung (ședere permanentă după 5 ani)"
        },
        "link": "https://ind.nl/en/asylum-and-family-reunification-the-migration-pact-and-other-developments/new-laws-and-regulations-for-asylum-and-family-reunification",
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
            "tekst": "<strong>Continuă cu ruta B1:</strong> promovează examenul lingvistic (B1 sau A2 după un efort demonstrabil) și examenul KNM."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Mai multe informații pe ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Naturalizare prin ruta Z — o diferență importantă",
        "padenTitel": "Cele trei căi spre naturalizare din ruta Z",
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
            "tekst": "Cel puțin 600 de ore de lecții de limbă la nivel A2 la o instituție Blik op Werk și cel puțin 3 încercări per componentă (dintre care cel puțin 1 examen A2)? Atunci DUO poate emite o recomandare de scutire — chiar și fără examen promovat."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Vezi: rezident UE pe termen lung (păstrează-ți cetățenia)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Citește mai mult despre rezident UE pe termen lung pe ind.nl"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Rezident UE pe termen lung — rămâi permanent fără a renunța la cetățenie",
        "sub": "Un permis de ședere permanent după 5 ani. Îți păstrezi cetățenia. De la 12 iunie 2026, pentru noii beneficiari de protecție acesta este și pasul intermediar obligatoriu spre naturalizare (naturalisatie).",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Ce este:</strong> poți locui în Olanda pe durată nedeterminată și poți munci liber, și te poți muta și munci mai ușor în alte țări UE. Anii de azil contează pentru cei 5 ani; anii de studiu contează 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Cerința de venit:</strong> trebuie să ai destul venit propriu și durabil, plus o asigurare de sănătate. Cu ajutor social de obicei nu merge. Atenție: dacă ai un nou permis de ședere pentru azil (verblijfsvergunning asiel) de după 12 iunie 2026, ai nevoie de statutul de rezident UE pe termen lung (EU-langdurig ingezetene) ca să te poți naturaliza mai târziu. Deci cerința de venit se aplică și drumului tău spre cetățenia olandeză."
          },
          {
            "type": "info",
            "tekst": "✈️ În cei 5 ani nu ai voie să fii în afara Olandei mai mult de 6 luni la rând și nici mai mult de 10 luni în total."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Când este interesant pentru tine?</strong> Dacă nu vrei sau nu poți renunța la prima ta cetățenie — pentru naturalizare în principiu trebuie, aici nu."
          },
          {
            "nr": 2,
            "tekst": "<strong>Permis de azil nou?</strong> Atunci acesta este singurul drum spre un permis permanent și apoi spre naturalizare (naturalisatie)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Condiții:</strong> 5 ani la rând de ședere legală în Olanda, nu prea mult timp în străinătate, destul venit propriu și durabil, asigurare de sănătate și integrarea civică (inburgering) terminată prin ruta B1, ruta educațională sau ruta Z."
          },
          {
            "nr": 4,
            "tekst": "<strong>Depunere:</strong> la IND. Dacă depui cerere pentru un permis pe durată nedeterminată, IND verifică automat dacă poți obține și statutul de rezident UE pe termen lung. Cu un permis de azil poți depune cererea doar pe hârtie, nu online."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Citește mai mult despre rezident UE pe termen lung pe ind.nl"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Există modalități de a reduce costurile",
        "sub": "Naturalizarea costă €1.139 pentru o persoană și €1.454 cu partener (tarife 2026) — dar există modalități de a o face accesibilă.",
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
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Poți deveni cetățean olandez — în doi pași",
        "sub": "Cu un nou permis de ședere pentru azil (verblijfsvergunning asiel) trebuie să devii mai întâi rezident UE pe termen lung (EU-langdurig ingezetene). După aceea poți cere naturalizarea (naturalisatie).",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Venit:</strong> IND verifică dacă venitul tău este suficient și dacă va continua (contractul de muncă trebuie să mai fie valabil cel puțin 12 luni). Lucrezi de puțin timp sau ai un contract temporar? Atunci cere mai întâi să se verifice dacă cererea ta are șanse."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Planul guvernului — încă nu este lege:</strong> beneficiarii de protecție care au primit de două ori un permis de azil temporar și ating nivelul B1 la limba olandeză ar putea deveni cetățeni olandezi după 6 ani, chiar și fără statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru cei care nu pot atinge B1 va exista o excepție. Nu există încă un proiect de lege. Până când legea există, se aplică regulile de mai sus."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Cere statutul de rezident UE pe termen lung (EU-langdurig ingezetene) la IND.</strong> Cu un permis de azil se poate doar pe hârtie, nu online. Cererea costă € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Adună dovezi:</strong> contractul de muncă și fluturașii de salariu, asigurarea de sănătate și diploma sau decizia de integrare. Formularul IND spune exact ce e nevoie."
          },
          {
            "nr": 3,
            "tekst": "<strong>Între timp, reînnoiește-ți la timp permisul de azil.</strong> Așa șederea ta rămâne neîntreruptă."
          },
          {
            "nr": 4,
            "tekst": "<strong>Ești rezident UE pe termen lung? Atunci cere naturalizarea (naturalisatie) la primăria ta.</strong> Atunci se aplică condițiile obișnuite: integrarea civică (inburgering) pentru naturalizare, fără cazier și locuiești permanent în Olanda. Ca refugiat recunoscut, de obicei nu trebuie să renunți la cetățenia ta."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Citește mai mult despre rezident UE pe termen lung pe ind.nl"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Poți deveni rezident UE pe termen lung — pentru naturalizare e nevoie apoi de un pas în plus",
        "sub": "Cu ruta Z (Z-route) îndeplinești cerința de integrare civică (inburgering) pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru naturalizare (naturalisatie) nu este suficient: acolo se aplică cerințe de limbă suplimentare.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Venit:</strong> IND verifică dacă venitul tău este suficient și dacă va continua (contractul de muncă trebuie să mai fie valabil cel puțin 12 luni). Lucrezi de puțin timp sau ai un contract temporar? Atunci cere mai întâi să se verifice dacă cererea ta are șanse."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Planul guvernului — încă nu este lege:</strong> beneficiarii de protecție care au primit de două ori un permis de azil temporar și ating nivelul B1 la limba olandeză ar putea deveni cetățeni olandezi după 6 ani, chiar și fără statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru cei care nu pot atinge B1 va exista o excepție. Nu există încă un proiect de lege. Până când legea există, se aplică regulile de mai sus."
          }
        ],
        "padenTitel": "După statutul de rezident UE pe termen lung: trei căi spre naturalizare din ruta Z",
        "paden": [
          {
            "nr": "A",
            "titel": "Promovarea examenului de integrare la nivel A2",
            "tekst": "Promovează toate examenele lingvistice la nivel A2 și examenul KNM."
          },
          {
            "nr": "B",
            "titel": "600 ore cursuri de limbă (A2) + cel puțin 3 încercări per componentă",
            "tekst": "Cel puțin 600 de ore de lecții de limbă la nivel A2 la o instituție Blik op Werk și cel puțin 3 încercări per componentă (dintre care cel puțin 1 examen A2)? Atunci DUO poate emite o recomandare de scutire — chiar și fără examen promovat."
          },
          {
            "nr": "C",
            "titel": "600 ore de alfabetizare + test DUO — 150 €",
            "tekst": "600 ore de alfabetizare și testul DUO arată că A2 nu este realizabil. Se acordă scutire. Testul costă 150 €."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Cere statutul de rezident UE pe termen lung (EU-langdurig ingezetene) la IND.</strong> Cu un permis de azil se poate doar pe hârtie, nu online. Cererea costă € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Adună dovezi:</strong> contractul de muncă și fluturașii de salariu, asigurarea de sănătate și diploma sau decizia de integrare. Formularul IND spune exact ce e nevoie."
          },
          {
            "nr": 3,
            "tekst": "<strong>Între timp, reînnoiește-ți la timp permisul de azil.</strong> Așa șederea ta rămâne neîntreruptă."
          },
          {
            "nr": 4,
            "tekst": "<strong>Ești rezident UE pe termen lung? Atunci alege una dintre căile de mai sus și apoi cere naturalizarea (naturalisatie) la primăria ta.</strong>"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Citește mai mult despre rezident UE pe termen lung pe ind.nl"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "Termină mai întâi integrarea civică",
        "sub": "Locuiești de destul timp în Olanda și ai venit. Ce lipsește încă este integrarea civică (inburgering). După aceea poți cere statutul de rezident UE pe termen lung (EU-langdurig ingezetene), iar mai târziu naturalizarea (naturalisatie).",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 Ruta B1 (B1-route), ruta educațională (onderwijsroute) și ruta Z (Z-route) contează toate trei pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru naturalizare (naturalisatie), ruta Z singură nu este suficientă."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Planul guvernului — încă nu este lege:</strong> beneficiarii de protecție care au primit de două ori un permis de azil temporar și ating nivelul B1 la limba olandeză ar putea deveni cetățeni olandezi după 6 ani, chiar și fără statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru cei care nu pot atinge B1 va exista o excepție. Nu există încă un proiect de lege. Până când legea există, se aplică regulile de mai sus."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Termină-ți ruta de integrare.</strong> Întreabă primăria cât timp mai ai nevoie."
          },
          {
            "nr": 2,
            "tekst": "<strong>Păstrează-ți locul de muncă și asigurarea de sănătate.</strong> Ai nevoie de ele pentru cerere."
          },
          {
            "nr": 3,
            "tekst": "<strong>Reînnoiește-ți la timp permisul de azil.</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>Fă din nou această verificare</strong> când ai terminat integrarea."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Ce înseamnă rezident UE pe termen lung?"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "Venitul tău este acum obstacolul",
        "sub": "Cu un permis de ședere pentru azil (verblijfsvergunning asiel) de după 12 iunie 2026 poți deveni cetățean olandez doar dacă devii mai întâi rezident UE pe termen lung (EU-langdurig ingezetene). Pentru asta ai nevoie de destul venit propriu. Cu ajutor social acum nu se poate. Sincer, aceasta este o schimbare mare.",
        "alternatieven": [
          {
            "naam": "Muncă sau mai multe ore",
            "tekst": "Un loc de muncă sau mai multe ore de lucru pot deschide drumul. Vezi cu instrumentul Loont werken ce îți aduce munca."
          },
          {
            "naam": "Poți rămâne",
            "tekst": "Permisul tău de azil rămâne valabil. Reînnoiește-l întotdeauna la timp."
          },
          {
            "naam": "Termină-ți integrarea",
            "tekst": "Ai nevoie de integrarea civică (inburgering) pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene) și pentru naturalizare (naturalisatie)."
          },
          {
            "naam": "Partener sau excepție?",
            "tekst": "Venitul partenerului tău poate conta, dacă locuiți împreună și partenerul tău este cetățean olandez sau are permis de ședere. O excepție se aplică dacă ai atins vârsta pensiei de stat (AOW-leeftijd) sau dacă ești permanent și complet incapabil/ă de muncă și poți dovedi asta."
          },
          {
            "naam": "Planul guvernului (încă nu este lege)",
            "tekst": "Beneficiarii de protecție care au primit de două ori un permis de azil temporar și ating nivelul B1 la limba olandeză ar putea deveni cetățeni olandezi după 6 ani, chiar și fără statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru cei care nu pot atinge B1 va exista o excepție. Nu există încă un proiect de lege. Până când legea există, se aplică regulile de mai sus."
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ Calculează ce îți aduce munca"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "Poate ai stat prea mult în străinătate",
        "sub": "Pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene) nu ai voie să fi fost în afara Olandei mai mult de 6 luni la rând și nici mai mult de 10 luni în total. Din această cauză, cei 5 ani pot începe să se numere din nou.",
        "alternatieven": [
          {
            "naam": "Numără-ți călătoriile",
            "tekst": "Caută datele călătoriilor tale: ștampile, bilete sau cererea ta pentru un document de călătorie."
          },
          {
            "naam": "Cere o verificare",
            "tekst": "VluchtelingenWerk sau primăria ta pot calcula împreună cu tine de când vei avea din nou 5 ani."
          },
          {
            "naam": "De acum stai plecat/ă mai puțin",
            "tekst": "Planifică drumurile lungi astfel încât să rămâi sub limită."
          },
          {
            "naam": "Planul guvernului (încă nu este lege)",
            "tekst": "Beneficiarii de protecție care au primit de două ori un permis de azil temporar și ating nivelul B1 la limba olandeză ar putea deveni cetățeni olandezi după 6 ani, chiar și fără statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru cei care nu pot atinge B1 va exista o excepție. Nu există încă un proiect de lege. Până când legea există, se aplică regulile de mai sus."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Citește mai mult despre rezident UE pe termen lung pe ind.nl"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Încă nu ai locuit suficient de mult în Olanda",
        "sub": "Cu un nou permis de ședere pentru azil (verblijfsvergunning asiel) trebuie să locuiești mai întâi 5 ani în Olanda. După aceea poți deveni rezident UE pe termen lung (EU-langdurig ingezetene), și abia apoi cetățean olandez. Poți folosi bine timpul până atunci.",
        "alternatieven": [
          {
            "naam": "Reînnoiește la timp",
            "tekst": "Noile permise de azil sunt valabile maximum 3 ani; așa că reînnoiește la timp. Dacă apare un \"gol de ședere\" (verblijfsgat) — o perioadă între două permise în care nu ai un permis valabil — acel timp nu contează ca ședere legală, iar numărătoarea de 5 ani pentru naturalizare poate reîncepe. Așa că depune cererea de reînnoire cel târziu în 4 săptămâni de la expirare: atunci IND nu o consideră gol de ședere."
          },
          {
            "naam": "Lucrează la venitul tău",
            "tekst": "Pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene) vei avea nevoie mai târziu de destul venit propriu. Lucrează încă de acum la un loc de muncă sau la mai multe ore."
          },
          {
            "naam": "Termină-ți integrarea",
            "tekst": "Ruta B1 (B1-route), ruta educațională (onderwijsroute) și ruta Z (Z-route) contează pentru statutul de rezident UE pe termen lung (EU-langdurig ingezetene)."
          },
          {
            "naam": "Nu sta plecat/ă prea mult",
            "tekst": "Nu pleca în străinătate mai mult de 6 luni la rând și nici mai mult de 10 luni în total."
          },
          {
            "naam": "Planul guvernului (încă nu este lege)",
            "tekst": "Beneficiarii de protecție care au primit de două ori un permis de azil temporar și ating nivelul B1 la limba olandeză ar putea deveni cetățeni olandezi după 6 ani, chiar și fără statutul de rezident UE pe termen lung (EU-langdurig ingezetene). Pentru cei care nu pot atinge B1 va exista o excepție. Nu există încă un proiect de lege. Până când legea există, se aplică regulile de mai sus."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Ce înseamnă rezident UE pe termen lung?"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Cere mai întâi să se verifice ce permis ai",
        "sub": "Drumul tău spre cetățenia olandeză depinde de permisul tău. Cu un permis de azil de dinainte de 12 iunie 2026 este mai scurt decât cu unul nou.",
        "alternatieven": [
          {
            "naam": "Permis de azil vechi",
            "tekst": "Pe durată nedeterminată sau pe 5 ani, primit înainte de 12 iunie 2026: te poți naturaliza (naturalisatie) pe calea veche."
          },
          {
            "naam": "Permis de azil nou",
            "tekst": "Primit sau reînnoit la 12 iunie 2026 sau după: mai întâi statutul de rezident UE pe termen lung (EU-langdurig ingezetene), cu cerință de venit, apoi naturalizarea (naturalisatie)."
          },
          {
            "naam": "Alt permis",
            "tekst": "Pentru familie, muncă sau studii: regulile vechi se aplică în continuare."
          },
          {
            "naam": "Cine te poate ajuta?",
            "tekst": "Îndrumătorul tău de la primărie sau VluchtelingenWerk se pot uita împreună cu tine pe card."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ Găsește o locație VluchtelingenWerk lângă tine"
      }
    }
  },
  "PL": {
    "header": {
      "badge": "🇳🇱 Sprawdzanie Naturalizacji",
      "titel": "Czy mam prawo do holenderskiego paszportu?",
      "sub": "Odpowiedz na kilka pytań i sprawdź, czy możesz zostać obywatelem Holandii. Na podstawie przepisów z 2026 roku, w tym nowych przepisów azylowych obowiązujących od 12 czerwca 2026 r.",
      "disclaimer": "⚠️ To narzędzie daje orientację, a nie decyzję. Sprawdzone we wrześniu 2026 r. (IND, Stimulansz). Od 12 czerwca 2026 r. nie ma już zezwolenia azylowego na czas nieokreślony. Dlatego nowe osoby z ochroną muszą najpierw zostać rezydentem długoterminowym UE (EU-langdurig ingezetene), zanim będą mogły się naturalizować (naturalisatie). Zapowiedziane plany rządu jeszcze nie są prawem. Zawsze proś o radę gminę lub VluchtelingenWerk.",
      "vwnLabel": "Nie masz pewności co do swojej sytuacji?",
      "vwnTekst": "Przepisy dotyczące naturalizacji szybko się zmieniają, a Twoja sytuacja może się różnić od tego, co wskazuje narzędzie. VluchtelingenWerk Nederland oferuje bezpłatne dyżury i wsparcie w kwestiach naturalizacji — znajdź pobliskie miejsce na <a href=\"https://www.vluchtelingenwerk.nl/over-ons/locaties\" target=\"_blank\" style=\"color:inherit;\">vluchtelingenwerk.nl/over-ons/locaties</a>."
    },
    "ui": {
      "volgendeStappen": "Następne kroki",
      "watKunJeDoen": "Co możesz zrobić?",
      "watKunJeNuDoen": "Co możesz teraz zrobić?",
      "opnieuw": "↺ Zacznij od nowa",
      "laatChecken": "Poproś o sprawdzenie swojej sytuacji",
      "vraagLabel": "Pytanie {n}",
      "jeKuntKiezen": "Możesz wybrać:",
      "ladenMislukt": "Podczas ładowania tej strony coś poszło nie tak. Odśwież stronę lub spróbuj później.",
      "driePaden": "Trzy ścieżki do naturalizacji z trasy Z"
    },
    "vragen": {
      "v1": {
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
        "tekst": "Jaki masz pobyt w Holandii?",
        "uitleg": "Rodzaj zezwolenia decyduje o Twojej drodze do obywatelstwa holenderskiego. Obywatele UE mieszkają tu na podstawie prawa UE.",
        "antwoorden": [
          {
            "tekst": "Mam zezwolenie na pobyt azylowy (osoba z ochroną)",
            "icoon": "🛡️",
            "klasse": "ja",
            "volgende": "v_asiel"
          },
          {
            "tekst": "Mam inne zezwolenie na pobyt",
            "sub": "Na przykład w celu rodzinnym, pracy lub nauki",
            "icoon": "📄",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Jestem obywatelem/ką UE",
            "sub": "Lub obywatelem/ką EOG/Szwajcarii",
            "icoon": "🇪🇺",
            "klasse": "anders",
            "volgende": "r_eu_burger"
          },
          {
            "tekst": "Nie jestem pewny/a",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel": {
        "tekst": "Jakie zezwolenie azylowe masz teraz?",
        "uitleg": "Od 12 czerwca 2026 r. przepisy się zmieniły. Dla naturalizacji (naturalisatie) ważne jest, kiedy otrzymałeś/aś obecne zezwolenie.",
        "antwoorden": [
          {
            "tekst": "Azyl na czas nieokreślony",
            "sub": "Otrzymany przed 12 czerwca 2026 r.",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Azyl na 5 lat, otrzymany przed 12 czerwca 2026 r.",
            "icoon": "📅",
            "klasse": "ja",
            "volgende": "v_asiel5"
          },
          {
            "tekst": "Azyl otrzymany lub przedłużony 12 czerwca 2026 r. lub później",
            "sub": "Zwykle ważny 3 lata",
            "icoon": "🆕",
            "klasse": "anders",
            "volgende": "e1"
          },
          {
            "tekst": "Jestem już rezydentem długoterminowym UE",
            "icoon": "🇪🇺",
            "klasse": "ja",
            "volgende": "v2"
          },
          {
            "tekst": "Nie wiem",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "v_asiel_wn"
          }
        ]
      },
      "v_asiel5": {
        "tekst": "Dobra wiadomość: Twoje zezwolenie podlega starym przepisom",
        "uitleg": "Otrzymałeś/aś 5-letnie zezwolenie azylowe przed 12 czerwca 2026 r. Dzięki niemu nadal możesz się naturalizować (naturalisatie) na starych zasadach.<br><br>⚠️ <strong>Uwaga:</strong> jeśli IND przedłuży Twoje zezwolenie po 12 czerwca 2026 r., otrzymasz zezwolenie według nowych przepisów. Wtedy musisz najpierw zostać rezydentem długoterminowym UE (EU-langdurig ingezetene). <strong>Spełniasz warunki? To złóż wniosek o naturalizację, dopóki Twoja obecna karta jest jeszcze ważna.</strong>",
        "antwoorden": [
          {
            "tekst": "Rozumiem — dalej",
            "icoon": "→",
            "klasse": "ja",
            "volgende": "v2"
          }
        ]
      },
      "v_asiel_wn": {
        "tekst": "Tak sprawdzisz, jakie masz zezwolenie",
        "uitleg": "Zajrzyj na swoją kartę pobytu, do pola 'Type document en bijzonderheden' (rodzaj dokumentu i uwagi: numer typu i tekst obok niego), albo do listu z IND. Zwróć uwagę na dwie rzeczy:<br><br>1. Czy jest tam napisane <strong>azyl</strong> (asiel), czy inny cel (np. rodzina lub praca)?<br>2. Kiedy dostałeś/aś tę kartę: <strong>przed czy po 12 czerwca 2026 r.</strong>? I jak długo jest ważna?<br><br>Nie wiesz? Zapytaj swojego opiekuna w gminie lub VluchtelingenWerk.",
        "antwoorden": [
          {
            "tekst": "Znalazłem/am — wróć do pytania",
            "icoon": "↩",
            "klasse": "ja",
            "volgende": "v1b"
          },
          {
            "tekst": "Nie mogę tego sprawdzić",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "r_asiel_onbekend"
          }
        ]
      },
      "e1": {
        "tekst": "Czy mieszkasz w Holandii nieprzerwanie od 5 lat lub dłużej z ważnym zezwoleniem?",
        "uitleg": "Z nowym zezwoleniem na pobyt azylowy (verblijfsvergunning asiel) możesz zostać obywatelem Holandii dopiero wtedy, gdy najpierw zostaniesz rezydentem długoterminowym UE (EU-langdurig ingezetene). W tym celu musisz mieszkać w Holandii nieprzerwanie co najmniej 5 lat z ważnym zezwoleniem. Lata z zezwoleniem azylowym się liczą. O tym, czy liczy się czas procedury azylowej, decyduje IND.",
        "antwoorden": [
          {
            "tekst": "Tak, 5 lat lub dłużej",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e2"
          },
          {
            "tekst": "Nie, krócej niż 5 lat",
            "icoon": "⏳",
            "klasse": "nee",
            "volgende": "r_te_kort_nieuw"
          }
        ]
      },
      "e2": {
        "tekst": "Czy w ciągu tych 5 lat długo przebywałeś/aś za granicą?",
        "uitleg": "Aby uzyskać status rezydenta długoterminowego UE (EU-langdurig ingezetene), nie możesz przebywać poza Holandią dłużej niż 6 miesięcy bez przerwy. Łącznie nie może to być więcej niż 10 miesięcy.",
        "antwoorden": [
          {
            "tekst": "Nie, nigdy tak długo",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "e3"
          },
          {
            "tekst": "Tak, dłużej niż 6 miesięcy bez przerwy lub łącznie ponad 10 miesięcy",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_eu_li_afwezig"
          },
          {
            "tekst": "Nie wiem dokładnie",
            "icoon": "❓",
            "klasse": "anders",
            "volgende": "e3"
          }
        ]
      },
      "e3": {
        "tekst": "Czy masz wystarczający własny dochód, aby z niego żyć?",
        "uitleg": "Aby uzyskać status rezydenta długoterminowego UE (EU-langdurig ingezetene), musisz mieć wystarczający własny dochód. Musi on być samodzielny (nie z zasiłku) i trwały (utrzymuje się). Potrzebujesz też ubezpieczenia zdrowotnego.",
        "antwoorden": [
          {
            "tekst": "Tak, z pracy lub własnej firmy",
            "icoon": "💼",
            "klasse": "ja",
            "volgende": "e4"
          },
          {
            "tekst": "Tak, ale od niedawna lub na umowę tymczasową",
            "icoon": "⚠️",
            "klasse": "anders",
            "volgende": "e4"
          },
          {
            "tekst": "Nie, mam zasiłek lub nie mam własnego dochodu",
            "icoon": "✗",
            "klasse": "nee",
            "volgende": "r_inkomen"
          }
        ]
      },
      "e4": {
        "tekst": "Jak wygląda Twoja integracja obywatelska?",
        "uitleg": "Aby uzyskać status rezydenta długoterminowego UE (EU-langdurig ingezetene), musisz spełnić wymóg integracji obywatelskiej (inburgering). Możesz to zrobić trasą B1 (B1-route), trasą edukacyjną (onderwijsroute) lub trasą Z (Z-route).",
        "antwoorden": [
          {
            "tekst": "Ukończona trasą B1 lub edukacyjną albo mam zwolnienie",
            "icoon": "✓",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst"
          },
          {
            "tekst": "Ukończona trasą Z",
            "icoon": "🌱",
            "klasse": "ja",
            "volgende": "r_eu_li_eerst_z"
          },
          {
            "tekst": "Nadal jestem w trakcie",
            "icoon": "⏳",
            "klasse": "anders",
            "volgende": "r_eu_li_inburgering_bezig"
          }
        ]
      },
      "v2": {
        "tekst": "Czy posiadasz ważne zezwolenie na pobyt?",
        "uitleg": "Potrzebujesz ważnego zezwolenia na pobyt, które nie jest tymczasowe. Na przykład zezwolenia na czas nieokreślony, statusu rezydenta długoterminowego UE (EU-langdurig ingezetene) albo zezwolenia azylowego otrzymanego przed 12 czerwca 2026 r. Zawsze przedłużaj zezwolenie na czas, aby Twój pobyt był nieprzerwany.",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
            "naam": "Czy Twoje zezwolenie azylowe wygasa wcześniej?",
            "tekst": "Masz 5-letnie zezwolenie na pobyt azylowy (verblijfsvergunning asiel) sprzed 12 czerwca 2026 r., które wygasa, zanim będziesz mieszkać w Holandii 5 lat? Wtedy przy przedłużeniu dostaniesz zezwolenie według nowych przepisów. Twoja droga prowadzi wtedy przez status rezydenta długoterminowego UE (EU-langdurig ingezetene), a do niego obowiązuje wymóg dochodowy."
          },
          {
            "naam": "Okres naturalizacji: możliwe 10 lat",
            "tekst": "Uwaga: dotyczy to czasu oczekiwania przed naturalizacją, a nie Twojego zezwolenia na pobyt. Rząd chce wydłużyć ten okres naturalizacji z 5 do 10 lat. Jeszcze nieprzyjęte, ale weź pod uwagę. Z holenderskim partnerem okres może być krótszy — zapytaj gminę."
          },
          {
            "naam": "Alternatywa: rezydent długoterminowy UE",
            "tekst": "Status rezydenta długoterminowego UE (EU-langdurig ingezetene) daje po 5 latach stałe prawo pobytu, a Ty zachowujesz własne obywatelstwo. <strong>Obowiązuje jednak wymóg dochodowy.</strong>"
          },
          {
            "naam": "Ukończ integrację",
            "tekst": "Wykorzystaj czas oczekiwania na zdanie egzaminu z integracji — twardy wymóg do naturalizacji."
          },
          {
            "naam": "Zbierz dokumenty",
            "tekst": "Z wyprzedzeniem zamów oficjalne dokumenty z kraju pochodzenia i pracuj nad holenderskim, na przykład poprzez kurs językowy w placówce z certyfikatem Blik op Werk."
          },
          {
            "naam": "Plan rządu (jeszcze nie jest prawem)",
            "tekst": "Osoby z ochroną, które dwa razy otrzymały tymczasowe zezwolenie azylowe i osiągną niderlandzki na poziomie B1, mogłyby zostać obywatelami Holandii po 6 latach, nawet bez statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Dla osób, które nie mogą osiągnąć B1, będzie wyjątek. Nie ma jeszcze projektu ustawy. Dopóki takiej ustawy nie ma, obowiązują powyższe przepisy."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Zobacz: rezydent długoterminowy UE (stały pobyt po 5 latach)"
        },
        "link": "https://ind.nl/en/asylum-and-family-reunification-the-migration-pact-and-other-developments/new-laws-and-regulations-for-asylum-and-family-reunification",
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
            "tekst": "<strong>Kontynuuj trasę B1:</strong> zdaj egzamin językowy (B1 lub A2 po udokumentowanym wysiłku) i egzamin KNM."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Więcej informacji na ind.nl"
      },
      "r_bezig_z": {
        "type": "route",
        "icoon": "🌱",
        "titel": "Naturalizacja przez trasę Z — ważna różnica",
        "padenTitel": "Trzy ścieżki do naturalizacji ze ścieżki Z",
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
            "tekst": "Co najmniej 600 godzin lekcji języka na poziomie A2 w instytucji Blik op Werk i co najmniej 3 próby na każdą część egzaminu (w tym co najmniej 1 egzamin A2)? Wtedy DUO może wydać rekomendację zwolnienia — nawet bez zdanego egzaminu."
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
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
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
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Zobacz: rezydent długoterminowy UE (zachowaj obywatelstwo)"
        },
        "link": "https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation",
        "linkTekst": "→ Przeczytaj więcej o rezydencie długoterminowym UE na ind.nl"
      },
      "r_eu_langdurig": {
        "type": "eu",
        "icoon": "🇪🇺",
        "titel": "Rezydent długoterminowy UE — zostań na stałe bez rezygnacji z obywatelstwa",
        "sub": "Stałe zezwolenie na pobyt po 5 latach. Zachowujesz własne obywatelstwo. Od 12 czerwca 2026 r. dla nowych osób z ochroną jest to także obowiązkowy krok pośredni w drodze do naturalizacji (naturalisatie).",
        "infoBoxen": [
          {
            "type": "info",
            "tekst": "🇪🇺 <strong>Co to jest:</strong> możesz mieszkać w Holandii bezterminowo i swobodnie pracować, a także łatwiej przeprowadzać się i pracować w innych krajach UE. Twoje lata azylowe liczą się do 5 lat; lata studiów liczą się w 50%."
          },
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Wymóg dochodowy:</strong> musisz mieć wystarczający i trwały własny dochód oraz ubezpieczenie zdrowotne. Z zasiłkiem zwykle się to nie udaje. Uwaga: jeśli masz nowe zezwolenie na pobyt azylowy (verblijfsvergunning asiel) wydane po 12 czerwca 2026 r., potrzebujesz statusu rezydenta długoterminowego UE (EU-langdurig ingezetene), aby później móc się naturalizować. Wymóg dochodowy dotyczy więc także Twojej drogi do obywatelstwa holenderskiego."
          },
          {
            "type": "info",
            "tekst": "✈️ W ciągu 5 lat nie możesz przebywać poza Holandią dłużej niż 6 miesięcy bez przerwy ani łącznie dłużej niż 10 miesięcy."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Kiedy jest to dla Ciebie interesujące?</strong> Jeśli nie chcesz lub nie możesz zrezygnować z pierwszego obywatelstwa — do naturalizacji co do zasady musisz, tutaj nie."
          },
          {
            "nr": 2,
            "tekst": "<strong>Nowe zezwolenie azylowe?</strong> Wtedy to jedyna droga do stałego zezwolenia, a potem do naturalizacji (naturalisatie)."
          },
          {
            "nr": 3,
            "tekst": "<strong>Warunki:</strong> 5 lat nieprzerwanego legalnego pobytu w Holandii, niezbyt długie pobyty za granicą, wystarczający i trwały własny dochód, ubezpieczenie zdrowotne oraz ukończona integracja obywatelska (inburgering) trasą B1, trasą edukacyjną lub trasą Z."
          },
          {
            "nr": 4,
            "tekst": "<strong>Składanie wniosku:</strong> w IND. Jeśli składasz wniosek o zezwolenie bezterminowe, IND automatycznie sprawdza, czy możesz też uzyskać status rezydenta długoterminowego UE. Z zezwoleniem azylowym wniosek można złożyć tylko na papierze, nie online."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Przeczytaj więcej o rezydencie długoterminowym UE na ind.nl"
      },
      "r_kosten": {
        "type": "wacht",
        "icoon": "💶",
        "titel": "Istnieją sposoby na obniżenie kosztów",
        "sub": "Naturalizacja kosztuje €1.139 dla jednej osoby i €1.454 z partnerem (taryfy 2026) — ale istnieją sposoby, aby była przystępna.",
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
      "r_eu_li_eerst": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Możesz zostać obywatelem Holandii — w dwóch krokach",
        "sub": "Z nowym zezwoleniem na pobyt azylowy (verblijfsvergunning asiel) musisz najpierw zostać rezydentem długoterminowym UE (EU-langdurig ingezetene). Potem możesz złożyć wniosek o naturalizację (naturalisatie).",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Dochód:</strong> IND sprawdza, czy Twój dochód jest wystarczający i czy się utrzyma (umowa o pracę musi być ważna jeszcze co najmniej 12 miesięcy). Pracujesz od niedawna albo masz umowę tymczasową? Wtedy najpierw poproś o sprawdzenie, czy Twój wniosek ma szanse."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Plan rządu — jeszcze nie jest prawem:</strong> osoby z ochroną, które dwa razy otrzymały tymczasowe zezwolenie azylowe i osiągną niderlandzki na poziomie B1, mogłyby zostać obywatelami Holandii po 6 latach, nawet bez statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Dla osób, które nie mogą osiągnąć B1, będzie wyjątek. Nie ma jeszcze projektu ustawy. Dopóki takiej ustawy nie ma, obowiązują powyższe przepisy."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Złóż w IND wniosek o status rezydenta długoterminowego UE (EU-langdurig ingezetene).</strong> Z zezwoleniem azylowym można to zrobić tylko na papierze, nie online. Wniosek kosztuje € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Zbierz dowody:</strong> umowę o pracę i paski wynagrodzeń, ubezpieczenie zdrowotne oraz dyplom lub decyzję w sprawie integracji. Formularz IND mówi dokładnie, co jest potrzebne."
          },
          {
            "nr": 3,
            "tekst": "<strong>W międzyczasie przedłużaj na czas swoje zezwolenie azylowe.</strong> Dzięki temu Twój pobyt pozostaje nieprzerwany."
          },
          {
            "nr": 4,
            "tekst": "<strong>Jesteś rezydentem długoterminowym UE? Wtedy złóż wniosek o naturalizację (naturalisatie) w swojej gminie.</strong> Obowiązują wtedy zwykłe warunki: integracja obywatelska (inburgering) do naturalizacji, brak karalności i stałe zamieszkanie w Holandii. Jako uznany uchodźca zwykle nie musisz zrzekać się swojego obywatelstwa."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Przeczytaj więcej o rezydencie długoterminowym UE na ind.nl"
      },
      "r_eu_li_eerst_z": {
        "type": "route",
        "icoon": "🪜",
        "titel": "Możesz zostać rezydentem długoterminowym UE — do naturalizacji potrzebny jest potem dodatkowy krok",
        "sub": "Trasą Z (Z-route) spełniasz wymóg integracji obywatelskiej (inburgering) do statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Do naturalizacji (naturalisatie) to nie wystarczy: obowiązują dodatkowe wymogi językowe.",
        "infoBoxen": [
          {
            "type": "amber",
            "tekst": "⚠️ <strong>Dochód:</strong> IND sprawdza, czy Twój dochód jest wystarczający i czy się utrzyma (umowa o pracę musi być ważna jeszcze co najmniej 12 miesięcy). Pracujesz od niedawna albo masz umowę tymczasową? Wtedy najpierw poproś o sprawdzenie, czy Twój wniosek ma szanse."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Plan rządu — jeszcze nie jest prawem:</strong> osoby z ochroną, które dwa razy otrzymały tymczasowe zezwolenie azylowe i osiągną niderlandzki na poziomie B1, mogłyby zostać obywatelami Holandii po 6 latach, nawet bez statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Dla osób, które nie mogą osiągnąć B1, będzie wyjątek. Nie ma jeszcze projektu ustawy. Dopóki takiej ustawy nie ma, obowiązują powyższe przepisy."
          }
        ],
        "padenTitel": "Po uzyskaniu statusu rezydenta długoterminowego UE: trzy ścieżki do naturalizacji z trasy Z",
        "paden": [
          {
            "nr": "A",
            "titel": "Zdanie egzaminu integracyjnego na poziomie A2",
            "tekst": "Zdaj wszystkie egzaminy językowe na poziomie A2 i egzamin KNM. Po zdaniu masz dyplom DUO i spełniasz wymóg integracji."
          },
          {
            "nr": "B",
            "titel": "600 godzin kursów językowych (A2) + co najmniej 3 próby na komponent egzaminu",
            "tekst": "Co najmniej 600 godzin lekcji języka na poziomie A2 w instytucji Blik op Werk i co najmniej 3 próby na każdą część egzaminu (w tym co najmniej 1 egzamin A2)? Wtedy DUO może wydać rekomendację zwolnienia — nawet bez zdanego egzaminu."
          },
          {
            "nr": "C",
            "titel": "600 godzin alfabetyzacji + test DUO — 150 €",
            "tekst": "600 godzin alfabetyzacji w instytucji Blik op Werk i test DUO pokazuje, że A2 jest nieosiągalne. Przyznawane jest zwolnienie. Test kosztuje 150 €."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Złóż w IND wniosek o status rezydenta długoterminowego UE (EU-langdurig ingezetene).</strong> Z zezwoleniem azylowym można to zrobić tylko na papierze, nie online. Wniosek kosztuje € 254."
          },
          {
            "nr": 2,
            "tekst": "<strong>Zbierz dowody:</strong> umowę o pracę i paski wynagrodzeń, ubezpieczenie zdrowotne oraz dyplom lub decyzję w sprawie integracji. Formularz IND mówi dokładnie, co jest potrzebne."
          },
          {
            "nr": 3,
            "tekst": "<strong>W międzyczasie przedłużaj na czas swoje zezwolenie azylowe.</strong> Dzięki temu Twój pobyt pozostaje nieprzerwany."
          },
          {
            "nr": 4,
            "tekst": "<strong>Jesteś rezydentem długoterminowym UE? Wtedy wybierz jedną ze ścieżek powyżej, a potem złóż wniosek o naturalizację (naturalisatie) w swojej gminie.</strong>"
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Przeczytaj więcej o rezydencie długoterminowym UE na ind.nl"
      },
      "r_eu_li_inburgering_bezig": {
        "type": "route",
        "icoon": "📚",
        "titel": "Najpierw ukończ integrację obywatelską",
        "sub": "Mieszkasz w Holandii wystarczająco długo i masz dochód. Brakuje jeszcze integracji obywatelskiej (inburgering). Potem możesz złożyć wniosek o status rezydenta długoterminowego UE (EU-langdurig ingezetene), a później o naturalizację (naturalisatie).",
        "infoBoxen": [
          {
            "type": "blauw",
            "tekst": "💡 Trasa B1 (B1-route), trasa edukacyjna (onderwijsroute) i trasa Z (Z-route) — wszystkie trzy liczą się do statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Do naturalizacji (naturalisatie) sama trasa Z nie wystarczy."
          },
          {
            "type": "blauw",
            "tekst": "🗓️ <strong>Plan rządu — jeszcze nie jest prawem:</strong> osoby z ochroną, które dwa razy otrzymały tymczasowe zezwolenie azylowe i osiągną niderlandzki na poziomie B1, mogłyby zostać obywatelami Holandii po 6 latach, nawet bez statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Dla osób, które nie mogą osiągnąć B1, będzie wyjątek. Nie ma jeszcze projektu ustawy. Dopóki takiej ustawy nie ma, obowiązują powyższe przepisy."
          }
        ],
        "stappen": [
          {
            "nr": 1,
            "tekst": "<strong>Ukończ swoją trasę integracji.</strong> Zapytaj gminę, ile czasu jeszcze potrzebujesz."
          },
          {
            "nr": 2,
            "tekst": "<strong>Utrzymaj pracę i ubezpieczenie zdrowotne.</strong> Są potrzebne do wniosku."
          },
          {
            "nr": 3,
            "tekst": "<strong>Przedłużaj na czas swoje zezwolenie azylowe.</strong>"
          },
          {
            "nr": 4,
            "tekst": "<strong>Zrób ten test ponownie</strong>, gdy ukończysz integrację."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Czym jest status rezydenta długoterminowego UE?"
        }
      },
      "r_inkomen": {
        "type": "wacht",
        "icoon": "🧭",
        "titel": "Twoja przeszkoda to teraz dochód",
        "sub": "Z zezwoleniem na pobyt azylowy (verblijfsvergunning asiel) wydanym po 12 czerwca 2026 r. możesz zostać obywatelem Holandii tylko wtedy, gdy najpierw zostaniesz rezydentem długoterminowym UE (EU-langdurig ingezetene). Do tego potrzebujesz wystarczającego własnego dochodu. Z zasiłkiem teraz to się nie uda. Szczerze mówiąc, to duża zmiana.",
        "alternatieven": [
          {
            "naam": "Praca lub więcej godzin",
            "tekst": "Praca albo więcej godzin pracy może otworzyć drogę. Sprawdź w narzędziu Loont werken, co da Ci praca."
          },
          {
            "naam": "Możesz zostać",
            "tekst": "Twoje zezwolenie azylowe pozostaje ważne. Zawsze przedłużaj je na czas."
          },
          {
            "naam": "Ukończ integrację",
            "tekst": "Integracja obywatelska (inburgering) jest Ci potrzebna do statusu rezydenta długoterminowego UE (EU-langdurig ingezetene) i do naturalizacji (naturalisatie)."
          },
          {
            "naam": "Partner lub wyjątek?",
            "tekst": "Dochód Twojego partnera może się liczyć, jeśli mieszkacie razem, a partner jest obywatelem Holandii lub ma zezwolenie na pobyt. Wyjątek obowiązuje, jeśli osiągnąłeś/aś wiek emerytalny AOW (AOW-leeftijd) albo jesteś trwale i całkowicie niezdolny/a do pracy i możesz to udowodnić."
          },
          {
            "naam": "Plan rządu (jeszcze nie jest prawem)",
            "tekst": "Osoby z ochroną, które dwa razy otrzymały tymczasowe zezwolenie azylowe i osiągną niderlandzki na poziomie B1, mogłyby zostać obywatelami Holandii po 6 latach, nawet bez statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Dla osób, które nie mogą osiągnąć B1, będzie wyjątek. Nie ma jeszcze projektu ustawy. Dopóki takiej ustawy nie ma, obowiązują powyższe przepisy."
          }
        ],
        "link": "loont-werken.html",
        "linkTekst": "→ Oblicz, co da Ci praca"
      },
      "r_eu_li_afwezig": {
        "type": "wacht",
        "icoon": "✈️",
        "titel": "Być może zbyt długo przebywałeś/aś za granicą",
        "sub": "Aby uzyskać status rezydenta długoterminowego UE (EU-langdurig ingezetene), nie możesz przebywać poza Holandią dłużej niż 6 miesięcy bez przerwy ani łącznie dłużej niż 10 miesięcy. Przez to 5 lat może zacząć się liczyć od nowa.",
        "alternatieven": [
          {
            "naam": "Policz swoje podróże",
            "tekst": "Znajdź daty swoich podróży: pieczątki, bilety lub wniosek o dokument podróży."
          },
          {
            "naam": "Poproś o sprawdzenie",
            "tekst": "VluchtelingenWerk lub Twoja gmina mogą razem z Tobą policzyć, od kiedy znowu będziesz mieć 5 lat."
          },
          {
            "naam": "Od teraz wyjeżdżaj na krócej",
            "tekst": "Planuj długie podróże tak, aby nie przekroczyć limitu."
          },
          {
            "naam": "Plan rządu (jeszcze nie jest prawem)",
            "tekst": "Osoby z ochroną, które dwa razy otrzymały tymczasowe zezwolenie azylowe i osiągną niderlandzki na poziomie B1, mogłyby zostać obywatelami Holandii po 6 latach, nawet bez statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Dla osób, które nie mogą osiągnąć B1, będzie wyjątek. Nie ma jeszcze projektu ustawy. Dopóki takiej ustawy nie ma, obowiązują powyższe przepisy."
          }
        ],
        "link": "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents",
        "linkTekst": "→ Przeczytaj więcej o rezydencie długoterminowym UE na ind.nl"
      },
      "r_te_kort_nieuw": {
        "type": "wacht",
        "icoon": "⏳",
        "titel": "Jeszcze nie mieszkasz wystarczająco długo w Holandii",
        "sub": "Z nowym zezwoleniem na pobyt azylowy (verblijfsvergunning asiel) musisz najpierw mieszkać w Holandii 5 lat. Potem możesz zostać rezydentem długoterminowym UE (EU-langdurig ingezetene), a dopiero wtedy obywatelem Holandii. Możesz dobrze wykorzystać czas do tego momentu.",
        "alternatieven": [
          {
            "naam": "Przedłużaj na czas",
            "tekst": "Nowe zezwolenia azylowe są ważne maksymalnie 3 lata; dlatego przedłużaj na czas. Jeśli powstanie \"luka pobytowa\" (verblijfsgat) — okres między dwoma zezwoleniami, w którym nie masz ważnego zezwolenia — ten czas nie liczy się jako legalny pobyt, a odliczanie 5 lat do naturalizacji może zacząć się od nowa. Dlatego złóż wniosek o przedłużenie najpóźniej w ciągu 4 tygodni po wygaśnięciu: wtedy IND nie uzna tego za lukę pobytową."
          },
          {
            "naam": "Pracuj nad dochodem",
            "tekst": "Do statusu rezydenta długoterminowego UE (EU-langdurig ingezetene) będziesz później potrzebować wystarczającego własnego dochodu. Już teraz pracuj nad znalezieniem pracy lub większą liczbą godzin."
          },
          {
            "naam": "Ukończ integrację",
            "tekst": "Trasa B1 (B1-route), trasa edukacyjna (onderwijsroute) i trasa Z (Z-route) liczą się do statusu rezydenta długoterminowego UE (EU-langdurig ingezetene)."
          },
          {
            "naam": "Nie wyjeżdżaj na zbyt długo",
            "tekst": "Nie wyjeżdżaj za granicę na dłużej niż 6 miesięcy bez przerwy ani łącznie na dłużej niż 10 miesięcy."
          },
          {
            "naam": "Plan rządu (jeszcze nie jest prawem)",
            "tekst": "Osoby z ochroną, które dwa razy otrzymały tymczasowe zezwolenie azylowe i osiągną niderlandzki na poziomie B1, mogłyby zostać obywatelami Holandii po 6 latach, nawet bez statusu rezydenta długoterminowego UE (EU-langdurig ingezetene). Dla osób, które nie mogą osiągnąć B1, będzie wyjątek. Nie ma jeszcze projektu ustawy. Dopóki takiej ustawy nie ma, obowiązują powyższe przepisy."
          }
        ],
        "interneLink": {
          "naar": "r_eu_langdurig",
          "tekst": "🇪🇺 Czym jest status rezydenta długoterminowego UE?"
        }
      },
      "r_asiel_onbekend": {
        "type": "wacht",
        "icoon": "🔍",
        "titel": "Najpierw poproś o sprawdzenie, jakie masz zezwolenie",
        "sub": "Twoja droga do obywatelstwa holenderskiego zależy od Twojego zezwolenia. Z zezwoleniem azylowym sprzed 12 czerwca 2026 r. jest krótsza niż z nowym.",
        "alternatieven": [
          {
            "naam": "Stare zezwolenie azylowe",
            "tekst": "Na czas nieokreślony albo na 5 lat, otrzymane przed 12 czerwca 2026 r.: możesz się naturalizować (naturalisatie) na starych zasadach."
          },
          {
            "naam": "Nowe zezwolenie azylowe",
            "tekst": "Otrzymane lub przedłużone 12 czerwca 2026 r. lub później: najpierw status rezydenta długoterminowego UE (EU-langdurig ingezetene), z wymogiem dochodowym, potem naturalizacja (naturalisatie)."
          },
          {
            "naam": "Inne zezwolenie",
            "tekst": "W celu rodzinnym, pracy lub nauki: nadal obowiązują stare przepisy."
          },
          {
            "naam": "Kto może pomóc?",
            "tekst": "Twój opiekun w gminie lub VluchtelingenWerk może razem z Tobą obejrzeć Twoją kartę."
          }
        ],
        "link": "https://www.vluchtelingenwerk.nl/over-ons/locaties",
        "linkTekst": "→ Znajdź placówkę VluchtelingenWerk w pobliżu"
      }
    }
  }
};
