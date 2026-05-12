"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const PropertiesInner: FC = () => {
  return (
    <section className='py-120 position-relative z-1 bg_gray_1'>
      <div className='container'>
        <div className='row justify-content-between align-items-center'>
          <div className='col-xl-8 col-lg-8'>
            <div
              className='section-wrapper tw-mb-14 tw_fade_anim'
              data-delay='.3'
            >
              <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                Sleep in Style and Serenity
              </h6>
              <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                Luxury, Location &amp; Love Reasons To Stay With Us
              </h2>
            </div>
          </div>
          <div className='col-xl-4 col-lg-4'>
            <div className='service-top-button tw_fade_anim' data-delay='.5'>
              <Link
                className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                href='/room-details'
              >
                Booking today{" "}
                <span className='d-inline-block lh-1 tw-text-lg'>
                  <i className='ph ph-arrow-up-right' />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='service-slider tw_fade_anim'>
              <div className='service-active swiper-container'>
                <div className='swiper-wrapper'>
                  <Swiper
                    className='service-active'
                    modules={[Autoplay]}
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={true}
                    speed={3000}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    breakpoints={{
                      1400: { slidesPerView: 3 },
                      1200: { slidesPerView: 3 },
                      992: { slidesPerView: 2 },
                      768: { slidesPerView: 2 },
                      576: { slidesPerView: 1 },
                      0: { slidesPerView: 1 },
                    }}
                  >
                    <SwiperSlide>
                      {/* slide 1 */}
                      <div className='service-wrapper bg-white tw-p-4 tw-rounded-xl tw-mb-8 swiper-slide'>
                        <div className='service-thumb tw-mb-5 position-relative z-1 overflow-hidden'>
                          <Link href='/room-details'>
                            <Image
                              width={423}
                              height={308}
                              className='tw-rounded-xl w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                              src='/assets/images/thumbs/service-thumb1.jpg'
                              alt='thumb'
                            />
                          </Link>
                          <div className='service-tag position-absolute start-0 top-0 tw-mt-2 tw-ms-2'>
                            <Link
                              className='bg-white text-heading tw-py-1 tw-px-5 tw-rounded-lg tw-text-lg text-capitalize'
                              href='/room-details'
                            >
                              10 properties
                            </Link>
                          </div>
                        </div>
                        <div className='service-content tw-px-2 tw-mb-2'>
                          <span className='service-location'>
                            <i className='ph ph-map-pin' /> Delhi, India
                          </span>
                          <h4 className='service-title tw-text-8 fw-normal text-capitalize tw-mb-2'>
                            <Link
                              className='hover-text-secondary'
                              href='/room-details'
                            >
                              Mystic Escape Tours
                            </Link>
                          </h4>
                          <p className='service-paragraph tw-mb-5'>
                            We provide daily meals and run food drives to ensure
                            child or elder in our community goes to bed.
                          </p>
                          <div className='service-wrap tw-rounded-xl tw-py-4 tw-px-6'>
                            <div className='service-star d-flex tw-gap-6 tw-pb-4 tw-mb-6'>
                              <span className='text-heading fw-normal d-flex tw-gap-2'>
                                <i className='ph ph-star' /> 5.00 (334)
                              </span>
                              <span className='text-heading fw-normal'>
                                8 Nights - 9 Days
                              </span>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap row-gap-3'>
                              <div className='service-price'>
                                <h6 className='fw-normal'>$589.00</h6>
                                <p>/ Per Person</p>
                              </div>
                              <div>
                                <Link
                                  className='font-heading tw-text-sm text-uppercase text-heading fw-normal hover-text-main-600'
                                  href='/room-details'
                                >
                                  EXPLORE MORE{" "}
                                  <i className='tw-text-base ph ph-arrow-up-right' />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* slide 2 */}
                      <div className='service-wrapper bg-white tw-p-4 tw-rounded-xl tw-mb-8 swiper-slide'>
                        <div className='service-thumb tw-mb-5 position-relative z-1 overflow-hidden'>
                          <Link href='/room-details'>
                            <Image
                              width={423}
                              height={308}
                              className='tw-rounded-xl w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                              src='/assets/images/thumbs/service-thumb2.jpg'
                              alt='thumb'
                            />
                          </Link>
                          <div className='service-tag position-absolute start-0 top-0 tw-mt-2 tw-ms-2'>
                            <Link
                              className='bg-white text-heading tw-py-1 tw-px-5 tw-rounded-lg tw-text-lg text-capitalize'
                              href='#'
                            >
                              10 properties
                            </Link>
                          </div>
                        </div>
                        <div className='service-content tw-px-2 tw-mb-2'>
                          <span className='service-location'>
                            <i className='ph ph-map-pin' /> Delhi, India
                          </span>
                          <h4 className='service-title tw-text-8 fw-normal text-capitalize tw-mb-2'>
                            <Link
                              className='hover-text-secondary'
                              href='/room-details'
                            >
                              rban Explorer Getaways
                            </Link>
                          </h4>
                          <p className='service-paragraph tw-mb-5'>
                            We provide daily meals and run food drives to ensure
                            child or elder in our community goes to bed.
                          </p>
                          <div className='service-wrap tw-rounded-xl tw-py-4 tw-px-6'>
                            <div className='service-star d-flex tw-gap-6 tw-pb-4 tw-mb-6'>
                              <span className='text-heading fw-normal d-flex tw-gap-2'>
                                <i className='ph ph-star' /> 5.00 (334)
                              </span>
                              <span className='text-heading fw-normal'>
                                8 Nights - 9 Days
                              </span>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap row-gap-3'>
                              <div className='service-price'>
                                <h6 className='fw-normal'>$589.00</h6>
                                <p>/ Per Person</p>
                              </div>
                              <div>
                                <Link
                                  className='font-heading tw-text-sm text-uppercase text-heading fw-normal hover-text-main-600'
                                  href='/room-details'
                                >
                                  EXPLORE MORE{" "}
                                  <i className='tw-text-base ph ph-arrow-up-right' />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* slide 3 */}
                      <div className='service-wrapper bg-white tw-p-4 tw-rounded-xl tw-mb-8 swiper-slide'>
                        <div className='service-thumb tw-mb-5 position-relative z-1 overflow-hidden'>
                          <Link href='/room-details'>
                            <Image
                              width={423}
                              height={308}
                              className='tw-rounded-xl w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                              src='/assets/images/thumbs/service-thumb3.jpg'
                              alt='thumb'
                            />
                          </Link>
                          <div className='service-tag position-absolute start-0 top-0 tw-mt-2 tw-ms-2'>
                            <Link
                              className='bg-white text-heading tw-py-1 tw-px-5 tw-rounded-lg tw-text-lg text-capitalize'
                              href='#'
                            >
                              10 properties
                            </Link>
                          </div>
                        </div>
                        <div className='service-content tw-px-2 tw-mb-2'>
                          <span className='service-location'>
                            <i className='ph ph-map-pin' /> Delhi, India
                          </span>
                          <h4 className='service-title tw-text-8 fw-normal text-capitalize tw-mb-2'>
                            <Link
                              className='hover-text-secondary'
                              href='/room-details'
                            >
                              WanderNest Holidays
                            </Link>
                          </h4>
                          <p className='service-paragraph tw-mb-5'>
                            We provide daily meals and run food drives to ensure
                            child or elder in our community goes to bed.
                          </p>
                          <div className='service-wrap tw-rounded-xl tw-py-4 tw-px-6'>
                            <div className='service-star d-flex tw-gap-6 tw-pb-4 tw-mb-6'>
                              <span className='text-heading fw-normal d-flex tw-gap-2'>
                                <i className='ph ph-star' /> 5.00 (334)
                              </span>
                              <span className='text-heading fw-normal'>
                                8 Nights - 9 Days
                              </span>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap row-gap-3'>
                              <div className='service-price'>
                                <h6 className='fw-normal'>$589.00</h6>
                                <p>/ Per Person</p>
                              </div>
                              <div>
                                <Link
                                  className='font-heading tw-text-sm text-uppercase text-heading fw-normal hover-text-main-600'
                                  href='/room-details'
                                >
                                  EXPLORE MORE{" "}
                                  <i className='tw-text-base ph ph-arrow-up-right' />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* slide 1 */}
                      <div className='service-wrapper bg-white tw-p-4 tw-rounded-xl tw-mb-8 swiper-slide'>
                        <div className='service-thumb tw-mb-5 position-relative z-1 overflow-hidden'>
                          <Link href='/room-details'>
                            <Image
                              width={423}
                              height={308}
                              className='tw-rounded-xl w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                              src='/assets/images/thumbs/service-thumb4.jpg'
                              alt='thumb'
                            />
                          </Link>
                          <div className='service-tag position-absolute start-0 top-0 tw-mt-2 tw-ms-2'>
                            <Link
                              className='bg-white text-heading tw-py-1 tw-px-5 tw-rounded-lg tw-text-lg text-capitalize'
                              href='#'
                            >
                              10 properties
                            </Link>
                          </div>
                        </div>
                        <div className='service-content tw-px-2 tw-mb-2'>
                          <span className='service-location'>
                            <i className='ph ph-map-pin' /> Delhi, India
                          </span>
                          <h4 className='service-title tw-text-8 fw-normal text-capitalize tw-mb-2'>
                            <Link
                              className='hover-text-secondary'
                              href='/room-details'
                            >
                              Mystic Escape Tours
                            </Link>
                          </h4>
                          <p className='service-paragraph tw-mb-5'>
                            We provide daily meals and run food drives to ensure
                            child or elder in our community goes to bed.
                          </p>
                          <div className='service-wrap tw-rounded-xl tw-py-4 tw-px-6'>
                            <div className='service-star d-flex tw-gap-6 tw-pb-4 tw-mb-6'>
                              <span className='text-heading fw-normal d-flex tw-gap-2'>
                                <i className='ph ph-star' /> 5.00 (334)
                              </span>
                              <span className='text-heading fw-normal'>
                                8 Nights - 9 Days
                              </span>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap row-gap-3'>
                              <div className='service-price'>
                                <h6 className='fw-normal'>$589.00</h6>
                                <p>/ Per Person</p>
                              </div>
                              <div>
                                <Link
                                  className='font-heading tw-text-sm text-uppercase text-heading fw-normal hover-text-main-600'
                                  href='/room-details'
                                >
                                  EXPLORE MORE{" "}
                                  <i className='tw-text-base ph ph-arrow-up-right' />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* slide 2 */}
                      <div className='service-wrapper bg-white tw-p-4 tw-rounded-xl tw-mb-8 swiper-slide'>
                        <div className='service-thumb tw-mb-5 position-relative z-1 overflow-hidden'>
                          <Link href='/room-details'>
                            <Image
                              className='tw-rounded-xl w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                              src='/assets/images/thumbs/service-thumb5.jpg'
                              alt='thumb'
                              width={423}
                              height={308}
                            />
                          </Link>
                          <div className='service-tag position-absolute start-0 top-0 tw-mt-2 tw-ms-2'>
                            <Link
                              className='bg-white text-heading tw-py-1 tw-px-5 tw-rounded-lg tw-text-lg text-capitalize'
                              href='#'
                            >
                              10 properties
                            </Link>
                          </div>
                        </div>
                        <div className='service-content tw-px-2 tw-mb-2'>
                          <span className='service-location'>
                            <i className='ph ph-map-pin' /> Delhi, India
                          </span>
                          <h4 className='service-title tw-text-8 fw-normal text-capitalize tw-mb-2'>
                            <Link
                              className='hover-text-secondary'
                              href='/room-details'
                            >
                              Mystic Escape Tours
                            </Link>
                          </h4>
                          <p className='service-paragraph tw-mb-5'>
                            We provide daily meals and run food drives to ensure
                            child or elder in our community goes to bed.
                          </p>
                          <div className='service-wrap tw-rounded-xl tw-py-4 tw-px-6'>
                            <div className='service-star d-flex tw-gap-6 tw-pb-4 tw-mb-6'>
                              <span className='text-heading fw-normal d-flex tw-gap-2'>
                                <i className='ph ph-star' /> 5.00 (334)
                              </span>
                              <span className='text-heading fw-normal'>
                                8 Nights - 9 Days
                              </span>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap row-gap-3'>
                              <div className='service-price'>
                                <h6 className='fw-normal'>$589.00</h6>
                                <p>/ Per Person</p>
                              </div>
                              <div>
                                <Link
                                  className='font-heading tw-text-sm text-uppercase text-heading fw-normal hover-text-main-600'
                                  href='/room-details'
                                >
                                  EXPLORE MORE{" "}
                                  <i className='tw-text-base ph ph-arrow-up-right' />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* slide 3 */}
                      <div className='service-wrapper bg-white tw-p-4 tw-rounded-xl tw-mb-8 swiper-slide'>
                        <div className='service-thumb tw-mb-5 position-relative z-1 overflow-hidden'>
                          <Link href='/room-details'>
                            <Image
                              className='tw-rounded-xl w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                              src='/assets/images/thumbs/service-thumb6.jpg'
                              alt='thumb'
                              width={423}
                              height={308}
                            />
                          </Link>
                          <div className='service-tag position-absolute start-0 top-0 tw-mt-2 tw-ms-2'>
                            <Link
                              className='bg-white text-heading tw-py-1 tw-px-5 tw-rounded-lg tw-text-lg text-capitalize'
                              href='#'
                            >
                              10 properties
                            </Link>
                          </div>
                        </div>
                        <div className='service-content tw-px-2 tw-mb-2'>
                          <span className='service-location'>
                            <i className='ph ph-map-pin' /> Delhi, India
                          </span>
                          <h4 className='service-title tw-text-8 fw-normal text-capitalize tw-mb-2'>
                            <Link
                              className='hover-text-secondary'
                              href='/room-details'
                            >
                              Mystic Escape Tours
                            </Link>
                          </h4>
                          <p className='service-paragraph tw-mb-5'>
                            We provide daily meals and run food drives to ensure
                            child or elder in our community goes to bed.
                          </p>
                          <div className='service-wrap tw-rounded-xl tw-py-4 tw-px-6'>
                            <div className='service-star d-flex tw-gap-6 tw-pb-4 tw-mb-6'>
                              <span className='text-heading fw-normal d-flex tw-gap-2'>
                                <i className='ph ph-star' /> 5.00 (334)
                              </span>
                              <span className='text-heading fw-normal'>
                                8 Nights - 9 Days
                              </span>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap row-gap-3'>
                              <div className='service-price'>
                                <h6 className='fw-normal'>$589.00</h6>
                                <p>/ Per Person</p>
                              </div>
                              <div>
                                <Link
                                  className='font-heading tw-text-sm text-uppercase text-heading fw-normal hover-text-main-600'
                                  href='/room-details'
                                >
                                  EXPLORE MORE{" "}
                                  <i className='tw-text-base ph ph-arrow-up-right' />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesInner;
