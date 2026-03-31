import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/auth";
import { db, ensureDatabaseSchema } from "@/lib/db";
import { createRoomIdentity } from "@/lib/rooms";
import { DEFAULT_ROOM_LOCATION } from "@/lib/site-config";
import { Room } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type RoomPayload = {
  amenities?: string[];
  beds?: string;
  capacity?: number;
  image?: string;
  neighborhood?: string;
  pricePerNight?: number;
  roomNumber?: string;
  shortDescription?: string;
  status?: Room["status"];
};

type ExistingRoomRow = {
  beds: string;
  capacity: number;
  id: string;
  image: string;
  name: string;
  neighborhood: string;
  price_per_night: number;
  short_description: string;
  slug: string;
  status: Room["status"];
};

function getFallbackAmenities() {
  return ["Wi-Fi", "Kupatilo"];
}

async function createUniqueSlug(baseSlug: string, roomIdToExclude: string) {
  if (!db) {
    return baseSlug;
  }

  const matchingRooms = await db<{ slug: string }[]>`
    select slug
    from rooms
    where (
      slug = ${baseSlug}
      or slug like ${`${baseSlug}-%`}
    )
      and id <> ${roomIdToExclude}
  `;

  if (matchingRooms.length === 0) {
    return baseSlug;
  }

  return `${baseSlug}-${matchingRooms.length + 1}`;
}

async function getExistingRoom(roomId: string) {
  if (!db) {
    return null;
  }

  const roomRows = await db<ExistingRoomRow[]>`
    select id, slug, name, neighborhood, price_per_night, capacity, beds, status, image, short_description
    from rooms
    where id = ${roomId}
    limit 1
  `;

  return roomRows[0] ?? null;
}

async function getAmenities(roomId: string) {
  if (!db) {
    return [];
  }

  const amenityRows = await db<{ label: string }[]>`
    select label
    from room_amenities
    where room_id = ${roomId}
    order by id asc
  `;

  return amenityRows.map((amenity) => amenity.label);
}

export async function PATCH(request: Request, context: RouteContext) {
  const roleCheck = await requireApiRole(request as never, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        message: "Baza nije povezana. Izmena sobe radi samo sa pravom bazom."
      },
      { status: 500 }
    );
  }

  try {
    await ensureDatabaseSchema();

    const { id: roomId } = await context.params;
    const payload = (await request.json()) as RoomPayload;
    const existingRoom = await getExistingRoom(roomId);

    if (!existingRoom) {
      return NextResponse.json(
        {
          ok: false,
          message: "Soba nije pronadjena."
        },
        { status: 404 }
      );
    }

    if (
      !payload.roomNumber ||
      !payload.beds ||
      !payload.shortDescription ||
      !payload.pricePerNight ||
      !payload.capacity
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite broj sobe, cenu, kapacitet, krevete i opis sobe."
        },
        { status: 400 }
      );
    }

    const roomIdentity = createRoomIdentity(payload.roomNumber);
    const slug = await createUniqueSlug(roomIdentity.slug, roomId);
    const amenities =
      payload.amenities?.filter((amenity) => amenity.trim().length > 0) ??
      (await getAmenities(roomId)) ??
      getFallbackAmenities();

    const room: Room = {
      id: roomId,
      slug,
      name: roomIdentity.name,
      neighborhood: payload.neighborhood?.trim() || existingRoom.neighborhood || DEFAULT_ROOM_LOCATION,
      pricePerNight: Number(payload.pricePerNight),
      capacity: Number(payload.capacity),
      beds: payload.beds.trim(),
      shortDescription: payload.shortDescription.trim(),
      status: payload.status ?? existingRoom.status,
      image: payload.image?.trim() || existingRoom.image,
      amenities: amenities.length > 0 ? amenities : getFallbackAmenities()
    };

    await db`
      update rooms
      set
        slug = ${room.slug},
        name = ${room.name},
        neighborhood = ${room.neighborhood},
        price_per_night = ${room.pricePerNight},
        capacity = ${room.capacity},
        beds = ${room.beds},
        status = ${room.status},
        image = ${room.image},
        short_description = ${room.shortDescription}
      where id = ${room.id}
    `;

    await db`
      delete from room_amenities
      where room_id = ${room.id}
    `;

    for (const amenity of room.amenities) {
      await db`
        insert into room_amenities (room_id, label)
        values (${room.id}, ${amenity})
      `;
    }

    return NextResponse.json({
      ok: true,
      room,
      message: "Soba je uspesno izmenjena."
    });
  } catch (error) {
    console.error("Room update failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Nismo uspeli da sacuvamo izmene sobe."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const roleCheck = await requireApiRole(request as never, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        message: "Baza nije povezana. Brisanje sobe radi samo sa pravom bazom."
      },
      { status: 500 }
    );
  }

  try {
    await ensureDatabaseSchema();

    const { id: roomId } = await context.params;
    const existingRoom = await getExistingRoom(roomId);

    if (!existingRoom) {
      return NextResponse.json(
        {
          ok: false,
          message: "Soba nije pronadjena."
        },
        { status: 404 }
      );
    }

    const [reservationRows, roomBlockRows, taskRows] = await Promise.all([
      db<{ count: string }[]>`
        select count(*)::text as count
        from reservations
        where room_id = ${roomId}
      `,
      db<{ count: string }[]>`
        select count(*)::text as count
        from room_blocks
        where room_id = ${roomId}
      `,
      db<{ count: string }[]>`
        select count(*)::text as count
        from cleaning_tasks
        where room_id = ${roomId}
      `
    ]);

    const reservationCount = Number(reservationRows[0]?.count ?? 0);
    const roomBlockCount = Number(roomBlockRows[0]?.count ?? 0);
    const taskCount = Number(taskRows[0]?.count ?? 0);

    if (reservationCount > 0 || roomBlockCount > 0 || taskCount > 0) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Soba ne moze da se obrise dok ima rezervacije, blokade ili operativne taskove. Prvo ocisti te stavke pa pokusaj ponovo."
        },
        { status: 400 }
      );
    }

    await db`
      delete from rooms
      where id = ${roomId}
    `;

    return NextResponse.json({
      ok: true,
      message: `${existingRoom.name} je obrisana iz inventara.`
    });
  } catch (error) {
    console.error("Room delete failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Nismo uspeli da obrisemo sobu."
      },
      { status: 500 }
    );
  }
}
