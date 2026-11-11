// Cuadro de ventas: siempre lo último de la red; si no hay red, lo último guardado
const C='ventas-v5';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const fresh=e.request.mode==='navigate'||/\.(html|js|bin|json)$/.test(u.pathname)||u.pathname.endsWith('/');
  e.respondWith((fresh?fetch(u.href,{cache:'no-cache',credentials:'same-origin'}):fetch(e.request)).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(u.origin+u.pathname,cp))}return r}).catch(()=>caches.match(u.origin+u.pathname)));
});
