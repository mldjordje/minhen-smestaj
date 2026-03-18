import { Booking, Room } from "@/lib/types";

export type AvailabilityTone =
  | "free"
  | "occupied"
  | "arrival"
  | "departure"
  | "cleaning"
  | "maintenance";

export function parseDate(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, amount: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);
  return nextDate;
}

export function isSameDate(leftDate: Date, rightDate: Date) {
  return (
    leftDate.getFullYear() === rightDate.getFullYear() &&
    leftDate.getMonth() === rightDate.getMonth() &&
    leftDate.getDate() === rightDate.getDate()
  );
}

export function getCalendarCellStatus(room: Room, date: Date, sourceBookings: Booking[]) {
  const matchingBooking = sourceBookings.find((booking) => {
    if (booking.roomId !== room.id) {
      return false;
    }

    const checkIn = parseDate(booking.checkIn);
    const checkOut = parseDate(booking.checkOut);

    return (
      isSameDate(checkIn, date) ||
      isSameDate(checkOut, date) ||
      (date > checkIn && date < checkOut)
    );
  });

  if (matchingBooking) {
    const checkIn = parseDate(matchingBooking.checkIn);
    const checkOut = parseDate(matchingBooking.checkOut);

    if (isSameDate(checkIn, date)) {
      return {
        tone: "arrival" as AvailabilityTone,
        shortLabel: "Dol.",
        detail: `${matchingBooking.guestName} dolazi`
      };
    }

    if (isSameDate(checkOut, date)) {
      return {
        tone: "departure" as AvailabilityTone,
        shortLabel: "Odl.",
        detail: `${matchingBooking.guestName} odlazi`
      };
    }

    return {
      tone: "occupied" as AvailabilityTone,
      shortLabel: "Zauz.",
      detail: `${matchingBooking.guestName} boravi`
    };
  }

  if (room.status === "maintenance") {
    return {
      tone: "maintenance" as AvailabilityTone,
      shortLabel: "Serv.",
      detail: "Soba je privremeno zatvorena"
    };
  }

  if (room.status === "cleaning") {
    return {
      tone: "cleaning" as AvailabilityTone,
      shortLabel: "Cisc.",
      detail: "Soba je u pripremi"
    };
  }

  return {
    tone: "free" as AvailabilityTone,
    shortLabel: "Slob.",
    detail: "Soba je slobodna"
  };
}
