import { redirect } from "next/navigation";
import { OwnerCleaningTasksPanel } from "@/components/owner-cleaning-tasks-panel";
import { getCleaningTasksData, getRoomsData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function OwnerTasksPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner/tasks");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const [rooms, cleaningTasks] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getCleaningTasksData({ allowDemoFallback: false })
  ]);

  return <OwnerCleaningTasksPanel initialCleaningTasks={cleaningTasks} rooms={rooms} />;
}
