#!/usr/bin/env node
// Solidari — nakijklijst voor vertalingen die niemand heeft nagekeken (PLAN 18, K-4, B-5/B-6).
// Leest i18n.js (GEDEELD) en tools/modellen/taalregels.json, en schrijft één printbare HTML-pagina:
// per taal een tabel (sleutel, Nederlandse bron, huidige vertaling, plek op de site, plan, lege kolom
// "Correctie"), plus voor TI een blok met wat er nu níet in het Tigrinya staat (pictogram of NL).
// Alleen tekst uit die twee bronnen, geen persoonsgegevens. Geen netwerk, geen API.
//
//   node tools/vertaal/nakijklijst.mjs [uitvoer.html]
//   standaard: <hoofdmap>/_werkdocumenten/vertalingen-nakijken.html (buiten git)
//
// De lijst van "niet gereviewd" is vast (NIET_GEREVIEWD hieronder). Nieuwe zelfgemaakte vertaling?
// Voeg de sleutel HIER toe, met plek en plan. Na correctie door een moedertaalspreker: sleutel eruit.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const TALEN = ['EN', 'AR', 'TR', 'UK', 'FA', 'RO', 'PL', 'TI'];
const NAAM = { EN: 'Engels — English', AR: 'Arabisch — العربية', TR: 'Turks — Türkçe', UK: 'Oekraïens — Українська',
  FA: 'Dari — دری', RO: 'Roemeens — Română', PL: 'Pools — Polski', TI: 'Tigrinya — ትግርኛ' };
const RTL = ['AR', 'FA'];

// Sleutels in i18n.js die de uitvoerder zelf vertaalde (PLAN 14–18). PLAN 7 is gereviewd en staat er niet in.
const NIET_GEREVIEWD = [
  { sleutel: 'nav-terug-tools', plan: 'PLAN 14', plek: 'brief.html: de link bovenaan, terug naar alle tools' },
  { sleutel: 'a11y-nog-eens', plan: 'PLAN 15', plek: 'Alle pagina\'s, voorleesstand: label op een knop na de eerste tik ("👆 Nog een keer")' },
  { sleutel: 'a11y-tik-nog-eens', plan: 'PLAN 15', plek: 'Alle pagina\'s, voorleesstand: gesproken zin na de eerste tik op een knop' },
  { sleutel: 'a11y-vraag-voorlezen', plan: 'PLAN 16', plek: 'Welkomstscherm: de vraag na de taalkeuze' },
  { sleutel: 'a11y-ja', plan: 'PLAN 16', plek: 'Welkomstscherm: knop bij de vraag over voorlezen' },
  { sleutel: 'a11y-nee', plan: 'PLAN 16', plek: 'Welkomstscherm: knop bij de vraag over voorlezen' },
  { sleutel: 'a11y-checklist', plan: 'PLAN 16', plek: '18jaar.html, voorleesstand: gesproken woord vóór de titel van de checklist' },
  { sleutel: 'a11y-afgevinkt', plan: 'PLAN 16', plek: '18jaar.html, voorleesstand: gesproken stand van een afgevinkte regel' },
  { sleutel: 'a11y-niet-gedaan', plan: 'PLAN 16', plek: '18jaar.html, voorleesstand: gesproken stand van een open regel' },
  { sleutel: 'upload-kies-bestand', plan: 'PLAN 18', plek: 'brief.html: knop in het uploadvlak ("📂 Kies bestand")' },
  { sleutel: 'upload-formaten', plan: 'PLAN 18', plek: 'brief.html: regel onder de uploadknoppen' },
];
// Velden in taalregels.json (PLAN 12 en 13). Behalve NL door niemand nagelezen.
const TAALREGELS = [
  { veld: 'kort', plan: 'PLAN 12', plek: 'Niet zichtbaar: laatste regel van de opdracht aan de AI (budgethulp, rechten, Goed voorbereid). Bepaalt de taal van het antwoord.' },
  { veld: 'json', plan: 'PLAN 12', plek: 'Niet zichtbaar: opdracht aan de AI van de Brief Begrijper. Bepaalt de taal van de uitleg.' },
  { veld: 'slotzin_budget', plan: 'PLAN 13', plek: 'budgethulp.html: vaste laatste zin onder het antwoord' },
];

