const ChooseOne = () => {
  return (
    <section className='py-120 bg-white'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-9'>
            <div
              className='section-two-wrapper text-center tw-mb-4 tw_fade_anim'
              data-delay='.3'
            >
              <h6 className='section-two-subtitle tw-text-xl text-neutral-800 text-uppercase tw-mb-6'>
                Driven by Service, Inspired by You
              </h6>
              <h2 className='section-two-title tw-text-15 fw-normal tw-char-animation'>
                Since Our Inception In 2014, We Have Been Dedicated To
                Pioneering The Telectricty Industry In Japan
              </h2>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='counding-four-wrapper d-flex justify-content-between position-relative z-1'>
              <div className='tw_fade_anim' data-delay='.3'>
                <h2 className='counding-four-title font-heading fw-normal text-main-600 tw-mb-3'>
                  01
                </h2>
                <p className='counding-four-paragraph font-heading fw-normal text-heading tw-text-6 text-capitalize bg-white text-center tw-pe-5'>
                  Choose your hotel
                </p>
              </div>
              <div className='tw_fade_anim' data-delay='.5'>
                <h2 className='counding-four-title font-heading fw-normal text-main-600 tw-mb-3'>
                  02
                </h2>
                <p className='counding-four-paragraph font-heading fw-normal text-heading tw-text-6 text-capitalize bg-white text-center'>
                  book your rooms
                </p>
              </div>
              <div className='tw_fade_anim' data-delay='.7'>
                <h2 className='counding-four-title font-heading fw-normal text-main-600 tw-mb-3'>
                  03
                </h2>
                <p className='counding-four-paragraph font-heading fw-normal text-heading tw-text-6 text-capitalize bg-white text-center tw-ps-5'>
                  pay &amp; get hospitality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseOne;
