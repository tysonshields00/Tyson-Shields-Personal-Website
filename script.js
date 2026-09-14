(() => {
  const root = document.documentElement;
  const storageKey = 'tyson-shields-preferences';
  const defaults = { theme: 'navy', accent: 'blue', density: 'spacious', reducedMotion: false };
  const valid = { theme: ['navy', 'slate', 'light'], accent: ['blue', 'teal', 'white'], density: ['spacious', 'compact'] };
  const drawer = document.querySelector('.settings-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const menu = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

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
    document.querySelector('.settings-trigger').setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('drawer-open', isOpen);
    if (isOpen) drawer.querySelector('.drawer-close').focus();
  };

  document.querySelector('.settings-trigger').addEventListener('click', () => setDrawer(true));
  document.querySelector('.drawer-close').addEventListener('click', () => setDrawer(false));
  backdrop.addEventListener('click', () => setDrawer(false));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setDrawer(false); });

  document.querySelectorAll('[data-setting]').forEach((control) => {
    control.addEventListener('click', () => {
      if (control.dataset.setting === 'motion') preferences.reducedMotion = !preferences.reducedMotion;
      else preferences[control.dataset.setting] = control.dataset.value;
      applyPreferences();
      savePreferences();
    });
  });

  document.querySelector('[data-reset]').addEventListener('click', () => {
    preferences = { ...defaults };
    applyPreferences();
    savePreferences();
  });

  menu.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
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

  applyPreferences();
})();
