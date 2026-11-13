/**
 * Registro de pedidos de los catálogos · Penalva Alimentación
 * Cada vez que un cliente pulsa «Enviar pedido» en el Catálogo 2026/2027 o en
 * cualquiera de los catálogos por familia, se apunta aquí y te llega un correo.
 *
 * Hojas que crea solo:
 *   · Pedidos  → una fila por pedido (fecha, catálogo, comercial, negocio, importe…)
 *   · Líneas   → una fila por artículo pedido (para sacar qué se pide más)
 *
 * Cómo se monta (una sola vez, 5 minutos):
 *  1. Crea una hoja de Google nueva, por ejemplo «Pedidos catálogos Penalva».
 *  2. Menú Extensiones → Apps Script. Borra lo que haya y pega TODO este archivo.
 *  3. Cambia el correo de AVISO si quieres otro. Guarda (icono del disquete).
 *  4. Implementar → Nueva implementación → tipo «Aplicación web».
 *     Ejecutar como: «Yo». Quién tiene acceso: «Cualquier usuario». → Implementar → Autorizar.
 *  5. Copia la «URL de la aplicación web» (acaba en /exec) y pásasela a Claude
 *     (o pégala en catalogo/cotizacion/config.json, en "registro").
 */
const AVISO = 'daviddiaz@nordwik.com'; // a quién le llega el correo (vacío = sin correo)

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActive();
  const arts = d.articulos || [];
  const fecha = d.fecha ? new Date(d.fecha) : new Date();
  const cat = d.catalogo || 'Catálogo';

  const P = ss.getSheetByName('Pedidos') || ss.insertSheet('Pedidos');
  if (P.getLastRow() === 0) {
    P.appendRow(['Fecha', 'Catálogo', 'Comercial', 'Tel. comercial', 'Negocio', 'Comentario', 'Nº artículos', 'Importe orientativo (€)', 'Artículos']);
    P.setFrozenRows(1);
  }
  P.appendRow([fecha, cat, d.comercial, d.tel, d.negocio, d.comentario, arts.length, d.importe || '',
    arts.map(a => (a.cantidad ? a.cantidad + ' ' + (a.unidad || '') + ' · ' : '') + a.nombre + ' (' + a.ref + ')' + (a.oferta ? ' · OFERTA ' + a.oferta : '')).join('\n')]);

  const L = ss.getSheetByName('Líneas') || ss.insertSheet('Líneas');
  if (L.getLastRow() === 0) {
    L.appendRow(['Fecha', 'Catálogo', 'Comercial', 'Negocio', 'Ref.', 'Artículo', 'Formato', 'Familia', 'Cantidad', 'Unidad', 'Precio tarifa (€)', 'Importe (€)', 'Oferta']);
    L.setFrozenRows(1);
  }
  arts.forEach(a => L.appendRow([fecha, cat, d.comercial, d.negocio, a.ref, a.nombre, a.formato || '', a.familia || '',
    a.cantidad || '', a.unidad || '', a.precio || '', a.importe || '', a.oferta || '']));

  if (AVISO) {
    const txt = 'Catálogo: ' + cat + '\nComercial: ' + (d.comercial || '-') + ' (' + (d.tel || '') + ')\n' +
      'Negocio: ' + (d.negocio || '-') + '\n' + (d.comentario ? 'Comentario: ' + d.comentario + '\n' : '') +
      (d.importe ? 'Importe orientativo: ' + d.importe + ' € (tarifa, sin IVA)\n' : '') + '\n' +
      arts.map(a => '• ' + (a.cantidad ? a.cantidad + ' ' + (a.unidad || '') + ' — ' : '') + a.nombre + ' · Ref. ' + a.ref +
        (a.importe ? ' · ' + a.importe + ' €' : '') + (a.oferta ? ' · OFERTA ' + a.oferta : '')).join('\n');
    MailApp.sendEmail(AVISO, 'Pedido catálogo: ' + (d.negocio || 'cliente') + ' → ' + (d.comercial || 'comercial'), txt);
  }
  return ContentService.createTextOutput('ok');
}
