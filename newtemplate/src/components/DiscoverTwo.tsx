"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const DiscoverTwo = () => {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(
      ".feature-four-list-wrap .feature-four-list-item",
    );

    const thumb = document.getElementById("feature-four-thumb");

    if (!items.length || !thumb) return;

    const handleMouseEnter = function (this: HTMLElement) {
      const relClass = this.getAttribute("rel");
      if (!relClass) return;

      // remove all classes and add rel class
      thumb.className = "";
      thumb.classList.add(relClass);

      // active state
      items.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    };

    items.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter);
      });
    };
  }, []);
  return (
    <section className='py-120 bg-white'>
      <div className='container'>
        <div className='row justify-content-between align-items-center tw-mb-14'>
          <div className='col-xl-8 col-lg-8'>
            <div
              className='section-two-wrapper tw-mb-10 tw_fade_anim'
              data-delay='.3'
            >
              <h6 className='section-two-subtitle tw-text-xl text-neutral-800 text-uppercase tw-mb-6'>
                Discover Beauty Through Our Lens
              </h6>
              <h2 className='section-two-title tw-char-animation tw-text-16 fw-normal'>
                Moments Captured By Team Explore Our Gallery Seen
              </h2>
            </div>
          </div>
          <div className='col-xl-3 col-lg-4'>
            <div
              className='gallery-two-btn d-flex justify-content-end tw_fade_anim'
              data-delay='.5'
            >
              <Link
                className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-rounded-lg tw-gap-2'
                href='/contact'
              >
                Booking today{" "}
                <span className='d-inline-block lh-1 tw-text-lg'>
                  <i className='ph ph-arrow-up-right' />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-5'>
            <div
              className='feature-four-list-thumb-wrap position-relative tw_fade_anim'
              data-delay='.3'
            >
              <div
                id='feature-four-thumb'
                className='feature-four-list-thumb-1'
              >
                <Image
                  width={513}
                  height={554}
                  className='feature-four-list-thumb-1'
                  src='/assets/images/thumbs/feature-four-thumb1.png'
                  alt='thumb'
                />
                <Image
                  width={421}
                  height={422}
                  className='feature-four-list-thumb-2'
                  src='/assets/images/thumbs/feature-four-thumb2.png'
                  alt='thumb'
                />
                <Image
                  width={660}
                  height={440}
                  className='feature-four-list-thumb-3'
                  src='/assets/images/thumbs/feature-four-thumb3.png'
                  alt='thumb'
                />
                <Image
                  width={660}
                  height={440}
                  className='feature-four-list-thumb-4'
                  src='/assets/images/thumbs/feature-four-thumb4.png'
                  alt='thumb'
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-7'>
            <div
              className='feature-four-list-wrap tw_fade_anim'
              data-delay='.5'
            >
              <div
                className='feature-four-list-item position-relative cursor-pointer tw-pt-4 tw-pb-6'
                rel='feature-four-list-thumb-1'
              >
                <div className='feature-four-list-content-left'>
                  <h4 className='feature-four-title tw-text-140 fw-normal tw-mb-5'>
                    National Museum
                  </h4>
                  <h6 className='tw-text-xl fw-normal text-heading'>
                    10 min walk
                  </h6>
                </div>
              </div>
              <div
                className='feature-four-list-item position-relative cursor-pointer tw-pt-4 tw-pb-6'
                rel='feature-four-list-thumb-2'
              >
                <div className='feature-four-list-content-left'>
                  <h4 className='feature-four-title tw-text-140 fw-normal tw-mb-5'>
                    Central Shopping Mall
                  </h4>
                  <h6 className='tw-text-xl fw-normal text-heading'>500m</h6>
                </div>
              </div>
              <div
                className='feature-four-list-item position-relative cursor-pointer tw-pt-4 tw-pb-6'
                rel='feature-four-list-thumb-3'
              >
                <div className='feature-four-list-content-left'>
                  <h4 className='feature-four-title tw-text-140 fw-normal tw-mb-5'>
                    Riverside Park
                  </h4>
                  <h6 className='tw-text-xl fw-normal text-heading'>
                    10 min walk
                  </h6>
                </div>
              </div>
              <div
                className='feature-four-list-item position-relative cursor-pointer tw-pt-4 tw-pb-6'
                rel='feature-four-list-thumb-4'
              >
                <div className='feature-four-list-content-left'>
                  <h4 className='feature-four-title tw-text-140 fw-normal tw-mb-5'>
                    Metro Station
                  </h4>
                  <h6 className='tw-text-xl fw-normal text-heading'>
                    10 min walk
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverTwo;
