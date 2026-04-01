import { NextRequest, NextResponse } from "next/server";
import { requireApiRole } from "@/lib/auth";
import { getBookingSyncSummary, getBookingsData, getRoomChannelMappingsData, getRoomsData } from "@/lib/admin-data";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const roleCheck = await requireApiRole(request, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  const [summary, rooms, mappings] = await Promise.all([
    getBookingSyncSummary({ allowDemoFallback: false }),
    getRoomsData({ allowDemoFallback: false }),
    getRoomChannelMappingsData({ allowDemoFallback: false })
  ]);
  const activeMappings = mappings.filter((mapping) => mapping.syncEnabled);

  return NextResponse.json({
    ok: true,
    ...summary,
    roomsTotal: rooms.length,
    mappedRooms: activeMappings.length,
    roomsWithoutMapping: rooms.length - activeMappings.length,
    tutorialUrl: "/admin/owner/booking-sync",
    envStatus: {
      bookingSyncMode: Boolean(process.env.BOOKING_SYNC_MODE),
      blobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      databaseUrl: Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL),
      smtp: Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM),
      googleAuth: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
    }
  });
}

export async function POST(request: NextRequest) {
  if (request.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`) {
    // Cron path is allowed.
  } else {
    const roleCheck = await requireApiRole(request, ["owner"]);

    if (roleCheck instanceof NextResponse) {
      return roleCheck;
    }
  }

  const [rooms, mappings, bookings] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getRoomChannelMappingsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false })
  ]);
  const { runRoomImportSync } = await import("@/lib/ical-sync");

  const activeMappings = mappings.filter((mapping) => mapping.syncEnabled && mapping.importUrl);
  const roomMap = new Map(rooms.map((room) => [room.id, room]));
  const results = [];
  const errors = [];

  for (const mapping of activeMappings) {
    const room = roomMap.get(mapping.roomId);

    if (!room) {
      continue;
    }

    try {
      results.push(await runRoomImportSync(room, mapping));
    } catch (error) {
      errors.push({
        roomId: mapping.roomId,
        message: error instanceof Error ? error.message : "Unknown sync error"
      });
    }
  }

  if (errors.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: `Sync nije uspeo za ${errors.map((entry) => entry.roomId).join(", ")}.`,
        syncedRooms: results.length,
        results,
        errors,
        bookingsKnown: bookings.length
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Sync je zavrsen.",
    syncedRooms: results.length,
    results,
    bookingsKnown: bookings.length
  });
}
