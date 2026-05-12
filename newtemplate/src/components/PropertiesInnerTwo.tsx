"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef } from "react";
import Swiper from "swiper";
const PropertiesInnerTwo: FC = () => {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".service-three-active", {
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
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
        1400: { slidesPerView: 5 },
      },
    });

    return () => {
      swiperRef.current?.destroy(true, true);
    };
  }, []);
  return (
    <section className='pb-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-8'>
            <div className='section-two-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-main-three-600 tw-mb-6'>
                Find unique homes in vibrant places.
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                Beachfront Rooms Designed For Ultimate Comfort Feel
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='service-three-slider tw_fade_anim'>
              <div className='service-three-active swiper-container'>
                <div className='swiper-wrapper'>
                  {/* slide 1 */}
                  <div className='service-three-wrapper swiper-slide'>
                    <div className='position-relative z-1'>
                      <Link href='/service-details'>
                        <Image
                          width={300}
                          height={336}
                          className='tw-rounded-xl'
                          src='/assets/images/thumbs/service-three-thumb1.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div
                        className='position-absolute start-0 top-0 tw-mt-2 tw-ms-2 tw-rounded-3xl tw-px-3'
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <p className='d-inline-flex tw-text-sm fw-bold text-white tw-gap-1 mb-0'>
                          <span>
                            <i className='ph-bold ph-star' />
                          </span>{" "}
                          4,93
                        </p>
                      </div>
                      <div className='position-absolute top-0 end-0 tw-mt-2 tw-me-2'>
                        <span className='text-white tw-text-2xl'>
                          <i className='ph ph-heart' />
                        </span>
                      </div>
                    </div>
                    <div className='service-three-content d-flex align-items-center justify-content-between'>
                      <div>
                        <h4>
                          <Link
                            className='tw-text-lg fw-normal tw-mb-2'
                            href='/service-details'
                          >
                            Villa, Kuta Premiere
                          </Link>
                        </h4>
                        <div>
                          <ul className='d-flex tw-gap-5'>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              5 bedrooms
                            </li>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon2.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              214m2
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6
                          className='tw-text-lg fw-normal'
                          style={{ color: "#C49C74" }}
                        >
                          $ 990
                        </h6>
                        <p className='tw-text-xs'>per month</p>
                      </div>
                    </div>
                  </div>
                  {/* slide 2 */}
                  <div className='service-three-wrapper swiper-slide'>
                    <div className='position-relative z-1'>
                      <Link href='/service-details'>
                        <Image
                          width={300}
                          height={336}
                          className='tw-rounded-xl'
                          src='/assets/images/thumbs/service-three-thumb2.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div
                        className='position-absolute start-0 top-0 tw-mt-2 tw-ms-2 tw-rounded-3xl tw-px-3'
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <p className='d-inline-flex tw-text-sm fw-bold text-white tw-gap-1 mb-0'>
                          <span>
                            <i className='ph-bold ph-star' />
                          </span>{" "}
                          4,93
                        </p>
                      </div>
                      <div className='position-absolute top-0 end-0 tw-mt-2 tw-me-2'>
                        <span className='text-white tw-text-2xl'>
                          <i className='ph ph-heart' />
                        </span>
                      </div>
                    </div>
                    <div className='service-three-content d-flex align-items-center justify-content-between'>
                      <div>
                        <h4>
                          <Link
                            className='tw-text-lg fw-normal tw-mb-2'
                            href='/service-details'
                          >
                            Villa, Kuta Premiere
                          </Link>
                        </h4>
                        <div>
                          <ul className='d-flex tw-gap-5'>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              5 bedrooms
                            </li>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon2.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              214m2
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6
                          className='tw-text-lg fw-normal'
                          style={{ color: "#C49C74" }}
                        >
                          $ 990
                        </h6>
                        <p className='tw-text-xs'>per month</p>
                      </div>
                    </div>
                  </div>
                  {/* slide 3 */}
                  <div className='service-three-wrapper swiper-slide'>
                    <div className='position-relative z-1'>
                      <Link href='/service-details'>
                        <Image
                          width={300}
                          height={336}
                          className='tw-rounded-xl'
                          src='/assets/images/thumbs/service-three-thumb3.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div
                        className='position-absolute start-0 top-0 tw-mt-2 tw-ms-2 tw-rounded-3xl tw-px-3'
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <p className='d-inline-flex tw-text-sm fw-bold text-white tw-gap-1 mb-0'>
                          <span>
                            <i className='ph-bold ph-star' />
                          </span>{" "}
                          4,93
                        </p>
                      </div>
                      <div className='position-absolute top-0 end-0 tw-mt-2 tw-me-2'>
                        <span className='text-white tw-text-2xl'>
                          <i className='ph ph-heart' />
                        </span>
                      </div>
                    </div>
                    <div className='service-three-content d-flex align-items-center justify-content-between'>
                      <div>
                        <h4>
                          <Link
                            className='tw-text-lg fw-normal tw-mb-2'
                            href='/service-details'
                          >
                            Villa, Kuta Premiere
                          </Link>
                        </h4>
                        <div>
                          <ul className='d-flex tw-gap-5'>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              5 bedrooms
                            </li>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon2.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              214m2
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6
                          className='tw-text-lg fw-normal'
                          style={{ color: "#C49C74" }}
                        >
                          $ 990
                        </h6>
                        <p className='tw-text-xs'>per month</p>
                      </div>
                    </div>
                  </div>
                  {/* slide 4 */}
                  <div className='service-three-wrapper swiper-slide'>
                    <div className='position-relative z-1'>
                      <Link href='/service-details'>
                        <Image
                          width={300}
                          height={336}
                          className='tw-rounded-xl'
                          src='/assets/images/thumbs/service-three-thumb4.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div
                        className='position-absolute start-0 top-0 tw-mt-2 tw-ms-2 tw-rounded-3xl tw-px-3'
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <p className='d-inline-flex tw-text-sm fw-bold text-white tw-gap-1 mb-0'>
                          <span>
                            <i className='ph-bold ph-star' />
                          </span>{" "}
                          4,93
                        </p>
                      </div>
                      <div className='position-absolute top-0 end-0 tw-mt-2 tw-me-2'>
                        <span className='text-white tw-text-2xl'>
                          <i className='ph ph-heart' />
                        </span>
                      </div>
                    </div>
                    <div className='service-three-content d-flex align-items-center justify-content-between'>
                      <div>
                        <h4>
                          <Link
                            className='tw-text-lg fw-normal tw-mb-2'
                            href='/service-details'
                          >
                            Villa, Kuta Premiere
                          </Link>
                        </h4>
                        <div>
                          <ul className='d-flex tw-gap-5'>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              5 bedrooms
                            </li>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon2.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              214m2
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6
                          className='tw-text-lg fw-normal'
                          style={{ color: "#C49C74" }}
                        >
                          $ 990
                        </h6>
                        <p className='tw-text-xs'>per month</p>
                      </div>
                    </div>
                  </div>
                  {/* slide 5 */}
                  <div className='service-three-wrapper swiper-slide'>
                    <div className='position-relative z-1'>
                      <Link href='/service-details'>
                        <Image
                          width={300}
                          height={336}
                          className='tw-rounded-xl'
                          src='/assets/images/thumbs/service-three-thumb5.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div
                        className='position-absolute start-0 top-0 tw-mt-2 tw-ms-2 tw-rounded-3xl tw-px-3'
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <p className='d-inline-flex tw-text-sm fw-bold text-white tw-gap-1 mb-0'>
                          <span>
                            <i className='ph-bold ph-star' />
                          </span>{" "}
                          4,93
                        </p>
                      </div>
                      <div className='position-absolute top-0 end-0 tw-mt-2 tw-me-2'>
                        <span className='text-white tw-text-2xl'>
                          <i className='ph ph-heart' />
                        </span>
                      </div>
                    </div>
                    <div className='service-three-content d-flex align-items-center justify-content-between'>
                      <div>
                        <h4>
                          <Link
                            className='tw-text-lg fw-normal tw-mb-2'
                            href='/service-details'
                          >
                            Villa, Kuta Premiere
                          </Link>
                        </h4>
                        <div>
                          <ul className='d-flex tw-gap-5'>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              5 bedrooms
                            </li>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon2.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              214m2
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6
                          className='tw-text-lg fw-normal'
                          style={{ color: "#C49C74" }}
                        >
                          $ 990
                        </h6>
                        <p className='tw-text-xs'>per month</p>
                      </div>
                    </div>
                  </div>
                  <div className='service-three-wrapper swiper-slide'>
                    <div className='position-relative z-1'>
                      <Link href='/service-details'>
                        <Image
                          width={300}
                          height={336}
                          className='tw-rounded-xl'
                          src='/assets/images/thumbs/service-three-thumb2.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div
                        className='position-absolute start-0 top-0 tw-mt-2 tw-ms-2 tw-rounded-3xl tw-px-3'
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <p className='d-inline-flex tw-text-sm fw-bold text-white tw-gap-1 mb-0'>
                          <span>
                            <i className='ph-bold ph-star' />
                          </span>{" "}
                          4,93
                        </p>
                      </div>
                      <div className='position-absolute top-0 end-0 tw-mt-2 tw-me-2'>
                        <span className='text-white tw-text-2xl'>
                          <i className='ph ph-heart' />
                        </span>
                      </div>
                    </div>
                    <div className='service-three-content d-flex align-items-center justify-content-between'>
                      <div>
                        <h4>
                          <Link
                            className='tw-text-lg fw-normal tw-mb-2'
                            href='/service-details'
                          >
                            Villa, Kuta Premiere
                          </Link>
                        </h4>
                        <div>
                          <ul className='d-flex tw-gap-5'>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              5 bedrooms
                            </li>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon2.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              214m2
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6
                          className='tw-text-lg fw-normal'
                          style={{ color: "#C49C74" }}
                        >
                          $ 990
                        </h6>
                        <p className='tw-text-xs'>per month</p>
                      </div>
                    </div>
                  </div>
                  {/* slide 3 */}
                  <div className='service-three-wrapper swiper-slide'>
                    <div className='position-relative z-1'>
                      <Link href='/service-details'>
                        <Image
                          width={300}
                          height={336}
                          className='tw-rounded-xl'
                          src='/assets/images/thumbs/service-three-thumb3.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div
                        className='position-absolute start-0 top-0 tw-mt-2 tw-ms-2 tw-rounded-3xl tw-px-3'
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <p className='d-inline-flex tw-text-sm fw-bold text-white tw-gap-1 mb-0'>
                          <span>
                            <i className='ph-bold ph-star' />
                          </span>{" "}
                          4,93
                        </p>
                      </div>
                      <div className='position-absolute top-0 end-0 tw-mt-2 tw-me-2'>
                        <span className='text-white tw-text-2xl'>
                          <i className='ph ph-heart' />
                        </span>
                      </div>
                    </div>
                    <div className='service-three-content d-flex align-items-center justify-content-between'>
                      <div>
                        <h4>
                          <Link
                            className='tw-text-lg fw-normal tw-mb-2'
                            href='/service-details'
                          >
                            Villa, Kuta Premiere
                          </Link>
                        </h4>
                        <div>
                          <ul className='d-flex tw-gap-5'>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              5 bedrooms
                            </li>
                            <li className='d-inline-flex align-items-center tw-gap-2 tw-text-sm fw-normal'>
                              <span className='lh-1'>
                                <Image
                                  width={22}
                                  height={22}
                                  src='/assets/images/icons/service-three-icon2.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              214m2
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6
                          className='tw-text-lg fw-normal'
                          style={{ color: "#C49C74" }}
                        >
                          $ 990
                        </h6>
                        <p className='tw-text-xs'>per month</p>
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

export default PropertiesInnerTwo;
