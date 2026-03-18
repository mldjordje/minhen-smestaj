import { NextResponse } from "next/server";
import { db } from "@/lib/db";
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

export async function POST(request: Request, context: RouteContext) {
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
    const { id: roomId } = await context.params;
    const payload = (await request.json()) as MappingPayload;

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
      exportUrl: payload.exportUrl?.trim() ?? "",
      importUrl: payload.importUrl?.trim() ?? "",
      syncEnabled: Boolean(payload.syncEnabled),
      lastSyncedAt: null
    };

    if (mapping.syncEnabled && (!mapping.externalRoomId || !mapping.externalRoomName)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Za aktivan sync unesi Booking.com room ID i naziv sobe."
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
