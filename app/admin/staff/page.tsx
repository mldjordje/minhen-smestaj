import { StaffDashboard } from "@/components/staff-dashboard";
import {
  getBookingsData,
  getCleaningTasksData,
  getRoomsData,
  getTeamMembersData
} from "@/lib/admin-data";

export default async function StaffAdminPage() {
  const [rooms, bookings, cleaningTasks, teamMembers] = await Promise.all([
    getRoomsData(),
    getBookingsData(),
    getCleaningTasksData(),
    getTeamMembersData()
  ]);

  return (
    <StaffDashboard
      bookings={bookings}
      cleaningTasks={cleaningTasks}
      rooms={rooms}
      teamMembers={teamMembers}
    />
  );
}
