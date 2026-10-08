# 图标命名规则

新图标按这里命名；改名时同时在 `src/aliases.js` 里登记旧名（见文末「改名与别名」）。

## 基本格式

- 文件名就是图标名：`src/icons/<name>.js`，kebab-case，只用 `a-z`、`0-9`、`-`（`tests/naming.test.js` 会校验）。
- 包里的导出名是 `Icon` + PascalCase：`folder-plus` → `IconFolderPlus`。所以名字在忽略大小写、去掉连字符后也不能和别的图标撞。
- 用英文常用词，美式拼写（`color` 不写 `colour`）。名字描述**画的是什么**，用途、同义词写进 `src/meta/tags.js` 的搜索关键词。

## 主次顺序：主体在前，修饰在后

名字的第一个词是画面的**主体**（占大部分画面、居中的那个），后面依次是附加的符号、状态、变体：

| 名字 | 画面 |
| --- | --- |
| `folder-plus` | 文件夹为主，里面 / 角上一个加号 |
| `list-heart` | 列表为主，角上一颗心 |
| `heart-list` | 爱心为主（居中），右下角一个小列表 |
| `file-circle` | 文件为主，角上一个圆 |
| `arrow-down-list` | 箭头为主，右下角一个小列表 |

所以 `X-list` 和 `list-X` 不是重复，而是主次相反的两个图标；同理 `circle-list`、`ban-list`、`assets-list` 等。

系列（`folder-*`、`file-*`、`book-*`、`calendar-*`、`chat-*`、`mail-*`、`monitor-*`、`briefcase-*`、`shield-*`、`map-pin-*` …）都是「本体-角标符号」：

- `<本体>-<符号>`：符号在本体中间（或右下角标，视系列而定）
- `<本体>-<符号>-badge`：符号作为右下角标
- `<本体>-<符号>-badge-top`：符号作为右上角标
- `<本体>-type-<扩展名>`：文件格式（`file-type-pdf`）

## 后缀的含义

一个后缀只表示一件事：

| 后缀 | 含义 | 例子 |
| --- | --- | --- |
| `-off` | **划掉**的本体：禁用、关闭、不可用。必须存在同名本体（`X-off` 对应 `X`） | `bell-off`、`wifi-off`、`search-off`、`laundry-wash-off`（不可水洗） |
| `-x` | 叉形符号 / 角标：移除、删除、清除、失败 | `trash-x`、`cart-x`、`user-x`、`search-x`（清除搜索）、`volume-x`（静音） |
| `-ban` | 禁止符号（圆 + 斜杠）角标：禁止、屏蔽 | `file-ban`、`map-pin-ban` |
| `-plus` / `-minus` / `-check` | 加号 / 减号 / 勾的符号或角标 | `user-plus`、`cart-minus`、`copy-check` |
| `-list` | 右下角一个小列表（见上节主次） | `heart-list` |
| `-half` | 只画一半的变体（半箭头、半颗星） | `arrow-up-half`、`star-half` |
| `-open` | 打开状态 | `folder-open`、`lock-open`、`mail-open` |
| `-on` / `-off`（状态对） | 只用于**没有同名本体**、成对出现的开关状态 | `toggle-on` / `toggle-off`、`power-state-on` / `power-state-off`、`label-on` / `label-off`（文字标签 ON / OFF） |

选 `-off`、`-x` 还是 `-ban`：

- 画的是本体被一道斜线划掉 → `-off`
- 画的是一个 × → `-x`
- 画的是 ⃠（圆 + 斜杠）→ `-ban`

`search-off`（划掉的放大镜：关闭搜索）和 `search-x`（镜片里一个叉：清除搜索）是两个不同的图标。

### `-circle` / `-square`

- 跟在**字形**后面（字母、数字、`x`、`check`、`plus`、`minus`、`alert`、`play`）：字形外面套一个圆 / 方框。`x-circle`、`number-1-circle`、`letter-a-square`、`check-square`。
- 在系列里（`file-circle`、`folder-circle`、`shield-circle-badge`）：`circle` 只是角标符号之一，和 `file-star`、`file-heart` 同一种用法。
- `info`、`help`、`user-circle` 这类「本来就是圆形」的图标不加 `-circle`，除非同时有不带圆的版本。
- 新的「圆里一个符号」图标沿用 `<符号>-circle`，不用 `circle-<符号>`（`circle-<X>` 按主次规则表示「圆为主、X 为角标」，如 `circle-list`）。

