// src/types/experience.ts

export type ExperienceCategory =
  | 'enterprise'
  | 'data-it'
  | 'broadcast'
  | 'leadership'
  | 'editorial';

export interface ExperiencePillar {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  termDescription?: string;
  category: ExperienceCategory;
  statusBadge: string;
  overview: string;
  pillars: ExperiencePillar[];
  impact: string;
  tools: string[];
  relatedLink?: {
    text: string;
    url: string;
  };
}
