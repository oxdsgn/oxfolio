// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// slide backup 251219 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const slideSpeedValue = "7582";
$(document).ready(function () {
  let sliderInitialized = false;

  function initSlider() {
    if (sliderInitialized) return;
    sliderInitialized = true;

    // options
    var slideNextSpeed = 300;
    var slidePrevSpeed = 600;
    var autoSwitch = false;
    var autoSwitchSpeed = 4000;

    if (autoSwitch === true) {
      setInterval(nextSlide, autoSwitchSpeed);
    }
    $(".slide").first().addClass("active");
    $(".slide").hide();
    $(".active").show();

    $("#next").on("click.slider", nextSlide);
    $("#prev").on("click.slider", prevSlide);

    function nextSlide() {
      $(".active").removeClass("active").addClass("oldActive");
      if ($(".oldActive").is(":last-child")) {
        $(".slide").first().addClass("active");
      } else {
        $(".oldActive").next().addClass("active");
      }
      $(".oldActive").removeClass("oldActive");
      $(".slide").fadeOut(slidePrevSpeed);
      $(".active").fadeIn(slideNextSpeed);
    }

    function prevSlide() {
      $(".active").removeClass("active").addClass("oldActive");
      if ($(".oldActive").is(":first-child")) {
        $(".slide").last().addClass("active");
      } else {
        $(".oldActive").prev().addClass("active");
      }
      $(".oldActive").removeClass("oldActive");
      $(".slide").fadeOut(slidePrevSpeed);
      $(".active").fadeIn(slideNextSpeed);
    }

    // slide pointer @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // $("#next")
    //   .on("mouseenter.slider", function () {
    //     $(this).css("cursor", "url(./../img/nextPointer.png) 31 16, auto");
    //   })
    //   .on("mouseleave.slider", function () {
    //     $(this).css("cursor", "auto");
    //   });

    // $("#prev")
    //   .on("mouseenter.slider", function () {
    //     $(this).css("cursor", "url(./../img/prevPointer.png) 1 16, auto");
    //   })
    //   .on("mouseleave.slider", function () {
    //     $(this).css("cursor", "auto");
    //   });
  }

  function destroySlider() {
    if (!sliderInitialized) return;
    sliderInitialized = false;

    // 이벤트 제거
    $("#next").off(".slider").css("cursor", "auto");
    $("#prev").off(".slider").css("cursor", "auto");

    // 슬라이드 상태 초기화 (원하는 형태로 조정 가능)
    $(".slide").stop(true, true).show().removeClass("active oldActive");
  }

  function TouchSlideTriger() {
    if (window.innerWidth > 768) {
      initSlider(); // 커졌을 때 슬라이더 켜기
    } else {
      destroySlider(); // 작아졌을 때 슬라이더 끄기
    }
  }

  TouchSlideTriger();
  $(window).on("resize", TouchSlideTriger);
});

