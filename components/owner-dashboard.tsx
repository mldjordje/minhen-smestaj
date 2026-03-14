"use client";

import { useState } from "react";
import { bookings, bookingSyncSummary, rooms } from "@/lib/data";
import { Room } from "@/lib/types";

const initialForm = {
  name: "",
  neighborhood: "",
  pricePerNight: "",
  capacity: "",
  beds: "",
  shortDescription: ""
};

export function OwnerDashboard() {
  const [form, setForm] = useState(initialForm);
  const [localRooms, setLocalRooms] = useState<Room[]>(rooms);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextRoom: Room = {
      id: `local-${Date.now()}`,
      slug: form.name.toLowerCase().trim().replaceAll(" ", "-"),
      name: form.name,
      neighborhood: form.neighborhood,
      pricePerNight: Number(form.pricePerNight || 0),
      capacity: Number(form.capacity || 1),
      beds: form.beds,
      shortDescription: form.shortDescription,
      status: "available",
      image: "/images/isar-studio.jpg",
      amenities: ["Wi-Fi", "Vercel Blob upload - pending"]
    };

    setLocalRooms((current) => [nextRoom, ...current]);
    setForm(initialForm);
  }

  const occupiedCount = localRooms.filter((room) => room.status === "occupied").length;
  const cleaningCount = localRooms.filter((room) => room.status === "cleaning").length;
  const arrivalsToday = bookings.filter((booking) => booking.status === "arriving").length;

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Owner control panel</p>
        <h1>Pregled svih jedinica, rezervacija i Booking.com sinhronizacije</h1>
        <p>
          Ovo je prvi operativni ekran za vlasnika. Dodavanje sobe trenutno radi u
          UI-u, a sledeci korak je cuvanje u bazi i upload slika na Vercel Blob.
        </p>
        <div className="stats-row">
          <div className="stat-card">
            <span>Ukupno soba</span>
            <strong>{localRooms.length}</strong>
          </div>
          <div className="stat-card">
            <span>Zauzeto</span>
            <strong>{occupiedCount}</strong>
          </div>
          <div className="stat-card">
            <span>Ciscenje</span>
            <strong>{cleaningCount}</strong>
          </div>
          <div className="stat-card">
            <span>Danasnji dolasci</span>
            <strong>{arrivalsToday}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sobe</p>
            <h2>Dodaj novu sobu</h2>
          </div>
          <span className="inline-note">Kasnije vezujemo na bazu i Vercel Blob upload.</span>
        </div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Naziv sobe"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="neighborhood"
            placeholder="Lokacija u Minhenu"
            value={form.neighborhood}
            onChange={handleChange}
            required
          />
          <input
            name="pricePerNight"
            placeholder="Cena po noci"
            type="number"
            value={form.pricePerNight}
            onChange={handleChange}
            required
          />
          <input
            name="capacity"
            placeholder="Kapacitet"
            type="number"
            value={form.capacity}
            onChange={handleChange}
            required
          />
          <input
            name="beds"
            placeholder="Tip kreveta"
            value={form.beds}
            onChange={handleChange}
            required
          />
          <textarea
            name="shortDescription"
            placeholder="Kratak opis smestaja"
            value={form.shortDescription}
            onChange={handleChange}
            rows={4}
            required
          />
          <button type="submit" className="primary-button">
            Sacuvaj sobu
          </button>
        </form>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Inventar</p>
            <h2>Aktivne jedinice</h2>
          </div>
        </div>
        <div className="table-like">
          {localRooms.map((room) => (
            <div key={room.id} className="table-row">
              <div>
                <strong>{room.name}</strong>
                <span>{room.neighborhood}</span>
              </div>
              <div>{room.capacity} gosta</div>
              <div>{room.pricePerNight} EUR</div>
              <div>
                <span className={`status-pill status-${room.status}`}>{room.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Integracije</p>
            <h2>Booking.com sync status</h2>
          </div>
        </div>
        <div className="sync-card">
          <div className="sync-item">
            <span>Provider</span>
            <strong>{bookingSyncSummary.provider}</strong>
          </div>
          <div className="sync-item">
            <span>Poslednji sync</span>
            <strong>{bookingSyncSummary.lastSuccessfulSync}</strong>
          </div>
          <div className="sync-item">
            <span>Pending updates</span>
            <strong>{bookingSyncSummary.pendingUpdates}</strong>
          </div>
          <p>{bookingSyncSummary.note}</p>
        </div>
      </section>
    </div>
  );
}
