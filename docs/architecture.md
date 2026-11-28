# 架构地图

这个仓库是一个图标库：`src/icons/` 下每个文件画一个 24 × 24 的图标，引擎把绘制结果收尾成 SVG 路径，
脚本把它们打成 npm 包（核心包、框架组件、静态 SVG、Iconify JSON），预览站展示全部图标。
绘制规则见 [design.md](design.md)，命名规则见 [naming.md](naming.md)，架构决策见 [adr/](adr/)。

## 分层与依赖方向

依赖只能从上往下指。`tests/architecture.test.js` 会检查这些规则（循环依赖、跨层导入）。

| 层 | 模块 | 职责 | 可以依赖 |
| --- | --- | --- | --- |
| 站点 | `App.vue`、`Examples.vue`、`Icon.vue`、`IconSvg.vue`、`LazyIcon.vue`、`main.js`、`site/`、`snap.js`、`i18n.js`、`categories.js`、`category-icons.js`、`iconset.js` | 预览站：网格、搜索、分类、设置面板、多语言 | 全部 |
| 引擎 | `export.js`（toSvg / toPaths）、`render.js`（缓存、像素对齐、SVG 属性）、`svg.js`（finalize 收尾）、`fill.js`（实心版，Clipper2，只在构建和站点里用）、`svg-root.js`、`runtime.js` | 把绘制函数的结果变成 SVG | 几何层、约定 |
| 图标 | `src/icons/*.js` | 一个文件一个图标：默认导出描边版，可选导出 `fill`、`animation` | 绘制层、几何层、约定、其他图标 |
| 绘制 | 系列模块（`folder.js`、`file.js`、`chat.js` …）、共用造型（`symbols.js`、`scene.js`、`letters.js`、`marks.js` …）、标记（`solid.js`、`off.js`、`corner.js`、`badge-room.js`） | 被多个图标共用的造型和规则 | 几何层、约定、少数图标 |
| 几何 | `geometry.js`、`transform.js`、`clip.js`、`path-data.js`（路径语法：解析、压缩、横竖线） | 和图标无关的路径运算 | 约定 |
| 约定 / 数据 | `line-widths.js`（样式标记 → 线宽、点径、斜接上限）、`clearance.js`、`inset.js`、`options.js`、`tone.js`、`icon-list.js`、`aliases.js`、`meta/` | 无依赖的常量、数据和纯函数 | 无 |

几条硬约束（都在 `tests/architecture.test.js` 里）：

- **`src/` 没有循环依赖。**
- **核心包不碰站点、不带 Clipper2、没有 npm 依赖**：从核心包入口（`export.js`、`render.js`、`options.js`、`tone.js`、`runtime.js`、`svg-root.js`、`meta/meta.js`、全部图标）出发，到达不了 `vue`、`.vue`、`site/`、`iconset.js`、`i18n.js`、`categories.js`、`fill.js`。实心版在构建时预计算，站点和构建脚本通过 `render.js` 的 `setSolidify` 注入。
- **引擎不认识具体造型**：`svg.js`、`render.js`、`export.js`、`fill.js` 只依赖几何层和约定，不导入 `scene.js`、`symbols.js` 这类绘制模块。
- **图标文件不导入引擎和站点**：图标只描述造型。
- **`runtime.js` 只带 `svg-root.js`**：`./static` 入口和框架组件只用它们，不带渲染引擎。
- **约定模块是叶子**：`path-data.js`、`line-widths.js`、`clearance.js`、`options.js`、`tone.js`、`icon-list.js` 不导入别的模块。
- **脚本统一用 `scripts/icons.mjs` 加载图标**，不借 Vite SSR，不自己列 `src/icons/`；导入了省略后缀的 `src/` 模块的 `package.json` 脚本必须带 `--import ./scripts/node-ext.mjs`。

## 图标集合：唯一的组装方式

图标对象的形状 `{ name, draw, animation?, fill? }` 和排序（按 UTF-16 码点）只在 `src/icon-list.js` 定义。两种运行环境各有一个入口，都调用它：

- Vite（预览站、vitest）：`src/iconset.js`，`import.meta.glob` 收集模块。
- Node（构建、审计、品牌素材等脚本）：`scripts/icons.mjs`，读目录后逐个 `import`。脚本用
  `node --import ./scripts/node-ext.mjs` 运行，让 Node 认识 `src/` 里省略 `.js` 后缀的相对导入。

脚本不再借 Vite SSR 加载 `src/`（两千多个模块时会超时）。`vite` 只在真正打包（`scripts/packages.mjs` 的 `buildLib`、预览站构建）时使用。

## 数据的权威来源

| 概念 | 权威来源 | 派生物 |
| --- | --- | --- |
| 图标几何 | `src/icons/<name>.js` | 核心包、Iconify JSON、静态 SVG、快照 |
| 圆角、字重档位 | `src/options.js` | 类型声明（`Radius`、`Weight`）、Iconify 集合 |
| 双色角色 | `src/tone.js` | 类型声明（`Role`）、预览站 CSS 变量 |
| 线宽、点径、斜接上限 | `src/line-widths.js` | `svg.js` 收尾、`fill.js` 外扩、`render.js` 的 `stroke-miterlimit`、`corner.js` 的角标定位 |
| 改名别名 | `src/aliases.js` | 包里的弃用导出、meta 的 `replacedBy`、Iconify aliases |
| 搜索标签、加入版本 | `src/meta/` | 核心包 `./meta`、预览站搜索 |
| 分类 | `src/categories.js` | 核心包 `./meta` 的 category、预览站侧栏 |
| 版本号 | `packages/core/package.json`（`scripts/version.mjs` 统一写入各包） | 预览站标题 |
