// src/types/socials.ts

export type SocialPlatform =
  | 'website'
  | 'email'
  | 'github'
  | 'linkedin'
  | 'instagram';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  href: string;
  handle: string;
  icon: 'globe' | 'mail' | 'github' | 'linkedin' | 'instagram';
  category: 'primary' | 'social' | 'code';
  rel?: string;
  description?: string;
  isExternal: boolean;
}

export interface ContactLocation {
  city: string;
  state: string;
  country: string;
  formatted: string;
}

export interface ContactConfig {
  name: string;
  title: string;
  email: string;
  website: string;
  location: ContactLocation;
  socials: SocialLink[];
}
