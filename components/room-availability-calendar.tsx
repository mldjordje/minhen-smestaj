"use client";

import { addDays, getCalendarCellStatus } from "@/lib/availability";
import { Booking, Room, RoomBlock } from "@/lib/types";

type RoomAvailabilityCalendarProps = {
  bookings: Booking[];
  days?: number;
  roomBlocks?: RoomBlock[];
  room: Room;
};

const dayLabelFormatter = new Intl.DateTimeFormat("sr-RS", {
  day: "2-digit",
  month: "2-digit"
});

const weekdayFormatter = new Intl.DateTimeFormat("sr-RS", {
  weekday: "short"
});

export function RoomAvailabilityCalendar({
  bookings,
  days = 21,
  roomBlocks = [],
  room
}: RoomAvailabilityCalendarProps) {
  const startDate = new Date();
  const calendarDays = Array.from({ length: days }, (_, index) => addDays(startDate, index));
  const roomBookings = bookings.filter((booking) => booking.roomId === room.id);
  const activeRoomBlocks = roomBlocks.filter((block) => block.roomId === room.id);

  return (
    <div className="room-availability">
      <div className="calendar-legend">
        <span className="calendar-legend__item is-free">Slobodno</span>
        <span className="calendar-legend__item is-occupied">Zauzeto</span>
        <span className="calendar-legend__item is-arrival">Dolazak</span>
        <span className="calendar-legend__item is-departure">Odlazak</span>
        <span className="calendar-legend__item is-blocked">Blokirano</span>
      </div>
      <div className="room-availability__grid">
        {calendarDays.map((day) => {
          const cell = getCalendarCellStatus(room, day, roomBookings, activeRoomBlocks);

          return (
            <div
              key={day.toISOString()}
              className={`room-availability__cell is-${cell.tone}`}
              title={cell.detail}
            >
              <strong>{dayLabelFormatter.format(day)}</strong>
              <span>{weekdayFormatter.format(day)}</span>
              <small>{cell.shortLabel}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
