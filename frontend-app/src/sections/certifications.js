/**
 * certifications.js — credential cards rendered dynamically from data.
 */
import { certifications } from '../data/certifications.js';

export function renderCertifications() {
  const cards = certifications
    .map((cert, idx) => {
      const accent =
        cert.accent === 'aws'
          ? 'text-aws-300 border-aws-500/30 bg-aws-500/10'
          : 'text-azure-300 border-azure-500/30 bg-azure-500/10';
      return `
      <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer"
        class="glass glass-hover group flex items-center gap-5 p-6" data-aos="fade-up" data-aos-delay="${idx * 100}">
        <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border ${accent}">
          <i data-lucide="${cert.icon}" class="h-7 w-7"></i>
        </span>
        <div class="min-w-0 flex-1">
          <h3 class="font-heading text-base font-semibold text-white">${cert.name}</h3>
          <p class="mt-1 text-sm text-slate-400">${cert.issuer}</p>
          <p class="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
            <i data-lucide="calendar-check" class="h-3.5 w-3.5"></i> ${cert.year}
          </p>
        </div>
        <i data-lucide="external-link" class="h-5 w-5 shrink-0 text-slate-600 transition-colors group-hover:text-azure-300"></i>
      </a>`;
    })
    .join('');

  return `
  <section id="certifications" class="section">
    <div class="container-x">
      <div class="mb-12 max-w-2xl" data-aos="fade-up">
        <span class="eyebrow mb-5"><i data-lucide="award" class="h-3.5 w-3.5"></i> Certifications</span>
        <h2 class="section-title">Validated, <span class="text-gradient">industry-recognized</span> expertise.</h2>
        <p class="section-subtitle">Credentials that back up hands-on experience with formal certification.</p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">${cards}</div>
    </div>
  </section>`;
}
