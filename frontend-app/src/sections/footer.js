/**
 * footer.js — dynamic footer with brand, nav, social links and meta.
 */
import { profile } from '../data/profile.js';
import { social } from '../data/social.js';

const FOOTER_NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'contact', label: 'Contact' },
];

export function renderFooter() {
  const year = new Date().getFullYear();

  const socialIcons = social
    .map(
      (s) => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}"
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:border-azure-500/50 hover:text-azure-300">
        <i data-lucide="${s.icon}" class="h-5 w-5"></i>
      </a>`
    )
    .join('');

  const nav = FOOTER_NAV.map(
    (i) =>
      `<a href="#${i.id}" class="text-sm text-slate-400 transition-colors hover:text-azure-300">${i.label}</a>`
  ).join('');

  return `
  <footer class="relative border-t border-white/10 py-12">
    <div class="container-x">
      <div class="grid gap-8 md:grid-cols-12 md:items-start">
        <div class="md:col-span-5">
          <a href="#hero" class="flex items-center gap-2.5">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500 to-aws-500 text-ink-900">
              <i data-lucide="terminal" class="h-5 w-5"></i>
            </span>
            <span class="font-heading text-lg font-bold text-white">${profile.fullName}</span>
          </a>
          <p class="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">${profile.footerText}</p>
        </div>

        <div class="md:col-span-3">
          <h3 class="font-heading text-sm font-semibold text-white">Navigate</h3>
          <nav class="mt-4 grid grid-cols-2 gap-2">${nav}</nav>
        </div>

        <div class="md:col-span-4">
          <h3 class="font-heading text-sm font-semibold text-white">Connect</h3>
          <div class="mt-4 flex flex-wrap gap-2.5">${socialIcons}</div>
          <a href="${profile.resumeUrl}" download class="btn-primary mt-5 px-4 py-2.5 text-sm">
            <i data-lucide="download" class="h-4 w-4"></i> Download résumé
          </a>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
        <p class="text-xs text-slate-500">© ${year} ${profile.fullName}. All rights reserved.</p>
        <p class="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
          <i data-lucide="git-commit-horizontal" class="h-3.5 w-3.5 text-azure-400"></i>
          Built with HTML · Tailwind · Vanilla JS · Vite
        </p>
      </div>
    </div>
  </footer>`;
}
