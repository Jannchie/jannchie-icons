// 列表类图标共用：三个圆点 + 三行线
import { blocked, GAP, place } from './clearance'
import { cornerCenter } from './corner'
import { dot } from './scene'
import { clear, cutout, knock, solid } from './solid'
import { accent } from './tone'

// 墨迹（含半个线宽）左右收在 3–21、以画布中线对称；线宽变粗时外缘不动、往里长（见 docs/design.md），h 是半个线宽
// 三行以画布中线对称（6 / 12 / 18，行距 6：16 / 20 / 24px 下行距都是整像素，三行同一个像素相位）
// 圆点直径 2.5、圆心 4.25（墨迹 3–5.5）；行线墨迹从 8 到 21，和圆点隔 2.5
const rows = [6, 12, 18]
const left = 3
const right = 21
export const list = stroke => [
  ...rows.map(y => dot(left + 1.25, y, 2.5)),
  ...rows.map(y => `M${8 + stroke / 2} ${y}H${right - stroke / 2}`),
]

// 带符号的变体（参考 Tabler 的 playlist-add）：去掉圆点，三行在左上、右下角放一个放大的符号——
// 比文件夹等系列的角标大 BADGE_SCALE 倍，整体读起来是「一半列表、一半符号」，而不是列表上贴一个小角标
// 整体墨迹框是 3–21 见方：第一行墨迹顶在 3、符号墨迹的右缘和下缘在 21；三行行距 6；每行在离符号 GAP 处截断，碰不到符号的行保持全长
const BADGE_SCALE = 1.4
// 被符号截短的行至少要有这么长（中心线长度）
const MIN_ROW = 4
// 在 scale 倍下摆放符号：符号墨迹（中心线 + 半个线宽）的右缘、下缘贴到 21（见 corner.js）
// 返回符号的 center、size，以及截好的三行线和其中最短一行的长度
function layout(outline, size, stroke, draw, radius) {
  const h = stroke / 2
  const center = cornerCenter(draw, size, radius, stroke, { right, bottom: right })
  const shape = place(outline, center, size)
  const [from, end] = [left + h, right - h]
  const rows = [0, 6, 12].map((dy) => {
    const y = left + h + dy
    const b = blocked(shape, 'x', y, stroke)
    return [y, b && b[0] < end ? Math.max(b[0], from) : end]
  })
  return {
    center,
    size,
    shortest: Math.min(...rows.map(([, to]) => to - from)),
    lines: rows.map(([y, to]) => `M${from} ${y}H${to}`),
  }
}

// k：符号在普通角位的缩放（symbols.js 的 cornerScale）；draw：画符号的函数（symbols.js）；返回实际用的 size 和 center，画符号时用它们
// 符号先按 BADGE_SCALE 放大；如果它把某一行挤得短于 MIN_ROW（只剩一小段时像等号，不像列表），就每次缩小 0.05 倍再摆，
// 直到每一行都够长（最小缩到普通角标的大小）
export function listBadge(outline, k, stroke, draw, radius) {
  let result
  for (let scale = BADGE_SCALE; scale >= 1 - 1e-6; scale -= 0.05) {
    result = layout(outline, k * scale, stroke, draw, radius)
    if (result.shortest >= MIN_ROW)
      break
  }
  return result
}

