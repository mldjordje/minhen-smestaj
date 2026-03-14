/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { bookings } from "@/lib/data";
import { PublicLegacyGallery, PublicRoomsGrid } from "@/components/public-template";

export default function HomePage() {
  const arrivalsToday = bookings.filter((booking) => booking.status === "arriving").length;

  return (
    <>
      <section
        className="cs_hero cs_style_1 cs_bg_filed cs_hobble position-relative"
        style={{ backgroundImage: "url('/images/legacy/jagdschloessl-5.jpg')" }}
      >
        <div className="container position-relative z-2">
          <div className="cs_hero_content text-center">
            <h1 className="cs_hero_title cs_fs_180 cs_white_color cs_mb_28">
              MINHEN
              <span className="cs_accent_color cs_ternary_font cs_hover_layer_2">
                {" "}
                smestaj
              </span>
              ZA GOSTE I RADNIKE
            </h1>
            <p className="cs_fs_20 cs_light cs_white_color mb-0 legacy-hero-note">
              Javna strana sada koristi stvarni hotel template dizajn. U istoj
              aplikaciji su owner admin, staff admin i osnova za Booking.com
              kalendar.
            </p>
            <div className="cs_form cs_style_1 cs_fs_16 cs_white_bg position-relative text-start">
              <div className="cs_form_item">
                <label className="cs_normal">Danasnji dolasci</label>
                <div className="cs_fs_24">{arrivalsToday} aktivnih check-in dolazaka</div>
              </div>
              <div className="cs_form_item">
                <label className="cs_normal">Lokacija</label>
                <div className="cs_fs_24">Eichenried / Minhen</div>
              </div>
              <div className="cs_form_item">
                <label className="cs_normal">Operativa</label>
                <div className="cs_fs_24">Owner + staff dashboard</div>
              </div>
              <div className="cs_form_item_btn">
                <Link className="cs_btn cs_style_1 cs_heading_bg cs_white_color cs_fs_20 cs_medium" href="/rooms">
                  <span>POGLEDAJ SOBE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs_cream_bg">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_card cs_style_1 cs_center_column text-center">
            <span className="cs_flower_shape">
              <img src="/hotel-template/assets/img/flower.svg" alt="Flower shape" />
            </span>
            <h2 className="cs_card_title cs_fs_64 position-relative z-1 mb-0">
              JAVNI SAJT JE SADA NASLONJEN NA
              <span className="cs_accent_color cs_ternary_font"> HOTEL TEMPLATE</span>
            </h2>
            <div className="cs_card_thumbnail">
              <img src="/images/legacy/jagdschloessl-1.jpg" alt="Property exterior" />
            </div>
            <p className="cs_card_subtitle cs_fs_20 cs_light">
              Preuzeli smo vizuelni smer iz postojećeg smeštaj template-a i uparili
              ga sa stvarnim slikama objekta, soba i zajedničkih prostora.
            </p>
            <Link
              aria-label="Rooms page visit link"
              className="cs_text_btn cs_fs_20 cs_medium cs_heading_color"
              href="/rooms"
            >
              pogledaj smestaj
            </Link>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="cs_heading_bg">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 cs_type_1">
            <div className="cs_section_heading_left">
              <p className="cs_section_subtitle cs_fs_24 cs_accent_color text-uppercase cs_mb_16">
                ROOMS & SUITES
              </p>
              <h2 className="cs_section_title cs_fs_64 cs_white_color mb-0">
                Smestaj koji je sada u template stilu
              </h2>
            </div>
            <div className="cs_section_heading_right">
              <p className="cs_fs_20 cs_white_color cs_light">
                Umesto generičkog fronta, javni deo sada koristi isti vizuelni jezik
                kao hotel template koji si ostavio u projektu.
              </p>
              <Link className="cs_text_btn cs_white_color cs_medium text-capitalize" href="/rooms">
                view all rooms
              </Link>
            </div>
          </div>
          <div className="cs_height_66 cs_height_lg_45" />
          <PublicRoomsGrid />
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section>
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              LEGACY GALLERY
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">
              Originalne slike sa starog sajta
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
