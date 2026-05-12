"use client";

import Image from "next/image";
import HeaderTwo from "@/components/HeaderTwo";
import FooterOne from "@/components/FooterOne";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <>
      <HeaderTwo />

      <main
        className='error-page d-flex align-items-center justify-content-center position-relative'
        style={{ minHeight: "100vh" }}
      >
        {/* Background Image */}
        <div className='error-bg position-absolute w-100 h-100 top-0 start-0'>
          <Image
            src='/assets/images/thumbs/bg_404.png'
            fill
            style={{ objectFit: "cover" }}
            alt='404 Background'
          />
          <div className='overlay'></div>
        </div>

        {/* Error Content */}
        <div className='container text-center text-white position-relative'>
          <div className='row justify-content-center'>
            <div className='col-lg-6 col-md-8'>
              <h1 className='display-1 mb-3'>Application Error</h1>
              <p className='lead mb-4 text-danger'>{error.message}</p>
              <button onClick={reset} className='btn btn-danger btn-lg'>
                Reload
              </button>
            </div>
          </div>
        </div>
      </main>

      <FooterOne />
    </>
  );
}
