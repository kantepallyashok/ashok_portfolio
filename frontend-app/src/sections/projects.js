/**
 * projects.js — dynamic project cards with an auto-generated category filter.
 * Adding a project to data/projects.js renders a new card (and a new filter
 * chip if it introduces a new category) with no UI changes required.
 */
import { projects } from '../data/projects.js';

function accentClasses(accent) {
  return accent === 'aws'
    ? 'text-aws-300 border-aws-500/30 bg-aws-500/10'
    : 'text-azure-300 border-azure-500/30 bg-azure-500/10';
}

function projectCard(project, idx) {
  const stack = project.stack.map((s) => `<span class="chip">${s}</span>`).join('');
  const bullets = project.highlights
    .map(
      (h) => `
      <li class="flex items-start gap-2 text-sm text-slate-300">
        <i data-lucide="check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-400"></i><span>${h}</span>
      </li>`
    )
    .join('');

  return `
  <article class="project-card glass glass-hover flex flex-col p-6" data-category="${project.category}"
    data-aos="fade-up" data-aos-delay="${(idx % 2) * 80}">
    <div class="flex items-start justify-between gap-4">
      <span class="flex h-12 w-12 items-center justify-center rounded-xl border ${accentClasses(
        project.accent
      )}">
        <i data-lucide="${project.icon}" class="h-6 w-6"></i>
      </span>
      <span class="chip">${project.category}</span>
    </div>

    <h3 class="mt-5 font-heading text-lg font-semibold text-white">${project.title}</h3>
    <p class="mt-2 text-sm leading-relaxed text-slate-400">${project.summary}</p>

    <ul class="mt-4 space-y-2">${bullets}</ul>

    <div class="mt-5 flex flex-wrap gap-2">${stack}</div>

    <div class="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
      <a href="${project.links?.live || '#'}" target="_blank" rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-azure-300 transition-colors hover:text-azure-200">
        <i data-lucide="external-link" class="h-4 w-4"></i> Live
      </a>
      <a href="${project.links?.repo || '#'}" target="_blank" rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white">
        <i data-lucide="github" class="h-4 w-4"></i> Code
      </a>
    </div>
  </article>`;
}

export function renderProjects() {
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const filters = categories
    .map(
      (c, i) => `
      <button class="filter-chip ${i === 0 ? 'is-active' : ''}" data-filter="${c}">${c}</button>`
    )
    .join('');

  const cards = projects.map((p, i) => projectCard(p, i)).join('');

  return `
  <section id="projects" class="section">
    <div class="container-x">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-6" data-aos="fade-up">
        <div class="max-w-2xl">
          <span class="eyebrow mb-5"><i data-lucide="folder-git-2" class="h-3.5 w-3.5"></i> Projects</span>
          <h2 class="section-title">Platforms <span class="text-gradient">shipped to production</span>.</h2>
          <p class="section-subtitle">Selected work spanning CI/CD, containers and multi-cloud infrastructure.</p>
        </div>
        <div id="project-filters" class="flex flex-wrap gap-2">${filters}</div>
      </div>

      <div id="projects-grid" class="grid gap-5 md:grid-cols-2">${cards}</div>
    </div>
  </section>`;
}
