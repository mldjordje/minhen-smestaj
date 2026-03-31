import Link from "next/link";
import { redirect } from "next/navigation";
import { getRoomChannelMappingsData, getRoomsData } from "@/lib/admin-data";
import { getAuthSession } from "@/lib/auth";
import { getRoomDisplayName } from "@/lib/rooms";

export default async function OwnerBookingSyncGuidePage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/admin/owner/booking-sync");
  }

  if (session.user.role !== "owner") {
    redirect("/admin");
  }

  const [rooms, mappings] = await Promise.all([
    getRoomsData({ allowDemoFallback: false }),
    getRoomChannelMappingsData({ allowDemoFallback: false })
  ]);

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel">
        <p className="eyebrow">Booking.com guide</p>
        <h1>Kako da povezes internu sobu sa Booking.com sobom</h1>
        <p>
          Ova strana sluzi kao operativni tutorial za vlasnika ili asistenta koji unosi
          mapiranje izmedju nase sobe u aplikaciji i odgovarajuce sobe na Booking.com-u.
        </p>
        <div className="cta-row">
          <Link className="primary-button" href="/admin/owner/booking">
            Nazad na Booking.com
          </Link>
          <Link className="secondary-button" href="/admin/owner">
            Owner pregled
          </Link>
          <a
            className="secondary-button"
            href="https://admin.booking.com/hotel/hoteladmin/extranet_ng/manage/rooms.html"
            rel="noreferrer"
            target="_blank"
          >
            Otvori Booking.com Extranet
          </a>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Koraci</p>
            <h2>Sta tacno treba uneti</h2>
          </div>
        </div>
        <div className="process-list">
          <article className="process-card">
            <strong>1. Pronadji sobu u Extranet-u</strong>
            <p>
              U Booking.com panelu otvori Rooms and rates i nadji naziv sobe koji se
              poklapa sa internom sobom iz nase aplikacije.
            </p>
          </article>
          <article className="process-card">
            <strong>2. Prekopiraj room ID i naziv</strong>
            <p>
              U owner panel unesi Booking.com room ID i tacan naziv sobe kako bi mapiranje
              bilo jasno i proverljivo.
            </p>
          </article>
          <article className="process-card">
            <strong>3. Dodaj iCal linkove</strong>
            <p>
              Ako koristimo iCal sync, kopiraj export i import URL za tu sobu i unesi ih
              u Booking.com mapping sekciju.
            </p>
          </article>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Checklist</p>
            <h2>Pravila pre aktivacije sync-a</h2>
          </div>
        </div>
        <div className="bullet-list">
          <span>Naziv sobe u aplikaciji mora jasno odgovarati nazivu na Booking.com-u.</span>
          <span>Room ID i naziv sobe nisu isto, unesi oba podatka ako su dostupna.</span>
          <span>Pre aktivacije proveri da import/export URL vode bas na tu sobu.</span>
          <span>Aktiviraj sync tek kada je mapiranje provereno, inace ostavi kao draft.</span>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Status</p>
            <h2>Koje sobe su vec povezane</h2>
          </div>
        </div>
        <div className="table-like">
          {rooms.map((room) => {
            const mapping = mappings.find((item) => item.roomId === room.id);

            return (
              <div key={room.id} className="table-row">
                <div>
                  <strong>{getRoomDisplayName(room)}</strong>
                  <span>{room.neighborhood}</span>
                </div>
                <div>{mapping?.externalRoomName || "Nije povezano"}</div>
                <div>{mapping?.externalRoomId || "Nema Booking.com ID"}</div>
                <div>
                  <span
                    className={`status-pill ${
                      mapping?.syncEnabled ? "status-mapped" : "status-unmapped"
                    }`}
                  >
                    {mapping?.syncEnabled ? "sync aktivan" : "ceka mapiranje"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Gde dalje</p>
            <h2>Posle unosa mapiranja</h2>
          </div>
        </div>
        <div className="bullet-list">
          <span>Vrati se u owner panel i sacuvaj Booking.com mapping za svaku sobu.</span>
          <span>Pokreni test sync sa jednom sobom pre nego sto ukljucis sve jedinice.</span>
          <span>Prati da li se termini iz Booking.com-a prikazuju u internom kalendaru.</span>
        </div>
      </section>
    </div>
  );
}
