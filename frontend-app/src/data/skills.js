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
      { name: 'S3 / CloudFront', level: 88 },
      { name: 'Azure VNet / AKS', level: 86 },
    ],
  },
  {
    category: 'Infrastructure as Code',
    icon: 'layers',
    accent: 'azure',
    skills: [
      { name: 'Terraform', level: 93 },
      { name: 'AWS CloudFormation', level: 88 },
      { name: 'ARM / Bicep', level: 80 },
      { name: 'Ansible', level: 82 },
    ],
  },
  {
    category: 'Containers',
    icon: 'box',
    accent: 'azure',
    skills: [
      { name: 'Docker', level: 92 },
      { name: 'Kubernetes', level: 88 },
      { name: 'Amazon ECS', level: 87 },
      { name: 'Helm', level: 80 },
    ],
  },
  {
    category: 'CI/CD',
    icon: 'git-merge',
    accent: 'aws',
    skills: [
      { name: 'Jenkins', level: 90 },
      { name: 'Azure DevOps', level: 90 },
      { name: 'GitHub Actions', level: 84 },
      { name: 'GitOps / ArgoCD', level: 78 },
    ],
  },
  {
    category: 'Monitoring',
    icon: 'activity',
    accent: 'azure',
    skills: [
      { name: 'Prometheus', level: 84 },
      { name: 'Grafana', level: 84 },
      { name: 'CloudWatch', level: 86 },
      { name: 'Azure Monitor', level: 82 },
      { name: 'ELK Stack', level: 78 },
    ],
  },
  {
    category: 'Configuration Management',
    icon: 'settings-2',
    accent: 'azure',
    skills: [
      { name: 'Ansible', level: 84 },
      { name: 'Chef', level: 72 },
      { name: 'Puppet', level: 68 },
    ],
  },
  {
    category: 'Version Control',
    icon: 'git-branch',
    accent: 'aws',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'GitHub', level: 90 },
      { name: 'Azure Repos', level: 86 },
      { name: 'Bitbucket', level: 80 },
    ],
  },
  {
    category: 'Programming',
    icon: 'terminal',
    accent: 'azure',
    skills: [
      { name: 'Python', level: 86 },
      { name: 'PowerShell', level: 84 },
      { name: 'Bash / Shell', level: 88 },
      { name: 'YAML / JSON', level: 90 },
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
