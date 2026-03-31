import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getBookingsData,
  getCleaningTasksData,
  getRoomBlocksData,
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

  const [bookings, cleaningTasks, teamMembers, roomBlocks] = await Promise.all([
    getBookingsData({ allowDemoFallback: false }),
    getCleaningTasksData({ allowDemoFallback: false }),
    getTeamMembersData({ allowDemoFallback: false }),
    getRoomBlocksData({ allowDemoFallback: false })
  ]);
  const arrivalsToday = bookings.filter((booking) => booking.status === "arriving");
  const activeStaff = teamMembers.filter((member) => member.role !== "owner").length;

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Staff panel</p>
        <h1>Operativa je podeljena po funkcijama</h1>
        <p>
          Staff sada ima jasan ulaz za kalendar, dolaske, ciscenje i tim bez skrolovanja kroz
          jednu veliku stranicu.
        </p>
        <div className="stats-row">
          <div className="stat-card">
            <span>Zadaci danas</span>
            <strong>{cleaningTasks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Dolasci</span>
            <strong>{arrivalsToday.length}</strong>
          </div>
          <div className="stat-card">
            <span>Blokade</span>
            <strong>{roomBlocks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Tim u smeni</span>
            <strong>{activeStaff}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Funkcije</p>
            <h2>Sta staff radi odavde</h2>
          </div>
        </div>
        <div className="process-list">
          <article className="process-card">
            <strong>Kalendar</strong>
            <p>Pregled i azuriranje rezervacija i blokada po sobi.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/staff/calendar">
                Otvori kalendar
              </Link>
            </div>
          </article>
          <article className="process-card">
            <strong>Ciscenje</strong>
            <p>Lista aktivnih zadataka za sobe i pripremu gostiju.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/staff/tasks">
                Otvori zadatke
              </Link>
            </div>
          </article>
          <article className="process-card">
            <strong>Dolasci</strong>
            <p>Gosti koji dolaze i check-in operativa za taj dan.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/staff/arrivals">
                Otvori dolaske
              </Link>
            </div>
          </article>
          <article className="process-card">
            <strong>Tim</strong>
            <p>Ko je aktivan u smeni i kome je sta dodeljeno.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/staff/team">
                Otvori tim
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
