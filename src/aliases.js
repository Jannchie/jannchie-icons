// 改名留下的兼容别名：旧名 → 现名。命名规则见 docs/naming.md。
// 已发布的名字永远不删：改名后旧名写进这里，发布包里照样能用（标记为弃用）——
//   @jannchie/icons 导出 IconOldName（@deprecated，指向新图标），/all、/static 同样能用旧名；
//   ./meta 里旧名条目带 deprecated: true 和 replacedBy；Iconify JSON 写进 aliases。
// 约定：值必须是 src/icons/ 里现有的图标；旧名不能再有文件；不能链式（值不能又是别名），再改名时把所有指向它的旧名一起改到最新名字。
// 纯数据、不依赖 Vite：Node 脚本和站点都直接 import。
export const ALIASES = {
  // -off 只表示「划掉」；IEC 60417 的开 / 关（I / O）是状态符号，改成 power-state-*
  'power-on': 'power-state-on',
  'power-off': 'power-state-off',
  // 喇叭 + 叉：叉形角标统一叫 -x
  'volume-mute': 'volume-x',
  // 图片一族统一叫 image-*
  'photo-edit': 'image-edit',
  // 箭头一族写出具体方向，和 arrows-up-down、chevrons-up-down 对齐
  'arrows-horizontal': 'arrows-left-right',
  // 箭头一族以 arrow- 开头：箭头 + 横线
  'up-to-top': 'arrow-up-to-line',
  'down-to-bottom': 'arrow-down-to-line',
  // 图层排列：和发送（send、send-right……纸飞机）分开，统一 arrange- 前缀
  'bring-forward': 'arrange-bring-forward',
  'bring-to-front': 'arrange-bring-to-front',
  'send-backward': 'arrange-send-backward',
  'send-to-back': 'arrange-send-to-back',
  // dice 本身就是复数；两颗骰子叫 dice-pair，和 dice-1…6、dice-d4… 同一前缀
  'dices': 'dice-pair',
  // 扑克牌：playing-card 一张、playing-cards 两张
  'cards': 'playing-cards',
  // 功能牌（UNO 式）：card- 太泛（credit-card、id-card 也是卡），改成 game-card-*
  'card-plus-four': 'game-card-plus-four',
  'card-plus-two': 'game-card-plus-two',
  'card-reverse': 'game-card-reverse',
  'card-skip': 'game-card-skip',
  'card-wild': 'game-card-wild',
  // 键盘按键：不用缩写 kbd
  'kbd-backspace': 'keyboard-backspace',
  'kbd-caps-lock': 'keyboard-caps-lock',
  'kbd-command': 'keyboard-command',
  'kbd-control': 'keyboard-control',
  'kbd-delete': 'keyboard-delete',
  'kbd-enter': 'keyboard-enter',
  'kbd-escape': 'keyboard-escape',
  'kbd-option': 'keyboard-option',
  'kbd-shift': 'keyboard-shift',
  'kbd-space': 'keyboard-space',
  'kbd-tab': 'keyboard-tab',
  // PlayStation 手柄按键：不用缩写 ps（和 xbox-* 一样写全品牌名）
  'ps-circle': 'playstation-circle',
  'ps-create': 'playstation-create',
  'ps-cross': 'playstation-cross',
  'ps-l1': 'playstation-l1',
  'ps-l2': 'playstation-l2',
  'ps-l3': 'playstation-l3',
  'ps-options': 'playstation-options',
  'ps-r1': 'playstation-r1',
  'ps-r2': 'playstation-r2',
  'ps-r3': 'playstation-r3',
  'ps-square': 'playstation-square',
  'ps-touchpad': 'playstation-touchpad',
  'ps-triangle': 'playstation-triangle',
  // 日历的右上角标变体：截短的顶边和左挂环交叉读成一个「+」，取消这个变体，旧名指向右下角标
  'calendar-arrow-down-badge-top': 'calendar-arrow-down-badge',
  'calendar-arrow-left-badge-top': 'calendar-arrow-left-badge',
  'calendar-arrow-right-badge-top': 'calendar-arrow-right-badge',
  'calendar-arrow-up-badge-top': 'calendar-arrow-up-badge',
  'calendar-assets-badge-top': 'calendar-assets-badge',
  'calendar-ban-badge-top': 'calendar-ban-badge',
  'calendar-bookmark-badge-top': 'calendar-bookmark-badge',
  'calendar-check-badge-top': 'calendar-check-badge',
  'calendar-circle-badge-top': 'calendar-circle-badge',
  'calendar-clock-badge-top': 'calendar-clock-badge',
  'calendar-cloud-badge-top': 'calendar-cloud-badge',
  'calendar-code-badge-top': 'calendar-code-badge',
  'calendar-gauge-badge-top': 'calendar-gauge-badge',
  'calendar-heart-badge-top': 'calendar-heart-badge',
  'calendar-image-badge-top': 'calendar-image-badge',
  'calendar-lock-badge-top': 'calendar-lock-badge',
  'calendar-minus-badge-top': 'calendar-minus-badge',
  'calendar-music-badge-top': 'calendar-music-badge',
  'calendar-plug-badge-top': 'calendar-plug-badge',
  'calendar-plus-badge-top': 'calendar-plus-badge',
  'calendar-puzzle-badge-top': 'calendar-puzzle-badge',
  'calendar-search-badge-top': 'calendar-search-badge',
  'calendar-shield-badge-top': 'calendar-shield-badge',
  'calendar-sparkle-badge-top': 'calendar-sparkle-badge',
  'calendar-star-badge-top': 'calendar-star-badge',
  'calendar-video-badge-top': 'calendar-video-badge',
  'calendar-x-badge-top': 'calendar-x-badge',
  // 书的右下角标变体：贴到右下角会截短页线和底边，书脊加两截短横线读成「E」；取消这个变体，旧名指向居中符号版本（没有居中版的指向右上角标）
  'book-arrow-down-badge': 'book-arrow-down',
  'book-arrow-left-badge': 'book-arrow-left',
  'book-arrow-right-badge': 'book-arrow-right',
  'book-arrow-up-badge': 'book-arrow-up',
  'book-assets-badge': 'book-assets',
  'book-ban-badge': 'book-ban',
  'book-bookmark-badge': 'book-bookmark',
  'book-check-badge': 'book-check',
  'book-circle-badge': 'book-circle',
  'book-clock-badge': 'book-clock',
  'book-cloud-badge': 'book-cloud',
  'book-code-badge': 'book-code',
  'book-gauge-badge': 'book-gauge',
  'book-heart-badge': 'book-heart',
  'book-image-badge': 'book-image',
  'book-lock-badge': 'book-lock',
  'book-minus-badge': 'book-minus',
  'book-music-badge': 'book-music',
  'book-plug-badge': 'book-plug',
  'book-plus-badge': 'book-plus',
  'book-puzzle-badge': 'book-puzzle',
  'book-search-badge': 'book-search-badge-top',
  'book-shield-badge': 'book-shield',
  'book-sparkle-badge': 'book-sparkle',
  'book-star-badge': 'book-star',
  'book-video-badge': 'book-video',
  'book-x-badge': 'book-x',
}

