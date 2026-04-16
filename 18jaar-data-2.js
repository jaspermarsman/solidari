// TI
(function(){
var d = window._D18 = window._D18 || {};
d.TI = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>እዚ ቅድሚ 18ይ ዕለተ-ልደት ምስ ትወፍሩ ኣዳልዉ።</strong> ገሊኦም ሓገዛት ብኣውቶማቲክ ኣብ መዓልቲ ወዲ/ጓልኩም 18 ዓመት ዝኾነሉ ይቋረጹ። ቅልጡፍ ስጉምቲ ውሰዱ ከይትጉሃሉ።' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'ሓገዝ ቆልዓ (Kinderbijslag)', samenvatting:'ብኣውቶማቲክ ይቋረጽ — ዝግበር ነገር የለን', badge:'ይቋረጽ', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>ሓገዝ ቆልዓ ብኣውቶማቲክ ይቋረጽ</strong> ኣብ መወዳእታ ናይቲ ርብዒ ዓመት ወዲ/ጓልኩም 18 ዝኾነሉ። SVB ባዕሉ ይሰርሖ — ክትሕብሩ ኣይጸናሕኩምን።<span class="stopt-chip">ይቋረጽ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'SVB ደብዳቤ ክሰደልኩም እዩ። ኣድራሻኹም ቅኑዕ ምዃኑ ኣረጋግጹ።' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'ሓገዝ ዝተኣሳሰረ ቆልዓ (Kindgebonden budget)', samenvatting:'ኣብ 18ይ ዕለተ-ልደት ይቋረጽ — ለውጢ ሓብሩ', badge:'ይቋረጽ', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>ሓገዝ ዝተኣሳሰረ ቆልዓ ኣብ መዓልቲ 18ይ ዕለተ-ልደት ይቋረጽ።</strong> ኣዝዩ ዓቢ ለውጢ — ክሳብ ብዙሕ ሚእቲ ዩሮ ኣብ ወርሒ ክኸውን ይኽእል።<span class="stopt-chip">ይቋረጽ</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>ናብ Belastingdienst ሓብሩ</strong> ብ Mijn Toeslagen። እንተዘይሓቢርኩም ዝተወሰኸ ትቕበሉ ናብ ምምላስ ድማ ትግደዱ።<span class="let-chip">ኣስተብህሉ</span>' },
          ], infoBox:{ type:'amber', tekst:'⚠️ ብዝቕልጠፈ ብ <strong>Mijn Toeslagen</strong> ኣብ belastingdienst.nl ሓብሩ።' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ ለውጢ ብ Mijn Toeslagen ሓብሩ' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'DigiD ንወዲ/ጓልኩም', samenvatting:'ቅድሚ 18ይ ዕለተ-ልደት ምልክታ ኣቕርቡ', badge:'ስጉምቲ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ካብ 18 ዓመት ወዲ/ጓልኩም ናቱ/ናታ DigiD የድልዮ</strong> ንሓገዝ ጥዕና፡ ቀረጽ፡ ኩሉ ምስ መንግስቲ ዝምልከት ንጥፈታት።<span class="nieuw-chip">ስጉምቲ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'DigiD ምርካብ 5 ናይ ስራሕ መዓልቲ ይወስድ። ኣብ digid.nl ምልክታ ኣቕርቡ። ወዲ/ጓልኩም ባዕሉ/ባዕላ ክገብሮ/ክገብሮ ኣለዎ/ኣለዋ።' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ DigiD ኣብ digid.nl ምልክታ ኣቕርቡ' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'ናይ ጥዕና ዋሕስ', samenvatting:'ቅድሚ 18 ምስ ዘይተዳለዉ ቅጽዓት ኣሎ', badge:'ናይ መወዳእታ ዕለት', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>ወዲ/ጓልኩም ካብ ናትኩም ናይ ጥዕና ዋሕስ ወጻኢ ይኸውን</strong> 18 ምስ መልአ። ናቱ/ናታ ዋሕስ ክህልዎ/ክህልዋ ኣለዎ/ኣለዋ።<span class="stopt-chip">ናይ መወዳእታ ዕለት</span>' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'ካብ 18 ዓመት ወዲ/ጓልኩም <strong>ሓገዝ ናይ ጥዕና ዋሕስ (zorgtoeslag)</strong> ክሓትት ይኽእል። 2026: ክሳብ €154 ኣብ ወርሒ።<span class="nieuw-chip">ሓድሽ</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ Mijn Toeslagen (belastingdienst.nl) ብ DigiD ምልክታ ኣቕርቡ።' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ ብዛዕባ ሓገዝ ናይ ጥዕና ዋሕስ' } },
      ],
      checklist:[
        { tekst:'DigiD ን ወዲ/ጓልኩም ምልክታ ቀሪቡ', sub:'5 ናይ ስራሕ መዓልቲ ይወስድ — ቕልጡፍ ኩኑ' },
        { tekst:'ናይ ጥዕና ዋሕስ ተዳሊዩ', sub:'ቅድሚ ወይ ኣብ 18ይ ዕለተ-ልደት' },
        { tekst:'ሓገዝ ናይ ጥዕና ዋሕስ ምልክታ ቀሪቡ', sub:'ቅድሚ 18 ምልክታ ምቕራብ ይከኣል' },
        { tekst:'ናይ ባንኪ ሕሳብ ኣብ ስም ወዲ/ጓልኩም', sub:'ሓገዛት ናብ ናቱ/ናታ ሕሳብ ይኸዱ' },
        { tekst:'ለውጢ ሓገዝ ዝተኣሳሰረ ቆልዓ ሓቢርካ', sub:'ብ Mijn Toeslagen ድሕሪ 18ይ ዕለተ-ልደት' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>ኣብ ዝኸዓ መዓልቲ ብዙሕ ይቀያየር።</strong> ወዲ/ጓልኩም ሕጂ ብወግዒ ዓቢ/ዓባይ ኮይኑ/ኮይና ናቱ/ናታ መሰላትን ሓላፍነታትን ኣለዎ/ኣለዋ።' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'ዕብየትን መሰላትን', samenvatting:'ወዲ/ጓልኩም ሕጂ ብሕጊ ዓቢ/ዓባይ ኣዩ/ያ', badge:'ሎሚ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ካብ ሎሚ ወዲ/ጓልኩም ብምሉኡ ሕጋዊ ዓቕሚ ኣለዎ/ኣለዋ።</strong> ናጻ ዝኾኑ ዋዕሎታት ክፍርም/ክፍርም፡ ክመርጽ/ክትመርጽ፡ ናቱ/ናታ ሕጋዊ ሓላፍነት ኣለዎ/ኣለዋ።' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'ወዲ/ጓልኩም ሕጂ ናቱ/ናታ ምዕራፍ ሕክምናዊ ምርጫ ባዕሉ/ባዕላ ይወስን/ትወስን።' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'ሓገዛት: ዝቋረጽ፡ ዝጅምር', samenvatting:'ሓገዝ ቆልዓ ይቋረጽ — ሓገዝ ጥዕና ይጅምር', badge:'ለውጢ', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>ሓገዝ ቆልዓ</strong> ኣብ መወዳእታ ናይቲ ርብዒ ዓመት ይቋረጽ።<span class="stopt-chip">ይቋረጽ</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>ሓገዝ ዝተኣሳሰረ ቆልዓ</strong> ኣብ ዕለተ-ልደት ባዕሉ ይቋረጽ።<span class="stopt-chip">ይቋረጽ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ሓገዝ ናይ ጥዕና ዋሕስ</strong> ይጅምር — ወዲ/ጓልኩም ምልክታ ምስ ዝህብ/ትህብ። ሕጂ ዘይሰርሑ? ሎሚ ግበሩ።<span class="nieuw-chip">ይጅምር</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'ምውህሃድ (inburgering)', samenvatting:'ግዴታ ምውህሃድ ሕጂ ንወዲ/ጓልኩም እውን ይምልከት', badge:'ኣስተብህሉ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>ወዲ/ጓልኩም ድሕሪ 1 ጃንዋሪ 2022 ናብ ሆላንድ ዝመጸ/ዝመጸት ምስ ዝኸውን</strong> ግዴታ ምውህሃድ ሕጂ ናቱ/ናታ እውን ኣዩ/ያ።<span class="let-chip">ኣስተብህሉ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'ወዲ/ጓልኩም ኣብ ምምሕዳር ከቲ ኣቃውሞ ክምዝገብ/ክምዝገብ ኣለዎ/ኣለዋ። ናይ ምውህሃድ ግዜ 3 ዓመት ካብ ዕለት ፍቓድ ምቕማጥ ኣዩ።' },
          ], infoBox:{ type:'blauw', tekst:'💡 ናይ <a href="naturalisatie.html" style="color:var(--blauw)">ምርመራ ዜጋነት</a> ኣብ Solidari ተጠቐሙ።' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>ኣብ ሰሙናትን ኣዋርሕን ድሕሪ 18ይ ዕለተ-ልደት</strong> ወዲ/ጓልኩም ባዕሉ/ባዕላ ዝሰርሖ/ዝሰርሖ ዘለዎ/ዘለዋ ስራሕ ኣሎ። ክትሕግዙ ትኽእሉ፡ ግን ምልክታታት ኣብ ስሙ/ስማ ኣዮም።' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'ሓገዝ ናብርኣ — ናጻ መሰል', samenvatting:'ወዲ/ጓልኩም ናቱ/ናታ ሓገዝ ናብርኣ ዓቅሚ ኣለዎ/ኣለዋ', badge:'ሓድሽ መሰል', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ካብ 18 ዓመት ወዲ/ጓልኩም ናቱ/ናታ ናጻ ሓገዝ ናብርኣ መሰል ኣለዎ/ኣለዋ</strong> ኣታዊ ምስ ዘይህሉዎ/ዘይህሉዋ ከምዘይምሃርን። ካብ ናትኩም ሓገዝ ናጻ ኣዩ/ያ።<span class="nieuw-chip">ሓድሽ መሰል</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'ወዲ/ጓልኩም ምሳኻትኩም ዝነብር/ትነብር ምስ ዝኸውን — ናብ ናትኩም ሓገዝ ክጸሉ ይኽእል። ኣቀዲምኩም ምምሕዳር ከቲ ሕቱ።<span class="let-chip">ርኣዩ</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ ሓገዝ ናብርኣ ኣብ werk.nl ምልክታ ኣቕርቡ' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'ትምህርቲን DUOን', samenvatting:'ሓገዝ ትምህርቲ ምልክታ ኣቕርቡ', badge:'ይከኣል', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ወዲ/ጓልኩም ናብ MBO፡ HBO ወይ ዩኒቨርሲቲ ምስ ከደ/ከደት</strong> ካብ DUO ሓገዝ ትምህርቲ ክሓትት/ክትሓትት ይኽእል/ትኽእል።<span class="nieuw-chip">ሓድሽ</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'ሓገዝ ትምህርቲ ዘይምለስ ዕዳ ኣዩ። ምስ ወዲ/ጓልኩም ብዛዕባ ዛ ዕዳ ዛተዩ።' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ ሓገዝ ትምህርቲ ኣብ duo.nl ምልክታ ኣቕርቡ' } },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'መሰል ምርጫን ምዝገባ ወሃቢ ኣካልን', samenvatting:'ክልተ ሓድሽ ሲቪካዊ መሰላት', badge:'ሓድሽ መሰል', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ወዲ/ጓልኩም ሕጂ ኣብ ምርጫ ክምርጽ/ክትምርጽ ይኽእል/ትኽእል።</strong><span class="nieuw-chip">ሓድሽ መሰል</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'18 ዓመት ዝሞልኡ ኩሎም ብኣውቶማቲክ ከም ወሃቢ ኣካል ይምዝገቡ። ምርጫ ኣብ donorregister.nl ይቅየር።' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ ምርጫ ወሃቢ ኣካል ኣብ donorregister.nl' } },
      ],
      checklist:[
        { tekst:'ናይ ጥዕና ዋሕስን ሓገዝ ናይ ጥዕና ዋሕስን ተዳሊዩ', sub:'ብ Mijn Toeslagen' },
        { tekst:'ኣብ ናይ ቤት ማሕበር ምዝገባ', sub:'ቕልጡፍ ጀምሩ — ዝጽበ ዝዳ ነዊሕ ኣዩ' },
        { tekst:'ምርጫ ወሃቢ ኣካል ሓቢርካ', sub:'ብ donorregister.nl' },
        { tekst:'ሓገዝ ናብርኣ ወይ ሓገዝ ትምህርቲ ምልክታ ቀሪቡ (ምስ ኣድለየ)', sub:'ብ መሰረት ኩነታት ምቕማጥን ትምህርቲን' },
        { tekst:'ግዴታ ምውህሃድ ተፈቲሹ', sub:'ምምሕዳር ከቲ ሕቱ ምስ ዘይምዉህሃድ' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>ገና 18 ኣይኮንካን/ኣይኮንኪን? ቅድሚ ዕለተ-ልደትካ/ኪ ኣዳልዉ።</strong> ጽቡቕ ምስ ትዳለዉ ኣብ 18ይ ዕለተ-ልደትካ/ኪ ዝምለስ ዘሎ ኣይክህሉን ኣዩ።' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'DigiD ምልክታ ኣቕርብ', samenvatting:'ንኩሉ ምስ መንግስቲ ዝምልከት ዝሕጋዝ', badge:'ስጉምቲ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD ዲጂታል ምልክታ ሕጋዊ ናይ ርእስኻ/ኺ ኣዩ</strong> ናብ መንግስቲ። ንሓገዝ ጥዕና፡ ቀረጽ፡ DUO ኩሉ ዘድልየካ/ኺ ኣዩ።<span class="nieuw-chip">ግበሮ/ግበሪ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'ቅድሚ 18 ዓመት ምልክታ ኣቕርብ። digid.nl — ምፍቃድ 5 ናይ ስራሕ መዓልቲ ይወስድ።' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'ናትካ/ኪ ናጻ ኢሜይልን ቁጽሪ ስልክን የድልየካ/ኺ። ናይ ወለድኻ/ኺ ኣይትጠቐም/ኣይትጠቐሚ።' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ DigiD ኣብ digid.nl ምልክታ ኣቕርብ' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'ናይ ጥዕና ዋሕስ ኣዳልዊ', samenvatting:'ካብ ዋሕስ ወለድኻ/ኺ ወጻኢ ኮንካ/ኺ', badge:'ግዴታ', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>ኣብ 18ይ ዕለተ-ልደትካ/ኺ ካብ ናይ ወለድኻ/ኺ ዋሕስ ወጻኢ ኮንካ/ኺ።</strong> ናትካ/ኺ ናጻ ዋሕስ ቅድሚ ወይ ኣብቲ ዕለት ዝህሉ ጌርካ/ኺ ኣዳልዊ።<span class="stopt-chip">ግዴታ</span>' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>ሓገዝ ናይ ጥዕና ዋሕስ ምልክታ ኣቕርብ!</strong> ዝተሓተ ኣታዊ ምስ ዝህሉ ክሳብ €154 ኣብ ወርሒ (2026)። ብ Mijn Toeslagen ምስ DigiD ናትካ/ኺ።<span class="nieuw-chip">ገንዘብ</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ ኣብ <strong>belastingdienst.nl/toeslagen</strong> ምልክታ ኣቕርብ። ቅድሚ 18 ምልክታ ምቕራብ ይከኣል — ካብ ዕለተ-ልደት ይጅምር።' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ ብዛዕባ ሓገዝ ናይ ጥዕና ዋሕስ' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'ናይ ባንኪ ሕሳብ', samenvatting:'ሓገዛት ናብ ናትካ/ኺ ሕሳብ ይኸዱ', badge:'ምኽሪ', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ኣብ ስምካ/ኺ ናይ ባንኪ ሕሳብ ምህላዉ ኣረጋግጽ/ኣረጋግጺ።</strong> ኩሎም ሓገዛት ናብ ሕሳብካ/ኺ ዩም ዝኸዱ።' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'ናይ ቁጠባ ሕሳብ ውን ክፈት/ፊቺ — ንዘይትጽቡቖ ወጻኢ (ናይ ዋሕስ ወጻኢ €165 ኣብ 2026)።' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'DigiD ምልክታ ቀሪቡ ተፈቒዱ', sub:'ቕልጡፍ ምልክታ ኣቕርብ' },
        { tekst:'ናይ ጥዕና ዋሕስ ተዳሊዩ', sub:'ቅድሚ ወይ ኣብ 18ይ ዕለተ-ልደት' },
        { tekst:'ሓገዝ ናይ ጥዕና ዋሕስ ምልክታ ቀሪቡ', sub:'ብ Mijn Toeslagen ምስ DigiD ናትካ/ኺ' },
        { tekst:'ናይ ባንኪ ሕሳብ ኣብ ስምካ/ኺ', sub:'ንምቕባል ሓገዛት የድሊ' },
        { tekst:'ናይ ቁጠባ ሕሳብ ተኸፊቱ', sub:'ቁጠባ ንዘይትጽቡቖ ወጻኢ' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>ሕጂ ብወግዒ 18 ዓመት ምሉእካ/ኺ!</strong> ሕጂ ብሕጊ ዓቢ/ዓባይ ኮንካ/ኺ ሓድሽ መሰላትን ሓላፍነታትን ኣለካ/ኺ።' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'ሕጂ ናጻ ኢኻ/ኺ', samenvatting:'ብሕጊ ዓቢ/ዓባይ — ናትካ/ኺ መሰላትን ሓላፍነታትን', badge:'ሎሚ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ሕጂ ኩሉ ነገር ናጻ ኢኻ/ኺ ትሰርሖ/ትሰርሕዮ</strong> — ዋዕሎ ምፍራም፡ ምርጫ፡ ሕክምናዊ ምርጫ፡ ፍቃድ ምዕዳል ምልክታ ምቕራብ።' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>ዕዳ ኣጸቢቕካ/ኺ ሓሉ:</strong> ካብ 18 ዓመት ዝያዳ ቀሊል ዩ ናይ ዕዳ ምዕዳል ወይ ምልቃሕ። ዕዳ ቅልጡፍ ይዕርጕ።<span class="let-chip">ተጠንቀቕ/ተጠንቀቒ</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'መሰል ምርጫን ምዝገባ ወሃቢ ኣካልን', samenvatting:'ሎሚ ዝጅምሩ ሓድሽ ክልተ መሰላት', badge:'ሓድሽ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ምርጫ:</strong> ሕጂ ክትምርጽ/ክትምርጺ ትኽእል/ትኽእሊ! ኣብ ዝቕጽል ምርጫ ናብ ኣድራሻኻ/ኺ ናይ ምርጫ ወረቐት ይስደደልካ/ኺ።<span class="nieuw-chip">ሓድሽ መሰል</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>ወሃቢ ኣካል ምዝገባ:</strong> ብኣውቶማቲክ ከም ወሃቢ ኣካል ትምዝገብ/ትምዝገቢ። ምርጫ ኣብ donorregister.nl ቀይር/ቀይሪ።' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ ምርጫ ወሃቢ ኣካል ኣብ donorregister.nl ምዝገቡ' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'ምውህሃድ — ፍትሽ ከም ዘሎ', samenvatting:'ግዴታ ምውህሃድ ናትካ/ኺ ኣዩ?', badge:'ፍትሽ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>ድሕሪ 1 ጃንዋሪ 2022 ናብ ሆላንድ ዝመጻኻ/ዝመጻኺ</strong> ከምዝኾንካ/ኮንኺ ከምዘይምውህሃድ ከለካ/ኺ — ግዴታ ምውህሃድ ሕጂ ናትካ/ኺ ኣዩ።<span class="let-chip">ፍትሽ</span>' },
          ], infoBox:{ type:'blauw', tekst:'💡 ናይ <a href="naturalisatie.html" style="color:var(--blauw)">ምርመራ ዜጋነት</a> ኣብ Solidari ብናጻ ተጠቐም/ተጠቐሚ።' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>ሕጂ 18 ዓመት ምሉእካ/ኺ፡ ሓድሽ መሰላት ኣለካ/ኺ።</strong> ገሊኦም ዓቅምታት ባዕልካ/ኺ ምልክታ ምቕራብ የድሊ — ብኣውቶማቲክ ኣይመጸኡን ኣዮም።' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'ሓገዝ ናብርኣ ምልክታ ኣቕርብ', samenvatting:'ኣታዊ ምስ ዘይህሉ ዘምህርን ዘይኮንካ/ኺ', badge:'መሰል', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ሓገዝ ናብርኣ (Participatiewet) ዓቅምኻ/ኺ ኣዩ</strong> ኣታዊ ምስ ዘይህሉ ዘምህርን ዘይኮንካ/ኺ ኣብ ሆላንድ ምስ ትነብር/ትነብሪ።<span class="nieuw-chip">መሰል</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>ምውህሃድን ሓገዝን:</strong> ግዴታ ምውህሃድ ምስ ዝህሉ ንምሕላው ሓገዝ ብንጥፈት ክትሳተፍ/ክትሳተፊ ኣለካ/ኺ።<span class="let-chip">ቅድመ-ኩነት</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ ሓገዝ ናብርኣ ኣብ werk.nl ምልክታ ኣቕርብ' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'ትምህርቲን DUOን', samenvatting:'ሓገዝ ትምህርቲ ምልክታ ኣቕርብ', badge:'ይከኣል', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ናብ MBO፡ HBO ወይ ዩኒቨርሲቲ ዲኻ/ኺ ትኸድ/ትኸዲ?</strong> ካብ DUO ሓገዝ ትምህርቲ ምልክታ ኣቕርብ/ኣቕርቢ (ዕዳ ኣዩ — ድሒሩ ትምልሶ/ትምልሱ)።<span class="nieuw-chip">ሓድሽ</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ ሓገዝ ትምህርቲ ኣብ duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'ቤትን ሓገዝ ኪራይን', samenvatting:'ናይ ቤት ምዝገባ', badge:'ምኽሪ', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>ሕጂ ኣብ ናይ ቤት ማሕበር ምዝገብ/ምዝገቢ።</strong> ዝጽበ ዝዳ ነዊሕ ኣዩ — ሓንሳቡ 5 ክሳብ 10 ዓመት።' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'ናጻ ምስ ትነብር/ትነብሪ ዝተሓተ ኣታዊ ምስ ዝህሉ <strong>ሓገዝ ኪራይ</strong> ምልክታ ኣቕርብ/ኣቕርቢ። 2026 ዋጋ ኪራይ ወሰን: €880.66.<span class="nieuw-chip">ገንዘብ</span>' },
          ], extern:null },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'ሓገዝ መንእሰይ ይቋረጽ — ሓገዝ ዓቢ ይጅምር', samenvatting:'ሓገዝ ትቕበል ዝነበርካ/ኺ? ዝቀያየር ነገር ፍትሽ', badge:'ፍትሽ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>ሓገዝ መንእሰይ ኣብ 18ኛ ዓመት ይቋረጽ።</strong> ቅድሚ ዕለተ-ልደትካ/ኺ ምስ ሓጋዚኻ/ኺ ድሕሪኡ ዝርከብ ዓቀን ዛተ/ዛቲ።<span class="let-chip">ኣገዳሲ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'ሓደ ሓደ ፍርዲ ሓገዝ መንእሰይ ክሳብ 23 ዓመት ክቕጽል ይኽእል። ምምሕዳር ከቲ ሕቱ።' },
          ], infoBox:{ type:'amber', tekst:'⚠️ ምስ ሓጋዚኻ/ኺ ወይ ምምሕዳር ከቲ <strong>ቅድሚ 18ይ ዕለተ-ልደትካ/ኺ</strong> ዛተ/ዛቲ።' },
          extern:null },
      ],
      checklist:[
        { tekst:'ኣብ ናይ ቤት ማሕበር ምዝገባ', sub:'ብዝቕልጠፈ — ዝጽበ ዝዳ ነዊሕ ኣዩ' },
        { tekst:'ምርጫ ወሃቢ ኣካል ሓቢርካ/ኺ', sub:'ብ donorregister.nl' },
        { tekst:'ሓገዝ ናብርኣ ወይ ሓገዝ ትምህርቲ ምልክታ ቀሪቡ (ምስ ኣድለየ)', sub:'ብ መሰረት ኩነታት ምቕማጥን ትምህርቲን' },
        { tekst:'ግዴታ ምውህሃድ ምምሕዳር ከቲ ተፈቲሹ', sub:'ምስ ዘይምዉህሃድ' },
        { tekst:'ናይ ቀረጽ ምምለስ ዝቕጽለ ዓመት ዘክሮ/ዝከሪ', sub:'ኩሉ ዓመት ኣብ ማርቲ belastingdienst.nl' },
        { tekst:'ሓገዝ መንእሰይ ምስ ምምሕዳር ከቲ ዘተ ቀሪቡ', sub:'ሓገዝ ትቕበል ዝነበርካ/ኺ ምስ ዝኾን' },
      ],
    },
  },
};
})();
// UK
(function(){
var d = window._D18 = window._D18 || {};
d.UK = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Вирішіть це до 18-го дня народження.</strong> Деякі виплати автоматично припиняються в день, коли дитині виповнюється 18. Якщо нічого не зробити — можна втратити гроші або отримати зайву суму і мусити повернути.' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'Дитяча допомога (Kinderbijslag)', samenvatting:'Припиняється автоматично — нічого не потрібно', badge:'ПРИПИНЯЄТЬСЯ', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Дитяча допомога припиняється автоматично</strong> в останній день кварталу, в якому дитині виповнюється 18. SVB робить це сам, сповіщати нікого не потрібно.<span class="stopt-chip">ПРИПИНЯЄТЬСЯ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'SVB надішле вам листа. Перевірте актуальність своєї адреси.' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'Допомога на дитину (Kindgebonden budget)', samenvatting:'Припиняється в день 18-річчя — повідомте про зміну', badge:'ПРИПИНЯЄТЬСЯ', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Допомога на дитину припиняється в день 18-річчя.</strong> Це значна зміна — виплата може сягати кількох сотень євро на місяць.<span class="stopt-chip">ПРИПИНЯЄТЬСЯ</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Повідомте Belastingdienst</strong> через Mijn Toeslagen. Інакше отримаєте зайві виплати і мусите їх повернути.<span class="let-chip">УВАГА</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Якщо у вас є інші діти до 18 років, для них допомога продовжується.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Якнайшвидше повідомте про зміну через <strong>Mijn Toeslagen</strong> на belastingdienst.nl, щоб уникнути повернення коштів.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ Повідомити про зміну через Mijn Toeslagen' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'DigiD для дитини', samenvatting:'Подайте заявку задовго до 18-річчя', badge:'ДІЯ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>З 18 років дитині потрібен власний DigiD</strong> для медичної допомоги, податкових декларацій та всіх справ з урядом.<span class="nieuw-chip">ДІЯ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Отримання DigiD займає 5 робочих днів. Подайте заявку на digid.nl. Дитина має зробити це сама.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Переконайтесь, що у дитини є власна електронна пошта та номер телефону для верифікації DigiD.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ Отримати DigiD на digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Оформлення медичного страхування', samenvatting:'Оформити до 18-річчя — інакше штраф', badge:'ДЕДЛАЙН', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>Дитина більше не покривається вашою медичною страховкою</strong> після 18 років. Вона повинна мати власний поліс.<span class="stopt-chip">ДЕДЛАЙН</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Після 18-річчя у дитини є <strong>3 місяці</strong>, щоб оформити страховку без штрафу. Але краще зробити це до 18.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'З 18 років дитина може отримати <strong>допомогу зі страхування (zorgtoeslag)</strong>. У 2026: до €154/місяць (дохід до €40 857).<span class="nieuw-chip">НОВЕ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Обов\'язкова франшиза у 2026 році — <strong>€165</strong>. Дитина сплачує її самостійно.' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>Подача заявки на медичну допомогу:</strong> Дитина має зробити це сама через Mijn Toeslagen. Переконайтесь, що DigiD готовий.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Більше про медичну допомогу на belastingdienst.nl' } },
      ],
      checklist:[
        { tekst:'DigiD оформлено для дитини', sub:'Займає 5 робочих днів — зробіть заздалегідь' },
        { tekst:'Медична страховка оформлена', sub:'До або в день 18-річчя' },
        { tekst:'Медична допомога запрошена (через DigiD дитини)', sub:'Можна подати до 18, починається в день народження' },
        { tekst:'Банківський рахунок на ім\'я дитини', sub:'Виплати надходять на власний рахунок' },
        { tekst:'Зміну допомоги на дитину повідомлено', sub:'Через Mijn Toeslagen після 18-річчя' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>У сам день народження кілька речей змінюються відразу.</strong> Ваша дитина тепер офіційно повнолітня і має власні права та обов\'язки.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Повноліття та права', samenvatting:'Дитина тепер повнолітня за законом', badge:'СЬОГОДНІ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Відтепер дитина має повну правоздатність.</strong> Може самостійно підписувати договори, голосувати і несе особисту відповідальність.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Дитина може самостійно відвідувати лікарів і надавати згоду на медичне лікування.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Дитина тепер може оформити <strong>водійські права</strong>, купувати алкоголь і підписувати договір оренди на своє ім\'я.' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'Виплати: що припиняється, що починається', samenvatting:'Дитяча допомога припиняється — медична починається', badge:'ЗМІНА', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Дитяча допомога</strong> припиняється в останній день кварталу.<span class="stopt-chip">ПРИПИНЯЄТЬСЯ</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>Допомога на дитину</strong> припиняється в сам день народження.<span class="stopt-chip">ПРИПИНЯЄТЬСЯ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Медична допомога</strong> починається — якщо дитина вже подала заявку. Ще ні? Зробіть це сьогодні.<span class="nieuw-chip">ПОЧИНАЄТЬСЯ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Якщо дитина живе самостійно, вона може подати заявку на <strong>житлову допомогу</strong>.<span class="nieuw-chip">ПОЧИНАЄТЬСЯ</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'Інтеграція та статус проживання', samenvatting:'Зобов\'язання щодо інтеграції тепер поширюється і на дитину', badge:'УВАГА', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Якщо дитина приїхала до Нідерландів після 1 січня 2022</strong> і ще не пройшла інтеграцію, зобов\'язання поширюється і на неї. Муніципалітет зв\'яжеться.<span class="let-chip">УВАГА</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Дитина повинна зареєструватися в муніципалітеті. Термін інтеграції — 3 роки з дня отримання дозволу.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Якщо дитина вже пройшла інтеграцію або має звільнення, нічого не змінюється.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Порада:</strong> Скористайтесь <a href="naturalisatie.html" style="color:var(--blauw)">перевіркою натуралізації</a> на Solidari, щоб дізнатись, коли дитина може отримати нідерландський паспорт.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>У тижні та місяці після 18-річчя</strong> є речі, які дитина має вирішити самостійно. Ви можете допомагати, але заявки подаються на ім\'я дитини.' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Соціальна допомога — особисте право', samenvatting:'Дитина має право на власну соціальну допомогу', badge:'НОВЕ ПРАВО', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>З 18 років дитина має власне право на соціальну допомогу</strong>, якщо немає доходу і вона не навчається. Незалежно від вашої допомоги.<span class="nieuw-chip">НОВЕ ПРАВО</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Дитина ще живе з вами? Житлова ситуація враховується при розрахунку допомоги. Запитайте муніципалітет.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Увага:</strong> Якщо дитина живе з вами і подає заявку на соціальну допомогу, це може вплинути на вашу допомогу.<span class="let-chip">ПЕРЕВІРТЕ</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Подати заявку на соціальну допомогу на werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Студентська підтримка та OV-картка', samenvatting:'Якщо дитина навчається', badge:'МОЖЛИВО', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Студентська допомога:</strong> Якщо дитина йде до МВО, ВВО або університету, вона може подати заявку до DUO.<span class="nieuw-chip">НОВЕ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>OV-студентська картка:</strong> Студенти, зареєстровані в DUO, отримують картку для безкоштовних поїздок у непікові години.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Студентська допомога — це позика, яку потрібно буде повернути. Обговоріть це з дитиною.' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Подати заявку на студентську допомогу на duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Самостійне проживання', samenvatting:'Житлова допомога та реєстрація в житловому товаристві', badge:'ПОРАДА', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Зареєструйте дитину в житловому товаристві</strong> щойно їй виповниться 18. Черги на соціальне житло довгі.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Якщо дитина живе самостійно з низьким доходом, вона може отримати <strong>житлову допомогу</strong>. Межа оренди 2026: €880,66/місяць.<span class="nieuw-chip">НОВЕ</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Право голосу та реєстрація донора', samenvatting:'Два нові громадянські права', badge:'НОВЕ ПРАВО', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Право голосу:</strong> Дитина тепер може голосувати на місцевих, провінційних і загальнонаціональних виборах.<span class="nieuw-chip">НОВЕ ПРАВО</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Реєстрація донора:</strong> Усі 18-річні автоматично реєструються як донори (якщо не заперечують). Дитина отримає листа і може оновити вибір на donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Оновити вибір донора на donorregister.nl' } },
      ],
      checklist:[
        { tekst:'Медичне страхування оформлено та допомога запрошена', sub:'Через Mijn Toeslagen' },
        { tekst:'Зареєстровано в житловому товаристві', sub:'Починайте рано — черги довгі' },
        { tekst:'Вибір донора поданий', sub:'Через donorregister.nl' },
        { tekst:'Соціальну допомогу або студентську підтримку запрошено (якщо потрібно)', sub:'Залежно від житлової ситуації та навчання' },
        { tekst:'Зобов\'язання щодо інтеграції перевірено', sub:'Запитайте муніципалітет, якщо ще не інтегровані' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>Ще не 18? Вирішіть це до свого дня народження.</strong> Якщо добре підготуватися, у 18 нічого термінового не буде.' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'Отримайте DigiD', samenvatting:'Необхідний майже для всіх справ з урядом', badge:'ДІЯ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD — ваше цифрове посвідчення особи</strong> для уряду. Необхідний для медичної допомоги, податкових декларацій, реєстрації в DUO тощо.<span class="nieuw-chip">ЗРОБІТЬ ЦЕ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Можна подати заявку до 18 років. Зверніться на digid.nl — активація займає 5 робочих днів.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Вам потрібна власна електронна пошта та номер телефону. Не використовуйте пошту батьків.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ Отримати DigiD на digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'Оформіть власну медичну страховку', samenvatting:'Ви більше не покриваєтесь страховкою батьків', badge:'ОБОВ\'ЯЗКОВО', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>Після 18 ви більше не покриваєтесь медичною страховкою батьків.</strong> Оформіть власний поліс до або в день народження.<span class="stopt-chip">ОБОВ\'ЯЗКОВО</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Після дня народження у вас є 3 місяці, щоб оформити страховку без штрафу. Але не зволікайте.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>Подайте заявку на медичну допомогу!</strong> До €154/місяць при низькому доході (2026). Через Mijn Toeslagen з вашим DigiD.<span class="nieuw-chip">ГРОШІ</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ Подайте заявку на <strong>belastingdienst.nl/toeslagen</strong>. Можна до 18 — допомога починається в день народження.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ Більше про медичну допомогу' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'Власний банківський рахунок та накопичення', samenvatting:'Виплати надходять на ваш власний рахунок', badge:'ПОРАДА', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Переконайтесь, що у вас є банківський рахунок на своє ім\'я.</strong> Всі допомоги виплачуються на ваш рахунок.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Більшість банків дозволяють відкрити рахунок до 18 років. Запитайте в своєму банку.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Відкрийте також ощадний рахунок</strong> — резерв на непередбачені витрати (франшиза €165 у 2026).' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'DigiD оформлено та активовано', sub:'Подайте заявку заздалегідь' },
        { tekst:'Медична страховка оформлена', sub:'До або в день 18-річчя' },
        { tekst:'Медична допомога запрошена', sub:'Через Mijn Toeslagen з вашим DigiD' },
        { tekst:'Банківський рахунок на власне ім\'я', sub:'Необхідний для отримання виплат' },
        { tekst:'Ощадний рахунок відкрито', sub:'Резерв на франшизу та непередбачені витрати' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>Вітаємо — вам офіційно 18!</strong> Ви тепер повнолітні за законом і маєте нові права та обов\'язки.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'Ви тепер самостійні', samenvatting:'Повнолітні за законом — власні права та відповідальність', badge:'СЬОГОДНІ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Тепер ви можете вирішувати все самостійно</strong> — підписувати договори, голосувати, приймати медичні рішення, оформляти права.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'Тепер ви особисто <strong>відповідаєте</strong> за свої дії. Борги, які ви робите, — ваші борги.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Уважайте на борги:</strong> Після 18 легше купувати в кредит або брати позику. Борги накопичуються швидко.<span class="let-chip">БУДЬТЕ ОБЕРЕЖНІ</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'Право голосу та реєстрація донора', samenvatting:'Два нових права, що набирають чинності сьогодні', badge:'НОВЕ', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Право голосу:</strong> Ви тепер можете голосувати! На наступних виборах отримаєте виборчу картку автоматично.<span class="nieuw-chip">НОВЕ ПРАВО</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Реєстрація донора:</strong> Ви будете автоматично зареєстровані як донор, якщо не заперечите. Оберіть свідомо на donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ Зафіксуйте вибір донора на donorregister.nl' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'Інтеграція — перевірте це', samenvatting:'Чи поширюється на вас зобов\'язання щодо інтеграції?', badge:'ПЕРЕВІРТЕ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Якщо ви приїхали до Нідерландів після 1 січня 2022</strong> і ще не пройшли інтеграцію, зобов\'язання поширюється і на вас.<span class="let-chip">ПЕРЕВІРТЕ</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Вже проходите інтеграцію? Тоді просто продовжуйте.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>Порада:</strong> Скористайтесь безкоштовною <a href="naturalisatie.html" style="color:var(--blauw)">перевіркою натуралізації</a> на Solidari.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>Тепер, коли вам 18, у вас є нові права.</strong> На деякі речі потрібно подавати заявки самостійно — вони не приходять автоматично.' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'Подача заявки на соціальну допомогу', samenvatting:'Якщо немає доходу і ви не навчаєтесь', badge:'ПРАВО', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Ви маєте право на соціальну допомогу (Participatiewet)</strong>, якщо немає доходу, не навчаєтесь і живете в Нідерландах. Незалежно від батьків.<span class="nieuw-chip">ПРАВО</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Ще живете з батьками? Житлова ситуація враховується. Зверніться до муніципалітету.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Інтеграція та допомога:</strong> Якщо є зобов\'язання щодо інтеграції, потрібно активно брати участь для збереження допомоги.<span class="let-chip">УМОВА</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ Подати заявку на соціальну допомогу на werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'Навчання та DUO', samenvatting:'Подача заявки на студентську допомогу та OV-картку', badge:'МОЖЛИВО', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Збираєтесь навчатись?</strong> Подайте заявку на студентську допомогу до DUO (базова позика + можлива додаткова стипендія).<span class="nieuw-chip">НОВЕ</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>OV-студентська картка</strong> дає безкоштовні поїздки у непікові години.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'Студентська допомога — це <strong>позика</strong>, яку потрібно повернути. Беріть лише те, що дійсно потрібно.<span class="let-chip">ПОЗИКА</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ Подати заявку на студентську допомогу на duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'Житло та житлова допомога', samenvatting:'Реєстрація на соціальне житло', badge:'ПОРАДА', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>Зареєструйтесь у житловому товаристві зараз.</strong> Черги довгі — іноді 5–10 років.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'При самостійному проживанні та низькому доході можна подати заявку на <strong>житлову допомогу</strong>. Межа оренди 2026: €880,66.<span class="nieuw-chip">ГРОШІ</span>' },
          ], extern:null },
        { icoon:'📊', kleur:'#EBF3EE', naam:'Податкова декларація', samenvatting:'Щороку в березні/квітні', badge:'ЩОРІЧНО', badgeKleur:'let',
          punten:[
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>Щороку подавайте податкову декларацію</strong>, якщо є дохід. Через DigiD на Mijn Belastingdienst.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'При низькому доході іноді повертають гроші. Завжди подавайте декларацію.' },
          ], extern:{ url:'https://www.belastingdienst.nl', tekst:'→ Податкова декларація на belastingdienst.nl' } },
        { icoon:'🚗', kleur:'#F5F3FF', naam:'Водійські права', samenvatting:'Тепер можна брати уроки та отримати права', badge:'НОВЕ ПРАВО', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>З 18 років можна самостійно складати іспит</strong> і отримати водійські права. Супроводжуючий більше не потрібен.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Вже мали права 2toDrive? Тепер можете їздити самостійно.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Отримання прав коштує грошей</strong> — середній курс €1 500–€2 500.<span class="let-chip">ВИТРАТИ</span>' },
          ], extern:{ url:'https://www.cbr.nl', tekst:'→ Більше про водійські права на cbr.nl' } },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'Підтримка молоді закінчується — дорослий догляд починається', samenvatting:'Отримували підтримку? Перевірте, що змінюється', badge:'ПЕРЕВІРТЕ', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>Підтримка молоді припиняється після 18.</strong> Поговоріть з куратором до дня народження про те, що буде далі.<span class="let-chip">ВАЖЛИВО</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'У деяких випадках підтримку можна продовжити до 23 років. Подайте заявку вчасно в муніципалітеті.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'Підтримка дорослих: сімейний лікар, WMO (муніципалітет), психічне здоров\'я або соціальна робота. JIP може допомогти.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ Поговоріть з куратором або муніципалітетом <strong>до свого 18-річчя</strong>. Не чекайте до дня народження.' },
          extern:null },
      ],
      checklist:[
        { tekst:'Зареєстровано в житловому товаристві', sub:'Якнайшвидше — черги довгі' },
        { tekst:'Вибір донора поданий', sub:'Через donorregister.nl' },
        { tekst:'Соціальну допомогу або студентську підтримку запрошено (якщо потрібно)', sub:'Залежно від житлової ситуації та планів' },
        { tekst:'Зобов\'язання щодо інтеграції перевірено в муніципалітеті', sub:'Якщо ще не інтегровані' },
        { tekst:'Пам\'ятайте про податкову декларацію наступного року', sub:'Щороку в березні на belastingdienst.nl' },
        { tekst:'Підтримка молоді обговорена з муніципалітетом', sub:'Якщо отримували підтримку' },
      ],
    },
  },
};
})();
// FA
(function(){
var d = window._D18 = window._D18 || {};
d.FA = {
  ouder: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>این کارها را قبل از هجدهمین تولد انجام دهید.</strong> برخی کمک‌هزینه‌ها در روزی که فرزندتان ۱۸ ساله می‌شود به‌طور خودکار قطع می‌شوند. اگر اقدامی نکنید ممکن است پول از دست بدهید یا مبلغ اضافی دریافت کنید که باید برگردانید. از پیش برنامه‌ریزی کنید.' },
      categorieen: [
        { icoon:'💰', kleur:'#FDF3E0', naam:'کمک‌هزینه کودک (Kinderbijslag)', samenvatting:'به‌طور خودکار قطع می‌شود — نیازی به اقدام نیست', badge:'قطع می‌شود', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>کمک‌هزینه کودک به‌طور خودکار قطع می‌شود</strong> در آخرین روز سه‌ماهه‌ای که فرزندتان ۱۸ ساله می‌شود. نیازی به اطلاع‌رسانی نیست — SVB خودش این کار را می‌کند.<span class="stopt-chip">قطع می‌شود</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'SVB برای شما نامه می‌فرستد. مطمئن شوید آدرستان در سیستم آن‌ها به‌روز است.' },
          ], extern:null },
        { icoon:'👶', kleur:'#EBF3EE', naam:'کمک‌هزینه مرتبط با کودک (Kindgebonden budget)', samenvatting:'در روز هجدهمین تولد قطع می‌شود — تغییر را اطلاع دهید', badge:'قطع می‌شود', badgeKleur:'stopt',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>کمک‌هزینه مرتبط با کودک در روز هجدهمین تولد قطع می‌شود.</strong> این تغییر مهمی است — این کمک‌هزینه می‌تواند صدها یورو در ماه باشد.<span class="stopt-chip">قطع می‌شود</span>' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>به Belastingdienst اطلاع دهید</strong> از طریق Mijn Toeslagen. در غیر این صورت مبلغ اضافی دریافت می‌کنید و باید برگردانید.<span class="let-chip">توجه</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'اگر فرزندان دیگری زیر ۱۸ سال دارید، کمک‌هزینه برای آن‌ها ادامه می‌یابد.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ هرچه زودتر تغییر را از طریق <strong>Mijn Toeslagen</strong> در belastingdienst.nl اطلاع دهید تا از درخواست بازپرداخت جلوگیری شود.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/hoe-geef-ik-wijzigingen-door', tekst:'→ اطلاع‌رسانی تغییر از طریق Mijn Toeslagen' } },
        { icoon:'📋', kleur:'#EFF6FF', naam:'DigiD برای فرزندتان', samenvatting:'خیلی قبل از هجدهمین تولد درخواست دهید', badge:'اقدام', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>فرزندتان از ۱۸ سالگی به DigiD شخصی خود نیاز دارد</strong> برای کمک‌هزینه بهداشتی، اظهارنامه مالیاتی و همه کارهای دولتی.<span class="nieuw-chip">اقدام</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'دریافت DigiD ۵ روز کاری طول می‌کشد. از digid.nl درخواست دهید. فرزندتان باید این کار را خودش انجام دهد.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'مطمئن شوید فرزندتان ایمیل و شماره تلفن شخصی خود را برای تأیید DigiD دارد.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ دریافت DigiD در digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'ترتیب بیمه درمانی', samenvatting:'قبل از ۱۸ سالگی بگیرید — وگرنه جریمه', badge:'ددلاین', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>فرزندتان دیگر تحت پوشش بیمه درمانی شما نیست</strong> وقتی ۱۸ ساله می‌شود. باید بیمه شخصی خود را داشته باشد.<span class="stopt-chip">ددلاین</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'فرزندتان <strong>۳ ماه</strong> پس از تولد برای بیمه‌کردن بدون جریمه وقت دارد. اما بهتر است قبل از ۱۸ ترتیب دهید.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'از ۱۸ سالگی فرزندتان می‌تواند <strong>کمک‌هزینه درمانی (zorgtoeslag)</strong> درخواست کند. در ۲۰۲۶: حداکثر ۱۵۴ یورو در ماه.<span class="nieuw-chip">جدید</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'فرانشیز اجباری در ۲۰۲۶ <strong>۱۶۵ یورو</strong> است. فرزندتان خودش می‌پردازد.' },
          ], infoBox:{ type:'groen', tekst:'✅ <strong>درخواست کمک‌هزینه درمانی:</strong> فرزندتان باید این کار را خودش از طریق Mijn Toeslagen انجام دهد. مطمئن شوید DigiD آماده است.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ اطلاعات بیشتر درباره کمک‌هزینه درمانی' } },
      ],
      checklist:[
        { tekst:'DigiD برای فرزندتان درخواست داده شد', sub:'۵ روز کاری طول می‌کشد — زود اقدام کنید' },
        { tekst:'بیمه درمانی برای فرزندتان ترتیب داده شد', sub:'قبل یا در روز هجدهمین تولد' },
        { tekst:'کمک‌هزینه درمانی درخواست داده شد (از DigiD فرزند)', sub:'می‌توان قبل از ۱۸ درخواست داد، از روز تولد شروع می‌شود' },
        { tekst:'حساب بانکی به نام فرزندتان', sub:'کمک‌هزینه‌ها به حساب خودش واریز می‌شود' },
        { tekst:'تغییر کمک‌هزینه مرتبط با کودک اطلاع داده شد', sub:'از طریق Mijn Toeslagen پس از ۱۸ سالگی' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>در خود روز تولد چند چیز فوری تغییر می‌کند.</strong> فرزندتان اکنون رسماً بزرگسال است و حقوق و مسئولیت‌های خود را دارد.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'بزرگسالی و حقوق', samenvatting:'فرزندتان اکنون از نظر قانونی بزرگسال است', badge:'امروز', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>از امروز فرزندتان اهلیت قانونی کامل دارد.</strong> می‌تواند مستقلاً قرارداد امضا کند، رأی دهد و شخصاً مسئول اعمالش است.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'فرزندتان می‌تواند به‌تنهایی به پزشک برود و رضایت‌نامه پزشکی بدهد.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'فرزندتان اکنون می‌تواند <strong>گواهینامه رانندگی</strong> بگیرد، الکل بخرد و قرارداد اجاره به نام خود امضا کند.' },
          ], extern:null },
        { icoon:'💶', kleur:'#EBF3EE', naam:'کمک‌هزینه‌ها: چه قطع می‌شود، چه شروع می‌شود', samenvatting:'کمک‌هزینه کودک قطع می‌شود — کمک بهداشتی شروع می‌شود', badge:'تغییر', badgeKleur:'let',
          punten:[
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>کمک‌هزینه کودک</strong> در آخرین روز سه‌ماهه قطع می‌شود.<span class="stopt-chip">قطع می‌شود</span>' },
            { icoon:'✗', kleur:'#FEF2F2', tekst:'<strong>کمک‌هزینه مرتبط با کودک</strong> در خود روز تولد قطع می‌شود.<span class="stopt-chip">قطع می‌شود</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>کمک‌هزینه درمانی</strong> شروع می‌شود — اگر فرزندتان قبلاً درخواست داده باشد. هنوز نداده؟ امروز اقدام کنید.<span class="nieuw-chip">شروع می‌شود</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'اگر فرزندتان مستقل زندگی می‌کند می‌تواند به نام خود <strong>کمک‌هزینه اجاره</strong> درخواست دهد.<span class="nieuw-chip">شروع می‌شود</span>' },
          ], extern:null },
        { icoon:'📝', kleur:'#FDF3E0', naam:'ادغام و وضعیت اقامت', samenvatting:'تعهد ادغام اکنون برای فرزند هم اعمال می‌شود', badge:'توجه', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>اگر فرزندتان بعد از ۱ ژانویه ۲۰۲۲ به هلند آمده</strong> و هنوز ادغام نشده، تعهد ادغام اکنون برای او هم اعمال می‌شود. شهرداری تماس می‌گیرد.<span class="let-chip">توجه</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'فرزندتان باید در شهرداری ثبت‌نام کند. مدت ادغام ۳ سال از تاریخ مجوز اقامت است.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'اگر فرزندتان قبلاً ادغام شده یا معافیت دارد، چیزی تغییر نمی‌کند.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>نکته:</strong> از <a href="naturalisatie.html" style="color:var(--blauw)">بررسی تابعیت</a> در Solidari استفاده کنید تا بدانید فرزندتان چه زمانی می‌تواند پاسپورت هلندی بگیرد.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>در هفته‌ها و ماه‌های بعد از هجدهمین تولد</strong> کارهایی هست که فرزندتان باید خودش ترتیب دهد.' },
      categorieen: [
        { icoon:'🏦', kleur:'#EBF3EE', naam:'کمک معیشتی — حق شخصی', samenvatting:'فرزندتان حق کمک معیشتی شخصی دارد', badge:'حق جدید', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>از ۱۸ سالگی فرزندتان حق شخصی کمک معیشتی دارد</strong> اگر درآمدی ندارد و درس نمی‌خواند. مستقل از کمک‌هزینه شما.<span class="nieuw-chip">حق جدید</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'فرزندتان هنوز با شما زندگی می‌کند؟ وضعیت سکونت در محاسبه کمک لحاظ می‌شود. از شهرداری بپرسید.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>توجه:</strong> اگر فرزندتان با شما زندگی می‌کند و درخواست کمک معیشتی دهد، ممکن است روی کمک‌هزینه شما تأثیر بگذارد.<span class="let-chip">بررسی کنید</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ درخواست کمک معیشتی در werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'تحصیل و DUO', samenvatting:'درخواست کمک تحصیلی و کارت حمل‌ونقل', badge:'ممکن', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>کمک تحصیلی:</strong> اگر فرزندتان به MBO، HBO یا دانشگاه می‌رود، می‌تواند از DUO درخواست کند (وام پایه + احتمالاً کمک‌هزینه تکمیلی).<span class="nieuw-chip">جدید</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>کارت OV دانشجویی:</strong> دانشجویان ثبت‌نام‌شده در DUO کارت سفر رایگان در ساعات غیراوج دریافت می‌کنند.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'کمک تحصیلی وامی است که باید بازپرداخت شود. این را با فرزندتان در میان بگذارید.' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ درخواست کمک تحصیلی در duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'زندگی مستقل', samenvatting:'کمک‌هزینه اجاره و ثبت‌نام در شرکت مسکن', badge:'توصیه', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>فرزندتان را در یک شرکت مسکن ثبت‌نام کنید</strong> به‌محض اینکه ۱۸ ساله شد. لیست انتظار طولانی است.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'اگر فرزندتان مستقل زندگی می‌کند و درآمد کمی دارد می‌تواند <strong>کمک‌هزینه اجاره</strong> درخواست دهد. سقف اجاره ۲۰۲۶: ۸۸۰٫۶۶ یورو.<span class="nieuw-chip">جدید</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'حق رأی و ثبت اهدای عضو', samenvatting:'دو حق مدنی جدید', badge:'حق جدید', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>حق رأی:</strong> فرزندتان اکنون می‌تواند در انتخابات محلی، استانی و ملی رأی دهد.<span class="nieuw-chip">حق جدید</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>ثبت اهدای عضو:</strong> همه ۱۸ساله‌ها به‌طور خودکار به عنوان اهداکننده ثبت می‌شوند (مگر اعتراض کنند). فرزندتان نامه می‌گیرد و می‌تواند از donorregister.nl تغییر دهد.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ تغییر انتخاب اهدا در donorregister.nl' } },
      ],
      checklist:[
        { tekst:'بیمه درمانی و کمک‌هزینه بهداشتی ترتیب داده شد', sub:'از طریق Mijn Toeslagen' },
        { tekst:'ثبت‌نام در شرکت مسکن', sub:'زود شروع کنید — لیست انتظار طولانی است' },
        { tekst:'انتخاب اهدا ثبت شد', sub:'از طریق donorregister.nl' },
        { tekst:'کمک معیشتی یا کمک تحصیلی درخواست داده شد (در صورت نیاز)', sub:'بسته به وضعیت سکونت و تحصیل' },
        { tekst:'تعهد ادغام بررسی شد', sub:'از شهرداری بپرسید اگر هنوز ادغام نشده‌اید' },
      ],
    },
  },
  kind: {
    voor: {
      intro: { icoon:'⏰', tekst:'<strong>هنوز ۱۸ نشده‌اید؟ این کارها را قبل از تولدتان انجام دهید.</strong> اگر آماده باشید، در روز ۱۸ سالگی‌تان نیازی به عجله نخواهید داشت.' },
      categorieen: [
        { icoon:'🔑', kleur:'#EFF6FF', naam:'درخواست DigiD', samenvatting:'برای تقریباً همه کارهای دولتی لازم است', badge:'اقدام', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>DigiD شناسه دیجیتال شما</strong> برای دولت است. برای کمک‌هزینه درمانی، اظهارنامه مالیاتی، ثبت‌نام در DUO و موارد دیگر لازم است.<span class="nieuw-chip">این کار را بکنید</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'می‌توانید قبل از ۱۸ سالگی DigiD درخواست دهید. از digid.nl اقدام کنید — فعال‌سازی ۵ روز کاری طول می‌کشد.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'به ایمیل و شماره تلفن شخصی خودتان نیاز دارید. از ایمیل والدینتان استفاده نکنید.' },
          ], extern:{ url:'https://www.digid.nl/aanvragen-en-activeren/aanvragen/', tekst:'→ دریافت DigiD در digid.nl' } },
        { icoon:'🏥', kleur:'#FDF3E0', naam:'ترتیب بیمه درمانی شخصی', samenvatting:'دیگر تحت پوشش بیمه والدین نیستید', badge:'اجباری', badgeKleur:'stopt',
          punten:[
            { icoon:'!', kleur:'#FEF2F2', tekst:'<strong>در روز ۱۸ سالگی دیگر تحت پوشش بیمه والدینتان نیستید.</strong> باید قبل یا در روز تولدتان بیمه شخصی بگیرید.<span class="stopt-chip">اجباری</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'۳ ماه پس از تولد برای بیمه‌شدن بدون جریمه وقت دارید. اما تأخیر نکنید.' },
            { icoon:'💰', kleur:'#EBF3EE', tekst:'<strong>کمک‌هزینه درمانی درخواست دهید!</strong> با درآمد کم تا ۱۵۴ یورو در ماه (۲۰۲۶). از طریق Mijn Toeslagen با DigiD خودتان.<span class="nieuw-chip">پول</span>' },
          ], infoBox:{ type:'groen', tekst:'✅ از <strong>belastingdienst.nl/toeslagen</strong> درخواست دهید. می‌توان قبل از ۱۸ اقدام کرد — از روز تولد شروع می‌شود.' },
          extern:{ url:'https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/zorgtoeslag', tekst:'→ اطلاعات بیشتر درباره کمک‌هزینه درمانی' } },
        { icoon:'🏦', kleur:'#EBF3EE', naam:'حساب بانکی و پس‌انداز شخصی', samenvatting:'کمک‌هزینه‌ها به حساب خودتان واریز می‌شود', badge:'توصیه', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>مطمئن شوید حساب بانکی به نام خودتان دارید.</strong> همه کمک‌هزینه‌ها به حساب شما واریز می‌شود.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'اکثر بانک‌ها قبل از ۱۸ سالگی اجازه باز کردن حساب می‌دهند. از بانکتان بپرسید.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>یک حساب پس‌انداز هم باز کنید</strong> — ذخیره‌ای برای هزینه‌های غیرمنتظره مثل فرانشیز ۱۶۵ یوروی بیمه درمانی (۲۰۲۶).' },
          ], extern:null },
      ],
      checklist:[
        { tekst:'DigiD درخواست داده و فعال شده', sub:'زود اقدام کنید' },
        { tekst:'بیمه درمانی ترتیب داده شد', sub:'قبل یا در روز هجدهمین تولد' },
        { tekst:'کمک‌هزینه درمانی درخواست داده شد', sub:'از طریق Mijn Toeslagen با DigiD خودتان' },
        { tekst:'حساب بانکی به نام خودتان', sub:'برای دریافت کمک‌هزینه‌ها لازم است' },
        { tekst:'حساب پس‌انداز باز شد', sub:'ذخیره برای فرانشیز و هزینه‌های غیرمنتظره' },
      ],
    },
    op: {
      intro: { icoon:'🎂', tekst:'<strong>تبریک — رسماً ۱۸ ساله شدید!</strong> اکنون از نظر قانونی بزرگسال هستید و حقوق و مسئولیت‌های جدیدی دارید.' },
      categorieen: [
        { icoon:'⚖️', kleur:'#F5F3FF', naam:'شما اکنون مستقل هستید', samenvatting:'بزرگسال قانونی — حقوق و مسئولیت‌های شخصی', badge:'امروز', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>اکنون می‌توانید همه چیز را مستقلاً ترتیب دهید</strong> — امضای قرارداد، رأی دادن، تصمیمات پزشکی، درخواست گواهینامه رانندگی.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'اکنون شخصاً <strong>مسئول</strong> اعمالتان هستید. بدهی‌هایی که می‌کنید بدهی خودتان است.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>مراقب بدهی باشید:</strong> از ۱۸ سالگی راحت‌تر می‌توان به اقساط خرید یا قرض گرفت. بدهی‌ها سریع انباشته می‌شوند.<span class="let-chip">احتیاط کنید</span>' },
          ], extern:null },
        { icoon:'🗳️', kleur:'#EBF3EE', naam:'حق رأی و ثبت اهدای عضو', samenvatting:'دو حق جدید که از امروز اعمال می‌شود', badge:'جدید', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>حق رأی:</strong> اکنون می‌توانید رأی دهید! در انتخابات بعدی کارت رأی‌گیری به‌طور خودکار به آدرستان می‌رسد.<span class="nieuw-chip">حق جدید</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>ثبت اهدای عضو:</strong> به‌طور خودکار به عنوان اهداکننده ثبت می‌شوید مگر اعتراض کنید. آگاهانه انتخاب کنید در donorregister.nl.' },
          ], extern:{ url:'https://www.donorregister.nl', tekst:'→ ثبت انتخاب اهدا در donorregister.nl' } },
        { icoon:'📋', kleur:'#FDF3E0', naam:'ادغام — این را بررسی کنید', samenvatting:'آیا تعهد ادغام برای شما اعمال می‌شود؟', badge:'بررسی', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>اگر بعد از ۱ ژانویه ۲۰۲۲ به هلند آمدید</strong> و هنوز ادغام نشده‌اید، تعهد ادغام اکنون برای شما هم اعمال می‌شود.<span class="let-chip">بررسی</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'در حال ادغام هستید؟ پس ادامه می‌دهید. الان نیازی به کار اضافه نیست.' },
          ], infoBox:{ type:'blauw', tekst:'💡 <strong>نکته:</strong> از <a href="naturalisatie.html" style="color:var(--blauw)">بررسی تابعیت</a> رایگان در Solidari استفاده کنید تا بدانید چه زمانی می‌توانید پاسپورت هلندی بگیرید.' },
          extern:null },
      ],
      checklist:null,
    },
    na: {
      intro: { icoon:'→', tekst:'<strong>اکنون که ۱۸ ساله شدید، حقوق جدیدی دارید.</strong> برخی چیزها را باید خودتان درخواست دهید — به‌طور خودکار نمی‌آیند.' },
      categorieen: [
        { icoon:'💶', kleur:'#EBF3EE', naam:'درخواست کمک معیشتی', samenvatting:'اگر درآمدی ندارید و درس نمی‌خوانید', badge:'حق', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>حق کمک معیشتی (Participatiewet) دارید</strong> اگر درآمدی ندارید، درس نمی‌خوانید و در هلند زندگی می‌کنید. این حق شخصی شماست — مستقل از والدین.<span class="nieuw-chip">حق</span>' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'هنوز با والدینتان زندگی می‌کنید؟ وضعیت سکونت در محاسبه لحاظ می‌شود. به شهرداری مراجعه کنید.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>ادغام و کمک معیشتی:</strong> اگر تعهد ادغام دارید، باید برای حفظ کمک فعالانه در ادغام شرکت کنید.<span class="let-chip">شرط</span>' },
          ], extern:{ url:'https://www.werk.nl/werkzoekenden/uitkering-aanvragen/', tekst:'→ درخواست کمک معیشتی در werk.nl' } },
        { icoon:'🎓', kleur:'#EFF6FF', naam:'تحصیل و DUO', samenvatting:'درخواست کمک تحصیلی و کارت OV', badge:'ممکن', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>می‌خواهید تحصیل کنید؟</strong> از DUO کمک تحصیلی درخواست دهید (وام پایه + احتمالاً کمک‌هزینه تکمیلی).<span class="nieuw-chip">جدید</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>کارت OV دانشجویی</strong> سفر رایگان در ساعات غیراوج می‌دهد.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'کمک تحصیلی <strong>وامی</strong> است که باید بازپرداخت شود. فقط آنچه واقعاً نیاز دارید قرض بگیرید.<span class="let-chip">وام</span>' },
          ], extern:{ url:'https://duo.nl/particulier/student-hbo-universiteit/studiefinanciering-aanvragen.jsp', tekst:'→ درخواست کمک تحصیلی در duo.nl' } },
        { icoon:'🏠', kleur:'#FDF3E0', naam:'مسکن و کمک‌هزینه اجاره', samenvatting:'ثبت‌نام برای مسکن اجتماعی', badge:'توصیه', badgeKleur:'let',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>همین الان در یک شرکت مسکن ثبت‌نام کنید.</strong> لیست انتظار طولانی است — گاهی ۵ تا ۱۰ سال.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'اگر مستقل زندگی می‌کنید و درآمد کمی دارید می‌توانید <strong>کمک‌هزینه اجاره</strong> درخواست دهید. سقف اجاره ۲۰۲۶: ۸۸۰٫۶۶ یورو.<span class="nieuw-chip">پول</span>' },
          ], extern:null },
        { icoon:'📊', kleur:'#EBF3EE', naam:'اظهارنامه مالیاتی', samenvatting:'هر سال در مارس/آوریل', badge:'سالانه', badgeKleur:'let',
          punten:[
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'<strong>هر سال اظهارنامه مالیاتی پر می‌کنید</strong> اگر درآمد دارید. با DigiD از طریق Mijn Belastingdienst.' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'اگر کم درآمد داشتید گاهی پول پس می‌گیرید. همیشه اظهارنامه بدهید.' },
          ], extern:{ url:'https://www.belastingdienst.nl', tekst:'→ اظهارنامه مالیاتی در belastingdienst.nl' } },
        { icoon:'🚗', kleur:'#F5F3FF', naam:'گواهینامه رانندگی', samenvatting:'اکنون می‌توانید درس بگیرید و گواهینامه بگیرید', badge:'حق جدید', badgeKleur:'nieuw',
          punten:[
            { icoon:'✓', kleur:'#EBF3EE', tekst:'<strong>از ۱۸ سالگی می‌توانید مستقلاً آزمون رانندگی بدهید.</strong> دیگر نیازی به همراه ندارید.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'قبلاً گواهینامه 2toDrive داشتید؟ اکنون می‌توانید به‌تنهایی برانید.' },
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>گرفتن گواهینامه هزینه دارد</strong> — دوره متوسط ۱۵۰۰ تا ۲۵۰۰ یورو.<span class="let-chip">هزینه</span>' },
          ], extern:{ url:'https://www.cbr.nl', tekst:'→ اطلاعات بیشتر درباره گواهینامه در cbr.nl' } },
        { icoon:'🤝', kleur:'#FDF3E0', naam:'حمایت از نوجوانان تمام می‌شود — مراقبت بزرگسالان شروع می‌شود', samenvatting:'حمایت دریافت می‌کردید؟ بررسی کنید چه تغییری می‌کند', badge:'بررسی', badgeKleur:'let',
          punten:[
            { icoon:'!', kleur:'#FDF3E0', tekst:'<strong>حمایت از نوجوانان با ۱۸ سالگی تمام می‌شود.</strong> قبل از تولدتان با مسئول حمایتتان صحبت کنید که بعدش چه چیزی در دسترس است.<span class="let-chip">مهم</span>' },
            { icoon:'✓', kleur:'#EBF3EE', tekst:'در برخی موارد می‌توان حمایت را تا ۲۳ سالگی ادامه داد. باید به موقع از شهرداری درخواست دهید.' },
            { icoon:'ℹ', kleur:'#EFF6FF', tekst:'حمایت بزرگسالان از مسیرهای دیگر: پزشک خانواده، WMO (شهرداری)، بهداشت روان یا خدمات اجتماعی. JIP می‌تواند کمک کند.' },
          ], infoBox:{ type:'amber', tekst:'⚠️ <strong>قبل از ۱۸ سالگی</strong> با مسئول حمایتتان یا شهرداری صحبت کنید. منتظر روز تولد نمانید.' },
          extern:null },
      ],
      checklist:[
        { tekst:'ثبت‌نام در شرکت مسکن', sub:'هرچه زودتر — لیست انتظار طولانی است' },
        { tekst:'انتخاب اهدا ثبت شد', sub:'از طریق donorregister.nl' },
        { tekst:'کمک معیشتی یا کمک تحصیلی درخواست داده شد (در صورت نیاز)', sub:'بسته به وضعیت سکونت و برنامه‌ها' },
        { tekst:'تعهد ادغام در شهرداری بررسی شد', sub:'اگر هنوز ادغام نشده‌اید' },
        { tekst:'اظهارنامه مالیاتی سال آینده فراموش نشود', sub:'هر سال در مارس در belastingdienst.nl' },
        { tekst:'حمایت از نوجوانان با شهرداری بررسی شد', sub:'اگر حمایت دریافت می‌کردید' },
      ],
    },
  },
};
})();
