import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { categories } from '../src/data/categories';
import { opportunities } from '../src/data/opportunities';
const routes = [
  '/',
  '/jelajahi-peluang',
  ...categories.map((c) => `/peluang/${c.id}`),
  '/kuis',
  '/kuis/hasil',
  '/tentang',
];
test('every route, its content, internal links, and responsive layout work', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('.closing-banner')).toHaveCount(route === '/' ? 1 : 0);
    await expect(page.locator('.hero-copy .pill-eyebrow')).toHaveCount(0);
    await expect(page.locator('.site-header')).toHaveCSS('backdrop-filter', /blur\(/);
    if (route === '/')
      await expect(page.locator('.category-card').first()).toHaveCSS('backdrop-filter', /blur\(/);
    await expect(page.locator('footer')).not.toContainText(
      'Kawan Kampus menggunakan analitik anonim',
    );
    await expect(
      page.locator('footer').getByRole('button', { name: 'Instagram — tautan belum tersedia' }),
    ).toBeDisabled();
    await expect(
      page.locator('footer').getByRole('button', { name: 'X — tautan belum tersedia' }),
    ).toBeDisabled();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    const links = await page
      .locator('main a[href^="/"]')
      .evaluateAll((nodes) => [...new Set(nodes.map((node) => node.getAttribute('href')!))]);
    for (const href of links) {
      expect((await request.get(href)).status(), href).toBe(200);
    }
    if (route.startsWith('/peluang/')) {
      const items = opportunities.filter((o) => route.endsWith(o.category));
      await expect(page.locator('[data-opportunity-id]')).toHaveCount(5);
      for (const item of items) {
        const card = page.locator(`[data-opportunity-id="${item.id}"]`);
        await expect(card).toContainText(item.name);
        await expect(card).toContainText(item.timing);
        await expect(card).toContainText(item.note);
        if (item.officialUrl) {
          await expect(card.locator('.official-link')).toHaveAttribute('href', item.officialUrl);
          await expect(card.locator('.official-link')).toHaveAttribute('target', '_blank');
          await expect(card.locator('.official-link')).toHaveAttribute(
            'rel',
            'noopener noreferrer',
          );
        } else {
          await expect(card.getByRole('button')).toBeDisabled();
        }
      }
      await expect(
        page.getByText('Jadwal dapat berubah. Cek sumber resmi sebelum mendaftar.', {
          exact: true,
        }),
      ).toBeVisible();
    }
  }
  expect(errors).toEqual([]);
});
test('primary quiz journey restores progress, reaches a category and opens official source in a new tab', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Temukan Minatku', exact: true }).click();
  await page
    .getByRole('radio', { name: 'Mencoba tugas dari pekerjaan yang membuatku penasaran.' })
    .check();
  await page.getByRole('button', { name: 'Lanjut', exact: true }).click();
  await page.reload();
  await expect(page.getByText('2 dari 4', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: 'Punya gambaran pekerjaan yang ingin dicoba.' }).check();
  await page.getByRole('button', { name: 'Lanjut', exact: true }).click();
  await page.getByRole('radio', { name: 'Pengenalan profesi dan tugas sehari-harinya.' }).check();
  await page.getByRole('button', { name: 'Lanjut', exact: true }).click();
  await page
    .getByRole('radio', { name: 'Mencoba simulasi pekerjaan atau membaca contoh lowongan magang.' })
    .check();
  await page.getByRole('button', { name: 'Lihat Hasil', exact: true }).click();
  await expect(page).toHaveURL('/kuis/hasil');
  await expect(
    page.getByRole('heading', { name: 'Magang & Kenali Dunia Kerja', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Jelajahi Beasiswa/ })).toBeVisible();
  await page.getByRole('link', { name: 'Kenali Dunia Kerja', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Magang & Kenali Dunia Kerja', exact: true }),
  ).toBeVisible();
  // Verify external navigation deterministically without relying on a third-party site.
  await context.route('https://www.theforage.com/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<!doctype html><title>Official source fixture</title><h1>Forage</h1>',
    }),
  );
  const popupPromise = page.waitForEvent('popup');
  await page.locator('[data-opportunity-id="forage"] .official-link').click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  await expect(popup).toHaveURL('https://www.theforage.com/');
  await popup.close();
});
test('tie-break asks for exactly the remaining slots and stays in session', async ({ page }) => {
  await page.goto('/kuis');
  const choices = [
    'Membantu tim menyiapkan kegiatan bersama.',
    'Punya karya atau ide yang pernah diuji.',
    'Cerita pengalaman belajar atau berkegiatan di luar negeri.',
    'Mencoba simulasi pekerjaan atau membaca contoh lowongan magang.',
  ];
  for (let i = 0; i < choices.length; i++) {
    await page.getByRole('radio', { name: choices[i], exact: true }).check();
    await page
      .getByRole('button', { name: i === 3 ? 'Lihat Hasil' : 'Lanjut', exact: true })
      .click();
  }
  await expect(
    page.getByRole('heading', {
      name: 'Dari pilihan berikut, mana yang ingin kamu kenali lebih dulu?',
    }),
  ).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveCount(4);
  await page.getByRole('checkbox', { name: 'Lomba & Kompetisi', exact: true }).check();
  await page.reload();
  await expect(
    page.getByRole('checkbox', { name: 'Lomba & Kompetisi', exact: true }),
  ).toBeChecked();
  await page
    .getByRole('checkbox', { name: 'Pertukaran & Pengalaman Internasional', exact: true })
    .check();
  await page.getByRole('button', { name: 'Lihat Hasil', exact: true }).click();
  await expect(page).toHaveURL('/kuis/hasil');
  await expect(page.locator('.result-card')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Lomba & Kompetisi', exact: true })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Pertukaran & Pengalaman Internasional', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Ulangi Kuis', exact: true }).click();
  await expect(page).toHaveURL('/kuis');
  await expect(page.getByText('1 dari 4', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('radio', { name: 'Membantu tim menyiapkan kegiatan bersama.' }),
  ).not.toBeChecked();
});
test('all unknown answers produce no forced recommendation and keep scholarships', async ({
  page,
}) => {
  await page.goto('/kuis');
  for (let i = 0; i < 4; i++) {
    await page.getByRole('radio', { name: 'Belum tahu.', exact: true }).check();
    await page
      .getByRole('button', { name: i === 3 ? 'Lihat Hasil' : 'Lanjut', exact: true })
      .click();
  }
  await expect(
    page.getByRole('heading', { name: 'Masih ingin mencoba berbagai hal' }),
  ).toBeVisible();
  await expect(page.locator('.result-card')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Jelajahi Beasiswa/ })).toBeVisible();
});
test('light, dark, system preference and persisted manual theme work', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('switch', { name: 'Mode gelap' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.getByRole('switch', { name: 'Mode gelap' }).focus();
  await page.keyboard.press('Space');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('switch', { name: 'Mode gelap' })).toBeChecked();
  await page.getByRole('button', { name: 'Ikuti tema perangkat' }).click();
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveClass(/dark/);
});
test('keyboard quiz, skip link and mobile menu remain accessible', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Lewati ke konten utama' })).toBeFocused();
  await page.keyboard.press('Enter');
  if (testInfo.project.name.includes('mobile')) {
    await page.getByRole('button', { name: 'Buka menu' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Buka menu' })).toBeFocused();
  }
  await page.goto('/kuis');
  await page.getByRole('radio').first().focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('radio').first()).toBeChecked();
  await page.getByRole('button', { name: 'Lanjut', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('2 dari 4', { exact: true })).toBeVisible();
});
test('core pages meet automated accessibility checks in both themes', async ({ page }) => {
  for (const theme of ['light', 'dark'])
    for (const route of [
      '/',
      '/jelajahi-peluang',
      '/peluang/lomba-kompetisi',
      '/kuis',
      '/tentang',
    ]) {
      await page.goto(route);
      const toggle = page.getByRole('switch', { name: 'Mode gelap' });
      if ((await toggle.getAttribute('aria-checked')) !== String(theme === 'dark'))
        await toggle.click();
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
    }
});
test('metadata, sitemap, robots and unknown routes work', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('KawanKampus');
  await page.goto('/jelajahi-peluang');
  await expect(page).toHaveTitle('KawanKampus');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/jelajahi-peluang$/,
  );
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect((await request.get('/opengraph-image')).status()).toBe(200);
  expect((await request.get('/peluang/tidak-ada')).status()).toBe(404);
});
