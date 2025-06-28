import { test, expect } from '@playwright/test';
import { loginAsAdopter } from './utils/login';

test.describe('Browse-pets → add favorite', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdopter(page);
  });

  test('marks a pet as favorite and appears in favorites list', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Search button' }).click();

    await page.locator('.p-2').first().click();

    await page.getByRole('link', { name: 'Lama Lama' }).click();

    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Add to favorites' }).click();

    await page.getByRole('button', { name: 'Favorites', exact: true }).click();

    await expect(page).toHaveURL('http://localhost:3000/favorites');

    const links = page.getByRole('link');
    await expect(links).toHaveCount(2);
    await page
      .getByRole('button', { name: 'Remove from favorites' })
      .first()
      .click();
    await page.getByRole('button', { name: 'Remove from favorites' }).click();
    await expect(links).toHaveCount(0);
  });
});
