/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BookingExperiencePanel } from "@/components/booking-experience-panel";
import {
  LandingMediaRail,
  LandingMotionButton,
  LandingMotionOrchestrator
} from "@/components/landing-motion";
import { getBookingsData, getRoomBlocksData, getRoomsData } from "@/lib/admin-data";
import { getRoomDisplayName } from "@/lib/rooms";
import { getLandingGallery } from "@/lib/site-gallery";

const processSteps = [
  {
    index: "01",
    title: "Izaberi sobu",
    text: "Pregledaj realne fotografije i kapacitet."
  },
  {
    index: "02",
    title: "Klikni datume",
    text: "Kalendar odmah pokazuje slobodne termine."
  },
  {
    index: "03",
    title: "Posalji upit",
    text: "WhatsApp ili direktna rezervacija bez lutanja."
  }
];

export default async function HomePage() {
  const [bookings, roomBlocks, rooms, landingGallery] = await Promise.all([
    getBookingsData({ allowDemoFallback: false }),
    getRoomBlocksData({ allowDemoFallback: false }),
    getRoomsData({ allowDemoFallback: false }),
    getLandingGallery()
  ]);

  const arrivalsToday = bookings.filter((booking) => booking.status === "arriving").length;
  const availableRooms = rooms.filter((room) => room.status === "available").length;
  const startingPrice = rooms.length > 0 ? Math.min(...rooms.map((room) => room.pricePerNight)) : null;
  const mediaRailItems = landingGallery.showcaseImages.slice(0, 4).map((item) => ({
    alt: item.alt,
    src: item.src,
    title: item.title
  }));
  const featuredRooms = rooms.slice(0, 3);

  return (
    <>
      <LandingMotionOrchestrator />

      <section
        className="landing-cinematic-hero"
        id="rezervacija"
        style={{ backgroundImage: "url('/images/legacy/jagdschloessl-5.jpg')" }}
      >
        <div className="container landing-cinematic-hero__grid">
          <div className="landing-cinematic-hero__copy">
            <h1>Smestaj blizu Minhena</h1>
            <p>
              Mirne sobe, direktna dostupnost i brz dogovor za goste iz regiona.
            </p>
            <div className="landing-cinematic-actions">
              <LandingMotionButton className="primary-button" href="https://wa.me/491772078868">
                Posalji upit
              </LandingMotionButton>
              <Link className="secondary-button" href="/rooms">
                Pogledaj sobe
              </Link>
            </div>
            <div className="landing-floating-proof">
              <article>
                <span>Dolasci</span>
                <strong>{arrivalsToday} danas</strong>
              </article>
              <article>
                <span>Dostupno</span>
                <strong>{availableRooms} sobe</strong>
              </article>
              <article>
                <span>Cena</span>
                <strong>{startingPrice ? `od ${startingPrice} EUR` : "Na upit"}</strong>
              </article>
            </div>
          </div>

          <div className="landing-cinematic-showcase">
            <img
              alt={landingGallery.detailImage ? "Enterijer smestaja" : "Smestaj blizu Minhena"}
              className="landing-parallax-media"
              src={landingGallery.detailImage}
            />
            <div>
              <span>Dostupnost uzivo</span>
              <strong>{availableRooms} sobe slobodne</strong>
              <p>Booking pregled je odmah ispod hero sekcije.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-immersive-strip landing-reveal">
        <div className="container">
          <LandingMediaRail items={mediaRailItems} />
        </div>
      </section>

      {rooms.length > 0 ? (
        <section className="landing-booking-stage landing-reveal">
          <div className="container">
            <BookingExperiencePanel
              bookings={bookings}
              dailyFormSubtitle="Izaberi dane i odmah posalji upit."
              defaultRoomSlug={rooms[0]?.slug}
              headingEyebrow="Dostupnost"
              headingNote="Jedan pogled: soba, kalendar, rezervacija."
              headingTitle="Rezervisi bez cekanja"
              monthlyFormSubtitle="Izaberi duzi boravak i posalji upit."
              roomBlocks={roomBlocks}
              rooms={rooms}
            />
          </div>
        </section>
      ) : null}

      <section className="landing-spotlight landing-reveal" id="o-smestaju">
        <div className="container landing-spotlight__grid">
          <div>
            <h2>Manje price. Vise poverenja.</h2>
            <p>
              Realne sobe, realna dostupnost i booking tok koji izgleda kao gotov proizvod,
              ne kao privremena forma.
            </p>
          </div>
          <div className="landing-spotlight__stats">
            <article>
              <strong>{rooms.length}</strong>
              <span>aktivne sobe</span>
            </article>
            <article>
              <strong>{availableRooms}</strong>
              <span>trenutno slobodne</span>
            </article>
            <article>
              <strong>14+</strong>
              <span>dana pregleda</span>
            </article>
          </div>
        </div>
      </section>

      <section className="landing-featured-rooms landing-reveal">
        <div className="container">
          <div className="landing-section-heading">
            <h2>Sobe koje se odmah prodaju</h2>
            <Link className="text-link" href="/rooms">
              Sve sobe
            </Link>
          </div>
          <div className="landing-featured-rooms__grid">
            {featuredRooms.map((room, index) => (
              <article className={`landing-room-story landing-room-story--${index + 1}`} key={room.id}>
                <Link href={`/rooms/${room.slug}`}>
                  <img alt={getRoomDisplayName(room)} className="landing-parallax-media" src={room.image} />
                </Link>
                <div>
                  <span>{room.neighborhood}</span>
                  <h3>{getRoomDisplayName(room)}</h3>
                  <p>
                    {room.capacity} gosta / {room.pricePerNight} EUR / noc
                  </p>
                  <Link className="secondary-button" href={`/rooms/${room.slug}#booking`}>
                    Rezervisi
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-process-band landing-reveal">
        <div className="container landing-process-band__grid">
          {processSteps.map((step) => (
            <article key={step.index}>
              <span>{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-final-push landing-reveal" id="lokacija">
        <div className="container landing-final-push__inner">
          <div>
            <h2>Treba ti smestaj kod Minhena?</h2>
            <p>Javi se odmah ili prvo otvori sobe i proveri termine.</p>
          </div>
          <div className="landing-cinematic-actions">
            <LandingMotionButton className="primary-button" href="https://wa.me/491772078868">
              WhatsApp kontakt
            </LandingMotionButton>
            <Link className="secondary-button" href="/rooms">
              Otvori galeriju
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
