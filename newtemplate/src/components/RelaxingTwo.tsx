import Image from "next/image";

const RelaxingTwo = () => {
  return (
    <section className='relaxing-four-area position-relative z-1'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-6 col-lg-9'>
            <div
              className='relaxing-thumb position-relative z-1 tw_fade_anim'
              data-delay='.3'
            >
              <div className='relaxing-thumb-1'>
                <Image
                  width={408}
                  height={490}
                  src='/assets/images/thumbs/relaxing-four-thumb1.jpg'
                  alt='thumb'
                />
              </div>
              <div className='relaxing-thumb-2 position-absolute'>
                <Image
                  width={381}
                  height={466}
                  src='/assets/images/thumbs/relaxing-four-thumb2.jpg'
                  alt='thumb'
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6 col-lg-11'>
            <div className='relaxing-wrapper tw_fade_anim' data-delay='.5'>
              <div className='section-two-wrapper tw-mb-14'>
                <h6 className='section-two-subtitle tw-text-xl text-uppercase text-neutral-800 tw-mb-6'>
                  Wellness Beyond Expectations
                </h6>
                <h2 className='section-two-title tw-text-16 fw-normal tw-mb-5 tw-char-animation'>
                  Rejuvenate &amp; Relaxing In At Our Luxury Spa
                </h2>
                <p className='tw-text-lg fw-medium'>
                  Welcome to Marcus Medical, your pathway to natural-looking
                  results from industry-leading injectors and&nbsp;plastic
                  surgeons in South Bay.
                </p>
              </div>
              <div className='row'>
                <div className='col-xl-9 col-lg-6 col-md-7'>
                  <div className='relaxing-list relaxing-four-list tw-mb-8'>
                    <ul>
                      <li className='d-inline-flex align-items-center tw-gap-3 font-heading fw-normal text-heading text-capitalize tw-ps-2 tw-pe-6 tw-py-2 tw-rounded-3xl tw-mb-5 bg-white'>
                        <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-heading tw-text-sm d-inline-flex justify-content-center align-items-center'>
                          <i className='ph-bold ph-check' />
                        </span>{" "}
                        Free Wi-Fi &amp; Prime location
                      </li>
                      <li className='d-inline-flex align-items-center tw-gap-3 font-heading fw-normal text-heading text-capitalize tw-ps-2 tw-pe-6 tw-py-2 tw-rounded-3xl tw-mb-5 bg-white'>
                        <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-heading tw-text-sm d-inline-flex justify-content-center align-items-center'>
                          <i className='ph-bold ph-check' />
                        </span>{" "}
                        Rooftop view &amp; 24/7 support
                      </li>
                      <li className='d-inline-flex align-items-center tw-gap-3 font-heading fw-normal text-heading text-capitalize tw-ps-2 tw-pe-6 tw-py-2 tw-rounded-3xl tw-mb-5 bg-white'>
                        <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-heading tw-text-sm d-inline-flex justify-content-center align-items-center'>
                          <i className='ph-bold ph-check' />
                        </span>{" "}
                        Affordable &amp; Transparent Pricing
                      </li>
                      <li className='d-inline-flex align-items-center tw-gap-3 font-heading fw-normal text-heading text-capitalize tw-ps-2 tw-pe-6 tw-py-2 tw-rounded-3xl tw-mb-5 bg-white'>
                        <span className='tw-w-6 tw-h-6 lh-1 rounded-circle text-heading tw-text-sm d-inline-flex justify-content-center align-items-center'>
                          <i className='ph-bold ph-check' />
                        </span>{" "}
                        Satisfaction Guarantee
                      </li>
                    </ul>
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

export default RelaxingTwo;
