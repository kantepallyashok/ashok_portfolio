/**
 * interactions.js — all DOM behaviour after sections are rendered:
 * scroll progress, back-to-top, active-nav highlighting, mobile menu,
 * animated skill bars, project filtering and the contact form.
 */
import { profile } from '../data/profile.js';

/* ----- Scroll progress + back-to-top ------------------------------------ */
export function initScrollUI() {
  const progress = document.getElementById('scroll-progress');
  const backTop = document.getElementById('back-to-top');

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;

    if (backTop) {
      if (scrollTop > 500) {
        backTop.classList.remove('hidden');
        backTop.classList.add('flex');
      } else {
        backTop.classList.add('hidden');
        backTop.classList.remove('flex');
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }
}

/* ----- Mobile menu + navbar elevation ----------------------------------- */
export function initNavbar() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');

  if (menuToggle && mobileMenu) {
    const close = () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('[data-menu-icon]');
      if (icon) icon.setAttribute('data-lucide', 'menu');
      if (window.lucide) window.lucide.createIcons();
    };
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.contains('hidden');
      if (open) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        menuToggle.setAttribute('aria-expanded', 'true');
        const icon = menuToggle.querySelector('[data-menu-icon]');
        if (icon) icon.setAttribute('data-lucide', 'x');
        if (window.lucide) window.lucide.createIcons();
      } else {
        close();
      }
    });
    document
      .querySelectorAll('[data-mobile-link]')
      .forEach((l) => l.addEventListener('click', close));
  }

  // subtle navbar shadow on scroll
  if (navbar) {
    const onScroll = () => {
      navbar
        .querySelector('div')
        ?.classList.toggle('shadow-glow', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

/* ----- Active section highlighting -------------------------------------- */
export function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('[data-nav]'));
  if (!links.length) return;
  const sections = links
    .map((l) => document.getElementById(l.dataset.nav))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle('is-active', l.dataset.nav === id)
          );
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ----- Animated skill bars ---------------------------------------------- */
export function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          requestAnimationFrame(() => {
            bar.style.transition = 'width 1.1s cubic-bezier(0.22,1,0.36,1)';
            bar.style.width = `${bar.dataset.level}%`;
          });
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => observer.observe(b));
}

/* ----- Project category filter ------------------------------------------ */
export function initProjectFilter() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.project-card');
  if (!chips.length) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.classList.toggle('is-active', c === chip));
      cards.forEach((card) => {
        const show = filter === 'All' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ----- Contact form (mailto, no backend) -------------------------------- */
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('cf-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = encodeURIComponent(data.get('name') || '');
    const email = encodeURIComponent(data.get('email') || '');
    const subject = encodeURIComponent(
      data.get('subject') || `Portfolio enquiry from ${data.get('name')}`
    );
    const body = encodeURIComponent(
      `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    if (status) {
      status.textContent = 'Opening your email client…';
      status.className = 'text-sm text-azure-300';
    }
    // silence unused warnings while keeping fields available for future backends
    void name;
    void email;
  });
}
