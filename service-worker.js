// Based off of: https://web.dev/offline-cookbook/

const CACHE = 'network-or-cache';

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      }).catch(function(err) {
        return cache.match(event.request).then(function(response) {
          return response || Promise.reject('no-match');
        });
      });
    })
  );
});