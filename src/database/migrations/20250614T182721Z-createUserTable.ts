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
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(db.fn('now'))
    )
    .addColumn('last_login_at', 'timestamptz')
    .addColumn('name', 'text')
    .addColumn('phone', 'text')
    .addColumn('gender', 'text')
    .addColumn('preferred_animal_types', 'jsonb')
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('users').execute();
}
