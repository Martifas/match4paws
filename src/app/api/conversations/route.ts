import { NextRequest } from 'next/server';
import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from '@/lib/utils/apiUtils';
import {
  getOrCreateConversation,
  listConversationsForUser,
} from '@/lib/queries/conversations';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  try {
    const userId = await getUserFromSession();
    if (!userId) return createErrorResponse('Unauthorized', 401);

    const convos = await listConversationsForUser(userId);
    return createSuccessResponse({ conversations: convos });
  } catch (e) {
    console.error('GET /api/conversations', e);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const adopterId = await getUserFromSession();
    if (!adopterId) return createErrorResponse('Unauthorized', 401);

    const { petId, ownerId } = await req.json();
    if (!petId || !ownerId)
      return createErrorResponse('petId and ownerId required', 400);

    const conversationId = await getOrCreateConversation(
      petId,
      adopterId,
      ownerId
    );

    return createSuccessResponse({ conversationId });
  } catch (e) {
    console.error('POST /api/conversations', e);
    return createErrorResponse('Internal server error', 500);
  }
}
