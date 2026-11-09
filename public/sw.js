// Yoganathan A — Developer Portfolio Service Worker
// Version: yoganathan-pwa-v1

const CACHE_NAME = "yoganathan-pwa-v1";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
  OFFLINE_URL,
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/icon-maskable-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-32x32.png",
  "/icons/icon.svg",
];

// Install Event — Precaching core offline assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate Event — Purge old caches and take control
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[Service Worker] Removing outdated cache:", key);
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch Event — Network-First for Navigation, Stale-While-Revalidate for Static Assets
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. Strict Security Rule: Never intercept non-GET requests (POST, PUT, DELETE, etc.)
  if (request.method !== "GET") {
    return;
  }

  // 2. Strict Security Rule: Never cache Supabase, API endpoints, or Admin routes
  if (
    url.hostname.includes("supabase.co") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/admin") ||
    url.pathname.includes("/admin/")
  ) {
    // Direct network pass-through, zero caching
    return;
  }

  // 3. Page Navigation Strategy: Network-First with Offline Page Fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // If valid response, update cache in background
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Network failed (offline): try cache first, fallback to /offline
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          const offlinePage = await caches.match(OFFLINE_URL);
          return offlinePage || Response.error();
        })
    );
    return;
  }

  // 4. Static Assets Strategy: Stale-While-Revalidate for icons and static chunks
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Default: Network with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