// ---------- 实心版 ----------
// 列表的行线照旧是线，只把符号填实。symbolFill 按符号名把 symbols.js 画出的路径换成实心标记：
// 闭合外形整块填实；框里的细节（图片的山和太阳、田字的十字、时钟指针、锁孔、禁止的斜线）挖空；
// 读作线的部分（音符符干、锁梁、放大镜手柄）保持是线，最后画
const SOLID_SYMBOLS = new Set(['heart', 'star', 'cloud', 'shield', 'bookmark', 'video', 'puzzle', 'ring', 'sparkle'])
export function symbolFill(name, paths, stroke) {
  if (SOLID_SYMBOLS.has(name))
    return solid(paths)
  const [body, ...rest] = paths
  switch (name) {
    // 方框填实，太阳挖空；山形线挖穿方框，左下角的山体自成一块。山形线两端落在框边的中心线上，
    // 线帽只擦到外缘、会留一根发丝，所以两端顺着 45° 各往外延长，让挖出的缝整条穿出框的外缘
    case 'image': {
      const [sun, ridge] = rest
      const d = ridge.d ?? ridge
      const pts = d.match(/-?[\d.]+/g).map(Number)
      const [[ax, ay], [ex, ey]] = [pts.slice(0, 2), pts.slice(-2)]
      const e = Math.SQRT2 * (stroke / 2 + 0.25) + stroke / 2
      const cut = `M${ax - e / Math.SQRT2} ${ay + e / Math.SQRT2}L${d.slice(1)}L${ex + e / Math.SQRT2} ${ey + e / Math.SQRT2}`
      return [solid(body), knock(sun), knock(typeof ridge === 'string' ? cut : { ...ridge, d: cut })]
    }
    // 方框填实，十字挖空成四块
    case 'assets':
    // 圆面填实，指针挖空
    case 'clock':
      return [solid(body), knock(rest)]
    // 圆面填实，斜线挖穿、圆面分成两半（斜线停在圆面里会留下两道窄桥）：挖一条方头的长条，宽一个线宽，
    // 两端刚好穿出圆面外缘 0.25——用线帽挖会伸出去，碰到旁边列表的行。斜线端点落在圆环中心线上（见 symbols.js 的 drawBan）
    case 'ban': {
      const [x0, y0, x1, y1] = (rest[0].d ?? rest[0]).match(/-?[\d.]+/g).map(Number)
      const [cx, cy] = [(x0 + x1) / 2, (y0 + y1) / 2]
      const r = Math.hypot(x1 - x0, y1 - y0) / 2
      const [a, h] = [(r + stroke / 2 + 0.25) / Math.SQRT2, stroke / 2 / Math.SQRT2]
      const pt = (u, v) => `${cx + u * a + v * h} ${cy + u * a - v * h}`
      return [solid(body), cutout(`M${pt(-1, -1)}L${pt(1, -1)}L${pt(1, 1)}L${pt(-1, 1)}Z`)]
    }
    // 符头填实，符干是线
    case 'music':
    // 镜片填实，手柄是线
    case 'search':
      return [solid(body), ...rest]
    // 锁身填实，锁孔挖空，锁梁是线
    case 'lock':
      return [solid(body), knock(rest[1]), rest[0]]
  }
  throw new Error(`symbolFill: unknown symbol ${name}`)
}

// 主次反过来：符号为主时右下角的小列表（圆点 + 三行线，约 8 × 8），作为 cut 让主符号在附近断开
// 行距 3，三行以 cy 为中；圆点直径 1.5、圆心 cx - 3.25（墨迹左缘 cx - 4）
// 长行墨迹右缘固定在 cx + 4（线宽变粗时往里收），整块墨迹左右以 cx 对称：cx = 18 时墨迹 14–22；末行短一截
const markRows = [-3, 0, 3]
// 它是角标，双色变体里是 accent
export const listMark = ([cx, cy], stroke = 1.5) => accent([
  ...markRows.map(y => dot(cx - 3.25, cy + y, 1.5)),
  ...markRows.map((y, i) => `M${cx - 1.25} ${cy + y}H${cx + (i === 2 ? 1.5 : 4 - stroke / 2)}`),
])

// 实心版：主符号填实（symbolFill），在右下的小列表外面让出一个圆角方框（小列表墨迹外扩 GAP），再把小列表画回去。
// 不按每个圆点、每行线各自外扩：那样让出来的边跟着点和线头起伏，主体的边缘坑坑洼洼
// 方框按中心线画：左边是圆点的圆心（圆点直径在线宽 DOT_STROKE 下是 1.5，随字重缩放，半径正好是半个线宽）、右边是长行的线头、上下是首末行，
// 作为闭合路径让位时外扩半个线宽 + GAP，正好包住小列表的墨迹；圆角连接，尖角模式下也是圆角
export const withListMarkFill = (main, stroke) => {
  const [cx, cy] = [18, 18]
  const mark = listMark([cx, cy], stroke)
  const [x0, x1, y0, y1] = [cx - 3.25, cx + 4 - stroke / 2, cy + markRows[0], cy + markRows.at(-1)]
  return [...main, { ...clear(`M${x0} ${y0}H${x1}V${y1}H${x0}Z`, GAP), round: true }, ...mark]
}
