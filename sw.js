/* SchoolAudit Service Worker — offline cache */
const CACHE = "schoolaudit-v2026-06-22b";

const PRECACHE = [
  "./index.html",
  "./app.js",
  "./style.css",
  "./react.production.min.js",
  "./react-dom.production.min.js",
  "./vendor/babel.min.js",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      // Clone BEFORE consuming — fixes "body already used" error
      return fetch(e.request.clone()).then(resp => {
        if (resp && resp.status === 200 && resp.type !== "opaque") {
          const toCache = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, toCache));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
