// Kit Comercial Digital · DEMO
// Todos los datos son inventados: marca, productos, precios, clientes y comerciales.
const KIT = {
  marca: 'TU DISTRIBUIDORA',
  contacto: { nombre: 'David Díaz Ronquillo', tel: '639 657 748', wa: '34639657748' },
  familias: ['Aceites', 'Conservas', 'Arroz y legumbres', 'Bebidas', 'Lácteos', 'Congelados', 'Limpieza'],
  // [código, nombre, formato, familia, precio caja (€), uds/caja, color]
  productos: [
    ['A01', 'Aceite de oliva virgen extra', 'Garrafa 5 L · caja 3', 0, 38.90, 3, '#a7c957'],
    ['A02', 'Aceite de oliva virgen extra', 'Botella 1 L · caja 12', 0, 8.40 * 12, 12, '#c8d86a'],
    ['A03', 'Aceite de girasol alto oleico', 'Garrafa 5 L · caja 3', 0, 17.20 * 3, 3, '#f2c94c'],
    ['A04', 'Aceite de orujo de oliva', 'Garrafa 5 L · caja 3', 0, 24.60 * 3, 3, '#8fb339'],
    ['A05', 'Vinagre de vino blanco', 'Botella 1 L · caja 12', 0, 9.60, 12, '#e9d8a6'],
    ['C01', 'Tomate frito', '400 g · caja 24', 1, 18.70, 24, '#e5484d'],
    ['C02', 'Atún en aceite de oliva', 'Pack 3 · caja 12', 1, 29.50, 12, '#4f7cac'],
    ['C03', 'Pimiento del piquillo', '390 g · caja 12', 1, 22.80, 12, '#d1495b'],
    ['C04', 'Aceitunas manzanilla', 'Lata 2 kg · caja 6', 1, 31.20, 6, '#6a994e'],
    ['C05', 'Espárragos blancos', '9/12 · caja 12', 1, 35.40, 12, '#f1e3c6'],
    ['L01', 'Arroz redondo', '1 kg · caja 10', 2, 12.40, 10, '#f5ebe0'],
    ['L02', 'Arroz bomba', '1 kg · caja 10', 2, 26.90, 10, '#ede0d4'],
    ['L03', 'Garbanzo cocido', '570 g · caja 12', 2, 10.80, 12, '#ddb892'],
    ['L04', 'Lenteja pardina', '1 kg · caja 10', 2, 15.30, 10, '#b08968'],
    ['L05', 'Alubia blanca', '1 kg · caja 10', 2, 16.70, 10, '#e6ccb2'],
    ['B01', 'Refresco de cola', '33 cl · caja 24', 3, 9.90, 24, '#7f1d1d'],
    ['B02', 'Agua mineral', '1,5 L · pack 6', 3, 2.10, 6, '#7cc6fe'],
    ['B03', 'Zumo de naranja', '1 L · caja 6', 3, 7.80, 6, '#ffb703'],
    ['B04', 'Cerveza rubia', '33 cl · caja 24', 3, 14.60, 24, '#e9c46a'],
    ['B05', 'Tónica', '20 cl · caja 24', 3, 11.90, 24, '#bde0fe'],
    ['D01', 'Leche entera', '1 L · caja 6', 4, 5.70, 6, '#f8f9fa'],
    ['D02', 'Leche semidesnatada', '1 L · caja 6', 4, 5.40, 6, '#e9ecef'],
    ['D03', 'Huevos camperos L', 'Docena · caja 15', 4, 39.00, 15, '#f4d35e'],
    ['D04', 'Nata para cocinar', '1 L · caja 6', 4, 13.20, 6, '#fefae0'],
    ['D05', 'Queso semicurado', 'Pieza 3 kg', 4, 28.50, 1, '#f6bd60'],
    ['F01', 'Patata prefrita', '2,5 kg · caja 4', 5, 16.40, 4, '#ffd166'],
    ['F02', 'Croquetas de jamón', '1 kg · caja 6', 5, 37.80, 6, '#c08552'],
    ['F03', 'Calamar a la romana', '1 kg · caja 5', 5, 32.50, 5, '#f3d5b5'],
    ['F04', 'Guisantes finos', '1 kg · caja 10', 5, 18.90, 10, '#95d5b2'],
    ['F05', 'Gamba pelada', '1 kg · caja 5', 5, 44.00, 5, '#ffadad'],
    ['X01', 'Lavavajillas a mano', '1,5 L · caja 8', 6, 14.40, 8, '#80ed99'],
    ['X02', 'Lejía', '5 L · caja 3', 6, 7.95, 3, '#caf0f8'],
    ['X03', 'Papel de cocina', 'Pack 2 · bulto 12', 6, 18.60, 12, '#ffffff'],
    ['X04', 'Bolsas de basura', '100 L · caja 20 rollos', 6, 21.00, 20, '#343a40'],
    ['X05', 'Friegasuelos', '1,5 L · caja 8', 6, 12.80, 8, '#a0c4ff']
  ],
  comerciales: ['Marta', 'Luis', 'Rocío', 'Javi', 'Ana'],
  // contador base del mes (la demo suma lo que se envíe en directo)
  baseMes: { Marta: 38, Luis: 31, 'Rocío': 27, Javi: 19, Ana: 14 },
  // [nombre, canal P/T/W, localidad]
  clientes: [
    ['Bar La Esquina', 'P', 'Centro'], ['Restaurante El Olivo', 'P', 'Zona Norte'], ['Supermercado Barrio', 'T', 'Polígono'],
    ['Cafetería Central', 'W', 'Centro'], ['Mesón del Puerto', 'T', 'Costa'], ['Panadería Santa Ana', 'W', 'Barrio Alto'],
    ['Hotel Mirador', 'P', 'Costa'], ['Frutería Los Hermanos', 'W', 'Mercado'], ['Asador La Brasa', 'P', 'Zona Norte'],
    ['Tienda Ultramarinos Paco', 'T', 'Pueblo'], ['Kiosco La Plaza', 'W', 'Centro'], ['Catering Eventos Sur', 'T', 'Polígono'],
    ['Taberna El Rincón', 'P', 'Barrio Alto'], ['Colegio San José (comedor)', 'T', 'Zona Norte'], ['Pizzería Bella', 'W', 'Costa']
  ]
};
KIT.canal = { P: ['Presencial', '#dbeafe', '#1d4ed8'], T: ['Televenta', '#fef3c7', '#b45309'], W: ['WhatsApp', '#dcfce7', '#15803d'] };

