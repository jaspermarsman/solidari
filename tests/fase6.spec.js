// Fase 6 — beeldtaal, raakvlakken, contrast.
const { test, expect } = require('@playwright/test');
const { metTaal } = require('./helpers');

function ratio(a, b) {
  const lum = (hex) => {
    const c = hex.replace('#', '').match(/../g).map(h => parseInt(h, 16) / 255)
      .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const l1 = lum(a), l2 = lum(b), hi = Math.max(l1, l2), lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

async function laad(page, pagina) {
  await metTaal(page, 'NL');
  await page.goto('/' + pagina, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.Solidari && window.Solidari.spraak);
  await page.waitForTimeout(400);
}

// De primaire interactieve laag (nav, footer, a11y-knoppen, tool-kaarten, hoofdknoppen).
const PRIMAIR = [
  '.nav-links > li > a', '.nav-dropdown-trigger', '.taal-trigger', '.taal-dd-btn',
  '.footer-feedback', '.knop-primair', '.knop-secundair', '.tool-kaart', '.tool-compact',
  '.sol-a11y-knop', '.sol-a11y-mic', '.sol-a11y-luister-toggle',
].join(', ');

for (const vp of [{ w: 360, h: 640 }, { w: 1280, h: 800 }]) {
  test(`raakvlakken ≥44px op primaire bediening (${vp.w}×${vp.h})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    const overtredingen = {};
    for (const pagina of ['index.html', 'over.html', 'feedback.html', 'brief.html']) {
      await laad(page, pagina);
      const klein = await page.evaluate((sel) => {
        const zichtbaar = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
        return [...document.querySelectorAll(sel)].filter(zichtbaar)
          .filter(el => { const r = el.getBoundingClientRect(); return r.width < 44 || r.height < 44; })
          .map(el => `${el.className} ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
      }, PRIMAIR);
      if (klein.length) overtredingen[pagina] = klein;
    }
    expect(overtredingen, JSON.stringify(overtredingen)).toEqual({});
  });
}

test('contrast: neutrale tekstkleuren voldoen aan AA (≥4.5:1 op wit)', async ({ page }) => {
  await laad(page, 'index.html');
  const vars = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    const g = n => s.getPropertyValue(n).trim();
    return { wit: g('--wit'), tekst: g('--tekst'), zacht: g('--tekst-zacht'), licht: g('--tekst-licht') };
  });
  expect(ratio(vars.tekst, vars.wit)).toBeGreaterThanOrEqual(4.5);
  expect(ratio(vars.zacht, vars.wit)).toBeGreaterThanOrEqual(4.5);
  expect(ratio(vars.licht, vars.wit), `tekst-licht ${vars.licht}`).toBeGreaterThanOrEqual(4.5);
});

test('contrast: gerenderde bodytekst haalt AA (t.o.v. echte achtergrond)', async ({ page }) => {
  await laad(page, 'over.html');
  const metingen = await page.evaluate(() => {
    function toHex(rgbStr) {
      const m = (rgbStr || '').match(/\d+/g); if (!m) return null;
      return '#' + m.slice(0, 3).map(x => (+x).toString(16).padStart(2, '0')).join('');
    }
    // loop omhoog tot een niet-transparante achtergrond
    function echteBg(el) {
      let e = el;
      while (e) {
        const bg = getComputedStyle(e).backgroundColor;
        if (bg && !/rgba?\(0, 0, 0, 0\)|transparent/.test(bg)) return toHex(bg);
        e = e.parentElement;
      }
      return '#FAFAF7';
    }
    return [...document.querySelectorAll('p, li, dd, dt, .privacynoot, h2, h3')]
      .filter(el => (el.textContent || '').trim().length > 0 && el.children.length === 0)
      .filter(el => !el.closest('#solidari-nav, #solidari-footer'))
      .slice(0, 60)
      .map(el => ({ kleur: toHex(getComputedStyle(el).color), bg: echteBg(el), grootte: parseFloat(getComputedStyle(el).fontSize), bold: getComputedStyle(el).fontWeight >= 700 }));
  });
  const lum = (hex) => { const c = hex.replace('#', '').match(/../g).map(h => parseInt(h, 16) / 255); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  let gemeten = 0;
  for (const m of metingen) {
    if (!m.kleur || !m.bg) continue;
    // Alleen donkere tekst op lichte achtergrond toetsen; witte tekst staat per ontwerp
    // op gekleurde/gradient-kaarten waarvan de achtergrond niet betrouwbaar te lezen is.
    if (lum(m.kleur) > 0.5) continue;
    const groot = m.grootte >= 24 || (m.bold && m.grootte >= 18.66);
    const drempel = groot ? 3.0 : 4.5;
    expect(ratio(m.kleur, m.bg), `${m.kleur} op ${m.bg} @ ${m.grootte}px`).toBeGreaterThanOrEqual(drempel - 0.05);
    gemeten++;
  }
  expect(gemeten, 'geen enkele donkere subtekst gemeten').toBeGreaterThan(0);
});

test('iconen consistent op ≥3 plekken (nav-dropdown, mobiel menu, index-kaarten)', async ({ page }) => {
  await laad(page, 'index.html');
  const r = await page.evaluate(() => ({
    navDropdown: document.querySelectorAll('.dropdown-menu .tool-emoji-nav').length,
    mobiel: document.querySelectorAll('.mob-tools .tool-emoji-nav').length,
    kaarten: document.querySelectorAll('.tool-compact-icoon').length,
  }));
  expect(r.navDropdown).toBe(7);
  expect(r.mobiel).toBe(7);
  expect(r.kaarten).toBeGreaterThanOrEqual(7);
});
