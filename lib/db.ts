import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

export const db = connectionString
  ? postgres(connectionString, {
      max: 1
    })
  : null;

let ensureSchemaPromise: Promise<void> | null = null;

export async function ensureDatabaseSchema() {
  if (!db) {
    return;
  }

  if (!ensureSchemaPromise) {
    ensureSchemaPromise = (async () => {
      await db`
        create table if not exists users (
          id text primary key,
          email text not null unique,
          name text not null,
          image text,
          role text not null default 'guest',
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now()
        )
      `;

      await db`
        alter table reservations
        add column if not exists guest_user_id text references users(id) on delete set null,
        add column if not exists contact_email text,
        add column if not exists contact_phone text,
        add column if not exists notes text,
        add column if not exists channel_reference text,
        add column if not exists updated_at timestamptz not null default now()
      `;

      await db`
        alter table room_channel_mappings
        add column if not exists last_sync_status text not null default 'idle',
        add column if not exists last_sync_error text
      `;

      await db`
        create unique index if not exists reservations_room_channel_reference_idx
        on reservations (room_id, channel_reference)
        where channel_reference is not null
      `;
    })();
  }

  await ensureSchemaPromise;
}

export function hasDatabaseConnection() {
  return Boolean(connectionString);
}
