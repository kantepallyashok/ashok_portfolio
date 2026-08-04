/**
 * skills.js — animated skill cards grouped by category, generated from data.
 */
import { skillGroups } from '../data/skills.js';

function accentClasses(accent) {
  return accent === 'aws'
    ? { icon: 'text-aws-300 border-aws-500/30 bg-aws-500/10', bar: 'from-aws-500 to-aws-300' }
    : { icon: 'text-azure-300 border-azure-500/30 bg-azure-500/10', bar: 'from-azure-500 to-azure-300' };
}

function skillRow(skill, accent) {
  const a = accentClasses(accent);
  return `
    <div class="skill-row">
      <div class="mb-1.5 flex items-center justify-between">
        <span class="text-sm text-slate-300">${skill.name}</span>
        <span class="font-mono text-xs text-slate-500">${skill.level}%</span>
      </div>
      <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div class="skill-bar h-full rounded-full bg-gradient-to-r ${a.bar}" style="width:0%" data-level="${skill.level}"></div>
      </div>
    </div>`;
}

export function renderSkills() {
  const cards = skillGroups
    .map((group, idx) => {
      const a = accentClasses(group.accent);
      const rows = group.skills.map((s) => skillRow(s, group.accent)).join('');
      return `
      <div class="glass glass-hover p-6" data-aos="fade-up" data-aos-delay="${(idx % 3) * 80}">
        <div class="mb-5 flex items-center gap-3">
          <span class="flex h-11 w-11 items-center justify-center rounded-xl border ${a.icon}">
            <i data-lucide="${group.icon}" class="h-5 w-5"></i>
          </span>
          <h3 class="font-heading text-base font-semibold text-white">${group.category}</h3>
        </div>
        <div class="space-y-4">${rows}</div>
      </div>`;
    })
    .join('');

  return `
  <section id="skills" class="section">
    <div class="container-x">
      <div class="mb-12 max-w-2xl" data-aos="fade-up">
        <span class="eyebrow mb-5"><i data-lucide="cpu" class="h-3.5 w-3.5"></i> Skills</span>
        <h2 class="section-title">A full-stack <span class="text-gradient">DevOps toolchain</span>.</h2>
        <p class="section-subtitle">From cloud foundations to delivery pipelines and observability — the tools I use to ship reliable infrastructure every day.</p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>
    </div>
  </section>`;
}
