// PLAN 7 fase 3 + PLAN 9 (S-6, S-7) — nav-labels, transparantieregel en ?taal= in de URL.
//
// - De taalkiezer en de hamburger hadden in negen talen alleen een Nederlandse naam ("Taal kiezen",
//   "Menu openen"). Nu komt de naam uit i18n.js (GEDEELD) en verandert hij mee bij een taalwissel.
// - over.html heeft de regel uit B-6 (de vertalingen zijn met AI gemaakt en nog niet door een
//   moedertaalspreker beoordeeld), in de gekozen taal, met een link naar de vertaalhulp.
// - index.html?taal=ti opent in het Tigrinya; een onbekende code doet niets; wisselen blijft werken.
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');
const B = require('../tools/vertaal/bronnen.js');

const G = B.laadAlles().find((b) => b.naam === 'i18n.js').talen;
const w = (taal, sleutel) => G[taal].bladeren.get(sleutel).waarde;
const TALEN = Object.keys(G);

test('i18n.js: de drie nieuwe sleutels bestaan in alle negen talen', () => {
  expect(TALEN).toHaveLength(9);
  for (const t of TALEN) for (const k of ['a11y-taal-kiezen', 'a11y-menu-openen', 'over-transparantie']) {
    expect(G[t].bladeren.has(k), `${t} ${k}`).toBe(true);
  }
});

for (const taal of TALEN) {
  test(`nav ${taal}: taalkiezer en menu hebben een naam in de eigen taal`, async ({ page }) => {
    await metTaal(page, taal);
    await page.goto('rechten.html');
    await expect(page.locator('.taal-trigger')).toHaveAttribute('aria-label', w(taal, 'a11y-taal-kiezen'));
    await expect(page.locator('.hamburger')).toHaveAttribute('aria-label', w(taal, 'a11y-menu-openen'));
  });

  test(`over.html ${taal}: transparantieregel in de eigen taal, met link naar de vertaalhulp`, async ({ page }) => {
    await metTaal(page, taal);
    await page.goto('over.html');
    const regel = page.locator('#over-transparantie');
    await expect(regel).toHaveJSProperty('innerHTML', w(taal, 'over-transparantie'));
    await expect(regel.locator('a[href="vertaalhulp.html"]')).toHaveCount(1);
  });
}

test('nav: de namen wisselen mee bij een taalwissel', async ({ page }) => {
  await metTaal(page, 'NL');
  await page.goto('index.html');
  await expect(page.locator('.hamburger')).toHaveAttribute('aria-label', 'Menu openen');
  await page.locator('.hamburger').click();
  await page.locator('.mob-taal-btn[data-taal="AR"]').click();
  await expect(page.locator('.hamburger')).toHaveAttribute('aria-label', w('AR', 'a11y-menu-openen'));
  await expect(page.locator('.taal-trigger')).toHaveAttribute('aria-label', w('AR', 'a11y-taal-kiezen'));
});

test('naturalisatie: de namen wisselen ook mee via solidari:taalGewijzigd', async ({ page }) => {
  await metTaal(page, 'NL');
  await page.goto('naturalisatie.html');
  await page.evaluate(() => { Solidari.i18n.passToe('PL'); document.dispatchEvent(new CustomEvent('solidari:taalGewijzigd')); });
  await expect(page.locator('.hamburger')).toHaveAttribute('aria-label', w('PL', 'a11y-menu-openen'));
});

test('?taal=ti opent in het Tigrinya, ook in hoofdletters', async ({ page }) => {
  await metTaal(page, 'NL');
  await page.goto('index.html?taal=ti');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ti');
  await expect(page.locator('[data-i18n="tool-lw-omschrijving"]').first()).toHaveText(B.laadAlles().find((b) => b.naam === 'index.html').talen.TI.bladeren.get('tool-lw-omschrijving').waarde);
  await page.goto('rechten.html?taal=FA');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('?taal=xx (onbekend) doet niets; daarna gewoon wisselen blijft werken', async ({ page }) => {
  // geen metTaal: die zet de taal bij elke navigatie terug; hier moet de keuze echt blijven staan
  await page.addInitScript(() => { try { localStorage.setItem('solidari-welkom-gezien', '1'); } catch (e) {} });
  await page.goto('index.html');
  await page.evaluate(() => localStorage.setItem('solidari-taal', 'EN'));
  await page.goto('index.html?taal=xx');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('index.html?taal=ti');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ti');
  await page.locator('.hamburger').click();
  await page.locator('.mob-taal-btn[data-taal="TR"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  // de keuze blijft staan op de volgende pagina (zonder ?taal=)
  await page.goto('rechten.html');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});
