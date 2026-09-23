// src/data/socials.ts

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

export interface ContactConfig {
  name: string;
  title: string;
  email: string;
  website: string;
  location: {
    city: string;
    state: string;
    country: string;
    formatted: string;
  };
  socials: SocialLink[];
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'website',
    platform: 'website',
    label: 'Personal Website',
    href: 'https://tysonshields.com/',
    handle: 'tysonshields.com',
    icon: 'globe',
    category: 'primary',
    isExternal: false,
    description: 'Personal portfolio, engineering artifacts, and professional dossier.',
  },
  {
    id: 'email',
    platform: 'email',
    label: 'Email Dispatch',
    href: 'mailto:tysonshields00@gmail.com',
    handle: 'tysonshields00@gmail.com',
    icon: 'mail',
    category: 'primary',
    isExternal: false,
    description: 'Direct inquiries, consulting requests, and professional outreach.',
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tysonshields/',
    handle: 'in/tysonshields',
    icon: 'linkedin',
    category: 'social',
    rel: 'noopener noreferrer me',
    isExternal: true,
    description: 'Professional background, industry recommendations, and career milestones.',
  },
  {
    id: 'github',
    platform: 'github',
    label: 'GitHub',
    href: 'https://github.com/tysonshields00',
    handle: '@tysonshields00',
    icon: 'github',
    category: 'code',
    rel: 'noopener noreferrer me',
    isExternal: true,
    description: 'Open-source code repositories, web projects, and automation scripts.',
  },
  {
    id: 'instagram',
    platform: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/tshields2000/?hl=en',
    handle: '@tshields2000',
    icon: 'instagram',
    category: 'social',
    rel: 'noopener noreferrer me',
    isExternal: true,
    description: 'Personal updates, photography, and collegiate life.',
  },
];

export const CONTACT_CONFIG: ContactConfig = {
  name: 'Tyson Shields',
  title: 'Employee Benefits Business Analyst & Health Operations Specialist',
  email: 'tysonshields00@gmail.com',
  website: 'https://tysonshields.com/',
  location: {
    city: 'Lincoln',
    state: 'Nebraska',
    country: 'United States',
    formatted: 'Lincoln, Nebraska / Available for hybrid or remote work',
  },
  socials: SOCIAL_LINKS,
};

/**
 * Returns a complete JSON-LD Person schema definition
 * suitable for Next.js Metadata or inline script injection.
 */
export const getPersonJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://tysonshields.com/#person',
  name: CONTACT_CONFIG.name,
  url: CONTACT_CONFIG.website,
  email: `mailto:${CONTACT_CONFIG.email}`,
  jobTitle: CONTACT_CONFIG.title,
  worksFor: {
    '@type': 'Organization',
    name: 'UNICO Group',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: CONTACT_CONFIG.location.city,
    addressRegion: CONTACT_CONFIG.location.state,
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.linkedin.com/in/tysonshields/',
    'https://github.com/tysonshields00',
    'https://www.instagram.com/tshields2000/?hl=en',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'professional inquiries',
    email: CONTACT_CONFIG.email,
    availableLanguage: ['en'],
  },
});
