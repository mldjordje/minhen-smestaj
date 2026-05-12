import VideoPopup from "@/helper/PopupVideoOne";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const BannerOne: FC = () => {
  return (
    <section className='banner-area background-img position-relative overflow-hidden'>
      <Image
        src='/assets/images/thumbs/banner-bg.jpg'
        alt='Banner background'
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className='container'>
        <div className='row align-items-center justify-content-between'>
          <div className='col-xl-8 col-lg-8'>
            <div className='position-relative z-2'>
              <h6 className='banner-subtitle tw-text-xl text-uppercase text-white tw-mb-9'>
                Find unique homes in vibrant places.
              </h6>
              <h1 className='banner-title tw-text-29 text-white fw-normal tw-mb-10 tw-char-animation'>
                Trusted Hotels, Seamless Booking
              </h1>
              <div className='d-flex align-items-center flex-wrap row-gap-3 tw-gap-13'>
                <div>
                  <Link
                    className='tw-btn-hover-white bg-main-600 tw-py-5 tw-px-12 text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-rounded-lg'
                    href='/contact'
                  >
                    Booking today{" "}
                    <span className='d-inline-block lh-1 tw-text-lg'>
                      <i className='ph ph-arrow-up-right' />
                    </span>
                  </Link>
                </div>
                <div className=''>
                  <div className='d-flex align-items-center tw-gap-2'>
                    <span className='tw-text-xl text-white font-heading'>
                      5.0
                    </span>
                    <ul className='d-flex tw-gap-1'>
                      <li className='text-white'>
                        <i className='ph-bold ph-star' />
                      </li>
                      <li className='text-white'>
                        <i className='ph-bold ph-star' />
                      </li>
                      <li className='text-white'>
                        <i className='ph-bold ph-star' />
                      </li>
                      <li className='text-white'>
                        <i className='ph-bold ph-star' />
                      </li>
                      <li className='text-white'>
                        <i className='ph-bold ph-star' />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className='tw-text-xl text-white font-heading'>
                      From 2,000+ reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-lg-3'>
            {/* PopupVideoOne */}
            <VideoPopup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerOne;
