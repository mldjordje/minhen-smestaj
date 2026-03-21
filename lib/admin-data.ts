import { db, ensureDatabaseSchema } from "@/lib/db";
import {
  bookings as demoBookings,
  cleaningTasks as demoCleaningTasks,
  inquiries as demoInquiries,
  roomBlocks as demoRoomBlocks,
  roomChannelMappings as demoRoomChannelMappings,
  rooms as demoRooms,
  teamMembers as demoTeamMembers
} from "@/lib/data";
import {
  ActivityLogEntry,
  AppUser,
  Booking,
  CleaningTask,
  Inquiry,
  Room,
  RoomBlock,
  RoomChannelMapping,
  TeamMember
} from "@/lib/types";

type DataOptions = {
  allowDemoFallback?: boolean;
};

export type AdminBookingSyncSummary = {
  lastSuccessfulSync: string | null;
  mode: string;
  note: string;
  pendingUpdates: number;
  provider: "Booking.com";
};

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

function normalizeMetadataValue(value: ActivityLogRow["metadata"]) {
  if (!value) {
    return {};
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as Record<string, unknown>;
    } catch {
      return {};
    }
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
  channel_reference: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
  guest_user_id: string | null;
  guest_name: string;
  guests: number;
  id: string;
  notes: string | null;
  room_id: string;
  source: Booking["source"];
  status: Booking["status"];
  updated_at: Date | string | null;
};

type RoomBlockRow = {
  check_in: Date | string;
  check_out: Date | string;
  created_at: string;
  created_by: string;
  id: string;
  reason: string;
  room_id: string;
  status: RoomBlock["status"];
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

type ActivityLogRow = {
  action: string;
  actor: string;
  created_at: Date | string;
  entity_id: string;
  entity_type: ActivityLogEntry["entityType"];
  id: number | string;
  message: string;
  metadata: Record<string, unknown> | string | null;
};

type RoomChannelMappingRow = {
  created_at: string;
  export_url: string;
  external_room_id: string;
  external_room_name: string;
  id: string;
  import_url: string;
  last_sync_error: string | null;
  last_sync_status: "idle" | "success" | "error";
  last_synced_at: Date | string | null;
  provider: RoomChannelMapping["provider"];
  room_id: string;
  sync_enabled: boolean;
  updated_at: string;
};

type UserRow = {
  email: string;
  id: string;
  image: string | null;
  name: string;
  role: AppUser["role"];
};

function shouldUseDemoFallback(options?: DataOptions) {
  return options?.allowDemoFallback !== false;
}

export async function getRoomsData(options?: DataOptions) {
  const allowDemoFallback = shouldUseDemoFallback(options);

  if (!db) {
    if (!allowDemoFallback) {
      return [];
    }

    return demoRooms;
  }

  await ensureDatabaseSchema();

  const roomRows = await db<RoomRow[]>`
    select id, slug, name, neighborhood, price_per_night, capacity, beds, status, image, short_description, created_at
    from rooms
    order by created_at desc
  `;

  if (roomRows.length === 0 && allowDemoFallback) {
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
  const rooms = await getRoomsData({ allowDemoFallback: false });

  return rooms.find((room) => room.slug === slug) ?? null;
}

export async function getBookingsData(options?: DataOptions) {
  const allowDemoFallback = shouldUseDemoFallback(options);

  if (!db) {
    if (!allowDemoFallback) {
      return [];
    }

    return demoBookings;
  }

  await ensureDatabaseSchema();

  const reservationRows = await db<ReservationRow[]>`
    select
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
      channel_reference,
      created_at,
      updated_at
    from reservations
    order by check_in asc
  `;

  if (reservationRows.length === 0 && allowDemoFallback) {
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
    guests: reservation.guests,
    guestUserId: reservation.guest_user_id,
    contactEmail: reservation.contact_email,
    contactPhone: reservation.contact_phone,
    notes: reservation.notes,
    channelReference: reservation.channel_reference,
    updatedAt: normalizeDateTimeValue(reservation.updated_at)
  }));
}

