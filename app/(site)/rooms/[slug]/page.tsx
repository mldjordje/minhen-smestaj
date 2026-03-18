/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicBookingForm } from "@/components/public-booking-form";
import { RoomAvailabilityCalendar } from "@/components/room-availability-calendar";
import { getBookingsData, getRoomBlocksData, getRoomBySlug, getRoomsData } from "@/lib/admin-data";

type RoomDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const rooms = await getRoomsData();

  return rooms.map((room) => ({
    slug: room.slug
  }));
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { slug } = await params;
  const [room, rooms, bookings, roomBlocks] = await Promise.all([
    getRoomBySlug(slug),
    getRoomsData(),
    getBookingsData(),
    getRoomBlocksData()
  ]);

  if (!room) {
    notFound();
  }

  const relatedRooms = rooms.filter((item) => item.id !== room.id).slice(0, 2);

  return (
    <>
      <section
        className="cs_page_header cs_style_1 cs_bg_filed position-relative"
        style={{ backgroundImage: `url('${room.image}')` }}
      >
        <div className="container">
          <div className="cs_page_header_content cs_center_column position-relative z-2">
            <ol className="breadcrumb cs_mb_30">
              <li className="breadcrumb-item">
                <Link aria-label="Back to home page link" href="/">
                  Pocetna
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/rooms">Sobe</Link>
              </li>
              <li className="breadcrumb-item active">{room.name}</li>
            </ol>
            <h1 className="cs_fs_64 cs_white_color text-center mb-0">{room.name}</h1>
          </div>
        </div>
      </section>

      <section className="room-detail-section">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="room-detail-layout">
            <div className="room-detail-main">
              <div className="room-detail-gallery">
                <div className="room-detail-gallery__hero">
                  <img src={room.image} alt={room.name} />
                </div>
                <div className="room-detail-gallery__grid">
                  {[room.image, "/images/2.PNG", "/images/3.PNG"].map((image) => (
                    <div key={`${room.id}-${image}`} className="room-detail-gallery__thumb">
                      <img src={image} alt={room.name} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="room-detail-copy">
                <div className="room-detail-copy__header">
                  <div>
                    <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
                      {room.neighborhood}
                    </p>
                    <h2 className="cs_section_title cs_fs_64 mb-0">{room.name}</h2>
                  </div>
                  <div className="room-detail-price">
                    <span>od</span>
                    <strong>{room.pricePerNight} EUR / noc</strong>
                  </div>
                </div>
                <p className="cs_fs_20 cs_light room-detail-copy__text">{room.shortDescription}</p>
                <div className="room-detail-meta">
                  <div className="room-detail-meta__card">
                    <span>Kapacitet</span>
                    <strong>{room.capacity} gosta</strong>
                  </div>
                  <div className="room-detail-meta__card">
                    <span>Kreveti</span>
                    <strong>{room.beds}</strong>
                  </div>
                  <div className="room-detail-meta__card">
                    <span>Status</span>
                    <strong>{room.status}</strong>
                  </div>
                </div>
                <div className="room-detail-amenities">
                  {room.amenities.map((amenity) => (
                    <span key={amenity}>{amenity}</span>
                  ))}
                </div>
              </div>

              <div className="room-detail-calendar">
                <div className="section-heading wide">
                  <div>
                    <p className="eyebrow">Dostupnost sobe</p>
                    <h2>Kalendar za narednih 21 dan</h2>
                  </div>
                  <span className="inline-note">
                    Dolazak, odlazak i zauzeti termini su prikazani posebno za ovu sobu.
                  </span>
                </div>
                <RoomAvailabilityCalendar bookings={bookings} room={room} roomBlocks={roomBlocks} />
              </div>
            </div>

            <aside className="room-detail-sidebar">
              <PublicBookingForm
                defaultRoomSlug={room.slug}
                rooms={rooms}
                title={`Posaljite upit bas za ${room.name}`}
              />
            </aside>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="cs_cream_bg">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Jos opcija</p>
              <h2>Pogledajte i druge sobe</h2>
            </div>
            <Link className="text-link" href="/rooms">
              Nazad na sve sobe
            </Link>
          </div>
          <div className="room-detail-related">
            {relatedRooms.map((relatedRoom) => (
              <Link key={relatedRoom.id} className="room-detail-related__card" href={`/rooms/${relatedRoom.slug}`}>
                <img src={relatedRoom.image} alt={relatedRoom.name} />
                <div>
                  <strong>{relatedRoom.name}</strong>
                  <span>{relatedRoom.capacity} gosta</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>
    </>
  );
}
