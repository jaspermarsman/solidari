/**
 * Solidari — Goed Voorbereid: content-data
 *
 * Structuur (paraplu-architectuur):
 *   DATA[TAAL].categorieen = [ { id, emoji, naam, vasteBlokken:[...], situaties:[...] } ]
 *   Elke situatie: { id, emoji, titel, blokken: [ {kop, type, items|tekst} ] }
 *   Elke categorie kan eigen vaste blokken hebben (vasteBlokken), die NA de
 *   situatie-blokken als bubbels verschijnen.
 *
 * Blok-types:
 *   'tekst'  → { kop, tekst }
 *   'lijst'  → { kop, items: [..] }   (items tonen als losse regels in één bubbel)
 *
 * Presentatie (goedvoorbereid.html): elk blok wordt één chat-bubbel. De gebruiker
 * gaat met 'Verder →' naar het volgende blok. Geen muur, geen leeg tekstveld.
 *
 * Nieuwe taal: kopieer het NL-blok, vertaal strings, behoud alle id's.
 * Nieuwe categorie: voeg object toe aan categorieen-array; pagina past zich aan.
 */

window.GoedVoorbereidData = {

  NL: {

    ui: {
      paginaTitel: 'Goed Voorbereid',
      welkom: 'Ga je naar een afspraak? Ik help je je voor te bereiden. Zo weet je wat je kunt verwachten en wat je kunt zeggen.',
      kiesCategorie: 'Waar ga je naartoe?',
      kiesSituatie: 'Waarvoor ga je?',
      verder: 'Verder →',
      klaar: 'Dat was het. Wil je nog iets weten?',
      opnieuw: '↺ Andere afspraak',
      aiUitnodiging: 'Heb je nog een eigen vraag over jouw afspraak? Typ of spreek hieronder.',
      aiPlaceholder: 'Stel je vraag...',
      aiSpreekTitel: 'Inspreken',
      aiFout: 'Er ging iets mis. Probeer het opnieuw.',
      aiDisclaimer: '🤖 Dit is hulp bij het voorbereiden op je gesprek. Geen medisch of juridisch advies. Deel geen BSN of andere persoonlijke gegevens.',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'De dokter',
        vasteBlokken: [
          { kop: 'Als het gesprek moeilijk te volgen is', type: 'lijst', items: [
            'Vraag gerust: "kunt u het langzamer of met makkelijkere woorden zeggen?"',
            'Je mag iemand meenemen die je vertrouwt.',
            'Spreek je de taal nog niet goed? Vraag om een tolk als je de afspraak maakt, het liefst als je belt. Neem liever geen kind mee om te tolken bij moeilijke gesprekken.',
          ] },
          { kop: 'Het kost niets', type: 'tekst',
            tekst: 'Een bezoek aan de huisarts is gratis. Het gaat niet van je eigen risico af.' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'Ik heb een klacht of pijn',
            blokken: [
              { kop: 'Hoe de dokter werkt', type: 'tekst',
                tekst: 'De huisarts geeft niet altijd meteen medicijnen. De dokter stelt eerst vragen om je klacht goed te begrijpen. Soms is het advies om een week af te wachten en terug te komen als het niet beter gaat. Veel klachten gaan vanzelf over.' },
              { kop: 'Wat de dokter gaat vragen', type: 'lijst', items: [
                'Sinds wanneer heb je deze klacht?',
                'Waar zit de pijn precies?',
                'Wat heb je al geprobeerd?',
                'Heb je nog andere klachten?',
                'Hoe gaat het verder met je: werk, thuis, slapen?',
              ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst', items: [
                'Bedenk wanneer de klacht begon en wat je precies voelt.',
                'Schrijf je klacht op, of laat iemand je daarbij helpen.',
                'Heb je meer dan één klacht? Zeg dat aan het begin, zodat de dokter de tijd kan verdelen.',
                'Gebruik je medicijnen? Neem ze mee of schrijf de namen op.',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                '"Ik begrijp het niet, kunt u het nog een keer uitleggen?"',
                '"Wat kan ik zelf doen?" en "Wanneer moet ik terugkomen?"',
                'Vraag de dokter om het op te schrijven als je het niet wilt onthouden.',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'Voor het eerst naar een nieuwe huisarts',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Je moet eerst ingeschreven staan bij een huisartsenpraktijk. Je kiest één huisarts in de buurt en schrijft je daar in. Dat wordt dan jouw vaste huisarts.' },
              { kop: 'Wat je nodig hebt om je in te schrijven', type: 'lijst', items: [
                'Je identiteitsbewijs.',
                'Je burgerservicenummer (BSN).',
                'Je zorgverzekering.',
              ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst', items: [
                'Zoek een huisarts in de buurt die nieuwe patiënten aanneemt. In een grote stad is dat soms lastig. Blijf bellen of vraag iemand om hulp.',
                'Schrijf je in zodra het kan, ook als je niet ziek bent.',
                'Heb je medische informatie van vroeger? Neem die mee naar het eerste bezoek.',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                '"Neemt u nieuwe patiënten aan?"',
                'Vraag hoe het werkt: een afspraak maken, en wat je doet \'s avonds of in het weekend.',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'Naar een specialist of het ziekenhuis',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Je gaat eerst naar de huisarts, niet rechtstreeks naar een specialist. De huisarts beoordeelt of een specialist nodig is en geeft dan een verwijzing. Zonder verwijzing betaalt je verzekering de specialist meestal niet.\n\nDe huisarts verwijst niet altijd door. Soms behandelt de huisarts je klacht zelf. Dat betekent dat een specialist op dat moment nog niet nodig is.' },
              { kop: 'Wat de dokter gaat vragen', type: 'lijst', items: [
                'Wat is je klacht en sinds wanneer heb je die?',
                'Wat is er al geprobeerd?',
                'Waarom denk je dat een specialist nodig is?',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                'Leg uit waarom je je zorgen maakt.',
                '"Waarom is een specialist nu nog niet nodig?"',
                '"Wanneer moet ik terugkomen als het niet beter wordt?"',
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'Ik ga voor mijn kind',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Voor klachten en ziektes ga je met je kind naar de huisarts, net als voor jezelf. De dokter stelt vragen en onderzoekt je kind.\n\nVoor groei, vaccinaties en algemene controles ga je niet naar de huisarts, maar naar het consultatiebureau of de jeugdgezondheidszorg (GGD). Dat is een aparte plek voor kinderen.' },
              { kop: 'Wat de dokter gaat vragen', type: 'lijst', items: [
                'Sinds wanneer heeft je kind de klacht?',
                'Heeft je kind koorts, en hoe hoog?',
                'Eet en drinkt je kind normaal?',
                'Wat heb je al gedaan of gegeven?',
              ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst', items: [
                'Bedenk wanneer het begon en wat je opvalt aan je kind.',
                'Weet je het gewicht van je kind? Dat is soms handig.',
                'Gebruikt je kind medicijnen? Neem ze mee of schrijf de namen op.',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                'Je kent je kind het beste. Zeg het als je kind echt anders is dan normaal.',
                '"Waar moet ik op letten?" en "Wanneer moet ik terugkomen of bellen?"',
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'Iets persoonlijks of moeilijks bespreken',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Je kunt bij de huisarts ook terecht voor stress, slecht slapen, verdriet, zorgen of een moeilijke thuissituatie. De dokter gaat hier vertrouwelijk mee om.' },
              { kop: 'Hoe je je voorbereidt', type: 'lijst', items: [
                'Bedenk van tevoren wat je wilt vertellen. Je mag het opschrijven en voorlezen.',
                'Je hoeft niet alles in één keer te vertellen. Begin met het belangrijkste.',
                'Wil je hier rustig de tijd voor? Zeg bij het maken van de afspraak dat je ergens over wilt praten. Soms krijg je dan een langere afspraak.',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                '"Dit is moeilijk voor mij om te vertellen."',
                '"Met wie kan ik hierover verder praten?" De huisarts kan je doorverwijzen.',
                'Je mag iemand meenemen die je vertrouwt.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // GEMEENTE
      // ===================================================================
      {
        id: 'gemeente',
        emoji: '🏛️',
        naam: 'De gemeente',
        vasteBlokken: [
          { kop: 'Als het gesprek moeilijk te volgen is', type: 'lijst', items: [
            'Vraag gerust: "kunt u het langzamer of met makkelijkere woorden zeggen?"',
            'Je mag iemand meenemen die je vertrouwt.',
            'Spreek je de taal nog niet goed? Vraag om een tolk als je de afspraak maakt.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'Een gesprek over mijn uitkering (bijstand)',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Als je een bijstandsuitkering krijgt, heb je soms een gesprek met je klantmanager. Het gaat over hoe het met je gaat, of er iets veranderd is in je situatie, en wat de afspraken zijn over werk of meedoen. Het is een normaal onderdeel van de uitkering.' },
              { kop: 'Twee dingen die belangrijk zijn', type: 'lijst', items: [
                'Geef veranderingen in je situatie op tijd door: samenwonen, werk, extra geld, iemand die bij je intrekt, of verhuizen. Geef het ook door als je twijfelt. Doe je dat niet op tijd, dan kan de gemeente geld terugvragen.',
                'Werk mee aan afspraken, zoals naar een gesprek komen of stappen zetten om werk te vinden.',
              ] },
              { kop: 'Wat de klantmanager gaat vragen', type: 'lijst', items: [
                'Hoe gaat het met je op dit moment?',
                'Is er iets veranderd in je situatie? (wonen, gezin, geld, gezondheid)',
                'Werk je, of doe je iets om werk te vinden?',
                'Lukt het om rond te komen?',
              ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst', items: [
                'Bedenk of er iets veranderd is sinds de vorige keer. Twijfel je? Vertel het toch.',
                'Neem mee: je identiteitsbewijs en je bankpas. Soms vraagt de gemeente bankafschriften, kijk in je uitnodigingsbrief.',
                'Heb je een brief gekregen over dit gesprek? Neem die mee.',
                'Heb je problemen, zoals schulden? Je mag die noemen. De gemeente kan soms helpen.',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                '"Ik begrijp het niet, kunt u het rustiger uitleggen?"',
                '"Wat betekent dit voor mijn uitkering?" en "Wat moet ik nu doen?"',
                'Vraag of de gemeente een afspraak op papier zet, zodat je het thuis kunt nalezen.',
              ] },
            ],
          },
        ],
      },

    ],
  },

  // EN / AR / TI / UK / FA / RO / PL / TR — later, zelfde structuur en id's.
};
