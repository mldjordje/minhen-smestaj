/* eslint-disable @next/next/no-css-tags, @next/next/no-img-element */
import Link from "next/link";
import { legacyGallery } from "@/lib/data";
import { getRoomDisplayName } from "@/lib/rooms";
import type { LandingGalleryImage } from "@/lib/site-gallery";
import { Room } from "@/lib/types";

export function PublicTemplateHeadLinks() {
  return (
    <>
      <link rel="icon" href="/hotel-template/assets/img/favicon.png" />
      <link rel="stylesheet" href="/hotel-template/assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/hotel-template/assets/css/slick.min.css" />
      <link rel="stylesheet" href="/hotel-template/assets/css/aos.min.css" />
      <link rel="stylesheet" href="/hotel-template/assets/css/datepicker.css" />
      <link rel="stylesheet" href="/hotel-template/assets/css/fontawesome.min.css" />
      <link rel="stylesheet" href="/hotel-template/assets/css/lightgallery.min.css" />
      <link rel="stylesheet" href="/hotel-template/assets/css/odometer.min.css" />
      <link rel="stylesheet" href="/hotel-template/assets/css/style.css" />
      <style>{`
        /* ── Dark Alpine Luxury — cascade override (loaded after hotel-template CSS) ── */

        html, body {
          background: #0c0d0f !important;
          color: #f2ead8 !important;
          font-family: 'DM Sans', Georgia, sans-serif !important;
        }

        .site-template-shell {
          background: #0c0d0f !important;
          color: #f2ead8 !important;
          font-family: 'DM Sans', Georgia, sans-serif !important;
        }

        /* Heading font and color */
        .site-template-shell h1,
        .site-template-shell h2,
        .site-template-shell h3 {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          color: #f2ead8 !important;
        }

        /* Hero h1 stays white */
        .site-template-shell .landing-cinematic-hero__copy h1 {
          color: #ffffff !important;
          font-weight: 300 !important;
        }

        /* Room story h3 — white on dark image */
        .site-template-shell .landing-room-story h3 {
          color: #ffffff !important;
          font-weight: 300 !important;
        }

        /* Showcase note strong */
        .site-template-shell .landing-cinematic-showcase strong {
          color: #ffffff !important;
          font-family: 'Cormorant Garamond', Georgia, serif !important;
        }

        /* Gold primary button */
        .site-template-shell .primary-button,
        .site-template-shell a.primary-button {
          background: linear-gradient(135deg, #c89a28, #deb848) !important;
          background-image: linear-gradient(135deg, #c89a28, #deb848) !important;
          color: #0c0d0f !important;
          font-family: 'DM Sans', Georgia, sans-serif !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.01em !important;
          box-shadow: 0 12px 36px rgba(200, 154, 40, 0.3) !important;
          text-shadow: none !important;
          border-radius: 999px !important;
          padding: 0 22px !important;
        }

        /* Outlined secondary button */
        .site-template-shell .secondary-button,
        .site-template-shell a.secondary-button {
          background: rgba(200, 154, 40, 0.06) !important;
          background-image: none !important;
          border: 1px solid rgba(200, 154, 40, 0.3) !important;
          color: #f2ead8 !important;
          font-family: 'DM Sans', Georgia, sans-serif !important;
          font-size: 1rem !important;
          font-weight: 500 !important;
          text-shadow: none !important;
          border-radius: 999px !important;
          padding: 0 22px !important;
        }

        /* Header brand subtitle */
        .site-template-shell .public-site-header__brand small {
          color: #c89a28 !important;
          letter-spacing: 0.26em !important;
          font-size: 0.68rem !important;
        }

        /* Header brand name */
        .site-template-shell .public-site-header__brand span {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-weight: 400 !important;
          letter-spacing: 0.1em !important;
        }

        /* Availability strip labels */
        .site-template-shell .landing-availability-strip span {
          font-family: 'DM Sans', Georgia, sans-serif !important;
        }

        /* Cormorant for big numbers in strip */
        .site-template-shell .landing-availability-strip strong {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-size: 1.65rem !important;
          font-weight: 400 !important;
        }

        /* Stats section numbers */
        .site-template-shell .landing-spotlight__stats strong {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          color: #c89a28 !important;
          font-weight: 300 !important;
        }

        /* Process band number style */
        .site-template-shell .landing-process-band span {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-size: 3.4rem !important;
          font-weight: 300 !important;
          color: #c89a28 !important;
        }

        /* Muted text */
        .site-template-shell .landing-cinematic-hero__copy p,
        .site-template-shell .landing-final-push p,
        .site-template-shell .landing-spotlight p,
        .site-template-shell .landing-hospitality-stage__intro p,
        .site-template-shell .landing-process-band p {
          color: rgba(242, 234, 216, 0.66) !important;
          font-family: 'DM Sans', Georgia, sans-serif !important;
          font-weight: 300 !important;
        }

        /* Room card text */
        .site-template-shell .landing-room-story h3 {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-weight: 300 !important;
        }

        /* Form submit button */
        .site-template-shell .public-booking-form__submit {
          background: linear-gradient(135deg, #c89a28, #deb848) !important;
          background-image: linear-gradient(135deg, #c89a28, #deb848) !important;
          color: #0c0d0f !important;
          font-weight: 600 !important;
        }

        /* Mode switch active */
        .site-template-shell .room-booking-mode-switch button.is-active {
          background: linear-gradient(135deg, #c89a28, #deb848) !important;
          background-image: linear-gradient(135deg, #c89a28, #deb848) !important;
          color: #0c0d0f !important;
        }

        /* text-link */
        .site-template-shell .text-link {
          color: #c89a28 !important;
        }

        .site-template-shell .container {
          width: min(100% - 32px, 1320px) !important;
          max-width: 1320px !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        @media (max-width: 760px) {
          .site-template-shell .container {
            width: min(100% - 28px, 100%) !important;
            max-width: calc(100% - 28px) !important;
          }
        }
      `}</style>
    </>
  );
}

