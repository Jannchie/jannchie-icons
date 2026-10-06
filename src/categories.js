// 图标分类：按名字规则归类，从上到下取第一条匹配的规则
// 「系列」类（文件夹、文件等）内部再按基础 / 居中符号 / 角标 / 格式分小节
// 没被任何规则认领的图标落进最后的「未分类」，方便发现漏归类
import { GREEK } from './greek'
import { HIRAGANA } from './kana'
import { STEMS } from './stems'
import { BRANCHES } from './branches'
import { ZODIAC } from './zodiac'
import { AI_TASKS } from './modality'
import { ratingName, SYSTEMS } from './rating'

const family = prefix => name => name === prefix || name.startsWith(`${prefix}-`)
// 名单匹配；带 -off 的划掉版本跟着原图标走
const oneOf = (...names) => name => names.includes(name.replace(/-off$/, ''))
const prefixed = (...prefixes) => name => prefixes.some(p => name.startsWith(p))
const any = (...rules) => name => rules.some(rule => rule(name))

// 零散图标直接指定分类（优先于下面的规则）；带 -off 的划掉版本跟着原图标走
const EXTRA = {
  basic: ['circle', 'square', 'triangle', 'checkbox', 'radio', 'radio-checked', 'dashed-circle', 'arrows-horizontal'],
  action: ['share-arrow', 'import', 'export', 'archive', 'reset', 'replace', 'recycle', 'up-to-top', 'down-to-bottom', 'upgrade', 'inbox', 'clock-refresh', 'task', 'broom', 'dustpan', 'printer', 'qr-code'],
  status: ['heart', 'heart-pulse', 'heart-crack', 'heart-organ', 'thumbs-up', 'thumbs-down', 'tags', 'octagon-x', 'mood-empty'],
  editor: ['bring-to-front', 'send-to-back', 'group', 'ungroup', 'distribute-horizontal', 'distribute-vertical', 'fit-to-screen', 'typography', 'compare'],
  screen: ['window-minimize', 'window-maximize', 'window-restore', 'window-close', 'presentation', 'timeline', 'tree-view'],
  dev: ['json', 'html', 'code-block', 'bug'],
  photo: ['camera-compact', 'aspect-ratio', 'perspective', 'live-photo', 'movie', 'photo-edit', 'camera-rotate', 'color-filter', 'flip-vertical', 'rotate-ccw'],
  chart: ['candlestick-chart', 'radar'],
  media: ['speaker', 'headphones', 'earbuds', 'music', 'play-circle', 'disc', 'vinyl', 'wave-sine'],
  weather: ['moon-star'],
  meeting: ['webcam', 'webcam-off', 'cctv', 'chats', 'collaborate', 'mic-handheld', 'mic-vintage', 'mic-studio'],
  search: ['map-search', 'globe-search'],
  object: ['glasses', 'glasses-square', 'sunglasses', 'vr-headset', 'goggles', 'ghost', 'gift', 'package', 'receipt', 'map', 'rocket', 'ruler', 'books', 'diamond', 'notebook-pen', 'scale-balance', 'language-hiragana'],
}
const GOJUON = Object.keys(HIRAGANA)
const EXTRA_OF = Object.fromEntries(Object.entries(EXTRA).flatMap(([id, names]) => names.map(n => [n, id])))

