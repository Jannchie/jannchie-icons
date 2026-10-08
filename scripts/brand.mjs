// 生成品牌素材：仓库标题图、社交分享图、网站图标
// - .github/banner.svg：1280 × 320，颜色跟随系统亮 / 暗主题（README 用）
// - public/og.png：1200 × 630 深色分享图（Open Graph / Twitter Card）
// - public/favicon.svg、favicon.ico（16 / 32 / 48）、apple-touch-icon.png（180）、icon-192.png、icon-512.png
// 左边标志 + 线条字母标题，右边一面图标格子墙；文字也用库里的线条字母画成路径，不依赖字体
// PNG / ICO 用 ImageMagick（magick）从 SVG 转出。用法：pnpm brand（图标增减后重新跑一次，数量会跟着更新）
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createSsrServer, load as loadWith } from './audit-baseline.mjs'

const server = await createSsrServer()
const load = path => loadWith(server, path)
const { finalize } = await load('/src/svg.js')
const { pathAttrs } = await load('/src/render.js')
const { lineAt, textWidth } = await load('/src/letters.js')
const { CORNERS, WEIGHTS } = await load('/src/options.js')

const names = readdirSync('src/icons').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3))
const RADIUS = 2
// 标志：库里的十面骰
const MARK = 'dice-d10'
const attrs = obj => Object.entries(obj).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}="${v}"`).join(' ')
// 24 网格的图标放到 (x, y)、边长 size 的方块里
async function icon(name, x, y, size, stroke) {
  const draw = (await load(`/src/icons/${name}.js`)).default
  const body = finalize(draw({ radius: RADIUS, stroke, weight: 'bold' }), stroke).map(p => `<path ${attrs(pathAttrs(p))}/>`).join('')
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24">${body}</svg>`
}
// 一行线条字母：左上角 (x, y)，字高 6·scale
const text = (str, x, y, scale, gap) => lineAt(str, [x, y], scale, gap).join('')

// 格子墙：挑各个分类里有代表性的图标；不存在的名字（比如被改名）自动跳过
const PICKS = [
  'folder', 'file', 'calendar-heart', 'chat-sparkle', 'mail', 'camera', 'usagi', 'astro-saturn', 'zodiac-leo', 'greek-lambda', 'hiragana-a',
  'stem-jia', 'branch-zi', 'xiangqi-shuai', 'shogi-ou', 'chess-knight', 'cc-by', 'license-mit', 'rating-esrb-e', 'dice-5', 'gamepad', 'rocket',
  'heart', 'sparkle', 'terminal', 'git-branch', 'brain-circuit', 'atom', 'dna', 'coffee', 'onigiri', 'guitar', 'trophy', 'crown', 'sword',
  'cloud-rain', 'sun', 'umbrella', 'wallet', 'bell', 'globe', 'palette', 'lightbulb', 'robot', 'key', 'lock', 'wifi', 'battery-full', 'music',
  'pizza', 'cake', 'tree-pine', 'flask', 'microscope', 'puzzle', 'magnet', 'hourglass', 'compass', 'map-pin', 'bookmark', 'tag', 'scissors',
  'brush', 'wand', 'code', 'database', 'chip', 'yin-yang', 'infinity', 'sigma', 'hash', 'loading-atom', 'notation-treble-clef', 'rune-algiz',
  'trigram-kan', 'moon-phase-waxing-crescent', 'chinese-zodiac-rabbit', 'alchemy-fire', 'maya-7', 'laundry-wash-30', 'ghs-flammable', 'resin-1',
  'okta-4', 'loading-cube', 'loading-globe', 'notation-quarter-note', 'katakana-a', 'rune-fehu', 'pen', 'send', 'thumbs-up', 'keyboard',
  'recycle', 'shield', 'bold', 'pin-diagonal',
].filter(n => names.includes(n))

const LIGHT = { bg: '#ffffff', line: '#e6e6ea', ink: '#0e0e11', dim: '#6e6f78', icons: '#4a4b53' }
const DARK = { bg: '#0e0e11', line: '#1d1d22', ink: '#f2f2f4', dim: '#9a9ba4', icons: '#c2c3ca' }
const css = c => `.bg { fill: ${c.bg}; } .line { stroke: ${c.line}; } .ink { stroke: ${c.ink}; color: ${c.ink}; } .dim { stroke: ${c.dim}; } .dim-fill { fill: ${c.dim}; } .icons { color: ${c.icons}; }`

