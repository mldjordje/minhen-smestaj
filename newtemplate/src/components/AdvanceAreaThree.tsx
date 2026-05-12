import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const AdvanceAreaThree: FC = () => {
  return (
    <div className='py-120 bg_2'>
      <div className='  position-relative z-1'>
        <div className='container'>
          <div className='row justify-content-between align-items-center tw-mb-25'>
            <div className='col-xl-8 col-lg-8'>
              <div className='section-two-wrapper'>
                <h6 className='section-two-subtitle tw-text-xl text-uppercase tw-mb-6'>
                  Discover Beauty Through Our Lens
                </h6>
                <h2 className='section-two-title tw-text-16 fw-normal tw-char-animation'>
                  Moments Captured by team Explore Our Gallery seen
                </h2>
              </div>
            </div>
            <div className='col-xl-3 col-lg-4'>
              <div className='gallery-two-btn d-flex justify-content-end'>
                <Link
                  className='tw-btn-hover-yellow bg-white tw-py-5 tw-px-12 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2'
                  href='/contact'
                >
                  EXPLORE MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='advance-wrap advance-two-wrap'>
                {/* item 1 */}
                <div
                  className='advance-two-item tw-p-405 tw-rounded-xl'
                  style={{ background: "#D9F8D3" }}
                >
                  <div className='advance-two-thumb tw-mb-6'>
                    <Link href='/room-details'>
                      <Image
                        width={329}
                        height={278}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/advance-two-thumb1.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='tw-px-4 tw-pb-10'>
                    <h4 className='tw-text-7 fw-normal tw-mb-4'>
                      <Link href='/room-details'>
                        Island <br />
                        Hopping
                      </Link>
                    </h4>
                    <p>
                      We offer dental services at highly innovative level, with
                      innovative
                    </p>
                  </div>
                </div>
                {/* item 2 */}
                <div
                  className='advance-two-item tw-p-405 tw-rounded-xl'
                  style={{ background: "#FFFADB" }}
                >
                  <div className='advance-two-thumb tw-mb-6'>
                    <Link href='/room-details'>
                      <Image
                        width={329}
                        height={278}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/advance-two-thumb2.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='tw-px-4 tw-pb-10'>
                    <h4 className='tw-text-7 fw-normal tw-mb-4'>
                      <Link href='/room-details'>
                        Scuba <br />
                        Diving Trips
                      </Link>
                    </h4>
                    <p>
                      We offer dental services at highly innovative level, with
                      innovative
                    </p>
                  </div>
                </div>
                {/* item 3 */}
                <div
                  className='advance-two-item tw-p-405 tw-rounded-xl'
                  style={{ background: "#D3E6D2" }}
                >
                  <div className='advance-two-thumb tw-mb-6'>
                    <Link href='/room-details'>
                      <Image
                        width={329}
                        height={277}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/advance-two-thumb3.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='tw-px-4 tw-pb-10'>
                    <h4 className='tw-text-7 fw-normal tw-mb-4'>
                      <Link href='/room-details'>
                        Sunrise <br />
                        Paddleboarding
                      </Link>
                    </h4>
                    <p>
                      We offer dental services at highly innovative level, with
                      innovative
                    </p>
                  </div>
                </div>
                {/* item 4 */}
                <div
                  className='advance-two-item tw-p-405 tw-rounded-xl'
                  style={{ background: "#F8F2B9" }}
                >
                  <div className='advance-two-thumb tw-mb-6'>
                    <Link href='/room-details'>
                      <Image
                        width={329}
                        height={278}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/advance-two-thumb4.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='tw-px-4 tw-pb-10'>
                    <h4 className='tw-text-7 fw-normal tw-mb-4'>
                      <Link href='/room-details'>
                        Sauna, Jacuzzi &amp; <br />
                        Steam Room
                      </Link>
                    </h4>
                    <p>
                      We offer dental services at highly innovative level, with
                      innovative
                    </p>
                  </div>
                </div>
                {/* item 5 */}
                <div
                  className='advance-two-item tw-p-405 tw-rounded-xl'
                  style={{ background: "#FFDBDC" }}
                >
                  <div className='advance-two-thumb tw-mb-6'>
                    <Link href='/room-details'>
                      <Image
                        width={329}
                        height={278}
                        className='tw-rounded-lg'
                        src='/assets/images/thumbs/advance-two-thumb5.jpg'
                        alt='thumb'
                      />
                    </Link>
                  </div>
                  <div className='tw-px-4 tw-pb-10'>
                    <h4 className='tw-text-7 fw-normal tw-mb-4'>
                      <Link href='/room-details'>
                        Poolside Bar
                        <br />
                        &amp; Lounge
                      </Link>
                    </h4>
                    <p>
                      We offer dental services at highly innovative level, with
                      innovative
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default AdvanceAreaThree;
