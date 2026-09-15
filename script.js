// Developer console greetings
console.log(
  `%c
████████╗██╗   ██╗███████╗ ██████╗ ███╗   ██╗
╚══██╔══╝╚██╗ ██╔╝██╔════╝██╔═══██╗████╗  ██║
   ██║    ╚████╔╝ ███████╗██║   ██║██╔██╗ ██║
   ██║     ╚██╔╝  ╚════██║██║   ██║██║╚██╗██║
   ██║      ██║   ███████║╚██████╔╝██║ ╚████║
   ╚═╝      ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
Tyson Shields — Data Analytics, Systems & Media Production
Lincoln, Nebraska · https://github.com/tysonshields
`,
  'color: #0ea5e9; font-weight: bold; font-family: monospace; font-size: 11px;'
);

// Global unhandled error handler to briefly flash status dot red
window.addEventListener('error', () => {
  const dot = document.querySelector('.status-dot');
  if (dot) {
    dot.classList.add('is-error');
    setTimeout(() => dot.classList.remove('is-error'), 2200);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const storageKey = 'tyson-shields-preferences-v2';
  const defaults = { theme: 'navy', accent: 'blue', density: 'spacious', reducedMotion: false };
  const valid = {
    theme: ['navy', 'slate', 'obsidian', 'matrix', 'amber', 'light'],
    accent: ['blue', 'teal', 'emerald', 'amber', 'purple', 'white'],
    density: ['spacious', 'compact'],
  };
  const themeColors = {
    navy: '#070c18',
    slate: '#0e1217',
    obsidian: '#020408',
    matrix: '#030a06',
    amber: '#0a0703',
    light: '#f5f7fa'
  };

  // Detect data saver
  if (navigator.connection?.saveData) {
    defaults.reducedMotion = true;
    root.dataset.reducedMotion = 'true';
  }

  // Pre-cached DOM queries
  const drawer = document.querySelector('.settings-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const menu = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const settingsTrigger = document.querySelector('.settings-trigger');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const statusDot = document.querySelector('.status-dot');
  const clockEl = document.getElementById('dashboard-clock');
  const contactForm = document.getElementById('contact-form');
  const formConfirmation = document.getElementById('form-confirmation');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const copyAnchors = document.querySelectorAll('.copy-anchor');
  const copyEmails = document.querySelectorAll('.copy-email');
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');

  let drawerReturnFocus = settingsTrigger;
  let paletteReturnFocus = null;
  let paletteDebounce;

  const closeMobileNav = () => {
    navLinks?.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
  };

  const normalizeFilename = (pathStr) => {
    if (!pathStr) return 'index.html';
    const segments = pathStr.split(/[/\\]+/);
    let last = segments.pop() || '';
    last = last.split(/[?#]/)[0].toLowerCase().trim();
    if (!last || last === '' || last === '/') return 'index.html';
    if (!last.includes('.')) return `${last}.html`;
    return last;
  };

  const currentFile = normalizeFilename(window.location.pathname);
  const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];
  let currentActiveFound = false;

  navAnchors.forEach((link) => {
    const rawHref = link.getAttribute('href') || '';
    let linkFile = '';
    try {
      linkFile = normalizeFilename(new URL(link.href, window.location.href).pathname);
    } catch (e) {
      linkFile = normalizeFilename(rawHref);
    }
    const isMatch = linkFile === currentFile || normalizeFilename(rawHref) === currentFile;
    const hasStaticCurrent = link.getAttribute('aria-current') === 'page';

    if (isMatch || hasStaticCurrent) {
      currentActiveFound = true;
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-active');
    }
  });

  if (currentActiveFound) {
    navAnchors.forEach((link) => {
      const rawHref = link.getAttribute('href') || '';
      let linkFile = '';
      try {
        linkFile = normalizeFilename(new URL(link.href, window.location.href).pathname);
      } catch (e) {
        linkFile = normalizeFilename(rawHref);
      }
      const isMatch = linkFile === currentFile || normalizeFilename(rawHref) === currentFile;
      const hasStaticCurrent = link.getAttribute('aria-current') === 'page';
      if (!isMatch && !hasStaticCurrent) {
        link.removeAttribute('aria-current');
        link.classList.remove('is-active');
      }
    });
  }

  // Ensure clicked link lights up immediately when switching tabs
  navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
      navAnchors.forEach((other) => {
        other.removeAttribute('aria-current');
        other.classList.remove('is-active');
      });
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-active');
    });
  });

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const isProfile = link.href.includes('github.com') || link.href.includes('linkedin.com');
    link.setAttribute('rel', isProfile ? 'noopener noreferrer me' : 'noopener noreferrer');
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    const url = new URL(link.href);
    if (!url.searchParams.has('subject')) url.searchParams.set('subject', 'Portfolio inquiry');
    link.href = url.href;
  });

  document.querySelectorAll('form input, form select, form textarea').forEach((field) => field.setAttribute('autocomplete', 'off'));

  document.querySelectorAll('.career-date').forEach((dateBlock) => {
    const dateText = dateBlock.firstChild?.textContent?.trim();
    if (!dateText || dateBlock.querySelector('time')) return;
    const time = document.createElement('time');
    time.dateTime = dateText.split('—')[0].trim().replace(/\s+/g, '-');
    time.textContent = dateText;
    dateBlock.replaceChild(time, dateBlock.firstChild);
  });

  // Link prefetching on mouseenter / touchstart
  const prefetchedUrls = new Set();
  const prefetchLink = (url) => {
    if (!url || prefetchedUrls.has(url) || url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('#')) return;
    prefetchedUrls.add(url);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  };
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('mailto:') && !href.startsWith('http') && !href.startsWith('#')) {
      link.addEventListener('mouseenter', () => prefetchLink(href), { passive: true, once: true });
      link.addEventListener('touchstart', () => prefetchLink(href), { passive: true, once: true });
    }
  });

  // Copy email to clipboard
  copyEmails.forEach((elem) => {
    elem.addEventListener('click', async (e) => {
      const email = elem.dataset.email || 'tysonshields00@gmail.com';
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(email);
          const target = elem.querySelector('.email-text') || elem;
          const original = target.textContent;
          target.textContent = 'Copied!';
          elem.dataset.copied = 'true';
          setTimeout(() => {
            target.textContent = original;
            delete elem.dataset.copied;
          }, 1800);
        } catch (err) {
          // Ignore error and allow mailto default
        }
      }
    });
  });

  // Live clock formatting with Intl.DateTimeFormat
  if (clockEl) {
    const dtf = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const updateClock = () => {
      clockEl.textContent = `${dtf.format(new Date())} CST`;
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Contact form submission handling
  if (contactForm && formConfirmation) {
    contactForm.addEventListener('submit', () => {
      contactForm.classList.add('is-hidden');
      formConfirmation.classList.remove('is-hidden');
    });
    resetFormBtn?.addEventListener('click', () => {
      contactForm.reset();
      formConfirmation.classList.add('is-hidden');
      contactForm.classList.remove('is-hidden');
    });
  }

  if (navLinks && !navLinks.querySelector('.command-trigger')) {
    navLinks.insertAdjacentHTML(
      'beforeend',
      '<button class="icon-button command-trigger" type="button" aria-label="Open command palette">⌘K</button>'
    );
  }

  const loadPreferences = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return { ...defaults, ...saved };
    } catch (error) {
      return { ...defaults };
    }
  };

  let preferences = loadPreferences();
  Object.keys(valid).forEach((key) => {
    if (!valid[key].includes(preferences[key])) preferences[key] = defaults[key];
  });
  preferences.reducedMotion = Boolean(preferences.reducedMotion);

  const savePreferences = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch (error) {
      /* Storage may be unavailable in private browsing. */
    }
  };

  const updatePreferenceDom = () => {
    root.dataset.theme = preferences.theme;
    root.dataset.accent = preferences.accent;
    root.dataset.density = preferences.density;
    root.dataset.reducedMotion = preferences.reducedMotion;

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', themeColors[preferences.theme] || '#0a0f1d');
    }

    document.querySelectorAll('[data-setting]').forEach((control) => {
      const setting = control.dataset.setting;
      const selected = setting === 'motion'
        ? preferences.reducedMotion
        : preferences[setting] === control.dataset.value;
      control.classList.toggle('is-selected', selected);
      if (control.matches('.toggle')) {
        control.classList.toggle('is-on', preferences.reducedMotion);
        control.setAttribute('aria-checked', String(preferences.reducedMotion));
      }
      if (control.dataset.setting === 'theme') control.setAttribute('aria-expanded', String(selected));
    });
  };

  const applyPreferences = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => updatePreferenceDom());
    } else {
      updatePreferenceDom();
    }
  };

  const setDrawer = (isOpen) => {
    drawer?.classList.toggle('is-open', isOpen);
    backdrop?.classList.toggle('is-visible', isOpen);
    drawer?.setAttribute('aria-hidden', String(!isOpen));
    settingsTrigger?.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('drawer-open', isOpen);
    if (isOpen) {
      drawerReturnFocus = document.activeElement;
      drawer?.querySelector('.drawer-close')?.focus();
    } else {
      drawerReturnFocus?.focus();
    }
  };

  if (drawer && backdrop) {
    settingsTrigger?.addEventListener('click', () => { closeMobileNav(); setDrawer(true); });
    drawer.querySelector('.drawer-close')?.addEventListener('click', () => setDrawer(false));
    backdrop.addEventListener('click', () => setDrawer(false));
    document.querySelectorAll('[data-setting]').forEach((control) => {
      control.addEventListener('click', () => {
        if (control.dataset.setting === 'motion') preferences.reducedMotion = !preferences.reducedMotion;
        else preferences[control.dataset.setting] = control.dataset.value;
        applyPreferences();
        savePreferences();
      });
    });

    document.querySelector('[data-reset]')?.addEventListener('click', () => {
      preferences = { ...defaults };
      applyPreferences();
      savePreferences();
    });
  }

  menu?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    closeMobileNav();
  }));

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      projectCards.forEach((card) => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });

  const commandItems = [
    ['Home', 'index.html', 'Main command center'],
    ['About', 'about.html', 'Story, honors, and philosophy'],
    ['Career', 'career.html', 'Verified professional history'],
    ['Skills', 'skills.html', 'Technical domains and applications'],
    ['Contact', 'contact.html', 'Start a conversation'],
    ['Resume', 'Tyson-Shields-Resume.html', 'Downloadable career summary']
  ];
  const paletteMarkup = [
    '<div class="palette-backdrop" data-close-palette></div>',
    '<dialog class="command-palette" aria-labelledby="palette-title">',
    '<div class="palette-header">',
    '<h2 id="palette-title">Navigate</h2>',
    '<button class="icon-button palette-close" type="button" aria-label="Close command palette">×</button>',
    '</div>',
    '<label class="sr-only" for="palette-search">Search pages</label>',
    '<div class="palette-search-wrap"><input id="palette-search" class="palette-search" type="search" placeholder="Search pages..." autocomplete="off" spellcheck="false"><button class="palette-clear" type="button" aria-label="Clear search">×</button></div>',
    '<div class="palette-results" role="listbox" aria-live="polite" aria-atomic="true"></div>',
    '<p class="palette-hint"><kbd>↑</kbd> <kbd>↓</kbd> to move · <kbd>↵</kbd> to open · <kbd>Esc</kbd> to close</p>',
    '</dialog>',
  ].join('');
  document.body.insertAdjacentHTML('beforeend', paletteMarkup);
  const palette = document.querySelector('.command-palette');
  const paletteBackdrop = document.querySelector('.palette-backdrop');
  const paletteSearch = document.querySelector('.palette-search');
  const paletteResults = document.querySelector('.palette-results');
  let paletteIndex = 0;

  const renderPalette = (query = '') => {
    const filtered = commandItems.filter(
      ([name, path, description]) => `${name} ${path} ${description}`.toLowerCase().includes(query.toLowerCase())
    );
    paletteResults.innerHTML = filtered
      .map(
        ([name, path, description], index) =>
          `<a class="palette-result${index === 0 ? ' is-active' : ''}${localStorage.getItem('tyson-last-page') === path ? ' is-visited' : ''}" role="option" href="${path}"` +
          ` data-palette-index="${index}"><strong>${name}</strong><span>${description}</span><b>↗</b></a>`
      )
      .join('') || '<p class="palette-empty">No matching pages.</p>';
    paletteIndex = 0;
  };
  const setPalette = (isOpen) => {
    if (isOpen) {
      if (drawer?.classList.contains('is-open')) setDrawer(false);
      paletteReturnFocus = document.activeElement;
      if (!palette.open) palette.showModal();
      requestAnimationFrame(() => paletteBackdrop.classList.add('is-visible'));
      paletteSearch.value = '';
      renderPalette();
      requestAnimationFrame(() => paletteSearch.focus({ preventScroll: true }));
    } else {
      paletteBackdrop.classList.remove('is-visible');
      if (palette.open) palette.close();
      paletteSearch.value = '';
      renderPalette();
      paletteReturnFocus?.focus();
    }
  };
  const commandTrigger = document.querySelector('.command-trigger');
  commandTrigger?.addEventListener('click', () => { closeMobileNav(); setPalette(true); });
  document.querySelector('.palette-close')?.addEventListener('click', () => setPalette(false));
  paletteBackdrop?.addEventListener('click', () => setPalette(false));
  paletteSearch?.addEventListener('input', () => { clearTimeout(paletteDebounce); paletteDebounce = setTimeout(() => renderPalette(paletteSearch.value), 120); });
  paletteSearch?.addEventListener('keydown', (event) => {
    const results = [...paletteResults.querySelectorAll('.palette-result')];
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && results.length) {
      event.preventDefault();
      paletteIndex = (paletteIndex + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
      results.forEach((result, index) => result.classList.toggle('is-active', index === paletteIndex));
      results[paletteIndex]?.scrollIntoView({ block: 'nearest' });
    }
    if (event.key === 'Enter' && results[paletteIndex]) {
      event.preventDefault();
      localStorage.setItem('tyson-last-page', results[paletteIndex].getAttribute('href'));
      window.location.href = results[paletteIndex].href;
    }
    if (event.key === 'Escape') setPalette(false);
  });
  document.querySelector('.palette-clear')?.addEventListener('click', () => { paletteSearch.value = ''; renderPalette(); paletteSearch.focus(); });
  palette?.addEventListener('close', () => {
    paletteBackdrop.classList.remove('is-visible');
    paletteSearch.value = '';
    renderPalette();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && drawer?.classList.contains('is-open')) {
      const focusable = [...drawer.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((item) => !item.hasAttribute('disabled'));
      if (focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    if (event.key === 'Escape') {
      if (palette?.open) { setPalette(false); return; }
      if (drawer?.classList.contains('is-open')) { setDrawer(false); return; }
      closeMobileNav();
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      closeMobileNav();
      setPalette(true);
    }
    if (event.key === '/' && document.activeElement !== paletteSearch && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      setPalette(true);
    }
  });

  copyAnchors.forEach((anchor) => anchor.addEventListener('click', async (event) => {
    event.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}${anchor.hash}`;
    try {
      await navigator.clipboard.writeText(url);
      anchor.dataset.copied = 'Copied';
      setTimeout(() => delete anchor.dataset.copied, 1200);
    } catch (error) {
      window.location.hash = anchor.hash;
    }
  }));

  const topButton = document.createElement('button');
  topButton.className = 'back-to-top';
  topButton.type = 'button';
  topButton.setAttribute('aria-label', 'Back to top');
  topButton.textContent = '↑';
  document.body.append(topButton);
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: preferences.reducedMotion ? 'auto' : 'smooth' }));

  const updateTopButton = () => topButton.classList.toggle('is-visible', window.scrollY > document.documentElement.scrollHeight / 2);
  let scrollRaf = 0;
  window.addEventListener('scroll', () => {
    if (!scrollRaf) {
      scrollRaf = requestAnimationFrame(() => {
        updateTopButton();
        scrollRaf = 0;
      });
    }
  }, { passive: true });
  updateTopButton();

  const countdown = document.querySelector('[data-countdown]');
  if (countdown) {
    let remaining = 5;
    const timer = setInterval(() => { remaining -= 1; countdown.textContent = String(remaining); if (remaining <= 0) { clearInterval(timer); window.location.href = '/'; } }, 1000);
  }

  const motionOK = () => !preferences.reducedMotion
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initScrollReveals = () => {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window) || !motionOK()) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const staggerGroups = ['.pillar-grid', '.metric-grid', '.routing-links', '.project-grid', '.skills-grid'];
    staggerGroups.forEach((sel) => {
      document.querySelectorAll(sel).forEach((group) => {
        [...group.children].forEach((child, i) => {
          child.style.setProperty('--reveal-delay', `${Math.min(i * 90, 540)}ms`);
        });
      });
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((el) => io.observe(el));
  };

  const initSpotlights = () => {
    if (!motionOK() || window.matchMedia('(pointer: coarse)').matches) return;
    const cards = document.querySelectorAll('.project-card, .skill-group, .glass-card');
    cards.forEach((card) => {
      let raf = 0;
      card.addEventListener('pointermove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--x', `${e.clientX - r.left}px`);
          card.style.setProperty('--y', `${e.clientY - r.top}px`);
          raf = 0;
        });
      });
    });
  };

  const initMagneticButtons = () => {
    if (!motionOK() || window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.button').forEach((btn) => {
      let raf = 0;
      btn.addEventListener('mousemove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          btn.style.setProperty('--mx', `${(x * 6).toFixed(2)}px`);
          btn.style.setProperty('--my', `${(y * 5).toFixed(2)}px`);
          raf = 0;
        });
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mx', '0px');
        btn.style.setProperty('--my', '0px');
      });
    });
  };

  const initAmbientCanvas = () => {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas || !('getContext' in canvas)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const accentPalettes = {
      blue: ['rgba(0, 240, 255, ', 'rgba(56, 189, 248, ', 'rgba(14, 165, 233, '],
      teal: ['rgba(16, 240, 192, ', 'rgba(94, 234, 212, ', 'rgba(20, 184, 166, '],
      emerald: ['rgba(16, 185, 129, ', 'rgba(52, 211, 153, ', 'rgba(5, 150, 105, '],
      amber: ['rgba(245, 158, 11, ', 'rgba(251, 191, 36, ', 'rgba(217, 119, 6, '],
      purple: ['rgba(168, 85, 247, ', 'rgba(192, 132, 252, ', 'rgba(124, 58, 237, '],
      white: ['rgba(248, 250, 252, ', 'rgba(226, 232, 240, ', 'rgba(203, 213, 225, '],
    };

    if (!motionOK()) {
      ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
      for (let i = 0; i < 24; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    const particleCount = Math.min(Math.floor((width * height) / 32000), 48);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 1,
        colorIndex: i % 3,
        baseAlpha: Math.random() * 0.4 + 0.3,
      });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('pointermove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('pointerleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const activeAccent = root.dataset.accent || 'blue';
      const palette = accentPalettes[activeAccent] || accentPalettes.blue;

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.16;
            ctx.strokeStyle = `${palette[0]}${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to cursor
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const malpha = (1 - mdist / 140) * 0.35;
          ctx.strokeStyle = `${palette[0]}${malpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          p1.x += mdx * 0.005;
          p1.y += mdy * 0.005;
        }

        // Draw particle node
        ctx.fillStyle = `${palette[p1.colorIndex]}${p1.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Drift physics
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        else if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        else if (p1.y > height) p1.y = 0;
      }

      requestAnimationFrame(render);
    };

    render();
  };

  const initRadarGame = () => {
    const screen = document.getElementById('radar-screen');
    const layer = document.getElementById('radar-game-layer');
    const idleBanner = document.getElementById('radar-idle-banner');
    const startBtn = document.getElementById('radar-start-btn');
    const btnText = document.getElementById('radar-btn-text');
    const scoreEl = document.getElementById('radar-score');
    const highEl = document.getElementById('radar-high');
    const timerEl = document.getElementById('radar-timer');
    const comboEl = document.getElementById('radar-combo');
    const debrief = document.getElementById('radar-debrief');
    const debriefScore = document.getElementById('debrief-score');
    const debriefStat = document.getElementById('debrief-stat');
    const debriefRank = document.getElementById('debrief-rank');
    const retryBtn = document.getElementById('radar-retry-btn');
    const audioBtn = document.getElementById('radar-audio-btn');
    const audioIcon = document.getElementById('audio-icon');
    const radarSweep = document.getElementById('radar-sweep');
    const statusMsg = document.getElementById('radar-status-msg');

    if (!screen || !layer) return;

    let isPlaying = false;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('ts-radar-high-score') || '0', 10);
    let timeLeft = 30;
    let combo = 1;
    let maxCombo = 1;
    let interceptsCount = 0;
    let comboTimer = null;
    let gameTimer = null;
    let spawnTimer = null;
    let audioCtx = null;
    let audioMuted = localStorage.getItem('ts-radar-audio-muted') === 'true';

    // Update initial audio button icon
    if (audioIcon) {
      audioIcon.textContent = audioMuted ? '🔇' : '🔊';
    }
    if (audioBtn) {
      audioBtn.setAttribute('aria-pressed', String(!audioMuted));
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioMuted = !audioMuted;
        localStorage.setItem('ts-radar-audio-muted', String(audioMuted));
        if (audioIcon) audioIcon.textContent = audioMuted ? '🔇' : '🔊';
        audioBtn.setAttribute('aria-pressed', String(!audioMuted));
      });
    }

    if (highEl) highEl.textContent = String(highScore);

    // Dynamic target pool
    const activeTargets = new Map(); // id -> { id, el, x, y, type, points, timeout }
    let targetCounter = 0;

    // High-performance 0 KB Web Audio API Synthesizer
    const playAudio = (type, pitchMultiplier = 1) => {
      if (audioMuted) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtx) {
          audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'hit') {
          const baseFreq = 480 * pitchMultiplier;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.08);
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
        } else if (type === 'bonus') {
          // Triad power chord arpeggio
          const freqs = [523.25, 659.25, 783.99, 1046.5];
          freqs.forEach((f, idx) => {
            const subOsc = audioCtx.createOscillator();
            const subGain = audioCtx.createGain();
            subOsc.type = 'triangle';
            subOsc.frequency.setValueAtTime(f, now + idx * 0.045);
            subGain.gain.setValueAtTime(0.12, now + idx * 0.045);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.045 + 0.12);
            subOsc.connect(subGain);
            subGain.connect(audioCtx.destination);
            subOsc.start(now + idx * 0.045);
            subOsc.stop(now + idx * 0.045 + 0.14);
          });
        } else if (type === 'miss') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
        } else if (type === 'laser') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          osc.start(now);
          osc.stop(now + 0.07);
        } else if (type === 'start') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(280, now);
          osc.frequency.exponentialRampToValueAtTime(840, now + 0.18);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
        } else if (type === 'over') {
          const notes = [440, 370, 311, 220];
          notes.forEach((f, idx) => {
            const subOsc = audioCtx.createOscillator();
            const subGain = audioCtx.createGain();
            subOsc.type = 'sine';
            subOsc.frequency.setValueAtTime(f, now + idx * 0.07);
            subGain.gain.setValueAtTime(0.12, now + idx * 0.07);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.15);
            subOsc.connect(subGain);
            subGain.connect(audioCtx.destination);
            subOsc.start(now + idx * 0.07);
            subOsc.stop(now + idx * 0.07 + 0.16);
          });
        }
      } catch (e) {
        // Fallback gracefully if audio permissions are denied
      }
    };

    const normalAnomalies = [
      'SIG_01: ETL_CORRUPT',
      'PORT_SCAN: 8080',
      'MEMORY_LEAK',
      'SQL_INJECTION',
      '404_DRIFT',
      'RUNDOWN_DELAY',
      'API_TIMEOUT',
      'NULL_PTR_EXCP',
      'BUFFER_OVERFLOW',
    ];

    const rogueAnomalies = [
      'ROGUE_PACKET // RED',
      'ZERO_DAY // CRIT',
      'DDOS_BURST // 10G',
      'HOSTILE_PROBE',
    ];

    const bonusRelays = [
      '[POWER_QUERY_SYNC]',
      '[PYTHON_ETL_CORE]',
      '[PROXMOX_NODE]',
      '[LIVE_FEED_10/11]',
    ];

    // Visual ripple effect at coordinate
    const showHitEffect = (px, py, points, isBonus, isComboBonus) => {
      const ripple = document.createElement('div');
      ripple.className = 'radar-hit-ripple';
      ripple.style.left = `${px}px`;
      ripple.style.top = `${py}px`;
      if (isBonus) {
        ripple.style.borderColor = '#10b981';
        ripple.style.boxShadow = '0 0 16px rgba(16, 185, 129, 0.8)';
      }
      layer.appendChild(ripple);
      setTimeout(() => ripple.remove(), 480);

      const popup = document.createElement('div');
      popup.className = 'radar-score-popup';
      popup.style.left = `${px}px`;
      popup.style.top = `${py}px`;
      if (isBonus) {
        popup.style.color = '#10b981';
        popup.style.borderColor = '#10b981';
        popup.textContent = `+${points} CORE SYNC (+3s)!`;
      } else if (isComboBonus) {
        popup.textContent = `+${points} (${combo}x COMBO!)`;
      } else {
        popup.textContent = `+${points}`;
      }
      layer.appendChild(popup);
      setTimeout(() => popup.remove(), 720);
    };

    // Visual laser firing feedback at click coordinate
    const showLaserPing = (px, py, isHit) => {
      const ping = document.createElement('div');
      ping.className = isHit ? 'radar-laser-burst' : 'radar-miss-ping';
      ping.style.left = `${px}px`;
      ping.style.top = `${py}px`;
      layer.appendChild(ping);
      setTimeout(() => ping.remove(), 350);
    };

    const removeTarget = (id) => {
      const target = activeTargets.get(id);
      if (target) {
        clearTimeout(target.timeout);
        target.el.remove();
        activeTargets.delete(id);
      }
    };

    const spawnTarget = () => {
      if (!layer) return;
      const maxActive = isPlaying ? 4 : 2;
      if (activeTargets.size >= maxActive) return;

      // Polar percentage coordinates centered in radar circle (16% to 38% radius from center 50%, 50%)
      const angle = Math.random() * Math.PI * 2;
      const radiusPercent = 16 + Math.random() * 22;
      const tx = Math.round(50 + Math.cos(angle) * radiusPercent);
      const ty = Math.round(50 + Math.sin(angle) * radiusPercent);

      const roll = Math.random();
      let type = 'normal';
      let tagText = normalAnomalies[Math.floor(Math.random() * normalAnomalies.length)];
      let basePoints = 100;
      let duration = 3800;

      if (roll < 0.14) {
        type = 'bonus';
        tagText = bonusRelays[Math.floor(Math.random() * bonusRelays.length)];
        basePoints = 300;
        duration = 3400;
      } else if (roll < 0.36) {
        type = 'rogue';
        tagText = rogueAnomalies[Math.floor(Math.random() * rogueAnomalies.length)];
        basePoints = 175;
        duration = 3000;
      }

      const id = ++targetCounter;
      const targetEl = document.createElement('div');
      targetEl.className = `radar-target target-${type}`;
      targetEl.style.left = `${tx}%`;
      targetEl.style.top = `${ty}%`;
      targetEl.setAttribute('role', 'button');
      targetEl.setAttribute('tabindex', '0');
      targetEl.setAttribute('aria-label', `Target: ${tagText}`);
      targetEl.dataset.targetId = String(id);

      targetEl.innerHTML = `
        <span class="target-box"><span class="target-timer-ring"></span></span>
        <span class="target-tag">${tagText}</span>
      `;

      // Direct click listener on target element for guaranteed hits
      targetEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const tRect = targetEl.getBoundingClientRect();
        handleScreenClick(tRect.left + tRect.width / 2, tRect.top + tRect.height / 2, targetEl);
      });

      layer.appendChild(targetEl);

      const timeout = setTimeout(() => {
        if (activeTargets.has(id)) {
          targetEl.style.opacity = '0';
          setTimeout(() => {
            removeTarget(id);
            if (isPlaying) {
              combo = 1;
              if (comboEl) comboEl.textContent = '1x';
              setTimeout(spawnTarget, 300);
            }
          }, 180);
        }
      }, duration);

      activeTargets.set(id, {
        id,
        el: targetEl,
        tx,
        ty,
        type,
        points: basePoints,
        timeout
      });
    };

    // Core Intercept Mechanics (proximity detection + laser fire)
    const handleScreenClick = (clientX, clientY, clickedTargetEl) => {
      const rect = screen.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      // Resume AudioContext if suspended (required on Safari / iOS / Android on first user gesture)
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }

      // If game is not active, start it right now!
      if (!isPlaying) {
        startGame();
      }

      let closestTarget = null;
      let minDistance = 64; // Generous 64px proximity threshold for touch + desktop

      // Check direct target click first
      const directTarget = clickedTargetEl ? clickedTargetEl.closest('.radar-target') : null;
      if (directTarget && directTarget.dataset.targetId) {
        const targetId = Number(directTarget.dataset.targetId);
        if (activeTargets.has(targetId)) {
          closestTarget = activeTargets.get(targetId);
          minDistance = 0;
        }
      }

      // Proximity detection using getBoundingClientRect() - 100% screen and device independent
      if (!closestTarget) {
        activeTargets.forEach((target) => {
          const tRect = target.el.getBoundingClientRect();
          const targetCenterX = tRect.left + tRect.width / 2;
          const targetCenterY = tRect.top + tRect.height / 2;
          const dx = targetCenterX - clientX;
          const dy = targetCenterY - clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDistance) {
            minDistance = dist;
            closestTarget = target;
          }
        });
      }

      if (closestTarget) {
        // HIT!
        interceptsCount += 1;
        const isBonus = closestTarget.type === 'bonus';

        if (isBonus) {
          // Bonus time reward (+3s, max 45s)
          timeLeft = Math.min(timeLeft + 3, 45);
          if (timerEl) {
            timerEl.textContent = `${timeLeft}s`;
            timerEl.classList.add('timer-boost');
            setTimeout(() => timerEl.classList.remove('timer-boost'), 500);
          }
          playAudio('bonus');
        } else {
          // Combo progression
          combo = Math.min(combo + 1, 4);
          if (combo > maxCombo) maxCombo = combo;
          playAudio('hit', 1 + (combo - 1) * 0.22);
        }

        clearTimeout(comboTimer);
        comboTimer = setTimeout(() => {
          combo = 1;
          if (comboEl) comboEl.textContent = '1x';
        }, 2400);

        if (comboEl) {
          comboEl.textContent = combo > 1 ? `${combo}x` : '1x';
          comboEl.classList.toggle('combo-active', combo > 1);
        }

        const pointsEarned = closestTarget.points * (isBonus ? 1 : combo);
        score += pointsEarned;
        if (scoreEl) scoreEl.textContent = String(score);

        showLaserPing(clickX, clickY, true);

        // Get target coordinates relative to screen for hit ripple
        const tRect = closestTarget.el.getBoundingClientRect();
        const hitX = tRect.left + tRect.width / 2 - rect.left;
        const hitY = tRect.top + tRect.height / 2 - rect.top;
        showHitEffect(hitX, hitY, pointsEarned, isBonus, combo > 1);
        removeTarget(closestTarget.id);

        if (statusMsg) {
          statusMsg.textContent = isBonus
            ? `CORE SYNCHRONIZED · +${pointsEarned} PTS · +3s EXTENSION`
            : `TARGET ELIMINATED · +${pointsEarned} PTS · ${combo}x COMBO`;
        }

        // Fast respawn for fluid action
        setTimeout(spawnTarget, 220);
      } else {
        // MISS!
        playAudio('miss');
        showLaserPing(clickX, clickY, false);
        combo = 1;
        if (comboEl) {
          comboEl.textContent = '1x';
          comboEl.classList.remove('combo-active');
        }
      }
    };

    // Cross-device interaction handler (mouse click + mobile touch)
    let lastActionTime = 0;
    const onRadarInteraction = (e) => {
      // Don't intercept if clicking audio button or retry button
      if (e.target.closest('#radar-audio-btn') || e.target.closest('#radar-retry-btn')) {
        return;
      }

      const now = Date.now();
      // Debounce touch + click synthetic event pairing (150ms)
      if (now - lastActionTime < 150) return;
      lastActionTime = now;

      let clientX = e.clientX;
      let clientY = e.clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }

      // If start button is clicked
      if (e.target.closest('#radar-start-btn')) {
        if (!isPlaying) {
          startGame();
          return;
        }
      }

      handleScreenClick(clientX, clientY, e.target);
    };

    screen.addEventListener('click', onRadarInteraction);
    screen.addEventListener('touchend', onRadarInteraction, { passive: true });

    // Keyboard controls (Spacebar or Enter to intercept nearest anomaly)
    screen.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isPlaying) {
          startGame();
          return;
        }
        // Fire at closest target or screen center
        if (activeTargets.size > 0) {
          const firstTarget = activeTargets.values().next().value;
          if (firstTarget) {
            const tRect = firstTarget.el.getBoundingClientRect();
            handleScreenClick(tRect.left + tRect.width / 2, tRect.top + tRect.height / 2, firstTarget.el);
            return;
          }
        }
        const rect = screen.getBoundingClientRect();
        handleScreenClick(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });

    const startGame = () => {
      if (isPlaying) return;
      isPlaying = true;
      score = 0;
      timeLeft = 30;
      combo = 1;
      maxCombo = 1;
      interceptsCount = 0;

      if (scoreEl) scoreEl.textContent = '0';
      if (timerEl) timerEl.textContent = '30s';
      if (comboEl) {
        comboEl.textContent = '1x';
        comboEl.classList.remove('combo-active');
      }
      if (btnText) btnText.textContent = 'DEFENSE ACTIVE...';
      if (statusMsg) statusMsg.textContent = 'INTERCEPT INCOMING ANOMALIES // 30s SURVIVAL';
      if (debrief) debrief.hidden = true;
      if (idleBanner) idleBanner.classList.add('is-hidden');
      if (radarSweep) radarSweep.classList.add('is-playing');

      playAudio('start');

      // Clear existing targets and spawn initial wave
      activeTargets.forEach((t) => {
        clearTimeout(t.timeout);
        t.el.remove();
      });
      activeTargets.clear();

      spawnTarget();
      setTimeout(spawnTarget, 250);
      setTimeout(spawnTarget, 600);

      clearInterval(spawnTimer);
      spawnTimer = setInterval(() => {
        if (isPlaying && activeTargets.size < 4) {
          spawnTarget();
        }
      }, 850);

      clearInterval(gameTimer);
      gameTimer = setInterval(() => {
        timeLeft -= 1;
        if (timerEl) timerEl.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    };

    const endGame = () => {
      isPlaying = false;
      clearInterval(gameTimer);
      clearInterval(spawnTimer);
      clearTimeout(comboTimer);

      if (radarSweep) radarSweep.classList.remove('is-playing');
      if (timerEl) timerEl.textContent = '0s';
      if (btnText) btnText.textContent = 'INTERCEPT SIM [START]';
      if (idleBanner) idleBanner.classList.remove('is-hidden');

      playAudio('over');

      // Update High Score
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('ts-radar-high-score', String(highScore));
        if (highEl) highEl.textContent = String(highScore);
      }

      // Rank calculation
      let rank = 'TELEMETRY OPERATIVE // C-TIER';
      if (score >= 2600) rank = 'DEFENSE ARCHITECT // SSS-TIER';
      else if (score >= 1800) rank = 'CYBER COMMANDER // S-TIER';
      else if (score >= 1100) rank = 'SYSTEMS SPECIALIST // A-TIER';
      else if (score >= 600) rank = 'DATA ANALYST // B-TIER';

      if (debriefScore) debriefScore.textContent = `SCORE: ${score}`;
      if (debriefStat) debriefStat.textContent = `INTERCEPTS: ${interceptsCount} · MAX COMBO: ${maxCombo}x`;
      if (debriefRank) debriefRank.textContent = `RANK: ${rank}`;
      if (debrief) debrief.hidden = false;

      if (statusMsg) statusMsg.textContent = `MISSION COMPLETE · FINAL SCORE: ${score} · ${rank}`;

      // Reset to idle target after brief delay
      setTimeout(() => {
        activeTargets.forEach((t) => {
          clearTimeout(t.timeout);
          t.el.remove();
        });
        activeTargets.clear();
        spawnTarget();
      }, 1000);
    };

    startBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      startGame();
    });

    retryBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (debrief) debrief.hidden = true;
      startGame();
    });

    // Close debrief modal on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && debrief && !debrief.hidden) {
        debrief.hidden = true;
      }
    });

    // Spawn 1 initial idle target on page load
    spawnTarget();
  };

  initScrollReveals();
  initSpotlights();
  initMagneticButtons();
  initAmbientCanvas();
  initRadarGame();

  applyPreferences();
});
