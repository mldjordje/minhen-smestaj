import { db } from "@/lib/db";

type ConflictOptions = {
  excludeId?: string;
};

export function isValidDateRange(checkIn?: string, checkOut?: string) {
  return Boolean(checkIn && checkOut && checkIn < checkOut);
}

export function normalizeDateValue(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

export async function roomExists(roomId: string) {
  const sql = db!;
  const roomRows = await sql<{ id: string }[]>`
    select id
    from rooms
    where id = ${roomId}
    limit 1
  `;

  return roomRows.length > 0;
}

export async function hasReservationConflict(
  roomId: string,
  checkIn: string,
  checkOut: string,
  options?: ConflictOptions
) {
  const sql = db!;

  if (options?.excludeId) {
    const matchingReservations = await sql<{ id: string }[]>`
      select id
      from reservations
      where room_id = ${roomId}
        and id <> ${options.excludeId}
        and daterange(check_in, check_out, '[)') && daterange(${checkIn}::date, ${checkOut}::date, '[)')
      limit 1
    `;

    return matchingReservations.length > 0;
  }

  const matchingReservations = await sql<{ id: string }[]>`
    select id
    from reservations
    where room_id = ${roomId}
      and daterange(check_in, check_out, '[)') && daterange(${checkIn}::date, ${checkOut}::date, '[)')
    limit 1
  `;

  return matchingReservations.length > 0;
}

export async function hasBlockConflict(
  roomId: string,
  checkIn: string,
  checkOut: string,
  options?: ConflictOptions
) {
  const sql = db!;

  if (options?.excludeId) {
    const matchingBlocks = await sql<{ id: string }[]>`
      select id
      from room_blocks
      where room_id = ${roomId}
        and id <> ${options.excludeId}
        and daterange(check_in, check_out, '[)') && daterange(${checkIn}::date, ${checkOut}::date, '[)')
      limit 1
    `;

    return matchingBlocks.length > 0;
  }

  const matchingBlocks = await sql<{ id: string }[]>`
    select id
    from room_blocks
    where room_id = ${roomId}
      and daterange(check_in, check_out, '[)') && daterange(${checkIn}::date, ${checkOut}::date, '[)')
    limit 1
  `;

  return matchingBlocks.length > 0;
}
