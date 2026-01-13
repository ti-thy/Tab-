// Mobile menu
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
    });
});

// Fade-in on scroll
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, {threshold: 0.1});
sections.forEach(sec => observer.observe(sec));

// Refined starfield: fewer stars, slower, twinkling
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let width, height;
function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);

const stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01
    });
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) star.twinkleSpeed *= -1;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.x -= star.speed;
        if (star.x < 0) star.x = width;
    });
    requestAnimationFrame(animate);
}
animate();