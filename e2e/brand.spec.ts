import { test, expect } from '@playwright/test';

test('the full wordmark fits on mobile in the cover and footer even when fonts fail', async ({
  page,
}) => {
  await page.addInitScript(() => sessionStorage.removeItem('kawan-kampus-welcome-v1'));
  await page.route('**/*.woff2', (route) => route.abort());
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const width of [320, 360, 390, 412, 1440]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    await page.goto('/');
    const cover = page.getByRole('dialog', { name: 'KawanKampus', exact: true });
    await expect(cover).toBeVisible();
    const welcome = cover.locator('svg.brand-wordmark');
    await expect(welcome).toBeVisible();
    const fits = async (selector: string) =>
      page.locator(selector).evaluate((svg) => {
        const node = svg as SVGSVGElement;
        const box = node.getBBox();
        const view = node.viewBox.baseVal;
        const rect = node.getBoundingClientRect();
        return (
          box.x >= view.x &&
          box.y >= view.y &&
          box.x + box.width <= view.x + view.width &&
          box.y + box.height <= view.y + view.height &&
          rect.left >= 0 &&
          rect.right <= innerWidth
        );
      });
    expect(await fits('[data-welcome-cover] svg.brand-wordmark')).toBe(true);
    await cover.getByRole('button', { name: 'Mulai', exact: true }).click();
    await expect(cover).not.toBeVisible();
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.locator('footer svg.brand-wordmark')).toBeVisible();
    expect(await fits('footer svg.brand-wordmark')).toBe(true);
    expect(await fits('.site-header svg.brand-wordmark')).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});
