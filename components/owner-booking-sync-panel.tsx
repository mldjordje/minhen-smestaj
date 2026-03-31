"use client";

import Link from "next/link";
import { useState } from "react";
import type { AdminBookingSyncSummary } from "@/lib/admin-data";
import { getRoomDisplayName } from "@/lib/rooms";
import { DEFAULT_ROOM_LOCATION } from "@/lib/site-config";
import type { Room, RoomChannelMapping } from "@/lib/types";

type MappingDraft = {
  exportUrl: string;
  externalRoomId: string;
  externalRoomName: string;
  importUrl: string;
  syncEnabled: boolean;
};

type ActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type SyncStatusPayload = AdminBookingSyncSummary & {
  envStatus: {
    blobToken: boolean;
    bookingSyncMode: boolean;
    databaseUrl: boolean;
    googleAuth: boolean;
    smtp: boolean;
  };
  mappedRooms: number;
  ok: true;
  roomsTotal: number;
  roomsWithoutMapping: number;
  tutorialUrl: string;
};

type OwnerBookingSyncPanelProps = {
  initialMappings: RoomChannelMapping[];
  initialSummary: SyncStatusPayload;
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
  if (draft.syncEnabled && draft.externalRoomName && draft.importUrl) {
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

export function OwnerBookingSyncPanel({
  initialMappings,
  initialSummary,
  rooms
}: OwnerBookingSyncPanelProps) {
  const [localMappings, setLocalMappings] = useState(initialMappings);
  const [summary, setSummary] = useState(initialSummary);
  const [mappingDrafts, setMappingDrafts] = useState<Record<string, MappingDraft>>(() =>
    buildInitialMappingDrafts(rooms, initialMappings)
  );
  const [mappingActionState, setMappingActionState] = useState<Record<string, ActionState>>({});
  const [syncActionState, setSyncActionState] = useState<ActionState>({
    status: "idle",
    message: "Pokreni rucni sync kada zelis da odmah povuces promene sa Booking.com-a."
  });
  const connectedMappings = localMappings.filter((mapping) => mapping.syncEnabled).length;

  async function refreshSyncStatus() {
    const response = await fetch("/api/booking-sync", {
      cache: "no-store",
      method: "GET"
    });

    const result = (await response.json()) as SyncStatusPayload | { ok: false; message?: string };

    if (!response.ok || !result.ok) {
      throw new Error("Status Booking.com sync-a trenutno nije dostupan.");
    }

    setSummary(result);
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
      body: JSON.stringify(draft),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    const result = (await response.json()) as
      | { ok: true; mapping: RoomChannelMapping; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
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
      const otherMappings = current.filter((mapping) => mapping.roomId !== roomId);
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

    try {
      await refreshSyncStatus();
    } catch (error) {
      setSyncActionState({
        status: "error",
        message: error instanceof Error ? error.message : "Status sync-a nije osvezen."
      });
    }
  }

  async function handleRunSync() {
    setSyncActionState({
      status: "submitting",
      message: "Povlacim Booking.com iCal rezervacije i osvezavam status..."
    });

    const response = await fetch("/api/booking-sync", {
      method: "POST"
    });

    const result = (await response.json()) as
      | { ok: true; message: string; syncedRooms: number }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setSyncActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setSyncActionState({
      status: "success",
      message: `${result.message} Obradjene sobe: ${result.syncedRooms}.`
    });

    try {
      await refreshSyncStatus();
    } catch (error) {
      setSyncActionState({
        status: "error",
        message: error instanceof Error ? error.message : "Status sync-a nije osvezen."
      });
    }
  }

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Booking.com</p>
        <h1>Mapiranje soba i kontrola sync-a</h1>
        <p>
          Ova stranica je izdvojena samo za Booking.com: svaka soba ima svoj mapping,
          iCal linkove i zaseban sync status.
        </p>
        <div className="stats-row">
          <div className="stat-card">
            <span>Ukupno soba</span>
            <strong>{rooms.length}</strong>
          </div>
          <div className="stat-card">
            <span>Povezane sobe</span>
            <strong>{connectedMappings}</strong>
          </div>
          <div className="stat-card">
            <span>Bez mapiranja</span>
            <strong>{Math.max(rooms.length - connectedMappings, 0)}</strong>
          </div>
          <div className="stat-card">
            <span>Pending updates</span>
            <strong>{summary.pendingUpdates}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">Sync status</p>
            <h2>Operativni pregled integracije</h2>
          </div>
          <div className="admin-inline-actions admin-inline-actions--wrap">
            <button className="primary-button" onClick={() => void handleRunSync()} type="button">
              {syncActionState.status === "submitting" ? "Sync u toku..." : "Pokreni sync"}
            </button>
            <Link className="secondary-button" href={summary.tutorialUrl}>
              Otvori guide
            </Link>
          </div>
        </div>
        <div className="sync-card">
          <div className="admin-inline-actions admin-inline-actions--wrap">
            <span className={`inline-note ${syncActionState.status === "error" ? "inline-note-error" : ""}`}>
              {syncActionState.message}
            </span>
          </div>
          <div className="sync-item">
            <span>Provider</span>
            <strong>{summary.provider}</strong>
          </div>
          <div className="sync-item">
            <span>Poslednji sync</span>
            <strong>{summary.lastSuccessfulSync ?? "Jos nema sync zapisa"}</strong>
          </div>
          <div className="sync-item">
            <span>Mode</span>
            <strong>{summary.mode}</strong>
          </div>
          <div className="sync-item">
            <span>Aktivne mape</span>
            <strong>{connectedMappings}</strong>
          </div>
          <div className="sync-item">
            <span>Napomena</span>
            <strong>{summary.note}</strong>
          </div>
        </div>
        <div className="bullet-list">
          <span>
            Baza: {summary.envStatus.databaseUrl ? "povezana" : "nedostaje DATABASE_URL / POSTGRES_URL"}
          </span>
          <span>
            Blob upload: {summary.envStatus.blobToken ? "spreman" : "nedostaje BLOB_READ_WRITE_TOKEN"}
          </span>
          <span>
            SMTP: {summary.envStatus.smtp ? "spreman" : "nedostaje SMTP konfiguracija"}
          </span>
          <span>
            Google auth: {summary.envStatus.googleAuth ? "spreman" : "nedostaju Google OAuth kljucevi"}
          </span>
          <span>
            Sync mode env: {summary.envStatus.bookingSyncMode ? "postavljen" : "koristi se podrazumevana vrednost"}
          </span>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">Room mapping</p>
            <h2>Povezivanje internih soba sa Booking.com sobama</h2>
          </div>
          <span className="inline-note">Svaka soba dobija svoj ID, naziv i iCal linkove.</span>
        </div>
        {rooms.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Jos nema soba za mapiranje</strong>
            <p>Prvo dodaj sobu u sekciji Rooms, pa se onda vrati na Booking.com povezivanje.</p>
          </div>
        ) : (
          <div className="booking-mapping-grid">
            {rooms.map((room) => {
              const mapping = localMappings.find((item) => item.roomId === room.id);
              const draft = mappingDrafts[room.id] ?? createMappingDraft(mapping);
              const visualState = getMappingVisualState(draft);

              return (
                <article key={room.id} className="booking-mapping-card">
                  <div className="booking-mapping-card__header">
                    <div>
                      <strong>{getRoomDisplayName(room)}</strong>
                      <span>{room.neighborhood || DEFAULT_ROOM_LOCATION}</span>
                    </div>
                    <span className={`status-pill ${visualState.badgeClassName}`}>{visualState.label}</span>
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
                      placeholder="Booking.com room ID (opciono)"
                      value={draft.externalRoomId}
                    />
                    <input
                      onChange={(event) => handleMappingFieldChange(room.id, "exportUrl", event.target.value)}
                      placeholder="iCal export URL"
                      value={draft.exportUrl}
                    />
                    <input
                      onChange={(event) => handleMappingFieldChange(room.id, "importUrl", event.target.value)}
                      placeholder="Booking.com iCal import URL"
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
                    <p className="inline-note">
                      Za aktivan iCal sync dovoljni su tacan naziv sobe i Booking.com import URL.
                      Room ID je koristan za internu proveru, ali nije obavezan.
                    </p>
                    <button
                      className="primary-button"
                      onClick={() => void handleSaveMapping(room.id)}
                      type="button"
                    >
                      Sacuvaj mapping
                    </button>
                    {mapping?.exportUrl ? (
                      <a className="text-link" href={mapping.exportUrl} rel="noreferrer" target="_blank">
                        Otvori export feed
                      </a>
                    ) : null}
                    <p
                      className={`inline-note ${
                        mappingActionState[room.id]?.status === "error" ? "inline-note-error" : ""
                      }`}
                    >
                      {mappingActionState[room.id]?.message ||
                        (mapping?.lastSyncedAt
                          ? `Poslednji sync: ${mapping.lastSyncedAt}`
                          : "Unesi Booking.com podatke ili sacuvaj draft za kasnije.")}
                    </p>
                    {mapping?.lastSyncStatus ? (
                      <span
                        className={`status-pill ${
                          mapping.lastSyncStatus === "success"
                            ? "status-mapped"
                            : mapping.lastSyncStatus === "error"
                              ? "status-maintenance"
                              : "status-draft"
                        }`}
                      >
                        sync: {mapping.lastSyncStatus}
                      </span>
                    ) : null}
                    {mapping?.lastSyncError ? (
                      <p className="inline-note inline-note-error">{mapping.lastSyncError}</p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
