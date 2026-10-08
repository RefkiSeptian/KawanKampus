import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('floating assistant opens, sends, restores its session and resets accessibly', async ({
  page,
}) => {
  await page.route('**/api/chat', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(
        route.request().method() === 'GET'
          ? { available: true }
          : {
              answer:
                'Forage membantu kamu mencoba simulasi pekerjaan. Ini berbeda dari magang di perusahaan.',
              sources: [{ id: 'forage', label: 'Forage', url: 'https://www.theforage.com/' }],
            },
      ),
    }),
  );
  await page.goto('/jelajahi-peluang');
  const launcher = page.getByRole('button', { name: 'Buka asisten kawankampus' });
  await launcher.click();
  const panel = page.getByRole('dialog', { name: 'Hai, aku kawankampus.' });
  await expect(panel).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Pesan untuk kawankampus' })).toBeFocused();
  await page.getByRole('button', { name: 'Kenali dunia kerja', exact: true }).click();
  await expect(panel.getByText(/Forage membantu/)).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Forage', exact: false })).toHaveAttribute(
    'rel',
    'noopener noreferrer',
  );
  await page.reload();
  await page.getByRole('button', { name: 'Buka asisten kawankampus' }).click();
  await expect(panel.getByText(/Forage membantu/)).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('kawan-kampus-chat-v1'))).toBeNull();
  const input = page.getByRole('textbox', { name: 'Pesan untuk kawankampus' });
  await input.fill('Apa bedanya dengan magang?');
  await input.press('Enter');
  await expect(panel.locator('article')).toHaveCount(4);
  const audit = await new AxeBuilder({ page })
    .include('#kawan-chat')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.getByRole('button', { name: 'Mulai lagi', exact: true }).click();
  await expect(panel.getByRole('heading', { name: 'Lagi penasaran apa?' })).toBeVisible();
  await input.press('Escape');
  await expect(panel).not.toBeVisible();
  await expect(launcher).toBeFocused();
});

test('unavailable AI and quota errors preserve the catalog and input', async ({ page }) => {
  await page.route('**/api/chat', (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify({ available: false }) }),
  );
  await page.goto('/peluang/beasiswa-bantuan-kuliah');
  await page.getByRole('button', { name: 'Buka asisten kawankampus' }).click();
  const panel = page.getByRole('dialog', { name: 'Hai, aku kawankampus.' });
  await expect(panel.getByText('Asisten AI belum tersedia.', { exact: true })).toBeVisible();
  await expect(panel.getByRole('link', { name: /Jelajahi Peluang/ })).toHaveAttribute(
    'href',
    '/jelajahi-peluang',
  );
  await expect(page.getByRole('textbox')).toBeDisabled();
  await page.getByRole('button', { name: 'Tutup asisten', exact: true }).click();
  await page.unroute('**/api/chat');
  await page.route('**/api/chat', (route) =>
    route.fulfill({
      status: route.request().method() === 'GET' ? 200 : 429,
      contentType: 'application/json',
      body: JSON.stringify(
        route.request().method() === 'GET'
          ? { available: true }
          : { error: 'Batas 10 pesan per menit tercapai. Coba lagi dalam 30 detik.' },
      ),
    }),
  );
  await page.getByRole('button', { name: 'Buka asisten kawankampus' }).click();
  const input = page.getByRole('textbox');
  await expect(input).toBeEnabled();
  await input.fill('Cari beasiswa');
  await page.getByRole('button', { name: 'Kirim pesan' }).click();
  await expect(panel.getByRole('alert')).toContainText('Batas 10 pesan');
  await expect(input).toHaveValue('Cari beasiswa');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
