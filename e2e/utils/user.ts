import { expect, Page } from '@playwright/test';

export async function loginAsAdopter(page: Page) {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page
    .getByRole('textbox', { name: 'Email address' })
    .fill('testas@turingas.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Turingas2025++');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
}

export async function loginAsOwner(page: Page) {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page
    .getByRole('textbox', { name: 'Email address' })
    .fill('prieglauda@turingas.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Turingas2025++');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
}

export async function logout(page: Page) {
  await page.getByRole('button', { name: 'Account' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Logout' }).click();

  await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
  await page.getByRole('button', { name: 'Yes' }).click();
}
