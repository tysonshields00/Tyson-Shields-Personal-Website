# Tyson Shields Portfolio & Technical Systems

[![Version](https://img.shields.io/badge/version-2.0.0-cyan.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](tsconfig.json)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](src/app)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)](tailwind.config.ts)

The professional portfolio and technical platform of **Tyson Shields**—Business Analyst specializing in **Employee Benefits**, licensed Life & Health Insurance Producer (State of Nebraska #21707104), and systems engineer.

---

## 🏛 Architectural Architecture: Dual-Engine Design

This repository is engineered with a **dual architectural design** to maximize deployment flexibility, delivery speed, and developer ergonomic modularity:

1. **Production Static Root (Zero-JS-Dependent SSG):**
   - High-speed semantic HTML5 pages (`index.html`, `career.html`, `about.html`, `skills.html`, `contact.html`).
   - Automated CSS pipeline generating minified `styles.min.css` (124.6 KB) via `esbuild`.
   - Component templating via Eleventy (`_includes/`, `_layouts/`).
   - Modular browser scripts (`scripts/core.js`, `scripts/home.js`, `scripts/contact.js`, `scripts/404.js`).

2. **Next.js 14+ App Router & TypeScript Engine (`src/`):**
   - Modern React component hierarchy organized into `src/app/`, `src/components/` (`ui/`, `sections/`, `layout/`), `src/data/`, `src/lib/`, and `src/types/`.
   - Strict TypeScript type safety (`strict: true`) with absolute path aliases (`@/*` -> `./src/*`).
   - Tailwind CSS design system with custom cyan/emerald/slate palettes and responsive typography.
   - Clean separation of concerns: data records reside exclusively in `src/data/`, isolated from UI templates.

---

## 📂 Directory Layout

```text
Tyson-Shields-Personal-Website/
├── public/                           # Static assets, favicons, OG cards, PDF resume
│   ├── android-chrome-*.png
│   ├── favicon.ico
│   ├── headshot.jpg
│   ├── og-image.png
│   ├── site.webmanifest
│   └── Tyson-Shields-Resume.pdf
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
│   └── types/                        # Strict domain contracts & TypeScript interfaces
│       ├── articles.ts
│       ├── credentials.ts
│       ├── experience.ts
│       ├── socials.ts
│       └── index.ts
├── scripts/                          # Modular browser JavaScript (core, home, contact, 404)
├── fonts/                            # Optimized WOFF2 font payloads
├── styles.css                        # Cybernetic source stylesheet
├── styles.min.css                    # Minified production stylesheet (esbuild)
├── tailwind.config.ts                # Tailwind design tokens & font configuration
├── tsconfig.json                     # Strict TypeScript configuration with @/* aliases
├── AGENT_GUIDELINES.md               # Guidelines for future AI models & engineers
└── package.json                      # Build scripts and project dependencies
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
Compiles and minifies `styles.css` into `styles.min.css` using `esbuild`.

### 2. Static Site Generator Build (Eleventy)
```sh
npm run build:ssg
```
Minifies stylesheets and compiles semantic HTML templates via `@11ty/eleventy`.

### 3. Local Live-Reload Dev Server
```sh
npm run dev
```
Starts the local Eleventy development server with hot-reload.

### 4. Static HTTP Preview
```sh
npm run preview
# or: python -m http.server 8000
```
Launches a lightweight static HTTP server at `http://localhost:8000`.

---

## 📖 Contributing & AI Agent Instructions

All engineers and automated AI coding assistants **must adhere** to the architectural specifications and content workflows detailed in **[`AGENT_GUIDELINES.md`](AGENT_GUIDELINES.md)**.

### Content Update Rules:
* **Never modify presentation markup** to add credentials, articles, or experience.
* **Update data layers** in `src/data/` using the strongly typed contracts defined in `src/types/`.
* **Maintain asset parity** between root and `public/`.
* **Run `npm run build`** before any commit to ensure zero CSS or compilation regressions.

---

## 📄 License & Credits

- Designed and engineered by **Tyson Shields**.
- Code licensed under the [MIT License](LICENSE).
