import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireApiRole } from "@/lib/auth";
import { getActivityLogData, getInquiriesData } from "@/lib/admin-data";

export async function GET(request: NextRequest) {
  const roleCheck = await requireApiRole(request, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  const [activityLog, inquiries] = await Promise.all([
    getActivityLogData({ allowDemoFallback: false }),
    getInquiriesData({ allowDemoFallback: false })
  ]);

  return NextResponse.json(
    {
      ok: true,
      activityLog,
      inquiries
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
