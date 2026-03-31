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
              U Booking.com Extranet-u otvori `Rooms & Rates`, zatim listu soba ili
              `Room types`, i prekopiraj tacan naziv sobe koji se poklapa sa nasom internom sobom.
            </p>
          </article>
          <article className="process-card">
            <strong>2. Prekopiraj room ID i naziv</strong>
            <p>
              Ako se Booking.com room ID vidi u URL-u stranice sobe, u detaljima sobe ili u
              connectivity sekciji, unesi ga u owner panel. Ako ga ne vidis, ostavi to polje prazno
              i unesi samo tacan naziv sobe.
            </p>
          </article>
          <article className="process-card">
            <strong>3. Dodaj iCal linkove</strong>
            <p>
              U Booking.com kalendaru za tu sobu otvori `Sync calendars`, `Calendar sync`
              ili deo za import/export kalendara i odatle kopiraj iCal linkove.
            </p>
          </article>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Gde tacno da klikne</p>
            <h2>Sta trazis u Booking.com nalogu</h2>
          </div>
        </div>
        <div className="bullet-list">
          <span>`Booking.com room naziv`: otvori `Rooms & Rates` i kopiraj naziv sobe tacno kako pise u Extranet-u.</span>
          <span>`Booking.com room ID`: najcesce je vidljiv u URL-u, u room setup detaljima ili connectivity ekranu. Ako ga ne nadjes, sada nije obavezan za iCal sync.</span>
          <span>`Booking.com iCal import URL`: u kalendaru te sobe trazi opciju `Sync calendars`, `Export calendar` ili `Calendar import/export`, pa kopiraj URL koji Booking daje za izvoz rezervacija.</span>
          <span>`Nas export URL`: to je link koji se prikazuje u nasem adminu. Njega kopiras nazad u Booking.com ako zelis da Booking vidi nase direktne rezervacije i blokade.</span>
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
          <span>Room ID i naziv sobe nisu isto, ali room ID je sada opcion ako nije lako dostupan u Extranet-u.</span>
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
          <span>Prvo mapiraj jednu sobu i klikni `Sync now` da proveris da li rezervacije stizu u interni kalendar.</span>
          <span>Prati da li se termini iz Booking.com-a prikazuju u internom kalendaru.</span>
        </div>
      </section>
    </div>
  );
}
