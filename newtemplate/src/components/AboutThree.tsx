import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const AboutThree: FC = () => {
  return (
    <section className='about-three-area py-120'>
      <div className='container'>
        <div className='row align-items-center tw-mb-14'>
          <div className='col-xl-10'>
            <div
              className='section-two-wrapper tw-mb-144 tw_fade_anim'
              data-delay='.3'
            >
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-main-three-600 tw-mb-6'>
                About our hotel
              </h6>
              <h2 className='section-two-title tw-text-15 fw-normal tw-char-animation'>
                Welcome To Ocean Breeze Beach Resort Your Perfect Escape To
                Paradise. Nestled Along The Pristine Shores And Surrounded By
                Crystal-clear Waters.{" "}
              </h2>
            </div>
          </div>
          <div className='col-xl-2'>
            <div className='about-three-button' data-delay='.5'>
              <Link
                className='hover-btn-circle hover-btn-item hover-btn tw-text-lg fw-semibold tw-w-180-px tw-h-180-px lh-1 d-inline-flex align-items-center justify-content-center flex-column bg-main-three-600 text-white rounded-circle position-relative z-1 overflow-hidden'
                href='/contact'
              >
                <span className='tw-text-2xl tw-mb-1 d-inline-block'>
                  <i className='ph ph-arrow-up-right' />
                </span>
                About us
                <i className='hover-btn-circle-dot' />
              </Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-4' />
          <div className='col-xl-5'>
            <div className='pb-120 tw-me-12'>
              <p className='tw-text-lg fw-medium'>
                At SparkleClean, we believe a clean space is a happy space. With
                years of experience in residential and commercial cleaning our
                mission is to deliver top-quality services tha health...
              </p>
            </div>
          </div>
          <div className='col-xl-3' />
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-xl-12'>
            <div className='about-three-wrapper d-flex justify-content-center tw-gap-8 tw-mt-8'>
              <div className='about-three-thumb-1'>
                <Image
                  width={579}
                  height={471}
                  src='/assets/images/thumbs/about-three-thumb1.jpg'
                  alt='thumb'
                />
              </div>
              <div className='about-three-thumb-2'>
                <Image
                  width={773}
                  height={537}
                  src='/assets/images/thumbs/about-three-thumb2.jpg'
                  alt='thumb'
                />
              </div>
              <div className='about-three-thumb-3'>
                <Image
                  width={382}
                  height={377}
                  src='/assets/images/thumbs/about-three-thumb3.jpg'
                  alt='thumb'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutThree;
