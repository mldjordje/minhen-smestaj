import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { db, ensureDatabaseSchema } from "@/lib/db";
import type { CleaningTask } from "@/lib/types";

type CreateCleaningTaskPayload = {
  assignee?: string;
  dueAt?: string;
  notes?: string;
  roomId?: string;
  status?: CleaningTask["status"];
};

function createCleaningTaskId() {
  return `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function POST(request: Request) {
  const roleCheck = await requireApiRole(request as never, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!db) {
    return NextResponse.json({ ok: false, message: "Baza nije povezana." }, { status: 500 });
  }

  try {
    await ensureDatabaseSchema();

    const payload = (await request.json()) as CreateCleaningTaskPayload;

    if (
      !payload.roomId ||
      !payload.assignee?.trim() ||
      !payload.dueAt?.trim() ||
      !payload.notes?.trim() ||
      !payload.status
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite sobu, zaduzenog, vreme, status i napomenu zadatka."
        },
        { status: 400 }
      );
    }

    const roomRows = await db<{ id: string }[]>`
      select id
      from rooms
      where id = ${payload.roomId}
      limit 1
    `;

    if (roomRows.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Izabrana soba nije pronadjena."
        },
        { status: 404 }
      );
    }

    const task: CleaningTask = {
      id: createCleaningTaskId(),
      roomId: payload.roomId,
      assignee: payload.assignee.trim(),
      dueAt: payload.dueAt.trim(),
      status: payload.status,
      notes: payload.notes.trim()
    };

    await db`
      insert into cleaning_tasks (id, room_id, assignee, due_at, status, notes)
      values (${task.id}, ${task.roomId}, ${task.assignee}, ${task.dueAt}, ${task.status}, ${task.notes})
    `;

    await writeActivityLog({
      action: "created",
      actor: roleCheck.user.email || roleCheck.user.role,
      entityId: task.id,
      entityType: "cleaning_task",
      message: `Dodat je zadatak za ${task.assignee}.`,
      metadata: {
        roomId: task.roomId,
        dueAt: task.dueAt,
        status: task.status
      }
    });

    return NextResponse.json({
      ok: true,
      task,
      message: "Zadatak je uspesno dodat."
    });
  } catch (error) {
    console.error("Cleaning task create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Dodavanje zadatka nije uspelo."
      },
      { status: 500 }
    );
  }
}
