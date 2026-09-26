#!/usr/bin/env node
// check.js — controleert naturalisatie-data.js (fase 3 en 4 van
// PLAN-naturalisatie-migratiepact.md). Exit 1 bij een fout.
//
// Gebruik:
//   node tools/naturalisatie/check.js --taal NL   (één taal)
//   node tools/naturalisatie/check.js             (alle talen in _NAT)
//
// Fase 4 (§7 fase 4.2): elke niet-NL-taal wordt ook tegen NL gecontroleerd
// op pariteit (zie checkPariteit hieronder), en de §8-scenario's draaien in
// alle gecontroleerde talen.

const fs = require('fs');
const path = require('path');

const DATA_PAD = path.join(__dirname, '..', '..', 'naturalisatie-data.js');

function laadData() {
  global.window = global.window || {};
  const bron = fs.readFileSync(DATA_PAD, 'utf8');
  // eslint-disable-next-line no-new-func
  const fn = new Function('window', bron + '\nreturn { _NAT: window._NAT, _NAT_CONFIG: window._NAT_CONFIG };');
  return fn(global.window);
}

const FOUTEN = [];
function fail(msg) { FOUTEN.push(msg); }

// ── Scenariotabel (Correctie 1, §4) ──────────────────────────────────────
// Elk pad is een lijst van [vraagId, antwoordIndex]. Dit is taal-onafhankelijk
// zolang de structuur (aantal/volgorde antwoorden, volgende-doelen) gelijk
// blijft aan NL — precies wat N-9/§6 eist (en wat checkPariteit afdwingt).
// Draait sinds fase 4 in elke gecontroleerde taal.
//
// Sinds Correctie 1: `simuleerScenario` houdt zelf een `pad` bij (net als
// `huidigPad()` in naturalisatie.html) en past `padOk`/`alleenPad` toe bij elke
// stap (§4 punt 1: een gefilterd antwoord is op dat pad niet kiesbaar). Twee
// nieuwe optionele scenariovelden:
//   - `verwachtPad`: het pad moet na het simuleren gelijk zijn aan deze waarde.
//   - `eindVraag`/`verwachtAntwoorden`: in plaats van te eindigen bij een
//     resultaat, eindigt het scenario bij een VRAAG; `verwachtAntwoorden` is
//     het aantal antwoorden dat op het bijgehouden pad zichtbaar zou zijn
//     (na filtering op `alleenPad`). Gebruikt voor S-14/S-15 (§4 tabel), waar
//     de eigenlijke klik-op-zichtbare-positie-test in naturalisatie.spec.js
//     (fase C5) gebeurt — hier wordt alleen de graaf/telling gecontroleerd.
const SCENARIOS = {
  'S-1': {
    pad: [['v1', 0], ['v1b', 1], ['v_regulier', 0], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0], ['v7', 0], ['v8', 0]],
    verwacht: 'r_positief',
    verwachtPad: 'regulier',
  },
  'S-2': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 0], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0], ['v7', 0], ['v8', 0]],
    verwacht: 'r_positief',
    verwachtPad: 'asiel',
  },
  'S-3': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 1], ['v_asiel5', 0], ['e1', 0], ['e2', 0], ['e3', 0], ['e4', 0]],
    verwacht: 'r_eu_li_eerst',
    verwachtPad: 'asiel',
    infokaartGezien: 'v_asiel5',
  },
  // S-4 (plan §8) is met Correctie 1 een letterlijk duplicaat van S-3 geworden:
  // "5 jaar, vóór 12-06-2026" en "nieuw, na 12-06-2026" zijn in v_asiel
  // samengevoegd tot één antwoord "Asiel voor bepaalde tijd" (sub noemt "3 of
  // 5 jaar"). Er is geen apart klikpad meer dat ze onderscheidt, dus S-4 is
  // hier samengevoegd met S-3 (§4: "laat S-4 bestaan als duplicaat of voeg
  // samen, noteer de keuze" — keuze: samenvoegen, zie LOG-naturalisatie.md).
  'S-5': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 1], ['v_asiel5', 0], ['e1', 0], ['e2', 0], ['e3', 2]],
    verwacht: 'r_inkomen',
    verwachtPad: 'asiel',
  },
  'S-6': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 1], ['v_asiel5', 0], ['e1', 0], ['e2', 0], ['e3', 0], ['e4', 1]],
    verwacht: 'r_eu_li_eerst_z',
    verwachtPad: 'asiel',
  },
  'S-7': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 1], ['v_asiel5', 0], ['e1', 0], ['e2', 1]],
    verwacht: 'r_eu_li_afwezig',
    verwachtPad: 'asiel',
  },
  'S-8': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 1], ['v_asiel5', 0], ['e1', 1]],
    verwacht: 'r_te_kort_nieuw',
    verwachtPad: 'asiel',
  },
  'S-9': {
    pad: [['v1', 0], ['v1b', 3], ['v_asiel_wn', 1]],
    verwacht: 'r_asiel_onbekend',
  },
  'S-10': {
    pad: [['v1', 0], ['v1b', 3], ['v_asiel_wn', 0], ['v1b', 0], ['v_asiel', 1], ['v_asiel5', 0], ['e1', 0], ['e2', 2], ['e3', 1], ['e4', 2]],
    verwacht: 'r_eu_li_inburgering_bezig',
    verwachtPad: 'asiel',
  },
  'S-11': {
    // v_asiel heeft door het samenvoegen van "5 jaar oud"/"nieuw" nu 4 in
    // plaats van 5 antwoorden; "Ik ben al EU-langdurig ingezetene" schuift
    // van index 3 naar index 2.
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 2], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0], ['v7', 0], ['v8', 0]],
    verwacht: 'r_positief',
    verwachtPad: 'asiel',
  },
  'S-12': {
    pad: [['v1', 0], ['v1b', 1], ['v_regulier', 0], ['v2', 0], ['v3', 0]],
    verwacht: 'r_te_kort',
    verwachtPad: 'regulier',
    verbiedt: ['tijdelijke vergunning'],
  },
  'S-13': {
    pad: [['v1', 0], ['v1b', 1], ['v_regulier', 2]],
    verwacht: 'r_regulier_tijdelijk',
    verwachtPad: 'regulier',
  },
  'S-14': {
    pad: [['v1', 0], ['v1b', 1], ['v_regulier', 1], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0]],
    eindVraag: 'v7',
    verwachtAntwoorden: 2,
    verwachtPad: 'regulier',
  },
  'S-15': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 0], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0]],
    eindVraag: 'v7',
    verwachtAntwoorden: 3,
    verwachtPad: 'asiel',
  },
  'S-16': {
    pad: [['v1', 0], ['v1b', 3], ['v_asiel_wn', 0], ['v1b', 1], ['v_regulier', 0], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0], ['v7', 0], ['v8', 0]],
    verwacht: 'r_positief',
    verwachtPad: 'regulier',
  },
};

