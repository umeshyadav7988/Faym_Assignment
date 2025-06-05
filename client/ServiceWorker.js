self.addEventListener('install', (event) => {
  console.log('Service Worker: install event');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: activate event');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
