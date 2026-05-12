import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const ServiceTwo: FC = () => {
  return (
    <section className='service-two-area'>
      <div className='container service-two-container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7 col-lg-10'>
            <div className='section-two-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                Rest, Relax, Recharge
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                Experience Luxury And Comfort With In Every Corners
              </h2>
            </div>
          </div>
        </div>
        <div className='row tw-pb-14'>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-two-wrapper tw_fade_anim' data-delay='.3'>
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/service-details'>
                  <Image
                    width={548}
                    height={531}
                    className='tw-rounded-lg'
                    src='/assets/images/thumbs/service-two-thumb1.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 bottom-0 tw-mb-5 tw-ms-4'>
                  <ul className='d-flex tw-gap-2 flex-wrap row-gap-3'>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading'>
                      Luxury
                    </li>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading d-inline-flex tw-gap-2 align-items-center'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={16}
                          height={16}
                          src='/assets/images/icons/service-two-icon1.svg'
                          alt=''
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading d-inline-flex tw-gap-2 align-items-center'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={18}
                          height={17}
                          src='/assets/images/icons/service-two-icon2.svg'
                          alt=''
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
              <div className='service-two-content'>
                <h4 className='service-two-title tw-text-2xl fw-normal border-bottom border-neutral tw-pb-4'>
                  <Link href='/service-details'>Presidential Suite</Link>
                </h4>
                <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                  $599
                </span>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-two-wrapper tw_fade_anim' data-delay='.5'>
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/service-details'>
                  <Image
                    width={548}
                    height={531}
                    className='tw-rounded-lg'
                    src='/assets/images/thumbs/service-two-thumb2.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 bottom-0 tw-mb-5 tw-ms-4'>
                  <ul className='d-flex tw-gap-2 flex-wrap row-gap-3'>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading'>
                      Luxury
                    </li>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading d-inline-flex tw-gap-2 align-items-center'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={16}
                          height={16}
                          src='/assets/images/icons/service-two-icon1.svg'
                          alt=''
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading d-inline-flex tw-gap-2 align-items-center'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={18}
                          height={17}
                          src='/assets/images/icons/service-two-icon2.svg'
                          alt=''
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
              <div className='service-two-content'>
                <h4 className='service-two-title tw-text-2xl fw-normal border-bottom border-neutral tw-pb-4'>
                  <Link href='/service-details'>Royal Deluxe Room</Link>
                </h4>
                <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                  $599
                </span>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-two-wrapper tw_fade_anim' data-delay='.7'>
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/service-details'>
                  <Image
                    width={548}
                    height={531}
                    className='tw-rounded-lg'
                    src='/assets/images/thumbs/service-two-thumb3.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 bottom-0 tw-mb-5 tw-ms-4'>
                  <ul className='d-flex tw-gap-2 flex-wrap row-gap-3'>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading'>
                      Luxury
                    </li>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading d-inline-flex tw-gap-2 align-items-center'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={16}
                          height={16}
                          src='/assets/images/icons/service-two-icon1.svg'
                          alt=''
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='bg-white tw-rounded-3xl tw-py-2 tw-px-6 fw-medium text-heading d-inline-flex tw-gap-2 align-items-center'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={18}
                          height={17}
                          src='/assets/images/icons/service-two-icon2.svg'
                          alt=''
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
              <div className='service-two-content'>
                <h4 className='service-two-title tw-text-2xl fw-normal border-bottom border-neutral tw-pb-4'>
                  <Link href='/service-details'>Presidential Suite</Link>
                </h4>
                <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                  $599
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-xl-5'>
            <div className='text-center'>
              <div className='service-two-btn position-relative z-1'>
                <Link
                  className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-11 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                  href='/service-details'
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
    </section>
  );
};

export default ServiceTwo;
