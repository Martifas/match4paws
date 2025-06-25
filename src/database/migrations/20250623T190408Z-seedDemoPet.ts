/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Kysely } from "kysely";
import { randomUUID } from "crypto";

export async function up(db: Kysely<unknown>) {
  const ownerId = "6714e5bb-d143-47ca-a193-93460d120fa6";

  const merfisId = randomUUID();
  const vulkanasId = randomUUID();
  const likaId = randomUUID();

  await (db as Kysely<any>)
    .insertInto("pets")
    .values([
      {
        id: merfisId,
        owner_id: ownerId,
        type: "dog",
        gender: "male",
        size: "small",
        age_group: "young",
        name: "Merfis",
        breed: "Mix",
        description: "Friendly and loves fetch.",
      },
      {
        id: vulkanasId,
        owner_id: ownerId,
        type: "dog",
        gender: "male",
        size: "small",
        age_group: "adult",
        name: "Vulkanas",
        breed: "Mix",
        description: "Friendly and loves fetch.",
      },
      {
        id: likaId,
        owner_id: ownerId,
        type: "cat",
        gender: "female",
        size: "small",
        age_group: "adult",
        name: "Lika",
        breed: "Mix",
        description: "Love to play with ball.",
      },
    ])
    .execute();

  await (db as Kysely<any>)
    .insertInto("pet_images")
    .values([
      {
        id: randomUUID(),
        pet_id: merfisId,
        url: "http://www.beglobis.com/page/upload/modproduct_6821dede02ad7_b1.jpg",
        order_idx: 0,
      },
      {
        id: randomUUID(),
        pet_id: merfisId,
        url: "http://www.beglobis.com/page/upload/modproduct_6821df148382d_b1.jpg",
        order_idx: 1,
      },
      {
        id: randomUUID(),
        pet_id: vulkanasId,
        url: "http://www.beglobis.com/page/upload/modproduct_680eb7e372443_b1.jpg",
        order_idx: 0,
      },
      {
        id: randomUUID(),
        pet_id: vulkanasId,
        url: "http://www.beglobis.com/page/upload/modproduct_680eb81a564fd_b1.jpg",
        order_idx: 1,
      },
      {
        id: randomUUID(),
        pet_id: likaId,
        url: "http://www.beglobis.com/page/upload/modproduct_5c8abfd6bcb1a_b1.jpg",
        order_idx: 0,
      },
      {
        id: randomUUID(),
        pet_id: likaId,
        url: "http://www.beglobis.com/page/upload/modproduct_5c8ac1b5d6f6c_b1.jpg",
        order_idx: 1,
      },
    ])
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await (db as Kysely<any>)
    .deleteFrom("pet_images")
    .where("url", "in", [
      "http://www.beglobis.com/page/upload/modproduct_6821dede02ad7_b1.jpg",
      "http://www.beglobis.com/page/upload/modproduct_6821df148382d_b1.jpg",
      "http://www.beglobis.com/page/upload/modproduct_680eb7e372443_b1.jpg",
      "http://www.beglobis.com/page/upload/modproduct_680eb81a564fd_b1.jpg",
      "http://www.beglobis.com/page/upload/modproduct_5c8ac1b5d6f6c_b1.jpg",
      "http://www.beglobis.com/page/upload/modproduct_5c8abfd6bcb1a_b1.jpg",
    ])
    .execute();

  // Then remove the pets
  await (db as Kysely<any>)
    .deleteFrom("pets")
    .where("name", "in", ["Merfis", "Vulkanas", "Lika"])
    .execute();
}
