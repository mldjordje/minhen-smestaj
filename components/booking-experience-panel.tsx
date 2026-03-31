"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PublicBookingForm } from "@/components/public-booking-form";
import { addDays, getCalendarCellStatus, parseDate } from "@/lib/availability";
import { getRoomDisplayName } from "@/lib/rooms";
import { Booking, BookingMode, Room, RoomBlock } from "@/lib/types";

type StaySelection = {
  checkIn: string;
  checkOut: string;
  summary: string;
};

type MonthlyAvailabilityState = "free" | "partial" | "busy";

type MonthOption = {
  availableDays: number;
  checkIn: string;
  checkOut: string;
  isSelectable: boolean;
  label: string;
  monthlyRate: number;
  state: MonthlyAvailabilityState;
  totalDays: number;
};

type BookingExperiencePanelProps = {
  bookings: Booking[];
  dailyFormSubtitle?: string;
  defaultRoomSlug?: string;
  headingEyebrow?: string;
  headingNote?: string;
  headingTitle?: string;
  lockedRoomSlug?: string;
  monthlyFormSubtitle?: string;
  roomBlocks: RoomBlock[];
  rooms: Room[];
};

const dayLabelFormatter = new Intl.DateTimeFormat("sr-RS", {
  day: "2-digit",
  month: "2-digit"
});

const weekdayFormatter = new Intl.DateTimeFormat("sr-RS", {
  weekday: "short"
});

const longDateFormatter = new Intl.DateTimeFormat("sr-RS", {
  day: "2-digit",
  month: "long",
  year: "numeric"
});

const monthLabelFormatter = new Intl.DateTimeFormat("sr-RS", {
  month: "long",
  year: "numeric"
});

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonthsToDate(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function getMonthDifference(checkIn: string, checkOut: string) {
  const startDate = parseDate(checkIn);
  const endDate = parseDate(checkOut);

  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
}

function getNightDifference(checkIn: string, checkOut: string) {
  const startDate = parseDate(checkIn);
  const endDate = parseDate(checkOut);

  return Math.round((endDate.getTime() - startDate.getTime()) / 86400000);
}

function rangesOverlap(checkIn: string, checkOut: string, otherCheckIn: string, otherCheckOut: string) {
  return checkIn < otherCheckOut && otherCheckIn < checkOut;
}

function getMonthlyDiscount(room: Room) {
  if (room.capacity >= 4) {
    return 0.72;
  }

  if (room.capacity >= 2) {
    return 0.77;
  }

  return 0.82;
}

function getMonthlyRate(room: Room) {
  return Math.round((room.pricePerNight * 30 * getMonthlyDiscount(room)) / 10) * 10;
}

function getMonthlyNote(room: Room) {
  if (room.capacity >= 4) {
    return "Pogodno za duzi timski boravak i vise radnika.";
  }

  if (room.capacity >= 2) {
    return "Dobar izbor za parove, kolege ili dvoje radnika.";
  }

  return "Prakticno resenje za solo boravak i duze projekte.";
}

function isRangeAvailable(
  room: Room,
  bookings: Booking[],
  roomBlocks: RoomBlock[],
  checkIn: string,
  checkOut: string
) {
  if (room.status === "maintenance" || checkIn >= checkOut) {
    return false;
  }

  const hasBookingConflict = bookings.some((booking) =>
    rangesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut)
  );
  const hasBlockConflict = roomBlocks.some((roomBlock) =>
    rangesOverlap(checkIn, checkOut, roomBlock.checkIn, roomBlock.checkOut)
  );

  return !hasBookingConflict && !hasBlockConflict;
}

function buildDailySummary(checkIn: string, checkOut: string) {
  const nights = getNightDifference(checkIn, checkOut);

  return `${longDateFormatter.format(parseDate(checkIn))} - ${longDateFormatter.format(parseDate(checkOut))} - ${nights} nocenja`;
}

