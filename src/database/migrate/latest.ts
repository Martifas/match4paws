import "dotenv/config";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  FileMigrationProvider,
  Migrator,
  type Kysely,
  type MigrationProvider,
} from "kysely";
import { createDatabase } from "..";
import { DB } from "../types";

const MIGRATIONS_PATH = "../migrations";

async function migrateLatest(db: Kysely<DB>) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));

  const nodeProvider = new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(dirname, MIGRATIONS_PATH),
  });

  const { results, error } = await migrateToLatest(nodeProvider, db);

  if (!results?.length && !error) {
    console.log("No migrations to run.");
  }

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.info(`✅ Migration "${it.migrationName}" executed.`);
    } else if (it.status === "Error") {
      console.error(`❌ Migration "${it.migrationName}" failed.`);
    }
  });

  if (error) {
    console.error("❌ Migration process failed.");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

export async function migrateToLatest(
  provider: MigrationProvider,
  db: Kysely<DB>
) {
  const migrator = new Migrator({ db, provider });
  return migrator.migrateToLatest();
}

const pathToThisFile = path.resolve(fileURLToPath(import.meta.url));
const pathPassedToNode = path.resolve(process.argv[1] ?? "");
const isFileRunDirectly = pathToThisFile.includes(pathPassedToNode);

if (isFileRunDirectly) {
  const db = createDatabase();
  await migrateLatest(db);
}
