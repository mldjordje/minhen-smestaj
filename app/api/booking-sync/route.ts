import { NextResponse } from "next/server";
import { bookingSyncSummary } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    ok: true,
    ...bookingSyncSummary,
    requiredEnv: [
      "BOOKING_SYNC_MODE",
      "BOOKING_EXPORT_URL",
      "BOOKING_IMPORT_URL",
      "BLOB_READ_WRITE_TOKEN"
    ]
  });
}
