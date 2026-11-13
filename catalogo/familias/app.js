(function(){
var $=function(i){return document.getElementById(i)};
var FAM=document.body.getAttribute('data-f');
var P=new URLSearchParams(location.search), CS=P.get('c')||'';
var TEL_DEF='34692853375', COM=null, DATA=null, CART={};
var FAMS=[['pescado','🐟 Pescados'],['carne','🥩 Carnes'],['precocinados','🍤 Precocinados'],['postres','🍮 Postres'],['tartas','🍰 Tartas'],['helados-nordwik','🍦 Helados Nordwik'],['helados-frigo','🍨 Helados Frigo'],['v-gama','🥘 V gama'],['seco','🥫 Seco'],['refrigerados','🧀 Refrigerados']];
var U={CJ:'caja',UN:'ud',KG:'kg',BT:'bote',LT:'litro',L:'litro',BOL:'bolsa',EST:'estuche'};
function un(x){return U[x]||(/^C\d+$/.test(x||'')?'caja':(x||'ud').toLowerCase())}
function eur(v){return v.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2})+' €'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function norm(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase()}
function toast(t){var e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove('on')},1600)}
function load(){try{CART=JSON.parse(localStorage.getItem('pen_pedido')||'{}')||{}}catch(e){CART={}}}
function save(){try{localStorage.setItem('pen_pedido',JSON.stringify(CART))}catch(e){}paintCart()}
function q(c){return CART[c]?CART[c].q:0}
function setQ(r,n){ if(n<=0) delete CART[r[0]]; else CART[r[0]]={q:n,d:r[1],p:r[3],f:r[2],fam:FAM,w:r[9]||0}; save(); var b=document.querySelector('[data-c="'+r[0]+'"] .qt'); if(b) b.innerHTML=qtHTML(r[0]); }
function qtHTML(c){var n=q(c);return n?'<div class="stp"><button data-a="-">−</button><b>'+n+'</b><button data-a="+">+</button></div>':'<button class="add" data-a="+">Añadir</button>'}
function paintCart(){ var ks=Object.keys(CART), n=ks.reduce(function(a,k){return a+CART[k].q},0);
  var b=$('cartb'); b.classList.toggle('on',ks.length>0); b.innerHTML='🛒 Mi pedido <i>'+ks.length+'</i>'; }
