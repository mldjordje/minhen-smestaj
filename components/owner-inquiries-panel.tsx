"use client";

import { useState } from "react";
import { getRoomDisplayName } from "@/lib/rooms";
import type { Inquiry, InquiryStatus, Room } from "@/lib/types";

type InquiryActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type InquiryAction = "contacted" | "closed" | "converted";

type OwnerInquiriesPanelProps = {
  initialInquiries: Inquiry[];
  rooms: Room[];
};

function isActiveInquiryStatus(status: InquiryStatus) {
  return status === "new" || status === "contacted";
}

function buildInquiryRoomSelection(rooms: Room[], inquiries: Inquiry[]) {
  return Object.fromEntries(
    inquiries.map((inquiry) => {
      const matchingRoom =
        rooms.find(
          (room) =>
            room.name === inquiry.requestedRoomType || getRoomDisplayName(room) === inquiry.requestedRoomType
        ) ?? rooms[0];

      return [inquiry.id, matchingRoom?.id ?? ""];
    })
  );
}

function getInquiryActionMessage(action: InquiryAction, status: "submitting" | "success") {
  if (status === "submitting") {
    switch (action) {
      case "contacted":
        return "Belezim da je gost kontaktiran...";
      case "closed":
        return "Odbijam upit...";
      default:
        return "Potvrdjujem rezervaciju...";
    }
  }

  switch (action) {
    case "contacted":
      return "Upit je oznacen kao kontaktiran.";
    case "closed":
      return "Upit je odbijen.";
    default:
      return "Upit je uspesno pretvoren u rezervaciju.";
  }
}

function getInquiryStatusLabel(status: InquiryStatus) {
  if (status === "closed") {
    return "odbijen";
  }

  return status;
}

export function OwnerInquiriesPanel({ initialInquiries, rooms }: OwnerInquiriesPanelProps) {
  const [localInquiries, setLocalInquiries] = useState(initialInquiries);
  const [inquiryRoomSelection, setInquiryRoomSelection] = useState<Record<string, string>>(() =>
    buildInquiryRoomSelection(rooms, initialInquiries)
  );
  const [inquiryActionState, setInquiryActionState] = useState<Record<string, InquiryActionState>>(
    {}
  );
  const activeInquiries = localInquiries.filter((inquiry) => isActiveInquiryStatus(inquiry.status));
  const archivedInquiries = localInquiries.filter((inquiry) => !isActiveInquiryStatus(inquiry.status));

  function updateLocalInquiryStatus(inquiryId: string, nextStatus: InquiryStatus) {
    setLocalInquiries((currentValue) =>
      currentValue.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, status: nextStatus } : inquiry
      )
    );
  }

  async function handleInquiryStatusUpdate(
    inquiryId: string,
    nextStatus: Extract<InquiryStatus, "new" | "contacted" | "closed">
  ) {
    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "submitting",
        message: getInquiryActionMessage(nextStatus === "closed" ? "closed" : "contacted", "submitting")
      }
    }));

    const response = await fetch(`/api/admin/inquiries/${inquiryId}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: nextStatus
      })
    });

    const result = (await response.json()) as
      | { ok: true; message: string; status: InquiryStatus }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setInquiryActionState((currentValue) => ({
        ...currentValue,
        [inquiryId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    updateLocalInquiryStatus(inquiryId, result.status);
    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "success",
        message: result.message
      }
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
        message: getInquiryActionMessage("converted", "submitting")
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
      | { ok: true; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setInquiryActionState((currentValue) => ({
        ...currentValue,
        [inquiryId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    updateLocalInquiryStatus(inquiryId, "converted");
    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "success",
        message: result.message
      }
    }));
  }

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Upiti</p>
        <h1>Obrada javnih upita i pretvaranje u rezervacije</h1>
        <p>Svaki aktivni upit ima jasan sledeci korak: kontaktiraj gosta, zatvori ili pretvori u rezervaciju.</p>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Aktivni upiti</p>
            <h2>Cekaju obradu</h2>
          </div>
        </div>
        {activeInquiries.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Nema aktivnih upita</strong>
            <p>Novi javni upiti ce se pojaviti ovde.</p>
          </div>
        ) : (
          <div className="table-like">
            {activeInquiries.map((inquiry) => (
              <div key={inquiry.id} className="table-row table-row--stacked">
                <div>
                  <strong>{inquiry.guestName}</strong>
                  <span>{inquiry.phone}</span>
                </div>
                <div>
                  {inquiry.checkIn} - {inquiry.checkOut}
                </div>
                <div>{inquiry.guests} gosta</div>
                <div className="admin-inline-stack">
                  <span className={`status-pill status-inquiry-${inquiry.status}`}>
                    {getInquiryStatusLabel(inquiry.status)}
                  </span>
                  <span className="inline-note">{inquiry.requestedRoomType}</span>
                </div>
                <div className="admin-inline-stack">
                  <span className="inline-note">{inquiry.message}</span>
                  <select
                    className="admin-inline-select"
                    onChange={(event) =>
                      setInquiryRoomSelection((currentValue) => ({
                        ...currentValue,
                        [inquiry.id]: event.target.value
                      }))
                    }
                    value={inquiryRoomSelection[inquiry.id] ?? ""}
                  >
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {getRoomDisplayName(room)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-inline-actions">
                  <button
                    className="secondary-button"
                    onClick={() => void handleInquiryStatusUpdate(inquiry.id, "contacted")}
                    type="button"
                  >
                    Kontaktiran
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => void handleConvertInquiry(inquiry.id)}
                    type="button"
                  >
                    Pretvori u rezervaciju
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => void handleInquiryStatusUpdate(inquiry.id, "closed")}
                    type="button"
                  >
                    Odbij upit
                  </button>
                </div>
                <p className={`inline-note ${inquiryActionState[inquiry.id]?.status === "error" ? "inline-note-error" : ""}`}>
                  {inquiryActionState[inquiry.id]?.message || "Izaberi sobu i akciju za obradu ovog upita."}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Arhiva</p>
            <h2>Vec obradjeni upiti</h2>
          </div>
        </div>
        {archivedInquiries.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Nema arhiviranih upita</strong>
            <p>Zatvoreni i pretvoreni upiti ce se pojaviti ovde.</p>
          </div>
        ) : (
          <div className="table-like">
            {archivedInquiries.map((inquiry) => (
              <div key={inquiry.id} className="table-row">
                <div>
                  <strong>{inquiry.guestName}</strong>
                  <span>{inquiry.phone}</span>
                </div>
                <div>
                  {inquiry.checkIn} - {inquiry.checkOut}
                </div>
                <div>{inquiry.guests} gosta</div>
                <div className="admin-inline-actions">
                  <span className={`status-pill status-inquiry-${inquiry.status}`}>
                    {getInquiryStatusLabel(inquiry.status)}
                  </span>
                  <span className="inline-note">{inquiry.requestedRoomType}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
