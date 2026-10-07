// 图标分类：按名字规则归类，从上到下取第一条匹配的规则
// 「系列」类（文件夹、文件等）内部再按基础 / 居中符号 / 角标 / 格式分小节
// 没被任何规则认领的图标落进最后的「未分类」，方便发现漏归类
import { GREEK } from './greek'
import { HIRAGANA } from './kana'
import { STEMS } from './stems'
import { BRANCHES } from './branches'
import { ZODIAC } from './zodiac'
import { CHINESE_ZODIAC } from './chinese-zodiac'
import { HEXAGRAMS, TRIGRAMS } from './iching'
import { MOON_PHASES } from './moon-phases'
import { ALCHEMY, ALCHEMY_SECTIONS } from './alchemy'
import { AETTIR, RUNES } from './runes'
import { LOADING } from './loading'
import { NOTATION, NOTATION_SECTIONS } from './notation'
import { LAUNDRY, LAUNDRY_GROUPS } from './laundry'
import { GHS } from './ghs'
import { HAZARD } from './hazard'
import { STATUS } from './status'
import { CONTENTS as MANGA } from './manga'
import { SENSORS } from './sensor'
import { ECHELON, FRAMES, UNIT } from './unit'
import { TALLY } from './tally'
import { OKTA } from './okta'
import { AI_TASKS } from './modality'
import { ratingName, SYSTEMS } from './rating'

const family = prefix => name => name === prefix || name.startsWith(`${prefix}-`)
// 名单匹配；带 -off 的划掉版本跟着原图标走
const oneOf = (...names) => name => names.includes(name) || names.includes(name.replace(/-off$/, ''))
const prefixed = (...prefixes) => name => prefixes.some(p => name.startsWith(p))
const any = (...rules) => name => rules.some(rule => rule(name))

// 零散图标直接指定分类（优先于下面的规则）；带 -off 的划掉版本跟着原图标走
const EXTRA = {
  basic: ['circle', 'square', 'triangle', 'checkbox', 'radio', 'radio-checked', 'dashed-circle', 'arrows-horizontal', 'hexagon', 'pentagon'],
  action: ['clock-edit', 'share-arrow', 'import', 'export', 'archive', 'reset', 'replace', 'recycle', 'up-to-top', 'down-to-bottom', 'upgrade', 'inbox', 'clock-refresh', 'task', 'broom', 'dustpan', 'printer', 'qr-code'],
  status: ['heart', 'heart-pulse', 'heart-crack', 'heart-organ', 'thumbs-up', 'thumbs-down', 'tags', 'octagon-x'],
  editor: ['bring-to-front', 'send-to-back', 'bring-forward', 'send-backward', 'corner-radius', 'line-height', 'letter-spacing', 'fold-vertical', 'group', 'ungroup', 'distribute-horizontal', 'distribute-vertical', 'fit-to-screen', 'typography', 'compare'],
  screen: ['window-minimize', 'window-maximize', 'window-restore', 'window-close', 'presentation', 'timeline', 'tree-view'],
  dev: ['json', 'html', 'code-block', 'bug'],
  photo: ['camera-compact', 'camera-body', 'camera-dslr', 'camera-mirrorless', 'camera-film', 'camera-instant', 'camera-action', 'camera-lens', 'camera-lens-zoom', 'camera-lens-telephoto', 'camera-lens-pancake', 'aspect-ratio', 'perspective', 'live-photo', 'movie', 'photo-edit', 'camera-rotate', 'color-filter', 'flip-vertical', 'rotate-ccw'],
  chart: ['candlestick-chart', 'radar'],
  media: ['speaker', 'headphones', 'earbuds', 'music', 'play-circle', 'disc', 'vinyl', 'wave-sine', 'podcast'],
  weather: ['moon-star'],
  meeting: ['webcam', 'webcam-off', 'cctv', 'chats', 'collaborate', 'mic-handheld', 'mic-vintage', 'mic-studio'],
  search: ['map-search', 'globe-search'],
  object: ['stopwatch', 'toolbox', 'tools', 'graduation-cap', 'glasses', 'glasses-square', 'sunglasses', 'vr-headset', 'goggles', 'ghost', 'gift', 'package', 'receipt', 'map', 'rocket', 'ruler', 'books', 'diamond', 'notebook-pen', 'scale-balance', 'language-hiragana', 'calculator', 'backpack', 'library'],
}
const NAVY = ['battleship', 'cruiser', 'destroyer', 'frigate', 'carrier', 'submarine']
const ARMY = ['tank-heavy', 'tank-medium', 'tank-light', 'tank-destroyer', 'tank-spg', 'apc', 'spaag', 'sam', 'missile', 'radar-dish']
const AIRCRAFT = ['fighter', 'attack', 'bomber', 'stealth-bomber', 'transport', 'awacs', 'helicopter', 'drone']
const ENLISTED = ['private', 'corporal', 'sergeant', 'staff-sergeant', 'master-sergeant', 'sergeant-major']
const OFFICER = ['second-lieutenant', 'first-lieutenant', 'captain', 'major', 'lieutenant-colonel', 'colonel', 'major-general', 'lieutenant-general', 'general']
const HOUSEHOLD = ['sofa', 'armchair', 'bed', 'door', 'lamp-desk', 'bathtub', 'shower', 'toilet', 'refrigerator', 'washing-machine', 'microwave', 'air-conditioner']
const TOOLS = ['wrench', 'screwdriver', 'drill', 'saw', 'shovel', 'paint-bucket', 'flashlight']
const LANGUAGES = ['python', 'javascript', 'typescript', 'java', 'csharp', 'cpp', 'c', 'golang', 'rust', 'php', 'kotlin', 'swift', 'ruby', 'lua', 'haskell']
const USER_BASE = ['user', 'users', 'user-circle', 'id-card']
const USER_STATUS = ['user-plus', 'user-minus', 'user-check', 'user-x', 'user-cog']
const USER_EMPLOYMENT = ['user-full-time', 'user-part-time', 'user-contractor', 'user-intern', 'user-freelancer', 'user-remote', 'user-temp', 'label-fte', 'label-pt', 'label-ctr', 'label-int']
const USER_ROLE = ['user-owner', 'user-admin', 'user-editor', 'user-viewer', 'user-commenter', 'user-guest']
const GOJUON = Object.keys(HIRAGANA)
const EXTRA_OF = Object.fromEntries(Object.entries(EXTRA).flatMap(([id, names]) => names.map(n => [n, id])))

