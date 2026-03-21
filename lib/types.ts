export type RoomStatus = "available" | "occupied" | "cleaning" | "maintenance";

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
};

export type RoomBlock = {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  reason: string;
  createdBy: string;
  status: "blocked" | "maintenance";
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

export type InquiryStatus = "new" | "contacted" | "converted" | "closed";

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
