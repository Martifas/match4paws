import { test, expect } from '@playwright/test';
import { loginAsAdopter } from './utils/login';

test.describe('Account → Edit profile → Back keeps URL unchanged', () => {
  test('Edit name, go back, heading & URL stay in sync', async ({ page }) => {
    await loginAsAdopter(page);

    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Account' }).click();

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Edit my profile' })
      .click();
    const nameInput = page.getByRole('textbox', { name: 'Full Name' });
    await nameInput.fill('Testauskas');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: /Back button/i }).click();

    await expect(
      page.getByRole('heading', { name: 'Testauskas' })
    ).toBeVisible();

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Edit my profile' })
      .click();

    await nameInput.fill('Testas');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    await page.getByRole('button', { name: /Back button/i }).click();

    await expect(page.getByRole('heading', { name: 'Testas' })).toBeVisible();
  });
});
