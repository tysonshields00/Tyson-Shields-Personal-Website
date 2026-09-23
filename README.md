# Tyson Shields Portfolio & Technical Systems

[![Version](https://img.shields.io/badge/version-2.0.0-cyan.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](tsconfig.json)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](src/app)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)](tailwind.config.ts)

The professional portfolio and technical platform of **Tyson Shields**—Business Analyst specializing in **Employee Benefits**, licensed Life & Health Insurance Producer (State of Nebraska #21707104), and systems engineer.

---

## 🏛 System Architecture & Clean Layout

The repository is structured so that the production portfolio is served directly from root, with full support for Eleventy static site generation and Next.js modern components:

* **`index.html`, `about.html`, `career.html`, `skills.html`, `contact.html`** serve as the primary site pages directly from the root domain (`tysonshields.com`).
* **`styles.css` & `styles.min.css`** provide zero-framework, hardware-accelerated cybernetic CSS styling.
* **`scripts/` & `fonts/`** house client-side interactions, ambient particle engines, and local Outfit typography.
* **`_includes/` & `_layouts/`** contain Eleventy partials and layout definitions for static compilation.
* **`src/`** contains the parallel Next.js App Router, React components, and TypeScript data layers (`src/data/`).
* **`docs/`** hosts architectural documentation and engineering guidelines.

---

## 📂 Directory Layout

```text
Tyson-Shields-Personal-Website/
├── docs/                             # Architecture guides & AI agent instructions
│   ├── AGENT_GUIDELINES.md           # Comprehensive manual for AI models & developers
│   └── ARCHITECTURE.md               # High-level system architecture overview
├── _includes/                        # Reusable partials (header, footer, drawer)
├── _layouts/                         # Base HTML layouts
├── fonts/                            # Modern WOFF2 typography (Outfit)
├── scripts/                          # Modular browser scripts (core, home, contact, 404)
├── src/                              # Next.js App Router & Component Engine
│   ├── app/                          # App Router pages and global layouts
│   ├── components/                   # Component design system (UI primitives, sections)
│   ├── data/                         # Centralized Single Source of Truth (socials, certs, articles)
│   ├── lib/                          # Utility functions & metadata helpers
│   ├── styles/                       # Source styles
│   └── types/                        # Strict domain contracts & TypeScript interfaces
├── .eleventy.js                      # Eleventy SSG configuration
├── .eleventyignore                   # Eleventy build exclusions
├── .gitignore                        # Git exclusion rules
├── 404.html                          # Not Found page
├── about.html                        # About / Executive Dossier
├── career.html                       # Career Chronology & Published Articles
├── contact.html                      # Comms Relay & Direct Contact
├── index.html                        # Production Homepage (tysonshields.com)
├── skills.html                       # Technical Skills Matrix & Certifications
├── Tyson-Shields-Resume.html         # Web-viewable resume
├── Tyson-Shields-Resume.pdf          # Downloadable PDF resume
├── styles.css & styles.min.css       # Core stylesheets
├── favicon.ico & favicon-*.png       # Multi-resolution favicons
├── headshot.jpg & og-image.png       # Headshot & social preview cards
├── package.json                      # Build scripts and project dependencies
├── README.md                         # This file
├── tailwind.config.ts                # Tailwind design tokens & font configuration
├── tsconfig.json                     # Strict TypeScript configuration with @/* aliases
└── vercel.json                       # Deployment routing, clean URLs & security headers
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
