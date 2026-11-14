(function(){
var $=function(i){return document.getElementById(i)};
var FAM=document.body.getAttribute('data-f');
var P=new URLSearchParams(location.search), CS=P.get('c')||'';
var TEL_DEF='34692853375', COM=null, DATA=null, CART={};
var FAMS=[['navidad','🎄 Especial Navidad'],['tapas','🍺 Especial Tapas'],['pescado','🐟 Pescados'],['carne','🥩 Carnes'],['precocinados','🍤 Precocinados'],['pan-bolleria','🥐 Pan y bollería'],['postres','🍮 Postres'],['tartas','🍰 Tartas'],['helados-nordwik','🍦 Helados Nordwik'],['helados-frigo','🍨 Helados Frigo'],['v-gama','🥘 V gama'],['verduras','🥦 Verduras y patatas'],['seco','🥫 Seco'],['refrigerados','🧀 Refrigerados']];
var U={CJ:'caja',UN:'ud',KG:'kg',BT:'bote',LT:'litro',L:'litro',BOL:'bolsa',EST:'estuche'};
function un(x){return U[x]||(/^C\d+$/.test(x||'')?'caja':(x||'ud').toLowerCase())}
function eur(v){return v.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2})+' €'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function norm(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase()}
function toast(t){var e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove('on')},1600)}
function load(){try{CART=JSON.parse(localStorage.getItem('pen_pedido')||'{}')||{}}catch(e){CART={}}}
function save(){try{localStorage.setItem('pen_pedido',JSON.stringify(CART))}catch(e){}paintCart()}
function q(c){return CART[c]?CART[c].q:0}
function setQ(r,n){ if(n<=0) delete CART[r[0]]; else CART[r[0]]={q:n,d:r[1],p:r[3],f:r[2],fam:FAM,w:r[9]||0}; save(); var b=document.querySelector('#list [data-c="'+r[0]+'"] .qt'); if(b) b.innerHTML=qtHTML(r[0]); if(DVC===r[0]) dvQ(); }
function qtHTML(c){var n=q(c);return n?'<div class="stp"><button data-a="-">−</button><b>'+n+'</b><button data-a="+">+</button></div>':'<button class="add" data-a="+">Añadir</button>'}
function paintCart(){ var ks=Object.keys(CART), n=ks.reduce(function(a,k){return a+CART[k].q},0);
  var b=$('cartb'); b.classList.toggle('on',ks.length>0); b.innerHTML='🛒 Mi pedido <i>'+ks.length+'</i>'; }
