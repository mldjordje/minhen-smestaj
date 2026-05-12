import Image from "next/image";
import { FC } from "react";

const AboutFour: FC = () => {
  return (
    <section className='about-four-area pb-120 position-relative z-1 bg-white'>
      <div className='container'>
        <div className='tw-mb-20'>
          <div className='row'>
            <div className='col-xl-3'>
              <div>
                <h6
                  className='text-uppercase tw-text-xl fw-medium font-body'
                  style={{ color: "#b99d75" }}
                >
                  about our hotel
                </h6>
              </div>
            </div>
            <div className='col-xl-9'>
              <div>
                <div className='tw-mb-20'>
                  <h2 className='about-four-title tw-text-14 fw-normal tw-char-animation'>
                    At Electriany, We’re Not Just Electricians We’re Problem
                    Solvers, Safety Experts &amp; Service Professionals. With
                    Over 10 Of Hands-on Experience,{" "}
                  </h2>
                </div>
                <div className='about-four-list tw-mb-6'>
                  <ul className='d-flex align-items-center tw-gap-14 flex-wrap'>
                    <li className='font-heading tw-text-2xl fw-normal text-heading text-capitalize d-inline-flex align-items-center tw-gap-4'>
                      <span>
                        <Image
                          width={70}
                          height={74}
                          src='/assets/images/icons/about-four-icon.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      Rooftop Lounge <br /> facilities
                    </li>
                    <li className='font-heading tw-text-2xl fw-normal text-heading text-capitalize d-inline-flex align-items-center tw-gap-4'>
                      <span>
                        <Image
                          width={70}
                          height={74}
                          src='/assets/images/icons/about-four-icon.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      Rooftop Lounge <br /> facilities
                    </li>
                    <li className='font-heading tw-text-2xl fw-normal text-heading text-capitalize d-inline-flex align-items-center tw-gap-4'>
                      <span>
                        <Image
                          width={70}
                          height={74}
                          src='/assets/images/icons/about-four-icon.svg'
                          alt='icon'
                        />
                      </span>{" "}
                      Rooftop Lounge <br /> facilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row gx-0 justify-content-end'>
          <div className='col-xl-9'>
            <div className='about-four-panel-wrapper destination-panel-three-area tw-ms-20'>
              <div className='panels-three position-relative overflow-hidden'>
                <div className='panels-three-container d-flex tw-gap-7'>
                  {/* item 1 */}
                  <div className='panel-three'>
                    <div className='about-four-thumb'>
                      <Image
                        width={957}
                        height={600}
                        src='/assets/images/thumbs/about-four-thumb1.jpg'
                        alt='thumb'
                      />
                    </div>
                  </div>
                  {/* item 2 */}
                  <div className='panel-three'>
                    <div className='about-four-thumb'>
                      <Image
                        width={957}
                        height={600}
                        src='/assets/images/thumbs/about-four-thumb2.jpg'
                        alt='thumb'
                      />
                    </div>
                  </div>
                  {/* item 3 */}
                  <div className='panel-three'>
                    <div className='about-four-thumb'>
                      <Image
                        width={957}
                        height={600}
                        src='/assets/images/thumbs/about-four-thumb1.jpg'
                        alt='thumb'
                      />
                    </div>
                  </div>
                  {/* item 4 */}
                  <div className='panel-three'>
                    <div className='about-four-thumb'>
                      <Image
                        width={957}
                        height={600}
                        src='/assets/images/thumbs/about-four-thumb2.jpg'
                        alt='thumb'
                      />
                    </div>
                  </div>
                  {/* item 5 */}
                  <div className='panel-three'>
                    <div className='about-four-thumb'>
                      <Image
                        width={957}
                        height={600}
                        src='/assets/images/thumbs/about-four-thumb1.jpg'
                        alt='thumb'
                      />
                    </div>
                  </div>
                  {/* item 6 */}
                  <div className='panel-three'>
                    <div className='about-four-thumb'>
                      <Image
                        width={957}
                        height={600}
                        src='/assets/images/thumbs/about-four-thumb2.jpg'
                        alt='thumb'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='about-four-img position-absolute start-0 zn-1'>
        <Image
          width={467}
          height={482}
          src='/assets/images/thumbs/about-three-img.jpg'
          alt='img'
        />
      </div>
    </section>
  );
};

export default AboutFour;
