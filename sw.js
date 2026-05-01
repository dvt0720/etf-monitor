const CACHE_NAME = 'etf-monitor-v2';
const ASSETS = ['/', '/index.html', '/style.css', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE_NAME).map(x => caches.delete(x)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // East Money API: network-first
  if (url.hostname.includes('eastmoney.com')) {
    e.respondWith(fetch(e.request).then(r => {
      const clone = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return r;
    }).catch(() => caches.match(e.request)));
    return;
  }
  // Static: cache-first
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
