/**
 * hero.js — headline, animated typed role, tagline, CTAs and animated KPIs.
 */
import { profile } from '../data/profile.js';
import AshokImg from '../assets/Ashok_DevOps_hero.png';
export function renderHero() {
  const kpis = profile.kpis
    .map(
      (k, idx) => `
      <div class="glass glass-hover group flex items-center gap-4 p-4" data-aos="fade-up" data-aos-delay="${
        100 + idx * 80
      }">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-azure-500/30 bg-azure-500/10 text-azure-300 transition-colors group-hover:text-azure-200">
          <i data-lucide="${k.icon}" class="h-5 w-5"></i>
        </span>
        <div class="min-w-0">
          <div class="font-heading text-lg font-bold text-white">${k.value}</div>
          <div class="truncate text-xs text-slate-400">${k.label}</div>
        </div>
      </div>`
    )
    .join('');

  return `
  <section id="hero" class="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
    <!-- ambient grid -->
    <div class="pointer-events-none absolute inset-0 bg-grid opacity-60"></div>

    <!-- fixed person (white bg removed, centered, 70% opacity) -->
    <div class="pointer-events-none fixed top-1/2 left-1/2 -z-10 -translate-x-1/2 translate-y-[calc(-50%+0.5in)]">
      <img
        src="${AshokImg}" alt
        class="h-[90vh] w-auto opacity-70"
        style="
          filter: brightness(.9);
        "
      />
    </div>


    <!-- floating cloud glyphs -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <i data-lucide="cloud" class="absolute left-[8%] top-[22%] h-10 w-10 text-azure-500/20 animate-float"></i>
      <i data-lucide="server" class="absolute right-[10%] top-[30%] h-9 w-9 text-aws-500/20 animate-float-slow"></i>
      <i data-lucide="container" class="absolute left-[14%] bottom-[18%] h-8 w-8 text-azure-400/20 animate-float-slow"></i>
      <i data-lucide="git-branch" class="absolute right-[16%] bottom-[24%] h-9 w-9 text-aws-400/20 animate-float"></i>
    </div>

    <div class="container-x relative z-10">
      <div class="grid items-center gap-12 lg:grid-cols-12">
        <!-- Copy -->
        <div class="lg:col-span-7" data-aos="fade-up">
          <span class="eyebrow mb-6">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-azure-400"></span>
            </span>
            Available for senior DevOps roles
          </span>

          <h1 class="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
            ${profile.fullName}
          </h1>

          <p class="mt-4 flex flex-wrap items-center gap-x-3 text-xl font-medium text-slate-300 sm:text-2xl">
            <span class="text-gradient" id="typed-role" aria-live="polite">${profile.title}</span>
          </p>

          <p class="mt-6 max-w-xl text-base leading-relaxed text-slate-400 text-balance sm:text-lg">
            ${profile.heroTagline}
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a href="${profile.resumeUrl}" download class="btn-primary">
              <i data-lucide="download" class="h-4 w-4"></i> Download Resume
            </a>
            <a href="#projects" class="btn-ghost">
              <i data-lucide="folder-git-2" class="h-4 w-4"></i> View Projects
            </a>
            <a href="#contact" class="btn-accent">
              <i data-lucide="mail" class="h-4 w-4"></i> Contact Me
            </a>
          </div>

          <div class="mt-8 flex items-center gap-4 text-sm text-slate-500">
            <span class="inline-flex items-center gap-1.5">
              <i data-lucide="map-pin" class="h-4 w-4 text-azure-400"></i> ${profile.location}
            </span>
            <span class="h-4 w-px bg-white/10"></span>
            <span class="inline-flex items-center gap-1.5">
              <i data-lucide="building-2" class="h-4 w-4 text-aws-400"></i> ${profile.currentCompany}
            </span>
          </div>
        </div>

        <!-- KPI cluster -->
        <div class="lg:col-span-5">
          <div class="relative">
            <div class="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-radial-fade blur-2xl"></div>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              ${kpis}
            </div>

            <!-- terminal flourish -->
            <div class="glass mt-3 overflow-hidden p-0" data-aos="fade-up" data-aos-delay="420">
              <div class="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
                <span class="h-2.5 w-2.5 rounded-full bg-red-400/70"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/70"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-green-400/70"></span>
                <span class="ml-2 font-mono text-xs text-slate-500">~/ashok — zsh</span>
              </div>
              <pre class="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-slate-300"><span class="text-azure-400">$</span> terraform apply -auto-approve
<span class="text-green-400">Apply complete!</span> 42 added, 0 changed, 0 destroyed.
<span class="text-azure-400">$</span> kubectl get pods -A
<span class="text-slate-500">All systems</span> <span class="text-green-400">Running ✓</span></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- scroll cue -->
      <a href="#about" aria-label="Scroll to about"
        class="mt-16 hidden items-center justify-center text-slate-500 transition-colors hover:text-azure-300 md:flex">
        <span class="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
          <span class="h-2 w-1 animate-bounce rounded-full bg-azure-400"></span>
        </span>
      </a>
    </div>
  </section>`;
}
