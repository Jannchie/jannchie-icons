// 列表类图标共用：三个圆点 + 三行线
import { blocked, GAP, place } from './clearance'
import { samples, segments } from './clip'
import { dot } from './scene'
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
// 符号的实际几何范围（中心线，不含线宽）：先在原点画一次量出来——outlines 只是近似的外形框，
// 对勾这种又宽又矮、锁这种比外形框大的符号，按外形框定位会让右下的留白忽大忽小
function extentOf(draw, center, size, radius) {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity]
  for (const p of draw(center, size, radius)) {
    for (const s of segments(typeof p === 'string' ? p : p.d)) {
      for (const g of s.segs) {
        for (const [x, y] of samples(g, 8))
          [x0, y0, x1, y1] = [Math.min(x0, x), Math.min(y0, y), Math.max(x1, x), Math.max(y1, y)]
      }
    }
  }
  return [x1, y1]
}

// 在 scale 倍下摆放符号：符号墨迹（中心线 + 半个线宽）的右缘、下缘贴到 21。符号画的时候会把自己吸到网格上，步长不一，
// 所以先按原点量出的范围估一个位置，再在附近按 0.25 试几个候选，取墨迹不越过 21、又最贴近 21 的那个
// 返回符号的 center、size，以及截好的三行线和其中最短一行的长度
function layout(outline, size, stroke, draw, radius) {
  const h = stroke / 2
  const snap = v => Math.floor(v * 4 + 1e-6) / 4
  const [ex, ey] = extentOf(draw, [0, 0], size, radius)
  const [cx, cy] = [snap(right - h - ex), snap(right - h - ey)]
  const offsets = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]
  let center = [cx, cy]
  let best = Infinity
  for (const dx of offsets) {
    for (const dy of offsets) {
      const [ax, ay] = extentOf(draw, [cx + dx, cy + dy], size, radius)
      const [mx, my] = [right - h - ax, right - h - ay]
      const miss = mx < -1e-6 || my < -1e-6 ? Infinity : mx + my
      if (miss < best - 1e-6)
        [best, center] = [miss, [cx + dx, cy + dy]]
    }
  }
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

// 主次反过来：符号为主时右下角的小列表（圆点 + 三行线，约 7 × 7），作为 cut 让主符号在附近断开
// 行距 3，三行整体比 cy 偏上半格：cy 取整数时行线正好落在 .5 上
const markRows = [-3.5, -0.5, 2.5]
// 它是角标，双色变体里是 accent
export const listMark = ([cx, cy]) => accent([
  ...markRows.map(y => dot(cx - 3.25, cy + y, 1.5)),
  ...markRows.map((y, i) => `M${cx - 1.25} ${cy + y}H${cx + (i === 2 ? 1.5 : 3.5)}`),
])
