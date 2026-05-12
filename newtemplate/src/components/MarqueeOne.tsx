import Image from "next/image";
import { FC } from "react";
import Marquee from "react-fast-marquee";
const MarqueeOne: FC = () => {
  return (
    <div className='overflow-hidden tw-pb-10'>
      <div className='marquee'>
        <Marquee>
          <div className='d-inline-flex align-items-center tw-gap-14'>
            <div className='marquee-icon'>
              <span>
                <Image
                  width={160}
                  height={164}
                  src='/assets/images/icons/marquee-icon1.svg'
                  alt='marquee'
                />
              </span>
            </div>
            <div>
              <h2 className='marquee-title fw-normal'>
                Luxary hotel &amp; report
              </h2>
            </div>
          </div>
          <div className='d-inline-flex align-items-center tw-gap-14'>
            <div className='marquee-icon'>
              <span>
                <Image
                  width={160}
                  height={164}
                  src='/assets/images/icons/marquee-icon1.svg'
                  alt='marquee'
                />
              </span>
            </div>
            <div>
              <h2 className='marquee-title fw-normal'>
                Luxary hotel &amp; resport
              </h2>
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeOne;
