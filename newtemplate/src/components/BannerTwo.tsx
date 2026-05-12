"use client";
import { FC, useState } from "react";

const BannerTwo: FC = () => {
  let [adult, setAdult] = useState<number>(0);
  let [child, setChild] = useState<number>(0);
  return (
    <div>
      <section
        className='banner-two-area background-img position-relative z-1'
        style={{
          backgroundImage: "url('assets/images/thumbs/banner-two-bg.jpg')",
        }}
      >
        <div className='container tw-container-1750-px'>
          <div className='row align-items-end justify-content-between'>
            <div className='col-xl-8 col-lg-11'>
              <div className='banner-two-content tw-mb-15'>
                <h6 className='banner-subtitle tw-text-xl text-uppercase text-white tw-mb-9'>
                  Find unique homes in vibrant places.
                </h6>
                <h1 className='banner-title banner-two-title tw-text-25 text-white fw-normal tw-mb-10 tw-char-animation'>
                  Experience Royal Comfort In a World of Peace &amp; Privacy
                </h1>
              </div>
            </div>
            <div className='col-xl-4'>
              <div
                className='banner-two-form tw-pt-19 tw-pb-15 tw-px-10 bg-main-600 tw-rounded-lg position-relative z-1 tw_fade_anim'
                data-delay='.3'
              >
                <form action='#'>
                  <div className='row gy-4 gx-3'>
                    <div className='col-xl-12'>
                      <div>
                        <h6 className='tw-text-7 fw-normal tw-mb-3'>
                          Book an appointment
                        </h6>
                      </div>
                    </div>
                    <div className='col-xl-12'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='banner-input cursor-big tw-px-5 tw-py-3 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          placeholder='Name'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                          <span className='tw-text-xl'>
                            <i className='ph ph-user' />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='banner-input cursor-big tw-px-5 tw-py-3 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          placeholder='Check in'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                          <span className='tw-text-xl'>
                            <i className='ph ph-calendar' />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='banner-input cursor-big tw-px-5 tw-py-3 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          placeholder='Check Out'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                          <span className='tw-text-xl'>
                            <i className='ph ph-clock' />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6'>
                      <div className='position-relative z-1'>
                        <div className='tp-shop-quantity tw-rounded-lg d-flex align-items-center'>
                          <span className='text-body'>Adult</span>
                          <div className='tp-quantity position-relative'>
                            <div
                              className='qty_button cart-minus tp-cart-minus'
                              onClick={() => {
                                adult > 0 && setAdult(adult - 1);
                              }}
                            >
                              <i className='ph ph-minus' />
                            </div>
                            <input
                              className='border-0 focus-outline-0 focus-tw-placeholder-text-hidden bg-transparent'
                              type='text'
                              defaultValue={adult}
                            />
                            <div
                              className='qty_button cart-plus tp-cart-plus'
                              onClick={() => setAdult(adult + 1)}
                            >
                              <i className='ph ph-plus' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6'>
                      <div className='position-relative z-1'>
                        <div className='tp-shop-quantity tw-rounded-lg d-flex align-items-center'>
                          <span className='text-body'>Child</span>
                          <div className='tp-quantity position-relative'>
                            <div
                              className='qty_button cart-minus tp-cart-minus'
                              onClick={() => {
                                child > 0 && setChild(child - 1);
                              }}
                            >
                              <i className='ph ph-minus' />
                            </div>
                            <input
                              className='border-0 focus-outline-0 focus-tw-placeholder-text-hidden bg-transparent'
                              type='text'
                              defaultValue={child}
                            />
                            <div
                              className='qty_button cart-plus tp-cart-plus'
                              onClick={() => setChild(child + 1)}
                            >
                              <i className='ph ph-plus' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-12'>
                      <div className='tw-mt-6'>
                        <button className='tw-btn-hover-black bg-main-600 w-100 justify-content-center tw-py-5 tw-px-7 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'>
                          EXPLORE MORE{" "}
                          <span className='d-inline-block lh-1 tw-text-lg'>
                            <i className='ph ph-arrow-right' />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='banner-two-form-overlay bg-neutral-100' />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerTwo;
