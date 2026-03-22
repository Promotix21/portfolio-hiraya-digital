export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  problem: string;
  system: string;
  execution: string[];
  results: { metric: string; value: string; change: string }[];
  technologies: string[];
  tag: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'healthcare-seo',
    client: 'US Healthcare Group',
    industry: 'Healthcare',
    problem:
      'Declining organic visibility across 12 location pages with zero structured data implementation and fragmented content architecture.',
    system:
      'Built a technical SEO infrastructure including automated schema generation, programmatic internal linking, and content hub architecture.',
    execution: [
      'Technical site audit and crawl optimization',
      'Programmatic schema markup generation',
      'Content hub architecture redesign',
      'Automated internal linking system',
      'Core Web Vitals optimization pipeline',
    ],
    results: [
      { metric: 'Organic Traffic', value: '+340%', change: 'increase over 8 months' },
      { metric: 'Keyword Rankings', value: '1,200+', change: 'keywords in top 10' },
      { metric: 'Page Load Speed', value: '1.2s', change: 'down from 4.8s' },
      { metric: 'Conversion Rate', value: '+89%', change: 'increase from organic' },
    ],
    technologies: ['Next.js', 'Python', 'Google Search Console API', 'Custom CMS'],
    tag: 'Growth Engineering',
  },
  {
    id: 'restaurant-saas',
    client: 'Restaurant SaaS Platform',
    industry: 'SaaS / Food Tech',
    problem:
      'Manual onboarding process taking 2 weeks per restaurant. No automation in lead qualification or reporting.',
    system:
      'End-to-end automation platform handling lead qualification, onboarding workflows, and real-time reporting dashboards.',
    execution: [
      'AI lead scoring and qualification system',
      'Automated onboarding workflow engine',
      'Real-time analytics dashboard',
      'CRM integration with HubSpot',
      'Automated reporting system',
    ],
    results: [
      { metric: 'Onboarding Time', value: '2 days', change: 'down from 2 weeks' },
      { metric: 'Lead Response', value: '<5 min', change: 'down from 24 hours' },
      { metric: 'Manual Tasks', value: '-85%', change: 'reduction in manual work' },
      { metric: 'MRR Growth', value: '+156%', change: 'in 6 months' },
    ],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'HubSpot API', 'OpenAI'],
    tag: 'Marketing Automation',
  },
  {
    id: 'dental-brand',
    client: 'Multi-Location Dental Brand',
    industry: 'Healthcare / Dental',
    problem:
      'Fragmented paid media across 8 locations with no unified attribution, wasting 40% of ad spend on overlapping audiences.',
    system:
      'Unified paid media command center with cross-location attribution, automated budget allocation, and AI-powered creative testing.',
    execution: [
      'Cross-location attribution model',
      'Automated budget allocation engine',
      'Creative A/B testing framework',
      'Unified reporting dashboard',
      'Geo-targeted campaign architecture',
    ],
    results: [
      { metric: 'Cost Per Lead', value: '-52%', change: 'reduction across all locations' },
      { metric: 'ROAS', value: '4.8x', change: 'up from 1.9x' },
      { metric: 'Ad Spend Efficiency', value: '+40%', change: 'budget optimization' },
      { metric: 'New Patients', value: '+210%', change: 'increase in bookings' },
    ],
    technologies: ['Meta API', 'Google Ads API', 'Python', 'React Dashboard', 'BigQuery'],
    tag: 'Growth Engineering',
  },
];
