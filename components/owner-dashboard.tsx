"use client";

import Link from "next/link";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { bookingSyncSummary } from "@/lib/data";
import { addDays, getCalendarCellStatus } from "@/lib/availability";
import { Booking, Inquiry, Room, RoomChannelMapping } from "@/lib/types";

const initialForm = {
  name: "",
  neighborhood: "",
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

type InquiryActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type RoomActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type MappingDraft = {
  exportUrl: string;
  externalRoomId: string;
  externalRoomName: string;
  importUrl: string;
  syncEnabled: boolean;
};

const dayLabelFormatter = new Intl.DateTimeFormat("sr-RS", {
  day: "2-digit",
  month: "2-digit"
});

const weekdayFormatter = new Intl.DateTimeFormat("sr-RS", {
  weekday: "short"
});

type OwnerDashboardProps = {
  bookings: Booking[];
  inquiries: Inquiry[];
  roomChannelMappings: RoomChannelMapping[];
  rooms: Room[];
};

function createMappingDraft(mapping?: RoomChannelMapping): MappingDraft {
  return {
    externalRoomId: mapping?.externalRoomId ?? "",
    externalRoomName: mapping?.externalRoomName ?? "",
    exportUrl: mapping?.exportUrl ?? "",
    importUrl: mapping?.importUrl ?? "",
    syncEnabled: mapping?.syncEnabled ?? false
  };
}

function buildInitialMappingDrafts(rooms: Room[], mappings: RoomChannelMapping[]) {
  return Object.fromEntries(
    rooms.map((room) => {
      const mapping = mappings.find((item) => item.roomId === room.id);
      return [room.id, createMappingDraft(mapping)];
    })
  );
}

function getMappingVisualState(draft: MappingDraft) {
  if (draft.syncEnabled && draft.externalRoomId && draft.externalRoomName) {
    return {
      badgeClassName: "status-mapped",
      label: "sync aktivan"
    };
  }

  if (draft.externalRoomId || draft.externalRoomName || draft.exportUrl || draft.importUrl) {
    return {
      badgeClassName: "status-draft",
      label: "draft mapping"
    };
  }

  return {
    badgeClassName: "status-unmapped",
    label: "nije povezano"
  };
}

export function OwnerDashboard({
  bookings: initialBookings,
  inquiries: initialInquiries,
  roomChannelMappings: initialRoomChannelMappings,
  rooms: initialRooms
}: OwnerDashboardProps) {
  const [form, setForm] = useState(initialForm);
  const [localBookings, setLocalBookings] = useState<Booking[]>(initialBookings);
  const [localInquiries, setLocalInquiries] = useState<Inquiry[]>(initialInquiries);
  const [localMappings, setLocalMappings] = useState<RoomChannelMapping[]>(initialRoomChannelMappings);
  const [localRooms, setLocalRooms] = useState<Room[]>(initialRooms);
  const [mappingDrafts, setMappingDrafts] = useState<Record<string, MappingDraft>>(() =>
    buildInitialMappingDrafts(initialRooms, initialRoomChannelMappings)
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [inquiryRoomSelection, setInquiryRoomSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      initialInquiries.map((inquiry) => {
        const matchingRoom =
          initialRooms.find((room) => room.name === inquiry.requestedRoomType) ?? initialRooms[0];

        return [inquiry.id, matchingRoom?.id ?? ""];
      })
    )
  );
  const [inquiryActionState, setInquiryActionState] = useState<Record<string, InquiryActionState>>(
    {}
  );
  const [mappingActionState, setMappingActionState] = useState<Record<string, RoomActionState>>({});
  const [roomActionState, setRoomActionState] = useState<RoomActionState>({
    status: "idle",
    message: "Nova soba se cuva u bazi i odmah postaje dostupna u admin kalendaru."
  });
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    message: "Dodaj sliku sobe pre cuvanja kako bi se uploadovala na Vercel Blob."
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
      message: "Cuvam sobu i pripremam je za admin kalendar..."
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
          message: "Slika je uspesno uploadovana na Vercel Blob.",
          url: uploadedImageUrl
        });
      } catch (error) {
        setUploadState({
          status: "error",
          message:
            error instanceof Error ? error.message : "Doslo je do greske tokom upload-a."
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
      | {
          ok: true;
          room: Room;
        }
      | {
          ok: false;
          message: string;
        };

    if (!result.ok) {
      setRoomActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalRooms((current) => [result.room, ...current]);
    setMappingDrafts((current) => ({
      ...current,
      [result.room.id]: createMappingDraft()
    }));
    setForm(initialForm);
    setSelectedImage(null);
    setRoomActionState({
      status: "success",
      message: "Soba je uspesno sacuvana i spremna za Booking.com povezivanje."
    });
  }

  function handleInquiryRoomChange(inquiryId: string, roomId: string) {
    setInquiryRoomSelection((currentValue) => ({
      ...currentValue,
      [inquiryId]: roomId
    }));
  }

  async function handleConvertInquiry(inquiryId: string) {
    const selectedRoomId = inquiryRoomSelection[inquiryId];

    if (!selectedRoomId) {
      setInquiryActionState((currentValue) => ({
        ...currentValue,
        [inquiryId]: {
          status: "error",
          message: "Izaberite sobu pre potvrde."
        }
      }));
      return;
    }

    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "submitting",
        message: "Potvrdjujem rezervaciju..."
      }
    }));

    const response = await fetch(`/api/admin/inquiries/${inquiryId}/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        roomId: selectedRoomId
      })
    });

    const result = (await response.json()) as
      | {
          ok: true;
          message: string;
          reservation: Booking;
        }
      | {
          ok: false;
          message: string;
        };

    if (!result.ok) {
      setInquiryActionState((currentValue) => ({
        ...currentValue,
        [inquiryId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    setLocalBookings((currentValue) =>
      [...currentValue, result.reservation].sort((leftBooking, rightBooking) =>
        leftBooking.checkIn.localeCompare(rightBooking.checkIn)
      )
    );
    setLocalInquiries((currentValue) =>
      currentValue.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, status: "converted" } : inquiry
      )
    );
    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "success",
        message: result.message
      }
    }));
  }

  function handleMappingFieldChange(
    roomId: string,
    field: keyof MappingDraft,
    value: string | boolean
  ) {
    setMappingDrafts((current) => ({
      ...current,
      [roomId]: {
        ...(current[roomId] ?? createMappingDraft()),
        [field]: value
      }
    }));
  }

  async function handleSaveMapping(roomId: string) {
    const draft = mappingDrafts[roomId] ?? createMappingDraft();

    setMappingActionState((current) => ({
      ...current,
      [roomId]: {
        status: "submitting",
        message: "Cuvam Booking.com mapping..."
      }
    }));

    const response = await fetch(`/api/admin/rooms/${roomId}/mapping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(draft)
    });

    const result = (await response.json()) as
      | {
          ok: true;
          mapping: RoomChannelMapping;
          message: string;
        }
      | {
          ok: false;
          message: string;
        };

    if (!result.ok) {
      setMappingActionState((current) => ({
        ...current,
        [roomId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    setLocalMappings((current) => {
      const otherMappings = current.filter((item) => item.roomId !== roomId);
      return [...otherMappings, result.mapping];
    });
    setMappingDrafts((current) => ({
      ...current,
      [roomId]: createMappingDraft(result.mapping)
    }));
    setMappingActionState((current) => ({
      ...current,
      [roomId]: {
        status: "success",
        message: result.message
      }
    }));
  }

  const occupiedCount = localRooms.filter((room) => room.status === "occupied").length;
  const cleaningCount = localRooms.filter((room) => room.status === "cleaning").length;
  const arrivalsToday = localBookings.filter((booking) => booking.status === "arriving").length;
  const today = new Date();
  const calendarDays = Array.from({ length: 14 }, (_, index) => addDays(today, index));
  const upcomingBookings = [...localBookings].sort((leftBooking, rightBooking) =>
    leftBooking.checkIn.localeCompare(rightBooking.checkIn)
  );
  const activeInquiries = localInquiries.filter(
    (inquiry) => inquiry.status === "new" || inquiry.status === "contacted"
  );
  const connectedMappings = localMappings.filter((mapping) => mapping.syncEnabled).length;
  const roomsWithoutMapping = localRooms.length - connectedMappings;

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Owner control panel</p>
        <h1>Pregled soba, rezervacija, kalendara i Booking.com povezivanja</h1>
        <p>
          Owner panel sada cuva nove sobe kroz admin API i omogucava da svaka soba dobije
          svoj Booking.com room mapping pre ukljucivanja sync-a.
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
            <span>Booking.com povezano</span>
            <strong>{connectedMappings}</strong>
          </div>
          <div className="stat-card">
            <span>Sobe bez mapiranja</span>
            <strong>{roomsWithoutMapping}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">Dostupnost</p>
            <h2>Kalendar soba za narednih 14 dana</h2>
          </div>
          <span className="inline-note">
            Owner kalendar sada prikazuje sobu po sobu i sluzi kao osnova za buduci Booking sync.
          </span>
        </div>
        <div className="calendar-legend">
          <span className="calendar-legend__item is-free">Slobodno</span>
          <span className="calendar-legend__item is-occupied">Zauzeto</span>
          <span className="calendar-legend__item is-arrival">Dolazak</span>
          <span className="calendar-legend__item is-departure">Odlazak</span>
          <span className="calendar-legend__item is-cleaning">Ciscenje</span>
        </div>
        <div className="availability-calendar">
          <div
            className="availability-calendar__row availability-calendar__row--head"
            style={{ gridTemplateColumns: `220px repeat(${calendarDays.length}, minmax(76px, 1fr))` }}
          >
            <div className="availability-calendar__room availability-calendar__room--head">
              Soba
            </div>
            {calendarDays.map((day) => (
              <div key={day.toISOString()} className="availability-calendar__day">
                <strong>{dayLabelFormatter.format(day)}</strong>
                <span>{weekdayFormatter.format(day)}</span>
              </div>
            ))}
          </div>

          {localRooms.map((room) => (
            <div
              key={room.id}
              className="availability-calendar__row"
              style={{ gridTemplateColumns: `220px repeat(${calendarDays.length}, minmax(76px, 1fr))` }}
            >
              <div className="availability-calendar__room">
                <strong>{room.name}</strong>
                <span>{room.neighborhood}</span>
              </div>
              {calendarDays.map((day) => {
                const cell = getCalendarCellStatus(room, day, localBookings);

                return (
                  <div
                    key={`${room.id}-${day.toISOString()}`}
                    className={`availability-calendar__cell is-${cell.tone}`}
                    title={cell.detail}
                  >
                    {cell.shortLabel}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Termini</p>
            <h2>Predstojeci boravci po sobama</h2>
          </div>
        </div>
        <div className="table-like">
          {upcomingBookings.map((booking) => {
            const room = localRooms.find((item) => item.id === booking.roomId);

            return (
              <div key={booking.id} className="table-row">
                <div>
                  <strong>{room?.name ?? booking.roomId}</strong>
                  <span>{booking.guestName}</span>
                </div>
                <div>{booking.source}</div>
                <div>
                  {booking.checkIn} - {booking.checkOut}
                </div>
                <div>
                  <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Upiti</p>
            <h2>Novi upiti sa sajta i WhatsApp-a</h2>
          </div>
        </div>
        <div className="table-like">
          {activeInquiries.map((inquiry) => (
            <div key={inquiry.id} className="table-row">
              <div>
                <strong>{inquiry.guestName}</strong>
                <span>
                  {inquiry.message} | {inquiry.phone}
                </span>
              </div>
              <div className="admin-inline-stack">
                <span>{inquiry.requestedRoomType}</span>
                <select
                  className="admin-inline-select"
                  onChange={(event) => handleInquiryRoomChange(inquiry.id, event.target.value)}
                  value={inquiryRoomSelection[inquiry.id] ?? ""}
                >
                  {localRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {inquiry.checkIn} - {inquiry.checkOut}
              </div>
              <div className="admin-inline-actions">
                <span className={`status-pill status-inquiry-${inquiry.status}`}>
                  {inquiry.status}
                </span>
                <button
                  className="secondary-button"
                  onClick={() => void handleConvertInquiry(inquiry.id)}
                  type="button"
                >
                  Pretvori u rezervaciju
                </button>
                {inquiryActionState[inquiry.id]?.message ? (
                  <span
                    className={`inline-note ${
                      inquiryActionState[inquiry.id]?.status === "error" ? "inline-note-error" : ""
                    }`}
                  >
                    {inquiryActionState[inquiry.id]?.message}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">Booking.com mapping</p>
            <h2>Povezivanje internih soba sa Booking.com sobama</h2>
          </div>
          <div className="admin-inline-actions">
            <span className="inline-note">
              Povezano: {connectedMappings} / {localRooms.length}
            </span>
            <Link className="text-link" href="/admin/owner/booking-sync">
              Otvori tutorial
            </Link>
          </div>
        </div>
        <div className="booking-mapping-grid">
          {localRooms.map((room) => {
            const mapping = localMappings.find((item) => item.roomId === room.id);
            const draft = mappingDrafts[room.id] ?? createMappingDraft(mapping);
            const visualState = getMappingVisualState(draft);

            return (
              <article key={room.id} className="booking-mapping-card">
                <div className="booking-mapping-card__header">
                  <div>
                    <strong>{room.name}</strong>
                    <span>{room.neighborhood}</span>
                  </div>
                  <span className={`status-pill ${visualState.badgeClassName}`}>
                    {visualState.label}
                  </span>
                </div>
                <div className="admin-form admin-form--dense">
                  <input
                    onChange={(event) =>
                      handleMappingFieldChange(room.id, "externalRoomName", event.target.value)
                    }
                    placeholder="Booking.com room naziv"
                    value={draft.externalRoomName}
                  />
                  <input
                    onChange={(event) =>
                      handleMappingFieldChange(room.id, "externalRoomId", event.target.value)
                    }
                    placeholder="Booking.com room ID"
                    value={draft.externalRoomId}
                  />
                  <input
                    onChange={(event) =>
                      handleMappingFieldChange(room.id, "exportUrl", event.target.value)
                    }
                    placeholder="iCal export URL"
                    value={draft.exportUrl}
                  />
                  <input
                    onChange={(event) =>
                      handleMappingFieldChange(room.id, "importUrl", event.target.value)
                    }
                    placeholder="iCal import URL"
                    value={draft.importUrl}
                  />
                  <label className="admin-checkbox">
                    <input
                      checked={draft.syncEnabled}
                      onChange={(event) =>
                        handleMappingFieldChange(room.id, "syncEnabled", event.target.checked)
                      }
                      type="checkbox"
                    />
                    <span>Aktiviraj sync za ovu sobu</span>
                  </label>
                  <button
                    className="primary-button"
                    onClick={() => void handleSaveMapping(room.id)}
                    type="button"
                  >
                    Sacuvaj mapping
                  </button>
                  <p
                    className={`inline-note ${
                      mappingActionState[room.id]?.status === "error" ? "inline-note-error" : ""
                    }`}
                  >
                    {mappingActionState[room.id]?.message ||
                      (mapping?.lastSyncedAt
                        ? `Poslednji sync: ${mapping.lastSyncedAt}`
                        : "Unesi Booking.com room podatke ili sacuvaj draft za kasnije.")}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sobe</p>
            <h2>Dodaj novu sobu</h2>
          </div>
          <span className="inline-note">Forma cuva sobu kroz admin API i podrzava upload slike.</span>
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
          <label className="admin-file-field">
            <span>Slika sobe (opciono)</span>
            <input
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              type="file"
            />
          </label>
          <p
            className={`inline-note ${uploadState.status === "error" ? "inline-note-error" : ""}`}
          >
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
          <button type="submit" className="primary-button">
            {roomActionState.status === "submitting" || uploadState.status === "uploading"
              ? "Cuvanje u toku..."
              : "Sacuvaj sobu"}
          </button>
          <p
            className={`inline-note ${roomActionState.status === "error" ? "inline-note-error" : ""}`}
          >
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
        <div className="table-like">
          {localRooms.map((room) => {
            const mapping = localMappings.find((item) => item.roomId === room.id);

            return (
              <div key={room.id} className="table-row">
                <div>
                  <strong>{room.name}</strong>
                  <span>{room.neighborhood}</span>
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
          <div className="sync-item">
            <span>Aktivne mape soba</span>
            <strong>{connectedMappings}</strong>
          </div>
          <p>{bookingSyncSummary.note}</p>
        </div>
      </section>
    </div>
  );
}
