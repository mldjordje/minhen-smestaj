import Link from "next/link";
import { FC } from "react";

const PricingOne: FC = () => {
  return (
    <section className='pricing-area bg-main-600 position-relative z-1'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7 col-lg-9'>
            <div className='section-wrapper text-center tw-mb-14 tw_fade_anim'>
              <h6 className='section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600'>
                From Our Kitchen to Your Table
              </h6>
              <h2 className='section-title fw-normal tw-mb-7 tw-char-animation'>
                From Breakfast To Dinner Taste The Luxury Item
              </h2>
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-xl-12'>
            <div className='pricing-wrapper tw-mb-12 tw_fade_anim'>
              <div className='pricing-wrap d-flex align-items-center justify-content-between'>
                <div className='pricing-respon'>
                  <div className='pricing-item d-flex align-items-center justify-content-between tw-pt-6 tw-pb-6 tw-mx-6'>
                    <div className='pricing-content'>
                      <h4 className='pricing-title tw-text-7 fw-normal tw-mb-2'>
                        Chicago Deep Pizza.
                      </h4>
                      <p className='pricing-paragraph'>
                        It's the perfect dining experience where Experience
                        quick and efficient
                      </p>
                    </div>
                    <div>
                      <span className='pricing-price tw-text-2xl fw-bold'>
                        $5.00
                      </span>
                    </div>
                  </div>
                  <div className='pricing-item active d-flex align-items-center justify-content-between tw-pt-6 tw-pb-6 tw-mx-6'>
                    <div className='pricing-content'>
                      <h4 className='pricing-title tw-text-7 fw-normal tw-mb-2'>
                        Tomato Basil Bruschetta
                      </h4>
                      <p className='pricing-paragraph'>
                        It's the perfect dining experience where Experience
                        quick and efficient
                      </p>
                    </div>
                    <div>
                      <span className='pricing-price tw-text-2xl fw-bold'>
                        $5.00
                      </span>
                    </div>
                  </div>
                  <div className='pricing-item d-flex align-items-center justify-content-between tw-pt-6 tw-pb-6 tw-mx-6'>
                    <div className='pricing-content'>
                      <h4 className='pricing-title tw-text-7 fw-normal tw-mb-2'>
                        Stuffed Mushrooms
                      </h4>
                      <p className='pricing-paragraph'>
                        It's the perfect dining experience where Experience
                        quick and efficient
                      </p>
                    </div>
                    <div>
                      <span className='pricing-price tw-text-2xl fw-bold'>
                        $5.00
                      </span>
                    </div>
                  </div>
                  <div className='pricing-item d-flex align-items-center justify-content-between tw-pt-6 tw-pb-6 tw-mx-6'>
                    <div className='pricing-content'>
                      <h4 className='pricing-title tw-text-7 fw-normal tw-mb-2'>
                        Herb-Crusted Lamb Chops
                      </h4>
                      <p className='pricing-paragraph'>
                        It's the perfect dining experience where Experience
                        quick and efficient
                      </p>
                    </div>
                    <div>
                      <span className='pricing-price tw-text-2xl fw-bold'>
                        $5.00
                      </span>
                    </div>
                  </div>
                </div>
                <div className='pricing-respon'>
                  <div className='pricing-item d-flex align-items-center justify-content-between tw-pt-6 tw-pb-6 tw-mx-6'>
                    <div className='pricing-content'>
                      <h4 className='pricing-title tw-text-7 fw-normal tw-mb-2'>
                        Classic Caesar Salad
                      </h4>
                      <p className='pricing-paragraph'>
                        It's the perfect dining experience where Experience
                        quick and efficient
                      </p>
                    </div>
                    <div>
                      <span className='pricing-price tw-text-2xl fw-bold'>
                        $5.00
                      </span>
                    </div>
                  </div>
                  <div className='pricing-item d-flex align-items-center justify-content-between tw-pt-6 tw-pb-6 tw-mx-6'>
                    <div className='pricing-content'>
                      <h4 className='pricing-title tw-text-7 fw-normal tw-mb-2'>
                        Shrimp Cocktail
                      </h4>
                      <p className='pricing-paragraph'>
                        It's the perfect dining experience where Experience
                        quick and efficient
                      </p>
                    </div>
                    <div>
                      <span className='pricing-price tw-text-2xl fw-bold'>
                        $5.00
                      </span>
                    </div>
                  </div>
                  <div className='pricing-item d-flex align-items-center justify-content-between tw-pt-6 tw-pb-6 tw-mx-6'>
                    <div className='pricing-content'>
                      <h4 className='pricing-title tw-text-7 fw-normal tw-mb-2'>
                        Chicken Satay with Peanut Sauce
                      </h4>
                      <p className='pricing-paragraph'>
                        It's the perfect dining experience where Experience
                        quick and efficient
                      </p>
                    </div>
                    <div>
                      <span className='pricing-price tw-text-2xl fw-bold'>
                        $5.00
                      </span>
                    </div>
                  </div>
                  <div className='pricing-item d-flex align-items-center justify-content-between tw-pt-6 tw-pb-6 tw-mx-6'>
                    <div className='pricing-content'>
                      <h4 className='pricing-title tw-text-7 fw-normal tw-mb-2'>
                        Vegetarian Pasta Primavera
                      </h4>
                      <p className='pricing-paragraph'>
                        It's the perfect dining experience where Experience
                        quick and efficient
                      </p>
                    </div>
                    <div>
                      <span className='pricing-price tw-text-2xl fw-bold'>
                        $5.00
                      </span>
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
                className='tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
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
      </div>
    </section>
  );
};

export default PricingOne;
