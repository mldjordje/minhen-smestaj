import fs from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

async function main() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("POSTGRES_URL ili DATABASE_URL nije definisan.");
  }

  const schemaPath = path.join(process.cwd(), "db", "schema.sql");
  const schemaSql = await fs.readFile(schemaPath, "utf8");
  const sql = postgres(connectionString, { max: 1 });

  try {
    await sql.unsafe(schemaSql);
    console.log("Activity log schema ensured.");
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
