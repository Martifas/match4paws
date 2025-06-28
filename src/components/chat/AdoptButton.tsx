/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pushMock } from 'tests/setup';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const importBtn = () => import('@/components/chat/AdoptButton');

beforeEach(() => {
  pushMock.mockClear();
  vi.restoreAllMocks();
});

describe('<AdoptButton />', () => {
  it('posts conversation and navigates on success', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ conversationId: 'c42' }),
    } as any);

    // @ts-expect-error – dynamic import typing
    const { default: AdoptButton } = await importBtn();

    render(<AdoptButton petId="p1" ownerId="o1" />);

    const btn = screen.getByRole('button', { name: 'Adopt' });
    await userEvent.click(btn);
    expect(btn).toBeDisabled();

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/messages/c42'));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/conversations',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ petId: 'p1', ownerId: 'o1' }),
      })
    );

    expect(btn).toBeEnabled();
  });

  it('alerts and resets when request fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false } as any);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // @ts-expect-error – dynamic import typing
    const { default: AdoptButton } = await importBtn();
    render(<AdoptButton petId="p2" ownerId="o2" />);

    const btn = screen.getByRole('button', { name: 'Adopt' });
    await userEvent.click(btn);

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith('Could not start conversation.')
    );

    expect(pushMock).not.toHaveBeenCalled();
    expect(btn).toBeEnabled();
  });
});
