"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const TestimonialOne: FC = () => {
  return (
    <section className='testimonial-area testimonial-panel-area py-120 position-relative z-1'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7'>
            <div
              className='section-wrapper text-center tw-mb-14 tw_fade_anim'
              data-delay='.3'
            >
              <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                Voices of Satisfaction
              </h6>
              <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                Why Traveller Love Us
              </h2>
            </div>
          </div>
        </div>
        <div className='row tw-mb-6'>
          <div className='col-xl-12'>
            <Swiper
              className='service-active'
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              speed={5000}
              autoplay={{ delay: 0, disableOnInteraction: false }}
            >
              <SwiperSlide>
                {/* item one */}
                <div className='row testimonial-panel position-relative z-2 tw-mb-8'>
                  <div className='col-xl-12'>
                    <div className='bg-white tw-rounded-2xl tw-p-2'>
                      <div className='testimonial-wrapper bg-neutral-400 d-flex align-items-center tw-gap-16 tw-p-10'>
                        <div className='testimonial-thumb position-relative z-1'>
                          <Image
                            width={253}
                            height={314}
                            className='tw-rounded-lg'
                            src='/assets/images/thumbs/testimonial-img1.jpg'
                            alt='Image'
                          />
                          <div className='position-absolute start-0 top-0 tw-mt-3 tw-ms-3'>
                            <span className='tw-w-16 tw-h-16 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-9 text-main-600'>
                              <i className='ph ph-quotes' />
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className='testimonial-paragraph tw-mb-8'>
                            "Lumen was the perfect getaway for us. The natural
                            light and thoughtful design made it feel open and
                            inviting, and the details felt effortlessly
                            intentional. It’s a space we’d come back to in a
                            heartbeat."
                          </p>
                          <div className='d-flex justify-content-between flex-wrap row-gap-2'>
                            <div>
                              <h4 className='tw-text-3xl fw-normal'>
                                Piter Bowman
                              </h4>
                              <p className='font-heading fw-normal'>
                                Creative Director
                              </p>
                            </div>
                            <div className='testimonial-review d-flex align-items-center tw-gap-2 bg-white tw-rounded-3xl tw-px-8'>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {/* item two */}
                <div className='row testimonial-panel position-relative z-2 tw-mb-8'>
                  <div className='col-xl-12'>
                    <div className='bg-white tw-rounded-2xl tw-p-2'>
                      <div className='testimonial-wrapper bg-neutral-400 d-flex align-items-center tw-gap-16 tw-p-10'>
                        <div className='testimonial-thumb position-relative z-1'>
                          <Image
                            width={253}
                            height={314}
                            className='tw-rounded-lg'
                            src='/assets/images/thumbs/testimonial-img2.jpg'
                            alt='Image'
                          />
                          <div className='position-absolute start-0 top-0 tw-mt-3 tw-ms-3'>
                            <span className='tw-w-16 tw-h-16 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-9 text-main-600'>
                              <i className='ph ph-quotes' />
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className='testimonial-paragraph tw-mb-8'>
                            "Lumen was the perfect getaway for us. The natural
                            light and thoughtful design made it feel open and
                            inviting, and the details felt effortlessly
                            intentional. It’s a space we’d come back to in a
                            heartbeat."
                          </p>
                          <div className='d-flex justify-content-between flex-wrap row-gap-2'>
                            <div>
                              <h4 className='tw-text-3xl fw-normal'>
                                Piter Bowman
                              </h4>
                              <p className='font-heading fw-normal'>
                                Creative Director
                              </p>
                            </div>
                            <div className='testimonial-review d-flex align-items-center tw-gap-2 bg-white tw-rounded-3xl tw-px-8'>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {/* item three */}
                <div className='row testimonial-panel position-relative z-2 tw-mb-8'>
                  <div className='col-xl-12'>
                    <div className='bg-white tw-rounded-2xl tw-p-2'>
                      <div className='testimonial-wrapper bg-neutral-400 d-flex align-items-center tw-gap-16 tw-p-10'>
                        <div className='testimonial-thumb position-relative z-1'>
                          <Image
                            width={253}
                            height={314}
                            className='tw-rounded-lg'
                            src='/assets/images/thumbs/testimonial-img3.jpg'
                            alt='Image'
                          />
                          <div className='position-absolute start-0 top-0 tw-mt-3 tw-ms-3'>
                            <span className='tw-w-16 tw-h-16 lh-1 d-inline-flex justify-content-center align-items-center bg-white rounded-circle tw-text-9 text-main-600'>
                              <i className='ph ph-quotes' />
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className='testimonial-paragraph tw-mb-8'>
                            "Lumen was the perfect getaway for us. The natural
                            light and thoughtful design made it feel open and
                            inviting, and the details felt effortlessly
                            intentional. It’s a space we’d come back to in a
                            heartbeat."
                          </p>
                          <div className='d-flex justify-content-between flex-wrap row-gap-2'>
                            <div>
                              <h4 className='tw-text-3xl fw-normal'>
                                Piter Bowman
                              </h4>
                              <p className='font-heading fw-normal'>
                                Creative Director
                              </p>
                            </div>
                            <div className='testimonial-review d-flex align-items-center tw-gap-2 bg-white tw-rounded-3xl tw-px-8'>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                              <span className='tw-text-xl text-main-600 d-inline-block lh-1'>
                                <i className='ph ph-star' />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='text-center'>
              <Link
                className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
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
      <div className=''>
        <Image
          width={1920}
          height={338}
          className='testimonial-bg-shape position-absolute z-n1'
          src='/assets/images/shapes/testimonial-bg-shape.png'
          alt='shape'
        />
      </div>
    </section>
  );
};

export default TestimonialOne;
