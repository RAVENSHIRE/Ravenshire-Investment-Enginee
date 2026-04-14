import { SectorData } from '../types';

export const SECTORS: Record<string, SectorData> = {
  tech: {
    id: 'tech',
    name: 'TECH INTEL',
    tagline: 'AI Compute Scarcity & Energy Bottleneck',
    description: 'The race for AGI is no longer just about algorithms; it is a battle for silicon and power. We analyze the critical nodes in the AI supply chain.',
    color: '#38bdf8',
    heroStats: [
      { label: 'H100 Demand', value: 'Critical' },
      { label: 'Power Gap', value: '45GW' },
      { label: 'Fab Utilization', value: '98%' },
      { label: 'AI Capex 2026', value: '$250B+' },
    ],
    breakingNews: {
      date: 'April 12, 2026',
      source: 'Bloomberg',
      text: 'NVIDIA announces "Rubin" architecture early shipment; Blackwell demand exceeds supply by 400%. Microsoft and Meta reportedly in bidding war for next-gen H200 clusters.'
    },
    narratives: [
      { id: '01', tag: 'SCARCITY', title: 'The GPU Sovereignity', body: 'Nations are now building sovereign AI clouds. Compute is the new oil, and NVIDIA is the OPEC.' },
      { id: '02', tag: 'ENERGY', title: 'Nuclear AI Renaissance', body: 'Data centers are hitting the grid wall. SMRs (Small Modular Reactors) are becoming the primary solution for hyperscalers.' },
      { id: '03', tag: 'EDGE', title: 'On-Device Inference', body: 'The shift from cloud to edge. Apple and Qualcomm are reclaiming the inference market as privacy-first AI goes local.' },
    ],
    companies: [
      {
        ticker: 'NVDA',
        name: 'NVIDIA Corporation',
        price: '$1,245.50',
        change: '+4.2%',
        status: 'Bullish',
        thesis: 'The undisputed king of the AI era. <strong>Rubin architecture</strong> launch is the next multi-billion dollar catalyst.',
        metrics: [
          { label: 'Data Center Rev', value: '$45B', trend: 'up' },
          { label: 'Gross Margin', value: '78%', trend: 'up' }
        ],
        news: [
          { text: 'Rubin GPU production ahead of schedule.', date: 'Apr 10', type: 'positive' },
          { text: 'Sovereign AI deals signed with 3 more nations.', date: 'Apr 5', type: 'catalyst' }
        ]
      },
      {
        ticker: 'AVGO',
        name: 'Broadcom Inc.',
        price: '$1,420.10',
        change: '+2.1%',
        status: 'Bullish',
        thesis: 'Custom AI accelerators (ASICs) for Google and Meta are the hidden growth engine.',
        metrics: [
          { label: 'AI Revenue', value: '$12B', trend: 'up' },
          { label: 'Networking Rev', value: '$4.5B', trend: 'up' }
        ],
        news: [
          { text: 'Meta increases custom chip order for 2026.', date: 'Apr 8', type: 'positive' }
        ]
      }
    ],
    catalysts: [
      { date: 'May 2026', event: 'NVIDIA GTC Spring', description: 'Official Rubin deep-dive and performance benchmarks.', status: 'upcoming' },
      { date: 'June 2026', event: 'Apple WWDC', description: 'Integration of local LLMs across the entire OS ecosystem.', status: 'target' }
    ]
  },
  healthcare: {
    id: 'healthcare',
    name: 'HEALTH INTEL',
    tagline: 'GLP-1 Revolution & Longevity Boom',
    description: 'The convergence of metabolic health and AI-driven drug discovery is creating the largest value unlock in medical history.',
    color: '#10b981',
    heroStats: [
      { label: 'GLP-1 Market', value: '$150B' },
      { label: 'AI Drug Pipeline', value: '450+' },
      { label: 'Longevity Capex', value: '$45B' },
      { label: 'FDA AI Approvals', value: '120' },
    ],
    breakingNews: {
      date: 'April 11, 2026',
      source: 'STAT News',
      text: 'Eli Lilly receives fast-track designation for oral GLP-1; Novo Nordisk announces breakthrough in muscle-sparing weight loss tech.'
    },
    narratives: [
      { id: '01', tag: 'METABOLIC', title: 'Beyond Obesity', body: 'GLP-1s are showing efficacy in Alzheimer’s and cardiovascular health, expanding the TAM by 3x.' },
      { id: '02', tag: 'AI-DRUG', title: 'Zero-Shot Discovery', body: 'AI models are now predicting protein folding with 99% accuracy, cutting drug discovery time from years to weeks.' },
      { id: '03', tag: 'LONGEVITY', title: 'Biological Age Reversal', body: 'Epigenetic reprogramming is moving from labs to clinical trials. Longevity is becoming a mainstream consumer vertical.' },
    ],
    companies: [
      {
        ticker: 'LLY',
        name: 'Eli Lilly and Company',
        price: '$945.20',
        change: '+3.5%',
        status: 'Bullish',
        thesis: 'Dominance in the metabolic space with <strong>Zepbound</strong> and a massive oral pipeline.',
        metrics: [
          { label: 'GLP-1 Growth', value: '120%', trend: 'up' },
          { label: 'R&D Spend', value: '$9.5B', trend: 'neutral' }
        ],
        news: [
          { text: 'Oral GLP-1 Phase 3 data exceeds expectations.', date: 'Apr 9', type: 'positive' }
        ]
      },
      {
        ticker: 'NVO',
        name: 'Novo Nordisk',
        price: '$145.80',
        change: '+1.8%',
        status: 'Hold',
        thesis: 'Supply chain constraints are easing, but competition is intensifying in the oral segment.',
        metrics: [
          { label: 'Wegovy Sales', value: '$12B', trend: 'up' },
          { label: 'Manufacturing Cap', value: 'High', trend: 'neutral' }
        ],
        news: [
          { text: 'New manufacturing plant in Ireland operational.', date: 'Apr 2', type: 'positive' }
        ]
      }
    ],
    catalysts: [
      { date: 'May 2026', event: 'ADA Conference', description: 'Major data release on GLP-1 impact on kidney disease.', status: 'upcoming' },
      { date: 'July 2026', event: 'FDA Decision', description: 'Approval decision for first AI-designed oncology drug.', status: 'target' }
    ]
  },
  consumer: {
    id: 'consumer',
    name: 'CONSUMER INTEL',
    tagline: 'AI Personalization & DTC Disruption',
    description: 'The death of generic retail. AI agents are now the primary interface for commerce, shifting power from platforms to brands.',
    color: '#f59e0b',
    heroStats: [
      { label: 'AI Agent Commerce', value: '25%' },
      { label: 'DTC Growth', value: '18%' },
      { label: 'Social Commerce', value: '$1.2T' },
      { label: 'Personalization Lift', value: '45%' },
    ],
    breakingNews: {
      date: 'April 10, 2026',
      source: 'Retail Dive',
      text: 'Amazon launches "Project Nile" — a fully autonomous AI shopping agent that manages household inventory without user input.'
    },
    narratives: [
      { id: '01', tag: 'AGENTIC', title: 'The Agentic Consumer', body: 'Consumers no longer browse; their agents negotiate. Brands must optimize for AI algorithms, not human eyes.' },
      { id: '02', tag: 'HYPER-LOCAL', title: 'Micro-Fulfillment', body: '15-minute delivery is becoming the standard for urban centers, powered by autonomous drone fleets.' },
      { id: '03', tag: 'EXPERIENCE', title: 'The Immersive Mall', body: 'Physical retail is pivoting to "Brand Temples" — high-experience, low-inventory spaces for community building.' },
    ],
    companies: [
      {
        ticker: 'AMZN',
        name: 'Amazon.com, Inc.',
        price: '$210.45',
        change: '+2.8%',
        status: 'Bullish',
        thesis: 'Integration of <strong>Project Nile</strong> and AWS AI growth creates a powerful flywheel.',
        metrics: [
          { label: 'Ads Revenue', value: '$55B', trend: 'up' },
          { label: 'Prime Subs', value: '250M', trend: 'up' }
        ],
        news: [
          { text: 'Project Nile rollout starts in US metros.', date: 'Apr 10', type: 'catalyst' }
        ]
      },
      {
        ticker: 'SHOP',
        name: 'Shopify Inc.',
        price: '$85.20',
        change: '+1.5%',
        status: 'Bullish',
        thesis: 'The "Anti-Amazon" platform is winning as DTC brands seek independence and AI-driven tools.',
        metrics: [
          { label: 'GMV', value: '$250B', trend: 'up' },
          { label: 'Take Rate', value: '2.9%', trend: 'up' }
        ],
        news: [
          { text: 'New AI-powered storefront generator launched.', date: 'Apr 5', type: 'positive' }
        ]
      }
    ],
    catalysts: [
      { date: 'June 2026', event: 'Prime Day', description: 'First major test for autonomous AI shopping agents.', status: 'upcoming' },
      { date: 'August 2026', event: 'Back to School', description: 'Analysis of Gen Alpha spending patterns and social commerce.', status: 'target' }
    ]
  },
  utilities: {
    id: 'utilities',
    name: 'UTILITIES INTEL',
    tagline: 'AI Energy Demand & Nuclear Renaissance',
    description: 'The grid is the ultimate constraint for AI. We track the massive capital shift into carbon-free, 24/7 baseload power.',
    color: '#a78bfa',
    heroStats: [
      { label: 'Data Center Load', value: '120GW' },
      { label: 'Nuclear Share', value: '22%' },
      { label: 'Grid Capex', value: '$1.2T' },
      { label: 'SMR Pipeline', value: '15' },
    ],
    breakingNews: {
      date: 'April 13, 2026',
      source: 'Utility Dive',
      text: 'Constellation Energy signs record-breaking 20-year PPA with Microsoft to restart Three Mile Island Unit 1 for AI power.'
    },
    narratives: [
      { id: '01', tag: 'NUCLEAR', title: 'The SMR Race', body: 'Small Modular Reactors are moving from design to deployment. They are the only viable 24/7 power source for AI clusters.' },
      { id: '02', tag: 'GRID', title: 'Transmission Bottlenecks', body: 'The physical grid is 50 years old. Companies specializing in high-voltage DC lines are the new infrastructure darlings.' },
      { id: '03', tag: 'STORAGE', title: 'Long-Duration Storage', body: 'Lithium is for cars; iron-air and flow batteries are for the grid. 100-hour storage is the holy grail.' },
    ],
    companies: [
      {
        ticker: 'CEG',
        name: 'Constellation Energy',
        price: '$245.10',
        change: '+5.2%',
        status: 'Bullish',
        thesis: 'The largest carbon-free energy producer in the US. <strong>Microsoft PPA</strong> is just the beginning.',
        metrics: [
          { label: 'Nuclear Cap', value: '22GW', trend: 'neutral' },
          { label: 'Free Cash Flow', value: '$4.2B', trend: 'up' }
        ],
        news: [
          { text: 'Microsoft 20-year PPA finalized.', date: 'Apr 13', type: 'catalyst' }
        ]
      },
      {
        ticker: 'NEE',
        name: 'NextEra Energy',
        price: '$78.45',
        change: '+1.2%',
        status: 'Hold',
        thesis: 'Dominance in renewables but facing higher financing costs for grid expansion.',
        metrics: [
          { label: 'Renewable Pipe', value: '35GW', trend: 'up' },
          { label: 'Dividend Yield', value: '2.8%', trend: 'neutral' }
        ],
        news: [
          { text: 'New solar + storage project in Florida approved.', date: 'Apr 6', type: 'positive' }
        ]
      }
    ],
    catalysts: [
      { date: 'May 2026', event: 'FERC Meeting', description: 'New rules on grid interconnection for data centers.', status: 'upcoming' },
      { date: 'September 2026', event: 'SMR Milestone', description: 'First concrete pour for NuScale’s commercial SMR.', status: 'target' }
    ]
  },
  crypto: {
    id: 'crypto',
    name: 'CRYPTO INTEL',
    tagline: 'Bitcoin Institutional & Layer 2 Scaling',
    description: 'The transition from speculation to institutional infrastructure. We monitor the integration of digital assets into the global financial stack.',
    color: '#fb923c',
    heroStats: [
      { label: 'ETF Inflows', value: '$85B' },
      { label: 'L2 TVL', value: '$120B' },
      { label: 'Stablecoin Vol', value: '$2.5T' },
      { label: 'Institutional Hold', value: '15%' },
    ],
    breakingNews: {
      date: 'April 14, 2026',
      source: 'CoinDesk',
      text: 'BlackRock launches "IBIT Pro" — an institutional-only Bitcoin yield product; Ethereum EIP-4844 upgrades drive L2 fees to near-zero.'
    },
    narratives: [
      { id: '01', tag: 'INSTITUTIONAL', title: 'The Yield Era', body: 'Bitcoin is no longer just a store of value. Institutional staking and yield products are the new focus for pension funds.' },
      { id: '02', tag: 'SCALING', title: 'The L2 Explosion', body: 'Solana and Ethereum L2s are processing 100k+ TPS. The "World Computer" is finally becoming fast enough for global finance.' },
      { id: '03', tag: 'STABLECOINS', title: 'The New Rails', body: 'Stablecoins are settling more volume than Visa. They are the primary bridge for cross-border B2B payments.' },
    ],
    companies: [
      {
        ticker: 'BTC',
        name: 'Bitcoin',
        price: '$142,500',
        change: '+3.1%',
        status: 'Bullish',
        thesis: 'Digital Gold. <strong>Institutional adoption</strong> via ETFs and corporate treasuries is the floor.',
        metrics: [
          { label: 'Hash Rate', value: '750 EH/s', trend: 'up' },
          { label: 'Active Addresses', value: '1.2M', trend: 'up' }
        ],
        news: [
          { text: 'BlackRock IBIT Pro launch.', date: 'Apr 14', type: 'catalyst' }
        ]
      },
      {
        ticker: 'SOL',
        name: 'Solana',
        price: '$345.20',
        change: '+6.5%',
        status: 'Bullish',
        thesis: 'The "Visa of Crypto". High throughput and low fees are winning the retail and payment market.',
        metrics: [
          { label: 'TPS', value: '65k', trend: 'up' },
          { label: 'TVL', value: '$15B', trend: 'up' }
        ],
        news: [
          { text: 'Firedancer validator client mainnet launch.', date: 'Apr 11', type: 'positive' }
        ]
      }
    ],
    catalysts: [
      { date: 'May 2026', event: 'Consensus 2026', description: 'Major announcements on US stablecoin regulation.', status: 'upcoming' },
      { date: 'October 2026', event: 'ETH Pectra Upgrade', description: 'Finalizing the transition to a fully scalable L2-centric roadmap.', status: 'target' }
    ]
  },
  space: {
    id: 'space',
    name: 'SPACE INTEL',
    tagline: 'SpaceX IPO & Orbital Economy',
    description: 'The "Netscape Moment" for the space sector. SpaceX is revaluing the entire industry as it prepares for the largest IPO in history.',
    color: '#38bdf8',
    heroStats: [
      { label: 'SpaceX Target', value: '$1.75T' },
      { label: 'Capital Goal', value: '$75B+' },
      { label: 'IPO Window', value: 'Jun/Jul' },
      { label: 'Active Sats', value: '12,000+' },
    ],
    breakingNews: {
      date: 'March 25, 2026',
      source: 'CNBC',
      text: 'SpaceX reportedly filing for IPO this week; valuation target set at $1.75 trillion. Rocket Lab and AST SpaceMobile surge on the news.'
    },
    narratives: [
      { id: '01', tag: 'RE-RATING', title: 'Infrastructure Upgrade', body: 'The IPO transforms space from "speculative" to "critical infrastructure" — a fundamental shift in asset class perception.' },
      { id: '02', tag: 'ORBITAL-AI', title: 'AI in the Void', body: 'Satellites are becoming orbital data centers. Planet Labs is already running NVIDIA AI on-orbit for real-time processing.' },
      { id: '03', tag: 'D2D', title: 'Direct-to-Device', body: 'The end of dead zones. Satellite-to-cell connectivity is becoming a standard feature for all major carriers.' },
    ],
    companies: [
      {
        ticker: 'RKLB',
        name: 'Rocket Lab USA',
        price: '$69.05',
        change: '-4.9%',
        status: 'Watch',
        thesis: 'The primary public proxy for SpaceX. <strong>Neutron rocket</strong> success is the make-or-break catalyst for 2026.',
        metrics: [
          { label: 'Backlog', value: '$1.2B', trend: 'up' },
          { label: 'Launch Cadence', value: 'Monthly', trend: 'up' }
        ],
        news: [
          { text: 'Neutron stage-1 tank test successful.', date: 'Apr 5', type: 'positive' }
        ]
      },
      {
        ticker: 'ASTS',
        name: 'AST SpaceMobile',
        price: '$78.67',
        change: '+8.2%',
        status: 'Bullish',
        thesis: 'Leading the D2D revolution with AT&T and Verizon. <strong>BlueBird constellation</strong> deployment is scaling.',
        metrics: [
          { label: 'Partner Carriers', value: '45+', trend: 'up' },
          { label: 'Cash Runway', value: '24mo', trend: 'neutral' }
        ],
        news: [
          { text: 'Next batch of BlueBirds scheduled for April launch.', date: 'Apr 2', type: 'catalyst' }
        ]
      }
    ],
    catalysts: [
      { date: 'June 2026', event: 'SpaceX IPO Day', description: 'The largest IPO in history, expected to unlock $120B+ in value for Alphabet.', status: 'target' },
      { date: 'Q4 2026', event: 'Neutron First Flight', description: 'Rocket Lab’s medium-lift debut to compete directly with Falcon 9.', status: 'upcoming' }
    ]
  }
};

export const TICKER_DATA = [
  { symbol: 'NVDA', price: '$1,245.50', change: '+4.2%', trend: 'up' },
  { symbol: 'LLY', price: '$945.20', change: '+3.5%', trend: 'up' },
  { symbol: 'AMZN', price: '$210.45', change: '+2.8%', trend: 'up' },
  { symbol: 'CEG', price: '$245.10', change: '+5.2%', trend: 'up' },
  { symbol: 'BTC', price: '$142,500', change: '+3.1%', trend: 'up' },
  { symbol: 'AVGO', price: '$1,420.10', change: '+2.1%', trend: 'up' },
  { symbol: 'NVO', price: '$145.80', change: '+1.8%', trend: 'up' },
  { symbol: 'SHOP', price: '$85.20', change: '+1.5%', trend: 'up' },
  { symbol: 'NEE', price: '$78.45', change: '+1.2%', trend: 'up' },
  { symbol: 'SOL', price: '$345.20', change: '+6.5%', trend: 'up' },
  { symbol: 'ASML', price: '$1,050.00', change: '-1.2%', trend: 'down' },
  { symbol: 'TSLA', price: '$215.30', change: '-2.5%', trend: 'down' },
] as const;
