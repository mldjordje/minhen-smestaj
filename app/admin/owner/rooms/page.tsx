import { redirect } from "next/navigation";
import { OwnerRoomsManager } from "@/components/owner-rooms-manager";
import { getRoomChannelMappingsData, getRoomsData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";

export default async function OwnerRoomsPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner/rooms");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const [rooms, roomChannelMappings] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getRoomChannelMappingsData({ allowDemoFallback: false })
  ]);

  return <OwnerRoomsManager initialMappings={roomChannelMappings} initialRooms={rooms} />;
}
