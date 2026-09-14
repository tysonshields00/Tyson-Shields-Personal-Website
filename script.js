(() => {
  const root = document.documentElement;
  const storageKey = 'tyson-shields-preferences';
  const defaults = { theme: 'navy', accent: 'blue', density: 'spacious', reducedMotion: false };
  const valid = { theme: ['navy', 'slate', 'light'], accent: ['blue', 'teal', 'white'], density: ['spacious', 'compact'] };
  const drawer = document.querySelector('.settings-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const menu = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const settingsTrigger = document.querySelector('.settings-trigger');

  const closeMobileNav = () => {
    navLinks?.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
  };

  if (navLinks && !navLinks.querySelector('.command-trigger')) {
    navLinks.insertAdjacentHTML('beforeend', '<button class="icon-button command-trigger" type="button" aria-label="Open command palette">⌘K</button>');
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
    try { localStorage.setItem(storageKey, JSON.stringify(preferences)); } catch (error) { /* Storage may be unavailable in private browsing. */ }
  };

  const applyPreferences = () => {
    root.dataset.theme = preferences.theme;
    root.dataset.accent = preferences.accent;
    root.dataset.density = preferences.density;
    root.dataset.reducedMotion = preferences.reducedMotion;
    document.querySelectorAll('[data-setting]').forEach((control) => {
      const setting = control.dataset.setting;
      const selected = setting === 'motion' ? preferences.reducedMotion : preferences[setting] === control.dataset.value;
      control.classList.toggle('is-selected', selected);
      if (control.matches('.toggle')) {
        control.classList.toggle('is-on', preferences.reducedMotion);
        control.setAttribute('aria-checked', String(preferences.reducedMotion));
      }
    });
  };

  const setDrawer = (isOpen) => {
    drawer.classList.toggle('is-open', isOpen);
    backdrop.classList.toggle('is-visible', isOpen);
    drawer.setAttribute('aria-hidden', String(!isOpen));
    settingsTrigger?.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('drawer-open', isOpen);
    if (isOpen) drawer.querySelector('.drawer-close').focus();
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

  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.filter-button').forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      document.querySelectorAll('.project-card').forEach((card) => {
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
  const paletteMarkup = `<div class="palette-backdrop" data-close-palette></div><dialog class="command-palette" aria-labelledby="palette-title"><div class="palette-header"><h2 id="palette-title">Navigate</h2><button class="icon-button palette-close" type="button" aria-label="Close command palette">×</button></div><label class="sr-only" for="palette-search">Search pages</label><input id="palette-search" class="palette-search" type="search" placeholder="Search pages..." autocomplete="off"><div class="palette-results" role="listbox"></div><p class="palette-hint">Use arrow keys to move · Enter to open · Esc to close</p></dialog>`;
  document.body.insertAdjacentHTML('beforeend', paletteMarkup);
  const palette = document.querySelector('.command-palette');
  const paletteBackdrop = document.querySelector('.palette-backdrop');
  const paletteSearch = document.querySelector('.palette-search');
  const paletteResults = document.querySelector('.palette-results');
  let paletteIndex = 0;

  const renderPalette = (query = '') => {
    const filtered = commandItems.filter(([name, path, description]) => `${name} ${path} ${description}`.toLowerCase().includes(query.toLowerCase()));
    paletteResults.innerHTML = filtered.map(([name, path, description], index) => `<a class="palette-result${index === 0 ? ' is-active' : ''}" role="option" href="${path}" data-palette-index="${index}"><strong>${name}</strong><span>${description}</span><b>↗</b></a>`).join('') || '<p class="palette-empty">No matching pages.</p>';
    paletteIndex = 0;
  };
  const setPalette = (isOpen) => {
    if (isOpen) { if (drawer?.classList.contains('is-open')) setDrawer(false); if (!palette.open) palette.showModal(); paletteBackdrop.classList.add('is-visible'); paletteSearch.value = ''; renderPalette(); paletteSearch.focus(); }
    else { palette.close(); paletteBackdrop.classList.remove('is-visible'); }
  };
  const commandTrigger = document.querySelector('.command-trigger');
  commandTrigger?.addEventListener('click', () => { closeMobileNav(); setPalette(true); });
  document.querySelector('.palette-close').addEventListener('click', () => setPalette(false));
  paletteBackdrop.addEventListener('click', () => setPalette(false));
  paletteSearch.addEventListener('input', () => renderPalette(paletteSearch.value));
  paletteSearch.addEventListener('keydown', (event) => {
    const results = [...paletteResults.querySelectorAll('.palette-result')];
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && results.length) { event.preventDefault(); paletteIndex = (paletteIndex + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length; results.forEach((result, index) => result.classList.toggle('is-active', index === paletteIndex)); results[paletteIndex]?.scrollIntoView({ block: 'nearest' }); }
    if (event.key === 'Enter' && results[paletteIndex]) { event.preventDefault(); window.location.href = results[paletteIndex].href; }
    if (event.key === 'Escape') setPalette(false);
  });
  palette.addEventListener('close', () => paletteBackdrop.classList.remove('is-visible'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (palette.open) { setPalette(false); return; }
      if (drawer?.classList.contains('is-open')) { setDrawer(false); return; }
      closeMobileNav();
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); closeMobileNav(); setPalette(true); }
  });

  applyPreferences();
})();
