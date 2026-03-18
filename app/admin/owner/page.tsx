import { OwnerDashboard } from "@/components/owner-dashboard";
import {
  getBookingsData,
  getInquiriesData,
  getRoomChannelMappingsData,
  getRoomsData
} from "@/lib/admin-data";

export default async function OwnerAdminPage() {
  const [rooms, bookings, inquiries, roomChannelMappings] = await Promise.all([
    getRoomsData(),
    getBookingsData(),
    getInquiriesData(),
    getRoomChannelMappingsData()
  ]);

  return (
    <OwnerDashboard
      bookings={bookings}
      inquiries={inquiries}
      roomChannelMappings={roomChannelMappings}
      rooms={rooms}
    />
  );
}
