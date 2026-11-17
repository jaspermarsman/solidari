# Nepbrieven (PLAN 20, B-1)

Achttien **verzonnen** brieven van Nederlandse instanties, als tekst zoals OCR of `pdftotext -layout`
hem oplevert. Geen enkele naam, adres, nummer of rekening is echt; de BSN's halen de elfproef niet.
De instanties bestaan, de gemeenten, de verzekeraar, de woonstichting, het incassobureau en het
ziekenhuis niet.

- `NN-<afzender>.txt`: de brief. Elke afzender heeft een eigen opmaak (retouradres boven het venster
  of niet, kenmerkblok links, rechts of in een kolom naast het adres, één of twee pagina's).
- `verwacht.json`: per brief wat er na de redactie niet meer mag staan (`mag_niet`), wat moet blijven
  (`moet_blijven`), en wat de uitleg moet opleveren (`deadline`, `heeft_actie`, `urgentie`, `bezwaar`).
- `maak_beeld.py`: zet een brief om naar een A4-afbeelding, voor de OCR-meting.

Gebruikt door `solidari-backend/tests/test_redactie_set.py` en `tools/modellen/meet.py`.
