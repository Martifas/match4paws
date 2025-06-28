/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useConversations, { type Conversation } from '@/hooks/useConversations';

vi.useFakeTimers();

let fetchSpy: any;
const sample: Conversation[] = [
  {
    id: 'c1',
    petId: 'p1',
    adopterId: 'a1',
    ownerId: 'o1',
    createdAt: '2025-01-01T00:00:00Z',
    unread: 0,
    lastSentAt: null,
    lastBody: null,
    thumbUrl: null,
  },
];

beforeEach(() => {
  fetchSpy = vi.fn().mockResolvedValue({
    json: async () => ({ conversations: sample }),
  });

  global.fetch = fetchSpy;
  vi.clearAllMocks();
});

describe('useConversations', () => {
  it('loads data and updates state', async () => {
    const { result } = renderHook(() => useConversations(60_000));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.conversations).toEqual(sample);
  });
});
