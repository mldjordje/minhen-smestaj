"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const ownerLinks = [
  { href: "/admin/owner", label: "Pregled" },
  { href: "/admin/owner#calendar", label: "Kalendar" },
  { href: "/admin/owner#inquiries", label: "Upiti" },
  { href: "/admin/owner#mapping", label: "Booking.com" },
  { href: "/admin/owner#rooms", label: "Sobe" },
  { href: "/admin/owner#integrations", label: "Integracije" },
  { href: "/admin/owner/booking-sync", label: "Booking Guide" }
];

const staffLinks = [
  { href: "/admin/staff", label: "Pregled" },
  { href: "/admin/staff#calendar", label: "Kalendar" },
  { href: "/admin/staff#tasks", label: "Ciscenje" },
  { href: "/admin/staff#arrivals", label: "Dolasci" },
  { href: "/admin/staff#team", label: "Tim" }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const isOwnerRoute = pathname.startsWith("/admin/owner");
  const isStaffRoute = pathname.startsWith("/admin/staff");
  const sectionLinks = isOwnerRoute ? ownerLinks : isStaffRoute ? staffLinks : [];

  return (
    <main className="admin-wrap">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">Minhen Smestaj</p>
          <h2>{isOwnerRoute ? "Owner panel" : isStaffRoute ? "Staff panel" : "Operativni panel"}</h2>
          <p className="sidebar-copy">
            {isOwnerRoute
              ? "Vlasnik upravlja sobama, rezervacijama, mapiranjem i integracijama."
              : isStaffRoute
                ? "Staff vodi operativu, blokade termina, dolaske i zadatke po sobama."
                : "Izaberi odgovarajucu admin zonu i funkcije koje su ti potrebne."}
          </p>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav__group">
            <p className="admin-nav__label">Glavno</p>
            <Link className={pathname === "/admin" ? "is-active" : ""} href="/admin">
              Admin pocetna
            </Link>
            <Link className={pathname === "/admin/owner" ? "is-active" : ""} href="/admin/owner">
              Owner
            </Link>
            <Link className={pathname === "/admin/staff" ? "is-active" : ""} href="/admin/staff">
              Staff
            </Link>
            <Link href="/">Nazad na sajt</Link>
          </div>

          {sectionLinks.length > 0 ? (
            <div className="admin-nav__group">
              <p className="admin-nav__label">Sekcije</p>
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  className={pathname === link.href ? "is-active" : ""}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </nav>
      </aside>
      <section className="admin-content">{children}</section>
    </main>
  );
}
