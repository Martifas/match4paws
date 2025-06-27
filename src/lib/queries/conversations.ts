import { db } from '@/lib/db';
import { sql } from 'kysely';

export async function listConversationsForUser(userId: string) {
  return db
    .selectFrom('conversations as c')

    .leftJoin('petImages as pi', join =>
      join.onRef('pi.petId', '=', 'c.petId').on('pi.orderIdx', '=', 0)
    )

    .leftJoin('messages as m', 'm.conversationId', 'c.id')
    .select([
      'c.id',
      'c.petId',
      'c.adopterId',
      'c.ownerId',
      'c.createdAt',
      'pi.url as thumbUrl',

      sql<number>`count(*) filter (
        where m.read_at is null
          and m.sender_id <> ${userId}
      )`.as('unread'),

      sql<Date>`max(m.sent_at)`.as('lastSentAt'),
      sql<string>`max(m.body)`.as('lastBody'),
    ])

    .where(eb =>
      eb.or([eb('c.adopterId', '=', userId), eb('c.ownerId', '=', userId)])
    )

    .groupBy([
      'c.id',
      'c.petId',
      'c.adopterId',
      'c.ownerId',
      'c.createdAt',
      'pi.url',
    ])

    .orderBy(sql`max(m.sent_at)`, 'desc')
    .execute();
}

export async function getOrCreateConversation(
  petId: string,
  adopterId: string,
  ownerId: string
) {
  const existing = await db
    .selectFrom('conversations')
    .select('id')
    .where('petId', '=', petId)
    .where('adopterId', '=', adopterId)
    .where('ownerId', '=', ownerId)
    .executeTakeFirst();

  if (existing) return existing.id;

  const { id } = await db
    .insertInto('conversations')
    .values({ petId: petId, adopterId: adopterId, ownerId: ownerId })
    .returning('id')
    .executeTakeFirstOrThrow();

  return id;
}

export async function deleteConversation(id: string) {
  await db.transaction().execute(async trx => {
    await trx.deleteFrom('messages').where('conversationId', '=', id).execute();
    await trx.deleteFrom('conversations').where('id', '=', id).execute();
  });
}
