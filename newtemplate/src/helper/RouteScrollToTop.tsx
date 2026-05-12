"use client";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef } from "react";

const RouteScrollToTop: FC = () => {
  const pathname = usePathname();
  const progressWrapRef = useRef<HTMLButtonElement | null>(null);
  const progressPathRef = useRef<SVGPathElement | null>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const progressPath = progressPathRef.current;
    const wrap = progressWrapRef.current;
    if (!progressPath || !wrap) return;

    const pathLength = progressPath.getTotalLength();

    progressPath.style.transition = progressPath.style.webkitTransition =
      "none";
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = `${pathLength}`;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.webkitTransition =
      "stroke-dashoffset 10ms linear";

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = `${progress}`;
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        wrap.classList.add("active-progress");
      } else {
        wrap.classList.remove("active-progress");
      }
      updateProgress();
    };

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    wrap.addEventListener("click", handleClick);

    // Initialize once
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      wrap.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <button
      ref={progressWrapRef}
      className='progress-wrap'
      aria-label='scroll indicator'
      title='back to top'
    >
      <span />
      <svg
        className='progress-circle svg-content'
        width='100%'
        height='100%'
        viewBox='-1 -1 102 102'
      >
        <path
          ref={progressPathRef}
          d='M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98'
        />
      </svg>
    </button>
  );
};

export default RouteScrollToTop;
