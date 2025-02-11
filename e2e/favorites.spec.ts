import { test, expect } from '@playwright/test';
import esDictionary from "@/ui/dictionaries/es";

const navCopy = esDictionary.shared.navbar;
const favoritesCopy = esDictionary.shared.addToFavorites;
const btnCopys = favoritesCopy.btnCopy;

test('adding product to favorites from search results', async ({ page }) => {
  await page.goto('/search/laptop');
  const item = await page.getByTestId('SearchResult').getByRole('link').first();
  const imgSrc = await item.getByRole('img').first().getAttribute('src');

  // save to favorites
  const favoriteBtn = await page.getByRole('button', {
    name: btnCopys.iddle,
  }).first();
  await favoriteBtn.click();
  const loadingBtn = await page.getByRole('button', {
    name: btnCopys.saving,
  }).first();
  await expect(loadingBtn).toBeVisible();
  await new Promise((resolve) => setTimeout(resolve, 100));
  const deleteBtn = await page.getByRole('button', {
    name: btnCopys.saved,
  }).first();
  await expect(deleteBtn).toBeVisible();

  // navigate to favorites page and validate its not empty
  await page.getByRole('link', { name: navCopy.favoritesLinkTitle }).click();
  const favoritesPageTitle = await page.getByRole('heading', {
    name: 'Tus favoritos',
  });
  await expect(favoritesPageTitle).toBeVisible();

  // find original imgSrc in favorites
  const itemsImgSrc = await page.getByTestId('SearchResult').getByRole('img').first().getAttribute('src');
  await expect(itemsImgSrc).toContain(imgSrc);
});

test('adding product to favorites from product detail', async ({ page }) => {
  await page.goto('/items/nintendo-wii-512mb-sports-pack-MLA1428983989');
  const main = await page.getByRole('main');
  const itemId = await main.getByRole('article').first().getAttribute('id');

  // save to favorites
  const favoriteBtn = await page.getByRole('button', {
    name: btnCopys.iddle,
  }).first();
  await favoriteBtn.click();
  const loadingBtn = await page.getByRole('button', {
    name: btnCopys.saving,
  }).first();
  await expect(loadingBtn).toBeVisible();
  await new Promise((resolve) => setTimeout(resolve, 100));
  const deleteBtn = await page.getByRole('button', {
    name: btnCopys.saved,
  }).first();
  await expect(deleteBtn).toBeVisible();

  // navigate to favorites page and validate its not empty
  await page.getByRole('link', { name: favoritesCopy.linkToFavorites }).click();
  const favoritesPageTitle = await page.getByRole('heading', {
    name: 'Tus favoritos',
  });
  await expect(favoritesPageTitle).toBeVisible();

  // find original id in favorites
  const favoriteItem = await page.locator(`article[id="${itemId}"]`).first();
  await expect(favoriteItem).toBeVisible();
});
