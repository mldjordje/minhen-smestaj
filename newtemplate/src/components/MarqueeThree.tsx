import Image from "next/image";
import { FC } from "react";
import Marquee from "react-fast-marquee";

const MarqueeThree: FC = () => {
  return (
    <div className='overflow-hidden tw-pb-10'>
      <div className='marquee tw_fade_anim'>
        <Marquee>
          <div className='d-inline-flex align-items-center tw-gap-14'>
            <div className='marquee-icon'>
              <span>
                <Image
                  width={200}
                  height={198}
                  src='/assets/images/icons/marquee-three-icon.svg'
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
          <div className='d-inline-flex align-items-center tw-gap-14'>
            <div className='marquee-icon'>
              <span>
                <Image
                  width={200}
                  height={198}
                  src='/assets/images/icons/marquee-three-icon.svg'
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

export default MarqueeThree;
