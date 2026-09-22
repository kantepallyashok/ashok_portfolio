/**
 * projects.js
 * ----------------------------------------------------------------------------
 * Featured projects. The Projects section renders one card per entry and
 * builds the category filter automatically from the `category` fields.
 *
 * `links` are optional — placeholder URLs are used; update with real ones.
 */

export const projects = [
  {
    title: 'Enterprise Cloud & CI/CD Enablement',
    category: 'CI/CD',
    icon: 'git-merge',
    accent: 'azure',
    summary:
      'Cloud infrastructure, automation and CI/CD deliverance for the Gate Group ' +
      'at Cigniti (Coforge) — standardizing Terraform IaC, hardening security and ' +
      'modernizing enterprise Azure & AWS operations.',
    highlights: [
      'Built reusable Terraform modules and onboarded existing cloud resources into IaC',
      'Enhanced Azure DevOps YAML pipelines with governance & secret management',
      'Implemented DevSecOps — Key Vault integration, secret scanning and Azure Policy',
      'Provisioned Azure AI Foundry workloads and open-source AI model PoCs',
    ],
    stack: ['Azure', 'AWS', 'Terraform', 'Azure DevOps', 'Docker', 'Kubernetes', 'ACA'],
    links: { live: '#', repo: '#' },
  },
  {
    title: 'Low-Code Platform Delivery',
    category: 'Containers',
    icon: 'box',
    accent: 'aws',
    summary:
      'Delivery automation for the OutSystems low-code platform — resilient CI/CD, ' +
      'containerized deployments, Kubernetes orchestration and infrastructure ' +
      'provisioning across Azure and AWS.',
    highlights: [
      'CI/CD pipelines with Azure DevOps and XL Release for build, test and deploy',
      'Kubernetes (K8s) and Docker workloads with monitoring & rollback',
      'Infrastructure automation with Terraform and CloudFormation',
      'Purged hard-coded secrets from repositories using Git APIs and scripts',
    ],
    stack: ['Azure', 'AWS', 'Azure DevOps', 'XL Release', 'Docker', 'Kubernetes', 'Terraform'],
    links: { live: '#', repo: '#' },
  },
  {
    title: 'AWS Infrastructure & Automation',
    category: 'Cloud',
    icon: 'cloud',
    accent: 'aws',
    summary:
      'Cloud infrastructure engineering for Diligenta Friends Life (U.K.) via VSM ' +
      'Infotech — cost-effective, fault-tolerant AWS environments with CI/CD, ' +
      'containerization and configuration management.',
    highlights: [
      'Managed VPC, EC2, security groups, ELB, Auto Scaling and AMIs on AWS',
      'Deployed CI/CD pipelines using Jenkins, GitHub and MS-Build',
      'Automated provisioning with Terraform and CloudFormation',
      'Set up Kubernetes clusters on AWS EKS using Terraform and Ansible',
    ],
    stack: ['AWS', 'Jenkins', 'Ansible', 'Terraform', 'CloudFormation', 'Python'],
    links: { live: '#', repo: '#' },
  },
  {
    title: 'DevSecOps & AI Platform Provisioning',
    category: 'Security',
    icon: 'shield',
    accent: 'azure',
    summary:
      'Embedding security into delivery while provisioning GenAI infrastructure — ' +
      'secret management, repository governance and policy enforcement across ' +
      'pipelines, plus Azure AI Foundry and open-source model hosting for PoCs.',
    highlights: [
      'Azure Key Vault integration for secrets handling at every pipeline phase',
      'Secret scanning, repository security and compliance in CI/CD',
      'RBAC, Azure Policies and Managed Identities for cloud governance',
      'Deployed open-source AI models for enterprise Proof of Concepts',
    ],
    stack: ['Azure Key Vault', 'Azure DevOps', 'Azure Policy', 'RBAC', 'Azure AI Foundry', 'Python'],
    links: { live: '#', repo: '#' },
  },
];
