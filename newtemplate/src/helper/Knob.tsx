"use client";

import { useEffect, useRef, useState } from "react";

/* ======================
   KNOB COMPONENT
====================== */

interface KnobProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
}

export const Knob: React.FC<KnobProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#ff6600",
  duration = 2000,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const animated = useRef(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animateValue(0, value, duration);
        }
      },
      { rootMargin: "-150px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const animateValue = (start: number, end: number, duration: number) => {
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const percent = Math.min(elapsed / duration, 1);
      const current = Math.ceil(start + (end - start) * percent);
      setProgress(current);

      if (percent < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <div ref={ref} className='knob'>
      <svg width={size} height={size}>
        <circle
          stroke='#eee'
          fill='transparent'
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill='transparent'
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <text
          x='50%'
          y='50%'
          dominantBaseline='middle'
          textAnchor='middle'
          fontSize='18'
          fontWeight='bold'
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

/* ======================
   PROGRESS BAR COMPONENT
====================== */

interface ProgressProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressProps> = ({ percentage }) => {
  return (
    <div className='progress-container' data-percentage={percentage}>
      <div className='progress' style={{ width: `${percentage}%` }} />

      <span
        className='percentage'
        style={{ insetInlineStart: `${percentage}%` }}
      >
        {percentage}%
      </span>
    </div>
  );
};
