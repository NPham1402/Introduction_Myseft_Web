const CACHE = 'dpn-portfolio-v3';
const PRECACHE = ['/', '/manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  /* skip non-http requests (chrome-extension://, etc.) */
  if (!url.startsWith('http')) return;

  /* network-first for JS/CSS chunks — always get latest after deploy */
  if (url.includes('/_next/static/')) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) {
            const cloned = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, cloned));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  /* cache-first for everything else (fonts, images, manifest) */
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request).then((res) => {
        if (res.ok) {
          const cloned = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, cloned));
        }
        return res;
      });
      return cached || network;
    })
  );
});
