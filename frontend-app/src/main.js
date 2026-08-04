/**
 * main.js — application entry point.
 * 1. Imports styles + third-party libs
 * 2. Renders every section into #app from data files
 * 3. Initializes animations, icons and interactions
 */
import './css/style.css';
import 'aos/dist/aos.css';

import AOS from 'aos';
import Typed from 'typed.js';
import { createIcons } from 'lucide';
import { appIcons } from './js/icons.js';

// Data
import { profile } from './data/profile.js';

// Sections
import { renderNavbar } from './sections/navbar.js';
import { renderHero } from './sections/hero.js';
import { renderAbout } from './sections/about.js';
import { renderSkills } from './sections/skills.js';
import { renderExperience } from './sections/experience.js';
import { renderCertifications } from './sections/certifications.js';
import { renderProjects } from './sections/projects.js';
import { renderArchitecture } from './sections/architecture.js';
import { renderContact } from './sections/contact.js';
import { renderFooter } from './sections/footer.js';

// Behaviour
import { initTheme } from './js/theme.js';
import { initParticles } from './js/particles.js';
import { initSEO } from './js/seo.js';
import {
  initScrollUI,
  initNavbar,
  initScrollSpy,
  initSkillBars,
  initProjectFilter,
  initContactForm,
} from './js/interactions.js';

/* ----- 1. Render --------------------------------------------------------- */
const app = document.getElementById('app');
app.innerHTML = [
  renderNavbar(),
  '<main>',
  renderHero(),
  renderAbout(),
  renderSkills(),
  renderExperience(),
  renderCertifications(),
  renderProjects(),
  renderArchitecture(),
  renderContact(),
  '</main>',
  renderFooter(),
].join('\n');

/* ----- 2. Icons (Lucide) ------------------------------------------------- */
// expose a small helper so other modules can re-render icons after DOM swaps
window.lucide = { createIcons: () => createIcons({ icons: appIcons }) };
window.lucide.createIcons();

/* ----- 3. SEO + theme ---------------------------------------------------- */
initSEO();
initTheme();

/* ----- 4. Particle background ------------------------------------------- */
initParticles('particles');

/* ----- 5. Scroll animations (AOS) --------------------------------------- */
AOS.init({
  duration: 650,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
  disable: () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
});

/* ----- 6. Typed.js role animation --------------------------------------- */
const typedEl = document.getElementById('typed-role');
if (typedEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typedEl.textContent = '';
  // eslint-disable-next-line no-new
  new Typed('#typed-role', {
    strings: profile.typedRoles,
    typeSpeed: 55,
    backSpeed: 28,
    backDelay: 1600,
    startDelay: 400,
    loop: true,
    smartBackspace: true,
  });
}

/* ----- 7. Interactions --------------------------------------------------- */
initScrollUI();
initNavbar();
initScrollSpy();
initSkillBars();
initProjectFilter();
initContactForm();

// Re-paint icons once more after everything settled (covers late swaps)
window.lucide.createIcons();
