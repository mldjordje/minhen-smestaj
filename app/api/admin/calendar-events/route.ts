import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { hasBlockConflict, hasReservationConflict, isValidDateRange, roomExists } from "@/lib/calendar-admin";
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
  status?: RoomBlock["status"];
  type?: "reservation" | "block";
};

function createReservationId() {
  return `man-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function createRoomBlockId() {
  return `blk-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
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

      await writeActivityLog({
        action: "created",
        actor: payload.createdBy?.trim() || "admin",
        entityId: reservation.id,
        entityType: "reservation",
        message: `Rucna rezervacija za ${reservation.guestName} je dodata u kalendar.`,
        metadata: {
          checkIn: reservation.checkIn,
          checkOut: reservation.checkOut,
          guests: reservation.guests,
          roomId: reservation.roomId
        }
      });

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
      status: payload.status === "maintenance" ? "maintenance" : "blocked"
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

    await writeActivityLog({
      action: "created",
      actor: roomBlock.createdBy,
      entityId: roomBlock.id,
      entityType: "room_block",
      message: `Blokada termina je dodata za sobu ${roomBlock.roomId}.`,
      metadata: {
        checkIn: roomBlock.checkIn,
        checkOut: roomBlock.checkOut,
        reason: roomBlock.reason,
        roomId: roomBlock.roomId
      }
    });

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
