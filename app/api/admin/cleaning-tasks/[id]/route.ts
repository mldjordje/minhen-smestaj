import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { db, ensureDatabaseSchema } from "@/lib/db";
import type { CleaningTask } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type CleaningTaskRow = {
  assignee: string;
  due_at: string;
  id: string;
  notes: string;
  room_id: string;
  status: CleaningTask["status"];
};

export async function DELETE(request: Request, context: RouteContext) {
  const roleCheck = await requireApiRole(request as never, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!db) {
    return NextResponse.json({ ok: false, message: "Baza nije povezana." }, { status: 500 });
  }

  try {
    await ensureDatabaseSchema();

    const { id } = await context.params;
    const deletedRows = await db<CleaningTaskRow[]>`
      delete from cleaning_tasks
      where id = ${id}
      returning id, room_id, assignee, due_at, status, notes
    `;

    const task = deletedRows[0];

    if (!task) {
      return NextResponse.json(
        {
          ok: false,
          message: "Zadatak nije pronadjen."
        },
        { status: 404 }
      );
    }

    await writeActivityLog({
      action: "deleted",
      actor: roleCheck.user.email || roleCheck.user.role,
      entityId: id,
      entityType: "cleaning_task",
      message: `Obrisan je zadatak za ${task.assignee}.`,
      metadata: {
        roomId: task.room_id,
        dueAt: task.due_at,
        status: task.status
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Zadatak je obrisan."
    });
  } catch (error) {
    console.error("Cleaning task delete failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Brisanje zadatka nije uspelo."
      },
      { status: 500 }
    );
  }
}
