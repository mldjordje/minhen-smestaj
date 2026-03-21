import { StaffDashboard } from "@/components/staff-dashboard";
import { redirect } from "next/navigation";
import {
  getBookingsData,
  getCleaningTasksData,
  getRoomBlocksData,
  getRoomsData,
  getTeamMembersData
} from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function StaffAdminPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/staff");
  }

  if (session.user.role !== "owner" && session.user.role !== "staff") {
    redirect("/admin");
  }

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
