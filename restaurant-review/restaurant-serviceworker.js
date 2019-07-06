console.log("Restaurant cache service worker....");


self.addEventListener('install', function (event) {
  console.log("service worker install event");
  event.waitUntil(
    caches.open('restaurantCache').then(function (cache){
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/restaurant.html?id=',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        'js/restaurant_info.js',
        'img/'
      ]);
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function(res){
      if(res){
        return res;
      }
      return fetch (event.request);
    })
  )
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurantCache') &&
            cacheName != staticCacheName;
        }).map(function (cacheName) {
          return cache.delete(cacheName);
        })
      )

    })
  )
})

