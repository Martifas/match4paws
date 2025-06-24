import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>) {
  await db.schema
    .alterTable("pets")
    .addColumn("status", "text", (c) => c.notNull().defaultTo("available"))
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.alterTable("pets").dropColumn("status").execute();
}
