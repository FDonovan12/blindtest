self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
// Pas de cache, pas de fetch intercepté — juste le strict minimum
