"""Genera los 3 tamaños de foto (móvil, tablet, PC) a partir de originales grandes.
Uso: python3 tamanos.py carpeta_con_png_por_codigo   (p. ej. 700659.png)
Salida: fotos/m/<c>.webp 480 · fotos/<c>.jpg 800 · fotos/l/<c>.webp 1200
"""
import os,sys
from PIL import Image,ImageFilter
RAIZ=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..','fotos')
def hacer(src,lado):
    im=Image.open(src).convert('RGB'); f=lado/max(im.size)
    if f>1: im=im.resize((round(im.width*f),round(im.height*f)),Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.4,percent=55,threshold=2))
    else: im.thumbnail((lado,lado),Image.LANCZOS)
    return im
if __name__=='__main__':
    d=sys.argv[1]
    for n in ('m','l'): os.makedirs(os.path.join(RAIZ,n),exist_ok=True)
    for f in sorted(os.listdir(d)):
        c,ext=os.path.splitext(f)
        if ext.lower() not in ('.png','.jpg','.jpeg'): continue
        s=os.path.join(d,f)
        hacer(s,800).save(os.path.join(RAIZ,c+'.jpg'),'JPEG',quality=84,optimize=True,progressive=True)
        hacer(s,480).save(os.path.join(RAIZ,'m',c+'.webp'),'WEBP',quality=80,method=6)
        hacer(s,1200).save(os.path.join(RAIZ,'l',c+'.webp'),'WEBP',quality=80,method=6)
    print('Hecho. Después: PENALVA_CLAVE=... python3 actualizar_fotos.py --solo-cotizador')
