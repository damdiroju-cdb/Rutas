// Cuadro de ventas: siempre lo último de la red; si no hay red, lo último guardado
const C='ventas-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(u.origin+u.pathname,cp))}return r}).catch(()=>caches.match(u.origin+u.pathname)));
});
