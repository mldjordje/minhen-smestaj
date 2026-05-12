(function ($) {
  "use strict";

  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    // ============== Mobile Nav Menu Dropdown Js Start =======================
    function toggleSubMenu() {
      if ($(window).width() <= 991) {
        $(".has-submenu")
          .off("click")
          .on("click", function () {
            $(this)
              .toggleClass("active")
              .siblings(".has-submenu")
              .removeClass("active")
              .find(".nav-submenu")
              .slideUp(300);
            $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
          });
      } else {
        $(".has-submenu").off("click");
      }
    }

    toggleSubMenu();
    $(window).resize(toggleSubMenu);
    // ============== Mobile Nav Menu Dropdown Js End =======================

    // ===================== Scroll Back to Top Js Start ======================
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
    // ===================== Scroll Back to Top Js End ======================

    // ========================== add active class to navbar menu current page Js Start =====================
    function dynamicActiveMenuClass(selector) {
      let FileName = window.location.pathname.split("/").reverse()[0];

      // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
      if (FileName === "" || FileName === "index.html") {
        // Keep the activePage class on the Home link
        selector
          .find("li.nav-menu__item.has-submenu")
          .eq(0)
          .addClass("activePage");
      } else {
        // Remove activePage class from all items first
        selector.find("li").removeClass("activePage");

        // Add activePage class to the correct li based on the current URL
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("activePage");
          }
        });

        // If any li has activePage element, add class to its parent li
        selector.children("li").each(function () {
          if ($(this).find(".activePage").length) {
            $(this).addClass("activePage");
          }
        });
      }
    }

    if ($("ul").length) {
      dynamicActiveMenuClass($("ul"));
    }
    // ========================== add active class to navbar menu current page Js End =====================

    // ========================== Settings Panel Js Start =====================
    $(".settings-button").on("click", function () {
      $(".settings-panel").toggleClass("active");
      $(this).toggleClass("active");
    });

    $(document).on(
      "click",
      ".settings-panel__buttons .settings-panel__button",
      function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      }
    );

    // Cursor start
    $(".cursor-animate").on("click", function () {
      $("body").removeClass("remove-animate-cursor");
    });

    $(".cursor-default").on("click", function () {
      $("body").addClass("remove-animate-cursor");
    });
    // Cursor end

    // Direction start
    $(".direction-ltr").on("click", function () {
      $("html").attr("dir", "ltr");
    });

    $(".direction-rtl").on("click", function () {
      $("html").attr("dir", "rtl");
    });
    // Direction end
    // ========================== Settings Panel Js End =====================

    // ********************* Toast Notification Js start *********************
    function toastMessage(messageType, messageTitle, messageText, messageIcon) {
      let $toastContainer = $("#toast-container");

      let $toast = $("<div>", {
        class: `toast-message ${messageType}`,
        html: `
      <div class="toast-message__content">
        <span class="toast-message__icon">
          <i class="${messageIcon}"></i>
        </span>
        <div class="flex-grow-1">
          <div class="d-flex align-items-start justify-content-between mb-1">
            <h6 class="toast-message__title">${messageTitle}</h6>
            <button type="button" class="toast-message__close">
              <i class="ph-bold ph-x"></i>
            </button>
          </div>
          <span class="toast-message__text">${messageText}</span>
        </div>
      </div>
      <div class="progress__bar"></div>
    `,
      });

      $toastContainer.append($toast);

      setTimeout(() => {
        $toast.addClass("active");
      }, 50);

      let totalDuration = 3500;
      let startTime = Date.now();
      let remainingTime = totalDuration;
      let toastTimeout = setTimeout(hideToast, remainingTime);

      function hideToast() {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      }

      // Remove Toast on Close Button Click
      $toast.find(".toast-message__close").on("click", function () {
        $toast.removeClass("active");
        setTimeout(() => {
          $toast.remove();
        }, 500);
      });

      // Pause Timeout on Hover
      $toast.on("mouseenter", function () {
        remainingTime -= Date.now() - startTime;
        clearTimeout(toastTimeout);
      });

      // Resume Timeout on Mouse Leave
      $toast.on("mouseleave", function () {
        startTime = Date.now();
        toastTimeout = setTimeout(hideToast, remainingTime);
      });
    }
    // ********************* Toast Notification Js End *********************

    // ========================= Delete Item Js start ===================
    $(document).on("click", ".delete-button", function () {
      $(this).closest(".delete-item").addClass("d-none");

      toastMessage(
        "danger",
        "Deleted",
        "You deleted successfully!",
        "ph-bold ph-trash"
      );
    });
    // ========================= Delete Item Js End ===================

    // ========================= Form Submit Js Start ===================
    $(document).on("submit", ".form-submit", function (e) {
      e.preventDefault();

      $("input").val("");

      $("textarea").val("");

      toastMessage(
        "success",
        "Success",
        "Form submitted successfully!",
        "ph-fill ph-check-circle"
      );
    });
    // ========================= Form Submit Js End ===================

    // ================== Password Show Hide Js Start ==========
    $(".toggle-password").on("click", function () {
      $(this).toggleClass("active");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
        $(this).removeClass("ph-bold ph-eye-closed");
        $(this).addClass("ph-bold ph-eye");
      } else {
        input.attr("type", "password");
        $(this).addClass("ph-bold ph-eye-closed");
      }
    });
    // ========================= Password Show Hide Js End ===========================




    // ========================= magnific Popup Js Start =====================
    $('.play-button').magnificPopup({
      type:'iframe',
      removalDelay: 300,
      mainClass: 'mfp-fade',
    });
    // ========================= magnific Popup Js End =====================


      // =========================  Search Bar 9 Js Start ==============
      $(".open-search").on("click", function () {
        $(".search_popup").addClass("search-opened");
        $(".search-popup-overlay").addClass("search-popup-overlay-open");
      });
      $(".search_close_btn").on("click", function () {
        $(".search_popup").removeClass("search-opened");
        $(".search-popup-overlay").removeClass("search-popup-overlay-open");
      });
      $(".search-popup-overlay").on("click", function () {
        $(".search_popup").removeClass("search-opened");
        $(this).removeClass("search-popup-overlay-open");
      });
      // =========================  Search Bar 9 Js End ==============




      // ========================== Add Attribute For Bg Image Js Start ====================
      $(".background-img").css('background', function () {
          var bg = ('url(' + $(this).data("background-image") + ')');
          return bg;
        });
        // ========================== Add Attribute For Bg Image Js End =====================    
      });

      
      $(document).ready(function() {
        $('select').niceSelect();
      });



  

    // 3. Mouse active
    $(document).ready(function () {
        $(
        ".offer-wrapper, .feature-item, .pricing-item"
        ).on("mouseenter", function () {
        $(this).addClass("active").siblings().removeClass("active");
        });
        $(
        ".offer-wrapper, .feature-item, .pricing-item"
        ).on("mouseenter", function () {
        $(this).addClass("active");
        $(this)
            .parent()
            .siblings()
            .find(
            ".offer-wrapper, .feature-item, .pricing-item"
            )
            .removeClass("active");
        });
    });



    // =========================  Home 1 service Js Start ==============
      var slider = new Swiper('.service-active', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        speed: 3000,
        autoplay: true,
        breakpoints: {
          '1400': {
            slidesPerView: 3,
          },
          '1200': {
            slidesPerView: 3,
          },
          '992': {
            slidesPerView: 2,
          },
          '768': {
            slidesPerView: 2,
          },
          '576': {
            slidesPerView: 1,
          },
          '0': {
            slidesPerView: 1,
          },
        },
      });
    // =========================  Home 1 service Js End ==============


    // =========================  Home 2 marquee Js Start ==============
    if ($(".marquee").length) {
      $('.marquee').marquee({
          speed: 100,
          gap: 0,
          delayBeforeStart: 0,
          direction: $('html').attr('dir') === 'rtl' ? 'right' : 'left',
          duplicated: true,
          pauseOnHover: true,
          startVisible:true,
      });
    }
    // =========================  Home 2 marquee Js End ==============


  // =========================  Home 2 Feature Section Start =========================
    const featureMultiplier = {
      translate: 0.1,
      rotate: 0.03,
    };
    const featureSwiper = new Swiper(".feature-two-active", {
      slidesPerView: "auto",
      spaceBetween: 80,
      loop: true,
      autoplay: true,
      grabCursor: true,
      breakpoints: {
        320: {
           slidesPerView: 1 
        },
        576: {
           slidesPerView: 1 
        },
        768: {
           slidesPerView: 2, 
           spaceBetween: 30 
        },
        992: {
           slidesPerView: 2, 
           spaceBetween: 100 
        },
        1200: {
           slidesPerView: 5, 
           spaceBetween: 100 
        },
        1400: {
           slidesPerView: 5, 
           spaceBetween: 100 
        },
      },
    });
    function calculateFeatureWheel() {
      const slides = document.querySelectorAll(".feature-two-active .swiper-slide");
      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
        let ty = Math.abs(r) * featureMultiplier.translate - rect.width * featureMultiplier.translate;
        ty = Math.max(0, ty);
        const origin = r < 0 ? "left top" : "right top";
        slide.style.transform = `translateY(${ty}px) rotate(${ -r * featureMultiplier.rotate }deg)`;
        slide.style.transformOrigin = origin;
      });
    }
    function featureRaf() {
      requestAnimationFrame(featureRaf);
      calculateFeatureWheel();
    }
    featureRaf();
    // =========================  Home 2 Feature Section End =========================

    



    // =========================  Home 2 gallery Js Start ==============
    var slider = new Swiper('.gallery-two-active', {
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      speed: 3000,
      autoplay:true,
      breakpoints: {
        '1600': {
          slidesPerView: 3.5,
        },
        '1400': {
          slidesPerView: 3.2,
        },
        '1200': {
          slidesPerView: 2.5,
        },
        '992': {
          slidesPerView: 2.2,
        },
        '768': {
          slidesPerView: 1.7,
        },
        '576': {
          slidesPerView: 1,
        },
        '0': {
          slidesPerView: 1,
        },
      },
    });
    // =========================  Home 2 gallery Js End ==============


    // =========================  Home 2 testimonial Js Start ==============
    var slider = new Swiper('.testimonial-two-active', {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      speed: 3000,
      autoplay:true,
      breakpoints: {
        '1200': {
          slidesPerView: 2,
        },
        '992': {
          slidesPerView: 2,
        },
        '768': {
          slidesPerView: 1,
        },
        '576': {
          slidesPerView: 1,
        },
        '0': {
          slidesPerView: 1,
        },
      },
      // pagination dots
      pagination: {
        el: ".testimonial-two-dots",
        clickable:true,
      },
    });
    // =========================  Home 2 testimonial Js End ==============


  
    // =========================  Home 3 service Js Start ==============
      var slider = new Swiper('.service-three-active', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        speed: 3000,
        autoplay: true,
        breakpoints: {
          '1400': {
            slidesPerView: 5,
          },
          '1200': {
            slidesPerView: 4,
          },
          '992': {
            slidesPerView: 3,
          },
          '768': {
            slidesPerView: 2,
          },
          '576': {
            slidesPerView: 2,
          },
          '0': {
            slidesPerView: 1,
          },
        },
      });
    // =========================  Home 3 service Js End ==============




    // =========================  Home 4 experience Js Start ==============
    const experienceMultiplier = {
      translate: 0.1,
      rotate: 0.02,
    };
    const experienceSwiper = new Swiper(".experience-four-active", {
      slidesPerView: "auto",
      spaceBetween: 128,
      loop: true,
      autoplay: true,
      grabCursor: true,
      breakpoints: {
        320: { slidesPerView: 1 },
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2, spaceBetween: 80 },
        992: { slidesPerView: 2, spaceBetween: 120 },
        1200: { slidesPerView: 3, spaceBetween: 80 },
        1400: { slidesPerView: 3, spaceBetween: 128 },
      },
    });
    function calculateExperienceWheel() {
      const slides = document.querySelectorAll(".experience-four-wrapper");
      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);
        let ty = Math.abs(r) * experienceMultiplier.translate - rect.width * experienceMultiplier.translate;
        ty = Math.max(0, ty);
        const origin = r < 0 ? "left top" : "right top";
        slide.style.transform = `translate(0, ${ty}px) rotate(${ -r * experienceMultiplier.rotate }deg)`;
        slide.style.transformOrigin = origin;
      });
    }
    function experienceRaf() {
      requestAnimationFrame(experienceRaf);
      calculateExperienceWheel();
    }
    experienceRaf();
    // =========================  Home 4 experience Js End ==============



    

    // =========================  Room-Details Js Start ==============
    var slider = new Swiper('.room-details-active', {
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      speed: 2500,
      autoplay: true,
      breakpoints: {
        '1200': {
          slidesPerView: 3,
        },
        '992': {
          slidesPerView: 2,
        },
        '768': {
          slidesPerView: 2,
        },
        '576': {
          slidesPerView: 1,
        },
        '0': {
          slidesPerView: 1,
        },
      },
		  // Navigation arrows
      navigation: {
        nextEl: '.slider-next',
        prevEl: '.slider-prev',
      },
    });
    // =========================  Room-Details Js End ==============





        // ================================ Floating Progress js start =================================
      const progressContainers = document.querySelectorAll('.progress-container');

      function setPercentage(progressContainer) {
          const percentage = progressContainer.getAttribute('data-percentage') + '%';
          
          const progressEl = progressContainer.querySelector('.progress');
          const percentageEl = progressContainer.querySelector('.percentage');
          
          progressEl.style.width = percentage;
          percentageEl.innerText = percentage;
          percentageEl.style.insetInlineStart = percentage;
      }

      // Intersection Observer to trigger progress animation when section is in view
      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // Element is in view, start the progress animation
                  const progressContainer = entry.target;
                  setPercentage(progressContainer);
                  progressContainer.querySelector('.progress').classList.remove('active');
                  progressContainer.querySelector('.percentage').classList.remove('active');
                  observer.unobserve(progressContainer); // Stop observing once animation is triggered
              }
          });
      }, {
          threshold: 0.5 // Adjust this value as needed (0.5 means half the section needs to be visible)
      });

      // Start observing all progress containers
      progressContainers.forEach(progressContainer => {
          observer.observe(progressContainer);
    });
    // ================================ Floating Progress js End =================================


    // =========================  knob Js End ==============
      if (typeof ($.fn.knob) != 'undefined') {
        $('.knob').each(function () {
        var $this = $(this),
        knobVal = $this.attr('data-rel');

        $this.knob({
        'draw': function () {
          $(this.i).val(this.cv + '%')
        }
        });

        $this.appear(function () {
        $({
          value: 0
        }).animate({
          value: knobVal
        }, {
          duration: 2000,
          easing: 'swing',
          step: function () {
          $this.val(Math.ceil(this.value)).trigger('change');
          }
        });
        }, {
        accX: 0,
        accY: -150,
        });
      });
    }
    // =========================  knob Js End ==============



    


    
    // =========================  Home 4 Feature Js Start ==============
    $('.feature-four-list-wrap .feature-four-list-item').on("mouseenter", function () {
      $('#feature-four-thumb').removeClass().addClass($(this).attr('rel'));
      $(this).addClass('active').siblings().removeClass('active');
    });
    // =========================  Home 4 Feature Js End ==============


    

  // =========================  Home 2 Ecommerce Cart Js Start ==============
	function tw_ecommerce() {
		$('.tp-cart-minus').on('click', function () {
			var $input = $(this).parent().find('input');
			var count = Number($input.val()) - 1;
			count = count < 1 ? 1 : count;
			$input.val(count);
			$input.change();
			return false;
		});
	
		$('.tp-cart-plus').on('click', function () {
			var $input = $(this).parent().find('input');
			$input.val(Number($input.val()) + 1);
			$input.change();
			return false;
		});
	}
	tw_ecommerce();
  // =========================   Home 2 commerce Cart Js End ==============



  
  // =========================  Home 2 hover-btn js Start ==============
  $('.hover-btn').on('mouseenter', function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;

      $(this).find('.hover-btn-circle-dot').css({
          top: y,
          left: x
      });
  });
  $('.hover-btn').on('mouseout', function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;

      $(this).find('.hover-btn-circle-dot').css({
          top: y,
          left: x
      });
  });
  // =========================  Home 2 hover-btn js End ==============



    // Counter
    new PureCounter();
    new PureCounter({
        filesizing: true,
        selector: ".filesizecount",
        pulse: 2,
    });


  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
    var percentage = 0;
      var LoadingCounter = setInterval(function () {
        if (percentage <= 100) {
          // $('#loading-screen ').css('opacity', (100 - percentage));
          $("#loading-screen .loading-counter").text(percentage + "%");
          $("#loading-screen .bar").css("width", (100 - percentage) / 2 + "%");
          $("#loading-screen .progress-line").css("transform", "scale(" + percentage / 100 + ")");
          percentage++;
        } else {
          $("#loading-screen").fadeOut(500);
          setTimeout(() => {
            $("#loading-screen").remove();
          }, 500);
          clearInterval(LoadingCounter);
        }
      }, 10);
  // ========================= Preloader Js End=====================

  // ========================= Header Sticky Js Start ==============
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });
  // ========================= Header Sticky Js End===================
})(jQuery);
