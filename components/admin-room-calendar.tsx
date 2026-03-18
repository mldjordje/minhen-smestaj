"use client";

import { useState } from "react";
import { addDays, getCalendarCellStatus } from "@/lib/availability";
import { Booking, Room, RoomBlock } from "@/lib/types";

type CalendarEntryDraft = {
  checkIn: string;
  checkOut: string;
  guestName: string;
  guests: string;
  notes: string;
  type: "reservation" | "block";
};

type ActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type AdminRoomCalendarProps = {
  audience: "owner" | "staff";
  bookings: Booking[];
  onBookingsChange?: (bookings: Booking[]) => void;
  onRoomBlocksChange?: (roomBlocks: RoomBlock[]) => void;
  roomBlocks: RoomBlock[];
  rooms: Room[];
  sectionId?: string;
};

const dayLabelFormatter = new Intl.DateTimeFormat("sr-RS", {
  day: "2-digit",
  month: "2-digit"
});

const weekdayFormatter = new Intl.DateTimeFormat("sr-RS", {
  weekday: "short"
});

function formatDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

function createInitialDraft(): CalendarEntryDraft {
  const tomorrow = addDays(new Date(), 1);
  const dayAfter = addDays(new Date(), 2);

  return {
    type: "reservation",
    checkIn: formatDateInput(tomorrow),
    checkOut: formatDateInput(dayAfter),
    guestName: "",
    guests: "1",
    notes: ""
  };
}

function buildInitialDrafts(rooms: Room[]) {
  return Object.fromEntries(rooms.map((room) => [room.id, createInitialDraft()]));
}

