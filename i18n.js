/**
 * Solidari — Centraal i18n systeem
 * Gedeelde vertalingen voor nav, footer en tool-namen.
 * Elke pagina laadt dit bestand en kan eigen strings toevoegen.
 *
 * Gebruik:
 *   <script src="i18n.js"></script>
 *   Dan op elke pagina: Solidari.i18n.init();
 *
 * Pagina-specifieke strings toevoegen:
 *   Solidari.i18n.extend({ NL: { 'mijn-sleutel': 'tekst' }, EN: {...} });
 */

window.Solidari = window.Solidari || {};

Solidari.i18n = (function() {

  // ── Gedeelde vertalingen (nav, footer, tool-namen) ──────────────────────
  const GEDEELD = {
    NL: {
      // Nav
      'nav-tools':    'Tools',
      'nav-over':     'Over ons',
      'nav-feedback': 'Feedback',
      'nav-privacy':  'Privacy',
      // Footer
      'footer-cookies': 'Geen cookies · Geen opslag · Geen advertenties',
      'footer-vertaalhulp': 'Help mee vertalen',
      // Tool namen (voor homepage én tools.html)
      'tool-brief-naam':        'Brief Begrijper',
      'tool-brief-omschrijving':'Maak een foto van je brief. Wij leggen uit wat er staat, wat je moet doen en wanneer.',
      'tool-budget-naam':        'Budgethulp',
      'tool-budget-omschrijving':'Breng je inkomsten en uitgaven in kaart. Stap voor stap, in gewone taal. Download daarna een overzicht.',
      'tool-toeslagen-naam':     'Toeslagen Calculator',
      'tool-18jaar-naam':        '18 Jaar Worden',
      'tool-naturalisatie-naam': 'Naturalisatie Checker',
      'tool-loont-naam':         'Loont Werken?',
      'tool-rechten-naam':       'Rechten & Plichten',
      'tool-digi-naam':          'Digi Hulp',
      'tool-gv-naam':            'Goed Voorbereid',
      // Toegankelijkheid / spraak
      'a11y-luister': 'Luister',
      'a11y-stop': 'Stop',
      'a11y-voorlezen-aan': 'Voorlezen aan',
      'a11y-voorlezen-uit': 'Voorlezen uit',
      'a11y-tik-om-te-luisteren': 'Tik op tekst om te luisteren',
      'a11y-kies-taal': 'Kies je taal',
      'a11y-geen-stem': 'Voorlezen werkt niet op dit toestel',
      'a11y-spreek': 'Spreek in plaats van typen',
      'a11y-luisteren-nu': 'Ik luister…',
      'a11y-opnieuw': 'Opnieuw',
      'a11y-terug': 'Terug',
      'a11y-begin': 'Begin hier',
      'a11y-foto': 'Maak een foto',
      'a11y-hulp': 'Hulp',
      'nav-taal': 'Taal',
      'footer-contact': 'Contact',
      'a11y-attributie': 'Spraak voor sommige talen: MMS-project van Meta AI (CC-BY-NC 4.0)',
    },
    EN: {
      'nav-tools':    'Tools',
      'nav-over':     'About us',
      'nav-feedback': 'Feedback',
      'nav-privacy':  'Privacy',
      'footer-cookies': 'No cookies · No storage · No ads',
      'footer-vertaalhulp': 'Help us translate',
      'tool-brief-naam':        'Letter Explainer',
      'tool-brief-omschrijving':'Take a photo of your letter. We explain what it says, what you need to do and when.',
      'tool-budget-naam':        'Budget Help',
      'tool-budget-omschrijving':'Map out your income and expenses. Step by step, in plain language. Download a summary afterwards.',
      'tool-toeslagen-naam':     'Benefits Calculator',
      'tool-18jaar-naam':        'Turning 18',
      'tool-naturalisatie-naam': 'Naturalisation Checker',
      'tool-loont-naam':         'Does Work Pay?',
      'tool-rechten-naam':       'Rights & Duties',
      'tool-digi-naam':          'Digital Help',
      'tool-gv-naam':            'Well Prepared',
      'a11y-luister': 'Listen',
      'a11y-stop': 'Stop',
      'a11y-voorlezen-aan': 'Read aloud on',
      'a11y-voorlezen-uit': 'Read aloud off',
      'a11y-tik-om-te-luisteren': 'Tap text to listen',
      'a11y-kies-taal': 'Choose your language',
      'a11y-geen-stem': 'Read aloud does not work on this device',
      'a11y-spreek': 'Speak instead of typing',
      'a11y-luisteren-nu': 'I\'m listening…',
      'a11y-opnieuw': 'Again',
      'a11y-terug': 'Back',
      'a11y-begin': 'Start here',
      'a11y-foto': 'Take a photo',
      'a11y-hulp': 'Help',
      'nav-taal': 'Language',
      'footer-contact': 'Contact',
      'a11y-attributie': 'Speech for some languages: Meta AI\'s MMS project (CC-BY-NC 4.0)',
    },
    AR: {
      'nav-tools':    'الأدوات',
      'nav-over':     'من نحن',
      'nav-feedback': 'ملاحظات',
      'nav-privacy':  'الخصوصية',
      'footer-cookies': 'بلا كوكيز · بلا تخزين · بلا إعلانات',
      'footer-vertaalhulp': 'ساعدنا في الترجمة',
      'tool-brief-naam':        'فاهم الرسائل',
      'tool-brief-omschrijving':'التقط صورة لرسالتك. نشرح لك ما تعنيه، وما يجب فعله ومتى.',
      'tool-budget-naam':        'مساعدة الميزانية',
      'tool-budget-omschrijving':'رتّب دخلك ونفقاتك خطوة بخطوة بلغة بسيطة. ثم حمّل ملخصًا.',
      'tool-toeslagen-naam':     'حاسبة الإعانات',
      'tool-18jaar-naam':        'بلوغ سن 18',
      'tool-naturalisatie-naam': 'فحص التجنيس',
      'tool-loont-naam':         'هل يستحق العمل؟',
      'tool-rechten-naam':       'الحقوق والواجبات',
      'tool-digi-naam':          'مساعدة رقمية',
      'tool-gv-naam':            'استعد جيدًا',
      'a11y-luister': 'استمع',
      'a11y-stop': 'إيقاف',
      'a11y-voorlezen-aan': 'القراءة الصوتية مفعّلة',
      'a11y-voorlezen-uit': 'القراءة الصوتية متوقفة',
      'a11y-tik-om-te-luisteren': 'اضغط على النص للاستماع',
      'a11y-kies-taal': 'اختر لغتك',
      'a11y-geen-stem': 'القراءة الصوتية لا تعمل على هذا الجهاز',
      'a11y-spreek': 'تحدث بدل الكتابة',
      'a11y-luisteren-nu': 'أنا أستمع…',
      'a11y-opnieuw': 'مرة أخرى',
      'a11y-terug': 'رجوع',
      'a11y-begin': 'ابدأ هنا',
      'a11y-foto': 'التقط صورة',
      'a11y-hulp': 'مساعدة',
      'nav-taal': 'اللغة',
      'footer-contact': 'اتصل بنا',
      'a11y-attributie': 'الصوت لبعض اللغات: مشروع MMS من Meta AI (CC-BY-NC 4.0)',
    },
    TR: {
      'nav-tools':    'Araçlar',
      'nav-over':     'Hakkımızda',
      'nav-feedback': 'Geri Bildirim',
      'nav-privacy':  'Gizlilik',
      'footer-cookies': 'Çerez yok · Verilerinizi Depolanması yok · Reklam yok',
      'footer-vertaalhulp': 'Çeviriye yardım et',
      'tool-brief-naam':        'Mektup Açıklama Aracı',
      'tool-brief-omschrijving':'Mektubunuzun fotoğrafını çekin ve bizimle paylaşın. Mektubun içeriğini beraberce anlayalım.',
      'tool-budget-naam':        'Bütçe Yardımı',
      'tool-budget-omschrijving':'Gelir ve giderlerinizi adım adım listeleyin. Özeti indirin.',
      'tool-toeslagen-naam':     'Yardım Hesaplayıcı',
      'tool-18jaar-naam':        '18 Yaşına Girmek',
      'tool-naturalisatie-naam': 'Vatandaşlık Kontrolü',
      'tool-loont-naam':         'Çalışmaya Değer mi?',
      'tool-rechten-naam':       'Haklar ve Görevler',
      'tool-digi-naam':          'Dijital Yardım',
      'tool-gv-naam':            'İyi Hazırlan',
      'a11y-luister': 'Dinle',
      'a11y-stop': 'Durdur',
      'a11y-voorlezen-aan': 'Sesli okuma açık',
      'a11y-voorlezen-uit': 'Sesli okuma kapalı',
      'a11y-tik-om-te-luisteren': 'Dinlemek için metne dokun',
      'a11y-kies-taal': 'Dilini seç',
      'a11y-geen-stem': 'Bu cihazda sesli okuma çalışmıyor',
      'a11y-spreek': 'Yazmak yerine konuş',
      'a11y-luisteren-nu': 'Dinliyorum…',
      'a11y-opnieuw': 'Tekrar',
      'a11y-terug': 'Geri',
      'a11y-begin': 'Buradan başla',
      'a11y-foto': 'Fotoğraf çek',
      'a11y-hulp': 'Yardım',
      'nav-taal': 'Dil',
      'footer-contact': 'İletişim',
      'a11y-attributie': 'Bazı diller için ses: Meta AI\'nin MMS projesi (CC-BY-NC 4.0)',
    },
    TI: {
      'nav-tools':    'መሳርሒታት',
      'nav-over':     'ብዛዕባና',
      'nav-feedback': 'ርእይቶ',
      'nav-privacy':  'ግልጽነት',
      'footer-cookies': 'ዋላ ኩኪ · ዋላ ምዕቃብ · ዋላ ወዛ',
      'footer-vertaalhulp': 'ኣብ ትርጉም ሓግዘና',
      'tool-brief-naam':        'ደብዳቤ ኣብርሃዮ',
      'tool-brief-omschrijving':'ናይ ደብዳቤኻ ስእሊ ውሰድ። እንታይ ዝብልን እንታይ ክትገብርን ነብርህ።',
      'tool-budget-naam':        'ሓገዝ ባጀት',
      'tool-budget-omschrijving':'ኣታዊኻን ወጻኢኻን ስርዕ። ድምርካ ኣውርዶ።',
      'tool-toeslagen-naam':     'ሓጋዚ ኣበርክቶ',
      'tool-18jaar-naam':        '18 ዓመት ምዃን',
      'tool-naturalisatie-naam': 'ዜግነት ምርመራ',
      'tool-loont-naam':         'ስራሕ ይሓይሽ ዶ?',
      'tool-rechten-naam':       'መሰላትን ግዴታታትን',
      'tool-digi-naam':          'ዲጂታል ሓገዝ',
      'tool-gv-naam':            'ጽቡቕ ተዳሎ',
      'a11y-luister': 'ስማዕ',
      'a11y-stop': 'ደው በል',
      'a11y-voorlezen-aan': 'ምንባብ ተኸፊቱ',
      'a11y-voorlezen-uit': 'ምንባብ ተዓጽዩ',
      'a11y-tik-om-te-luisteren': 'ንምስማዕ ኣብቲ ጽሑፍ ጠውቕ',
      'a11y-kies-taal': 'ቋንቋኻ ምረጽ',
      'a11y-geen-stem': 'ኣብዚ መሳርሒ ምንባብ ኣይሰርሕን',
      'a11y-spreek': 'ኣብ ክንዲ ምጽሓፍ ተዛረብ',
      'a11y-luisteren-nu': 'እሰምዕ ኣለኹ…',
      'a11y-opnieuw': 'እንደገና',
      'a11y-terug': 'ተመለስ',
      'a11y-begin': 'ካብዚ ጀምር',
      'a11y-foto': 'ስእሊ ውሰድ',
      'a11y-hulp': 'ሓገዝ',
      'nav-taal': 'ቋንቋ',
      'footer-contact': 'ርክብ',
      'a11y-attributie': 'ድምጺ ንገለ ቋንቋታት፦ MMS ፕሮጀክት ናይ Meta AI (CC-BY-NC 4.0)',
    },
    UK: {
      'nav-tools':    'Інструменти',
      'nav-over':     'Про нас',
      'nav-feedback': 'Відгук',
      'nav-privacy':  'Конфіденційність',
      'footer-cookies': 'Без cookies · Без зберігання · Без реклами',
      'footer-vertaalhulp': 'Допоможіть з перекладом',
      'tool-brief-naam':        'Пояснення листів',
      'tool-brief-omschrijving':'Сфотографуйте листа. Ми пояснимо що там написано і що робити.',
      'tool-budget-naam':        'Допомога з бюджетом',
      'tool-budget-omschrijving':'Внесіть доходи та витрати крок за кроком. Завантажте зведення.',
      'tool-toeslagen-naam':     'Калькулятор пільг',
      'tool-18jaar-naam':        'Повноліття',
      'tool-naturalisatie-naam': 'Перевірка громадянства',
      'tool-loont-naam':         'Чи вигідно працювати?',
      'tool-rechten-naam':       'Права та обов\'язки',
      'tool-digi-naam':          'Цифрова допомога',
      'tool-gv-naam':            'Добре підготовлені',
      'a11y-luister': 'Слухати',
      'a11y-stop': 'Стоп',
      'a11y-voorlezen-aan': 'Озвучення увімкнено',
      'a11y-voorlezen-uit': 'Озвучення вимкнено',
      'a11y-tik-om-te-luisteren': 'Торкніться тексту, щоб послухати',
      'a11y-kies-taal': 'Виберіть свою мову',
      'a11y-geen-stem': 'Озвучення не працює на цьому пристрої',
      'a11y-spreek': 'Говоріть замість друкувати',
      'a11y-luisteren-nu': 'Слухаю…',
      'a11y-opnieuw': 'Ще раз',
      'a11y-terug': 'Назад',
      'a11y-begin': 'Почніть тут',
      'a11y-foto': 'Зробіть фото',
      'a11y-hulp': 'Допомога',
      'nav-taal': 'Мова',
      'footer-contact': 'Контакт',
      'a11y-attributie': 'Озвучення для деяких мов: проєкт MMS від Meta AI (CC-BY-NC 4.0)',
    },
    FA: {
      'nav-tools':    'ابزارها',
      'nav-over':     'درباره ما',
      'nav-feedback': 'بازخورد',
      'nav-privacy':  'حریم خصوصی',
      'footer-cookies': 'بدون کوکی · بدون ذخیره · بدون تبلیغات',
      'footer-vertaalhulp': 'به ترجمه کمک کنید',
      'tool-brief-naam':        'توضیح نامه',
      'tool-brief-omschrijving':'از نامه‌تان عکس بگیرید. توضیح می‌دهیم چه می‌گوید و چه باید بکنید.',
      'tool-budget-naam':        'کمک بودجه',
      'tool-budget-omschrijving':'درآمد و هزینه‌هایتان را گام به گام وارد کنید. خلاصه را دانلود کنید.',
      'tool-toeslagen-naam':     'ماشین حساب کمک‌هزینه',
      'tool-18jaar-naam':        '18 ساله شدن',
      'tool-naturalisatie-naam': 'بررسی تابعیت',
      'tool-loont-naam':         'آیا کار ارزش دارد؟',
      'tool-rechten-naam':       'حقوق و وظایف',
      'tool-digi-naam':          'کمک دیجیتال',
      'tool-gv-naam':            'خوب آماده شوید',
      'a11y-luister': 'گوش کن',
      'a11y-stop': 'توقف',
      'a11y-voorlezen-aan': 'خواندن با صدا روشن',
      'a11y-voorlezen-uit': 'خواندن با صدا خاموش',
      'a11y-tik-om-te-luisteren': 'برای شنیدن روی متن بزنید',
      'a11y-kies-taal': 'زبان خود را انتخاب کنید',
      'a11y-geen-stem': 'خواندن با صدا در این دستگاه کار نمی‌کند',
      'a11y-spreek': 'به جای تایپ صحبت کنید',
      'a11y-luisteren-nu': 'گوش می‌دهم…',
      'a11y-opnieuw': 'دوباره',
      'a11y-terug': 'بازگشت',
      'a11y-begin': 'از اینجا شروع کنید',
      'a11y-foto': 'عکس بگیرید',
      'a11y-hulp': 'کمک',
      'nav-taal': 'زبان',
      'footer-contact': 'تماس',
      'a11y-attributie': 'صدا برای برخی زبان‌ها: پروژه MMS از Meta AI (CC-BY-NC 4.0)',
    },
    RO: {
      'nav-tools':    'Instrumente',
      'nav-over':     'Despre proiect',
      'nav-feedback': 'Feedback',
      'nav-privacy':  'Confidențialitate',
      'footer-cookies': 'Fără cookie-uri · Fără stocare · Fără reclame',
      'footer-vertaalhulp': 'Ajută la traducere',
      'tool-brief-naam':        'Explicator de scrisori',
      'tool-brief-omschrijving':'Fă o fotografie scrisorii tale. Explicăm ce înseamnă, ce trebuie să faci și până când.',
      'tool-budget-naam':        'Ajutor buget',
      'tool-budget-omschrijving':'Înregistrează veniturile și cheltuielile tale pas cu pas, în limbaj simplu. Descarcă apoi un rezumat.',
      'tool-toeslagen-naam':     'Calculator alocații',
      'tool-18jaar-naam':        'Împlinești 18 ani',
      'tool-naturalisatie-naam': 'Verificator cetățenie',
      'tool-loont-naam':         'Merită să lucrezi?',
      'tool-rechten-naam':       'Drepturi și obligații',
      'tool-digi-naam':          'Ajutor digital',
      'tool-gv-naam':            'Bine pregătit',
      'a11y-luister': 'Ascultă',
      'a11y-stop': 'Oprește',
      'a11y-voorlezen-aan': 'Citire cu voce pornită',
      'a11y-voorlezen-uit': 'Citire cu voce oprită',
      'a11y-tik-om-te-luisteren': 'Atinge textul ca să asculți',
      'a11y-kies-taal': 'Alege limba ta',
      'a11y-geen-stem': 'Citirea cu voce nu funcționează pe acest dispozitiv',
      'a11y-spreek': 'Vorbește în loc să scrii',
      'a11y-luisteren-nu': 'Ascult…',
      'a11y-opnieuw': 'Din nou',
      'a11y-terug': 'Înapoi',
      'a11y-begin': 'Începe aici',
      'a11y-foto': 'Fă o fotografie',
      'a11y-hulp': 'Ajutor',
      'nav-taal': 'Limbă',
      'footer-contact': 'Contact',
      'a11y-attributie': 'Voce pentru unele limbi: proiectul MMS al Meta AI (CC-BY-NC 4.0)',
    },
    PL: {
      'nav-tools':    'Narzędzia',
      'nav-over':     'O projekcie',
      'nav-feedback': 'Opinie',
      'nav-privacy':  'Prywatność',
      'footer-cookies': 'Bez ciasteczek · Bez przechowywania · Bez reklam',
      'footer-vertaalhulp': 'Pomóż w tłumaczeniu',
      'tool-brief-naam':        'Tłumacz pism',
      'tool-brief-omschrijving':'Zrób zdjęcie pisma. Wyjaśniamy co oznacza, co musisz zrobić i do kiedy.',
      'tool-budget-naam':        'Pomoc budżetowa',
      'tool-budget-omschrijving':'Zapisz swoje dochody i wydatki krok po kroku, w prostym języku. Pobierz podsumowanie.',
      'tool-toeslagen-naam':     'Kalkulator zasiłków',
      'tool-18jaar-naam':        'Ukończenie 18 lat',
      'tool-naturalisatie-naam': 'Sprawdzanie obywatelstwa',
      'tool-loont-naam':         'Czy praca się opłaca?',
      'tool-rechten-naam':       'Prawa i obowiązki',
      'tool-digi-naam':          'Pomoc cyfrowa',
      'tool-gv-naam':            'Dobrze przygotowani',
      'a11y-luister': 'Słuchaj',
      'a11y-stop': 'Zatrzymaj',
      'a11y-voorlezen-aan': 'Czytanie na głos włączone',
      'a11y-voorlezen-uit': 'Czytanie na głos wyłączone',
      'a11y-tik-om-te-luisteren': 'Dotknij tekstu, aby posłuchać',
      'a11y-kies-taal': 'Wybierz swój język',
      'a11y-geen-stem': 'Czytanie na głos nie działa na tym urządzeniu',
      'a11y-spreek': 'Mów zamiast pisać',
      'a11y-luisteren-nu': 'Słucham…',
      'a11y-opnieuw': 'Jeszcze raz',
      'a11y-terug': 'Wstecz',
      'a11y-begin': 'Zacznij tutaj',
      'a11y-foto': 'Zrób zdjęcie',
      'a11y-hulp': 'Pomoc',
      'nav-taal': 'Język',
      'footer-contact': 'Kontakt',
      'a11y-attributie': 'Głos dla niektórych języków: projekt MMS od Meta AI (CC-BY-NC 4.0)',
    },
  };

  // RTL talen
  const RTL = ['AR', 'FA'];

  // Samengesteld object (gedeeld + pagina-specifiek)
  let vertalingen = JSON.parse(JSON.stringify(GEDEELD));

  // Huidige taal
  let huidigeTaal = 'NL';

  // ── Publieke API ────────────────────────────────────────────────────────
  return {

    /**
     * Voeg pagina-specifieke vertalingen toe.
     * Wordt samengevoegd met de gedeelde strings.
     */
    extend(extra) {
      Object.keys(extra).forEach(taal => {
        if (!vertalingen[taal]) vertalingen[taal] = {};
        Object.assign(vertalingen[taal], extra[taal]);
      });
    },

    /**
     * Pas een taal toe op alle [data-i18n] elementen.
     */
    passToe(taal) {
      const code = taal.toUpperCase();
      const t = vertalingen[code];
      if (!t) return;
      huidigeTaal = code;

      // RTL
      document.documentElement.dir = RTL.includes(code) ? 'rtl' : 'ltr';
      document.documentElement.lang = code.toLowerCase();

      // Vertaal alle data-i18n elementen
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const sleutel = el.getAttribute('data-i18n');
        if (t[sleutel] !== undefined) {
          el.innerHTML = t[sleutel];
        }
      });

      // Sla op in localStorage voor volgende pagina
      try { localStorage.setItem('solidari-taal', code); } catch(e) {}
    },

    /**
     * Initialiseer: koppel taalknopen en herstel opgeslagen taal.
     */
    init() {
      // Taalknopen koppelen
      document.querySelectorAll('.taal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.taal-btn').forEach(b => b.classList.remove('actief'));
          btn.classList.add('actief');
          this.passToe(btn.textContent.trim());
        });
      });

      // Herstel opgeslagen taal
      try {
        const opgeslagen = localStorage.getItem('solidari-taal');
        if (opgeslagen && vertalingen[opgeslagen]) {
          // Zet juiste knop actief
          document.querySelectorAll('.taal-btn').forEach(btn => {
            btn.classList.toggle('actief', btn.textContent.trim() === opgeslagen);
          });
          this.passToe(opgeslagen);
        }
      } catch(e) {}
    },

    /** Geef huidige taalcode terug */
    getTaal() { return huidigeTaal; },

    /** Geef een vertaling op als string (voor gebruik in JS) */
    t(sleutel) {
      return (vertalingen[huidigeTaal] || {})[sleutel] || sleutel;
    },
  };

})();
