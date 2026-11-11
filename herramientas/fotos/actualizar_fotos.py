"""
Mantiene las FOTOS OFICIALES de Penalva (carpeta Rutas/fotos/<código>.jpg).

REGLA: las fotos de Rutas/fotos/ mandan siempre. Aunque se cargue una tarifa nueva
con imágenes, NUNCA se sustituye una foto que ya exista. Solo se añaden las de
artículos nuevos:
  - si la imagen nueva es pequeña (lado mayor < 400 px) se mejora con IA (x4),
  - se guarda a 640 px como máximo.
Después se regenera cotizador/fotos.bin (cifrado) a partir de Rutas/fotos/.

Uso:
  python3 actualizar_fotos.py --nuevas carpeta_o_json [--forzar 700434,701146]
     carpeta: archivos <código>.jpg/.png ; json: {"código": "base64 jpeg"}
     --forzar: códigos cuya foto oficial sí se quiere sustituir (foto mejor).
     --comida: códigos que son FOTO DE COMIDA (producto terminado, sin envase).
               Esas NO se mejoran con IA (les quita la textura: rebozado, pan,
               especias quedan "de plástico"); se amplían con Lanczos + realce suave.
               Los envases sí van con IA (el texto sale más nítido).
  python3 actualizar_fotos.py --solo-cotizador   (regenera solo fotos.bin)
Requiere: numpy, pillow, cryptography. Clave del cotizador en la variable PENALVA_CLAVE.
"""
import os, sys, io, json, base64, argparse
import numpy as np
from PIL import Image
AQUI = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(AQUI, '..', '..'))
FOTOS = os.path.join(REPO, 'fotos')
sys.path.insert(0, AQUI)

def cargar_nuevas(src):
    if os.path.isdir(src):
        for f in os.listdir(src):
            c, ext = os.path.splitext(f)
            if ext.lower() in ('.jpg', '.jpeg', '.png', '.webp'):
                yield c, Image.open(os.path.join(src, f)).convert('RGB')
    else:
        for c, b in json.load(open(src)).items():
            yield c, Image.open(io.BytesIO(base64.b64decode(b))).convert('RGB')

def suave(im, factor=4):
    from PIL import ImageFilter
    if max(im.size) < 400:
        im = im.resize((im.width * factor, im.height * factor), Image.LANCZOS)
        im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2))
    im.thumbnail((640, 640), Image.LANCZOS)
    return im

def mejorar(im, net):
    if max(im.size) < 400:
        o = net(np.asarray(im, dtype=np.float32) / 255)
        im = Image.fromarray((o * 255 + .5).astype(np.uint8))
    im.thumbnail((640, 640), Image.LANCZOS)
    return im

def cotizador():
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    clave = os.environ.get('PENALVA_CLAVE')
    if not clave: sys.exit('Falta la variable PENALVA_CLAVE (clave del cotizador).')
    out = {}
    for f in sorted(os.listdir(FOTOS)):
        if not f.endswith('.jpg'): continue
        im = Image.open(os.path.join(FOTOS, f)).convert('RGB'); im.thumbnail((180, 180), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, 'JPEG', quality=74, optimize=True, progressive=True)
        out[f[:-4]] = base64.b64encode(b.getvalue()).decode()
    k = PBKDF2HMAC(hashes.SHA256(), 32, base64.b64decode('xSvMzckFGdhI5tcW7l6zuQ=='), 200000).derive(clave.encode())
    iv = os.urandom(12); pt = json.dumps(out, separators=(',', ':')).encode()
    open(os.path.join(REPO, 'cotizador', 'fotos.bin'), 'wb').write(iv + AESGCM(k).encrypt(iv, pt, None))
    print('cotizador/fotos.bin regenerado con', len(out), 'fotos')

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--nuevas'); ap.add_argument('--forzar', default=''); ap.add_argument('--comida', default=''); ap.add_argument('--solo-cotizador', action='store_true')
    a = ap.parse_args()
    if a.nuevas:
        from srnp import Net
        net = Net(os.path.join(AQUI, 'general.pth'))
        forzar = set(x.strip() for x in a.forzar.split(',') if x.strip())
        comida = set(x.strip() for x in a.comida.split(',') if x.strip())
        nuevas = mantenidas = 0
        for c, im in cargar_nuevas(a.nuevas):
            dst = os.path.join(FOTOS, c + '.jpg')
            if os.path.exists(dst) and c not in forzar: mantenidas += 1; continue
            (suave(im) if c in comida else mejorar(im, net)).save(dst, quality=84, optimize=True); nuevas += 1
        print(f'Fotos nuevas/sustituidas: {nuevas} · oficiales que se mantienen: {mantenidas}')
    cotizador()
