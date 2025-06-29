import { test, expect } from '@playwright/test';
import { baseURL, loginAsAdopter, logout } from './utils/user';

test.describe('Browse-pets navigation stays on home URL', () => {
  test('Browse pets → back → search keeps URL unchanged', async ({ page }) => {
    await loginAsAdopter(page);
    await page.getByRole('link', { name: /browse pets/i }).click();
    await expect(page).toHaveURL(`${baseURL}/search`);

    await page.locator('header').getByRole('button', { name: /back/i }).click();
    await expect(page).toHaveURL(baseURL);

    await page
      .locator('header')
      .getByRole('button', { name: /search/i })
      .click();
    await expect(page).toHaveURL(`${baseURL}/search`);
    await logout(page);
  });
});
