import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createTable("favourites")
    .addColumn("user_id", "uuid", (c) =>
      c.notNull().references("users.id").onDelete("cascade")
    )
    .addColumn("pet_id", "uuid", (c) =>
      c.notNull().references("pets.id").onDelete("cascade")
    )
    .addColumn("created_at", "timestamptz", (c) =>
      c.notNull().defaultTo(db.fn("now"))
    )
    .addPrimaryKeyConstraint("favourites_pk", ["user_id", "pet_id"])
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable("favourites").execute();
}
