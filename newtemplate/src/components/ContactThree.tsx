import Image from "next/image";

const ContactThree = () => {
  return (
    <>
      <div className='marquee-three-2-bg'>
        <Image
          width={1920}
          height={800}
          src='/assets/images/thumbs/marquee-three-2-bg3.jpg'
          alt='bg'
        />
      </div>
      <section className='contact-four-area position-relative'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-10'>
              <div className='contact-four-wrapper tw-pt-25 tw-pb-13 tw-px-18 tw-rounded-3xl'>
                <div className='section-two-wrapper text-center tw-mb-14'>
                  <h6 className='section-two-subtitle tw-text-xl text-neutral-800 text-uppercase tw-mb-6'>
                    Rest, Relax, Recharge
                  </h6>
                  <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                    Experience Luxury And Comfort With In Every Corners
                  </h2>
                </div>
                <div className=''>
                  <form action='#'>
                    <div className='row gy-4 gx-3'>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                        <div className='position-relative z-1'>
                          <input
                            type='text'
                            className='banner-input contact-four-input cursor-big tw-px-5 tw-py-7 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                            placeholder='Name'
                          />
                          <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                            <span className='tw-text-xl'>
                              <i className='ph ph-user' />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                        <div className='position-relative z-1'>
                          <input
                            type='email'
                            className='banner-input contact-four-input cursor-big tw-px-5 tw-py-7 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                            placeholder='Email'
                          />
                          <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                            <span className='tw-text-xl'>
                              <i className='ph ph-user' />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                        <div className='position-relative z-1'>
                          <input
                            type='text'
                            className='banner-input contact-four-input cursor-big tw-px-5 tw-py-7 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                            placeholder='Check in'
                          />
                          <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                            <span className='tw-text-xl'>
                              <i className='ph ph-calendar' />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                        <div className='position-relative z-1'>
                          <input
                            type='text'
                            className='banner-input contact-four-input cursor-big tw-px-5 tw-py-7 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                            placeholder='Check Out'
                          />
                          <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                            <span className='tw-text-xl'>
                              <i className='ph ph-clock' />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                        <div className='position-relative z-1'>
                          <div className='tp-shop-quantity tw-rounded-lg d-flex align-items-center'>
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
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                        <div className='position-relative z-1'>
                          <div className='tp-shop-quantity tw-rounded-lg d-flex align-items-center'>
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
        </div>
      </section>
    </>
  );
};

export default ContactThree;
