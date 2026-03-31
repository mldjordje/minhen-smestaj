import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/auth";
import { getUsersData } from "@/lib/admin-data";

export async function GET(request: Request) {
  const roleCheck = await requireApiRole(request as never, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  const users = await getUsersData();

  return NextResponse.json({
    ok: true,
    users
  });
}
