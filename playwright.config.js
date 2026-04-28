// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuración de Playwright para ItsFood
 * @see https://playwright.dev/docs/test-configuration
 *
 * ⚠️  IMPORTANTE: Asegurarse de que XAMPP (Apache + MySQL) esté corriendo
 *     antes de ejecutar los tests.
 */
module.exports = defineConfig({
  testDir: './tests',

  /* Ejecutar tests en paralelo */
  fullyParallel: true,

  /* Fallar si se deja test.only en el código en CI */
  forbidOnly: !!process.env.CI,

  /* Sin reintentos en local; 2 en CI */
  retries: process.env.CI ? 2 : 0,

  /* 1 worker en CI para no saturar recursos */
  workers: process.env.CI ? 1 : undefined,

  /* Reporte en HTML — ver con: npx playwright show-report */
  reporter: 'html',

  use: {
    baseURL: 'http://localhost/materiadelaurito/itsfood/ItsFood/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Solo Chromium para el TP (más rápido y sin instalar Firefox/WebKit) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Descomentar para testear en más navegadores:
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});
