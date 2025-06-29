import { test, expect } from '@playwright/test';
import { loginAsAdopter, logout } from './utils/user';

test.describe('Account → Edit profile → Back keeps URL unchanged', () => {
  test('Edit name, go back, heading & URL stay in sync', async ({ page }) => {
    await loginAsAdopter(page);

    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Account' }).click();

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Edit my profile' })
      .click();

    await page.waitForLoadState('networkidle');

    const nameInput = page.getByRole('textbox', { name: 'Full Name' });
    await nameInput.fill('Testauskas');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /Back button/i }).click();

    await expect(page.getByRole('heading', { name: 'Testauskas' })).toBeVisible(
      { timeout: 10000 }
    );

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Edit my profile' })
      .click();

    await page.waitForLoadState('networkidle');

    await nameInput.fill('Testas');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /Back button/i }).click();

    await expect(page.getByRole('heading', { name: 'Testas' })).toBeVisible({
      timeout: 10000,
    });
    await logout(page);
  });
});
