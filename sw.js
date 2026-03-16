const CACHE_NAME = 'vault-cache-v8';

const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icon.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // إجبار المتصفح على تفعيل التحديث فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// السر هنا: هذه الدالة تقوم بمسح أي كاش قديم عند تحديث رقم الإصدار
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('تم حذف الكاش القديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});