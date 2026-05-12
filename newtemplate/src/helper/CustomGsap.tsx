/* ****************************************************************************
                          Custom GSAP js start
****************************************************************************  */

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
}

interface FadeAnimElement extends HTMLElement {
  dataset: {
    fadeOffset?: string;
    duration?: string;
    fadeFrom?: string;
    onScroll?: string;
    delay?: string;
    ease?: string;
  };
}

interface AnimationRef {
  kill?: () => void;
}

export default function CustomGSAP() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const mobileMenuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const matchMediaRef = useRef<gsap.MatchMedia | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const animationsRef = useRef<AnimationRef[]>([]);

  // Initialize on mount
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Re-initialize animations on route change
  useEffect(() => {
    if (!isMounted) return;

    // Kill previous animations
    cleanupAnimations();

    // Initialize animations with a small delay to ensure DOM is ready
    const initTimeout = setTimeout(initAnimations, 50);

    return () => {
      clearTimeout(initTimeout);
      cleanupAnimations();
    };
  }, [pathname, isMounted]);

  const cleanupAnimations = () => {
    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    // Kill ScrollSmoother
    if (smootherRef.current) {
      smootherRef.current.kill();
      smootherRef.current = null;
    }

    // Kill matchMedia
    if (matchMediaRef.current) {
      matchMediaRef.current.kill();
      matchMediaRef.current = null;
    }

    // Kill other animations
    animationsRef.current.forEach((anim) => {
      if (anim && typeof anim.kill === "function") {
        anim.kill();
      }
    });
    animationsRef.current = [];

    // Clear GSAP timeline
    gsap.globalTimeline.clear();
  };

  const initAnimations = () => {
    if (typeof window === "undefined") return;

    // Wait for DOM to be fully ready
    if (document.readyState !== "complete") {
      window.addEventListener("load", initAnimations);
      return;
    }

    // =================================== Smooth Scroller Js Start =====================================
    // Only initialize ScrollSmoother if not already initialized
    if (
      !smootherRef.current &&
      document.querySelector("#scrollSmoother-container")
    ) {
      try {
        smootherRef.current = ScrollSmoother.create({
          content: "#scrollSmoother-container",
          smooth: 1,
          effects: true,
          smoothTouch: 0.1,
          ease: "power4.out",
          ignoreMobileResize: true,
        });
        animationsRef.current.push(smootherRef.current);
      } catch (error) {}
    }

    // Section title animation
    initCharAnimation();

    // Fade animation
    initFadeAnimation();

    // Card animations
    initCardAnimations();

    // Blog panel scroll
    initBlogPanelScroll();

    // Home 3 animations
    initHome3Animations();

    // Home 4 animations
    initHome4Animations();

    // Mouse cursor
    initMouseCursor();

    // Mobile menu
    initMobileMenu();

    // Refresh ScrollTrigger to recalculate positions
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  const initCharAnimation = () => {
    if (window.innerWidth > 576) {
      const charAnimationElements =
        document.querySelectorAll<HTMLElement>(".tw-char-animation");

      if (charAnimationElements.length > 0) {
        charAnimationElements.forEach((splitTextLine) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: splitTextLine,
              start: "top 90%",
              end: "bottom 60%",
              scrub: false,
              markers: false,
              toggleActions: "play none none none",
            },
          });

          const itemSplitted = new SplitText(splitTextLine, {
            type: "chars, words",
          });

          gsap.set(splitTextLine, {
            perspective: 300,
          });

          itemSplitted.split({
            type: "chars, words",
          });

          tl.from(itemSplitted.chars, {
            duration: 0.3,
            delay: 0.5,
            x: 100,
            autoAlpha: 0,
            stagger: 0.05,
          });

          if (tl.scrollTrigger) {
            scrollTriggersRef.current.push(tl.scrollTrigger);
          }
          animationsRef.current.push(tl);
        });
      }
    }
  };

  const initFadeAnimation = () => {
    const fadeArrayup = gsap.utils.toArray<HTMLElement>(".tw_fade_anim");
    fadeArrayup.forEach((element) => {
      const fadeElement = element as FadeAnimElement;
      let fromDirection = "bottom";
      let onScroll = 1;
      let duration = 1;
      let offset = 50;
      let delay = 0.5;
      let ease = "power2.out";

      if (fadeElement.dataset.fadeOffset)
        offset = parseInt(fadeElement.dataset.fadeOffset);
      if (fadeElement.dataset.duration)
        duration = parseFloat(fadeElement.dataset.duration);
      if (fadeElement.dataset.fadeFrom)
        fromDirection = fadeElement.dataset.fadeFrom;
      if (fadeElement.dataset.onScroll)
        onScroll = parseInt(fadeElement.dataset.onScroll);
      if (fadeElement.dataset.delay)
        delay = parseFloat(fadeElement.dataset.delay);
      if (fadeElement.dataset.ease) ease = fadeElement.dataset.ease;

      const animationConfig = {
        opacity: 0,
        ease,
        duration,
        delay,
      };

      if (onScroll === 1) {
        const scrollTriggerConfig = {
          trigger: fadeElement,
          start: "top 110%",
        };

        let tween: gsap.core.Tween | undefined;
        switch (fromDirection) {
          case "top":
            tween = gsap.from(fadeElement, {
              y: -offset,
              ...animationConfig,
              scrollTrigger: scrollTriggerConfig,
            });
            break;
          case "left":
            tween = gsap.from(fadeElement, {
              x: -offset,
              ...animationConfig,
              scrollTrigger: scrollTriggerConfig,
            });
            break;
          case "bottom":
            tween = gsap.from(fadeElement, {
              y: offset,
              ...animationConfig,
              scrollTrigger: scrollTriggerConfig,
            });
            break;
          case "right":
            tween = gsap.from(fadeElement, {
              x: offset,
              ...animationConfig,
              scrollTrigger: scrollTriggerConfig,
            });
            break;
          case "in":
            tween = gsap.from(fadeElement, {
              ...animationConfig,
              scrollTrigger: scrollTriggerConfig,
            });
            break;
        }
        if (tween && tween.scrollTrigger) {
          scrollTriggersRef.current.push(tween.scrollTrigger);
          animationsRef.current.push(tween);
        }
      } else {
        let tween: gsap.core.Tween | undefined;
        switch (fromDirection) {
          case "top":
            tween = gsap.from(fadeElement, {
              y: -offset,
              ...animationConfig,
            });
            break;
          case "left":
            tween = gsap.from(fadeElement, {
              x: -offset,
              ...animationConfig,
            });
            break;
          case "bottom":
            tween = gsap.from(fadeElement, {
              y: offset,
              ...animationConfig,
            });
            break;
          case "right":
            tween = gsap.from(fadeElement, {
              x: offset,
              ...animationConfig,
            });
            break;
          case "in":
            tween = gsap.from(fadeElement, animationConfig);
            break;
        }
        if (tween) animationsRef.current.push(tween);
      }
    });
  };

  const initCardAnimations = () => {
    if (window.innerWidth <= 768) return;

    // Advance Card Animation
    const advanceItems = document.querySelectorAll<HTMLElement>(
      ".advance-wrap .advance-item",
    );

    if (advanceItems.length >= 5) {
      const advanced = gsap.timeline({
        scrollTrigger: {
          trigger: ".advance-wrap",
          start: "top 60%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        defaults: {
          ease: "power1.out",
          duration: 1,
        },
      });

      advanced
        .from(advanceItems[0], { xPercent: 100, rotate: -8 })
        .from(advanceItems[1], { xPercent: 30, rotate: 4.13 }, "<")
        .from(advanceItems[2], { xPercent: -30, rotate: -6.42 }, "<")
        .from(advanceItems[3], { xPercent: -60, rotate: -12.15 }, "<")
        .from(advanceItems[4], { xPercent: -100, rotate: 12 }, "<");

      if (advanced.scrollTrigger) {
        scrollTriggersRef.current.push(advanced.scrollTrigger);
      }
      animationsRef.current.push(advanced);
    }

    // Feature Card Animation
    const featureItems = document.querySelectorAll<HTMLElement>(
      ".feature-wrapper .feature-item",
    );

    if (featureItems.length >= 5) {
      const feature = gsap.timeline({
        scrollTrigger: {
          trigger: ".feature-wrapper",
          start: "top 60%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        defaults: {
          ease: "power1.out",
          duration: 0.4,
        },
      });

      feature
        .from(featureItems[0], { xPercent: 0, rotate: -9.75 })
        .from(featureItems[1], { yPercent: 30, rotate: 8.62 }, "<")
        .from(featureItems[2], { xPercent: 0, rotate: -9.05 }, "<")
        .from(featureItems[3], { yPercent: 30, rotate: 11.7 }, "<")
        .from(featureItems[4], { xPercent: 0, rotate: -7.73 }, "<");

      if (feature.scrollTrigger) {
        scrollTriggersRef.current.push(feature.scrollTrigger);
      }
      animationsRef.current.push(feature);
    }
  };

  const initBlogPanelScroll = () => {
    if (window.innerWidth >= 991) {
      const blogPanels = document.querySelectorAll<HTMLElement>(".blog-panel");

      if (blogPanels.length > 0) {
        blogPanels.forEach((section) => {
          const tween = gsap.to(section, {
            scrollTrigger: {
              trigger: section,
              pin: section,
              scrub: 1,
              start: "center center",
              end: "bottom 80%",
              endTrigger: ".blog-panel-area",
              pinSpacing: false,
              markers: false,
            },
          });

          if (tween.scrollTrigger) {
            scrollTriggersRef.current.push(tween.scrollTrigger);
          }
          animationsRef.current.push(tween);
        });
      }
    }
  };

  const initHome3Animations = () => {
    // Home 3 advance card animation
    if (window.innerWidth > 992) {
      const items = document.querySelectorAll<HTMLElement>(".advance-two-item");

      if (items && items.length >= 5) {
        const advanced = gsap.timeline({
          scrollTrigger: {
            trigger: ".advance-two-wrap",
            start: "top 60%",
            toggleActions: "play none none reverse",
            markers: false,
          },
          defaults: {
            ease: "power1.out",
            duration: 1,
          },
        });

        advanced
          .from(items[0], { xPercent: 100, yPercent: 3, rotate: -5.39 })
          .from(items[1], { xPercent: 50, yPercent: -5, rotate: -2.28 }, "<")
          .from(items[2], { xPercent: 0, yPercent: -10, rotate: 0 }, "<")
          .from(items[3], { xPercent: -50, yPercent: -5, rotate: 2.41 }, "<")
          .from(items[4], { xPercent: -100, yPercent: 3, rotate: 5.27 }, "<");

        if (advanced.scrollTrigger) {
          scrollTriggersRef.current.push(advanced.scrollTrigger);
        }
        animationsRef.current.push(advanced);
      }
    }

    // Home 3 marquee bg animation
    gsap.utils
      .toArray<HTMLElement>(".marquee-three-2-bg")
      .forEach((container) => {
        const img = container.querySelector<HTMLImageElement>("img");

        if (img) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              scrub: true,
              pin: false,
            },
          });

          tl.fromTo(
            img,
            {
              yPercent: -20,
              ease: "none",
            },
            {
              yPercent: 20,
              ease: "none",
            },
          );

          if (tl.scrollTrigger) {
            scrollTriggersRef.current.push(tl.scrollTrigger);
          }
          animationsRef.current.push(tl);
        }
      });
  };

  const initHome4Animations = () => {
    if (window.innerWidth >= 1200) {
      const panelsSections = gsap.utils.toArray<HTMLElement>(".panels-three");

      panelsSections.forEach((thePanelsSection) => {
        const panels = gsap.utils.toArray<HTMLElement>(
          ".panels-three-container .panel-three",
          thePanelsSection,
        );
        const panelsContainer = thePanelsSection.querySelector<HTMLElement>(
          ".panels-three-container",
        );

        if (!panelsContainer || panels.length === 0) return;

        const panelHeight = 643;
        gsap.set(panelsContainer, { height: panelHeight });
        gsap.set(panels, { height: panelHeight });

        let totalPanelsWidth = 0;
        panels.forEach((panel) => {
          totalPanelsWidth += panel.offsetWidth;
        });

        gsap.set(panelsContainer, { width: totalPanelsWidth });

        const tween = gsap.to(panels, {
          x: -totalPanelsWidth + window.innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: panelsContainer,
            pin: true,
            start: "30% center",
            scrub: 1,
            end: `+=${panelsContainer.offsetWidth - window.innerWidth}`,
          },
        });

        if (tween.scrollTrigger) {
          scrollTriggersRef.current.push(tween.scrollTrigger);
        }
        animationsRef.current.push(tween);
      });
    }
  };

  const initMouseCursor = () => {
    const myCursor = document.querySelector<HTMLElement>(".mouseCursor");
    if (!myCursor) return;

    const cursorInner = document.querySelector<HTMLElement>(".cursor-inner");
    const cursorOuter = document.querySelector<HTMLElement>(".cursor-outer");

    if (!cursorInner || !cursorOuter) return;

    const handleMouseMove = (event: MouseEvent) => {
      cursorOuter.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      cursorInner.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };

    const handleMouseEnter = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.matches("button, a, .cursor-pointer")) {
        cursorInner.classList.add("active");
        cursorOuter.classList.add("active");
      }
    };

    const handleMouseLeave = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.matches("a, button") || !target.closest(".cursor-pointer")) {
        cursorInner.classList.remove("active");
        cursorOuter.classList.remove("active");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter, true);
    document.body.addEventListener("mouseleave", handleMouseLeave, true);

    cursorInner.style.visibility = "visible";
    cursorOuter.style.visibility = "visible";

    // Cursor point area interactions
    const cursorPointAreas = document.querySelectorAll<HTMLElement>(
      ".tp-cursor-point-area",
    );
    const cursorPointAreas2 = document.querySelectorAll<HTMLElement>(
      ".tp-cursor-point-area-2",
    );

    const handleCursorPointEnter = () => {
      document.querySelectorAll(".mouseCursor").forEach((cursor) => {
        cursor.classList.add("cursor-big");
      });
    };

    const handleCursorPointLeave = () => {
      document.querySelectorAll(".mouseCursor").forEach((cursor) => {
        cursor.classList.remove("cursor-big");
      });
    };

    const handleCursorPoint2Enter = () => {
      document.querySelectorAll(".cursor-inner").forEach((cursor) => {
        cursor.classList.add("active");
      });
    };

    const handleCursorPoint2Leave = () => {
      document.querySelectorAll(".cursor-inner").forEach((cursor) => {
        cursor.classList.remove("active");
      });
    };

    cursorPointAreas.forEach((area) => {
      area.addEventListener("mouseenter", handleCursorPointEnter);
      area.addEventListener("mouseleave", handleCursorPointLeave);
    });

    cursorPointAreas2.forEach((area) => {
      area.addEventListener("mouseenter", handleCursorPoint2Enter);
      area.addEventListener("mouseleave", handleCursorPoint2Leave);
    });

    // Store cleanup functions
    const cleanupFunctions: (() => void)[] = [
      () => window.removeEventListener("mousemove", handleMouseMove),
      () =>
        document.body.removeEventListener("mouseenter", handleMouseEnter, true),
      () =>
        document.body.removeEventListener("mouseleave", handleMouseLeave, true),
    ];

    // Add cleanup for cursor point areas
    cursorPointAreas.forEach((area) => {
      cleanupFunctions.push(() => {
        area.removeEventListener("mouseenter", handleCursorPointEnter);
        area.removeEventListener("mouseleave", handleCursorPointLeave);
      });
    });

    cursorPointAreas2.forEach((area) => {
      cleanupFunctions.push(() => {
        area.removeEventListener("mouseenter", handleCursorPoint2Enter);
        area.removeEventListener("mouseleave", handleCursorPoint2Leave);
      });
    });

    animationsRef.current.push({
      kill: () => {
        cleanupFunctions.forEach((fn) => fn());
      },
    });
  };

  const initMobileMenu = () => {
    matchMediaRef.current = gsap.matchMedia();
    const mtl = gsap.timeline({ paused: true });
    mobileMenuTimelineRef.current = mtl;

    matchMediaRef.current.add("(max-width: 991px)", () => {
      mtl.to(".side-overlay", {
        opacity: 1,
        visibility: "visible",
        duration: 0.15,
      });

      mtl.to(".mobile-menu", {
        x: 0,
        delay: 0.2,
        duration: 0.2,
      });

      mtl.from(".nav-menu__item", {
        opacity: 0,
        duration: 0.2,
        y: -60,
        stagger: 0.08,
      });

      const toggleMobileMenu =
        document.querySelector<HTMLElement>(".toggle-mobileMenu");
      const closeButton = document.querySelector<HTMLElement>(".close-button");
      const mobileSideOverlay =
        document.querySelector<HTMLElement>(".side-overlay");

      const handleToggleClick = () => {
        mtl.play();
        document.body.style.overflow = "hidden";
      };

      const handleCloseClick = () => {
        mtl.reverse();
        document.body.style.overflow = "";
      };

      const handleOverlayClick = () => {
        mtl.reverse();
        document.body.style.overflow = "";
      };

      toggleMobileMenu?.addEventListener("click", handleToggleClick);
      closeButton?.addEventListener("click", handleCloseClick);
      mobileSideOverlay?.addEventListener("click", handleOverlayClick);

      animationsRef.current.push({
        kill: () => {
          toggleMobileMenu?.removeEventListener("click", handleToggleClick);
          closeButton?.removeEventListener("click", handleCloseClick);
          mobileSideOverlay?.removeEventListener("click", handleOverlayClick);
        },
      });
    });

    if (matchMediaRef.current) {
      animationsRef.current.push(matchMediaRef.current);
    }
    animationsRef.current.push(mtl);
  };

  // Add resize listener to refresh ScrollTrigger
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}

/* ****************************************************************************
                          Custom GSAP js End
****************************************************************************  */
