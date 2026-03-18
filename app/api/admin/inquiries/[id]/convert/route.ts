import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type InquiryRow = {
  check_in: Date | string;
  check_out: Date | string;
  guest_name: string;
  guests: number;
  id: string;
  status: "new" | "contacted" | "converted" | "closed";
};

function normalizeDateValue(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

function createReservationId() {
  return `dir-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function POST(request: Request, context: RouteContext) {
  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        message: "Baza nije povezana."
      },
      { status: 500 }
    );
  }

  try {
    const { id } = await context.params;
    const payload = (await request.json()) as {
      roomId?: string;
    };

    if (!payload.roomId) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izaberite sobu za potvrdu rezervacije."
        },
        { status: 400 }
      );
    }

    const inquiryRows = await db<InquiryRow[]>`
      select id, guest_name, check_in, check_out, guests, status
      from inquiries
      where id = ${id}
      limit 1
    `;

    const inquiry = inquiryRows[0];

    if (!inquiry) {
      return NextResponse.json(
        {
          ok: false,
          message: "Upit nije pronadjen."
        },
        { status: 404 }
      );
    }

    if (!["new", "contacted"].includes(inquiry.status)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Ovaj upit je vec obradjen."
        },
        { status: 400 }
      );
    }

    const checkIn = normalizeDateValue(inquiry.check_in);
    const checkOut = normalizeDateValue(inquiry.check_out);

    const conflictingReservations = await db<{ id: string }[]>`
      select id
      from reservations
      where room_id = ${payload.roomId}
        and daterange(check_in, check_out, '[)') && daterange(${checkIn}::date, ${checkOut}::date, '[)')
      limit 1
    `;

    if (conflictingReservations.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrana soba je vec zauzeta u tom terminu."
        },
        { status: 409 }
      );
    }

    const reservationId = createReservationId();

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
        ${reservationId},
        ${inquiry.guest_name},
        ${payload.roomId},
        ${"Direktno"},
        ${checkIn},
        ${checkOut},
        ${"confirmed"},
        ${inquiry.guests}
      )
    `;

    await db`
      update inquiries
      set status = ${"converted"}
      where id = ${id}
    `;

    return NextResponse.json({
      ok: true,
      message: "Upit je uspesno pretvoren u rezervaciju.",
      reservation: {
        id: reservationId,
        guestName: inquiry.guest_name,
        roomId: payload.roomId,
        source: "Direktno" as const,
        checkIn,
        checkOut,
        status: "confirmed" as const,
        guests: inquiry.guests
      }
    });
  } catch (error) {
    console.error("Inquiry conversion failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Pretvaranje upita u rezervaciju nije uspelo."
      },
      { status: 500 }
    );
  }
}
