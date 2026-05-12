/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */


var tl = gsap.timeline(); 
gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);



// =================================== Smooth Scroller Js Start =====================================
const smoother = ScrollSmoother.create({
  content: "#scrollSmoother-container",
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
  ease: 'power4.out',
});


 // Section title Js
if ($(window).width() > 576 && $(".tw-char-animation").length > 0) {
    let char_come = gsap.utils.toArray(".tw-char-animation");
    char_come.forEach(splitTextLine => {
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
            perspective: 300
        });
        itemSplitted.split({
            type: "chars, words"
        });
        tl.from(itemSplitted.chars, {
            duration: 1,
            delay: 0.5,
            x: 100,
            autoAlpha: 0,
            stagger: 0.05,
        });
    });
}

    // 9. Fade-Animation Js
    const fadeArrayup = gsap.utils.toArray(".tw_fade_anim");
    fadeArrayup.forEach((t, e) => {
        var r = "bottom",
            a = 1,
            o = 1,
            i = 50,
            s = .5,
            l = "power2.out";
        t.getAttribute("data-fade-offset") && (i = t.getAttribute("data-fade-offset")), t.getAttribute("data-duration") && (o = t.getAttribute("data-duration")), t.getAttribute("data-fade-from") && (r = t.getAttribute("data-fade-from")), t.getAttribute("data-on-scroll") && (a = t.getAttribute("data-on-scroll")), t.getAttribute("data-delay") && (s = t.getAttribute("data-delay")), t.getAttribute("data-ease") && (l = t.getAttribute("data-ease")), 1 == a ? ("top" == r && gsap.from(t, {
            y: -i,
            opacity: 0,
            ease: l,
            duration: o,
            delay: s,
            scrollTrigger: {
                trigger: t,
                start: "top 110%"
            }
        }), "left" == r && gsap.from(t, {
            x: -i,
            opacity: 0,
            ease: l,
            duration: o,
            delay: s,
            scrollTrigger: {
                trigger: t,
                start: "top 110%"
            }
        }), "bottom" == r && gsap.from(t, {
            y: i,
            opacity: 0,
            ease: l,
            duration: o,
            delay: s,
            scrollTrigger: {
                trigger: t,
                start: "top 110%"
            }
        }), "right" == r && gsap.from(t, {
            x: i,
            opacity: 0,
            ease: l,
            duration: o,
            delay: s,
            scrollTrigger: {
                trigger: t,
                start: "top 110%"
            }
        }), "in" == r && gsap.from(t, {
            opacity: 0,
            ease: l,
            duration: o,
            delay: s,
            scrollTrigger: {
                trigger: t,
                start: "top 110%"
            }
        })) : ("top" == r && gsap.from(t, {
            y: -i,
            opacity: 0,
            ease: l,
            duration: o,
            delay: s
        }), "left" == r && gsap.from(t, {
            x: -i,
            opacity: 0,
            ease: l,
            duration: o,
            delay: s
        }), "bottom" == r && gsap.from(t, {
            y: i,
            opacity: 0,
            ease: l,
            duration: o,
            delay: s
        }), "right" == r && gsap.from(t, {
            x: i,
            opacity: 0,
            ease: l,
            duration: o,
            delay: s
        }), "in" == r && gsap.from(t, {
            opacity: 0,
            ease: l,
            duration: o,
            delay: s
        }))
    });







// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia();
var mtl = gsap.timeline({ paused: true });

const toggleMobileMenu = document.querySelector(".toggle-mobileMenu");
const closeButton = document.querySelector(".close-button");
const mobileSideOverlay = document.querySelector(".side-overlay");

mmm.add("(max-width: 991px)", () => {
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

  toggleMobileMenu.addEventListener("click", function () {
    mtl.play();
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });

  mobileSideOverlay.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });
});
// **************************** Mobile Menu js End ****************************







