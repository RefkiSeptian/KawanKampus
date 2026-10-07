import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
const out = 'work/visual-qa';
await fs.mkdir(out, { recursive: true });
const channel =
  process.env.PLAYWRIGHT_CHANNEL ||
  (process.platform === 'win32' &&
  existsSync('C:/Program Files/Google/Chrome/Application/chrome.exe')
    ? 'chrome'
    : undefined);
const browser = await chromium.launch({ channel });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  colorScheme: 'light',
  reducedMotion: 'reduce',
});
const errors = [];
page.on('pageerror', (error) => errors.push({ type: 'pageerror', message: error.message }));
page.on('response', (response) => {
  if (response.status() >= 400) errors.push({ status: response.status(), url: response.url() });
});
await page.goto('http://127.0.0.1:3000/');
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${out}/desktop-home.png`, fullPage: true });
await page.screenshot({ path: `${out}/desktop-hero.png` });
await page.getByRole('switch', { name: 'Mode gelap' }).click();
await page.screenshot({ path: `${out}/desktop-dark.png` });
await page.getByRole('switch', { name: 'Mode gelap' }).click();
await page.goto('http://127.0.0.1:3000/kuis');
await page.screenshot({ path: `${out}/desktop-quiz.png` });
await page.goto('http://127.0.0.1:3000/peluang/pengalaman-internasional');
await page.screenshot({ path: `${out}/desktop-category.png`, fullPage: true });
const overflows = [];
for (const width of [1440, 1024, 768, 390, 360]) {
  await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
  for (const route of ['/', '/jelajahi-peluang', '/kuis', '/peluang/lomba-kompetisi', '/tentang']) {
    await page.goto(`http://127.0.0.1:3000${route}`);
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth))
      overflows.push({ width, route });
  }
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:3000/');
await page.screenshot({ path: `${out}/mobile-home.png`, fullPage: true });
await page.screenshot({ path: `${out}/mobile-hero.png` });
await page.getByRole('switch', { name: 'Mode gelap' }).click();
await page.screenshot({ path: `${out}/mobile-dark.png` });
await page.getByRole('switch', { name: 'Mode gelap' }).click();
await page.goto('http://127.0.0.1:3000/kuis');
await page.screenshot({ path: `${out}/mobile-quiz.png`, fullPage: true });
await page.getByRole('button', { name: 'Buka menu' }).click();
await page.screenshot({ path: `${out}/mobile-menu.png` });
await fs.writeFile(
  `${out}/checks.json`,
  JSON.stringify({ viewports: [1440, 1024, 768, 390, 360], overflows, errors }, null, 2),
);
console.log(JSON.stringify({ overflows, errors }, null, 2));
await browser.close();
