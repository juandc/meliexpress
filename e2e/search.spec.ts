import { test, expect } from '@playwright/test';

test('search bar enter key sends to search results page', async ({ page }) => {
  await page.goto('/');
  await page.fill('#search_bar_input', 'laptop');
  await page.press('#search_bar_input', 'Enter');
  await page.waitForURL(/\/search\/laptop/);
  await expect(page).toHaveURL(/\/search\/laptop/);
});

test('search results page shows items with correct href', async ({ page }) => {
  await page.goto('/search/laptop');
  const items = await page.getByTestId('SearchResult').getByRole('link');
  await expect(items).not.toBeNull();
  await expect(await items).toHaveCount(5);
  for (const item of await items.all()) {
    await expect(item).toHaveAttribute('href', /\/items\//);
  }
});
