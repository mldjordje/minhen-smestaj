import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const RelaxingOne: FC = () => {
  return (
    <div className='pt-120 relaxing_one'>
      <section className='relaxing-area pb-120'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-lg-9'>
              <div className='relaxing-thumb position-relative z-1'>
                <div className='relaxing-thumb-1'>
                  <Image
                    width={429}
                    height={550}
                    src='/assets/images/thumbs/relaxing-thumb1.jpg'
                    alt='thumb'
                  />
                </div>
                <div className='relaxing-thumb-2 position-absolute'>
                  <Image
                    width={399}
                    height={523}
                    src='/assets/images/thumbs/relaxing-thumb2.jpg'
                    alt='thumb'
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-11'>
              <div className='relaxing-wrapper'>
                <div className='section-two-wrapper tw-mb-14'>
                  <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                    Wellness Beyond Expectations
                  </h6>
                  <h2 className='section-two-title tw-text-16 fw-normal tw-mb-5 tw-char-animation'>
                    Rejuvenate &amp; Relaxing In At Our Luxury Spa
                  </h2>
                  <p className='tw-text-lg fw-medium'>
                    Welcome to Marcus Medical, your pathway to natural-looking
                    results from industry-leading injectors and&nbsp;plastic
                    surgeons in South Bay.
                  </p>
                </div>
                <div className='row'>
                  <div className='col-xl-8 col-lg-6 col-md-7'>
                    <div className='relaxing-list tw-mb-8'>
                      <ul>
                        <li className='d-flex align-items-center tw-gap-6 tw-text-505 font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-5 tw-mb-5'>
                          <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                            <i className='ph-bold ph-check' />
                          </span>{" "}
                          Full body aromatherapy massage
                        </li>
                        <li className='d-flex align-items-center tw-gap-6 tw-text-505 font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-5 tw-mb-5'>
                          <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                            <i className='ph-bold ph-check' />
                          </span>{" "}
                          Head + shoulder therapy
                        </li>
                        <li className='d-flex align-items-center tw-gap-6 tw-text-505 font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-5 tw-mb-5'>
                          <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                            <i className='ph-bold ph-check' />
                          </span>{" "}
                          Aromatic hot towel wrap
                        </li>
                        <li className='d-flex align-items-center tw-gap-6 tw-text-505 font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-5 tw-mb-5'>
                          <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                            <i className='ph-bold ph-check' />
                          </span>{" "}
                          Aromatic hot towel wrap
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                    href='/about'
                  >
                    Booking today{" "}
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
    </div>
  );
};

export default RelaxingOne;
