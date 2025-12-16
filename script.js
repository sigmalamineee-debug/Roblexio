const loaderWrapper = document.querySelector('.loader-wrapper');
const pageReveal = document.querySelector('.page-reveal');

loaderWrapper.style.display = 'flex';
pageReveal.style.display = 'none';

setTimeout(() => {
    loaderWrapper.style.opacity = '0';
    setTimeout(() => {
        loaderWrapper.style.display = 'none';
        document.body.classList.add('page-loaded');
    }, 500);
}, 2000);

function staggerElementsIn() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        
        const colors = ['59, 130, 246', '6, 182, 212', '139, 92, 246'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

animate();

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            particle.x -= dx / distance * 2;
            particle.y -= dy / distance * 2;
        }
    });
});

const featureCards = document.querySelectorAll('.feature-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) perspective(1000px) rotateX(10deg)';
    observer.observe(card);
});

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
    });
});

const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

const parallaxElements = document.querySelectorAll('[class*="parallax-"]');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    parallaxElements.forEach(el => {
        let speed = 0.5;
        if (el.classList.contains('parallax-slow')) speed = 0.3;
        if (el.classList.contains('parallax-medium')) speed = 0.5;
        if (el.classList.contains('parallax-fast')) speed = 0.7;

        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

const revealElements = document.querySelectorAll('.reveal-on-scroll, .slide-in-left, .slide-in-right, .scale-in');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(faq => faq.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.querySelector('.mobile-overlay');
const navTabs = document.querySelectorAll('.nav-tab');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
});

mobileOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});



const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card');
            statCards.forEach((card, index) => {
                const numberEl = card.querySelector('.stat-number');
                
                
                
                
                
                
                
                
                
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

async function fetchDiscordStats() {
    try {
        
        const inviteCode = 'hKURBTwV7J';

        
        const response = await fetch('https://discord.com/api/guilds/1322664892959621120/widget.json');

        if (!response.ok) {
            throw new Error('Widget not enabled');
        }

        const data = await response.json();
        const onlineCount = data.presence_count || 0;

        
        const onlineEl = document.getElementById('onlineCount');
        if (onlineEl) {
            onlineEl.textContent = onlineCount.toLocaleString();
        }

    } catch (error) {
        console.log('Discord stats unavailable:', error.message);
        
    }
}

fetchDiscordStats();

setInterval(fetchDiscordStats, 5 * 60 * 1000);



const mouseSpotlight = document.getElementById('mouseSpotlight');

document.addEventListener('mousemove', (e) => {
    if (mouseSpotlight) {
        mouseSpotlight.style.left = e.clientX + 'px';
        mouseSpotlight.style.top = e.clientY + 'px';
    }
});

const constellationCanvas = document.getElementById('constellation-canvas');
if (constellationCanvas) {
    const ctx = constellationCanvas.getContext('2d');
    constellationCanvas.width = window.innerWidth;
    constellationCanvas.height = window.innerHeight;

    function drawConstellationLines() {
        ctx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);

        
        if (particles && particles.length > 0) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        requestAnimationFrame(drawConstellationLines);
    }

    drawConstellationLines();

    
    window.addEventListener('resize', () => {
        constellationCanvas.width = window.innerWidth;
        constellationCanvas.height = window.innerHeight;
    });
}



window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
});

const sections = ['home', 'features', 'faq', 'credits', 'download'];
const depthDots = document.querySelectorAll('.depth-dot');

depthDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const section = document.getElementById(sections[index]);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    let currentSection = 0;
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = index;
            }
        }
    });

    depthDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSection);
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    
    document.querySelectorAll('.parallax-slow').forEach(el => {
        el.style.transform = ranslateY(px);
    });

    document.querySelectorAll('.parallax-medium').forEach(el => {
        el.style.transform = ranslateY(px);
    });

    document.querySelectorAll('.parallax-fast').forEach(el => {
        el.style.transform = ranslateY(px);
    });
});

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.add('stagger-fade');
    fadeObserver.observe(item);
});



document.querySelectorAll('.flip-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = button.closest('.feature-card');
        card.classList.toggle('flipped');
    });
});

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');

        
        const glow = card.querySelector('::before') || card;
        if (card.style) {
            card.style.setProperty('--glow-x', (x - 100) + 'px');
            card.style.setProperty('--glow-y', (y - 100) + 'px');
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    .feature-card::before {
        left: var(--glow-x, -100px);
        top: var(--glow-y, -100px);
    }
`;
document.head.appendChild(style);


class SoundSystem {
    constructor() {
        this.musicEnabled = false;
        this.sfxEnabled = true;
        this.musicVolume = 0.3;
        this.sfxVolume = 0.5;
        
        
        this.audioContext = null;
        
        
        const savedMusic = localStorage.getItem('musicEnabled');
        const savedSfx = localStorage.getItem('sfxEnabled');
        if (savedMusic !== null) this.musicEnabled = savedMusic === 'true';
        if (savedSfx !== null) this.sfxEnabled = savedSfx === 'true';
    }
    
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    playHoverSound() {
        if (!this.sfxEnabled) return;
        this.initAudioContext();
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    playClickSound() {
        if (!this.sfxEnabled) return;
        this.initAudioContext();
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 1200;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
    
    playSuccessSound() {
        if (!this.sfxEnabled) return;
        this.initAudioContext();
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        localStorage.setItem('musicEnabled', this.musicEnabled);
        return this.musicEnabled;
    }
    
    toggleSfx() {
        this.sfxEnabled = !this.sfxEnabled;
        localStorage.setItem('sfxEnabled', this.sfxEnabled);
        return this.sfxEnabled;
    }
    
    setMusicVolume(volume) {
        this.musicVolume = volume / 100;
    }
    
    setSfxVolume(volume) {
        this.sfxVolume = volume / 100;
    }
}

const soundSystem = new SoundSystem();


const soundToggle = document.getElementById('soundToggle');
const volumeControl = document.getElementById('volumeControl');
const musicVolumeSlider = document.getElementById('musicVolume');
const sfxVolumeSlider = document.getElementById('sfxVolume');

if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        volumeControl.classList.toggle('active');
        soundSystem.playClickSound();
    });
}


document.addEventListener('click', (e) => {
    if (volumeControl && !volumeControl.contains(e.target) && e.target !== soundToggle) {
        volumeControl.classList.remove('active');
    }
});


if (musicVolumeSlider) {
    musicVolumeSlider.addEventListener('input', (e) => {
        soundSystem.setMusicVolume(e.target.value);
    });
}

if (sfxVolumeSlider) {
    sfxVolumeSlider.addEventListener('input', (e) => {
        soundSystem.setSfxVolume(e.target.value);
        soundSystem.playHoverSound();
    });
}


document.querySelectorAll('.btn, .nav-tab, .flip-button, .feature-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        soundSystem.playHoverSound();
    });
});


document.querySelectorAll('.btn, button, a').forEach(element => {
    element.addEventListener('click', () => {
        soundSystem.playClickSound();
    });
});

