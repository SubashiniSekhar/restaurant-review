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
      return fetch (event.request).then(
        function (response) {
          if (!response || response.status !== 200 || response.type != 'basic'){
            return response;
          }

          var responseCache = response.clone();
          caches.open('restaurantCache').then(function (cache) {
            cache.put(event.request, responseCache);
          });
        }
      );
    })
  )
});


