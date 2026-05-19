// Bergen Cruise Tracker — service worker
const CACHE = "bergen-cruise-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon-64.png",
  "https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.js"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => {
    if (cached) return cached;
    return fetch(event.request).then((resp) => {
      const url = new URL(event.request.url);
      if (url.origin === location.origin || url.host.includes("cdn.jsdelivr.net")) {
        const clone = resp.clone();
        caches.open(CACHE).then((c) => c.put(event.request, clone));
      }
      return resp;
    }).catch(() => cached);
  }));
});
