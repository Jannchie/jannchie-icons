const fmt = n => String(Math.round(n * 1000) / 1000)
const pt = ([x, y]) => `${fmt(x)} ${fmt(y)}`
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]]
const len = v => Math.hypot(v[0], v[1])

// 在顶点 p 处切一个半径 radius 的圆角；相邻边过短时自动收小半径
// 切点到顶点的距离不超过 radius：直角、钝角不受影响，锐角自动收小圆弧，保留尖感
// 顶点可写成 [x, y, r] 单独指定半径，不跟随全局设定
function corner(a, p, b, radius) {
  radius = p[2] ?? radius
  const va = sub(a, p)
  const vb = sub(b, p)
  const la = len(va)
  const lb = len(vb)
  const half = Math.acos((va[0] * vb[0] + va[1] * vb[1]) / (la * lb)) / 2
  const t = Math.min(radius / Math.tan(half), radius, la / 2, lb / 2)
  const r = t * Math.tan(half)
  const cross = (p[0] - a[0]) * (b[1] - p[1]) - (p[1] - a[1]) * (b[0] - p[0])
  return {
    start: [p[0] + va[0] / la * t, p[1] + va[1] / la * t],
    end: [p[0] + vb[0] / lb * t, p[1] + vb[1] / lb * t],
    r,
    sweep: cross > 0 ? 1 : 0,
  }
}

const arc = c => c.r > 0 ? `L${pt(c.start)}A${fmt(c.r)} ${fmt(c.r)} 0 0 ${c.sweep} ${pt(c.end)}` : `L${pt(c.start)}`

// 造型特征处的角：固定小圆角，不随全局放大
export const crisp = radius => Math.min(radius, 0.5)

// 折线/多边形 → 带圆角的 path d
export function rounded(points, radius, closed = true) {
  const n = points.length
  if (!closed) {
    const inner = points.slice(1, -1).map((p, i) => arc(corner(points[i], p, points[i + 2], radius)))
    return `M${pt(points[0])}${inner.join('')}L${pt(points[n - 1])}`
  }
  const cs = points.map((p, i) => corner(points[(i - 1 + n) % n], p, points[(i + 1) % n], radius))
  return `M${pt(cs[0].end)}${cs.slice(1).map(arc).join('')}${arc(cs[0])}Z`
}

// 圆
export const circle = (cx, cy, r) => `M${fmt(cx - r)} ${fmt(cy)}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(r * 2)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-r * 2)} 0`
