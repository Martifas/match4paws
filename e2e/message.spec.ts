import { test, expect } from '@playwright/test';
import { baseURL, loginAsAdopter, loginAsOwner, logout } from './utils/user';
import { addPet, removePet } from './utils/petActions';

test.describe('browse → adopt → chat → delete conversation', () => {
  test('user chats with owner, then deletes the conversation', async ({
    page,
  }) => {
    await loginAsOwner(page);
    await addPet(page);
    await logout(page);

    await page.waitForLoadState('networkidle');

    await loginAsAdopter(page);
    await page.getByRole('link', { name: /browse pets/i }).click();
    await expect(page).toHaveURL(`${baseURL}/search`);

    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'Vulkanas Vulkanas' }).click();

    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Adopt' }).click();

    await page.waitForLoadState('networkidle');

    await page
      .getByRole('textbox', { name: 'Type a message…' })
      .fill('Hello. I would like to adopt!');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('Hello. I would like to adopt!')).toBeVisible();

    await page.getByRole('button', { name: 'Messages' }).click();
    await expect(page).toHaveURL(`${baseURL}/messages`);

    await page.waitForLoadState('networkidle');

    const convoItems = page.getByRole('listitem');
    await expect(convoItems).toHaveCount(1);

    await convoItems.first().click();
    await expect(page).toHaveURL(/\/messages\/\w+/);

    await page.getByRole('button', { name: 'Back button' }).click();

    await page.waitForLoadState('networkidle');

    await convoItems.first().click();

    await page.getByRole('button', { name: 'Delete conversation' }).click();

    await page.getByRole('button', { name: 'Delete Forever' }).click();

    await page.waitForLoadState('networkidle');

    await expect(page.getByText('No messages yet.')).toBeVisible();
    await logout(page);
    await loginAsOwner(page);
    await removePet(page);
    await logout(page);
  });
});