## 方向词

- 具体方向：`up`、`down`、`left`、`right`；斜向先竖后横：`up-left`、`down-right`。
- 箭头一族以箭头开头：`arrow-*`（一支）、`arrows-*`（两支）、`chevron-*` / `chevrons-*`、`corner-*`、`caret-*`。两支反向箭头写出两个方向：`arrows-up-down`、`arrows-left-right`、`chevrons-up-down`。箭头 + 横线是 `arrow-up-to-line` / `arrow-down-to-line`。
- 轴向用 `horizontal` / `vertical`，只用于不是箭头的东西：`separator-horizontal`、`distribute-vertical`、`rectangle-vertical`、`grip-horizontal`、`cursor-resize-horizontal`。斜放的变体用 `-diagonal`（`pin-diagonal`、`send-diagonal`）。
- 旋转：默认顺时针，逆时针加 `-ccw`（`rotate`、`rotate-ccw`）。

## 单复数

- 名字里用单数；画了**多个同样的东西**时用复数：`users`、`files`、`books`、`coins`、`tags`、`swords`、`chats`。
- 本身就是复数的词不再加 s：`dice`（骰子系列 `dice-1`…`dice-6`、`dice-d4`…），两颗骰子叫 `dice-pair`。
- 扑克牌：一张 `playing-card`，两张 `playing-cards`。

## 前缀与族

- 同一前缀只属于一族。不同概念撞前缀时给其中一族加限定词：发送（纸飞机）是 `send`、`send-right`、`send-up`、`send-diagonal`；图层排列是 `arrange-bring-forward`、`arrange-bring-to-front`、`arrange-send-backward`、`arrange-send-to-back`。
- 同一类东西用同一个词：图片一律 `image-*`（不用 `photo-*`；`live-photo` 是专有名词例外），卡牌游戏的功能牌是 `game-card-*`（不用泛泛的 `card-*`，`credit-card`、`id-card` 也是卡）。
- 有固定顺序的封闭系列用「系列名-项」：`hiragana-a`、`greek-alpha`、`hexagram-01-qian`、`rating-acb-g`、`status-in-review`。

## 缩写

- 默认写全称：`keyboard-enter`（不是 `kbd-enter`）、`playstation-cross`（不是 `ps-cross`）、`xbox-a`。
- 只保留在界面上本来就以缩写出现、或缩写比全称更通用的词：`usb`、`hdmi`、`nfc`、`cpu`、`gpu`、`ssd`、`sd`、`hd`、`hdr`、`iso`、`api`、`qr-code`、`cc`、`2k`/`4k`/`8k`、`dpad`（D-pad）、手柄按键名（`xbox-lb`、`playstation-l1`）。
- 品牌名照官方写法拼全（全小写）：`xbox`、`playstation`、`github`。

## 数字与序号

- 序号用数字：`dice-1`、`medal-2`、`heading-3`、`tally-five-4`；小数点写成 `-`：`rate-x0-5`（0.5×）。
- `grid-3x3` 这类规格照写。

## 改名与别名

已经发布过的名字永远不删除。改名时：

1. 重命名 `src/icons/<旧名>.js` → `<新名>.js`，同步所有引用（其他图标的 import、`src/categories.js`、`src/category-icons.js`、`src/meta/tags.js` 的键、`src/meta/since.json` 的键（版本号保留旧名的值）、审计基线 `scripts/*.baseline.json` 的键、站点和文档）。
2. 在 `src/aliases.js` 的 `ALIASES` 里加 `'旧名': '新名'`。值必须是现有图标；不能链式——再次改名时，把所有指向它的旧名一起改指向最新名字。
3. 发布构建（`pnpm build:packages`）会自动：
   - `@jannchie/icons` 导出 `IconOldName`（`@deprecated`，指向新图标），`/all` 的 `icons` 映射、`/static` 入口里旧名也能用；
   - `./meta` 里旧名条目带 `deprecated: true` 和 `replacedBy`；
   - Iconify JSON 把旧名写进 `aliases`。
4. 站点搜索旧名能找到新图标，`?icon=<旧名>` 会跳到新图标，详情栏显示旧名（已弃用）。

`tests/aliases.test.js` 会检查别名表：现名存在、旧名没有文件、没有链式或循环。