export const CATEGORIES = [
  // ---------- 系列 ----------
  { id: 'folder', match: family('folder'), series: true, base: ['folder-open'] },
  { id: 'file', match: family('file'), series: true },
  { id: 'list', match: any(family('list'), name => name.endsWith('-list')), series: true, base: ['list-ordered'] },
  { id: 'mail', match: family('mail'), series: true },
  { id: 'chat', match: family('chat'), series: true },
  { id: 'monitor', match: family('monitor'), series: true },
  { id: 'calendar', match: family('calendar'), series: true, base: ['calendar-days', 'calendar-range', 'calendar-heart'] },
  { id: 'briefcase', match: family('briefcase'), series: true },
  { id: 'book', match: family('book'), series: true, base: ['book-open'] },
  // 盾牌：shield-list 先被上面的列表系列认领（以符号为主的小列表）
  { id: 'shield', match: family('shield'), series: true },
  // 标签：基础造型一节，标签里的字母、数字各一节
  {
    id: 'tag',
    match: family('tag'),
    section: name => /^tag-[a-z]$/.test(name) ? { order: 1, key: 'letters' } : /^tag-\d$/.test(name) ? { order: 2, key: 'numbers' } : { order: 0, key: 'base' },
  },

  // ---------- 单个图标 ----------
  {
    id: 'basic',
    match: oneOf('dot', 'slash', 'line-segment', 'separator-vertical', 'separator-horizontal', 'plus', 'minus', 'plus-circle', 'minus-circle', 'menu', 'menu-left', 'menu-close', 'dots', 'dots-vertical', 'grip-vertical', 'caret-up', 'caret-down', 'chevrons-up-down', 'arrows-up-down', 'sort-ascending', 'sort-descending'),
  },
  { id: 'arrow', match: any(prefixed('arrow-', 'chevron-'), name => /^corner-(?:up|down|left|right)-/.test(name)) },
  {
    id: 'status',
    match: any(
      name => /^(?:check|x|alert)(?:-|$)/.test(name),
      oneOf('info', 'help', 'loader', 'bell', 'eye', 'lock', 'lock-open', 'fingerprint', 'scan-face', 'ban', 'star', 'bookmark', 'sparkle', 'clock', 'gauge', 'puzzle', 'plug'),
    ),
  },
  {
    id: 'action',
    match: any(
      prefixed('trash'),
      oneOf('refresh', 'download', 'upload', 'save', 'share', 'external-link', 'login', 'logout', 'filter', 'history'),
    ),
  },
  {
    id: 'editor',
    match: any(
      prefixed('align-', 'paperclip'),
      oneOf('edit', 'copy', 'clipboard', 'scissors', 'text', 'link', 'unlink', 'send', 'send-diagonal', 'send-right', 'send-up', 'pen', 'brush', 'highlighter', 'eraser', 'wand', 'smile', 'at', 'hash', 'image', 'image-plus', 'bold', 'italic', 'underline', 'strikethrough', 'heading', 'quote', 'indent', 'outdent', 'subscript', 'superscript', 'pilcrow', 'undo', 'redo', 'table', 'shapes'),
    ),
  },
  { id: 'search', match: family('search') },
  {
    id: 'glyph',
    match: prefixed('letter-', 'number-', 'roman-'),
    // 字母、数字、罗马数字各一节；罗马数字按数值排序（其余保持按名字的顺序）
    section: name => name.startsWith('letter-') ? { order: 0, key: 'letters' } : name.startsWith('number-') ? { order: 1, key: 'numbers' } : { order: 2, key: 'roman' },
    rank: name => (name.startsWith('roman-') ? Number(name.slice(6)) : 0),
  },
  {
    id: 'greek',
    match: prefixed('greek-'),
    // 小写、大写各一节，节内按字母表顺序
    section: name => name.startsWith('greek-capital-') ? { order: 1, key: 'upper' } : { order: 0, key: 'lower' },
    rank: name => Object.keys(GREEK).indexOf(name.replace(/^greek-(?:capital-)?/, '')),
  },
  { id: 'stem', match: prefixed('stem-'), rank: name => Object.keys(STEMS).indexOf(name.slice(5)) },
  { id: 'branch', match: prefixed('branch-'), rank: name => Object.keys(BRANCHES).indexOf(name.slice(7)) },
  { id: 'astro', match: prefixed('astro-'), rank: name => ['sun', 'moon', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].indexOf(name.slice(6)) },
  { id: 'zodiac', match: prefixed('zodiac-'), rank: name => Object.keys(ZODIAC).indexOf(name.slice(7)) },
  { id: 'chinese-zodiac', match: prefixed('chinese-zodiac-'), rank: name => Object.keys(CHINESE_ZODIAC).indexOf(name.slice(15)) },
  {
    id: 'iching',
    // 六芒星叫 hexagram（不带序号），留给「符号」分类
    match: name => name.startsWith('trigram-') || /^hexagram-\d/.test(name),
    // 八卦一节（先天八卦序），六十四卦一节（文王卦序）
    section: name => name.startsWith('trigram-') ? { order: 0, key: 'trigram' } : { order: 1, key: 'hexagram' },
    rank: name => name.startsWith('trigram-') ? Object.keys(TRIGRAMS).indexOf(name.slice(8)) : Object.keys(HEXAGRAMS).indexOf(name.slice(9)),
  },
  { id: 'moon-phase', match: prefixed('moon-phase-'), rank: name => Object.keys(MOON_PHASES).indexOf(name.slice(11)) },
  { id: 'maya', match: prefixed('maya-'), rank: name => Number(name.slice(5)) },
  {
    id: 'alchemy',
    match: prefixed('alchemy-'),
    rank: name => Object.keys(ALCHEMY).indexOf(name.slice(8)),
    section: (name) => {
      const key = ALCHEMY[name.slice(8)].section
      return { order: ALCHEMY_SECTIONS.indexOf(key), key: `alchemy-${key}` }
    },
  },
  {
    id: 'rune',
    match: prefixed('rune-'),
    rank: name => Object.keys(RUNES).indexOf(name.slice(5)),
    // 每 8 个一族（ætt）
    section: (name) => {
      const i = Math.floor(Object.keys(RUNES).indexOf(name.slice(5)) / 8)
      return { order: i, key: `aett-${AETTIR[i]}` }
    },
  },
  { id: 'character', match: oneOf('chiikawa', 'hachiware', 'usagi') },
  { id: 'gender', match: prefixed('gender-') },
  { id: 'accessibility', match: oneOf('accessibility', 'wheelchair', 'braille', 'hearing', 'hand', 'captions') },
  {
    id: 'kana',
    match: prefixed('hiragana-', 'katakana-'),
    // 平假名、片假名各一节，节内按五十音顺序
    section: name => name.startsWith('hiragana-') ? { order: 0, key: 'hiragana' } : { order: 1, key: 'katakana' },
    rank: name => GOJUON.indexOf(name.replace(/^\w+?-/, '')),
  },
  { id: 'ai', match: name => AI_TASKS.includes(name) },
  {
    id: 'loading',
    match: prefixed('loading-'),
    rank: name => Object.keys(LOADING).indexOf(name.slice(8)),
  },
  { id: 'cloud', match: oneOf('cloud-upload', 'cloud-download', 'cloud-sync') },
  { id: 'weather', match: any(oneOf('sun', 'moon', 'wind', 'fog', 'tornado', 'typhoon', 'cyclone', 'sunrise', 'sunset', 'rainbow', 'snowflake', 'umbrella'), family('cloud')) },
  { id: 'chart', match: prefixed('chart-', 'trending-') },
  {
    id: 'media',
    match: name => /^(?:play|pause|stop|skip-|fast-forward|rewind|volume|repeat|shuffle|sequence)/.test(name),
  },
  // 用户：人像本身、状态（加减勾叉、设置）、雇佣类型（含 FTE 等文字标签）、权限角色，各一节
  {
    id: 'user',
    match: any(prefixed('user'), oneOf('id-card', 'label-fte', 'label-pt', 'label-ctr', 'label-int')),
    section: name => USER_EMPLOYMENT.includes(name)
      ? { order: 2, key: 'user-employment' }
      : USER_ROLE.includes(name) ? { order: 3, key: 'user-role' } : USER_STATUS.includes(name) ? { order: 1, key: 'user-status' } : { order: 0, key: 'base' },
    rank: name => [...USER_BASE, ...USER_STATUS, ...USER_EMPLOYMENT, ...USER_ROLE].indexOf(name),
  },
  { id: 'meeting', match: oneOf('mic', 'video', 'phone', 'screen-share', 'phone-call', 'phone-incoming', 'phone-outgoing', 'phone-missed', 'voicemail', 'address-book', 'fax') },
  {
    id: 'photo',
    match: any(
      prefixed('camera-mode-'),
      oneOf('contrast', 'brightness', 'camera', 'aperture', 'f-stop', 'shutter-speed', 'iso', 'exposure', 'crop', 'rotate', 'flip', 'histogram', 'curves', 'droplet', 'thermometer', 'vignette', 'focus', 'sliders', 'telescope', 'binoculars'),
    ),
  },
  {
    id: 'screen',
    match: any(
      prefixed('layout-', 'sidebar', 'panel-', 'fullscreen'),
      oneOf('laptop', 'smartphone', 'tablet', 'tv', 'devices', 'screenshot', 'screen-record', 'picture-in-picture', 'cast', 'airplay', 'kanban', 'window', 'scale'),
    ),
  },
  { id: 'money', match: any(prefixed('currency-', 'coin-'), oneOf('wallet', 'coins', 'banknote', 'credit-card', 'piggy-bank')) },
  {
    id: 'building',
    match: oneOf(
      'home', 'home-heart', 'building', 'apartment', 'skyscraper', 'store', 'factory', 'warehouse', 'garage', 'barn',
      'hospital', 'school', 'bank', 'hotel', 'police-station', 'fire-station', 'post-office', 'train-station',
      'torii', 'shrine', 'temple', 'pagoda', 'japanese-castle',
      'castle', 'church', 'mosque', 'lighthouse', 'stadium', 'windmill', 'tent',
    ),
  },
  { id: 'git', match: prefixed('git-') },
  { id: 'keyboard', match: prefixed('kbd-'), rank: name => ['enter', 'shift', 'caps-lock', 'tab', 'backspace', 'delete', 'escape', 'space', 'command', 'option', 'control'].indexOf(name.slice(4)) },
  // 开发：通用的开发、数据图标一节，编程语言一节（按名单顺序，大致按常用程度）
  {
    id: 'dev',
    match: any(
      oneOf('code', 'code-braces', 'terminal', 'database', 'database-arrow-down', 'database-arrow-up', 'server', 'server-cog', 'layers', 'cube', 'chip', 'flask', 'activity', 'robot', 'brain', 'brain-circuit', 'brain-cyborg', 'neural-network', 'mcp', 'api', 'webhook', 'container'),
      oneOf(...LANGUAGES),
    ),
    section: name => LANGUAGES.includes(name) ? { order: 1, key: 'language' } : { order: 0, key: '' },
    rank: name => LANGUAGES.indexOf(name),
  },
  { id: 'navigation', match: oneOf('navigation', 'route', 'locate', 'signpost', 'milestone') },
  { id: 'network', match: oneOf('router', 'network', 'antenna', 'satellite', 'radio-tower', 'rss', 'nfc') },
  {
    id: 'rating',
    match: prefixed('rating-'),
    section: (name) => {
      const id = name.split('-')[1]
      return { order: Object.keys(SYSTEMS).indexOf(id), key: `rating-${id}` }
    },
    rank: (name) => {
      const id = name.split('-')[1]
      return SYSTEMS[id].ratings.findIndex(t => ratingName(id, t) === name)
    },
  },
  // 画幅：按 sensor.js 里的顺序（从大到小）
  { id: 'sensor', match: prefixed('sensor-'), rank: name => Object.keys(SENSORS).indexOf(name.slice(7)) },
  { id: 'quality', match: oneOf('sd', 'hd', 'fhd', 'uhd', '2k', '4k', '8k', 'hdr', 'blu-ray') },
  { id: 'science', match: oneOf('test-tube', 'beaker', 'atom', 'molecule', 'dna', 'microscope', 'element') },
  { id: 'circuit', match: oneOf('resistor', 'capacitor', 'inductor', 'diode', 'led', 'ground', 'circuit-switch', 'cell', 'ac-source', 'lamp', 'transistor') },
  { id: 'math', match: oneOf('plus-minus', 'not-equal', 'approx', 'divide', 'percent', 'sqrt', 'infinity', 'equal', 'sigma', 'less-than', 'greater-than', 'less-equal', 'greater-equal', 'identical', 'proportional', 'integral', 'partial', 'nabla', 'product', 'function', 'angle', 'perpendicular', 'parallel', 'element-of', 'subset', 'union', 'intersection', 'for-all', 'exists', 'therefore', 'because', 'empty-set', 'celsius', 'fahrenheit') },
  {
    id: 'license',
    match: any(prefixed('cc-', 'license'), oneOf('cc', 'copyright', 'copyleft', 'registered', 'trademark', 'public-domain')),
    section: name => name.startsWith('cc') || name === 'public-domain'
      ? { order: 0, key: 'cc' }
      : name.startsWith('license') ? { order: 1, key: 'oss' } : { order: 2, key: 'copyright' },
  },
  // 宗教：成员参照《文明》系列的宗教列表，按名字排序
  { id: 'religion', match: prefixed('religion-') },
  // 漫画气泡：普通、喊叫各一节，节内按 manga.js 里内容符号的顺序（空的那个名字没有后缀）
  {
    id: 'manga',
    match: prefixed('manga-'),
    section: name => name.startsWith('manga-shout') ? { order: 1, key: 'manga-shout' } : { order: 0, key: 'manga-bubble' },
    rank: name => Object.keys(MANGA).indexOf(name.replace(/^manga-(?:bubble|shout)-?/, '') || 'empty'),
  },
  { id: 'symbol', match: oneOf('pentagram', 'hexagram', 'asterisk', 'yin-yang', 'bagua', 'peace') },
  // 传统的导航、计时器具：舵、罗经玫瑰、司南、日晷
  { id: 'antique', match: oneOf('helm', 'compass-rose', 'sinan', 'sundial'), rank: name => ['helm', 'compass-rose', 'sinan', 'sundial'].indexOf(name) },
  {
    id: 'mark',
    match: prefixed('rate-', 'size-'),
    // 倍率一节按数值从小到大，尺码一节按 XS → XXL
    section: name => name.startsWith('rate-') ? { order: 0, key: 'rate' } : { order: 1, key: 'size' },
    rank: name => name.startsWith('rate-') ? Number(name.slice(6).replace('-', '.')) : ['xs', 's', 'm', 'l', 'xl', 'xxl'].indexOf(name.slice(5)),
  },
  {
    id: 'laundry',
    match: prefixed('laundry-'),
    section: (name) => {
      const g = LAUNDRY[name.slice(8)].group
      return { order: LAUNDRY_GROUPS.indexOf(g), key: `laundry-${g}` }
    },
    rank: name => Object.keys(LAUNDRY).indexOf(name.slice(8)),
  },
  // 危险警示：先是独立的危险符号，再是三角警告标志（按 HAZARD 的顺序）
  {
    id: 'hazard',
    match: any(prefixed('hazard-'), oneOf('radioactive', 'biohazard', 'skull-crossbones')),
    rank: name => name.startsWith('hazard-') ? 3 + Object.keys(HAZARD).indexOf(name.slice(7)) : ['radioactive', 'biohazard', 'skull-crossbones'].indexOf(name),
  },
  // 军事：海军舰艇、陆军车辆、兵牌、空军飞机、军衔，各自一类；名单的顺序就是预览顺序
  { id: 'navy', match: prefixed('navy-'), rank: name => NAVY.indexOf(name.slice(5)) },
  { id: 'army', match: any(prefixed('tank-'), oneOf(...ARMY)), rank: name => ARMY.indexOf(name) },
  // 兵牌：兵种符号、外框（敌我识别）、部队规模三节，各按 unit.js 里的键顺序
  {
    id: 'unit',
    match: prefixed('unit-'),
    section: name => name.startsWith('unit-frame-') ? { order: 1, key: 'unit-frame' } : name.startsWith('unit-echelon-') ? { order: 2, key: 'unit-echelon' } : { order: 0, key: 'unit-branch' },
    rank: name => name.startsWith('unit-frame-')
      ? Object.keys(FRAMES).indexOf(name.slice(11))
      : name.startsWith('unit-echelon-') ? Object.keys(ECHELON).indexOf(name.slice(13)) : Object.keys(UNIT).indexOf(name.slice(5)),
  },
  { id: 'aircraft', match: prefixed('aircraft-'), rank: name => AIRCRAFT.indexOf(name.slice(9)) },
  {
    id: 'rank',
    match: prefixed('rank-'),
    section: name => ENLISTED.includes(name.slice(5)) ? { order: 0, key: 'enlisted' } : { order: 1, key: 'officer' },
    rank: name => [...ENLISTED, ...OFFICER].indexOf(name.slice(5)),
  },
  // 计数符号：每种计数法一节（按 TALLY 的顺序），节内按计到的数排
  {
    id: 'tally',
    match: prefixed('tally-'),
    section: (name) => {
      const sys = name.split('-')[1]
      return { order: Object.keys(TALLY).indexOf(sys), key: `tally-${sys}` }
    },
    rank: name => Number(name.split('-')[2]),
  },
  // 流程状态：status-* 按工作流顺序（STATUS 的键），印章排在最后
  { id: 'workflow', match: prefixed('status-', 'stamp'), rank: name => name.startsWith('status-') ? Object.keys(STATUS).indexOf(name.slice(7)) : 100 + (name === 'stamp' ? 0 : 1) },
  { id: 'ghs', match: prefixed('ghs-'), rank: name => Object.keys(GHS).indexOf(name.slice(4)) },
  { id: 'resin', match: prefixed('resin-'), rank: name => Number(name.slice(6)) },
  // OKTA 的键是 '0'…'8' 和 'obscured'：整数键在对象里自动排前面
  { id: 'okta', match: prefixed('okta-'), rank: name => Object.keys(OKTA).indexOf(name.slice(5)) },
  { id: 'shopping', match: any(prefixed('cart'), oneOf('shopping-bag', 'basket', 'ticket', 'discount', 'barcode')) },
  { id: 'food', match: oneOf('meat', 'steak', 'bacon', 'fish', 'egg', 'egg-fried', 'milk', 'wine', 'beer', 'cocktail', 'sake', 'coffee', 'apple', 'carrot', 'bread', 'cheese', 'rice', 'utensils', 'cake', 'cookie', 'cupcake', 'donut', 'ice-cream', 'candy', 'lollipop', 'pizza', 'burger', 'cherry', 'grapes', 'banana', 'lemon', 'watermelon', 'strawberry', 'popcorn', 'onigiri', 'soda', 'teapot') },
  { id: 'nature', match: oneOf('tree', 'tree-pine', 'tree-palm', 'sprout', 'leaf', 'flower', 'tulip', 'clover', 'cactus', 'mushroom', 'feather', 'mountain', 'waves', 'flame') },
  // 动物：正面头像（猫、狗、猪、牛）、侧面剪影（马、鸟、龟，朝左，和兔子、蜗牛同向）、俯视（蜜蜂、蝴蝶）、爪印
  { id: 'animal', match: oneOf('paw', 'cat', 'dog', 'pig', 'cow', 'horse', 'bird', 'turtle', 'bee', 'butterfly') },
  // 民用交通：车（侧视、车头朝右）、飞机、船，以及加油、充电、停车、路锥、红绿灯这些路上的设施
  { id: 'transport', match: oneOf('car', 'taxi', 'bus', 'truck', 'bike', 'motorcycle', 'scooter', 'plane', 'plane-takeoff', 'plane-landing', 'ship', 'sailboat', 'fuel', 'ev-charger', 'parking', 'traffic-light', 'traffic-cone') },
  { id: 'hardware', match: oneOf('usb', 'usb-c', 'usb-a', 'usb-drive', 'hdmi', 'ethernet', 'sd-card', 'cpu', 'gpu', 'memory', 'hard-drive', 'ssd', 'fan') },
  {
    id: 'notation',
    match: prefixed('notation-'),
    section: (name) => {
      const key = NOTATION[name.slice(9)].section
      return { order: NOTATION_SECTIONS.indexOf(key), key: `notation-${key}` }
    },
    rank: name => Object.keys(NOTATION).indexOf(name.slice(9)),
  },
  { id: 'instrument', match: oneOf('guitar', 'violin', 'piano', 'drum', 'trumpet', 'saxophone', 'flute', 'harmonica', 'metronome') },
  { id: 'weapon', match: oneOf('sword', 'swords', 'dagger', 'bow', 'axe', 'spear', 'hammer', 'bomb', 'pistol') },
  { id: 'clothing', match: any(prefixed('shoe'), oneOf('t-shirt', 'dress', 'pants', 'cap', 'hat', 'sock', 'hanger')) },
  {
    id: 'controller',
    match: prefixed('xbox-', 'ps-', 'dpad', 'controller-'),
    section: name => name.startsWith('xbox-') ? { order: 0, key: 'xbox' } : name.startsWith('ps-') ? { order: 1, key: 'ps' } : { order: 2, key: 'generic' },
  },
  { id: 'tabletop', match: any(prefixed('chess', 'suit-', 'xiangqi-', 'shogi-', 'card-'), oneOf('sudoku', 'tic-tac-toe', 'crossword', 'minesweeper', 'tetromino', 'puzzle-cube', 'four-in-a-row', 'bingo', 'darts', 'billiards'), oneOf('go-board', 'playing-card', 'cards', 'poker-chip', 'domino', 'mahjong')) },
  { id: 'award', match: oneOf('trophy', 'medal', 'medal-1', 'medal-2', 'medal-3', 'award', 'crown', 'podium') },
  { id: 'sport', match: oneOf('basketball', 'soccer', 'volleyball', 'rugby', 'baseball', 'tennis', 'golf', 'ping-pong', 'badminton', 'bowling', 'dumbbell', 'run', 'swim', 'ski', 'surf') },
  { id: 'medical', match: oneOf('pill', 'syringe', 'ambulance', 'stethoscope', 'bandage', 'first-aid', 'tooth', 'bone') },
  // 表情：mood-* 一组（圆脸 + 眼睛 + 嘴，见 mood-empty）
  { id: 'mood', match: prefixed('mood-') },
  { id: 'game', match: any(prefixed('dice'), oneOf('gamepad', 'game-handheld', 'joystick')) },
  // 家居家电：家具、卫浴、家电；按名单顺序排
  { id: 'household', match: oneOf(...HOUSEHOLD), rank: name => HOUSEHOLD.indexOf(name) },
  // 工具：手工具和电动工具（扳手也归到这里；tools、toolbox 仍在 EXTRA.object 里）
  { id: 'tool', match: oneOf(...TOOLS), rank: name => TOOLS.indexOf(name) },
  {
    id: 'object',
    match: oneOf('key', 'palette', 'pin', 'pin-diagonal', 'hourglass', 'alarm-clock', 'timer', 'flag', 'flag-plain', 'flag-pennant', 'flag-wave', 'flag-checkered', 'flag-banner', 'target', 'compass', 'map-pin', 'keyboard', 'globe', 'languages', 'lightbulb', 'tada', 'zap', 'rabbit', 'snail', 'magnet'),
  },
  // 电源与开关：oneOf 会先去掉名字末尾的 -off，所以 power-off、toggle-off、label-off 分别按 power、toggle、label 匹配
  { id: 'ui', match: any(prefixed('cursor', 'battery'), oneOf('settings', 'theme', 'wifi', 'signal', 'bluetooth', 'power', 'power-on', 'power-toggle', 'toggle', 'toggle-on', 'label', 'label-on')) },
  { id: 'other', match: () => true },
]

