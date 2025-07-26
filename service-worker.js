const CACHE_NAME = 'smallbiz-pwa-cache-v2';
const APP_PREFIX = '/Rockkit-PWA';
const ASSETS = [
  `${APP_PREFIX}/`,
  `${APP_PREFIX}/index.html`,
  `${APP_PREFIX}/dashboard.html`,
  `${APP_PREFIX}/transactions.html`,
  `${APP_PREFIX}/production.html`,
  `${APP_PREFIX}/recipes.html`,
  `${APP_PREFIX}/inventory.html`,
  `${APP_PREFIX}/credits.html`,
  `${APP_PREFIX}/expenses.html`,
  `${APP_PREFIX}/settings.html`,
  `${APP_PREFIX}/src/css/tailwind.css`,
  `${APP_PREFIX}/src/js/app.js`,
  `${APP_PREFIX}/src/js/api.js`,
  `${APP_PREFIX}/src/js/auth.js`,
  `${APP_PREFIX}/src/js/dashboard.js`,
  `${APP_PREFIX}/src/js/transactions.js`,
  `${APP_PREFIX}/src/js/production.js`,
  `${APP_PREFIX}/src/js/recipes.js`,
  `${APP_PREFIX}/src/js/inventory.js`,
  `${APP_PREFIX}/src/js/credits.js`,
  `${APP_PREFIX}/src/js/expenses.js`,
  `${APP_PREFIX}/src/js/settings.js`,
  `${APP_PREFIX}/manifest.json`,
  `${APP_PREFIX}/offline.html`
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of ASSETS) {
      try {
        const req = new Request(url, { cache: 'reload' });
        const res = await fetch(req);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await cache.put(req, res.clone());
        // console.log('Cached:', url);
      } catch (err) {
        console.error('❌ Failed to cache', url, err);
      }
    }
    self.skipWaiting();
  })());
});
