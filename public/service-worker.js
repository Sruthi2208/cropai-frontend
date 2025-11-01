/* Simple service worker for caching build assets and offline fallback.
   Put this file in public/service-worker.js
*/

const CACHE_NAME = "cropapp-cache-v1";
const OFFLINE_URL = "/index.html";

self.addEventListener("install", (event) => {
  // cache the app shell
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // You can list any additional resources you want to pre-cache
        return cache.addAll([
          OFFLINE_URL,
          "/",
        ]);
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // remove old caches
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => {
        if (k !== CACHE_NAME) return caches.delete(k);
        return null;
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // For navigation requests, serve index.html (app shell) from cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL)
      )
    );
    return;
  }

  // For other requests, try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // optionally cache the response
        return response;
      })
      .catch(() => caches.match(request))
  );
});
