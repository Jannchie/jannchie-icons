<p align="center">
  <img src=".github/banner.svg" alt="Jannchie Icons" width="100%">
</p>

<p align="center">
  <a href="https://icons.jannchie.com">网站</a> · <a href="README.md">English</a>
</p>

Jannchie Icons 是一套基于 24 单位网格的线条图标库，收录 1800 余个图标。圆角与字重是图标几何的输入参数，而非 CSS 层面的覆盖：每个图标按所选设置重新绘制，因此任意圆角下转角保持一致，较粗字重下点与细节维持原有比例，横竖线条在高分辨率屏幕上落在整像素位置。

除常见的界面图标外，图标库还收录通用图标库较少覆盖的符号体系：平假名与片假名、希腊字母、天干地支、十二生肖、八卦与六十四卦、卢恩字母、炼金术符号、玛雅数字、音乐记号、中国象棋与将棋棋子、内容分级标志、知识共享与开源协议标识、洗涤护理标志等。

## 使用

访问 [icons.jannchie.com](https://icons.jannchie.com)，选择圆角与字重后点击图标，即可复制或下载 SVG。以下为 `heart` 图标在圆角 2、常规字重下的导出结果：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 20C9 18 3 14.5 3 9.25 3 6.5 5 4.5 7.5 4.5c2 0 3.5 1 4.5 2.5 1-1.5 2.5-2.5 4.5-2.5 2.5 0 4.5 2 4.5 4.75C21 14.5 15 18 12 20z"/>
</svg>
```

导出的 SVG 使用 `currentColor`，颜色随所在位置的文字颜色变化。预览站按图标的显示大小将其对齐到设备像素网格，任意尺寸与像素密度下线条均清晰显示。[示例](https://icons.jannchie.com/?view=examples)页面展示了导航、工具条、文件列表、通知等常见界面组件中的图标效果，并按当前设置实时渲染。

| 选项 | 取值 | 作用 |
|---|---|---|
| 圆角 | 尖角、0、1、2、3 | 外框转角半径；尖角同时改用方头线帽与斜接转角 |
| 字重 | 细 0.75、常规 1、粗 1.5、特粗 2 | 线条宽度；点与缩小的细节单独封顶 |

## 开发

```sh
pnpm install
pnpm dev      # 启动带热更新的预览站
pnpm build    # 构建静态站点到 dist/
pnpm brand    # 重新生成横幅、分享图与网站图标
```

每个图标对应 `src/icons/` 下的一个文件，按给定设置返回路径字符串数组。预览站自动收录新文件，`src/categories.js` 按名称将其归入分类。

```js
// src/icons/plus-circle.js
import { ring } from '../marks'

export default () => [ring(), 'M12 8V16', 'M8 12H16']
```

通用形状与工具函数位于 `src/geometry.js`（圆角多边形、圆）与 `src/letters.js`（用于标识与数字的线条字母）。推送到 `main` 后站点自动部署到 GitHub Pages。
