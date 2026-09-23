import { Credential, CredentialCategory } from '@/types/credentials';

export type { Credential, CredentialCategory };

export const CREDENTIAL_CATEGORIES: CredentialCategory[] = [
  'Licenses',
  'Business Analysis',
  'Data Analytics',
  'Python & Systems',
  'SEO & Marketing',
];

export const credentialsData: Credential[] = [
  // ==========================================
  // 1. Formal State & Safety Licenses (High Priority)
  // ==========================================
  {
    id: 'ne-insurance-producer',
    title: 'Insurance Producer (Accident and Health or Sickness, Life)',
    issuer: 'State of Nebraska Department of Insurance',
    issueDate: 'Aug 2025',
    expiryDate: 'Mar 2028',
    credentialId: '21707104',
    category: 'Licenses',
    featured: true,
    description:
      'Active regulatory authority to advise, negotiate, and solicit Accident, Health, Sickness, and Life insurance policies in Nebraska.',
    verificationUrl: 'https://doi.nebraska.gov/',
  },
  {
    id: 'nsc-first-aid-cpr-aed',
    title: 'Adult First Aid/CPR/AED',
    issuer: 'National Safety Council',
    issueDate: 'Jun 2026',
    expiryDate: 'Jun 2028',
    credentialId: '568275385A7EAF',
    category: 'Licenses',
    featured: true,
    description:
      'Comprehensive emergency response certification covering adult CPR, AED deployment, and workplace first aid intervention.',
    verificationUrl: 'https://www.nsc.org/',
  },

  // ==========================================
  // 2. Comprehensive Professional Track
  // ==========================================
  {
    id: 'career-essentials-business-analysis',
    title: 'Career Essentials in Business Analysis by Microsoft and LinkedIn',
    issuer: 'Microsoft / LinkedIn',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
    featured: true,
    description:
      'Professional track certification covering elicitation, process modeling, enterprise data architecture, and stakeholder alignment.',
  },

  // ==========================================
  // 3. Business Analysis & AI
  // ==========================================
  {
    id: 'intro-business-analysis',
    title: 'Introduction to Business Analysis',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
  },
  {
    id: 'ba-essential-tools-techniques',
    title: 'Business Analysis: Essential Tools and Techniques',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
  },
  {
    id: 'ba-foundations-process-modeling',
    title: 'Business Analysis Foundations: Business Process Modeling',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
  },
  {
    id: 'business-benefits-realization',
    title: 'Business Benefits Realization Foundations',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
  },
  {
    id: 'role-ba-in-data-analytics',
    title: 'The Role of Business Analysis in Data Analytics',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
  },
  {
    id: 'gen-ai-for-business-analysts',
    title: 'Generative AI for Business Analysts',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
  },
  {
    id: 'agentic-ai-business-analysis',
    title: 'Agentic AI for Business Analysis',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
  },
  {
    id: 'modern-pm-microsoft-365',
    title: 'Modern Project Management in Microsoft 365',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Business Analysis',
  },

  // ==========================================
  // 4. Data Analytics
  // ==========================================
  {
    id: 'career-skills-data-analytics',
    title: 'Introduction to Career Skills in Data Analytics',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Data Analytics',
  },
  {
    id: 'learning-data-analytics-1',
    title: 'Learning Data Analytics: 1 Foundations',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Data Analytics',
  },
  {
    id: 'learning-data-analytics-2',
    title: 'Learning Data Analytics Part 2: Extending and Applying Core Knowledge',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Data Analytics',
  },
  {
    id: 'data-analytics-business-pros',
    title: 'Data Analytics for Business Professionals',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Data Analytics',
  },
  {
    id: 'data-viz-for-analysts',
    title: 'Data Visualization for Data Analysts and Analytics',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Data Analytics',
  },
  {
    id: 'managing-data-m365',
    title: 'Managing Data with Microsoft 365',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Data Analytics',
  },

  // ==========================================
  // 5. Python & Systems
  // ==========================================
  {
    id: 'python-essential-training',
    title: 'Python Essential Training',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Python & Systems',
  },
  {
    id: 'python-oop',
    title: 'Python Object-Oriented Programming',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Python & Systems',
  },
  {
    id: 'level-up-python',
    title: 'Level Up: Python',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'Python & Systems',
  },
  {
    id: 'networking-admin-fundamentals',
    title: 'Networking and Administration Fundamentals',
    issuer: 'LinkedIn Learning',
    issueDate: 'Jul 2026',
    category: 'Python & Systems',
  },

  // ==========================================
  // 6. SEO & Digital Strategy
  // ==========================================
  {
    id: 'seo-foundations',
    title: 'SEO Foundations',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'SEO & Marketing',
  },
  {
    id: 'technical-seo',
    title: 'Technical SEO',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'SEO & Marketing',
  },
  {
    id: 'marketing-seo-content-writing',
    title: 'Marketing Strategy: SEO Content Writing',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'SEO & Marketing',
  },
  {
    id: 'learning-youtube-seo',
    title: 'Learning YouTube SEO',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'SEO & Marketing',
  },
  {
    id: 'ai-as-seo-assistant',
    title: 'Using AI as Your SEO Assistant',
    issuer: 'LinkedIn Learning',
    issueDate: 'Apr 2026',
    category: 'SEO & Marketing',
  },
  {
    id: 'develop-your-seo-skills',
    title: 'Develop Your SEO Skills',
    issuer: 'LinkedIn Learning',
    issueDate: 'Jul 2026',
    category: 'SEO & Marketing',
  },
];
