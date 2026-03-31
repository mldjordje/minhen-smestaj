"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminLayoutProps = {
  children: React.ReactNode;
};

type NavGroup = {
  label: string;
  links: Array<{
    href: string;
    label: string;
  }>;
};

const ownerGroups: NavGroup[] = [
  {
    label: "Pregled i rezervacije",
    links: [
      { href: "/admin/owner", label: "Pregled" },
      { href: "/admin/owner/calendar", label: "Kalendar" },
      { href: "/admin/owner/inquiries", label: "Upiti" }
    ]
  },
  {
    label: "Operativa",
    links: [
      { href: "/admin/owner/rooms", label: "Sobe" },
      { href: "/admin/owner/tasks", label: "Zadaci" },
      { href: "/admin/owner/team", label: "Tim" },
      { href: "/admin/owner/users", label: "Korisnici" }
    ]
  },
  {
    label: "Integracije",
    links: [
      { href: "/admin/owner/booking", label: "Booking.com" },
      { href: "/admin/owner/booking-sync", label: "Booking Guide" }
    ]
  }
];

const staffGroups: NavGroup[] = [
  {
    label: "Dnevni rad",
    links: [
      { href: "/admin/staff", label: "Pregled" },
      { href: "/admin/staff/calendar", label: "Kalendar" },
      { href: "/admin/staff/arrivals", label: "Dolasci" }
    ]
  },
  {
    label: "Operativa",
    links: [
      { href: "/admin/staff/tasks", label: "Ciscenje" },
      { href: "/admin/staff/team", label: "Tim" }
    ]
  }
];

function isLinkActive(pathname: string, href: string) {
  if (href === "/admin" || href === "/admin/owner" || href === "/admin/staff") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const isOwnerRoute = pathname.startsWith("/admin/owner");
  const isStaffRoute = pathname.startsWith("/admin/staff");
  const navGroups = isOwnerRoute ? ownerGroups : isStaffRoute ? staffGroups : [];

  return (
    <main className="admin-wrap">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">Minhen Smestaj</p>
          <h2>{isOwnerRoute ? "Owner panel" : isStaffRoute ? "Staff panel" : "Operativni panel"}</h2>
          <p className="sidebar-copy">
            {isOwnerRoute
              ? "Funkcije su rasporedjene po celinama da se do kalendara, upita i integracija stize bez trazenja po dugackim stranicama."
              : isStaffRoute
                ? "Staff dobija krace putanje do dnevnog kalendara, dolazaka i zadataka bez dodatnog skrolovanja."
                : "Izaberi odgovarajucu admin zonu i funkcije koje su ti potrebne."}
          </p>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav__group">
            <p className="admin-nav__label">Glavno</p>
            <Link className={pathname === "/admin" ? "is-active" : ""} href="/admin">
              Admin pocetna
            </Link>
            <Link className={isLinkActive(pathname, "/admin/owner") ? "is-active" : ""} href="/admin/owner">
              Owner
            </Link>
            <Link className={isLinkActive(pathname, "/admin/staff") ? "is-active" : ""} href="/admin/staff">
              Staff
            </Link>
            <Link href="/">Nazad na sajt</Link>
          </div>

          {navGroups.map((group) => (
            <div key={group.label} className="admin-nav__group">
              <p className="admin-nav__label">{group.label}</p>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  className={isLinkActive(pathname, link.href) ? "is-active" : ""}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <section className="admin-content">{children}</section>
    </main>
  );
}
