"use client";

import { useState } from "react";
import { Room } from "@/lib/types";

type PublicBookingFormProps = {
  defaultRoomSlug?: string;
  rooms: Room[];
  title?: string;
};

type SubmitState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

export function PublicBookingForm({
  defaultRoomSlug,
  rooms,
  title = "Posaljite upit za rezervaciju"
}: PublicBookingFormProps) {
  const [formState, setFormState] = useState({
    guestName: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    roomSlug: defaultRoomSlug ?? rooms[0]?.slug ?? "",
    message: ""
  });
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "Odaberite sobu i datume, a mi vam potvrdu saljemo sto pre."
  });

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

    setSubmitState({
      status: "submitting",
      message: "Saljemo upit..."
    });

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formState)
    });

    const result = (await response.json()) as
      | { ok: true; message: string }
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
      message: result.message
    });
    setFormState({
      guestName: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "1",
      roomSlug: defaultRoomSlug ?? rooms[0]?.slug ?? "",
      message: ""
    });
  };

  return (
    <div className="public-booking-card">
      <div className="public-booking-card__header">
        <p className="public-booking-card__eyebrow">Direktan upit</p>
        <h3>{title}</h3>
      </div>
      <form className="public-booking-form" onSubmit={handleSubmit}>
        <input
          name="guestName"
          onChange={handleChange}
          placeholder="Ime i prezime"
          required
          value={formState.guestName}
        />
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
                {room.name}
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
        <textarea
          name="message"
          onChange={handleChange}
          placeholder="Dodatne informacije, broj radnika, parking, duzi boravak..."
          rows={5}
          value={formState.message}
        />
        <p
          className={`public-booking-form__status is-${submitState.status}`}
        >
          {submitState.message}
        </p>
        <button className="public-booking-form__submit" type="submit">
          {submitState.status === "submitting" ? "Slanje..." : "Posalji upit"}
        </button>
      </form>
    </div>
  );
}
