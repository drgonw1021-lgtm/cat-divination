# 小猫起卦 · 测试厅

两个玄学/魔法向的性格测试，纯静态，无后端。

## 在线体验

- 首页（测试厅）：https://drgonw1021-lgtm.github.io/cat-divination/
- 小猫起卦：https://drgonw1021-lgtm.github.io/cat-divination/index.html
- 霍格沃茨测格：https://drgonw1021-lgtm.github.io/cat-divination/hp.html
- 魔法学院测格（网页版，可发链接的付费载体）：https://drgonw1021-lgtm.github.io/cat-divination/magic/
- 魔法学院测格（单文件下载版，878 KB，断网也能测）：https://drgonw1021-lgtm.github.io/cat-divination/magic-standalone.html

本地直接双击 `index.html` 即可。

## 文件结构

| 文件 | 内容 |
|---|---|
| `index.html` | 小猫起卦：三爻（起手式/能量朝向/与世界）→ 8 本命格，选项附带五行 → 当运色，共 8×5=40 组合 |
| `hp.html` | 霍格沃茨测格：四维轴（闯/守 · 心/脑 · 群/单 · 闹/稳）→ 16 角色，选项附带学院倾向 → 分院结果 |
| `magic/` | 魔法学院测格网页版：`python _build_web.py` 从 `dist/` 生成，带 16 张卡通形象，浏览器里额外开放「复制结果文案 / 下载结果卡」。改内容请改 `dist/` 再重新生成，不要直接编辑这个目录 |
| `magic-standalone.html` | 同一个网页版的自包含单文件（CSS/JS/16 张形象全内联，878 KB），下载后双击即测，适合当虚拟商品的「纯下载链接」。`python _build_single.py` 生成（先跑 `_build_web.py`），不要手改 |
| `images/` | logo 与小猫表情素材 |

两个测试共用 `images/logo.jpg`。

## 功能特色

- 🐱 小猫起卦：摇签筒、变爻之卦、归位彩蛋、五行生克配对
- 🧙 霍格沃茨测格：16 角色名单、施法动效、守护神与魔杖、学院加权分院、角色契合度配对
- 📋 结果卡一键复制，可直接发朋友圈
- 单文件 vanilla HTML/CSS/JS，无框架、无构建、无后端

## 部署

GitHub Actions 自动部署（`.github/workflows/deploy.yml`，`path: '.'` 上传整个仓库）。
推送到 `main` 后约 30 秒生效，也可拖到 https://app.netlify.com/drop 或 Vercel。

## License

MIT
