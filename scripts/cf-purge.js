/**
 * Cloudflare Global Cache Purge Utility
 * Purges the Cloudflare CDN edge cache for tysonshields.com
 * Usage: npm run cf:purge
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env
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

const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ZONE_ID || !API_TOKEN) {
  console.error('\n❌ Error: Missing CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN in .env\n');
  process.exit(1);
}

async function purgeCache() {
  console.log(`\nInitiating Cloudflare global cache purge for zone: ${ZONE_ID}...`);
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ purge_everything: true })
    });

    const data = await res.json();
    if (data.success) {
      console.log('✅ Cloudflare Edge Cache purged successfully across all global PoPs!\n');
    } else {
      console.error('❌ Cloudflare API Error:', data.errors);
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Request failed:', err.message);
    process.exit(1);
  }
}

purgeCache();
