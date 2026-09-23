// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { generatePersonSchema } from '@/lib/metadata';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tysonshields.com'),
  title: {
    default: 'Tyson Shields | Employee Benefits Business Analyst & Systems Specialist',
    template: '%s | Tyson Shields',
  },
  description:
    'Licensed Life & Health Producer and Business Analyst specializing in employee benefits administration, plan performance modeling, renewal workflow optimization, and data migration integrity.',
  keywords: [
    'Tyson Shields',
    'Employee Benefits Business Analyst',
    'Insurance Producer',
    'Health Insurance Analyst',
    'Plan Modeling',
    'Renewal Analytics',
    'Benefits Broker Analyst',
    'Data Migration',
  ],
  authors: [{ name: 'Tyson Shields', url: 'https://tysonshields.com' }],
  creator: 'Tyson Shields',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tysonshields.com',
    siteName: 'Tyson Shields Portfolio',
    title: 'Tyson Shields | Employee Benefits Business Analyst',
    description:
      'Precision benefits modeling, financial renewal analysis, and workflow automation by licensed producer Tyson Shields.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tyson Shields - Employee Benefits Business Analyst',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tyson Shields | Employee Benefits Business Analyst',
    description:
      'Precision benefits modeling, financial renewal analysis, and workflow automation by licensed producer Tyson Shields.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = generatePersonSchema();

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@500;600;700;800&family=Newsreader:ital,opsz,wght@1,6..72,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
