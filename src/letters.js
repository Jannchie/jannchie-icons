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

// 标签字形（框里、按钮上的小字：文件扩展名、画质、分级、画幅、标签……）：3.5 宽 × 7 高，只用横竖线和 1 个单位的 45° 小切角，没有圆弧——
// 16–20px 下一个字母只有三四个像素宽，圆弧会被抗锯齿成一团灰；横竖笔画加切角能落在整像素上，字母内部也留得出空
// 字形结构参照成熟的低分辨率字体（只借鉴规律）：
// - 3×5 / 4×6 像素字体（Tom Thumb、PICO-8）：笔画尽量横竖，2 不走斜线、R 的腿竖直落下
// - 5×7 点阵（HD44780、m5x7）：M、W 两条竖边保持完整，中间只是一个浅 V 口（到字高三分之一多一点）；
//   点阵里那段中竖这里不加：字宽吸附到网格后常是 3，中竖落不到半格上，会被吸偏到一边
// - 小字号屏幕字体（Terminus、Spleen）：用 45° 小切角代替圆弧；D 左边方角、右边大切角，O/0 四角小切角
// 中横统一在字高一半（y 3.5）：A B E F G H K P R S 2 3 5 6 8 9 的中横落在同一条线上，一行字吸附网格时不会互相挤开
// 易混的字靠转角区分：S 左上切角、5 左上方角；B 左边两个方角、8 四周都切角；2 不走斜线、Z 斜线；
// 斜线只留给 K M N V W X Y Z、4、7（以及 Q 的尾巴）。0 和 O 字形相同：3 像素宽的字里加斜杠或点只会把中间填满
const LABEL_GLYPHS = {
  A: 'M0 7V1L1 0H2.5L3.5 1V7M0 3.5H3.5',
  B: 'M0 0H2.5L3.5 1V2.5L2.5 3.5L3.5 4.5V6L2.5 7H0ZM0 3.5H2.5',
  C: 'M3.5 0H1L0 1V6L1 7H3.5',
  D: 'M0 0H2L3.5 1.5V5.5L2 7H0Z',
  E: 'M3.5 0H0V7H3.5M0 3.5H2.75',
  F: 'M3.5 0H0V7M0 3.5H2.75',
  G: 'M3.5 0H1L0 1V6L1 7H3.5V3.5H2',
  H: 'M0 0V7M3.5 0V7M0 3.5H3.5',
  I: 'M0 0H3.5M1.75 0V7M0 7H3.5',
  J: 'M3.5 0V6L2.5 7H1L0 6',
  K: 'M0 0V7M0 3.5H1.25L3.5 0M1.25 3.5L3.5 7',
  L: 'M0 0V7H3.5',
  M: 'M0 7V0L1.75 2.5L3.5 0V7',
  N: 'M0 7V0L3.5 7V0',
  O: 'M1 0H2.5L3.5 1V6L2.5 7H1L0 6V1Z',
  P: 'M0 7V0H2.5L3.5 1V2.5L2.5 3.5H0',
  Q: 'M1 0H2.5L3.5 1V6L2.5 7H1L0 6V1ZM2.25 5.25L3.5 7',
  R: 'M0 7V0H2.5L3.5 1V2.5L2.5 3.5H0M2.5 3.5L3.5 4.5V7', // 腿先切角再竖直落下（Terminus、Spleen 的做法），不用斜线，和 P 靠右下的竖腿区分
  S: 'M3.5 0H1L0 1V2.5L1 3.5H2.5L3.5 4.5V6L2.5 7H0',
  T: 'M0 0H3.5M1.75 0V7',
  U: 'M0 0V6L1 7H2.5L3.5 6V0',
  V: 'M0 0V2.5L1.75 7L3.5 2.5V0',
  W: 'M0 0V7L1.75 4.5L3.5 7V0',
  X: 'M0 0L3.5 7M3.5 0L0 7',
  Y: 'M0 0L1.75 3.5L3.5 0M1.75 3.5V7',
  Z: 'M0 0H3.5L0 7H3.5',
  0: 'M1 0H2.5L3.5 1V6L2.5 7H1L0 6V1Z',
  1: 'M1 1L2.25 0V7', // 不带底座、按窄字排（字宽 2）：10、15、18 这类挤的行里，带底座的 1 会撞上后面的数字；单独放时竖笔在字格中间偏右，和圆弧字形的 1 一样
  2: 'M0 1L1 0H2.5L3.5 1V2.5L2.5 3.5H1L0 4.5V7H3.5', // 不走斜线：上半和 S 同一套切角、下半是方角，3 像素宽里斜线会糊成一团；Z 保留斜线和它区分
  3: 'M0 0H2.5L3.5 1V2.5L2.5 3.5H1M2.5 3.5L3.5 4.5V6L2.5 7H0',
  4: 'M2.5 7V0L0 4.5H3.5', // 闭口的 4：开口写法（Tom Thumb、PICO-8）在 4K 这类标牌里读着像 Ч，这里斜线保留
  5: 'M3.5 0H0V3.5H2.5L3.5 4.5V6L2.5 7H0',
  6: 'M3 0H1L0 1V6L1 7H2.5L3.5 6V4.5L2.5 3.5H0', // 6、9 的开口端缩进 .5：比 b、q 式的闭合写法好认
  7: 'M0 0H3.5V1L1.5 7',
  8: 'M1 0H2.5L3.5 1V2.5L2.5 3.5H1L0 2.5V1ZM1 3.5L0 4.5V6L1 7H2.5L3.5 6V4.5L2.5 3.5',
  9: 'M3.5 3.5H1L0 2.5V1L1 0H2.5L3.5 1V6L2.5 7H.5',
}

