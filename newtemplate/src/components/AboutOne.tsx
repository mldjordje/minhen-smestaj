import Image from "next/image";
import { FC } from "react";

const AboutOne: FC = () => {
  return (
    <section className='about-area'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-5 col-lg-8'>
            <div
              className='about-thumb position-relative z-1 tw_fade_anim'
              data-delay='.3'
            >
              <div>
                <Image
                  width={408}
                  height={550}
                  src='/assets/images/thumbs/about-thumb1.jpg'
                  alt='thumb'
                />
              </div>
              <div className='about-thumb-2 position-absolute '>
                <Image
                  width={381}
                  height={523}
                  src='/assets/images/thumbs/about-thumb2.jpg'
                  alt='thumb'
                />
              </div>
            </div>
          </div>
          <div className='col-xl-7'>
            <div
              className='about-wrapper tw-ps-14 tw_fade_anim'
              data-delay='.5'
            >
              <div className='section-wrapper tw-mb-14'>
                <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                  Sleep in Style and Serenity
                </h6>
                <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                  Luxury, Location &amp; Love Reasons To Stay With Us
                </h2>
                <p className='tw-text-lg'>
                  Welcome to Marcus Medical, your pathway to natural-looking
                  results from <br /> industry-leading injectors
                  and&nbsp;plastic surgeons in South Bay.
                </p>
              </div>
              <div>
                <div className='row'>
                  <div className='col-xl-5 col-lg-6 col-md-6'>
                    <div className='about-list'>
                      <ul className='d-flex flex-column'>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Unparalleled
                        </li>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Personalized Service
                        </li>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Gourmet Dining
                        </li>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Wellness &amp; Spa
                        </li>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Advanced Technology
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-xl-5 col-lg-6 col-md-6'>
                    <div className='about-list'>
                      <ul className='d-flex flex-column'>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Elegant Accommodations
                        </li>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Advanced Technology
                        </li>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Sustainable Practices
                        </li>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Exclusive Packages
                        </li>
                        <li className='bg-white text-heading fw-semibold d-inline-flex align-items-center tw-gap-4 tw-py-3 tw-ps-5 tw-pe-4 tw-mb-5 tw-rounded-3xl'>
                          <span className='tw-text-2xl text-main-600 lh-1 d-inline-block'>
                            <i className='ph-bold ph-seal-check' />
                          </span>{" "}
                          Safety &amp; Cleanliness
                        </li>
                      </ul>
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

export default AboutOne;
