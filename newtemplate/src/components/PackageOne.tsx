import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const PackageOne: FC = () => {
  return (
    <section className='package-area py-120'>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-xl-7'>
            <div className='section-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                Where Luxury Meets Warmth
              </h6>
              <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                Discover Exclusive Hotel Packages For Every Taste &amp; Occasion
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
  );
};

export default PackageOne;
