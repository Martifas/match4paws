'use client';
import { useRouter } from 'next/navigation';
import useConversations from '@/hooks/useConversations';
import Image from 'next/image';

export default function Conversations() {
  const router = useRouter();
  const { conversations, loading, error } = useConversations();

  if (loading) return <p className="py-10 text-center">Loading…</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!conversations.length)
    return <p className="text-center text-gray-500 py-10">No messages yet.</p>;

  return (
    <ul className="divide-y flex flex-col w-full justify-center mx-auto">
      {conversations.map(c => (
        <li
          key={c.id}
          className="flex items-center gap-4 p-4 sm:pl-30 hover:bg-gray-50 cursor-pointer w-full border-t border-b border-gray-300"
          onClick={() => router.push(`/messages/${c.id}`)}
        >
          <Image
            
            width={12}
            height={12}
            src={c.thumbUrl ?? '/placeholder.png'}
            alt=""
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />

          <div className="flex-1">
            <p className="font-medium line-clamp-1">
              {c.lastBody ?? 'New conversation'}
            </p>
            <span className="text-xs text-gray-500">
              {c.lastSentAt ? new Date(c.lastSentAt).toLocaleString() : ''}
            </span>
          </div>
          {c.unread > 0 && (
            <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {c.unread}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
