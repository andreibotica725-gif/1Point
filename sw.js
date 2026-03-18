const CACHE_NAME = '1point-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install: cache all core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve from cache first, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache font files and CSS from CDNs as they load
        if (response.ok && (event.request.url.includes('fonts.g') || event.request.url.includes('cdnjs.'))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // If offline and not cached, return the main page
        return caches.match('./index.html');
      });
    })
  );
});