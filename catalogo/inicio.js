// Botón «🏠 Inicio» para volver a la Biblioteca Penalva.
// Solo aparece si se ha llegado desde la biblioteca (los clientes no lo ven).
//  data-replace="id"  → convierte ese botón en «🏠 Inicio»
//  data-before="id"   → pone un botón «🏠 Inicio» justo antes de ese elemento
//  (sin nada)         → botón flotante abajo a la izquierda
(function(){
  try{
    var me=document.currentScript;
    var home=sessionStorage.getItem('pen_lib_home');
    if(!home||location.pathname.indexOf('/catalogo/biblioteca/')>=0) return;
    var go=function(e){ if(e){e.preventDefault();e.stopImmediatePropagation();} location.href=home; };
    var put=function(){
      if(document.getElementById('pen-home')) return;
      var rep=me&&me.getAttribute('data-replace'), bef=me&&me.getAttribute('data-before');
      var r=rep&&document.getElementById(rep);
      if(r){ r.textContent='🏠 Inicio'; r.id='pen-home'; r.addEventListener('click',go,true); r.onclick=go; return; }
      var b=bef&&document.getElementById(bef);
      var a=document.createElement('a'); a.id='pen-home'; a.href=home; a.target='_top'; a.textContent='🏠 Inicio';
      if(b){
        a.setAttribute('style','display:inline-flex;align-items:center;min-height:40px;padding:0 14px;margin-right:8px;border-radius:999px;background:#D2000F;color:#fff;font:800 15px system-ui,-apple-system,sans-serif;text-decoration:none;white-space:nowrap');
        b.parentNode.insertBefore(a,b); return;
      }
      a.setAttribute('style','position:fixed;left:12px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:2147483000;display:inline-flex;align-items:center;min-height:48px;padding:0 18px;border-radius:999px;background:#D2000F;color:#fff;font:800 16px system-ui,-apple-system,sans-serif;text-decoration:none;box-shadow:0 6px 18px rgba(0,0,0,.28)');
      document.body.appendChild(a);
    };
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',put); else put();
  }catch(e){}
})();
