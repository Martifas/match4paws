import { test, expect } from '@playwright/test';
import { loginAsOwner } from './utils/login';
import { addPet, removePet } from './utils/petActions';

test.describe('Add/Remove pet', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsOwner(page);
  });

  test('Add pet→ remove pet', async ({ page }) => {
    await addPet(page);
    await expect(page.getByRole('img', { name: 'Vulkanas' })).toBeVisible();
    await removePet(page);
    await expect(page.getByRole('img', { name: 'Vulkanas' })).not.toBeVisible();
  });
});
