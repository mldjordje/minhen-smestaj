import { FC } from "react";

const NewsletterOne: FC = () => {
  return (
    <section
      className='cta-area py-120 background-img position-relative z-1 tw-mx-11 tw-rounded-3xl overflow-hidden'
      style={{
        backgroundImage: "url('assets/images/thumbs/call-to-action-bg.jpg')",
      }}
    >
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-xl-6'>
            <div className='text-center tw_fade_anim'>
              <h2 className='cta-title tw-text-29 fw-normal text-white tw-mb-6 tw-char-animation'>
                Get <span className='text-main-600'>20% </span>Off Your First
                Stay!
              </h2>
              <p className='tw-text-lg fw-medium text-white tw-mb-10'>
                Join our newsletter, and we’ll send you a 20% discount for{" "}
                <br /> your first stay.
              </p>
              <div className='cta-form d-flex tw-gap-2 justify-content-center flex-wrap row-gap-3'>
                <input
                  className='bg-transparent text-white fw-medium tw-text-lg'
                  type='text'
                  placeholder='name@email.com'
                />
                <button className='tw-btn-hover-white bg-main-600 tw-py-4 tw-px-8 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'>
                  EXPLORE MORE{" "}
                  <span className='d-inline-block lh-1 tw-text-lg'>
                    <i className='ph ph-arrow-up-right' />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterOne;
