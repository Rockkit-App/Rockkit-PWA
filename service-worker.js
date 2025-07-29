const CACHE_NAME = 'rockkit-pwa-cache-v3';
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
  `${APP_PREFIX}/admin-subscriptions.html`,
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
  `${APP_PREFIX}/js/admin-subscriptions.js`,
  `${APP_PREFIX}/manifest.json`,
  `${APP_PREFIX}/offline.html`,
  `${APP_PREFIX}/icons/icon-192x192.png`,
  `${APP_PREFIX}/icons/icon-512x512.png`
];

// Install and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of ASSETS) {
        try {
          const req = new Request(url, { cache: 'reload' });
          const res = await fetch(req);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          await cache.put(req, res.clone());
        } catch (err) {
          console.error(`❌ Failed to cache ${url}`, err);
        }
      }
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Serve from cache, fallback to offline.html
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Ignore non-GET
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      return cached || fetch(req).catch(() => {
        // If navigation request fails, fallback to offline page
        if (req.mode === 'navigate') {
          return caches.match(`${APP_PREFIX}/offline.html`);
        }
      });
    })
  );
});
