import type { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createTable('conversations')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(db.fn('gen_random_uuid'))
    )
    .addColumn('pet_id', 'uuid', col =>
      col.notNull().references('pets.id').onDelete('cascade')
    )
    .addColumn('adopter_id', 'uuid', col =>
      col.notNull().references('users.id').onDelete('cascade')
    )
    .addColumn('owner_id', 'uuid', col =>
      col.notNull().references('users.id').onDelete('cascade')
    )
    .addColumn('created_at', 'timestamptz', col =>
      col.notNull().defaultTo(db.fn('now'))
    )

    .addUniqueConstraint('conversations_unique_triplet', [
      'pet_id',
      'adopter_id',
      'owner_id',
    ])
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('conversations').execute();
}
