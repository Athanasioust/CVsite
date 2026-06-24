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

  // Bottom of page: the last section (Contact) is too short to ever scroll
  // under the navbar, so its threshold is unreachable — force it active here.
  if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1].getAttribute('id');
  }

  navLinks.forEach(function(link) {
    var active = link.getAttribute('href') === '#' + current;
    link.classList.toggle('active', active);
  });
}, { passive: true });

// ─── Hamburger menu ──────────────────────────────────────────────────────────
var hamburger   = document.getElementById('hamburger');
var navLinksEl  = document.getElementById('nav-links');

function setMenu(open) {
  hamburger.classList.toggle('open', open);
  navLinksEl.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
}

hamburger.addEventListener('click', function() {
  setMenu(!navLinksEl.classList.contains('open'));
});

navLinksEl.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() { setMenu(false); });
});

// Close the mobile menu on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && navLinksEl.classList.contains('open')) {
    setMenu(false);
    hamburger.focus();
  }
});
