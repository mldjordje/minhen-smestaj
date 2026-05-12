"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef } from "react";
import Swiper from "swiper";
const DiscoverOne: FC = () => {
  const swiperRef = useRef<Swiper | null>(null);
  useEffect(() => {
    swiperRef.current = new Swiper(".gallery-two-active", {
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      speed: 3000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 1 },
        768: { slidesPerView: 1.7 },
        992: { slidesPerView: 2.2 },
        1200: { slidesPerView: 2.5 },
        1400: { slidesPerView: 3.2 },
        1600: { slidesPerView: 3.5 },
      },
    });

    return () => {
      swiperRef.current?.destroy(true, true);
    };
  }, []);
  return (
    <section className='pb-120 discover_one'>
      <div className='container'>
        <div className='row justify-content-between align-items-center'>
          <div className='col-xl-8 col-lg-8'>
            <div
              className='section-two-wrapper tw-mb-14 tw_fade_anim'
              data-delay='.3'
            >
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                Discover Beauty Through Our Lens
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                Moments Captured By Team Explore Our Gallery Seen
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
                href='/gallery'
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
      <div className='container-fluid gx-5'>
        <div className='row align-items-center'>
          <div className='gallery-two-slider tw_fade_anim' data-delay='.5'>
            <div className='gallery-two-active swiper-container'>
              <div className='swiper-wrapper d-flex align-items-center'>
                {/* slide 1 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={441}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb1.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 2 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={509}
                        height={569}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb2.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 3 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={441}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb3.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 4 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={568}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb4.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 5 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={441}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb1.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 6 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={509}
                        height={569}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb2.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 1 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={441}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb3.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 2 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={568}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb4.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 3 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={441}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb1.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 4 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={509}
                        height={569}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb2.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 5 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={441}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb3.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* slide 6 */}
                <div className='gallery-two-wrapper swiper-slide'>
                  <div className='gallery-two-thumb position-relative z-1'>
                    <Link href='/gallery'>
                      <Image
                        width={510}
                        height={568}
                        className='tw-rounded-xl'
                        src='/assets/images/thumbs/gallery-two-thumb4.jpg'
                        alt='thumb'
                      />
                    </Link>
                    <div className='gallery-two-content d-flex justify-content-between flex-wrap row-gap-3 align-items-center bg-white tw-rounded-2xl tw-py-8 tw-px-10 position-absolute bottom-0 start-0 tw-mb-7 tw-mx-7'>
                      <div className='gallery-two-content-inner'>
                        <h4 className='tw-text-2xl fw-normal mb-0'>
                          <Link href='/gallery'>
                            {" "}
                            Guaranteed Quality <br /> Service
                          </Link>
                        </h4>
                      </div>
                      <div>
                        <Link
                          className='tw-w-120 tw-h-120 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-heading hover-bg-neutral-100 hover-text-heading'
                          href='/gallery'
                        >
                          <i className='ph ph-arrow-up-right' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverOne;