// Mirror van naturalisatie.html se `padOk()`: zonder `alleenPad` altijd waar;
// met `alleenPad` alleen waar als het gelijk is aan het huidige pad.
function padOk(alleenPad, pad) {
  return !alleenPad || alleenPad === pad;
}

function simuleerScenario(taal, id, scenario, vragen, resultaten) {
  const sfail = msg => fail(`[${taal}] ${msg}`);
  let huidig = 'v1';
  // Correctie 1, §3.1.1: het huidige pad — mirroring huidigPad() in
  // naturalisatie.html. Alleen een antwoord met een eigen `pad` wijzigt het.
  let pad = null;
  for (const [vraagId, idx] of scenario.pad) {
    if (huidig !== vraagId) {
      sfail(`${id}: verwachtte dat we bij vraag ${vraagId} zouden staan, maar staan op ${huidig}`);
      return;
    }
    const v = vragen[vraagId];
    if (!v) { sfail(`${id}: vraag ${vraagId} bestaat niet`); return; }
    const a = (v.antwoorden || [])[idx];
    if (!a) { sfail(`${id}: antwoord[${idx}] bestaat niet bij vraag ${vraagId}`); return; }
    // §4 punt 1: een gefilterd (op dit pad niet-toegestaan) antwoord is niet kiesbaar.
    if (!padOk(a.alleenPad, pad)) {
      sfail(`${id}: antwoord[${idx}] bij ${vraagId} is op pad "${pad}" niet kiesbaar (alleenPad="${a.alleenPad}")`);
      return;
    }
    if (a.pad) pad = a.pad;
    huidig = a.volgende;
  }

  if (scenario.eindVraag) {
    // S-14/S-15-achtige scenario's: eindigen bij een VRAAG, niet bij een
    // resultaat. De verwachting is het aantal op dit pad zichtbare antwoorden.
    if (huidig !== scenario.eindVraag) {
      sfail(`${id}: pad kwam uit bij vraag "${huidig}", verwacht was vraag "${scenario.eindVraag}"`);
      return;
    }
    const v = vragen[huidig];
    if (!v) { sfail(`${id}: vraag ${huidig} bestaat niet`); return; }
    const getoond = (v.antwoorden || []).filter(a => padOk(a.alleenPad, pad));
    if (getoond.length !== scenario.verwachtAntwoorden) {
      sfail(`${id}: vraag ${huidig} toont ${getoond.length} antwoorden op pad "${pad}", verwacht ${scenario.verwachtAntwoorden}`);
    }
  } else {
    if (huidig !== scenario.verwacht) {
      sfail(`${id}: pad kwam uit op "${huidig}", verwacht was "${scenario.verwacht}"`);
      return;
    }
    if (scenario.verbiedt) {
      const res = resultaten[huidig] || {};
      const tekst = JSON.stringify(res).toLowerCase();
      // `verbiedt` bevat NL-zinnen; alleen zinvol in NL. Voor andere talen
      // dekt checkPariteit dit af (r_te_kort heeft dezelfde structuur als NL).
      if (taal === 'NL') scenario.verbiedt.forEach(zin => {
        if (tekst.includes(zin.toLowerCase())) sfail(`${id}: resultaat ${huidig} bevat verboden zin "${zin}"`);
      });
    }
  }

  if (scenario.verwachtPad && pad !== scenario.verwachtPad) {
    sfail(`${id}: eindigde met pad "${pad}", verwacht was pad "${scenario.verwachtPad}"`);
  }
}

