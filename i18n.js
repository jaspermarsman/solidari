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
      // Tool namen (voor homepage én tools.html)
      'tool-brief-naam':        'Brief Begrijper',
      'tool-brief-omschrijving':'Maak een foto van je brief. Wij leggen uit wat er staat, wat je moet doen en wanneer.',
      'tool-budget-naam':        'Budgethulp',
      'tool-budget-omschrijving':'Breng je inkomsten en uitgaven in kaart. Stap voor stap, in gewone taal. Download daarna een overzicht.',
      'tool-toeslagen-naam':     'Toeslagen Calculator',
      'tool-18jaar-naam':        '18 Jaar Worden',
      'tool-naturalisatie-naam': 'Naturalisatie Checker',
    },
    EN: {
      'nav-tools':    'Tools',
      'nav-over':     'About us',
      'nav-feedback': 'Feedback',
      'nav-privacy':  'Privacy',
      'footer-cookies': 'No cookies · No storage · No ads',
      'tool-brief-naam':        'Letter Explainer',
      'tool-brief-omschrijving':'Take a photo of your letter. We explain what it says, what you need to do and when.',
      'tool-budget-naam':        'Budget Help',
      'tool-budget-omschrijving':'Map out your income and expenses. Step by step, in plain language. Download a summary afterwards.',
      'tool-toeslagen-naam':     'Benefits Calculator',
      'tool-18jaar-naam':        'Turning 18',
      'tool-naturalisatie-naam': 'Naturalisation Checker',
    },
    AR: {
      'nav-tools':    'الأدوات',
      'nav-over':     'من نحن',
      'nav-feedback': 'ملاحظات',
      'nav-privacy':  'الخصوصية',
      'footer-cookies': 'بلا كوكيز · بلا تخزين · بلا إعلانات',
      'tool-brief-naam':        'فاهم الرسائل',
      'tool-brief-omschrijving':'التقط صورة لرسالتك. نشرح لك ما تعنيه، وما يجب فعله ومتى.',
      'tool-budget-naam':        'مساعدة الميزانية',
      'tool-budget-omschrijving':'رتّب دخلك ونفقاتك خطوة بخطوة بلغة بسيطة. ثم حمّل ملخصًا.',
      'tool-toeslagen-naam':     'حاسبة الإعانات',
      'tool-18jaar-naam':        'بلوغ سن 18',
      'tool-naturalisatie-naam': 'فحص التجنيس',
    },
    TR: {
      'nav-tools':    'Araçlar',
      'nav-over':     'Hakkımızda',
      'nav-feedback': 'Geri Bildirim',
      'nav-privacy':  'Gizlilik',
      'footer-cookies': 'Çerez yok · Depolama yok · Reklam yok',
      'tool-brief-naam':        'Mektup Açıklayıcı',
      'tool-brief-omschrijving':'Mektubunuzun fotoğrafını çekin. Ne anlama geldiğini açıklıyoruz.',
      'tool-budget-naam':        'Bütçe Yardımı',
      'tool-budget-omschrijving':'Gelir ve giderlerinizi adım adım listeleyin. Özeti indirin.',
      'tool-toeslagen-naam':     'Yardım Hesaplayıcı',
      'tool-18jaar-naam':        '18 Yaşına Girmek',
      'tool-naturalisatie-naam': 'Vatandaşlık Kontrolü',
    },
    TI: {
      'nav-tools':    'መሳርሒታት',
      'nav-over':     'ብዛዕባና',
      'nav-feedback': 'ርእይቶ',
      'nav-privacy':  'ግልጽነት',
      'footer-cookies': 'ዋላ ኩኪ · ዋላ ምዕቃብ · ዋላ ወዛ',
      'tool-brief-naam':        'ደብዳቤ ኣብርሃዮ',
      'tool-brief-omschrijving':'ናይ ደብዳቤኻ ስእሊ ውሰድ። እንታይ ዝብልን እንታይ ክትገብርን ነብርህ።',
      'tool-budget-naam':        'ሓገዝ ባጀት',
      'tool-budget-omschrijving':'ኣታዊኻን ወጻኢኻን ስርዕ። ድምርካ ኣውርዶ።',
      'tool-toeslagen-naam':     'ሓጋዚ ኣበርክቶ',
      'tool-18jaar-naam':        '18 ዓመት ምዃን',
      'tool-naturalisatie-naam': 'ዜግነት ምርመራ',
    },
    UK: {
      'nav-tools':    'Інструменти',
      'nav-over':     'Про нас',
      'nav-feedback': 'Відгук',
      'nav-privacy':  'Конфіденційність',
      'footer-cookies': 'Без cookies · Без зберігання · Без реклами',
      'tool-brief-naam':        'Пояснення листів',
      'tool-brief-omschrijving':'Сфотографуйте листа. Ми пояснимо що там написано і що робити.',
      'tool-budget-naam':        'Допомога з бюджетом',
      'tool-budget-omschrijving':'Внесіть доходи та витрати крок за кроком. Завантажте зведення.',
      'tool-toeslagen-naam':     'Калькулятор пільг',
      'tool-18jaar-naam':        'Повноліття',
      'tool-naturalisatie-naam': 'Перевірка громадянства',
    },
    FA: {
      'nav-tools':    'ابزارها',
      'nav-over':     'درباره ما',
      'nav-feedback': 'بازخورد',
      'nav-privacy':  'حریم خصوصی',
      'footer-cookies': 'بدون کوکی · بدون ذخیره · بدون تبلیغات',
      'tool-brief-naam':        'توضیح نامه',
      'tool-brief-omschrijving':'از نامه‌تان عکس بگیرید. توضیح می‌دهیم چه می‌گوید و چه باید بکنید.',
      'tool-budget-naam':        'کمک بودجه',
      'tool-budget-omschrijving':'درآمد و هزینه‌هایتان را گام به گام وارد کنید. خلاصه را دانلود کنید.',
      'tool-toeslagen-naam':     'ماشین حساب کمک‌هزینه',
      'tool-18jaar-naam':        '18 ساله شدن',
      'tool-naturalisatie-naam': 'بررسی تابعیت',
    },
    RO: {
      'nav-tools':    'Instrumente',
      'nav-over':     'Despre proiect',
      'nav-feedback': 'Feedback',
      'nav-privacy':  'Confidențialitate',
      'footer-cookies': 'Fără cookie-uri · Fără stocare · Fără reclame',
      'tool-brief-naam':        'Explicator de scrisori',
      'tool-brief-omschrijving':'Fă o fotografie scrisorii tale. Explicăm ce înseamnă, ce trebuie să faci și până când.',
      'tool-budget-naam':        'Ajutor buget',
      'tool-budget-omschrijving':'Înregistrează veniturile și cheltuielile tale pas cu pas, în limbaj simplu. Descarcă apoi un rezumat.',
      'tool-toeslagen-naam':     'Calculator alocații',
      'tool-18jaar-naam':        'Împlinești 18 ani',
      'tool-naturalisatie-naam': 'Verificator cetățenie',
    },
    PL: {
      'nav-tools':    'Narzędzia',
      'nav-over':     'O projekcie',
      'nav-feedback': 'Opinie',
      'nav-privacy':  'Prywatność',
      'footer-cookies': 'Bez ciasteczek · Bez przechowywania · Bez reklam',
      'tool-brief-naam':        'Tłumacz pism',
      'tool-brief-omschrijving':'Zrób zdjęcie pisma. Wyjaśniamy co oznacza, co musisz zrobić i do kiedy.',
      'tool-budget-naam':        'Pomoc budżetowa',
      'tool-budget-omschrijving':'Zapisz swoje dochody i wydatki krok po kroku, w prostym języku. Pobierz podsumowanie.',
      'tool-toeslagen-naam':     'Kalkulator zasiłków',
      'tool-18jaar-naam':        'Ukończenie 18 lat',
      'tool-naturalisatie-naam': 'Sprawdzanie obywatelstwa',
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
