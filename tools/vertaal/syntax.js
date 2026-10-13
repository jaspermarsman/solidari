#!/usr/bin/env node
// Solidari — syntaxcontrole voor aangeraakte bestanden (PLAN-7 regel §5.6).
// .js → `node --check`; .html → elk inline <script> wordt als script geparsed (niet uitgevoerd).
// Gebruik: node tools/vertaal/syntax.js bestand.html bestand.js …   Exit 1 bij een fout.
'use strict';
const fs = require('fs');
const vm = require('vm');
const { execFileSync } = require('child_process');

let fout = 0;
for (const f of process.argv.slice(2)) {
  try {
    if (f.endsWith('.js')) execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' });
    else {
      const src = fs.readFileSync(f, 'utf8');
      let n = 0;
      for (const m of src.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
        new vm.Script(m[1], { filename: `${f} <script #${++n}>` });
      }
    }
    console.log(`ok    ${f}`);
  } catch (e) {
    fout++;
    console.log(`FOUT  ${f}: ${String(e.stderr || e.message).split('\n').slice(0, 4).join(' | ')}`);
  }
}
process.exit(fout ? 1 : 0);
