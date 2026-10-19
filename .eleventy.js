module.exports = function (eleventyConfig) {
  // Pass through static assets to output directory

  // Fonts & scripts
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("scripts");

  // Stylesheets
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("styles.min.css");

  // SEO, Redirects, Headers & PWA manifests
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // Assets (images, icons, docs)
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");

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