function buildMonthlySummary(checkIn: string, checkOut: string, monthlyRate: number) {
  const months = getMonthDifference(checkIn, checkOut);

  return `${monthLabelFormatter.format(parseDate(checkIn))} - ${monthLabelFormatter.format(addDays(parseDate(checkOut), -1))} - ${months} meseca - oko ${monthlyRate} EUR / mesec`;
}

function getMonthState(room: Room, bookings: Booking[], roomBlocks: RoomBlock[], monthStart: Date) {
  const monthEnd = addMonthsToDate(monthStart, 1);
  const totalDays = getNightDifference(formatDateInput(monthStart), formatDateInput(monthEnd));
  let availableDays = 0;

  for (let index = 0; index < totalDays; index += 1) {
    const currentDay = addDays(monthStart, index);
    const nextDay = addDays(currentDay, 1);

    if (
      isRangeAvailable(room, bookings, roomBlocks, formatDateInput(currentDay), formatDateInput(nextDay))
    ) {
      availableDays += 1;
    }
  }

  if (availableDays === totalDays) {
    return { availableDays, state: "free" as MonthlyAvailabilityState, totalDays };
  }

  if (availableDays === 0) {
    return { availableDays, state: "busy" as MonthlyAvailabilityState, totalDays };
  }

  return { availableDays, state: "partial" as MonthlyAvailabilityState, totalDays };
}

function canSelectMonthRange(
  room: Room,
  bookings: Booking[],
  roomBlocks: RoomBlock[],
  startCheckIn: string,
  endCheckOut: string
) {
  return isRangeAvailable(room, bookings, roomBlocks, startCheckIn, endCheckOut);
}

function createInitialFeedback(mode: BookingMode) {
  return mode === "monthly"
    ? "Za mesecni boravak kliknite slobodan mesec. Mozete izabrati i vise uzastopnih meseci."
    : "Kliknite prvo datum dolaska, zatim datum odlaska.";
}

function getInitialRoomSlug(rooms: Room[], defaultRoomSlug?: string, lockedRoomSlug?: string) {
  return lockedRoomSlug ?? defaultRoomSlug ?? rooms[0]?.slug ?? "";
}

