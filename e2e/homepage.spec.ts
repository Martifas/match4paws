import { test, expect } from '@playwright/test';
import { loginAsOwner, logout } from './utils/user';
import { addPet, removePet } from './utils/petActions';

test.describe('home page – authenticated user', () => {
  test('core sections are visible', async ({ page }) => {
    await loginAsOwner(page);
    await addPet(page);

    await expect(
      page.getByRole('heading', { name: 'Find your perfect match' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Featured Pets' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'How it works' })
    ).toBeVisible();
    await removePet(page);
    await page.waitForTimeout(1000);
    await logout(page);
  });
});
