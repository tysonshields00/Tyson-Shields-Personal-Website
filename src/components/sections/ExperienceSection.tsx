// src/components/sections/ExperienceSection.tsx
'use client';

import React, { useState } from 'react';
import { EXPERIENCE_DATA } from '@/data/experience';
import { ExperienceCategory } from '@/types/experience';
import { Badge, Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

export const ExperienceSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { key: 'all', label: '// ALL DEPLOYMENTS' },
    { key: 'enterprise', label: '// ENTERPRISE & BENEFITS' },
    { key: 'data-it', label: '// DATA AUTOMATION & IT' },
    { key: 'editorial', label: '// EDITORIAL & RESEARCH' },
    { key: 'broadcast', label: '// BROADCAST & MEDIA' },
  ];

  const filteredExperience = EXPERIENCE_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section
      id="career-timeline"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-b border-slate-800/80"
      aria-labelledby="timeline-title"
    >
      <div className="mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          02 // FLIGHT LOG &amp; OPERATIONAL CHRONOLOGY
        </div>
        <h2 id="timeline-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Career Milestones &amp; Professional Scope.
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Chronological record of corporate benefits analysis, systems engineering, published journalism, and live broadcast production.
        </p>
      </div>

      {/* Filter Nav */}
      <nav
        aria-label="Filter timeline by sector"
        className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800"
      >
        {filterOptions.map((opt) => {
          const count =
            opt.key === 'all'
              ? EXPERIENCE_DATA.length
              : EXPERIENCE_DATA.filter((i) => i.category === opt.key).length;
          const isActive = activeFilter === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => setActiveFilter(opt.key)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Timeline Stream */}
      <div className="relative border-l border-slate-800/80 ml-3 md:ml-6 pl-6 md:pl-10 space-y-12">
        {filteredExperience.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline node marker */}
            <div
              className={`absolute -left-[31px] md:-left-[47px] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all ${
                item.highlight
                  ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  : 'bg-slate-900 border-slate-600 group-hover:border-cyan-400'
              }`}
              aria-hidden="true"
            />

            <Card
              hover
              glow={item.highlight}
              className={`border-slate-800/80 bg-slate-900/40 p-6 md:p-8 ${
                item.highlight ? 'border-cyan-500/40 bg-slate-900/70' : ''
              }`}
            >
              {/* Header meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={item.highlight ? 'cyan' : 'default'} size="sm">
                    {item.term}
                  </Badge>
                  <span className="font-mono text-xs text-slate-400">
                    {item.organization} // {item.location}
                  </span>
                </div>
                {item.pillar && (
                  <span className="font-mono text-[11px] text-cyan-400/90 tracking-wide uppercase">
                    [{item.pillar}]
                  </span>
                )}
              </div>

              {/* Title */}
              <CardTitle className="text-xl md:text-2xl font-bold text-white mb-3">
                {item.role}
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                {item.description}
              </CardDescription>

              {/* Core Deliverables / Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="mb-6 space-y-2 bg-slate-950/40 p-4 rounded-lg border border-slate-800/60">
                  <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2">
                    Key Deliverables &amp; Outcomes:
                  </div>
                  <ul className="space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                        <span className="text-cyan-400 mt-1">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Footer */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-800/60">
                  <span className="font-mono text-xs text-slate-500 mr-2">Core Tech:</span>
                  {item.skills.map((skill) => (
                    <Badge key={skill} variant="default" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
