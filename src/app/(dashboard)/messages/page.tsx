'use client';

import Conversations from '@/components/chat/Conversations';
import Header from '@/components/ui/containers/Header';
import BackButton from '@/components/ui/buttons/BackButton';

export default function InboxPage() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header
        left={<BackButton smartNavigation />}
        center={<h1 className="text-lg font-semibold">Messages</h1>}
      />
      <Conversations />
    </div>
  );
}
