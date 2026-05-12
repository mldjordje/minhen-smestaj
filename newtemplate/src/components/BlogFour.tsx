import Image from "next/image";
import Link from "next/link";

const BlogFour = () => {
  return (
    <div className='blog-four-area bg-neutral-300'>
      <section className='blog-area bg-neutral-300 py-120'>
        <div className='container'>
          <div className='row justify-content-between align-items-center'>
            <div className='col-xl-8 col-lg-8'>
              <div
                className='section-wrapper tw-mb-14 tw_fade_anim'
                data-delay='.3'
              >
                <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                  our Guide to Luxury Travel
                </h6>
                <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                  From Our Journal: Travel Tips, Stories &amp; More
                </h2>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4'>
              <div className='service-top-button tw_fade_anim' data-delay='.5'>
                <Link
                  className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                  href='/blog-details'
                >
                  Booking today{" "}
                  <span className='d-inline-block lh-1 tw-text-lg'>
                    <i className='ph ph-arrow-up-right' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className='row align-items-center'>
            <div className='col-xl-6 col-lg-9'>
              <div
                className='border border-main-600 tw-p-10 tw-rounded-2xl tw-mb-7 tw_fade_anim'
                data-delay='.3'
              >
                <div className='blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6'>
                  <span className='bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading'>
                    02 Apr 2021
                  </span>
                  <span className='text-heading'>Comments (03)</span>
                </div>
                <div>
                  <h4 className='blog-title tw-text-9 fw-normal text-capitalize tw-mb-5'>
                    <Link href='/blog-details'>
                      eal stories from the road where every journey leaves a
                      mark
                    </Link>
                  </h4>
                  <div className='tw-mb-10'>
                    <Link
                      className='blog-btn d-inline-flex align-items-center tw-gap-2 text-heading hover-text-main-600'
                      href='/blog-details'
                    >
                      Read More{" "}
                      <span className='blog-btn-arrow tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center rounded-circle tw-text-sm'>
                        <i className='ph ph-arrow-right' />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className='tw-rounded-2xl overflow-hidden'>
                  <Link className='d-block' href='/blog-details'>
                    <Image
                      width={603}
                      height={304}
                      className='w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500 tw-rounded-2xl'
                      src='/assets/images/thumbs/blog-thumb1.jpg'
                      alt='thumb'
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-9'>
              <div className='row'>
                <div className='col-xl-12'>
                  <div
                    className='blog-wrapper-sm border border-main-600 tw-p-8 tw-rounded-2xl tw-mb-7 d-flex align-items-center tw-gap-10 tw_fade_anim'
                    data-delay='.5'
                  >
                    <div className='blog-thumb overflow-hidden tw-rounded-2xl'>
                      <Link className='d-block' href='/blog-details'>
                        <Image
                          width={209}
                          height={250}
                          className='w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500 tw-rounded-2xl'
                          src='/assets/images/thumbs/blog-thumb2.jpg'
                          alt='thumb'
                        />
                      </Link>
                    </div>
                    <div>
                      <div className='blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6'>
                        <span className='bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading'>
                          02 Apr 2021
                        </span>
                        <span className='text-heading'>Comments (03)</span>
                      </div>
                      <div>
                        <h4 className='blog-title-sm tw-text-7 fw-normal text-capitalize tw-mb-5'>
                          <Link href='/blog-details'>
                            eal stories from the road where every journey...
                          </Link>
                        </h4>
                        <div className=''>
                          <Link
                            className='blog-btn d-inline-flex align-items-center tw-gap-2 text-heading hover-text-main-600'
                            href='/blog-details'
                          >
                            Read More{" "}
                            <span className='blog-btn-arrow tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center rounded-circle tw-text-sm'>
                              <i className='ph ph-arrow-right' />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-12'>
                  <div
                    className='blog-wrapper-sm border border-main-600 tw-p-8 tw-rounded-2xl tw-mb-7 d-flex align-items-center tw-gap-10 tw_fade_anim'
                    data-delay='.7'
                  >
                    <div className='blog-thumb overflow-hidden tw-rounded-2xl'>
                      <Link className='d-block' href='/blog-details'>
                        <Image
                          width={209}
                          height={250}
                          className='w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500 tw-rounded-2xl'
                          src='/assets/images/thumbs/blog-thumb3.jpg'
                          alt='thumb'
                        />
                      </Link>
                    </div>
                    <div>
                      <div className='blog-meta d-inline-flex align-items-center tw-gap-4 tw-mb-6'>
                        <span className='bg-main-600 fw-medium text-uppercase tw-rounded-3xl tw-py-1 tw-px-6 text-heading'>
                          02 Apr 2021
                        </span>
                        <span className='text-heading'>Comments (03)</span>
                      </div>
                      <div>
                        <h4 className='blog-title-sm tw-text-7 fw-normal text-capitalize tw-mb-5'>
                          <Link href='/blog-details'>
                            eal stories from the road where every journey...
                          </Link>
                        </h4>
                        <div className=''>
                          <Link
                            className='blog-btn d-inline-flex align-items-center tw-gap-2 text-heading hover-text-main-600'
                            href='/blog-details'
                          >
                            Read More{" "}
                            <span className='blog-btn-arrow tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center rounded-circle tw-text-sm'>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogFour;
