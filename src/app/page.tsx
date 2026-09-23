// src/app/page.tsx
import React from 'react';
import {
  HeroSection,
  TelemetrySection,
  ExperienceSection,
  ArticlesSection,
} from '@/components/sections';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <TelemetrySection />
      <ExperienceSection />

      {/* Certifications Spotlight Banner */}
      <section className="py-16 border-b border-slate-800/80 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                03 // VERIFIED CREDENTIALS &amp; LICENSES
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Nebraska State Insurance Producer &amp; 24+ Professional Specializations.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Active statutory authority (Life &amp; Health #21707104) and specialized coursework in Business Analysis, Data Pipelines, and Systems Architecture are organized into a dedicated interactive tab under Competencies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Button href="/skills#certifications" variant="primary" size="lg">
                View Certifications Tab ↗
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ArticlesSection />
    </div>
  );
}
