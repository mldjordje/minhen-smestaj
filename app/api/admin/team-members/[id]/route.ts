import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { db, ensureDatabaseSchema } from "@/lib/db";
import type { TeamMember } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type TeamMemberRow = {
  id: string;
  name: string;
  role: TeamMember["role"];
  shift: string;
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
    const deletedRows = await db<TeamMemberRow[]>`
      delete from team_members
      where id = ${id}
      returning id, name, role, shift
    `;

    const member = deletedRows[0];

    if (!member) {
      return NextResponse.json(
        {
          ok: false,
          message: "Clan tima nije pronadjen."
        },
        { status: 404 }
      );
    }

    await writeActivityLog({
      action: "deleted",
      actor: roleCheck.user.email || roleCheck.user.role,
      entityId: id,
      entityType: "team_member",
      message: `Obrisan je clan tima ${member.name}.`,
      metadata: {
        role: member.role,
        shift: member.shift
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Clan tima je obrisan."
    });
  } catch (error) {
    console.error("Team member delete failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Brisanje clana tima nije uspelo."
      },
      { status: 500 }
    );
  }
}
