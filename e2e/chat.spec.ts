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

test('panel moves with mouse or touch, remembers position and stays inside a resized viewport', async ({
  page,
}, testInfo) => {
  await page.route('**/api/chat', (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify({ available: true }) }),
  );
  await page.goto('/jelajahi-peluang');
  await page.getByRole('button', { name: 'Buka asisten kawankampus' }).click();
  const panel = page.locator('#kawan-chat');
  const handle = page.getByRole('button', { name: 'Pindahkan panel asisten' });
  await expect(panel).toBeVisible();
  const initial = (await panel.boundingBox())!;
  const grip = (await handle.boundingBox())!;
  const start = { x: grip.x + grip.width / 2, y: grip.y + grip.height / 2 };
  if (testInfo.project.name.includes('mobile')) {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] });
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: start.x - 40, y: start.y - 70 }],
    });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await cdp.detach();
  } else {
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(start.x - 160, start.y - 70, { steps: 8 });
    await page.mouse.up();
  }
  await expect.poll(async () => (await panel.boundingBox())!.y).toBeLessThan(initial.y - 30);
  const moved = (await panel.boundingBox())!;
  await handle.focus();
  await handle.press('ArrowDown');
  await expect.poll(async () => (await panel.boundingBox())!.y).toBeGreaterThan(moved.y + 10);
  const remembered = (await panel.boundingBox())!;
  await page.reload();
  await page.getByRole('button', { name: 'Buka asisten kawankampus' }).click();
  await expect
    .poll(async () => Math.abs((await panel.boundingBox())!.y - remembered.y))
    .toBeLessThan(2);
  await page.setViewportSize({ width: 360, height: 640 });
  await expect
    .poll(async () => {
      const rect = (await panel.boundingBox())!;
      return (
        rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= 360 && rect.y + rect.height <= 640
      );
    })
    .toBe(true);
  await page.getByRole('button', { name: 'Posisi awal', exact: true }).click();
  expect(
    await page.evaluate(() => sessionStorage.getItem('kawan-kampus-chat-position-v1')),
  ).toBeNull();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('minimize and expand preserve drafts and support keyboard position reset', async ({
  page,
}) => {
  await page.route('**/api/chat', (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify({ available: true }) }),
  );
  await page.goto('/tentang');
  await page.getByRole('button', { name: 'Buka asisten kawankampus' }).click();
  const panel = page.locator('#kawan-chat');
  const input = page.getByRole('textbox', { name: 'Pesan untuk kawankampus' });
  await input.fill('Pertanyaan yang belum kukirim.');
  const normal = (await panel.boundingBox())!;
  await page.getByRole('button', { name: 'Minimalkan asisten' }).click();
  await expect(panel).toHaveAttribute('data-minimized', 'true');
  expect((await panel.boundingBox())!.height).toBeLessThan(120);
  await expect(input).toHaveCount(0);
  await page.getByRole('button', { name: 'Pulihkan percakapan' }).click();
  await expect(input).toHaveValue('Pertanyaan yang belum kukirim.');
  await page.getByRole('button', { name: 'Perbesar panel asisten' }).click();
  await expect(panel).toHaveAttribute('data-expanded', 'true');
  expect((await panel.boundingBox())!.height).toBeGreaterThan(normal.height);
  await expect(page.getByRole('button', { name: 'Pindahkan panel asisten' })).toBeDisabled();
  await expect(input).toHaveValue('Pertanyaan yang belum kukirim.');
  const audit = await new AxeBuilder({ page })
    .include('#kawan-chat')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.getByRole('button', { name: 'Kembalikan ukuran panel' }).click();
  const handle = page.getByRole('button', { name: 'Pindahkan panel asisten' });
  await handle.focus();
  await handle.press('ArrowUp');
  await expect(panel).toHaveAttribute('data-positioned', 'true');
  await handle.press('Home');
  await expect(panel).toHaveAttribute('data-positioned', 'false');
  await handle.press('Escape');
  await expect(panel).not.toBeVisible();
});
