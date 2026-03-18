import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getRoomsData } from "@/lib/admin-data";

function createInquiryId() {
  return `inq-${Date.now()}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      checkIn?: string;
      checkOut?: string;
      guestName?: string;
      guests?: string;
      message?: string;
      phone?: string;
      roomSlug?: string;
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

    if (db) {
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
          ${createInquiryId()},
          ${payload.guestName},
          ${payload.phone},
          ${selectedRoom.name},
          ${payload.checkIn},
          ${payload.checkOut},
          ${Number(payload.guests || 1)},
          ${payload.message?.trim() || "Direktan upit sa sajta."},
          ${"new"}
        )
      `;
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
