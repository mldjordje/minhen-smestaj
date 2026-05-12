import Link from "next/link";
import { FC } from "react";

const PricingTwo: FC = () => {
  return (
    <section className='pricing-two-area pb-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-9'>
            <div className='section-two-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                Transparent &amp; Competitive Rates
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                We're Dedicated To Providing You Unforgettable Expierence
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='pricing-two-wrapper bg-white tw-rounded-2xl tw-pt-20 tw-px-9 tw-pb-11 tw-mb-7 tw_fade_anim'
              data-delay='.3'
            >
              <div className='text-center tw-mb-10'>
                <h6 className='tw-text-808 fw-normal tw-mb-4'>
                  Silver package
                </h6>
                <h3 className='tw-text-16 fw-medium tw-mb-2'>$75.00</h3>
                <p className='tw-text-505 font-heading fw-normal text-heading'>
                  per Month
                </p>
              </div>
              <div className='relaxing-list tw-mb-10 tw-px-7'>
                <ul>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Full body aromatherapy massage
                  </li>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Head + shoulder therapy
                  </li>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Aromatic hot towel wrap
                  </li>
                </ul>
              </div>
              <div className='pricing-button'>
                <Link
                  className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 w-100 text-capitalize text-heading font-heading d-inline-flex align-items-center justify-content-center text-center tw-gap-2 tw-rounded-lg'
                  href='/contact'
                >
                  Get Now{" "}
                  <span className='d-inline-block lh-1 tw-text-lg'>
                    <i className='ph ph-arrow-right' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='pricing-two-wrapper active bg-white tw-rounded-2xl tw-pt-20 tw-px-9 tw-pb-11 tw-mb-7 tw_fade_anim'
              data-delay='.5'
            >
              <div className='text-center tw-mb-10'>
                <h6 className='tw-text-808 fw-normal tw-mb-4'>Gold package</h6>
                <h3 className='tw-text-16 fw-medium tw-mb-2'>$85.00</h3>
                <p className='tw-text-505 font-heading fw-normal text-heading'>
                  per Month
                </p>
              </div>
              <div className='relaxing-list tw-mb-10 tw-px-7'>
                <ul>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Full body aromatherapy massage
                  </li>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Head + shoulder therapy
                  </li>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Aromatic hot towel wrap
                  </li>
                </ul>
              </div>
              <div className='pricing-button'>
                <Link
                  className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 w-100 text-capitalize text-heading font-heading d-inline-flex align-items-center justify-content-center text-center tw-gap-2 tw-rounded-lg'
                  href='/contact'
                >
                  Get Now{" "}
                  <span className='d-inline-block lh-1 tw-text-lg'>
                    <i className='ph ph-arrow-right' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='pricing-two-wrapper bg-white tw-rounded-2xl tw-pt-20 tw-px-9 tw-pb-11 tw-mb-7 tw_fade_anim'
              data-delay='.7'
            >
              <div className='text-center tw-mb-10'>
                <h6 className='tw-text-808 fw-normal tw-mb-4'>
                  Premium packages
                </h6>
                <h3 className='tw-text-16 fw-medium tw-mb-2'>$95.00</h3>
                <p className='tw-text-505 font-heading fw-normal text-heading'>
                  per Month
                </p>
              </div>
              <div className='relaxing-list tw-mb-10 tw-px-7'>
                <ul>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Full body aromatherapy massage
                  </li>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Head + shoulder therapy
                  </li>
                  <li className='d-flex align-items-center tw-gap-6 tw-text-lg font-heading fw-normal text-heading text-capitalize border-bottom border-neutral tw-pb-6 tw-mb-6'>
                    <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-white tw-text-sm d-inline-flex justify-content-center align-items-center'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Aromatic hot towel wrap
                  </li>
                </ul>
              </div>
              <div className='pricing-button'>
                <Link
                  className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 w-100 text-capitalize text-heading font-heading d-inline-flex align-items-center justify-content-center text-center tw-gap-2 tw-rounded-lg'
                  href='/contact'
                >
                  Get Now{" "}
                  <span className='d-inline-block lh-1 tw-text-lg'>
                    <i className='ph ph-arrow-right' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTwo;
