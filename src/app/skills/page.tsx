// src/app/skills/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Badge, Card, CardHeader, CardTitle, CardDescription, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Competencies & Technical Toolkit',
  description:
    'Core technical capabilities across Employee Benefits Analysis, Financial Plan Modeling, Automation, and Systems Architecture.',
};

interface SkillDomain {
  category: string;
  code: string;
  description: string;
  items: string[];
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    category: 'Employee Benefits & Plan Design',
    code: '01 // UNDERWRITING & ANALYTICS',
    description:
      'Plan financial modeling, contribution matrix strategy, carrier RFP negotiations, and renewal deck synthesis.',
    items: [
      'Self-Funded Stop-Loss Modeling',
      'Fully Insured Rate Renewal Analysis',
      'Level-Funded Aggregation Tiers',
      'Medical & Rx Formulary Review',
      'Voluntary & Ancillary Lines (Life, LTD/STD)',
      'HSA / HRA / FSA Design Rules',
      'ACA Compliance & Form 1095-C Audit',
      'Carrier Negotiations & RFP Benchmarking',
    ],
  },
  {
    category: 'Data Systems & Automation',
    code: '02 // INTEGRITY & PIPELINES',
    description:
      'Census normalization, EDI data parity, payroll-to-carrier automation, and reporting pipeline optimization.',
    items: [
      'EDI 834 Benefit Enrollment Feeds',
      'High-Volume Census Normalization',
      'Carrier Billing Reconciliation',
      'SQL / BigQuery Analytics',
      'Python Data Processing & Automation',
      'Power BI / Tableau Executive Dashboards',
      'Advanced Excel (Power Query, XLOOKUP, Modeling)',
      'Workflow Automation (Zapier, Power Automate)',
    ],
  },
  {
    category: 'Operational Systems & IT Engineering',
    code: '03 // INFRASTRUCTURE & MEDIA',
    description:
      'Enterprise cloud platforms, broadcast infrastructure, multi-channel media production, and networking.',
    items: [
      'Enterprise CRM & Benefit Administration Platforms',
      'Active Directory & Identity Management',
      'SMPTE 2110 / NDI IP Video Infrastructure',
      'Live Television Production Routing',
      'Next.js / TypeScript / React Engineering',
      'Git Version Control & CI/CD Pipelines',
      'DNS, CDN & SSL Security Configurations',
      'Production Audio Mixing & Dante Audio Networking',
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 max-w-3xl">
        <Badge variant="cyan" size="md" className="mb-3">
          MATRIX // TECHNICAL COMPETENCIES
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Core Domains &amp; Technical Capabilities.
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Integrated capabilities across health &amp; welfare underwriting modeling, carrier enrollment pipeline engineering,
          and software/broadcast systems automation.
        </p>
      </div>

      {/* Domain Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {SKILL_DOMAINS.map((domain) => (
          <Card key={domain.category} hover glow className="flex flex-col justify-between p-6 bg-slate-900/50">
            <div>
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2">
                {domain.code}
              </div>
              <CardHeader className="p-0 mb-3">
                <CardTitle className="text-xl text-white font-bold leading-snug">
                  {domain.category}
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-xs text-slate-400 mb-6 leading-relaxed">
                {domain.description}
              </CardDescription>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-3">
                Specific Competencies:
              </div>
              <ul className="space-y-2">
                {domain.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <span className="text-cyan-400">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <Button href="/career" variant="secondary">
          ← Career Chronology
        </Button>
        <Button href="/contact" variant="primary">
          Contact Tyson →
        </Button>
      </div>
    </div>
  );
}
