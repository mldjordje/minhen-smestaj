import Image from "next/image";
import { FC } from "react";

const ContactTwo: FC = () => {
  return (
    <section className='contact-three-area py-120 position-relative z-1'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-5'></div>
          <div className='col-xl-7 col-lg-10'>
            <div className='contact-three-wrapper tw-ms-8'>
              <div className='section-two-wrapper tw-mb-14 tw_fade_anim'>
                <h6 className='section-two-subtitle tw-text-xl text-uppercase text-main-three-800 tw-mb-6'>
                  Find unique homes in vibrant places.
                </h6>
                <h2 className='section-two-title tw-text-16 fw-normal tw-mb-3 tw-char-animation'>
                  Experience Hospitality Like Never Before Book now!
                </h2>
                <p className='tw-text-lg fw-medium tw-me-10'>
                  Welcome to Marcus Medical, your pathway to natural-looking
                  results from industry-leading injectors and&nbsp;plastic
                  surgeons in South Bay.
                </p>
              </div>
              <div className='tw_fade_anim'>
                <form action='#'>
                  <div className='row gy-4 gx-3'>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-6 tw-py-7 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          placeholder='Full Name'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                          <span className='tw-text-2xl'>
                            <i className='ph ph-user' />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-6 tw-py-7 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          placeholder='Phone Number'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                          <span className='tw-text-2xl'>
                            <i className='ph ph-phone-call' />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-6 tw-py-7 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          placeholder='Check In'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                          <span className='tw-text-2xl'>
                            <i className='ph ph-calendar-blank' />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-6 tw-py-7 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          placeholder='Check Out'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                          <span className='tw-text-2xl'>
                            <i className='ph ph-calendar-blank' />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-5 tw-py-6 bg-white tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          placeholder='Number of Guests'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'>
                          <span className='tw-text-2xl'>
                            <i className='ph ph-users' />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='nice-select contact-three-nice-select tw-text-base tw-px-5 tw-h-18 d-inline-flex align-items-center font-body text-body bg-white tw-rounded-lg border-0 w-100'>
                        <span className='current'>Rooms</span>
                        <ul className='list'>
                          <li className='option'>Rooms</li>
                          <li className='option'>01</li>
                          <li className='option'>02</li>
                          <li className='option'>03</li>
                          <li className='option'>04</li>
                          <li className='option'>05</li>
                          <li className='option'>06</li>
                          <li className='option'>07</li>
                          <li className='option'>08</li>
                          <li className='option'>09</li>
                        </ul>
                      </div>
                    </div>
                    <div className='col-xl-12'>
                      <div className='tw-mt-6'>
                        <button className='tw-btn-hover-yellow bg-main-three-600 tw-py-6 tw-px-16 text-capitalize text-white font-heading d-inline-flex fw-bold align-items-center tw-gap-2'>
                          make reservation
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='contact-three-bg position-absolute start-0 top-0 h-100'>
        <Image
          width={831}
          height={929}
          className='w-100 h-100 object-fit-cover'
          src='/assets/images/thumbs/contact-three-bg.jpg'
          alt='bg'
        />
      </div>
    </section>
  );
};

export default ContactTwo;
