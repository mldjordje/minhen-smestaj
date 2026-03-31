"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import type { TeamMember } from "@/lib/types";

const initialTeamForm = {
  name: "",
  role: "host" as TeamMember["role"],
  shift: ""
};

type ActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type OwnerTeamPanelProps = {
  initialTeamMembers: TeamMember[];
};

export function OwnerTeamPanel({ initialTeamMembers }: OwnerTeamPanelProps) {
  const [localTeamMembers, setLocalTeamMembers] = useState(initialTeamMembers);
  const [teamForm, setTeamForm] = useState(initialTeamForm);
  const [teamActionState, setTeamActionState] = useState<ActionState>({
    status: "idle",
    message: "Dodaj stvarne owner/staff clanove kako bi staff panel bio spreman za rad."
  });

  function handleTeamFormChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setTeamForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleCreateTeamMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTeamActionState({
      status: "submitting",
      message: "Dodajem clana tima..."
    });

    const response = await fetch("/api/admin/team-members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(teamForm)
    });

    const result = (await response.json()) as
      | { ok: true; member: TeamMember; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setTeamActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalTeamMembers((current) => [...current, result.member]);
    setTeamForm(initialTeamForm);
    setTeamActionState({
      status: "success",
      message: result.message
    });
  }

  async function handleDeleteTeamMember(memberId: string) {
    setTeamActionState({
      status: "submitting",
      message: "Brisem clana tima..."
    });

    const response = await fetch(`/api/admin/team-members/${memberId}`, {
      method: "DELETE"
    });

    const result = (await response.json()) as
      | { ok: true; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setTeamActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalTeamMembers((current) => current.filter((member) => member.id !== memberId));
    setTeamActionState({
      status: "success",
      message: result.message
    });
  }

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Tim</p>
        <h1>Operativni tim po smenama</h1>
        <p>Ovde se vodi interni raspored i ljudi koji rade sa sobama i gostima.</p>
      </section>

      <div className="dashboard-split-grid">
        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Novi clan</p>
              <h2>Dodaj owner ili staff clana</h2>
            </div>
          </div>
          <form className="admin-form" onSubmit={handleCreateTeamMember}>
            <input
              name="name"
              onChange={handleTeamFormChange}
              placeholder="Ime i prezime"
              required
              value={teamForm.name}
            />
            <select
              className="admin-inline-select"
              name="role"
              onChange={handleTeamFormChange}
              value={teamForm.role}
            >
              <option value="owner">owner</option>
              <option value="host">host</option>
              <option value="cleaner">cleaner</option>
            </select>
            <input
              name="shift"
              onChange={handleTeamFormChange}
              placeholder="Smena, npr. 08:00 - 16:00"
              required
              value={teamForm.shift}
            />
            <button className="primary-button" type="submit">
              {teamActionState.status === "submitting" ? "Cuvanje..." : "Dodaj clana tima"}
            </button>
            <p className={`inline-note ${teamActionState.status === "error" ? "inline-note-error" : ""}`}>
              {teamActionState.message}
            </p>
          </form>
        </section>

        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Lista</p>
              <h2>Aktivni clanovi tima</h2>
            </div>
          </div>
          {localTeamMembers.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Tim jos nije dodat</strong>
              <p>Dodaj owner i staff clanove da bi operativni panel bio spreman za smene.</p>
            </div>
          ) : (
            <div className="table-like">
              {localTeamMembers.map((member) => (
                <div key={member.id} className="table-row">
                  <div>
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                  </div>
                  <div>{member.shift}</div>
                  <div />
                  <div className="admin-inline-actions">
                    <button
                      className="secondary-button"
                      onClick={() => void handleDeleteTeamMember(member.id)}
                      type="button"
                    >
                      Obrisi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
