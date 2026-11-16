# -*- coding: utf-8 -*-
"""生成自包含单文件网页版：magic-standalone.html

先跑 _build_web.py 生成 magic/，再由本脚本把 CSS/JS/图片全部内联成一个 HTML。
产物双击即测，适合当「纯下载链接」发货。不要直接改产物。
"""
import base64
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "magic")
OUT = os.path.join(ROOT, "magic-standalone.html")
SHARE_URL = "https://drgonw1021-lgtm.github.io/cat-divination/magic/"
MIME = {".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
        ".png": "image/png", ".gif": "image/gif", ".svg": "image/svg+xml"}


def read(name):
    path = os.path.join(SRC, name)
    if not os.path.exists(path):
        sys.exit("缺少 %s，请先运行 python _build_web.py" % path)
    with open(path, "r", encoding="utf-8") as fh:
        return fh.read()


def patch(text, pairs, name):
    for old, new in pairs:
        n = text.count(old)
        if n != 1:
            raise SystemExit("锚点在 %s 里出现 %d 次（应为 1）：%r" % (name, n, old[:60]))
        text = text.replace(old, new)
    return text


def data_uri(rel):
    ext = os.path.splitext(rel)[1].lower()
    if ext not in MIME:
        raise SystemExit("不支持的图片类型：" + rel)
    with open(os.path.join(SRC, rel.replace("/", os.sep)), "rb") as fh:
        raw = fh.read()
    return "data:%s;base64,%s" % (MIME[ext], base64.b64encode(raw).decode("ascii"))


html = read("index.html")
css = read("style.css")
js = read("app.js")

# 收集 html 里引用的图片和 js 里拼出来的角色图
refs = sorted(set(re.findall(r"\./images/[A-Za-z0-9_./\-]+", html)))
codes = sorted(f[:-5] for f in os.listdir(os.path.join(SRC, "images", "chars"))
               if f.endswith(".webp") and "_t" not in f)
for code in codes:
    refs += ["./images/chars/%s.webp" % code, "./images/chars/%s_t.webp" % code]
refs = sorted(set(refs))
for rel in refs:
    if not os.path.exists(os.path.join(SRC, rel.replace("/", os.sep))):
        raise SystemExit("HTML/JS 引用了不存在的资源：" + rel)

asset_js = ["var ASSET = {"]
for rel in refs:
    asset_js.append('  "%s": "%s",' % (rel, data_uri(rel)))
asset_js.append("};")
asset_js = "\n".join(asset_js)

js = patch(js, [
    ("  function charSrc(code) { return './images/chars/' + code + '.webp'; }",
     "  function charSrc(code) { return ASSET['./images/chars/' + code + '.webp']; }"),
    ("  function charThumb(code) { return './images/chars/' + code + '_t.webp'; }",
     "  function charThumb(code) { return ASSET['./images/chars/' + code + '_t.webp']; }"),
    (r"'\n—— 你也来测：' + location.href;",
     r"'\n—— 你也来测：' + SHARE_URL;"),
], "app.js")

# 单文件本地打开时 file:// 路径没法分享，固定成线上地址
js = asset_js + "\nvar SHARE_URL = '%s';\n" % SHARE_URL + js

# 图片只替换 markup 里的 src 属性，必须在注入 JS/CSS 之前做，
# 否则会把刚插进去的 ASSET 键名和 charSrc 查表字面量一起改掉
for rel in refs:
    html = html.replace('src="%s"' % rel, 'src="%s"' % data_uri(rel))

html = patch(html, [
    ('<link rel="stylesheet" href="./style.css">', "<style>\n%s\n</style>" % css),
    ('<script src="./app.js"></script>', "<script>\n%s\n</script>" % js),
], "index.html")

if 'var ASSET = {\n  "./images/' not in html:
    raise SystemExit("ASSET 映射的键名被改坏了")
if re.search(r'src="\./', html):
    raise SystemExit("页面里还留着相对路径图片引用")

with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
    fh.write(html)

size = os.path.getsize(OUT)
print("magic-standalone.html %.1f KB / %d 张图 / 外链引用残留：%d"
      % (size / 1024.0, len(refs), len(re.findall(r'src="\./|href="\./', html))))
