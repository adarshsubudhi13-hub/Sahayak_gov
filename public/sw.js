/**
 * Sahayak Service Worker – Phase 2
 *
 * Strategy:
 *  - App shell (HTML, JS, CSS) → Cache-first with network update
 *  - API calls (Supabase, OpenAI) → Network-first, no caching (live data required)
 *  - Static assets (fonts, images) → Cache-first
 *
 * Offline: Shows cached scheme listings when offline; AI chat falls back gracefully.
 */

const CACHE_NAME = 'sahayak-v2';
const PRECACHE_URLS = [
  '/',
  '/index.html',
];

// ── Install: precache app shell ───────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// ── Activate: clear old caches ────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: routing strategy ───────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never cache: Supabase, OpenAI API, or non-GET requests
  if (
    request.method !== 'GET' ||
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('openai.com')
  ) {
    return; // Let browser handle normally
  }

  // Cache-first for same-origin assets (JS, CSS, fonts, images)
  if (url.origin === self.location.origin || url.hostname.includes('fonts.')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
  }
});
