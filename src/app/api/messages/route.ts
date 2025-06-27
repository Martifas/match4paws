import { NextRequest } from 'next/server';
import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from '@/lib/utils/apiUtils';

import {
  listMessagesForConversation,
  createMessage,
} from '@/lib/queries/messages';

export async function GET(req: NextRequest) {
  const userId = await getUserFromSession();
  if (!userId) return createErrorResponse('Unauthorized', 401);

  const search = req.nextUrl.searchParams;
  const convoId = search.get('conversationId');

  if (!convoId) return createErrorResponse('conversationId required', 400);

  const after = search.get('after');
  const msgs = await listMessagesForConversation(convoId, after, userId);
  return createSuccessResponse({ messages: msgs });
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserFromSession();
    if (!userId) return createErrorResponse('Unauthorized', 401);

    const { conversationId, body } = await req.json();
    if (!conversationId || !body?.trim())
      return createErrorResponse('Invalid payload', 400);

    const msg = await createMessage(conversationId, userId, body.trim());
    return createSuccessResponse({ message: msg });
  } catch (e) {
    console.error('POST /api/messages', e);
    return createErrorResponse('Internal server error', 500);
  }
}
