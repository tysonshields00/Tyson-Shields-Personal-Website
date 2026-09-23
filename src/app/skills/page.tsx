// src/app/skills/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Badge, Card, CardHeader, CardTitle, CardDescription, Button } from '@/components/ui';
import { CertificationsSection } from '@/components/sections/CertificationsSection';

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
  const [activeTab, setActiveTab] = useState<'competencies' | 'certifications'>('competencies');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#certifications') {
      setActiveTab('certifications');
    }
  }, []);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 max-w-3xl">
        <Badge variant="cyan" size="md" className="mb-3">
          MATRIX // TECHNICAL COMPETENCIES &amp; CREDENTIALS
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Core Domains &amp; Verified Authority.
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Integrated capabilities across health &amp; welfare underwriting modeling, carrier enrollment pipeline engineering,
          and statutory state insurance licensing.
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div
        className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-10"
        role="tablist"
        aria-label="Skills & Certifications Tabs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'competencies'}
          onClick={() => setActiveTab('competencies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all ${
            activeTab === 'competencies'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <span>// CORE COMPETENCY DOMAINS</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">3 Domains</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'certifications'}
          onClick={() => setActiveTab('certifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all ${
            activeTab === 'certifications'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <span>// CERTIFICATIONS &amp; CREDENTIALS</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">26 Total</span>
        </button>
      </div>

      {/* Tab 1: Technical Competency Domains */}
      {activeTab === 'competencies' && (
        <div>
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

          {/* Quick link banner to switch to certifications */}
          <div className="p-6 rounded-xl border border-cyan-500/30 bg-cyan-950/20 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-1">
                Verified Regulatory Licenses &amp; Education
              </div>
              <div className="text-white font-bold text-base">
                Looking for statutory state licenses and professional coursework?
              </div>
              <div className="text-slate-400 text-xs mt-1">
                Nebraska Insurance Producer License #21707104, CPR/AED, and 24+ professional coursework tracks.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('certifications')}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-colors shrink-0"
            >
              Switch to Certifications Tab →
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Certifications & Credentials */}
      {activeTab === 'certifications' && (
        <div id="certifications" className="mb-12">
          <CertificationsSection />
        </div>
      )}

      {/* Navigation Footer */}
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
