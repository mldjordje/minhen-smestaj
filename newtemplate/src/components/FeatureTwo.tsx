"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface FeatureMultiplier {
  translate: number;
  rotate: number;
}

const FeatureTwo: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const animationRef = useRef<number | null>(null);

  const featureMultiplier: FeatureMultiplier = {
    translate: 0.1,
    rotate: 0.03,
  };

  useEffect(() => {
    // Initialize Swiper
    if (swiperRef.current) {
      // Calculate wheel effect on mount
      calculateFeatureWheel();
      // Start animation loop
      featureRaf();
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const calculateFeatureWheel = () => {
    const slides = document.querySelectorAll(
      ".feature-two-active .swiper-slide",
    );
    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
      let ty =
        Math.abs(r) * featureMultiplier.translate -
        rect.width * featureMultiplier.translate;
      ty = Math.max(0, ty);
      const origin = r < 0 ? "left top" : "right top";

      (slide as HTMLElement).style.transform = `translateY(${ty}px) rotate(${
        -r * featureMultiplier.rotate
      }deg)`;
      (slide as HTMLElement).style.transformOrigin = origin;
    });
  };

  const featureRaf = () => {
    calculateFeatureWheel();
    animationRef.current = requestAnimationFrame(featureRaf);
  };
  return (
    <section className='feature-two-area bg-main-600 position-relative z-1'>
      <div className='container-fluid '>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='swiper feature-two-active tw-pb-20 overflow-hidden position-relative z-1 tw_fade_anim'>
              <div className='swiper-wrapper d-flex'>
                <Swiper
                  className='feature-two-active'
                  //   modules={[Autoplay]}
                  slidesPerView='auto'
                  spaceBetween={100}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  grabCursor={true}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    576: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    992: {
                      slidesPerView: 2,
                      spaceBetween: 100,
                    },
                    1200: {
                      slidesPerView: 5,
                      spaceBetween: 100,
                    },
                    1400: {
                      slidesPerView: 5,
                      spaceBetween: 80,
                    },
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={() => {
                    calculateFeatureWheel();
                  }}
                  onResize={() => {
                    calculateFeatureWheel();
                  }}
                >
                  <SwiperSlide>
                    {/* item 1 */}
                    <div className='swiper-slide'>
                      <div className='feature-two-wrapper tw-rounded-lg border border-main-600 tw-pt-11 tw-ps-8 tw-pe-8 tw-pb-9'>
                        <div className='tw-mb-8'>
                          <span className='tw-w-26 tw-h-26 lh-1 d-inline-flex align-items-center justify-content-center bg-white rounded-circle'>
                            <Image
                              width={59}
                              height={63}
                              src='/assets/images/icons/feature-two-icon1.svg'
                              alt='icon'
                            />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-7 fw-normal tw-mb-4'>
                            <Link href='/destination-details'>
                              24/7 Concierge &amp; Butler Service
                            </Link>
                          </h4>
                          <p className='tw-text-lg tw-mb-4'>
                            We offer dental services at highly innovative level,
                            with innovative
                          </p>
                          <div>
                            <Link
                              className='tw-w-12 tw-h-12 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                              href='/destination-details'
                            >
                              <i className='ph ph-arrow-up-right' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {/* item 2 */}
                    <div className='swiper-slide'>
                      <div className='feature-two-wrapper tw-rounded-lg border border-main-600 tw-pt-11 tw-ps-8 tw-pe-8 tw-pb-9'>
                        <div className='tw-mb-8'>
                          <span className='tw-w-26 tw-h-26 lh-1 d-inline-flex align-items-center justify-content-center bg-white rounded-circle'>
                            <Image
                              width={65}
                              height={65}
                              src='/assets/images/icons/feature-two-icon2.svg'
                              alt='icon'
                            />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-7 fw-normal tw-mb-4'>
                            <Link href='/destination-details'>
                              Smart Room <br /> Control
                            </Link>
                          </h4>
                          <p className='tw-text-lg tw-mb-4'>
                            We offer dental services at highly innovative level,
                            with innovative
                          </p>
                          <div>
                            <Link
                              className='tw-w-12 tw-h-12 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                              href='/destination-details'
                            >
                              <i className='ph ph-arrow-up-right' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    {/* item 3 */}
                    <div className='swiper-slide'>
                      <div className='feature-two-wrapper tw-rounded-lg border border-main-600 tw-pt-11 tw-ps-8 tw-pe-8 tw-pb-9'>
                        <div className='tw-mb-8'>
                          <span className='tw-w-26 tw-h-26 lh-1 d-inline-flex align-items-center justify-content-center bg-white rounded-circle'>
                            <Image
                              width={60}
                              height={62}
                              src='/assets/images/icons/feature-two-icon3.svg'
                              alt='icon'
                            />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-7 fw-normal tw-mb-4'>
                            <Link href='/destination-details'>
                              Luxury Airport Transfer
                            </Link>
                          </h4>
                          <p className='tw-text-lg tw-mb-4'>
                            We offer dental services at highly innovative level,
                            with innovative
                          </p>
                          <div>
                            <Link
                              className='tw-w-12 tw-h-12 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                              href='/destination-details'
                            >
                              <i className='ph ph-arrow-up-right' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {/* item 4 */}
                    <div className='swiper-slide'>
                      <div className='feature-two-wrapper tw-rounded-lg border border-main-600 tw-pt-11 tw-ps-8 tw-pe-8 tw-pb-9'>
                        <div className='tw-mb-8'>
                          <span className='tw-w-26 tw-h-26 lh-1 d-inline-flex align-items-center justify-content-center bg-white rounded-circle'>
                            <Image
                              width={64}
                              height={68}
                              src='/assets/images/icons/feature-two-icon4.svg'
                              alt='icon'
                            />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-7 fw-normal tw-mb-4'>
                            <Link href='/destination-details'>
                              Smart Room <br /> Control
                            </Link>
                          </h4>
                          <p className='tw-text-lg tw-mb-4'>
                            We offer dental services at highly innovative level,
                            with innovative
                          </p>
                          <div>
                            <Link
                              className='tw-w-12 tw-h-12 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                              href='/destination-details'
                            >
                              <i className='ph ph-arrow-up-right' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {/* item 5 */}
                    <div className='swiper-slide'>
                      <div className='feature-two-wrapper tw-rounded-lg border border-main-600 tw-pt-11 tw-ps-8 tw-pe-8 tw-pb-9'>
                        <div className='tw-mb-8'>
                          <span className='tw-w-26 tw-h-26 lh-1 d-inline-flex align-items-center justify-content-center bg-white rounded-circle'>
                            <Image
                              width={60}
                              height={62}
                              src='/assets/images/icons/feature-two-icon5.svg'
                              alt='icon'
                            />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-7 fw-normal tw-mb-4'>
                            <Link href='/destination-details'>
                              Luxury Airport Transfer
                            </Link>
                          </h4>
                          <p className='tw-text-lg tw-mb-4'>
                            We offer dental services at highly innovative level,
                            with innovative
                          </p>
                          <div>
                            <Link
                              className='tw-w-12 tw-h-12 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                              href='/destination-details'
                            >
                              <i className='ph ph-arrow-up-right' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {/* item 1 */}
                    <div className='swiper-slide'>
                      <div className='feature-two-wrapper tw-rounded-lg border border-main-600 tw-pt-11 tw-ps-8 tw-pe-8 tw-pb-9'>
                        <div className='tw-mb-8'>
                          <span className='tw-w-26 tw-h-26 lh-1 d-inline-flex align-items-center justify-content-center bg-white rounded-circle'>
                            <Image
                              width={59}
                              height={63}
                              src='/assets/images/icons/feature-two-icon1.svg'
                              alt='icon'
                            />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-7 fw-normal tw-mb-4'>
                            <Link href='/destination-details'>
                              24/7 Concierge &amp; Butler Service
                            </Link>
                          </h4>
                          <p className='tw-text-lg tw-mb-4'>
                            We offer dental services at highly innovative level,
                            with innovative
                          </p>
                          <div>
                            <Link
                              className='tw-w-12 tw-h-12 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                              href='/destination-details'
                            >
                              <i className='ph ph-arrow-up-right' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {/* item 2 */}
                    <div className='swiper-slide'>
                      <div className='feature-two-wrapper tw-rounded-lg border border-main-600 tw-pt-11 tw-ps-8 tw-pe-8 tw-pb-9'>
                        <div className='tw-mb-8'>
                          <span className='tw-w-26 tw-h-26 lh-1 d-inline-flex align-items-center justify-content-center bg-white rounded-circle'>
                            <Image
                              width={65}
                              height={65}
                              src='/assets/images/icons/feature-two-icon2.svg'
                              alt='icon'
                            />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-7 fw-normal tw-mb-4'>
                            <Link href='/destination-details'>
                              Smart Room <br /> Control
                            </Link>
                          </h4>
                          <p className='tw-text-lg tw-mb-4'>
                            We offer dental services at highly innovative level,
                            with innovative
                          </p>
                          <div>
                            <Link
                              className='tw-w-12 tw-h-12 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                              href='/destination-details'
                            >
                              <i className='ph ph-arrow-up-right' />
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
        </div>
        <div className='row justify-content-center'>
          <div className='col-xl-7'>
            <div className='feature-two-title-wrap tw_fade_anim'>
              <div className='cursor-content tp-cursor-point-area pt-120 tw-pb-18'>
                <h2 className='cursor-text text-center tw-text-17 fw-normal'>
                  Our hotel offers a range of premium amenities designed to
                  elevate your stay. Enjoy our state of-the-art fitness center..
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureTwo;
