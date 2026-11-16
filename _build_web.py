"""从 dist/ 小工具构建生成网页版 magic/：内容一致，只把浏览器里能用的分享动作补回来。"""
import os, shutil, io

SRC, OUT = "dist", "magic"

PATCHES = [
    ("/* 霍格沃茨测格 · 小工具离线包入口脚本",
     "/* 魔法学院测格 · 网页版（由 _build_web.py 从 dist 生成，不要直接改这个目录）"),

    ("  var buildVersion = 0;",
     "  var buildVersion = 0;\n"
     "  /* 小工具容器里没有 window.xhs，网页版据此打开浏览器专属动作 */\n"
     "  var IS_WEB = !(window.xhs && window.xhs.miniTool);"),

    ("          '<button class=\"btn ghost mini\" data-act=\"sharecard\" data-cap=\"share\" hidden>推荐给朋友</button>' +\n"
     "        '</div>' +",
     "          '<button class=\"btn ghost mini\" data-act=\"sharecard\" data-cap=\"share\" hidden>推荐给朋友</button>' +\n"
     "        '</div>' +\n"
     "        '<div class=\"row2\">' +\n"
     "          '<button class=\"btn ghost mini\" data-act=\"copytext\" data-cap=\"web\" hidden>复制结果文案</button>' +\n"
     "          '<button class=\"btn ghost mini\" data-act=\"download\" data-cap=\"web\" hidden>下载结果卡</button>' +\n"
     "        '</div>' +"),

    ("      comment: canUse('interactionOpenApi', VER.COMMENT),\n"
     "      share: canUse('share', VER.SHARE)\n    };",
     "      comment: canUse('interactionOpenApi', VER.COMMENT),\n"
     "      share: canUse('share', VER.SHARE),\n      web: IS_WEB\n    };"),

    ("    var any = caps.album || caps.note || caps.comment || caps.share;",
     "    var any = caps.album || caps.note || caps.comment || caps.share || caps.web;"),

    ("(capReady ? '用下面的按钮存相册或发成笔记。' : '把这一屏截图就能保存。')",
     "(IS_WEB ? '长按上面的图就能保存，或用下面的按钮。'\n            : (capReady ? '用下面的按钮存相册或发成笔记。' : '把这一屏截图就能保存。'))"),

    ("    return '【霍格沃茨测格】我是：'",
     "    return '【魔法学院测格】我是：'"),

    ("  /* ============ 事件绑定（全部 addEventListener，无行内事件） ============ */",
     "  /* ============ 网页版动作 ============ */\n"
     "  function actCopyText() {\n"
     "    var text = resultText({ ch: CHARS[lastResult.code], house: lastResult.house }) +\n"
     "      '\\n—— 你也来测：' + location.href;\n"
     "    if (navigator.clipboard && navigator.clipboard.writeText) {\n"
     "      navigator.clipboard.writeText(text).then(function () { toast('已复制，去评论区贴给好友。'); },\n"
     "        function () { legacyCopy(text); });\n"
     "    } else { legacyCopy(text); }\n"
     "  }\n"
     "  function legacyCopy(text) {\n"
     "    var ta = document.createElement('textarea');\n"
     "    ta.value = text;\n"
     "    ta.setAttribute('readonly', '');\n"
     "    ta.style.position = 'fixed';\n"
     "    ta.style.left = '-9999px';\n"
     "    document.body.appendChild(ta);\n"
     "    ta.select();\n"
     "    var ok = false;\n"
     "    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }\n"
     "    document.body.removeChild(ta);\n"
     "    toast(ok ? '已复制，去评论区贴给好友。' : '复制没成功，长按下面文字复制。');\n"
     "    showCopyBox(text);\n"
     "  }\n"
     "  function showCopyBox(text) {\n"
     "    var stage = $('cardStage');\n"
     "    if (!stage || stage.querySelector('.copy-box')) return;\n"
     "    var box = document.createElement('textarea');\n"
     "    box.className = 'copy-box';\n"
     "    box.setAttribute('readonly', '');\n"
     "    box.value = text;\n"
     "    stage.appendChild(box);\n"
     "    box.focus();\n"
     "    box.select();\n"
     "  }\n"
     "  function actDownload() {\n"
     "    makeCard().then(function (url) {\n"
     "      if (!url) { toast('这个浏览器导不出图片，长按页面里的图试试'); return; }\n"
     "      var a = document.createElement('a');\n"
     "      a.href = url;\n"
     "      a.download = 'magic-card-' + lastResult.code + '.jpg';\n"
     "      document.body.appendChild(a);\n"
     "      a.click();\n"
     "      document.body.removeChild(a);\n"
     "      toast('已下载结果卡');\n"
     "    });\n"
     "  }\n\n"
     "  /* ============ 事件绑定（全部 addEventListener，无行内事件） ============ */"),

    ("    sharecard: actShareCard\n  };",
     "    sharecard: actShareCard,\n    copytext: actCopyText,\n    download: actDownload\n  };"),
]

HTML_PATCHES = [
    ("<title>你是霍格沃茨的谁 · 魔法测格</title>", "<title>你是魔法学院的谁 · 魔法测格</title>"),
    ("<h1>你是霍格沃茨的谁</h1>", "<h1>你是魔法学院的谁</h1>"),
]


def patch(text, pairs, name):
    for old, new in pairs:
        if old not in text:
            raise SystemExit("锚点没找到：%s -> %r" % (name, old[:48]))
        if text.count(old) != 1:
            raise SystemExit("锚点不唯一：%s -> %r" % (name, old[:48]))
        text = text.replace(old, new)
    return text


if os.path.isdir(OUT):
    shutil.rmtree(OUT)
os.makedirs(OUT)

app = patch(io.open(SRC + "/app.js", encoding="utf-8").read(), PATCHES, "app.js")
io.open(OUT + "/app.js", "w", encoding="utf-8", newline="\n").write(app)

html = patch(io.open(SRC + "/index.html", encoding="utf-8").read(), HTML_PATCHES, "index.html")
io.open(OUT + "/index.html", "w", encoding="utf-8", newline="\n").write(html)

css = io.open(SRC + "/style.css", encoding="utf-8").read()
css += """
/* 网页版：剪贴板不可用时给一块可长按选中的纯文本 */
.copy-box{width:100%;margin-top:10px;min-height:150px;padding:12px;background:rgba(255,255,255,.06);border:1px solid rgba(212,175,55,.28);border-radius:10px;color:#f3e9d2;font-size:13px;line-height:1.7;font-family:inherit;resize:none}
"""
io.open(OUT + "/style.css", "w", encoding="utf-8", newline="\n").write(css)
shutil.copytree(SRC + "/images", OUT + "/images")

total = 0
count = 0
for root, _, files in os.walk(OUT):
    for f in files:
        total += os.path.getsize(os.path.join(root, f))
        count += 1
print("magic/ 生成完成：%d 个文件，%.1f KB" % (count, total / 1024.0))
print("app.js 行数:", app.count("\n"))
