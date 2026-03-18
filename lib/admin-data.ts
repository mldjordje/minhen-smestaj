import { db } from "@/lib/db";
import {
  bookingSyncSummary,
  bookings as demoBookings,
  cleaningTasks as demoCleaningTasks,
  inquiries as demoInquiries,
  roomChannelMappings as demoRoomChannelMappings,
  rooms as demoRooms,
  teamMembers as demoTeamMembers
} from "@/lib/data";
import { Booking, CleaningTask, Inquiry, Room, RoomChannelMapping, TeamMember } from "@/lib/types";

type RoomRow = {
  capacity: number;
  created_at: string;
  id: string;
  image: string;
  name: string;
  neighborhood: string;
  price_per_night: number;
  short_description: string;
  slug: string;
  status: Room["status"];
  beds: string;
};

function normalizeDateValue(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

function normalizeDateTimeValue(value: Date | string | null) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

type AmenityRow = {
  label: string;
  room_id: string;
};

type ReservationRow = {
  check_in: Date | string;
  check_out: Date | string;
  created_at: string;
  guest_name: string;
  guests: number;
  id: string;
  room_id: string;
  source: Booking["source"];
  status: Booking["status"];
};

type InquiryRow = {
  check_in: Date | string;
  check_out: Date | string;
  created_at: string;
  guest_name: string;
  guests: number;
  id: string;
  message: string;
  phone: string;
  requested_room_type: string;
  status: Inquiry["status"];
};

type CleaningTaskRow = {
  assignee: string;
  created_at: string;
  due_at: string;
  id: string;
  notes: string;
  room_id: string;
  status: CleaningTask["status"];
};

type TeamMemberRow = {
  created_at: string;
  id: string;
  name: string;
  role: TeamMember["role"];
  shift: string;
};

type RoomChannelMappingRow = {
  created_at: string;
  export_url: string;
  external_room_id: string;
  external_room_name: string;
  id: string;
  import_url: string;
  last_synced_at: Date | string | null;
  provider: RoomChannelMapping["provider"];
  room_id: string;
  sync_enabled: boolean;
  updated_at: string;
};

export async function getRoomsData() {
  if (!db) {
    return demoRooms;
  }

  const roomRows = await db<RoomRow[]>`
    select id, slug, name, neighborhood, price_per_night, capacity, beds, status, image, short_description, created_at
    from rooms
    order by created_at desc
  `;

  if (roomRows.length === 0) {
    return demoRooms;
  }

  const amenityRows = await db<AmenityRow[]>`
    select room_id, label
    from room_amenities
    order by id asc
  `;

  return roomRows.map((room) => ({
    id: room.id,
    slug: room.slug,
    name: room.name,
    neighborhood: room.neighborhood,
    pricePerNight: room.price_per_night,
    capacity: room.capacity,
    beds: room.beds,
    status: room.status,
    image: room.image,
    shortDescription: room.short_description,
    amenities: amenityRows
      .filter((amenity) => amenity.room_id === room.id)
      .map((amenity) => amenity.label)
  }));
}

export async function getRoomBySlug(slug: string) {
  const rooms = await getRoomsData();

  return rooms.find((room) => room.slug === slug) ?? null;
}

export async function getBookingsData() {
  if (!db) {
    return demoBookings;
  }

  const reservationRows = await db<ReservationRow[]>`
    select id, guest_name, room_id, source, check_in, check_out, status, guests, created_at
    from reservations
    order by check_in asc
  `;

  if (reservationRows.length === 0) {
    return demoBookings;
  }

  return reservationRows.map((reservation) => ({
    id: reservation.id,
    guestName: reservation.guest_name,
    roomId: reservation.room_id,
    source: reservation.source,
    checkIn: normalizeDateValue(reservation.check_in),
    checkOut: normalizeDateValue(reservation.check_out),
    status: reservation.status,
    guests: reservation.guests
  }));
}

export async function getInquiriesData() {
  if (!db) {
    return demoInquiries;
  }

  const inquiryRows = await db<InquiryRow[]>`
    select id, guest_name, phone, requested_room_type, check_in, check_out, guests, message, status, created_at
    from inquiries
    order by created_at desc
  `;

  if (inquiryRows.length === 0) {
    return demoInquiries;
  }

  return inquiryRows.map((inquiry) => ({
    id: inquiry.id,
    guestName: inquiry.guest_name,
    phone: inquiry.phone,
    requestedRoomType: inquiry.requested_room_type,
    checkIn: normalizeDateValue(inquiry.check_in),
    checkOut: normalizeDateValue(inquiry.check_out),
    guests: inquiry.guests,
    message: inquiry.message,
    status: inquiry.status
  }));
}

export async function getCleaningTasksData() {
  if (!db) {
    return demoCleaningTasks;
  }

  const taskRows = await db<CleaningTaskRow[]>`
    select id, room_id, assignee, due_at, status, notes, created_at
    from cleaning_tasks
    order by created_at asc
  `;

  if (taskRows.length === 0) {
    return demoCleaningTasks;
  }

  return taskRows.map((task) => ({
    id: task.id,
    roomId: task.room_id,
    assignee: task.assignee,
    dueAt: task.due_at,
    status: task.status,
    notes: task.notes
  }));
}

export async function getTeamMembersData() {
  if (!db) {
    return demoTeamMembers;
  }

  const memberRows = await db<TeamMemberRow[]>`
    select id, name, role, shift, created_at
    from team_members
    order by created_at asc
  `;

  if (memberRows.length === 0) {
    return demoTeamMembers;
  }

  return memberRows.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    shift: member.shift
  }));
}

export async function getRoomChannelMappingsData() {
  if (!db) {
    return demoRoomChannelMappings;
  }

  try {
    const mappingRows = await db<RoomChannelMappingRow[]>`
      select
        id,
        room_id,
        provider,
        external_room_id,
        external_room_name,
        export_url,
        import_url,
        sync_enabled,
        last_synced_at,
        created_at,
        updated_at
      from room_channel_mappings
      order by created_at asc
    `;

    if (mappingRows.length === 0) {
      return demoRoomChannelMappings;
    }

    return mappingRows.map((mapping) => ({
      id: mapping.id,
      roomId: mapping.room_id,
      provider: mapping.provider,
      externalRoomId: mapping.external_room_id,
      externalRoomName: mapping.external_room_name,
      exportUrl: mapping.export_url,
      importUrl: mapping.import_url,
      syncEnabled: mapping.sync_enabled,
      lastSyncedAt: normalizeDateTimeValue(mapping.last_synced_at)
    }));
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !("code" in error) ||
      !["42P01", "26000"].includes(String(error.code))
    ) {
      console.error("Room channel mappings query failed", error);
    }

    return demoRoomChannelMappings;
  }
}

export function getBookingSyncSummary() {
  return bookingSyncSummary;
}
