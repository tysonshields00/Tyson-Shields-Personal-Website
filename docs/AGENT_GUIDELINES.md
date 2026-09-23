# AGENT & DEVELOPER ARCHITECTURAL GUIDELINES

> **Target Audience:** Future AI Agents (Antigravity, Claude, ChatGPT, Cursor) and Software Engineers contributing to `tysonshields.com`.
> **Last Updated:** September 2026
> **Version:** 2.0.0
> **System Architecture:** Dual Static-Site Generator (Eleventy / esbuild) & Modular Next.js 14+ App Router (TypeScript & Tailwind CSS).

---

## 1. Executive Codebase Overview

This repository powers **tysonshields.com**, the professional portfolio of **Tyson Shields**—Business Analyst specializing in Employee Benefits, licensed Life & Health Insurance Producer (State of Nebraska #21707104), and systems technologist.

The codebase is engineered with a **dual architectural structure**:
1. **Production Static Delivery (Root):** High-speed, zero-JS-dependent static pages (`index.html`, `career.html`, `about.html`, `skills.html`, `contact.html`) served with minified CSS (`styles.min.css`) and vanilla progressive enhancement (`scripts/core.js`).
2. **Modular Next.js / TypeScript App Engine (`src/`):** Strongly typed, component-driven architecture using React, Next.js App Router (`src/app/`), atomic design tokens, centralized data layers (`src/data/`), domain models (`src/types/`), and path aliases (`@/*`).

---

## 2. Directory Reorganization Blueprint

### Before (Accumulated Legacy State)
```text
Tyson-Shields-Personal-Website/
├── .eleventy.js
├── package.json
├── styles.css
├── styles.min.css
├── script.js                         <-- Monolithic, scattered logic
├── index.html, career.html, ...      <-- Hardcoded content, outdated links
├── src/
│   ├── components/
│   │   ├── Certifications.tsx        <-- Scattered in root of components/
│   │   ├── ArticlesSection.tsx       <-- Relative imports: '../data/articles'
│   │   ├── ExperienceTimeline.tsx    <-- Loose types
│   │   ├── SocialLinks.tsx           <-- Relative imports: '../data/socials'
│   │   └── ui/
│   │       └── Badge.tsx
│   ├── data/
│   │   ├── credentials.ts
│   │   ├── articles.ts
│   │   ├── experience.ts
│   │   └── socials.ts
│   └── (Missing centralized types, lib helpers, app routes, layout modules)
```

### After (Modular Clean Architecture)
```text
Tyson-Shields-Personal-Website/
├── public/                           <-- Static assets, favicons, OG images, PDFs
│   ├── android-chrome-*.png
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── headshot.jpg
│   ├── og-image.png
│   ├── site.webmanifest
│   └── Tyson-Shields-Resume.pdf
├── src/
│   ├── app/                          <-- Next.js 14+ App Router
│   │   ├── globals.css               <-- Tailwind directives & design tokens
│   │   ├── layout.tsx                <-- Root layout, metadata, JSON-LD injection
│   │   ├── page.tsx                  <-- Modular Home page
│   │   ├── about/page.tsx            <-- Dedicated About route
│   │   ├── career/page.tsx           <-- Dedicated Career route
│   │   ├── skills/page.tsx           <-- Technical Competencies route
│   │   └── contact/page.tsx          <-- Direct Comms & Relays route
│   ├── components/
│   │   ├── index.ts                  <-- Root barrel export
│   │   ├── ui/                       <-- Atomic, reusable UI primitives
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   └── index.ts
│   │   ├── sections/                 <-- Composable domain sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TelemetrySection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   ├── ArticlesSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   └── index.ts
│   │   └── layout/                   <-- Global navigation and structure
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Navigation.tsx
│   │       └── index.ts
│   ├── data/                         <-- Single source of truth for all records
│   │   ├── articles.ts               <-- Published opinion columns & news
│   │   ├── credentials.ts            <-- Licenses & professional certifications
│   │   ├── experience.ts             <-- Career timeline & operational highlights
│   │   └── socials.ts                <-- Canonical profiles & contact relays
│   ├── lib/                          <-- Utilities & schema generators
│   │   ├── metadata.ts               <-- Structured JSON-LD metadata builders
│   │   └── utils.ts                  <-- Tailwind merge (cn), formatting, clipboard
│   └── types/                        <-- Shared TypeScript domain contracts
│       ├── articles.ts
│       ├── credentials.ts
│       ├── experience.ts
│       ├── socials.ts
│       └── index.ts
├── tailwind.config.ts                <-- Shared styling tokens & color palettes
├── tsconfig.json                     <-- Strict TS compiler with @/* path aliases
├── AGENT_GUIDELINES.md               <-- This reference document
└── package.json                      <-- Build and development scripts
```

---

## 3. Path Aliases & Import Conventions

The project enforces TypeScript path aliases configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Import Rules:
* **ALWAYS** use `@/components/ui`, `@/components/sections`, or `@/components/layout` instead of relative traversal (`../../components/...`).
* **ALWAYS** import shared types from `@/types` or `@/types/<domain>`.
* **ALWAYS** import centralized datasets from `@/data/<domain>`.
* **ALWAYS** import utility functions (`cn`, formatting) from `@/lib/utils`.
* **NEVER** use wildcard relative paths like `../../data/experience`.

---

## 4. How to Add New Content Without Modifying Component Templates

Content is strictly separated from presentation logic. Whenever new career milestones, credentials, or articles are published, update only the corresponding data file in `src/data/`.

### 4.1 Adding a New Credential
Edit `src/data/credentials.ts`:
```typescript
import { Credential } from '@/types/credentials';

// Append to credentialsData array:
{
  id: 'unique-slug',
  title: 'Advanced Stop-Loss Underwriting Certification',
  issuer: 'International Foundation of Employee Benefit Plans (IFEBP)',
  category: 'Business & Management', // 'Licenses' | 'Business & Management' | 'IT, Cloud & Systems' | 'Data & Technical Tools'
  issueDate: 'Oct 2026',
  expirationDate: 'Oct 2029',        // Optional
  credentialId: 'ABC-12345678',       // Optional
  verificationUrl: 'https://...',     // Optional
  skills: ['Stop-Loss Modeling', 'Underwriting Analytics'],
}
```

### 4.2 Adding a New Published Article
Edit `src/data/articles.ts`:
```typescript
import { Article } from '@/types/articles';

// Append to ARTICLES_DATA array:
{
  id: 'article-unique-id',
  title: 'Analyzing High-Cost Claim Volatility in Higher Ed Risk Pools',
  url: 'https://www.dailynebraskan.com/...',
  category: 'Higher Ed & Policy', // 'Campus Life' | 'Higher Ed & Policy' | 'Culture & Society' | 'Work & Academics'
  summary: 'In-depth analysis of university healthcare risk pools and stop-loss aggregation.',
  readingTime: '5 min read',
  publishedDate: '2023-11-20',
  formattedDate: 'Nov 20, 2023',
}
```

### 4.3 Adding an Experience Entry
Edit `src/data/experience.ts`:
```typescript
import { ExperienceItem } from '@/types/experience';

// Append to EXPERIENCE_DATA array:
{
  id: 'role-id',
  role: 'Senior Employee Benefits Analyst',
  organization: 'Acme Benefits Consulting',
  location: 'Omaha, NE',
  term: '2026 - Present',
  category: 'enterprise', // 'enterprise' | 'data-it' | 'editorial' | 'broadcast'
  pillar: 'Group Benefits & Underwriting',
  description: 'Leading actuarial plan reviews and automated renewal RFP benchmarking.',
  highlights: [
    'Engineered self-funded stop-loss pricing models covering $20M+ annualized premium.',
    'Automated carrier census reconciliation reducing turnaround from 5 days to 2 hours.',
  ],
  skills: ['Self-Funded Stop-Loss', 'EDI 834', 'Power BI', 'Excel Modeling'],
  highlight: true,
}
```

### 4.4 Updating Social Media / Contact Links
Edit `src/data/socials.ts`:
* Verified accounts are centralized in `SOCIAL_LINKS` and `CONTACT_CONFIG`.
* Updating `CONTACT_CONFIG.email` automatically propagates to all copy buttons, mailto anchors, footer credits, and SEO JSON-LD schemas.

---

## 5. Coding & Styling Standards

### TypeScript Strictness
- `strict: true` is enforced in `tsconfig.json`.
- **Zero Tolerance for `any`:** Never declare `: any` or cast with `as any`. Use proper interfaces or generic types.
- All props interfaces must be exported from their component file (e.g., `export interface ButtonProps`).

### Tailwind CSS Conventions
- Color Palette:
  - Background: `bg-slate-950`
  - Elevated surfaces: `bg-slate-900/60` with `backdrop-blur-md` and `border border-slate-800`
  - Accents: `text-cyan-400`, `border-cyan-500/30`, `bg-cyan-500/10`
  - Secondary accents: `text-sky-300`, `text-emerald-400`
- Typography:
  - Sans-serif: `Inter`
  - Monospace (telemetry, badges, flight logs): `JetBrains Mono` or `font-mono`
  - Editorial headings / italics: `Newsreader` or `font-serif`
- Transitions:
  - Interactive elements must include smooth transitions: `transition-all duration-200`
  - Micro-interactions: hover lift `hover:-translate-y-0.5 active:translate-y-0`

---

## 6. Build & Verification Checklist

Before committing or pushing any code to production:

1. **Verify Static CSS Generation:**
   ```bash
   npm run build
   # Expected output: styles.min.css compiled via esbuild with zero errors
   ```
2. **Verify Eleventy SSG:**
   ```bash
   npm run build:ssg
   # Confirms that all static root pages compile cleanly
   ```
3. **Verify Static File Synchronization:**
   - When modifying assets, ensure both root and `public/` stay synchronized.
   - Any external links must use `@tysonshields00` for GitHub and `@tshields2000` for Instagram.
4. **Browser Console Verification:**
   - Load pages on local dev server and ensure zero JavaScript console errors or warnings.
