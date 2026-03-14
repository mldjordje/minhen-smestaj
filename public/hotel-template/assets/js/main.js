(function ($) {
  "use strict";

  /*
  |--------------------------------------------------------------------------
  | Template Name: Breezie
  | Author: Laralink
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Modal Video
  | 7. Scroll Up
  | 8. Accordian
  | 9. Review
  | 10. Hobble Effect
  | 11. Date Range Picker
  | 12. Quantity
  | 13. Payment Method Toggle
  | 14. Counter Animation
  | 15. Light Gallery
  | 16. Custom Mouse Pointer
  | 17. Load More Portfolio Items
  | 18. Loading Text Animation
  | 19. AOS Animation
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    preloader();
    loadingText();
  });
  $(window).on("scroll", function () {
    stickyHeader();
    showScrollUp();
    aosInit();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    slickInit();
    modalVideo();
    scrollUp();
    accordian();
    review();
    hobbleEffect();
    counterInit();
    daterangepickerInit();
    quantityInit();
    paymentMethodToggle();
    lightGallery();
    loadMore();
    customMousePointer();
    aosInit();
    if ($.exists(".cs_getting_year")) {
      const date = new Date();
      $(".cs_getting_year").text(date.getFullYear());
    }
  });
  // Run on window resize
  $(window).on("resize", function () {
    const mobileWidth = 1199;
    if ($(window).width() >= mobileWidth) {
      $(".cs_header_top,.cs_menu_toggle,.cs_nav_list_wrap").removeClass(
        "active"
      );
    }
  });
  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $(".cs_preloader_in").fadeOut();
    $(".cs_preloader").delay(150).fadeOut("slow");
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $(".cs_nav").append('<span class="cs_menu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="cs_menu_dropdown_toggle"><span></span></span>'
    );
    $(".cs_menu_toggle").on("click", function () {
      $(this)
        .toggleClass("active")
        .siblings(".cs_nav_list_wrap")
        .toggleClass("active");
      $(".cs_header_top").toggleClass("active");
    });
    $(".cs_menu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });
    $(".cs_search_toggler").on("click", function () {
      $(".cs_header_search").addClass("active");
      $(".cs_user_content").slideUp();
    });
    $(".cs_close, .cs_sidenav_overlay").on("click", function () {
      $(".cs_sidenav, .cs_header_search").removeClass("active");
    });
    $(".cs_user_toggler").on("click", function () {
      $(this).siblings(".cs_user_content").slideToggle();
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".cs_sticky_header").addClass("cs_sticky_active");
    } else {
      $(".cs_sticky_header").removeClass("cs_sticky_active");
    }
  }
  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }

  /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists(".cs_slider")) {
      $(".cs_slider").each(function () {
        // Slick Variable
        var $ts = $(this).find(".cs_slider_container");
        var $slickActive = $(this).find(".cs_slider_wrapper");
        var $status = $(this).find(".cs_slider_number");

        // Auto Play
        var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr("data-speed"), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr("data-variable-width"), 10)
        );
        // Pagination
        var paginaiton = $(this)
          .find(".cs_pagination")
          .hasClass("cs_pagination");
        // Slide Per View
        var slidesPerView = $ts.attr("data-slides-per-view");
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10);
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10);
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10);
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10);
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr("data-fade-slide"));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        /* Start Count Slide Number */
        $slickActive.on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html(
              `<span class="cs_current_number">${i}</span> <span class="cs_slider_number_seperator"></span> <span class="cs_total_numbers">${slick.slideCount}</span>`
            );
          }
        );
        /* End Count Slide Number */

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: "28%",
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find(".cs_left_arrow"),
          nextArrow: $(this).find(".cs_right_arrow"),
          appendDots: $(this).find(".cs_pagination"),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
          ],
        });
      });
    }

    /* Start Gallery Slider */
    if ($.exists(".cs_gallery_slider_thumb")) {
      $(".cs_gallery_slider_thumb").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $(".cs_left_arrow_gallery"),
        nextArrow: $(".cs_right_arrow_gallery"),
        asNavFor: ".cs_gallery_slider_nav",
        fade: false,
      });
      $(".cs_gallery_slider_nav").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".cs_gallery_slider_thumb",
        focusOnSelect: true,
        arrows: true,
        vertical: false,
        centerMode: true,
        fade: true,
      });
    }

    if ($.exists(".cs_single_room_slider_1")) {
      $(".cs_single_room_slider_1").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".cs_single_room_nav_1",
        arrows: false,
        pagination: false,
        dots: true,
        speed: 1000,
      });
      $(".cs_single_room_nav_1").slick({
        slidesToScroll: 1,
        asNavFor: ".cs_single_room_slider_1",
        focusOnSelect: false,
        arrows: true,
        centerMode: true,
        variableWidth: true,
        speed: 600,
      });
    }
    /* End Gallery Slider */
  }

  /*--------------------------------------------------------------
    6. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    if ($.exists(".cs_video_open")) {
      $("body").append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup_container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup_close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on("click", ".cs_video_open", function (e) {
        e.preventDefault();
        var video = $(this).attr("href");

        $(".cs_video_popup_container iframe").attr("src", `${video}`);

        $(".cs_video_popup").addClass("active");
      });
      $(".cs_video_popup_close, .cs_video_popup-layer").on(
        "click",
        function (e) {
          $(".cs_video_popup").removeClass("active");
          $("html").removeClass("overflow-hidden");
          $(".cs_video_popup_container iframe").attr("src", "about:blank");
          e.preventDefault();
        }
      );
    }
  }

  /*--------------------------------------------------------------
    7. Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $(".cs_scrollup").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        0
      );
    });
  }

  /* For Scroll Up */
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".cs_scrollup").addClass("active");
    } else {
      $(".cs_scrollup").removeClass("active");
    }
  }
  /*--------------------------------------------------------------
    8. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $(".cs_accordian").children(".cs_accordian_body").hide();
    $(".cs_accordian.active").children(".cs_accordian_body").show();
    $(".cs_accordian_head").on("click", function () {
      $(this)
        .parent(".cs_accordian")
        .siblings()
        .children(".cs_accordian_body")
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find(".cs_accordian_body")
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents(".cs_accordian").addClass("active");
      $(this).parent(".cs_accordian").siblings().removeClass("active");
    });
  }

  /*--------------------------------------------------------------
    9. Review
  --------------------------------------------------------------*/
  function review() {
    $(".cs_rating").each(function () {
      var review = $(this).data("rating");
      var reviewVal = review * 20 + "%";
      $(this).find(".cs_rating_percentage").css("width", reviewVal);
    });
  }

  /*--------------------------------------------------------------
    10. Hobble Effect
  --------------------------------------------------------------*/
  function hobbleEffect() {
    $(document)
      .on("mousemove", ".cs_hobble", function (event) {
        var halfW = this.clientWidth / 2;
        var halfH = this.clientHeight / 2;
        var coorX = halfW - (event.pageX - $(this).offset().left);
        var coorY = halfH - (event.pageY - $(this).offset().top);
        var degX1 = (coorY / halfH) * 8 + "deg";
        var degY1 = (coorX / halfW) * -8 + "deg";
        var degX3 = (coorY / halfH) * -15 + "px";
        var degY3 = (coorX / halfW) * 15 + "px";

        $(this)
          .find(".cs_hover_layer_1")
          .css("transform", function () {
            return (
              "perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(" +
              degX1 +
              ") rotateY(" +
              degY1 +
              ")"
            );
          });
        $(this)
          .find(".cs_hover_layer_2")
          .css("transform", function () {
            return (
              "perspective( 800px ) translateX(" +
              degX3 +
              ") translateY(" +
              degY3 +
              ") scale(1.04)"
            );
          });
      })
      .on("mouseout", ".cs_hobble", function () {
        $(this).find(".cs_hover_layer_1").removeAttr("style");
        $(this).find(".cs_hover_layer_2").removeAttr("style");
      });
  }

  /*--------------------------------------------------------------
    11. Date Range Picker
  --------------------------------------------------------------*/
  function daterangepickerInit() {
    let dateToday = new Date();
    let formattedDate = dateToday.toISOString().split("T")[0];
    $(".cs_start_date_value").text(formattedDate);
    dateToday.setDate(dateToday.getDate() + 1);
    formattedDate = dateToday.toISOString().split("T")[0];
    $(".cs_end_date_value").text(formattedDate);

    $('input[name="datetimes"]').daterangepicker(
      {
        cs_start_date: moment().startOf("hour"),
        cs_end_date: moment().startOf("hour").add(24, "hour"),
        minDate: moment().startOf("hour"),
      },
      function (start, end, label) {
        let cs_start_date = start.format("YYYY-MM-DD").toString();
        let cs_end_date = end.format("YYYY-MM-DD").toString();
        $(".cs_start_date").text(cs_start_date);
        $(".cs_end_date").text(cs_end_date);
      }
    );
  }

  /*--------------------------------------------------------------
    12. Quantity
  --------------------------------------------------------------*/
  function quantityInit() {
    //Guest Summery Update Functionality
    function updateSummary() {
      let adults = $(".cs_adult input").val();
      let children = $(".cs_children input").val();
      const guestSummery = [
        adults > 0 ? `${adults} Adults` : "",
        children > 0 ? `${children} Children` : "",
      ]
        .filter(Boolean)
        .join(", ");
      $(".cs_quantity_btn").val(guestSummery);
    }
    $(".cs_quantity_btn").on("click", function () {
      $(this).siblings(".cs_quantity_dropdown").toggleClass("active");
      updateSummary();
    });
    $(".cs_select_btn").on("click", function () {
      $(this).siblings(".cs_quantity_dropdown").toggleClass("active");
      updateRoom();
    });
    // Increment button
    $(".cs_quantity_up").click(function () {
      var $input = $(this).closest(".cs_quantity").find("input");
      var max = parseInt($input.attr("max"));
      var currentVal = parseInt($input.val());

      if (currentVal < max) {
        $input.val(currentVal + 1);
      } else {
        $input.val(max);
      }
      updateSummary();
    });
    // Decrement button
    $(".cs_quantity_down").click(function () {
      var $input = $(this).closest(".cs_quantity").find("input");
      var min = parseInt($input.attr("min"));
      var currentVal = parseInt($input.val());

      if (currentVal > min) {
        $input.val(currentVal - 1);
      } else {
        $input.val(min);
      }
      updateSummary();
    });
    // Room Summery Update Functionality
    function updateRoom() {
      $(".cs_options_wrapper input").on("click", function () {
        var selectedValue = $(this).val();
        $(this)
          .closest(".cs_quantity_wrap")
          .find(".cs_select_btn")
          .val(selectedValue);
        $(".cs_quantity_dropdown").removeClass("active");
      });
    }
    // Language Update Functionality
    $(".cs_language_switcher").on("click", function () {
      $(this).siblings(".cs_language_dropdown").slideToggle();
      updateLanguage();
    });
    function updateLanguage() {
      $(".cs_language_dropdown input").on("click", function () {
        var selectedValue = $(this).val();
        $(this)
          .closest(".cs_language_select")
          .find(".cs_language_switcher input")
          .val(selectedValue);
        $(".cs_language_dropdown").slideUp();
      });
    }
    // Close Input Box
    function closeInputbox() {
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".cs_quantity_wrap").length) {
          $(".cs_quantity_dropdown").removeClass("active");
        }
      });
    }
    closeInputbox();
    updateSummary();
  }

  /*--------------------------------------------------------------
    13. Payment Method Toggle
  --------------------------------------------------------------*/
  function paymentMethodToggle() {
    $('input[name="paymentMethod"]').change(function () {
      if ($(this).is(":checked") && $(this).attr("id") === "debitCardRadio") {
        $(".cs_debit_card_box").slideDown();
      } else {
        $(".cs_debit_card_box").slideUp();
      }
    });
  }
  /*--------------------------------------------------------------
    14. Counter Animation
  --------------------------------------------------------------*/
  function counterInit() {
    if ($.exists(".odometer")) {
      $(window).on("scroll", function () {
        function winScrollPosition() {
          var scrollPos = $(window).scrollTop(),
            winHeight = $(window).height();
          var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
          return scrollPosition;
        }

        $(".odometer").each(function () {
          var elemOffset = $(this).offset().top;
          if (elemOffset < winScrollPosition()) {
            $(this).html($(this).data("count-to"));
          }
        });
      });
    }
  }
  /*--------------------------------------------------------------
    15. Light Gallery
  --------------------------------------------------------------*/
  function lightGallery() {
    $(".cs_lightgallery").each(function () {
      $(this).lightGallery({
        selector: ".cs_lightbox_item",
        subHtmlSelectorRelative: false,
        thumbnail: true,
        mousewheel: true,
      });
    });
  }

  /*--------------------------------------------------------------
    16. Custom Mouse Pointer
  --------------------------------------------------------------*/
  function customMousePointer() {
    $(".cs_custom_pointer_wrap").each(function () {
      $(this).on("mousemove", function (e) {
        let mouseX = e.pageX - $(this).offset().left;
        let mouseY = e.pageY - $(this).offset().top;

        $(this)
          .find(".cs_mouse_point")
          .css({
            top: mouseY + "px",
            left: mouseX + "px",
          });
      });
    });
  }

  /*--------------------------------------------------------------
    17. Load More Portfolio Items
   --------------------------------------------------------------*/
  function loadMore() {
    $(".cs_gallery_item").slice(0, 3).show();
    $("#loadMore").on("click", function (e) {
      e.preventDefault();
      $(".cs_gallery_item:hidden").slice(0, 3).slideDown(250);
      if ($(".cs_gallery_item:hidden").length <= 1) {
        $("#loadMore").text("No More to view");
      }
    });
  }

  /*-----------------------------------------------
    18. Loading Text Animation
  -------------------------------------------------*/
  function loadingText() {
    const text = document.querySelector(".cs_loading_text");
    const chars = text.textContent.split("");
    text.textContent = "";

    chars.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${index * 0.15}s`;
      text.appendChild(span);
    });
  }
  /*-----------------------------------------------
    19. AOS Animation
  -------------------------------------------------*/
  function aosInit() {
    AOS.init({
      offset: 120,
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }
})(jQuery); // End of use strict
