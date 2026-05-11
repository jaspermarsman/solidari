// naturalisatie-data.js — vragen + resultaten per taal
// Talen: NL, EN, AR, TR, UK, FA, TI (later)

window._NAT = window._NAT || {};

// ─── NL ───────────────────────────────────────────────────────────────────
window._NAT.NL = {
  header: {
    badge: '🇳🇱 Naturalisatie Checker',
    titel: 'Kom ik in aanmerking voor een Nederlands paspoort?',
    sub: 'Beantwoord een paar vragen en zie direct of je naturalisatie kunt aanvragen — op basis van de IND-voorwaarden 2025.',
  },
  vragen: {
    v1: {
      stap: 'Stap 1 van 9',
      tekst: 'Ben je 18 jaar of ouder?',
      uitleg: 'Naturalisatie kan alleen worden aangevraagd door meerderjarigen. Voor minderjarige kinderen gelden aparte regels via de ouders.',
      antwoorden: [
        { tekst: 'Ja, ik ben 18 jaar of ouder', icoon: '✓', klasse: 'ja', volgende: 'v1b' },
        { tekst: 'Nee, ik ben jonger dan 18', icoon: '✗', klasse: 'nee', volgende: 'r_minderjarig' },
      ]
    },
    v1b: {
      stap: 'Stap 2 van 9',
      tekst: 'Wat is je huidige verblijfsstatus in Nederland?',
      uitleg: 'De manier waarop je in Nederland verblijft, bepaalt welke route van toepassing is. EU-burgers verblijven op basis van EU-recht — niet via een Nederlandse verblijfsvergunning.',
      antwoorden: [
        { tekst: 'Ik heb een Nederlandse verblijfsvergunning', sub: 'Of een asielstatus (IND type III, IV of V)', icoon: '📄', klasse: 'ja', volgende: 'v2' },
        { tekst: 'Ik ben EU-burger (bijv. Roemeens of Pools paspoort)', sub: 'Of burger van EER/Zwitserland', icoon: '🇪🇺', klasse: 'anders', volgende: 'r_eu_burger' },
        { tekst: 'Ik weet het niet zeker', icoon: '❓', klasse: 'anders', volgende: 'v2' },
      ]
    },
    v2: {
      stap: 'Stap 3 van 9',
      tekst: 'Heb je een geldige verblijfsvergunning?',
      uitleg: 'Je hebt een geldige verblijfsvergunning nodig. Een asielstatus (verblijfsvergunning asiel bepaalde of onbepaalde duur) telt ook mee.',
      antwoorden: [
        { tekst: 'Ja, ik heb een geldige verblijfsvergunning', sub: 'Of een asielstatus (IND type III, IV of V)', icoon: '✓', klasse: 'ja', volgende: 'v3' },
        { tekst: 'Nee, ik heb geen geldige verblijfsvergunning', icoon: '✗', klasse: 'nee', volgende: 'r_geen_vergunning' },
      ]
    },
    v3: {
      stap: 'Stap 4 van 9',
      tekst: 'Hoe lang woon je ononderbroken in Nederland?',
      uitleg: 'Je moet normaal gesproken minimaal 5 jaar aaneengesloten in Nederland wonen. Korte reizen naar het buitenland breken dit niet.',
      antwoorden: [
        { tekst: 'Minder dan 5 jaar', icoon: '⏳', klasse: 'nee', volgende: 'r_te_kort' },
        { tekst: '5 jaar of langer', sub: 'Ononderbroken in Nederland gewoond', icoon: '✓', klasse: 'ja', volgende: 'v4a' },
      ]
    },
    v4a: {
      stap: 'Stap 5 van 9 — Inburgering',
      tekst: 'Hoe staat het met jouw inburgering?',
      uitleg: 'Voor naturalisatie moet je aantonen dat je bent ingeburgerd. Er zijn meerdere manieren.',
      antwoorden: [
        { tekst: 'Ik heb het inburgeringsexamen gehaald (B1- of onderwijsroute)', sub: 'DUO-diploma inburgering aanwezig', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Ik heb een Nederlandstalig mbo 2, 3 of 4 diploma — of hbo / wo diploma', sub: 'Dit geeft blijvende vrijstelling van de inburgeringsplicht', icoon: '🎓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Ik ben vrijgesteld of ontheven van inburgering', sub: 'Bijv. door leeftijd (65+), medische reden of aantoonbare inspanning', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Ik heb de Z-route afgerond (eindgesprek + certificaat)', sub: 'Let op: dit geeft niet automatisch recht op naturalisatie — bekijk je opties', icoon: '🌱', klasse: 'anders', volgende: 'v4a_z' },
        { tekst: 'Ik ben nog bezig met inburgering', sub: 'Ik heb nog geen diploma of vrijstelling', icoon: '⏳', klasse: 'anders', volgende: 'v4b' },
      ]
    },
    v4a_z: {
      stap: 'Stap 5 van 9 — Z-route',
      tekst: 'Je hebt de Z-route afgerond — er is nog één extra stap nodig voor naturalisatie',
      uitleg: 'De Z-route sluit af met een eindgesprek en certificaat, maar voor naturalisatie gelden aanvullende taaleisen vanuit de IND. Er zijn drie paden om toch te kunnen naturaliseren:<br><br><strong>Pad A — Alsnog examen halen op A2-niveau</strong><br>Haal alle taalexamens op A2 (lezen, luisteren, schrijven, spreken) én het KNM-examen. Let op: nu de Z-route is afgerond zijn examenpogingen niet langer kosteloos.<br><br><strong>Pad B — 600 uur taalles + minimaal 3 pogingen per onderdeel</strong><br>Minstens 600 uur taalles op A2-niveau bij een Blik op Werk instelling én 3 pogingen per onderdeel? Dan kan DUO een ontheffingsadvies geven.<br><br><strong>Pad C — 600 uur alphabetisering + DUO-toets (€150)</strong><br>Minstens 600 uur alfabetisering en blijkt A2 niet haalbaar? Dan volgt een ontheffing via DUO-toets (€150).<br><br>💡 Overleg met jouw gemeente of VluchtelingenWerk welk pad het beste past.',
      antwoorden: [
        { tekst: 'Ik begrijp dit — ga verder met de overige voorwaarden', icoon: '→', klasse: 'ja', volgende: 'v5' },
      ]
    },
    v4b: {
      stap: 'Stap 5 van 9 — Leerroute',
      tekst: 'Welke inburgeringsroute volg je?',
      uitleg: 'De gemeente bepaalt jouw leerroute op basis van je leerbaarheid. Er zijn drie routes: B1, Onderwijsroute en Z-route.',
      antwoorden: [
        { tekst: 'B1-route', sub: 'Taalexamen op niveau B1 + KNM-examen', icoon: '📖', klasse: 'info', volgende: 'r_bezig_b1' },
        { tekst: 'Onderwijsroute', sub: 'Taalschakeltraject 1,5–2 jaar — voorbereiding op mbo/hbo/wo instroom', icoon: '🏫', klasse: 'info', volgende: 'r_bezig_onderwijs' },
        { tekst: 'Z-route (Zelfredzaamheidsroute)', sub: 'Voor mensen voor wie B1 niet haalbaar is', icoon: '🌱', klasse: 'anders', volgende: 'v4b_z' },
        { tekst: 'Ik weet het niet / ik heb nog geen route', icoon: '❓', klasse: 'anders', volgende: 'r_geen_inburgering' },
      ]
    },
    v4b_z: {
      stap: 'Stap 5 van 9 — Z-route',
      tekst: 'Hoe ver ben je in de Z-route?',
      uitleg: 'De Z-route sluit af met een eindgesprek bij de gemeente en een positief DUO-advies. Dit is vereist voor naturalisatie.',
      antwoorden: [
        { tekst: 'Ik ben klaar met de Z-route (DUO-positief advies ontvangen)', sub: 'Eindgesprek met gemeente afgerond', icoon: '✓', klasse: 'ja', volgende: 'v4a_z' },
        { tekst: 'Ik ben nog bezig met de Z-route', sub: 'Nog niet klaar met de 800 uur taalles / participatie', icoon: '⏳', klasse: 'anders', volgende: 'r_bezig_z' },
      ]
    },
    v5: {
      stap: 'Stap 6 van 9',
      tekst: 'Ben je in de afgelopen 5 jaar veroordeeld voor een misdrijf?',
      uitleg: 'Een strafrechtelijke veroordeling kan naturalisatie blokkeren. Verkeersboetes en kleine overtredingen tellen meestal niet mee.',
      antwoorden: [
        { tekst: 'Nee, ik heb geen strafblad', icoon: '✓', klasse: 'ja', volgende: 'v6' },
        { tekst: 'Ja, ik ben veroordeeld voor een misdrijf', icoon: '✗', klasse: 'nee', volgende: 'r_strafblad' },
        { tekst: 'Ik weet het niet zeker', icoon: '❓', klasse: 'anders', volgende: 'r_strafblad_check' },
      ]
    },
    v6: {
      stap: 'Stap 7 van 9',
      tekst: 'Heb je op dit moment je hoofdverblijf in Nederland?',
      uitleg: 'Je moet je hoofdverblijf in Nederland hebben. Af en toe op reis gaan is geen probleem.',
      antwoorden: [
        { tekst: 'Ja, ik woon vast in Nederland', icoon: '✓', klasse: 'ja', volgende: 'v7' },
        { tekst: 'Nee, ik woon grotendeels in het buitenland', icoon: '✗', klasse: 'nee', volgende: 'r_geen_verblijf' },
      ]
    },
    v7: {
      stap: 'Stap 8 van 9',
      tekst: 'Ben je bereid afstand te doen van je huidige nationaliteit?',
      uitleg: 'Nederland staat in principe geen dubbele nationaliteit toe. Uitzondering: erkende vluchtelingen (statushouders) mogen beide nationaliteiten houden.',
      antwoorden: [
        { tekst: 'Ja, ik doe afstand van mijn nationaliteit', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'Ik ben erkend vluchteling (statushouder)', sub: 'Statushouders mogen dubbele nationaliteit houden', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'Nee, ik wil mijn nationaliteit houden', icoon: '✗', klasse: 'nee', volgende: 'r_nationaliteit' },
      ]
    },
    v8: {
      stap: 'Stap 9 van 9',
      tekst: 'Ben je op de hoogte van de kosten van naturalisatie?',
      uitleg: 'De aanvraag kost €1.044 (2025). De procedure duurt gemiddeld 6–12 maanden.',
      antwoorden: [
        { tekst: 'Ja, ik weet dit en wil doorgaan', icoon: '✓', klasse: 'ja', volgende: 'r_positief' },
        { tekst: 'Dat is te duur — zijn er vergoedingen?', icoon: '💡', klasse: 'anders', volgende: 'r_kosten' },
      ]
    },
  },
  resultaten: {
    r_positief: {
      type: 'positief', icoon: '🎉',
      titel: 'Je komt waarschijnlijk in aanmerking!',
      sub: 'Op basis van jouw antwoorden voldoe je aan de belangrijkste voorwaarden voor naturalisatie. De volgende stap is een officiële aanvraag bij jouw gemeente.',
      info: '💡 Statushouders (erkende vluchtelingen) hoeven in de meeste gevallen geen afstand te doen van hun oorspronkelijke nationaliteit.',
      stappen: [
        { nr: 1, tekst: '<strong>Maak een afspraak bij jouw gemeente</strong> — afdeling burgerzaken. Zeg dat je naturalisatie wilt aanvragen.' },
        { nr: 2, tekst: '<strong>Verzamel documenten:</strong> geldig paspoort, verblijfsvergunning, bewijs van inburgering, geboorteakte (zo nodig gelegaliseerd).' },
        { nr: 3, tekst: '<strong>Betaal de leges:</strong> €1.044 bij indiening (2025). Vraag bij de gemeente of er een bijdrageregeling is.' },
        { nr: 4, tekst: '<strong>Wacht op de beslissing</strong> van de IND. Dit duurt gemiddeld 6–12 maanden.' },
        { nr: 5, tekst: '<strong>Naturalisatieceremonie:</strong> na goedkeuring ontvang je een uitnodiging voor de ceremonie bij de gemeente.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Meer informatie op ind.nl',
    },
    r_eu_burger: {
      type: 'eu', icoon: '🇪🇺',
      titel: 'Als EU-burger heb je andere rechten',
      sub: 'Naturalisatie tot Nederlander is mogelijk, maar je hoeft het Nederlanderschap niet te hebben om hier te wonen en werken. Als EU-burger heb je al vergaande rechten in Nederland.',
      infoBoxen: [
        { type: 'info', tekst: '🇪🇺 <strong>EU-burgerrecht:</strong> Als Roemeens of Pools staatsburger heb je het recht om in Nederland te wonen, werken en studeren — zonder verblijfsvergunning. Je registreert je bij de gemeente (BRP), maar een IND-vergunning is niet nodig.' },
        { type: 'amber', tekst: '⚠️ <strong>Let op dubbele nationaliteit:</strong> Als je naturaliseert tot Nederlander, moet je in principe afstand doen van je Roemeense of Poolse nationaliteit. Roemenië en Polen staan dit in sommige gevallen niet toe. Vraag dit na bij de ambassade voordat je start.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Wil je toch naturaliseren?</strong> De standaardvoorwaarden gelden ook voor EU-burgers: 5 jaar ononderbroken verblijf, inburgering, geen strafblad, afstand van nationaliteit.' },
        { nr: 2, tekst: '<strong>Dubbele nationaliteit:</strong> Informeer bij de Roemeense of Poolse ambassade of jij je nationaliteit kunt houden na naturalisatie. De regels per land verschillen.' },
        { nr: 3, tekst: '<strong>Wil je verder?</strong> Doorloop de checker opnieuw en kies bij de verblijfsstatus voor "verblijfsvergunning" — de overige voorwaarden gelden ook voor EU-burgers.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Naturalisatie-informatie op ind.nl',
    },
    r_minderjarig: {
      type: 'wacht', icoon: '🎂',
      titel: 'Naturalisatie voor kinderen gaat via de ouders',
      sub: 'Minderjarige kinderen kunnen meenaturaliseren als een ouder de Nederlandse nationaliteit aanvraagt of al heeft.',
      alternatieven: [
        { naam: 'Meenaturaliseren', tekst: 'Als jouw ouder naturaliseert, kun jij automatisch meenaturaliseren.' },
        { naam: 'Via de rechter', tekst: 'In sommige gevallen is aparte naturalisatie voor minderjarigen mogelijk.' },
        { naam: 'Wachten op 18', tekst: 'Op je 18e kun je zelfstandig een aanvraag indienen.' },
        { naam: 'Optie', tekst: 'Als je in Nederland geboren bent, kun je soms via "optie" Nederlander worden.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden', linkTekst: '→ Meer informatie op ind.nl',
    },
    r_geen_vergunning: {
      type: 'negatief', icoon: '📋',
      titel: 'Je hebt eerst een verblijfsvergunning nodig',
      sub: 'Naturalisatie is alleen mogelijk als je legaal in Nederland verblijft. Zorg eerst voor een geldige verblijfsvergunning.',
      alternatieven: [
        { naam: 'Asielaanvraag', tekst: 'Als je bescherming nodig hebt, kun je een asielaanvraag indienen bij de IND.' },
        { naam: 'Reguliere vergunning', tekst: 'Voor werk, studie of gezinshereniging zijn er reguliere vergunningen.' },
        { naam: 'Juridische hulp', tekst: 'Neem contact op met een vluchtelingenorganisatie of advocaat.' },
        { naam: 'VluchtelingenWerk', tekst: 'Gratis juridische ondersteuning voor asielzoekers en statushouders.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Neem contact op met VluchtelingenWerk',
    },
    r_te_kort: {
      type: 'wacht', icoon: '⏳',
      titel: 'Nog niet lang genoeg in Nederland',
      sub: 'Je moet minimaal 5 jaar aaneengesloten in Nederland wonen. Je kunt de wachttijd goed benutten.',
      alternatieven: [
        { naam: 'Inburgering afronden', tekst: 'Gebruik de wachttijd om je inburgeringsexamen te halen.' },
        { naam: 'Documenten verzamelen', tekst: 'Vraag alvast officiële documenten op uit je land van herkomst.' },
        { naam: 'NT2 leren', tekst: 'Verbeter je Nederlands — ook gratis via Solidari NT2-cursus.' },
        { naam: 'Kortere wachttijd?', tekst: 'Met een Nederlandse partner kan de termijn korter zijn. Vraag dit na bij de gemeente.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Controleer de voorwaarden op ind.nl',
    },
    r_bezig_b1: {
      type: 'route', icoon: '📖',
      titel: 'Je kunt je naturalisatie alvast voorbereiden',
      sub: 'Je volgt de B1-route maar hebt het examen nog niet afgerond. Je kunt de naturalisatieprocedure al opstarten — het diploma moet klaar zijn vóór de IND een beslissing neemt.',
      infoBoxen: [
        { type: 'blauw', tekst: '💡 <strong>Tip:</strong> Vraag bij jouw gemeente of je de naturalisatieaanvraag alvast kunt indienen terwijl je de B1-route nog afrondt.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Ga door met de B1-route:</strong> haal het taalexamen (B1, of A2 na aantoonbare inspanning) én het KNM-examen.' },
        { nr: 2, tekst: '<strong>Vraag alvast documenten op:</strong> paspoort, geboorteakte, verblijfsvergunning.' },
        { nr: 3, tekst: '<strong>Informeer bij jouw gemeente</strong> of je de aanvraag al kunt indienen terwijl je nog bezig bent.' },
        { nr: 4, tekst: '<strong>Na behalen diploma:</strong> stuur het bewijs door naar de gemeente/IND — dan kan de beslissing worden genomen.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Meer informatie op ind.nl',
    },
    r_bezig_onderwijs: {
      type: 'route', icoon: '🏫',
      titel: 'Je kunt je naturalisatie alvast voorbereiden',
      sub: 'Je volgt de Onderwijsroute — een intensief taalschakeltraject van 1,5 tot 2 jaar gericht op instroom in mbo, hbo of wo.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>Let op:</strong> De Onderwijsroute is géén mbo- of hbo-diploma en geeft geen vrijstelling van inburgering. Je moet het centrale inburgeringsexamen (B1 taalexamen + KNM) halen om aan je inburgeringsplicht te voldoen.' },
        { type: 'blauw', tekst: '💡 <strong>Tip:</strong> Je kunt de naturalisatieprocedure alvast opstarten. Het inburgeringsdiploma moet klaar zijn vóór de IND een beslissing neemt.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Rond de Onderwijsroute af:</strong> haal het taalexamen (B1 op lezen, luisteren, schrijven en spreken) én het KNM-examen.' },
        { nr: 2, tekst: '<strong>Vraag alvast documenten op:</strong> paspoort, geboorteakte, verblijfsvergunning.' },
        { nr: 3, tekst: '<strong>Informeer bij jouw gemeente</strong> of je de aanvraag al kunt indienen terwijl je nog bezig bent.' },
        { nr: 4, tekst: '<strong>Na behalen diploma:</strong> stuur het bewijs door naar de gemeente/IND.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Meer informatie op ind.nl',
    },
    r_bezig_z: {
      type: 'route', icoon: '🌱',
      titel: 'Naturaliseren vanuit de Z-route — belangrijk verschil',
      sub: 'Afronden van de Z-route betekent niet automatisch dat je aan het inburgeringsvereiste voor naturalisatie voldoet. Er zijn drie paden via DUO.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>Belangrijk:</strong> De Z-route heeft geen examenverplichting maar een inspanningsverplichting (800 uur taalles + eindgesprek). Afronden geeft dus <em>geen</em> automatisch recht op naturalisatie. Je hebt aanvullend een DUO-ontheffingsadvies of een geslaagd A2-examen nodig.' },
      ],
      paden: [
        { nr: 'A', titel: 'Alsnog het inburgeringsexamen halen op A2-niveau', tekst: 'Haal alle taalexamens op A2-niveau (lezen, luisteren, schrijven, spreken) én het KNM-examen. Na een geslaagd examen heb je een DUO-diploma en voldoe je aan het inburgeringsvereiste voor naturalisatie.' },
        { nr: 'B', titel: '600 uur taalles (A2) + minimaal 3 pogingen per examenonderdeel', tekst: 'Minstens 600 uur taalles op A2-niveau bij een Blik op Werk instelling én minimaal 3 pogingen per onderdeel (waarvan minstens 1 A2-examen)? Dan kan DUO een ontheffingsadvies afgeven — ook zonder geslaagd examen.' },
        { nr: 'C', titel: '600 uur alfabetisering of taalles + DUO-toets (geen leervermogen) — €150', tekst: 'Minstens 600 uur alfabetisering gevolgd bij een Blik op Werk instelling en blijkt uit een DUO-toets dat A2 niet haalbaar is? Dan volgt een ontheffing. De DUO-toets kost €150.' },
      ],
      info: '📞 <strong>Advies:</strong> Overleg met jouw gemeente of VluchtelingenWerk welk pad het beste bij jouw situatie past.',
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Hulp via VluchtelingenWerk',
    },
    r_geen_inburgering: {
      type: 'wacht', icoon: '📚',
      titel: 'Je hebt inburgering nodig voor naturalisatie',
      sub: 'Zonder inburgeringsdiploma of vrijstelling kun je geen naturalisatie aanvragen. Begin nu — dan ben je over 1 tot 3 jaar klaar.',
      alternatieven: [
        { naam: 'Vraag je leerroute op', tekst: 'Ga naar je gemeente om te weten welke route bij jou past (B1, Onderwijsroute of Z-route).' },
        { naam: 'NT2-cursus via Solidari', tekst: 'Leer gratis Nederlands via de NT2-cursus op deze website (bij zon beschikbaar).' },
        { naam: 'Examen aanvragen', tekst: 'Als je al voldoende Nederlands spreekt, kun je direct het examen aanvragen via DUO.' },
        { naam: 'Vrijstelling mogelijk?', tekst: 'Vraag na of jij in aanmerking komt voor vrijstelling (65+, medische reden, of een vrijstellend diploma).' },
      ],
      link: 'https://www.inburgeren.nl', linkTekst: '→ Meer over inburgering op inburgeren.nl',
    },
    r_strafblad: {
      type: 'negatief', icoon: '⚖️',
      titel: 'Een strafblad kan naturalisatie blokkeren',
      sub: 'Afhankelijk van het type veroordeling en hoe lang geleden, kan dit een belemmering zijn. Laat dit beoordelen door een specialist.',
      alternatieven: [
        { naam: 'Juridisch advies', tekst: 'Vraag een juridisch adviseur of jouw situatie een bezwaar vormt voor naturalisatie.' },
        { naam: 'VluchtelingenWerk', tekst: 'Gratis juridische hulp voor statushouders.' },
        { naam: 'Wachttijd', tekst: 'Na een bepaalde wachttijd (afhankelijk van het vonnis) kun je opnieuw aanvragen.' },
        { naam: 'Kleine boetes', tekst: 'Verkeersboetes en kleine overtredingen tellen in de meeste gevallen NIET mee.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Neem contact op met VluchtelingenWerk',
    },
    r_strafblad_check: {
      type: 'wacht', icoon: '🔍',
      titel: 'Controleer of je een strafblad hebt',
      sub: 'Je kunt een Verklaring Omtrent Gedrag (VOG) aanvragen om te zien wat er geregistreerd staat.',
      alternatieven: [
        { naam: 'VOG aanvragen', tekst: 'Vraag een Verklaring Omtrent Gedrag aan via justis.nl.' },
        { naam: 'Gratis voor bijstandsgerechtigden', tekst: 'Als je een uitkering hebt, kan de VOG gratis zijn.' },
        { naam: 'Kleine boetes tellen niet', tekst: 'Verkeersboetes en kleine overtredingen tellen meestal NIET mee.' },
        { naam: 'Juridisch advies', tekst: 'Bij twijfel: raadpleeg een juridisch adviseur of VluchtelingenWerk.' },
      ],
      link: 'https://www.justis.nl/producten/vog', linkTekst: '→ VOG aanvragen op justis.nl',
    },
    r_geen_verblijf: {
      type: 'negatief', icoon: '🏠',
      titel: 'Je hoofdverblijf moet in Nederland zijn',
      sub: 'Als je grotendeels in het buitenland woont, voldoe je niet aan de wooneis voor naturalisatie.',
      alternatieven: [
        { naam: 'Hoofdverblijf verplaatsen', tekst: 'Verplaats je officiële hoofdverblijf naar Nederland.' },
        { naam: 'BRP-inschrijving', tekst: 'Zorg dat je ingeschreven staat in de BRP bij je gemeente.' },
        { naam: 'Reizen is OK', tekst: 'Af en toe naar het buitenland reizen is geen probleem, als je Nederland als basis hebt.' },
        { naam: 'Meer informatie', tekst: 'Vraag bij je gemeente naar de exacte eisen voor de woonplaats.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Meer informatie op ind.nl',
    },
    r_nationaliteit: {
      type: 'wacht', icoon: '🌍',
      titel: 'Afstand doen van nationaliteit is een grote stap',
      sub: 'Nederland staat meestal geen dubbele nationaliteit toe. Er zijn wel uitzonderingen — lees dit goed door voordat je beslist.',
      alternatieven: [
        { naam: 'Uitzondering statushouders', tekst: 'Als erkend vluchteling hoef je GEEN afstand te doen van je nationaliteit.' },
        { naam: 'Uitzondering: onmogelijk', tekst: 'Als afstand doen onmogelijk of gevaarlijk is, kan er een uitzondering zijn.' },
        { naam: 'Uitzondering: NL partner', tekst: 'Ben je getrouwd met een Nederlander? Dan gelden speciale regels.' },
        { naam: 'Juridisch advies', tekst: 'Laat jouw situatie beoordelen — soms is er meer mogelijk dan je denkt.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Alle uitzonderingen op ind.nl',
    },
    r_kosten: {
      type: 'wacht', icoon: '💶',
      titel: 'Er zijn mogelijkheden om de kosten te verlagen',
      sub: 'De naturalisatiekosten zijn €1.044 (2025) — maar er zijn manieren om dit betaalbaar te maken.',
      alternatieven: [
        { naam: 'Gemeentelijk fonds', tekst: 'Sommige gemeenten vergoeden de kosten (deels) voor statushouders.' },
        { naam: 'Bijzondere bijstand', tekst: 'Vraag bijzondere bijstand aan bij je gemeente voor de legeskosten.' },
        { naam: 'VluchtelingenWerk', tekst: 'Zij weten welke fondsen beschikbaar zijn in jouw gemeente.' },
        { naam: 'Sparen', tekst: 'Spaar het bedrag terwijl je de overige documenten verzamelt.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Hulp bij kosten via VluchtelingenWerk',
    },
  },
};

// ─── EN ───────────────────────────────────────────────────────────────────
window._NAT.EN = {
  header: {
    badge: '🇳🇱 Naturalisation Checker',
    titel: 'Am I eligible for a Dutch passport?',
    sub: 'Answer a few questions and find out immediately whether you can apply for naturalisation — based on the IND requirements for 2025.',
  },
  vragen: {
    v1: {
      stap: 'Step 1 of 9',
      tekst: 'Are you 18 years of age or older?',
      uitleg: 'Naturalisation can only be applied for by adults. Separate rules apply for minor children via their parents.',
      antwoorden: [
        { tekst: 'Yes, I am 18 or older', icoon: '✓', klasse: 'ja', volgende: 'v1b' },
        { tekst: 'No, I am younger than 18', icoon: '✗', klasse: 'nee', volgende: 'r_minderjarig' },
      ]
    },
    v1b: {
      stap: 'Step 2 of 9',
      tekst: 'What is your current residence status in the Netherlands?',
      uitleg: 'The way you reside in the Netherlands determines which route applies. EU citizens reside under EU law — not through a Dutch residence permit.',
      antwoorden: [
        { tekst: 'I have a Dutch residence permit', sub: 'Or an asylum status (IND type III, IV or V)', icoon: '📄', klasse: 'ja', volgende: 'v2' },
        { tekst: 'I am an EU citizen (e.g. Romanian or Polish passport)', sub: 'Or a citizen of the EEA/Switzerland', icoon: '🇪🇺', klasse: 'anders', volgende: 'r_eu_burger' },
        { tekst: 'I am not sure', icoon: '❓', klasse: 'anders', volgende: 'v2' },
      ]
    },
    v2: {
      stap: 'Step 3 of 9',
      tekst: 'Do you have a valid residence permit?',
      uitleg: 'You need a valid residence permit. An asylum status (temporary or permanent) also counts.',
      antwoorden: [
        { tekst: 'Yes, I have a valid residence permit', sub: 'Or an asylum status (IND type III, IV or V)', icoon: '✓', klasse: 'ja', volgende: 'v3' },
        { tekst: 'No, I do not have a valid residence permit', icoon: '✗', klasse: 'nee', volgende: 'r_geen_vergunning' },
      ]
    },
    v3: {
      stap: 'Step 4 of 9',
      tekst: 'How long have you lived continuously in the Netherlands?',
      uitleg: 'You normally need to have lived in the Netherlands for at least 5 consecutive years. Short trips abroad do not break this.',
      antwoorden: [
        { tekst: 'Less than 5 years', icoon: '⏳', klasse: 'nee', volgende: 'r_te_kort' },
        { tekst: '5 years or longer', sub: 'Continuous residence in the Netherlands', icoon: '✓', klasse: 'ja', volgende: 'v4a' },
      ]
    },
    v4a: {
      stap: 'Step 5 of 9 — Civic integration',
      tekst: 'What is the status of your civic integration (inburgering)?',
      uitleg: 'For naturalisation you must prove that you have integrated. There are several ways to do this.',
      antwoorden: [
        { tekst: 'I have passed the civic integration exam (B1 or education route)', sub: 'DUO integration diploma obtained', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'I have a Dutch-language MBO 2, 3 or 4 diploma — or an HBO / WO degree', sub: 'This gives a permanent exemption from the integration obligation', icoon: '🎓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'I am exempt or released from integration', sub: 'E.g. due to age (65+), medical reason or demonstrable effort', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'I have completed the Z-route (final interview + certificate)', sub: 'Note: this does not automatically entitle you to naturalisation — check your options', icoon: '🌱', klasse: 'anders', volgende: 'v4a_z' },
        { tekst: 'I am still working on civic integration', sub: 'I do not yet have a diploma or exemption', icoon: '⏳', klasse: 'anders', volgende: 'v4b' },
      ]
    },
    v4a_z: {
      stap: 'Step 5 of 9 — Z-route',
      tekst: 'You have completed the Z-route — one extra step is needed for naturalisation',
      uitleg: 'The Z-route ends with a final interview and certificate, but naturalisation requires additional language requirements from the IND. There are three paths:<br><br><strong>Path A — Still pass the exam at A2 level</strong><br>Pass all language exams at A2 level (reading, listening, writing, speaking) plus the KNM exam. Note: once the Z-route is finished, exam attempts are no longer free.<br><br><strong>Path B — 600 hours of language lessons + at least 3 attempts per component</strong><br>At least 600 hours at a Blik op Werk certified institution and 3 attempts per component? DUO can issue an exemption recommendation without a passed exam.<br><br><strong>Path C — 600 hours of literacy/language + DUO test (€150)</strong><br>At least 600 hours of literacy training and a DUO test showing A2 is not achievable? An exemption follows.<br><br>💡 Consult your municipality or VluchtelingenWerk about the best path for your situation.',
      antwoorden: [
        { tekst: 'I understand — continue to the remaining requirements', icoon: '→', klasse: 'ja', volgende: 'v5' },
      ]
    },
    v4b: {
      stap: 'Step 5 of 9 — Learning route',
      tekst: 'Which integration route are you following?',
      uitleg: 'The municipality determines your learning route based on your learning ability. There are three routes: B1, Education route and Z-route.',
      antwoorden: [
        { tekst: 'B1 route', sub: 'Language exam at B1 level + KNM exam', icoon: '📖', klasse: 'info', volgende: 'r_bezig_b1' },
        { tekst: 'Education route', sub: 'Language transition programme 1.5–2 years — preparation for MBO/HBO/WO', icoon: '🏫', klasse: 'info', volgende: 'r_bezig_onderwijs' },
        { tekst: 'Z-route (Self-sufficiency route)', sub: 'For people for whom B1 is not achievable', icoon: '🌱', klasse: 'anders', volgende: 'v4b_z' },
        { tekst: 'I do not know / I do not have a route yet', icoon: '❓', klasse: 'anders', volgende: 'r_geen_inburgering' },
      ]
    },
    v4b_z: {
      stap: 'Step 5 of 9 — Z-route',
      tekst: 'How far along are you in the Z-route?',
      uitleg: 'The Z-route ends with a final interview at the municipality and a positive DUO recommendation. Both are required for naturalisation.',
      antwoorden: [
        { tekst: 'I have completed the Z-route (received positive DUO recommendation)', sub: 'Final interview with municipality completed', icoon: '✓', klasse: 'ja', volgende: 'v4a_z' },
        { tekst: 'I am still working on the Z-route', sub: 'Have not yet completed the 800 hours of language lessons / participation', icoon: '⏳', klasse: 'anders', volgende: 'r_bezig_z' },
      ]
    },
    v5: {
      stap: 'Step 6 of 9',
      tekst: 'Have you been convicted of a criminal offence in the past 5 years?',
      uitleg: 'A criminal conviction can block naturalisation. Traffic fines and minor offences generally do not count.',
      antwoorden: [
        { tekst: 'No, I have no criminal record', icoon: '✓', klasse: 'ja', volgende: 'v6' },
        { tekst: 'Yes, I have been convicted of a criminal offence', icoon: '✗', klasse: 'nee', volgende: 'r_strafblad' },
        { tekst: 'I am not sure', icoon: '❓', klasse: 'anders', volgende: 'r_strafblad_check' },
      ]
    },
    v6: {
      stap: 'Step 7 of 9',
      tekst: 'Is your main place of residence currently in the Netherlands?',
      uitleg: 'You must have your main residence in the Netherlands. Occasional travel abroad is not a problem.',
      antwoorden: [
        { tekst: 'Yes, I live permanently in the Netherlands', icoon: '✓', klasse: 'ja', volgende: 'v7' },
        { tekst: 'No, I mainly live abroad', icoon: '✗', klasse: 'nee', volgende: 'r_geen_verblijf' },
      ]
    },
    v7: {
      stap: 'Step 8 of 9',
      tekst: 'Are you willing to renounce your current nationality?',
      uitleg: 'The Netherlands generally does not allow dual nationality. Exception: recognised refugees (status holders) may keep both nationalities.',
      antwoorden: [
        { tekst: 'Yes, I will renounce my nationality', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'I am a recognised refugee (status holder)', sub: 'Status holders may keep dual nationality', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'No, I want to keep my nationality', icoon: '✗', klasse: 'nee', volgende: 'r_nationaliteit' },
      ]
    },
    v8: {
      stap: 'Step 9 of 9',
      tekst: 'Are you aware of the costs of naturalisation?',
      uitleg: 'The application costs €1,044 (2025). The procedure takes an average of 6–12 months.',
      antwoorden: [
        { tekst: 'Yes, I am aware and want to proceed', icoon: '✓', klasse: 'ja', volgende: 'r_positief' },
        { tekst: 'That is too expensive — are there subsidies?', icoon: '💡', klasse: 'anders', volgende: 'r_kosten' },
      ]
    },
  },
  resultaten: {
    r_positief: {
      type: 'positief', icoon: '🎉',
      titel: 'You are likely eligible!',
      sub: 'Based on your answers you meet the main requirements for naturalisation. The next step is an official application at your municipality.',
      info: '💡 Status holders (recognised refugees) generally do not have to renounce their original nationality.',
      stappen: [
        { nr: 1, tekst: '<strong>Make an appointment at your municipality</strong> — civil affairs department. Say that you want to apply for naturalisation.' },
        { nr: 2, tekst: '<strong>Gather documents:</strong> valid passport, residence permit, proof of integration, birth certificate (legalised if necessary).' },
        { nr: 3, tekst: '<strong>Pay the fee:</strong> €1,044 on submission (2025). Ask your municipality whether a contribution scheme is available.' },
        { nr: 4, tekst: '<strong>Wait for the decision</strong> from the IND. This takes an average of 6–12 months.' },
        { nr: 5, tekst: '<strong>Naturalisation ceremony:</strong> after approval you will receive an invitation to the ceremony at your municipality.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ More information at ind.nl',
    },
    r_eu_burger: {
      type: 'eu', icoon: '🇪🇺',
      titel: 'As an EU citizen you have different rights',
      sub: 'Naturalisation as a Dutch citizen is possible, but you do not need Dutch citizenship to live and work here. As an EU citizen you already have extensive rights in the Netherlands.',
      infoBoxen: [
        { type: 'info', tekst: '🇪🇺 <strong>EU citizenship rights:</strong> As a Romanian or Polish citizen you have the right to live, work and study in the Netherlands — without a residence permit. You register with the municipality (BRP), but an IND permit is not required.' },
        { type: 'amber', tekst: '⚠️ <strong>Note on dual nationality:</strong> If you naturalise as a Dutch citizen, you must in principle renounce your Romanian or Polish nationality. Romania and Poland do not always allow this. Check with the embassy before you start.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Still want to naturalise?</strong> Standard requirements also apply to EU citizens: 5 years\' continuous residence, integration, no criminal record, renunciation of nationality.' },
        { nr: 2, tekst: '<strong>Dual nationality:</strong> Ask the Romanian or Polish embassy whether you can keep your nationality after naturalisation. Rules differ per country.' },
        { nr: 3, tekst: '<strong>Want to continue?</strong> Go through the checker again and choose "residence permit" for the residence status question — the other requirements also apply to EU citizens.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Naturalisation information at ind.nl',
    },
    r_minderjarig: {
      type: 'wacht', icoon: '🎂',
      titel: 'Naturalisation for children goes through the parents',
      sub: 'Minor children can naturalise together with a parent who applies for or already has Dutch nationality.',
      alternatieven: [
        { naam: 'Naturalise together', tekst: 'If your parent naturalises, you can automatically naturalise with them.' },
        { naam: 'Via the court', tekst: 'In some cases separate naturalisation for minors is possible.' },
        { naam: 'Wait until 18', tekst: 'At 18 you can apply independently.' },
        { naam: 'Option procedure', tekst: 'If you were born in the Netherlands, you can sometimes become Dutch via the "option" procedure.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden', linkTekst: '→ More information at ind.nl',
    },
    r_geen_vergunning: {
      type: 'negatief', icoon: '📋',
      titel: 'You first need a residence permit',
      sub: 'Naturalisation is only possible if you reside legally in the Netherlands. First obtain a valid residence permit.',
      alternatieven: [
        { naam: 'Asylum application', tekst: 'If you need protection, you can submit an asylum application to the IND.' },
        { naam: 'Regular permit', tekst: 'For work, study or family reunification, regular permits are available.' },
        { naam: 'Legal help', tekst: 'Contact a refugee organisation or lawyer.' },
        { naam: 'VluchtelingenWerk', tekst: 'Free legal support for asylum seekers and status holders.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Contact VluchtelingenWerk',
    },
    r_te_kort: {
      type: 'wacht', icoon: '⏳',
      titel: 'Not yet long enough in the Netherlands',
      sub: 'You must have lived in the Netherlands for at least 5 consecutive years. Use the waiting time well.',
      alternatieven: [
        { naam: 'Complete integration', tekst: 'Use the waiting time to pass your civic integration exam.' },
        { naam: 'Gather documents', tekst: 'Request official documents from your country of origin in advance.' },
        { naam: 'Learn Dutch', tekst: 'Improve your Dutch — also free via the Solidari NT2 course.' },
        { naam: 'Shorter waiting period?', tekst: 'With a Dutch partner the period can be shorter. Ask your municipality.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Check the requirements at ind.nl',
    },
    r_bezig_b1: {
      type: 'route', icoon: '📖',
      titel: 'You can already start preparing your naturalisation',
      sub: 'You are following the B1 route but have not yet completed the exam. You can start the naturalisation procedure already — the diploma must be ready before the IND makes a decision.',
      infoBoxen: [
        { type: 'blauw', tekst: '💡 <strong>Tip:</strong> Ask your municipality whether you can already submit the naturalisation application while you are still completing the B1 route.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Continue with the B1 route:</strong> pass the language exam (B1, or A2 with demonstrable effort) and the KNM exam.' },
        { nr: 2, tekst: '<strong>Request documents in advance:</strong> passport, birth certificate, residence permit.' },
        { nr: 3, tekst: '<strong>Ask your municipality</strong> whether you can already submit the application while still completing the route.' },
        { nr: 4, tekst: '<strong>After obtaining the diploma:</strong> send the proof to the municipality/IND — then the decision can be made.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ More information at ind.nl',
    },
    r_bezig_onderwijs: {
      type: 'route', icoon: '🏫',
      titel: 'You can already start preparing your naturalisation',
      sub: 'You are following the Education route — an intensive language transition programme of 1.5 to 2 years aimed at entry into MBO, HBO or WO.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>Important:</strong> The Education route is not an MBO or HBO diploma and does not exempt you from integration. You must still pass the central integration exam (B1 language exam + KNM) to fulfil your integration obligation.' },
        { type: 'blauw', tekst: '💡 <strong>Tip:</strong> You can start the naturalisation procedure already. The integration diploma must be ready before the IND makes a decision.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Complete the Education route:</strong> pass the language exam (B1 in reading, listening, writing and speaking) and the KNM exam.' },
        { nr: 2, tekst: '<strong>Request documents in advance:</strong> passport, birth certificate, residence permit.' },
        { nr: 3, tekst: '<strong>Ask your municipality</strong> whether you can already submit the application while still completing the route.' },
        { nr: 4, tekst: '<strong>After obtaining the diploma:</strong> send the proof to the municipality/IND.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ More information at ind.nl',
    },
    r_bezig_z: {
      type: 'route', icoon: '🌱',
      titel: 'Naturalising via the Z-route — an important difference',
      sub: 'Completing the Z-route does not automatically mean you meet the integration requirement for naturalisation. There are three paths via DUO.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>Important:</strong> The Z-route has no exam obligation but an effort obligation (800 hours of language lessons + final interview). Completing it does <em>not</em> automatically entitle you to naturalisation. You additionally need a DUO exemption recommendation or a passed A2 exam.' },
      ],
      paden: [
        { nr: 'A', titel: 'Still pass the integration exam at A2 level', tekst: 'Pass all language exams at A2 level (reading, listening, writing, speaking) plus the KNM exam. After passing you have a DUO diploma and meet the integration requirement for naturalisation.' },
        { nr: 'B', titel: '600 hours of language lessons (A2) + at least 3 attempts per exam component', tekst: 'At least 600 hours of A2-level language lessons at a Blik op Werk certified institution and at least 3 attempts per component (including at least 1 A2 exam)? DUO can issue an exemption recommendation — even without a passed exam.' },
        { nr: 'C', titel: '600 hours of literacy/language lessons + DUO test (no learning capacity) — €150', tekst: 'At least 600 hours of literacy training at a Blik op Werk certified institution and a DUO test showing A2 is not achievable? An exemption follows. The DUO test costs €150.' },
      ],
      info: '📞 <strong>Advice:</strong> Consult your municipality or VluchtelingenWerk about which path best suits your situation.',
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Help via VluchtelingenWerk',
    },
    r_geen_inburgering: {
      type: 'wacht', icoon: '📚',
      titel: 'You need civic integration for naturalisation',
      sub: 'Without an integration diploma or exemption you cannot apply for naturalisation. Start now — in 1 to 3 years you will be ready.',
      alternatieven: [
        { naam: 'Request your learning route', tekst: 'Go to your municipality to find out which route suits you (B1, Education route or Z-route).' },
        { naam: 'NT2 course via Solidari', tekst: 'Learn Dutch for free via the NT2 course on this website (when solar power is available).' },
        { naam: 'Apply for the exam', tekst: 'If you already speak sufficient Dutch, you can apply directly for the exam via DUO.' },
        { naam: 'Exemption possible?', tekst: 'Check whether you qualify for exemption (65+, medical reason, or an exempting diploma).' },
      ],
      link: 'https://www.inburgeren.nl', linkTekst: '→ More about integration at inburgeren.nl',
    },
    r_strafblad: {
      type: 'negatief', icoon: '⚖️',
      titel: 'A criminal record can block naturalisation',
      sub: 'Depending on the type of conviction and how long ago, this may be an obstacle. Have a specialist assess your situation.',
      alternatieven: [
        { naam: 'Legal advice', tekst: 'Ask a legal adviser whether your situation forms an obstacle to naturalisation.' },
        { naam: 'VluchtelingenWerk', tekst: 'Free legal help for status holders.' },
        { naam: 'Waiting period', tekst: 'After a certain waiting period (depending on the conviction) you can reapply.' },
        { naam: 'Minor fines', tekst: 'Traffic fines and minor offences generally do NOT count.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Contact VluchtelingenWerk',
    },
    r_strafblad_check: {
      type: 'wacht', icoon: '🔍',
      titel: 'Check whether you have a criminal record',
      sub: 'You can request a Certificate of Conduct (VOG) to see what is registered.',
      alternatieven: [
        { naam: 'Request a VOG', tekst: 'Request a Certificate of Conduct (VOG) via justis.nl.' },
        { naam: 'Free for benefit recipients', tekst: 'If you receive a benefit, the VOG may be free.' },
        { naam: 'Minor fines do not count', tekst: 'Traffic fines and minor offences generally do NOT count.' },
        { naam: 'Legal advice', tekst: 'If in doubt: consult a legal adviser or VluchtelingenWerk.' },
      ],
      link: 'https://www.justis.nl/producten/vog', linkTekst: '→ Request a VOG at justis.nl',
    },
    r_geen_verblijf: {
      type: 'negatief', icoon: '🏠',
      titel: 'Your main residence must be in the Netherlands',
      sub: 'If you mainly live abroad, you do not meet the residence requirement for naturalisation.',
      alternatieven: [
        { naam: 'Move your main residence', tekst: 'Move your official main residence to the Netherlands.' },
        { naam: 'BRP registration', tekst: 'Make sure you are registered in the BRP at your municipality.' },
        { naam: 'Travel is OK', tekst: 'Occasional travel abroad is not a problem, as long as the Netherlands is your base.' },
        { naam: 'More information', tekst: 'Ask your municipality about the exact residence requirements.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ More information at ind.nl',
    },
    r_nationaliteit: {
      type: 'wacht', icoon: '🌍',
      titel: 'Renouncing nationality is a major step',
      sub: 'The Netherlands generally does not allow dual nationality. There are exceptions — read this carefully before deciding.',
      alternatieven: [
        { naam: 'Exception: status holders', tekst: 'As a recognised refugee you do NOT have to renounce your nationality.' },
        { naam: 'Exception: impossible', tekst: 'If renunciation is impossible or dangerous, an exception may apply.' },
        { naam: 'Exception: Dutch partner', tekst: 'Are you married to a Dutch citizen? Special rules apply.' },
        { naam: 'Legal advice', tekst: 'Have your situation assessed — sometimes more is possible than you think.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ All exceptions at ind.nl',
    },
    r_kosten: {
      type: 'wacht', icoon: '💶',
      titel: 'There are ways to reduce the costs',
      sub: 'Naturalisation costs €1,044 (2025) — but there are ways to make this affordable.',
      alternatieven: [
        { naam: 'Municipal fund', tekst: 'Some municipalities reimburse the costs (partly) for status holders.' },
        { naam: 'Special assistance', tekst: 'Apply for special assistance (bijzondere bijstand) at your municipality for the fees.' },
        { naam: 'VluchtelingenWerk', tekst: 'They know which funds are available in your municipality.' },
        { naam: 'Save up', tekst: 'Save the amount while you gather the other documents.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Help with costs via VluchtelingenWerk',
    },
  },
};

// ─── AR ───────────────────────────────────────────────────────────────────
window._NAT.AR = {
  header: {
    badge: '🇳🇱 فاحص التجنيس',
    titel: 'هل أنا مؤهل للحصول على جواز سفر هولندي؟',
    sub: 'أجب على بعض الأسئلة واعرف فوراً إذا كان بإمكانك تقديم طلب التجنيس — بناءً على شروط IND لعام 2025.',
  },
  vragen: {
    v1: {
      stap: 'الخطوة 1 من 9',
      tekst: 'هل عمرك 18 سنة أو أكثر؟',
      uitleg: 'لا يمكن تقديم طلب التجنيس إلا للبالغين. تنطبق على الأطفال القاصرين قواعد خاصة عبر الوالدين.',
      antwoorden: [
        { tekst: 'نعم، عمري 18 سنة أو أكثر', icoon: '✓', klasse: 'ja', volgende: 'v1b' },
        { tekst: 'لا، عمري أقل من 18 سنة', icoon: '✗', klasse: 'nee', volgende: 'r_minderjarig' },
      ]
    },
    v1b: {
      stap: 'الخطوة 2 من 9',
      tekst: 'ما هي وضعية إقامتك الحالية في هولندا؟',
      uitleg: 'طريقة إقامتك في هولندا تحدد المسار المناسب لك. المواطنون الأوروبيون يقيمون بموجب قانون الاتحاد الأوروبي — لا بموجب تصريح إقامة هولندي.',
      antwoorden: [
        { tekst: 'لديّ تصريح إقامة هولندي', sub: 'أو وضع لجوء (IND نوع III أو IV أو V)', icoon: '📄', klasse: 'ja', volgende: 'v2' },
        { tekst: 'أنا مواطن في الاتحاد الأوروبي (مثلاً جواز سفر روماني أو بولندي)', sub: 'أو مواطن في المنطقة الاقتصادية الأوروبية / سويسرا', icoon: '🇪🇺', klasse: 'anders', volgende: 'r_eu_burger' },
        { tekst: 'لست متأكداً', icoon: '❓', klasse: 'anders', volgende: 'v2' },
      ]
    },
    v2: {
      stap: 'الخطوة 3 من 9',
      tekst: 'هل لديك تصريح إقامة سارٍ؟',
      uitleg: 'تحتاج إلى تصريح إقامة سارٍ. وضع اللجوء (إقامة لجوء محددة أو غير محددة المدة) يُحتسب أيضاً.',
      antwoorden: [
        { tekst: 'نعم، لديّ تصريح إقامة سارٍ', sub: 'أو وضع لجوء (IND نوع III أو IV أو V)', icoon: '✓', klasse: 'ja', volgende: 'v3' },
        { tekst: 'لا، ليس لديّ تصريح إقامة سارٍ', icoon: '✗', klasse: 'nee', volgende: 'r_geen_vergunning' },
      ]
    },
    v3: {
      stap: 'الخطوة 4 من 9',
      tekst: 'منذ متى تقيم باستمرار في هولندا؟',
      uitleg: 'يجب عادةً أن تكون قد أقمت في هولندا 5 سنوات متواصلة على الأقل. الرحلات القصيرة إلى الخارج لا تقطع هذه المدة.',
      antwoorden: [
        { tekst: 'أقل من 5 سنوات', icoon: '⏳', klasse: 'nee', volgende: 'r_te_kort' },
        { tekst: '5 سنوات أو أكثر', sub: 'إقامة متواصلة في هولندا', icoon: '✓', klasse: 'ja', volgende: 'v4a' },
      ]
    },
    v4a: {
      stap: 'الخطوة 5 من 9 — الاندماج',
      tekst: 'ما هو وضع اندماجك (inburgering)؟',
      uitleg: 'للتجنيس يجب إثبات اندماجك. هناك عدة طرق لذلك.',
      antwoorden: [
        { tekst: 'اجتزت امتحان الاندماج (مسار B1 أو مسار التعليم)', sub: 'حاصل على دبلوم اندماج من DUO', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'لديّ دبلوم MBO مستوى 2 أو 3 أو 4 باللغة الهولندية — أو شهادة HBO / WO', sub: 'هذا يمنح إعفاءً دائماً من التزام الاندماج', icoon: '🎓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'أنا معفى من الاندماج', sub: 'مثلاً بسبب العمر (65+) أو سبب طبي أو جهد موثق', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'أتممت مسار Z (المقابلة النهائية + الشهادة)', sub: 'تنبيه: هذا لا يمنح حق التجنيس تلقائياً — راجع خياراتك', icoon: '🌱', klasse: 'anders', volgende: 'v4a_z' },
        { tekst: 'أنا لا أزال في مرحلة الاندماج', sub: 'لم أحصل بعد على دبلوم أو إعفاء', icoon: '⏳', klasse: 'anders', volgende: 'v4b' },
      ]
    },
    v4a_z: {
      stap: 'الخطوة 5 من 9 — مسار Z',
      tekst: 'أتممت مسار Z — هناك خطوة إضافية مطلوبة للتجنيس',
      uitleg: 'مسار Z يختتم بمقابلة نهائية وشهادة، لكن التجنيس يتطلب شروط لغوية إضافية من IND. هناك ثلاثة مسارات:<br><br><strong>المسار A — اجتياز الامتحان على مستوى A2</strong><br>اجتاز جميع اختبارات اللغة على مستوى A2 (قراءة، استماع، كتابة، كلام) بالإضافة إلى امتحان KNM. تنبيه: بعد انتهاء مسار Z لم تعد محاولات الامتحان مجانية.<br><br><strong>المسار B — 600 ساعة تعليم لغوي + 3 محاولات على الأقل لكل مكون</strong><br>600 ساعة على الأقل في مؤسسة معتمدة من Blik op Werk و3 محاولات لكل مكون؟ يمكن لـ DUO إصدار توصية إعفاء بدون اجتياز الامتحان.<br><br><strong>المسار C — 600 ساعة محو أمية + اختبار DUO (150 يورو)</strong><br>600 ساعة تعليم ويثبت الاختبار عدم إمكانية تحقيق A2؟ يمنح الإعفاء.<br><br>💡 استشر بلديتك أو منظمة VluchtelingenWerk لمعرفة أنسب مسار لك.',
      antwoorden: [
        { tekst: 'فهمت — المضي قدماً في الشروط الأخرى', icoon: '→', klasse: 'ja', volgende: 'v5' },
      ]
    },
    v4b: {
      stap: 'الخطوة 5 من 9 — مسار التعلم',
      tekst: 'أي مسار اندماج تتبع؟',
      uitleg: 'البلدية تحدد مسار تعلمك بناءً على قدرتك. هناك ثلاثة مسارات: B1، مسار التعليم، ومسار Z.',
      antwoorden: [
        { tekst: 'مسار B1', sub: 'امتحان لغوي على مستوى B1 + امتحان KNM', icoon: '📖', klasse: 'info', volgende: 'r_bezig_b1' },
        { tekst: 'مسار التعليم', sub: 'برنامج لغوي انتقالي 1.5–2 سنة — تحضير لـ MBO/HBO/WO', icoon: '🏫', klasse: 'info', volgende: 'r_bezig_onderwijs' },
        { tekst: 'مسار Z (مسار الاعتماد على النفس)', sub: 'للأشخاص الذين لا يستطيعون بلوغ مستوى B1', icoon: '🌱', klasse: 'anders', volgende: 'v4b_z' },
        { tekst: 'لا أعرف / لا يوجد لديّ مسار بعد', icoon: '❓', klasse: 'anders', volgende: 'r_geen_inburgering' },
      ]
    },
    v4b_z: {
      stap: 'الخطوة 5 من 9 — مسار Z',
      tekst: 'أين أنت في مسار Z؟',
      uitleg: 'مسار Z يختتم بمقابلة نهائية مع البلدية وتوصية إيجابية من DUO. كلاهما مطلوب للتجنيس.',
      antwoorden: [
        { tekst: 'أتممت مسار Z (تلقيت توصية إيجابية من DUO)', sub: 'اكتملت المقابلة النهائية مع البلدية', icoon: '✓', klasse: 'ja', volgende: 'v4a_z' },
        { tekst: 'لا أزال في مسار Z', sub: 'لم أُنهِ بعد 800 ساعة تعليم لغوي / مشاركة', icoon: '⏳', klasse: 'anders', volgende: 'r_bezig_z' },
      ]
    },
    v5: {
      stap: 'الخطوة 6 من 9',
      tekst: 'هل صدر بحقك حكم جنائي خلال السنوات الخمس الماضية؟',
      uitleg: 'الإدانة الجنائية قد تحول دون التجنيس. المخالفات المرورية والمخالفات البسيطة لا تُحتسب عادةً.',
      antwoorden: [
        { tekst: 'لا، ليس لديّ سجل جنائي', icoon: '✓', klasse: 'ja', volgende: 'v6' },
        { tekst: 'نعم، صدر بحقي حكم جنائي', icoon: '✗', klasse: 'nee', volgende: 'r_strafblad' },
        { tekst: 'لست متأكداً', icoon: '❓', klasse: 'anders', volgende: 'r_strafblad_check' },
      ]
    },
    v6: {
      stap: 'الخطوة 7 من 9',
      tekst: 'هل إقامتك الرئيسية حالياً في هولندا؟',
      uitleg: 'يجب أن تكون إقامتك الرئيسية في هولندا. السفر إلى الخارج أحياناً لا يمثل مشكلة.',
      antwoorden: [
        { tekst: 'نعم، أقيم بشكل دائم في هولندا', icoon: '✓', klasse: 'ja', volgende: 'v7' },
        { tekst: 'لا، أقيم بصورة رئيسية في الخارج', icoon: '✗', klasse: 'nee', volgende: 'r_geen_verblijf' },
      ]
    },
    v7: {
      stap: 'الخطوة 8 من 9',
      tekst: 'هل أنت مستعد للتنازل عن جنسيتك الحالية؟',
      uitleg: 'لا تسمح هولندا في الغالب بازدواجية الجنسية. استثناء: اللاجئون المعترف بهم (أصحاب وضع اللاجئ) يمكنهم الاحتفاظ بكلتا الجنسيتين.',
      antwoorden: [
        { tekst: 'نعم، سأتنازل عن جنسيتي', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'أنا لاجئ معترف به (صاحب وضع لجوء)', sub: 'أصحاب وضع اللجوء يمكنهم الاحتفاظ بازدواجية الجنسية', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'لا، أريد الاحتفاظ بجنسيتي', icoon: '✗', klasse: 'nee', volgende: 'r_nationaliteit' },
      ]
    },
    v8: {
      stap: 'الخطوة 9 من 9',
      tekst: 'هل أنت على علم بتكاليف التجنيس؟',
      uitleg: 'تكلف الطلب 1,044 يورو (2025). تستغرق الإجراءات في المتوسط 6–12 شهراً.',
      antwoorden: [
        { tekst: 'نعم، أعلم وأريد المتابعة', icoon: '✓', klasse: 'ja', volgende: 'r_positief' },
        { tekst: 'هذا غالٍ جداً — هل هناك دعم مالي؟', icoon: '💡', klasse: 'anders', volgende: 'r_kosten' },
      ]
    },
  },
  resultaten: {
    r_positief: {
      type: 'positief', icoon: '🎉',
      titel: 'على الأرجح أنت مؤهل!',
      sub: 'بناءً على إجاباتك تستوفي الشروط الرئيسية للتجنيس. الخطوة التالية هي تقديم طلب رسمي في بلديتك.',
      info: '💡 أصحاب وضع اللجوء (اللاجئون المعترف بهم) في معظم الحالات لا يحتاجون للتنازل عن جنسيتهم الأصلية.',
      stappen: [
        { nr: 1, tekst: '<strong>احجز موعداً في بلديتك</strong> — قسم الشؤون المدنية. أخبرهم أنك تريد تقديم طلب التجنيس.' },
        { nr: 2, tekst: '<strong>اجمع الوثائق:</strong> جواز سفر ساري، تصريح إقامة، إثبات الاندماج، شهادة الميلاد (مصدقة إذا لزم).' },
        { nr: 3, tekst: '<strong>ادفع الرسوم:</strong> 1,044 يورو عند التقديم (2025). استفسر من البلدية عن وجود خطة مساهمة.' },
        { nr: 4, tekst: '<strong>انتظر قرار</strong> IND. يستغرق ذلك في المتوسط 6–12 شهراً.' },
        { nr: 5, tekst: '<strong>حفل التجنيس:</strong> بعد الموافقة ستتلقى دعوة لحضور حفل التجنيس في البلدية.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ مزيد من المعلومات على ind.nl',
    },
    r_eu_burger: {
      type: 'eu', icoon: '🇪🇺',
      titel: 'بصفتك مواطناً في الاتحاد الأوروبي لديك حقوق مختلفة',
      sub: 'التجنيس كهولندي ممكن، لكنك لست بحاجة إلى الجنسية الهولندية للعيش والعمل هنا. بصفتك مواطناً أوروبياً لديك بالفعل حقوق واسعة في هولندا.',
      infoBoxen: [
        { type: 'info', tekst: '🇪🇺 <strong>حقوق المواطنة الأوروبية:</strong> بصفتك مواطناً رومانياً أو بولندياً لديك الحق في الإقامة والعمل والدراسة في هولندا — بدون تصريح إقامة. تسجل نفسك في البلدية (BRP)، لكن لا تحتاج إلى تصريح IND.' },
        { type: 'amber', tekst: '⚠️ <strong>تنبيه بشأن ازدواجية الجنسية:</strong> إذا تجنست كهولندي يجب عموماً التنازل عن جنسيتك الرومانية أو البولندية. رومانيا وبولندا لا تسمحان بذلك دائماً. استفسر من السفارة قبل البدء.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>تريد التجنيس رغم ذلك؟</strong> الشروط الأساسية تنطبق أيضاً على مواطني الاتحاد الأوروبي: 5 سنوات إقامة متواصلة، اندماج، لا سجل جنائي، التنازل عن الجنسية.' },
        { nr: 2, tekst: '<strong>ازدواجية الجنسية:</strong> استفسر من السفارة الرومانية أو البولندية عما إذا كان بإمكانك الاحتفاظ بجنسيتك بعد التجنيس. القواعد تختلف من بلد لآخر.' },
        { nr: 3, tekst: '<strong>تريد المتابعة؟</strong> أعد استخدام الأداة واختر "تصريح إقامة" — الشروط الأخرى تنطبق أيضاً على مواطني الاتحاد الأوروبي.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ معلومات التجنيس على ind.nl',
    },
    r_minderjarig: {
      type: 'wacht', icoon: '🎂',
      titel: 'تجنيس الأطفال يتم عبر الوالدين',
      sub: 'يمكن للأطفال القاصرين الانضمام إلى تجنيس أحد الوالدين الذي يتقدم بالطلب أو يملك الجنسية الهولندية بالفعل.',
      alternatieven: [
        { naam: 'التجنيس المشترك', tekst: 'إذا تجنس والدك/والدتك، يمكنك التجنيس معهم تلقائياً.' },
        { naam: 'عبر المحكمة', tekst: 'في بعض الحالات يمكن تجنيس القاصرين بشكل منفصل.' },
        { naam: 'الانتظار حتى 18', tekst: 'عند بلوغك 18 يمكنك التقديم بشكل مستقل.' },
        { naam: 'خيار التجنيس', tekst: 'إذا وُلدت في هولندا يمكنك أحياناً التجنيس عبر "خيار" (optie).' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden', linkTekst: '→ مزيد من المعلومات على ind.nl',
    },
    r_geen_vergunning: {
      type: 'negatief', icoon: '📋',
      titel: 'تحتاج أولاً إلى تصريح إقامة',
      sub: 'التجنيس ممكن فقط إذا كنت تقيم قانونياً في هولندا. احصل أولاً على تصريح إقامة سارٍ.',
      alternatieven: [
        { naam: 'طلب اللجوء', tekst: 'إذا كنت بحاجة إلى حماية يمكنك تقديم طلب لجوء إلى IND.' },
        { naam: 'تصريح منتظم', tekst: 'للعمل أو الدراسة أو لم الشمل العائلي هناك تصاريح منتظمة.' },
        { naam: 'مساعدة قانونية', tekst: 'تواصل مع منظمة لاجئين أو محامٍ.' },
        { naam: 'VluchtelingenWerk', tekst: 'دعم قانوني مجاني لطالبي اللجوء وأصحاب وضع اللجوء.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ تواصل مع VluchtelingenWerk',
    },
    r_te_kort: {
      type: 'wacht', icoon: '⏳',
      titel: 'لم تُقم في هولندا مدة كافية بعد',
      sub: 'يجب أن تكون قد أقمت في هولندا 5 سنوات متواصلة على الأقل. يمكنك الاستفادة من وقت الانتظار.',
      alternatieven: [
        { naam: 'إتمام الاندماج', tekst: 'استخدم وقت الانتظار لاجتياز امتحان الاندماج.' },
        { naam: 'جمع الوثائق', tekst: 'اطلب مسبقاً الوثائق الرسمية من بلدك الأصلي.' },
        { naam: 'تعلم اللغة الهولندية', tekst: 'حسّن لغتك الهولندية — أيضاً مجاناً عبر دورة Solidari NT2.' },
        { naam: 'مدة أقصر؟', tekst: 'مع شريك هولندي قد تكون المدة أقصر. استفسر من بلديتك.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ تحقق من الشروط على ind.nl',
    },
    r_bezig_b1: {
      type: 'route', icoon: '📖',
      titel: 'يمكنك البدء في التحضير لتجنيسك',
      sub: 'أنت تتبع مسار B1 لكنك لم تُنهِ الامتحان بعد. يمكنك بدء إجراءات التجنيس مسبقاً — يجب أن يكون الدبلوم جاهزاً قبل اتخاذ IND قراراً.',
      infoBoxen: [
        { type: 'blauw', tekst: '💡 <strong>نصيحة:</strong> استفسر من بلديتك إذا كان بإمكانك تقديم طلب التجنيس مسبقاً بينما لا تزال تُتم مسار B1.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>تابع مسار B1:</strong> اجتاز الامتحان اللغوي (B1 أو A2 مع جهد موثق) وامتحان KNM.' },
        { nr: 2, tekst: '<strong>اطلب الوثائق مسبقاً:</strong> جواز سفر، شهادة ميلاد، تصريح إقامة.' },
        { nr: 3, tekst: '<strong>استفسر من بلديتك</strong> إذا كان بإمكانك تقديم الطلب بينما لا تزال في مرحلة التعلم.' },
        { nr: 4, tekst: '<strong>بعد الحصول على الدبلوم:</strong> أرسل الإثبات إلى البلدية / IND — عندها يمكن اتخاذ القرار.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ مزيد من المعلومات على ind.nl',
    },
    r_bezig_onderwijs: {
      type: 'route', icoon: '🏫',
      titel: 'يمكنك البدء في التحضير لتجنيسك',
      sub: 'أنت تتبع مسار التعليم — برنامج لغوي انتقالي مكثف لمدة 1.5 إلى 2 سنة بهدف الالتحاق بـ MBO أو HBO أو WO.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>تنبيه:</strong> مسار التعليم ليس دبلوم MBO أو HBO ولا يعفيك من الاندماج. يجب اجتياز الامتحان المركزي للاندماج (امتحان B1 اللغوي + KNM) لاستيفاء التزام الاندماج.' },
        { type: 'blauw', tekst: '💡 <strong>نصيحة:</strong> يمكنك بدء إجراءات التجنيس مسبقاً. يجب أن يكون دبلوم الاندماج جاهزاً قبل اتخاذ IND قراراً.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>أتم مسار التعليم:</strong> اجتاز الامتحان اللغوي (B1 في القراءة والاستماع والكتابة والكلام) وامتحان KNM.' },
        { nr: 2, tekst: '<strong>اطلب الوثائق مسبقاً:</strong> جواز سفر، شهادة ميلاد، تصريح إقامة.' },
        { nr: 3, tekst: '<strong>استفسر من بلديتك</strong> إذا كان بإمكانك تقديم الطلب بينما لا تزال تُتم المسار.' },
        { nr: 4, tekst: '<strong>بعد الحصول على الدبلوم:</strong> أرسل الإثبات إلى البلدية / IND.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ مزيد من المعلومات على ind.nl',
    },
    r_bezig_z: {
      type: 'route', icoon: '🌱',
      titel: 'التجنيس عبر مسار Z — فرق مهم',
      sub: 'إتمام مسار Z لا يعني تلقائياً استيفاء شرط الاندماج للتجنيس. هناك ثلاثة مسارات عبر DUO.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>هام:</strong> مسار Z لا يتطلب اجتياز امتحان بل يتطلب بذل جهد (800 ساعة تعليم لغوي + مقابلة نهائية). الإتمام لا يمنح تلقائياً حق التجنيس. تحتاج إضافةً إلى توصية إعفاء من DUO أو اجتياز امتحان A2.' },
      ],
      paden: [
        { nr: 'A', titel: 'اجتياز امتحان الاندماج على مستوى A2', tekst: 'اجتاز جميع اختبارات اللغة على مستوى A2 (قراءة، استماع، كتابة، كلام) وامتحان KNM. بعد النجاح ستحصل على دبلوم DUO وتستوفي شرط الاندماج للتجنيس.' },
        { nr: 'B', titel: '600 ساعة تعليم لغوي (A2) + 3 محاولات على الأقل لكل مكون', tekst: '600 ساعة على الأقل من التعليم اللغوي على مستوى A2 في مؤسسة معتمدة من Blik op Werk و3 محاولات على الأقل لكل مكون (منها محاولة A2 واحدة على الأقل)؟ يمكن لـ DUO إصدار توصية إعفاء دون اجتياز الامتحان.' },
        { nr: 'C', titel: '600 ساعة محو أمية أو تعليم لغوي + اختبار DUO (لا قدرة تعلم) — 150 يورو', tekst: '600 ساعة على الأقل من محو الأمية في مؤسسة معتمدة من Blik op Werk ويُثبت اختبار DUO عدم إمكانية تحقيق A2؟ يتبع الإعفاء. يكلف اختبار DUO 150 يورو.' },
      ],
      info: '📞 <strong>استشارة:</strong> تشاور مع بلديتك أو VluchtelingenWerk لمعرفة أنسب مسار لوضعك.',
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ مساعدة عبر VluchtelingenWerk',
    },
    r_geen_inburgering: {
      type: 'wacht', icoon: '📚',
      titel: 'تحتاج إلى الاندماج للتجنيس',
      sub: 'بدون دبلوم اندماج أو إعفاء لا يمكنك التقدم بطلب التجنيس. ابدأ الآن — خلال 1 إلى 3 سنوات ستكون مستعداً.',
      alternatieven: [
        { naam: 'اعرف مسار تعلمك', tekst: 'اذهب إلى بلديتك لمعرفة المسار المناسب لك (B1، مسار التعليم، أو مسار Z).' },
        { naam: 'دورة NT2 عبر Solidari', tekst: 'تعلم الهولندية مجاناً عبر دورة NT2 على هذا الموقع (عند توفر الطاقة الشمسية).' },
        { naam: 'التقدم للامتحان', tekst: 'إذا كنت تتحدث الهولندية بشكل كافٍ يمكنك التقدم مباشرة للامتحان عبر DUO.' },
        { naam: 'إعفاء محتمل؟', tekst: 'استفسر إذا كنت مؤهلاً للإعفاء (65+، سبب طبي، أو دبلوم معفٍ).' },
      ],
      link: 'https://www.inburgeren.nl', linkTekst: '→ مزيد عن الاندماج على inburgeren.nl',
    },
    r_strafblad: {
      type: 'negatief', icoon: '⚖️',
      titel: 'السجل الجنائي قد يعيق التجنيس',
      sub: 'حسب نوع الإدانة ومتى حدثت قد تشكل عائقاً. اطلب من متخصص تقييم وضعك.',
      alternatieven: [
        { naam: 'استشارة قانونية', tekst: 'استفسر من مستشار قانوني إذا كان وضعك يشكل عائقاً للتجنيس.' },
        { naam: 'VluchtelingenWerk', tekst: 'مساعدة قانونية مجانية لأصحاب وضع اللجوء.' },
        { naam: 'مدة الانتظار', tekst: 'بعد مدة انتظار محددة (تعتمد على الحكم) يمكنك التقديم من جديد.' },
        { naam: 'الغرامات الصغيرة', tekst: 'المخالفات المرورية والمخالفات الصغيرة لا تُحتسب في الغالب.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ تواصل مع VluchtelingenWerk',
    },
    r_strafblad_check: {
      type: 'wacht', icoon: '🔍',
      titel: 'تحقق مما إذا كان لديك سجل جنائي',
      sub: 'يمكنك طلب شهادة حسن سيرة وسلوك (VOG) لمعرفة ما هو مسجل.',
      alternatieven: [
        { naam: 'طلب VOG', tekst: 'اطلب شهادة حسن سيرة وسلوك عبر justis.nl.' },
        { naam: 'مجانية لمتلقي الإعانات', tekst: 'إذا كنت تتلقى إعانة قد تكون الشهادة مجانية.' },
        { naam: 'الغرامات الصغيرة لا تُحتسب', tekst: 'المخالفات المرورية والمخالفات الصغيرة لا تُحتسب في الغالب.' },
        { naam: 'استشارة قانونية', tekst: 'عند الشك: استشر مستشاراً قانونياً أو VluchtelingenWerk.' },
      ],
      link: 'https://www.justis.nl/producten/vog', linkTekst: '→ طلب VOG على justis.nl',
    },
    r_geen_verblijf: {
      type: 'negatief', icoon: '🏠',
      titel: 'يجب أن تكون إقامتك الرئيسية في هولندا',
      sub: 'إذا كنت تقيم بصورة رئيسية في الخارج فلا تستوفي شرط الإقامة للتجنيس.',
      alternatieven: [
        { naam: 'نقل إقامتك الرئيسية', tekst: 'انقل إقامتك الرسمية الرئيسية إلى هولندا.' },
        { naam: 'التسجيل في BRP', tekst: 'تأكد من تسجيلك في BRP لدى بلديتك.' },
        { naam: 'السفر مقبول', tekst: 'السفر إلى الخارج أحياناً مقبول ما دامت هولندا قاعدتك الأساسية.' },
        { naam: 'مزيد من المعلومات', tekst: 'استفسر من بلديتك عن الشروط الدقيقة للإقامة.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ مزيد من المعلومات على ind.nl',
    },
    r_nationaliteit: {
      type: 'wacht', icoon: '🌍',
      titel: 'التنازل عن الجنسية خطوة كبيرة',
      sub: 'لا تسمح هولندا في الغالب بازدواجية الجنسية. هناك استثناءات — اقرأها جيداً قبل القرار.',
      alternatieven: [
        { naam: 'استثناء أصحاب وضع اللجوء', tekst: 'كلاجئ معترف به لا تحتاج للتنازل عن جنسيتك.' },
        { naam: 'استثناء: التنازل مستحيل', tekst: 'إذا كان التنازل مستحيلاً أو خطيراً قد يكون هناك استثناء.' },
        { naam: 'استثناء: شريك هولندي', tekst: 'هل أنت متزوج من هولندي/هولندية؟ تنطبق قواعد خاصة.' },
        { naam: 'استشارة قانونية', tekst: 'اطلب تقييم وضعك — أحياناً هناك إمكانيات أكثر مما تتصور.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ جميع الاستثناءات على ind.nl',
    },
    r_kosten: {
      type: 'wacht', icoon: '💶',
      titel: 'هناك طرق لتخفيض التكاليف',
      sub: 'تكاليف التجنيس 1,044 يورو (2025) — لكن هناك طرق لجعلها ميسورة.',
      alternatieven: [
        { naam: 'صندوق البلدية', tekst: 'بعض البلديات تُعيد التكاليف (جزئياً) لأصحاب وضع اللجوء.' },
        { naam: 'المساعدة الخاصة', tekst: 'قدّم طلب مساعدة خاصة (bijzondere bijstand) في بلديتك لتغطية الرسوم.' },
        { naam: 'VluchtelingenWerk', tekst: 'يعرفون الصناديق المتاحة في بلديتك.' },
        { naam: 'الادخار', tekst: 'ادخر المبلغ بينما تجمع باقي الوثائق.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ مساعدة في التكاليف عبر VluchtelingenWerk',
    },
  },
};

// ─── TR ───────────────────────────────────────────────────────────────────
window._NAT.TR = {
  header: {
    badge: '🇳🇱 Vatandaşlık Denetleyicisi',
    titel: 'Hollanda pasaportu için uygun muyum?',
    sub: 'Birkaç soruyu yanıtlayın ve IND 2025 şartlarına göre vatandaşlık başvurusu yapıp yapamayacağınızı hemen öğrenin.',
  },
  vragen: {
    v1: {
      stap: 'Adım 1 / 9',
      tekst: '18 yaşında veya daha büyük müsünüz?',
      uitleg: 'Vatandaşlık başvurusu yalnızca yetişkinler tarafından yapılabilir. Reşit olmayan çocuklar için ebeveynler aracılığıyla ayrı kurallar geçerlidir.',
      antwoorden: [
        { tekst: 'Evet, 18 yaşında veya daha büyüğüm', icoon: '✓', klasse: 'ja', volgende: 'v1b' },
        { tekst: 'Hayır, 18 yaşından küçüğüm', icoon: '✗', klasse: 'nee', volgende: 'r_minderjarig' },
      ]
    },
    v1b: {
      stap: 'Adım 2 / 9',
      tekst: 'Hollanda\'daki mevcut ikamet statünüz nedir?',
      uitleg: 'Hollanda\'da ikamet biçiminiz hangi yolun geçerli olduğunu belirler. AB vatandaşları AB hukuku kapsamında ikamet eder — Hollanda ikamet izniyle değil.',
      antwoorden: [
        { tekst: 'Hollanda ikamet iznim var', sub: 'Ya da sığınmacı statüsü (IND tip III, IV veya V)', icoon: '📄', klasse: 'ja', volgende: 'v2' },
        { tekst: 'AB vatandaşıyım (örn. Romanya veya Polonya pasaportu)', sub: 'Ya da AEA / İsviçre vatandaşı', icoon: '🇪🇺', klasse: 'anders', volgende: 'r_eu_burger' },
        { tekst: 'Emin değilim', icoon: '❓', klasse: 'anders', volgende: 'v2' },
      ]
    },
    v2: {
      stap: 'Adım 3 / 9',
      tekst: 'Geçerli bir ikamet izniniz var mı?',
      uitleg: 'Geçerli bir ikamet iznine ihtiyacınız var. Sığınmacı statüsü (belirli veya belirsiz süreli) de geçerlidir.',
      antwoorden: [
        { tekst: 'Evet, geçerli bir ikamet iznim var', sub: 'Ya da sığınmacı statüsü (IND tip III, IV veya V)', icoon: '✓', klasse: 'ja', volgende: 'v3' },
        { tekst: 'Hayır, geçerli ikamet iznim yok', icoon: '✗', klasse: 'nee', volgende: 'r_geen_vergunning' },
      ]
    },
    v3: {
      stap: 'Adım 4 / 9',
      tekst: 'Hollanda\'da kesintisiz ne kadar süredir ikamet ediyorsunuz?',
      uitleg: 'Normalde Hollanda\'da en az 5 yıl kesintisiz ikamet etmiş olmanız gerekir. Kısa yurt dışı seyahatleri bu süreyi kesmez.',
      antwoorden: [
        { tekst: '5 yıldan az', icoon: '⏳', klasse: 'nee', volgende: 'r_te_kort' },
        { tekst: '5 yıl veya daha fazla', sub: 'Hollanda\'da kesintisiz ikamet', icoon: '✓', klasse: 'ja', volgende: 'v4a' },
      ]
    },
    v4a: {
      stap: 'Adım 5 / 9 — Entegrasyon',
      tekst: 'Entegrasyon (inburgering) durumunuz nedir?',
      uitleg: 'Vatandaşlık için entegre olduğunuzu kanıtlamanız gerekir. Bunun birden fazla yolu vardır.',
      antwoorden: [
        { tekst: 'Entegrasyon sınavını geçtim (B1 veya eğitim rotası)', sub: 'DUO entegrasyon diploması mevcut', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Hollandaca MBO 2, 3 veya 4 diplomam var — ya da HBO / WO diploması', sub: 'Bu, entegrasyon yükümlülüğünden kalıcı muafiyet sağlar', icoon: '🎓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Entegrasyondan muafım ya da istisna tanındı', sub: 'Örn. yaş (65+), tıbbi neden veya kanıtlanmış çaba nedeniyle', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Z-rotasını tamamladım (son görüşme + sertifika)', sub: 'Dikkat: bu otomatik olarak vatandaşlık hakkı vermez — seçeneklerinize bakın', icoon: '🌱', klasse: 'anders', volgende: 'v4a_z' },
        { tekst: 'Hâlâ entegrasyon sürecindeyim', sub: 'Henüz diploma veya muafiyetim yok', icoon: '⏳', klasse: 'anders', volgende: 'v4b' },
      ]
    },
    v4a_z: {
      stap: 'Adım 5 / 9 — Z-rotası',
      tekst: 'Z-rotasını tamamladınız — vatandaşlık için bir ek adım gerekiyor',
      uitleg: 'Z-rotası son bir görüşme ve sertifikayla sona erer; ancak vatandaşlık için IND\'nin ek dil şartları vardır. Üç yol mevcuttur:<br><br><strong>Yol A — A2 düzeyinde sınava girmek</strong><br>Tüm dil sınavlarından A2 düzeyinde geçin (okuma, dinleme, yazma, konuşma) ve KNM sınavını geçin. Z-rotası tamamlandığında sınav denemeleri artık ücretsiz değildir.<br><br><strong>Yol B — 600 saat dil dersi + her bileşen için en az 3 deneme</strong><br>Blik op Werk onaylı bir kurumda en az 600 saatlik A2 dil dersi ve her bileşen için en az 3 deneme? DUO, sınavı geçmeden muafiyet tavsiyesi verebilir.<br><br><strong>Yol C — 600 saat okuryazarlık / dil eğitimi + DUO testi (150 €)</strong><br>En az 600 saat eğitim ve DUO testi A2\'nin ulaşılamaz olduğunu gösterirse muafiyet verilir.<br><br>💡 Hangi yolun size en uygun olduğunu belirlemek için belediyenize veya VluchtelingenWerk\'e danışın.',
      antwoorden: [
        { tekst: 'Anladım — diğer koşullara devam et', icoon: '→', klasse: 'ja', volgende: 'v5' },
      ]
    },
    v4b: {
      stap: 'Adım 5 / 9 — Öğrenme rotası',
      tekst: 'Hangi entegrasyon rotasını izliyorsunuz?',
      uitleg: 'Belediye, öğrenme kapasitenize göre rotanızı belirler. Üç rota vardır: B1, Eğitim rotası ve Z-rotası.',
      antwoorden: [
        { tekst: 'B1 rotası', sub: 'B1 düzeyinde dil sınavı + KNM sınavı', icoon: '📖', klasse: 'info', volgende: 'r_bezig_b1' },
        { tekst: 'Eğitim rotası', sub: 'MBO/HBO/WO\'ya hazırlık için 1,5–2 yıllık dil geçiş programı', icoon: '🏫', klasse: 'info', volgende: 'r_bezig_onderwijs' },
        { tekst: 'Z-rotası (Öz-yeterlilik rotası)', sub: 'B1\'e ulaşamayacak kişiler için', icoon: '🌱', klasse: 'anders', volgende: 'v4b_z' },
        { tekst: 'Bilmiyorum / henüz bir rotam yok', icoon: '❓', klasse: 'anders', volgende: 'r_geen_inburgering' },
      ]
    },
    v4b_z: {
      stap: 'Adım 5 / 9 — Z-rotası',
      tekst: 'Z-rotasında ne kadar ilerlettiniz?',
      uitleg: 'Z-rotası, belediyede yapılan son görüşme ve DUO\'nun olumlu tavsiyesiyle tamamlanır. İkisi de vatandaşlık için gereklidir.',
      antwoorden: [
        { tekst: 'Z-rotasını tamamladım (DUO olumlu tavsiyesini aldım)', sub: 'Belediyeyle son görüşme tamamlandı', icoon: '✓', klasse: 'ja', volgende: 'v4a_z' },
        { tekst: 'Hâlâ Z-rotasındayım', sub: '800 saatlik dil dersi / katılımı henüz tamamlamadım', icoon: '⏳', klasse: 'anders', volgende: 'r_bezig_z' },
      ]
    },
    v5: {
      stap: 'Adım 6 / 9',
      tekst: 'Son 5 yılda suçtan mahkûm oldunuz mu?',
      uitleg: 'Cezai mahkûmiyet vatandaşlığı engelleyebilir. Trafik para cezaları ve küçük ihlaller genellikle sayılmaz.',
      antwoorden: [
        { tekst: 'Hayır, adli sicilik yok', icoon: '✓', klasse: 'ja', volgende: 'v6' },
        { tekst: 'Evet, suçtan mahkûm oldum', icoon: '✗', klasse: 'nee', volgende: 'r_strafblad' },
        { tekst: 'Emin değilim', icoon: '❓', klasse: 'anders', volgende: 'r_strafblad_check' },
      ]
    },
    v6: {
      stap: 'Adım 7 / 9',
      tekst: 'Şu anda ana ikamet yeriniz Hollanda mı?',
      uitleg: 'Ana ikametinizin Hollanda\'da olması gerekir. Ara sıra yurt dışına çıkmak sorun değil.',
      antwoorden: [
        { tekst: 'Evet, kalıcı olarak Hollanda\'da yaşıyorum', icoon: '✓', klasse: 'ja', volgende: 'v7' },
        { tekst: 'Hayır, büyük ölçüde yurt dışında yaşıyorum', icoon: '✗', klasse: 'nee', volgende: 'r_geen_verblijf' },
      ]
    },
    v7: {
      stap: 'Adım 8 / 9',
      tekst: 'Mevcut vatandaşlığınızdan vazgeçmeye hazır mısınız?',
      uitleg: 'Hollanda kural olarak çifte vatandaşlığa izin vermez. İstisna: tanınmış mülteciler (statü sahipleri) her iki vatandaşlığı koruyabilir.',
      antwoorden: [
        { tekst: 'Evet, vatandaşlığımdan vazgeçeceğim', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'Tanınmış mülteciim (statü sahibi)', sub: 'Statü sahipleri çifte vatandaşlığı koruyabilir', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'Hayır, vatandaşlığımı korumak istiyorum', icoon: '✗', klasse: 'nee', volgende: 'r_nationaliteit' },
      ]
    },
    v8: {
      stap: 'Adım 9 / 9',
      tekst: 'Vatandaşlık masraflarından haberdar mısınız?',
      uitleg: 'Başvuru 1.044 € tutar (2025). Prosedür ortalama 6–12 ay sürer.',
      antwoorden: [
        { tekst: 'Evet, biliyorum ve devam etmek istiyorum', icoon: '✓', klasse: 'ja', volgende: 'r_positief' },
        { tekst: 'Bu çok pahalı — sübvansiyon var mı?', icoon: '💡', klasse: 'anders', volgende: 'r_kosten' },
      ]
    },
  },
  resultaten: {
    r_positief: {
      type: 'positief', icoon: '🎉',
      titel: 'Muhtemelen uygunsunuz!',
      sub: 'Yanıtlarınıza göre vatandaşlık için temel şartları karşılıyorsunuz. Bir sonraki adım belediyenize resmi başvuru yapmaktır.',
      info: '💡 Statü sahipleri (tanınmış mülteciler) çoğu durumda orijinal vatandaşlıklarından vazgeçmek zorunda değildir.',
      stappen: [
        { nr: 1, tekst: '<strong>Belediyenizden randevu alın</strong> — nüfus işleri birimi. Vatandaşlık başvurusu yapmak istediğinizi söyleyin.' },
        { nr: 2, tekst: '<strong>Belgelerinizi toplayın:</strong> geçerli pasaport, ikamet izni, entegrasyon belgesi, doğum belgesi (gerekirse onaylı).' },
        { nr: 3, tekst: '<strong>Harç ödeyin:</strong> başvuruda 1.044 € (2025). Belediyenizden katkı planı olup olmadığını sorun.' },
        { nr: 4, tekst: '<strong>IND kararını bekleyin.</strong> Bu ortalama 6–12 ay sürer.' },
        { nr: 5, tekst: '<strong>Vatandaşlık töreni:</strong> onaydan sonra belediyede düzenlenen törence davet alacaksınız.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ ind.nl\'de daha fazla bilgi',
    },
    r_eu_burger: {
      type: 'eu', icoon: '🇪🇺',
      titel: 'AB vatandaşı olarak farklı haklarınız var',
      sub: 'Hollanda vatandaşlığına geçmek mümkündür; ancak burada yaşamak ve çalışmak için Hollanda vatandaşlığına sahip olmanız gerekmez. AB vatandaşı olarak Hollanda\'da zaten geniş haklara sahipsiniz.',
      infoBoxen: [
        { type: 'info', tekst: '🇪🇺 <strong>AB vatandaşlık hakları:</strong> Rumen veya Polonyalı vatandaş olarak ikamet izni olmadan Hollanda\'da yaşama, çalışma ve okuma hakkına sahipsiniz. Belediyeye kayıt olursunuz (BRP), ancak IND izni gerekmez.' },
        { type: 'amber', tekst: '⚠️ <strong>Çifte vatandaşlık uyarısı:</strong> Hollanda vatandaşlığına geçerseniz kural olarak Rumen veya Polonya vatandaşlığınızdan vazgeçmeniz gerekir. Romanya ve Polonya buna her zaman izin vermez. Başlamadan önce büyükelçiliğe danışın.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Yine de vatandaşlığa geçmek istiyor musunuz?</strong> Standart şartlar AB vatandaşları için de geçerlidir: 5 yıl kesintisiz ikamet, entegrasyon, adli sicil yok, vatandaşlıktan vazgeçme.' },
        { nr: 2, tekst: '<strong>Çifte vatandaşlık:</strong> Vatandaşlığa geçişten sonra kendi vatandaşlığınızı koruyup koruyamayacağınızı Rumen veya Polonyalı büyükelçiliğe sorun. Kurallar ülkeden ülkeye değişir.' },
        { nr: 3, tekst: '<strong>Devam etmek ister misiniz?</strong> Denetleyiciyi yeniden çalıştırın ve ikamet statüsünde "ikamet izni" seçeneğini seçin — diğer şartlar AB vatandaşları için de geçerlidir.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ ind.nl\'de vatandaşlık bilgisi',
    },
    r_minderjarig: {
      type: 'wacht', icoon: '🎂',
      titel: 'Çocuklar için vatandaşlık ebeveynler aracılığıyla alınır',
      sub: 'Reşit olmayan çocuklar, bir ebeveyn Hollanda vatandaşlığı başvurusu yaparsa ya da zaten sahipse birlikte vatandaşlığa alınabilir.',
      alternatieven: [
        { naam: 'Birlikte vatandaşlık', tekst: 'Ebeveyniniz vatandaşlığa geçerse siz de otomatik olarak geçebilirsiniz.' },
        { naam: 'Mahkeme aracılığıyla', tekst: 'Bazı durumlarda küçükler için ayrı vatandaşlık mümkündür.' },
        { naam: '18\'i bekleyin', tekst: '18 yaşında bağımsız başvuru yapabilirsiniz.' },
        { naam: 'Opsiyon prosedürü', tekst: 'Hollanda\'da doğduysanız bazen "opsiyon" yoluyla Hollandalı olabilirsiniz.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden', linkTekst: '→ ind.nl\'de daha fazla bilgi',
    },
    r_geen_vergunning: {
      type: 'negatief', icoon: '📋',
      titel: 'Önce ikamet iznine ihtiyacınız var',
      sub: 'Vatandaşlık yalnızca Hollanda\'da yasal olarak ikamet ediyorsanız mümkündür. Önce geçerli bir ikamet izni alın.',
      alternatieven: [
        { naam: 'Sığınma başvurusu', tekst: 'Korumaya ihtiyaç duyuyorsanız IND\'ye sığınma başvurusu yapabilirsiniz.' },
        { naam: 'Normal izin', tekst: 'İş, öğrenim veya aile birleşimi için düzenli izinler mevcuttur.' },
        { naam: 'Hukuki yardım', tekst: 'Bir mülteci kuruluşu veya avukatla iletişime geçin.' },
        { naam: 'VluchtelingenWerk', tekst: 'Sığınmacılar ve statü sahipleri için ücretsiz hukuki destek.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ VluchtelingenWerk ile iletişime geçin',
    },
    r_te_kort: {
      type: 'wacht', icoon: '⏳',
      titel: 'Hollanda\'da henüz yeterince uzun süre ikamet etmediniz',
      sub: 'Hollanda\'da en az 5 yıl kesintisiz ikamet etmiş olmanız gerekir. Bekleme süresini iyi değerlendirin.',
      alternatieven: [
        { naam: 'Entegrasyonu tamamlayın', tekst: 'Bekleme süresinde entegrasyon sınavınızı geçin.' },
        { naam: 'Belgeleri toplayın', tekst: 'Menşe ülkenizden resmi belgelerinizi önceden talep edin.' },
        { naam: 'Hollandaca öğrenin', tekst: 'Hollandacenizi geliştirin — Solidari NT2 kursu aracılığıyla ücretsiz de mümkün.' },
        { naam: 'Daha kısa süre?', tekst: 'Hollandalı eşiniz varsa süre kısa olabilir. Belediyenize danışın.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ ind.nl\'de şartları kontrol edin',
    },
    r_bezig_b1: {
      type: 'route', icoon: '📖',
      titel: 'Vatandaşlığınızı şimdiden hazırlamaya başlayabilirsiniz',
      sub: 'B1 rotasını izliyorsunuz ancak sınavı henüz tamamlamadınız. Vatandaşlık prosedürünü şimdiden başlatabilirsiniz — IND karar vermeden önce diploma hazır olmalıdır.',
      infoBoxen: [
        { type: 'blauw', tekst: '💡 <strong>İpucu:</strong> Belediyenize, B1 rotasını tamamlarken vatandaşlık başvurusunu önceden yapıp yapamayacağınızı sorun.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>B1 rotasına devam edin:</strong> dil sınavını (B1 veya kanıtlanmış çabayla A2) ve KNM sınavını geçin.' },
        { nr: 2, tekst: '<strong>Önceden belgelerinizi talep edin:</strong> pasaport, doğum belgesi, ikamet izni.' },
        { nr: 3, tekst: '<strong>Belediyenize danışın:</strong> rotayı tamamlarken başvuru yapıp yapamayacağınızı öğrenin.' },
        { nr: 4, tekst: '<strong>Diploma alındıktan sonra:</strong> kanıtı belediyeye / IND\'ye gönderin — ardından karar alınabilir.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ ind.nl\'de daha fazla bilgi',
    },
    r_bezig_onderwijs: {
      type: 'route', icoon: '🏫',
      titel: 'Vatandaşlığınızı şimdiden hazırlamaya başlayabilirsiniz',
      sub: 'Eğitim rotasını izliyorsunuz — MBO, HBO veya WO\'ya giriş için tasarlanmış 1,5–2 yıllık yoğun bir dil geçiş programı.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>Dikkat:</strong> Eğitim rotası bir MBO veya HBO diploması değildir ve entegrasyondan muafiyet sağlamaz. Entegrasyon yükümlülüğünüzü yerine getirmek için merkezi entegrasyon sınavını (B1 dil sınavı + KNM) geçmeniz gerekir.' },
        { type: 'blauw', tekst: '💡 <strong>İpucu:</strong> Vatandaşlık prosedürünü şimdiden başlatabilirsiniz. IND karar vermeden önce entegrasyon diploması hazır olmalıdır.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Eğitim rotasını tamamlayın:</strong> dil sınavını (okuma, dinleme, yazma, konuşmada B1) ve KNM sınavını geçin.' },
        { nr: 2, tekst: '<strong>Önceden belgelerinizi talep edin:</strong> pasaport, doğum belgesi, ikamet izni.' },
        { nr: 3, tekst: '<strong>Belediyenize danışın:</strong> rotayı tamamlarken başvuru yapıp yapamayacağınızı öğrenin.' },
        { nr: 4, tekst: '<strong>Diploma alındıktan sonra:</strong> kanıtı belediyeye / IND\'ye gönderin.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ ind.nl\'de daha fazla bilgi',
    },
    r_bezig_z: {
      type: 'route', icoon: '🌱',
      titel: 'Z-rotasından vatandaşlığa — önemli bir fark',
      sub: 'Z-rotasını tamamlamak, vatandaşlık için entegrasyon şartını otomatik olarak karşıladığınız anlamına gelmez. DUO aracılığıyla üç yol vardır.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>Önemli:</strong> Z-rotasının sınav zorunluluğu yoktur, çaba zorunluluğu vardır (800 saat dil dersi + son görüşme). Tamamlamak, vatandaşlık hakkını otomatik olarak vermez. Ek olarak bir DUO muafiyet tavsiyesi veya başarılı bir A2 sınavı gerekir.' },
      ],
      paden: [
        { nr: 'A', titel: 'A2 düzeyinde sınava girerek entegrasyon sınavını geçmek', tekst: 'Tüm dil sınavlarından A2 düzeyinde geçin (okuma, dinleme, yazma, konuşma) ve KNM sınavını geçin. Geçtikten sonra DUO diplomasına sahip olursunuz ve vatandaşlık için entegrasyon şartını karşılarsınız.' },
        { nr: 'B', titel: '600 saat dil dersi (A2) + her sınav bileşeni için en az 3 deneme', tekst: 'Blik op Werk onaylı bir kurumda en az 600 saatlik A2 düzeyinde dil dersi ve bileşen başına en az 3 deneme (en az 1 A2 sınavı dahil)? DUO, sınavı geçmeden muafiyet tavsiyesi verebilir.' },
        { nr: 'C', titel: '600 saat okuryazarlık veya dil dersi + DUO testi (öğrenme kapasitesi yok) — 150 €', tekst: 'Blik op Werk onaylı bir kurumda en az 600 saatlik okuryazarlık eğitimi ve DUO testinin A2\'nin ulaşılamaz olduğunu göstermesi? Muafiyet verilir. DUO testi 150 € tutar.' },
      ],
      info: '📞 <strong>Tavsiye:</strong> Durumunuza en uygun yolu belirlemek için belediyenize veya VluchtelingenWerk\'e danışın.',
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ VluchtelingenWerk aracılığıyla yardım',
    },
    r_geen_inburgering: {
      type: 'wacht', icoon: '📚',
      titel: 'Vatandaşlık için entegrasyona ihtiyacınız var',
      sub: 'Entegrasyon diploması veya muafiyet olmadan vatandaşlık başvurusu yapamazsınız. Şimdi başlayın — 1 ila 3 yıl içinde hazır olursunuz.',
      alternatieven: [
        { naam: 'Öğrenme rotanızı öğrenin', tekst: 'Hangi rotanın size uygun olduğunu öğrenmek için belediyenize gidin (B1, Eğitim rotası veya Z-rotası).' },
        { naam: 'Solidari üzerinden NT2 kursu', tekst: 'Bu web sitesindeki NT2 kursu aracılığıyla Hollandacenizi ücretsiz geliştirin (güneş enerjisi mevcutsa).' },
        { naam: 'Sınava başvurun', tekst: 'Hollandaceniz yeterliyse DUO aracılığıyla doğrudan sınava başvurabilirsiniz.' },
        { naam: 'Muafiyet mümkün mü?', tekst: 'Muafiyete uygun olup olmadığınızı kontrol edin (65+, tıbbi neden veya muafiyet sağlayan diploma).' },
      ],
      link: 'https://www.inburgeren.nl', linkTekst: '→ inburgeren.nl\'de entegrasyon hakkında daha fazla bilgi',
    },
    r_strafblad: {
      type: 'negatief', icoon: '⚖️',
      titel: 'Adli sicil vatandaşlığı engelleyebilir',
      sub: 'Mahkûmiyetin türüne ve ne kadar önce olduğuna bağlı olarak engel teşkil edebilir. Bir uzmanın durumunuzu değerlendirmesini isteyin.',
      alternatieven: [
        { naam: 'Hukuki tavsiye', tekst: 'Durumunuzun vatandaşlık için engel oluşturup oluşturmadığını bir hukuk danışmanına sorun.' },
        { naam: 'VluchtelingenWerk', tekst: 'Statü sahipleri için ücretsiz hukuki yardım.' },
        { naam: 'Bekleme süresi', tekst: 'Belirli bir bekleme süresinden sonra (mahkûmiyete bağlı) yeniden başvurabilirsiniz.' },
        { naam: 'Küçük cezalar', tekst: 'Trafik cezaları ve küçük ihlaller çoğunlukla SAYILMAZ.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ VluchtelingenWerk ile iletişime geçin',
    },
    r_strafblad_check: {
      type: 'wacht', icoon: '🔍',
      titel: 'Adli sicil kaydınızı kontrol edin',
      sub: 'Kayıtlı olanları görmek için justis.nl aracılığıyla İyi Hal Belgesi (VOG) talep edebilirsiniz.',
      alternatieven: [
        { naam: 'VOG talep edin', tekst: 'justis.nl aracılığıyla İyi Hal Belgesi (VOG) talep edin.' },
        { naam: 'Yardım alıcıları için ücretsiz', tekst: 'Sosyal yardım alıyorsanız VOG ücretsiz olabilir.' },
        { naam: 'Küçük cezalar sayılmaz', tekst: 'Trafik cezaları ve küçük ihlaller genellikle SAYILMAZ.' },
        { naam: 'Hukuki tavsiye', tekst: 'Şüphe durumunda: bir hukuk danışmanına veya VluchtelingenWerk\'e başvurun.' },
      ],
      link: 'https://www.justis.nl/producten/vog', linkTekst: '→ justis.nl\'de VOG talep edin',
    },
    r_geen_verblijf: {
      type: 'negatief', icoon: '🏠',
      titel: 'Ana ikamet yeriniz Hollanda\'da olmalı',
      sub: 'Büyük ölçüde yurt dışında yaşıyorsanız vatandaşlık için ikamet şartını karşılamıyorsunuz demektir.',
      alternatieven: [
        { naam: 'Ana ikameti taşıyın', tekst: 'Resmi ana ikamet yerinizi Hollanda\'ya taşıyın.' },
        { naam: 'BRP kaydı', tekst: 'Belediyenizde BRP\'ye kayıtlı olduğunuzdan emin olun.' },
        { naam: 'Seyahat edilebilir', tekst: 'Ara sıra yurt dışına çıkmak, Hollanda\'yı üs olarak kullandığınız sürece sorun değildir.' },
        { naam: 'Daha fazla bilgi', tekst: 'İkamet şartlarının ayrıntıları için belediyenize danışın.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ ind.nl\'de daha fazla bilgi',
    },
    r_nationaliteit: {
      type: 'wacht', icoon: '🌍',
      titel: 'Vatandaşlıktan vazgeçmek büyük bir adım',
      sub: 'Hollanda kural olarak çifte vatandaşlığa izin vermez. İstisnalar mevcuttur — karar vermeden önce iyice okuyun.',
      alternatieven: [
        { naam: 'İstisna: statü sahipleri', tekst: 'Tanınmış mülteci olarak vatandaşlığınızdan vazgeçmek ZORUNDA değilsiniz.' },
        { naam: 'İstisna: imkânsız', tekst: 'Vazgeçmek imkânsız veya tehlikeliyse istisna uygulanabilir.' },
        { naam: 'İstisna: Hollandalı eş', tekst: 'Hollandalı biriyle evli misiniz? Özel kurallar geçerlidir.' },
        { naam: 'Hukuki tavsiye', tekst: 'Durumunuzu değerlendirin — bazen düşündüğünüzden fazlası mümkün olabilir.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ ind.nl\'de tüm istisnalar',
    },
    r_kosten: {
      type: 'wacht', icoon: '💶',
      titel: 'Maliyetleri düşürmenin yolları var',
      sub: 'Vatandaşlık maliyeti 1.044 € (2025) — ancak bunu karşılanabilir kılmanın yolları var.',
      alternatieven: [
        { naam: 'Belediye fonu', tekst: 'Bazı belediyeler statü sahipleri için maliyeti (kısmen) karşılar.' },
        { naam: 'Özel yardım', tekst: 'Harç masrafları için belediyenizden özel yardım (bijzondere bijstand) başvurusu yapın.' },
        { naam: 'VluchtelingenWerk', tekst: 'Belediyenizde hangi fonların mevcut olduğunu bilirler.' },
        { naam: 'Biriktirin', tekst: 'Diğer belgelerinizi toplarken parayı biriktirin.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ VluchtelingenWerk aracılığıyla maliyet yardımı',
    },
  },
};

// ─── UK ───────────────────────────────────────────────────────────────────
window._NAT.UK = {
  header: {
    badge: '🇳🇱 Перевірка натуралізації',
    titel: 'Чи маю я право на нідерландський паспорт?',
    sub: 'Відповідайте на кілька запитань і дізнайтеся одразу, чи можете ви подати заяву на натуралізацію — на основі вимог IND 2025.',
  },
  vragen: {
    v1: {
      stap: 'Крок 1 з 9',
      tekst: 'Вам 18 років або більше?',
      uitleg: 'Заяву на натуралізацію можуть подавати тільки повнолітні. Для неповнолітніх дітей діють окремі правила через батьків.',
      antwoorden: [
        { tekst: 'Так, мені 18 або більше', icoon: '✓', klasse: 'ja', volgende: 'v1b' },
        { tekst: 'Ні, мені менше 18 років', icoon: '✗', klasse: 'nee', volgende: 'r_minderjarig' },
      ]
    },
    v1b: {
      stap: 'Крок 2 з 9',
      tekst: 'Який ваш поточний статус проживання в Нідерландах?',
      uitleg: 'Спосіб вашого проживання в Нідерландах визначає, який шлях застосовується. Громадяни ЄС проживають на підставі права ЄС — не на підставі нідерландського дозволу на проживання.',
      antwoorden: [
        { tekst: 'Я маю нідерландський дозвіл на проживання', sub: 'Або статус притулку (IND тип III, IV або V)', icoon: '📄', klasse: 'ja', volgende: 'v2' },
        { tekst: 'Я громадянин ЄС (наприклад, румунський або польський паспорт)', sub: 'Або громадянин ЄЕЗ/Швейцарії', icoon: '🇪🇺', klasse: 'anders', volgende: 'r_eu_burger' },
        { tekst: 'Я не впевнений(-а)', icoon: '❓', klasse: 'anders', volgende: 'v2' },
      ]
    },
    v2: {
      stap: 'Крок 3 з 9',
      tekst: 'Чи маєте ви дійсний дозвіл на проживання?',
      uitleg: 'Вам потрібен дійсний дозвіл на проживання. Статус притулку (тимчасовий або постійний) також зараховується.',
      antwoorden: [
        { tekst: 'Так, я маю дійсний дозвіл на проживання', sub: 'Або статус притулку (IND тип III, IV або V)', icoon: '✓', klasse: 'ja', volgende: 'v3' },
        { tekst: 'Ні, у мене немає дійсного дозволу на проживання', icoon: '✗', klasse: 'nee', volgende: 'r_geen_vergunning' },
      ]
    },
    v3: {
      stap: 'Крок 4 з 9',
      tekst: 'Як довго ви безперервно проживаєте в Нідерландах?',
      uitleg: 'Зазвичай вам потрібно прожити в Нідерландах щонайменше 5 років поспіль. Короткі поїздки за кордон це не перериває.',
      antwoorden: [
        { tekst: 'Менше 5 років', icoon: '⏳', klasse: 'nee', volgende: 'r_te_kort' },
        { tekst: '5 років або більше', sub: 'Безперервне проживання в Нідерландах', icoon: '✓', klasse: 'ja', volgende: 'v4a' },
      ]
    },
    v4a: {
      stap: 'Крок 5 з 9 — Інтеграція',
      tekst: 'Який статус вашої громадянської інтеграції (inburgering)?',
      uitleg: 'Для натуралізації необхідно довести, що ви пройшли інтеграцію. Є кілька способів це зробити.',
      antwoorden: [
        { tekst: 'Я склав(-ла) іспит з громадянської інтеграції (маршрут B1 або освітній)', sub: 'Диплом DUO про інтеграцію отримано', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Маю нідерландськомовний диплом MBO 2, 3 або 4 — або HBO / WO', sub: 'Це дає постійне звільнення від зобов\'язання щодо інтеграції', icoon: '🎓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Я звільнений(-а) від інтеграції', sub: 'Наприклад, через вік (65+), медичну причину або доведені зусилля', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'Я завершив(-ла) Z-маршрут (фінальне інтерв\'ю + сертифікат)', sub: 'Увага: це не дає автоматичного права на натуралізацію — перевірте свої варіанти', icoon: '🌱', klasse: 'anders', volgende: 'v4a_z' },
        { tekst: 'Я ще проходжу громадянську інтеграцію', sub: 'У мене ще немає диплома або звільнення', icoon: '⏳', klasse: 'anders', volgende: 'v4b' },
      ]
    },
    v4a_z: {
      stap: 'Крок 5 з 9 — Z-маршрут',
      tekst: 'Ви завершили Z-маршрут — для натуралізації потрібен ще один крок',
      uitleg: 'Z-маршрут завершується фінальним інтерв\'ю та сертифікатом, але для натуралізації IND висуває додаткові мовні вимоги. Є три шляхи:<br><br><strong>Шлях A — Скласти іспит на рівні A2</strong><br>Складіть усі мовні іспити на рівні A2 (читання, аудіювання, письмо, усне мовлення) плюс іспит KNM. Після завершення Z-маршруту спроби іспиту більше не безкоштовні.<br><br><strong>Шлях B — 600 годин занять + щонайменше 3 спроби на кожен компонент</strong><br>Щонайменше 600 годин у сертифікованому закладі Blik op Werk і 3 спроби на компонент? DUO може видати рекомендацію про звільнення без складеного іспиту.<br><br><strong>Шлях C — 600 годин навчання + тест DUO (150 €)</strong><br>Щонайменше 600 годин навчання і тест DUO показує, що A2 недосяжний? Надається звільнення.<br><br>💡 Проконсультуйтеся з муніципалітетом або VluchtelingenWerk щодо найкращого шляху для вас.',
      antwoorden: [
        { tekst: 'Зрозуміло — перейти до решти вимог', icoon: '→', klasse: 'ja', volgende: 'v5' },
      ]
    },
    v4b: {
      stap: 'Крок 5 з 9 — Маршрут навчання',
      tekst: 'Який маршрут інтеграції ви проходите?',
      uitleg: 'Муніципалітет визначає ваш навчальний маршрут на основі ваших здібностей до навчання. Є три маршрути: B1, освітній і Z-маршрут.',
      antwoorden: [
        { tekst: 'Маршрут B1', sub: 'Мовний іспит на рівні B1 + іспит KNM', icoon: '📖', klasse: 'info', volgende: 'r_bezig_b1' },
        { tekst: 'Освітній маршрут', sub: 'Мовна перехідна програма 1,5–2 роки — підготовка до MBO/HBO/WO', icoon: '🏫', klasse: 'info', volgende: 'r_bezig_onderwijs' },
        { tekst: 'Z-маршрут (Маршрут самодостатності)', sub: 'Для тих, хто не може досягти B1', icoon: '🌱', klasse: 'anders', volgende: 'v4b_z' },
        { tekst: 'Не знаю / у мене ще немає маршруту', icoon: '❓', klasse: 'anders', volgende: 'r_geen_inburgering' },
      ]
    },
    v4b_z: {
      stap: 'Крок 5 з 9 — Z-маршрут',
      tekst: 'На якому етапі Z-маршруту ви перебуваєте?',
      uitleg: 'Z-маршрут завершується фінальним інтерв\'ю у муніципалітеті та позитивною рекомендацією DUO. Обидва є обов\'язковими для натуралізації.',
      antwoorden: [
        { tekst: 'Я завершив(-ла) Z-маршрут (отримав(-ла) позитивну рекомендацію DUO)', sub: 'Фінальне інтерв\'ю з муніципалітетом завершено', icoon: '✓', klasse: 'ja', volgende: 'v4a_z' },
        { tekst: 'Я ще проходжу Z-маршрут', sub: 'Ще не завершив(-ла) 800 годин мовних занять / участі', icoon: '⏳', klasse: 'anders', volgende: 'r_bezig_z' },
      ]
    },
    v5: {
      stap: 'Крок 6 з 9',
      tekst: 'Чи були ви засуджені за кримінальний злочин за останні 5 років?',
      uitleg: 'Кримінальний вирок може заблокувати натуралізацію. Штрафи за порушення ПДР та незначні правопорушення зазвичай не зараховуються.',
      antwoorden: [
        { tekst: 'Ні, у мене немає судимості', icoon: '✓', klasse: 'ja', volgende: 'v6' },
        { tekst: 'Так, мене засуджено за кримінальний злочин', icoon: '✗', klasse: 'nee', volgende: 'r_strafblad' },
        { tekst: 'Я не впевнений(-а)', icoon: '❓', klasse: 'anders', volgende: 'r_strafblad_check' },
      ]
    },
    v6: {
      stap: 'Крок 7 з 9',
      tekst: 'Чи є ваше основне місце проживання зараз у Нідерландах?',
      uitleg: 'Ваше основне місце проживання має бути в Нідерландах. Час від часу виїжджати за кордон — не проблема.',
      antwoorden: [
        { tekst: 'Так, я постійно проживаю в Нідерландах', icoon: '✓', klasse: 'ja', volgende: 'v7' },
        { tekst: 'Ні, я переважно проживаю за кордоном', icoon: '✗', klasse: 'nee', volgende: 'r_geen_verblijf' },
      ]
    },
    v7: {
      stap: 'Крок 8 з 9',
      tekst: 'Чи готові ви відмовитися від вашого поточного громадянства?',
      uitleg: 'Нідерланди, як правило, не дозволяють подвійне громадянство. Виняток: визнані біженці (власники статусу) можуть зберігати обидва громадянства.',
      antwoorden: [
        { tekst: 'Так, я відмовлюся від свого громадянства', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'Я визнаний(-а) біженець (власник статусу)', sub: 'Власники статусу можуть зберігати подвійне громадянство', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'Ні, я хочу зберегти своє громадянство', icoon: '✗', klasse: 'nee', volgende: 'r_nationaliteit' },
      ]
    },
    v8: {
      stap: 'Крок 9 з 9',
      tekst: 'Чи обізнані ви про вартість натуралізації?',
      uitleg: 'Заява коштує €1.044 (2025). Процедура займає в середньому 6–12 місяців.',
      antwoorden: [
        { tekst: 'Так, я знаю і хочу продовжити', icoon: '✓', klasse: 'ja', volgende: 'r_positief' },
        { tekst: 'Це занадто дорого — чи є субсидії?', icoon: '💡', klasse: 'anders', volgende: 'r_kosten' },
      ]
    },
  },
  resultaten: {
    r_positief: {
      type: 'positief', icoon: '🎉',
      titel: 'Ймовірно, ви маєте право!',
      sub: 'Виходячи з ваших відповідей, ви відповідаєте основним вимогам для натуралізації. Наступний крок — офіційна заява у вашому муніципалітеті.',
      info: '💡 Власники статусу (визнані біженці) в більшості випадків не зобов\'язані відмовлятися від початкового громадянства.',
      stappen: [
        { nr: 1, tekst: '<strong>Запишіться на прийом у вашому муніципалітеті</strong> — відділ цивільних справ. Скажіть, що хочете подати заяву на натуралізацію.' },
        { nr: 2, tekst: '<strong>Зберіть документи:</strong> дійсний паспорт, дозвіл на проживання, підтвердження інтеграції, свідоцтво про народження (легалізоване за потреби).' },
        { nr: 3, tekst: '<strong>Сплатіть збір:</strong> €1.044 при поданні (2025). Запитайте у муніципалітеті, чи є програма відшкодування.' },
        { nr: 4, tekst: '<strong>Зачекайте рішення</strong> IND. Це займає в середньому 6–12 місяців.' },
        { nr: 5, tekst: '<strong>Церемонія натуралізації:</strong> після схвалення ви отримаєте запрошення на церемонію у муніципалітеті.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Більше інформації на ind.nl',
    },
    r_eu_burger: {
      type: 'eu', icoon: '🇪🇺',
      titel: 'Як громадянин ЄС ви маєте інші права',
      sub: 'Натуралізація як нідерландський громадянин можлива, але для проживання та роботи тут нідерландське громадянство не є обов\'язковим. Як громадянин ЄС ви вже маєте широкі права в Нідерландах.',
      infoBoxen: [
        { type: 'info', tekst: '🇪🇺 <strong>Права громадянина ЄС:</strong> Як румунський або польський громадянин ви маєте право жити, працювати та навчатися в Нідерландах — без дозволу на проживання. Ви реєструєтесь у муніципалітеті (BRP), але дозвіл IND не потрібен.' },
        { type: 'amber', tekst: '⚠️ <strong>Увага щодо подвійного громадянства:</strong> Якщо ви натуралізуєтесь як нідерландський громадянин, ви зазвичай повинні відмовитися від румунського або польського громадянства. Румунія та Польща не завжди це дозволяють. Перевірте в посольстві перед початком.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Все одно хочете натуралізуватись?</strong> Стандартні вимоги також застосовуються до громадян ЄС: 5 років безперервного проживання, інтеграція, відсутність судимості, відмова від громадянства.' },
        { nr: 2, tekst: '<strong>Подвійне громадянство:</strong> Запитайте в румунському або польському посольстві, чи можете ви зберегти своє громадянство після натуралізації. Правила різняться залежно від країни.' },
        { nr: 3, tekst: '<strong>Хочете продовжити?</strong> Пройдіть перевірку знову і виберіть "дозвіл на проживання" — решта вимог також застосовується до громадян ЄС.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Інформація про натуралізацію на ind.nl',
    },
    r_minderjarig: {
      type: 'wacht', icoon: '🎂',
      titel: 'Натуралізація дітей відбувається через батьків',
      sub: 'Неповнолітні діти можуть натуралізуватись разом із батьком або матір\'ю, які подають заяву або вже мають нідерландське громадянство.',
      alternatieven: [
        { naam: 'Натуралізація разом', tekst: 'Якщо ваш батько/мати натуралізується, ви можете автоматично натуралізуватись разом.' },
        { naam: 'Через суд', tekst: 'У деяких випадках можлива окрема натуралізація неповнолітніх.' },
        { naam: 'Зачекати до 18', tekst: 'У 18 років ви можете подати заяву самостійно.' },
        { naam: 'Процедура опції', tekst: 'Якщо ви народились у Нідерландах, ви іноді можете стати нідерландцем через процедуру "опції".' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden', linkTekst: '→ Більше інформації на ind.nl',
    },
    r_geen_vergunning: {
      type: 'negatief', icoon: '📋',
      titel: 'Спочатку вам потрібен дозвіл на проживання',
      sub: 'Натуралізація можлива лише якщо ви законно проживаєте в Нідерландах. Спочатку отримайте дійсний дозвіл на проживання.',
      alternatieven: [
        { naam: 'Заява про притулок', tekst: 'Якщо вам потрібен захист, ви можете подати заяву про притулок до IND.' },
        { naam: 'Звичайний дозвіл', tekst: 'Для роботи, навчання або возз\'єднання сім\'ї є звичайні дозволи.' },
        { naam: 'Юридична допомога', tekst: 'Зверніться до організації у справах біженців або адвоката.' },
        { naam: 'VluchtelingenWerk', tekst: 'Безкоштовна юридична підтримка для шукачів притулку та власників статусу.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Зв\'яжіться з VluchtelingenWerk',
    },
    r_te_kort: {
      type: 'wacht', icoon: '⏳',
      titel: 'Ще недостатньо довго в Нідерландах',
      sub: 'Ви повинні прожити в Нідерландах щонайменше 5 років поспіль. Використайте час очікування з користю.',
      alternatieven: [
        { naam: 'Завершіть інтеграцію', tekst: 'Скористайтесь часом очікування, щоб скласти іспит з громадянської інтеграції.' },
        { naam: 'Зберіть документи', tekst: 'Заздалегідь замовте офіційні документи у вашій країні походження.' },
        { naam: 'Вивчіть нідерландську', tekst: 'Покращте свою нідерландську — також безкоштовно через курс Solidari NT2.' },
        { naam: 'Коротший термін?', tekst: 'За наявності нідерландського партнера термін може бути коротшим. Запитайте у муніципалітеті.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Перевірте вимоги на ind.nl',
    },
    r_bezig_b1: {
      type: 'route', icoon: '📖',
      titel: 'Ви вже можете починати готуватися до натуралізації',
      sub: 'Ви проходите маршрут B1, але ще не завершили іспит. Ви можете вже розпочати процедуру натуралізації — диплом має бути готовий до того, як IND прийме рішення.',
      infoBoxen: [
        { type: 'blauw', tekst: '💡 <strong>Порада:</strong> Запитайте у вашому муніципалітеті, чи можете ви вже подати заяву на натуралізацію, доки ще завершуєте маршрут B1.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Продовжуйте маршрут B1:</strong> складіть мовний іспит (B1 або A2 з доведеними зусиллями) та іспит KNM.' },
        { nr: 2, tekst: '<strong>Заздалегідь замовте документи:</strong> паспорт, свідоцтво про народження, дозвіл на проживання.' },
        { nr: 3, tekst: '<strong>Запитайте у вашому муніципалітеті,</strong> чи можна вже подати заяву під час навчання.' },
        { nr: 4, tekst: '<strong>Після отримання диплома:</strong> надішліть підтвердження до муніципалітету/IND — тоді може бути прийнято рішення.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Більше інформації на ind.nl',
    },
    r_bezig_onderwijs: {
      type: 'route', icoon: '🏫',
      titel: 'Ви вже можете починати готуватися до натуралізації',
      sub: 'Ви проходите освітній маршрут — інтенсивну мовну перехідну програму тривалістю 1,5–2 роки для вступу до MBO, HBO або WO.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>Важливо:</strong> Освітній маршрут — це не диплом MBO або HBO і не звільняє від інтеграції. Ви все одно повинні скласти центральний іспит з інтеграції (мовний іспит B1 + KNM) для виконання зобов\'язання щодо інтеграції.' },
        { type: 'blauw', tekst: '💡 <strong>Порада:</strong> Ви вже можете розпочати процедуру натуралізації. Диплом про інтеграцію має бути готовий до того, як IND прийме рішення.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>Завершіть освітній маршрут:</strong> складіть мовний іспит (B1 з читання, аудіювання, письма та мовлення) та іспит KNM.' },
        { nr: 2, tekst: '<strong>Заздалегідь замовте документи:</strong> паспорт, свідоцтво про народження, дозвіл на проживання.' },
        { nr: 3, tekst: '<strong>Запитайте у вашому муніципалітеті,</strong> чи можна вже подати заяву під час навчання.' },
        { nr: 4, tekst: '<strong>Після отримання диплома:</strong> надішліть підтвердження до муніципалітету/IND.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Більше інформації на ind.nl',
    },
    r_bezig_z: {
      type: 'route', icoon: '🌱',
      titel: 'Натуралізація через Z-маршрут — важлива відмінність',
      sub: 'Завершення Z-маршруту не означає автоматично, що ви відповідаєте вимозі інтеграції для натуралізації. Є три шляхи через DUO.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>Важливо:</strong> Z-маршрут не має зобов\'язання скласти іспит, але має зобов\'язання докласти зусиль (800 годин мовних занять + фінальне інтерв\'ю). Завершення <em>не</em> дає автоматично права на натуралізацію. Додатково потрібна рекомендація DUO про звільнення або складений іспит A2.' },
      ],
      paden: [
        { nr: 'A', titel: 'Скласти іспит з інтеграції на рівні A2', tekst: 'Складіть усі мовні іспити на рівні A2 (читання, аудіювання, письмо, мовлення) та іспит KNM. Після складання ви маєте диплом DUO і відповідаєте вимозі інтеграції для натуралізації.' },
        { nr: 'B', titel: '600 годин мовних занять (A2) + щонайменше 3 спроби на кожен компонент іспиту', tekst: 'Щонайменше 600 годин мовних занять рівня A2 у сертифікованому закладі Blik op Werk і мінімум 3 спроби на компонент (включно з щонайменше 1 іспитом A2)? DUO може видати рекомендацію про звільнення навіть без складеного іспиту.' },
        { nr: 'C', titel: '600 годин навчання грамоти або мовних занять + тест DUO (немає здатності до навчання) — €150', tekst: 'Щонайменше 600 годин навчання грамоти у сертифікованому закладі Blik op Werk і тест DUO показує, що A2 недосяжний? Надається звільнення. Тест DUO коштує €150.' },
      ],
      info: '📞 <strong>Порада:</strong> Проконсультуйтеся з вашим муніципалітетом або VluchtelingenWerk щодо найкращого шляху для вашої ситуації.',
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Допомога через VluchtelingenWerk',
    },
    r_geen_inburgering: {
      type: 'wacht', icoon: '📚',
      titel: 'Для натуралізації потрібна громадянська інтеграція',
      sub: 'Без диплома про інтеграцію або звільнення ви не можете подати заяву на натуралізацію. Починайте зараз — через 1–3 роки ви будете готові.',
      alternatieven: [
        { naam: 'Дізнайтеся свій навчальний маршрут', tekst: 'Зверніться до вашого муніципалітету, щоб дізнатись, який маршрут вам підходить (B1, освітній або Z-маршрут).' },
        { naam: 'Курс NT2 через Solidari', tekst: 'Безкоштовно вивчайте нідерландську через курс NT2 на цьому сайті (при наявності сонячної енергії).' },
        { naam: 'Подайте заяву на іспит', tekst: 'Якщо ви вже достатньо добре розмовляєте нідерландською, ви можете одразу подати заяву на іспит через DUO.' },
        { naam: 'Можливе звільнення?', tekst: 'Перевірте, чи ви маєте право на звільнення (65+, медична причина або диплом, що звільняє від інтеграції).' },
      ],
      link: 'https://www.inburgeren.nl', linkTekst: '→ Більше про інтеграцію на inburgeren.nl',
    },
    r_strafblad: {
      type: 'negatief', icoon: '⚖️',
      titel: 'Судимість може заблокувати натуралізацію',
      sub: 'Залежно від типу засудження та того, як давно це сталося, це може бути перешкодою. Зверніться до спеціаліста для оцінки вашої ситуації.',
      alternatieven: [
        { naam: 'Юридична консультація', tekst: 'Запитайте у юридичного консультанта, чи є ваша ситуація перешкодою для натуралізації.' },
        { naam: 'VluchtelingenWerk', tekst: 'Безкоштовна юридична допомога для власників статусу.' },
        { naam: 'Термін очікування', tekst: 'Після певного терміну очікування (залежно від вироку) ви можете подати заяву знову.' },
        { naam: 'Незначні штрафи', tekst: 'Штрафи за порушення ПДР та незначні правопорушення, як правило, НЕ зараховуються.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Зв\'яжіться з VluchtelingenWerk',
    },
    r_strafblad_check: {
      type: 'wacht', icoon: '🔍',
      titel: 'Перевірте наявність судимості',
      sub: 'Ви можете замовити Довідку про відсутність судимості (VOG) на justis.nl, щоб побачити, що зареєстровано.',
      alternatieven: [
        { naam: 'Замовте VOG', tekst: 'Замовте Довідку про відсутність судимості (VOG) через justis.nl.' },
        { naam: 'Безкоштовно для отримувачів допомоги', tekst: 'Якщо ви отримуєте допомогу, VOG може бути безкоштовним.' },
        { naam: 'Незначні штрафи не зараховуються', tekst: 'Штрафи за порушення ПДР та незначні правопорушення, як правило, НЕ зараховуються.' },
        { naam: 'Юридична консультація', tekst: 'У разі сумніву: зверніться до юридичного консультанта або VluchtelingenWerk.' },
      ],
      link: 'https://www.justis.nl/producten/vog', linkTekst: '→ Замовте VOG на justis.nl',
    },
    r_geen_verblijf: {
      type: 'negatief', icoon: '🏠',
      titel: 'Ваше основне місце проживання має бути в Нідерландах',
      sub: 'Якщо ви переважно проживаєте за кордоном, ви не відповідаєте вимозі щодо місця проживання для натуралізації.',
      alternatieven: [
        { naam: 'Перенесіть основне місце проживання', tekst: 'Перенесіть ваше офіційне основне місце проживання до Нідерландів.' },
        { naam: 'Реєстрація BRP', tekst: 'Переконайтесь, що ви зареєстровані в BRP у вашому муніципалітеті.' },
        { naam: 'Подорожі дозволені', tekst: 'Час від часу виїжджати за кордон — не проблема, доки Нідерланди є вашою базою.' },
        { naam: 'Більше інформації', tekst: 'Запитайте у вашого муніципалітету про точні вимоги до місця проживання.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Більше інформації на ind.nl',
    },
    r_nationaliteit: {
      type: 'wacht', icoon: '🌍',
      titel: 'Відмова від громадянства — серйозний крок',
      sub: 'Нідерланди, як правило, не дозволяють подвійне громадянство. Є винятки — уважно прочитайте це перед прийняттям рішення.',
      alternatieven: [
        { naam: 'Виняток: власники статусу', tekst: 'Як визнаний біженець ви НЕ зобов\'язані відмовлятися від свого громадянства.' },
        { naam: 'Виняток: неможливо', tekst: 'Якщо відмова неможлива або небезпечна, може застосовуватись виняток.' },
        { naam: 'Виняток: нідерландський партнер', tekst: 'Ви одружені(-а) з нідерландцем/нідерландкою? Діють особливі правила.' },
        { naam: 'Юридична консультація', tekst: 'Попросіть оцінити вашу ситуацію — іноді можливостей більше, ніж ви думаєте.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ Всі винятки на ind.nl',
    },
    r_kosten: {
      type: 'wacht', icoon: '💶',
      titel: 'Є способи знизити витрати',
      sub: 'Натуралізація коштує €1.044 (2025) — але є способи зробити це доступнішим.',
      alternatieven: [
        { naam: 'Муніципальний фонд', tekst: 'Деякі муніципалітети відшкодовують витрати (частково) для власників статусу.' },
        { naam: 'Спеціальна допомога', tekst: 'Подайте заяву на спеціальну допомогу (bijzondere bijstand) у вашому муніципалітеті для оплати зборів.' },
        { naam: 'VluchtelingenWerk', tekst: 'Вони знають, які фонди доступні у вашому муніципалітеті.' },
        { naam: 'Накопичуйте', tekst: 'Збирайте суму, поки збираєте інші документи.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ Допомога з витратами через VluchtelingenWerk',
    },
  },
};

// ─── FA ───────────────────────────────────────────────────────────────────
window._NAT.FA = {
  header: {
    badge: '🇳🇱 بررسی تابعیت',
    titel: 'آیا واجد شرایط پاسپورت هلندی هستم؟',
    sub: 'به چند سوال پاسخ دهید و فوری بدانید که آیا می‌توانید درخواست تابعیت بدهید — بر اساس شرایط IND برای سال ۲۰۲۵.',
  },
  vragen: {
    v1: {
      stap: 'مرحله ۱ از ۹',
      tekst: 'آیا ۱۸ سال یا بیشتر دارید؟',
      uitleg: 'درخواست تابعیت فقط توسط بزرگسالان قابل ارائه است. برای فرزندان زیر سن، قوانین جداگانه‌ای از طریق والدین وجود دارد.',
      antwoorden: [
        { tekst: 'بله، ۱۸ سال یا بیشتر دارم', icoon: '✓', klasse: 'ja', volgende: 'v1b' },
        { tekst: 'خیر، کمتر از ۱۸ سال دارم', icoon: '✗', klasse: 'nee', volgende: 'r_minderjarig' },
      ]
    },
    v1b: {
      stap: 'مرحله ۲ از ۹',
      tekst: 'وضعیت اقامت فعلی شما در هلند چیست؟',
      uitleg: 'نحوه اقامت شما در هلند تعیین می‌کند کدام مسیر برای شما صدق می‌کند. شهروندان اتحادیه اروپا بر اساس حقوق اتحادیه اروپا اقامت دارند — نه از طریق مجوز اقامت هلند.',
      antwoorden: [
        { tekst: 'مجوز اقامت هلندی دارم', sub: 'یا وضعیت پناهندگی (IND نوع III، IV یا V)', icoon: '📄', klasse: 'ja', volgende: 'v2' },
        { tekst: 'شهروند اتحادیه اروپا هستم (مثلاً پاسپورت رومانیایی یا لهستانی)', sub: 'یا شهروند منطقه اقتصادی اروپا / سوئیس', icoon: '🇪🇺', klasse: 'anders', volgende: 'r_eu_burger' },
        { tekst: 'مطمئن نیستم', icoon: '❓', klasse: 'anders', volgende: 'v2' },
      ]
    },
    v2: {
      stap: 'مرحله ۳ از ۹',
      tekst: 'آیا مجوز اقامت معتبر دارید؟',
      uitleg: 'به مجوز اقامت معتبر نیاز دارید. وضعیت پناهندگی (موقت یا دائمی) نیز محاسبه می‌شود.',
      antwoorden: [
        { tekst: 'بله، مجوز اقامت معتبر دارم', sub: 'یا وضعیت پناهندگی (IND نوع III، IV یا V)', icoon: '✓', klasse: 'ja', volgende: 'v3' },
        { tekst: 'خیر، مجوز اقامت معتبر ندارم', icoon: '✗', klasse: 'nee', volgende: 'r_geen_vergunning' },
      ]
    },
    v3: {
      stap: 'مرحله ۴ از ۹',
      tekst: 'چه مدت است که به‌طور مداوم در هلند زندگی می‌کنید؟',
      uitleg: 'معمولاً باید حداقل ۵ سال پیوسته در هلند زندگی کرده باشید. سفرهای کوتاه خارج از کشور این مدت را قطع نمی‌کند.',
      antwoorden: [
        { tekst: 'کمتر از ۵ سال', icoon: '⏳', klasse: 'nee', volgende: 'r_te_kort' },
        { tekst: '۵ سال یا بیشتر', sub: 'اقامت مداوم در هلند', icoon: '✓', klasse: 'ja', volgende: 'v4a' },
      ]
    },
    v4a: {
      stap: 'مرحله ۵ از ۹ — ادغام',
      tekst: 'وضعیت ادغام اجتماعی (inburgering) شما چیست؟',
      uitleg: 'برای تابعیت باید ثابت کنید که ادغام شده‌اید. روش‌های مختلفی برای این کار وجود دارد.',
      antwoorden: [
        { tekst: 'آزمون ادغام اجتماعی را گذرانده‌ام (مسیر B1 یا آموزشی)', sub: 'گواهینامه ادغام DUO دریافت شده', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'مدرک MBO سطح ۲، ۳ یا ۴ به زبان هلندی دارم — یا مدرک HBO / WO', sub: 'این معافیت دائمی از تکلیف ادغام را می‌دهد', icoon: '🎓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'از ادغام معاف هستم', sub: 'مثلاً به دلیل سن (۶۵+)، دلیل پزشکی یا تلاش قابل اثبات', icoon: '✓', klasse: 'ja', volgende: 'v5' },
        { tekst: 'مسیر Z را تکمیل کرده‌ام (مصاحبه نهایی + گواهینامه)', sub: 'توجه: این به‌طور خودکار حق تابعیت نمی‌دهد — گزینه‌هایتان را بررسی کنید', icoon: '🌱', klasse: 'anders', volgende: 'v4a_z' },
        { tekst: 'هنوز در حال ادغام اجتماعی هستم', sub: 'هنوز مدرک یا معافیت ندارم', icoon: '⏳', klasse: 'anders', volgende: 'v4b' },
      ]
    },
    v4a_z: {
      stap: 'مرحله ۵ از ۹ — مسیر Z',
      tekst: 'مسیر Z را تکمیل کرده‌اید — یک قدم اضافی برای تابعیت لازم است',
      uitleg: 'مسیر Z با مصاحبه نهایی و گواهینامه پایان می‌یابد، اما تابعیت نیازمند الزامات زبانی اضافی از IND است. سه مسیر وجود دارد:<br><br><strong>مسیر A — قبولی در آزمون در سطح A2</strong><br>تمام آزمون‌های زبانی در سطح A2 (خواندن، شنیدن، نوشتن، صحبت کردن) به علاوه آزمون KNM. بعد از پایان مسیر Z، دفعات آزمون دیگر رایگان نیست.<br><br><strong>مسیر B — ۶۰۰ ساعت آموزش زبان + حداقل ۳ تلاش برای هر بخش</strong><br>حداقل ۶۰۰ ساعت در مؤسسه‌ای با گواهی Blik op Werk و ۳ تلاش برای هر بخش؟ DUO می‌تواند بدون قبولی در آزمون توصیه معافیت صادر کند.<br><br><strong>مسیر C — ۶۰۰ ساعت آموزش + آزمون DUO (۱۵۰ یورو)</strong><br>حداقل ۶۰۰ ساعت آموزش و آزمون DUO نشان می‌دهد A2 قابل دستیابی نیست؟ معافیت داده می‌شود.<br><br>💡 با شهرداری یا VluchtelingenWerk در مورد بهترین مسیر برای خود مشورت کنید.',
      antwoorden: [
        { tekst: 'متوجه شدم — ادامه به شرایط بقیه', icoon: '→', klasse: 'ja', volgende: 'v5' },
      ]
    },
    v4b: {
      stap: 'مرحله ۵ از ۹ — مسیر یادگیری',
      tekst: 'کدام مسیر ادغام را دنبال می‌کنید؟',
      uitleg: 'شهرداری مسیر یادگیری شما را بر اساس توانایی یادگیری‌تان تعیین می‌کند. سه مسیر وجود دارد: B1، مسیر آموزشی و مسیر Z.',
      antwoorden: [
        { tekst: 'مسیر B1', sub: 'آزمون زبانی در سطح B1 + آزمون KNM', icoon: '📖', klasse: 'info', volgende: 'r_bezig_b1' },
        { tekst: 'مسیر آموزشی', sub: 'برنامه انتقالی زبانی ۱.۵–۲ ساله — آمادگی برای MBO/HBO/WO', icoon: '🏫', klasse: 'info', volgende: 'r_bezig_onderwijs' },
        { tekst: 'مسیر Z (مسیر خودکفایی)', sub: 'برای کسانی که B1 برایشان دست‌نیافتنی است', icoon: '🌱', klasse: 'anders', volgende: 'v4b_z' },
        { tekst: 'نمی‌دانم / هنوز مسیری ندارم', icoon: '❓', klasse: 'anders', volgende: 'r_geen_inburgering' },
      ]
    },
    v4b_z: {
      stap: 'مرحله ۵ از ۹ — مسیر Z',
      tekst: 'تا کجا در مسیر Z پیشرفت کرده‌اید؟',
      uitleg: 'مسیر Z با مصاحبه نهایی در شهرداری و توصیه مثبت DUO پایان می‌یابد. هر دو برای تابعیت لازم است.',
      antwoorden: [
        { tekst: 'مسیر Z را تکمیل کرده‌ام (توصیه مثبت DUO را دریافت کرده‌ام)', sub: 'مصاحبه نهایی با شهرداری انجام شده', icoon: '✓', klasse: 'ja', volgende: 'v4a_z' },
        { tekst: 'هنوز در مسیر Z هستم', sub: 'هنوز ۸۰۰ ساعت آموزش زبانی / مشارکت را کامل نکرده‌ام', icoon: '⏳', klasse: 'anders', volgende: 'r_bezig_z' },
      ]
    },
    v5: {
      stap: 'مرحله ۶ از ۹',
      tekst: 'آیا در ۵ سال گذشته به جرمی محکوم شده‌اید؟',
      uitleg: 'محکومیت جنایی می‌تواند مانع تابعیت شود. جریمه‌های ترافیکی و تخلفات کوچک معمولاً محاسبه نمی‌شوند.',
      antwoorden: [
        { tekst: 'خیر، سابقه جنایی ندارم', icoon: '✓', klasse: 'ja', volgende: 'v6' },
        { tekst: 'بله، به جرمی محکوم شده‌ام', icoon: '✗', klasse: 'nee', volgende: 'r_strafblad' },
        { tekst: 'مطمئن نیستم', icoon: '❓', klasse: 'anders', volgende: 'r_strafblad_check' },
      ]
    },
    v6: {
      stap: 'مرحله ۷ از ۹',
      tekst: 'آیا محل سکونت اصلی شما در حال حاضر در هلند است؟',
      uitleg: 'محل سکونت اصلی شما باید در هلند باشد. سفرهای گاه‌گاهی به خارج مشکلی ایجاد نمی‌کند.',
      antwoorden: [
        { tekst: 'بله، به‌طور دائمی در هلند زندگی می‌کنم', icoon: '✓', klasse: 'ja', volgende: 'v7' },
        { tekst: 'خیر، عمدتاً در خارج از کشور زندگی می‌کنم', icoon: '✗', klasse: 'nee', volgende: 'r_geen_verblijf' },
      ]
    },
    v7: {
      stap: 'مرحله ۸ از ۹',
      tekst: 'آیا حاضرید از تابعیت فعلی خود صرف‌نظر کنید؟',
      uitleg: 'هلند معمولاً تابعیت مضاعف را اجازه نمی‌دهد. استثنا: پناهندگان شناخته‌شده (دارندگان وضعیت) می‌توانند هر دو تابعیت را نگه دارند.',
      antwoorden: [
        { tekst: 'بله، از تابعیتم صرف‌نظر می‌کنم', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'من پناهنده شناخته‌شده هستم (دارنده وضعیت)', sub: 'دارندگان وضعیت می‌توانند تابعیت مضاعف نگه دارند', icoon: '✓', klasse: 'ja', volgende: 'v8' },
        { tekst: 'خیر، می‌خواهم تابعیتم را نگه دارم', icoon: '✗', klasse: 'nee', volgende: 'r_nationaliteit' },
      ]
    },
    v8: {
      stap: 'مرحله ۹ از ۹',
      tekst: 'آیا از هزینه‌های تابعیت آگاه هستید؟',
      uitleg: 'درخواست ۱.۰۴۴ یورو هزینه دارد (۲۰۲۵). این فرآیند به‌طور متوسط ۶–۱۲ ماه طول می‌کشد.',
      antwoorden: [
        { tekst: 'بله، می‌دانم و می‌خواهم ادامه دهم', icoon: '✓', klasse: 'ja', volgende: 'r_positief' },
        { tekst: 'خیلی گران است — آیا کمک مالی وجود دارد؟', icoon: '💡', klasse: 'anders', volgende: 'r_kosten' },
      ]
    },
  },
  resultaten: {
    r_positief: {
      type: 'positief', icoon: '🎉',
      titel: 'احتمالاً واجد شرایط هستید!',
      sub: 'بر اساس پاسخ‌های شما، شرایط اصلی تابعیت را دارید. قدم بعدی ارائه درخواست رسمی در شهرداری شماست.',
      info: '💡 دارندگان وضعیت (پناهندگان شناخته‌شده) در اکثر موارد مجبور نیستند از تابعیت اصلی خود صرف‌نظر کنند.',
      stappen: [
        { nr: 1, tekst: '<strong>وقت بگیرید از شهرداری‌تان</strong> — بخش امور شهروندی. بگویید می‌خواهید درخواست تابعیت بدهید.' },
        { nr: 2, tekst: '<strong>مدارک را جمع‌آوری کنید:</strong> پاسپورت معتبر، مجوز اقامت، مدرک ادغام، شناسنامه (در صورت لزوم تأییدشده).' },
        { nr: 3, tekst: '<strong>هزینه را پرداخت کنید:</strong> ۱.۰۴۴ یورو هنگام تقدیم (۲۰۲۵). از شهرداری بپرسید آیا طرح حمایتی وجود دارد.' },
        { nr: 4, tekst: '<strong>منتظر تصمیم</strong> IND باشید. این به‌طور متوسط ۶–۱۲ ماه طول می‌کشد.' },
        { nr: 5, tekst: '<strong>مراسم تابعیت:</strong> پس از تأیید، دعوتنامه مراسم در شهرداری دریافت خواهید کرد.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ اطلاعات بیشتر در ind.nl',
    },
    r_eu_burger: {
      type: 'eu', icoon: '🇪🇺',
      titel: 'به عنوان شهروند اتحادیه اروپا حقوق متفاوتی دارید',
      sub: 'تابعیت هلندی ممکن است، اما برای زندگی و کار در اینجا نیازی به تابعیت هلندی ندارید. به عنوان شهروند اروپایی از قبل حقوق گسترده‌ای در هلند دارید.',
      infoBoxen: [
        { type: 'info', tekst: '🇪🇺 <strong>حقوق شهروندی اروپایی:</strong> به عنوان شهروند رومانیایی یا لهستانی حق دارید در هلند زندگی، کار و تحصیل کنید — بدون مجوز اقامت. در شهرداری (BRP) ثبت‌نام می‌کنید، اما مجوز IND لازم نیست.' },
        { type: 'amber', tekst: '⚠️ <strong>توجه درباره تابعیت مضاعف:</strong> اگر تابعیت هلندی بگیرید، اصولاً باید از تابعیت رومانیایی یا لهستانی خود صرف‌نظر کنید. رومانی و لهستان همیشه این را اجازه نمی‌دهند. قبل از شروع از سفارتخانه بپرسید.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>باز هم می‌خواهید تابعیت بگیرید؟</strong> شرایط استاندارد برای شهروندان اروپایی هم صدق می‌کند: ۵ سال اقامت مداوم، ادغام، بدون سابقه جنایی، صرف‌نظر از تابعیت.' },
        { nr: 2, tekst: '<strong>تابعیت مضاعف:</strong> از سفارتخانه رومانیایی یا لهستانی بپرسید آیا پس از تابعیت می‌توانید تابعیت خود را نگه دارید. قوانین کشور به کشور فرق دارد.' },
        { nr: 3, tekst: '<strong>می‌خواهید ادامه دهید؟</strong> دوباره چک‌لیست را طی کنید و در قسمت وضعیت اقامت "مجوز اقامت" را انتخاب کنید — سایر شرایط برای شهروندان اروپایی هم صدق می‌کند.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ اطلاعات تابعیت در ind.nl',
    },
    r_minderjarig: {
      type: 'wacht', icoon: '🎂',
      titel: 'تابعیت فرزندان از طریق والدین انجام می‌شود',
      sub: 'فرزندان صغیر می‌توانند همراه با والدینی که درخواست تابعیت هلندی می‌دهند یا قبلاً دارند، تابعیت بگیرند.',
      alternatieven: [
        { naam: 'تابعیت مشترک', tekst: 'اگر والدینتان تابعیت بگیرند، شما هم می‌توانید به‌طور خودکار تابعیت بگیرید.' },
        { naam: 'از طریق دادگاه', tekst: 'در برخی موارد تابعیت جداگانه برای صغار ممکن است.' },
        { naam: 'انتظار تا ۱۸ سالگی', tekst: 'در ۱۸ سالگی می‌توانید به‌طور مستقل درخواست بدهید.' },
        { naam: 'روش گزینه', tekst: 'اگر در هلند متولد شده‌اید گاهی می‌توانید از طریق "گزینه" هلندی شوید.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden', linkTekst: '→ اطلاعات بیشتر در ind.nl',
    },
    r_geen_vergunning: {
      type: 'negatief', icoon: '📋',
      titel: 'ابتدا به مجوز اقامت نیاز دارید',
      sub: 'تابعیت فقط در صورتی ممکن است که به‌طور قانونی در هلند اقامت داشته باشید. ابتدا مجوز اقامت معتبر دریافت کنید.',
      alternatieven: [
        { naam: 'درخواست پناهندگی', tekst: 'اگر به حمایت نیاز دارید می‌توانید به IND درخواست پناهندگی بدهید.' },
        { naam: 'مجوز معمولی', tekst: 'برای کار، تحصیل یا بازیابی خانواده مجوزهای معمولی وجود دارد.' },
        { naam: 'کمک حقوقی', tekst: 'با سازمان پناهندگان یا وکیل تماس بگیرید.' },
        { naam: 'VluchtelingenWerk', tekst: 'پشتیبانی حقوقی رایگان برای پناهجویان و دارندگان وضعیت.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ با VluchtelingenWerk تماس بگیرید',
    },
    r_te_kort: {
      type: 'wacht', icoon: '⏳',
      titel: 'هنوز به اندازه کافی در هلند نیستید',
      sub: 'باید حداقل ۵ سال پیوسته در هلند زندگی کرده باشید. از زمان انتظار به خوبی استفاده کنید.',
      alternatieven: [
        { naam: 'ادغام را کامل کنید', tekst: 'از زمان انتظار برای قبولی در آزمون ادغام اجتماعی استفاده کنید.' },
        { naam: 'مدارک را جمع‌آوری کنید', tekst: 'از پیش مدارک رسمی از کشور مبدأ درخواست کنید.' },
        { naam: 'هلندی بیاموزید', tekst: 'هلندی‌تان را بهبود بخشید — همچنین رایگان از طریق دوره NT2 Solidari.' },
        { naam: 'مدت کوتاه‌تر؟', tekst: 'با همسر هلندی مدت می‌تواند کوتاه‌تر باشد. از شهرداری بپرسید.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ شرایط را در ind.nl بررسی کنید',
    },
    r_bezig_b1: {
      type: 'route', icoon: '📖',
      titel: 'می‌توانید همین الان تابعیت‌تان را آماده کنید',
      sub: 'مسیر B1 را دنبال می‌کنید اما آزمون را هنوز کامل نکرده‌اید. می‌توانید از قبل روند تابعیت را شروع کنید — مدرک باید قبل از تصمیم‌گیری IND آماده باشد.',
      infoBoxen: [
        { type: 'blauw', tekst: '💡 <strong>نکته:</strong> از شهرداری‌تان بپرسید آیا می‌توانید در حین تکمیل مسیر B1 درخواست تابعیت بدهید.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>مسیر B1 را ادامه دهید:</strong> آزمون زبانی (B1 یا A2 با تلاش قابل اثبات) و آزمون KNM را قبول شوید.' },
        { nr: 2, tekst: '<strong>از پیش مدارک درخواست کنید:</strong> پاسپورت، شناسنامه، مجوز اقامت.' },
        { nr: 3, tekst: '<strong>از شهرداری‌تان بپرسید</strong> آیا می‌توانید در حین یادگیری درخواست بدهید.' },
        { nr: 4, tekst: '<strong>پس از دریافت مدرک:</strong> تأییدیه را به شهرداری/IND بفرستید — سپس تصمیم گرفته می‌شود.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ اطلاعات بیشتر در ind.nl',
    },
    r_bezig_onderwijs: {
      type: 'route', icoon: '🏫',
      titel: 'می‌توانید همین الان تابعیت‌تان را آماده کنید',
      sub: 'مسیر آموزشی را دنبال می‌کنید — برنامه انتقالی زبانی فشرده ۱.۵ تا ۲ ساله برای ورود به MBO، HBO یا WO.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>مهم:</strong> مسیر آموزشی مدرک MBO یا HBO نیست و از ادغام معاف نمی‌کند. هنوز باید آزمون مرکزی ادغام (آزمون زبانی B1 + KNM) را بگذرانید.' },
        { type: 'blauw', tekst: '💡 <strong>نکته:</strong> می‌توانید از قبل روند تابعیت را شروع کنید. مدرک ادغام باید قبل از تصمیم‌گیری IND آماده باشد.' },
      ],
      stappen: [
        { nr: 1, tekst: '<strong>مسیر آموزشی را کامل کنید:</strong> آزمون زبانی (B1 در خواندن، شنیدن، نوشتن و صحبت کردن) و آزمون KNM را قبول شوید.' },
        { nr: 2, tekst: '<strong>از پیش مدارک درخواست کنید:</strong> پاسپورت، شناسنامه، مجوز اقامت.' },
        { nr: 3, tekst: '<strong>از شهرداری‌تان بپرسید</strong> آیا می‌توانید در حین تکمیل مسیر درخواست بدهید.' },
        { nr: 4, tekst: '<strong>پس از دریافت مدرک:</strong> تأییدیه را به شهرداری/IND بفرستید.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ اطلاعات بیشتر در ind.nl',
    },
    r_bezig_z: {
      type: 'route', icoon: '🌱',
      titel: 'تابعیت از طریق مسیر Z — تفاوت مهم',
      sub: 'تکمیل مسیر Z به این معنا نیست که شرط ادغام برای تابعیت را به‌طور خودکار برآورده کرده‌اید. سه مسیر از طریق DUO وجود دارد.',
      infoBoxen: [
        { type: 'amber', tekst: '⚠️ <strong>مهم:</strong> مسیر Z الزام آزمون ندارد بلکه الزام تلاش دارد (۸۰۰ ساعت آموزش زبانی + مصاحبه نهایی). تکمیل آن به‌طور خودکار حق تابعیت نمی‌دهد. علاوه بر این به توصیه معافیت DUO یا قبولی در آزمون A2 نیاز دارید.' },
      ],
      paden: [
        { nr: 'A', titel: 'قبولی در آزمون ادغام در سطح A2', tekst: 'تمام آزمون‌های زبانی در سطح A2 (خواندن، شنیدن، نوشتن، صحبت کردن) و آزمون KNM را قبول شوید. پس از قبولی مدرک DUO دارید و شرط ادغام برای تابعیت را برآورده می‌کنید.' },
        { nr: 'B', titel: '۶۰۰ ساعت آموزش زبانی (A2) + حداقل ۳ تلاش برای هر بخش آزمون', tekst: 'حداقل ۶۰۰ ساعت آموزش زبانی سطح A2 در مؤسسه‌ای با گواهی Blik op Werk و حداقل ۳ تلاش برای هر بخش (از جمله حداقل یک آزمون A2)؟ DUO می‌تواند بدون قبولی در آزمون توصیه معافیت صادر کند.' },
        { nr: 'C', titel: '۶۰۰ ساعت سوادآموزی یا آموزش زبانی + آزمون DUO (بدون ظرفیت یادگیری) — ۱۵۰ یورو', tekst: 'حداقل ۶۰۰ ساعت سوادآموزی در مؤسسه‌ای با گواهی Blik op Werk و آزمون DUO نشان می‌دهد A2 قابل دستیابی نیست؟ معافیت داده می‌شود. آزمون DUO ۱۵۰ یورو هزینه دارد.' },
      ],
      info: '📞 <strong>مشاوره:</strong> با شهرداری یا VluchtelingenWerk در مورد بهترین مسیر برای وضعیت‌تان مشورت کنید.',
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ کمک از طریق VluchtelingenWerk',
    },
    r_geen_inburgering: {
      type: 'wacht', icoon: '📚',
      titel: 'برای تابعیت به ادغام اجتماعی نیاز دارید',
      sub: 'بدون مدرک ادغام یا معافیت نمی‌توانید درخواست تابعیت بدهید. همین الان شروع کنید — در ۱ تا ۳ سال آماده خواهید بود.',
      alternatieven: [
        { naam: 'مسیر یادگیری‌تان را بدانید', tekst: 'به شهرداری بروید تا بدانید کدام مسیر برای شما مناسب است (B1، مسیر آموزشی یا مسیر Z).' },
        { naam: 'دوره NT2 از طریق Solidari', tekst: 'هلندی را رایگان از طریق دوره NT2 در این وب‌سایت بیاموزید (در صورت وجود انرژی خورشیدی).' },
        { naam: 'برای آزمون درخواست بدهید', tekst: 'اگر هلندی‌تان کافی است می‌توانید مستقیماً از طریق DUO برای آزمون درخواست بدهید.' },
        { naam: 'معافیت ممکن است؟', tekst: 'بررسی کنید آیا واجد شرایط معافیت هستید (۶۵+، دلیل پزشکی، یا مدرک معاف‌کننده).' },
      ],
      link: 'https://www.inburgeren.nl', linkTekst: '→ اطلاعات بیشتر درباره ادغام در inburgeren.nl',
    },
    r_strafblad: {
      type: 'negatief', icoon: '⚖️',
      titel: 'سابقه جنایی می‌تواند تابعیت را مسدود کند',
      sub: 'بسته به نوع محکومیت و اینکه چه مدت پیش بوده، ممکن است مانعی باشد. از یک متخصص بخواهید وضعیت‌تان را ارزیابی کند.',
      alternatieven: [
        { naam: 'مشاوره حقوقی', tekst: 'از یک مشاور حقوقی بپرسید آیا وضعیت‌تان مانعی برای تابعیت است.' },
        { naam: 'VluchtelingenWerk', tekst: 'کمک حقوقی رایگان برای دارندگان وضعیت.' },
        { naam: 'دوره انتظار', tekst: 'پس از یک دوره انتظار مشخص (بسته به حکم) می‌توانید دوباره درخواست بدهید.' },
        { naam: 'جریمه‌های کوچک', tekst: 'جریمه‌های ترافیکی و تخلفات کوچک معمولاً محاسبه نمی‌شوند.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ با VluchtelingenWerk تماس بگیرید',
    },
    r_strafblad_check: {
      type: 'wacht', icoon: '🔍',
      titel: 'بررسی کنید آیا سابقه جنایی دارید',
      sub: 'می‌توانید گواهی حسن سلوک (VOG) از justis.nl درخواست کنید تا ببینید چه چیزی ثبت شده است.',
      alternatieven: [
        { naam: 'VOG درخواست کنید', tekst: 'از طریق justis.nl گواهی حسن سلوک (VOG) درخواست کنید.' },
        { naam: 'رایگان برای دریافت‌کنندگان کمک مالی', tekst: 'اگر کمک مالی دریافت می‌کنید، VOG ممکن است رایگان باشد.' },
        { naam: 'جریمه‌های کوچک محاسبه نمی‌شوند', tekst: 'جریمه‌های ترافیکی و تخلفات کوچک معمولاً محاسبه نمی‌شوند.' },
        { naam: 'مشاوره حقوقی', tekst: 'در صورت شک: با یک مشاور حقوقی یا VluchtelingenWerk مشورت کنید.' },
      ],
      link: 'https://www.justis.nl/producten/vog', linkTekst: '→ VOG را در justis.nl درخواست کنید',
    },
    r_geen_verblijf: {
      type: 'negatief', icoon: '🏠',
      titel: 'محل سکونت اصلی‌تان باید در هلند باشد',
      sub: 'اگر عمدتاً در خارج زندگی می‌کنید، شرط اقامت برای تابعیت را برآورده نمی‌کنید.',
      alternatieven: [
        { naam: 'محل سکونت اصلی را منتقل کنید', tekst: 'محل سکونت رسمی اصلی‌تان را به هلند منتقل کنید.' },
        { naam: 'ثبت‌نام BRP', tekst: 'مطمئن شوید که در BRP شهرداری‌تان ثبت‌نام کرده‌اید.' },
        { naam: 'سفر مجاز است', tekst: 'سفر گاه‌گاهی به خارج مشکلی نیست، تا زمانی که هلند پایگاه شما باشد.' },
        { naam: 'اطلاعات بیشتر', tekst: 'از شهرداری‌تان درباره شرایط دقیق اقامت بپرسید.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ اطلاعات بیشتر در ind.nl',
    },
    r_nationaliteit: {
      type: 'wacht', icoon: '🌍',
      titel: 'صرف‌نظر از تابعیت گام بزرگی است',
      sub: 'هلند معمولاً تابعیت مضاعف را اجازه نمی‌دهد. استثناهایی وجود دارد — قبل از تصمیم‌گیری آن‌ها را به دقت بخوانید.',
      alternatieven: [
        { naam: 'استثنا: دارندگان وضعیت', tekst: 'به عنوان پناهنده شناخته‌شده مجبور نیستید از تابعیت‌تان صرف‌نظر کنید.' },
        { naam: 'استثنا: غیرممکن', tekst: 'اگر صرف‌نظر کردن غیرممکن یا خطرناک است، ممکن است استثنایی اعمال شود.' },
        { naam: 'استثنا: همسر هلندی', tekst: 'آیا با یک هلندی ازدواج کرده‌اید؟ قوانین خاصی اعمال می‌شود.' },
        { naam: 'مشاوره حقوقی', tekst: 'وضعیت‌تان را ارزیابی کنید — گاهی بیشتر از آنچه فکر می‌کنید ممکن است.' },
      ],
      link: 'https://ind.nl/nl/nederlander-worden/naturalisatie', linkTekst: '→ تمام استثناها در ind.nl',
    },
    r_kosten: {
      type: 'wacht', icoon: '💶',
      titel: 'راه‌هایی برای کاهش هزینه‌ها وجود دارد',
      sub: 'تابعیت ۱.۰۴۴ یورو هزینه دارد (۲۰۲۵) — اما راه‌هایی برای مقرون‌به‌صرفه کردن آن وجود دارد.',
      alternatieven: [
        { naam: 'صندوق شهرداری', tekst: 'برخی شهرداری‌ها هزینه‌ها را برای دارندگان وضعیت (بخشی) بازپرداخت می‌کنند.' },
        { naam: 'کمک ویژه', tekst: 'از شهرداری‌تان برای هزینه‌های پرونده کمک ویژه (bijzondere bijstand) درخواست کنید.' },
        { naam: 'VluchtelingenWerk', tekst: 'آن‌ها می‌دانند در شهرداری‌تان چه صندوق‌هایی در دسترس است.' },
        { naam: 'پس‌انداز کنید', tekst: 'در حالی که سایر مدارک را جمع‌آوری می‌کنید مبلغ را پس‌انداز کنید.' },
      ],
      link: 'https://www.vluchtelingenwerk.nl', linkTekst: '→ کمک هزینه از طریق VluchtelingenWerk',
    },
  },
};
