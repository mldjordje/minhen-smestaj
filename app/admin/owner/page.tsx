import { OwnerDashboard } from "@/components/owner-dashboard";
import {
  getActivityLogData,
  getBookingSyncSummary,
  getBookingsData,
  getInquiriesData,
  getRoomBlocksData,
  getRoomChannelMappingsData,
  getRoomsData
} from "@/lib/admin-data";

export default async function OwnerAdminPage() {
  const [rooms, bookings, inquiries, roomChannelMappings, roomBlocks, integrationSummary, activityLog] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false }),
    getInquiriesData({ allowDemoFallback: false }),
    getRoomChannelMappingsData({ allowDemoFallback: false }),
    getRoomBlocksData({ allowDemoFallback: false }),
    getBookingSyncSummary({ allowDemoFallback: false }),
    getActivityLogData({ allowDemoFallback: false })
  ]);

  return (
    <OwnerDashboard
      activityLog={activityLog}
      bookings={bookings}
      inquiries={inquiries}
      integrationSummary={integrationSummary}
      roomBlocks={roomBlocks}
      roomChannelMappings={roomChannelMappings}
      rooms={rooms}
    />
  );
}
