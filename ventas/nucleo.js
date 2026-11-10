/* Penalva · núcleo de datos de ventas y pedidos
   - Lee los listados de gsBase (ventas por cliente/artículo y listado de clientes)
   - Acumula las ventas desde el punto de partida (01/08/2026)
   - Genera los ficheros cifrados del cuadro de mando y de los enlaces de cada cliente
   - Los publica en GitHub (repo damdiroju-cdb/Rutas) */
(function(G){
'use strict';
const NV={};
const TE=new TextEncoder(),TD=new TextDecoder();
const REPO='damdiroju-cdb/Rutas',BRANCH='main';
const TEAM_KEY='Penalva26',TEAM_SALT='xSvMzckFGdhI5tcW7l6zuQ==';
const SHEET='https://script.google.com/macros/s/AKfycbwXS7Xx-Ow-AUmQuEEVul2jAnN6sdjO8hP1RzL_n-D0IcJuwLLBsN31Gc5tPCo902J4/exec';
NV.INICIO='2026-08-01';
NV.CENTRAL='615849304';
// comerciales conocidos (nombre → móvil). Se pueden cambiar desde el panel.
NV.REPS={'Antonio Aguado':'609253986','Abraham Megias':'627483661','David Sierra':'625400548','Jorge Ortega':'685330838','Antonio Ayala':'615849309','Jose Manuel Herrera':'695229073','Jose Manuel Avidad':'664549032','Juan Manuel Cabrerizo':'655334450','Juan Manuel Martin':'615849308','Manuel Borrego':'627483672','Sebastián Doncel':'656392838','David Díaz':'615849304','David Guadix':'625400548','Juanma Nordwik':'615849308'};
// fuera de nuestro canal: grandes cuentas, cadenas y distribuidores (códigos 990000 en adelante) y el 0
NV.fuera=c=>{const n=parseInt(c.c,10);return n===0||n>=990000};

// ---------- utilidades ----------
const b64=u=>{let s='';for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)};
const unb64=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u};
const b64url=u=>b64(u).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const B32='abcdefghijkmnpqrstuvwxyz23456789';
function b32(u,n){let bits=0,val=0,o='';for(const x of u){val=(val<<8)|x;bits+=8;while(bits>=5&&o.length<n){o+=B32[(val>>>(bits-5))&31];bits-=5}val&=255;if(o.length>=n)break}return o}
NV.b64=b64;NV.unb64=unb64;NV.b64url=b64url;
NV.norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().trim();
NV.slug=s=>NV.norm(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
NV.tel=s=>{const ds=String(s??'').split(/[\/,;|]| y /).map(x=>x.replace(/\D/g,'').replace(/^(0034|34)(?=\d{9}$)/,'')).filter(x=>/^\d{9}$/.test(x));return ds.find(x=>/^[67]/.test(x))||ds[0]||''};
NV.fmtD=iso=>{if(!iso)return'';const[y,m,d]=iso.split('-');return d+'/'+m+'/'+y};
const isoOf=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
NV.iso=isoOf;
NV.addDays=(iso,n)=>{const[y,m,d]=iso.split('-').map(Number);return isoOf(new Date(y,m-1,d+n))};

// ---------- cifrado ----------
async function aesKey(raw){return crypto.subtle.importKey('raw',raw,'AES-GCM',false,['encrypt','decrypt'])}
NV.encrypt=async(raw,bytes)=>{const iv=crypto.getRandomValues(new Uint8Array(12));const ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},await aesKey(raw),bytes));const o=new Uint8Array(12+ct.length);o.set(iv);o.set(ct,12);return o};
NV.decrypt=async(raw,u)=>new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM',iv:u.subarray(0,12)},await aesKey(raw),u.subarray(12)));
NV.gzip=async u=>new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());
NV.gunzip=async u=>new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
async function pbkdf2(pass,salt){const k=await crypto.subtle.importKey('raw',TE.encode(pass),'PBKDF2',false,['deriveBits']);return new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt,iterations:200000},k,256))}
// clave de carga → llaves derivadas
NV.claves=async clave=>{
  const M=await pbkdf2(String(clave).trim().toUpperCase(),TE.encode('penalva-pedidos-v1'));
  const hk=await crypto.subtle.importKey('raw',M,{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const h=async s=>new Uint8Array(await crypto.subtle.sign('HMAC',hk,TE.encode(s)));
  return{h,dash:await h('dash'),cat:(await h('cat')).slice(0,16)};
};
NV.idCliente=async(K,code)=>({id:b32(await K.h('id:'+code),10),k:b64url((await K.h('key:'+code)).slice(0,16))});

// ---------- lectura de Excel ----------
function sheetRows(ab){const wb=XLSX.read(ab,{type:'array'});const ws=wb.Sheets[wb.SheetNames[0]];return XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:null})}
const numv=v=>{if(v==null||v==='')return 0;if(typeof v==='number')return v;const n=parseFloat(String(v).replace(/\./g,'').replace(',','.'));return isNaN(n)?0:n};
// Listado «clientes y artículos» de gsBase: cliente → familia → artículo, con columnas «Ven AAAA €»
NV.leerVentas=ab=>{
  const R=sheetRows(ab);
  let h=-1,cols=[];
  for(let i=0;i<Math.min(R.length,15)&&h<0;i++){const r=R[i]||[];const c=[];r.forEach((v,j)=>{const m=String(v??'').match(/ven\w*\s*(\d{4})/i);if(m)c.push([+m[1],j])});if(c.length){h=i;cols=c}}
  if(h<0)throw new Error('No encuentro las columnas de venta («Ven 2026 €»…). ¿Es el listado de clientes y artículos de gsBase?');
  cols.sort((a,b)=>b[0]-a[0]);
  const jc=cols[0][1],jp=cols[1]?cols[1][1]:-1,year=cols[0][0];
  const out={year,cli:{},fams:{},arts:{},rows:[]};
  for(let i=h+1;i<R.length;i++){
    const r=R[i];if(!r)continue;const c0=r[0];if(c0==null||c0==='')continue;
    const s=String(c0);
    if(typeof c0==='number'||/^\s*\d+\s*$/.test(s)){out.cli[String(parseInt(s,10))]=String(r[1]??'').trim();continue}
    const p=s.trim().split('\u00b7');
    if(p.length===2){if(r[1])out.fams[p[1]]=String(r[1]).trim();continue}
    if(p.length>=3){
      const cc=String(parseInt(p[0],10)),fam=p[1],art=p.slice(2).join('\u00b7').trim();
      if(!out.arts[art])out.arts[art]=[String(r[1]??'').trim(),fam];
      const cur=Math.round(numv(r[jc])*100)/100,prev=jp>=0?Math.round(numv(r[jp])*100)/100:0;
      if(cur||prev)out.rows.push([cc,art,cur,prev]);
    }
  }
  if(!out.rows.length)throw new Error('El listado no trae ventas de artículos.');
  return out;
};
// Listado de clientes: código, nombre, comercial, móvil, población (columnas por nombre)
NV.leerClientes=ab=>{
  const R=sheetRows(ab);
  const pats={c:/^(c[oó]d|cd\b|n[ºo°]?\s*cli|cliente$)/i,n:/(nombre|raz[oó]n|descrip|cliente)/i,com:/(comercial|vendedor|agente|represent|ruta)/i,tel:/(m[oó]vil|tel[eé]f|whats|celular)/i,pob:/(poblaci|localidad|municipio|ciudad)/i,canal:/^canal/i,dia:/^d[ií]a/i};
  let h=-1,col={};
  for(let i=0;i<Math.min(R.length,15)&&h<0;i++){const r=(R[i]||[]).map(v=>String(v??'').replace('_x0001_','').trim());const cc={};
    r.forEach((v,j)=>{if(!v)return;for(const k of['c','com','tel','pob','canal','dia','n']){if(cc[k]==null&&pats[k].test(v)&&!Object.values(cc).includes(j)){cc[k]=j;break}}});
    if(cc.c!=null&&(cc.com!=null||cc.tel!=null)){h=i;col=cc}}
  if(h<0)throw new Error('No encuentro las columnas. El listado tiene que traer, como mínimo, el código de cliente y el comercial o el móvil.');
  const out=[];
  for(let i=h+1;i<R.length;i++){const r=R[i];if(!r)continue;const c=parseInt(String(r[col.c]??'').replace(/\D/g,''),10);if(isNaN(c))continue;
    const tels=[col.tel].concat(r.map((v,j)=>j).filter(j=>j!==col.tel&&/(tel|m[oó]vil)/i.test(String((R[h]||[])[j]??'')))).filter(j=>j!=null);
    let tel='';for(const j of tels){tel=NV.tel(r[j]);if(/^[67]/.test(tel))break}
    out.push({c:String(c),n:col.n!=null?String(r[col.n]??'').trim():'',com:col.com!=null?String(r[col.com]??'').trim():'',tel,pob:col.pob!=null?String(r[col.pob]??'').trim():'',canal:col.canal!=null?String(r[col.canal]??'').trim():'',dia:col.dia!=null?String(r[col.dia]??'').trim():''})}
  return{cols:Object.keys(col),rows:out};
};

