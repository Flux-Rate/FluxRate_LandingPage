export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  title: string;
  subtitle: string;
  bullets: string[];
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export type StatItem = {
  label: string;
  value: string;
  source?: string;
};

export type ProblemContent = {
  title: string;
  description: string;
  stats: StatItem[];
  pains: string[];
};

export type SolutionContent = {
  steps: {
    title: string;
    description: string;
  }[];
  pillars: string[];
};

export type HowItWorksContent = {
  steps: {
    title: string;
    description: string;
  }[];
  deployment: string;
};

export type DifferentiatorsContent = {
  headline: string;
  items: {
    title: string;
    description: string;
  }[];
};

export type UseCasesContent = {
  headline: string;
  items: {
    title: string;
    description: string;
    isFuture?: boolean;
  }[];
};

export type TeamMember = {
  name: string;
  fullName: string;
  role: string;
  description: string;
  portfolio: string;
  image: string;
};

export type TeamContent = {
  headline: string;
  subheadline: string;
  members: TeamMember[];
};

export type VoiceOfCustomerContent = {
  headline: string;
  quotes: string[];
};

export type KpiContent = {
  items: {
    label: string;
    value: string;
  }[];
};

export type PilotContent = {
  headline: string;
  phases: {
    title: string;
    description: string;
  }[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  headline: string;
  items: FaqItem[];
};

export type ContactContent = {
  headline: string;
  subheadline: string;
  facilityTypes: string[];
  submitCta: string;
};

export type TrustContent = {
  items: string[];
};

export const siteContent = {
  nav: {
    logoAlt: 'FluxRate adaptive pricing logo',
    items: [
      { label: 'Problem', href: '#problem' },
      { label: 'Solution', href: '#solution' },
      { label: 'Differentiators', href: '#diff' },
      { label: 'Use cases', href: '#usecases' },
      { label: 'Team', href: '#team' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ] as NavItem[],
  },
  hero: {
    title: 'FluxRate: Adaptive Cyber-Physical Pricing System',
    subtitle: 'Revolutionizing parking revenue through intelligent, real-time pricing automation.',
    bullets: [
      'Plug-and-play with existing gates (no rip-and-replace)',
      'Transparent live pricing at entry',
      '10–30% RevPAS uplift in pilots',
    ],
    secondaryCta: {
      label: 'Meet the Team',
      href: '#team',
    },
  } as HeroContent,
  problem: {
    title: 'Parking is inefficient by design. Static rates ignore real-world demand.',
    description:
      'Municipal and private operators leave revenue on the table every day: underutilized paid lots stand half-empty while nearby curbs overflow. Without yield tools there is no way to capture peak-demand premiums, meaning congestion, emissions, and poor driver experience persist.',
    stats: [
      {
        label: 'Downtown traffic circling for parking (SFpark)',
        value: '30%',
      },
      {
        label: 'Revenue lost to static pricing',
        value: '10–30%',
      },
    ],
    pains: [
      'Underutilized paid lots versus overflowing curbs',
      'Lack of yield management tooling',
      'Missed peak-demand premiums',
      'Congestion, emissions, and frustrated drivers',
      'No transparency around rate changes',
    ],
  } as ProblemContent,
  solution: {
    steps: [
      {
        title: 'Sense',
        description: 'Entry/exit counters and occupancy sensors feed live utilization data.',
      },
      {
        title: 'Compute',
        description: 'Cloud AI pricing engine models elasticity, rush-hour spikes, and local events.',
      },
      {
        title: 'Actuate',
        description: 'Digital signage and payment APIs (Honk, ParkMobile) publish transparent rates.',
      },
      {
        title: 'Optimize',
        description: 'Continuous feedback refines pricing envelopes for predictable outcomes.',
      },
    ],
    pillars: ['Plug-and-Play', 'Transparent', 'Proven results'],
  } as SolutionContent,
  how: {
    steps: [
      {
        title: 'Data collection',
        description: 'Vehicle flow, timestamps, and occupancy streams aggregate from gates and sensors.',
      },
      {
        title: 'Intelligent processing',
        description: 'Rules and AI update prices hourly or faster using demand, events, and context.',
      },
      {
        title: 'Real-time actuation',
        description: 'Entry signage and gate/payment APIs broadcast prices before drivers commit.',
      },
      {
        title: 'Continuous feedback loop',
        description: 'Observed behavior tunes elasticity curves and guardrails.',
      },
    ],
    deployment: 'Flexible deployment (cloud, edge, or hybrid) adapts to facility constraints.',
  } as HowItWorksContent,
  differentiators: {
    headline: 'Built for cyber-physical reliability',
    items: [
      {
        title: 'Retrofit-ready integration',
        description: 'Works with existing gates and signage—no rip-and-replace required.',
      },
      {
        title: 'Driver-visible transparency',
        description: 'Real-time dynamic pricing with large-format signage at the point of decision.',
      },
      {
        title: 'CPS rigor',
        description: 'Latency bounds, reliability targets, and smooth price ramps prevent whiplash.',
      },
      {
        title: 'Open, auditable APIs',
        description: 'Signage, gates, payments, and LLM/DSL policy guard for human oversight.',
      },
      {
        title: 'Elastic throughput focus',
        description: 'Optimizes physical throughput and price elasticity together.',
      },
      {
        title: 'Operator-first controls',
        description: 'Automation with manual overrides, alerts, and reporting baked in.',
      },
    ],
  } as DifferentiatorsContent,
  useCases: {
    headline: 'Adaptive pricing, facility by facility',
    items: [
      {
        title: 'Paid parking complexes',
        description: 'Malls, airports, stadiums, and offices capture demand-based RevPAS uplift.',
      },
      {
        title: 'Corporate & university campuses',
        description: 'Shape demand while maintaining fairness for employees and students.',
      },
      {
        title: 'Event venues',
        description: 'Lot-by-lot surge pricing aligned to proximity and timing.',
      },
      {
        title: 'Roadway tolling',
        description: 'Future congestion pricing driven by occupancy and flow data.',
        isFuture: true,
      },
      {
        title: 'EV charging',
        description: 'Grid-aware pricing ensures availability and aligns with energy costs.',
        isFuture: true,
      },
      {
        title: 'Retail & vending',
        description: 'Dynamic markdowns for slow-moving physical inventory.',
        isFuture: true,
      },
    ],
  } as UseCasesContent,
  team: {
    headline: 'Founding team behind FluxRate',
    subheadline:
      'Operator empathy meets cyber-physical engineering. Harsha and Vamshi pair experience across software platforms, robotics, and large-scale pricing systems.',
    members: [
      {
        name: 'Harsha',
        fullName: 'Harshavardhan Kuthadi',
        role: 'Co-Founder & CEO',
        description: 'MS in Software Engineering (ASU). Ex-SDE at AWS and O9 Solutions.',
        portfolio: 'https://harsha0602.github.io/Portfolio/',
        image: 'Harsha_profile.jpg',
      },
      {
        name: 'Vamshi',
        fullName: 'Vamshi Narayana Babu',
        role: 'Co-Founder & COO',
        description:
          'MS in Robotics & Autonomous Systems Engineering (ASU). Ex-SDE at Adverb Technologies.',
        portfolio: 'https://vamshin24.github.io/Portfolio/',
        image: 'Vamshi_profile.jpg',
      },
    ],
  } as TeamContent,
  voiceOfCustomer: {
    headline: 'Voice of the operator',
    quotes: [
      'We want fairer pricing without losing operational control.',
      'Integration with existing gates is non-negotiable.',
      'Automation with manual override and analytics is a must.',
    ],
  } as VoiceOfCustomerContent,
  kpis: {
    items: [
      { label: 'Gated paid lots in the U.S.', value: '40k+' },
      { label: 'Smart parking CAGR', value: '16%' },
      { label: 'Phase-1 TAM (gated lots)', value: '$450M' },
    ],
  } as KpiContent,
  pilot: {
    headline: 'Pilot plan to prove impact',
    phases: [
      { title: 'Phase 1: Simulation', description: 'Calibrate with historical data and baselines.' },
      { title: 'Phase 2: Pilots', description: 'Launch in 2–3 gated sites across mixed-use footprints.' },
      { title: 'Phase 3: Expansion', description: 'Scale to campuses, regional airports, and venues.' },
      { title: 'Phase 4: Platform', description: 'Extend to EV charging, toll roads, and broader CPS assets.' },
    ],
  } as PilotContent,
  faq: {
    headline: 'FAQ',
    items: [
      {
        question: 'Does FluxRate replace our gates?',
        answer: 'No. FluxRate retrofits with existing gates, signage, and payment systems.',
      },
      {
        question: 'How “dynamic” is pricing?',
        answer: 'Operators set bounds and ramps. FluxRate updates hourly or faster within those guardrails.',
      },
      {
        question: 'What about driver fairness?',
        answer: 'Live, transparent signage and caps/overrides keep drivers informed before they pull in.',
      },
      {
        question: 'Can we start with rules before AI?',
        answer: 'Yes. Kick off with rule-based policies and graduate to machine learning as data accrues.',
      },
      {
        question: 'How long to pilot?',
        answer: 'Most pilots run 3–6 months with measurable ROI and operator feedback loops.',
      },
      {
        question: 'Which payments integrate?',
        answer: 'FluxRate plugs into existing providers like Honk and ParkMobile via open APIs.',
      },
    ],
  } as FaqContent,
  contact: {
    headline: 'Bring adaptive pricing to your facility.',
    subheadline: 'Reach out for a 20-minute walkthrough or to explore collaboration.',
    facilityTypes: [
      'Airport',
      'Stadium / Venue',
      'Corporate Campus',
      'University',
      'Municipal',
      'Mixed-Use',
      'Other',
    ],
    submitCta: 'Send Message',
  } as ContactContent,
  trust: {
    items: [
      '99.9% uptime goal',
      'Encrypted data in transit',
      'Privacy-first analytics',
      'SOC 2 pathway',
    ],
  } as TrustContent,
};

export type SiteContent = typeof siteContent;
