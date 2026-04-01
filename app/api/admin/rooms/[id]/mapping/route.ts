import { NextResponse } from "next/server";
import { buildRoomExportUrlForRequest } from "@/lib/app-url";
import { requireApiRole } from "@/lib/auth";
import { db, ensureDatabaseSchema } from "@/lib/db";
import { RoomChannelMapping } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type MappingPayload = {
  exportUrl?: string;
  externalRoomId?: string;
  externalRoomName?: string;
  importUrl?: string;
  syncEnabled?: boolean;
};

function createMappingId(roomId: string) {
  return `map-${roomId}`;
}

function isBookingIcalUrl(value: string) {
  return /^https:\/\/ical\.booking\.com\//i.test(value);
}

export async function POST(request: Request, context: RouteContext) {
  const roleCheck = await requireApiRole(request as never, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        message: "Baza nije povezana. Booking.com mapiranje moze da se cuva samo u bazi."
      },
      { status: 500 }
    );
  }

  try {
    await ensureDatabaseSchema();

    const { id: roomId } = await context.params;
    const payload = (await request.json()) as MappingPayload;
    const legacyExportUrl = payload.exportUrl?.trim() ?? "";
    const importUrl =
      payload.importUrl?.trim() || (isBookingIcalUrl(legacyExportUrl) ? legacyExportUrl : "");

    if (!roomId) {
      return NextResponse.json(
        {
          ok: false,
          message: "Room ID nije prosledjen."
        },
        { status: 400 }
      );
    }

    const mapping: RoomChannelMapping = {
      id: createMappingId(roomId),
      roomId,
      provider: "Booking.com",
      externalRoomId: payload.externalRoomId?.trim() ?? "",
      externalRoomName: payload.externalRoomName?.trim() ?? "",
      exportUrl: buildRoomExportUrlForRequest(request, roomId),
      importUrl,
      syncEnabled: Boolean(payload.syncEnabled),
      lastSyncedAt: null,
      lastSyncError: null,
      lastSyncStatus: "idle"
    };

    if (mapping.syncEnabled && (!mapping.externalRoomName || !mapping.importUrl)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Za aktivan sync unesi bar tacan Booking.com naziv sobe i iCal import URL."
        },
        { status: 400 }
      );
    }

    const roomRows = await db<{ id: string }[]>`
      select id
      from rooms
      where id = ${roomId}
      limit 1
    `;

    if (roomRows.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Soba nije pronadjena."
        },
        { status: 404 }
      );
    }

    await db`
      insert into room_channel_mappings (
        id,
        room_id,
        provider,
        external_room_id,
        external_room_name,
        export_url,
        import_url,
        sync_enabled,
        last_sync_status,
        last_sync_error,
        last_synced_at,
        updated_at
      ) values (
        ${mapping.id},
        ${mapping.roomId},
        ${mapping.provider},
        ${mapping.externalRoomId},
        ${mapping.externalRoomName},
        ${mapping.exportUrl},
        ${mapping.importUrl},
        ${mapping.syncEnabled},
        ${mapping.lastSyncStatus ?? "idle"},
        ${mapping.lastSyncError ?? null},
        ${mapping.lastSyncedAt ?? null},
        now()
      )
      on conflict (room_id) do update
      set
        provider = excluded.provider,
        external_room_id = excluded.external_room_id,
        external_room_name = excluded.external_room_name,
        export_url = excluded.export_url,
        import_url = excluded.import_url,
        sync_enabled = excluded.sync_enabled,
        last_sync_status = excluded.last_sync_status,
        last_sync_error = excluded.last_sync_error,
        last_synced_at = excluded.last_synced_at,
        updated_at = now()
    `;

    return NextResponse.json({
      ok: true,
      mapping,
      message: mapping.syncEnabled
        ? "Booking.com mapiranje je sacuvano i sync je aktiviran."
        : "Mapiranje je sacuvano kao draft."
    });
  } catch (error) {
    console.error("Room mapping save failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Nismo uspeli da sacuvamo Booking.com mapiranje."
      },
      { status: 500 }
    );
  }
}
