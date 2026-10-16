/**
 * @file scripts/format-pages.js
 * @description Page formatter and synchronization utility for tysonshields.com.
 * Synchronizes the accessible header navigation, command palette modal markup,
 * and settings drawer partial across all static pages.
 * 
 * Usage: npm run format:pages
 */

const fs = require('fs');
const path = require('path');

const standardPages = [
  'index.html',
  'about.html',
  'career.html',
  'skills.html',
  'contact.html',
  'calculator.html'
];

const drawerContent = fs.readFileSync(path.join(__dirname, '..', '_includes', 'settings-drawer.html'), 'utf8');

const paletteModal = `  <!-- Global Command Palette Modal (Ctrl+K) -->
  <div class="palette-backdrop" id="palette-backdrop" aria-hidden="true"></div>
  <div class="command-palette-modal" id="command-palette" role="dialog" aria-modal="true" aria-label="Command Palette" aria-hidden="true">
    <div class="palette-search-bar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="palette-search-icon" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input type="text" id="palette-input" class="palette-input" placeholder="Type a command, page, or action... (Esc to close)" autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-controls="palette-list">
      <kbd class="palette-kbd-badge">ESC</kbd>
    </div>
    <div class="palette-results" id="palette-list" role="listbox"></div>
    <div class="palette-empty" id="palette-empty" style="display: none;">
      <p>No matching commands found.</p>
    </div>
    <div class="palette-footer">
      <div class="palette-tips">
        <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
        <span><kbd>↵</kbd> Select</span>
        <span><kbd>ESC</kbd> Close</span>
      </div>
      <span class="palette-branding">Tyson Shields • Command Palette</span>
    </div>
  </div>`;

const themeInitScript = `  <script>
    (function(){try{var raw=localStorage.getItem('tyson-shields-preferences-v2');if(raw){var p=JSON.parse(raw);var r=document.documentElement;if(p.theme){r.dataset.theme=(p.theme==='navy')?'dark':p.theme;var c={dark:'#0a0f1d',navy:'#0a0f1d',slate:'#0e1217',light:'#f8fafc',reading:'#f5edd6'};var m=document.querySelector('meta[name="theme-color"]');if(m&&c[r.dataset.theme])m.setAttribute('content',c[r.dataset.theme]);}if(p.accent)r.dataset.accent=p.accent;if(p.density)r.dataset.density=p.density;if(p.contrast)r.dataset.contrast=p.contrast;if(p.fontSize)r.dataset.fontSize=p.fontSize;if(p.reducedMotion!==undefined)r.dataset.reducedMotion=String(p.reducedMotion);if(p.underlineLinks!==undefined)r.dataset.underlineLinks=String(p.underlineLinks);if(p.readableFont!==undefined)r.dataset.readableFont=String(p.readableFont);}}catch(e){}})();
  </script>`;

