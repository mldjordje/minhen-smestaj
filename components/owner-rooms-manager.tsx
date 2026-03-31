"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { getRoomDisplayName } from "@/lib/rooms";
import { DEFAULT_ROOM_LOCATION } from "@/lib/site-config";
import type { Room, RoomChannelMapping } from "@/lib/types";

const initialForm = {
  beds: "",
  capacity: "",
  image: "",
  pricePerNight: "",
  roomNumber: "",
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

function buildFormFromRoom(room: Room) {
  return {
    beds: room.beds,
    capacity: String(room.capacity),
    image: room.image,
    pricePerNight: String(room.pricePerNight),
    roomNumber: getRoomDisplayName(room).replace(/^Soba\s+/i, "").trim(),
    shortDescription: room.shortDescription
  };
}

export function OwnerRoomsManager({
  initialMappings = [],
  initialRooms
}: OwnerRoomsManagerProps) {
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [localMappings, setLocalMappings] = useState(initialMappings);
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

  const isEditing = Boolean(editingRoomId);

  function resetRoomForm(nextMessage?: string) {
    setEditingRoomId(null);
    setForm(initialForm);
    setSelectedImage(null);
    setUploadState({
      status: "idle",
      message: "Dodaj sliku sobe pre cuvanja kako bi se uploadovala na Vercel Blob."
    });
    setRoomActionState({
      status: nextMessage ? "success" : "idle",
      message: nextMessage ?? `Sve sobe se automatski cuvaju na lokaciji ${DEFAULT_ROOM_LOCATION}.`
    });
  }

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
        : isEditing
          ? "Ako ne izaberes novu sliku, ostace trenutna slika sobe."
          : "Dodaj sliku sobe pre cuvanja kako bi se uploadovala na Vercel Blob."
    });
  }

  function handleEditRoom(room: Room) {
    setEditingRoomId(room.id);
    setForm(buildFormFromRoom(room));
    setSelectedImage(null);
    setUploadState({
      status: "idle",
      message: "Po potrebi izaberi novu sliku. Ako preskocis upload, ostace postojeca."
    });
    setRoomActionState({
      status: "idle",
      message: `Uredjujes ${getRoomDisplayName(room)}. Posle cuvanja izmene ce odmah biti vidljive u adminu.`
    });
  }

  function handleCancelEditing() {
    resetRoomForm();
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
      message: isEditing ? "Cuvam izmene sobe..." : "Cuvam sobu..."
    });

    let uploadedImageUrl = form.image.trim() || "/images/isar-studio.jpg";

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
          message: isEditing
            ? "Izmene nisu sacuvane zato sto upload slike nije uspeo."
            : "Soba nije sacuvana zato sto upload slike nije uspeo."
        });
        return;
      }
    }

    const existingRoom = editingRoomId
      ? localRooms.find((room) => room.id === editingRoomId) ?? null
      : null;

    const response = await fetch(
      editingRoomId ? `/api/admin/rooms/${editingRoomId}` : "/api/admin/rooms",
      {
        method: editingRoomId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          image: uploadedImageUrl,
          pricePerNight: Number(form.pricePerNight || 0),
          capacity: Number(form.capacity || 1),
          amenities:
            existingRoom?.amenities?.length
              ? existingRoom.amenities
              : [
                  "Wi-Fi",
                  "Kupatilo",
                  selectedImage
                    ? "Slika sacuvana na Vercel Blob"
                    : "Spremno za Booking.com mapiranje"
                ]
        })
      }
    );

    const result = (await response.json()) as
      | { ok: true; room: Room; message?: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setRoomActionState({
        status: "error",
        message:
          "message" in result && typeof result.message === "string"
            ? result.message
            : "Nismo uspeli da sacuvamo sobu."
      });
      return;
    }

    if (editingRoomId) {
      setLocalRooms((current) =>
        current.map((room) => (room.id === result.room.id ? result.room : room))
      );
      resetRoomForm(result.message ?? "Izmene sobe su uspesno sacuvane.");
      return;
    }

    setLocalRooms((current) => [result.room, ...current]);
    setLocalMappings((current) => current.filter((mapping) => mapping.roomId !== result.room.id));
    resetRoomForm(result.message ?? "Soba je uspesno sacuvana.");
  }

  async function handleDeleteRoom(room: Room) {
    const shouldDelete = window.confirm(
      `Obrisi ${getRoomDisplayName(room)}? Brisanje je dozvoljeno samo ako soba nema rezervacije, blokade i taskove.`
    );

    if (!shouldDelete) {
      return;
    }

    setRoomActionState({
      status: "submitting",
      message: `Brisem ${getRoomDisplayName(room)}...`
    });

    const response = await fetch(`/api/admin/rooms/${room.id}`, {
      method: "DELETE"
    });

    const result = (await response.json()) as
      | { ok: true; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setRoomActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalRooms((current) => current.filter((entry) => entry.id !== room.id));
    setLocalMappings((current) => current.filter((mapping) => mapping.roomId !== room.id));

    if (editingRoomId === room.id) {
      setEditingRoomId(null);
      setForm(initialForm);
      setSelectedImage(null);
    }

    setUploadState({
      status: "idle",
      message: "Dodaj sliku sobe pre cuvanja kako bi se uploadovala na Vercel Blob."
    });
    setRoomActionState({
      status: "success",
      message: result.message
    });
  }

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Sobe</p>
        <h1>Dodavanje, izmena i pregled smestajnih jedinica</h1>
        <p>
          Lokacija se vise ne unosi rucno jer su sve sobe na istoj adresi:
          {" "}
          {DEFAULT_ROOM_LOCATION}. U ovom panelu sada mozes da dodas, izmenis i obrises
          postojecu sobu.
        </p>
      </section>

      <div className="dashboard-split-grid">
        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{isEditing ? "Izmena sobe" : "Nova soba"}</p>
              <h2>{isEditing ? "Uredi postojecu sobu" : "Dodaj novu sobu"}</h2>
            </div>
            {isEditing ? (
              <button className="secondary-button" onClick={handleCancelEditing} type="button">
                Odustani od izmene
              </button>
            ) : null}
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
              {uploadState.url ? (
                <>
                  {" "}
                  <a href={uploadState.url} rel="noreferrer" target="_blank">
                    Otvori upload
                  </a>
                </>
              ) : null}
            </p>
            <button className="primary-button" type="submit">
              {roomActionState.status === "submitting" || uploadState.status === "uploading"
                ? "Cuvanje u toku..."
                : isEditing
                  ? "Sacuvaj izmene"
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
            <span className="inline-note">
              Obrisi je dozvoljeno samo za sobe bez rezervacija, blokada i taskova.
            </span>
          </div>
          {localRooms.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Jos nema soba u bazi</strong>
              <p>Dodaj prvu sobu da bi se pojavila u kalendaru i javnom sajtu.</p>
            </div>
          ) : (
            <div className="table-like">
              {localRooms.map((room) => {
                const mapping = localMappings.find((item) => item.roomId === room.id);

                return (
                  <div key={room.id} className="table-row">
                    <div>
                      <strong>{getRoomDisplayName(room)}</strong>
                      <span>{DEFAULT_ROOM_LOCATION}</span>
                    </div>
                    <div>
                      {room.capacity} gosta
                      <span>{room.beds}</span>
                    </div>
                    <div>
                      {room.pricePerNight} EUR
                      <span>{room.shortDescription}</span>
                    </div>
                    <div className="admin-inline-actions admin-inline-actions--wrap">
                      <span className={`status-pill status-${room.status}`}>{room.status}</span>
                      <span className={`status-pill ${mapping?.syncEnabled ? "status-mapped" : "status-unmapped"}`}>
                        {mapping?.syncEnabled ? "Booking.com" : "bez sync-a"}
                      </span>
                      <button className="secondary-button" onClick={() => handleEditRoom(room)} type="button">
                        Edit
                      </button>
                      <button className="secondary-button" onClick={() => void handleDeleteRoom(room)} type="button">
                        Delete
                      </button>
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
