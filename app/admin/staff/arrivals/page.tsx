import { redirect } from "next/navigation";
import { getBookingsData, getRoomsData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";
import { getRoomDisplayName } from "@/lib/rooms";

export default async function StaffArrivalsPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/staff/arrivals");
  }

  if (session.user.role !== "owner" && session.user.role !== "staff") {
    redirect("/admin");
  }

  const [rooms, bookings] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false })
  ]);
  const arrivalsToday = bookings.filter((booking) => booking.status === "arriving");

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Dolasci</p>
        <h1>Check-in pregled za staff</h1>
        <p>Ovde je samo ono sto timu treba za uvodjenje gostiju i pripremu dolazaka.</p>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Check-in</p>
            <h2>Gosti koji dolaze</h2>
          </div>
        </div>
        {arrivalsToday.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Nema dolazaka za danas</strong>
            <p>Kada rezervacija udje u arriving status, bice prikazana ovde.</p>
          </div>
        ) : (
          <div className="table-like">
            {arrivalsToday.map((booking) => (
              <div key={booking.id} className="table-row">
                <div>
                  <strong>{booking.guestName}</strong>
                  <span>
                    {getRoomDisplayName(
                      rooms.find((room) => room.id === booking.roomId) ?? {
                        id: booking.roomId,
                        name: booking.roomId,
                        slug: booking.roomId
                      }
                    )}
                  </span>
                </div>
                <div>{booking.source}</div>
                <div>
                  {booking.checkIn} - {booking.checkOut}
                </div>
                <div>{booking.guests} gosta</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
