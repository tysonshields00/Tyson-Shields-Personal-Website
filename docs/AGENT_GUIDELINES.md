# Agent & Developer Architectural Guidelines

> **Target Audience:** Future AI Agents (Antigravity, Claude, ChatGPT, Cursor) and Software Engineers contributing to `tysonshields.com`.  
> **Last Updated:** October 2026  
> **Version:** 2.2.0  
> **System Architecture:** High-Performance Static Delivery (HTML5 / Vanilla CSS3 / esbuild) with Eleventy SSG Engine (`@11ty/eleventy`).

---

## 1. Executive Codebase Overview

This repository powers **tysonshields.com**, the professional portfolio of **Tyson Shields**—Business Analyst & Data Operations Specialist specializing in **Data Analytics**, automated Python/SQL data pipelines, and systems engineering.

The site is built with a **zero-dependency static delivery architecture**:
1. **Production Static Delivery (Root):** High-speed, zero-JS-dependent static pages (`index.html`, `career.html`, `about.html`, `skills.html`, `contact.html`, `Tyson-Shields-Resume.html`, `Tyson-Shields-Resume.pdf`) served with minified CSS (`styles.min.css`), local Outfit typography, and vanilla progressive enhancement (`scripts/core.js`). Deployed via Cloudflare Pages.
2. **Eleventy Static Site Generator (`.eleventy.js`):** Built-in compile-time engine using Nunjucks templating for partials (`_includes/`) and base layouts (`_layouts/`), generating output into `_site/`.

---

## 2. Directory Hierarchy Blueprint

```text
Tyson-Shields-Personal-Website/
├── docs/                             # Architecture blueprints & guidelines
│   ├── AGENT_GUIDELINES.md           # This comprehensive manual for AI models & developers
│   └── ARCHITECTURE.md               # High-level system architecture overview
├── _includes/                        # Reusable HTML partials (header, footer, drawer)
├── _layouts/                         # Base HTML layouts for Eleventy compilation
├── fonts/                            # Modern WOFF2 typography (Outfit Latin 400 & 700)
├── scripts/                          # Client-side scripts and Cloudflare CLI tooling
│   ├── core.js                       # Shared UI preferences, theme engine, navigation
│   ├── home.js                       # Interactive homepage particle effects & timeline
│   ├── contact.js                    # Direct contact modal and clipboard interactions
│   ├── 404.js                        # Dynamic route recovery & suggestion engine
│   ├── cf-status.js                  # Cloudflare zone, DNS, and Pages health verifier
│   └── cf-purge.js                   # Instant worldwide edge cache invalidator
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
├── tyson-shields-headshot.jpg        # High-resolution executive headshot
├── og-image.png                      # Social preview OpenGraph card
├── site.webmanifest                  # Progressive Web App manifest
├── sitemap.xml & robots.txt          # SEO crawlers and index directives
└── package.json                      # Build scripts and project dependencies
```

---

## 3. Content Update Workflows

Content is managed directly in the semantic HTML5 templates and Eleventy partials:

### 3.1 Updating Career Milestones or Work Experience
Edit `career.html`:
- Career entries are structured inside `<section class="timeline">` using semantic `<article class="timeline-item">` blocks.
- Maintain consistent tags: `term`, `role`, `organization`, `pillar`, and highlight bullet points.
- Ensure any skills tags use existing classes (`tag-pill`).

### 3.2 Updating Technical Skills & Certifications
Edit `skills.html`:
- Certifications are organized by category: *Licenses*, *Business & Management*, *IT, Cloud & Systems*, *Data & Technical Tools*.
- Tyson Shields' specialization: **Data Analytics & Business Operations Specialist**.
- Maintain verified issuer URLs and issue dates.

### 3.3 Adding a Published Article or Column
Edit `career.html`:
- Published opinion columns and news articles are displayed in the Published Work section.
- Include article title, publication name, publication date, reading time estimate, and canonical URL.

### 3.4 Updating Header, Navigation, or Footer
Edit partials in `_includes/`:
- `_includes/header.html`: Global navigation links and brand mark.
- `_includes/footer.html`: Copyright, contact relays, and social links.
- `_includes/settings-drawer.html`: Preference drawer controls.

---

## 4. Coding & Styling Standards

### Semantic HTML5
- Use standard landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`.
- Every image must include descriptive `alt` text, explicit `width` and `height` dimensions, and `loading="lazy"` (except hero images which use `fetchpriority="high"` and `loading="eager"`).
- Preserve JSON-LD `<script type="application/ld+json">` schemas on every page.

### Cybernetic CSS Architecture
- All styling lives in [`styles.css`](file:///c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/styles.css).
- Use CSS Custom Properties declared in `:root`:
  - Backgrounds: `--bg-primary`, `--bg-secondary`, `--bg-card`
  - Accents: `--accent-cyan`, `--accent-glow`, `--accent-blue`
  - Typography: `--font-sans` (`Outfit`)
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
   # Generates styles.min.css via esbuild in ~15ms
   ```
2. **Verify Eleventy SSG Compilation:**
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

---

## 6. Continuous Self-Improvement & Autonomous Code Hygiene Protocol

Every contributing AI agent (Antigravity, Claude, ChatGPT, Cursor) and human engineer is expected to leave the repository cleaner, better organized, and more resilient than they found it. Do not simply perform the requested edit in isolation—actively diagnose, organize, and harden the codebase on every pass.

### 6.1 Proactive Code Cleanup & Organization
- **Dead Code & Artifact Elimination**: Remove unused styles, obsolete classes, orphaned script handlers, and temporary test files upon completing a task.
- **Architectural Organization**: Maintain clean grouping in [`styles.css`](file:///c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/styles.css) (tokens, layout, page-specific modules, responsive breakpoints, print rules). Prevent duplicate selector declarations and consolidate scattered rules into canonical blocks.
- **Script Modularity**: Keep script files focused and cleanly scoped (`core.js` for universal UI, theme engine, navigation; `home.js` for homepage-specific interactives; `contact.js` for contact forms). Avoid bloated inline scripts in HTML.

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