// ── Structuurcontrole per taal ───────────────────────────────────────────
function checkTaal(taal, taalData) {
  const vragen = taalData.vragen || {};
  const resultaten = taalData.resultaten || {};

  // 1. elke `volgende` en `interneLink.naar` bestaat
  Object.entries(vragen).forEach(([id, v]) => {
    (v.antwoorden || []).forEach((a, i) => {
      if (!vragen[a.volgende] && !resultaten[a.volgende]) {
        fail(`[${taal}] ${id}.antwoorden[${i}].volgende = "${a.volgende}" bestaat niet`);
      }
    });
  });
  Object.entries(resultaten).forEach(([id, r]) => {
    if (r.interneLink && !vragen[r.interneLink.naar] && !resultaten[r.interneLink.naar]) {
      fail(`[${taal}] ${id}.interneLink.naar = "${r.interneLink.naar}" bestaat niet`);
    }
  });

  // 2. elke vraag en elk resultaat is bereikbaar vanaf v1
  if (!vragen.v1) {
    fail(`[${taal}] vraag "v1" ontbreekt — niets is bereikbaar`);
  } else {
    const bereikt = new Set();
    const stapel = ['v1'];
    while (stapel.length) {
      const id = stapel.pop();
      if (bereikt.has(id)) continue;
      bereikt.add(id);
      const v = vragen[id];
      if (v) (v.antwoorden || []).forEach(a => stapel.push(a.volgende));
      const r = resultaten[id];
      if (r && r.interneLink) stapel.push(r.interneLink.naar);
    }
    Object.keys(vragen).forEach(id => {
      if (!bereikt.has(id)) fail(`[${taal}] vraag "${id}" is niet bereikbaar vanaf v1`);
    });
    Object.keys(resultaten).forEach(id => {
      if (!bereikt.has(id)) fail(`[${taal}] resultaat "${id}" is niet bereikbaar vanaf v1`);
    });
  }

  // 3. cycli: de enige toegestane is v_asiel_wn → v1b (back-edge-detectie via DFS)
  const KLEUR = {}; // undefined=wit, 1=grijs (in bewerking), 2=zwart (klaar)
  function dfs(id) {
    if (!vragen[id]) return; // resultaat = eindpunt van deze graaf
    KLEUR[id] = 1;
    (vragen[id].antwoorden || []).forEach(a => {
      const volgende = a.volgende;
      if (KLEUR[volgende] === 1) {
        if (!(id === 'v_asiel_wn' && volgende === 'v1b')) {
          fail(`[${taal}] onverwachte cyclus: ${id} → ${volgende} (alleen v_asiel_wn → v1b is toegestaan)`);
        }
      } else if (KLEUR[volgende] !== 2) {
        dfs(volgende);
      }
    });
    KLEUR[id] = 2;
  }
  if (vragen.v1) dfs('v1');

  return { vragen, resultaten };
}

// ── Verboden zinnen (hoofdletterongevoelig, alle gecontroleerde talen) ──
// Correctie 1, §4 punt 3: vier zinnen uit fout A ("de oude asielvergunning
// blijft goed") mogen nergens meer voorkomen. Dit zijn NL-zinnen; ze worden
// (zoals de bestaande vier) tegen ALLE talen gecontroleerd — dat is onschadelijk
// voor al-vertaalde talen (de zin staat er dan toch niet) en vangt een
// per ongeluk onvertaald Nederlands restje in een andere taal.
const VERBODEN = [
  'vanuit een geldige tijdelijke vergunning',
  'toegankelijker, want daarvoor geldt géén inkomenseis',
  'eu-li',
  /stap\s+\d+\s+van\s+\d+/i,
  'oude manier',
  'oude regels',
  'nieuwe asielvergunning',
  'gekregen of verlengd op of na',
];

