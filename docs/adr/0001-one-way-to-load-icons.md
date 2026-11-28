# 0001 图标集合只有一种组装方式，脚本直接在 Node 里运行 src/

- 状态：已采纳（2026-11-28）

## 背景

图标对象 `{ name, draw, animation?, fill? }` 原来有六份组装代码：站点的 `src/iconset.js`、测试的 `tests/icons.js`、
审计的 `setup`、`build-packages.mjs`、`brand.mjs`、`margins.mjs`。排序方式也不一样（站点用 `localeCompare`，构建用码点）。
多数脚本借 Vite 的 SSR 加载 `src/`，三千个模块时经常「transport invoke timed out」，为此还写了重试。

## 决定

- `src/icon-list.js` 是图标对象形状和排序（UTF-16 码点）的唯一定义。
- Vite 环境（站点、vitest）用 `src/iconset.js`：`import.meta.glob` 收集模块后交给 `iconsFrom`。
- Node 环境（全部脚本）用 `scripts/icons.mjs`：`iconNames()` 列目录，`loadIcons()` 逐个 `import` 后交给 `iconsFrom`。
- 脚本用 `node --import ./scripts/node-ext.mjs` 运行，直接 `import` `src/` 的模块；不再用 Vite SSR。
- `tests/architecture.test.js` 禁止脚本导入 `vite`（打包用的 `packages.mjs` 除外）、使用 `ssrLoadModule`、自己列 `src/icons/`，
  并要求导入了省略后缀模块的 `package.json` 脚本带上 node-ext。

## 不做的方案

- **生成一个 `src/icons/index.js` 清单**：Node 和 Vite 都能直接用，但每加一个图标都要改同一个文件，多个会话并行加图标时必然冲突。
- **给 `src/` 的相对导入全部补上 `.js`**：三千多个文件的改动，和并行加图标的会话冲突，收益只是省掉一个 `--import` 参数。

## 结果

`build:packages` 的产物和改动前逐字节一致（Iconify 的 `lastModified` 除外）。`pnpm audit:icons` 三个审计合计约 40 秒，不再超时；
`pnpm margins folder` 一秒多。新增脚本只需要 `import { loadIcons } from './icons.mjs'`。
