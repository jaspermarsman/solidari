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
 * Lijst-items: een string (gewone regel) óf een zeg-zin-object:
 *   { zeg, intro?, na?, eigen? }
 *   - zeg   : de Nederlandse zin die de gebruiker letterlijk kan uitspreken of
 *             op de telefoon kan laten zien. In ÁLLE taalversies identiek
 *             Nederlands — nooit vertalen.
 *   - intro : korte inleiding vóór de zin (in de taal van het blok).
 *   - na    : korte tekst ná de zin (in de taal van het blok).
 *   - eigen : vertaling van de zin, alleen in niet-NL-versies. Voorbeeld (EN):
 *             { intro: 'Feel free to ask:',
 *               zeg:   'Kunt u het langzamer of met makkelijkere woorden zeggen?',
 *               eigen: 'Could you say that more slowly, or in easier words?' }
 *   De pagina toont zeg-zinnen met een voorleesknop (🔊) en tik-voor-groot,
 *   zodat de gebruiker de zin aan de dokter/klantmanager/leerkracht kan laten zien.
 *
 * Presentatie (goedvoorbereid.html): elk blok wordt één chat-bubbel. De gebruiker
 * gaat met 'Verder →' naar het volgende blok. Geen muur, geen leeg tekstveld.
 *
 * Nieuwe taal: kopieer het NL-blok, vertaal strings, behoud alle id's.
 * Nieuwe categorie: voeg object toe aan categorieen-array; pagina past zich aan.
 *
 * Categorieën (v0.5): dokter (5 situaties), gemeente (1), school/basisschool (1).
 * Categorieën met 1 situatie slaan de situatiekeuze automatisch over.
 *
 * Talen (v0.6): NL, EN, AR, TR, TI, UK, FA, RO, PL — alle 9 compleet.
 * In elke taal: alle id's identiek aan NL, elke zeg-string byte-identiek
 * Nederlands, elke zeg-zin heeft een 'eigen'-vertaling. Vertalingen zijn
 * machinaal; native-speaker-review staat op de langetermijnlijst.
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
      voorlezen: 'Voorlezen',
      zegSluit: 'Tik om te sluiten',
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
            { intro: 'Vraag gerust:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?' },
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
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?' },
                { zeg: 'Wat kan ik zelf doen?' },
                { zeg: 'Wanneer moet ik terugkomen?' },
                'Vraag de dokter om het op te schrijven als je het niet kunt onthouden.',
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
                { zeg: 'Neemt u nieuwe patiënten aan?' },
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
                { zeg: 'Waarom is een specialist nu nog niet nodig?' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?' },
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
                { zeg: 'Waar moet ik op letten?' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?' },
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
                { zeg: 'Dit is moeilijk voor mij om te vertellen.' },
                { zeg: 'Met wie kan ik hierover verder praten?', na: 'De huisarts kan je doorverwijzen.' },
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
            { intro: 'Vraag gerust:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?' },
            'Je mag iemand meenemen die je vertrouwt.',
            'Spreek je de taal nog niet goed? Vraag om een tolk als je de afspraak maakt.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'Iets regelen aan de balie (paspoort, ID of ander document)',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Voor een paspoort, ID-kaart, rijbewijs of uittreksel maak je meestal eerst een afspraak, online of telefonisch. Je kunt niet altijd zomaar binnenlopen.\n\nEen nieuw paspoort, ID-kaart of rijbewijs is niet meteen klaar. Je haalt het later op, vaak na ongeveer een week.' },
              { kop: 'Wat je meeneemt', type: 'lijst', items: [
                'De bevestiging van je afspraak, als je die hebt gekregen.',
                'Je identiteitsbewijs. Neem het ook mee als het verlopen is.',
                'Je pinpas. Aan de balie betaal je meteen, vaak alleen met pin.',
                'Voor een paspoort, ID-kaart of rijbewijs: een recente pasfoto van een fotograaf. Een zelfgemaakte foto wordt meestal niet goedgekeurd.',
              ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst', items: [
                'Kijk in de bevestiging wat je mee moet nemen. Twijfel je? Bel de gemeente voordat je gaat.',
                'Kom op tijd. Ben je te laat, dan moet je soms een nieuwe afspraak maken.',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                { zeg: 'Wat kost het?' },
                { zeg: 'Wanneer is het klaar?' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'Een gesprek over hulp of zorg thuis (Wmo)',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Heb je hulp nodig, bijvoorbeeld bij het huishouden, met vervoer, of een aanpassing in huis? Dan heb je eerst een gesprek met iemand van de gemeente. Dit heet vaak een keukentafelgesprek. Het kan bij jou thuis zijn of op het gemeentehuis.\n\nIn het gesprek kijkt de gemeente samen met jou wat je zelf kunt, wat mensen om je heen kunnen doen, en waar hulp nodig is.' },
              { kop: 'Wat de gemeente gaat vragen', type: 'lijst', items: [
                'Wat lukt er thuis goed, en wat lukt niet meer?',
                'Wie helpen je nu al? (familie, buren, bekenden)',
                'Hoe is je gezondheid?',
                'Wat wil je graag weer zelf kunnen?',
              ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst', items: [
                'Bedenk vooraf wat er niet meer lukt. Geef voorbeelden uit je dag, zoals traplopen, boodschappen of het huishouden.',
                'Schrijf op wat je wilt vertellen, of laat iemand je daarbij helpen.',
                'Je mag iemand meenemen. Er is ook gratis onafhankelijke hulp bij dit gesprek: een cliëntondersteuner. Vraag ernaar als je de afspraak maakt.',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.' },
                { zeg: 'Wat gebeurt er na dit gesprek?' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?' },
              ] },
            ],
          },
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
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?' },
                { zeg: 'Wat betekent dit voor mijn uitkering?' },
                { zeg: 'Wat moet ik nu doen?' },
                'Vraag of de gemeente een afspraak op papier zet, zodat je het thuis kunt nalezen.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'De school van mijn kind',
        vasteBlokken: [
          { kop: 'Als het gesprek moeilijk te volgen is', type: 'lijst', items: [
            { intro: 'Vraag gerust:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?' },
            'Je mag iemand meenemen die je vertrouwt.',
            'Spreek je de taal nog niet goed? Vraag vooraf aan de school of er een tolk kan zijn, of neem iemand mee die kan vertalen.',
          ] },
          { kop: 'Is 10 minuten te kort?', type: 'tekst',
            tekst: 'Heb je meer te bespreken dan in 10 minuten past? Vraag de leerkracht om een aparte afspraak. Dat kan altijd, ook op een ander moment in het jaar.' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: 'Het 10-minutengesprek met de leerkracht',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Een paar keer per jaar nodigt de school alle ouders uit voor een kort gesprek met de juf of meester. Het duurt ongeveer 10 minuten. Jullie bespreken hoe het met je kind gaat op school.\n\nDit gesprek is voor alle ouders, ook als het goed gaat met je kind. Omdat de tijd kort is, helpt het om voorbereid te komen.' },
              { kop: 'Wat de leerkracht gaat vertellen of vragen', type: 'lijst', items: [
                'Hoe het gaat met lezen, rekenen en andere vakken.',
                'Hoe je kind meedoet in de klas en omgaat met andere kinderen.',
                'Soms laat de leerkracht werk of toetsresultaten van je kind zien.',
                'Gaat je kind met plezier naar school? Hoe gaat het thuis?',
              ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst', items: [
                'Vraag je kind van tevoren: hoe gaat het op school? Wat vind je leuk? Wat vind je moeilijk?',
                'De tijd is kort. Bedenk één of twee dingen die je zeker wilt vragen en schrijf ze op.',
                'Heb je een brief of een rapport gekregen? Neem die mee.',
                'Maak je je ergens zorgen over? Begin daarmee, dan is er genoeg tijd voor.',
              ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?' },
                { zeg: 'Wat kan ik thuis doen om te helpen?' },
                'Jij kent je kind het beste. Vertel het als je thuis iets anders ziet dan de leerkracht op school.',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?' },
              ] },
            ],
          },
        ],
      },

    ],
  },

  EN: {

    ui: {
      paginaTitel: 'Well Prepared',
      welkom: 'Do you have an appointment coming up? I will help you prepare. So you know what to expect and what you can say.',
      kiesCategorie: 'Where are you going?',
      kiesSituatie: 'What is the appointment for?',
      verder: 'Next →',
      klaar: 'That was everything. Is there anything else you want to know?',
      opnieuw: '↺ Another appointment',
      aiUitnodiging: 'Do you have a question about your own appointment? Type or speak below.',
      aiPlaceholder: 'Ask your question...',
      aiSpreekTitel: 'Speak',
      aiFout: 'Something went wrong. Please try again.',
      aiDisclaimer: '🤖 This is help with preparing for your appointment. Not medical or legal advice. Do not share your BSN or other personal details.',
      voorlezen: 'Read aloud',
      zegSluit: 'Tap to close',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'The doctor',
        vasteBlokken: [
          { kop: 'If the conversation is hard to follow', type: 'lijst', items: [
            { intro: 'Feel free to ask:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Could you say that more slowly, or in easier words?' },
            'You may bring someone you trust.',
            'Do you not speak the language well yet? Ask for an interpreter when you make the appointment, preferably when you call. It is better not to bring a child to interpret at difficult conversations.',
          ] },
          { kop: 'It costs nothing', type: 'tekst',
            tekst: 'A visit to the huisarts (family doctor) is free. It does not come out of your deductible (eigen risico).' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'I have a health problem or pain',
            blokken: [
              { kop: 'How the doctor works', type: 'tekst',
                tekst: 'The huisarts (family doctor) does not always give medicine right away. The doctor first asks questions to understand your problem well. Sometimes the advice is to wait a week and come back if it does not get better. Many problems go away on their own.' },
              { kop: 'What the doctor will ask', type: 'lijst', items: [
                'Since when have you had this problem?',
                'Where exactly is the pain?',
                'What have you already tried?',
                'Do you have any other complaints?',
                'How are things going otherwise: work, home, sleep?',
              ] },
              { kop: 'How to prepare', type: 'lijst', items: [
                'Think about when the problem started and what exactly you feel.',
                'Write your problem down, or ask someone to help you with that.',
                'Do you have more than one problem? Say so at the start, so the doctor can divide the time.',
                'Do you take medicines? Bring them with you or write down the names.',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?',
                  eigen: 'I do not understand, could you explain it once more?' },
                { zeg: 'Wat kan ik zelf doen?',
                  eigen: 'What can I do myself?' },
                { zeg: 'Wanneer moet ik terugkomen?',
                  eigen: 'When should I come back?' },
                'Ask the doctor to write it down if you cannot remember it.',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'Going to a new huisarts for the first time',
            blokken: [
              { kop: 'How it works', type: 'tekst',
                tekst: 'You first need to be registered with a huisarts practice. You choose one huisarts (family doctor) near you and register there. That doctor then becomes your regular doctor.' },
              { kop: 'What you need to register', type: 'lijst', items: [
                'Your ID document.',
                'Your citizen service number (BSN).',
                'Your health insurance.',
              ] },
              { kop: 'How to prepare', type: 'lijst', items: [
                'Look for a huisarts nearby who is accepting new patients. In a big city this can be difficult. Keep calling, or ask someone for help.',
                'Register as soon as you can, even if you are not ill.',
                'Do you have medical records from before? Bring them to the first visit.',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                { zeg: 'Neemt u nieuwe patiënten aan?',
                  eigen: 'Are you accepting new patients?' },
                'Ask how things work: making an appointment, and what to do in the evening or at the weekend.',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'Seeing a specialist or going to hospital',
            blokken: [
              { kop: 'How it works', type: 'tekst',
                tekst: 'You go to the huisarts (family doctor) first, not straight to a specialist. The huisarts decides whether a specialist is needed and then gives a referral. Without a referral, your insurance usually does not pay for the specialist.\n\nThe huisarts does not always refer you. Sometimes the huisarts treats your problem themselves. That means a specialist is not needed at that moment.' },
              { kop: 'What the doctor will ask', type: 'lijst', items: [
                'What is your problem and since when have you had it?',
                'What has already been tried?',
                'Why do you think a specialist is needed?',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                'Explain why you are worried.',
                { zeg: 'Waarom is een specialist nu nog niet nodig?',
                  eigen: 'Why is a specialist not needed yet?' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?',
                  eigen: 'When should I come back if it does not get better?' },
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'I am going for my child',
            blokken: [
              { kop: 'How it works', type: 'tekst',
                tekst: 'For illness and health problems, you take your child to the huisarts (family doctor), just as you would for yourself. The doctor asks questions and examines your child.\n\nFor growth, vaccinations and general check-ups you do not go to the huisarts, but to the consultatiebureau or the youth health service (GGD). That is a separate place for children.' },
              { kop: 'What the doctor will ask', type: 'lijst', items: [
                'Since when has your child had the problem?',
                'Does your child have a fever, and how high?',
                'Is your child eating and drinking normally?',
                'What have you already done or given?',
              ] },
              { kop: 'How to prepare', type: 'lijst', items: [
                'Think about when it started and what you notice about your child.',
                'Do you know your child\'s weight? That is sometimes useful.',
                'Does your child take medicines? Bring them or write down the names.',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                'You know your child best. Say so if your child is really different from normal.',
                { zeg: 'Waar moet ik op letten?',
                  eigen: 'What should I watch out for?' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?',
                  eigen: 'When should I come back or call?' },
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'Discussing something personal or difficult',
            blokken: [
              { kop: 'How it works', type: 'tekst',
                tekst: 'You can also go to the huisarts (family doctor) with stress, poor sleep, sadness, worries or a difficult situation at home. The doctor treats this confidentially.' },
              { kop: 'How to prepare', type: 'lijst', items: [
                'Think in advance about what you want to say. You may write it down and read it out.',
                'You do not have to tell everything at once. Start with the most important thing.',
                'Do you want enough time for this? When making the appointment, say that you want to talk about something. Sometimes you then get a longer appointment.',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                { zeg: 'Dit is moeilijk voor mij om te vertellen.',
                  eigen: 'This is difficult for me to talk about.' },
                { zeg: 'Met wie kan ik hierover verder praten?',
                  eigen: 'Who can I talk to further about this?',
                  na: 'The huisarts can refer you.' },
                'You may bring someone you trust.',
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
        naam: 'The municipality (gemeente)',
        vasteBlokken: [
          { kop: 'If the conversation is hard to follow', type: 'lijst', items: [
            { intro: 'Feel free to ask:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Could you say that more slowly, or in easier words?' },
            'You may bring someone you trust.',
            'Do you not speak the language well yet? Ask for an interpreter when you make the appointment.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'Arranging something at the counter (passport, ID or another document)',
            blokken: [
              { kop: 'How it works', type: 'tekst',
                tekst: 'For a passport, ID card, driving licence or official extract (uittreksel), you usually make an appointment first, online or by phone. You cannot always just walk in.\n\nA new passport, ID card or driving licence is not ready straight away. You collect it later, often after about a week.' },
              { kop: 'What to bring', type: 'lijst', items: [
                'The confirmation of your appointment, if you received one.',
                'Your identity document. Bring it even if it has expired.',
                'Your bank card. At the counter you pay right away, often by card only.',
                'For a passport, ID card or driving licence: a recent passport photo from a photographer. A homemade photo is usually not accepted.',
              ] },
              { kop: 'How to prepare', type: 'lijst', items: [
                'Check the confirmation for what you need to bring. Not sure? Call the gemeente before you go.',
                'Arrive on time. If you are late, you sometimes have to make a new appointment.',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                { zeg: 'Wat kost het?', eigen: 'How much does it cost?' },
                { zeg: 'Wanneer is het klaar?', eigen: 'When will it be ready?' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?', eigen: 'Do I need an appointment to collect it?' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?', eigen: 'I do not understand, could you explain it more calmly?' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'A conversation about help or care at home (Wmo)',
            blokken: [
              { kop: 'How it works', type: 'tekst',
                tekst: 'Do you need help, for example with the housework, with transport, or a change to your home? Then you first have a conversation with someone from the gemeente. This is often called a keukentafelgesprek (kitchen-table conversation). It can be at your home or at the town hall.\n\nIn the conversation the gemeente looks together with you at what you can do yourself, what people around you can do, and where help is needed.' },
              { kop: 'What the gemeente will ask', type: 'lijst', items: [
                'What is going well at home, and what no longer works?',
                'Who already helps you? (family, neighbours, people you know)',
                'How is your health?',
                'What would you like to be able to do yourself again?',
              ] },
              { kop: 'How to prepare', type: 'lijst', items: [
                'Think in advance about what no longer works. Give examples from your day, such as stairs, shopping or the housework.',
                'Write down what you want to say, or ask someone to help you with that.',
                'You may bring someone with you. There is also free independent help for this conversation: a cliëntondersteuner (independent client supporter). Ask for one when you make the appointment.',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.', eigen: 'I can no longer manage this on my own.' },
                { zeg: 'Wat gebeurt er na dit gesprek?', eigen: 'What happens after this conversation?' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?', eigen: 'Could you write down what we have agreed?' },
              ] },
            ],
          },
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'A meeting about my social assistance benefit (bijstand)',
            blokken: [
              { kop: 'How it works', type: 'tekst',
                tekst: 'If you receive a social assistance benefit (bijstand), you sometimes have a meeting with your klantmanager (case manager). It is about how you are doing, whether anything has changed in your situation, and the agreements about work or participation. It is a normal part of the benefit.' },
              { kop: 'Two things that are important', type: 'lijst', items: [
                'Report changes in your situation on time: living together, work, extra money, someone moving in with you, or moving house. Report it even if you are not sure. If you do not report it on time, the gemeente can ask money back.',
                'Cooperate with the agreements, such as coming to a meeting or taking steps to find work.',
              ] },
              { kop: 'What the klantmanager will ask', type: 'lijst', items: [
                'How are you doing at the moment?',
                'Has anything changed in your situation? (housing, family, money, health)',
                'Are you working, or doing something to find work?',
                'Are you managing to get by?',
              ] },
              { kop: 'How to prepare', type: 'lijst', items: [
                'Think about whether anything has changed since last time. Not sure? Mention it anyway.',
                'Bring: your ID document and your bank card. Sometimes the gemeente asks for bank statements — check your invitation letter.',
                'Did you receive a letter about this meeting? Bring it with you.',
                'Do you have problems, such as debts? You may mention them. The gemeente can sometimes help.',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?',
                  eigen: 'I do not understand, could you explain it more calmly?' },
                { zeg: 'Wat betekent dit voor mijn uitkering?',
                  eigen: 'What does this mean for my benefit?' },
                { zeg: 'Wat moet ik nu doen?',
                  eigen: 'What do I need to do now?' },
                'Ask the gemeente to put agreements on paper, so you can read them again at home.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'My child\'s school',
        vasteBlokken: [
          { kop: 'If the conversation is hard to follow', type: 'lijst', items: [
            { intro: 'Feel free to ask:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Could you say that more slowly, or in easier words?' },
            'You may bring someone you trust.',
            'Do you not speak the language well yet? Ask the school in advance if an interpreter can be there, or bring someone who can translate.',
          ] },
          { kop: 'Are 10 minutes too short?', type: 'tekst',
            tekst: 'Do you have more to discuss than fits in 10 minutes? Ask the teacher for a separate appointment. That is always possible, also at another time of year.' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: 'The 10-minute talk (10-minutengesprek) with the teacher',
            blokken: [
              { kop: 'How it works', type: 'tekst',
                tekst: 'A few times a year, the school invites all parents for a short talk with the teacher. It lasts about 10 minutes. Together you discuss how your child is doing at school.\n\nThis talk is for all parents, also when things are going well with your child. Because time is short, it helps to come prepared.' },
              { kop: 'What the teacher will tell or ask', type: 'lijst', items: [
                'How reading, maths and other subjects are going.',
                'How your child joins in in class and gets along with other children.',
                'Sometimes the teacher shows your child\'s work or test results.',
                'Does your child enjoy going to school? How are things at home?',
              ] },
              { kop: 'How to prepare', type: 'lijst', items: [
                'Ask your child beforehand: how is school going? What do you enjoy? What do you find difficult?',
                'The time is short. Think of one or two things you definitely want to ask and write them down.',
                'Did you receive a letter or a school report? Bring it with you.',
                'Are you worried about something? Start with that, so there is enough time for it.',
              ] },
              { kop: 'What you can say or ask', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?',
                  eigen: 'How is my child doing with reading and maths?' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?',
                  eigen: 'Does my child get along well with other children?' },
                { zeg: 'Wat kan ik thuis doen om te helpen?',
                  eigen: 'What can I do at home to help?' },
                'You know your child best. Say so if you see something different at home than the teacher sees at school.',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?',
                  eigen: 'I do not understand, could you say it differently?' },
              ] },
            ],
          },
        ],
      },

    ],
  },

  AR: {

    ui: {
      paginaTitel: 'استعداد جيد',
      welkom: 'هل لديك موعد قريب؟ سأساعدك على الاستعداد. هكذا تعرف ماذا تتوقع وماذا يمكنك أن تقول.',
      kiesCategorie: 'إلى أين ستذهب؟',
      kiesSituatie: 'ما سبب الموعد؟',
      verder: 'التالي ←',
      klaar: 'هذا كل شيء. هل تريد معرفة شيء آخر؟',
      opnieuw: '↺ موعد آخر',
      aiUitnodiging: 'هل لديك سؤال عن موعدك أنت؟ اكتب أو تكلّم في الأسفل.',
      aiPlaceholder: 'اطرح سؤالك...',
      aiSpreekTitel: 'تكلّم',
      aiFout: 'حدث خطأ ما. حاول مرة أخرى.',
      aiDisclaimer: '🤖 هذه مساعدة للاستعداد لموعدك. ليست نصيحة طبية أو قانونية. لا تشارك رقم BSN أو بيانات شخصية أخرى.',
      voorlezen: 'قراءة بصوت عالٍ',
      zegSluit: 'اضغط للإغلاق',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'الطبيب',
        vasteBlokken: [
          { kop: 'إذا كان من الصعب متابعة الحديث', type: 'lijst', items: [
            { intro: 'لا تتردد في السؤال:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'هل يمكنك أن تقول ذلك ببطء أكثر أو بكلمات أسهل؟' },
            'يمكنك إحضار شخص تثق به.',
            'ألا تتكلم اللغة جيداً بعد؟ اطلب مترجماً عندما تحجز الموعد، ويُفضّل عند الاتصال. من الأفضل ألا تُحضر طفلاً ليترجم في المحادثات الصعبة.',
          ] },
          { kop: 'لا يكلّف شيئاً', type: 'tekst',
            tekst: 'زيارة طبيب العائلة (huisarts) مجانية. ولا تُخصم من مبلغ التحمّل الخاص بك (eigen risico).' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'عندي شكوى صحية أو ألم',
            blokken: [
              { kop: 'كيف يعمل الطبيب', type: 'tekst',
                tekst: 'طبيب العائلة (huisarts) لا يعطي دواءً دائماً في الحال. الطبيب يطرح أولاً أسئلة ليفهم شكواك جيداً. أحياناً تكون النصيحة أن تنتظر أسبوعاً وتعود إذا لم تتحسن الحالة. كثير من الشكاوى تزول من تلقاء نفسها.' },
              { kop: 'ماذا سيسأل الطبيب', type: 'lijst', items: [
                'منذ متى عندك هذه الشكوى؟',
                'أين يوجد الألم بالضبط؟',
                'ماذا جرّبت حتى الآن؟',
                'هل عندك شكاوى أخرى؟',
                'كيف تسير أمورك عموماً: العمل، البيت، النوم؟',
              ] },
              { kop: 'كيف تستعد', type: 'lijst', items: [
                'فكّر متى بدأت الشكوى وماذا تشعر بالضبط.',
                'اكتب شكواك، أو اطلب من شخص أن يساعدك في ذلك.',
                'هل عندك أكثر من شكوى؟ قل ذلك في البداية، حتى يستطيع الطبيب تقسيم الوقت.',
                'هل تستعمل أدوية؟ أحضرها معك أو اكتب أسماءها.',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?',
                  eigen: 'لم أفهم، هل يمكنك أن تشرح مرة أخرى؟' },
                { zeg: 'Wat kan ik zelf doen?',
                  eigen: 'ماذا يمكنني أن أفعل بنفسي؟' },
                { zeg: 'Wanneer moet ik terugkomen?',
                  eigen: 'متى يجب أن أعود؟' },
                'اطلب من الطبيب أن يكتب المعلومات إذا لم تستطع حفظها.',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'أول مرة عند طبيب عائلة جديد',
            blokken: [
              { kop: 'كيف يعمل الأمر', type: 'tekst',
                tekst: 'يجب أولاً أن تكون مسجلاً في عيادة طبيب عائلة. تختار طبيب عائلة (huisarts) واحداً قريباً منك وتسجّل عنده. يصبح بعد ذلك طبيبك الثابت.' },
              { kop: 'ما تحتاجه للتسجيل', type: 'lijst', items: [
                'وثيقة هويتك.',
                'رقم الخدمة المدنية الخاص بك (BSN).',
                'تأمينك الصحي.',
              ] },
              { kop: 'كيف تستعد', type: 'lijst', items: [
                'ابحث عن طبيب عائلة قريب يقبل مرضى جدداً. في المدن الكبيرة يكون ذلك صعباً أحياناً. استمر في الاتصال أو اطلب المساعدة من شخص.',
                'سجّل بأسرع ما يمكن، حتى لو لم تكن مريضاً.',
                'هل عندك معلومات طبية من قبل؟ أحضرها معك إلى الزيارة الأولى.',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                { zeg: 'Neemt u nieuwe patiënten aan?',
                  eigen: 'هل تقبلون مرضى جدداً؟' },
                'اسأل كيف تسير الأمور: حجز موعد، وماذا تفعل في المساء أو في عطلة نهاية الأسبوع.',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'إلى طبيب مختص أو المستشفى',
            blokken: [
              { kop: 'كيف يعمل الأمر', type: 'tekst',
                tekst: 'تذهب أولاً إلى طبيب العائلة (huisarts)، وليس مباشرة إلى طبيب مختص. طبيب العائلة يقرّر إن كان المختص ضرورياً ويعطيك عندها إحالة. بدون إحالة، لا يدفع تأمينك للمختص في العادة.\n\nطبيب العائلة لا يحيلك دائماً. أحياناً يعالج شكواك بنفسه. هذا يعني أن المختص غير ضروري في ذلك الوقت.' },
              { kop: 'ماذا سيسأل الطبيب', type: 'lijst', items: [
                'ما هي شكواك ومنذ متى؟',
                'ماذا تمت تجربته حتى الآن؟',
                'لماذا تعتقد أن المختص ضروري؟',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                'اشرح لماذا أنت قلق.',
                { zeg: 'Waarom is een specialist nu nog niet nodig?',
                  eigen: 'لماذا المختص غير ضروري الآن بعد؟' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?',
                  eigen: 'متى يجب أن أعود إذا لم تتحسن الحالة؟' },
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'أذهب من أجل طفلي',
            blokken: [
              { kop: 'كيف يعمل الأمر', type: 'tekst',
                tekst: 'للشكاوى والأمراض تذهب مع طفلك إلى طبيب العائلة (huisarts)، تماماً كما تفعل لنفسك. الطبيب يطرح أسئلة ويفحص طفلك.\n\nللنمو والتطعيمات والفحوصات العامة لا تذهب إلى طبيب العائلة، بل إلى مركز رعاية الطفل (consultatiebureau) أو خدمة صحة الشباب (GGD). هذا مكان منفصل للأطفال.' },
              { kop: 'ماذا سيسأل الطبيب', type: 'lijst', items: [
                'منذ متى عند طفلك هذه الشكوى؟',
                'هل عند طفلك حرارة، وكم درجتها؟',
                'هل يأكل طفلك ويشرب بشكل طبيعي؟',
                'ماذا فعلت أو أعطيت حتى الآن؟',
              ] },
              { kop: 'كيف تستعد', type: 'lijst', items: [
                'فكّر متى بدأ الأمر وما الذي تلاحظه على طفلك.',
                'هل تعرف وزن طفلك؟ هذا مفيد أحياناً.',
                'هل يستعمل طفلك أدوية؟ أحضرها أو اكتب أسماءها.',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                'أنت تعرف طفلك أفضل من الجميع. قل ذلك إذا كان طفلك مختلفاً حقاً عن المعتاد.',
                { zeg: 'Waar moet ik op letten?',
                  eigen: 'ما الذي يجب أن أنتبه إليه؟' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?',
                  eigen: 'متى يجب أن أعود أو أتصل؟' },
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'الحديث عن أمر شخصي أو صعب',
            blokken: [
              { kop: 'كيف يعمل الأمر', type: 'tekst',
                tekst: 'يمكنك أيضاً الذهاب إلى طبيب العائلة (huisarts) بسبب التوتر، أو قلة النوم، أو الحزن، أو الهموم، أو وضع صعب في البيت. الطبيب يتعامل مع ذلك بسرّية.' },
              { kop: 'كيف تستعد', type: 'lijst', items: [
                'فكّر مسبقاً فيما تريد أن تقوله. يمكنك كتابته وقراءته.',
                'لا يجب أن تحكي كل شيء دفعة واحدة. ابدأ بالأهم.',
                'هل تريد وقتاً كافياً لهذا؟ قل عند حجز الموعد إنك تريد التحدث عن أمر ما. أحياناً تحصل عندها على موعد أطول.',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                { zeg: 'Dit is moeilijk voor mij om te vertellen.',
                  eigen: 'من الصعب عليّ أن أتحدث عن هذا.' },
                { zeg: 'Met wie kan ik hierover verder praten?',
                  eigen: 'مع من يمكنني متابعة الحديث عن هذا؟',
                  na: 'طبيب العائلة يمكنه إحالتك.' },
                'يمكنك إحضار شخص تثق به.',
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
        naam: 'البلدية (gemeente)',
        vasteBlokken: [
          { kop: 'إذا كان من الصعب متابعة الحديث', type: 'lijst', items: [
            { intro: 'لا تتردد في السؤال:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'هل يمكنك أن تقول ذلك ببطء أكثر أو بكلمات أسهل؟' },
            'يمكنك إحضار شخص تثق به.',
            'ألا تتكلم اللغة جيداً بعد؟ اطلب مترجماً عندما تحجز الموعد.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'إنجاز أمر عند الشباك (جواز سفر، هوية أو وثيقة أخرى)',
            blokken: [
              { kop: 'كيف يعمل الأمر', type: 'tekst',
                tekst: 'للحصول على جواز سفر أو بطاقة هوية أو رخصة قيادة أو مستخرج رسمي (uittreksel)، عادةً تحجز موعداً أولاً، عبر الإنترنت أو بالهاتف. لا يمكنك دائماً الدخول مباشرة.\n\nجواز السفر أو بطاقة الهوية أو رخصة القيادة الجديدة لا تكون جاهزة فوراً. تأخذها لاحقاً، غالباً بعد أسبوع تقريباً.' },
              { kop: 'ماذا تُحضر معك', type: 'lijst', items: [
                'تأكيد موعدك، إذا كنت قد حصلت عليه.',
                'وثيقة هويتك. أحضرها حتى لو كانت منتهية الصلاحية.',
                'بطاقة البنك (pinpas). عند الشباك تدفع فوراً، غالباً بالبطاقة فقط.',
                'لجواز سفر أو بطاقة هوية أو رخصة قيادة: صورة حديثة من مصوّر. الصورة التي تلتقطها بنفسك غالباً لا تُقبل.',
              ] },
              { kop: 'كيف تستعد', type: 'lijst', items: [
                'انظر في التأكيد ماذا يجب أن تُحضر. لست متأكداً؟ اتصل بالـgemeente قبل أن تذهب.',
                'احضر في الوقت المحدد. إذا تأخرت، قد تضطر أحياناً إلى حجز موعد جديد.',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                { zeg: 'Wat kost het?', eigen: 'كم يكلّف؟' },
                { zeg: 'Wanneer is het klaar?', eigen: 'متى يكون جاهزاً؟' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?', eigen: 'هل يجب أن أحجز موعداً لاستلامه؟' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?', eigen: 'لا أفهم، هل يمكنك أن تشرح بهدوء أكثر؟' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'حديث عن المساعدة أو الرعاية في المنزل (Wmo)',
            blokken: [
              { kop: 'كيف يعمل الأمر', type: 'tekst',
                tekst: 'هل تحتاج إلى مساعدة، مثلاً في أعمال المنزل، أو في التنقّل، أو تعديل في البيت؟ عندها يكون لك أولاً حديث مع شخص من الـgemeente. يُسمّى هذا غالباً keukentafelgesprek (حديث حول طاولة المطبخ). يمكن أن يكون في بيتك أو في مبنى البلدية.\n\nفي الحديث تنظر الـgemeente معك في ما تستطيع فعله بنفسك، وما يستطيع من حولك فعله، وأين تحتاج إلى مساعدة.' },
              { kop: 'ماذا ستسأل الـgemeente', type: 'lijst', items: [
                'ما الذي يسير جيداً في البيت، وما الذي لم يعد ممكناً؟',
                'من يساعدك الآن؟ (العائلة، الجيران، المعارف)',
                'كيف هي صحتك؟',
                'ما الذي تودّ أن تستطيع فعله بنفسك من جديد؟',
              ] },
              { kop: 'كيف تستعد', type: 'lijst', items: [
                'فكّر مسبقاً في ما لم يعد ممكناً. أعطِ أمثلة من يومك، مثل صعود الدرج، أو التسوّق، أو أعمال المنزل.',
                'اكتب ما تريد أن تقوله، أو اطلب من أحد أن يساعدك في ذلك.',
                'يمكنك أن تُحضر معك شخصاً. توجد أيضاً مساعدة مستقلّة مجانية في هذا الحديث: cliëntondersteuner (داعم مستقل للعميل). اسأل عنه عندما تحجز الموعد.',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.', eigen: 'لم أعد أستطيع القيام بهذا وحدي.' },
                { zeg: 'Wat gebeurt er na dit gesprek?', eigen: 'ماذا يحدث بعد هذا الحديث؟' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?', eigen: 'هل يمكنك أن تكتب ما اتفقنا عليه؟' },
              ] },
            ],
          },
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'موعد عن إعانتي (المساعدة الاجتماعية bijstand)',
            blokken: [
              { kop: 'كيف يعمل الأمر', type: 'tekst',
                tekst: 'إذا كنت تحصل على مساعدة اجتماعية (bijstand)، فأحياناً يكون لديك موعد مع الموظف المسؤول عن ملفك (klantmanager). الموعد عن أحوالك، وهل تغيّر شيء في وضعك، وما هي الاتفاقات حول العمل أو المشاركة. هذا جزء طبيعي من الإعانة.' },
              { kop: 'أمران مهمان', type: 'lijst', items: [
                'أبلغ عن تغييرات وضعك في الوقت المناسب: السكن المشترك، العمل، مال إضافي، شخص ينتقل للعيش معك، أو الانتقال إلى بيت آخر. أبلغ حتى لو كنت غير متأكد. إذا لم تبلغ في الوقت المناسب، يمكن أن تطالبك البلدية بإرجاع المال.',
                'تعاون مع الاتفاقات، مثل الحضور إلى موعد أو القيام بخطوات لإيجاد عمل.',
              ] },
              { kop: 'ماذا سيسأل الـklantmanager', type: 'lijst', items: [
                'كيف حالك في هذه الفترة؟',
                'هل تغيّر شيء في وضعك؟ (السكن، العائلة، المال، الصحة)',
                'هل تعمل، أو تفعل شيئاً لإيجاد عمل؟',
                'هل تستطيع تدبير أمورك المالية؟',
              ] },
              { kop: 'كيف تستعد', type: 'lijst', items: [
                'فكّر هل تغيّر شيء منذ آخر مرة. غير متأكد؟ قله على أي حال.',
                'أحضر معك: وثيقة هويتك وبطاقتك البنكية. أحياناً تطلب البلدية كشوف حساب بنكية، انظر في رسالة الدعوة.',
                'هل وصلتك رسالة عن هذا الموعد؟ أحضرها معك.',
                'هل عندك مشاكل، مثل ديون؟ يمكنك ذكرها. البلدية تستطيع المساعدة أحياناً.',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?',
                  eigen: 'لم أفهم، هل يمكنك أن تشرح بهدوء أكثر؟' },
                { zeg: 'Wat betekent dit voor mijn uitkering?',
                  eigen: 'ماذا يعني هذا لإعانتي؟' },
                { zeg: 'Wat moet ik nu doen?',
                  eigen: 'ماذا يجب أن أفعل الآن؟' },
                'اطلب من البلدية أن تكتب الاتفاق على ورقة، حتى تستطيع قراءته في البيت.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'مدرسة طفلي',
        vasteBlokken: [
          { kop: 'إذا كان من الصعب متابعة الحديث', type: 'lijst', items: [
            { intro: 'لا تتردد في السؤال:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'هل يمكنك أن تقول ذلك ببطء أكثر أو بكلمات أسهل؟' },
            'يمكنك إحضار شخص تثق به.',
            'ألا تتكلم اللغة جيداً بعد؟ اسأل المدرسة مسبقاً إن كان يمكن وجود مترجم، أو أحضر شخصاً يستطيع الترجمة.',
          ] },
          { kop: 'هل 10 دقائق قصيرة جداً؟', type: 'tekst',
            tekst: 'هل عندك ما تناقشه أكثر مما يتسع في 10 دقائق؟ اطلب من المعلم موعداً منفصلاً. هذا ممكن دائماً، وأيضاً في وقت آخر من السنة.' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: 'محادثة الـ10 دقائق (10-minutengesprek) مع المعلم',
            blokken: [
              { kop: 'كيف يعمل الأمر', type: 'tekst',
                tekst: 'عدة مرات في السنة تدعو المدرسة جميع الآباء والأمهات لمحادثة قصيرة مع المعلم أو المعلمة. تستغرق حوالي 10 دقائق. تتحدثون معاً عن أحوال طفلك في المدرسة.\n\nهذه المحادثة لجميع الآباء والأمهات، حتى عندما تكون أمور طفلك جيدة. لأن الوقت قصير، يساعدك أن تأتي مستعداً.' },
              { kop: 'ماذا سيقول أو يسأل المعلم', type: 'lijst', items: [
                'كيف تسير القراءة والحساب والمواد الأخرى.',
                'كيف يشارك طفلك في الصف ويتعامل مع الأطفال الآخرين.',
                'أحياناً يعرض المعلم أعمال طفلك أو نتائج اختباراته.',
                'هل يذهب طفلك إلى المدرسة بسرور؟ كيف الأمور في البيت؟',
              ] },
              { kop: 'كيف تستعد', type: 'lijst', items: [
                'اسأل طفلك مسبقاً: كيف تسير المدرسة؟ ما الذي يعجبك؟ ما الذي تجده صعباً؟',
                'الوقت قصير. فكّر في أمر أو أمرين تريد بالتأكيد السؤال عنهما واكتبهما.',
                'هل وصلتك رسالة أو تقرير مدرسي؟ أحضره معك.',
                'هل أنت قلق من شيء؟ ابدأ به، حتى يكون هناك وقت كافٍ له.',
              ] },
              { kop: 'ماذا يمكنك أن تقول أو تسأل', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?',
                  eigen: 'كيف تسير القراءة والحساب؟' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?',
                  eigen: 'هل يتعامل طفلي جيداً مع الأطفال الآخرين؟' },
                { zeg: 'Wat kan ik thuis doen om te helpen?',
                  eigen: 'ماذا يمكنني أن أفعل في البيت للمساعدة؟' },
                'أنت تعرف طفلك أفضل من الجميع. قل ذلك إذا رأيت في البيت شيئاً مختلفاً عما يراه المعلم في المدرسة.',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?',
                  eigen: 'لم أفهم، هل يمكنك قوله بطريقة أخرى؟' },
              ] },
            ],
          },
        ],
      },

    ],
  },

  TR: {

    ui: {
      paginaTitel: 'İyi Hazırlanmış',
      welkom: 'Bir randevun mu var? Hazırlanmana yardım ederim. Böylece ne bekleyeceğini ve ne söyleyebileceğini bilirsin.',
      kiesCategorie: 'Nereye gidiyorsun?',
      kiesSituatie: 'Randevu ne için?',
      verder: 'Devam →',
      klaar: 'Bu kadardı. Başka bir şey öğrenmek ister misin?',
      opnieuw: '↺ Başka bir randevu',
      aiUitnodiging: 'Kendi randevunla ilgili bir sorun mu var? Aşağıya yaz veya konuş.',
      aiPlaceholder: 'Sorunu sor...',
      aiSpreekTitel: 'Konuş',
      aiFout: 'Bir şeyler ters gitti. Tekrar dene.',
      aiDisclaimer: '🤖 Bu, randevuna hazırlanman için bir yardımdır. Tıbbi veya hukuki tavsiye değildir. BSN numaranı veya başka kişisel bilgilerini paylaşma.',
      voorlezen: 'Sesli oku',
      zegSluit: 'Kapatmak için dokun',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'Doktor',
        vasteBlokken: [
          { kop: 'Konuşmayı takip etmek zorsa', type: 'lijst', items: [
            { intro: 'Çekinmeden sor:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Daha yavaş veya daha kolay kelimelerle söyleyebilir misiniz?' },
            'Güvendiğin birini yanında getirebilirsin.',
            'Dili henüz iyi konuşamıyor musun? Randevuyu alırken, tercihen telefonla ararken, bir tercüman iste. Zor konuşmalarda tercümanlık yapması için çocuk getirmemen daha iyi olur.',
          ] },
          { kop: 'Hiçbir ücret ödemezsin', type: 'tekst',
            tekst: 'Aile hekimine (huisarts) gitmek ücretsizdir. Muafiyet tutarından (eigen risico) da düşülmez.' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'Bir şikâyetim veya ağrım var',
            blokken: [
              { kop: 'Doktor nasıl çalışır', type: 'tekst',
                tekst: 'Aile hekimi (huisarts) her zaman hemen ilaç vermez. Doktor önce şikâyetini iyi anlamak için sorular sorar. Bazen tavsiye, bir hafta beklemek ve iyileşmezse geri gelmektir. Birçok şikâyet kendiliğinden geçer.' },
              { kop: 'Doktor ne soracak', type: 'lijst', items: [
                'Bu şikâyetin ne zamandan beri var?',
                'Ağrı tam olarak nerede?',
                'Şimdiye kadar ne denedin?',
                'Başka şikâyetlerin var mı?',
                'Genel olarak nasılsın: iş, ev, uyku?',
              ] },
              { kop: 'Nasıl hazırlanırsın', type: 'lijst', items: [
                'Şikâyetin ne zaman başladığını ve tam olarak ne hissettiğini düşün.',
                'Şikâyetini yaz, veya birinden bu konuda yardım iste.',
                'Birden fazla şikâyetin mi var? Bunu başta söyle, böylece doktor zamanı bölebilir.',
                'İlaç kullanıyor musun? Yanında getir veya isimlerini yaz.',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?',
                  eigen: 'Anlamadım, bir kez daha açıklayabilir misiniz?' },
                { zeg: 'Wat kan ik zelf doen?',
                  eigen: 'Kendim ne yapabilirim?' },
                { zeg: 'Wanneer moet ik terugkomen?',
                  eigen: 'Ne zaman geri gelmeliyim?' },
                'Aklında tutamayacaksan doktordan yazmasını iste.',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'İlk kez yeni bir aile hekimine gitmek',
            blokken: [
              { kop: 'Nasıl işler', type: 'tekst',
                tekst: 'Önce bir aile hekimi muayenehanesine kayıtlı olman gerekir. Yakınında bir aile hekimi (huisarts) seçer ve oraya kaydolursun. O doktor artık senin sabit doktorun olur.' },
              { kop: 'Kayıt için neye ihtiyacın var', type: 'lijst', items: [
                'Kimlik belgen.',
                'Vatandaşlık servis numaran (BSN).',
                'Sağlık sigortan.',
              ] },
              { kop: 'Nasıl hazırlanırsın', type: 'lijst', items: [
                'Yakınında yeni hasta kabul eden bir aile hekimi ara. Büyük şehirlerde bu bazen zordur. Aramaya devam et veya birinden yardım iste.',
                'Hasta olmasan bile, mümkün olur olmaz kaydol.',
                'Eski tıbbi bilgilerin var mı? İlk ziyarete yanında getir.',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                { zeg: 'Neemt u nieuwe patiënten aan?',
                  eigen: 'Yeni hasta kabul ediyor musunuz?' },
                'Nasıl işlediğini sor: randevu almayı, ve akşamları veya hafta sonu ne yapacağını.',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'Uzmana veya hastaneye gitmek',
            blokken: [
              { kop: 'Nasıl işler', type: 'tekst',
                tekst: 'Önce aile hekimine (huisarts) gidersin, doğrudan uzmana değil. Aile hekimi uzmanın gerekli olup olmadığını değerlendirir ve gerekiyorsa sevk verir. Sevk olmadan sigortan uzmanı genellikle ödemez.\n\nAile hekimi her zaman sevk etmez. Bazen şikâyetini kendisi tedavi eder. Bu, o an için uzmanın henüz gerekli olmadığı anlamına gelir.' },
              { kop: 'Doktor ne soracak', type: 'lijst', items: [
                'Şikâyetin ne ve ne zamandan beri var?',
                'Şimdiye kadar ne denendi?',
                'Neden bir uzmanın gerekli olduğunu düşünüyorsun?',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                'Neden endişelendiğini açıkla.',
                { zeg: 'Waarom is een specialist nu nog niet nodig?',
                  eigen: 'Uzman neden şimdi henüz gerekli değil?' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?',
                  eigen: 'İyileşmezse ne zaman geri gelmeliyim?' },
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'Çocuğum için gidiyorum',
            blokken: [
              { kop: 'Nasıl işler', type: 'tekst',
                tekst: 'Şikâyetler ve hastalıklar için çocuğunla aile hekimine (huisarts) gidersin, tıpkı kendin için gittiğin gibi. Doktor sorular sorar ve çocuğunu muayene eder.\n\nBüyüme, aşılar ve genel kontroller için aile hekimine değil, çocuk sağlığı merkezine (consultatiebureau) veya gençlik sağlık hizmetine (GGD) gidersin. Orası çocuklar için ayrı bir yerdir.' },
              { kop: 'Doktor ne soracak', type: 'lijst', items: [
                'Çocuğunun şikâyeti ne zamandan beri var?',
                'Çocuğunun ateşi var mı, kaç derece?',
                'Çocuğun normal yiyip içiyor mu?',
                'Şimdiye kadar ne yaptın veya ne verdin?',
              ] },
              { kop: 'Nasıl hazırlanırsın', type: 'lijst', items: [
                'Ne zaman başladığını ve çocuğunda ne fark ettiğini düşün.',
                'Çocuğunun kilosunu biliyor musun? Bazen işe yarar.',
                'Çocuğun ilaç kullanıyor mu? Yanında getir veya isimlerini yaz.',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                'Çocuğunu en iyi sen tanırsın. Çocuğun gerçekten normalden farklıysa bunu söyle.',
                { zeg: 'Waar moet ik op letten?',
                  eigen: 'Neye dikkat etmeliyim?' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?',
                  eigen: 'Ne zaman geri gelmeli veya aramalıyım?' },
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'Kişisel veya zor bir konuyu konuşmak',
            blokken: [
              { kop: 'Nasıl işler', type: 'tekst',
                tekst: 'Stres, uyku sorunları, üzüntü, endişeler veya evdeki zor bir durum için de aile hekimine (huisarts) gidebilirsin. Doktor bunu gizli tutar.' },
              { kop: 'Nasıl hazırlanırsın', type: 'lijst', items: [
                'Ne anlatmak istediğini önceden düşün. Yazıp okuyabilirsin.',
                'Her şeyi bir seferde anlatmak zorunda değilsin. En önemli olanla başla.',
                'Bunun için sakin bir zaman mı istiyorsun? Randevuyu alırken bir konu hakkında konuşmak istediğini söyle. Bazen o zaman daha uzun bir randevu alırsın.',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                { zeg: 'Dit is moeilijk voor mij om te vertellen.',
                  eigen: 'Bunu anlatmak benim için zor.' },
                { zeg: 'Met wie kan ik hierover verder praten?',
                  eigen: 'Bu konuda kiminle daha fazla konuşabilirim?',
                  na: 'Aile hekimi seni sevk edebilir.' },
                'Güvendiğin birini yanında getirebilirsin.',
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
        naam: 'Belediye (gemeente)',
        vasteBlokken: [
          { kop: 'Konuşmayı takip etmek zorsa', type: 'lijst', items: [
            { intro: 'Çekinmeden sor:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Daha yavaş veya daha kolay kelimelerle söyleyebilir misiniz?' },
            'Güvendiğin birini yanında getirebilirsin.',
            'Dili henüz iyi konuşamıyor musun? Randevuyu alırken bir tercüman iste.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'Gişede bir işlem yaptırmak (pasaport, kimlik veya başka bir belge)',
            blokken: [
              { kop: 'Nasıl işler', type: 'tekst',
                tekst: 'Pasaport, kimlik kartı, ehliyet veya resmi bir belge (uittreksel) için genellikle önce internetten veya telefonla randevu alırsın. Her zaman öylece içeri giremezsin.\n\nYeni bir pasaport, kimlik kartı veya ehliyet hemen hazır olmaz. Sonra alırsın, çoğu zaman yaklaşık bir hafta sonra.' },
              { kop: 'Yanına ne alırsın', type: 'lijst', items: [
                'Aldıysan, randevu onayın.',
                'Kimlik belgen. Süresi dolmuş olsa bile yanına al.',
                'Banka kartın (pinpas). Gişede hemen ödersin, çoğu zaman sadece kartla.',
                'Pasaport, kimlik kartı veya ehliyet için: bir fotoğrafçıdan yeni bir vesikalık. Kendi çektiğin fotoğraf genellikle kabul edilmez.',
              ] },
              { kop: 'Nasıl hazırlanırsın', type: 'lijst', items: [
                'Onayda ne getirmen gerektiğine bak. Emin değil misin? Gitmeden önce gemeente’yi ara.',
                'Zamanında gel. Geç kalırsan bazen yeni bir randevu almak zorunda kalırsın.',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                { zeg: 'Wat kost het?', eigen: 'Ne kadar tutuyor?' },
                { zeg: 'Wanneer is het klaar?', eigen: 'Ne zaman hazır olur?' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?', eigen: 'Almak için randevu almam gerekiyor mu?' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?', eigen: 'Anlamıyorum, biraz daha sakin anlatabilir misiniz?' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'Evde yardım veya bakım hakkında bir görüşme (Wmo)',
            blokken: [
              { kop: 'Nasıl işler', type: 'tekst',
                tekst: 'Yardıma mı ihtiyacın var, örneğin ev işlerinde, ulaşımda veya evde bir değişiklikte? O zaman önce gemeente’den biriyle bir görüşme yaparsın. Buna çoğu zaman keukentafelgesprek (mutfak masası görüşmesi) denir. Bu görüşme senin evinde veya belediye binasında olabilir.\n\nGörüşmede gemeente seninle birlikte neyi kendin yapabildiğine, çevrendeki insanların ne yapabileceğine ve nerede yardıma ihtiyaç olduğuna bakar.' },
              { kop: 'Gemeente ne soracak', type: 'lijst', items: [
                'Evde ne iyi gidiyor, ne artık olmuyor?',
                'Sana şu an kimler yardım ediyor? (aile, komşular, tanıdıklar)',
                'Sağlığın nasıl?',
                'Neyi tekrar kendin yapabilmek istersin?',
              ] },
              { kop: 'Nasıl hazırlanırsın', type: 'lijst', items: [
                'Neyin artık olmadığını önceden düşün. Gününden örnekler ver, örneğin merdiven çıkmak, alışveriş veya ev işleri.',
                'Ne anlatmak istediğini yaz, ya da birinden bu konuda yardım iste.',
                'Yanında biri getirebilirsin. Bu görüşmede ücretsiz bağımsız yardım da var: bir cliëntondersteuner (bağımsız danışman). Randevu alırken bunu sor.',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.', eigen: 'Bunu artık tek başıma yapamıyorum.' },
                { zeg: 'Wat gebeurt er na dit gesprek?', eigen: 'Bu görüşmeden sonra ne olacak?' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?', eigen: 'Anlaştıklarımızı yazabilir misiniz?' },
              ] },
            ],
          },
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'Sosyal yardımım (bijstand) hakkında bir görüşme',
            blokken: [
              { kop: 'Nasıl işler', type: 'tekst',
                tekst: 'Sosyal yardım (bijstand) alıyorsan, bazen klantmanager (dosya sorumlusu) ile bir görüşmen olur. Görüşme, nasıl olduğun, durumunda bir şey değişip değişmediği ve iş veya katılım konusundaki anlaşmalar hakkındadır. Bu, yardımın normal bir parçasıdır.' },
              { kop: 'Önemli olan iki şey', type: 'lijst', items: [
                'Durumundaki değişiklikleri zamanında bildir: birlikte yaşama, iş, ek para, yanına taşınan biri, veya taşınma. Emin değilsen de bildir. Zamanında bildirmezsen belediye parayı geri isteyebilir.',
                'Anlaşmalara uy, örneğin bir görüşmeye gelmek veya iş bulmak için adımlar atmak.',
              ] },
              { kop: 'Klantmanager ne soracak', type: 'lijst', items: [
                'Şu anda nasılsın?',
                'Durumunda bir şey değişti mi? (ev, aile, para, sağlık)',
                'Çalışıyor musun, veya iş bulmak için bir şey yapıyor musun?',
                'Geçinebiliyor musun?',
              ] },
              { kop: 'Nasıl hazırlanırsın', type: 'lijst', items: [
                'Geçen seferden beri bir şey değişti mi düşün. Emin değil misin? Yine de söyle.',
                'Yanında getir: kimlik belgen ve banka kartın. Bazen belediye hesap dökümü ister, davet mektubuna bak.',
                'Bu görüşme hakkında bir mektup aldın mı? Yanında getir.',
                'Borç gibi sorunların mı var? Bunları söyleyebilirsin. Belediye bazen yardım edebilir.',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?',
                  eigen: 'Anlamadım, daha sakin açıklayabilir misiniz?' },
                { zeg: 'Wat betekent dit voor mijn uitkering?',
                  eigen: 'Bu benim yardımım için ne anlama geliyor?' },
                { zeg: 'Wat moet ik nu doen?',
                  eigen: 'Şimdi ne yapmam gerekiyor?' },
                'Belediyeden anlaşmayı kâğıda yazmasını iste, böylece evde tekrar okuyabilirsin.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'Çocuğumun okulu',
        vasteBlokken: [
          { kop: 'Konuşmayı takip etmek zorsa', type: 'lijst', items: [
            { intro: 'Çekinmeden sor:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Daha yavaş veya daha kolay kelimelerle söyleyebilir misiniz?' },
            'Güvendiğin birini yanında getirebilirsin.',
            'Dili henüz iyi konuşamıyor musun? Okula önceden bir tercüman olup olamayacağını sor, veya çeviri yapabilecek birini yanında getir.',
          ] },
          { kop: '10 dakika çok mu kısa?', type: 'tekst',
            tekst: 'Konuşacakların 10 dakikaya sığmıyor mu? Öğretmenden ayrı bir randevu iste. Bu her zaman mümkündür, yılın başka bir zamanında da.' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: 'Öğretmenle 10 dakikalık görüşme (10-minutengesprek)',
            blokken: [
              { kop: 'Nasıl işler', type: 'tekst',
                tekst: 'Okul, yılda birkaç kez bütün velileri öğretmenle kısa bir görüşmeye davet eder. Yaklaşık 10 dakika sürer. Birlikte çocuğunun okulda nasıl olduğunu konuşursunuz.\n\nBu görüşme bütün veliler içindir, çocuğun iyi gidiyorsa bile. Süre kısa olduğu için hazırlıklı gelmek işe yarar.' },
              { kop: 'Öğretmen ne anlatacak veya soracak', type: 'lijst', items: [
                'Okuma, matematik ve diğer derslerin nasıl gittiği.',
                'Çocuğunun sınıfa nasıl katıldığı ve diğer çocuklarla nasıl geçindiği.',
                'Bazen öğretmen çocuğunun çalışmalarını veya sınav sonuçlarını gösterir.',
                'Çocuğun okula severek mi gidiyor? Evde işler nasıl?',
              ] },
              { kop: 'Nasıl hazırlanırsın', type: 'lijst', items: [
                'Çocuğuna önceden sor: okul nasıl gidiyor? Neyi seviyorsun? Neyi zor buluyorsun?',
                'Süre kısa. Mutlaka sormak istediğin bir veya iki şeyi düşün ve yaz.',
                'Bir mektup veya karne aldın mı? Yanında getir.',
                'Bir konuda endişeleniyor musun? Onunla başla, böylece ona yeterli zaman kalır.',
              ] },
              { kop: 'Ne söyleyebilir veya sorabilirsin', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?',
                  eigen: 'Okuma ve matematik nasıl gidiyor?' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?',
                  eigen: 'Çocuğum diğer çocuklarla iyi geçiniyor mu?' },
                { zeg: 'Wat kan ik thuis doen om te helpen?',
                  eigen: 'Yardımcı olmak için evde ne yapabilirim?' },
                'Çocuğunu en iyi sen tanırsın. Evde, öğretmenin okulda gördüğünden farklı bir şey görüyorsan söyle.',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?',
                  eigen: 'Anlamadım, başka türlü söyleyebilir misiniz?' },
              ] },
            ],
          },
        ],
      },

    ],
  },

  TI: {

    ui: {
      paginaTitel: 'ጽቡቕ ተዳሊኻ',
      welkom: 'ናብ ቆጸራ ክትከይድ ዲኻ? ንኽትዳሎ ክሕግዘካ እየ። ከምኡ እንታይ ከም ትጽበ ን እንታይ ክትብል ከም ትኽእል ትፈልጥ።',
      kiesCategorie: 'ናበይ ኢኻ ትኸይድ?',
      kiesSituatie: 'ንምንታይ ኢኻ ትኸይድ?',
      verder: 'ቀጽል →',
      klaar: 'እዚ እዩ ነይሩ። ካልእ ክትፈልጥ ትደሊ ዲኻ?',
      opnieuw: '↺ ካልእ ቆጸራ',
      aiUitnodiging: 'ብዛዕባ ቆጸራኻ ናይ ገዛእ ርእስኻ ሕቶ ኣለካ ድዩ? ኣብ ታሕቲ ጽሓፍ ወይ ተዛረብ።',
      aiPlaceholder: 'ሕቶኻ ሕተት...',
      aiSpreekTitel: 'ተዛረብ',
      aiFout: 'ጌጋ ተፈጢሩ። እንደገና ፈትን።',
      aiDisclaimer: '🤖 እዚ ንቆጸራኻ ንምድላው ዝሕግዝ እዩ። ሕክምናዊ ወይ ሕጋዊ ምኽሪ ኣይኮነን። BSN ወይ ካልእ ውልቃዊ ሓበሬታ ኣይትካፈል።',
      voorlezen: 'ኣንብበለይ',
      zegSluit: 'ንምዕጻው ጠውቕ',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'ሓኪም',
        vasteBlokken: [
          { kop: 'ዝርርብ ንምስዓብ ከቢድ እንተኾይኑ', type: 'lijst', items: [
            { intro: 'ብዘይ ፍርሒ ሕተት:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'ብዝያዳ ቀስ ኢልኩም ወይ ብቐለልቲ ቃላት ክትብልዎ ትኽእሉ ዶ?' },
            'ዝኣምኖ ሰብ ሒዝካ ክትመጽእ ትኽእል ኢኻ።',
            'ነቲ ቋንቋ ገና ጽቡቕ ዘይትዛረብ ዲኻ? ቆጸራ ክትገብር ከለኻ ተርጓሚ ሕተት፣ ብተሌፎን ክትድውል ከለኻ ይሓይሽ። ኣብ ከበድቲ ዝርርባት ቆልዓ ንኽትርጉም ኣይትውሰድ።',
          ] },
          { kop: 'ገንዘብ ኣይሓትትን', type: 'tekst',
            tekst: 'ናብ ሓኪም ስድራቤት (huisarts) ምኻድ ብነጻ እዩ። ካብ eigen risico (ውልቃዊ ተሓታትነት) ውን ኣይቁረጽን።' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'ጥርዓን ወይ ቃንዛ ኣለኒ',
            blokken: [
              { kop: 'ሓኪም ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'ሓኪም ስድራቤት (huisarts) ኩሉ ግዜ ብቕጽበት መድሃኒት ኣይህብን። ሓኪም መጀመርታ ጥርዓንካ ጽቡቕ ንኽርዳእ ሕቶታት ይሓትት። ሓደ ሓደ ግዜ እቲ ምኽሪ ሓደ ሰሙን ተጸበ እሞ እንተዘይሓሸ ተመለስ እዩ። ብዙሓት ጥርዓናት ባዕሎም ይሓልፉ።' },
              { kop: 'ሓኪም እንታይ ክሓትት እዩ', type: 'lijst', items: [
                'ካብ መዓስ ጀሚሩ እዩ እዚ ጥርዓን ዘለካ?',
                'እቲ ቃንዛ ብልክዕ ኣበይ እዩ?',
                'እንታይ ፈቲንካ ኣለኻ?',
                'ካልእ ጥርዓናት ኣለካ ድዩ?',
                'ብኻልእ ወገን ከመይ ኣለኻ: ስራሕ፣ ገዛ፣ ድቃስ?',
              ] },
              { kop: 'ከመይ ትዳሎ', type: 'lijst', items: [
                'እቲ ጥርዓን መዓስ ከም ዝጀመረን እንታይ ብልክዕ ከም ትስምዖን ሕሰብ።',
                'ጥርዓንካ ጽሓፎ፣ ወይ ሰብ ኣብዚ ክሕግዘካ ሕተት።',
                'ካብ ሓደ ንላዕሊ ጥርዓን ኣለካ ድዩ? ኣብ መጀመርታ በሎ፣ ከምኡ ሓኪም ነቲ ግዜ ክመቓቕሎ ይኽእል።',
                'መድሃኒት ትወስድ ዲኻ? ሒዝካዮም ምጻእ ወይ ኣስማቶም ጽሓፍ።',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?',
                  eigen: 'ኣይተረድኣንን፣ እንደገና ክትገልጹለይ ትኽእሉ ዶ?' },
                { zeg: 'Wat kan ik zelf doen?',
                  eigen: 'ባዕለይ እንታይ ክገብር እኽእል?' },
                { zeg: 'Wanneer moet ik terugkomen?',
                  eigen: 'መዓስ ክምለስ ኣለኒ?' },
                'ክትዝክሮ እንተዘይክኢልካ ሓኪም ንኽጽሕፎ ሕተት።',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'ንመጀመርታ ግዜ ናብ ሓድሽ ሓኪም ስድራቤት',
            blokken: [
              { kop: 'ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'መጀመርታ ኣብ ሓደ ክሊኒክ ሓኪም ስድራቤት ተመዝጊብካ ክትከውን ኣለካ። ሓደ ሓኪም ስድራቤት (huisarts) ኣብ ጥቓኻ ትመርጽ እሞ ኣብኡ ትምዝገብ። ንሱ ድማ ቀዋሚ ሓኪምካ ይኸውን።' },
              { kop: 'ንምምዝጋብ እንታይ የድልየካ', type: 'lijst', items: [
                'መንነት ወረቐትካ።',
                'ቁጽሪ ኣገልግሎት ዜጋ (BSN)።',
                'ናይ ጥዕና መድሕንካ።',
              ] },
              { kop: 'ከመይ ትዳሎ', type: 'lijst', items: [
                'ሓደስቲ ሕሙማት ዝቕበል ሓኪም ስድራቤት ኣብ ጥቓኻ ድለ። ኣብ ዓቢ ከተማ እዚ ሓደ ሓደ ግዜ ከቢድ እዩ። ምድዋል ቀጽል ወይ ሰብ ንሓገዝ ሕተት።',
                'ሕሙም እንተዘይኮንካ ውን፣ ዝከኣል ምስ ኮነ ቀልጢፍካ ተመዝገብ።',
                'ናይ ቀደም ሕክምናዊ ሓበሬታ ኣለካ ድዩ? ናብ ቀዳማይ ምብጻሕ ሒዝካዮ ምጻእ።',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                { zeg: 'Neemt u nieuwe patiënten aan?',
                  eigen: 'ሓደስቲ ሕሙማት ትቕበሉ ዲኹም?' },
                'ከመይ ከም ዝሰርሕ ሕተት: ቆጸራ ምግባር፣ ከምኡውን ምሸት ወይ ቀዳመ-ሰንበት እንታይ ከም ትገብር።',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'ናብ ስፔሻሊስት ወይ ሆስፒታል',
            blokken: [
              { kop: 'ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'መጀመርታ ናብ ሓኪም ስድራቤት (huisarts) ኢኻ ትኸይድ፣ ብቐጥታ ናብ ስፔሻሊስት ኣይኮነን። ሓኪም ስድራቤት ስፔሻሊስት ዘድሊ እንተኾይኑ ይግምግም እሞ መሰነይታ (verwijzing) ይህብ። ብዘይ መሰነይታ መድሕንካ ንስፔሻሊስት መብዛሕትኡ ግዜ ኣይከፍልን።\n\nሓኪም ስድራቤት ኩሉ ግዜ ኣይሰድድን። ሓደ ሓደ ግዜ ሓኪም ስድራቤት ንጥርዓንካ ባዕሉ ይሕክሞ። እዚ ማለት ስፔሻሊስት ኣብቲ እዋን ገና ኣየድልን ማለት እዩ።' },
              { kop: 'ሓኪም እንታይ ክሓትት እዩ', type: 'lijst', items: [
                'ጥርዓንካ እንታይ እዩ እሞ ካብ መዓስ ጀሚሩ ኣለካ?',
                'እንታይ ተፈቲኑ ኣሎ?',
                'ስለምንታይ ስፔሻሊስት ዘድሊ ይመስለካ?',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                'ስለምንታይ ከም ትጭነቕ ግለጽ።',
                { zeg: 'Waarom is een specialist nu nog niet nodig?',
                  eigen: 'ስለምንታይ ስፔሻሊስት ሕጂ ገና ዘየድሊ?' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?',
                  eigen: 'እንተዘይሓሸ መዓስ ክምለስ ኣለኒ?' },
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'ንውላደይ ኢለ እኸይድ ኣለኹ',
            blokken: [
              { kop: 'ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'ንጥርዓናትን ሕማማትን ምስ ውላድካ ናብ ሓኪም ስድራቤት (huisarts) ትኸይድ፣ ልክዕ ከም ንገዛእ ርእስኻ። ሓኪም ሕቶታት ይሓትት እሞ ንውላድካ ይምርምር።\n\nንዕብየት፣ ክታበታትን ሓፈሻዊ ቁጽጽራትን ግን ናብ ሓኪም ስድራቤት ኣይኮንካን ትኸይድ፣ ናብ consultatiebureau ወይ ናይ መንእሰያት ጥዕና ኣገልግሎት (GGD) እምበር። ንሱ ንቆልዑ ዝኸውን ፍሉይ ቦታ እዩ።' },
              { kop: 'ሓኪም እንታይ ክሓትት እዩ', type: 'lijst', items: [
                'ውላድካ ካብ መዓስ ጀሚሩ እዩ እቲ ጥርዓን ዘለዎ?',
                'ውላድካ ረስኒ ኣለዎ ድዩ፣ ክንደይ ልዑል?',
                'ውላድካ ብንቡር ይበልዕን ይሰትን ድዩ?',
                'እንታይ ጌርካ ወይ ሂብካ ኣለኻ?',
              ] },
              { kop: 'ከመይ ትዳሎ', type: 'lijst', items: [
                'መዓስ ከም ዝጀመረን ኣብ ውላድካ እንታይ ከም ዘስተብሃልካን ሕሰብ።',
                'ክብደት ውላድካ ትፈልጥ ዲኻ? ሓደ ሓደ ግዜ ጠቓሚ እዩ።',
                'ውላድካ መድሃኒት ይወስድ ድዩ? ሒዝካዮም ምጻእ ወይ ኣስማቶም ጽሓፍ።',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                'ንውላድካ ካብ ኩሉ ንላዕሊ ንስኻ ኢኻ ትፈልጦ። ውላድካ ካብ ንቡር ብሓቂ ፍሉይ እንተኾይኑ በሎ።',
                { zeg: 'Waar moet ik op letten?',
                  eigen: 'ኣብ ምንታይ ከተኩር ኣለኒ?' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?',
                  eigen: 'መዓስ ክምለስ ወይ ክድውል ኣለኒ?' },
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'ውልቃዊ ወይ ከቢድ ነገር ምዝርራብ',
            blokken: [
              { kop: 'ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'ንጭንቀት፣ ሕማቕ ድቃስ፣ ሓዘን፣ ጭንቀታት ወይ ከቢድ ኩነታት ገዛ ውን ናብ ሓኪም ስድራቤት (huisarts) ክትከይድ ትኽእል ኢኻ። ሓኪም ነዚ ብምስጢር ይሕዞ።' },
              { kop: 'ከመይ ትዳሎ', type: 'lijst', items: [
                'እንታይ ክትነግር ከም ትደሊ ኣቐዲምካ ሕሰብ። ክትጽሕፎን ከተንብቦን ትኽእል ኢኻ።',
                'ኩሉ ብሓንሳእ ክትነግር ኣየድልየካን። በቲ ዝበለጸ ኣገዳሲ ጀምር።',
                'ነዚ ህዱእ ግዜ ትደሊ ዲኻ? ቆጸራ ክትገብር ከለኻ ብዛዕባ ሓደ ነገር ክትዛረብ ከም ትደሊ በል። ሓደ ሓደ ግዜ ሽዑ ዝነውሐ ቆጸራ ትረክብ።',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                { zeg: 'Dit is moeilijk voor mij om te vertellen.',
                  eigen: 'እዚ ንምንጋር ንዓይ ከቢድ እዩ።' },
                { zeg: 'Met wie kan ik hierover verder praten?',
                  eigen: 'ብዛዕባ እዚ ምስ መን ክቕጽል እዛረብ?',
                  na: 'ሓኪም ስድራቤት ክሰደካ ይኽእል እዩ።' },
                'ዝኣምኖ ሰብ ሒዝካ ክትመጽእ ትኽእል ኢኻ።',
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
        naam: 'ምምሕዳር ከተማ (gemeente)',
        vasteBlokken: [
          { kop: 'ዝርርብ ንምስዓብ ከቢድ እንተኾይኑ', type: 'lijst', items: [
            { intro: 'ብዘይ ፍርሒ ሕተት:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'ብዝያዳ ቀስ ኢልኩም ወይ ብቐለልቲ ቃላት ክትብልዎ ትኽእሉ ዶ?' },
            'ዝኣምኖ ሰብ ሒዝካ ክትመጽእ ትኽእል ኢኻ።',
            'ነቲ ቋንቋ ገና ጽቡቕ ዘይትዛረብ ዲኻ? ቆጸራ ክትገብር ከለኻ ተርጓሚ ሕተት።',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'ኣብ መቐበሊ ሓደ ነገር ምስራሕ (ፓስፖርት፡ መንነት ወይ ካልእ ሰነድ)',
            blokken: [
              { kop: 'ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'ንፓስፖርት፡ መንነት ካርድ፡ መዘወሪ ፍቓድ ወይ ወግዓዊ ጭብጢ (uittreksel) መብዛሕትኡ ግዜ ኣቐዲምካ ቆጸራ ትገብር፡ ብኢንተርነት ወይ ብተለፎን። ኩሉ ግዜ ብቐጥታ ክትኣቱ ኣይትኽእልን ኢኻ።\n\nሓድሽ ፓስፖርት፡ መንነት ካርድ ወይ መዘወሪ ፍቓድ ብቕጽበት ኣይኮነን ዝዳሎ። ደሓር ትወስዶ፡ መብዛሕትኡ ግዜ ድሕሪ ኣስታት ሓደ ሰሙን።' },
              { kop: 'እንታይ ትማላእ', type: 'lijst', items: [
                'እንተ ተቐቢልካዮ፡ ናይ ቆጸራኻ መረጋገጺ።',
                'መንነትካ። ግዜኡ እኳ እንተሓለፈ ማላእ።',
                'ናይ ባንክ ካርድኻ (pinpas)። ኣብ መቐበሊ ብቕጽበት ትኸፍል፡ መብዛሕትኡ ግዜ ብካርድ ጥራይ።',
                'ንፓስፖርት፡ መንነት ካርድ ወይ መዘወሪ ፍቓድ፡ ካብ ፎቶ ኣንሳኢ ዝተወስደ ሓድሽ ስእሊ። ባዕልኻ ዝሰኣልካዮ ስእሊ መብዛሕትኡ ግዜ ኣይቅበልን እዩ።',
              ] },
              { kop: 'ከመይ ትዳሎ', type: 'lijst', items: [
                'ኣብቲ መረጋገጺ እንታይ ክትማልእ ከምዘለካ ርአ። ኣይትረጋገጽን ዲኻ? ቅድሚ ምኻድካ ንgemeente ደውል።',
                'ኣብ ግዜኡ ብጻሕ። እንተ ደንጒኻ፡ ሓደ ሓደ ግዜ ሓድሽ ቆጸራ ክትገብር ኣለካ።',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                { zeg: 'Wat kost het?', eigen: 'ክንደይ ይኸፍል?' },
                { zeg: 'Wanneer is het klaar?', eigen: 'መዓስ ይዳሎ?' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?', eigen: 'ንምውሳዱ ቆጸራ ክገብር ኣለኒ ድዩ?' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?', eigen: 'ኣይተረድኣንን፡ ቀስ ኢልኩም ከተብርሁለይ ትኽእሉ ዲኹም?' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'ብዛዕባ ኣብ ገዛ ዝርከብ ሓገዝ ወይ ክንክን ዝርርብ (Wmo)',
            blokken: [
              { kop: 'ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'ሓገዝ የድልየካ ዶ፡ ንኣብነት ኣብ ስራሕ ገዛ፡ ኣብ መጓዓዝያ፡ ወይ ኣብ ገዛ ለውጢ? ሽዑ ቅድም ምስ ሓደ ካብ gemeente ዝርርብ ይህልወካ። እዚ መብዛሕትኡ ግዜ keukentafelgesprek (ኣብ ጣውላ ክሽነ ዝግበር ዝርርብ) ይበሃል። ኣብ ገዛኻ ወይ ኣብ ህንጻ ምምሕዳር ክኸውን ይኽእል።\n\nኣብቲ ዝርርብ gemeente ምሳኻ ኮይኑ እንታይ ባዕልኻ ክትገብር ከምትኽእል፡ እቶም ኣብ ከባቢኻ ዘለዉ እንታይ ክገብሩ ከምዝኽእሉ፡ ኣበይ ከኣ ሓገዝ ከምዘድሊ ይርኢ።' },
              { kop: 'gemeente እንታይ ክሓትት እዩ', type: 'lijst', items: [
                'ኣብ ገዛ እንታይ ጽቡቕ ይኸይድ፡ እንታይ ከኣ ኣይሰርሕን?',
                'ሕጂ መን እዩ ዝሕግዘካ ዘሎ? (ስድራ፡ ጎረባብቲ፡ ፈለጥቲ)',
                'ጥዕናኻ ከመይ ኣሎ?',
                'እንታይ ደጊምካ ባዕልኻ ክትገብር ትደሊ?',
              ] },
              { kop: 'ከመይ ትዳሎ', type: 'lijst', items: [
                'እንታይ ከምዘይሰርሕ ኣቐዲምካ ሕሰብ። ካብ መዓልትኻ ኣብነታት ሃብ፡ ከም ደረጃ ምድያብ፡ ዕዳጋ ወይ ስራሕ ገዛ።',
                'እንታይ ክትብል ከምትደሊ ጽሓፍ፡ ወይ ሓደ ሰብ ኣብዚ ክሕግዘካ ሕተት።',
                'ሓደ ሰብ ክትማልእ ትኽእል ኢኻ። ኣብዚ ዝርርብ ብናጻ ናጻ ሓገዝ እውን ኣሎ፡ cliëntondersteuner (ናጻ ደጋፊ ዓሚል)። ቆጸራ ክትገብር ከለኻ ብዛዕባኡ ሕተት።',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.', eigen: 'እዚ ደጊመ በይነይ ክገብሮ ኣይክእልን እየ።' },
                { zeg: 'Wat gebeurt er na dit gesprek?', eigen: 'ድሕሪ እዚ ዝርርብ እንታይ ይኸውን?' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?', eigen: 'እቲ ዝተሰማማዕናሉ ክትጽሕፉለይ ትኽእሉ ዲኹም?' },
              ] },
            ],
          },
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'ብዛዕባ ደገፈይ (bijstand) ዝርርብ',
            blokken: [
              { kop: 'ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'ማሕበራዊ ደገፍ (bijstand) ትቕበል እንተኾንካ፣ ሓደ ሓደ ግዜ ምስ klantmanager (ሓላፊ ጉዳይካ) ዝርርብ ይህልወካ። ብዛዕባ ከመይ ከም ዘለኻ፣ ኣብ ኩነታትካ ገለ ተቐይሩ እንተኾይኑ፣ ከምኡውን ብዛዕባ ስራሕ ወይ ተሳትፎ ዘሎ ስምምዓት እዩ። ንቡር ክፋል ናይቲ ደገፍ እዩ።' },
              { kop: 'ክልተ ኣገደስቲ ነገራት', type: 'lijst', items: [
                'ለውጥታት ኩነታትካ ብእዋኑ ኣፍልጥ: ብሓባር ምንባር፣ ስራሕ፣ ተወሳኺ ገንዘብ፣ ምሳኻ ዝኣቱ ሰብ፣ ወይ ምግዓዝ። ትጠራጠር እንተኾንካ ውን ኣፍልጥ። ብእዋኑ እንተዘይኣፍሊጥካ፣ ምምሕዳር ከተማ ገንዘብ ክሓትት ይኽእል እዩ።',
                'ምስ ስምምዓት ተሓባበር፣ ከም ናብ ዝርርብ ምምጻእ ወይ ስራሕ ንምርካብ ስጉምትታት ምውሳድ።',
              ] },
              { kop: 'klantmanager እንታይ ክሓትት እዩ', type: 'lijst', items: [
                'ኣብዚ እዋን ከመይ ኣለኻ?',
                'ኣብ ኩነታትካ ገለ ተቐይሩ ድዩ? (መንበሪ፣ ስድራቤት፣ ገንዘብ፣ ጥዕና)',
                'ትሰርሕ ዲኻ፣ ወይ ስራሕ ንምርካብ ገለ ትገብር ዲኻ?',
                'ብገንዘብ ምንባር ይከኣለካ ድዩ?',
              ] },
              { kop: 'ከመይ ትዳሎ', type: 'lijst', items: [
                'ካብ ዝሓለፈ ግዜ ንደሓር ገለ ተቐይሩ እንተኾይኑ ሕሰብ። ትጠራጠር ዲኻ? ሽሕ እኳ ንገሮ።',
                'ሒዝካ ምጻእ: መንነት ወረቐትካን ናይ ባንክ ካርድኻን። ሓደ ሓደ ግዜ ምምሕዳር ከተማ ናይ ባንክ ወረቓቕቲ ይሓትት፣ ኣብ ደብዳበ ዕድመኻ ርአ።',
                'ብዛዕባ እዚ ዝርርብ ደብዳበ ተቐቢልካ ዲኻ? ሒዝካያ ምጻእ።',
                'ጸገማት ኣለካ ድዩ፣ ከም ዕዳ? ክትጠቕሶም ትኽእል ኢኻ። ምምሕዳር ከተማ ሓደ ሓደ ግዜ ክሕግዝ ይኽእል እዩ።',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?',
                  eigen: 'ኣይተረድኣንን፣ ብህድኣት ክትገልጹለይ ትኽእሉ ዶ?' },
                { zeg: 'Wat betekent dit voor mijn uitkering?',
                  eigen: 'እዚ ንደገፈይ እንታይ ማለት እዩ?' },
                { zeg: 'Wat moet ik nu doen?',
                  eigen: 'ሕጂ እንታይ ክገብር ኣለኒ?' },
                'ምምሕዳር ከተማ ነቲ ስምምዕ ኣብ ወረቐት ንኸስፍሮ ሕተት፣ ከምኡ ኣብ ገዛ ደጊምካ ከተንብቦ ትኽእል።',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'ቤት ትምህርቲ ውላደይ',
        vasteBlokken: [
          { kop: 'ዝርርብ ንምስዓብ ከቢድ እንተኾይኑ', type: 'lijst', items: [
            { intro: 'ብዘይ ፍርሒ ሕተት:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'ብዝያዳ ቀስ ኢልኩም ወይ ብቐለልቲ ቃላት ክትብልዎ ትኽእሉ ዶ?' },
            'ዝኣምኖ ሰብ ሒዝካ ክትመጽእ ትኽእል ኢኻ።',
            'ነቲ ቋንቋ ገና ጽቡቕ ዘይትዛረብ ዲኻ? ተርጓሚ ክህሉ ይኽእል እንተኾይኑ ኣቐዲምካ ንቤት ትምህርቲ ሕተት፣ ወይ ክትርጉም ዝኽእል ሰብ ሒዝካ ምጻእ።',
          ] },
          { kop: '10 ደቓይቕ ኣዝዩ ሓጺር ድዩ?', type: 'tekst',
            tekst: 'ካብ 10 ደቓይቕ ንላዕሊ ዝወስድ ክትዘራረበሉ ዝድለ ኣለካ ድዩ? ንመምህር ፍሉይ ቆጸራ ሕተት። እዚ ኩሉ ግዜ ይከኣል እዩ፣ ኣብ ካልእ እዋን ናይቲ ዓመት ውን።' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: 'ናይ 10 ደቓይቕ ዝርርብ (10-minutengesprek) ምስ መምህር',
            blokken: [
              { kop: 'ከመይ ይሰርሕ', type: 'tekst',
                tekst: 'ኣብ ዓመት ቁሩብ ግዜ ቤት ትምህርቲ ንኹሎም ወለዲ ምስ መምህር ንሓጺር ዝርርብ ይዕድም። ኣስታት 10 ደቓይቕ ይወስድ። ብሓባር ውላድካ ኣብ ቤት ትምህርቲ ከመይ ከም ዘሎ ትዘራረቡ።\n\nእዚ ዝርርብ ንኹሎም ወለዲ እዩ፣ ውላድካ ጽቡቕ እንተሎ ውን። እቲ ግዜ ሓጺር ስለ ዝኾነ፣ ተዳሊኻ ምምጻእ ይሕግዝ።' },
              { kop: 'መምህር እንታይ ክነግር ወይ ክሓትት እዩ', type: 'lijst', items: [
                'ምንባብ፣ ሕሳብን ካልኦት ዓይነታት ትምህርትን ከመይ ከም ዝኸዱ።',
                'ውላድካ ኣብ ክፍሊ ከመይ ከም ዝሳተፍን ምስ ካልኦት ቆልዑ ከመይ ከም ዝኸይድን።',
                'ሓደ ሓደ ግዜ መምህር ስራሕ ወይ ውጽኢት ፈተና ውላድካ የርኢ።',
                'ውላድካ ብሓጎስ ናብ ቤት ትምህርቲ ይኸይድ ድዩ? ኣብ ገዛ ከመይ ኣሎ?',
              ] },
              { kop: 'ከመይ ትዳሎ', type: 'lijst', items: [
                'ንውላድካ ኣቐዲምካ ሕተቶ: ቤት ትምህርቲ ከመይ ኣሎ? እንታይ ደስ ይብለካ? እንታይ ከቢድ ኮይኑ ይስምዓካ?',
                'እቲ ግዜ ሓጺር እዩ። ብርግጽ ክትሓቶ ትደሊ ሓደ ወይ ክልተ ነገር ሕሰብ እሞ ጽሓፎ።',
                'ደብዳበ ወይ ጸብጻብ ተቐቢልካ ዲኻ? ሒዝካዮ ምጻእ።',
                'ብገለ ትጭነቕ ዲኻ? በኡ ጀምር፣ ከምኡ እኹል ግዜ ይህልዎ።',
              ] },
              { kop: 'እንታይ ክትብል ወይ ክትሓትት ትኽእል', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?',
                  eigen: 'ምንባብን ሕሳብን ከመይ ይኸዱ ኣለዉ?' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?',
                  eigen: 'ውላደይ ምስ ካልኦት ቆልዑ ጽቡቕ ይኸይድ ድዩ?' },
                { zeg: 'Wat kan ik thuis doen om te helpen?',
                  eigen: 'ንምሕጋዝ ኣብ ገዛ እንታይ ክገብር እኽእል?' },
                'ንውላድካ ካብ ኩሉ ንላዕሊ ንስኻ ኢኻ ትፈልጦ። ኣብ ገዛ ካብቲ መምህር ኣብ ቤት ትምህርቲ ዝርእዮ ዝተፈልየ ነገር እንተሪኢኻ ንገር።',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?',
                  eigen: 'ኣይተረድኣንን፣ ብኻልእ መንገዲ ክትብልዎ ትኽእሉ ዶ?' },
              ] },
            ],
          },
        ],
      },

    ],
  },

  UK: {

    ui: {
      paginaTitel: 'Добре підготовлений',
      welkom: 'Маєш зустріч або прийом? Я допоможу тобі підготуватися. Так ти знатимеш, чого очікувати і що можна сказати.',
      kiesCategorie: 'Куди ти йдеш?',
      kiesSituatie: 'З якого приводу?',
      verder: 'Далі →',
      klaar: 'Це все. Хочеш дізнатися ще щось?',
      opnieuw: '↺ Інша зустріч',
      aiUitnodiging: 'Маєш власне запитання про свою зустріч? Напиши або наговори нижче.',
      aiPlaceholder: 'Постав своє запитання...',
      aiSpreekTitel: 'Наговорити',
      aiFout: 'Щось пішло не так. Спробуй ще раз.',
      aiDisclaimer: '🤖 Це допомога в підготовці до зустрічі. Не медична і не юридична порада. Не діліться номером BSN чи іншими особистими даними.',
      voorlezen: 'Прочитати вголос',
      zegSluit: 'Торкнись, щоб закрити',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'Лікар',
        vasteBlokken: [
          { kop: 'Якщо розмову важко зрозуміти', type: 'lijst', items: [
            { intro: 'Сміливо запитай:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Чи можете ви сказати це повільніше або простішими словами?' },
            'Можна взяти з собою людину, якій довіряєш.',
            'Ще не добре володієш мовою? Попроси перекладача, коли записуєшся на прийом, найкраще під час дзвінка. Краще не брати дитину як перекладача на складні розмови.',
          ] },
          { kop: 'Це нічого не коштує', type: 'tekst',
            tekst: 'Візит до сімейного лікаря (huisarts) безкоштовний. Він не вираховується з твоєї франшизи (eigen risico).' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'У мене скарга або біль',
            blokken: [
              { kop: 'Як працює лікар', type: 'tekst',
                tekst: 'Сімейний лікар (huisarts) не завжди одразу дає ліки. Спочатку лікар ставить запитання, щоб добре зрозуміти твою скаргу. Іноді порада — почекати тиждень і повернутися, якщо не стане краще. Багато скарг минають самі собою.' },
              { kop: 'Що запитає лікар', type: 'lijst', items: [
                'Відколи в тебе ця скарга?',
                'Де саме болить?',
                'Що ти вже пробував?',
                'Чи є в тебе інші скарги?',
                'Як справи загалом: робота, дім, сон?',
              ] },
              { kop: 'Як підготуватися', type: 'lijst', items: [
                'Пригадай, коли почалася скарга і що саме ти відчуваєш.',
                'Запиши свою скаргу, або попроси когось допомогти з цим.',
                'Маєш більше однієї скарги? Скажи це на початку, щоб лікар міг розподілити час.',
                'Приймаєш ліки? Візьми їх із собою або запиши назви.',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?',
                  eigen: 'Я не розумію, чи можете пояснити ще раз?' },
                { zeg: 'Wat kan ik zelf doen?',
                  eigen: 'Що я можу зробити сам?' },
                { zeg: 'Wanneer moet ik terugkomen?',
                  eigen: 'Коли мені прийти знову?' },
                'Попроси лікаря записати, якщо не можеш запам\'ятати.',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'Уперше до нового сімейного лікаря',
            blokken: [
              { kop: 'Як це працює', type: 'tekst',
                tekst: 'Спочатку ти маєш бути зареєстрований у практиці сімейного лікаря. Ти обираєш одного сімейного лікаря (huisarts) поблизу і реєструєшся там. Він стає твоїм постійним лікарем.' },
              { kop: 'Що потрібно для реєстрації', type: 'lijst', items: [
                'Твій документ, що посвідчує особу.',
                'Твій громадянський сервісний номер (BSN).',
                'Твоя медична страховка.',
              ] },
              { kop: 'Як підготуватися', type: 'lijst', items: [
                'Знайди сімейного лікаря поблизу, який приймає нових пацієнтів. У великому місті це буває непросто. Продовжуй телефонувати або попроси когось про допомогу.',
                'Зареєструйся, щойно це можливо, навіть якщо ти не хворієш.',
                'Маєш медичну інформацію з минулого? Візьми її з собою на перший візит.',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                { zeg: 'Neemt u nieuwe patiënten aan?',
                  eigen: 'Чи приймаєте ви нових пацієнтів?' },
                'Запитай, як це працює: як записатися на прийом і що робити ввечері чи у вихідні.',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'До спеціаліста або в лікарню',
            blokken: [
              { kop: 'Як це працює', type: 'tekst',
                tekst: 'Спочатку ти йдеш до сімейного лікаря (huisarts), а не одразу до спеціаліста. Сімейний лікар оцінює, чи потрібен спеціаліст, і тоді дає направлення. Без направлення страховка зазвичай не оплачує спеціаліста.\n\nСімейний лікар не завжди направляє. Іноді він лікує твою скаргу сам. Це означає, що спеціаліст на цей момент ще не потрібен.' },
              { kop: 'Що запитає лікар', type: 'lijst', items: [
                'Яка твоя скарга і відколи вона в тебе?',
                'Що вже пробували?',
                'Чому ти вважаєш, що потрібен спеціаліст?',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                'Поясни, чому ти хвилюєшся.',
                { zeg: 'Waarom is een specialist nu nog niet nodig?',
                  eigen: 'Чому спеціаліст зараз ще не потрібен?' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?',
                  eigen: 'Коли мені повернутися, якщо не стане краще?' },
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'Я йду з дитиною',
            blokken: [
              { kop: 'Як це працює', type: 'tekst',
                tekst: 'Зі скаргами та хворобами ти йдеш із дитиною до сімейного лікаря (huisarts), так само як для себе. Лікар ставить запитання і оглядає дитину.\n\nЩодо росту, щеплень і загальних оглядів ти йдеш не до сімейного лікаря, а до consultatiebureau (дитяча консультація) або служби здоров\'я молоді (GGD). Це окреме місце для дітей.' },
              { kop: 'Що запитає лікар', type: 'lijst', items: [
                'Відколи в дитини ця скарга?',
                'Чи є в дитини температура, і яка?',
                'Чи їсть і п\'є дитина нормально?',
                'Що ти вже робив або давав?',
              ] },
              { kop: 'Як підготуватися', type: 'lijst', items: [
                'Пригадай, коли це почалося і що тебе непокоїть у дитині.',
                'Знаєш вагу дитини? Це іноді корисно.',
                'Дитина приймає ліки? Візьми їх або запиши назви.',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                'Ти знаєш свою дитину найкраще. Скажи, якщо дитина справді поводиться інакше, ніж зазвичай.',
                { zeg: 'Waar moet ik op letten?',
                  eigen: 'На що мені звертати увагу?' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?',
                  eigen: 'Коли мені прийти знову або зателефонувати?' },
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'Обговорити щось особисте або складне',
            blokken: [
              { kop: 'Як це працює', type: 'tekst',
                tekst: 'До сімейного лікаря (huisarts) можна звернутися також зі стресом, поганим сном, смутком, тривогами чи складною ситуацією вдома. Лікар ставиться до цього конфіденційно.' },
              { kop: 'Як підготуватися', type: 'lijst', items: [
                'Заздалегідь подумай, що хочеш розповісти. Можна записати і зачитати.',
                'Не обов\'язково розповідати все одразу. Почни з найважливішого.',
                'Хочеш мати на це достатньо часу? Коли записуєшся на прийом, скажи, що хочеш про щось поговорити. Іноді тоді дають довший прийом.',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                { zeg: 'Dit is moeilijk voor mij om te vertellen.',
                  eigen: 'Мені важко про це говорити.' },
                { zeg: 'Met wie kan ik hierover verder praten?',
                  eigen: 'З ким я можу поговорити про це далі?',
                  na: 'Сімейний лікар може дати направлення.' },
                'Можна взяти з собою людину, якій довіряєш.',
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
        naam: 'Муніципалітет (gemeente)',
        vasteBlokken: [
          { kop: 'Якщо розмову важко зрозуміти', type: 'lijst', items: [
            { intro: 'Сміливо запитай:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Чи можете ви сказати це повільніше або простішими словами?' },
            'Можна взяти з собою людину, якій довіряєш.',
            'Ще не добре володієш мовою? Попроси перекладача, коли записуєшся на зустріч.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'Оформити щось на стійці (паспорт, ID або інший документ)',
            blokken: [
              { kop: 'Як це працює', type: 'tekst',
                tekst: 'Для паспорта, ID-картки, водійського посвідчення чи офіційної виписки (uittreksel) зазвичай спочатку записуються, онлайн або телефоном. Не завжди можна просто зайти.\n\nНовий паспорт, ID-картка чи водійське посвідчення не готові одразу. Ти забираєш їх пізніше, часто приблизно через тиждень.' },
              { kop: 'Що взяти із собою', type: 'lijst', items: [
                'Підтвердження запису, якщо ти його отримав.',
                'Твій документ, що посвідчує особу. Візьми його, навіть якщо строк дії минув.',
                'Твою банківську картку (pinpas). На стійці ти платиш одразу, часто лише карткою.',
                'Для паспорта, ID-картки чи водійського посвідчення: свіже фото від фотографа. Фото, зроблене самостійно, зазвичай не приймають.',
              ] },
              { kop: 'Як підготуватися', type: 'lijst', items: [
                'Подивись у підтвердженні, що потрібно взяти. Не впевнений? Зателефонуй до gemeente, перш ніж іти.',
                'Прийди вчасно. Якщо запізнишся, іноді доведеться записуватися заново.',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                { zeg: 'Wat kost het?', eigen: 'Скільки це коштує?' },
                { zeg: 'Wanneer is het klaar?', eigen: 'Коли буде готово?' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?', eigen: 'Чи потрібно записуватися, щоб забрати це?' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?', eigen: 'Я не розумію, чи можете пояснити спокійніше?' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'Розмова про допомогу або догляд удома (Wmo)',
            blokken: [
              { kop: 'Як це працює', type: 'tekst',
                tekst: 'Тобі потрібна допомога, наприклад із хатньою роботою, з транспортом чи з облаштуванням житла? Тоді спочатку ти маєш розмову з кимось із gemeente. Це часто називають keukentafelgesprek (розмова за кухонним столом). Вона може бути в тебе вдома або в будівлі муніципалітету.\n\nУ розмові gemeente разом із тобою дивиться, що ти можеш робити сам, що можуть зробити люди навколо тебе, і де потрібна допомога.' },
              { kop: 'Що запитає gemeente', type: 'lijst', items: [
                'Що вдома вдається добре, а що вже не виходить?',
                'Хто вже тобі допомагає? (родина, сусіди, знайомі)',
                'Як твоє здоров’я?',
                'Що ти хотів би знову вміти робити сам?',
              ] },
              { kop: 'Як підготуватися', type: 'lijst', items: [
                'Подумай заздалегідь, що вже не виходить. Наведи приклади зі свого дня, як-от сходи, покупки чи хатня робота.',
                'Запиши, що хочеш розповісти, або попроси когось тобі в цьому допомогти.',
                'Ти можеш взяти когось із собою. На цій розмові також є безкоштовна незалежна допомога: cliëntondersteuner (незалежний помічник клієнта). Запитай про нього, коли записуєшся.',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.', eigen: 'Я вже не справляюся з цим сам.' },
                { zeg: 'Wat gebeurt er na dit gesprek?', eigen: 'Що буде після цієї розмови?' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?', eigen: 'Чи можете записати те, про що ми домовилися?' },
              ] },
            ],
          },
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'Розмова про мою соціальну допомогу (bijstand)',
            blokken: [
              { kop: 'Як це працює', type: 'tekst',
                tekst: 'Якщо ти отримуєш соціальну допомогу (bijstand), іноді в тебе буває зустріч із твоїм klantmanager (менеджером у справі). Йдеться про те, як у тебе справи, чи щось змінилося у твоїй ситуації, і які є домовленості щодо роботи чи участі. Це звичайна частина отримання допомоги.' },
              { kop: 'Дві важливі речі', type: 'lijst', items: [
                'Вчасно повідомляй про зміни у своїй ситуації: спільне проживання, робота, додаткові гроші, хтось переїхав до тебе, або переїзд. Повідомляй навіть якщо сумніваєшся. Якщо не повідомиш вчасно, gemeente може вимагати гроші назад.',
                'Дотримуйся домовленостей, наприклад приходити на зустріч або робити кроки для пошуку роботи.',
              ] },
              { kop: 'Що запитає klantmanager', type: 'lijst', items: [
                'Як у тебе справи зараз?',
                'Чи щось змінилося у твоїй ситуації? (житло, сім\'я, гроші, здоров\'я)',
                'Ти працюєш, чи робиш щось, щоб знайти роботу?',
                'Чи вдається зводити кінці з кінцями?',
              ] },
              { kop: 'Як підготуватися', type: 'lijst', items: [
                'Подумай, чи щось змінилося з минулого разу. Сумніваєшся? Все одно розкажи.',
                'Візьми з собою: документ, що посвідчує особу, і банківську картку. Іноді gemeente просить банківські виписки — подивись у листі-запрошенні.',
                'Отримав листа про цю зустріч? Візьми його з собою.',
                'Маєш проблеми, наприклад борги? Можеш про них сказати. Gemeente іноді може допомогти.',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?',
                  eigen: 'Я не розумію, чи можете пояснити спокійніше?' },
                { zeg: 'Wat betekent dit voor mijn uitkering?',
                  eigen: 'Що це означає для моєї допомоги?' },
                { zeg: 'Wat moet ik nu doen?',
                  eigen: 'Що мені тепер робити?' },
                'Попроси gemeente записати домовленість на папері, щоб ти міг перечитати вдома.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'Школа моєї дитини',
        vasteBlokken: [
          { kop: 'Якщо розмову важко зрозуміти', type: 'lijst', items: [
            { intro: 'Сміливо запитай:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Чи можете ви сказати це повільніше або простішими словами?' },
            'Можна взяти з собою людину, якій довіряєш.',
            'Ще не добре володієш мовою? Заздалегідь запитай у школи, чи може бути перекладач, або візьми з собою когось, хто може перекладати.',
          ] },
          { kop: '10 хвилин замало?', type: 'tekst',
            tekst: 'Маєш обговорити більше, ніж вміщається в 10 хвилин? Попроси вчителя про окрему зустріч. Це завжди можливо, також в інший час року.' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: '10-хвилинна розмова (10-minutengesprek) з учителем',
            blokken: [
              { kop: 'Як це працює', type: 'tekst',
                tekst: 'Кілька разів на рік школа запрошує всіх батьків на коротку розмову з учителем. Вона триває близько 10 хвилин. Разом ви обговорюєте, як справи в дитини у школі.\n\nЦя розмова для всіх батьків, також коли в дитини все добре. Оскільки часу мало, корисно прийти підготовленим.' },
              { kop: 'Що вчитель розповість або запитає', type: 'lijst', items: [
                'Як справи з читанням, математикою та іншими предметами.',
                'Як дитина бере участь у класі та ладнає з іншими дітьми.',
                'Іноді вчитель показує роботи або результати тестів дитини.',
                'Чи ходить дитина до школи із задоволенням? Як справи вдома?',
              ] },
              { kop: 'Як підготуватися', type: 'lijst', items: [
                'Заздалегідь запитай дитину: як справи у школі? Що тобі подобається? Що для тебе складне?',
                'Часу мало. Придумай одну-дві речі, про які точно хочеш запитати, і запиши їх.',
                'Отримав листа або табель? Візьми з собою.',
                'Щось тебе непокоїть? Почни з цього — тоді на це вистачить часу.',
              ] },
              { kop: 'Що ти можеш сказати або запитати', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?',
                  eigen: 'Як справи з читанням і математикою?' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?',
                  eigen: 'Чи добре моя дитина ладнає з іншими дітьми?' },
                { zeg: 'Wat kan ik thuis doen om te helpen?',
                  eigen: 'Що я можу робити вдома, щоб допомогти?' },
                'Ти знаєш свою дитину найкраще. Скажи, якщо вдома бачиш щось інше, ніж учитель у школі.',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?',
                  eigen: 'Я не розумію, чи можете сказати це інакше?' },
              ] },
            ],
          },
        ],
      },

    ],
  },

  FA: {

    ui: {
      paginaTitel: 'خوب آماده',
      welkom: 'قرار ملاقات داری؟ من کمکت می‌کنم آماده شوی. این‌طور می‌دانی چه انتظاری داشته باشی و چه می‌توانی بگویی.',
      kiesCategorie: 'کجا می‌روی؟',
      kiesSituatie: 'برای چه می‌روی؟',
      verder: 'ادامه ←',
      klaar: 'همین بود. چیز دیگری می‌خواهی بدانی؟',
      opnieuw: '↺ قرار دیگر',
      aiUitnodiging: 'سؤالی درباره قرار خودت داری؟ در پایین بنویس یا صحبت کن.',
      aiPlaceholder: 'سؤالت را بپرس...',
      aiSpreekTitel: 'صحبت کن',
      aiFout: 'مشکلی پیش آمد. دوباره امتحان کن.',
      aiDisclaimer: '🤖 این کمکی است برای آماده شدن برای قرار ملاقاتت. مشوره طبی یا حقوقی نیست. نمبر BSN یا معلومات شخصی دیگر را به اشتراک نگذار.',
      voorlezen: 'با صدای بلند بخوان',
      zegSluit: 'برای بستن لمس کن',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'داکتر',
        vasteBlokken: [
          { kop: 'اگر دنبال کردن صحبت سخت است', type: 'lijst', items: [
            { intro: 'بدون تردید بپرس:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'می‌توانید آهسته‌تر یا با کلمات ساده‌تر بگویید؟' },
            'می‌توانی کسی را که به او اعتماد داری با خود ببری.',
            'هنوز زبان را خوب صحبت نمی‌کنی؟ وقتی قرار می‌گیری، ترجمان بخواه، بهتر است هنگام تلفن کردن. بهتر است برای صحبت‌های سخت، طفل را برای ترجمانی نبری.',
          ] },
          { kop: 'هیچ پولی نمی‌خواهد', type: 'tekst',
            tekst: 'رفتن نزد داکتر خانوادگی (huisarts) رایگان است. از سهم شخصی بیمه‌ات (eigen risico) هم کم نمی‌شود.' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'شکایت صحی یا درد دارم',
            blokken: [
              { kop: 'داکتر چطور کار می‌کند', type: 'tekst',
                tekst: 'داکتر خانوادگی (huisarts) همیشه فوراً دوا نمی‌دهد. داکتر اول سؤال می‌پرسد تا مشکلت را خوب بفهمد. گاهی مشوره این است که یک هفته صبر کنی و اگر بهتر نشد برگردی. بسیاری از شکایت‌ها خودشان خوب می‌شوند.' },
              { kop: 'داکتر چه خواهد پرسید', type: 'lijst', items: [
                'از چه وقت این شکایت را داری؟',
                'درد دقیقاً کجاست؟',
                'تا حالا چه امتحان کرده‌ای؟',
                'شکایت دیگری هم داری؟',
                'در کل حالت چطور است: کار، خانه، خواب؟',
              ] },
              { kop: 'چطور آماده شوی', type: 'lijst', items: [
                'فکر کن شکایت از کی شروع شد و دقیقاً چه احساس می‌کنی.',
                'شکایتت را بنویس، یا از کسی بخواه در این کار کمکت کند.',
                'بیشتر از یک شکایت داری؟ در شروع بگو، تا داکتر بتواند وقت را تقسیم کند.',
                'دوا مصرف می‌کنی؟ با خود ببر یا نام‌هایشان را بنویس.',
              ] },
              { kop: 'چه می‌توانی بگویی یا بپرسی', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?',
                  eigen: 'نفهمیدم، می‌توانید یک بار دیگر توضیح بدهید؟' },
                { zeg: 'Wat kan ik zelf doen?',
                  eigen: 'خودم چه می‌توانم بکنم؟' },
                { zeg: 'Wanneer moet ik terugkomen?',
                  eigen: 'کی باید برگردم؟' },
                'اگر نمی‌توانی به یاد بسپاری، از داکتر بخواه بنویسد.',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'اولین بار نزد داکتر خانوادگی جدید',
            blokken: [
              { kop: 'چطور کار می‌کند', type: 'tekst',
                tekst: 'اول باید در یک کلینیک داکتر خانوادگی ثبت‌نام شده باشی. یک داکتر خانوادگی (huisarts) در نزدیکی‌ات انتخاب می‌کنی و آنجا ثبت‌نام می‌کنی. او داکتر ثابت تو می‌شود.' },
              { kop: 'برای ثبت‌نام چه لازم داری', type: 'lijst', items: [
                'سند هویتت.',
                'نمبر خدمات شهروندی‌ات (BSN).',
                'بیمه صحی‌ات.',
              ] },
              { kop: 'چطور آماده شوی', type: 'lijst', items: [
                'یک داکتر خانوادگی در نزدیکی پیدا کن که مریض جدید قبول می‌کند. در شهرهای بزرگ این گاهی سخت است. به تلفن کردن ادامه بده یا از کسی کمک بخواه.',
                'هر چه زودتر ثبت‌نام کن، حتی اگر مریض نیستی.',
                'معلومات طبی از قبل داری؟ به اولین ملاقات با خود ببر.',
              ] },
              { kop: 'چه می‌توانی بگویی یا بپرسی', type: 'lijst', items: [
                { zeg: 'Neemt u nieuwe patiënten aan?',
                  eigen: 'آیا مریض جدید قبول می‌کنید؟' },
                'بپرس چطور کار می‌کند: گرفتن قرار، و شب یا آخر هفته چه باید بکنی.',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'نزد داکتر متخصص یا شفاخانه',
            blokken: [
              { kop: 'چطور کار می‌کند', type: 'tekst',
                tekst: 'اول نزد داکتر خانوادگی (huisarts) می‌روی، نه مستقیم نزد متخصص. داکتر خانوادگی بررسی می‌کند که آیا متخصص لازم است و در آن صورت معرفی‌نامه می‌دهد. بدون معرفی‌نامه، بیمه معمولاً پول متخصص را نمی‌پردازد.\n\nداکتر خانوادگی همیشه معرفی نمی‌کند. گاهی خودش مشکلت را تداوی می‌کند. این یعنی در آن لحظه متخصص هنوز لازم نیست.' },
              { kop: 'داکتر چه خواهد پرسید', type: 'lijst', items: [
                'شکایتت چیست و از چه وقت آن را داری؟',
                'تا حالا چه امتحان شده است؟',
                'چرا فکر می‌کنی متخصص لازم است؟',
              ] },
              { kop: 'چه می‌توانی بگویی یا بپرسی', type: 'lijst', items: [
                'توضیح بده چرا نگران هستی.',
                { zeg: 'Waarom is een specialist nu nog niet nodig?',
                  eigen: 'چرا متخصص حالا هنوز لازم نیست؟' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?',
                  eigen: 'اگر بهتر نشد، کی باید برگردم؟' },
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'برای طفلم می‌روم',
            blokken: [
              { kop: 'چطور کار می‌کند', type: 'tekst',
                tekst: 'برای شکایت‌ها و مریضی‌ها با طفلت نزد داکتر خانوادگی (huisarts) می‌روی، درست مثل خودت. داکتر سؤال می‌پرسد و طفلت را معاینه می‌کند.\n\nبرای رشد، واکسین‌ها و معاینات عمومی نزد داکتر خانوادگی نمی‌روی، بلکه به مرکز صحت طفل (consultatiebureau) یا خدمات صحی جوانان (GGD) می‌روی. آنجا جای جداگانه‌ای برای اطفال است.' },
              { kop: 'داکتر چه خواهد پرسید', type: 'lijst', items: [
                'طفلت از چه وقت این شکایت را دارد؟',
                'طفلت تب دارد، و چقدر بلند؟',
                'طفلت به‌طور عادی می‌خورد و می‌نوشد؟',
                'تا حالا چه کرده‌ای یا چه داده‌ای؟',
              ] },
              { kop: 'چطور آماده شوی', type: 'lijst', items: [
                'فکر کن کی شروع شد و در طفلت چه چیزی به نظرت می‌رسد.',
                'وزن طفلت را می‌دانی؟ گاهی مفید است.',
                'طفلت دوا مصرف می‌کند؟ با خود ببر یا نام‌هایشان را بنویس.',
              ] },
              { kop: 'چه می‌توانی بگویی یا بپرسی', type: 'lijst', items: [
                'تو طفلت را از همه بهتر می‌شناسی. اگر طفلت واقعاً فرق کرده، بگو.',
                { zeg: 'Waar moet ik op letten?',
                  eigen: 'به چه باید توجه کنم؟' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?',
                  eigen: 'کی باید برگردم یا تلفن کنم؟' },
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'صحبت درباره موضوع شخصی یا سخت',
            blokken: [
              { kop: 'چطور کار می‌کند', type: 'tekst',
                tekst: 'برای فشار روحی، خواب بد، غم، نگرانی‌ها یا وضعیت سخت در خانه هم می‌توانی نزد داکتر خانوادگی (huisarts) بروی. داکتر با این موضوعات محرمانه برخورد می‌کند.' },
              { kop: 'چطور آماده شوی', type: 'lijst', items: [
                'از قبل فکر کن چه می‌خواهی بگویی. می‌توانی بنویسی و بخوانی.',
                'لازم نیست همه چیز را یکباره بگویی. با مهم‌ترین شروع کن.',
                'می‌خواهی برای این وقت کافی باشد؟ هنگام گرفتن قرار بگو که می‌خواهی درباره موضوعی صحبت کنی. گاهی آن وقت قرار طولانی‌تر می‌گیری.',
              ] },
              { kop: 'چه می‌توانی بگویی یا بپرسی', type: 'lijst', items: [
                { zeg: 'Dit is moeilijk voor mij om te vertellen.',
                  eigen: 'گفتن این برای من سخت است.' },
                { zeg: 'Met wie kan ik hierover verder praten?',
                  eigen: 'با چه کسی می‌توانم در این باره بیشتر صحبت کنم؟',
                  na: 'داکتر خانوادگی می‌تواند تو را معرفی کند.' },
                'می‌توانی کسی را که به او اعتماد داری با خود ببری.',
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
        naam: 'شاروالی (gemeente)',
        vasteBlokken: [
          { kop: 'اگر دنبال کردن صحبت سخت است', type: 'lijst', items: [
            { intro: 'بدون تردید بپرس:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'می‌توانید آهسته‌تر یا با کلمات ساده‌تر بگویید؟' },
            'می‌توانی کسی را که به او اعتماد داری با خود ببری.',
            'هنوز زبان را خوب صحبت نمی‌کنی؟ وقتی قرار می‌گیری، ترجمان بخواه.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'انجام کاری در باجه (پاسپورت، کارت شناسایی یا سند دیگر)',
            blokken: [
              { kop: 'چطور کار می‌کند', type: 'tekst',
                tekst: 'برای پاسپورت، کارت شناسایی، گواهینامه رانندگی یا برگه رسمی (uittreksel) معمولاً اول وقت می‌گیرید، آنلاین یا تلفنی. همیشه نمی‌توانید همین‌طور وارد شوید.\n\nپاسپورت، کارت شناسایی یا گواهینامه رانندگی جدید فوراً آماده نیست. آن را بعداً می‌گیرید، اغلب پس از حدود یک هفته.' },
              { kop: 'چه چیزی همراه ببرید', type: 'lijst', items: [
                'تأیید وقت‌تان، اگر آن را گرفته‌اید.',
                'مدرک هویت‌تان. حتی اگر تاریخش گذشته باشد، آن را همراه ببرید.',
                'کارت بانکی‌تان (pinpas). در باجه فوراً پرداخت می‌کنید، اغلب فقط با کارت.',
                'برای پاسپورت، کارت شناسایی یا گواهینامه رانندگی: یک عکس تازه از عکاس. عکسی که خودتان بگیرید معمولاً پذیرفته نمی‌شود.',
              ] },
              { kop: 'چطور آماده شوید', type: 'lijst', items: [
                'در تأیید ببینید چه چیزی باید همراه ببرید. مطمئن نیستید؟ پیش از رفتن به gemeente تلفن بزنید.',
                'به‌موقع بیایید. اگر دیر برسید، گاهی باید وقت تازه‌ای بگیرید.',
              ] },
              { kop: 'چه می‌توانید بگویید یا بپرسید', type: 'lijst', items: [
                { zeg: 'Wat kost het?', eigen: 'چقدر هزینه دارد؟' },
                { zeg: 'Wanneer is het klaar?', eigen: 'کِی آماده می‌شود؟' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?', eigen: 'آیا برای گرفتن آن باید وقت بگیرم؟' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?', eigen: 'متوجه نمی‌شوم، می‌شود آرام‌تر توضیح دهید؟' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'گفت‌وگو درباره کمک یا مراقبت در خانه (Wmo)',
            blokken: [
              { kop: 'چطور کار می‌کند', type: 'tekst',
                tekst: 'به کمک نیاز دارید، مثلاً در کارهای خانه، در رفت‌وآمد، یا برای تغییری در خانه؟ آنگاه اول با کسی از gemeente گفت‌وگو می‌کنید. این را اغلب keukentafelgesprek (گفت‌وگوی پشت میز آشپزخانه) می‌نامند. می‌تواند در خانه شما یا در ساختمان شهرداری باشد.\n\nدر این گفت‌وگو gemeente همراه شما نگاه می‌کند چه کاری را خودتان می‌توانید انجام دهید، اطرافیان‌تان چه می‌توانند بکنند، و کجا به کمک نیاز است.' },
              { kop: 'gemeente چه خواهد پرسید', type: 'lijst', items: [
                'در خانه چه چیزی خوب پیش می‌رود و چه چیزی دیگر نمی‌شود؟',
                'چه کسانی همین حالا به شما کمک می‌کنند؟ (خانواده، همسایه‌ها، آشناها)',
                'حال سلامتی‌تان چطور است؟',
                'دوست دارید چه کاری را دوباره خودتان بتوانید انجام دهید؟',
              ] },
              { kop: 'چطور آماده شوید', type: 'lijst', items: [
                'از پیش فکر کنید چه چیزی دیگر نمی‌شود. از روزتان مثال بزنید، مثل بالا رفتن از پله، خرید یا کارهای خانه.',
                'بنویسید چه می‌خواهید بگویید، یا از کسی بخواهید در این کار کمک‌تان کند.',
                'می‌توانید کسی را همراه بیاورید. در این گفت‌وگو کمک مستقل رایگان هم هست: یک cliëntondersteuner (پشتیبان مستقل مراجع). هنگام گرفتن وقت درباره‌اش بپرسید.',
              ] },
              { kop: 'چه می‌توانید بگویید یا بپرسید', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.', eigen: 'دیگر نمی‌توانم این کار را تنها انجام دهم.' },
                { zeg: 'Wat gebeurt er na dit gesprek?', eigen: 'بعد از این گفت‌وگو چه می‌شود؟' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?', eigen: 'می‌شود آنچه را توافق کردیم بنویسید؟' },
              ] },
            ],
          },
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'صحبت درباره کمک اجتماعی من (bijstand)',
            blokken: [
              { kop: 'چطور کار می‌کند', type: 'tekst',
                tekst: 'اگر کمک اجتماعی (bijstand) می‌گیری، گاهی با klantmanager (مسئول پرونده‌ات) صحبتی داری. صحبت درباره این است که حالت چطور است، آیا چیزی در وضعیتت تغییر کرده، و توافق‌ها درباره کار یا مشارکت چیست. این بخش عادی کمک اجتماعی است.' },
              { kop: 'دو چیز که مهم است', type: 'lijst', items: [
                'تغییرات وضعیتت را به‌موقع اطلاع بده: زندگی مشترک، کار، پول اضافی، کسی که پیش تو می‌آید، یا کوچ‌کشی. حتی اگر مطمئن نیستی، اطلاع بده. اگر به‌موقع اطلاع ندهی، شاروالی می‌تواند پول را پس بخواهد.',
                'با توافق‌ها همکاری کن، مثل آمدن به صحبت یا برداشتن قدم‌هایی برای پیدا کردن کار.',
              ] },
              { kop: 'klantmanager چه خواهد پرسید', type: 'lijst', items: [
                'در حال حاضر حالت چطور است؟',
                'چیزی در وضعیتت تغییر کرده؟ (مسکن، خانواده، پول، صحت)',
                'کار می‌کنی، یا کاری برای پیدا کردن کار انجام می‌دهی؟',
                'با پولت می‌توانی زندگی را پیش ببری؟',
              ] },
              { kop: 'چطور آماده شوی', type: 'lijst', items: [
                'فکر کن آیا از دفعه قبل چیزی تغییر کرده. مطمئن نیستی؟ به هر حال بگو.',
                'با خود ببر: سند هویت و کارت بانکی‌ات. گاهی شاروالی صورت‌حساب بانکی می‌خواهد، در نامه دعوتت ببین.',
                'نامه‌ای درباره این صحبت گرفته‌ای؟ با خود ببر.',
                'مشکلی داری، مثل قرض؟ می‌توانی آن را بگویی. شاروالی گاهی می‌تواند کمک کند.',
              ] },
              { kop: 'چه می‌توانی بگویی یا بپرسی', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?',
                  eigen: 'نفهمیدم، می‌توانید آرام‌تر توضیح بدهید؟' },
                { zeg: 'Wat betekent dit voor mijn uitkering?',
                  eigen: 'این برای کمک اجتماعی من چه معنایی دارد؟' },
                { zeg: 'Wat moet ik nu doen?',
                  eigen: 'حالا چه باید بکنم؟' },
                'از شاروالی بخواه توافق را روی کاغذ بنویسد، تا در خانه دوباره بخوانی.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'مکتب طفلم',
        vasteBlokken: [
          { kop: 'اگر دنبال کردن صحبت سخت است', type: 'lijst', items: [
            { intro: 'بدون تردید بپرس:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'می‌توانید آهسته‌تر یا با کلمات ساده‌تر بگویید؟' },
            'می‌توانی کسی را که به او اعتماد داری با خود ببری.',
            'هنوز زبان را خوب صحبت نمی‌کنی؟ از قبل از مکتب بپرس که آیا ترجمان می‌تواند باشد، یا کسی را ببر که بتواند ترجمه کند.',
          ] },
          { kop: '۱۰ دقیقه خیلی کوتاه است؟', type: 'tekst',
            tekst: 'بیشتر از آنچه در ۱۰ دقیقه جا شود، برای صحبت داری؟ از معلم قرار جداگانه بخواه. این همیشه ممکن است، در وقت دیگری از سال هم.' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: 'صحبت ۱۰ دقیقه‌ای (10-minutengesprek) با معلم',
            blokken: [
              { kop: 'چطور کار می‌کند', type: 'tekst',
                tekst: 'چند بار در سال، مکتب همه والدین را برای صحبت کوتاهی با معلم دعوت می‌کند. حدود ۱۰ دقیقه طول می‌کشد. با هم صحبت می‌کنید که حال طفلت در مکتب چطور است.\n\nاین صحبت برای همه والدین است، حتی وقتی حال طفلت خوب است. چون وقت کم است، آماده آمدن کمک می‌کند.' },
              { kop: 'معلم چه خواهد گفت یا پرسید', type: 'lijst', items: [
                'خواندن، ریاضی و مضامین دیگر چطور پیش می‌روند.',
                'طفلت چطور در صنف اشتراک می‌کند و با اطفال دیگر چطور رفتار می‌کند.',
                'گاهی معلم کارها یا نتایج امتحان طفلت را نشان می‌دهد.',
                'طفلت با خوشی به مکتب می‌رود؟ در خانه اوضاع چطور است؟',
              ] },
              { kop: 'چطور آماده شوی', type: 'lijst', items: [
                'از قبل از طفلت بپرس: مکتب چطور است؟ چه چیزی را دوست داری؟ چه چیزی برایت سخت است؟',
                'وقت کم است. به یک یا دو چیز فکر کن که حتماً می‌خواهی بپرسی و آنها را بنویس.',
                'نامه یا کارنامه‌ای گرفته‌ای؟ با خود ببر.',
                'درباره چیزی نگران هستی؟ با آن شروع کن، تا برایش وقت کافی باشد.',
              ] },
              { kop: 'چه می‌توانی بگویی یا بپرسی', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?',
                  eigen: 'خواندن و ریاضی چطور پیش می‌رود؟' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?',
                  eigen: 'طفل من با اطفال دیگر خوب رفتار می‌کند؟' },
                { zeg: 'Wat kan ik thuis doen om te helpen?',
                  eigen: 'در خانه چه می‌توانم بکنم تا کمک کنم؟' },
                'تو طفلت را از همه بهتر می‌شناسی. اگر در خانه چیز دیگری می‌بینی نسبت به آنچه معلم در مکتب می‌بیند، بگو.',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?',
                  eigen: 'نفهمیدم، می‌توانید طور دیگری بگویید؟' },
              ] },
            ],
          },
        ],
      },

    ],
  },

  RO: {

    ui: {
      paginaTitel: 'Bine pregătit',
      welkom: 'Ai o programare? Te ajut să te pregătești. Așa știi la ce să te aștepți și ce poți spune.',
      kiesCategorie: 'Unde mergi?',
      kiesSituatie: 'Pentru ce mergi?',
      verder: 'Mai departe →',
      klaar: 'Asta a fost tot. Mai vrei să afli ceva?',
      opnieuw: '↺ Altă programare',
      aiUitnodiging: 'Ai o întrebare despre programarea ta? Scrie sau vorbește mai jos.',
      aiPlaceholder: 'Pune întrebarea ta...',
      aiSpreekTitel: 'Vorbește',
      aiFout: 'Ceva nu a mers. Încearcă din nou.',
      aiDisclaimer: '🤖 Acesta este un ajutor pentru pregătirea programării tale. Nu este sfat medical sau juridic. Nu împărtăși numărul BSN sau alte date personale.',
      voorlezen: 'Citește cu voce tare',
      zegSluit: 'Atinge pentru a închide',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'Doctorul',
        vasteBlokken: [
          { kop: 'Dacă discuția este greu de urmărit', type: 'lijst', items: [
            { intro: 'Nu ezita să întrebi:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Puteți spune mai rar sau cu cuvinte mai simple?' },
            'Poți lua cu tine o persoană în care ai încredere.',
            'Nu vorbești încă bine limba? Cere un interpret când faci programarea, cel mai bine când suni. E mai bine să nu iei un copil ca interpret la discuții dificile.',
          ] },
          { kop: 'Nu costă nimic', type: 'tekst',
            tekst: 'O vizită la medicul de familie (huisarts) este gratuită. Nu se scade din suma ta de risc propriu (eigen risico).' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'Am o problemă de sănătate sau o durere',
            blokken: [
              { kop: 'Cum lucrează doctorul', type: 'tekst',
                tekst: 'Medicul de familie (huisarts) nu dă întotdeauna imediat medicamente. Doctorul pune mai întâi întrebări ca să înțeleagă bine problema ta. Uneori sfatul este să aștepți o săptămână și să revii dacă nu se ameliorează. Multe probleme trec de la sine.' },
              { kop: 'Ce va întreba doctorul', type: 'lijst', items: [
                'De când ai această problemă?',
                'Unde exact este durerea?',
                'Ce ai încercat deja?',
                'Mai ai și alte probleme?',
                'Cum îți merge în rest: munca, acasă, somnul?',
              ] },
              { kop: 'Cum te pregătești', type: 'lijst', items: [
                'Gândește-te când a început problema și ce simți exact.',
                'Scrie-ți problema, sau roagă pe cineva să te ajute cu asta.',
                'Ai mai multe probleme? Spune asta la început, ca doctorul să poată împărți timpul.',
                'Iei medicamente? Ia-le cu tine sau scrie numele lor.',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?',
                  eigen: 'Nu înțeleg, puteți explica încă o dată?' },
                { zeg: 'Wat kan ik zelf doen?',
                  eigen: 'Ce pot face eu însumi?' },
                { zeg: 'Wanneer moet ik terugkomen?',
                  eigen: 'Când trebuie să revin?' },
                'Roagă doctorul să scrie, dacă nu poți ține minte.',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'Prima dată la un nou medic de familie',
            blokken: [
              { kop: 'Cum funcționează', type: 'tekst',
                tekst: 'Mai întâi trebuie să fii înscris la un cabinet de medic de familie. Alegi un medic de familie (huisarts) din apropiere și te înscrii acolo. Acela devine medicul tău permanent.' },
              { kop: 'De ce ai nevoie pentru înscriere', type: 'lijst', items: [
                'Actul tău de identitate.',
                'Numărul tău de serviciu cetățenesc (BSN).',
                'Asigurarea ta de sănătate.',
              ] },
              { kop: 'Cum te pregătești', type: 'lijst', items: [
                'Caută un medic de familie din apropiere care primește pacienți noi. Într-un oraș mare, asta e uneori dificil. Continuă să suni sau roagă pe cineva să te ajute.',
                'Înscrie-te de îndată ce se poate, chiar dacă nu ești bolnav.',
                'Ai informații medicale de dinainte? Ia-le cu tine la prima vizită.',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                { zeg: 'Neemt u nieuwe patiënten aan?',
                  eigen: 'Primiți pacienți noi?' },
                'Întreabă cum funcționează: cum faci o programare și ce faci seara sau în weekend.',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'La un specialist sau la spital',
            blokken: [
              { kop: 'Cum funcționează', type: 'tekst',
                tekst: 'Mergi mai întâi la medicul de familie (huisarts), nu direct la un specialist. Medicul de familie evaluează dacă e nevoie de un specialist și dă atunci o trimitere. Fără trimitere, asigurarea de obicei nu plătește specialistul.\n\nMedicul de familie nu trimite întotdeauna mai departe. Uneori tratează el însuși problema ta. Asta înseamnă că un specialist nu este necesar în acel moment.' },
              { kop: 'Ce va întreba doctorul', type: 'lijst', items: [
                'Care este problema ta și de când o ai?',
                'Ce s-a încercat deja?',
                'De ce crezi că e nevoie de un specialist?',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                'Explică de ce ești îngrijorat.',
                { zeg: 'Waarom is een specialist nu nog niet nodig?',
                  eigen: 'De ce nu este încă nevoie de un specialist acum?' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?',
                  eigen: 'Când trebuie să revin dacă nu se ameliorează?' },
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'Merg pentru copilul meu',
            blokken: [
              { kop: 'Cum funcționează', type: 'tekst',
                tekst: 'Pentru probleme de sănătate și boli mergi cu copilul la medicul de familie (huisarts), la fel ca pentru tine. Doctorul pune întrebări și examinează copilul.\n\nPentru creștere, vaccinuri și controale generale nu mergi la medicul de familie, ci la consultatiebureau (centrul de consultații pentru copii) sau la serviciul de sănătate pentru tineret (GGD). Acela este un loc separat pentru copii.' },
              { kop: 'Ce va întreba doctorul', type: 'lijst', items: [
                'De când are copilul tău problema?',
                'Are copilul febră, și cât de mare?',
                'Mănâncă și bea copilul normal?',
                'Ce ai făcut sau ce i-ai dat deja?',
              ] },
              { kop: 'Cum te pregătești', type: 'lijst', items: [
                'Gândește-te când a început și ce observi la copilul tău.',
                'Știi greutatea copilului? Asta e uneori utilă.',
                'Ia copilul medicamente? Ia-le cu tine sau scrie numele lor.',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                'Tu îți cunoști copilul cel mai bine. Spune dacă copilul e cu adevărat altfel decât de obicei.',
                { zeg: 'Waar moet ik op letten?',
                  eigen: 'La ce trebuie să fiu atent?' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?',
                  eigen: 'Când trebuie să revin sau să sun?' },
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'A discuta ceva personal sau dificil',
            blokken: [
              { kop: 'Cum funcționează', type: 'tekst',
                tekst: 'Poți merge la medicul de familie (huisarts) și pentru stres, somn prost, tristețe, griji sau o situație dificilă acasă. Doctorul tratează asta confidențial.' },
              { kop: 'Cum te pregătești', type: 'lijst', items: [
                'Gândește-te dinainte ce vrei să spui. Poți să scrii și să citești.',
                'Nu trebuie să spui totul dintr-odată. Începe cu ce e mai important.',
                'Vrei timp liniștit pentru asta? Spune când faci programarea că vrei să vorbești despre ceva. Uneori primești atunci o programare mai lungă.',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                { zeg: 'Dit is moeilijk voor mij om te vertellen.',
                  eigen: 'Îmi este greu să vorbesc despre asta.' },
                { zeg: 'Met wie kan ik hierover verder praten?',
                  eigen: 'Cu cine pot vorbi mai departe despre asta?',
                  na: 'Medicul de familie te poate trimite mai departe.' },
                'Poți lua cu tine o persoană în care ai încredere.',
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
        naam: 'Primăria (gemeente)',
        vasteBlokken: [
          { kop: 'Dacă discuția este greu de urmărit', type: 'lijst', items: [
            { intro: 'Nu ezita să întrebi:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Puteți spune mai rar sau cu cuvinte mai simple?' },
            'Poți lua cu tine o persoană în care ai încredere.',
            'Nu vorbești încă bine limba? Cere un interpret când faci programarea.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'Rezolvarea unei probleme la ghișeu (pașaport, act de identitate sau alt document)',
            blokken: [
              { kop: 'Cum funcționează', type: 'tekst',
                tekst: 'Pentru un pașaport, o carte de identitate, un permis de conducere sau un extras oficial (uittreksel) faci de obicei mai întâi o programare, online sau telefonic. Nu poți întotdeauna să intri pur și simplu.\n\nUn pașaport, o carte de identitate sau un permis de conducere nou nu este gata imediat. Îl ridici mai târziu, deseori după aproximativ o săptămână.' },
              { kop: 'Ce iei cu tine', type: 'lijst', items: [
                'Confirmarea programării, dacă ai primit-o.',
                'Actul tău de identitate. Ia-l cu tine chiar dacă a expirat.',
                'Cardul tău bancar (pinpas). La ghișeu plătești imediat, deseori doar cu cardul.',
                'Pentru un pașaport, o carte de identitate sau un permis de conducere: o fotografie recentă făcută de un fotograf. O fotografie făcută singur de obicei nu este acceptată.',
              ] },
              { kop: 'Cum te pregătești', type: 'lijst', items: [
                'Verifică în confirmare ce trebuie să iei cu tine. Nu ești sigur? Sună la gemeente înainte să mergi.',
                'Vino la timp. Dacă întârzii, uneori trebuie să faci o nouă programare.',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                { zeg: 'Wat kost het?', eigen: 'Cât costă?' },
                { zeg: 'Wanneer is het klaar?', eigen: 'Când este gata?' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?', eigen: 'Trebuie să fac o programare ca să îl ridic?' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?', eigen: 'Nu înțeleg, puteți explica mai calm?' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'O discuție despre ajutor sau îngrijire acasă (Wmo)',
            blokken: [
              { kop: 'Cum funcționează', type: 'tekst',
                tekst: 'Ai nevoie de ajutor, de exemplu la treburile casnice, cu transportul sau cu o adaptare în locuință? Atunci ai mai întâi o discuție cu cineva de la gemeente. Aceasta se numește deseori keukentafelgesprek (discuție la masa din bucătărie). Poate avea loc la tine acasă sau la sediul primăriei.\n\nÎn discuție, gemeente se uită împreună cu tine la ce poți face singur, la ce pot face cei din jurul tău și unde este nevoie de ajutor.' },
              { kop: 'Ce va întreba gemeente', type: 'lijst', items: [
                'Ce merge bine acasă și ce nu mai reușești?',
                'Cine te ajută deja? (familie, vecini, cunoscuți)',
                'Cum este sănătatea ta?',
                'Ce ai vrea să poți face din nou singur?',
              ] },
              { kop: 'Cum te pregătești', type: 'lijst', items: [
                'Gândește-te dinainte la ce nu mai reușești. Dă exemple din ziua ta, precum urcatul scărilor, cumpărăturile sau treburile casnice.',
                'Scrie ce vrei să spui sau roagă pe cineva să te ajute cu asta.',
                'Poți lua pe cineva cu tine. La această discuție există și ajutor independent gratuit: un cliëntondersteuner (consilier independent al clientului). Întreabă de el când faci programarea.',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.', eigen: 'Nu mai reușesc asta singur.' },
                { zeg: 'Wat gebeurt er na dit gesprek?', eigen: 'Ce se întâmplă după această discuție?' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?', eigen: 'Puteți scrie ce am stabilit?' },
              ] },
            ],
          },
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'O discuție despre ajutorul meu social (bijstand)',
            blokken: [
              { kop: 'Cum funcționează', type: 'tekst',
                tekst: 'Dacă primești ajutor social (bijstand), ai uneori o discuție cu klantmanager-ul tău (managerul de dosar). Este despre cum îți merge, dacă s-a schimbat ceva în situația ta, și care sunt înțelegerile despre muncă sau participare. Este o parte normală a ajutorului.' },
              { kop: 'Două lucruri importante', type: 'lijst', items: [
                'Anunță la timp schimbările din situația ta: conviețuire, muncă, bani în plus, cineva care se mută la tine, sau mutarea. Anunță și dacă nu ești sigur. Dacă nu anunți la timp, primăria poate cere banii înapoi.',
                'Respectă înțelegerile, cum ar fi să vii la o discuție sau să faci pași pentru a găsi de lucru.',
              ] },
              { kop: 'Ce va întreba klantmanager-ul', type: 'lijst', items: [
                'Cum îți merge în acest moment?',
                'S-a schimbat ceva în situația ta? (locuință, familie, bani, sănătate)',
                'Lucrezi, sau faci ceva pentru a găsi de lucru?',
                'Reușești să te descurci cu banii?',
              ] },
              { kop: 'Cum te pregătești', type: 'lijst', items: [
                'Gândește-te dacă s-a schimbat ceva de data trecută. Nu ești sigur? Spune oricum.',
                'Ia cu tine: actul de identitate și cardul bancar. Uneori primăria cere extrase de cont, verifică în scrisoarea de invitație.',
                'Ai primit o scrisoare despre această discuție? Ia-o cu tine.',
                'Ai probleme, cum ar fi datorii? Poți să le menționezi. Primăria poate uneori ajuta.',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?',
                  eigen: 'Nu înțeleg, puteți explica mai calm?' },
                { zeg: 'Wat betekent dit voor mijn uitkering?',
                  eigen: 'Ce înseamnă asta pentru ajutorul meu?' },
                { zeg: 'Wat moet ik nu doen?',
                  eigen: 'Ce trebuie să fac acum?' },
                'Cere primăriei să pună înțelegerea pe hârtie, ca să o poți reciti acasă.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'Școala copilului meu',
        vasteBlokken: [
          { kop: 'Dacă discuția este greu de urmărit', type: 'lijst', items: [
            { intro: 'Nu ezita să întrebi:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Puteți spune mai rar sau cu cuvinte mai simple?' },
            'Poți lua cu tine o persoană în care ai încredere.',
            'Nu vorbești încă bine limba? Întreabă școala dinainte dacă poate fi prezent un interpret, sau ia cu tine pe cineva care poate traduce.',
          ] },
          { kop: 'Sunt 10 minute prea puțin?', type: 'tekst',
            tekst: 'Ai de discutat mai mult decât încape în 10 minute? Cere învățătorului o programare separată. Asta e întotdeauna posibil, și în alt moment al anului.' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: 'Discuția de 10 minute (10-minutengesprek) cu învățătorul',
            blokken: [
              { kop: 'Cum funcționează', type: 'tekst',
                tekst: 'De câteva ori pe an, școala invită toți părinții la o discuție scurtă cu învățătorul sau învățătoarea. Durează aproximativ 10 minute. Discutați împreună cum îi merge copilului tău la școală.\n\nAceastă discuție este pentru toți părinții, și când copilului îi merge bine. Pentru că timpul e scurt, ajută să vii pregătit.' },
              { kop: 'Ce va spune sau întreba învățătorul', type: 'lijst', items: [
                'Cum merge cititul, matematica și celelalte materii.',
                'Cum participă copilul în clasă și cum se înțelege cu ceilalți copii.',
                'Uneori învățătorul arată lucrări sau rezultate la teste ale copilului.',
                'Merge copilul cu plăcere la școală? Cum e acasă?',
              ] },
              { kop: 'Cum te pregătești', type: 'lijst', items: [
                'Întreabă-ți copilul dinainte: cum merge la școală? Ce îți place? Ce ți se pare greu?',
                'Timpul e scurt. Gândește-te la unul sau două lucruri pe care sigur vrei să le întrebi și scrie-le.',
                'Ai primit o scrisoare sau un carnet de note? Ia-le cu tine.',
                'Te îngrijorează ceva? Începe cu asta, ca să fie destul timp pentru ea.',
              ] },
              { kop: 'Ce poți spune sau întreba', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?',
                  eigen: 'Cum merge cu cititul și matematica?' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?',
                  eigen: 'Se înțelege copilul meu bine cu ceilalți copii?' },
                { zeg: 'Wat kan ik thuis doen om te helpen?',
                  eigen: 'Ce pot face acasă ca să ajut?' },
                'Tu îți cunoști copilul cel mai bine. Spune dacă acasă vezi ceva diferit de ce vede învățătorul la școală.',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?',
                  eigen: 'Nu înțeleg, puteți spune altfel?' },
              ] },
            ],
          },
        ],
      },

    ],
  },

  PL: {

    ui: {
      paginaTitel: 'Dobrze przygotowany',
      welkom: 'Masz przed sobą spotkanie lub wizytę? Pomogę ci się przygotować. Dzięki temu wiesz, czego się spodziewać i co możesz powiedzieć.',
      kiesCategorie: 'Dokąd idziesz?',
      kiesSituatie: 'W jakiej sprawie?',
      verder: 'Dalej →',
      klaar: 'To wszystko. Chcesz wiedzieć coś jeszcze?',
      opnieuw: '↺ Inne spotkanie',
      aiUitnodiging: 'Masz własne pytanie o swoje spotkanie? Napisz lub powiedz poniżej.',
      aiPlaceholder: 'Zadaj pytanie...',
      aiSpreekTitel: 'Powiedz',
      aiFout: 'Coś poszło nie tak. Spróbuj ponownie.',
      aiDisclaimer: '🤖 To pomoc w przygotowaniu się do spotkania. To nie jest porada medyczna ani prawna. Nie podawaj numeru BSN ani innych danych osobowych.',
      voorlezen: 'Przeczytaj na głos',
      zegSluit: 'Dotknij, aby zamknąć',
    },

    categorieen: [

      // ===================================================================
      // DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'Lekarz',
        vasteBlokken: [
          { kop: 'Jeśli rozmowa jest trudna do zrozumienia', type: 'lijst', items: [
            { intro: 'Śmiało zapytaj:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Czy może pan/pani powiedzieć to wolniej lub prostszymi słowami?' },
            'Możesz zabrać ze sobą osobę, której ufasz.',
            'Nie mówisz jeszcze dobrze w tym języku? Poproś o tłumacza, gdy umawiasz wizytę, najlepiej podczas rozmowy telefonicznej. Lepiej nie zabieraj dziecka jako tłumacza na trudne rozmowy.',
          ] },
          { kop: 'To nic nie kosztuje', type: 'tekst',
            tekst: 'Wizyta u lekarza rodzinnego (huisarts) jest bezpłatna. Nie jest odliczana od twojego udziału własnego (eigen risico).' },
        ],
        situaties: [
          {
            id: 'dokter-klacht', emoji: '🤒', titel: 'Mam dolegliwość lub ból',
            blokken: [
              { kop: 'Jak pracuje lekarz', type: 'tekst',
                tekst: 'Lekarz rodzinny (huisarts) nie zawsze od razu przepisuje leki. Najpierw zadaje pytania, żeby dobrze zrozumieć twoją dolegliwość. Czasem radzi poczekać tydzień i wrócić, jeśli nie będzie lepiej. Wiele dolegliwości mija samo.' },
              { kop: 'O co zapyta lekarz', type: 'lijst', items: [
                'Od kiedy masz tę dolegliwość?',
                'Gdzie dokładnie boli?',
                'Czego już próbowałeś?',
                'Masz jeszcze inne dolegliwości?',
                'Jak ci idzie poza tym: praca, dom, sen?',
              ] },
              { kop: 'Jak się przygotować', type: 'lijst', items: [
                'Przypomnij sobie, kiedy dolegliwość się zaczęła i co dokładnie czujesz.',
                'Zapisz swoją dolegliwość, albo poproś kogoś o pomoc przy tym.',
                'Masz więcej niż jedną dolegliwość? Powiedz to na początku, żeby lekarz mógł podzielić czas.',
                'Bierzesz leki? Weź je ze sobą lub zapisz ich nazwy.',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het nog een keer uitleggen?',
                  eigen: 'Nie rozumiem, czy może pan/pani wyjaśnić jeszcze raz?' },
                { zeg: 'Wat kan ik zelf doen?',
                  eigen: 'Co mogę zrobić sam?' },
                { zeg: 'Wanneer moet ik terugkomen?',
                  eigen: 'Kiedy mam wrócić?' },
                'Poproś lekarza, żeby to zapisał, jeśli nie możesz zapamiętać.',
              ] },
            ],
          },
          {
            id: 'dokter-eerste', emoji: '👋', titel: 'Pierwszy raz u nowego lekarza rodzinnego',
            blokken: [
              { kop: 'Jak to działa', type: 'tekst',
                tekst: 'Najpierw musisz być zapisany do praktyki lekarza rodzinnego. Wybierasz jednego lekarza rodzinnego (huisarts) w okolicy i tam się zapisujesz. On staje się twoim stałym lekarzem.' },
              { kop: 'Czego potrzebujesz do zapisania się', type: 'lijst', items: [
                'Twój dokument tożsamości.',
                'Twój numer obywatelski (BSN).',
                'Twoje ubezpieczenie zdrowotne.',
              ] },
              { kop: 'Jak się przygotować', type: 'lijst', items: [
                'Poszukaj lekarza rodzinnego w okolicy, który przyjmuje nowych pacjentów. W dużym mieście bywa to trudne. Dzwoń dalej albo poproś kogoś o pomoc.',
                'Zapisz się, gdy tylko się da, nawet jeśli nie jesteś chory.',
                'Masz dokumentację medyczną z przeszłości? Weź ją na pierwszą wizytę.',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                { zeg: 'Neemt u nieuwe patiënten aan?',
                  eigen: 'Czy przyjmują państwo nowych pacjentów?' },
                'Zapytaj, jak to działa: jak umówić wizytę i co robić wieczorem lub w weekend.',
              ] },
            ],
          },
          {
            id: 'dokter-specialist', emoji: '🏥', titel: 'Do specjalisty lub do szpitala',
            blokken: [
              { kop: 'Jak to działa', type: 'tekst',
                tekst: 'Najpierw idziesz do lekarza rodzinnego (huisarts), a nie od razu do specjalisty. Lekarz rodzinny ocenia, czy specjalista jest potrzebny, i wtedy daje skierowanie. Bez skierowania ubezpieczenie zwykle nie płaci za specjalistę.\n\nLekarz rodzinny nie zawsze kieruje dalej. Czasem sam leczy twoją dolegliwość. To znaczy, że specjalista nie jest w tym momencie jeszcze potrzebny.' },
              { kop: 'O co zapyta lekarz', type: 'lijst', items: [
                'Jaka jest twoja dolegliwość i od kiedy ją masz?',
                'Czego już próbowano?',
                'Dlaczego uważasz, że specjalista jest potrzebny?',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                'Wyjaśnij, dlaczego się martwisz.',
                { zeg: 'Waarom is een specialist nu nog niet nodig?',
                  eigen: 'Dlaczego specjalista nie jest teraz jeszcze potrzebny?' },
                { zeg: 'Wanneer moet ik terugkomen als het niet beter wordt?',
                  eigen: 'Kiedy mam wrócić, jeśli nie będzie lepiej?' },
              ] },
            ],
          },
          {
            id: 'dokter-kind', emoji: '🧒', titel: 'Idę w sprawie mojego dziecka',
            blokken: [
              { kop: 'Jak to działa', type: 'tekst',
                tekst: 'Z dolegliwościami i chorobami idziesz z dzieckiem do lekarza rodzinnego (huisarts), tak jak dla siebie. Lekarz zadaje pytania i bada dziecko.\n\nW sprawie wzrostu, szczepień i ogólnych badań kontrolnych nie idziesz do lekarza rodzinnego, tylko do consultatiebureau (poradni dziecięcej) lub służby zdrowia dla młodzieży (GGD). To osobne miejsce dla dzieci.' },
              { kop: 'O co zapyta lekarz', type: 'lijst', items: [
                'Od kiedy dziecko ma tę dolegliwość?',
                'Czy dziecko ma gorączkę i jak wysoką?',
                'Czy dziecko normalnie je i pije?',
                'Co już zrobiłeś lub co podałeś?',
              ] },
              { kop: 'Jak się przygotować', type: 'lijst', items: [
                'Przypomnij sobie, kiedy to się zaczęło i co zauważasz u dziecka.',
                'Znasz wagę dziecka? To czasem przydatne.',
                'Dziecko bierze leki? Weź je lub zapisz ich nazwy.',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                'Znasz swoje dziecko najlepiej. Powiedz, jeśli dziecko naprawdę zachowuje się inaczej niż zwykle.',
                { zeg: 'Waar moet ik op letten?',
                  eigen: 'Na co mam zwracać uwagę?' },
                { zeg: 'Wanneer moet ik terugkomen of bellen?',
                  eigen: 'Kiedy mam wrócić lub zadzwonić?' },
              ] },
            ],
          },
          {
            id: 'dokter-persoonlijk', emoji: '💬', titel: 'Rozmowa o czymś osobistym lub trudnym',
            blokken: [
              { kop: 'Jak to działa', type: 'tekst',
                tekst: 'Do lekarza rodzinnego (huisarts) możesz też przyjść ze stresem, złym snem, smutkiem, zmartwieniami lub trudną sytuacją w domu. Lekarz traktuje to poufnie.' },
              { kop: 'Jak się przygotować', type: 'lijst', items: [
                'Zastanów się wcześniej, co chcesz powiedzieć. Możesz to zapisać i przeczytać.',
                'Nie musisz mówić wszystkiego naraz. Zacznij od najważniejszego.',
                'Chcesz mieć na to spokojnie czas? Przy umawianiu wizyty powiedz, że chcesz o czymś porozmawiać. Czasem dostaniesz wtedy dłuższą wizytę.',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                { zeg: 'Dit is moeilijk voor mij om te vertellen.',
                  eigen: 'Trudno mi o tym mówić.' },
                { zeg: 'Met wie kan ik hierover verder praten?',
                  eigen: 'Z kim mogę o tym dalej porozmawiać?',
                  na: 'Lekarz rodzinny może cię skierować dalej.' },
                'Możesz zabrać ze sobą osobę, której ufasz.',
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
        naam: 'Gmina (gemeente)',
        vasteBlokken: [
          { kop: 'Jeśli rozmowa jest trudna do zrozumienia', type: 'lijst', items: [
            { intro: 'Śmiało zapytaj:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Czy może pan/pani powiedzieć to wolniej lub prostszymi słowami?' },
            'Możesz zabrać ze sobą osobę, której ufasz.',
            'Nie mówisz jeszcze dobrze w tym języku? Poproś o tłumacza, gdy umawiasz spotkanie.',
          ] },
        ],
        situaties: [
          {
            id: 'gemeente-balie', emoji: '🪪', titel: 'Załatwienie czegoś przy okienku (paszport, dowód lub inny dokument)',
            blokken: [
              { kop: 'Jak to działa', type: 'tekst',
                tekst: 'Po paszport, dowód osobisty, prawo jazdy lub urzędowy wypis (uittreksel) zwykle najpierw umawiasz się na wizytę, przez internet lub telefonicznie. Nie zawsze można po prostu wejść.\n\nNowy paszport, dowód osobisty lub prawo jazdy nie jest gotowy od razu. Odbierasz go później, często po około tygodniu.' },
              { kop: 'Co zabrać ze sobą', type: 'lijst', items: [
                'Potwierdzenie wizyty, jeśli je otrzymałeś.',
                'Twój dokument tożsamości. Zabierz go, nawet jeśli stracił ważność.',
                'Twoją kartę bankową (pinpas). Przy okienku płacisz od razu, często tylko kartą.',
                'Do paszportu, dowodu osobistego lub prawa jazdy: aktualne zdjęcie od fotografa. Zdjęcie zrobione samodzielnie zwykle nie jest akceptowane.',
              ] },
              { kop: 'Jak się przygotować', type: 'lijst', items: [
                'Sprawdź w potwierdzeniu, co masz zabrać. Nie masz pewności? Zadzwoń do gemeente przed pójściem.',
                'Przyjdź na czas. Jeśli się spóźnisz, czasem trzeba umówić się na nową wizytę.',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                { zeg: 'Wat kost het?', eigen: 'Ile to kosztuje?' },
                { zeg: 'Wanneer is het klaar?', eigen: 'Kiedy będzie gotowe?' },
                { zeg: 'Moet ik een afspraak maken om het op te halen?', eigen: 'Czy muszę umówić się, żeby to odebrać?' },
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?', eigen: 'Nie rozumiem, czy może pan/pani wyjaśnić spokojniej?' },
              ] },
            ],
          },
          {
            id: 'gemeente-wmo', emoji: '🏠', titel: 'Rozmowa o pomocy lub opiece w domu (Wmo)',
            blokken: [
              { kop: 'Jak to działa', type: 'tekst',
                tekst: 'Potrzebujesz pomocy, na przykład w pracach domowych, z transportem albo przy przystosowaniu mieszkania? Wtedy najpierw masz rozmowę z kimś z gemeente. Nazywa się to często keukentafelgesprek (rozmowa przy kuchennym stole). Może odbyć się u ciebie w domu albo w urzędzie gminy.\n\nW rozmowie gemeente razem z tobą sprawdza, co możesz zrobić sam, co mogą zrobić ludzie wokół ciebie i gdzie potrzebna jest pomoc.' },
              { kop: 'O co zapyta gemeente', type: 'lijst', items: [
                'Co w domu idzie dobrze, a co już się nie udaje?',
                'Kto już ci pomaga? (rodzina, sąsiedzi, znajomi)',
                'Jak twoje zdrowie?',
                'Co chciałbyś znów móc robić sam?',
              ] },
              { kop: 'Jak się przygotować', type: 'lijst', items: [
                'Zastanów się wcześniej, co już się nie udaje. Podaj przykłady ze swojego dnia, takie jak schody, zakupy lub prace domowe.',
                'Zapisz, co chcesz powiedzieć, albo poproś kogoś, żeby ci w tym pomógł.',
                'Możesz kogoś zabrać ze sobą. Na tej rozmowie jest też bezpłatna niezależna pomoc: cliëntondersteuner (niezależny doradca klienta). Zapytaj o niego, gdy umawiasz wizytę.',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                { zeg: 'Dit lukt mij niet meer alleen.', eigen: 'Już sam sobie z tym nie radzę.' },
                { zeg: 'Wat gebeurt er na dit gesprek?', eigen: 'Co się stanie po tej rozmowie?' },
                { zeg: 'Kunt u opschrijven wat we hebben afgesproken?', eigen: 'Czy może pan/pani zapisać, co ustaliliśmy?' },
              ] },
            ],
          },
          {
            id: 'gemeente-bijstand', emoji: '📋', titel: 'Rozmowa o moim zasiłku (bijstand)',
            blokken: [
              { kop: 'Jak to działa', type: 'tekst',
                tekst: 'Jeśli dostajesz zasiłek społeczny (bijstand), czasem masz rozmowę ze swoim klantmanagerem (opiekunem sprawy). Chodzi o to, jak ci idzie, czy coś się zmieniło w twojej sytuacji i jakie są ustalenia dotyczące pracy lub uczestnictwa. To normalna część zasiłku.' },
              { kop: 'Dwie ważne rzeczy', type: 'lijst', items: [
                'Zgłaszaj zmiany w swojej sytuacji na czas: wspólne mieszkanie, praca, dodatkowe pieniądze, ktoś, kto się do ciebie wprowadza, albo przeprowadzka. Zgłoś, nawet jeśli masz wątpliwości. Jeśli nie zgłosisz na czas, gmina może zażądać zwrotu pieniędzy.',
                'Współpracuj przy ustaleniach, na przykład przyjdź na rozmowę albo rób kroki, żeby znaleźć pracę.',
              ] },
              { kop: 'O co zapyta klantmanager', type: 'lijst', items: [
                'Jak ci idzie w tej chwili?',
                'Czy coś się zmieniło w twojej sytuacji? (mieszkanie, rodzina, pieniądze, zdrowie)',
                'Pracujesz, albo robisz coś, żeby znaleźć pracę?',
                'Czy udaje ci się związać koniec z końcem?',
              ] },
              { kop: 'Jak się przygotować', type: 'lijst', items: [
                'Zastanów się, czy coś się zmieniło od ostatniego razu. Masz wątpliwości? I tak powiedz.',
                'Weź ze sobą: dokument tożsamości i kartę bankową. Czasem gmina prosi o wyciągi bankowe, sprawdź w liście z zaproszeniem.',
                'Dostałeś list o tej rozmowie? Weź go ze sobą.',
                'Masz problemy, na przykład długi? Możesz o nich powiedzieć. Gmina czasem może pomóc.',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                { zeg: 'Ik begrijp het niet, kunt u het rustiger uitleggen?',
                  eigen: 'Nie rozumiem, czy może pan/pani wyjaśnić spokojniej?' },
                { zeg: 'Wat betekent dit voor mijn uitkering?',
                  eigen: 'Co to znaczy dla mojego zasiłku?' },
                { zeg: 'Wat moet ik nu doen?',
                  eigen: 'Co mam teraz zrobić?' },
                'Poproś gminę o zapisanie ustaleń na papierze, żebyś mógł je przeczytać w domu.',
              ] },
            ],
          },
        ],
      },

      // ===================================================================
      // SCHOOL (basisschool)
      // ===================================================================
      {
        id: 'school',
        emoji: '🏫',
        naam: 'Szkoła mojego dziecka',
        vasteBlokken: [
          { kop: 'Jeśli rozmowa jest trudna do zrozumienia', type: 'lijst', items: [
            { intro: 'Śmiało zapytaj:', zeg: 'Kunt u het langzamer of met makkelijkere woorden zeggen?',
              eigen: 'Czy może pan/pani powiedzieć to wolniej lub prostszymi słowami?' },
            'Możesz zabrać ze sobą osobę, której ufasz.',
            'Nie mówisz jeszcze dobrze w tym języku? Zapytaj wcześniej szkołę, czy może być obecny tłumacz, albo weź kogoś, kto może tłumaczyć.',
          ] },
          { kop: 'Czy 10 minut to za mało?', type: 'tekst',
            tekst: 'Masz do omówienia więcej, niż mieści się w 10 minutach? Poproś nauczyciela o osobne spotkanie. To zawsze możliwe, także w innym momencie roku.' },
        ],
        situaties: [
          {
            id: 'school-tienminuten', emoji: '🧑‍🏫', titel: 'Rozmowa 10-minutowa (10-minutengesprek) z nauczycielem',
            blokken: [
              { kop: 'Jak to działa', type: 'tekst',
                tekst: 'Kilka razy w roku szkoła zaprasza wszystkich rodziców na krótką rozmowę z nauczycielem lub nauczycielką. Trwa około 10 minut. Razem omawiacie, jak dziecku idzie w szkole.\n\nTa rozmowa jest dla wszystkich rodziców, także gdy dziecku idzie dobrze. Ponieważ czasu jest mało, pomaga przyjść przygotowanym.' },
              { kop: 'Co nauczyciel powie lub o co zapyta', type: 'lijst', items: [
                'Jak idzie czytanie, matematyka i inne przedmioty.',
                'Jak dziecko uczestniczy w klasie i dogaduje się z innymi dziećmi.',
                'Czasem nauczyciel pokazuje prace lub wyniki testów dziecka.',
                'Czy dziecko chętnie chodzi do szkoły? Jak jest w domu?',
              ] },
              { kop: 'Jak się przygotować', type: 'lijst', items: [
                'Zapytaj dziecko wcześniej: jak jest w szkole? Co lubisz? Co jest dla ciebie trudne?',
                'Czasu jest mało. Wymyśl jedną lub dwie rzeczy, o które na pewno chcesz zapytać, i zapisz je.',
                'Dostałeś list lub świadectwo? Weź je ze sobą.',
                'Czymś się martwisz? Zacznij od tego, wtedy będzie na to dość czasu.',
              ] },
              { kop: 'Co możesz powiedzieć lub zapytać', type: 'lijst', items: [
                { zeg: 'Hoe gaat het met lezen en rekenen?',
                  eigen: 'Jak idzie czytanie i matematyka?' },
                { zeg: 'Gaat mijn kind goed om met andere kinderen?',
                  eigen: 'Czy moje dziecko dobrze dogaduje się z innymi dziećmi?' },
                { zeg: 'Wat kan ik thuis doen om te helpen?',
                  eigen: 'Co mogę robić w domu, żeby pomóc?' },
                'Znasz swoje dziecko najlepiej. Powiedz, jeśli w domu widzisz coś innego niż nauczyciel w szkole.',
                { zeg: 'Ik begrijp het niet, kunt u het anders zeggen?',
                  eigen: 'Nie rozumiem, czy może pan/pani powiedzieć inaczej?' },
              ] },
            ],
          },
        ],
      },

    ],
  },

};
