#!/usr/bin/env node
// Solidari — sleutelpariteit over de negen talen (PLAN-3 fase 5.3).
// Laadt i18n.js in een mini-DOM-stub, leest GEDEELD uit, en controleert per sleutel:
//   - aanwezig in alle 9 talen, niet leeg
//   - heuristiek: een niet-NL waarde die identiek is aan de NL-waarde én Nederlandse lidwoorden bevat → waarschuwing
// Optioneel: extra extend()-blokken uit HTML-pagina's (argumenten) worden ook meegenomen.
// Gebruik: node tools/test/i18n-pariteit.js [pagina.html ...]
// Exit 0 = GROEN, 1 = ontbrekende/lege sleutels.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const TALEN = ['NL', 'EN', 'AR', 'TR', 'TI', 'UK', 'FA', 'RO', 'PL'];

function laadI18n() {
  const code = fs.readFileSync(path.join(ROOT, 'i18n.js'), 'utf8');
  const vertalingen = {};
  const stubEl = { setAttribute() {}, getAttribute() { return null; }, addEventListener() {}, classList: { add() {}, remove() {} }, style: {} };
  const sandbox = {
    window: {}, document: { addEventListener() {}, querySelectorAll() { return []; }, querySelector() { return null; }, getElementById() { return null; }, documentElement: stubEl, body: stubEl, createElement() { return stubEl; } },
    localStorage: { getItem() { return null; }, setItem() {} }, navigator: { language: 'nl' }, console,
  };
  sandbox.window.Solidari = {};
  sandbox.Solidari = sandbox.window.Solidari;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const i18n = sandbox.window.Solidari.i18n;
  // Pak de interne tabel via extend() met een marker: we spiegelen GEDEELD door de bron te parsen
  const m = code.match(/const GEDEELD = (\{[\s\S]*?\n  \});/);
  if (!m) throw new Error('GEDEELD niet gevonden in i18n.js');
  const gedeeld = vm.runInNewContext('(' + m[1] + ')');
  return { i18n, gedeeld };
}

function extendBlokkenUit(html) {
  // Vind Solidari.i18n.extend({...}) blokken en evalueer ze geïsoleerd (best effort)
  const blokken = [];
  const re = /Solidari\.i18n\.extend\(\s*(\{[\s\S]*?\n\s*\})\s*\)/g;
  let m;
  while ((m = re.exec(html))) {
    try { blokken.push(vm.runInNewContext('(' + m[1] + ')')); } catch (e) { /* lambda's e.d. — overslaan */ }
  }
  return blokken;
}

const { gedeeld } = laadI18n();
const bronnen = [{ naam: 'i18n.js (GEDEELD)', tabel: gedeeld }];
for (const arg of process.argv.slice(2)) {
  const html = fs.readFileSync(path.resolve(ROOT, arg), 'utf8');
  extendBlokkenUit(html).forEach((t, i) => bronnen.push({ naam: `${arg} extend#${i + 1}`, tabel: t }));
}

let fouten = 0, waarschuwingen = 0;
for (const { naam, tabel } of bronnen) {
  const sleutels = new Set();
  for (const taal of TALEN) Object.keys(tabel[taal] || {}).forEach((k) => sleutels.add(k));
  const ontbrekendeTalen = TALEN.filter((t) => !tabel[t]);
  if (ontbrekendeTalen.length) { console.log(`FOUT  ${naam}: talen ontbreken: ${ontbrekendeTalen.join(', ')}`); fouten++; }
  for (const k of sleutels) {
    const ontbreekt = TALEN.filter((t) => tabel[t] && (tabel[t][k] === undefined || String(tabel[t][k]).trim() === ''));
    if (ontbreekt.length) { console.log(`FOUT  ${naam}: '${k}' ontbreekt/leeg in ${ontbreekt.join(', ')}`); fouten++; }
    const nl = tabel.NL && tabel.NL[k];
    if (typeof nl === 'string' && / (de|het|een|van|voor) /.test(' ' + nl + ' ')) {
      for (const t of TALEN.filter((x) => x !== 'NL')) {
        const v = tabel[t] && tabel[t][k];
        if (typeof v === 'string' && v === nl && nl.length > 12) { console.log(`WAARSCHUWING ${naam}: '${k}' in ${t} is identiek aan NL`); waarschuwingen++; }
      }
    }
  }
  console.log(`${naam}: ${sleutels.size} sleutels × ${TALEN.length} talen gecontroleerd`);
}
console.log(`\nRESULTAAT: ${fouten ? 'FOUT (' + fouten + ')' : 'GROEN'}${waarschuwingen ? ', ' + waarschuwingen + ' waarschuwing(en)' : ''}`);
process.exit(fouten ? 1 : 0);
