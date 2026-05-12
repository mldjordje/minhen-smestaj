import Image from "next/image";
import { FC } from "react";
import Marquee from "react-fast-marquee";

const MarqueeFour: FC = () => {
  return (
    <div
      className='overflow-hidden position-relative z-2'
      style={{ background: "#f7f7ee" }}
    >
      <div className='marquee'>
        <Marquee>
          <div className='d-inline-flex align-items-center tw-gap-14 tw-pb-25'>
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
              <h2 className='marquee-title text-black fw-normal'>
                Luxary hotel &amp; resport
              </h2>
            </div>
          </div>
          <div className='d-inline-flex align-items-center tw-gap-14 tw-pb-25'>
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
              <h2 className='marquee-title text-black fw-normal'>
                Luxary hotel &amp; resport
              </h2>
            </div>
          </div>
        </Marquee>
      </div>
      <div className='marquee-three-2-bg'>
        <Image
          width={1920}
          height={682}
          src='/assets/images/thumbs/marquee-three-2-bg.jpg'
          alt='bg'
        />
      </div>
    </div>
  );
};

export default MarqueeFour;
