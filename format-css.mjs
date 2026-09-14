import fs from 'node:fs';
const base = 'c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/';
const raw0 = fs.readFileSync(base + 'styles.css', 'utf8').replace(/\r\n/g, '\n');
const firstNL = raw0.indexOf('\n');
let head = raw0.slice(0, firstNL);
let raw = raw0.slice(firstNL + 1);
head = head.replace(/\s+/g, ' ').trim();
let depth = 0;
let buf = '';
const out = [head, ''];
const push = (s) => out.push('  '.repeat(depth) + s);
for (let i = 0; i < raw.length; i++) {
  const ch = raw[i];
  if (ch === '{') {
    let sel = buf.trim().replace(/\s+/g, ' ');
    buf = '';
    const semi = sel.lastIndexOf(';');
    if (semi >= 0) {
      const pre = sel.slice(0, semi + 1);
      for (const part of pre.split(';')) {
        const d = part.trim();
        if (d) push(d + ';');
      }
      sel = sel.slice(semi + 1).trim();
    }
    push(sel + ' {');
    depth += 1;
  } else if (ch === '}') {
    const decl = buf.trim().replace(/\s+/g, ' ');
    buf = '';
    if (decl) {
      for (const part of decl.split(';')) {
        const d = part.trim();
        if (d) push(d + ';');
      }
    }
    depth = Math.max(0, depth - 1);
    push('}');
    out.push('');
  } else if (ch === ';' && depth > 0) {
    buf += ';';
    push(buf.trim().replace(/\s+/g, ' '));
    buf = '';
  } else if (ch === '\n') {
    buf += ' ';
  } else {
    buf += ch;
  }
}
const tail = buf.trim();
if (tail) out.push(tail);
fs.writeFileSync(base + 'styles.css', out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\n/g, '\r\n'));
console.log('done lines=' + out.length);
