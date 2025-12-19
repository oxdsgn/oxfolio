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

//slide Responsive @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function setSlideSizeRespon() {
  const slide = document.querySelectorAll(".slide");
  const viewportWidth = window.innerWidth;
  if (slide) {
    const slideWidth = slide.offsetWidth;
    document.documentElement.style.setProperty(
      "--slide-width",
      slideWidth + "px"
    );
  }
  //mobile
  if (viewportWidth < 768) {
    slide.forEach((slide) => {
      slide.classList.remove("slideWeb");
      slide.classList.add("slideMobile");
    });
    return;
  }
  //web
  if (viewportWidth > 767)
    slide.forEach((slide) => {
      slide.classList.remove("slideMobile");
      slide.classList.add("slideWeb");
    });
}
window.addEventListener("DOMContentLoaded", setSlideSizeRespon);
window.addEventListener("resize", setSlideSizeRespon);

//Update date Global editor  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

document.addEventListener("DOMContentLoaded", function () {
  const dateLi = document.getElementById("update-date");
  if (dateLi) {
    dateLi.textContent = "Site Updated on 2025. 12"; //업데이트 일자 기입
  }
});

//vinyl  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// let audioCtx,
//   buffer,
//   source,
//   speed = 1;
// const tTable = document.getElementById("tTable"),
//   play = document.getElementById("play"),
//   stop = document.getElementById("stop");

// document.addEventListener("DOMContentLoaded", function () {
//   window.scrollTo(0, tTable.scrollHeight / 2.5);
// });

// gsap.to("tTable", {
//   opacity: 1,
//   scrollTrigger: {
//     trigger: "tTable",
//     start: "top top",
//     end: "bottom bottom",
//     scrub: 0.05,
//     onLeave: function () {
//       window.scrollTo(0, 0);
//     },
//     onScrubComplete: (self) => {
//       speed = 1;
//       tTable.style.setProperty("--cursor", "grab");
//       if (play.disabled === true) {
//         source.playbackRate.value = speed;
//         tTable.style.setProperty("--speed", 1);
//       }
//       if (self.progress === 0) {
//         window.scrollTo(0, tTable.scrollHeight);
//       }
//     },
//     onUpdate: ({ getVelocity }) => {
//       if (getVelocity() < 1) {
//         speed = Math.max(1 - Math.abs(getVelocity() / 3000), 0.05);
//         tTable.style.setProperty("--speed", speed);
//       } else {
//         speed = 1 + Math.abs(getVelocity() / 3000);
//         tTable.style.setProperty("--speed", speed);
//       }
//       if (play.disabled === true) {
//         tTable.style.setProperty("--cursor", "grabbing");
//         source.playbackRate.value = speed;
//       }
//     },
//   },
// });

// async function loadAudio() {
//   try {
//     // Load an audio file
//     const response = await fetch(
//       "https://assets.codepen.io/383755/squeezeme.mp3"
//     );
//     // Decode it
//     buffer = await audioCtx.decodeAudioData(await response.arrayBuffer());
//   } catch (err) {
//     console.error(`Unable to fetch the audio file. Error: ${err.message}`);
//   }
// }

// play.addEventListener("click", async () => {
//   if (!audioCtx) {
//     audioCtx = new AudioContext();
//     secondaryCtx = new AudioContext();
//     await loadAudio();
//   }
//   body.classList.add("playing");
//   setTimeout(() => {
//     source = audioCtx.createBufferSource();
//     source.buffer = buffer;
//     source.connect(audioCtx.destination);
//     source.loop = true;
//     source.start();
//     play.disabled = true;
//   }, 1000);
// });

// stop.addEventListener("click", async () => {
//   body.classList.remove("playing");
//   source.stop();
//   play.disabled = false;
// });

//slider @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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

//Redefine Tablet Height @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function setAppHeight() {
  const appVh = window.innerHeight;
  document.documentElement.style.setProperty("--app-height", appVh + "px");
}

window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", setAppHeight);
window.addEventListener("DOMContentLoaded", setAppHeight);
//mobile footer @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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

const alert = document.getElementById("alertPopBack");
const pwdInput = document.getElementById("overlay-password");
const pwdBtn = document.getElementById("overlay-btn");
const pwdMsg = document.getElementById("overlay-msg");

if (alert) {
  pwdBtn.addEventListener("click", function () {
    const value = pwdInput.value.trim();

    if (value === slideSpeedValue) {
      alert.classList.add("hidden");
    } else {
      pwdMsg.textContent = "Incorrect password. Please try again";
    }
  });
}

// slide Pointer BlendMode !delete slide pointer '*203'

const slidePointer = document.getElementById("slidePointer");
const pointerImgs = document.querySelectorAll("#slidePointer img");
const prevPointer = pointerImgs[0];
const nextPointer = pointerImgs[pointerImgs.length - 1];
const prev = document.getElementById("prev");
const next = document.getElementById("next");

if (slidePointer) {
  function hidePointer() {
    slidePointer.style.display = "none";
    pointerImgs.forEach((img) => {
      img.style.display = "none";
    });
  }

  if (slidePointer) {
    document.addEventListener("mousemove", (e) => {
      slidePointer.style.left = e.clientX + "px";
      slidePointer.style.top = e.clientY + "px";
    });
  }

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
