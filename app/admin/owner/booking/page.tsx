import { redirect } from "next/navigation";
import { OwnerBookingSyncPanel } from "@/components/owner-booking-sync-panel";
import { getBookingSyncSummary, getRoomChannelMappingsData, getRoomsData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function OwnerBookingPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner/booking");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const [rooms, mappings, summary] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getRoomChannelMappingsData({ allowDemoFallback: false }),
    getBookingSyncSummary({ allowDemoFallback: false })
  ]);
  const activeMappings = mappings.filter((mapping) => mapping.syncEnabled);

  return (
    <OwnerBookingSyncPanel
      initialMappings={mappings}
      initialSummary={{
        ...summary,
        envStatus: {
          blobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
          bookingSyncMode: Boolean(process.env.BOOKING_SYNC_MODE),
          databaseUrl: Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL),
          googleAuth: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
          smtp: Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM)
        },
        mappedRooms: activeMappings.length,
        ok: true,
        roomsTotal: rooms.length,
        roomsWithoutMapping: Math.max(rooms.length - activeMappings.length, 0),
        tutorialUrl: "/admin/owner/booking-sync"
      }}
      rooms={rooms}
    />
  );
}
