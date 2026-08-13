// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Draait tegen de lokaal geserveerde werkmap (serve.sh, poort 8099).
// De rooktest-subset tegen de live staging-URL gebruikt STAGING_URL.
const PORT = process.env.SOL_PORT || 8099;

module.exports = defineConfig({
  testDir: '.',
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  timeout: 60000,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    viewport: { width: 360, height: 640 },
  },
  webServer: {
    command: `bash serve.sh ${PORT}`,
    port: Number(PORT),
    reuseExistingServer: true,
    timeout: 30000,
  },
  projects: [
    { name: 'mobiel', use: { ...devices['Pixel 5'] } },
  ],
});
