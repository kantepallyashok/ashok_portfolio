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
    title: 'Enterprise CI/CD Platform',
    category: 'CI/CD',
    icon: 'git-merge',
    accent: 'azure',
    summary:
      'A golden-path delivery platform unifying build, test, security scanning and ' +
      'deployment across teams — with reusable templates and policy-as-code guardrails.',
    highlights: [
      'Standardized multi-stage pipelines on Azure DevOps & Jenkins',
      'Automated quality, security and approval gates',
      'Cut release lead time and manual toil dramatically',
    ],
    stack: ['Azure DevOps', 'Jenkins', 'Docker', 'Terraform', 'SonarQube'],
    links: { live: '#', repo: '#' },
  },
  {
    title: 'AWS ECS Deployment Framework',
    category: 'Containers',
    icon: 'box',
    accent: 'aws',
    summary:
      'A repeatable framework for shipping containerized services to Amazon ECS with ' +
      'blue/green rollouts, autoscaling and zero-downtime deployments.',
    highlights: [
      'Infrastructure as Code with Terraform & CloudFormation',
      'Blue/green deployments via CodeDeploy',
      'Centralized logging and CloudWatch dashboards',
    ],
    stack: ['AWS ECS', 'Terraform', 'CloudFormation', 'Docker', 'CloudWatch'],
    links: { live: '#', repo: '#' },
  },
  {
    title: 'Multi-Cloud Infrastructure Platform',
    category: 'Cloud',
    icon: 'cloud',
    accent: 'azure',
    summary:
      'Governed landing zones spanning AWS and Azure — consistent networking, identity ' +
      'and security baselines delivered entirely through modular Terraform.',
    highlights: [
      'Reusable Terraform modules & remote state',
      'Consistent IAM, networking and tagging standards',
      'Cost visibility and guardrails across clouds',
    ],
    stack: ['AWS', 'Azure', 'Terraform', 'Ansible', 'Vault'],
    links: { live: '#', repo: '#' },
  },
  {
    title: 'Kubernetes Automation Platform',
    category: 'Containers',
    icon: 'ship',
    accent: 'aws',
    summary:
      'A self-service Kubernetes platform with GitOps delivery, automated scaling and ' +
      'end-to-end observability for application teams.',
    highlights: [
      'GitOps continuous delivery with ArgoCD',
      'Helm-packaged, templated workloads',
      'Prometheus & Grafana observability stack',
    ],
    stack: ['Kubernetes', 'Helm', 'ArgoCD', 'Prometheus', 'Grafana'],
    links: { live: '#', repo: '#' },
  },
];
