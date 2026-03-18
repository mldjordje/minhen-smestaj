import { StaffDashboard } from "@/components/staff-dashboard";
import {
  getBookingsData,
  getCleaningTasksData,
  getRoomBlocksData,
  getRoomsData,
  getTeamMembersData
} from "@/lib/admin-data";

export default async function StaffAdminPage() {
  const [rooms, bookings, cleaningTasks, teamMembers, roomBlocks] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false }),
    getCleaningTasksData({ allowDemoFallback: false }),
    getTeamMembersData({ allowDemoFallback: false }),
    getRoomBlocksData({ allowDemoFallback: false })
  ]);

  return (
    <StaffDashboard
      bookings={bookings}
      cleaningTasks={cleaningTasks}
      roomBlocks={roomBlocks}
      rooms={rooms}
      teamMembers={teamMembers}
    />
  );
}
