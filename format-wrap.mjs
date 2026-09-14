import fs from 'node:fs';
const base = 'c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/';
const W = 120;
function splitTopLevel(s) {
  const parts = [];
  let cur = '';
  let dParen = 0;
  let inS = null;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inS) {
      cur += ch;
      if (ch === inS && s[i - 1] !== '\\') inS = null;
    } else if (ch === '"' || ch === '\'') {
      inS = ch;
      cur += ch;
    } else if (ch === '(') {
      dParen++;
      cur += ch;
    } else if (ch === ')') {
      dParen = Math.max(0, dParen - 1);
      cur += ch;
    } else if (ch === ',' && dParen === 0) {
      parts.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}
const cssRaw = fs.readFileSync(base + 'styles.css', 'utf8').replace(/\r\n/g, '\n');
const cssLines = cssRaw.split('\n');
const cssOut = [];
for (const line of cssLines) {
  const m = line.match(/^(\s*)(.*)$/);
  const ind = m[1];
  const body = m[2];
  if (!body || body.startsWith('@import') || body === '' || body === '{' || body === '}') {
    cssOut.push(line);
    continue;
  }
  if (body.endsWith('{')) {
    const sel = body.slice(0, -1).trim();
    if (sel.includes(',') && (ind + body).length > W) {
      const parts = splitTopLevel(sel);
      parts.forEach((p, i) => cssOut.push(ind + p + (i < parts.length - 1 ? ',' : ' {')));
    } else {
      cssOut.push(line);
    }
    continue;
  }
  const dm = body.match(/^([a-zA-Z-]+)\s*:\s*(.*);\s*$/);
  if (dm && (ind + body).length > W) {
    const prop = dm[1];
    const val = dm[2];
    const parts = splitTopLevel(val);
    if (parts.length > 1) {
      cssOut.push(ind + prop + ': ' + parts[0] + ',');
      for (let i = 1; i < parts.length; i++) cssOut.push(ind + '  ' + parts[i] + (i < parts.length - 1 ? ',' : ';'));
      continue;
    }
  }
  if (body.startsWith('/*') && body.length + ind.length > W) {
    const inner = body.replace(/^\/\*\s*/, '').replace(/\s*\*\/$/, '');
    const words = inner.split(/\s+/);
    let cur = ind + '/* ';
    for (const w of words) {
      if ((cur + ' ' + w + ' */').length > W && cur.trim() !== '/*') {
        cssOut.push(cur);
        cur = ind + '   ' + w;
      } else {
        cur = cur.endsWith('/* ') ? cur + w : cur + ' ' + w;
      }
    }
    cssOut.push(cur + ' */');
    continue;
  }
  cssOut.push(line);
}
fs.writeFileSync(base + 'styles.css', cssOut.join('\n').replace(/\n/g, '\r\n'));
console.log('css wrapped');
let js = fs.readFileSync(base + 'script.js', 'utf8').replace(/\r\n/g, '\n');
js = js.replace(
  "  const valid = { theme: ['navy', 'slate', 'light'], accent: ['blue', 'teal', 'white'], density: ['spacious', 'compact'] };",
  "  const valid = {\n    theme: ['navy', 'slate', 'light'],\n    accent: ['blue', 'teal', 'white'],\n    density: ['spacious', 'compact'],\n  };"
);
js = js.replace(
  "  const paletteMarkup = `<div class=\"palette-backdrop\" data-close-palette></div><dialog class=\"command-palette\" aria-labelledby=\"palette-title\"><div class=\"palette-header\"><h2 id=\"palette-title\">Navigate</h2><button class=\"icon-button palette-close\" type=\"button\" aria-label=\"Close command palette\">×</button></div><label class=\"sr-only\" for=\"palette-search\">Search pages</label><input id=\"palette-search\" class=\"palette-search\" type=\"search\" placeholder=\"Search pages...\" autocomplete=\"off\"><div class=\"palette-results\" role=\"listbox\"></div><p class=\"palette-hint\">Use arrow keys to move · Enter to open · Esc to close</p></dialog>`;",
  [
    '  const paletteMarkup = [',
    '    \'<div class="palette-backdrop" data-close-palette></div>\',',
    '    \'<dialog class="command-palette" aria-labelledby="palette-title">\',',
    '    \'<div class="palette-header">\',',
    '    \'<h2 id="palette-title">Navigate</h2>\',',
    '    \'<button class="icon-button palette-close" type="button" aria-label="Close command palette">×</button>\',',
    '    \'</div>\',',
    '    \'<label class="sr-only" for="palette-search">Search pages</label>\',',
    '    \'<input id="palette-search" class="palette-search" type="search" placeholder="Search pages..."\ autocomplete="off">\',',
    '    \'<div class="palette-results" role="listbox"></div>\',',
    '    \'<p class="palette-hint">Use arrow keys to move · Enter to open · Esc to close</p>\',',
    '    \'</dialog>\',',
    '  ].join(\'\');',
  ].join('\n')
);
js = js.replace(
  "    const filtered = commandItems.filter(([name, path, description]) => `${name} ${path} ${description}`.toLowerCase().includes(query.toLowerCase()));",
  [
    '    const filtered = commandItems.filter(',
    '      ([name, path, description]) => `${name} ${path} ${description}`.toLowerCase().includes(query.toLowerCase())',
    '    );',
  ].join('\n')
);
js = js.replace(
  "    paletteResults.innerHTML = filtered.map(([name, path, description], index) => `<a class=\"palette-result${index === 0 ? ' is-active' : ''}\" role=\"option\" href=\"${path}\" data-palette-index=\"${index}\"><strong>${name}</strong><span>${description}</span><b>↗</b></a>`).join('') || '<p class=\"palette-empty\">No matching pages.</p>';",
  [
    '    paletteResults.innerHTML = filtered',
    '      .map(',
    "        ([name, path, description], index) =>",
    '          `<a class="palette-result${index === 0 ? \' is-active\' : \'\'}" role="option" href="${path}"` +',
    '          ` data-palette-index="${index}"><strong>${name}</strong><span>${description}</span><b>↗</b></a>`',
    '      )',
    "      .join('') || '<p class=\"palette-empty\">No matching pages.</p>';",
  ].join('\n')
);
js = js.replace(
  "    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && results.length) { event.preventDefault(); paletteIndex = (paletteIndex + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length; results.forEach((result, index) => result.classList.toggle('is-active', index === paletteIndex)); results[paletteIndex]?.scrollIntoView({ block: 'nearest' }); }",
  [
    '    if ((event.key === \'ArrowDown\' || event.key === \'ArrowUp\') && results.length) {',
    '      event.preventDefault();',
    '      paletteIndex = (paletteIndex + (event.key === \'ArrowDown\' ? 1 : -1) + results.length) % results.length;',
    '      results.forEach((result, index) => result.classList.toggle(\'is-active\', index === paletteIndex));',
    '      results[paletteIndex]?.scrollIntoView({ block: \'nearest\' });',
    '    }',
  ].join('\n')
);
js = js.replace(
  "    if (event.key === 'Enter' && results[paletteIndex]) { event.preventDefault(); window.location.href = results[paletteIndex].href; }",
  [
    '    if (event.key === \'Enter\' && results[paletteIndex]) {',
    '      event.preventDefault();',
    '      window.location.href = results[paletteIndex].href;',
    '    }',
  ].join('\n')
);
js = js.replace(
  "    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); closeMobileNav(); setPalette(true); }",
  [
    '    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === \'k\') {',
    '      event.preventDefault();',
    '      closeMobileNav();',
    '      setPalette(true);',
    '    }',
  ].join('\n')
);
js = js.replace(
  "      const selected = setting === 'motion' ? preferences.reducedMotion : preferences[setting] === control.dataset.value;",
  [
    '      const selected = setting === \'motion\'',
    '        ? preferences.reducedMotion',
    '        : preferences[setting] === control.dataset.value;',
  ].join('\n')
);
js = js.replace(
  "    try { localStorage.setItem(storageKey, JSON.stringify(preferences)); } catch (error) { /* Storage may be unavailable in private browsing. */ }",
  [
    '    try {',
    '      localStorage.setItem(storageKey, JSON.stringify(preferences));',
    '    } catch (error) {',
    '      /* Storage may be unavailable in private browsing. */',
    '    }',
  ].join('\n')
);
js = js.replace(
  "  palette.addEventListener('close', () => paletteBackdrop.classList.remove('is-visible'));",
  [
    '  palette.addEventListener(',
    '    \'close\',',
    '    () => paletteBackdrop.classList.remove(\'is-visible\')',
    '  );',
  ].join('\n')
);
fs.writeFileSync(base + 'script.js', js.replace(/\n/g, '\r\n'));
console.log('js wrapped');
