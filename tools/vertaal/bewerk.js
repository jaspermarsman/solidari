// Solidari — gerichte bewerkingen in taalbronnen (PLAN-7, regel §5.7).
// Nooit een heel bestand herschrijven: elke bewerking raakt alleen de bytes van één
// string-literal, of voegt één regel toe naast een bestaande sleutel. Commentaar, opmaak en
// alle andere talen blijven byte-identiek.
'use strict';
const fs = require('fs');
const path = require('path');
const B = require('./bronnen.js');

// Een JS-stringliteral in de stijl van het bestand (quote-teken van de buurman).
function literal(waarde, quote) {
  const q = quote === '"' ? '"' : "'";
  return q + String(waarde)
    .replace(/\\/g, '\\\\')
    .replace(new RegExp(q, 'g'), '\\' + q)
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t') + q;
}

function sleutelTekst(k, quote) { return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : literal(k, quote); }

// Bewerkingen per bestand verzamelen en in één keer, van achter naar voren, toepassen,
// zodat de offsets van eerdere bewerkingen kloppen.
class Bewerkingen {
  constructor() { this.perBestand = new Map(); this.volg = 0; }
  // Elke bewerking krijgt een volgnummer, zodat invoegingen op dezelfde plek in volgorde blijven.
  _voeg(bestand, b) {
    if (!this.perBestand.has(bestand)) this.perBestand.set(bestand, []);
    this.perBestand.get(bestand).push(Object.assign(b, { volg: this.volg++ }));
  }
  vervang(blad, nieuweWaarde) {
    if (blad.soort !== 'str') throw new Error(`${blad.bestand} ${blad.pad}: geen letterlijke string`);
    this._voeg(blad.bestand, { start: blad.start, eind: blad.eind, tekst: literal(nieuweWaarde, blad.quote) });
  }
  // Voeg `sleutel: waarde` toe direct na blad `na` (een blad in hetzelfde object, zelfde diepte).
  voegToeNa(na, sleutel, waarde) {
    const src = B.lees(na.bestand);
    let i = na.eind;
    while (/[ \t]/.test(src[i])) i++;
    const kommaErachter = src[i] === ',';
    const regelBegin = src.lastIndexOf('\n', na.start) + 1;
    const inspring = /^[ \t]*/.exec(src.slice(regelBegin))[0];
    const regel = `${sleutelTekst(sleutel, na.quote)}:${literal(waarde, na.quote)}`;
    if (kommaErachter) this._voeg(na.bestand, { start: i + 1, eind: i + 1, tekst: `\n${inspring}${regel},` });
    else this._voeg(na.bestand, { start: na.eind, eind: na.eind, tekst: `,\n${inspring}${regel}` });
  }
  // Rij [sleutel, waarde] toevoegen in de spiegel, na spiegelblad `na` (de waardekolom van de vorige rij).
  voegSpiegelRijToeNa(na, sleutel, waarde) {
    const src = B.lees(na.bestand);
    const rijEind = src.indexOf(']', na.eind) + 1;
    let i = rijEind;
    while (/[ \t]/.test(src[i])) i++;
    const regelBegin = src.lastIndexOf('\n', na.start) + 1;
    const inspring = /^[ \t]*/.exec(src.slice(regelBegin))[0];
    const q = na.quote;
    const rij = `[${literal(sleutel, q)}, ${literal(waarde, q)}]`;
    if (src[i] === ',') this._voeg(na.bestand, { start: i + 1, eind: i + 1, tekst: `\n${inspring}${rij},` });
    else this._voeg(na.bestand, { start: rijEind, eind: rijEind, tekst: `,\n${inspring}${rij}` });
  }
  // Ruwe bewerking (verwijderen van een regel e.d.)
  ruw(bestand, start, eind, tekst) { this._voeg(bestand, { start, eind, tekst }); }

  pasToe() {
    const geraakt = [];
    for (const [bestand, lijst] of this.perBestand) {
      let src = B.lees(bestand);
      lijst.sort((a, b) => b.start - a.start || b.eind - a.eind || b.volg - a.volg);
      for (let k = 1; k < lijst.length; k++) {
        if (lijst[k].eind > lijst[k - 1].start && lijst[k].start !== lijst[k - 1].start) throw new Error(`${bestand}: overlappende bewerkingen`);
      }
      for (const b of lijst) src = src.slice(0, b.start) + b.tekst + src.slice(b.eind);
      fs.writeFileSync(path.join(B.ROOT, bestand), src);
      geraakt.push(bestand);
    }
    return geraakt;
  }
}

module.exports = { Bewerkingen, literal };
