import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const DestinationDetailsInner: FC = () => {
  return (
    <>
      <div className='pb-120 bg_2 pt-120'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-8'>
              <div className='destination-details-wrapper main'>
                <div className='tw-mb-14 tw_fade_anim'>
                  <p className='destination-details-user d-flex align-items-center tw-gap-3 text-paragraph-color tw-mb-3'>
                    <span className='te-text-2xl'>
                      <i className='ph ph-user' />
                    </span>{" "}
                    Mehedii .Ha /
                  </p>
                  <h4 className='tw-text-10 fw-normal tw-mb-8 tw-char-animation'>
                    Explore Switzerland for more fun!
                  </h4>
                  <p>
                    Lorem Ipsum proin gravida nibh vel velit auctor aliqueenean
                    sollicitudin.
                  </p>
                </div>
                <div className='tw-mb-10 tw_fade_anim'>
                  <h6 className='tw-text-2xl tw-mb-5 fw-normal'>
                    Description:
                  </h6>
                  <p className='destination-details-paragraph text-paragraph-color text-capitalize'>
                    Description It is a long established fact that a reader will
                    be distrac by any websites look for ways mornings of spring
                    prevent AdBlock from blocking annoying ads. As a result,
                    we've focused on improving our funct so that we can overcome
                    these anti-ad blocking attempts. Of course, you can help us
                    continue improve our ad blocking ability by reporting any
                    time you run into a website that won't allow you to block
                    the readable content of a page when looking at its layout.
                    It is a long established fact
                  </p>
                </div>
                <div className='d-flex align-items-center tw-gap-8 tw-mb-11'>
                  <div className='imgage tw_fade_anim' data-delay='.3'>
                    <Image
                      width={544}
                      height={352}
                      src='/assets/images/thumbs/destination-details-thumb1.jpg'
                      alt='thumb'
                    />
                  </div>
                  <div className='imgage tw_fade_anim' data-delay='.5'>
                    <Image
                      width={314}
                      height={352}
                      src='/assets/images/thumbs/destination-details-thumb2.jpg'
                      alt='thumb'
                    />
                  </div>
                </div>
                <div className='tw-mb-6 tw_fade_anim'>
                  <h6 className='tw-text-2xl tw-mb-5 fw-normal'>
                    Description:
                  </h6>
                  <p className='destination-details-paragraph text-paragraph-color text-capitalize'>
                    Description It is a long established fact that a reader will
                    be distrac by any websites look for ways mornings of spring
                    prevent AdBlock from blocking annoying ads. As a result,
                    we've focused on improving our funct so that we can overcome
                    these anti-ad blocking attempts. Of course, you can help us
                    continue improve our ad blocking ability by reporting any
                    time you run into a website that won't allow you to block
                    the readable content of a page when looking at its layout.
                    It is a long established fact
                  </p>
                </div>
                <div className='destination-details-list tw-mb-10 tw_fade_anim'>
                  <ul>
                    <li className='font-heading fw-semibold tw-mb-7 tw-ps-2 tw-ms-5'>
                      View the City Walls
                    </li>
                    <li className='font-heading fw-semibold tw-mb-7 tw-ps-2 tw-ms-5'>
                      Hiking in the forest
                    </li>
                    <li className='font-heading fw-semibold tw-mb-7 tw-ps-2 tw-ms-5'>
                      Discover the famous view point “The Lark”
                    </li>
                    <li className='font-heading fw-semibold tw-mb-7 tw-ps-2 tw-ms-5'>
                      Sunset on the cruise
                    </li>
                  </ul>
                </div>
                <div className='d-flex align-items-center tw-gap-7 tw-mb-10'>
                  <div className='image tw_fade_anim' data-delay='.3'>
                    <Image
                      width={289}
                      height={278}
                      src='/assets/images/thumbs/destination-details-thumb3.jpg'
                      alt='thumb'
                    />
                  </div>
                  <div className='image tw_fade_anim' data-delay='.5'>
                    <Image
                      width={289}
                      height={278}
                      src='/assets/images/thumbs/destination-details-thumb4.jpg'
                      alt='thumb'
                    />
                  </div>
                  <div className='image tw_fade_anim' data-delay='.7'>
                    <Image
                      width={290}
                      height={278}
                      src='/assets/images/thumbs/destination-details-thumb5.jpg'
                      alt='thumb'
                    />
                  </div>
                </div>
                <div className='tw-mb-6 tw_fade_anim'>
                  <h6 className='tw-text-2xl tw-mb-5 fw-normal'>
                    Municipalities
                  </h6>
                  <p className='destination-details-paragraph text-paragraph-color text-capitalize tw-mb-10'>
                    Description It is a long established fact that a reader will
                    be distrac by any websites look for ways mornings of spring
                    prevent AdBlock from blocking annoying ads. As a result,
                    we've focused on improving our funct so that we can overcome
                    these anti-ad blocking attempts. Of course, you can help us
                    continue improve our ad blocking ability by reporting any
                    time you run into a website that won't allow you to block
                    the readable content of a page when looking at its layout.
                    It is a long established fact
                  </p>
                  <p className='destination-details-paragraph text-paragraph-color text-capitalize tw-mb-6'>
                    Description It is a long established fact that a reader will
                    be distrac by any websites look for ways mornings of spring
                    prevent AdBlock from blocking annoying ads. As a result,
                    we've focused on improving our funct so that we can overcome
                    these anti-ad blocking attempts. Of course, you can help us
                    continue
                  </p>
                </div>
                <div className='destination-details-check tw-mb-14 tw_fade_anim'>
                  <ul>
                    <li className='d-inline-flex align-items-center tw-gap-3 text-black fw-medium tw-mb-7'>
                      <span className='d-inline-block lh-1 text-main-600 tw-text-xl'>
                        <i className='ph-bold ph-check' />
                      </span>{" "}
                      Praesent vulputate at enim sit amet mattis lobortis ante
                      pulvinar at diam
                    </li>
                    <li className='d-inline-flex align-items-center tw-gap-3 text-black fw-medium tw-mb-7'>
                      <span className='d-inline-block lh-1 text-main-600 tw-text-xl'>
                        <i className='ph-bold ph-check' />
                      </span>{" "}
                      Donec ut lobortis ante, non lobortis ante imperdiet est
                      volutpat in diam erat
                    </li>
                    <li className='d-inline-flex align-items-center tw-gap-3 text-black fw-medium tw-mb-7'>
                      <span className='d-inline-block lh-1 text-main-600 tw-text-xl'>
                        <i className='ph-bold ph-check' />
                      </span>{" "}
                      Donec ut lobortis ante, non lobortis ante imperdiet est
                      volutpat in diam erat
                    </li>
                  </ul>
                </div>
                <div className='d-flex align-items-center tw-gap-7'>
                  <div className='image tw_fade_anim' data-delay='.3'>
                    <Image
                      width={446}
                      height={352}
                      src='/assets/images/thumbs/destination-details-thumb6.jpg'
                      alt='thumb'
                    />
                  </div>
                  <div className='image tw_fade_anim' data-delay='.5'>
                    <Image
                      width={446}
                      height={352}
                      src='/assets/images/thumbs/destination-details-thumb7.jpg'
                      alt='thumb'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-7'>
              <div className='destination-details-sideber tw-ms-8'>
                <div className='search bg-white tw-pt-9 tw-pb-7 tw-px-11 tw-mb-8 tw-rounded-xl tw_fade_anim'>
                  <h6 className='tw-text-505 fw-normal text-capitalize tw-mb-3 border-start border-3 border-main-600 tw-ps-2'>
                    search here
                  </h6>
                  <form action='#' className='position-relative'>
                    <input
                      type='text'
                      className='tw-ps-4 tw-pe-12 tw-py-4 bg-neutral-100 tw-rounded-xl tw-placeholder-text-main-two-600 focus-outline-0 w-100 tw-placeholder-transition-2 focus-tw-placeholder-text-hidden shadow-none flex-grow-1 border border-white focus-border-main-600 tw-duration-300'
                      placeholder='Search here...'
                    />
                    <button
                      type='submit'
                      className='position-absolute top-50 tw--translate-y-50 tw-end-0 text-heading tw-text-xl d-flex tw-me-5'
                    >
                      <i className='ph-bold ph-magnifying-glass' />
                    </button>
                  </form>
                </div>
                <div className='recent bg-white tw-pt-9 tw-pb-7 tw-px-8 tw-mb-8 tw-rounded-xl tw_fade_anim'>
                  <h6 className='tw-text-505 fw-normal text-capitalize tw-mb-5 border-start border-3 border-main-600 tw-ps-2'>
                    Recent News
                  </h6>
                  <div className='d-flex align-items-center tw-gap-8 tw-mb-7'>
                    <div className='tw-w-106-px w-100'>
                      <Link
                        href='/blog-details'
                        className='tw-rounded-md overflow-hidden d-block'
                      >
                        <Image
                          width={107}
                          height={87}
                          src='/assets/images/thumbs/blog-recent-img1.jpg'
                          alt=''
                          className='w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                        />
                      </Link>
                    </div>
                    <div>
                      <div>
                        <p className='d-inline-flex align-items-center tw-gap-2 tw-mb-2 tw-text-sm'>
                          <span className='d-inline-block lh-1 text-main-600'>
                            <i className='ph ph-calendar' />
                          </span>{" "}
                          Jan 23,2022
                        </p>
                      </div>
                      <div>
                        <h6 className='tw-text-lg fw-normal tw-mb-2'>
                          <Link href='#'>
                            Budget Issues Force The Our To Become
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center tw-gap-8 tw-mb-7'>
                    <div className='tw-w-106-px w-100'>
                      <Link
                        href='/blog-details'
                        className='tw-rounded-md overflow-hidden d-block'
                      >
                        <Image
                          width={107}
                          height={86}
                          src='/assets/images/thumbs/blog-recent-img2.jpg'
                          alt=''
                          className='w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                        />
                      </Link>
                    </div>
                    <div>
                      <div>
                        <p className='d-inline-flex align-items-center tw-gap-2 tw-mb-2 tw-text-sm'>
                          <span className='d-inline-block lh-1 text-main-600'>
                            <i className='ph ph-calendar' />
                          </span>{" "}
                          Jan 23,2022
                        </p>
                      </div>
                      <div>
                        <h6 className='tw-text-lg fw-normal tw-mb-2'>
                          <Link href='#'>
                            Financial Struggles Force the to Evolve
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center tw-gap-8'>
                    <div className='tw-w-106-px w-100'>
                      <Link
                        href='/blog-details'
                        className='tw-rounded-md overflow-hidden d-block'
                      >
                        <Image
                          width={107}
                          height={86}
                          src='/assets/images/thumbs/blog-recent-img3.jpg'
                          alt=''
                          className='w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500'
                        />
                      </Link>
                    </div>
                    <div>
                      <div>
                        <p className='d-inline-flex align-items-center tw-gap-2 tw-mb-2 tw-text-sm'>
                          <span className='d-inline-block lh-1 text-main-600'>
                            <i className='ph ph-calendar' />
                          </span>{" "}
                          Jan 23,2022
                        </p>
                      </div>
                      <div>
                        <h6 className='tw-text-lg fw-normal tw-mb-2'>
                          <Link href='#'>
                            Budget Constraints Push the Team to Adapt
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='catagori bg-white tw-pt-9 tw-pb-7 tw-px-11 tw-mb-8 tw-rounded-xl tw_fade_anim'>
                  <h6 className='tw-text-505 fw-normal text-capitalize tw-mb-10 border-start border-3 border-main-600 tw-ps-2'>
                    Catagories
                  </h6>
                  <div>
                    <ul className='catagori-link'>
                      <li className='border border-neutral-100 tw-py-3 tw-px-4 tw-rounded-lg tw-mb-8 hover-bg-main-600 hover-border-main-600 cursor-pointer tw-transition'>
                        <Link
                          className='d-flex align-items-center justify-content-between text-body'
                          href='#'
                        >
                          Neurosergery <span>03</span>
                        </Link>
                      </li>
                      <li className='border border-neutral-100 tw-py-3 tw-px-4 tw-rounded-lg tw-mb-8 hover-bg-main-600 hover-border-main-600 cursor-pointer tw-transition'>
                        <Link
                          className='d-flex align-items-center justify-content-between text-body'
                          href='#'
                        >
                          Orthopedic <span>03</span>
                        </Link>
                      </li>
                      <li className='border border-neutral-100 tw-py-3 tw-px-4 tw-rounded-lg tw-mb-8 hover-bg-main-600 hover-border-main-600 cursor-pointer tw-transition'>
                        <Link
                          className='d-flex align-items-center justify-content-between text-body'
                          href='#'
                        >
                          Medicine <span>03</span>
                        </Link>
                      </li>
                      <li className='border border-neutral-100 tw-py-3 tw-px-4 tw-rounded-lg tw-mb-8 hover-bg-main-600 hover-border-main-600 cursor-pointer tw-transition'>
                        <Link
                          className='d-flex align-items-center justify-content-between text-body'
                          href='#'
                        >
                          Dental <span>03</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='sidebar-info bg-main-600 tw-rounded-lg tw-pt-24 tw-pb-8 tw-px-10 tw_fade_anim'>
                  <div>
                    <h4 className='tw-text-8 fw-normal text-capitalize font-sofia text-white tw-mb-6'>
                      Special Discount Offering
                    </h4>
                    <div>
                      <Link
                        className='d-flex align-items-center tw-gap-3 tw-text-sm text-main-two-600'
                        href='#'
                      >
                        Booking Now{" "}
                        <span className='d-inline-block lh-1'>
                          <i className='ph ph-arrow-right' />
                        </span>
                      </Link>
                    </div>
                    <div>
                      <Image
                        width={307}
                        height={213}
                        src='/assets/images/thumbs/destination-details.png'
                        alt='destination'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationDetailsInner;
