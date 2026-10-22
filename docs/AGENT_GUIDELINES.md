# Agent & Developer Architectural Guidelines

> **Target Audience:** Future AI Agents (Antigravity, Claude, ChatGPT, Cursor) and Software Engineers contributing to `tysonshields.com`.  
> **Last Updated:** October 2026  
> **Version:** 3.0.0  
> **System Architecture:** High-Performance Static Delivery (HTML5 / Vanilla CSS3 / esbuild) with Eleventy SSG Engine (`@11ty/eleventy`).

---

## 1. Executive Codebase Overview

This repository powers **tysonshields.com**, the professional portfolio of **Tyson Shields**—Client Service Specialist (previously Benefits Account Administrator) specializing in employee benefits administration, automated workflows (Python/Power Query), and data integrity.

The site is built with a **zero-dependency static delivery architecture**:
1. **Production Static Delivery (Root):** High-speed, zero-JS-dependent static pages (`index.html`, `career.html`, `about.html`, `skills.html`, `contact.html`, `calculator.html`, `Tyson-Shields-Resume.html`, `Tyson-Shields-Resume.pdf`) served with minified CSS (`styles.min.css`), local Outfit typography, and vanilla progressive enhancement (`scripts/core.js`). Deployed via Cloudflare Pages.
2. **Eleventy Static Site Generator (`.eleventy.js`):** Built-in compile-time engine using Nunjucks templating for partials (`_includes/`) and base layouts (`_layouts/`), generating output into `_site/`.
3. **Master Design System & Surface Elevation Scale:** Cybernetic elevation scale (`--surface-1` through `--surface-3`), WCAG AAA/AA compliant contrast, zero blurry neon halos, and typography kerning that prevents character collisions.

---

## 2. Directory Hierarchy Blueprint

```text
Tyson-Shields-Personal-Website/
├── assets/                           # Static media, icons, and document artifacts
│   ├── docs/                         # Document artifacts
│   │   └── Tyson-Shields-Resume.pdf  # Downloadable PDF resume artifact
│   ├── icons/                        # Multi-resolution favicons and PWA icons
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   └── icon.svg
│   └── images/                       # High-resolution media and OpenGraph cards
│       ├── og-image.png              # Social preview OpenGraph card
│       └── tyson-shields-headshot.jpg# High-resolution executive headshot
├── docs/                             # Architecture blueprints & guidelines
│   ├── AGENT_GUIDELINES.md           # This comprehensive manual for AI models & developers
│   └── ARCHITECTURE.md               # High-level system architecture overview
├── _includes/                        # Reusable HTML partials (header, footer, drawer)
│   ├── header.html                   # Global accessible navigation bar
│   ├── footer.html                   # Global footer and copyright metadata
│   └── settings-drawer.html          # Appearance & accessibility drawer partial
├── _layouts/                         # Base HTML layouts for Eleventy compilation
│   └── base.html                     # Base layout template
├── fonts/                            # Modern WOFF2 typography (Outfit Latin 400 & 700)
├── scripts/                          # Client-side scripts and Cloudflare CLI tooling
│   ├── core.js                       # Shared UI preferences, theme engine, command palette
│   ├── contact.js                    # Direct contact modal and clipboard interactions
│   ├── 404.js                        # Dynamic route recovery & suggestion engine
│   ├── format-pages.js               # Cross-page partial and modal synchronizer
│   ├── cf-status.js                  # Cloudflare zone, DNS, and Pages health verifier
│   ├── cf-purge.js                   # Instant worldwide edge cache invalidator
│   └── preview.js                    # Zero-dependency local HTTP preview server
├── .eleventy.js                      # Eleventy SSG configuration and passthrough rules
├── .eleventyignore                   # Exclusions for Eleventy static build
├── .gitignore                        # Git exclusion rules
├── _headers                          # Cloudflare Pages edge HTTP security and caching headers
├── _redirects                        # Cloudflare Pages edge 302/301 routing rules
├── 404.html                          # Not Found page
├── about.html                        # About / Executive Dossier
├── calculator.html                   # Interactive Scientific Calculator
├── career.html                       # Career Chronology & Published Columns
├── contact.html                      # Comms Relay & Direct Contact
├── favicon.ico                       # Root fallback favicon for legacy browsers/crawlers
├── index.html                        # Production Homepage (tysonshields.com)
├── skills.html                       # Technical Competencies Matrix & Certifications
├── Tyson-Shields-Resume.html         # Web-viewable interactive resume
├── styles.css                        # Source cybernetic CSS stylesheet
├── styles.min.css                    # Minified production stylesheet (compiled by esbuild)
├── PROJECT_GUIDE.md                  # Comprehensive engineering blueprint and verified fact base
├── CHANGELOG_AUDIT.md                # Audit changelog, deletions report, and performance records
├── CLOUDFLARE.md                     # Cloudflare edge routing and CDN configuration
├── site.webmanifest                  # Progressive Web App manifest
├── sitemap.xml & robots.txt          # SEO crawlers and index directives
└── package.json                      # Build scripts and project dependencies
```

