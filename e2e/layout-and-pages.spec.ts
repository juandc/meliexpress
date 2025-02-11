import { test, expect } from '@playwright/test';

// TODO: use dicts for copys

test('home page renders, has correct title and navbar', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/MeliExpress: una versión lite de Mercado Libre/);
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('favorites renders, has correct title and navbar', async ({ page }) => {
  await page.goto('/favorites');
  await expect(page).toHaveTitle(/Tus favoritos | MeliExpress/);
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('search results page renders, has correct title and navbar', async ({ page }) => {
  await page.goto('/search/laptop');
  await expect(page).toHaveTitle(/MeliExpress: una versión lite de Mercado Libre/);
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('product details page renders with correct title', async ({ page }) => {
  await page.goto('/items/nintendo-wii-512mb-sports-pack-MLA1428983989');
  await expect(page).toHaveTitle(/Nintendo Wii 512mb Sports Pack  Color Blanco | MeliExpress/);
  await expect(page.getByRole('navigation')).toBeVisible();
});
