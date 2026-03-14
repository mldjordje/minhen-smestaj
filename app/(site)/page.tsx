/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { bookings } from "@/lib/data";
import { PublicLegacyGallery, PublicRoomsGrid } from "@/components/public-template";

const heroHighlights = [
  {
    icon: "/hotel-template/assets/img/icons/location.svg",
    text: "Mirna lokacija blizu Minhena"
  },
  {
    icon: "/hotel-template/assets/img/icons/card.svg",
    text: "Parking za goste"
  },
  {
    icon: "/hotel-template/assets/img/icons/wifi.svg",
    text: "Besplatan Wi-Fi"
  },
  {
    icon: "/hotel-template/assets/img/icons/bed.svg",
    text: "Udobne i funkcionalne sobe"
  }
];

const accommodationFeatures = [
  "jednokrevetne i dvokrevetne sobe",
  "sobe za više osoba",
  "opremljene kuhinje",
  "besplatan Wi-Fi internet",
  "parking za automobile i kombije",
  "mirno okruženje za odmor",
  "opremljeno mašinama za pranje i sušenje"
];

const guestTypes = [
  "majstori i radnici na projektima",
  "vozači i terenski radnici",
  "firme koje šalju svoje zaposlene",
  "ljudi iz regiona koji dolaze u Minhen zbog posla",
  "putnici koji prolaze kroz Minhen"
];

const locationBenefits = [
  "brza povezanost sa Minhenom",
  "blizina aerodroma München",
  "jednostavan dolazak automobilom",
  "mirno okruženje daleko od gradske gužve"
];

