'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from '@/components/ui/containers/Header';
import BackButton from '@/components/ui/buttons/BackButton';
import useUserProfile from '@/hooks/useUserProfile';
import useMessages from '@/hooks/useMessages';

const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        borderRadius: 2,
        minWidth: 300,
      },
    }}
  >
    <DialogTitle sx={{ color: 'error.main', fontWeight: 'bold' }}>
      🗑️ Delete Conversation?
    </DialogTitle>
    <DialogContent>
      This action cannot be undone. All messages in this conversation will be
      permanently deleted.
    </DialogContent>
    <DialogActions sx={{ p: 2, gap: 1 }}>
      <Button onClick={onClose} variant="outlined" color="inherit">
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color="error"
        sx={{ fontWeight: 'bold' }}
      >
        Delete Forever
      </Button>
    </DialogActions>
  </Dialog>
);

export default function ChatWindow({
  conversationId,
}: {
  conversationId: string;
}) {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUserProfile();
  const { messages, send, loading, error } = useMessages(conversationId);

  const [draft, setDraft] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setDeleteDialogOpen(false);
    await fetch(`/api/conversations/${conversationId}`, { method: 'DELETE' });
    router.push('/messages');
  };

  const submit = async () => {
    if (!draft.trim() || !user) return;
    await send(draft.trim(), user.id, user.name ?? 'You');
    setDraft('');
  };

  if (userLoading || loading)
    return <p className="text-center py-10">Loading…</p>;

  if (!conversationId)
    return (
      <p className="text-center py-10 text-gray-500">
        Select a conversation to start chatting.
      </p>
    );

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header
        left={<BackButton smartNavigation />}
        center={<h1 className="text-lg font-semibold">Messages</h1>}
        right={
          <IconButton
            aria-label="Delete conversation"
            onClick={handleDeleteClick}
            edge="end"
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        {messages.map(m => {
          const mine = m.senderId === user.id;
          const letter =
            (mine ? user.name : (m.senderName ?? 'U'))[0]?.toUpperCase() ?? 'U';

          return (
            <div
              key={m.id}
              className={`flex items-start ${mine ? 'justify-end' : 'justify-start'}`}
            >
              {!mine && (
                <Avatar
                  sx={{ bgcolor: '#ed9426', width: 32, height: 32, mr: 2 }}
                >
                  {letter}
                </Avatar>
              )}

              <div
                className={`max-w-xs p-3 rounded-lg ${
                  mine
                    ? 'bg-blue-100 text-gray-900'
                    : 'bg-green-100 text-gray-800'
                }`}
              >
                {m.body}
              </div>

              {mine && (
                <Avatar
                  sx={{ bgcolor: '#ed9426', width: 32, height: 32, ml: 2 }}
                >
                  {letter}
                </Avatar>
              )}
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t pb-15 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Type a message…"
        />
        <button
          className="bg-orange-500 text-white rounded px-4 disabled:opacity-50"
          onClick={submit}
          disabled={!draft.trim()}
        >
          Send
        </button>
      </div>

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