export async function getInquiriesData(options?: DataOptions) {
  const allowDemoFallback = shouldUseDemoFallback(options);

  if (!db) {
    if (!allowDemoFallback) {
      return [];
    }

    return demoInquiries;
  }

  await ensureDatabaseSchema();

  const inquiryRows = await db<InquiryRow[]>`
    select id, guest_name, phone, requested_room_type, check_in, check_out, guests, message, status, created_at
    from inquiries
    order by created_at desc
  `;

  if (inquiryRows.length === 0 && allowDemoFallback) {
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

export async function getRoomBlocksData(options?: DataOptions) {
  const allowDemoFallback = shouldUseDemoFallback(options);

  if (!db) {
    if (!allowDemoFallback) {
      return [];
    }

    return demoRoomBlocks;
  }

  await ensureDatabaseSchema();

  try {
    const roomBlockRows = await db<RoomBlockRow[]>`
      select id, room_id, check_in, check_out, reason, created_by, status, created_at
      from room_blocks
      order by check_in asc
    `;

    if (roomBlockRows.length === 0 && allowDemoFallback) {
      return demoRoomBlocks;
    }

    return roomBlockRows.map((block) => ({
      id: block.id,
      roomId: block.room_id,
      checkIn: normalizeDateValue(block.check_in),
      checkOut: normalizeDateValue(block.check_out),
      reason: block.reason,
      createdBy: block.created_by,
      status: block.status
    }));
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !("code" in error) ||
      !["42P01", "26000"].includes(String(error.code))
    ) {
      console.error("Room blocks query failed", error);
    }

    return allowDemoFallback ? demoRoomBlocks : [];
  }
}

export async function getCleaningTasksData(options?: DataOptions) {
  const allowDemoFallback = shouldUseDemoFallback(options);

  if (!db) {
    if (!allowDemoFallback) {
      return [];
    }

    return demoCleaningTasks;
  }

  await ensureDatabaseSchema();

  const taskRows = await db<CleaningTaskRow[]>`
    select id, room_id, assignee, due_at, status, notes, created_at
    from cleaning_tasks
    order by created_at asc
  `;

  if (taskRows.length === 0 && allowDemoFallback) {
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

export async function getTeamMembersData(options?: DataOptions) {
  const allowDemoFallback = shouldUseDemoFallback(options);

  if (!db) {
    if (!allowDemoFallback) {
      return [];
    }

    return demoTeamMembers;
  }

  const memberRows = await db<TeamMemberRow[]>`
    select id, name, role, shift, created_at
    from team_members
    order by created_at asc
  `;

  if (memberRows.length === 0 && allowDemoFallback) {
    return demoTeamMembers;
  }

  return memberRows.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    shift: member.shift
  }));
}

export async function getRoomChannelMappingsData(options?: DataOptions) {
  const allowDemoFallback = shouldUseDemoFallback(options);

  if (!db) {
    if (!allowDemoFallback) {
      return [];
    }

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
          last_sync_status,
          last_sync_error,
          last_synced_at,
          created_at,
          updated_at
      from room_channel_mappings
      order by created_at asc
    `;

    if (mappingRows.length === 0 && allowDemoFallback) {
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
      lastSyncedAt: normalizeDateTimeValue(mapping.last_synced_at),
      lastSyncStatus: mapping.last_sync_status,
      lastSyncError: mapping.last_sync_error
    }));
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !("code" in error) ||
      !["42P01", "26000"].includes(String(error.code))
    ) {
      console.error("Room channel mappings query failed", error);
    }

    return allowDemoFallback ? demoRoomChannelMappings : [];
  }
}

export async function getBookingSyncSummary(
  options?: DataOptions
): Promise<AdminBookingSyncSummary> {
  const [rooms, mappings] = await Promise.all([
    getRoomsData(options),
    getRoomChannelMappingsData(options)
  ]);
  const activeMappings = mappings.filter((mapping) => mapping.syncEnabled);
  const lastSuccessfulSync =
    activeMappings
      .map((mapping) => mapping.lastSyncedAt)
      .filter((value): value is string => Boolean(value))
      .sort()
      .at(-1) ?? null;

  return {
    provider: "Booking.com",
    lastSuccessfulSync,
    mode: process.env.BOOKING_SYNC_MODE || "manual",
    pendingUpdates: Math.max(rooms.length - activeMappings.length, 0),
    note:
      activeMappings.length > 0
        ? "Aktivne mape soba postoje i spremne su za Booking.com sync."
        : "Nijedna soba jos nije povezana sa Booking.com mapiranjem."
  };
}

export async function getActivityLogData(options?: DataOptions) {
  const allowDemoFallback = shouldUseDemoFallback(options);

  if (!db) {
    return [];
  }

  await ensureDatabaseSchema();

  try {
    const activityRows = await db<ActivityLogRow[]>`
      select id, entity_type, entity_id, action, actor, message, metadata, created_at
      from activity_log
      order by created_at desc
      limit 20
    `;

    if (activityRows.length === 0 && allowDemoFallback) {
      return [];
    }

    return activityRows.map((entry) => ({
      id: String(entry.id),
      entityType: entry.entity_type,
      entityId: entry.entity_id,
      action: entry.action,
      actor: entry.actor,
      message: entry.message,
      metadata: normalizeMetadataValue(entry.metadata),
      createdAt: normalizeDateTimeValue(entry.created_at) ?? new Date().toISOString()
    }));
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !("code" in error) ||
      !["42P01", "26000"].includes(String(error.code))
    ) {
      console.error("Activity log query failed", error);
    }

    return [];
  }
}

export async function getUserByEmail(email: string) {
  if (!db) {
    return null;
  }

  await ensureDatabaseSchema();

  const userRows = await db<UserRow[]>`
    select id, email, name, image, role
    from users
    where email = ${email}
    limit 1
  `;

  const user = userRows[0];

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role
  };
}

export async function getBookingsForUser(userId: string) {
  const bookings = await getBookingsData({ allowDemoFallback: false });

  return bookings.filter((booking) => booking.guestUserId === userId);
}
