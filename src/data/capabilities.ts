export interface Capability {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  icon: string;
}

export const capabilities: Capability[] = [
  {
    id: 'growth-engineering',
    title: 'Growth Engineering',
    subtitle: 'Systems that scale revenue',
    description:
      'Engineering-first approach to growth. We build conversion systems, analytics pipelines, and funnel architectures that compound over time.',
    services: [
      'Technical SEO',
      'Paid Acquisition Systems',
      'Conversion Engineering',
      'Funnel Architecture',
      'Analytics Engineering',
      'Attribution Modeling',
    ],
    icon: '⚡',
  },
  {
    id: 'marketing-automation',
    title: 'Marketing Automation',
    subtitle: 'Automation before manpower',
    description:
      'We replace manual processes with intelligent workflows. CRM integrations, lead routing, campaign automation, and reporting systems.',
    services: [
      'Workflow Automation',
      'Reporting Automation',
      'CRM Integration',
      'Lead Routing',
      'Campaign Automation',
      'Data Pipeline Engineering',
    ],
    icon: '⚙️',
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    subtitle: 'Intelligence built in',
    description:
      'Custom AI systems that integrate into your growth stack. From lead qualification to content generation to predictive analytics.',
    services: [
      'AI Chatbots',
      'Lead Qualification AI',
      'AI Workflows',
      'Predictive Analytics',
      'Content AI Systems',
      'Custom Model Integration',
    ],
    icon: '🧠',
  },
  {
    id: 'custom-development',
    title: 'Custom Development',
    subtitle: 'Build what doesn\'t exist',
    description:
      'When off-the-shelf tools fall short, we build custom. Web platforms, dashboards, internal tools, SaaS systems, and API integrations.',
    services: [
      'Web Platforms',
      'Custom Dashboards',
      'Internal Tools',
      'SaaS Systems',
      'API Integrations',
      'Data Infrastructure',
    ],
    icon: '🔧',
  },
  {
    id: 'creative-execution',
    title: 'Creative Execution',
    subtitle: 'Design that converts',
    description:
      'Strategic creative built for performance. Brand systems, ad creative, video production, email design, and UI engineering.',
    services: [
      'Brand Design Systems',
      'Performance Creatives',
      'Video Production',
      'Email Systems',
      'UI/UX Design',
      'Motion Design',
    ],
    icon: '🎨',
  },
];
