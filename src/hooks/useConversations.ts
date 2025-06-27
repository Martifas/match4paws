'use client';

import { useState, useEffect, useCallback } from 'react';

export type Conversation = {
  id: string;
  petId: string;
  adopterId: string;
  ownerId: string;
  createdAt: string;
  unread: number;
  lastSentAt: string | null;
  lastBody: string | null;
  thumbUrl: string | null;
};

export default function useConversations(pollMs = 15_000) {
  const [list, setList] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOnce = useCallback(async () => {
    try {
      const res = await fetch('/api/conversations');
      const json = await res.json();
      setList(json.conversations);
      setError(null);
    } catch {
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOnce();
    const id = setInterval(fetchOnce, pollMs);
    return () => clearInterval(id);
  }, [fetchOnce, pollMs]);

  return { conversations: list, loading, error, refresh: fetchOnce };
}
