  const music = document.getElementById("bgMusic");
  let hasPlayed = false; // ensures music starts only once
  let interval;

  function fadeIn(audio) {
    audio.volume = 0;
    audio.play().catch(err => console.log("Autoplay blocked:", err));
    let fade = setInterval(() => {
      if (audio.volume < 0.9) {
        audio.volume += 0.05;
      } else {
        clearInterval(fade);
      }
    }, 200);
  }

  function startMusicCycle() {
    // Start first fade-in play
    fadeIn(music);

    // Repeat every 45 seconds
    interval = setInterval(() => {
      music.currentTime = 0;
      fadeIn(music);
    }, 45000); // 45 seconds
  }

  function startOnFirstInteraction() {
    if (!hasPlayed) {
      startMusicCycle();
      hasPlayed = true; // ensure it won't restart on future interactions
    }
  }

  // Trigger only once on first scroll/touch/click
  window.addEventListener("scroll", startOnFirstInteraction, { once: true });
  window.addEventListener("touchstart", startOnFirstInteraction, { once: true });
  window.addEventListener("click", startOnFirstInteraction, { once: true });
