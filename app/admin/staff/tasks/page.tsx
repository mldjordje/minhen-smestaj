import { redirect } from "next/navigation";
import { getCleaningTasksData, getRoomsData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";
import { getRoomDisplayName } from "@/lib/rooms";

export default async function StaffTasksPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/staff/tasks");
  }

  if (session.user.role !== "owner" && session.user.role !== "staff") {
    redirect("/admin");
  }

  const [rooms, cleaningTasks] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getCleaningTasksData({ allowDemoFallback: false })
  ]);

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Ciscenje</p>
        <h1>Aktivni operativni zadaci</h1>
        <p>Ovde staff ima cist pregled zadataka po sobi bez ostalih owner funkcija.</p>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lista</p>
            <h2>Taskovi po sobi</h2>
          </div>
        </div>
        {cleaningTasks.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Nema aktivnih zadataka</strong>
            <p>Kada owner doda zadatak, ovde ce se odmah pojaviti za staff tim.</p>
          </div>
        ) : (
          <div className="table-like">
            {cleaningTasks.map((task) => (
              <div key={task.id} className="table-row">
                <div>
                  <strong>
                    {getRoomDisplayName(
                      rooms.find((room) => room.id === task.roomId) ?? {
                        id: task.roomId,
                        name: task.roomId,
                        slug: task.roomId
                      }
                    )}
                  </strong>
                  <span>{task.notes}</span>
                </div>
                <div>{task.assignee}</div>
                <div>{task.dueAt}</div>
                <div>
                  <span className={`status-pill status-${task.status}`}>{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
