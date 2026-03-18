import postgres from "postgres";

const rooms = [
  {
    id: "rm-101",
    slug: "soba-1",
    name: "Soba 1",
    neighborhood: "Eichenried",
    pricePerNight: 69,
    capacity: 1,
    beds: "1 single bed",
    status: "available",
    image: "/images/legacy/cache_2481988833.jpg",
    shortDescription: "Kompaktna soba za jednog gosta, prakticna za posao ili kraci boravak.",
    amenities: ["Wi-Fi", "Radni sto", "Kupatilo", "Mirna zona"]
  },
  {
    id: "rm-204",
    slug: "soba-2",
    name: "Soba 2",
    neighborhood: "Eichenried",
    pricePerNight: 99,
    capacity: 2,
    beds: "1 double bed",
    status: "occupied",
    image: "/images/legacy/cache_2481988840.jpg",
    shortDescription: "Komforna soba za dve osobe sa privatnim kupatilom za duzi boravak.",
    amenities: ["Wi-Fi", "Kupatilo", "TV", "Ormar"]
  },
  {
    id: "rm-305",
    slug: "soba-3",
    name: "Soba 3",
    neighborhood: "Eichenried",
    pricePerNight: 129,
    capacity: 4,
    beds: "1 double + bunk bed",
    status: "cleaning",
    image: "/images/legacy/cache_2481988838.jpg",
    shortDescription: "Veca soba pogodna za porodice, radnike i manje grupe.",
    amenities: ["Wi-Fi", "Kupatilo", "Vise kreveta", "Parking"]
  },
  {
    id: "rm-406",
    slug: "soba-4",
    name: "Soba 4",
    neighborhood: "Eichenried",
    pricePerNight: 89,
    capacity: 2,
    beds: "2 single bed",
    status: "available",
    image: "/images/client-gallery/gallery-07.webp",
    shortDescription: "Test soba za proveru novog booking flow-a i javnog kalendara dostupnosti.",
    amenities: ["Wi-Fi", "Kupatilo", "Ormar", "Parking"]
  }
];

const reservations = [
  {
    id: "bk-781",
    guestName: "Marko Ilic",
    roomId: "rm-204",
    source: "Booking.com",
    checkIn: "2026-03-14",
    checkOut: "2026-03-18",
    status: "checked-in",
    guests: 2
  },
  {
    id: "bk-782",
    guestName: "Jelena Nikolic",
    roomId: "rm-305",
    source: "Booking.com",
    checkIn: "2026-03-14",
    checkOut: "2026-03-16",
    status: "arriving",
    guests: 3
  },
  {
    id: "bk-783",
    guestName: "Stefan Jovanov",
    roomId: "rm-101",
    source: "Direktno",
    checkIn: "2026-03-15",
    checkOut: "2026-03-20",
    status: "confirmed",
    guests: 1
  },
  {
    id: "bk-784",
    guestName: "Test Gost",
    roomId: "rm-406",
    source: "Direktno",
    checkIn: "2026-03-21",
    checkOut: "2026-03-24",
    status: "confirmed",
    guests: 2
  }
];

const roomBlocks = [
  {
    id: "blk-101",
    roomId: "rm-305",
    checkIn: "2026-03-22",
    checkOut: "2026-03-24",
    reason: "Generalno sredjivanje sobe",
    createdBy: "owner",
    status: "blocked"
  },
  {
    id: "blk-102",
    roomId: "rm-406",
    checkIn: "2026-03-27",
    checkOut: "2026-03-29",
    reason: "Test blokada za proveru javnog kalendara",
    createdBy: "owner",
    status: "blocked"
  }
];

const inquiries = [
  {
    id: "inq-101",
    guestName: "Milos Petrovic",
    phone: "+381 63 111 222",
    requestedRoomType: "Soba 2",
    checkIn: "2026-03-18",
    checkOut: "2026-03-25",
    guests: 2,
    message: "Treba nam mirnija soba i parking za kombi.",
    status: "new"
  },
  {
    id: "inq-102",
    guestName: "Nikola Markovic",
    phone: "+387 61 555 444",
    requestedRoomType: "Soba 1",
    checkIn: "2026-03-20",
    checkOut: "2026-03-28",
    guests: 1,
    message: "Dolazim zbog posla i potreban mi je duzi boravak.",
    status: "contacted"
  }
];