// ---------- estado acumulado ----------
NV.nuevoEstado=()=>({v:1,inicio:NV.INICIO,act:null,periodos:[],cli:[],arts:[],fams:{},reps:Object.assign({},NV.REPS),central:NV.CENTRAL,envio:'comercial',cat:null});
function idx(st){
  st._ci=new Map(st.cli.map((c,i)=>[c.c,i]));st._ai=new Map(st.arts.map((a,i)=>[a[0],i]));
}
function cliIdx(st,c,n){let i=st._ci.get(c);if(i==null){i=st.cli.length;st.cli.push({c,n:n||('Cliente '+c),com:'',tel:'',pob:''});st._ci.set(c,i)}else if(n&&!/^Cliente \d+$/.test(n))st.cli[i].n=n;return i}
function artIdx(st,a,d,f){let i=st._ai.get(a);if(i==null){i=st.arts.length;st.arts.push([a,d||a,f||'']);st._ai.set(a,i)}else if(d)st.arts[i][1]=d;return i}
// sumas por cliente·artículo de todo lo cargado
NV.sumas=st=>{const m=new Map();for(const p of st.periodos){const r=p.rows;for(let i=0;i<r.length;i+=4){const k=r[i]*100000+r[i+1];const o=m.get(k);if(o){o[0]+=r[i+2];o[1]+=r[i+3]}else m.set(k,[r[i+2],r[i+3]])}}return m};
/* modo: 'acumulado' (el listado va desde el 01/08 → se resta lo ya cargado)
         'periodo'   (el listado trae solo las ventas de esos días → se suma) */
