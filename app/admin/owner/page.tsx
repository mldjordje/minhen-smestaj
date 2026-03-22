import { OwnerDashboard } from "@/components/owner-dashboard";
import { redirect } from "next/navigation";
import {
  getActivityLogData,
  getBookingSyncSummary,
  getBookingsData,
  getCleaningTasksData,
  getInquiriesData,
  getRoomBlocksData,
  getRoomChannelMappingsData,
  getRoomsData,
  getTeamMembersData
} from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function OwnerAdminPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const [rooms, bookings, inquiries, roomChannelMappings, roomBlocks, integrationSummary, activityLog, cleaningTasks, teamMembers] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false }),
    getInquiriesData({ allowDemoFallback: false }),
    getRoomChannelMappingsData({ allowDemoFallback: false }),
    getRoomBlocksData({ allowDemoFallback: false }),
    getBookingSyncSummary({ allowDemoFallback: false }),
    getActivityLogData({ allowDemoFallback: false }),
    getCleaningTasksData({ allowDemoFallback: false }),
    getTeamMembersData({ allowDemoFallback: false })
  ]);

  return (
    <OwnerDashboard
      activityLog={activityLog}
      bookings={bookings}
      cleaningTasks={cleaningTasks}
      inquiries={inquiries}
      integrationSummary={integrationSummary}
      roomBlocks={roomBlocks}
      roomChannelMappings={roomChannelMappings}
      rooms={rooms}
      teamMembers={teamMembers}
    />
  );
}
