import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
await fs.mkdir('work/lighthouse', { recursive: true });
const chromePath =
  process.env.CHROME_PATH ||
  (existsSync('C:/Program Files/Google/Chrome/Application/chrome.exe')
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : undefined);
const scores = [];
const url = process.env.LIGHTHOUSE_URL || 'http://127.0.0.1:3000/';
for (const formFactor of ['mobile', 'desktop']) {
  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ['--headless=new', '--no-sandbox'],
  });
  try {
    const options = {
      port: chrome.port,
      logLevel: 'error',
      output: ['json', 'html'],
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    };
    if (formFactor === 'desktop') {
      options.formFactor = 'desktop';
      options.screenEmulation = {
        mobile: false,
        width: 1440,
        height: 1000,
        deviceScaleFactor: 1,
        disabled: false,
      };
      options.throttlingMethod = 'provided';
    }
    const result = await lighthouse(url, options);
    if (!result) throw new Error('Lighthouse returned no result');
    await fs.writeFile(`work/lighthouse/${formFactor}.json`, result.report[0]);
    await fs.writeFile(`work/lighthouse/${formFactor}.html`, result.report[1]);
    const summary = {
      formFactor,
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
    };
    scores.push(summary);
    console.log(JSON.stringify(summary));
  } finally {
    await chrome.kill();
  }
}
await fs.writeFile('work/lighthouse/scores.json', JSON.stringify(scores, null, 2));
if (scores.some((run) => Object.values(run.scores).some((score) => score < 90)))
  process.exitCode = 1;