// Register GSAP plugin once
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 768) return; // Skip for mobile

  // Advance Card Animation
  const advanceItems = document.querySelectorAll(".advance-wrap .advance-item");
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
  }


  
  // Feature Card Animation
  const featureItems = document.querySelectorAll(".feature-wrapper .feature-item");
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
        duration: .4,
      },
    });

    feature
      .from(featureItems[0], {
         xPercent: 0, 
         rotate: -9.75
      })
      .from(featureItems[1], {
         yPercent: 30, 
         rotate: 8.62 
      }, "<")
      .from(featureItems[2], {
         xPercent: 0, 
         rotate: -9.05
      }, "<")
      .from(featureItems[3], {
         yPercent: 30, 
         rotate: 11.7
      }, "<")
      .from(featureItems[4], {
         xPercent: 0, 
         rotate: -7.73 
      }, "<");
  }
});




	// testimonial scroll
	let pr = gsap.matchMedia();
	pr.add("(min-width: 991px)", () => {
		let tl = gsap.timeline();
		let projectpanels = document.querySelectorAll('.testimonial-panel')
		projectpanels.forEach((section, index) => {
			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: 'center center',
					end: "bottom 80%",
					endTrigger: '.testimonial-panel-area',
					pinSpacing: false,
					markers: false,
				},
			})
		})
	});




    // 13. Mouse Custom Cursor 
    function itCursor() {
      var myCursor = jQuery(".mouseCursor");
      if (myCursor.length) {
        if ($("body")) {
          const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
          let n,
            i = 0,
            o = !1;
          (window.onmousemove = function (s) {
            o ||
              (t.style.transform =
                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
              (e.style.transform =
                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
              (n = s.clientY),
              (i = s.clientX);
          }),
            $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
              e.classList.add("active"), t.classList.add("active");
            }),
            $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
              ($(this).is("a", "button") &&
                $(this).closest(".cursor-pointer").length) ||
                (e.classList.remove("active"),
                  t.classList.remove("active"));
            }),
            (e.style.visibility = "visible"),
            (t.style.visibility = "visible");
        }
      }
    }
    itCursor();

    $(".tp-cursor-point-area").on("mouseenter", function () {
      $(".mouseCursor").addClass("cursor-big");
    });

    $(".tp-cursor-point-area").on("mouseleave", function () {
      $(".mouseCursor").removeClass("cursor-big");
    });

    $(".tp-cursor-point-area-2").on("mouseenter", function () {
      $(".cursor-inner").addClass("active");
    });

    $(".tp-cursor-point-area-2").on("mouseleave", function () {
      $(".cursor-inner").removeClass("active");
    });




	// Home 2 Blog Panel Scroll
	let = gsap.matchMedia();
	pr.add("(min-width: 991px)", () => {
		let tl = gsap.timeline();
		let projectpanels = document.querySelectorAll('.blog-panel')
		projectpanels.forEach((section, index) => {
			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: 'center center',
					end: "bottom 80%",
					endTrigger: '.blog-panel-area',
					pinSpacing: false,
					markers: false,
				},
			})
		})
	});

  

    // Home 3 advance card animation 
    document.addEventListener("DOMContentLoaded", function () {
        if (window.innerWidth > 992) {
            const items = document.querySelectorAll(".advance-two-item");
            if (!items || items.length < 5) return; // skip if fewer than 5 items
            const advanced = gsap.timeline({
                scrollTrigger: {
                    trigger: ".advance-two-wrap",
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                    markers: false,
                },
                defaults: {
                    ease: "ease1",
                    duration: 1,
                },
            });
            advanced
                .from(items[0], {
                    xPercent: 100,
                    yPercent: 3,
                    rotate: -5.39
                })
                .from(items[1], {
                    xPercent: 50,
                    yPercent: -5,
                    rotate: -2.28
                }, "<")
                .from(items[2], {
                    xPercent: 0,
                    yPercent: -10,
                    rotate: 0
                }, "<")
                .from(items[3], {
                    xPercent: -50,
                    yPercent: -5,
                    rotate: 2.41
                }, "<")
                .from(items[4], {
                    xPercent: -100,
                    yPercent: 3,
                    rotate: 5.27
                }, "<");
        }
    });



   // Home 3 marquee bg animation 
    gsap.utils.toArray('.marquee-three-2-bg').forEach(container => {
      const img = container.querySelector('img');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub: true,
          pin: false,
        }
      });
      tl.fromTo(img, {
        yPercent: -20,
        ease: 'none'
      }, {
        yPercent: 20,
        ease: 'none'
      });
    });



    // Home Four About Js
    let dd = gsap.matchMedia();
    dd.add("(min-width: 1200px)", () => {
      const panelsSections = gsap.utils.toArray(".panels-three");
      for (let i = 0; i < panelsSections.length; i++) {
        const thePanelsSection = panelsSections[i];
        const panels = gsap.utils.toArray(".panels-three-container .panel-three", thePanelsSection);
        const panelsContainer = thePanelsSection.querySelector(".panels-three-container");
        const panelHeight = 643;
        gsap.set(panelsContainer, { height: panelHeight });
        gsap.set(panels, { height: panelHeight });
        let totalPanelsWidth = 0;
        panels.forEach((panel) => {
          totalPanelsWidth += $(panel).outerWidth(true); 
        });
        gsap.set(panelsContainer, { width: totalPanelsWidth });
        gsap.to(panels, {
          x: -totalPanelsWidth + innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: panelsContainer,
            pin: true,
            start: '30% center',
            end: "bottom 80%",
            scrub: 1,
            end: (st) => "+=" + (st.vars.trigger.offsetWidth - innerWidth),
          }
        });
      }
    });













/* **************************************************************************** 
                          Custom GSAP js End 
****************************************************************************  */