import { NextRequest } from 'next/server';
import {
  createErrorResponse,
  createSuccessResponse,
  getUserFromSession,
} from '@/lib/utils/apiUtils';
import { deleteConversation } from '@/lib/queries/conversations';
import { db } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  try {
    const userId = await getUserFromSession();
    if (!userId) return createErrorResponse('Unauthorized', 401);

    const row = await db
      .selectFrom('conversations')
      .select('id')
      .where('id', '=', id)
      .where(eb =>
        eb.or([eb('adopterId', '=', userId), eb('ownerId', '=', userId)])
      )
      .executeTakeFirst();

    if (!row) return createErrorResponse('Not found', 404);

    await deleteConversation(id);
    return createSuccessResponse({});
  } catch (e) {
    console.error('DELETE /api/conversations/[id]', e);
    return createErrorResponse('Internal server error', 500);
  }
}
