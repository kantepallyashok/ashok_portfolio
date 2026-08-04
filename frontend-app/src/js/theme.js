/**
 * theme.js — dark/light mode toggle with localStorage persistence, plus
 * mirroring of the configured theme colors into CSS variables.
 */
import { profile } from '../data/profile.js';

const STORAGE_KEY = 'ashok-theme';
const root = document.documentElement;

function apply(theme) {
  if (theme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }
  // swap toggle icons
  document.querySelectorAll('[data-theme-icon]').forEach((el) => {
    el.setAttribute('data-lucide', theme === 'light' ? 'sun' : 'moon');
  });
  if (window.lucide) window.lucide.createIcons();

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f8fb' : '#05070A');
}

export function initTheme() {
  // Mirror configured colors → CSS variables
  root.style.setProperty('--color-primary', profile.theme.primary);
  root.style.setProperty('--color-secondary', profile.theme.secondary);
  root.style.setProperty('--color-accent', profile.theme.accent);

  // Default to dark (enterprise theme); honour stored preference.
  const stored = localStorage.getItem(STORAGE_KEY);
  apply(stored === 'light' ? 'light' : 'dark');

  const toggle = () => {
    const next = root.classList.contains('light') ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  };

  ['theme-toggle', 'theme-toggle-mobile'].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', toggle);
  });
}
