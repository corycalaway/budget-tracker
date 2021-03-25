if('serviceWorker' in navigator) {
    console.log('Service Worker Supported');

    // Register when window loads
    window.addEventListener('load', () => {
        
        //register service worker js page
        navigator.serviceWorker
        //sw page must be in same root as the index
        .register('../service-worker.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
}