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

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
