// src/data/experience.ts

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  termDescription?: string;
  category: 'enterprise' | 'data-it' | 'broadcast' | 'leadership' | 'editorial';
  statusBadge: string;
  overview: string;
  pillars: {
    title: string;
    items: string[];
  }[];
  impact: string;
  tools: string[];
  relatedLink?: {
    text: string;
    url: string;
  };
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'unico-client-service',
    role: 'Client Service Specialist',
    organization: 'UNICO Group',
    location: 'Lincoln, NE / Hybrid',
    startDate: '2025-06',
    endDate: 'Present',
    category: 'enterprise',
    statusBadge: 'ACTIVE_DEPLOYMENT',
    overview:
      'Directly administer complex corporate employee benefit portfolios across self-funded, level-funded, and fully-insured plan designs. Act as the primary operational and regulatory liaison between corporate HR leadership, employees, and major national insurance carriers.',
    pillars: [
      {
        title: '01 Carrier Ecosystem & Discrepancy Auditing',
        items: [
          'Manage daily operational workflows with national carriers including Cigna, Ameritas, Unum, Guardian, Auxiant, Principal, Mutual of Omaha, Assurity, and Pacific Life.',
          'Conduct forensic reconciliations between carrier premium statements, payroll deduction ledgers, and HRIS census data to catch billing errors and eligibility gaps before accounting closes.',
          'Investigate and resolve complex multi-vendor enrollment discrepancies, retroactive terminations, and claim submission disputes.',
        ],
      },
      {
        title: '02 HRIS & Regulatory Plan Administration',
        items: [
          'Operate iSolved and Paylocity platforms to manage open enrollment cycles, qualifying life events (QLEs), and leave of absence tracking.',
          'Ensure strict plan compliance with ERISA, HIPAA, COBRA, FMLA, and ADA regulatory frameworks for self-funded and fully-insured corporate plans.',
          'Coordinate pre-tax tax-advantaged accounts (HSA, FSA, Limited Purpose FSA, Dependent Care FSA) and facilitate short/long-term disability claims.',
          'Leverage an active State of Nebraska Health and Life Insurance License to interpret summary plan descriptions (SPDs), deductible structures, and out-of-pocket limits.',
        ],
      },
    ],
    impact:
      'Maintained 100% data fidelity across multi-carrier billing reconciliations, prevented premium overpayments for corporate clients, and guided corporate workforces through annual open enrollment transitions with zero compliance lapses.',
    tools: [
      'iSolved',
      'Paylocity',
      'ERISA / HIPAA',
      'COBRA Compliance',
      'Carrier Portals',
      'Forensic Billing Audit',
      'NE Insurance Licensure',
    ],
    relatedLink: {
      text: 'Explore Enterprise Toolkits',
      url: 'skills.html#enterprise-systems',
    },
  },
  {
    id: 'unico-data-analyst',
    role: 'Data Analyst & IT Intern',
    organization: 'UNICO Group',
    location: 'Lincoln, Nebraska',
    startDate: '2024-05',
    endDate: '2025-06',
    category: 'data-it',
    statusBadge: '30%_EFFICIENCY_GAIN',
    overview:
      'Engineered automated internal data extraction, transformation, and business intelligence pipelines across enterprise datasets. Designed executive dashboards and authored standard operating procedures (SOPs) prior to company-wide system migrations.',
    pillars: [
      {
        title: '01 Automated ETL Pipelines & Turnaround Reduction',
        items: [
          'Engineered custom Python (pandas) and Power Query ETL workflows to ingest, normalize, and cleanse disparate carrier spreadsheets and internal transactional databases.',
          'Reduced monthly financial and policy report turnaround time by 30%, transforming multi-hour manual spreadsheet consolidation into automated one-click scripts.',
          'Eliminated repetitive manual copy-paste routines, drastically minimizing human data entry errors across account portfolios.',
        ],
      },
      {
        title: '02 BI Dashboards & Pre-Migration Data Sanitization',
        items: [
          'Designed interactive Power BI operational dashboards visualizing corporate KPIs, renewal loss ratios, and client engagement trends for executive leadership.',
          'Developed automated deduplication, normalization, and schema validation routines prior to large-scale enterprise database cutovers.',
          'Shadowed cross-departmental operations to identify administrative bottlenecks, subsequently authoring formal Standard Operating Procedures (SOPs).',
        ],
      },
    ],
    impact:
      'Achieved a measurable 30% reduction in report turnaround time and verified 100% data integrity across pre-migration database schemas through rigorous automated Python validation scripts.',
    tools: [
      'Python (pandas)',
      'Power Query',
      'Power BI',
      'SQL',
      'Data Cleansing',
      'Schema Validation',
      'SOP Authoring',
    ],
    relatedLink: {
      text: 'View Data Automation Toolkit',
      url: 'skills.html#data-pipelines',
    },
  },
  {
    id: 'daily-nebraskan-columnist',
    role: 'Opinion Columnist',
    organization: 'The Daily Nebraskan',
    location: 'Lincoln, NE',
    startDate: '2023-08',
    endDate: '2023-12',
    termDescription: 'Fall 2023',
    category: 'editorial',
    statusBadge: 'EDITORIAL_BYLINE',
    overview:
      'Pitched, researched, and published regular editorial columns addressing higher education policy, college athletics, technology, student workforce dynamics, and university culture. Collaborated with student editors to meet rigorous print and digital publishing deadlines.',
    pillars: [
      {
        title: '01 Policy Analysis & Editorial Research',
        items: [
          'Researched and articulated evidence-based perspectives on complex institutional issues, from undergraduate life-skills curricula to congressional term limits and unpaid internship ethics.',
          'Conducted secondary data research and institutional policy comparisons to synthesize nuanced arguments for a campus and statewide readership.',
          'Maintained high journalistic rigor and editorial integrity under tight bi-weekly newsroom deadlines.',
        ],
      },
      {
        title: '02 Newsroom Collaboration & Digital Publishing',
        items: [
          'Partnered with section editors through rigorous copyediting cycles, headline formulation, and stylistic revisions adhering to AP Style.',
          'Optimized published columns for digital search discoverability and campus engagement across web and social channels.',
          'Fostered informed public discourse on civic responsibility, university facilities investments, and student community integration.',
        ],
      },
    ],
    impact:
      'Authored 7 featured editorial columns generating campus-wide dialogue, achieving consistent digital engagement, and upholding strict editorial quality and publication deadlines.',
    tools: [
      'Journalistic Research',
      'AP Style',
      'Editorial Writing',
      'Policy Analysis',
      'Copyediting',
      'Digital Publishing',
    ],
    relatedLink: {
      text: 'Read Published Columns',
      url: '#published-articles',
    },
  },
  {
    id: '1011-news-producer',
    role: 'Technical Media Producer',
    organization: '10/11 News / Gray Television',
    location: 'Lincoln, Nebraska',
    startDate: '2023-11',
    endDate: '2025-06',
    category: 'broadcast',
    statusBadge: '00_DOWNTIME_RECORD',
    overview:
      'Directed live newsroom operations from the Broadcast Control Room (BCR) for Nebraska’s top-rated regional news station, managing split-second pacing, automated studio cameras, and live technical execution under high-pressure newsroom conditions.',
    pillars: [
      {
        title: '01 Live Control Room Pacing & AP ENPS Management',
        items: [
          'Orchestrated split-second rundown pacing and block timing across live morning, evening, and weekend newscasts using AP ENPS newsroom software.',
          'Ensured exact alignment with satellite feeds, live remote reporter hits, and master control commercial automation blocks with zero dead air.',
          'Adjusted broadcast rundowns on the fly alongside executive producers, anchors, and reporters during severe weather warnings and breaking news.',
        ],
      },
      {
        title: '02 Studio Robotics & Technical Quality Control',
        items: [
          'Programmed and operated robotic studio camera pedestals, robotic PTZ cameras, and teleprompter scroll rates live during multi-anchor broadcasts.',
          'Audited and verified on-air chyron lower-thirds, over-the-shoulder (OTS) graphics, rolling B-roll packages, and live audio matrices prior to transmission.',
          'Coordinated master control line-switching to maintain seamless video feeds during live field broadcasts.',
        ],
      },
    ],
    impact:
      'Maintained a flawless 0.0-second broadcast downtime record across hundreds of high-tempo live television newscasts while managing automated robotic cameras and breaking news cut-ins.',
    tools: [
      'AP ENPS',
      'Robotic Studio Cameras',
      'Live Timing Pacing',
      'Teleprompter Systems',
      'Master Control Automation',
      'Chyron Lower Thirds',
    ],
    relatedLink: {
      text: 'Read Broadcast Case Study',
      url: 'about.html#enterprise',
    },
  },
];
