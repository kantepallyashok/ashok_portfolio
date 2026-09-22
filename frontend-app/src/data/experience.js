/**
 * experience.js
 * ----------------------------------------------------------------------------
 * Career timeline. The Experience section renders newest-first in the order
 * listed here. Add an entry and the timeline grows automatically.
 */

export const experience = [
  {
    company: 'Cigniti (Coforge)',
    role: 'Senior Engineer',
    period: 'Oct 2024 – Present',
    location: 'India',
    current: true,
    summary:
      'Delivering cloud infrastructure, automation and CI/CD enablement for the ' +
      'Gate Group across Azure and AWS — standardizing Terraform IaC, hardening ' +
      'security controls and modernizing enterprise cloud operations.',
    highlights: [
      'Built reusable Terraform modules and standardized Infrastructure as Code across projects.',
      'Developed Azure DevOps YAML pipelines for infrastructure and application deployments.',
      'Implemented DevSecOps with Azure Key Vault, secret scanning and RBAC / Azure Policy governance.',
      'Managed Docker, Azure Container Apps, App Services, Kubernetes and AWS ECS environments.',
      'Provisioned AI/GenAI solutions on Azure AI Foundry and hosted open-source AI model PoCs.',
    ],
    tags: ['AWS', 'Azure', 'Terraform', 'Azure DevOps', 'DevSecOps', 'Kubernetes'],
  },
  {
    company: 'OutSystems',
    role: 'DevOps Engineer',
    period: 'Apr 2022 – Oct 2024',
    location: 'India',
    current: false,
    summary:
      'Owned delivery automation and cloud operations for the OutSystems ' +
      'low-code platform — resilient containerized deployments, CI/CD and ' +
      'infrastructure provisioning across Azure and AWS.',
    highlights: [
      'Maintained CI/CD pipelines for building, testing and deploying OutSystems products.',
      'Managed Docker / Kubernetes (K8s) and XL Release rollouts with monitoring and rollback.',
      'Automated infrastructure with Terraform and CloudFormation across Azure & AWS.',
      'Removed hard-coded secrets from repositories using Git APIs and automation scripts.',
    ],
    tags: ['Azure', 'AWS', 'Azure DevOps', 'XL Release', 'Docker', 'Kubernetes', 'Python'],
  },
  {
    company: 'VSM Infotech Pvt. Ltd.',
    role: 'Software Engineer',
    period: 'May 2018 – Mar 2022',
    location: 'India',
    current: false,
    summary:
      'Supported application deployment, infrastructure and cloud environments for ' +
      'client engagements including Diligenta Friends Life (U.K.) — CI/CD pipelines, ' +
      'containerization and AWS infrastructure automation.',
    highlights: [
      'Deployed CI/CD pipelines using Jenkins, GitHub and MS-Build for release automation.',
      'Automated AWS infrastructure with IaC — Terraform and CloudFormation.',
      'Configured VPC, security groups, ELB, Auto Scaling and AMIs for highly available systems.',
      'Set up and managed Kubernetes clusters on AWS EKS using Terraform.',
    ],
    tags: ['AWS', 'Jenkins', 'Ansible', 'Terraform', 'Python', 'Linux'],
  },
];