export function BookingExperiencePanel({
  bookings,
  dailyFormSubtitle = "Klikom na kalendar popunjavaju se datumi, a ovde ostaje brz upit ili potvrda rezervacije.",
  defaultRoomSlug,
  headingEyebrow = "Interaktivni booking",
  headingNote = "Prvo izaberite tip boravka i sobu, pa zatim klikom na kalendar unesite tacan period.",
  headingTitle = "Izaberite sobu i termin direktno na kalendaru",
  lockedRoomSlug,
  monthlyFormSubtitle = "Izabrani mesecni period se automatski prenosi u upit za ovu sobu.",
  roomBlocks,
  rooms
}: BookingExperiencePanelProps) {
  const [bookingMode, setBookingMode] = useState<BookingMode>("daily");
  const [selection, setSelection] = useState<StaySelection | null>(null);
  const [dailyAnchor, setDailyAnchor] = useState<string | null>(null);
  const [monthAnchor, setMonthAnchor] = useState<string | null>(null);
  const [feedback, setFeedback] = useState(createInitialFeedback("daily"));
  const [selectedRoomSlug, setSelectedRoomSlug] = useState(() =>
    getInitialRoomSlug(rooms, defaultRoomSlug, lockedRoomSlug)
  );
  const activeRoomSlug = lockedRoomSlug ?? selectedRoomSlug;
  const selectedRoom = rooms.find((room) => room.slug === activeRoomSlug) ?? rooms[0] ?? null;
  const roomBookings = selectedRoom
    ? bookings.filter((booking) => booking.roomId === selectedRoom.id)
    : [];
  const activeBlocks = selectedRoom
    ? roomBlocks.filter((roomBlock) => roomBlock.roomId === selectedRoom.id)
    : [];
  const calendarDays = Array.from({ length: 35 }, (_, index) => addDays(new Date(), index));
  const monthlyRate = selectedRoom ? getMonthlyRate(selectedRoom) : 0;
  const monthOptions = selectedRoom
    ? Array.from({ length: 6 }, (_, index) => {
        const monthStart = addMonthsToDate(startOfMonth(new Date()), index + 1);
        const monthEnd = addMonthsToDate(monthStart, 1);
        const monthState = getMonthState(selectedRoom, roomBookings, activeBlocks, monthStart);

        return {
          availableDays: monthState.availableDays,
          checkIn: formatDateInput(monthStart),
          checkOut: formatDateInput(monthEnd),
          isSelectable: monthState.state === "free",
          label: monthLabelFormatter.format(monthStart),
          monthlyRate,
          state: monthState.state,
          totalDays: monthState.totalDays
        } satisfies MonthOption;
      })
    : [];

  useEffect(() => {
    setSelectedRoomSlug(getInitialRoomSlug(rooms, defaultRoomSlug, lockedRoomSlug));
  }, [defaultRoomSlug, lockedRoomSlug, rooms]);

  useEffect(() => {
    setSelection(null);
    setDailyAnchor(null);
    setMonthAnchor(null);
    setFeedback(createInitialFeedback(bookingMode));
  }, [bookingMode, activeRoomSlug]);

  const handleModeChange = (nextMode: BookingMode) => {
    setBookingMode(nextMode);
  };

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoomSlug(event.target.value);
  };

  const handleDailyDateClick = (date: Date) => {
    if (!selectedRoom) {
      return;
    }

    const dateKey = formatDateInput(date);
    const canStartOnDate = isRangeAvailable(
      selectedRoom,
      roomBookings,
      activeBlocks,
      dateKey,
      formatDateInput(addDays(date, 1))
    );

    if (!dailyAnchor || selection) {
      if (!canStartOnDate) {
        setFeedback("Na ovom datumu nije moguce zapoceti novi boravak. Izaberite drugi dan.");
        return;
      }

      setDailyAnchor(dateKey);
      setSelection(null);
      setFeedback(`Dolazak je postavljen na ${longDateFormatter.format(date)}. Sada izaberite odlazak.`);
      return;
    }

    if (dateKey <= dailyAnchor) {
      if (!canStartOnDate) {
        setFeedback("Novi pocetak boravka mora biti na slobodnom datumu.");
        return;
      }

      setDailyAnchor(dateKey);
      setFeedback(`Dolazak je pomeren na ${longDateFormatter.format(date)}. Sada izaberite odlazak.`);
      return;
    }

    if (!isRangeAvailable(selectedRoom, roomBookings, activeBlocks, dailyAnchor, dateKey)) {
      setFeedback("U tom rasponu postoji zauzet ili blokiran termin. Pokusajte drugi odlazak.");
      return;
    }

    setSelection({
      checkIn: dailyAnchor,
      checkOut: dateKey,
      summary: buildDailySummary(dailyAnchor, dateKey)
    });
    setDailyAnchor(null);
    setFeedback("Period je izabran i prebacen u formu. Mozete odmah poslati upit ili potvrditi rezervaciju.");
  };

  const handleMonthClick = (option: MonthOption) => {
    if (!selectedRoom) {
      return;
    }

    if (!option.isSelectable) {
      setFeedback("Mesec nije potpuno slobodan za mesecni boravak. Izaberite drugi mesec.");
      return;
    }

    if (!monthAnchor || selection === null) {
      setMonthAnchor(option.checkIn);
      setSelection({
        checkIn: option.checkIn,
        checkOut: option.checkOut,
        summary: buildMonthlySummary(option.checkIn, option.checkOut, option.monthlyRate)
      });
      setFeedback("Izabran je jedan mesec. Ako zelite duzi boravak, kliknite jos jedan naredni slobodan mesec.");
      return;
    }

    if (option.checkIn <= monthAnchor) {
      setMonthAnchor(option.checkIn);
      setSelection({
        checkIn: option.checkIn,
        checkOut: option.checkOut,
        summary: buildMonthlySummary(option.checkIn, option.checkOut, option.monthlyRate)
      });
      setFeedback("Mesecni boravak je resetovan na novi pocetni mesec.");
      return;
    }

    if (!canSelectMonthRange(selectedRoom, roomBookings, activeBlocks, monthAnchor, option.checkOut)) {
      setFeedback("Izmedju izabranih meseci postoji zauzet termin. Izaberite drugi niz slobodnih meseci.");
      return;
    }

    setSelection({
      checkIn: monthAnchor,
      checkOut: option.checkOut,
      summary: buildMonthlySummary(monthAnchor, option.checkOut, option.monthlyRate)
    });
    setFeedback("Mesecni period je prosiren i spreman za slanje upita.");
  };

  const clearSelection = () => {
    setSelection(null);
    setDailyAnchor(null);
    setMonthAnchor(null);
    setFeedback(
      bookingMode === "monthly"
        ? "Mesecni izbor je obrisan. Kliknite slobodan mesec za novi upit."
        : "Izbor datuma je obrisan. Kliknite novi dolazak i odlazak."
    );
  };

  return (
    <section className="room-booking-experience" id="booking">
      <div className="room-booking-experience__planner">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">{headingEyebrow}</p>
            <h2>
              {selectedRoom ? `${headingTitle} za ${getRoomDisplayName(selectedRoom)}` : headingTitle}
            </h2>
          </div>
          <span className="inline-note">{headingNote}</span>
        </div>

        <div className="room-booking-toolbar">
          <div className="room-booking-mode-switch">
            <button
              className={bookingMode === "daily" ? "is-active" : ""}
              onClick={() => handleModeChange("daily")}
              type="button"
            >
              Po danu
            </button>
            <button
              className={bookingMode === "monthly" ? "is-active" : ""}
              onClick={() => handleModeChange("monthly")}
              type="button"
            >
              Mesecno
            </button>
          </div>

          {!lockedRoomSlug ? (
            <label className="room-booking-room-picker">
              <span>Soba za pregled</span>
              <select onChange={handleRoomChange} value={activeRoomSlug}>
                {rooms.map((room) => (
                  <option key={room.id} value={room.slug}>
                    {getRoomDisplayName(room)}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>

        {selectedRoom ? (
          <div className="room-booking-room-summary">
            <div>
              <strong>{getRoomDisplayName(selectedRoom)}</strong>
              <span>
                {selectedRoom.capacity} gosta - {selectedRoom.beds} - {selectedRoom.pricePerNight} EUR / noc
              </span>
            </div>
            {!lockedRoomSlug ? (
              <Link className="secondary-button" href={`/rooms/${selectedRoom.slug}`}>
                Otvori sobu
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="admin-empty-state">
            <strong>Trenutno nema soba za prikaz</strong>
            <p>Kada se sobe ucitaju iz baze, ovde ce odmah biti dostupan interaktivni booking kalendar.</p>
          </div>
        )}

        {selectedRoom ? (
          bookingMode === "daily" ? (
            <div className="room-stay-planner">
              <div className="calendar-legend">
                <span className="calendar-legend__item is-free">Slobodno</span>
                <span className="calendar-legend__item is-occupied">Zauzeto</span>
                <span className="calendar-legend__item is-arrival">Dolazak</span>
                <span className="calendar-legend__item is-departure">Odlazak</span>
                <span className="calendar-legend__item is-blocked">Blokirano</span>
              </div>
              <div className="room-stay-planner__grid">
                {calendarDays.map((day) => {
                  const dateKey = formatDateInput(day);
                  const cell = getCalendarCellStatus(selectedRoom, day, roomBookings, activeBlocks);
                  const isStart = dateKey === (selection?.checkIn ?? dailyAnchor);
                  const isEnd = dateKey === selection?.checkOut;
                  const isWithinSelection = selection
                    ? dateKey > selection.checkIn && dateKey < selection.checkOut
                    : false;
                  const canStartOnDate = isRangeAvailable(
                    selectedRoom,
                    roomBookings,
                    activeBlocks,
                    dateKey,
                    formatDateInput(addDays(day, 1))
                  );
                  const canUseAsEnd = dailyAnchor
                    ? dateKey > dailyAnchor &&
                      isRangeAvailable(selectedRoom, roomBookings, activeBlocks, dailyAnchor, dateKey)
                    : false;
                  const isClickable = selection ? canStartOnDate : dailyAnchor ? canUseAsEnd || canStartOnDate : canStartOnDate;

                  return (
                    <button
                      key={dateKey}
                      className={`room-stay-planner__day is-${cell.tone}${isStart ? " is-selected-start" : ""}${isEnd ? " is-selected-end" : ""}${isWithinSelection ? " is-selected-range" : ""}${isClickable ? " is-clickable" : ""}`}
                      onClick={() => handleDailyDateClick(day)}
                      title={cell.detail}
                      type="button"
                    >
                      <strong>{dayLabelFormatter.format(day)}</strong>
                      <span>{weekdayFormatter.format(day)}</span>
                      <small>{cell.shortLabel}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="room-monthly-planner">
              <div className="room-monthly-planner__intro">
                <div>
                  <strong>Mesecni boravak za {getRoomDisplayName(selectedRoom)}</strong>
                  <span>
                    Oko {monthlyRate} EUR / mesec - {getMonthlyNote(selectedRoom)}
                  </span>
                </div>
                <span className="inline-note">Kliknite prvi i poslednji slobodan mesec u nizu.</span>
              </div>
              <div className="room-monthly-planner__grid">
                {monthOptions.map((option) => {
                  const isSelectedStart = option.checkIn === (monthAnchor ?? selection?.checkIn);
                  const isSelectedEnd = selection
                    ? option.checkOut === selection.checkOut && selection.checkIn !== selection.checkOut
                    : false;
                  const isWithinSelection = selection
                    ? option.checkIn > selection.checkIn && option.checkOut < selection.checkOut
                    : false;

                  return (
                    <button
                      key={option.checkIn}
                      className={`room-monthly-planner__card is-${option.state}${option.isSelectable ? " is-clickable" : ""}${isSelectedStart ? " is-selected-start" : ""}${isSelectedEnd ? " is-selected-end" : ""}${isWithinSelection ? " is-selected-range" : ""}`}
                      onClick={() => handleMonthClick(option)}
                      type="button"
                    >
                      <strong>{option.label}</strong>
                      <span>Oko {option.monthlyRate} EUR / mesec</span>
                      <small>
                        {option.state === "free"
                          ? `Slobodno svih ${option.totalDays} dana`
                          : option.state === "partial"
                            ? `${option.availableDays}/${option.totalDays} dana bez konflikta`
                            : "Mesec nije raspoloziv"}
                      </small>
                    </button>
                  );
                })}
              </div>
            </div>
          )
        ) : null}

        <div className="room-booking-selection-card">
          <div>
            <strong>{selection ? "Izabrani period je spreman" : "Period jos nije izabran"}</strong>
            <p>{selection?.summary ?? feedback}</p>
          </div>
          {selection ? (
            <button className="secondary-button" onClick={clearSelection} type="button">
              Obrisi izbor
            </button>
          ) : null}
        </div>
      </div>

      <aside className="room-booking-experience__form">
        <PublicBookingForm
          bookingMode={bookingMode}
          bookings={bookings}
          defaultRoomSlug={selectedRoom?.slug ?? defaultRoomSlug}
          hideManualDateInputs
          hideRoomSelector
          lockedRoomSlug={selectedRoom?.slug ?? lockedRoomSlug}
          roomBlocks={roomBlocks}
          rooms={rooms}
          selectionPreset={selection ?? undefined}
          showAvailabilityPreview={false}
          subtitle={bookingMode === "monthly" ? monthlyFormSubtitle : dailyFormSubtitle}
          title={
            selectedRoom
              ? `Posaljite upit za ${getRoomDisplayName(selectedRoom)}`
              : "Posaljite upit za boravak"
          }
        />
      </aside>
    </section>
  );
}
