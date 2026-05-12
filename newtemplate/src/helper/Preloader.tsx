"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const Preloader: FC = () => {
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
    }, 500);

    // cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {active ? (
        <div className='loading-screen' id='loading-screen'>
          <span className='bar top-bar' />
          <span className='bar down-bar' />
          <div className='animation-preloader'>
            <div className='position-relative z-1'>
              <div className='loader-border' />
              <div className='loader-logo position-absolute top-50 start-50 translate-middle tw-z-999'>
                <Image
                  width={56}
                  height={45}
                  className='position-relative tw-z-999'
                  src='/assets/images/logo/favicon.png'
                  alt='brand'
                />
              </div>
            </div>
            <div className='txt-loading tw-mt-10'>
              <span data-text-preloader='E' className='letters-loading'>
                E
              </span>
              <span data-text-preloader='l' className='letters-loading'>
                l
              </span>
              <span data-text-preloader='i' className='letters-loading'>
                i
              </span>
              <span data-text-preloader='t' className='letters-loading'>
                t
              </span>
              <span data-text-preloader='e' className='letters-loading'>
                e
              </span>
              <span data-text-preloader='S' className='letters-loading'>
                S
              </span>
              <span data-text-preloader='t' className='letters-loading'>
                t
              </span>
              <span data-text-preloader='a' className='letters-loading'>
                a
              </span>
              <span data-text-preloader='y' className='letters-loading'>
                y
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Preloader;
