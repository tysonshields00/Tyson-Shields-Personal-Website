const fs = require('fs');
const base = 'c:/Users/tyson/Documents/GitHub/Tyson-Shields-Personal-Website/';
for (const f of ['about.html','career.html','skills.html','contact.html','404.html']) {
  const t = fs.readFileSync(base + f, 'utf8');
  const hasDrawer = t.includes('settings-drawer');
  const tail = t.slice(-400);
  console.log('--- ' + f + ' drawer=' + hasDrawer + ' ---');
  console.log(tail.replace(/\r?\n/g, ' ').slice(-350));
}