const cleaningTasks = [
  {
    id: "task-11",
    roomId: "rm-305",
    assignee: "Ana",
    dueAt: "10:30",
    status: "in-progress",
    notes: "Promena posteljine i dopuna higijenskog seta."
  },
  {
    id: "task-12",
    roomId: "rm-204",
    assignee: "Ivana",
    dueAt: "13:00",
    status: "todo",
    notes: "Dubinsko ciscenje kupatila posle check-out-a."
  },
  {
    id: "task-13",
    roomId: "rm-101",
    assignee: "Milan",
    dueAt: "17:00",
    status: "todo",
    notes: "Priprema welcome poruke i provera smart lock pristupa."
  }
];

const teamMembers = [
  {
    id: "usr-1",
    name: "Vlasnik",
    role: "owner",
    shift: "Celodnevni pregled"
  },
  {
    id: "usr-2",
    name: "Ana",
    role: "cleaner",
    shift: "08:00 - 16:00"
  },
  {
    id: "usr-3",
    name: "Milan",
    role: "host",
    shift: "14:00 - 22:00"
  }
];

const roomChannelMappings = [
  {
    id: "map-101",
    roomId: "rm-204",
    provider: "Booking.com",
    externalRoomId: "bk-room-204",
    externalRoomName: "Doppelzimmer Comfort",
    exportUrl: "https://admin.booking.com/hotel/hoteladmin/ical.html?room=204&direction=export",
    importUrl: "https://admin.booking.com/hotel/hoteladmin/ical.html?room=204&direction=import",
    syncEnabled: true,
    lastSyncedAt: "2026-03-16T08:45:00.000Z"
  },
  {
    id: "map-102",
    roomId: "rm-101",
    provider: "Booking.com",
    externalRoomId: "",
    externalRoomName: "",
    exportUrl: "",
    importUrl: "",
    syncEnabled: false,
    lastSyncedAt: null
  }
];

async function main() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("POSTGRES_URL ili DATABASE_URL nije definisan.");
  }

  const sql = postgres(connectionString, { max: 1 });

  try {
    await sql.begin(async (transaction) => {
      await transaction`delete from room_channel_mappings`;
      await transaction`delete from room_blocks`;
      await transaction`delete from room_amenities`;
      await transaction`delete from reservations`;
      await transaction`delete from inquiries`;
      await transaction`delete from cleaning_tasks`;
      await transaction`delete from team_members`;
      await transaction`delete from rooms`;

      for (const room of rooms) {
        await transaction`
          insert into rooms (
            id, slug, name, neighborhood, price_per_night, capacity, beds, status, image, short_description
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
          await transaction`
            insert into room_amenities (room_id, label)
            values (${room.id}, ${amenity})
          `;
        }
      }

      for (const reservation of reservations) {
        await transaction`
          insert into reservations (
            id, guest_name, room_id, source, check_in, check_out, status, guests
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
      }

      for (const block of roomBlocks) {
        await transaction`
          insert into room_blocks (
            id,
            room_id,
            check_in,
            check_out,
            reason,
            created_by,
            status
          ) values (
            ${block.id},
            ${block.roomId},
            ${block.checkIn},
            ${block.checkOut},
            ${block.reason},
            ${block.createdBy},
            ${block.status}
          )
        `;
      }

      for (const inquiry of inquiries) {
        await transaction`
          insert into inquiries (
            id, guest_name, phone, requested_room_type, check_in, check_out, guests, message, status
          ) values (
            ${inquiry.id},
            ${inquiry.guestName},
            ${inquiry.phone},
            ${inquiry.requestedRoomType},
            ${inquiry.checkIn},
            ${inquiry.checkOut},
            ${inquiry.guests},
            ${inquiry.message},
            ${inquiry.status}
          )
        `;
      }

      for (const task of cleaningTasks) {
        await transaction`
          insert into cleaning_tasks (id, room_id, assignee, due_at, status, notes)
          values (
            ${task.id},
            ${task.roomId},
            ${task.assignee},
            ${task.dueAt},
            ${task.status},
            ${task.notes}
          )
        `;
      }

      for (const member of teamMembers) {
        await transaction`
          insert into team_members (id, name, role, shift)
          values (
            ${member.id},
            ${member.name},
            ${member.role},
            ${member.shift}
          )
        `;
      }

      for (const mapping of roomChannelMappings) {
        await transaction`
          insert into room_channel_mappings (
            id,
            room_id,
            provider,
            external_room_id,
            external_room_name,
            export_url,
            import_url,
            sync_enabled,
            last_synced_at
          ) values (
            ${mapping.id},
            ${mapping.roomId},
            ${mapping.provider},
            ${mapping.externalRoomId},
            ${mapping.externalRoomName},
            ${mapping.exportUrl},
            ${mapping.importUrl},
            ${mapping.syncEnabled},
            ${mapping.lastSyncedAt}
          )
        `;
      }
    });

    console.log("Neon seed completed.");
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
