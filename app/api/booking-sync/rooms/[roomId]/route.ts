import { NextResponse } from "next/server";
import { getBookingsData, getRoomBlocksData, getRoomsData } from "@/lib/admin-data";
import { buildRoomCalendar } from "@/lib/ical-export";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    roomId: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { roomId } = await context.params;
  const [rooms, bookings, roomBlocks] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false }),
    getRoomBlocksData({ allowDemoFallback: false })
  ]);
  const room = rooms.find((entry) => entry.id === roomId);

  if (!room) {
    return new NextResponse("Room not found", { status: 404 });
  }

  const calendar = buildRoomCalendar(
    room,
    bookings.filter((booking) => booking.roomId === roomId),
    roomBlocks.filter((block) => block.roomId === roomId)
  );

  return new NextResponse(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
