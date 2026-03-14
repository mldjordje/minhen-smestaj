/* eslint-disable @next/next/no-css-tags, @next/next/no-img-element */
import Link from "next/link";
import { legacyGallery, rooms } from "@/lib/data";

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
              <Link aria-label="Home page link" className="cs_site_brand" href="/">
                <img src="/hotel-template/assets/img/logo.svg" alt="Logo" />
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
                        <Link href="/rooms">Smestaj</Link>
                      </li>
                    </ul>
                    <ul className="cs_nav_list cs_mp_0">
                      <li>
                        <Link href="/admin/owner">Owner admin</Link>
                      </li>
                      <li>
                        <Link href="/admin/staff">Staff admin</Link>
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
            <Link aria-label="Home page link" className="cs_site_brand cs_mb_29" href="/">
              <img src="/hotel-template/assets/img/logo-2.svg" alt="Logo" />
            </Link>
            <p className="mb-0 cs_light">
              Minhen Smestaj koristi hotel template za javni deo sajta, dok admin
              ostaje operativan za vlasnike i osoblje.
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3 className="cs_fs_24 cs_white_color cs_mb_24">Navigacija</h3>
            <ul className="cs_footer_menu cs_mp_0">
              <li>
                <Link href="/">Pocetna</Link>
              </li>
              <li>
                <Link href="/rooms">Smestaj</Link>
              </li>
              <li>
                <Link href="/admin/owner">Owner admin</Link>
              </li>
              <li>
                <Link href="/admin/staff">Staff admin</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6">
            <h3 className="cs_fs_24 cs_white_color cs_mb_24">Kontakt</h3>
            <ul className="cs_footer_contact cs_mp_0">
              <li>Eichenried, Minhen</li>
              <li>info@minhen-smestaj.de</li>
              <li>+49 89 000 000</li>
            </ul>
          </div>
        </div>
        <div className="cs_height_60 cs_height_lg_40" />
      </div>
    </footer>
  );
}

export function PublicRoomsGrid() {
  return (
    <div className="cs_grid cs_style_7">
      {rooms.map((room, index) => (
        <div
          key={room.id}
          className="cs_card cs_style_2 cs_type_1"
          data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
        >
          <div className="cs_card_thumbnail cs_mb_20 position-relative overflow-hidden">
            <img src={room.image} alt={room.name} />
            <span className="cs_white_color cs_medium text-uppercase position-absolute">
              {room.status}
            </span>
          </div>
          <div className="cs_card_info p-0">
            <h3 className="cs_card_title cs_fs_48 cs_mb_15">{room.name}</h3>
            <p className="cs_card_subtitle cs_mb_24">{room.shortDescription}</p>
            <div className="cs_horizontal_line cs_border_bg cs_mb_32 cs_mb_lg_24" />
            <ul className="cs_card_meta_wrapper cs_fs_16 cs_normal cs_mb_32 cs_mb_lg_24 list-unstyled p-0">
              <li className="cs_card_meta">{room.neighborhood}</li>
              <li className="cs_card_meta">{room.capacity} gosta</li>
              <li className="cs_card_meta">{room.beds}</li>
            </ul>
            <div className="cs_horizontal_line cs_border_bg cs_mb_24" />
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
              <div className="cs_card_price">
                <span className="cs_fs_16 cs_heading_color">od</span>
                <span className="cs_fs_40 cs_accent_color cs_normal cs_heading_font">
                  {room.pricePerNight} EUR/noc
                </span>
              </div>
              <Link
                aria-label="Hotel booking button"
                className="cs_btn cs_style_1 cs_accent_color cs_fs_20 cs_medium"
                href="/admin/owner"
              >
                <span>REZERVISI</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PublicLegacyGallery() {
  return (
    <div className="row g-4">
      {legacyGallery.map((item) => (
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
