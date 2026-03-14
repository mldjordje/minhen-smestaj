import { RoomCard } from "@/components/room-card";
import { SiteHeader } from "@/components/site-header";
import { rooms } from "@/lib/data";

export default function RoomsPage() {
  return (
    <main className="page-wrap">
      <SiteHeader />
      <section className="section-block site-shell">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">All units</p>
            <h1>Pregled svih soba i apartmana</h1>
          </div>
          <p className="inline-note">
            Ovaj ekran je javni katalog. Slike soba su sada preuzete sa starog sajta,
            a sledece dodajemo filtere, booking formu i proveru raspolozivosti.
          </p>
        </div>
        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </main>
  );
}
