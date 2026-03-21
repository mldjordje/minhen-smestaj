import { NextResponse } from "next/server";
import { getBookingsData, getRoomsData } from "@/lib/admin-data";
import { buildRoomCalendar } from "@/lib/ical-export";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    roomId: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { roomId } = await context.params;
  const [rooms, bookings] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getBookingsData({ allowDemoFallback: false })
  ]);
  const room = rooms.find((entry) => entry.id === roomId);

  if (!room) {
    return new NextResponse("Room not found", { status: 404 });
  }

  const calendar = buildRoomCalendar(
    room,
    bookings.filter((booking) => booking.roomId === roomId)
  );

  return new NextResponse(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
