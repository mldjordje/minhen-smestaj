import Link from "next/link";
import { PublicLegacyGallery, PublicRoomsGrid } from "@/components/public-template";

export default function RoomsPage() {
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
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Rooms</li>
            </ol>
            <h2 className="cs_fs_180 cs_white_color text-center mb-0">ROOMS</h2>
          </div>
        </div>
      </section>

      <section>
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              ROOMS & SUITES
            </p>
            <h2 className="cs_section_title cs_fs_64 mb-0">
              Comfortable Rooms
              <br />
              Just For You
            </h2>
          </div>
          <div className="cs_height_70 cs_height_lg_45" />
          <PublicRoomsGrid />
        </div>
        <div className="cs_height_120 cs_height_lg_80" />
      </section>

      <section className="cs_cream_bg">
        <div className="cs_height_120 cs_height_lg_80" />
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_fs_24 cs_accent_color cs_mb_12">
              PROPERTY GALLERY
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
