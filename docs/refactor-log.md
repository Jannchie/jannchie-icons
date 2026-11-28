# 架构治理记录

分支 `refactor/arch-entropy` 上的架构降熵工作：进度、任务池、待确认事项。架构现状见 [architecture.md](architecture.md)，决策见 [adr/](adr/)。

每一批都是「迁移全部调用方 → 删掉旧实现 → 验证 → 加防回归检查」的完整闭环，单独提交。验证手段：

- `pnpm test`：渲染冒烟（15 种设置）、描边 / 实心输出快照、命名、别名、架构约束。
- `pnpm audit:icons`：三个几何审计和基线比较。
- `pnpm build:packages` 前后产物对比：重构类改动要求逐字节一致（Iconify 的 `lastModified` 除外）。
- 预览站：开发服务器里看描边、实心两种模式能正常渲染、无控制台错误。

## 已完成

| # | 改动 | 删掉的东西 | 防回归 |
| --- | --- | --- | --- |
| 1 | 路径语法拆成 `src/path-data.js`，消除 `svg.js ↔ clip.js` 循环依赖 | `render.js`、`fill.js` 里各自写死的斜接上限 `2` | 无循环依赖测试 |
| 2 | 图标集合只有一种组装方式（`src/icon-list.js`），脚本直接在 Node 里跑 `src/`（ADR 0001） | 六份组装代码、Vite SSR 加载与超时重试、`localeCompare` 排序 | 脚本不准导入 vite、不准自己列图标目录、必须带 node-ext |
| 3 | 线宽 / 点径 / 斜接上限收进 `src/line-widths.js`，引擎不再依赖绘制模块（ADR 0002） | `svg.js → scene.js` 的倒挂、`corner.js` 手抄的 `dotWidth` 公式 | 引擎只依赖几何和约定；约定模块是叶子 |
| 4 | `tests/architecture.test.js` + `docs/architecture.md` | — | 循环依赖、核心包不碰站点 / Clipper2 / npm 依赖、图标不导入引擎 |
| 5 | 审计参数：基线文件只能用 `=` 指定 | `--update-baseline <名字>` 把名字当文件名的坑 | `tests/audit-args.test.js` |
| 6 | 「版本之间哪些图标变了」收进 `scripts/history.mjs`；发版说明的「重画」按输出快照判断 | `gen-since.mjs`、`release-notes.mjs` 各自的 git / 快照 / 版本比较代码；发版后手工修 CHANGELOG 的步骤 | v0.15.0、v0.18.0 的结果和手工修正版一致 |
| 7 | 描边、实心快照测试共用 `tests/snapshot.js` | 两份哈希 + 提示 + 文件快照代码 | — |
| 8 | 默认档位（圆角 2、常规）只在 `src/options.js` 定义一次 | 构建脚本、预览站里按下标或数值各写一遍的默认值 | — |
| 9 | 独立复审后的修正：名字前缀一个都没匹配上就报错（旧写法 `--baseline <文件>` 原来会按 0 个图标跑完、以 0 退出）；架构测试覆盖动态导入和 `&&` 后的命令 | — | `iconNames` 报错 |
| 10 | Vue / React 类型声明里 `hinting` 的注释改成默认关闭（实现和 README 早就是关闭） | 过期注释 | — |

## 待确认（需要产品决策或会影响并行工作）

1. **`src/meta/since.json`、`updated.json` 和生成器不同步**：在当前代码上跑 `node scripts/gen-since.mjs` 会改动约 2000 行
   （`updated.json` 上次重新生成是 2026-10-16）。这两份数据进了核心包的 `./meta`，重新生成会改变已发布的元数据，
   建议在下一次发版时跑一遍并把它加进发版步骤。
2. **`updated.json` 的「更新」是否要排除只改文件、不改输出的情况**：现在是「文件改过」或「输出快照变了」都算，
   所以给 1722 个图标加实心版那次，它们全都记成了更新。发版说明已经改成只看快照；`updated.json` 要不要同样处理，需要决定。
3. **`src/` 按层拆子目录**（`src/engine/`、`src/draw/`、`src/site/`）：边界现在靠测试保证。搬目录要改三千个图标的导入路径，
   会和正在并行加图标的会话冲突，建议在没有并行会话时一次做完，或者不做。
4. **加一个分类要改三个文件**（`categories.js` 的规则、`i18n.js` 的标题、`category-icons.js` 的代表图标）。
   合成一个分类清单能让改动集中，但这三个文件也是加图标的会话最常改的地方，同样建议挑时间做。
5. **站点、README、manifest 里的「3,000+」**：发版时手工更新五处。可以让 `pnpm brand` 一起改，但取整规则（向下取到千位？百位？）要定。

6. **给类型声明加类型检查**：核心包的 `.d.ts` 由 `build-packages.mjs` 的模板字符串生成，Vue / React 的是手写的，
   CI 里没有任何 `tsc` 检查（仓库也没有 TypeScript 依赖）。`hinting` 的过期注释就是两份手写声明各抄一遍的结果。
   加 `typescript` 开发依赖并在 CI 里检查生成的声明，是下一项（共享类型）的前提。

## 任务池（还没做，按价值排序）

- 核心包导出一个 `StyleOptions`（radius、weight、variant + 颜色），`SvgOptions`、`PathsOptions` 和 Vue / React 的
  `IconDefaults` 都扩展它，选项说明只写一份，默认值从 `src/options.js` 生成。依赖上面第 6 项的类型检查。

- `App.vue`（近千行）里的设置持久化、网址同步、滚动高亮可以拆成几个 composable；需要在浏览器里逐项回归，价值中等。
- `App.vue` 的搜索框图标手写了一份 SVG 属性，没有走 `IconSvg`（样式类名不同，改了要看页头样式）。
- `scripts/build-packages.mjs`（570 行）把核心包、`./static`、`./meta`、类型声明、Iconify 写在一个文件里，可以按产物拆开。
