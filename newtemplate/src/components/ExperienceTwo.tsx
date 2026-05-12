"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
const ExperienceTwo = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const experienceMultiplier = {
      translate: 0.1,
      rotate: 0.02,
    };

    // Init Swiper
    swiperRef.current = new Swiper(".experience-four-active", {
      slidesPerView: "auto",
      spaceBetween: 128,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      grabCursor: true,
      breakpoints: {
        320: { slidesPerView: 1 },
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2, spaceBetween: 80 },
        992: { slidesPerView: 2, spaceBetween: 120 },
        1200: { slidesPerView: 3, spaceBetween: 80 },
        1400: { slidesPerView: 3, spaceBetween: 128 },
      },
    });

    const calculateExperienceWheel = () => {
      const slides = document.querySelectorAll<HTMLElement>(
        ".experience-four-wrapper",
      );

      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);

        let ty =
          Math.abs(r) * experienceMultiplier.translate -
          rect.width * experienceMultiplier.translate;

        ty = Math.max(0, ty);

        const origin = r < 0 ? "left top" : "right top";

        slide.style.transform = `translate(0, ${ty}px) rotate(${
          -r * experienceMultiplier.rotate
        }deg)`;
        slide.style.transformOrigin = origin;
      });
    };

    const experienceRaf = () => {
      calculateExperienceWheel();
      rafRef.current = requestAnimationFrame(experienceRaf);
    };

    experienceRaf();

    return () => {
      // cleanup
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      swiperRef.current?.destroy(true, true);
    };
  }, []);
  return (
    <section className='experience-four-area bg-main-600 pb-120 position-relative z-1'>
      <div className='container tw-container-1650-px'>
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
        <div className='row'>
          <div className='col-xl-12'>
            <div className='swiper experience-four-active tw-pb-20 overflow-hidden position-relative z-1 tw_fade_anim'>
              <div className='swiper-wrapper d-flex'>
                {/* item 1 */}
                <div className='swiper-slide'>
                  <div className='experience-four-wrapper'>
                    <div className='experience-four-thumb position-relative'>
                      <Image
                        width={464}
                        height={448}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/experience-four-thumb1.jpg'
                        alt='Image'
                      />
                      <div className='position-absolute top-0 start-0 tw-mt-2 tw-ms-3'>
                        <span className='bg-white text-heading tw-rounded-3xl tw-py-1 te-text-sm text-capitalize fw-medium tw-px-4'>
                          rooftop dinner
                        </span>
                      </div>
                      <div className='experience-four-content d-flex justify-content-between align-items-end tw-rounded-lg bg-white tw-py-6 tw-px-7 tw-mx-3 flex-wrap row-gap-2'>
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
                            className='text-heading d-inline-flex align-items-center tw-gap-4'
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
                  </div>
                </div>
                {/* item 1 */}
                <div className='swiper-slide'>
                  <div className='experience-four-wrapper'>
                    <div className='experience-four-thumb position-relative'>
                      <Image
                        width={464}
                        height={448}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/experience-four-thumb2.jpg'
                        alt='Image'
                      />
                      <div className='position-absolute top-0 start-0 tw-mt-2 tw-ms-3'>
                        <span className='bg-white text-heading tw-rounded-3xl tw-py-1 te-text-sm text-capitalize fw-medium tw-px-4'>
                          rooftop dinner
                        </span>
                      </div>
                      <div className='experience-four-content d-flex justify-content-between align-items-end tw-rounded-lg bg-white tw-py-6 tw-px-7 tw-mx-3 flex-wrap row-gap-2'>
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
                            className='text-heading d-inline-flex align-items-center tw-gap-4'
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
                  </div>
                </div>
                {/* item 1 */}
                <div className='swiper-slide'>
                  <div className='experience-four-wrapper'>
                    <div className='experience-four-thumb position-relative'>
                      <Image
                        width={465}
                        height={449}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/experience-four-thumb3.jpg'
                        alt='Image'
                      />
                      <div className='position-absolute top-0 start-0 tw-mt-2 tw-ms-3'>
                        <span className='bg-white text-heading tw-rounded-3xl tw-py-1 te-text-sm text-capitalize fw-medium tw-px-4'>
                          rooftop dinner
                        </span>
                      </div>
                      <div className='experience-four-content d-flex justify-content-between align-items-end tw-rounded-lg bg-white tw-py-6 tw-px-7 tw-mx-3 flex-wrap row-gap-2'>
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
                            className='text-heading d-inline-flex align-items-center tw-gap-4'
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
                  </div>
                </div>
                <div className='swiper-slide'>
                  <div className='experience-four-wrapper'>
                    <div className='experience-four-thumb position-relative'>
                      <Image
                        width={464}
                        height={448}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/experience-four-thumb1.jpg'
                        alt='Image'
                      />
                      <div className='position-absolute top-0 start-0 tw-mt-2 tw-ms-3'>
                        <span className='bg-white text-heading tw-rounded-3xl tw-py-1 te-text-sm text-capitalize fw-medium tw-px-4'>
                          rooftop dinner
                        </span>
                      </div>
                      <div className='experience-four-content d-flex justify-content-between align-items-end tw-rounded-lg bg-white tw-py-6 tw-px-7 tw-mx-3 flex-wrap row-gap-2'>
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
                            className='text-heading d-inline-flex align-items-center tw-gap-4'
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

export default ExperienceTwo;
