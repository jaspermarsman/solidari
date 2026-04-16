// NL
(function(){
var d = window._D18 = window._D18 || {};
d.NL = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Regel dit vóór de 18e verjaardag.</strong> Sommige toeslagen stoppen automatisch op de dag dat je kind 18 wordt. Als je niets doet, kun je geld mislopen of juist te veel ontvangen. Plan dit op tijd.' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'Kinderbijslag', samenvatting:'Stopt automatisch — niets te doen', badge:'STOPT', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Kinderbijslag stopt automatisch</strong> op de laatste dag van het kwartaal waarin je kind 18 wordt. Je hoeft dit niet zelf op te geven — de SVB regelt dit automatisch.<span class="stopt-chip">STOPT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'De SVB stuurt je een brief als de kinderbijslag stopt. Controleer of je adresgegevens kloppen bij de SVB.' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'Kindgebonden budget', samenvatting:'Stopt op 18e verjaardag — geef wijziging door', badge:'STOPT', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Kindgebonden budget stopt op de dag dat je kind 18 wordt.</strong> Het kindgebonden budget kan oplopen tot honderden euro\'s per maand.<span class="stopt-chip">STOPT</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Geef dit door aan de Belastingdienst</strong> via Mijn Toeslagen. Je ontvangt anders te veel toeslag en moet dit later terugbetalen.<span class="let-chip">LET OP</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Als je nog andere kinderen jonger dan 18 hebt, loopt het kindgebonden budget gewoon door voor die kinderen.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Geef de wijziging zo snel mogelijk door via <strong>Mijn Toeslagen</strong> op belastingdienst.nl om terugvordering te voorkomen.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ Wijziging doorgeven via Mijn Toeslagen' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'DigiD voor je kind', samenvatting:'Vraag dit ruim vóór de 18e aan', badge:'ACTIE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Je kind heeft vanaf 18 jaar een eigen DigiD nodig</strong> voor zorgtoeslag, belastingaangifte en alles met de overheid.<span class="nieuw-chip">ACTIE</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'DigiD aanvragen duurt 5 werkdagen. Vraag het aan via digid.nl. Je kind moet dit zelf doen — het is persoonsgebonden.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Zorg dat je kind ook een eigen e-mailadres en telefoonnummer heeft voor de DigiD-verificatie.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ DigiD aanvragen op digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Zorgverzekering regelen', samenvatting:'Vóór 18e afsluiten — anders boete', badge:'DEADLINE', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>Je kind valt niet meer onder jouw zorgverzekering</strong> zodra het 18 wordt. Het moet dan een eigen zorgverzekering hebben.<span class="stopt-chip">DEADLINE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Je kind heeft <strong>3 maanden</strong> na de 18e verjaardag om een zorgverzekering af te sluiten zonder boete. Maar het is verstandig dit vóór de 18e te regelen.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'Vanaf 18 jaar kan je kind <strong>zorgtoeslag</strong> aanvragen. In 2026: maximaal €154 per maand (inkomen tot €40.857).<span class="nieuw-chip">NIEUW</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Het eigen risico in 2026 is <strong>€165</strong>. Dit betaalt je kind zelf.' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>Zorgtoeslag aanvragen:</strong> Dit moet je kind zelf doen via Mijn Toeslagen (belastingdienst.nl). Zorg dat de DigiD klaar is.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Meer over zorgtoeslag op belastingdienst.nl' } },
      ],
      checklist:[
        { tekst:'DigiD aangevraagd voor je kind', sub:'Duurt 5 werkdagen — doe dit ruim op tijd' },
        { tekst:'Zorgverzekering geregeld voor je kind', sub:'Vóór of op de 18e verjaardag' },
        { tekst:'Zorgtoeslag aangevraagd (via kind\'s DigiD)', sub:'Kan al vóór de 18e, gaat in op de verjaardag' },
        { tekst:'Bankrekening op naam van je kind', sub:'Toeslagen worden uitbetaald op eigen rekening' },
        { tekst:'Wijziging kindgebonden budget doorgeven', sub:'Via Mijn Toeslagen zodra je kind 18 is' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Op de dag zelf verandert er al het een en ander.</strong> Je kind is nu officieel meerderjarig en heeft eigen rechten en plichten. Een aantal dingen stoppen automatisch, andere dingen moet je zelf regelen.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Meerderjarigheid & rechten', samenvatting:'Je kind is nu volwassen voor de wet', badge:'VANDAAG', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Vanaf vandaag is je kind volledig handelingsbekwaam.</strong> Hij/zij mag zelfstandig contracten afsluiten, stemmen en is zelf aansprakelijk.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Je kind mag zelf naar de dokter, tandarts of specialist en geeft zelf toestemming voor medische behandelingen.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Je kind kan nu ook zelf een <strong>rijbewijs</strong> aanvragen, alcohol kopen en een huurcontract op eigen naam afsluiten.' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'Toeslagen: wat stopt, wat begint', samenvatting:'Kinderbijslag en KGB stoppen — zorgtoeslag begint', badge:'WIJZIGING', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Kinderbijslag</strong> stopt op de laatste dag van het kwartaal.<span class="stopt-chip">STOPT</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Kindgebonden budget</strong> stopt op de verjaardag zelf.<span class="stopt-chip">STOPT</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Zorgtoeslag</strong> gaat in — als je kind dit al heeft aangevraagd. Nog niet gedaan? Doe dit vandaag nog.<span class="nieuw-chip">BEGINT</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Als je kind zelfstandig woont, kan het <strong>huurtoeslag</strong> op eigen naam aanvragen.<span class="nieuw-chip">BEGINT</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'Inburgering & verblijfsstatus', samenvatting:'Inburgeringsplicht geldt nu ook voor het kind', badge:'LET OP', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Als je kind ná 1 januari 2022 naar Nederland is gekomen</strong> en nog niet is ingeburgerd, geldt de inburgeringsplicht nu ook voor hem/haar.<span class="let-chip">LET OP</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Je kind moet zich zelf melden bij de gemeente. De inburgeringstermijn is 3 jaar vanaf de vergunning.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Als je kind al ingeburgerd is of een vrijstelling heeft, verandert er niets.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Tip:</strong> Gebruik de <a href="naturalisatie.html" style="color:var(--blauw)">Naturalisatie Checker</a> op Solidari om te zien wanneer je kind in aanmerking komt voor een Nederlands paspoort.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>In de weken en maanden ná de 18e verjaardag</strong> zijn er een aantal dingen die je kind zelf moet regelen. Jij kunt hierbij helpen, maar de aanvragen staan op naam van je kind.' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Bijstand — eigen recht', samenvatting:'Je kind heeft recht op eigen bijstandsuitkering', badge:'NIEUW RECHT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Vanaf 18 jaar heeft je kind een eigen recht op bijstand</strong> als het geen inkomen heeft en niet studeert. Los van jouw uitkering.<span class="nieuw-chip">NIEUW RECHT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Woont je kind nog bij jou thuis? Dan wordt de woonsituatie meegenomen in de berekening. Vraag de gemeente wat dit betekent.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Let op:</strong> Als je kind bij jou inwoont en bijstand aanvraagt, kan dit invloed hebben op jouw uitkering.<span class="let-chip">CONTROLEER</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Bijstand aanvragen via werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Studiefinanciering & OV', samenvatting:'Als je kind studeert of naar school gaat', badge:'MOGELIJK', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Studiefinanciering:</strong> Als je kind naar het mbo, hbo of universiteit gaat, kan het studiefinanciering aanvragen bij DUO.<span class="nieuw-chip">NIEUW</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>OV-studentenkaart:</strong> Studenten met DUO-inschrijving krijgen een OV-kaart voor gratis reizen in de daluren.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Studiefinanciering is een lening die later terugbetaald moet worden. Praat hier goed over met je kind.' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Studiefinanciering aanvragen via duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Zelfstandig wonen', samenvatting:'Huurtoeslag en inschrijving woningcorporatie', badge:'ADVIES', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Schrijf je kind in bij een woningbouwcorporatie</strong> zodra het 18 wordt. Wachtlijsten zijn lang — hoe eerder, hoe beter.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Als je kind zelfstandig woont met laag inkomen, kan het <strong>huurtoeslag aanvragen</strong>. Huurgrens 2026: €880,66 per maand.<span class="nieuw-chip">NIEUW</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Stemrecht & donorregistratie', samenvatting:'Twee nieuwe burgerrechten', badge:'NIEUW RECHT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Stemrecht:</strong> Je kind mag nu stemmen bij gemeentelijke, provinciale en nationale verkiezingen.<span class="nieuw-chip">NIEUW RECHT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Donorregistratie:</strong> Alle 18-jarigen worden automatisch geregistreerd als donor (tenzij bezwaar). Je kind ontvangt een brief en kan de keuze aanpassen via donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Donorkeuze aanpassen via donorregister.nl' } },
      ],
      checklist:[
        { tekst:'Zorgverzekering afgesloten en zorgtoeslag aangevraagd', sub:'Via Mijn Toeslagen' },
        { tekst:'Ingeschreven bij woningcorporatie', sub:'Begin vroeg — wachtlijsten zijn lang' },
        { tekst:'Donorkeuze doorgegeven', sub:'Via donorregister.nl' },
        { tekst:'Bijstand of studiefinanciering aangevraagd (indien nodig)', sub:'Afhankelijk van woonsituatie en studie' },
        { tekst:'Inburgeringsplicht gecontroleerd', sub:'Bij gemeente navragen als nog niet ingeburgerd' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Nog niet 18? Regel dit alvast vóór je verjaardag.</strong> Als je goed voorbereid bent, hoef je op je 18e niets te regelen.' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'DigiD aanvragen', samenvatting:'Verplicht voor bijna alles met de overheid', badge:'ACTIE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD is je digitale identiteitsbewijs</strong> voor de overheid. Nodig voor zorgtoeslag, belastingaangifte, DUO en meer.<span class="nieuw-chip">REGEL DIT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Je kunt DigiD al aanvragen vóór je 18e via digid.nl — activeren duurt 5 werkdagen.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Je hebt een eigen e-mailadres en telefoonnummer nodig. Gebruik niet het e-mailadres van je ouders.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ DigiD aanvragen op digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Eigen zorgverzekering regelen', samenvatting:'Je valt niet meer onder de verzekering van je ouders', badge:'VERPLICHT', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>Op je 18e ben je niet meer meeverzekerd bij je ouders.</strong> Sluit een eigen verzekering af vóór of op je verjaardag.<span class="stopt-chip">VERPLICHT</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Je hebt 3 maanden na je verjaardag om een verzekering af te sluiten zonder boete. Maar wacht niet te lang.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>Zorgtoeslag aanvragen!</strong> Bij laag inkomen tot maximaal €154 per maand (2026). Via Mijn Toeslagen met jouw DigiD.<span class="nieuw-chip">GELD</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ Vraag zorgtoeslag aan via <strong>belastingdienst.nl/toeslagen</strong>. Kan al vóór je 18e — gaat in op je verjaardag.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Meer over zorgtoeslag' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Eigen bankrekening & spaarrekening', samenvatting:'Toeslagen worden uitbetaald op jouw eigen rekening', badge:'ADVIES', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Zorg voor een bankrekening op jouw eigen naam.</strong> Alle toeslagen worden uitbetaald op jóuw rekening.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Je kunt bij de meeste banken al voor je 18e een betaalrekening openen. Vraag dit na.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Open ook een spaarrekening</strong> als buffer voor onverwachte kosten — het eigen risico is €165 in 2026.' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'DigiD aangevraagd en geactiveerd', sub:'Vraag dit ruim van tevoren aan' },
        { tekst:'Zorgverzekering geregeld', sub:'Afsluiten vóór of op je 18e verjaardag' },
        { tekst:'Zorgtoeslag aangevraagd', sub:'Via Mijn Toeslagen met je DigiD' },
        { tekst:'Bankrekening op eigen naam', sub:'Nodig voor toeslaguitbetalingen' },
        { tekst:'Spaarrekening geopend', sub:'Buffer voor eigen risico en onverwachte kosten' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Gefeliciteerd — je bent officieel 18!</strong> Je bent nu volwassen voor de wet en hebt nieuwe rechten én plichten.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Jij bent nu zelfstandig', samenvatting:'Volwassen voor de wet — eigen rechten en verantwoordelijkheid', badge:'VANDAAG', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Je mag alles zelfstandig regelen</strong> — contracten, stemmen, medische beslissingen, rijbewijs aanvragen.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Je bent nu zelf <strong>aansprakelijk</strong> voor wat je doet. Schulden die je maakt, zijn jóuw schulden.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Let op schulden:</strong> Nu je 18 bent, kun je makkelijker iets op afbetaling kopen of lenen. Schulden stapelen zich snel op.<span class="let-chip">WEES VOORZICHTIG</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Stemrecht & donorregistratie', samenvatting:'Twee nieuwe rechten die vandaag ingaan', badge:'NIEUW', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Stemrecht:</strong> Je mag nu stemmen! Bij de volgende verkiezing ontvang je een oproepkaart.<span class="nieuw-chip">NIEUW RECHT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Donorregistratie:</strong> Je staat automatisch geregistreerd als donor tenzij je bezwaar maakt. Kies bewust via donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Donorkeuze vastleggen via donorregister.nl' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'Inburgering — check dit', samenvatting:'Geldt de inburgeringsplicht voor jou?', badge:'CHECK', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Als je ná 1 januari 2022 naar Nederland bent gekomen</strong> en nog niet bent ingeburgerd, geldt de inburgeringsplicht nu ook voor jou.<span class="let-chip">CHECK</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Ben je al bezig met inburgering? Dan loopt dat gewoon door.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Tip:</strong> Gebruik de gratis <a href="naturalisatie.html" style="color:var(--blauw)">Naturalisatie Checker</a> op Solidari om te zien wanneer jij in aanmerking komt voor een Nederlands paspoort.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>Nu je 18 bent, heb je nieuwe rechten.</strong> Sommige dingen moet je zelf aanvragen — ze komen niet automatisch.' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'Bijstand aanvragen', samenvatting:'Als je geen inkomen hebt en niet studeert', badge:'RECHT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Je hebt recht op bijstand (Participatiewet)</strong> als je geen inkomen hebt, niet studeert en in Nederland woont. Los van je ouders.<span class="nieuw-chip">RECHT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Woon je nog bij je ouders? Dan wordt de woonsituatie meegenomen. Ga langs bij de gemeente.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Inburgering en bijstand:</strong> Als je een inburgeringsplicht hebt, moet je actief meewerken om bijstand te houden.<span class="let-chip">VOORWAARDE</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Bijstand aanvragen via werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Studie & DUO', samenvatting:'Studiefinanciering en OV-kaart aanvragen', badge:'MOGELIJK', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Ga je studeren?</strong> Vraag studiefinanciering aan bij DUO (basislening + eventueel aanvullende beurs).<span class="nieuw-chip">NIEUW</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>OV-studentenkaart</strong> geeft gratis reizen in de daluren.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Studiefinanciering is een <strong>lening</strong> die je later terugbetaalt. Leen alleen wat je echt nodig hebt.<span class="let-chip">LENING</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Studiefinanciering aanvragen via duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Wonen & huurtoeslag', samenvatting:'Inschrijven voor sociale huurwoning', badge:'ADVIES', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Schrijf je nu in bij een woningcorporatie.</strong> Wachtlijsten zijn lang — soms 5 tot 10 jaar.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Bij laag inkomen en zelfstandig wonen kun je <strong>huurtoeslag aanvragen</strong>. Huurgrens 2026: €880,66.<span class="nieuw-chip">GELD</span>' },
          ], extern:null },
        { icoon:'📊', kleur:'#EBF3EE', naam:'Belastingaangifte', samenvatting:'Elk jaar in maart/april', badge:'JAARLIJKS', badgeKleur:'let',
          punten:[
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Elk jaar doe je belastingaangifte</strong> als je inkomen hebt. Met DigiD via Mijn Belastingdienst.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Als je weinig hebt verdiend, krijg je soms geld terug. Doe dus altijd aangifte.' },
          ], extern:{ url:'https://www.belastingdienst.nl', tekst:'→ Belastingaangifte via belastingdienst.nl' } },
        { icoon:'🚗', kleur:'#F5F3FF', naam:'Rijbewijs', samenvatting:'Mag nu rijles nemen en rijbewijs halen', badge:'NIEUW RECHT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Vanaf 18 jaar mag je zelfstandig rijexamen doen</strong> en een rijbewijs halen. Je hebt geen begeleider meer nodig.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Had je al een 2toDrive rijbewijs? Dan kun je nu gewoon alleen rijden.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Een rijbewijs halen kost geld</strong> — gemiddeld €1.500 tot €2.500.<span class="let-chip">KOSTEN</span>' },
          ], extern:{ url:'https://www.cbr.nl', tekst:'→ Meer over rijbewijs en examen via cbr.nl' } },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'Jeugdhulp stopt — volwassenzorg begint', samenvatting:'Had je begeleiding? Check wat er verandert', badge:'CHECK', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Jeugdhulp stopt als je 18 wordt.</strong> Overleg vóór je verjaardag met je begeleider wat daarna beschikbaar is.<span class="let-chip">BELANGRIJK</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'In sommige gevallen kun je jeugdhulp laten doorlopen tot je 23e (verlengde jeugdhulp). Vraag dit tijdig aan bij de gemeente.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Hulp voor volwassenen via: huisarts, WMO (gemeente), GGZ of maatschappelijk werk. Het JIP kan je helpen.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Ga <strong>vóór je 18e</strong> in gesprek met je begeleider of de gemeente. Wacht niet tot je verjaardag.' },
          extern:null },
      ],
      checklist:[
        { tekst:'Ingeschreven bij woningcorporatie', sub:'Doe dit zo snel mogelijk — wachtlijsten zijn lang' },
        { tekst:'Donorkeuze doorgegeven', sub:'Via donorregister.nl' },
        { tekst:'Bijstand of studiefinanciering aangevraagd (indien nodig)', sub:'Afhankelijk van woonsituatie en plannen' },
        { tekst:'Inburgering gecontroleerd bij gemeente', sub:'Als je nog niet bent ingeburgerd' },
        { tekst:'Belastingaangifte onthouden voor volgend jaar', sub:'Elk jaar in maart via belastingdienst.nl' },
        { tekst:'Jeugdhulp / begeleiding besproken met gemeente', sub:'Als je hulp ontving — check wat daarna beschikbaar is' },
      ],
    },
  },
};
})();
// EN
(function(){
var d = window._D18 = window._D18 || {};
d.EN = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Arrange this before the 18th birthday.</strong> Some benefits stop automatically the day your child turns 18. If you do nothing, you may miss out on money or receive too much and have to repay it. Plan ahead.' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'Child benefit (Kinderbijslag)', samenvatting:'Stops automatically — nothing to do', badge:'STOPS', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Child benefit stops automatically</strong> on the last day of the quarter in which your child turns 18. You do not need to notify anyone — the SVB handles this.<span class="stopt-chip">STOPS</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'The SVB will send you a letter when child benefit stops. Make sure your address is up to date with them.' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'Child-related benefit (Kindgebonden budget)', samenvatting:'Stops on 18th birthday — report the change', badge:'STOPS', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>The child-related benefit stops on the day your child turns 18.</strong> This can amount to hundreds of euros per month.<span class="stopt-chip">STOPS</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Report this to the Tax Authority</strong> via Mijn Toeslagen. Otherwise you will receive too much and have to repay it.<span class="let-chip">ATTENTION</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'If you still have other children under 18, the benefit continues for them.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Report the change as soon as possible via <strong>Mijn Toeslagen</strong> at belastingdienst.nl to avoid a repayment demand.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ Report a change via Mijn Toeslagen' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'DigiD for your child', samenvatting:'Apply well before the 18th birthday', badge:'ACTION', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>From age 18 your child needs their own DigiD</strong> for healthcare benefit, tax returns and all dealings with the government.<span class="nieuw-chip">ACTION</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Applying for DigiD takes 5 working days. Apply at digid.nl. Your child must do this themselves.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Make sure your child has their own email address and phone number for DigiD verification.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ Apply for DigiD at digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Arranging health insurance', samenvatting:'Take out before 18th — or face a fine', badge:'DEADLINE', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>Your child is no longer covered by your health insurance</strong> once they turn 18. They must have their own policy.<span class="stopt-chip">DEADLINE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Your child has <strong>3 months</strong> after their 18th to take out insurance without a fine. But it is wise to arrange this before.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'From age 18 your child can apply for <strong>healthcare benefit (zorgtoeslag)</strong>. In 2026: up to €154/month (income up to €40,857).<span class="nieuw-chip">NEW</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'The mandatory excess (eigen risico) in 2026 is <strong>€165</strong>. Your child pays this themselves.' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>Applying for healthcare benefit:</strong> Your child must do this via Mijn Toeslagen (belastingdienst.nl). Make sure DigiD is ready.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ More about healthcare benefit at belastingdienst.nl' } },
      ],
      checklist:[
        { tekst:'DigiD applied for your child', sub:'Takes 5 working days — do this well in advance' },
        { tekst:'Health insurance arranged for your child', sub:'Before or on the 18th birthday' },
        { tekst:'Healthcare benefit applied for (via child\'s DigiD)', sub:'Can be applied for before the 18th, starts on birthday' },
        { tekst:'Bank account in child\'s own name', sub:'Benefits are paid to their own account' },
        { tekst:'Child-related benefit change reported', sub:'Via Mijn Toeslagen once your child turns 18' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>On the day itself several things change immediately.</strong> Your child is now officially an adult with their own rights and responsibilities. Some things stop automatically, others you need to arrange.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Adulthood & rights', samenvatting:'Your child is now an adult under the law', badge:'TODAY', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>From today your child has full legal capacity.</strong> They can sign contracts independently, vote, and are personally liable.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Your child can now visit a doctor or specialist on their own and give consent for medical treatment.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Your child can now also apply for a <strong>driving licence</strong>, purchase alcohol and sign a rental contract in their own name.' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'Benefits: what stops, what starts', samenvatting:'Child benefits stop — healthcare benefit starts', badge:'CHANGE', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Child benefit</strong> stops on the last day of the quarter.<span class="stopt-chip">STOPS</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Child-related benefit</strong> stops on the birthday itself.<span class="stopt-chip">STOPS</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Healthcare benefit</strong> starts — if your child has already applied. Not done yet? Do it today.<span class="nieuw-chip">STARTS</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'If your child lives independently, they can apply for <strong>housing benefit</strong> in their own name.<span class="nieuw-chip">STARTS</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'Integration & residence status', samenvatting:'Integration obligation now also applies to the child', badge:'ATTENTION', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>If your child came to the Netherlands after 1 January 2022</strong> and has not yet integrated, the integration obligation now applies to them too.<span class="let-chip">ATTENTION</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Your child must register with the municipality. The integration period is 3 years from the date of the residence permit.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'If your child has already integrated or has an exemption, nothing changes.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Tip:</strong> Use the <a href="naturalisatie.html" style="color:var(--blauw)">Naturalisation Checker</a> on Solidari to see when your child may be eligible for a Dutch passport.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>In the weeks and months after the 18th birthday</strong> there are things your child needs to arrange themselves. You can help, but the applications are in your child\'s name.' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Social assistance — own right', samenvatting:'Your child is entitled to their own social assistance', badge:'NEW RIGHT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>From age 18 your child has their own right to social assistance</strong> if they have no income and are not studying. Separate from your own benefit.<span class="nieuw-chip">NEW RIGHT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Is your child still living with you? The living situation is taken into account. Ask the municipality what this means for you.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Important:</strong> If your child lives with you and applies for social assistance, this may affect your own benefit. Check before they apply.<span class="let-chip">CHECK</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Apply for social assistance at werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Student finance & OV card', samenvatting:'If your child is studying', badge:'POSSIBLE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Student finance:</strong> If your child goes to MBO, HBO or university, they can apply at DUO for a basic loan and possibly a supplementary grant.<span class="nieuw-chip">NEW</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>OV student card:</strong> Students registered with DUO receive a travel card for free off-peak travel.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Student finance is a loan that must be repaid later. Discuss this carefully with your child.' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Apply for student finance at duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Living independently', samenvatting:'Housing benefit and registering with housing association', badge:'ADVICE', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Register your child with a housing association</strong> as soon as they turn 18. Waiting lists are long — the earlier the better.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'If your child lives independently with low income, they can apply for <strong>housing benefit</strong>. Rent limit 2026: €880.66/month.<span class="nieuw-chip">NEW</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Voting rights & donor registration', samenvatting:'Two new civic rights', badge:'NEW RIGHT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Voting rights:</strong> Your child may now vote in local, provincial and national elections.<span class="nieuw-chip">NEW RIGHT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Donor registration:</strong> All 18-year-olds are automatically registered as donors (unless they object). Your child will receive a letter and can update their choice at donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Update donor preference at donorregister.nl' } },
      ],
      checklist:[
        { tekst:'Health insurance and healthcare benefit arranged', sub:'Via Mijn Toeslagen' },
        { tekst:'Registered with housing association', sub:'Start early — waiting lists are long' },
        { tekst:'Donor preference submitted', sub:'Via donorregister.nl' },
        { tekst:'Social assistance or student finance applied for (if needed)', sub:'Depending on living situation and studies' },
        { tekst:'Integration obligation checked', sub:'Ask the municipality if not yet integrated' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Not yet 18? Arrange these things before your birthday.</strong> If you are well prepared, you will not need to scramble on your 18th.' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'Apply for DigiD', samenvatting:'Required for almost everything with the government', badge:'ACTION', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD is your digital identity</strong> for the government. You need it for healthcare benefit, tax returns, DUO and more.<span class="nieuw-chip">DO THIS</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'You can apply for DigiD before you turn 18. Apply at digid.nl — activation takes 5 working days.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'You need your own email address and phone number. Do not use your parents\' email.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ Apply for DigiD at digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Arrange your own health insurance', samenvatting:'No longer covered by your parents\' insurance', badge:'REQUIRED', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>On your 18th you are no longer covered by your parents\' health insurance.</strong> Take out your own policy before or on your birthday.<span class="stopt-chip">REQUIRED</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'You have 3 months after your birthday to take out insurance without a fine. But do not leave it too long.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>Apply for healthcare benefit!</strong> Up to €154/month if you have a low income (2026). Apply via Mijn Toeslagen with your DigiD.<span class="nieuw-chip">MONEY</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ Apply at <strong>belastingdienst.nl/toeslagen</strong>. You can apply before you turn 18 — benefit starts on your birthday.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ More about healthcare benefit' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Own bank account & savings account', samenvatting:'Benefits are paid into your own account', badge:'ADVICE', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Make sure you have a bank account in your own name.</strong> All benefits you apply for are paid into your account.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Most banks let you open a current account before you turn 18. Ask your bank.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Open a savings account too</strong> as a buffer — the mandatory excess on health insurance is €165 in 2026.' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'DigiD applied for and activated', sub:'Apply well in advance' },
        { tekst:'Health insurance arranged', sub:'Take out before or on your 18th birthday' },
        { tekst:'Healthcare benefit applied for', sub:'Via Mijn Toeslagen with your DigiD' },
        { tekst:'Bank account in own name', sub:'Required for benefit payments' },
        { tekst:'Savings account opened', sub:'Buffer for mandatory excess and unexpected costs' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Congratulations — you are officially 18!</strong> You are now an adult under the law and have new rights and responsibilities.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'You are now independent', samenvatting:'An adult under the law — your own rights and responsibilities', badge:'TODAY', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>You can now arrange everything independently</strong> — sign contracts, vote, make medical decisions, apply for a driving licence.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'You are now personally <strong>liable</strong> for your actions. Debts you incur are your own.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Watch out for debt:</strong> Now you are 18, it is easier to buy on credit or borrow. Debt can build up fast.<span class="let-chip">BE CAREFUL</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Voting rights & donor registration', samenvatting:'Two new rights that take effect today', badge:'NEW', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Voting rights:</strong> You can now vote! At the next election you will automatically receive a polling card.<span class="nieuw-chip">NEW RIGHT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Donor registration:</strong> You will be automatically registered as a donor unless you object. Choose consciously at donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Record donor preference at donorregister.nl' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'Integration — check this', samenvatting:'Does the integration obligation apply to you?', badge:'CHECK', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>If you came to the Netherlands after 1 January 2022</strong> and have not yet integrated, the obligation now applies to you.<span class="let-chip">CHECK</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Already working on integration? Then it simply continues.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Tip:</strong> Use the free <a href="naturalisatie.html" style="color:var(--blauw)">Naturalisation Checker</a> on Solidari to see when you may be eligible for a Dutch passport.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>Now that you are 18, you have new rights.</strong> Some things you need to apply for yourself — they do not come automatically.' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'Apply for social assistance', samenvatting:'If you have no income and are not studying', badge:'RIGHT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>You have the right to social assistance (Participatiewet)</strong> if you have no income, are not studying and live in the Netherlands.<span class="nieuw-chip">RIGHT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Still living with your parents? Your living situation is taken into account. Visit the municipality for information.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Integration and social assistance:</strong> If you have an integration obligation, you must actively participate to keep your benefit.<span class="let-chip">CONDITION</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Apply for social assistance at werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Study & DUO', samenvatting:'Apply for student finance and OV card', badge:'POSSIBLE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Going to study?</strong> Apply for student finance at DUO (basic loan + possible supplementary grant).<span class="nieuw-chip">NEW</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>OV student card</strong> gives free off-peak travel.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Student finance is a <strong>loan</strong> you must repay later. Only borrow what you really need.<span class="let-chip">LOAN</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Apply for student finance at duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Housing & housing benefit', samenvatting:'Register for a social housing property', badge:'ADVICE', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Register with a housing association now.</strong> Waiting lists are long — sometimes 5 to 10 years.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'With low income and living independently you can apply for <strong>housing benefit</strong>. Rent limit 2026: €880.66.<span class="nieuw-chip">MONEY</span>' },
          ], extern:null },
        { icoon:'📊', kleur:'#EBF3EE', naam:'Tax return', samenvatting:'Every year in March/April', badge:'ANNUAL', badgeKleur:'let',
          punten:[
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Every year you file a tax return</strong> if you have income. Use your DigiD via Mijn Belastingdienst.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'If you earned little, you sometimes get money back. Always file — it can be worth it.' },
          ], extern:{ url:'https://www.belastingdienst.nl', tekst:'→ Tax return at belastingdienst.nl' } },
        { icoon:'🚗', kleur:'#F5F3FF', naam:'Driving licence', samenvatting:'Can now take lessons and get a licence', badge:'NEW RIGHT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>From age 18 you can take your driving test independently.</strong> No accompanying driver needed.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Did you already have a supervised driving (2toDrive) licence? Then you can now drive alone.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Getting a driving licence costs money</strong> — average course €1,500 to €2,500.<span class="let-chip">COSTS</span>' },
          ], extern:{ url:'https://www.cbr.nl', tekst:'→ More about driving licences at cbr.nl' } },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'Youth support ends — adult care begins', samenvatting:'Did you receive support or youth care? Check what changes', badge:'CHECK', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Youth support stops when you turn 18.</strong> Speak with your support worker before your birthday about what is available afterwards.<span class="let-chip">IMPORTANT</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'In some cases youth support can be extended until age 23 (extended youth care). Apply in time at the municipality.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Adult support runs through: GP, WMO (municipality), mental health care or social work. The JIP (Youth Information Point) can help.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Have a conversation with your support worker or municipality <strong>before you turn 18</strong>. Do not wait until your birthday.' },
          extern:null },
      ],
      checklist:[
        { tekst:'Registered with housing association', sub:'Do this as soon as possible — waiting lists are long' },
        { tekst:'Donor preference submitted', sub:'Via donorregister.nl' },
        { tekst:'Social assistance or student finance applied for (if needed)', sub:'Depending on living situation and plans' },
        { tekst:'Integration obligation checked at municipality', sub:'If not yet integrated' },
        { tekst:'Tax return noted for next year', sub:'Every year in March at belastingdienst.nl' },
        { tekst:'Youth support discussed with municipality', sub:'If you received support — check what is available afterwards' },
      ],
    },
  },
};
})();
// AR
(function(){
var d = window._D18 = window._D18 || {};
d.AR = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>رتّب هذه الأمور قبل عيد الميلاد الـ18.</strong> بعض الإعانات تتوقف تلقائياً في اليوم الذي يبلغ فيه طفلك 18 عاماً. إذا لم تفعل شيئاً قد تفوتك أموال أو تتلقى مبالغ زائدة يجب إعادتها. خطّط مسبقاً.' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'علاوة الأطفال (Kinderbijslag)', samenvatting:'تتوقف تلقائياً — لا يلزم فعل شيء', badge:'تتوقف', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>تتوقف علاوة الأطفال تلقائياً</strong> في آخر يوم من الربع الذي يبلغ فيه طفلك 18. لا تحتاج إلى إخطار أي جهة — SVB يتولى ذلك.<span class="stopt-chip">تتوقف</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'ستُرسل SVB إليك رسالة عند توقف العلاوة. تأكد من صحة بيانات عنوانك.' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'الإعانة المرتبطة بالأطفال (Kindgebonden budget)', samenvatting:'تتوقف في يوم الميلاد الـ18 — أبلغ عن التغيير', badge:'تتوقف', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>تتوقف الإعانة المرتبطة بالأطفال في يوم بلوغ طفلك 18.</strong> وهذا تغيير كبير — قد تبلغ الإعانة مئات اليوروهات شهرياً.<span class="stopt-chip">تتوقف</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>أبلغ مصلحة الضرائب</strong> عبر Mijn Toeslagen. وإلا ستتلقى مبالغ زائدة يجب إعادتها.<span class="let-chip">تنبيه</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'إذا كان لديك أطفال آخرون دون 18، تستمر الإعانة بالنسبة لهم.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ أبلغ عن التغيير في أقرب وقت عبر <strong>Mijn Toeslagen</strong> على belastingdienst.nl لتجنب طلب الاسترداد.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ الإبلاغ عن تغيير عبر Mijn Toeslagen' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'DigiD لطفلك', samenvatting:'قدّم الطلب قبل الميلاد الـ18 بفترة كافية', badge:'إجراء', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>يحتاج طفلك من سن 18 إلى DigiD خاص به</strong> لإعانة الرعاية الصحية والضرائب وكل التعاملات مع الحكومة.<span class="nieuw-chip">إجراء</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'تستغرق عملية طلب DigiD 5 أيام عمل. قدّم الطلب على digid.nl. يجب على طفلك القيام بذلك بنفسه.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'تأكد من امتلاك طفلك لبريد إلكتروني ورقم هاتف خاصَّين للتحقق من هوية DigiD.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ طلب DigiD على digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'ترتيب التأمين الصحي', samenvatting:'يجب الاشتراك قبل الـ18 — وإلا غرامة', badge:'موعد نهائي', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>لن يكون طفلك مشمولاً بتأمينك الصحي</strong> بمجرد بلوغه 18. يجب أن يكون لديه تأمين خاص.<span class="stopt-chip">موعد نهائي</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'لدى طفلك <strong>3 أشهر</strong> بعد عيد ميلاده للاشتراك دون غرامة. لكن يُستحسن ترتيب ذلك قبل الـ18.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'من سن 18 يمكن لطفلك طلب <strong>إعانة الرعاية الصحية (zorgtoeslag)</strong>. في 2026: حتى 154 يورو شهرياً.<span class="nieuw-chip">جديد</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'التحمّل الإلزامي في 2026 هو <strong>165 يورو</strong>. يدفعه طفلك بنفسه. نبّهه حتى لا يكون ذلك مفاجأة.' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>طلب إعانة الرعاية الصحية:</strong> يجب على طفلك القيام بذلك عبر Mijn Toeslagen. تأكد من جاهزية DigiD.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ المزيد عن إعانة الرعاية الصحية' } },
      ],
      checklist:[
        { tekst:'تم تقديم طلب DigiD لطفلك', sub:'يستغرق 5 أيام عمل — تصرّف مبكراً' },
        { tekst:'تم ترتيب التأمين الصحي لطفلك', sub:'قبل يوم الميلاد الـ18 أو في نفس اليوم' },
        { tekst:'تم تقديم طلب إعانة الرعاية الصحية (عبر DigiD طفلك)', sub:'يمكن التقديم قبل الـ18، تبدأ في يوم الميلاد' },
        { tekst:'حساب بنكي باسم طفلك', sub:'تُدفع الإعانات إلى حسابه الخاص' },
        { tekst:'الإبلاغ عن تغيير الإعانة المرتبطة بالأطفال', sub:'عبر Mijn Toeslagen فور بلوغ طفلك 18' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>في يوم الميلاد نفسه تتغير عدة أشياء فوراً.</strong> أصبح طفلك الآن بالغاً رسمياً وله حقوق ومسؤوليات خاصة.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'البلوغ والحقوق القانونية', samenvatting:'طفلك الآن بالغ أمام القانون', badge:'اليوم', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>من اليوم يتمتع طفلك بأهلية قانونية كاملة.</strong> يمكنه إبرام العقود والتصويت وهو مسؤول شخصياً عن تصرفاته.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'يمكن لطفلك الذهاب إلى الطبيب بمفرده وإعطاء موافقته على العلاج الطبي.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'يمكن لطفلك الآن استخراج <strong>رخصة قيادة</strong> وشراء الكحول وإبرام عقد إيجار باسمه.' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'الإعانات: ما يتوقف وما يبدأ', samenvatting:'علاوة الأطفال تتوقف — إعانة الرعاية تبدأ', badge:'تغيير', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>علاوة الأطفال</strong> تتوقف في آخر يوم من الربع.<span class="stopt-chip">تتوقف</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>الإعانة المرتبطة بالأطفال</strong> تتوقف في يوم الميلاد نفسه.<span class="stopt-chip">تتوقف</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>إعانة الرعاية الصحية</strong> تبدأ — إذا كان طفلك قد قدّم الطلب. لم يتم؟ افعل ذلك اليوم.<span class="nieuw-chip">تبدأ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'إذا كان طفلك يعيش باستقلالية يمكنه طلب <strong>إعانة السكن</strong>.<span class="nieuw-chip">تبدأ</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'الاندماج ووضع الإقامة', samenvatting:'التزام الاندماج ينطبق الآن على الطفل أيضاً', badge:'تنبيه', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>إذا جاء طفلك إلى هولندا بعد 1 يناير 2022</strong> ولم يندمج بعد، ينطبق عليه التزام الاندماج الآن. ستتواصل معه البلدية.<span class="let-chip">تنبيه</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'يجب على طفلك التسجيل في البلدية. مدة الاندماج 3 سنوات من تاريخ تصريح الإقامة.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'إذا كان طفلك قد اندمج بالفعل أو لديه إعفاء، فلا يتغير شيء.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>نصيحة:</strong> استخدم <a href="naturalisatie.html" style="color:var(--blauw)">فاحص التجنيس</a> على Solidari لمعرفة متى يمكن لطفلك الحصول على جواز سفر هولندي.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>في الأسابيع والأشهر التالية لعيد الميلاد الـ18</strong> هناك أمور يجب على طفلك ترتيبها بنفسه.' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'المساعدة الاجتماعية — حق خاص', samenvatting:'لطفلك الحق في معونة اجتماعية خاصة', badge:'حق جديد', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>من سن 18 لطفلك الحق في المساعدة الاجتماعية</strong> إذا لم يكن لديه دخل ولا يدرس. هذا حق فردي مستقل عن معونتك.<span class="nieuw-chip">حق جديد</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'لا يزال طفلك يعيش معك؟ يُؤخذ وضع السكن في الاعتبار. استفسر من البلدية.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>تنبيه:</strong> إذا كان طفلك يعيش معك وقدّم طلب مساعدة اجتماعية، فقد يؤثر ذلك على معونتك.<span class="let-chip">تحقق</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ تقديم طلب مساعدة اجتماعية عبر werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'الدراسة وDUO', samenvatting:'طلب التمويل الدراسي وبطاقة النقل العام', badge:'ممكن', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>التمويل الدراسي:</strong> إذا كان طفلك يدرس في MBO أو HBO أو الجامعة يمكنه طلب التمويل الدراسي من DUO.<span class="nieuw-chip">جديد</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>بطاقة OV للطلاب:</strong> الطلاب المسجلون في DUO يحصلون على بطاقة سفر مجاني.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'التمويل الدراسي قرض يجب سداده لاحقاً. ناقش هذا الأمر بصراحة مع طفلك.' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ طلب التمويل الدراسي عبر duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'الاستقلال في السكن', samenvatting:'إعانة السكن والتسجيل في شركة الإسكان', badge:'نصيحة', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>سجّل طفلك في شركة الإسكان الاجتماعي</strong> فور بلوغه 18. قوائم الانتظار طويلة — كلما بكّرت كان أفضل.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'إذا كان طفلك يعيش باستقلالية وذو دخل منخفض يمكنه طلب <strong>إعانة السكن</strong>. حد الإيجار 2026: 880.66 يورو شهرياً.<span class="nieuw-chip">جديد</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'حق التصويت وتسجيل التبرع بالأعضاء', samenvatting:'حقان مدنيان جديدان', badge:'حق جديد', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>حق التصويت:</strong> يحق لطفلك الآن التصويت في الانتخابات المحلية والإقليمية والوطنية.<span class="nieuw-chip">حق جديد</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>تسجيل التبرع بالأعضاء:</strong> يُسجَّل جميع من بلغوا 18 تلقائياً كمتبرعين. سيتلقى طفلك رسالة ويمكنه تعديل اختياره عبر donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ تعديل تفضيل التبرع عبر donorregister.nl' } },
      ],
      checklist:[
        { tekst:'اكتمال التأمين الصحي وتقديم طلب إعانة الرعاية', sub:'عبر Mijn Toeslagen' },
        { tekst:'التسجيل في شركة الإسكان', sub:'ابدأ مبكراً — قوائم الانتظار طويلة' },
        { tekst:'تقديم تفضيل التبرع', sub:'عبر donorregister.nl' },
        { tekst:'تقديم طلب مساعدة اجتماعية أو تمويل دراسي (إن لزم)', sub:'حسب وضع السكن والدراسة' },
        { tekst:'التحقق من التزام الاندماج', sub:'راجع البلدية إذا لم يتم الاندماج' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>لم تبلغ 18 بعد؟ رتّب هذه الأمور قبل عيد ميلادك.</strong> إذا كنت مستعداً جيداً لن تضطر إلى ترتيب أي شيء في يوم ميلادك الـ18.' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'تقديم طلب DigiD', samenvatting:'ضروري لكل تعامل مع الحكومة تقريباً', badge:'إجراء', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD هويتك الرقمية</strong> أمام الحكومة. تحتاجه لإعانة الرعاية الصحية والضرائب والتسجيل في DUO وغير ذلك.<span class="nieuw-chip">افعل هذا</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'يمكنك تقديم طلب DigiD قبل بلوغك 18. قدّم الطلب على digid.nl — يستغرق التفعيل 5 أيام عمل.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'تحتاج إلى بريد إلكتروني ورقم هاتف خاصَّين بك. لا تستخدم بريد والديك.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ طلب DigiD على digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'ترتيب تأمينك الصحي الخاص', samenvatting:'لن تكون مشمولاً بتأمين والديك', badge:'إلزامي', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>في يوم ميلادك الـ18 لن تكون مشمولاً بتأمين والديك.</strong> يجب أن تكون لديك وثيقة تأمين خاصة بك قبل عيد ميلادك أو في نفس اليوم.<span class="stopt-chip">إلزامي</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'لديك 3 أشهر بعد عيد ميلادك للاشتراك دون غرامة. لكن لا تتأخر.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>قدّم طلب إعانة الرعاية الصحية!</strong> عند دخل منخفض حتى 154 يورو شهرياً (2026). عبر Mijn Toeslagen بـ DigiD الخاص بك.<span class="nieuw-chip">مال</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ قدّم الطلب على <strong>belastingdienst.nl/toeslagen</strong>. يمكنك التقديم قبل بلوغ 18 — تبدأ الإعانة في يوم ميلادك.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ المزيد عن إعانة الرعاية الصحية' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'حساب بنكي وحساب توفير', samenvatting:'تُدفع الإعانات إلى حسابك الخاص', badge:'نصيحة', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>احرص على وجود حساب بنكي باسمك.</strong> جميع الإعانات التي تطلبها تُدفع إلى حسابك أنت.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'معظم البنوك تسمح بفتح حساب قبل بلوغ 18. استفسر من بنكك.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>افتح أيضاً حساب توفير</strong> كاحتياطي — التحمّل الإلزامي للتأمين الصحي 165 يورو في 2026.' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'تم تقديم طلب DigiD وتفعيله', sub:'قدّم الطلب مبكراً' },
        { tekst:'تم ترتيب التأمين الصحي', sub:'قبل عيد الميلاد الـ18 أو في نفس اليوم' },
        { tekst:'تم تقديم طلب إعانة الرعاية الصحية', sub:'عبر Mijn Toeslagen بـ DigiD الخاص بك' },
        { tekst:'حساب بنكي باسمك الخاص', sub:'ضروري لاستلام الإعانات' },
        { tekst:'تم فتح حساب توفير', sub:'احتياطي للتحمّل الإلزامي والمصاريف غير المتوقعة' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>مبروك — أصبحت رسمياً في الـ18!</strong> أنت الآن بالغ أمام القانون ولديك حقوق ومسؤوليات جديدة.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'أنت الآن مستقل', samenvatting:'بالغ أمام القانون — حقوق ومسؤوليات', badge:'اليوم', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>يمكنك الآن ترتيب كل شيء باستقلالية</strong> — إبرام العقود والتصويت واتخاذ القرارات الطبية وطلب رخصة القيادة.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'أنت الآن <strong>مسؤول</strong> شخصياً عن تصرفاتك. الديون التي تتراكم عليك هي ديونك.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>احذر من الديون:</strong> الآن يمكنك بسهولة أكبر الشراء بالتقسيط أو الاقتراض. الديون تتراكم بسرعة.<span class="let-chip">كن حذراً</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'حق التصويت وتسجيل التبرع', samenvatting:'حقان جديدان يبدآن اليوم', badge:'جديد', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>حق التصويت:</strong> يمكنك الآن التصويت! في الانتخابات القادمة ستتلقى بطاقة اقتراع على عنوانك.<span class="nieuw-chip">حق جديد</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>تسجيل التبرع:</strong> ستُسجَّل تلقائياً كمتبرع ما لم تعترض. اختر بوعي عبر donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ تسجيل تفضيل التبرع عبر donorregister.nl' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'الاندماج — تحقق من هذا', samenvatting:'هل ينطبق عليك التزام الاندماج؟', badge:'تحقق', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>إذا جئت إلى هولندا بعد 1 يناير 2022</strong> ولم تندمج بعد، ينطبق عليك التزام الاندماج الآن. ستتواصل معك البلدية.<span class="let-chip">تحقق</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'هل أنت بالفعل في مسار الاندماج؟ إذاً يستمر بشكل طبيعي.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>نصيحة:</strong> استخدم <a href="naturalisatie.html" style="color:var(--blauw)">فاحص التجنيس</a> المجاني على Solidari.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>الآن بعد أن أصبحت في الـ18، لديك حقوق جديدة.</strong> بعض الأمور يجب أن تطلبها بنفسك — لا تأتي تلقائياً.' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'طلب المساعدة الاجتماعية', samenvatting:'إذا لم يكن لديك دخل ولا تدرس', badge:'حق', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>لديك الحق في المساعدة الاجتماعية (Participatiewet)</strong> إذا لم يكن لديك دخل ولا تدرس وتعيش في هولندا.<span class="nieuw-chip">حق</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'لا تزال تعيش مع والديك؟ يُؤخذ وضع سكنك في الاعتبار. تفضّل إلى البلدية.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>الاندماج والمساعدة:</strong> إذا كان عليك التزام اندماج يجب المشاركة الفاعلة للحفاظ على معونتك.<span class="let-chip">شرط</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ طلب مساعدة اجتماعية عبر werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'الدراسة وDUO', samenvatting:'طلب التمويل الدراسي وبطاقة النقل', badge:'ممكن', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>تريد الدراسة؟</strong> قدّم طلب تمويل دراسي إلى DUO (قرض أساسي + منحة إضافية محتملة).<span class="nieuw-chip">جديد</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>بطاقة OV للطلاب</strong> تمنح سفراً مجانياً في ساعات الذروة المنخفضة.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'التمويل الدراسي <strong>قرض</strong> يجب سداده. اقترض فقط ما تحتاجه فعلاً.<span class="let-chip">قرض</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ طلب تمويل دراسي عبر duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'السكن وإعانة الإيجار', samenvatting:'التسجيل للحصول على مسكن اجتماعي', badge:'نصيحة', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>سجّل نفسك الآن في شركة إسكان.</strong> قوائم الانتظار طويلة — أحياناً 5 إلى 10 سنوات.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'عند الاستقلال ودخل منخفض يمكنك طلب <strong>إعانة السكن</strong>. حد الإيجار 2026: 880.66 يورو.<span class="nieuw-chip">مال</span>' },
          ], extern:null },
        { icoon:'📊', kleur:'#EBF3EE', naam:'الإقرار الضريبي', samenvatting:'كل عام في مارس/أبريل', badge:'سنوي', badgeKleur:'let',
          punten:[
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>كل عام تقدّم إقراراً ضريبياً</strong> إذا كان لديك دخل. تفعل ذلك بـ DigiD عبر Mijn Belastingdienst.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'عند دخل منخفض قد تحصل على استرداد. قدّم الإقرار دائماً.' },
          ], extern:{ url:'https://www.belastingdienst.nl', tekst:'→ الإقرار الضريبي عبر belastingdienst.nl' } },
        { icoon:'🚗', kleur:'#F5F3FF', naam:'رخصة القيادة', samenvatting:'يمكنك الآن الحصول على رخصة قيادة', badge:'حق جديد', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>من سن 18 يمكنك أداء اختبار القيادة باستقلالية.</strong> لم تعد بحاجة إلى مرافق.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'هل كان لديك رخصة قيادة بمرافق (2toDrive)؟ يمكنك الآن القيادة وحدك.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>الحصول على رخصة يكلف مالاً</strong> — دورة متوسطة 1,500 إلى 2,500 يورو.<span class="let-chip">تكاليف</span>' },
          ], extern:{ url:'https://www.cbr.nl', tekst:'→ المزيد عن رخصة القيادة عبر cbr.nl' } },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'رعاية الشباب تنتهي — رعاية البالغين تبدأ', samenvatting:'هل كنت تتلقى دعماً؟ تحقق مما يتغير', badge:'تحقق', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>رعاية الشباب تتوقف عند بلوغك 18.</strong> تحدث مع مسؤول الدعم قبل عيد ميلادك عمّا يتوفر بعد ذلك.<span class="let-chip">مهم</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'في بعض الحالات يمكن تمديد رعاية الشباب حتى سن 23. قدّم الطلب في الوقت المناسب.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'دعم البالغين عبر: الطبيب العام، WMO، الصحة النفسية أو الخدمة الاجتماعية. JIP يمكنه مساعدتك.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ تحدث مع مسؤول الدعم أو البلدية <strong>قبل بلوغك 18</strong>. لا تنتظر حتى عيد ميلادك.' },
          extern:null },
      ],
      checklist:[
        { tekst:'التسجيل في شركة إسكان', sub:'في أقرب وقت — قوائم الانتظار طويلة' },
        { tekst:'تقديم تفضيل التبرع', sub:'عبر donorregister.nl' },
        { tekst:'طلب مساعدة اجتماعية أو تمويل دراسي (إن لزم)', sub:'حسب وضع السكن والخطط' },
        { tekst:'التحقق من التزام الاندماج', sub:'إذا لم تندمج بعد' },
        { tekst:'تذكّر الإقرار الضريبي للعام القادم', sub:'كل عام في مارس عبر belastingdienst.nl' },
        { tekst:'مناقشة رعاية الشباب مع البلدية', sub:'إذا كنت تتلقى دعماً' },
      ],
    },
  },
};
})();
// TR
(function(){
var d = window._D18 = window._D18 || {};
d.TR = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Bunları 18. doğum gününden önce düzenleyin.</strong> Bazı yardımlar çocuğunuz 18 yaşına girdiği gün otomatik olarak durur. Harekete geçmezseniz para kaybedebilir ya da fazla ödeme alıp geri ödemek zorunda kalabilirsiniz.' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'Çocuk yardımı (Kinderbijslag)', samenvatting:'Otomatik durur — yapılacak bir şey yok', badge:'DURUYOR', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Çocuk yardımı otomatik olarak durur</strong> — çocuğunuzun 18 yaşına girdiği çeyreğin son gününde. SVB bunu kendiliğinden ayarlar, bildirim yapmanız gerekmez.<span class="stopt-chip">DURUYOR</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Çocuk yardımı durduğunda SVB size bir mektup gönderir. SVB\'deki adres bilgilerinizin güncel olduğundan emin olun.' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'Çocuğa bağlı yardım (Kindgebonden budget)', samenvatting:'18. doğum gününde durur — değişikliği bildirin', badge:'DURUYOR', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Çocuğa bağlı yardım, çocuğunuzun 18 yaşına girdiği gün durur.</strong> Bu önemli bir değişiklik — yardım aylık yüzlerce euro tutabilir.<span class="stopt-chip">DURUYOR</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Bunu Belastingdienst\'e bildirin</strong> — Mijn Toeslagen üzerinden. Aksi takdirde fazla yardım alır ve geri ödemek zorunda kalırsınız.<span class="let-chip">DİKKAT</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'18 yaşından küçük başka çocuklarınız varsa, onlar için yardım devam eder.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Geri ödeme talebinden kaçınmak için değişikliği belastingdienst.nl\'deki <strong>Mijn Toeslagen</strong>\'den en kısa sürede bildirin.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ Mijn Toeslagen üzerinden değişiklik bildirin' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'Çocuğunuz için DigiD', samenvatting:'18. doğum gününden çok önce başvurun', badge:'AKSİYON', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Çocuğunuzun 18 yaşından itibaren kendi DigiD\'sine ihtiyacı olacak</strong> — sağlık yardımı, vergi beyanı ve tüm devlet işlemleri için.<span class="nieuw-chip">AKSİYON</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'DigiD başvurusu 5 iş günü sürer. digid.nl üzerinden başvurun. Çocuğunuzun bunu kendisinin yapması gerekir.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'DigiD doğrulaması için çocuğunuzun kendine ait e-posta adresi ve telefon numarasına sahip olduğundan emin olun.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ digid.nl\'de DigiD başvurusu yapın' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Sağlık sigortası ayarlama', samenvatting:'18. doğum gününden önce alın — aksi hâlde ceza', badge:'SON TARİH', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>Çocuğunuz 18 yaşına girdiğinde sizin sağlık sigortanızın kapsamından çıkar.</strong> Kendi poliçesine sahip olması gerekir.<span class="stopt-chip">SON TARİH</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Çocuğunuzun doğum gününden sonra cezasız sigorta yaptırmak için <strong>3 ayı</strong> vardır. Ancak 18. doğum gününden önce düzenlemek daha akıllıcadır.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'18 yaşından itibaren çocuğunuz <strong>sağlık yardımı (zorgtoeslag)</strong> başvurusunda bulunabilir. 2026\'da aylık maksimum 154 euro.<span class="nieuw-chip">YENİ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'2026 zorunlu katkı payı <strong>165 euro</strong>\'dur. Çocuğunuz bunu kendisi öder. Sürpriz olmaması için önceden bilgilendirin.' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>Sağlık yardımı başvurusu:</strong> Çocuğunuzun bunu Mijn Toeslagen (belastingdienst.nl) üzerinden kendisinin yapması gerekir. DigiD\'nin hazır olduğundan emin olun.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ belastingdienst.nl\'de sağlık yardımı hakkında daha fazlası' } },
      ],
      checklist:[
        { tekst:'Çocuğunuz için DigiD başvurusu yapıldı', sub:'5 iş günü sürer — zamanında yapın' },
        { tekst:'Çocuğunuz için sağlık sigortası ayarlandı', sub:'18. doğum gününden önce veya o gün' },
        { tekst:'Sağlık yardımı başvurusu yapıldı (çocuğun DigiD\'si ile)', sub:'18 yaşından önce başvurulabilir, doğum gününde başlar' },
        { tekst:'Çocuğunuz adına banka hesabı', sub:'Yardımlar kendi hesabına ödenir' },
        { tekst:'Çocuğa bağlı yardım değişikliği bildirildi', sub:'Çocuğunuz 18 olduğunda Mijn Toeslagen üzerinden' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>O gün çeşitli şeyler hemen değişir.</strong> Çocuğunuz artık resmî olarak reşit sayılır ve kendi hakları ve sorumlulukları vardır.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Reşitlik ve haklar', samenvatting:'Çocuğunuz artık hukuken yetişkin', badge:'BUGÜN', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Bugünden itibaren çocuğunuz tam hukukî ehliyete sahiptir.</strong> Bağımsız olarak sözleşme imzalayabilir, oy kullanabilir ve eylemlerinden şahsen sorumludur.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Çocuğunuz artık tek başına doktora gidebilir ve tıbbi tedavilere kendi rızasını verebilir.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Çocuğunuz artık bağımsız olarak <strong>sürücü belgesi</strong> başvurusunda bulunabilir, alkol satın alabilir ve kira sözleşmesi imzalayabilir.' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'Yardımlar: duranlar ve başlayanlar', samenvatting:'Çocuk yardımları duruyor — sağlık yardımı başlıyor', badge:'DEĞİŞİKLİK', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Çocuk yardımı</strong> çeyreğin son gününde durur.<span class="stopt-chip">DURUYOR</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Çocuğa bağlı yardım</strong> doğum gününde durur.<span class="stopt-chip">DURUYOR</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Sağlık yardımı</strong> başlar — eğer çocuğunuz başvuru yapmışsa. Henüz yapılmadıysa bugün yapın.<span class="nieuw-chip">BAŞLIYOR</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Çocuğunuz bağımsız yaşıyorsa kendi adına <strong>kira yardımı</strong> başvurusunda bulunabilir.<span class="nieuw-chip">BAŞLIYOR</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'Entegrasyon ve ikamet durumu', samenvatting:'Entegrasyon yükümlülüğü artık çocuk için de geçerli', badge:'DİKKAT', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Çocuğunuz 1 Ocak 2022\'den sonra Hollanda\'ya geldiyse</strong> ve henüz entegre olmadıysa, entegrasyon yükümlülüğü artık onun için de geçerlidir.<span class="let-chip">DİKKAT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Çocuğunuzun belediyeye kayıt yaptırması gerekir. Entegrasyon süresi oturma izninden itibaren 3 yıldır.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Çocuğunuz zaten entegre olduysa veya muafiyeti varsa bu konuda bir şey değişmez.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>İpucu:</strong> Çocuğunuzun ne zaman Hollanda pasaportu alabilecejini görmek için Solidari\'deki <a href="naturalisatie.html" style="color:var(--blauw)">Vatandaşlık Kontrolü</a>\'nü kullanın.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>18. doğum gününden sonraki haftalarda ve aylarda</strong> çocuğunuzun kendisinin düzenlemesi gereken birkaç şey vardır.' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Sosyal yardım — bireysel hak', samenvatting:'Çocuğunuz kendi sosyal yardımına hak kazandı', badge:'YENİ HAK', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>18 yaşından itibaren çocuğunuzun geliri yoksa ve öğrenci değilse sosyal yardıma bireysel hakkı vardır.</strong> Bu sizin yardımınızdan bağımsızdır.<span class="nieuw-chip">YENİ HAK</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Çocuğunuz hâlâ sizinle mi yaşıyor? Yardım hesaplanırken ikamet durumu dikkate alınır. Belediyeye sorun.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Dikkat:</strong> Çocuğunuz sizinle yaşıyorsa ve sosyal yardım başvurusu yaparsa bu sizin yardımınızı etkileyebilir.<span class="let-chip">KONTROL</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ werk.nl üzerinden sosyal yardım başvurusu yapın' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Öğrenim ve DUO', samenvatting:'Öğrenim desteği ve toplu taşıma kartı', badge:'MÜMKÜN', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Öğrenim desteği:</strong> Çocuğunuz MBO, HBO veya üniversiteye gidecekse DUO\'dan öğrenim desteği başvurusunda bulunabilir.<span class="nieuw-chip">YENİ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>OV öğrenci kartı:</strong> DUO\'ya kayıtlı öğrenciler yoğun olmayan saatlerde ücretsiz seyahat kartı alır.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Öğrenim desteği ileride geri ödenmesi gereken bir kredidir. Çocuğunuzla bunu konuşun.' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ duo.nl\'de öğrenim desteği başvurusu yapın' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Bağımsız yaşam', samenvatting:'Kira yardımı ve konut derneğine kayıt', badge:'TAVSİYE', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Çocuğunuzu 18 yaşına girer girmez bir konut derneğine kaydedin.</strong> Bekleme listeleri uzundur — ne kadar erken o kadar iyi.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Çocuğunuz bağımsız yaşıyorsa ve düşük geliri varsa <strong>kira yardımı (huurtoeslag)</strong> başvurusunda bulunabilir. 2026 kira sınırı: 880,66 euro/ay.<span class="nieuw-chip">YENİ</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Oy hakkı ve organ bağışı kaydı', samenvatting:'İki yeni yurttaşlık hakkı', badge:'YENİ HAK', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Oy hakkı:</strong> Çocuğunuz artık yerel, il ve ulusal seçimlerde oy kullanabilir.<span class="nieuw-chip">YENİ HAK</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Organ bağışı kaydı:</strong> 18 yaşındaki herkes otomatik olarak bağışçı olarak kaydedilir (itiraz etmedikçe). Çocuğunuz donorregister.nl üzerinden tercihini güncelleyebilir.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ donorregister.nl üzerinden bağış tercihini güncelleyin' } },
      ],
      checklist:[
        { tekst:'Sağlık sigortası alındı ve sağlık yardımı başvurusu yapıldı', sub:'Mijn Toeslagen üzerinden' },
        { tekst:'Konut derneğine kayıt yapıldı', sub:'Erken başlayın — bekleme listeleri uzundur' },
        { tekst:'Bağış tercihi iletildi', sub:'donorregister.nl üzerinden' },
        { tekst:'Sosyal yardım veya öğrenim desteği başvurusu yapıldı (gerekirse)', sub:'İkamet durumuna ve öğrenime göre' },
        { tekst:'Entegrasyon yükümlülüğü kontrol edildi', sub:'Henüz entegre olmadıysa belediyeye sorun' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Henüz 18 değil misiniz? Doğum gününüzden önce bunları düzenleyin.</strong> İyi hazırlanırsanız 18. yaş gününüzde hiçbir şey ayarlamak zorunda kalmazsınız.' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'DigiD başvurusu yapın', samenvatting:'Devletle neredeyse her iş için gerekli', badge:'AKSİYON', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD devlet işlemleri için dijital kimliğinizdir.</strong> Sağlık yardımı, vergi beyanı, DUO kaydı ve daha fazlası için gereklidir.<span class="nieuw-chip">YAPILACAK</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'18 yaşından önce DigiD başvurusunda bulunabilirsiniz. digid.nl\'den başvurun — aktivasyonu 5 iş günü sürer.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Kendi e-posta adresiniz ve telefon numaranızın olması gerekir. Ebeveynlerinizin e-postasını kullanmayın.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ digid.nl\'de DigiD başvurusu yapın' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Kendi sağlık sigortanızı ayarlayın', samenvatting:'Artık ebeveynlerinizin sigortası kapsamında değilsiniz', badge:'ZORUNLU', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>18 yaşına girdiğinizde ebeveynlerinizin sağlık sigortasının kapsamından çıkarsınız.</strong> Kendi poliçenizi yaptırmanız gerekir.<span class="stopt-chip">ZORUNLU</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Doğum gününüzden sonra cezasız sigorta yaptırmak için 3 ayınız var. Ama çok beklemeyin.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>Sağlık yardımı başvurusu yapın!</strong> Düşük geliriniz varsa 2026\'da aylık maksimum 154 euro. DigiD\'inizle Mijn Toeslagen üzerinden başvurun.<span class="nieuw-chip">PARA</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>belastingdienst.nl/toeslagen</strong> üzerinden sağlık yardımı başvurusu yapın. 18 yaşından önce başvurabilirsiniz — yardım doğum gününüzde başlar.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Sağlık yardımı hakkında daha fazlası' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Kendi banka ve tasarruf hesabı', samenvatting:'Yardımlar kendi hesabınıza ödenir', badge:'TAVSİYE', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Kendi adınıza bir banka hesabı açın.</strong> Başvurduğunuz tüm yardımlar sizin hesabınıza ödenir.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Çoğu banka, 18 yaşından önce vadesiz hesap açmanıza izin verir. Bankanıza danışın.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Bir tasarruf hesabı da açın</strong> — beklenmedik masraflar için tampon görevi görür (2026\'da 165 euro katkı payı gibi).' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'DigiD başvurusu yapıldı ve aktive edildi', sub:'Önceden başvurun' },
        { tekst:'Sağlık sigortası ayarlandı', sub:'18. doğum gününden önce veya o gün yaptırın' },
        { tekst:'Sağlık yardımı başvurusu yapıldı', sub:'DigiD\'inizle Mijn Toeslagen üzerinden' },
        { tekst:'Kendi adınıza banka hesabı', sub:'Yardım ödemeleri için gerekli' },
        { tekst:'Tasarruf hesabı açıldı', sub:'Katkı payı ve beklenmedik masraflar için tampon' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Tebrikler — resmi olarak 18 oldunuz!</strong> Artık hukuken yetişkinsiniz ve yeni haklarınız ve sorumluluklarınız var.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Artık bağımsızsınız', samenvatting:'Hukuken yetişkin — kendi haklarınız ve sorumluluklarınız', badge:'BUGÜN', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Artık her şeyi bağımsız olarak ayarlayabilirsiniz</strong> — sözleşme, oy, tıbbi kararlar, sürücü belgesi başvurusu.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Artık eylemlerinizden <strong>şahsen sorumlusunuz</strong>. Yaptığınız borçlar sizin borcunuzdur.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Borçlara dikkat:</strong> 18 yaşına girince taksitli alışveriş veya borç almak kolaylaşır. Borçlar hızla birikir.<span class="let-chip">DİKKATLİ OLUN</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Oy hakkı ve organ bağışı kaydı', samenvatting:'Bugün başlayan iki yeni hak', badge:'YENİ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Oy hakkı:</strong> Artık oy kullanabilirsiniz! Bir sonraki seçimde adresinize otomatik olarak oy pusulası gelecek.<span class="nieuw-chip">YENİ HAK</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Organ bağışı kaydı:</strong> İtiraz etmediğiniz sürece otomatik olarak bağışçı kaydedileceksiniz. donorregister.nl üzerinden bilinçli seçin.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ donorregister.nl üzerinden bağış tercihinizi kaydedin' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'Entegrasyon — bunu kontrol edin', samenvatting:'Entegrasyon yükümlülüğü sizin için geçerli mi?', badge:'KONTROL', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>1 Ocak 2022\'den sonra Hollanda\'ya geldiyseniz</strong> ve henüz entegre olmadıysanız, entegrasyon yükümlülüğü artık sizin için de geçerlidir.<span class="let-chip">KONTROL</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Zaten entegrasyon sürecinde misiniz? O zaman devam ediyor.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>İpucu:</strong> Ne zaman Hollanda pasaportu alabilecejinizi görmek için Solidari\'deki ücretsiz <a href="naturalisatie.html" style="color:var(--blauw)">Vatandaşlık Kontrolü</a>\'nü kullanın.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>Artık 18 olduğunuza göre yeni haklarınız var.</strong> Bazı şeyleri kendiniz başvurmanız gerekir — otomatik olarak gelmezler.' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'Sosyal yardım başvurusu', samenvatting:'Geliri yoksa ve öğrenci değilse', badge:'HAK', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Geliri yoksa, öğrenci değilse ve Hollanda\'da yaşıyorsa sosyal yardıma (Participatiewet) hakkınız vardır.</strong> Ebeveynlerinizden bağımsız bireysel hakkınız.<span class="nieuw-chip">HAK</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Hâlâ ailenizle yaşıyorsanız, ikamet durumunuz yardım hesaplanırken dikkate alınır. Daha fazla bilgi için belediyeye gidin.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Entegrasyon ve sosyal yardım:</strong> Entegrasyon yükümlülüğünüz varsa yardımı korumak için aktif katılımınız gerekir.<span class="let-chip">KOŞUL</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ werk.nl üzerinden sosyal yardım başvurusu yapın' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Öğrenim ve DUO', samenvatting:'Öğrenim desteği ve OV kartı başvurusu', badge:'MÜMKÜN', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Okuyacak mısınız?</strong> DUO\'dan öğrenim desteği başvurusunda bulunun (temel kredi + ilave burs).<span class="nieuw-chip">YENİ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>OV öğrenci kartı</strong> yoğun olmayan saatlerde ücretsiz seyahat sağlar.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Öğrenim desteği ileride geri ödemeniz gereken bir <strong>kredidir</strong>. Sadece gerçekten ihtiyaç duyduğunuz kadar borç alın.<span class="let-chip">KREDİ</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ duo.nl\'de öğrenim desteği başvurusu yapın' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Konut ve kira yardımı', samenvatting:'Sosyal konut için kayıt olun', badge:'TAVSİYE', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Hemen bir konut derneğine kaydolun.</strong> Bekleme listeleri uzundur — bazen 5 ila 10 yıl.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Bağımsız yaşıyorsanız ve düşük geliriniz varsa <strong>kira yardımı (huurtoeslag)</strong> başvurusunda bulunabilirsiniz. 2026 kira sınırı: 880,66 euro.<span class="nieuw-chip">PARA</span>' },
          ], extern:null },
        { icoon:'📊', kleur:'#EBF3EE', naam:'Vergi beyanı', samenvatting:'Her yıl mart/nisan ayında', badge:'YILLIK', badgeKleur:'let',
          punten:[
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Geliriniz varsa her yıl vergi beyanı verirsiniz.</strong> Bunu DigiD\'inizle Mijn Belastingdienst üzerinden yaparsınız.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Az kazandıysanız bazen para iade alırsınız. Her zaman beyan verin.' },
          ], extern:{ url:'https://www.belastingdienst.nl', tekst:'→ belastingdienst.nl\'de vergi beyanı' } },
        { icoon:'🚗', kleur:'#F5F3FF', naam:'Sürücü belgesi', samenvatting:'Artık sürüş dersi alabilir ve ehliyet çıkarabilirsiniz', badge:'YENİ HAK', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>18 yaşından itibaren bağımsız olarak sürüş sınavına girebilir</strong> ve ehliyet alabilirsiniz. Artık refakatçiye ihtiyacınız yok.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Zaten 2toDrive ehliyetiniz var mıydı? Artık tek başınıza sürebilirsiniz.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Ehliyet çıkarmak para gerektirir</strong> — ortalama 1.500 ila 2.500 euro.<span class="let-chip">MALİYET</span>' },
          ], extern:{ url:'https://www.cbr.nl', tekst:'→ cbr.nl\'de ehliyet ve sınav hakkında daha fazlası' } },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'Gençlik desteği bitiyor — yetişkin bakımı başlıyor', samenvatting:'Rehberlik aldınız mı? Neyin değiştiğini kontrol edin', badge:'KONTROL', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Gençlik desteği 18 yaşına girdiğinizde durur.</strong> Sonrasında neler mevcut olduğunu doğum gününüzden önce danışmanınızla görüşün.<span class="let-chip">ÖNEMLİ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Bazı durumlarda gençlik desteği 23 yaşına kadar uzatılabilir. Belediyeye zamanında başvurmanız gerekir.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Yetişkinler için destek farklı kanallardan yürür: aile hekimi, WMO (belediye), ruh sağlığı veya sosyal hizmetler. JIP yardımcı olabilir.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Danışmanınızla veya belediyeyle <strong>18 yaşına girmeden önce</strong> konuşun. Doğum gününüzü beklemeyin.' },
          extern:null },
      ],
      checklist:[
        { tekst:'Konut derneğine kayıt yapıldı', sub:'En kısa sürede yapın — bekleme listeleri uzundur' },
        { tekst:'Bağış tercihi iletildi', sub:'donorregister.nl üzerinden' },
        { tekst:'Sosyal yardım veya öğrenim desteği başvurusu yapıldı (gerekirse)', sub:'İkamet durumuna ve planlara göre' },
        { tekst:'Belediyede entegrasyon yükümlülüğü kontrol edildi', sub:'Henüz entegre olmadıysanız' },
        { tekst:'Gelecek yıl vergi beyanı hatırlandı', sub:'Her yıl mart ayında belastingdienst.nl üzerinden' },
        { tekst:'Gençlik desteği belediyeyle görüşüldü', sub:'Destek aldıysanız — sonrasında neler olduğunu kontrol edin' },
      ],
    },
  },
};
})();
