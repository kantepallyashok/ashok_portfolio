/**
 * experience.js
 * ----------------------------------------------------------------------------
 * Career timeline. The Experience section renders newest-first in the order
 * listed here. Add an entry and the timeline grows automatically.
 */

export const experience = [
  {
    company: 'Coforge',
    role: 'Senior DevOps Engineer',
    period: 'Oct 2024 – Present',
    location: 'India',
    current: true,
    summary:
      'Leading cloud platform engineering for enterprise clients — standardizing ' +
      'Infrastructure as Code, hardening CI/CD and improving reliability at scale.',
    highlights: [
      'Designed reusable Terraform modules for repeatable, governed cloud landing zones.',
      'Modernized release pipelines on Azure DevOps with automated quality gates.',
      'Drove observability and cost-optimization initiatives across AWS & Azure.',
    ],
    tags: ['AWS', 'Azure', 'Terraform', 'Azure DevOps', 'Kubernetes'],
  },
  {
    company: 'OutSystems',
    role: 'DevOps Engineer',
    period: 'Apr 2022 – Oct 2024',
    location: 'India',
    current: false,
    summary:
      'Owned containerized delivery and automation for low-code platform services, ' +
      'shipping resilient deployments across multiple environments.',
    highlights: [
      'Built and operated Docker / Kubernetes & ECS workloads in production.',
      'Automated infrastructure provisioning with Terraform and CloudFormation.',
      'Reduced manual release toil with self-service CI/CD pipelines.',
    ],
    tags: ['Docker', 'Kubernetes', 'ECS', 'Terraform', 'Jenkins'],
  },
  {
    company: 'ISG Novasoft Technologies',
    role: 'DevOps Engineer',
    period: 'May 2018 – Apr 2022',
    location: 'India',
    current: false,
    summary:
      'Established CI/CD foundations and cloud automation, transitioning teams from ' +
      'manual operations to repeatable, scripted infrastructure.',
    highlights: [
      'Implemented Jenkins pipelines for build, test and deployment automation.',
      'Scripted provisioning and operations with Python, PowerShell and Bash.',
      'Set up monitoring and alerting to improve uptime and incident response.',
    ],
    tags: ['Jenkins', 'AWS', 'Python', 'PowerShell', 'Linux'],
  },
];
