#!/usr/bin/env node
// check.js — controleert naturalisatie-data.js (fase 3 van
// PLAN-naturalisatie-migratiepact.md). Exit 1 bij een fout.
//
// Gebruik:
//   node tools/naturalisatie/check.js --taal NL   (één taal)
//   node tools/naturalisatie/check.js             (alle talen in _NAT)
//
// Fase 3 draait dit alleen met --taal NL. Fase 4 breidt dit bestand uit
// met een pariteitscontrole over alle negen talen (zie §7 fase 4.2 van
// het plan) — dat is hier nog niet geïmplementeerd.

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

// ── §8 scenariotabel ──────────────────────────────────────────────────────
// Elk pad is een lijst van [vraagId, antwoordIndex]. Dit is taal-onafhankelijk
// zolang de structuur (aantal/volgorde antwoorden, volgende-doelen) gelijk
// blijft aan NL — precies wat N-9/§6 eist. Nu (fase 3) alleen tegen NL gedraaid,
// omdat de andere talen deze vraag-ID's nog niet hebben (dat is fase 4).
const SCENARIOS = {
  'S-1': {
    pad: [['v1', 0], ['v1b', 1], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0], ['v7', 0], ['v8', 0]],
    verwacht: 'r_positief',
  },
  'S-2': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 0], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0], ['v7', 0], ['v8', 0]],
    verwacht: 'r_positief',
  },
  'S-3': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 1], ['v_asiel5', 0], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0], ['v7', 0], ['v8', 0]],
    verwacht: 'r_positief',
    infokaartGezien: 'v_asiel5',
  },
  'S-4': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 2], ['e1', 0], ['e2', 0], ['e3', 0], ['e4', 0]],
    verwacht: 'r_eu_li_eerst',
  },
  'S-5': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 2], ['e1', 0], ['e2', 0], ['e3', 2]],
    verwacht: 'r_inkomen',
  },
  'S-6': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 2], ['e1', 0], ['e2', 0], ['e3', 0], ['e4', 1]],
    verwacht: 'r_eu_li_eerst_z',
  },
  'S-7': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 2], ['e1', 0], ['e2', 1]],
    verwacht: 'r_eu_li_afwezig',
  },
  'S-8': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 2], ['e1', 1]],
    verwacht: 'r_te_kort_nieuw',
  },
  'S-9': {
    pad: [['v1', 0], ['v1b', 3], ['v_asiel_wn', 1]],
    verwacht: 'r_asiel_onbekend',
  },
  'S-10': {
    pad: [['v1', 0], ['v1b', 3], ['v_asiel_wn', 0], ['v1b', 0], ['v_asiel', 2], ['e1', 0], ['e2', 2], ['e3', 1], ['e4', 2]],
    verwacht: 'r_eu_li_inburgering_bezig',
  },
  'S-11': {
    pad: [['v1', 0], ['v1b', 0], ['v_asiel', 3], ['v2', 0], ['v3', 1], ['v4a', 0], ['v5', 0], ['v6', 0], ['v7', 0], ['v8', 0]],
    verwacht: 'r_positief',
  },
  'S-12': {
    pad: [['v1', 0], ['v1b', 1], ['v2', 0], ['v3', 0]],
    verwacht: 'r_te_kort',
    verbiedt: ['tijdelijke vergunning'],
  },
};

function simuleerScenario(id, scenario, vragen, resultaten) {
  let huidig = 'v1';
  for (const [vraagId, idx] of scenario.pad) {
    if (huidig !== vraagId) {
      fail(`${id}: verwachtte dat we bij vraag ${vraagId} zouden staan, maar staan op ${huidig}`);
      return;
    }
    const v = vragen[vraagId];
    if (!v) { fail(`${id}: vraag ${vraagId} bestaat niet`); return; }
    const a = (v.antwoorden || [])[idx];
    if (!a) { fail(`${id}: antwoord[${idx}] bestaat niet bij vraag ${vraagId}`); return; }
    huidig = a.volgende;
  }
  if (huidig !== scenario.verwacht) {
    fail(`${id}: pad kwam uit op "${huidig}", verwacht was "${scenario.verwacht}"`);
    return;
  }
  if (scenario.verbiedt) {
    const res = resultaten[huidig] || {};
    const tekst = JSON.stringify(res).toLowerCase();
    scenario.verbiedt.forEach(zin => {
      if (tekst.includes(zin.toLowerCase())) fail(`${id}: resultaat ${huidig} bevat verboden zin "${zin}"`);
    });
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
const VERBODEN = [
  'vanuit een geldige tijdelijke vergunning',
  'toegankelijker, want daarvoor geldt géén inkomenseis',
  'eu-li',
  /stap\s+\d+\s+van\s+\d+/i,
];

function checkVerbodenZinnen(taal, taalData) {
  const heleTekst = JSON.stringify(taalData);
  const heleTekstLower = heleTekst.toLowerCase();
  VERBODEN.forEach(zin => {
    if (typeof zin === 'string') {
      if (heleTekstLower.includes(zin.toLowerCase())) fail(`[${taal}] verboden zin gevonden: "${zin}"`);
    } else if (zin instanceof RegExp) {
      if (zin.test(heleTekst)) fail(`[${taal}] verboden patroon gevonden: ${zin}`);
    }
  });
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

    if (taal === 'NL') {
      checkVerplichteZinnenNL(vragen, resultaten);
      Object.entries(SCENARIOS).forEach(([id, scenario]) => simuleerScenario(id, scenario, vragen, resultaten));
    }
  });

  if (FOUTEN.length) {
    console.error(`❌ ${FOUTEN.length} fout(en) gevonden:`);
    FOUTEN.forEach(f => console.error(' - ' + f));
    process.exit(1);
  }
  console.log(`✅ check.js groen (${talen.join(', ')})`);
}

main();
