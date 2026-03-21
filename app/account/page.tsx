import Link from "next/link";
import { redirect } from "next/navigation";
import { getBookingsForUser } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";
import { getRoomsData } from "@/lib/admin-data";
import { getRoomDisplayName } from "@/lib/rooms";

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/account");
  }

  const [bookings, rooms] = await Promise.all([
    getBookingsForUser(session.user.id),
    getRoomsData({ allowDemoFallback: false })
  ]);

  const upcomingBookings = bookings.filter((booking) => booking.checkOut >= new Date().toISOString().slice(0, 10));
  const pastBookings = bookings.filter((booking) => booking.checkOut < new Date().toISOString().slice(0, 10));

  return (
    <main className="site-shell account-shell">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Moj nalog</p>
        <h1>Moje rezervacije</h1>
        <p>
          Ovde su prikazane vase direktne rezervacije, status i osnovni detalji za boravak.
        </p>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Aktivne rezervacije</p>
            <h2>Predstojeci boravci</h2>
          </div>
        </div>
        {upcomingBookings.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Jos nema potvrdenih rezervacija</strong>
            <p>
              Kada zavrsite prvu rezervaciju, ovde cete videti detalje i kontakt za izmene.
            </p>
            <Link className="primary-button" href="/rooms">
              Pogledaj sobe
            </Link>
          </div>
        ) : (
          <div className="table-like">
            {upcomingBookings.map((booking) => {
              const room = rooms.find((item) => item.id === booking.roomId);

              return (
                <div key={booking.id} className="table-row">
                  <div>
                    <strong>{room ? getRoomDisplayName(room) : booking.roomId}</strong>
                    <span>{booking.id}</span>
                  </div>
                  <div>
                    {booking.checkIn} - {booking.checkOut}
                  </div>
                  <div>{booking.guests} gosta</div>
                  <div className="admin-inline-actions">
                    <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
                    <span className="inline-note">{booking.contactPhone || "Kontakt preko admina"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Istorija</p>
            <h2>Prosle rezervacije</h2>
          </div>
        </div>
        {pastBookings.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Nema proslih rezervacija</strong>
            <p>Istorija boravaka ce se pojaviti ovde nakon prvog check-out-a.</p>
          </div>
        ) : (
          <div className="table-like">
            {pastBookings.map((booking) => {
              const room = rooms.find((item) => item.id === booking.roomId);

              return (
                <div key={booking.id} className="table-row">
                  <div>
                    <strong>{room ? getRoomDisplayName(room) : booking.roomId}</strong>
                    <span>{booking.id}</span>
                  </div>
                  <div>
                    {booking.checkIn} - {booking.checkOut}
                  </div>
                  <div>{booking.guests} gosta</div>
                  <div>
                    <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
