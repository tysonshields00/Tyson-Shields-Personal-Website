const fs = require('fs');
const path = require('path');
const https = require('https');
const base = 'c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(get(res.headers.location));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

(async () => {
  const css = fs.readFileSync(path.join(base, 'tmp-gfont-ttf.css'), 'utf8');
  const re = /font-weight: (\d+);[^}]*?url\((https:[^)]+\.ttf)\)/g;
  let m;
  const faces = [];
  while ((m = re.exec(css)) !== null) {
    const w = m[1];
    if (faces.find((f) => f.w === w)) continue;
    faces.push({ w, url: m[2] });
  }
  console.log('weights: ' + faces.map((f) => f.w).join(', '));
  const out = [];
  for (const f of faces) {
    const buf = await get(f.url);
    const name = 'outfit-' + f.w + '-latin.ttf';
    fs.writeFileSync(path.join(base, 'fonts', name), buf);
    console.log(name + ' bytes=' + buf.length);
    out.push("@font-face {\n  font-family: 'Outfit';\n  font-style: normal;\n  font-weight: " + f.w + ";\n  font-display: swap;\n  src: url('fonts/" + name + "') format('truetype');\n}");
  }
  fs.writeFileSync(path.join(base, 'tmp-faces.css'), out.join('\n\n') + '\n');
})().catch((e) => { console.error('FONT FAIL: ' + e.message); process.exit(1); });
