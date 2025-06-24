import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createTable("pet_images")
    .addColumn("id", "uuid", (c) =>
      c.primaryKey().defaultTo(db.fn("gen_random_uuid"))
    )
    .addColumn("pet_id", "uuid", (c) =>
      c.notNull().references("pets.id").onDelete("cascade")
    )
    .addColumn("url", "text", (c) => c.notNull())
    .addColumn("order_idx", "integer", (c) => c.notNull().defaultTo(0))
    .addColumn("created_at", "timestamptz", (c) =>
      c.notNull().defaultTo(db.fn("now"))
    )
    .execute();

  await db.schema
    .createIndex("pet_images_order_idx")
    .on("pet_images")
    .columns(["pet_id", "order_idx"])
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropIndex("pet_images_order_idx").execute();
  await db.schema.dropTable("pet_images").execute();
}
