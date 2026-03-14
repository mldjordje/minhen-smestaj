import Image from "next/image";
import Link from "next/link";
import { RoomCard } from "@/components/room-card";
import { SiteHeader } from "@/components/site-header";
import { bookings, legacyGallery, rooms } from "@/lib/data";

const highlights = [
  "Povezivanje Booking.com kalendara i operativnog tima",
  "Owner admin za unos soba, cena i statusa",
  "Staff admin za ciscenje, check-in i dnevne zadatke"
];

export default function HomePage() {
  const arrivalsToday = bookings.filter((booking) => booking.status === "arriving").length;

  return (
    <main className="page-wrap">
      <SiteHeader />

      <section className="hero-section site-shell">
        <div className="hero-copy">
          <p className="eyebrow">Munich accommodation ops</p>
          <h1>Jedna aplikacija za rezervacije, sobe i dnevnu operativu u Minhenu</h1>
          <p className="hero-text">
            Javna strana prikazuje smestaj, a admin deo razdvaja vlasnika i tim
            koji cisti sobe i uvodi goste. Ovo je pocetna MVP osnova za projekat.
          </p>
          <div className="cta-row">
            <Link href="/admin/owner" className="primary-button">
              Otvori owner admin
            </Link>
            <Link href="/admin/staff" className="secondary-button">
              Otvori staff admin
            </Link>
          </div>
          <div className="bullet-list">
            {highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-card">
            <Image
              src="/images/legacy/jagdschloessl-5.jpg"
              alt="Smestaj u Minhenu"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="hero-photo"
            />
          </div>
          <div className="floating-card">
            <span>Danasnji check-in</span>
            <strong>{arrivalsToday}</strong>
            <small>Booking.com + direktne rezervacije</small>
          </div>
        </div>
      </section>

      <section className="stats-band site-shell">
        <div className="stat-card">
          <span>Ukupno jedinica</span>
          <strong>{rooms.length}</strong>
        </div>
        <div className="stat-card">
          <span>Aktivne rezervacije</span>
          <strong>{bookings.length}</strong>
        </div>
        <div className="stat-card">
          <span>Status dashboarda</span>
          <strong>MVP spreman</strong>
        </div>
      </section>

      <section className="section-block site-shell">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">Smestaj</p>
            <h2>Pocetni katalog soba za Minhen</h2>
          </div>
          <Link href="/rooms" className="text-link">
            Pogledaj sve jedinice
          </Link>
        </div>
        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="section-block site-shell">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">Legacy galerija</p>
            <h2>Originalne fotografije preuzete sa starog sajta</h2>
          </div>
          <p className="inline-note">
            U aplikaciju su ubacene postojece slike objekta, soba i zajednickih prostora.
          </p>
        </div>
        <div className="gallery-grid">
          {legacyGallery.map((item) => (
            <article key={item.image} className="gallery-card">
              <div className="gallery-image-wrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="room-image"
                />
              </div>
              <div className="gallery-copy">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block muted-block">
        <div className="site-shell ops-grid">
          <div>
            <p className="eyebrow">Kako radi</p>
            <h2>Operativni tok koji odgovara ovom projektu</h2>
          </div>
          <div className="process-list">
            <article className="process-card">
              <strong>1. Owner unosi jedinice</strong>
              <p>
                Kroz admin dodaje sobe, cene, kapacitete, slike i pravila boravka.
              </p>
            </article>
            <article className="process-card">
              <strong>2. Rezervacije ulaze u kalendar</strong>
              <p>
                Booking.com sinonizacija puni raspolozivost i spaja kalendar sa
                internim statusima sobe.
              </p>
            </article>
            <article className="process-card">
              <strong>3. Staff dobija zadatke</strong>
              <p>
                Tim za ciscenje i check-in vidi dnevne dolaske, prioritete i sobe
                koje moraju biti spremne.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block site-shell cta-panel">
        <div>
          <p className="eyebrow">Sledeci korak</p>
          <h2>Backend povezivanje za produkciju</h2>
          <p>
            Sledece vezujemo bazu, autentikaciju po ulogama, Vercel Blob za slike
            i Booking.com uvoz rezervacija.
          </p>
        </div>
        <Link href="/admin/owner" className="primary-button">
          Nastavi iz owner panela
        </Link>
      </section>
    </main>
  );
}
