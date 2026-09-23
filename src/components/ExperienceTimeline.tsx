// src/components/ExperienceTimeline.tsx
'use client';

import React, { useState } from 'react';
import { EXPERIENCE_DATA } from '@/data/experience';
import { ExperienceItem } from '@/types/experience';

export const ExperienceTimeline: React.FC = () => {
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
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      aria-labelledby="timeline-title"
    >
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-widest mb-2">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
          02 // FLIGHT LOG &amp; OPERATIONAL CHRONOLOGY
        </div>
        <h2 id="timeline-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Career Milestones &amp;{' '}
          <span className="font-serif italic font-normal text-sky-300">
            Professional Scope.
          </span>
        </h2>
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
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm shadow-sky-500/20'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{opt.label}</span>
              <span className="text-[10px] text-slate-400">({count})</span>
            </button>
          );
        })}
      </nav>

      {/* Timeline Entries */}
      <div className="space-y-12">
        {filteredExperience.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md hover:border-slate-700 transition-colors"
          >
            {/* Left Column: Date & Location */}
            <div className="lg:col-span-3 text-xs font-mono text-slate-400 space-y-1">
              <div className="text-sm font-semibold text-sky-400">
                {item.termDescription ? item.termDescription : `${item.startDate} — ${item.endDate}`}
              </div>
              <div>{item.location}</div>
            </div>

            {/* Right Column: Role Details */}
            <div className="lg:col-span-9 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-mono text-sky-400 tracking-wider uppercase">
                  {item.organization}
                </p>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-slate-800 text-sky-300 border border-slate-700">
                  {item.statusBadge}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                {item.role}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.overview}
              </p>

              {/* Pillars Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40 space-y-2.5"
                  >
                    <div className="text-xs font-mono font-semibold text-slate-200">
                      {pillar.title}
                    </div>
                    <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                      {pillar.items.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Impact Box */}
              <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-950/10 text-xs text-slate-300 leading-relaxed">
                <strong className="block text-sky-400 font-mono text-[11px] uppercase mb-1">
                  Key Deliverable &amp; Editorial Impact
                </strong>
                {item.impact}
              </div>

              {/* Tools & Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                {item.relatedLink && (
                  <a
                    href={item.relatedLink.url}
                    className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    {item.relatedLink.text} <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
