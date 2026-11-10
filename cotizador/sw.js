// Cotizador Penalva – funciona sin cobertura con la última tarifa descargada
const CACHE='cotizador-v14';
const SHELL=['./','./index.html','./panel.html','./manifest.webmanifest','./img/icon-192.png','./img/icon-512.png','./img/apple-touch-icon.png',
 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{mode:u.startsWith('http')?'no-cors':'same-origin'})).catch(()=>{}))))) ;self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET'||url.hostname.includes('script.google')) return;
  const isData=url.pathname.endsWith('.bin')||req.mode==='navigate'||url.pathname.endsWith('.html');
  if(isData){ // red primero (tarifa al día), caché si no hay cobertura
    const bust=new URL(req.url);bust.searchParams.set('_',Date.now());
    const fresh=fetch(bust.toString(),{cache:'no-store',credentials:'same-origin'});
    e.respondWith(fresh.then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp))}return r}).catch(()=>caches.match(req,{ignoreSearch:true})));
    return;
  }
  e.respondWith(caches.match(req).then(hit=>{const net=fetch(req).then(r=>{if(r.ok||r.type==='opaque'){const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp))}return r}).catch(()=>hit);return hit||net}));
});
