const CACHE_NAME = 'blindtest-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/presenter.html',
  '/audience.html',
  '/recap.html',
  '/create.html',
  '/style.css',
  '/manifest.json',
  '/script/script.js',
  '/script/objectValueBlindtest.js',
  '/script/utils.js',
  '/script/tagBuilder.js',
  '/script/create.js',
  '/script/header.js',
  '/style/bootfish.css',
  '/style/component.css',
  '/style/layout.css',
  '/style/reset.css',
  '/style/utilities.css',
  '/style/variable.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.log('Erreur lors de la mise en cache:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie network-first pour les fichiers audio et données JSON
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Pour les fichiers audio et JSON, utilisez network-first
  if (request.url.includes('.mp3') || 
      request.url.includes('.json') || 
      request.url.includes('.wav') ||
      request.url.includes('.m4a')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Mettez en cache les réponses réussies
          if (response && response.status === 200) {
            const cache = caches.open(CACHE_NAME);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          // Si le réseau échoue, utilisez le cache
          return caches.match(request);
        })
    );
    return;
  }

  // Pour les autres fichiers, utilisez cache-first
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        // Fallback optionnel
        return new Response('Offline - Fichier non disponible', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});
