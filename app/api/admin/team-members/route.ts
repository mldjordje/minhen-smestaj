import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { db, ensureDatabaseSchema } from "@/lib/db";
import type { TeamMember } from "@/lib/types";

type CreateTeamMemberPayload = {
  name?: string;
  role?: TeamMember["role"];
  shift?: string;
};

function createTeamMemberId() {
  return `team-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
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

    const payload = (await request.json()) as CreateTeamMemberPayload;

    if (!payload.name?.trim() || !payload.role || !payload.shift?.trim()) {
      return NextResponse.json(
        {
          ok: false,
          message: "Popunite ime, rolu i smenu clana tima."
        },
        { status: 400 }
      );
    }

    const member: TeamMember = {
      id: createTeamMemberId(),
      name: payload.name.trim(),
      role: payload.role,
      shift: payload.shift.trim()
    };

    await db`
      insert into team_members (id, name, role, shift)
      values (${member.id}, ${member.name}, ${member.role}, ${member.shift})
    `;

    await writeActivityLog({
      action: "created",
      actor: roleCheck.user.email || roleCheck.user.role,
      entityId: member.id,
      entityType: "team_member",
      message: `Dodat je clan tima ${member.name}.`,
      metadata: {
        role: member.role,
        shift: member.shift
      }
    });

    return NextResponse.json({
      ok: true,
      member,
      message: "Clan tima je uspesno dodat."
    });
  } catch (error) {
    console.error("Team member create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Dodavanje clana tima nije uspelo."
      },
      { status: 500 }
    );
  }
}
