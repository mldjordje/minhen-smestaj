/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BookingExperiencePanel } from "@/components/booking-experience-panel";
import { getBookingsData, getRoomBlocksData, getRoomsData } from "@/lib/admin-data";
import { getLandingGallery } from "@/lib/site-gallery";
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
  "sobe za vise osoba",
  "opremljene kuhinje",
  "besplatan Wi-Fi internet",
  "parking za automobile i kombije",
  "mirno okruzenje za odmor",
  "opremljeno masinama za pranje i susenje"
];

const guestTypes = [
  "majstori i radnici na projektima",
  "vozaci i terenski radnici",
  "firme koje salju svoje zaposlene",
  "ljudi iz regiona koji dolaze u Minhen zbog posla",
  "putnici koji prolaze kroz Minhen"
];

const locationBenefits = [
  "brza povezanost sa Minhenom",
  "blizina aerodroma Munchen",
  "jednostavan dolazak automobilom",
  "mirno okruzenje daleko od gradske guzve"
];

const whyChooseUs = [
  {
    icon: "/hotel-template/assets/img/icons/quality.svg",
    title: "Cist i uredan smestaj",
    text: "Sobe i zajednicki prostori odrzavaju se uredno i funkcionalno za kraci i duzi boravak."
  },
  {
    icon: "/hotel-template/assets/img/icons/card.svg",
    title: "Povoljne cene za duzi boravak",
    text: "Dobar izbor za goste i firme kojima je potreban pristupacan smestaj blizu Minhena."
  },
  {
    icon: "/hotel-template/assets/img/icons/location.svg",
    title: "Blizina Minhena",
    text: "Odlicna povezanost sa Minhenom i aerodromom, uz mirno okruzenje za odmor."
  }
];

const bookingHighlights = [
  "izbor sobe i kalendar dostupnosti u istoj formi",
  "svaka soba ima svoju zasebnu stranicu sa detaljima",
  "najbrzi kontakt ostaje WhatsApp ili direktan upit sa sajta"
];

const bookingProcess = [
  {
    step: "01",
    title: "Pogledajte sobe i raspored",
    text: "Na pocetnoj i na stranici svake sobe odmah se vidi sta je slobodno, bez dodatnog dopisivanja."
  },
  {
    step: "02",
    title: "Posaljite upit ili direktnu rezervaciju",
    text: "Gost bira sobu, datume i broj osoba, a sve ostaje jasno i pregledno i na telefonu i na desktopu."
  },
  {
    step: "03",
    title: "Brz dogovor za dolazak",
    text: "Za dodatna pitanja ostaju otvoreni WhatsApp i direktan kontakt, pa je ceo proces jednostavan i brz."
  }
];

