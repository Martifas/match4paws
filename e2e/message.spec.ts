import { test, expect } from '@playwright/test';
import { loginAsAdopter } from './utils/login';

test.describe('browse → adopt → chat → delete conversation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdopter(page);
  });

  test('user chats with owner, then deletes the conversation', async ({
    page,
  }) => {
    await page.getByRole('link', { name: /browse pets/i }).click();
    await expect(page).toHaveURL('http://localhost:3000/search');

    await page.getByRole('link', { name: 'Notis Notis' }).click();
    await page.getByRole('button', { name: 'Adopt' }).click();
    await expect(page).toHaveURL(/\/messages\/\w+/);

    await page
      .getByRole('textbox', { name: 'Type a message…' })
      .fill('Hello. I would like to adopt!');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Hello. I would like to adopt!')).toBeVisible();

    await page.getByRole('button', { name: 'Messages' }).click();
    await expect(page).toHaveURL('http://localhost:3000/messages');

    const convoItems = page.getByRole('listitem');
    await expect(convoItems).toHaveCount(1);

    await convoItems.first().click();
    await expect(page).toHaveURL(/\/messages\/\w+/);

    await page.getByRole('button', { name: 'Back button' }).click();

    await convoItems.first().click();

    await page.getByRole('button', { name: 'Delete conversation' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Delete Forever' }).click();

    await expect(page.getByText('No messages yet.')).toBeVisible();
  });
});
