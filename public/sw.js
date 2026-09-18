const CACHE = "pody-offline-v1";
const OFFLINE_ASSETS = ["/offline.html", "/offline.css", "/offline.js", "/icons/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(OFFLINE_ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith("pody-offline-") && key !== CACHE).map((key) => caches.delete(key)),
  )));
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("/offline.html")));
  } else if (OFFLINE_ASSETS.includes(url.pathname) && !url.search) {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
  }
});
