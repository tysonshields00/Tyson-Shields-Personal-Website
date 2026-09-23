# Tyson Shields Portfolio & Technical Systems

[![Version](https://img.shields.io/badge/version-2.0.0-cyan.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](tsconfig.json)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](src/app)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)](tailwind.config.ts)

The professional portfolio and technical platform of **Tyson Shields**—Business Analyst specializing in **Employee Benefits**, licensed Life & Health Insurance Producer (State of Nebraska #21707104), and systems engineer.

---

## 🏛 Clean Root & Modular Architecture

The repository enforces a clean root structure where all loose files are organized into dedicated directories:

* **`src/`** contains the Next.js 14+ App Router, atomic UI components, centralized data sources, metadata builders, and domain contracts.
* **`public/`** houses all static assets: fonts, browser scripts, production stylesheets, icons, favicons, manifests, and the resume PDF.
* **`legacy/`** stores the self-contained static HTML pages, Eleventy templates (`_includes/`, `_layouts/`), and historical static build configuration.
* **`docs/`** hosts comprehensive architectural documentation and AI agent engineering guidelines.

---

## 📂 Directory Layout

```text
Tyson-Shields-Personal-Website/
├── docs/                             # Architecture guides & AI agent instructions
│   ├── AGENT_GUIDELINES.md           # Comprehensive manual for AI models & developers
│   └── ARCHITECTURE.md               # High-level system architecture overview
├── legacy/                           # Preserved self-contained static HTML site
│   ├── _includes/                    # Reusable partials (header, footer, drawer)
│   ├── _layouts/                     # Base HTML layouts
│   ├── .eleventy.js                  # Eleventy SSG configuration
│   ├── 404.html, about.html...       # Static HTML pages
│   ├── fonts/ & scripts/             # Local static assets
│   └── styles.css & styles.min.css   # Legacy stylesheets
├── public/                           # Public static assets & CDN distribution
│   ├── css/                          # Compiled minified stylesheets (styles.min.css)
│   ├── fonts/                        # Modern WOFF2 typography (Outfit)
│   ├── scripts/                      # Modular browser scripts (core, home, contact, 404)
│   ├── android-chrome-*.png          # PWA icons
│   ├── favicon.ico & favicon-*.png   # Multi-resolution favicons
│   ├── headshot.jpg & og-image.png   # Portrait & Open Graph social cards
│   ├── site.webmanifest, robots.txt  # Manifest & crawler directives
│   ├── sitemap.xml                   # Search engine index sitemap
│   ├── Tyson-Shields-Resume.pdf      # Downloadable resume document
│   └── _headers & _redirects         # Cloudflare/Netlify routing & security headers
├── src/                              # Next.js App Router & Component Engine
│   ├── app/                          # App Router pages and global layouts
│   │   ├── globals.css               # Global Tailwind CSS directives & root variables
│   │   ├── layout.tsx                # Global RootLayout with JSON-LD schema
│   │   ├── page.tsx                  # Modular overview home page
│   │   ├── about/page.tsx            # Executive dossier & narrative
│   │   ├── career/page.tsx           # Operational chronology & flight log
│   │   ├── skills/page.tsx           # Technical competencies & skill matrix
│   │   └── contact/page.tsx          # Direct comms relay & verified channels
│   ├── components/                   # Component design system
│   │   ├── index.ts                  # Component barrel export
│   │   ├── ui/                       # Atomic UI primitives (Badge, Button, Card, SearchInput)
│   │   ├── sections/                 # Composable domain sections (Hero, Telemetry, Certifications, etc.)
│   │   └── layout/                   # Structural layout (Header, Footer, Navigation)
│   ├── data/                         # Centralized Single Source of Truth
│   │   ├── articles.ts               # Published opinion columns (The Daily Nebraskan)
│   │   ├── credentials.ts            # State licenses & professional certifications
│   │   ├── experience.ts             # Career milestones & operational deliverables
│   │   └── socials.ts                # Verified accounts, relays & contact coordinates
│   ├── lib/                          # Utility functions & metadata helpers
│   │   ├── metadata.ts               # Structured Schema.org JSON-LD builders
│   │   └── utils.ts                  # Class merge (cn), clipboard, date formatters
│   ├── styles/                       # Source stylesheet (styles.css, styles.min.css)
│   └── types/                        # Strict domain contracts & TypeScript interfaces
│       ├── articles.ts
│       ├── credentials.ts
│       ├── experience.ts
│       ├── socials.ts
│       └── index.ts
├── .gitignore                        # Git exclusion rules
├── index.html                        # Root redirector → legacy/index.html
├── about.html                        # Root redirector → legacy/about.html
├── career.html                       # Root redirector → legacy/career.html
├── skills.html                       # Root redirector → legacy/skills.html
├── contact.html                      # Root redirector → legacy/contact.html
├── package.json                      # Build scripts and project dependencies
├── README.md                         # This file
├── tailwind.config.ts                # Tailwind design tokens & font configuration
├── tsconfig.json                     # Strict TypeScript configuration with @/* aliases
└── vercel.json                       # Deployment, rewrites & security headers
```

---

## ⚡ Core Domain Specializations

* **Employee Benefits & Plan Modeling:** Self-funded stop-loss corridors, level-funded aggregate tiers, fully insured rate renewals, deductible modeling, and contribution strategies.
* **Census Data Engineering & Systems:** EDI 834 benefit enrollment feeds, high-volume census normalization, carrier billing reconciliation, and data parity audits.
* **Process Automation:** Transforming carrier RFP intake matrices into board-ready executive renewal presentations, compressing cycle times by 40%.
* **Broadcast & Live Media Systems:** Video routing, Dante audio networking, SMPTE 2110 IP video infrastructure, and media transmission.

---

## 🛠 Local Development & Commands

### 1. Build Production CSS
```sh
npm run build
```
Compiles and minifies `src/styles/styles.css` into `public/css/styles.min.css` using `esbuild`.

### 2. Static Site Generator Build (Legacy Eleventy)
```sh
npm run build:ssg
```
Compiles legacy HTML templates via `@11ty/eleventy` using `legacy/.eleventy.js`.

### 3. Local Live-Reload Dev Server (Legacy Site)
```sh
npm run dev
```
Starts the local Eleventy development server with hot-reload for `legacy/`.

### 4. Static HTTP Preview
```sh
npm run preview
# Preview public assets at http://localhost:8000
```

### 5. Legacy Site HTTP Preview
```sh
npm run preview:legacy
# Preview legacy static site at http://localhost:8000
```

---

## 📖 Contributing & AI Agent Instructions

All engineers and automated AI coding assistants **must adhere** to the architectural specifications and content workflows detailed in **[`docs/AGENT_GUIDELINES.md`](docs/AGENT_GUIDELINES.md)**.

### Content Update Rules:
* **Never modify presentation markup** to add credentials, articles, or experience.
* **Update data layers** in `src/data/` using the strongly typed contracts defined in `src/types/`.
* **Maintain asset parity** within `public/`.
* **Run `npm run build`** before any commit to ensure zero CSS or compilation regressions.

---

## 📄 License & Credits

- Designed and engineered by **Tyson Shields**.
- Code licensed under the [MIT License](LICENSE).
