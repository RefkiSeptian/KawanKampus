import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('welcome is actionable, home motion runs continuously, and the welcome stays dismissed for the session', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const welcome = page.getByRole('dialog', { name: 'KawanKampus' });
  await expect(welcome).toBeVisible();
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await welcome.getByRole('button', { name: 'Mulai', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(welcome).toBeHidden();
  await expect(page.locator('main h1')).toBeFocused();
  const track = page.locator('[data-home-ribbon-track]');
  const sample = () =>
    track.evaluate(async (node) => {
      const before = getComputedStyle(node).transform;
      await new Promise((resolve) => setTimeout(resolve, 180));
      return [before, getComputedStyle(node).transform];
    });
  await track.locator('..').scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const moving = await sample();
  expect(moving[0]).not.toBe(moving[1]);
  await expect(page.locator('[data-motion-toggle]')).toHaveCount(0);
  await expect(track).toHaveCSS('animation-iteration-count', 'infinite');
  const coverage = await track.evaluate((node) => {
    const animation = node.getAnimations()[0];
    if (animation) animation.currentTime = 23900;
    return node.getBoundingClientRect().right >= node.parentElement!.getBoundingClientRect().right;
  });
  expect(coverage).toBe(true);
  await track.locator('..').hover();
  const hovered = await sample();
  expect(hovered[0]).not.toBe(hovered[1]);
  await expect(track).toHaveCSS('animation-play-state', 'running');
  const photoMotion = await page.locator('[data-home-hero-image]').evaluate(async (node) => {
    const before = getComputedStyle(node).translate;
    await new Promise((resolve) => setTimeout(resolve, 220));
    return [before, getComputedStyle(node).translate];
  });
  expect(photoMotion[0]).not.toBe(photoMotion[1]);
  await page.locator('.home-category-row').last().scrollIntoViewIfNeeded();
  await expect(page.locator('.home-category-row').last()).toHaveAttribute('data-revealed', 'true');
  const row = page.locator('.home-category-row').last();
  await row.hover();
  await expect
    .poll(() =>
      row.locator('img').evaluate((image) => {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(image).transform);
        return Math.hypot(matrix.a, matrix.b);
      }),
    )
    .toBeGreaterThan(1.05);
  await page.reload();
  await expect(welcome).toBeHidden();
  expect(await page.evaluate(() => sessionStorage.getItem('kawan-kampus-welcome-v1'))).toBe('seen');
  await page.evaluate(() => sessionStorage.removeItem('kawan-kampus-welcome-v1'));
  await page.reload();
  await expect(welcome).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(welcome).toBeHidden();
  await expect(page.locator('main h1')).toBeFocused();
});

test('the welcome cover is visible before the client bundle loads', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(/\/_next\/static\/.*\.js(?:\?|$)/, async (route) => {
    await gate;
    await route.continue();
  });
  const navigation = page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-welcome-pending', 'true');
  await expect(page.locator('[data-welcome-cover]')).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        !!document
          .elementFromPoint(innerWidth / 2, innerHeight / 2)
          ?.closest('[data-welcome-cover]'),
    ),
  ).toBe(true);
  release();
  await navigation;
  await expect(page.getByRole('dialog', { name: 'KawanKampus' })).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: 'Mulai', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('reduced motion skips the welcome and disables animation, including preference changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('dialog', { name: 'KawanKampus' })).toBeHidden();
  await expect(page.locator('[data-home-motion]')).toHaveAttribute('data-home-motion', 'reduced');
  const track = page.locator('[data-home-ribbon-track]');
  await expect(track).toHaveCSS('animation-name', 'none');
  await expect(page.locator('[data-motion-toggle]')).toHaveCount(0);
  await expect(page.locator('.home-category-row').last()).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('[data-home-motion]')).toHaveAttribute('data-home-motion', 'active');
  await expect(track).not.toHaveCSS('animation-name', 'none');
  await page.reload();
  await expect(page.getByRole('dialog', { name: 'KawanKampus' })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('dialog', { name: 'KawanKampus' })).toBeHidden();
  await expect(track).toHaveCSS('animation-name', 'none');
  await expect(page.locator('main h1')).toBeFocused();
});
