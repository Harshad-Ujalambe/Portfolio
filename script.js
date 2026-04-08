// ─── DARK MODE ───
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("themeBtn");
  btn.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

// Restore saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  document.getElementById("themeBtn").innerHTML = "☀️";
}

// ─── CURSOR GLOW ───
const glow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

reveals.forEach(el => observer.observe(el));

// ─── NAVBAR SCROLL EFFECT ───
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.style.padding = "12px 60px";
    navbar.style.boxShadow = "0 4px 30px rgba(0,0,0,0.1)";
  } else {
    navbar.style.padding = "18px 60px";
    navbar.style.boxShadow = "none";
  }
});

// ─── SMOOTH ACTIVE NAV LINKS ───
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
  });
});

// ─── PROJECT CARD TILT ───
document.querySelectorAll(".project-card, .info-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 6;
    const rotY = (x / rect.width) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ─── NUMBER COUNTER ANIMATION ───
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + "+"; clearInterval(timer); return; }
    el.textContent = Math.floor(start) + "+";
  }, 16);
}

const statNum = document.querySelector(".stat-num");
if (statNum) {
  const statObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounter(statNum, 6);
      statObserver.disconnect();
    }
  });
  statObserver.observe(statNum);
}