import "dotenv/config";
import { Kysely, PostgresDialect, CamelCasePlugin } from "kysely";
import { Pool } from "pg";
import { DB } from "@/database/types";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
