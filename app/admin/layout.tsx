import Link from "next/link";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const links = [
  { href: "/", label: "Nazad na sajt" },
  { href: "/admin/owner", label: "Owner" },
  { href: "/admin/owner/booking-sync", label: "Booking.com guide" },
  { href: "/admin/staff", label: "Staff" }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main className="admin-wrap">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">Minhen Smestaj</p>
          <h2>Operativni panel</h2>
          <p className="sidebar-copy">
            Dve odvojene zone: vlasnik upravlja jedinicama, a tim operativom.
          </p>
        </div>
        <nav className="admin-nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="admin-content">{children}</section>
    </main>
  );
}
