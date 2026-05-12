"use client";

import HeaderTwo from "@/components/HeaderTwo";
import FooterOne from "@/components/FooterOne";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <HeaderTwo />

      <main
        className='error-page d-flex align-items-center justify-content-center position-relative'
        style={{ minHeight: "100vh" }}
      >
        {/* Background image */}
        <div className='error-bg position-absolute w-100 h-100 top-0 start-0'>
          <Image
            src='/assets/images/thumbs/bg_404.png'
            fill
            style={{ objectFit: "cover" }}
            alt='404 Background'
          />
          <div className='overlay'></div> {/* optional overlay for contrast */}
        </div>

        {/* Error content */}
        <div className='container text-center text-white position-relative'>
          <div className='row justify-content-center'>
            <div className='col-lg-6 col-md-8'>
              <h2 className=' text-white mb-4'>⚠️ Something went wrong!</h2>
              <p className='lead mb-4 text-danger'>{error.message}</p>
              <button
                onClick={() => reset()}
                className='tw-btn-hover-white bg-main-600 tw-py-5 tw-px-14 text-capitalize text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg'
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>

      <FooterOne />
    </>
  );
}
