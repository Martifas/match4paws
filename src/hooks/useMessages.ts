'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  sentAt: string;
  readAt: string | null;
  senderName: string | null;
};

export default function useMessages(conversationId?: string, pollMs = 20_000) {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(Boolean(conversationId));
  const [error, setError] = useState<string | null>(null);

  const latest = useRef<string | null>(null);

  const fetchNew = useCallback(async () => {
    if (!conversationId) return;

    try {
      const url = new URL('/api/messages', location.origin);
      url.searchParams.set('conversationId', conversationId);
      if (latest.current) url.searchParams.set('after', latest.current);

      const res = await fetch(url.toString());
      const { messages = [] } = await res.json();

      if (messages.length) {
        setMsgs(prev => {
          const seen = new Set(prev.map(m => m.id));
          const unique = messages.filter((m: Message) => !seen.has(m.id));
          return unique.length ? [...prev, ...unique] : prev;
        });
        latest.current = messages.at(-1).sent_at;
      }

      setError(null);
    } catch {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;
    setMsgs([]);
    latest.current = null;
    setLoading(true);
    fetchNew();
    const id = setInterval(fetchNew, pollMs);
    return () => clearInterval(id);
  }, [conversationId, fetchNew, pollMs]);

  const send = useCallback(
    async (body: string, senderId: string, senderName: string | null) => {
      const temp: Message = {
        id: crypto.randomUUID(),
        conversationId: conversationId!,
        senderId,
        senderName: senderName ?? 'You',
        body,
        sentAt: new Date().toISOString(),
        readAt: null,
      };
      setMsgs(prev => [...prev, temp]);

      try {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId, body }),
        });
        const { message } = await res.json();

        setMsgs(prev => prev.map(m => (m.id === temp.id ? message : m)));
        latest.current = message.sentAt;
      } catch {
        setMsgs(prev => prev.filter(m => m.id !== temp.id));
        throw new Error('send-failed');
      }
    },
    [conversationId]
  );

  return { messages: msgs, loading, error, send, refresh: fetchNew };
}
