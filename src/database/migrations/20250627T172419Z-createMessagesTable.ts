import type { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createTable('messages')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(db.fn('gen_random_uuid'))
    )
    .addColumn('conversation_id', 'uuid', col =>
      col.notNull().references('conversations.id').onDelete('cascade')
    )
    .addColumn('sender_id', 'uuid', col =>
      col.notNull().references('users.id').onDelete('cascade')
    )
    .addColumn('body', 'text', col => col.notNull())
    .addColumn('sent_at', 'timestamptz', col =>
      col.notNull().defaultTo(db.fn('now'))
    )
    .addColumn('read_at', 'timestamptz')
    .execute();

  await db.schema
    .createIndex('messages_conversation_sent_idx')
    .on('messages')
    .columns(['conversation_id', 'sent_at'])
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('messages').execute();
}