// 现名 → 旧名列表（站点搜索、详情栏用）
const OLD = {}
for (const [old, name] of Object.entries(ALIASES))
  (OLD[name] ??= []).push(old)

export const oldNamesOf = name => OLD[name] ?? []
// 旧名 → 现名；不是别名时原样返回
export const resolveName = name => ALIASES[name] ?? name

// 核心包的导出名：Icon + PascalCase（加前缀避开 import、2k 这类不能直接当标识符的名字）
export const exportName = name => `Icon${name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('')}`

// 校验别名表，返回错误信息（空数组表示没问题）。names：src/icons 里现有的图标名
// 现名必须存在、旧名不能还有文件、不能链式或指向自己、旧名的导出名不能和现有图标撞
export function validateAliases(names) {
  const present = new Set(names)
  const exportNames = new Set(names.map(exportName))
  const errors = []
  for (const [old, name] of Object.entries(ALIASES)) {
    if (!present.has(name))
      errors.push(`alias ${old} → ${name}: target icon not found`)
    if (present.has(old))
      errors.push(`alias ${old} → ${name}: src/icons/${old}.js still exists`)
    if (old === name || name in ALIASES)
      errors.push(`alias ${old} → ${name}: chained alias`)
    if (exportNames.has(exportName(old)))
      errors.push(`alias ${old}: export name ${exportName(old)} clashes with an icon`)
  }
  return errors
}
