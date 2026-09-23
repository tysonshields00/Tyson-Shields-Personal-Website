// src/app/career/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { ExperienceSection } from '@/components/sections';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Career & Operational Chronology',
  description:
    'Full operational history of Tyson Shields across Employee Benefits Consulting, Operations, Journalism, and Broadcast Engineering.',
};

export default function CareerPage() {
  return (
    <div className="pt-24 pb-20">
      <ExperienceSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 flex justify-between items-center">
        <Button href="/" variant="secondary">
          ← Back to Overview
        </Button>
        <Button href="/skills" variant="primary">
          View Core Competencies →
        </Button>
      </div>
    </div>
  );
}
