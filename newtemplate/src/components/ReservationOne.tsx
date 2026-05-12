import Link from "next/link";
import { FC } from "react";

const ReservationOne: FC = () => {
  return (
    <section
      className='background-img position-relative z-1 tw-pt-25 tw-pb-23'
      style={{
        backgroundImage: "url('assets/images/thumbs/cta-three-bg.jpg')",
      }}
    >
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-12'>
            <div className='cta-three-wrapper tw-pt-27 tw-pb-22 tw-px-20 tw_fade_anim'>
              <div className='section-two-wrapper text-center tw-mb-8'>
                <h6 className='section-two-subtitle tw-text-xl text-uppercase text-main-three-600 tw-mb-4'>
                  Find unique homes in vibrant places.
                </h6>
                <h2 className='section-two-title tw-text-25 text-white fw-normal tw-char-animation'>
                  Book Your Beachside Escape Today
                </h2>
              </div>
              <div className='tw-mt-6 text-center'>
                <Link
                  className='tw-btn-hover-yellow bg-main-three-600 tw-py-6 tw-px-16 text-capitalize text-white font-heading d-inline-flex fw-bold align-items-center tw-gap-2'
                  href='/contact'
                >
                  make reservation{" "}
                  <span className='d-inline-block lh-1 tw-text-lg'>
                    <i className='ph ph-arrow-up-right' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationOne;