// 横幅：W × H 画布，左栏 split 宽放标题，右栏是 cell 边长的图标格子；theme 为 'auto' 时颜色跟随系统
async function banner({ W, H, split, cell, theme, rounded = 12 }) {
  const STROKE = 1.5
  const cols = Math.floor((W - split) / cell)
  const rows = Math.floor(H / cell)
  const gridX = W - cols * cell
  const gridY = (H - rows * cell) / 2
  const iconSize = Math.round(cell * 0.44)
  const pad = (cell - iconSize) / 2
  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const name = PICKS[(r * cols + c) % PICKS.length]
      // 越往左越淡，和标题区过渡得柔和一些
      const fade = Math.min(1, 0.35 + c / (cols - 1) * 0.65)
      cells.push(`<g opacity="${fade.toFixed(2)}">${await icon(name, gridX + c * cell + pad, gridY + r * cell + pad, iconSize, STROKE)}</g>`)
    }
  }
  const gridLines = [
    ...Array.from({ length: cols }, (_, c) => `M${gridX + c * cell + 0.5} 0V${H}`),
    ...Array.from({ length: rows + 1 }, (_, r) => `M${gridX} ${gridY + r * cell + 0.5}H${W}`),
  ].join('')

  // 标题区：标志、标题、副标题、一行数据；整块（高约 190）在画布里垂直居中
  const left = 64
  const top = H / 2 - 88
  // 档位数直接取 options.js，增减档位后重新跑一次就跟着变
  const stats = [`${names.length} ICONS`, '24 GRID', `${CORNERS.length} RADII`, `${WEIGHTS.length} WEIGHTS`]
  const mark = await icon(MARK, left, top, 48, STROKE)
  const title = text('JANNCHIE ICONS', left, top + 76, 6.5, 10)
  const sub = text('LINE ICON LIBRARY', left, top + 142, 2.5, 5.5)
  let x = left
  const statPaths = []
  const statDots = []
  stats.forEach((s, i) => {
    if (i) {
      statDots.push(`<circle cx="${x + 14}" cy="${top + 179.5}" r="1.5" class="dim-fill"/>`)
      x += 28
    }
    statPaths.push(text(s, x, top + 176, 1.75, 4))
    x += textWidth(s, 1.75, 4)
  })

  const style = theme === 'auto' ? `${css(LIGHT)}\n  @media (prefers-color-scheme: dark) { ${css(DARK)} }` : css(theme === 'dark' ? DARK : LIGHT)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<title>Jannchie Icons</title>
<style>
  ${style}
</style>
<rect class="bg" width="${W}" height="${H}" rx="${rounded}"/>
<path class="line" d="${gridLines}"/>
${rounded ? `<rect class="line" x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="${rounded - 0.5}"/>` : ''}
<g class="icons" stroke="currentColor" stroke-width="${STROKE}">${cells.join('')}</g>
<g class="ink" stroke="currentColor" stroke-width="${STROKE}">${mark}</g>
<path class="ink" stroke-width="4.5" d="${title}"/>
<path class="dim" stroke-width="2" d="${sub}"/>
<g class="dim" stroke-width="1.5"><path d="${statPaths.join('')}"/>${statDots.join('')}</g>
</svg>
`
}

// 网站图标：深色圆角底 + 白色标志，浅色、深色标签栏上都看得清；小尺寸用最粗的线宽
// full：铺满不留圆角（apple-touch-icon 由系统自己裁圆角；manifest 图标留出安全区）
async function appIcon({ full = false } = {}) {
  const inset = full ? 7 : 5
  const mark = await icon(MARK, inset, inset, 32 - inset * 2, 2)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke-linecap="round" stroke-linejoin="round">
<rect width="32" height="32" rx="${full ? 0 : 7}" fill="#0e0e11"/>
<g stroke="#f2f2f4" stroke-width="2">${mark}</g>
</svg>
`
}

const tmp = mkdtempSync(join(tmpdir(), 'brand-'))
const png = (svg, out, w, h = w) => {
  const src = join(tmp, `${out.replace(/\W/g, '_')}.svg`)
  writeFileSync(src, svg)
  execFileSync('magick', ['-background', 'none', '-density', String(96 * w / Number(svg.match(/width="(\d+)"/)[1])), src, '-resize', `${w}x${h}!`, out])
}

mkdirSync('.github', { recursive: true })
mkdirSync('public', { recursive: true })
writeFileSync('.github/banner.svg', await banner({ W: 1280, H: 320, split: 560, cell: 64, theme: 'auto' }))
png(await banner({ W: 1200, H: 630, split: 560, cell: 64, theme: 'dark', rounded: 0 }), 'public/og.png', 1200, 630)

const favicon = await appIcon()
writeFileSync('public/favicon.svg', favicon)
const sizes = [16, 32, 48]
for (const s of sizes)
  png(favicon, join(tmp, `favicon-${s}.png`), s)
execFileSync('magick', [...sizes.map(s => join(tmp, `favicon-${s}.png`)), 'public/favicon.ico'])
const full = await appIcon({ full: true })
png(full, 'public/apple-touch-icon.png', 180)
png(full, 'public/icon-192.png', 192)
png(full, 'public/icon-512.png', 512)
rmSync(tmp, { recursive: true, force: true })

console.log(`brand assets for ${names.length} icons: .github/banner.svg, public/og.png, favicon.svg/.ico, apple-touch-icon.png, icon-192/512.png`)
await server.close()
