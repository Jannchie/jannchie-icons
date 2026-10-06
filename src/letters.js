// 线条字母：每个字母 3.5 宽 × 6 高，原点在左上；只用直线和（椭圆）弧，能跟随线宽
import { affine } from './transform'

const W = 3.5

const GLYPHS = {
  A: 'M0 6L1.75 0L3.5 6M.6 4H2.9',
  B: 'M0 6V0H2A1.5 1.5 0 0 1 2 3H0M2 3A1.5 1.5 0 0 1 2 6H0',
  C: 'M3.5 1.75A1.75 1.75 0 0 0 0 1.75V4.25A1.75 1.75 0 0 0 3.5 4.25',
  D: 'M0 0H1A2.5 3 0 0 1 1 6H0Z',
  E: 'M3.5 0H0V6H3.5M0 3H2.75',
  F: 'M3.5 0H0V6M0 3H2.75',
  G: 'M3.5 1.75A1.75 1.75 0 0 0 0 1.75V4.25A1.75 1.75 0 0 0 3.5 4.25V3H2',
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

// 单个字形：左上角放在 (x, y)，按 scale 等比缩放（原始 3.5 × 6）；给了 sy 时横竖分开缩放
export const glyph = (c, x, y, scale = 1, sy = scale) => place(GLYPHS[c], x, y, scale, sy)

// 一行字以 (cx, cy) 为中心排开：字宽 W·sx、字高 6·sy，字间距 gap
export function line(str, [cx, cy], sx = 1, gap = 1.5, sy = sx) {
  const chars = [...str]
  const w = W * sx
  const x0 = cx - (w * chars.length + gap * (chars.length - 1)) / 2
  return chars.map((c, i) => glyph(c, x0 + i * (w + gap), cy - 3 * sy, sx, sy))
}

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
