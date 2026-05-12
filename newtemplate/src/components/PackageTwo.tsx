import Image from "next/image";
import Link from "next/link";

const PackageTwo = () => {
  return (
    <section className='package-four-area tw-pb-10 position-relative z-1 bg-white'>
      <div className='container'>
        <div className='row justify-content-between align-items-center tw-mb-14'>
          <div className='col-xl-8 col-lg-8'>
            <div
              className='section-two-wrapper tw-mb-10 tw_fade_anim'
              data-delay='.3'
            >
              <h6 className='section-two-subtitle tw-text-xl text-neutral-800 text-uppercase tw-mb-6'>
                Driven by Service, Inspired by You
              </h6>
              <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                From Culture To Cuisine All Just Minutes Away.
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
          <div className='col-xl-12'>
            <div className='package-four-panel-area destination-panel-three-area mb-0'>
              <div className='panels-three position-relative overflow-hidden'>
                <div className='panels-three-container d-flex tw-gap-7'>
                  {/* item 1 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb1.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Stay Friday to Sunday &amp; get 20% off + free
                            breakfast
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Weekend Escape Deal</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 2 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb2.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Includes free airport pickup &amp; express check-in
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>
                            Weekend Getaway Offer
                          </Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 3 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb3.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Celebrate with a complimentary cake &amp; room decor
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Escape This Weekend</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 4 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb4.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Private dinner + spa access + late checkout
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Quick Getaway Deal</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 1 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb1.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Stay Friday to Sunday &amp; get 20% off + free
                            breakfast
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Weekend Escape Deal</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 2 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb2.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Includes free airport pickup &amp; express check-in
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>
                            Weekend Getaway Offer
                          </Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 3 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb3.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Celebrate with a complimentary cake &amp; room decor
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Escape This Weekend</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 4 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb4.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Private dinner + spa access + late checkout
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Quick Getaway Deal</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 1 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb1.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Stay Friday to Sunday &amp; get 20% off + free
                            breakfast
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Weekend Escape Deal</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 2 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb2.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Includes free airport pickup &amp; express check-in
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>
                            Weekend Getaway Offer
                          </Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 3 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb3.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Celebrate with a complimentary cake &amp; room decor
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Escape This Weekend</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 4 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb4.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Private dinner + spa access + late checkout
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Quick Getaway Deal</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 1 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb1.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Stay Friday to Sunday &amp; get 20% off + free
                            breakfast
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Weekend Escape Deal</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 2 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb2.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Includes free airport pickup &amp; express check-in
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>
                            Weekend Getaway Offer
                          </Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 3 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb3.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Celebrate with a complimentary cake &amp; room decor
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Escape This Weekend</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* item 4 */}
                  <div className='panel-three'>
                    <div className='package-four-wrapper tw-rounded-lg tw-p-405 tw-w-450-px'>
                      <div className='tw-px-18 tw-mb-10'>
                        <div className='text-center tw-pt-12 tw-pb-4'>
                          <Link href='/room-details'>
                            <Image
                              width={225}
                              height={225}
                              src='/assets/images/thumbs/package-four-thumb4.png'
                              alt='thumb'
                            />
                          </Link>
                        </div>
                        <div className='text-center'>
                          <p className='font-heading tw-text-lg fw-normal text-heading'>
                            Private dinner + spa access + late checkout
                          </p>
                        </div>
                      </div>
                      <div className='bg-white tw-rounded-lg tw-py-8 tw-px-10'>
                        <h6 className='tw-text-2xl fw-normal tw-mb-4'>
                          <Link href='/room-details'>Quick Getaway Deal</Link>
                        </h6>
                        <p className='d-inline-flex align-items-center tw-gap-2 mb-0'>
                          <span className='d-inline-block lh-1 text-heading tw-text-xl'>
                            <i className='ph-bold ph-clock' />
                          </span>{" "}
                          Valid till: July 31, 2025
                        </p>
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

export default PackageTwo;
