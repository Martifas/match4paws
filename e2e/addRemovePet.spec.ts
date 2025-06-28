import { test, expect } from '@playwright/test';
import { loginAsOwner, logout } from './utils/user';
import { addPet, removePet } from './utils/petActions';

test.describe('Add/Remove pet', () => {
  test('Add pet→ remove pet', async ({ page }) => {
    await loginAsOwner(page);
    await addPet(page);
    await expect(page.getByRole('img', { name: 'Vulkanas' })).toBeVisible();
    await removePet(page);
    await expect(page.getByRole('img', { name: 'Vulkanas' })).not.toBeVisible();
    await page.reload();
    await logout(page);
  });
});
