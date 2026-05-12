import { FC } from "react";

interface BreadcrumbProps {
  title: string;
  sub_title: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ title, sub_title }) => {
  return (
    <section
      className='breadcrumb-area background-img position-relative z-1'
      style={{
        backgroundImage: "url('assets/images/thumbs/breadcrumb-bg.jpg')",
      }}
    >
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <span className='breadcrumb-subtitle tw-mb-4 text-white text-uppercase tw-text-xl fw-bold'>
                {sub_title}
              </span>

              <h2 className='breadcrumb-title tw-text-25 fw-normal text-white tw-char-animation'>
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
