"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { getRoomDisplayName } from "@/lib/rooms";
import type { CleaningTask, Room } from "@/lib/types";

type ActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type OwnerCleaningTasksPanelProps = {
  initialCleaningTasks: CleaningTask[];
  rooms: Room[];
};

export function OwnerCleaningTasksPanel({
  initialCleaningTasks,
  rooms
}: OwnerCleaningTasksPanelProps) {
  const [localCleaningTasks, setLocalCleaningTasks] = useState(initialCleaningTasks);
  const [taskForm, setTaskForm] = useState({
    roomId: rooms[0]?.id ?? "",
    assignee: "",
    dueAt: "",
    status: "todo" as CleaningTask["status"],
    notes: ""
  });
  const [taskActionState, setTaskActionState] = useState<ActionState>({
    status: "idle",
    message: "Dodaj prvi operativni zadatak za ciscenje, check-in ili pripremu sobe."
  });

  function handleTaskFormChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setTaskForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleCreateCleaningTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTaskActionState({
      status: "submitting",
      message: "Dodajem zadatak..."
    });

    const response = await fetch("/api/admin/cleaning-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskForm)
    });

    const result = (await response.json()) as
      | { ok: true; task: CleaningTask; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setTaskActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalCleaningTasks((current) => [...current, result.task]);
    setTaskForm({
      roomId: rooms[0]?.id ?? "",
      assignee: "",
      dueAt: "",
      status: "todo",
      notes: ""
    });
    setTaskActionState({
      status: "success",
      message: result.message
    });
  }

  async function handleDeleteCleaningTask(taskId: string) {
    setTaskActionState({
      status: "submitting",
      message: "Brisem zadatak..."
    });

    const response = await fetch(`/api/admin/cleaning-tasks/${taskId}`, {
      method: "DELETE"
    });

    const result = (await response.json()) as
      | { ok: true; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setTaskActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalCleaningTasks((current) => current.filter((task) => task.id !== taskId));
    setTaskActionState({
      status: "success",
      message: result.message
    });
  }

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Zadaci</p>
        <h1>Operativni taskovi po sobi</h1>
        <p>Dodaj i obrisi zadatke za ciscenje, pripremu sobe i check-in operativu.</p>
      </section>

      <div className="dashboard-split-grid">
        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Novi task</p>
              <h2>Dodaj operativni zadatak</h2>
            </div>
          </div>
          <form className="admin-form" onSubmit={handleCreateCleaningTask}>
            <select
              className="admin-inline-select"
              name="roomId"
              onChange={handleTaskFormChange}
              required
              value={taskForm.roomId}
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {getRoomDisplayName(room)}
                </option>
              ))}
            </select>
            <input
              name="assignee"
              onChange={handleTaskFormChange}
              placeholder="Zaduzeno lice"
              required
              value={taskForm.assignee}
            />
            <div className="admin-filters">
              <input
                name="dueAt"
                onChange={handleTaskFormChange}
                placeholder="Vreme, npr. 14:30"
                required
                value={taskForm.dueAt}
              />
              <select
                className="admin-inline-select"
                name="status"
                onChange={handleTaskFormChange}
                value={taskForm.status}
              >
                <option value="todo">todo</option>
                <option value="in-progress">in-progress</option>
                <option value="done">done</option>
              </select>
            </div>
            <textarea
              name="notes"
              onChange={handleTaskFormChange}
              placeholder="Napomena za zadatak"
              required
              rows={4}
              value={taskForm.notes}
            />
            <button className="primary-button" type="submit">
              {taskActionState.status === "submitting" ? "Cuvanje..." : "Dodaj zadatak"}
            </button>
            <p className={`inline-note ${taskActionState.status === "error" ? "inline-note-error" : ""}`}>
              {taskActionState.message}
            </p>
          </form>
        </section>

        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Aktivni taskovi</p>
              <h2>Lista zadataka</h2>
            </div>
          </div>
          {localCleaningTasks.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Nema aktivnih zadataka</strong>
              <p>Dodaj prvi zadatak za ciscenje, pripremu sobe ili check-in operativu.</p>
            </div>
          ) : (
            <div className="table-like">
              {localCleaningTasks.map((task) => (
                <div key={task.id} className="table-row">
                  <div>
                    <strong>
                      {getRoomDisplayName(
                        rooms.find((room) => room.id === task.roomId) ?? {
                          id: task.roomId,
                          name: task.roomId,
                          slug: task.roomId
                        }
                      )}
                    </strong>
                    <span>{task.notes}</span>
                  </div>
                  <div>{task.assignee}</div>
                  <div>{task.dueAt}</div>
                  <div className="admin-inline-actions">
                    <span className={`status-pill status-${task.status}`}>{task.status}</span>
                    <button
                      className="secondary-button"
                      onClick={() => void handleDeleteCleaningTask(task.id)}
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
