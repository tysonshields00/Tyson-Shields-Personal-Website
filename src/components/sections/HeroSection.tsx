// src/components/sections/HeroSection.tsx
'use client';

import React from 'react';
import { SOCIAL_LINKS, CONTACT_CONFIG } from '@/data/socials';
import { Button, Badge } from '@/components/ui';

export interface HeroSectionProps {
  showAvailabilityBadge?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ showAvailabilityBadge = true }) => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow / Status */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="cyan" size="md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              EMPLOYEE BENEFITS // BUSINESS ANALYST
            </Badge>

            {showAvailabilityBadge && (
              <Badge variant="emerald" size="md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                NE LICENSED PRODUCER #21707104
              </Badge>
            )}
          </div>

          {/* Headline */}
          <h1
            id="hero-title"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            Engineering precision into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              group benefits administration
            </span>{' '}
            and plan analytics.
          </h1>

          {/* Subtitle / Value proposition */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl">
            Bridging operational workflows, renewal financial modeling, and system data integrity.
            Licensed Life &amp; Health Producer specializing in self-funded and fully insured plan
            evaluations, business process automation, and broker-carrier data synchronization.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              href="#certifications"
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              Verify Credentials
            </Button>

            <Button
              href="/career"
              variant="secondary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
              iconPosition="right"
            >
              Career Milestones
            </Button>

            <Button
              href={`mailto:${CONTACT_CONFIG.email}`}
              variant="terminal"
              size="lg"
            >
              Direct Dispatch // Email
            </Button>
          </div>

          {/* Quick social relays */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/80 text-sm text-slate-400">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
              Connected Networks:
            </span>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="hover:text-cyan-400 transition-colors font-mono text-xs flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                <span className="text-slate-600">({link.username})</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
