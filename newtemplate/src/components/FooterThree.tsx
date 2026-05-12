import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const FooterThree: FC = () => {
  return (
    <footer className='footer footer-three-area position-relative z-1 overflow-hidden'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-8'>
            <div className='mb-0 text-center tw-py-10 tw_fade_anim'>
              <Link href='/' className=''>
                <Image
                  width={202}
                  height={65}
                  src='/assets/images/logo/logo.png'
                  alt='Logo'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-center-space footer-three-center-space position-relative z-1'>
        <div className='container container-two'>
          <div className='footer-center-border tw-pt-4'>
            <div className='row gy-5'>
              <div
                className='col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 aos-init aos-animate'
                data-aos='fade-up'
                data-aos-duration={1200}
              >
                <div
                  className='footer-three-col-1 tw_fade_anim'
                  data-delay='.3'
                >
                  <ul className='d-flex flex-column tw-gap-4'>
                    <li>
                      <Link
                        href='#'
                        className='text-white tw-text-2xl hover-underline font-heading fw-normal hover-text-main-three-600'
                      >
                        About Hotel
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='#'
                        className='text-white tw-text-2xl hover-underline font-heading fw-normal hover-text-main-three-600'
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='#'
                        className='text-white tw-text-2xl hover-underline font-heading fw-normal hover-text-main-three-600'
                      >
                        Villas
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className='col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12 aos-init aos-animate'
                data-aos='fade-up'
                data-aos-duration={400}
              >
                <div
                  className='footer-three-col-2 tw_fade_anim'
                  data-delay='.5'
                >
                  <div className='footer-three-address text-center'>
                    <Link
                      className='footer-three-telk font-heading fw-normal tw-text-12 text-white hover-text-main-three-600'
                      href='tel:+01622 330-77-00'
                    >
                      +01622 330-77-00
                    </Link>
                    <Link
                      className='font-heading fw-normal tw-text-8 text-white d-block hover-text-main-three-600'
                      href='mailto:info@example.com'
                    >
                      info@example.com
                    </Link>
                  </div>
                  <div className='d-flex justify-content-between flex-wrap row-gap-3'>
                    <div>
                      <span className='text-white d-inline-flex justify-content-start'>
                        Ta-134/A, Gulshan Badda Link <br /> (+880)155 69569 365
                      </span>
                    </div>
                    <div>
                      <span className='text-white  d-inline-flex justify-content-end'>
                        Office Hours: 8AM - 11PM <br /> Sunday - Wekend Day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 aos-init aos-animate'
                data-aos='fade-up'
                data-aos-duration={600}
              >
                <div
                  className='footer-three-col-3 tw_fade_anim'
                  data-delay='.7'
                >
                  <ul className='d-inline-flex flex-column tw-gap-4 justify-content-end'>
                    <li>
                      <Link
                        href='#'
                        className='text-white tw-text-2xl hover-underline font-heading fw-normal hover-text-main-three-600'
                      >
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='#'
                        className='text-white tw-text-2xl hover-underline font-heading fw-normal hover-text-main-three-600'
                      >
                        Instagram
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='#'
                        className='text-white tw-text-2xl hover-underline font-heading fw-normal hover-text-main-three-600'
                      >
                        Pinterest
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        {/* bottom Footer */}
        <div className='footer-bottom tw-py-10'>
          <div className='container container-two'>
            <div className='footer-bottom-wrap d-flex align-items-center justify-content-between tw-gap-4 flex-wrap'>
              <p
                className='text--white text-line-1 fw-medium tw_fade_anim'
                data-delay='.3'
              >
                Copyright © 2025 by{" "}
                <Link className='text-main-three-600 hover-text-white' href='#'>
                  Wowtheme7
                </Link>
                . All Rights Reserved
              </p>
              <ul
                className='footer-bottom-social d-flex align-items-center tw-gap-6 aos-init tw_fade_anim'
                data-delay='.5'
              >
                <li>
                  <Link
                    href='https://www.facebook.com'
                    className='tw-w-8 tw-h-8 lh-1 d-inline-flex align-items-center tw-text-xs justify-content-center rounded-circle text-white border border-neutral-900 hover-bg-main-three-600 hover-text-white hover-border-main-three-600'
                  >
                    <i className='ph-bold ph-facebook-logo' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.twitter.com'
                    className='tw-w-8 tw-h-8 lh-1 d-inline-flex align-items-center tw-text-xs justify-content-center rounded-circle text-white border border-neutral-900 hover-bg-main-three-600 hover-text-white hover-border-main-three-600'
                  >
                    <i className='ph-bold ph-twitter-logo' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.linkedin.com'
                    className='tw-w-8 tw-h-8 lh-1 d-inline-flex align-items-center tw-text-xs justify-content-center rounded-circle text-white border border-neutral-900 hover-bg-main-three-600 hover-text-white hover-border-main-three-600'
                  >
                    <i className='ph-bold ph-instagram-logo' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.pinterest.com'
                    className='tw-w-8 tw-h-8 lh-1 d-inline-flex align-items-center tw-text-xs justify-content-center rounded-circle text-white border border-neutral-900 hover-bg-main-three-600 hover-text-white hover-border-main-three-600'
                  >
                    <i className='ph-bold ph-dribbble-logo' />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterThree;
