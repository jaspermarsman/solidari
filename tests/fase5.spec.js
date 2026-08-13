// Fase 5 — spreken in plaats van typen: microfoonknoppen, camera-eerst, /api/stt-terugval.
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');

// Stub voor SpeechRecognition die één transcript teruggeeft.
const STUB_SR = () => {
  class SR {
    constructor() { this.onresult = null; this.onend = null; this.onerror = null; this.lang = ''; }
    start() {
      setTimeout(() => {
        const results = [{ 0: { transcript: 'gedicteerde tekst' }, isFinal: true }];
        results.length = 1;
        if (this.onresult) this.onresult({ results });
        if (this.onend) this.onend();
      }, 10);
    }
    stop() { if (this.onend) this.onend(); }
  }
  Object.defineProperty(window, 'SpeechRecognition', { configurable: true, writable: true, value: SR });
};

async function laad(page, pagina, stub) {
  await metTaal(page, 'NL');
  if (stub) await page.addInitScript(stub);
  await page.goto('/' + pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(500);
}

test('mic bij tekstveld vult het veld (rechten.html, gestubde herkenning)', async ({ page }) => {
  await laad(page, 'rechten.html', STUB_SR);
  const mic = page.locator('#invoer ~ .sol-a11y-mic, .sol-a11y-mic').first();
  expect(await page.locator('.sol-a11y-mic').count()).toBeGreaterThan(0);
  await mic.click();
  await page.waitForTimeout(150);
  const waarde = await page.inputValue('#invoer');
  expect(waarde).toBe('gedicteerde tekst');
});

test('mic bij brief-context-textarea (gestubde herkenning)', async ({ page }) => {
  await laad(page, 'brief.html', STUB_SR);
  const heeftMic = await page.evaluate(() => {
    const ta = document.getElementById('extra-context');
    return ta && ta.nextElementSibling && ta.nextElementSibling.classList.contains('sol-a11y-mic');
  });
  expect(heeftMic).toBe(true);
});

test('autoMic dekt dynamisch toegevoegde velden (budgethulp-scenario)', async ({ page }) => {
  await laad(page, 'budgethulp.html', STUB_SR);
  const heeftMic = await page.evaluate(async () => {
    const inp = document.createElement('input');
    inp.type = 'text';
    document.body.appendChild(inp);
    await Solidari.spraak.verwerk(document.body);
    return inp.nextElementSibling && inp.nextElementSibling.classList.contains('sol-a11y-mic');
  });
  expect(heeftMic).toBe(true);
});

test('geen herkenning én geen route → geen mic-knop, geen fout', async ({ page }) => {
  const fouten = [];
  page.on('pageerror', e => fouten.push(String(e.message)));
  await metTaal(page, 'NL');
  await page.addInitScript(() => {
    // verwijder herkenning
    try { delete window.SpeechRecognition; } catch (e) {}
    try { delete window.webkitSpeechRecognition; } catch (e) {}
    Object.defineProperty(window, 'SpeechRecognition', { configurable: true, get: () => undefined });
    Object.defineProperty(window, 'webkitSpeechRecognition', { configurable: true, get: () => undefined });
  });
  await page.goto('/rechten.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(400);
  expect(await page.locator('.sol-a11y-mic').count()).toBe(0);
  expect(fouten).toEqual([]);
});

test('brief: camera vóór bestandskeuze in DOM, capture=environment', async ({ page }) => {
  await laad(page, 'brief.html', null);
  const r = await page.evaluate(() => {
    const cam = document.getElementById('camera-knop');
    const camInput = document.getElementById('camera-input');
    const kies = [...document.querySelectorAll('.upload-knop')].find(b => /Kies bestand/.test(b.textContent));
    const volgorde = cam && kies ? (cam.compareDocumentPosition(kies) & Node.DOCUMENT_POSITION_FOLLOWING) : 0;
    return {
      cameraBestaat: !!cam,
      capture: camInput && camInput.getAttribute('capture'),
      cameraVoorKies: !!volgorde,
    };
  });
  expect(r.cameraBestaat).toBe(true);
  expect(r.capture).toBe('environment');
  expect(r.cameraVoorKies).toBe(true);
});

test('brief: toestemmings-checkbox aanwezig, niet aangevinkt, voorleesbaar', async ({ page }) => {
  await laad(page, 'brief.html', null);
  const r = await page.evaluate(() => {
    const cb = document.getElementById('privacy-checkbox');
    const label = document.getElementById('privacy-akkoord');
    return { bestaat: !!cb, aangevinkt: cb && cb.checked, voorleesbaar: label && label.hasAttribute('data-lees') };
  });
  expect(r.bestaat).toBe(true);
  expect(r.aangevinkt).toBe(false);
  expect(r.voorleesbaar).toBe(true);
});
