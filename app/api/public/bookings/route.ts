import { NextRequest, NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { hasBlockConflict, hasReservationConflict, isValidDateRange } from "@/lib/calendar-admin";
import { db, ensureDatabaseSchema } from "@/lib/db";
import { sendBookingEmails } from "@/lib/email";
import { getRoomBySlug } from "@/lib/admin-data";
import { getRoomDisplayName } from "@/lib/rooms";
import type { Booking } from "@/lib/types";

type CreatePublicBookingPayload = {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  notes?: string;
  phone?: string;
  roomSlug?: string;
};

function createBookingId() {
  return `web-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function POST(request: NextRequest) {
  const session = await requireApiRole(request);

  if (session instanceof NextResponse) {
    return session;
  }

  if (!db) {
    return NextResponse.json(
      { ok: false, message: "Baza nije povezana." },
      { status: 500 }
    );
  }

  await ensureDatabaseSchema();

  try {
    const payload = (await request.json()) as CreatePublicBookingPayload;

    if (
      !payload.roomSlug ||
      !payload.phone?.trim() ||
      !payload.guests ||
      !isValidDateRange(payload.checkIn, payload.checkOut)
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite sobu, telefon, broj gostiju i ispravan raspon datuma."
        },
        { status: 400 }
      );
    }

    const room = await getRoomBySlug(payload.roomSlug);

    if (!room) {
      return NextResponse.json(
        { ok: false, message: "Soba nije pronadjena." },
        { status: 404 }
      );
    }

    const checkIn = payload.checkIn!;
    const checkOut = payload.checkOut!;

    if (await hasReservationConflict(room.id, checkIn, checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrani termin vise nije slobodan. Pokusajte drugi termin ili drugu sobu."
        },
        { status: 409 }
      );
    }

    if (await hasBlockConflict(room.id, checkIn, checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrani termin je trenutno blokiran. Pokusajte drugi termin."
        },
        { status: 409 }
      );
    }

    const booking: Booking = {
      id: createBookingId(),
      guestName: session.user.name || session.user.email || "Gost",
      roomId: room.id,
      source: "Direktno",
      checkIn,
      checkOut,
      status: "confirmed",
      guests: Number(payload.guests),
      guestUserId: session.user.id,
      contactEmail: session.user.email,
      contactPhone: payload.phone.trim(),
      notes: payload.notes?.trim() || null,
      updatedAt: new Date().toISOString()
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
        guests,
        guest_user_id,
        contact_email,
        contact_phone,
        notes,
        updated_at
      ) values (
        ${booking.id},
        ${booking.guestName},
        ${booking.roomId},
        ${booking.source},
        ${booking.checkIn},
        ${booking.checkOut},
        ${booking.status},
        ${booking.guests},
        ${booking.guestUserId ?? null},
        ${booking.contactEmail ?? null},
        ${booking.contactPhone ?? null},
        ${booking.notes ?? null},
        now()
      )
    `;

    await writeActivityLog({
      action: "created",
      actor: session.user.email || session.user.id,
      entityId: booking.id,
      entityType: "reservation",
      message: `Direktna rezervacija za ${getRoomDisplayName(room)} je potvrdjena sa sajta.`,
      metadata: {
        roomId: booking.roomId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests
      }
    });

    if (session.user.email) {
      await sendBookingEmails({
        bookingReference: booking.id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guestEmail: session.user.email,
        guestName: booking.guestName,
        guests: booking.guests,
        roomName: getRoomDisplayName(room)
      });
    }

    return NextResponse.json({
      ok: true,
      booking,
      message: "Rezervacija je uspesno potvrdjena."
    });
  } catch (error) {
    console.error("Public booking create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Nismo uspeli da kreiramo rezervaciju."
      },
      { status: 500 }
    );
  }
}