export function AdminRoomCalendar({
  audience,
  bookings,
  onBookingsChange,
  onRoomBlocksChange,
  roomBlocks,
  rooms,
  sectionId
}: AdminRoomCalendarProps) {
  const [drafts, setDrafts] = useState<Record<string, CalendarEntryDraft>>(() =>
    buildInitialDrafts(rooms)
  );
  const [actionState, setActionState] = useState<Record<string, ActionState>>({});
  const startDate = new Date();
  const calendarDays = Array.from({ length: 21 }, (_, index) => addDays(startDate, index));

  function handleDraftChange(
    roomId: string,
    field: keyof CalendarEntryDraft,
    value: string
  ) {
    setDrafts((current) => ({
      ...current,
      [roomId]: {
        ...(current[roomId] ?? createInitialDraft()),
        [field]: value
      }
    }));
  }

  async function handleCreateEntry(roomId: string) {
    const draft = drafts[roomId] ?? createInitialDraft();

    setActionState((current) => ({
      ...current,
      [roomId]: {
        status: "submitting",
        message:
          draft.type === "reservation"
            ? "Dodajem rucnu rezervaciju..."
            : "Blokiram termin..."
      }
    }));

    const response = await fetch("/api/admin/calendar-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...draft,
        roomId,
        guests: Number(draft.guests || 1),
        createdBy: audience
      })
    });

    const result = (await response.json()) as
      | {
          ok: true;
          message: string;
          reservation?: Booking;
          roomBlock?: RoomBlock;
          type: "reservation" | "block";
        }
      | {
          ok: false;
          message: string;
        };

    if (!result.ok) {
      setActionState((current) => ({
        ...current,
        [roomId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    if (result.type === "reservation" && result.reservation && onBookingsChange) {
      onBookingsChange(
        [...bookings, result.reservation].sort((leftBooking, rightBooking) =>
          leftBooking.checkIn.localeCompare(rightBooking.checkIn)
        )
      );
    }

    if (result.type === "block" && result.roomBlock && onRoomBlocksChange) {
      onRoomBlocksChange(
        [...roomBlocks, result.roomBlock].sort((leftBlock, rightBlock) =>
          leftBlock.checkIn.localeCompare(rightBlock.checkIn)
        )
      );
    }

    setDrafts((current) => ({
      ...current,
      [roomId]: {
        ...createInitialDraft(),
        type: draft.type
      }
    }));
    setActionState((current) => ({
      ...current,
      [roomId]: {
        status: "success",
        message: result.message
      }
    }));
  }

  return (
    <section className="dashboard-panel" id={sectionId}>
      <div className="section-heading wide">
        <div>
          <p className="eyebrow">Interaktivni kalendar</p>
          <h2>Kalendar, blokade i rucne rezervacije po sobi</h2>
        </div>
        <span className="inline-note">
          Owner i staff mogu da blokiraju termin ili unesu rucnu rezervaciju direktno iz admina.
        </span>
      </div>
      <div className="calendar-legend">
        <span className="calendar-legend__item is-free">Slobodno</span>
        <span className="calendar-legend__item is-occupied">Zauzeto</span>
        <span className="calendar-legend__item is-arrival">Dolazak</span>
        <span className="calendar-legend__item is-departure">Odlazak</span>
        <span className="calendar-legend__item is-blocked">Blokirano</span>
      </div>
      <div className="interactive-room-calendar">
        {rooms.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Jos nema soba u bazi</strong>
            <p>Kada dodas prvu sobu, ovde ce se automatski pojaviti njen kalendar.</p>
          </div>
        ) : null}
        {rooms.map((room) => {
          const roomDraft = drafts[room.id] ?? createInitialDraft();
          const roomBookings = bookings.filter((booking) => booking.roomId === room.id);
          const activeBlocks = roomBlocks.filter((block) => block.roomId === room.id);

          return (
            <article key={room.id} className="interactive-room-calendar__card">
              <div className="interactive-room-calendar__card-head">
                <div>
                  <strong>{room.name}</strong>
                  <span>{room.neighborhood}</span>
                </div>
                <span className="status-pill status-available">
                  {roomBookings.length} rezervacija / {activeBlocks.length} blokada
                </span>
              </div>

              <div className="interactive-room-calendar__grid">
                {calendarDays.map((day) => {
                  const cell = getCalendarCellStatus(room, day, roomBookings, activeBlocks);

                  return (
                    <div
                      key={`${room.id}-${day.toISOString()}`}
                      className={`interactive-room-calendar__cell is-${cell.tone}`}
                      title={cell.detail}
                    >
                      <strong>{dayLabelFormatter.format(day)}</strong>
                      <span>{weekdayFormatter.format(day)}</span>
                      <small>{cell.shortLabel}</small>
                    </div>
                  );
                })}
              </div>

              <div className="interactive-room-calendar__form">
                <div className="public-booking-form__grid">
                  <select
                    onChange={(event) => handleDraftChange(room.id, "type", event.target.value)}
                    value={roomDraft.type}
                  >
                    <option value="reservation">Rucna rezervacija</option>
                    <option value="block">Blokada termina</option>
                  </select>
                  <input
                    min="1"
                    onChange={(event) => handleDraftChange(room.id, "guests", event.target.value)}
                    placeholder="Broj gostiju"
                    type="number"
                    value={roomDraft.guests}
                  />
                </div>
                <div className="public-booking-form__grid">
                  <input
                    onChange={(event) => handleDraftChange(room.id, "checkIn", event.target.value)}
                    type="date"
                    value={roomDraft.checkIn}
                  />
                  <input
                    onChange={(event) => handleDraftChange(room.id, "checkOut", event.target.value)}
                    type="date"
                    value={roomDraft.checkOut}
                  />
                </div>
                {roomDraft.type === "reservation" ? (
                  <input
                    onChange={(event) => handleDraftChange(room.id, "guestName", event.target.value)}
                    placeholder="Ime gosta"
                    value={roomDraft.guestName}
                  />
                ) : null}
                <textarea
                  onChange={(event) => handleDraftChange(room.id, "notes", event.target.value)}
                  placeholder={
                    roomDraft.type === "reservation"
                      ? "Napomena za rucni unos rezervacije"
                      : "Razlog blokade termina"
                  }
                  rows={3}
                  value={roomDraft.notes}
                />
                <button
                  className="primary-button"
                  onClick={() => void handleCreateEntry(room.id)}
                  type="button"
                >
                  {actionState[room.id]?.status === "submitting"
                    ? "Cuvanje..."
                    : roomDraft.type === "reservation"
                      ? "Dodaj rezervaciju"
                      : "Blokiraj termin"}
                </button>
                <p
                  className={`inline-note ${
                    actionState[room.id]?.status === "error" ? "inline-note-error" : ""
                  }`}
                >
                  {actionState[room.id]?.message ||
                    "Svaka nova soba automatski dobija svoj kalendar i moze odmah da prima unose."}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