// Correctie 1, C4: de vertalingen van dezelfde vier zinnen (§4 punt 3), zoals
// ze vóór Correctie 1 in elk taalbestand stonden (git show 9725bd7). Zo smal
// gekozen dat ze niet vallen over NL-tekst die Correctie 1 bewust laat staan
// (header.sub "de nieuwe asielregels", r_eu_langdurig.sub "nieuwe statushouders").
const VERBODEN_TAAL = {
  EN: ['the old way', 'old rules', 'new asylum permit', 'new asylum residence permit', 'received or renewed on or after'],
  AR: ['بالطريقة القديمة', 'القواعد القديمة', 'لجوء جديد', 'تصاريح اللجوء الجديدة', 'أو جُدّد في', 'أو مجدّد في'],
  TR: ['eski yoldan', 'eski kurallar', 'yeni bir iltica oturma', 'yeni iltica izni', 'yeni iltica izinleri', 'ya da uzatılan', 'ya da uzatılmış'],
  UK: ['старими правилами', 'старі правила', 'новий дозвіл на притулок', 'новим дозволом', 'нові дозволи на притулок', 'отримано або подовжено', 'отриманий або подовжений'],
  FA: ['به روش قدیم', 'قوانین قدیم', 'پناهندگی جدید', '(verblijfsvergunning asiel) جدید', 'اجازه‌های پناهندگی جدید', 'گرفته‌شده یا تمدیدشده'],
  TI: ['ናይ ቀደም መንገዲ', 'ናይ ቀደም ሕግታት', 'ሓድሽ ናይ ዑቕባ', 'ሓደስቲ ናይ ዑቕባ', 'ዝተረኽበ ወይ ዝተሓደሰ'],
  RO: ['pe calea veche', 'regulile vechi', 'nou permis de', 'permis de azil nou', 'noile permise', 'primit sau reînnoit'],
  PL: ['na starych zasadach', 'stare przepisy', 'starym przepisom', 'nowe zezwolenie azylowe', 'nowym zezwoleniem', 'nowe zezwolenia azylowe', 'otrzymany lub przedłużony', 'otrzymane lub przedłużone'],
};

function checkVerbodenZinnen(taal, taalData) {
  const heleTekst = JSON.stringify(taalData);
  const heleTekstLower = heleTekst.toLowerCase();
  if (taal !== 'NL' && !VERBODEN_TAAL[taal]) fail(`[${taal}] geen verboden-zinnenlijst in check.js (VERBODEN_TAAL)`);
  (VERBODEN_TAAL[taal] || []).forEach(zin => {
    if (heleTekstLower.includes(zin.toLowerCase())) fail(`[${taal}] verboden zin gevonden: "${zin}"`);
  });
  VERBODEN.forEach(zin => {
    if (typeof zin === 'string') {
      if (heleTekstLower.includes(zin.toLowerCase())) fail(`[${taal}] verboden zin gevonden: "${zin}"`);
    } else if (zin instanceof RegExp) {
      if (zin.test(heleTekst)) fail(`[${taal}] verboden patroon gevonden: ${zin}`);
    }
  });
}

// ── Padzuiverheid (Correctie 1, §4 punt 2) ───────────────────────────────
// Simuleert alle routes vanaf v1b → "andere verblijfsvergunning" (het
// antwoord met pad: "regulier") en controleert dat in de GETOONDE tekst op
// elk knooppunt daarna geen asiel/statushouder/vluchteling-taal voorkomt.
// "Getoond" = na filtering op `alleenPad`/`infoAlleenPad` met het pad zoals
// het op dat moment in de simulatie is (zelfde regels als padOk() hierboven
// en huidigPad() in naturalisatie.html: een antwoord zonder eigen `pad`
// verandert het huidige pad niet; een antwoord met een ANDER `pad` wordt in
// deze specifieke "regulier-route"-doorloop niet gevolgd, want dat zou een
// nieuwe, aparte route starten — buiten de scope van déze controle).
//
// Sinds Correctie 1 C4 heeft elke taal een eigen patroon in PAD_VERBODEN
// (§4: "Doe dit voor NL, en na C4 voor alle talen met de zoekwoorden per
// taal."). Een taal zonder patroon is een fout, geen stille overslag.
const PAD_VERBODEN = {
  NL: /asiel(?!status(houders)? en staatlozen)|statushouder|vluchteling(?!enwerk)|VluchtelingenWerk/i,
  // Correctie 1, C4: per taal de woorden die dát taalbestand zelf gebruikt
  // voor asiel, statushouder en vluchteling (stammen, zodat verbuigingen
  // meetellen), plus VluchtelingenWerk (wordt nooit vertaald).
  EN: /asylum|status[- ]holder|refugee|VluchtelingenWerk/i,
  AR: /لجوء|لاجئ|VluchtelingenWerk/,
  // Turks: geen /i, want 'İ'.toLowerCase() is niet 'i' — hoofdletters expliciet.
  TR: /[iİ]ltica|[mM]ülteci|[sS]tatü sahib|VluchtelingenWerk/,
  UK: /притул|біжен|власник\S* статусу|VluchtelingenWerk/i,
  FA: /پناهند|پناهجو|دارند(ه|گان) وضعیت|VluchtelingenWerk/,
  TI: /ዑቕ|ሃለዋት ዋና|VluchtelingenWerk/,
  RO: /azil|refugia|beneficiar\S* de protecție|deținător\S* de statut|VluchtelingenWerk/i,
  PL: /azyl|uchodź|uciekinier|osob\S* z ochroną|posiadacz\S* statusu|VluchtelingenWerk/i,
};

