# Real-ESRGAN (realesr-general-x4v3, SRVGGNetCompact) en numpy, sin PyTorch
import zipfile, pickle, numpy as np, sys, os

def load_pth(path):
    z = zipfile.ZipFile(path)
    root = z.namelist()[0].split('/')[0]
    class Storage:
        def __init__(self, key, dtype): self.key, self.dtype = key, dtype
    def rebuild(storage, offset, size, stride, *a):
        buf = np.frombuffer(z.read(f'{root}/data/{storage.key}'), dtype=storage.dtype)
        n = int(np.prod(size)) if size else 1
        arr = buf[offset:offset + (max(1, n) if not size else (sum((s - 1) * st for s, st in zip(size, stride)) + 1))]
        if not size: return arr[:1].reshape(())
        return np.lib.stride_tricks.as_strided(arr, shape=size, strides=[st * arr.itemsize for st in stride]).copy()
    class U(pickle.Unpickler):
        def find_class(self, mod, name):
            if name == '_rebuild_tensor_v2': return rebuild
            if mod == 'collections' and name == 'OrderedDict':
                import collections; return collections.OrderedDict
            if mod.startswith('torch') and name.endswith('Storage'):
                return {'FloatStorage': np.float32, 'HalfStorage': np.float16, 'LongStorage': np.int64}.get(name, np.float32)
            if name == '_rebuild_parameter': return lambda d, rg, bh: d
            return super().find_class(mod, name)
        def persistent_load(self, pid):
            _, typ, key, loc, n = pid
            dt = typ if isinstance(typ, type) else np.float32
            return Storage(key, dt)
    d = U(z.open(f'{root}/data.pkl')).load()
    return d.get('params_ema', d.get('params', d))

def conv3(x, w, b):
    # x: (C,H,W) ; w: (O,C,3,3)
    C, H, W = x.shape
    xp = np.pad(x, ((0, 0), (1, 1), (1, 1)), mode='constant')
    cols = np.empty((C * 9, H * W), dtype=np.float32)
    k = 0
    for c in range(C):
        for i in range(3):
            for j in range(3):
                cols[k] = xp[c, i:i + H, j:j + W].reshape(-1); k += 1
    # reordenar a (C,3,3) que coincide con w.reshape(O, C*9)
    out = w.reshape(w.shape[0], -1).astype(np.float32) @ cols
    return (out + b[:, None]).reshape(-1, H, W)

def conv3_fast(x, w, b):
    C, H, W = x.shape
    xp = np.pad(x, ((0, 0), (1, 1), (1, 1)))
    s = np.lib.stride_tricks.sliding_window_view(xp, (3, 3), axis=(1, 2))  # C,H,W,3,3
    cols = s.transpose(0, 3, 4, 1, 2).reshape(C * 9, H * W)
    out = w.reshape(w.shape[0], -1) @ cols
    return (out + b[:, None]).reshape(-1, H, W).astype(np.float32)

def prelu(x, a):
    return np.where(x >= 0, x, x * a.reshape(-1, 1, 1)).astype(np.float32)

class Net:
    def __init__(self, path):
        P = load_pth(path)
        self.P = {k: np.asarray(v, dtype=np.float32) for k, v in P.items()}
        idx = sorted({int(k.split('.')[1]) for k in self.P if k.startswith('body.')})
        self.layers = []
        for i in idx:
            wk = f'body.{i}.weight'
            if f'body.{i}.bias' in self.P: self.layers.append(('conv', self.P[wk], self.P[f'body.{i}.bias']))
            else: self.layers.append(('prelu', self.P[wk]))
    def __call__(self, img):  # img float32 HxWx3 en 0..1
        x = img.transpose(2, 0, 1).astype(np.float32)
        base = x
        for L in self.layers:
            x = conv3_fast(x, L[1], L[2]) if L[0] == 'conv' else prelu(x, L[1])
        # pixel shuffle x4
        r = 4; C = x.shape[0] // (r * r); H, W = x.shape[1:]
        x = x.reshape(C, r, r, H, W).transpose(0, 3, 1, 4, 2).reshape(C, H * r, W * r)
        up = base.repeat(r, axis=1).repeat(r, axis=2)
        return np.clip((x + up).transpose(1, 2, 0), 0, 1)
