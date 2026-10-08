// 把角标符号贴到某个角：按符号实际画出来的墨迹定位，而不是 symbols.js 里近似的外形框
// （对勾又宽又矮、锁比外形框大，按外形框定位会让角标离边忽远忽近）
import { blocked, place } from './clearance'
import { samples, segments } from './clip'
import { cornerScale, outlines } from './symbols'

// 符号在 center、size 下的几何范围（中心线，不含线宽）：[x0, y0, x1, y1]
export function extentOf(draw, center, size, radius) {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity]
  for (const p of draw(center, size, radius)) {
    for (const s of segments(typeof p === 'string' ? p : p.d)) {
      for (const g of s.segs) {
        for (const [x, y] of samples(g, 8))
          [x0, y0, x1, y1] = [Math.min(x0, x), Math.min(y0, y), Math.max(x1, x), Math.max(y1, y)]
      }
    }
  }
  return [x0, y0, x1, y1]
}

// 符号中心：让符号墨迹（中心线 + 半个线宽 h）的右缘贴到 right，下缘贴到 bottom（或上缘贴到 top，二选一）
// 符号画的时候会把自己吸到网格上、步长不一，所以先按原点量出的范围估一个位置，再在附近按 0.25 试几个候选，
// 取墨迹不越过边界、又最贴近边界的那个；结果吸到 0.25 的网格上
export function cornerCenter(draw, size, radius, stroke, { right, bottom, top }) {
  const h = stroke / 2
  const snap = v => Math.floor(v * 4 + 1e-6) / 4
  const [ox0, oy0, ox1, oy1] = extentOf(draw, [0, 0], size, radius)
  const cx = snap(right - h - ox1)
  const cy = bottom != null ? snap(bottom - h - oy1) : snap(top + h - oy0) + 0.25
  const offsets = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]
  let center = [cx, cy]
  let best = Infinity
  for (const dx of offsets) {
    for (const dy of offsets) {
      const [, ay0, ax1, ay1] = extentOf(draw, [cx + dx, cy + dy], size, radius)
      const mx = right - h - ax1
      const my = bottom != null ? bottom - h - ay1 : ay0 - h - top
      const miss = mx < -1e-6 || my < -1e-6 ? Infinity : mx + my
      if (miss < best - 1e-6)
        [best, center] = [miss, [cx + dx, cy + dy]]
    }
  }
  return center
}

// 摆一个角标：先按普通角标大小（cornerScale）乘上系列自己定的 grow（主体留给角标的空间各系列不同，见各系列模块）用 cornerCenter 贴角；
// ok(shape) 不满足时（比如断口太靠近外框的拐角），每次缩小 0.05 倍再摆，最小缩到普通大小的 minFit 倍（默认 MIN_FIT）。返回 { k, at, shape }：画符号用 k、at，断开轮廓用 shape
// 符号会把缩放吸到网格上（见 clearance.js 的 snap），相邻几档可能画出来一样大，所以缩不下去的符号要靠更低的 minFit
const MIN_FIT = 0.75
export function fitBadge(name, draw, radius, stroke, anchor, ok = () => true, grow = 1, minFit = MIN_FIT) {
  let fit
  for (let s = grow; s >= minFit - 1e-6; s -= 0.05) {
    const k = cornerScale[name] * s
    const at = cornerCenter(draw, k, radius, stroke, anchor)
    fit = { k, at, shape: place(outlines[name], at, k) }
    if (ok(fit.shape))
      break
  }
  return fit
}

// 常用的 ok 条件：外框右边（中心线 x = r）从 top（右边直线段的起点，圆角之前）往下，到角标断口之间至少留 MIN_EDGE——
// 太高的符号（音符、插头）会让右边在圆角刚拐过来就断掉，只剩一截像没收好的拐角
const MIN_EDGE = 3
export const roomOnRight = (stroke, r, top) => (shape) => {
  const right = blocked(shape, 'y', r, stroke)
  return !right || right[0] - top >= MIN_EDGE
}

// 底边（中心线 y = b）从 left（底边直线段的起点）往右，到角标断口之间至少留 min：断口太靠左，底边只剩一截像没画完
export const roomOnBottom = (stroke, b, left, min = 4) => (shape) => {
  const bottom = blocked(shape, 'x', b, stroke)
  return !bottom || bottom[0] - left >= min
}

// 右上角标下方：外框右边（中心线 x = r）从角标断口往下到 bottom（右边直线段的终点，圆角之前）至少留 MIN_EDGE——
// 太高的符号（插头）会让右边只剩底角上面一小截
export const roomBelow = (stroke, r, bottom) => (shape) => {
  const right = blocked(shape, 'y', r, stroke)
  return !right || bottom - right[1] >= MIN_EDGE
}
