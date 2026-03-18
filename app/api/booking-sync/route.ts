import { NextResponse } from "next/server";
import { getBookingSyncSummary, getRoomChannelMappingsData, getRoomsData } from "@/lib/admin-data";

export async function GET() {
  const [summary, rooms, mappings] = await Promise.all([
    getBookingSyncSummary(),
    getRoomsData(),
    getRoomChannelMappingsData()
  ]);
  const activeMappings = mappings.filter((mapping) => mapping.syncEnabled);

  return NextResponse.json({
    ok: true,
    ...summary,
    roomsTotal: rooms.length,
    mappedRooms: activeMappings.length,
    roomsWithoutMapping: rooms.length - activeMappings.length,
    tutorialUrl: "/admin/owner/booking-sync",
    envStatus: {
      bookingSyncMode: Boolean(process.env.BOOKING_SYNC_MODE),
      bookingExportUrl: Boolean(process.env.BOOKING_EXPORT_URL),
      bookingImportUrl: Boolean(process.env.BOOKING_IMPORT_URL),
      blobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      databaseUrl: Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)
    },
    requiredEnv: [
      "BOOKING_SYNC_MODE",
      "BOOKING_EXPORT_URL",
      "BOOKING_IMPORT_URL",
      "BLOB_READ_WRITE_TOKEN"
    ]
  });
}