export function PublicSiteHeader() {
  return (
    <header className="cs_site_header cs_style_1 cs_type_2 cs_white_color cs_sticky_header">
      <div className="cs_header_main position-relative">
        <div className="container">
          <div className="cs_main_header_in">
            <div className="cs_main_header_left">
              <Link aria-label="Home page link" className="cs_site_brand site-text-brand" href="/">
                <span>Jagdschlossl</span>
                <small>Eichenried</small>
              </Link>
            </div>
            <div className="cs_main_header_center">
              <div className="cs_nav">
                <div className="cs_nav_list_wrap">
                  <div className="cs_nav_links_wrap">
                    <ul className="cs_nav_list cs_mp_0">
                      <li>
                        <Link href="/">Pocetna</Link>
                      </li>
                      <li>
                        <Link href="/#o-smestaju">O smestaju</Link>
                      </li>
                      <li>
                        <Link href="/rooms">Sobe</Link>
                      </li>
                    </ul>
                    <ul className="cs_nav_list cs_mp_0">
                      <li>
                        <Link href="/#lokacija">Lokacija</Link>
                      </li>
                      <li>
                        <Link href="/#rezervacija">Rezervacija</Link>
                      </li>
                      <li className="cs_language_select">
                        <div className="cs_language_switcher">
                          <input type="button" value="DE" readOnly />
                        </div>
                        <div className="cs_language_dropdown">
                          <input type="button" value="DE" readOnly />
                          <input type="button" value="SR" readOnly />
                          <input type="button" value="EN" readOnly />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function PublicSiteFooter() {
  return (
    <footer className="cs_footer cs_style_1 cs_heading_bg cs_white_color">
      <div className="container">
        <div className="cs_height_100 cs_height_lg_70" />
        <div className="row gy-5">
          <div className="col-lg-5">
            <Link
              aria-label="Home page link"
              className="cs_site_brand site-text-brand site-text-brand-light cs_mb_29"
              href="/"
            >
              <span>Jagdschlossl</span>
              <small>Eichenried</small>
            </Link>
            <p className="mb-0 cs_light">
              Udoban i pristupacan smestaj u blizini Minhena za goste iz Srbije,
              Bosne, Hrvatske, Crne Gore i regiona.
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3 className="cs_fs_24 cs_white_color cs_mb_24">Navigacija</h3>
            <ul className="cs_footer_menu cs_mp_0">
              <li>
                <Link href="/">Pocetna</Link>
              </li>
              <li>
                <Link href="/#o-smestaju">O smestaju</Link>
              </li>
              <li>
                <Link href="/rooms">Sobe</Link>
              </li>
              <li>
                <Link href="/#rezervacija">Rezervacija</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6">
            <h3 className="cs_fs_24 cs_white_color cs_mb_24">Kontakt</h3>
            <ul className="cs_footer_contact cs_mp_0">
              <li>Eichenried, blizu Minhena</li>
              <li>Viber / WhatsApp: +49 1772078868</li>
              <li>Posaljite poruku za slobodne termine</li>
            </ul>
          </div>
        </div>
        <div className="cs_height_60 cs_height_lg_40" />
      </div>
    </footer>
  );
}

type PublicRoomsGridProps = {
  rooms: Room[];
};

export function PublicRoomsGrid({ rooms }: PublicRoomsGridProps) {
  return (
    <div className="room-grid public-room-grid">
      {rooms.map((room) => (
        <article key={room.id} className="room-card public-room-card">
          <Link className="public-room-card__media" href={`/rooms/${room.slug}`}>
            <div className="room-image-wrap">
              <img className="room-image public-room-card__image" src={room.image} alt={getRoomDisplayName(room)} />
              <span className={`status-pill status-${room.status}`}>{room.status}</span>
            </div>
          </Link>
          <div className="room-card-body">
            <div className="room-card-header">
              <div>
                <p className="eyebrow">{room.neighborhood}</p>
                <h3>{getRoomDisplayName(room)}</h3>
              </div>
              <strong>{room.pricePerNight} EUR / noc</strong>
            </div>
            <p>{room.shortDescription}</p>
            <div className="meta-row">
              <span>{room.capacity} gosta</span>
              <span>{room.beds}</span>
            </div>
            <div className="tag-row">
              {room.amenities.map((amenity) => (
                <span key={amenity}>{amenity}</span>
              ))}
            </div>
            <div className="public-room-card__actions">
              <Link className="secondary-button" href={`/rooms/${room.slug}`}>
                Otvori sobu
              </Link>
              <Link className="primary-button" href={`/rooms/${room.slug}#booking`}>
                Posalji upit
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

type PublicLegacyGalleryProps = {
  items?: LandingGalleryImage[];
};

export function PublicLegacyGallery({ items = legacyGallery }: PublicLegacyGalleryProps) {
  return (
    <div className="row g-4">
      {items.map((item) => (
        <div key={item.image} className="col-lg-4 col-md-6">
          <div className="cs_card cs_style_2">
            <div className="cs_card_thumbnail cs_zoom position-relative overflow-hidden">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="cs_card_info cs_white_bg">
              <h3 className="cs_card_title cs_fs_32 cs_mb_2">{item.title}</h3>
              <p className="mb-0">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
