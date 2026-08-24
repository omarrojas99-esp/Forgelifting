const CACHE_NAME = 'forgelifting-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. Instalación y guardado de archivos críticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Forzar activación de la nueva versión inmediatamente
});

// 2. Limpieza de versiones antiguas de caché (v1, v2, etc.)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Estrategia de red/caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
