/* =========================================================
   Dini Vumijojo — Portfolio
   Vanilla JavaScript: typing role rotator, nav behaviour,
   project filtering, scroll reveal, photo fallback.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initPhotoFallback();
  initRoleTyper();
  initNav();
  initScrollSpy();
  initReveal();
  initProjectFilter();
});

/* ---------- footer year ---------- */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- photo fallback ----------
   Shows initials until images/profile.jpg is added.
   Drop a real photo at images/profile.jpg and this
   swaps in automatically — no code changes needed. */
function initPhotoFallback() {
  const img = document.getElementById('profileImg');
  const fallback = document.getElementById('photoFallback');
  if (!img || !fallback) return;

  const showFallback = () => { fallback.style.display = 'flex'; img.style.display = 'none'; };
  const hideFallback = () => { fallback.style.display = 'none'; img.style.display = 'block'; };

  img.style.display = 'none';
  img.addEventListener('load', hideFallback);
  img.addEventListener('error', showFallback);

  if (img.complete) {
    if (img.naturalWidth > 0) hideFallback();
    else showFallback();
  }
}

/* ---------- hero role typing effect ---------- */
function initRoleTyper() {
  const el = document.getElementById('roleText');
  if (!el) return;

  const roles = [
    'Cybersecurity Analyst',
    'AI Security Enthusiast',
    'IT Support & Infrastructure Specialist',
    'Security-Led, AI-Driven'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 30;
  const HOLD_TIME = 1400;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ---------- nav: mobile toggle + shrink-on-scroll ---------- */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ---------- highlight the nav link for the section in view ---------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('main .section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const map = new Map();
  navLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    map.set(id, link);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = map.get(id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ---------- reveal-on-scroll for cards/timeline items ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

/* ---------- project filter buttons ---------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.split(' ').includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });
}
