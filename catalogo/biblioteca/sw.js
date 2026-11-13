// Biblioteca de catálogos Penalva – abre aunque no haya cobertura (última versión vista)
const CACHE='biblioteca-v1';
const SHELL=['./','./index.html','./catalogos.json','./img/icon-192.png','./img/icon-512.png','../penalva.png','../nordwik.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('biblioteca-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==location.origin||!url.pathname.startsWith('/Rutas/catalogo/')) return;
  // red primero para tener siempre lo último; caché si no hay cobertura
  e.respondWith(fetch(req).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp))}return r}).catch(()=>caches.match(req,{ignoreSearch:true})));
});
