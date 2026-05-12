import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const RoomInner: FC = () => {
  return (
    <>
      <section className='pt-120' style={{ background: "#f7f6ed" }}>
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
              <div
                className='service-two-wrapper tw-mb-7 tw_fade_anim'
                data-delay='.3'
              >
                <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                  <Link href='/room-details'>
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
                        </span>
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
                    <Link href='/room-details'>Presidential Suite</Link>
                  </h4>
                  <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                    $599
                  </span>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-6'>
              <div
                className='service-two-wrapper tw-mb-7 tw_fade_anim'
                data-delay='.5'
              >
                <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                  <Link href='/room-details'>
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
                        </span>
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
                    <Link href='/room-details'>Royal Deluxe Room</Link>
                  </h4>
                  <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                    $599
                  </span>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-6'>
              <div
                className='service-two-wrapper tw-mb-7 tw_fade_anim'
                data-delay='.7'
              >
                <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                  <Link href='/room-details'>
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
                        </span>
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
                    <Link href='/room-details'>Presidential Suite</Link>
                  </h4>
                  <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                    $599
                  </span>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-6'>
              <div
                className='service-two-wrapper tw-mb-7 tw_fade_anim'
                data-delay='.3'
              >
                <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                  <Link href='/room-details'>
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
                        </span>
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
                    <Link href='/room-details'>Presidential Suite</Link>
                  </h4>
                  <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                    $599
                  </span>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-6'>
              <div
                className='service-two-wrapper tw-mb-7 tw_fade_anim'
                data-delay='.5'
              >
                <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                  <Link href='/room-details'>
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
                        </span>
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
                    <Link href='/room-details'>Royal Deluxe Room</Link>
                  </h4>
                  <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                    $599
                  </span>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-6'>
              <div
                className='service-two-wrapper tw-mb-7 tw_fade_anim'
                data-delay='.7'
              >
                <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                  <Link href='/room-details'>
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
                        </span>
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
                    <Link href='/room-details'>Presidential Suite</Link>
                  </h4>
                  <span className='service-two-price font-heading tw-text-10 fw-normal text-heading'>
                    $599
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className='bg_2 background-img position-relative z-1 tw-pt-25 tw-pb-23 tw_fade_anim'
        style={{
          backgroundImage: "url('assets/images/thumbs/cta-three-bg2.jpg')",
        }}
      >
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-12'>
              <div className='cta-three-wrapper tw-pt-27 tw-pb-22 tw-px-20'>
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
    </>
  );
};

export default RoomInner;
