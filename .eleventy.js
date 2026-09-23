module.exports = function (eleventyConfig) {
  // Pass through static assets to output directory

  // Fonts & scripts
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("scripts");

  // Stylesheets
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("styles.min.css");

  // SEO & PWA manifests
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // Favicons & icons
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("icon.svg");

  // Images & media
  eleventyConfig.addPassthroughCopy("headshot.jpg");
  eleventyConfig.addPassthroughCopy("tyson-shields-headshot.jpg");
  eleventyConfig.addPassthroughCopy("og-image.png");

  // Documents
  eleventyConfig.addPassthroughCopy("Tyson-Shields-Resume.pdf");
  eleventyConfig.addPassthroughCopy("Tyson-Shields-Resume.html");

  // Watch stylesheets and scripts
  eleventyConfig.addWatchTarget("./styles.css");
  eleventyConfig.addWatchTarget("./scripts/");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};