// 系列内的小节：基础 → 居中符号 → 角标（右下）→ 右上角标 → 格式
function section(name, cat) {
  if (name.startsWith(`${cat.id}-type-`))
    return { order: 5, key: 'type' }
  if (name.endsWith('-badge-top'))
    return { order: 4, key: 'badge-top' }
  if (name.endsWith('-badge'))
    return { order: 3, key: 'badge' }
  if (name.endsWith('-list'))
    return { order: 2, key: 'symbol-led' }
  if (name === cat.id || name === `${cat.id}-off` || cat.base?.includes(name))
    return { order: 0, key: 'base' }
  return { order: 1, key: cat.id === 'list' ? 'symbol' : 'center-symbol' }
}

// icons: [{ name, ... }] → [{ id, count, groups: [{ key, icons }] }]；query 按名字或分类名过滤
// 分类名、小节名都是多语言的，这里只给 id / key，由界面按当前语言翻译；titleOf(id) / groupTitleOf(key) 返回用来搜索的分类名、小节名（已转小写）
// 每个图标的分类、所在小节、排序值只和名字有关：按名字缓存，搜索时只做过滤，不再对每个图标逐条跑规则
const placement = new Map()
function place(name) {
  let p = placement.get(name)
  if (!p) {
    const id = EXTRA_OF[name] ?? EXTRA_OF[name.replace(/-off$/, '')]
    const cat = (id && CATEGORIES.find(c => c.id === id)) || CATEGORIES.find(c => c.match(name))
    const sec = cat.section ? cat.section(name) : cat.series ? section(name, cat) : { order: 0, key: '' }
    p = { cat, sec, rank: cat.rank ? cat.rank(name) : 0 }
    placement.set(name, p)
  }
  return p
}

// groupTitleOf(key) 返回小节名（用来搜索）：搜小节名也能搜到小节里的图标
export function categorize(icons, query = '', titleOf = id => id, groupTitleOf = () => '') {
  const q = query.trim().toLowerCase()
  const groupsOf = new Map(CATEGORIES.map(c => [c, new Map()]))
  for (const icon of icons) {
    const { cat, sec } = place(icon.name)
    if (q && !icon.name.includes(q) && !titleOf(cat.id).includes(q) && !(sec.key && groupTitleOf(sec.key).includes(q)))
      continue
    const groups = groupsOf.get(cat)
    if (!groups.has(sec.key))
      groups.set(sec.key, { ...sec, icons: [] })
    groups.get(sec.key).icons.push(icon)
  }
  return CATEGORIES
    .map((c) => {
      const groups = [...groupsOf.get(c).values()].sort((a, b) => a.order - b.order)
      if (c.rank)
        groups.forEach(g => g.icons.sort((a, b) => place(a.name).rank - place(b.name).rank))
      return { id: c.id, count: groups.reduce((n, g) => n + g.icons.length, 0), groups }
    })
    .filter(c => c.groups.length)
}
