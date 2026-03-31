"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { getRoomDisplayName } from "@/lib/rooms";
import { DEFAULT_ROOM_LOCATION } from "@/lib/site-config";
import type { Room, RoomChannelMapping } from "@/lib/types";

const initialForm = {
  roomNumber: "",
  pricePerNight: "",
  capacity: "",
  beds: "",
  shortDescription: ""
};

type UploadState = {
  message: string;
  status: "idle" | "uploading" | "success" | "error";
  url?: string;
};

type RoomActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type OwnerRoomsManagerProps = {
  initialMappings?: RoomChannelMapping[];
  initialRooms: Room[];
};

export function OwnerRoomsManager({
  initialMappings = [],
  initialRooms
}: OwnerRoomsManagerProps) {
  const [form, setForm] = useState(initialForm);
  const [localRooms, setLocalRooms] = useState(initialRooms);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    message: "Dodaj sliku sobe pre cuvanja kako bi se uploadovala na Vercel Blob."
  });
  const [roomActionState, setRoomActionState] = useState<RoomActionState>({
    status: "idle",
    message: `Sve sobe se automatski cuvaju na lokaciji ${DEFAULT_ROOM_LOCATION}.`
  });

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;

    setSelectedImage(nextFile);
    setUploadState({
      status: "idle",
      message: nextFile
        ? `Spremna za upload: ${nextFile.name}`
        : "Dodaj sliku sobe pre cuvanja kako bi se uploadovala na Vercel Blob."
    });
  }

  async function uploadRoomImage(file: File) {
    const body = new FormData();

    body.append("file", file);
    body.append("folder", "rooms");

    const response = await fetch("/api/upload-room-image", {
      method: "POST",
      body
    });

    const result = (await response.json()) as
      | { ok: true; url: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      throw new Error(result.ok ? "Upload nije uspeo." : result.message);
    }

    return result.url;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setRoomActionState({
      status: "submitting",
      message: "Cuvam sobu..."
    });

    let uploadedImageUrl = "/images/isar-studio.jpg";

    if (selectedImage) {
      setUploadState({
        status: "uploading",
        message: "Uploadujem sliku na Vercel Blob..."
      });

      try {
        uploadedImageUrl = await uploadRoomImage(selectedImage);
        setUploadState({
          status: "success",
          message: "Slika je uspesno uploadovana.",
          url: uploadedImageUrl
        });
      } catch (error) {
        setUploadState({
          status: "error",
          message: error instanceof Error ? error.message : "Upload nije uspeo."
        });
        setRoomActionState({
          status: "error",
          message: "Soba nije sacuvana zato sto upload slike nije uspeo."
        });
        return;
      }
    }

    const response = await fetch("/api/admin/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        image: uploadedImageUrl,
        pricePerNight: Number(form.pricePerNight || 0),
        capacity: Number(form.capacity || 1),
        amenities: [
          "Wi-Fi",
          "Kupatilo",
          selectedImage ? "Slika sacuvana na Vercel Blob" : "Spremno za Booking.com mapiranje"
        ]
      })
    });

    const result = (await response.json()) as
      | { ok: true; room: Room }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setRoomActionState({
        status: "error",
        message: "message" in result ? result.message : "Nismo uspeli da sacuvamo sobu."
      });
      return;
    }

    setLocalRooms((current) => [result.room, ...current]);
    setSelectedImage(null);
    setForm(initialForm);
    setRoomActionState({
      status: "success",
      message: "Soba je uspesno sacuvana."
    });
  }

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Sobe</p>
        <h1>Dodavanje i pregled smestajnih jedinica</h1>
        <p>
          Lokacija se vise ne unosi rucno jer su sve sobe na istoj adresi:
          {" "}
          {DEFAULT_ROOM_LOCATION}.
        </p>
      </section>

      <div className="dashboard-split-grid">
        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Nova soba</p>
              <h2>Dodaj novu sobu</h2>
            </div>
          </div>
          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              name="roomNumber"
              onChange={handleChange}
              placeholder="Broj sobe"
              required
              value={form.roomNumber}
            />
            <input
              name="pricePerNight"
              onChange={handleChange}
              placeholder="Cena po noci"
              required
              type="number"
              value={form.pricePerNight}
            />
            <input
              name="capacity"
              onChange={handleChange}
              placeholder="Kapacitet"
              required
              type="number"
              value={form.capacity}
            />
            <input
              name="beds"
              onChange={handleChange}
              placeholder="Tip kreveta"
              required
              value={form.beds}
            />
            <textarea
              name="shortDescription"
              onChange={handleChange}
              placeholder="Kratak opis smestaja"
              required
              rows={4}
              value={form.shortDescription}
            />
            <label className="admin-file-field">
              <span>Slika sobe (opciono)</span>
              <input
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                type="file"
              />
            </label>
            <p className={`inline-note ${uploadState.status === "error" ? "inline-note-error" : ""}`}>
              {uploadState.message}
            </p>
            <button className="primary-button" type="submit">
              {roomActionState.status === "submitting" || uploadState.status === "uploading"
                ? "Cuvanje u toku..."
                : "Sacuvaj sobu"}
            </button>
            <p className={`inline-note ${roomActionState.status === "error" ? "inline-note-error" : ""}`}>
              {roomActionState.message}
            </p>
          </form>
        </section>

        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Inventar</p>
              <h2>Aktivne jedinice</h2>
            </div>
          </div>
          {localRooms.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Jos nema soba u bazi</strong>
              <p>Dodaj prvu sobu da bi se pojavila u kalendaru i javnom sajtu.</p>
            </div>
          ) : (
            <div className="table-like">
              {localRooms.map((room) => {
                const mapping = initialMappings.find((item) => item.roomId === room.id);

                return (
                  <div key={room.id} className="table-row">
                    <div>
                      <strong>{getRoomDisplayName(room)}</strong>
                      <span>{DEFAULT_ROOM_LOCATION}</span>
                    </div>
                    <div>{room.capacity} gosta</div>
                    <div>{room.pricePerNight} EUR</div>
                    <div className="admin-inline-actions">
                      <span className={`status-pill status-${room.status}`}>{room.status}</span>
                      <span className={`status-pill ${mapping?.syncEnabled ? "status-mapped" : "status-unmapped"}`}>
                        {mapping?.syncEnabled ? "Booking.com" : "bez sync-a"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
