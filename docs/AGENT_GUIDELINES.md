# Agent & Developer Architectural Guidelines

> **Target Audience:** Future AI Agents (Antigravity, Claude, ChatGPT, Cursor) and Software Engineers contributing to `tysonshields.com`.  
> **Last Updated:** October 2026  
> **Version:** 2.1.0  
> **System Architecture:** Dual-Track: Root Production Static Delivery (Eleventy / esbuild) & Modular Next.js 14+ App Router (TypeScript & Tailwind CSS).

---

## 1. Executive Codebase Overview

This repository powers **tysonshields.com**, the professional portfolio of **Tyson Shields**—Business Analyst specializing in **Employee Benefits**, licensed Life & Health Insurance Producer (State of Nebraska #21707104), and systems engineer.

The codebase is engineered with a **dual architectural structure**:
1. **Production Static Delivery (Root):** High-speed, zero-JS-dependent static pages (`index.html`, `career.html`, `about.html`, `skills.html`, `contact.html`, `Tyson-Shields-Resume.html`, `Tyson-Shields-Resume.pdf`) served with minified CSS (`styles.min.css`), local Outfit typography, and vanilla progressive enhancement (`scripts/core.js`). Deployed via Cloudflare Pages.
2. **Modular Next.js / TypeScript App Engine (`src/`):** Strongly typed, component-driven architecture using React, Next.js 14+ App Router (`src/app/`), atomic design tokens, centralized single-source-of-truth datasets (`src/data/`), domain models (`src/types/`), and path aliases (`@/*`).

---

## 2. Directory Hierarchy Blueprint

```text
Tyson-Shields-Personal-Website/
├── docs/                             # Architecture blueprints & guidelines
│   ├── AGENT_GUIDELINES.md           # This comprehensive manual for AI models & developers
│   └── ARCHITECTURE.md               # High-level system architecture overview
├── _includes/                        # Reusable HTML partials (header, footer, drawer)
├── _layouts/                         # Base HTML layouts for Eleventy compilation
├── fonts/                            # Modern WOFF2 typography (Outfit)
├── scripts/                          # Client-side scripts and Cloudflare CLI tooling
│   ├── core.js                       # Shared UI preferences, theme engine, navigation
│   ├── home.js                       # Interactive homepage particle effects & timeline
│   ├── contact.js                    # Direct contact modal and clipboard interactions
│   ├── 404.js                        # Dynamic route recovery & suggestion engine
│   ├── cf-status.js                  # Cloudflare zone, DNS, and Pages health verifier
│   └── cf-purge.js                   # Instant worldwide edge cache invalidator
├── src/                              # Next.js App Router & Component Engine
│   ├── app/                          # Next.js App Router routes, layouts, globals.css
│   │   ├── globals.css               # Tailwind directives & design tokens
│   │   ├── layout.tsx                # Root layout, metadata, JSON-LD injection
│   │   ├── page.tsx                  # Modular Home page
│   │   ├── about/page.tsx            # Dedicated About route
│   │   ├── career/page.tsx           # Dedicated Career route
│   │   ├── skills/page.tsx           # Technical Competencies route
│   │   └── contact/page.tsx          # Direct Comms & Relays route
│   ├── components/                   # Component library
│   │   ├── index.ts                  # Root barrel export
│   │   ├── ui/                       # Atomic, reusable UI primitives (Badge, Button, Card)
│   │   ├── sections/                 # Composable domain sections (Hero, Certs, Articles)
│   │   └── layout/                   # Global navigation, header, footer
│   ├── data/                         # Centralized Single Source of Truth datasets
│   │   ├── articles.ts               # Published opinion columns & news
│   │   ├── credentials.ts            # Licenses & professional certifications
│   │   ├── experience.ts             # Career timeline & operational highlights
│   │   └── socials.ts                # Canonical profiles & contact relays
│   ├── lib/                          # Utilities & schema generators
│   │   ├── metadata.ts               # Structured JSON-LD metadata builders
│   │   └── utils.ts                  # Tailwind merge (cn), formatting, clipboard
│   ├── styles/                       # Source styling
│   └── types/                        # Shared TypeScript domain contracts
│       ├── articles.ts
│       ├── credentials.ts
│       ├── experience.ts
│       ├── socials.ts
│       └── index.ts
├── .eleventy.js                      # Eleventy SSG configuration and passthrough rules
├── .eleventyignore                   # Exclusions for Eleventy static build
├── .gitignore                        # Git exclusion rules
├── _headers                          # Cloudflare Pages edge HTTP security and caching headers
├── _redirects                        # Cloudflare Pages edge 302/301 routing rules
├── 404.html                          # Not Found page
├── about.html                        # About / Executive Dossier
├── career.html                       # Career Chronology & Published Columns
├── contact.html                      # Comms Relay & Direct Contact
├── index.html                        # Production Homepage (tysonshields.com)
├── skills.html                       # Technical Competencies Matrix & Certifications
├── Tyson-Shields-Resume.html         # Web-viewable interactive resume
├── Tyson-Shields-Resume.pdf          # Downloadable PDF resume artifact
├── styles.css                        # Source cybernetic CSS stylesheet
├── styles.min.css                    # Minified production stylesheet (compiled by esbuild)
├── favicon.ico & favicon-*.png       # Multi-resolution favicons
├── headshot.jpg & og-image.png       # Headshot & social preview cards
├── site.webmanifest                  # Progressive Web App manifest
├── sitemap.xml & robots.txt          # SEO crawlers and index directives
├── package.json                      # Build scripts and project dependencies
├── tailwind.config.ts                # Shared styling tokens & color palettes
├── tsconfig.json                     # Strict TS compiler with @/* path aliases
└── vercel.json                       # Deployment routing, clean URLs & security headers
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
* **ALWAYS** use `@/components/ui`, `@/components/sections`, or `@/components/layout` instead of deep relative traversal (`../../components/...`).
* **ALWAYS** import shared types from `@/types` or `@/types/<domain>`.
* **ALWAYS** import centralized datasets from `@/data/<domain>`.
* **ALWAYS** import utility functions (`cn`, formatting) from `@/lib/utils`.
* **NEVER** use wildcard relative paths like `../../data/experience`.

---

## 4. Content Update Workflows

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

### 4.2 Adding a New Published Column or Article
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

### 4.3 Adding a Career Experience Entry
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
  - Monospace (telemetry, badges, logs): `JetBrains Mono` or `font-mono`
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
   # Compiles styles.css into styles.min.css via esbuild with zero errors
   ```
2. **Verify Eleventy SSG Build:**
   ```bash
   npm run build:ssg
   # Confirms that all static pages and passthroughs compile cleanly into _site/
   ```
3. **Verify Cloudflare Edge Health:**
   ```bash
   npm run cf:status
   # Confirms zone status, DNS proxying, and Pages deployment
   ```
4. **Browser Console & Accessibility Verification:**
   - Confirm zero JavaScript console errors or warnings.
   - Verify WCAG 2.1 AA color contrast across both dark and light surfaces.
   - Verify keyboard navigability and focus rings.
