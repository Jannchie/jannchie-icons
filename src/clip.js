// 几何断线：把路径里离「刀」（cut 路径）太近的部分真正删掉，剩下的段落保持原来的直线 / 圆弧 / 贝塞尔
// 断口是正常的线端（圆头），不再用遮罩挖；遮挡刀（occlude）还会把落在它闭合区域内部的线整段删掉
import { parse } from './svg'

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const fmt = p => `${p[0]} ${p[1]}`

// 贝塞尔：控制点数组上的 de Casteljau；split 返回 [0, t] 段的控制点
function split(pts, t) {
  const left = [pts[0]]
  let cur = pts
  while (cur.length > 1) {
    cur = cur.slice(1).map((p, i) => lerp(cur[i], p, t))
    left.push(cur[0])
  }
  return left
}
export const bezierAt = (ps, t) => split(ps, t).at(-1)
// 取 [t0, t1] 段的控制点
export function bezierSub(ps, t0, t1) {
  const head = split(ps, t1)
  return t1 === 0 || t0 === 0 ? head : split(head.reverse(), 1 - t0 / t1).reverse()
}

// SVG 圆弧端点式 → 中心式（支持 x 轴倾角 φ，见 SVG 规范 F.6.5）
function arcCenter(p1, [rx, ry, phi, fa, fs, x2, y2]) {
  const [x1, y1] = p1
  const r = phi * Math.PI / 180
  const [cos, sin] = [Math.cos(r), Math.sin(r)]
  const [hx0, hy0] = [(x1 - x2) / 2, (y1 - y2) / 2]
  const hx = cos * hx0 + sin * hy0
  const hy = -sin * hx0 + cos * hy0
  const lambda = hx * hx / (rx * rx) + hy * hy / (ry * ry)
  if (lambda > 1)
    [rx, ry] = [rx * Math.sqrt(lambda), ry * Math.sqrt(lambda)]
  const num = rx * rx * ry * ry - rx * rx * hy * hy - ry * ry * hx * hx
  const coef = (fa !== fs ? 1 : -1) * Math.sqrt(Math.max(0, num / (rx * rx * hy * hy + ry * ry * hx * hx)))
  const [cxp, cyp] = [coef * rx * hy / ry, -coef * ry * hx / rx]
  const c = [cos * cxp - sin * cyp + (x1 + x2) / 2, sin * cxp + cos * cyp + (y1 + y2) / 2]
  const ang = (ux, uy) => Math.atan2(uy, ux)
  const a1 = ang((hx - cxp) / rx, (hy - cyp) / ry)
  let da = ang((-hx - cxp) / rx, (-hy - cyp) / ry) - a1
  if (fs && da < 0)
    da += 2 * Math.PI
  if (!fs && da > 0)
    da -= 2 * Math.PI
  const at = (t) => {
    const a = a1 + da * t
    const [ex, ey] = [rx * Math.cos(a), ry * Math.sin(a)]
    return [c[0] + cos * ex - sin * ey, c[1] + sin * ex + cos * ey]
  }
  return { rx, ry, da, at }
}

// 把路径拆成子路径，每段带 at(t)、sub(t0, t1)（输出该段 t0→t1 的命令，不含起点）和 kind（line / curve）
export function segments(d) {
  const subs = []
  let cur = null
  let pos = [0, 0]
  for (const [type, a] of parse(d, true)) {
    if (type === 'M') {
      cur = { start: a, segs: [], closed: false }
      subs.push(cur)
      pos = a
      continue
    }
    const from = pos
    let seg
    if (type === 'L' || type === 'Z') {
      const to = type === 'Z' ? cur.start : a
      seg = { kind: 'line', at: t => lerp(from, to, t), sub: (t0, t1) => `L${fmt(lerp(from, to, t1))}` }
      if (type === 'Z')
        cur.closed = true
      pos = to
    }
    else if (type === 'C' || type === 'Q') {
      const ps = [from]
      for (let i = 0; i < a.length; i += 2)
        ps.push([a[i], a[i + 1]])
      seg = {
        kind: 'curve',
        at: t => bezierAt(ps, t),
        sub: (t0, t1) => `${type}${bezierSub(ps, t0, t1).slice(1).map(fmt).join(' ')}`,
      }
      pos = ps.at(-1)
    }
    else if (type === 'A') {
      const { rx, ry, da, at } = arcCenter(from, a)
      seg = {
        kind: 'curve',
        at,
        sub: (t0, t1) => `A${rx} ${ry} ${a[2]} ${Math.abs(da * (t1 - t0)) > Math.PI ? 1 : 0} ${da > 0 ? 1 : 0} ${fmt(at(t1))}`,
      }
      pos = [a[5], a[6]]
    }
    // 零长度段（点）也保留，让它能被判断是否落在刀口里
    cur.segs.push(seg)
  }
  return subs
}

// 一段的采样点：直线只要两个端点，零长度只要一个点，曲线才均匀取 n 段
export function samples(seg, n) {
  const [a, b] = [seg.at(0), seg.at(1)]
  if (seg.kind === 'line')
    return a[0] === b[0] && a[1] === b[1] ? [a] : [a, b]
  return Array.from({ length: n + 1 }, (_, i) => seg.at(i / n))
}

