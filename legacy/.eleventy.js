module.exports = function (eleventyConfig) {
  // Pass through static assets to output directory
  eleventyConfig.addPassthroughCopy({ "legacy/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "legacy/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy({ "legacy/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "legacy/styles.min.css": "styles.min.css" });
  eleventyConfig.addPassthroughCopy({ "legacy/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "legacy/sitemap.xml": "sitemap.xml" });
  eleventyConfig.addPassthroughCopy({ "legacy/site.webmanifest": "site.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "legacy/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "legacy/tyson-shields-headshot.jpg": "tyson-shields-headshot.jpg" });
  eleventyConfig.addPassthroughCopy({ "legacy/Tyson-Shields-Resume.pdf": "Tyson-Shields-Resume.pdf" });

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
