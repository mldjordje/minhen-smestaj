import Image from "next/image";
import { FC } from "react";

const ServiceDetailsInner: FC = () => {
  return (
    <div className='Service_details_inner'>
      <div className='container'>
        <div className='row tw-mb-10'>
          <div className='col-xl-8'>
            <div>
              <Image
                width={850}
                height={501}
                className='w-100 tw-rounded-lg'
                src='/assets/images/thumbs/service-details-thumb.jpg'
                alt='thumb'
              />
            </div>
          </div>
          <div className='col-xl-4'>
            <div className='bg-white tw-p-12 h-100 tw-rounded-lg'>
              <h6 className='tw-text-xl fw-semibold tw-mb-4'>Hours</h6>
              <div>
                <ul>
                  <li className='bg-neutral-400 tw-mb-3 tw-py-3 tw-px-6 tw-rounded-lg'>
                    <span className='fw-medium text-heading'>Breakfast -</span>{" "}
                    7.00 AM to 10.30 AM
                  </li>
                  <li className='bg-neutral-400 tw-mb-3 tw-py-3 tw-px-6 tw-rounded-lg'>
                    <span className='fw-medium text-heading'>Lunch -</span> 1.00
                    PM to 2.30 PM
                  </li>
                  <li className='bg-neutral-400 tw-mb-3 tw-py-3 tw-px-6 tw-rounded-lg'>
                    <span className='fw-medium text-heading'>Supper -</span>{" "}
                    6.00 PM to 7.00 PM{" "}
                  </li>
                  <li className='bg-neutral-400 tw-mb-3 tw-py-3 tw-px-6 tw-rounded-lg'>
                    <span className='fw-medium text-heading'>Dinner -</span>{" "}
                    8.30 PM to 10.00 PM
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='destination-details-wrapper main'>
              <div className='tw-mb-10 tw_fade_anim'>
                <h6 className='tw-text-7 tw-mb-5 fw-semibold'>
                  The Restaurent Center:
                </h6>
                <p className='destination-details-paragraph text-paragraph-color text-capitalize'>
                  Description It is a long established fact that a reader will
                  be distrac by any websites look for ways mornings of spring
                  prevent AdBlock from blocking annoying ads. As a result, we've
                  focused on improving our funct so that we can overcome these
                  anti-ad blocking attempts. Of course, you can help us continue
                  improve our ad blocking ability by reporting any time you run
                  into a website that won't allow you to block the readable
                  content of a page when looking at its layout. It is a long
                  established fact
                </p>
              </div>
              <div className='tw-mb-6 tw_fade_anim'>
                <h6 className='tw-text-7 tw-mb-5 fw-semibold'>Dress Code</h6>
                <p className='destination-details-paragraph text-paragraph-color text-capitalize tw-mb-10'>
                  Professionally deliver fully researched scenarios with turnkey
                  communities competently
                </p>
              </div>
              <div className='destination-details-check tw-mb-14 tw_fade_anim'>
                <ul className='d-flex flex-column'>
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
              <div className='tw-mb-6 tw_fade_anim'>
                <h6 className='tw-text-7 tw-mb-5 fw-semibold'>Terrace</h6>
                <p className='destination-details-paragraph text-paragraph-color text-capitalize tw-mb-10'>
                  Open the drinks only maintain restaurent rules and regulations
                  below
                </p>
              </div>
              <div className='destination-details-check tw-mb-14 tw_fade_anim'>
                <ul className='d-flex flex-column'>
                  <li className='d-inline-flex align-items-center tw-gap-3 text-black fw-medium tw-mb-7'>
                    <span className='d-inline-block lh-1 text-main-600 tw-text-xl'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Quickly generate bricks-and-clicks
                  </li>
                  <li className='d-inline-flex align-items-center tw-gap-3 text-black fw-medium tw-mb-7'>
                    <span className='d-inline-block lh-1 text-main-600 tw-text-xl'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Interactively cultivate visionary platforms
                  </li>
                  <li className='d-inline-flex align-items-center tw-gap-3 text-black fw-medium tw-mb-7'>
                    <span className='d-inline-block lh-1 text-main-600 tw-text-xl'>
                      <i className='ph-bold ph-check' />
                    </span>{" "}
                    Energistically envisioneer resource
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsInner;
