/**
 * profile.js
 * ----------------------------------------------------------------------------
 * Single source of truth for identity, contact and hero copy.
 * Values are read from .env (VITE_* variables) with safe fallbacks, so you can
 * update everything from `.env` without touching any component.
 */

const env = import.meta.env;

export const profile = {
  fullName: env.VITE_FULL_NAME || 'Kantepally Venkata Ashok',
  shortName: env.VITE_SHORT_NAME || 'Ashok',
  title: env.VITE_TITLE || 'Senior DevOps Engineer',
  experienceYears: env.VITE_EXPERIENCE_YEARS || '7+',
  currentCompany: env.VITE_CURRENT_COMPANY || 'Coforge',
  location: env.VITE_LOCATION || 'India',

  email: env.VITE_EMAIL || 'ashok@example.com',
  phone: env.VITE_PHONE || '+91 00000 00000',
  website: env.VITE_WEBSITE || 'https://your-domain.com',
  resumeUrl: env.VITE_RESUME_URL || '/resume.pdf',

  heroTagline:
    env.VITE_HERO_TAGLINE ||
    'Building Reliable Cloud Platforms, CI/CD Pipelines and Scalable Infrastructure Across AWS & Azure.',

  // Roles cycled by Typed.js in the hero
  typedRoles: [
    'Senior DevOps Engineer',
    'Cloud Infrastructure Architect',
    'AWS &amp; Azure Specialist',
    'Terraform &amp; Kubernetes Engineer',
    'CI/CD Automation Expert',
  ],

  summary:
    'DevOps Engineer with 7+ years of experience designing, implementing and ' +
    'maintaining enterprise cloud infrastructure across AWS and Azure. I turn ' +
    'manual, fragile operations into automated, observable and resilient platforms — ' +
    'shipping faster with confidence through Infrastructure as Code, containerization ' +
    'and battle-tested CI/CD pipelines.',

  // Highlight bullets used in the About section
  highlights: [
    'Architected multi-cloud landing zones across AWS & Azure with Terraform.',
    'Built golden CI/CD pipelines on Jenkins & Azure DevOps cutting lead time.',
    'Operated production Kubernetes & ECS workloads with full observability.',
    'Championed IaC, GitOps and automation-first culture across teams.',
  ],

  // Animated KPI cards in the hero
  kpis: [
    { value: '7+', label: 'Years Experience', icon: 'badge-check' },
    { value: 'AWS + Azure', label: 'Multi-Cloud Specialist', icon: 'cloud' },
    { value: 'Terraform', label: 'Infrastructure as Code', icon: 'layers' },
    { value: 'Kubernetes', label: 'Container Orchestration', icon: 'ship' },
  ],

  // Theme colors (mirrored to CSS variables at runtime)
  theme: {
    primary: env.VITE_THEME_PRIMARY || '#2E8DFF',
    secondary: env.VITE_THEME_SECONDARY || '#FF9900',
    accent: env.VITE_THEME_ACCENT || '#7DB6FF',
  },

  seo: {
    title: env.VITE_SEO_TITLE || 'Kantepally Venkata Ashok — Senior DevOps Engineer',
    description:
      env.VITE_SEO_DESCRIPTION ||
      'Senior DevOps Engineer with 7+ years designing and operating enterprise cloud infrastructure across AWS and Azure.',
  },

  footerText:
    env.VITE_FOOTER_TEXT || 'Designed & built with precision. Infrastructure as craft.',
};
