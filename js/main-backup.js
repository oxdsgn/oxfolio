$(document).ready(function () {
  if (window.innerWidth <= 768) {
    return;
  }

  //options
  var slideNextSpeed = 300;
  var slidePrevSpeed = 600;
  var autoSwitch = false;
  var autoSwitchSpeed = 4000;

  $(".slide").first().addClass("active");
  $(".slide").hide();
  $(".active").show();

  $("#next").on("click", nextSlide);
  $("#prev").on("click", prevSlide);

  if (autoSwitch === true) {
    setInterval(nextSlide, autoSwitchSpeed);
  }

  //slide btn
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

  //slide icon
  $("#next")
    .on("mouseenter", function () {
      $(this).css("cursor", "url(./../img/nextPointer.png) 31 16, auto");
    })
    .on("mouseleave", function () {
      $(this).css("cursor", "auto");
    });

  $("#prev")
    .on("mouseenter", function () {
      $(this).css("cursor", "url(./../img/prevPointer.png) 1 16, auto");
    })
    .on("mouseleave", function () {
      $(this).css("cursor", "auto");
    });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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

    // slide icon
    $("#next")
      .on("mouseenter.slider", function () {
        $(this).css("cursor", "url(./../img/nextPointer.png) 31 16, auto");
      })
      .on("mouseleave.slider", function () {
        $(this).css("cursor", "auto");
      });

    $("#prev")
      .on("mouseenter.slider", function () {
        $(this).css("cursor", "url(./../img/prevPointer.png) 1 16, auto");
      })
      .on("mouseleave.slider", function () {
        $(this).css("cursor", "auto");
      });
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

  function checkWidth() {
    if (window.innerWidth > 768) {
      initSlider(); // 커졌을 때 슬라이더 켜기
    } else {
      destroySlider(); // 작아졌을 때 슬라이더 끄기
    }
  }

  // 최초 1회 체크
  checkWidth();
  // 리사이즈 때마다 체크
  $(window).on("resize", checkWidth);
});
