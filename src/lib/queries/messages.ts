import { db } from '@/lib/db';

export async function listMessagesForConversation(
  conversationId: string,
  afterISO: string | null,
  userId: string
) {
  let q = db
    .selectFrom('messages as m')
    .leftJoin('users as u', 'u.id', 'm.senderId')
    .select([
      'm.id',
      'm.conversationId',
      'm.senderId',
      'u.name as senderName',
      'm.body',
      'm.sentAt',
      'm.readAt',
    ])
    .where('m.conversationId', '=', conversationId)
    .orderBy('m.sentAt');

  if (afterISO) q = q.where('m.sentAt', '>', new Date(afterISO));

  db.updateTable('messages')
    .set({ readAt: new Date() })
    .where('conversationId', '=', conversationId)
    .where('senderId', '<>', userId)
    .where('readAt', 'is', null)
    .execute()
    .catch(() => {});

  return q.execute();
}

export async function createMessage(
  conversationId: string,
  senderId: string,
  body: string
) {
  const { id } = await db
    .insertInto('messages')
    .values({ conversationId, senderId, body })
    .returning('id')
    .executeTakeFirstOrThrow();

  return db
    .selectFrom('messages as m')
    .leftJoin('users as u', 'u.id', 'm.senderId')
    .select([
      'm.id',
      'm.conversationId',
      'm.senderId',
      'u.name as senderName',
      'm.body',
      'm.sentAt',
      'm.readAt',
    ])
    .where('m.id', '=', id)
    .executeTakeFirstOrThrow();
}