const box = pts => pts.reduce((b, [x, y]) => [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)], [Infinity, Infinity, -Infinity, -Infinity])
const overlaps = (a, b, g) => a[0] - g <= b[2] && b[0] - g <= a[2] && a[1] - g <= b[3] && b[1] - g <= a[3]

// 刀：所有 cut 路径打散成细折线；遮挡刀额外整理成多边形（每个子路径当作闭合区域）
function blade(cuts, occluders) {
  const lines = []
  for (const d of cuts) {
    for (const { segs } of segments(d)) {
      for (const s of segs) {
        const pts = samples(s, 32)
        if (pts.length === 1)
          lines.push([pts[0], pts[0]])
        for (let i = 1; i < pts.length; i++)
          lines.push([pts[i - 1], pts[i]])
      }
    }
  }
  const polys = occluders.flatMap(d => segments(d).map(({ segs }) => segs.flatMap(s => samples(s, 32))))
  return { lines, polys, bounds: box([...lines.flat(), ...polys.flat()]) }
}

function distance(p, lines) {
  let best = Infinity
  for (const [a, b] of lines) {
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
    const len2 = dx * dx + dy * dy
    const t = len2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2)) : 0
    best = Math.min(best, Math.hypot(p[0] - a[0] - dx * t, p[1] - a[1] - dy * t))
  }
  return best
}
// 奇偶射线法：点在多边形内部
function inside([x, y], poly) {
  let hit = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [[xi, yi], [xj, yj]] = [poly[i], poly[j]]
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      hit = !hit
  }
  return hit
}

// 一段里离刀不小于 g、且不在遮挡区域内的参数区间
function keptRanges(seg, cut, g) {
  // 整段的包围盒离刀的包围盒超过 g：不可能被裁，整段保留
  if (!overlaps(box(samples(seg, 8)), cut.bounds, g + 0.5))
    return [[0, 1]]
  const N = 48
  const out = (t) => {
    const p = seg.at(t)
    return distance(p, cut.lines) >= g && !cut.polys.some(poly => inside(p, poly))
  }
  const edge = (a, b) => { // a、b 状态不同，二分找边界
    const sa = out(a)
    for (let i = 0; i < 24; i++) {
      const m = (a + b) / 2
      if (out(m) === sa)
        a = m
      else
        b = m
    }
    return (a + b) / 2
  }
  const ranges = []
  let start = out(0) ? 0 : null
  let prevT = 0
  let prevOut = out(0)
  for (let i = 1; i <= N; i++) {
    const t = i / N
    const o = out(t)
    if (o !== prevOut) {
      const e = edge(prevT, t)
      if (o)
        start = e
      else
        ranges.push([start, e])
    }
    prevT = t
    prevOut = o
  }
  if (prevOut)
    ranges.push([start, 1])
  return ranges
}

// 裁掉 d 里离刀小于 g 的部分；occluders 是遮挡刀，它们闭合区域内部的线也一并删掉
export function clip(d, cuts, g, occluders = []) {
  const cut = blade(cuts, occluders)
  let result = ''
  for (const sub of segments(d)) {
    // 点：整个保留或整个删掉
    const length = s => Math.hypot(s.at(1)[0] - s.at(0)[0], s.at(1)[1] - s.at(0)[1])
    if (sub.segs.every(s => length(s) === 0)) {
      if (distance(sub.start, cut.lines) >= g && !cut.polys.some(poly => inside(sub.start, poly)))
        result += `M${fmt(sub.start)}h0`
      continue
    }
    // 收集保留的片段：[段号, t0, t1]
    const pieces = []
    sub.segs.forEach((s, i) => keptRanges(s, cut, g).forEach(([t0, t1]) => pieces.push([i, t0, t1])))
    if (!pieces.length)
      continue
    const last = sub.segs.length - 1
    const whole = pieces.length === sub.segs.length && pieces.every(([, t0, t1]) => t0 === 0 && t1 === 1)
    if (whole) {
      result += `M${fmt(sub.start)}${sub.segs.map(s => s.sub(0, 1)).join('')}${sub.closed ? 'Z' : ''}`
      continue
    }
    // 闭合路径被切开后，从第一个断口之后开始走，首尾两段接成一条
    if (sub.closed && pieces[0][0] === 0 && pieces[0][1] === 0 && pieces.at(-1)[0] === last && pieces.at(-1)[2] === 1) {
      let k = 0
      while (k + 1 < pieces.length && pieces[k + 1][0] === pieces[k][0] + 1 && pieces[k][2] === 1 && pieces[k + 1][1] === 0)
        k++
      pieces.push(...pieces.splice(0, k + 1))
    }
    let prev = null
    for (const [i, t0, t1] of pieces) {
      const continues = prev && t0 === 0 && prev[2] === 1 && (prev[0] + 1) % sub.segs.length === i
      if (!continues)
        result += `M${fmt(sub.segs[i].at(t0))}`
      result += sub.segs[i].sub(t0, t1)
      prev = [i, t0, t1]
    }
  }
  return result
}
