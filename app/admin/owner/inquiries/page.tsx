import { redirect } from "next/navigation";
import { OwnerInquiriesPanel } from "@/components/owner-inquiries-panel";
import { getInquiriesData, getRoomsData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function OwnerInquiriesPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner/inquiries");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const [rooms, inquiries] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getInquiriesData({ allowDemoFallback: false })
  ]);

  return <OwnerInquiriesPanel initialInquiries={inquiries} rooms={rooms} />;
}