export const CATEGORIES = [
  // ---------- 系列 ----------
  { id: 'folder', title: '文件夹', match: family('folder'), series: true, base: ['folder-open'] },
  { id: 'file', title: '文件', match: family('file'), series: true },
  { id: 'list', title: '列表', match: any(family('list'), name => name.endsWith('-list')), series: true, base: ['list-ordered'] },
  { id: 'mail', title: '邮件', match: family('mail'), series: true },
  { id: 'chat', title: '对话', match: family('chat'), series: true },
  { id: 'monitor', title: '显示器', match: family('monitor'), series: true },
  { id: 'calendar', title: '日历', match: family('calendar'), series: true, base: ['calendar-days', 'calendar-range', 'calendar-heart'] },
  { id: 'briefcase', title: '公文包', match: family('briefcase'), series: true },

  // ---------- 单个图标 ----------
  {
    id: 'basic',
    title: '基础符号',
    match: oneOf('plus', 'minus', 'plus-circle', 'minus-circle', 'menu', 'menu-left', 'menu-close', 'dots', 'dots-vertical', 'grip-vertical', 'caret-up', 'caret-down', 'chevrons-up-down', 'arrows-up-down', 'sort-ascending', 'sort-descending'),
  },
  { id: 'arrow', title: '箭头', match: prefixed('arrow-', 'chevron-') },
  {
    id: 'status',
    title: '标记与状态',
    match: any(
      name => /^(?:check|x|shield|alert)(?:-|$)/.test(name),
      oneOf('info', 'help', 'loader', 'bell', 'eye', 'lock', 'lock-open', 'ban', 'star', 'bookmark', 'sparkle', 'clock', 'gauge', 'puzzle', 'plug'),
    ),
  },
  {
    id: 'action',
    title: '操作',
    match: any(
      prefixed('trash'),
      oneOf('refresh', 'download', 'upload', 'save', 'share', 'external-link', 'login', 'logout', 'filter', 'history', 'user-plus'),
    ),
  },
  {
    id: 'editor',
    title: '编辑',
    match: any(
      prefixed('align-', 'paperclip'),
      oneOf('edit', 'copy', 'clipboard', 'scissors', 'text', 'link', 'unlink', 'send', 'send-diagonal', 'send-right', 'send-up', 'pen', 'brush', 'highlighter', 'eraser', 'wand', 'smile', 'at', 'hash', 'image', 'image-plus', 'bold', 'italic', 'underline', 'strikethrough', 'heading', 'quote', 'undo', 'redo', 'table', 'shapes'),
    ),
  },
  { id: 'search', title: '搜索', match: family('search') },
  { id: 'glyph', title: '字母与数字', match: prefixed('letter-', 'number-') },
  {
    id: 'greek',
    title: '希腊字母',
    match: prefixed('greek-'),
    // 小写、大写各一节，节内按字母表顺序
    section: name => name.startsWith('greek-capital-') ? { order: 1, title: '大写' } : { order: 0, title: '小写' },
    rank: name => Object.keys(GREEK).indexOf(name.replace(/^greek-(?:capital-)?/, '')),
  },
  { id: 'stem', title: '天干', match: prefixed('stem-'), rank: name => Object.keys(STEMS).indexOf(name.slice(5)) },
  { id: 'branch', title: '地支', match: prefixed('branch-'), rank: name => Object.keys(BRANCHES).indexOf(name.slice(7)) },
  { id: 'astro', title: '行星符号', match: prefixed('astro-'), rank: name => ['sun', 'moon', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].indexOf(name.slice(6)) },
  { id: 'zodiac', title: '黄道十二宫', match: prefixed('zodiac-'), rank: name => Object.keys(ZODIAC).indexOf(name.slice(7)) },
  { id: 'character', title: '角色', match: oneOf('chiikawa', 'hachiware', 'usagi') },
  { id: 'gender', title: '性别', match: prefixed('gender-') },
  { id: 'accessibility', title: '无障碍', match: oneOf('accessibility', 'wheelchair', 'braille', 'hearing') },
  {
    id: 'kana',
    title: '假名',
    match: prefixed('hiragana-', 'katakana-'),
    // 平假名、片假名各一节，节内按五十音顺序
    section: name => name.startsWith('hiragana-') ? { order: 0, title: '平假名' } : { order: 1, title: '片假名' },
    rank: name => GOJUON.indexOf(name.replace(/^\w+?-/, '')),
  },
  { id: 'ai', title: 'AI 任务', match: name => AI_TASKS.includes(name) },
  { id: 'cloud', title: '云端', match: oneOf('cloud-upload', 'cloud-download', 'cloud-sync') },
  { id: 'weather', title: '天气', match: any(oneOf('sun', 'moon', 'wind', 'fog', 'tornado', 'typhoon', 'cyclone', 'sunrise', 'sunset', 'rainbow', 'snowflake', 'umbrella'), family('cloud')) },
  { id: 'chart', title: '图表', match: prefixed('chart-', 'trending-') },
  {
    id: 'media',
    title: '媒体播放',
    match: name => /^(?:play|pause|stop|skip-|fast-forward|rewind|volume|repeat|shuffle|sequence)/.test(name),
  },
  { id: 'meeting', title: '会议', match: oneOf('mic', 'video', 'phone', 'screen-share', 'user', 'users') },
  {
    id: 'photo',
    title: '摄影',
    match: any(
      prefixed('camera-mode-'),
      oneOf('contrast', 'brightness', 'camera', 'aperture', 'f-stop', 'shutter-speed', 'iso', 'exposure', 'crop', 'rotate', 'flip', 'histogram', 'curves', 'droplet', 'thermometer', 'vignette', 'focus', 'sliders', 'telescope', 'binoculars'),
    ),
  },
  {
    id: 'screen',
    title: '屏幕与窗口',
    match: any(
      prefixed('layout-', 'sidebar', 'panel-', 'fullscreen'),
      oneOf('laptop', 'smartphone', 'tablet', 'tv', 'devices', 'screenshot', 'screen-record', 'picture-in-picture', 'cast', 'window', 'scale'),
    ),
  },
  { id: 'money', title: '金融', match: any(prefixed('currency-', 'coin-'), oneOf('wallet', 'coins', 'banknote', 'credit-card')) },
  { id: 'building', title: '建筑', match: oneOf('home', 'building', 'store', 'factory', 'hospital') },
  { id: 'git', title: 'Git', match: prefixed('git-') },
  {
    id: 'dev',
    title: '开发与数据',
    match: oneOf('code', 'code-braces', 'terminal', 'database', 'server', 'layers', 'cube', 'chip', 'flask', 'activity', 'robot', 'brain', 'brain-circuit', 'brain-cyborg', 'neural-network'),
  },
  {
    id: 'rating',
    title: '内容分级',
    match: prefixed('rating-'),
    section: (name) => {
      const id = name.split('-')[1]
      return { order: Object.keys(SYSTEMS).indexOf(id), title: SYSTEMS[id].zh }
    },
    rank: (name) => {
      const id = name.split('-')[1]
      return SYSTEMS[id].ratings.findIndex(t => ratingName(id, t) === name)
    },
  },
  { id: 'quality', title: '画质', match: oneOf('sd', 'hd', 'fhd', 'uhd', '2k', '4k', '8k', 'hdr', 'blu-ray') },
  { id: 'science', title: '化学', match: oneOf('test-tube', 'beaker', 'atom', 'molecule', 'dna', 'microscope', 'element', 'radioactive') },
  { id: 'circuit', title: '电路', match: oneOf('resistor', 'capacitor', 'inductor', 'diode', 'led', 'ground', 'circuit-switch', 'cell', 'ac-source', 'lamp', 'transistor') },
  { id: 'math', title: '数学', match: oneOf('plus-minus', 'not-equal', 'approx', 'divide', 'percent', 'sqrt', 'infinity', 'equal', 'sigma', 'less-than', 'greater-than', 'less-equal', 'greater-equal', 'identical', 'proportional', 'integral', 'partial', 'nabla', 'product', 'function', 'angle', 'perpendicular', 'parallel', 'element-of', 'subset', 'union', 'intersection', 'for-all', 'exists', 'therefore', 'because', 'empty-set', 'celsius', 'fahrenheit') },
  {
    id: 'license',
    title: '版权与协议',
    match: any(prefixed('cc-', 'license'), oneOf('cc', 'copyright', 'copyleft', 'registered', 'trademark', 'public-domain')),
    section: name => name.startsWith('cc') || name === 'public-domain'
      ? { order: 0, title: '知识共享 CC' }
      : name.startsWith('license') ? { order: 1, title: '开源协议' } : { order: 2, title: '版权符号' },
  },
  { id: 'symbol', title: '符号', match: oneOf('pentagram', 'hexagram', 'asterisk', 'yin-yang', 'peace') },
  {
    id: 'mark',
    title: '倍率与尺码',
    match: prefixed('rate-', 'size-'),
    // 倍率一节按数值从小到大，尺码一节按 XS → XXL
    section: name => name.startsWith('rate-') ? { order: 0, title: '倍率' } : { order: 1, title: '尺码' },
    rank: name => name.startsWith('rate-') ? Number(name.slice(6).replace('-', '.')) : ['xs', 's', 'm', 'l', 'xl', 'xxl'].indexOf(name.slice(5)),
  },
  { id: 'shopping', title: '购物', match: any(prefixed('cart'), oneOf('shopping-bag', 'basket', 'ticket', 'discount', 'barcode')) },
  { id: 'food', title: '食物', match: oneOf('meat', 'steak', 'bacon', 'fish', 'egg', 'egg-fried', 'milk', 'wine', 'beer', 'cocktail', 'sake', 'coffee', 'apple', 'carrot', 'bread', 'cheese', 'rice', 'utensils', 'cake', 'cookie', 'cupcake', 'donut', 'ice-cream', 'candy', 'lollipop', 'pizza', 'burger', 'cherry', 'grapes', 'banana', 'lemon', 'watermelon', 'strawberry', 'popcorn', 'onigiri', 'soda', 'teapot') },
  { id: 'nature', title: '自然', match: oneOf('tree', 'tree-pine', 'tree-palm', 'sprout', 'leaf', 'flower', 'tulip') },
  { id: 'hardware', title: '硬件与接口', match: oneOf('usb', 'usb-c', 'usb-a', 'usb-drive', 'hdmi', 'ethernet', 'sd-card', 'cpu', 'gpu', 'memory', 'hard-drive', 'ssd', 'fan') },
  { id: 'instrument', title: '乐器', match: oneOf('guitar', 'violin', 'piano', 'drum', 'trumpet', 'saxophone', 'flute', 'harmonica', 'metronome') },
  { id: 'weapon', title: '武器', match: oneOf('sword', 'swords', 'dagger', 'bow', 'axe', 'spear', 'hammer', 'bomb', 'pistol') },
  { id: 'clothing', title: '服装', match: any(prefixed('shoe'), oneOf('t-shirt', 'dress', 'pants', 'cap', 'hat', 'sock', 'hanger')) },
  {
    id: 'controller',
    title: '手柄按键',
    match: prefixed('xbox-', 'ps-', 'dpad', 'controller-'),
    section: name => name.startsWith('xbox-') ? { order: 0, title: 'Xbox' } : name.startsWith('ps-') ? { order: 1, title: 'PlayStation' } : { order: 2, title: '通用' },
  },
  { id: 'tabletop', title: '棋牌', match: any(prefixed('chess', 'suit-', 'xiangqi-', 'shogi-', 'card-'), oneOf('sudoku', 'tic-tac-toe', 'crossword', 'minesweeper', 'tetromino', 'puzzle-cube', 'four-in-a-row', 'bingo', 'darts', 'billiards'), oneOf('go-board', 'playing-card', 'cards', 'poker-chip', 'domino', 'mahjong')) },
  { id: 'award', title: '奖项', match: oneOf('trophy', 'medal', 'award', 'crown', 'podium') },
  { id: 'sport', title: '运动', match: oneOf('basketball', 'soccer', 'volleyball', 'rugby', 'baseball', 'tennis', 'golf', 'ping-pong', 'badminton', 'bowling') },
  { id: 'game', title: '游戏', match: any(prefixed('dice'), oneOf('gamepad', 'game-handheld', 'joystick')) },
  {
    id: 'object',
    title: '物品',
    match: oneOf('key', 'palette', 'pin', 'tag', 'book', 'book-open', 'hourglass', 'flag', 'target', 'compass', 'map-pin', 'keyboard', 'wrench', 'globe', 'languages', 'lightbulb', 'tada', 'zap', 'rabbit', 'snail', 'magnet'),
  },
  { id: 'ui', title: '界面', match: any(prefixed('cursor', 'battery'), oneOf('settings', 'theme', 'wifi', 'signal', 'bluetooth')) },
  { id: 'other', title: '未分类', match: () => true },
]

