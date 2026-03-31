"use client";

import { useState } from "react";
import type { AppUser, UserRole } from "@/lib/types";

type ActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type OwnerUserRolePanelProps = {
  initialUsers: AppUser[];
};

const roleOptions: UserRole[] = ["guest", "staff", "owner"];

export function OwnerUserRolePanel({ initialUsers }: OwnerUserRolePanelProps) {
  const [localUsers, setLocalUsers] = useState(initialUsers);
  const [draftRoles, setDraftRoles] = useState<Record<string, UserRole>>(
    Object.fromEntries(initialUsers.map((user) => [user.id, user.role]))
  );
  const [actionState, setActionState] = useState<Record<string, ActionState>>({});

  async function handleSaveRole(userId: string) {
    const nextRole = draftRoles[userId];

    if (!nextRole) {
      return;
    }

    setActionState((current) => ({
      ...current,
      [userId]: {
        status: "submitting",
        message: "Cuvam rolu korisnika..."
      }
    }));

    const response = await fetch(`/api/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role: nextRole
      })
    });

    const result = (await response.json()) as
      | { ok: true; message: string; user: AppUser }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setActionState((current) => ({
        ...current,
        [userId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    setLocalUsers((current) =>
      current.map((user) => (user.id === userId ? result.user : user))
    );
    setDraftRoles((current) => ({
      ...current,
      [userId]: result.user.role
    }));
    setActionState((current) => ({
      ...current,
      [userId]: {
        status: "success",
        message: result.message
      }
    }));
  }

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Auth korisnici</p>
        <h1>Google role za goste, staff i owner korisnike</h1>
        <p>
          Ovde menjas rolu korisnika koji su se vec jednom prijavili preko Google-a. Ako je email i dalje
          upisan u `OWNER_EMAILS` ili `STAFF_EMAILS`, ta env pravila i dalje imaju prioritet.
        </p>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Korisnici</p>
            <h2>Promena role po korisniku</h2>
          </div>
        </div>
        {localUsers.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Jos nema prijavljenih korisnika</strong>
            <p>Korisnik mora makar jednom da se prijavi preko Google-a da bi se pojavio u ovoj listi.</p>
          </div>
        ) : (
          <div className="table-like">
            {localUsers.map((user) => (
              <div key={user.id} className="table-row table-row--stacked">
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <div>
                  <select
                    className="admin-inline-select"
                    onChange={(event) =>
                      setDraftRoles((current) => ({
                        ...current,
                        [user.id]: event.target.value as UserRole
                      }))
                    }
                    value={draftRoles[user.id] ?? user.role}
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-inline-actions">
                  <span className={`status-pill status-${draftRoles[user.id] === "owner" ? "mapped" : draftRoles[user.id] === "staff" ? "cleaning" : "draft"}`}>
                    {draftRoles[user.id] ?? user.role}
                  </span>
                  <button className="primary-button" onClick={() => void handleSaveRole(user.id)} type="button">
                    Sacuvaj rolu
                  </button>
                </div>
                <p className={`inline-note ${actionState[user.id]?.status === "error" ? "inline-note-error" : ""}`}>
                  {actionState[user.id]?.message || "Promena se primenjuje pri sledecoj proveri sesije i pristupa panelu."}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
