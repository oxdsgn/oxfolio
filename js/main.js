function setMainMargin() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
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
