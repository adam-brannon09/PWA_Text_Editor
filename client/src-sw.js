const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// This line of code is responsible for caching the files specified in the Workbox build manifest
precacheAndRoute(self.__WB_MANIFEST);

// This defines a CacheFirst strategy, a strategy where the response is fetched from cache first
// If the response isn't in the cache, the network is then used
// The cache used is named 'page-cache', and it only caches successful responses (status 0 for opaque responses, 200 for successful network responses)
// The cache also expires entries after 30 days (30 * 24 * 60 * 60 seconds)
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Here we prime the 'page-cache' cache with '/index.html' and '/'.
// This means those pages will be immediately cached for offline use
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// This is the route registration for navigation requests.
// Any navigation requests will be served using the pageCache (CacheFirst strategy)
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

// This is the route registration for 'style', 'script', and 'worker' destinations.
// These will be served using a StaleWhileRevalidate strategy (if available in cache, use it, but also send a request to the network to update the cache)
// The cache used is named 'asset-cache', and it only caches successful responses (status 0 for opaque responses, 200 for successful network responses)
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

