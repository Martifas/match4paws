import { expect, Page } from '@playwright/test';

const adopterEmail = process.env.TEST_ADOPTER_EMAIL;
const ownerEmail = process.env.TEST_OWNER_EMAIL;
const password = process.env.TEST_PASSWORD;
export const baseURL = process.env.APP_BASE_URL;

export async function loginAsAdopter(page: Page) {
  await page.goto(baseURL);
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(adopterEmail);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
}

export async function loginAsOwner(page: Page) {
  await page.goto(baseURL);
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(ownerEmail);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
}

export async function logout(page: Page) {
  await page.getByRole('button', { name: 'Account' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Logout' }).click();

  await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
  await page.getByRole('button', { name: 'Yes' }).click();
}