// Nederlandse systeemtermen tussen haakjes (§6, bijv. "(verblijfsvergunning
// asiel)") zijn ook getoonde tekst. Keuze C4: haakjestekst wordt NIET
// genegeerd. In elke niet-NL-taal draait daarom naast het eigen patroon ook
// het NL-patroon over de hele tekst, inclusief haakjes. Een NL-term als
// "(verblijfsvergunning asiel)" staat alleen naast een asielwoord in de eigen
// taal en hoort op het reguliere pad dus niet thuis. Het NL-patroon heeft zelf
// al de uitzonderingen "asielstatushouders en staatlozen" en "VluchtelingenWerk".
// Er is geen extra uitzondering nodig gebleken (zie LOG, C4).
function padPatronen(taal) {
  const eigen = PAD_VERBODEN[taal];
  if (!eigen) return null;
  return taal === 'NL' ? [eigen] : [eigen, PAD_VERBODEN.NL];
}

// Knopen die als GEHEEL zijn uitgezonderd van de padzuiverheidscan (§4: "de
// leges-zinnen ...; v7.uitleg; r_eu_langdurig (algemene informatiepagina)"),
// aangevuld met twee knopen die inherent nodig hebben om "asiel" te noemen
// om een onzekere gebruiker te helpen zijn/haar vergunning te herkennen:
//   - v1b: de route-keuzevraag zelf. Dit IS het keuzemoment (§4: "op elk
//     knooppunt NÁ die keuze"), dus v1b's eigen tekst/antwoorden tellen niet
//     mee, ook niet bij een latere terugkeer via v_asiel_wn → v1b. De keuze
//     dié daar gemaakt wordt (welk antwoord) wordt wél gerespecteerd: een
//     antwoord met een ANDER `pad` wordt niet verder gevolgd (zie hierboven).
//   - v_asiel_wn: de "ik weet het niet zeker"-hulpvraag. Die legt juist uit
//     hoe je "asiel" van "een ander doel" op je verblijfspas onderscheidt —
//     dat kan niet zonder het woord "asiel" te noemen, en de correctie houdt
//     dit knooppunt bewust gedeeld tussen beide routes (§3.2).
//   - r_asiel_onbekend: eindpunt voor "ik kan het niet nagaan", legt exact
//     hetzelfde verschil uit (§3.2 geeft er zelfs letterlijke asiel-tekst
//     voor). Analoog aan v_asiel_wn.
// Dit is een AFWIJKING/aanvulling op de letterlijke uitzonderingenlijst van
// §4 punt 2 — zie LOG-naturalisatie.md, Correctie 1, C3 voor de onderbouwing.
const PADZUIVERHEID_KNOOP_UITGESLOTEN = new Set(['v1b', 'v_asiel_wn', 'r_asiel_onbekend', 'r_kosten', 'r_eu_langdurig']);

// Veld-niveau uitzonderingen (§4 punt 2, letterlijk genoemd): v7.uitleg,
// v8.uitleg, en specifiek stap-index 2 (0-based, de leges-stap) van r_positief.
const PADZUIVERHEID_VELD_UITGESLOTEN = { v7: ['uitleg'], v8: ['uitleg'] };
const PADZUIVERHEID_STAP_UITGESLOTEN = { r_positief: [2] };

