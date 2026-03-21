"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { RoomAvailabilityCalendar } from "@/components/room-availability-calendar";
import { getRoomDisplayName } from "@/lib/rooms";
import { Booking, Room, RoomBlock } from "@/lib/types";

type PublicBookingFormProps = {
  bookings?: Booking[];
  defaultRoomSlug?: string;
  roomBlocks?: RoomBlock[];
  rooms: Room[];
  showAvailabilityPreview?: boolean;
  subtitle?: string;
  title?: string;
};

type SubmitState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

export function PublicBookingForm({
  bookings = [],
  defaultRoomSlug,
  roomBlocks = [],
  rooms,
  showAvailabilityPreview = true,
  subtitle = "Odaberite sobu, proverite slobodne termine i odmah potvrdite rezervaciju.",
  title = "Rezervisite boravak"
}: PublicBookingFormProps) {
  const { data: session, status: sessionStatus } = useSession();
  const [formState, setFormState] = useState({
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    roomSlug: defaultRoomSlug ?? rooms[0]?.slug ?? "",
    message: ""
  });
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "Odaberite sobu i datume. Ako je termin slobodan, rezervacija se potvrduje odmah."
  });
  const selectedRoom = rooms.find((room) => room.slug === formState.roomSlug) ?? rooms[0] ?? null;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormState((currentValue) => ({
      ...currentValue,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    setFormState({
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "1",
      roomSlug: defaultRoomSlug ?? rooms[0]?.slug ?? "",
      message: ""
    });
  };

  const handleInquirySubmit = async () => {
    setSubmitState({
      status: "submitting",
      message: "Saljemo inquiry..."
    });

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formState,
        guestName: session?.user?.name || session?.user?.email || "Gost sajta"
      })
    });

    const result = (await response.json()) as
      | { ok: true; message: string }
      | { ok: false; message: string };

    setSubmitState({
      status: response.ok && result.ok ? "success" : "error",
      message: result.message
    });
  };

  return (
    <div className="public-booking-card">
      <div className="public-booking-card__header">
        <p className="public-booking-card__eyebrow">Direktan booking</p>
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
            <strong>Google login je potreban za potvrdu rezervacije.</strong>
            <span>Formu mozete popuniti odmah, a login se trazi tek na finalnom koraku.</span>
          </div>
        )}
        <input
          name="phone"
          onChange={handleChange}
          placeholder="Telefon / WhatsApp"
          required
          value={formState.phone}
        />
        <div className="public-booking-form__grid">
          <input name="checkIn" onChange={handleChange} required type="date" value={formState.checkIn} />
          <input
            name="checkOut"
            onChange={handleChange}
            required
            type="date"
            value={formState.checkOut}
          />
        </div>
        <div className="public-booking-form__grid">
          <select name="roomSlug" onChange={handleChange} required value={formState.roomSlug}>
            {rooms.map((room) => (
              <option key={room.id} value={room.slug}>
                {getRoomDisplayName(room)}
              </option>
            ))}
          </select>
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
          placeholder="Napomena za boravak, broj radnika, parking, kasniji dolazak..."
          rows={5}
          value={formState.message}
        />
        <div className="public-booking-form__actions">
          <button className="public-booking-form__submit" type="submit">
            {submitState.status === "submitting"
              ? "Rezervacija u toku..."
              : sessionStatus === "loading"
                ? "Ucitavanje naloga..."
                : session?.user
                  ? "Potvrdi rezervaciju"
                  : "Nastavi sa Google login-om"}
          </button>
          <button className="secondary-button" onClick={() => void handleInquirySubmit()} type="button">
            Pitaj pre rezervacije
          </button>
        </div>
        <p className={`public-booking-form__status is-${submitState.status}`}>{submitState.message}</p>
      </form>
    </div>
  );
}