var MAXT=null; window.PEN={filtro:function(v){MAXT=v;render();}};
function render(){
  var qs=norm($('q').value).trim(), ws=qs?qs.split(/\s+/):[], L=$('list'), h='', hits=0;
  DATA.secciones.forEach(function(s,si){
    var rows=s.a.filter(function(r){ if(MAXT!=null&&!(r[12]!=null&&r[12]<=MAXT+1e-9)) return false; if(!ws.length) return true; var k=norm(r[1]+' '+r[0]); return ws.every(function(w){return k.indexOf(w)>=0}); });
    if(!rows.length) return; hits+=rows.length;
    h+='<h2 class="sec" id="s'+si+'">'+esc(s.n)+' <small>· '+rows.length+'</small></h2>';
    rows.forEach(function(r){
      var pu=un(r[2]), extra='';
      if(r[5]&&r[4]&&un(r[4])!==pu&&r[5]>0) extra=' <small>· '+eur(r[5])+'/'+un(r[4])+'</small>';
      var fmt=[]; if(r[6]&&r[6]>1&&r[2]!=='UN') fmt.push(r[6]+' ud/'+pu); if(r[9]) fmt.push('caja de '+String(r[9]).replace('.',',')+' kg aprox.'); else if(r[7]) fmt.push(r[7]);
      h+='<div class="it" data-c="'+esc(r[0])+'"><div class="ph">'+((r[8]||r[10])?'<img loading="lazy" decoding="async" alt="" src="'+fotoM(r)+'" onerror="this.onerror=null;this.src=\'../img/'+encodeURIComponent(r[0])+'.jpg\'">':'📦')+'</div>'+
        '<div class="tx"><div class="nm">'+esc(r[1])+'</div><div class="cd">Ref. '+esc(r[0])+(fmt.length?' · '+esc(fmt.join(' · ')):'')+'</div>'+
        '<div class="pr">'+(r[9]?'≈ ':'')+eur(r[3])+' <small>/'+pu+'</small>'+extra+'</div>'+(r[12]!=null?'<div class="tp">🍺 Tapa ≈ <b>'+eur(r[12])+'</b> <small>· '+esc(r[11]||'')+'</small></div>':'')+'</div><div class="qt">'+qtHTML(r[0])+'</div></div>';
    });
  });
  L.innerHTML=hits?h:'<div class="nores">No encuentro «'+esc($('q').value)+'» en este catálogo.<br>Prueba con otra palabra o mira en los demás catálogos de abajo.</div>';
}
var BY={};
function bind(){
  $('list').addEventListener('click',function(e){ var a=e.target.closest('[data-a]'); if(!a){ var it0=e.target.closest('.it'); if(it0) dvOpen(it0.getAttribute('data-c'),true); return; } var it=a.closest('.it'), r=BY[it.getAttribute('data-c')];
    var n=q(r[0])+(a.getAttribute('data-a')==='+'?1:-1); setQ(r,n); if(n===1&&a.classList.contains('add')) toast('Añadido a tu pedido'); });
  $('q').addEventListener('input',render);
  $('cartb').onclick=openCart; $('sh').addEventListener('click',function(e){ if(e.target===$('sh')) $('sh').classList.remove('open'); });
}
function comTel(){ return (COM&&COM.tel)||TEL_DEF }
function comNom(){ return COM?COM.nombre.split(/[ «]/)[0]:'Penalva' }
var REG=''; fetch('../../cotizacion/config.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(c){REG=(c&&c.registro)||''}).catch(function(){});
function registro(neg,cx,tt){ if(!REG) return; try{
  var d={fecha:new Date().toISOString(),catalogo:'Catálogos por familia',comercial:COM?COM.nombre.replace(/\s*«.*»/,''):'Televenta (sin comercial)',tel:comTel(),negocio:neg,comentario:cx,importe:Math.round(tt*100)/100,
    articulos:Object.keys(CART).map(function(k){ var x=CART[k]; return {ref:k,nombre:x.d,formato:'',familia:x.fam||'',cantidad:x.q,unidad:un(x.f),precio:Math.round(x.p*100)/100,importe:Math.round(x.q*x.p*100)/100,oferta:''}; })};
  var body=JSON.stringify(d); if(navigator.sendBeacon) navigator.sendBeacon(REG,new Blob([body],{type:'text/plain'})); else fetch(REG,{method:'POST',mode:'no-cors',body:body,keepalive:true});
}catch(e){} }
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
    registro(neg,cx,tt); location.href='https://wa.me/'+comTel()+'?text='+encodeURIComponent(t);
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

/* ---------- ficha de artículo en grande ---------- */
var DVC=null, DVE=null, ZVE=null;
var FB='../../../fotos/';
function fotoM(r){ return r[10]?FB+'m/'+encodeURIComponent(r[0])+'.webp?v=3':'../img/'+encodeURIComponent(r[0])+'.jpg'; }
function dvSrc(r){ return r[10]?FB+encodeURIComponent(r[0])+'.jpg?v=3':'../img/'+encodeURIComponent(r[0])+'.jpg'; }
function fotoL(r){ return r[10]?FB+'l/'+encodeURIComponent(r[0])+'.webp?v=3':'../img/'+encodeURIComponent(r[0])+'.jpg'; }
function dvSec(c){ var n=''; DATA.secciones.forEach(function(s){ if(!n&&s.a.some(function(r){return r[0]===c})) n=s.n; }); return n; }
function dvList(){ return [].map.call(document.querySelectorAll('#list .it'),function(e){return e.getAttribute('data-c')}); }
function dvMk(){ if(DVE) return;
  DVE=document.createElement('div'); DVE.className='sh dv'; DVE.setAttribute('role','dialog'); DVE.setAttribute('aria-modal','true');
  DVE.innerHTML='<div class="shb"><div class="dvt"><button class="dvx" id="dvx">‹ Volver al catálogo</button><span id="dvr"></span></div>'+
    '<div class="dvi" id="dvi"></div><div class="dvh" id="dvh">Toca la foto para verla a pantalla completa</div>'+
    '<div class="dvs" id="dvs"></div><h3 class="dvn" id="dvn"></h3><div class="dvf" id="dvf"></div><div class="dvp" id="dvp"></div>'+
    '<div class="dvq" id="dvq"></div><button class="send" id="dvc"></button>'+
    '<div class="dvnav"><button id="dvprev">‹ Anterior</button><button id="dvnext">Siguiente ›</button></div></div>';
  document.body.appendChild(DVE);
  ZVE=document.createElement('div'); ZVE.className='zv'; ZVE.innerHTML='<button class="dvx" id="zvx">Cerrar foto</button><div class="zi"><img id="zvi" alt="Foto del producto"></div>'; document.body.appendChild(ZVE);
  DVE.addEventListener('click',function(e){ if(e.target===DVE) dvClose(); });
  $('dvx').onclick=dvClose;
  $('dvi').onclick=function(){ var r=BY[DVC]; if(!r||!(r[8]||r[10])) return; $('zvi').src=fotoL(r); ZVE.classList.add('open'); try{history.pushState({pz:1},'')}catch(e){} };
  $('zvx').onclick=function(){ history.back(); };
  ZVE.addEventListener('click',function(e){ if(e.target.id!=='zvi') history.back(); });
  $('dvprev').onclick=function(){ dvStep(-1) }; $('dvnext').onclick=function(){ dvStep(1) };
  $('dvc').onclick=function(){ DVE.classList.remove('open'); DVC=null; openCart(); };
  $('dvq').addEventListener('click',function(e){ var a=e.target.closest('[data-a]'); if(!a) return; var r=BY[DVC], n=q(r[0])+(a.getAttribute('data-a')==='+'?1:-1); setQ(r,n); if(n===1&&a.classList.contains('dvadd')) toast('Añadido a tu pedido'); });
  var sx=0,sy=0; $('dvi').addEventListener('touchstart',function(e){ sx=e.touches[0].clientX; sy=e.touches[0].clientY; },{passive:true});
  $('dvi').addEventListener('touchend',function(e){ var dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy; if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){ e.preventDefault(); dvStep(dx<0?1:-1); } });
  window.addEventListener('popstate',function(){ if(ZVE.classList.contains('open')){ ZVE.classList.remove('open'); return; } if(DVE.classList.contains('open')){ DVE.classList.remove('open'); DVC=null; } });
}
function dvQ(){ var n=q(DVC), r=BY[DVC], u=un(r[2]);
  $('dvq').innerHTML=n?'<div class="stp big"><button data-a="-">−</button><b>'+n+' '+u+(n>1&&u!=='kg'?'s':'')+'</b><button data-a="+">+</button></div><div class="dvin">✓ En tu pedido</div>':'<button class="add dvadd" data-a="+">🛒 Añadir al pedido</button>';
  var k=Object.keys(CART).length; $('dvc').textContent='Ver mi pedido ('+k+')'; }
