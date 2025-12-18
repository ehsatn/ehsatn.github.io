// Service Worker v1.3 - signight PWA
const CACHE_NAME = 'signight-v1.4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/core.js',
  '/chart.js',
  '/monte-carlo.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  // Skip waiting to activate immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Cache] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((err) => {
        console.error('[Cache] Failed to cache assets:', err);
      })
  );
});

// Activate
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Cache] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Listen for skipWaiting request from client when user accepts update
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch - Network first for API, Cache first for static
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // API requests - network only (Binance, CoinMarketCap, CoinGecko, CryptoCompare data)
  if (url.hostname.includes('binance') || url.hostname.includes('coinmarketcap') || url.hostname.includes('coingecko') || url.hostname.includes('cryptocompare') || url.hostname.includes('allorigins') || url.hostname.includes('api')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response(JSON.stringify({ error: 'Offline' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }
  
  // Static assets - stale-while-revalidate strategy
  // This serves from cache immediately but fetches updates in background
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Fetch fresh version in background
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // If network fails, return cached version if available
          return cachedResponse;
        });
        
        // Return cached version immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
  );
});

// Push Notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: data.data,
    actions: [
      { action: 'view', title: 'مشاهده' },
      { action: 'close', title: 'بستن' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
