import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const ServiceInner: FC = () => {
  return (
    <section className='service-ip-area py-120'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-ip-wrapper bg-white tw-p-5 tw-rounded-lg tw-transition position-relative z-1 overflow-hidden tw-mb-7'>
              <div className='service-ip-thumb tw-mb-8'>
                <Link className='d-block' href='/service-details'>
                  <Image
                    width={410}
                    height={320}
                    className='tw-rounded-xl w-100'
                    src='/assets/images/thumbs/service-ip-thumb1.jpg'
                    alt='thumb'
                  />
                </Link>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center tw-mb-8'>
                  <div className='service-ip-icon'>
                    <span className='tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-3xl'>
                      <i className='ph ph-bed' />
                    </span>
                  </div>
                  <div className='service-ip-number'>
                    <span className='tw-text-120 fw-medium'>01</span>
                  </div>
                </div>
                <div>
                  <h4 className='service-ip-title tw-transition tw-text-2xl tw-mb-4'>
                    <Link
                      className='hover-text-main-600'
                      href='/service-details'
                    >
                      Romantic Hideaway Escape
                    </Link>
                  </h4>
                  <p className='service-ip-paragraph tw-transition tw-mb-4'>
                    Lorem ipsum is dummy words passes majority inceptos penats
                    is tempus
                  </p>
                </div>
                <div className='service-ip-button'>
                  <Link
                    className='service-ip-btn d-inline-flex align-items-center tw-gap-2 fw-semibold text-heading tw-transition hover-text-main-600'
                    href='/service-details'
                  >
                    Read More{" "}
                    <span className='d-inline-block lh-1 tw-text-xl'>
                      <i className='ph-bold ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-ip-wrapper bg-white tw-p-5 tw-rounded-lg tw-transition position-relative z-1 overflow-hidden tw-mb-7'>
              <div className='service-ip-thumb tw-mb-8'>
                <Link className='d-block' href='/service-details'>
                  <Image
                    width={410}
                    height={320}
                    className='tw-rounded-xl w-100'
                    src='/assets/images/thumbs/service-ip-thumb2.jpg'
                    alt='thumb'
                  />
                </Link>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center tw-mb-8'>
                  <div className='service-ip-icon'>
                    <span className='tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-3xl'>
                      <i className='ph ph-bed' />
                    </span>
                  </div>
                  <div className='service-ip-number'>
                    <span className='tw-text-120 fw-medium'>02</span>
                  </div>
                </div>
                <div>
                  <h4 className='service-ip-title tw-transition tw-text-2xl tw-mb-4'>
                    <Link
                      className='hover-text-main-600'
                      href='/service-details'
                    >
                      Whispering Hearts Retreat
                    </Link>
                  </h4>
                  <p className='service-ip-paragraph tw-transition tw-mb-4'>
                    Lorem ipsum is dummy words passes majority inceptos penats
                    is tempus
                  </p>
                </div>
                <div className='service-ip-button'>
                  <Link
                    className='service-ip-btn d-inline-flex align-items-center tw-gap-2 fw-semibold text-heading tw-transition hover-text-main-600'
                    href='/service-details'
                  >
                    Read More{" "}
                    <span className='d-inline-block lh-1 tw-text-xl'>
                      <i className='ph-bold ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-ip-wrapper bg-white tw-p-5 tw-rounded-lg tw-transition position-relative z-1 overflow-hidden tw-mb-7'>
              <div className='service-ip-thumb tw-mb-8'>
                <Link className='d-block' href='/service-details'>
                  <Image
                    width={410}
                    height={320}
                    className='tw-rounded-xl w-100'
                    src='/assets/images/thumbs/service-ip-thumb3.jpg'
                    alt='thumb'
                  />
                </Link>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center tw-mb-8'>
                  <div className='service-ip-icon'>
                    <span className='tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-3xl'>
                      <i className='ph ph-bed' />
                    </span>
                  </div>
                  <div className='service-ip-number'>
                    <span className='tw-text-120 fw-medium'>03</span>
                  </div>
                </div>
                <div>
                  <h4 className='service-ip-title tw-transition tw-text-2xl tw-mb-4'>
                    <Link
                      className='hover-text-main-600'
                      href='/service-details'
                    >
                      Couples’ Paradise Retreat
                    </Link>
                  </h4>
                  <p className='service-ip-paragraph tw-transition tw-mb-4'>
                    Lorem ipsum is dummy words passes majority inceptos penats
                    is tempus
                  </p>
                </div>
                <div className='service-ip-button'>
                  <Link
                    className='service-ip-btn d-inline-flex align-items-center tw-gap-2 fw-semibold text-heading tw-transition hover-text-main-600'
                    href='/service-details'
                  >
                    Read More{" "}
                    <span className='d-inline-block lh-1 tw-text-xl'>
                      <i className='ph-bold ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-ip-wrapper bg-white tw-p-5 tw-rounded-lg tw-transition position-relative z-1 overflow-hidden tw-mb-7'>
              <div className='service-ip-thumb tw-mb-8'>
                <Link className='d-block' href='/service-details'>
                  <Image
                    width={410}
                    height={320}
                    className='tw-rounded-xl w-100'
                    src='/assets/images/thumbs/service-ip-thumb4.jpg'
                    alt='thumb'
                  />
                </Link>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center tw-mb-8'>
                  <div className='service-ip-icon'>
                    <span className='tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-3xl'>
                      <i className='ph ph-bed' />
                    </span>
                  </div>
                  <div className='service-ip-number'>
                    <span className='tw-text-120 fw-medium'>04</span>
                  </div>
                </div>
                <div>
                  <h4 className='service-ip-title tw-transition tw-text-2xl tw-mb-4'>
                    <Link
                      className='hover-text-main-600'
                      href='/service-details'
                    >
                      Eternal Romance Escape
                    </Link>
                  </h4>
                  <p className='service-ip-paragraph tw-transition tw-mb-4'>
                    Lorem ipsum is dummy words passes majority inceptos penats
                    is tempus
                  </p>
                </div>
                <div className='service-ip-button'>
                  <Link
                    className='service-ip-btn d-inline-flex align-items-center tw-gap-2 fw-semibold text-heading tw-transition hover-text-main-600'
                    href='/service-details'
                  >
                    Read More{" "}
                    <span className='d-inline-block lh-1 tw-text-xl'>
                      <i className='ph-bold ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-ip-wrapper bg-white tw-p-5 tw-rounded-lg tw-transition position-relative z-1 overflow-hidden tw-mb-7'>
              <div className='service-ip-thumb tw-mb-8'>
                <Link className='d-block' href='/service-details'>
                  <Image
                    width={410}
                    height={320}
                    className='tw-rounded-xl w-100'
                    src='/assets/images/thumbs/service-ip-thumb5.jpg'
                    alt='thumb'
                  />
                </Link>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center tw-mb-8'>
                  <div className='service-ip-icon'>
                    <span className='tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-3xl'>
                      <i className='ph ph-bed' />
                    </span>
                  </div>
                  <div className='service-ip-number'>
                    <span className='tw-text-120 fw-medium'>05</span>
                  </div>
                </div>
                <div>
                  <h4 className='service-ip-title tw-transition tw-text-2xl tw-mb-4'>
                    <Link
                      className='hover-text-main-600'
                      href='/service-details'
                    >
                      Whispering Hearts Retreat
                    </Link>
                  </h4>
                  <p className='service-ip-paragraph tw-transition tw-mb-4'>
                    Lorem ipsum is dummy words passes majority inceptos penats
                    is tempus
                  </p>
                </div>
                <div className='service-ip-button'>
                  <Link
                    className='service-ip-btn d-inline-flex align-items-center tw-gap-2 fw-semibold text-heading tw-transition hover-text-main-600'
                    href='/service-details'
                  >
                    Read More{" "}
                    <span className='d-inline-block lh-1 tw-text-xl'>
                      <i className='ph-bold ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div className='service-ip-wrapper bg-white tw-p-5 tw-rounded-lg tw-transition position-relative z-1 overflow-hidden tw-mb-7'>
              <div className='service-ip-thumb tw-mb-8'>
                <Link className='d-block' href='/service-details'>
                  <Image
                    width={410}
                    height={320}
                    className='tw-rounded-xl w-100'
                    src='/assets/images/thumbs/service-ip-thumb6.jpg'
                    alt='thumb'
                  />
                </Link>
              </div>
              <div>
                <div className='d-flex justify-content-between align-items-center tw-mb-8'>
                  <div className='service-ip-icon'>
                    <span className='tw-w-18 tw-h-18 lh-1 d-inline-flex align-items-center justify-content-center tw-rounded-lg tw-text-3xl'>
                      <i className='ph ph-bed' />
                    </span>
                  </div>
                  <div className='service-ip-number'>
                    <span className='tw-text-120 fw-medium'>06</span>
                  </div>
                </div>
                <div>
                  <h4 className='service-ip-title tw-transition tw-text-2xl tw-mb-4'>
                    <Link
                      className='hover-text-main-600'
                      href='/service-details'
                    >
                      Lovers’ Getaway Haven
                    </Link>
                  </h4>
                  <p className='service-ip-paragraph tw-transition tw-mb-4'>
                    Lorem ipsum is dummy words passes majority inceptos penats
                    is tempus
                  </p>
                </div>
                <div className='service-ip-button'>
                  <Link
                    className='service-ip-btn d-inline-flex align-items-center tw-gap-2 fw-semibold text-heading tw-transition hover-text-main-600'
                    href='/service-details'
                  >
                    Read More{" "}
                    <span className='d-inline-block lh-1 tw-text-xl'>
                      <i className='ph-bold ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceInner;
