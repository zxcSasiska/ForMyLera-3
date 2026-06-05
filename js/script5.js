const translateBtn = document.getElementById('translateBtn');
const translation = document.getElementById('translation');
const heartsRain = document.getElementById('heartsRain');

// Перевод
translateBtn.addEventListener('click', function() {
    translation.textContent = 'Я люблю тебя, моя Лерочка ❤️';
    translation.classList.add('show');
    translateBtn.style.display = 'none';
    
    createHeartsRain();
});

// Дождь из сердечек
function createHeartsRain() {
    const hearts = ['❤️', '💕', '💗', '💖', '💘', '💝', '💓', '🩷'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.classList.add('heart-particle');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 30 + 16) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            heartsRain.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 80);
    }
}

// --- Анимированное сердце из линий (Canvas) ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0;
const particles = [];
const particleCount = 500; // Было 300

// Создаём частицы
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.progress = Math.random();
        this.speed = 0.0008 + Math.random() * 0.0015;
        this.size = 1.5 + Math.random() * 3.5; // Было 1 + Math.random() * 2.5
        this.opacity = 0.4 + Math.random() * 0.7; // Было 0.3
        this.hue = 340 + Math.random() * 20;
    }
    
    getHeartPoint(t) {
        // Увеличенный масштаб сердца
        const scale = 22; // Было 14
        const x = 16 * Math.pow(Math.sin(t * Math.PI * 2), 3);
        const y = -(13 * Math.cos(t * Math.PI * 2) - 5 * Math.cos(2 * t * Math.PI * 2) - 2 * Math.cos(3 * t * Math.PI * 2) - Math.cos(4 * t * Math.PI * 2));
        return { x: x * scale, y: y * scale };
    }
    
    update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
            this.progress = 0;
        }
    }
    
    draw(ctx, centerX, centerY) {
        const point = this.getHeartPoint(this.progress);
        const x = centerX + point.x;
        const y = centerY + point.y;
        
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 65%, ${this.opacity})`;
        ctx.fill();
        
        // Свечение
        ctx.beginPath();
        ctx.arc(x, y, this.size * 3, 0, Math.PI * 2); // Было 2.5
        ctx.fillStyle = `hsla(${this.hue}, 100%, 65%, ${this.opacity * 0.2})`; // Было 0.15
        ctx.fill();
    }
}

// Инициализация
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Соединения между частицами
function drawConnections(centerX, centerY) {
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i].getHeartPoint(particles[i].progress);
        const x1 = centerX + p1.x;
        const y1 = centerY + p1.y;
        
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j].getHeartPoint(particles[j].progress);
            const x2 = centerX + p2.x;
            const y2 = centerY + p2.y;
            
            const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            
            if (dist < 70) { // Было 50
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(255, 70, 100, ${0.1 * (1 - dist / 70)})`; // Было 0.08
                ctx.lineWidth = 1; // Было 0.8
                ctx.stroke();
            }
        }
    }
}

// Анимация
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    particles.forEach(p => {
        p.update();
        p.draw(ctx, centerX, centerY);
    });
    
    drawConnections(centerX, centerY);
    
    // Мерцающий контур сердца
    time += 0.02;
    const glowIntensity = 0.2 + Math.sin(time) * 0.08; // Было 0.12 + 0.05
    
    ctx.beginPath();
    const firstPoint = particles[0].getHeartPoint(0);
    ctx.moveTo(centerX + firstPoint.x, centerY + firstPoint.y);
    
    for (let t = 0; t <= 1; t += 0.005) {
        const point = particles[0].getHeartPoint(t);
        ctx.lineTo(centerX + point.x, centerY + point.y);
    }
    
    ctx.strokeStyle = `rgba(255, 50, 80, ${glowIntensity})`;
    ctx.lineWidth = 2.5; // Было 2
    ctx.shadowBlur = 35; // Было 25
    ctx.shadowColor = 'rgba(255, 30, 70, 0.8)'; // Было 0.6
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});