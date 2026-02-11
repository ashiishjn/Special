// DOM Elements
const pages = document.querySelectorAll('.page');
const heartsContainer = document.getElementById('heartsContainer');
const typingText = document.getElementById('typingText');
const emojiRain = document.getElementById('emojiRain');
const scrambleText = document.getElementById('scrambleText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hint = document.getElementById('hint');

// Current page index
let currentPage = 0;

// Page timings (in milliseconds) - how long each page stays before transitioning
const pageTimings = [
    4000,  // Page 1: Hey Surthi
    3000,  // Page 2: It's Valentine's Day
    4500,  // Page 3: Typing animation
    3000,  // Page 4: That's what I was going to ask
    2500,  // Page 5: But then I stopped
    3500,  // Page 6: I realized...
    2000,  // Page 7: Because
    4000,  // Page 8: You are special :)
    2000,  // Page 9: So
    3500,  // Page 10: Emoji rain
    3000,  // Page 11: I am finally asking
];

// Text to type on page 3
const textToType = "Will you be my Valentine?";

// Final asking text for scramble animation
const finalAskingText = "I am finally asking...";

// Start the page sequence
function startPageSequence() {
    showPage(0);
}

// Show a specific page with transition
function showPage(index) {
    if (index >= pages.length) return;
    
    // Hide current page
    pages.forEach((page, i) => {
        if (i !== index) {
            page.classList.remove('active');
            page.classList.add('fade-out');
        }
    });
    
    // Show new page after a brief delay
    setTimeout(() => {
        pages.forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active', 'fade-out', 'fade-in');
        });
        
        pages[index].style.display = 'flex';
        
        // Trigger reflow
        void pages[index].offsetWidth;
        
        pages[index].classList.add('active');
        
        currentPage = index;
        
        // Handle special page actions
        handlePageActions(index);
        
        // Auto advance to next page (except for question and success pages)
        if (index < 11 && pageTimings[index]) {
            setTimeout(() => {
                showPage(index + 1);
            }, pageTimings[index]);
        }
    }, 400);
}

// Handle special actions for specific pages
function handlePageActions(index) {
    // Page 3: Start typing animation
    if (index === 2) {
        startTypingAnimation();
    }
    
    // Page 10: Start emoji rain
    if (index === 9) {
        startEmojiRain();
    }
}

// Typing animation for page 3
function startTypingAnimation() {
    typingText.textContent = '';
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < textToType.length) {
            typingText.textContent += textToType[charIndex];
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Emoji rain for page 10
function startEmojiRain() {
    const emojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🩷', '✨', '💫', '🌹', '🥰'];
    
    // Create initial emojis
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createRainEmoji(emojis);
        }, i * 100);
    }
    
    // Continue creating emojis
    const rainInterval = setInterval(() => {
        if (currentPage === 9) {
            createRainEmoji(emojis);
        } else {
            clearInterval(rainInterval);
        }
    }, 200);
}

function createRainEmoji(emojis) {
    const emoji = document.createElement('div');
    emoji.className = 'rain-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
    emoji.style.animationDuration = (Math.random() * 3 + 4) + 's';
    emojiRain.appendChild(emoji);
    
    setTimeout(() => emoji.remove(), 7000);
}

// Scramble animation for page 12
function startScrambleAnimation() {
    // Create reversed/scrambled version first
    const originalText = finalAskingText;
    const scrambledText = originalText.split('').reverse().join('');
    
    // Create letter spans with scrambled text
    scrambleText.innerHTML = '';
    for (let i = 0; i < scrambledText.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = scrambledText[i];
        span.dataset.original = originalText[i];
        span.dataset.index = i;
        scrambleText.appendChild(span);
    }
    
    // Animate each letter to correct position one by one
    const letters = scrambleText.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('flip');
            setTimeout(() => {
                letter.textContent = letter.dataset.original;
            }, 300);
        }, index * 150);
    });
}

// Create floating hearts background
function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🩷'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 9000);
    }, 500);
}

// ============ BUTTON LOGIC ============

let noClickCount = 0;

const hints = [
    "Are you sure? 🥺",
    "Please think again... 💔",
    "My heart is breaking... 😢",
    "You're making me sad... 🥹",
    "Pretty please? 🙏💕",
    "I promise to love you forever! 💖",
    "Don't do this to me... 😭",
    "Come on, you know you want to say yes! 😏",
    "I'll give you all my love! 💝",
    "Just click Yes already! 😤💕"
];

const noButtonTexts = [
    "No 😢",
    "Wrong Button 😅",
    "But what if...? 🤔",
    "Pretty Please 🥺💕",
    "Think Again 💭",
    "Are you sure? 😰",
    "Really? 😢",
    "Not this one! 🙈",
    "Click the other one! 👉",
    "Nooo please 😭",
    "I'll be sad 💔",
    "Reconsider? 🥹",
    "Give me a chance 🙏",
    "One more try? 💫",
    "You're breaking my heart 💔"
];

// Yes button click handler
yesBtn.addEventListener('click', () => {
    showPage(12); // Show success page
    createCelebration();
    setInterval(createCelebration, 500);
});

// No button behavior - make it run away!
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

function moveNoButton(e) {
    e.preventDefault();
    
    noClickCount++;
    
    // Update No button text
    if (noClickCount < noButtonTexts.length) {
        noBtn.textContent = noButtonTexts[noClickCount];
    } else {
        noBtn.textContent = noButtonTexts[Math.floor(Math.random() * noButtonTexts.length)];
    }
    
    // Show hints
    if (noClickCount <= hints.length) {
        hint.textContent = hints[noClickCount - 1];
    } else {
        hint.textContent = hints[Math.floor(Math.random() * hints.length)];
    }
    
    // Make the Yes button bigger each time
    const currentScale = 1 + (noClickCount * 0.1);
    yesBtn.style.transform = `scale(${Math.min(currentScale, 2)})`;
    
    // Move the No button to a random position
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;
    
    let newX, newY;
    let attempts = 0;
    
    do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        attempts++;
    } while (
        Math.abs(newX - btnRect.left) < 100 && 
        Math.abs(newY - btnRect.top) < 100 && 
        attempts < 10
    );
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '50';
    noBtn.style.transition = 'all 0.1s ease';
    
    const noScale = Math.max(0.5, 1 - (noClickCount * 0.03));
    noBtn.style.transform = `scale(${noScale})`;
    
    if (noClickCount >= 12) {
        noBtn.style.opacity = Math.max(0, 1 - ((noClickCount - 12) * 0.15));
    }
    
    if (noClickCount >= 18) {
        noBtn.style.display = 'none';
        hint.textContent = "The No button gave up! Guess you have to click Yes! 😏💕";
    }
}

// Create celebration effects
function createCelebration() {
    const colors = ['#ff6b6b', '#ff8e8e', '#ffb6c1', '#ff69b4', '#ff1493', '#dc143c', '#ff0000'];
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🩷', '✨', '💫', '🌟'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'celebration-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '0';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 50);
    }
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// ============ INITIALIZE ============
createFloatingHearts();
startPageSequence();
