import { redirect } from "next/navigation";
import { getTeamMembersData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function StaffTeamPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/staff/team");
  }

  if (session.user.role !== "owner" && session.user.role !== "staff") {
    redirect("/admin");
  }

  const teamMembers = await getTeamMembersData({ allowDemoFallback: false });

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Tim</p>
        <h1>Ko je aktivan u smeni</h1>
        <p>Staff dobija cistu listu ljudi i smena bez owner administracije i konfiguracija.</p>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lista</p>
            <h2>Clanovi tima</h2>
          </div>
        </div>
        {teamMembers.length === 0 ? (
          <div className="admin-empty-state">
            <strong>Tim jos nije unet</strong>
            <p>Kada owner doda clanove tima i smene, ovde ce biti prikazani za staff.</p>
          </div>
        ) : (
          <div className="table-like">
            {teamMembers.map((member) => (
              <div key={member.id} className="table-row">
                <div>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
                <div>{member.shift}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
