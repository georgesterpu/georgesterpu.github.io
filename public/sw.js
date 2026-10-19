// Retirement worker for the previous Jekyll/Chirpy PWA. Existing installs
// discover this update, discard their old cached pages, then unregister.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (/chirpy/i.test(name)) await caches.delete(name);
    }
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
