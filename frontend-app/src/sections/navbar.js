/**
 * navbar.js — floating glass navigation with active-section highlighting,
 * theme toggle and a mobile menu. All copy/links come from data files.
 */
import { profile } from '../data/profile.js';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'contact', label: 'Contact' },
];

export function renderNavbar() {
  const links = NAV_ITEMS.map(
    (i) => `<a href="#${i.id}" class="nav-link" data-nav="${i.id}">${i.label}</a>`
  ).join('');

  const mobileLinks = NAV_ITEMS.map(
    (i) =>
      `<a href="#${i.id}" class="nav-link block w-full" data-nav="${i.id}" data-mobile-link>${i.label}</a>`
  ).join('');

  return `
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
    <nav id="navbar" class="container-x">
      <div class="glass flex items-center justify-between gap-4 rounded-2xl px-4 py-3 shadow-glass transition-all duration-300">
        <!-- Brand -->
        <a href="#hero" class="group flex items-center gap-2.5 cursor-pointer" aria-label="Home">
          <img
            src="/images/Ashok_icon.PNG"
            alt="${profile.shortName}"
            class="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-azure-400/70 shadow-glow transition-transform duration-300 group-hover:scale-110"
          />
          <span class="font-heading text-lg font-bold tracking-tight text-white">
            ${profile.shortName}<span class="text-azure-400">.</span>
          </span>
        </a>

        <!-- Desktop links -->
        <div class="hidden items-center gap-1 lg:flex">${links}</div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button id="theme-toggle" aria-label="Toggle color theme"
            class="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:text-azure-300 sm:flex">
            <i data-lucide="moon" class="h-5 w-5" data-theme-icon></i>
          </button>
          <a href="${profile.resumeUrl}" download class="btn-primary hidden px-4 py-2.5 text-sm sm:inline-flex">
            <i data-lucide="download" class="h-4 w-4"></i> Resume
          </a>
          <button id="menu-toggle" aria-label="Open menu" aria-expanded="false"
            class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 lg:hidden">
            <i data-lucide="menu" class="h-5 w-5" data-menu-icon></i>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div id="mobile-menu" class="glass mt-2 hidden flex-col gap-1 rounded-2xl p-3 lg:hidden">
        ${mobileLinks}
        <div class="mt-2 flex items-center gap-2 border-t border-white/10 pt-3">
          <a href="${profile.resumeUrl}" download class="btn-primary flex-1 py-2.5 text-sm">
            <i data-lucide="download" class="h-4 w-4"></i> Resume
          </a>
          <button id="theme-toggle-mobile" aria-label="Toggle color theme"
            class="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300">
            <i data-lucide="moon" class="h-5 w-5" data-theme-icon></i>
          </button>
        </div>
      </div>
    </nav>
  </header>`;
}
