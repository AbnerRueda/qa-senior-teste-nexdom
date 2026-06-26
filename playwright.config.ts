import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10 * 1000
  },
projects: [
  { name: 'chromium', use: { browserName: 'chromium' } },
  { name: 'api', use: {} },
  // novo projeto para depuração com interface (headed)
  { 
    name: 'debug',
    use: { 
      browserName: 'chromium',
      headless: false,
      viewport: { width: 1280, height: 800 },
      launchOptions: { slowMo: 500 }
    }
  }
],
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ]
}
);
