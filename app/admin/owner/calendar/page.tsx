import { redirect } from "next/navigation";
import { AdminCalendarPanel } from "@/components/admin-calendar-panel";
import { getBookingsData, getRoomBlocksData, getRoomsData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function OwnerCalendarPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner/calendar");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const [rooms, bookings, roomBlocks] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false }),
    getRoomBlocksData({ allowDemoFallback: false })
  ]);

  return (
    <AdminCalendarPanel
      audience="owner"
      initialBookings={bookings}
      initialRoomBlocks={roomBlocks}
      rooms={rooms}
    />
  );
}
