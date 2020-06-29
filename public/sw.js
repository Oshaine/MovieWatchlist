const staticCache = 'site-static-v2';
const dynamicCache = 'site-dynamic-v2';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/icons/icon-96x96.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/fallback.html',
];

//limit cache size
const limitCache = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCache(name, size));
            }
        })
    })
};

//install service worker
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets);
        })
    );


});
//activate service worker 
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    //delete old caches
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys //array of promise with keys of caches
                .filter(key => key !== staticCache && key !== dynamicCache) //filter array
                .map(key => caches.delete(key))
            )
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {//check to prevent firestore datacaching
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {//check if theres a math else continue fetch
                    return caches.open(dynamicCache).then(cache => {//opens the fetch request and stores it 
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCache(dynamicCache, 15);//
                        return fetchRes;
                    })
                });
            }).catch(() => {
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('/pages/fallback.html');
                }
            })
        );
    }
});