/* ========================================
   LANGUAGE
======================================== */
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
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

  document.querySelectorAll('.lang-tr').forEach(el => el.style.display = lang === 'tr' ? '' : 'none');
  document.querySelectorAll('.lang-en').forEach(el => el.style.display = lang === 'en' ? '' : 'none');

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
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
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
document.getElementById('contactForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.btn-primary');
  const original = btn.textContent;

  btn.textContent = currentLang === 'tr' ? 'Gönderiliyor…' : 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      btn.textContent = currentLang === 'tr' ? 'Gönderildi ✓' : 'Sent ✓';
      btn.style.background = '#22c55e';
      btn.style.color = '#fff';
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error('Sunucu hatası');
    }
  } catch {
    btn.textContent = currentLang === 'tr' ? 'Hata! Tekrar dene.' : 'Error! Try again.';
    btn.style.background = '#ef4444';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 3000);
  }
});

/* ========================================
   SMOOTH ACTIVE NAV HIGHLIGHT
======================================== */
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => { link.style.color = ''; });
      const active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
      if (active) active.style.color = 'var(--gold)';
    }
  });
}, { threshold: 0.4 });
sections.forEach(sec => sectionObserver.observe(sec));

/* Ticker: TradingView widget ile yönetiliyor */

/* ========================================
   MODAL
======================================== */
function openModal(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleOverlayClick(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      closeModal(m.id);
    });
  }
});

setLang(localStorage.getItem('lang') || 'en');
