import { FC } from "react";

const AppointmentInner: FC = () => {
  return (
    <div className='pb-120 pt-120 bg_2'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-10'>
            <div
              className='contact-three-wrapper appointment-ip-wrapper bg-white tw-rounded-xl tw-ms-8> <div class='
              section-two-wrapper=''
              text-center=''
            >
              <div className='text-center tw-mb-10'>
                <h6 className='section-two-subtitle tw-text-xl text-uppercase text-main-600 tw-mb-6'>
                  Find unique homes in vibrant places.
                </h6>
                <h2 className='section-two-title tw-text-16 fw-normal tw-mb-3 tw-char-animation'>
                  Experience Hospitality Like Never Before Book Now!
                </h2>
              </div>
              <div>
                <form action='#'>
                  <div className='row gy-4 gx-3'>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-6 tw-py-7 tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          id='personalInfo'
                          placeholder='Full Name'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'></div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-6 tw-py-7 tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          id='personalInfo'
                          placeholder='Phone Number'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'></div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-6 tw-py-7 tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          id='personalInfo'
                          placeholder='Check In'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'></div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-6 tw-py-7 tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          id='personalInfo'
                          placeholder='Check Out'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'></div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='position-relative z-1'>
                        <input
                          type='text'
                          className='contact-three-input cursor-big tw-px-5 tw-py-6 tw-rounded-lg border-0 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none'
                          id='personalInfo'
                          placeholder='Number of Guests'
                        />
                        <div className='position-absolute top-50 end-0 translate-middle-y tw-me-7'></div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6'>
                      <div className='nice-select contact-three-nice-select tw-text-base tw-px-5 tw-h-18 d-inline-flex align-items-center font-body text-body tw-rounded-lg border-0 w-100'>
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
                        <button className='tw-btn-hover-black bg-main-600 tw-py-6 tw-px-16 text-capitalize text-heading w-100 font-heading tw-rounded-lg d-inline-flex fw-normal justify-content-center align-items-center tw-gap-2'>
                          Make an appointment
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
    </div>
  );
};

export default AppointmentInner;
