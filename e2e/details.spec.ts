import { test, expect } from '@playwright/test';

test('details page shows item info', async ({ page }) => {
  await page.goto('/items/nintendo-wii-512mb-sports-pack-MLA1428983989');
  const main = await page.getByRole('main');
  const img = await main.getByRole('img');
  const title = await main.getByRole('heading', { level: 1 });
  const btn = await main.getByRole('button', { name: 'Comprar' });
  await expect(img).toBeVisible();
  await expect(title).toBeVisible();
  await expect(btn).toBeVisible();
});
