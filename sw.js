// Service worker: permite instalar la app y abrirla sin conexión
const CACHE = "guiapy-v2";
const ARCHIVOS = ["./", "./index.html", "./css/styles.css", "./js/icons.js", "./js/config.js", "./js/data.js", "./js/app.js", "./manifest.json", "./icons/icon.svg", "./vendor/leaflet/leaflet.js", "./vendor/leaflet/leaflet.css"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS))));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