function syncThemeScript(html) {
  html = html.replace(/<html\b[^>]*>/i, '<html lang="en-US" data-theme="navy" data-accent="blue" data-density="spacious">');
  html = html.replace(/<script>\s*\(function\(\)\s*\{[\s\S]*?localStorage\.getItem\('tyson-shields-preferences-v2'\)[\s\S]*?<\/script>\s*/i, '');
  html = html.replace(/(\s*)(<link\s+rel="stylesheet"\s+href="styles\.min\.css">)/i, `\n${themeInitScript}\n$1$2`);
  return html;
}

standardPages.forEach(file => {
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
        <button class="icon-button palette-trigger" type="button" aria-label="Search site &amp; commands (Ctrl+K)" title="Quick Search &amp; Command Palette (Ctrl+K)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button class="icon-button settings-trigger" type="button" aria-label="Open display settings" aria-controls="settings-drawer" aria-expanded="false" title="Customize Appearance &amp; Themes">
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
        <address class="footer-location">Lincoln, Nebraska / Hybrid &amp; Remote</address>
      </div>
      <div class="footer-links">
        <a href="about.html">About</a>
        <a href="career.html">Career</a>
        <a href="skills.html">Skills</a>
        <a href="contact.html">Contact</a>
        <a href="Tyson-Shields-Resume.pdf" download="Tyson-Shields-Resume.pdf">Resume (PDF)</a>
        <a href="mailto:tysonshields00@gmail.com?subject=Portfolio%20inquiry" class="copy-email" data-email="tysonshields00@gmail.com">Email</a>
      </div>
      <p>© 2026 / Built with intention.</p>
    </div>
  </footer>`;

  // Replace header
  content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, formattedHeader);

  // Replace footer
  content = content.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, formattedFooter);

  // Sync theme script and attributes
  content = syncThemeScript(content);
  if (file === 'calculator.html') {
    content = content.replace(/<style>[\s\S]*?<\/style>\s*/, '');
  }

  // Replace or inject drawer
  if (content.includes('<aside class="settings-drawer"')) {
    content = content.replace(/<div class="drawer-backdrop"[\s\S]*?<\/aside>/, drawerContent.trim());
  } else {
    content = content.replace('</body>', `${drawerContent.trim()}\n</body>`);
  }

  // Replace or inject palette modal
  if (content.includes('id="command-palette"')) {
    content = content.replace(/<div class="palette-backdrop" id="palette-backdrop"[\s\S]*?<\/div>\s*<\/div>/, paletteModal.trim());
  } else {
    content = content.replace('</body>', `${paletteModal.trim()}\n</body>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Formatted ${file}`);
});

// Also format Tyson-Shields-Resume.html
const resumePath = path.join(__dirname, '..', 'Tyson-Shields-Resume.html');
if (fs.existsSync(resumePath)) {
  let resumeContent = fs.readFileSync(resumePath, 'utf8');
  resumeContent = syncThemeScript(resumeContent);
  if (resumeContent.includes('<aside class="settings-drawer"')) {
    resumeContent = resumeContent.replace(/<div class="drawer-backdrop"[\s\S]*?<\/aside>/, drawerContent.trim());
  } else {
    resumeContent = resumeContent.replace('</body>', `${drawerContent.trim()}\n</body>`);
  }
  if (!resumeContent.includes('id="command-palette"')) {
    resumeContent = resumeContent.replace('</body>', `${paletteModal.trim()}\n</body>`);
  }
  fs.writeFileSync(resumePath, resumeContent, 'utf8');
  console.log('Formatted Tyson-Shields-Resume.html');
}

// Also format 404.html to include header, drawer, and command palette
const errorPagePath = path.join(__dirname, '..', '404.html');
if (fs.existsSync(errorPagePath)) {
  let errorContent = fs.readFileSync(errorPagePath, 'utf8');
  errorContent = syncThemeScript(errorContent);
  
  const errorHeader = `  <header class="site-header">
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
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="career.html">Career</a>
        <a href="skills.html">Skills</a>
        <a href="contact.html">Contact</a>
        <button class="icon-button palette-trigger" type="button" aria-label="Search site &amp; commands (Ctrl+K)" title="Quick Search &amp; Command Palette (Ctrl+K)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button class="icon-button settings-trigger" type="button" aria-label="Open display settings" aria-controls="settings-drawer" aria-expanded="false" title="Customize Appearance &amp; Themes">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>
    </nav>
  </header>`;

  if (!errorContent.includes('<header class="site-header">')) {
    errorContent = errorContent.replace('<main id="main-content"', `${errorHeader}\n  <main id="main-content"`);
  }
  if (!errorContent.includes('<aside class="settings-drawer"')) {
    errorContent = errorContent.replace('</body>', `${drawerContent.trim()}\n</body>`);
  } else {
    errorContent = errorContent.replace(/<div class="drawer-backdrop"[\s\S]*?<\/aside>/, drawerContent.trim());
  }
  if (!errorContent.includes('id="command-palette"')) {
    errorContent = errorContent.replace('</body>', `${paletteModal.trim()}\n</body>`);
  }

  fs.writeFileSync(errorPagePath, errorContent, 'utf8');
  console.log('Formatted 404.html');
}
