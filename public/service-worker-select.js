// For caching specific pages
const APP_PREFIX = 'serviceworkerhelp-';     
const VERSION = 'version_01';
const cacheName = APP_PREFIX + VERSION

// array of all pages to cache
const cacheAssets = [
    '/',
    './index.html',
    '/manifest.json',
    './js/main.js',
    './js/index.js',
    './js/idb.js',
    './css/styles.css',
    './api/transaction'
    
];


// Call Install Event (where you wanna handle cacheing assets)
// add event listner to self
self.addEventListener('install', (event) => {
    // preserve console to see
    console.log('Service Worker: Installed');

    // wait untill promise is finished to complete service worker
    event.waitUntil(
        // usesd to open cache
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            //assets to add
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
})

// self.addEventListener('install', function (e) {
//     e.waitUntil(
//       caches.open(cacheName).then(function (cache) {
//         console.log('installing cache : ' + cacheName)
//         return cache.addAll(cacheAssets)
//       })
//     )
//   })

// Call Activate Event
self.addEventListener('activate', (event) => {
    // preserve console to see
    console.log('Service Worker: Activated')

    // Remove unwanted cahces
    event.waitUntil(
        // loop if cache is not current iteration delete
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    // if current cache looping through does not equal current cachename then delete it
                    if(cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache')
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// show cached files when offline
// Call Fetch Event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    //check if live site is available, if not load cached site
    event.respondWith(
        // if not connection this will fail
        fetch(event.request).catch(() => caches.match(event.request))
    )

})