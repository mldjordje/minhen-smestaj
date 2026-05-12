import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const AdvanceArea: FC = () => {
  return (
    <div className='advance-area py-120 position-relative z-1'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-11'>
            <div className='section-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                Crafting Memorable Experiences
              </h6>
              <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                We're Dedicated To Providing You Unforgettable Experience.
                Whether You're Here For Business Or Leisure,
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='advance-wrap tw_fade_anim'>
              {/* item 1 */}
              <div className='advance-item'>
                <div className='advance-thumb'>
                  <Image
                    width={272}
                    height={344}
                    src='/assets/images/thumbs/advance-thumb1.jpg'
                    alt='thumb'
                  />
                </div>
                <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                  <h6 className='tw-text-2xl fw-normal mb-0'>
                    <Link href='/service-details'>Coxsbazar</Link>
                  </h6>
                  <Link
                    className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                    href='/service-details'
                  >
                    <span>
                      <i className='ph ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
              {/* item 2 */}
              <div className='advance-item'>
                <div className='advance-thumb'>
                  <Image
                    width={271}
                    height={343}
                    src='/assets/images/thumbs/advance-thumb2.jpg'
                    alt='thumb'
                  />
                </div>
                <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                  <h6 className='tw-text-2xl fw-normal mb-0'>
                    <Link href='/service-details'>Bandarban</Link>
                  </h6>
                  <Link
                    className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                    href='/service-details'
                  >
                    <span>
                      <i className='ph ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
              {/* item 3 */}
              <div className='advance-item'>
                <div className='advance-thumb'>
                  <Image
                    width={271}
                    height={343}
                    src='/assets/images/thumbs/advance-thumb3.jpg'
                    alt='thumb'
                  />
                </div>
                <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                  <h6 className='tw-text-2xl fw-normal mb-0'>
                    <Link href='/service-details'>sylhet</Link>
                  </h6>
                  <Link
                    className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                    href='/service-details'
                  >
                    <span>
                      <i className='ph ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
              {/* item 4 */}
              <div className='advance-item'>
                <div className='advance-thumb'>
                  <Image
                    width={271}
                    height={343}
                    src='/assets/images/thumbs/advance-thumb4.jpg'
                    alt='thumb'
                  />
                </div>
                <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                  <h6 className='tw-text-2xl fw-normal mb-0'>
                    <Link href='/service-details'>Cumilla</Link>
                  </h6>
                  <Link
                    className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                    href='/service-details'
                  >
                    <span>
                      <i className='ph ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
              {/* item 5 */}
              <div className='advance-item'>
                <div className='advance-thumb'>
                  <Image
                    width={271}
                    height={343}
                    src='/assets/images/thumbs/advance-thumb5.jpg'
                    alt='thumb'
                  />
                </div>
                <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                  <h6 className='tw-text-2xl fw-normal mb-0'>
                    <Link href='/service-details'>Dhaka</Link>
                  </h6>
                  <Link
                    className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading hover-bg-main-600 hover-border-main-600 hover-text-heading'
                    href='/service-details'
                  >
                    <span>
                      <i className='ph ph-arrow-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceArea;
