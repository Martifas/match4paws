import { Page } from '@playwright/test';

export async function addPet(page: Page) {
  await page.locator('.MuiButtonBase-root.MuiFab-root').click();
  await page.getByRole('textbox', { name: 'Pet Name' }).click();
  await page.getByRole('textbox', { name: 'Pet Name' }).fill('Vulkanas');
  await page.getByRole('combobox').first().click();
  await page.getByRole('option', { name: 'Dog' }).click();
  await page.getByRole('textbox', { name: 'Breed' }).click();
  await page.getByRole('textbox', { name: 'Breed' }).fill('Mix');
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: 'Male', exact: true }).click();
  await page.getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: 'Large' }).click();
  await page.getByRole('combobox').nth(3).click();
  await page.getByRole('option', { name: 'Adult' }).click();
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page
    .getByRole('textbox', { name: 'Description' })
    .fill('Very awesome dog');
  await page.getByRole('textbox', { name: 'Enter image URL' }).click();
  await page
    .getByRole('textbox', { name: 'Enter image URL' })
    .fill('http://beglobis.com/page/upload/modproduct_680eb7e372443_b1.jpg');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('textbox', { name: 'Enter image URL' }).click();
  await page
    .getByRole('textbox', { name: 'Enter image URL' })
    .fill('http://beglobis.com/page/upload/modproduct_680eb81a564fd_b1.jpg');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('button', { name: 'Add Pet' }).click();
}

export async function removePet(page: Page) {
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
  await page.getByTestId('DeleteIcon').click();
  await page.reload();
}