//slider loadFree @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const slideSpeedValue = "7582";
$(document).ready(function () {
  let sliderInitialized = false;

  // slide 개별 이미지 로드
  function loadImage($img) {
    if (!$img.length) return;
    if ($img.data("loaded") === true) return;

    const src = $img.attr("data-src");
    if (!src) return;
    // console.log("loadImage 호출, data-src", src); // 디버그용

    $img.attr("src", src);
    $img.data("loaded", true);
  }

  // active 기준 앞뒤 2*slide까지 로드
  function loadAroundActive() {
    // console.log("loadAroundActive 실행");  // 디버그용

    const $slides = $("#slider .slide");
    const $active = $slides.filter(".active");
    if (!$active.length) return;

    const activeIndex = $slides.index($active);
    // console.log("현재 active인덱스:", activeIndex); //디버그용

    $slides.each(function (i) {
      const $slide = $(this);
      const $img = $slide.find("img");
      const distance = Math.abs(i - activeIndex);

      if (distance <= 2) {
        loadImage($img);
      }

      //디버그용 open
      // if (distance <= 2) {
      //   console.log(
      //     "로그 대상 슬라이드 인덱스",
      //     i,
      //     "distance",
      //     distance,
      //     "data-src",
      //     $img.attr("data-src")
      //   );
      //   loadImage($img);
      // } else {
      //   console.log("로드 안 함(범위 밖) 인덱스", i, "distance", distance);
      // }
      //디버그용 close
    });
  }

  function initSlider() {
    if (sliderInitialized) return;
    sliderInitialized = true;

    // options
    var slideNextSpeed = 300;
    var slidePrevSpeed = 600;
    var autoSwitch = false;
    var autoSwitchSpeed = 4000;

    if (autoSwitch === true) {
      setInterval(nextSlide, autoSwitchSpeed);
    }
    $(".slide").first().addClass("active");
    $(".slide").hide();
    $(".active").show();

    //초기 로드
    loadAroundActive();

    $("#next").on("click.slider", nextSlide);
    $("#prev").on("click.slider", prevSlide);

    function nextSlide() {
      $(".active").removeClass("active").addClass("oldActive");
      if ($(".oldActive").is(":last-child")) {
        $(".slide").first().addClass("active");
      } else {
        $(".oldActive").next().addClass("active");
      }
      $(".oldActive").removeClass("oldActive");
      $(".slide").fadeOut(slidePrevSpeed);
      $(".active").fadeIn(slideNextSpeed);

      //active 변동 시 주변 로드
      loadAroundActive();
    }

    function prevSlide() {
      $(".active").removeClass("active").addClass("oldActive");
      if ($(".oldActive").is(":first-child")) {
        $(".slide").last().addClass("active");
      } else {
        $(".oldActive").prev().addClass("active");
      }
      $(".oldActive").removeClass("oldActive");
      $(".slide").fadeOut(slidePrevSpeed);
      $(".active").fadeIn(slideNextSpeed);

      //active 변동 시 주변 로드
      loadAroundActive();
    }

    // slide pointer @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // $("#next")
    //   .on("mouseenter.slider", function () {
    //     $(this).css("cursor", "url(./../img/nextPointer.png) 31 16, auto");
    //   })
    //   .on("mouseleave.slider", function () {
    //     $(this).css("cursor", "auto");
    //   });

    // $("#prev")
    //   .on("mouseenter.slider", function () {
    //     $(this).css("cursor", "url(./../img/prevPointer.png) 1 16, auto");
    //   })
    //   .on("mouseleave.slider", function () {
    //     $(this).css("cursor", "auto");
    //   });
  }

  function destroySlider() {
    if (!sliderInitialized) return;
    sliderInitialized = false;

    // 이벤트 제거
    $("#next").off(".slider").css("cursor", "auto");
    $("#prev").off(".slider").css("cursor", "auto");

    // 슬라이드 상태 초기화 (원하는 형태로 조정 가능)
    $(".slide").stop(true, true).show().removeClass("active oldActive");
  }

  function TouchSlideTriger() {
    if (window.innerWidth > 768) {
      initSlider(); // 커졌을 때 슬라이더 켜기
    } else {
      destroySlider(); // 작아졌을 때 슬라이더 끄기
    }
  }

  TouchSlideTriger();
  $(window).on("resize", TouchSlideTriger);
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//slider Respon @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const slideSpeedValue = "7582";
$(document).ready(function () {
  let sliderInitialized = false;

  function slideResponsTriger() {
    if (window.innerWidth > 768) {
      if (sliderInitialized) return; // web slide
      sliderInitialized = true;

      // slide 개별 이미지 로드
      function loadImage($img) {
        if (!$img.length) return;
        if ($img.data("loaded") === true) return;

        const src = $img.attr("data-src");
        if (!src) return;
        // console.log("loadImage 호출, data-src", src); // 디버그용

        $img.attr("src", src);
        $img.data("loaded", true);
      }

      // active 기준 앞뒤 2*slide까지 로드
      function loadAroundActive() {
        // console.log("loadAroundActive 실행");  // 디버그용

        const $slides = $("#slider .slide");
        const $active = $slides.filter(".active");
        if (!$active.length) return;

        const activeIndex = $slides.index($active);
        // console.log("현재 active인덱스:", activeIndex); //디버그용

        $slides.each(function (i) {
          const $slide = $(this);
          const $img = $slide.find("img");
          const distance = Math.abs(i - activeIndex);

          if (distance <= 2) {
            loadImage($img);
          }

          //디버그용 open
          // if (distance <= 2) {
          //   console.log(
          //     "로그 대상 슬라이드 인덱스",
          //     i,
          //     "distance",
          //     distance,
          //     "data-src",
          //     $img.attr("data-src")
          //   );
          //   loadImage($img);
          // } else {
          //   console.log("로드 안 함(범위 밖) 인덱스", i, "distance", distance);
          // }
          //디버그용 close
        });
      }

      // options
      var slideNextSpeed = 300;
      var slidePrevSpeed = 600;
      var autoSwitch = false;
      var autoSwitchSpeed = 4000;

      if (autoSwitch === true) {
        setInterval(nextSlide, autoSwitchSpeed);
      }
      $(".slide").first().addClass("active");
      $(".slide").hide();
      $(".active").show();

      //초기 로드
      loadAroundActive();

      $("#next").on("click.slider", nextSlide);
      $("#prev").on("click.slider", prevSlide);

      function nextSlide() {
        $(".active").removeClass("active").addClass("oldActive");
        if ($(".oldActive").is(":last-child")) {
          $(".slide").first().addClass("active");
        } else {
          $(".oldActive").next().addClass("active");
        }
        $(".oldActive").removeClass("oldActive");
        $(".slide").fadeOut(slidePrevSpeed);
        $(".active").fadeIn(slideNextSpeed);

        //active 변동 시 주변 로드
        loadAroundActive();
      }

      function prevSlide() {
        $(".active").removeClass("active").addClass("oldActive");
        if ($(".oldActive").is(":first-child")) {
          $(".slide").last().addClass("active");
        } else {
          $(".oldActive").prev().addClass("active");
        }
        $(".oldActive").removeClass("oldActive");
        $(".slide").fadeOut(slidePrevSpeed);
        $(".active").fadeIn(slideNextSpeed);

        //active 변동 시 주변 로드
        loadAroundActive();
      }
    } else {
      if (!sliderInitialized) return; // app slide
      sliderInitialized = false;

      $(document).ready(function () {
        let sliderInitialized = false;

        function initSlider() {
          if (sliderInitialized) return;
          sliderInitialized = true;

          // options
          var slideNextSpeed = 300;
          var slidePrevSpeed = 600;
          var autoSwitch = false;
          var autoSwitchSpeed = 4000;

          if (autoSwitch === true) {
            setInterval(nextSlide, autoSwitchSpeed);
          }
          $(".slide").first().addClass("active");
          $(".slide").hide();
          $(".active").show();

          $("#next").on("click.slider", nextSlide);
          $("#prev").on("click.slider", prevSlide);

          function nextSlide() {
            $(".active").removeClass("active").addClass("oldActive");
            if ($(".oldActive").is(":last-child")) {
              $(".slide").first().addClass("active");
            } else {
              $(".oldActive").next().addClass("active");
            }
            $(".oldActive").removeClass("oldActive");
            $(".slide").fadeOut(slidePrevSpeed);
            $(".active").fadeIn(slideNextSpeed);
          }

          function prevSlide() {
            $(".active").removeClass("active").addClass("oldActive");
            if ($(".oldActive").is(":first-child")) {
              $(".slide").last().addClass("active");
            } else {
              $(".oldActive").prev().addClass("active");
            }
            $(".oldActive").removeClass("oldActive");
            $(".slide").fadeOut(slidePrevSpeed);
            $(".active").fadeIn(slideNextSpeed);
          }

          // slide pointer @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          // $("#next")
          //   .on("mouseenter.slider", function () {
          //     $(this).css("cursor", "url(./../img/nextPointer.png) 31 16, auto");
          //   })
          //   .on("mouseleave.slider", function () {
          //     $(this).css("cursor", "auto");
          //   });

          // $("#prev")
          //   .on("mouseenter.slider", function () {
          //     $(this).css("cursor", "url(./../img/prevPointer.png) 1 16, auto");
          //   })
          //   .on("mouseleave.slider", function () {
          //     $(this).css("cursor", "auto");
          //   });
        }

        function destroySlider() {
          if (!sliderInitialized) return;
          sliderInitialized = false;

          // 이벤트 제거
          $("#next").off(".slider").css("cursor", "auto");
          $("#prev").off(".slider").css("cursor", "auto");

          // 슬라이드 상태 초기화 (원하는 형태로 조정 가능)
          $(".slide").stop(true, true).show().removeClass("active oldActive");
        }

        function TouchSlideTriger() {
          if (window.innerWidth > 768) {
            initSlider(); // 커졌을 때 슬라이더 켜기
          } else {
            destroySlider(); // 작아졌을 때 슬라이더 끄기
          }
        }

        TouchSlideTriger();
        $(window).on("resize", TouchSlideTriger);
      });

      // 이벤트 제거
      $("#next").off(".slider").css("cursor", "auto");
      $("#prev").off(".slider").css("cursor", "auto");

      // 슬라이드 상태 초기화 (원하는 형태로 조정 가능)
      $(".slide").stop(true, true).show().removeClass("active oldActive");
    }
  }

  slideResponsTriger();
  $(window).on("resize", slideResponsTriger);
});
