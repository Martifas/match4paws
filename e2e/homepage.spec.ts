import { test, expect } from '@playwright/test';
import { loginAsAdopter } from './utils/login';

test.describe('home page – authenticated user', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdopter(page);
  });

  test('core sections are visible', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await expect(
      page.getByRole('heading', { name: 'Find your perfect match' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Featured Pets' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'How it works' })
    ).toBeVisible();
  });
});
