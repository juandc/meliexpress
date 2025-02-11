import { test, expect } from '@playwright/test';
import { getDictionaryFromServer } from '@/ui/dictionaries';

test('home page renders, has correct title and navbar', async ({ page }) => {
  const dictionary = await getDictionaryFromServer();
  const expectedTitle = dictionary.meta.default.title;
  await page.goto('/');
  await expect(page).toHaveTitle(expectedTitle);
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('favorites renders, has correct title and navbar', async ({ page }) => {
  const dictionary = await getDictionaryFromServer();
  const expectedTitle = dictionary.meta.favorites.title;
  await page.goto('/favorites');
  await expect(page).toHaveTitle(expectedTitle);
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('search results page renders, has correct title and navbar', async ({ page }) => {
  const query = "laptop";
  const dictionary = await getDictionaryFromServer();
  const expectedTitle = dictionary.meta.search.title(query);
  await page.goto('/search/laptop');
  await expect(page).toHaveTitle(expectedTitle);
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('product details page renders with correct title', async ({ page }) => {
  const dictionary = await getDictionaryFromServer();
  const expectedTitle = dictionary.meta.item.title("Nintendo Wii 512mb Sports Pack Color Blanco");
  await page.goto('/items/nintendo-wii-512mb-sports-pack-MLA1428983989');
  await expect(page).toHaveTitle(expectedTitle);
  await expect(page.getByRole('navigation')).toBeVisible();
});
