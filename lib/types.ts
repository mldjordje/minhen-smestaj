export type RoomStatus = "available" | "occupied" | "cleaning" | "maintenance";
export type UserRole = "guest" | "staff" | "owner";
export type BookingMode = "daily" | "monthly";

export type Room = {
  id: string;
  name: string;
  slug: string;
  neighborhood: string;
  pricePerNight: number;
  capacity: number;
  beds: string;
  status: RoomStatus;
  image: string;
  amenities: string[];
  shortDescription: string;
};

export type RoomChannelMapping = {
  id: string;
  roomId: string;
  provider: "Booking.com";
  externalRoomId: string;
  externalRoomName: string;
  exportUrl: string;
  importUrl: string;
  syncEnabled: boolean;
  lastSyncedAt?: string | null;
  lastSyncError?: string | null;
  lastSyncStatus?: "idle" | "success" | "error";
};

export type RoomBlock = {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  reason: string;
  createdBy: string;
  status: "blocked" | "maintenance";
  source?: "manual" | "Booking.com";
  channelReference?: string | null;
  updatedAt?: string | null;
};

export type Booking = {
  id: string;
  guestName: string;
  roomId: string;
  source: "Booking.com" | "Direktno" | "Airbnb";
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "arriving" | "checked-in" | "checked-out";
  guests: number;
  guestUserId?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  notes?: string | null;
  channelReference?: string | null;
  updatedAt?: string | null;
};

export type CleaningTask = {
  id: string;
  roomId: string;
  assignee: string;
  dueAt: string;
  status: "todo" | "in-progress" | "done";
  notes: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: "owner" | "cleaner" | "host";
  shift: string;
};

export type AppUser = {
  id: string;
  email: string;
  image?: string | null;
  name: string;
  role: UserRole;
};

export type InquiryStatus = "new" | "contacted" | "converted" | "closed";

export type ActivityLogEntityType =
  | "inquiry"
  | "reservation"
  | "room_block"
  | "cleaning_task"
  | "team_member"
  | "user";

export type ActivityLogEntry = {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
  entityId: string;
  entityType: ActivityLogEntityType;
  message: string;
  metadata: Record<string, unknown>;
};

export type Inquiry = {
  id: string;
  guestName: string;
  phone: string;
  requestedRoomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  status: InquiryStatus;
};
