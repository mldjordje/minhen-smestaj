"use client";

import { useState } from "react";
import { AdminRoomCalendar } from "@/components/admin-room-calendar";
import { getRoomDisplayName } from "@/lib/rooms";
import { Booking, CleaningTask, Room, RoomBlock, TeamMember } from "@/lib/types";

function getRoomName(roomId: string, rooms: Room[]) {
  const room = rooms.find((item) => item.id === roomId);

  return room ? getRoomDisplayName(room) : roomId;
}

type StaffDashboardProps = {
  bookings: Booking[];
  cleaningTasks: CleaningTask[];
  roomBlocks: RoomBlock[];
  rooms: Room[];
  teamMembers: TeamMember[];
};

export function StaffDashboard({
  bookings,
  cleaningTasks,
  roomBlocks,
  rooms,
  teamMembers
}: StaffDashboardProps) {
  const [localBookings, setLocalBookings] = useState(bookings);
  const [localRoomBlocks, setLocalRoomBlocks] = useState(roomBlocks);
  const arrivalsToday = localBookings.filter((booking) => booking.status === "arriving");
  const activeStaff = teamMembers.filter((member) => member.role !== "owner").length;

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel" id="overview">
        <p className="eyebrow">Staff operations</p>
        <h1>Ciscenje soba, uvodjenje gostiju i blokade termina na jednom mestu</h1>
        <p>
          Staff sada ima isti operativni kalendar kao owner, pa moze da blokira termin,
          unese rucnu rezervaciju i menja postojeca zauzeca bez izlaska iz admina.
        </p>
        <div className="stats-row">
          <div className="stat-card">
            <span>Zadaci danas</span>
            <strong>{cleaningTasks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Dolasci danas</span>
            <strong>{arrivalsToday.length}</strong>
          </div>
          <div className="stat-card">
            <span>Aktivne blokade</span>
            <strong>{localRoomBlocks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Tim u smeni</span>
            <strong>{activeStaff}</strong>
          </div>
        </div>
      </section>

      <AdminRoomCalendar
        audience="staff"
        bookings={localBookings}
        onBookingsChange={setLocalBookings}
        onRoomBlocksChange={setLocalRoomBlocks}
        roomBlocks={localRoomBlocks}
        rooms={rooms}
        sectionId="calendar"
      />

      <div className="dashboard-split-grid">
        <section className="dashboard-panel" id="tasks">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Checklist</p>
              <h2>Zadaci ciscenja</h2>
            </div>
          </div>
          {cleaningTasks.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Nema aktivnih zadataka</strong>
              <p>Kada zadaci iz baze budu dodeljeni, bice prikazani ovde.</p>
            </div>
          ) : (
            <div className="table-like">
              {cleaningTasks.map((task) => (
                <div key={task.id} className="table-row">
                  <div>
                    <strong>{getRoomName(task.roomId, rooms)}</strong>
                    <span>{task.notes}</span>
                  </div>
                  <div>{task.assignee}</div>
                  <div>{task.dueAt}</div>
                  <div>
                    <span className={`status-pill status-${task.status}`}>{task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-panel" id="arrivals">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Check-in</p>
              <h2>Gosti koji dolaze danas</h2>
            </div>
          </div>
          {arrivalsToday.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Nema dolazaka za danas</strong>
              <p>Rucne rezervacije i potvrdene baze rezervacija ce se pojaviti ovde.</p>
            </div>
          ) : (
            <div className="table-like">
              {arrivalsToday.map((booking) => (
                <div key={booking.id} className="table-row">
                  <div>
                    <strong>{booking.guestName}</strong>
                    <span>{getRoomName(booking.roomId, rooms)}</span>
                  </div>
                  <div>{booking.source}</div>
                  <div>
                    {booking.checkIn} - {booking.checkOut}
                  </div>
                  <div>{booking.guests} gosta</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="dashboard-panel" id="team">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Tim</p>
            <h2>Ko je danas aktivan</h2>
          </div>
        </div>
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
      </section>
    </div>
  );
}
