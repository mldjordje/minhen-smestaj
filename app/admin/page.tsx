import Link from "next/link";

export default function AdminIndexPage() {
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
          <Link href="/admin/owner" className="primary-button">
            Owner panel
          </Link>
          <Link href="/admin/staff" className="secondary-button">
            Staff panel
          </Link>
        </div>
      </section>
    </div>
  );
}
