# Tyson Shields Portfolio & Professional Systems

[![Version](https://img.shields.io/badge/version-2.0.0-cyan.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages_Deployed-F38020.svg?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Eleventy](https://img.shields.io/badge/Eleventy-3.x-222.svg?logo=eleventy&logoColor=white)](.eleventy.js)
[![esbuild](https://img.shields.io/badge/esbuild-0.25-FFCF00.svg?logo=esbuild&logoColor=black)](package.json)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic_Zero--JS-E34F26.svg?logo=html5&logoColor=white)](index.html)

The professional portfolio and technical platform of **Tyson Shields**—Business Analyst specializing in **Employee Benefits**, licensed Life & Health Insurance Producer (State of Nebraska #21707104), and systems engineer.

Production target: **[tysonshields.com](https://tysonshields.com)**.

---

## 🏛 System Architecture

The site is engineered for maximum performance, rock-solid stability, zero runtime JavaScript dependency, and instant global edge delivery:

```mermaid
graph TD
    User([Visitor / Recruiter / Client]) -->|HTTPS / HTTP3| CF[Cloudflare Global Anycast Edge Network<br/>Zone: tysonshields.com]
    
    subgraph Cloudflare Pages: tyson-shields-personal-website
        CF -->|tysonshields.com| RootStatic[Root Static Engine & SSG Output<br/>index.html, career.html, about.html, skills.html, contact.html]
        CF -->|/dashboard or /chat| Redir[Cloudflare Pages Edge 302 Redirect]
        CF -->|Static Assets| EdgeAssets[fonts/, scripts/, styles.min.css, images]
    end

    Redir -->|302 Redirect| WorkerApp[dashboard.tysonshields.com<br/>Cloudflare Worker AI Workspace]
    RootStatic -->|Instant Zero-JS Rendering| User
    EdgeAssets -->|Immutable CDN Cache| User
```

- **Production Static Delivery (Root):** High-speed, zero-dependency static pages (`index.html`, `about.html`, `career.html`, `skills.html`, `contact.html`, `Tyson-Shields-Resume.html`, `Tyson-Shields-Resume.pdf`) compiled with esbuild (`styles.min.css`), local Outfit typography, and vanilla progressive enhancement (`scripts/core.js`). Deployed globally via Cloudflare Pages.
- **Eleventy SSG Integration (`.eleventy.js`):** Built-in Eleventy 3.x templating engine supporting modular partials (`_includes/`) and base layouts (`_layouts/`) for compile-time generation.

---

## 📂 Directory Layout

```text
Tyson-Shields-Personal-Website/
├── docs/                             # Architecture blueprints & operational guidelines
│   ├── AGENT_GUIDELINES.md           # Engineering guidelines for developers & AI agents
│   └── ARCHITECTURE.md               # High-level system architecture overview
├── _includes/                        # Eleventy reusable partials (header, footer, drawer)
├── _layouts/                         # Base HTML layouts for static generation
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

## ⚡ Core Domain Specializations

- **Employee Benefits & Plan Modeling:** Self-funded stop-loss corridors, specific and aggregate attachment points, level-funded risk tiers, fully insured rate renewals, deductible modeling, and contribution strategies.
- **Census Data Engineering & Systems:** EDI 834 benefit enrollment feeds, high-volume census normalization, carrier billing reconciliation, and data parity audits.
- **Process Automation:** Transforming carrier RFP intake matrices into board-ready executive renewal presentations, compressing cycle times by 40%.
- **Broadcast & Live Media Systems:** Video routing, Dante audio networking, SMPTE 2110 IP video infrastructure, and live multi-camera broadcast switching.

---

## 🛠 Local Development & Operational Commands

All development tasks are automated through npm scripts in [`package.json`](file:///c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/package.json):

### 1. Minify Production CSS
```bash
npm run build
# Compiles styles.css -> styles.min.css via esbuild in ~15ms
```

### 2. Full Static Site Generator Build (Eleventy)
```bash
npm run build:ssg
# Minifies CSS with esbuild and builds static site into _site/ via @11ty/eleventy
```

### 3. Local Live-Reload Dev Server
```bash
npm run dev
# Starts Eleventy dev server with hot-reload at http://localhost:8080
```

### 4. Static HTTP Preview Server
```bash
npm run preview
# Serves root files directly at http://localhost:8000
```

### 5. Cloudflare Edge Status & Diagnostics
```bash
npm run cf:status
# Inspects real-time Cloudflare zone, DNS routing, and Pages deployment health
```

### 6. Cloudflare Global Edge Cache Purge
```bash
npm run cf:purge
# Triggers instant global cache invalidation across all 300+ Cloudflare PoPs
```

For full details on edge caching, security headers, and DNS topology, see **[`CLOUDFLARE.md`](CLOUDFLARE.md)**.

---

## ☁️ Cloudflare Edge & Ecosystem Integration

- **Production Domain:** `https://tysonshields.com` (Cloudflare Pages)
- **AI Workspace:** `https://dashboard.tysonshields.com` (Cloudflare Worker `dashboard` with Zero Trust Access)
- **Edge Routing & Forwarding:**
  - `_redirects` forwards `/dashboard` and `/chat` directly to `https://dashboard.tysonshields.com`.
  - `_headers` enforces HTTP/3, TLS 1.3 0-RTT, and immutable Cloudflare CDN caching for fonts, images, and minified assets.
  - Automatic minification active at the Cloudflare edge for HTML, CSS, and JS.

---

## 📖 Contributing & AI Agent Instructions

All engineers and automated AI coding assistants **must adhere** to the architectural specifications and content workflows detailed in **[`docs/AGENT_GUIDELINES.md`](docs/AGENT_GUIDELINES.md)**.

### Content Update Rules:
1. **Maintain Semantic Markup**: Keep narrative copy and layout in semantic HTML5 elements.
2. **Recompile CSS**: Always run `npm run build` after editing `styles.css` to regenerate `styles.min.css`.
3. **Preserve SEO JSON-LD schema**: Ensure structured schema data in page headers remains valid and synchronized.
4. **Test Before Commit**: Run `npm run build:ssg` to ensure zero compilation or templating regressions.

---

## 📄 License & Attribution

- Designed and engineered by **Tyson Shields**.
- Code licensed under the [MIT License](LICENSE).
