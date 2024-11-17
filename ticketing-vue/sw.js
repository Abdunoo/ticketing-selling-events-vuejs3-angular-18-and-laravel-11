const BASE_URL = '/ticketing';
const CACHE_NAME = 'ticketing-app-cache-v1';
const ASSETS_TO_CACHE = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/manifest.json`,
  `${BASE_URL}/assets/index.css`,
  `${BASE_URL}/assets/index.js`,
  
  // Vue vendor chunk
  `${BASE_URL}/assets/js/vue-vendor-[hash].js`,
  
  // Main index chunk
  `${BASE_URL}/assets/js/index-[hash].js`,
  
  // Axios chunk
  `${BASE_URL}/assets/js/axios-[hash].js`,
  
  // Critical images
  `${BASE_URL}/assets/images/logo-[hash].webp`,
  `${BASE_URL}/assets/images/not_found.webp`,
  
  // Critical CSS
  `${BASE_URL}/assets/css/index-[hash].css`,
  
  // Additional critical chunks
  `${BASE_URL}/assets/js/Loading-[hash].js`,
  `${BASE_URL}/assets/js/EventCard-[hash].js`,
  `${BASE_URL}/assets/js/EventCategory-[hash].js`,
];

// Caching strategies
const CACHE_STRATEGIES = {
  JS_ASSETS: {
    cacheName: 'js-cache',
    maxEntries: 50,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  },
  CSS_ASSETS: {
    cacheName: 'css-cache',
    maxEntries: 20,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  },
  IMAGE_ASSETS: {
    cacheName: 'image-cache',
    maxEntries: 100,
    maxAgeSeconds: 60 * 24 * 60 * 60 // 60 days
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
  
  // Immediately activate the new service worker
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin + BASE_URL)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          const fetchRequest = event.request.clone();

          return fetch(fetchRequest).then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const url = new URL(event.request.url);
            const responseToCache = response.clone();
            let cacheStrategy;

            if (/js$/.test(url.pathname)) {
              cacheStrategy = CACHE_STRATEGIES.JS_ASSETS;
            } else if (/css$/.test(url.pathname)) {
              cacheStrategy = CACHE_STRATEGIES.CSS_ASSETS;
            } else if (/\.(webp|png|jpg|jpeg|gif|svg)$/.test(url.pathname)) {
              cacheStrategy = CACHE_STRATEGIES.IMAGE_ASSETS;
            }

            if (cacheStrategy) {
              caches.open(cacheStrategy.cacheName)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                })
                .catch((error) => {
                  console.error('Caching failed:', error);
                });
            }

            return response;
          }).catch((error) => {
            console.error('Network request failed:', error);
            return caches.match('/ticketing/offline.html');
          });
        })
    );
  }
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [
    CACHE_NAME,
    CACHE_STRATEGIES.JS_ASSETS.cacheName,
    CACHE_STRATEGIES.CSS_ASSETS.cacheName,
    CACHE_STRATEGIES.IMAGE_ASSETS.cacheName
  ];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Immediately claim the service worker
  return self.clients.claim();
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});