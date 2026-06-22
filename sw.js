/* SchoolAudit Service Worker */
/* !! Change this date string every time you deploy to force update !! */
const CACHE = "schoolaudit-v2026-06-22b";

/* Only cache files that actually exist in the repo */
const PRECACHE = [
  "./index.html",
  "./app.js",
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
      /* Always try network first for app.js so updates load immediately */
      if (e.request.url.includes("app.js")) {
        return fetch(e.request)
          .then(resp => {
            if (resp && resp.status === 200) {
              caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
            }
            return resp;
          })
          .catch(() => cached);
      }
      return cached || fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        }
        return resp;
      });
    })
  );
});
