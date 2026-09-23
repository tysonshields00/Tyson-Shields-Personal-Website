// src/components/sections/TelemetrySection.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, Badge } from '@/components/ui';

interface TelemetryMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  trend: string;
  description: string;
  tag: string;
}

const TELEMETRY_METRICS: TelemetryMetric[] = [
  {
    id: 'premium-volume',
    label: 'Annualized Premium Evaluated',
    value: '$12.4M',
    trend: '+18% YoY',
    description:
      'Rigorous modeling of self-funded stop loss, level-funded aggregate tiers, and fully insured group benefit renewals.',
    tag: 'FINANCIAL MODELING',
  },
  {
    id: 'audit-accuracy',
    label: 'Data Migration Integrity',
    value: '99.8%',
    unit: 'Clean Rate',
    trend: 'Zero Loss',
    description:
      'Census normalization, EDI 834 carrier feeds, payroll file transformation, and carrier enrollment parity audits.',
    tag: 'SYSTEM COMPLIANCE',
  },
  {
    id: 'plans-modeled',
    label: 'Client Plans Benchmarked',
    value: '85+',
    unit: 'Plans',
    trend: 'Active',
    description:
      'Detailed benefit design teardowns across Medical, Rx formularies, Dental, Vision, Life, and Voluntary coverages.',
    tag: 'PLAN ARCHITECTURE',
  },
  {
    id: 'cycle-compression',
    label: 'Workflow Cycle Compression',
    value: '40%',
    trend: 'Efficiency',
    description:
      'Automated spreadsheet ingestion, RFP rate matrix consolidation, and presentation-ready client deliverable pipelines.',
    tag: 'PROCESS AUTOMATION',
  },
];

export const TelemetrySection: React.FC = () => {
  return (
    <section
      id="telemetry"
      aria-labelledby="telemetry-heading"
      className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950/60 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              01 // OPERATIONAL TELEMETRY &amp; METRICS
            </div>
            <h2
              id="telemetry-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Measured Operational Impact.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-mono">
            Quantified deliverables across group insurance underwriting prep, carrier negotiations, and workflow automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TELEMETRY_METRICS.map((metric) => (
            <Card key={metric.id} hover glow className="border-slate-800/80 bg-slate-900/50">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="cyan" size="sm">
                  {metric.tag}
                </Badge>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {metric.trend}
                </span>
              </div>
              <CardHeader className="p-0 mb-3">
                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1">
                  <span>{metric.value}</span>
                  {metric.unit && <span className="text-xs font-normal text-slate-400 font-sans">{metric.unit}</span>}
                </div>
                <CardTitle className="text-sm font-semibold text-slate-200 mt-2">
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-xs text-slate-400 leading-relaxed">
                {metric.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TelemetrySection;
