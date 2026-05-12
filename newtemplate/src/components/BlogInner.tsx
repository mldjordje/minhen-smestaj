import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const BlogInner: FC = () => {
  return (
    <section className='blog-area py-120' style={{ background: "#f7f7ef" }}>
      <div className='container'>
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
                    eal stories from the road where every journey leaves a mark
                  </Link>
                </h4>
                <div className='tw-mb-10'>
                  <Link
                    className='d-inline-flex align-items-center tw-gap-2 text-heading'
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
          <div className='col-xl-6 col-lg-9 tw_fade_anim' data-delay='.5'>
            <div className='row'>
              <div className='col-xl-12'>
                <div className='blog-wrapper-sm border border-main-600 tw-p-8 tw-rounded-2xl tw-mb-7 d-flex align-items-center tw-gap-10'>
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
                          className='d-inline-flex align-items-center tw-gap-2 text-heading'
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
                <div className='blog-wrapper-sm border border-main-600 tw-p-8 tw-rounded-2xl tw-mb-7 d-flex align-items-center tw-gap-10'>
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
                          className='d-inline-flex align-items-center tw-gap-2 text-heading'
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
  );
};

export default BlogInner;