NV.cargarVentas=(st,V,desde,hasta,modo)=>{
  idx(st);
  if(!desde||!hasta||desde>hasta)throw new Error('Revisa las fechas: «desde» tiene que ser antes que «hasta».');
  const last=st.periodos.length?st.periodos[st.periodos.length-1].hasta:null;
  if(modo==='periodo'&&last&&desde<=last)throw new Error('Ya hay ventas cargadas hasta el '+NV.fmtD(last)+'. Este listado tiene que empezar el '+NV.fmtD(NV.addDays(last,1))+' o después.');
  if(modo==='acumulado'&&last&&hasta<=last)throw new Error('Ya está cargado hasta el '+NV.fmtD(last)+'. Este listado no trae nada nuevo.');
  for(const[c,n]of Object.entries(V.cli))cliIdx(st,c,n);
  Object.assign(st.fams,V.fams);
  const prevSum=modo==='acumulado'?NV.sumas(st):null;
  const rows=[];let tot=0;const cs=new Set();
  for(const[c,a,cur,prev]of V.rows){
    const ci=cliIdx(st,c,V.cli[c]),ai=artIdx(st,a,V.arts[a]&&V.arts[a][0],V.arts[a]&&V.arts[a][1]);
    let x=cur,y=prev;
    if(prevSum){const o=prevSum.get(ci*100000+ai);if(o){x=Math.round((cur-o[0])*100)/100;y=Math.round((prev-o[1])*100)/100}}
    if(Math.abs(x)<0.005&&Math.abs(y)<0.005)continue;
    rows.push(ci,ai,x,y);tot+=x;if(x>0)cs.add(ci);
  }
  const d0=modo==='acumulado'&&last?NV.addDays(last,1):desde;
  st.periodos.push({desde:d0,hasta,cargado:new Date().toISOString(),modo,rows});
  st.act=new Date().toISOString();
  return{desde:d0,hasta,lineas:rows.length/4,clientes:cs.size,total:Math.round(tot*100)/100};
};
NV.quitarUltimo=st=>{const p=st.periodos.pop();st.act=new Date().toISOString();return p};
NV.cargarClientes=(st,L)=>{
  idx(st);let n=0,com=0,tel=0;
  for(const r of L.rows){const i=cliIdx(st,r.c,r.n);const c=st.cli[i];if(r.com){c.com=r.com;com++}if(r.tel){c.tel=r.tel;tel++}if(r.pob)c.pob=r.pob;if(r.canal)c.canal=r.canal;if(r.dia)c.dia=r.dia;n++}
  // comerciales nuevos → se añaden al listado de teléfonos (si coincide el nombre con uno conocido, se le pone su móvil)
  const known=Object.entries(st.reps);
  for(const name of new Set(st.cli.map(c=>c.com).filter(Boolean))){
    if(st.reps[name]!=null)continue;
    const nn=NV.norm(name).split(/\s+/);
    let hit=null,best=0;
    for(const[k,v]of known){const kk=NV.norm(k).split(/\s+/);const sc=kk.filter(w=>w.length>2&&nn.includes(w)).length;if(sc>=Math.min(2,kk.length)&&sc>best){best=sc;hit=v}}
    st.reps[name]=hit||'';
  }
  st.act=new Date().toISOString();
  return{clientes:n,conComercial:com,conMovil:tel};
};
NV.waCliente=(st,c)=>{if(st.envio==='comercial'&&c.com&&st.reps[c.com])return st.reps[c.com];return st.central||NV.CENTRAL};

