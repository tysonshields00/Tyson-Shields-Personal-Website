# Project Architecture & Modular Design

## Overview
This repository hosts the professional portfolio of Tyson Shields, engineered with **Next.js 14+ App Router**, **TypeScript**, and **Tailwind CSS**.

---

## Directory Hierarchy

```text
Tyson-Shields-Personal-Website/
├── docs/                           # Architecture guides & AI agent instructions
│   ├── AGENT_GUIDELINES.md         # Comprehensive AI agent & developer workflow manual
│   └── ARCHITECTURE.md             # High-level system architecture overview
├── legacy/                         # Preserved static HTML pages & templates
│   ├── _includes/                  # Eleventy partials (header, footer, drawer)
│   ├── _layouts/                   # Eleventy base layouts
│   ├── .eleventy.js                # Eleventy configuration
│   ├── index.html, career.html...  # Pre-rendered HTML pages
│   └── styles/                     # Legacy stylesheets
├── public/                         # Public static assets, icons, fonts, scripts
│   ├── css/                        # Compiled production CSS
│   ├── fonts/                      # Modern WOFF2 typography (Outfit)
│   ├── scripts/                    # Progressive enhancement scripts
│   ├── favicons & icons            # Multi-platform app icons
│   ├── robots.txt, sitemap.xml     # SEO crawlers & indexing
│   └── Tyson-Shields-Resume.pdf    # Downloadable resume artifact
└── src/                            # Modern Next.js App Router Application
    ├── app/                        # App Router routes, layouts, and globals.css
    ├── components/                 # Component library (ui, sections, layout)
    ├── data/                       # Centralized Single Source of Truth
    ├── lib/                        # Utility functions & Schema.org generators
    ├── styles/                     # Source styles & design system tokens
    └── types/                      # Shared TypeScript domain contracts
```

---

## Separation of Concerns
1. **Presentation Layer (`src/components/`):** Pure React components that consume typed props without hardcoded data.
2. **Domain Data Layer (`src/data/`):** All content (credentials, published columns, experience milestones, contact relays) lives here as strongly typed arrays.
3. **Contracts Layer (`src/types/`):** TypeScript interfaces defining the shape of domain entities.
4. **Public Static Layer (`public/`):** Static assets served by Next.js and CDN networks.