---

## 3. Verified Credentials & Experience Nomenclature

When modifying any copy across HTML files, JSON-LD schemas, or documentation, always use verified factual terms:

1. **Current Employment**:
   - Company: **UNICO Group** (Lincoln, NE)
   - Official Title: **Client Service Specialist (previously Benefits Account Administrator)**
   - Prior Internal Role: **Data Analytics & IT Intern** (May 2024 – June 2025)
   - Rule: Do NOT append Roman numerals like "Specialist I" or invent "Operations Analyst" as a formal title.
2. **Previous Work Experience**:
   - **10/11 News / Gray Television** (Lincoln, NE): Technical Media Producer and Production Intern (until June 2025). Live broadcast control, AP ENPS rundown directing, robotic camera pedestals, audio DSP.
   - **Kawasaki Motors Manufacturing Corp** (Lincoln, NE): Purchasing Department Intern (Jan 2022 – July 2022).
   - **The Daily Nebraskan**: Opinion Columnist (Fall 2023).
3. **Academic Degrees**:
   - **University of Nebraska–Lincoln** (Graduated May 2025)
   - Dual Degree: **Bachelor of Science in Mathematics** (Focus in Statistics and Data Science) & **Bachelor of Journalism in Broadcasting** (Focus in Media Production), with a **Minor in Informatics**.
4. **Professional Licenses & Certifications**:
   - **State of Nebraska Insurance Producer License**: Accident, Health, and Life (License ID 21707104; active through March 31, 2028).
   - **Adult First Aid/CPR/AED Certification**: National Safety Council (active through June 2028).
5. **Collegiate Leadership**:
   - **Delta Sigma Phi Fraternity** (Alpha Psi chapter: Chapter President, VP of Recruitment, Secretary)
   - **Campus NightLife** (Director of Operations & Executive Board Member)

---

## 4. Coding & Styling Standards

