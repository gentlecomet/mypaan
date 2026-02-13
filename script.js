// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(heart);
    }
}

// ===== MUSIC VARIABLES (declared only) =====
let bgMusic;
let musicBtn;

let musicStarted = false;
let isPlaying = false;

// 🎬 Smooth fade-in function
function playMusicWithFade() {
    if (!bgMusic) return;      // safety
    if (musicStarted) return;

    musicStarted = true;
    bgMusic.volume = 0;

    bgMusic.play().then(() => {
        isPlaying = true;
        if (musicBtn) musicBtn.textContent = "⏸️";

        let vol = 0;
        const fade = setInterval(() => {
            if (vol < 1) {
                vol += 0.03;
                bgMusic.volume = Math.min(vol, 1);
            } else {
                clearInterval(fade);
            }
        }, 120);
    }).catch(err => {
        console.log("Audio play blocked:", err);
    });
}

// ===== LOVE LETTER =====
function initLoveLetter() {
    const envelope = document.getElementById('envelope');
    const closed = document.getElementById('envelope-closed');
    const open = document.getElementById('envelope-open');

    envelope.addEventListener('click', () => {
        closed.classList.add('hidden');
        open.classList.remove('hidden');

        // 💖 Start music when letter opens
        playMusicWithFade();
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const cards = document.querySelectorAll('.reason-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = parseInt(card.dataset.reason);
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
}

// ===== HEARTS GAME =====
function initHeartsGame() {
    const gameArea = document.getElementById('game-area');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('game-message');
    const hint = gameArea.querySelector('.game-hint');

    let score = 0;

    const messages = [
        'I love you! 💖',
        'You are amazing! ✨',
        'My heart is yours! 💕',
        'Forever together! 💑',
        'You complete me! 💗',
        'Best girlfriend ever! 🌟',
    ];

    function spawnHeart() {
        const heart = document.createElement('button');
        heart.className = 'game-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 80 + 10 + '%';
        heart.style.top = Math.random() * 60 + 20 + '%';

        heart.addEventListener('click', (e) => {
            e.stopPropagation();
            heart.remove();
            score++;
            scoreElement.textContent = score;
            messageElement.textContent =
                messages[Math.floor(Math.random() * messages.length)];
        });

        gameArea.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 3000);
    }

    setInterval(() => {
        if (hint) hint.style.display = 'none';
        spawnHeart();
    }, 1500);
}

// ===== SECRET MESSAGE =====
function initSecretMessage() {
    const box = document.getElementById('secret-box');
    const locked = document.getElementById('secret-locked');
    const unlocked = document.getElementById('secret-unlocked');
    const lockIcon = document.getElementById('lock-icon');

    let clicks = 0;

    box.addEventListener('click', () => {
        clicks++;

        if (clicks >= 3) {
            locked.classList.add('hidden');
            unlocked.classList.remove('hidden');
            box.style.cursor = 'default';
        } else {
            lockIcon.classList.add('shake');
            setTimeout(() => lockIcon.classList.remove('shake'), 500);

            const hint = locked.querySelector('.unlock-hint');

            if (clicks === 1) {
                hint.textContent = 'Click again to reveal...';
                lockIcon.textContent = '🔓';
            } else if (clicks === 2) {
                hint.textContent = 'One more click...';
            }
        }
    });
}

// ===== MUSIC BUTTON (PLAY / PAUSE) =====
function initMusicButton() {
    musicBtn.addEventListener('click', () => {
        if (!musicStarted) {
            playMusicWithFade();
            return;
        }

        if (isPlaying) {
            bgMusic.pause();
            musicBtn.textContent = "🎵";
        } else {
            bgMusic.play();
            musicBtn.textContent = "⏸️";
        }

        isPlaying = !isPlaying;
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {

    // ✅ NOW we grab DOM elements safely
    bgMusic = document.getElementById('bg-music');
    musicBtn = document.getElementById('music-btn');

    initForeverQuestion();
    createFloatingHearts();
    initLoveLetter();
    initScrollReveal();
    initHeartsGame();
    initSecretMessage();
    initMusicButton();

    // 💍 FOREVER QUESTION BUTTONS
function initForeverQuestion() {

    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const result = document.getElementById("proposal-result");

    if (!yesBtn || !noBtn) return;

    // 💘 YES BUTTON
    yesBtn.addEventListener("click", () => {
        result.textContent = "You just made me the happiest person alive";
        yesBtn.textContent = "YEAAAA 💘";
    });

    // 🙈 NO BUTTON RUNS AWAY (desktop + mobile)
    function moveButton() {
        const x = Math.random() * 300 - 150;
        const y = Math.random() * 200 - 100;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    noBtn.addEventListener("click", moveButton);     // desktop click
    noBtn.addEventListener("touchstart", moveButton); // mobile tap
}

    
});
