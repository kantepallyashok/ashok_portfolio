/**
 * about.js — summary, highlight bullets and a quick "stat strip".
 */
import { profile } from '../data/profile.js';

export function renderAbout() {
  const highlights = profile.highlights
    .map(
      (h) => `
      <li class="flex items-start gap-3" data-aos="fade-up">
        <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-azure-500/30 bg-azure-500/10 text-azure-300">
          <i data-lucide="check" class="h-3.5 w-3.5"></i>
        </span>
        <span class="text-sm leading-relaxed text-slate-300">${h}</span>
      </li>`
    )
    .join('');

  return `
  <section id="about" class="section">
    <div class="container-x">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5" data-aos="fade-up">
          <span class="eyebrow mb-5"><i data-lucide="user-round" class="h-3.5 w-3.5"></i> About</span>
          <h2 class="section-title">Engineering platforms that <span class="text-gradient">teams trust</span>.</h2>
          <p class="section-subtitle">${profile.summary}</p>

          <div class="mt-8 grid grid-cols-3 gap-3">
            <div class="glass p-4 text-center">
              <div class="font-heading text-2xl font-bold text-white">${profile.experienceYears}</div>
              <div class="mt-1 text-xs text-slate-400">Years</div>
            </div>
            <div class="glass p-4 text-center">
              <div class="font-heading text-2xl font-bold text-white">2</div>
              <div class="mt-1 text-xs text-slate-400">Clouds</div>
            </div>
            <div class="glass p-4 text-center">
              <div class="font-heading text-2xl font-bold text-white">∞</div>
              <div class="mt-1 text-xs text-slate-400">Pipelines</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="glass glass-hover p-6 sm:p-8" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-5 flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500/20 to-aws-500/20 text-azure-300">
                <i data-lucide="sparkles" class="h-5 w-5"></i>
              </span>
              <h3 class="font-heading text-lg font-semibold text-white">What I bring to the team</h3>
            </div>
            <ul class="space-y-4">${highlights}</ul>

            <div class="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              <span class="chip"><i data-lucide="git-merge" class="h-3.5 w-3.5 text-azure-400"></i> GitOps</span>
              <span class="chip"><i data-lucide="shield-check" class="h-3.5 w-3.5 text-aws-400"></i> DevSecOps</span>
              <span class="chip"><i data-lucide="gauge" class="h-3.5 w-3.5 text-azure-400"></i> Observability</span>
              <span class="chip"><i data-lucide="layers" class="h-3.5 w-3.5 text-aws-400"></i> IaC-first</span>
              <span class="chip"><i data-lucide="dollar-sign" class="h-3.5 w-3.5 text-azure-400"></i> Cost-aware</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}
