// RO + PL
(function(){
var d = window._D18 = window._D18 || {};
d.RO = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Rezolvă asta înainte de ziua de naștere a 18 ani.</strong> Unele alocații se opresc automat în ziua în care copilul tău împlinește 18 ani. Dacă nu faci nimic, poți pierde bani sau poți primi prea mult și va trebui să returnezi. Planifică din timp.' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'Alocație pentru copii (Kinderbijslag)', samenvatting:'Se oprește automat — nu trebuie să faci nimic', badge:'SE OPREȘTE', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Alocația pentru copii se oprește automat</strong> în ultima zi a trimestrului în care copilul tău împlinește 18 ani. Nu trebuie să notifici pe nimeni — SVB se ocupă de asta.<span class="stopt-chip">SE OPREȘTE</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'SVB îți va trimite o scrisoare când se oprește alocația. Verifică că adresa ta la SVB este corectă.' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'Buget copil (Kindgebonden budget)', samenvatting:'Se oprește la ziua de naștere a 18 ani — raportează modificarea', badge:'SE OPREȘTE', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Bugetul pentru copil se oprește în ziua în care copilul tău împlinește 18 ani.</strong> Acesta poate ajunge la sute de euro pe lună.<span class="stopt-chip">SE OPREȘTE</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Raportează asta la Belastingdienst</strong> prin Mijn Toeslagen. Altfel primești prea mult și va trebui să returnezi.<span class="let-chip">ATENȚIE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Dacă mai ai alți copii sub 18 ani, bugetul pentru copil continuă pentru ei.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Raportează modificarea cât mai curând prin <strong>Mijn Toeslagen</strong> pe belastingdienst.nl pentru a evita o solicitare de returnare.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ Raportează o modificare prin Mijn Toeslagen' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'DigiD pentru copilul tău', samenvatting:'Solicită cu mult înainte de ziua de naștere a 18 ani', badge:'ACȚIUNE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>De la 18 ani copilul tău are nevoie de propriul DigiD</strong> pentru alocația de sănătate, declarația fiscală și toate relațiile cu guvernul.<span class="nieuw-chip">ACȚIUNE</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Solicitarea DigiD durează 5 zile lucrătoare. Solicită la digid.nl. Copilul tău trebuie să facă asta singur.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Asigură-te că copilul tău are propria adresă de email și număr de telefon pentru verificarea DigiD.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ Solicită DigiD la digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Aranjarea asigurării de sănătate', samenvatting:'Încheie înainte de 18 ani — altfel amendă', badge:'TERMEN LIMITĂ', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>Copilul tău nu mai este acoperit de asigurarea ta de sănătate</strong> odată ce împlinește 18 ani. Trebuie să aibă propria poliță.<span class="stopt-chip">TERMEN LIMITĂ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Copilul tău are <strong>3 luni</strong> după ziua de naștere să încheie asigurarea fără amendă. Dar este înțelept să aranjezi asta înainte.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'De la 18 ani copilul tău poate solicita <strong>alocație de sănătate (zorgtoeslag)</strong>. În 2026: până la €154/lună.<span class="nieuw-chip">NOU</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Franchiza obligatorie (eigen risico) în 2026 este de <strong>€165</strong>. Copilul tău o plătește singur.' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>Solicitarea alocației de sănătate:</strong> Copilul tău trebuie să facă asta prin Mijn Toeslagen (belastingdienst.nl). Asigură-te că DigiD este pregătit.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Mai multe despre alocația de sănătate' } },
      ],
      checklist:[
        { tekst:'DigiD solicitat pentru copilul tău', sub:'Durează 5 zile lucrătoare — fă asta din timp' },
        { tekst:'Asigurare de sănătate aranjată pentru copilul tău', sub:'Înainte sau pe ziua de naștere a 18 ani' },
        { tekst:'Alocație de sănătate solicitată (prin DigiD-ul copilului)', sub:'Poate fi solicitată înainte de 18 ani, intră în vigoare la ziua de naștere' },
        { tekst:'Cont bancar pe numele copilului', sub:'Alocațiile sunt plătite în contul propriu' },
        { tekst:'Modificare buget copil raportată', sub:'Prin Mijn Toeslagen de îndată ce copilul împlinește 18 ani' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Chiar în această zi se schimbă câteva lucruri.</strong> Copilul tău este acum oficial major și are drepturi și obligații proprii. Unele lucruri se opresc automat, altele trebuie rezolvate singur.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Majorat & drepturi', samenvatting:'Copilul tău este acum adult în fața legii', badge:'ASTĂZI', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>De astăzi copilul tău are deplină capacitate de exercițiu.</strong> Poate încheia contracte independent, poate vota și este responsabil personal.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Copilul tău poate merge singur la medic, dentist sau specialist și dă singur consimțământul pentru tratamente medicale.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Copilul tău poate acum solicita și <strong>permis de conducere</strong>, cumpăra alcool și încheia un contract de închiriere pe propriul nume.' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'Alocații: ce se oprește, ce începe', samenvatting:'Kinderbijslag și KGB se opresc — zorgtoeslag începe', badge:'MODIFICARE', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Alocația pentru copii</strong> se oprește în ultima zi a trimestrului.<span class="stopt-chip">SE OPREȘTE</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Bugetul pentru copil</strong> se oprește chiar în ziua de naștere.<span class="stopt-chip">SE OPREȘTE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Alocația de sănătate</strong> intră — dacă copilul tău a solicitat-o deja. Nu a făcut-o încă? Fă asta astăzi.<span class="nieuw-chip">ÎNCEPE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Dacă copilul tău locuiește independent, poate solicita <strong>alocație de chirie</strong> pe propriul nume.<span class="nieuw-chip">ÎNCEPE</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'Integrare & statut de ședere', samenvatting:'Obligația de integrare se aplică acum și copilului', badge:'ATENȚIE', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Dacă copilul tău a venit în Olanda după 1 ianuarie 2022</strong> și nu s-a integrat încă, obligația de integrare se aplică acum și lui/ei.<span class="let-chip">ATENȚIE</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Copilul tău trebuie să se prezinte singur la primărie. Termenul de integrare este de 3 ani de la permis.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Dacă copilul tău s-a integrat deja sau are o scutire, nu se schimbă nimic.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Sfat:</strong> Folosește <a href="naturalisatie.html" style="color:var(--blauw)">Verificatorul de cetățenie</a> pe Solidari pentru a vedea când copilul tău poate solicita pașaportul neerlandez.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>În săptămânile și lunile de după ziua de naștere a 18 ani</strong> sunt câteva lucruri pe care copilul tău trebuie să le rezolve singur. Tu poți ajuta, dar solicitările sunt pe numele copilului.' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Ajutor social — drept propriu', samenvatting:'Copilul tău are dreptul la propriul ajutor social', badge:'DREPT NOU', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>De la 18 ani copilul tău are dreptul propriu la ajutor social (bijstand)</strong> dacă nu are venituri și nu studiază. Independent de alocația ta.<span class="nieuw-chip">DREPT NOU</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Locuiește copilul tău încă la tine? Atunci situația de locuire este luată în calcul. Întreabă la primărie ce înseamnă asta.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Atenție:</strong> Dacă copilul tău locuiește la tine și solicită ajutor social, asta poate influența alocația ta.<span class="let-chip">VERIFICĂ</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Solicitare ajutor social prin werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Studii și DUO', samenvatting:'Finanțare studii și card OV', badge:'POSIBIL', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Urmează să studieze?</strong> Poate solicita finanțare studii la DUO (împrumut de bază + eventuală bursă suplimentară).<span class="nieuw-chip">NOU</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Cardul OV pentru studenți</strong> permite călătorii gratuite în orele reduse.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Finanțarea studiilor este un <strong>împrumut</strong> care trebuie returnat ulterior. Împrumutați doar cât aveți cu adevărat nevoie.<span class="let-chip">ÎMPRUMUT</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Solicitare finanțare studii prin duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Locuință și alocație de chirie', samenvatting:'Înregistrează-te la o asociație de locuințe', badge:'RECOMANDARE', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Înregistrează copilul la o asociație de locuințe sociale</strong> imediat ce împlinește 18 ani. Listele de așteptare sunt lungi — cu cât mai devreme, cu atât mai bine.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Dacă locuiește independent cu venituri mici, poate solicita <strong>alocație de chirie</strong>. Limita de chirie 2026: €880,66.<span class="nieuw-chip">BANI</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Drept de vot & înregistrare donator', samenvatting:'Două noi drepturi civice', badge:'DREPT NOU', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Drept de vot:</strong> Copilul tău poate acum vota la alegerile municipale, provinciale și naționale.<span class="nieuw-chip">DREPT NOU</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Înregistrare donator:</strong> Toți cei de 18 ani sunt înregistrați automat ca donatori (cu excepția obiecțiilor). Va primi o scrisoare și poate schimba alegerea prin donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Modifică alegerea donator prin donorregister.nl' } },
      ],
      checklist:[
        { tekst:'Asigurare de sănătate încheiată și alocație de sănătate solicitată', sub:'Prin Mijn Toeslagen' },
        { tekst:'Înregistrat la asociația de locuințe', sub:'Începe devreme — listele de așteptare sunt lungi' },
        { tekst:'Alegerea donator comunicată', sub:'Prin donorregister.nl' },
        { tekst:'Ajutor social sau finanțare studii solicitată (dacă este necesar)', sub:'În funcție de situația de locuire și planuri' },
        { tekst:'Declarația fiscală de anul viitor notată', sub:'În fiecare an în martie prin belastingdienst.nl' },
        { tekst:'Ajutorul pentru tineri discutat cu primăria', sub:'Dacă primea ajutor — verifică ce urmează' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Nu ai 18 ani încă? Rezolvă asta înainte de ziua ta.</strong> Dacă ești bine pregătit, nu va trebui să rezolvi nimic în ziua în care împlinești 18 ani.' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'Solicitare DigiD', samenvatting:'Obligatoriu pentru aproape orice cu guvernul', badge:'ACȚIUNE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD este legitimația ta digitală</strong> pentru guvern. Necesar pentru alocația de sănătate, declarația fiscală, DUO și altele.<span class="nieuw-chip">REZOLVĂ ASTA</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Poți solicita DigiD chiar înainte de 18 ani prin digid.nl — activarea durează 5 zile lucrătoare.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Ai nevoie de propria adresă de email și număr de telefon. Nu folosi adresa de email a părinților.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ Solicită DigiD la digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Propria asigurare de sănătate', samenvatting:'Nu mai ești acoperit de asigurarea părinților', badge:'OBLIGATORIU', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>La 18 ani nu mai ești acoperit de asigurarea părinților.</strong> Încheie propria asigurare înainte sau în ziua nașterii tale.<span class="stopt-chip">OBLIGATORIU</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Ai 3 luni după ziua de naștere să închei asigurarea fără amendă. Dar nu aștepta prea mult.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>Solicită alocație de sănătate!</strong> Cu venituri mici până la €154 pe lună (2026). Prin Mijn Toeslagen cu DigiD-ul tău.<span class="nieuw-chip">BANI</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ Solicită alocația de sănătate prin <strong>belastingdienst.nl/toeslagen</strong>. Poți face asta înainte de 18 ani — intră în vigoare la ziua ta de naștere.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Mai multe despre alocația de sănătate' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Cont bancar propriu', samenvatting:'Alocațiile sunt plătite în contul tău propriu', badge:'SFAT', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Asigură-te că ai un cont bancar pe propriul tău nume.</strong> Toate alocațiile sunt plătite în contul TĂU.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'La majoritatea băncilor poți deschide un cont curent chiar înainte de 18 ani. Întreabă.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Deschide și un cont de economii</strong> ca rezervă pentru cheltuieli neașteptate — franchiza este €165 în 2026.' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'DigiD solicitat și activat', sub:'Solicită asta din timp' },
        { tekst:'Asigurare de sănătate aranjată', sub:'Înainte sau în ziua de naștere a 18 ani' },
        { tekst:'Alocație de sănătate solicitată', sub:'Prin Mijn Toeslagen cu DigiD-ul tău' },
        { tekst:'Cont bancar pe propriul nume', sub:'Necesar pentru plata alocațiilor' },
        { tekst:'Cont de economii deschis', sub:'Rezervă pentru franchize și cheltuieli neașteptate' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Felicitări — ești oficial major!</strong> Ești acum adult în fața legii și ai noi drepturi și obligații.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Ești acum independent', samenvatting:'Adult în fața legii — drepturi și responsabilități proprii', badge:'ASTĂZI', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Poți rezolva totul independent</strong> — contracte, vot, decizii medicale, solicitare permis de conducere.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Ești acum personal <strong>responsabil</strong> pentru ce faci. Datoriile pe care le faci sunt datoriile TALE.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Atenție la datorii:</strong> Acum că ai 18 ani, poți cumpăra mai ușor în rate sau împrumuta. Datoriile se acumulează repede.<span class="let-chip">FII ATENT</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Drept de vot & înregistrare donator', samenvatting:'Două noi drepturi care intră în vigoare astăzi', badge:'NOU', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Drept de vot:</strong> Poți vota acum! La următoarele alegeri vei primi o invitație.<span class="nieuw-chip">DREPT NOU</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Înregistrare donator:</strong> Ești înregistrat automat ca donator dacă nu obiectezi. Alege conștient prin donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Stabilește alegerea donator prin donorregister.nl' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'Integrare — verifică asta', samenvatting:'Se aplică obligația de integrare pentru tine?', badge:'VERIFICĂ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Dacă ai venit în Olanda după 1 ianuarie 2022</strong> și nu te-ai integrat încă, obligația de integrare se aplică acum și ție.<span class="let-chip">VERIFICĂ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Ești deja în proces de integrare? Atunci acesta continuă normal.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Sfat:</strong> Folosește gratuit <a href="naturalisatie.html" style="color:var(--blauw)">Verificatorul de cetățenie</a> pe Solidari pentru a vedea când poți solicita pașaportul neerlandez.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>Acum că ai 18 ani, ai noi drepturi.</strong> Unele lucruri trebuie să le soliciți singur — nu vin automat.' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'Solicitare ajutor social', samenvatting:'Dacă nu ai venituri și nu studiezi', badge:'DREPT', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Ai dreptul la ajutor social (bijstand)</strong> dacă nu ai venituri, nu studiezi și locuiești în Olanda. Independent de părinții tăi.<span class="nieuw-chip">DREPT</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Locuiești încă la părinți? Atunci situația de locuire este luată în calcul. Mergi la primărie.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Integrare și ajutor social:</strong> Dacă ai obligație de integrare, trebuie să cooperezi activ pentru a păstra ajutorul social.<span class="let-chip">CONDIȚIE</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Solicită ajutor social prin werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Studii & DUO', samenvatting:'Finanțare studii și card OV', badge:'POSIBIL', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Urmezi să studiezi?</strong> Solicită finanțare studii la DUO (împrumut de bază + eventuală bursă suplimentară).<span class="nieuw-chip">NOU</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Cardul OV pentru studenți</strong> permite călătorii gratuite în orele reduse.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Finanțarea studiilor este un <strong>împrumut</strong> pe care îl vei returna mai târziu. Împrumută doar cât ai cu adevărat nevoie.<span class="let-chip">ÎMPRUMUT</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Solicită finanțare studii prin duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Locuință și alocație de chirie', samenvatting:'Înregistrează-te la o asociație de locuințe', badge:'RECOMANDARE', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Înregistrează-te la o asociație de locuințe sociale</strong> imediat ce împlinești 18 ani. Listele de așteptare sunt lungi — cu cât mai devreme, cu atât mai bine.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Dacă locuiești independent cu venituri mici, poți solicita <strong>alocație de chirie</strong>. Limita de chirie 2026: €880,66.<span class="nieuw-chip">BANI</span>' },
          ], extern:null },
        { icoon:'📊', kleur:'#EBF3EE', naam:'Declarație fiscală', samenvatting:'În fiecare an în martie/aprilie', badge:'ANUAL', badgeKleur:'let',
          punten:[
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Depui declarație fiscală în fiecare an</strong> dacă ai venituri. Cu DigiD prin Mijn Belastingdienst.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Dacă ai câștigat puțin, uneori primești bani înapoi. Deci depune întotdeauna declarația.' },
          ], extern:{ url:'https://www.belastingdienst.nl', tekst:'→ Declarație fiscală prin belastingdienst.nl' } },
        { icoon:'🚗', kleur:'#F5F3FF', naam:'Permis de conducere', samenvatting:'Poți acum lua lecții și obține permis', badge:'DREPT NOU', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>De la 18 ani poți susține independent examenul de conducere</strong> și obține permis. Nu mai ai nevoie de însoțitor.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Aveai deja permis 2toDrive? Acum poți conduce singur.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Obținerea permisului costă bani</strong> — în medie €1.500 până la €2.500.<span class="let-chip">COSTURI</span>' },
          ], extern:{ url:'https://www.cbr.nl', tekst:'→ Mai multe despre permis și examen prin cbr.nl' } },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'Ajutorul pentru tineri se termină — îngrijirea pentru adulți începe', samenvatting:'Primeai ajutor? Verifică ce se schimbă', badge:'VERIFICĂ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Ajutorul pentru tineri se termină când împlinești 18 ani.</strong> Discută înainte de ziua ta de naștere cu consilierul tău ce este disponibil după.<span class="let-chip">IMPORTANT</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'În unele cazuri ajutorul pentru tineri poate fi extins până la 23 de ani. Trebuie să soliciți asta la timp la primărie.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Ajutorul pentru adulți se acordă prin: medic de familie, WMO (primărie), sănătate mintală sau asistență socială. JIP te poate ajuta.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Discută <strong>înainte de 18 ani</strong> cu consilierul tău sau primăria. Nu aștepta ziua de naștere.' },
          extern:null },
      ],
      checklist:[
        { tekst:'Înregistrat la asociația de locuințe', sub:'Fă asta cât mai curând — listele de așteptare sunt lungi' },
        { tekst:'Alegerea donator comunicată', sub:'Prin donorregister.nl' },
        { tekst:'Ajutor social sau finanțare studii solicitată (dacă este necesar)', sub:'În funcție de situația de locuire și planuri' },
        { tekst:'Obligația de integrare verificată la primărie', sub:'Dacă nu te-ai integrat încă' },
        { tekst:'Declarația fiscală de anul viitor notată', sub:'În fiecare an în martie prin belastingdienst.nl' },
        { tekst:'Ajutorul pentru tineri discutat cu primăria', sub:'Dacă primeai ajutor — verifică ce urmează' },
      ],
    },
  },
};
})();
// PL
(function(){
var d = window._D18 = window._D18 || {};
d.PL = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Załatw to przed 18. urodzinami dziecka.</strong> Niektóre świadczenia zatrzymują się automatycznie w dniu, gdy twoje dziecko skończy 18 lat. Jeśli nic nie zrobisz, możesz stracić pieniądze lub otrzymać za dużo i musieć zwrócić. Zaplanuj to z wyprzedzeniem.' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'Zasiłek na dziecko (Kinderbijslag)', samenvatting:'Zatrzymuje się automatycznie — nic nie trzeba robić', badge:'ZATRZYMUJE SIĘ', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Zasiłek na dziecko zatrzymuje się automatycznie</strong> w ostatnim dniu kwartału, w którym twoje dziecko ukończy 18 lat. Nie musisz nikomu zgłaszać — SVB zajmuje się tym automatycznie.<span class="stopt-chip">ZATRZYMUJE SIĘ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'SVB wyśle ci list, gdy zasiłek na dziecko się zatrzyma. Upewnij się, że twój adres w SVB jest aktualny.' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'Budżet dla dziecka (Kindgebonden budget)', samenvatting:'Zatrzymuje się w dniu 18. urodzin — zgłoś zmianę', badge:'ZATRZYMUJE SIĘ', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Budżet dla dziecka zatrzymuje się w dniu, gdy twoje dziecko ukończy 18 lat.</strong> Może to wynosić setki euro miesięcznie.<span class="stopt-chip">ZATRZYMUJE SIĘ</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Zgłoś to do Belastingdienst</strong> przez Mijn Toeslagen. W przeciwnym razie otrzymasz za dużo i będziesz musiał zwrócić.<span class="let-chip">UWAGA</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Jeśli masz inne dzieci poniżej 18 lat, budżet dla dziecka jest kontynuowany dla nich.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Zgłoś zmianę jak najszybciej przez <strong>Mijn Toeslagen</strong> na belastingdienst.nl, aby uniknąć żądania zwrotu.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ Zgłoś zmianę przez Mijn Toeslagen' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'DigiD dla twojego dziecka', samenvatting:'Złóż wniosek na długo przed 18. urodzinami', badge:'DZIAŁANIE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Od 18 lat twoje dziecko potrzebuje własnego DigiD</strong> do zasiłku zdrowotnego, zeznania podatkowego i wszystkich kontaktów z rządem.<span class="nieuw-chip">DZIAŁANIE</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Złożenie wniosku o DigiD trwa 5 dni roboczych. Złóż wniosek na digid.nl. Twoje dziecko musi to zrobić samo.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Upewnij się, że dziecko ma własny adres email i numer telefonu do weryfikacji DigiD.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ Złóż wniosek o DigiD na digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Ubezpieczenie zdrowotne', samenvatting:'Wykup przed 18. urodzinami — inaczej kara', badge:'TERMIN', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>Twoje dziecko nie jest już objęte twoim ubezpieczeniem zdrowotnym</strong> po ukończeniu 18 lat. Musi mieć własną polisę.<span class="stopt-chip">TERMIN</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Twoje dziecko ma <strong>3 miesiące</strong> po urodzinach na wykupienie ubezpieczenia bez kary. Ale lepiej załatwić to wcześniej.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'Od 18 lat dziecko może ubiegać się o <strong>zasiłek zdrowotny (zorgtoeslag)</strong>. W 2026: do €154/miesiąc.<span class="nieuw-chip">NOWE</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Obowiązkowe własne ryzyko (eigen risico) w 2026 wynosi <strong>€165</strong>. Dziecko płaci to samo.' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>Złożenie wniosku o zasiłek zdrowotny:</strong> Dziecko musi to zrobić przez Mijn Toeslagen (belastingdienst.nl). Upewnij się, że DigiD jest gotowe.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Więcej o zasiłku zdrowotnym' } },
      ],
      checklist:[
        { tekst:'Złożono wniosek o DigiD dla dziecka', sub:'Trwa 5 dni roboczych — zrób to z wyprzedzeniem' },
        { tekst:'Ubezpieczenie zdrowotne załatwione dla dziecka', sub:'Przed lub w dniu 18. urodzin' },
        { tekst:'Złożono wniosek o zasiłek zdrowotny (przez DigiD dziecka)', sub:'Można złożyć przed 18. urodzinami, wchodzi w życie w dniu urodzin' },
        { tekst:'Konto bankowe na nazwisko dziecka', sub:'Świadczenia są wypłacane na własne konto' },
        { tekst:'Zmiana budżetu dla dziecka zgłoszona', sub:'Przez Mijn Toeslagen gdy dziecko skończy 18 lat' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Właśnie tego dnia zmienia się już kilka rzeczy.</strong> Twoje dziecko jest teraz oficjalnie pełnoletnie i ma własne prawa i obowiązki. Niektóre rzeczy zatrzymują się automatycznie, inne trzeba samemu załatwić.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Pełnoletność i prawa', samenvatting:'Twoje dziecko jest teraz dorosłe w świetle prawa', badge:'DZISIAJ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Od dzisiaj twoje dziecko ma pełną zdolność do czynności prawnych.</strong> Może samodzielnie zawierać umowy, głosować i jest osobiście odpowiedzialne.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Twoje dziecko może samo iść do lekarza, dentysty lub specjalisty i samodzielnie wyrażać zgodę na leczenie.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Dziecko może teraz też samodzielnie ubiegać się o <strong>prawo jazdy</strong>, kupować alkohol i zawrzeć umowę najmu na własne nazwisko.' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'Świadczenia: co się zatrzymuje, co zaczyna', samenvatting:'Kinderbijslag i KGB się zatrzymują — zorgtoeslag się zaczyna', badge:'ZMIANA', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Zasiłek na dziecko</strong> zatrzymuje się w ostatnim dniu kwartału.<span class="stopt-chip">ZATRZYMUJE SIĘ</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Budżet dla dziecka</strong> zatrzymuje się dokładnie w dniu urodzin.<span class="stopt-chip">ZATRZYMUJE SIĘ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Zasiłek zdrowotny</strong> wchodzi — jeśli dziecko już złożyło wniosek. Jeszcze nie zrobiło? Zrób to dzisiaj.<span class="nieuw-chip">ZACZYNA SIĘ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Jeśli dziecko mieszka samodzielnie, może ubiegać się o <strong>zasiłek czynszowy</strong> na własne nazwisko.<span class="nieuw-chip">ZACZYNA SIĘ</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'Integracja i status pobytowy', samenvatting:'Obowiązek integracji obowiązuje teraz też dziecko', badge:'UWAGA', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Jeśli twoje dziecko przyjechało do Holandii po 1 stycznia 2022</strong> i nie zostało jeszcze zintegrowane, obowiązek integracji obowiązuje je teraz.<span class="let-chip">UWAGA</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Dziecko musi samo zgłosić się do gminy. Termin integracji wynosi 3 lata od wydania zezwolenia.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Jeśli dziecko jest już zintegrowane lub ma zwolnienie, nic się nie zmienia.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Wskazówka:</strong> Użyj <a href="naturalisatie.html" style="color:var(--blauw)">Weryfikatora obywatelstwa</a> na Solidari, aby zobaczyć kiedy dziecko może ubiegać się o holenderski paszport.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>W tygodniach i miesiącach po 18. urodzinach</strong> jest kilka rzeczy, które twoje dziecko musi samodzielnie załatwić. Możesz pomagać, ale wnioski są na nazwisko dziecka.' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Zasiłek społeczny — własne prawo', samenvatting:'Twoje dziecko ma prawo do własnego zasiłku społecznego', badge:'NOWE PRAWO', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Od 18 lat twoje dziecko ma własne prawo do zasiłku społecznego (bijstand)</strong>, jeśli nie ma dochodu i nie studiuje. Niezależnie od twojego zasiłku.<span class="nieuw-chip">NOWE PRAWO</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Czy dziecko nadal mieszka z tobą? Wówczas sytuacja mieszkaniowa jest brana pod uwagę. Zapytaj gminę co to oznacza.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Uwaga:</strong> Jeśli dziecko mieszka z tobą i ubiega się o zasiłek społeczny, może to wpłynąć na twój zasiłek.<span class="let-chip">SPRAWDŹ</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Ubiegaj się o zasiłek społeczny przez werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Studia i DUO', samenvatting:'Finansowanie studiów i karta OV', badge:'MOŻLIWE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Będzie studiować?</strong> Może ubiegać się o finansowanie studiów w DUO (podstawowa pożyczka + ewentualne stypendium uzupełniające).<span class="nieuw-chip">NOWE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Karta OV dla studentów</strong> umożliwia darmowe podróże poza godzinami szczytu.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Finansowanie studiów to <strong>pożyczka</strong>, którą trzeba spłacić. Pożyczajcie tylko tyle, ile naprawdę potrzeba.<span class="let-chip">POŻYCZKA</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Złóż wniosek o finansowanie studiów przez duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Mieszkanie i zasiłek czynszowy', samenvatting:'Zapisz się do spółdzielni mieszkaniowej', badge:'PORADA', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Zapisz dziecko do spółdzielni mieszkaniowej</strong> gdy tylko skończy 18 lat. Listy oczekujących są długie — im wcześniej, tym lepiej.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Jeśli mieszka samodzielnie z niskim dochodem, może ubiegać się o <strong>zasiłek czynszowy</strong>. Limit czynszu 2026: €880,66.<span class="nieuw-chip">PIENIĄDZE</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Prawo wyborcze i rejestracja dawcy', samenvatting:'Dwa nowe prawa obywatelskie', badge:'NOWE PRAWO', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Prawo wyborcze:</strong> Twoje dziecko może teraz głosować w wyborach samorządowych, prowincjonalnych i krajowych.<span class="nieuw-chip">NOWE PRAWO</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Rejestracja dawcy:</strong> Wszyscy 18-latkowie są automatycznie zarejestrowani jako dawcy (chyba że złożą sprzeciw). Dziecko otrzyma list i może zmienić decyzję przez donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Zmień decyzję dawcy przez donorregister.nl' } },
      ],
      checklist:[
        { tekst:'Ubezpieczenie zdrowotne wykupione i zasiłek zdrowotny złożony', sub:'Przez Mijn Toeslagen' },
        { tekst:'Zarejestrowane w spółdzielni mieszkaniowej', sub:'Zacznij wcześnie — listy oczekujących są długie' },
        { tekst:'Decyzja dawcy przekazana', sub:'Przez donorregister.nl' },
        { tekst:'Zasiłek społeczny lub finansowanie studiów złożone (jeśli potrzeba)', sub:'W zależności od sytuacji mieszkaniowej i planów' },
        { tekst:'Zeznanie podatkowe zapamiętane na przyszły rok', sub:'Co roku w marcu przez belastingdienst.nl' },
        { tekst:'Pomoc dla młodzieży omówiona z gminą', sub:'Jeśli otrzymywało pomoc — sprawdź co dalej' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Nie masz jeszcze 18 lat? Załatw to przed swoimi urodzinami.</strong> Jeśli jesteś dobrze przygotowany, w dniu 18. urodzin nie będziesz musiał nic załatwiać.' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'Złożenie wniosku o DigiD', samenvatting:'Obowiązkowe do prawie wszystkiego z rządem', badge:'DZIAŁANIE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD to twój cyfrowy dokument tożsamości</strong> dla rządu. Potrzebny do zasiłku zdrowotnego, zeznania podatkowego, DUO i innych.<span class="nieuw-chip">ZAŁATW TO</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Możesz złożyć wniosek o DigiD jeszcze przed 18. urodzinami przez digid.nl — aktywacja trwa 5 dni roboczych.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Potrzebujesz własnego adresu email i numeru telefonu. Nie używaj adresu email rodziców.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ Złóż wniosek o DigiD na digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Własne ubezpieczenie zdrowotne', samenvatting:'Nie jesteś już objęty ubezpieczeniem rodziców', badge:'OBOWIĄZKOWE', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>W dniu 18. urodzin nie jesteś już objęty ubezpieczeniem rodziców.</strong> Wykup własne ubezpieczenie przed lub w dniu urodzin.<span class="stopt-chip">OBOWIĄZKOWE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Masz 3 miesiące po urodzinach na wykupienie ubezpieczenia bez kary. Ale nie czekaj za długo.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>Złóż wniosek o zasiłek zdrowotny!</strong> Przy niskim dochodzie do €154 miesięcznie (2026). Przez Mijn Toeslagen z twoim DigiD.<span class="nieuw-chip">PIENIĄDZE</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ Złóż wniosek o zasiłek zdrowotny przez <strong>belastingdienst.nl/toeslagen</strong>. Możesz to zrobić przed 18. urodzinami — wchodzi w życie w dniu urodzin.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Więcej o zasiłku zdrowotnym' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Własne konto bankowe', samenvatting:'Świadczenia są wypłacane na twoje własne konto', badge:'PORADA', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Zadbaj o konto bankowe na własne nazwisko.</strong> Wszystkie świadczenia są wypłacane na TWOJE konto.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'W większości banków możesz otworzyć rachunek bieżący jeszcze przed 18. urodzinami. Zapytaj.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Otwórz też konto oszczędnościowe</strong> jako bufor na niespodziewane koszty — własne ryzyko wynosi €165 w 2026.' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'DigiD złożony i aktywowany', sub:'Złóż wniosek z wyprzedzeniem' },
        { tekst:'Ubezpieczenie zdrowotne załatwione', sub:'Przed lub w dniu 18. urodzin' },
        { tekst:'Złożono wniosek o zasiłek zdrowotny', sub:'Przez Mijn Toeslagen z twoim DigiD' },
        { tekst:'Konto bankowe na własne nazwisko', sub:'Potrzebne do wypłat świadczeń' },
        { tekst:'Konto oszczędnościowe otwarte', sub:'Bufor na własne ryzyko i niespodziewane koszty' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Gratulacje — jesteś oficjalnie pełnoletni!</strong> Jesteś teraz dorosły w świetle prawa i masz nowe prawa i obowiązki.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Jesteś teraz samodzielny', samenvatting:'Dorosły w świetle prawa — własne prawa i odpowiedzialność', badge:'DZISIAJ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Możesz samodzielnie załatwiać wszystko</strong> — umowy, głosowanie, decyzje medyczne, ubieganie się o prawo jazdy.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Jesteś teraz osobiście <strong>odpowiedzialny</strong> za to co robisz. Długi które zaciągasz, są TWOIMI długami.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Uważaj na długi:</strong> Teraz gdy masz 18 lat, łatwiej kupić coś na raty lub pożyczyć pieniądze. Długi szybko się kumulują.<span class="let-chip">BĄDŹ OSTROŻNY</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Prawo wyborcze i rejestracja dawcy', samenvatting:'Dwa nowe prawa wchodzące w życie dzisiaj', badge:'NOWE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Prawo wyborcze:</strong> Możesz teraz głosować! Przy następnych wyborach otrzymasz wezwanie.<span class="nieuw-chip">NOWE PRAWO</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Rejestracja dawcy:</strong> Jesteś automatycznie zarejestrowany jako dawca, jeśli nie złożysz sprzeciwu. Wybierz świadomie przez donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Ustal decyzję dawcy przez donorregister.nl' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'Integracja — sprawdź to', samenvatting:'Czy obowiązek integracji dotyczy ciebie?', badge:'SPRAWDŹ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Jeśli przyjechałeś/aś do Holandii po 1 stycznia 2022</strong> i jeszcze się nie zintegrowałeś/aś, obowiązek integracji dotyczy teraz też ciebie.<span class="let-chip">SPRAWDŹ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Jesteś już w procesie integracji? Wtedy to trwa dalej normalnie.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Wskazówka:</strong> Użyj darmowego <a href="naturalisatie.html" style="color:var(--blauw)">Weryfikatora obywatelstwa</a> na Solidari, aby zobaczyć kiedy możesz ubiegać się o holenderski paszport.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>Teraz gdy masz 18 lat, masz nowe prawa.</strong> Niektóre rzeczy musisz samodzielnie złożyć — nie przychodzą automatycznie.' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'Złożenie wniosku o zasiłek społeczny', samenvatting:'Jeśli nie masz dochodu i nie studiujesz', badge:'PRAWO', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Masz prawo do zasiłku społecznego (bijstand)</strong>, jeśli nie masz dochodu, nie studiujesz i mieszkasz w Holandii. Niezależnie od rodziców.<span class="nieuw-chip">PRAWO</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Nadal mieszkasz u rodziców? Wówczas sytuacja mieszkaniowa jest brana pod uwagę. Idź do gminy.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Integracja i zasiłek społeczny:</strong> Jeśli masz obowiązek integracji, musisz aktywnie współpracować, żeby zachować zasiłek.<span class="let-chip">WARUNEK</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Ubiegaj się o zasiłek społeczny przez werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Studia i DUO', samenvatting:'Finansowanie studiów i karta OV', badge:'MOŻLIWE', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Będziesz studiować?</strong> Złóż wniosek o finansowanie studiów w DUO (podstawowa pożyczka + ewentualne stypendium uzupełniające).<span class="nieuw-chip">NOWE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Karta OV dla studentów</strong> umożliwia darmowe podróże poza godzinami szczytu.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Finansowanie studiów to <strong>pożyczka</strong>, którą spłacisz później. Pożyczaj tylko tyle, ile naprawdę potrzebujesz.<span class="let-chip">POŻYCZKA</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Złóż wniosek o finansowanie studiów przez duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Mieszkanie i zasiłek czynszowy', samenvatting:'Zapisz się do spółdzielni mieszkaniowej', badge:'PORADA', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Zapisz się do spółdzielni mieszkaniowej</strong> gdy tylko skończysz 18 lat. Listy oczekujących są długie — im wcześniej, tym lepiej.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Jeśli mieszkasz samodzielnie z niskim dochodem, możesz ubiegać się o <strong>zasiłek czynszowy</strong>. Limit czynszu 2026: €880,66.<span class="nieuw-chip">PIENIĄDZE</span>' },
          ], extern:null },
        { icoon:'📊', kleur:'#EBF3EE', naam:'Zeznanie podatkowe', samenvatting:'Co roku w marcu/kwietniu', badge:'ROCZNE', badgeKleur:'let',
          punten:[
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Co roku składasz zeznanie podatkowe</strong>, jeśli masz dochód. Z DigiD przez Mijn Belastingdienst.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Jeśli mało zarobiłeś/aś, czasem dostaniesz pieniądze z powrotem. Zawsze składaj zeznanie.' },
          ], extern:{ url:'https://www.belastingdienst.nl', tekst:'→ Zeznanie podatkowe przez belastingdienst.nl' } },
        { icoon:'🚗', kleur:'#F5F3FF', naam:'Prawo jazdy', samenvatting:'Możesz teraz brać lekcje i zdać egzamin', badge:'NOWE PRAWO', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Od 18 lat możesz samodzielnie zdać egzamin na prawo jazdy</strong> i je uzyskać. Nie potrzebujesz już opiekuna.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Miałeś/aś już prawo jazdy 2toDrive? Teraz możesz jeździć sam/a.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Uzyskanie prawa jazdy kosztuje</strong> — średnio €1.500 do €2.500.<span class="let-chip">KOSZTY</span>' },
          ], extern:{ url:'https://www.cbr.nl', tekst:'→ Więcej o prawie jazdy i egzaminie przez cbr.nl' } },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'Pomoc dla młodzieży kończy się — opieka dla dorosłych się zaczyna', samenvatting:'Otrzymywałeś pomoc? Sprawdź co się zmienia', badge:'SPRAWDŹ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Pomoc dla młodzieży kończy się gdy kończysz 18 lat.</strong> Porozmawiaj przed urodzinami z opiekunem co jest dostępne potem.<span class="let-chip">WAŻNE</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'W niektórych przypadkach pomoc dla młodzieży można przedłużyć do 23 roku życia. Złóż wniosek na czas w gminie.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Pomoc dla dorosłych poprzez: lekarza rodzinnego, WMO (gmina), zdrowie psychiczne lub pomoc społeczną. JIP może pomóc.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Porozmawiaj <strong>przed 18. urodzinami</strong> z opiekunem lub gminą. Nie czekaj na dzień urodzin.' },
          extern:null },
      ],
      checklist:[
        { tekst:'Zapisany/a do spółdzielni mieszkaniowej', sub:'Zrób to jak najszybciej — listy oczekujących są długie' },
        { tekst:'Decyzja dawcy przekazana', sub:'Przez donorregister.nl' },
        { tekst:'Zasiłek społeczny lub finansowanie studiów złożone (jeśli potrzeba)', sub:'W zależności od sytuacji mieszkaniowej i planów' },
        { tekst:'Obowiązek integracji sprawdzony w gminie', sub:'Jeśli jeszcze się nie zintegrowałeś/aś' },
        { tekst:'Zeznanie podatkowe zapamiętane na przyszły rok', sub:'Co roku w marcu przez belastingdienst.nl' },
        { tekst:'Pomoc dla młodzieży omówiona z gminą', sub:'Jeśli otrzymywałeś/aś pomoc — sprawdź co dalej' },
      ],
    },
  },
};
})();
