import Image from "next/image";
import Link from "next/link";

const ServiceOne = () => {
  return (
    <section className='service-five-area bg-white pb-120'>
      <div className='container tw-container-1720-px'>
        <div className='row justify-content-center'>
          <div className='col-xl-7 col-lg-10'>
            <div className='section-two-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                Rest, Relax, Recharge
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                Experience Luxury And Comfort With In Every Corners
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='service-two-wrapper service-five-wrapper tw_fade_anim'
              data-delay='.3'
            >
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/room-details'>
                  <Image
                    width={548}
                    height={482}
                    src='/assets/images/thumbs/service-five-thumb1.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 top-0 tw-mt-5 tw-ms-4'>
                  <p className='bg-main-600 tw-rounded-3xl tw-py-1 tw-px-5 fw-medium text-heading mb-0'>
                    <span>
                      <i className='ph ph-star' />
                    </span>{" "}
                    4,93
                  </p>
                </div>
                <div className='position-absolute end-0 bottom-0 tw-mb-5 tw-me-4'>
                  <span className='bg-white tw-rounded-3xl tw-text-2xl fw-normal tw-py-1 tw-px-6 text-heading'>
                    $599
                  </span>
                </div>
              </div>
              <div className='service-two-content service-five-content'>
                <h4 className='service-two-title service-five-title tw-text-10 fw-normal border-bottom border-neutral tw-pb-4 tw-mb-2'>
                  <Link href='/room-details'>Presidential Suite</Link>
                </h4>
                <div className='service-five-list'>
                  <ul className='d-flex tw-gap-6'>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='service-two-wrapper service-five-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.5'
            >
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/room-details'>
                  <Image
                    width={548}
                    height={482}
                    src='/assets/images/thumbs/service-five-thumb2.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 top-0 tw-mt-5 tw-ms-4'>
                  <p className='bg-main-600 tw-rounded-3xl tw-py-1 tw-px-5 fw-medium text-heading mb-0'>
                    <span>
                      <i className='ph ph-star' />
                    </span>{" "}
                    4,93
                  </p>
                </div>
                <div className='position-absolute end-0 bottom-0 tw-mb-5 tw-me-4'>
                  <span className='bg-white tw-rounded-3xl tw-text-2xl fw-normal tw-py-1 tw-px-6 text-heading'>
                    $599
                  </span>
                </div>
              </div>
              <div className='service-two-content service-five-content'>
                <h4 className='service-two-title service-five-title tw-text-10 fw-normal border-bottom border-neutral tw-pb-4 tw-mb-2'>
                  <Link href='/room-details'>Royal Deluxe Room</Link>
                </h4>
                <div className='service-five-list'>
                  <ul className='d-flex tw-gap-6'>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='service-two-wrapper service-five-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.7'
            >
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/room-details'>
                  <Image
                    width={548}
                    height={482}
                    src='/assets/images/thumbs/service-five-thumb3.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 top-0 tw-mt-5 tw-ms-4'>
                  <p className='bg-main-600 tw-rounded-3xl tw-py-1 tw-px-5 fw-medium text-heading mb-0'>
                    <span>
                      <i className='ph ph-star' />
                    </span>{" "}
                    4,93
                  </p>
                </div>
                <div className='position-absolute end-0 bottom-0 tw-mb-5 tw-me-4'>
                  <span className='bg-white tw-rounded-3xl tw-text-2xl fw-normal tw-py-1 tw-px-6 text-heading'>
                    $599
                  </span>
                </div>
              </div>
              <div className='service-two-content service-five-content'>
                <h4 className='service-two-title service-five-title tw-text-10 fw-normal border-bottom border-neutral tw-pb-4 tw-mb-2'>
                  <Link href='/room-details'>Presidential Suite</Link>
                </h4>
                <div className='service-five-list'>
                  <ul className='d-flex tw-gap-6'>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='service-two-wrapper service-five-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.3'
            >
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/room-details'>
                  <Image
                    width={548}
                    height={482}
                    src='/assets/images/thumbs/service-five-thumb4.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 top-0 tw-mt-5 tw-ms-4'>
                  <p className='bg-main-600 tw-rounded-3xl tw-py-1 tw-px-5 fw-medium text-heading mb-0'>
                    <span>
                      <i className='ph ph-star' />
                    </span>{" "}
                    4,93
                  </p>
                </div>
                <div className='position-absolute end-0 bottom-0 tw-mb-5 tw-me-4'>
                  <span className='bg-white tw-rounded-3xl tw-text-2xl fw-normal tw-py-1 tw-px-6 text-heading'>
                    $599
                  </span>
                </div>
              </div>
              <div className='service-two-content service-five-content'>
                <h4 className='service-two-title service-five-title tw-text-10 fw-normal border-bottom border-neutral tw-pb-4 tw-mb-2'>
                  <Link href='/room-details'>Presidential Suite</Link>
                </h4>
                <div className='service-five-list'>
                  <ul className='d-flex tw-gap-6'>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='service-two-wrapper service-five-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.5'
            >
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/room-details'>
                  <Image
                    width={548}
                    height={482}
                    src='/assets/images/thumbs/service-five-thumb5.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 top-0 tw-mt-5 tw-ms-4'>
                  <p className='bg-main-600 tw-rounded-3xl tw-py-1 tw-px-5 fw-medium text-heading mb-0'>
                    <span>
                      <i className='ph ph-star' />
                    </span>{" "}
                    4,93
                  </p>
                </div>
                <div className='position-absolute end-0 bottom-0 tw-mb-5 tw-me-4'>
                  <span className='bg-white tw-rounded-3xl tw-text-2xl fw-normal tw-py-1 tw-px-6 text-heading'>
                    $599
                  </span>
                </div>
              </div>
              <div className='service-two-content service-five-content'>
                <h4 className='service-two-title service-five-title tw-text-10 fw-normal border-bottom border-neutral tw-pb-4 tw-mb-2'>
                  <Link href='/room-details'>Royal Deluxe Room</Link>
                </h4>
                <div className='service-five-list'>
                  <ul className='d-flex tw-gap-6'>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-6'>
            <div
              className='service-two-wrapper service-five-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.7'
            >
              <div className='service-two-thumb position-relative z-1 tw-mb-7'>
                <Link href='/room-details'>
                  <Image
                    width={548}
                    height={482}
                    src='/assets/images/thumbs/service-five-thumb6.jpg'
                    alt='thumb'
                  />
                </Link>
                <div className='position-absolute start-0 top-0 tw-mt-5 tw-ms-4'>
                  <p className='bg-main-600 tw-rounded-3xl tw-py-1 tw-px-5 fw-medium text-heading mb-0'>
                    <span>
                      <i className='ph ph-star' />
                    </span>{" "}
                    4,93
                  </p>
                </div>
                <div className='position-absolute end-0 bottom-0 tw-mb-5 tw-me-4'>
                  <span className='bg-white tw-rounded-3xl tw-text-2xl fw-normal tw-py-1 tw-px-6 text-heading'>
                    $599
                  </span>
                </div>
              </div>
              <div className='service-two-content service-five-content'>
                <h4 className='service-two-title service-five-title tw-text-10 fw-normal border-bottom border-neutral tw-pb-4 tw-mb-2'>
                  <Link href='/room-details'>Presidential Suite</Link>
                </h4>
                <div className='service-five-list'>
                  <ul className='d-flex tw-gap-6'>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      900 Sqft
                    </li>
                    <li className='d-inline-flex align-items-center tw-gap-1 fw-medium tw-text-505 text-heading'>
                      <span className='d-inline-block lh-1'>
                        <Image
                          width={31}
                          height={31}
                          src='/assets/images/icons/service-fix-icon1.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      4 guest
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOne;
