// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Matrix-style code rain (subtle, blue)
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let cols, drops;
const chars = '01{}[]()<>/=+-*&|;:.$#01ΣΔΛΩ∑∫∂';

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 14;
  cols = Math.floor(canvas.width / fontSize);
  drops = Array(cols).fill(0).map(() => Math.random() * -100);
}
resize();
window.addEventListener('resize', resize);

function draw() {
  ctx.fillStyle = 'rgba(5,7,13,0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#60a5fa';
  ctx.font = '14px JetBrains Mono, monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * 14, drops[i] * 14);
    if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(draw, 60);

// Parallax for portrait
const portrait = document.querySelector('.portrait-frame');
if (portrait) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    portrait.style.transform = `translate(${x}px, ${y}px)`;
  });
}
