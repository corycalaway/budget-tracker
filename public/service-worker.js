
// For caching entire site
const APP_PREFIX = 'serviceworkerhelp-';     
const VERSION = 'version_02';
const cacheName = APP_PREFIX + VERSION


// add event listner to self
self.addEventListener('install', (event) => {
    // preserve console to see
    console.log('Service Worker: Installed');
})


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
        
        fetch(event.request)
            .then(response => {
                // Make coply/clone of response
                const resClone = response.clone();
                // Open Cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put(event.request, resClone);
                    });
                    return response
            }).catch(err => caches.match(event.request).then(response => response))
    )

})