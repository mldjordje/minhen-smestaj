import Link from "next/link";
import { getBookingsData, getRoomBlocksData, getRoomsData } from "@/lib/admin-data";
import { PublicBookingForm } from "@/components/public-booking-form";
import { PublicLegacyGallery, PublicRoomsGrid } from "@/components/public-template";

export default async function RoomsPage() {
  const [bookings, roomBlocks, rooms] = await Promise.all([
    getBookingsData({ allowDemoFallback: false }),
    getRoomBlocksData({ allowDemoFallback: false }),
    getRoomsData({ allowDemoFallback: false })
  ]);

  return (
    <>
      <section
        className="cs_page_header cs_style_1 cs_bg_filed position-relative"
        style={{ backgroundImage: "url('/images/legacy/jagdschloessl-1.jpg')" }}
      >
        <div className="container">
          <div className="cs_page_header_content cs_center_column position-relative z-2">
            <ol className="breadcrumb cs_mb_30">
              <li className="breadcrumb-item">
                <Link aria-label="Back to home page link" href="/">
                  Početna
                </Link>
              </li>
              <li className="breadcrumb-item active">Sobe</li>
            </ol>
            <h2 className="cs_fs_180 cs_white_color text-center mb-0">SMEŠTAJ</h2>
          </div>
        </div>
      </section>

      <section>
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              SOBE I SMEŠTAJ
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">
              Jednokrevetne, dvokrevetne
              <br />
              i sobe za više osoba
            </h2>
          </div>
          <div className="cs_height_70 cs_height_lg_45" />
          {rooms.length > 0 ? (
            <PublicRoomsGrid rooms={rooms} />
          ) : (
            <div className="admin-empty-state">
              <strong>Trenutno nema aktivnih soba</strong>
              <p>Pozovite nas ili posaljite poruku za raspolozive termine.</p>
            </div>
          )}
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="room-booking-section">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="room-booking-layout">
            <div className="room-booking-copy">
              <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
                DIREKTNA REZERVACIJA
              </p>
              <h2 className="cs_section_title cs_fs_64 mb-0">
                Posaljite upit i izaberite sobu koja vam odgovara
              </h2>
              <p className="cs_fs_20 cs_light room-booking-copy__text">
                Na jednom mestu mozete odabrati konkretnu sobu, uneti datume i broj gostiju.
                Za svaku sobu postoji i zasebna stranica sa njenim kalendarom dostupnosti.
              </p>
            </div>
            {rooms.length > 0 ? (
              <PublicBookingForm
                bookings={bookings}
                roomBlocks={roomBlocks}
                rooms={rooms}
                subtitle="Izaberi sobu i odmah proveri dostupnost pre potvrde rezervacije."
              />
            ) : null}
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="cs_cream_bg">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              GALERIJA SMEŠTAJA
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">
              Više fotografija objekta i soba
            </h2>
          </div>
          <div className="cs_height_70 cs_height_lg_45" />
          <PublicLegacyGallery />
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>
    </>
  );
}
