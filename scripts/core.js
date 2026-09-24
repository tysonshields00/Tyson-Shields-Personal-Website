// Developer console greetings
console.log(
  '%cTyson Shields — Employee Benefits Business Analyst · Lincoln, NE',
  'color: #0ea5e9; font-weight: 600; font-family: system-ui, sans-serif; font-size: 12px;'
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
  const defaults = { theme: 'dark', accent: 'blue', density: 'spacious', reducedMotion: false };
  const valid = {
    theme: ['dark', 'navy', 'light', 'reading'],
    accent: ['blue', 'teal', 'emerald', 'amber', 'purple', 'white'],
    density: ['spacious', 'compact'],
  };
  const themeColors = {
    dark: '#0a0f1d',
    navy: '#0a0f1d',
    light: '#f5f7fa',
    reading: '#f5edd6'
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

  const loadPreferences = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      let theme = saved?.theme;
      if (theme === 'navy') theme = 'dark';
      if (theme !== 'dark' && theme !== 'light') {
        theme = defaults.theme;
      }
      return { ...defaults, ...saved, theme };
    } catch (error) {
      return { ...defaults };
    }
  };

  let preferences = loadPreferences();
  if (preferences.theme !== 'dark' && preferences.theme !== 'light') {
    preferences.theme = 'dark';
  }
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
    root.dataset.accent = 'blue';
    root.dataset.density = 'spacious';
    root.dataset.reducedMotion = preferences.reducedMotion;

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', themeColors[preferences.theme] || '#0a0f1d');
    }

    document.querySelectorAll('[data-setting="theme"]').forEach((control) => {
      const selected = preferences.theme === control.dataset.value;
      control.classList.toggle('is-selected', selected);
      control.setAttribute('aria-pressed', String(selected));
    });
  };

  const applyPreferences = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => updatePreferenceDom());
    } else {
      updatePreferenceDom();
    }
  };

  applyPreferences();

  const setDrawer = (isOpen) => {
    const isCurrentlyOpen = drawer?.classList.contains('is-open');
    const newState = isOpen !== undefined ? isOpen : !isCurrentlyOpen;
    drawer?.classList.toggle('is-open', newState);
    backdrop?.classList.toggle('is-visible', newState);
    drawer?.setAttribute('aria-hidden', String(!newState));
    document.querySelectorAll('.settings-trigger').forEach((trigger) => {
      trigger.setAttribute('aria-expanded', String(newState));
    });
    if (newState) {
      drawerReturnFocus = document.activeElement;
      drawer?.querySelector('.drawer-close')?.focus();
    } else {
      drawerReturnFocus?.focus();
    }
  };

  if (drawer && backdrop) {
    document.querySelectorAll('.settings-trigger').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileNav();
        setDrawer();
      });
    });

    drawer.querySelector('.drawer-close')?.addEventListener('click', (e) => {
      e.stopPropagation();
      setDrawer(false);
    });

    backdrop.addEventListener('click', () => setDrawer(false));

    document.addEventListener('click', (event) => {
      if (drawer?.classList.contains('is-open')) {
        if (!drawer.contains(event.target) && !event.target.closest('.settings-trigger')) {
          setDrawer(false);
        }
      }
    });

    document.querySelectorAll('[data-setting="theme"]').forEach((control) => {
      control.addEventListener('click', () => {
        const val = control.dataset.value;
        if (val === 'dark' || val === 'light') {
          preferences.theme = val;
          applyPreferences();
          savePreferences();
        }
      });
    });
  }

  menu?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    closeMobileNav();
  }));

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
      if (drawer?.classList.contains('is-open')) { setDrawer(false); return; }
      closeMobileNav();
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
    }, { threshold: 0.05, rootMargin: '50px 0px 50px 0px' });
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('is-visible');
      } else {
        io.observe(el);
      }
    });
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
      const isLight = root.dataset.theme === 'light';
      const palette = isLight
        ? ['rgba(2, 132, 199, ', 'rgba(14, 165, 233, ', 'rgba(56, 189, 248, ']
        : (accentPalettes[activeAccent] || accentPalettes.blue);

      // Draw particle node
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        ctx.fillStyle = `${palette[p1.colorIndex]}${p1.baseAlpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

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

  initScrollReveals();
  initSpotlights();
  initMagneticButtons();
  initAmbientCanvas();

  applyPreferences();
});
