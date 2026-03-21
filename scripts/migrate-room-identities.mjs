import postgres from "postgres";

const roomUpdates = [
  {
    id: "rm-101",
    name: "Soba 1",
    slug: "soba-1"
  },
  {
    id: "rm-204",
    name: "Soba 2",
    slug: "soba-2"
  },
  {
    id: "rm-305",
    name: "Soba 3",
    slug: "soba-3"
  }
];

const inquiryUpdates = [
  {
    from: "Jednokrevetna soba",
    to: "Soba 1"
  },
  {
    from: "Dvokrevetna soba",
    to: "Soba 2"
  }
];

async function main() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("POSTGRES_URL ili DATABASE_URL nije definisan.");
  }

  const sql = postgres(connectionString, { max: 1 });

  try {
    await sql.begin(async (transaction) => {
      for (const room of roomUpdates) {
        await transaction`
          update rooms
          set name = ${room.name},
              slug = ${room.slug}
          where id = ${room.id}
        `;
      }

      for (const inquiry of inquiryUpdates) {
        await transaction`
          update inquiries
          set requested_room_type = ${inquiry.to}
          where requested_room_type = ${inquiry.from}
        `;
      }
    });

    console.log("Room identities migrated.");
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
