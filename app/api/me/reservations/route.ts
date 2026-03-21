import { NextRequest, NextResponse } from "next/server";
import { requireApiRole } from "@/lib/auth";
import { getBookingsForUser } from "@/lib/admin-data";

export async function GET(request: NextRequest) {
  const session = await requireApiRole(request);

  if (session instanceof NextResponse) {
    return session;
  }

  const reservations = await getBookingsForUser(session.user.id);

  return NextResponse.json({
    ok: true,
    reservations
  });
}
