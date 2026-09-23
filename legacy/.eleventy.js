module.exports = function (eleventyConfig) {
  // Pass through static assets to output directory

  // Fonts & scripts
  eleventyConfig.addPassthroughCopy({ "legacy/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "legacy/scripts": "scripts" });

  // Stylesheets
  eleventyConfig.addPassthroughCopy({ "legacy/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "legacy/styles.min.css": "styles.min.css" });

  // SEO & PWA manifests
  eleventyConfig.addPassthroughCopy({ "legacy/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "legacy/sitemap.xml": "sitemap.xml" });
  eleventyConfig.addPassthroughCopy({ "legacy/site.webmanifest": "site.webmanifest" });

  // Favicons & icons
  eleventyConfig.addPassthroughCopy({ "legacy/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "legacy/favicon-16x16.png": "favicon-16x16.png" });
  eleventyConfig.addPassthroughCopy({ "legacy/favicon-32x32.png": "favicon-32x32.png" });
  eleventyConfig.addPassthroughCopy({ "legacy/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy({ "legacy/android-chrome-192x192.png": "android-chrome-192x192.png" });
  eleventyConfig.addPassthroughCopy({ "legacy/android-chrome-512x512.png": "android-chrome-512x512.png" });
  eleventyConfig.addPassthroughCopy({ "legacy/icon.svg": "icon.svg" });

  // Images & media
  eleventyConfig.addPassthroughCopy({ "legacy/headshot.jpg": "headshot.jpg" });
  eleventyConfig.addPassthroughCopy({ "legacy/tyson-shields-headshot.jpg": "tyson-shields-headshot.jpg" });
  eleventyConfig.addPassthroughCopy({ "legacy/og-image.png": "og-image.png" });

  // Documents
  eleventyConfig.addPassthroughCopy({ "legacy/Tyson-Shields-Resume.pdf": "Tyson-Shields-Resume.pdf" });
  eleventyConfig.addPassthroughCopy({ "legacy/Tyson-Shields-Resume.html": "Tyson-Shields-Resume.html" });

  // Watch stylesheets
  eleventyConfig.addWatchTarget("./legacy/styles.css");
  eleventyConfig.addWatchTarget("./legacy/scripts/");

  return {
    dir: {
      input: "legacy",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};
