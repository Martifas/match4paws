import { test, expect } from '@playwright/test';
import { loginAsAdopter } from './utils/login';

test.describe('Browse-pets navigation stays on home URL', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdopter(page);
  });

  test('Browse pets → back → search keeps URL unchanged', async ({ page }) => {
    await page.getByRole('link', { name: /browse pets/i }).click();
    await expect(page).toHaveURL('http://localhost:3000/search');

    await page.locator('header').getByRole('button', { name: /back/i }).click();
    await expect(page).toHaveURL('http://localhost:3000/');

    await page
      .locator('header')
      .getByRole('button', { name: /search/i })
      .click();
    await expect(page).toHaveURL('http://localhost:3000/');
  });
});
