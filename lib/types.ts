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
