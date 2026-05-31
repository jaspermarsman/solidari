/**
 * Solidari — Goed Voorbereid: content-data
 *
 * Structuur (paraplu-architectuur):
 *   DATA[TAAL].categorieen = [ { id, emoji, naam, situaties: [...] } ]
 *   Elke situatie: { id, emoji, titel, blokken: [ {kop, type, items|tekst} ] }
 *   Elke categorie kan eigen vaste blokken hebben: categorie.vasteBlokken
 *
 * Blok-types:
 *   'tekst'  → tekst (string)
 *   'lijst'  → kop + items (array van strings)
 *
 * Nieuwe taal toevoegen: kopieer het NL-blok, vertaal de strings, zelfde id's behouden.
 * Nieuwe categorie toevoegen: voeg object toe aan categorieen-array. De pagina bouwt
 * automatisch de tegels en flow op; geen wijziging in goedvoorbereid.html nodig.
 */

window.GoedVoorbereidData = {

  NL: {

    // ── UI-teksten van de pagina zelf ──────────────────────────────────────
    ui: {
      paginaTitel: 'Goed Voorbereid',
      intro: 'Ga je naar een afspraak? Een gesprek kan lastig zijn. Hier lees je hoe het gaat en hoe je je voorbereidt. Zo begrijp je het gesprek beter — en de ander begrijpt jou beter.',
      kiesCategorie: 'Waar ga je naartoe?',
      kiesSituatie: 'Waarvoor ga je?',
      terugCategorie: '← Andere keuze',
      terugSituatie: '← Andere situatie',
      // AI-laag
      aiUitnodiging: 'Heb je nog een eigen vraag over jouw afspraak?',
      aiSub: 'Typ of spreek je vraag in. Ik help je bedenken wat je kunt zeggen en wat je kunt verwachten.',
      aiPlaceholder: 'Bijvoorbeeld: wat zeg ik als ik de afspraak niet begrijp?',
      aiKnop: 'Vraag stellen',
      aiSpreek: 'Inspreken',
      aiFout: 'Er ging iets mis. Probeer het opnieuw.',
      aiDisclaimer: 'Dit is hulp bij het voorbereiden op je gesprek. Het is geen medisch of juridisch advies. Deel geen BSN of andere persoonlijke gegevens.',
      spreekNietBeschikbaar: 'Inspreken werkt niet in deze taal of browser. Typ je vraag.',
    },

    // ── Categorieën (de paraplu) ──────────────────────────────────────────
    categorieen: [

      // ===================================================================
      // CATEGORIE: DOKTER
      // ===================================================================
      {
        id: 'dokter',
        emoji: '🩺',
        naam: 'De dokter / huisarts',
        // Vaste blokken die ONDER elke dokter-situatie verschijnen
        vasteBlokken: [
          {
            kop: 'Als het gesprek moeilijk te volgen is',
            type: 'lijst',
            items: [
              'Je mag vragen: "kunt u het langzamer of met makkelijkere woorden zeggen?"',
              'Je mag iemand meenemen die je vertrouwt.',
              'Spreek je de taal nog niet goed? Vraag bij het maken van de afspraak om een tolk. Doe dat bij voorkeur als je belt, niet pas in de spreekkamer. Neem liever geen kind mee om te tolken bij moeilijke of persoonlijke gesprekken.',
            ],
          },
          {
            kop: 'Het kost niets',
            type: 'tekst',
            tekst: 'Een bezoek aan de huisarts is gratis. Het gaat niet van je eigen risico af. Je hoeft niet bang te zijn voor een rekening.',
          },
        ],
        situaties: [
          {
            id: 'dokter-eerste',
            emoji: '👋',
            titel: 'Ik ga voor het eerst naar een nieuwe huisarts',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Om naar de huisarts te kunnen, moet je eerst ingeschreven staan bij een praktijk. Je kunt niet zomaar binnenlopen bij elke dokter. Je kiest één huisarts in de buurt en schrijft je daar in. Daarna is dat jouw vaste huisarts.' },
              { kop: 'Wat je nodig hebt om je in te schrijven', type: 'lijst',
                items: [
                  'Je identiteitsbewijs (paspoort, ID-kaart of verblijfsdocument).',
                  'Je burgerservicenummer (BSN).',
                  'Je zorgverzekering.',
                ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst',
                items: [
                  'Zoek een huisarts in de buurt die nog nieuwe patiënten aanneemt. In een grote stad kan dat lastig zijn — blijf bellen of vraag hulp.',
                  'Schrijf je in zodra je kunt, ook als je nu niet ziek bent. Dan heb je een dokter op het moment dat je er een nodig hebt.',
                  'Heb je belangrijke medische informatie van vroeger? Neem dat mee of vertel het bij het eerste bezoek.',
                ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst',
                items: [
                  'Je mag vragen: "neemt u nog nieuwe patiënten aan?"',
                  'Je mag vragen hoe het werkt: hoe maak je een afspraak, wat doe je \'s avonds of in het weekend.',
                ] },
            ],
          },
          {
            id: 'dokter-klacht',
            emoji: '🤒',
            titel: 'Ik heb een klacht of pijn en wil dat bespreken',
            blokken: [
              { kop: 'Hoe de dokter werkt', type: 'tekst',
                tekst: 'De huisarts geeft niet altijd meteen medicijnen. Vaak stelt de dokter eerst veel vragen. Dat hoort erbij. Het betekent niet dat de dokter je klacht niet serieus neemt — de dokter wil eerst goed begrijpen wat er is. Soms zegt de dokter: "wacht een week en kom terug als het niet beter is." Veel klachten gaan namelijk vanzelf over. Ook dat hoort erbij.' },
              { kop: 'Wat de dokter gaat vragen', type: 'lijst',
                items: [
                  'Sinds wanneer heb je deze klacht?',
                  'Waar zit de pijn precies?',
                  'Wat heb je al geprobeerd?',
                  'Heb je nog andere klachten?',
                  'Hoe gaat het verder met je — werk, thuis, slapen? (deze vraag kan vreemd lijken; de dokter vraagt dit omdat je lichaam en je leven samenhangen. Je hoeft niet meer te vertellen dan je wilt.)',
                ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst',
                items: [
                  'Denk van tevoren na: wanneer begon het, en wat voel je precies?',
                  'Schrijf je klacht op, of laat iemand je helpen het op te schrijven.',
                  'Heb je meer dan één klacht? Zeg dat aan het begin. Dan kan de dokter de tijd goed verdelen.',
                  'Gebruik je medicijnen? Neem ze mee of schrijf de namen op.',
                ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst',
                items: [
                  'Je mag zeggen: "ik begrijp het niet, kunt u het nog een keer uitleggen?"',
                  'Je mag vragen: "wat kan ik zelf doen?" en "wanneer moet ik terugkomen?"',
                  'Je hoeft niet alles te onthouden. Je mag het opschrijven of vragen of de dokter het opschrijft.',
                ] },
            ],
          },
          {
            id: 'dokter-specialist',
            emoji: '🏥',
            titel: 'Ik wil naar een specialist of het ziekenhuis',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Je kunt niet zelf naar een specialist of het ziekenhuis gaan. Eerst ga je naar de huisarts. De huisarts bekijkt of je naar een specialist moet. Als dat nodig is, geeft de huisarts je een verwijzing. Zonder die verwijzing betaalt je verzekering de specialist meestal niet.\n\nDe huisarts stuurt je niet altijd door. Soms kan de huisarts je klacht zelf behandelen. Dat betekent niet dat je niet serieus wordt genomen — het betekent dat een specialist op dat moment nog niet nodig is.' },
              { kop: 'Wat de dokter gaat vragen', type: 'lijst',
                items: [
                  'Wat is je klacht en sinds wanneer heb je die?',
                  'Wat is er al geprobeerd?',
                  'Waarom denk je dat je een specialist nodig hebt?',
                ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst',
                items: [
                  'Je mag uitleggen waarom je je zorgen maakt.',
                  'Je mag vragen: "waarom is een specialist nu nog niet nodig?"',
                  'Je mag vragen: "wanneer moet ik terugkomen als het niet beter wordt?"',
                ] },
            ],
          },
          {
            id: 'dokter-kind',
            emoji: '🧒',
            titel: 'Ik ga voor mijn kind',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Voor klachten en ziektes ga je met je kind naar de huisarts, net als voor jezelf. De dokter stelt vragen en bekijkt je kind. Ook hier geldt: de dokter geeft niet altijd meteen medicijnen, en dat hoort erbij.\n\nLet op: voor de groei, prikken (vaccinaties) en algemene controles ga je niet naar de huisarts, maar naar het consultatiebureau of de jeugdgezondheidszorg (GGD). Dat is een aparte plek, speciaal voor kinderen.' },
              { kop: 'Wat de dokter gaat vragen', type: 'lijst',
                items: [
                  'Sinds wanneer heeft je kind de klacht?',
                  'Heeft je kind koorts, en hoe hoog?',
                  'Eet en drinkt je kind nog normaal?',
                  'Wat heb je al gedaan of gegeven?',
                ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst',
                items: [
                  'Denk na over wanneer het begon en wat je opvalt aan je kind.',
                  'Weet je het gewicht van je kind? Dat is soms handig voor de dokter.',
                  'Heeft je kind medicijnen? Neem ze mee of schrijf de namen op.',
                ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst',
                items: [
                  'Je kent je kind het beste. Je mag zeggen: "ik vind dat mijn kind echt anders is dan normaal."',
                  'Je mag vragen: "waar moet ik op letten?" en "wanneer moet ik terugkomen of bellen?"',
                ] },
            ],
          },
          {
            id: 'dokter-persoonlijk',
            emoji: '💬',
            titel: 'Ik wil iets persoonlijks of moeilijks bespreken',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Je kunt bij de huisarts ook terecht voor dingen die geen pijn of ziekte zijn: stress, slecht slapen, verdriet, zorgen, of een moeilijke thuissituatie. De huisarts helpt ook hierbij. Je hoeft je niet te schamen — de dokter hoort dit soort dingen vaak en gaat er vertrouwelijk mee om.' },
              { kop: 'Hoe je je voorbereidt', type: 'lijst',
                items: [
                  'Bedenk van tevoren wat je wilt vertellen. Je mag het opschrijven en voorlezen als praten moeilijk is.',
                  'Je hoeft niet alles in één keer te vertellen. Je mag beginnen met het belangrijkste.',
                  'Wil je hier rustig de tijd voor? Zeg bij het maken van de afspraak dat je ergens over wilt praten. Soms kun je dan een langere afspraak krijgen.',
                ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst',
                items: [
                  'Je mag zeggen: "dit is moeilijk voor mij om te vertellen."',
                  'Je mag vragen: "met wie kan ik hierover verder praten?" De huisarts kan je doorverwijzen naar hulp.',
                  'Je mag iemand meenemen die je vertrouwt.',
                ] },
            ],
          },
        ],
      },

      // ===================================================================
      // CATEGORIE: GEMEENTE
      // ===================================================================
      {
        id: 'gemeente',
        emoji: '🏛️',
        naam: 'De gemeente',
        vasteBlokken: [
          {
            kop: 'Als het gesprek moeilijk te volgen is',
            type: 'lijst',
            items: [
              'Je mag vragen: "kunt u het langzamer of met makkelijkere woorden zeggen?"',
              'Je mag iemand meenemen die je vertrouwt.',
              'Spreek je de taal nog niet goed? Vraag bij het maken van de afspraak om een tolk. Doe dat bij voorkeur als je belt, niet pas tijdens het gesprek.',
            ],
          },
        ],
        situaties: [
          {
            id: 'gemeente-bijstand',
            emoji: '📋',
            titel: 'Ik heb een gesprek over mijn uitkering (bijstand)',
            blokken: [
              { kop: 'Hoe het werkt', type: 'tekst',
                tekst: 'Als je een bijstandsuitkering krijgt, heb je soms een gesprek met je klantmanager (ook wel consulent genoemd). Dat is een normaal onderdeel van de uitkering. Het gesprek gaat over hoe het met je gaat, of er iets veranderd is in je situatie, en wat de afspraken zijn over werk of meedoen. Het is geen straf en geen controle omdat je iets fout deed — het hoort gewoon bij de uitkering.' },
              { kop: 'Twee dingen die belangrijk zijn om te weten', type: 'lijst',
                items: [
                  'Je moet veranderingen in je situatie op tijd doorgeven. Bijvoorbeeld: je gaat samenwonen, je krijgt werk of extra geld, iemand trekt bij je in, of je gaat verhuizen. Geef dit altijd door, ook als je twijfelt of het belangrijk is. Doe je dat niet op tijd, dan kan de gemeente geld terugvragen — ook als je het niet expres deed.',
                  'Je moet meewerken aan afspraken. Bijvoorbeeld naar een gesprek komen, of meedoen aan stappen om werk te vinden.',
                ] },
              { kop: 'Wat de klantmanager gaat vragen', type: 'lijst',
                items: [
                  'Hoe gaat het met je op dit moment?',
                  'Is er iets veranderd in je situatie? (wonen, gezin, geld, gezondheid)',
                  'Werk je, of doe je iets om werk te vinden?',
                  'Lukt het om rond te komen?',
                ] },
              { kop: 'Hoe je je voorbereidt', type: 'lijst',
                items: [
                  'Denk na of er iets veranderd is sinds de vorige keer. Twijfel je of iets belangrijk is? Vertel het toch — dat is altijd beter.',
                  'Neem mee: je identiteitsbewijs en je bankpas. Soms vraagt de gemeente bankafschriften — kijk in je uitnodigingsbrief of dat zo is.',
                  'Heb je een brief gekregen over dit gesprek? Neem die mee.',
                  'Heb je problemen (schulden, gezondheid, thuis)? Je mag die noemen. De gemeente kan soms helpen of rekening houden met je situatie.',
                ] },
              { kop: 'Wat jij mag zeggen of vragen', type: 'lijst',
                items: [
                  'Je mag zeggen: "ik begrijp het niet, kunt u het rustiger uitleggen?"',
                  'Je mag vragen: "wat betekent dit voor mijn uitkering?" en "wat moet ik nu doen?"',
                  'Begrijp je een afspraak niet? Vraag of de gemeente het op papier zet, zodat je het thuis rustig kunt nalezen.',
                  'Je mag iemand meenemen die je vertrouwt.',
                ] },
            ],
          },
        ],
      },

    ],
  },

  // ── Andere talen: zelfde structuur, zelfde id's. Later in te vullen. ──────
  // EN: { ui: {...}, categorieen: [...] },
  // AR: { ui: {...}, categorieen: [...] },  // rtl
  // TI: { ... }, UK: { ... }, FA: { ... }, RO: { ... }, PL: { ... }, TR: { ... }
};
