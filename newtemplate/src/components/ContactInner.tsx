import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const ContactInner: FC = () => {
  return (
    <section className='bg_2 pt-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-11'>
            <div className='row'>
              <div className='col-xl-6 col-lg-6'>
                <div className='tw_fade_anim' data-delay='.3'>
                  <div className='section-two-wrapper tw-mb-14'>
                    <h6 className='section-two-subtitle tw-text-xl text-uppercase text-main-three-800 tw-mb-4'>
                      Get In Touch
                    </h6>
                    <h2 className='section-two-title tw-text-16 fw-normal tw-mb-6 tw-char-animation'>
                      Contact Us
                    </h2>
                    <p className='fw-medium tw-text-lg'>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque inventore
                    </p>
                  </div>
                  <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                      <div className='d-flex tw-gap-4 tw-mb-13'>
                        <div>
                          <span className='d-inline-block lh-1 text-heading tw-text-3xl'>
                            <i className='ph-bold ph-map-pin' />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-2xl fw-normal tw-mb-3'>
                            Location
                          </h4>
                          <p>
                            55 Main street, 2nd block, <br /> Melbourne,
                            Australia
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                      <div className='d-flex tw-gap-4 tw-mb-13'>
                        <div>
                          <span className='d-inline-block lh-1 text-heading tw-text-3xl'>
                            <i className='ph ph-phone' />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-2xl fw-normal tw-mb-3'>
                            Phone
                          </h4>
                          <Link
                            className='fw-medium text-body d-block hover-text-main-600'
                            href='talk:13685678954'
                          >
                            +1 (368) 567 89 54
                          </Link>
                          <Link
                            className='fw-medium text-body d-block hover-text-main-600'
                            href='talk:23645689622'
                          >
                            +236 (456) 896 22
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                      <div className='d-flex tw-gap-4 tw-mb-13'>
                        <div>
                          <span className='d-inline-block lh-1 text-heading tw-text-3xl'>
                            <i className='ph ph-envelope' />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-2xl fw-normal tw-mb-3'>
                            Email
                          </h4>
                          <Link
                            className='fw-medium text-body d-block hover-text-main-600'
                            href='mailto:wiatechinfo@gmail.com'
                          >
                            wiatechinfo@gmail.com
                          </Link>
                          <Link
                            className='fw-medium text-body d-block hover-text-main-600'
                            href='mailto:www.wiatech.com'
                          >
                            www.wiatech.com
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                      <div className='d-flex tw-gap-4 tw-mb-13'>
                        <div>
                          <span className='d-inline-block lh-1 text-heading tw-text-3xl'>
                            <i className='ph ph-share-network' />
                          </span>
                        </div>
                        <div>
                          <h4 className='tw-text-2xl fw-normal tw-mb-4'>
                            Social
                          </h4>
                          <ul className='d-flex align-items-center tw-gap-2'>
                            <li>
                              <Link
                                className='tw-w-9 tw-h-9 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-text-heading hover-border-main-600'
                                href='https://www.facebook.com'
                              >
                                <i className='ph-bold ph-facebook-logo' />
                              </Link>
                            </li>
                            <li>
                              <Link
                                className='tw-w-9 tw-h-9 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-text-heading hover-border-main-600'
                                href='https://www.twitter.com'
                              >
                                <i className='ph-bold ph-twitter-logo' />
                              </Link>
                            </li>
                            <li>
                              <Link
                                className='tw-w-9 tw-h-9 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-text-heading hover-border-main-600'
                                href='https://www.linkedin.com'
                              >
                                <i className='ph-bold ph-instagram-logo' />
                              </Link>
                            </li>
                            <li>
                              <Link
                                className='tw-w-9 tw-h-9 lh-1 d-inline-flex align-items-center justify-content-center border border-neutral rounded-circle text-heading hover-bg-main-600 hover-text-heading hover-border-main-600'
                                href='https://www.pinterest.com'
                              >
                                <i className='ph-bold ph-dribbble-logo' />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='tw-mb-8'>
                    <Image
                      width={550}
                      height={195}
                      src='/assets/images/thumbs/contact-ip-bg.jpg'
                      alt='thumbs'
                    />
                  </div>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6'>
                <div
                  className='contact-two-form bg-white tw-py-20 tw-ps-10 tw-pe-20 tw-mb-7 tw_fade_anim'
                  data-delay='.5'
                >
                  <div className='tw-mb-10'>
                    <h2 className='tw-text-12 fw-normal tw-mb-4 tw-char-animation'>
                      Fill Up The Form
                    </h2>
                    <p className='tw-text-lg fw-medium'>
                      Your email address will not be published. Required fields
                      are marked *
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
                            Send us Mesaage{" "}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInner;
