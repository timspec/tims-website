// ==================== //
// Particle System
// ==================== //

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // Random animation duration
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        
        // Random size variation
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particlesContainer.appendChild(particle);
    }
}

// ==================== //
// Interactive Word Effects
// ==================== //

function initializeWordInteractions() {
    const words = document.querySelectorAll('.word');
    
    words.forEach((word, index) => {
        // Add click effect
        word.addEventListener('click', () => {
            word.style.animation = 'none';
            setTimeout(() => {
                word.style.animation = '';
                word.style.animationName = 'wordFadeIn';
                word.style.animationDuration = '0.8s';
                word.style.animationFillMode = 'forwards';
            }, 10);
        });
        
        // Add mouse move effect for highlight word
        if (word.classList.contains('highlight')) {
            word.addEventListener('mousemove', (e) => {
                const rect = word.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                word.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
            });
            
            word.addEventListener('mouseleave', () => {
                word.style.transform = '';
            });
        }
    });
}

// ==================== //
// Glass Card Tilt Effect
// ==================== //

function initializeCardTilt() {
    const card = document.querySelector('.glass-card');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
}

// ==================== //
// Dynamic Gradient Animation
// ==================== //

function animateGradients() {
    const highlight = document.querySelector('.highlight');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        // Subtle hue rotation for the gradient
        highlight.style.filter = `hue-rotate(${hue * 0.2}deg) brightness(${1 + Math.sin(hue * 0.05) * 0.1})`;
    }, 50);
}

// ==================== //
// Cursor Trail Effect
// ==================== //

function createCursorTrail() {
    let lastX = 0;
    let lastY = 0;
    let isMoving = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!isMoving) {
            isMoving = true;
            
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            trail.style.width = '6px';
            trail.style.height = '6px';
            trail.style.borderRadius = '50%';
            trail.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.8), transparent)';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.transform = 'translate(-50%, -50%)';
            trail.style.animation = 'trailFade 0.8s ease-out forwards';
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 800);
            
            setTimeout(() => {
                isMoving = false;
            }, 30);
        }
        
        lastX = e.clientX;
        lastY = e.clientY;
    });
    
    // Add trail fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes trailFade {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== //
// Keyboard Interactions
// ==================== //

function initializeKeyboardEffects() {
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            const words = document.querySelectorAll('.word');
            words.forEach((word, index) => {
                setTimeout(() => {
                    word.style.animation = 'none';
                    setTimeout(() => {
                        word.style.animation = '';
                        word.style.animationName = 'wordFadeIn';
                        word.style.animationDuration = '0.8s';
                        word.style.animationFillMode = 'forwards';
                    }, 10);
                }, index * 100);
            });
        }
    });
}

// ==================== //
// Initialize Everything
// ==================== //

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initializeWordInteractions();
    initializeCardTilt();
    animateGradients();
    createCursorTrail();
    initializeKeyboardEffects();
    
    console.log('🎨 Interactive greeting page loaded successfully!');
});

// ==================== //
// Performance Optimization
// ==================== //

// Reduce animations on low-performance devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--blur-lg', '40px');
    document.documentElement.style.setProperty('--blur-md', '20px');
}
