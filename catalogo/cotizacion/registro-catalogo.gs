/**
 * Registro de listas del catálogo de cotización · Penalva Alimentación
 * Cada vez que un cliente pulsa «Pedir cotización» en el catálogo, se apunta aquí
 * y te llega un correo con la lista.
 *
 * Cómo se monta (una sola vez):
 *  1. Crea una hoja de Google nueva, por ejemplo «Listas catálogo Penalva».
 *  2. Menú Extensiones → Apps Script. Borra lo que haya y pega TODO este archivo.
 *  3. Cambia el correo de AVISO si quieres otro. Guarda (icono del disquete).
 *  4. Implementar → Nueva implementación → tipo «Aplicación web».
 *     Ejecutar como: «Yo». Quién tiene acceso: «Cualquier usuario». → Implementar → Autorizar.
 *  5. Copia la «URL de la aplicación web» (acaba en /exec) y pégala en
 *     https://damdiroju-cdb.github.io/Rutas/catalogo/cotizacion/ofertas.html → «Dirección del registro»,
 *     y publica como explica esa página.
 */
const AVISO = 'daviddiaz@nordwik.com'; // a quién le llega el correo (vacío = sin correo)

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActive();
  const arts = d.articulos || [];
  const fecha = d.fecha ? new Date(d.fecha) : new Date();

  const L = ss.getSheetByName('Listas') || ss.insertSheet('Listas');
  if (L.getLastRow() === 0) L.appendRow(['Fecha', 'Comercial', 'Tel. comercial', 'Negocio', 'Comentario', 'Nº artículos', 'Artículos']);
  L.appendRow([fecha, d.comercial, d.tel, d.negocio, d.comentario, arts.length,
    arts.map(a => a.nombre + ' (' + a.ref + ')' + (a.cajas_semana ? ' · ' + a.cajas_semana + ' cj/sem' : '') + (a.oferta ? ' · OFERTA ' + a.oferta : '')).join('\n')]);

  const A = ss.getSheetByName('Artículos') || ss.insertSheet('Artículos');
  if (A.getLastRow() === 0) A.appendRow(['Fecha', 'Comercial', 'Negocio', 'Ref.', 'Artículo', 'Formato', 'Familia', 'Cajas/semana', 'Oferta']);
  arts.forEach(a => A.appendRow([fecha, d.comercial, d.negocio, a.ref, a.nombre, a.formato, a.familia, a.cajas_semana, a.oferta]));

  if (AVISO) {
    const txt = 'Comercial: ' + (d.comercial || '-') + ' (' + (d.tel || '') + ')\n' +
      'Negocio: ' + (d.negocio || '-') + '\n' + (d.comentario ? 'Comentario: ' + d.comentario + '\n' : '') + '\n' +
      arts.map(a => '• ' + a.nombre + ' (' + a.formato + ') · Ref. ' + a.ref + (a.cajas_semana ? ' · ' + a.cajas_semana + ' cj/sem' : '') + (a.oferta ? ' · OFERTA ' + a.oferta : '')).join('\n');
    MailApp.sendEmail(AVISO, 'Lista del catálogo: ' + (d.negocio || 'cliente') + ' → ' + (d.comercial || 'comercial'), txt);
  }
  return ContentService.createTextOutput('ok');
}
