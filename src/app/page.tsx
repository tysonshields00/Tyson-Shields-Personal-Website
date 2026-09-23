// src/app/page.tsx
import React from 'react';
import {
  HeroSection,
  TelemetrySection,
  ExperienceSection,
  CertificationsSection,
  ArticlesSection,
} from '@/components/sections';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <TelemetrySection />
      <ExperienceSection />
      <CertificationsSection />
      <ArticlesSection />
    </div>
  );
}
