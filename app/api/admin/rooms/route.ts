import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/auth";
import { db, ensureDatabaseSchema } from "@/lib/db";
import { createRoomIdentity } from "@/lib/rooms";
import { Room } from "@/lib/types";

type CreateRoomPayload = {
  amenities?: string[];
  beds?: string;
  capacity?: number;
  image?: string;
  name?: string;
  neighborhood?: string;
  pricePerNight?: number;
  roomNumber?: string;
  shortDescription?: string;
};

function createRoomId() {
  return `room-${Date.now()}`;
}

async function createUniqueSlug(baseSlug: string) {
  if (!db) {
    return baseSlug;
  }

  const matchingRooms = await db<{ slug: string }[]>`
    select slug
    from rooms
    where slug = ${baseSlug}
       or slug like ${`${baseSlug}-%`}
  `;

  if (matchingRooms.length === 0) {
    return baseSlug;
  }

  return `${baseSlug}-${matchingRooms.length + 1}`;
}

export async function POST(request: Request) {
  const roleCheck = await requireApiRole(request as never, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        message: "Baza nije povezana. Admin cuvanje soba radi samo sa pravom bazom."
      },
      { status: 500 }
    );
  }

  try {
    await ensureDatabaseSchema();

    const payload = (await request.json()) as CreateRoomPayload;

    if (
      !payload.roomNumber ||
      !payload.neighborhood ||
      !payload.beds ||
      !payload.shortDescription ||
      !payload.pricePerNight ||
      !payload.capacity
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite broj sobe, lokaciju, cenu, kapacitet, krevete i opis sobe."
        },
        { status: 400 }
      );
    }

    const roomId = createRoomId();
    const roomIdentity = createRoomIdentity(payload.roomNumber);
    const slug = await createUniqueSlug(roomIdentity.slug);
    const room: Room = {
      id: roomId,
      slug,
      name: roomIdentity.name,
      neighborhood: payload.neighborhood.trim(),
      pricePerNight: Number(payload.pricePerNight),
      capacity: Number(payload.capacity),
      beds: payload.beds.trim(),
      shortDescription: payload.shortDescription.trim(),
      status: "available",
      image: payload.image?.trim() || "/images/isar-studio.jpg",
      amenities:
        payload.amenities?.filter((amenity) => amenity.trim().length > 0) ?? ["Wi-Fi", "Kupatilo"]
    };

    await db`
      insert into rooms (
        id,
        slug,
        name,
        neighborhood,
        price_per_night,
        capacity,
        beds,
        status,
        image,
        short_description
      ) values (
        ${room.id},
        ${room.slug},
        ${room.name},
        ${room.neighborhood},
        ${room.pricePerNight},
        ${room.capacity},
        ${room.beds},
        ${room.status},
        ${room.image},
        ${room.shortDescription}
      )
    `;

    for (const amenity of room.amenities) {
      await db`
        insert into room_amenities (room_id, label)
        values (${room.id}, ${amenity})
      `;
    }

    return NextResponse.json({
      ok: true,
      room
    });
  } catch (error) {
    console.error("Room create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Nismo uspeli da sacuvamo sobu."
      },
      { status: 500 }
    );
  }
}
