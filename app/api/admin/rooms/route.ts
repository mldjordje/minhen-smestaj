import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Room } from "@/lib/types";

type CreateRoomPayload = {
  amenities?: string[];
  beds?: string;
  capacity?: number;
  image?: string;
  name?: string;
  neighborhood?: string;
  pricePerNight?: number;
  shortDescription?: string;
};

function slugifyRoomName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-{2,}/g, "-");
}

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
  try {
    const payload = (await request.json()) as CreateRoomPayload;

    if (
      !payload.name ||
      !payload.neighborhood ||
      !payload.beds ||
      !payload.shortDescription ||
      !payload.pricePerNight ||
      !payload.capacity
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite naziv, lokaciju, cenu, kapacitet, krevete i opis sobe."
        },
        { status: 400 }
      );
    }

    const roomId = createRoomId();
    const slug = await createUniqueSlug(slugifyRoomName(payload.name));
    const room: Room = {
      id: roomId,
      slug,
      name: payload.name.trim(),
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

    if (db) {
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
