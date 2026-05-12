"use client";

import { FC, useState } from "react";

const VideoPopup: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className='banner-play-button d-flex justify-content-end'>
        <a
          className='play-now-two play-button'
          href='#'
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
          style={{ cursor: "pointer" }}
        >
          <i className='ph-bold ph-play' />
          <span className='ripple' />
        </a>
      </div>

      {isOpen && (
        <div className='modal-overlay mfp-fade mfp-bg' onClick={closeModal}>
          <div
            className='modal-content mfp-content'
            onClick={(e) => e.stopPropagation()}
          >
            <button className='modal-close mfp-close' onClick={closeModal}>
              ×
            </button>
            <div className='video-container'>
              <iframe
                width='100%'
                height='100%'
                src='https://www.youtube.com/embed/Fvae8nxzVz4?autoplay=1'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPopup;
