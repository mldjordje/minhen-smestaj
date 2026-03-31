import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

export default async function AdminIndexPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin");
  }

  if (session.user.role === "owner") {
    redirect("/admin/owner");
  }

  if (session.user.role === "staff") {
    redirect("/admin/staff");
  }

  redirect("/account");
}
