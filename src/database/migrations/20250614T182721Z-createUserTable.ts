import type { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(db.fn('gen_random_uuid'))
    )
    .addColumn('auth0_id', 'text', (col) => col.notNull().unique())
    .addColumn('onboarding_completed', 'boolean', (col) =>
      col.notNull().defaultTo(false)
    )
    .addColumn('onboarding_completed_at', 'timestamptz')
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('users').execute();
}
