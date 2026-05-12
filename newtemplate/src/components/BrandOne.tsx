import Image from "next/image";
import { FC } from "react";

const BrandOne: FC = () => {
  return (
    <div className='brand-three-area py-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-12'>
            <div className='section-two-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-main-three-800 tw-mb-6'>
                Find unique homes in vibrant places.
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                We’re Trusted By Companies Like
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
            <div
              className='brand-three-wrapper position-relative d-flex align-items-center justify-content-center tw-rounded-lg border border-neutral tw-py-15 tw-mb-7 cursor-pointer tw_fade_anim'
              data-delay='.3'
            >
              <span className='brand-three-active-media'>
                <Image
                  width={170}
                  height={82}
                  src='/assets/images/thumbs/brand-three-img1.png'
                  alt='thumb'
                />
              </span>
              <span className='brand-three-hover-media'>
                <Image
                  width={170}
                  height={82}
                  src='/assets/images/thumbs/brand-three-img11.png'
                  alt='thumb'
                />
              </span>
            </div>
          </div>
          <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
            <div
              className='brand-three-wrapper position-relative d-flex align-items-center justify-content-center tw-rounded-lg border border-neutral tw-py-15 tw-mb-7 cursor-pointer tw_fade_anim'
              data-delay='.5'
            >
              <span className='brand-three-active-media'>
                <Image
                  width={185}
                  height={35}
                  src='/assets/images/thumbs/brand-three-img2.png'
                  alt='thumb'
                />
              </span>
              <span className='brand-three-hover-media'>
                <Image
                  width={185}
                  height={35}
                  src='/assets/images/thumbs/brand-three-img22.png'
                  alt='thumb'
                />
              </span>
            </div>
          </div>
          <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
            <div
              className='brand-three-wrapper position-relative d-flex align-items-center justify-content-center tw-rounded-lg border border-neutral tw-py-15 tw-mb-7 cursor-pointer tw_fade_anim'
              data-delay='.7'
            >
              <span className='brand-three-active-media'>
                <Image
                  width={187}
                  height={58}
                  src='/assets/images/thumbs/brand-three-img3.png'
                  alt='thumb'
                />
              </span>
              <span className='brand-three-hover-media'>
                <Image
                  width={187}
                  height={58}
                  src='/assets/images/thumbs/brand-three-img33.png'
                  alt='thumb'
                />
              </span>
            </div>
          </div>
          <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
            <div
              className='brand-three-wrapper position-relative d-flex align-items-center justify-content-center tw-rounded-lg border border-neutral tw-py-15 tw-mb-7 cursor-pointer tw_fade_anim'
              data-delay='.9'
            >
              <span className='brand-three-active-media'>
                <Image
                  width={169}
                  height={32}
                  src='/assets/images/thumbs/brand-three-img4.png'
                  alt='thumb'
                />
              </span>
              <span className='brand-three-hover-media'>
                <Image
                  width={169}
                  height={32}
                  src='/assets/images/thumbs/brand-three-img44.png'
                  alt='thumb'
                />
              </span>
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-xl-9'>
            <div className='row'>
              <div className='col-xl-4 col-lg-6 col-md-6 col-sm-6'>
                <div
                  className='brand-three-wrapper position-relative d-flex align-items-center justify-content-center tw-rounded-lg border border-neutral tw-py-15 tw-mb-7 cursor-pointer tw_fade_anim'
                  data-delay='.2'
                >
                  <span className='brand-three-active-media'>
                    <Image
                      width={200}
                      height={50}
                      src='/assets/images/thumbs/brand-three-img5.png'
                      alt='thumb'
                    />
                  </span>
                  <span className='brand-three-hover-media'>
                    <Image
                      width={200}
                      height={50}
                      src='/assets/images/thumbs/brand-three-img55.png'
                      alt='thumb'
                    />
                  </span>
                </div>
              </div>
              <div className='col-xl-4 col-lg-6 col-md-6 col-sm-6'>
                <div
                  className='brand-three-wrapper position-relative d-flex align-items-center justify-content-center tw-rounded-lg border border-neutral tw-py-15 tw-mb-7 cursor-pointer tw_fade_anim'
                  data-delay='.5'
                >
                  <span className='brand-three-active-media'>
                    <Image
                      width={200}
                      height={38}
                      src='/assets/images/thumbs/brand-three-img6.png'
                      alt='thumb'
                    />
                  </span>
                  <span className='brand-three-hover-media'>
                    <Image
                      width={200}
                      height={38}
                      src='/assets/images/thumbs/brand-three-img66.png'
                      alt='thumb'
                    />
                  </span>
                </div>
              </div>
              <div className='col-xl-4 col-lg-6 col-md-6 col-sm-6'>
                <div
                  className='brand-three-wrapper position-relative d-flex align-items-center justify-content-center tw-rounded-lg border border-neutral tw-py-15 tw-mb-7 cursor-pointer tw_fade_anim'
                  data-delay='.7'
                >
                  <span className='brand-three-active-media'>
                    <Image
                      width={200}
                      height={60}
                      src='/assets/images/thumbs/brand-three-img7.png'
                      alt='thumb'
                    />
                  </span>
                  <span className='brand-three-hover-media'>
                    <Image
                      width={200}
                      height={60}
                      src='/assets/images/thumbs/brand-three-img77.png'
                      alt='thumb'
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandOne;
