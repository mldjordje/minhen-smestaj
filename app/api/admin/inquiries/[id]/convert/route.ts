import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { hasBlockConflict, hasReservationConflict, normalizeDateValue, roomExists } from "@/lib/calendar-admin";
import { db, ensureDatabaseSchema } from "@/lib/db";

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

function createReservationId() {
  return `dir-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
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
        message: "Baza nije povezana."
      },
      { status: 500 }
    );
  }

  try {
    await ensureDatabaseSchema();

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

    if (!(await roomExists(payload.roomId))) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrana soba nije pronadjena."
        },
        { status: 404 }
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

    if (await hasReservationConflict(payload.roomId, checkIn, checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrana soba je vec zauzeta u tom terminu."
        },
        { status: 409 }
      );
    }

    if (await hasBlockConflict(payload.roomId, checkIn, checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrana soba je blokirana u tom terminu."
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

    await writeActivityLog({
      action: "converted",
      actor: roleCheck.user.email || roleCheck.user.role,
      entityId: id,
      entityType: "inquiry",
      message: "Upit je pretvoren u direktnu rezervaciju.",
      metadata: {
        reservationId,
        roomId: payload.roomId
      }
    });

    await writeActivityLog({
      action: "created",
      actor: roleCheck.user.email || roleCheck.user.role,
      entityId: reservationId,
      entityType: "reservation",
      message: `Direktna rezervacija za ${inquiry.guest_name} je kreirana iz upita.`,
      metadata: {
        checkIn,
        checkOut,
        guests: inquiry.guests,
        roomId: payload.roomId
      }
    });

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
