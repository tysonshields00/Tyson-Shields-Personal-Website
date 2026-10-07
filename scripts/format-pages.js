const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'about.html',
  'career.html',
  'skills.html',
  'contact.html'
];

pages.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix words right before <br> without a trailing space
  content = content.replace(/([a-zA-Z0-9.,;:&])<br>/g, '$1 <br>');

  // Identify active link based on file
  const activePage = file.replace('.html', '');
  
  function getNavLink(slug, label) {
    if (slug === activePage || (slug === 'index' && activePage === 'index')) {
      return `        <a aria-current="page" href="${slug === 'index' ? 'index.html' : slug + '.html'}">${label}</a>`;
    }
    return `        <a href="${slug === 'index' ? 'index.html' : slug + '.html'}">${label}</a>`;
  }

  const formattedHeader = `  <header class="site-header">
    <nav class="nav-shell" aria-label="Main navigation">
      <a class="brand" href="index.html">
        <span class="brand-mark">TS</span>
        <span>Tyson Shields</span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-links">
        <span class="sr-only">Toggle navigation</span>
        <span></span>
        <span></span>
      </button>
      <div class="nav-links" id="primary-links">
${getNavLink('index', 'Home')}
${getNavLink('about', 'About')}
${getNavLink('career', 'Career')}
${getNavLink('skills', 'Skills')}
${getNavLink('contact', 'Contact')}
        <button class="icon-button settings-trigger" type="button" aria-label="Open display settings" aria-controls="settings-drawer" aria-expanded="false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>
    </nav>
  </header>`;

  const formattedFooter = `  <footer class="site-footer">
    <a class="footer-skip" href="contact.html">Skip to contact information</a>
    <div class="section-shell footer-inner">
      <div>
        <a class="brand" href="index.html">
          <span class="brand-mark">TS</span>
          <span>Tyson Shields</span>
        </a>
        <address class="footer-location">Lincoln, Nebraska / Available for hybrid or remote work</address>
      </div>
      <div class="footer-links">
        <a href="about.html">About</a>
        <a href="career.html">Career</a>
        <a href="skills.html">Skills</a>
        <a href="contact.html">Contact</a>
        <a href="Tyson-Shields-Resume.pdf" download="Tyson-Shields-Resume.pdf">Download resume (PDF)</a>
        <a href="mailto:tysonshields00@gmail.com?subject=Portfolio%20inquiry" class="copy-email" data-email="tysonshields00@gmail.com">Email</a>
      </div>
      <p>© 2026 / Built with intention.</p>
    </div>
  </footer>`;

  // Replace header if compressed
  content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, formattedHeader);

  // Replace footer if compressed
  content = content.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, formattedFooter);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Formatted ${file}`);
});
