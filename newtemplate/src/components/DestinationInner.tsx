import Image from "next/image";
import Link from "next/link";

const DestinationInner = () => {
  return (
    <>
      <div className='advance-area position-relative z-1 pt-120 bg_2'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-11'>
              <div
                className='section-wrapper text-center tw-mb-14'
                data-aos='fade-up'
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                  Crafting Memorable Experiences
                </h6>
                <h2 className='section-title fw-normal text-capitalize tw-mb-7 tw-char-animation'>
                  we're dedicated to providing you unforgettable experience.
                  Whether you're here for business or leisure,
                </h2>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='advance-wrap'>
                {/* item 1 */}
                <div className='advance-item'>
                  <div className='advance-thumb'>
                    <Link href='/service-details'>
                      <Image
                        width={272}
                        height={344}
                        src='/assets/images/thumbs/advance-thumb1.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                    <h6 className='tw-text-2xl fw-normal mb-0'>
                      <Link href='/service-details'>Coxsbazar</Link>
                    </h6>
                    <Link
                      className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading'
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
                    <Link href='/service-details'>
                      <Image
                        width={272}
                        height={344}
                        src='/assets/images/thumbs/advance-thumb2.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                    <h6 className='tw-text-2xl fw-normal mb-0'>
                      <Link href='/service-details'>Bandarban</Link>
                    </h6>
                    <Link
                      className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading'
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
                    <Link href='/service-details'>
                      <Image
                        width={272}
                        height={344}
                        src='/assets/images/thumbs/advance-thumb3.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                    <h6 className='tw-text-2xl fw-normal mb- 0'>
                      <Link href='/service-details'>sylhet</Link>
                    </h6>
                    <Link
                      className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading'
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
                    <Link href='/service-details'>
                      <Image
                        width={272}
                        height={344}
                        src='/assets/images/thumbs/advance-thumb4.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                    <h6 className='tw-text-2xl fw-normal mb-0 '>
                      <Link href='/service-details'>Cumilla</Link>
                    </h6>
                    <Link
                      className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading'
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
                    <Link href='/service-details'>
                      <Image
                        width={272}
                        height={344}
                        src='/assets/images/thumbs/advance-thumb5.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='advance-content d-flex align-items-center justify-content-between flex-wrap tw-px-4 tw-py-4'>
                    <h6 className='tw-text-2xl fw-normal mb -0'>
                      <Link href='/service-details'>Dhaka</Link>
                    </h6>
                    <Link
                      className='advance-btn tw-w-10 tw-h-10 lh-1 d-inline-flex align-items-center justify-content-center rounded-circle text-heading'
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
      <section className='package-area py-120 bg_2'>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-xl-7'>
              <div className='section-wrapper text-center tw-mb-14 tw_fade_anim'>
                <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                  Where Luxury Meets Warmth
                </h6>
                <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                  Discover Exclusive Hotel Packages For Every Taste &amp;
                  Occasion
                </h2>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-xl-12'>
              <div className='package-wrapper d-flex justify-content-center tw-gap-4 tw-mb-17'>
                <div
                  className='package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1 tw_fade_anim'
                  data-delay='.3'
                >
                  <Link href='/destination-details'>
                    <Image
                      width={776}
                      height={1054}
                      className='tw-rounded-xl w-100 h-100 object-fit-cover'
                      src='/assets/images/thumbs/package-thumb1.jpg'
                      alt='thumb'
                    />
                  </Link>
                  <div className='package-price bg-main-600 tw-p-6 position-absolute start-0 top-0'>
                    <span className='tw-text-8 font-heading fw-normal text-heading'>
                      $99
                    </span>
                    <p className='font-heading tw-text-5 fw-normal text-capitalize text-heading'>
                      per night
                    </p>
                  </div>
                  <div className='package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14'>
                    <h4 className='package-title tw-text-8 fw-normal text-white tw-mb-8'>
                      <Link href='/destination-details'>
                        Premier Oceanview Villa <br /> Fxcv
                      </Link>
                    </h4>
                    <div className='package-list'>
                      <ul className='d-flex'>
                        <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                          4 guest
                        </li>
                        <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                          <span>
                            <Image
                              width={28}
                              height={25}
                              src='/assets/images/icons/package-list-icon1.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          2 beds
                        </li>
                        <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                          <span>
                            <Image
                              width={28}
                              height={25}
                              src='/assets/images/icons/package-list-icon1.svg'
                              alt='icon'
                            />
                          </span>{" "}
                          400m2
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='tw_fade_anim' data-delay='.5'>
                  <div className='package-wrap d-flex tw-gap-4'>
                    <div className='package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1'>
                      <Link href='/destination-details'>
                        <Image
                          width={550}
                          height={518}
                          className='tw-rounded-xl w-100 h-100 object-fit-cover'
                          src='/assets/images/thumbs/package-thumb2.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div className='package-price bg-main-600 tw-p-6 position-absolute start-0 top-0'>
                        <span className='tw-text-8 font-heading fw-normal text-heading'>
                          $99
                        </span>
                        <p className='font-heading tw-text-5 fw-normal text-capitalize text-heading'>
                          per night
                        </p>
                      </div>
                      <div className='package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14'>
                        <h4 className='package-title tw-text-8 fw-normal text-white tw-mb-8'>
                          <Link href='/destination-details'>
                            Luxury Seaside Villa
                          </Link>
                        </h4>
                        <div className='package-list'>
                          <ul className='d-flex'>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              4 guest
                            </li>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              <span>
                                <Image
                                  width={28}
                                  height={25}
                                  src='/assets/images/icons/package-list-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              2 beds
                            </li>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              <span>
                                <Image
                                  width={28}
                                  height={25}
                                  src='/assets/images/icons/package-list-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              400m2
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1'>
                      <Link href='/destination-details'>
                        <Image
                          width={464}
                          height={518}
                          className='tw-rounded-xl w-100 h-100 object-fit-cover'
                          src='/assets/images/thumbs/package-thumb3.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div className='package-price bg-main-600 tw-p-6 position-absolute start-0 top-0'>
                        <span className='tw-text-8 font-heading fw-normal text-heading'>
                          $99
                        </span>
                        <p className='font-heading tw-text-5 fw-normal text-capitalize text-heading'>
                          per night
                        </p>
                      </div>
                      <div className='package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14'>
                        <h4 className='package-title tw-text-8 fw-normal text-white tw-mb-8'>
                          <Link href='/destination-details'>
                            Elite Oceanfront Retreat
                          </Link>
                        </h4>
                        <div className='package-list'>
                          <ul className='d-flex'>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              4 guest
                            </li>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              <span>
                                <Image
                                  width={28}
                                  height={25}
                                  src='/assets/images/icons/package-list-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              2 beds
                            </li>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              <span>
                                <Image
                                  width={28}
                                  height={25}
                                  src='/assets/images/icons/package-list-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              400m2
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='package-wrap d-flex tw-gap-5'>
                    <div className='package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1'>
                      <Link href='/destination-details'>
                        <Image
                          width={464}
                          height={518}
                          className='tw-rounded-xl w-100 h-100 object-fit-cover'
                          src='/assets/images/thumbs/package-thumb4.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div className='package-price bg-main-600 tw-p-6 position-absolute start-0 top-0'>
                        <span className='tw-text-8 font-heading fw-normal text-heading'>
                          $99
                        </span>
                        <p className='font-heading tw-text-5 fw-normal text-capitalize text-heading'>
                          per night
                        </p>
                      </div>
                      <div className='package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14'>
                        <h4 className='package-title tw-text-8 fw-normal text-white tw-mb-8'>
                          <Link href='/destination-details'>
                            Signature Coastal Villa
                          </Link>
                        </h4>
                        <div className='package-list'>
                          <ul className='d-flex'>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              4 guest
                            </li>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              <span>
                                <Image
                                  width={28}
                                  height={25}
                                  src='/assets/images/icons/package-list-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              2 beds
                            </li>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              <span>
                                <Image
                                  width={28}
                                  height={25}
                                  src='/assets/images/icons/package-list-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              400m2
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='package-thumb tw-mb-4 tw-rounded-xl overflow-hidden position-relative z-1'>
                      <Link href='/destination-details'>
                        <Image
                          width={550}
                          height={518}
                          className='tw-rounded-xl w-100 h-100 object-fit-cover'
                          src='/assets/images/thumbs/package-thumb5.jpg'
                          alt='thumb'
                        />
                      </Link>
                      <div className='package-price bg-main-600 tw-p-6 position-absolute start-0 top-0'>
                        <span className='tw-text-8 font-heading fw-normal text-heading'>
                          $99
                        </span>
                        <p className='font-heading tw-text-5 fw-normal text-capitalize text-heading'>
                          per night
                        </p>
                      </div>
                      <div className='package-content position-absolute start-0 bottom-0 tw-mx-10 tw-mb-14'>
                        <h4 className='package-title tw-text-8 fw-normal text-white tw-mb-8'>
                          <Link href='/destination-details'>
                            Exclusive Oceanview Escape
                          </Link>
                        </h4>
                        <div className='package-list'>
                          <ul className='d-flex'>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              4 guest
                            </li>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              <span>
                                <Image
                                  width={28}
                                  height={25}
                                  src='/assets/images/icons/package-list-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              2 beds
                            </li>
                            <li className='font-heading text-white fw-medium tw-text-xl text-capitalize'>
                              <span>
                                <Image
                                  width={28}
                                  height={25}
                                  src='/assets/images/icons/package-list-icon1.svg'
                                  alt='icon'
                                />
                              </span>{" "}
                              400m2
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='text-center'>
                <Link
                  className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
                  href='/destination-details'
                >
                  EXPLORE MORE{" "}
                  <span className='d-inline-block lh-1 tw-text-lg'>
                    <i className='ph ph-arrow-up-right' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationInner;
