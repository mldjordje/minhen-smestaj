import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const InstagramAreaOne: FC = () => {
  return (
    <section className='instagram-area'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='text-center tw-mb-6 tw_fade_anim'>
              <h6 className='instagram-title tw-text-2xl fw-normal text-capitalize'>
                ...want to become a dontation partner &amp; contribution...
              </h6>
            </div>
          </div>
        </div>
        <div className='row row-cols-xl-6 row-cols-md-3 row-cols-sm-3 row-cols-1'>
          <div className='col'>
            <div
              className='instagram-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.4'
            >
              <div className='instagram-thumb position-relative z-1 overflow-hidden'>
                <Image
                  width={214}
                  height={190}
                  className='tw-rounded-lg'
                  src='/assets/images/thumbs/instagram-thumb1.jpg'
                  alt='thumb'
                />
                <div className='instagram-btn position-absolute z-1'>
                  <Link className='text-white tw-text-11' href='#'>
                    <span>
                      <i className='ph ph-instagram-logo' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div
              className='instagram-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.5'
            >
              <div className='instagram-thumb position-relative z-1 overflow-hidden'>
                <Image
                  width={214}
                  height={190}
                  className='tw-rounded-lg'
                  src='/assets/images/thumbs/instagram-thumb2.jpg'
                  alt='thumb'
                />
                <div className='instagram-btn position-absolute z-1'>
                  <Link className='text-white tw-text-11' href='#'>
                    <span>
                      <i className='ph ph-instagram-logo' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div
              className='instagram-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.6'
            >
              <div className='instagram-thumb position-relative z-1 overflow-hidden'>
                <Image
                  width={214}
                  height={190}
                  className='tw-rounded-lg'
                  src='/assets/images/thumbs/instagram-thumb3.jpg'
                  alt='thumb'
                />
                <div className='instagram-btn position-absolute z-1'>
                  <Link className='text-white tw-text-11' href='#'>
                    <span>
                      <i className='ph ph-instagram-logo' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div
              className='instagram-wrapper tw-mb-7 tw_fade_anim'
              data-delay='.7'
            >
              <div className='instagram-thumb position-relative z-1 overflow-hidden'>
                <Image
                  width={214}
                  height={190}
                  className='tw-rounded-lg'
                  src='/assets/images/thumbs/instagram-thumb4.jpg'
                  alt='thumb'
                />
                <div className='instagram-btn position-absolute z-1'>
                  <Link className='text-white tw-text-11' href='#'>
                    <span>
                      <i className='ph ph-instagram-logo' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='instagram-wrapper tw-mb-7'>
              <div
                className='instagram-thumb position-relative z-1 overflow-hidden tw_fade_anim'
                data-delay='.8'
              >
                <Image
                  width={214}
                  height={190}
                  className='tw-rounded-lg'
                  src='/assets/images/thumbs/instagram-thumb5.jpg'
                  alt='thumb'
                />
                <div className='instagram-btn position-absolute z-1'>
                  <Link className='text-white tw-text-11' href='#'>
                    <span>
                      <i className='ph ph-instagram-logo' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='instagram-wrapper tw-mb-7'>
              <div
                className='instagram-thumb position-relative z-1 overflow-hidden tw_fade_anim'
                data-delay='.9'
              >
                <Image
                  width={214}
                  height={190}
                  className='tw-rounded-lg'
                  src='/assets/images/thumbs/instagram-thumb6.jpg'
                  alt='thumb'
                />
                <div className='instagram-btn position-absolute z-1'>
                  <Link className='text-white tw-text-11' href='#'>
                    <span>
                      <i className='ph ph-instagram-logo' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramAreaOne;
