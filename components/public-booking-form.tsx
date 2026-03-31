"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { RoomAvailabilityCalendar } from "@/components/room-availability-calendar";
import { getRoomDisplayName } from "@/lib/rooms";
import { Booking, BookingMode, Room, RoomBlock } from "@/lib/types";

type BookingSelectionPreset = {
  checkIn?: string;
  checkOut?: string;
  summary?: string | null;
};

type PublicBookingFormProps = {
  bookings?: Booking[];
  bookingMode?: BookingMode;
  defaultRoomSlug?: string;
  hideManualDateInputs?: boolean;
  hideRoomSelector?: boolean;
  lockedRoomSlug?: string;
  roomBlocks?: RoomBlock[];
  rooms: Room[];
  selectionPreset?: BookingSelectionPreset;
  showAvailabilityPreview?: boolean;
  subtitle?: string;
  title?: string;
};

type SubmitState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type FormState = {
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomSlug: string;
  message: string;
};

function getInitialFormState(params: {
  defaultRoomSlug?: string;
  lockedRoomSlug?: string;
  rooms: Room[];
  selectionPreset?: BookingSelectionPreset;
}) {
  return {
    phone: "",
    checkIn: params.selectionPreset?.checkIn ?? "",
    checkOut: params.selectionPreset?.checkOut ?? "",
    guests: "1",
    roomSlug: params.lockedRoomSlug ?? params.defaultRoomSlug ?? params.rooms[0]?.slug ?? "",
    message: ""
  };
}

function createIdleMessage(bookingMode: BookingMode, hasCalendarSelection: boolean) {
  if (bookingMode === "monthly") {
    return hasCalendarSelection
      ? "Izabran je mesecni boravak. Posaljite upit i javicemo vam se sa potvrdom."
      : "Izaberite mesece boravka iz kalendara pa zatim posaljite upit.";
  }

  return hasCalendarSelection
    ? "Izabrani termini su preuzeti iz kalendara. Ako je sve u redu, mozete odmah nastaviti dalje."
    : "Odaberite sobu i datume. Ako je termin slobodan, rezervacija se potvrduje odmah.";
}

