/**
 * contact.js — dynamic contact section. Cards + a simple mailto-based form.
 * All links/data come from social.js + profile.js.
 */
import { profile } from '../data/profile.js';
import { social } from '../data/social.js';

export function renderContact() {
  const cards = social
    .filter((s) => s.primary)
    .map(
      (s) => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer"
        class="glass glass-hover group flex items-center gap-4 p-5">
        <span class="flex h-11 w-11 items-center justify-center rounded-xl border border-azure-500/30 bg-azure-500/10 text-azure-300 transition-colors group-hover:text-azure-200">
          <i data-lucide="${s.icon}" class="h-5 w-5"></i>
        </span>
        <div class="min-w-0">
          <div class="text-sm font-medium text-white">${s.name}</div>
          <div class="truncate text-xs text-slate-400">${s.handle}</div>
        </div>
      </a>`
    )
    .join('');

  return `
  <section id="contact" class="section">
    <div class="container-x">
      <div class="glass relative overflow-hidden p-8 sm:p-12" data-aos="fade-up">
        <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-azure-500/10 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-aws-500/10 blur-3xl"></div>

        <div class="relative grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <span class="eyebrow mb-5"><i data-lucide="send" class="h-3.5 w-3.5"></i> Contact</span>
            <h2 class="section-title">Let's build something <span class="text-gradient">resilient</span>.</h2>
            <p class="section-subtitle">Open to senior DevOps & platform engineering roles. The fastest way to reach me is below.</p>

            <div class="mt-8 space-y-3">${cards}</div>

            <div class="glass mt-6 rounded-2xl border border-azure-500/20 p-6 text-center">
              <div class="mb-4">
                <i data-lucide="phone" class="mx-auto h-10 w-10 text-azure-400"></i>
              </div>

              <h3 class="text-xl font-semibold text-white">
                Contact Me
              </h3>

              <p class="mt-3 text-2xl font-bold text-azure-300">
                +91 81214 13523
              </p>

              <div class="mt-6 flex flex-wrap justify-center gap-3">

                <a
                  href="tel:+918121413523"
                  class 121413523"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-ghost"
                >
                  💬 WhatsApp
                </a>

              </div>

              <p class="mt-4 text-sm text-slate-400">
                Senior DevOps Engineer
              </p>
            </div>
          </div>

          <div class="lg:col-span-7">
            <form id="contact-form" class="glass space-y-4 p-6 sm:p-7" novalidate>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="cf-name" class="mb-1.5 block text-sm font-medium text-slate-300">Name</label>
                  <input id="cf-name" name="name" type="text" required autocomplete="name"
                    class="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-azure-500 focus:outline-none focus:ring-1 focus:ring-azure-500"
                    placeholder="Your name" />
                </div>
                <div>
                  <label for="cf-email" class="mb-1.5 block text-sm font-medium text-slate-300">Email</label>
                  <input id="cf-email" name="email" type="email" required autocomplete="email"
                    class="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-azure-500 focus:outline-none focus:ring-1 focus:ring-azure-500"
                    placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <label for="cf-subject" class="mb-1.5 block text-sm font-medium text-slate-300">Subject</label>
                <input id="cf-subject" name="subject" type="text"
                  class="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-azure-500 focus:outline-none focus:ring-1 focus:ring-azure-500"
                  placeholder="Opportunity / project" />
              </div>
              <div>
                <label for="cf-message" class="mb-1.5 block text-sm font-medium text-slate-300">Message</label>
                <textarea id="cf-message" name="message" rows="4" required
                  class="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-azure-500 focus:outline-none focus:ring-1 focus:ring-azure-500"
                  placeholder="Tell me a little about the role or project…"></textarea>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button type="submit" class="btn-primary">
                  <i data-lucide="send" class="h-4 w-4"></i> Send message
                </button>
                <a href="${profile.resumeUrl}" download class="btn-ghost">
                  <i data-lucide="download" class="h-4 w-4"></i> Download résumé
                </a>
                <p id="cf-status" class="text-sm text-slate-400" role="status" aria-live="polite"></p>
              </div>
              <p class="text-xs text-slate-500">This form opens your email client — no data is sent to a server.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}
