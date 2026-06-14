// ─── Typed name effect ───────────────────────────────────────────────────────
function typeWriter(elementId, text, speed) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.after(cursor);

  function tick() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(tick, speed);
    } else {
      cursor.classList.add('blink');
    }
  }

  setTimeout(tick, 500);
}

// ─── Scroll animations ───────────────────────────────────────────────────────
const animObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.animate').forEach(function(el) {
  animObserver.observe(el);
});

// ─── Scrollspy ───────────────────────────────────────────────────────────────
var sections  = Array.from(document.querySelectorAll('section[id]'));
var navLinks  = Array.from(document.querySelectorAll('#nav-links a[href^="#"]'));
var navHeight = 64;

window.addEventListener('scroll', function() {
  var scrollY  = window.scrollY;
  var current  = '';

  sections.forEach(function(section) {
    if (scrollY >= section.offsetTop - navHeight - 20) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function(link) {
    var active = link.getAttribute('href') === '#' + current;
    link.classList.toggle('active', active);
  });
}, { passive: true });

// ─── Hamburger menu ──────────────────────────────────────────────────────────
var hamburger   = document.getElementById('hamburger');
var navLinksEl  = document.getElementById('nav-links');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  typeWriter('typed-name', 'Stelios Athanasiou', 65);
});
