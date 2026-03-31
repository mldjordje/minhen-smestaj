import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getBookingsData,
  getCleaningTasksData,
  getInquiriesData,
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

  const [rooms, bookings, inquiries, roomChannelMappings, cleaningTasks, teamMembers] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false }),
    getInquiriesData({ allowDemoFallback: false }),
    getRoomChannelMappingsData({ allowDemoFallback: false }),
    getCleaningTasksData({ allowDemoFallback: false }),
    getTeamMembersData({ allowDemoFallback: false })
  ]);
  const connectedMappings = roomChannelMappings.filter((mapping) => mapping.syncEnabled).length;
  const activeInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "new" || inquiry.status === "contacted"
  ).length;
  const arrivingBookings = bookings.filter((booking) => booking.status === "arriving").length;

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Owner panel</p>
        <h1>Pregledno upravljanje: jedna funkcija, jedna stranica</h1>
        <p>
          Owner pocetna je sada samo pregled i ulaz u funkcije. Kalendar, upiti, sobe,
          Booking.com, zadaci, tim i korisnici imaju svoje zasebne stranice.
        </p>
        <div className="stats-row">
          <div className="stat-card">
            <span>Ukupno soba</span>
            <strong>{rooms.length}</strong>
          </div>
          <div className="stat-card">
            <span>Aktivni upiti</span>
            <strong>{activeInquiries}</strong>
          </div>
          <div className="stat-card">
            <span>Dolasci</span>
            <strong>{arrivingBookings}</strong>
          </div>
          <div className="stat-card">
            <span>Booking.com povezano</span>
            <strong>{connectedMappings}</strong>
          </div>
          <div className="stat-card">
            <span>Otvoreni zadaci</span>
            <strong>{cleaningTasks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Clanovi tima</span>
            <strong>{teamMembers.length}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Funkcije</p>
            <h2>Izaberi sta radis</h2>
          </div>
        </div>
        <div className="process-list">
          <article className="process-card">
            <strong>Kalendar</strong>
            <p>Rezervacije, blokade i rucni unosi termina po sobi.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/owner/calendar">
                Otvori kalendar
              </Link>
            </div>
          </article>
          <article className="process-card">
            <strong>Upiti</strong>
            <p>Javni upiti sa sajta, kontaktiranje i pretvaranje u rezervacije.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/owner/inquiries">
                Otvori upite
              </Link>
            </div>
          </article>
          <article className="process-card">
            <strong>Sobe</strong>
            <p>Dodavanje novih soba i pregled inventara bez rucnog unosa lokacije.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/owner/rooms">
                Otvori sobe
              </Link>
            </div>
          </article>
          <article className="process-card">
            <strong>Booking.com</strong>
            <p>Mapiranje soba, iCal linkovi i rucni sync integracije.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/owner/booking">
                Otvori integraciju
              </Link>
              <Link className="secondary-button" href="/admin/owner/booking-sync">
                Guide
              </Link>
            </div>
          </article>
          <article className="process-card">
            <strong>Zadaci i tim</strong>
            <p>Raspodela operativnih taskova i odrzavanje smena po clanovima tima.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/owner/tasks">
                Zadaci
              </Link>
              <Link className="secondary-button" href="/admin/owner/team">
                Tim
              </Link>
            </div>
          </article>
          <article className="process-card">
            <strong>Korisnicke role</strong>
            <p>Google korisnici, guest/staff/owner role i pristup panelima.</p>
            <div className="cta-row">
              <Link className="primary-button" href="/admin/owner/users">
                Otvori korisnike
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
