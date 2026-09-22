/**
 * skills.js
 * ----------------------------------------------------------------------------
 * Skills grouped by category. The Skills section renders these dynamically —
 * add a group or an item and the UI updates automatically.
 *
 * `icon` values are Lucide icon names (https://lucide.dev/icons).
 * `level` (0-100) drives the proficiency bar.
 */

export const skillGroups = [
  {
    category: 'Cloud',
    icon: 'cloud',
    accent: 'aws',
    skills: [
      { name: 'AWS', level: 92 },
      { name: 'Microsoft Azure', level: 90 },
      { name: 'EC2 / VPC / IAM', level: 90 },
      { name: 'S3 / ELB / Auto Scaling', level: 88 },
      { name: 'Azure VNet / App Gateway / Functions', level: 86 },
    ],
  },
  {
    category: 'Infrastructure as Code',
    icon: 'layers',
    accent: 'azure',
    skills: [
      { name: 'Terraform', level: 93 },
      { name: 'AWS CloudFormation', level: 88 },
      { name: 'ARM Templates', level: 82 },
      { name: 'Ansible', level: 82 },
    ],
  },
  {
    category: 'Containers & Platforms',
    icon: 'box',
    accent: 'azure',
    skills: [
      { name: 'Docker', level: 92 },
      { name: 'Kubernetes', level: 88 },
      { name: 'Amazon ECS', level: 87 },
      { name: 'Azure Container Apps / App Services', level: 86 },
    ],
  },
  {
    category: 'CI/CD',
    icon: 'git-merge',
    accent: 'aws',
    skills: [
      { name: 'Azure DevOps (YAML)', level: 91 },
      { name: 'Jenkins', level: 90 },
      { name: 'XL Release', level: 82 },
      { name: 'Maven / MS-Build', level: 78 },
    ],
  },
  {
    category: 'Security & Governance',
    icon: 'shield',
    accent: 'azure',
    skills: [
      { name: 'Azure Key Vault', level: 88 },
      { name: 'Managed Identities / RBAC', level: 86 },
      { name: 'Azure Policy', level: 82 },
      { name: 'Secret Scanning & Compliance', level: 84 },
    ],
  },
  {
    category: 'Monitoring & Observability',
    icon: 'activity',
    accent: 'azure',
    skills: [
      { name: 'Azure Monitor / Log Analytics', level: 86 },
      { name: 'Application Insights', level: 84 },
      { name: 'CloudWatch', level: 86 },
      { name: 'CloudAware', level: 78 },
    ],
  },
  {
    category: 'Scripting & Automation',
    icon: 'terminal',
    accent: 'azure',
    skills: [
      { name: 'PowerShell', level: 86 },
      { name: 'Python', level: 86 },
      { name: 'Bash / Shell', level: 86 },
      { name: 'YAML / JSON', level: 90 },
    ],
  },
  {
    category: 'Version Control',
    icon: 'git-branch',
    accent: 'aws',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'Azure Repos', level: 88 },
      { name: 'GitHub', level: 90 },
      { name: 'Branching Strategies & PR Reviews', level: 86 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: 'wrench',
    accent: 'aws',
    skills: [
      { name: 'Jira / Confluence', level: 84 },
      { name: 'ServiceNow', level: 82 },
      { name: 'Azure AI Foundry (GenAI)', level: 76 },
      { name: 'Open-Source AI Model Deployment', level: 74 },
    ],
  },
  {
    category: 'Operating Systems',
    icon: 'server',
    accent: 'aws',
    skills: [
      { name: 'Linux (RHEL/Ubuntu)', level: 90 },
      { name: 'Windows Server', level: 82 },
    ],
  },
];