const whyChooseUs = [
  {
    icon: "/hotel-template/assets/img/icons/quality.svg",
    title: "Čist i uredan smeštaj",
    text: "Sobe i zajednički prostori održavaju se uredno i funkcionalno za kraći i duži boravak."
  },
  {
    icon: "/hotel-template/assets/img/icons/card.svg",
    title: "Povoljne cene za duži boravak",
    text: "Dobar izbor za goste i firme kojima je potreban pristupačan smeštaj blizu Minhena."
  },
  {
    icon: "/hotel-template/assets/img/icons/location.svg",
    title: "Blizina Minhena",
    text: "Odlična povezanost sa Minhenom i aerodromom, uz mirno okruženje za odmor."
  }
];

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
              Dobrodošli u
              <span className="cs_accent_color cs_ternary_font cs_hover_layer_2">
                {" "}
                Jagdschlössl
              </span>
              Eichenried
            </h1>
            <p className="cs_fs_20 cs_light cs_white_color mb-0 legacy-hero-note">
              Udoban i pristupačan smeštaj u blizini Minhena za sve goste iz Srbije,
              Bosne, Hrvatske, Crne Gore i regiona.
            </p>
            <div className="cs_form cs_style_1 cs_fs_16 cs_white_bg position-relative text-start">
              <div className="cs_form_item">
                <label className="cs_normal">Aktivni dolasci</label>
                <div className="cs_fs_24">{arrivalsToday} gostiju danas</div>
              </div>
              <div className="cs_form_item">
                <label className="cs_normal">Lokacija</label>
                <div className="cs_fs_24">Eichenried / Minhen</div>
              </div>
              <div className="cs_form_item">
                <label className="cs_normal">Kontakt</label>
                <div className="cs_fs_24">+49 1772078868</div>
              </div>
              <div className="cs_form_item_btn">
                <a
                  className="cs_btn cs_style_1 cs_heading_bg cs_white_color cs_fs_20 cs_medium"
                  href="https://wa.me/491772078868"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>POŠALJI PORUKU</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs_cream_bg" id="o-smestaju">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_card cs_style_1 cs_center_column text-center">
            <span className="cs_flower_shape">
              <img src="/hotel-template/assets/img/flower.svg" alt="Flower shape" />
            </span>
            <h2 className="cs_card_title cs_fs_64 position-relative z-1 mb-0">
              Smeštaj u Minhenu koji se oseća kao
              <span className="cs_accent_color cs_ternary_font"> domaći</span>
            </h2>
            <div className="cs_card_thumbnail">
              <img src="/images/legacy/jagdschloessl-1.jpg" alt="Property exterior" />
            </div>
            <p className="cs_card_subtitle cs_fs_20 cs_light">
              Bilo da dolazite u Minhen zbog posla, projekta ili odmora, kod nas ćete
              pronaći mirno mesto za boravak, prijatnu atmosferu i sve što vam je
              potrebno tokom boravka u Nemačkoj.
            </p>
            <div className="row g-4 text-start w-100 mt-5">
              {heroHighlights.map((item) => (
                <div key={item.text} className="col-lg-3 col-sm-6">
                  <div className="cs_iconbox cs_style_1 cs_center_column text-center">
                    <div className="cs_iconbox_icon cs_center cs_accent_bg cs_radius_100 cs_mb_24 cs_mb_lg_20">
                      <img src={item.icon} alt="" />
                    </div>
                    <h3 className="cs_iconbox_title cs_fs_32 cs_mb_16">{item.text}</h3>
                  </div>
                </div>
              ))}
            </div>
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
                O SMEŠTAJU
              </p>
              <h2 className="cs_section_title cs_fs_64 cs_white_color mb-0">
                Gostima su na raspolaganju
              </h2>
            </div>
            <div className="cs_section_heading_right">
              <p className="cs_fs_20 cs_white_color cs_light">
                Jagdschlössl Eichenried je mesto gde se mnogi naši ljudi iz regiona rado
                vraćaju kada dolaze u Minhen.
              </p>
            </div>
          </div>
          <div className="cs_height_66 cs_height_lg_45" />
          <div className="row g-4">
            {accommodationFeatures.map((item, index) => (
              <div key={item} className="col-lg-4 col-md-6">
                <div className="cs_card cs_style_3" data-aos="fade-up" data-aos-delay={index * 100}>
                  <h3 className="cs_fs_40 cs_mb_20">✔ {item}</h3>
                  <p className="mb-0 cs_white_color cs_light">
                    Praktična pogodnost za goste koji dolaze na kraći ili duži boravak.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section>
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              IDEALNO ZA BORAVAK U MINHENU
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">Kod nas često borave</h2>
          </div>
          <div className="cs_height_70 cs_height_lg_45" />
          <div className="row g-4">
            {guestTypes.map((item, index) => (
              <div key={item} className="col-lg-4 col-md-6">
                <div
                  className="cs_iconbox cs_style_1 cs_center_column text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="cs_iconbox_icon cs_center cs_accent_bg cs_radius_100 cs_mb_24 cs_mb_lg_20">
                    <img src="/hotel-template/assets/img/icons/user.svg" alt="" />
                  </div>
                  <h3 className="cs_iconbox_title cs_fs_40 cs_mb_24 cs_mb_lg_16">{item}</h3>
                  <p className="cs_iconbox_subtitle mb-0">
                    Nudimo fleksibilne opcije boravka i prijatnu atmosferu gde se gosti
                    osećaju kao kod kuće.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="cs_cream_bg" id="lokacija">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="cs_section_heading cs_style_1">
                <div className="cs_section_heading_left">
                  <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">LOKACIJA</p>
                  <h2 className="cs_section_title cs_fs_64 mb-0">
                    Odlična lokacija blizu Minhena
                  </h2>
                </div>
              </div>
              <div className="cs_height_40 cs_height_lg_24" />
              <p className="cs_fs_20 cs_light">
                Jagdschlössl Eichenried se nalazi u mirnom mestu Eichenried, nedaleko od
                Minhena. Idealno za goste koji žele da budu blizu Minhena, ali da imaju
                mir za odmor.
              </p>
              <ul className="cs_features_list cs_fs_48 cs_heading_font cs_mp_0">
                {locationBenefits.map((item) => (
                  <li key={item}>✔ {item}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="cs_card cs_style_2">
                <div className="cs_card_thumbnail cs_zoom position-relative overflow-hidden">
                  <img src="/images/legacy/jagdschloessl-5.jpg" alt="Lokacija objekta" />
                </div>
                <div className="cs_card_info cs_white_bg">
                  <h3 className="cs_card_title cs_fs_32 cs_mb_2">Mirno okruženje za odmor</h3>
                  <p className="mb-0">
                    Brza povezanost sa Minhenom i blizina aerodroma München čine ovaj
                    smeštaj praktičnim izborom za posao, projekat i tranzitni boravak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section>
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              ZAŠTO IZABRATI NAS
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">Čist, miran i pristupačan boravak</h2>
          </div>
          <div className="cs_height_70 cs_height_lg_45" />
          <div className="row g-4">
            {whyChooseUs.map((item, index) => (
              <div key={item.title} className="col-lg-4">
                <div
                  className="cs_iconbox cs_style_1 cs_center_column text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <div className="cs_iconbox_icon cs_center cs_accent_bg cs_radius_100 cs_mb_24 cs_mb_lg_20">
                    <img src={item.icon} alt="" />
                  </div>
                  <h3 className="cs_iconbox_title cs_fs_40 cs_mb_24 cs_mb_lg_16">{item.title}</h3>
                  <p className="cs_iconbox_subtitle mb-0">{item.text}</p>
                </div>
              </div>
            ))}
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
                SOBE I SMEŠTAJ
              </p>
              <h2 className="cs_section_title cs_fs_64 cs_white_color mb-0">
                Pregled raspoloživih tipova soba
              </h2>
            </div>
            <div className="cs_section_heading_right">
              <p className="cs_fs_20 cs_white_color cs_light">
                Smeštaj je pogodan za pojedince, parove, radnike, firme i grupe.
              </p>
              <Link className="cs_text_btn cs_white_color cs_medium text-capitalize" href="/rooms">
                pogledaj sve sobe
              </Link>
            </div>
          </div>
          <div className="cs_height_66 cs_height_lg_45" />
          <PublicRoomsGrid />
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="cs_cream_bg" id="rezervacija">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              REZERVACIJA
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">
              Ako tražite smeštaj u Minhenu ili okolini, ovde ste na pravom mestu
            </h2>
          </div>
          <div className="cs_height_70 cs_height_lg_45" />
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="cs_card cs_style_3">
                <h3 className="cs_fs_40 cs_mb_20">📞 Kontakt</h3>
                <p className="mb-4 cs_white_color cs_light">
                  Viber / WhatsApp: +49 1772078868
                </p>
                <a
                  className="cs_btn cs_style_1 cs_white_color cs_fs_20 cs_medium"
                  href="https://wa.me/491772078868"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>WHATSAPP UPIT</span>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cs_card cs_style_3">
                <h3 className="cs_fs_40 cs_mb_20">Više informacija</h3>
                <p className="mb-4 cs_white_color cs_light">
                  Pošaljite nam poruku ili nas pozovite za informacije o slobodnim terminima.
                </p>
                <Link className="cs_btn cs_style_1 cs_white_color cs_fs_20 cs_medium" href="/rooms">
                  <span>POGLEDAJ SOBE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section>
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              GALERIJA
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">Fotografije objekta i soba</h2>
          </div>
          <div className="cs_height_70 cs_height_lg_45" />
          <PublicLegacyGallery />
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>
    </>
  );
}
