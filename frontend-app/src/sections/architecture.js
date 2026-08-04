/**
 * architecture.js — animated DevOps delivery pipeline with connecting,
 * flowing lines. Stages are data-driven so the flow is easy to edit.
 */

const STAGES = [
  { name: 'Git Repository', icon: 'git-branch', accent: 'azure', desc: 'Source of truth' },
  { name: 'Azure DevOps Pipeline', icon: 'git-merge', accent: 'azure', desc: 'Build · test · gate' },
  { name: 'Docker Build', icon: 'box', accent: 'aws', desc: 'Containerize' },
  { name: 'Container Registry', icon: 'package', accent: 'azure', desc: 'Store images' },
  { name: 'Kubernetes / ECS', icon: 'ship', accent: 'aws', desc: 'Orchestrate' },
  { name: 'Monitoring', icon: 'activity', accent: 'azure', desc: 'Observe' },
  { name: 'Production', icon: 'rocket', accent: 'aws', desc: 'Live & resilient' },
];

function accentClasses(accent) {
  return accent === 'aws'
    ? 'text-aws-300 border-aws-500/40 bg-aws-500/10'
    : 'text-azure-300 border-azure-500/40 bg-azure-500/10';
}

function connector() {
  // animated flowing dashed line
  return `
    <div class="arch-connector flex items-center justify-center text-azure-500/50" aria-hidden="true">
      <svg viewBox="0 0 80 24" class="h-6 w-16 md:h-16 md:w-6" preserveAspectRatio="none">
        <line x1="2" y1="12" x2="78" y2="12" stroke="currentColor" stroke-width="2"
          stroke-dasharray="6 6" class="arch-line md:[transform:rotate(90deg)] md:[transform-origin:center]"></line>
      </svg>
    </div>`;
}

export function renderArchitecture() {
  const nodes = STAGES.map(
    (s, idx) => `
    <div class="flex flex-1 flex-col items-center text-center" data-aos="zoom-in" data-aos-delay="${
      idx * 90
    }">
      <span class="arch-node flex h-16 w-16 items-center justify-center rounded-2xl border ${accentClasses(
        s.accent
      )} animate-node" style="animation-delay:${idx * 0.2}s">
        <i data-lucide="${s.icon}" class="h-7 w-7"></i>
      </span>
      <span class="mt-3 font-heading text-sm font-semibold text-white">${s.name}</span>
      <span class="mt-0.5 font-mono text-[11px] text-slate-500">${s.desc}</span>
    </div>`
  );

  // interleave nodes with connectors
  const flow = nodes
    .map((n, i) => (i < nodes.length - 1 ? n + connector() : n))
    .join('');

  return `
  <section id="architecture" class="section">
    <div class="container-x">
      <div class="mb-14 max-w-2xl" data-aos="fade-up">
        <span class="eyebrow mb-5"><i data-lucide="workflow" class="h-3.5 w-3.5"></i> Architecture</span>
        <h2 class="section-title">From commit to <span class="text-gradient">production</span>, automated.</h2>
        <p class="section-subtitle">A representative end-to-end delivery pipeline I design and operate — every stage codified, observable and repeatable.</p>
      </div>

      <div class="glass relative overflow-hidden p-6 sm:p-10" data-aos="fade-up">
        <div class="pointer-events-none absolute inset-0 bg-grid opacity-40"></div>
        <div class="relative flex flex-col items-stretch gap-1 md:flex-row md:items-center md:gap-2">
          ${flow}
        </div>
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div class="glass p-5">
          <i data-lucide="zap" class="h-6 w-6 text-aws-300"></i>
          <h3 class="mt-3 font-heading text-sm font-semibold text-white">Fast feedback</h3>
          <p class="mt-1 text-sm text-slate-400">Automated gates catch issues before they reach production.</p>
        </div>
        <div class="glass p-5">
          <i data-lucide="shield-check" class="h-6 w-6 text-azure-300"></i>
          <h3 class="mt-3 font-heading text-sm font-semibold text-white">Secure by default</h3>
          <p class="mt-1 text-sm text-slate-400">Policy-as-code and scanning baked into every pipeline.</p>
        </div>
        <div class="glass p-5">
          <i data-lucide="repeat" class="h-6 w-6 text-aws-300"></i>
          <h3 class="mt-3 font-heading text-sm font-semibold text-white">Fully repeatable</h3>
          <p class="mt-1 text-sm text-slate-400">Infrastructure as Code makes every environment identical.</p>
        </div>
      </div>
    </div>
  </section>`;
}