// 系列内的小节：基础 → 居中符号 → 角标 → 格式
function section(name, cat) {
  if (name.startsWith(`${cat.id}-type-`))
    return { order: 4, title: '格式' }
  if (name.endsWith('-badge'))
    return { order: 3, title: '角标' }
  if (name.endsWith('-list'))
    return { order: 2, title: '符号为主' }
  if (name === cat.id || name === `${cat.id}-off` || cat.base?.includes(name))
    return { order: 0, title: '基础' }
  return { order: 1, title: cat.id === 'list' ? '符号' : '居中符号' }
}

// icons: [{ name, ... }] → [{ id, title, count, groups: [{ title, icons }] }]；query 按名字或分类名过滤
// 每个图标的分类、所在小节、排序值只和名字有关：按名字缓存，搜索时只做过滤，不再对每个图标逐条跑规则
const placement = new Map()
function place(name) {
  let p = placement.get(name)
  if (!p) {
    const id = EXTRA_OF[name] ?? EXTRA_OF[name.replace(/-off$/, '')]
    const cat = (id && CATEGORIES.find(c => c.id === id)) || CATEGORIES.find(c => c.match(name))
    const sec = cat.section ? cat.section(name) : cat.series ? section(name, cat) : { order: 0, title: '' }
    p = { cat, sec, rank: cat.rank ? cat.rank(name) : 0 }
    placement.set(name, p)
  }
  return p
}

export function categorize(icons, query = '') {
  const q = query.trim().toLowerCase()
  const groupsOf = new Map(CATEGORIES.map(c => [c, new Map()]))
  for (const icon of icons) {
    const { cat, sec } = place(icon.name)
    if (q && !icon.name.includes(q) && !cat.title.toLowerCase().includes(q))
      continue
    const groups = groupsOf.get(cat)
    if (!groups.has(sec.title))
      groups.set(sec.title, { ...sec, icons: [] })
    groups.get(sec.title).icons.push(icon)
  }
  return CATEGORIES
    .map((c) => {
      const groups = [...groupsOf.get(c).values()].sort((a, b) => a.order - b.order)
      if (c.rank)
        groups.forEach(g => g.icons.sort((a, b) => place(a.name).rank - place(b.name).rank))
      return { id: c.id, title: c.title, count: groups.reduce((n, g) => n + g.icons.length, 0), groups }
    })
    .filter(c => c.groups.length)
}
