// 把角标符号贴到某个角：按符号实际画出来的墨迹定位，而不是 symbols.js 里近似的外形框
// （对勾又宽又矮、锁比外形框大，按外形框定位会让角标离边忽远忽近）
import { samples, segments } from './clip'

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