// ---------- tarifa (la del cotizador + precios del día) ----------
const wre=/(?:(\d+)\s?[Xx]\s?)?(\d+(?:[.,]\d+)?)\s?(KGS|KG|K|GRS|GR|G|ML|CL|LTS|LT|L)(?![A-Za-z])/gi,WF={KG:1000,KGS:1000,K:1000,GR:1,GRS:1,G:1,ML:1,CL:10,LT:1000,LTS:1000,L:1000};
function peso(d){const ms=[...String(d).matchAll(wre)];if(!ms.length)return[null,null];const m=ms[ms.length-1];return[m[0].replace(/\s/g,'').toUpperCase(),Math.round(WF[m[3].toUpperCase()]*parseFloat(m[2].replace(',','.'))*10)/10]}
function undCaja(p,q,uf,desc){if(uf==='KG'||!p||p<0.01||!q)return null;const k=p/q;if(Math.abs(k-Math.round(k))<0.06&&Math.round(k)>=2)return Math.round(k);for(const m of String(desc).matchAll(/\d+/g)){const c=+m[0];if(c>=2&&c<=1000&&Math.abs(p/c-q)<=0.0051)return c}return null}
function applyPrices(T,P){
  if(!P||!Array.isArray(P.rows)||P.rows.length<500)return;
  const base=new Map(T.rows.map(r=>[r[0],r]));
  const ix=(arr,name)=>{if(!name)return 0;let i=arr.indexOf(name);if(i<0){arr.push(name);i=arr.length-1}return i};
  T.rows=P.rows.map(p=>{const code=String(p[0]),b=base.get(code),desc=p[1]||(b&&b[1])||'';const[w,wn]=peso(desc);
    let k=undCaja(p[3],p[5],p[4],desc);if(k==null&&b&&b[3]===p[3])k=b[11];
    return[code,desc,p[2],p[3],p[4],p[5],p[6]?ix(T.fams,p[6]):(b?b[6]:0),p[7]?ix(T.subs,p[7]):(b?b[7]:0),w,wn,b?b[10]:0,k]});
  T.fecha=P.fecha;
}
NV.tarifa=async(base)=>{
  base=base||'../cotizador/';
  const raw=await pbkdf2(TEAM_KEY,unb64(TEAM_SALT));
  const u=new Uint8Array(await (await fetch(base+'tarifa.bin?_='+Date.now(),{cache:'no-store'})).arrayBuffer());
  const T=JSON.parse(TD.decode(await NV.decrypt(raw,u)));
  try{const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),6000);
    const P=await (await fetch(SHEET+'?accion=precios&k='+encodeURIComponent(TEAM_KEY)+'&_='+Date.now(),{signal:ctl.signal})).json();clearTimeout(t);
    applyPrices(T,P)}catch(e){console.warn('precios del día no disponibles',e)}
  return T;
};

