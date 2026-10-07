import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';
const localChrome =
  !process.env.CI &&
  process.platform === 'win32' &&
  existsSync('C:/Program Files/Google/Chrome/Application/chrome.exe');
const channel = process.env.PLAYWRIGHT_CHANNEL || (localChrome ? 'chrome' : undefined);
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 45000,
  use: {
    baseURL: 'http://127.0.0.1:3100',
    channel,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: 'node scripts/e2e-server.mjs',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
