'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PrimaryButton from '../ui/buttons/PrimaryButton';

export default function AdoptButton({
  petId,
  ownerId,
}: {
  petId: string;
  ownerId: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const startChat = async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petId, ownerId }),
      });
      if (!res.ok) throw new Error();
      const { conversationId } = await res.json();

      router.push(`/messages/${conversationId}`);
    } catch {
      alert('Could not start conversation.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <PrimaryButton disabled={busy} onClick={startChat}>
      {busy ? 'Starting…' : 'Contact the owner'}
    </PrimaryButton>
  );
}
