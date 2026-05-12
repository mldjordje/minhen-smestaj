import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const BlogDetailsInner: FC = () => {
  return (
    <section className='blog-grid-area tw-pb-10 pt-120 bg_2'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-11'>
            <div className='row'>
              <div className='col-xl-8'>
                <div>
                  <div className='tw-mb-14'>
                    <div className='position-relative z-1 tw-mb-7 tw_fade_anim'>
                      <Image
                        width={804}
                        height={473}
                        className='tw-rounded-2xl'
                        src='/assets/images/thumbs/blog-grid-thumb1.jpg'
                        alt='thumb'
                      />
                    </div>
                    <div className='tw-mb-4 d-flex align-items-center tw-gap-205 flex-wrap tw_fade_anim'>
                      <div className='d-flex align-items-center tw-gap-3'>
                        <span className='text-main-600 tw-text-lg'>
                          <i className='ph ph-user' />
                        </span>
                        <span className='text-main-two-600 tw-text-sm'>
                          Mehedii .H
                        </span>
                      </div>
                      <span className='tw-w-205 border border-main-two-600' />
                      <div className='d-flex align-items-center tw-gap-3'>
                        <span className='text-main-600 tw-text-lg'>
                          <i className='ph ph-chats-circle' />
                        </span>
                        <span className='text-main-two-600 tw-text-sm'>
                          Comments (03)
                        </span>
                      </div>
                      <span className='tw-w-205 border border-main-two-600' />
                      <div className='d-flex align-items-center tw-gap-3'>
                        <span className='text-main-600 tw-text-lg'>
                          <i className='ph ph-clock' />
                        </span>
                        <span className='text-main-two-600 tw-text-sm'>
                          3 min Read
                        </span>
                      </div>
                    </div>
                    <div className='tw-mb-8 tw_fade_anim'>
                      <h4 className='tw-text-8 fw-normal tw-mb-7'>
                        <Link href='/blog-details'>
                          The whimsically named Egg Canvas brainch{" "}
                        </Link>
                      </h4>
                      <p className='tw-text-lg tw-w-730-px fw-normal'>
                        he whimsically named Egg Canvas is the brainchild of
                        Erica Choi, a design director and photo grapher based in
                        York. Why the name “Egg Canvas Erica was inspired by her
                        Korean childhood nickname, which means egg, while
                        “canvas” medium with wh art is created. “Egg Canvas
                        therefore, is her life—creating beautiful things each
                        day a blank canvas.
                      </p>
                    </div>
                    <div className='tw_fade_anim'>
                      <p className='tw-text-lg tw-w-730-px fw-normal tw-mb-10'>
                        We have covered many special events such as fireworks,
                        fairs, parades, races, walks, awards ceremonies, fashion
                        shows, sporting events, and even a memorial service.
                      </p>
                      <p className='tw-text-lg tw-w-730-px fw-normal'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur vulputate vestibulum rhon cus, dolor eget
                        viverra pretium, dolor tellus aliquet nunc, vitae
                        ultricies erat elit eu lacus. Vestibulum non justo fun
                        consectetur, cursus ante, tincidunt sapien. Nulla quis
                        diam sit amet turpis interd enim. Vivamus fauc ex sed
                        nibh egestas elementum. Mauris et bibendum
                      </p>
                    </div>
                  </div>
                  <div className='blockquote bg-white tw-py-10 tw-ps-10 tw-pe-14 tw-rounded-lg tw-me-20 tw_fade_anim'>
                    <p className='tw-text-2xl text-heading font-heading fw-normal max-w-630-px'>
                      Your time is limited, so don’t waste it living someone
                      else’s life.Don’t be trapped by dogma – which is living
                      with the{" "}
                    </p>
                    <div className='tw-mt-6 d-flex align-items-center justify-content-between'>
                      <div className='d-flex align-items-center tw-gap-3'>
                        <span className='tw-w-405 border border-text-heading' />
                        <span className='fw-medium text-heading font-heading'>
                          John Mehedii
                        </span>
                      </div>
                      <span>
                        <Image
                          width={40}
                          height={29}
                          src='/assets/images/icons/blog-quate.svg'
                          alt='quate'
                        />
                      </span>
                    </div>
                  </div>
                  <div className='tw-mt-10 tw_fade_anim'>
                    <h4 className='tw-text-7 fw-normal tw-mb-8'>
                      Let our investment management team
                    </h4>
                    <div className='d-flex align-items-center flex-wrap justify-content-between flex-wrap-reverse tw-gap-4'>
                      <ul className='d-flex flex-column tw-gap-5 cursor-small'>
                        <li className='d-flex align-items-center tw-gap-4 group'>
                          <span className='tw-w-705 tw-h-705 common-shadow-seven bg-main-600 d-flex justify-content-center align-items-center rounded-circle text-white tw-text-sm group-hover-bg-main-600 group-hover-text-white tw-duration-500'>
                            <i className='ph-bold ph-check' />
                          </span>
                          <p className='text-neutral-1000'>
                            Lorem Ipsum generators on the tend to repeat.
                          </p>
                        </li>
                        <li className='d-flex align-items-center tw-gap-4 group'>
                          <span className='tw-w-705 tw-h-705 common-shadow-seven bg-main-600 d-flex justify-content-center align-items-center rounded-circle text-white tw-text-sm group-hover-bg-main-600 group-hover-text-white tw-duration-500'>
                            <i className='ph-bold ph-check' />
                          </span>
                          <p className='text-neutral-1000'>
                            {" "}
                            If you are going to use a passage.
                          </p>
                        </li>
                        <li className='d-flex align-items-center tw-gap-4 group'>
                          <span className='tw-w-705 tw-h-705 common-shadow-seven bg-main-600 d-flex justify-content-center align-items-center rounded-circle text-white tw-text-sm group-hover-bg-main-600 group-hover-text-white tw-duration-500'>
                            <i className='ph-bold ph-check' />
                          </span>
                          <p className='text-neutral-1000'>
                            Lorem Ipsum generators on the tend to repeat.
                          </p>
                        </li>
                        <li className='d-flex align-items-center tw-gap-4 group'>
                          <span className='tw-w-705 tw-h-705 common-shadow-seven bg-main-600 d-flex justify-content-center align-items-center rounded-circle text-white tw-text-sm group-hover-bg-main-600 group-hover-text-white tw-duration-500'>
                            <i className='ph-bold ph-check' />
                          </span>
                          <p className='text-neutral-1000'>
                            {" "}
                            If you are going to use a passage.
                          </p>
                        </li>
                        <li className='d-flex align-items-center tw-gap-4 group'>
                          <span className='tw-w-705 tw-h-705 common-shadow-seven bg-main-600 d-flex justify-content-center align-items-center rounded-circle text-white tw-text-sm group-hover-bg-main-600 group-hover-text-white tw-duration-500'>
                            <i className='ph-bold ph-check' />
                          </span>
                          <p className='text-neutral-1000'>
                            Lorem Ipsum generators on the tend to repeat.
                          </p>
                        </li>
                      </ul>
                      <div className='h-100'>
                        <Image
                          width={354}
                          height={254}
                          className='tw-rounded-lg'
                          src='/assets/images/thumbs/blog-details-thumb1.jpg'
                          alt='thumb'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='tw-my-16 tw_fade_anim'>
                    <div className='row gy-4 tw-mb-8'>
                      <div className='col-sm-6'>
                        <div>
                          <Image
                            width={426}
                            height={426}
                            src='/assets/images/thumbs/blog-details-thumb2.jpg'
                            alt='thumb'
                            className='tw-rounded-lg w-100 h-100 object-fit-cover'
                          />
                        </div>
                      </div>
                      <div className='col-sm-6'>
                        <div>
                          <Image
                            width={427}
                            height={426}
                            src='/assets/images/thumbs/blog-details-thumb3.jpg'
                            alt='thumb'
                            className='tw-rounded-lg w-100 h-100 object-fit-cover'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='tw-my-11 d-flex justify-content-between flex-wrap tw-gap-6 tw_fade_anim'>
                    <div className='d-flex align-items-center tw-gap-5'>
                      <span className='tw-text-xl text-heading font-heading fw-normal'>
                        Tag:
                      </span>
                      <div className='d-flex align-items-center flex-wrap tw-gap-3 cursor-small'>
                        <Link
                          href='/blog'
                          className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                        >
                          Hotel
                        </Link>
                        <Link
                          href='/blog'
                          className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                        >
                          HotelDeals
                        </Link>
                        <Link
                          href='/blog'
                          className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                        >
                          HotelOffers
                        </Link>
                      </div>
                    </div>
                    <div className='d-flex align-items-center tw-gap-5'>
                      <span className='tw-text-xl text-heading font-heading fw-normal'>
                        Share:
                      </span>
                      <ul className='d-flex align-items-center tw-gap-3 justify-content-center'>
                        <li>
                          <Link
                            href='https://www.facebook.com'
                            className='tw-w-10 tw-h-10 rounded-0 text-heading tw-text-xl d-flex justify-content-center align-items-center bg-white hover-bg-main-600 hover-text-white hover-border-main-600 active-scale-09 tw-duration-200'
                          >
                            <i className='ph-bold ph-facebook-logo' />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='https://www.twitter.com'
                            className='tw-w-10 tw-h-10 rounded-0 text-heading tw-text-xl d-flex justify-content-center align-items-center bg-white hover-bg-main-600 hover-text-white hover-border-main-600 active-scale-09 tw-duration-200'
                          >
                            <i className='ph-bold ph-x-logo' />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='https://www.instagram.com'
                            className='tw-w-10 tw-h-10 rounded-0 text-heading tw-text-xl d-flex justify-content-center align-items-center bg-white hover-bg-main-600 hover-text-white hover-border-main-600 active-scale-09 tw-duration-200'
                          >
                            <i className='ph-bold ph-instagram-logo' />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='https://www.youtube.com'
                            className='tw-w-10 tw-h-10 rounded-0 text-heading tw-text-xl d-flex justify-content-center align-items-center bg-white hover-bg-main-600 hover-text-white hover-border-main-600 active-scale-09 tw-duration-200'
                          >
                            <i className='ph-bold ph-youtube-logo' />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-lg-6 col-md-8'>
                <div>
                  <div className='bg-white tw-px-8 text-center tw-py-17 tw-mb-7 tw-rounded-xl tw_fade_anim'>
                    <div className='tw-w-95-px tw-h-95-px rounded-circle d-inline-flex'>
                      <Image
                        width={106}
                        height={106}
                        src='/assets/images/thumbs/blog-sitebar-img.png'
                        alt=''
                        className='w-100 h-100 object-fit-cover'
                      />
                    </div>
                    <h6 className='tw-text-xl fw-normal text-uppercase tw-mb-1 tw-mt-4'>
                      Rosalina D. Willaim
                    </h6>
                    <span className='tw-text-sm fw-medium'>
                      Blogger/Photographer
                    </span>
                    <p
                      className='tw-mt-5 fw-medium tw-px-9'
                      style={{ color: "#6b7280" }}
                    >
                      he whimsically named Egg Canvas is the design director and
                      photographer in New York. Why the nam
                    </p>
                    <ul className='d-flex align-items-center tw-gap-3 justify-content-center tw-mt-6'>
                      <li>
                        <Link
                          href='https://www.facebook.com'
                          className='tw-w-11 tw-h-11 border border-neutral-200 rounded-0 text-heading tw-text-xl d-flex justify-content-center align-items-center bg-white hover-bg-main-600 hover-text-white hover-border-main-600 active-scale-09 tw-duration-200 tw-rounded-lg'
                        >
                          <i className='ph ph-facebook-logo' />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='https://www.twitter.com'
                          className='tw-w-11 tw-h-11 border border-neutral-200 rounded-0 text-heading tw-text-xl d-flex justify-content-center align-items-center bg-white hover-bg-main-600 hover-text-white hover-border-main-600 active-scale-09 tw-duration-200 tw-rounded-lg'
                        >
                          <i className='ph ph-x-logo' />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='https://www.instagram.com'
                          className='tw-w-11 tw-h-11 border border-neutral-200 rounded-0 text-heading tw-text-xl d-flex justify-content-center align-items-center bg-white hover-bg-main-600 hover-text-white hover-border-main-600 active-scale-09 tw-duration-200 tw-rounded-lg'
                        >
                          <i className='ph ph-instagram-logo' />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='https://www.youtube.com'
                          className='tw-w-11 tw-h-11 border border-neutral-200 rounded-0 text-heading tw-text-xl d-flex justify-content-center align-items-center bg-white hover-bg-main-600 hover-text-white hover-border-main-600 active-scale-09 tw-duration-200 tw-rounded-lg'
                        >
                          <i className='ph ph-youtube-logo' />
                        </Link>
                      </li>
                    </ul>
                  </div>
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
                  <div className='sidebar-tag bg-white tw-rounded-xl tw-pt-8 tw-pb-8 tw-px-10 tw_fade_anim'>
                    <h6 className='tw-text-505 fw-normal text-capitalize tw-mb-5 border-start border-3 border-main-600 tw-ps-2'>
                      Populer Tags
                    </h6>
                    <div className='d-flex align-items-center flex-wrap tw-gap-3 cursor-small'>
                      <Link
                        href='/blog'
                        className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                      >
                        HotelBooking
                      </Link>
                      <Link
                        href='/blog'
                        className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                      >
                        HotelReservation
                      </Link>
                      <Link
                        href='/blog'
                        className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                      >
                        OnlineHotelBooking
                      </Link>
                      <Link
                        href='/blog'
                        className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                      >
                        HotelDeals
                      </Link>
                      <Link
                        href='/blog'
                        className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                      >
                        LastMinuteHotels
                      </Link>
                      <Link
                        href='/blog'
                        className='tw-px-5 tw-py-2 bg-white border border-neutral-100 hover-bg-main-600 tw-rounded-lg hover-border-main-600 hover-text-heading tw-text-sm text-capitalize fw-normal text-heading'
                      >
                        HotelOffers
                      </Link>
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

export default BlogDetailsInner;
