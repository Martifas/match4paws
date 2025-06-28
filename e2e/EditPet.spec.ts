import { test, expect } from '@playwright/test';
import { loginAsOwner } from './utils/login';
import { addPet, removePet } from './utils/petActions';

test.describe('Browse-pets navigation stays on home URL', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsOwner(page);
  });

  test('Add Pet → Edit → Make sure info changed -> Remove pet', async ({
    page,
  }) => {
    await addPet(page);
    await page.getByRole('button', { name: 'Account' }).click();
    await page
      .getByRole('listitem')
      .filter({ hasText: 'My Pet Management' })
      .click();
    await page
      .locator('div')
      .filter({ hasText: /^Vulkanas$/ })
      .getByRole('button')
      .click();
    await page.getByTestId('EditIcon').locator('path').click();
    await page.getByRole('textbox', { name: 'Pet Name' }).click();
    await page.getByRole('textbox', { name: 'Pet Name' }).fill('Sibiras');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.reload();
    await expect(page.getByRole('img', { name: 'Sibiras' })).toBeVisible();
    await page
      .locator('div')
      .filter({ hasText: /^Sibiras$/ })
      .getByRole('button')
      .click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Pet Name' }).click();
    await page.getByRole('textbox', { name: 'Pet Name' }).fill('Vulkanas');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.reload();
    await removePet(page);
  });
});
