"use client";

import { useState } from "react";
import { AdminRoomCalendar } from "@/components/admin-room-calendar";
import type { Booking, Room, RoomBlock } from "@/lib/types";

type AdminCalendarPanelProps = {
  audience: "owner" | "staff";
  initialBookings: Booking[];
  initialRoomBlocks: RoomBlock[];
  rooms: Room[];
};

export function AdminCalendarPanel({
  audience,
  initialBookings,
  initialRoomBlocks,
  rooms
}: AdminCalendarPanelProps) {
  const [bookings, setBookings] = useState(initialBookings);
  const [roomBlocks, setRoomBlocks] = useState(initialRoomBlocks);

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Kalendar</p>
        <h1>
          {audience === "owner"
            ? "Pregled rezervacija i blokada po sobi"
            : "Operativni kalendar za tim i smene"}
        </h1>
        <p>
          {audience === "owner"
            ? "Ovde vodis sve termine po sobi, rucne rezervacije i blokade za odrzavanje ili prodaju."
            : "Staff ovde vidi i azurira blokade i rezervacije bez ulaska u druge sekcije admina."}
        </p>
      </section>

      <AdminRoomCalendar
        audience={audience}
        bookings={bookings}
        onBookingsChange={setBookings}
        onRoomBlocksChange={setRoomBlocks}
        roomBlocks={roomBlocks}
        rooms={rooms}
      />
    </div>
  );
}
