import Link from "next/link";

const navigation = [
  { href: "/", label: "Pocetna" },
  { href: "/rooms", label: "Smestaj" },
  { href: "/admin/owner", label: "Owner admin" },
  { href: "/admin/staff", label: "Staff admin" }
];

export function SiteHeader() {
  return (
    <header className="site-shell">
      <div className="topbar">
        <span>Minhen smestaj za radnike, turiste i kratke poslovne boravke</span>
        <span>Support: +49 89 000 000</span>
      </div>
      <div className="navbar">
        <Link className="brand" href="/">
          <span className="brand-badge">MS</span>
          <span>
            <strong>Minhen Smestaj</strong>
            <small>booking + operativa</small>
          </span>
        </Link>
        <nav className="nav-links">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