// 平移并缩放字母路径（sx、sy 分别作用于 x、y 和圆弧的 rx、ry）
const place = (d, dx, dy, sx = 1, sy = 1) => affine(d, sx, sy, dx, dy)

// 对齐像素网格（类似字体 hinting）：任意缩放、摆放后，把横线的 y、竖线的 x 吸到最近的 .5（正好居中时往小的一侧），
// 但落在整数上、又正好在这组线正中的那条（T 的竖笔、H 的中横）不吸：吸过去整个字会偏半格；
// 两条线之间的坐标按比例线性插值，最外侧两条线以外只平移；圆弧半径按端点所在区间的比例缩放
// 一组路径一起吸附（例如 $ 的 S 和竖线），才不会各吸各的错开；接受字符串、{ d } 对象或它们的数组，原样返回同样的结构
const snapHalf = v => Math.ceil(+(v - 1).toFixed(6)) + 0.5
function axisMap(lines) {
  const from = [...new Set(lines.map(v => +v.toFixed(6)))].sort((a, b) => a - b)
  const to = []
  const mid = (from[0] + from.at(-1)) / 2
  const half = v => (Math.abs(v - Math.round(v)) < 1e-6 && Math.abs(v - mid) < 1e-6 ? v : snapHalf(v))
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

// 窄字：字宽不足 3.5 的字形按实际宽度排（advance），并左移 shift 让字形落在自己的字宽中间
// 否则「12」「18」里的 1 两边空出一大块，看起来像隔了个空格
const NARROW = { '1': { advance: 2, shift: 0.375 }, '-': { advance: 2.5, shift: 0.5 } }

// 字体：两套字形共用同一套排字（字宽 3.5、字高按 6·sy 算），所以各处的版面计算不用分开写
// - ROUND（默认）：通用的圆弧线条字形，给单独的大字母、数字图标（letter-*、number-*）和字形样本类图标
// - LABEL：切角的标签字形，给框里、按钮上的小字（画质、分级、画幅、文件扩展名……）；原稿 7 高，按 6/7 压进同样的字格，
//   调用方按字高 6·sy 算出的版面原样可用。1 是窄字（字宽 2，排字时左挪 0.75 回到自己的字位）；没有的字符（+ . 等）回退到圆弧字形
export const ROUND = { glyphs: GLYPHS, sy: 1, narrow: NARROW }
export const LABEL = { glyphs: LABEL_GLYPHS, sy: 6 / 7, narrow: { '1': { advance: 2, shift: 0.75 }, '-': NARROW['-'] } }

// 单个字形：左上角放在 (x, y)，按 scale 等比缩放（字格 3.5 × 6）；给了 sy 时横竖分开缩放
export function glyph(c, x, y, scale = 1, sy = scale, font = ROUND) {
  const d = font.glyphs[c]
  return d ? place(d, x, y, scale, sy * font.sy) : place(GLYPHS[c], x, y, scale, sy)
}
// 单个字形对齐网格后的版本
export const crispGlyph = (...args) => snap(glyph(...args))

export const advance = (c, font = ROUND) => font.narrow[c]?.advance ?? W
// 窄字（1、-）的字形按 3.5 宽画，排字时往左挪回它的字位里
export const shift = (c, font = ROUND) => font.narrow[c]?.shift ?? 0
export const textWidth = (str, sx = 1, gap = 1.5, font = ROUND) => [...str].reduce((w, c, i) => w + advance(c, font) * sx + (i ? gap : 0), 0)

// 一行字从左上角 (x, y) 排开：字宽 advance·sx、字高 6·sy，字间距 gap；空格只占位不出字形
export function lineAt(str, [x, y], sx = 1, gap = 1.5, sy = sx, font = ROUND) {
  return [...str].flatMap((c) => {
    const d = c === ' ' ? [] : [glyph(c, x - shift(c, font) * sx, y, sx, sy, font)]
    x += advance(c, font) * sx + gap
    return d
  })
}

// 一行字以 (cx, cy) 为中心排开
export const line = (str, [cx, cy], sx = 1, gap = 1.5, sy = sx, font = ROUND) => lineAt(str, [cx - textWidth(str, sx, gap, font) / 2, cy - 3 * sy], sx, gap, sy, font)

// 把一串字母排进 box（用标签字形 LABEL_GLYPHS，上下固定 7 高）：字距固定 GAP，字宽按排字区算（最多 1 倍），整组居中
// 排字区左右放宽（文件图标的标签在纸张下方，左右没有边线挡着）：三个字母以内各放宽 1，四个字母以上各放宽 2.5
// 字距至少 2：吸附网格时相邻两笔最少只保证隔 1，字距再小，像 INDD 的 N 和 D 会贴在一起
// 字母用细线（thin：外框的 0.7 倍），整组横竖笔画吸到 .5 网格（snap）：
// 16–20px 下一个字母只有三四个像素宽，笔画落在半个像素上会发灰；thin 还会参与像素对齐（detail 不参与），常规线宽下字母内部也多留一点空
const GAP = 2.5
export function label(text, { left, right, top }) {
  const chars = [...text.toUpperCase()]
  const n = chars.length
  const widen = n > 3 ? 2.5 : 1
  const [l, r] = [left - widen, right + widen]
  const gap = n > 1 ? GAP : 0
  const sx = Math.min(1, (r - l - gap * (n - 1)) / (W * n))
  const w = W * sx
  const start = l + (r - l - (w * n + gap * (n - 1))) / 2
  return snap(chars.map((c, i) => ({ d: place(LABEL_GLYPHS[c] ?? GLYPHS[c], start + i * (w + gap), top, sx), thin: true })))
}
