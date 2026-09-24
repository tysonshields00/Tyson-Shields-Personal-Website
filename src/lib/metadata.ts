// src/lib/metadata.ts

import { CONTACT_CONFIG } from '@/data/socials';
import { Credential } from '@/types/credentials';
import { Article } from '@/types/articles';

/**
 * Generates Google-compliant Person JSON-LD schema.
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${CONTACT_CONFIG.website}#person`,
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
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'professional inquiries',
      email: CONTACT_CONFIG.email,
      availableLanguage: ['en'],
    },
  };
}

/**
 * Generates EducationalOccupationalCredential schemas for verified state licenses.
 */
export function generateCredentialsSchema(credentials: Credential[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': credentials.map((cred) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cred.title,
      credentialCategory: cred.category,
      recognizedBy: {
        '@type': 'Organization',
        name: cred.issuer,
      },
      ...(cred.credentialId ? { identifier: cred.credentialId } : {}),
      ...(cred.verificationUrl ? { url: cred.verificationUrl } : {}),
    })),
  };
}

/**
 * Generates OpinionNewsArticle schemas for published editorial columns.
 */
export function generateArticlesSchema(articles: Article[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': articles.map((article) => ({
      '@type': 'OpinionNewsArticle',
      '@id': article.url,
      url: article.url,
      headline: article.title,
      description: article.summary,
      inLanguage: 'en-US',
      genre: 'Opinion Column',
      articleSection: article.category,
      author: {
        '@type': 'Person',
        name: CONTACT_CONFIG.name,
        url: CONTACT_CONFIG.website,
      },
      publisher: {
        '@type': 'NewsMediaOrganization',
        name: article.publication,
      },
      isPartOf: {
        '@type': 'Periodical',
        name: article.publication,
      },
    })),
  };
}
