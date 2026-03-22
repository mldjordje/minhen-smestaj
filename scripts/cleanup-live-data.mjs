import postgres from "postgres";

const APPLY_FLAG = "--apply";
const TARGET_TABLES = [
  "activity_log",
  "cleaning_tasks",
  "room_blocks",
  "inquiries",
  "reservations",
  "team_members",
  "users"
];

async function main() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("POSTGRES_URL ili DATABASE_URL nije definisan.");
  }

  const sql = postgres(connectionString, { max: 1 });
  const shouldApply = process.argv.includes(APPLY_FLAG);

  try {
    const counts = {};

    for (const table of TARGET_TABLES) {
      const rows = await sql.unsafe(`select count(*)::int as count from ${table}`);
      counts[table] = rows[0]?.count ?? 0;
    }

    console.log("Operational data snapshot:");
    console.log(JSON.stringify(counts, null, 2));
    console.log("Rooms and room_channel_mappings are preserved.");

    if (!shouldApply) {
      console.log(`Dry run complete. Re-run with ${APPLY_FLAG} to delete the records above.`);
      return;
    }

    await sql.begin(async (transaction) => {
      for (const table of TARGET_TABLES) {
        await transaction.unsafe(`delete from ${table}`);
      }
    });

    console.log("Operational live cleanup completed.");
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