function checkPadzuiverheid(taal, vragen, resultaten) {
  const patronen = padPatronen(taal);
  if (!patronen) { fail(`[${taal}] padzuiverheid: geen patroon in PAD_VERBODEN`); return; }

  const v1b = vragen.v1b;
  if (!v1b) return; // structuurfout wordt al elders gemeld
  const regAntwoord = (v1b.antwoorden || []).find(a => a.pad === 'regulier');
  if (!regAntwoord) {
    fail(`[${taal}] padzuiverheid: geen antwoord bij v1b met pad "regulier" gevonden`);
    return;
  }

  const bezocht = new Set();
  function scan(nodeId, veld, tekst) {
    if (typeof tekst !== 'string' || !tekst) return;
    if (patronen.some(p => p.test(tekst))) fail(`[${taal}] padzuiverheid: ${nodeId}.${veld} bevat verboden taal op het reguliere pad: "${tekst.slice(0, 160)}"`);
  }

  function bezoek(id, pad) {
    const sleutel = `${id}|${pad}`;
    if (bezocht.has(sleutel)) return;
    bezocht.add(sleutel);

    const v = vragen[id];
    if (v) {
      const uitgesloten = PADZUIVERHEID_KNOOP_UITGESLOTEN.has(id);
      const veldUit = PADZUIVERHEID_VELD_UITGESLOTEN[id] || [];
      if (!uitgesloten) {
        scan(id, 'tekst', v.tekst);
        if (!veldUit.includes('uitleg')) scan(id, 'uitleg', v.uitleg);
      }
      (v.antwoorden || []).forEach(a => {
        if (!padOk(a.alleenPad, pad)) return; // niet getoond op dit pad
        if (!uitgesloten) { scan(id, 'antwoord.tekst', a.tekst); scan(id, 'antwoord.sub', a.sub); }
        // Een antwoord dat naar een ANDER pad wisselt, verlaat de "regulier
        // route" die hier gecontroleerd wordt — niet verder volgen.
        if (a.pad && a.pad !== pad) return;
        bezoek(a.volgende, a.pad || pad);
      });
      return;
    }

    const r = resultaten[id];
    if (!r) return; // onbekend knooppunt: checkTaal meldt dit al
    const uitgesloten = PADZUIVERHEID_KNOOP_UITGESLOTEN.has(id);
    if (!uitgesloten) {
      scan(id, 'titel', r.titel);
      scan(id, 'sub', r.sub);
      if (padOk(r.infoAlleenPad, pad)) scan(id, 'info', r.info);
      (r.infoBoxen || []).filter(b => padOk(b.alleenPad, pad)).forEach((b, i) => scan(id, `infoBoxen[${i}]`, b.tekst));
      (r.alternatieven || []).filter(a => padOk(a.alleenPad, pad)).forEach((a, i) => {
        scan(id, `alternatieven[${i}].naam`, a.naam);
        scan(id, `alternatieven[${i}].tekst`, a.tekst);
      });
      const stapUit = PADZUIVERHEID_STAP_UITGESLOTEN[id] || [];
      (r.stappen || []).filter(s => padOk(s.alleenPad, pad)).forEach((s, i) => {
        if (stapUit.includes(i)) return;
        scan(id, `stappen[${i}]`, s.tekst);
      });
      (r.paden || []).forEach((p, i) => { scan(id, `paden[${i}].titel`, p.titel); scan(id, `paden[${i}].tekst`, p.tekst); });
      if (r.interneLink) scan(id, 'interneLink.tekst', r.interneLink.tekst);
      scan(id, 'linkTekst', r.linkTekst);
    }
    if (r.interneLink) bezoek(r.interneLink.naar, pad);
  }

  bezoek(regAntwoord.volgende, 'regulier');
}

// ── Pariteit met NL (fase 4.2) ───────────────────────────────────────────
// Velden die geen vertaalbare tekst zijn: die moeten exact gelijk zijn aan NL.
// Correctie 1, §4 punt 4: `pad`/`alleenPad`/`infoAlleenPad` zijn structurele
// route-velden ("asiel"/"regulier"), geen te vertalen tekst — dus hier ook.
const NIET_TEKST = new Set(['icoon', 'klasse', 'volgende', 'type', 'link', 'naar', 'nr', 'pad', 'alleenPad', 'infoAlleenPad']);

// IND heeft alleen NL en EN. NL linkt naar de Nederlandse pagina, alle andere
// talen naar de Engelse tegenhanger (hreflang="en" op de NL-pagina, 26-09-2026).
const IND_EN = {
  'https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie':
    'https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation',
  'https://ind.nl/nl/verblijfsvergunningen/langdurig-ingezetene-eu/verblijfsvergunning-eu-langdurig-ingezetene':
    'https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents',
  'https://ind.nl/nl/asiel-en-nareis-het-migratiepact-en-andere-ontwikkelingen/nieuwe-wetten-en-regels-asiel-en-nareis':
    'https://ind.nl/en/asylum-and-family-reunification-the-migration-pact-and-other-developments/new-laws-and-regulations-for-asylum-and-family-reunification',
};

function bladeren(o, pad = [], uit = {}) {
  if (o && typeof o === 'object') {
    Object.keys(o).forEach(k => bladeren(o[k], pad.concat(k), uit));
  } else {
    uit[pad.join('.')] = o;
  }
  return uit;
}

