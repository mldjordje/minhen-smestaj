import { redirect } from "next/navigation";
import { OwnerTeamPanel } from "@/components/owner-team-panel";
import { getTeamMembersData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function OwnerTeamPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner/team");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const teamMembers = await getTeamMembersData({ allowDemoFallback: false });

  return <OwnerTeamPanel initialTeamMembers={teamMembers} />;
}
