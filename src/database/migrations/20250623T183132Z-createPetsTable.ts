import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createTable("pets")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(db.fn("gen_random_uuid"))
    )
    .addColumn("owner_id", "uuid", (col) =>
      col.notNull().references("users.id").onDelete("cascade")
    )
    .addColumn("type", "text", (c) => c.notNull())
    .addColumn("gender", "text", (c) => c.notNull().defaultTo("unknown"))
    .addColumn("size", "text", (c) => c.notNull())
    .addColumn("age_group", "text", (c) => c.notNull())
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("breed", "varchar(80)")
    .addColumn("description", "text")
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now"))
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(db.fn("now"))
    )
    .execute();

  await db.schema
    .createIndex("pets_quick_filter_idx")
    .on("pets")
    .columns(["type", "gender", "size", "age_group"])
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropIndex("pets_quick_filter_idx").execute();
  await db.schema.dropTable("pets").execute();
}