function laadGedeeld() {
  const code = fs.readFileSync(path.join(ROOT, 'i18n.js'), 'utf8');
  const m = code.match(/const GEDEELD = (\{[\s\S]*?\n  \});/);
  if (!m) throw new Error('GEDEELD niet gevonden in i18n.js');
  return vm.runInNewContext('(' + m[1] + ')');
}
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ETHIOPISCH = /[ሀ-᎟ⶀ-⷟꬀-꬯]/u;
const LETTERS = /\p{L}{2,}/u;

export function maakLijst() {
  const g = laadGedeeld();
  const regels = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'modellen', 'taalregels.json'), 'utf8'));
  const ontbreekt = NIET_GEREVIEWD.filter(({ sleutel }) => ['NL', ...TALEN].some((t) => !(g[t] && sleutel in g[t])));
  if (ontbreekt.length) throw new Error('niet in alle talen in i18n.js: ' + ontbreekt.map((x) => x.sleutel).join(', '));

  const perTaal = {};
  for (const taal of TALEN) {
    const rijen = NIET_GEREVIEWD.map(({ sleutel, plan, plek }) => ({ sleutel, plan, plek, nl: g.NL[sleutel], nu: g[taal][sleutel] }));
    for (const { veld, plan, plek } of TAALREGELS) {
      const nu = (regels[taal.toLowerCase()] || {})[veld];
      if (nu) rijen.push({ sleutel: 'taalregels.' + veld, plan, plek, nl: regels.nl[veld], nu });
    }
    // In TI horen pictogrammen en Nederlandse tekst in het aparte blok, niet bij de vertalingen (B-6).
    perTaal[taal] = taal === 'TI' ? rijen.filter((r) => ETHIOPISCH.test(r.nu)) : rijen;
  }

  // B-6: wat er nu níet in het Tigrinya staat, over alle sleutels van i18n.js en de taalregels.
  const tiNiet = [];
  for (const [sleutel, nl] of Object.entries(g.NL)) {
    const nu = g.TI[sleutel];
    if (typeof nl !== 'string' || !LETTERS.test(nl) || nu === undefined) continue;
    if (!ETHIOPISCH.test(nu)) {
      const bron = NIET_GEREVIEWD.find((x) => x.sleutel === sleutel);
      tiNiet.push({ sleutel, nl, nu, soort: nu === nl ? 'Nederlands' : 'pictogram of anders', plek: bron ? bron.plek : '', plan: bron ? bron.plan : '' });
    }
  }
  for (const { veld, plan, plek } of TAALREGELS) {
    if (!(regels.ti || {})[veld]) tiNiet.push({ sleutel: 'taalregels.' + veld, nl: regels.nl[veld], nu: '', soort: 'leeg (S-9)', plek, plan });
  }
  return { perTaal, tiNiet };
}

function tabel(rijen, taal) {
  const dir = RTL.includes(taal) ? ' dir="rtl"' : '';
  return `<table><thead><tr><th>Sleutel</th><th>Nederlands (bron)</th><th>Huidige vertaling</th><th>Waar op de site</th><th>Plan</th><th class="corr">Correctie</th></tr></thead><tbody>
${rijen.map((r) => `<tr><td class="code">${esc(r.sleutel)}</td><td lang="nl">${esc(r.nl)}</td><td lang="${taal.toLowerCase()}"${dir}>${esc(r.nu)}</td><td>${esc(r.plek)}</td><td>${esc(r.plan)}</td><td class="corr"></td></tr>`).join('\n')}
</tbody></table>`;
}

