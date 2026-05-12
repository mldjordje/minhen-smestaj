"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { FC } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const ClientTwo: FC = () => {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    Swiper.use([Pagination, Autoplay]); // ⬅️ MUST

    swiperRef.current = new Swiper(".testimonial-two-active", {
      slidesPerView: 2,
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
        768: { slidesPerView: 1 },
        992: { slidesPerView: 2 },
        1200: { slidesPerView: 2 },
      },
      pagination: {
        el: ".testimonial-two-dots",
        clickable: true,
      },
    });

    return () => swiperRef.current?.destroy(true, true);
  }, []);
  return (
    <section className='tw-pt-20 pb-120 client_two'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-9'>
            <div className='section-two-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                Stories of Unforgettable Experiences
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                Our Guests Consistently Praise The Service And Warm
                Hospitality{" "}
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='testimonial-two-slider position-relative z-1 tw_fade_anim'>
            <div className='testimonial-two-active swiper-container'>
              <div className='swiper-wrapper d-flex align-items-center'>
                {/* slide 1 */}
                <div className='testimonial-two-wrapper tw-rounded-xl border tw-pt-17 tw-ps-11 tw-pe-13 tw-pb-9 border-main-600 swiper-slide'>
                  <div className='testimonial-two-review tw-mb-6'>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                  </div>
                  <div>
                    <p className='testimonial-two-paragraph font-heading fw-normal text-heading tw-pb-8 tw-mb-8'>
                      “Cleaning hires great people from a widely variety of
                      backgrounds, which simply makes our compan stronger, and
                      we couldn’t be prouder of that. elevating your optimizing
                      Business Growth.”
                    </p>
                  </div>
                  <div className='d-flex align-items-center tw-gap-6'>
                    <div>
                      <Image
                        width={70}
                        height={70}
                        className='tw-w-21 tw-h-21 rounded-circle'
                        src='/assets/images/thumbs/testimonial-img-1.png'
                        alt='thumb'
                      />
                    </div>
                    <div>
                      <h4 className='tw-text-505 fw-normal tw-mb-1'>
                        James anderson
                      </h4>
                      <p className='mb-0 font-heading fw-normal tw-text-sm'>
                        Ceo and Founder
                      </p>
                    </div>
                  </div>
                </div>
                {/* slide 2 */}
                <div className='testimonial-two-wrapper tw-rounded-xl border tw-pt-17 tw-ps-11 tw-pe-13 tw-pb-9 border-main-600 swiper-slide'>
                  <div className='testimonial-two-review tw-mb-6'>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                  </div>
                  <div>
                    <p className='testimonial-two-paragraph font-heading fw-normal text-heading tw-pb-8 tw-mb-8'>
                      “Cleaning hires great people from a widely variety of
                      backgrounds, which simply makes our compan stronger, and
                      we couldn’t be prouder of that. elevating your optimizing
                      Business Growth.”
                    </p>
                  </div>
                  <div className='d-flex align-items-center tw-gap-6'>
                    <div>
                      <Image
                        width={70}
                        height={70}
                        className='tw-w-21 tw-h-21 rounded-circle'
                        src='/assets/images/thumbs/testimonial-img-2.png'
                        alt='thumb'
                      />
                    </div>
                    <div>
                      <h4 className='tw-text-505 fw-normal tw-mb-1'>
                        James anderson
                      </h4>
                      <p className='mb-0 font-heading fw-normal tw-text-sm'>
                        Ceo and Founder
                      </p>
                    </div>
                  </div>
                </div>
                {/* slide 3 */}
                <div className='testimonial-two-wrapper tw-rounded-xl border tw-pt-17 tw-ps-11 tw-pe-13 tw-pb-9 border-main-600 swiper-slide'>
                  <div className='testimonial-two-review tw-mb-6'>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                    <span className='text-main-600 tw-text-lg'>
                      <i className='ph ph-star' />
                    </span>
                  </div>
                  <div>
                    <p className='testimonial-two-paragraph font-heading fw-normal text-heading tw-pb-8 tw-mb-8'>
                      “Cleaning hires great people from a widely variety of
                      backgrounds, which simply makes our compan stronger, and
                      we couldn’t be prouder of that. elevating your optimizing
                      Business Growth.”
                    </p>
                  </div>
                  <div className='d-flex align-items-center tw-gap-6'>
                    <div>
                      <Image
                        width={70}
                        height={70}
                        className='tw-w-21 tw-h-21 rounded-circle'
                        src='/assets/images/thumbs/testimonial-img-1.png'
                        alt='thumb'
                      />
                    </div>
                    <div>
                      <h4 className='tw-text-505 fw-normal tw-mb-1'>
                        James anderson
                      </h4>
                      <p className='mb-0 font-heading fw-normal tw-text-sm'>
                        Ceo and Founder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='testimonial-two-dots text-center dots-color tw-mt-10'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTwo;
