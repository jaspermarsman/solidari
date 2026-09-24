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

// ── §8 scenariotabel ──────────────────────────────────────────────────────
// Elk pad is een lijst van [vraagId, antwoordIndex]. Dit is taal-onafhankelijk
// zolang de structuur (aantal/volgorde antwoorden, volgende-doelen) gelijk
// blijft aan NL — precies wat N-9/§6 eist (en wat checkPariteit afdwingt).
// Draait sinds fase 4 in elke gecontroleerde taal.
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

function simuleerScenario(taal, id, scenario, vragen, resultaten) {
  const sfail = msg => fail(`[${taal}] ${msg}`);
  let huidig = 'v1';
  for (const [vraagId, idx] of scenario.pad) {
    if (huidig !== vraagId) {
      sfail(`${id}: verwachtte dat we bij vraag ${vraagId} zouden staan, maar staan op ${huidig}`);
      return;
    }
    const v = vragen[vraagId];
    if (!v) { sfail(`${id}: vraag ${vraagId} bestaat niet`); return; }
    const a = (v.antwoorden || [])[idx];
    if (!a) { sfail(`${id}: antwoord[${idx}] bestaat niet bij vraag ${vraagId}`); return; }
    huidig = a.volgende;
  }
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

// ── Pariteit met NL (fase 4.2) ───────────────────────────────────────────
// Velden die geen vertaalbare tekst zijn: die moeten exact gelijk zijn aan NL.
const NIET_TEKST = new Set(['icoon', 'klasse', 'volgende', 'type', 'link', 'naar', 'nr']);

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
      if (a !== b) fail(`[${taal}] pariteit: ${p} = ${JSON.stringify(b)}, NL = ${JSON.stringify(a)}`);
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
module.exports = { SCENARIOS, laadData };

if (require.main === module) {
  main();
}
