/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Kysely } from 'kysely';
import { randomUUID } from 'crypto';

export async function up(db: Kysely<unknown>) {
  const ownerId = '260f8595-d492-46ae-93c1-6f8548f168b2';
  const petId = randomUUID();

  await (db as Kysely<any>)
    .insertInto('pets')
    .values({
      id: petId,
      owner_id: ownerId,
      type: 'dog',
      gender: 'male',
      size: 'small',
      age_group: 'young',
      name: 'Merfis',
      breed: 'Mix',
      description: 'Friendly and loves fetch.',
    })
    .execute();

  await (db as Kysely<any>)
    .insertInto('pet_images')
    .values([
      {
        id: randomUUID(),
        pet_id: petId,
        url: 'http://www.beglobis.com/page/upload/modproduct_6821dede02ad7_b1.jpg',
        order_idx: 0,
      },
      {
        id: randomUUID(),
        pet_id: petId,
        url: 'http://www.beglobis.com/page/upload/modproduct_6821df148382d_b1.jpg',
        order_idx: 1,
      },
    ])
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await (db as Kysely<any>)
    .deleteFrom('pet_images')
    .where(
      'url',
      '=',
      'http://www.beglobis.com/page/upload/modproduct_6821df148382d_b1.jpg'
    )
    .where(
      'url',
      '=',
      'http://www.beglobis.com/page/upload/modproduct_6821dede02ad7_b1.jpg'
    )
    .execute();

  await (db as Kysely<any>)
    .deleteFrom('pets')
    .where('name', '=', 'Buddy')
    .execute();
}
