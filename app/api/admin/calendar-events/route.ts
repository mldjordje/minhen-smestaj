import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Booking, RoomBlock } from "@/lib/types";

type CalendarEventPayload = {
  checkIn?: string;
  checkOut?: string;
  createdBy?: string;
  guestName?: string;
  guests?: number;
  notes?: string;
  roomId?: string;
  type?: "reservation" | "block";
};

function createReservationId() {
  return `man-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function createRoomBlockId() {
  return `blk-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function isValidDateRange(checkIn?: string, checkOut?: string) {
  return Boolean(checkIn && checkOut && checkIn < checkOut);
}

async function roomExists(roomId: string) {
  const sql = db!;
  const roomRows = await sql<{ id: string }[]>`
    select id
    from rooms
    where id = ${roomId}
    limit 1
  `;

  return roomRows.length > 0;
}

async function hasReservationConflict(roomId: string, checkIn: string, checkOut: string) {
  const sql = db!;
  const matchingReservations = await sql<{ id: string }[]>`
    select id
    from reservations
    where room_id = ${roomId}
      and daterange(check_in, check_out, '[)') && daterange(${checkIn}::date, ${checkOut}::date, '[)')
    limit 1
  `;

  return matchingReservations.length > 0;
}

async function hasBlockConflict(roomId: string, checkIn: string, checkOut: string) {
  const sql = db!;
  const matchingBlocks = await sql<{ id: string }[]>`
    select id
    from room_blocks
    where room_id = ${roomId}
      and daterange(check_in, check_out, '[)') && daterange(${checkIn}::date, ${checkOut}::date, '[)')
    limit 1
  `;

  return matchingBlocks.length > 0;
}

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        message: "Baza nije povezana. Kalendar moze da cuva samo realne DB unose."
      },
      { status: 500 }
    );
  }

  try {
    const payload = (await request.json()) as CalendarEventPayload;

    if (!payload.type || !payload.roomId || !isValidDateRange(payload.checkIn, payload.checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izaberi sobu, tip unosa i ispravan raspon datuma."
        },
        { status: 400 }
      );
    }

    if (!(await roomExists(payload.roomId))) {
      return NextResponse.json(
        {
          ok: false,
          message: "Soba nije pronadjena."
        },
        { status: 404 }
      );
    }

    if (payload.type === "reservation" && !payload.guestName?.trim()) {
      return NextResponse.json(
        {
          ok: false,
          message: "Za rucnu rezervaciju unesi ime gosta."
        },
        { status: 400 }
      );
    }

    const checkIn = payload.checkIn!;
    const checkOut = payload.checkOut!;

    if (await hasReservationConflict(payload.roomId, checkIn, checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Termin se preklapa sa postojecom rezervacijom."
        },
        { status: 409 }
      );
    }

    if (await hasBlockConflict(payload.roomId, checkIn, checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Termin se preklapa sa postojecim blokiranim periodom."
        },
        { status: 409 }
      );
    }

    if (payload.type === "reservation") {
      const reservation: Booking = {
        id: createReservationId(),
        guestName: payload.guestName!.trim(),
        roomId: payload.roomId,
        source: "Direktno",
        checkIn,
        checkOut,
        status: "confirmed",
        guests: Number(payload.guests || 1)
      };

      await db`
        insert into reservations (
          id,
          guest_name,
          room_id,
          source,
          check_in,
          check_out,
          status,
          guests
        ) values (
          ${reservation.id},
          ${reservation.guestName},
          ${reservation.roomId},
          ${reservation.source},
          ${reservation.checkIn},
          ${reservation.checkOut},
          ${reservation.status},
          ${reservation.guests}
        )
      `;

      return NextResponse.json({
        ok: true,
        type: "reservation",
        message: "Rucna rezervacija je uspesno dodata u kalendar.",
        reservation
      });
    }

    const roomBlock: RoomBlock = {
      id: createRoomBlockId(),
      roomId: payload.roomId,
      checkIn,
      checkOut,
      reason: payload.notes?.trim() || "Rucno blokiran termin",
      createdBy: payload.createdBy?.trim() || "admin",
      status: "blocked"
    };

    await db`
      insert into room_blocks (
        id,
        room_id,
        check_in,
        check_out,
        reason,
        created_by,
        status
      ) values (
        ${roomBlock.id},
        ${roomBlock.roomId},
        ${roomBlock.checkIn},
        ${roomBlock.checkOut},
        ${roomBlock.reason},
        ${roomBlock.createdBy},
        ${roomBlock.status}
      )
    `;

    return NextResponse.json({
      ok: true,
      type: "block",
      message: "Termin je uspesno blokiran.",
      roomBlock
    });
  } catch (error) {
    console.error("Calendar event create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Nismo uspeli da sacuvamo unos u kalendar."
      },
      { status: 500 }
    );
  }
}
