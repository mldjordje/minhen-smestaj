import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const OfferOne: FC = () => {
  return (
    <section className='offer-area pb-120'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-11'>
            <div className='section-wrapper tw-mb-14 tw_fade_anim'>
              <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                Committed to Excellence
              </h6>
              <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                Get Our Special Offer
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='offer-wrapper overflow-hidden tw-mb-7 tw_fade_anim'
              data-delay='.3'
            >
              <div className='position-relative z-1'>
                <Link href='/destination-details'>
                  <Image
                    width={450}
                    height={501}
                    src='/assets/images/thumbs/offer-thumb1.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='offer-title'>
                  <h4 className='offer-title-inner tw-text-8 fw-normal'>
                    Family Escape Package
                  </h4>
                </div>
                <div className='offer-tag'>
                  <span className='bg-main-600 text-heading fw-medium'>
                    save 30%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='offer-wrapper active overflow-hidden tw-mb-7 tw_fade_anim'
              data-delay='.5'
            >
              <div className='position-relative z-1'>
                <Link href='/destination-details'>
                  <Image
                    width={451}
                    height={501}
                    src='/assets/images/thumbs/offer-thumb2.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='offer-title'>
                  <h4 className='offer-title-inner tw-text-8 fw-normal'>
                    Romantic Couple Retreat
                  </h4>
                </div>
                <div className='offer-tag'>
                  <span className='bg-main-600 text-heading fw-medium'>
                    save 30%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='offer-wrapper overflow-hidden tw-mb-7 tw_fade_anim'
              data-delay='.7'
            >
              <div className='position-relative z-1'>
                <Link href='/destination-details'>
                  <Image
                    width={450}
                    height={501}
                    src='/assets/images/thumbs/offer-thumb3.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='offer-title'>
                  <h4 className='offer-title-inner tw-text-8 fw-normal'>
                    Honeymoon Special
                  </h4>
                </div>
                <div className='offer-tag'>
                  <span className='bg-main-600 text-heading fw-medium'>
                    save 30%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferOne;
