import ical, { VEvent } from "node-ical";
import { writeActivityLog } from "@/lib/activity-log";
import { hasReservationConflict } from "@/lib/calendar-admin";
import { db, ensureDatabaseSchema } from "@/lib/db";
import { getRoomDisplayName } from "@/lib/rooms";
import type { Booking, Room, RoomChannelMapping } from "@/lib/types";

function normalizeDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function resolveBookingStatus(checkIn: string, checkOut: string): Booking["status"] {
  const today = new Date().toISOString().slice(0, 10);

  if (today === checkIn) {
    return "arriving";
  }

  if (today >= checkIn && today < checkOut) {
    return "checked-in";
  }

  if (today >= checkOut) {
    return "checked-out";
  }

  return "confirmed";
}

type SyncRoomResult = {
  imported: number;
  removed: number;
  roomId: string;
  success: boolean;
};

export async function runRoomImportSync(room: Room, mapping: RoomChannelMapping) {
  if (!db) {
    throw new Error("Database is not connected.");
  }

  await ensureDatabaseSchema();

  if (!mapping.importUrl || !mapping.syncEnabled) {
    return {
      imported: 0,
      removed: 0,
      roomId: room.id,
      success: true
    } satisfies SyncRoomResult;
  }

  try {
    const events = await ical.async.fromURL(mapping.importUrl);
    const vevents = Object.values(events).reduce<VEvent[]>((accumulator, entry) => {
      if (entry && entry.type === "VEVENT") {
        accumulator.push(entry);
      }

      return accumulator;
    }, []);
    const importedReferences = new Set<string>();
    let importedCount = 0;

    for (const event of vevents) {
      const uid = event.uid || `${room.id}-${event.start.toISOString()}`;
      const checkIn = normalizeDate(event.start);
      const checkOut = normalizeDate(event.end || event.start);
      const guestName =
        typeof event.summary === "string" && event.summary.trim().length > 0
          ? event.summary
          : "Booking.com guest";
      const description =
        typeof event.description === "string" && event.description.trim().length > 0
          ? event.description
          : "Imported from Booking.com iCal";

      if (checkIn >= checkOut) {
        continue;
      }

      importedReferences.add(uid);

      const existingRows = await db<{ id: string; source: Booking["source"] }[]>`
        select id, source
        from reservations
        where room_id = ${room.id}
          and channel_reference = ${uid}
        limit 1
      `;

      if (existingRows.length === 0) {
        const hasConflict = await hasReservationConflict(room.id, checkIn, checkOut);

        if (hasConflict) {
          await writeActivityLog({
            action: "sync-conflict",
            actor: "booking-sync",
            entityId: room.id,
            entityType: "room_block",
            message: `Booking.com import je preskocio konflikt za ${getRoomDisplayName(room)}.`,
            metadata: {
              roomId: room.id,
              channelReference: uid,
              checkIn,
              checkOut
            }
          });
          continue;
        }

        await db`
          insert into reservations (
            id,
            guest_name,
            room_id,
            source,
            check_in,
            check_out,
            status,
            guests,
            contact_email,
            notes,
            channel_reference,
            updated_at
          ) values (
            ${`ical-${Date.now()}-${Math.floor(Math.random() * 1000)}`},
            ${guestName},
            ${room.id},
            ${"Booking.com"},
            ${checkIn},
            ${checkOut},
            ${resolveBookingStatus(checkIn, checkOut)},
            ${1},
            ${null},
            ${description},
            ${uid},
            now()
          )
        `;
      } else {
        await db`
          update reservations
          set
            guest_name = ${guestName},
            check_in = ${checkIn},
            check_out = ${checkOut},
            status = ${resolveBookingStatus(checkIn, checkOut)},
            notes = ${description},
            updated_at = now()
          where id = ${existingRows[0].id}
        `;
      }

      importedCount += 1;
    }

    const staleRows = await db<{ channel_reference: string | null; id: string }[]>`
      select id, channel_reference
      from reservations
      where room_id = ${room.id}
        and source = ${"Booking.com"}
        and channel_reference is not null
    `;

    const removableIds = staleRows
      .filter((row) => row.channel_reference && !importedReferences.has(row.channel_reference))
      .map((row) => row.id);

    let removedCount = 0;

    if (removableIds.length > 0) {
      await db`
        delete from reservations
        where id in ${db(removableIds)}
      `;
      removedCount = removableIds.length;
    }

    await db`
      update room_channel_mappings
      set
        last_synced_at = now(),
        last_sync_status = ${"success"},
        last_sync_error = ${null}
      where room_id = ${room.id}
    `;

    return {
      imported: importedCount,
      removed: removedCount,
      roomId: room.id,
      success: true
    } satisfies SyncRoomResult;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown sync error";

    await db`
      update room_channel_mappings
      set
        last_synced_at = now(),
        last_sync_status = ${"error"},
        last_sync_error = ${errorMessage}
      where room_id = ${room.id}
    `;

    await writeActivityLog({
      action: "sync-error",
      actor: "booking-sync",
      entityId: room.id,
      entityType: "reservation",
      message: `Booking.com sync nije uspeo za ${getRoomDisplayName(room)}.`,
      metadata: {
        error: errorMessage,
        roomId: room.id
      }
    });

    throw error;
  }
}
