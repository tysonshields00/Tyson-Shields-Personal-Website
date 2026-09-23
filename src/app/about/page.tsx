// src/app/about/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Badge, Card, CardHeader, CardTitle, CardDescription, Button } from '@/components/ui';
import { CONTACT_CONFIG } from '@/data/socials';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Background and professional profile of Tyson Shields — Employee Benefits Business Analyst, Insurance Producer, and Systems Specialist.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <Badge variant="cyan" size="md" className="mb-3">
          PROFILE // EXECUTIVE DOSSIER
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Tyson Shields
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed font-sans max-w-3xl">
          Business Analyst and licensed Life &amp; Health Producer specializing in corporate group benefits,
          plan underwriting analytics, workflow automation, and broadcast systems engineering.
        </p>
      </div>

      {/* Grid of narrative blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card hover className="bg-slate-900/60 border-slate-800 p-6">
          <CardHeader className="p-0 mb-4">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-1">
              FOCUS 01 // EMPLOYEE BENEFITS
            </div>
            <CardTitle className="text-xl text-white">Benefits Architecture &amp; Analytics</CardTitle>
          </CardHeader>
          <CardDescription className="text-slate-300 text-sm leading-relaxed space-y-3">
            <span>
              Extensive focus on corporate health and welfare programs, evaluating fully insured and self-funded
              benefit options across medical, dental, vision, life, disability, and voluntary offerings.
            </span>
            <span className="block mt-2">
              Spearheading renewal workflow compression, plan design benchmarking, claim trend analysis, and
              rate-table consolidation for seamless employer executive presentations.
            </span>
          </CardDescription>
        </Card>

        <Card hover className="bg-slate-900/60 border-slate-800 p-6">
          <CardHeader className="p-0 mb-4">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-1">
              FOCUS 02 // SYSTEMS &amp; INTEGRITY
            </div>
            <CardTitle className="text-xl text-white">Data Engineering &amp; EDI Feeds</CardTitle>
          </CardHeader>
          <CardDescription className="text-slate-300 text-sm leading-relaxed space-y-3">
            <span>
              Specialist in data transformation, payroll system cross-checks, carrier enrollment file parity,
              and 834 EDI feed configuration.
            </span>
            <span className="block mt-2">
              Ensuring 100% audit accuracy across high-volume census records, preventing billing leakage and coverage
              discrepancies between employers and carrier networks.
            </span>
          </CardDescription>
        </Card>
      </div>

      {/* Education & Licensing Highlights */}
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 mb-12 font-mono text-xs text-slate-300 space-y-4">
        <div className="text-cyan-400 font-bold uppercase tracking-wider text-sm">
          // ACADEMIC &amp; STATUTORY CREDENTIALS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-950/60 rounded border border-slate-800/80">
            <div className="text-slate-500 uppercase text-[10px]">Education</div>
            <div className="text-white font-sans font-semibold text-sm mt-1">University of Nebraska-Lincoln</div>
            <div className="text-slate-400 text-xs mt-0.5">Bachelor of Journalism (Dec 2023)</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded border border-slate-800/80">
            <div className="text-slate-500 uppercase text-[10px]">Statutory License</div>
            <div className="text-white font-sans font-semibold text-sm mt-1">Life &amp; Health Producer</div>
            <div className="text-slate-400 text-xs mt-0.5">State of Nebraska #21707104</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded border border-slate-800/80">
            <div className="text-slate-500 uppercase text-[10px]">Location</div>
            <div className="text-white font-sans font-semibold text-sm mt-1">{CONTACT_CONFIG.location.formatted}</div>
            <div className="text-slate-400 text-xs mt-0.5">{CONTACT_CONFIG.location.country}</div>
          </div>
        </div>
      </div>

      {/* Back to Home / Contact CTA */}
      <div className="flex items-center gap-4">
        <Button href="/" variant="secondary">
          ← Back to Overview
        </Button>
        <Button href="/contact" variant="primary">
          Connect With Tyson →
        </Button>
      </div>
    </div>
  );
}
