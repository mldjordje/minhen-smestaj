"use client";

import { Knob, ProgressBar } from "@/helper/Knob";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

const RoomDetailsInner: FC = () => {
  useEffect(() => {
    const slider = new Swiper(".room-details-active", {
      modules: [Navigation, Autoplay],
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      speed: 2500,
      autoplay: true,

      breakpoints: {
        1200: { slidesPerView: 3 },
        992: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        576: { slidesPerView: 1 },
        0: { slidesPerView: 1 },
      },

      navigation: {
        nextEl: ".slider-next",
        prevEl: ".slider-prev",
      },
    });

    return () => {
      slider.destroy(true, true);
    };
  }, []);
  return (
    <>
      <div className='tw-pb-22 pt-60 bg_2'>
        <div className='container-fluid gx-0'>
          <div className='row gx-0'>
            <div className='col-xxl-12'>
              <div className='room-details-slide position-relative z-index-1'>
                <div className='room-details-active swiper-container'>
                  <div className='room-details-swiper-wrapper swiper-wrapper'>
                    {/* slide 1 */}
                    <div className='position-relative z-index-1 swiper-slide'>
                      <div>
                        <Image
                          width={615}
                          height={542}
                          className='tw-h-542-px'
                          src='/assets/images/thumbs/room-details-thumb1.jpg'
                          alt='room'
                        />
                      </div>
                    </div>
                    {/* slide 2 */}
                    <div className='position-relative z-index-1 swiper-slide'>
                      <div>
                        <Image
                          width={631}
                          height={542}
                          className='tw-h-542-px'
                          src='/assets/images/thumbs/room-details-thumb2.jpg'
                          alt='room'
                        />
                      </div>
                    </div>
                    {/* slide 3 */}
                    <div className='position-relative z-index-1 swiper-slide'>
                      <div>
                        <Image
                          width={614}
                          height={542}
                          className='tw-h-542-px'
                          src='/assets/images/thumbs/room-details-thumb3.jpg'
                          alt='room'
                        />
                      </div>
                    </div>
                    {/* slide 1 */}
                    <div className='position-relative z-index-1 swiper-slide'>
                      <div>
                        <Image
                          width={615}
                          height={542}
                          className='tw-h-542-px'
                          src='/assets/images/thumbs/room-details-thumb1.jpg'
                          alt='room'
                        />
                      </div>
                    </div>
                    {/* slide 2 */}
                    <div className='position-relative z-index-1 swiper-slide'>
                      <div>
                        <Image
                          width={631}
                          height={542}
                          className='tw-h-542-px'
                          src='/assets/images/thumbs/room-details-thumb2.jpg'
                          alt='room'
                        />
                      </div>
                    </div>
                    {/* slide 3 */}
                    <div className='position-relative z-index-1 swiper-slide'>
                      <div>
                        <Image
                          width={614}
                          height={542}
                          className='tw-h-542-px'
                          src='/assets/images/thumbs/room-details-thumb3.jpg'
                          alt='room'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='room-details-arrow-box'>
                  <button className='slider-prev'>
                    <i className='ph ph-arrow-left' />
                  </button>
                  <button className='slider-next'>
                    <i className='ph ph-arrow-right' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='page pt-140 bg_2'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='d-flex justify-content-between align-items-end tw-pb-9 tw-mb-10 flex-wrap row-gap-3 border-bottom border-neutral'>
                <div className='tw_fade_anim' data-delay='.3'>
                  <div className='tw-mb-2'>
                    <div>
                      <span className='bg-main-600 fw-normal tw-px-6 tw-rounded-md text-heading tw-py-1 '>
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className='tw-mb-8'>
                    <h2 className='room-details-title tw-text-20 fw-normal tw-char-animation'>
                      Skyline Retreat
                    </h2>
                  </div>
                  <div>
                    <ul className='d-flex tw-gap-6 flex-wrap row-gap-3'>
                      <li className='d-flex align-items-center tw-gap-3'>
                        <span className='d-inline-block lh-1 tw-text-xl text-main-600'>
                          <i className='ph ph-clock-countdown' />
                        </span>{" "}
                        2 Guests
                      </li>
                      <li className='d-flex align-items-center tw-gap-3'>
                        <span className='d-inline-block lh-1 tw-text-xl text-main-600'>
                          <i className='ph ph-user-plus' />
                        </span>{" "}
                        35 feets size
                      </li>
                      <li className='d-flex align-items-center tw-gap-3'>
                        <span className='d-inline-block lh-1 tw-text-xl text-main-600'>
                          <i className='ph ph-user' />
                        </span>{" "}
                        Connecting Rooms
                      </li>
                      <li className='d-flex align-items-center tw-gap-3'>
                        <span className='d-inline-block lh-1 tw-text-xl text-main-600'>
                          <i className='ph ph-user' />
                        </span>{" "}
                        1 king bed
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='tw_fade_anim' data-delay='.5'>
                  <div className='d-flex align-items-center tw-gap-4 tw-mb-3'>
                    <div>
                      <i className='text-main-600 ph-bold ph-star' />
                      <i className='text-main-600 ph-bold ph-star' />
                      <i className='text-main-600 ph-bold ph-star' />
                      <i className='text-main-600 ph-bold ph-star' />
                      <i className='text-main-600 ph-bold ph-star' />
                    </div>
                    <div>
                      <p className='text-heading mb-0'>(1 Review)</p>
                    </div>
                  </div>
                  <div className='d-flex align-items-center tw-gap-7'>
                    <h4 className='tw-text-808'>$130.00</h4>
                    <h5
                      className='tw-text-2xl fw-normal text-decoration-line-through'
                      style={{ color: "#7E8081" }}
                    >
                      $16000
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='room-details-area pb-120 bg_2'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-7'>
              <div>
                <div className='tw-mb-17 tw_fade_anim'>
                  <h4 className='tw-text-2xl fw-normal tw-mb-6'>
                    Description:
                  </h4>
                  <p className='font-heading fw-normal tw-lh-212'>
                    Description It is a long established fact that a reader will
                    be distrac by any websites look for ways mornings of spring
                    prevent AdBlock from blocking annoying ads. As a result,
                    we've focused on improving our funct so that we can overcome
                    these anti-ad blocking attempts. Of course, you can help us
                    continue improve our ad blocking ability by reporting any
                    time you run into a website that won't allow you to block
                    the readable content of a page when looking at its layout.
                    It is a long established fact
                  </p>
                </div>
                <div className='tw-mb-17 tw_fade_anim'>
                  <h4 className='tw-text-2xl fw-normal tw-mb-6'>
                    Advance Facilities:
                  </h4>
                  <p className='font-heading fw-normal tw-lh-212'>
                    Leave your guidebooks at home and dive into the local
                    cultures that make each destination so special. We’ll
                    connect you with our exclusive experiences. Each trip is
                    carefully crafted to let enjoy your vacation.
                  </p>
                </div>
                <div className='tw-mb-20 tw_fade_anim'>
                  <h4 className='tw-text-2xl fw-normal tw-mb-8'>
                    Included/Exclude
                  </h4>
                  <div className='d-flex tw-gap-23 flex-wrap'>
                    <div>
                      <ul className='d-flex flex-column'>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span className='tw-w-5 tw-h-5 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-white tw-text-sm'>
                            <i className='ph ph-check' />
                          </span>{" "}
                          Pick and Drop Services
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span className='tw-w-5 tw-h-5 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-white tw-text-sm'>
                            <i className='ph ph-check' />
                          </span>{" "}
                          1 Meal Per Day
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span className='tw-w-5 tw-h-5 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-white tw-text-sm'>
                            <i className='ph ph-check' />
                          </span>{" "}
                          Cruise Dinner &amp; Music Event
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span className='tw-w-5 tw-h-5 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-white tw-text-sm'>
                            <i className='ph ph-check' />
                          </span>{" "}
                          Visit 7 Best Places in the City With Group
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className='d-flex flex-column'>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span className='tw-w-5 tw-h-5 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-white tw-text-sm'>
                            <i className='ph ph-check' />
                          </span>{" "}
                          Driver Service Fee
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span className='tw-w-5 tw-h-5 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-white tw-text-sm'>
                            <i className='ph ph-check' />
                          </span>{" "}
                          Food &amp; Drinks
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span className='tw-w-5 tw-h-5 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-white tw-text-sm'>
                            <i className='ph ph-check' />
                          </span>{" "}
                          Room Service Fees
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span className='tw-w-5 tw-h-5 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle bg-main-600 text-white tw-text-sm'>
                            <i className='ph ph-check' />
                          </span>{" "}
                          Laundry Service
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='tw-mb-20 tw_fade_anim'>
                  <h4 className='tw-text-2xl fw-normal tw-mb-8'>
                    Tour Amenities
                  </h4>
                  <div className='d-flex tw-gap-23 flex-wrap'>
                    <div>
                      <ul className='d-flex flex-column'>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Air Conditioning
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Microwave
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Central Heating
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Washer
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className='d-flex flex-column'>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Laundry
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Outdoor Shower
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Swimming Pool
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Wifi
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className='d-flex flex-column'>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Window Covering
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Refrigerator
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Alarm System
                        </li>
                        <li className='d-inline-flex align-items-center tw-gap-5 tw-mb-5'>
                          <span>
                            <Image
                              width={16}
                              height={15}
                              src='/assets/images/icons/room-details-check-icon.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          Window Coverings
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='tw-mb-26 tw_fade_anim'>
                  <h2 className='tw-text-8 fw-normal tw-mb-10'>
                    Frequently ask Question:
                  </h2>
                  <div className='room-details-wrapper'>
                    <div className='accordion' id='general_faqaccordion'>
                      <div className='accordion-item room-details-accordion-item'>
                        <h2 className='accordion-header' id='order_one'>
                          <button
                            className='accordion-button room-details-accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#order__collapse_one'
                            aria-expanded='true'
                            aria-controls='order__collapse_one'
                          >
                            How to learn digital marketing?
                          </button>
                        </h2>
                        <div
                          id='order__collapse_one'
                          className='accordion-collapse collapse'
                          aria-labelledby='order_one'
                          data-bs-parent='#general_faqaccordion'
                        >
                          <div className='accordion-body room-details-accordion-body'>
                            <p>
                              Ne summo dictas pertinacia nam. Illum cetero
                              vocent ei vim, case regione signiferumque vim te.
                              Ex mea quem munere lobortis. Duis aute irure dolor
                              in reprehenderit in voluptate velit esse cillum.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='accordion-item room-details-accordion-item'>
                        <h2 className='accordion-header' id='order_two'>
                          <button
                            className='accordion-button room-details-accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#order__collapse_two'
                            aria-expanded='false'
                            aria-controls='order__collapse_two'
                          >
                            Can I use the demos made by Ewebot?
                          </button>
                        </h2>
                        <div
                          id='order__collapse_two'
                          className='accordion-collapse collapse show'
                          aria-labelledby='order_two'
                          data-bs-parent='#general_faqaccordion'
                        >
                          <div className='accordion-body room-details-accordion-body'>
                            <p>
                              Ne summo dictas pertinacia nam. Illum cetero
                              vocent ei vim, case regione signiferumque vim te.
                              Ex mea quem munere lobortis. Duis aute irure dolor
                              in reprehenderit in voluptate velit esse cillum.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='accordion-item room-details-accordion-item'>
                        <h2 className='accordion-header' id='order_three'>
                          <button
                            className='accordion-button collapsed room-details-accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#order__collapse_three'
                            aria-expanded='false'
                            aria-controls='order__collapse_three'
                          >
                            Why didn’t you showcase my submission?
                          </button>
                        </h2>
                        <div
                          id='order__collapse_three'
                          className='accordion-collapse collapse'
                          aria-labelledby='order_three'
                          data-bs-parent='#general_faqaccordion'
                        >
                          <div className='accordion-body room-details-accordion-body'>
                            <p>
                              Ne summo dictas pertinacia nam. Illum cetero
                              vocent ei vim, case regione signiferumque vim te.
                              Ex mea quem munere lobortis. Duis aute irure dolor
                              in reprehenderit in voluptate velit esse cillum.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='accordion-item room-details-accordion-item'>
                        <h2 className='accordion-header' id='order_four'>
                          <button
                            className='accordion-button collapsed room-details-accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#order__collapse_four'
                            aria-expanded='false'
                            aria-controls='order__collapse_four'
                          >
                            What everybody ought to know about digital
                            marketing?
                          </button>
                        </h2>
                        <div
                          id='order__collapse_four'
                          className='accordion-collapse collapse'
                          aria-labelledby='order_four'
                          data-bs-parent='#general_faqaccordion'
                        >
                          <div className='accordion-body room-details-accordion-body'>
                            <p>
                              Ne summo dictas pertinacia nam. Illum cetero
                              vocent ei vim, case regione signiferumque vim te.
                              Ex mea quem munere lobortis. Duis aute irure dolor
                              in reprehenderit in voluptate velit esse cillum.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='border border-neutral-200 tw-rounded-xl tw-ps-10 tw-pe-20 tw-py-12 tw-mb-20 tw_fade_anim'>
                  <h2 className='tw-text-8 fw-normal tw-mb-10'>
                    Customer Review
                  </h2>
                  <div className='d-flex tw-gap-16 row-gap-3'>
                    <div className='wt-skill-progress-item mb-60'>
                      <div className='fix'>
                        <Knob value={85} color='#fdce74' />
                      </div>
                    </div>
                    <div className='w-100'>
                      <div className='tw-mb-8'>
                        <div>
                          <div className='d-flex justify-content-between'>
                            <div>
                              <span className='d-block fw-bold tw-mb-2'>
                                Comfort
                              </span>
                              <span className='fw-medium tw-mb-3'>
                                Rating 4.8{" "}
                              </span>
                            </div>
                            <div className='d-flex align-items-center tw-gap-4'>
                              <div>
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star-half' />
                              </div>
                              <div>
                                <span className='fw-bold text-main-600'>
                                  5.0
                                </span>
                              </div>
                            </div>
                          </div>
                          <ProgressBar percentage={60} />
                        </div>
                      </div>
                      <div className='tw-mb-8'>
                        <div>
                          <div className='d-flex justify-content-between'>
                            <div>
                              <span className='d-block fw-bold tw-mb-2'>
                                Comfort
                              </span>
                              <span className='fw-medium tw-mb-3'>
                                Rating 4.8{" "}
                              </span>
                            </div>
                            <div className='d-flex align-items-center tw-gap-4'>
                              <div>
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star-half' />
                              </div>
                              <div>
                                <span className='fw-bold text-main-600'>
                                  5.0
                                </span>
                              </div>
                            </div>
                          </div>

                          <ProgressBar percentage={90} />
                        </div>
                      </div>
                      <div className='tw-mb-8'>
                        <div>
                          <div className='d-flex justify-content-between'>
                            <div>
                              <span className='d-block fw-bold tw-mb-2'>
                                Comfort
                              </span>
                              <span className='fw-medium tw-mb-3'>
                                Rating 4.8{" "}
                              </span>
                            </div>
                            <div className='d-flex align-items-center tw-gap-4'>
                              <div>
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star-half' />
                              </div>
                              <div>
                                <span className='fw-bold text-main-600'>
                                  5.0
                                </span>
                              </div>
                            </div>
                          </div>
                          <ProgressBar percentage={65} />
                        </div>
                      </div>
                      <div className=''>
                        <div>
                          <div className='d-flex justify-content-between'>
                            <div>
                              <span className='d-block fw-bold tw-mb-2'>
                                Comfort
                              </span>
                              <span className='fw-medium tw-mb-3'>
                                Rating 4.8{" "}
                              </span>
                            </div>
                            <div className='d-flex align-items-center tw-gap-4'>
                              <div>
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star' />
                                <i className='ph ph-star-half' />
                              </div>
                              <div>
                                <span className='fw-bold text-main-600'>
                                  5.0
                                </span>
                              </div>
                            </div>
                          </div>
                          <ProgressBar percentage={95} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='tw_fade_anim'>
                  <div className='d-flex justify-content-between tw-mb-10 flex-wrap row-gap-3'>
                    <h2 className='tw-text-2xl fw-normal'>Client’s Review</h2>
                    <div className='d-flex align-items-center tw-gap-6'>
                      <span className='fw-medium'>6 Reviews</span>
                      <div>
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star-half' />
                      </div>
                      <span className='fw-medium'>(5 out of 5) </span>
                    </div>
                  </div>
                  <div className=''>
                    <div className='d-flex tw-gap-10 tw-pb-6 tw-mb-14'>
                      <div className='room-details-client-review-thumb'>
                        <Image
                          width={80}
                          height={80}
                          className='w-100 h-100 object-fit-cover'
                          src='/assets/images/thumbs/client-review.png'
                          alt='review'
                        />
                      </div>
                      <div>
                        <h4 className='tw-text-5 tw-mb-2'>Rohan De Spond</h4>
                        <p className='tw-mb-4 tw-w-526-px'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.Curabitur have is covered many vulputate
                          vestibulum Phasellus rhoncus, dolor eget viverra
                          pretium dolor tellus aliquet nunc, vitae ultricies
                          erat elit eu lacus.
                        </p>
                        <div className='d-flex align-items-center tw-gap-4 tw-mb-4'>
                          <div>
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star-half' />
                          </div>
                          <div>
                            <span className='fw-bold'>5.0</span>
                          </div>
                        </div>
                        <span
                          className='tw-text-sm fw-normal text-uppercase'
                          style={{ color: "#949392" }}
                        >
                          25 jan 2021
                        </span>
                      </div>
                    </div>
                    <div className='d-flex tw-gap-10 tw-pb-6 tw-mb-14 tw-ms-16'>
                      <div className='room-details-client-review-thumb'>
                        <Image
                          width={80}
                          height={80}
                          className='w-100 h-100 object-fit-cover'
                          src='/assets/images/thumbs/client-review.png'
                          alt='review'
                        />
                      </div>
                      <div>
                        <h4 className='tw-text-5 tw-mb-2'>Rohan De Spond</h4>
                        <p className='tw-mb-4 tw-w-526-px'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.Curabitur have is covered many vulputate
                          vestibulum Phasellus rhoncus, dolor eget viverra
                          pretium dolor tellus aliquet nunc, vitae ultricies
                          erat elit eu lacus.
                        </p>
                        <div className='d-flex align-items-center tw-gap-4 tw-mb-4'>
                          <div>
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star-half' />
                          </div>
                          <div>
                            <span className='fw-bold'>5.0</span>
                          </div>
                        </div>
                        <span
                          className='tw-text-sm fw-normal text-uppercase'
                          style={{ color: "#949392" }}
                        >
                          25 jan 2021
                        </span>
                      </div>
                    </div>
                    <div className='d-flex tw-gap-10 tw-pb-6 tw-mb-14'>
                      <div className='room-details-client-review-thumb'>
                        <Image
                          width={80}
                          height={80}
                          className='w-100 h-100 object-fit-cover'
                          src='/assets/images/thumbs/client-review.png'
                          alt='review'
                        />
                      </div>
                      <div>
                        <h4 className='tw-text-5 tw-mb-2'>Rohan De Spond</h4>
                        <p className='tw-mb-4 tw-w-526-px'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.Curabitur have is covered many vulputate
                          vestibulum Phasellus rhoncus, dolor eget viverra
                          pretium dolor tellus aliquet nunc, vitae ultricies
                          erat elit eu lacus.
                        </p>
                        <div className='d-flex align-items-center tw-gap-4 tw-mb-4'>
                          <div>
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star' />
                            <i className='text-main-600 ph-bold ph-star-half' />
                          </div>
                          <div>
                            <span className='fw-bold'>5.0</span>
                          </div>
                        </div>
                        <span
                          className='tw-text-sm fw-normal text-uppercase'
                          style={{ color: "#949392" }}
                        >
                          25 jan 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='package-details-contact bg-white tw-py-14 tw-px-12 tw-mb-8 tw_fade_anim'>
                  <h2 className='tw-text-2xl fw-normal tw-mb-8'>
                    leave a comment
                  </h2>
                  <div className='d-flex tw-gap-10 tw-mb-12 flex-wrap row-gap-3'>
                    <div>
                      <span className='font-heading fw-normal tw-mb-2'>
                        Value for Money*
                      </span>
                      <div>
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star-half' />
                      </div>
                    </div>
                    <div>
                      <span className='font-heading fw-normal tw-mb-2'>
                        Destination*
                      </span>
                      <div>
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star-half' />
                      </div>
                    </div>
                    <div>
                      <span className='font-heading fw-normal tw-mb-2'>
                        Accommodation*
                      </span>
                      <div>
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star-half' />
                      </div>
                    </div>
                    <div>
                      <span className='font-heading fw-normal tw-mb-2'>
                        Transport*
                      </span>
                      <div>
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star' />
                        <i className='text-main-600 ph-bold ph-star-half' />
                      </div>
                    </div>
                  </div>
                  <form
                    action='#'
                    className='tw-mt-70-px d-flex flex-column tw-gap-64-px'
                  >
                    <div className='row'>
                      <div className='col-xl-6'>
                        <div className='position-relative z-1 tw-mb-7'>
                          <input
                            type='text'
                            className='contact-three-input tw-px-6 tw-py-7 bg-neutral-100 tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                            placeholder='First name'
                          />
                        </div>
                      </div>
                      <div className='col-xl-6'>
                        <div className='position-relative z-1 tw-mb-7'>
                          <input
                            type='email'
                            className='contact-three-input tw-px-6 tw-py-7 bg-neutral-100 tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                            placeholder='Email Address'
                          />
                        </div>
                      </div>
                      <div className='col-xl-12'>
                        <div className='position-relative tw-mb-3'>
                          <textarea
                            className='contact-three-input focus-outline-0 bg-neutral-100  tw-rounded-lg tw-py-3 tw-px-6 w-100 border border-0 focus-border-main-600 tw-h-224-px'
                            placeholder='Write Review'
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className='col-xl-12'>
                        <div>
                          <div className='package-details-contact-checkbox tw-mb-10'>
                            <div className='custom-control custom-checkbox d-flex align-items-center tw-gap-3'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customCheck1'
                              />
                              <label
                                className='custom-control-label fw-medium'
                                htmlFor='customCheck1'
                              >
                                I agree to Terms &amp; Conditions, Refund Policy
                                and Privacy Policy of Fabrilife.
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className=''>
                          <button className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-rounded-lg'>
                            write review here{" "}
                            <span className='d-inline-block lh-1 tw-text-lg'>
                              <i className='ph ph-arrow-up-right' />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-xl-5'>
              <div className='room-details-sideber'>
                <div className='bg-white tw-rounded-lg tw-py-10 tw-px-8 tw-mb-8'>
                  <div className='tw-mb-9 tw_fade_anim'>
                    <div className='d-flex justify-content-between tw-mb-8'>
                      <h4 className='tw-text-xl fw-normal mb-0'>
                        Description:
                      </h4>
                      <span className='tw-text-xl fw-normal text-heading mb-0'>
                        $130
                      </span>
                    </div>
                    <div className='d-flex justify-content-between tw-gap-5'>
                      <div className='checkout-wrapper d-flex flex-column bg-neutral-100 border-0 mw-100 tw-py-3 tw-px-6 tw-rounded-lg'>
                        <label className='tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2'>
                          <span>
                            <Image
                              width={21}
                              height={22}
                              src='/assets/images/icons/checkout-icon1.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          select date
                        </label>
                        <div className='nice-select bg-neutral-100'>
                          <span className='current'>Check In</span>
                          <ul className='list'>
                            <li className='option'>Check In</li>
                          </ul>
                        </div>
                      </div>
                      <div className='checkout-wrapper d-flex flex-column bg-neutral-100 border-0 mw-100 tw-py-3 tw-px-6 tw-rounded-lg'>
                        <label className='tw-text-sm fw-normal font-body d-flex align-content-center tw-gap-4 tw-mb-2'>
                          <span>
                            <Image
                              width={21}
                              height={22}
                              src='/assets/images/icons/checkout-icon1.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          select date
                        </label>
                        <div className='nice-select bg-neutral-100'>
                          <span className='current'>Check Out</span>
                          <ul className='list'>
                            <li className='option'>Check Out</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='tw_fade_anim'>
                    <h4 className='tw-text-xl fw-normal tw-mb-8'>
                      Description:
                    </h4>
                    <div className='d-flex tw-gap-5'>
                      <div className='position-relative z-1 w-100 tw-mb-8'>
                        <div className='tp-shop-quantity tw-rounded-lg d-flex align-items-center bg-neutral-100'>
                          <span className='text-body'>Adult</span>
                          <div className='tp-quantity position-relative'>
                            <div className='qty_button cart-minus tp-cart-minus'>
                              <i className='ph ph-minus' />
                            </div>
                            <input
                              className='border-0 focus-outline-0 focus-tw-placeholder-text-hidden bg-transparent'
                              type='text'
                              defaultValue={1}
                            />
                            <div className='qty_button cart-plus tp-cart-plus'>
                              <i className='ph ph-plus' />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='position-relative z-1 w-100 tw-mb-8'>
                        <div className='tp-shop-quantity tw-rounded-lg d-flex align-items-center bg-neutral-100'>
                          <span className='text-body'>Child</span>
                          <div className='tp-quantity position-relative'>
                            <div className='qty_button cart-minus tp-cart-minus'>
                              <i className='ph ph-minus' />
                            </div>
                            <input
                              className='border-0 focus-outline-0 focus-tw-placeholder-text-hidden bg-transparent'
                              type='text'
                              defaultValue={1}
                            />
                            <div className='qty_button cart-plus tp-cart-plus'>
                              <i className='ph ph-plus' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='position-relative z-1 w-100 tw-mb-8 tw_fade_anim'>
                    <div className='tp-shop-quantity tw-rounded-lg d-flex align-items-center bg-neutral-100'>
                      <span className='text-body'>Rooms</span>
                      <div className='tp-quantity position-relative'>
                        <div className='qty_button cart-minus tp-cart-minus'>
                          <i className='ph ph-minus' />
                        </div>
                        <input
                          className='border-0 focus-outline-0 focus-tw-placeholder-text-hidden bg-transparent'
                          type='text'
                          defaultValue={1}
                        />
                        <div className='qty_button cart-plus tp-cart-plus'>
                          <i className='ph ph-plus' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='position-relative z-1 w-100 tw_fade_anim'>
                    <div className='tp-shop-quantity tw-rounded-lg d-flex align-items-center bg-neutral-100'>
                      <span className='text-body'>Extra bed</span>
                      <div className='tp-quantity position-relative'>
                        <div className='qty_button cart-minus tp-cart-minus'>
                          <i className='ph ph-minus' />
                        </div>
                        <input
                          className='border-0 focus-outline-0 focus-tw-placeholder-text-hidden bg-transparent'
                          type='text'
                          defaultValue={1}
                        />
                        <div className='qty_button cart-plus tp-cart-plus'>
                          <i className='ph ph-plus' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='catagori bg-white tw-pt-9 tw-pb-7 tw-px-11 tw-mb-8 tw-rounded-xl tw_fade_anim'>
                  <h6 className='tw-text-505 fw-normal text-capitalize tw-mb-10'>
                    Amenities
                  </h6>
                  <div>
                    <ul className='d-flex flex-column'>
                      <li className='tw-text-lg fw-normal text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-mb-5'>
                        <span className='d-inline-flex lh-1 text-main-600 tw-text-lg'>
                          <i className='ph ph-users' />
                        </span>{" "}
                        2 - 5 Persons
                      </li>
                      <li className='tw-text-lg fw-normal text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-mb-5'>
                        <span className='d-inline-flex lh-1 text-main-600 tw-text-lg'>
                          <i className='ph ph-wifi-high' />
                        </span>{" "}
                        Free WiFi Available
                      </li>
                      <li className='tw-text-lg fw-normal text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-mb-5'>
                        <span className='d-inline-flex lh-1 text-main-600 tw-text-lg'>
                          <i className='ph ph-swimming-pool' />
                        </span>{" "}
                        Swimingpools
                      </li>
                      <li className='tw-text-lg fw-normal text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-mb-5'>
                        <span className='d-inline-flex lh-1 text-main-600 tw-text-lg'>
                          <i className='ph ph-coffee' />
                        </span>{" "}
                        Breakfast
                      </li>
                      <li className='tw-text-lg fw-normal text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-mb-5'>
                        <span className='d-inline-flex lh-1 text-main-600 tw-text-lg'>
                          <i className='ph ph-house-line' />
                        </span>{" "}
                        250 SQFT Rooms
                      </li>
                      <li className='tw-text-lg fw-normal text-heading font-heading d-inline-flex align-items-center tw-gap-3 tw-mb-5'>
                        <span className='d-inline-flex lh-1 text-main-600 tw-text-lg'>
                          <i className='ph ph-wifi-high' />
                        </span>{" "}
                        Gym facilities
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className='background-img position-relative z-1 tw-pt-25 tw-pb-23 bg_2'
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

export default RoomDetailsInner;
