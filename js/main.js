function handleResizeHeader() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  const width = window.innerWidth;
  const webUl = document.getElementById("webUl");
  const mobileUl = document.getElementById("mobileUl");
    const mobileFtr = document.getElementById("mobileFtr");

  if (width < 768) {
    header.classList.remove("hdrWeb");
    header.classList.add("hdrMobile");
    footer.style.display = "none";
    webUl.style.display = "none";
    mobileUl.style.display = "";

    if (mobileFtr) {
      mobileFtr.style.display = "";
    }
  } else {
    header.classList.remove("hdrMobile");
    header.classList.add("hdrWeb");
    footer.style.display = "";
    mobileUl.style.display = "none";
    webUl.style.display = "";

    if (mobileFtr) {
      mobileFtr.style.display = "none";
    }
  }
}



handleResizeHeader();
window.addEventListener("resize", handleResizeHeader);

const header = document.querySelector("header");
const footer = document.querySelector("footer");

function setMainMargin() {
  const main = document.querySelector("main");
  const slideContainer = document.querySelector("#slideContainer");

  if (header && main && footer) {
    main.style.marginTop = header.offsetHeight + "px";
  }

  if (header && slideContainer && footer) {
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;

    document.documentElement.style.setProperty(
      "--header-height",
      headerHeight + "px"
    );
    document.documentElement.style.setProperty(
      "--footer-height",
      footerHeight + "px"
    );
  }
}
window.addEventListener("DOMContentLoaded", setMainMargin);
window.addEventListener("resize", setMainMargin);

// slide Responsive @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function setSlideSizeRespon() {
  const slides = document.querySelectorAll(".slide");
  const viewportWidth = window.innerWidth;

  // 슬라이드가 있을 때만 width 계산
  if (slides.length > 0) {
    const slideWidth = slides[0].offsetWidth;
    document.documentElement.style.setProperty(
      "--slide-width",
      slideWidth + "px"
    );
  }

  // mobile
  if (viewportWidth < 768) {
    slides.forEach((slide) => {
      slide.classList.remove("slideWeb");
      slide.classList.add("slideMobile");
    });
    return;
  }

  // web
  if (viewportWidth > 767) {
    slides.forEach((slide) => {
      slide.classList.remove("slideMobile");
      slide.classList.add("slideWeb");
    });
  }
}
window.addEventListener("DOMContentLoaded", setSlideSizeRespon);
window.addEventListener("resize", setSlideSizeRespon);

// Update date Global editor  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

document.addEventListener("DOMContentLoaded", function () {
  const dateLi = document.getElementById("update-date");
  if (dateLi) {
    dateLi.textContent = "Site Updated on 2026. 01";
  }
});

// slider respons version @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const slideSpeedValue = "7582";

$(document).ready(function () {
  let sliderInitialized = false;

  // 공용: 개별 이미지 로드
  function loadImage($img) {
    if (!$img.length) return;
    if ($img.data("loaded") === true) return;

    const src = $img.attr("data-src");
    if (!src) return;

    $img.attr("src", src);
    $img.data("loaded", true);
  }

  // ===== 768 이하에서 사용할 lazy load =====

  let lazyObserver = null;
  let lazyScrollBound = false;

  // 뷰포트 체크 (fallback용)
  function isInViewport($el) {
    const rect = $el[0].getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    return rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0;
  }

  // scroll + resize fallback
  function lazyLoadOnScroll() {
    $("#slider .slide img[data-src]").each(function () {
      const $img = $(this);
      if (isInViewport($img)) {
        loadImage($img);
      }
    });
  }

  function initLazyLoadForApp() {
    const $imgs = $("#slider .slide img[data-src]");

    // 이미 연결되어 있으면 재초기화 방지
    if (window.innerWidth > 768) return;

    // IntersectionObserver 지원 시
    if ("IntersectionObserver" in window) {
      // 기존 observer 정리
      if (lazyObserver) {
        lazyObserver.disconnect();
        lazyObserver = null;
      }

      lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          loadImage($(img));
          observer.unobserve(img);
        });
      });

      $imgs.each(function () {
        const img = this;
        // 이미 로드된 것은 제외
        if (!$(img).data("loaded")) {
          lazyObserver.observe(img);
        }
      });
    } else {
      // Fallback: scroll + resize 이벤트로 체크
      if (!lazyScrollBound) {
        lazyScrollBound = true;
        $(window).on("scroll.lazyApp resize.lazyApp", lazyLoadOnScroll);
      }
      // 최초 1회 체크
      lazyLoadOnScroll();
    }
  }

  function destroyLazyLoadForApp() {
    if (lazyObserver) {
      lazyObserver.disconnect();
      lazyObserver = null;
    }
    if (lazyScrollBound) {
      lazyScrollBound = false;
      $(window).off("scroll.lazyApp resize.lazyApp");
    }
  }

  // ===== 슬라이더 + prev/next 제어 =====

  function slideResponsTriger() {
    if (window.innerWidth > 768) {
      // web slide 모드
      destroyLazyLoadForApp(); // app용 lazy 해제

      // prev / next 표시
      $("#prev, #next").css("display", "inline-block");

      if (sliderInitialized) return;
      sliderInitialized = true;

      function loadAroundActive() {
        const $slides = $("#slider .slide");
        const $active = $slides.filter(".active");
        if (!$active.length) return;

        const activeIndex = $slides.index($active);

        $slides.each(function (i) {
          const $slide = $(this);
          const $img = $slide.find("img");
          const distance = Math.abs(i - activeIndex);
          if (distance <= 2) {
            loadImage($img);
          }
        });
      }

      const slideNextSpeed = 100;
      const slidePrevSpeed = 150;
      const autoSwitch = false;
      const autoSwitchSpeed = 4000;

      if (autoSwitch === true) {
        setInterval(nextSlide, autoSwitchSpeed);
      }

      $(".slide").first().addClass("active");
      $(".slide").hide();
      $(".active").show();

      // 초기 로드
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

        loadAroundActive();
      }
    } else {
      // app 모드 (세로 나열 + lazy load)

      // prev / next 숨김
      $("#prev, #next").css("display", "none");

      if (!sliderInitialized) {
        // 이미 app 모드일 때는 lazy만 보장
        initLazyLoadForApp();
        return;
      }

      sliderInitialized = false;

      // 슬라이더 이벤트 제거
      $("#next").off(".slider").css("cursor", "auto");
      $("#prev").off(".slider").css("cursor", "auto");

      // 슬라이드 상태 초기화
      $(".slide").stop(true, true).show().removeClass("active oldActive");

      // app 모드용 lazy load 시작
      initLazyLoadForApp();
    }
  }

  slideResponsTriger();
  $(window).on("resize", slideResponsTriger);
});