// ---------- utilidades comunes ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const eur = v => (Math.round(v * 100) / 100).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('kitdemo_' + k); return v == null ? d : JSON.parse(v) } catch (e) { return d } },
  set(k, v) { try { localStorage.setItem('kitdemo_' + k, JSON.stringify(v)) } catch (e) { } },
  del(k) { try { localStorage.removeItem('kitdemo_' + k) } catch (e) { } }
};
function logAct(tipo, texto, comercial) {
  const a = store.get('actividad', []);
  a.unshift({ t: Date.now(), tipo, texto, comercial: comercial || '' });
  store.set('actividad', a.slice(0, 40));
}
function toast(msg) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t) }
  t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2600);
}
// imagen de producto dibujada (sin fotos reales)
function prodImg(p) {
  const [cod, nom, , fam, , , col] = p;
  const ini = nom.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const dark = ['#343a40', '#7f1d1d', '#4f7cac', '#b08968', '#c08552', '#6a994e', '#d1495b', '#e5484d'].includes(col);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${col}"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs><rect width="120" height="120" rx="18" fill="url(#g)"/><text x="60" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-size="38" font-weight="800" fill="${dark ? '#ffffff' : '#123a6b'}" opacity=".9">${ini}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
function header(titulo, back = true) {
  const h = document.createElement('header'); h.className = 'top';
  h.innerHTML = `${back ? '<a class="back" href="./" aria-label="Volver al inicio">‹</a>' : ''}<div class="brand"><b>${KIT.marca}</b><small>${esc(titulo)}</small></div><span class="demo">DEMO</span>`;
  document.body.prepend(h);
}
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
