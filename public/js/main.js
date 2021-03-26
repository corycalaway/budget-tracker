if('serviceWorker' in navigator) {
    console.log('Service Worker Supported');

    // Register when window loads
    window.addEventListener('load', () => {
        
        //register service worker js page
        navigator.serviceWorker
        //sw page must be in same root as the index
        // .register('../service-worker.js')
        .register('../service-worker-select.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
}

Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});