// ---------- ficheros a publicar ----------
NV.SHARDS=B32;
NV.construir=async(st,K,T)=>{
  idx(st);
  const files={};
  // totales por cliente·artículo y último periodo
  const P=st.periodos,last=P[P.length-1];
  const tot=NV.sumas(st),ult=new Map();
  if(last&&P.length>1){const r=last.rows;for(let i=0;i<r.length;i+=4)ult.set(r[i]*100000+r[i+1],r[i+2])}
  // catálogo para clientes: tarifa con precio
  const tmap=new Map();
  const cat={fecha:T.fecha||isoOf(new Date()),subs:T.subs,rows:[]};
  for(const r of T.rows){if(!(r[3]>0))continue;tmap.set(r[0],1);cat.rows.push([r[0],r[1],r[2],r[3],r[4],r[5],r[7],r[11]||null])}
  files['pedido/catalogo.bin']=b64(await NV.encrypt(K.cat,TE.encode(JSON.stringify(cat))));
  // enlaces por cliente
  const per={};for(const k of tot.keys()){const ci=Math.floor(k/100000);(per[ci]=per[ci]||[]).push(k)}
  const shards={};for(const ch of B32)shards[ch]={};
  const ck=b64url(K.cat);
  for(let ci=0;ci<st.cli.length;ci++){
    const c=st.cli[ci];
    if(NV.fuera(c))continue;
    if(!c.id){const x=await NV.idCliente(K,c.c);c.id=x.id;c.k=x.k}
    const it=(per[ci]||[]).map(k=>{const ai=k%100000,a=st.arts[ai];return[a[0],Math.round(tot.get(k)[0]*100)/100,Math.round((ult.get(k)||0)*100)/100,a[1]]}).filter(x=>x[1]>0.005).sort((a,b)=>b[1]-a[1]);
    const body={c:c.c,n:c.n,wa:NV.waCliente(st,c),com:c.com||'',desde:st.inicio,hasta:last?last.hasta:null,ult:last&&P.length>1?[last.desde,last.hasta]:null,it,ck};
    shards[c.id[0]][c.id]=b64(await NV.encrypt(unb64(c.k),TE.encode(JSON.stringify(body))));
  }
  for(const ch of B32)files['pedido/d/'+ch+'.json']=JSON.stringify(shards[ch]);
  // estado completo (cuadro de mando) cifrado con la llave del cuadro
  st.cat=cat.fecha;
  const clean=JSON.stringify(st,(k,v)=>k[0]==='_'?undefined:v);
  files['ventas/datos.bin']=b64(await NV.encrypt(K.dash,await NV.gzip(TE.encode(clean))));
  return files;
};
NV.abrirDatos=async(dashRaw,base)=>{
  const res=await fetch((base||'')+'datos.bin?_='+Date.now(),{cache:'no-store'});
  if(res.status===404)return null;
  if(!res.ok)throw new Error('No se han podido leer los datos ('+res.status+')');
  const st=JSON.parse(TD.decode(await NV.gunzip(await NV.decrypt(dashRaw,unb64((await res.text()).trim())))));
  return st;
};

// ---------- publicar en GitHub (un solo commit con todos los ficheros) ----------
NV.publicar=async(token,files,msg,onStep)=>{
  const api=(p,o={})=>fetch('https://api.github.com/repos/'+REPO+p,Object.assign({},o,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','Content-Type':'application/json'}})).then(async r=>{const j=await r.json().catch(()=>({}));if(!r.ok){const e=new Error(r.status===401||r.status===403?'La llave de GitHub no vale o no tiene permiso para escribir en Rutas.':(j.message||('Error '+r.status)));e.status=r.status;throw e}return j});
  onStep&&onStep('Conectando con GitHub…');
  const ref=await api('/git/ref/heads/'+BRANCH);
  const com=await api('/git/commits/'+ref.object.sha);
  onStep&&onStep('Subiendo '+Object.keys(files).length+' ficheros…');
  const tree=await api('/git/trees',{method:'POST',body:JSON.stringify({base_tree:com.tree.sha,tree:Object.entries(files).map(([path,content])=>({path,mode:'100644',type:'blob',content}))})});
  const nc=await api('/git/commits',{method:'POST',body:JSON.stringify({message:msg,tree:tree.sha,parents:[ref.object.sha]})});
  await api('/git/refs/heads/'+BRANCH,{method:'PATCH',body:JSON.stringify({sha:nc.sha})});
  return nc.sha;
};
NV.probarToken=async token=>{const r=await fetch('https://api.github.com/repos/'+REPO,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json'}});if(!r.ok)return false;const j=await r.json();return!!(j.permissions&&j.permissions.push)};
NV.LINK_BASE='https://damdiroju-cdb.github.io/Rutas/';
NV.enlace=c=>NV.LINK_BASE+'pedido/?c='+c.id+'#'+c.k;
G.NV=NV;
})(window);