// Redefine Tablet Height @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function setAppHeight() {
  const appVh = window.innerHeight;
  document.documentElement.style.setProperty("--app-height", appVh + "px");
}

window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", setAppHeight);
window.addEventListener("DOMContentLoaded", setAppHeight);

// mobile footer @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function mobileFooter() {
  const brandGraphics = document.querySelector("footer ul li:nth-child(2)");
  if (!brandGraphics) return;

  if (window.innerWidth < 768) {
    brandGraphics.style.visibility = "hidden";
  } else {
    brandGraphics.style.visibility = "";
  }
}

window.addEventListener("DOMContentLoaded", mobileFooter);
window.addEventListener("resize", mobileFooter);

// alert password, func'enter' @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const alert = document.getElementById("alertPopBack");
const pwdInput = document.getElementById("overlay-password");
const pwdBtn = document.getElementById("overlay-btn");
const pwdMsg = document.getElementById("overlay-msg");

if (alert) {
  function handlePasswordCheck() {
    const value = pwdInput.value.trim();

    if (value === slideSpeedValue) {
      alert.classList.add("hidden");
    } else {
      pwdMsg.textContent = "해당 웹사이트는 아직 개발 단계에 있습니다.";
    }
  }

  pwdBtn.addEventListener("click", handlePasswordCheck);

  pwdInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handlePasswordCheck();
    }
  });
}

// slide Pointer BlendMode @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const slidePointer = document.getElementById("slidePointer");
const pointerImgs = document.querySelectorAll("#slidePointer img");
const prevPointer = pointerImgs[0];
const nextPointer = pointerImgs[pointerImgs.length - 1];
const prev = document.getElementById("prev");
const next = document.getElementById("next");

if (slidePointer && prev && next) {
  function hidePointer() {
    slidePointer.style.display = "none";
    pointerImgs.forEach((img) => {
      img.style.display = "none";
    });
  }

  document.addEventListener("mousemove", (e) => {
    slidePointer.style.left = e.clientX + "px";
    slidePointer.style.top = e.clientY + "px";
  });

  prev.addEventListener("mouseenter", () => {
    document.body.style.cursor = "none";
    hidePointer();
    slidePointer.style.display = "block";
    slidePointer.style.transform = "translate(-1px, -16px)";
    if (prevPointer) prevPointer.style.display = "block";
  });
  prev.addEventListener("mouseleave", () => {
    hidePointer();
    document.body.style.cursor = "auto";
  });

  next.addEventListener("mouseenter", () => {
    document.body.style.cursor = "none";
    hidePointer();
    slidePointer.style.display = "block";
    slidePointer.style.transform = "translate(-31px, -16px)";
    if (nextPointer) nextPointer.style.display = "block";
  });
  next.addEventListener("mouseleave", () => {
    hidePointer();
    document.body.style.cursor = "auto";
  });
}
