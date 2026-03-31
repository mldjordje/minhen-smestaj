import { getRoomDisplayName } from "@/lib/rooms";
import type { Booking, Room, RoomBlock } from "@/lib/types";

function escapeIcsValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatIcsDate(value: Date) {
  return value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function buildRoomCalendar(room: Room, bookings: Booking[], roomBlocks: RoomBlock[] = []) {
  const nowStamp = formatIcsDate(new Date());
  const roomName = escapeIcsValue(getRoomDisplayName(room));
  const bookingEventBlocks = bookings.map((booking) => {
    const summary = escapeIcsValue(`${getRoomDisplayName(room)} - ${booking.guestName}`);
    const description = escapeIcsValue(booking.notes || `Booking source: ${booking.source}`);

    return [
      "BEGIN:VEVENT",
      `UID:${escapeIcsValue(booking.channelReference || booking.id)}`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART:${formatIcsDate(new Date(`${booking.checkIn}T12:00:00.000Z`))}`,
      `DTEND:${formatIcsDate(new Date(`${booking.checkOut}T10:00:00.000Z`))}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT"
    ].join("\r\n");
  });
  const manualBlockEvents = roomBlocks.map((roomBlock) => {
    const summary = escapeIcsValue(`${getRoomDisplayName(room)} - Blocked`);
    const description = escapeIcsValue(roomBlock.reason || "Manual room block");

    return [
      "BEGIN:VEVENT",
      `UID:${escapeIcsValue(roomBlock.id)}`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART:${formatIcsDate(new Date(`${roomBlock.checkIn}T12:00:00.000Z`))}`,
      `DTEND:${formatIcsDate(new Date(`${roomBlock.checkOut}T10:00:00.000Z`))}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT"
    ].join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jagdschlossl//Booking Calendar//SR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${roomName} booking calendar`,
    "X-WR-TIMEZONE:Europe/Belgrade",
    ...bookingEventBlocks,
    ...manualBlockEvents,
    "END:VCALENDAR",
    ""
  ].join("\r\n");
}
