import { redirect } from "next/navigation";
import { OwnerUserRolePanel } from "@/components/owner-user-role-panel";
import { getUsersData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function OwnerUsersPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner/users");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const users = await getUsersData();

  return <OwnerUserRolePanel initialUsers={users} />;
}