const guestTestimonials = [
  {
    name: "Milan, Novi Sad",
    role: "Terenski radnik",
    quote:
      "Najvise nam znaci sto je sve jednostavno. Vidimo sobu, posaljemo poruku i odmah znamo da li termin odgovara."
  },
  {
    name: "Ivana i Marko, Banja Luka",
    role: "Kratak boravak u Minhenu",
    quote:
      "Fotografije i detalji na sajtu deluju realno, a upravo to je ono sto nam je trebalo pre nego sto krenemo na put."
  },
  {
    name: "Firma iz regiona",
    role: "Smestaj za zaposlene",
    quote:
      "Koristan nam je jasan pregled kapaciteta i brz kontakt, jer za timove koji dolaze u Minhen nema vremena za komplikovan booking."
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
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const startingPrice = rooms.length > 0 ? Math.min(...rooms.map((room) => room.pricePerNight)) : null;
  const availableRoomsCount = rooms.filter((room) => room.status === "available").length;
  const testimonialCards = guestTestimonials.map((testimonial, index) => ({
    ...testimonial,
    image:
      landingGallery.galleryImages[index]?.image ??
      landingGallery.showcaseImages[index]?.src ??
      landingGallery.detailImage
  }));
  const trustHighlights = [
    {
      icon: "/hotel-template/assets/img/icons/bed.svg",
      value: rooms.length > 0 ? `${rooms.length}+` : "Vise",
      title: "tipova soba",
      text: "Od single i double opcija do vecih soba za vise gostiju."
    },
    {
      icon: "/hotel-template/assets/img/icons/user.svg",
      value: totalCapacity > 0 ? `${totalCapacity}+` : "Fleksibilno",
      title: "mesta za goste",
      text: "Praktican smestaj za pojedince, parove, radnike i manje grupe."
    },
    {
      icon: "/hotel-template/assets/img/icons/card.svg",
      value: startingPrice ? `od ${startingPrice} EUR` : "Na upit",
      title: "pocetna cena nocenja",
      text: "Gost odmah dobija jasan pregled pre nego sto posalje poruku ili rezervaciju."
    },
    {
      icon: "/hotel-template/assets/img/icons/location.svg",
      value: availableRoomsCount > 0 ? `${availableRoomsCount}` : "14 dana",
      title: availableRoomsCount > 0 ? "sobe trenutno slobodne" : "javni pregled dostupnosti",
      text:
        availableRoomsCount > 0
          ? "Aktuelan status soba izdvojen je odmah na sajtu."
          : "Kalendar dostupnosti je odmah vidljiv i na mobilnom telefonu."
    }
  ];

  return (
    <>
      <section
        className="cs_hero cs_style_1 cs_bg_filed cs_hobble position-relative"
        id="rezervacija"
        style={{ backgroundImage: "url('/images/legacy/jagdschloessl-5.jpg')" }}
      >
        <div className="container position-relative z-2">
          <div className="landing-hero-layout">
            <div className="landing-hero-copy">
              <div className="cs_hero_content text-start">
                <h1 className="cs_hero_title cs_fs_180 cs_white_color cs_mb_28">
                  Dobrodosli u
                  <span className="cs_accent_color cs_ternary_font cs_hover_layer_2">
                    {" "}
                    Jagdschlossl
                  </span>
                  Eichenried
                </h1>
                <p className="cs_fs_20 cs_light cs_white_color mb-0 legacy-hero-note">
                  Udoban i pristupacan smestaj u blizini Minhena za goste iz Srbije,
                  Bosne, Hrvatske, Crne Gore i regiona.
                </p>
              </div>

              <div className="landing-hero-metrics">
                <article className="landing-hero-metric">
                  <span>Aktivni dolasci</span>
                  <strong>{arrivalsToday} gostiju danas</strong>
                </article>
                <article className="landing-hero-metric">
                  <span>Lokacija</span>
                  <strong>Eichenried / Minhen</strong>
                </article>
                <article className="landing-hero-metric">
                  <span>Kontakt</span>
                  <strong>+49 1772078868</strong>
                </article>
              </div>

              <div className="landing-hero-points">
                {bookingHighlights.map((item) => (
                  <div key={item} className="landing-booking-point landing-booking-point--hero">
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>

              <div className="cta-row">
                <a
                  className="primary-button"
                  href="https://wa.me/491772078868"
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp upit
                </a>
                <Link className="secondary-button" href="/signin?callbackUrl=%2Faccount">
                  Prijava klijenta
                </Link>
              </div>
            </div>

            {rooms.length > 0 ? (
              <BookingExperiencePanel
                bookings={bookings}
                dailyFormSubtitle="Izabrani dnevni termin se odmah prenosi u formu za potvrdu rezervacije ili upit."
                defaultRoomSlug={rooms[0]?.slug}
                headingEyebrow="Booking u hero sekciji"
                headingNote="Na pocetku birate dnevni ili mesecni boravak, zatim sobu i klikom na kalendar unosite tacan period."
                headingTitle="Proverite slobodne dane i odmah rezervisite"
                monthlyFormSubtitle="Izabrani mesecni raspon se automatski prenosi u upit za duzi boravak."
                roomBlocks={roomBlocks}
                rooms={rooms}
              />
            ) : null}
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
              Smestaj u Minhenu koji se oseca kao
              <span className="cs_accent_color cs_ternary_font"> domaci</span>
            </h2>
            <div className="cs_card_thumbnail">
              <img src={landingGallery.detailImage} alt="Fotografija prostora za smestaj" />
            </div>
            <p className="cs_card_subtitle cs_fs_20 cs_light">
              Bilo da dolazite u Minhen zbog posla, projekta ili odmora, kod nas cete
              pronaci mirno mesto za boravak, prijatnu atmosferu i sve sto vam je
              potrebno tokom boravka u Nemackoj.
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

      <section className="home-showcase-section">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 cs_type_1">
            <div className="cs_section_heading_left">
              <p className="cs_section_subtitle cs_fs_24 cs_accent_color text-uppercase cs_mb_16">
                IZDVOJENO IZ SMESTAJA
              </p>
              <h2 className="cs_section_title cs_fs_64 mb-0">
                Pogledajte kako izgleda boravak kod nas
              </h2>
            </div>
            <div className="cs_section_heading_right">
              <p className="cs_fs_20 cs_light mb-0">
                Dodate fotografije su rasporedjene tako da na pocetnoj odmah pokazu ambijent
                soba i kvalitet prostora.
              </p>
            </div>
          </div>
          <div className="cs_height_66 cs_height_lg_45" />
          <div className="home-showcase-grid">
            <article className="home-showcase-card home-showcase-card--large">
              <img
                alt={landingGallery.showcaseImages[0].alt}
                className="home-showcase-card__image"
                src={landingGallery.showcaseImages[0].src}
              />
              <div className="home-showcase-card__overlay">
                <p className="home-showcase-card__eyebrow">Sobe</p>
                <h3>{landingGallery.showcaseImages[0].title}</h3>
                <p>{landingGallery.showcaseImages[0].text}</p>
              </div>
            </article>

            <div className="home-showcase-stack">
              {landingGallery.showcaseImages.slice(1).map((item) => (
                <article key={item.src} className="home-showcase-card">
                  <img alt={item.alt} className="home-showcase-card__image" src={item.src} />
                  <div className="home-showcase-card__overlay">
                    <p className="home-showcase-card__eyebrow">Ambijent</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="landing-trust-section">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="section-heading landing-section-heading">
            <div>
              <p className="eyebrow">Novo Sa Landing Strane</p>
              <h2>Jasnije sekcije za brzu odluku gosta</h2>
            </div>
            <div>
              <p className="landing-section-heading__text">
                Iz novog template-a preuzet je moderniji raspored sekcija, ali je sadrzaj
                prilagodjen stvarnom smestaju, stvarnim sobama i nasem nacinu rezervacije.
              </p>
            </div>
          </div>
          <div className="landing-trust-grid">
            {trustHighlights.map((item) => (
              <article key={item.title} className="landing-trust-card">
                <div className="landing-trust-card__icon">
                  <img src={item.icon} alt="" />
                </div>
                <strong className="landing-trust-card__value">{item.value}</strong>
                <span className="landing-trust-card__label">{item.title}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="cs_heading_bg">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="section-heading landing-section-heading landing-section-heading--light">
            <div className="cs_section_heading_left">
              <p className="eyebrow">O Smestaju</p>
              <h2 className="cs_white_color">Gostima su na raspolaganju</h2>
            </div>
            <div>
              <p className="landing-section-heading__text cs_white_color">
                Jagdschlossl Eichenried je mesto gde se mnogi nasi ljudi iz regiona rado
                vracaju kada dolaze u Minhen.
              </p>
            </div>
          </div>
          <div className="landing-feature-grid">
            {accommodationFeatures.map((item) => (
              <article key={item} className="landing-feature-card landing-feature-card--light">
                <strong>{item}</strong>
                <p>Prakticna pogodnost za goste koji dolaze na kraci ili duzi boravak.</p>
              </article>
            ))}
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section>
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="section-heading landing-section-heading">
            <div>
              <p className="eyebrow">Idealno Za Boravak U Minhenu</p>
              <h2>Kod nas cesto borave</h2>
            </div>
            <div>
              <p className="landing-section-heading__text">
                Smestaj je prilagodjen gostima kojima treba jednostavan, brz i pregledan booking proces.
              </p>
            </div>
          </div>
          <div className="landing-audience-grid">
            {guestTypes.map((item) => (
              <article key={item} className="landing-audience-card">
                <div className="landing-audience-card__icon">
                  <img src="/hotel-template/assets/img/icons/user.svg" alt="" />
                </div>
                <strong>{item}</strong>
                <p>
                  Nudimo fleksibilne opcije boravka i prijatnu atmosferu gde se gosti
                  osecaju kao kod kuce.
                </p>
              </article>
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
                    Odlicna lokacija blizu Minhena
                  </h2>
                </div>
              </div>
              <div className="cs_height_40 cs_height_lg_24" />
              <p className="cs_fs_20 cs_light">
                Jagdschlossl Eichenried se nalazi u mirnom mestu Eichenried, nedaleko od
                Minhena. Idealno za goste koji zele da budu blizu Minhena, ali da imaju
                mir za odmor.
              </p>
              <ul className="cs_features_list cs_fs_48 cs_heading_font cs_mp_0">
                {locationBenefits.map((item) => (
                  <li key={item}>* {item}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="cs_card cs_style_2">
                <div className="cs_card_thumbnail cs_zoom position-relative overflow-hidden">
                  <img src={landingGallery.locationImage} alt="Fotografija smestaja" />
                </div>
                <div className="cs_card_info cs_white_bg">
                  <h3 className="cs_card_title cs_fs_32 cs_mb_2">Mirno okruzenje za odmor</h3>
                  <p className="mb-0">
                    Brza povezanost sa Minhenom i blizina aerodroma Munchen cine ovaj
                    smestaj prakticnim izborom za posao, projekat i tranzitni boravak.
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
              ZASTO IZABRATI NAS
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">Cist, miran i pristupacan boravak</h2>
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

      <section className="landing-process-section cs_cream_bg">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="landing-process-layout">
            <div>
              <div className="section-heading landing-section-heading">
                <div>
                  <p className="eyebrow">Kako Rezervacija Funkcionise</p>
                  <h2>Pregledan put od prve posete do dolaska</h2>
                </div>
              </div>
              <div className="landing-process-list">
                {bookingProcess.map((item) => (
                  <article key={item.step} className="landing-process-card">
                    <div className="landing-process-card__step">{item.step}</div>
                    <div className="landing-process-card__body">
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <article className="landing-process-spotlight">
              <div className="landing-process-spotlight__media">
                <img
                  alt={landingGallery.showcaseImages[0]?.alt ?? "Fotografija smestaja"}
                  className="landing-process-spotlight__image"
                  src={landingGallery.showcaseImages[0]?.src ?? landingGallery.detailImage}
                />
              </div>
              <div className="landing-process-spotlight__content">
                <p className="eyebrow">Direktan Kontakt</p>
                <h3>Booking flow sada odmah vodi ka pravom koraku</h3>
                <p>
                  Umesto da gost luta kroz vise stranica, najvaznije informacije su skupljene
                  na jednom mestu: tip sobe, cene, kalendar i direktan kontakt za potvrdu.
                </p>
                <div className="landing-process-spotlight__meta">
                  <span>WhatsApp / Viber</span>
                  <span>Kalendar 14 dana</span>
                  <span>Stranica za svaku sobu</span>
                </div>
                <div className="cta-row">
                  <a
                    className="primary-button"
                    href="https://wa.me/491772078868"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Posalji poruku
                  </a>
                  <Link className="secondary-button" href="/rooms">
                    Otvori sobe
                  </Link>
                </div>
              </div>
            </article>
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
                SOBE I SMESTAJ
              </p>
              <h2 className="cs_section_title cs_fs_64 cs_white_color mb-0">
                Pregled raspolozivih tipova soba
              </h2>
            </div>
            <div className="cs_section_heading_right">
              <p className="cs_fs_20 cs_white_color cs_light">
                Smestaj je pogodan za pojedince, parove, radnike, firme i grupe.
              </p>
              <Link className="cs_text_btn cs_white_color cs_medium text-capitalize" href="/rooms">
                pogledaj sve sobe
              </Link>
            </div>
          </div>
          <div className="cs_height_66 cs_height_lg_45" />
          {rooms.length > 0 ? (
            <PublicRoomsGrid rooms={rooms} />
          ) : (
            <div className="admin-empty-state">
              <strong>Trenutno nema aktivnih soba</strong>
              <p>Pisite nam direktno za raspolozive termine.</p>
            </div>
          )}
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="cs_cream_bg">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="landing-booking-layout landing-booking-layout--compact">
            <div className="landing-booking-copy">
              <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">REZERVACIJA</p>
              <h2 className="cs_section_title cs_fs_64 mb-0">
                Booking tok je sada odmah u hero sekciji
              </h2>
              <p className="landing-booking-copy__text">
                Gost odmah na vrhu strane bira tip boravka, sobu i slobodne dane. Ostatak ove
                sekcije sada samo objasnjava tok i ostavlja brz ulaz za klijente koji zele da
                nastave preko Google naloga.
              </p>
              <div className="landing-booking-points">
                {bookingProcess.map((item) => (
                  <div key={item.step} className="landing-booking-point">
                    <strong>
                      {item.step}. {item.title}
                    </strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="landing-booking-contact-card">
              <span className="landing-booking-contact-card__label">Brzi kontakt i prijava</span>
              <strong>Viber / WhatsApp: +49 1772078868</strong>
              <p>
                Klijenti mogu da koriste Google prijavu kao obican guest nalog, dok cemo owner i
                staff role dodeliti cim stignu mejl adrese za pristup.
              </p>
              <div className="cta-row">
                <a
                  className="primary-button"
                  href="https://wa.me/491772078868"
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp upit
                </a>
                <Link className="secondary-button" href="/signin?callbackUrl=%2Faccount">
                  Prijava klijenta
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="landing-testimonial-section">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="section-heading landing-section-heading">
            <div>
              <p className="eyebrow">Utisak Koji Stranica Prenosi</p>
              <h2>Topliji i ubedljiviji prikaz smestaja</h2>
            </div>
            <div>
              <p className="landing-section-heading__text">
                Nova struktura sekcija bolje istice poverenje, realne fotografije i jednostavan
                kontakt, sto je posebno vazno gostima koji rezervisu na brzinu.
              </p>
            </div>
          </div>
          <div className="landing-testimonial-grid">
            {testimonialCards.map((item) => (
              <article key={item.name} className="landing-testimonial-card">
                <div className="landing-testimonial-card__media">
                  <img alt={item.name} src={item.image} />
                </div>
                <div className="landing-testimonial-card__body">
                  <p className="landing-testimonial-card__quote">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="landing-testimonial-card__person">
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="landing-final-cta">
            <div>
              <p className="eyebrow">Spremno Za Upit</p>
              <h2>Treba vam smestaj blizu Minhena bez komplikacije?</h2>
              <p>
                Pogledajte sobe, proverite dostupnost i javite se direktno. To je sada
                najjaci deo naslovne koji smo preuzeli i prilagodili iz novog template-a.
              </p>
            </div>
            <div className="landing-final-cta__actions">
              <a
                className="primary-button"
                href="https://wa.me/491772078868"
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp kontakt
              </a>
              <Link className="secondary-button" href="/#rezervacija">
                Idi na rezervaciju
              </Link>
            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section>
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">GALERIJA</p>
            <h2 className="cs_section_title cs_fs_64 mb-0">Fotografije objekta i soba</h2>
          </div>
          <div className="cs_height_70 cs_height_lg_45" />
          <PublicLegacyGallery items={landingGallery.galleryImages} />
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>
    </>
  );
}
