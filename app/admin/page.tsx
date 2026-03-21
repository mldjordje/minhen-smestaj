import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

export default async function AdminIndexPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin");
  }

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Admin overview</p>
        <h1>Izaberi operativni panel</h1>
        <p>
          Owner admin je za sobe, rezervacije i integracije. Staff admin je za
          ciscenje i uvodjenje gostiju.
        </p>
        <div className="cta-row">
          {session.user.role === "owner" ? (
            <Link href="/admin/owner" className="primary-button">
              Owner panel
            </Link>
          ) : null}
          <Link href="/admin/owner/booking-sync" className="secondary-button">
            Booking.com guide
          </Link>
          {session.user.role === "owner" || session.user.role === "staff" ? (
            <Link href="/admin/staff" className="secondary-button">
              Staff panel
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