export function PublicBookingForm({
  bookings = [],
  bookingMode = "daily",
  defaultRoomSlug,
  hideManualDateInputs = false,
  hideRoomSelector = false,
  lockedRoomSlug,
  roomBlocks = [],
  rooms,
  selectionPreset,
  showAvailabilityPreview = true,
  subtitle = "Odaberite sobu, proverite slobodne termine i odmah potvrdite rezervaciju.",
  title = "Rezervisite boravak"
}: PublicBookingFormProps) {
  const { data: session, status: sessionStatus } = useSession();
  const [formState, setFormState] = useState<FormState>(() =>
    getInitialFormState({ defaultRoomSlug, lockedRoomSlug, rooms, selectionPreset })
  );
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: createIdleMessage(bookingMode, Boolean(selectionPreset?.checkIn && selectionPreset?.checkOut))
  });
  const selectedRoom =
    rooms.find((room) => room.slug === (lockedRoomSlug ?? formState.roomSlug)) ?? rooms[0] ?? null;
  const selectionReady = Boolean(formState.checkIn && formState.checkOut);

  useEffect(() => {
    setFormState((currentValue) => ({
      ...currentValue,
      roomSlug: lockedRoomSlug ?? currentValue.roomSlug,
      checkIn: selectionPreset?.checkIn ?? currentValue.checkIn,
      checkOut: selectionPreset?.checkOut ?? currentValue.checkOut
    }));
  }, [lockedRoomSlug, selectionPreset?.checkIn, selectionPreset?.checkOut]);

  useEffect(() => {
    setSubmitState((currentValue) =>
      currentValue.status === "submitting"
        ? currentValue
        : {
            status: "idle",
            message: createIdleMessage(bookingMode, selectionReady)
          }
    );
  }, [bookingMode, selectionReady]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormState((currentValue) => ({
      ...currentValue,
      [name]: value
    }));
  };

  const buildMessagePayload = () => formState.message.trim();

  const resetForm = () => {
    setFormState((currentValue) => ({
      ...getInitialFormState({ defaultRoomSlug, lockedRoomSlug, rooms, selectionPreset }),
      phone: "",
      guests: "1",
      message: ""
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectionReady) {
      setSubmitState({
        status: "error",
        message: "Prvo izaberite period boravka iz kalendara ili unesite datume."
      });
      return;
    }

    if (bookingMode === "monthly") {
      await handleInquirySubmit();
      return;
    }

    if (!session?.user) {
      await signIn("google", {
        callbackUrl: `${window.location.pathname}${window.location.hash || "#booking"}`
      });
      return;
    }

    setSubmitState({
      status: "submitting",
      message: "Proveravamo termin i potvrdjujemo rezervaciju..."
    });

    const response = await fetch("/api/public/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formState,
        notes: [
          buildMessagePayload(),
          selectionPreset?.summary ? `Izabrani period: ${selectionPreset.summary}` : null
        ]
          .filter(Boolean)
          .join("\n\n"),
        guests: Number(formState.guests || 1)
      })
    });

    const result = (await response.json()) as
      | { ok: true; message: string; booking?: Booking }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setSubmitState({
        status: "error",
        message: result.message
      });
      return;
    }

    setSubmitState({
      status: "success",
      message: result.booking
        ? `${result.message} Referenca: ${result.booking.id}`
        : result.message
    });
    resetForm();
  };

  const handleInquirySubmit = async () => {
    if (!selectionReady) {
      setSubmitState({
        status: "error",
        message: "Prvo izaberite odgovarajuci period iz kalendara."
      });
      return;
    }

    setSubmitState({
      status: "submitting",
      message: bookingMode === "monthly" ? "Saljemo mesecni upit..." : "Saljemo inquiry..."
    });

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formState,
        bookingMode,
        guestName: session?.user?.name || session?.user?.email || "Gost sajta",
        message: buildMessagePayload(),
        selectionSummary: selectionPreset?.summary ?? null
      })
    });

    const result = (await response.json()) as
      | { ok: true; message: string }
      | { ok: false; message: string };

    setSubmitState({
      status: response.ok && result.ok ? "success" : "error",
      message: result.message
    });

    if (response.ok && result.ok) {
      resetForm();
    }
  };

  return (
    <div className="public-booking-card">
      <div className="public-booking-card__header">
        <p className="public-booking-card__eyebrow">
          {bookingMode === "monthly" ? "Mesecni upit" : "Direktan booking"}
        </p>
        <h3>{title}</h3>
        <p className="public-booking-card__intro">{subtitle}</p>
      </div>
      <form className="public-booking-form" onSubmit={handleSubmit}>
        {session?.user ? (
          <div className="public-booking-form__signed-in">
            <strong>{session.user.name || session.user.email}</strong>
            <span>{session.user.email}</span>
          </div>
        ) : (
          <div className="public-booking-form__signed-out">
            <strong>
              {bookingMode === "monthly"
                ? "Google login nije obavezan za mesecni upit."
                : "Google login je potreban za potvrdu rezervacije."}
            </strong>
            <span>
              {bookingMode === "monthly"
                ? "Za mesecni najam dovoljno je da popunite kontakt i izabrani period."
                : "Formu mozete popuniti odmah, a login se trazi tek na finalnom koraku."}
            </span>
          </div>
        )}
        {selectedRoom ? (
          <div className="public-booking-form__signed-out">
            <strong>{getRoomDisplayName(selectedRoom)}</strong>
            <span>
              {selectedRoom.capacity} gosta - {selectedRoom.beds} - {selectedRoom.pricePerNight} EUR / noc
            </span>
          </div>
        ) : null}
        <input
          name="phone"
          onChange={handleChange}
          placeholder="Telefon / WhatsApp"
          required
          value={formState.phone}
        />
        {hideManualDateInputs ? (
          <>
            <input name="checkIn" readOnly type="hidden" value={formState.checkIn} />
            <input name="checkOut" readOnly type="hidden" value={formState.checkOut} />
            <div className="public-booking-form__selection-card">
              <strong>Izabrani period</strong>
              <span>
                {selectionPreset?.summary ??
                  (selectionReady
                    ? `${formState.checkIn} - ${formState.checkOut}`
                    : "Izaberite period iz interaktivnog kalendara levo.")}
              </span>
            </div>
          </>
        ) : (
          <div className="public-booking-form__grid">
            <input
              name="checkIn"
              onChange={handleChange}
              required
              type="date"
              value={formState.checkIn}
            />
            <input
              name="checkOut"
              onChange={handleChange}
              required
              type="date"
              value={formState.checkOut}
            />
          </div>
        )}
        <div className="public-booking-form__grid">
          {hideRoomSelector ? (
            <input name="roomSlug" readOnly type="hidden" value={formState.roomSlug} />
          ) : (
            <select name="roomSlug" onChange={handleChange} required value={formState.roomSlug}>
              {rooms.map((room) => (
                <option key={room.id} value={room.slug}>
                  {getRoomDisplayName(room)}
                </option>
              ))}
            </select>
          )}
          <input
            min="1"
            name="guests"
            onChange={handleChange}
            required
            type="number"
            value={formState.guests}
          />
        </div>
        {showAvailabilityPreview && selectedRoom ? (
          <div className="public-booking-form__availability">
            <div className="public-booking-form__availability-head">
              <div>
                <span className="public-booking-form__availability-label">
                  Dostupnost izabrane sobe
                </span>
                <strong>{getRoomDisplayName(selectedRoom)}</strong>
              </div>
              <Link className="text-link" href={`/rooms/${selectedRoom.slug}`}>
                Otvori stranicu sobe
              </Link>
            </div>
            <div className="public-booking-form__availability-meta">
              <span>{selectedRoom.capacity} gosta</span>
              <span>{selectedRoom.beds}</span>
              <span>{selectedRoom.pricePerNight} EUR / noc</span>
            </div>
            <RoomAvailabilityCalendar
              bookings={bookings}
              days={14}
              room={selectedRoom}
              roomBlocks={roomBlocks}
            />
          </div>
        ) : null}
        <textarea
          name="message"
          onChange={handleChange}
          placeholder={
            bookingMode === "monthly"
              ? "Napisite koliko osoba dolazi, da li je potreban parking, kuhinja ili duzi boravak za radnike..."
              : "Napomena za boravak, broj radnika, parking, kasniji dolazak..."
          }
          rows={5}
          value={formState.message}
        />
        <div className="public-booking-form__actions">
          {bookingMode === "monthly" ? (
            <button
              className="public-booking-form__submit"
              disabled={!selectionReady || submitState.status === "submitting"}
              onClick={() => void handleInquirySubmit()}
              type="button"
            >
              {submitState.status === "submitting" ? "Slanje upita..." : "Posalji mesecni upit"}
            </button>
          ) : (
            <>
              <button
                className="public-booking-form__submit"
                disabled={!selectionReady || submitState.status === "submitting"}
                type="submit"
              >
                {submitState.status === "submitting"
                  ? "Rezervacija u toku..."
                  : sessionStatus === "loading"
                    ? "Ucitavanje naloga..."
                    : session?.user
                      ? "Potvrdi rezervaciju"
                      : "Nastavi sa Google login-om"}
              </button>
              <button
                className="secondary-button"
                disabled={!selectionReady || submitState.status === "submitting"}
                onClick={() => void handleInquirySubmit()}
                type="button"
              >
                Pitaj pre rezervacije
              </button>
            </>
          )}
        </div>
        <p className={`public-booking-form__status is-${submitState.status}`}>{submitState.message}</p>
      </form>
    </div>
  );
}
