import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const ExperienceOne: FC = () => {
  return (
    <section className='experience-area py-120'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-8'>
            <div className='section-two-wrapper tw-mb-14 tw_fade_anim'>
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                A Royal Taste of Elegance
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                Exquisite Dinner Experience Delight Your Taste Buds
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='experience-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.3'
            >
              <div className='experience-thumb position-relative z-1'>
                <Link href='/destination-details'>
                  <Image
                    width={464}
                    height={448}
                    className='tw-rounded-lg'
                    src='/assets/images/thumbs/experience-thumb1.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 bottom-0 tw-ms-3 tw-mb-3'>
                  <div className='experience-content d-flex justify-content-between align-items-end tw-rounded-lg'>
                    <div className='experience-content-inner'>
                      <h4 className='tw-text-2xl fw-normal tw-mb-2'>
                        <Link href='/destination-details'>
                          Sizzling The View
                        </Link>
                      </h4>
                      <p className='d-inline-flex align-items-center tw-gap-2'>
                        <span className='d-inline-block lh-1 tw-text-2xl'>
                          <i className='ph ph-clock' />
                        </span>{" "}
                        6 PM – 11 PM
                      </p>
                    </div>
                    <div>
                      <Link
                        className='text-heading d-inline-flex align-items-center tw-gap-4 hover-text-main-600'
                        href='/destination-details'
                      >
                        Booking today{" "}
                        <span className='tw-text-xl d-inline-block lh-1'>
                          <i className='ph ph-arrow-up-right' />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='experience-tag position-absolute start-0 top-0 tw-mt-4 tw-ms-3'>
                  <Link
                    className='bg-white d-inline-block text-heading tw-rounded-3xl tw-py-2 tw-px-5 text-capitalize fw-medium'
                    href='/destination-details'
                  >
                    rooftop dinner
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='experience-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.5'
            >
              <div className='experience-thumb position-relative z-1'>
                <Link href='/destination-details'>
                  <Image
                    width={464}
                    height={446}
                    className='tw-rounded-lg'
                    src='/assets/images/thumbs/experience-thumb2.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 bottom-0 tw-ms-3 tw-mb-3'>
                  <div className='experience-content d-flex justify-content-between align-items-end tw-rounded-lg'>
                    <div className='experience-content-inner'>
                      <h4 className='tw-text-2xl fw-normal tw-mb-2'>
                        <Link href='/destination-details'>
                          Sizzling The View
                        </Link>
                      </h4>
                      <p className='d-inline-flex align-items-center tw-gap-2'>
                        <span className='d-inline-block lh-1 tw-text-2xl'>
                          <i className='ph ph-clock' />
                        </span>{" "}
                        6 PM – 11 PM
                      </p>
                    </div>
                    <div>
                      <Link
                        className='text-heading d-inline-flex align-items-center tw-gap-4 hover-text-main-600'
                        href='/destination-details'
                      >
                        Booking today{" "}
                        <span className='tw-text-xl d-inline-block lh-1'>
                          <i className='ph ph-arrow-up-right' />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='experience-tag position-absolute start-0 top-0 tw-mt-4 tw-ms-3'>
                  <Link
                    className='bg-white d-inline-block text-heading tw-rounded-3xl tw-py-2 tw-px-5 text-capitalize fw-medium'
                    href='/destination-details'
                  >
                    rooftop dinner
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='experience-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.7'
            >
              <div className='experience-thumb position-relative z-1'>
                <Link href='/destination-details'>
                  <Image
                    width={464}
                    height={446}
                    className='tw-rounded-lg'
                    src='/assets/images/thumbs/experience-thumb3.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 bottom-0 tw-ms-3 tw-mb-3'>
                  <div className='experience-content d-flex justify-content-between align-items-end tw-rounded-lg'>
                    <div className='experience-content-inner'>
                      <h4 className='tw-text-2xl fw-normal tw-mb-2'>
                        <Link href='/destination-details'>
                          Sizzling The View
                        </Link>
                      </h4>
                      <p className='d-inline-flex align-items-center tw-gap-2'>
                        <span className='d-inline-block lh-1 tw-text-2xl'>
                          <i className='ph ph-clock' />
                        </span>{" "}
                        6 PM – 11 PM
                      </p>
                    </div>
                    <div>
                      <Link
                        className='text-heading d-inline-flex align-items-center tw-gap-4 hover-text-main-600'
                        href='/destination-details'
                      >
                        Booking today{" "}
                        <span className='tw-text-xl d-inline-block lh-1'>
                          <i className='ph ph-arrow-up-right' />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='experience-tag position-absolute start-0 top-0 tw-mt-4 tw-ms-3'>
                  <Link
                    className='bg-white d-inline-block text-heading tw-rounded-3xl tw-py-2 tw-px-5 text-capitalize fw-medium'
                    href='/destination-details'
                  >
                    rooftop dinner
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceOne;