function dvOpen(c,push){ var r=BY[c]; if(!r) return; dvMk(); DVC=c;
  var pu=un(r[2]), fmt=[]; if(r[6]&&r[6]>1&&r[2]!=='UN') fmt.push(r[6]+' ud/'+pu); if(r[9]) fmt.push('caja de '+String(r[9]).replace('.',',')+' kg aprox.'); else if(r[7]) fmt.push(r[7]);
  $('dvr').innerHTML='Ref. <b>'+esc(c)+'</b>'; $('dvs').textContent=dvSec(c); $('dvn').textContent=r[1]; $('dvf').textContent=fmt.length?'Formato: '+fmt.join(' · '):'';
  var pr=(r[9]?'≈ ':'')+eur(r[3])+' /'+pu; if(r[5]&&r[4]&&un(r[4])!==pu&&r[5]>0) pr+=' · '+eur(r[5])+'/'+un(r[4]); if(r[12]!=null) pr+='  ·  🍺 Tapa ≈ '+eur(r[12])+' ('+(r[11]||'')+')'; $('dvp').textContent=pr;
  var im=$('dvi'); if(r[8]||r[10]){ im.style.backgroundImage="url('"+dvSrc(r)+"')"; im.textContent=''; $('dvh').style.visibility='visible'; } else { im.style.backgroundImage='none'; im.textContent='📦'; $('dvh').style.visibility='hidden'; }
  var L=dvList(), i=L.indexOf(c); $('dvprev').disabled=i<=0; $('dvnext').disabled=i<0||i>=L.length-1;
  dvQ(); if(!DVE.classList.contains('open')){ DVE.classList.add('open'); if(push){ try{history.pushState({pv:1},'')}catch(e){} } }
  DVE.querySelector('.shb').scrollTop=0; }
function dvStep(d){ var L=dvList(), i=L.indexOf(DVC)+d; if(i>=0&&i<L.length) dvOpen(L[i],false); }
function dvClose(){ if(history.state&&history.state.pv) history.back(); else { DVE.classList.remove('open'); DVC=null; } }
})();