### Semantic HTML5
- Use standard landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`.
- Every image must include descriptive `alt` text, explicit `width` and `height` dimensions, and `loading="lazy"` (except hero images which use `fetchpriority="high"` and `loading="eager"`).
- Preserve JSON-LD `<script type="application/ld+json">` schemas on every page.
- Do not introduce duplicate HTML comments or unclosed tags.

### Cybernetic CSS Architecture
- All styling lives in [`styles.css`](file:///c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/styles.css).
- **Master Design System Rules**:
  - Headings must have `letter-spacing: -0.015em` to `-0.02em` and `line-height: 1.15` to `1.22` with `text-wrap: balance`. **Never** set `letter-spacing: -.05em` or `line-height: .98` as it causes character collisions.
  - Heading highlights use linear gradient fills with `-webkit-background-clip: text` and `-webkit-text-fill-color: transparent`. **Never** attach fuzzy `text-shadow` halos to text clips.
  - Surface elevations use `--surface-1` (#0f172a), `--surface-2` (#162238), and subtle border lines (`rgba(255, 255, 255, 0.08)`).
- **Always recompile CSS after editing:**
  ```bash
  npm run build
  ```
  This minifies `styles.css` into `styles.min.css` via esbuild.

---

## 5. Build & Verification Checklist

Before committing or pushing any code to production:

1. **Recompile Minified CSS:**
   ```bash
   npm run build
   # Generates styles.min.css via esbuild in ~25ms
   ```
2. **Verify Eleventy SSG Compilation:**
   ```bash
   npm run build:ssg
   # Confirms that all static pages and passthroughs compile cleanly into _site/
   ```
3. **Synchronize Modals & Drawers (if altered):**
   ```bash
   npm run format:pages
   ```
4. **Verify Cloudflare Edge Health:**
   ```bash
   npm run cf:status
   # Confirms zone status, DNS proxying, and Pages deployment
   ```
5. **Browser Console & Accessibility Verification:**
   - Confirm zero JavaScript console errors or warnings.
   - Verify WCAG 2.1 AA/AAA color contrast across both dark and light surfaces.
   - Verify keyboard navigability and focus rings.

---

## 6. Continuous Self-Improvement & Autonomous Code Hygiene Protocol

Every contributing AI agent (Antigravity, Claude, ChatGPT, Cursor) and human engineer is expected to leave the repository cleaner, better organized, and more resilient than they found it. Do not simply perform the requested edit in isolation—actively diagnose, organize, and harden the codebase on every pass.

### 6.1 Proactive Code Cleanup & Organization
- **Dead Code & Artifact Elimination**: Remove unused styles, obsolete classes, orphaned script handlers, and temporary test files upon completing a task.
- **Architectural Organization**: Maintain clean grouping in [`styles.css`](file:///c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/styles.css) (tokens, layout, page-specific modules, responsive breakpoints, print rules). Prevent duplicate selector declarations and consolidate scattered rules into canonical blocks.
- **Script Modularity**: Keep script files focused and cleanly scoped (`core.js` for universal UI, theme engine, navigation; `contact.js` for contact forms; `404.js` for route recovery). Avoid bloated inline scripts in HTML.

### 6.2 Cross-Browser & Content-Blocker Diagnostic Loop
- **Blocker Immunity**: Continuously audit HTML classes and IDs against common content/ad-blocker filter lists (EasyList, Fanboy's, Peter Lowe's). Never introduce class or ID names containing vulnerable patterns like `*-banner`, `metric-*`, `*-stats-*`, or `telemetry-*` without safe aliases.
- **Multi-Engine Parity**:
  - **Gecko (Firefox)**: Ensure all CSS Grid children include `min-width: 0` to prevent horizontal blowout; maintain `text-rendering: optimizeLegibility` and `-moz-osx-font-smoothing`; avoid `overflow-x: clip` breaking sticky positioning.
  - **Blink (Chrome, Edge, Brave)**: Confirm smooth rendering, hardware-accelerated transforms, and clean backdrop filters.
  - **WebKit (Safari / iOS)**: Verify `env(safe-area-inset-*)` support, viewport-fit behavior, and `-webkit-backdrop-filter`.
- **Fault-Tolerant APIs**:
  - Always guard `localStorage`, `sessionStorage`, and `navigator.clipboard` with safe try/catch wrappers or fallbacks so private browsing modes and tracking protection policies never throw unhandled `SecurityError` exceptions.
  - Wrap HTML5 canvas rendering in try/catch to gracefully handle fingerprinting protection blocks.

### 6.3 Autonomous Bug Detection & Self-Healing Workflow
When inspecting or updating any page:
1. **Audit**: Check the page markup, console output, responsive layouts, and structured data schemas.
2. **Diagnose**: Identify styling regressions, contrast failures, missing dimensions on media/SVGs, or fragile dependencies.
3. **Refactor & Heal**: Surgically repair issues while preserving existing functionality and backward compatibility.
4. **Validate**: Always run `npm run build:ssg` to ensure that esbuild minification and Eleventy compilation pass with 0 errors.
