/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useEffect } from "react";

type LandingMediaRailProps = {
  items: Array<{
    alt: string;
    src: string;
    title: string;
  }>;
};

gsap.registerPlugin(ScrollTrigger);

export function LandingMotionOrchestrator() {
  useEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 900px)"
      },
      (context) => {
        const conditions = context.conditions ?? {};
        const reduceMotion = Boolean(conditions.reduceMotion);
        const desktop = Boolean(conditions.desktop);

        if (reduceMotion) {
          return;
        }

        gsap
          .timeline({
            defaults: {
              duration: 0.8,
              ease: "power3.out"
            }
          })
          .from(".landing-cinematic-hero__copy > *", {
            y: 28,
            stagger: 0.12
          })
          .from(
            ".landing-cinematic-booking",
            {
              x: desktop ? 36 : 0,
              y: desktop ? 0 : 24
            },
            "-=0.45"
          )
          .from(
            ".landing-floating-proof",
            {
              y: 18,
              stagger: 0.08
            },
            "-=0.35"
          );

        gsap.utils.toArray<HTMLElement>(".landing-reveal").forEach((section) => {
          gsap.from(section, {
            y: 42,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 84%"
            }
          });
        });

        gsap.utils.toArray<HTMLElement>(".landing-parallax-media").forEach((mediaNode) => {
          gsap.to(mediaNode, {
            yPercent: desktop ? -8 : -4,
            ease: "none",
            scrollTrigger: {
              scrub: true,
              trigger: mediaNode,
              start: "top bottom",
              end: "bottom top"
            }
          });
        });
      }
    );

    return () => {
      media.revert();
    };
  }, []);

  return null;
}

export function LandingMediaRail({ items }: LandingMediaRailProps) {
  return (
    <div className="landing-media-rail">
      {items.map((item, index) => (
        <motion.article
          animate={{ opacity: 1, y: 0 }}
          className="landing-media-rail__item"
          initial={{ opacity: 0, y: 24 }}
          key={item.src}
          transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <img alt={item.alt} className="landing-parallax-media" src={item.src} />
          <span>{item.title}</span>
        </motion.article>
      ))}
    </div>
  );
}

export function LandingMotionButton({
  children,
  className,
  href
}: {
  children: React.ReactNode;
  className: string;
  href: string;
}) {
  return (
    <motion.a
      className={className}
      href={href}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}