function render(){
  var qs=norm($('q').value).trim(), ws=qs?qs.split(/\s+/):[], L=$('list'), h='', hits=0;
  DATA.secciones.forEach(function(s,si){
    var rows=s.a.filter(function(r){ if(!ws.length) return true; var k=norm(r[1]+' '+r[0]); return ws.every(function(w){return k.indexOf(w)>=0}); });
    if(!rows.length) return; hits+=rows.length;
    h+='<h2 class="sec" id="s'+si+'">'+esc(s.n)+' <small>· '+rows.length+'</small></h2>';
    rows.forEach(function(r){
      var pu=un(r[2]), extra='';
      if(r[5]&&r[4]&&un(r[4])!==pu&&r[5]>0) extra=' <small>· '+eur(r[5])+'/'+un(r[4])+'</small>';
      var fmt=[]; if(r[6]&&r[6]>1&&r[2]!=='UN') fmt.push(r[6]+' ud/'+pu); if(r[9]) fmt.push('caja de '+String(r[9]).replace('.',',')+' kg aprox.'); else if(r[7]) fmt.push(r[7]);
      h+='<div class="it" data-c="'+esc(r[0])+'"><div class="ph"'+(r[8]?' style="background-image:url(\'../img/'+encodeURIComponent(r[0])+'.jpg\')"':'')+'>'+(r[8]?'':'📦')+'</div>'+
        '<div class="tx"><div class="nm">'+esc(r[1])+'</div><div class="cd">Ref. '+esc(r[0])+(fmt.length?' · '+esc(fmt.join(' · ')):'')+'</div>'+
        '<div class="pr">'+(r[9]?'≈ ':'')+eur(r[3])+' <small>/'+pu+'</small>'+extra+'</div></div><div class="qt">'+qtHTML(r[0])+'</div></div>';
    });
  });
  L.innerHTML=hits?h:'<div class="nores">No encuentro «'+esc($('q').value)+'» en este catálogo.<br>Prueba con otra palabra o mira en los demás catálogos de abajo.</div>';
}
var BY={};
function bind(){
  $('list').addEventListener('click',function(e){ var a=e.target.closest('[data-a]'); if(!a) return; var it=a.closest('.it'), r=BY[it.getAttribute('data-c')];
    var n=q(r[0])+(a.getAttribute('data-a')==='+'?1:-1); setQ(r,n); if(n===1&&a.classList.contains('add')) toast('Añadido a tu pedido'); });
  $('q').addEventListener('input',render);
  $('cartb').onclick=openCart; $('sh').addEventListener('click',function(e){ if(e.target===$('sh')) $('sh').classList.remove('open'); });
}
function comTel(){ return (COM&&COM.tel)||TEL_DEF }
function comNom(){ return COM?COM.nombre.split(/[ «]/)[0]:'Penalva' }
function openCart(){
  var ks=Object.keys(CART), tot=0, h='<h3>🛒 Mi pedido</h3><p class="sub">Revisa las cantidades y mándaselo a '+(COM?'<b>'+esc(comNom())+'</b>, tu comercial':'<b>Penalva</b>')+' por WhatsApp.</p>';
  if(!ks.length) h+='<p class="sub">Todavía no has añadido nada.</p>';
  ks.forEach(function(k){ var x=CART[k], s=x.q*x.p; tot+=s;
    h+='<div class="ln" data-k="'+esc(k)+'"><div class="tx"><b>'+esc(x.d)+'</b><span>Ref. '+esc(k)+' · '+(x.w?'≈ ':'')+eur(x.p)+'/'+un(x.f)+'</span></div><div class="stp"><button data-a="-">−</button><b>'+x.q+'</b><button data-a="+">+</button></div></div>'; });
  if(ks.length){
    h+='<div class="tot"><span>Importe orientativo</span><span>'+eur(tot)+'</span></div><p class="sub" style="font-size:12.5px">Precios de tarifa sin IVA. Tu comercial te confirma precio y entrega.'+(ks.some(function(k){return CART[k].w})?' Lo que va a peso se cobra por el peso real de la caja.':'')+'</p>';
    h+='<label for="cn">Nombre de tu negocio</label><input id="cn" autocomplete="organization" placeholder="Ej.: Bar Los Arcos">';
    h+='<label for="cx">Comentario (opcional)</label><textarea id="cx" rows="2" placeholder="Ej.: entregar el martes por la mañana"></textarea><div class="err" id="ce"></div>';
    h+='<a class="send" id="snd" href="#">📲 Enviar pedido a '+esc(comNom())+'</a><button class="lnk" id="vac">Vaciar pedido</button>';
  }
  h+='<button class="lnk" id="cer">Seguir mirando</button>';
  $('shb').innerHTML=h; $('sh').classList.add('open');
  try{ $('cn').value=localStorage.getItem('pen_negocio')||'' }catch(e){}
  $('cer').onclick=function(){ $('sh').classList.remove('open') };
  if(!ks.length) return;
  $('shb').querySelectorAll('.ln .stp button').forEach(function(b){ b.onclick=function(){ var k=b.closest('.ln').getAttribute('data-k'), x=CART[k]; var n=x.q+(b.getAttribute('data-a')==='+'?1:-1);
    if(n<=0) delete CART[k]; else x.q=n; save(); var r=BY[k]; if(r){var it=document.querySelector('[data-c="'+k+'"] .qt'); if(it) it.innerHTML=qtHTML(k);} openCart(); } });
  $('vac').onclick=function(){ if(!confirm('¿Vaciar el pedido?')) return; CART={}; save(); render(); $('sh').classList.remove('open'); };
  $('snd').onclick=function(e){ e.preventDefault(); var neg=$('cn').value.trim(); if(!neg){ $('ce').textContent='Pon el nombre de tu negocio para que sepamos de quién es el pedido.'; $('cn').focus(); return; }
    try{localStorage.setItem('pen_negocio',neg)}catch(er){}
    var t='🛒 *PEDIDO desde el catálogo Penalva*\n🏪 '+neg+'\n\n', tt=0;
    Object.keys(CART).forEach(function(k){ var x=CART[k]; tt+=x.q*x.p; t+='• '+x.q+' '+un(x.f)+(x.q>1&&un(x.f)!=='kg'?'s':'')+' — '+x.d+' (Ref. '+k+')\n'; });
    t+='\nImporte orientativo: '+eur(tt)+' (tarifa, sin IVA'+(Object.keys(CART).some(function(k){return CART[k].w})?'; lo de peso según peso real':'')+')';
    var cx=$('cx').value.trim(); if(cx) t+='\n📝 '+cx;
    location.href='https://wa.me/'+comTel()+'?text='+encodeURIComponent(t);
    setTimeout(function(){ $('shb').innerHTML='<h3>✅ ¡Pedido preparado!</h3><p class="sub">Se ha abierto WhatsApp con tu pedido. Solo falta darle a <b>enviar</b>.</p><button class="send" id="ok1">Ya lo he enviado · vaciar pedido</button><button class="lnk" id="ok2">Todavía no, mantener el pedido</button>';
      $('ok1').onclick=function(){ CART={}; save(); render(); $('sh').classList.remove('open'); toast('¡Gracias por tu pedido!'); }; $('ok2').onclick=function(){ $('sh').classList.remove('open') }; },700);
  };
}
function head(){
  document.documentElement.style.setProperty('--c',DATA.color);
  var n=DATA.secciones.reduce(function(a,s){return a+s.a.length},0);
  $('h1').textContent=DATA.titulo; $('lm').textContent=DATA.lema+' · '+n+' artículos';
  if(COM){ $('com').hidden=false; $('comn').textContent='Tu comercial: '+COM.nombre.replace(/\s*«.*»/,''); $('coml').href='https://wa.me/'+COM.tel; }
  $('chips').innerHTML=DATA.secciones.map(function(s,i){return '<button class="chip" data-s="'+i+'">'+esc(s.n)+'</button>'}).join('');
  $('chips').onclick=function(e){ var b=e.target.closest('.chip'); if(!b) return; $('q').value=''; render(); var t=$('s'+b.getAttribute('data-s')); if(t) t.scrollIntoView({behavior:'smooth'}); };
  var qs=CS?'?c='+encodeURIComponent(CS):'';
  $('more').innerHTML=FAMS.filter(function(f){return f[0]!==FAM}).map(function(f){return '<a class="chip" href="../'+f[0]+'/'+qs+'" style="text-decoration:none">'+f[1]+'</a>'}).join('');
}
load(); paintCart();
Promise.all([fetch('../data/'+FAM+'.json').then(function(r){return r.json()}), fetch('../../biblioteca/catalogos.json',{cache:'no-cache'}).then(function(r){return r.json()}).catch(function(){return null})])
.then(function(res){ DATA=res[0]; var B=res[1];
  if(B&&CS){ COM=(B.comerciales||[]).filter(function(c){return c.slug===CS})[0]||null; }
  DATA.secciones.forEach(function(s){ s.a.forEach(function(r){ BY[r[0]]=r; }); });
  Object.keys(CART).forEach(function(k){ var r=BY[k]; if(r){ CART[k].p=r[3]; CART[k].f=r[2]; CART[k].w=r[9]||0; } }); save();
  head(); render(); bind();
}).catch(function(){ $('list').innerHTML='<div class="nores">No se ha podido cargar el catálogo. Revisa la cobertura y vuelve a intentarlo.</div>'; });
})();
