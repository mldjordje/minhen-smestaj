import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { hasBlockConflict, hasReservationConflict, isValidDateRange, roomExists } from "@/lib/calendar-admin";
import { db, ensureDatabaseSchema } from "@/lib/db";
import { RoomBlock } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type RoomBlockPayload = {
  actor?: string;
  checkIn?: string;
  checkOut?: string;
  reason?: string;
  roomId?: string;
  status?: RoomBlock["status"];
};

type RoomBlockRow = {
  check_in: Date | string;
  check_out: Date | string;
  created_by: string;
  id: string;
  reason: string;
  room_id: string;
  status: RoomBlock["status"];
};

export async function PUT(request: Request, context: RouteContext) {
  const roleCheck = await requireApiRole(request as never, ["owner", "staff"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!db) {
    return NextResponse.json({ ok: false, message: "Baza nije povezana." }, { status: 500 });
  }

  try {
    await ensureDatabaseSchema();

    const { id } = await context.params;
    const payload = (await request.json()) as RoomBlockPayload;

    if (
      !payload.roomId ||
      !payload.reason?.trim() ||
      !payload.status ||
      !isValidDateRange(payload.checkIn, payload.checkOut)
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite sobu, razlog, status i ispravan raspon datuma."
        },
        { status: 400 }
      );
    }

    if (!(await roomExists(payload.roomId))) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrana soba nije pronadjena."
        },
        { status: 404 }
      );
    }

    const roomBlockRows = await db<RoomBlockRow[]>`
      select id, room_id, check_in, check_out, reason, created_by, status
      from room_blocks
      where id = ${id}
      limit 1
    `;

    const roomBlock = roomBlockRows[0];

    if (!roomBlock) {
      return NextResponse.json(
        {
          ok: false,
          message: "Blokada nije pronadjena."
        },
        { status: 404 }
      );
    }

    const checkIn = payload.checkIn!;
    const checkOut = payload.checkOut!;

    if (await hasReservationConflict(payload.roomId, checkIn, checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Termin se preklapa sa rezervacijom i ne moze biti blokiran."
        },
        { status: 409 }
      );
    }

    if (await hasBlockConflict(payload.roomId, checkIn, checkOut, { excludeId: id })) {
      return NextResponse.json(
        {
          ok: false,
          message: "Termin se preklapa sa drugom blokadom."
        },
        { status: 409 }
      );
    }

    await db`
      update room_blocks
      set room_id = ${payload.roomId},
          check_in = ${checkIn},
          check_out = ${checkOut},
          reason = ${payload.reason.trim()},
          created_by = ${payload.actor?.trim() || roleCheck.user.email || roomBlock.created_by},
          status = ${payload.status}
      where id = ${id}
    `;

    const updatedBlock: RoomBlock = {
      id,
      roomId: payload.roomId,
      checkIn,
      checkOut,
      reason: payload.reason.trim(),
      createdBy: payload.actor?.trim() || roleCheck.user.email || roomBlock.created_by,
      status: payload.status
    };

    await writeActivityLog({
      action: "updated",
      actor: updatedBlock.createdBy,
      entityId: id,
      entityType: "room_block",
      message: `Blokada termina za sobu ${updatedBlock.roomId} je izmenjena.`,
      metadata: {
        previousRoomId: roomBlock.room_id,
        roomId: updatedBlock.roomId,
        checkIn: updatedBlock.checkIn,
        checkOut: updatedBlock.checkOut,
        status: updatedBlock.status
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Blokada je uspesno izmenjena.",
      roomBlock: updatedBlock
    });
  } catch (error) {
    console.error("Room block update failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Izmena blokade nije uspela."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const roleCheck = await requireApiRole(request as never, ["owner", "staff"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!db) {
    return NextResponse.json({ ok: false, message: "Baza nije povezana." }, { status: 500 });
  }

  try {
    await ensureDatabaseSchema();

    const { id } = await context.params;
    const url = new URL(request.url);
    const actor = url.searchParams.get("actor")?.trim() || roleCheck.user.email || roleCheck.user.role;

    const deletedRows = await db<RoomBlockRow[]>`
      delete from room_blocks
      where id = ${id}
      returning id, room_id, check_in, check_out, reason, created_by, status
    `;

    const deletedBlock = deletedRows[0];

    if (!deletedBlock) {
      return NextResponse.json(
        {
          ok: false,
          message: "Blokada nije pronadjena."
        },
        { status: 404 }
      );
    }

    await writeActivityLog({
      action: "deleted",
      actor,
      entityId: id,
      entityType: "room_block",
      message: `Blokada termina za sobu ${deletedBlock.room_id} je obrisana.`,
      metadata: {
        checkIn: String(deletedBlock.check_in),
        checkOut: String(deletedBlock.check_out),
        reason: deletedBlock.reason
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Blokada je obrisana."
    });
  } catch (error) {
    console.error("Room block delete failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Brisanje blokade nije uspelo."
      },
      { status: 500 }
    );
  }
}
