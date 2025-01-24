const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const header = document.getElementById("header_projet"); // Récupère le header

let particles = [];

// Particule
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1; // Taille aléatoire
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1; // Densité
  }

  draw() {
    ctx.fillStyle = "#00b4d8"; // Couleur des points
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = 100;
    let force = (maxDistance - distance) / maxDistance;

    if (distance < maxDistance) {
      this.x -= forceDirectionX * force * this.density;
      this.y -= forceDirectionY * force * this.density;
    } else {
      this.x += (this.baseX - this.x) * 0.05;
      this.y += (this.baseY - this.y) * 0.05;
    }
  }
}

// Initialisation des particules
function initParticles() {
  particles = [];
  const particleCount = (canvas.width * canvas.height) / 9000; // Ajuste la densité
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
  }
}

// Connecter les particules
function connectParticles() {
  let opacityValue = 1;
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        opacityValue = 1 - distance / 120;
        ctx.strokeStyle = `rgba(0, 180, 216, ${opacityValue})`; // Couleur des lignes
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animation
const mouse = {
  x: null,
  y: null,
};

// Événements pour la souris
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x - header.offsetLeft; // Position de la souris relative au header
  mouse.y = event.y - header.offsetTop;  // Position de la souris relative au header
});

// Adapter la taille du canvas au header
function resizeCanvas() {
  canvas.width = header.offsetWidth;
  canvas.height = header.offsetHeight;
  initParticles(); // Réinitialiser les particules pour s'ajuster à la nouvelle taille du canvas
}

// Appeler resizeCanvas lors du redimensionnement de la fenêtre
window.addEventListener("resize", resizeCanvas);

// Initialiser le canvas à la bonne taille
resizeCanvas();

// Animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update(mouse);
  }
  connectParticles();
  requestAnimationFrame(animate);
}

// Lancer l'animation
animate();