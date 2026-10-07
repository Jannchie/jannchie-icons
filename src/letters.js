// 线条字母：每个字母 3.5 宽 × 6 高，原点在左上；只用直线和（椭圆）弧，能跟随线宽
import { axisLines, parse } from './svg'
import { affine } from './transform'

const W = 3.5

const GLYPHS = {
  A: 'M0 6L1.75 0L3.5 6M.6 4H2.9',
  B: 'M0 6V0H2A1.5 1.5 0 0 1 2 3H0M2 3A1.5 1.5 0 0 1 2 6H0',
  C: 'M3.5 1.75A1.75 1.75 0 0 0 0 1.75V4.25A1.75 1.75 0 0 0 3.5 4.25',
  D: 'M0 0H1A2.5 3 0 0 1 1 6H0Z',
  E: 'M3.5 0H0V6H3.5M0 3H2.75',
  F: 'M3.5 0H0V6M0 3H2.75',
  G: 'M3.27 .875A1.75 1.75 0 0 0 0 1.75V4.25A1.75 1.75 0 0 0 3.5 4.25V3H2', // 上端收在右上 30°，和横杠之间留出缺口，缩小后不会合成 Θ
  H: 'M0 0V6M3.5 0V6M0 3H3.5',
  I: 'M0 0H3.5M1.75 0V6M0 6H3.5',
  J: 'M3.5 0V4.25A1.75 1.75 0 0 1 0 4.25',
  K: 'M0 0V6M3.5 0L0 3.5M1.25 2.25L3.5 6',
  L: 'M0 0V6H3.5',
  M: 'M0 6V0L1.75 3.5L3.5 0V6',
  N: 'M0 6V0L3.5 6V0',
  O: 'M0 1.75A1.75 1.75 0 0 1 3.5 1.75V4.25A1.75 1.75 0 0 1 0 4.25Z',
  P: 'M0 6V0H1.75A1.75 1.75 0 0 1 1.75 3.5H0',
  Q: 'M0 1.75A1.75 1.75 0 0 1 3.5 1.75V4.25A1.75 1.75 0 0 1 0 4.25ZM2 4.5L3.5 6',
  R: 'M0 6V0H1.75A1.75 1.75 0 0 1 1.75 3.5H0M1.75 3.5L3.5 6',
  S: 'M3.5 1.5A1.75 1.5 0 1 0 1.75 3A1.75 1.5 0 1 1 0 4.5',
  T: 'M0 0H3.5M1.75 0V6',
  U: 'M0 0V4.25A1.75 1.75 0 0 0 3.5 4.25V0',
  V: 'M0 0L1.75 6L3.5 0',
  W: 'M0 0L.875 6L1.75 2.5L2.625 6L3.5 0',
  X: 'M0 0L3.5 6M3.5 0L0 6',
  Y: 'M0 0L1.75 3L3.5 0M1.75 3V6',
  Z: 'M0 0H3.5L0 6H3.5',
  0: 'M0 1.75A1.75 1.75 0 0 1 3.5 1.75V4.25A1.75 1.75 0 0 1 0 4.25Z',
  1: 'M.75 1.25L2 0V6',
  2: 'M0 1.5A1.75 1.5 0 1 1 3.18 2.36L0 6H3.5',
  3: 'M0 1.5A1.75 1.5 0 1 1 1.75 3A1.75 1.5 0 1 1 0 4.5',
  4: 'M2.75 6V0L0 4.25H3.5',
  5: 'M3.5 0H.5L0 2.75H1.75A1.625 1.625 0 0 1 1.75 6H0',
  6: 'M3 0A4.5 4.5 0 0 0 0 4.25A1.75 1.75 0 1 0 3.5 4.25A1.75 1.75 0 1 0 0 4.25',
  7: 'M0 0H3.5L1.25 6',
  8: 'M1.75 2.7A1.45 1.35 0 1 1 1.75 0A1.45 1.35 0 1 1 1.75 2.7A1.75 1.65 0 1 0 1.75 6A1.75 1.65 0 1 0 1.75 2.7', // 上圈小、下圈大
  9: 'M.5 6A4.5 4.5 0 0 0 3.5 1.75A1.75 1.75 0 1 0 0 1.75A1.75 1.75 0 1 0 3.5 1.75',
  '+': 'M.25 3H3.25M1.75 1.5V4.5',
  '-': 'M.5 3H3',
}

// 平移并缩放字母路径（sx、sy 分别作用于 x、y 和圆弧的 rx、ry）
const place = (d, dx, dy, sx = 1, sy = 1) => affine(d, sx, sy, dx, dy)

