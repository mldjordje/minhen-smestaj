"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const BlogTwo: FC = () => {
  return (
    <section className='blog-two-area two blog-panel-area pb-120'>
      <div className='container'>
        <div className='row justify-content-between align-items-center'>
          <div className='col-xl-8 col-lg-8'>
            <div
              className='section-two-wrapper tw-mb-14 tw_fade_anim'
              data-delay='.3'
            >
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                Stories from Our World
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                From Our Journal: Travel Tips, Stories &amp; More
              </h2>
            </div>
          </div>
          <div className='col-xl-3 col-lg-4'>
            <div
              className='gallery-two-btn d-flex justify-content-end tw_fade_anim'
              data-delay='.5'
            >
              <Link
                className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                href='/blog-details'
              >
                Booking today{" "}
                <span className='d-inline-block lh-1 tw-text-lg'>
                  <i className='ph ph-arrow-up-right' />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className='row gx-0'>
          <div className='col-xl-12'>
            <Swiper
              className='service-active'
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              speed={5000}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
            >
              <SwiperSlide>
                {/* item one */}
                <div className='row gx-0 blog-panel tw-mb-8'>
                  <div className='col-xl-12'>
                    <div className='blog-two-wrapper tw-rounded-xl d-flex align-items-center justify-content-between tw-p-2'>
                      <div className='blog-two-content'>
                        <div className='blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6'>
                          <span className='bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading'>
                            02 Apr 2021
                          </span>
                          <span className='text-heading'>Comments (03)</span>
                        </div>
                        <h4 className='blog-two-title tw-text-9 text-capitalize fw-normal tw-mb-9'>
                          <Link
                            className='hover-text-secondary'
                            href='/blog-details'
                          >
                            eal stories from the road where every journey leaves
                            a mark
                          </Link>
                        </h4>
                        <div className='blog-two-button'>
                          <Link
                            className='blog-btn text-black fw-medium d-inline-flex align-items-center tw-gap-4'
                            href='/blog-details'
                          >
                            Read More{" "}
                            <span className='tw-w-8 tw-h-8 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading tw-text-sm border border-neutral tw-transition'>
                              <i className='ph ph-arrow-right' />
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className='blog-two-thumb'>
                        <Link href='/blog-details'>
                          <Image
                            width={473}
                            height={319}
                            className='tw-rounded-lg'
                            src='/assets/images/thumbs/blog-two-thumb1.jpg'
                            alt='thumb'
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {/* item two */}
                <div className='row gx-0 blog-panel tw-mb-8'>
                  <div className='col-xl-12'>
                    <div className='blog-two-wrapper tw-rounded-xl d-flex align-items-center justify-content-between tw-p-2'>
                      <div className='blog-two-content'>
                        <div className='blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6'>
                          <span className='bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading'>
                            02 Apr 2021
                          </span>
                          <span className='text-heading'>Comments (03)</span>
                        </div>
                        <h4 className='blog-two-title tw-text-9 text-capitalize fw-normal tw-mb-9'>
                          <Link
                            className='hover-text-secondary'
                            href='/blog-details'
                          >
                            Explore places that deserve a spot on your bucket
                            list.
                          </Link>
                        </h4>
                        <div className='blog-two-button'>
                          <Link
                            className='blog-btn text-black fw-medium d-inline-flex align-items-center tw-gap-4'
                            href='/blog-details'
                          >
                            Read More{" "}
                            <span className='tw-w-8 tw-h-8 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading tw-text-sm border border-neutral tw-transition'>
                              <i className='ph ph-arrow-right' />
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className='blog-two-thumb'>
                        <Link href='/blog-details'>
                          <Image
                            width={473}
                            height={319}
                            className='tw-rounded-lg'
                            src='/assets/images/thumbs/blog-two-thumb2.jpg'
                            alt='thumb'
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {/* item three */}
                <div className='row gx-0 blog-panel tw-mb-8'>
                  <div className='col-xl-12'>
                    <div className='blog-two-wrapper tw-rounded-xl d-flex align-items-center justify-content-between tw-p-2'>
                      <div className='blog-two-content'>
                        <div className='blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6'>
                          <span className='bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading'>
                            02 Apr 2021
                          </span>
                          <span className='text-heading'>Comments (03)</span>
                        </div>
                        <h4 className='blog-two-title tw-text-9 text-capitalize fw-normal tw-mb-9'>
                          <Link
                            className='hover-text-secondary'
                            href='/blog-details'
                          >
                            Everything you need to travel smarter safer, and
                            happier.
                          </Link>
                        </h4>
                        <div className='blog-two-button'>
                          <Link
                            className='blog-btn text-black fw-medium d-inline-flex align-items-center tw-gap-4'
                            href='/blog-details'
                          >
                            Read More{" "}
                            <span className='tw-w-8 tw-h-8 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading tw-text-sm border border-neutral tw-transition'>
                              <i className='ph ph-arrow-right' />
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className='blog-two-thumb'>
                        <Link href='/blog-details'>
                          <Image
                            width={473}
                            height={319}
                            className='tw-rounded-lg'
                            src='/assets/images/thumbs/blog-two-thumb3.jpg'
                            alt='thumb'
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogTwo;
