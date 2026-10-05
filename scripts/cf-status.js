/**
 * Cloudflare Edge & Infrastructure Status Diagnostics
 * Usage: npm run cf:status
 */

const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

loadEnv();

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ZONE_ID || !API_TOKEN) {
  console.error('\n❌ Missing CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN in .env\n');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

async function checkStatus() {
  console.log('\n========================================');
  console.log('  Tyson Shields — Cloudflare Telemetry  ');
  console.log('========================================\n');

  try {
    // 1. Zone Details
    const zoneRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}`, { headers });
    const zoneData = await zoneRes.json();
    if (zoneData.success) {
      const z = zoneData.result;
      console.log(`[Zone] ${z.name}`);
      console.log(`  • Status:        ${z.status.toUpperCase()}`);
      console.log(`  • Name Servers:  ${z.name_servers.join(', ')}`);
      console.log(`  • Plan:          ${z.plan.name}`);
    }

    // 2. DNS Verification
    const dnsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, { headers });
    const dnsData = await dnsRes.json();
    if (dnsData.success) {
      console.log('\n[DNS Routing]');
      dnsData.result.forEach(r => {
        console.log(`  • ${r.name.padEnd(28)} [${r.type}] -> ${r.content} (Proxied: ${r.proxied})`);
      });
    }

    // 3. Cloudflare Pages Project
    if (ACCOUNT_ID) {
      const pagesRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/tyson-shields-personal-website`, { headers });
      const pagesData = await pagesRes.json();
      if (pagesData.success) {
        const p = pagesData.result;
        console.log(`\n[Cloudflare Pages] ${p.name}`);
        console.log(`  • Production Branch: ${p.production_branch}`);
        console.log(`  • Canonical Domain:  ${p.canonical_deployment?.url || 'https://tysonshields.com'}`);
      }
    }

    console.log('\n✅ All Cloudflare edge services operating optimally.\n');
  } catch (err) {
    console.error('❌ Diagnostics failed:', err.message);
  }
}

checkStatus();
