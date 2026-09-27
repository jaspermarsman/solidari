// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Draait tegen de lokaal geserveerde werkmap (serve.sh, poort 8099).
// De rooktest-subset tegen de live staging-URL gebruikt STAGING_URL (in de
// specs zelf). Fase 6 (PLAN-naturalisatie-migratiepact.md) draait de hele
// naturalisatie.spec.js ook tegen een echte URL: SOL_BASE_URL overschrijft
// dan de baseURL en er wordt geen lokale server gestart.
const PORT = process.env.SOL_PORT || 8099;
// Specs gebruiken relatieve paden ('index.html'); met een submap (staging)
// is daarvoor een afsluitende / in de baseURL nodig.
const BASE_URL = process.env.SOL_BASE_URL
  ? process.env.SOL_BASE_URL.replace(/\/?$/, '/')
  : `http://127.0.0.1:${PORT}/`;

module.exports = defineConfig({
  testDir: '.',
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  timeout: 60000,
  use: {
    baseURL: BASE_URL,
    viewport: { width: 360, height: 640 },
  },
  webServer: process.env.SOL_BASE_URL ? undefined : {
    command: `bash serve.sh ${PORT}`,
    port: Number(PORT),
    reuseExistingServer: true,
    timeout: 30000,
  },
  projects: [
    { name: 'mobiel', use: { ...devices['Pixel 5'] } },
  ],
});
