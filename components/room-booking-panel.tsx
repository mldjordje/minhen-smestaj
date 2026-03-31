"use client";

import { BookingExperiencePanel } from "@/components/booking-experience-panel";
import { getRoomDisplayName } from "@/lib/rooms";
import { Booking, Room, RoomBlock } from "@/lib/types";

type RoomBookingPanelProps = {
  bookings: Booking[];
  room: Room;
  roomBlocks: RoomBlock[];
  rooms: Room[];
};

export function RoomBookingPanel({
  bookings,
  room,
  roomBlocks,
  rooms
}: RoomBookingPanelProps) {
  return (
    <BookingExperiencePanel
      bookings={bookings}
      dailyFormSubtitle={`Klikom na kalendar popunjavaju se datumi za ${getRoomDisplayName(room)}, a ovde ostaje brz upit ili potvrda rezervacije.`}
      defaultRoomSlug={room.slug}
      headingEyebrow="Interaktivni kalendar"
      headingNote="Izaberite dnevni ili mesecni boravak, pa period unesite direktno klikom na kalendar."
      headingTitle="Izaberite boravak direktno na kalendaru"
      lockedRoomSlug={room.slug}
      monthlyFormSubtitle={`Izabrani mesecni period se automatski prenosi u upit za ${getRoomDisplayName(room)}.`}
      roomBlocks={roomBlocks}
      rooms={rooms}
    />
  );
}
