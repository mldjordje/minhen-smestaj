import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { hasBlockConflict, hasReservationConflict, isValidDateRange, roomExists } from "@/lib/calendar-admin";
import { db, ensureDatabaseSchema } from "@/lib/db";
import { Booking } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type ReservationPayload = {
  actor?: string;
  checkIn?: string;
  checkOut?: string;
  guestName?: string;
  guests?: number;
  roomId?: string;
  status?: Booking["status"];
};

type ReservationRow = {
  check_in: Date | string;
  check_out: Date | string;
  guest_name: string;
  guests: number;
  id: string;
  room_id: string;
  source: Booking["source"];
  status: Booking["status"];
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
    const payload = (await request.json()) as ReservationPayload;

    if (
      !payload.roomId ||
      !payload.guestName?.trim() ||
      !payload.status ||
      !isValidDateRange(payload.checkIn, payload.checkOut)
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite sobu, gosta, status i ispravan raspon datuma."
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

    const reservationRows = await db<ReservationRow[]>`
      select id, guest_name, room_id, source, check_in, check_out, status, guests
      from reservations
      where id = ${id}
      limit 1
    `;

    const reservation = reservationRows[0];

    if (!reservation) {
      return NextResponse.json(
        {
          ok: false,
          message: "Rezervacija nije pronadjena."
        },
        { status: 404 }
      );
    }

    const checkIn = payload.checkIn!;
    const checkOut = payload.checkOut!;

    if (await hasReservationConflict(payload.roomId, checkIn, checkOut, { excludeId: id })) {
      return NextResponse.json(
        {
          ok: false,
          message: "Termin se preklapa sa drugom rezervacijom."
        },
        { status: 409 }
      );
    }

    if (await hasBlockConflict(payload.roomId, checkIn, checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Termin se preklapa sa aktivnom blokadom."
        },
        { status: 409 }
      );
    }

    await db`
      update reservations
      set guest_name = ${payload.guestName.trim()},
          room_id = ${payload.roomId},
          check_in = ${checkIn},
          check_out = ${checkOut},
          status = ${payload.status},
          guests = ${Number(payload.guests || 1)}
      where id = ${id}
    `;

    const updatedReservation: Booking = {
      id,
      guestName: payload.guestName.trim(),
      roomId: payload.roomId,
      source: reservation.source,
      checkIn,
      checkOut,
      status: payload.status,
      guests: Number(payload.guests || 1)
    };

    await writeActivityLog({
      action: "updated",
      actor: payload.actor?.trim() || roleCheck.user.email || roleCheck.user.role,
      entityId: id,
      entityType: "reservation",
      message: `Rezervacija za ${updatedReservation.guestName} je izmenjena.`,
      metadata: {
        previousRoomId: reservation.room_id,
        roomId: updatedReservation.roomId,
        checkIn: updatedReservation.checkIn,
        checkOut: updatedReservation.checkOut,
        status: updatedReservation.status
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Rezervacija je uspesno izmenjena.",
      reservation: updatedReservation
    });
  } catch (error) {
    console.error("Reservation update failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Izmena rezervacije nije uspela."
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

    const deletedRows = await db<ReservationRow[]>`
      delete from reservations
      where id = ${id}
      returning id, guest_name, room_id, source, check_in, check_out, status, guests
    `;

    const deletedReservation = deletedRows[0];

    if (!deletedReservation) {
      return NextResponse.json(
        {
          ok: false,
          message: "Rezervacija nije pronadjena."
        },
        { status: 404 }
      );
    }

    await writeActivityLog({
      action: "deleted",
      actor,
      entityId: id,
      entityType: "reservation",
      message: `Rezervacija za ${deletedReservation.guest_name} je obrisana.`,
      metadata: {
        roomId: deletedReservation.room_id,
        checkIn: String(deletedReservation.check_in),
        checkOut: String(deletedReservation.check_out)
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Rezervacija je obrisana."
    });
  } catch (error) {
    console.error("Reservation delete failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Brisanje rezervacije nije uspelo."
      },
      { status: 500 }
    );
  }
}
