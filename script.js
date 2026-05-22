/* ========================================
   LANGUAGE
======================================== */
let currentLang = 'tr';

function setLang(lang) {
  currentLang = lang;

  document.getElementById('btnTR').classList.toggle('active', lang === 'tr');
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');

  document.querySelectorAll('[data-tr]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.tagName === 'OPTION') {
      el.textContent = val;
    } else {
      el.innerHTML = val;
    }
  });

  document.documentElement.lang = lang;
}

/* ========================================
   NAVBAR SCROLL
======================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ========================================
   HAMBURGER MENU
======================================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ========================================
   SCROLL REVEAL
======================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========================================
   COUNTER ANIMATION
======================================== */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ========================================
   CONTACT FORM
======================================== */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-primary');
  const original = btn.textContent;
  btn.textContent = currentLang === 'tr' ? 'Gönderildi ✓' : 'Sent ✓';
  btn.style.background = '#22c55e';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
});

/* ========================================
   SMOOTH ACTIVE NAV HIGHLIGHT
======================================== */
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
      });
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--gold)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));
