// Particle Animation
const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}

// Age Counter
function updateAgeCounter() {
  const birthDate = new Date('2005-06-20T00:00:00');
  setInterval(() => {
    const now = new Date();
    const diff = now - birthDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('ageCounter').textContent =
      `Time since you were born: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }, 1000);
}

// Play Music on Interaction
function setupMusic() {
  const audio = document.getElementById('birthdaySong');
  const playMusic = () => {
    audio.play();
    document.removeEventListener('click', playMusic);
  };
  document.addEventListener('click', playMusic);
}

// Initialize
window.addEventListener('load', () => {
  resizeCanvas();
  createParticles();
  animateParticles();
  updateAgeCounter();
  setupMusic();
});

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});
