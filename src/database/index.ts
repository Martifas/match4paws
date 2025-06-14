import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely';
import { Pool } from 'pg';
import type { DB } from './types';

export function createDatabase(): Kysely<DB> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('Missing DATABASE_URL');

  const dialect = new PostgresDialect({
    pool: new Pool({ connectionString }),
  });

  return new Kysely<DB>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });
}
