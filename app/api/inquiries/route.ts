import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { isValidDateRange } from "@/lib/calendar-admin";
import { db, ensureDatabaseSchema } from "@/lib/db";
import { sendInquiryAdminEmail } from "@/lib/email";
import { getRoomsData } from "@/lib/admin-data";
import { getRoomDisplayName } from "@/lib/rooms";
import type { BookingMode } from "@/lib/types";

function createInquiryId() {
  return `inq-${Date.now()}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      bookingMode?: BookingMode;
      checkIn?: string;
      checkOut?: string;
      guestName?: string;
      guests?: string;
      message?: string;
      phone?: string;
      roomSlug?: string;
      selectionSummary?: string | null;
    };

    if (
      !payload.guestName ||
      !payload.phone ||
      !payload.checkIn ||
      !payload.checkOut ||
      !payload.roomSlug
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite ime, telefon, sobu i datume boravka."
        },
        { status: 400 }
      );
    }

    if (!isValidDateRange(payload.checkIn, payload.checkOut)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Datumi boravka nisu ispravni."
        },
        { status: 400 }
      );
    }

    const rooms = await getRoomsData();
    const selectedRoom = rooms.find((room) => room.slug === payload.roomSlug);

    if (!selectedRoom) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrana soba nije pronadjena."
        },
        { status: 404 }
      );
    }

    const inquiryId = createInquiryId();
    const bookingMode = payload.bookingMode === "monthly" ? "monthly" : "daily";
    const finalMessage = [
      payload.message?.trim(),
      bookingMode === "monthly" ? "Tip boravka: mesecni najam." : null,
      payload.selectionSummary ? `Odabrani period: ${payload.selectionSummary}` : null
    ]
      .filter(Boolean)
      .join("\n\n") || "Direktan upit sa sajta.";

    if (db) {
      await ensureDatabaseSchema();

      await db`
        insert into inquiries (
          id,
          guest_name,
          phone,
          requested_room_type,
          check_in,
          check_out,
          guests,
          message,
          status
        ) values (
          ${inquiryId},
          ${payload.guestName},
          ${payload.phone},
          ${getRoomDisplayName(selectedRoom)},
          ${payload.checkIn},
          ${payload.checkOut},
          ${Number(payload.guests || 1)},
          ${finalMessage},
          ${"new"}
        )
      `;

      await writeActivityLog({
        action: "created",
        actor: "public-site",
        entityId: inquiryId,
        entityType: "inquiry",
        message: `Stigao je novi javni upit za ${getRoomDisplayName(selectedRoom)}.`,
        metadata: {
          bookingMode,
          checkIn: payload.checkIn,
          checkOut: payload.checkOut,
          guests: Number(payload.guests || 1),
          roomSlug: payload.roomSlug,
          selectionSummary: payload.selectionSummary ?? null
        }
      });

      await sendInquiryAdminEmail({
        bookingMode,
        checkIn: payload.checkIn,
        checkOut: payload.checkOut,
        guestName: payload.guestName,
        guests: Number(payload.guests || 1),
        phone: payload.phone,
        roomName: getRoomDisplayName(selectedRoom),
        selectionSummary: payload.selectionSummary ?? null
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Upit je uspesno poslat. Javicemo vam se sto pre."
    });
  } catch (error) {
    console.error("Inquiry create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Nismo uspeli da sacuvamo upit."
      },
      { status: 500 }
    );
  }
}
