import { test, expect } from '@playwright/test';
import { addPet, removePet } from './utils/petActions';
import { baseURL, loginAsAdopter, loginAsOwner, logout } from './utils/user';

test.describe('Browse-pets → add favorite', () => {
  test('marks a pet as favorite and appears in favorites list', async ({
    page,
  }) => {
    await loginAsOwner(page);
    await addPet(page);
    await logout(page);
    await loginAsAdopter(page);

    await page.getByRole('button', { name: 'Search button' }).click();

    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'Vulkanas Vulkanas' }).click();

    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Add to favorites' }).click();

    await page.getByRole('button', { name: 'Favorites', exact: true }).click();

    await expect(page).toHaveURL(`${baseURL}/favorites`);

    await page.waitForLoadState('networkidle');

    const links = page.getByRole('link');
    await expect(links).toHaveCount(1);

    await page
      .getByRole('button', { name: 'Remove from favorites' })
      .first()
      .click();

    await page.waitForLoadState('networkidle');

    await expect(links).toHaveCount(0);
    await logout(page);
    await loginAsOwner(page);
    await removePet(page);
    await logout(page);
  });
});
