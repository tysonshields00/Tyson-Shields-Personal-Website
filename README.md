# Tyson Shields Personal Website

A dependency-free personal portfolio built with semantic HTML, modern CSS, and vanilla JavaScript. It is designed to deploy directly to Cloudflare Pages with no build command.

## Local preview

From the project directory, run a static server such as:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `index.html` contains the public portfolio and project filters.
- `styles.css` contains the responsive design system and theme variants.
- `script.js` handles filters, navigation, the settings drawer, and saved preferences.
- `dev/index.html` is a separate experimental workspace route and is not included in the public project grid.

The settings drawer supports Dark Navy, Deep Slate, and Clean Light themes; electric blue, neon teal, and crisp white accents; spacious or compact density; and reduced motion. Choices persist in `localStorage` for the current browser. The `/dev/` path is intentionally not an authentication boundary.

## Cloudflare Pages

Connect the repository to Cloudflare Pages with the project root as the output directory. Leave the build command empty because the site is already deployable static HTML. Every push can then receive a preview deployment automatically.

