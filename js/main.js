function setMainMargin() {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  if (header && main) {
    main.style.marginTop = header.offsetHeight + "px";
  }
}
window.addEventListener("DOMContentLoaded", setMainMargin);
window.addEventListener("resize", setMainMargin);

//업데이트 일자 공동 수정
document.addEventListener("DOMContentLoaded", function () {
  const dateLi = document.getElementById("update-date");
  if (dateLi) {
    dateLi.textContent = "Updated on 2025. 09"; //업데이트 일자 기입
  }
});

//vinyl

let audioCtx,
  buffer,
  source,
  speed = 1;
const tTable = document.getElementById("tTable"),
  play = document.getElementById("play"),
  stop = document.getElementById("stop");

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, tTable.scrollHeight / 2.5);
});

gsap.to("tTable", {
  opacity: 1,
  scrollTrigger: {
    trigger: "tTable",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.05,
    onLeave: function () {
      window.scrollTo(0, 0);
    },
    onScrubComplete: (self) => {
      speed = 1;
      tTable.style.setProperty("--cursor", "grab");
      if (play.disabled === true) {
        source.playbackRate.value = speed;
        tTable.style.setProperty("--speed", 1);
      }
      if (self.progress === 0) {
        window.scrollTo(0, tTable.scrollHeight);
      }
    },
    onUpdate: ({ getVelocity }) => {
      if (getVelocity() < 1) {
        speed = Math.max(1 - Math.abs(getVelocity() / 3000), 0.05);
        tTable.style.setProperty("--speed", speed);
      } else {
        speed = 1 + Math.abs(getVelocity() / 3000);
        tTable.style.setProperty("--speed", speed);
      }
      if (play.disabled === true) {
        tTable.style.setProperty("--cursor", "grabbing");
        source.playbackRate.value = speed;
      }
    },
  },
});

async function loadAudio() {
  try {
    // Load an audio file
    const response = await fetch(
      "https://assets.codepen.io/383755/squeezeme.mp3"
    );
    // Decode it
    buffer = await audioCtx.decodeAudioData(await response.arrayBuffer());
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}

play.addEventListener("click", async () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    secondaryCtx = new AudioContext();
    await loadAudio();
  }
  body.classList.add("playing");
  setTimeout(() => {
    source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.loop = true;
    source.start();
    play.disabled = true;
  }, 1000);
});

stop.addEventListener("click", async () => {
  body.classList.remove("playing");
  source.stop();
  play.disabled = false;
});
