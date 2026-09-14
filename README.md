# Tyson Shields Personal Website

A modern, high-performance personal portfolio built with semantic HTML5, cybernetic CSS, and vanilla JavaScript. Optimized for accessibility (WCAG AA), fast mobile load times, crisp typography, and direct deployability to Cloudflare Pages, Netlify, or Vercel.

## Architecture & Improvements

- **Modern Fonts & Optimization**: TrueType fonts converted to modern WOFF2 (`outfit-400-latin.woff2` and `outfit-700-latin.woff2`), reducing font payload by >85% (from 288 KB to ~37 KB). Preloaded in document head with `font-display: swap`.
- **Modular Scripts**: JavaScript separated into shared `scripts/core.js` (theme management, drawer, command palette, ambient canvas, link prefetch) and page-specific scripts (`scripts/home.js`, `scripts/contact.js`, `scripts/404.js`), all loaded with `defer`.
- **Minified Stylesheet**: Automated minification produces `styles.min.css` using `esbuild`.
- **Component-Based Templating**: Reusable components (`_includes/header.html`, `_includes/footer.html`, `_includes/settings-drawer.html`, `_layouts/base.html`) powered by Eleventy (11ty) while preserving zero-dependency static production output.
- **Accessibility & Semantics**:
  - Skip links to `#main-content` on every page.
  - Interactive touch targets span at least 44x44 px.
  - High-contrast text ratios conforming to WCAG AA (>= 4.5:1).
  - Semantic `<time datetime="...">` tags on `career.html`.
  - Structured `<ul>` proficiency lists on `skills.html`.
- **Downloadable PDF Resume & Print Rules**: Clean `Tyson-Shields-Resume.pdf` generated with headless Edge and print stylesheet rules (`@media print`) hiding navigation, buttons, and footers for black-on-white resume printing.
- **Complete Favicon Bundle & Open Graph**: Standard 32x32, 16x16, Apple touch icons, legacy `favicon.ico`, updated `site.webmanifest`, and 1200x630 `og-image.png` preview cards.
- **SEO & Search Indexing**: Unique titles, tailored meta descriptions, canonical URLs, updated `sitemap.xml`, and crawler configuration in `robots.txt` blocking non-public directories.
- **Security Headers & 404 Handling**: `_headers`, `_redirects`, and `vercel.json` enforce Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, and proper HTTP 404 status codes.
- **Contact Form Validation**: Pattern validation, required attributes, real-time feedback, and invisible honeypot field for bot spam prevention.

## Local Development

### Preview Static Site
```sh
npm run preview
# or: python -m http.server 8000
```
Open `http://localhost:8000`.

### Build Commands
```sh
# Minify stylesheet
npm run build

# Build with Eleventy SSG
npm run build:ssg

# Start local Eleventy live-reload dev server
npm run dev
```

## Deployment

### Cloudflare Pages
- **Build command**: `npm run build` (or leave empty to deploy pre-built static root)
- **Output directory**: `.` (or `_site` if using Eleventy SSG)
- Security headers and 404 redirects are automatically picked up from `_headers` and `_redirects`.
