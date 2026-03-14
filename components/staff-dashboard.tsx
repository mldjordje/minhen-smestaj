import { bookings, cleaningTasks, rooms, teamMembers } from "@/lib/data";

function getRoomName(roomId: string) {
  return rooms.find((room) => room.id === roomId)?.name ?? roomId;
}

export function StaffDashboard() {
  const arrivalsToday = bookings.filter((booking) => booking.status === "arriving");
  const activeStaff = teamMembers.filter((member) => member.role !== "owner").length;

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Staff operations</p>
        <h1>Ciscenje soba i uvodjenje gostiju na jednom mestu</h1>
        <p>
          Radnici vide sta treba da ociste, ko dolazi danas i koje sobe moraju da
          budu spremne pre check-in-a.
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
            <span>Tim u smeni</span>
            <strong>{activeStaff}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Checklist</p>
            <h2>Zadaci ciscenja</h2>
          </div>
        </div>
        <div className="table-like">
          {cleaningTasks.map((task) => (
            <div key={task.id} className="table-row">
              <div>
                <strong>{getRoomName(task.roomId)}</strong>
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
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Check-in</p>
            <h2>Gosti koji dolaze danas</h2>
          </div>
        </div>
        <div className="table-like">
          {arrivalsToday.map((booking) => (
            <div key={booking.id} className="table-row">
              <div>
                <strong>{booking.guestName}</strong>
                <span>{getRoomName(booking.roomId)}</span>
              </div>
              <div>{booking.source}</div>
              <div>
                {booking.checkIn} - {booking.checkOut}
              </div>
              <div>{booking.guests} gosta</div>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
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
