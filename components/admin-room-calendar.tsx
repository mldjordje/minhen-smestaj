"use client";

import { useState } from "react";
import {
  addDays,
  getCalendarCellStatus,
  isImportedClosedBooking,
  parseDate
} from "@/lib/availability";
import { getRoomDisplayName } from "@/lib/rooms";
import { Booking, Room, RoomBlock } from "@/lib/types";

type CalendarEntryDraft = {
  type: "reservation" | "block";
  blockStatus: RoomBlock["status"];
  checkIn: string;
  checkOut: string;
  guestName: string;
  guests: string;
  notes: string;
};

type ReservationEditDraft = {
  roomId: string;
  guestName: string;
  guests: string;
  checkIn: string;
  checkOut: string;
  status: Booking["status"];
};

type BlockEditDraft = {
  roomId: string;
  checkIn: string;
  checkOut: string;
  reason: string;
  status: RoomBlock["status"];
};

type ActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type RangeDraftState = {
  anchor: string | null;
  touched?: boolean;
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

const reservationStatuses: Booking["status"][] = ["confirmed", "arriving", "checked-in", "checked-out"];
const roomBlockStatuses: RoomBlock["status"][] = ["blocked", "maintenance"];

const dayLabelFormatter = new Intl.DateTimeFormat("sr-RS", { day: "2-digit", month: "2-digit" });
const weekdayFormatter = new Intl.DateTimeFormat("sr-RS", { weekday: "short" });
const monthLabelFormatter = new Intl.DateTimeFormat("sr-RS", { month: "long", year: "numeric" });

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function getMonthDays(date: Date) {
  const monthStart = startOfMonth(date);
  const nextMonthStart = addMonths(monthStart, 1);
  const days: Date[] = [];
  let cursor = new Date(monthStart);

  while (cursor < nextMonthStart) {
    days.push(new Date(cursor));
    cursor = addDays(cursor, 1);
  }

  return days;
}

function formatDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

function sortBookings(nextBookings: Booking[]) {
  return [...nextBookings].sort((left, right) => left.checkIn.localeCompare(right.checkIn));
}

function sortRoomBlocks(nextRoomBlocks: RoomBlock[]) {
  return [...nextRoomBlocks].sort((left, right) => left.checkIn.localeCompare(right.checkIn));
}

function createInitialDraft(): CalendarEntryDraft {
  const tomorrow = addDays(new Date(), 1);
  const dayAfter = addDays(new Date(), 2);

  return {
    type: "reservation",
    blockStatus: "blocked",
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

function createReservationEditDraft(booking: Booking): ReservationEditDraft {
  return {
    roomId: booking.roomId,
    guestName: booking.guestName,
    guests: String(booking.guests),
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    status: booking.status
  };
}

function createBlockEditDraft(roomBlock: RoomBlock): BlockEditDraft {
  return {
    roomId: roomBlock.roomId,
    checkIn: roomBlock.checkIn,
    checkOut: roomBlock.checkOut,
    reason: roomBlock.reason,
    status: roomBlock.status
  };
}

function rangesOverlap(checkIn: string, checkOut: string, otherCheckIn: string, otherCheckOut: string) {
  return checkIn < otherCheckOut && otherCheckIn < checkOut;
}

function getDraftRangeSummary(checkIn: string, checkOut: string) {
  const inclusiveEnd = addDays(parseDate(checkOut), -1);

  return `${checkIn} - ${formatDateInput(inclusiveEnd)}`;
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
  const [drafts, setDrafts] = useState<Record<string, CalendarEntryDraft>>(() => buildInitialDrafts(rooms));
  const [createActionState, setCreateActionState] = useState<Record<string, ActionState>>({});
  const [editingReservationId, setEditingReservationId] = useState<string | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [reservationDrafts, setReservationDrafts] = useState<Record<string, ReservationEditDraft>>({});
  const [blockDrafts, setBlockDrafts] = useState<Record<string, BlockEditDraft>>({});
  const [reservationActionState, setReservationActionState] = useState<Record<string, ActionState>>({});
  const [blockActionState, setBlockActionState] = useState<Record<string, ActionState>>({});
  const [rangeDrafts, setRangeDrafts] = useState<Record<string, RangeDraftState>>({});
  const [rangeFeedback, setRangeFeedback] = useState<Record<string, string>>({});
  const [roomSearch, setRoomSearch] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => startOfMonth(new Date()));
  const calendarDays = getMonthDays(calendarMonth);

  function handleDraftChange(roomId: string, field: keyof CalendarEntryDraft, value: string) {
    setDrafts((current) => ({ ...current, [roomId]: { ...(current[roomId] ?? createInitialDraft()), [field]: value } }));
  }

  function setRangeFeedbackMessage(roomId: string, message: string) {
    setRangeFeedback((current) => ({ ...current, [roomId]: message }));
  }

  function isDraftRangeAvailable(
    roomBookings: Booking[],
    activeBlocks: RoomBlock[],
    checkIn: string,
    checkOut: string
  ) {
    if (checkIn >= checkOut) {
      return false;
    }

    const hasBookingConflict = roomBookings.some((booking) =>
      rangesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut)
    );
    const hasBlockConflict = activeBlocks.some((roomBlock) =>
      rangesOverlap(checkIn, checkOut, roomBlock.checkIn, roomBlock.checkOut)
    );

    return !hasBookingConflict && !hasBlockConflict;
  }

  function handleCalendarRangeClick(
    roomId: string,
    date: Date,
    roomBookings: Booking[],
    activeBlocks: RoomBlock[]
  ) {
    const roomDraft = drafts[roomId] ?? createInitialDraft();
    const dateKey = formatDateInput(date);
    const nextDateKey = formatDateInput(addDays(date, 1));
    const currentRangeState = rangeDrafts[roomId];
    const canStartOnDate = isDraftRangeAvailable(roomBookings, activeBlocks, dateKey, nextDateKey);

    if (!currentRangeState?.anchor) {
      if (!canStartOnDate) {
        setRangeFeedbackMessage(roomId, "Na ovom danu ne moze da pocne novi rucni unos. Izaberite slobodan dan.");
        return;
      }

      setRangeDrafts((current) => ({ ...current, [roomId]: { anchor: dateKey, touched: true } }));
      setDrafts((current) => ({
        ...current,
        [roomId]: { ...(current[roomId] ?? createInitialDraft()), checkIn: dateKey, checkOut: nextDateKey }
      }));
      setRangeFeedbackMessage(
        roomId,
        "Pocetak je izabran. Kliknite poslednji dan boravka ili blokade da se automatski popuni raspon."
      );
      return;
    }

    if (dateKey < currentRangeState.anchor) {
      if (!canStartOnDate) {
        setRangeFeedbackMessage(roomId, "Novi pocetak mora biti na slobodnom danu.");
        return;
      }

      setRangeDrafts((current) => ({ ...current, [roomId]: { anchor: dateKey, touched: true } }));
      setDrafts((current) => ({
        ...current,
        [roomId]: { ...(current[roomId] ?? createInitialDraft()), checkIn: dateKey, checkOut: nextDateKey }
      }));
      setRangeFeedbackMessage(roomId, "Pocetni dan je pomeren. Sada kliknite poslednji dan unosa.");
      return;
    }

    const anchorDate = currentRangeState.anchor;
    const checkOut = formatDateInput(addDays(date, 1));
    if (!anchorDate || !isDraftRangeAvailable(roomBookings, activeBlocks, anchorDate, checkOut)) {
      setRangeFeedbackMessage(roomId, "Izabrani raspon se preklapa sa rezervacijom ili blokadom. Probajte drugi kraj perioda.");
      return;
    }

    setDrafts((current) => ({
      ...current,
        [roomId]: {
          ...(current[roomId] ?? createInitialDraft()),
          checkIn: anchorDate,
          checkOut
        }
      }));
    setRangeDrafts((current) => ({ ...current, [roomId]: { anchor: null, touched: true } }));
    setRangeFeedbackMessage(
      roomId,
      `Raspon je spreman za unos: ${getDraftRangeSummary(anchorDate, checkOut)}.`
    );
  }

  function handleReservationDraftChange(reservationId: string, field: keyof ReservationEditDraft, value: string) {
    setReservationDrafts((current) => ({ ...current, [reservationId]: { ...current[reservationId], [field]: value } }));
  }

  function handleBlockDraftChange(blockId: string, field: keyof BlockEditDraft, value: string) {
    setBlockDrafts((current) => ({ ...current, [blockId]: { ...current[blockId], [field]: value } }));
  }

  async function handleCreateEntry(roomId: string) {
    const draft = drafts[roomId] ?? createInitialDraft();

    setCreateActionState((current) => ({
      ...current,
      [roomId]: { status: "submitting", message: draft.type === "reservation" ? "Dodajem rucnu rezervaciju..." : "Blokiram termin..." }
    }));

    const response = await fetch("/api/admin/calendar-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...draft,
        roomId,
        guests: Number(draft.guests || 1),
        createdBy: audience,
        status: draft.blockStatus
      })
    });

    const result = (await response.json()) as
      | { ok: true; message: string; reservation?: Booking; roomBlock?: RoomBlock; type: "reservation" | "block" }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setCreateActionState((current) => ({ ...current, [roomId]: { status: "error", message: result.message } }));
      return;
    }

    if (result.type === "reservation" && result.reservation && onBookingsChange) {
      onBookingsChange(sortBookings([...bookings, result.reservation]));
    }

    if (result.type === "block" && result.roomBlock && onRoomBlocksChange) {
      onRoomBlocksChange(sortRoomBlocks([...roomBlocks, result.roomBlock]));
    }

    setDrafts((current) => ({ ...current, [roomId]: { ...createInitialDraft(), type: draft.type } }));
    setRangeDrafts((current) => ({ ...current, [roomId]: { anchor: null, touched: false } }));
    setRangeFeedbackMessage(roomId, "Kliknite pocetni i poslednji dan da pripremite sledeci rucni unos.");
    setCreateActionState((current) => ({ ...current, [roomId]: { status: "success", message: result.message } }));
  }

  async function handleSaveReservation(reservationId: string) {
    const draft = reservationDrafts[reservationId];
    if (!draft) return;

    setReservationActionState((current) => ({ ...current, [reservationId]: { status: "submitting", message: "Cuvam izmene rezervacije..." } }));

    const response = await fetch(`/api/admin/reservations/${reservationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draft, actor: audience, guests: Number(draft.guests || 1) })
    });

    const result = (await response.json()) as
      | { ok: true; message: string; reservation: Booking }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setReservationActionState((current) => ({ ...current, [reservationId]: { status: "error", message: result.message } }));
      return;
    }

    if (onBookingsChange) {
      onBookingsChange(sortBookings(bookings.map((booking) => (booking.id === reservationId ? result.reservation : booking))));
    }

    setEditingReservationId(null);
    setReservationActionState((current) => ({ ...current, [reservationId]: { status: "success", message: result.message } }));
  }

  async function handleDeleteReservation(reservationId: string) {
    if (!window.confirm("Da li zelis da obrises ovu rezervaciju?")) return;

    setReservationActionState((current) => ({ ...current, [reservationId]: { status: "submitting", message: "Brisem rezervaciju..." } }));
    const response = await fetch(`/api/admin/reservations/${reservationId}?actor=${encodeURIComponent(audience)}`, { method: "DELETE" });
    const result = (await response.json()) as { ok: boolean; message: string };

    if (!response.ok || !result.ok) {
      setReservationActionState((current) => ({ ...current, [reservationId]: { status: "error", message: result.message } }));
      return;
    }

    if (onBookingsChange) onBookingsChange(bookings.filter((booking) => booking.id !== reservationId));
    setEditingReservationId(null);
    setReservationActionState((current) => ({ ...current, [reservationId]: { status: "success", message: result.message } }));
  }

  async function handleSaveBlock(blockId: string) {
    const draft = blockDrafts[blockId];
    if (!draft) return;

    setBlockActionState((current) => ({ ...current, [blockId]: { status: "submitting", message: "Cuvam izmene blokade..." } }));

    const response = await fetch(`/api/admin/room-blocks/${blockId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draft, actor: audience })
    });

    const result = (await response.json()) as
      | { ok: true; message: string; roomBlock: RoomBlock }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setBlockActionState((current) => ({ ...current, [blockId]: { status: "error", message: result.message } }));
      return;
    }

    if (onRoomBlocksChange) {
      onRoomBlocksChange(sortRoomBlocks(roomBlocks.map((roomBlock) => (roomBlock.id === blockId ? result.roomBlock : roomBlock))));
    }

    setEditingBlockId(null);
    setBlockActionState((current) => ({ ...current, [blockId]: { status: "success", message: result.message } }));
  }

  async function handleDeleteBlock(blockId: string) {
    if (!window.confirm("Da li zelis da obrises ovu blokadu?")) return;

    setBlockActionState((current) => ({ ...current, [blockId]: { status: "submitting", message: "Brisem blokadu..." } }));
    const response = await fetch(`/api/admin/room-blocks/${blockId}?actor=${encodeURIComponent(audience)}`, { method: "DELETE" });
    const result = (await response.json()) as { ok: boolean; message: string };

    if (!response.ok || !result.ok) {
      setBlockActionState((current) => ({ ...current, [blockId]: { status: "error", message: result.message } }));
      return;
    }

    if (onRoomBlocksChange) onRoomBlocksChange(roomBlocks.filter((roomBlock) => roomBlock.id !== blockId));
    setEditingBlockId(null);
    setBlockActionState((current) => ({ ...current, [blockId]: { status: "success", message: result.message } }));
  }

  function renderReservationCard(booking: Booking) {
    const draft = reservationDrafts[booking.id];

    if (editingReservationId === booking.id && draft) {
      return (
        <article key={booking.id} className="calendar-entry-card calendar-entry-card--editing">
          <div className="calendar-entry-editor">
            <div className="public-booking-form__grid">
              <select onChange={(event) => handleReservationDraftChange(booking.id, "roomId", event.target.value)} value={draft.roomId}>
                {rooms.map((room) => <option key={room.id} value={room.id}>{getRoomDisplayName(room)}</option>)}
              </select>
              <select onChange={(event) => handleReservationDraftChange(booking.id, "status", event.target.value)} value={draft.status}>
                {reservationStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="public-booking-form__grid">
              <input onChange={(event) => handleReservationDraftChange(booking.id, "guestName", event.target.value)} value={draft.guestName} />
              <input min="1" onChange={(event) => handleReservationDraftChange(booking.id, "guests", event.target.value)} type="number" value={draft.guests} />
            </div>
            <div className="public-booking-form__grid">
              <input onChange={(event) => handleReservationDraftChange(booking.id, "checkIn", event.target.value)} type="date" value={draft.checkIn} />
              <input onChange={(event) => handleReservationDraftChange(booking.id, "checkOut", event.target.value)} type="date" value={draft.checkOut} />
            </div>
            <div className="calendar-entry-actions">
              <button className="primary-button" onClick={() => void handleSaveReservation(booking.id)} type="button">Sacuvaj izmene</button>
              <button className="secondary-button" onClick={() => setEditingReservationId(null)} type="button">Odustani</button>
              <button className="secondary-button" onClick={() => void handleDeleteReservation(booking.id)} type="button">Obrisi</button>
            </div>
            <p className={`inline-note ${reservationActionState[booking.id]?.status === "error" ? "inline-note-error" : ""}`}>
              {reservationActionState[booking.id]?.message || "Izmena odmah proverava konflikte i azurira kalendar."}
            </p>
          </div>
        </article>
      );
    }

    return (
      <article key={booking.id} className="calendar-entry-card">
        <div>
          <strong>{isImportedClosedBooking(booking) ? "Booking.com zatvoren termin" : booking.guestName}</strong>
          <span>{booking.checkIn} - {booking.checkOut}</span>
        </div>
        <div className="calendar-entry-meta">
          <span>{isImportedClosedBooking(booking) ? "Booking.com import" : `${booking.guests} gosta`}</span>
          <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
        </div>
        <div className="calendar-entry-actions">
          <button className="secondary-button" onClick={() => { setEditingReservationId(booking.id); setReservationDrafts((current) => ({ ...current, [booking.id]: createReservationEditDraft(booking) })); }} type="button">Izmeni</button>
          <button className="secondary-button" onClick={() => void handleDeleteReservation(booking.id)} type="button">Obrisi</button>
        </div>
        {reservationActionState[booking.id]?.message ? <p className={`inline-note ${reservationActionState[booking.id]?.status === "error" ? "inline-note-error" : ""}`}>{reservationActionState[booking.id]?.message}</p> : null}
      </article>
    );
  }

  function renderBlockCard(roomBlock: RoomBlock) {
    const draft = blockDrafts[roomBlock.id];

    if (editingBlockId === roomBlock.id && draft) {
      return (
        <article key={roomBlock.id} className="calendar-entry-card calendar-entry-card--editing">
          <div className="calendar-entry-editor">
            <div className="public-booking-form__grid">
              <select onChange={(event) => handleBlockDraftChange(roomBlock.id, "roomId", event.target.value)} value={draft.roomId}>
                {rooms.map((room) => <option key={room.id} value={room.id}>{getRoomDisplayName(room)}</option>)}
              </select>
              <select onChange={(event) => handleBlockDraftChange(roomBlock.id, "status", event.target.value)} value={draft.status}>
                {roomBlockStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="public-booking-form__grid">
              <input onChange={(event) => handleBlockDraftChange(roomBlock.id, "checkIn", event.target.value)} type="date" value={draft.checkIn} />
              <input onChange={(event) => handleBlockDraftChange(roomBlock.id, "checkOut", event.target.value)} type="date" value={draft.checkOut} />
            </div>
            <textarea onChange={(event) => handleBlockDraftChange(roomBlock.id, "reason", event.target.value)} rows={3} value={draft.reason} />
            <div className="calendar-entry-actions">
              <button className="primary-button" onClick={() => void handleSaveBlock(roomBlock.id)} type="button">Sacuvaj izmene</button>
              <button className="secondary-button" onClick={() => setEditingBlockId(null)} type="button">Odustani</button>
              <button className="secondary-button" onClick={() => void handleDeleteBlock(roomBlock.id)} type="button">Obrisi</button>
            </div>
            <p className={`inline-note ${blockActionState[roomBlock.id]?.status === "error" ? "inline-note-error" : ""}`}>
              {blockActionState[roomBlock.id]?.message || "Blokada ne moze da preklapa rezervacije niti druge blokade."}
            </p>
          </div>
        </article>
      );
    }

    return (
      <article key={roomBlock.id} className="calendar-entry-card">
        <div><strong>{roomBlock.reason}</strong><span>{roomBlock.checkIn} - {roomBlock.checkOut}</span></div>
        <div className="calendar-entry-meta">
          <span>{roomBlock.createdBy}</span>
          <span className={`status-pill status-${roomBlock.status}`}>{roomBlock.status}</span>
        </div>
        <div className="calendar-entry-actions">
          <button className="secondary-button" onClick={() => { setEditingBlockId(roomBlock.id); setBlockDrafts((current) => ({ ...current, [roomBlock.id]: createBlockEditDraft(roomBlock) })); }} type="button">Izmeni</button>
          <button className="secondary-button" onClick={() => void handleDeleteBlock(roomBlock.id)} type="button">Obrisi</button>
        </div>
        {blockActionState[roomBlock.id]?.message ? <p className={`inline-note ${blockActionState[roomBlock.id]?.status === "error" ? "inline-note-error" : ""}`}>{blockActionState[roomBlock.id]?.message}</p> : null}
      </article>
    );
  }

  const filteredRooms = rooms.filter((room) => {
    const query = roomSearch.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      getRoomDisplayName(room).toLowerCase().includes(query) ||
      room.neighborhood.toLowerCase().includes(query) ||
      room.slug.toLowerCase().includes(query)
    );
  });

  return (
    <section className="dashboard-panel" id={sectionId}>
      <div className="section-heading wide">
        <div><p className="eyebrow">Interaktivni kalendar</p><h2>Kalendar, blokade i rucne rezervacije po sobi</h2></div>
        <span className="inline-note">Owner i staff mogu da dodaju, menjaju i brisu rezervacije i blokade direktno iz admina.</span>
      </div>
      <div className="calendar-legend">
        <span className="calendar-legend__item is-free">Slobodno</span>
        <span className="calendar-legend__item is-occupied">Zauzeto</span>
        <span className="calendar-legend__item is-arrival">Dolazak</span>
        <span className="calendar-legend__item is-departure">Odlazak</span>
        <span className="calendar-legend__item is-blocked">Blokirano</span>
      </div>
      <div className="interactive-room-calendar__tools">
        <input
          onChange={(event) => setRoomSearch(event.target.value)}
          placeholder="Pronadji sobu ili lokaciju..."
          type="search"
          value={roomSearch}
        />
        <div className="interactive-room-calendar__month-nav">
          <button
            className="secondary-button"
            onClick={() => setCalendarMonth((current) => addMonths(current, -1))}
            type="button"
          >
            Prethodni mesec
          </button>
          <strong>{monthLabelFormatter.format(calendarMonth)}</strong>
          <button
            className="secondary-button"
            onClick={() => setCalendarMonth((current) => addMonths(current, 1))}
            type="button"
          >
            Sledeci mesec
          </button>
        </div>
        <div className="interactive-room-calendar__quick-links">
          {filteredRooms.map((room) => (
            <a key={room.id} className="secondary-button" href={`#room-calendar-${room.id}`}>
              {getRoomDisplayName(room)}
            </a>
          ))}
        </div>
      </div>
      <div className="interactive-room-calendar">
        {rooms.length === 0 ? <div className="admin-empty-state"><strong>Jos nema soba u bazi</strong><p>Kada dodas prvu sobu, ovde ce se automatski pojaviti njen kalendar.</p></div> : null}
        {rooms.length > 0 && filteredRooms.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Nema rezultata za zadatu pretragu</strong>
            <p>Probajte naziv sobe, slug ili lokaciju kako biste brze nasli trazeni kalendar.</p>
          </div>
        ) : null}
        {filteredRooms.map((room) => {
          const roomDraft = drafts[room.id] ?? createInitialDraft();
          const roomBookings = sortBookings(bookings.filter((booking) => booking.roomId === room.id));
          const activeBlocks = sortRoomBlocks(roomBlocks.filter((block) => block.roomId === room.id));
          const rangeState = rangeDrafts[room.id];
          const inclusiveSelectionEnd = formatDateInput(addDays(parseDate(roomDraft.checkOut), -1));
          const hasVisibleSelection = Boolean(rangeState?.touched);

          return (
            <article key={room.id} className="interactive-room-calendar__card" id={`room-calendar-${room.id}`}>
              <div className="interactive-room-calendar__card-head">
                <div><strong>{getRoomDisplayName(room)}</strong><span>{room.neighborhood}</span></div>
                <span className="status-pill status-available">{roomBookings.length} rezervacija / {activeBlocks.length} blokada</span>
              </div>
              <div className="interactive-room-calendar__grid">
                {calendarDays.map((day) => {
                  const dateKey = formatDateInput(day);
                  const cell = getCalendarCellStatus(room, day, roomBookings, activeBlocks);
                  const isSelectionStart =
                    hasVisibleSelection && dateKey === (rangeState?.anchor ?? roomDraft.checkIn);
                  const isSelectionEnd = hasVisibleSelection && dateKey === inclusiveSelectionEnd;
                  const isSelectionRange =
                    hasVisibleSelection && dateKey > roomDraft.checkIn && dateKey < roomDraft.checkOut;

                  return (
                    <button
                      key={`${room.id}-${day.toISOString()}`}
                      className={`interactive-room-calendar__cell is-${cell.tone}${isSelectionStart ? " is-selected-start" : ""}${isSelectionEnd ? " is-selected-end" : ""}${isSelectionRange ? " is-selected-range" : ""}`}
                      onClick={() => handleCalendarRangeClick(room.id, day, roomBookings, activeBlocks)}
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
              <div className="interactive-room-calendar__form">
                <div className="public-booking-form__grid">
                  <select onChange={(event) => handleDraftChange(room.id, "type", event.target.value)} value={roomDraft.type}>
                    <option value="reservation">Rucna rezervacija</option>
                    <option value="block">Blokada termina</option>
                  </select>
                  {roomDraft.type === "reservation" ? (
                    <input min="1" onChange={(event) => handleDraftChange(room.id, "guests", event.target.value)} placeholder="Broj gostiju" type="number" value={roomDraft.guests} />
                  ) : (
                    <select onChange={(event) => handleDraftChange(room.id, "blockStatus", event.target.value)} value={roomDraft.blockStatus}>
                      {roomBlockStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  )}
                </div>
                <div className="public-booking-form__grid">
                  <input onChange={(event) => handleDraftChange(room.id, "checkIn", event.target.value)} type="date" value={roomDraft.checkIn} />
                  <input onChange={(event) => handleDraftChange(room.id, "checkOut", event.target.value)} type="date" value={roomDraft.checkOut} />
                </div>
                <p className="inline-note">
                  Kliknite pocetni dan pa poslednji dan u kalendaru iznad da automatski popunite raspon.
                </p>
                {roomDraft.type === "reservation" ? <input onChange={(event) => handleDraftChange(room.id, "guestName", event.target.value)} placeholder="Ime gosta" value={roomDraft.guestName} /> : null}
                <textarea onChange={(event) => handleDraftChange(room.id, "notes", event.target.value)} placeholder={roomDraft.type === "reservation" ? "Napomena za rucni unos rezervacije" : "Razlog blokade termina"} rows={3} value={roomDraft.notes} />
                <button className="primary-button" onClick={() => void handleCreateEntry(room.id)} type="button">{createActionState[room.id]?.status === "submitting" ? "Cuvanje..." : roomDraft.type === "reservation" ? "Dodaj rezervaciju" : "Blokiraj termin"}</button>
                <p className={`inline-note ${createActionState[room.id]?.status === "error" ? "inline-note-error" : ""}`}>{createActionState[room.id]?.message || "Svaki unos prolazi proveru konflikta sa postojecim rezervacijama i blokadama."}</p>
                <p className={`inline-note ${rangeFeedback[room.id]?.includes("ne moze") || rangeFeedback[room.id]?.includes("preklapa") ? "inline-note-error" : ""}`}>
                  {rangeFeedback[room.id] || "Klik-izbor raspona je aktivan za rucne rezervacije i blokade."}
                </p>
              </div>
              <div className="interactive-room-calendar__list-grid">
                <section className="calendar-entry-section">
                  <div className="calendar-entry-section__head"><strong>Rezervacije</strong><span>{roomBookings.length}</span></div>
                  {roomBookings.length === 0 ? <div className="calendar-entry-empty">Jos nema rezervacija za ovu sobu.</div> : <div className="calendar-entry-list">{roomBookings.map(renderReservationCard)}</div>}
                </section>
                <section className="calendar-entry-section">
                  <div className="calendar-entry-section__head"><strong>Blokade</strong><span>{activeBlocks.length}</span></div>
                  {activeBlocks.length === 0 ? <div className="calendar-entry-empty">Jos nema blokiranih termina za ovu sobu.</div> : <div className="calendar-entry-list">{activeBlocks.map(renderBlockCard)}</div>}
                </section>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
