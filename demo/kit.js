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
// ---------- fotos ficticias: envases dibujados (sin fotos reales ni marcas reales) ----------
// tipo de envase, texto corto de etiqueta y color del contenido por artículo
const ENV = {
  A01: ['garrafa', 'AOVE', '#9bb83a'], A02: ['botella', 'AOVE', '#a8c040'], A03: ['garrafa', 'GIRASOL', '#f2c230'], A04: ['garrafa', 'ORUJO', '#7d9a2c'], A05: ['botella', 'VINAGRE', '#efe3b8'],
  C01: ['lata', 'TOMATE FRITO', '#d62828'], C02: ['pack3', 'ATÚN', '#2d5f8b'], C03: ['tarro', 'PIQUILLO', '#c1121f'], C04: ['latagrande', 'ACEITUNAS', '#6a994e'], C05: ['tarro', 'ESPÁRRAGOS', '#f1e3c6'],
  L01: ['bolsa', 'ARROZ', '#fdfcf7'], L02: ['saco', 'ARROZ BOMBA', '#f5ead8'], L03: ['tarro', 'GARBANZO', '#d9b382'], L04: ['bolsa', 'LENTEJA', '#8d6748'], L05: ['bolsa', 'ALUBIA', '#f3ead9'],
  B01: ['latarefresco', 'COLA', '#7f1d1d'], B02: ['botellagua', 'AGUA', '#9fd8ff'], B03: ['brick', 'NARANJA', '#ff9f1c'], B04: ['botellin', 'CERVEZA', '#d9a404'], B05: ['botellin', 'TÓNICA', '#bde0fe'],
  D01: ['brick', 'LECHE', '#1d6fd1'], D02: ['brick', 'SEMI', '#2a9d8f'], D03: ['huevera', 'HUEVOS', '#e9a23b'], D04: ['brick', 'NATA', '#c8a2c8'], D05: ['queso', 'QUESO', '#f4c95d'],
  F01: ['bolsacong', 'PATATAS', '#ffd166'], F02: ['cajacong', 'CROQUETAS', '#c08552'], F03: ['bolsacong', 'CALAMAR', '#f3d5b5'], F04: ['bolsacong', 'GUISANTES', '#52b788'], F05: ['bolsacong', 'GAMBA', '#ff8fa3'],
  X01: ['bote', 'LAVAVAJILLAS', '#57cc99'], X02: ['garrafa', 'LEJÍA', '#e0f4ff'], X03: ['rollos', 'PAPEL', '#ffffff'], X04: ['rollobolsas', 'BOLSAS 100 L', '#343a40'], X05: ['bote', 'FRIEGASUELOS', '#7aa2ff']
};
function label(x, y, w, h, txt, col, r = 6) {
  const fs = txt.length > 9 ? Math.min(h * .26, w / txt.length * 1.55) : Math.min(h * .32, w / Math.max(txt.length, 3) * 1.6);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#fff"/><rect x="${x}" y="${y}" width="${w}" height="${h * .22}" rx="${r}" fill="#123a6b"/><rect x="${x}" y="${y + h * .12}" width="${w}" height="${h * .1}" fill="#123a6b"/>` +
    `<text x="${x + w / 2}" y="${y + h * .17}" text-anchor="middle" font-size="${h * .12}" font-weight="800" fill="#fff" textLength="${w * .84}" lengthAdjust="spacingAndGlyphs">TU DISTRIBUIDORA</text>` +
    `<text x="${x + w / 2}" y="${y + h * .62}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="#122033"${fs * .66 * txt.length > w * .9 ? ` textLength="${w * .88}" lengthAdjust="spacingAndGlyphs"` : ''}>${txt}</text>` +
    `<rect x="${x + w * .18}" y="${y + h * .76}" width="${w * .64}" height="${h * .09}" rx="${h * .045}" fill="${col}" stroke="#0002"/>`;
}
const SHAPES = {
  garrafa: (c, t) => `<path d="M88 52h44v14h-6v8c22 4 34 18 34 38v80c0 8-6 14-14 14H74c-8 0-14-6-14-14v-80c0-20 12-34 34-38v-8h-6z" fill="${c}" opacity=".92"/><path d="M150 96c14 0 20 10 20 22v34c0 10-8 14-14 14" fill="none" stroke="${c}" stroke-width="10" opacity=".92"/><rect x="86" y="44" width="48" height="14" rx="4" fill="#123a6b"/><path d="M70 120h20v86H70z" fill="#fff" opacity=".18"/>` + label(70, 128, 80, 66, t, c),
  botella: (c, t) => `<rect x="103" y="30" width="20" height="16" rx="3" fill="#123a6b"/><path d="M104 46h18v26c18 8 22 20 22 34v96c0 8-5 12-12 12H94c-7 0-12-4-12-12v-96c0-14 4-26 22-34z" fill="${c}" opacity=".9"/><rect x="88" y="110" width="8" height="90" rx="4" fill="#fff" opacity=".35"/>` + label(86, 124, 54, 62, t, c),
  botellagua: (c, t) => `<rect x="102" y="28" width="22" height="14" rx="3" fill="#1d4ed8"/><path d="M104 42h18v14c16 6 26 18 26 34v110c0 8-6 14-14 14H92c-8 0-14-6-14-14V90c0-16 10-28 26-34z" fill="${c}" opacity=".55"/><path d="M80 110h66M80 150h66M80 190h66" stroke="#fff" stroke-width="3" opacity=".6"/>` + label(80, 112, 66, 56, t, '#7cc6fe'),
  botellin: (c, t) => `<g transform="translate(-34 0)"><rect x="104" y="44" width="16" height="12" rx="3" fill="#888"/><path d="M106 56h12v26c12 6 16 16 16 28v86c0 7-5 10-11 10h-22c-6 0-11-3-11-10v-86c0-12 4-22 16-28z" fill="${c}" opacity=".9"/>${label(92, 132, 40, 46, t, c, 4)}</g><g transform="translate(34 0)"><rect x="104" y="44" width="16" height="12" rx="3" fill="#888"/><path d="M106 56h12v26c12 6 16 16 16 28v86c0 7-5 10-11 10h-22c-6 0-11-3-11-10v-86c0-12 4-22 16-28z" fill="${c}" opacity=".9"/>${label(92, 132, 40, 46, t, c, 4)}</g>`,
  lata: (c, t) => `<ellipse cx="120" cy="80" rx="52" ry="12" fill="#c9ced6"/><rect x="68" y="80" width="104" height="110" fill="${c}"/><ellipse cx="120" cy="190" rx="52" ry="12" fill="${c}"/><rect x="68" y="80" width="14" height="110" fill="#fff" opacity=".25"/>` + label(78, 98, 84, 72, t, '#ffb703'),
  latagrande: (c, t) => `<ellipse cx="120" cy="58" rx="62" ry="14" fill="#c9ced6"/><rect x="58" y="58" width="124" height="148" fill="#dfe3e8"/><ellipse cx="120" cy="206" rx="62" ry="14" fill="#cfd4db"/>` + label(70, 92, 100, 84, t, c),
  latarefresco: (c, t) => [0, 1].map(i => `<g transform="translate(${i ? 34 : -34} 0)"><ellipse cx="120" cy="66" rx="30" ry="7" fill="#c9ced6"/><rect x="90" y="66" width="60" height="136" rx="6" fill="${c}"/><ellipse cx="120" cy="202" rx="30" ry="7" fill="${c}"/><rect x="94" y="70" width="8" height="128" fill="#fff" opacity=".25"/>${label(96, 110, 48, 58, t, '#e63946', 4)}</g>`).join(''),
  pack3: (c, t) => [0, 1, 2].map(i => `<g transform="translate(0 ${i * -30})"><ellipse cx="120" cy="${170}" rx="58" ry="12" fill="${c}"/><rect x="62" y="150" width="116" height="20" fill="${c}"/><ellipse cx="120" cy="150" rx="58" ry="12" fill="#cfd4db"/></g>`).join('') + `<rect x="54" y="106" width="132" height="62" rx="8" fill="#fff" opacity=".96"/><rect x="54" y="106" width="132" height="16" rx="8" fill="#123a6b"/><text x="120" y="118" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">TU DISTRIBUIDORA · PACK 3</text><text x="120" y="152" text-anchor="middle" font-size="24" font-weight="900" fill="${c}">${t}</text>`,
  tarro: (c, t) => `<rect x="80" y="40" width="80" height="22" rx="5" fill="#123a6b"/><path d="M76 62h88c6 0 10 4 10 10v124c0 8-6 14-14 14H80c-8 0-14-6-14-14V72c0-6 4-10 10-10z" fill="${c}" opacity=".85"/><path d="M76 62h88c6 0 10 4 10 10v124c0 8-6 14-14 14H80c-8 0-14-6-14-14V72c0-6 4-10 10-10z" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/><rect x="74" y="74" width="8" height="120" rx="4" fill="#fff" opacity=".4"/>` + label(80, 104, 80, 70, t, c),
  bolsa: (c, t) => `<path d="M74 44h92l8 22-4 132c0 8-6 14-14 14H84c-8 0-14-6-14-14L66 66z" fill="${c}" stroke="#0001"/><path d="M74 44h92l-6 12H80z" fill="#123a6b"/><path d="M74 44l6 12M166 44l-6 12" stroke="#0002"/>` + label(80, 96, 80, 78, t, '#f4a261'),
  saco: (c, t) => `<path d="M68 56c0-10 8-14 52-14s52 4 52 14l-4 146c0 8-6 12-14 12H86c-8 0-14-4-14-12z" fill="${c}" stroke="#a98467" stroke-width="2"/><path d="M90 50c10 8 50 8 60 0" stroke="#a98467" stroke-width="5" fill="none"/>` + label(80, 98, 80, 78, t, '#e76f51'),
  brick: (c, t) => `<path d="M84 50l14-16h44l14 16v152c0 6-4 10-10 10H94c-6 0-10-4-10-10z" fill="#fff" stroke="#d8dde4"/><path d="M84 50h72v14H84z" fill="${c}"/><rect x="130" y="24" width="12" height="14" rx="3" fill="${c}"/><rect x="84" y="150" width="72" height="62" fill="${c}" opacity=".85"/><text x="120" y="96" text-anchor="middle" font-size="9" font-weight="800" fill="#123a6b">TU DISTRIBUIDORA</text><text x="120" y="${t.length > 6 ? 126 : 130}" text-anchor="middle" font-size="${t.length > 6 ? 17 : 24}" font-weight="900" fill="${c}">${t}</text><text x="120" y="190" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">1 L</text>`,
  huevera: (c, t) => `<path d="M48 120h144l-10 70c-1 8-7 12-14 12H72c-7 0-13-4-14-12z" fill="#d6c7a8"/>${[0, 1, 2, 3, 4, 5].map(i => `<ellipse cx="${66 + i * 22}" cy="112" rx="11" ry="15" fill="${i % 2 ? '#e9c28a' : '#f1d3a5'}"/>`).join('')}<rect x="62" y="140" width="116" height="44" rx="8" fill="#fff"/><text x="120" y="158" text-anchor="middle" font-size="9" font-weight="800" fill="#123a6b">TU DISTRIBUIDORA</text><text x="120" y="177" text-anchor="middle" font-size="15" font-weight="900" fill="${c}">CAMPEROS L</text>`,
  queso: (c, t) => `<ellipse cx="120" cy="176" rx="82" ry="22" fill="#d9a441"/><rect x="38" y="104" width="164" height="72" fill="${c}"/><ellipse cx="120" cy="104" rx="82" ry="22" fill="#f8dc8e"/><path d="M38 120h164" stroke="#c9922e" stroke-width="2" opacity=".5"/><rect x="82" y="128" width="76" height="40" rx="6" fill="#fff"/><text x="120" y="144" text-anchor="middle" font-size="8" font-weight="800" fill="#123a6b">TU DISTRIBUIDORA</text><text x="120" y="162" text-anchor="middle" font-size="14" font-weight="900" fill="#b5651d">SEMICURADO</text>`,
  bolsacong: (c, t) => `<path d="M70 40h100l6 14-6 150c0 6-4 10-10 10H80c-6 0-10-4-10-10l-6-150z" fill="#1d4e89"/><path d="M70 40h100v10H70z" fill="#0b2e59"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${84 + (i * 37) % 72}" cy="${70 + i * 8}" r="2" fill="#fff" opacity=".7"/>`).join('')}<ellipse cx="120" cy="164" rx="42" ry="28" fill="${c}"/><text x="120" y="92" text-anchor="middle" font-size="9" font-weight="800" fill="#bde0fe" textLength="88" lengthAdjust="spacingAndGlyphs">TU DISTRIBUIDORA · CONGELADO</text><text x="120" y="${t.length > 8 ? 120 : 124}" text-anchor="middle" font-size="${t.length > 8 ? 18 : 22}" font-weight="900" fill="#fff" ${t.length > 7 ? 'textLength="88" lengthAdjust="spacingAndGlyphs"' : ''}>${t}</text>`,
  cajacong: (c, t) => `<path d="M56 86l64-26 64 26v104l-64 24-64-24z" fill="#1d4e89"/><path d="M56 86l64 24 64-24M120 110v104" stroke="#0b2e59" stroke-width="2" fill="none"/><path d="M120 60l64 26-64 24-64-24z" fill="#2a6bb5"/>${[0, 1, 2].map(i => `<ellipse cx="${76 + i * 14}" cy="${150 + i * 6}" rx="12" ry="8" fill="${c}"/>`).join('')}<text x="152" y="140" text-anchor="middle" font-size="11" font-weight="900" fill="#fff" transform="rotate(-20 152 140)">${t}</text><text x="120" y="88" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">TU DISTRIBUIDORA</text>`,
  bote: (c, t) => `<rect x="114" y="28" width="20" height="18" rx="3" fill="#fff" stroke="#ccc"/><path d="M122 30h26v8h-14" stroke="#ccc" stroke-width="4" fill="none"/><path d="M98 46h52c8 0 14 6 14 14v138c0 8-6 14-14 14H98c-8 0-14-6-14-14V60c0-8 6-14 14-14z" fill="${c}"/><rect x="90" y="60" width="8" height="140" rx="4" fill="#fff" opacity=".3"/>` + label(92, 110, 64, 64, t, '#fff'),
  rollos: (c, t) => `<rect x="54" y="64" width="132" height="146" rx="14" fill="#e9f2ff" stroke="#bcd3f2"/>${[0, 1].map(i => `<rect x="${66 + i * 58}" y="76" width="50" height="122" rx="10" fill="#fff" stroke="#d5dfe9"/><ellipse cx="${91 + i * 58}" cy="80" rx="25" ry="7" fill="#f4f6f9"/><ellipse cx="${91 + i * 58}" cy="80" rx="8" ry="3" fill="#c9b79c"/>`).join('')}<rect x="66" y="128" width="108" height="38" rx="6" fill="#123a6b"/><text x="120" y="152" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">PAPEL COCINA</text>`,
  rollobolsas: (c, t) => `<ellipse cx="120" cy="70" rx="58" ry="16" fill="#555"/><rect x="62" y="70" width="116" height="110" fill="${c}"/><ellipse cx="120" cy="180" rx="58" ry="16" fill="#2b2f33"/><ellipse cx="120" cy="70" rx="14" ry="5" fill="#222"/><path d="M178 160c18 6 20 30 0 40H120" fill="${c}"/>` + label(76, 92, 88, 64, t, '#ffd60a')
};
function prodImg(p) {
  const e = ENV[p[0]] || ['bolsa', p[1].split(' ')[0].toUpperCase(), p[6]];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" font-family="Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif"><defs><radialGradient id="bg" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6ebf2"/></radialGradient></defs><rect width="240" height="240" fill="url(#bg)"/><ellipse cx="120" cy="218" rx="78" ry="9" fill="#000" opacity=".12"/>${SHAPES[e[0]](e[2], e[1])}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// ---------- ficha completa del artículo ----------
const FAM_INFO = [
  ['Aceite de oliva y semillas. Ideal para cocina, fritura y aliño.', 'Lugar fresco, seco y sin luz directa.', 'Ninguno.', 'España (Andalucía)', 18],
  ['Conserva lista para usar. Formato hostelería y tienda.', 'Ambiente. Una vez abierto, en frío y consumir en 3 días.', 'Pescado (en atún). Ver etiqueta.', 'España', 36],
  ['Producto seco de primera calidad, grano seleccionado.', 'Lugar fresco y seco, envase cerrado.', 'Puede contener trazas de gluten.', 'España', 24],
  ['Bebida. Servir fría.', 'Ambiente, evitar la luz solar.', 'Ninguno.', 'España', 12],
  ['Lácteos y huevos de granjas seleccionadas.', 'Refrigerado entre 1 y 6 °C.', 'Leche / huevo.', 'España', 1],
  ['Producto congelado, listo para freír u hornear.', 'Congelado a −18 °C. No volver a congelar.', 'Gluten, leche, crustáceos según artículo.', 'UE', 18],
  ['Limpieza e higiene profesional.', 'Fuera del alcance de los niños.', 'No aplica.', 'España', 36]
];
function ficha(p, onAdd) {
  const [cod, nom, fmt, fam, pc, ud] = p; const I = FAM_INFO[fam];
  const ean = '84' + String(9000000000 + parseInt(cod.slice(1)) * 7919 + fam * 101).slice(0, 10) + '0';
  let m = $('#ficha'); if (!m) { m = document.createElement('div'); m.id = 'ficha'; m.className = 'modal'; document.body.appendChild(m) }
  m.innerHTML = `<div class="sheet fich"><button class="x" aria-label="Cerrar">✕</button><img class="big" src="${prodImg(p)}" alt="${esc(nom)}">
   <div class="fam">${KIT.familias[fam]} · Ref. ${cod}</div><h3>${esc(nom)}</h3><div class="muted">${esc(fmt)}</div>
   <div class="prs"><div><b>${eur(pc)}</b><small>precio caja</small></div><div><b>${eur(pc / ud)}</b><small>precio unidad</small></div><div><b>${ud}</b><small>uds. / caja</small></div></div>
   <p>${I[0]}</p>
   <table><tr><th>Conservación</th><td>${I[1]}</td></tr><tr><th>Alérgenos</th><td>${I[2]}</td></tr><tr><th>Origen</th><td>${I[3]}</td></tr><tr><th>Vida útil</th><td>${I[4]} ${I[4] === 1 ? 'mes' : 'meses'}</td></tr><tr><th>EAN</th><td>${ean}</td></tr><tr><th>Venta</th><td>Por caja completa</td></tr></table>
   ${onAdd ? '<button class="btn g block" id="fAdd">Añadir 1 caja</button>' : ''}<p class="muted" style="text-align:center;margin:10px 0 0">Ficha de ejemplo · datos ficticios</p></div>`;
  m.hidden = false;
  m.onclick = e => { if (e.target === m || e.target.closest('.x')) m.hidden = true };
  if (onAdd) $('#fAdd').onclick = () => { onAdd(cod); m.hidden = true; toast('Añadido: ' + nom) };
}
(function () {
  const s = document.createElement('style');
  s.textContent = `.fich{position:relative}.fich .x{position:absolute;top:14px;right:14px;width:40px;height:40px;border-radius:20px;border:0;background:#eef2f7;font-size:18px;cursor:pointer;z-index:2}
  .fich .big{display:block;width:100%;max-width:340px;margin:0 auto 10px;aspect-ratio:1;border-radius:20px}
  .fich .fam{color:#2563eb;font-weight:800;font-size:12px;letter-spacing:.4px;text-transform:uppercase}.fich h3{font-size:22px;margin:4px 0 2px}
  .fich .prs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0}.fich .prs div{background:#eef2f7;border-radius:14px;padding:10px;text-align:center}
  .fich .prs b{display:block;font-size:17px;color:#123a6b}.fich .prs small{color:#6b7a90;font-size:11.5px;font-weight:600}
  .fich p{font-size:14.5px;line-height:1.45;color:#33415a}.fich table{width:100%;border-collapse:collapse;font-size:14px;margin:6px 0 16px}
  .fich th{text-align:left;color:#6b7a90;font-weight:600;padding:8px 10px 8px 0;width:36%;vertical-align:top;border-bottom:1px solid #eef1f5}.fich td{padding:8px 0;border-bottom:1px solid #eef1f5;font-weight:600}
  img[data-f]{cursor:zoom-in}`;
  document.head.appendChild(s);
})();
function header(titulo, back = true) {
  const h = document.createElement('header'); h.className = 'top';
  h.innerHTML = `${back ? '<a class="back" href="./" aria-label="Volver al inicio">‹</a>' : ''}<div class="brand"><b>${KIT.marca}</b><small>${esc(titulo)}</small></div><span class="demo">DEMO</span>`;
  document.body.prepend(h);
}
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
