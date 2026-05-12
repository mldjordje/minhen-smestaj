import Link from "next/link";
import { FC } from "react";

const ContactOne: FC = () => {
  return (
    <section className='cta-area_one pt-120 tw-pb-15'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-xl-5'>
            <div
              className='contact-two-form bg-white tw-py-20 tw-ps-10 tw-pe-20 tw-mb-7 tw_fade_anim'
              data-delay='.3'
            >
              <div className='tw-mb-10'>
                <h2 className='tw-text-12 fw-normal tw-mb-4'>Contact Form</h2>
                <p className='tw-text-lg fw-medium'>
                  Welcome to Marcus Medical, your pathway to natural
                  industry-leading injectors and&nbsp;plastic surgeons..
                </p>
              </div>
              <form action='#'>
                <div className='row'>
                  <div className='col-xl-12'>
                    <div className='position-relative tw-mb-11'>
                      <span className='position-absolute top-50 start-0 translate-middle-y text-heading tw-text-xl'>
                        <i className='ph-bold ph-user' />
                      </span>
                      <input
                        type='text'
                        className='form-control rounded-0 bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-ps-8 tw-pe-13 focus-border-main-600 tw-h-14 tw-placeholder-text-neutral-700 focus-tw-placeholder-text-hidden tw-placeholder-transition-2'
                        placeholder='Your Name*'
                      />
                    </div>
                  </div>
                  <div className='col-xl-12'>
                    <div className='position-relative tw-mb-11'>
                      <span className='position-absolute top-50 start-0 translate-middle-y text-heading tw-text-xl'>
                        <i className='ph ph-envelope' />
                      </span>
                      <input
                        type='email'
                        className='form-control rounded-0 bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-ps-8 tw-pe-13 focus-border-main-600 tw-h-14 tw-placeholder-text-neutral-700 focus-tw-placeholder-text-hidden tw-placeholder-transition-2'
                        placeholder='Email Address**'
                      />
                    </div>
                  </div>
                  <div className='col-xl-12'>
                    <div className='position-relative tw-mb-11'>
                      <span className='position-absolute top-0 start-0 tw-mt-1 text-heading tw-text-xl'>
                        <i className='ph-bold ph-note-pencil' />
                      </span>
                      <textarea
                        className='form-control rounded-0 tw-h-135-px bg-white shadow-none border-none border-bottom border-bottom-neutral text-heading tw-ps-8 tw-pe-13 focus-border-main-600 tw-placeholder-text-neutral-700 focus-tw-placeholder-text-hidden tw-placeholder-transition-2'
                        placeholder='Enter Your Message here'
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className='col-xl-12'>
                    <div>
                      <button className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-14 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'>
                        Booking today{" "}
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
          <div className='col-xl-7'>
            <div
              className='contact-two-right tw-ms-10 tw_fade_anim'
              data-delay='.5'
            >
              <div className='section-two-wrapper tw-mb-14'>
                <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                  Transparent &amp; Competitive Rates
                </h6>
                <h2 className='section-two-title tw-text-16 fw-normal tw-mb-6 tw-char-animation'>
                  Get A Quote – No Cost, No Commitment
                </h2>
                <p className='tw-text-lg fw-medium tw-me-8'>
                  Welcome to Marcus Medical, your pathway to natural-looking
                  results from industry-leading injectors and&nbsp;plastic
                  surgeons in South Bay.
                </p>
              </div>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-6'>
                  <div className='contact-two-wrap text-center bg-white tw-py-10 tw-px-16 tw-rounded-xl tw-mb-7'>
                    <div className='tw-mb-4'>
                      <span className='tw-text-16 text-main-600'>
                        <i className='ph ph-map-pin-line' />
                      </span>
                    </div>
                    <div>
                      <h6 className='tw-text-3xl fw-normal text-capitalize tw-mb-4'>
                        address line
                      </h6>
                      <p className='tw-text-lg'>
                        Bowery St, New York, NY 10013,USA
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6'>
                  <div className='contact-two-wrap text-center bg-white tw-py-10 tw-px-16 tw-rounded-xl tw-mb-7'>
                    <div className='tw-mb-4'>
                      <span className='tw-text-16 text-main-600'>
                        <i className='ph ph-envelope' />
                      </span>
                    </div>
                    <div>
                      <h6 className='tw-text-3xl fw-normal text-capitalize tw-mb-4'>
                        Mail Adress
                      </h6>
                      <Link
                        className='tw-text-lg text-body hover-text-main-600'
                        href='mailto:email@example.com'
                      >
                        email@example.com
                      </Link>
                      <Link
                        className='tw-text-lg text-body hover-text-main-600'
                        href='mailto:info@yourdomain.com'
                      >
                        info@yourdomain.com
                      </Link>
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

export default ContactOne;
