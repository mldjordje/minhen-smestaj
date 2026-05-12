import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const BannerFour: FC = () => {
  return (
    <div className='banner-four-main tw-pt-8 tw_fade_anim'>
      <section className='banner-four-area position-relative z-1'>
        <div className='container-fluid gx-0'>
          <div className='row align-items-center gx-0'>
            <div className='col-xl-7 col-lg-8'>
              <div className='banner-four-content position-relative z-2'>
                <h6 className='banner-subtitle tw-text-xl text-uppercase tw-mb-9'>
                  Find unique homes in vibrant places.
                </h6>
                <h1 className='banner-four-title tw-text-23 fw-normal tw-mb-5 tw-char-animation'>
                  Experience Comfort Of The City’s Stays
                </h1>
                <p className='banner-four-paragraph tw-text-lg fw-medium text-heading tw-mb-10'>
                  At SparkleClean, we believe a clean space is a happy space.
                  With years of experience in residential and commercial
                  cleaning our mission is to deliver top-quality ..
                </p>
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
              </div>
            </div>
          </div>
        </div>
        <div className='banner-four-thumb position-absolute h-100 top-0 end-0'>
          <Image
            width={825}
            height={773}
            className='w-100 h-100 object-fit-cover'
            src='/assets/images/thumbs/banner-four-thumb.jpg'
            alt='thumb'
          />
        </div>
      </section>
    </div>
  );
};

export default BannerFour;
