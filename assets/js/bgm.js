
    const bgm = new Audio();
    bgm.src = '../bgm/loveStory.mp3';
    bgm.loop = true;
    bgm.volume = 0;
    
    const playWithFade = () => {
        bgm.play();
        let vol = 0;
        const fadeIn = setInterval(() => {
            if (vol < 0.3) {
                vol += 0.02;
                bgm.volume = vol;
            } else {
                clearInterval(fadeIn);
            }
        }, 100);
    };
    
    playWithFade();
    
    document.addEventListener('click', () => {
        if (bgm.paused) playWithFade();
    }, { once: true });