// Oosters-Arabische (٠-٩) en Perzische (۰-۹) cijfers → 0-9; URL's in href
// tellen niet mee (die worden apart vergeleken).
function cijfers(tekst) {
  const t = String(tekst)
    .replace(/href="[^"]*"/g, '')
    .replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 0x06F0));
  return [...new Set(t.match(/\d+/g) || [])].sort();
}

function hrefs(tekst) {
  return [...String(tekst).matchAll(/href="([^"]*)"/g)].map(m => m[1]).sort();
}

// Platte tekst zonder HTML en zonder alles tussen haakjes (daar mogen de
// Nederlandse systeemtermen staan, §6).
function plat(tekst) {
  return String(tekst)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\([^()]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Nederlandse zinnen van ≥ 6 woorden uit een NL-tekstveld.
function nlZinnen(tekst) {
  return plat(tekst)
    .split(/[.!?:;—]+/)
    .map(z => z.replace(/^[\s,"'→↺⚠️🗓️💡✈️🇪🇺]+|[\s,"']+$/gu, '').trim())
    .filter(z => z.split(/\s+/).filter(Boolean).length >= 6);
}

function checkPariteit(taal, taalData, nlData) {
  const nl = bladeren(nlData);
  const x = bladeren(taalData);
  const ontbreekt = Object.keys(nl).filter(p => !(p in x));
  const extra = Object.keys(x).filter(p => !(p in nl));
  ontbreekt.forEach(p => fail(`[${taal}] pariteit: veld "${p}" ontbreekt (bestaat wel in NL)`));
  extra.forEach(p => fail(`[${taal}] pariteit: veld "${p}" bestaat niet in NL`));

  Object.keys(nl).forEach(p => {
    if (!(p in x)) return;
    const sleutel = p.split('.').pop();
    const a = nl[p];
    const b = x[p];
    if (NIET_TEKST.has(sleutel)) {
      if (sleutel === 'link' && /^https:\/\/ind\.nl\//.test(a) && !IND_EN[a]) {
        fail(`[NL] ${p}: IND-link ${a} staat niet in IND_EN`);
        return;
      }
      const verwacht = sleutel === 'link' && IND_EN[a] ? IND_EN[a] : a;
      if (verwacht !== b) fail(`[${taal}] pariteit: ${p} = ${JSON.stringify(b)}, verwacht ${JSON.stringify(verwacht)}`);
      return;
    }
    if (typeof b !== 'string' || b.trim() === '') {
      fail(`[${taal}] pariteit: ${p} is leeg of geen tekst`);
      return;
    }
    const ca = cijfers(a).join(',');
    const cb = cijfers(b).join(',');
    if (ca !== cb) fail(`[${taal}] pariteit: cijfers in ${p} zijn {${cb}}, NL heeft {${ca}}`);
    if (hrefs(a).join(' ') !== hrefs(b).join(' ')) fail(`[${taal}] pariteit: links (href) in ${p} wijken af van NL`);
    const pb = plat(b);
    nlZinnen(a).forEach(z => {
      if (pb.includes(z)) fail(`[${taal}] pariteit: Nederlandse zin in ${p}: "${z}"`);
    });
  });
}

function checkLegeStrings(taal, taalData) {
  Object.entries(bladeren(taalData)).forEach(([p, v]) => {
    if (typeof v === 'string' && v.trim() === '') fail(`[${taal}] leeg tekstveld: ${p}`);
  });
}

// ── Verplichte zinnen per vertaalde taal ─────────────────────────────────
// De NL-controle hieronder (checkVerplichteZinnenNL) werkt op Nederlandse
// tekst. Voor de andere talen geldt hetzelfde principe (§2.2, §6): elk
// resultaat met het KABINET-blok en r_inkomen zegt "nog geen wet", en
// r_eu_li_eerst zegt "niet online" — in de vertaalde bewoording hieronder.
const VERPLICHT = {
  EN: { nogGeenWet: 'not yet law', nietOnline: 'not online' },
  AR: { nogGeenWet: 'ليست قانوناً بعد', nietOnline: 'ليس عبر الإنترنت' },
  TR: { nogGeenWet: 'henüz yasa değil', nietOnline: 'internet üzerinden değil' },
  UK: { nogGeenWet: 'ще не закон', nietOnline: 'не онлайн' },
  FA: { nogGeenWet: 'هنوز قانون نیست', nietOnline: 'نه آنلاین' },
  TI: { nogGeenWet: 'ገና ሕጊ ኣይኮነን', nietOnline: 'ብኦንላይን ኣይኮነን' },
  RO: { nogGeenWet: 'încă nu este lege', nietOnline: 'nu online' },
  PL: { nogGeenWet: 'jeszcze nie jest prawem', nietOnline: 'nie online' },
};

function checkVerplichteZinnenTaal(taal, resultaten, nlResultaten) {
  const v = VERPLICHT[taal];
  if (!v) { fail(`[${taal}] geen verplichte-zinnenset in check.js (VERPLICHT)`); return; }
  const bevat = (obj, zin) => JSON.stringify(obj || {}).toLowerCase().includes(zin.toLowerCase());
  if (!bevat(resultaten.r_inkomen, v.nogGeenWet)) fail(`[${taal}] r_inkomen bevat niet "${v.nogGeenWet}"`);
  // Welke resultaten het KABINET-blok hebben, bepaalt NL.
  Object.entries(nlResultaten).forEach(([id, r]) => {
    if (/plan van het kabinet/i.test(JSON.stringify(r)) && !bevat(resultaten[id], v.nogGeenWet)) {
      fail(`[${taal}] resultaat "${id}" hoort het KABINET-blok te hebben, maar bevat niet "${v.nogGeenWet}"`);
    }
  });
  if (!bevat(resultaten.r_eu_li_eerst, v.nietOnline)) fail(`[${taal}] r_eu_li_eerst bevat niet "${v.nietOnline}"`);
}

// ── Verplichte zinnen NL ──────────────────────────────────────────────────
function checkVerplichteZinnenNL(vragen, resultaten) {
  const rInkomen = JSON.stringify(resultaten.r_inkomen || {});
  if (!/nog geen wet/i.test(rInkomen)) fail('[NL] r_inkomen bevat niet "nog geen wet"');

  // "Elk resultaat met KABINET" = elk resultaat dat het herbruikte KABINET-infoblok/
  // -alternatief bevat (herkenbaar aan "Plan van het kabinet"), niet elke toevallige
  // vermelding van "kabinet" (bijv. r_bezig_z noemt het kabinetsplan A2→B1 los hiervan).
  Object.entries(resultaten).forEach(([id, r]) => {
    const tekst = JSON.stringify(r);
    if (/plan van het kabinet/i.test(tekst) && !/nog geen wet/i.test(tekst)) {
      fail(`[NL] resultaat "${id}" bevat het KABINET-blok, maar niet "nog geen wet"`);
    }
  });

  const rEuLiEerst = JSON.stringify(resultaten.r_eu_li_eerst || {});
  if (!/niet online/i.test(rEuLiEerst)) fail('[NL] r_eu_li_eerst bevat niet "niet online"');
}

function main() {
  const args = process.argv.slice(2);
  let taalFilter = null;
  const idx = args.indexOf('--taal');
  if (idx !== -1 && args[idx + 1]) taalFilter = args[idx + 1].toUpperCase();

  const data = laadData();
  const NAT = data._NAT;
  if (!NAT) {
    console.error('window._NAT niet gevonden in naturalisatie-data.js');
    process.exit(1);
  }

  const talen = taalFilter ? [taalFilter] : Object.keys(NAT);

  talen.forEach(taal => {
    if (!NAT[taal]) { fail(`taal "${taal}" bestaat niet in _NAT`); return; }
    const { vragen, resultaten } = checkTaal(taal, NAT[taal]);
    checkVerbodenZinnen(taal, NAT[taal]);
    checkLegeStrings(taal, NAT[taal]);
    checkPadzuiverheid(taal, vragen, resultaten);

    if (taal === 'NL') {
      checkVerplichteZinnenNL(vragen, resultaten);
    } else if (NAT.NL) {
      checkPariteit(taal, NAT[taal], NAT.NL);
      checkVerplichteZinnenTaal(taal, resultaten, NAT.NL.resultaten || {});
    } else {
      fail(`[${taal}] pariteit niet te controleren: _NAT.NL ontbreekt`);
    }
    Object.entries(SCENARIOS).forEach(([id, scenario]) => simuleerScenario(taal, id, scenario, vragen, resultaten));
  });

  if (FOUTEN.length) {
    console.error(`❌ ${FOUTEN.length} fout(en) gevonden:`);
    FOUTEN.forEach(f => console.error(' - ' + f));
    process.exit(1);
  }
  console.log(`✅ check.js groen (${talen.join(', ')})`);
}

// Fase 5 (§7): tests/naturalisatie.spec.js hergebruikt de vaste
// [vraagId, antwoordIndex]-scenariopaden hieronder in plaats van op tekst te
// zoeken. `main()` draait alleen bij CLI-gebruik, niet bij `require()`.
// Correctie 1, C5: `PAD_VERBODEN` (de padzuiverheids-woordenlijst per taal,
// §4 punt 2) wordt ook geëxporteerd, zodat de voorleestest in
// naturalisatie.spec.js dezelfde woordenlijst gebruikt in plaats van er een
// eigen kopie van te maken.
module.exports = { SCENARIOS, laadData, PAD_VERBODEN };

if (require.main === module) {
  main();
}