// 对齐像素网格（类似字体 hinting）：任意缩放、摆放后，把横线的 y、竖线的 x 吸到最近的 .5（正好居中时往小的一侧），
// 两条线之间的坐标按比例线性插值，最外侧两条线以外只平移；圆弧半径按端点所在区间的比例缩放
// 一组路径一起吸附（例如 $ 的 S 和竖线），才不会各吸各的错开；接受字符串、{ d } 对象或它们的数组，原样返回同样的结构
const half = v => Math.ceil(+(v - 1).toFixed(6)) + 0.5
function axisMap(lines) {
  const from = [...new Set(lines.map(v => +v.toFixed(6)))].sort((a, b) => a - b)
  const to = []
  from.forEach((v, i) => {
    // 两条线挨得太近（不到 0.5）就不强求，跟着前一条平移；否则至少隔 1，避免吸成一条
    if (i && v - from[i - 1] < 0.5)
      to.push(to[i - 1] + v - from[i - 1])
    else
      to.push(i ? Math.max(half(v), to[i - 1] + 1) : half(v))
  })
  const map = (v) => {
    if (!from.length)
      return v
    if (v <= from[0])
      return v + to[0] - from[0]
    for (let i = 1; i < from.length; i++) {
      if (v <= from[i])
        return to[i - 1] + (v - from[i - 1]) * (to[i] - to[i - 1]) / (from[i] - from[i - 1])
    }
    return v + to.at(-1) - from.at(-1)
  }
  // a → b 这一段的缩放比例（两端重合时取该点所在区间的斜率）
  const ratio = (a, b) => Math.abs(b - a) > 1e-6 ? (map(b) - map(a)) / (b - a) : (map(a + 1e-3) - map(a)) / 1e-3
  return { map, ratio }
}
export function snap(paths) {
  const list = [paths].flat()
  const ds = list.map(p => (typeof p === 'string' ? p : p.d))
  const lines = ds.flatMap(axisLines)
  const xs = lines.filter(l => l[0] === 'x').map(l => l[1])
  const ys = lines.filter(l => l[0] === 'y').map(l => l[1])
  const [X, Y] = [axisMap(xs), axisMap(ys)]
  const fmt = (x, y) => `${+X.map(x).toFixed(4)} ${+Y.map(y).toFixed(4)}`
  const out = ds.map((d) => {
    let pos = [0, 0]
    let start = [0, 0]
    return parse(d, true).map(([t, a]) => {
      if (t === 'Z') {
        pos = start
        return 'Z'
      }
      let s
      if (t === 'A') {
        const [rx, ry, phi, fa, fs, x, y] = a
        s = `A${+(rx * X.ratio(pos[0], x)).toFixed(4)} ${+(ry * Y.ratio(pos[1], y)).toFixed(4)} ${phi} ${fa} ${fs} ${fmt(x, y)}`
      }
      else {
        const pts = []
        for (let i = 0; i < a.length; i += 2)
          pts.push(fmt(a[i], a[i + 1]))
        s = t + pts.join(' ')
      }
      pos = a.slice(-2)
      if (t === 'M')
        start = pos
      return s
    }).join('')
  })
  const res = list.map((p, i) => (typeof p === 'string' ? out[i] : { ...p, d: out[i] }))
  return Array.isArray(paths) ? res : res[0]
}

// 单个字形对齐网格后的版本
export const crispGlyph = (...args) => snap(glyph(...args))

// 单个字形：左上角放在 (x, y)，按 scale 等比缩放（原始 3.5 × 6）；给了 sy 时横竖分开缩放
export const glyph = (c, x, y, scale = 1, sy = scale) => place(GLYPHS[c], x, y, scale, sy)

// 窄字：字宽不足 3.5 的字形按实际宽度排（advance），并左移 shift 让字形落在自己的字宽中间
// 否则「12」「18」里的 1 两边空出一大块，看起来像隔了个空格
const NARROW = { '1': { advance: 2, shift: 0.375 }, '-': { advance: 2.5, shift: 0.5 } }
export const advance = c => NARROW[c]?.advance ?? W
// 窄字（1、-）的字形按 3.5 宽画，排字时往左挪回它的字位里
export const shift = c => NARROW[c]?.shift ?? 0
export const textWidth = (str, sx = 1, gap = 1.5) => [...str].reduce((w, c, i) => w + advance(c) * sx + (i ? gap : 0), 0)

// 一行字从左上角 (x, y) 排开：字宽 advance·sx、字高 6·sy，字间距 gap；空格只占位不出字形
export function lineAt(str, [x, y], sx = 1, gap = 1.5, sy = sx) {
  return [...str].flatMap((c) => {
    const d = c === ' ' ? [] : [glyph(c, x - (NARROW[c]?.shift ?? 0) * sx, y, sx, sy)]
    x += advance(c) * sx + gap
    return d
  })
}

// 一行字以 (cx, cy) 为中心排开
export const line = (str, [cx, cy], sx = 1, gap = 1.5, sy = sx) => lineAt(str, [cx - textWidth(str, sx, gap) / 2, cy - 3 * sy], sx, gap, sy)

// 把一串字母排进 box（上下固定 6 高）：
// 三个字母左右撑满；少于三个按固定间距居中；多于三个先把字母横向压窄再撑满
// 字母内部空间小，标记为细节：粗字重下线宽封顶，不会糊成一团
const GAP = 1.75
export function label(text, { left, right, top }) {
  const chars = [...text.toUpperCase()]
  const n = chars.length
  const span = right - left
  const sx = n > 3 ? 0.75 : 1
  const w = W * sx
  const gap = n > 1 ? Math.min((span - w * n) / (n - 1), GAP) : 0
  const start = left + (span - (w * n + gap * (n - 1))) / 2
  return chars.map((c, i) => ({ d: place(GLYPHS[c], start + i * (w + gap), top, sx), detail: true }))
}
