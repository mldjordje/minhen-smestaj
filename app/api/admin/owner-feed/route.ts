import { NextResponse } from "next/server";
import { getActivityLogData, getInquiriesData } from "@/lib/admin-data";

export async function GET() {
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