export function maakHtml({ perTaal, tiNiet }) {
  const delen = TALEN.map((taal) => {
    let s = `<section class="taal"><h2>${esc(NAAM[taal])}</h2><p class="aantal">${perTaal[taal].length} teksten om na te kijken.</p>${tabel(perTaal[taal], taal)}`;
    if (taal === 'TI') {
      s += `<h3>Nu niet in het Tigrinya</h3>
<p>Hier staat nu een pictogram, Nederlandse tekst of niets. Wilt u een Tigrinya tekst voorstellen? Schrijf hem in de kolom "Correctie".<br>
<span lang="en">These texts are not in Tigrinya yet (a pictogram, Dutch text, or nothing). Please write a Tigrinya suggestion in the "Correctie" column.</span></p>
<table><thead><tr><th>Sleutel</th><th>Nederlands (bron)</th><th>Nu op de site</th><th>Soort</th><th>Waar op de site</th><th class="corr">Correctie</th></tr></thead><tbody>
${tiNiet.map((r) => `<tr><td class="code">${esc(r.sleutel)}</td><td lang="nl">${esc(r.nl)}</td><td>${esc(r.nu)}</td><td>${esc(r.soort)}</td><td>${esc(r.plek)}</td><td class="corr"></td></tr>`).join('\n')}
</tbody></table><p class="aantal">${tiNiet.length} teksten.</p>`;
    }
    return s + '</section>';
  }).join('\n');
  return `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vertalingen nakijken</title>
<style>
  :root { --tekst: #1d2b22; --licht: #5b6b60; --rand: #cfd8d2; --kop: #eef3ef; --bg: #ffffff; }
  @media (prefers-color-scheme: dark) { :root { --tekst: #e6ece8; --licht: #a9b8ae; --rand: #3a4a40; --kop: #24302a; --bg: #151c18; } }
  body { font-family: system-ui, sans-serif; color: var(--tekst); background: var(--bg); margin: 0 auto; max-width: 1100px; padding: 16px; line-height: 1.45; }
  h1 { font-size: 1.5rem; } h2 { font-size: 1.25rem; margin-top: 2rem; border-bottom: 2px solid var(--rand); padding-bottom: 4px; } h3 { font-size: 1.05rem; margin-top: 1.5rem; }
  .uitleg { color: var(--licht); }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { border: 1px solid var(--rand); padding: 6px 8px; text-align: start; vertical-align: top; }
  th { background: var(--kop); }
  .code { font-family: ui-monospace, monospace; font-size: 0.8rem; word-break: break-all; }
  .corr { min-width: 180px; }
  .aantal { color: var(--licht); font-size: 0.85rem; }
  .tabelbox { overflow-x: auto; }
  @media (max-width: 700px) { table { font-size: 0.8rem; } .corr { min-width: 100px; } }
  @media print { body { max-width: none; color: #000; background: #fff; } .taal { break-before: page; } .taal:first-of-type { break-before: auto; } td.corr { height: 3em; } }
</style></head><body>
<h1>Vertalingen nakijken — Solidari</h1>
<div class="uitleg">
<p>Deze teksten zijn vertaald zonder dat een moedertaalspreker ze heeft nagekeken. Kijk per regel of de vertaling klopt en natuurlijk klinkt, in dezelfde aanspreekvorm als de rest van de site in die taal. Staat er iets niet goed? Schrijf de verbetering in de kolom "Correctie". Is het goed? Laat de kolom leeg. Elke taal staat op een eigen pagina als u print.</p>
<p lang="en">These texts were translated without review by a native speaker. Please check each line: is it correct and natural, and does it address the reader the same way as the rest of the site in that language? If not, write your improvement in the "Correctie" column. If it is fine, leave it empty. Each language prints on its own page.</p>
<p>Gemaakt met <code>tools/vertaal/nakijklijst.mjs</code> uit <code>i18n.js</code> en <code>tools/modellen/taalregels.json</code>.</p>
</div>
${delen.replace(/<table>/g, '<div class="tabelbox"><table>').replace(/<\/table>/g, '</table></div>')}
</body></html>
`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const uit = path.resolve(process.argv[2] || path.join(ROOT, '_werkdocumenten', 'vertalingen-nakijken.html'));
  const lijst = maakLijst();
  fs.writeFileSync(uit, maakHtml(lijst));
  for (const taal of TALEN) console.log(`${taal}: ${lijst.perTaal[taal].length}`);
  console.log(`TI niet in het Tigrinya: ${lijst.tiNiet.length}`);
  console.log('→ ' + uit);
}
