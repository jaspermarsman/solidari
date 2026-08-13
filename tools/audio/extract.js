#!/usr/bin/env node
/**
 * Fase 2 — extractie. Verzamelt per taal de voorleesbare standaardteksten en
 * schrijft tools/audio/teksten-<taal>.json met {hash, tekst, bron, prioriteit}.
 *
 * Prioriteit (D-24):
 *   1 = UI-strings (i18n GEDEELD) + taalnamen + toolnamen/omschrijvingen
 *   2 = zeg-zinnen (horen bij NL, D-07)
 * Prioriteit 3–5 (pagina-koppen, volledige inhoud, datasets) worden in deze
 * eerste generatie NIET meegenomen (D-24 budget/kwaliteit) — gelogd in het LOG.
 *
 * De hash moet byte-identiek zijn aan spraak.js: SHA-1 over de genormaliseerde
 * tekst (NFC, witruimte→één spatie, trim), eerste 16 hex.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '../..');
const UIT = __dirname;
const TALEN = ['NL', 'EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL'];

// Gesproken eigennamen van de talen (§5)
const TAALNAMEN = {
  NL: 'Nederlands', EN: 'English', AR: 'العربية', TR: 'Türkçe', TI: 'ትግርኛ',
  UK: 'Українська', FA: 'دری', RO: 'Română', PL: 'Polski',
};

function normaliseer(t) {
  return String(t == null ? '' : t).normalize('NFC').replace(/\s+/g, ' ').trim();
}
function hashVan(t) {
  return crypto.createHash('sha1').update(normaliseer(t), 'utf8').digest('hex').slice(0, 16);
}
function bevatCijfer(t) { return /[0-9٠-٩۰-۹]/.test(t); }

// ── GEDEELD-object uit i18n.js halen ───────────────────────────────────────
function leesGedeeld() {
  const src = fs.readFileSync(path.join(ROOT, 'i18n.js'), 'utf8');
  const start = src.indexOf('const GEDEELD = ');
  const eind = src.indexOf('// RTL talen');
  if (start < 0 || eind < 0) throw new Error('GEDEELD niet gevonden in i18n.js');
  let seg = src.slice(start + 'const GEDEELD = '.length, eind).trim();
  if (seg.endsWith(';')) seg = seg.slice(0, -1);
  // eslint-disable-next-line no-eval
  return eval('(' + seg + ')');
}

// ── zeg-zinnen uit goedvoorbereid-data.js (NL) ─────────────────────────────
function leesZegZinnen() {
  const src = fs.readFileSync(path.join(ROOT, 'goedvoorbereid-data.js'), 'utf8');
  const uit = [];
  const re = /zeg:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(src))) uit.push(m[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\'));
  return uit;
}

function main() {
  const GEDEELD = leesGedeeld();
  const zeg = leesZegZinnen();
  const budget = {};

  for (const taal of TALEN) {
    const items = new Map(); // hash → item (dedupe)
    const voegToe = (tekst, bron, prio) => {
      const g = normaliseer(tekst);
      if (!g) return;
      const h = hashVan(g);
      if (!items.has(h)) items.set(h, { hash: h, tekst: g, bron, prioriteit: prio, cijfer: bevatCijfer(g) });
    };

    // Prioriteit 1: alle UI-strings van deze taal + de taalnaam
    const strings = GEDEELD[taal] || {};
    for (const sleutel of Object.keys(strings)) voegToe(strings[sleutel], 'ui:' + sleutel, 1);
    voegToe(TAALNAMEN[taal], 'taalnaam', 1);

    // Prioriteit 2: zeg-zinnen — alleen NL (D-07)
    if (taal === 'NL') for (const z of zeg) voegToe(z, 'zeg', 2);

    const lijst = [...items.values()];
    fs.writeFileSync(path.join(UIT, `teksten-${taal.toLowerCase()}.json`), JSON.stringify(lijst, null, 2));

    const tekens = lijst.reduce((a, it) => a + it.tekst.length, 0);
    const schatSec = tekens / 15;                 // ≈ 15 tekens/sec spraak
    const schatKB = schatSec * 6;                 // ≈ 6 KB/s mp3 @48kbps
    budget[taal] = { clips: lijst.length, tekens, schatSec: Math.round(schatSec), schatKB: Math.round(schatKB) };
  }

  const totKB = Object.values(budget).reduce((a, b) => a + b.schatKB, 0);
  console.log('Extractie klaar. Geschat totaal: ' + Math.round(totKB / 1024) + ' MB (budget ≤ 250 MB).');
  for (const taal of TALEN) {
    const b = budget[taal];
    const vlag = b.schatKB / 1024 > 30 ? '  ⚠ >30MB' : '';
    console.log(`  ${taal}: ${b.clips} clips, ~${Math.round(b.schatKB / 1024 * 10) / 10} MB${vlag}`);
  }
  fs.writeFileSync(path.join(UIT, 'budget.json'), JSON.stringify(budget, null, 2));
}

main();
