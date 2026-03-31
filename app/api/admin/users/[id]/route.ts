import { NextResponse } from "next/server";
import { writeActivityLog } from "@/lib/activity-log";
import { requireApiRole } from "@/lib/auth";
import { db, ensureDatabaseSchema } from "@/lib/db";
import type { AppUser, UserRole } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type UpdateUserPayload = {
  role?: UserRole;
};

const allowedRoles: UserRole[] = ["guest", "staff", "owner"];

export async function PUT(request: Request, context: RouteContext) {
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
    const payload = (await request.json()) as UpdateUserPayload;

    if (!payload.role || !allowedRoles.includes(payload.role)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Prosledjena rola nije ispravna."
        },
        { status: 400 }
      );
    }

    const updatedUsers = await db<AppUser[]>`
      update users
      set role = ${payload.role}, updated_at = now()
      where id = ${id}
      returning id, email, name, image, role
    `;

    const updatedUser = updatedUsers[0];

    if (!updatedUser) {
      return NextResponse.json(
        {
          ok: false,
          message: "Korisnik nije pronadjen."
        },
        { status: 404 }
      );
    }

    await writeActivityLog({
      action: "role-updated",
      actor: roleCheck.user.email || roleCheck.user.role,
      entityId: updatedUser.id,
      entityType: "user",
      message: `Promenjena je rola korisnika ${updatedUser.email} u ${updatedUser.role}.`,
      metadata: {
        email: updatedUser.email,
        role: updatedUser.role
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Rola korisnika je sacuvana.",
      user: updatedUser
    });
  } catch (error) {
    console.error("User role update failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Promena role nije uspela."
      },
      { status: 500 }
    );
  }
}
