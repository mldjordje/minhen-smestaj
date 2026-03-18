import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

export const db = connectionString
  ? postgres(connectionString, {
      max: 1
    })
  : null;

export function hasDatabaseConnection() {
  return Boolean(connectionString);
}
