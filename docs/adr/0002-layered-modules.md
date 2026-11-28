# 0002 src/ 分层：约定 → 几何 → 绘制 → 图标；引擎只依赖约定和几何

- 状态：已采纳（2026-11-28）

## 背景

`svg.js`（收尾）和 `clip.js`（裁切）互相导入；`svg.js` 为了点的默认直径导入了绘制层的 `scene.js`；
`fill.js` 为了斜接上限导入整个 `svg.js`；斜接上限 `2` 在 `svg.js`、`render.js`、`fill.js` 各写了一次；
`corner.js` 手抄了一遍 `dotWidth` 的公式。

## 决定

- 路径语法（`parse`、`minify`、`axisLines`、`absolute`）放在 `src/path-data.js`，是最底层，不导入任何模块。
- 路径样式标记到线宽的换算（`THIN`、`DETAIL_*`、`DOT`、`DOT_STROKE`、`widthOf`、`dotSize`、`dotWidth`、`MITER_LIMIT`）
  放在 `src/line-widths.js`，同样是叶子模块。
- 引擎（`svg.js`、`render.js`、`export.js`、`fill.js`）只依赖几何层和约定模块，不认识具体造型。
- 分层规则写进 `docs/architecture.md`，由 `tests/architecture.test.js` 检查。

## 不做的方案

- **把 `src/` 按层拆成子目录**（`src/engine/`、`src/draw/`、`src/site/` …）：目录本身能表达边界，但三千个图标文件
  `import '../geometry'` 这类路径全部要改，绘制模块也会在并行加图标的会话里频繁冲突。边界改由测试保证，目录搬迁列为待确认事项。
