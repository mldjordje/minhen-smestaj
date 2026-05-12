import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const BlogThree: FC = () => {
  return (
    <section className='py-120 blog_three'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-9'>
            <div className='section-two-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-two-subtitle tw-text-xl text-uppercase text-main-three-800 tw-mb-6'>
                Find unique homes in vibrant places.
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-mb-3 tw-char-animation'>
                We're Dedicated To Providing You Unforgettable Expierence
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-5 col-lg-6'>
            <div
              className='blog-three-wrapepr tw-mb-7 tw_fade_anim'
              data-delay='.3'
            >
              <div className='blog-three-thumb tw-mb-10'>
                <Link href='/blog-details'>
                  <Image
                    width={570}
                    height={443}
                    src='/assets/images/thumbs/blog-three-thumb1.jpg'
                    alt='thumb'
                  />
                </Link>
              </div>
              <div>
                <h4 className='blog-three-title tw-text-2xl fw-normal tw-mb-5'>
                  <Link href='/blog-details'>
                    Innovations in Cardiac Care: What’s Next for Heart Health?
                  </Link>
                </h4>
                <div>
                  <Link
                    className='fw-bold d-inline-flex align-items-center tw-gap-2'
                    style={{ color: "#095091" }}
                    href='/blog-details'
                  >
                    Learn More{" "}
                    <span>
                      <i className='ph ph-arrow-up-right' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-7 col-lg-6'>
            <div
              className='blog-three-wrapepr tw-mb-7 tw_fade_anim'
              data-delay='.5'
            >
              <div className='blog-three-thumb tw-mb-9'>
                <Link href='/blog-details'>
                  <Image
                    width={792}
                    height={647}
                    src='/assets/images/thumbs/blog-three-thumb2.jpg'
                    alt='thumb'
                  />
                </Link>
              </div>
              <div>
                <h4 className='blog-three-title tw-text-9 fw-normal tw-mb-5'>
                  <Link href='/blog-details'>
                    The Importance of Regular Heart Screenings and Checkups
                  </Link>
                </h4>
                <div>
                  <Link
                    className='fw-bold d-inline-flex align-items-center tw-gap-2'
                    style={{ color: "#095091" }}
                    href='/blog-details'
                  >
                    Learn More{" "}
                    <span>
                      <i className='ph ph-arrow-up-right' />
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

export default BlogThree;
